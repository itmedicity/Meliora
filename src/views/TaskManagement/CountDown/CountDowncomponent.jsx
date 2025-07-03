import React, { memo } from 'react'
import useCountdown from './useCountdown'
import { Box } from '@mui/material'
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined'
import RestoreIcon from '@mui/icons-material/Restore'
import AlarmTwoToneIcon from '@mui/icons-material/AlarmTwoTone'

const CountDowncomponent = ({ DueDates }) => {
  const currentTime = new Date()
  const difference = new Date(DueDates) - currentTime
  const duetimeCalc = currentTime - new Date(DueDates)
  const { days, hours, minutes, seconds } = useCountdown(difference, duetimeCalc)

  return (
    <Box sx={{}}>
      {days === 0 && hours === 0 && minutes === 0 ? (
        <Box sx={{ display: 'flex' }}>
          <Box>
            <TimerOutlinedIcon sx={{ color: '#BA0F30', fontWeight: 800, m: 0.1 }} />
            &nbsp;
          </Box>
          <Box sx={{ flex: 0.1 }}></Box>
          <Box sx={{ fontWeight: 600, color: '#05445E', pt: 0.2 }}>{days}</Box>&nbsp;
          <Box sx={{ color: '#05445E', pt: 0.2 }}>Days</Box>&nbsp;&nbsp;
          <Box sx={{ fontWeight: 600, color: '#05445E', pt: 0.2 }}>{hours}</Box>
          <Box sx={{ fontWeight: 700, pt: 0.2 }}>:</Box>
          <Box sx={{ fontWeight: 600, color: '#05445E', pt: 0.2 }}>{minutes}</Box>
          <Box sx={{ fontWeight: 700, pt: 0.2 }}>:</Box>
          <Box sx={{ fontWeight: 600, color: '#BA0F30', pt: 0.2 }}>{seconds}</Box>
        </Box>
      ) : (
        <Box>
          {duetimeCalc > 0 ? (
            <Box sx={{ display: 'flex' }}>
              <Box>
                <RestoreIcon sx={{ color: '#BA0F30', fontWeight: 800, m: 0.1 }} />
                &nbsp;
              </Box>
              <Box sx={{ flex: 0.1 }}></Box>
              <Box sx={{ fontWeight: 600, color: '#BA0F30', pt: 0.2 }}>{days}</Box>&nbsp;
              <Box sx={{ color: '#BA0F30', pt: 0.2 }}>Days</Box>&nbsp;&nbsp;
              <Box sx={{ fontWeight: 600, color: '#BA0F30', pt: 0.2 }}>{hours}</Box>
              <Box sx={{ fontWeight: 700, pt: 0.2 }}>:</Box>
              <Box sx={{ fontWeight: 600, color: '#BA0F30', pt: 0.2 }}>{minutes}</Box>
              <Box sx={{ fontWeight: 700, pt: 0.2 }}>:</Box>
              <Box sx={{ fontWeight: 600, color: '#BA0F30', pt: 0.2 }}>{seconds}</Box>
            </Box>
          ) : (
            <Box sx={{ display: 'flex' }}>
              <Box>
                <AlarmTwoToneIcon sx={{ fontWeight: 800, color: '#437081', m: 0.1 }} />
                &nbsp;
              </Box>
              <Box sx={{ flex: 0.1 }}></Box>
              <Box sx={{ fontWeight: 600, color: '#05445E', pt: 0.2 }}>{days}</Box>&nbsp;
              <Box sx={{ pt: 0.2 }}>Days</Box>&nbsp;&nbsp;
              <Box sx={{ fontWeight: 600, color: '#05445E', pt: 0.2 }}>{hours}</Box>
              <Box sx={{ fontWeight: 700, pt: 0.2 }}>:</Box>
              <Box sx={{ fontWeight: 600, color: '#05445E', pt: 0.2 }}>{minutes}</Box>
              <Box sx={{ fontWeight: 700, pt: 0.2 }}>:</Box>
              <Box sx={{ fontWeight: 600, color: '#05445E', pt: 0.2 }}>{seconds}</Box>
            </Box>
          )}
        </Box>
      )}
    </Box>
  )
}

export default memo(CountDowncomponent)
