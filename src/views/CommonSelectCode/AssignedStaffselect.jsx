import Box from '@mui/material/Box'
import React, { memo } from 'react'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAsignedstaffnurse } from 'src/redux/actions/Asignedstaff.action'
import MenuItem from '@mui/material/MenuItem'

const AssignedStaffselect = ({ value, setValue, shiftto }) => {
  const dispatch = useDispatch()
  const Asignedstaffbynurse = useSelector(state => {
    return state.getAsignedstaffnurse.assignedstaffList || 0
  })

  useEffect(() => {
    if (shiftto !== 0) {
      dispatch(getAsignedstaffnurse(shiftto))
    }
  }, [dispatch, shiftto])

  return (
    <Box sx={{ mt: 1, width: '100%' }}>
      <FormControl fullWidth size="small">
        <Select
          defaultValue=""
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value === null ? 0 : value}
          onChange={e => setValue(e.target.value)}
          size="small"
          fullWidth
          variant="outlined"
          sx={{ height: 25, lineHeight: 1.2 }}
        >
          <MenuItem value={0} disabled>
            Select staff
          </MenuItem>
          {Asignedstaffbynurse &&
            Asignedstaffbynurse.map((val, index) => {
              return (
                <MenuItem key={index} value={val.em_id}>
                  {val.em_name}
                </MenuItem>
              )
            })}
        </Select>
      </FormControl>
    </Box>
  )
}

export default memo(AssignedStaffselect)
