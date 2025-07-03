import React, { useEffect, memo } from 'react'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { useDispatch, useSelector } from 'react-redux'
import { getBranch } from 'src/redux/actions/Branch.action'
import MenuItem from '@mui/material/MenuItem'

const BranchSelectHr = ({ value, setValue }) => {
  const dispatch = useDispatch()
  /**getDepartment -state update function of reducer
   * departmentList- initial state of reducer function
   *departmentdata is used to list select box items by using map
   */
  const branchdata = useSelector(state => {
    return state.getBranch.branchList || 0
  })

  //getDepartment function is used to update data in department redux
  useEffect(() => {
    dispatch(getBranch())
  }, [dispatch])

  return (
    <Box sx={{ mt: 1 }}>
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
            Select Branch
          </MenuItem>
          {branchdata &&
            branchdata.map((val, index) => {
              return (
                <MenuItem key={index} value={val.branch_slno}>
                  {val.branch_name}
                </MenuItem>
              )
            })}
        </Select>
      </FormControl>
    </Box>
  )
}

export default memo(BranchSelectHr)
