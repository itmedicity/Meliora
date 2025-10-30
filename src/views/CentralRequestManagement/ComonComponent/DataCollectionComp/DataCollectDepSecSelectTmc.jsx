import { Autocomplete } from '@mui/joy'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDeptsectionTmc } from 'src/redux/actions/DeptSection.action'

const DataCollectDepSecSelectTmc = ({ SetDeptSec }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getDeptsectionTmc())
  }, [dispatch])
  const [inputValue, setInputValue] = useState('')
  const [depSecName, setdepSecName] = useState([{ sec_id: 0, sec_name: '' }])
  const [selectedValues, setSelectedValues] = useState([])

  const deptsectiondata = useSelector(state => {
    return state.getDeptsectionTmc.deptsectionListkmc || 0
  })
  const Onclick = useCallback(
    values => {
      if (values !== null) {
        const arry = values?.map(value => value.sec_id)
        setSelectedValues(values)
        SetDeptSec(arry)
      } else {
        setSelectedValues([])
      }
    },
    [setSelectedValues, SetDeptSec]
  )

  useEffect(() => {
    if (deptsectiondata.length > 0) {
      setdepSecName(deptsectiondata)
    }
  }, [deptsectiondata])
  return (
    <Autocomplete
      placeholder="Select Department"
      multiple
      style={{ height: 'auto', p: 0, m: 0, lineHeight: 1.2, width: '90%' }}
      value={selectedValues}
      clearOnBlur
      onChange={(_, newValue) => {
        Onclick(newValue)
      }}
      inputValue={inputValue}
      onInputChange={(_, newInputValue) => {
        setInputValue(newInputValue)
      }}
      loading={true}
      loadingText="Loading..."
      freeSolo
      isOptionEqualToValue={(option, value) => option.sec_id === value.sec_id}
      getOptionLabel={option => option.sec_name || ''}
      options={depSecName}
      getOptionDisabled={option =>
        depSecName.some((opt, index) => opt.sec_name === option.sec_name && depSecName.indexOf(opt) !== index)
      }
    />
  )
}

export default memo(DataCollectDepSecSelectTmc)
