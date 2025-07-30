import React, { useEffect, memo } from 'react'
import FormControl from '@mui/material/FormControl'
import { useDispatch, useSelector } from 'react-redux'
import { getOMTable } from 'src/redux/actions/OmTableSelect.action'
import { Box, Option, Select } from '@mui/joy'

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
          id="demo-simple-select"
          value={value}
          onChange={(e, newValue) => setValue(newValue)}
          size="small"
          variant="outlined"
          sx={{ height: 24, p: 0, m: 0, lineHeight: 1.2 }}
        >
          <Option value={0} disabled>
            Select OM Table
          </Option>
          {omTableata &&
            omTableata.map((val, index) => {
              return (
                <Option key={index} value={val.omtable_no}>
                  {val.omtable_name}
                </Option>
              )
            })}
        </Select>
      </FormControl>
    </Box>
  )
}

export default memo(OmTableSelect)
