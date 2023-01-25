import React, { memo } from 'react'
import { useEffect } from 'react'
import { Fragment } from 'react'
import { useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton';

const DailyActivityTable = ({ count, rowSelect, ipno }) => {
    const [tabledata, setTabledata] = useState([])

    const [column] = useState([
        { headerName: "SlNo", field: "slno", width: 150 },
        { headerName: "IPno", field: "ip_no", wrapText: true, autoHeight: true },
        { headerName: "Name", field: "ptc_ptname", wrapText: true, autoHeight: true, width: 300 },
        { headerName: "Date", field: "activity_date", wrapText: true, autoHeight: true },
        { headerName: "Time", field: "Time" },
        { headerName: "Room cleaning", field: "room_clean", width: 300 },
        { headerName: "Doctor's round", field: "dr_round", width: 300 },
        { headerName: "Doc.visit time", field: "dr_visit_time", wrapText: true, autoHeight: true, width: 350 },
        { headerName: "Dietion Round", field: "dietian_round", width: 300 },
        { headerName: "Bill Audit", field: "bill_audit", width: 300 },
        { headerName: "Insurence", field: "insurance_status", width: 300 },
        { headerName: 'Actions', cellRenderer: params => <EditButton onClick={() => rowSelect(params)} /> }

    ])
    useEffect(() => {
        const getActivity = async (ipno) => {
            const result = await axioslogin.get(`/WeWork/activity/${ipno}`)
            const { success, data } = result.data
            if (success === 1) {
                setTabledata(data)
            }
            else {
                warningNotify("please add Daily Activity!")
            }
        }
        getActivity(ipno);
    }, [count, ipno])

    return (
        <Fragment>
            <CusAgGridMast
                height={600}
                columnDefs={column}
                tableData={tabledata} />
        </Fragment>
    )
}

export default memo(DailyActivityTable)