import React, { memo, useMemo } from 'react'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton'

const DietDeliveryTimeMasterTable = ({ tableData = [], rowSelect }) => {
    // AG Grid columns
    const column = useMemo(() => [
        {
            headerName: 'Sl No',
            field: 'diet_del_time_slno',
            width: 80
        },
        {
            headerName: 'Diet Type',
            field: 'diet_type',
            flex: 1,
        },
        {
            headerName: 'From Time',
            field: 'from_time',
            flex: 1,
        },
        {
            headerName: 'To Time',
            field: 'to_time',
            flex: 1,
        },
        {
            headerName: 'Status',
            width: 120,
            valueGetter: (params) =>
                params.data?.diet_del_status === 1 ? 'Active' : 'Inactive'
        },
        {
            headerName: 'Action',
            width: 90,
            cellRenderer: (params) => (
                <EditButton onClick={() => rowSelect(params.data)} />
            )
        }
    ], [rowSelect])

    return (
        <CusAgGridMast
            columnDefs={column}
            tableData={tableData}
        />
    )
}

export default memo(DietDeliveryTimeMasterTable)
