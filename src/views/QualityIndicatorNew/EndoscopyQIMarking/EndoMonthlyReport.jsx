import { Button, Chip, CssVarsProvider, Typography } from '@mui/joy'
import { Box, Paper } from '@mui/material'
import React, { Fragment, memo, useCallback, useEffect, useState } from 'react'
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import MonthlyReportModal from './MonthlyReportModal';
import { infoNotify } from 'src/views/Common/CommonCode';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import AssessmntBenchmarkModal from '../CommonComponents/AssessmntBenchmarkModal';
import { endOfMonth, format, startOfMonth } from 'date-fns';
import { axioslogin } from 'src/views/Axios/Axios';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import ReportGmailerrorredOutlinedIcon from '@mui/icons-material/ReportGmailerrorredOutlined';
import NearbyErrorIcon from '@mui/icons-material/NearbyError';
import FmdBadOutlinedIcon from '@mui/icons-material/FmdBadOutlined';
import RunningWithErrorsOutlinedIcon from '@mui/icons-material/RunningWithErrorsOutlined';
// import qiendoscopy from '../../../assets/images/qiendoscopy.png'

const EndoMonthlyReport = ({ viewData, dayFlag, searchDate }) => {
    const [endoSearch, setEndoSearch] = useState(0)
    const [tableData, setTableData] = useState([])
    // view flag  for other qi details view in modal
    const [viewFlag, setViewFlag] = useState(0)
    const [modalopen, setModalOpen] = useState(false)
    // time flag for view assessment modal view
    const [timeFlag, setTimeFlag] = useState(0)
    const [timeModal, setTimeModal] = useState(false)
    // want to check to show modal data 2 for monthly,1 for one date details via initialassessment report 
    const [monthFlag, setMonthFlag] = useState(0)

    const [monthReport, setMonthReport] = useState({
        totalTest: 0, totalError: 0, totalRedos: 0, totalTime: 0, totalIncident: 0, totalFalls: 0, totalSentinel: 0,
        totalSentinelAnalysed: 0, totalNearMisses: 0, errorResult: 0, redosResult: 0, timeResult: 0, incidenceResult: 0,
        fallsResult: 0, sentinelResult: 0, nearMissessResult: 0
    })
    const { totalTest, totalError, totalRedos, totalTime, totalIncident, totalFalls, totalSentinel, totalSentinelAnalysed,
        totalNearMisses, errorResult, redosResult, timeResult, incidenceResult, fallsResult, sentinelResult,
        nearMissessResult } = monthReport

    const [headerNames, setHeaderNames] = useState({
        header1: '', header2: '',

    })
    useEffect(() => {
        if (viewData.length !== 0) {
            const testTot = viewData.length
            const errortot = (viewData?.filter((val) => val.error_status === 1)).length
            const redostot = (viewData?.filter((val) => val.redo_status === 1)).length
            // waiting time
            const timetot = viewData?.map(val => val.sumof_service_time).reduce((prev, next) => Number(prev) + Number(next));
            const identtot = (viewData?.filter((val) => val.incidence_ident_error_status === 1)).length
            const fallstot = (viewData?.filter((val) => val.falls_status === 1)).length
            const senttot = (viewData?.filter((val) => val.sentinel_events_status === 1)).length
            const nearmisstot = (viewData?.filter((val) => val.near_misses_status === 1)).length

            const formdata = {
                totalTest: testTot,
                totalError: errortot,
                totalRedos: redostot,
                totalTime: timetot,
                totalIncident: identtot,
                totalFalls: fallstot,
                totalSentinel: senttot,
                totalSentinelAnalysed: 0,
                totalNearMisses: nearmisstot,
                errorResult: (testTot > 0 ? ((errortot / testTot) * 1000).toFixed(2) : 0),
                // errorResult: 1.23,
                redosResult: (testTot > 0 ? ((redostot / testTot) * 1000).toFixed(2) : 0),
                timeResult: (testTot > 0 ? (timetot / testTot).toFixed(2) : 0),
                incidenceResult: (testTot > 0 ? ((identtot / testTot) * 100).toFixed(2) : 0),
                fallsResult: (testTot > 0 ? ((fallstot / testTot) * 1000).toFixed(2) : 0),
                sentinelResult: (identtot > 0 ? ((senttot / identtot) * 100).toFixed(2) : 0),
                nearMissessResult: (identtot > 0 ? ((nearmisstot / identtot) * 100).toFixed(2) : 0)
            }
            setMonthReport(formdata)
            setEndoSearch(1)
        }
    }, [viewData])

    const ViewErrorDetails = useCallback(() => {
        const newData = viewData?.filter((val) => val.error_status === 1)
        if (newData.length !== 0) {
            const errorData = newData?.map((val) => {
                return {
                    incident_date: val.incident_error_date,
                    ptno: val.ptno,
                    ptname: val.ptname,
                    ptsex: val.ptsex,
                    ptage: val.ptage,
                    doctor_name: val.doctor_name,
                    details: val.error_details,
                    reason: val.error_reason,
                    // corrective: val.error_corrective,
                    // preventive: val.error_preventive,
                }
            })
            const fromdata = {
                header1: 'Details of Error',
                header2: 'Reason of Error'
            }

            setHeaderNames(fromdata)
            setTableData(errorData)
            setViewFlag(1)
            setModalOpen(true)
        } else {
            infoNotify('Details not Found')
        }

    }, [viewData])
    const ViewRedosDetails = useCallback(() => {
        const newData = viewData?.filter((val) => val.redo_status === 1)
        if (newData.length !== 0) {
            const errorData = newData?.map((val) => {
                return {
                    incident_date: val.incident_redos_date,
                    ptno: val.ptno,
                    ptname: val.ptname,
                    ptsex: val.ptsex,
                    ptage: val.ptage,
                    doctor_name: val.doctor_name,
                    details: val.redos_details,
                    reason: val.redos_reason
                    // corrective: val.redos_corrective,
                    //preventive: val.redos_preventive,
                }
            })
            const fromdata = {
                header1: 'Details',
                header2: 'Reason for Redos'
            }
            setHeaderNames(fromdata)
            setTableData(errorData)
            setViewFlag(1)
            setModalOpen(true)

        } else {
            infoNotify('Details not Found')
        }
    }, [viewData])
    const ViewWaitingTimeDetails = useCallback(() => {
        if (dayFlag === 1) {
            const newData = viewData?.filter((val) => val.assessment_benchmark_flag === 1)
            setTableData(newData)
            setTimeFlag(1)
            setMonthFlag(2)
            setTimeModal(true)
        }
        else {
            const postdata = {
                from: format(startOfMonth(new Date(searchDate)), 'yyyy-MM-dd 00:00:00'),
                to: format(endOfMonth(new Date(searchDate)), 'yyyy-MM-dd 23:59:59 ')
            }
            const getInitialAssessmentList = async (postdata) => {
                const result = await axioslogin.post('/qiendoscopy/viewAssess', postdata);
                return result.data
            }
            getInitialAssessmentList(postdata).then((val) => {
                const { success, data, message } = val
                if (success === 1) {
                    setTableData(data)
                    setTimeFlag(1)
                    setMonthFlag(2)
                    setTimeModal(true)
                }
                else if (success === 2) {
                    infoNotify(message)
                    setTimeFlag(0)
                    setMonthFlag(0)
                    setTimeModal(false)
                }
            })
        }
    }, [dayFlag, searchDate, viewData])
    const ViewIdentifictionErrorDetails = useCallback(() => {
        const newData = viewData?.filter((val) => val.incidence_ident_error_status === 1)
        if (newData.length !== 0) {
            const errorData = newData?.map((val) => {
                return {
                    incident_date: val.incidence_ident_date,
                    ptno: val.ptno,
                    ptname: val.ptname,
                    ptsex: val.ptsex,
                    ptage: val.ptage,
                    doctor_name: val.doctor_name,
                    details: val.incidence_ident_description,
                    reason: val.incidence_ident_reason
                    // corrective: val.incidence_ident_action,

                }
            })
            const fromdata = {
                header1: 'Identification Error Details',
                header2: 'Reason'
            }
            setHeaderNames(fromdata)
            setTableData(errorData)
            setViewFlag(1)
            setModalOpen(true)

        } else {
            infoNotify('Details not Found')
        }
    }, [viewData])

    const ViewFallsDetails = useCallback(() => {
        const newData = viewData?.filter((val) => val.falls_status === 1)
        if (newData.length !== 0) {
            const errorData = newData?.map((val) => {
                return {
                    incident_date: val.incident_falls_date,
                    ptno: val.ptno,
                    ptname: val.ptname,
                    ptsex: val.ptsex,
                    ptage: val.ptage,
                    doctor_name: val.doctor_name,
                    details: val.falls_details,
                    reason: val.falls_reason
                }
            })
            const fromdata = {
                header1: 'Details of Falls',
                header2: 'Reason for Falls'
            }
            setHeaderNames(fromdata)
            setTableData(errorData)
            setViewFlag(1)
            setModalOpen(true)

        } else {
            infoNotify('Details not Found')
        }
    }, [viewData])

    const ViewSentinelDetails = useCallback(() => {
        const newData = viewData?.filter((val) => val.sentinel_events_status === 1)
        if (newData.length !== 0) {
            const errorData = newData?.map((val) => {
                return {
                    incident_date: val.incident_sentinel_date,
                    ptno: val.ptno,
                    ptname: val.ptname,
                    ptsex: val.ptsex,
                    ptage: val.ptage,
                    doctor_name: val.doctor_name,
                    details: val.sentinel_details,
                    reason: val.sentinel_reason
                }
            })
            const fromdata = {
                header1: 'Details',
                header2: 'Reason for Sentinel Events Happened'
            }
            setHeaderNames(fromdata)
            setTableData(errorData)
            setViewFlag(1)
            setModalOpen(true)

        } else {
            infoNotify('Details not Found')
        }
    }, [viewData])

    const ViewNearMissessDetails = useCallback(() => {
        const newData = viewData?.filter((val) => val.near_misses_status === 1)
        if (newData.length !== 0) {
            const errorData = newData?.map((val) => {
                return {
                    incident_date: val.incident_nearmisses_date,
                    ptno: val.ptno,
                    ptname: val.ptname,
                    ptsex: val.ptsex,
                    ptage: val.ptage,
                    doctor_name: val.doctor_name,
                    details: val.nearmisses_details,
                    reason: val.nearmisses_reason
                }
            })
            const fromdata = {
                header1: 'Details',
                header2: 'Reason for Near Missess'
            }
            setHeaderNames(fromdata)
            setTableData(errorData)
            setViewFlag(1)
            setModalOpen(true)

        } else {
            infoNotify('Details not Found')
        }
    }, [viewData])

    const handleClose = useCallback(() => {
        setModalOpen(false)
        setTimeModal(false)
        setViewFlag(0)
        setTimeFlag(0)
    }, [setModalOpen])
    return (
        <Fragment>
            {timeFlag === 1 ? <AssessmntBenchmarkModal open={timeModal} handleClose={handleClose} patList={tableData} initdate={format(new Date(searchDate), 'MMM-yyyy')}
                monthFlag={monthFlag} /> : null}
            {viewFlag === 1 ? <MonthlyReportModal open={modalopen} handleClose={handleClose} tableData={tableData} headerNames={headerNames} /> : null}

            <Box variant="outlined" sx={{ overflow: 'auto', maxHeight: window.innerHeight - 280, padding: 'none' }}>
                {endoSearch === 1 ?
                    <Box sx={{}}>
                        <Paper variant='outlined' square sx={{ pt: 0.7, flex: 1 }}>
                            <Box sx={{
                                fontSize: 12, textTransform: 'uppercase', pl: 2, py: 0.5, fontWeight: 650, mx: 1,
                                color: '#555830'
                            }}>
                                Number Of Reporting Errors per 1000 Investigations
                            </Box>
                            <Box sx={{ border: '1px solid lightgrey', mx: 1, mb: 0.5, display: 'flex' }}>
                                <Box sx={{ flex: 2 }}>
                                    <Box sx={{ display: 'flex', pt: 0.5 }}>
                                        <Box sx={{ flex: 1.5, p: 0.5 }}>
                                            <Typography sx={{ fontSize: 15, pl: 0.4 }}>
                                                Total Number Of Reporting Errors
                                            </Typography>
                                        </Box>
                                        <Box sx={{ flex: 0.1, p: 0.5, fontWeight: 650, display: 'flex', justifyContent: 'flex-end' }}>
                                            :
                                        </Box>
                                        <Box sx={{ flex: 0.3, p: 0.5 }}>
                                            <Typography sx={{ fontSize: 15, pt: 0.1 }}>{totalError}</Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: 'flex' }}>
                                        <Box sx={{ flex: 1.5, p: 0.5 }}>
                                            <Typography sx={{ fontSize: 15, pl: 0.4 }}>
                                                Total Number Of Tests Performed
                                            </Typography>
                                        </Box>
                                        <Box sx={{ flex: 0.1, p: 0.5, fontWeight: 650, display: 'flex', justifyContent: 'flex-end' }}>
                                            :
                                        </Box>
                                        <Box sx={{ flex: 0.3, p: 0.5 }}>
                                            <Typography sx={{ fontSize: 15, pt: 0.1 }}>{totalTest}</Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: 'flex' }}>
                                        <Box sx={{ flex: 1.5, p: 0.5 }}>
                                            <Typography sx={{ fontSize: 15, pl: 0.4 }}>
                                                Result
                                            </Typography>
                                        </Box>
                                        <Box sx={{ flex: 0.1, p: 0.5, fontWeight: 650, display: 'flex', justifyContent: 'flex-end' }}>
                                            :
                                        </Box>
                                        <Box sx={{ flex: 0.3, p: 0.5 }}>
                                            <CssVarsProvider>
                                                {errorResult > 2.3 ?
                                                    <Chip size="md"
                                                        variant="outlined"
                                                        sx={{ color: '#bf360c' }}
                                                    >{errorResult}
                                                    </Chip>

                                                    : <Chip size="md"
                                                        variant="outlined"
                                                        sx={{ color: '#32CD30' }}
                                                    >{errorResult}
                                                    </Chip>}
                                            </CssVarsProvider>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box sx={{ flex: 0.4 }}>
                                    <Box sx={{ flex: 0.5, pt: 4, pr: 1 }} >
                                        <CssVarsProvider>
                                            <Button variant="outlined" color="neutral" size="sm"
                                                sx={{ height: 40, width: 300, display: 'flex', justifyContent: 'flex-start', borderRadius: 10 }}
                                                startDecorator={<ErrorOutlineOutlinedIcon sx={{ color: '#E55B13', cursor: 'pointer', height: 30, width: 35 }} fontSize='large' />}
                                                onClick={ViewErrorDetails}
                                            >View Error Details
                                            </Button>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ px: 1, display: 'flex', justifyContent: 'flex-end', pt: 0.5 }}>
                                        <Typography sx={{ color: 'darkred', fontSize: 11 }}>* BenchMark Value is 2.3</Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Paper>
                        <Paper variant='outlined' square sx={{ pt: 0.7, flex: 1 }}>
                            <Box sx={{
                                fontSize: 12, textTransform: 'uppercase', pl: 2, py: 0.5, fontWeight: 650, mx: 1,
                                color: '#555830'
                            }}>
                                Percentage Of Re dos
                            </Box>
                            <Box sx={{ border: '1px solid lightgrey', mx: 1, mb: 0.5, display: 'flex' }}>
                                <Box sx={{ flex: 2 }}>
                                    <Box sx={{ display: 'flex', pt: 0.5 }}>
                                        <Box sx={{ flex: 1.5, p: 0.5 }}>
                                            <Typography sx={{ fontSize: 15, pl: 0.4 }}>
                                                Total Number Of Re dos
                                            </Typography>
                                        </Box>
                                        <Box sx={{ flex: 0.1, p: 0.5, fontWeight: 650, display: 'flex', justifyContent: 'flex-end' }}>
                                            :
                                        </Box>
                                        <Box sx={{ flex: 0.3, p: 0.5 }}>
                                            <Typography sx={{ fontSize: 15, pt: 0.1 }}>{totalRedos}</Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: 'flex' }}>
                                        <Box sx={{ flex: 1.5, p: 0.5 }}>
                                            <Typography sx={{ fontSize: 15, pl: 0.4 }}>
                                                Total Number Of Tests Performed
                                            </Typography>
                                        </Box>
                                        <Box sx={{ flex: 0.1, p: 0.5, fontWeight: 650, display: 'flex', justifyContent: 'flex-end' }}>
                                            :
                                        </Box>
                                        <Box sx={{ flex: 0.3, p: 0.5 }}>
                                            <Typography sx={{ fontSize: 15, pt: 0.1 }}>{totalTest}</Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: 'flex' }}>
                                        <Box sx={{ flex: 1.5, p: 0.5 }}>
                                            <Typography sx={{ fontSize: 15, pl: 0.4 }}>
                                                Result
                                            </Typography>
                                        </Box>
                                        <Box sx={{ flex: 0.1, p: 0.5, fontWeight: 650, display: 'flex', justifyContent: 'flex-end' }}>
                                            :
                                        </Box>
                                        <Box sx={{ flex: 0.3, p: 0.5 }}>
                                            <CssVarsProvider>
                                                {redosResult > 0 ?
                                                    <Chip size="md"
                                                        variant="outlined"
                                                        sx={{ color: '#bf360c' }}
                                                    >{redosResult}
                                                    </Chip>
                                                    : <Chip size="md"
                                                        variant="outlined"
                                                        sx={{ color: '#32CD30' }}
                                                    >{redosResult}
                                                    </Chip>}
                                            </CssVarsProvider>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box sx={{ flex: 0.4 }}>
                                    <Box sx={{ flex: 0.5, pt: 4, pr: 1 }} >
                                        <CssVarsProvider>
                                            <Button variant="outlined" color="neutral" size="sm"
                                                sx={{ height: 40, width: 300, display: 'flex', justifyContent: 'flex-start', borderRadius: 10 }}
                                                startDecorator={<VaccinesIcon sx={{ color: '#778A35', cursor: 'pointer', height: 25, width: 25 }} fontSize='large' />}
                                                onClick={ViewRedosDetails}
                                            >View Re dos Details
                                            </Button>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ px: 1, display: 'flex', justifyContent: 'flex-end', pt: 0.5 }}>
                                        <Typography sx={{ color: 'darkred', fontSize: 11 }}>* BenchMark Value is 0</Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Paper>

                        <Paper variant='outlined' square sx={{ pt: 0.7, flex: 1 }}>
                            <Box sx={{
                                fontSize: 12, textTransform: 'uppercase', pl: 2, py: 0.5, fontWeight: 650, mx: 1,
                                color: '#555830'
                            }}>
                                Waiting time for services (a) Diagnostics
                            </Box>
                            <Box sx={{ border: '1px solid lightgrey', mx: 1, mb: 0.5, display: 'flex' }}>
                                <Box sx={{ flex: 2 }}>
                                    <Box sx={{ display: 'flex' }}>
                                        <Box sx={{ flex: 1.5, p: 0.5 }}>
                                            <Typography sx={{ fontSize: 15, pl: 0.4 }}>
                                                Total Sum Of Time
                                            </Typography>
                                        </Box>
                                        <Box sx={{ flex: 0.1, p: 0.5, fontWeight: 650, display: 'flex', justifyContent: 'flex-end' }}>
                                            :
                                        </Box>
                                        <Box sx={{ flex: 0.3, p: 0.5 }}>
                                            <Typography sx={{ fontSize: 15, pt: 0.1 }}>{totalTime} min   </Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: 'flex' }}>
                                        <Box sx={{ flex: 1.5, p: 0.5 }}>
                                            <Typography sx={{ fontSize: 15, pl: 0.4 }}>
                                                Total Number Of Patients Reported
                                            </Typography>
                                        </Box>
                                        <Box sx={{ flex: 0.1, p: 0.5, fontWeight: 650, display: 'flex', justifyContent: 'flex-end' }}>
                                            :
                                        </Box>
                                        <Box sx={{ flex: 0.3, p: 0.5 }}>
                                            <Typography sx={{ fontSize: 15, pt: 0.1 }}>{totalTest}</Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: 'flex' }}>
                                        <Box sx={{ flex: 1.5, p: 0.5 }}>
                                            <Typography sx={{ fontSize: 15, pl: 0.4 }}>
                                                Result
                                            </Typography>
                                        </Box>
                                        <Box sx={{ flex: 0.1, p: 0.5, fontWeight: 650, display: 'flex', justifyContent: 'flex-end' }}>
                                            :
                                        </Box>
                                        <Box sx={{ flex: 0.3, p: 0.5 }}>
                                            <CssVarsProvider>
                                                {timeResult > 10 ?
                                                    <Chip size="md"
                                                        variant="outlined"
                                                        sx={{ color: '#bf360c' }}
                                                    >{timeResult}
                                                    </Chip>
                                                    : <Chip size="md"
                                                        variant="outlined"
                                                        sx={{ color: '#32CD30' }}
                                                    >{timeResult}
                                                    </Chip>}
                                            </CssVarsProvider>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box sx={{ flex: 0.4 }}>
                                    <Box sx={{ flex: 0.5, pt: 4, pr: 1 }} >
                                        <CssVarsProvider>
                                            <Button variant="outlined" color="neutral" size="sm"
                                                sx={{ height: 40, width: 300, display: 'flex', justifyContent: 'flex-start', borderRadius: 10 }}
                                                startDecorator={<TimerOutlinedIcon sx={{ color: '#827717', cursor: 'pointer', height: 30, width: 35 }} fontSize='large' />}
                                                onClick={ViewWaitingTimeDetails}
                                            >View Waiting Time Details
                                            </Button>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ px: 1, display: 'flex', justifyContent: 'flex-end', pt: 0.5 }}>
                                        <Typography sx={{ color: 'darkred', fontSize: 11 }}>* BenchMark Value is 10 min</Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Paper>
                        <Paper variant='outlined' square sx={{ pt: 0.7, flex: 1 }}>
                            <Box sx={{
                                fontSize: 12, textTransform: 'uppercase', pl: 2, py: 0.5, fontWeight: 650, mx: 1,
                                color: '#555830'
                            }}>
                                Incidence Of Patient Identification Errors
                            </Box>
                            <Box sx={{ border: '1px solid lightgrey', mx: 1, mb: 0.5, display: 'flex' }}>
                                <Box sx={{ flex: 2 }}>
                                    <Box sx={{ display: 'flex' }}>
                                        <Box sx={{ flex: 1.5, p: 0.5 }}>
                                            <Typography sx={{ fontSize: 15, pl: 0.4 }}>
                                                Total Number Of Patient Identification Errors
                                            </Typography>
                                        </Box>
                                        <Box sx={{ flex: 0.1, p: 0.5, fontWeight: 650, display: 'flex', justifyContent: 'flex-end' }}>
                                            :
                                        </Box>
                                        <Box sx={{ flex: 0.3, p: 0.5 }}>
                                            <Typography sx={{ fontSize: 15, pt: 0.1 }}>{totalIncident}</Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: 'flex' }}>
                                        <Box sx={{ flex: 1.5, p: 0.5 }}>
                                            <Typography sx={{ fontSize: 15, pl: 0.4 }}>
                                                Total Number Of Patients
                                            </Typography>
                                        </Box>
                                        <Box sx={{ flex: 0.1, p: 0.5, fontWeight: 650, display: 'flex', justifyContent: 'flex-end' }}>
                                            :
                                        </Box>
                                        <Box sx={{ flex: 0.3, p: 0.5 }}>
                                            <Typography sx={{ fontSize: 15, pt: 0.1 }}>{totalTest}</Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: 'flex' }}>
                                        <Box sx={{ flex: 1.5, p: 0.5 }}>
                                            <Typography sx={{ fontSize: 15, pl: 0.4 }}>
                                                Result
                                            </Typography>
                                        </Box>
                                        <Box sx={{ flex: 0.1, p: 0.5, fontWeight: 650, display: 'flex', justifyContent: 'flex-end' }}>
                                            :
                                        </Box>
                                        <Box sx={{ flex: 0.3, p: 0.5 }}>
                                            <CssVarsProvider>
                                                {incidenceResult > 0 ?
                                                    <Chip size="md"
                                                        variant="outlined"
                                                        sx={{ color: '#bf360c' }}
                                                    >{incidenceResult}
                                                    </Chip>
                                                    : <Chip size="md"
                                                        variant="outlined"
                                                        sx={{ color: '#32CD30' }}
                                                    >{incidenceResult}
                                                    </Chip>}
                                            </CssVarsProvider>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box sx={{ flex: 0.4 }}>
                                    <Box sx={{ flex: 0.5, pt: 4, pr: 1 }} >
                                        <CssVarsProvider>
                                            <Button variant="outlined" color="neutral" size="sm"
                                                sx={{ height: 40, width: 300, display: 'flex', justifyContent: 'flex-start', borderRadius: 10 }}
                                                startDecorator={<ReportGmailerrorredOutlinedIcon sx={{ color: '#E55B13', cursor: 'pointer', height: 30, width: 35 }} fontSize='large' />}
                                                onClick={ViewIdentifictionErrorDetails}
                                            >View Identification Errors Details
                                            </Button>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ px: 1, display: 'flex', justifyContent: 'flex-end', pt: 0.5 }}>
                                        <Typography sx={{ color: 'darkred', fontSize: 11 }}>* BenchMark Value is 0</Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Paper>
                        <Paper variant='outlined' square sx={{ pt: 0.7, flex: 1 }}>
                            <Box sx={{
                                fontSize: 12, textTransform: 'uppercase', pl: 2, py: 0.5, fontWeight: 650, mx: 1,
                                color: '#555830'
                            }}>
                                Incidence Of Falls
                            </Box>
                            <Box sx={{ border: '1px solid lightgrey', mx: 1, mb: 0.5, display: 'flex' }}>
                                <Box sx={{ flex: 2 }}>
                                    <Box sx={{ display: 'flex' }}>
                                        <Box sx={{ flex: 1.5, p: 0.5 }}>
                                            <Typography sx={{ fontSize: 15, pl: 0.4 }}>
                                                Total Number Of Falls
                                            </Typography>
                                        </Box>
                                        <Box sx={{ flex: 0.1, p: 0.5, fontWeight: 650, display: 'flex', justifyContent: 'flex-end' }}>
                                            :
                                        </Box>
                                        <Box sx={{ flex: 0.3, p: 0.5 }}>
                                            <Typography sx={{ fontSize: 15, pt: 0.1 }}>{totalFalls}</Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: 'flex' }}>
                                        <Box sx={{ flex: 1.5, p: 0.5 }}>
                                            <Typography sx={{ fontSize: 15, pl: 0.4 }}>
                                                Total Number Of Patient Days
                                            </Typography>
                                        </Box>
                                        <Box sx={{ flex: 0.1, p: 0.5, fontWeight: 650, display: 'flex', justifyContent: 'flex-end' }}>
                                            :
                                        </Box>
                                        <Box sx={{ flex: 0.3, p: 0.5 }}>
                                            <Typography sx={{ fontSize: 15, pt: 0.1 }}>{totalTest}</Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: 'flex' }}>
                                        <Box sx={{ flex: 1.5, p: 0.5 }}>
                                            <Typography sx={{ fontSize: 15, pl: 0.4 }}>
                                                Result
                                            </Typography>
                                        </Box>
                                        <Box sx={{ flex: 0.1, p: 0.5, fontWeight: 650, display: 'flex', justifyContent: 'flex-end' }}>
                                            :
                                        </Box>
                                        <Box sx={{ flex: 0.3, p: 0.5 }}>
                                            <CssVarsProvider>
                                                {fallsResult > 0 ?
                                                    <Chip size="md"
                                                        variant="outlined"
                                                        sx={{ color: '#bf360c' }}
                                                    >{fallsResult}
                                                    </Chip>
                                                    : <Chip size="md"
                                                        variant="outlined"
                                                        sx={{ color: '#32CD30' }}
                                                    >{fallsResult}
                                                    </Chip>}
                                            </CssVarsProvider>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box sx={{ flex: 0.4 }}>
                                    <Box sx={{ flex: 0.5, pt: 4, pr: 1 }} >
                                        <CssVarsProvider>
                                            <Button variant="outlined" color="neutral" size="sm"
                                                sx={{ height: 40, width: 300, display: 'flex', justifyContent: 'flex-start', borderRadius: 10 }}
                                                startDecorator={<FmdBadOutlinedIcon sx={{ color: '#E55B13', cursor: 'pointer', height: 30, width: 35 }} fontSize='large' />}
                                                onClick={ViewFallsDetails}
                                            >View Incidence of Falls Details
                                            </Button>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ px: 1, display: 'flex', justifyContent: 'flex-end', pt: 0.5 }}>
                                        <Typography sx={{ color: 'darkred', fontSize: 11 }}>* BenchMark Value is 0</Typography>
                                    </Box>
                                </Box>

                            </Box>
                        </Paper>
                        <Paper variant='outlined' square sx={{ pt: 0.7, flex: 1 }}>
                            <Box sx={{
                                fontSize: 12, textTransform: 'uppercase', pl: 2, py: 0.5, fontWeight: 650, mx: 1,
                                color: '#555830'
                            }}>
                                Number Of Sentinel events Reported, Collected And Analysed within the defined Time Frame
                            </Box>
                            <Box sx={{ border: '1px solid lightgrey', mx: 1, mb: 0.5, display: 'flex' }}>
                                <Box sx={{ flex: 2 }}>
                                    <Box sx={{ display: 'flex' }}>
                                        <Box sx={{ flex: 1.5, p: 0.5 }}>
                                            <Typography sx={{ fontSize: 15, pl: 0.4 }}>
                                                Total Number Of Sentinel Events Analyzed within the Defined Time Frame
                                            </Typography>
                                        </Box>
                                        <Box sx={{ flex: 0.1, p: 0.5, fontWeight: 650, display: 'flex', justifyContent: 'flex-end' }}>
                                            :
                                        </Box>
                                        <Box sx={{ flex: 0.3, p: 0.5 }}>
                                            <Typography sx={{ fontSize: 15, pt: 0.1 }}>
                                                {/* want to find */}
                                                {totalSentinelAnalysed}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: 'flex' }}>
                                        <Box sx={{ flex: 1.5, p: 0.5 }}>
                                            <Typography sx={{ fontSize: 15, pl: 0.4 }}>
                                                Total Number Of Sentinel Event Reported /Collected
                                            </Typography>
                                        </Box>
                                        <Box sx={{ flex: 0.1, p: 0.5, fontWeight: 650, display: 'flex', justifyContent: 'flex-end' }}>
                                            :
                                        </Box>
                                        <Box sx={{ flex: 0.3, p: 0.5 }}>
                                            <Typography sx={{ fontSize: 15, pt: 0.1 }}>{totalSentinel}</Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: 'flex' }}>
                                        <Box sx={{ flex: 1.5, p: 0.5 }}>
                                            <Typography sx={{ fontSize: 15, pl: 0.4 }}>
                                                Result
                                            </Typography>
                                        </Box>
                                        <Box sx={{ flex: 0.1, p: 0.5, fontWeight: 650, display: 'flex', justifyContent: 'flex-end' }}>
                                            :
                                        </Box>
                                        <Box sx={{ flex: 0.3, p: 0.5 }}>
                                            <CssVarsProvider>
                                                {sentinelResult > 0 ?
                                                    <Chip size="md"
                                                        variant="outlined"
                                                        sx={{ color: '#bf360c' }}
                                                    >{sentinelResult}
                                                    </Chip>
                                                    : <Chip size="md"
                                                        variant="outlined"
                                                        sx={{ color: '#32CD30' }}
                                                    >{sentinelResult}
                                                    </Chip>}
                                            </CssVarsProvider>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box sx={{ flex: 0.4 }}>
                                    <Box sx={{ flex: 0.5, pt: 4, pr: 1 }} >
                                        <CssVarsProvider>
                                            <Button variant="outlined" color="neutral" size="sm"
                                                sx={{ height: 40, width: 300, display: 'flex', justifyContent: 'flex-start', borderRadius: 10 }}
                                                startDecorator={<RunningWithErrorsOutlinedIcon sx={{ color: '#9e9d24', cursor: 'pointer', height: 30, width: 35 }} fontSize='large' />}
                                                onClick={ViewSentinelDetails}
                                            >View Sentinel Events Details
                                            </Button>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ px: 1, display: 'flex', justifyContent: 'flex-end', pt: 0.5 }}>
                                        <Typography sx={{ color: 'darkred', fontSize: 11 }}>* BenchMark Value is 0</Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Paper>
                        <Paper variant='outlined' square sx={{ pt: 0.7, flex: 1 }}>
                            <Box sx={{
                                fontSize: 12, textTransform: 'uppercase', pl: 2, py: 0.5, fontWeight: 650, mx: 1,
                                color: '#555830'
                            }}>
                                Percentage Of Near Misses
                            </Box>
                            <Box sx={{ border: '1px solid lightgrey', mx: 1, mb: 0.5, display: 'flex' }}>
                                <Box sx={{ flex: 2 }}>
                                    <Box sx={{ display: 'flex' }}>
                                        <Box sx={{ flex: 1.5, p: 0.5 }}>
                                            <Typography sx={{ fontSize: 15, pl: 0.4 }}>
                                                Total Number Of Near Misses Reported
                                            </Typography>
                                        </Box>
                                        <Box sx={{ flex: 0.1, p: 0.5, fontWeight: 650, display: 'flex', justifyContent: 'flex-end' }}>
                                            :
                                        </Box>
                                        <Box sx={{ flex: 0.3, p: 0.5 }}>
                                            <Typography sx={{ fontSize: 15, pt: 0.1 }}>{totalNearMisses}</Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: 'flex' }}>
                                        <Box sx={{ flex: 1.5, p: 0.5 }}>
                                            <Typography sx={{ fontSize: 15, pl: 0.4 }}>
                                                Total Number Of Incidents Reported
                                            </Typography>
                                        </Box>
                                        <Box sx={{ flex: 0.1, p: 0.5, fontWeight: 650, display: 'flex', justifyContent: 'flex-end' }}>
                                            :
                                        </Box>
                                        <Box sx={{ flex: 0.3, p: 0.5 }}>
                                            <Typography sx={{ fontSize: 15, pt: 0.1 }}>{totalIncident}</Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: 'flex' }}>
                                        <Box sx={{ flex: 1.5, p: 0.5 }}>
                                            <Typography sx={{ fontSize: 15, pl: 0.4 }}>
                                                Result
                                            </Typography>
                                        </Box>
                                        <Box sx={{ flex: 0.1, p: 0.5, fontWeight: 650, display: 'flex', justifyContent: 'flex-end' }}>
                                            :
                                        </Box>
                                        <Box sx={{ flex: 0.3, p: 0.5 }}>
                                            <CssVarsProvider>
                                                {nearMissessResult > 100 ?
                                                    <Chip size="md"
                                                        variant="outlined"
                                                        sx={{ color: '#bf360c' }}
                                                    >{nearMissessResult}
                                                    </Chip>
                                                    : <Chip size="md"
                                                        variant="outlined"
                                                        sx={{ color: '#32CD30' }}
                                                    >{nearMissessResult}
                                                    </Chip>}
                                            </CssVarsProvider>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box sx={{ flex: 0.4 }}>
                                    <Box sx={{ flex: 0.5, pt: 4, pr: 1 }} >
                                        <CssVarsProvider>
                                            <Button variant="outlined" color="neutral" size="sm"
                                                sx={{ height: 40, width: 300, display: 'flex', justifyContent: 'flex-start', borderRadius: 10 }}
                                                startDecorator={<NearbyErrorIcon sx={{ color: '#ff9800', cursor: 'pointer', height: 30, width: 35 }} fontSize='large' />}
                                                onClick={ViewNearMissessDetails}
                                            >View Near Missess Details
                                            </Button>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ px: 1, display: 'flex', justifyContent: 'flex-end', pt: 0.5 }}>
                                        <Typography sx={{ color: 'darkred', fontSize: 11 }}>* BenchMark Value is 100</Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Paper >
                    </Box >
                    : <Box></Box>
                }
            </Box >

        </Fragment >
    )
}

export default memo(EndoMonthlyReport)