import React, { Fragment, memo, useCallback } from 'react';
import { Box, Divider, Grid, Tooltip, Typography } from '@mui/joy';
import { Paper } from '@mui/material';
const ImageViewComp = React.lazy(() => import("./ImageViewComp"))

const DashboradGridView = ({ val, viewPednigDetails }) => {
    const { imageView, imName, title, pending, clinic, nonClinic, id } = val;
    const getData = useCallback(() => {
        viewPednigDetails(id)
    }, [id, viewPednigDetails])
    return (
        <Fragment>
            <Grid xs={12} sm={12} md={6} lg={4} xl={3} sx={{ width: "100%" }}>
                <Paper
                    variant="outlined"
                    square sx={{
                        bgcolor: 'white', height: 180,
                        border: '1px solid #bbdefb', borderRadius: 5,
                    }}
                >
                    <Box sx={{ marginBottom: 1, display: 'flex', height: 'calc(100% - 40px)', }} >
                        <Box sx={{ flex: 0.5, display: 'flex', justifyContent: 'center', alignItems: 'center', pl: 1, py: 1, }}>
                            <ImageViewComp src={imageView} alt={imName} style={{ width: 110, height: 90 }} />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', pr: 2, py: 2, }}>
                                <Typography sx={{ fontSize: 20, fontWeight: 650, color: '#003371', }} >
                                    {title}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: 0.5, }} >
                                <Tooltip
                                    title="Total Count"
                                    placement="bottom"
                                    sx={{
                                        fontSize: 14,
                                        color: 'white',
                                        bgcolor: '#60A3D9',
                                        fontWeight: 650,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            cursor: 'pointer', borderTopLeftRadius: 15, borderBottomLeftRadius: 15,
                                            fontSize: 40, display: 'flex', justifyContent: 'center',
                                            width: 100, fontWeight: 650, color: '#3f51b5', bgcolor: '#e3f2fd',
                                            '&:hover': {
                                                bgcolor: '#e3f2fd',
                                                color: '#3f51b5',
                                            },
                                        }}
                                        onClick={getData}
                                    >
                                        {pending}
                                    </Box>
                                </Tooltip>
                            </Box>
                        </Box>
                    </Box>
                    <Divider sx={{ backgroundColor: 'rgba(0,51,122,0.6)', mx: 1, }} />
                    <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'space-evenly', m: 0.5 }}
                    >
                        {/* <Box component={Typography} endDecorator={<div>{clinic}</div>}
                            sx={{
                                fontFamily: 'Montserrat, sans-serif',
                                fontSize: '1rem',
                                fontWeight: 800,
                                color: 'rgba(0,51,122,0.6)',
                            }}
                        >
                            <Box sx={{ pr: 1 }}>
                                <img
                                    src={clinicImg}
                                    alt="climg"
                                    loading="lazy"
                                    style={{ width: 26, height: 26, }}
                                />
                            </Box>

                        </Box>
                        <Box component={Typography} endDecorator={<div>{nonClinic}</div>}
                            sx={{
                                fontFamily: 'Montserrat, sans-serif',
                                fontSize: '1rem',
                                fontWeight: 800,
                                color: 'rgba(0,51,122,0.6)',
                            }}
                        >
                            <Box sx={{ pr: 1 }}>
                                <img
                                    src={nonclinicImg}
                                    alt="nonclimg"
                                    loading="lazy"
                                    style={{ width: 26, height: 26, }}
                                />
                            </Box>

                        </Box> */}
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography
                                sx={{
                                    pr: 1,
                                    fontSize: '1rem',
                                    // fontWeight: 550,
                                    // color: 'rgba(0,51,122,0.6)',
                                    color: '#3f51b5'
                                }}
                            >
                                Clinic
                            </Typography>
                            <Typography
                                sx={{
                                    fontFamily: 'Montserrat, sans-serif',
                                    fontSize: '1rem',
                                    fontWeight: 800,
                                    color: 'rgba(0,51,122,0.6)',
                                    // color: '#3f51b5'
                                }}
                            >
                                {clinic}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography
                                sx={{
                                    pr: 1,
                                    fontSize: '1rem',
                                    // fontWeight: 550,
                                    // color: 'rgba(0,51,122,0.6)',
                                    color: '#3f51b5'
                                }}
                            >
                                NonClinic
                            </Typography>
                            <Typography
                                sx={{
                                    fontFamily: 'Montserrat, sans-serif',
                                    fontSize: '1rem',
                                    fontWeight: 800,
                                    color: 'rgba(0,51,122,0.6)',
                                    // color: '#3f51b5'
                                }}
                            >
                                {nonClinic}
                            </Typography>
                        </Box>

                    </Box>
                </Paper>
            </Grid>
        </Fragment>
    );
};

export default memo(DashboradGridView);
