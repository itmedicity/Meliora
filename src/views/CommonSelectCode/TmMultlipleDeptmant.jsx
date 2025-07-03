import React, { memo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Autocomplete from '@mui/joy/Autocomplete'
import { getDeptSections } from 'src/redux/actions/TmMultipleDepSectList.action'

const TmMultlipleDeptmant = ({ department, setDepartment }) => {
  const dispatch = useDispatch()
  const departmentList = useSelector(state => state.getDepartment?.departmentList)
  const handleChange = (event, value) => {
    setDepartment(value)
  }

  useEffect(() => {
    if (department.length !== 0) {
      const deptIds = department.map(dept => dept.dept_id)
      dispatch(getDeptSections(deptIds))
    }
  }, [department, dispatch])

  return (
    <Autocomplete
      multiple
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
      // value={department}
      placeholder="Select Departments"
      isOptionEqualToValue={(option, value) => option.dept_name === value.dept_name}
      getOptionLabel={option => option.dept_name || ''}
      options={departmentList}
      onChange={handleChange}
      // renderinput={(params) => <TextField {...params} variant="standard" />
      // }
    />
  )
}

export default memo(TmMultlipleDeptmant)
