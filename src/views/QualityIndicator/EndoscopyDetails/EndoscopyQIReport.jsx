import { Box, CssVarsProvider, Tooltip, Typography } from '@mui/joy'
import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import CloseIcon from '@mui/icons-material/Close';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import { Paper } from '@mui/material';
import CusIconButton from 'src/views/Components/CusIconButton';
import { axioslogin } from 'src/views/Axios/Axios';
import moment from 'moment';
import { eachDayOfInterval, endOfMonth, startOfMonth } from 'date-fns';
import { infoNotify } from 'src/views/Common/CommonCode';
import DailyReportOfQI from '../FunctionalComponents/DailyReportOfQI';

const EndoscopyQIReport = ({ setReportViewFlag, qltyDept, processDate }) => {

    const [indicatorList, setIndicatorList] = useState([])
    const [reportData, setreportData] = useState([])
    const [reportName, setReportName] = useState('')
    const [tableData, setTableData] = useState([])
    const [headerNames1, setHeaderNames1] = useState([])
    const [headerNames2, setHeaderNames2] = useState([])
    const [tableFlag, setTableFlag] = useState(0)
    const history = useHistory()
    const backtoHome = useCallback(() => {
        setreportData([])
        setReportViewFlag(0)
        setIndicatorList([])
        history.push('/Home/QIDailyReport')

    }, [history, setReportViewFlag])

    var startDate = moment(startOfMonth(new Date(processDate))).format('YYYY-MM-DD')
    var endDate = moment(endOfMonth(new Date(processDate))).format('YYYY-MM-DD')
    const dateRange = eachDayOfInterval({ start: new Date(startDate), end: new Date(endDate) });

    const searchdata = useMemo(() => {
        return {
            from: startDate,
            to: endDate
        }
    }, [startDate, endDate])

    useEffect(() => {
        const daylist = dateRange?.map((val) => moment(val).format('DD-MM-YYYY'))
        const getqualityindicators = async (qltyDept) => {
            const result = await axioslogin.get(`/qiendoscopy/getqi/${qltyDept}`)
            return result.data
        }
        getqualityindicators(qltyDept).then((value) => {
            const { success, data } = value
            if (success === 1) {
                setIndicatorList(data)
                const getEndoscopyReport = async (searchdata) => {
                    const result = await axioslogin.post('/qiendoscopy/endoReport', searchdata)
                    const { success, data } = result.data
                    if (success === 1) {
                        const resultArray = daylist?.map((day) => {
                            const reportArray = data.find((val) => moment(val.qi_date).format('DD-MM-YYYY') === day)
                            return {
                                date: day,
                                total_patients: reportArray ? reportArray.total_patients : 0,
                                total_error_report: reportArray ? reportArray.total_error_report : 0,
                                total_redose: reportArray ? reportArray.total_redose : 0,
                                total_sumof_time: reportArray ? reportArray.total_sumof_time : 0,
                                total_ident_error: reportArray ? reportArray.total_ident_error : 0,
                                total_falls: reportArray ? reportArray.total_falls : 0,
                                total_sentinels_analyse: reportArray ? reportArray.total_sentinels_analyse : 0,
                                total_sentinels_collect: reportArray ? reportArray.total_sentinels_collect : 0,
                                total_near_misses: reportArray ? reportArray.total_near_misses : 0,
                                total_incidents: reportArray ? reportArray.total_incidents : 0,
                            }
                        })
                        setreportData(resultArray)
                    }
                    else {
                        setreportData([])
                    }
                }
                getEndoscopyReport(searchdata)
            }
            else {
                setIndicatorList([])
                setreportData([])
            }
        })
    }, [dateRange, qltyDept, searchdata])

    const Reportview = useCallback((qi_slno, qi_name) => {
        if (reportData.length !== 0) {
            setReportName(qi_name)
            if (qi_slno === 1) {
                const resultArray = reportData?.map((val, index) => {
                    return {
                        slno: index + 1,
                        date: val.date,
                        data1: val.total_error_report,
                        data2: val.total_patients,
                        data3: (val.total_patients !== 0 && val.total_error_report) ?
                            (val.total_error_report / val.total_patients).toFixed(3) : 0
                    }

                })
                setTableData(resultArray)
                setHeaderNames1('Total Number of Reporting Errors')
                setHeaderNames2('Total Number Of Tests Performed')
            }
            else if (qi_slno === 2) {
                const resultArray = reportData?.map((val, index) => {
                    return {
                        slno: index + 1,
                        date: val.date,
                        data1: val.total_redose,
                        data2: val.total_patients,
                        data3: (val.total_patients !== 0 && val.total_redose !== 0) ?
                            (val.total_redose / val.total_patients).toFixed(3) : 0
                    }

                })
                setTableData(resultArray)
                setHeaderNames1('Total Number of Re dos')
                setHeaderNames2('Total Number Of Tests Performed')
            }
            else if (qi_slno === 3) {
                const resultArray = reportData?.map((val, index) => {
                    return {
                        slno: index + 1,
                        date: val.date,
                        data1: val.total_sumof_time,
                        data2: val.total_patients,
                        data3: (val.total_patients !== 0 && val.total_sumof_time !== 0) ?
                            (val.total_sumof_time / val.total_patients).toFixed(3) : 0
                    }

                })
                setTableData(resultArray)
                setHeaderNames1('Total Sum of Time')
                setHeaderNames2('Total Number Of Patients Reported')
            }

            else if (qi_slno === 4) {
                const resultArray = reportData?.map((val, index) => {
                    return {
                        slno: index + 1,
                        date: val.date,
                        data1: val.total_ident_error,
                        data2: val.total_patients,
                        data3: (val.total_patients !== 0 && val.total_ident_error !== 0) ?
                            (val.total_ident_error / val.total_patients).toFixed(3) : 0
                    }

                })
                setTableData(resultArray)
                setHeaderNames1('Total Number of Patient Identification Errors')
                setHeaderNames2('Total Number Of Patients')
            }

            else if (qi_slno === 5) {
                const resultArray = reportData?.map((val, index) => {
                    return {
                        slno: index + 1,
                        date: val.date,
                        data1: val.total_falls,
                        data2: val.total_patients,
                        data3: (val.total_patients !== 0 && val.total_falls !== 0) ?
                            (val.total_falls / val.total_patients).toFixed(3) : 0
                    }

                })
                setTableData(resultArray)
                setHeaderNames1('Total Number of Falls')
                setHeaderNames2('Total Number Of Patient days')
            }
            else if (qi_slno === 6) {
                const resultArray = reportData?.map((val, index) => {
                    return {
                        slno: index + 1,
                        date: val.date,
                        data1: val.total_sentinels_analyse,
                        data2: val.total_sentinels_collect,
                        data3: (val.total_sentinels_analyse !== 0 && val.total_sentinels_collect !== 0) ?
                            (val.total_sentinels_analyse / val.total_sentinels_collect).toFixed(3) : 0
                    }

                })
                setTableData(resultArray)
                setHeaderNames1('Total Number of sentinel events analyzed within the defined time frame')
                setHeaderNames2('Total Number Of sentinel event reported/collected')
            }
            else {
                const resultArray = reportData?.map((val, index) => {
                    return {
                        slno: index + 1,
                        date: val.date,
                        data1: val.total_near_misses,
                        data2: val.total_incidents,
                        data3: (val.total_near_misses !== 0 && val.total_incidents !== 0) ?
                            (val.total_near_misses / val.total_incidents).toFixed(3) : 0
                    }

                })
                setTableData(resultArray)
                setHeaderNames1('Total Number of near misses reported')
                setHeaderNames2('Total Number Of incidents reported')
            }
            setTableFlag(1)
        }
        else {
            setTableFlag(0)
            infoNotify("No Data Found")
            setTableData([])
        }
        // setModalOpen(true)
    }, [reportData])

    return (
        <Fragment>
            <Box>
                {tableFlag === 1 ?
                    <Paper>
                        <DailyReportOfQI reportName={reportName} tableData={tableData} headerNames1={headerNames1} headerNames2={headerNames2}
                            setTableFlag={setTableFlag} setTableData={setTableData} dateRange={dateRange} processDate={processDate} />

                    </Paper> :
                    <Box sx={{ width: "100%", height: "100%" }}>
                        <Paper sx={{ display: 'flex', bgcolor: '#DBE8D8', flex: 1, height: 40 }}>
                            <Box sx={{ pt: 0.8, pl: 0.5 }} >
                                <AnalyticsOutlinedIcon sx={{ color: 'darkgreen' }} />
                            </Box>
                            <Box sx={{ flex: 1, fontSize: 17, pt: 0.8, pl: 1 }}>
                                <Typography sx={{ color: 'darkgreen', fontWeight: 550 }}>
                                    Endoscopy Daily Report
                                </Typography>
                            </Box>
                            <Box sx={{ flex: 2, }}>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', fontSize: 20 }}>
                                    <CusIconButton size="sm" variant="outlined" color="primary"  >
                                        <Tooltip title="Close" placement="bottom" >
                                            <CloseIcon sx={{ fontSize: 22 }} onClick={backtoHome} />
                                        </Tooltip>
                                    </CusIconButton>
                                </Box>
                            </Box>
                        </Paper>

                        <Paper>
                            <Box sx={{ m: 1, pb: 0.5 }}>
                                {indicatorList?.map((val) => {
                                    return (
                                        <CssVarsProvider key={val.qi_slno}>
                                            <Paper key={val.qi_slno}
                                                onClick={() => Reportview(val.qi_slno, val.qi_name)}
                                                style={{

                                                    margin: '6px',
                                                    padding: '10px',
                                                    backgroundColor: '#f5f5f5',
                                                    border: 'none',
                                                    borderRadius: '5px',
                                                    cursor: 'pointer',
                                                    textTransform: 'capitalize',
                                                    color: '#004d40',
                                                    fontSize: 16,

                                                }}
                                            >{val.qi_name}

                                            </Paper>
                                        </CssVarsProvider>
                                    )
                                })}
                            </Box>
                        </Paper>
                    </Box>

                }
                {/* 
                {tableFlag === 1 ? <Paper>

                    <DailyReportOfQI reportName={reportName} tableData={tableData} headerNames1={headerNames1} headerNames2={headerNames2}
                        setTableFlag={setTableFlag} setTableData={setTableData} dateRange={dateRange} processDate={processDate} /> */}

                {/* <CssVarsProvider>
                        <ReportModal open={modalopen} handleClose={handleClose} reportName={reportName} tableData={tableData}
                            headerNames1={headerNames1} headerNames2={headerNames2}
                        />
                    </CssVarsProvider> */}
                {/* </Paper> : */}

            </Box>
        </Fragment>
    )
}

export default EndoscopyQIReport