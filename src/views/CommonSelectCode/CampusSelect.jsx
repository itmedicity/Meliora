import { Box, FormControl, MenuItem, Select } from '@mui/material'
import React, { memo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCampus } from 'src/redux/actions/CampusSelect.action'

const CampusSelect = ({ value, setValue, setName }) => {
  const dispatch = useDispatch()
  const campusdata = useSelector(state => {
    return state.getCampus.campusList || 0
  })

  useEffect(() => {
    dispatch(getCampus())
  }, [dispatch])
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
            Select Campus
          </MenuItem>
          {campusdata &&
            campusdata.map((val, index) => {
              return (
                <MenuItem key={index} value={val.rm_campus_slno} name={val.rm_campus_alias}>
                  {val.rm_campus_name}
                </MenuItem>
              )
            })}
        </Select>
      </FormControl>
    </Box>
  )
}

export default memo(CampusSelect)
