import React, { memo } from 'react'
import { Box } from '@mui/material'
import { keyframes } from '@emotion/react'
import useCountdown from 'src/views/TaskManagement/CountDown/useCountdown';
import UpdateIcon from '@mui/icons-material/Update';
import TimelapseIcon from '@mui/icons-material/Timelapse';
const CountdownTimer = ({ endDate }) => {
    const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
    const currentTime = new Date()
    const difference = new Date(endDate) - currentTime
    const duetimeCalc = currentTime - new Date(endDate)
    const { days, hours, minutes, seconds } = useCountdown(difference, duetimeCalc)

    return (
        <Box sx={{ pt: 0.2 }}>
            {
                // not exceed due date green
                duetimeCalc < 0 ?
                    <Box sx={{ display: 'flex', pt: 0.3, boxShadow: 1, px: 2, bgcolor: 'white', borderRadius: 1 }}>
                        <Box sx={{}}  >
                            <UpdateIcon sx={{
                                height: 18, width: 18,
                                fontWeight: 800, color: '#116530', m: .1,
                                animation: `${rotate} 2s linear infinite`
                            }} />&nbsp;
                        </Box>
                        <Box sx={{ flex: .1 }}></Box>
                        <Box sx={{ fontWeight: 600, color: '#116530', pt: .2, fontSize: 14 }}>{days}</Box>&nbsp;
                        <Box sx={{ pt: .2, fontSize: 14, color: '#116530' }}>Days</Box>&nbsp;
                        <Box sx={{ fontWeight: 600, color: '#116530', pt: .2, fontSize: 14 }}>&nbsp;{hours}h</Box>
                        <Box sx={{ fontWeight: 700, pt: .2, fontSize: 14 }}>:</Box>
                        <Box sx={{ fontWeight: 600, color: '#116530', pt: .2, fontSize: 14 }}>&nbsp;{minutes}m</Box>
                        <Box sx={{ fontWeight: 700, pt: .2, fontSize: 14 }}>:</Box>
                        <Box sx={{ fontWeight: 600, color: '#116530', pt: .2, fontSize: 14 }}>&nbsp;{seconds}s</Box>
                        <Box sx={{ pt: .2, fontSize: 13, color: '#116530' }}>&nbsp;&nbsp;Left</Box>&nbsp;&nbsp;
                    </Box>
                    :
                    <Box sx={{ display: 'flex', pt: 0.3, boxShadow: 1, px: 2, bgcolor: 'white', borderRadius: 1 }}>
                        <Box  >
                            <TimelapseIcon sx={{
                                height: 18, width: 18,
                                color: '#BA0F30', fontWeight: 800, m: .1,
                                animation: `${rotate} 2s linear infinite`
                            }} />&nbsp;
                        </Box>
                        <Box sx={{ flex: .1 }}></Box>
                        <Box sx={{ fontWeight: 600, color: '#BA0F30', pt: .2, fontSize: 14 }}>{days}</Box>&nbsp;
                        <Box sx={{ color: '#BA0F30', pt: .2, fontSize: 14 }}>Days</Box>&nbsp;
                        <Box sx={{ fontWeight: 600, color: '#BA0F30', pt: .2, fontSize: 14 }}>&nbsp;{hours}h</Box>
                        <Box sx={{ fontWeight: 700, pt: .2, fontSize: 14 }}>:</Box>
                        <Box sx={{ fontWeight: 600, color: '#BA0F30', pt: .2, fontSize: 14 }}>&nbsp;{minutes}m</Box>
                        <Box sx={{ fontWeight: 700, pt: .2, fontSize: 14 }}>:</Box>
                        <Box sx={{ fontWeight: 600, color: '#BA0F30', pt: .2, fontSize: 14 }}>&nbsp;{seconds}s</Box>
                        <Box sx={{ pt: .2, fontSize: 13, color: '#BA0F30' }}>&nbsp;&nbsp;Over</Box>&nbsp;&nbsp;
                    </Box>

            }
            {/* } */}
        </Box >
    )
}

export default memo(CountdownTimer)