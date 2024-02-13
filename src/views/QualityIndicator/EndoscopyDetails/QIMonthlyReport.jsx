import { Box, Tooltip, Typography } from '@mui/joy'
import { Paper } from '@mui/material'
import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import CusIconButton from '../../Components/CusIconButton'
import CloseIcon from '@mui/icons-material/Close';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import { getQltyDept } from 'src/redux/actions/QualityIndicatorDept.action';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch } from 'react-redux';
import QualityIndicatorSelect from '../../CommonSelectCode/QualityIndicatorSelect';
import moment from 'moment';
import TextFieldCustom from '../../Components/TextFieldCustom';
import { endOfMonth, startOfMonth } from 'date-fns';
import PublishedWithChangesOutlinedIcon from '@mui/icons-material/PublishedWithChangesOutlined';
import RotateRightOutlinedIcon from '@mui/icons-material/RotateRightOutlined';
import { axioslogin } from '../../Axios/Axios';
import { infoNotify } from '../../Common/CommonCode';

const QIMonthlyReport = () => {
    const [qltyDept, setQltyDept] = useState(0)
    const [processDate, setProcessDate] = useState(moment(new Date()).format('YYYY-MM'))
    const [viewFlag, setViewFlag] = useState(0)
    const history = useHistory()
    const dispatch = useDispatch()
    const backtoHome = useCallback(() => {
        history.push('/Home/QIDetails')
    }, [history])
    useEffect(() => {
        dispatch(getQltyDept())
    }, [dispatch])

    const ReportDateOnChange = useCallback((e) => {
        setProcessDate(e.target.value)
    }, [])

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
        totalIncidents: 0,
    })

    const { totpatients, toterror, totRedos, sumofTime, identError, totFalls, totsentinelAnalyse,
        totsentinelCollect, totnearMisses, totalIncidents
    } = endoTotal


    var startDate = moment(startOfMonth(new Date(processDate))).format('YYYY-MM-DD')
    var endDate = moment(endOfMonth(new Date(processDate))).format('YYYY-MM-DD')
    // const dateRange = eachDayOfInterval({ start: new Date(startDate), end: new Date(endDate) });

    const ResetData = useCallback((e) => {
        setQltyDept(0)
        setProcessDate(moment(new Date()).format('YYYY-MM'))
        setViewFlag(0)

    }, [])
    const searchdata = useMemo(() => {
        return {
            from: startDate,
            to: endDate
        }
    }, [startDate, endDate])

    const ProcessQIData = useCallback(() => {
        if (qltyDept === 0) {
            infoNotify("Select Department For Process")
            setViewFlag(0)
        }
        else {
            const getqualityindicators = async (qltyDept) => {
                const result = await axioslogin.get(`/qiendoscopy/getqi/${qltyDept}`)
                return result.data
            }
            getqualityindicators(qltyDept).then((value) => {
                const { message, success } = value
                if (success === 1) {
                    setViewFlag(1)
                    const getEndoscopyReport = async (searchdata) => {
                        const result = await axioslogin.post('/qiendoscopy/endoReport', searchdata)
                        const { success, data, message } = result.data
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
                        else if (success === 2) {
                            infoNotify(message)
                            setViewFlag(0)
                        }
                        else {
                            infoNotify(message)
                            setViewFlag(0)
                        }
                    }
                    getEndoscopyReport(searchdata)

                }
                else if (success === 2) {
                    infoNotify(message)
                    setViewFlag(0)
                }
                else {
                    infoNotify(message)
                    setViewFlag(0)
                }
            })
        }

    }, [qltyDept, searchdata])
    return (
        <Fragment>
            <Box>
                <Box sx={{ width: "100%", height: "100%" }}>
                    <Paper sx={{ display: 'flex', bgcolor: '#DBE8D8', flex: 1, height: 40 }}>
                        <Box sx={{ pt: 0.8, pl: 0.5 }} >
                            <AnalyticsOutlinedIcon sx={{ color: 'darkgreen' }} />
                        </Box>
                        <Box sx={{ flex: 1, fontSize: 17, pt: 0.8, pl: 1 }}>
                            <Typography sx={{ color: 'darkgreen', fontWeight: 550 }}>
                                Quality Indicator Monthly Report
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

                    <Paper sx={{ display: 'flex', py: 2, bgcolor: '#F7F8F8' }}>
                        <Box sx={{ flex: 1, pl: 1 }} >
                            <Box sx={{ pl: 1 }}>
                                <Typography>Department</Typography>
                            </Box>
                            <Box sx={{ pt: 0.2 }}>
                                <QualityIndicatorSelect
                                    qltyDept={qltyDept}
                                    setQltyDept={setQltyDept}
                                />
                            </Box>
                        </Box>
                        <Box sx={{ flex: 1, pl: 1 }} >
                            <Box sx={{ pl: 1 }}>
                                <Typography>Date</Typography>
                            </Box>
                            <Box sx={{ pt: 0.2 }}>
                                <TextFieldCustom
                                    size="md"
                                    type="Month"
                                    name="processDate"
                                    value={processDate}
                                    onchange={(e) => ReportDateOnChange(e)}
                                />
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', flex: 1, pl: 1, pt: 3.2 }} >
                            <Box sx={{}}>
                                <CusIconButton size="md" variant="outlined" color="primary"  >
                                    <Tooltip title="Process" placement="bottom" >
                                        <PublishedWithChangesOutlinedIcon sx={{ fontSize: 22, color: "darkgreen" }}
                                            onClick={ProcessQIData} />
                                    </Tooltip>
                                </CusIconButton>
                            </Box>
                            <Box sx={{ pl: 1 }}>
                                <CusIconButton size="md" variant="outlined" color="primary"  >
                                    <Tooltip title="Reset" placement="bottom" >
                                        <RotateRightOutlinedIcon sx={{ fontSize: 22, color: "darkgreen" }}
                                            onClick={ResetData} />
                                    </Tooltip>
                                </CusIconButton>
                            </Box>
                        </Box>
                    </Paper>
                    <Box sx={{ pt: 0.5, height: window.innerHeight - 225, overflow: 'auto' }}>
                        {
                            viewFlag === 1 ?
                                <Box sx={{}}>
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
                                                        value={(toterror / totpatients).toFixed(2)}
                                                    />
                                                </Box>
                                            </Box>
                                            <Box sx={{ flex: 1, pl: 1 }} ></Box>
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
                                                        value={(totRedos / totpatients).toFixed(2)}
                                                    />
                                                </Box>
                                            </Box>
                                            <Box sx={{ flex: 1, pl: 1 }} ></Box>
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
                                                        value={(sumofTime / totpatients).toFixed(2)}
                                                    />
                                                </Box>
                                            </Box>
                                            <Box sx={{ flex: 1, pl: 1 }} ></Box>
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
                                                        value={(identError / totpatients).toFixed(2)}
                                                    />
                                                </Box>
                                            </Box>
                                            <Box sx={{ flex: 1, pl: 1 }} ></Box>
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
                                                        value={(totFalls / totpatients).toFixed(2)}
                                                    />
                                                </Box>
                                            </Box>
                                            <Box sx={{ flex: 1, pl: 1 }} ></Box>
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
                                                        value={(totsentinelAnalyse / totsentinelCollect).toFixed(2)}
                                                    />
                                                </Box>
                                            </Box>
                                            <Box sx={{ flex: 1, pl: 1 }} ></Box>
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
                                                        value={(totnearMisses / totalIncidents).toFixed(2)}
                                                    />
                                                </Box>
                                            </Box>
                                            <Box sx={{ flex: 1, pl: 1 }} ></Box>
                                        </Box>
                                    </Paper>
                                    <Paper sx={{ height: 50, pt: 0.5, border: '0.2px solid #D9E4EC', bgcolor: '#eceff1', display: "flex" }}>

                                    </Paper>
                                </Box>
                                :
                                <Box></Box>
                        }
                    </Box>

                </Box>
            </Box>
        </Fragment >
    )
}

export default QIMonthlyReport