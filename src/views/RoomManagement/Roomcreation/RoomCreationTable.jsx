import React, { useState, memo, useEffect } from 'react'
import { axioslogin } from 'src/views/Axios/Axios';
import { warningNotify } from 'src/views/Common/CommonCode';
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton';
const RoomCreationTable = ({ count, rowSelect }) => {
    //state for setting table data
    const [tabledata, setTabledata] = useState([])
    //column title setting
    const [column] = useState([
        { headerName: "SlNo", field: "rmc_slno" },
        { headerName: " Name", field: "rmc_name" },
        { headerName: "Room type", field: "rm_desc1" },
        { headerName: "Room Oracle", field: "rmc_desc" },
        { headerName: "Status", field: "status" },
        { headerName: 'Actions', cellRenderer: params => <EditButton onClick={() => rowSelect(params)} /> }
    ])
    // get all data
    useEffect(() => {
        const getRoomcreation = async () => {
            const result = await axioslogin.get('/roomcreation');
            const { success, data } = result.data;
            if (success === 1) {
                setTabledata(data)
            } else {
                warningNotify("Error occured contact EDP")
            }
        }
        getRoomcreation();
    }, [count])
    return (
        <CusAgGridMast
            columnDefs={column}
            tableData={tabledata}
        />
    )
}
export default memo(RoomCreationTable)