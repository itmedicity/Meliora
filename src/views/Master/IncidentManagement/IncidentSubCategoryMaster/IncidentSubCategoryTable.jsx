import React, { useState, memo } from 'react'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton'


const IncidentSubCategoryTable = ({ tableData, rowSelect }) => {
    
    const [column] = useState([
        {
            headerName: 'Action',
            minWidth: 20,
            cellRenderer: params => <EditButton onClick={() => rowSelect(params)} />
        },
        { headerName: 'SlNo', field: 'subcategory_slno', minWidth: 50 },
        { headerName: 'Sub Category', field: 'inc_category_name', minWidth: 50 },
        { headerName: 'Category', field: 'inc_sub_category_name', minWidth: 50 },
        {
            headerName: 'Status',
            field: 'inc_sub_category_status',
            valueGetter: (params) => params.data.inc_sub_category_status === 1 ? 'Active' : 'Inactive'
        },
    ])



    return <CusAgGridMast columnDefs={column} tableData={tableData} />
}

export default memo(IncidentSubCategoryTable)
