import { Box, FormControl, MenuItem, Select } from '@mui/material'
import React, { memo } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAmManufacture } from 'src/redux/actions/AmManufactureList.actions'

const AssetManufactureSelect = ({ value, setValue,setName }) => {
  const dispatch = useDispatch()
  const manufacture = useSelector((state) => {
    return state.getAmManufacture.ManufactureList || 0
  })
    useEffect(() => {
    dispatch(getAmManufacture())
  }, [dispatch])
  return (
    <Box>
      <FormControl fullWidth size="small">
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          onChange={(e, { props }) => {
            setValue(e.target.value)
            setName(props.name)
          }}
          size="small"
          fullWidth
          variant="outlined"
          sx={{ height: 24, p: 0, m: 0, lineHeight: 1.2 }}
        >
          <MenuItem value={0} disabled>
            Select Manufacture
          </MenuItem>
          {manufacture &&
            manufacture.map((val, index) => {
              return (
                <MenuItem key={index} name={val.manufacture_name} value={val.manufacture_slno}>
                  {val.manufacture_name}
                </MenuItem>
              )
            })}
        </Select>
      </FormControl>
    </Box>
  )
}

export default memo(AssetManufactureSelect)
