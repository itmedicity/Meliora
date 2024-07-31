import { Avatar, Box, CssVarsProvider, ListItemDecorator, Tab, tabClasses, TabList, TabPanel, Tabs, Typography } from '@mui/joy'
import React, { Fragment, memo } from 'react'
import NursingStationsFeedback from './Components/NursingStationsFeedback'
import nursimage from '../../assets/images/nursingstation.png'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import { Paper } from '@mui/material';

const Feedback = () => {
    return (
        <Fragment>
            <Paper variant="outlined" sx={{ bgcolor: '#F8F8F8' }}>
                <Box sx={{}}>
                    <Typography sx={{ fontSize: 20, pl: 1, color: '#9e9e9e', fontFamily: 'Monospace', }}>Feedback</Typography>
                    {/* <CssVarsProvider>
                    <Tabs
                        variant="outlined"
                        aria-label="Pricing plan"
                        defaultValue={0}
                        sx={{
                            borderRadius: 'lg',
                            boxShadow: 'sm',
                            bgcolor: 'lightsteelblue',
                            overflow: 'auto',
                            height: '85vh'
                        }}>
                        <TabList
                            disableUnderline
                            tabFlex={0.15}
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-start',
                                [`& .${tabClasses.root}`]: {
                                    fontSize: 'sm',
                                    fontWeight: 'lg',
                                    textAlign: 'left',
                                    flexWrap: 'wrap',
                                    [`&[aria-selected="true"]`]: {
                                        color: 'primary.500',
                                        bgcolor: 'background.surface',
                                    },
                                    [`&.${tabClasses.focusVisible}`]: {
                                        outlineOffset: '-4px',
                                    },
                                },
                            }}
                        >
                            <Tab disableIndicator variant="soft" sx={{ flexGrow: 1, overflow: 'auto' }}>
                                <Box sx={{ height: 20, width: 20 }}>
                                    <CssVarsProvider>
                                        <Avatar size="sm" variant="plain" sx={{ bgcolor: 'white', width: 25, height: 25 }}>
                                            <img src={nursimage} alt="nurse" style={{ width: "100%", height: "100%" }} />
                                        </Avatar>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ pl: 1, pt: 1 }}>
                                    <Typography > Nursing Stations</Typography>
                                </Box>
                            </Tab>
                            <Tab disableIndicator variant="soft" sx={{ flexGrow: 1, overflow: 'auto', }}>
                                Dash Board
                            </Tab>
                        </TabList>
                        <TabPanel value={0} sx={{ height: '85vh', }}>
                            <Box >
                                <NursingStationsFeedback />
                            </Box>
                        </TabPanel>
                        <TabPanel value={1}>
                            <Box>

                            </Box>
                        </TabPanel>
                    </Tabs>
                </CssVarsProvider> */}
                    <CssVarsProvider>
                        <Tabs
                            aria-label="Bottom Navigation"
                            sx={(theme) => ({
                                mx: 'auto',
                                boxShadow: theme.shadow.sm,
                                [`& .${tabClasses.root}`]: {
                                    py: 1,
                                    flex: 1,
                                    transition: '0.3s',
                                    fontWeight: 'md',
                                    fontSize: 'md',
                                    [`&:not(.${tabClasses.selected})
                            :not(:hover)
                            `]: {
                                        opacity: 1,
                                    },
                                },
                            })}
                        >
                            <TabList
                                variant="outlined"
                                size="sm"
                                disableUnderline
                                sx={{ p: 0, flex: 1 }}
                            >
                                <Tab
                                    disableIndicator
                                    orientation="vertical"
                                    sx={{
                                        flexGrow: 1,
                                        pt: .5,
                                    }}
                                >
                                    <ListItemDecorator>
                                        <Avatar size="sm" variant="plain" sx={{ bgcolor: 'white', width: 25, height: 25 }}>
                                            <img src={nursimage} alt="nurse" style={{ width: "100%", height: "100%", color: 'grey' }} />
                                        </Avatar>
                                    </ListItemDecorator>
                                    Nursing Stations
                                </Tab>
                                <Tab
                                    disableIndicator
                                    orientation="vertical"
                                    sx={{
                                        flexGrow: 1,
                                        pt: .5,
                                    }}>
                                    <ListItemDecorator>
                                        <Avatar size="sm" variant="plain" sx={{ bgcolor: 'white', width: 25, height: 25 }}>
                                            <DashboardOutlinedIcon style={{ width: "100%", height: "100%" }} />
                                        </Avatar>
                                    </ListItemDecorator>
                                    DashBoard
                                </Tab>
                            </TabList>
                            <TabPanel value={0} sx={{ p: 0 }}>
                                <NursingStationsFeedback />
                            </TabPanel>
                            <TabPanel value={1} sx={{ p: 0 }}>
                            </TabPanel>
                        </Tabs>
                    </CssVarsProvider>
                </Box>
            </Paper >
        </Fragment >
    )
}

export default memo(Feedback)