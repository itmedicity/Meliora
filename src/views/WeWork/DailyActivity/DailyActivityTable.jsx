import React, { memo } from 'react'
import { useEffect } from 'react'
import { Fragment } from 'react'
import { useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton';

const DailyActivityTable = ({ setCount, count, rowSelect, ipno }) => {
    const [tabledata, setTabledata] = useState([])

    const [column] = useState([
        { headerName: "SlNo", field: "activity_slno", width: 150 },
        { headerName: "ipno", field: "ip_no", wrapText: true, autoHeight: true },
        { headerName: "name", field: "ptc_ptname", wrapText: true, autoHeight: true, width: 300 },
        { headerName: "Date", field: "activity_date", wrapText: true, autoHeight: true },

        { headerName: "Room cleaning", field: "room_clean" },
        { headerName: "Sheet change", field: "sheet_change" },
        { headerName: "Doctor's round", field: "dr_round" },
        { headerName: "Dietion Round", field: "dietian_round" },
        { headerName: "Bill Audit", field: "bill_audit" },
        { headerName: "Insurence", field: "insurance_status" },


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
                columnDefs={column}
                tableData={tabledata} />
        </Fragment>
    )
}

export default memo(DailyActivityTable)