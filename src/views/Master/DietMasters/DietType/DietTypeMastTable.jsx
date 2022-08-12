import React, { useState, memo } from 'react'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'

function DietTypeMastTable() {
    const [column] = useState([{
        headerName: "slno"
    },
    {
        headerName: "Diet Type Name"
    },
    {
        headerName: "status"
    },
    {
        headerName: "Actions"
    }])
    return (
        <CusAgGridMast
            columnDefs={column}
        />
    )
}
export default memo(DietTypeMastTable)