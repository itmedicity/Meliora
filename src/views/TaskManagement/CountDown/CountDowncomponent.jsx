import React from 'react'
import useCountdown from './useCountdown'
import { Box } from '@mui/material'
import FmdBadIcon from '@mui/icons-material/FmdBad';
const CountDowncomponent = ({ DueDates }) => {

    const currentTime = new Date()
    const difference = new Date(DueDates) - currentTime
    const duetimeCalc = currentTime - new Date(DueDates)
    const { days, hours, minutes, seconds } = useCountdown(difference, duetimeCalc)

    return (
        <Box>
            {days === 0 && hours === 0 && minutes === 0 ?
                <Box sx={{ display: 'flex' }}>
                    <Box sx={{ fontWeight: 600, color: '#05445E' }}>{days}</Box>&nbsp;
                    <Box sx={{ flex: 1, }}>Days</Box>
                    <Box sx={{ flex: .5, pl: .5, fontWeight: 700 }}>:</Box>
                    <Box sx={{ flex: .5, fontWeight: 600, color: '#05445E' }}>{hours}</Box>
                    <Box sx={{ flex: 1, }}>hh</Box>
                    <Box sx={{ flex: .5, pl: .5, fontWeight: 700 }}>:</Box>
                    <Box sx={{ flex: .5, fontWeight: 600, color: '#05445E' }}>{minutes}</Box>
                    <Box sx={{ flex: 1, }}>mm</Box>
                    <Box sx={{ flex: .5, pl: .5, fontWeight: 700 }}>:</Box>
                    <Box sx={{ flex: .5, fontWeight: 600, color: '#B32800' }}>{seconds}</Box>
                    <Box sx={{ flex: 1, }}>ss</Box>
                </Box> :
                <Box>
                    {
                        duetimeCalc > 0 ?
                            <Box sx={{ display: 'flex' }}>
                                <Box sx={{ pb: .5 }} >
                                    <FmdBadIcon sx={{ color: '#BA0F30', fontWeight: 800, fontSize: 18, pb: .5 }} />
                                </Box>
                                <Box sx={{ fontWeight: 600, color: '#BA0F30' }}>{days}</Box>&nbsp;
                                <Box sx={{ flex: 1, color: '#BA0F30' }}>Days</Box>
                                <Box sx={{ flex: .5, pl: .5, fontWeight: 700 }}>:</Box>
                                <Box sx={{ fontWeight: 600, color: '#BA0F30' }}>{hours}</Box>&nbsp;
                                <Box sx={{ flex: 1, color: '#BA0F30' }}>hh</Box>
                                <Box sx={{ flex: .5, fontWeight: 700, pl: .5 }}>:</Box>
                                <Box sx={{ fontWeight: 600, color: '#BA0F30' }}>{minutes}</Box>&nbsp;
                                <Box sx={{ flex: 1, color: '#BA0F30' }}>mm</Box>
                                <Box sx={{ flex: .5, pl: .5, fontWeight: 700 }}>:</Box>
                                <Box sx={{ fontWeight: 600, color: '#BA0F30' }}>{seconds}</Box>&nbsp;
                                <Box sx={{ flex: 1, color: '#BA0F30' }}>ss</Box>
                            </Box> :
                            <Box sx={{ display: 'flex' }}>
                                <Box sx={{ fontWeight: 600, color: '#05445E' }}>{days}</Box>&nbsp;
                                <Box sx={{ flex: 1, }}>Days</Box>
                                <Box sx={{ flex: .5, pl: .5, fontWeight: 700 }}>:</Box>
                                <Box sx={{ fontWeight: 600, color: '#05445E' }}>{hours}</Box>&nbsp;
                                <Box sx={{ flex: 1, }}>hh</Box>
                                <Box sx={{ flex: .5, fontWeight: 700, pl: .5 }}>:</Box>
                                <Box sx={{ fontWeight: 600, color: '#05445E' }}>{minutes}</Box>&nbsp;
                                <Box sx={{ flex: 1, }}>mm</Box>
                                <Box sx={{ flex: .5, pl: .5, fontWeight: 700 }}>:</Box>
                                <Box sx={{ fontWeight: 600, color: '#05445E' }}>{seconds}</Box>&nbsp;
                                <Box sx={{ flex: 1, }}>ss</Box>
                            </Box>
                    }
                </Box>
            }
        </Box>



    )
}

export default CountDowncomponent