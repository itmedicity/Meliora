import { Box, Paper } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { memo } from 'react';
import { CssVarsProvider } from '@mui/joy/'
import Table from '@mui/joy/Table';
import { getEmployeeBackup } from 'src/redux/actions/BackupDetails.action';
import { useEffect } from 'react';
const BackupChecksTable = () => {
    const backup = useSelector((state) => state?.getBackupDetails.backupList)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getEmployeeBackup())
    }, [dispatch])
    return (
        <Box>
            <Paper sx={{ overflow: 'auto', maxHeight: window.innerHeight - 220 }}>
                <CssVarsProvider>
                    <Table borderAxis="both" padding={"none"} stickyHeader >
                        <thead>
                            <tr style={{ height: 8 }}>
                                {/* <th rowSpan={2} style={{ width: 70 }}>Action</th> */}
                                <th rowSpan={2} style={{ width: 60 }}>Sl.No</th>
                                <th rowSpan={2} style={{ width: 150 }}>Backup Type</th>
                                <th rowSpan={2} style={{ width: 110 }}>Backup Name</th>
                                <th rowSpan={2} style={{ width: 125 }}>Backup Location</th>
                                <th colSpan={3} style={{ textAlign: 'center' }}>Backup Device Details</th>
                                <th colSpan={3} style={{ textAlign: 'center' }}>  Backup Transferred Device Details  </th>
                                <th colSpan={2} style={{ textAlign: 'center' }}>Backup Schedule </th>
                            </tr>
                            <tr sx={{ height: 8 }} size='small'>
                                <th >IP Address </th>
                                <th>Computer Name</th>
                                <th style={{ borderRightWidth: 0 }}>Physical Location</th>
                                <th>IP Address</th>
                                <th>Computer Name</th>
                                <th style={{ borderRightWidth: 0 }}>Physical Location</th>
                                <th>Schedule Type</th>
                                <th style={{ borderRightWidth: 0 }}>Schedule Time</th>
                            </tr>
                        </thead>

                        <tbody size='small' style={{ height: 8 }}>
                            {backup?.map((val, index) => (
                                <tr key={val.backup_slno} style={{ height: 8 }} size='small' >
                                    <td style={{ textAlign: 'center' }}>{index + 1}</td>
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
                                    <td>{val.backup_schedule_type === 5 ? val.selected_days + " Days" : val.timedata}</td>
                                </tr>
                            ))}
                        </tbody>

                    </Table>
                </CssVarsProvider>
            </Paper>
        </Box>
    )
}
export default memo(BackupChecksTable)




