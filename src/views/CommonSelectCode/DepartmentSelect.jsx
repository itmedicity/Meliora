import React, { useEffect, memo } from 'react'
import FormControl from '@mui/material/FormControl'
import { useDispatch, useSelector } from 'react-redux'
import { getDepartment } from 'src/redux/actions/Department.action'
import { Box, Option, Select } from '@mui/joy'
const DepartmentSelect = ({ value, setValue }) => {
  const dispatch = useDispatch()
  /**getDepartment -state update function of reducer
   * departmentList- initial state of reducer function
   *departmentdata is used to list select box items by using map
   */
  const departmentdata = useSelector(state => {
    return state.getDepartment.departmentList || 0
  })

  //getDepartment function is used to update data in department redux
  useEffect(() => {
    dispatch(getDepartment())
  }, [dispatch])

  return (
    <Box>
      <FormControl fullWidth size="small">
        <Select
          id="demo-simple-select"
          value={value}
          onChange={(e, newValue) => setValue(newValue)}
          size="small"
          variant="outlined"
          sx={{ height: 24, p: 0, m: 0, lineHeight: 1.2 }}
        >
          <Option value={0} disabled>
            Select Department
          </Option>
          {departmentdata &&
            departmentdata.map((val, index) => {
              return (
                <Option key={index} value={val.dept_id}>
                  {val.dept_name}
                </Option>
              )
            })}
        </Select>
      </FormControl>
    </Box>
  )
}
export default memo(DepartmentSelect)
