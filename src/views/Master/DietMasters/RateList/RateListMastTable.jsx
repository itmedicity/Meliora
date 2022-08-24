import React, { useState, memo, useEffect } from 'react'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
const RateListMastTable = ({ rowSelect, count }) => {
    //state for setting table data
    const [tabledata, setTabledata] = useState([])
    //column title setting
    const [column] = useState([{
        headerName: "slno", field: "drate_slno"
    },
    {
        headerName: "Diet", field: "diet_name"
    },
    {
        headerName: "Room", field: "rcc_desc"
    },
    {
        headerName: "type", field: "type_desc"
    },
    {
        headerName: "Hospital rate", field: "hosp_rate"
    },
    {
        headerName: "Canteen rate", field: "cant_rate"
    },
    {
        headerName: "Status", field: "status1"
    },
    {
        headerName: "Actions", cellRenderer: params => <EditButton onClick={() => rowSelect(params)} />
    }])
    useEffect(() => {
        const getDietType = async () => {
            const result = await axioslogin.get(`/ratelist`)
            const { success, data } = result.data
            if (success === 1) {
                setTabledata(data)
            }
            else {
                warningNotify("Error occured in EDp")
            }
        }
        getDietType();
    }, [count])
    return (
        <CusAgGridMast
            columnDefs={column}
            tableData={tabledata}
        />
    )
}
export default memo(RateListMastTable)