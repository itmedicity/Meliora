import React, { useState, memo } from 'react'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton';
const ManufactureTable = () => {
    const [column] = useState([
        { headerName: "SlNo", field: "slno" },
        { headerName: "Manufacture Name", field: "name" },
        { headerName: "Status", field: "status" },
        { headerName: 'Action', cellRenderer: params => <EditButton /> }
    ])
    const tableData = [
        {
            slno: '1', name: ' PC', status: "Yes"
        }
    ]
    return (
        <CusAgGridMast
            columnDefs={column}
            tableData={tableData}
        />
    )
}
export default memo(ManufactureTable)