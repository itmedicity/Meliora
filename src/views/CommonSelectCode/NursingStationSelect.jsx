import React, { useEffect, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNurseStation } from 'src/redux/actions/NursingStation.action'
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

const NursingStationSelect = ({ value, setValue }) => {
  const dispatch = useDispatch()
  /*** getNusringStation -state update function of reducer
   * nusreStationList- initial state of reducer function
   * nursestationdata is used to list select box items by using map
   */
  const nursestationdata = useSelector(state => {
    return state.getNusringStation.nusreStationList || 0
  })
  // setNurseStation function is used to update data in usergroup redux
  useEffect(() => {
    dispatch(setNurseStation())
  }, [dispatch])

  return (
    <Box>
      <FormControl fullWidth size="small">
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          onChange={e => setValue(e.target.value)}
          size="small"
          fullWidth
          variant="outlined"
          sx={{ height: 25, p: 0, m: 0, lineHeight: 1.2 }}
        >
          <MenuItem value={0} disabled>
            Select Nursing Station
          </MenuItem>
          {nursestationdata &&
            nursestationdata.map((val, index) => {
              return (
                <MenuItem key={index} value={val.ns_code}>
                  {val.nsc_desc}
                </MenuItem>
              )
            })}
        </Select>
      </FormControl>
    </Box>
  )
}

export default memo(NursingStationSelect)
