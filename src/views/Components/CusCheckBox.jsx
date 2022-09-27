import React, { Fragment, memo } from 'react'
import { CssVarsProvider } from '@mui/joy/styles';
import Checkbox from '@mui/joy/Checkbox';

const CusCheckBox = ({
    variant,
    color,
    size,
    disabled,
    label,
    value,
    onCheked,
    checked,
    name
}) => {
    /*
        // --- varient ---  plain,outlined,soft,solid
        // --- color --- primary,neutral,danger,info,success,warning
        // --- size --- sm , md, lg
    */
    // console.log(checked)
    return (
        <Fragment>
            <CssVarsProvider>
                <Checkbox
                    variant={variant}
                    color={color}
                    size={size}
                    // defaultChecked={false}
                    disabled={disabled}
                    label={label}
                    value={value}
                    onChange={(e) => onCheked(e)}
                    checked={checked}
                    name={name}
                />
            </CssVarsProvider>
        </Fragment>
    )
}

export default memo(CusCheckBox)