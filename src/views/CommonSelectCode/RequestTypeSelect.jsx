import React, { useEffect, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { getRequesttype } from 'src/redux/actions/RequestType.action';
const RequestTypeSelect = () => {
    const dispatch = useDispatch();
    /**getRequesttype -state update function of reducer 
* requesttypeList- initial state of reducer function
*requesttypedata is used to list select box items by using map
*/
    const requesttypedata = useSelector((state) => {
        return state.getRequesttype.requesttypeList
    })
    //getRequesttype function is used to update data in requesttype redux
    useEffect(() => {
        dispatch(getRequesttype());
    }, [dispatch])
    return (
        <Box sx={{ mt: 1 }} >
            <FormControl fullWidth size="small"  >
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // value={value}
                    // onChange={(e) => setValue(e.target.value)}
                    size="small"
                    fullWidth
                    variant='outlined'
                    sx={{ height: 24, p: 0, m: 0, lineHeight: 1.200 }}
                >
                    <MenuItem value={0} disabled  >Select Requesttype</MenuItem>
                    {
                        requesttypedata.map((val, index) => {
                            return <MenuItem key={index} value={val.req_type_slno}>{val.req_type_name}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </Box >
    )
}
export default memo(RequestTypeSelect)