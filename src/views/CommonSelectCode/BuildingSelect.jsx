import { Box, Option, Select } from '@mui/joy'
import FormControl from '@mui/material/FormControl'
import React, { useEffect, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBuilding } from 'src/redux/actions/Building.action'
const BuildingSelect = ({ value, setValue }) => {
  const dispatch = useDispatch()
  /**getBuilding -state update function of reducer
   * buildingList- initial state of reducer function
   *buildingdata is used to list select box items by using map
   */
  const buildingdata = useSelector(state => {
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
          id="demo-simple-select"
          // disabled={disabled}
          value={value}
          onChange={(e, newValue) => setValue(newValue)}
          size="small"
          variant="outlined"
          sx={{}}
        >
          <Option value={0} disabled>
            Select Building
          </Option>
          {buildingdata &&
            buildingdata.map((val, index) => {
              return (
                <Option key={index} value={val.build_code}>
                  {val.build_name}
                </Option>
              )
            })}
        </Select>
      </FormControl>
    </Box>
  )
}

export default memo(BuildingSelect)
