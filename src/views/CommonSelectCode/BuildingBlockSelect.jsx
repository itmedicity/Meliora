import { Box, FormControl, MenuItem, Select } from '@mui/material'
import React from 'react'
import { memo } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBuildingBlock } from 'src/redux/actions/BuildingBlockSelect.action'

const BuildingBlockSelect = ({ value, setValue, setName }) => {
  const dispatch = useDispatch()
  const buildingBlock = useSelector((state) => {
    return state.getBuildingBlock.buildingBlockList || 0
  })
  useEffect(() => {
    dispatch(getBuildingBlock())
  }, [dispatch])
  return (
    <Box>
      <FormControl fullWidth size="small">
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          onChange={(e, { props }) => {
            setValue(e.target.value);
            setName(props.name)
          }}
          size="small"
          fullWidth
          variant="outlined"
          sx={{ height: 24, p: 0, m: 0, lineHeight: 1.2 }}
        >
          <MenuItem value={0} disabled>
            Select Building Block
          </MenuItem>
          {buildingBlock &&
            buildingBlock.map((val, index) => {
              return (
                <MenuItem key={index} value={val.rm_buildblock_slno} name={val.rm_buildblock_alias}>
                  {val.rm_buildblock_name}
                </MenuItem>
              )
            })}
        </Select>
      </FormControl>
    </Box>
  )
}

export default memo(BuildingBlockSelect)
