import React, { useState, memo, Fragment } from 'react'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import { MdDeleteSweep } from 'react-icons/md';

const DietMenuSettCmp = ({ dataPost }) => {
    //Array listing component
    const [column] = useState([
        {
            headerName: "Diet", field: "diet_slno"
        },
        {
            headerName: "Diet Type ", field: "type_slno"
        },
        {
            headerName: "Day", field: "days"
        },
        {
            headerName: "Item Group", field: "grp_slno"
        },
        {
            headerName: "Item", field: "item_slno"
        },
        { headerName: 'Action', cellRenderer: params => <MdDeleteSweep size={25} onClick={() => rowSelect(params)} /> }

    ])
    const rowSelect = () => {

    }
    return (
        <Fragment>
            <CusAgGridMast
                columnDefs={column}
                tableData={dataPost}
            />
        </Fragment>
    )
}

export default memo(DietMenuSettCmp)