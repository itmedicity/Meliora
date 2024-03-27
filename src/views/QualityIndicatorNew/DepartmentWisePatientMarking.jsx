
import { Box, Button, CssVarsProvider, Input } from '@mui/joy'
import { Paper } from '@mui/material'
import React, { Fragment, memo, useCallback, useEffect, useState } from 'react'
import QIDepartmentSelect from '../CommonSelectCode/QIDepartmentSelect'
import { useDispatch, useSelector } from 'react-redux'
import { getQltyDept } from 'src/redux/actions/QualityIndicatorDept.action'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { infoNotify } from '../Common/CommonCode'
import PatientsListView from './QIComponents/PatientsListView'
import moment from 'moment'
import { axiosellider, axioslogin } from '../Axios/Axios'

const DepartmentWisePatientMarking = () => {
    const dispatch = useDispatch()
    const [qidept, setQidept] = useState(0)
    const [depName, setDepName] = useState('')
    const [depCode, setDepCode] = useState('')
    const [searchFlag, setSearchFlag] = useState(0)
    const [dailyDate, setDailyDate] = useState(moment(new Date()).format('YYYY-MM-DD'))
    const [count, setCount] = useState(0)
    const history = useHistory()
    const backtoHome = useCallback(() => {
        history.push('/Home')
    }, [history])

    useEffect(() => {
        dispatch(getQltyDept())
    }, [dispatch])
    const QIDateChange = useCallback((e) => {
        setDailyDate(e.target.value)
        setSearchFlag(0)
    }, [])

    const id = useSelector((state) => {
        return state?.LoginUserData.empid
    })

    const SearchDetails = useCallback((e) => {
        if (qidept === 0) {
            infoNotify("Select Department")
            setSearchFlag(0)
        }
        else {
            const elliderSearch = {
                from: moment(dailyDate).format('DD/MM/yyyy 00:00:00'),
                to: moment(dailyDate).format('DD/MM/yyyy 23:59:59'),
                depCode: depCode
            }
            const existSearch = {
                from: moment(dailyDate).format('YYYY-MM-DD 00:00:00'),
                to: moment(dailyDate).format('YYYY-MM-DD 23:59:59'),
            }

            const GetElliderData = async (elliderSearch) => {
                const result = await axiosellider.post('/qualityIndicator/patientList', elliderSearch);
                return result.data
            }
            const GetExistData = async (existSearch) => {
                const result = await axioslogin.post('/qiendoscopy/exist', existSearch);
                return result.data
            }
            const InsertData = async (insertArray) => {
                const result = await axioslogin.post('/qiendoscopy/save', insertArray);
                return result.data
            }

            GetExistData(existSearch).then((val) => {
                const { success } = val
                if (success === 1) {
                    GetElliderData(elliderSearch).then((value) => {
                        const { success, data } = value
                        if (success === 1) {
                            const insertArray = data?.map((val) => {
                                return {
                                    qi_endo_date: moment(new Date(val.VSD_DATE)).format('YYYY-MM-DD HH:mm:ss'),
                                    endo_ptno: val.PT_NO,
                                    endo_ptname: val.PTC_PTNAME,
                                    endo_ptsex: val.PTC_SEX,
                                    endo_ptage: val.PTN_YEARAGE + 'Y ' + val.PTN_MONTHAGE + 'M ' + val.PTN_DAYAGE + 'D',
                                    endo_ptaddrs1: val.PTC_LOADD1,
                                    endo_ptaddrs2: val.PTC_LOADD2,
                                    endo_ptaddrs3: val.PTC_LOADD3,
                                    endo_ptaddrs4: val.PTC_LOADD4,
                                    doctor_name: val.DOC_NAME,
                                    qi_dept_code: val.DP_CODE,
                                    endo_status: 0,
                                    create_user: id,
                                    exist_date: moment(new Date(val.VSD_DATE)).format('YYYY-MM-DD'),

                                }
                            })

                            InsertData(insertArray).then((val) => {
                                const { success } = val
                                if (success === 1) {
                                    setCount(count + 1)
                                }
                                else {
                                }
                            })
                        }
                    })
                }
                else if (success === 2) {

                }
            })

            setSearchFlag(1)
        }
    }, [qidept, depCode, dailyDate, id, count])

    return (
        <Fragment>
            {searchFlag === 1 ? <PatientsListView setSearchFlag={setSearchFlag} qidept={qidept} depName={depName}
                depCode={depCode} dailyDate={dailyDate} count={count} setCount={setCount} /> :

                <Box sx={{ height: '91vh', width: '100%', display: 'flex', bgcolor: '#E4E5E8' }}>
                    <Box sx={{ mx: 'auto', mt: 20, }}>
                        <Paper sx={{ height: 200, width: 500, boxShadow: 10 }} >
                            <Paper variant='outlined' square sx={{ display: 'flex' }}>
                                <Box sx={{ display: 'flex', flex: 1, justifyContent: 'center', py: 1, color: '#0A0708' }}>
                                    GET PATIENT&apos;S DETAILS
                                </Box>
                                <Box sx={{ display: 'flex', flex: 0.1, justifyContent: 'flex-end', fontSize: 20, pt: 0.5, pr: 0.5 }}>
                                    <HighlightOffIcon sx={{ cursor: 'pointer', size: 'sm', opacity: 0.7 }} onClick={backtoHome} />
                                </Box>
                            </Paper>
                            <Box sx={{ mx: 1, pt: 0.5, flex: 1 }}>
                                <QIDepartmentSelect qidept={qidept} setQidept={setQidept} setDepName={setDepName} setDepCode={setDepCode} />
                            </Box>
                            <Box sx={{ mx: 1, pt: 0.2, flex: 1 }} >
                                <CssVarsProvider>
                                    <Input
                                        style={{ height: 40, borderRadius: 0, }}
                                        slotProps={{
                                            input: {
                                                // min: moment(subDays(new Date(), 1)).format('YYYY-MM-DD'),
                                                // max: moment(addDays(new Date(), 1)).format('YYYY-MM-DD')
                                                max: moment(new Date()).format('YYYY-MM-DD')
                                            },
                                        }}
                                        size="md"
                                        type="date"
                                        name="dailyDate"
                                        value={dailyDate}
                                        onChange={QIDateChange}
                                    />
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ mx: 1, pt: 0.5, flex: 1 }}>
                                <CssVarsProvider>
                                    <Button sx={{
                                        width: '100%', height: 46, cursor: 'pointer', color: 'white', fontSize: 17,
                                        bgcolor: '#616161', border: '1px solid lightgrey', borderRight: 'none', borderRadius: 0,
                                        ":hover": {
                                            bgcolor: '#757575',
                                            boxShadow: 2,
                                        }
                                    }}
                                        onClick={SearchDetails}
                                    >
                                        SEARCH
                                    </Button>
                                </CssVarsProvider>
                            </Box>
                        </Paper>
                    </Box>
                </Box>
            }
        </Fragment >
    )
}

export default memo(DepartmentWisePatientMarking)