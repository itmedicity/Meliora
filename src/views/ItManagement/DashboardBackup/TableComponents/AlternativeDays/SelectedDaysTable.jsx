import { CssVarsProvider, Table } from '@mui/joy'
import { Box, Paper, Typography } from '@mui/material'
import React, { useCallback } from 'react'
import { memo } from 'react'
import { Fragment } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import CardMasterClose from 'src/views/Components/CardMasterClose'
import VerifiedIcon from '@mui/icons-material/Verified';
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getEmployeeBackup } from 'src/redux/actions/BackupDetails.action'
import { useEffect } from 'react'
import DaysVerificationModal from '../../ModalForVerification/ModalSelectedDays/DaysVerificationModal'
import ModalVerifiedDetails from '../../ModalForVerification/ModalDay/ModalVerifiedDetails'
import moment from 'moment'
const SelectedDaysTable = ({ alternativedata, daysflag, setAltflag, count, setCount }) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [flag, setflag] = useState(0)
    const [modalopen, setModalOpen] = useState(false)
    const [view, setView] = useState([])
    const [verifyflag, setVerifyflag] = useState(0)
    const backtoHome = useCallback(() => {
        history.push('/Home/DashboardBackup')
        setAltflag(0)
    }, [history, setAltflag])
    useEffect(() => {
        dispatch(getEmployeeBackup())
    }, [dispatch])
    const handleClose = useCallback(() => {
        setModalOpen(false)
        setflag(0)
    }, [setModalOpen])
    const VerificationClick = useCallback((val) => {
        if (val.verify_status === 1) {
            setView(val)
            setModalOpen(true)
            setVerifyflag(1)
        }
        else {
            setView(val)
            setModalOpen(true)
            setflag(1)
        }
    }, [setflag])
    return (
        <Fragment>
            <Paper>
                {flag === 1 ? <DaysVerificationModal open={modalopen} handleClose={handleClose} rowSelect={view} count={count} setCount={setCount} />
                    : verifyflag === 1 ? <ModalVerifiedDetails open={modalopen} handleClose={handleClose} rowSelect={view} />
                        : null}
                <Box>
                    <CardMasterClose
                        close={backtoHome}
                    >
                        {daysflag === 1 ?
                            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                <Box sx={{ flex: 1 }}>
                                    <Typography sx={{ fontWeight: 10, fontSize: 18 }}>Today&apos;s Backup Details</Typography>
                                </Box>
                                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', pr: 2 }}>
                                    <Box sx={{ height: 20, width: 30, bgcolor: 'lightgrey', border: '0.1px solid lightgrey' }}> </Box><Typography>&nbsp; Successfull &nbsp;</Typography>
                                </Box>
                            </Box>
                            : daysflag === 2 ?
                                <Paper>
                                    <Typography sx={{ fontWeight: 10, fontSize: 18 }}>Backup Dues</Typography>
                                </Paper>
                                : daysflag === 3 ?
                                    <Paper>
                                        <Typography sx={{ fontWeight: 10, fontSize: 18 }}>Backup Errors</Typography>
                                    </Paper>
                                    : daysflag === 4 ?
                                        <Paper>
                                            <Typography sx={{ fontWeight: 10, fontSize: 18 }}>Upcoming Backup</Typography>
                                        </Paper>
                                        : null
                        }
                        <Paper variant="outlined" sx={{ overflow: 'auto' }}>
                            <CssVarsProvider>
                                <Table borderAxis="both" padding={"none"} stickyHeader >
                                    <thead style={{ alignItems: 'center' }}>
                                        <tr>
                                            {daysflag === 1 || daysflag === 2 || daysflag === 3 ?
                                                <th rowSpan={2} style={{ width: 80, textAlign: 'center' }}>For Verify</th>
                                                : null}
                                            <th rowSpan={2} style={{ width: 60, textAlign: 'center' }}>Sl.No</th>
                                            {daysflag === 1 ? <th rowSpan={2} style={{ width: 120, textAlign: 'center' }}>Backup Date</th> : null}
                                            {daysflag === 2 || daysflag === 3 || daysflag === 4 ?
                                                <th rowSpan={2} style={{ width: 130, textAlign: 'center' }}>Backup DueDate</th> : null}
                                            <th rowSpan={2} style={{ width: 150, textAlign: 'center' }}>Backup Type</th>
                                            <th rowSpan={2} style={{ width: 110, textAlign: 'center' }}>Backup Name</th>
                                            <th rowSpan={2} style={{ width: 125, textAlign: 'center' }}>Backup Location</th>
                                            <th colSpan={3} style={{ width: 390, textAlign: 'center' }}>Backup Device Details</th>
                                            <th colSpan={3} style={{ width: 390, textAlign: 'center' }}>Backup Transferred Device Details</th>
                                            <th colSpan={2} style={{ width: 300, textAlign: 'center' }}>Backup Schedule </th>
                                            {daysflag === 3 ? <th rowSpan={2} style={{ width: 160, textAlign: 'center' }}>Date </th> : null}
                                            {daysflag === 3 ? <th rowSpan={2} style={{ width: 100, textAlign: 'center' }}>Employee </th> : null}
                                            {daysflag === 3 ? <th rowSpan={2} style={{ width: 100, textAlign: 'center' }}>Status</th> : null}
                                            {daysflag === 3 ? <th rowSpan={2} style={{ width: 150, textAlign: 'center' }}>Remarks</th> : null}
                                        </tr>
                                        <tr sx={{ height: 8 }} size='small'>
                                            <th style={{ textAlign: 'center' }}>IP Address </th>
                                            <th style={{ textAlign: 'center' }}>Computer Name</th>
                                            <th style={{ textAlign: 'center' }}>Physical Location</th>
                                            <th style={{ textAlign: 'center' }}>IP Address</th>
                                            <th style={{ textAlign: 'center' }}>Computer Name</th>
                                            <th style={{ textAlign: 'center' }} >Physical Location</th>
                                            <th style={{ textAlign: 'center' }}>Schedule Type</th>
                                            <th style={{ textAlign: 'center' }} >Schedule Time</th>
                                        </tr>
                                    </thead>
                                    <tbody size='small' style={{ height: 8 }}>
                                        {alternativedata?.map((val, index) => (
                                            <tr key={val.days_slno} size='small'
                                                style={{ height: 8, background: (val.verify_status === 1) ? 'lightgrey' : 'transparent' }}
                                            >
                                                {daysflag === 1 || daysflag === 2 || daysflag === 3 ?
                                                    <td style={{ textAlign: 'center' }}>
                                                        <Box>
                                                            {val.verify_status === 1 ?
                                                                <VerifiedIcon
                                                                    size='small'
                                                                    sx={{
                                                                        color: 'grey',
                                                                        cursor: 'pointer',
                                                                        ":hover": {
                                                                            color: '#43a047',
                                                                            boxShadow: 10,
                                                                        }
                                                                    }}
                                                                    onClick={(e) => VerificationClick(val)}
                                                                /> :
                                                                <VerifiedIcon
                                                                    size='small'
                                                                    sx={{
                                                                        color: 'grey',
                                                                        cursor: 'pointer',
                                                                        ":hover": {
                                                                            color: '#ef5350',
                                                                            boxShadow: 10,
                                                                        }
                                                                    }}
                                                                    onClick={(e) => VerificationClick(val)}
                                                                />}
                                                        </Box>
                                                    </td>
                                                    : null}
                                                <td style={{ textAlign: 'center' }}>{index + 1}</td>
                                                <td>{moment(val.due_date).format('DD-MM-YYYY')}</td>
                                                <td>{(val.backup_type === 1) ? 'IIS Backup' : (val.backup_type === 2) ? 'Database Backup' : (val.backup_type === 3) ? 'Share Folder Backup' : 'Scanned File Backup'}</td>
                                                <td>{val.backup_name}</td>
                                                <td>{val.backup_location}</td>
                                                <td>{val.backup_device_ip}</td>
                                                <td>{val.backup_device_name}</td>
                                                <td>{val.backup_device_location}</td>
                                                <td>{val.transferred_device_ip}</td>
                                                <td>{val.transferred_device_name}</td>
                                                <td>{val.transferred_device_location}</td>
                                                <td>{val.schedule_type_name}</td>
                                                <td>{val.selected_days + " Days"}</td>
                                                {daysflag === 3 ? <td>{moment(val.backup_date_time).format('YYYY-MM-DD hh:mm A')}</td> : null}
                                                {daysflag === 3 ? <td>{val.em_name}</td> : null}
                                                {daysflag === 3 ? <td>{(val.verify_status === 1) ? 'Successfull' : (val.verify_status === 2) ? 'Not Successfull' : 'Not Updated'}</td> : null}
                                                {daysflag === 3 ? <td>{(val.remarks === null) ? 'Nil' : val.remarks}</td> : null}
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </CssVarsProvider>
                        </Paper>
                    </CardMasterClose>
                </Box>
            </Paper>
        </Fragment>
    )
}
export default memo(SelectedDaysTable)