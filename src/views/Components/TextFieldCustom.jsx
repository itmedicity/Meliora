import { CssVarsProvider } from '@mui/joy/'
import TextField from '@mui/joy/TextField'
import React, { Fragment, memo } from 'react'

const TextFieldCustom = ({
  size,
  placeholder,
  type,
  startDecorator,
  endDecorator,
  style,
  onchange,
  value,
  min,
  defaultValue, name, disabled
}) => {
  // --- size --> sm,lg,md Default medium Size

  // Text Feild Custome Style 
  const textStyle = { width: "100%", height: "100%" }



  return (
    <Fragment>
      <CssVarsProvider>
        <TextField
          size={size}
          placeholder={placeholder}
          type={type}
          startDecorator={startDecorator}
          endDecorator={endDecorator}
          sx={{ ...textStyle, ...style }}
          onChange={(e) => onchange(e)}
          min={min}
          value={value}
          defaultValue={defaultValue}
          name={name}
          autoComplete="off"
          disabled={disabled}
        />
      </CssVarsProvider>
    </Fragment >
  )
}

export default memo(TextFieldCustom)
