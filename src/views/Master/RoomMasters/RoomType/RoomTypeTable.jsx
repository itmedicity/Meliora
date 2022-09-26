import React, { useState, memo, useEffect } from 'react'
import { axioslogin } from 'src/views/Axios/Axios';
import { warningNotify } from 'src/views/Common/CommonCode';
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton';
const RoomTypeTable = ({ count, rowSelect }) => {
    //state for setting table data
    const [tabledata, setTabledata] = useState([])
    const [column] = useState([
        { headerName: "SlNo", field: "rmc_type" },
        { headerName: "Description", field: "rmc_desc", minWidth: 200 },
        { headerName: "Room", field: "rtc_desc", minWidth: 200 },
        { headerName: "Status", field: "status" },
        { headerName: 'Action', cellRenderer: params => <EditButton onClick={() => rowSelect(params)} /> }
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