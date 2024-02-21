import { Box, CssVarsProvider, LinearProgress } from '@mui/joy'
import React, { memo, Suspense } from 'react'
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import Avatar from '@mui/joy/Avatar';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import LockIcon from '@mui/icons-material/Lock';
import TmEmployeeTaskData from './TmEmployeeTaskData';
import TmProjectTaskData from '../DashProjectTaskList/TmProjectTaskData';
const DashboardTabs = () => {
    return (
        <Box>
            <CssVarsProvider>
                <Tabs
                    aria-label="Basic tabs"
                    defaultValue={0}
                    size="sm"
                    sx={{
                        display: 'flex',
                        mt: .5,
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
                            sx={{ display: 'flex', }}
                        >
                            <Box sx={{
                                display: 'flex',
                                width: 75,
                                justifyContent: 'center',
                                alignItems: 'center',
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
                                    <Box sx={{ fontWeight: 700, fontSize: 18, fontSmooth: 'always', pr: 0.5 }} >Projects</Box>
                                    <LockIcon />
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex'
                                    }}
                                >
                                    <Tab disableIndicator >Employees</Tab>
                                    <Tab disableIndicator >Projects</Tab>
                                </Box>
                            </Box>
                        </Box>
                    </TabList>
                    <TabPanel value={0} sx={{
                        border: 1,
                        borderRadius: 6,
                        borderColor: 'background.level1',
                        flex: 1,
                        flexGrow: 1,
                        mt: .5,
                        overflow: 'auto',
                    }} >
                        <Suspense fallback={<LinearProgress variant="plain" />} >
                            <TmEmployeeTaskData />
                        </Suspense>
                    </TabPanel>
                    <TabPanel value={1}>
                        <Suspense fallback={<LinearProgress size="sm" variant="plain" />} >
                            <TmProjectTaskData />
                        </Suspense>
                    </TabPanel>
                </Tabs>
            </CssVarsProvider>
        </Box>
    )
}

export default memo(DashboardTabs)