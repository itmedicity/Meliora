import React, { memo, useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Autocomplete } from '@mui/joy'

const TmMultEmpSelectUnderDeptSec = ({ setValue }) => {
  const [inputValue, setInputValue] = useState('')
  const empnameselect = useSelector(state => {
    return state.getDepartSecemployee.departsecempList || 0
  })
  const [employees, setemployees] = useState([{ em_id: 0, em_name: '' }])
  const [selectedValues, setSelectedValues] = useState([])

  const Onclick = useCallback(
    values => {
      if (values !== null) {
        const empArray = values.map(value => value.em_id)
        setSelectedValues(values)
        setValue(empArray)
      } else {
        setSelectedValues([])
      }
    },
    [setSelectedValues, setValue]
  )

  useEffect(() => {
    if (empnameselect.length > 0) {
      setemployees(empnameselect)
    }
  }, [empnameselect])

  return (
    <Autocomplete
      placeholder="Add Assignee"
      multiple
      style={{ minHeight: 53 }}
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
      isOptionEqualToValue={(option, value) => option.em_id === value.em_id}
      getOptionLabel={option => option.em_name || ''}
      options={employees}
    />
  )
}

export default memo(TmMultEmpSelectUnderDeptSec)
