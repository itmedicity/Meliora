import TextareaAutosize from '@mui/base/TextareaAutosize'
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
            <TextareaAutosize
                color='red'
                size={size}
                placeholder={placeholder}
                minRows={minRows}
                style={{ ...style, borderRadius: 5, borderColor: "#A9A9A9", padding: 10 }}
                value={value}
                disabled={disabled}
                onChange={(e) => onchange(e)}
            />
        </Fragment>
    )
}

export default CustomTextarea