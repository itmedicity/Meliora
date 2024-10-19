import React, { Fragment, memo } from 'react'
import { Box, IconButton, Tooltip, Typography } from '@mui/joy';
import { Grid, Paper } from '@mui/material';
const DashboradGridView = ({ title, clinicCount, nonClinicCount, onClinicClick, onNonClinicClick, imageView, imName, allCount, allDataClick }) => {

    const clinicButtonStyle = {
        height: 30,
        width: 30,
        ml: 1,
        borderRadius: '50%',
        boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.1)',
        p: 0.3,
        cursor: 'pointer',
        bgcolor: '#b3e5fc',
        transition: 'transform 0.2s',
        '&:hover': {
            transform: 'scale(1.05)',
            bgcolor: '#81d4fa',
        },
    };

    const nonClinicButtonStyle = {
        height: 30,
        width: 30,
        ml: 1,
        borderRadius: '50%',
        boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.1)',
        p: 0.3,
        cursor: 'pointer',
        bgcolor: '#b2ebf2',
        transition: 'transform 0.2s',
        '&:hover': {
            transform: 'scale(1.05)',
            bgcolor: '#80deea',
        },
    };

    return (
        <Fragment>
            <Grid item xs={12} sm={12} md={6} lg={4} xl={3} style={{ width: 500 }} >
                <Paper variant='outlined' square sx={{
                    bgcolor: 'white', height: 200,
                    border: '1px solid #bbdefb', borderRadius: 5
                }}>
                    <Box sx={{ marginBottom: 1, display: 'flex' }}>
                        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', pl: 1, py: 1 }}>
                            <img src={imageView} alt={imName} loading="lazy" style={{ width: "100%", height: "90%" }} />
                        </Box>
                        <Box sx={{ flex: 1, }}>
                            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', pr: 2, py: 2 }}>
                                <Typography sx={{ fontSize: 20, fontWeight: 650, color: '#003371' }}>{title}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: 0.5 }} >
                                <Tooltip title="Total Count" placement="bottom" sx={{ fontSize: 14, color: 'white', bgcolor: '#60A3D9', fontWeight: 650 }}>
                                    <Box sx={{
                                        cursor: 'pointer', borderTopLeftRadius: 15, borderBottomLeftRadius: 15,
                                        fontSize: 40, display: 'flex', justifyContent: 'center', width: 100,
                                        fontWeight: 650, color: '#3f51b5', bgcolor: '#e3f2fd',
                                        '&:hover': {
                                            bgcolor: '#e3f2fd', color: '#3f51b5'
                                        },
                                    }} onClick={allDataClick}
                                    >
                                        {allCount}
                                    </Box>
                                </Tooltip>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: 2, pr: 1 }}>
                                <Box sx={{ mr: 1 }}>
                                    <Tooltip title="Clinic Count" placement="bottom" sx={{ cursor: 'pointer', fontSize: 14, color: 'white', bgcolor: '#60A3D9', fontWeight: 650 }}>
                                        <IconButton variant="contained" sx={clinicButtonStyle} onClick={onClinicClick}>
                                            {clinicCount}
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                                <Box sx={{}}>
                                    <Tooltip title="Non-Clinic Count" placement="bottom" sx={{ cursor: 'pointer', color: 'white', bgcolor: '#60A3D9', fontWeight: 650 }}>
                                        <IconButton variant="contained" sx={nonClinicButtonStyle} onClick={onNonClinicClick}>
                                            {nonClinicCount}
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Paper>
            </Grid >
        </Fragment >
    )
}

export default memo(DashboradGridView)