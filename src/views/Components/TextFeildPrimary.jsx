import { CssVarsProvider } from '@mui/joy/styles';
import Input from '@mui/joy/Input';
import React from 'react'

const TextFeildPrimary = ({
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
    const defaultStyle = {
        '--Input-radius': '0px',
        '--Input-decorator-childHeight': '20px',
    }

    return (
        <CssVarsProvider>
            <Input
                size={size}
                placeholder={placeholder}
                sx={{ ...defaultStyle, ...style }}
                startDecorator={startDecorator}
                endDecorator={endDecorator}
                type={type}
                onChange={onChange}
                value={value}
                defaultValue={defaultValue}
            />
        </CssVarsProvider>
    )
}

export default TextFeildPrimary