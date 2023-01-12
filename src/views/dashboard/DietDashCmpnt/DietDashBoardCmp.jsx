import { Box } from '@mui/joy'
import { Paper } from '@mui/material'
import React, { memo } from 'react'
import { CssVarsProvider } from '@mui/joy';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import { useHistory } from 'react-router-dom';

const DietDashBoardCmp = ({ widgetName, count, slno }) => {

    const history = useHistory();

    const TotalInpatient = () => {
        history.push('/Home/DashBoard/InPatientList')
    }

    const DietPlanned = () => {
        history.push('/Home/DietPlannedList')
    }
    const DietPending = () => {
        history.push('/Home/DietPlanPending')
    }

    const DashBoardClick = () => {
        return slno === 90 && TotalInpatient ||
            slno === 91 && DietPlanned ||
            slno === 92 && DietPending


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

export default memo(DietDashBoardCmp)