import React, { memo, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import CusAgGridMast from 'src/views/Components/CusAgGridMast';
import EditButton from 'src/views/Components/EditButton';

const TeamMastTable = ({ count, rowSelect }) => {

    const [tabledata, setTabledata] = useState([])
    const [column] = useState([
        { headerName: 'Action', minWidth: 100, cellRenderer: params => <EditButton onClick={() => rowSelect(params)} /> },
        { headerName: 'SlNo', field: 'teammast_slno', minWidth: 100, },
        { headerName: 'Team Department', field: 'team_deptname', filter: "true", minWidth: 250, },
        { headerName: 'Team Name', field: 'team_name', filter: "true", minWidth: 150, },
        { headerName: 'Department', field: 'emp_dept', filter: "true", minWidth: 250, },
        { headerName: 'Dept.Section', field: 'sec_name', filter: "true", minWidth: 250, },
        { headerName: 'Employee Name', field: 'em_name', filter: "true", minWidth: 250, },
        { headerName: 'Status', field: 'status', minWidth: 100 },
    ])

    /*** get data from module_master table for display */
    useEffect(() => {
        const getmodule = async () => {
            const result = await axioslogin.get('/teammaster/get')
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

export default memo(TeamMastTable)