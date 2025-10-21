import React, { useEffect, memo } from 'react'
import FormControl from '@mui/material/FormControl'
import { useDispatch, useSelector } from 'react-redux'
import { getDesignation } from 'src/redux/actions/DeptSecDept.action'
import { Box, Option, Select } from '@mui/joy'

const DeptSecUnderDept = ({ value, setValue, dept }) => {
  const dispatch = useDispatch()
  /**getDepartment -state update function of reducer
   * departmentList- initial state of reducer function
   *departmentdata is used to list select box items by using map
   */
  const deptSecdata = useSelector(state => {
    return state.getDeptsectionDept.deptsectiondeptList || 0
  })

  //getDepartment function is used to update data in department redux
  useEffect(() => {
    dispatch(getDesignation(dept))
  }, [dispatch, dept])

  return (
    <Box>
      <FormControl fullWidth size="small">
        <Select
          id="demo-simple-select"
          value={value}
          onChange={(e, newValue) => setValue(newValue)}
          size="sm" variant="outlined"
          sx={{ m: 0, }}
        >
          <Option value={0} disabled>
            Select Department Section
          </Option>
          {deptSecdata &&
            deptSecdata.map((val, index) => {
              return (
                <Option key={index} value={val.sec_id}>
                  {val.sec_name}
                </Option>
              )
            })}
        </Select>
      </FormControl>
    </Box>
  )
}

export default memo(DeptSecUnderDept)
