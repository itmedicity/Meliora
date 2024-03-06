import { Box, CssVarsProvider, Tooltip, Typography } from '@mui/joy'
import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import CloseIcon from '@mui/icons-material/Close';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import { Paper } from '@mui/material';
import CusIconButton from 'src/views/Components/CusIconButton';
import moment from 'moment';
import { eachDayOfInterval, endOfMonth, startOfMonth } from 'date-fns';
import { axioslogin } from 'src/views/Axios/Axios';
import DailyReportOfQI from '../FunctionalComponents/DailyReportOfQI';
import { infoNotify } from 'src/views/Common/CommonCode';

const EmergencyDailyReport = ({ setReportViewFlag, qltyDept, processDate }) => {
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
        const dateName = eachDayOfInterval({ start: new Date(startDate), end: new Date(endDate) });
        const daylist = dateName?.map((val) => moment(val).format('DD-MM-YYYY'))
        const getqualityindicators = async (qltyDept) => {
            const result = await axioslogin.get(`/qiendoscopy/getqi/${qltyDept}`)
            return result.data
        }
        getqualityindicators(qltyDept).then((value) => {
            const { success, data } = value
            if (success === 1) {
                setIndicatorList(data)
                const getEmergencyReport = async (searchdata) => {
                    const result = await axioslogin.post('/qiemergency/emerReport', searchdata)
                    const { success, data } = result.data
                    if (success === 1) {
                        const resultArray = daylist?.map((day) => {
                            const reportArray = data.find((val) => moment(val.qi_emergency_date).format('DD-MM-YYYY') === day)
                            return {
                                date: day,
                                total_patients: reportArray ? reportArray.total_patients : 0,
                                total_time_taken: reportArray ? reportArray.total_time_taken : 0,
                                total_patients_return: reportArray ? reportArray.total_patients_return : 0,
                            }
                        })
                        setreportData(resultArray)
                    }
                    else {
                        setreportData([])
                    }
                }
                getEmergencyReport(searchdata)
            }
            else {
                setIndicatorList([])
                setreportData([])
            }
        })
    }, [qltyDept, searchdata, startDate, endDate])
    const Reportview = useCallback((qi_slno, qi_name) => {
        if (reportData.length !== 0) {
            setReportName(qi_name)
            if (qi_slno === 8) {
                const resultArray = reportData?.map((val, index) => {
                    return {
                        slno: index + 1,
                        date: val.date,
                        data1: val.total_time_taken,
                        data2: val.total_patients,
                        data3: (val.total_patients !== 0 && val.total_time_taken !== 0) ?
                            (val.total_time_taken / val.total_patients).toFixed(3) : 0
                    }
                })
                setTableData(resultArray)
                setHeaderNames1('Total Sum of Time Taken for Assessment')
                setHeaderNames2('Total Number Of Patients In Indoor/Emergency')
            }
            else if (qi_slno === 9) {
                const resultArray = reportData?.map((val, index) => {
                    return {
                        slno: index + 1,
                        date: val.date,
                        data1: val.total_patients_return,
                        data2: val.total_patients,
                        data3: (val.total_patients !== 0 && val.total_patients_return !== 0) ?
                            (val.total_patients_return / val.total_patients).toFixed(3) : 0
                    }
                })
                setTableData(resultArray)
                setHeaderNames1('Total No.Of returns to emergency within 72 hrs with similar presenting complaints')
                setHeaderNames2('Total No.Of patients who have come to the emergency')
            }
            setTableFlag(1)
        }
        else {
            setTableFlag(0)
            infoNotify("No Data Found")
            setTableData([])
        }
    }, [reportData])
    return (
        <Fragment>
            <Box>
                {tableFlag === 1 ?
                    <Paper>
                        <DailyReportOfQI reportName={reportName} tableData={tableData} headerNames1={headerNames1} headerNames2={headerNames2}
                            setTableFlag={setTableFlag} setTableData={setTableData} processDate={processDate} dateRange={dateRange} />

                    </Paper> :
                    <Box sx={{ width: "100%", height: "100%" }}>
                        <Paper sx={{ display: 'flex', bgcolor: '#DBE8D8', flex: 1, height: 40 }}>
                            <Box sx={{ pt: 0.8, pl: 0.5 }} >
                                <AnalyticsOutlinedIcon sx={{ color: 'darkgreen' }} />
                            </Box>
                            <Box sx={{ flex: 1, fontSize: 17, pt: 0.8, pl: 1 }}>
                                <Typography sx={{ color: 'darkgreen', fontWeight: 550 }}>
                                    Emergency Daily Report
                                </Typography>
                            </Box>
                            <Box sx={{ flex: 2, }}>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', fontSize: 20, pt: 0.5 }}>
                                    <CusIconButton size="sm" variant="outlined" color="primary"  >
                                        <Tooltip title="Close" placement="bottom" >
                                            <CloseIcon sx={{ fontSize: 22 }} onClick={backtoHome} />
                                        </Tooltip>
                                    </CusIconButton>
                                </Box>
                            </Box>
                        </Paper>

                        <Paper sx={{ m: 0.5, pb: 0.5 }}>
                            {indicatorList?.map((val) => {
                                return (
                                    <CssVarsProvider key={val.qi_slno}>
                                        <Paper key={val.qi_slno}
                                            onClick={() => Reportview(val.qi_slno, val.qi_name)}
                                            style={{
                                                mx: 4,
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
                        </Paper>
                    </Box>
                }
            </Box>
        </Fragment>
    )
}

export default EmergencyDailyReport