import React, { useEffect, memo } from 'react'
import FormControl from '@mui/material/FormControl'
import { useDispatch, useSelector } from 'react-redux'
import { getDepartSecemployee } from 'src/redux/actions/EmpNameDeptSect.action'
import { Box, Option, Select } from '@mui/joy'

const EmpNameDeptSecSelect = ({ value, setValue, deptsec }) => {
  const dispatch = useDispatch()
  /**getOraRoomByRoomType -state update function of reducer
   *roomByRoomTypeList- initial state of reducer function
   *oraRoom is used to list select box items by using map
   */
  const empnameselect = useSelector(state => {
    return state.getDepartSecemployee.departsecempList || 0
  })
  useEffect(() => {
    dispatch(getDepartSecemployee(deptsec))
  }, [dispatch, deptsec])

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
            Select Employee
          </Option>
          {empnameselect &&
            empnameselect.map((val, index) => {
              return (
                <Option key={index} value={val.em_id}>
                  {val.em_name}
                </Option>
              )
            })}
        </Select>
      </FormControl>
    </Box>
  )
}

export default memo(EmpNameDeptSecSelect)
