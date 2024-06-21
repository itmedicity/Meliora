
import { Box, Checkbox, CssVarsProvider, Input, Modal, ModalClose, ModalDialog, Textarea, Typography } from '@mui/joy'
import { Paper } from '@mui/material'
import React, { Fragment, memo, useEffect, useState } from 'react'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { differenceInHours, differenceInMinutes, differenceInSeconds, format } from 'date-fns';
import { axioslogin } from 'src/views/Axios/Axios';
import ProcedureEquipmentTable from '../Component/ProcedureEquipmentTable';

const IPDayWiseModalView = ({ open, handleClose, rowSelect }) => {
    const { qi_endo_ip_slno, ip_no, ipd_date, ptno, ptname, ptsex, ptage, ptaddrs1, ptaddrs3, doctor_name, ptmobile }
        = rowSelect

    const [errorYes, setErrorYes] = useState(false)
    const [errorNo, setErrorNo] = useState(false)
    const [redosYes, setRedosYes] = useState(false)
    const [redosNo, setRedosNo] = useState(false)
    const [errorIdentyYes, setErrorIdentyYes] = useState(false)
    const [errorIdentyNo, setErrorIdentyNo] = useState(false)
    const [fallsYes, setFallsYes] = useState(false)
    const [fallsNo, setFallsNo] = useState(false)
    const [nearYes, setNearYes] = useState(false)
    const [nearNo, setNearNo] = useState(false)
    const [sentinelYes, setSentinelYes] = useState(false)
    const [sentinelNo, setSentinelNo] = useState(false)
    const [testReqDate, setTestReqDate] = useState(new Date())
    const [entryTime, setEntryTime] = useState(new Date())
    const [assessmentTime, setAssessmentTime] = useState(new Date())
    const [startTime, setStartTime] = useState(new Date())
    const [endTime, setEndTime] = useState(new Date())
    const [reportTime, setReportTime] = useState(new Date())
    const [despatchTime, setDespatchTime] = useState(new Date())
    const [sumOfAssesment, setsumOfAssesment] = useState('')
    const [timeGap, setTimeGap] = useState('')
    const [turnaroundTime, setTurnaroundTime] = useState('')
    const [benchMarkFlag, setBenchMarkFlag] = useState(0)
    const [equipStartTime, setEquipStartTime] = useState(format(new Date(), 'yyyy-MM-dd HH:mm:ss'))
    const [equipEndTime, setEquipEndTime] = useState(format(new Date(), 'yyyy-MM-dd HH:mm:ss'))
    const [empName, setempName] = useState(0)
    const [sentinelAnalyse, setSentinelAnalyse] = useState(false)
    const [ProcedureArray, setProcedureArray] = useState([])
    // set value 0 for view delete icon, set 1 for not view delete icon in report
    const [equipReport, setEquipReport] = useState(0)

    const [qualityIndicators, setQualityIndicators] = useState({
        errorDetails: '', errorReason: '', errorCorrect: '', errorPrvnt: '', redosDetails: '', redosReason: '',
        redosCoorect: '', redosPrvnt: '', identerrorDetails: '', identerrorReason: '', errorIdentAction: '', fallsdetails: '',
        fallsReason: '', sentinelDetails: '', sentinelreason: '', nearMissesDetails: '', nearMissessReason: '', benchMarkReason: '',
        errorType: '', redosType: '', fallsType: '', identType: '', nearType: '', sentinelType: ''
    })
    const { errorDetails, errorReason, errorCorrect, errorPrvnt, redosDetails, redosReason, redosCoorect, redosPrvnt,
        identerrorDetails, identerrorReason, errorIdentAction, fallsdetails, fallsReason, sentinelDetails, sentinelreason,
        nearMissesDetails, nearMissessReason, benchMarkReason, errorType, redosType, fallsType, identType, nearType,
        sentinelType
    } = qualityIndicators

    useEffect(() => {
        if (rowSelect.length !== 0) {
            const { test_req_date, endo_arrival_time, assessment_time, proc_start_time, proc_end_time,
                report_gene_time, report_desp_time, error_status, error_details, error_reason, error_corrective, error_preventive,
                redo_status, redos_reason, redos_corrective, redos_preventive, incidence_ident_error_status, incidence_ident_description,
                incidence_ident_action, falls_status, near_misses_status, sentinel_events_status, redos_details,
                incidence_ident_reason, falls_details, falls_reason, sentinel_details, sentinel_reason, nearmisses_details,
                nearmisses_reason, initial_assessment_reason, equip_start_time, equip_end_time, em_name, em_no,
                error_incident_type, redos_incident_type, falls_incident_type, ident_error_incident_type,
                nearmiss_incident_type, sentinel_incident_type, sentinel_analysed } = rowSelect

            setErrorYes(error_status === 1 ? true : false)
            setErrorNo(error_status === 0 ? true : false)
            setRedosYes(redo_status === 1 ? true : false)
            setRedosNo(redo_status === 0 ? true : false)
            setErrorIdentyYes(incidence_ident_error_status === 1 ? true : false)
            setErrorIdentyNo(incidence_ident_error_status === 0 ? true : false)
            setFallsYes(falls_status === 1 ? true : false)
            setFallsNo(falls_status === 0 ? true : false)
            setNearYes(near_misses_status === 1 ? true : false)
            setNearNo(near_misses_status === 0 ? true : false)
            setSentinelYes(sentinel_events_status === 1 ? true : false)
            setSentinelNo(sentinel_events_status === 0 ? true : false)
            setSentinelAnalyse(sentinel_analysed === 1 ? true : false)

            const formdata = {
                errorDetails: error_details === null ? '' : error_details,
                errorReason: error_reason === null ? '' : error_reason,
                errorCorrect: error_corrective === null ? '' : error_corrective,
                errorPrvnt: error_preventive === null ? '' : error_preventive,
                redosDetails: redos_details === null ? '' : redos_details,
                redosReason: redos_reason === null ? '' : redos_reason,
                redosCoorect: redos_corrective === null ? '' : redos_corrective,
                redosPrvnt: redos_preventive === null ? '' : redos_preventive,
                identerrorDetails: incidence_ident_description === null ? '' : incidence_ident_description,
                identerrorReason: incidence_ident_reason === null ? '' : incidence_ident_reason,
                errorIdentAction: incidence_ident_action === null ? '' : incidence_ident_action,
                fallsdetails: falls_details === null ? '' : falls_details,
                fallsReason: falls_reason === null ? '' : falls_reason,
                sentinelDetails: sentinel_details === null ? '' : sentinel_details,
                sentinelreason: sentinel_reason === null ? '' : sentinel_reason,
                nearMissesDetails: nearmisses_details === null ? '' : nearmisses_details,
                nearMissessReason: nearmisses_reason === null ? '' : nearmisses_reason,
                benchMarkReason: initial_assessment_reason === null ? '' : initial_assessment_reason,
                errorType: error_incident_type === 1 ? 'GENERAL' : error_incident_type === 2 ? 'NEAR MISSESS' :
                    error_incident_type === 3 ? 'HARMFUL' : error_incident_type === 4 ? 'SENTINEL' : 'Nil',
                redosType: redos_incident_type === 1 ? 'GENERAL' : redos_incident_type === 2 ? 'NEAR MISSESS' :
                    redos_incident_type === 3 ? 'HARMFUL' : redos_incident_type === 4 ? 'SENTINEL' : 'Nil',
                fallsType: falls_incident_type === 1 ? 'GENERAL' : falls_incident_type === 2 ? 'NEAR MISSESS' :
                    falls_incident_type === 3 ? 'HARMFUL' : falls_incident_type === 4 ? 'SENTINEL' : 'Nil',
                identType: ident_error_incident_type === 1 ? 'GENERAL' : ident_error_incident_type === 2 ? 'NEAR MISSESS' :
                    ident_error_incident_type === 3 ? 'HARMFUL' : ident_error_incident_type === 4 ? 'SENTINEL' : 'Nil',
                nearType: nearmiss_incident_type === 1 ? 'GENERAL' : nearmiss_incident_type === 2 ? 'NEAR MISSESS' :
                    nearmiss_incident_type === 3 ? 'HARMFUL' : nearmiss_incident_type === 4 ? 'SENTINEL' : 'Nil',
                sentinelType: sentinel_incident_type === 1 ? 'GENERAL' : sentinel_incident_type === 2 ? 'NEAR MISSESS' :
                    sentinel_incident_type === 3 ? 'HARMFUL' : sentinel_incident_type === 4 ? 'SENTINEL' : 'Nil'

            }
            setQualityIndicators(formdata)
            setTestReqDate(format(new Date(test_req_date), 'yyyy-MM-dd'))
            setEntryTime(format(new Date(endo_arrival_time), 'yyyy-MM-dd HH:mm:ss'))
            setAssessmentTime(format(new Date(assessment_time), 'yyyy-MM-dd HH:mm:ss'))
            setStartTime(format(new Date(proc_start_time), 'yyyy-MM-dd HH:mm:ss'))
            setEndTime(format(new Date(proc_end_time), 'yyyy-MM-dd HH:mm:ss'))
            setReportTime(format(new Date(report_gene_time), 'yyyy-MM-dd HH:mm:ss'))
            setDespatchTime(format(new Date(report_desp_time), 'yyyy-MM-dd HH:mm:ss'))

            setEquipStartTime(format(new Date(equip_start_time), 'yyyy-MM-dd HH:mm:ss'))
            setEquipEndTime(format(new Date(equip_end_time), 'yyyy-MM-dd HH:mm:ss'))

            setempName(em_name === null ? 'Nil' : em_name + '  (' + em_no + ')')
        }
    }, [rowSelect])
    useEffect(() => {
        const getequipDetails = async (qi_endo_ip_slno) => {
            const result = await axioslogin.get(`/qiendoscopy/ipequip/${qi_endo_ip_slno}`)
            return result.data
        }
        getequipDetails(qi_endo_ip_slno).then((value) => {
            const { success, data } = value
            if (success === 1) {
                setProcedureArray(data)
                setEquipReport(1)
            } else {
                setProcedureArray([])
                setEquipReport(1)
            }
        })
    }, [qi_endo_ip_slno])

    useEffect(() => {
        const hours = differenceInHours(new Date(assessmentTime), new Date(entryTime))
        const minutes = differenceInMinutes(new Date(assessmentTime), new Date(entryTime)) % 60
        const seconds = differenceInSeconds(new Date(assessmentTime), new Date(entryTime)) % 60
        setsumOfAssesment(`${hours} hr ${minutes} min ${seconds} sec`)
        // waiting time
        const totMinutes = hours * 60 + minutes
        if (totMinutes > 10) {
            setBenchMarkFlag(1)
        } else {
            setBenchMarkFlag(0)
        }
    }, [assessmentTime, entryTime])

    useEffect(() => {
        const hours = differenceInHours(new Date(despatchTime), new Date(entryTime))
        const minutes = differenceInMinutes(new Date(despatchTime), new Date(entryTime)) % 60
        const seconds = differenceInSeconds(new Date(despatchTime), new Date(entryTime)) % 60
        setTimeGap(`${hours} hr ${minutes} min ${seconds} sec`)
    }, [despatchTime, entryTime])

    useEffect(() => {
        const hours = differenceInHours(new Date(despatchTime), new Date(endTime))
        const minutes = differenceInMinutes(new Date(despatchTime), new Date(endTime)) % 60
        const seconds = differenceInSeconds(new Date(despatchTime), new Date(endTime)) % 60
        setTurnaroundTime(`${hours} hr ${minutes} min ${seconds} sec`)
    }, [despatchTime, endTime])

    return (
        <Fragment>
            <CssVarsProvider>
                <Modal
                    aria-labelledby="modal-title"
                    aria-describedby="modal-desc"
                    open={open}
                    onClose={handleClose}
                    sx={{ display: 'flex', justifyContent: 'center' }}
                >
                    <ModalDialog
                        variant="outlined"
                        sx={{
                            minWidth: '65vw',
                            borderRadius: 'md',
                        }}
                    >
                        <ModalClose
                            variant="outlined"
                            sx={{
                                top: 'calc(-1/4 * var(--IconButton-size))',
                                right: 'calc(-1/4 * var(--IconButton-size))',
                                boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                                borderRadius: '50%',
                                bgcolor: 'background.body',
                                color: '#bf360c',
                                height: 35, width: 35
                            }}
                        />
                        <Paper sx={{ display: 'flex', minHeight: 40, bgcolor: '#E3E8F0' }}>
                            <Box sx={{ display: 'flex', flex: 1 }}>
                                <Box sx={{ pt: 0.5, pl: 2 }}>
                                    <Typography sx={{ fontSize: 14 }}>{ip_no}</Typography>
                                </Box>
                                <Box sx={{ pt: 0.5, pl: 2 }}>
                                    <Typography sx={{ fontSize: 14 }}>
                                        {format(new Date(ipd_date), 'dd-MM-yyyy hh:mm a')}</Typography>
                                </Box>
                                <Box sx={{ fontSize: 15, pt: 1, pl: 2, fontWeight: 500 }}>
                                    {ptno}
                                </Box>
                                <Box sx={{ fontSize: 15, pt: 1, pl: 2, fontWeight: 500 }}>
                                    {ptname.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                                </Box>
                                <Box sx={{ fontSize: 15, pt: 1, pl: 2, fontWeight: 500 }}>
                                    {ptage}/{ptsex}
                                </Box>
                                <Box sx={{ fontSize: 15, pt: 1, pl: 2, fontWeight: 500 }}>
                                    {ptaddrs1.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}

                                    {ptaddrs3 === null ? '' :
                                        ',' + ptaddrs3.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                                </Box>
                                <Box sx={{ fontSize: 15, pt: 1, pl: 2, fontWeight: 500 }}>
                                    {ptmobile}
                                </Box>
                                <Box sx={{ fontSize: 15, pt: 1, pl: 5, fontWeight: 500 }}>
                                    {"Dr. " + doctor_name.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                                </Box>
                            </Box>
                        </Paper>
                        <Box sx={{ overflow: 'auto' }}>
                            <Box sx={{ display: 'flex', pt: 1 }}>
                                <Box sx={{ flex: 2, pl: 1, pt: 0.5 }}>
                                    <Typography sx={{ fontSize: 12, fontWeight: 550, textTransform: 'uppercase' }}>Any Error Reported </Typography>
                                </Box>
                                <Typography>: </Typography>
                                <Box sx={{ flex: 1, display: 'flex', pl: 1 }}>
                                    <Box sx={{ pt: 0.6 }}>
                                        <CssVarsProvider>
                                            <Checkbox
                                                color="neutral"
                                                size="md"
                                                checked={errorYes}
                                            />
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ pl: 1, pt: 0.3 }}>
                                        <Typography sx={{ fontSize: 16 }}>
                                            Yes
                                        </Typography>
                                    </Box>
                                    <Box sx={{ pt: 0.6, pl: 2 }}>
                                        <CssVarsProvider>
                                            <Checkbox
                                                color="neutral"
                                                size="md"
                                                checked={errorNo}
                                            />
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ pl: 1, pt: 0.3 }}>
                                        <Typography sx={{ fontSize: 16 }}>
                                            No
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>

                            <Box sx={{ pl: 0.2, bgcolor: '#eceff1' }}>
                                {errorYes === true ?
                                    <Box>
                                        <Box sx={{ display: 'flex', pl: 0.3 }}>
                                            <Box sx={{ pl: 1, pt: 0.7 }}>
                                                <Typography sx={{ fontSize: 11 }}>INCIDENT TYPE</Typography>
                                            </Box>
                                            <Box sx={{ pl: 2, fontSize: 11 }}>
                                                <Typography>: </Typography>
                                            </Box>
                                            <Box sx={{ pl: 1, pt: 0.7 }}>
                                                <Typography sx={{ fontSize: 11, borderRadius: 1 }}>
                                                    {errorType}</Typography>
                                            </Box>
                                        </Box>
                                        <Box sx={{ pb: 0.5, display: 'flex' }}>
                                            <Box sx={{ flex: 1, pl: 0.3 }}>
                                                <Box sx={{ pl: 1, py: 0.5 }}>
                                                    <Typography sx={{ fontSize: 11, textTransform: 'uppercase' }}>Details Of Error</Typography>
                                                </Box>
                                                <Box >
                                                    <CssVarsProvider>
                                                        <Textarea
                                                            readOnly
                                                            minRows={3}
                                                            maxRows={3}
                                                            placeholder='Details Of Error'
                                                            required
                                                            type="text"
                                                            size="sm"
                                                            name="errorDetails"
                                                            value={errorDetails}
                                                        />
                                                    </CssVarsProvider>
                                                </Box>
                                            </Box>
                                            <Box sx={{ flex: 1, pl: 0.3 }}>
                                                <Box sx={{ pl: 1, py: 0.5 }}>
                                                    <Typography sx={{ fontSize: 11, textTransform: 'uppercase' }}>Reason Of Error</Typography>
                                                </Box>
                                                <Box >
                                                    <CssVarsProvider>
                                                        <Textarea
                                                            readOnly
                                                            minRows={3}
                                                            maxRows={3}
                                                            placeholder='Reason Of Error'
                                                            type="text"
                                                            size="sm"
                                                            name="errorReason"
                                                            value={errorReason}
                                                        />
                                                    </CssVarsProvider>
                                                </Box>
                                            </Box>
                                            <Box sx={{ flex: 1, pl: 0.3 }}>
                                                <Box sx={{ pl: 1, py: 0.5 }}>
                                                    <Typography sx={{ fontSize: 11, textTransform: 'uppercase' }}>Corrective Action</Typography>
                                                </Box>
                                                <Box>
                                                    <CssVarsProvider>
                                                        <Textarea
                                                            readOnly
                                                            minRows={3}
                                                            maxRows={3}
                                                            placeholder='Corrective Action'
                                                            type="text"
                                                            size="sm"
                                                            name="errorCorrect"
                                                            value={errorCorrect}
                                                        />
                                                    </CssVarsProvider>
                                                </Box>
                                            </Box>
                                            <Box sx={{ flex: 1, pl: 0.3 }}>
                                                <Box sx={{ pl: 1, py: 0.5 }}>
                                                    <Typography sx={{ fontSize: 11, textTransform: 'uppercase' }}>Preventive Action</Typography>
                                                </Box>
                                                <Box>
                                                    <CssVarsProvider>
                                                        <Textarea
                                                            readOnly
                                                            minRows={3}
                                                            maxRows={3}
                                                            placeholder='Preventive Action'
                                                            type="text"
                                                            size="sm"
                                                            name="errorPrvnt"
                                                            value={errorPrvnt}
                                                        />
                                                    </CssVarsProvider>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                    : null}
                            </Box>
                            <Box sx={{ display: 'flex', pt: 1 }}>
                                <Box sx={{ flex: 2, pl: 1 }}>
                                    <Typography sx={{ fontSize: 12, fontWeight: 550, textTransform: 'uppercase' }}>Test Re dos Done </Typography>
                                </Box>
                                <Typography>: </Typography>
                                <Box sx={{ flex: 1, display: 'flex', pl: 1 }}>
                                    <Box sx={{ pt: 0.6 }}>
                                        <CssVarsProvider>
                                            <Checkbox
                                                color="neutral"
                                                size="md"
                                                checked={redosYes}
                                            />
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ pl: 1, pt: 0.3 }}>
                                        <Typography sx={{ fontSize: 16 }}>
                                            Yes
                                        </Typography>
                                    </Box>
                                    <Box sx={{ pt: 0.6, pl: 2 }}>
                                        <CssVarsProvider>
                                            <Checkbox
                                                color="neutral"
                                                size="md"
                                                checked={redosNo}
                                            />
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ pl: 1, pt: 0.3 }}>
                                        <Typography sx={{ fontSize: 16 }}>
                                            No
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{ pl: 0.2, bgcolor: '#eceff1' }}>
                                {redosYes === true ?
                                    <Box>
                                        <Box sx={{ display: 'flex', pl: 0.3 }}>
                                            <Box sx={{ pl: 1, pt: 0.7 }}>
                                                <Typography sx={{ fontSize: 11 }}>INCIDENT TYPE</Typography>
                                            </Box>
                                            <Box sx={{ pl: 2, fontSize: 11 }}>
                                                <Typography>: </Typography>
                                            </Box>
                                            <Box sx={{ pl: 1, pt: 0.7 }}>
                                                <Typography sx={{ fontSize: 11, borderRadius: 1 }}>
                                                    {redosType}</Typography>
                                            </Box>
                                        </Box>
                                        <Box sx={{ pb: 0.5, display: 'flex' }}>
                                            <Box sx={{ flex: 1, pl: 0.3 }}>
                                                <Box sx={{ pl: 1, py: 0.5 }}>
                                                    <Typography sx={{ fontSize: 11, textTransform: 'uppercase' }}>Details</Typography>
                                                </Box>
                                                <Box>
                                                    <CssVarsProvider>
                                                        <Textarea
                                                            readOnly
                                                            minRows={3}
                                                            maxRows={3}
                                                            placeholder='Details'
                                                            type="text"
                                                            size="sm"
                                                            name="redosDetails"
                                                            value={redosDetails}
                                                        />
                                                    </CssVarsProvider>
                                                </Box>
                                            </Box>
                                            <Box sx={{ flex: 1, pl: 0.3 }}>
                                                <Box sx={{ pl: 1, py: 0.5 }}>
                                                    <Typography sx={{ fontSize: 11, textTransform: 'uppercase' }}>Reason For Re dos</Typography>
                                                </Box>
                                                <Box>
                                                    <CssVarsProvider>
                                                        <Textarea
                                                            readOnly
                                                            minRows={3}
                                                            maxRows={3}
                                                            placeholder='Reason For Re dos'
                                                            type="text"
                                                            size="sm"
                                                            name="redosReason"
                                                            value={redosReason}
                                                        />
                                                    </CssVarsProvider>
                                                </Box>
                                            </Box>
                                            <Box sx={{ flex: 1, pl: 0.3 }}>
                                                <Box sx={{ pl: 1, py: 0.5 }}>
                                                    <Typography sx={{ fontSize: 11, textTransform: 'uppercase' }}>Corrective Action</Typography>
                                                </Box>
                                                <Box sx={{ flex: 1 }}>
                                                    <CssVarsProvider>
                                                        <Textarea
                                                            readOnly
                                                            minRows={3}
                                                            maxRows={3}
                                                            placeholder='Corrective Action'
                                                            type="text"
                                                            size="sm"
                                                            name="redosCoorect"
                                                            value={redosCoorect}
                                                        />
                                                    </CssVarsProvider>
                                                </Box>
                                            </Box>
                                            <Box sx={{ flex: 1, pl: 0.3 }}>
                                                <Box sx={{ pl: 1, py: 0.5 }}>
                                                    <Typography sx={{ fontSize: 11, textTransform: 'uppercase' }}>Preventive Action</Typography>
                                                </Box>
                                                <Box sx={{ flex: 1, pr: 0.5 }}>
                                                    <CssVarsProvider>
                                                        <Textarea
                                                            readOnly
                                                            minRows={3}
                                                            maxRows={3}
                                                            placeholder='Preventive Action'
                                                            type="text"
                                                            size="sm"
                                                            name="redosPrvnt"
                                                            value={redosPrvnt}
                                                        />
                                                    </CssVarsProvider>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                    : null}
                            </Box>
                            <Box sx={{ display: 'flex', pt: 1 }}>
                                <Box sx={{ flex: 2, pl: 1 }}>
                                    <Typography sx={{ fontSize: 12, fontWeight: 550, textTransform: 'uppercase' }}>Incidence of Patient Identification Error</Typography>
                                </Box>
                                <Typography>: </Typography>
                                <Box sx={{ flex: 1, display: 'flex', pl: 1 }}>
                                    <Box sx={{ pt: 0.6 }}>
                                        <CssVarsProvider>
                                            <Checkbox
                                                color="neutral"
                                                size="md"
                                                checked={errorIdentyYes}
                                            />
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ pl: 1, pt: 0.3 }}>
                                        <Typography sx={{ fontSize: 16 }}>
                                            Yes
                                        </Typography>
                                    </Box>
                                    <Box sx={{ pt: 0.6, pl: 2 }}>
                                        <CssVarsProvider>
                                            <Checkbox
                                                color="neutral"
                                                size="md"
                                                checked={errorIdentyNo}
                                            />
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ pl: 1, pt: 0.3 }}>
                                        <Typography sx={{ fontSize: 16 }}>
                                            No
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{ pl: 0.2, bgcolor: '#eceff1' }}>
                                {errorIdentyYes === true ?
                                    <Box>
                                        <Box sx={{ display: 'flex', pl: 0.3 }}>
                                            <Box sx={{ pl: 1, pt: 0.7 }}>
                                                <Typography sx={{ fontSize: 11 }}>INCIDENT TYPE</Typography>
                                            </Box>
                                            <Box sx={{ pl: 2, fontSize: 11 }}>
                                                <Typography>: </Typography>
                                            </Box>
                                            <Box sx={{ pl: 1, pt: 0.7 }}>
                                                <Typography sx={{ fontSize: 11, borderRadius: 1 }}>
                                                    {identType}</Typography>
                                            </Box>
                                        </Box>
                                        <Box sx={{ pb: 0.5, display: 'flex' }}>
                                            <Box sx={{ flex: 1, pl: 0.3 }}>
                                                <Box sx={{ pl: 1, py: 0.5 }}>
                                                    <Typography sx={{ fontSize: 11, textTransform: 'uppercase' }} >Identification Error Details</Typography>
                                                </Box>
                                                <Box >
                                                    <CssVarsProvider>
                                                        <Textarea
                                                            readOnly
                                                            minRows={3}
                                                            maxRows={3}
                                                            placeholder='Identification Error Details'
                                                            type="text"
                                                            size="sm"
                                                            name="identerrorDetails"
                                                            value={identerrorDetails}
                                                        />
                                                    </CssVarsProvider>
                                                </Box>
                                            </Box>
                                            <Box sx={{ flex: 1, pl: 0.3 }}>
                                                <Box sx={{ pl: 1, py: 0.5 }}>
                                                    <Typography sx={{ fontSize: 11, textTransform: 'uppercase' }} >Identification Error Reason</Typography>
                                                </Box>
                                                <Box >
                                                    <CssVarsProvider>
                                                        <Textarea
                                                            readOnly
                                                            minRows={3}
                                                            maxRows={3}
                                                            placeholder='Identification Error Reason'
                                                            type="text"
                                                            size="sm"
                                                            name="identerrorReason"
                                                            value={identerrorReason}
                                                        />
                                                    </CssVarsProvider>
                                                </Box>
                                            </Box>
                                            <Box sx={{ flex: 1, pl: 0.3 }}>
                                                <Box sx={{ pl: 1, py: 0.5 }}>
                                                    <Typography sx={{ fontSize: 11, textTransform: 'uppercase' }}>Action Taken</Typography>
                                                </Box>
                                                <Box sx={{ flex: 1, pr: 0.5 }}>
                                                    <CssVarsProvider>
                                                        <Textarea
                                                            readOnly
                                                            minRows={3}
                                                            maxRows={3}
                                                            placeholder='Action Taken'
                                                            type="text"
                                                            size="sm"
                                                            name="errorIdentAction"
                                                            value={errorIdentAction}
                                                        />
                                                    </CssVarsProvider>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                    : null}
                            </Box>
                            <Box sx={{ display: 'flex', pt: 1 }}>
                                <Box sx={{ flex: 2, pl: 1 }}>
                                    <Typography sx={{ fontSize: 12, fontWeight: 550, textTransform: 'uppercase' }}>Incidence of Falls</Typography>
                                </Box>
                                <Typography>: </Typography>
                                <Box sx={{ flex: 1, display: 'flex', pl: 1 }}>
                                    <Box sx={{ pt: 0.6 }}>
                                        <CssVarsProvider>
                                            <Checkbox
                                                color="neutral"
                                                size="md"
                                                checked={fallsYes}
                                            />
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ pl: 1, pt: 0.3 }}>
                                        <Typography sx={{ fontSize: 16 }}>
                                            Yes
                                        </Typography>
                                    </Box>
                                    <Box sx={{ pt: 0.6, pl: 2 }}>
                                        <CssVarsProvider>
                                            <Checkbox
                                                color="neutral"
                                                size="md"
                                                checked={fallsNo}
                                            />
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ pl: 1, pt: 0.3 }}>
                                        <Typography sx={{ fontSize: 16 }}>
                                            No
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{ pl: 0.2, bgcolor: '#eceff1' }}>
                                {fallsYes === true ?
                                    <Box>
                                        <Box sx={{ display: 'flex', pl: 0.3 }}>
                                            <Box sx={{ pl: 1, pt: 0.7 }}>
                                                <Typography sx={{ fontSize: 11 }}>INCIDENT TYPE</Typography>
                                            </Box>
                                            <Box sx={{ pl: 2, fontSize: 11 }}>
                                                <Typography>: </Typography>
                                            </Box>
                                            <Box sx={{ pl: 1, pt: 0.7 }}>
                                                <Typography sx={{ fontSize: 11, borderRadius: 1 }}>
                                                    {fallsType}</Typography>
                                            </Box>
                                        </Box>
                                        <Box sx={{ pb: 0.5, display: 'flex' }}>
                                            <Box sx={{ flex: 1, pl: 0.3 }}>
                                                <Box sx={{ pl: 1, py: 0.5 }}>
                                                    <Typography sx={{ fontSize: 11, textTransform: 'uppercase' }} >Falls Details</Typography>
                                                </Box>
                                                <Box >
                                                    <CssVarsProvider>
                                                        <Textarea
                                                            readOnly
                                                            minRows={3}
                                                            maxRows={3}
                                                            placeholder='Falls Details'
                                                            type="text"
                                                            size="sm"
                                                            name="fallsdetails"
                                                            value={fallsdetails}
                                                        />
                                                    </CssVarsProvider>
                                                </Box>
                                            </Box>
                                            <Box sx={{ flex: 1, pl: 0.3 }}>
                                                <Box sx={{ pl: 1, py: 0.5 }}>
                                                    <Typography sx={{ fontSize: 11, textTransform: 'uppercase' }} >Falls Reason</Typography>
                                                </Box>
                                                <Box >
                                                    <CssVarsProvider>
                                                        <Textarea
                                                            readOnly
                                                            minRows={3}
                                                            maxRows={3}
                                                            placeholder='Falls Reason'
                                                            type="text"
                                                            size="sm"
                                                            name="fallsReason"
                                                            value={fallsReason}
                                                        />
                                                    </CssVarsProvider>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                    : null}
                            </Box>
                            <Box sx={{ display: 'flex', pt: 1 }}>
                                <Box sx={{ flex: 2, pl: 1 }}>
                                    <Typography sx={{ fontSize: 12, fontWeight: 550, textTransform: 'uppercase' }}>Sentinel Events Reported </Typography>
                                </Box>
                                <Typography>: </Typography>
                                <Box sx={{ flex: 1, display: 'flex', pl: 1 }}>
                                    <Box sx={{ pt: 0.6 }}>
                                        <CssVarsProvider>
                                            <Checkbox
                                                color="neutral"
                                                size="md"
                                                checked={sentinelYes}
                                            />
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ pl: 1, pt: 0.3 }}>
                                        <Typography sx={{ fontSize: 16 }}>
                                            Yes
                                        </Typography>
                                    </Box>
                                    <Box sx={{ pt: 0.6, pl: 2 }}>
                                        <CssVarsProvider>
                                            <Checkbox
                                                color="neutral"
                                                size="md"
                                                checked={sentinelNo}
                                            />
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ pl: 1, pt: 0.3 }}>
                                        <Typography sx={{ fontSize: 16 }}>
                                            No
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{ pl: 0.2, bgcolor: '#eceff1' }}>
                                {sentinelYes === true ?
                                    <Box>
                                        <Box sx={{ display: 'flex', pl: 0.3 }}>
                                            <Box sx={{ pl: 1, pt: 0.7 }}>
                                                <Typography sx={{ fontSize: 11 }}>INCIDENT TYPE</Typography>
                                            </Box>
                                            <Box sx={{ pl: 2, fontSize: 11 }}>
                                                <Typography>: </Typography>
                                            </Box>
                                            <Box sx={{ pl: 1, pt: 0.7 }}>
                                                <Typography sx={{ fontSize: 11, borderRadius: 1 }}>
                                                    {sentinelType}</Typography>
                                            </Box>
                                        </Box>
                                        <Box sx={{ pb: 0.5, display: 'flex' }}>
                                            <Box sx={{ flex: 1, pl: 0.3 }}>
                                                <Box sx={{ pl: 1, py: 0.5 }}>
                                                    <Typography sx={{ fontSize: 11, textTransform: 'uppercase' }} >Details</Typography>
                                                </Box>
                                                <Box >
                                                    <CssVarsProvider>
                                                        <Textarea
                                                            readOnly
                                                            minRows={3}
                                                            maxRows={3}
                                                            placeholder='Details'
                                                            type="text"
                                                            size="sm"
                                                            name="sentinelDetails"
                                                            value={sentinelDetails}
                                                        />
                                                    </CssVarsProvider>
                                                </Box>
                                            </Box>
                                            <Box sx={{ flex: 1, pl: 0.3 }}>
                                                <Box sx={{ pl: 1, py: 0.5 }}>
                                                    <Typography sx={{ fontSize: 11, textTransform: 'uppercase' }} >Reason</Typography>
                                                </Box>
                                                <Box >
                                                    <CssVarsProvider>
                                                        <Textarea
                                                            readOnly
                                                            minRows={3}
                                                            maxRows={3}
                                                            placeholder='Reason'
                                                            type="text"
                                                            size="sm"
                                                            name="sentinelreason"
                                                            value={sentinelreason}
                                                        />
                                                    </CssVarsProvider>
                                                </Box>
                                            </Box>
                                        </Box>
                                        <Box sx={{ display: 'flex' }}>
                                            <Box sx={{ flex: 2, pl: 1, pt: 0.8 }}>
                                                <Typography sx={{ fontSize: 12, fontWeight: 550, textTransform: 'uppercase' }}>
                                                    Analyzed within the Defined Time Frame </Typography>
                                            </Box>
                                            <Box sx={{ pt: 0.5 }}>:</Box>
                                            <Box sx={{ pt: 1, flex: 1, pl: 1 }}>
                                                <CssVarsProvider>
                                                    <Checkbox
                                                        color="neutral"
                                                        size="md"
                                                        checked={sentinelAnalyse}
                                                    />
                                                </CssVarsProvider>
                                            </Box>
                                        </Box>
                                    </Box>
                                    : null}
                            </Box>
                            <Box sx={{ display: 'flex', pt: 1 }}>
                                <Box sx={{ flex: 2, pl: 1 }}>
                                    <Typography sx={{ fontSize: 12, fontWeight: 550, textTransform: 'uppercase' }}>Near Misses Reported</Typography>
                                </Box>
                                <Typography>: </Typography>
                                <Box sx={{ flex: 1, display: 'flex', pl: 1 }}>
                                    <Box sx={{ pt: 0.6 }}>
                                        <CssVarsProvider>
                                            <Checkbox
                                                color="neutral"
                                                size="md"
                                                checked={nearYes}
                                            />
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ pl: 1, pt: 0.3 }}>
                                        <Typography sx={{ fontSize: 16 }}>
                                            Yes
                                        </Typography>
                                    </Box>
                                    <Box sx={{ pt: 0.6, pl: 2 }}>
                                        <CssVarsProvider>
                                            <Checkbox
                                                color="neutral"
                                                size="md"
                                                checked={nearNo}
                                            />
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ pl: 1, pt: 0.3 }}>
                                        <Typography sx={{ fontSize: 16 }}>
                                            No
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{ pl: 0.2, bgcolor: '#eceff1' }}>
                                {nearYes === true ?
                                    <Box>
                                        <Box sx={{ display: 'flex', pl: 0.3 }}>
                                            <Box sx={{ pl: 1, pt: 0.7 }}>
                                                <Typography sx={{ fontSize: 11 }}>INCIDENT TYPE</Typography>
                                            </Box>
                                            <Box sx={{ pl: 2, fontSize: 11 }}>
                                                <Typography>: </Typography>
                                            </Box>
                                            <Box sx={{ pl: 1, pt: 0.7 }}>
                                                <Typography sx={{ fontSize: 11, borderRadius: 1 }}>
                                                    {nearType}</Typography>
                                            </Box>
                                        </Box>
                                        <Box sx={{ pb: 0.5, display: 'flex' }}>
                                            <Box sx={{ flex: 1, pl: 0.3 }}>
                                                <Box sx={{ pl: 1, py: 0.5 }}>
                                                    <Typography sx={{ fontSize: 11, textTransform: 'uppercase' }} >Details</Typography>
                                                </Box>
                                                <Box >
                                                    <CssVarsProvider>
                                                        <Textarea
                                                            readOnly
                                                            minRows={3}
                                                            maxRows={3}
                                                            placeholder='Falls Details'
                                                            type="text"
                                                            size="sm"
                                                            name="nearMissesDetails"
                                                            value={nearMissesDetails}
                                                        />
                                                    </CssVarsProvider>
                                                </Box>
                                            </Box>
                                            <Box sx={{ flex: 1, px: 0.3 }}>
                                                <Box sx={{ pl: 1, py: 0.5 }}>
                                                    <Typography sx={{ fontSize: 11, textTransform: 'uppercase' }} >Reason</Typography>
                                                </Box>
                                                <Box >
                                                    <CssVarsProvider>
                                                        <Textarea
                                                            readOnly
                                                            minRows={3}
                                                            maxRows={3}
                                                            placeholder='Falls Reason'
                                                            type="text"
                                                            size="sm"
                                                            name="nearMissessReason"
                                                            value={nearMissessReason}
                                                        />
                                                    </CssVarsProvider>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                    : null}
                            </Box>
                            <Box sx={{ display: 'flex', pt: 1 }}>
                                <Box sx={{ flex: 2, pl: 1 }}>
                                    <Typography sx={{ fontSize: 12, fontWeight: 550, textTransform: 'uppercase' }}>Waiting Time For Services Diagnostics </Typography>
                                </Box>
                                <Typography>: </Typography>
                                <Box sx={{ flex: 1, pl: 1 }}></Box>
                            </Box>
                            <Box sx={{ pl: 0.2, display: 'flex', py: 0.5, m: 0.5, bgcolor: '#eceff1' }}>
                                <Box sx={{ flex: 1 }}>
                                    <Box sx={{ pl: 0.5, py: 0.5, flex: 1 }}>
                                        <Typography sx={{ fontSize: 11, textTransform: 'uppercase' }}>Test Requested Date</Typography>
                                    </Box>
                                    <Box sx={{ pl: 1, flex: 1 }}>
                                        <CssVarsProvider>
                                            <Input
                                                readOnly
                                                endDecorator={<CalendarMonthIcon sx={{ height: 20, width: 20, color: '#555830' }} />}
                                                size="sm"
                                                name="testReqDate"
                                                value={format(new Date(testReqDate), 'dd-MM-yyyy')}
                                                sx={{ height: 38 }}
                                            />
                                        </CssVarsProvider>
                                    </Box>
                                </Box>
                                <Box sx={{ flex: 1, pl: 0.5 }}>
                                    <Box sx={{ pl: 0.5, py: 0.5, flex: 1 }}>
                                        <Typography sx={{ fontSize: 11, textTransform: 'uppercase' }}>Patient Entered Time in Endoscopy Area</Typography>
                                    </Box>
                                    <Box sx={{ pl: 1, flex: 1 }}>
                                        <CssVarsProvider>
                                            <Input
                                                readOnly
                                                endDecorator={<CalendarMonthIcon sx={{ height: 20, width: 20, color: '#555830' }} />}
                                                size="sm"
                                                name="entryTime"
                                                value={format(new Date(entryTime), 'dd-MM-yyyy hh:mm a')}
                                                sx={{ height: 38 }}
                                            />
                                        </CssVarsProvider>
                                    </Box>
                                </Box>
                                <Box sx={{ flex: 1, pl: 0.5 }}>
                                    <Box sx={{ pl: 0.5, py: 0.5, flex: 1 }}>
                                        <Typography sx={{ fontSize: 11, textTransform: 'uppercase' }}>Assessment Checklist Done By Nurse</Typography>
                                    </Box>
                                    <Box sx={{ pr: 1, pl: 1, flex: 1 }} >
                                        <CssVarsProvider>
                                            <Input
                                                readOnly
                                                endDecorator={<CalendarMonthIcon sx={{ height: 20, width: 20, color: '#555830' }} />}
                                                size="sm"
                                                name="assessmentTime"
                                                value={format(new Date(assessmentTime), 'dd-MM-yyyy hh:mm a')}
                                                sx={{ height: 38 }}
                                            />
                                        </CssVarsProvider>
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{ pl: 0.2, display: 'flex', py: 0.5, m: 0.5, bgcolor: '#eceff1' }}>
                                <Box sx={{ flex: 1 }}>
                                    <Box sx={{ pl: 0.5, py: 0.5, flex: 1 }}>
                                        <Typography sx={{ fontSize: 11, textTransform: 'uppercase' }}>Procedure Starting Time</Typography>
                                    </Box>
                                    <Box sx={{ pl: 1, flex: 1 }}>
                                        <CssVarsProvider>
                                            <Input
                                                readOnly
                                                endDecorator={<CalendarMonthIcon sx={{ height: 20, width: 20, color: '#555830' }} />}
                                                size="sm"
                                                name="startTime"
                                                value={format(new Date(startTime), 'dd-MM-yyyy hh:mm a')}
                                                sx={{ height: 38 }}
                                            />
                                        </CssVarsProvider>
                                    </Box>
                                </Box>
                                <Box sx={{ flex: 1, pl: 0.5 }}>
                                    <Box sx={{ pl: 0.5, py: 0.5, flex: 1 }}>
                                        <Typography sx={{ fontSize: 11, textTransform: 'uppercase' }}>Procedure Ending Time</Typography>
                                    </Box>
                                    <Box sx={{ pl: 1, flex: 1 }}>
                                        <CssVarsProvider>
                                            <Input
                                                readOnly
                                                endDecorator={<CalendarMonthIcon sx={{ height: 20, width: 20, color: '#555830' }} />}
                                                size="sm"
                                                name="endTime"
                                                value={format(new Date(endTime), 'dd-MM-yyyy hh:mm a')}
                                                sx={{ height: 38 }}
                                            />
                                        </CssVarsProvider>
                                    </Box>
                                </Box>
                                <Box sx={{ flex: 1, pl: 0.5 }}>
                                    <Box sx={{ pl: 0.5, py: 0.5, flex: 1 }}>
                                        <Typography sx={{ fontSize: 11, textTransform: 'uppercase' }}>Report Generating Time</Typography>
                                    </Box>
                                    <Box sx={{ pr: 1, pl: 1, flex: 1 }} >
                                        <CssVarsProvider>
                                            <Input
                                                readOnly
                                                endDecorator={<CalendarMonthIcon sx={{ height: 20, width: 20, color: '#555830' }} />}
                                                size="sm"
                                                name="reportTime"
                                                value={format(new Date(reportTime), 'dd-MM-yyyy hh:mm a')}
                                                sx={{ height: 38 }}
                                            />
                                        </CssVarsProvider>
                                    </Box>
                                </Box>
                                <Box sx={{ flex: 1 }}>
                                    <Box sx={{ pl: 0.5, py: 0.5, flex: 1 }}>
                                        <Typography sx={{ fontSize: 11, textTransform: 'uppercase' }}>Report Despatching Time</Typography>
                                    </Box>
                                    <Box sx={{ pl: 0.5, flex: 1, pr: 0.8 }} >
                                        <CssVarsProvider>
                                            <Input
                                                readOnly
                                                endDecorator={<CalendarMonthIcon sx={{ height: 20, width: 20, color: '#555830' }} />}
                                                size="sm"
                                                name="despatchTime"
                                                value={format(new Date(despatchTime), 'dd-MM-yyyy hh:mm a')}
                                                sx={{ height: 38, minWidth: 10 }}
                                            />
                                        </CssVarsProvider>
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', m: 0.5, bgcolor: '#eceff1', pb: 0.5, flex: 1 }}>
                                <Box sx={{ flex: 1 }}>
                                    <Box sx={{ pl: 0.5, pt: 0.5 }}>
                                        <Typography sx={{ fontSize: 11, textTransform: 'uppercase' }}>Sum of Time Taken For Assessment</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'center', pt: 0.1, pl: 1 }}>
                                        {benchMarkFlag === 1 ?
                                            <Box sx={{
                                                flex: 1, bgcolor: 'white', color: 'red', height: 38, mr: 0.6, pt: 0.8,
                                                border: '1px solid lightgrey', pl: 2, borderRadius: 6
                                            }}>
                                                {sumOfAssesment}
                                            </Box>
                                            : <Box sx={{
                                                flex: 1, bgcolor: 'white', height: 38, mr: 0.6, pt: 0.8,
                                                border: '1px solid lightgrey', pl: 2, borderRadius: 6
                                            }}>
                                                {sumOfAssesment}
                                            </Box>}
                                    </Box>
                                </Box>
                                <>
                                    {benchMarkFlag === 1 ?
                                        <Box sx={{ flex: 1.5 }}>
                                            <Box sx={{ pl: 0.5, pt: 0.5 }}>
                                                <Typography sx={{ fontSize: 11, textTransform: 'uppercase' }}>Reason for Assessment Time Exceedence </Typography>
                                            </Box>
                                            <Box sx={{ pt: 0.1, pr: 0.5 }}>
                                                <CssVarsProvider>
                                                    <Textarea
                                                        sx={{ height: 38, borderRadius: 6 }}
                                                        maxRows={1}
                                                        placeholder='type here....'
                                                        type="text"
                                                        size="sm"
                                                        name="benchMarkReason"
                                                        value={benchMarkReason}
                                                    />
                                                </CssVarsProvider>
                                            </Box>
                                        </Box> : null
                                    }
                                </>
                                <Box sx={{ flex: 1 }}>
                                    <Box sx={{ pt: 0.5, pl: 0.3 }}>
                                        <Typography sx={{ fontSize: 11, textTransform: 'uppercase' }}>Total Time Gap</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'center', pt: 0.1 }}>
                                        <Box sx={{
                                            flex: 1, bgcolor: 'white', height: 38, mr: 0.6, pt: 0.8,
                                            border: '1px solid lightgrey', pl: 2, borderRadius: 6
                                        }}>
                                            {timeGap}
                                        </Box>
                                    </Box>
                                </Box>
                                <Box sx={{ flex: 1 }}>
                                    <Box sx={{ pt: 0.5 }}>
                                        <Typography sx={{ fontSize: 11, textTransform: 'uppercase' }}>Turnaround Time</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'center', pt: 0.1 }}>
                                        <Box sx={{
                                            flex: 1, bgcolor: 'white', height: 38, mr: 0.6, pt: 0.8,
                                            border: '1px solid lightgrey', pl: 2, borderRadius: 6
                                        }}>
                                            {turnaroundTime}
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                            {benchMarkFlag === 1 ?
                                <Box sx={{ flex: 1 }}>
                                    <Typography sx={{ color: 'red', fontSize: 11, pl: 2 }}>*Initial Assessment BenchMark Time is 10 min</Typography>
                                </Box>
                                : null}

                            <Box sx={{ display: 'flex' }}>
                                <Box sx={{ flex: 2, pl: 1 }}>
                                    <Typography sx={{ fontSize: 12, fontWeight: 550, textTransform: 'uppercase' }}>Equipment Utilization </Typography>
                                </Box>
                                <Box sx={{ flex: 1, pl: 1 }}></Box>
                            </Box>
                            <Box sx={{ display: 'flex', m: 0.5, bgcolor: '#eceff1', flex: 1, py: 0.5 }}>
                                {ProcedureArray.length > 0 ?
                                    <Box sx={{ px: 0.7 }}>
                                        <ProcedureEquipmentTable ProcedureArray={ProcedureArray} setProcedureArray={setProcedureArray}
                                            equipReport={equipReport} />
                                    </Box>
                                    : null}
                            </Box>
                            <Box sx={{ display: 'flex', m: 0.5, bgcolor: '#eceff1', flex: 1, pb: 0.5 }}>
                                <Box sx={{ flex: 1 }}>
                                    <Box sx={{ pl: 0.7, pt: 0.5 }}>
                                        <Typography sx={{ fontSize: 11, textTransform: 'uppercase' }}>Start Time</Typography>
                                    </Box>
                                    <Box sx={{ pl: 1, pt: 0.2 }}>
                                        <CssVarsProvider>
                                            <Input
                                                readOnly
                                                endDecorator={<CalendarMonthIcon sx={{ height: 20, width: 20, color: '#555830' }} />}
                                                size="sm"
                                                name="endTime"
                                                value={format(new Date(equipStartTime), 'dd-MM-yyyy hh:mm a')}
                                                sx={{ height: 38 }}
                                            />
                                        </CssVarsProvider>
                                    </Box>
                                </Box>
                                <Box sx={{ flex: 1 }}>
                                    <Box sx={{ pl: 0.5, pt: 0.5 }}>
                                        <Typography sx={{ fontSize: 11, textTransform: 'uppercase' }}>End Time</Typography>
                                    </Box>
                                    <Box sx={{ px: 1, pt: 0.2 }}>
                                        <CssVarsProvider>
                                            <Input
                                                readOnly
                                                endDecorator={<CalendarMonthIcon sx={{ height: 20, width: 20, color: '#555830' }} />}
                                                size="sm"
                                                name="endTime"
                                                value={format(new Date(equipEndTime), 'dd-MM-yyyy hh:mm a')}
                                                sx={{ height: 38 }}
                                            />
                                        </CssVarsProvider>
                                    </Box>
                                </Box>
                                <Box sx={{ flex: 1 }}>
                                    <Box sx={{ pt: 0.5, pl: 0.5 }}>
                                        <Typography sx={{ fontSize: 11, textTransform: 'uppercase' }}>Employee</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'center', pt: 0.2, pr: 1 }}>
                                        <Box sx={{
                                            flex: 1, bgcolor: 'white', height: 38, pt: 0.6, border: '1px solid lightgrey',
                                            pl: 2, borderRadius: 6
                                        }}>
                                            {empName}
                                        </Box>
                                    </Box>
                                </Box>

                            </Box>
                        </Box>
                    </ModalDialog>
                </Modal>
            </CssVarsProvider>
        </Fragment >
    )
}

export default memo(IPDayWiseModalView)