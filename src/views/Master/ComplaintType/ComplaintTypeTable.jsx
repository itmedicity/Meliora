import React, { useEffect, useState, memo } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import CusAgGridMast from 'src/views/Components/CusAgGridMast';
import EditButton from 'src/views/Components/EditButton';
const ComplaintTypeTable = ({ geteditdata, count }) => {
    //state for setting table data
    const [tabledata, setTabledata] = useState([])
    //column title setting
    const [column] = useState([
        { headerName: "SlNo", field: "complaint_type_slno" },
        { headerName: "Department Name", field: "complaint_type_name" },
        { headerName: " Complaint Department Name", field: "complaint_dept_name" },
        { headerName: "Status", field: "status" },
        { headerName: 'Action', cellRenderer: EditButton },
    ])
    //for table data
    useEffect(() => {
        const getComplaintType = async () => {
            const result = await axioslogin.get('/complainttype')
            const { success, data } = result.data
            if (success === 1) {
                setTabledata(data)
            } else {
                warningNotify("Error occured contact EDP")
            }
        }
        getComplaintType();
    }, [count])

    return (
        <CusAgGridMast
            columnDefs={column}
            tableData={tabledata}
            onSelectionChanged={geteditdata}
        />
    )
}
export default memo(ComplaintTypeTable)