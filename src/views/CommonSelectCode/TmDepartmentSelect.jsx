import React, { Fragment, memo, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDesignation } from 'src/redux/actions/DeptSecDept.action'
import Autocomplete from '@mui/joy/Autocomplete'
import { CssVarsProvider } from '@mui/joy/'

const TmDepartmentSelect = ({ department, setDepartment }) => {
  const dispatch = useDispatch()
  const departmentList = useSelector(state => state.getDepartment?.departmentList)
  const [departments, setDepartments] = useState([{ dept_id: 0, dept_name: '' }])
  const [value, setValue] = useState(departments[0])
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    if (department !== 0) {
      let newObj = departmentList?.find(e => e.dept_id === department)
      dispatch(getDesignation(department))
      setValue(newObj)
    }
  }, [department, departmentList, dispatch])
  const Onclick = useCallback(
    value => {
      if (value !== null) {
        setValue(value)
        setDepartment(value.dept_id)
      } else {
        setDepartment(0)
      }
      return
    },
    [setDepartment]
  )
  useEffect(() => {
    departmentList.length > 0 && setDepartments(departmentList)
  }, [departmentList])

  return (
    <Fragment>
      <CssVarsProvider>
        <Autocomplete
          sx={{
            width: '100%',
            minHeight: 40,
            bgcolor: 'transparent',
            '--Input-radius': '0px',
            borderTop: 0,
            borderLeft: 0,
            borderRight: 0,
            borderBottom: '2px solid',
            borderColor: 'neutral.outlinedBorder',
            '&:hover': {
              borderColor: 'neutral.outlinedHoverBorder',
            },
            '&::before': {
              border: '1px solid var(--Input-focusedHighlight)',
              transform: 'scaleX(0)',
              left: 0,
              right: 0,
              bottom: '-2px',
              top: 'unset',
              transition: 'transform .15s cubic-bezier(0.1,0.9,0.2,1)',
              borderRadius: 0,
            },
            '&:focus-within::before': {
              transform: 'scaleX(1)',
            },
          }}
          style={{ minHeight: 29, fontWeight: 400, color: '#2F4A60' }}
          value={department === 0 ? departments : value}
          placeholder="Select Department"
          clearOnBlur
          onChange={(event, newValue) => {
            setValue(newValue)
            // setDepartment(newValue.dept_id)
            Onclick(newValue)
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue)
          }}
          loading={true}
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

export default memo(TmDepartmentSelect)
