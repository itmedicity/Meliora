import React, { memo, useCallback, useEffect, useState } from 'react'
import { CssVarsProvider } from '@mui/joy/'
import Autocomplete from '@mui/joy/Autocomplete'
import { axioslogin } from 'src/views/Axios/Axios'

const CmHoldReasonList = ({ holdReason, setHoldReason }) => {
  const [CmHoldReasonList, setCmHoldReasonList] = useState([])
  const [value, setValue] = useState(null)
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    const getComplaintHold = async () => {
      const result = await axioslogin.get('complaintHoldReason/gethold')
      const { success, data } = result.data
      if (success === 1) {
        setCmHoldReasonList(data)
      } else {
        setCmHoldReasonList([])
      }
    }
    getComplaintHold()
  }, [])

  useEffect(() => {
    if (holdReason !== 0) {
      const selectedReason = CmHoldReasonList.find(e => e.cm_hold_id === holdReason)
      setValue(selectedReason || null)
    }
  }, [holdReason, CmHoldReasonList])

  const Onclick = useCallback(
    newValue => {
      if (newValue !== null) {
        setValue(newValue)
        setHoldReason(newValue.cm_hold_id)
      } else {
        // Handle clearing the selection
        setValue(null)
        setHoldReason(0)
      }
    },
    [setHoldReason]
  )

  return (
    <CssVarsProvider>
      <Autocomplete
        sx={{
          '--Input-minHeight': '38px',
          width: '100%',
        }}
        value={value}
        placeholder="Select Hold Reason"
        clearOnBlur
        onChange={(event, newValue) => {
          Onclick(newValue)
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue)
        }}
        loading={CmHoldReasonList.length === 0}
        loadingText="Loading..."
        isOptionEqualToValue={(option, value) => option.cm_hold_id === value?.cm_hold_id}
        getOptionLabel={option => option.cm_hold_reason || ''}
        options={CmHoldReasonList}
        clearOnEscape
      />
    </CssVarsProvider>
  )
}

export default memo(CmHoldReasonList)
