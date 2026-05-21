import React, { memo } from 'react'
import { Box, FormControl, Select, Option } from '@mui/joy'
import { useAllItemGroupMaster } from '../Diet/CommonData/UseQuery'

const SelectDietItemMaster = ({ value, setValue }) => {

    const { data: allItemGroupMaster = [] } = useAllItemGroupMaster()

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

                    {allItemGroupMaster?.map((val, index) => (
                        <Option key={index} value={val?.item_group_id}>
                            {val?.group_name}
                        </Option>
                    ))}

                </Select>
            </FormControl>
        </Box>
    )
}

export default memo(SelectDietItemMaster)