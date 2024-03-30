
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from '@mui/material'
import React, { memo, useCallback, useEffect, useState } from 'react'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { axioslogin } from 'src/views/Axios/Axios';
import moment from 'moment';
import { succesNotify } from 'src/views/Common/CommonCode';
import { useSelector } from 'react-redux';
import PatientsListTable from './PatientsListTable';
import ViewListIcon from '@mui/icons-material/ViewList';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
const PatientsListView = ({ setSearchFlag, dailyDate, count, setCount }) => {

    const [tableData, setTableData] = useState([])
    const [endoList, setEndoList] = useState([])
    const [endoFlag, setEndoFlag] = useState(0)
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
            }
            else {
            }
        })
    }, [dailyDate, count])



    // const ChangeStatus = async (e, val) => {
    //     if (e === true) {
    //         let viewselect = tableData.map((value) => {
    //             return value.qi_endo_slno === val.qi_endo_slno ? { ...value, endo_status: 1, } : value
    //         })
    //         setTableData(viewselect)
    //     }
    //     else {
    //         let viewselect = tableData.map((value) => {
    //             return value.qi_endo_slno === val.qi_endo_slno ? { ...value, endo_status: 0, } : value
    //         })
    //         setTableData(viewselect)

    //     }
    // }
    // const UpdateDetails = useCallback((val) => {
    //     const NewArray = tableData.filter((val) => {
    //         return val.endo_status === 1
    //     })

    //     const updateArray = NewArray?.map((val) => {
    //         return {
    //             endo_status: val.endo_status,
    //             edit_user: id,
    //             qi_endo_slno: val.qi_endo_slno,
    //         }

    //     })
    //     const UpadatetData = async (updateArray) => {
    //         const result = await axioslogin.patch('/qiendoscopy/update', updateArray);
    //         return result.data
    //     }
    //     UpadatetData(updateArray).then((val) => {
    //         const { success, message } = val
    //         if (success === 1) {
    //             succesNotify(message)
    //             setCount(count + 1)
    //         }
    //         else {
    //         }
    //     })
    // }, [count, tableData, id, setCount])

    // const ViewEndoQiDetails = useCallback(() => {
    //     const viewdata = {
    //         from: moment(dailyDate).format('YYYY-MM-DD 00:00:00'),
    //         to: moment(dailyDate).format('YYYY-MM-DD 23:59:59'),
    //     }

    //     const getEndoscopyPatients = async (viewdata) => {
    //         const result = await axioslogin.post('/qiendoscopy/view', viewdata)
    //         return result.data
    //     }

    //     getEndoscopyPatients(viewdata).then((value) => {
    //         const { success, data } = value
    //         if (success === 1) {
    //             setEndoList(data)
    //             setEndoFlag(1)
    //         }
    //         else {
    //             setEndoList([])
    //             setEndoFlag(0)
    //         }
    //     })
    // }, [dailyDate])


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
                    <Box sx={{ flex: 1, }}>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', fontSize: 20, pr: 0.2 }}>
                            <HighlightOffIcon sx={{ cursor: 'pointer', height: 35, width: 35, opacity: 0.8, color: '#37474f' }} onClick={backtoHome} />
                        </Box>
                    </Box>
                </Box>
                <Box>
                    <Box variant="outlined" sx={{ overflow: 'auto', }}>
                        <TableContainer sx={{ maxHeight: '38vh' }}>
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

                                                {/* <input type="checkbox"
                                                    border='0.5px solid  #C4C4C4'
                                                    style={{
                                                        width: 16,
                                                        height: 16,
                                                    }}
                                                    checked={val.endo_status === 1 ? true : false}
                                                    onChange={(e) => {
                                                        ChangeStatus(e.target.checked, val)
                                                    }}
                                                >
                                                </input> */}

                                            </TableCell>
                                        </TableRow>
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                    <Paper variant='outlined' square sx={{ height: 30, borderTop: 'none', bgcolor: '#cfd8dc' }}>

                    </Paper>
                </Box>
                <Box>{
                    endoFlag === 1 ? <PatientsListTable endoList={endoList} setEndoFlag={setEndoFlag} count={count} setCount={setCount}
                        dailyDate={dailyDate}
                    />
                        :
                        <Box></Box>
                }
                </Box>
            </Paper>












            {/* {
                endoFlag === 1 ? <PatientsListTable endoList={endoList} setEndoFlag={setEndoFlag} count={count} setCount={setCount} /> :
                    <Paper variant='outlined' square >
                        <Box sx={{ display: 'flex', flex: 1, height: 42 }}>
                            <Box sx={{ pl: 0.7, pt: 0.2 }} >
                                <ViewListIcon sx={{ color: '#37474f', height: 35, width: 35, opacity: 0.8 }} />
                            </Box>
                            <Box sx={{ flex: 1, fontSize: 20, pt: 0.8, pl: 1 }}>
                                <Typography sx={{ color: '#37474f', fontFamily: 'Arial' }}>
                                    Patient&apos;s List
                                </Typography>
                            </Box>
                            <Box sx={{ flex: 1, }}>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', fontSize: 20, pt: 0.3, pr: 0.2 }}>
                                    <HighlightOffIcon sx={{ cursor: 'pointer', height: 35, width: 35, opacity: 0.8, color: '#37474f' }} onClick={backtoHome} />
                                </Box>
                            </Box>
                        </Box>
                        <Box>
                            <Box variant="outlined" sx={{ overflow: 'auto', }}>
                                <TableContainer sx={{ maxHeight: window.innerHeight - 210 }}>
                                    <Table size='md' stickyHeader padding={"none"}  >
                                        <TableHead  >
                                            <TableRow sx={{ height: 40 }} >
                                                <TableCell sx={{ width: 50, pl: 2, borderTop: '1px solid lightgrey', bgcolor: '#78909c', color: 'white' }}> Sl.No</TableCell>
                                                <TableCell sx={{ width: 100, pl: 2, borderTop: '1px solid lightgrey', bgcolor: '#78909c', color: 'white' }}>Patient ID</TableCell>
                                                <TableCell sx={{ width: 150, pl: 2, borderTop: '1px solid lightgrey', bgcolor: '#78909c', color: 'white' }}>Patient Name</TableCell>
                                                <TableCell sx={{ width: 100, pl: 2, borderTop: '1px solid lightgrey', bgcolor: '#78909c', color: 'white' }}>Age/Gender</TableCell>
                                                <TableCell sx={{ width: 130, pl: 2, borderTop: '1px solid lightgrey', bgcolor: '#78909c', color: 'white' }}>Doctor Name</TableCell>
                                                <TableCell sx={{ width: 100, pl: 2, borderTop: '1px solid lightgrey', bgcolor: '#78909c', color: 'white' }}>Arrival Time</TableCell>
                                                <TableCell sx={{ width: 50, pl: 2, borderTop: '1px solid lightgrey', bgcolor: '#78909c', color: 'white' }}>Endoscopy Status</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody >
                                            {tableData?.map((val, index) => {
                                                return <TableRow key={val.qi_endo_slno}>
                                                    <TableCell sx={{ fontSize: 12, pl: 2 }}>{index + 1}</TableCell>
                                                    <TableCell sx={{ fontSize: 12, pl: 2, }}>{val.endo_ptno}</TableCell>
                                                    <TableCell sx={{ fontSize: 12, pl: 2, }}>{val.endo_ptname}</TableCell>
                                                    <TableCell sx={{ fontSize: 12, pl: 2, }}>{val.endo_ptage + ' / ' + val.endo_ptsex}</TableCell>
                                                    <TableCell sx={{ fontSize: 12, pl: 2, }}>{"Dr. " + val.doctor_name}</TableCell>
                                                    <TableCell sx={{ fontSize: 12, pl: 2, }}>{moment(new Date(val.qi_endo_date)).format('DD-MM-YYYY hh:mm:ss A')}</TableCell>
                                                    <TableCell sx={{ pt: 0.5, textAlign: 'center' }}>
                                                        <input type="checkbox"
                                                            border='0.5px solid  #C4C4C4'
                                                            style={{
                                                                width: 16,
                                                                height: 16,
                                                            }}
                                                            checked={val.endo_status === 1 ? true : false}
                                                            onChange={(e) => {
                                                                ChangeStatus(e.target.checked, val)
                                                            }}
                                                        >
                                                        </input>

                                                    </TableCell>
                                                </TableRow>
                                            })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>

                        </Box>
                        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', pt: 0.5, bgcolor: 'white', color: 'white', height: 50 }}>
                            <Box sx={{ pt: 0.5, pr: 0.5 }}>
                                <Button sx={{
                                    fontSize: 15, cursor: 'pointer', color: 'white', height: 33, width: 350, bgcolor: '#78909c',
                                    borderRadius: 0,
                                    ":hover": {
                                        bgcolor: '#546e7a',
                                        boxShadow: 2,
                                        color: 'white',
                                    }
                                }}
                                    onClick={ViewEndoQiDetails}
                                >
                                    View Endoscopy Patient List
                                </Button>
                            </Box>
                            <Box sx={{ pt: 0.5, pr: 5 }}>
                                <Button sx={{
                                    fontSize: 15, cursor: 'pointer', color: 'white', height: 33, width: 100, bgcolor: '#78909c',
                                    borderRadius: 0,
                                    ":hover": {
                                        bgcolor: '#546e7a',
                                        boxShadow: 2,
                                        color: 'white',
                                    }
                                }}
                                    onClick={UpdateDetails}
                                >
                                    UPDATE
                                </Button>
                            </Box>
                        </Box>
                    </Paper >
            } */}

        </Box >
    )
}

export default memo(PatientsListView)