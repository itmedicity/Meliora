import React, { useEffect, useState, memo } from 'react'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import { warningNotify } from 'src/views/Common/CommonCode'
import { axioslogin } from 'src/views/Axios/Axios'
import { format } from 'date-fns'

const AppointmentTable = ({ count, rowSelect, setCount }) => {
    //state for setting table data
    const [tabledata, setTabledata] = useState([])
    //column title name setting
    const [column] = useState([
        { headerName: 'SlNo', field: 'SlNo' },
        { headerName: 'Scheduled Date', field: 'Scheduled_date', filter: 'true' },
        { headerName: 'Status', field: 'status' },
    ])
    //get all data
    useEffect(() => {
        const getRequestType = async () => {
            const result = await axioslogin.get('/tokenMaster/Getdate')
            const { success, data } = result.data
            if (success === 1) {
                const datas = data?.map((val) => {
                    return {
                        SlNo: val.date_slno,
                        Scheduled_date: format(new Date(val.schedule_date), "dd-MM-yyyy"),
                        status: val.status,
                    }
                })
                setTabledata(datas)
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

export default memo(AppointmentTable)