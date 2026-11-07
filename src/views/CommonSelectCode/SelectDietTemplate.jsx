
import React, { memo } from 'react'
import { Box, FormControl, Select, Option } from '@mui/joy'
import { useAllDietTemplate } from '../Diet/CommonData/UseQuery'

const SelectDietTemplate = ({ value, setValue }) => {

    const {
        data: allTemplate = [],
        // isLoading,
        // isError
    } = useAllDietTemplate()

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

                    {allTemplate?.map((val, index) => (
                        <Option key={`${val.template_id}-${index}`} value={val.template_id}>
                            {val.template_name?.toUpperCase()}
                        </Option>
                    ))}

                </Select>
            </FormControl>
        </Box>
    )
}

export default memo(SelectDietTemplate)