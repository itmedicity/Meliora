import { Box, FormControl, MenuItem, Select } from '@mui/material'
import React, { memo, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'

const AssetListUnderDeptSec = ({ cm_location, cmAssetSlno, setCmAssetSlno }) => {
  const [tabledata, setTabledata] = useState([])

  useEffect(() => {
    const getAssetItembsedonLocation = async cm_location => {
      const result = await axioslogin.get(`Rectifycomplit/getlocationbsedAsset/${cm_location}`)
      const { success, data } = result.data
      if (success === 1) {
        setTabledata(data)
      } else {
        setTabledata([])
      }
    }
    getAssetItembsedonLocation(cm_location)
  }, [cm_location])

  return (
    <Box>
      <FormControl fullWidth size="small">
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={cmAssetSlno}
          onChange={(e, val) => {
            setCmAssetSlno(e.target.value)
            // setSpareNo(val.props.children.join(" "))
          }}
          size="small"
          fullWidth
          variant="outlined"
          sx={{ height: 24, p: 0, m: 0, lineHeight: 1.2 }}
        >
          <MenuItem value={0} disabled>
            Select Asset
          </MenuItem>
          {tabledata &&
            tabledata.map((val, index) => {
              return (
                <MenuItem key={index} value={val.am_item_map_slno}>
                  {val.item_name} ({val.am_asset_no})
                </MenuItem>
              )
            })}
        </Select>
      </FormControl>
    </Box>
  )
}

export default memo(AssetListUnderDeptSec)
