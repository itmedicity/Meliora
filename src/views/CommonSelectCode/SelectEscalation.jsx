import React, { memo, useEffect } from 'react'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { useDispatch, useSelector } from 'react-redux'
import { getEscalationMaster } from 'src/redux/actions/EscalationMaster.action'
const SelectEscalation = ({ value, setValue }) => {
  const dispatch = useDispatch()
  const escalationdata = useSelector(state => {
    return state.getEscalationMaster.escalationList || 0
  })
  useEffect(() => {
    dispatch(getEscalationMaster())
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
          sx={{ height: 24, p: 0, m: 0, lineHeight: 1.2 }}
        >
          <MenuItem value={0} disabled>
            Select Escalation
          </MenuItem>
          {escalationdata &&
            escalationdata.map((val, index) => {
              return (
                <MenuItem key={index} value={val.esc_slno}>
                  {val.esc_activity}
                </MenuItem>
              )
            })}
        </Select>
      </FormControl>
    </Box>
  )
}

export default memo(SelectEscalation)
