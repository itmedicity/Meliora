import React, { useEffect, useState } from 'react'
import CusAgGridMast from 'src/views/Components/CusAgGridMast';
import EditButton from 'src/views/Components/EditButton';

const InPatientList = () => {
    //state for setting table data
    //const [tabledata, setTabledata] = useState([])
    //column title setting
    const [column] = useState([
        { headerName: "IP No", field: "" },
        { headerName: "OP No", field: "" },
        { headerName: "Name", field: "" },
        { headerName: "Doctor", field: "" },
        { headerName: "Room", field: "" },
        { headerName: 'Action', cellRenderer: EditButton },
    ])

    useEffect(() => {

    }, [])


    return (
        <CusAgGridMast
            columnDefs={column}
        //  tableData={tabledata}
        //  onSelectionChanged={geteditdata}
        />
    )
}

export default InPatientList