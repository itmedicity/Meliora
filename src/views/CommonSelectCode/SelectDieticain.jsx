
import React, { memo } from 'react'
import { Box, FormControl, Select, Option } from '@mui/joy'
import { useGetDietecian } from '../Diet/CommonData/UseQuery'

const SelectDieticain = ({ value, setValue }) => {

    const { data: Dietecian = [] } = useGetDietecian();

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
                        Select Dieticain
                    </Option>

                    {Dietecian?.map((val, index) => (
                        <Option key={index} value={val?.em_id}>
                            {val?.em_name}
                        </Option>
                    ))}

                </Select>
            </FormControl>
        </Box>
    )
}

export default memo(SelectDieticain)