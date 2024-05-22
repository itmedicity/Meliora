
import { Typography, Box, CssVarsProvider, Tooltip } from '@mui/joy'
import { Paper, TextField } from '@mui/material'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { endOfMonth, format, startOfMonth } from 'date-fns';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import ManageSearchTwoToneIcon from '@mui/icons-material/ManageSearchTwoTone';
import EndoMonthlyReport from './EndoscopyQIMarking/EndoMonthlyReport'
import { infoNotify } from '../Common/CommonCode';
import { useDispatch } from 'react-redux';
import { getQltyDept } from 'src/redux/actions/QualityIndicatorDept.action';
import DepartmentSelectForQuality from '../CommonSelectCode/DepartmentSelectForQuality';
import EmergencyMonthlyReport from './EmergencyQIMarking/EmergencyMonthlyReport';
import { MonthlyReportView } from './CommonComponents/MonthlyReportView';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const MonthlyReport = () => {
    const [qidept, setQidept] = useState(0)
    const [searchDate, setSearchDate] = useState(format(new Date(), "yyyy-MM-dd"));
    const [searchFlag, setsearchFlag] = useState(0)
    const [qitype, setQitype] = useState(0)
    const [viewData, setviewData] = useState([])
    const [dayFlag, setDayFlag] = useState(0)
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
            const ViewReport = async (setviewData) => {
                await MonthlyReportView(searchDatas, qitype, setviewData, setsearchFlag)
            }
            ViewReport(setviewData)
            setDayFlag(2)
        }
    }, [searchDate, qitype])

    return (
        <Box sx={{ maxHeight: window.innerHeight - 70 }}>
            <Paper variant='outlined' square sx={{ display: 'flex', flex: 1, height: 40 }}>
                <Box sx={{ pl: 0.7, pt: 1 }} >
                    <AssessmentOutlinedIcon sx={{ color: '#827717', height: 26, width: 26 }} />
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
            <Paper variant='outlined' square sx={{ display: 'flex', pr: 1, pb: 1 }}>
                <Box sx={{ flex: 0.5 }} ></Box>
                <Box sx={{ flex: 1, }}>
                    <Box sx={{ pt: 1, pl: 2 }}>
                        <Typography sx={{ fontSize: 13, textTransform: 'uppercase' }}>Department</Typography>
                    </Box>
                    <Box sx={{ pt: 0.5 }}>
                        <DepartmentSelectForQuality qidept={qidept} setQidept={setQidept} setQitype={setQitype} setsearchFlag={setsearchFlag} />
                    </Box>
                </Box>
                <Box sx={{ flex: 1 }} >
                    <Box sx={{ pt: 1, pl: 2 }}>
                        <Typography sx={{ fontSize: 13, textTransform: 'uppercase' }}>Month</Typography>
                    </Box>
                    <Box sx={{ pt: 0.5, pl: 0.5 }}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                value={searchDate}
                                views={['year', 'month']}
                                size="sm"
                                inputFormat='MMM-yyyy'
                                onChange={(newValue) => {
                                    setSearchDate(newValue);
                                    setsearchFlag(0)
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
                <Box sx={{ flex: 0.2, pt: 4, pl: 2 }} >
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
            <Box>
                {searchFlag === 1 ?
                    <>
                        {qitype === 1 ?
                            <EndoMonthlyReport viewData={viewData} searchDate={searchDate} dayFlag={dayFlag} />
                            : qitype === 2 ? < EmergencyMonthlyReport viewData={viewData} />
                                : null}
                    </> : null}
            </Box>
        </Box >
    )
}

export default memo(MonthlyReport)