import React, { memo, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import CusAgGridMast from 'src/views/Components/CusAgGridMast';
import EditButton from 'src/views/Components/EditButton';

const OmTableMastTable = ({ count, rowSelect }) => {
    const [tabledata, setTabledata] = useState([])
    const [column] = useState([
        { headerName: 'SlNo', field: 'omtable_no', minWidth: 100, },
        { headerName: 'Table Name', field: 'omtable_name', filter: "true", minWidth: 150, },
        { headerName: 'Department', field: 'dept_name', filter: "true", minWidth: 250, },
        { headerName: 'Dept.Section', field: 'sec_name', filter: "true", minWidth: 250, },
        { headerName: 'Employee Name', field: 'em_name', filter: "true", minWidth: 250, },
        { headerName: 'Status', field: 'status', minWidth: 100 },
        { headerName: 'Action', cellRenderer: params => <EditButton onClick={() => rowSelect(params)} /> },
    ])

    /*** get data from module_master table for display */
    useEffect(() => {
        const getmodule = async () => {
            const result = await axioslogin.get('/omtableMast')
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

export default memo(OmTableMastTable)