
import { Box, Button, CssVarsProvider, Input } from '@mui/joy'
import { Paper } from '@mui/material'
import React, { Fragment, memo, useCallback, useEffect, useState } from 'react'
import QIDepartmentSelect from '../CommonSelectCode/QIDepartmentSelect'
import { useDispatch } from 'react-redux'
import { getQltyDept } from 'src/redux/actions/QualityIndicatorDept.action'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { infoNotify } from '../Common/CommonCode'
import PatientsListView from './QIComponents/PatientsListView'
import moment from 'moment'

const DepartmentWisePatientMarking = () => {
    const dispatch = useDispatch()
    const [qidept, setQidept] = useState(0)
    const [depName, setDepName] = useState('')
    const [depCode, setDepCode] = useState('')
    const [searchFlag, setSearchFlag] = useState(0)
    const [dailyDate, setDailyDate] = useState(moment(new Date()).format('YYYY-MM-DD'))
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
    const SearchDetails = useCallback(() => {
        if (qidept === 0) {
            infoNotify("Select Department")
            setSearchFlag(0)
        }
        else {
            setSearchFlag(1)



        }
    }, [qidept])
    // console.log("dpt code", depCode);
    // console.log("dpt name", depName);
    // console.log("dpt no", qidept);
    return (
        <Fragment>
            {searchFlag === 1 ? <PatientsListView setSearchFlag={setSearchFlag} qidept={qidept} depName={depName} depCode={depCode} /> :

                <Box sx={{ height: '91vh', width: '100%', display: 'flex', bgcolor: '#E4E5E8' }}>
                    <Box sx={{ mx: 'auto', mt: 20, }}>
                        <Paper sx={{ height: 200, width: 500, boxShadow: 10 }} >
                            <Paper variant='outlined' square sx={{ display: 'flex' }}>
                                <Box sx={{ display: 'flex', flex: 1, justifyContent: 'center', py: 1, color: '#0A0708' }}>
                                    SELECT DEPARTMENT NAME
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
                            <Box sx={{ mx: 1, pt: 0.1, flex: 1 }}>
                                <CssVarsProvider>
                                    <Button sx={{
                                        width: '100%',
                                        fontSize: 16, height: 46, cursor: 'pointer', color: 'white',
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