import React, { useState, memo } from 'react'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton'

const ItemTypeMasterTable = ({ rowSelect, tabledata }) => {

    const [column] = useState([
        {
            headerName: 'SlNo',
            field: 'item_type_id',
            width: 80
        },
        {
            headerName: 'Item Type Name',
            field: 'item_type_name',
            flex: 1,
            filter: 'agTextColumnFilter',
            floatingFilter: true
        },
        {
            headerName: 'Status',
            field: 'is_active',
            width: 120,
            cellRenderer: params => (params.value === 1 ? 'Active' : 'Inactive')
        },

        {
            headerName: 'Action',
            width: 100,
            cellRenderer: params => (
                <EditButton onClick={() => rowSelect(params)} />
            )
        }
    ])

    const defaultColDef = {
        sortable: true,
        filter: true,
        floatingFilter: true,
        resizable: true
    }

    return (
        <CusAgGridMast
            defaultColDef={defaultColDef}
            columnDefs={column}
            tableData={tabledata}
            onClick={rowSelect}
        />
    )
}

export default memo(ItemTypeMasterTable)