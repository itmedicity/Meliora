import React, { useEffect, memo, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton'

const AssetRackmastTable = ({ count, rowSelect }) => {
    const [tabledata, setTabledata] = useState([])

    const [column] = useState([
        {
            headerName: 'Action', minWidth: 10,
            cellRenderer: (params) => <EditButton onClick={() => rowSelect(params)} />,
        },
        { headerName: 'SlNo', field: 'am_rack_slno', minWidth: 50 },
        { headerName: 'Rack Name', field: 'am_rack_name', minWidth: 70 },
        { headerName: 'Status', field: 'status', minWidth: 50 },

    ])
    useEffect(() => {
        const getRack = async () => {
            const result = await axioslogin.get('assetRackMast/view')
            const { success, data } = result.data
            if (success === 2) {
                setTabledata(data)
            } else {
                warningNotify('error occured')
            }
        }
        getRack()
    }, [count])
    return (
        <CusAgGridMast columnDefs={column} tableData={tabledata} />
    )
}

export default memo(AssetRackmastTable)