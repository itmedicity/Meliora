import { Box, FormControl, MenuItem, Select } from '@mui/material'
import React, { useEffect } from 'react'
import { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAmSubcategory } from 'src/redux/actions/AmSubcategoryList.action'

const AssetSubcategorySelect = ({ value, setValue, category }) => {
  const dispatch = useDispatch()
  const subcategory = useSelector((state) => {
    return state.getAmSubcategory.SubcategoryList || 0
  })
  useEffect(() => {
    dispatch(getAmSubcategory(category))
  }, [dispatch, category])
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
            Select Subcategory
          </MenuItem>
          {subcategory &&
            subcategory.map((val, index) => {
              return (
                <MenuItem key={index} value={val.subcategory_slno}>
                  {val.subcategory_name}
                </MenuItem>
              )
            })}
        </Select>
      </FormControl>
    </Box>
  )
}

export default memo(AssetSubcategorySelect)
