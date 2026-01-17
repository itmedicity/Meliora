import React, { memo, useState } from 'react'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton'

const CommonSettingMapMasterTable = ({ tableData, rowSelect }) => {
    // const [tabledata, setTabledata] = useState([]);
    const [column] = useState([
        { headerName: 'SlNo', field: 'inc_cs_dep_map_slno' },
        { headerName: 'Setting Name', field: 'inc_setting_key' },
        { headerName: 'Department Name', field: 'dept_name', filter: 'true' },
        {
            headerName: 'Status',
            field: 'inc_dep_map_status',
            valueGetter: (params) => params.data.inc_dep_map_status === 1 ? 'Active' : 'Inactive'
        },
        {
            headerName: 'Action',
            cellRenderer: params => <EditButton onClick={() => rowSelect(params.data)} />
        }
    ])

    return <CusAgGridMast columnDefs={column} tableData={tableData} onClick={rowSelect} />
}
export default memo(CommonSettingMapMasterTable);
