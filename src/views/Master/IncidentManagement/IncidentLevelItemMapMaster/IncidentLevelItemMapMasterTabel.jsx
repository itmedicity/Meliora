import React, { memo, useState } from 'react'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton'

const IncidentLevelItemMapMasterTabel = ({ tableData, rowSelect }) => {
    // const [tabledata, setTabledata] = useState([])
    const [column] = useState([
        { headerName: 'SlNo', field: 'inc_level_item_slno' },
        { headerName: 'Level Name', field: 'level_name', filter: 'true' },
        { headerName: 'Action Name', field: 'inc_action_name', filter: 'true' },
        { headerName: 'Department ', field: 'dept_name', filter: 'true' },
        { headerName: 'Section ', field: 'sec_name', filter: 'true' },
        {
            headerName: 'Status',
            field: 'inc_level_item_status',
            valueGetter: (params) => params.data.inc_level_item_status === 1 ? 'Active' : 'Inactive'
        },
        {
            headerName: 'Action',
            cellRenderer: params => <EditButton onClick={() => rowSelect(params.data)} />
        }
    ])

    return <CusAgGridMast columnDefs={column} tableData={tableData} onClick={rowSelect} />
}
export default memo(IncidentLevelItemMapMasterTabel)
