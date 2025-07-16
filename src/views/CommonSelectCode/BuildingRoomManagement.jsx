import { Box, FormControl, Option, Select, } from '@mui/joy'
import React, { useEffect } from 'react'
import { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBuildingdata } from 'src/redux/actions/BuildingSelect.action'

const BuildingRoomManagement = ({ value, setValue, setName }) => {
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
          // onChange={(e, { props }) => {
          //   setValue(e.target.value)
          //   setName(props.name)
          // }}
          onChange={(e, newValue) => {
            setValue(newValue);
            const sel = buildingdata?.find(c => c.rm_building_slno === newValue);
            setName(sel?.rm_building_alias || '');
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
              data-alias={val.rm_building_alias}
            >
              {val.rm_building_name}
            </Option>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

export default memo(BuildingRoomManagement)
