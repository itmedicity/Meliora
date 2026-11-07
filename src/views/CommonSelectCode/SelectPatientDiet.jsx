import React, { memo } from 'react'
import { Box, FormControl, Select, Option } from '@mui/joy'
import {  useAllPatientDietMaster } from '../Diet/CommonData/UseQuery'

const SelectPatientDiet = ({ value, setValue }) => {

    const {
        data: allDietMaster = []
    } = useAllPatientDietMaster()

    return (
        <Box>
            <FormControl size="sm" fullWidth>
                <Select
                    value={value}
                    onChange={(e, newValue) => {
                        setValue(newValue)
                    }}
                    sx={{
                        p: 0.5,
                        m: 0,
                        lineHeight: 1.2,
                        // backgroundColor: 'transparent',
                        // border: 'none',
                        boxShadow: "none",
                    }}
                >

                    <Option value={""}>
                        Select Item Group
                    </Option>

                    {allDietMaster?.map((val, index) => (
                        <Option key={index} value={val?.diet_id}>
                            {val?.diet_name}
                        </Option>
                    ))}

                </Select>
            </FormControl>
        </Box>
    )
}

export default memo(SelectPatientDiet)