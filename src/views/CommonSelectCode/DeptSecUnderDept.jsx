import React, { useEffect, memo } from 'react'
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from 'react-redux';
import { getDesignation } from 'src/redux/actions/DeptSecDept.action';
import MenuItem from "@mui/material/MenuItem";

const DeptSecUnderDept = ({ value, setValue, dept }) => {
    const dispatch = useDispatch();
    /**getDepartment -state update function of reducer 
     * departmentList- initial state of reducer function
     *departmentdata is used to list select box items by using map
     */
    const deptSecdata = useSelector((state) => {
        return state.getDeptsectionDept.deptsectiondeptList || 0
    })

    //getDepartment function is used to update data in department redux
    useEffect(() => {
        dispatch(getDesignation(dept))
    }, [dispatch, dept])


    return (
        <Box >
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
                    <MenuItem value={0} disabled >Select Department Section</MenuItem>
                    {
                        deptSecdata && deptSecdata.map((val, index) => {
                            return <MenuItem key={index} value={val.sec_id}>{val.sec_name}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </Box >
    )
}

export default memo(DeptSecUnderDept)