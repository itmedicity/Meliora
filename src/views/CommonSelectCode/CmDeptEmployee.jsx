import { Autocomplete } from '@mui/joy'
import React, { useEffect, memo, useState, useCallback } from 'react'
import { axioslogin } from '../Axios/Axios'

const CmDeptEmployee = ({ postdata, setValue }) => {
  const [inputValue, setInputValue] = useState('')
  const [employees, setemployees] = useState([{ em_id: 0, em_name: '' }])
  const [selectedValues, setSelectedValues] = useState([])

  useEffect(() => {
    const getEmployeeDetails = async () => {
      const result = await axioslogin.post('/complaintassign/getDeptEmployees', postdata)
      const { success, data } = result.data
      if (success === 1) {
        setemployees(data)
      } else {
        setemployees([])
      }
    }
    getEmployeeDetails()
  }, [postdata])

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

  return (
    <Autocomplete
      placeholder="Add Assignee"
      sx={{
        width: '100%',
        minHeight: 35,
        bgcolor: 'transparent',
      }}
      multiple
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

export default memo(CmDeptEmployee)
