import React, { memo, useEffect } from 'react'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { useDispatch, useSelector } from 'react-redux'
import { getItem } from 'src/redux/actions/ItemMaster.action'
const SelectItemmaster = ({ value, setValue }) => {
  const dispatch = useDispatch()
  /**getItem -state update function of reducer
   *   itemList- initial state of reducer function
   *itemdata is used to list select box items by using map
   */
  const itemdata = useSelector(state => {
    return state.getItem.itemList || 0
  })
  useEffect(() => {
    dispatch(getItem())
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
            Select Item
          </MenuItem>
          {itemdata &&
            itemdata.map((val, index) => {
              return (
                <MenuItem key={index} value={val.item_slno}>
                  {val.item_name}
                </MenuItem>
              )
            })}
        </Select>
      </FormControl>
    </Box>
  )
}

export default memo(SelectItemmaster)
