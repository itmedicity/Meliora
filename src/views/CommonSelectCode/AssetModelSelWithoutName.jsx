import { Box, Option, Select } from '@mui/joy'
import { FormControl } from '@mui/material'
import React, { useEffect, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAmModel } from 'src/redux/actions/AmModelList.action'

function AssetModelSelWithoutName({ value, setValue }) {
  const dispatch = useDispatch()
  const model = useSelector(state => {
    return state.getAmModel.modelList || 0
  })
  useEffect(() => {
    dispatch(getAmModel())
  }, [dispatch])
  return (
    <Box>
      <FormControl fullWidth size="small">
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          onChange={(e, newValue) => setValue(newValue)}
          size="small"
          fullWidth
          variant="outlined"
          sx={{ height: 24, p: 0, m: 0, lineHeight: 1.2 }}
        >
          <Option value={0} disabled>
            Select Model
          </Option>
          {model &&
            model.map((val, index) => {
              return (
                <Option key={index} value={val.model_slno}>
                  {val.model_name}
                </Option>
              )
            })}
        </Select>
      </FormControl>
    </Box>
  )
}

export default memo(AssetModelSelWithoutName)
