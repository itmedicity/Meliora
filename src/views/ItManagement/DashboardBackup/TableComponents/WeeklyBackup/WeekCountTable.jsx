import { CssVarsProvider, Table } from '@mui/joy'
import { Box, Paper, Typography } from '@mui/material'
import React, { useCallback } from 'react'
import { memo } from 'react'
import { Fragment } from 'react'
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import CardMasterClose from 'src/views/Components/CardMasterClose'
import VerifiedIcon from '@mui/icons-material/Verified'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getEmployeeBackup } from 'src/redux/actions/BackupDetails.action'
import { useEffect } from 'react'
import ModalWeeklyVerification from '../../ModalForVerification/ModalWeekly/ModalWeeklyVerification'
import ModalVerifiedDetails from '../../ModalForVerification/ModalDay/ModalVerifiedDetails'
import moment from 'moment'
import { endOfWeek } from 'date-fns'
import { infoNotify } from 'src/views/Common/CommonCode'
import { useNavigate } from 'react-router-dom'
const WeekCountTable = ({ weektableData, setWeektabflag, weekflag, count, setCount }) => {
  const history = useNavigate()
  const dispatch = useDispatch()
  const [flag, setflag] = useState(0)
  const [modalopen, setModalOpen] = useState(false)
  const [view, setView] = useState([])
  const [verifyflag, setVerifyflag] = useState(0)
  const backtoHome = useCallback(() => {
    history('/Home/DashboardBackup')
    setWeektabflag(0)
  }, [history, setWeektabflag])

  const empDept = useSelector(state => {
    return state.LoginUserData.empdept
  })

  useEffect(() => {
    dispatch(getEmployeeBackup(empDept))
  }, [dispatch, empDept])

  const handleClose = useCallback(() => {
    setModalOpen(false)
    setflag(0)
  }, [setModalOpen])
  const VerificationClick = useCallback(
    val => {
      if (val.verify_status === 1) {
        setView(val)
        setModalOpen(true)
        setVerifyflag(1)
      } else {
        if (weekflag === 1) {
          const getendOfWeek = endOfWeek(new Date(val.backup_weekly_date))
          if (getendOfWeek === new Date()) {
            setView(val)
            setModalOpen(true)
            setflag(1)
          } else {
            infoNotify("Can't do it Now,It's Not the End of the Week ")
          }
        } else {
          setView(val)
          setModalOpen(true)
          setflag(1)
        }
      }
    },
    [setflag, weekflag]
  )
  return (
    <Fragment>
      <Paper>
        {flag === 1 ? (
          <ModalWeeklyVerification
            open={modalopen}
            handleClose={handleClose}
            rowSelect={view}
            count={count}
            setCount={setCount}
          />
        ) : verifyflag === 1 ? (
          <ModalVerifiedDetails open={modalopen} handleClose={handleClose} rowSelect={view} />
        ) : null}
        <CardMasterClose close={backtoHome}>
          {weekflag === 1 ? (
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ fontWeight: 10, fontSize: 17 }}>Current Week Details</Typography>
              </Box>
              <Box
                sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  pr: 2,
                }}
              >
                <Box
                  sx={{
                    height: 20,
                    width: 30,
                    bgcolor: 'lightgrey',
                    border: '0.1px solid lightgrey',
                  }}
                >
                  {' '}
                </Box>
                <Typography>&nbsp; Successfull &nbsp;</Typography>
              </Box>
            </Box>
          ) : weekflag === 2 ? (
            <Paper>
              <Typography sx={{ fontWeight: 10, fontSize: 18 }}>Weekly Backup Dues</Typography>
            </Paper>
          ) : weekflag === 3 ? (
            <Paper>
              <Typography sx={{ fontWeight: 10, fontSize: 18 }}>Weekly Backup Errors</Typography>
            </Paper>
          ) : null}
          <Paper variant="outlined" sx={{ overflow: 'auto', maxHeight: window.innerHeight - 220 }}>
            <CssVarsProvider>
              <Table borderAxis="both" padding={'none'} stickyHeader>
                <thead style={{ alignItems: 'center' }}>
                  <tr>
                    <th rowSpan={2} style={{ width: 80, textAlign: 'center' }}>
                      For Verify
                    </th>
                    <th rowSpan={2} style={{ width: 60, textAlign: 'center' }}>
                      Sl.No
                    </th>
                    {weekflag === 1 ? (
                      <th rowSpan={2} style={{ width: 120, textAlign: 'center' }}>
                        Backup Date
                      </th>
                    ) : null}
                    {weekflag === 2 || weekflag === 3 ? (
                      <th rowSpan={2} style={{ width: 130, textAlign: 'center' }}>
                        Backup DueDate
                      </th>
                    ) : null}
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
                      {' '}
                      Backup Transferred Device Details{' '}
                    </th>
                    <th rowSpan={2} style={{ width: 120, textAlign: 'center' }}>
                      Schedule Type
                    </th>
                    {weekflag === 3 ? (
                      <th rowSpan={2} style={{ width: 160, textAlign: 'center' }}>
                        Date{' '}
                      </th>
                    ) : null}
                    {weekflag === 3 ? (
                      <th rowSpan={2} style={{ width: 100, textAlign: 'center' }}>
                        Employee{' '}
                      </th>
                    ) : null}
                    {weekflag === 3 ? (
                      <th rowSpan={2} style={{ width: 100, textAlign: 'center' }}>
                        Status
                      </th>
                    ) : null}
                    {weekflag === 3 ? (
                      <th rowSpan={2} style={{ width: 150, textAlign: 'center' }}>
                        Remarks
                      </th>
                    ) : null}
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
                  </tr>
                </thead>
                <tbody size="small" style={{ height: 8 }}>
                  {weektableData?.map((val, index) => (
                    <tr
                      key={val.weekly_slno}
                      size="small"
                      style={{
                        height: 8,
                        background: val.verify_status === 1 ? 'lightgrey' : 'transparent',
                      }}
                    >
                      <td style={{ textAlign: 'center' }}>
                        <Box>
                          {val.verify_status === 1 ? (
                            <VerifiedIcon
                              size="small"
                              sx={{
                                color: 'grey',
                                cursor: 'pointer',
                                ':hover': {
                                  color: '#43a047',
                                  boxShadow: 10,
                                },
                              }}
                              onClick={() => VerificationClick(val)}
                            />
                          ) : (
                            <VerifiedIcon
                              size="small"
                              sx={{
                                color: 'grey',
                                cursor: 'pointer',
                                ':hover': {
                                  color: '#ef5350',
                                  boxShadow: 10,
                                },
                              }}
                              onClick={() => VerificationClick(val)}
                            />
                          )}
                        </Box>
                      </td>
                      <td style={{ textAlign: 'center' }}>{index + 1}</td>
                      <td>{moment(val.backup_weekly_date).format('DD-MM-YYYY')}</td>
                      <td>
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
                      {weekflag === 3 ? (
                        <td>{moment(val.backup_date_time).format('YYYY-MM-DD hh:mm A')}</td>
                      ) : null}
                      {weekflag === 3 ? <td>{val.em_name}</td> : null}
                      {weekflag === 3 ? (
                        <td>
                          {val.verify_status === 1
                            ? 'Successfull'
                            : val.verify_status === 2
                              ? 'Not Successfull'
                              : 'Not Updated'}
                        </td>
                      ) : null}
                      {weekflag === 3 ? (
                        <td>{val.remarks === null ? 'Nil' : val.remarks}</td>
                      ) : null}
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
export default memo(WeekCountTable)
