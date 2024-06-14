import { Button, CssVarsProvider } from '@mui/joy'
import { Box, Paper, TextField } from '@mui/material'
import React, { Fragment, memo, useCallback, useEffect, useState } from 'react'
import QIDepartmentSelect from '../CommonSelectCode/QIDepartmentSelect'
import { useDispatch, useSelector } from 'react-redux'
import { getQltyDept } from 'src/redux/actions/QualityIndicatorDept.action'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { infoNotify } from '../Common/CommonCode'
import PatientsListView from './CommonComponents/PatientsListView'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { format, subDays } from 'date-fns'
import { RefreshPatientList } from './CommonComponents/RefreshPatientList'

const DepartmentWisePatientMarking = () => {
    const dispatch = useDispatch()
    const [qidept, setQidept] = useState(0)
    const [depName, setDepName] = useState('')
    const [depCode, setDepCode] = useState('')
    const [qitype, setQitype] = useState(0)
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
    const id = useSelector((state) => {
        return state?.LoginUserData.empid
    })

    const SearchDetails = useCallback((e) => {
        if (qitype === 0) {
            infoNotify("Select Department")
            setSearchFlag(0)
        }
        else {
            const RefreshPatients = async (setCount) => {
                await RefreshPatientList(qidept, count, setCount, qitype, depCode, id, dailyDate)
            }
            RefreshPatients(setCount)
            setSearchFlag(1)
        }
    }, [qitype, depCode, dailyDate, id, count, qidept])
    return (
        <Fragment>
            {searchFlag === 1 ?
                <PatientsListView setSearchFlag={setSearchFlag} qidept={qidept} depName={depName}
                    depCode={depCode} dailyDate={dailyDate} count={count} setCount={setCount} qitype={qitype} />
                :
                <Box sx={{ height: '91vh', width: '100%', display: 'flex', bgcolor: '#eceff1' }}>
                    <Box sx={{ mx: 'auto', mt: 20, }}>
                        <Paper sx={{ height: 200, width: 500, boxShadow: 10, bgcolor: '#cfd8dc' }} >
                            <Paper variant='outlined' square sx={{ display: 'flex' }}>
                                <Box sx={{
                                    display: 'flex', flex: 1, justifyContent: 'center', pt: 1.5, color: '#455a64', bgcolor: '#cfd8dc',
                                    fontWeight: 'bold'
                                }}>
                                    GET PATIENT&apos;S DETAILS
                                </Box>
                                <Box sx={{ display: 'flex', flex: 0.1, justifyContent: 'flex-end', fontSize: 20, pt: 0.5, pr: 0.5, bgcolor: '#cfd8dc' }}>
                                    <HighlightOffIcon sx={{ cursor: 'pointer', size: 'sm', opacity: 0.7 }} onClick={backtoHome} />
                                </Box>
                            </Paper>
                            <Box sx={{ mx: 1, pt: 0.5, flex: 0.8 }}>
                                <QIDepartmentSelect qidept={qidept} setQidept={setQidept} setDepName={setDepName} setDepCode={setDepCode}
                                    setQitype={setQitype}
                                />
                            </Box>
                            <Box sx={{ mx: 1, pt: 0.2, flex: 1, bgcolor: 'white' }} >
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        value={dailyDate}
                                        views={['year', 'month', 'day']}
                                        size="small"
                                        inputFormat='dd-MM-yyyy'
                                        minDate={subDays(new Date(), 2)}
                                        maxDate={new Date()}
                                        // slotProps={{ textField: { variant: "plain" } }}
                                        onChange={(newValue) => {
                                            setDailyDate(newValue);
                                        }}
                                        renderInput={(params) => (
                                            <TextField {...params} helperText={null} size='small' fullWidth
                                                sx={{ bgcolor: 'white', borderRadius: 0, pt: 0.5 }}
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