import React, { useEffect, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setModuleGroup } from 'src/redux/actions/ModuleGroup.action'
import FormControl from '@mui/material/FormControl'
import { Box, Option, Select } from '@mui/joy'

const ModuleGroupSelect = ({ value, setValue }) => {
  const dispatch = useDispatch()
  /*** getEmployeeName -state update function of reducer
   * employeeNameSelect- initial state of reducer function
   * empName is used to list select box items by using map
   */
  const moduleGroupName = useSelector(state => {
    return state.getModuleGroup.moduleGroupSelect || 0
  })
  // getUserGroup function is used to update data in usergroup redux
  useEffect(() => {
    dispatch(setModuleGroup())
  }, [dispatch])

  return (
    <Box>
      <FormControl fullWidth size="small">
        <Select
          id="demo-simple-select"
          value={value}
          onChange={(e, newValue) => {
            setValue(newValue);
          }}
          size="sm"
          variant="outlined"
          sx={{ m: 0, }}
        >
          <Option value={0} disabled>
            Select Module Group Name
          </Option>
          {moduleGroupName &&
            moduleGroupName.map((val, index) => {
              return (
                <Option key={index} value={val.mod_grp_slno}>
                  {val.mod_grp_name}
                </Option>
              )
            })}
        </Select>
      </FormControl>
    </Box>
  )
}

export default memo(ModuleGroupSelect)
