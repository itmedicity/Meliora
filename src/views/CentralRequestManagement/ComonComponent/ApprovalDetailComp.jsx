import { Box, Paper, Stepper, Step } from '@mui/material'
import React, { memo } from 'react'
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import { CssVarsProvider, Typography } from '@mui/joy'


const ApprovalDetailComp = ({ val }) => {

    const { incharge_req, incharge, hod_req, hod, dms_req,
        dms, ms_approve_req, ms, om, smo, gm, md, ed } = val

    return (
        <Box sx={{ pb: 2 }}>
            <Stepper size="lg" sx={{
                width: '100%',
                backgroundColor: "#e3dcc8",
                overflow: "auto", pr: 2
            }}>
                {incharge_req === 1 ?
                    <Step
                        completed
                        orientation="vertical"
                        color='blue'        >
                        <Box sx={{ display: 'flex', width: '200px', }}>
                            <Paper sx={{
                                width: '100%', mt: 0.8, mb: 0.8,
                                backgroundColor: 'rgb(187,188,188)',
                                border: 0.5, borderColor: '#D4D7D7'
                            }} variant='outlined'>
                                < Box sx={{
                                    width: "100%",
                                    display: "flex",
                                    pl: 1, pt: 0.5,
                                    flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'column', xl: 'column', },
                                }}>
                                    <CssVarsProvider>
                                        <Box sx={{ pr: 1, width: "100%", display: 'flex' }}>
                                            <Typography level="title-sm" sx={{ color: 'white' }} endDecorator={<KeyboardArrowRightOutlinedIcon sx={{ color: 'white' }} />} >Incharge</Typography>
                                            <Typography level='body-sm' textColor='#3E3F40' fontWeight={500} sx={{ textTransform: "capitalize" }} >{incharge}</Typography>
                                        </Box>
                                        {/* {
                                            incharge_approve !== null ?
                                                <Box sx={{ pr: 1, width: "100%", display: 'flex', flexDirection: "row" }}>
                                                    <CssVarsProvider>
                                                        <Box sx={{ width: "40%", }}>
                                                            <Typography level="title-sm" sx={{ color: 'white' }} endDecorator={<KeyboardArrowRightOutlinedIcon sx={{ color: 'white' }} />} >Remarks</Typography>
                                                        </Box>
                                                        <Box sx={{ width: "60%", }}>
                                                            <Paper sx={{
                                                                width: '100%', minHeight: 10, maxHeight: 70, p: 0.8,
                                                                overflow: 'auto', '::-webkit-scrollbar': { display: "none" },
                                                                backgroundColor: 'rgb(187,188,188)', border: 0.5, borderColor: '#D4D7D7'
                                                            }} variant='none'>
                                                                <Typography level='body-sm' textColor='#3E3F40' fontWeight={500} >
                                                                    {incharge_remark}
                                                                </Typography>
                                                            </Paper>
                                                        </Box>
                                                    </CssVarsProvider>
                                                </Box>
                                                : null
                                        } */}
                                    </CssVarsProvider>
                                </Box>
                            </Paper>
                        </Box>
                    </Step> : null
                }

                {hod_req === 1 ?
                    <Step
                        completed
                        orientation="vertical"
                        color='blue'        >
                        <Box sx={{ display: 'flex', width: '200px', }}>
                            <Paper sx={{
                                width: '100%', mt: 0.8, mb: 0.8,
                                backgroundColor: 'rgb(187,188,188)',
                                border: 0.5, borderColor: '#D4D7D7'
                            }} variant='outlined'>
                                < Box sx={{
                                    width: "100%",
                                    display: "flex",
                                    pl: 1, pt: 0.5,
                                    flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'column', xl: 'column', },
                                }}>
                                    <CssVarsProvider>
                                        <Box sx={{ pr: 1, width: "100%", display: 'flex' }}>
                                            <Typography level="title-sm" sx={{ color: 'white' }} endDecorator={<KeyboardArrowRightOutlinedIcon sx={{ color: 'white' }} />} >HOD</Typography>
                                            <Typography level='body-sm' textColor='#3E3F40' fontWeight={500} sx={{ textTransform: "capitalize" }} >{hod}</Typography>
                                        </Box>
                                    </CssVarsProvider>
                                </Box>
                            </Paper>
                        </Box>
                    </Step> : null
                }

                {dms_req === 1 ?
                    <Step
                        completed
                        orientation="vertical"
                        color='blue'        >
                        <Box sx={{ display: 'flex', width: '200px', }}>
                            <Paper sx={{
                                width: '100%', mt: 0.8, mb: 0.8,
                                backgroundColor: 'rgb(187,188,188)',
                                border: 0.5, borderColor: '#D4D7D7'
                            }} variant='outlined'>
                                < Box sx={{
                                    width: "100%",
                                    display: "flex",
                                    pl: 1, pt: 0.5,
                                    flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'column', xl: 'column', },
                                }}>
                                    <CssVarsProvider>
                                        <Box sx={{ pr: 1, width: "100%", display: 'flex' }}>
                                            <Typography level="title-sm" sx={{ color: 'white' }} endDecorator={<KeyboardArrowRightOutlinedIcon sx={{ color: 'white' }} />} >DMS</Typography>
                                            <Typography level='body-sm' textColor='#3E3F40' fontWeight={500} sx={{ textTransform: "capitalize" }} >{dms}</Typography>
                                        </Box>
                                    </CssVarsProvider>
                                </Box>
                            </Paper>
                        </Box>
                    </Step> : null
                }

                {ms_approve_req === 1 ?
                    <Step
                        completed
                        orientation="vertical"
                        color='blue'        >
                        <Box sx={{ display: 'flex', width: '200px', }}>
                            <Paper sx={{
                                width: '100%', mt: 0.8, mb: 0.8,
                                backgroundColor: 'rgb(187,188,188)',
                                border: 0.5, borderColor: '#D4D7D7'
                            }} variant='outlined'>
                                < Box sx={{
                                    width: "100%",
                                    display: "flex",
                                    pl: 1, pt: 0.5,
                                    flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'column', xl: 'column', },
                                }}>
                                    <CssVarsProvider>
                                        <Box sx={{ pr: 1, width: "100%", display: 'flex' }}>
                                            <Typography level="title-sm" sx={{ color: 'white' }} endDecorator={<KeyboardArrowRightOutlinedIcon sx={{ color: 'white' }} />} >MS</Typography>
                                            <Typography level='body-sm' textColor='#3E3F40' fontWeight={500} sx={{ textTransform: "capitalize" }} >{ms}</Typography>
                                        </Box>
                                    </CssVarsProvider>
                                </Box>
                            </Paper>
                        </Box>
                    </Step> : null
                }
                <Step
                    completed
                    orientation="vertical"
                    color='blue'        >
                    <Box sx={{ display: 'flex', width: '200px', }}>
                        <Paper sx={{
                            width: '100%', mt: 0.8, mb: 0.8,
                            backgroundColor: 'rgb(187,188,188)',
                            border: 0.5, borderColor: '#D4D7D7'
                        }} variant='outlined'>
                            < Box sx={{
                                width: "100%",
                                display: "flex",
                                pl: 1, pt: 0.5,
                                flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'column', xl: 'column', },
                            }}>
                                <CssVarsProvider>
                                    <Box sx={{ pr: 1, width: "100%", display: 'flex' }}>
                                        <Typography level="title-sm" sx={{ color: 'white' }} endDecorator={<KeyboardArrowRightOutlinedIcon sx={{ color: 'white' }} />} >MO</Typography>
                                        <Typography level='body-sm' textColor='#3E3F40' fontWeight={500} sx={{ textTransform: "capitalize" }} >{om}</Typography>
                                    </Box>
                                </CssVarsProvider>
                            </Box>
                        </Paper>
                    </Box>
                </Step>

                <Step
                    completed
                    orientation="vertical"
                    color='blue'        >
                    <Box sx={{ display: 'flex', width: '200px', }}>
                        <Paper sx={{
                            width: '100%', mt: 0.8, mb: 0.8,
                            backgroundColor: 'rgb(187,188,188)',
                            border: 0.5, borderColor: '#D4D7D7'
                        }} variant='outlined'>
                            < Box sx={{
                                width: "100%",
                                display: "flex",
                                pl: 1, pt: 0.5,
                                flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'column', xl: 'column', },
                            }}>
                                <CssVarsProvider>
                                    <Box sx={{ pr: 1, width: "100%", display: 'flex' }}>
                                        <Typography level="title-sm" sx={{ color: 'white' }} endDecorator={<KeyboardArrowRightOutlinedIcon sx={{ color: 'white' }} />} >SMO</Typography>
                                        <Typography level='body-sm' textColor='#3E3F40' fontWeight={500} sx={{ textTransform: "capitalize" }} >{smo}</Typography>
                                    </Box>

                                </CssVarsProvider>
                            </Box>
                        </Paper>
                    </Box>
                </Step>


                <Step
                    completed
                    orientation="vertical"
                    color='blue'        >
                    <Box sx={{ display: 'flex', width: '200px', }}>
                        <Paper sx={{
                            width: '100%', mt: 0.8, mb: 0.8,
                            backgroundColor: 'rgb(187,188,188)',
                            border: 0.5, borderColor: '#D4D7D7'
                        }} variant='outlined'>
                            < Box sx={{
                                width: "100%",
                                display: "flex",
                                pl: 1, pt: 0.5,
                                flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'column', xl: 'column', },
                            }}>
                                <CssVarsProvider>
                                    <Box sx={{ pr: 1, width: "100%", display: 'flex' }}>
                                        <Typography level="title-sm" sx={{ color: 'white' }} endDecorator={<KeyboardArrowRightOutlinedIcon sx={{ color: 'white' }} />} >GM</Typography>
                                        <Typography level='body-sm' textColor='#3E3F40' fontWeight={500} sx={{ textTransform: "capitalize" }} >{gm}</Typography>
                                    </Box>
                                </CssVarsProvider>
                            </Box>
                        </Paper>
                    </Box>
                </Step>


                <Step
                    completed
                    orientation="vertical"
                    color='blue'        >
                    <Box sx={{ display: 'flex', width: '200px', }}>
                        <Paper sx={{
                            width: '100%', mt: 0.8, mb: 0.8,
                            backgroundColor: 'rgb(187,188,188)',
                            border: 0.5, borderColor: '#D4D7D7'
                        }} variant='outlined'>
                            < Box sx={{
                                width: "100%",
                                display: "flex",
                                pl: 1, pt: 0.5,
                                flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'column', xl: 'column', },
                            }}>
                                <CssVarsProvider>
                                    <Box sx={{ pr: 1, width: "100%", display: 'flex' }}>
                                        <Typography level="title-sm" sx={{ color: 'white' }} endDecorator={<KeyboardArrowRightOutlinedIcon sx={{ color: 'white' }} />} >MD</Typography>
                                        <Typography level='body-sm' textColor='#3E3F40' fontWeight={500} sx={{ textTransform: "capitalize" }} >{md}</Typography>
                                    </Box>
                                </CssVarsProvider>
                            </Box>
                        </Paper>
                    </Box>
                </Step>

                <Step
                    completed
                    orientation="vertical"
                    color='blue'        >
                    <Box sx={{ display: 'flex', width: '200px', }}>
                        <Paper sx={{
                            width: '100%', mt: 0.8, mb: 0.8,
                            backgroundColor: 'rgb(187,188,188)',
                            border: 0.5, borderColor: '#D4D7D7'
                        }} variant='outlined'>
                            < Box sx={{
                                width: "100%",
                                display: "flex",
                                pl: 1, pt: 0.5,
                                flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'column', xl: 'column', },
                            }}>
                                <CssVarsProvider>
                                    <Box sx={{ pr: 1, width: "100%", display: 'flex' }}>
                                        <Typography level="title-sm" sx={{ color: 'white' }} endDecorator={<KeyboardArrowRightOutlinedIcon sx={{ color: 'white' }} />} >ED</Typography>
                                        <Typography level='body-sm' textColor='#3E3F40' fontWeight={500} sx={{ textTransform: "capitalize" }} >{ed}</Typography>
                                    </Box>
                                </CssVarsProvider>
                            </Box>
                        </Paper>
                    </Box>
                </Step>
            </Stepper>
        </Box >

    )
}

export default memo(ApprovalDetailComp)