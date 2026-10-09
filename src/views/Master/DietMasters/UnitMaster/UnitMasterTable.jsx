import React, { useState, memo } from 'react'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton'

const UnitMasterTable = ({ rowSelect, tabledata }) => {

    const [column] = useState([
        {
            headerName: 'ID',
            field: 'unit_id',
            width: 80
        },
        {
            headerName: 'Unit Name',
            field: 'unit_name',
            flex: 1
        },
        {
            headerName: 'Unit Code',
            field: 'unit_code',
            flex: 1
        },
        {
            headerName: 'Unit Type',
            field: 'unit_type',
            flex: 1
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

    return (
        <CusAgGridMast
            columnDefs={column}
            tableData={tabledata}
            onClick={rowSelect}
        />
    )
}

export default memo(UnitMasterTable)