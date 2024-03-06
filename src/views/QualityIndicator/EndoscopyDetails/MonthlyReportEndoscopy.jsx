import { Box, Tooltip, Typography } from '@mui/joy'
import { Paper } from '@mui/material'
import React, { Fragment, memo, useCallback, useEffect, useMemo, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import CusIconButton from 'src/views/Components/CusIconButton';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { axioslogin } from 'src/views/Axios/Axios';
import moment from 'moment';
import { endOfMonth, startOfMonth } from 'date-fns';
import TextFieldCustom from 'src/views/Components/TextFieldCustom';

const MonthlyReportEndoscopy = ({ setMonthlyViewFlag, processDate }) => {

    const history = useHistory()
    const backtoHome = useCallback(() => {
        setMonthlyViewFlag(0)
        history.push('/Home/QIMonthlyReport')

    }, [history, setMonthlyViewFlag])
    const [endoTotal, setEndoTotal] = useState({
        toterror: 0,
        totpatients: 0,
        totRedos: 0,
        sumofTime: 0,
        identError: 0,
        totFalls: 0,
        totsentinelAnalyse: 0,
        totsentinelCollect: 0,
        totnearMisses: 0,
        totalIncidents: 0
    })

    const { totpatients, toterror, totRedos, sumofTime, identError, totFalls, totsentinelAnalyse,
        totsentinelCollect, totnearMisses, totalIncidents
    } = endoTotal


    var startDate = moment(startOfMonth(new Date(processDate))).format('YYYY-MM-DD')
    var endDate = moment(endOfMonth(new Date(processDate))).format('YYYY-MM-DD')

    const searchdata = useMemo(() => {
        return {
            from: startDate,
            to: endDate
        }
    }, [startDate, endDate])

    useEffect(() => {
        // const getqualityindicators = async (qltyDept) => {
        //     const result = await axioslogin.get(`/qiendoscopy/getqi/${qltyDept}`)
        //     return result.data
        // }
        // getqualityindicators(qltyDept).then((value) => {
        //     const { success } = value
        //     if (success === 1) {
        const getEndoscopyReport = async (searchdata) => {
            const result = await axioslogin.post('/qiendoscopy/endoReport', searchdata)
            const { success, data } = result.data
            if (success === 1) {
                const patients = data.map(val => val.total_patients).reduce((prev, next) => Number(prev) + Number(next));
                const errorreport = data.map(val => val.total_error_report).reduce((prev, next) => Number(prev) + Number(next));
                const redose = data.map(val => val.total_redose).reduce((prev, next) => Number(prev) + Number(next));
                const sumoftime = data.map(val => val.total_sumof_time).reduce((prev, next) => Number(prev) + Number(next));
                const indenterror = data.map(val => val.total_ident_error).reduce((prev, next) => Number(prev) + Number(next));
                const falls = data.map(val => val.total_falls).reduce((prev, next) => Number(prev) + Number(next));
                const sentinels = data.map(val => val.total_sentinels_analyse).reduce((prev, next) => Number(prev) + Number(next));
                const sentcollect = data.map(val => val.total_sentinels_collect).reduce((prev, next) => Number(prev) + Number(next));
                const nearmis = data.map(val => val.total_near_misses).reduce((prev, next) => Number(prev) + Number(next));
                const incidents = data.map(val => val.total_incidents).reduce((prev, next) => Number(prev) + Number(next));
                const frmdata = {
                    totpatients: patients,
                    toterror: errorreport,
                    totRedos: redose,
                    sumofTime: sumoftime,
                    identError: indenterror,
                    totFalls: falls,
                    totsentinelAnalyse: sentinels,
                    totsentinelCollect: sentcollect,
                    totnearMisses: nearmis,
                    totalIncidents: incidents
                }

                setEndoTotal(frmdata)
            }
            else {
                setMonthlyViewFlag(0)
                setEndoTotal([])
            }
        }
        getEndoscopyReport(searchdata)

        //     }
        //     else {
        //         setMonthlyViewFlag(0)
        //     }
        // })

    }, [searchdata, setMonthlyViewFlag])

    return (
        <Fragment>
            <Box sx={{ width: "100%", height: "100%" }}>
                <Paper sx={{ display: 'flex', bgcolor: '#DBE8D8', flex: 1, height: 40 }}>
                    <Box sx={{ pt: 0.8, pl: 0.5 }} >
                        <AnalyticsOutlinedIcon sx={{ color: 'darkgreen' }} />
                    </Box>
                    <Box sx={{ flex: 1, fontSize: 17, pt: 0.8, pl: 1 }}>
                        <Typography sx={{ color: 'darkgreen', fontWeight: 550 }}>
                            Endoscopy Monthly Report
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
                <Box sx={{ pt: 0.5, height: window.innerHeight - 140, overflow: 'auto' }}>
                    <Paper sx={{ border: '0.2px solid #D9E4EC' }}>
                        <Box sx={{ bgcolor: '#eceff1', py: 0.7, pl: 2 }}>
                            <Typography sx={{ textTransform: 'capitalize', fontSize: 17 }}>
                                Number of reporting errors per 1000 investigations
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', py: 0.5, pl: 2 }}>
                            <Box sx={{ flex: 1.5, pl: 1 }} >
                                <Box sx={{ pl: 1, pt: 0.5 }}>
                                    <Typography>Total No.Of Reporting Errors</Typography>
                                </Box>
                                <Box sx={{ pt: 0.5, fontWeight: 650 }}>
                                    <TextFieldCustom
                                        disabled
                                        size="md"
                                        type="text"
                                        name="toterror"
                                        value={toterror}
                                    />
                                </Box>
                            </Box>
                            <Box sx={{ flex: 1, pl: 1 }} >
                                <Box sx={{ pl: 1, pt: 0.5 }}>
                                    <Typography>Total No.Of Tests Performed</Typography>
                                </Box>
                                <Box sx={{ pt: 0.5, fontWeight: 650 }}>
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
                                <Box sx={{ pl: 1, pt: 0.5 }}>
                                    <Typography>Result</Typography>
                                </Box>
                                <Box sx={{ pt: 0.5, fontWeight: 650 }}>
                                    <TextFieldCustom
                                        disabled
                                        size="md"
                                        type="text"
                                        name="errorResult"
                                        value={(toterror / totpatients).toFixed(3)}
                                    />
                                </Box>
                            </Box>
                            <Box sx={{ flex: 0.7, pl: 1 }} ></Box>
                        </Box>
                    </Paper>
                    <Paper sx={{ border: '0.2px solid #D9E4EC', pt: 0.5 }}>
                        <Box sx={{ bgcolor: '#eceff1', py: 0.7, pl: 2 }}>
                            <Typography sx={{ textTransform: 'capitalize', fontSize: 17 }}>
                                Percentage of Re dos
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', py: 0.5, pl: 2 }}>
                            <Box sx={{ flex: 1.5, pl: 1 }} >
                                <Box sx={{ pl: 1, pt: 0.5 }}>
                                    <Typography>Total No.Of Re Dos</Typography>
                                </Box>
                                <Box sx={{ pt: 0.5, fontWeight: 650 }}>
                                    <TextFieldCustom
                                        disabled
                                        size="md"
                                        type="text"
                                        name="totRedos"
                                        value={totRedos}
                                    />
                                </Box>
                            </Box>
                            <Box sx={{ flex: 1, pl: 1 }} >
                                <Box sx={{ pl: 1, pt: 0.5 }}>
                                    <Typography>Total No.Of Tests Performed</Typography>
                                </Box>
                                <Box sx={{ pt: 0.5, fontWeight: 650 }}>
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
                                <Box sx={{ pl: 1, pt: 0.5 }}>
                                    <Typography>Result</Typography>
                                </Box>
                                <Box sx={{ pt: 0.5, fontWeight: 650 }}>
                                    <TextFieldCustom
                                        disabled
                                        size="md"
                                        type="text"
                                        name="redosResult"
                                        value={(totRedos / totpatients).toFixed(3)}
                                    />
                                </Box>
                            </Box>
                            <Box sx={{ flex: 0.7, pl: 1 }} ></Box>
                        </Box>
                    </Paper>

                    <Paper sx={{ border: '0.2px solid #D9E4EC', pt: 0.5 }}>
                        <Box sx={{ bgcolor: '#eceff1', py: 0.7, pl: 2 }}>
                            <Typography sx={{ textTransform: 'capitalize', fontSize: 17 }}>
                                Waiting time for services (a) Diagnostics
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', py: 0.5, pl: 2 }}>
                            <Box sx={{ flex: 1.5, pl: 1 }} >
                                <Box sx={{ pl: 1, pt: 0.5 }}>
                                    <Typography>Total Sum of Time</Typography>
                                </Box>
                                <Box sx={{ pt: 0.5, fontWeight: 650 }}>
                                    <TextFieldCustom
                                        disabled
                                        size="md"
                                        type="text"
                                        name="sumofTime"
                                        value={sumofTime}
                                    />
                                </Box>
                            </Box>
                            <Box sx={{ flex: 1, pl: 1 }} >
                                <Box sx={{ pl: 1, pt: 0.5 }}>
                                    <Typography>Total No.Of Patient Reported</Typography>
                                </Box>
                                <Box sx={{ pt: 0.5, fontWeight: 650 }}>
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
                                <Box sx={{ pl: 1, pt: 0.5 }}>
                                    <Typography>Result</Typography>
                                </Box>
                                <Box sx={{ pt: 0.5, fontWeight: 650 }}>
                                    <TextFieldCustom
                                        disabled
                                        size="md"
                                        type="text"
                                        name="timeResult"
                                        value={(sumofTime / totpatients).toFixed(3)}
                                    />
                                </Box>
                            </Box>
                            <Box sx={{ flex: 0.7, pl: 1 }} ></Box>
                        </Box>
                    </Paper>
                    <Paper sx={{ border: '0.2px solid #D9E4EC', pt: 0.5 }}>
                        <Box sx={{ bgcolor: '#eceff1', py: 0.7, pl: 2 }}>
                            <Typography sx={{ textTransform: 'capitalize', fontSize: 17 }}>
                                Incidence of Patient identification errors
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', py: 0.5, pl: 2 }}>
                            <Box sx={{ flex: 1.5, pl: 1 }} >
                                <Box sx={{ pl: 1, pt: 0.5 }}>
                                    <Typography>Total No.Of Patient Identification Errors</Typography>
                                </Box>
                                <Box sx={{ pt: 0.5, fontWeight: 650 }}>
                                    <TextFieldCustom
                                        disabled
                                        size="md"
                                        type="text"
                                        name="identError"
                                        value={identError}
                                    />
                                </Box>
                            </Box>
                            <Box sx={{ flex: 1, pl: 1 }} >
                                <Box sx={{ pl: 1, pt: 0.5 }}>
                                    <Typography>Total No.Of Patients</Typography>
                                </Box>
                                <Box sx={{ pt: 0.5, fontWeight: 650 }}>
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
                                <Box sx={{ pl: 1, pt: 0.5 }}>
                                    <Typography>Result</Typography>
                                </Box>
                                <Box sx={{ pt: 0.5, fontWeight: 650 }}>
                                    <TextFieldCustom
                                        disabled
                                        size="md"
                                        type="text"
                                        name="identResult"
                                        value={(identError / totpatients).toFixed(3)}
                                    />
                                </Box>
                            </Box>
                            <Box sx={{ flex: 0.7, pl: 1 }} ></Box>
                        </Box>
                    </Paper>

                    <Paper sx={{ border: '0.2px solid #D9E4EC', pt: 0.5, }}>
                        <Box sx={{ bgcolor: '#eceff1', py: 0.7, pl: 2 }}>
                            <Typography sx={{ textTransform: 'capitalize', fontSize: 17 }}>
                                Incidence of falls
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', py: 0.5, pl: 2 }}>
                            <Box sx={{ flex: 1.5, pl: 1 }} >
                                <Box sx={{ pl: 1, pt: 0.5 }}>
                                    <Typography>Total No.Of Falls</Typography>
                                </Box>
                                <Box sx={{ pt: 0.5, fontWeight: 650 }}>
                                    <TextFieldCustom
                                        disabled
                                        size="md"
                                        type="text"
                                        name="totFalls"
                                        value={totFalls}
                                    />
                                </Box>
                            </Box>
                            <Box sx={{ flex: 1, pl: 1 }} >
                                <Box sx={{ pl: 1, pt: 0.5 }}>
                                    <Typography>Total No.Of Patient Days</Typography>
                                </Box>
                                <Box sx={{ pt: 0.5, fontWeight: 650 }}>
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
                                <Box sx={{ pl: 1, pt: 0.5 }}>
                                    <Typography>Result</Typography>
                                </Box>
                                <Box sx={{ pt: 0.5, fontWeight: 650 }}>
                                    <TextFieldCustom
                                        disabled
                                        size="md"
                                        type="text"
                                        name="fallsResult"
                                        value={(totFalls / totpatients).toFixed(3)}
                                    />
                                </Box>
                            </Box>
                            <Box sx={{ flex: 0.7, pl: 1 }} ></Box>
                        </Box>
                    </Paper>
                    <Paper sx={{ border: '0.2px solid #D9E4EC', pt: 0.5, }}>
                        <Box sx={{ bgcolor: '#eceff1', py: 0.7, pl: 2 }}>
                            <Typography sx={{ textTransform: 'capitalize', fontSize: 17 }}>
                                Number of sentinel events reported,collected and analysed the defined time frame
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', py: 0.5, pl: 2 }}>
                            <Box sx={{ flex: 1.5, pl: 1 }} >
                                <Box sx={{ pl: 1, pt: 0.5 }}>
                                    <Typography>Total No.Of Sentinel Events Analysed within the Defined Time Frame</Typography>
                                </Box>
                                <Box sx={{ pt: 0.5, fontWeight: 650 }}>
                                    <TextFieldCustom
                                        disabled
                                        size="md"
                                        type="text"
                                        name="totsentinelAnalyse"
                                        value={totsentinelAnalyse}
                                    />
                                </Box>
                            </Box>
                            <Box sx={{ flex: 1, pl: 1 }} >
                                <Box sx={{ pl: 1, pt: 0.5 }}>
                                    <Typography>Total No.Of Sentinel Event Reported/Collected</Typography>
                                </Box>
                                <Box sx={{ pt: 0.5, fontWeight: 650 }}>
                                    <TextFieldCustom
                                        disabled
                                        size="md"
                                        type="text"
                                        name="totsentinelCollect"
                                        value={totsentinelCollect}
                                    />
                                </Box>
                            </Box>
                            <Box sx={{ flex: 0.5, pl: 1 }} >
                                <Box sx={{ pl: 1, pt: 0.5 }}>
                                    <Typography>Result</Typography>
                                </Box>
                                <Box sx={{ pt: 0.5, fontWeight: 650 }}>
                                    <TextFieldCustom
                                        disabled
                                        size="md"
                                        type="text"
                                        name="sentinelResult"
                                        value={(totsentinelAnalyse / totsentinelCollect).toFixed(3)}
                                    />
                                </Box>
                            </Box>
                            <Box sx={{ flex: 0.7, pl: 1 }} ></Box>
                        </Box>
                    </Paper>
                    <Paper sx={{ border: '0.2px solid #D9E4EC', pt: 0.5 }}>
                        <Box sx={{ bgcolor: '#eceff1', py: 0.7, pl: 2 }}>
                            <Typography sx={{ textTransform: 'capitalize', fontSize: 17 }}>
                                Percentage of near misses
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', py: 0.5, pl: 2 }}>
                            <Box sx={{ flex: 1.5, pl: 1 }} >
                                <Box sx={{ pl: 1, pt: 0.5 }}>
                                    <Typography>Total No.Of Near Misses Reported</Typography>
                                </Box>
                                <Box sx={{ pt: 0.5, fontWeight: 650 }}>
                                    <TextFieldCustom
                                        disabled
                                        size="md"
                                        type="text"
                                        name="totnearMisses"
                                        value={totnearMisses}
                                    />
                                </Box>
                            </Box>
                            <Box sx={{ flex: 1, pl: 1 }} >
                                <Box sx={{ pl: 1, pt: 0.5 }}>
                                    <Typography>Total No.Of Incidents Reported</Typography>
                                </Box>
                                <Box sx={{ pt: 0.5, fontWeight: 650 }}>
                                    <TextFieldCustom
                                        disabled
                                        size="md"
                                        type="text"
                                        name="totalIncidents"
                                        value={totalIncidents}
                                    />
                                </Box>
                            </Box>
                            <Box sx={{ flex: 0.5, pl: 1 }} >
                                <Box sx={{ pl: 1, pt: 0.5 }}>
                                    <Typography>Result</Typography>
                                </Box>
                                <Box sx={{ pt: 0.5, fontWeight: 650 }}>
                                    <TextFieldCustom
                                        disabled
                                        size="md"
                                        type="text"
                                        name="nearMissesResult"
                                        value={(totnearMisses / totalIncidents).toFixed(3)}
                                    />
                                </Box>
                            </Box>
                            <Box sx={{ flex: 0.7, pl: 1 }} ></Box>
                        </Box>
                    </Paper>
                    <Paper sx={{ height: 50, pt: 0.5, border: '0.2px solid #D9E4EC', bgcolor: '#eceff1', display: "flex" }}>

                    </Paper>
                </Box>
            </Box>
        </Fragment >
    )
}

export default memo(MonthlyReportEndoscopy)