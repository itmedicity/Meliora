import React, { memo, useState } from 'react';
import CusAgGridMast from 'src/views/Components/CusAgGridMast';
import EditButton from 'src/views/Components/EditButton';

const EventMasterTable = ({ tableData, rowSelect }) => {

    const [column] = useState([
        {
            headerName: 'Sl No',
            field: 'event_slno',
            width: 90
        },
        {
            headerName: 'Event Code',
            field: 'event_code',
            filter: true,
            minWidth: 180
        },
        {
            headerName: 'Event Name',
            field: 'event_name',
            filter: true,
            minWidth: 250
        },
        {
            headerName: 'Status',
            field: 'status',
            width: 120,
            valueGetter: params =>
                Number(params.data?.status) === 1
                    ? 'Active'
                    : 'Inactive'
        },
        {
            headerName: 'Action',
            width: 100,
            cellRenderer: params => (
                <EditButton
                    onClick={() => rowSelect(params.data)}
                />
            )
        }
    ]);

    return (
        <CusAgGridMast
            columnDefs={column}
            tableData={tableData}
        />
    );
};

export default memo(EventMasterTable);