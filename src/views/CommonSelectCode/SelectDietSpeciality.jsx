import React, { memo } from 'react'
import { Box, FormControl, Select, Option } from '@mui/joy'
import { useAllDietSpeciality } from '../Diet/CommonData/UseQuery'

const SelectDietSpeciality = ({ value, setValue }) => {

    const {
        data: allDietSpeciality = []
    } = useAllDietSpeciality()

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

                    {allDietSpeciality?.map((val, index) => (
                        <Option key={index} value={val?.speciality_id}>
                            {val?.speciality_name}
                        </Option>
                    ))}

                </Select>
            </FormControl>
        </Box>
    )
}

export default memo(SelectDietSpeciality)