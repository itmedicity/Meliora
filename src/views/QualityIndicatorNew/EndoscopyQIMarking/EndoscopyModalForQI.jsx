import { Dialog, DialogContent, Paper } from '@mui/material'
import React, { Fragment, memo, useCallback, useEffect, useMemo, useState } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker, DateTimePicker } from '@mui/x-date-pickers';
import { Box, Button, CssVarsProvider, Textarea, Typography, Checkbox, Tooltip, Input } from '@mui/joy';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { addMinutes, differenceInHours, differenceInMinutes, differenceInSeconds, format } from 'date-fns';
import { useSelector } from 'react-redux';
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode';
import { axioslogin } from 'src/views/Axios/Axios';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import IncidentModal from '../CommonComponents/IncidentModal';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const EndoscopyModalForQI = ({ open, handleClose, rowSelect, count, setCount, depName, qidept, RefreshData }) => {

    const { qi_slno, patient_arrived_date, ptno, ptname, ptsex, ptage, ptaddrs1, ptaddrs3, doctor_name, ptmobile,
        error_status, redo_status, incidence_ident_error_status, falls_status, near_misses_status, sentinel_events_status
    } = rowSelect

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
    const [testReqDate, setTestReqDate] = useState(format(new Date(), "yyyy-MM-dd"))
    const [entryTime, setEntryTime] = useState(format(new Date(), 'yyyy-MM-dd HH:mm:ss'))
    const [assessmentTime, setAssessmentTime] = useState(format(new Date(), 'yyyy-MM-dd HH:mm:ss'))
    const [startTime, setStartTime] = useState(format(new Date(), 'yyyy-MM-dd HH:mm:ss'))
    const [endTime, setEndTime] = useState(format(new Date(), 'yyyy-MM-dd HH:mm:ss'))
    const [reportTime, setReportTime] = useState(format(new Date(), 'yyyy-MM-dd HH:mm:ss'))
    const [despatchTime, setDespatchTime] = useState(format(new Date(), 'yyyy-MM-dd HH:mm:ss'))
    const [sumOfAssesment, setsumOfAssesment] = useState('')
    const [timeGap, setTimeGap] = useState('')
    const [turnaroundTime, setTurnaroundTime] = useState('')
    const [incmodalopen, setIncModalOpen] = useState(false)
    const [incFlag, setIncFlag] = useState(0) // for inident modal open
    const [incidentView, setincidentView] = useState([])
    const [incdExist, setIncdExist] = useState(0) // for to check inident add/update
    const [serviceTime, setServiceTime] = useState(0)
    const [incRegFlag, setIncRegFlag] = useState(0) // for each incident button click value change
    const [benchMarkFlag, setBenchMarkFlag] = useState(0)
    const [incCount, setincCount] = useState(0)
    const [errorDetails, setErrorDetails] = useState('')
    const [errorReason, setErrorReason] = useState('')
    const [errorCorrect, setErrorCorrect] = useState('')
    const [errorPrvnt, setErrorPrvnt] = useState('')
    const [redosDetails, setRedosDetails] = useState('')
    const [redosReason, setRedosReason] = useState('')
    const [redosCoorect, setRedosCoorect] = useState('')
    const [redosPrvnt, setRedosPrvnt] = useState('')
    const [identerrorDetails, setIdenterrorDetails] = useState('')
    const [identerrorReason, setIdenterrorReason] = useState('')
    const [errorIdentAction, setErrorIdentAction] = useState('')
    const [fallsdetails, setFallsdetails] = useState('')
    const [fallsReason, setFallsReason] = useState('')
    const [sentinelDetails, setSentinelDetails] = useState('')
    const [sentinelreason, setSentinelreason] = useState('')
    const [nearMissesDetails, setNearMissesDetails] = useState('')
    const [nearMissessReason, setNearMissessReason] = useState('')
    const [benchMarkReason, setBenchMarkReason] = useState('')
    // const [errorType, setErrorType] = useState('')
    // const [redosType, setRedosType] = useState('')
    // const [fallsType, setFallsType] = useState('')
    // const [identType, setIdentType] = useState('')
    // const [nearType, setnearType] = useState('')
    // const [sentinelType, setSentinelType] = useState('')

    const id = useSelector((state) => {
        return state?.LoginUserData.empid
    })
    useEffect(() => {
        if (rowSelect.length !== 0) {
            const { patient_arrived_date, test_req_date, endo_arrival_time, assessment_time, proc_start_time, proc_end_time,
                report_gene_time, report_desp_time, error_status, error_details, error_reason, error_corrective, error_preventive,
                redo_status, redos_reason, redos_corrective, redos_preventive, incidence_ident_error_status, incidence_ident_description,
                incidence_ident_action, falls_status, near_misses_status, sentinel_events_status, redos_details,
                incidence_ident_reason, falls_details, falls_reason, sentinel_details, sentinel_reason, nearmisses_details,
                nearmisses_reason, initial_assessment_reason } = rowSelect

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

            // setErrorType(error_incident_type === 1 ? 'GENERAL' : error_incident_type === 2 ? 'NEAR MISSESS' :
            //     error_incident_type === 3 ? 'HARMFUL' : error_incident_type === 4 ? 'SENTINEL' : 'Nil')
            // setRedosType(redos_incident_type === 1 ? 'GENERAL' : redos_incident_type === 2 ? 'NEAR MISSESS' :
            //     redos_incident_type === 3 ? 'HARMFUL' : redos_incident_type === 4 ? 'SENTINEL' : 'Nil')
            // setFallsType(falls_incident_type === 1 ? 'GENERAL' : falls_incident_type === 2 ? 'NEAR MISSESS' :
            //     falls_incident_type === 3 ? 'HARMFUL' : falls_incident_type === 4 ? 'SENTINEL' : 'Nil')
            // setIdentType(ident_error_incident_type === 1 ? 'GENERAL' : ident_error_incident_type === 2 ? 'NEAR MISSESS' :
            //     ident_error_incident_type === 3 ? 'HARMFUL' : ident_error_incident_type === 4 ? 'SENTINEL' : 'Nil')
            // setSentinelType(sentinel_incident_type === 1 ? 'GENERAL' : sentinel_incident_type === 2 ? 'NEAR MISSESS' :
            //     sentinel_incident_type === 3 ? 'HARMFUL' : sentinel_incident_type === 4 ? 'SENTINEL' : 'Nil')
            // setnearType(nearmiss_incident_type === 1 ? 'GENERAL' : nearmiss_incident_type === 2 ? 'NEAR MISSESS' :
            //     nearmiss_incident_type === 3 ? 'HARMFUL' : nearmiss_incident_type === 4 ? 'SENTINEL' : 'Nil')

            setErrorDetails(error_details === null ? '' : error_details)
            setErrorReason(error_reason === null ? '' : error_reason)
            setErrorCorrect(error_corrective === null ? '' : error_corrective)
            setErrorPrvnt(error_preventive === null ? '' : error_preventive)
            setRedosDetails(redos_details === null ? '' : redos_details)
            setRedosReason(redos_reason === null ? '' : redos_reason)
            setRedosCoorect(redos_corrective === null ? '' : redos_corrective)
            setRedosPrvnt(redos_preventive === null ? '' : redos_preventive)
            setIdenterrorDetails(incidence_ident_description === null ? '' : incidence_ident_description)
            setIdenterrorReason(incidence_ident_reason === null ? '' : incidence_ident_reason)
            setErrorIdentAction(incidence_ident_action === null ? '' : incidence_ident_action)
            setFallsdetails(falls_details === null ? '' : falls_details)
            setFallsReason(falls_reason === null ? '' : falls_reason)
            setSentinelDetails(sentinel_details === null ? '' : sentinel_details)
            setSentinelreason(sentinel_reason === null ? '' : sentinel_reason)
            setNearMissesDetails(nearmisses_details === null ? '' : nearmisses_details)
            setNearMissessReason(nearmisses_reason === null ? '' : nearmisses_reason)
            setBenchMarkReason(initial_assessment_reason === null ? '' : initial_assessment_reason)

            setTestReqDate(test_req_date === null ? format(new Date(patient_arrived_date), "yyyy-MM-dd") : test_req_date)
            setEntryTime(endo_arrival_time === null ? format(addMinutes(new Date(patient_arrived_date), 30), 'yyyy-MM-dd HH:mm:ss') : endo_arrival_time)
            setAssessmentTime(assessment_time === null ? format(addMinutes(new Date(patient_arrived_date), 40), 'yyyy-MM-dd HH:mm:ss') : assessment_time)
            setStartTime(proc_start_time === null ? format(addMinutes(new Date(patient_arrived_date), 60), 'yyyy-MM-dd HH:mm:ss') : proc_start_time)
            setEndTime(proc_end_time === null ? format(addMinutes(new Date(patient_arrived_date), 120), 'yyyy-MM-dd HH:mm:ss') : proc_end_time)
            setReportTime(report_gene_time === null ? format(addMinutes(new Date(patient_arrived_date), 140), 'yyyy-MM-dd HH:mm:ss') : report_gene_time)
            setDespatchTime(report_desp_time === null ? format(addMinutes(new Date(patient_arrived_date), 150), 'yyyy-MM-dd HH:mm:ss') : report_desp_time)
        }
    }, [rowSelect])

    const reset = useCallback(() => {
        setErrorDetails('')
        setErrorReason('')
        setErrorCorrect('')
        setErrorPrvnt('')
        setRedosDetails('')
        setRedosReason('')
        setRedosCoorect('')
        setRedosPrvnt('')
        setIdenterrorDetails('')
        setIdenterrorReason('')
        setErrorIdentAction('')
        setFallsdetails('')
        setFallsReason('')
        setSentinelDetails('')
        setSentinelreason('')
        setNearMissesDetails('')
        setNearMissessReason('')
        setBenchMarkReason('')
        setErrorYes(false)
        setErrorNo(true)
        setRedosYes(false)
        setRedosNo(true)
        setErrorIdentyYes(false)
        setErrorIdentyNo(true)
        setFallsYes(false)
        setFallsNo(true)
        setNearYes(false)
        setNearNo(true)
        setSentinelYes(false)
        setSentinelNo(true)
        setTestReqDate(format(new Date(), "yyyy-MM-dd"))
        setEntryTime(format(new Date(), 'yyyy-MM-dd HH:mm:ss'))
        setAssessmentTime(format(new Date(), 'yyyy-MM-dd HH:mm:ss'))
        setStartTime(format(new Date(), 'yyyy-MM-dd HH:mm:ss'))
        setEndTime(format(new Date(), 'yyyy-MM-dd HH:mm:ss'))
        setsumOfAssesment('')
        setReportTime(format(new Date(), 'yyyy-MM-dd HH:mm:ss'))
        setDespatchTime(format(new Date(), 'yyyy-MM-dd HH:mm:ss'))
        setTimeGap('')
        setTurnaroundTime('')
        setBenchMarkFlag(0)
        setincidentView([])
        handleClose()
    }, [handleClose])
    const ChangeErrorYes = useCallback((e) => {
        if (e.target.checked === true) {
            setErrorYes(true)
            setErrorNo(false)
        }
        else {
            setErrorYes(false)
            setErrorNo(true)
        }
    }, [])
    const ChangeErrorNo = useCallback((e) => {
        if (e.target.checked === true) {
            setErrorYes(false)
            setErrorNo(true)
        }
        else {
            setErrorYes(true)
            setErrorNo(false)
        }
    }, [])
    const ChangeRedosYes = useCallback((e) => {
        if (e.target.checked === true) {
            setRedosYes(true)
            setRedosNo(false)
        }
        else {
            setRedosYes(false)
            setRedosNo(true)
        }
    }, [])
    const ChangeRedosNo = useCallback((e) => {
        if (e.target.checked === true) {
            setRedosYes(false)
            setRedosNo(true)
        }
        else {
            setRedosYes(true)
            setRedosNo(false)
        }
    }, [])
    const ChangeIdentfyYes = useCallback((e) => {
        if (e.target.checked === true) {
            setErrorIdentyYes(true)
            setErrorIdentyNo(false)
        }
        else {
            setErrorIdentyYes(false)
            setErrorIdentyNo(true)
        }
    }, [])
    const ChangeIdentfyNo = useCallback((e) => {
        if (e.target.checked === true) {
            setErrorIdentyYes(false)
            setErrorIdentyNo(true)
        }
        else {
            setErrorIdentyYes(false)
            setErrorIdentyNo(true)
        }
    }, [])

    const ChangeFallsYes = useCallback((e) => {
        if (e.target.checked === true) {
            setFallsYes(true)
            setFallsNo(false)
        }
        else {
            setFallsYes(false)
            setFallsNo(true)
        }
    }, [])

    const ChangeFallsNo = useCallback((e) => {
        if (e.target.checked === true) {
            setFallsYes(false)
            setFallsNo(true)
        }
        else {
            setFallsYes(true)
            setFallsNo(false)
        }
    }, [])

    const ChangeNearYes = useCallback((e) => {
        if (e.target.checked === true) {
            setNearYes(true)
            setNearNo(false)
        }
        else {
            setNearYes(false)
            setNearNo(true)
        }
    }, [])
    const ChangeNearNo = useCallback((e) => {
        if (e.target.checked === true) {
            setNearYes(false)
            setNearNo(true)
        }
        else {
            setNearYes(true)
            setNearNo(false)
        }
    }, [])
    const ChangeSentinelYes = useCallback((e) => {
        if (e.target.checked === true) {
            setSentinelYes(true)
            setSentinelNo(false)
        }
        else {
            setSentinelYes(false)
            setSentinelNo(true)
        }
    }, [])
    const ChangeSentinelNo = useCallback((e) => {
        if (e.target.checked === true) {
            setSentinelYes(false)
            setSentinelNo(true)
        }
        else {
            setSentinelYes(true)
            setSentinelNo(false)
        }
    }, [])

    useEffect(() => {
        const hours = differenceInHours(new Date(assessmentTime), new Date(entryTime))
        const minutes = differenceInMinutes(new Date(assessmentTime), new Date(entryTime)) % 60
        const seconds = differenceInSeconds(new Date(assessmentTime), new Date(entryTime)) % 60
        setsumOfAssesment(`${hours} hr ${minutes} min ${seconds} sec`)
        // waiting time
        const totMinutes = hours * 60 + minutes
        setServiceTime(totMinutes)
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

    const patchdata = useMemo(() => {
        return {
            test_req_date: format(new Date(testReqDate), 'yyyy-MM-dd'),
            endo_arrival_time: format(new Date(entryTime), 'yyyy-MM-dd HH:mm:ss'),
            assessment_time: format(new Date(assessmentTime), 'yyyy-MM-dd HH:mm:ss'),
            proc_start_time: format(new Date(startTime), 'yyyy-MM-dd HH:mm:ss'),
            proc_end_time: format(new Date(endTime), 'yyyy-MM-dd HH:mm:ss'),
            report_gene_time: format(new Date(reportTime), 'yyyy-MM-dd HH:mm:ss'),
            report_desp_time: format(new Date(despatchTime), 'yyyy-MM-dd HH:mm:ss'),
            error_corrective: errorCorrect,
            error_preventive: errorPrvnt,
            redos_corrective: redosCoorect,
            redos_preventive: redosPrvnt,
            incidence_ident_action: errorIdentAction,
            qi_save_status: 1,
            edit_user: id,
            sumof_service_time: serviceTime,
            initial_assessment_reason: benchMarkFlag === 1 ? benchMarkReason : '',
            assessment_benchmark_flag: benchMarkFlag,
            qi_slno: qi_slno
        }
    }, [testReqDate, entryTime, assessmentTime, startTime, endTime, reportTime, despatchTime, errorCorrect, errorPrvnt,
        redosCoorect, redosPrvnt, errorIdentAction, id, serviceTime, benchMarkReason, benchMarkFlag, qi_slno])

    const SaveDetails = useCallback(() => {
        if (errorYes === true && errorDetails === '' && errorReason === '') {
            infoNotify('If Yes, Please Report Error As Incident')
        }
        else if (redosYes === true && redosDetails === '' && redosReason === '') {
            infoNotify('If Yes,Please Report Redos As Incident')
        }
        else if (errorIdentyYes === true && identerrorDetails === '' && identerrorReason === '') {
            infoNotify('If Yes,Please Report Patient Identification Error As Incident')
        }
        else if (fallsYes === true && fallsdetails === '' && fallsReason === '') {
            infoNotify('If Yes,Please Report Incidence Of Falls As Incident')
        }
        else if (sentinelYes === true && sentinelDetails === '' && sentinelreason === '') {
            infoNotify('If Yes,Please Report Sentinel Events As Incident')
        }
        else if (nearYes === true && nearMissesDetails === '' && nearMissessReason === '') {
            infoNotify('If Yes,Please Report Near Missess As Incident')
        }
        else if (new Date(patient_arrived_date) > new Date(entryTime)) {
            infoNotify('Please Check The Entry Time')
        }
        else if (new Date(entryTime) > new Date(assessmentTime)) {
            infoNotify('Please Check The Entry/Assessment Time')
        }
        else if (new Date(assessmentTime) > new Date(startTime)) {
            infoNotify('Please Check The assessment Time/Procedure Start Time')
        }
        else if (new Date(startTime) > new Date(endTime)) {
            infoNotify('Please Check The Procedure Start/End Time')
        }
        else if (new Date(endTime) > new Date(reportTime)) {
            infoNotify('Please Check The Procedure End/Report Generated Time')
        }
        else if (new Date(reportTime) > new Date(despatchTime)) {
            infoNotify('Please Check The Report Generated/Despatch Time')
        }
        else {
            const UpdateData = async (patchdata) => {
                const result = await axioslogin.patch('/qiendoscopy/qiupdate', patchdata);
                return result.data
            }
            if (benchMarkFlag === 1) {
                if (benchMarkReason === '' || benchMarkReason === undefined) {
                    infoNotify("Please Enter Reason for Initial Assessment Time Exceedence")
                } else {
                    UpdateData(patchdata).then((value) => {
                        const { message, success } = value
                        if (success === 1) {
                            succesNotify(message)
                            RefreshData()
                            setCount(count + 1)
                            reset()
                        }
                        else {
                        }
                    })
                }
            } else {
                UpdateData(patchdata).then((value) => {
                    const { message, success } = value
                    if (success === 1) {
                        succesNotify(message)
                        RefreshData()
                        setCount(count + 1)
                        reset()
                    }
                    else {
                    }
                })
            }
        }
    }, [patchdata, count, setCount, reset, benchMarkFlag, benchMarkReason, errorYes, errorDetails, errorReason, redosYes,
        redosDetails, redosReason, errorIdentyYes, identerrorDetails, identerrorReason, fallsYes, fallsdetails, fallsReason,
        sentinelYes, sentinelDetails, sentinelreason, nearYes, nearMissesDetails, nearMissessReason, patient_arrived_date,
        entryTime, assessmentTime, startTime, endTime, reportTime, despatchTime, RefreshData
    ])
    const ResetDetails = useCallback(() => {
        reset()
    }, [reset])

    useEffect(() => {
        const incidentData = {
            qi_slno: qi_slno
        }
        const getIncidentDetails = async (incidentData) => {
            const result = await axioslogin.post('/qiendoscopy/getIncident', incidentData)
            const { success, data } = result.data
            if (success === 1) {
                setincidentView(data)
            } else {
                setincidentView([])
            }
        }
        getIncidentDetails(incidentData)
    }, [incCount, qi_slno])
    const ErrorIncidentReg = useCallback(() => {
        const { incident_error_slno } = incidentView[0]
        setIncdExist(incident_error_slno)
        setIncFlag(1)
        setIncRegFlag(1)
        setincCount(incCount + 1)
        setIncModalOpen(true)
    }, [incidentView, incCount])
    const RedosIncidentReg = useCallback(() => {
        const { incident_redos_slno } = incidentView[0]
        setIncdExist(incident_redos_slno)
        setIncFlag(1)
        setIncRegFlag(2)
        setincCount(incCount + 1)
        setIncModalOpen(true)
    }, [incidentView, incCount])
    const IdentErrorIncidentReg = useCallback(() => {
        const { incidence_ident_slno } = incidentView[0]
        setIncdExist(incidence_ident_slno)
        setIncFlag(1)
        setIncRegFlag(3)
        setincCount(incCount + 1)
        setIncModalOpen(true)
    }, [incidentView, incCount])
    const FallsIncidentReg = useCallback(() => {
        const { incident_falls_slno } = incidentView[0]
        setIncdExist(incident_falls_slno)
        setIncFlag(1)
        setIncRegFlag(4)
        setincCount(incCount + 1)
        setIncModalOpen(true)
    }, [incidentView, incCount])
    const SentinelIncidentReg = useCallback(() => {
        const { incident_sentinel_slno } = incidentView[0]
        setIncdExist(incident_sentinel_slno)
        setIncFlag(1)
        setIncRegFlag(5)
        setincCount(incCount + 1)
        setIncModalOpen(true)
    }, [incidentView, incCount])
    const NearMissesIncidentReg = useCallback(() => {
        const { incident_nearmisses_slno } = incidentView[0]
        setIncdExist(incident_nearmisses_slno)
        setIncFlag(1)
        setIncRegFlag(6)
        setincCount(incCount + 1)
        setIncModalOpen(true)
    }, [incidentView, incCount])

    return (
        <Fragment>
            {incFlag === 1 ?
                <IncidentModal open={incmodalopen} setIncModalOpen={setIncModalOpen} depName={depName} qidept={qidept}
                    endoSlno={qi_slno} incCount={incCount} setincCount={setincCount} incdExist={incdExist} incidentView={incidentView}
                    errorDetails={errorDetails} errorReason={errorReason} redosDetails={redosDetails} redosReason={redosReason}
                    identerrorDetails={identerrorDetails} identerrorReason={identerrorReason} fallsdetails={fallsdetails}
                    fallsReason={fallsReason} sentinelDetails={sentinelDetails} sentinelreason={sentinelreason}
                    nearMissesDetails={nearMissesDetails} nearMissessReason={nearMissessReason} incRegFlag={incRegFlag}
                    setIncFlag={setIncFlag} setErrorNo={setErrorNo} setRedosNo={setRedosNo} setErrorIdentyNo={setErrorIdentyNo}
                    setFallsNo={setFallsNo} setNearNo={setNearNo} setSentinelNo={setSentinelNo} setErrorYes={setErrorYes}
                    setRedosYes={setRedosYes} setErrorIdentyYes={setErrorIdentyYes} setFallsYes={setFallsYes} setNearYes={setNearYes}
                    setSentinelYes={setSentinelYes} setIncdExist={setIncdExist} setErrorDetails={setErrorDetails}
                    setErrorReason={setErrorReason} setRedosDetails={setRedosDetails} setRedosReason={setRedosReason}
                    setIdenterrorDetails={setIdenterrorDetails} setIdenterrorReason={setIdenterrorReason} setFallsdetails={setFallsdetails}
                    setFallsReason={setFallsReason} setSentinelDetails={setSentinelDetails} setSentinelreason={setSentinelreason}
                    setNearMissesDetails={setNearMissesDetails} setNearMissessReason={setNearMissessReason} patient_arrived_date={patient_arrived_date}
                /> : null}
            <Dialog
                open={open}
                keepMounted
                aria-describedby="alert-dialog-slide-descriptiona"
                maxWidth='65vw'
                // overflow='hidden'
                sx={{ display: 'flex', justifyContent: 'center' }}
            >
                <DialogContent id="alert-dialog-slide-descriptiona"
                    sx={{
                        minWidth: '65vw',
                        borderRadius: 'md',
                    }}
                >
                    <Paper sx={{ display: 'flex', height: 40, bgcolor: '#b0bec5' }}>
                        <Box sx={{ display: 'flex', flex: 1 }}>
                            <Box sx={{ fontSize: 15, pt: 1, color: 'black', pl: 2 }}>
                                {ptno}
                            </Box>
                            <Box sx={{ fontSize: 15, pt: 1, color: 'black', pl: 2 }}>
                                {ptname.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                            </Box>
                            <Box sx={{ fontSize: 15, pt: 1, color: 'black', pl: 2 }}>
                                {ptage}/{ptsex}
                            </Box>
                            <Box sx={{ fontSize: 15, pt: 1, color: 'black', pl: 2 }}>
                                {ptaddrs1.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}

                                {ptaddrs3 === null ? '' :
                                    ',' + ptaddrs3.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                            </Box>
                            <Box sx={{ fontSize: 15, pt: 1, color: 'black', pl: 2 }}>
                                {ptmobile}
                            </Box>
                            <Box sx={{ fontSize: 15, pt: 1, color: 'black', pl: 5 }}>
                                {"Dr. " + doctor_name.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', fontSize: 20, pt: 0.5, pr: 0.2 }}>
                            <CssVarsProvider>
                                <Tooltip title="Close" placement='bottom' cursor='pointer'>
                                    <HighlightOffIcon sx={{ cursor: 'pointer', height: 34, width: 34, color: '#546e7a' }} onClick={handleClose} />
                                </Tooltip>
                            </CssVarsProvider>
                        </Box>
                    </Paper>
                    <Box sx={{ overflow: 'auto' }}>
                        <Box sx={{ display: 'flex', pt: 1.5 }}>
                            <Box sx={{ flex: 2, pl: 1, pt: 0.6 }}>
                                <Typography sx={{ fontSize: 12, fontWeight: 550, textTransform: 'uppercase' }}>Any Error Reported </Typography>
                            </Box>
                            <Typography>: </Typography>
                            <Box sx={{ flex: 1, display: 'flex', pl: 1 }}>
                                <Box sx={{ pt: 0.3 }}>
                                    <CssVarsProvider>
                                        {error_status === 1 ?
                                            <Tooltip title="Registered as Incident, so can't Change" placement='left'>
                                                <Checkbox
                                                    color="neutral"
                                                    size="md"
                                                    checked={errorYes}
                                                />
                                            </Tooltip>

                                            : <Checkbox
                                                color="primary"
                                                size="md"
                                                checked={errorYes}
                                                onChange={ChangeErrorYes}
                                            />
                                        }
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ pl: 1, pt: 0.1 }}>
                                    <Typography sx={{ fontSize: 16 }}>
                                        Yes
                                    </Typography>
                                </Box>
                                <Box sx={{ pt: 0.3, pl: 2 }}>
                                    <CssVarsProvider>
                                        {error_status === 1 ?
                                            <Checkbox
                                                color="neutral"
                                                size="md"
                                                checked={errorNo}
                                            /> :
                                            <Checkbox
                                                color="primary"
                                                size="md"
                                                checked={errorNo}
                                                onChange={ChangeErrorNo}
                                            />}
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ pl: 1, pt: 0.1 }}>
                                    <Typography sx={{ fontSize: 16 }}>
                                        No
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{ pl: 0.2, bgcolor: '#eceff1' }}>
                            {errorYes === true ?
                                <Box>
                                    {/* <Box sx={{ display: 'flex', pt: 0.5 }}>
                                        <Box sx={{ pl: 1, pt: 0.6 }}>
                                            <Typography sx={{ fontSize: 11 }}>INCIDENT TYPE</Typography>
                                        </Box>
                                        <Box sx={{ pt: 0.6, pl: 2, fontSize: 11 }}>
                                            <Typography>: </Typography>
                                        </Box>
                                        <Box sx={{ pl: 1.5, pt: 0.6 }}>
                                            <Typography sx={{ fontSize: 11, borderRadius: 1 }}>
                                                {errorType}</Typography>
                                        </Box>
                                    </Box> */}
                                    <Box sx={{ py: 0.5, display: 'flex' }}>
                                        <Box sx={{ flex: 1, pl: 0.3 }}>
                                            <Box sx={{ pl: 1, pt: 0.5 }}>
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
                                                        onChange={(e) => setErrorDetails(e.target.value)}
                                                    />
                                                </CssVarsProvider>
                                            </Box>
                                        </Box>
                                        <Box sx={{ flex: 1, pl: 0.3 }}>
                                            <Box sx={{ pl: 1, pt: 0.5 }}>
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
                                                        onChange={(e) => setErrorReason(e.target.value)}
                                                    />
                                                </CssVarsProvider>
                                            </Box>
                                        </Box>

                                        <Box sx={{ flex: 1, pl: 0.3 }}>
                                            <Box sx={{ pl: 1, pt: 0.5 }}>
                                                <Typography sx={{ fontSize: 11, textTransform: 'uppercase' }}>Corrective Action</Typography>
                                            </Box>
                                            <Box>
                                                <CssVarsProvider>
                                                    <Textarea
                                                        minRows={3}
                                                        maxRows={3}
                                                        placeholder='Corrective Action'
                                                        type="text"
                                                        size="sm"
                                                        name="errorCorrect"
                                                        value={errorCorrect}
                                                        onChange={(e) => setErrorCorrect(e.target.value)}
                                                    />
                                                </CssVarsProvider>
                                            </Box>
                                        </Box>
                                        <Box sx={{ flex: 1, pl: 0.3 }}>
                                            <Box sx={{ pl: 1, pt: 0.5 }}>
                                                <Typography sx={{ fontSize: 11, textTransform: 'uppercase' }}>Preventive Action</Typography>
                                            </Box>
                                            <Box>
                                                <CssVarsProvider>
                                                    <Textarea
                                                        minRows={3}
                                                        maxRows={3}
                                                        placeholder='Preventive Action'
                                                        type="text"
                                                        size="sm"
                                                        name="errorPrvnt"
                                                        value={errorPrvnt}
                                                        onChange={(e) => setErrorPrvnt(e.target.value)}
                                                    />
                                                </CssVarsProvider>
                                            </Box>
                                        </Box>
                                        <Box sx={{ px: 0.5, pt: 5 }}>
                                            <CssVarsProvider>
                                                <Tooltip title="Incident Reg:" placement='bottom' cursor='pointer'>
                                                    <AddCircleOutlineIcon
                                                        sx={{ height: 35, width: 35, color: '#970C10' }}
                                                        onClick={ErrorIncidentReg}
                                                    />
                                                </Tooltip>
                                            </CssVarsProvider>
                                        </Box>
                                    </Box>
                                </Box>
                                : null}
                        </Box>
                        <Box sx={{ display: 'flex', pt: 0.5 }}>
                            <Box sx={{ flex: 2, pl: 1, pt: 0.6 }}>
                                <Typography sx={{ fontSize: 12, fontWeight: 550, textTransform: 'uppercase' }}>Test Re dos Done </Typography>
                            </Box>
                            <Typography>: </Typography>
                            <Box sx={{ flex: 1, display: 'flex', pl: 1 }}>
                                <Box sx={{ pt: 0.3 }}>
                                    <CssVarsProvider>
                                        {redo_status === 1 ?
                                            <Tooltip title="Registered as Incident, so can't Change" placement='left'>
                                                <Checkbox
                                                    color="neutral"
                                                    size="md"
                                                    checked={redosYes}
                                                />
                                            </Tooltip>
                                            : <Checkbox
                                                color="primary"
                                                size="md"
                                                checked={redosYes}
                                                onChange={ChangeRedosYes}
                                            />}
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ pl: 1, pt: 0.1 }}>
                                    <Typography sx={{ fontSize: 16 }}>
                                        Yes
                                    </Typography>
                                </Box>
                                <Box sx={{ pt: 0.3, pl: 2 }}>
                                    <CssVarsProvider>
                                        {redo_status === 1 ?
                                            <Checkbox
                                                color="neutral"
                                                size="md"
                                                checked={redosNo}
                                            /> :
                                            <Checkbox
                                                color="primary"
                                                size="md"
                                                checked={redosNo}
                                                onChange={ChangeRedosNo}
                                            />}
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ pl: 1, pt: 0.1 }}>
                                    <Typography sx={{ fontSize: 16 }}>
                                        No
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{ pl: 0.2, bgcolor: '#eceff1' }}>
                            {redosYes === true ?
                                <Box>
                                    {/* <Box sx={{ display: 'flex', pt: 0.5 }}>
                                        <Box sx={{ pl: 1, pt: 0.6 }}>
                                            <Typography sx={{ fontSize: 11 }}>INCIDENT TYPE</Typography>
                                        </Box>
                                        <Box sx={{ pt: 0.6, pl: 2, fontSize: 11 }}>
                                            <Typography>: </Typography>
                                        </Box>
                                        <Box sx={{ pl: 1.5, pt: 0.6 }}>
                                            <Typography sx={{ fontSize: 11, borderRadius: 1 }}>
                                                {redosType}</Typography>
                                        </Box>
                                    </Box> */}
                                    <Box sx={{ py: 0.5, display: 'flex' }}>
                                        <Box sx={{ flex: 1, pl: 0.3 }}>
                                            <Box sx={{ pl: 1, pt: 0.5 }}>
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
                                                        onChange={(e) => setRedosDetails(e.target.value)}
                                                    />
                                                </CssVarsProvider>
                                            </Box>
                                        </Box>
                                        <Box sx={{ flex: 1, pl: 0.3 }}>
                                            <Box sx={{ pl: 1, pt: 0.5 }}>
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
                                                        onChange={(e) => setRedosReason(e.target.value)}
                                                    />
                                                </CssVarsProvider>
                                            </Box>
                                        </Box>
                                        <Box sx={{ flex: 1, pl: 0.3 }}>
                                            <Box sx={{ pl: 1, pt: 0.5 }}>
                                                <Typography sx={{ fontSize: 11, textTransform: 'uppercase' }}>Corrective Action</Typography>
                                            </Box>
                                            <Box sx={{ flex: 1 }}>
                                                <CssVarsProvider>
                                                    <Textarea
                                                        minRows={3}
                                                        maxRows={3}
                                                        placeholder='Corrective Action'
                                                        type="text"
                                                        size="sm"
                                                        name="redosCoorect"
                                                        value={redosCoorect}
                                                        onChange={(e) => setRedosCoorect(e.target.value)}
                                                    />
                                                </CssVarsProvider>
                                            </Box>
                                        </Box>
                                        <Box sx={{ flex: 1, pl: 0.3 }}>
                                            <Box sx={{ pl: 1, pt: 0.5 }}>
                                                <Typography sx={{ fontSize: 11, textTransform: 'uppercase' }}>Preventive Action</Typography>
                                            </Box>
                                            <Box sx={{ flex: 1, pr: 0.5 }}>
                                                <CssVarsProvider>
                                                    <Textarea
                                                        minRows={3}
                                                        maxRows={3}
                                                        placeholder='Preventive Action'
                                                        type="text"
                                                        size="sm"
                                                        name="redosPrvnt"
                                                        value={redosPrvnt}
                                                        onChange={(e) => setRedosPrvnt(e.target.value)}
                                                    />
                                                </CssVarsProvider>
                                            </Box>
                                        </Box>
                                        <Box sx={{ px: 0.5, pt: 5 }}>
                                            <CssVarsProvider>
                                                <Tooltip title="Incident Reg:" placement='bottom' cursor='pointer'>
                                                    <AddCircleOutlineIcon
                                                        sx={{ height: 35, width: 35, color: '#970C10' }}
                                                        onClick={RedosIncidentReg}
                                                    />
                                                </Tooltip>
                                            </CssVarsProvider>
                                        </Box>
                                    </Box>
                                </Box>
                                : null}
                        </Box>
                        <Box sx={{ display: 'flex', pt: 0.5 }}>
                            <Box sx={{ flex: 2, pl: 1, pt: 0.6 }}>
                                <Typography sx={{ fontSize: 12, fontWeight: 550, textTransform: 'uppercase' }}>Incidence of Patient Identification Error</Typography>
                            </Box>
                            <Typography>: </Typography>
                            <Box sx={{ flex: 1, display: 'flex', pl: 1 }}>
                                <Box sx={{ pt: 0.3 }}>
                                    <CssVarsProvider>
                                        {incidence_ident_error_status === 1 ?
                                            <Tooltip title="Registered as Incident, so can't Change" placement='left'>
                                                <Checkbox
                                                    color="neutral"
                                                    size="md"
                                                    checked={errorIdentyYes}
                                                />
                                            </Tooltip> :
                                            <Checkbox
                                                color="primary"
                                                size="md"
                                                checked={errorIdentyYes}
                                                onChange={ChangeIdentfyYes}
                                            />}
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ pl: 1, pt: 0.1 }}>
                                    <Typography sx={{ fontSize: 16 }}>
                                        Yes
                                    </Typography>
                                </Box>
                                <Box sx={{ pt: 0.3, pl: 2 }}>
                                    <CssVarsProvider>
                                        {incidence_ident_error_status === 1 ?
                                            <Checkbox
                                                color="neutral"
                                                size="md"
                                                checked={errorIdentyNo}
                                            /> :
                                            <Checkbox
                                                color="primary"
                                                size="md"
                                                checked={errorIdentyNo}
                                                onChange={ChangeIdentfyNo}
                                            />}
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ pl: 1, pt: 0.1 }}>
                                    <Typography sx={{ fontSize: 16 }}>
                                        No
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{ pl: 0.2, bgcolor: '#eceff1' }}>
                            {errorIdentyYes === true ?
                                <Box>
                                    {/* <Box sx={{ display: 'flex', pt: 0.5 }}>
                                        <Box sx={{ pl: 1, pt: 0.6 }}>
                                            <Typography sx={{ fontSize: 11 }}>INCIDENT TYPE</Typography>
                                        </Box>
                                        <Box sx={{ pt: 0.6, pl: 2, fontSize: 11 }}>
                                            <Typography>: </Typography>
                                        </Box>
                                        <Box sx={{ pl: 1.5, pt: 0.6 }}>
                                            <Typography sx={{ fontSize: 11, borderRadius: 1 }}>
                                                {identType}</Typography>
                                        </Box>
                                    </Box> */}
                                    <Box sx={{ py: 0.5, display: 'flex' }}>
                                        <Box sx={{ flex: 1, pl: 0.3 }}>
                                            <Box sx={{ pl: 1, pt: 0.5 }}>
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
                                                        onChange={(e) => setIdenterrorDetails(e.target.value)}
                                                    />
                                                </CssVarsProvider>
                                            </Box>
                                        </Box>
                                        <Box sx={{ flex: 1, pl: 0.3 }}>
                                            <Box sx={{ pl: 1, pt: 0.5 }}>
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
                                                        onChange={(e) => setIdenterrorReason(e.target.value)}
                                                    />
                                                </CssVarsProvider>
                                            </Box>
                                        </Box>
                                        <Box sx={{ flex: 1, pl: 0.3 }}>
                                            <Box sx={{ pl: 1, pt: 0.5 }}>
                                                <Typography sx={{ fontSize: 11, textTransform: 'uppercase' }}>Action Taken</Typography>
                                            </Box>
                                            <Box sx={{ flex: 1, pr: 0.5 }}>
                                                <CssVarsProvider>
                                                    <Textarea
                                                        minRows={3}
                                                        maxRows={3}
                                                        placeholder='Action Taken'
                                                        type="text"
                                                        size="sm"
                                                        name="errorIdentAction"
                                                        value={errorIdentAction}
                                                        onChange={(e) => setErrorIdentAction(e.target.value)}
                                                    />
                                                </CssVarsProvider>
                                            </Box>
                                        </Box>
                                        <Box sx={{ px: 0.5, pt: 5 }}>
                                            <CssVarsProvider>
                                                <Tooltip title="Incident Reg:" placement='bottom' cursor='pointer'>
                                                    <AddCircleOutlineIcon
                                                        sx={{ height: 35, width: 35, color: '#970C10' }}
                                                        onClick={IdentErrorIncidentReg}
                                                    />
                                                </Tooltip>
                                            </CssVarsProvider>
                                        </Box>
                                    </Box>
                                </Box>
                                : null}
                        </Box>

                        <Box sx={{ display: 'flex', pt: 0.5 }}>
                            <Box sx={{ flex: 2, pl: 1, pt: 0.6 }}>
                                <Typography sx={{ fontSize: 12, fontWeight: 550, textTransform: 'uppercase' }}>Incidence of Falls</Typography>
                            </Box>
                            <Typography>: </Typography>
                            <Box sx={{ flex: 1, display: 'flex', pl: 1 }}>
                                <Box sx={{ pt: 0.3 }}>
                                    <CssVarsProvider>
                                        {falls_status === 1 ?
                                            <Tooltip title="Registered as Incident, so can't Change" placement='left'>
                                                <Checkbox
                                                    color="neutral"
                                                    size="md"
                                                    checked={fallsYes}
                                                />
                                            </Tooltip> :
                                            <Checkbox
                                                color="primary"
                                                size="md"
                                                checked={fallsYes}
                                                onChange={ChangeFallsYes}
                                            />}
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ pl: 1, pt: 0.1 }}>
                                    <Typography sx={{ fontSize: 16 }}>
                                        Yes
                                    </Typography>
                                </Box>
                                <Box sx={{ pt: 0.3, pl: 2 }}>
                                    <CssVarsProvider>
                                        {falls_status === 1 ?
                                            <Checkbox
                                                color="neutral"
                                                size="md"
                                                checked={fallsNo}
                                            /> :
                                            <Checkbox
                                                color="primary"
                                                size="md"
                                                checked={fallsNo}
                                                onChange={ChangeFallsNo}
                                            />}
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ pl: 1, pt: 0.1 }}>
                                    <Typography sx={{ fontSize: 16 }}>
                                        No
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{ pl: 0.2, bgcolor: '#eceff1' }}>
                            {fallsYes === true ?
                                <Box>
                                    {/* <Box sx={{ display: 'flex', pt: 0.5 }}>
                                        <Box sx={{ pl: 1, pt: 0.6 }}>
                                            <Typography sx={{ fontSize: 11 }}>INCIDENT TYPE</Typography>
                                        </Box>
                                        <Box sx={{ pt: 0.6, pl: 2, fontSize: 11 }}>
                                            <Typography>: </Typography>
                                        </Box>
                                        <Box sx={{ pl: 1.5, pt: 0.6 }}>
                                            <Typography sx={{ fontSize: 11, borderRadius: 1 }}>
                                                {fallsType}</Typography>
                                        </Box>
                                    </Box> */}
                                    <Box sx={{ py: 0.5, display: 'flex' }}>
                                        <Box sx={{ flex: 1, pl: 0.3 }}>
                                            <Box sx={{ pl: 1, pt: 0.5 }}>
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
                                                        onChange={(e) => setFallsdetails(e.target.value)}
                                                    />
                                                </CssVarsProvider>
                                            </Box>
                                        </Box>
                                        <Box sx={{ flex: 1, pl: 0.3 }}>
                                            <Box sx={{ pl: 1, pt: 0.5 }}>
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
                                                        onChange={(e) => setFallsReason(e.target.value)}
                                                    />
                                                </CssVarsProvider>
                                            </Box>
                                        </Box>
                                        <Box sx={{ px: 0.5, pt: 5 }}>
                                            <CssVarsProvider>
                                                <Tooltip title="Incident Reg:" placement='bottom' cursor='pointer'>
                                                    <AddCircleOutlineIcon
                                                        sx={{ height: 35, width: 35, color: '#970C10' }}
                                                        onClick={FallsIncidentReg}
                                                    />
                                                </Tooltip>
                                            </CssVarsProvider>
                                        </Box>
                                    </Box>
                                </Box>
                                : null}
                        </Box>
                        <Box sx={{ display: 'flex', pt: 0.5 }}>
                            <Box sx={{ flex: 2, pl: 1, pt: 0.6 }}>
                                <Typography sx={{ fontSize: 12, fontWeight: 550, textTransform: 'uppercase' }}>Sentinel Events Reported </Typography>
                            </Box>
                            <Typography>: </Typography>
                            <Box sx={{ flex: 1, display: 'flex', pl: 1 }}>
                                <Box sx={{ pt: 0.3 }}>
                                    <CssVarsProvider>
                                        {sentinel_events_status === 1 ?
                                            <Tooltip title="Registered as Incident, so can't Change" placement='left'>
                                                <Checkbox
                                                    color="neutral"
                                                    size="md"
                                                    checked={sentinelYes}
                                                />
                                            </Tooltip>
                                            : <Checkbox
                                                color="primary"
                                                size="md"
                                                checked={sentinelYes}
                                                onChange={ChangeSentinelYes}
                                            />}
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ pl: 1, pt: 0.1 }}>
                                    <Typography sx={{ fontSize: 16 }}>
                                        Yes
                                    </Typography>
                                </Box>
                                <Box sx={{ pt: 0.3, pl: 2 }}>
                                    <CssVarsProvider>
                                        {sentinel_events_status === 1 ?
                                            <Checkbox
                                                color="neutral"
                                                size="md"
                                                checked={sentinelNo}
                                            /> :
                                            <Checkbox
                                                color="primary"
                                                size="md"
                                                checked={sentinelNo}
                                                onChange={ChangeSentinelNo}
                                            />}
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ pl: 1, pt: 0.1 }}>
                                    <Typography sx={{ fontSize: 16 }}>
                                        No
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{ pl: 0.2, bgcolor: '#eceff1' }}>
                            {sentinelYes === true ?
                                <Box>
                                    {/* <Box sx={{ display: 'flex', pt: 0.5 }}>
                                        <Box sx={{ pl: 1, pt: 0.6 }}>
                                            <Typography sx={{ fontSize: 11 }}>INCIDENT TYPE</Typography>
                                        </Box>
                                        <Box sx={{ pt: 0.6, pl: 2, fontSize: 11 }}>
                                            <Typography>: </Typography>
                                        </Box>
                                        <Box sx={{ pl: 1.5, pt: 0.6 }}>
                                            <Typography sx={{ fontSize: 11, borderRadius: 1 }}>
                                                {sentinelType}</Typography>
                                        </Box>
                                    </Box> */}

                                    <Box sx={{ py: 0.5, display: 'flex' }}>
                                        <Box sx={{ flex: 1, pl: 0.3 }}>
                                            <Box sx={{ pl: 1, pt: 0.5 }}>
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
                                                        onChange={(e) => setSentinelDetails(e.target.value)}
                                                    />
                                                </CssVarsProvider>
                                            </Box>
                                        </Box>
                                        <Box sx={{ flex: 1, pl: 0.3 }}>
                                            <Box sx={{ pl: 1, pt: 0.5 }}>
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
                                                        onChange={(e) => setSentinelreason(e.target.value)}
                                                    />
                                                </CssVarsProvider>
                                            </Box>
                                        </Box>
                                        <Box sx={{ px: 0.5, pt: 5 }}>
                                            <CssVarsProvider>
                                                <Tooltip title="Incident Reg:" placement='bottom' cursor='pointer'>
                                                    <AddCircleOutlineIcon
                                                        sx={{ height: 35, width: 35, color: '#970C10' }}
                                                        onClick={SentinelIncidentReg}
                                                    />
                                                </Tooltip>
                                            </CssVarsProvider>
                                        </Box>
                                    </Box>
                                </Box>
                                : null}
                        </Box>
                        <Box sx={{ display: 'flex', pt: 0.5 }}>
                            <Box sx={{ flex: 2, pl: 1, pt: 0.6 }}>
                                <Typography sx={{ fontSize: 12, fontWeight: 550, textTransform: 'uppercase' }}>Near Misses Reported</Typography>
                            </Box>
                            <Typography>: </Typography>
                            <Box sx={{ flex: 1, display: 'flex', pl: 1 }}>
                                <Box sx={{ pt: 0.3 }}>
                                    <CssVarsProvider>
                                        {near_misses_status === 1 ?
                                            <Tooltip title="Registered as Incident, so can't Change" placement='left'>
                                                <Checkbox
                                                    color="neutral"
                                                    size="md"
                                                    checked={nearYes}
                                                />
                                            </Tooltip>
                                            : <Checkbox
                                                color="primary"
                                                size="md"
                                                checked={nearYes}
                                                onChange={ChangeNearYes}
                                            />}
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ pl: 1, pt: 0.1 }}>
                                    <Typography sx={{ fontSize: 16 }}>
                                        Yes
                                    </Typography>
                                </Box>
                                <Box sx={{ pt: 0.3, pl: 2 }}>
                                    <CssVarsProvider>
                                        {near_misses_status === 1 ?
                                            <Checkbox
                                                color="neutral"
                                                size="md"
                                                checked={nearNo}
                                            /> :
                                            <Checkbox
                                                color="primary"
                                                size="md"
                                                checked={nearNo}
                                                onChange={ChangeNearNo}
                                            />}
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ pl: 1, pt: 0.1 }}>
                                    <Typography sx={{ fontSize: 16 }}>
                                        No
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{ pl: 0.2, bgcolor: '#eceff1' }}>
                            {nearYes === true ?
                                <Box>
                                    {/* <Box sx={{ display: 'flex', pt: 0.5 }}>
                                        <Box sx={{ pl: 1, pt: 0.6 }}>
                                            <Typography sx={{ fontSize: 11 }}>INCIDENT TYPE</Typography>
                                        </Box>
                                        <Box sx={{ pt: 0.6, pl: 2, fontSize: 11 }}>
                                            <Typography>: </Typography>
                                        </Box>
                                        <Box sx={{ pl: 1.5, pt: 0.6 }}>
                                            <Typography sx={{ fontSize: 11, borderRadius: 1 }}>
                                                {nearType}</Typography>
                                        </Box>
                                    </Box> */}
                                    <Box sx={{ py: 0.5, display: 'flex' }}>
                                        <Box sx={{ flex: 1, pl: 0.3 }}>
                                            <Box sx={{ pl: 1, pt: 0.5 }}>
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
                                                        onChange={(e) => setNearMissesDetails(e.target.value)}
                                                    />
                                                </CssVarsProvider>
                                            </Box>
                                        </Box>
                                        <Box sx={{ flex: 1, px: 0.3 }}>
                                            <Box sx={{ pl: 1, pt: 0.5 }}>
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
                                                        onChange={(e) => setNearMissessReason(e.target.value)}
                                                    />
                                                </CssVarsProvider>
                                            </Box>
                                        </Box>
                                        <Box sx={{ px: 0.5, pt: 5 }}>
                                            <CssVarsProvider>
                                                <Tooltip title="Incident Reg:" placement='bottom' cursor='pointer'>
                                                    <AddCircleOutlineIcon
                                                        sx={{ height: 35, width: 35, color: '#970C10' }}
                                                        onClick={NearMissesIncidentReg}
                                                    />
                                                </Tooltip>
                                            </CssVarsProvider>
                                        </Box>
                                    </Box>
                                </Box>
                                : null}
                        </Box>
                        <Box sx={{ display: 'flex', pt: 0.5 }}>
                            <Box sx={{ flex: 2, pl: 1, pt: 0.6 }}>
                                <Typography sx={{ fontSize: 12, fontWeight: 550, textTransform: 'uppercase' }}>Waiting Time For Services Diagnostics </Typography>
                            </Box>
                            {/* <Typography>: </Typography> */}
                            <Box sx={{ flex: 1, pl: 1 }}></Box>
                        </Box>
                        <Box sx={{ pl: 0.2, px: 1 }}>
                            <Box sx={{ display: 'flex', py: 0.5, m: 0.5, bgcolor: '#eceff1' }}>
                                <Box sx={{ flex: 1 }}>
                                    <Box sx={{ pl: 0.5, py: 0.5 }}>
                                        <Typography sx={{ fontSize: 11, textTransform: 'uppercase' }}>Test Requested Date</Typography>
                                    </Box>
                                    <Box sx={{ pl: 1 }}>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DatePicker
                                                views={['year', 'month', 'day']}
                                                maxDate={new Date()}
                                                value={testReqDate}
                                                inputFormat='dd-MM-yyyy'
                                                size="small"
                                                onChange={(newValue) => {
                                                    setTestReqDate(newValue);
                                                }}
                                                renderInput={({ inputRef, inputProps, InputProps }) => (
                                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                        <CssVarsProvider>
                                                            <Input ref={inputRef} {...inputProps} fullWidth
                                                                sx={{ bgcolor: 'white', height: 40, padding: 'none' }}
                                                                disabled={true} />
                                                        </CssVarsProvider>
                                                        {InputProps?.endAdornment}
                                                    </Box>
                                                )}
                                            />
                                        </LocalizationProvider>
                                    </Box>
                                </Box>
                                <Box sx={{ flex: 1, pl: 0.5 }}>
                                    <Box sx={{ pl: 0.5, py: 0.5 }}>
                                        <Typography sx={{ fontSize: 11, textTransform: 'uppercase' }}>Patient Entered Time in Endoscopy Area</Typography>
                                    </Box>
                                    <Box sx={{ pl: 1 }}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DateTimePicker
                                                views={['year', 'month', 'day', 'hours', 'minutes']}
                                                minDate={new Date(patient_arrived_date)}
                                                maxDate={new Date(patient_arrived_date)}
                                                value={entryTime}
                                                inputFormat='DD-MM-YYYY hh:mm A'
                                                size="small"
                                                onChange={(newValue) => {
                                                    setEntryTime(newValue);
                                                }}
                                                renderInput={({ inputRef, inputProps, InputProps }) => (
                                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                        <CssVarsProvider>
                                                            <Input ref={inputRef} {...inputProps} fullWidth
                                                                sx={{ bgcolor: 'white', height: 40, padding: 'none' }}
                                                                disabled={true} />
                                                        </CssVarsProvider>
                                                        {InputProps?.endAdornment}
                                                    </Box>
                                                )}
                                            />
                                        </LocalizationProvider>
                                    </Box>
                                </Box>
                                <Box sx={{ flex: 1, px: 0.5 }}>
                                    <Box sx={{ pl: 0.5, py: 0.5 }}>
                                        <Typography sx={{ fontSize: 11, textTransform: 'uppercase' }}>Assessment Checklist Done By Nurse</Typography>
                                    </Box>
                                    <Box sx={{ pr: 0.5, pl: 1 }} >
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DateTimePicker
                                                views={['year', 'month', 'day', 'hours', 'minutes']}
                                                value={assessmentTime}
                                                inputFormat='DD-MM-YYYY hh:mm A'
                                                size="small"
                                                minDate={new Date(patient_arrived_date)}
                                                maxDate={new Date(patient_arrived_date)}
                                                onChange={(newValue) => {
                                                    setAssessmentTime(newValue);
                                                }}
                                                renderInput={({ inputRef, inputProps, InputProps }) => (
                                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                        <CssVarsProvider>
                                                            <Input ref={inputRef} {...inputProps} fullWidth
                                                                sx={{ bgcolor: 'white', height: 40, padding: 'none' }}
                                                                disabled={true} />
                                                        </CssVarsProvider>
                                                        {InputProps?.endAdornment}
                                                    </Box>
                                                )}
                                            />
                                        </LocalizationProvider>
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', py: 0.5, m: 0.5, bgcolor: '#eceff1' }}>
                                <Box sx={{ flex: 1 }}>
                                    <Box sx={{ pl: 0.5, py: 0.5 }}>
                                        <Typography sx={{ fontSize: 11, textTransform: 'uppercase' }}>Procedure Starting Time</Typography>
                                    </Box>
                                    <Box sx={{ pl: 1 }}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DateTimePicker
                                                views={['year', 'month', 'day', 'hours', 'minutes']}
                                                value={startTime}
                                                inputFormat='DD-MM-YYYY hh:mm A'
                                                size="small"
                                                minDate={new Date(patient_arrived_date)}
                                                maxDate={new Date(patient_arrived_date)}
                                                onChange={(newValue) => {
                                                    setStartTime(newValue);
                                                }}
                                                renderInput={({ inputRef, inputProps, InputProps }) => (
                                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                        <CssVarsProvider>
                                                            <Input ref={inputRef} {...inputProps} fullWidth
                                                                sx={{ bgcolor: 'white', height: 40, padding: 'none' }}
                                                                disabled={true} />
                                                        </CssVarsProvider>
                                                        {InputProps?.endAdornment}
                                                    </Box>
                                                )}
                                            />
                                        </LocalizationProvider>
                                    </Box>
                                </Box>
                                <Box sx={{ flex: 1, pl: 0.5 }}>
                                    <Box sx={{ pl: 0.5, py: 0.5 }}>
                                        <Typography sx={{ fontSize: 11, textTransform: 'uppercase' }}>Procedure Ending Time</Typography>
                                    </Box>
                                    <Box sx={{ pl: 1 }}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DateTimePicker
                                                views={['year', 'month', 'day', 'hours', 'minutes']}
                                                value={endTime}
                                                inputFormat='DD-MM-YYYY hh:mm A'
                                                size="small"
                                                minDate={new Date(patient_arrived_date)}
                                                maxDate={new Date(patient_arrived_date)}
                                                onChange={(newValue) => {
                                                    setEndTime(newValue);
                                                }}
                                                renderInput={({ inputRef, inputProps, InputProps }) => (
                                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                        <CssVarsProvider>
                                                            <Input ref={inputRef} {...inputProps} fullWidth
                                                                sx={{ bgcolor: 'white', height: 40, padding: 'none' }}
                                                                disabled={true} />
                                                        </CssVarsProvider>
                                                        {InputProps?.endAdornment}
                                                    </Box>
                                                )}
                                            />
                                        </LocalizationProvider>
                                    </Box>
                                </Box>
                                <Box sx={{ flex: 1, pl: 0.5 }}>
                                    <Box sx={{ pl: 0.5, py: 0.5 }}>
                                        <Typography sx={{ fontSize: 11, textTransform: 'uppercase' }}>Report Generating Time</Typography>
                                    </Box>
                                    <Box sx={{ pl: 1 }} >
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DateTimePicker
                                                views={['year', 'month', 'day', 'hours', 'minutes']}
                                                value={reportTime}
                                                inputFormat='DD-MM-YYYY hh:mm A'
                                                size="small"
                                                minDate={new Date(patient_arrived_date)}
                                                maxDate={new Date(patient_arrived_date)}
                                                onChange={(newValue) => {
                                                    setReportTime(newValue);
                                                }}
                                                renderInput={({ inputRef, inputProps, InputProps }) => (
                                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                        <CssVarsProvider>
                                                            <Input ref={inputRef} {...inputProps} fullWidth
                                                                sx={{ bgcolor: 'white', height: 40, padding: 'none' }}
                                                                disabled={true} />
                                                        </CssVarsProvider>
                                                        {InputProps?.endAdornment}
                                                    </Box>
                                                )}
                                            />
                                        </LocalizationProvider>
                                    </Box>
                                </Box>
                                <Box sx={{ flex: 1, px: 0.5 }}>
                                    <Box sx={{ pl: 0.5, py: 0.5 }}>
                                        <Typography sx={{ fontSize: 11, textTransform: 'uppercase' }}>Report Despatching Time</Typography>
                                    </Box>
                                    <Box sx={{ pl: 1, pr: 0.5 }} >
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DateTimePicker
                                                views={['year', 'month', 'day', 'hours', 'minutes']}
                                                value={despatchTime}
                                                inputFormat='DD-MM-YYYY hh:mm A'
                                                size="small"
                                                minDate={new Date(patient_arrived_date)}
                                                maxDate={new Date()}
                                                onChange={(newValue) => {
                                                    setDespatchTime(newValue);
                                                }}
                                                renderInput={({ inputRef, inputProps, InputProps }) => (
                                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                        <CssVarsProvider>
                                                            <Input ref={inputRef} {...inputProps} fullWidth
                                                                sx={{ bgcolor: 'white', height: 40, padding: 'none' }}
                                                                disabled={true} />
                                                        </CssVarsProvider>
                                                        {InputProps?.endAdornment}
                                                    </Box>
                                                )}
                                            />
                                        </LocalizationProvider>
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', py: 0.5, m: 0.5, bgcolor: '#eceff1' }}>
                                <Box sx={{ flex: 1 }}>
                                    <Box sx={{ pl: 0.5, py: 0.5 }}>
                                        <Typography sx={{ fontSize: 11, textTransform: 'uppercase' }}>Sum of Time Taken For Assessment</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'center', pt: 0.1, pl: 1 }}>
                                        {benchMarkFlag === 1 ?
                                            <Box sx={{
                                                flex: 1, bgcolor: 'white', color: 'red', height: 40, pt: 1, mr: 0.6,
                                                border: '1px solid lightgrey', pl: 2, borderRadius: 2
                                            }}>
                                                {sumOfAssesment}
                                            </Box>
                                            : <Box sx={{
                                                flex: 1, bgcolor: 'white', height: 40, pt: 1, mr: 0.6, border: '1px solid lightgrey',
                                                pl: 2, borderRadius: 2
                                            }}>
                                                {sumOfAssesment}
                                            </Box>}
                                    </Box>
                                    <Box sx={{ pt: 0.5 }}>
                                        {benchMarkFlag === 1 ?
                                            <Typography sx={{ color: 'red', fontSize: 11, pl: 2 }}>*Initial Assessment BenchMark Time is 10 min</Typography>
                                            : null}
                                    </Box>
                                </Box>
                                <>
                                    {benchMarkFlag === 1 ?
                                        <Box sx={{ flex: 1 }}>
                                            <Box sx={{ pl: 0.5, py: 0.5 }}>
                                                <Typography sx={{ fontSize: 11, textTransform: 'uppercase' }}>Reason for Assessment Time Exceedence </Typography>
                                            </Box>
                                            <Box sx={{ pt: 0.1, px: 0.7 }}>
                                                <CssVarsProvider>
                                                    <Textarea
                                                        sx={{ height: 40 }}
                                                        minRows={2}
                                                        maxRows={2}
                                                        placeholder='type here....'
                                                        type="text"
                                                        size="sm"
                                                        name="benchMarkReason"
                                                        value={benchMarkReason}
                                                        onChange={(e) => setBenchMarkReason(e.target.value)}
                                                    />
                                                </CssVarsProvider>
                                            </Box>
                                        </Box> : null
                                    }
                                </>
                                <Box sx={{ flex: 1 }}>
                                    <Box sx={{ py: 0.5, pl: 0.2 }}>
                                        <Typography sx={{ fontSize: 11, textTransform: 'uppercase' }}>Total Time Gap</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'center', pt: 0.1, pl: 1 }}>
                                        <Box sx={{
                                            flex: 1, bgcolor: 'white', height: 41, pt: 1, mr: 0.6, border: '1px solid lightgrey',
                                            pl: 2, borderRadius: 2
                                        }}>
                                            {timeGap}
                                        </Box>
                                    </Box>
                                </Box>
                                <Box sx={{ flex: 1 }}>
                                    <Box sx={{ py: 0.5, pl: 0.2 }}>
                                        <Typography sx={{ fontSize: 11, textTransform: 'uppercase' }}>Turnaround Time</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'center', pt: 0.1, pl: 1 }}>
                                        <Box sx={{
                                            flex: 1, bgcolor: 'white', height: 41, pt: 1, mr: 0.6, border: '1px solid lightgrey',
                                            pl: 2, borderRadius: 2
                                        }}>
                                            {turnaroundTime}
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>

                        </Box>
                    </Box>
                    <Paper variant='outlined' square sx={{ display: 'flex', justifyContent: 'flex-end', bgcolor: '#b0bec5', height: 45 }}>
                        <Box sx={{ pt: 0.5, pr: 0.1 }}>
                            <CssVarsProvider>
                                <Button variant='plain' sx={{
                                    color: 'white', width: 100, height: 30, bgcolor: '#546e7a', borderRadius: 0,
                                    border: '1px solid white',
                                    ":hover": {
                                        bgcolor: '#78909c',
                                        boxShadow: 2,
                                        color: 'white',
                                    }
                                }}
                                    onClick={SaveDetails}
                                >
                                    UPDATE
                                </Button>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ pr: 1, pt: 0.5 }}>
                            <CssVarsProvider>
                                <Button variant='plain' sx={{
                                    color: 'white', width: 100, height: 30, bgcolor: '#546e7a', borderRadius: 0,
                                    border: '1px solid white',
                                    ":hover": {
                                        bgcolor: '#78909c',
                                        boxShadow: 2,
                                        color: 'white',
                                    }
                                }}
                                    onClick={ResetDetails}
                                >
                                    RESET
                                </Button>
                            </CssVarsProvider>
                        </Box>
                    </Paper>
                </DialogContent>
            </Dialog >
        </Fragment >
    )
}

export default memo(EndoscopyModalForQI)
