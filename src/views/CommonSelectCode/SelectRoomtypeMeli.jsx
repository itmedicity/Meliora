import React, { useEffect, memo } from 'react'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import { useDispatch, useSelector } from 'react-redux'
import { getRoomtypemeli } from 'src/redux/actions/RoomtypeMeliora.action'
import Select from '@mui/material/Select'
const SelectRoomtypeMeli = ({ value, setValue }) => {
  const dispatch = useDispatch()
  /**getRoomtypemeli -state update function of reducer
   * roomtypemeliList- initial state of reducer function
   *roomtypemelidata is used to list select box items by using map
   */
  const roomtypemelidata = useSelector(state => {
    return state.getRoomtypemeli.roomtypemeliList || 0
  })
  useEffect(() => {
    dispatch(getRoomtypemeli())
  }, [dispatch])
  return (
    <Box sx={{ mt: 1 }}>
      <FormControl fullWidth size="small">
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          onChange={e => setValue(e.target.value)}
          size="small"
          fullWidth
          variant="outlined"
          sx={{ height: 24, p: 0, m: 0, lineHeight: 1.2 }}
        >
          <MenuItem value={0} disabled>
            Select Room Type
          </MenuItem>
          {roomtypemelidata &&
            roomtypemelidata.map((val, index) => {
              return (
                <MenuItem key={index} value={val.rmc_type}>
                  {val.rmc_desc}
                </MenuItem>
              )
            })}
        </Select>
      </FormControl>
    </Box>
  )
}
export default memo(SelectRoomtypeMeli)
