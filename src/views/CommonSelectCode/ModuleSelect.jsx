import React, { useEffect, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getmodule } from 'src/redux/actions/Module.action'
import FormControl from '@mui/material/FormControl'
import { Box, Option, Select } from '@mui/joy'
const ModuleSelect = ({ value, setValue }) => {
  const dispatch = useDispatch()
  /*** getModuleName -state update function of reducer
   * moduleNameSelect- initial state of reducer function
   * moduledata is used to list select box items by using map
   */
  const moduledata = useSelector(state => {
    return state.getModuleName.moduleNameSelect || 0
  })
  // getModuleName function is used to update data in usergroup redux
  useEffect(() => {
    dispatch(getmodule())
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
          size="small"
          variant="outlined"
          sx={{ height: 25, p: 0, m: 0, lineHeight: 1.2 }}
        >
          <Option value={0} disabled>
            Select Module
          </Option>
          {moduledata &&
            moduledata.map((val, index) => {
              return (
                <Option key={index} value={val.module_slno}>
                  {val.module_name}
                </Option>
              )
            })}
        </Select>
      </FormControl>
    </Box>
  )
}
export default memo(ModuleSelect)
