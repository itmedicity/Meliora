import { CssVarsProvider } from '@mui/joy/'
import TextField from '@mui/joy/TextField'
import React, { Fragment } from 'react'

const TextFieldCustom = ({
  size,
  placeholder,
  type,
  startDecorator,
  endDecorator,
  style,
  onChange,
  value,
  defaultValue
}) => {
  // --- size --> sm,lg,md Default medium Size

  // Text Feild Custome Style 
  const textStyle = {}

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
          onChange={onChange}
          value={value}
          defaultValue={defaultValue}
        />
      </CssVarsProvider>
    </Fragment >
  )
}

export default TextFieldCustom
