import React, { memo, useState } from 'react'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton'

const IncidentLevelMasterTable = ({ tableData, rowSelect }) => {
    // const [tabledata, setTabledata] = useState([])
    const [column] = useState([
        { headerName: 'SlNo', field: 'level_slno' },
        { headerName: 'Level No', field: 'level_no' },
        { headerName: 'Level Name', field: 'level_name', filter: 'true' },
        { headerName: 'Employee Name', field: 'em_name', filter: 'true' },
        { headerName: 'Department Section', field: 'sec_name', filter: 'true' },
        {
            headerName: 'Status',
            field: 'level_status',
            valueGetter: (params) => params.data.level_status === 1 ? 'Active' : 'Inactive'
        },
        {
            headerName: 'Action',
            cellRenderer: params => <EditButton onClick={() => rowSelect(params.data)} />
        }
    ])

    return <CusAgGridMast columnDefs={column} tableData={tableData} onClick={rowSelect} />
}
export default memo(IncidentLevelMasterTable)
