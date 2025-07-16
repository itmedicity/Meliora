import { Box, FormControl, Option, Select, } from '@mui/joy'
import React, { memo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCampus } from 'src/redux/actions/CampusSelect.action'

const CampusSelect = ({ value, setValue, setName }) => {
  const dispatch = useDispatch()
  const campusdata = useSelector(state => {
    return state.getCampus.campusList || 0
  })

  useEffect(() => {
    dispatch(getCampus())
  }, [dispatch])
  return (
    <Box>
      <FormControl size="small">
        <Select
          value={value}
          // onChange={(e, { props }) => {
          //   setValue(e.target.value)
          //   setName(props.name)
          // }}
          onChange={(e, newValue) => {
            setValue(newValue);
            const sel = campusdata?.find(c => c.rm_campus_slno === newValue);
            setName(sel?.rm_campus_alias || '');
          }}
          size="md"
          variant="outlined"
          sx={{ height: 20, p: 0, m: 0, lineHeight: 1.2 }}
        >
          <Option value={0} disabled>
            Select Campus
          </Option>
          {campusdata?.map((val, i) => (
            <Option
              key={i}
              value={val.rm_campus_slno}
              data={val.rm_campus_alias}
            >
              {val.rm_campus_name}
            </Option>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

export default memo(CampusSelect)
