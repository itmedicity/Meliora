import React, { memo } from 'react'
import { Box, FormControl, Select, Option } from '@mui/joy'

import { UseFoodDetail } from '../Diet/CommonData/UseQuery'

const SelectDietItemName = ({ value, setValue,
    setName
}) => {
    const { data: FoodDetail = [] } = UseFoodDetail()
    return (
        <Box>
            <FormControl size="sm" sx={{ width: '100%' }}>
                <Select
                    placeholder="Select Item"
                    value={value}
                    onChange={(e, newValue) => {
                        setValue(newValue)
                        const selected = FoodDetail.find(i => i.item_slno === newValue)
                        setName(selected?.item_name || "")
                    }}
                    size="sm"
                    sx={{
                        p: 0.5, m: 0, lineHeight: 1.2,
                        backgroundColor: 'transparent', border: 'none', boxShadow: "none",
                    }}
                >
                    <Option value={0} disabled>
                        Select Item
                    </Option>

                    {FoodDetail.map((val, index) => (
                        <Option key={index} value={val.item_slno}>
                            {val.item_name}
                        </Option>
                    ))}
                </Select>
            </FormControl>
        </Box>
    )
}

export default memo(SelectDietItemName)

