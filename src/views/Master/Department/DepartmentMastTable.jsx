import React, { useEffect, useState, memo } from 'react'
import { axioslogin } from 'src/views/Axios/Axios';
import { warningNotify } from 'src/views/Common/CommonCode';
import CusAgGridMast from 'src/views/Components/CusAgGridMast';
import EditButton from 'src/views/Components/EditButton';
const DepartmentMastTable = ({ count, rowSelect }) => {
    //state for table data set
    const [tabledata, setTabledata] = useState([])
    //column title setting
    const [column] = useState([
        { headerName: "SlNo", field: "dept_id" },
        { headerName: "Department Name", field: "dept_name", width: 250, filter: "true" },
        { headerName: " Department Alias", field: "dept_alias" },
        { headerName: " Department Type", field: "depttype" },
        { headerName: "Status", field: "status" },
        { headerName: 'Action', cellRenderer: params => <EditButton onClick={() => rowSelect(params)} /> },
    ])
    //get all data
    useEffect(() => {
        const getDepartment = async () => {
            const result = await axioslogin.get('/deptmaster')
            const { success, data } = result.data
            if (success === 1) {
                setTabledata(data)
            } else {
                warningNotify("Error occured contact EDP")
            }
        }
        getDepartment();
    }, [count])
    return (
        <CusAgGridMast
            columnDefs={column}
            tableData={tabledata}
            onClick={rowSelect}
        />
    )
}
export default memo(DepartmentMastTable)