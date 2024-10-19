import React, { memo } from 'react'
import { Box } from '@mui/material'
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import UseCountDownCm from './UseCountDownCm';
import { Typography } from '@mui/joy';


const CountDownCm = ({ complaintDate }) => {
    const currentTime = new Date()
    const difference = new Date(complaintDate) - currentTime
    const duetimeCalc = currentTime - new Date(complaintDate)
    const { days, hours, minutes, seconds } = UseCountDownCm(difference, duetimeCalc)

    return (
        <Box sx={{ display: 'flex', }}>
            <TimerOutlinedIcon sx={{ color: 'darkred', borderRadius: 1, p: .3 }} />
            {days !== 0 ?
                <Box sx={{ display: 'flex', pt: .3 }}>
                    <Typography sx={{ fontWeight: 600, color: 'darkred', fontSize: 13, }}>
                        {days}
                    </Typography>
                    <Typography sx={{ fontWeight: 600, color: 'darkred', fontSize: 13, pl: .3 }}>
                        Days&nbsp;
                    </Typography>
                </Box>
                : null}

            <Box sx={{ display: 'flex', pt: .3 }}>
                <Typography sx={{ fontWeight: 600, color: 'darkred', fontSize: 13, }}>
                    {hours}
                </Typography>
                <Typography sx={{ fontWeight: 600, color: 'darkred', fontSize: 13, pl: .3 }}>
                    h&nbsp;:&nbsp;
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', pt: .3 }}>
                <Typography sx={{ fontWeight: 600, color: 'darkred', fontSize: 13, }}>
                    {minutes}
                </Typography>
                <Typography sx={{ fontWeight: 600, color: 'darkred', fontSize: 13, pl: .3 }}>
                    m
                </Typography>
            </Box>
            {days === 0 ?
                <Box sx={{ display: 'flex', pt: .3 }}>
                    <Typography sx={{ fontWeight: 600, color: 'darkred', fontSize: 13, }}>
                        &nbsp;:&nbsp;{seconds}
                    </Typography>
                    <Typography sx={{ fontWeight: 600, color: 'darkred', fontSize: 13, pl: .3 }}>
                        s
                    </Typography>
                </Box> : null}
        </Box>

    )
}

export default memo(CountDownCm)