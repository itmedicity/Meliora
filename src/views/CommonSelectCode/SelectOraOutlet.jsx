import React, { useEffect, memo } from 'react'
import FormControl from '@mui/material/FormControl'
import { useDispatch, useSelector } from 'react-redux'
import { getOutlet } from 'src/redux/actions/Outletora.action'
import { Box, Option, Select } from '@mui/joy'
const SelectOraOutlet = ({ value, setValue }) => {
  const dispatch = useDispatch()
  /**getOutlet -state update function of reducer
   *   outletList- initial state of reducer function
   *outletdata is used to list select box items by using map
   */
  const outletdata = useSelector(state => {
    return state.getOutlet.outletList || 0
  })
  useEffect(() => {
    dispatch(getOutlet())
  }, [dispatch])
  return (
    <Box>
      <FormControl fullWidth size="small">
        <Select
          id="demo-simple-select"
          value={value}
          onChange={(e, newValue) => setValue(newValue)}
          size="sm"
          variant="outlined"
          sx={{ m: 0, }}
        >
          <Option value={0} disabled>
            Select Outlet
          </Option>
          {outletdata &&
            outletdata.map((val, index) => {
              return (
                <Option key={index} value={val.ou_code}>
                  {val.ouc_desc}
                </Option>
              )
            })}
        </Select>
      </FormControl>
    </Box>
  )
}

export default memo(SelectOraOutlet)
