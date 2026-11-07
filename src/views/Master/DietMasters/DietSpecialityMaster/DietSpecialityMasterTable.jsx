import React, { useState, memo } from 'react'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton'

const DietSpecialityMasterTable = ({ rowSelect, tabledata }) => {

    const [column] = useState([
        {
            headerName: 'ID',
            field: 'speciality_id',
            width: 80
        },

        {
            headerName: 'Speciality Name',
            field: 'speciality_name',
            flex: 1
        },

        {
            headerName: 'Clinical Description',
            field: 'clinical_description',
            flex: 1.5
        },

        {
            headerName: 'Applicable Condition',
            field: 'applicable_condition',
            flex: 1.5
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

export default memo(DietSpecialityMasterTable)