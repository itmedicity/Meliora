import React, { useEffect, memo } from 'react'
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from 'react-redux';
import { setOraRoomByRoomType } from 'src/redux/actions/OraRoomByType.action'

const RoomMastSelectOra = ({ value, setValue, Type }) => {
    const dispatch = useDispatch();
    /**getOraRoomByRoomType -state update function of reducer 
    *roomByRoomTypeList- initial state of reducer function
    *oraRoom is used to list select box items by using map
    */
    const oraRoom = useSelector((state) => {
        return state.getOraRoomByRoomType.roomByRoomTypeList || 0
    })
    useEffect(() => {
        dispatch(setOraRoomByRoomType(Type));
    }, [dispatch, Type])

    return (
        <Box   >
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
                    <MenuItem value={0} disabled  >Select Ora Room</MenuItem>
                    {
                        oraRoom && oraRoom.map((val, index) => {
                            return <MenuItem key={index} value={val.rm_code} >{val.rmc_desc}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </Box >
    )
}

export default memo(RoomMastSelectOra)