import React, { Fragment, memo, useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Autocomplete from '@mui/joy/Autocomplete'
import { CssVarsProvider } from '@mui/joy/'

const ItSimTypeSelect = ({ simType, setSimType }) => {
  const SimTypeList = useSelector(state => state.getSimType?.SimTypeList)
  const [simTypeX, setSimTypeX] = useState([{ it_sim_type_slno: 0, it_sim_type_name: '' }])
  const [value, setValue] = useState(simTypeX[0])
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    if (simType !== 0) {
      let newObj = SimTypeList?.find(e => e.it_sim_type_slno === simType)
      setValue(newObj)
    }
  }, [simType, SimTypeList])

  const Onclick = useCallback(
    value => {
      if (value !== null) {
        setValue(value)
        setSimType(value.it_sim_type_slno)
      } else {
        setSimType(0)
      }
      return
    },
    [setSimType]
  )

  useEffect(() => {
    SimTypeList.length > 0 && setSimTypeX(SimTypeList)
  }, [SimTypeList])

  return (
    <Fragment>
      <CssVarsProvider>
        <Autocomplete
          sx={{
            '--Input-minHeight': '29px'
          }}
          value={simType === 0 ? simTypeX : value}
          placeholder="Select SiM Type"
          clearOnBlur
          style={{ minHeight: 32 }}
          onChange={(event, newValue) => {
            setValue(newValue)
            Onclick(newValue)
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue)
          }}
          loading={true}
          loadingText="Loading..."
          freeSolo
          isOptionEqualToValue={(option, value) => option.it_sim_type_name === value.it_sim_type_name}
          getOptionLabel={option => option.it_sim_type_name || ''}
          options={simTypeX}
        />
      </CssVarsProvider>
    </Fragment>
  )
}

export default memo(ItSimTypeSelect)
