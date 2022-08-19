
import React, { memo, useState } from 'react'
import { useEffect } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton'
function DietMasterTable({ count, rowSelect }) {
    const [tabledata, setTabledata] = useState([])
    const [column] = useState([
        { headerName: "slno", field: "diet_slno" },
        { headerName: "DietCategoryName", field: "diet_name" },
        { headerName: "status", field: "diet_status" },
        { headerName: "orderReq", field: "order_req" },
        { headerName: "Diet Type Choose", field: "diet_type_choose" },
        { headerName: 'Action', cellRenderer: params => <EditButton onClick={() => rowSelect(params)} /> }
    ])
    useEffect(() => {
        const getDiet = async () => {
            const result = await axioslogin.get(`/diet/fetch`)
            const { success, data } = result.data
            if (success === 1) {
                setTabledata(data)
            }
            else {
                warningNotify("Error occured contact EDP")
            }
        }
        getDiet();
    }, [count])
    return (
        <CusAgGridMast
            columnDefs={column}
            tableData={tabledata}

        />
    )
}
export default memo(DietMasterTable)