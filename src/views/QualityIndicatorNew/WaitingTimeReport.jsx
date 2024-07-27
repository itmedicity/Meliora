import { Avatar, Box, Button, CssVarsProvider, Input, Tooltip, Typography } from '@mui/joy'
import React, { memo, useCallback, useEffect, useState } from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import QiDeptInitailassessmentSelect from '../CommonSelectCode/QiDeptInitailassessmentSelect';
import { getQltyDept } from 'src/redux/actions/QualityIndicatorDept.action';
import { differenceInHours, differenceInMinutes, differenceInSeconds, format } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { OPPatientsDetailsInsert } from './OPWaitingTime/OPPatientsDetailsInsert';
import OPConsultationWaitingReport from './OPWaitingTime/OPConsultationWaitingReport';
import { axioslogin } from '../Axios/Axios';
import { infoNotify } from '../Common/CommonCode';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Paper } from '@mui/material';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';

const WaitingTimeReport = () => {
    const [qidept, setQidept] = useState(0)
    const [depCode, setDepCode] = useState('')
    const [qitype, setQitype] = useState(0)
    const [searchDate, setSearchDate] = useState(format(new Date(), "yyyy-MM-dd"));
    const [searchFlag, setsearchFlag] = useState(0)
    const [generateFlag, setGenerateFlag] = useState(0)
    const [tableData, setTableData] = useState([])

    const dispatch = useDispatch()
    const history = useHistory()
    useEffect(() => {
        dispatch(getQltyDept())
    }, [dispatch])

    const backtoHome = useCallback(() => {
        history.push('/Home')
    }, [history])
    const id = useSelector((state) => {
        return state?.LoginUserData.empid
    })
    const OnchangeDate = useCallback((newValue) => {
        setSearchDate(newValue);
        setsearchFlag(0)
    }, [])

    useEffect(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const search = new Date(searchDate);
        search.setHours(0, 0, 0, 0);
        if (search < today) {
            setGenerateFlag(0);
        } else if (search.getTime() === today.getTime()) {
            setGenerateFlag(1);
        }
    }, [searchDate, qidept])

    const GenerateOpPatients = useCallback(() => {
        if (qitype === 0) {
            infoNotify('Select Department')
            setsearchFlag(0)
        }
        else if (qitype === 6) {
            const getPatients = async () => {
                await OPPatientsDetailsInsert(qidept, depCode, searchDate, id)
            }
            getPatients()
        }
        setGenerateFlag(0)
    }, [searchDate, depCode, qidept, id, qitype])
    const SearchDetails = useCallback(() => {
        if (qitype === 0) {
            infoNotify('Select Department')
            setsearchFlag(0)
        }
        if (qitype === 6) {
            const searchOPDatas = {
                from: format(new Date(searchDate), 'yyyy-MM-dd 00:00:00'),
                to: format(new Date(searchDate), 'yyyy-MM-dd 23:59:59'),
                dpt: qidept
            }
            const getOpData = async (searchOPDatas) => {
                const result = await axioslogin.post('/InitialAsessment/view', searchOPDatas);
                return result.data
            }
            getOpData(searchOPDatas).then((val) => {
                const { success, data, message } = val
                if (success === 1) {
                    const newArray = data?.map((val) => {
                        const patientArrivedDate = val.patient_arrived_date ? new Date(val.patient_arrived_date) : null;
                        const assessmentStartDate = val.assessment_start ? new Date(val.assessment_start) : null;
                        const assessmentEndDate = val.assessment_end ? new Date(val.assessment_end) : null;
                        const consultStartDate = val.consult_start_date ? new Date(val.consult_start_date) : null;
                        const complaintEntryDate = val.complaint_entry_date ? new Date(val.complaint_entry_date) : null;
                        const investigationReqDate = val.investigation_req_date ? new Date(val.investigation_req_date) : null;
                        const prescriptionReqDate = val.prescription_req_date ? new Date(val.prescription_req_date) : null;
                        const referenceReqDate = val.reference_req_date ? new Date(val.reference_req_date) : null;

                        const calculateTimeDiff = (startDate, endDate) => {
                            if (!startDate || !endDate) return 'Not Updated';
                            const hours = differenceInHours(endDate, startDate);
                            const minutes = differenceInMinutes(endDate, startDate) % 60;
                            const seconds = differenceInSeconds(endDate, startDate) % 60;
                            return `${hours} hr ${minutes} min ${seconds} sec`;
                        };

                        const startTimeDiff = calculateTimeDiff(patientArrivedDate, assessmentStartDate);
                        const assessTimeDiff = calculateTimeDiff(assessmentStartDate, assessmentEndDate);

                        const endConsult = [complaintEntryDate, investigationReqDate, prescriptionReqDate, referenceReqDate].filter(date => date !== null);
                        const endTimeofConsult = endConsult.length > 0 ? endConsult.reduce((max, date) => (date > max ? date : max)) : null;

                        const consultMaxDiff = calculateTimeDiff(consultStartDate, endTimeofConsult);
                        const totTimetoConsult = calculateTimeDiff(patientArrivedDate, endTimeofConsult);

                        return {
                            ptno: val.ptno,
                            ptname: val.ptname,
                            qi_dept_no: qidept,
                            patient_arrived_date: patientArrivedDate ? format(new Date(patientArrivedDate), 'dd-MM-yyyy hh:mm:ss a') : null,
                            assessment_start: assessmentStartDate ? format(new Date(assessmentStartDate), 'dd-MM-yyyy hh:mm:ss a') : 'Not Updated',
                            assessment_end: assessmentEndDate ? format(new Date(assessmentEndDate), 'dd-MM-yyyy hh:mm:ss a') : 'Not Updated',
                            consult_start_date: consultStartDate ? format(new Date(consultStartDate), 'dd-MM-yyyy hh:mm:ss a') : 'Not Updated',
                            consult_end_date: endTimeofConsult ? format(new Date(endTimeofConsult), 'dd-MM-yyyy hh:mm:ss a') : 'Not Updated',
                            start_time_diff: startTimeDiff,
                            assess_time_diff: assessTimeDiff,
                            consult_max_diff: consultMaxDiff,
                            tot_timeto_consult: totTimetoConsult,
                        };
                    });
                    setTableData(newArray)
                    setsearchFlag(1)
                }
                else if (success === 2) {
                    infoNotify(message)
                    setsearchFlag(0)
                }
            })
        }
    }, [qitype, qidept, searchDate])

    return (
        <Paper sx={{ height: '90vh' }}>
            <Box sx={{ display: 'flex', flex: 1, borderColor: 'lightgrey', flexWrap: 'wrap' }}>
                <Box sx={{ pl: 0.7, pt: 0.8 }} >
                    <TimerOutlinedIcon sx={{ height: 25, width: 25, }} />
                </Box>
                <Box sx={{ flex: 1, fontSize: 16, pl: 1, pt: 1.3 }}>
                    <Typography sx={{ fontFamily: 'Arial', fontSize: 14, textTransform: 'uppercase', fontWeight: 550 }}>
                        Waiting Time For Service Diagnostics
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', fontSize: 20, pr: 0.5, pt: 0.5 }}>
                    <CssVarsProvider>
                        <Tooltip title="Close" placement='bottom'>
                            <HighlightOffIcon sx={{
                                cursor: 'pointer', height: 30, width: 30,
                                ":hover": {
                                    color: '#e57373'
                                }

                            }}
                                onClick={backtoHome} />
                        </Tooltip>
                    </CssVarsProvider>
                </Box>
            </Box>
            <Paper square variant='outlined' sx={{ display: 'flex', pt: 0.4, flexWrap: 'wrap' }}>
                <Box sx={{ flex: 1 }}></Box>
                <Box sx={{ display: 'flex', m: 2, flex: 1 }}>
                    <CssVarsProvider>
                        <Avatar size="md" variant="plain" sx={{ bgcolor: '#e3f2fd' }}>
                            <LocationOnIcon sx={{ color: '#1565c0' }} />
                        </Avatar>
                    </CssVarsProvider>
                    <Box sx={{}}>
                        <Box sx={{ pl: 2, fontSize: 12, color: '#0d47a1' }} >DEPARTMENT <KeyboardArrowDownIcon fontSize='small' /></Box>
                        <Box sx={{ pl: 0.5 }}>
                            <QiDeptInitailassessmentSelect qidept={qidept} setQidept={setQidept} setQitype={setQitype}
                                setDepCode={setDepCode} setsearchFlag={setsearchFlag} />
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', m: 2, flex: 1 }}>
                    <CssVarsProvider>
                        <Avatar size="md" variant="plain" sx={{ bgcolor: '#e3f2fd' }}>
                            <CalendarMonthIcon sx={{ color: '#1565c0' }} />
                        </Avatar>
                    </CssVarsProvider>
                    <Box sx={{}}>
                        <Box sx={{ pl: 2, fontSize: 12, color: '#0d47a1' }} >DATE <KeyboardArrowDownIcon fontSize='small' /></Box>
                        <Box sx={{ pl: 0.5 }}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    value={searchDate}
                                    views={['year', 'month', 'day']}
                                    size="sm"
                                    inputFormat='dd-MM-yyyy'
                                    maxDate={new Date()}
                                    onChange={(e) => OnchangeDate(e)}
                                    renderInput={({ inputRef, inputProps, InputProps }) => (
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <CssVarsProvider>
                                                <Input ref={inputRef} {...inputProps} fullWidth
                                                    sx={{ bgcolor: 'white', padding: 'none', size: 'sm', borderRadius: 20, fontSize: 14 }}
                                                />
                                            </CssVarsProvider>
                                            {InputProps?.endAdornment}
                                        </Box>
                                    )}
                                />
                            </LocalizationProvider>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ flex: 1, pl: 2 }}>
                    {generateFlag === 1 ?
                        <Box sx={{ my: 3 }}>
                            <CssVarsProvider>
                                <Button variant="outlined"
                                    sx={{
                                        borderRadius: 20, fontSize: 14, height: 40, width: 150, bgcolor: '#1976d2', color: 'white',
                                        ":hover": {
                                            bgcolor: '#1565c0', color: 'white'
                                        }
                                    }}
                                    // startDecorator={< PeopleAltIcon sx={{ color: 'white', cursor: 'pointer', height: 25, width: 30 }} fontSize='large' />}
                                    onClick={GenerateOpPatients}
                                >Generate
                                </Button>
                            </CssVarsProvider>
                        </Box>
                        : <Box sx={{ my: 3 }}>
                            <CssVarsProvider>
                                <Button variant="outlined"
                                    sx={{
                                        borderRadius: 20, fontSize: 14, height: 40, width: 150, bgcolor: '#1976d2', color: 'white',
                                        ":hover": {
                                            bgcolor: '#1565c0', color: 'white'
                                        }
                                    }}
                                    onClick={SearchDetails}
                                >Search</Button>
                            </CssVarsProvider>
                        </Box>}
                </Box>
                <Box sx={{ flex: 1 }}></Box>
            </Paper >
            <>
                {searchFlag === 1 ?
                    <OPConsultationWaitingReport tableData={tableData} />
                    : null}
            </>
        </Paper >
    )
}
export default memo(WaitingTimeReport)