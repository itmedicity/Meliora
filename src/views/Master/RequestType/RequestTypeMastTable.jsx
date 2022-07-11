import React, { useEffect, useState, memo } from 'react'
import CusAgGridMast from 'src/views/Components/CusAgGridMast';
import EditButton from 'src/views/Components/EditButton';
import { warningNotify } from 'src/views/Common/CommonCode';
import { axioslogin } from 'src/views/Axios/Axios';
const RequestTypeMastTable = ({ geteditdata, count }) => {
    //state for setting table data
    const [tabledata, setTabledata] = useState([]);
    //column title name setting
    const [column] = useState([
        { headerName: "SlNo", field: "req_type_slno" },
        { headerName: "Request Type Name", field: "req_type_name" },
        { headerName: "Status", field: "status" },
        { headerName: 'Action', cellRenderer: EditButton },
    ])
    //get all data 
    useEffect(() => {
        const getRequestType = async () => {
            const result = await axioslogin.get('/requesttype')
            const { success, data } = result.data
            if (success === 1) {
                setTabledata(data)
            } else {
                warningNotify("Error occured contact EDP")
            }
        }
        getRequestType();
    }, [count])
    return (
        <CusAgGridMast
            columnDefs={column}
            tableData={tabledata}
            onSelectionChanged={geteditdata}
        />
    )
}
export default memo(RequestTypeMastTable)