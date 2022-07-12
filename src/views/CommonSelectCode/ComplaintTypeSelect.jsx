import React, { useEffect, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { getComplainttype } from 'src/redux/actions/ComplaintType.action';
const ComplaintTypeSelect = () => {
    const dispatch = useDispatch();
    /**getComplainttype -state update function of reducer 
* complainttypeList- initial state of reducer function
*complainttypedata is used to list select box items by using map
*/
    const complainttypedata = useSelector((state) => {
        return state.getComplainttype.complainttypeList || 0
    })
    //getComplainttype function is used to update data in complainttype redux
    useEffect(() => {
        dispatch(getComplainttype());
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
                    <MenuItem value={0} disabled  >Select Complainttype</MenuItem>
                    {
                        complainttypedata && complainttypedata.map((val, index) => {
                            return <MenuItem key={index} value={val.complaint_type_slno}>{val.complaint_type_name}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </Box >
    )
}
export default memo(ComplaintTypeSelect)