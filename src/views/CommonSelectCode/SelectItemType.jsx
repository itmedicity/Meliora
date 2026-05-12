
import React, { memo } from 'react';
import FormControl from '@mui/material/FormControl';
import { Box, Option, Select } from '@mui/joy';
import { useAllItemType } from '../Diet/CommonData/UseQuery';

const SelectItemType = ({ value, setValue }) => {

    const {
        data: allItemType = []
    } = useAllItemType()

    return (
        <Box sx={{ width: '100%' }}>
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
                    {allItemType &&
                        allItemType?.map((val, index) => {
                            return (
                                <Option key={index} value={val?.item_type_id}>
                                    {val?.item_type_name}
                                </Option>
                            )
                        })}
                </Select>
            </FormControl>
        </Box>
    )
}
export default memo(SelectItemType)
