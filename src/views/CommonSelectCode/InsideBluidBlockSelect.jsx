import { Box, FormControl, MenuItem, Select } from '@mui/material'
import React from 'react'
import { memo } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getInsideBuildingBlock } from 'src/redux/actions/InsideBuildBlockSelect.action'

const InsideBluidBlockSelect = ({ value, setValue, setName }) => {
  const dispatch = useDispatch()
  const insideBuilding = useSelector((state) => {
    return state.getInsideBuildingBlock.insideBuildList || 0
  })

  useEffect(() => {
    dispatch(getInsideBuildingBlock())
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
            Select Inside Building Block
          </MenuItem>
          {insideBuilding &&
            insideBuilding.map((val, index) => {
              return (
                <MenuItem key={index} value={val.rm_insidebuildblock_slno} name={val.rm_insidebuildblock_alias}>
                  {val.rm_insidebuildblock_name}
                </MenuItem>
              )
            })}
        </Select>
      </FormControl>
    </Box>
  )
}

export default memo(InsideBluidBlockSelect)
