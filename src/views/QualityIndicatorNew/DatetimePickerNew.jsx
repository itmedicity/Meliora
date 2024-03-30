import { CssVarsProvider, Input } from '@mui/joy';
import { Box } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format } from 'date-fns';
import React, { memo, useCallback, useState } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';
const DatetimePickerNew = () => {
    const [dailyDate, setDailyDate] = useState(new Date());
    const [timepicker, settimepicker] = useState(new Date())


    const QIDateChange = useCallback((e) => {
        setDailyDate(e.target.value)
        console.log("ghghg");
    }, [])
    console.log(format(new Date(timepicker), "yyyy-MM-dd HH:mm:ss"));

    return (
        <Box sx={{ display: 'flex', }}>
            {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    value={dailyDate}
                    views={['day']}
                    size="small"
                    onChange={(newValue) => {
                        setDailyDate(newValue);
                    }}
                    renderInput={({ inputRef, inputProps, InputProps }) => (
                        <Box sx={{ display: 'flex', alignItems: 'center', }}>
                            <CssVarsProvider>
                                <Input ref={inputRef} {...inputProps} style={{ px: 2, width: '90%' }} disabled={true} />
                            </CssVarsProvider>
                            {InputProps?.endAdornment}
                        </Box>
                    )}

                />
            </LocalizationProvider> */}

            <Box sx={{ pl: 5 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                        value={timepicker}
                        views={['year', 'day', 'hours', 'minutes', 'seconds']}
                        size="small"
                        onChange={(newValue) => {
                            settimepicker(newValue);
                        }}
                        renderInput={({ inputRef, inputProps, InputProps }) => (
                            <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                <CssVarsProvider>
                                    <Input ref={inputRef} {...inputProps} style={{ px: 2, width: '90%' }} />
                                </CssVarsProvider>
                                {InputProps?.endAdornment}
                            </Box>
                        )}
                    />
                </LocalizationProvider>
            </Box>

        </Box>
    )
}

export default memo(DatetimePickerNew)