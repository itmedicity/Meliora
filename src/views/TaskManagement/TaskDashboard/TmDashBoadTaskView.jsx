import React, { memo, Suspense, useState, useCallback } from 'react'
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import Avatar from '@mui/joy/Avatar';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import LockIcon from '@mui/icons-material/Lock';
import { Box, CssVarsProvider, LinearProgress, Button } from '@mui/joy';
import AddIcon from '@mui/icons-material/Add';
import CreateTask from '../CreateTask/CreateTask';
import TaskMastTable from '../CreateTask/TaskMastTable';
import OverDueTable from './OverDueTable';
import CompletedTask from './CompletedTask';
import CircleIcon from '@mui/icons-material/Circle';
import DeptEmployeeTask from './DeptEmployeeTask';
const TmDashBoadTaskView = ({ tableCount, setTableCount }) => {
    const [addModalOpen, setaddModalOpen] = useState(false)
    const [AddModalFlag, setAddModalFlag] = useState(0)
    const addModal = useCallback(() => {
        setAddModalFlag(1)
        setaddModalOpen(true)
    }, [])


    return (
        <Box sx={{ m: .5, }}>
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

                    }}
                >
                    <TabList
                        disableUnderline
                        sx={{
                            p: 0.5,
                            gap: 0.5,
                            borderRadius: 2,
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
                            <Box >
                                <Box sx={{ display: 'flex', alignItems: 'center' }} >
                                    <Box sx={{ fontWeight: 700, fontSize: 18, fontSmooth: 'always', pr: 0.5 }} >Department Tasks</Box>
                                    <LockIcon />
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',

                                    }}
                                >
                                    <Tab disableIndicator sx={{ borderRadius: 20 }}>All Task</Tab>
                                    <Tab disableIndicator sx={{ borderRadius: 20 }}>Over due</Tab>
                                    <Tab disableIndicator sx={{ borderRadius: 20 }}>Completed</Tab>
                                    <Tab disableIndicator sx={{ borderRadius: 20 }}>Employee Task</Tab>
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
                                <Button onClick={addModal} variant="plain" startDecorator={<AddIcon />} size="md" sx={{ width: 150, justifyContent: 'left' }}>Create task</Button>
                            </Box>
                            <Box sx={{ display: 'flex', flex: 2, pt: 1, justifyContent: 'flex-end', color: '#274472', fontWeight: 600, }}>
                                <CircleIcon sx={{ color: '#D8CEE6' }} />subtask&nbsp;&nbsp;
                            </Box>
                        </Box>
                        <Suspense fallback={<LinearProgress size="sm" variant="plain" />} >
                            <TaskMastTable
                                tableCount={tableCount} setTableCount={setTableCount}
                            />
                        </Suspense>
                    </TabPanel>
                    <TabPanel value={1}>
                        <Suspense fallback={<LinearProgress size="sm" variant="plain" />} >
                            <OverDueTable
                                tableCount={tableCount} setTableCount={setTableCount}
                            />
                        </Suspense>
                    </TabPanel>
                    <TabPanel value={2}>
                        <Suspense fallback={<LinearProgress size="sm" variant="plain" />} >
                            <CompletedTask
                                tableCount={tableCount} setTableCount={setTableCount}
                            />
                        </Suspense>
                    </TabPanel>
                    <TabPanel value={3}>
                        <Suspense fallback={<LinearProgress size="sm" variant="plain" />} >
                            <DeptEmployeeTask />
                        </Suspense>
                    </TabPanel>
                </Tabs>
            </CssVarsProvider>
        </Box >
    )
}

export default memo(TmDashBoadTaskView)