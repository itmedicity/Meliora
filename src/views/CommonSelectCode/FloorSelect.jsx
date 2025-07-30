import { Box, Option, Select } from '@mui/joy'
import FormControl from '@mui/material/FormControl'
import React, { useEffect } from 'react'
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
          id="demo-simple-select"
          // disabled={disabled}
          value={value}
          onChange={(e, newValue) => setValue(newValue)}
          size="small"
          variant="outlined"
          sx={{ height: 24, p: 0, m: 0, lineHeight: 1.2 }}
        >
          <Option value={0} disabled>
            Select floor
          </Option>
          {getfloordetl &&
            getfloordetl.map((val, index) => {
              return (
                <Option key={index} value={val.floor_code}>
                  {val.floor_desc}
                </Option>
              )
            })}
        </Select>
      </FormControl>
    </Box>
  )
}

export default FloorSelect
