import { Box, Button, CssVarsProvider, Tooltip, Typography } from '@mui/joy'
import { Paper } from '@mui/material'
import React, { Fragment, memo, useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { axiosellider, axioslogin } from 'src/views/Axios/Axios'
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import CloseIcon from '@mui/icons-material/Close';
import CusIconButton from 'src/views/Components/CusIconButton'
import ListNursingStations from '../Components/ListNursingStations'
import moment from 'moment'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import { addDays, subDays } from 'date-fns'
import { infoNotify } from 'src/views/Common/CommonCode'
import { useSelector } from 'react-redux'
import CustomCircularProgress from '../Components/CustomCircularProgress'

const CensusCreate = () => {
    const [dailyDate, setDailyDate] = useState(moment(new Date()).format('YYYY-MM-DD'))
    const [searchFlag, setsearchFlag] = useState(0)
    const [censusData, setCensusData] = useState([])
    const [count, setCount] = useState(0)
    const history = useHistory()
    const [nurstation, setNurstation] = useState([])
    const [loading, setLoading] = useState(false)
    const [tabFlag, setTabFlag] = useState(0)
    const backtoHome = useCallback(() => {
        history.push('/Home')
    }, [history])

    const QIDateChange = useCallback((e) => {
        setDailyDate(e.target.value)
        setsearchFlag(0)
        setCensusData([])
        setTabFlag(0)
    }, [])
    const id = useSelector((state) => {
        return state?.LoginUserData.empid
    })
    useEffect(() => {
        const getNursingStation = async () => {
            const result = await axioslogin.get('/censusNursingStat/active')
            return result.data
        }
        getNursingStation().then((value) => {
            const { success, nurslist } = value
            if (success === 2) {
                setNurstation(nurslist)
            }
            else {
            }
        })
    }, [count])
    const SearchDetails = useCallback((e) => {
        if (moment(new Date(dailyDate)).format('YYYY-MM-DD') >= (moment(new Date()).format('YYYY-MM-DD'))) {
            infoNotify("The Day Is Not Yet Ended")
        } else {
            setsearchFlag(1)
            const GetElliderData = async (elliderSearch) => {
                const result = await axiosellider.post('/dailyCensus/elliderData', elliderSearch);
                return result.data
            }
            const InsertData = async (insertArray) => {
                const result = await axioslogin.post('/qidailycensus/save', insertArray);
                return result.data
            }
            const elliderSearch = {
                from: moment(dailyDate).format('DD/MM/yyyy 00:00:00'),
                to: moment(dailyDate).format('DD/MM/yyyy 23:59:59'),
            }
            GetElliderData(elliderSearch).then((value) => {
                const { success, data } = value
                if (success === 1) {

                    const insertArray = nurstation?.map((val) => {
                        const newData = data.find((item) => item.NS_CODE === val.census_ns_code)
                        return {
                            census_ns_slno: val.census_ns_slno,
                            // census_ns_code: val.census_ns_code,
                            census_date: dailyDate,
                            yesterday_census: 0,
                            total_admission: 0,
                            total_discharge: 0,
                            transfer_in: 0,
                            transfer_out: 0,
                            total_death: 0,
                            census_total: 0,
                            create_user: id,
                            ora_admission: newData ? newData.AD : 0,
                            ora_discharge: newData ? newData.DC : 0,
                            ora_death: newData ? newData.DT : 0,
                            ora_census_total: newData ? newData.TOT : 0,
                        }
                    })
                    InsertData(insertArray).then((val) => {
                        const { success } = val
                        if (success === 1) {
                            setCount(count + 1)
                        }
                        else {
                        }
                        setLoading(true)
                    })
                }
            })
        }
    }, [dailyDate, nurstation, id, count])

    useEffect(() => {
        if (searchFlag === 1) {
            const getYesterdayData = async (getYesterday) => {
                const result = await axioslogin.post('/qidailycensus/yesterday', getYesterday);
                return result.data
            }
            const GetExistData = async (existSearch) => {
                const result = await axioslogin.post('/qidailycensus/exist', existSearch);
                return result.data
            }
            const nsSlno = nurstation?.map((val) => val.census_ns_slno)
            const getYesterday = {
                census_ns_slno: nsSlno,
                census_date: moment(subDays(new Date(dailyDate), 1)).format('YYYY-MM-DD')
            }
            getYesterdayData(getYesterday).then((val) => {
                const { yestdata } = val
                const newData = nurstation?.map((item) => {
                    const yest = yestdata?.find((val) => val.census_ns_slno === item.census_ns_slno)
                    return {
                        census_ns_slno: item.census_ns_slno,
                        census_ns_code: item.census_ns_code,
                        census_ns_name: item.census_ns_name,
                        yesterday_census: yest ? yest.census_total : 0
                    }
                })
                const existSearch = {
                    census_ns_slno: nsSlno,
                    census_date: moment(new Date(dailyDate)).format('YYYY-MM-DD')
                }
                GetExistData(existSearch).then((items) => {
                    const { success, data } = items
                    if (success === 1) {
                        const resultArray = newData?.map((item) => {
                            const reportArray = data.find((val) => val.census_ns_slno === item.census_ns_slno)
                            return {
                                census_ns_slno: item.census_ns_slno,
                                census_ns_code: item.census_ns_code,
                                census_ns_name: item.census_ns_name,
                                yesterday_census: item.yesterday_census,
                                total_admission: reportArray ? reportArray.total_admission : 0,
                                total_discharge: reportArray ? reportArray.total_discharge : 0,
                                transfer_in: reportArray ? reportArray.transfer_in : 0,
                                transfer_out: reportArray ? reportArray.transfer_out : 0,
                                total_death: reportArray ? reportArray.total_death : 0,
                                census_total: (reportArray.census_total !== 0) ? reportArray.census_total : item.yesterday_census,
                                ora_admission: reportArray ? reportArray.ora_admission : 0,
                                ora_discharge: reportArray ? reportArray.ora_discharge : 0,
                                ora_death: reportArray ? reportArray.ora_death : 0,
                                ora_census_total: reportArray ? reportArray.ora_census_total : 0,
                            }
                        })
                        setLoading(false)
                        setCensusData(resultArray)
                        setTabFlag(1)
                    }
                    else {

                    }
                })
            })
        }
    }, [searchFlag, nurstation, dailyDate])


    return (
        <Fragment>
            {loading && <CustomCircularProgress />}
            <Box>
                <Paper sx={{ display: 'flex', bgcolor: '#DBE8D8', flex: 1, height: 42 }}>
                    <Box sx={{ pt: 0.5, pl: 0.7 }} >
                        <RecentActorsIcon fontSize='large' sx={{ color: '#2C5E1A' }} />
                    </Box>
                    <Box sx={{ flex: 1, fontSize: 18, pt: 0.9, pl: 1 }}>
                        <Typography sx={{ color: '#2C5E1A', fontWeight: 550 }}>
                            Daily Census
                        </Typography>
                    </Box>
                    <Box sx={{ flex: 1, }}>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', fontSize: 20, pt: 0.4, pr: 0.2 }}>
                            <CusIconButton size="md" variant="outlined" style={{ borderRadius: 12, bgcolor: '#F7F8F8', height: 35, width: 35 }}>
                                <Tooltip title="Close" placement="bottom" >
                                    <CloseIcon sx={{ cursor: 'pointer', size: 'lg', fontSize: 25, color: 'darkgreen', }} onClick={backtoHome} />
                                </Tooltip>
                            </CusIconButton>
                        </Box>
                    </Box>
                </Paper>
                <Box sx={{ pt: 0.3 }}>
                    <Paper sx={{ display: 'flex', bgcolor: '#F7F8F8', pr: 1, border: '0.2px solid #F7F8F8', py: 2 }}>
                        <Box sx={{ flex: 1 }} ></Box>
                        <Box sx={{ flex: 1 }} >

                            <TextFieldCustom
                                slotProps={{
                                    input: {
                                        min: moment(subDays(new Date(), 1)).format('YYYY-MM-DD'),
                                        max: moment(addDays(new Date(), 1)).format('YYYY-MM-DD')
                                    },
                                }}
                                size="md"
                                type="date"
                                name="dailyDate"
                                value={dailyDate}
                                onchange={QIDateChange}
                            />
                            <Box sx={{ pt: 0.2 }}>

                            </Box>
                        </Box>
                        <Box sx={{ flex: 1, pl: 1 }} >
                            <CssVarsProvider>
                                <Button variant="outlined" sx={{
                                    fontSize: 16, color: '#2C5E1A', width: 150, cursor: 'pointer',
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
                <Box sx={{ pt: 0.7, display: 'flex', overflow: 'auto' }}>
                    {tabFlag === 1 ? <ListNursingStations dailyDate={dailyDate} censusData={censusData} count={count}
                        setCount={setCount} />
                        :
                        <Box> </Box>
                    }
                </Box>
            </Box>
        </Fragment>
    )
}
export default memo(CensusCreate)