import { Box, FormControl, MenuItem, Select } from '@mui/material'
import React, { memo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCategory } from 'src/redux/actions/AmCategoryList.action'

const RoomSelectNotJoy = ({ value, setValue }) => {
    const RoomListDeptSecBasd = useSelector((state) => state.getRoomBasedOnDeptSec?.RoomBasedDeptSectionList)

    return (
        <Box>
            <FormControl fullWidth size="small">
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    size="large"
                    fullWidth
                    variant="outlined"
                    sx={{ height: 24, p: 0, m: 0, lineHeight: 1.2 }}
                >
                    <MenuItem value={0} disabled>
                        Select Category
                    </MenuItem>
                    {RoomListDeptSecBasd &&
                        RoomListDeptSecBasd.map((val, index) => {
                            return (
                                <MenuItem key={index} value={val.rm_room_slno}>
                                    {val.rm_room_name}
                                </MenuItem>
                            )
                        })}
                </Select>
            </FormControl>
        </Box>
    )
}

export default memo(RoomSelectNotJoy)