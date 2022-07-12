import React, { memo, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import CusAgGridMast from 'src/views/Components/CusAgGridMast';
import EditButton from 'src/views/Components/EditButton';

const ModuleGroupRightTable = ({ count, geteditdata }) => {
    const [tabledata, setTabledata] = useState([])
    const [column] = useState([
        { headerName: 'SlNo', field: 'mod_grp_user_slno' },
        { headerName: 'Employee Name', field: 'co_emp_name' },
        { headerName: 'Module Group', field: 'mod_grp_name' },
        { headerName: 'User Group', field: 'user_grp_name' },
        { headerName: 'Status', field: 'mod_grp_user_status' },
        { headerName: 'Action', cellRenderer: EditButton },
    ])

    /*** get data from module_master table for display */
    useEffect(() => {
        const getmodule = async () => {
            const result = await axioslogin.get('/modulegroupright')
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
            onSelectionChanged={geteditdata}
        />
    )
}

export default memo(ModuleGroupRightTable)