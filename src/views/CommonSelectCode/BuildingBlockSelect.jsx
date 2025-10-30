import React from 'react'
import { Box, FormControl, Option, Select, } from '@mui/joy'
import { memo } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBuildingBlock } from 'src/redux/actions/BuildingBlockSelect.action'

const BuildingBlockSelect = ({ value, setValue, setName }) => {
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
          // onChange={(e, { props }) => {
          //   setValue(e.target.value)
          //   setName(props.name)
          // }}
          // size="small"
          onChange={(e, newValue) => {
            setValue(newValue);
            const sel = buildingBlock?.find(c => c.rm_buildblock_slno === newValue);
            setName(sel?.rm_buildblock_alias || '');
          }}
          size="md"

          variant="outlined"
          sx={{ height: 24, p: 0, m: 0, lineHeight: 1.2 }}
        >
          <Option value={0} disabled>
            Select Building Block
          </Option>
          {/* {buildingBlock &&
            buildingBlock.map((val, index) => {
              return (
                <MenuItem key={index} value={val.rm_buildblock_slno} name={val.rm_buildblock_alias}>
                  {val.rm_buildblock_name}
                </MenuItem>
              )
            })} */}

          {buildingBlock?.map((val, i) => (
            <Option
              key={i}
              value={val.rm_buildblock_slno}
              data-alias={val.rm_buildblock_alias}
            >
              {val.rm_buildblock_name}
            </Option>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

export default memo(BuildingBlockSelect)
