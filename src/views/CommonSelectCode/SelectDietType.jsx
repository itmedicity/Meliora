import React, { useEffect, memo } from 'react'
import { Box, FormControl, Select, Option } from '@mui/joy'
import { useDispatch, useSelector } from 'react-redux'
import { getDiettype } from 'src/redux/actions/DietType.action'

const SelectDietType = ({ value, setValue }) => {
  const dispatch = useDispatch()

  const diettypedata = useSelector(state => state.getDiettype.diettypeList || [])

  useEffect(() => {
    dispatch(getDiettype())
  }, [dispatch])

  return (
    <Box>
      <FormControl size="sm" sx={{ width: '100%' }}>
        <Select
          value={value}
          onChange={(e, newValue) => setValue(newValue)}
          placeholder="Select Diet Type"
          size="sm"
          sx={{ p: .5, m: 0 }}
        >
          <Option value={0} disabled>
            Select Diet Type
          </Option>

          {diettypedata.map((val, index) => (
            <Option key={index} value={val.type_slno}>
              {val.type_desc}
            </Option>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

export default memo(SelectDietType)

