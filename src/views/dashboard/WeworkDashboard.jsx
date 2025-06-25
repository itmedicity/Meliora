import { Box, CssVarsProvider } from '@mui/joy'
import { Paper } from '@mui/material'
import React from 'react'
import Typography from '@mui/joy/Typography'
import IconButton from '@mui/joy/IconButton'
import { useNavigate } from 'react-router-dom'

const WeworkDashboard = ({ widgetName, count, slno }) => {
  const history = useNavigate()
  const TotalAdmission = () => {
    history('/Home/totaladmission')
  }

  const DAMA = () => {
    history('/Home/damaList')
  }
  const BHRCpat = () => {
    history('/Home/BhrcList')
  }
  const RoundsafterNoon = () => {
    history('/Home/roundsAfternoon')
  }
  const DischargeAfterNoon = () => {
    history('/Home/disafternoonList')
  }
  const Noshift = () => {
    history('/Home/noshift')
  }
  const Antibiotic = () => {
    history('/Home/highbioticReport')
  }
  const DashBoardClick = () => {
    return (
      (slno === 74 && TotalAdmission) ||
      (slno === 75 && DAMA) ||
      (slno === 76 && BHRCpat) ||
      (slno === 78 && RoundsafterNoon) ||
      (slno === 79 && DischargeAfterNoon) ||
      (slno === 77 && Noshift) ||
      (slno === 81 && Antibiotic)
    )
  }
  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      <Paper
        elevation={3}
        sx={{
          width: '100%',
          p: 0.5,
          display: 'flex',
          direction: 'row',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            borderRadius: 10,
            boxShadow: 8,
          }}
        >
          <CssVarsProvider>
            <IconButton variant="outlined" size="lg" color="primary" onClick={DashBoardClick(slno)}>
              {count}
              {/* {status === true ? <CircularProgress sx={{ color: 'pink' }} /> : count} */}
            </IconButton>
          </CssVarsProvider>
        </Box>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}
        >
          <Box sx={{ px: 0.5 }}>
            <CssVarsProvider>
              <Typography
                level="body2"
                sx={{ alignItems: 'flex-start', wordBreak: 'break-all' }}
                color="primary"
              >
                {widgetName}
              </Typography>
            </CssVarsProvider>
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}

export default WeworkDashboard
