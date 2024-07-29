import { Box, Button, CssVarsProvider, Input, Typography } from '@mui/joy'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { getQltyDept } from 'src/redux/actions/QualityIndicatorDept.action';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Paper } from '@mui/material';
import { eachDayOfInterval, format } from 'date-fns';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import { infoNotify } from '../Common/CommonCode';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import DepartmentSelectForQuality from '../CommonSelectCode/DepartmentSelectForQuality';
import EndoDayWiseReport from './EndoscopyQIMarking/DayWiseReport/EndoDayWiseReport';
import { axioslogin } from '../Axios/Axios';
import { EndoscopyMonthlyReportView } from './EndoscopyQIMarking/MonthlyReport/MonthlyReportView';
import { MonthlyReportEmer } from './EmergencyQIMarking/EmergMonthlyReport/MonthlyReportEmer';
const DaywiseQiReport = () => {
    const [qidept, setQidept] = useState(0)
    const [fromDate, setFromDate] = useState(format(new Date(), "yyyy-MM-dd"));
    const [toDate, setToDate] = useState(format(new Date(), "yyyy-MM-dd"));
    const [searchFlag, setsearchFlag] = useState(0)
    const [qitype, setQitype] = useState(0)
    const [viewData, setviewData] = useState([])
    // dayflag for day wise report(initial assessmnet,1) or monthly report(monthly report,2)
    const [dayFlag, setDayFlag] = useState(0)
    const [equipmentlist, setEquipmentlist] = useState([])
    const [ipViewReport, setIpViewReport] = useState([])
    const [testCount, setTestCount] = useState(0)
    const [endoDays, setEndoDays] = useState(0)
    const dispatch = useDispatch()
    const history = useHistory()

    const backtoHome = useCallback(() => {
        history.push('/Home')
    }, [history])

    useEffect(() => {
        dispatch(getQltyDept())
    }, [dispatch])

    const SearchReport = useCallback(() => {
        if (qitype === 0) {
            infoNotify('Select Department')
            setsearchFlag(0)
        }
        else {
            const searchDatas = {
                from: format(new Date(fromDate), 'yyyy-MM-dd 00:00:00'),
                to: format(new Date(toDate), 'yyyy-MM-dd 23:59:59')
            }
            // emdoscopy
            if (qitype === 1) {
                setDayFlag(1)
                const ViewReport = async (setviewData, setIpViewReport) => {
                    await EndoscopyMonthlyReportView(searchDatas, setviewData, setsearchFlag, setIpViewReport)
                }
                ViewReport(setviewData, setIpViewReport)

                var dayList = eachDayOfInterval({ start: new Date(fromDate), end: new Date(toDate) })
                const days = dayList?.map((val) => {
                    return {
                        day: format(new Date(val), 'dd-MM-yyyy')
                    }
                })
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

                // emergency
            } else if (qitype === 2) {
                const ViewReport = async (setviewData) => {
                    await MonthlyReportEmer(searchDatas, setviewData, setsearchFlag)
                }
                ViewReport(setviewData)
            }


        }
    }, [fromDate, toDate, qitype, qidept])

    return (
        <Box sx={{ maxHeight: window.innerHeight - 70 }}>
            <Paper variant='outlined' square sx={{ display: 'flex', flex: 1, height: 40 }}>
                {/* <Box sx={{ pl: 0.7, pt: 1 }} >
                        <AssessmentIcon sx={{ bgcolor: '#555830', color: 'white', height: 23, width: 23 }} />
                    </Box> */}
                <Box sx={{ flex: 1, fontSize: 16, pl: 1, pt: 1.2 }}>
                    <Typography sx={{ color: '#555830', fontFamily: 'Arial', fontWeight: 550 }}>
                        Day Wise QI Report
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', fontSize: 20, pr: 0.5, pt: 0.2 }}>
                    <HighlightOffIcon sx={{ cursor: 'pointer', height: 34, width: 34, color: '#bf360c', opacity: 0.7 }}
                        onClick={backtoHome} />
                </Box>
            </Paper>
            <Paper variant='outlined' square sx={{ display: 'flex', flex: 1, pr: 1, pb: 0.5, flexWrap: 'wrap' }}>
                <Box sx={{ flex: 0.3 }} ></Box>
                <Box sx={{ flex: 1.2, }}>
                    <Box sx={{ pt: 1, pl: 1 }}>
                        <Typography sx={{ fontSize: 13, textTransform: 'uppercase' }}>Department</Typography>
                    </Box>
                    <Box sx={{ pt: 0.5 }}>
                        <DepartmentSelectForQuality qidept={qidept} setQidept={setQidept} setQitype={setQitype} setsearchFlag={setsearchFlag} />
                    </Box>
                </Box>
                <Box sx={{ flex: 0.5 }}>
                    <Box sx={{ pt: 1, pl: 2 }}>
                        <Typography sx={{ fontSize: 13, textTransform: 'uppercase' }}>From</Typography>
                    </Box>
                    <Box sx={{ pt: 0.5, pl: 0.5 }}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                value={fromDate}
                                views={['year', 'month', 'day']}
                                size="sm"
                                inputFormat='dd-MM-yyyy'
                                maxDate={new Date()}
                                onChange={(newValue) => {
                                    setFromDate(newValue);
                                    setsearchFlag(0)
                                }}
                                renderInput={({ inputRef, inputProps, InputProps }) => (
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <CssVarsProvider>
                                            <Input ref={inputRef} {...inputProps} fullWidth
                                                sx={{ bgcolor: 'white', padding: 'none', size: 'sm' }}
                                            />
                                        </CssVarsProvider>
                                        {InputProps?.endAdornment}
                                    </Box>
                                )}
                            />
                        </LocalizationProvider>
                    </Box>
                </Box>
                <Box sx={{ flex: 0.5, pl: 0.2 }}>
                    <Box sx={{ pt: 1, pl: 2 }}>
                        <Typography sx={{ fontSize: 13, textTransform: 'uppercase' }}>To</Typography>
                    </Box>
                    <Box sx={{ pt: 0.5, pl: 0.5 }}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                value={toDate}
                                views={['year', 'month', 'day']}
                                size="sm"
                                inputFormat='dd-MM-yyyy'
                                maxDate={new Date()}
                                onChange={(newValue) => {
                                    setToDate(newValue);
                                    setsearchFlag(0)
                                }}
                                renderInput={({ inputRef, inputProps, InputProps }) => (
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <CssVarsProvider>
                                            <Input ref={inputRef} {...inputProps} fullWidth
                                                sx={{ bgcolor: 'white', padding: 'none', size: 'sm' }}
                                            />
                                        </CssVarsProvider>
                                        {InputProps?.endAdornment}
                                    </Box>
                                )}
                            />
                        </LocalizationProvider>
                    </Box>
                </Box>
                <Box sx={{ flex: 0.5, pt: 4, pl: 1 }} >
                    <CssVarsProvider>
                        <Button variant="outlined" color="neutral" size="sm"
                            sx={{ height: 36, width: 150, display: 'flex', justifyContent: 'flex-start' }}
                            startDecorator={< ContentPasteSearchIcon sx={{ color: '#555830', cursor: 'pointer', height: 25, width: 30 }} fontSize='large' />}
                            onClick={SearchReport}
                        >SEARCH
                        </Button>
                    </CssVarsProvider>
                </Box>
                <Box sx={{ flex: 0.3 }} ></Box>
            </Paper>
            <Box>
                {searchFlag === 1 ?
                    <>
                        {qitype === 1 ?
                            <EndoDayWiseReport viewData={viewData} qitype={qitype} dayFlag={dayFlag} fromDate={fromDate}
                                testCount={testCount} equipmentlist={equipmentlist} endoDays={endoDays}
                                ipViewReport={ipViewReport} />
                            : null}
                    </>
                    : null}
            </Box>
        </Box >
    )
}

export default memo(DaywiseQiReport)