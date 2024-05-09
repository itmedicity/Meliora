import React, { useEffect, memo, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton'


const BillAddMastTable = ({ count, rowSelect }) => {

    const [tabledata, setTabledata] = useState([])
    const [column] = useState([
        {
            headerName: 'Action', minWidth: 50,
            cellRenderer: (params) => <EditButton onClick={() => rowSelect(params)} />,
        },
        { headerName: 'SlNo', field: 'am_bill_mastslno', minWidth: 80 },
        { headerName: 'Bill No', field: 'am_bill_no', minWidth: 200 },
        { headerName: 'Bill Date', field: 'am_bill_date', minWidth: 100 },
        { headerName: 'Bill Amount ', field: 'am_bill_amount', minWidth: 100 },
        { headerName: 'Vendor Details ', field: 'am_bill_vendor_detail', minWidth: 100 },
    ])

    useEffect(() => {
        const getAMCCMC = async () => {
            const result = await axioslogin.get('ItemMapDetails/BillMasterview')
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

export default memo(BillAddMastTable)