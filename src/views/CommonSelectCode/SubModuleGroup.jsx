import React, { useEffect, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setsubModuleGroup } from 'src/redux/actions/SubModuleGroup.action'
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

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
            Select Sub Module Name
          </MenuItem>
          {submoduleGroupName &&
            submoduleGroupName.map((val, index) => {
              return (
                <MenuItem key={index} value={val.sub_module_slno}>
                  {val.sub_module_name}
                </MenuItem>
              )
            })}
        </Select>
      </FormControl>
    </Box>
  )
}

export default memo(SubModuleGroup)
