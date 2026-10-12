import React, { memo } from 'react';
import FormControl from '@mui/material/FormControl';
import { Box, Option, Select } from '@mui/joy';
import { UseRoomTypeDetail } from '../Diet/CommonData/UseQuery';

const RoomCategorySelect = ({ value, setValue }) => {
    const { data: RoomType } = UseRoomTypeDetail();

    
    return (
        <Box>
            <FormControl fullWidth size="small">
                <Select
                    id="demo-simple-select"
                    value={value}
                    onChange={(e, newValue) => setValue(newValue)}
                    size="sm"
                    sx={{ m: 0, backgroundColor: 'transparent', border: 'none', boxShadow: "none" }}
                >
                    <Option value={0} disabled>
                        Select Department
                    </Option>
                    {RoomType &&
                        RoomType?.map((val, index) => {
                            return (
                                <Option key={index} value={val.fb_rc_code}>
                                    {val.fb_rcc_desc}
                                </Option>
                            )
                        })}
                </Select>
            </FormControl>
        </Box>
    )
}
export default memo(RoomCategorySelect)
