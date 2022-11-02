import { Box } from '@mui/joy'
import { Paper, CircularProgress } from '@mui/material'
import React, { memo } from 'react'
import { CssVarsProvider } from '@mui/joy';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import { useHistory } from 'react-router-dom';

const ComplaintDashboard = ({ widgetName, count, status, slno, indx }) => {
    const history = useHistory();
    const TotalComplaints = () => {
        history.push('/Home/AssignComplaint')
    }
    const PendingComplaints = () => {
        history.push('/Home/AssignComplaint')
    }
    const AssignedComplaints = () => {
        history.push('/Home/AssignComplaint')
    }
    const RectifiedComplaints = () => {
        history.push('/Home/RectifyComplaint')
    }
    const DashboardClick = (slno) => {
        return slno === 67 && TotalComplaints ||
            slno === 68 && PendingComplaints ||
            slno === 69 && AssignedComplaints ||
            slno === 70 && RectifiedComplaints
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
                            onClick={DashboardClick(slno)}
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
export default memo(ComplaintDashboard)