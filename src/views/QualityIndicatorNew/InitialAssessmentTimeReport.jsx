import React, { Fragment, memo, useCallback, useEffect, useMemo, useState } from 'react'
import { Box, CssVarsProvider, Tooltip, Typography } from '@mui/joy'
import { Paper, TextField } from '@mui/material'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import { infoNotify } from '../Common/CommonCode';
import { endOfMonth, format, startOfMonth } from 'date-fns';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import { useDispatch } from 'react-redux';
import { getQltyDept } from 'src/redux/actions/QualityIndicatorDept.action';
import EndosWaitingTimeReport from './EndoscopyQIMarking/EndosWaitingTimeReport'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ReturnPatientReport from './EmergencyQIMarking/ReturnPatientReport';
import QiDeptInitailassessmentSelect from '../CommonSelectCode/QiDeptInitailassessmentSelect';
import { MonthlyReportView } from './CommonComponents/MonthlyReportView';
const InitialAssessmentTimeReport = () => {
    const [qidept, setQidept] = useState(0)
    const [searchDate, setSearchDate] = useState(format(new Date(), "yyyy-MM-dd"));
    const [searchFlag, setsearchFlag] = useState(0)
    const [viewData, setviewData] = useState([])
    const [qitype, setQitype] = useState(0)
    const [returnflag, setReturnflag] = useState(0)
    const history = useHistory()
    const [reportSelect, setReportSelect] = useState(0)
    const dispatch = useDispatch()


    const reportType = useMemo(() => {
        return [
            { label: 'INITIAL ASSESSMENT', id: 1 },
            { label: 'RETURN REPORT', id: 2 }
        ]
    }, [])
    const backtoHome = useCallback(() => {
        history.push('/Home')
    }, [history])
    useEffect(() => {
        dispatch(getQltyDept())
    }, [dispatch])
    const ReportChange = useCallback((e) => {
        setReportSelect(e.target.value)
    }, [])
    const SearchMonthlyTimeReport = useCallback(async () => {
        if (qitype === 0) {
            infoNotify('Select Department')
            setsearchFlag(0)
        }
        else {
            const searchDatas = {
                from: format(startOfMonth(new Date(searchDate)), 'yyyy-MM-dd 00:00:00'),
                to: format(endOfMonth(new Date(searchDate)), 'yyyy-MM-dd 23:59:59')
            }
            const ViewReport = async (setviewData) => {
                await MonthlyReportView(searchDatas, qitype, setviewData, setsearchFlag)
            }
            ViewReport(setviewData)
            if (reportSelect === "2") {
                setReturnflag(1)
            } else {
                setReturnflag(0)
            }
        }

    }, [qitype, searchDate, reportSelect])
    return (
        <Fragment>
            <Box sx={{ display: 'flex', maxHeight: window.innerHeight - 70 }}>
                <Box sx={{ flex: 0.2 }}></Box>
                <Paper variant='outlined' square sx={{ flex: 1 }} >
                    <Box sx={{ display: 'flex', flex: 1, height: 40, pb: 1 }}>
                        <Box sx={{ pl: 0.7, pt: 0.8 }} >
                            <TimerOutlinedIcon sx={{ color: '#827717', height: 30, width: 30, }} />
                        </Box>
                        <Box sx={{ flex: 1, fontSize: 16, pl: 2, pt: 1.3 }}>
                            {qitype === 1 ?
                                <Typography sx={{ color: '#104D4D', fontFamily: 'Arial', fontSize: 14, textTransform: 'uppercase', fontWeight: 550 }}>
                                    Waiting Time for services diagnostics
                                </Typography>
                                : qitype === 2 ?
                                    <>
                                        {returnflag === 1 ?
                                            <Typography sx={{ color: '#104D4D', fontFamily: 'Arial', fontSize: 14, textTransform: 'uppercase', fontWeight: 550 }}>
                                                Return to emergency department within 72 Hrs with similar presenting complaints
                                            </Typography>
                                            :
                                            <Typography sx={{ color: '#104D4D', fontFamily: 'Arial', fontSize: 14, textTransform: 'uppercase', fontWeight: 550 }}>
                                                Time Taken For Initial Assessment Of Patient
                                            </Typography>
                                        }
                                    </>
                                    : null}

                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', fontSize: 20, pr: 0.5, pt: 0.2 }}>
                            <CssVarsProvider>
                                <Tooltip title="Close" placement='bottom'>
                                    <HighlightOffIcon sx={{ cursor: 'pointer', height: 32, width: 32, color: '#bf360c', opacity: 0.6 }}
                                        onClick={backtoHome} />
                                </Tooltip>
                            </CssVarsProvider>
                        </Box>
                    </Box>
                    <Paper variant='outlined' square sx={{ display: 'flex', pb: 0.5 }}>
                        <Box sx={{ flex: 1, pl: 2 }}>
                            <Box sx={{ pt: 1, pl: 2 }}>
                                <Typography sx={{ fontSize: 13, textTransform: 'uppercase' }}>Department</Typography>
                            </Box>
                            <Box sx={{ pt: 0.5 }}>
                                <QiDeptInitailassessmentSelect qidept={qidept} setQidept={setQidept} setQitype={setQitype}
                                    setsearchFlag={setsearchFlag} setReturnflag={setReturnflag}
                                />
                            </Box>
                        </Box>
                        <Box sx={{ flex: 1 }} >
                            <Box sx={{ pt: 1, pl: 2 }}>
                                <Typography sx={{ fontSize: 13, textTransform: 'uppercase' }}>Month</Typography>
                            </Box>
                            <Box sx={{ pt: 0.5, pl: 0.3 }}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        value={searchDate}
                                        views={['year', 'month']}
                                        size="sm"
                                        inputFormat='MMM-yyyy'
                                        onChange={(newValue) => {
                                            setSearchDate(newValue);
                                            setsearchFlag(0)
                                            setReturnflag(0)
                                        }}
                                        renderInput={(params) => (
                                            <TextField {...params} helperText={null} size='small' fullWidth
                                                sx={{ bgcolor: 'white', borderRadius: 0, pt: 0.5 }}
                                            />
                                        )}
                                    />
                                </LocalizationProvider>
                            </Box>
                        </Box>
                        {qitype === 2 ?
                            <Box sx={{ flex: 0.4, pt: 3.8, pl: 0.3 }} >
                                <select
                                    variant="outlined"
                                    style={{
                                        height: 46, width: 200, paddingLeft: 7, borderRadius: 5,
                                        border: '1px solid lightgrey', fontSize: 13
                                    }}
                                    name="reportSelect"
                                    value={reportSelect}
                                    onChange={ReportChange}
                                >
                                    < option value={0}>--SELECT--</option>
                                    {
                                        reportType?.map((val, ind) => {
                                            return <option key={ind} value={val.id}>{val.label}</option>
                                        })
                                    }
                                </select>
                            </Box>
                            : null}
                        <Box sx={{ flex: 0.2, pt: 4.5, pl: 1 }} >
                            <CssVarsProvider>
                                <Tooltip title="Search" placement='right'>
                                    < SearchTwoToneIcon sx={{ color: '#555830', cursor: 'pointer', height: 40, width: 40 }}
                                        onClick={SearchMonthlyTimeReport}
                                    />
                                </Tooltip>
                            </CssVarsProvider>
                        </Box>
                    </Paper>
                    <Box>
                        {searchFlag === 1 ?
                            <>
                                {qitype === 1 ?
                                    <EndosWaitingTimeReport viewData={viewData} searchDate={searchDate} qitype={qitype} />
                                    : qitype === 2 ?
                                        <>
                                            {returnflag === 1 ?
                                                <ReturnPatientReport viewData={viewData} searchDate={searchDate} />
                                                : <EndosWaitingTimeReport viewData={viewData} searchDate={searchDate} qitype={qitype} />

                                            }
                                        </>
                                        : null}
                            </> : null}
                    </Box>
                </Paper >
                <Box sx={{ flex: 0.2 }}></Box>

            </Box >
        </Fragment >
    )
}
export default memo(InitialAssessmentTimeReport)