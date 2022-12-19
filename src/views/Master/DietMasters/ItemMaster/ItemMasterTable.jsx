import React, { useEffect, useState, memo } from 'react'
import { axioslogin } from 'src/views/Axios/Axios';
import { warningNotify } from 'src/views/Common/CommonCode';
import CusAgGridMast from 'src/views/Components/CusAgGridMast';
import EditButton from 'src/views/Components/EditButton';

const ItemMasterTable = ({ count, rowSelect }) => {
    //state for table data set
    const [tabledata, setTabledata] = useState([])
    //column title setting
    const [column] = useState([
        { headerName: "SlNo", field: "item_slno", minWidth: 70, },
        { headerName: "Item Name", field: "item_name", filter: "true", minWidth: 150, wrapText: true, },
        { headerName: "Item group", field: "group_name", minWidth: 150, wrapText: true, },
        { headerName: "Rate", field: "rate" },
        { headerName: "Hospital Rate", field: "rate_hosp" },
        { headerName: "Quantity", field: "qty" },
        { headerName: "Unit", field: "unit" },
        { headerName: "Is dietItem", field: "is_dietItem" },
        { headerName: "Status", field: "kotstatus" },
        { headerName: 'Action', cellRenderer: params => <EditButton onClick={() => rowSelect(params)} /> },
    ])
    //get all data
    useEffect(() => {
        const getItem = async () => {
            const result = await axioslogin.get('/kotitem/get/kotitem')
            const { success, data } = result.data
            if (success === 1) {
                setTabledata(data)
            } else {
                warningNotify("Error occured contact EDP")
            }
        }
        getItem();
    }, [count])
    return (
        <CusAgGridMast
            columnDefs={column}
            tableData={tabledata}
            onClick={rowSelect}
        />
    )
}

export default memo(ItemMasterTable)