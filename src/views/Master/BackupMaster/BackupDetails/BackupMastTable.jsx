import { Box, Table } from '@mui/joy'
import React, { Fragment, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import EditIcon from '@mui/icons-material/Edit'
import { getBackupDetails } from 'src/redux/actions/BackupDetails.action'
import { useEffect } from 'react'
const BackupMastTable = ({ count, EditBackup }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getBackupDetails())
  }, [dispatch, count])
  const backup = useSelector((state) => state?.getBackupDetails.backupList)
  return (
    <Fragment>
      <Box sx={{ width: 2000, maxHeight: 420, overflow: 'auto' }}>
        <Table borderAxis="both" padding={'none'} stickyHeader>
          <thead>
            <tr style={{ height: 5 }}>
              <th rowSpan={2} style={{ width: 60, textAlign: 'center' }}>
                Action
              </th>
              <th rowSpan={2} style={{ width: 170, textAlign: 'center' }}>
                Backup Type
              </th>
              <th rowSpan={2} style={{ width: 110, textAlign: 'center' }}>
                Backup Name
              </th>
              <th rowSpan={2} style={{ width: 180, textAlign: 'center' }}>
                Backup Location
              </th>
              <th colSpan={3} style={{ width: 350, textAlign: 'center' }}>
                Backup Device Details
              </th>
              <th colSpan={3} style={{ width: 350, textAlign: 'center' }}>
                {' '}
                Backup Transferred Device Details{' '}
              </th>
              <th colSpan={2} style={{ width: 300, textAlign: 'center' }}>
                Backup Schedule{' '}
              </th>
              <th rowSpan={2} style={{ width: 100, textAlign: 'center' }}>
                Status
              </th>
            </tr>
            <tr
              //  sx={{ height: 5 }}
              size="small"
            >
              <th style={{ textAlign: 'center' }}>IP Address </th>
              <th style={{ textAlign: 'center' }}>Computer Name</th>
              <th style={{ textAlign: 'center' }}>Physical Location</th>
              <th style={{ textAlign: 'center' }}>IP Address</th>
              <th style={{ textAlign: 'center' }}>Computer Name</th>
              <th style={{ textAlign: 'center' }}>Physical Location</th>
              <th style={{ textAlign: 'center' }}>Schedule Type</th>
              <th style={{ textAlign: 'center' }}>Schedule Time</th>
            </tr>
          </thead>
          <tbody size="small" style={{ height: 8 }}>
            {backup.map((val) => (
              <tr key={val.backup_slno} style={{ height: 8 }} size="small">
                <td size="sm" style={{ textAlign: 'center', fontSize: 13, height: 13 }}>
                  <Box>
                    <EditIcon
                      size="small"
                      sx={{
                        color: 'black',
                        cursor: 'pointer',
                        ':hover': {
                          color: '#ef5350',
                          boxShadow: 5,
                        },
                      }}
                      onClick={(e) => EditBackup(val)}
                    />
                  </Box>{' '}
                </td>
                <td size="sm" style={{ fontSize: 14, height: 13 }}>
                  {val.backup_type === 1
                    ? 'IIS Backup'
                    : val.backup_type === 2
                      ? 'Database Backup'
                      : val.backup_type === 3
                        ? 'Share Folder Backup'
                        : val.backup_type === 4
                          ? 'Scanned File Backup'
                          : 'Configuration Backup'}
                </td>
                <td size="sm" style={{ fontSize: 14, height: 13 }}>
                  {val.backup_type_name}
                </td>
                <td size="sm" style={{ fontSize: 14, height: 13 }}>
                  {val.backup_name}
                </td>
                <td size="sm" style={{ fontSize: 12, height: 13 }}>
                  {val.backup_dept}
                </td>
                <td size="sm" style={{ fontSize: 14, height: 13 }}>
                  {val.backup_device_ip}
                </td>
                <td size="sm" style={{ fontSize: 14, height: 13 }}>
                  {val.backup_device_name}
                </td>
                <td size="sm" style={{ fontSize: 14, height: 13 }}>
                  {val.backup_device_location}
                </td>
                <td size="sm" style={{ fontSize: 14, height: 13 }}>
                  {val.transferred_device_ip}
                </td>
                <td size="sm" style={{ fontSize: 14, height: 13 }}>
                  {val.transferred_device_name}
                </td>
                <td size="sm" style={{ fontSize: 14, height: 13 }}>
                  {val.transferred_device_location}
                </td>
                <td size="sm" style={{ fontSize: 14, height: 13 }}>
                  {val.schedule_type_name}
                </td>
                <td size="sm" style={{ fontSize: 14, height: 13 }}>
                  {val.backup_schedule_type === 5 ? val.selected_days + ' Days' : val.timedata}
                </td>
                <td size="sm" style={{ fontSize: 14, height: 13 }}>
                  {val.backup_active_status === 1 ? 'Active' : 'Inactive'}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Box>
    </Fragment>
  )
}
export default memo(BackupMastTable)
