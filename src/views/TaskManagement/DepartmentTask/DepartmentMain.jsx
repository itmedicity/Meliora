import { Avatar, Box, CssVarsProvider, Tab, TabList, TabPanel, Tabs, Typography, tabClasses } from '@mui/joy'
import { Paper } from '@mui/material'
import React, { memo, useCallback, useState } from 'react'
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import ListAltIcon from '@mui/icons-material/ListAlt';
import RadarIcon from '@mui/icons-material/Radar';
import AccountTreeTwoToneIcon from '@mui/icons-material/AccountTreeTwoTone';
import HistorySharpIcon from '@mui/icons-material/HistorySharp';
import TaskAltSharpIcon from '@mui/icons-material/TaskAltSharp';
import GroupSharpIcon from '@mui/icons-material/GroupSharp';
import AlllTask from './AlllTask';
import DeptOverDue from './DeptOverDue';
import DeptCompleted from './DeptCompleted';
import DeptGoals from './DeptGoals';
import CreateDeptTask from '../ModalComponent/CreateDeptTask';
import EmployeeTask from './EmployeeTask';
import DeptProjects from './DeptProjects';

const DepartmentMain = () => {

    const [tableCount, setTableCount] = useState(0)
    const [addModalOpen, setaddModalOpen] = useState(false)
    const [AddModalFlag, setAddModalFlag] = useState(0)

    const addModal = useCallback(() => {
        setAddModalFlag(1)
        setaddModalOpen(true)
    }, [])

    return (
        <Paper sx={{ pb: .3, bgcolor: '#DFE3ED' }}>
            {AddModalFlag === 1 ? <CreateDeptTask open={addModalOpen}
                tableCount={tableCount} setTableCount={setTableCount}
                setAddModalFlag={setAddModalFlag} setaddModalOpen={setaddModalOpen}
            />
                : null}

            <Box sx={{ flex: 1, height: 35, borderBottom: 1, borderColor: 'lightgrey', pt: .8, pl: .8, color: '#C7C8CB', bgcolor: 'white' }}>
                My Department Task
            </Box>
            <Box sx={{ flex: 1, border: .1, m: .1, borderColor: '#EAEAEA', borderRadius: 1, bgcolor: 'white', }}>
                <Box sx={{ mt: 1, display: 'flex' }}>
                    <Box sx={{ mt: .8, mx: .5 }}>
                        <CssVarsProvider>
                            <Avatar
                                color="neutral"
                                size="lg"
                                variant="outlined"
                            >
                                <TrackChangesIcon sx={{ height: 35, width: 35, }} />
                            </Avatar>
                        </CssVarsProvider>
                    </Box>
                    <Box>
                        <Typography sx={{ fontSize: 20, fontWeight: 600, color: 'grey', pt: .5 }}>Task Management</Typography>
                        <Typography sx={{ fontSize: 11, fontWeight: 600, color: 'grey', pl: .5 }}>Goal,Projects & Tasks</Typography>
                    </Box>
                </Box>
                <Box sx={{
                    ml: 6, mt: .2, width: 155, color: 'black', bgcolor: '#79A9F5', boxShadow: 1, borderRadius: 30, border: 1,
                    textAlign: 'center', borderColor: '#4B7BF5', cursor: 'pointer',
                    '&:hover': { bgcolor: '#4B7BF5' }
                }}
                    onClick={addModal}
                >   + Create New
                </Box>
                <Box sx={{ mt: 2 }}>
                    <CssVarsProvider>
                        <Tabs
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
                                    p: 0,
                                    [`& .${tabClasses.root}[aria-selected="true"]`]: {
                                        borderBottom: 3,
                                        bgcolor: 'white'
                                    },
                                    display: 'flex', flexDirection: 'column',
                                    bgcolor: 'white'
                                }}
                            >
                                <Box sx={{ display: 'flex', flex: 1, mb: 0, borderBottom: 1, borderColor: 'lightgray' }} >
                                    <Box sx={{ flex: 2, display: 'flex', px: .5 }}>
                                        <Tab disableIndicator sx={{ color: '#52688F', fontWeight: 800, width: 110 }}>
                                            <ListAltIcon sx={{ color: '#52688F' }} />&nbsp;All Tasks</Tab>
                                        <Tab disableIndicator sx={{ color: '#710117', fontWeight: 800, width: 120 }}>
                                            <HistorySharpIcon sx={{ color: '#710117', }} />&nbsp;Over Due</Tab>
                                        <Tab disableIndicator sx={{ color: '#478C5C', fontWeight: 800, width: 120 }}>
                                            <TaskAltSharpIcon sx={{ color: '#478C5C' }} />&nbsp;Completed</Tab>
                                        <Tab disableIndicator sx={{ color: '#175873', fontWeight: 800, width: 120 }}>
                                            <RadarIcon sx={{ color: '#175873' }} />&nbsp;Goals</Tab>
                                        <Tab disableIndicator sx={{ color: '#0AADC7', fontWeight: 800, width: 120 }}>
                                            <AccountTreeTwoToneIcon sx={{ color: '#0AADC7' }} />&nbsp;Projects</Tab>
                                        <Tab disableIndicator sx={{ color: '#56382D', fontWeight: 800, width: 160 }}>
                                            <GroupSharpIcon sx={{ color: '#56382D' }} />&nbsp;Employee Task</Tab>
                                    </Box>
                                    <Box sx={{ flex: 4 }}>
                                    </Box>
                                </Box>
                            </TabList>
                            <TabPanel value={0} sx={{ p: 0 }}>
                                <AlllTask setTableCount={setTableCount} tableCount={tableCount} />
                            </TabPanel>
                            <TabPanel value={1} sx={{ p: 0 }}>
                                <DeptOverDue setTableCount={setTableCount} tableCount={tableCount} />
                            </TabPanel>
                            <TabPanel value={2} sx={{ p: 0 }}>
                                <DeptCompleted setTableCount={setTableCount} tableCount={tableCount} />
                            </TabPanel>
                            <TabPanel value={3} sx={{ p: 0 }}>
                                <DeptGoals setTableCount={setTableCount} tableCount={tableCount} />
                            </TabPanel>
                            <TabPanel value={4} sx={{ p: 0 }}>
                                <DeptProjects setTableCount={setTableCount} tableCount={tableCount} />
                            </TabPanel>
                            <TabPanel value={5} sx={{ p: 0 }}>
                                <EmployeeTask />
                            </TabPanel>
                        </Tabs>
                    </CssVarsProvider>
                </Box>
            </Box>
        </Paper >
    )
}

export default memo(DepartmentMain)

