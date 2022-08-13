import React, { useState } from 'react'
import CusAgGridMast from 'src/views/Components/CusAgGridMast';
import EditButton from 'src/views/Components/EditButton';

const ComplaintList = () => {
    //state for setting table data
    //   const [tabledata, setTabledata] = useState([])
    //column title setting
    const [column] = useState([
        { headerName: "SlNo", field: "complaint_slno" },
        { headerName: "Complaint Description", field: "complaint_desc" },
        { headerName: "DepartmentSec", field: "sec_name" },
        { headerName: "Request Type", field: "req_type_name" },
        { headerName: "Complaint Dept", field: "complaint_dept_name" },
        { headerName: "Complaint Type", field: "complaint_type_name" },
        { headerName: "Priority", field: "cm_priority" },
        { headerName: "Hic Policy", field: "hic_policy_name" },
        { headerName: "Date", field: "complaint_date" },
        { headerName: 'Action', cellRenderer: EditButton },
    ])

    return (
        <CusAgGridMast
            columnDefs={column}
        // tableData={tabledata}
        //  onSelectionChanged={geteditdata}
        />
    )
}

export default ComplaintList