import { Box, FormControl, MenuItem, Select } from '@mui/material'
import React, { memo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFloorData } from 'src/redux/actions/FloorRoomManagementSelect.action'

const FloorRmSelect = ({ value, setValue }) => {
  const dispatch = useDispatch()
  const floorData = useSelector(state => {
    return state.getFloorData.floorList || 0
  })
  useEffect(() => {
    dispatch(getFloorData())
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
            Select Floor
          </MenuItem>
          {floorData &&
            floorData.map((val, index) => {
              return (
                <MenuItem key={index} value={val.rm_floor_slno}>
                  {val.rm_floor_name}
                </MenuItem>
              )
            })}
        </Select>
      </FormControl>
    </Box>
  )
}

export default memo(FloorRmSelect)
