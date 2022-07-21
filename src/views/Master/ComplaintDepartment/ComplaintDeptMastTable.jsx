import React, { useEffect, useState, memo } from 'react'
import { axioslogin } from 'src/views/Axios/Axios';
import { warningNotify } from 'src/views/Common/CommonCode';
import CusAgGridMast from 'src/views/Components/CusAgGridMast';
import EditButton from 'src/views/Components/EditButton';
const ComplaintDeptMastTable = ({ count, rowSelect }) => {
    //state for setting table data
    const [tabledata, setTabledata] = useState([])
    //column title setting
    const [column] = useState([
        { headerName: "SlNo", field: "complaint_dept_slno" },
        { headerName: "Complaint Department Name", field: "complaint_dept_name" },
        { headerName: "Status", field: "status" },
        { headerName: 'Action', cellRenderer: params => <EditButton onClick={() => rowSelect(params)} /> },
    ])
    //get all data
    useEffect(() => {
        const getComplaintDept = async () => {
            const result = await axioslogin.get('/complaintdept')
            const { success, data } = result.data
            if (success === 1) {
                setTabledata(data)
            } else {
                warningNotify("Error occured contact EDP")
            }
        }
        getComplaintDept();
    }, [count])
    return (
        <CusAgGridMast
            columnDefs={column}
            tableData={tabledata}
            onClick={rowSelect}
        />
    )
}
export default memo(ComplaintDeptMastTable)