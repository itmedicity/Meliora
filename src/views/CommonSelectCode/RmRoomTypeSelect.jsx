import React, { useEffect, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRmRoomType } from 'src/redux/actions/RmRoomTypeList.action'
import { Box, FormControl, Option, Select, } from '@mui/joy'

const RmRoomTypeSelect = ({ value, setValue }) => {
  const dispatch = useDispatch()
  const roomType = useSelector(state => {
    return state.getRmRoomType.RmRoomTypeList
  })

  useEffect(() => {
    dispatch(getRmRoomType())
  }, [dispatch])

  return (
    <Box>
      <FormControl size="small">
        <Select

          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }} size="md"
          variant="outlined"
          sx={{ height: 24, p: 0, m: 0, lineHeight: 1.2 }}
        >
          <Option value={0} disabled>
            Select Room Type
          </Option>
          {/* {roomType &&
            roomType.map((val, index) => {
              return (
                <MenuItem key={index} value={val.rm_roomtype_slno}>
                  {val.rm_roomtype_name}
                </MenuItem>
              )
            })} */}
          {roomType?.map((val, i) => (
            <Option
              key={i}
              value={val.rm_roomtype_slno}
            >
              {val.rm_roomtype_name}
            </Option>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

export default memo(RmRoomTypeSelect)
