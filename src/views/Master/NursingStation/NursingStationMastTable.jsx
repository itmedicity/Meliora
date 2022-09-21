import React from 'react'
import { useState } from 'react'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
function NursingStationMastTable() {
    const [column] = useState([{
        headerName: "Description"
    },
    {
        headerName: "Short Name"
    }])
    return (
        <CusAgGridMast
            columnDefs={column} />
    )
}

export default NursingStationMastTable