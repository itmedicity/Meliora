import React, { useEffect, useState, memo } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import CusAgGridMast from 'src/views/Components/CusAgGridMast';
import EditButton from 'src/views/Components/EditButton';

function NursingStationMastTable({ count, rowSelect }) {
    //state for setting table data
    const [tabledata, setTabledata] = useState([])
    //column title setting
    const [column] = useState([{
        headerName: "slno", field: "co_nurse_slno"
    },
    {
        headerName: "Nursing station Name", field: "co_nurse_desc", minWidth: 200
    },
    {
        headerName: "Nursing station Oracle", field: "nsc_desc", minWidth: 250
    },
    {
        headerName: "Status", field: "status"
    },


    { headerName: 'Action', cellRenderer: params => <EditButton onClick={() => rowSelect(params)} /> }

    ])
    useEffect(() => {
        const getNurseStation = async () => {
            const result = await axioslogin.get(`/nursestation`)
            const { success, data } = result.data
            if (success === 1) {
                setTabledata(data)
            }
            else {
                warningNotify("Error occured in EDp")
            }
        }
        getNurseStation();

    }, [count])

    return (
        <CusAgGridMast
            columnDefs={column}
            tableData={tabledata}
        />
    )
}

export default memo(NursingStationMastTable)