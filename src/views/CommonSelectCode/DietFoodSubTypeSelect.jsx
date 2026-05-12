
import React, { memo } from 'react';
import FormControl from '@mui/material/FormControl';
import { Box, Option, Select } from '@mui/joy';
import { useAllItemCategoryById } from '../Diet/CommonData/UseQuery';

const DietFoodSubTypeSelect = ({ value, setValue, parentId }) => {

  
    // Fetch usingParent
    const { data: allItemCategoryMaster = [] } = useAllItemCategoryById(parentId);


    return (
        <Box sx={{width:'100%'}}>
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
                    {allItemCategoryMaster &&
                        allItemCategoryMaster?.map((val, index) => {
                            return (
                                <Option key={index} value={val?.item_category_id}>
                                    {val?.category_name}
                                </Option>
                            )
                        })}
                </Select>
            </FormControl>
        </Box>
    )
}
export default memo(DietFoodSubTypeSelect)
