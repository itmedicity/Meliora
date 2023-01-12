import React, { memo } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton';

const HighAntibioMastTable = ({ count, rowSelect }) => {
    const [tabledata, setTabledata] = useState([])
    const [column] = useState([
        { headerName: "itemcode", field: "high_item_code" },
        { headerName: "AntiBiotic Name", field: "high_item_desc" },
        { headerName: "alias", field: "high_item_alias" },
        { headerName: "Status", field: "high_item_status" },
        { headerName: 'Action', cellRenderer: params => <EditButton onClick={() => rowSelect(params)} /> },
    ])

    useEffect(() => {
        const gethighbio = async () => {
            const result = await axioslogin.get('/highBioticMast/getbio')
            const { success, data } = result.data
            if (success === 1) {
                setTabledata(data)
            } else {
                warningNotify("Error occured contact EDP")
            }
        }
        gethighbio();
    }, [count])

    return (
        <CusAgGridMast
            tableData={tabledata}
            columnDefs={column}
        />
    )
}

export default memo(HighAntibioMastTable)