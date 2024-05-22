import React, { useEffect, memo, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton'

const AmcCmcAddedTable = ({ count, rowSelect }) => {

    const [tabledata, setTabledata] = useState([])
    const [column] = useState([
        {
            headerName: 'Action', minWidth: 50,
            cellRenderer: (params) => <EditButton onClick={() => rowSelect(params)} />,
        },
        { headerName: 'SlNo', field: 'amccmc_slno', minWidth: 80 },
        { headerName: 'Contact Address', field: 'contact_address', minWidth: 200 },
        { headerName: 'AMC/CMC', field: 'status', minWidth: 100 },
        { headerName: 'From Date ', field: 'from_date', minWidth: 100 },
        { headerName: 'To Date ', field: 'to_date', minWidth: 100 },
    ])

    useEffect(() => {
        const getAMCCMC = async () => {
            const result = await axioslogin.get('ItemMapDetails/AmcCmcview')
            const { success, data } = result.data
            if (success === 2) {
                setTabledata(data)
            } else {
                warningNotify('error occured')
            }
        }
        getAMCCMC()
    }, [count])

    return (
        <CusAgGridMast columnDefs={column} tableData={tabledata} />
    )
}

export default memo(AmcCmcAddedTable)