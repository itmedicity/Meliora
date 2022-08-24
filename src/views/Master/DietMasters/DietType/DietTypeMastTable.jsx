import React, { useState, memo, useEffect } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton'
const DietTypeMastTable = ({ count, rowSelect }) => {
    //state for setting table data
    const [tabledata, setTabledata] = useState([])
    //column title setting
    const [column] = useState([{
        headerName: "slno", field: "type_slno"
    },
    {
        headerName: "Diet Type Name", field: "type_desc"
    },
    {
        headerName: "Start Time", field: "start_time1"
    },
    {
        headerName: "End Time", field: "end_time2"
    },
    {
        headerName: "status", field: "status1"
    },
    { headerName: 'Action', cellRenderer: params => <EditButton onClick={() => rowSelect(params)} /> }

    ])
    useEffect(() => {
        const getDietType = async () => {
            const result = await axioslogin.get(`/diettype`)
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
export default memo(DietTypeMastTable)