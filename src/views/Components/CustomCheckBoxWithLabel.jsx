import { Checkbox } from '@mui/joy'
import React from 'react'
import { memo } from 'react'

const CustomCheckBoxWithLabel = ({
    checkBoxValue,
    handleCheckBoxValue,
    label,
    disabled
}) => {
    return (
        <Checkbox
            label={<div
                style={{
                    color: 'rgba(var(--font-primary-white))',
                    fontFamily: "var(--font-varient)",
                }} >{label}</div>}
            variant="outlined"
            color="neutral"
            size="lg"
            checked={Boolean(checkBoxValue)}
            onChange={handleCheckBoxValue}
            disabled={disabled}
            sx={{ fontSize: "0.950rem" }}
        />
    )
}

export default memo(CustomCheckBoxWithLabel)