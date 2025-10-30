import React, { useEffect, useState, memo, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Autocomplete from '@mui/joy/Autocomplete'
import { CssVarsProvider } from '@mui/joy'
import { getCustodianDept } from 'src/redux/actions/AmCustodianDept.action'

const AMCustodianDeptSelect = ({ selectedDept, setSelectedDept }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCustodianDept())
  }, [dispatch])

  const custdnDeptList = useSelector(state => state.getCustodianDept?.CustodianDeptList)
  const [inputValue, setInputValue] = useState('')

  const CustDepartment = useMemo(() => {
    if (!custdnDeptList) return []
    return custdnDeptList.filter(dept => dept.am_custodian_name.toLowerCase().includes(inputValue.toLowerCase()))
  }, [custdnDeptList, inputValue])

  return (
    <CssVarsProvider>
      <Autocomplete
        sx={{
          '--Input-minHeight': '29px'
        }}
        value={selectedDept}
        placeholder="Select Custodian Department"
        clearOnBlur
        onChange={(event, newValue) => {
          setSelectedDept(newValue)
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue)
        }}
        loading={!custdnDeptList}
        loadingText="Loading..."
        freeSolo
        isOptionEqualToValue={(option, value) => option.am_custodian_name === value?.am_custodian_name}
        getOptionLabel={option => option.am_custodian_name || ''}
        options={CustDepartment}
      />
    </CssVarsProvider>
  )
}

export default memo(AMCustodianDeptSelect)
