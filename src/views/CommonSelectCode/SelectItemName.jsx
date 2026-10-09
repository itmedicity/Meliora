import React, { memo, useEffect } from 'react'
import { Box, FormControl, Select, Option } from '@mui/joy'
import { useDispatch, useSelector } from 'react-redux'
import { getItem } from 'src/redux/actions/ItemMaster.action'

const SelectItemName = ({ value, setValue, setName, group }) => {
  const dispatch = useDispatch()

  const itemdata = useSelector(state => state.getItem.itemList || [])

  useEffect(() => {
    dispatch(getItem(group))
  }, [dispatch, group])

  return (
    <Box>
      <FormControl size="sm" sx={{ width: '100%' }}>
        <Select
          placeholder="Select Item"
          value={value}
          onChange={(e, newValue) => {
            setValue(newValue)
            const selected = itemdata.find(i => i.item_slno === newValue)
            setName(selected?.item_name || "")
          }}
          size="sm"
          sx={{
            p: 0.5, m: 0, lineHeight: 1.2, backgroundColor: 'transparent', border: 'none', boxShadow: "none",
          }}
        >
          <Option value={0} disabled>
            Select Item
          </Option>

          {itemdata.map((val, index) => (
            <Option key={index} value={val.item_slno}>
              {val.item_name}
            </Option>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

export default memo(SelectItemName)

