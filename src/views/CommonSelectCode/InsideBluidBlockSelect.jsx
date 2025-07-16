import { Box, FormControl, Option, Select, } from '@mui/joy'
import React from 'react'
import { memo } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getInsideBuildingBlock } from 'src/redux/actions/InsideBuildBlockSelect.action'

const InsideBluidBlockSelect = ({ value, setValue, setName }) => {
  const dispatch = useDispatch()
  const insideBuilding = useSelector(state => {
    return state.getInsideBuildingBlock.insideBuildList || 0
  })

  useEffect(() => {
    dispatch(getInsideBuildingBlock())
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
          onChange={(e, newValue) => {
            setValue(newValue);
            const sel = insideBuilding?.find(c => c.rm_insidebuildblock_slno === newValue);
            setName(sel?.rm_insidebuildblock_alias || '');
          }}
          size="md"
          variant="outlined"
          sx={{ height: 24, p: 0, m: 0, lineHeight: 1.2 }}
        >
          <Option value={0} disabled>
            Select Inside Building Block
          </Option>
          {/* {insideBuilding &&
            insideBuilding.map((val, index) => {
              return (
                <MenuItem key={index} value={val.rm_insidebuildblock_slno} name={val.rm_insidebuildblock_alias}>
                  {val.rm_insidebuildblock_name}
                </MenuItem>
              )
            })} */}
          {insideBuilding?.map((val, i) => (
            <Option
              key={i}
              value={val.rm_insidebuildblock_slno}
              data-alias={val.rm_insidebuildblock_alias}
            >
              {val.rm_insidebuildblock_name}
            </Option>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

export default memo(InsideBluidBlockSelect)
