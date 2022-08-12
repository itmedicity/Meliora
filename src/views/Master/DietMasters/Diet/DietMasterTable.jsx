import React, { memo, useState } from 'react'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
function DietMasterTable() {

    const [column] = useState([
        { headerName: "slno" },
        { headerName: "DietCategoryName" },
        { headerName: "status" },
        { headerName: "Action" }
    ])
    return (
        <CusAgGridMast
            columnDefs={column}
        />
    )
}
export default memo(DietMasterTable)