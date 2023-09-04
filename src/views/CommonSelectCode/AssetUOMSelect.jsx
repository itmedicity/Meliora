import { Box, FormControl, MenuItem, Select } from '@mui/material'
import React, { useEffect } from 'react'
import { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUOM } from 'src/redux/actions/AmUOMList.action'

const AssetUOMSelect = ({ value, setValue }) => {
  const dispatch = useDispatch()
  const uom = useSelector((state) => {
    return state.getUOM.uomList || 0
  })
  useEffect(() => {
    dispatch(getUOM())
  }, [dispatch])
  return (
    <Box>
      <FormControl fullWidth size="small">
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          size="small"
          fullWidth
          variant="outlined"
          sx={{ height: 24, p: 0, m: 0, lineHeight: 1.2 }}
        >
          <MenuItem value={0} disabled>
            Select Unit Of Measurement
          </MenuItem>
          {uom &&
            uom.map((val, index) => {
              return (
                <MenuItem key={index} value={val.uom_slno}>
                  {val.uom_name}
                </MenuItem>
              )
            })}
        </Select>
      </FormControl>
    </Box>
  )
}

export default memo(AssetUOMSelect)
