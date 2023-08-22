import { Box, FormControl, MenuItem, Select } from '@mui/material'
import React, { memo } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCategory } from 'src/redux/actions/AmCategoryList.action'

const AssetCategorySelect = ({ value, setValue }) => {
  const dispatch = useDispatch()
  const category = useSelector((state) => {
    return state.getCategory.AssetCategoryList || 0
  })
  useEffect(() => {
    dispatch(getCategory())
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
            Select Category
          </MenuItem>
          {category &&
            category.map((val, index) => {
              return (
                <MenuItem key={index} value={val.category_slno}>
                  {val.category_name}
                </MenuItem>
              )
            })}
        </Select>
      </FormControl>
    </Box>
  )
}
export default memo(AssetCategorySelect)
