import React, { useEffect, memo } from 'react'
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from 'react-redux';
import { getDepartment } from 'src/redux/actions/Department.action';
import MenuItem from "@mui/material/MenuItem";
const DepartmentSelect = ({ value, setValue }) => {
    const dispatch = useDispatch();
    /**getDepartment -state update function of reducer 
     * departmentList- initial state of reducer function
     *departmentdata is used to list select box items by using map
     */
    const departmentdata = useSelector((state) => {
        return state.getDepartment.departmentList || 0
    })

    //getDepartment function is used to update data in department redux
    useEffect(() => {
        dispatch(getDepartment())
    }, [dispatch])
    return (
        <Box sx={{ mt: 1 }}>
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
                    <MenuItem value={0} disabled >Select Department</MenuItem>
                    {
                        departmentdata && departmentdata.map((val, index) => {
                            return <MenuItem key={index} value={val.dept_id}>{val.dept_name}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </Box >
    )
}
export default memo(DepartmentSelect);