import React, { useEffect, memo, useState } from 'react'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { axioslogin } from '../Axios/Axios'

const ComplaintCategorySelect = ({ value, setValue }) => {
  const [category, setcategory] = useState([])
  useEffect(() => {
    const getcategory = async () => {
      const result = await axioslogin.get('/getTatReports/getCompCategory')
      const { success, data } = result.data
      if (success === 1) {
        setcategory(data)
      } else {
        setcategory([])
      }
    }
    getcategory()
  }, [])

  return (
    <Box sx={{ pt: 1 }}>
      <FormControl fullWidth size="small">
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          onChange={e => setValue(e.target.value)}
          size="small"
          fullWidth
          variant="outlined"
          sx={{ height: 24, p: 0, m: 0, lineHeight: 1.2 }}
        >
          <MenuItem value={0} disabled>
            Select Category
          </MenuItem>
          {category &&
            category.map((val, index) => {
              return (
                <MenuItem key={index} value={val.complaint_type_slno}>
                  {val.complaint_type_name}
                </MenuItem>
              )
            })}
        </Select>
      </FormControl>
    </Box>
  )
}

export default memo(ComplaintCategorySelect)
