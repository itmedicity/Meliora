import React, { useEffect, memo, useState } from 'react'
import FormControl from '@mui/material/FormControl'
import { axioslogin } from '../Axios/Axios'
import { Box, Option, Select } from '@mui/joy'

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
          id="demo-simple-select"
          value={value}
          onChange={(e, newValue) => setValue(newValue)}
          size="small"
          variant="outlined"
          sx={{ height: 24, p: 0, m: 0, lineHeight: 1.2 }}
        >
          <Option value={0} disabled>
            Select Category
          </Option>
          {category &&
            category.map((val, index) => {
              return (
                <Option key={index} value={val.complaint_type_slno}>
                  {val.complaint_type_name}
                </Option>
              )
            })}
        </Select>
      </FormControl>
    </Box>
  )
}

export default memo(ComplaintCategorySelect)
