import React, { memo } from 'react'
import { Box, FormControl, Select, Option } from '@mui/joy'

const DietDaysSelect = ({ day, setDay, setDayName }) => {

    const days = [
        { value: 1, label: 'Monday' },
        { value: 2, label: 'Tuesday' },
        { value: 3, label: 'Wednesday' },
        { value: 4, label: 'Thursday' },
        { value: 5, label: 'Friday' },
        { value: 6, label: 'Saturday' },
        { value: 7, label: 'Sunday' },
    ]

    return (
        <Box>
            <FormControl size="sm" sx={{ width: '100%' }}>
                <Select
                    placeholder="Select Days"
                    value={day}
                    onChange={(e, newValue) => {
                        setDay(newValue)
                        const selected = days.find(d => d.value === newValue)
                        setDayName(selected?.label || "")
                    }}
                    size="sm"
                    sx={{

                        p: .5,
                        m: 0,
                    }}
                >
                    <Option value={0} disabled>
                        Select Days
                    </Option>

                    {days.map((d, index) => (
                        <Option key={index} value={d.value}>
                            {d.label}
                        </Option>
                    ))}
                </Select>
            </FormControl>
        </Box>
    )
}

export default memo(DietDaysSelect)
