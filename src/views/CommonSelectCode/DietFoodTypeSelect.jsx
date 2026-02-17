import React, { memo } from 'react';
import FormControl from '@mui/material/FormControl';
import { Box, Option, Select } from '@mui/joy';
import { UseFoodTypeDetail } from '../Diet/CommonData/UseQuery';

const DietFoodTypeSelect = ({ value, setValue }) => {

    const { data: foodItem } = UseFoodTypeDetail();

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
                    {foodItem &&
                        foodItem?.map((val, index) => {
                            return (
                                <Option key={index} value={val?.grp_slno}>
                                    {val?.group_name}
                                </Option>
                            )
                        })}
                </Select>
            </FormControl>
        </Box>
    )
}
export default memo(DietFoodTypeSelect)
