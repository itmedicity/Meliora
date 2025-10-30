import { Box, Option, Select } from '@mui/joy'
import { FormControl } from '@mui/material'
import React, { memo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCategory } from 'src/redux/actions/AmCategoryList.action'

const AssetCategorySelWithoutName = ({ value, setValue }) => {
  const dispatch = useDispatch()
  const category = useSelector(state => {
    return state.getCategory.AssetCategoryList || 0
  })
  useEffect(() => {
    dispatch(getCategory())
  }, [dispatch])
  return (
    <Box>
      <FormControl fullWidth size="small">
        <Select
          id="demo-simple-select"
          value={value}
          onChange={(e, newValue) => setValue(newValue)}
          size="small"
          variant="outlined"
          sx={{ height: 24, p: 0, m: 0, lineHeight: 1.2 }}
        >
          <Option value={0} disabled>
            Select Category
          </Option>
          {category &&
            category.map((val, index) => {
              return (
                <Option key={index} value={val.category_slno}>
                  {val.category_name}
                </Option>
              )
            })}
        </Select>
      </FormControl>
    </Box>
  )
}

export default memo(AssetCategorySelWithoutName)
