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
  defaultValue, name
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
          onChange={(e) => onchange(e)}
          value={value}
          defaultValue={defaultValue}
          name={name}
          autoComplete="off"
        />
      </CssVarsProvider>
    </Fragment >
  )
}

export default memo(TextFieldCustom)
