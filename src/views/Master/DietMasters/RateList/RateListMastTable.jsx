import React, { useState, memo } from 'react'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
function RateListMastTable() {
    const [column] = useState([{
        headerName: "slno"
    },
    {
        headerName: "Item Name"
    },
    {
        headerName: "Price"
    },
    {
        headerName: "Status"
    },
    {
        headerName: "Actions"
    }])
    return (
        <CusAgGridMast
            columnDefs={column} />
    )
}
export default memo(RateListMastTable)