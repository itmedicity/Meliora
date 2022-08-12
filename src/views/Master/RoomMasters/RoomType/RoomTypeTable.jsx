import React, { useState, memo } from 'react'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton';
const RoomTypeTable = () => {
    const [column] = useState([
        { headerName: "SlNo", field: "slno" },
        { headerName: "Description", field: "name" },
        { headerName: "Short Name", field: "name" },
        { headerName: "Room Category", field: "name" },
        { headerName: "Bed releases From", field: "name" },
        { headerName: "Colour", field: "name" },
        { headerName: "Icu", field: "status" },
        { headerName: "Common occupy", field: "status" },
        { headerName: "Admitted Room Category", field: "status" },
        { headerName: "Room Incharge Mobile no", field: "status" },
        { headerName: "Shared Room", field: "status" },
        { headerName: "Status", field: "status" },
        { headerName: 'Action', cellRenderer: params => <EditButton /> }
    ])
    const tableData = [
        {
            slno: '1', name: '1st', status: "Yes"
        }
    ]
    return (
        <CusAgGridMast
            columnDefs={column}
            tableData={tableData}
        />
    )
}
export default memo(RoomTypeTable);