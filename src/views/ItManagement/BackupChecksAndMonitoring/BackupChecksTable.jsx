import { Box, Paper } from '@mui/material'
import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { memo } from 'react'
import { CssVarsProvider } from '@mui/joy/'
import Table from '@mui/joy/Table'
import { getEmployeeBackup } from 'src/redux/actions/BackupDetails.action'
import { useEffect } from 'react'
import { getDeptwiseBackUp } from 'src/api/CommonApi'
import { useQuery } from 'react-query'
const BackupChecksTable = () => {
  // const backup = useSelector((state) => state?.getBackupDetails.backupList)
  const dispatch = useDispatch()
  const empDept = useSelector(state => {
    return state.LoginUserData.empdept
  })

  const { data: getDeptwiseBackups } = useQuery({
    queryKey: ['getDeptwiseBackUP', empDept],
    queryFn: () => getDeptwiseBackUp(empDept)
  })
  const backup = useMemo(() => getDeptwiseBackups || [], [getDeptwiseBackups])

  useEffect(() => {
    dispatch(getEmployeeBackup(empDept))
  }, [dispatch, empDept])

  return (
    <Box>
      <Paper sx={{ overflow: 'auto', maxHeight: window.innerHeight - 220 }}>
        <CssVarsProvider>
          <Box sx={{ width: 2000 }}>
            <Table borderAxis="both" padding={'none'} stickyHeader>
              <thead>
                <tr style={{ height: 8 }}>
                  <th rowSpan={2} style={{ width: 60 }}>
                    Sl.No
                  </th>
                  <th rowSpan={2} style={{ width: 150 }}>
                    Backup Type
                  </th>
                  <th rowSpan={2} style={{ width: 110 }}>
                    Backup Name
                  </th>
                  <th rowSpan={2} style={{ width: 125 }}>
                    Backup Location
                  </th>
                  <th colSpan={3} style={{ textAlign: 'center' }}>
                    Backup Device Details
                  </th>
                  <th colSpan={3} style={{ textAlign: 'center' }}>
                    {' '}
                    Backup Transferred Device Details{' '}
                  </th>
                  <th colSpan={2} style={{ textAlign: 'center' }}>
                    Backup Schedule{' '}
                  </th>
                  <th rowSpan={2} style={{ width: 100 }}>
                    Status
                  </th>
                </tr>
                <tr
                  // sx={{ height: 8 }}
                  size="small"
                >
                  <th>IP Address </th>
                  <th>Computer Name</th>
                  <th style={{ borderRightWidth: 0 }}>Physical Location</th>
                  <th>IP Address</th>
                  <th>Computer Name</th>
                  <th style={{ borderRightWidth: 0 }}>Physical Location</th>
                  <th>Schedule Type</th>
                  <th style={{ borderRightWidth: 0 }}>Schedule Time</th>
                </tr>
              </thead>

              <tbody size="small" style={{ height: 8 }}>
                {backup?.map((val, index) => (
                  <tr key={val.backup_slno} style={{ height: 8 }} size="small">
                    <td style={{ textAlign: 'center' }}>{index + 1}</td>
                    <td>{val.backup_type_name}</td>
                    <td>{val.backup_name}</td>
                    <td style={{ fontSize: 12 }}>{val.backup_dept}</td>
                    <td>{val.backup_device_ip}</td>
                    <td>{val.backup_device_name}</td>
                    <td>{val.backup_device_location}</td>
                    <td>{val.transferred_device_ip}</td>
                    <td>{val.transferred_device_name}</td>
                    <td>{val.transferred_device_location}</td>
                    <td>{val.schedule_type_name}</td>
                    <td>{val.backup_schedule_type === 5 ? val.selected_days + ' Days' : val.timedata}</td>
                    <td style={{ fontSize: 12 }}>{val.backup_active_status === 1 ? 'Active' : 'Inactive'}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Box>
        </CssVarsProvider>
      </Paper>
    </Box>
  )
}
export default memo(BackupChecksTable)
