import { FormControl, MenuItem, Select } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getHallname } from 'src/redux/actions/Hallmaster.action'
import _ from 'underscore'

const HallMasterSelect = ({ value, setValue }) => {
  const dispatch = useDispatch()

  const hallmaster = useSelector(state => state.getHallMasterSlno.hallnameList, _.isEqual)

  useEffect(() => {
    dispatch(getHallname())
  }, [dispatch])

  return (
    <Box>
      <FormControl fullWidth size="small">
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          // disabled={disabled}
          value={value}
          onChange={e => setValue(e.target.value)}
          size="small"
          fullWidth
          variant="outlined"
          sx={{ height: 24, p: 0, m: 0, lineHeight: 1.2 }}
        >
          <MenuItem value={0} disabled>
            Select Hall name
          </MenuItem>
          {hallmaster &&
            hallmaster.map((val, index) => {
              return (
                <MenuItem key={index} value={val.hall_slno}>
                  {val.hall_name}
                </MenuItem>
              )
            })}
        </Select>
      </FormControl>
    </Box>
  )
}

export default HallMasterSelect
