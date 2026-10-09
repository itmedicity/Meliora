import React, { memo } from 'react'
import { Box, FormControl, Select, Option } from '@mui/joy'
import { UseRoomCategoryDetail } from '../Diet/CommonData/UseQuery';

const SelectRoomCategory = ({ value, setValue }) => {

    const { data: RoomCategoryDetil = [] } = UseRoomCategoryDetail();


    return (
        <Box>
            <FormControl size="sm" sx={{ width: '100%' }}>
                <Select
                    placeholder="Select Item"
                    value={value}
                    onChange={(e, newValue) => {
                        setValue(newValue)
                    }}
                    size="sm"
                    sx={{
                        p: 0.5, m: 0, lineHeight: 1.2, backgroundColor: 'transparent', border: 'none', boxShadow: "none",
                    }}
                >
                    <Option value={0} disabled>
                        Select Item
                    </Option>

                    {RoomCategoryDetil?.map((val, index) => (
                        <Option key={index} value={val?.diet_rm_category_slno}>
                            {val?.diet_rm_name}
                        </Option>
                    ))}
                </Select>
            </FormControl>
        </Box>
    )
}

export default memo(SelectRoomCategory)

