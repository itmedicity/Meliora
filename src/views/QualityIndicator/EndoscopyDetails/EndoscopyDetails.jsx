import { Box, Button, CssVarsProvider, Typography } from '@mui/joy'
import { Paper } from '@mui/material'
import React, { Fragment, memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
const EndoscopyDetails = ({ totpatients, dailyDate, setTotpatients, setCheckDpt, endoexistData, endoFlag, setEndoExistData, setEndoFlag }) => {
    const [toterror, setToterror] = useState(0)
    const [errorResult, setErrorResult] = useState(0)
    const [totRedos, setTotRedos] = useState(0)
    const [redosResult, setredosResult] = useState(0)
    const [sumofTime, setSumofTime] = useState(0)
    const [timeResult, setTimeResult] = useState(0)
    const [identError, setIdentError] = useState(0)
    const [identResult, setIdentResult] = useState(0)
    const [totFalls, setTotFalls] = useState(0)
    const [fallsResult, setFallsResult] = useState(0)
    const [sentinelAnalyse, setSentinelAnalyse] = useState(0)
    const [sentinelCollect, setSentinelCollect] = useState(0)
    const [sentinelResult, setsentinelResult] = useState(0)
    const [nearMisses, setNearMisses] = useState(0)
    const [totalIncidents, settotalIncidents] = useState(0)
    const [nearMissesResult, setNearMissesResult] = useState(0)
    const [endoqi_slno, setEndoQi_slno] = useState(0)

    const id = useSelector((state) => {
        return state?.LoginUserData.empid
    })

    const updateErrorChange = useCallback((e) => {
        const containsOnlyDigits = (value) => /^\d+$/.test(value);
        const inputdata = (e.target.value);
        if (inputdata !== '' && !containsOnlyDigits(inputdata)) {
            infoNotify("Please enter data with digits only");
            return;
        }
        else {
            setToterror(inputdata);
        }
    }, [])

    const updateRedosChange = useCallback((e) => {
        const containsOnlyDigits = (value) => /^\d+$/.test(value);
        const inputdata = (e.target.value);
        if (inputdata !== '' && !containsOnlyDigits(inputdata)) {
            infoNotify("Please enter data with digits only");
            return;
        }
        else {
            setTotRedos(inputdata);
        }
    }, [])

    const updateTimeChange = useCallback((e) => {
        const containsOnlyDigits = (value) => /^\d+$/.test(value);
        const inputdata = (e.target.value);
        if (inputdata !== '' && !containsOnlyDigits(inputdata)) {
            infoNotify("Please enter data with digits only");
            return;
        }
        else {
            setSumofTime(inputdata);
        }
    }, [])
    const IdentErrorChange = useCallback((e) => {
        const containsOnlyDigits = (value) => /^\d+$/.test(value);
        const inputdata = (e.target.value);
        if (inputdata !== '' && !containsOnlyDigits(inputdata)) {
            infoNotify("Please enter data with digits only");
            return;
        }
        else {
            setIdentError(inputdata);
        }
    }, [])

    const TotalFallsChange = useCallback((e) => {
        const containsOnlyDigits = (value) => /^\d+$/.test(value);
        const inputdata = (e.target.value);
        if (inputdata !== '' && !containsOnlyDigits(inputdata)) {
            infoNotify("Please enter data with digits only");
            return;
        }
        else {
            setTotFalls(inputdata);
        }
    }, [])
    const SentinelEventsChange = useCallback((e) => {
        const containsOnlyDigits = (value) => /^\d+$/.test(value);
        const inputdata = (e.target.value);
        if (inputdata !== '' && !containsOnlyDigits(inputdata)) {
            infoNotify("Please enter data with digits only");
            return;
        }
        else {
            setSentinelAnalyse(inputdata);
            if (sentinelCollect !== 0) {
                const result = (inputdata / sentinelCollect).toFixed(3);
                setsentinelResult(result);
            }
            else {
                setsentinelResult(0)
            }
        }
    }, [sentinelCollect])
    const SentinelReportChange = useCallback((e) => {
        const containsOnlyDigits = (value) => /^\d+$/.test(value);
        const inputdata = (e.target.value);
        if (inputdata !== '' && !containsOnlyDigits(inputdata)) {
            infoNotify("Please enter data with digits only");
            return;
        }
        else {
            setSentinelCollect(inputdata);
            if (sentinelAnalyse !== 0) {
                const result = (sentinelAnalyse / inputdata).toFixed(3);
                setsentinelResult(result);
            }
            else {
                setsentinelResult(0)
            }
        }
    }, [sentinelAnalyse])
    const NearMissesChange = useCallback((e) => {
        const containsOnlyDigits = (value) => /^\d+$/.test(value);
        const inputdata = (e.target.value);
        if (inputdata !== '' && !containsOnlyDigits(inputdata)) {
            infoNotify("Please enter data with digits only");
            return;
        }
        else {
            setNearMisses(inputdata);
            if (totalIncidents !== 0) {
                const result = (inputdata / totalIncidents).toFixed(3);
                setNearMissesResult(result);
            }
            else {
                setNearMissesResult(0)
            }
        }
    }, [totalIncidents])
    const IncidentReportChange = useCallback((e) => {
        const containsOnlyDigits = (value) => /^\d+$/.test(value);
        const inputdata = (e.target.value);
        if (inputdata !== '' && !containsOnlyDigits(inputdata)) {
            infoNotify("Please enter data with digits only");
            return;
        }
        else {
            settotalIncidents(inputdata);
            if (nearMisses !== 0) {
                const result = (nearMisses / inputdata).toFixed(3);
                setNearMissesResult(result);
            }
            else {
                setNearMissesResult(0)
            }
        }
    }, [nearMisses])
    useEffect(() => {
        if (totpatients !== 0) {
            setErrorResult((toterror / totpatients).toFixed(3))
            setredosResult((totRedos / totpatients).toFixed(3))
            setTimeResult((sumofTime / totpatients).toFixed(3))
            setIdentResult((identError / totpatients).toFixed(3))
            setFallsResult((totFalls / totpatients).toFixed(3))
        }
    }, [totpatients, toterror, totFalls, totRedos, sumofTime, identError])

    const reset = useCallback(() => {
        setToterror(0)
        setErrorResult(0)
        setTotRedos(0)
        setredosResult(0)
        setSumofTime(0)
        setTimeResult(0)
        setIdentError(0)
        setIdentResult(0)
        setTotFalls(0)
        setFallsResult(0)
        setSentinelAnalyse(0)
        setSentinelCollect(0)
        setsentinelResult(0)
        setNearMisses(0)
        settotalIncidents(0)
        setNearMissesResult(0)
        setEndoFlag(0)
        setTotpatients(0)
        setCheckDpt(0)
        // setEndoQi_slno(0)
        setEndoExistData([])
    }, [setTotpatients, setCheckDpt, setEndoExistData, setEndoFlag])
    const ResetData = useCallback(() => {
        reset()
    }, [reset])

    const postdata = useMemo(() => {
        return {
            qi_date: dailyDate,
            total_patients: totpatients,
            total_error_report: toterror,
            total_redose: totRedos,
            total_sumof_time: sumofTime,
            total_ident_error: identError,
            total_falls: totFalls,
            total_sentinels_analyse: sentinelAnalyse,
            total_sentinels_collect: sentinelCollect,
            total_near_misses: nearMisses,
            total_incidents: totalIncidents,
            create_user: id
        }
    }, [id, dailyDate, totpatients, toterror, totRedos, sumofTime, identError, totFalls, sentinelAnalyse,
        sentinelCollect, nearMisses, totalIncidents])
    useEffect(() => {
        if (Object.keys(endoexistData).length !== 0) {
            const { qi_daily_endos_slno, total_patients, total_error_report, total_redose, total_sumof_time, total_ident_error,
                total_falls, total_sentinels_analyse, total_sentinels_collect, total_near_misses, total_incidents } = endoexistData[0]
            setEndoQi_slno(qi_daily_endos_slno)
            setTotpatients(total_patients)
            setToterror(total_error_report)
            setErrorResult((total_error_report / total_patients).toFixed(3))
            setTotRedos(total_redose)
            setredosResult((total_redose / total_patients).toFixed(3))
            setSumofTime(total_sumof_time)
            setTimeResult((total_sumof_time / total_patients).toFixed(3))
            setIdentError(total_ident_error)
            setIdentResult((total_ident_error / total_patients).toFixed(3))
            setTotFalls(total_falls)
            setFallsResult((total_falls / total_patients).toFixed(3))
            setSentinelAnalyse(total_sentinels_analyse)
            setSentinelCollect(total_sentinels_collect)
            if (total_sentinels_collect !== 0) {
                setsentinelResult((total_sentinels_analyse / total_sentinels_collect).toFixed(3))
            } else {
                setsentinelResult(0)
            }
            setNearMisses(total_near_misses)
            settotalIncidents(total_incidents)
            if (total_incidents !== 0) {
                setNearMissesResult((total_near_misses / total_incidents).toFixed(3))
            }
            else {
                setNearMissesResult(0)
            }
        }
        else {
            setToterror(0)
            setErrorResult(0)
            setTotRedos(0)
            setredosResult(0)
            setSumofTime(0)
            setTimeResult(0)
            setIdentError(0)
            setIdentResult(0)
            setTotFalls(0)
            setFallsResult(0)
            setSentinelAnalyse(0)
            setSentinelCollect(0)
            setsentinelResult(0)
            setNearMisses(0)
            settotalIncidents(0)
            setNearMissesResult(0)
        }
    }, [endoexistData, setTotpatients])
    const patchdata = useMemo(() => {
        return {
            qi_date: dailyDate,
            total_patients: totpatients,
            total_error_report: toterror,
            total_redose: totRedos,
            total_sumof_time: sumofTime,
            total_ident_error: identError,
            total_falls: totFalls,
            total_sentinels_analyse: sentinelAnalyse,
            total_sentinels_collect: sentinelCollect,
            total_near_misses: nearMisses,
            total_incidents: totalIncidents,
            edit_user: id,
            qi_daily_endos_slno: endoqi_slno
        }
    }, [id, dailyDate, totpatients, toterror, totRedos, sumofTime, identError, totFalls, sentinelAnalyse,
        sentinelCollect, nearMisses, totalIncidents, endoqi_slno])

    const SaveDetails = useCallback((e) => {
        if (totpatients === 0) {
            infoNotify("Enter Patients Count")
        }
        else if (toterror > totpatients) {
            infoNotify("Total No.Of Reporting Error Cannot Exceed Total No.Of Patients Visited")
        }
        else if (totRedos > totpatients) {
            infoNotify("Total No.Of Re dos Cannot Exceed Total No.Of Patients Visited")
        }
        else if (identError > totpatients) {
            infoNotify("Total No.Of Patient Identification Errors Cannot Exceed Total No.Of Patients Visited")
        }
        else if (totFalls > totpatients) {
            infoNotify("Total No.Of Falls Cannot Exceed Total No.Of Patients Visited")
        }
        else if (sentinelAnalyse > sentinelCollect) {
            infoNotify("Total No.Of Sentinel Events Analysed Cannot Exceed Total No.Of Sentinel Event Reported/Collected ")
        }
        else if (nearMisses > totalIncidents) {
            infoNotify("Total No.Of Near Misses Reported Cannot Exceed Total No.Of Incidents Reported")
        }
        else {
            e.preventDefault();
            if (endoFlag === 0) {
                const InsertData = async (postdata) => {
                    const result = await axioslogin.post('/qiendoscopy/savedata', postdata);
                    const { message, success } = result.data;
                    if (success === 1) {
                        succesNotify(message)
                        reset()
                    }
                    else {
                        infoNotify(message)
                    }
                }
                InsertData(postdata)
            }
            else {
                const UpdateData = async (patchdata) => {
                    const result = await axioslogin.patch('/qiendoscopy/update', patchdata);
                    const { message, success } = result.data;
                    if (success === 1) {
                        succesNotify(message)
                        reset()
                    }
                    else {
                        infoNotify(message)
                    }
                }
                UpdateData(patchdata)
            }
        }
    }, [postdata, patchdata, endoFlag, reset, totpatients, toterror, totRedos, identError, totFalls,
        sentinelAnalyse, sentinelCollect, nearMisses, totalIncidents])
    return (
        <Fragment>
            <Box>
                <Paper sx={{ border: '0.2px solid #eceff1' }}>
                    <Paper sx={{ bgcolor: '#eceff1', py: 0.7, pl: 2 }}>
                        <Typography sx={{ textTransform: 'capitalize', fontSize: 17 }}>
                            Number Of Reporting Errors per 1000 Investigations
                        </Typography>
                    </Paper>
                    <Box sx={{ display: 'flex', py: 1, bgcolor: '#F7F8F8', pl: 2 }}>
                        <Box sx={{ flex: 1.5, pl: 1 }} >
                            <Box sx={{ pl: 1 }}>
                                <Typography>Total No.Of Reporting Errors</Typography>
                            </Box>
                            <Box>
                                <TextFieldCustom
                                    size="md"
                                    type="text"
                                    name="toterror"
                                    value={toterror}
                                    onchange={updateErrorChange}
                                />
                            </Box>
                        </Box>
                        <Box sx={{ flex: 1, pl: 1 }} >
                            <Box sx={{ pl: 1 }}>
                                <Typography>Total No.Of Tests Performed</Typography>
                            </Box>
                            <Box>
                                <TextFieldCustom
                                    disabled
                                    size="md"
                                    type="text"
                                    name="totpatients"
                                    value={totpatients}
                                />
                            </Box>
                        </Box>
                        <Box sx={{ flex: 0.5, pl: 1 }} >
                            <Box sx={{ pl: 1 }}>
                                <Typography>Result</Typography>
                            </Box>
                            <Box>
                                <TextFieldCustom
                                    disabled
                                    size="md"
                                    type="text"
                                    name="errorResult"
                                    value={errorResult}
                                />
                            </Box>
                        </Box>
                        <Box sx={{ flex: 0.1, pl: 1 }} ></Box>
                    </Box>
                </Paper>
                <Paper sx={{ border: '0.2px solid #eceff1', pt: 0.5 }}>
                    <Paper sx={{ bgcolor: '#eceff1', py: 0.7, pl: 2 }}>
                        <Typography sx={{ textTransform: 'capitalize', fontSize: 17 }}>
                            Percentage of Re dos
                        </Typography>
                    </Paper>
                    <Box sx={{ display: 'flex', py: 1, bgcolor: '#F7F8F8', pl: 2 }}>
                        <Box sx={{ flex: 1.5, pl: 1 }} >
                            <Box sx={{ pl: 1 }}>
                                <Typography>Total No.Of Re dos</Typography>
                            </Box>
                            <Box>
                                <TextFieldCustom
                                    size="md"
                                    type="text"
                                    name="totRedos"
                                    value={totRedos}
                                    onchange={updateRedosChange}
                                />
                            </Box>
                        </Box>
                        <Box sx={{ flex: 1, pl: 1 }} >
                            <Box sx={{ pl: 1 }}>
                                <Typography>Total No.Of Tests Performed</Typography>
                            </Box>
                            <Box>
                                <TextFieldCustom
                                    disabled
                                    size="md"
                                    type="text"
                                    name="totpatients"
                                    value={totpatients}
                                />
                            </Box>
                        </Box>
                        <Box sx={{ flex: 0.5, pl: 1 }} >
                            <Box sx={{ pl: 1 }}>
                                <Typography>Result</Typography>
                            </Box>
                            <Box>
                                <TextFieldCustom
                                    disabled
                                    size="md"
                                    type="text"
                                    name="redosResult"
                                    value={redosResult}
                                />
                            </Box>
                        </Box>
                        <Box sx={{ flex: 0.1, pl: 1 }} ></Box>
                    </Box>
                </Paper>
                <Paper sx={{ border: '0.2px solid #eceff1', pt: 0.5 }}>
                    <Paper sx={{ bgcolor: '#eceff1', py: 0.7, pl: 2 }}>
                        <Typography sx={{ textTransform: 'capitalize', fontSize: 17 }}>
                            Waiting time for service(a) Diagnostics
                        </Typography>
                    </Paper>
                    <Box sx={{ display: 'flex', py: 1, bgcolor: '#F7F8F8', pl: 2 }}>
                        <Box sx={{ flex: 1.5, pl: 1 }} >
                            <Box sx={{ pl: 1 }}>
                                <Typography>Total Sum of Time (in Min)</Typography>
                            </Box>
                            <Box>
                                <TextFieldCustom
                                    size="md"
                                    type="text"
                                    name="sumofTime"
                                    value={sumofTime}
                                    onchange={updateTimeChange}
                                />
                            </Box>
                        </Box>
                        <Box sx={{ flex: 1, pl: 1 }} >
                            <Box sx={{ pl: 1 }}>
                                <Typography>Total No.Of Patients Reported</Typography>
                            </Box>
                            <Box>
                                <TextFieldCustom
                                    disabled
                                    size="md"
                                    type="text"
                                    name="totpatients"
                                    value={totpatients}
                                />
                            </Box>
                        </Box>
                        <Box sx={{ flex: 0.5, pl: 1 }} >
                            <Box sx={{ pl: 1 }}>
                                <Typography>Result</Typography>
                            </Box>
                            <Box>
                                <TextFieldCustom
                                    disabled
                                    size="md"
                                    type="text"
                                    name="timeResult"
                                    value={timeResult}
                                />
                            </Box>
                        </Box>
                        <Box sx={{ flex: 0.1, pl: 1 }} ></Box>
                    </Box>
                </Paper>
                <Paper sx={{ border: '0.2px solid #eceff1', pt: 0.5 }}>
                    <Paper sx={{ bgcolor: '#eceff1', py: 0.7, pl: 2 }}>
                        <Typography sx={{ textTransform: 'capitalize', fontSize: 17 }}>
                            Incidence of Patient Identification Errors
                        </Typography>
                    </Paper>
                    <Box sx={{ display: 'flex', py: 1, bgcolor: '#F7F8F8', pl: 2 }}>
                        <Box sx={{ flex: 1.5, pl: 1 }} >
                            <Box sx={{ pl: 1 }}>
                                <Typography>Total No.Of Patient Identification Errors</Typography>
                            </Box>
                            <Box>
                                <TextFieldCustom
                                    size="md"
                                    type="text"
                                    name="identError"
                                    value={identError}
                                    onchange={IdentErrorChange}
                                />
                            </Box>
                        </Box>
                        <Box sx={{ flex: 1, pl: 1 }} >
                            <Box sx={{ pl: 1 }}>
                                <Typography>Total No.Of Patients</Typography>
                            </Box>
                            <Box>
                                <TextFieldCustom
                                    disabled
                                    size="md"
                                    type="text"
                                    name="totpatients"
                                    value={totpatients}
                                />
                            </Box>
                        </Box>
                        <Box sx={{ flex: 0.5, pl: 1 }} >
                            <Box sx={{ pl: 1 }}>
                                <Typography>Result</Typography>
                            </Box>
                            <Box>
                                <TextFieldCustom
                                    disabled
                                    size="md"
                                    type="text"
                                    name="identResult"
                                    value={identResult}
                                />
                            </Box>
                        </Box>
                        <Box sx={{ flex: 0.1, pl: 1 }} ></Box>
                    </Box>
                </Paper>
                <Paper sx={{ border: '0.2px solid #eceff1', pt: 0.5 }}>
                    <Paper sx={{ bgcolor: '#eceff1', py: 0.7, pl: 2 }}>
                        <Typography sx={{ textTransform: 'capitalize', fontSize: 17 }}>
                            Incidence of Falls
                        </Typography>
                    </Paper>
                    <Box sx={{ display: 'flex', py: 1, bgcolor: '#F7F8F8', pl: 2 }}>
                        <Box sx={{ flex: 1.5, pl: 1 }} >
                            <Box sx={{ pl: 1 }}>
                                <Typography>Total No.Of Falls</Typography>
                            </Box>
                            <Box>
                                <TextFieldCustom
                                    size="md"
                                    type="text"
                                    name="totFalls"
                                    value={totFalls}
                                    onchange={TotalFallsChange}
                                />
                            </Box>
                        </Box>
                        <Box sx={{ flex: 1, pl: 1 }} >
                            <Box sx={{ pl: 1 }}>
                                <Typography>Total No.Of Patient Days</Typography>
                            </Box>
                            <Box>
                                <TextFieldCustom
                                    disabled
                                    size="md"
                                    type="text"
                                    name="totpatients"
                                    value={totpatients}
                                />
                            </Box>
                        </Box>
                        <Box sx={{ flex: 0.5, pl: 1 }} >
                            <Box sx={{ pl: 1 }}>
                                <Typography>Result</Typography>
                            </Box>
                            <Box>
                                <TextFieldCustom
                                    disabled
                                    size="md"
                                    type="text"
                                    name="fallsResult"
                                    value={fallsResult}
                                />
                            </Box>
                        </Box>
                        <Box sx={{ flex: 0.1, pl: 1 }} ></Box>
                    </Box>
                </Paper>
                <Paper sx={{ border: '0.2px solid #eceff1', pt: 0.5 }}>
                    <Paper sx={{ bgcolor: '#eceff1', py: 0.7, pl: 2 }}>
                        <Typography sx={{ textTransform: 'capitalize', fontSize: 17 }}>
                            Number of Sentinel Events Reported,Collected and Analysed the Defined Time Frame
                        </Typography>
                    </Paper>
                    <Box sx={{ display: 'flex', py: 1, bgcolor: '#F7F8F8', pl: 2 }}>
                        <Box sx={{ flex: 1.5, pl: 1 }} >
                            <Box sx={{ pl: 1 }}>
                                <Typography>Total No.Of Sentinel Events Analysed within the Defined Time Frame</Typography>
                            </Box>
                            <Box>
                                <TextFieldCustom
                                    size="md"
                                    type="text"
                                    name="sentinelAnalyse"
                                    value={sentinelAnalyse}
                                    onchange={SentinelEventsChange}
                                />
                            </Box>
                        </Box>
                        <Box sx={{ flex: 1, pl: 1 }} >
                            <Box sx={{ pl: 1 }}>
                                <Typography>Total No.Of Sentinel Event Reported/Collected</Typography>
                            </Box>
                            <Box>
                                <TextFieldCustom
                                    size="md"
                                    type="text"
                                    name="sentinelCollect"
                                    value={sentinelCollect}
                                    onchange={SentinelReportChange}
                                />
                            </Box>
                        </Box>
                        <Box sx={{ flex: 0.5, pl: 1 }} >
                            <Box sx={{ pl: 1 }}>
                                <Typography>Result</Typography>
                            </Box>
                            <Box>
                                <TextFieldCustom
                                    disabled
                                    size="md"
                                    type="text"
                                    name="sentinelResult"
                                    value={sentinelResult}
                                />
                            </Box>
                        </Box>
                        <Box sx={{ flex: 0.1, pl: 1 }} ></Box>
                    </Box>
                </Paper>
                <Paper sx={{ border: '0.2px solid #eceff1', pt: 0.5 }}>
                    <Paper sx={{ bgcolor: '#eceff1', py: 0.7, pl: 2 }}>
                        <Typography sx={{ textTransform: 'capitalize', fontSize: 17 }}>
                            Percentage of Near Misses
                        </Typography>
                    </Paper>
                    <Box sx={{ display: 'flex', pt: 1, pb: 1.5, bgcolor: '#F7F8F8', pl: 2 }}>
                        <Box sx={{ flex: 1.5, pl: 1 }} >
                            <Box sx={{ pl: 1 }}>
                                <Typography>Total No.Of Near Misses Reported</Typography>
                            </Box>
                            <Box>
                                <TextFieldCustom
                                    size="md"
                                    type="text"
                                    name="nearMisses"
                                    value={nearMisses}
                                    onchange={NearMissesChange}
                                />
                            </Box>
                        </Box>
                        <Box sx={{ flex: 1, pl: 1 }} >
                            <Box sx={{ pl: 1 }}>
                                <Typography>Total No.Of Incidents Reported</Typography>
                            </Box>
                            <Box>
                                <TextFieldCustom
                                    size="md"
                                    type="text"
                                    name="totalIncidents"
                                    value={totalIncidents}
                                    onchange={IncidentReportChange}
                                />
                            </Box>
                        </Box>
                        <Box sx={{ flex: 0.5, pl: 1 }} >
                            <Box sx={{ pl: 1 }}>
                                <Typography>Result</Typography>
                            </Box>
                            <Box>
                                <TextFieldCustom
                                    disabled
                                    size="md"
                                    type="text"
                                    name="nearMissesResult"
                                    value={nearMissesResult}
                                />
                            </Box>
                        </Box>
                        <Box sx={{ flex: 0.1, pl: 1 }} ></Box>
                    </Box>
                </Paper>
                <Paper sx={{ height: 50, pt: 1, bgcolor: '#E8ECF3', display: "flex" }}>
                    <Box sx={{ display: "flex", justifyContent: 'flex-end', flex: 1, pr: 5 }}>
                        {
                            endoFlag === 0 ?
                                <Box sx={{}}>
                                    <CssVarsProvider>
                                        <Button variant="outlined" sx={{ fontSize: 16, color: '#004F76', width: 100, cursor: 'pointer' }}
                                            onClick={SaveDetails}
                                        >
                                            Save</Button>
                                    </CssVarsProvider>
                                </Box> :
                                <Box sx={{}}>
                                    <CssVarsProvider>
                                        <Button variant="outlined" sx={{ fontSize: 16, color: '#004F76', width: 100, cursor: 'pointer' }}
                                            onClick={SaveDetails}
                                        >
                                            Update</Button>
                                    </CssVarsProvider>
                                </Box>
                        }

                        <Box sx={{ pl: 1 }}>
                            <CssVarsProvider>
                                <Button variant="outlined" sx={{ fontSize: 16, color: '#004F76', width: 100, cursor: 'pointer' }}
                                    onClick={ResetData}
                                >
                                    Cancel</Button>
                            </CssVarsProvider>
                        </Box>
                    </Box>
                </Paper>
            </Box >
        </Fragment >
    )
}

export default memo(EndoscopyDetails)


