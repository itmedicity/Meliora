import React, { useEffect, useState } from 'react'
import CusAgGridMast from 'src/views/Components/CusAgGridMast';
import EditButton from 'src/views/Components/EditButton';
import { axioslogin } from 'src/views/Axios/Axios';
import { warningNotify } from 'src/views/Common/CommonCode';

const InPatientList = () => {
    //state for setting table data
    const [tabledata, setTabledata] = useState([])
    //column title setting
    const [column] = useState([
        { headerName: "IP No", field: "ip_no" },
        { headerName: "OP No", field: "pt_no" },
        { headerName: "Name", field: "ptc_ptname" },
        { headerName: "Doctor", field: "" },
        { headerName: "Room", field: "" },
        { headerName: 'Action', cellRenderer: EditButton },
    ])

    useEffect(() => {
        const getPatientList = async () => {
            const result = await axioslogin.get('/common/inpatientList')
            const { success, data } = result.data
            if (success === 1) {
                setTabledata(data)
            } else {
                warningNotify("Error occured contact EDP")
            }
        }
        getPatientList();

    }, [])


    return (
        <CusAgGridMast
            columnDefs={column}
            tableData={tabledata}
        //  onSelectionChanged={geteditdata}
        />
    )
}

export default InPatientList