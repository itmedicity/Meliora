import { Box, Button, CssVarsProvider, Modal, ModalDialog, Textarea, Typography } from '@mui/joy'
import { Paper } from '@mui/material'
import React, { Fragment, memo, useCallback, useEffect, useMemo, useState } from 'react'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Checkbox from '@mui/joy/Checkbox';
import moment from 'moment';
import TextFieldCustom from 'src/views/Components/TextFieldCustom';
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode';
import { useSelector } from 'react-redux';
import { axioslogin } from 'src/views/Axios/Axios';
import { format } from 'date-fns';

const ModalQiEndoscopy = ({ open, handleClose, rowSelect, count, setCount }) => {

    const { qi_endo_slno, endo_ptno, endo_ptname, endo_ptsex, endo_ptage, doctor_name, test_req_date, endo_arrival_time,
        assessment_time, proc_start_time, proc_end_time, report_gene_time, report_desp_time, error_status, error_details,
        error_resaon, error_corrective, error_preventive, redo_status, redos_reason, redos_corrective, redos_preventive,
        incidense_error_status, incidense_description, incidense_action, falls_status, near_misses_status, sentinel_events_status } = rowSelect

    const [errorYes, setErrorYes] = useState(error_status === 1 ? true : false)
    const [errorNo, setErrorNo] = useState(error_status === 0 ? true : false)
    const [redosYes, setRedosYes] = useState(redo_status === 1 ? true : false)
    const [redosNo, setRedosNo] = useState(redo_status === 0 ? true : false)
    const [errorIdentyYes, setErrorIdentyYes] = useState(incidense_error_status === 1 ? true : false)
    const [errorIdentyNo, setErrorIdentyNo] = useState(incidense_error_status === 0 ? true : false)
    const [fallsYes, setFallsYes] = useState(falls_status === 1 ? true : false)
    const [fallsNo, setFallsNo] = useState(falls_status === 0 ? true : false)
    const [nearYes, setNearYes] = useState(near_misses_status === 1 ? true : false)
    const [nearNo, setNearNo] = useState(near_misses_status === 0 ? true : false)
    const [sentinelYes, setSentinelYes] = useState(sentinel_events_status === 1 ? true : false)
    const [sentinelNo, setSentinelNo] = useState(sentinel_events_status === 0 ? true : false)
    const [testReqDate, setTestReqDate] = useState(test_req_date === null ? format(new Date(), "yyyy-MM-dd") : test_req_date)
    const [entryTime, setEntryTime] = useState(endo_arrival_time === null ? format(new Date(), 'yyyy-MM-dd HH:mm:ss') : endo_arrival_time)
    const [assessmentTime, setAssessmentTime] = useState(assessment_time === null ? format(new Date(), 'yyyy-MM-dd HH:mm:ss') : assessment_time)
    const [startTime, setStartTime] = useState(proc_start_time === null ? format(new Date(), 'yyyy-MM-dd HH:mm:ss') : proc_start_time)
    const [endTime, setEndTime] = useState(proc_end_time === null ? format(new Date(), 'yyyy-MM-dd HH:mm:ss') : proc_end_time)
    const [sumOfAssesment, setsumOfAssesment] = useState('')
    const [reportTime, setReportTime] = useState(report_gene_time === null ? format(new Date(), 'yyyy-MM-dd HH:mm:ss') : report_gene_time)
    const [despatchTime, setDespatchTime] = useState(report_desp_time === null ? format(new Date(), 'yyyy-MM-dd HH:mm:ss') : report_desp_time)
    const [timeGap, setTimeGap] = useState('')

    // const [testReqDate, setTestReqDate] = useState(new Date());
    // const [entryTime, setEntryTime] = useState(new Date());


    const [qualityIndicators, setQualityIndicators] = useState({
        errorDetails: error_details === null ? '' : error_details,
        errorReason: error_resaon === null ? '' : error_resaon,
        errorCorrect: error_corrective === null ? '' : error_corrective,
        errorPrvnt: error_preventive === null ? '' : error_preventive,
        redosReason: redos_reason === null ? '' : redos_reason,
        redosCoorect: redos_corrective === null ? '' : redos_corrective,
        redosPrvnt: redos_preventive === null ? '' : redos_preventive,
        errorDescrption: incidense_description === null ? '' : incidense_description,
        errorIdentAction: incidense_action === null ? '' : incidense_action
    })
    const { errorDetails, errorReason, errorCorrect, errorPrvnt, redosReason, redosCoorect, redosPrvnt, errorDescrption,
        errorIdentAction
    } = qualityIndicators
    const UpdateIndicators = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        setQualityIndicators({ ...qualityIndicators, [e.target.name]: value })
    }, [qualityIndicators])

    const id = useSelector((state) => {
        return state?.LoginUserData.empid
    })
    const reset = useCallback(() => {
        const formreset = {
            errorDetails: '', errorReason: '', errorCorrect: '', errorPrvnt: '', redosReason: '', redosCoorect: '',
            redosPrvnt: '', errorDescrption: '', errorIdentAction: ''
        }
        setQualityIndicators(formreset);
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
        setTestReqDate(moment(new Date()).format('YYYY-MM-DD'))
        setEntryTime(moment(new Date()).format('YYYY-MM-DD HH:mm:ss'))
        setAssessmentTime(moment(new Date()).format('YYYY-MM-DD HH:mm:ss'))
        setStartTime(moment(new Date()).format('YYYY-MM-DD HH:mm:ss'))
        setEndTime(moment(new Date()).format('YYYY-MM-DD HH:mm:ss'))
        setsumOfAssesment('')
        setReportTime(moment(new Date()).format('YYYY-MM-DD HH:mm:ss'))
        setDespatchTime(moment(new Date()).format('YYYY-MM-DD HH:mm:ss'))
        setTimeGap('')
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
            const formreset = {
                errorDetails: '',
                errorReason: '',
                errorCorrect: '',
                errorPrvnt: ''
            }
            setQualityIndicators(formreset);
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
            const formreset = {
                redosReason: '',
                redosCoorect: '',
                redosPrvnt: ''
            }
            setQualityIndicators(formreset);
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
            setErrorIdentyYes(true)
            setErrorIdentyNo(false)
            const formreset = {
                errorDescrption: '',
                errorIdentAction: ''
            }
            setQualityIndicators(formreset);
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

    const ChangeReqDate = useCallback((e) => {
        setTestReqDate(e.target.value)
    }, [])
    const ChangeEntryTime = useCallback((e) => {

        const start = new Date(e.target.value)
        const end = new Date(assessmentTime)

        if (end < start) {
            infoNotify("Patient Leaving Time in Endoscopy Area must be Lessthan Assessment Time ");
            return;
        } else {
            setEntryTime(e.target.value)
        }
    }, [assessmentTime])

    const ChangeAssesmentTime = useCallback((e) => {
        const start = new Date(entryTime)
        const end = new Date(e.target.value)
        if (end < start) {

            infoNotify("Assessment Time must be Greater than Patient Leaving Time in Endoscopy Area");
            return;
        } else {
            setAssessmentTime(e.target.value)
        }
    }, [entryTime])
    useEffect(() => {
        // const hours = differenceInHours(assessmentTime, entryTime)
        // const minutes = differenceInMinutes(assessmentTime, entryTime) % 60
        // const seconds = differenceInSeconds(assessmentTime, entryTime) % 60
        // setsumOfAssesment(`${hours} hr ${minutes} min ${seconds} sec`)
        const calculatedifference = () => {
            if (assessmentTime && entryTime) {
                const start = new Date(entryTime)
                const end = new Date(assessmentTime)
                const diff = Math.abs(end - start)
                const hours = Math.floor(diff / (1000 * 60 * 60));
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((diff % (1000 * 60)) / 1000);
                setsumOfAssesment(`${hours} hr ${minutes} min ${seconds} sec`)
            }
        }
        calculatedifference();
    }, [assessmentTime, entryTime])

    const ChangeStartime = useCallback((e) => {
        setStartTime(e.target.value)
    }, [])
    const ChangeEndTime = useCallback((e) => {
        setEndTime(e.target.value)
    }, [])
    const ReportChange = useCallback((e) => {
        setReportTime(e.target.value)
    }, [])
    const DespatchChange = useCallback((e) => {
        setDespatchTime(e.target.value)
    }, [])
    useEffect(() => {

        // const hours = differenceInHours(despatchTime, entryTime)
        // const minutes = differenceInMinutes(despatchTime, entryTime) % 60
        // const seconds = differenceInSeconds(despatchTime, entryTime) % 60
        // setTimeGap(`${hours} hr ${minutes} min ${seconds} sec`)
        const calculatedifference = () => {
            if (despatchTime && entryTime) {
                const start = new Date(entryTime)
                const end = new Date(despatchTime)
                const diff = Math.abs(end - start)
                const hours = Math.floor(diff / (1000 * 60 * 60));
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((diff % (1000 * 60)) / 1000);
                setTimeGap(`${hours} hr ${minutes} min ${seconds} sec`)
            }
        }
        calculatedifference();
    }, [despatchTime, entryTime])

    const patchdata = useMemo(() => {
        return {
            test_req_date: moment(new Date(testReqDate)).format('YYYY-MM-DD'),
            endo_arrival_time: moment(new Date(entryTime)).format('YYYY-MM-DD HH:mm:ss'),
            assessment_time: moment(new Date(assessmentTime)).format('YYYY-MM-DD HH:mm:ss'),
            proc_start_time: moment(new Date(startTime)).format('YYYY-MM-DD HH:mm:ss'),
            proc_end_time: moment(new Date(endTime)).format('YYYY-MM-DD HH:mm:ss'),
            report_gene_time: moment(new Date(reportTime)).format('YYYY-MM-DD HH:mm:ss'),
            report_desp_time: moment(new Date(despatchTime)).format('YYYY-MM-DD HH:mm:ss'),
            error_status: errorYes === true ? 1 : errorNo === false ? 0 : 0,
            error_details: errorDetails,
            error_resaon: errorReason,
            error_corrective: errorCorrect,
            error_preventive: errorPrvnt,
            redo_status: redosYes === true ? 1 : redosNo === false ? 0 : 0,
            redos_reason: redosReason,
            redos_corrective: redosCoorect,
            redos_preventive: redosPrvnt,
            incidense_error_status: errorIdentyYes === true ? 1 : errorIdentyNo === false ? 0 : 0,
            incidense_description: errorDescrption,
            incidense_action: errorIdentAction,
            falls_status: fallsYes === true ? 1 : fallsNo === false ? 0 : 0,
            near_misses_status: nearYes === true ? 1 : nearNo === false ? 0 : 0,
            sentinel_events_status: sentinelYes === true ? 1 : sentinelNo === false ? 0 : 0,
            qi_status: 1,
            edit_user: id,
            qi_endo_slno: qi_endo_slno

        }
    }, [testReqDate, entryTime, assessmentTime, startTime, endTime, reportTime, despatchTime, errorYes, errorNo, errorDetails,
        errorReason, errorCorrect, errorPrvnt, redosYes, redosNo, redosReason, redosCoorect, redosPrvnt, errorIdentyYes, errorIdentyNo,
        errorDescrption, errorIdentAction, fallsYes, fallsNo, nearYes, nearNo, sentinelYes, sentinelNo, id, qi_endo_slno])

    const SaveDetails = useCallback(() => {
        const UpdateData = async (patchdata) => {
            const result = await axioslogin.patch('/qiendoscopy/qiupdate', patchdata);
            const { message, success } = result.data;
            if (success === 1) {
                succesNotify(message)
                setCount(count + 1)
                reset()
            }
            else {
                // infoNotify(message)
            }
        }
        UpdateData(patchdata)

    }, [patchdata, count, setCount, reset])

    const ResetDetails = useCallback(() => {
        reset()
    }, [reset])

    return (
        <Fragment>
            <CssVarsProvider>
                <Modal
                    aria-labelledby="modal-title"
                    aria-describedby="modal-desc"
                    open={open}
                    sx={{ display: 'flex', justifyContent: 'center' }}>
                    <ModalDialog variant="none"
                        sx={{
                            width: '65vw',
                            borderRadius: 'md',
                        }}
                    >
                        <Paper variant='outlined' square sx={{ display: 'flex', height: 45, bgcolor: '#90a4ae' }}>
                            <Box sx={{ fontSize: 17, pt: 1, pl: 3, color: 'White' }}>
                                {endo_ptno}
                            </Box>
                            <Box sx={{ fontSize: 17, pt: 1, pl: 3, color: 'White' }}>
                                {endo_ptname.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                            </Box>
                            <Box sx={{ fontSize: 17, pt: 1, pl: 2, color: 'White' }}>
                                {endo_ptage}/{endo_ptsex}
                            </Box>
                            <Box sx={{ fontSize: 17, pt: 1, pl: 5, color: 'White' }}>
                                {"Dr. " + doctor_name.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                            </Box>
                            <Box sx={{ display: 'flex', flex: 1, justifyContent: 'flex-end', fontSize: 20, pt: 0.5, pr: 0.2 }}>
                                <HighlightOffIcon sx={{ cursor: 'pointer', height: 38, width: 38, color: 'White', opacity: 0.8 }} onClick={handleClose} />
                            </Box>
                        </Paper>
                        <Box sx={{ overflow: 'auto' }}>
                            <Box sx={{ display: 'flex', pt: 1 }}>
                                <Box sx={{ flex: 2, pl: 1 }}>
                                    <Typography sx={{ fontSize: 18, fontWeight: 600 }}>Any Error Reported </Typography>
                                </Box>
                                <Typography>: </Typography>
                                <Box sx={{ flex: 1, display: 'flex', pl: 1 }}>
                                    <Box sx={{ pt: 0.6 }}>
                                        <CssVarsProvider>
                                            <Checkbox
                                                color="primary"
                                                size="md"
                                                checked={errorYes}
                                                onChange={ChangeErrorYes}
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
                                                color="primary"
                                                size="md"
                                                checked={errorNo}
                                                onChange={ChangeErrorNo}
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
                            <Box sx={{ pl: 0.2, bgcolor: '#cfd8dc' }}>
                                {errorYes === true ?
                                    <Box sx={{ py: 0.5, display: 'flex' }}>
                                        <Box sx={{ flex: 1, pl: 0.3 }}>
                                            <Box sx={{ pl: 1 }}>
                                                <Typography>Details Of Error</Typography>
                                            </Box>
                                            <Box >
                                                <CssVarsProvider>
                                                    <Textarea
                                                        style={{ minHeight: 50 }}
                                                        placeholder='Details Of Error'
                                                        required
                                                        type="text"
                                                        size="sm"
                                                        name="errorDetails"
                                                        value={errorDetails}
                                                        onChange={UpdateIndicators}
                                                    />
                                                </CssVarsProvider>
                                            </Box>
                                        </Box>
                                        <Box sx={{ flex: 1, pl: 0.3 }}>
                                            <Box sx={{ pl: 1 }}>
                                                <Typography>Reason Of Error</Typography>
                                            </Box>
                                            <Box>
                                                <CssVarsProvider>
                                                    <Textarea
                                                        style={{ minHeight: 50 }}
                                                        placeholder='Reason Of Error'
                                                        type="text"
                                                        size="sm"
                                                        name="errorReason"
                                                        value={errorReason}
                                                        onChange={UpdateIndicators}
                                                    />
                                                </CssVarsProvider>
                                            </Box>
                                        </Box>
                                        <Box sx={{ flex: 1, pl: 0.3 }}>
                                            <Box sx={{ pl: 1 }}>
                                                <Typography>Corrective Action</Typography>
                                            </Box>
                                            <Box>
                                                <CssVarsProvider>
                                                    <Textarea
                                                        style={{ minHeight: 50 }}
                                                        placeholder='Corrective Action'
                                                        type="text"
                                                        size="sm"
                                                        name="errorCorrect"
                                                        value={errorCorrect}
                                                        onChange={UpdateIndicators}
                                                    />
                                                </CssVarsProvider>
                                            </Box>
                                        </Box>
                                        <Box sx={{ flex: 1, px: 0.3 }}>
                                            <Box sx={{ pl: 1 }}>
                                                <Typography>Preventive Action</Typography>
                                            </Box>
                                            <Box>
                                                <CssVarsProvider>
                                                    <Textarea
                                                        style={{ minHeight: 50 }}
                                                        placeholder='Preventive Action'
                                                        type="text"
                                                        size="sm"
                                                        name="errorPrvnt"
                                                        value={errorPrvnt}
                                                        onChange={UpdateIndicators}
                                                    />
                                                </CssVarsProvider>
                                            </Box>
                                        </Box>
                                    </Box>
                                    : null}
                            </Box>
                            <Box sx={{ display: 'flex', pt: 1 }}>
                                <Box sx={{ flex: 2, pl: 1 }}>
                                    <Typography sx={{ fontSize: 18, fontWeight: 600 }}>Test Re dos Done </Typography>
                                </Box>
                                <Typography>: </Typography>
                                <Box sx={{ flex: 1, display: 'flex', pl: 1 }}>
                                    <Box sx={{ pt: 0.6 }}>
                                        <CssVarsProvider>
                                            <Checkbox
                                                color="primary"
                                                size="md"
                                                checked={redosYes}
                                                onChange={ChangeRedosYes}
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
                                                color="primary"
                                                size="md"
                                                checked={redosNo}
                                                onChange={ChangeRedosNo}
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
                            <Box sx={{ pl: 0.2, bgcolor: '#cfd8dc' }}>
                                {redosYes === true ?
                                    <Box sx={{ py: 0.5, display: 'flex' }}>
                                        <Box sx={{ flex: 1, pl: 0.3 }}>
                                            <Box sx={{ pl: 1 }}>
                                                <Typography>Reason For Re dos</Typography>
                                            </Box>
                                            <Box>
                                                <CssVarsProvider>
                                                    <Textarea
                                                        style={{ minHeight: 50 }}
                                                        placeholder='Reason For Re dos'
                                                        type="text"
                                                        size="sm"
                                                        name="redosReason"
                                                        value={redosReason}
                                                        onChange={UpdateIndicators}
                                                    />
                                                </CssVarsProvider>
                                            </Box>
                                        </Box>
                                        <Box sx={{ flex: 1, pl: 0.3 }}>
                                            <Box sx={{ pl: 1 }}>
                                                <Typography>Corrective Action</Typography>
                                            </Box>
                                            <Box sx={{ flex: 1 }}>
                                                <CssVarsProvider>
                                                    <Textarea
                                                        style={{ minHeight: 50 }}
                                                        placeholder='Corrective Action'
                                                        type="text"
                                                        size="sm"
                                                        name="redosCoorect"
                                                        value={redosCoorect}
                                                        onChange={UpdateIndicators}
                                                    />
                                                </CssVarsProvider>
                                            </Box>
                                        </Box>
                                        <Box sx={{ flex: 1, px: 0.3 }}>
                                            <Box sx={{ pl: 1 }}>
                                                <Typography>Preventive Action</Typography>
                                            </Box>
                                            <Box sx={{ flex: 1 }}>
                                                <CssVarsProvider>
                                                    <Textarea
                                                        style={{ minHeight: 50 }}
                                                        placeholder='Preventive Action'
                                                        type="text"
                                                        size="sm"
                                                        name="redosPrvnt"
                                                        value={redosPrvnt}
                                                        onChange={UpdateIndicators}
                                                    />
                                                </CssVarsProvider>
                                            </Box>
                                        </Box>
                                    </Box>
                                    : null}
                            </Box>
                            <Box sx={{ display: 'flex', pt: 1 }}>
                                <Box sx={{ flex: 2, pl: 1 }}>
                                    <Typography sx={{ fontSize: 18, fontWeight: 600 }}>Incidence of Patient Identification Error</Typography>
                                </Box>
                                <Typography>: </Typography>
                                <Box sx={{ flex: 1, display: 'flex', pl: 1 }}>
                                    <Box sx={{ pt: 0.6 }}>
                                        <CssVarsProvider>
                                            <Checkbox
                                                color="primary"
                                                size="md"
                                                checked={errorIdentyYes}
                                                onChange={ChangeIdentfyYes}
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
                                                color="primary"
                                                size="md"
                                                checked={errorIdentyNo}
                                                onChange={ChangeIdentfyNo}
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
                            <Box sx={{ pl: 0.2, bgcolor: '#cfd8dc' }}>
                                {errorIdentyYes === true ?
                                    <Box sx={{ py: 0.5, display: 'flex' }}>
                                        <Box sx={{ flex: 1, pl: 0.3 }}>
                                            <Box sx={{ pl: 1 }}>
                                                <Typography>Error Description</Typography>
                                            </Box>
                                            <Box >
                                                <CssVarsProvider>
                                                    <Textarea
                                                        style={{ minHeight: 50 }}
                                                        placeholder='Error Description'
                                                        type="text"
                                                        size="sm"
                                                        name="errorDescrption"
                                                        value={errorDescrption}
                                                        onChange={UpdateIndicators}
                                                    />
                                                </CssVarsProvider>
                                            </Box>
                                        </Box>
                                        <Box sx={{ flex: 1, pl: 0.3 }}>
                                            <Box sx={{ pl: 1 }}>
                                                <Typography>Action Taken</Typography>
                                            </Box>
                                            <Box sx={{ flex: 1 }}>
                                                <CssVarsProvider>
                                                    <Textarea
                                                        style={{ minHeight: 50 }}
                                                        placeholder='Action Taken'
                                                        type="text"
                                                        size="sm"
                                                        name="errorIdentAction"
                                                        value={errorIdentAction}
                                                        onChange={UpdateIndicators}
                                                    />
                                                </CssVarsProvider>
                                            </Box>
                                        </Box>
                                    </Box>
                                    : null}
                            </Box>

                            <Box sx={{ display: 'flex', pt: 1 }}>
                                <Box sx={{ flex: 2, pl: 1 }}>
                                    <Typography sx={{ fontSize: 18, fontWeight: 600 }}>Incidence of Falls</Typography>
                                </Box>
                                <Typography>: </Typography>
                                <Box sx={{ flex: 1, display: 'flex', pl: 1 }}>
                                    <Box sx={{ pt: 0.6 }}>
                                        <CssVarsProvider>
                                            <Checkbox
                                                color="primary"
                                                size="md"
                                                checked={fallsYes}
                                                onChange={ChangeFallsYes}
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
                                                color="primary"
                                                size="md"
                                                checked={fallsNo}
                                                onChange={ChangeFallsNo}
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
                            <Box sx={{ display: 'flex', pt: 1 }}>
                                <Box sx={{ flex: 2, pl: 1 }}>
                                    <Typography sx={{ fontSize: 18, fontWeight: 600 }}>Near Misses Reported</Typography>
                                </Box>
                                <Typography>: </Typography>
                                <Box sx={{ flex: 1, display: 'flex', pl: 1 }}>
                                    <Box sx={{ pt: 0.6 }}>
                                        <CssVarsProvider>
                                            <Checkbox
                                                color="primary"
                                                size="md"
                                                checked={nearYes}
                                                onChange={ChangeNearYes}
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
                                                color="primary"
                                                size="md"
                                                checked={nearNo}
                                                onChange={ChangeNearNo}
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
                            <Box sx={{ display: 'flex', pt: 1 }}>
                                <Box sx={{ flex: 2, pl: 1 }}>
                                    <Typography sx={{ fontSize: 18, fontWeight: 600 }}>Sentinel Events Reported </Typography>
                                </Box>
                                <Typography>: </Typography>
                                <Box sx={{ flex: 1, display: 'flex', pl: 1 }}>
                                    <Box sx={{ pt: 0.6 }}>
                                        <CssVarsProvider>
                                            <Checkbox
                                                color="primary"
                                                size="md"
                                                checked={sentinelYes}
                                                onChange={ChangeSentinelYes}
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
                                                color="primary"
                                                size="md"
                                                checked={sentinelNo}
                                                onChange={ChangeSentinelNo}
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
                            <Box sx={{ display: 'flex', pt: 1 }}>
                                <Box sx={{ flex: 2, pl: 1 }}>
                                    <Typography sx={{ fontSize: 18, fontWeight: 600 }}>Waiting Time For Services Diagnostics </Typography>
                                </Box>
                                <Typography>: </Typography>
                                <Box sx={{ flex: 1, pl: 1 }}></Box>
                            </Box>
                            <Box sx={{ pl: 0.2, bgcolor: '#cfd8dc' }}>
                                <Box sx={{ display: 'flex', py: 0.5, mx: 0.5 }}>
                                    <Box sx={{ flex: 1 }}>
                                        <Box sx={{ pl: 1 }}>
                                            <Typography>Test Requested Date</Typography>
                                        </Box>
                                        <Box >
                                            {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <DatePicker
                                                    value={testReqDate}
                                                    size="small"
                                                    onChange={(newValue) => {
                                                        setTestReqDate(newValue);
                                                    }}
                                                    renderInput={({ inputRef, inputProps, InputProps }) => (
                                                        <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                                            <CssVarsProvider>
                                                                <Input ref={inputRef} {...inputProps} style={{ px: 2, width: '90%' }} />
                                                            </CssVarsProvider>
                                                            {InputProps?.endAdornment}
                                                        </Box>
                                                    )}

                                                />
                                            </LocalizationProvider> */}

                                            <TextFieldCustom
                                                style={{ height: 40, borderRadius: 0, }}
                                                slotProps={{
                                                    input: {
                                                        max: moment(new Date()).format('YYYY-MM-DD')
                                                    }
                                                }}
                                                size="md"
                                                type="date"
                                                name="testReqDate"
                                                value={testReqDate}
                                                onchange={ChangeReqDate}
                                            />
                                        </Box>
                                    </Box>
                                    <Box sx={{ flex: 1, pl: 0.5 }}>
                                        <Box sx={{ pl: 1 }}>
                                            <Typography>Patient Entering Time in Endoscopy Area</Typography>
                                        </Box>
                                        <Box >
                                            {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <DateTimePicker label="Basic date time picker"
                                                    views={['year', 'month', 'day', 'hours', 'minutes', 'seconds']}
                                                    value={entryTime}
                                                    size="small"
                                                    onChange={(newValue) => {
                                                        setEntryTime(newValue);
                                                    }}
                                                    renderInput={({ inputRef, inputProps, InputProps }) => (
                                                        <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                                            <CssVarsProvider>
                                                                <Input ref={inputRef} {...inputProps} style={{ px: 2, width: '90%' }} disabled={true} />
                                                            </CssVarsProvider>
                                                            {InputProps?.endAdornment}
                                                        </Box>
                                                    )}

                                                />
                                            </LocalizationProvider> */}
                                            <TextFieldCustom
                                                style={{ height: 40, borderRadius: 0, }}
                                                slotProps={{
                                                    input: {
                                                        max: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
                                                    }
                                                }}
                                                size="md"
                                                type="datetime-local"
                                                name="entryTime"
                                                value={entryTime}
                                                onchange={ChangeEntryTime}
                                            />
                                        </Box>
                                    </Box>
                                    <Box sx={{ flex: 1, pl: 0.5 }}>
                                        <Box sx={{ pl: 1 }}>
                                            <Typography>Assessment Checklist Done By Nurse</Typography>
                                        </Box>
                                        <Box sx={{ pr: 0.5 }} >
                                            <TextFieldCustom
                                                style={{ height: 40, borderRadius: 0, }}
                                                slotProps={{
                                                    input: {
                                                        min: moment(new Date(entryTime)).format('YYYY-MM-DD HH:mm:ss'),
                                                        max: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
                                                    }
                                                }}
                                                size="md"
                                                type="datetime-local"
                                                name="assessmentTime"
                                                value={assessmentTime}
                                                onchange={ChangeAssesmentTime}
                                            />
                                        </Box>
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', pt: 0.5, mx: 0.5 }}>
                                    <Box sx={{ flex: 1 }}>
                                        <Box sx={{ pl: 1 }}>
                                            <Typography>Procedure Starting Time</Typography>
                                        </Box>
                                        <Box >
                                            <TextFieldCustom
                                                style={{ height: 40, borderRadius: 0, }}
                                                slotProps={{
                                                    input: {
                                                        max: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
                                                    }
                                                }}
                                                size="md"
                                                type="datetime-local"
                                                name="startTime"
                                                value={startTime}
                                                onchange={ChangeStartime}
                                            />
                                        </Box>
                                    </Box>
                                    <Box sx={{ flex: 1, pl: 0.5 }}>
                                        <Box sx={{ pl: 1 }}>
                                            <Typography>Procedure Ending Time</Typography>
                                        </Box>
                                        <Box >
                                            <TextFieldCustom
                                                style={{ height: 40, borderRadius: 0, }}
                                                slotProps={{
                                                    input: {
                                                        max: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
                                                    }
                                                }}
                                                size="md"
                                                type="datetime-local"
                                                name="endTime"
                                                value={endTime}
                                                onchange={ChangeEndTime}
                                            />
                                        </Box>
                                    </Box>
                                    <Box sx={{ flex: 1, pl: 0.7 }}>
                                        <Box sx={{ pl: 1 }}>
                                            <Typography>Sum of Time Taken For Assessment</Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                            <Box sx={{ flex: 1, bgcolor: 'white', height: 38, pt: 0.7, mr: 0.6, boxShadow: 1, pl: 3 }}>
                                                {sumOfAssesment}
                                            </Box>
                                        </Box>

                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', py: 0.5, mx: 0.5 }}>
                                    <Box sx={{ flex: 1 }}>
                                        <Box sx={{ pl: 1 }}>
                                            <Typography>Report Generating Time</Typography>
                                        </Box>
                                        <Box >
                                            <TextFieldCustom
                                                style={{ height: 40, borderRadius: 0, }}
                                                slotProps={{
                                                    input: {
                                                        max: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
                                                    }
                                                }}
                                                size="md"
                                                type="datetime-local"
                                                name="reportTime"
                                                value={reportTime}
                                                onchange={ReportChange}
                                            />
                                        </Box>
                                    </Box>
                                    <Box sx={{ flex: 1, pl: 0.5 }}>
                                        <Box sx={{ pl: 1 }}>
                                            <Typography>Report Despatching Time</Typography>
                                        </Box>
                                        <Box >
                                            <TextFieldCustom
                                                style={{ height: 40, borderRadius: 0, }}
                                                slotProps={{
                                                    input: {
                                                        max: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
                                                    }
                                                }}
                                                size="md"
                                                type="datetime-local"
                                                name="despatchTime"
                                                value={despatchTime}
                                                onchange={DespatchChange}
                                            />
                                        </Box>
                                    </Box>
                                    <Box sx={{ flex: 1, pl: 0.7 }}>
                                        <Box sx={{ pl: 1 }}>
                                            <Typography>Total Time Gap</Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                            <Box sx={{ flex: 1, bgcolor: 'white', height: 38, pt: 1, mr: 0.6, boxShadow: 1, pl: 3 }}>
                                                {timeGap}
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>

                        </Box>

                        <Paper variant='outlined' square sx={{ display: 'flex', justifyContent: 'flex-end', bgcolor: '#90a4ae', height: 45 }}>
                            <Box sx={{ pt: 0.5, pr: 0.5 }}>
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
                            <Box sx={{ pr: 1, py: 0.4 }}>
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

                    </ModalDialog>
                </Modal>
            </CssVarsProvider>
        </Fragment >
    )
}

export default memo(ModalQiEndoscopy)