import { Box, FormControl, MenuItem, Select } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAmSubGroupList } from 'src/redux/actions/AmSubGroupList.action'

const AssetSubGroupSelect = ({ value, setValue, group }) => {
  const dispatch = useDispatch()
  const subgroup = useSelector((state) => {
    return state.getAmSubGroupList.SubGroupList || 0
  })
  useEffect(() => {
    dispatch(getAmSubGroupList(group))
  }, [dispatch, group])
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
            Select Subgroup
          </MenuItem>
          {subgroup &&
            subgroup.map((val, index) => {
              return (
                <MenuItem key={index} value={val.subgroup_slno}>
                  {val.sub_group_name}
                </MenuItem>
              )
            })}
        </Select>
      </FormControl>
    </Box>
  )
}

export default memo(AssetSubGroupSelect)
