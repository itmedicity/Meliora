import React, { memo, useState } from 'react'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton'

const CommonSettingMasterTable = ({ tableData, rowSelect }) => {
    // const [tabledata, setTabledata] = useState([]);
    const [column] = useState([
        { headerName: 'SlNo', field: 'inc_cs_slno' },
        { headerName: 'Setting Name', field: 'inc_setting_key' },
        { headerName: 'Setting Label', field: 'inc_setting_label', filter: 'true' },
        {
            headerName: 'Status',
            field: 'inc_cs_status',
            valueGetter: (params) => params.data.inc_cs_status === 1 ? 'Active' : 'Inactive'
        },
        {
            headerName: 'Action',
            cellRenderer: params => <EditButton onClick={() => rowSelect(params.data)} />
        }
    ])

    return <CusAgGridMast columnDefs={column} tableData={tableData} onClick={rowSelect} />
}
export default memo(CommonSettingMasterTable)
