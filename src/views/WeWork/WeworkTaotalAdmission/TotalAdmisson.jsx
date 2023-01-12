import React, { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getTotalWeworkAdmission } from 'src/redux/actions/WeWrkTotAdmision.action'
import { useDispatch } from 'react-redux'
import CusReportDownloadClose from 'src/views/Components/CusReportDownloadClose'



const TotalAdmisson = () => {
    const dispatch = useDispatch()
    const TotalWeAdmission = useSelector((state) => {
        return state.getTotalWeAdmission.WeTotalList || 0
    })

    useEffect(() => {
        dispatch(getTotalWeworkAdmission())
    }, [dispatch])

    const [column] = useState([

        { headerName: "MRDno", field: "pt_no" },
        { headerName: "Ad.Date", field: "ipd_date" },
        { headerName: "AdNo", field: "ip_no", filter: true },
        { headerName: "Name", field: "ptc_ptname", filter: true },
        { headerName: "Nursing station", field: "nsc_desc", filter: true },
        { headerName: "Bed no.", field: "bdc_no" },
        { headerName: "mobile", field: "ptc_mobile", filter: true },
        { headerName: "Room", field: "rcc_desc" },
    ])

    return (
        <Fragment>
            <CusReportDownloadClose
                title={"Total Admission"}
                columnDefs={column}
                tableData={TotalWeAdmission}
                sx={{ width: "100%", height: 800 }} />

        </Fragment>
    )
}

export default TotalAdmisson