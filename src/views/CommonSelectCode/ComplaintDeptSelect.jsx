import React, { useEffect, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import { getComplaintDept } from 'src/redux/actions/ComplaintDept.action'
const ComplaintDeptSelect = ({ value, setValue }) => {
    const dispatch = useDispatch();
    /**getComplaintdept -state update function of reducer 
      * complaintdeptList- initial state of reducer function
      *complaintdeptdata is used to list select box items by using map
      */
    const complaintdeptdata = useSelector((state) => {
        return state.getComplaintDept.complaintdeptList
    })
    //getComplaintdept function is used to update data in complaintdepartment redux
    useEffect(() => {
        dispatch(getComplaintDept())
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
                    <MenuItem value={0} disabled  >Select Complaint Department</MenuItem>
                    {
                        complaintdeptdata.map((val, index) => {
                            return <MenuItem key={index} value={val.complaint_dept_slno}>{val.complaint_dept_name}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </Box >
    )
}
export default memo(ComplaintDeptSelect)