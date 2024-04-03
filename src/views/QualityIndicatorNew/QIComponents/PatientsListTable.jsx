
import React, { Fragment, memo, useCallback, useState } from 'react'
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from '@mui/material'
import moment from 'moment';
import ListIcon from '@mui/icons-material/List';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
// import ModalQiEndoscopy from './ModalQiEndoscopy';
import { useSelector } from 'react-redux';
import { axioslogin } from 'src/views/Axios/Axios';
import { succesNotify } from 'src/views/Common/CommonCode';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import EndoscopyModalForQI from './EndoscopyModalForQI';
const PatientsListTable = ({ endoList, count, setCount, dailyDate, depName }) => {

    const [qiflag, setQiflag] = useState(0)
    const [modalopen, setModalOpen] = useState(false)
    const [rowSelect, setrowSelect] = useState([])

    const id = useSelector((state) => {
        return state?.LoginUserData.empid
    })

    // const backtoHome = useCallback(() => {
    //     setEndoFlag(0)
    // }, [setEndoFlag])
    // const IndicatorsView = useCallback((qi_endo_slno, endo_ptno, endo_ptname, doctor_name) => {
    const IndicatorsView = useCallback((val) => {
        setQiflag(1)
        setModalOpen(true)
        // setEndoslno(qi_endo_slno)
        // setPtno(endo_ptno)
        // setPtname(endo_ptname)
        // setDrname(doctor_name)
        setrowSelect(val)

    }, [])
    const handleClose = useCallback(() => {
        setModalOpen(false)
        setQiflag(0)
    }, [setModalOpen])

    const UpdateDetails = useCallback((data) => {
        const { qi_endo_slno } = data
        const updateArray = {
            endo_status: 0,
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

    return (
        <Fragment>

            {qiflag === 1 ? <EndoscopyModalForQI open={modalopen} setQiflag={setQiflag} handleClose={handleClose} rowSelect={rowSelect}
                count={count} setCount={setCount} dailyDate={dailyDate} depName={depName} /> : null}

            < Paper variant='outlined' square >
                <Box sx={{ display: 'flex', flex: 1, height: 35 }}>
                    <Box sx={{ pl: 0.7, pt: 0.2 }} >
                        <ListIcon sx={{ color: '#37474f', height: 30, width: 30 }} />
                    </Box>
                    <Box sx={{ flex: 1, fontSize: 20, pt: 1, pl: 1, }}>
                        <Typography sx={{ color: '#37474f', fontFamily: 'Arial' }}>
                            Endoscopy Patient&apos;s List
                        </Typography>
                    </Box>
                    {/* <Box sx={{ flex: 1, }}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', fontSize: 20, pt: 0.3, pr: 0.2 }}>
                                <HighlightOffIcon sx={{ cursor: 'pointer', height: 35, width: 35, opacity: 0.8, color: '#37474f' }} onClick={backtoHome} />
                            </Box>
                        </Box> */}
                </Box>
                <Box variant="outlined" sx={{ overflow: 'auto', height: '39vh' }}>
                    <TableContainer sx={{}}>
                        <Table size='md' stickyHeader padding={"none"}  >
                            <TableHead  >
                                <TableRow sx={{ height: 40 }} >
                                    <TableCell sx={{ width: 50, pl: 2, borderTop: '1px solid lightgrey', bgcolor: '#78909c', color: 'white' }}> Sl.No</TableCell>
                                    <TableCell sx={{ width: 70, pl: 2, borderTop: '1px solid lightgrey', bgcolor: '#78909c', color: 'white' }}>Patient ID</TableCell>
                                    <TableCell sx={{ width: 150, pl: 2, borderTop: '1px solid lightgrey', bgcolor: '#78909c', color: 'white' }}>Patient Name</TableCell>
                                    <TableCell sx={{ width: 100, pl: 2, borderTop: '1px solid lightgrey', bgcolor: '#78909c', color: 'white' }}>Age/Gender</TableCell>
                                    <TableCell sx={{ width: 100, pl: 2, borderTop: '1px solid lightgrey', bgcolor: '#78909c', color: 'white' }}>Contacts</TableCell>
                                    <TableCell sx={{ width: 130, pl: 2, borderTop: '1px solid lightgrey', bgcolor: '#78909c', color: 'white' }}>Doctor Name</TableCell>
                                    <TableCell sx={{ width: 50, pl: 2, borderTop: '1px solid lightgrey', bgcolor: '#78909c', color: 'white' }}>Token</TableCell>
                                    <TableCell sx={{ width: 100, pl: 2, borderTop: '1px solid lightgrey', bgcolor: '#78909c', color: 'white' }}>Arrival Time</TableCell>
                                    <TableCell sx={{ width: 70, pl: 2, borderTop: '1px solid lightgrey', bgcolor: '#78909c', color: 'white' }}>Back to List</TableCell>
                                    <TableCell sx={{ width: 70, textAlign: 'center', borderTop: '1px solid lightgrey', bgcolor: '#78909c', color: 'white' }}>QI Marking</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody >
                                {endoList?.map((val, index) => {
                                    return <TableRow hover key={val.qi_endo_slno} sx={{ cursor: 'pointer', background: (val.qi_status === 1) ? '#cfd8dc' : 'transparent' }}>
                                        <TableCell sx={{ fontSize: 12, pl: 2 }}>{index + 1}</TableCell>
                                        <TableCell sx={{ fontSize: 12, pl: 2, }}>{val.endo_ptno}</TableCell>
                                        <TableCell sx={{ fontSize: 12, pl: 2, }}>{val.endo_ptname}</TableCell>
                                        <TableCell sx={{ fontSize: 12, pl: 2, }}>{val.endo_ptage + ' / ' + val.endo_ptsex}</TableCell>
                                        <TableCell sx={{ fontSize: 12, pl: 2, }}>{val.endo_ptmobile}</TableCell>
                                        <TableCell sx={{ fontSize: 12, pl: 2, }}>{"Dr. " + val.doctor_name}</TableCell>
                                        <TableCell sx={{ fontSize: 12, pl: 2, }}>{val.visit_token}</TableCell>
                                        <TableCell sx={{ fontSize: 12, pl: 2, }}>{moment(new Date(val.qi_endo_date)).format('DD-MM-YYYY hh:mm:ss A')}</TableCell>
                                        <TableCell sx={{ textAlign: 'center' }}>
                                            {val.qi_status === 1 ?
                                                <Tooltip title="QI Marked" placement='left'>
                                                    < ArrowCircleLeftIcon
                                                        disabled
                                                        sx={{
                                                            color: '#607d8b',
                                                            // ":hover": {
                                                            //     color: '#37474f',
                                                            // }
                                                        }}
                                                    />
                                                </Tooltip>
                                                :
                                                <Tooltip title="Back to List" placement='left'>
                                                    < ArrowCircleLeftIcon sx={{
                                                        color: '#607d8b',
                                                        ":hover": {
                                                            color: '#37474f',
                                                        }
                                                    }}
                                                        onClick={(e) => UpdateDetails(val)}
                                                    />
                                                </Tooltip>
                                            }
                                        </TableCell>

                                        <TableCell sx={{ textAlign: 'center' }}>
                                            <Tooltip title="QI Marking" placement='left'>
                                                <CheckCircleOutlineIcon
                                                    sx={{
                                                        color: '#546e7a',
                                                        ":hover": {
                                                            color: '#263238',
                                                        }
                                                    }}
                                                    onClick={(e) => IndicatorsView(val)}
                                                />
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Paper>
        </Fragment >
    )
}

export default memo(PatientsListTable)