import { Box, Option, Select } from '@mui/joy'
import { FormControl } from '@mui/material'
import React, { memo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getGroup } from 'src/redux/actions/AmGroupList.action'

const AssetGroupSelectWithoutName = ({ value, setValue }) => {
  const dispatch = useDispatch()
  const group = useSelector(state => {
    return state.getGroup.AssetGroupList || 0
  })
  useEffect(() => {
    dispatch(getGroup())
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
            Select Group
          </Option>
          {group &&
            group.map((val, index) => {
              return (
                <Option key={index} value={val.group_slno}>
                  {val.group_name}
                </Option>
              )
            })}
        </Select>
      </FormControl>
    </Box>
  )
}

export default memo(AssetGroupSelectWithoutName)
