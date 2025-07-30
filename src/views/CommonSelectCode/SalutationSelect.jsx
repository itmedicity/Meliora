import React, { useEffect, memo } from 'react'
import FormControl from '@mui/material/FormControl'
import { useDispatch, useSelector } from 'react-redux'
import { setSalutation } from 'src/redux/actions/Salutation.action'
import { Box, Option, Select } from '@mui/joy'

const SalutationSelect = ({ value, setValue }) => {
  const dispatch = useDispatch()
  /**getDepartment -state update function of reducer
   * departmentList- initial state of reducer function
   *departmentdata is used to list select box items by using map
   */
  const Salutdata = useSelector(state => {
    return state.getSalutation.salutationList || 0
  })

  //getDepartment function is used to update data in department redux
  useEffect(() => {
    dispatch(setSalutation())
  }, [dispatch])

  return (
    <Box sx={{ mt: 1 }}>
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
            Select Salutation
          </Option>
          {Salutdata &&
            Salutdata.map((val, index) => {
              return (
                <Option key={index} value={val.sa_code}>
                  {val.sal_name}
                </Option>
              )
            })}
        </Select>
      </FormControl>
    </Box>
  )
}

export default memo(SalutationSelect)
