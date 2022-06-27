import React, { Fragment } from 'react';
import IconButton from '@mui/joy/IconButton';
import { CssVarsProvider } from '@mui/joy/styles';

const CusIconButton = ({ children, size, variant, onClick, style, color }) => {
    const cmpstyle = {
        ml: 0.5,

    }
    return (
        <Fragment>
            <CssVarsProvider>
                <IconButton
                    variant={variant}
                    size={size}
                    sx={{ ...cmpstyle, ...style, }}
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