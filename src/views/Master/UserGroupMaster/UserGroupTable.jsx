import React, { memo, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import CusAgGridMast from 'src/views/Components/CusAgGridMast';
import EditButton from 'src/views/Components/EditButton';

const UserGroupTable = ({ count, geteditdata, rowSelect }) => {
    const [tabledata, setTabledata] = useState([])
    const [column] = useState([
        { headerName: 'SlNo', field: 'user_grp_slno' },
        { headerName: 'Group Name', field: 'user_grp_name' },
        { headerName: 'Status', field: 'status' },
        { headerName: 'Action', cellRenderer: params => <EditButton onClick={() => rowSelect(params)} /> },
    ])

    /*** get data from table for display */
    useEffect(() => {
        const getUserGroup = async () => {
            const result = await axioslogin.get('/usergroup')
            const { success, data } = result.data;
            if (success === 1) {
                setTabledata(data);
            } else {
                warningNotify(" Error occured contact EDP")
            }
        }
        getUserGroup();
    }, [count])

    return (
        <CusAgGridMast
            columnDefs={column}
            tableData={tabledata}
            onClick={rowSelect}
        />
    )
}
export default memo(UserGroupTable)