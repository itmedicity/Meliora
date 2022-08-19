import React, { useEffect, memo } from 'react'
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from 'react-redux';
import Select from "@mui/material/Select";
import { getRmmasteroracle } from 'src/redux/actions/RmmasterOra.action'
const SelectrmmasterOra = ({ value, setValue }) => {
    const dispatch = useDispatch();
    /**getRmmasteroracle -state update function of reducer 
*   rmmasteroraList- initial state of reducer function
*roommasteroradata is used to list select box items by using map
*/
    const roommasteroradata = useSelector((state) => {
        return state.getRmmasteroracle.rmmasteroraList || 0
    })
    useEffect(() => {
        dispatch(getRmmasteroracle());
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
                    <MenuItem value={0} disabled  >Select Room Ora</MenuItem>
                    {
                        roommasteroradata && roommasteroradata.map((val, index) => {
                            return <MenuItem key={index} value={val.rm_code}>{val.rmc_desc}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </Box >
    )
}
export default memo(SelectrmmasterOra)