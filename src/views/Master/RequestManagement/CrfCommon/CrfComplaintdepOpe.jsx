import React, { useEffect, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getComplaintDept } from 'src/redux/actions/ComplaintDept.action'
import { Option, Select } from '@mui/joy';

const CrfComplaintdepOpe = ({ value, setValue }) => {
    const dispatch = useDispatch();
    const complaintdeptdata = useSelector((state) => {
        return state.getComplaintDept.complaintdeptList || 0
    })

    //getComplaintdept function is used to update data in complaintdepartment redux
    useEffect(() => {
        dispatch(getComplaintDept())
    }, [dispatch])
    return (
        < >
            <Select
                value={complaintdeptdata.some(item => item.complaint_dept_slno === value) ? value : 0}
                onChange={(e, newValue) => setValue(newValue)}
                size="sm"
                variant='outlined'
            >
                <Option value={0} disabled  >Select Complaint Department</Option>
                {
                    complaintdeptdata && complaintdeptdata.map((val, index) => {
                        return <Option key={index} value={val.complaint_dept_slno}>{val.complaint_dept_name}</Option>
                    })
                }
            </Select>
        </ >
    )
}

export default memo(CrfComplaintdepOpe) 