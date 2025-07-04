import React, { memo } from 'react'
import { Box, Paper, Tooltip } from '@mui/material'
import { keyframes } from '@emotion/react'
import useCountdown from 'src/views/TaskManagement/CountDown/useCountdown'
import UpdateIcon from '@mui/icons-material/Update'
import TimelapseIcon from '@mui/icons-material/Timelapse'

const CountDownReqtoExpect = ({ expectDate }) => {
  const rotate = keyframes`
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      `
  const currentTime = new Date()
  const difference = new Date(expectDate) - currentTime
  const duetimeCalc = currentTime - new Date(expectDate)
  const { days, hours, minutes, seconds } = useCountdown(difference, duetimeCalc)

  return (
    <Box sx={{ ml: 1 }}>
      {duetimeCalc < 0 ? (
        <Tooltip title="PO to Expected Delivery" placement="right" style={{ cursor: 'pointer', pr: 2 }}>
          <Paper
            sx={{
              display: 'flex',
              boxShadow: 1,
              bgcolor: 'white',
              borderRadius: 1,
              px: 0.5,
              maxHeight: 25
            }}
          >
            <Box sx={{ pl: 0.5 }}>
              <UpdateIcon
                sx={{
                  height: 18,
                  width: 18,
                  fontWeight: 800,
                  color: '#116530',
                  m: 0.1,
                  animation: `${rotate} 2s linear infinite`
                }}
              />
              &nbsp;
            </Box>
            <Box sx={{ flex: 0.1 }}></Box>
            <Box sx={{ fontWeight: 600, color: '#116530', pt: 0.2, fontSize: 12 }}>{days}</Box>
            &nbsp;
            <Box sx={{ pt: 0.2, fontSize: 12, color: '#116530' }}>Days</Box>&nbsp;
            <Box sx={{ fontWeight: 600, color: '#116530', pt: 0.2, fontSize: 12 }}>&nbsp;{hours}h</Box>
            <Box sx={{ fontWeight: 700, pt: 0.2, fontSize: 12 }}>:</Box>
            <Box sx={{ fontWeight: 600, color: '#116530', pt: 0.2, fontSize: 12 }}>&nbsp;{minutes}m</Box>
            <Box sx={{ fontWeight: 700, pt: 0.2, fontSize: 12 }}>:</Box>
            <Box sx={{ fontWeight: 600, color: '#116530', pt: 0.2, fontSize: 12 }}>&nbsp;{seconds}s</Box>
            <Box sx={{ pt: 0.2, fontSize: 12, color: '#116530' }}>&nbsp;&nbsp;Left</Box>&nbsp;&nbsp;
          </Paper>
        </Tooltip>
      ) : (
        <Tooltip title="PO to Expected Delivery" placement="right" style={{ cursor: 'pointer', pr: 2 }}>
          <Paper
            sx={{
              display: 'flex',
              boxShadow: 1,
              px: 0.5,
              bgcolor: 'white',
              borderRadius: 1,
              maxHeight: 25
            }}
          >
            <Box sx={{ pl: 0.5 }}>
              <TimelapseIcon
                sx={{
                  height: 18,
                  width: 18,
                  color: '#BA0F30',
                  fontWeight: 800,
                  m: 0.1,
                  animation: `${rotate} 2s linear infinite`
                }}
              />
              &nbsp;
            </Box>
            <Box sx={{ flex: 0.1 }}></Box>
            <Box sx={{ fontWeight: 600, color: '#BA0F30', pt: 0.2, fontSize: 12 }}>{days}</Box>
            &nbsp;
            <Box sx={{ color: '#BA0F30', pt: 0.2, fontSize: 12 }}>Days</Box>&nbsp;
            <Box sx={{ fontWeight: 600, color: '#BA0F30', pt: 0.2, fontSize: 12 }}>&nbsp;{hours}h</Box>
            <Box sx={{ fontWeight: 700, pt: 0.2, fontSize: 12 }}>:</Box>
            <Box sx={{ fontWeight: 600, color: '#BA0F30', pt: 0.2, fontSize: 12 }}>&nbsp;{minutes}m</Box>
            <Box sx={{ fontWeight: 700, pt: 0.2, fontSize: 12 }}>:</Box>
            <Box sx={{ fontWeight: 600, color: '#BA0F30', pt: 0.2, fontSize: 12 }}>&nbsp;{seconds}s</Box>
            <Box sx={{ pt: 0.2, fontSize: 12, color: '#BA0F30' }}>&nbsp;&nbsp;Over</Box>&nbsp;&nbsp;
          </Paper>
        </Tooltip>
      )}
    </Box>
  )
}

export default memo(CountDownReqtoExpect)
