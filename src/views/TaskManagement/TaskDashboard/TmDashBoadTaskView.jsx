import React, { memo, Suspense, useState, useCallback } from 'react'
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import LockIcon from '@mui/icons-material/Lock';
import TabPanel from '@mui/joy/TabPanel';
import { Box, CssVarsProvider, LinearProgress, Button, Typography } from '@mui/joy';
import Avatar from '@mui/joy/Avatar';
import AddIcon from '@mui/icons-material/Add';
import CreateTask from '../CreateTask/CreateTask';
import TaskMastTable from '../CreateTask/TaskMastTable';
import OverDueTable from './OverDueTable';
import CompletedTask from './CompletedTask';

const TmDashBoadTaskView = ({ tableCount, setTableCount }) => {
    const [addModalOpen, setaddModalOpen] = useState(false)
    const [AddModalFlag, setAddModalFlag] = useState(0)
    // const [tableCount, setTableCount] = useState(0)
    // const [upComingCount, setUpcomingCount] = useState(0)
    const addModal = useCallback(() => {
        setAddModalFlag(1)
        setaddModalOpen(true)
    }, [])
    return (
        <Box>

            <CssVarsProvider>
                {AddModalFlag === 1 ? <CreateTask open={addModalOpen}
                    tableCount={tableCount} setTableCount={setTableCount}
                    setAddModalFlag={setAddModalFlag} setaddModalOpen={setaddModalOpen}
                />
                    : null}
                <Tabs
                    aria-label="Basic tabs"
                    defaultValue={0}
                    size="sm"
                    sx={{
                        display: 'flex',

                        mt: .5,
                        // bgcolor: 'pink',
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
                            sx={{ display: 'flex' }}
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
                                    <Box sx={{ fontWeight: 700, fontSize: 18, fontSmooth: 'always', pr: 0.5 }} >Department Tasks</Box>
                                    <LockIcon />
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex'
                                    }}
                                >
                                    <Tab disableIndicator >Upcoming</Tab>
                                    <Tab disableIndicator >Over due</Tab>
                                    <Tab disableIndicator >Completed</Tab>
                                    {/* <Tab disableIndicator >All Task</Tab> */}
                                </Box>
                            </Box>
                        </Box>
                    </TabList>
                    <TabPanel value={0} sx={{
                        flex: 1,
                        flexGrow: 1,
                    }} >
                        <Box sx={{ display: 'flex' }}>
                            <Box >
                                <Button onClick={addModal} variant="plain" startDecorator={<AddIcon />} size="sm" >Create task</Button>
                            </Box>
                            <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'flex-end', mr: 1 }}>

                                <Box sx={{ borderRadius: 2, width: 40, mb: .5, mt: 1, bgcolor: '#EBEFEE', border: 1, borderColor: '#7CB7AF' }}></Box>
                                <Box sx={{ pl: .3, }}>
                                    <Typography sx={{ pl: .5, fontWeight: 500, color: '#003B73', pt: .5 }}>subtask</Typography>
                                </Box>
                            </Box>
                        </Box>

                        <Suspense fallback={<LinearProgress size="sm" variant="plain" />} >
                            <TaskMastTable
                                tableCount={tableCount} setTableCount={setTableCount}
                            // upComingCount={upComingCount} setUpcomingCount={setUpcomingCount}
                            // taskTableCount={taskTableCount} settaskTableCount={settaskTableCount}
                            />
                        </Suspense>
                    </TabPanel>
                    <TabPanel value={1}>
                        <Suspense fallback={<LinearProgress size="sm" variant="plain" />} >
                            <OverDueTable
                                tableCount={tableCount}
                            // taskTableCount={taskTableCount} settaskTableCount={settaskTableCount}
                            />
                        </Suspense>
                    </TabPanel>
                    <TabPanel value={2}>
                        <Suspense fallback={<LinearProgress size="sm" variant="plain" />} >
                            <CompletedTask
                                tableCount={tableCount}

                            />
                        </Suspense>
                    </TabPanel>
                    {/* <TabPanel value={2}>
                        <Suspense fallback={<LinearProgress size="sm" variant="plain" />} >
                            <OverDueTable
                                tableCount={tableCount}
                            // taskTableCount={taskTableCount} settaskTableCount={settaskTableCount}
                            />
                        </Suspense>
                    </TabPanel> */}

                </Tabs>
            </CssVarsProvider>
        </Box >
    )
}

export default memo(TmDashBoadTaskView)