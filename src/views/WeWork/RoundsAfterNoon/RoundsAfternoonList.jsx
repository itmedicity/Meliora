import React from 'react'
import { Fragment } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import CusReportDownloadClose from 'src/views/Components/CusReportDownloadClose'
import { useDispatch, useSelector } from 'react-redux'
import { getAfternoonRoundList } from 'src/redux/actions/WeAfternoonRounds.action'

const RoundsAfternoonList = () => {
    const dispatch = useDispatch()

    const getRoundsList = useSelector((state) => {
        return state.getAfternoonrounds.RoundsList || 0
    })

    useEffect(() => {
        dispatch(getAfternoonRoundList())
    }, [dispatch])


    const [column] = useState([
        { headerName: "MRDno", field: "pt_no", filter: true },
        { headerName: "AdNo", field: "ip_no", filter: true },
        { headerName: "Adn.Date", field: "admission_date", autoHeight: true, wrapText: true },
        { headerName: "Name", field: "ptc_ptname", filter: true },
        { headerName: "Doc.Visit time", field: "visit_tme" },
        { headerName: "consultant", field: "doc_name", filter: true },
        { headerName: "shift_from", field: "shift_from" },
        { headerName: "shift_to", field: "shift_to" },
        { headerName: "Room", field: "rmc_desc" },

    ])


    return (
        <Fragment>
            <CusReportDownloadClose
                title={"Rounds After 2 pm"}
                tableData={getRoundsList}
                columnDefs={column}
                sx={{ width: "100%", height: 800 }} />

        </Fragment>
    )
}

export default RoundsAfternoonList