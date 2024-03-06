import { Box, Button, CssVarsProvider, Tooltip, Typography } from '@mui/joy'
import { Paper } from '@mui/material'
import React, { Fragment, memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import CloseIcon from '@mui/icons-material/Close';
import CusIconButton from 'src/views/Components/CusIconButton'
import { getQltyDept } from 'src/redux/actions/QualityIndicatorDept.action'
import moment from 'moment'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import { axioslogin } from 'src/views/Axios/Axios'
import { subDays } from 'date-fns'
import DailyCensusTableView from '../TableView/DailyCensusTableView'
import CensusDeptSecSelect from 'src/views/CommonSelectCode/CensusDeptSecSelect'

const DailyCensusDetails = () => {
    const [qltyDept, setQltyDept] = useState(0)
    const [dailyDate, setDailyDate] = useState(moment(new Date()).format('YYYY-MM-DD'))
    const [yesterday, setYesterday] = useState(0)
    const [total, setTotal] = useState(0)
    const [count, setCount] = useState(0)
    const [tableData, setTableData] = useState([])
    const [dayFlag, setDayFlag] = useState(0)
    const [edit, setEdit] = useState(0)
    const [existFlag, setExistFlag] = useState(0)
    const [dptName, setDptName] = useState()

    const history = useHistory()
    const dispatch = useDispatch()
    const backtoHome = useCallback(() => {
        history.push('/Home')
    }, [history])
    const id = useSelector((state) => {
        return state?.LoginUserData.empid
    })
    useEffect(() => {
        dispatch(getQltyDept())
    }, [dispatch])
    const QIDateChange = useCallback((e) => {
        setDailyDate(e.target.value)
    }, [])


    const [DailySensusDetails, setDailySensusDetails] = useState({
        census_slno: 0,
        admission: 0,
        discharge: 0,
        transferIn: 0,
        transferOut: 0,
        death: 0,
    })
    const { census_slno, admission, discharge, transferIn, transferOut, death } = DailySensusDetails
    const UpdateDailySensusDetails = useCallback((e) => {
        const containsOnlyDigits = (value) => /^\d+$/.test(value);
        const inputdata = (e.target.value);
        if (inputdata !== '' && !containsOnlyDigits(inputdata)) {
            infoNotify("Please enter data with digits only");
            return;
        }
        else {
            const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
            setDailySensusDetails({ ...DailySensusDetails, [e.target.name]: value })
        }
    }, [DailySensusDetails])

    const reset = useCallback(() => {
        setQltyDept(0)
        // setDailyDate(moment(new Date()).format('YYYY-MM-DD'))
        setYesterday(0)
        const formreset = {
            census_slno: 0,
            admission: 0,
            discharge: 0,
            transferIn: 0,
            transferOut: 0,
            death: 0,
        }
        setDailySensusDetails(formreset);
        setTotal(0)
        setEdit(0)
        setExistFlag(0)
    }, [])

    // const searchdata = useMemo(() => {
    //     return {
    //         qi_census_sec_slno: qltyDept,
    //         census_date: moment(new Date(prevday)).format('YYYY-MM-DD')
    //     }
    // }, [qltyDept])
    useEffect(() => {
        // const prevday = subDays(new Date(dailyDate), 1)
        const existSearch = {
            qi_census_sec_slno: qltyDept,
            census_date: moment(new Date(dailyDate)).format('YYYY-MM-DD')
        }
        const CheckExist = async (existSearch) => {
            const result = await axioslogin.post('/qidailycensus/exist', existSearch);
            const { success, data } = result.data;
            if (success === 1) {
                setExistFlag(1)
                const { census_slno, qi_census_sec_slno, census_date, yesterday_census, total_admission, total_discharge, transfer_in, transfer_out, total_death, census_total } = data[0]
                const fromdata = {
                    census_slno: census_slno,
                    admission: total_admission,
                    discharge: total_discharge,
                    transferIn: transfer_in,
                    transferOut: transfer_out,
                    death: total_death,
                }
                setQltyDept(qi_census_sec_slno)
                setDailyDate(census_date)
                setDailySensusDetails(fromdata);
                setYesterday(yesterday_census)
                setTotal(census_total)
            }
            else if (success === 2) {
                setExistFlag(0)
                const searchdata = {
                    qi_census_sec_slno: qltyDept,
                    census_date: moment(subDays(new Date(dailyDate), 1)).format('YYYY-MM-DD')
                }
                const PreviousDayCount = async (searchdata) => {
                    const result = await axioslogin.post('/qidailycensus/yesterday', searchdata);
                    const { success, data } = result.data;
                    if (success === 1) {
                        const { census_total } = data[0]
                        setYesterday(census_total)
                        const fromdata = {
                            admission: 0,
                            discharge: 0,
                            transferIn: 0,
                            transferOut: 0,
                            death: 0,
                        }
                        setDailySensusDetails(fromdata);
                    }
                    else {
                        setYesterday(0)
                        const fromdata = {
                            admission: 0,
                            discharge: 0,
                            transferIn: 0,
                            transferOut: 0,
                            death: 0,
                        }
                        setDailySensusDetails(fromdata);
                    }
                }
                PreviousDayCount(searchdata)
            }
        }
        CheckExist(existSearch)
    }, [qltyDept, dailyDate])

    useEffect(() => {
        // if (total < death) {
        //     infoNotify("Plase Check Death Count")
        // } else if (total < discharge) {
        //     infoNotify("Plase Check Discharge Count")
        // } else if (total < transferOut) {
        //     infoNotify("Plase Check Tranfer Out Count")
        // } else {
        setTotal((yesterday + (admission - discharge) + (transferIn - transferOut) - death))
        // }
    }, [yesterday, admission, discharge, transferIn, transferOut, death, total])


    const ResetData = useCallback(() => {
        reset()
    }, [reset])

    const postdata = useMemo(() => {
        return {
            qi_census_sec_slno: qltyDept,
            census_date: dailyDate,
            yesterday_census: yesterday,
            total_admission: admission,
            total_discharge: discharge,
            transfer_in: transferIn,
            transfer_out: transferOut,
            total_death: death,
            census_total: total,
            create_user: id
        }
    }, [qltyDept, dailyDate, yesterday, admission, discharge, transferIn, transferOut, death, total, id])
    const patchdata = useMemo(() => {
        return {
            qi_census_sec_slno: qltyDept,
            census_date: dailyDate,
            yesterday_census: yesterday,
            total_admission: admission,
            total_discharge: discharge,
            transfer_in: transferIn,
            transfer_out: transferOut,
            total_death: death,
            census_total: total,
            edit_user: id,
            census_slno: census_slno
        }
    }, [qltyDept, dailyDate, yesterday, admission, discharge, transferIn, transferOut, death, total, id, census_slno])

    const SaveDetails = useCallback((e) => {
        if (qltyDept === 0) {
            infoNotify("Please Select Department Section")
        }
        else if (total < 0) {
            infoNotify("Total No.Of Patients Not Lessthan zero")
        }
        else {

            const InsertData = async (postdata) => {
                const result = await axioslogin.post('/qidailycensus/save', postdata);
                const { message, success } = result.data;
                if (success === 1) {
                    succesNotify(message)
                    setCount(count + 1);
                    reset()
                }
                else {
                    infoNotify(message)
                }
            }
            const UpdateData = async (patchdata) => {
                const result = await axioslogin.patch('/qidailycensus/update', patchdata);
                const { message, success } = result.data;
                if (success === 1) {
                    succesNotify(message)
                    setCount(count + 1);
                    reset()
                }
                else {
                    infoNotify(message)
                }
            }

            if (edit === 0) {
                InsertData(postdata)
            } else if (edit === 1 || existFlag === 1) {
                UpdateData(patchdata)
            }
        }

    }, [postdata, count, patchdata, reset, edit, qltyDept, total, existFlag])


    useEffect(() => {
        const dailydata = {
            census_date: moment(new Date(dailyDate)).format('YYYY-MM-DD')
        }
        const GetCensusDetails = async (dailydata) => {
            const result = await axioslogin.post('/qidailycensus/view', dailydata);
            const { data, success } = result.data;
            if (success === 1) {
                setTableData(data)
                setDayFlag(1)
            }
            else {
                setTableData([])
                setDayFlag(0)
            }
        }
        GetCensusDetails(dailydata)
    }, [count, dailyDate])
    const rowSelect = useCallback((params) => {
        setEdit(1)
        const data = params.api.getSelectedRows()
        const { census_slno, qi_census_sec_slno, qi_census_sec_name, census_date, yesterday_census, total_admission, total_discharge, transfer_in, transfer_out,
            total_death, census_total } = data[0]
        const frmdata = {
            census_slno: census_slno,
            admission: total_admission,
            discharge: total_discharge,
            transferIn: transfer_in,
            transferOut: transfer_out,
            death: total_death
        }
        setDailySensusDetails(frmdata)
        setQltyDept(qi_census_sec_slno)
        setDailyDate(census_date)
        setYesterday(yesterday_census)
        setTotal(census_total)
        setDptName(qi_census_sec_name)

    }, [])
    return (
        <Fragment>
            <Box sx={{ width: "100%", height: "100%", bgcolor: '#F7F8F8' }}>
                <Paper sx={{ display: 'flex', bgcolor: '#E7F2F8', flex: 1, height: 42 }}>
                    <Box sx={{ pt: 0.5, pl: 0.7 }} >
                        <RecentActorsIcon fontSize='large' sx={{ color: '#00838f' }} />
                    </Box>
                    <Box sx={{ flex: 1, fontSize: 18, pt: 0.9, pl: 1 }}>
                        <Typography sx={{ color: '#00838f', fontWeight: 550 }}>
                            Daily Census
                        </Typography>
                    </Box>
                    <Box sx={{ flex: 1, }}>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', fontSize: 20, pt: 0.4, pr: 0.2 }}>
                            <CusIconButton size="md" variant="outlined" color="primary" style={{ borderRadius: 15 }}>
                                <Tooltip title="Close" placement="bottom" >
                                    <CloseIcon sx={{ fontSize: 25 }} color='#00838f' onClick={backtoHome} />
                                </Tooltip>
                            </CusIconButton>
                        </Box>
                    </Box>
                </Paper>
                <Box sx={{ pt: 0.3, }}>
                    <Paper sx={{ display: 'flex' }}>
                        <Box sx={{ display: 'flex', flex: 1.5, bgcolor: '#F7F8F8', pt: 1, pr: 1 }}>
                            <Box sx={{ flex: 1, pl: 1 }} >
                                <Box sx={{ pl: 1 }}>
                                    <Typography sx={{ color: '#088280' }}>Department Section</Typography>
                                </Box>
                                {
                                    edit === 0 ?
                                        <Box sx={{ pt: 0.2 }}>
                                            <CensusDeptSecSelect
                                                qltyDept={qltyDept}
                                                setQltyDept={setQltyDept}
                                                setDptName={setDptName}
                                            />
                                        </Box> : <Box sx={{ pt: 0.2 }}>

                                            <TextFieldCustom
                                                size="md"
                                                type="text"
                                                name="dptName"
                                                value={dptName}
                                                disabled={true}
                                            />
                                        </Box>
                                }
                            </Box>
                            <Box sx={{ flex: 1, pl: 1 }} >
                                <Box sx={{ pl: 1 }}>
                                    <Typography sx={{ color: '#088280' }}>Date</Typography>
                                </Box>
                                <Box sx={{ pt: 0.2 }}>
                                    {/* {edit === 0 ? */}
                                    < TextFieldCustom
                                        slotProps={{
                                            input: {
                                                // min: moment(new Date()).format('YYYY-MM-DD'),
                                                max: moment(new Date()).format('YYYY-MM-DD')
                                            },
                                        }}
                                        size="md"
                                        type="date"
                                        name="dailyDate"
                                        value={dailyDate}
                                        onchange={QIDateChange}
                                    />
                                    {/* :
                                        <TextFieldCustom
                                            disabled={true}
                                            size="md"
                                            type="date"
                                            name="dailyDate"
                                            value={dailyDate}
                                            onchange={QIDateChange}
                                        />} */}
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', flex: 1, bgcolor: '#F7F8F8', pt: 1, pr: 1 }}>
                            <Box sx={{ flex: 1, pl: 0.5 }} >
                                <Box sx={{ pl: 1 }}>
                                    <Typography sx={{ color: '#088280' }}>Yesterday Census</Typography>
                                </Box>
                                <Box sx={{ pt: 0.2, fontWeight: 650 }}>
                                    <TextFieldCustom
                                        disabled
                                        size="md"
                                        type="text"
                                        name="yesterday"
                                        value={yesterday}
                                    />
                                </Box>
                            </Box>
                            <Box sx={{ flex: 1, pl: 1 }} >
                                <Box sx={{ pl: 1 }}>
                                    <Typography sx={{ color: '#088280' }}>Admissions</Typography>
                                </Box>
                                <Box sx={{ pt: 0.2 }}>
                                    <TextFieldCustom
                                        size="md"
                                        type="text"
                                        name="admission"
                                        value={admission}
                                        onchange={UpdateDailySensusDetails}
                                    />
                                </Box>
                            </Box>
                        </Box>
                    </Paper>
                    <Paper sx={{ display: 'flex', flex: 1, bgcolor: '#F7F8F8', py: 1, pr: 1 }}>
                        <Box sx={{ flex: 1, pl: 1 }} >
                            <Box sx={{ pl: 1 }}>
                                <Typography sx={{ color: '#088280' }}>Discharge</Typography>
                            </Box>
                            <Box sx={{ pt: 0.2 }}>
                                <TextFieldCustom
                                    size="md"
                                    type="text"
                                    name="discharge"
                                    value={discharge}
                                    onchange={UpdateDailySensusDetails}
                                />
                            </Box>
                        </Box>
                        <Box sx={{ flex: 1, pl: 1 }} >
                            <Box sx={{ pl: 1 }}>
                                <Typography sx={{ color: '#088280' }}>Transfer In</Typography>
                            </Box>
                            <Box sx={{ pt: 0.2 }}>
                                <TextFieldCustom
                                    size="md"
                                    type="text"
                                    name="transferIn"
                                    value={transferIn}
                                    onchange={UpdateDailySensusDetails}
                                />
                            </Box>
                        </Box>
                        <Box sx={{ flex: 1, pl: 1 }} >
                            <Box sx={{ pl: 1 }}>
                                <Typography sx={{ color: '#088280' }}>Transfer Out</Typography>
                            </Box>
                            <Box sx={{ pt: 0.2 }}>
                                <TextFieldCustom
                                    size="md"
                                    type="text"
                                    name="transferOut"
                                    value={transferOut}
                                    onchange={UpdateDailySensusDetails}
                                />
                            </Box>
                        </Box>
                        <Box sx={{ flex: 1, pl: 1 }} >
                            <Box sx={{ pl: 1 }}>
                                <Typography sx={{ color: '#088280' }}>Death</Typography>
                            </Box>
                            <Box sx={{ pt: 0.2 }}>
                                <TextFieldCustom
                                    size="md"
                                    type="text"
                                    name="death"
                                    value={death}
                                    onchange={UpdateDailySensusDetails}
                                />
                            </Box>
                        </Box>
                        <Box sx={{ flex: 1, pl: 1 }} >
                            <Box sx={{ pl: 1 }}>
                                <Typography sx={{ color: '#088280' }}>Total</Typography>
                            </Box>
                            <Box sx={{ pt: 0.2, fontWeight: 650 }}>
                                <TextFieldCustom
                                    disabled
                                    size="md"
                                    type="text"
                                    name="total"
                                    value={total}
                                />
                            </Box>
                        </Box>
                    </Paper>
                </Box>
                <Paper sx={{ display: "flex", justifyContent: 'flex-end', flex: 1, pr: 5, bgcolor: '#E7F2F8', height: 50 }}>
                    <Box sx={{ display: "flex", pt: 1 }}>
                        <Box sx={{}}>
                            <CssVarsProvider>
                                {
                                    edit === 1 || existFlag === 1 ?
                                        <Button variant="outlined" sx={{
                                            fontSize: 16, color: '#004F76', width: 100, cursor: 'pointer',
                                            borderRadius: 25, bgcolor: '#F7F8F8'
                                        }}
                                            onClick={SaveDetails}
                                        >
                                            Update</Button> :
                                        <Button variant="outlined" sx={{
                                            fontSize: 16, color: '#004F76', width: 100, cursor: 'pointer',
                                            borderRadius: 25, bgcolor: '#F7F8F8'
                                        }}
                                            onClick={SaveDetails}
                                        >
                                            Save</Button>
                                }

                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ pl: 1 }}>
                            <CssVarsProvider>
                                <Button variant="outlined" sx={{
                                    fontSize: 16, color: '#004F76', width: 100, cursor: 'pointer',
                                    borderRadius: 25, bgcolor: '#F7F8F8'
                                }}
                                    onClick={ResetData}
                                >
                                    Reset</Button>
                            </CssVarsProvider>
                        </Box>
                    </Box>
                </Paper>
                <Box sx={{ pt: 0.5 }}>
                    {dayFlag === 1 ? <DailyCensusTableView tableData={tableData} rowSelect={rowSelect} /> : null}
                </Box>
            </Box >
        </Fragment >
    )
}

export default memo(DailyCensusDetails)