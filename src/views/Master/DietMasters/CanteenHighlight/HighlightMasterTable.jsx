import React, { memo, useState } from 'react'

import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton'

const HighlightMasterTable = ({ rowSelect, tabledata }) => {

    const [column] = useState([
        {
            headerName: 'ID',
            field: 'highlight_type_id',
            width: 80
        },
        {
            headerName: 'Name',
            field: 'highlight_name',
            flex: 1
        },
        {
            headerName: 'Code',
            field: 'highlight_code',
            flex: 1
        },
        {
            headerName: 'Description',
            field: 'description',
            flex: 1.5
        },
        {
            headerName: 'Icon',
            field: 'icon',
            flex: 1
        },
        {
            headerName: 'Color',
            field: 'color_code',
            width: 120,
            cellRenderer: params => (
                <div
                    style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '4px',
                        background: params.value,
                        marginTop: '8px',
                        border: '1px solid #ccc'
                    }}
                />
            )
        },
        {
            headerName: 'Status',
            field: 'active_status',
            width: 100,
            cellRenderer: params =>
                params.value === 1 ? 'Active' : 'Inactive'
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

export default memo(HighlightMasterTable)