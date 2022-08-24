import React, { useEffect, memo } from 'react'
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from 'react-redux';
import { getOutlet } from 'src/redux/actions/Outletora.action'
const SelectOraOutlet = ({ value, setValue }) => {
    const dispatch = useDispatch();
    /**getOutlet -state update function of reducer 
*   outletList- initial state of reducer function
*outletdata is used to list select box items by using map
*/
    const outletdata = useSelector((state) => {
        return state.getOutlet.outletList || 0
    })
    useEffect(() => {
        dispatch(getOutlet());
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
                    <MenuItem value={0} disabled  >Select Outlet</MenuItem>
                    {
                        outletdata && outletdata.map((val, index) => {
                            return <MenuItem key={index} value={val.ou_code}>{val.ouc_desc}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </Box >
    )
}

export default memo(SelectOraOutlet)