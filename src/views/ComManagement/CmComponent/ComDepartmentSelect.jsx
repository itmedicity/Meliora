import React, { useEffect, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Box from '@mui/material/Box'
import Select, { selectClasses } from '@mui/joy/Select'
import Option from '@mui/joy/Option'
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown'
import { getComplaintDept } from 'src/redux/actions/ComplaintDept.action'

const ComDepartmentSelect = ({ value, setValue }) => {
  const dispatch = useDispatch()

  const complaintdeptdata = useSelector(state => {
    return state.getComplaintDept.complaintdeptList || 0
  })
  //getComplaintdept function is used to update data in complaintdepartment redux
  useEffect(() => {
    dispatch(getComplaintDept())
  }, [dispatch])

  const handleChange = (event, newValue) => {
    setValue(newValue) // newValue should directly give you the selected value
  }
  return (
    <Box>
      <Select
        placeholder="Select Complaint Department"
        indicator={<KeyboardArrowDown />}
        value={value}
        onChange={handleChange} // Attach the handleChange function
        sx={{
          width: '100%',
          [`& .${selectClasses.indicator}`]: {
            transition: '0.2s',
            [`&.${selectClasses.expanded}`]: {
              transform: 'rotate(-180deg)',
            },
          },
        }}
      >
        {complaintdeptdata &&
          complaintdeptdata.map((val, index) => {
            return (
              <Option key={index} value={val.complaint_dept_slno}>
                {val.complaint_dept_name}
              </Option>
            )
          })}
      </Select>
      {/* <FormControl fullWidth size="small"  >
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                size="small"
                fullWidth
                variant='outlined'
                sx={{ height: 24, p: 0, m: 0, lineHeight: 1.200 }}
            >
                <MenuItem value={0} disabled  >Select Complaint Department</MenuItem>
                {
                    complaintdeptdata && complaintdeptdata.map((val, index) => {
                        return <MenuItem key={index} value={val.complaint_dept_slno}>{val.complaint_dept_name}</MenuItem>
                    })
                }
            </Select>
        </FormControl> */}
    </Box>
  )
}

export default memo(ComDepartmentSelect)
