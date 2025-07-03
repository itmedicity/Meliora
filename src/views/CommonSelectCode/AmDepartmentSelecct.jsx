import React, { useEffect, memo, useState, Fragment } from 'react'
import { useSelector } from 'react-redux'
import Autocomplete from '@mui/joy/Autocomplete'
import { CssVarsProvider } from '@mui/joy/'
import { getDesignation } from 'src/redux/actions/DeptSecDept.action'
import { useDispatch } from 'react-redux'

const AmDepartmentSelecct = ({ department, setDepartment, setDeptName }) => {
  const dispatch = useDispatch()
  const departmentList = useSelector(state => state.getDepartment?.departmentList)
  const [models, setModels] = useState([{ dept_id: 0, dept_name: '' }])
  const [value, setValue] = useState(models[0])
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    if (department !== 0) {
      let newObj = departmentList?.find(e => e.dept_id === department)
      dispatch(getDesignation(department))
      setValue(newObj)
    }
  }, [department, departmentList, dispatch])

  useEffect(() => {
    if (value !== null) {
      setDepartment(value.dept_id)
      setDeptName(value.dept_name)
      if (value.dept_id !== 0) {
        dispatch(getDesignation(value.dept_id))
      }
    } else {
      setDepartment(0)
      setDeptName('')
    }
    return
  }, [value, setDepartment, setDeptName, dispatch])

  useEffect(() => {
    departmentList.length > 0 && setModels(departmentList)
  }, [departmentList])

  return (
    <Fragment>
      <CssVarsProvider>
        <Autocomplete
          sx={{
            '--Input-minHeight': '29px',
          }}
          value={department === 0 ? models : value}
          placeholder="Select Department"
          clearOnBlur
          onChange={(event, newValue) => {
            setValue(newValue)
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue)
          }}
          loading={true}
          loadingText="Loading..."
          freeSolo
          // renderInput={(params) => (<Input size="sm" placeholder="Small"  {...params} />)}
          isOptionEqualToValue={(option, value) => option.dept_name === value.dept_name}
          getOptionLabel={option => option.dept_name || ''}
          options={models}
        />
      </CssVarsProvider>
    </Fragment>
  )
}
export default memo(AmDepartmentSelecct)
