import { Input } from '@mui/joy'
import React, { memo } from 'react'

const CustomInputDateCmp = ({
    StartIcon,
    placeholder,
    autoComplete,
    slotProps,
    className,
    size,
    type,
    name,
    value,
    handleChange
}) => {
    return (
        <Input
            startDecorator={StartIcon}
            placeholder={placeholder}
            autoComplete={autoComplete}
            sx={{ ...className }}
            slotProps={slotProps}
            size={size}
            type={type}
            name={name}
            value={value}
            onChange={handleChange}
        />
    )
}

export default memo(CustomInputDateCmp) 