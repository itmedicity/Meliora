import { Paper } from '@mui/material'
import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, warningNotify } from 'src/views/Common/CommonCode'
import CardCloseOnly from 'src/views/Components/CardCloseOnly'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'


const TotalAdmisson = () => {
    const [tableData, setTabledata] = useState([])
    const history = useHistory()




    const [column] = useState([

        { headerName: "MRDno", field: "pt_no" },
        { headerName: "Ad.Date", field: "ipd_date" },
        { headerName: "AdNo", field: "ip_no" },
        { headerName: "Name", field: "ptc_ptname" },
        { headerName: "Nursing station", field: "nsc_desc" },
        { headerName: "Bed no.", field: "bdc_no" },
        { headerName: "mobile", field: "ptc_mobile" },
        { headerName: "Room", field: "rcc_desc" },
    ])
    useEffect(() => {
        const gettotaladmision = async () => {
            const result = await axioslogin.get(`/WeWork/total/admission`)
            const { success, data, message } = result.data
            if (success === 1) {
                setTabledata(data)

            } else if (success === 2) {
                setTabledata([])
                infoNotify(message)
            }
            else {
                warningNotify("Error occured contact EDP")
            }

        }
        gettotaladmision();
    }, [])



    const backtoSetting = useCallback(() => {
        history.push('/Home/Settings')
    }, [history])
    return (
        <Fragment>
            <CardCloseOnly
                title="Total Complaint"
                close={backtoSetting}
            >
                <Paper sx={{ p: 2 }}>
                    <CusAgGridMast
                        columnDefs={column}
                        tableData={tableData} />
                </Paper>
            </CardCloseOnly>
        </Fragment>
    )
}

export default TotalAdmisson