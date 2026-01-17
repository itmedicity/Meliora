import React, { memo, useState } from 'react'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton'

const IncidentDataCollectionMapMasterTable = ({ tableData, rowSelect }) => {
    // const [tabledata, setTabledata] = useState([])
    const [column] = useState([
        { headerName: 'SlNo', field: 'inc_data_map_slno' },
        { headerName: 'Category', field: 'inc_dep_type_name' },
        { headerName: 'Department Section', field: 'sec_name', filter: 'true' },
        {
            headerName: 'Status',
            field: 'inc_data_map_status',
            valueGetter: (params) => params.data.inc_data_map_status === 1 ? 'Active' : 'Inactive'
        },
        {
            headerName: 'Action',
            cellRenderer: params => <EditButton onClick={() => rowSelect(params.data)} />
        }
    ])

    return <CusAgGridMast columnDefs={column} tableData={tableData} onClick={rowSelect} />
}
export default memo(IncidentDataCollectionMapMasterTable)
