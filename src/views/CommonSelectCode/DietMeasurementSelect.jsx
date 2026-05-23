import React, { memo } from 'react';
import FormControl from '@mui/material/FormControl';
import { Box, Option, Select } from '@mui/joy';
import { useAllUnitMaster } from '../Diet/CommonData/UseQuery';


const DietMeasurementSelect = ({ value, setValue }) => {
    const {
        data: allUnits = []
    } = useAllUnitMaster()

    const AllActiveUnits = Array.isArray(allUnits)
        ? allUnits?.filter(i => i.is_active === 1)
        : [];


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
                    {AllActiveUnits &&
                        AllActiveUnits?.map((val, index) => {
                            return (
                                <Option key={index} value={val?.unit_id}>
                                    {val?.unit_name}
                                </Option>
                            )
                        })}
                </Select>
            </FormControl>
        </Box>
    )
}
export default memo(DietMeasurementSelect)
