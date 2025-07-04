import { Box, Typography } from '@mui/material'
import React, { Fragment, memo } from 'react'
import { useCallback } from 'react'
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import CardMasterClose from 'src/views/Components/CardMasterClose'
import { useEffect } from 'react'
import { getBackupDetails, getEmployeeBackup } from 'src/redux/actions/BackupDetails.action'
import { useDispatch, useSelector } from 'react-redux'
import BackupChecksTable from './BackupChecksTable'
import { getScheduleTime } from 'src/redux/actions/BackupScheduleTime.action'
import { useNavigate } from 'react-router-dom'
const BackupChecks = () => {
  const history = useNavigate()
  const dispatch = useDispatch()
  const backtoHome = useCallback(() => {
    history('/Home/DashboardBackup')
  }, [history])

  const empDept = useSelector(state => {
    return state.LoginUserData.empdept
  })

  useEffect(() => {
    dispatch(getBackupDetails())
    dispatch(getScheduleTime())
    dispatch(getEmployeeBackup(empDept))
  }, [dispatch, empDept])
  return (
    <Fragment>
      <Box>
        <CardMasterClose close={backtoHome}>
          <Box>
            <Typography sx={{ fontWeight: 10, fontSize: 18 }}> Backup Checks & Monitoring</Typography>
          </Box>
          <Box sx={{ pt: 0.5 }}>
            <BackupChecksTable />
          </Box>
        </CardMasterClose>
      </Box>
    </Fragment>
  )
}

export default memo(BackupChecks)
