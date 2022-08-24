import React, { useState, memo } from 'react'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton';
const DietMenuSettingTable = () => {
    //state for setting table data
    // const [tabledata, setTabledata] = useState([])
    const [column] = useState([
        { headerName: "SlNo", field: "sec_id" },
        { headerName: "Diet", field: "sec_name" },
        { headerName: "Group Name", field: "dept_name" },
        { headerName: "Item Name", field: "dept_sub_sect1" },
        { headerName: "Days", field: "ouc_desc" },
        { headerName: "Quantity", field: "status" },
        { headerName: "Unit", field: "status" },
        { headerName: "Hospital Rate", field: "status" },
        { headerName: "Canteen Rate", field: "status" },
        { headerName: "Order req", field: "status" },
        { headerName: "Status", field: "status" },
        { headerName: 'Action', cellRenderer: params => <EditButton /> },
    ])
    // useEffect(() => {
    //     const getDietType = async () => {
    //         const result = await axioslogin.get(`/ratelist`)
    //         const { success, data } = result.data
    //         if (success === 1) {
    //             setTabledata(data)
    //         }
    //         else {
    //             warningNotify("Error occured in EDp")
    //         }
    //     }
    //     getDietType();
    // }, [count])
    return (
        <CusAgGridMast
            columnDefs={column}
        // tableData={tabledata}
        />
    )
}
export default memo(DietMenuSettingTable)