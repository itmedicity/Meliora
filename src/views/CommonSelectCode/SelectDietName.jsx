import React, { useEffect, memo } from 'react'
import { Box, FormControl, Select, Option } from '@mui/joy'
import { useDispatch, useSelector } from 'react-redux'
import { getDiet } from 'src/redux/actions/Diet.action'

const SelectDietName = ({ value, setValue,
  //setName 
}) => {
  const dispatch = useDispatch()

  const dietdata = useSelector(state => state.getDiet.dietList ?? [])

  useEffect(() => {
    dispatch(getDiet())
  }, [dispatch])

  return (
    <Box>
      <FormControl size="sm" fullWidth>
        <Select

          value={value}
          onChange={(e, newValue) => {
            setValue(newValue)
            // const selected = dietdata?.find(v => v?.diet_slno === newValue)
            //   setName(selected?.diet_name ?? '')
          }}
          sx={{
            p: 0.5, m: 0, lineHeight: 1.2, backgroundColor: 'transparent', border: 'none', boxShadow: "none",
          }}
        >
          <Option value={0} disabled>
            Select Diet
          </Option>

          {dietdata.map((val, index) => (
            <Option key={index} value={val.diet_slno}>
              {val.diet_name}
            </Option>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

export default memo(SelectDietName)

