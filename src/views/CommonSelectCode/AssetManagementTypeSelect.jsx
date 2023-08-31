import { Box, FormControl, MenuItem, Select } from '@mui/material'
import React from 'react'
import { useEffect, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAmAssetType } from 'src/redux/actions/AmAssetTypeList.actions'

const AssetManagementTypeSelect = ({ value, setValue }) => {
  const dispatch = useDispatch()
  const assettype = useSelector((state) => {
    return state.getAmAssetType.AssetTypeList || 0
  })
  useEffect(() => {
    dispatch(getAmAssetType())
  }, [dispatch])
  return (
    <Box>
      <FormControl fullWidth size="small">
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          size="small"
          fullWidth
          variant="outlined"
          sx={{ height: 24, p: 0, m: 0, lineHeight: 1.2 }}
        >
          <MenuItem value={0} disabled>
            Select Asset Type
          </MenuItem>
          {assettype &&
            assettype.map((val, index) => {
              return (
                <MenuItem key={index} value={val.asset_type_slno}>
                  {val.asset_type_name}
                </MenuItem>
              )
            })}
        </Select>
      </FormControl>
    </Box>
  )
}

export default memo(AssetManagementTypeSelect)
