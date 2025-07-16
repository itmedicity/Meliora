import React, { useEffect, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRmRoomCategory } from 'src/redux/actions/RmRoomCategoryList.action'
import { Box, FormControl, Option, Select, } from '@mui/joy'

const RmRoomCategorySelect = ({ value, setValue }) => {
  const dispatch = useDispatch()
  const roomCategory = useSelector(state => {
    return state.getRmRoomCategory.RmRoomCategoryList
  })

  useEffect(() => {
    dispatch(getRmRoomCategory())
  }, [dispatch])

  return (
    <Box>
      <FormControl size="small">
        <Select

          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }} size="md"
          variant="outlined"
          sx={{ height: 24, p: 0, m: 0, lineHeight: 1.2 }}
        >
          <Option value={0} disabled>
            Select Room Category
          </Option>

          {roomCategory?.map((val, i) => (
            <Option
              key={i}
              value={val.rm_roomcategory_slno}
            >
              {val.rm_roomcategory_name}
            </Option>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

export default memo(RmRoomCategorySelect)
