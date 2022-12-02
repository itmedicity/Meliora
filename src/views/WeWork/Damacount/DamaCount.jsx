import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Fragment } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { getWeDamaDetl } from 'src/redux/actions/WeDamaDetl.action'
import CusReportDownloadClose from 'src/views/Components/CusReportDownloadClose'

const DamaCount = () => {
    const dispatch = useDispatch()
    const getDamadetlList = useSelector((state) => {
        return state.getDamaDetl.damaList || 0

    })

    useEffect(() => {
        dispatch(getWeDamaDetl())
    }, [dispatch])



    // useEffect(() => {
    //     if (getDamadetlList.length !== 0) {
    //         console.log("if");
    //         dispatch(getWeDamaDetl())
    //     }
    //     else if (getDamadetlList.length === 0) {
    //         console.log("else if");
    //     }
    //     else {
    //         console.log("else");
    //         warningNotify("cdzsdf")
    //     }
    // }, [dispatch, getDamadetlList.length])

    const [column] = useState([
        { headerName: "MRDno", field: "pt_no", filter: true },
        { headerName: "Ad.Date", field: "ipd_date", filter: true, wrapText: true, autoHeight: true, width: 300 },
        { headerName: "AdNo", field: "ip_no", filter: true, },
        { headerName: "Name", field: "ptc_ptname", filter: true },
        { headerName: "Payment", field: "payment_mode" },
        { headerName: "consultant", field: "doc_name", filter: true },
        { headerName: "Room", field: "rmc_desc" },
        { headerName: "Remark", field: "dama_remarks" },

    ])


    return (
        <Fragment>
            <CusReportDownloadClose
                title={"DAMA Patient List"}
                columnDefs={column}
                tableData={getDamadetlList}
                sx={{ width: "100%", height: 800 }}
            />
        </Fragment>
    )
}

export default DamaCount