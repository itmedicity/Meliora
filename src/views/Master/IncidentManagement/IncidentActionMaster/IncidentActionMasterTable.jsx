import React, { memo, useState } from 'react'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton'

const IncidentActionMasterTable = ({ tableData, rowSelect }) => {
    // const [tabledata, setTabledata] = useState([])
    const [column] = useState([
        { headerName: 'SlNo', field: 'inc_action_slno' },
        { headerName: 'Action Name', field: 'inc_action_name', filter: 'true' },
        {
            headerName: 'Status',
            field: 'inc_action_status',
            valueGetter: (params) => params.data.inc_action_status === 1 ? 'Active' : 'Inactive'
        },
        {
            headerName: 'Action',
            cellRenderer: params => <EditButton onClick={() => rowSelect(params.data)} />
        }
    ])

    return <CusAgGridMast columnDefs={column} tableData={tableData} onClick={rowSelect} />
}
export default memo(IncidentActionMasterTable)
