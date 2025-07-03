import React, { useEffect, memo, useState } from 'react'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { axioslogin } from '../Axios/Axios'

const CrfDepartmentSelect = ({ value, setValue }) => {
  const [crfDept, setCRfDept] = useState([])
  useEffect(() => {
    const getCrfDept = async () => {
      const result = await axioslogin.get('/requestRegister/getCRFDept/DataCollect')
      const { success, data } = result.data
      if (success === 1) {
        setCRfDept(data)
      } else {
        setCRfDept([])
      }
    }
    getCrfDept()
  }, [])

  return (
    <Box>
      <FormControl fullWidth size="small">
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          value={value}
          onChange={e => setValue(e.target.value)}
          size="small"
          fullWidth
          multiple
          variant="outlined"
          sx={{ height: 24, p: 0, m: 0, lineHeight: 1.2 }}
        >
          <MenuItem value={0} disabled>
            Select Department
          </MenuItem>
          {crfDept &&
            crfDept.map((val, index) => {
              return (
                <MenuItem key={index} value={val.dept_slno}>
                  {val.dept_name}
                </MenuItem>
              )
            })}
        </Select>
      </FormControl>
    </Box>
  )
}

export default memo(CrfDepartmentSelect)
