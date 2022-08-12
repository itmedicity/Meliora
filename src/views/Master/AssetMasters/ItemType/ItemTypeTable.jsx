import React, { useState, memo } from 'react'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton';
const ItemTypeTable = () => {
    const [column] = useState([
        { headerName: "Slno", field: "slno" },
        { headerName: "Item type Name", field: "name" },
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
export default memo(ItemTypeTable)