import { Box, FormControl, MenuItem, Select } from '@mui/material'
import React, { memo } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getGroup } from 'src/redux/actions/AmGroupList.action'

const AssetGroupSlect = ({ value, setValue }) => {
  const dispatch = useDispatch()
  const group = useSelector((state) => {
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
          onChange={(e) => setValue(e.target.value)}
          size="small"
          fullWidth
          variant="outlined"
          sx={{ height: 24, p: 0, m: 0, lineHeight: 1.2 }}
        >
          <MenuItem value={0} disabled>
            Select Group
          </MenuItem>
          {group &&
            group.map((val, index) => {
              return (
                <MenuItem key={index} value={val.group_slno}>
                  {val.group_name}
                </MenuItem>
              )
            })}
        </Select>
      </FormControl>
    </Box>
  )
}

export default memo(AssetGroupSlect)
