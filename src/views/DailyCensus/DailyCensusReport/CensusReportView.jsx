import { Box, Button, CssVarsProvider, Tooltip, Typography } from '@mui/joy'
import { Paper } from '@mui/material'
import React, { Fragment, memo, useCallback, useEffect, useMemo, useState } from 'react'
import AssessmentIcon from '@mui/icons-material/Assessment';
import CloseIcon from '@mui/icons-material/Close';
import CusIconButton from 'src/views/Components/CusIconButton';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import TextFieldCustom from 'src/views/Components/TextFieldCustom';
import moment from 'moment';
import { axioslogin } from 'src/views/Axios/Axios';
import { infoNotify } from 'src/views/Common/CommonCode';
import ReportDailyCensusTable from '../TableView/ReportDailyCensusTable';
import { eachDayOfInterval, subDays } from 'date-fns';
import { BarChart } from '@mui/x-charts';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { CensusReportPdfView } from '../Components/CensusReportPdfView';

const CensusReportView = () => {
    const [dailyDate, setDailyDate] = useState(moment(new Date()).format('YYYY-MM-DD'))
    const [searchFlag, setsearchFlag] = useState(0)
    const [tableData, setTableData] = useState([])
    const [nursList, setNursList] = useState([])
    const [admissionData, setadmissionData] = useState([])
    const [dischargeData, setDischargeData] = useState([])
    const [censusTotal, setCensusTotal] = useState([])
    const [flag, setFlag] = useState(0)

    const history = useHistory()
    const backtoHome = useCallback(() => {
        history.push('/Home/DailyCensus')
    }, [history])

    const QIDateChange = useCallback((e) => {
        setDailyDate(e.target.value)
    }, [])
    const startDate = moment(subDays(new Date(), 14)).format("YYYY-MM-DD")
    const endDate = moment(subDays(new Date(), 1)).format("YYYY-MM-DD")

    const barGraphSearch = useMemo(() => {
        return {
            from: startDate,
            to: endDate
        }
    }, [startDate, endDate])
    const [calculateTotal, setCalculateTotal] = useState({
        totYesterday: 0,
        totAdmission: 0,
        totDischarge: 0,
        totTransIn: 0,
        totTransOut: 0,
        totDeath: 0,
        totalcensus: 0,
        oraTotAdm: 0,
        oraTotDis: 0,
        oraTotDeath: 0,
        oraTotal: 0,
        oraYesttotal: 0
    })
    const searchdata = useMemo(() => {
        return {
            census_date: moment(new Date(dailyDate)).format('YYYY-MM-DD')
        }
    }, [dailyDate])

    useEffect(() => {
        const getNursingStation = async () => {
            const result = await axioslogin.get('/censusNursingStat/active')
            const { success, nurslist } = result.data
            if (success === 2) {
                setNursList(nurslist)
            }
            else {
            }
        }
        getNursingStation();
    }, [])
    const SearchDetails = useCallback((e) => {
        const nsSlno = nursList?.map((val) => val.census_ns_slno)
        const getYesterday = {
            census_ns_slno: nsSlno,
            census_date: moment(subDays(new Date(dailyDate), 1)).format('YYYY-MM-DD')
        }
        const getYesterdayData = async (getYesterday) => {
            const result = await axioslogin.post('/qidailycensus/yesterday', getYesterday);
            return result.data
        }
        const GetCensusDetails = async (searchdata) => {
            const result = await axioslogin.post('/qidailycensus/view', searchdata);
            return result.data
        }
        getYesterdayData(getYesterday).then((val) => {
            const { yestdata } = val
            const yesterData = nursList?.map((item) => {
                const yest = yestdata?.find((val) => val.census_ns_slno === item.census_ns_slno)
                return {
                    census_ns_slno: item.census_ns_slno,
                    census_ns_name: item.census_ns_name,
                    yesterday_census: yest ? yest.census_total : 0,
                    ora_yesterday: yest ? yest.ora_census_total : 0
                }
            })
            GetCensusDetails(searchdata).then((value) => {
                const { data, success, message } = value
                if (success === 1) {
                    const resultArray = yesterData?.map((item) => {
                        const newArray = data.find((val) => (val.census_ns_slno) === (item.census_ns_slno))
                        return {
                            census_ns_slno: item.census_ns_slno,
                            census_ns_name: item.census_ns_name,
                            yesterday_census: item.yesterday_census,
                            total_admission: newArray ? newArray.total_admission : 0,
                            total_discharge: newArray ? newArray.total_discharge : 0,
                            transfer_in: newArray ? newArray.transfer_in : 0,
                            transfer_out: newArray ? newArray.transfer_out : 0,
                            total_death: newArray ? newArray.total_death : 0,
                            census_total: newArray ? newArray.census_total : 0,
                            ora_admission: newArray ? newArray.ora_admission : 0,
                            ora_discharge: newArray ? newArray.ora_discharge : 0,
                            ora_death: newArray ? newArray.ora_death : 0,
                            ora_census_total: newArray ? newArray.ora_census_total : 0,
                            ora_yesterday: item.ora_yesterday,
                        }
                    })
                    setTableData(resultArray)
                    setsearchFlag(1)
                } else {
                    infoNotify(message)
                    setTableData([])
                    setsearchFlag(0)
                }
            })
        })
    }, [searchdata, nursList, dailyDate])

    useEffect(() => {
        if (tableData.length !== 0) {
            const totyes = tableData?.map(val => val.yesterday_census).reduce((prev, next) => Number(prev) + Number(next));
            const totad = tableData?.map(val => val.total_admission).reduce((prev, next) => Number(prev) + Number(next));
            const totdis = tableData?.map(val => val.total_discharge).reduce((prev, next) => Number(prev) + Number(next));
            const totin = tableData?.map(val => val.transfer_in).reduce((prev, next) => Number(prev) + Number(next));
            const totout = tableData?.map(val => val.transfer_out).reduce((prev, next) => Number(prev) + Number(next));
            const totdeath = tableData?.map(val => val.total_death).reduce((prev, next) => Number(prev) + Number(next));
            const tot = tableData?.map(val => val.census_total).reduce((prev, next) => Number(prev) + Number(next));
            const oraadm = tableData?.map(val => val.ora_admission).reduce((prev, next) => Number(prev) + Number(next));
            const oradis = tableData?.map(val => val.ora_discharge).reduce((prev, next) => Number(prev) + Number(next));
            const oradeath = tableData?.map(val => val.ora_death).reduce((prev, next) => Number(prev) + Number(next));
            const oraTotalCount = tableData?.map(val => val.ora_census_total).reduce((prev, next) => Number(prev) + Number(next));
            const oraYesterday = tableData?.map(val => val.ora_yesterday).reduce((prev, next) => Number(prev) + Number(next));
            const fromdata = {
                totYesterday: totyes,
                totAdmission: totad,
                totDischarge: totdis,
                totTransIn: totin,
                totTransOut: totout,
                totDeath: totdeath,
                totalcensus: tot,
                oraTotAdm: oraadm,
                oraTotDis: oradis,
                oraTotDeath: oradeath,
                oraTotal: oraTotalCount,
                oraYesttotal: oraYesterday

            }
            setCalculateTotal(fromdata)
        }
        else {
        }

    }, [tableData])

    const pdfDownlloadView = useCallback((e) => {
        if (tableData.length !== 0) {

            CensusReportPdfView(tableData, dailyDate, calculateTotal)
        } else {
            infoNotify("No Report Found")
        }

    }, [dailyDate, tableData, calculateTotal])

    useEffect(() => {
        const dateRange = eachDayOfInterval({ start: new Date(startDate), end: new Date(endDate) });
        const getGraphView = async (barGraphSearch) => {
            const result = await axioslogin.post('/qidailycensus/viewgraph', barGraphSearch)
            const { success, data } = result.data
            if (success === 1) {
                const newAdmis = dateRange?.map((val) => {
                    const tadmis = (data?.filter(item => (moment(new Date(val)).format('DD-MM-YYYY')) === moment(new Date(item.census_date)).format('DD-MM-YYYY'))
                        .reduce((acc, curr) => acc + (curr.total_admission), 0))
                    return {
                        day: (moment(new Date(val)).format('DD-MMM')),
                        totadmiss: tadmis
                    }
                })
                setadmissionData(newAdmis)

                const newDischrg = dateRange?.map((val) => {
                    const tdisch = (data.filter(item => (moment(new Date(val)).format('DD-MM-YYYY')) === moment(new Date(item.census_date)).format('DD-MM-YYYY'))
                        .reduce((acc, curr) => acc + (curr.total_discharge), 0))
                    return {
                        disday: (moment(new Date(val)).format('DD-MMM')),
                        totdischrg: tdisch
                    }
                })
                setDischargeData(newDischrg)

                const newTotal = dateRange?.map((val) => {
                    const tcensus = (data?.filter(item => (moment(new Date(val)).format('DD-MM-YYYY')) === moment(new Date(item.census_date)).format('DD-MM-YYYY'))
                        .reduce((acc, curr) => acc + (curr.census_total), 0))
                    return {
                        totday: (moment(new Date(val)).format('DD-MMM')),
                        totalcensus: tcensus
                    }
                })
                setCensusTotal(newTotal)
                setFlag(1)
            }
            else {
                setFlag(0)
            }
        }
        getGraphView(barGraphSearch);
    }, [barGraphSearch, startDate, endDate])
    const valueFormatter = (value) => `${value}`;
    return (
        <Fragment>
            <Paper variant='outlined' square >
                <Box sx={{ display: 'flex', flex: 1, height: 42 }}>
                    <Box sx={{ pt: 0.5, pl: 0.7 }} >
                        <AssessmentIcon fontSize='large' sx={{ color: '#757575' }} />
                    </Box>
                    <Box sx={{ flex: 1, fontSize: 18, pt: 0.9, pl: 1 }}>
                        <Typography sx={{ color: '#424242', fontWeight: 550 }}>
                            Census Report
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', fontSize: 20, opacity: 0.8, py: 0.4 }}>
                        <CusIconButton size="sm" variant="outlined" color="primary" style={{ bgcolor: '#F7F8F8', }} >
                            <Tooltip title="PDF" placement="bottom" >
                                <PictureAsPdfIcon sx={{ cursor: 'pointer', size: 'lg', width: 40, height: 25, color: '#BA0F30' }}
                                    onClick={pdfDownlloadView} />
                            </Tooltip>
                        </CusIconButton>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', fontSize: 20, px: 0.5, py: 0.4 }}>
                        <CusIconButton size="sm" variant="outlined" color="primary" style={{ bgcolor: '#F7F8F8' }}>
                            <Tooltip title="Close" placement="bottom" >
                                <CloseIcon sx={{ cursor: 'pointer', size: 'lg', width: 35, height: 25, color: '#424242', fontWeight: 'bold' }}
                                    onClick={backtoHome}
                                />
                            </Tooltip>
                        </CusIconButton>
                    </Box>
                </Box>
                <Paper variant='outlined' square sx={{ height: 320 }}>
                    {flag === 1 ?
                        <Box sx={{ display: 'flex' }}>
                            <Box sx={{ flex: 1 }}>
                                <BarChart
                                    height={300}
                                    dataset={admissionData}
                                    xAxis={[{
                                        scaleType: 'band', dataKey: 'day',
                                        tickLabelStyle: {
                                            angle: -90,
                                            textAnchor: 'end',
                                            fontSize: 11,
                                        },
                                    }]}
                                    yAxis={[{}]}
                                    series={[{
                                        dataKey: "totadmiss", label: 'Admission', color: '#0d47a1', valueFormatter,
                                    }]}
                                    tooltip={{ trigger: 'item' }}
                                    axisHighlight={{
                                        x: 'none',
                                        y: 'none',
                                    }}
                                />
                            </Box>
                            <Box sx={{ flex: 1 }}>
                                <BarChart
                                    height={300}
                                    dataset={dischargeData}
                                    xAxis={[{
                                        scaleType: 'band', dataKey: 'disday', color: '#558b2f',
                                        tickLabelStyle: {
                                            angle: -90,
                                            textAnchor: 'end',
                                            fontSize: 11,
                                        },
                                    }]}
                                    series={[{
                                        dataKey: "totdischrg", label: 'Discharge', color: '#558b2f', valueFormatter,
                                    }]}
                                    tooltip={{ trigger: 'item' }}
                                    axisHighlight={{
                                        x: 'none',
                                        y: 'none',
                                    }}
                                />
                            </Box>
                            <Box sx={{ flex: 1 }}>
                                <BarChart
                                    height={300}
                                    dataset={censusTotal}
                                    xAxis={[{
                                        scaleType: 'band', dataKey: 'totday', color: '#8d6e63',
                                        tickLabelStyle: {
                                            angle: -90,
                                            textAnchor: 'end',
                                            fontSize: 11,
                                        },
                                    }]}
                                    series={[{ dataKey: "totalcensus", label: 'Census Total', color: '#8d6e63', valueFormatter }]}
                                    tooltip={{ trigger: 'item' }}
                                    axisHighlight={{
                                        x: 'none',
                                        y: 'none',
                                    }}
                                />
                            </Box>
                        </Box>
                        : <Box> </Box>
                    }
                </Paper>
                <Box sx={{ pt: 0.3 }}>
                    <Paper sx={{ display: 'flex', bgcolor: '#F7F8F8', py: 2, pr: 1, border: '0.2px solid #F7F8F8' }}>
                        <Box sx={{ flex: 1 }} ></Box>
                        <Box sx={{ flex: 1 }} >
                            <Box sx={{ pt: 0.2 }}>
                                <TextFieldCustom
                                    slotProps={{
                                        input: {
                                            max: moment(new Date()).format('YYYY-MM-DD')
                                        },
                                    }}
                                    size="md"
                                    type="date"
                                    name="dailyDate"
                                    value={dailyDate}
                                    onchange={QIDateChange}
                                />
                            </Box>
                        </Box>
                        <Box sx={{ flex: 1, pl: 1 }} >
                            <CssVarsProvider>
                                <Button variant="outlined" sx={{
                                    fontSize: 16, color: '#3C2E3F', width: 150, cursor: 'pointer',
                                    borderRadius: 20, bgcolor: '#F7F8F8'
                                }}
                                    onClick={SearchDetails}
                                >
                                    Search
                                </Button>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ flex: 1 }} ></Box>
                    </Paper>
                </Box>
                <Box>
                    {searchFlag === 1 ? <ReportDailyCensusTable tableData={tableData} calculateTotal={calculateTotal} /> : null}
                </Box>
            </Paper >
        </Fragment >
    )
}

export default memo(CensusReportView)