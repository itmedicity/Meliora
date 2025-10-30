import React, { memo, useEffect } from 'react'
import FormControl from '@mui/material/FormControl'
import { useDispatch, useSelector } from 'react-redux'
import { getEscalationMaster } from 'src/redux/actions/EscalationMaster.action'
import { Box, Option, Select } from '@mui/joy'
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
          id="demo-simple-select"
          value={value}
          onChange={(e, newValue) => setValue(newValue)}
          size="small"
          variant="outlined"
          sx={{ height: 24, p: 0, m: 0, lineHeight: 1.2 }}
        >
          <Option value={0} disabled>
            Select Escalation
          </Option>
          {escalationdata &&
            escalationdata.map((val, index) => {
              return (
                <Option key={index} value={val.esc_slno}>
                  {val.esc_activity}
                </Option>
              )
            })}
        </Select>
      </FormControl>
    </Box>
  )
}

export default memo(SelectEscalation)
