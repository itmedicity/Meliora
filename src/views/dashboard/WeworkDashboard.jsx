import { Box } from '@mui/joy'
import { Paper } from '@mui/material'
import React from 'react'
import { CssVarsProvider } from '@mui/joy';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import { useHistory } from 'react-router-dom';

const WeworkDashboard = ({ widgetName, count, status, slno, indx }) => {
    const history = useHistory();
    const TotalAdmission = () => {
        history.push('/Home/totaladmission')
    }

    const DAMA = () => {
        history.push('/Home/damaList')
    }
    const BHRCpat = () => {
        history.push('/Home/BhrcList')
    }
    const RoundsafterNoon = () => {
        history.push('/Home/roundsAfternoon')
    }
    const DischargeAfterNoon = () => {
        history.push('/Home/disafternoonList')
    }
    const Noshift = () => {
        history.push('/Home/noshift')
    }
    const Antibiotic = () => {
        history.push('/Home/highbioticReport')
    }
    const DashBoardClick = () => {
        return slno === 74 && TotalAdmission ||
            slno === 75 && DAMA ||
            slno === 76 && BHRCpat ||
            slno === 78 && RoundsafterNoon ||
            slno === 79 && DischargeAfterNoon ||
            slno === 77 && Noshift ||
            slno === 81 && Antibiotic
    }
    return (
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Paper elevation={3} sx={{
                width: "100%",
                p: 0.5,
                display: "flex",
                direction: "row",
            }} >
                <Box sx={{
                    display: "flex",
                    borderRadius: 10,
                    boxShadow: 8
                }} >
                    <CssVarsProvider>
                        <IconButton
                            variant="outlined"
                            size='lg'
                            color="primary"
                            onClick={DashBoardClick(slno)}
                        >
                            {count}
                            {/* {status === true ? <CircularProgress sx={{ color: 'pink' }} /> : count} */}
                        </IconButton>
                    </CssVarsProvider>
                </Box>
                <Box sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-around"
                }}>
                    <Box sx={{ px: 0.5 }} >
                        <CssVarsProvider>
                            <Typography
                                level="body2"
                                sx={{ alignItems: 'flex-start', wordBreak: "break-all" }}
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