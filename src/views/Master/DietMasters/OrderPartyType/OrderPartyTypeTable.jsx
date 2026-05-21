import React, { useState, memo } from 'react'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton'

const OrderPartyTypeTable = ({ tabledata, rowSelect }) => {

    const [column] = useState([
        {
            headerName: 'ID',
            field: 'party_type_id',
            width: 90
        },

        {
            headerName: 'Party Name',
            field: 'party_name',
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

export default memo(OrderPartyTypeTable)