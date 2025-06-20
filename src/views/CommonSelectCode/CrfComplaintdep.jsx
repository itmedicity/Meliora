import React, { useEffect, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import { getComplaintDept } from 'src/redux/actions/ComplaintDept.action'
import { Option, Select } from '@mui/joy';

const CrfComplaintdep = ({ value, setValue }) => {
    const dispatch = useDispatch();

    const complaintdeptdata = useSelector((state) =>
        state.getComplaintDept.complaintdeptList || []
    );

    // Fetch complaint departments
    useEffect(() => {
        dispatch(getComplaintDept())
    }, [dispatch]);

    return (
        <Box >
            <FormControl size="small" sx={{ width: "100%" }}>
                <Select
                    value={value ? JSON.stringify(value) : "0"}
                    onChange={(e, newValue) => {
                        if (newValue !== "0") {
                            setValue(JSON.parse(newValue));
                        }
                    }}
                    size="small"
                    variant='outlined'
                    sx={{ height: 34, p: 0, m: 0, lineHeight: 1.2, }}
                >
                    <Option value="0" disabled>Select Complaint Department</Option>
                    {
                        complaintdeptdata.map((val, index) => (
                            <Option
                                key={index}
                                value={JSON.stringify({
                                    complaint_dept_slno: val.complaint_dept_slno,
                                    department_slno: val.department_slno
                                })}
                            >
                                {val.complaint_dept_name}
                            </Option>
                        ))
                    }
                </Select>
            </FormControl>
        </Box>
    )
}

export default memo(CrfComplaintdep)
