import { Box, FormControl, Option, Select, } from '@mui/joy'
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
      <FormControl size="small">
        <Select
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          size="md"
          variant="outlined"
          sx={{ height: 24, p: 0, m: 0, lineHeight: 1.2 }}
        >
          <Option value={0} disabled>
            Select Building
          </Option>
          {buildingdata?.map((val, i) => (
            <Option
              key={i}
              value={val.rm_building_slno}
              data={val.rm_building_alias}
            >
              {val.rm_building_name}
            </Option>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

export default memo(BuildingSelectWithoutName)
