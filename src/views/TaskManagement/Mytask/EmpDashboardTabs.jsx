import { Box, CssVarsProvider, LinearProgress } from '@mui/joy'
import React, { memo, Suspense, useState } from 'react'
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import Avatar from '@mui/joy/Avatar';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import LockIcon from '@mui/icons-material/Lock';
import EmpAllTask from './EmpAllTask';
import EmpCompletedTaskList from './EmpCompletedTaskList';
import EmpOverDueTaskList from './EmpOverDueTaskList';
import CircleIcon from '@mui/icons-material/Circle';
import MyProgressView from './MyProgressView';
const EmpDashboardTabs = ({ tableCount, setTableCount, }) => {
    const [projectcount, setprojectcount] = useState(0)
    const [taskcount, settaskcount] = useState(0)
    return (
        <Box>
            <CssVarsProvider>
                <Tabs
                    aria-label="Basic tabs"
                    defaultValue={0}
                    size="sm"
                    sx={{
                        display: 'flex',
                    }}
                >
                    <TabList
                        disableUnderline
                        sx={{
                            gap: 0.5,
                            p: 1,
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
                                flex: 1,
                            }}>
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
                                        <Box sx={{ fontWeight: 700, fontSize: 18, fontSmooth: 'always', pr: 0.5 }} >My Task</Box>
                                        <LockIcon />
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flex: 5,
                                            pt: .5
                                        }}
                                    >
                                        <Tab disableIndicator sx={{ borderRadius: 15 }}>All Task</Tab>
                                        <Tab disableIndicator sx={{ borderRadius: 15 }}>OverDue</Tab>
                                        <Tab disableIndicator sx={{ borderRadius: 15 }}>Completed</Tab>
                                        <Tab disableIndicator sx={{ borderRadius: 15 }}>My Progress</Tab>
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{ flex: 1, mt: 4, display: 'flex', justifyContent: 'flex-end', pt: .5 }}><CircleIcon sx={{ color: '#D8CEE6', width: 25, height: 25 }} />subtask&nbsp;&nbsp;</Box>
                        </Box>
                    </TabList>
                    <TabPanel value={0} sx={{
                        border: 1,
                        borderRadius: 6,
                        borderColor: 'background.level1',
                        flex: 1,
                        flexGrow: 1,
                        overflow: 'auto',
                        p: 0,

                    }} >
                        <Suspense fallback={<LinearProgress variant="plain" />} >
                            <EmpAllTask tableCount={tableCount} setTableCount={setTableCount}
                                taskcount={taskcount} settaskcount={settaskcount}
                                projectcount={projectcount} setprojectcount={setprojectcount} />
                        </Suspense>
                    </TabPanel>
                    <TabPanel value={1}
                        sx={{ p: 0 }}>
                        <Suspense fallback={<LinearProgress size="sm" variant="plain" />} >
                            <EmpOverDueTaskList tableCount={tableCount} setTableCount={setTableCount}
                                taskcount={taskcount} settaskcount={settaskcount}
                                projectcount={projectcount} setprojectcount={setprojectcount} />
                        </Suspense>
                    </TabPanel>
                    <TabPanel value={2} sx={{ p: 0 }}>
                        <Suspense fallback={<LinearProgress size="sm" variant="plain" />} >
                            <EmpCompletedTaskList tableCount={tableCount} setTableCount={setTableCount}
                                taskcount={taskcount} settaskcount={settaskcount}
                                projectcount={projectcount} setprojectcount={setprojectcount} />
                        </Suspense>
                    </TabPanel>
                    <TabPanel value={3} sx={{ p: 0 }}>
                        <Suspense fallback={<LinearProgress size="sm" variant="plain" />} >
                            <MyProgressView tableCount={tableCount} setTableCount={setTableCount} />
                        </Suspense>
                    </TabPanel>
                </Tabs>
            </CssVarsProvider>
        </Box>
    )
}

export default memo(EmpDashboardTabs)