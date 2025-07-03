import { Box, FormControl, MenuItem, Select } from '@mui/material'
import React, { useEffect } from 'react'
import { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBuildingdata } from 'src/redux/actions/BuildingSelect.action'

const BuildingSelectWithoutName = ({ value, setValue }) => {
  const dispatch = useDispatch()
  const buildingdata = useSelector(state => {
    return state.getBuildingdata.buildingList || 0
  })
  useEffect(() => {
    dispatch(getBuildingdata())
  }, [dispatch])

  return (
    <Box>
      <FormControl fullWidth size="small">
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          onChange={e => setValue(e.target.value)}
          size="small"
          fullWidth
          variant="outlined"
          sx={{ height: 24, p: 0, m: 0, lineHeight: 1.2 }}
        >
          <MenuItem value={0} disabled>
            Select Building
          </MenuItem>
          {buildingdata &&
            buildingdata.map((val, index) => {
              return (
                <MenuItem key={index} value={val.rm_building_slno} name={val.rm_building_alias}>
                  {val.rm_building_name}
                </MenuItem>
              )
            })}
        </Select>
      </FormControl>
    </Box>
  )
}

export default memo(BuildingSelectWithoutName)
