import React, { useEffect, memo } from 'react'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { useDispatch, useSelector } from 'react-redux'
import MenuItem from '@mui/material/MenuItem'
import { getFloorBasedOnBuild } from 'src/redux/actions/FloorSelectBAsedBuild.action'

const FloorSelectBasedBuild = ({ value, setValue, buildno, setName, insertdata }) => {
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
      <FormControl fullWidth size="small">
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          onChange={(e, { props }) => {
            setValue(e.target.value)
            setName(props.name)
          }}
          size="small"
          fullWidth
          variant="outlined"
          sx={{ height: 24, p: 0, m: 0, lineHeight: 1.2 }}
        >
          <MenuItem value={0} disabled>
            Select Floor{' '}
          </MenuItem>
          {FloorData &&
            FloorData.map((val, index) => {
              return (
                <MenuItem key={index} value={val.rm_floor_slno} name={val.rm_floor_alias}>
                  {val.rm_floor_name}
                </MenuItem>
              )
            })}
        </Select>
      </FormControl>
    </Box>
  )
}

export default memo(FloorSelectBasedBuild)
