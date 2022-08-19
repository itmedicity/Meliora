import React, { useEffect, memo } from 'react'
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from 'react-redux';
import Select from "@mui/material/Select";
import { getRmmastermeliora } from 'src/redux/actions/RmmasterMeliora.action'
const RmmasterMeliSelect = ({ value, setValue }) => {
    const dispatch = useDispatch();
    /**getRmmastermeliora -state update function of reducer 
*    rmmastermeliList- initial state of reducer function
*roommastermelidata  is used to list select box items by using map
*/
    const roommastermelidata = useSelector((state) => {
        return state.getRmmastermeliora.rmmastermeliList || 0
    })
    useEffect(() => {
        dispatch(getRmmastermeliora());
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
                    <MenuItem value={0} disabled  >Select Room Meli</MenuItem>
                    {
                        roommastermelidata && roommastermelidata.map((val, index) => {
                            return <MenuItem key={index} value={val.rmc_slno}>{val.rmc_name}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </Box >
    )
}
export default memo(RmmasterMeliSelect)