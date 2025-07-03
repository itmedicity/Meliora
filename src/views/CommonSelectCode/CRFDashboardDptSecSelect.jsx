import React, { Fragment, memo, useCallback, useEffect, useState } from 'react'
import Autocomplete from '@mui/joy/Autocomplete'
import { CssVarsProvider } from '@mui/joy/'
import { useSelector } from 'react-redux'
const CRFDashboardDptSecSelect = ({ dptSec, setdptSec }) => {
  const deptsecList = useSelector(state => state.getDeptsectionDept?.deptsectiondeptList)
  const [type, setType] = useState([{ sec_id: 0, sec_name: '' }])
  const [value, setValue] = useState(type[0])
  const [inputValue, setInputValue] = useState('')
  const [flag, setFlag] = useState(0)

  useEffect(() => {
    if (dptSec !== 0 && flag === 0) {
      const array = deptsecList.find(e => e.sec_id === dptSec)
      setValue(array)
    }
  }, [dptSec, flag, deptsecList])
  const Onclick = useCallback(
    value => {
      if (value !== null) {
        setFlag(1)
        setValue(value)
        setdptSec(value.sec_id)
      } else {
        setdptSec(0)
      }
      return
    },
    [setdptSec]
  )
  useEffect(() => {
    deptsecList.length > 0 && setType(deptsecList)
  }, [deptsecList])

  return (
    <Fragment>
      <CssVarsProvider>
        <Autocomplete
          sx={{
            height: 20,
            width: 340,
            border: '1px solid #bbdefb',
            color: '#1565c0',
            fontSize: 14,
          }}
          value={dptSec === 0 ? type : value}
          placeholder="Select Department Section"
          clearOnBlur
          onChange={(event, newValue) => {
            Onclick(newValue)
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue)
          }}
          loading={true}
          loadingText="Loading..."
          freeSolo
          isOptionEqualToValue={(option, value) => option.sec_name === value.sec_name}
          getOptionLabel={option => option.sec_name || ''}
          options={type}
        />
      </CssVarsProvider>
    </Fragment>
  )
}

export default memo(CRFDashboardDptSecSelect)
