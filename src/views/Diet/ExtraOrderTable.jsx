import React, { Fragment, useState, memo } from 'react'
import CusAgGridMast from 'src/views/Components/CusAgGridMast';
const ExtraOrderTable = ({ newfood }) => {
    const [column] = useState([
        { headerName: "Item", field: "item_slno" },
        { headerName: "Item Name", field: "item_name" },
        { headerName: "Hospital Rate", field: "rate_hos" },
        { headerName: "Canteen Rate", field: "rate_cant" }
    ])
    return (
        <Fragment>
            <CusAgGridMast
                columnDefs={column}
                tableData={newfood}
            />
        </Fragment>

    )
}

export default memo(ExtraOrderTable)