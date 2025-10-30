import React, { useEffect, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFloorBasedOnBuild } from 'src/redux/actions/FloorSelectBAsedBuild.action'
import { Box, FormControl, Option, Select, } from '@mui/joy'

const FloorSelectBasedBuild = ({ value, setValue, setName, insertdata }) => {
  const dispatch = useDispatch()
  const FloorData = useSelector(state => {
    return state.getFloorBasedOnBuild.FloorBasedOnBuildList || 0
  })

  //getDepartment function is used to update data in department redux
  useEffect(() => {
    dispatch(getFloorBasedOnBuild(insertdata))
  }, [dispatch, insertdata])

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
            const sel = FloorData?.find(c => c.rm_floor_slno === newValue);
            setName(sel?.rm_floor_alias || '');
          }}
          size="md"

          variant="outlined"
          sx={{ height: 24, p: 0, m: 0, lineHeight: 1.2 }}
        >
          <Option value={0} disabled>
            Select Floor{' '}
          </Option>
          {/* {FloorData &&
            FloorData.map((val, index) => {
              return (
                <MenuItem key={index} value={val.rm_floor_slno} name={val.rm_floor_alias}>
                  {val.rm_floor_name}
                </MenuItem>
              )
            })} */}

          {FloorData?.map((val, i) => (
            <Option
              key={i}
              value={val.rm_floor_slno}
              data-alias={val.rm_floor_alias}
            >
              {val.rm_floor_name}
            </Option>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

export default memo(FloorSelectBasedBuild)
