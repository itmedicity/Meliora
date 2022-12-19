import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Fragment } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton';

const BedTrackingTable = ({ ipno, count, rowSelect }) => {
    const [tabledata, setTabledata] = useState([])

    const [column] = useState([
        { headerName: "slno", field: "trasf_slno", width: 150 },
        { headerName: "ipno", field: "ip_no", wrapText: true, autoHeight: true },
        { headerName: "name", field: "ptc_ptname", wrapText: true, autoHeight: true, width: 250 },
        { headerName: "Transfer time", field: "transfer_time", wrapText: true, autoHeight: true },
        { headerName: "Coucilling status", field: "counseling_status" },
        { headerName: "sfa/mfa clearence", field: "sfa_mfa_clearence" },
        { headerName: "bystander room ", field: "bystander_room_retain" },
        { headerName: "Transfer in time", field: "transfer_in_time", width: 250 },
        { headerName: "Remarks", field: "remarks" },
        { headerName: "Transfer from", field: "transfer_fromm", width: 300 },
        { headerName: "Transfer To", field: "transfer_too", width: 300 },
        { headerName: 'Actions', cellRenderer: params => <EditButton onClick={() => rowSelect(params)} /> }

    ])

    useEffect(() => {
        const getBedTracking = async (ipno) => {
            const result = await axioslogin.get(`/WeWork/getbedTrack/${ipno}`)
            const { success, data } = result.data
            if (success === 1) {
                setTabledata(data)
            }
            else {
                warningNotify("please enter bed transfer details!")
            }
        }
        getBedTracking(ipno);
    }, [ipno, count])


    return (
        <Fragment>
            <CusAgGridMast
                tableData={tabledata}
                columnDefs={column}
                height={600} />
        </Fragment>
    )
}

export default BedTrackingTable