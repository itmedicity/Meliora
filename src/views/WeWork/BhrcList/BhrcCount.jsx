import { Box } from '@mui/system'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getTotalBhrcList } from 'src/redux/actions/WeBhrcDetl.action'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import CusReportDownloadClose from 'src/views/Components/CusReportDownloadClose'
import { getTotalbhrcAdmitList } from 'src/redux/actions/WeBhrcAdmiList.action'
import { infoNotify, warningNotify } from 'src/views/Common/CommonCode'
import { Card } from '@material-ui/core'
import { Typography } from '@mui/material'

const BhrcCount = () => {

    const dispatch = useDispatch()
    const [addmission, setaddmission] = useState(false)
    const [discharge, setdischarge] = useState(false)

    const getadmmision = (e) => {
        if (e.target.checked === true) {
            setaddmission(true)
            setdischarge(false)
        }
        else {
            setaddmission(false)
            setdischarge(false)
        }
    }

    const getdischarge = (e) => {
        if (e.target.checked === true) {
            setdischarge(true)
            setaddmission(false)
        }
        else {
            setdischarge(false)
            setaddmission(false)
        }
    }

    const BhrcList = useSelector((state) => {
        return state.getWeBhrcDetl.WeBhrcList || 0
    })

    const bhrcAdmit = useSelector((state) => {
        return state.getWeBhrcAdmitdetl.WeBhrcAdmitList || 0
    })

    useEffect(() => {
        if (discharge === true && addmission === false && BhrcList.length !== 0) {
            dispatch(getTotalBhrcList(discharge))
        }
        else if (discharge === true && addmission === false && BhrcList.length === 0) {
            warningNotify("no bhrc discharge patient")
        }

        else if (addmission === true && discharge === false && bhrcAdmit.length !== 0) {
            dispatch(getTotalbhrcAdmitList(addmission))
        }
        else if (addmission === true && discharge === false && bhrcAdmit.length === 0) {
            warningNotify("no Bhrc admitted patient")
        }
        else {
            infoNotify("please select discharge or admit patient")
        }

    }, [dispatch, discharge, addmission, BhrcList.length, bhrcAdmit.length])

    const [column] = useState([
        { headerName: "MRDno", field: "pt_no" },
        { headerName: "AdNo", field: "ip_no" },
        { headerName: "Ad.Date", field: "ipd_date", wrapText: true, autoHeight: true, },
        { headerName: "Name", field: "ptc_ptname", filter: true },
        { headerName: "consultant", field: "doc_name", filter: true },
        { headerName: "Room", field: "rmc_desc" },
        { headerName: "Bed", field: "bdc_no" },
        { headerName: "Shift_from", field: "shift_from" },
        { headerName: "Shift_to", field: "shift_to" },

    ])

    return (

        <Card
            title='Bhrc patient'
        >
            <Typography sx={{ fontStyle: "normal", color: '#263238', textAlign: "left", fontSize: 18, pl: 3, pt: 2 }}>
                Bhrc patient List
            </Typography>
            <Box sx={{ width: "100%", p: 1, }}>

                <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <Box sx={{
                        width: '50%',
                        pt: 1.5, pl: 2
                    }}>
                        <CusCheckBox

                            label="Admitted"
                            color="primary"
                            size="md"
                            name="addmission"
                            value={addmission}
                            checked={addmission}
                            onCheked={getadmmision}
                        />
                    </Box>
                    <Box sx={{
                        width: '50%',
                        pt: 1.5, pl: 2
                    }}>
                        <CusCheckBox
                            label="Discharged"
                            color="primary"
                            size="md"
                            name="discharge"
                            value={discharge}
                            checked={discharge}
                            onCheked={getdischarge}
                        />
                    </Box>
                </Box>

                {
                    discharge === true ?

                        <CusReportDownloadClose
                            columnDefs={column}
                            tableData={BhrcList}
                            sx={{ width: "100%", height: 800 }} /> :
                        <CusReportDownloadClose
                            columnDefs={column}
                            tableData={bhrcAdmit}
                            sx={{ width: "100%", height: 800 }} />
                }
            </Box>

        </Card>
    )
}

export default BhrcCount