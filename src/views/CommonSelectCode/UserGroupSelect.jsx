import React, { useEffect, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserGroup } from 'src/redux/actions/UserGroup.action'
import FormControl from '@mui/material/FormControl'
import { Box, Option, Select } from '@mui/joy'

const UserGroupSelect = ({ value, setValue }) => {
  const dispatch = useDispatch()
  /*** getUserGroup -state update function of reducer
   * userGroupnameList- initial state of reducer function
   * usergroup is used to list select box items by using map
   */
  const usergroup = useSelector(state => {
    return state.getUserGroup.userGroupnameList || 0
  })
  // getUserGroup function is used to update data in usergroup redux
  useEffect(() => {
    dispatch(getUserGroup())
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
            Select User Group
          </Option>
          {usergroup &&
            usergroup.map((val, index) => {
              return (
                <Option key={index} value={val.user_grp_slno}>
                  {val.user_grp_name}
                </Option>
              )
            })}
        </Select>
      </FormControl>
    </Box>
  )
}
export default memo(UserGroupSelect)
