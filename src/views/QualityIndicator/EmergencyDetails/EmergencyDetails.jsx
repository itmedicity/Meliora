import { Box, Button, CssVarsProvider, Typography } from '@mui/joy'
import { Paper } from '@mui/material'
import React, { Fragment, memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'

const EmergencyDetails = ({ totpatients, setTotpatients, dailyDate, emerFlag, setCheckDpt, emerExistData, setEmerExistdata, setEmerFlag }) => {

    const [sumOfTime, setSumOfTime] = useState(0)
    const [timeResult, settimeResult] = useState(0)
    const [returnPatients, setReturnPatients] = useState(0)
    const [returnResult, setReturnResult] = useState(0)
    const [emergencySlno, setEmergencySlno] = useState(0)

    const id = useSelector((state) => {
        return state?.LoginUserData.empid
    })

    const UpdateTimeChange = useCallback((e) => {
        const containsOnlyDigits = (value) => /^\d+$/.test(value);
        const inputdata = (e.target.value);
        if (inputdata !== '' && !containsOnlyDigits(inputdata)) {
            infoNotify("Please enter data with digits only");
            return;
        }
        else {
            setSumOfTime(inputdata);
        }
    }, [])

    const PatientsReturnChange = useCallback((e) => {
        const containsOnlyDigits = (value) => /^\d+$/.test(value);
        const inputdata = (e.target.value);
        if (inputdata !== '' && !containsOnlyDigits(inputdata)) {
            infoNotify("Please enter data with digits only");
            return;
        }
        else {
            setReturnPatients(inputdata);
        }
    }, [])

    useEffect(() => {
        if (totpatients !== 0) {
            settimeResult((sumOfTime / totpatients).toFixed(3))
            setReturnResult((returnPatients / totpatients).toFixed(3))
        }
    }, [totpatients, sumOfTime, returnPatients])
    const reset = useCallback(() => {
        setEmergencySlno(0)
        setSumOfTime(0)
        settimeResult(0)
        setReturnPatients(0)
        setReturnResult(0)
        setTotpatients(0)
        setCheckDpt(0)
        setEmerExistdata([])
        setEmerFlag(0)

    }, [setTotpatients, setCheckDpt, setEmerExistdata, setEmerFlag])
    const ResetData = useCallback(() => {
        reset()
    }, [reset])

    useEffect(() => {
        if (emerExistData.length !== 0) {
            const { qi_emergency_slno, total_patients, total_time_taken, total_patients_return } = emerExistData[0]
            setEmergencySlno(qi_emergency_slno)
            setTotpatients(total_patients)
            setSumOfTime(total_time_taken)
            settimeResult((total_time_taken / total_patients).toFixed(3))
            setReturnPatients(total_patients_return)
            setReturnResult((total_patients_return / total_patients).toFixed(3))
        }
        else {
            setEmergencySlno(0)
            setSumOfTime(0)
            settimeResult(0)
            setReturnPatients(0)
            setReturnResult(0)

        }
    }, [emerExistData, setTotpatients])

    const postdata = useMemo(() => {
        return {
            qi_emergency_date: dailyDate,
            total_patients: totpatients,
            total_time_taken: sumOfTime,
            total_patients_return: returnPatients,
            create_user: id
        }
    }, [id, dailyDate, totpatients, sumOfTime, returnPatients])

    const patchdata = useMemo(() => {
        return {
            total_patients: totpatients,
            total_time_taken: sumOfTime,
            total_patients_return: returnPatients,
            edit_user: id,
            qi_emergency_slno: emergencySlno
        }
    }, [id, totpatients, sumOfTime, returnPatients, emergencySlno])

    const SaveDetails = useCallback((e) => {
        if (totpatients === 0) {
            infoNotify("Enter Patients Count")
        }
        else if (returnPatients > totpatients) {
            infoNotify("Total No.Of Patients Return To Emergency Cannot Exceed Total Number of Patients Visited")
        }
        else {
            e.preventDefault();
            const InsertData = async (postdata) => {
                const result = await axioslogin.post('/qiemergency/savedata', postdata);
                const { message, success } = result.data;
                if (success === 1) {
                    succesNotify(message)
                    reset()
                }
                else {
                    infoNotify(message)
                }
            }
            const UpdateData = async (patchdata) => {
                const result = await axioslogin.patch('/qiemergency/update', patchdata);
                const { message, success } = result.data;
                if (success === 1) {
                    succesNotify(message)
                    reset()
                }
                else {
                    infoNotify(message)
                }
            }
            if (emerFlag === 0) {
                InsertData(postdata)
            }
            else {
                UpdateData(patchdata)
            }
        }
    }, [postdata, emerFlag, totpatients, patchdata, reset, returnPatients])

    return (
        <Fragment>
            <Box>
                <Paper sx={{ border: '0.2px solid #eceff1' }}>
                    <Paper sx={{ bgcolor: '#eceff1', py: 0.7, pl: 2 }}>
                        <Typography sx={{ textTransform: 'capitalize', fontSize: 17 }}>
                            Time Taken for Initial assessment of patients attending emergency services
                        </Typography>
                    </Paper>
                    <Box sx={{ display: 'flex', py: 1, bgcolor: '#F7F8F8', pl: 2 }}>
                        <Box sx={{ flex: 1.5, pl: 1 }} >
                            <Box sx={{ pl: 1 }}>
                                <Typography sx={{ textTransform: 'capitalize' }}>Total Sum Of Time taken for assessment </Typography>
                            </Box>
                            <Box>
                                <TextFieldCustom
                                    size="md"
                                    type="text"
                                    name="sumOfTime"
                                    value={sumOfTime}
                                    onchange={UpdateTimeChange}
                                />
                            </Box>
                        </Box>
                        <Box sx={{ flex: 1, pl: 1 }} >
                            <Box sx={{ pl: 1 }}>
                                <Typography sx={{ textTransform: 'capitalize' }}>Total No.Of patients in indoor/emergency</Typography>
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
                            Return to Emergency Department within 72 hrs with similar presenting complaints
                        </Typography>
                    </Paper>
                    <Box sx={{ display: 'flex', py: 1, bgcolor: '#F7F8F8', pl: 2 }}>
                        <Box sx={{ flex: 1.5, pl: 1 }} >
                            <Box sx={{ pl: 1 }}>
                                <Typography sx={{ textTransform: 'capitalize' }}>
                                    Total No.Of returns to emergency within 72 hrs with similar presenting complaints  </Typography>
                            </Box>
                            <Box>
                                <TextFieldCustom
                                    size="md"
                                    type="text"
                                    name="returnPatients"
                                    value={returnPatients}
                                    onchange={PatientsReturnChange}
                                />
                            </Box>
                        </Box>
                        <Box sx={{ flex: 1, pl: 1 }} >
                            <Box sx={{ pl: 1 }}>
                                <Typography sx={{ textTransform: 'capitalize' }}>Total No.Of patients who have come to the emergency</Typography>
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
                                    name="returnResult"
                                    value={returnResult}
                                />
                            </Box>
                        </Box>
                        <Box sx={{ flex: 0.1, pl: 1 }} ></Box>
                    </Box>
                </Paper>
                <Paper sx={{ height: 50, pt: 1, bgcolor: '#E8ECF3', display: "flex" }}>
                    <Box sx={{ display: "flex", justifyContent: 'flex-end', flex: 1, pr: 5 }}>
                        {
                            emerFlag === 0 ?
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
            </Box>
        </Fragment >
    )
}
export default memo(EmergencyDetails)