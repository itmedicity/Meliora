import { CssVarsProvider } from '@mui/joy'
import { Box, Paper, CircularProgress } from '@mui/material'
import Typography from '@mui/joy/Typography';
import React from 'react'
import IconButton from '@mui/joy/IconButton';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const WeworkDashboard = ({ widgetName, count, status, slno, indx }) => {
    const history = useHistory();
    const TotalAdmission = () => {
        history.push('/Home/totaladmission')
    }

    // const DAMA = () => {
    //     history.push('/Home')
    // }
    const DashBoardClick = () => {
        return slno === 74 && TotalAdmission
        // return slno === 75 && DAMA
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
                            // onClick={DashboardClick(slno)}
                            onClick={DashBoardClick(slno)}
                        >
                            {status === true ? <CircularProgress sx={{ color: 'pink' }} /> : count}
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