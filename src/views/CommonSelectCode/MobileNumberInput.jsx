import React, { memo, useCallback } from 'react'
import { Box, Input } from '@mui/joy'

const MobileNumberInput = ({ value, setValue }) => {

    const handleChange = useCallback((e) => {
        const val = e.target.value.replace(/\D/g, '').slice(0, 10)
        setValue(val)
    }, [setValue])

    return (
        <Box>
            <Input
                size="sm"
                placeholder="Mobile Number"
                type="text"
                value={value || ''}
                onChange={handleChange}
                slotProps={{
                    input: {
                        maxLength: 10
                    }
                }}
            />
        </Box>
    )
}

export default memo(MobileNumberInput)
