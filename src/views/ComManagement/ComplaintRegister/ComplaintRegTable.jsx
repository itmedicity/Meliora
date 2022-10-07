import React, { useEffect, useState, memo } from 'react'
import CusAgGridMast from 'src/views/Components/CusAgGridMast';
import { warningNotify } from 'src/views/Common/CommonCode';
import EditButton from 'src/views/Components/EditButton';
import { axioslogin } from 'src/views/Axios/Axios';



const ComplaintRegTable = ({ count, rowSelect, sec }) => {

    //state for setting table data
    const [tabledata, setTabledata] = useState([])
    //column title setting
    const [column] = useState([
        { headerName: "SlNo", field: "complaint_slno", minWidth: 10 },
        { headerName: "Date", field: "compalint_date" },
        { headerName: "complaint dept", field: "dept_name", filter: "true", autoHeight: true, wrapText: true, },
        { headerName: "Request Type", field: "req_type_name" },
        { headerName: "Complaint Type", field: "complaint_type_name" },
        { headerName: "Complaint Description", field: "complaint_desc", autoHeight: true, wrapText: true, minWidth: 250 },
        { headerName: "Priority", field: "priority" },
        { headerName: "Status", field: "compalint_status", filter: "true" },
        {
            headerName: 'Action',
            cellRenderer: params => <EditButton onClick={() => rowSelect(params)} />
        }
    ])
    useEffect(() => {
        const getcomplinttable = async () => {
            const result = await axioslogin.get(`/complaintreg/loginbysec/${sec}`)
            const { success, data } = result.data
            if (success === 1) {
                setTabledata(data)
            }
            else {
                warningNotify("Error occured contact EDP")
            }
        }
        getcomplinttable();
    }, [count, sec])


    return (
        <CusAgGridMast
            columnDefs={column}
            tableData={tabledata}
            onClick={rowSelect}
        />
    )
}

export default memo(ComplaintRegTable)