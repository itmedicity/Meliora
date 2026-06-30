import React, { memo, useState } from 'react';
import CusAgGridMast from 'src/views/Components/CusAgGridMast';
import EditButton from 'src/views/Components/EditButton';

const WhatsappNumberMasterTable = ({ tableData, rowSelect }) => {

    const [column] = useState([
        {
            headerName: 'Sl No',
            field: 'whatsapp_slno',
            width: 90
        },
        {
            headerName: 'Section',
            field: 'sect_name',
            filter: true,
            minWidth: 200
        },
        {
            headerName: 'Employee',
            field: 'em_name',
            filter: true,
            minWidth: 220
        },
        {
            headerName: 'WhatsApp Number',
            field: 'whatsapp_number',
            filter: true,
            minWidth: 180
        },
        {
            headerName: 'Status',
            field: 'whatsapp_status',
            width: 120,
            valueGetter: params =>
                Number(params.data?.whatsapp_status) === 1
                    ? 'Active'
                    : 'Inactive'
        },
        {
            headerName: 'Action',
            width: 100,
            cellRenderer: params => (
                <EditButton
                    onClick={() =>
                        rowSelect(params.data)
                    }
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

export default memo(WhatsappNumberMasterTable);