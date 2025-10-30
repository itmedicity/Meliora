import React, { useEffect, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import CustomeToolTip from '../Components/CustomeToolTip'
import { getComEmpMap } from 'src/redux/actions/ComEmpMapp.action'
const SelectComTypeUser = ({ value, setValue }) => {
  const dispatch = useDispatch()

  const CoEmpMap = useSelector(state => {
    return state.setComEmpMap.comEmpMapList || 0
  })
  // getDepartemployee function is used to update data in  deptwiseemp redux
  useEffect(() => {
    dispatch(getComEmpMap())
  }, [dispatch])
  const handleChange = e => {
    const {
      target: { value }
    } = e
    setValue(
      // On autofill we get a the stringified value.
      typeof value === 'string' ? value.split(',') : value
    )
  }

  return (
    <Box>
      <CustomeToolTip title="Select Employee">
        <FormControl fullWidth>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            size="small"
            multiple
            value={value}
            onChange={handleChange}
            variant="outlined"
            sx={{ height: 30, p: 0, m: 0, lineHeight: 1.2 }}
          >
            <MenuItem value={0} disabled>
              Select Department Section
            </MenuItem>
            {CoEmpMap &&
              CoEmpMap.map(name => {
                return (
                  <MenuItem key={name.emp_map_slno} value={name.emp_map_slno}>
                    {name.map_section_name}
                  </MenuItem>
                )
              })}
          </Select>
        </FormControl>
      </CustomeToolTip>
    </Box>
  )
}

export default memo(SelectComTypeUser)
