import React, { useState, memo, useEffect } from 'react'
import { axioslogin } from 'src/views/Axios/Axios';
import { warningNotify } from 'src/views/Common/CommonCode';
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton';
const RoomTypeTable = ({ count, rowSelect }) => {
    //state for setting table data
    const [tabledata, setTabledata] = useState([])
    const [column] = useState([
        { headerName: 'Action', cellRenderer: params => <EditButton onClick={() => rowSelect(params)} /> },
        { headerName: "SlNo", field: "rmc_type", wrapText: true, minWidth: 300 },
        { headerName: "Description", field: "rmc_desc", wrapText: true, minWidth: 300 },
        { headerName: "Room", field: "rtc_desc", wrapText: true, minWidth: 300 },
        { headerName: "Status", field: "status", wrapText: true, minWidth: 100 },

    ])
    // get all data
    useEffect(() => {
        const getFloor = async () => {
            const result = await axioslogin.get('/roomtype');
            const { success, data } = result.data;
            if (success === 1) {
                setTabledata(data)
            } else {
                warningNotify("Error occured contact EDP")
            }
        }
        getFloor();
    }, [count])

    return (
        <CusAgGridMast
            columnDefs={column}
            tableData={tabledata}
        />
    )
}
export default memo(RoomTypeTable);