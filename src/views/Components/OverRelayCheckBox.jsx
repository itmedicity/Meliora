import React, { Fragment } from 'react'
import { CssVarsProvider } from '@mui/joy/styles';
import Checkbox from '@mui/joy/Checkbox';
import Sheet from '@mui/joy/Sheet';

const OverRelayCheckBox = ({
    variant,
    color,
    size,
    disabled,
    label,
    value,
    onCheked,
}) => {
    /*
        // --- varient ---  plain,outlined,soft,solid
        // --- color --- primary,neutral,danger,info,success,warning
        // --- size --- sm , md, lg
    */
    return (
        <Fragment>
            <CssVarsProvider>
                <Sheet
                    variant='outlined'
                    sx={{ p: 0.2, borderRadius: 'xs', display: 'flex' }}
                >
                    <Checkbox
                        overlay
                        variant={variant}
                        color={color}
                        size={size}
                        defaultChecked={false}
                        disabled={disabled}
                        label={label}
                        value={value}
                        onChange={onCheked}
                    />
                </Sheet>
            </CssVarsProvider>
        </Fragment>
    )
}

export default OverRelayCheckBox