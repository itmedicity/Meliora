import { Box, Button, CssVarsProvider, LinearProgress, Tooltip } from '@mui/joy'
import React, { memo, Suspense, useState, useCallback } from 'react'
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import Avatar from '@mui/joy/Avatar';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import LockIcon from '@mui/icons-material/Lock';
import { Paper } from '@mui/material';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import CusIconButton from 'src/views/Components/CusIconButton';
import CloseIcon from '@mui/icons-material/Close';
import AllTaskView from './AllTaskView';
import AddIcon from '@mui/icons-material/Add';
import CreateTaskInAllDepartment from './CreateTaskInAllDepartment';

const AllDepartmentMain = () => {
    const [taskTableCount, setTaskTableCount] = useState(0)
    const history = useHistory();
    const backToDash = useCallback(() => {
        history.push(`/Home/TaskManagementDashboard`)
    }, [history])
    const [addModalOpen, setaddModalOpen] = useState(false)
    const [AddModalFlag, setAddModalFlag] = useState(0)
    const addModal = useCallback(() => {
        setAddModalFlag(1)
        setaddModalOpen(true)
    }, [])



    return (
        <Box>
            {AddModalFlag === 1 ? <CreateTaskInAllDepartment open={addModalOpen}
                taskTableCount={taskTableCount} setTaskTableCount={setTaskTableCount}
                setAddModalFlag={setAddModalFlag} setaddModalOpen={setaddModalOpen}

            />
                : null}
            <Paper >
                <Box sx={{ height: 35, borderBottom: 1, borderColor: 'lightgrey', display: 'flex', pb: .5 }}>

                    <Box sx={{ flex: 1, pt: .8, pl: .5, color: '#C7C8CB' }}>
                        All Department Task
                    </Box>
                    <Box sx={{ flex: 1, display: 'flex', justifyContent: "flex-end", }}>
                        <CusIconButton size="sm" variant="outlined" color="primary"  >
                            <CssVarsProvider>
                                <Tooltip title="Close" placement="bottom">
                                    < CloseIcon sx={{ cursor: 'pointer', size: 'sm', width: 30, height: 20, color: '#004F76', }}
                                        onClick={backToDash}
                                    />
                                </Tooltip>
                            </CssVarsProvider>
                        </CusIconButton>
                    </Box>
                </Box>
                <Box sx={{ mt: .5, border: .1, borderRadius: 1, borderColor: '#D396FF', p: .5 }}>
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
                                <Box sx={{ display: 'flex', }}>
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
                                            <Box sx={{ fontWeight: 700, fontSize: 18, fontSmooth: 'always', pr: 0.5 }} >All Department Task</Box>
                                            <LockIcon />
                                        </Box>
                                        <Box sx={{ display: 'flex' }}>
                                            <Tab disableIndicator >All Task</Tab>
                                        </Box>
                                    </Box>
                                </Box>
                            </TabList>
                            <Box sx={{ pl: 1, my: 1, display: 'flex' }}>
                                <Button
                                    onClick={addModal}
                                    variant="plain" startDecorator={<AddIcon />} size="md" sx={{ width: 150, justifyContent: 'left' }}>Create task</Button>

                            </Box>
                            <TabPanel value={0} sx={{
                                border: 2,
                                borderRadius: 10,
                                borderColor: 'background.level1',
                                flex: 1,
                                bgcolor: '#F8FAFD'
                            }} >
                                <Suspense fallback={<LinearProgress variant="plain" />} >
                                    <AllTaskView
                                        taskTableCount={taskTableCount} setTaskTableCount={setTaskTableCount}
                                    />
                                </Suspense>
                            </TabPanel>
                            <TabPanel value={1}>
                                <Suspense fallback={<LinearProgress size="sm" variant="plain" />} >
                                </Suspense>
                            </TabPanel>
                        </Tabs>
                    </CssVarsProvider>
                </Box>
            </Paper>
        </Box>
    )
}

export default memo(AllDepartmentMain)