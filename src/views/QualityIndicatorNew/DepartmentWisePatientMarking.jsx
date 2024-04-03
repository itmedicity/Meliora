
import { Button, CssVarsProvider } from '@mui/joy'
import { Box, Paper, TextField } from '@mui/material'
import React, { Fragment, memo, useCallback, useEffect, useMemo, useState } from 'react'
import QIDepartmentSelect from '../CommonSelectCode/QIDepartmentSelect'
import { useDispatch, useSelector } from 'react-redux'
import { getQltyDept } from 'src/redux/actions/QualityIndicatorDept.action'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { infoNotify } from '../Common/CommonCode'
import PatientsListView from './QIComponents/PatientsListView'
import moment from 'moment'
import { axiosellider, axioslogin } from '../Axios/Axios'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { format } from 'date-fns'

const DepartmentWisePatientMarking = () => {
    const dispatch = useDispatch()
    const [qidept, setQidept] = useState(0)
    const [depName, setDepName] = useState('')
    const [depCode, setDepCode] = useState('')
    const [searchFlag, setSearchFlag] = useState(0)
    const [dailyDate, setDailyDate] = useState(format(new Date(), "yyyy-MM-dd"));
    const [count, setCount] = useState(0)
    const history = useHistory()
    const backtoHome = useCallback(() => {
        history.push('/Home')
    }, [history])

    useEffect(() => {
        dispatch(getQltyDept())
    }, [dispatch])
    // const QIDateChange = useCallback((e) => {
    //     setDailyDate(e.target.value)
    //     setSearchFlag(0)
    // }, [])

    const id = useSelector((state) => {
        return state?.LoginUserData.empid
    })
    const patchdata = useMemo(() => {
        return {
            last_updatedate: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
            qi_dept_no: qidept,
        }
    }, [qidept])
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
            const UpdateImportedDate = async (patchdata) => {
                const result = await axioslogin.patch('/qiendoscopy/dateupdate', patchdata)
                return result.data
            }
            GetExistData(existSearch).then((val) => {
                const { success } = val
                if (success === 1) {
                    GetElliderData(elliderSearch).then((value) => {
                        const { success, data, message } = value
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
                                    endo_ptmobile: val.PTC_MOBILE,
                                    visit_token: val.VSN_TOKEN
                                }
                            })
                            InsertData(insertArray).then((val) => {
                                const { success } = val
                                if (success === 1) {
                                    setCount(count + 1)

                                    UpdateImportedDate(patchdata).then((val) => {
                                        const { success } = val
                                        if (success === 1) {

                                        }
                                    })
                                }
                                else {
                                }
                            })
                            setSearchFlag(1)
                        }
                        else if (success === 2) {
                            infoNotify(message)
                        }
                    })
                }
                else if (success === 2) {
                    setSearchFlag(1)
                }
            })
        }
    }, [qidept, depCode, dailyDate, id, count, patchdata])

    return (
        <Fragment>
            {searchFlag === 1 ? <PatientsListView setSearchFlag={setSearchFlag} qidept={qidept} depName={depName}
                depCode={depCode} dailyDate={dailyDate} count={count} setCount={setCount} /> :

                <Box sx={{ height: '91vh', width: '100%', display: 'flex', bgcolor: '#eceff1' }}>
                    <Box sx={{ mx: 'auto', mt: 20, }}>
                        <Paper sx={{ height: 200, width: 500, boxShadow: 10, bgcolor: '#cfd8dc' }} >
                            <Paper variant='outlined' square sx={{ display: 'flex' }}>
                                <Box sx={{
                                    display: 'flex', flex: 1, justifyContent: 'center', pt: 1.5, color: '#455a64', bgcolor: '#cfd8dc',
                                    fontWeight: 'bold'
                                }}>
                                    GET PATIENT&apos;S  DETAILS
                                </Box>
                                <Box sx={{ display: 'flex', flex: 0.1, justifyContent: 'flex-end', fontSize: 20, pt: 0.5, pr: 0.5, bgcolor: '#cfd8dc' }}>
                                    <HighlightOffIcon sx={{ cursor: 'pointer', size: 'sm', opacity: 0.7 }} onClick={backtoHome} />
                                </Box>
                            </Paper>
                            <Box sx={{ mx: 1, pt: 0.5, flex: 0.8 }}>
                                <QIDepartmentSelect qidept={qidept} setQidept={setQidept} setDepName={setDepName} setDepCode={setDepCode} />
                            </Box>
                            <Box sx={{ mx: 1, pt: 0.2, flex: 1, bgcolor: 'white' }} >

                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        value={dailyDate}
                                        views={['year', 'month', 'day']}
                                        size="small"
                                        inputFormat='dd-MM-yyyy'
                                        // slotProps={{ textField: { variant: "plain" } }}
                                        onChange={(newValue) => {
                                            setDailyDate(newValue);
                                        }}
                                        renderInput={(params) => (
                                            <TextField {...params} helperText={null} size='small' fullWidth sx={{ bgcolor: 'white', borderRadius: 0, pt: 0.5 }}
                                            />
                                        )}
                                    />
                                </LocalizationProvider>
                            </Box>
                            < Box sx={{ mx: 1, pt: 0.5, flex: 1 }}>
                                <CssVarsProvider>
                                    <Button sx={{
                                        width: '100%', height: 46, cursor: 'pointer', color: 'white', fontSize: 17,
                                        bgcolor: '#90a4ae', border: '1px solid lightgrey', borderRight: 'none', borderRadius: 0,
                                        ":hover": {
                                            bgcolor: '#546e7a',
                                            boxShadow: 2,
                                            color: 'white',
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
                </Box >
            }
        </Fragment >
    )
}

export default memo(DepartmentWisePatientMarking)