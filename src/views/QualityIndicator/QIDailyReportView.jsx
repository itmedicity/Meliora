import { Box, Tooltip, Typography } from '@mui/joy'
import { Paper } from '@mui/material'
import React, { Fragment, memo, useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import CusIconButton from '../Components/CusIconButton'
import CloseIcon from '@mui/icons-material/Close';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';

import { getQltyDept } from 'src/redux/actions/QualityIndicatorDept.action'
import PublishedWithChangesOutlinedIcon from '@mui/icons-material/PublishedWithChangesOutlined';
import RotateRightOutlinedIcon from '@mui/icons-material/RotateRightOutlined';
import { infoNotify } from '../Common/CommonCode'
import TextFieldCustom from '../Components/TextFieldCustom'
import moment from 'moment'
import EndoscopyQIReport from './EndoscopyDetails/EndoscopyQIReport'
import EmergencyDailyReport from './EmergencyDetails/EmergencyDailyReport'
import CensusDeptSecSelect from '../CommonSelectCode/CensusDeptSecSelect'
const QIDailyReportView = () => {

    const [qltyDept, setQltyDept] = useState(0)
    const [processDate, setProcessDate] = useState(moment(new Date()).format('YYYY-MM'))
    const [reportViewFlag, setReportViewFlag] = useState(0)
    const history = useHistory()
    const dispatch = useDispatch()
    const backtoHome = useCallback(() => {
        history.push('/Home/QIDetails')
    }, [history])
    useEffect(() => {
        dispatch(getQltyDept())
    }, [dispatch])
    const ResetData = useCallback((e) => {
        setQltyDept(0)
        setProcessDate(moment(new Date()).format('YYYY-MM'))

    }, [])
    const ReportDateOnChange = useCallback((e) => {
        setProcessDate(e.target.value)
    }, [])
    const ProcessQIData = useCallback(() => {
        if (qltyDept === 0) {
            infoNotify("Select Department For Process")
        } else if (qltyDept === 1) {
            setReportViewFlag(1)

        } else if (qltyDept === 2) {
            setReportViewFlag(2)
        }
        else {
            setReportViewFlag(0)
        }
    }, [qltyDept])

    return (
        <Fragment>
            <Box>
                {reportViewFlag === 1 ?
                    <EndoscopyQIReport setReportViewFlag={setReportViewFlag} qltyDept={qltyDept} processDate={processDate} /> :
                    reportViewFlag === 2 ? <EmergencyDailyReport setReportViewFlag={setReportViewFlag} qltyDept={qltyDept}
                        processDate={processDate} />
                        :
                        <Box sx={{ width: "100%", height: "100%" }}>
                            <Paper sx={{ display: 'flex', bgcolor: '#DBE8D8', flex: 1, height: 40 }}>
                                <Box sx={{ pt: 0.8, pl: 0.5 }} >
                                    <AnalyticsOutlinedIcon sx={{ color: 'darkgreen' }} />
                                </Box>
                                <Box sx={{ flex: 1, fontSize: 17, pt: 0.8, pl: 1 }}>
                                    <Typography sx={{ color: 'darkgreen', fontWeight: 550 }}>
                                        Quality Indicator Daily Report
                                    </Typography>
                                </Box>
                                <Box sx={{ flex: 2, }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', fontSize: 20, pt: 0.5 }}>
                                        <CusIconButton size="sm" variant="outlined" color="primary"  >
                                            <Tooltip title="Close" placement="bottom" >
                                                <CloseIcon sx={{ fontSize: 22 }} onClick={backtoHome} />
                                            </Tooltip>
                                        </CusIconButton>
                                    </Box>
                                </Box>
                            </Paper>

                            <Paper sx={{ display: 'flex', py: 2, bgcolor: '#F7F8F8' }}>
                                <Box sx={{ flex: 1, pl: 1 }} >
                                    <Box sx={{ pl: 1 }}>
                                        <Typography>Department</Typography>
                                    </Box>
                                    <Box sx={{ pt: 0.2 }}>
                                        <CensusDeptSecSelect
                                            qltyDept={qltyDept}
                                            setQltyDept={setQltyDept}
                                        />
                                    </Box>
                                </Box>
                                <Box sx={{ flex: 1, pl: 1 }} >
                                    <Box sx={{ pl: 1 }}>
                                        <Typography>Date</Typography>
                                    </Box>
                                    <Box sx={{ pt: 0.2 }}>
                                        <TextFieldCustom
                                            // slotProps={{
                                            //     input: {
                                            //         max: moment((new Date())).format('YYYY-MM-DD HH:mm:ss'),
                                            //     },
                                            // }}
                                            size="md"
                                            type="Month"
                                            name="processDate"
                                            value={processDate}
                                            onchange={(e) => ReportDateOnChange(e)}
                                        />
                                    </Box>
                                </Box>

                                <Box sx={{ display: 'flex', flex: 1, pl: 1, pt: 3.2 }} >
                                    <Box sx={{}}>
                                        <CusIconButton size="md" variant="outlined" color="primary"  >
                                            <Tooltip title="Process" placement="bottom" >
                                                <PublishedWithChangesOutlinedIcon sx={{ fontSize: 22, color: "darkgreen" }} onClick={ProcessQIData} />
                                            </Tooltip>
                                        </CusIconButton>
                                    </Box>
                                    <Box sx={{ pl: 1 }}>
                                        <CusIconButton size="md" variant="outlined" color="primary"  >
                                            <Tooltip title="Reset" placement="bottom" >
                                                <RotateRightOutlinedIcon sx={{ fontSize: 22, color: "darkgreen" }} onClick={ResetData} />
                                            </Tooltip>
                                        </CusIconButton>
                                    </Box>
                                </Box>
                            </Paper>
                        </Box>
                }
            </Box>
        </Fragment>
    )
}

export default memo(QIDailyReportView)