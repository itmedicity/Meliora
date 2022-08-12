import React, { useState, memo } from 'react'
import CusAgGridMast from 'src/views/Components/CusAgGridMast';
import EditButton from 'src/views/Components/EditButton';

const UserCreationTable = () => {
    //state for setting table data
    //  const [tabledata, setTabledata] = useState([])
    //column title setting
    const [column] = useState([
        { headerName: "Sl No", field: "" },
        { headerName: "Name", field: "" },
        { headerName: "User Name", field: "" },
        { headerName: "Department Section", field: "" },
        { headerName: "Designation", field: "" },
        { headerName: 'Action', cellRenderer: EditButton },
    ])

    return (
        <CusAgGridMast
            columnDefs={column}
        //   tableData={tabledata}
        //  onSelectionChanged={geteditdata}
        />
    )
}

export default memo(UserCreationTable)