import React, { useEffect, memo } from 'react'
import FormControl from '@mui/material/FormControl'
import { useDispatch, useSelector } from 'react-redux'
import { getDesignation } from 'src/redux/actions/Designation.action'
import { Box, Option, Select } from '@mui/joy'

const DesignationSelect = ({ value, setValue }) => {
  const dispatch = useDispatch()
  /**getDepartment -state update function of reducer
   * departmentList- initial state of reducer function
   *departmentdata is used to list select box items by using map
   */
  const desigdata = useSelector(state => {
    return state.getDesignation.designationList || 0
  })

  //getDepartment function is used to update data in department redux
  useEffect(() => {
    dispatch(getDesignation())
  }, [dispatch])

  return (
    <Box sx={{ mt: 1 }}>
      <FormControl fullWidth size="small">
        <Select
          id="demo-simple-select"
          value={value}
          onChange={(e, newValue) => setValue(newValue)}
          size="sm"
          variant="outlined"
          sx={{ m: 0, }}
        >
          <Option value={0} disabled>
            Select Designation
          </Option>
          {desigdata &&
            desigdata.map((val, index) => {
              return (
                <Option key={index} value={val.desg_slno}>
                  {val.desg_name}
                </Option>
              )
            })}
        </Select>
      </FormControl>
    </Box>
  )
}

export default memo(DesignationSelect)
