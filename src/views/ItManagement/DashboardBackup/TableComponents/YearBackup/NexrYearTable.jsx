import { CssVarsProvider, Table } from '@mui/joy'
import { Paper, Typography } from '@mui/material'
import { addDays, endOfYear } from 'date-fns'
import moment from 'moment'
import React, { useCallback } from 'react'
import { memo } from 'react'
import { Fragment } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import CardMasterClose from 'src/views/Components/CardMasterClose'
const NexrYearTable = ({ nextyeardata, setYearflag }) => {
    const history = useHistory()
    const backtoHome = useCallback(() => {
        history.push('/Home/DashboardBackup')
        setYearflag(0)
    }, [history, setYearflag])
    const getEndofYear = endOfYear(new Date())
    const nextyear = addDays(new Date(getEndofYear), 1)
    return (
        <Fragment>
            <Paper>
                <CardMasterClose
                    close={backtoHome}
                >
                    <Paper>
                        <Typography sx={{ fontWeight: 10, fontSize: 18 }}>UpComing Backups</Typography>
                    </Paper>
                    <Paper variant="outlined" sx={{ overflow: 'auto', maxHeight: window.innerHeight - 220 }}>
                        <CssVarsProvider>
                            <Table borderAxis="both" padding={"none"} stickyHeader >
                                <thead>
                                    <tr>
                                        <th rowSpan={2} style={{ width: 70, textAlign: 'center' }}>Sl.No</th>
                                        <th rowSpan={2} style={{ width: 150, textAlign: 'center' }}>Backup Date</th>
                                        <th rowSpan={2} style={{ width: 150, textAlign: 'center' }}>Backup Type</th>
                                        <th rowSpan={2} style={{ width: 110, textAlign: 'center' }}>Backup Name</th>
                                        <th rowSpan={2} style={{ width: 125, textAlign: 'center' }}>Backup Location</th>
                                        <th colSpan={3} style={{ width: 390, textAlign: 'center' }}>Backup Device Details</th>
                                        <th colSpan={3} style={{ width: 390, textAlign: 'center' }}>  Backup Transferred Device Details  </th>
                                        <th rowSpan={2} style={{ width: 120, textAlign: 'center' }}>Schedule Type</th>
                                    </tr>
                                    <tr sx={{ height: 8 }} size='small'>
                                        <th style={{ textAlign: 'center' }}>IP Address </th>
                                        <th style={{ textAlign: 'center' }}>Computer Name</th>
                                        <th style={{ textAlign: 'center' }}>Physical Location</th>
                                        <th style={{ textAlign: 'center' }}>IP Address</th>
                                        <th style={{ textAlign: 'center' }}>Computer Name</th>
                                        <th style={{ textAlign: 'center' }}>Physical Location</th>
                                    </tr>
                                </thead>
                                <tbody size='small' style={{ height: 8 }}>
                                    {nextyeardata?.map((val, index) => (
                                        <tr key={val.time_slno} style={{ height: 8 }} size='small' >
                                            <td style={{ textAlign: 'center' }}>{index + 1}</td>
                                            <td>{moment(new Date(nextyear)).format('YYYY')}</td>
                                            <td>{(val.backup_type === 1) ? 'IIS Backup' : (val.backup_type === 2) ? 'Database Backup' : (val.backup_type === 3) ? 'Share Folder Backup' : (val.backup_type === 4) ? 'Scanned File Backup' : 'Configuration Backup'}</td>
                                            <td>{val.backup_type_name}</td>
                                            <td>{val.backup_name}</td>
                                            <td style={{ fontSize: 12 }}>{val.dept_name}</td>
                                            <td>{val.backup_device_ip}</td>
                                            <td>{val.backup_device_name}</td>
                                            <td>{val.backup_device_location}</td>
                                            <td>{val.transferred_device_ip}</td>
                                            <td>{val.transferred_device_name}</td>
                                            <td>{val.transferred_device_location}</td>
                                            <td>{val.schedule_type_name}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </CssVarsProvider>
                    </Paper>
                </CardMasterClose>
            </Paper >
        </Fragment >
    )
}
export default memo(NexrYearTable)