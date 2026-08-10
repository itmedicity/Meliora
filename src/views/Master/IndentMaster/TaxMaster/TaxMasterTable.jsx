import React, { useEffect, useState, memo } from 'react'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton'
import { warningNotify } from 'src/views/Common/CommonCode'
import { axioslogin } from 'src/views/Axios/Axios'

const TaxMasterTable = ({ count, rowSelect, setCount }) => {
    //state for setting table data
    const [tabledata, setTabledata] = useState([])
    //column title name setting
    const [column] = useState([
        { headerName: 'SlNo', field: 'tax_id' },
        { headerName: 'Tax Details ', field: 'tax', filter: 'true' },
        { headerName: 'Status', field: 'status' },
        {
            headerName: 'Action',
            cellRenderer: params => <EditButton onClick={() => rowSelect(params)} />
        }
    ])
    //get all data
    useEffect(() => {
        const getRequestType = async () => {
            const result = await axioslogin.get('/tokenMaster/Gettax')
            const { success, data } = result.data
            if (success === 1) {
                setTabledata(data)
                setCount(0)
            } else {
                warningNotify('Error occured contact EDP')
            }
        }
        getRequestType()
    }, [count])
    return (
        <CusAgGridMast columnDefs={column} tableData={tabledata} onClick={rowSelect} />
    )
}

export default memo(TaxMasterTable) 