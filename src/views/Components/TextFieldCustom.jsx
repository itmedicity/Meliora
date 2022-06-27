import { CssVarsProvider, TextField as InputText } from '@mui/joy'
import { TextField } from '@mui/material'
import { Box, styled } from '@mui/system'
import React, { Fragment } from 'react'
import FormControlUnstyled, { FormControlUnstyledState } from '@mui/base/FormControlUnstyled'
import InputUnstyled, { inputUnstyledClasses } from '@mui/base/InputUnstyled'

const blue = {
  100: '#DAECFF',
  200: '#80BFFF',
  400: '#3399FF',
  600: '#0072E5',
}

const grey = {
  50: '#F3F6F9',
  100: '#E7EBF0',
  200: '#E0E3E7',
  300: '#CDD2D7',
  400: '#B2BAC2',
  500: '#A0AAB4',
  600: '#6F7E8C',
  700: '#3E5060',
  800: '#2D3843',
  900: '#1A2027',
}

const Input = styled(InputUnstyled)(
  ({ theme }) => `
    
    display: inline-block;
  
    .${inputUnstyledClasses.input} {
      width: '100%';
      font-size: 1.230rem;
      // font-family: Roboto;
      font-weight: 500;
      line-height: 1.170;
      color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
      background: ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
      border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[300]};
      border-radius: 3px;
      padding: 2px 2px 2px 2px;
      font-family: [
        -apple-system,
        BlinkMacSystemFont,
        Segoe UI,
        Roboto,
        Helvetica Neue,
        Arial,
        sans-serif,
        Apple Color Emoji,
        Segoe UI Emoji,
        Segoe UI Symbol,
      ],
      &:hover {
        background: ${theme.palette.mode === 'dark' ? '' : grey[100]};
        border-color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
      }
  
      &:focus {
        outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[100]};
      }
    }
  
    &.filled .${inputUnstyledClasses.input} {
      box-shadow: 0 0 2px 2px rgba(125, 200, 0, 0.25);
    //   box-shadow: 0 0 2px 2px red;
    }
  `,
)

const TextFieldCustom = () => {
  return (
    <Fragment>
      {/* <Box sx={{ width: 300 }}>
        <CssVarsProvider>
          <InputText
            sx={{
              borderRadius: 20,
              borderColor: 'red',
              height: 20,
            }}
            placeholder="saadasdasdad"
          />
        </CssVarsProvider>
      </Box> */}
      {/* <Box sx={{ width: 300 }}> */}
      <FormControlUnstyled defaultValue="" required>
        {({ filled, focused }: FormControlUnstyledState) => (
          <React.Fragment>
            <Input className={filled ? 'filled' : ''} />
            {/* {filled && !focused && <OkMark>✔</OkMark>} */}
          </React.Fragment>
        )}
      </FormControlUnstyled>
      {/* </Box> */}
    </Fragment>
  )
}

export default TextFieldCustom
