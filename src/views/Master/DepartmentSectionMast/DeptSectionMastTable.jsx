import React, { useEffect, useState, memo } from 'react'
import { axioslogin } from 'src/views/Axios/Axios';
import { warningNotify } from 'src/views/Common/CommonCode';
import CusAgGridMast from 'src/views/Components/CusAgGridMast';
import EditButton from 'src/views/Components/EditButton';
const DeptSectionMastTable = ({ geteditdata, count }) => {
    //state for table data set
    const [tabledata, setTabledata] = useState([])
    //column title setting
    const [column] = useState([
        { headerName: "SlNo", field: "sec_slno" },
        { headerName: "Department Section Name", field: "sec_name" },
        { headerName: "Department Name", field: "dept_name" },
        { headerName: "Status", field: "status" },
        { headerName: 'Action', cellRenderer: EditButton },
    ])
    //get all data
    useEffect(() => {
        const getDepartsection = async () => {
            const result = await axioslogin.get('/deptsecmaster')
            const { success, data } = result.data
            if (success === 1) {
                setTabledata(data)
            } else {
                warningNotify("Error occured contact EDP")
            }
        }
        getDepartsection();
    }, [count])
    return (
        <CusAgGridMast
            columnDefs={column}
            tableData={tabledata}
            onSelectionChanged={geteditdata}
        />
    )
}
export default memo(DeptSectionMastTable)