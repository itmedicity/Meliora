import { CssVarsProvider, Radio } from '@mui/joy'
import React, { memo } from 'react'

const CustomRadioButtonCmp = ({ label, color, size, checked, className, handleChange }) => {
  return (
    <CssVarsProvider>
      <Radio
        label={label}
        color={color}
        size={size}
        checked={checked}
        onChange={handleChange}
        sx={{ ...className }}
      />
    </CssVarsProvider>
  )
}
export default memo(CustomRadioButtonCmp)
