import React, { memo, useState } from 'react'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton'

const IncidentCategoryTable = ({ tableData, rowSelect }) => {
    // const [tabledata, setTabledata] = useState([])
    const [column] = useState([
        { headerName: 'SlNo', field: 'inc_category_slno' },
        { headerName: 'Category Name', field: 'inc_category_name', filter: 'true' },
        {
            headerName: 'Status',
            field: 'inc_category_status',
            valueGetter: (params) => params.data.inc_category_status === 1 ? 'Active' : 'Inactive'
        },
        {
            headerName: 'Action',
            cellRenderer: params => <EditButton onClick={() => rowSelect(params)} />
        }
    ])

    return <CusAgGridMast columnDefs={column} tableData={tableData} onClick={rowSelect} />
}
export default memo(IncidentCategoryTable)
