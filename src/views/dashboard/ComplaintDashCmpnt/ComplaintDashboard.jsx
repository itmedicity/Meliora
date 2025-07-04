import { Box } from '@mui/joy'
import { Paper, CircularProgress } from '@mui/material'
import React, { memo, Fragment } from 'react'
import { CssVarsProvider } from '@mui/joy'
import Typography from '@mui/joy/Typography'
import IconButton from '@mui/joy/IconButton'
import { useNavigate } from 'react-router-dom'

const ComplaintDashboard = ({ widgetName, count, status, slno }) => {
  const history = useNavigate()

  const TotalComplaintsDept = () => {
    history('/Home/TotalDeptWiseList')
  }
  const PendingComplaintsDept = () => {
    history('/Home/PendingDeptWiseList')
  }
  const AssignedComplaintsDept = () => {
    history('/Home/AssignDeptWiseList')
  }
  const VerifyComplaintsDept = () => {
    history('/Home/VerifyDeptWiseList')
  }

  const PendingOnholdDept = () => {
    history('/Home/OnHoldPendingDeptWiseList')
  }
  const AssignedComplaintsEmp = () => {
    history('/Home/AssignEmpWiseList')
  }
  const VerifyComplaintsEmp = () => {
    history('/Home/VerifyEmpWiseList')
  }

  const PendingOnholdEmp = () => {
    history('/Home/OnHoldPendingEmpWiseList')
  }

  const TotalComplaintAll = () => {
    history('/Home/ComplaintList')
  }

  const DashboardClick = slno => {
    return (
      (slno === 1 && TotalComplaintsDept()) ||
      (slno === 2 && PendingComplaintsDept()) ||
      (slno === 3 && AssignedComplaintsDept()) ||
      (slno === 4 && VerifyComplaintsDept()) ||
      (slno === 5 && PendingOnholdDept()) ||
      (slno === 6 && TotalComplaintsDept()) ||
      (slno === 7 && PendingComplaintsDept()) ||
      (slno === 8 && AssignedComplaintsEmp()) ||
      (slno === 9 && VerifyComplaintsEmp()) ||
      (slno === 10 && PendingOnholdEmp()) ||
      (slno === 11 && TotalComplaintAll()) ||
      (slno === 12 && TotalComplaintAll()) ||
      (slno === 13 && TotalComplaintAll()) ||
      (slno === 14 && TotalComplaintAll()) ||
      (slno === 15 && TotalComplaintAll())
    )
  }

  return (
    <Fragment>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Paper
          sx={{
            width: '100%',
            p: 0.5,
            display: 'flex',
            direction: 'row'
          }}
        >
          <Box
            sx={{
              display: 'flex'
              //  borderRadius: 5,
              //  boxShadow: 2
            }}
          >
            <CssVarsProvider>
              <IconButton variant="outlined" size="lg" color="primary" onClick={e => DashboardClick(slno)}>
                {status === false ? <CircularProgress sx={{ color: 'pink' }} /> : count}
              </IconButton>
            </CssVarsProvider>
          </Box>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around'
            }}
          >
            <Box sx={{ px: 0.5 }}>
              <CssVarsProvider>
                <Typography level="body2" sx={{ alignItems: 'flex-start', wordBreak: 'break-all' }} color="primary">
                  {widgetName}
                </Typography>
              </CssVarsProvider>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Fragment>
  )
}
export default memo(ComplaintDashboard)
