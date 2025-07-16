import { Box, FormControl, Option, Select, } from '@mui/joy'
import React, { memo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBuildingBlock } from 'src/redux/actions/BuildingBlockSelect.action'

const BuildBlockSelect = ({ value, setValue }) => {
  const dispatch = useDispatch()

  const buildingBlock = useSelector(state => {
    return state.getBuildingBlock.buildingBlockList || 0
  })
  useEffect(() => {
    dispatch(getBuildingBlock())
  }, [dispatch])
  return (
    <Box>
      <FormControl size="small">
        <Select

          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }} size="md"
          variant="outlined"
          sx={{ height: 24, p: 0, m: 0, lineHeight: 1.2 }}
        >
          <Option value={0} disabled>
            Select Building Block
          </Option>

          {buildingBlock?.map((val, i) => (
            <Option key={i} value={val.rm_buildblock_slno}>
              {val.rm_buildblock_name}
            </Option>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

export default memo(BuildBlockSelect)
