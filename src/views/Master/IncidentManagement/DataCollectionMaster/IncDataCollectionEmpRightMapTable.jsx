import React, { memo, useState } from 'react';
import CusAgGridMast from 'src/views/Components/CusAgGridMast';
import EditButton from 'src/views/Components/EditButton';

const IncDataCollectionEmpRightMapTable = ({ tableData, rowSelect }) => {

    const [column] = useState([
        {
            headerName: 'Sl No',
            field: 'inc_dc_emp_slno',
            width: 90
        },
        {
            headerName: 'Section',
            field: 'sec_name',
            filter: true
        },
        {
            headerName: 'Employee',
            field: 'em_name',
            filter: true
        },
        {
            headerName: 'Status',
            field: 'inc_dc_emp_status',
            valueGetter: (params) =>
                params.data?.inc_dc_emp_status === 1 ? 'Active' : 'Inactive'
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

export default memo(IncDataCollectionEmpRightMapTable);
