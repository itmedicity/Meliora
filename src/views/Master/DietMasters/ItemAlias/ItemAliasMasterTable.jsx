import React, { useState, memo } from 'react'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton'

const ItemAliasMasterTable = ({ rowSelect, tabledata }) => {

    // Column definitions for AG Grid
    const [column] = useState([
        { headerName: 'SlNo', field: 'alias_id', width: 80 },
        { headerName: 'Item Name', field: 'item_name', flex: 1 },
        { headerName: 'Alias Name', field: 'alias_name', flex: 1 },
        {
            headerName: 'Status',
            field: 'is_active',
            width: 120,
            cellRenderer: params => (params.value === 1 ? 'Active' : 'Inactive')
        },
        {
            headerName: 'Action',
            width: 100,
            cellRenderer: params => <EditButton onClick={() => rowSelect(params)} />
        }
    ])

    return <CusAgGridMast columnDefs={column} tableData={tabledata} onClick={rowSelect} />
}

export default memo(ItemAliasMasterTable)