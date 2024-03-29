import React, { useEffect, useState, memo } from 'react'
import { axioslogin } from 'src/views/Axios/Axios';
import { warningNotify } from 'src/views/Common/CommonCode';
import CusAgGridForMain from 'src/views/Components/CusAgGridForMain';
import EditButton from 'src/views/Components/EditButton';
const UserCreationTable = ({ count, rowSelect }) => {
    //state for setting table data
    const [tabledata, setTabledata] = useState([])
    //column title setting
    const [column] = useState([
        { headerName: "Sl No", field: "emp_no" },
        { headerName: "Name", field: "em_name", filter: "true" },
        { headerName: "User Name", field: "emp_username", filter: "true" },
        { headerName: "Department Section", field: "sec_name", filter: "true" },
        { headerName: "Designation", field: "em_designation", filter: "true" },
        {
            headerName: 'Action', cellRenderer: params =>
                <EditButton onClick={() => rowSelect(params)} />
        },
    ])

    //get all data
    useEffect(() => {
        const getUserTable = async () => {
            const result = await axioslogin.get('/employee/getall')
            const { success, data } = result.data
            if (success === 1) {
                setTabledata(data)
            } else {
                warningNotify("Error occured contact EDP")
            }
        }
        getUserTable();
    }, [count])
    return (
        <CusAgGridForMain
            columnDefs={column}
            tableData={tabledata}
        />
    )
}

export default memo(UserCreationTable)