import React, { useEffect, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getempname } from 'src/redux/actions/EmpName.action'
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

const EmpNameSelect = ({ value, setValue }) => {
  const dispatch = useDispatch()
  /*** getEmployeeName -state update function of reducer
   * employeeNameSelect- initial state of reducer function
   * empName is used to list select box items by using map
   */
  const empName = useSelector(state => {
    return state.getEmployeeName.employeeNameSelect || 0
  })

  // getUserGroup function is used to update data in usergroup redux
  useEffect(() => {
    dispatch(getempname())
  }, [dispatch])

  return (
    <Box>
      <FormControl fullWidth size="small">
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          onChange={e => setValue(e.target.value)}
          size="small"
          fullWidth
          variant="outlined"
          sx={{ height: 25, p: 0, m: 0, lineHeight: 1.2 }}
        >
          <MenuItem value={0} disabled>
            Select Employee Name
          </MenuItem>
          {empName &&
            empName.map((val, index) => {
              return (
                <MenuItem key={index} value={val.em_id}>
                  {val.em_name}
                </MenuItem>
              )
            })}
        </Select>
      </FormControl>
    </Box>
  )
}

export default memo(EmpNameSelect)
