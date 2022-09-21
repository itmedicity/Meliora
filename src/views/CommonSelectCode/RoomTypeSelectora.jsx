import React, { useEffect } from 'react'
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from 'react-redux';
import { getoraRoomtype } from 'src/redux/actions/Roomtype.action';
const RoomTypeSelectora = ({ value, setValue }) => {
    const dispatch = useDispatch();
    /**getoraRoomtype -state update function of reducer 
* roomtypeList- initial state of reducer function
*hicpolicydata is used to list select box items by using map
*/
    const roomtypedata = useSelector((state) => {
        return state.getoraRoomtype.roomtypeList || 0
    })
    useEffect(() => {
        dispatch(getoraRoomtype());
    }, [dispatch])
    return (
        <Box sx={{ mt: 1 }} >
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
                    <MenuItem value={0} disabled  >Select Room</MenuItem>
                    {
                        roomtypedata && roomtypedata.map((val, index) => {
                            return <MenuItem key={index} value={val.rt_code}>{val.rtc_desc}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </Box >
    )
}

export default RoomTypeSelectora