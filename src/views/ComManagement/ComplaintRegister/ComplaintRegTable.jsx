import React, { useEffect, useState, memo } from 'react'
import CusAgGridMast from 'src/views/Components/CusAgGridMast';
import { warningNotify } from 'src/views/Common/CommonCode';
import EditButton from 'src/views/Components/EditButton';
import { axioslogin } from 'src/views/Axios/Axios';



const ComplaintRegTable = ({ count, rowSelect }) => {
    //state for setting table data
    const [tabledata, setTabledata] = useState([])
    //column title setting
    const [column] = useState([
        { headerName: "SlNo", field: "complaint_slno" },
        { headerName: "Complaint Description", field: "complaint_desc" },
        { headerName: "DepartmentSec", field: "sec_name" },
        { headerName: "Request Type", field: "req_type_name" },
        { headerName: "Complaint Dept", field: "complaint_dept_name" },
        { headerName: "Complaint Type", field: "complaint_type_name" },
        { headerName: "Priority", field: "priority" },
        { headerName: "Hic Policy", field: "hic_policy_name" },
        { headerName: "Date", field: "compalint_date" },
        //     {
        //         headerName: 'Action',
        //         cellRenderer: params => <EditButton onClick={() => rowSelect(params)} />
        //     }
    ])
    useEffect(() => {
        const getcomplinttable = async () => {
            const result = await axioslogin.get(`/complaintreg/complit`)
            const { success, data } = result.data
            if (success === 1) {
                setTabledata(data)
            }
            else {
                warningNotify("Error occured contact EDP")
            }
        }
        getcomplinttable();
    }, [count])


    return (
        <CusAgGridMast
            columnDefs={column}
            tableData={tabledata}
            onClick={rowSelect}
        />
    )
}

export default memo(ComplaintRegTable)