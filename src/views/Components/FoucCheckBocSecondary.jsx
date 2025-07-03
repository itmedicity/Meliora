import React, { Fragment } from 'react'
import { CssVarsProvider } from '@mui/joy/styles'
import Checkbox, { checkboxClasses } from '@mui/joy/Checkbox'

const FoucCheckBocSecondary = ({ variant, color, size, disabled, label, value, onCheked }) => {
  /*
        // --- varient ---  plain,outlined,soft,solid
        // --- color --- primary,neutral,danger,info,success,warning
        // --- size --- sm , md, lg
    */
  return (
    <Fragment>
      <CssVarsProvider>
        <Checkbox
          variant={variant}
          color={color}
          size={size}
          defaultChecked={false}
          disabled={disabled}
          label={label}
          value={value}
          onChange={onCheked}
          sx={{ [`& > .${checkboxClasses.checkbox}`]: { position: 'relative' } }}
          componentsProps={{ action: { className: checkboxClasses.focusVisible } }}
        />
      </CssVarsProvider>
    </Fragment>
  )
}

export default FoucCheckBocSecondary
