import React, { memo, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import EditButton from 'src/views/Components/EditButton';
import CusAgGridMast from 'src/views/Components/CusAgGridMast';
const ModuleGroupTable = ({ count, rowSelect }) => {
    const [tabledata, setTabledata] = useState([])
    const [column] = useState([
        { headerName: "SlNo", field: "mod_grp_slno" },
        { headerName: "Module Group Name", field: "mod_grp_name" },
        { headerName: 'Action', cellRenderer: data => <EditButton onClick={() => rowSelect(data)} /> }
    ])
    /*** data get from module_group_mast to dispay data to table */
    useEffect(() => {
        const getmodule = async () => {
            const result = await axioslogin.get('/modulegroup')
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

export default memo(ModuleGroupTable)