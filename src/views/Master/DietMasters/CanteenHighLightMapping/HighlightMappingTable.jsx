import React, { memo, useState } from 'react'

import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton'

const HighlightMappingTable = ({ rowSelect, tabledata }) => {

    const [column] = useState([

        {
            headerName: 'ID',
            field: 'mapping_id',
            width: 80
        },

        {
            headerName: 'Item Name',
            field: 'item_name',
            flex: 1.5
        },

        {
            headerName: 'Highlight',
            field: 'highlight_name',
            flex: 1
        },

        {
            headerName: 'Title',
            field: 'title',
            flex: 1.5
        },

        {
            headerName: 'Priority',
            field: 'display_priority',
            width: 100
        },

        // START DATE

        {
            headerName: 'Start Date',
            field: 'start_date',
            width: 180,
            valueFormatter: (params) => {
                if (!params.value) return 'Nil'
                return new Date(params.value).toLocaleString()
            }
        },

        {
            headerName: 'End Date',
            field: 'end_date',
            width: 180,
            valueFormatter: (params) => {
                if (!params.value) return 'Nil'
                return new Date(params.value).toLocaleString()
            }
        },

        {
            headerName: 'Status',
            field: 'active_status',
            width: 120,
            cellRenderer: params => (
                params.value === 1
                    ? 'Active'
                    : 'Inactive'
            )
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

export default memo(HighlightMappingTable)