import React, { Fragment } from 'react';
import IconButton from '@mui/joy/IconButton';
import { CssVarsProvider } from '@mui/joy/styles';

const CusIconButton = ({ children, size, variant, onClick, style, color }) => {
    const cmpstyle = {}
    return (
        <Fragment>
            <CssVarsProvider>
                <IconButton
                    variant={variant}
                    size={size}
                    sx={{ ...cmpstyle, ...style, padding: 0, m: 0 }}
                    onClick={onClick}
                    color={color}
                >
                    {children}
                </IconButton>
            </CssVarsProvider>
        </Fragment>
    )
}

export default CusIconButton