import { CssVarsProvider, Table } from '@mui/joy'
import { Paper, Typography } from '@mui/material'
import React, { useCallback } from 'react'
import { memo } from 'react'
import { Fragment } from 'react'
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import CardMasterClose from 'src/views/Components/CardMasterClose'
import { useDispatch, useSelector } from 'react-redux'
import { getEmployeeBackup } from 'src/redux/actions/BackupDetails.action'
import { useEffect } from 'react'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
const SelectDaysUpcoming = ({ daysnext, setdaysflag }) => {
  const history = useNavigate()
  const dispatch = useDispatch()
  const backtoHome = useCallback(() => {
    history('/Home/DashboardBackup')
    setdaysflag(0)
  }, [history, setdaysflag])

  const empDept = useSelector((state) => {
    return state.LoginUserData.empdept
  })

  useEffect(() => {
    dispatch(getEmployeeBackup(empDept))
  }, [dispatch, empDept])

  return (
    <Fragment>
      <Paper>
        <CardMasterClose close={backtoHome}>
          <Paper>
            <Typography sx={{ fontWeight: 10, fontSize: 18 }}>Upcoming Backup</Typography>
          </Paper>
          <Paper variant="outlined" sx={{ overflow: 'auto', maxHeight: window.innerHeight - 220 }}>
            <CssVarsProvider>
              <Table borderAxis="both" padding={'none'} stickyHeader>
                <thead style={{ alignItems: 'center' }}>
                  <tr>
                    <th rowSpan={2} style={{ width: 70, textAlign: 'center' }}>
                      Sl.No
                    </th>
                    <th rowSpan={2} style={{ width: 130, textAlign: 'center' }}>
                      Backup DueDate
                    </th>
                    <th rowSpan={2} style={{ width: 150, textAlign: 'center' }}>
                      Backup Type
                    </th>
                    <th rowSpan={2} style={{ width: 110, textAlign: 'center' }}>
                      Backup Name
                    </th>
                    <th rowSpan={2} style={{ width: 125, textAlign: 'center' }}>
                      Backup Location
                    </th>
                    <th colSpan={3} style={{ width: 390, textAlign: 'center' }}>
                      Backup Device Details
                    </th>
                    <th colSpan={3} style={{ width: 390, textAlign: 'center' }}>
                      Backup Transferred Device Details
                    </th>
                    <th colSpan={2} style={{ width: 280, textAlign: 'center' }}>
                      Backup Schedule{' '}
                    </th>
                  </tr>
                  <tr
                    // sx={{ height: 8 }}
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
                  {daysnext?.map((val, index) => (
                    <tr key={val.days_slno} style={{ height: 8 }} size="small">
                      <td style={{ textAlign: 'center' }}>{index + 1}</td>
                      <td>{moment(val.due_date).format('DD-MM-YYYY')}</td>
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
                      <td>{val.selected_days + ' Days'}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </CssVarsProvider>
          </Paper>
        </CardMasterClose>
      </Paper>
    </Fragment>
  )
}
export default memo(SelectDaysUpcoming)
