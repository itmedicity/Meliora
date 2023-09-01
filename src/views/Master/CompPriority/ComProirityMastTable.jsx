import React, { memo, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import CusAgGridMast from 'src/views/Components/CusAgGridMast';
import EditButton from 'src/views/Components/EditButton';

const ComProirityMastTable = ({ count, rowSelect }) => {

    const [tabledata, setTabledata] = useState([])
    const [column] = useState([
        { headerName: 'SlNo', field: 'cm_priority_slno', minWidth: 100, },
        { headerName: 'Priority Name', field: 'cm_priority_desc', filter: "true", minWidth: 150, },
        { headerName: 'Escalation Min', field: 'escalation_min_dis', filter: "true", minWidth: 150, },
        { headerName: 'Escalation Max', field: 'escalation_max_dis', filter: "true", minWidth: 150, },
        { headerName: 'Status', field: 'status', minWidth: 100 },
        { headerName: 'Action', cellRenderer: params => <EditButton onClick={() => rowSelect(params)} /> },
    ])

    /*** get data from module_master table for display */
    useEffect(() => {
        const getmodule = async () => {
            const result = await axioslogin.get('/compriority')
            const { success, data } = result.data;
            if (success === 1) {
                setTabledata(data);
            } else {
                warningNotify(" Error occured contact EDP")
            }
        }
        getmodule();
    }, [count])


    return (
        <CusAgGridMast
            columnDefs={column}
            tableData={tabledata}
            onClick={rowSelect}
        />
    )
}

export default memo(ComProirityMastTable)