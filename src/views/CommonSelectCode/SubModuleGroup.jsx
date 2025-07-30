import React, { useEffect, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setsubModuleGroup } from 'src/redux/actions/SubModuleGroup.action'
import FormControl from '@mui/material/FormControl'
import { Box, Option, Select } from '@mui/joy'

const SubModuleGroup = ({ value, setValue, module }) => {
  const dispatch = useDispatch()
  /*** getSubModuleGroup -state update function of reducer
   * subModuleGroupList- initial state of reducer function
   * submoduleGroupName is used to list select box items by using map
   */
  const submoduleGroupName = useSelector(state => {
    return state.getSubModuleGroup.subModuleGroupList || 0
  })

  // setsubModuleGroup function is used to update data in submodule redux
  useEffect(() => {
    dispatch(setsubModuleGroup(module))
  }, [dispatch, module])
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
            Select Sub Module Name
          </Option>
          {submoduleGroupName &&
            submoduleGroupName.map((val, index) => {
              return (
                <Option key={index} value={val.sub_module_slno}>
                  {val.sub_module_name}
                </Option>
              )
            })}
        </Select>
      </FormControl>
    </Box>
  )
}

export default memo(SubModuleGroup)
