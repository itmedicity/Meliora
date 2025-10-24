import React, { useEffect, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNurseStation } from 'src/redux/actions/NursingStation.action'
import FormControl from '@mui/material/FormControl'
import { Box, Option, Select } from '@mui/joy'

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
          id="demo-simple-select"
          value={value}
          onChange={(e, newValue) => setValue(newValue)}
          size="small"
          variant="outlined"
          sx={{}}
        >
          <Option value={0} disabled>
            Select Nursing Station
          </Option>
          {nursestationdata &&
            nursestationdata.map((val, index) => {
              return (
                <Option key={index} value={val.ns_code}>
                  {val.nsc_desc}
                </Option>
              )
            })}
        </Select>
      </FormControl>
    </Box>
  )
}

export default memo(NursingStationSelect)
