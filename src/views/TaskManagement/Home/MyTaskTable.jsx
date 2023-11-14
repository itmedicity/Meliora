import { CssVarsProvider, LinearProgress } from '@mui/joy'
import Box from '@mui/joy/Box'
import React, { memo, lazy, Suspense } from 'react'
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import { taskColor } from '../Styles/taskColor';
import Avatar from '@mui/joy/Avatar';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import LockIcon from '@mui/icons-material/Lock';

// lazy components
const TaskUpcomingCmp = lazy(() => import('../Components/TaskUpcomingCmp'))

const MyTaskTable = () => {

    return (
        <Box
            sx={{
                display: 'flex',
                flexGrow: 1,
                flexDirection: 'column',
                marginTop: 3,
                padding: 0.8,
                // backgroundColor: 'green',
                border: 1,
                borderColor: taskColor.indigoDark,
                borderRadius: 2,
                height: '100%'
            }}
        >
            <CssVarsProvider>
                <Tabs
                    aria-label="Basic tabs"
                    defaultValue={0}
                    size="sm"
                    sx={{
                        display: 'flex',
                        flexGrow: 1,
                        flexDirection: 'column',
                        bgcolor: 'transparent'
                    }}
                >
                    <TabList
                        disableUnderline
                        sx={{
                            p: 0.5,
                            gap: 0.5,
                            borderRadius: 'xl',
                            bgcolor: 'background.level1',
                            [`& .${tabClasses.root}[aria-selected="true"]`]: {
                                boxShadow: 'sm',
                                bgcolor: 'background.surface',
                            },
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                // backgroundColor: 'green'
                            }}
                        >
                            <Box sx={{
                                display: 'flex',
                                width: 75,
                                justifyContent: 'center',
                                alignItems: 'center',
                                paddingY: 1
                            }} >
                                <Avatar
                                    color="neutral"
                                    size="lg"
                                    variant="outlined"
                                >
                                    <AccountTreeIcon sx={{ fontSize: 23 }} />
                                </Avatar>
                            </Box>
                            <Box>
                                <Box sx={{ display: 'flex', alignItems: 'center' }} >
                                    <Box sx={{ fontWeight: 700, fontSize: 18, fontSmooth: 'always', pr: 0.5 }} >My Tasks</Box>
                                    <LockIcon />
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex'
                                    }}
                                >
                                    <Tab disableIndicator >Upcoming</Tab>
                                    <Tab disableIndicator >Over due (2)</Tab>
                                    <Tab disableIndicator >Completed</Tab>
                                </Box>
                            </Box>
                        </Box>
                    </TabList>
                    <TabPanel value={0} sx={{
                        flex: 1,
                        flexGrow: 1,
                    }} >
                        <Suspense fallback={<LinearProgress size="sm" variant="plain" />} >
                            <TaskUpcomingCmp />
                        </Suspense>
                    </TabPanel>
                    <TabPanel value={1}>
                        <Suspense fallback={<LinearProgress size="sm" variant="plain" />} >
                            <TaskUpcomingCmp />
                        </Suspense>
                    </TabPanel>
                    <TabPanel value={2}>
                        <Suspense fallback={<LinearProgress size="sm" variant="plain" />} >
                            <TaskUpcomingCmp />
                        </Suspense>
                    </TabPanel>
                </Tabs>
            </CssVarsProvider>
        </Box >
    )
}

export default memo(MyTaskTable) 