import FormControl from '@mui/material/FormControl'
import Box from '@mui/material/Box'
import React, { useEffect } from 'react'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { useDispatch, useSelector } from 'react-redux'
import { getfloor } from 'src/redux/actions/FloorSelect.action'

const FloorSelect = ({ value, setValue }) => {
  const dispatch = useDispatch()

  const getfloordetl = useSelector(state => {
    return state.getFloorselect.floorList
  })

  useEffect(() => {
    dispatch(getfloor())
  }, [dispatch])

  return (
    <Box>
      <FormControl fullWidth size="small">
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          // disabled={disabled}
          value={value}
          onChange={e => setValue(e.target.value)}
          size="small"
          fullWidth
          variant="outlined"
          sx={{ height: 24, p: 0, m: 0, lineHeight: 1.2 }}
        >
          <MenuItem value={0} disabled>
            Select floor
          </MenuItem>
          {getfloordetl &&
            getfloordetl.map((val, index) => {
              return (
                <MenuItem key={index} value={val.floor_code}>
                  {val.floor_desc}
                </MenuItem>
              )
            })}
        </Select>
      </FormControl>
    </Box>
  )
}

export default FloorSelect
