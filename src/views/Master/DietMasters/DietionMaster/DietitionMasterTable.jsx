import React, { memo, useState } from 'react'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
function DietitionMasterTable() {
    const [column] = useState([
        {
            headerName: "slno"
        },
        {
            headerName: "Dietition Name"
        },
        {
            headerName: "Status"
        },
        {
            headerName: "Actions"
        }
    ])
    return (
        <CusAgGridMast
            columnDefs={column}
        />
    )
}
export default memo(DietitionMasterTable)