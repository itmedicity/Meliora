import { Box, FormControl, MenuItem, Select } from '@mui/material'
import React from 'react'
import { useEffect, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAmItemType } from 'src/redux/actions/AmItemTypeList.actions'

const AssetItemSelect = ({ value, setValue, setName }) => {
  const dispatch = useDispatch()
  const itemtype = useSelector((state) => {
    return state.getAmItemType.ItemTypeList || 0
  })
  useEffect(() => {
    dispatch(getAmItemType())
  }, [dispatch])
  return (
    <Box>
      <FormControl fullWidth size="small">
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          onChange={(e, { props }) => {
            setValue(e.target.value)
            setName(props.name)
          }}
          size="small"
          fullWidth
          variant="outlined"
          sx={{ height: 24, p: 0, m: 0, lineHeight: 1.2 }}
        >
          <MenuItem value={0} disabled>
            Select Item Type
          </MenuItem>
          {itemtype &&
            itemtype.map((val, index) => {
              return (
                <MenuItem key={index} name={val.item_type_name} value={val.item_type_slno}>
                  {val.item_type_name}
                </MenuItem>
              )
            })}
        </Select>
      </FormControl>
    </Box>
  )
}

export default memo(AssetItemSelect)
