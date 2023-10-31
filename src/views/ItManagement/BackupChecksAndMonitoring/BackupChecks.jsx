import { Box, Typography } from '@mui/material'
import React, { Fragment } from 'react'
import { useCallback } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import CardMasterClose from 'src/views/Components/CardMasterClose'
import { useEffect } from 'react'
import { getBackupDetails, getEmployeeBackup } from 'src/redux/actions/BackupDetails.action'
import { useDispatch } from 'react-redux'
import BackupChecksTable from './BackupChecksTable'
import { getScheduleTime } from 'src/redux/actions/BackupScheduleTime.action'
const BackupChecks = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const backtoHome = useCallback(() => {
    history.push('/Home/DashboardBackup')
  }, [history])
  useEffect(() => {
    dispatch(getBackupDetails())
    dispatch(getScheduleTime())
    dispatch(getEmployeeBackup())
  }, [dispatch])
  return (
    <Fragment>
      <Box>
        <CardMasterClose
          close={backtoHome}
        >
          <Box>
            <Typography sx={{ fontWeight: 10, fontSize: 20, fontFamily: 'Anton' }}> Backup Checks & Monitoring</Typography>
          </Box>
          <Box sx={{ pt: 0.5 }}>
            <BackupChecksTable />
          </Box>
        </CardMasterClose>
      </Box>
    </Fragment>
  )
}

export default BackupChecks


