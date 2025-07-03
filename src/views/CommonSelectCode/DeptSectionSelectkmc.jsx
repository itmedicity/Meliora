import React, { useEffect, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { getDeptsectionTmc } from 'src/redux/actions/DeptSection.action'

const DeptSectionSelectkmc = ({ value, setValue }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getDeptsectionTmc())
  }, [dispatch])
  const deptsectiondata = useSelector(state => {
    return state.getDeptsectionTmc.deptsectionListkmc || 0
  })

  //getDeptsection function is used to update data in deptsection redux

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
            Select Department Section
          </MenuItem>
          {deptsectiondata &&
            deptsectiondata.map((val, index) => {
              return (
                <MenuItem key={index} value={val.sec_id}>
                  {val.sec_name}
                </MenuItem>
              )
            })}
        </Select>
      </FormControl>
    </Box>
  )
}

export default memo(DeptSectionSelectkmc)
