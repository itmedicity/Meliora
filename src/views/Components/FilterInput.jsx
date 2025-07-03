import React from 'react'
import { Input } from '@mui/joy'
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined'

const FilterInput = ({ placeholder, value, onChange }) => {
  return (
    <Input
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      startDecorator={<FilterListOutlinedIcon sx={{ p: 0.2, color: 'grey' }} />}
      sx={{
        '--Input-radius': '0px',
        width: '100%',
        backgroundColor: 'transparent',
        border: 'none',
        boxShadow: 'none',
        color: 'black',
        '&:hover': {
          border: 'none',
          boxShadow: 'none',
        },
        '&::before': {
          transform: 'scaleX(0)',
        },
        '&:focus-within::before': {
          transform: 'scaleX(0)',
        },
      }}
    />
  )
}

export default FilterInput
