import React, { useEffect, useState, memo } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import CusAgGridMast from 'src/views/Components/CusAgGridMast';
import EditButton from 'src/views/Components/EditButton';
const HicPolicyTable = ({ geteditdata, count }) => {
    //state for setting table data
    const [tabledata, setTabledata] = useState([])
    //column title setting
    const [column] = useState([
        { headerName: "SlNo", field: "hic_policy_slno" },
        { headerName: "Hic Policy Name", field: "hic_policy_name" },
        { headerName: "Status", field: "status" },
        { headerName: 'Action', cellRenderer: EditButton },
    ])
    //get all data
    useEffect(() => {
        const getHicy = async () => {
            const result = await axioslogin.get('/hicpolicy')
            const { success, data } = result.data
            if (success === 1) {
                setTabledata(data)
            } else {
                warningNotify("Error occured contact EDP")
            }
        }
        getHicy();
    }, [count])
    return (
        <CusAgGridMast
            columnDefs={column}
            tableData={tabledata}
            onSelectionChanged={geteditdata}
        />
    )
}
export default memo(HicPolicyTable)