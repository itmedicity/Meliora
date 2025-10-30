import React, { useEffect, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDeptsection } from 'src/redux/actions/DeptSection.action'
import FormControl from '@mui/material/FormControl'
import { Box, Option, Select } from '@mui/joy'

const LocationSelectWithoutName = ({ value, setValue }) => {
  const dispatch = useDispatch()
  /**getDeptsection -state update function of reducer
   * deptsectionList- initial state of reducer function
   *deptsectiondata is used to list select box items by using map
   */
  const deptsectiondata = useSelector(state => {
    return state.getDeptsection.deptsectionList || 0
  })
  //getDeptsection function is used to update data in deptsection redux
  useEffect(() => {
    dispatch(getDeptsection())
  }, [dispatch])
  return (
    <Box>
      <FormControl fullWidth size="small">
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          onChange={(e, newValue) => setValue(newValue)}
          size="small"
          fullWidth
          variant="outlined"
          sx={{ height: 24, p: 0, m: 0, lineHeight: 1.2 }}
        >
          <Option value={0} disabled>
            Select Location
          </Option>
          {deptsectiondata &&
            deptsectiondata.map((val, index) => {
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

export default memo(LocationSelectWithoutName)
