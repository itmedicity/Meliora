
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { axiosellider, axioslogin } from 'src/views/Axios/Axios';
import moment from 'moment';
import { succesNotify } from 'src/views/Common/CommonCode';
import { useSelector } from 'react-redux';
import PatientsListTable from './PatientsListTable';
import ViewListIcon from '@mui/icons-material/ViewList';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { CssVarsProvider, Tooltip } from '@mui/joy';
import ChangeCircleOutlinedIcon from '@mui/icons-material/ChangeCircleOutlined';
const PatientsListView = ({ setSearchFlag, dailyDate, count, setCount, qidept, depCode, depName }) => {

    const [tableData, setTableData] = useState([])
    const [endoList, setEndoList] = useState([])
    const [endoFlag, setEndoFlag] = useState(0)
    // const [lastdate, setLastdate] = useState(new Date())
    const [tabFlag, setTabFlag] = useState(0)
    const history = useHistory()
    const backtoHome = useCallback(() => {
        history.push('/Home/QIPatientMarking')
        setSearchFlag(0)
    }, [history, setSearchFlag])

    const id = useSelector((state) => {
        return state?.LoginUserData.empid
    })

    useEffect(() => {
        const viewdata = {
            from: moment(dailyDate).format('YYYY-MM-DD 00:00:00'),
            to: moment(dailyDate).format('YYYY-MM-DD 23:59:59'),
        }
        const getPatientList = async (viewdata) => {
            const result = await axioslogin.post('/qiendoscopy/viewList', viewdata)
            return result.data
        }
        getPatientList(viewdata).then((value) => {
            const { success, data } = value
            if (success === 1) {
                setTableData(data)
                setTabFlag(1)
            }
            else {
                setTabFlag(0)
            }
        })
    }, [dailyDate, count])

    const UpdateDetails = useCallback((data) => {
        const { qi_endo_slno } = data
        const updateArray = {
            endo_status: 1,
            edit_user: id,
            qi_endo_slno: qi_endo_slno,

        }
        const UpadatetData = async (updateArray) => {
            const result = await axioslogin.patch('/qiendoscopy/update', updateArray);
            return result.data
        }
        UpadatetData(updateArray).then((val) => {
            const { success, message } = val
            if (success === 1) {
                succesNotify(message)
                setCount(count + 1)
            }
            else {
            }
        })
    }, [count, id, setCount])

    useEffect(() => {
        const viewdata = {
            from: moment(dailyDate).format('YYYY-MM-DD 00:00:00'),
            to: moment(dailyDate).format('YYYY-MM-DD 23:59:59'),
        }
        const getEndoscopyPatients = async (viewdata) => {
            const result = await axioslogin.post('/qiendoscopy/view', viewdata)
            return result.data
        }
        getEndoscopyPatients(viewdata).then((value) => {
            const { success, data } = value
            if (success === 1) {
                setEndoList(data)
                setEndoFlag(1)
            }
            else {
                setEndoList([])
                setEndoFlag(0)
            }
        })
    }, [dailyDate, count])

    // const postdata = useMemo(() => {
    //     return {
    //         date0: moment(lastdate).format('DD/MM/yyyy 00:00:00'),
    //         date1: moment(currentdate).format('DD/MM/yyyy 23:59:59')
    //     }

    // }, [lastdate, currentdate])

    // const patchdata = useMemo(() => {
    //     return {
    //         lastupdate: moment(new Date(currentdate)).format('YYYY-MM-DD HH:mm:ss')
    //     }
    // }, [currentdate])

    const patchdata = useMemo(() => {
        return {
            last_updatedate: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
            qi_dept_no: qidept,
        }
    }, [qidept])
    const RefreshData = useCallback(() => {
        const getLastDate = async (qidept) => {
            const result = await axioslogin.get(`/qiendoscopy/getlast/${qidept}`)
            return result.data
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
        getLastDate(qidept).then((val) => {
            const { success, data } = val
            if (success === 1) {
                const { last_updatedate } = data[0]

                const elliderSearch = {
                    from: moment(last_updatedate).format('DD/MM/yyyy HH:mm:ss'),
                    to: moment(new Date()).format('DD/MM/yyyy 23:59:59'),
                    depCode: depCode
                }
                const existSearch = {
                    from: moment(last_updatedate).format('YYYY-MM-DD HH:mm:ss'),
                    to: moment(new Date()).format('YYYY-MM-DD 23:59:59'),
                }
                GetExistData(existSearch).then((val) => {
                    const { success } = val
                    // no data
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
                                        endo_ptmobile: val.PTC_MOBILE,
                                        visit_token: val.VSN_TOKEN
                                    }
                                })
                                InsertData(insertArray).then((val) => {
                                    const { success } = val
                                    if (success === 1) {
                                        setCount(count + 1)

                                        UpdateImportedDate(patchdata).then((value) => {
                                            const { success } = value
                                            if (success === 1) {

                                            }
                                        })
                                    }
                                    else {
                                    }
                                })
                                succesNotify('Data Updated')
                            }
                            else if (success === 2) {
                                succesNotify('Data Updated')
                            }
                        })
                    }
                    else if (success === 2) {
                        succesNotify('Data Updated')
                    }
                })
            }
            else {
            }
        })
    }, [qidept, depCode, patchdata, count])



    return (
        <Box>
            <Paper variant='outlined' square >
                <Box sx={{ display: 'flex', flex: 1, height: 35 }}>
                    <Box sx={{ pl: 0.7, pt: 0.2 }} >
                        <ViewListIcon sx={{ color: '#37474f', height: 30, width: 30, opacity: 0.8 }} />
                    </Box>
                    <Box sx={{ flex: 1, fontSize: 20, pt: 0.8, pl: 1 }}>
                        <Typography sx={{ color: '#37474f', fontFamily: 'Arial' }}>
                            Patient&apos;s List
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', fontSize: 20, pr: 0.3 }}>
                        <CssVarsProvider>
                            <Tooltip title="Refresh" placement="left" >
                                <ChangeCircleOutlinedIcon sx={{ cursor: 'pointer', height: 35, width: 35, opacity: 0.8, color: '#37474f' }}
                                    onClick={RefreshData} />
                            </Tooltip>
                        </CssVarsProvider>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', fontSize: 20, pr: 0.5 }}>
                        <HighlightOffIcon sx={{ cursor: 'pointer', height: 35, width: 35, opacity: 0.8, color: '#37474f' }} onClick={backtoHome} />
                    </Box>

                </Box>
                {tabFlag === 1 ?
                    <Box>
                        <Box sx={{ height: '38vh' }}>
                            <Box variant="outlined" sx={{ overflow: 'auto' }}>
                                <TableContainer sx={{}}>
                                    <Table size='md' stickyHeader padding={"none"}  >
                                        <TableHead  >
                                            <TableRow sx={{ height: 40 }} >
                                                <TableCell sx={{ width: 50, pl: 2, borderTop: '1px solid lightgrey', bgcolor: '#78909c', color: 'white' }}> Sl.No</TableCell>
                                                <TableCell sx={{ width: 80, pl: 2, borderTop: '1px solid lightgrey', bgcolor: '#78909c', color: 'white' }}>Patient ID</TableCell>
                                                <TableCell sx={{ width: 150, pl: 2, borderTop: '1px solid lightgrey', bgcolor: '#78909c', color: 'white' }}>Patient Name</TableCell>
                                                <TableCell sx={{ width: 100, pl: 2, borderTop: '1px solid lightgrey', bgcolor: '#78909c', color: 'white' }}>Age/Gender</TableCell>
                                                <TableCell sx={{ width: 100, pl: 2, borderTop: '1px solid lightgrey', bgcolor: '#78909c', color: 'white' }}>Contacts</TableCell>
                                                <TableCell sx={{ width: 130, pl: 2, borderTop: '1px solid lightgrey', bgcolor: '#78909c', color: 'white' }}>Doctor Name</TableCell>
                                                <TableCell sx={{ width: 50, pl: 2, borderTop: '1px solid lightgrey', bgcolor: '#78909c', color: 'white' }}>Token</TableCell>
                                                <TableCell sx={{ width: 100, pl: 2, borderTop: '1px solid lightgrey', bgcolor: '#78909c', color: 'white' }}>Arrival Time</TableCell>
                                                <TableCell sx={{ width: 100, pl: 2, borderTop: '1px solid lightgrey', bgcolor: '#78909c', color: 'white' }}>Add to Endoscopy List</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody >
                                            {tableData?.map((val, index) => {
                                                return <TableRow hover sx={{ cursor: 'pointer' }} key={val.qi_endo_slno}>
                                                    <TableCell sx={{ fontSize: 12, pl: 2 }}>{index + 1}</TableCell>
                                                    <TableCell sx={{ fontSize: 12, pl: 2, }}>{val.endo_ptno}</TableCell>
                                                    <TableCell sx={{ fontSize: 12, pl: 2, }}>{val.endo_ptname}</TableCell>
                                                    <TableCell sx={{ fontSize: 12, pl: 2, }}>{val.endo_ptage + ' / ' + val.endo_ptsex}</TableCell>
                                                    <TableCell sx={{ fontSize: 12, pl: 2, }}>{val.endo_ptmobile}</TableCell>
                                                    <TableCell sx={{ fontSize: 12, pl: 2, }}>{"Dr. " + val.doctor_name}</TableCell>
                                                    <TableCell sx={{ fontSize: 12, pl: 2, }}>{val.visit_token}</TableCell>
                                                    <TableCell sx={{ fontSize: 12, pl: 2, }}>{moment(new Date(val.qi_endo_date)).format('DD-MM-YYYY hh:mm:ss A')}</TableCell>
                                                    <TableCell sx={{ textAlign: 'center' }}>
                                                        <CssVarsProvider>
                                                            <Tooltip title="Move to Endoscopy List" placement='left'>
                                                                < ArrowCircleRightIcon sx={{
                                                                    color: '#607d8b',
                                                                    ":hover": {
                                                                        color: '#37474f'
                                                                    }
                                                                }}
                                                                    onClick={(e) => UpdateDetails(val)}
                                                                />
                                                            </Tooltip>
                                                        </CssVarsProvider>


                                                    </TableCell>
                                                </TableRow>
                                            })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                        </Box>
                        <Paper variant='outlined' square sx={{ height: 30, borderTop: 'none', bgcolor: '#cfd8dc' }}>
                        </Paper>
                    </Box>
                    : <Box sx={{ height: '39vh', display: 'flex', justifyContent: 'center', fontSize: 20, opacity: 0.8 }}>No Patients</Box>}
                <Box>{
                    endoFlag === 1 ? <PatientsListTable endoList={endoList} setEndoFlag={setEndoFlag} count={count} setCount={setCount}
                        dailyDate={dailyDate} depName={depName}
                    />
                        :
                        <Box></Box>
                }
                </Box>
            </Paper>
        </Box >
    )
}

export default memo(PatientsListView)