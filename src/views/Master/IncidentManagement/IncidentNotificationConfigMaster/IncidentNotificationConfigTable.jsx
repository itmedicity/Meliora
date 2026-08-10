import React, { memo, useState } from 'react';
import CusAgGridMast from 'src/views/Components/CusAgGridMast';
import EditButton from 'src/views/Components/EditButton';

const IncidentNotificationConfigTable = ({ tableData, rowSelect }) => {

    const [column] = useState([
        {
            headerName: 'Sl No',
            field: 'config_slno',
            width: 90
        },
        {
            headerName: 'Section',
            field: 'sec_name',
            filter: true,
            minWidth: 180
        },
        {
            headerName: 'Event',
            field: 'event_name',
            filter: true,
            minWidth: 220
        },
        {
            headerName: 'Employee',
            field: 'em_name',
            filter: true,
            minWidth: 220
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
                <EditButton onClick={() => rowSelect(params.data)} />
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

export default memo(IncidentNotificationConfigTable);