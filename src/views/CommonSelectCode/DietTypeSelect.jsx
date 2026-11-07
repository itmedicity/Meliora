import React, { memo } from 'react';
import FormControl from '@mui/material/FormControl';
import { Box, Option, Select } from '@mui/joy';
import { dietRestrictions } from '../Diet/CommonData/Common';

const DietTypeSelect = ({ value, setValue }) => {
    return (
        <Box>
            <FormControl fullWidth size="small">
                <Select
                    id="demo-simple-select"
                    value={value}
                    onChange={(e, newValue) => setValue(newValue)}
                    size="sm"
                    sx={{ m: 0, backgroundColor: 'transparent', border: 'none', boxShadow: "none", p: 0 }}
                >
                    <Option value={0} disabled>
                        Select Department
                    </Option>
                    {dietRestrictions &&
                        dietRestrictions?.map((val, index) => {
                            return (
                                <Option key={index} value={val.id}>
                                    {val.diet_name}
                                </Option>
                            )
                        })}
                </Select>
            </FormControl>
        </Box>
    )
}
export default memo(DietTypeSelect)
