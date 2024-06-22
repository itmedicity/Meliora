
import { Typography, Box, CssVarsProvider, Tooltip, Input } from '@mui/joy'
import { Paper } from '@mui/material'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { eachDayOfInterval, endOfMonth, format, startOfMonth } from 'date-fns';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import ManageSearchTwoToneIcon from '@mui/icons-material/ManageSearchTwoTone';
import { infoNotify } from '../Common/CommonCode';
import { useDispatch } from 'react-redux';
import { getQltyDept } from 'src/redux/actions/QualityIndicatorDept.action';
import { EndoscopyMonthlyReportView } from './EndoscopyQIMarking/MonthlyReport/MonthlyReportView';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import DepartmentSelectForQuality from '../CommonSelectCode/DepartmentSelectForQuality';
import EndoMonthlyReport from './EndoscopyQIMarking/MonthlyReport/EndoMonthlyReport';
import EmergencyMonthlyReport from './EmergencyQIMarking/EmergMonthlyReport/EmergencyMonthlyReport';
import { axioslogin } from '../Axios/Axios';
import { MonthlyReportEmer } from './EmergencyQIMarking/EmergMonthlyReport/MonthlyReportEmer';

const MonthlyReport = () => {
    const [qidept, setQidept] = useState(0)
    const [searchDate, setSearchDate] = useState(format(new Date(), "yyyy-MM-dd"));
    const [searchFlag, setsearchFlag] = useState(0)
    const [qitype, setQitype] = useState(0)
    // for op patient Report
    const [viewData, setviewData] = useState([])
    // monthly view dayflag is 2 (monthly Report)and date base search dayflag 1 (daywiseqi report)
    const [dayFlag, setDayFlag] = useState(0)
    // forIp Patient Report
    const [ipViewReport, setIpViewReport] = useState([])
    const [testCount, setTestCount] = useState(0)
    const [equipmentlist, setEquipmentlist] = useState([])
    const [endoDays, setEndoDays] = useState(0)
    const dispatch = useDispatch()
    const history = useHistory()

    const backtoHome = useCallback(() => {
        history.push('/Home')
    }, [history])
    useEffect(() => {
        dispatch(getQltyDept())
    }, [dispatch])
    const SearchMonthlyReport = useCallback(() => {
        if (qitype === 0) {
            infoNotify('Select Department')
            setsearchFlag(0)
        }
        else {
            const searchDatas = {
                from: format(startOfMonth(new Date(searchDate)), 'yyyy-MM-dd 00:00:00'),
                to: format(endOfMonth(new Date(searchDate)), 'yyyy-MM-dd 23:59:59')
            }
            if (qitype === 1) {
                setDayFlag(2)
                var dayList = eachDayOfInterval({ start: startOfMonth(new Date(searchDate)), end: endOfMonth(new Date(searchDate)) })
                const days = dayList?.map((val) => {
                    return {
                        day: format(new Date(val), 'dd-MM-yyyy')
                    }
                })
                const ViewReport = async (setviewData, setIpViewReport) => {
                    await EndoscopyMonthlyReportView(searchDatas, setviewData, setsearchFlag, setIpViewReport)
                }
                ViewReport(setviewData, setIpViewReport)

                const getTestCount = async (searchDatas) => {
                    const result = await axioslogin.post('/qiendoscopy/testCount', searchDatas);
                    return result.data
                }
                getTestCount(searchDatas).then((value) => {
                    const { success, data } = value
                    if (success === 1) {
                        setTestCount(data)
                        // for number of working days
                        const noEndos = days.filter((val) => {
                            return data.find((value) => format(new Date(value.endo_date), 'dd-MM-yyyy') === val.day)
                        })
                        setEndoDays(noEndos)
                    }
                })
                // for taking equpimnent count
                const getEquipment = async (qidept) => {
                    const result = await axioslogin.get(`/equipMast/active/${qidept}`)
                    const { success, data } = result.data
                    if (success === 1) {
                        setEquipmentlist(data)
                    }
                }
                getEquipment(qidept);

            } else if (qitype === 2) {
                const ViewReport = async (setviewData) => {
                    await MonthlyReportEmer(searchDatas, setviewData, setsearchFlag)
                }
                ViewReport(setviewData)
            }
        }
    }, [searchDate, qitype, qidept])

    return (
        <Box sx={{ maxHeight: window.innerHeight - 70 }}>
            <Paper variant='outlined' square sx={{ display: 'flex', flex: 1, height: 40 }}>
                <Box sx={{ pl: 0.7, pt: 1 }} >
                    <AssessmentOutlinedIcon sx={{ color: 'lightslategray', height: 26, width: 26 }} />
                </Box>
                <Box sx={{ flex: 1, fontSize: 16, pl: 1, pt: 1.2 }}>
                    <Typography sx={{ color: '#555830', fontFamily: 'Arial', fontWeight: 550 }}>
                        QI Monthly Report
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', fontSize: 20, pr: 0.5, pt: 0.2 }}>
                    <CssVarsProvider>
                        <Tooltip title="Close" placement='bottom'>
                            <HighlightOffIcon sx={{ cursor: 'pointer', height: 32, width: 32, color: '#bf360c', opacity: 0.6 }}
                                onClick={backtoHome} />
                        </Tooltip>
                    </CssVarsProvider>
                </Box>
            </Paper>
            <Paper variant='outlined' square sx={{ display: 'flex', pr: 1, pb: 0.2 }}>
                <Box sx={{ flex: 0.7 }} ></Box>
                <Box sx={{ flex: 1, }}>
                    <Box sx={{ pt: 1, pl: 1 }}>
                        <Typography sx={{ fontSize: 13, textTransform: 'uppercase' }}>Department</Typography>
                    </Box>
                    <Box sx={{ pt: 0.3 }}>
                        <DepartmentSelectForQuality qidept={qidept} setQidept={setQidept} setQitype={setQitype} setsearchFlag={setsearchFlag} />
                    </Box>
                </Box>
                <Box sx={{ flex: 0.7 }} >
                    <Box sx={{ pt: 1, pl: 1 }}>
                        <Typography sx={{ fontSize: 13, textTransform: 'uppercase' }}>Month</Typography>
                    </Box>
                    <Box sx={{ pt: 0.3, pl: 0.3 }}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                value={searchDate}
                                views={['year', 'month']}
                                size="sm"
                                inputFormat='MMM-yyyy'
                                maxDate={new Date()}
                                onChange={(newValue) => {
                                    setSearchDate(newValue);
                                    setsearchFlag(0)
                                }}
                                renderInput={({ inputRef, inputProps, InputProps }) => (
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <CssVarsProvider>
                                            <Input ref={inputRef} {...inputProps} fullWidth
                                                sx={{ bgcolor: 'white', padding: 'none', size: 'sm' }}
                                                disabled={true} />
                                        </CssVarsProvider>
                                        {InputProps?.endAdornment}
                                    </Box>
                                )}
                            />
                        </LocalizationProvider>
                    </Box>
                </Box>
                <Box sx={{ flex: 0.5, pt: 3.5, pl: 2 }} >
                    <CssVarsProvider>
                        <Tooltip title="Search" placement='right'>
                            < ManageSearchTwoToneIcon sx={{ color: '#555830', cursor: 'pointer', height: 40, width: 40 }} fontSize='large'
                                onClick={SearchMonthlyReport}
                            />
                        </Tooltip>
                    </CssVarsProvider>
                </Box>
                <Box sx={{ flex: 0.5 }}></Box>
            </Paper >
            <Box sx={{ bgcolor: '#b0bec5' }}>
                {searchFlag === 1 ?
                    <>
                        {qitype === 1 ?
                            <EndoMonthlyReport viewData={viewData} ipViewReport={ipViewReport} searchDate={searchDate}
                                dayFlag={dayFlag} testCount={testCount} equipmentlist={equipmentlist} endoDays={endoDays}
                            />
                            : qitype === 2 ?
                                < EmergencyMonthlyReport viewData={viewData} searchDate={searchDate} dayFlag={dayFlag} />
                                : null}
                    </> : null}
            </Box>
        </Box >
    )
}

export default memo(MonthlyReport)