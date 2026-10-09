import React, { memo } from 'react'
import { Box, Option, Select, Typography } from '@mui/joy'
import FormControl from '@mui/material/FormControl'

const CustomSelectWithLabel = ({
    values,
    value,
    handleChangeSelect,
    onChange,
    setValue,
    dataCollection,
    labelName,
    placeholder,
    disabled
}) => {
    const selectedValue = values !== undefined ? values : (value !== undefined ? value : 0)

    const handleOnChange = (e, newValue) => {
        if (handleChangeSelect) {
            handleChangeSelect(e, newValue)
        } else if (onChange) {
            onChange(e, newValue)
        } else if (setValue) {
            setValue(newValue)
        }
    }

    return (
        <Box className="flex flex-1 flex-col">
            {labelName && (
                <Typography
                    level="body-sm"
                    sx={{
                        fontWeight: 600,
                        fontFamily: 'var(--font-varient)',
                        opacity: 0.8,
                        paddingLeft: '0.26rem',
                        lineHeight: '1.0rem',
                        fontSize: '0.81rem',
                        color: 'rgba(var(--font-primary-white))',
                        paddingY: '0.26rem',
                    }}
                >
                    {labelName}
                </Typography>
            )}

            <FormControl fullWidth size="small">
                <Select
                    id="demo-simple-select"
                    value={selectedValue}
                    onChange={handleOnChange}
                    size="sm"
                    variant="outlined"
                    disabled={disabled}
                    sx={{ m: 0, width: '100%' }}
                >
                    <Option value={0} disabled>
                        {placeholder || 'Select here ...'}
                    </Option>
                    {dataCollection &&
                        dataCollection.map((val, index) => {
                            return (
                                <Option
                                    key={index}
                                    value={val.value !== undefined ? val.value : val.id}
                                >
                                    {val.label || val.name}
                                </Option>
                            )
                        })}
                </Select>
            </FormControl>
        </Box>
    )
}

export default memo(CustomSelectWithLabel)