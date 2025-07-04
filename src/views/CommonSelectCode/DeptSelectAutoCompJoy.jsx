import React, { Fragment, memo, useCallback, useEffect, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDesignation } from 'src/redux/actions/DeptSecDept.action'
import Autocomplete from '@mui/joy/Autocomplete'
import { CssVarsProvider } from '@mui/joy/'

const DeptSelectAutoCompJoy = ({ department, setDepartment }) => {
  const dispatch = useDispatch()

  const departmentList = useSelector(state => state.getDepartment?.departmentList)
  const [inputValue, setInputValue] = useState('')
  const departments = useMemo(() => {
    return departmentList?.length > 0 ? departmentList : [{ dept_id: 0, dept_name: '' }]
  }, [departmentList])

  const value = useMemo(() => {
    if (department !== 0) {
      return departmentList?.find(e => e.dept_id === department) || { dept_id: 0, dept_name: '' }
    }
    return { dept_id: 0, dept_name: '' }
  }, [department, departmentList])

  useEffect(() => {
    if (department !== 0) {
      dispatch(getDesignation(department))
    }
  }, [department, dispatch])

  const Onclick = useCallback(
    newValue => {
      if (newValue !== null) {
        setDepartment(newValue.dept_id)
      } else {
        setDepartment(0)
      }
    },
    [setDepartment]
  )

  return (
    <Fragment>
      <CssVarsProvider>
        <Autocomplete
          sx={{
            '--Input-minHeight': '29px'
          }}
          value={value}
          placeholder="Select Department"
          clearOnBlur
          onChange={(event, newValue) => {
            Onclick(newValue)
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue)
          }}
          loading={!departmentList || departmentList.length === 0}
          loadingText="Loading..."
          freeSolo
          isOptionEqualToValue={(option, value) => option.dept_name === value.dept_name}
          getOptionLabel={option => option.dept_name || ''}
          options={departments}
        />
      </CssVarsProvider>
    </Fragment>
  )
}

export default memo(DeptSelectAutoCompJoy)
