import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import React, { useEffect, memo } from 'react'
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import { getRmRoomType } from "src/redux/actions/RmRoomTypeList.action";

const RmRoomTypeSelect = ({ value, setValue }) => {

    const dispatch = useDispatch()
    const roomType = useSelector((state) => {
        return state.getRmRoomType.RmRoomTypeList
    })

    useEffect(() => {
        dispatch(getRmRoomType())
    }, [dispatch])

    return (
        <Box  >
            <FormControl fullWidth size="small"  >
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    size="small"
                    fullWidth
                    variant='outlined'
                    sx={{ height: 24, p: 0, m: 0, lineHeight: 1.200 }}
                >
                    <MenuItem value={0} disabled  >Select Room Type</MenuItem>
                    {
                        roomType && roomType.map((val, index) => {
                            return <MenuItem key={index} value={val.rm_roomtype_slno}>{val.rm_roomtype_name}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </Box >
    )
}

export default memo(RmRoomTypeSelect)