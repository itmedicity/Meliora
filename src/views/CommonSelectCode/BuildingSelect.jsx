import FormControl from '@mui/material/FormControl'
import Box from '@mui/material/Box'
import React, { useEffect, memo } from 'react'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { useDispatch, useSelector } from 'react-redux'
import { getBuilding } from 'src/redux/actions/Building.action'
const BuildingSelect = ({ value, setValue }) => {
  const dispatch = useDispatch()
  /**getBuilding -state update function of reducer
   * buildingList- initial state of reducer function
   *buildingdata is used to list select box items by using map
   */
  const buildingdata = useSelector((state) => {
    return state.getBuilding.buildingList || 0
  })

  //getBuilding function is used to update data in building redux
  useEffect(() => {
    dispatch(getBuilding())
  }, [dispatch])
  return (
    <Box>
      <FormControl fullWidth size="small">
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          // disabled={disabled}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          size="small"
          fullWidth
          variant="outlined"
          sx={{ height: 24, p: 0, m: 0, lineHeight: 1.2 }}
        >
          <MenuItem value={0} disabled>
            Select Building
          </MenuItem>
          {buildingdata &&
            buildingdata.map((val, index) => {
              return (
                <MenuItem key={index} value={val.build_code}>
                  {val.build_name}
                </MenuItem>
              )
            })}
        </Select>
      </FormControl>
    </Box>
  )
}

export default memo(BuildingSelect)
