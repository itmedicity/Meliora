import FormControl from '@mui/material/FormControl'
import Box from '@mui/material/Box'
import React, { useEffect, memo } from 'react'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { useDispatch, useSelector } from 'react-redux'
import { getRmRoomCategory } from 'src/redux/actions/RmRoomCategoryList.action'

const RmRoomCategorySelect = ({ value, setValue }) => {
  const dispatch = useDispatch()
  const roomCategory = useSelector(state => {
    return state.getRmRoomCategory.RmRoomCategoryList
  })

  useEffect(() => {
    dispatch(getRmRoomCategory())
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
          sx={{ height: 24, p: 0, m: 0, lineHeight: 1.2 }}
        >
          <MenuItem value={0} disabled>
            Select Room Category
          </MenuItem>
          {roomCategory &&
            roomCategory.map((val, index) => {
              return (
                <MenuItem key={index} value={val.rm_roomcategory_slno}>
                  {val.rm_roomcategory_name}
                </MenuItem>
              )
            })}
        </Select>
      </FormControl>
    </Box>
  )
}

export default memo(RmRoomCategorySelect)
