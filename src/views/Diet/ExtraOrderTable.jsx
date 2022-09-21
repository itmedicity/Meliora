import React, { useState } from 'react'
import CusAgGridMast from 'src/views/Components/CusAgGridMast';
const ExtraOrderTable = () => {
    const [column] = useState([
        { headerName: "slno", field: "type_slno" },
        { headerName: "slno", field: "type_slno" }
    ])
    return (
        <CusAgGridMast
            columnDefs={column}
        // tableData={tabledata}
        />
    )
}

export default ExtraOrderTable