import { CssVarsProvider } from '@mui/joy'
import TextareaAutosize from '@mui/material/TextareaAutosize'
import React, { Fragment } from 'react'

const CustomTextarea = ({
    minRows,
    style,
    placeholder,
    onchange,
    value,
    disabled,
    size

}) => {
    // const textStyle = { width: "100%", height: "100%" }

    return (
        <Fragment>
            <CssVarsProvider>
                <TextareaAutosize
                    size={size}
                    placeholder={placeholder}
                    minRows={minRows}
                    style={{ ...style }}
                    //sx={{ ...style }}
                    value={value}
                    disabled={disabled}
                    onChange={(e) => onchange(e)}
                />
            </CssVarsProvider>
        </Fragment>
    )
}

export default CustomTextarea