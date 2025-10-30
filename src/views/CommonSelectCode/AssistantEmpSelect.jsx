import { Autocomplete } from '@mui/joy'
import React, { useEffect, memo, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAssistantemployee } from 'src/redux/actions/AssistantEmp.action'

const AssistantEmpSelect = ({ postdata, setValue }) => {
  const dispatch = useDispatch()
  const [inputValue, setInputValue] = useState('')
  const assistantemp = useSelector(state => {
    return state.getAssistantemployee.assistantempList || 0
  })
  const [employees, setemployees] = useState([{ em_id: 0, em_name: '' }])
  const [selectedValues, setSelectedValues] = useState([])

  useEffect(() => {
    dispatch(getAssistantemployee(postdata))
  }, [dispatch, postdata])

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
    if (assistantemp.length > 0) {
      setemployees(assistantemp)
    }
  }, [assistantemp])

  return (
    <Autocomplete
      placeholder="Add Assignee"
      sx={{
        width: '100%',
        minHeight: 35,
        bgcolor: 'transparent'
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

export default memo(AssistantEmpSelect)
