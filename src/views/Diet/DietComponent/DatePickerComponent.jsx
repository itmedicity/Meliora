import { Box, Typography } from '@mui/joy'
import React, { memo } from 'react'
import { DatePicker } from '@mui/x-date-pickers'
import TextField from '@mui/material/TextField'

const DatePickerComponent = ({
    label,
    setValue,
    value,
    size,
    minDate,
    maxDate,
    readOnly
}) => {
    return (
        <Box
            sx={{
                alignItems: 'center',
                gap: 1,
                flexWrap: 'wrap',
                width: { xs: '100%', sm: 'auto' },
                mt: 1
            }}
        >
            <Typography
                sx={{
                    fontSize: 12,
                    fontWeight: 500,
                    color: 'var(--royal-purple-400)',
                    fontFamily: 'Bahnschrift',
                    whiteSpace: 'nowrap'
                }}
            >
                {label} :
            </Typography>

            <DatePicker
                readOnly={readOnly}
                value={value}
                minDate={minDate}
                maxDate={maxDate}
                onChange={(newValue) => setValue(newValue)}
                inputFormat="dd/MM/yyyy"
                renderInput={(params) => (
                    <TextField
                        {...params}
                        size="small"
                        sx={{
                            width: { xs: '100%', sm: size ? size : 160 },
                            '& .MuiInputBase-input': {
                                color: 'rgba(var(--font-primary-white))',
                            },
                            '& .MuiInputLabel-root': {
                                color: 'rgba(var(--font-primary-white))',
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'var(--royal-purple-400)',
                            },
                            '& .MuiSvgIcon-root': {
                                color: 'var(--royal-purple-400)',
                            },
                        }}
                    />
                )}
            />
        </Box>
    )
}

export default memo(DatePickerComponent)
