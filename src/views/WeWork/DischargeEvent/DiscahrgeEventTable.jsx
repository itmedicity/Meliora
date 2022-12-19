import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Fragment } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton';


const DiscahrgeEventTable = ({ ipno, count, rowSelect }) => {
    const [tabledata, setTabledata] = useState([])
    const [column] = useState([
        { headerName: "slno", field: "dis_slno", width: 150 },
        { headerName: "ipno", field: "ip_no", wrapText: true, autoHeight: true },
        { headerName: "name", field: "ptc_ptname", wrapText: true, autoHeight: true, width: 300 },
        { headerName: "Bill time", field: "bill_ready_time", wrapText: true, autoHeight: true, width: 300 },
        { headerName: "medicine recive", field: "disc_medicine_recive", width: 350 },
        { headerName: "Disc.type", field: "discharge_type", width: 300 },
        { headerName: "cross consultant", field: "cros_consult", width: 300 },
        { headerName: "is feedback", field: "feed_back_collected" },
        { headerName: "Room cleaning ", field: "room_clear_time", width: 300 },
        { headerName: "Summary time", field: "summary_time", width: 350 },
        { headerName: "Key return", field: "disc_key", width: 250 },
        { headerName: "Call bell", field: "disc_callbell" },
        { headerName: 'Actions', cellRenderer: params => <EditButton onClick={() => rowSelect(params)} /> }

    ])


    useEffect(() => {
        const getDiscahrge = async (ipno) => {
            const result = await axioslogin.get(`/WeWork/getDisc/${ipno}`)
            const { success, data } = result.data
            if (success === 1) {
                setTabledata(data)
            }
            else {
                warningNotify("please add Discharge details!")
            }
        }
        getDiscahrge(ipno);
    }, [ipno, count])

    return (
        <Fragment >
            <CusAgGridMast
                tableData={tabledata}
                columnDefs={column}
                height={600} />
        </Fragment>
    )
}

export default DiscahrgeEventTable