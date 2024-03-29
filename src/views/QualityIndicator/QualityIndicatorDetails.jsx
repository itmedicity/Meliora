import { Box, Tooltip, Typography } from '@mui/joy'
import { Paper } from '@mui/material'
import React, { Fragment, memo, useCallback, useEffect, useMemo, useState } from 'react'
import CusIconButton from '../Components/CusIconButton'
import CloseIcon from '@mui/icons-material/Close';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch } from 'react-redux';
import { getQltyDept } from 'src/redux/actions/QualityIndicatorDept.action';
import TextFieldCustom from '../Components/TextFieldCustom';
import moment from 'moment';
import { infoNotify } from '../Common/CommonCode';
import SearchIcon from '@mui/icons-material/Search';
import EndoscopyDetails from './EndoscopyDetails/EndoscopyDetails';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import AddchartIcon from '@mui/icons-material/Addchart';
import { axioslogin } from '../Axios/Axios';
import EmergencyDetails from './EmergencyDetails/EmergencyDetails';
import CensusDeptSecSelect from '../CommonSelectCode/CensusDeptSecSelect';
const QualityIndicatorDetails = () => {
    const [qltyDept, setQltyDept] = useState(0)
    const [dailyDate, setDailyDate] = useState(moment(new Date()).format('YYYY-MM-DD'))
    // const [qiDepartmentData, setQiDepartmentData] = useState([])
    const [checkDpt, setCheckDpt] = useState(0)
    const [totpatients, setTotpatients] = useState(0)
    const [endoexistData, setEndoExistData] = useState([])
    const [endoFlag, setEndoFlag] = useState(0)
    const [emerExistData, setEmerExistdata] = useState([])
    const [emerFlag, setEmerFlag] = useState(0)
    const history = useHistory()
    const dispatch = useDispatch()
    const backtoHome = useCallback(() => {
        history.push('/Home')
    }, [history])
    useEffect(() => {
        dispatch(getQltyDept())
    }, [dispatch])
    const QIDateChange = useCallback((e) => {
        setDailyDate(e.target.value)
    }, [])
    const PatientsOnChange = useCallback((e) => {
        const containsOnlyDigits = (value) => /^\d+$/.test(value);
        const inputdata = (e.target.value);
        if (inputdata !== '' && !containsOnlyDigits(inputdata)) {
            infoNotify("Please enter data with digits only");
            return;
        }
        else {
            setTotpatients(e.target.value)
            // setCheckDpt(0)
        }
    }, [])
    const postdata = useMemo(() => {
        return {
            dailyDate: dailyDate
        }
    }, [dailyDate])

    const SearchQIData = useCallback(() => {
        if (qltyDept === 0) {
            infoNotify("Select Department Details")
        }
        else if (qltyDept === 1) {
            const CheckExist = async (postdata) => {
                const result = await axioslogin.post('/qiendoscopy/exist', postdata)
                const { data, success } = result.data;
                if (success === 1) {
                    setEndoFlag(1)
                    setEndoExistData(data)

                } else {
                    setEndoFlag(0)
                    setEndoExistData([])
                }
            }
            CheckExist(postdata)
            setCheckDpt(1)
        }
        else if (qltyDept === 2) {
            const CheckExist = async (postdata) => {
                const result = await axioslogin.post('/qiemergency/exist', postdata)
                const { data, success } = result.data;
                if (success === 1) {
                    setEmerFlag(1)
                    setEmerExistdata(data)

                } else {
                    setEmerFlag(0)
                    setEmerExistdata([])
                }
            }
            CheckExist(postdata)
            setCheckDpt(2)
        }
        else {
            setCheckDpt(0)
        }
    }, [qltyDept, postdata])

    const ResetData = useCallback((e) => {
        setQltyDept(0)
        setDailyDate(moment(new Date()).format('YYYY-MM-DD'))
        setCheckDpt(0)
        setTotpatients(0)
        setEndoFlag(0)
        setEndoExistData([])
        setEmerFlag(0)
        setEmerExistdata([])
    }, [])

    return (
        <Fragment>
            <Box sx={{ width: "100%", height: "100%" }}>
                <Paper sx={{ display: 'flex', bgcolor: '#DBE8D8', flex: 1, height: 40 }}>
                    <Box sx={{ pt: 0.8, pl: 0.5 }} >
                        <AddchartIcon sx={{ color: 'darkgreen' }} />
                    </Box>
                    <Box sx={{ flex: 1, fontSize: 17, pt: 0.8, pl: 1 }}>
                        <Typography sx={{ color: 'darkgreen', fontWeight: 550 }}>
                            Quality Indicator
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
                <Paper sx={{ display: 'flex', py: 2, bgcolor: '#F7F8F8' }}>
                    <Box sx={{ flex: 1, pl: 1 }} >
                        <Box sx={{ pl: 1 }}>
                            <Typography>Department</Typography>
                        </Box>
                        <Box sx={{ pt: 0.2 }}>
                            <CensusDeptSecSelect
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
                        </Box>
                    </Box>
                    <Box sx={{ flex: 0.5, pl: 1 }} >
                        <Box sx={{ pl: 1 }}>
                            <Typography>Total No.Of Patients</Typography>
                        </Box>
                        <Box sx={{ pt: 0.2 }}>
                            <TextFieldCustom
                                style={{ width: 250 }}
                                size="md"
                                type="text"
                                name="totpatients"
                                value={totpatients}
                                onchange={PatientsOnChange}
                            />
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', flex: 0.5, pl: 1, pt: 3.2 }} >
                        <Box sx={{}}>
                            <CusIconButton size="sm" variant="outlined" color="primary"  >
                                <Tooltip title="Search" placement="bottom" >
                                    <SearchIcon sx={{ fontSize: 22, color: "darkgreen" }} onClick={SearchQIData} />
                                </Tooltip>
                            </CusIconButton>
                        </Box>
                        <Box sx={{ pl: 1 }}>
                            <CusIconButton size="sm" variant="outlined" color="primary"  >
                                <Tooltip title="Reset" placement="bottom" >
                                    <RestartAltIcon sx={{ fontSize: 22, color: "darkgreen" }} onClick={ResetData} />
                                </Tooltip>
                            </CusIconButton>
                        </Box>

                    </Box>
                    <Box sx={{ flex: 1 }} > </Box>
                </Paper>
                <Box sx={{ pt: 0.5, height: window.innerHeight - 225, overflow: 'auto' }}>
                    {
                        checkDpt === 1 ?
                            <EndoscopyDetails totpatients={totpatients} setTotpatients={setTotpatients} dailyDate={dailyDate}
                                setCheckDpt={setCheckDpt} endoFlag={endoFlag} endoexistData={endoexistData}
                                setEndoExistData={setEndoExistData} setQltyDept={setQltyDept} setEndoFlag={setEndoFlag} />
                            : checkDpt === 2 ?
                                <EmergencyDetails totpatients={totpatients} setTotpatients={setTotpatients} dailyDate={dailyDate}
                                    emerExistData={emerExistData} emerFlag={emerFlag} setCheckDpt={setCheckDpt}
                                    setEmerExistdata={setEmerExistdata} setQltyDept={setQltyDept} setEmerFlag={setEmerFlag} />
                                : null
                    }
                </Box>
            </Box>

        </Fragment >
    )
}

export default memo(QualityIndicatorDetails)