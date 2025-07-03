import React, { useEffect, memo } from 'react'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { useDispatch, useSelector } from 'react-redux'
import { getOMTable } from 'src/redux/actions/OmTableSelect.action'

const OmTableSelect = ({ value, setValue }) => {
  const dispatch = useDispatch()
  /**setOmTableList -state update function of reducer
   *OmTableList- initial state of reducer function
   *omTableata is used to list select box items by using map
   */
  const omTableata = useSelector(state => {
    return state.setOmTableList.OmTableListdata || 0
  })

  useEffect(() => {
    dispatch(getOMTable())
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
            Select OM Table
          </MenuItem>
          {omTableata &&
            omTableata.map((val, index) => {
              return (
                <MenuItem key={index} value={val.omtable_no}>
                  {val.omtable_name}
                </MenuItem>
              )
            })}
        </Select>
      </FormControl>
    </Box>
  )
}

export default memo(OmTableSelect)
