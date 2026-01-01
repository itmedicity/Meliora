
import React, { memo, useState } from 'react';
import CusAgGridMast from 'src/views/Components/CusAgGridMast';
import EditButton from 'src/views/Components/EditButton';

const IncidentNatureTable = ({ tableData, rowSelect }) => {

    const [column] = useState([
        {
            headerName: 'Sl No',
            field: 'inc_nature_slno',
            width: 90
        },
        {
            headerName: 'Nature',
            field: 'inc_nature_name',
            filter: true
        },
        {
            headerName: 'Status',
            field: 'inc_nature_status',
            valueGetter: (params) =>
                params.data?.inc_nature_status === 1 ? 'Active' : 'Inactive'
        },
        {
            headerName: 'Action',
            cellRenderer: (params) => (
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

export default memo(IncidentNatureTable);
