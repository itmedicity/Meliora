import React, { Fragment } from 'react'
import { CssVarsProvider } from '@mui/joy/styles';
import Checkbox from '@mui/joy/Checkbox';
import Close from '@mui/icons-material/Close';

const UnCheckedIcon = ({
    variant,
    color,
    size,
    disabled,
    label,
    value,
    onCheked,
    checked
}) => {
    /*
        // --- varient ---  plain,outlined,soft,solid
        // --- color --- primary,neutral,danger,info,success,warning
        // --- size --- sm , md, lg
    */
    return (
        <Fragment>
            <CssVarsProvider>
                <Checkbox
                    variant={variant}
                    color={color}
                    size={size}
                    defaultChecked={false}
                    disabled={disabled}
                    label={label}
                    value={value}
                    onChange={onCheked}
                    uncheckedIcon={<Close />}
                />
            </CssVarsProvider>
        </Fragment>
    )
}

export default UnCheckedIcon