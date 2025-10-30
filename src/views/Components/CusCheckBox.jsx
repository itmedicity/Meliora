import React, { Fragment, memo } from 'react'
import { CssVarsProvider } from '@mui/joy/styles'
import Checkbox from '@mui/joy/Checkbox'

const CusCheckBox = ({ variant, color, size, disabled, label, value, onCheked, checked, name, className }) => {
  /*
        // --- varient ---  plain,outlined,soft,solid
        // --- color --- primary,neutral,danger,info,success,warning
        // --- size --- sm , md, lg
    */
  // console.log(checked)
  return (
    <Fragment>
      <CssVarsProvider>
        <Checkbox
          sx={{ ...className }}
          variant={variant}
          color={color}
          value={value === true ? 1 : 0}
          size={size}
          // defaultChecked={false}
          disabled={disabled}
          label={label}
          onChange={e => onCheked(e)}
          checked={checked}
          name={name}
        />
      </CssVarsProvider>
    </Fragment>
  )
}

export default memo(CusCheckBox)
