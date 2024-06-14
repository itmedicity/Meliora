import React, { memo, useCallback, useEffect, useState } from 'react'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useSelector } from 'react-redux';
import PatientsListTable from './PatientsListTable';
import ViewListIcon from '@mui/icons-material/ViewList';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { Box, CssVarsProvider, Input, Table, Tooltip, Typography } from '@mui/joy';
import ChangeCircleOutlinedIcon from '@mui/icons-material/ChangeCircleOutlined';
import { format } from 'date-fns';
import { ViewPatientsListAll } from './ViewPatientList';
import { AddorRemovePatients } from './AddorRemovePatients';
import ViewAllPatientsInOneTable from './ViewAllPatientsInOneTable';
import { RefreshPatientList } from './RefreshPatientList';
import { Paper } from '@mui/material';
import PersonSearchTwoToneIcon from '@mui/icons-material/PersonSearchTwoTone';
import { axioslogin } from 'src/views/Axios/Axios';

const PatientsListView = ({ setSearchFlag, dailyDate, count, setCount, qidept, depCode, depName, qitype }) => {
    const [patientlist, setpatientlist] = useState([])
    const [tableData, setTableData] = useState([])
    const [qiMarkedList, setqiMarkedList] = useState([])
    const [qiMarkFlag, setqiMarkFlag] = useState(0)
    const [tabFlag, setTabFlag] = useState(0)
    const [header, setHeader] = useState('')
    const [searchPat, setSearchPat] = useState('')
    const history = useHistory()
    const backtoHome = useCallback(() => {
        history.push('/Home/QIPatientMarking')
        setSearchFlag(0)
    }, [history, setSearchFlag])

    const id = useSelector((state) => {
        return state?.LoginUserData.empid
    })
    useEffect(() => {
        if (qitype !== 0) {
            const viewdata = {
                from: format(new Date(dailyDate), 'yyyy-MM-dd 00:00:00'),
                to: format(new Date(dailyDate), 'yyyy-MM-dd 23:59:59'),
            }
            const ViewPatients = async (setpatientlist) => {
                await ViewPatientsListAll(viewdata, qitype, setpatientlist)
            }
            ViewPatients(setpatientlist)
        }
    }, [dailyDate, count, qitype, setpatientlist])

    const UpdateDetails = useCallback((data) => {
        if (qitype !== 0) {
            const { qi_slno } = data
            const updateArray = {
                qi_status: 1,
                edit_user: id,
                qi_slno: qi_slno
            }
            const UpdatePatients = async (setCount) => {
                await AddorRemovePatients(updateArray, qitype, count, setCount)
            }
            UpdatePatients(setCount)
        }
    }, [count, id, setCount, qitype])

    useEffect(() => {
        if (patientlist.length !== 0) {
            const newdata = patientlist.filter((val) => val.qi_status === 0)
            if (newdata.length !== 0) {
                setTableData(newdata)
                setTabFlag(1)
            }
            else {
                setTabFlag(0)
            }
            const qidata = patientlist.filter((val) => val.qi_status === 1)
            if (qidata.length !== 0) {
                setqiMarkedList(qidata)
                setTabFlag(1)
                setqiMarkFlag(1)
            }
            else {
                setqiMarkFlag(0)
            }
        }
    }, [patientlist, count])
    const RefreshData = useCallback(() => {
        const RefreshPatients = async (setCount) => {
            await RefreshPatientList(qidept, count, setCount, qitype, depCode, id, dailyDate)
        }
        RefreshPatients(setCount)
        setSearchPat('')
    }, [qidept, depCode, count, id, setCount, qitype, dailyDate])
    useEffect(() => {
        if (qitype === 1) {
            setHeader('Endoscopy')
        }
        else if (qitype === 2) {
            setHeader('Emergency')
        }
        else if (qitype === 3) {
            setHeader('Dialysis')
        }
    }, [qitype])

    const ChangePatient = useCallback((e) => {
        setSearchPat(e.target.value)
    }, [])

    useEffect(() => {

        const searchData = {
            from: format(new Date(dailyDate), 'yyyy-MM-dd 00:00:00'),
            to: format(new Date(dailyDate), 'yyyy-MM-dd 23:59:59'),
            ptname: searchPat
        }
        const getSearchDetails = async (searchData) => {
            const result = await axioslogin.post('/qiendoscopy/searchbyPatient', searchData);
            return result.data
        }
        getSearchDetails(searchData).then((val) => {
            const { success, data } = val
            if (success === 1) {
                setTableData(data)
            }
        })
    }, [dailyDate, searchPat, count])

    return (
        <Box>
            <Paper variant='outlined' square >
                {qitype === 1 ?
                    <>
                        <Box sx={{ display: 'flex', flex: 1, height: 40 }}>
                            <Box sx={{ pl: 0.7, pt: 0.7 }} >
                                <ViewListIcon sx={{ color: '#37474f', height: 30, width: 30, opacity: 0.8 }} />
                            </Box>
                            <Box sx={{ flex: 1, pt: 1, pl: 1 }}>
                                <Typography sx={{ color: '#37474f', fontFamily: 'Arial', fontSize: 18 }}>
                                    Patient&apos;s List
                                </Typography>
                            </Box>
                            {tabFlag === 1 ?
                                <>
                                    <Box sx={{ pl: 0.5, pt: 0.2 }}>
                                        <CssVarsProvider>
                                            <Input
                                                startDecorator={<PersonSearchTwoToneIcon sx={{ height: 30, width: 30, color: '#0063C5' }} />}
                                                size="sm" placeholder="Search By Patient Name"
                                                name="searchPat"
                                                value={searchPat}
                                                onChange={ChangePatient}
                                                sx={{ width: 250, height: 35 }}
                                            // endDecorator={<Button>Message</Button>}
                                            />
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', fontSize: 20, pr: 0.3, pt: 0.4, pl: 0.5 }}>
                                        <CssVarsProvider>
                                            <Tooltip title="Refresh" placement="bottom" >
                                                <ChangeCircleOutlinedIcon sx={{ cursor: 'pointer', height: 35, width: 35, opacity: 0.7, color: 'darkgreen' }}
                                                    onClick={RefreshData} />
                                            </Tooltip>
                                        </CssVarsProvider>
                                    </Box>
                                </>
                                :
                                <Box></Box>}

                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', fontSize: 20, pr: 0.5, pt: 0.4, pl: 0.5 }}>
                                <CssVarsProvider>
                                    <Tooltip title="Close" placement="bottom" >
                                        <HighlightOffIcon sx={{ cursor: 'pointer', height: 35, width: 35, opacity: 0.7, color: 'darkred', }} onClick={backtoHome} />
                                    </Tooltip>
                                </CssVarsProvider>
                            </Box>
                        </Box>

                        {tabFlag === 1 ?
                            <Box>
                                <Box variant="outlined" sx={{ height: '38vh', overflow: 'auto', '&::-webkit-scrollbar': { height: 6 } }}>
                                    <CssVarsProvider>
                                        <Table aria-label="table with sticky header" borderAxis="both" padding={"none"} stickyHeader size='sm' stickyFooter hoverRow >
                                            <thead style={{ alignItems: 'center' }}>
                                                <tr style={{ height: 0.5 }}>
                                                    <th size='sm' style={{ width: 70, backgroundColor: '#78909c', color: 'white', fontSize: 14, textAlign: 'center' }}>&nbsp; Sl.No</th>
                                                    <th size='sm' style={{ width: 100, backgroundColor: '#78909c', color: 'white', fontSize: 14 }}>&nbsp;Patient ID</th>
                                                    <th size='sm' style={{ width: 170, backgroundColor: '#78909c', color: 'white', fontSize: 14 }}>&nbsp;Patient Name</th>
                                                    <th size='sm' style={{ width: 120, backgroundColor: '#78909c', color: 'white', fontSize: 14 }}>&nbsp;Age/Gender</th>
                                                    <th size='sm' style={{ width: 100, backgroundColor: '#78909c', color: 'white', fontSize: 14 }}>&nbsp;Contacts </th>
                                                    <th size='sm' style={{ width: 190, backgroundColor: '#78909c', color: 'white', fontSize: 14 }}>&nbsp;Doctor Name</th>
                                                    <th size='sm' style={{ width: 70, backgroundColor: '#78909c', color: 'white', fontSize: 14, textAlign: 'center' }}>&nbsp;Token </th>
                                                    <th size='sm' style={{ width: 150, backgroundColor: '#78909c', color: 'white', fontSize: 14 }}>&nbsp;Arrival Time </th>
                                                    <th size='sm' style={{ width: 170, backgroundColor: '#78909c', color: 'white', fontSize: 14, textAlign: 'center' }}>&nbsp;Add to Endoscopy List </th>
                                                </tr>
                                            </thead>
                                            <tbody size='small'>
                                                {tableData?.map((val, index) => {
                                                    return (< tr key={val.qi_slno} size='small'
                                                        style={{
                                                            maxHeight: 2, cursor: 'pointer'
                                                        }}  >
                                                        <td size='sm' style={{ fontSize: 12, height: 5, textAlign: 'center' }}>{index + 1}</td>
                                                        <td size='sm' style={{ fontSize: 12, height: 5 }}>&nbsp;{val.ptno}</td>
                                                        <td size='sm' style={{ fontSize: 12, height: 5 }}>&nbsp;{val.ptname}</td>
                                                        <td size='sm' style={{ fontSize: 12, height: 5 }}>&nbsp;{val.ptage + ' / ' + val.ptsex}</td>
                                                        <td size='sm' style={{ fontSize: 12, height: 5 }}>&nbsp;{val.ptmobile}</td>
                                                        <td size='sm' style={{ fontSize: 12, height: 5 }}>&nbsp;{"Dr. " + val.doctor_name}</td>
                                                        <td size='sm' style={{ fontSize: 12, height: 5, textAlign: 'center' }}>&nbsp;{val.visit_token}</td>
                                                        <td size='sm' style={{ fontSize: 12, height: 5 }}>&nbsp;{format(new Date(val.patient_arrived_date), 'dd-MM-yyyy hh:mm a')}</td>
                                                        <td size='sm' style={{ textAlign: 'center', height: 5 }}>
                                                            <CssVarsProvider>
                                                                <Tooltip title="Move to Endoscopy List" placement='left'>
                                                                    < ArrowCircleRightIcon sx={{
                                                                        padding: 'none',
                                                                        color: '#607d8b',
                                                                        ":hover": {
                                                                            color: '#37474f'
                                                                        }
                                                                    }}
                                                                        onClick={(e) => UpdateDetails(val)}
                                                                    />
                                                                </Tooltip>
                                                            </CssVarsProvider>
                                                        </td>
                                                    </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </Table>
                                    </CssVarsProvider>
                                </Box >
                                <Paper variant='outlined' square sx={{ height: 30, borderTop: 'none', bgcolor: '#C6D3D8' }}>
                                </Paper>
                            </Box >
                            :
                            <Box sx={{ height: '39vh', display: 'flex', justifyContent: 'center', fontSize: 20, opacity: 0.8 }}>No Patients</Box>
                        }
                    </> : null}
                <Box>
                    {qiMarkFlag === 1 ?
                        <>
                            {qitype === 1 ?
                                <PatientsListTable qiMarkedList={qiMarkedList} setqiMarkFlag={setqiMarkFlag} count={count}
                                    setCount={setCount} dailyDate={dailyDate} depName={depName} qidept={qidept} qitype={qitype}
                                    header={header} RefreshData={RefreshData}
                                />
                                : qitype === 2 || qitype === 3 ? <ViewAllPatientsInOneTable qiMarkedList={qiMarkedList}
                                    setqiMarkFlag={setqiMarkFlag} count={count} setCount={setCount} dailyDate={dailyDate}
                                    depName={depName} qidept={qidept} qitype={qitype} setSearchFlag={setSearchFlag}
                                    depCode={depCode} tabFlag={tabFlag} header={header} setqiMarkedList={setqiMarkedList}
                                />
                                    : null
                            }
                        </>
                        :
                        <>
                            {qitype !== 1 ?
                                <Box>
                                    <Box sx={{ display: 'flex', flex: 1, height: 35 }}>
                                        <Box sx={{ pl: 0.7, pt: 0.4 }} >
                                            <ViewListIcon sx={{ color: '#37474f', height: 30, width: 30, opacity: 0.8 }} />
                                        </Box>
                                        <Box sx={{ flex: 1, pt: 0.8, pl: 1 }}>
                                            <Typography sx={{ color: '#37474f', fontFamily: 'Arial', fontSize: 17 }}>
                                                Patient&apos;s List
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', fontSize: 20, pr: 0.5 }}>
                                            <CssVarsProvider>
                                                <Tooltip title="Close" placement="bottom" >
                                                    <HighlightOffIcon sx={{ cursor: 'pointer', height: 35, width: 35, opacity: 0.7, color: 'darkred', }} onClick={backtoHome} />
                                                </Tooltip>
                                            </CssVarsProvider>
                                        </Box>
                                    </Box>
                                    <Box sx={{ height: '39vh', display: 'flex', justifyContent: 'center', fontSize: 20, opacity: 0.8 }}>No Patients</Box>
                                </Box>
                                : null}
                        </>
                    }
                </Box>
            </Paper >
        </Box >
    )
}
export default memo(PatientsListView)