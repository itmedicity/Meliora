import { Box, Button, CssVarsProvider, Typography } from '@mui/joy'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { getQltyDept } from 'src/redux/actions/QualityIndicatorDept.action';
import DepartmentSelectForQuality from '../CommonSelectCode/DepartmentSelectForQuality';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Paper, TextField } from '@mui/material';
import { format } from 'date-fns';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import { MonthlyReportView } from './CommonComponents/MonthlyReportView';
import { infoNotify } from '../Common/CommonCode';
import EndoDayWiseReport from './EndoscopyQIMarking/EndoDayWiseReport';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
const DaywiseQiReport = () => {
    const [qidept, setQidept] = useState(0)
    const [fromDate, setFromDate] = useState(format(new Date(), "yyyy-MM-dd"));
    const [toDate, setToDate] = useState(format(new Date(), "yyyy-MM-dd"));
    const [searchFlag, setsearchFlag] = useState(0)
    const [qitype, setQitype] = useState(0)
    const [viewData, setviewData] = useState([])
    // dayflag for day wise report(initial assessmnet,1) or monthly report(monthly report,2)
    const [dayFlag, setDayFlag] = useState(0)
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
            const ViewReport = async (setviewData) => {
                await MonthlyReportView(searchDatas, qitype, setviewData, setsearchFlag)
            }
            ViewReport(setviewData)
            setDayFlag(1)
        }
    }, [fromDate, toDate, qitype])

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
            <Paper variant='outlined' square sx={{ display: 'flex', pr: 1, pb: 0.5 }}>
                <Box sx={{ flex: 0.5 }} ></Box>
                <Box sx={{ flex: 1, }}>
                    <Box sx={{ pt: 1, pl: 1 }}>
                        <Typography sx={{ fontSize: 13, textTransform: 'uppercase' }}>Department</Typography>
                    </Box>
                    <Box sx={{ pt: 0.5 }}>
                        <DepartmentSelectForQuality qidept={qidept} setQidept={setQidept} setQitype={setQitype} setsearchFlag={setsearchFlag} />
                    </Box>
                </Box>
                <Box sx={{ flex: 0.7 }}>
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
                                onChange={(newValue) => {
                                    setFromDate(newValue);
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
                <Box sx={{ flex: 0.7 }}>
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
                                onChange={(newValue) => {
                                    setToDate(newValue);
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
                <Box sx={{ flex: 0.5, pt: 4, pl: 1 }} >
                    <CssVarsProvider>
                        <Button variant="outlined" color="neutral" size="sm"
                            sx={{ height: 45, width: 150, display: 'flex', justifyContent: 'flex-start' }}
                            startDecorator={< ContentPasteSearchIcon sx={{ color: '#555830', cursor: 'pointer', height: 25, width: 30 }} fontSize='large' />}
                            onClick={SearchReport}
                        >SEARCH
                        </Button>
                    </CssVarsProvider>
                </Box>
                <Box sx={{ flex: 0.5 }} ></Box>
            </Paper>
            <Box>
                {searchFlag === 1 ?
                    <>
                        {qitype === 1 ?
                            <EndoDayWiseReport viewData={viewData} qitype={qitype} dayFlag={dayFlag} fromDate={fromDate} />
                            : null}
                    </>
                    : null}
            </Box>
        </Box >
    )
}

export default memo(DaywiseQiReport)