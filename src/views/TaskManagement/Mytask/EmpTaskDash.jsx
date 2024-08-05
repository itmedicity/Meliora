import React, { memo, useCallback, useEffect, useState } from 'react'
import List from '@mui/joy/List';
import ListDivider from '@mui/joy/ListDivider';
import { Box, CssVarsProvider, Typography, } from '@mui/joy'
import Avatar from '@mui/joy/Avatar';
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import { Paper } from '@mui/material';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import LockResetIcon from '@mui/icons-material/LockReset';
import RunningWithErrorsIcon from '@mui/icons-material/RunningWithErrors';
import EmpTaskView from './EmpTaskView';
import { axioslogin } from 'src/views/Axios/Axios';
import { useSelector } from 'react-redux';
import _ from 'underscore';
import { infoNotify } from 'src/views/Common/CommonCode';
import DataUsageIcon from '@mui/icons-material/DataUsage';
import ListAltIcon from '@mui/icons-material/ListAlt';
import HistorySharpIcon from '@mui/icons-material/HistorySharp';
import TaskAltSharpIcon from '@mui/icons-material/TaskAltSharp';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import EmpAllTask from './EmpAllTask';
import EmpOverDueTaskList from './EmpOverDueTaskList';
import EmpCompletedTaskList from './EmpCompletedTaskList';
import MyProgressView from './MyProgressView';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import MyPerformance from './MyPerformance';
import AutoGraphSharpIcon from '@mui/icons-material/AutoGraphSharp';
import SignalCellularAltOutlinedIcon from '@mui/icons-material/SignalCellularAltOutlined';

const EmpTaskDash = () => {

    const [employeeTaskFlag, setemployeeTaskFlag] = useState(0)
    const [empTaskHeading, setempTaskHeading] = useState('')
    const [tableCount, setTableCount] = useState(0)
    const [employeeOverDue, setemployeeOverDue] = useState([])
    const [employeeeCompleted, setemployeeeCompleted] = useState([])
    const [employeeOnProgress, setemployeeOnProgress] = useState([])
    const [employeeInComplete, setemployeeInComplete] = useState([])
    const [employeeOnHold, setemployeeOnHold] = useState([])
    const [employeeOnPending, setemployeeOnPending] = useState([])
    const [flag, setflag] = useState(0)
    const id = useSelector((state) => state.LoginUserData.empid, _.isEqual)
    const [projectcount, setprojectcount] = useState(0)
    const [taskcount, settaskcount] = useState(0)

    const ViewEmpCompletedTask = useCallback((e) => {
        if (employeeeCompleted.length === 0) {
            infoNotify('No Data')
        } else {
            setemployeeTaskFlag(1)
            setflag(1)
            setempTaskHeading('Completed')
        }
    }, [
        employeeeCompleted
    ])
    const ViewEmpInCompletedTask = useCallback((e) => {
        if (employeeInComplete.length === 0) {
            infoNotify('No Data')
        } else {
            setflag(1)
            setemployeeTaskFlag(2)
            setempTaskHeading('Not Started')
            // setTableDataEmployee(employeeInComplete)
        }
    }, [
        employeeInComplete
    ])
    const ViewEmpOnProgressTask = useCallback((e) => {

        if (employeeOnProgress.length === 0) {
            infoNotify('No Data')
        } else {
            setflag(1)
            setemployeeTaskFlag(3)
            setempTaskHeading('On Progress')
        }
    }, [
        employeeOnProgress
    ])
    const ViewEmpOverDueTask = useCallback((e) => {
        if (employeeOverDue.length === 0) {
            infoNotify('No Data')
        } else {
            setflag(1)
            setemployeeTaskFlag(4)
            setempTaskHeading('Over Dues')
        }
    }, [
        employeeOverDue
    ])
    const ViewOnHoldTask = useCallback((e) => {
        if (employeeOnHold.length === 0) {
            infoNotify('No Data')
        } else {
            setflag(1)
            setemployeeTaskFlag(5)
            setempTaskHeading('On Hold')

        }
    }, [
        employeeOnHold
    ])
    const ViewOnPendingTask = useCallback((e) => {
        if (employeeOnPending.length === 0) {
            infoNotify('No Data')
        } else {
            setflag(1)
            setemployeeTaskFlag(6)
            setempTaskHeading('On Pending')
        }
    }, [
        employeeOnPending
    ])

    useEffect(() => {
        const getOverDueEmpTable = async () => {
            const result = await axioslogin.get(`TmTableView/employeeOverDue/${id}`)
            const { data, success } = result.data
            if (success === 2) {
                setemployeeOverDue(data)
            } else {
                setemployeeOverDue([])
            }
        }
        const getEmpCompletedTable = async () => {
            const result = await axioslogin.get(`TmTableView/employeeCompleted/${id}`)
            const { data, success } = result.data
            if (success === 2) {
                const arry = data?.map((val) => {
                    const obj = {
                        tm_task_slno: val.tm_task_slno,
                        tm_task_name: val.tm_task_name,
                        dept_name: (val.dept_name).toLowerCase(),
                        sec_name: (val.sec_name).toLowerCase(),
                        em_name: val.em_name,
                        tm_assigne_emp: val.tm_assigne_emp,
                        tm_task_dept: val.tm_task_dept,
                        tm_task_dept_sec: val.tm_task_dept_sec,
                        tm_task_due_date: val.tm_task_due_date,
                        main_task_slno: val.main_task_slno,
                        tm_task_description: val.tm_task_description,
                        tm_task_status: val.tm_task_status,
                        tm_project_slno: val.tm_project_slno,
                        tm_project_name: val.tm_project_name,
                        tm_pending_remark: val.tm_pending_remark,
                        tm_onhold_remarks: val.tm_onhold_remarks,
                        create_date: val.create_date,
                        tm_complete_date: val.tm_complete_date,
                        tm_completed_remarks: val.tm_completed_remarks,
                        TaskStatus: val.tm_task_status === 1 ? 'Completed' :
                            val.tm_task_status === 1 ? 'Completed' :
                                val.tm_task_status === 2 ? 'On Progress' :
                                    val.tm_task_status === 3 ? 'On Hold' :
                                        val.tm_task_status === 4 ? 'Pending' :
                                            val.tm_task_status === 0 ? 'Not Started' : 'Not Started',
                        datediff: new Date(val.tm_complete_date) - new Date(val.tm_task_due_date),
                        days: Math.floor((new Date(val.tm_complete_date) - new Date(val.tm_task_due_date)) / (1000 * 60 * 60 * 24)),
                        hours: Math.floor((new Date(val.tm_complete_date) - new Date(val.tm_task_due_date)) / (1000 * 60 * 60) % 24),
                        minutes: Math.floor(((new Date(val.tm_complete_date) - new Date(val.tm_task_due_date)) / 1000 / 60) % 60),
                        seconds: Math.floor(((new Date(val.tm_complete_date) - new Date(val.tm_task_due_date)) / 1000) % 60)
                    }
                    return obj
                })
                setemployeeeCompleted(arry)
            } else {
                setemployeeeCompleted([])
            }
        }
        const getEmpOnProgressTable = async () => {
            const result = await axioslogin.get(`TmTableView/employeeOnProgress/${id}`)
            const { data, success } = result.data
            if (success === 2) {
                setemployeeOnProgress(data)
            } else {
                setemployeeOnProgress([])
            }
        }
        const getEmpInCompleteTable = async () => {
            const result = await axioslogin.get(`TmTableView/employeeInCompleted/${id}`)
            const { data, success } = result.data
            if (success === 2) {
                setemployeeInComplete(data)
            } else {
                setemployeeInComplete([])
            }
        }
        const getEmpOnHoldTable = async () => {
            const result = await axioslogin.get(`TmTableView/employeeOnHold/${id}`)
            const { data, success } = result.data
            if (success === 2) {
                setemployeeOnHold(data)
            } else {
                setemployeeOnHold([])
            }
        }
        const getOnPendingEmpTable = async () => {
            const result = await axioslogin.get(`TmTableView/employeeOnPending/${id}`)
            const { data, success } = result.data
            if (success === 2) {
                setemployeeOnPending(data)
            } else {
                setemployeeOnPending([])
            }
        }
        getOverDueEmpTable()
        getEmpCompletedTable()
        getEmpOnProgressTable()
        getEmpInCompleteTable()
        getEmpOnHoldTable()
        getOnPendingEmpTable()
    }, [tableCount, id])

    return (
        flag === 1 ? <EmpTaskView
            setflag={setflag} empTaskHeading={empTaskHeading}
            tableDataEmployee={employeeTaskFlag === 1 ? employeeeCompleted : employeeTaskFlag === 2 ? employeeInComplete : employeeTaskFlag === 3 ? employeeOnProgress :
                employeeTaskFlag === 4 ? employeeOverDue : employeeTaskFlag === 5 ? employeeOnHold : employeeTaskFlag === 6 ? employeeOnPending : []}
            tableCount={tableCount} setTableCount={setTableCount}
        /> :
            <Paper sx={{ minHeight: '90vh', p: .5 }} >
                <Box sx={{ display: 'flex', borderBottom: .1, borderColor: 'lightgrey', height: 40 }}>
                    <Box sx={{ p: 1 }}><DashboardOutlinedIcon fontSize='medium' sx={{ color: '#C7C8CB' }} /></Box>
                    <Box sx={{ pt: 1.2, color: '#C7C8CB', bgcolor: 'white' }}>
                        My Task
                    </Box>
                </Box>
                <Box sx={{ bgcolor: ' #DFE3ED', height: '100%', p: .3 }}>
                    <Box sx={{ bgcolor: 'white', height: '100%', pb: .5 }}>
                        <Box sx={{ display: 'flex', overflow: 'auto', flex: 1, }}>
                            <Box sx={{
                                flex: 1,
                                m: .5,
                                borderRadius: 2,
                                bgcolor: '#E8F0F7',
                                border: 1, borderColor: '#6699CC',
                            }}>
                                <CssVarsProvider>
                                    <Box sx={{ flex: 1, height: 2 }}></Box>
                                    <List
                                        orientation="horizontal"
                                        variant="plain"
                                        sx={{
                                            borderRadius: 'sm',
                                        }}
                                    >
                                        <Box sx={{ mx: 1, flex: 1, }}>
                                            <Box sx={{ flex: 1, height: 15, }}></Box>
                                            <Box sx={{ flex: 1, textAlign: 'center', fontSize: 15, display: 'flex' }}>
                                                <Box sx={{ mt: .3 }}> <RestartAltOutlinedIcon sx={{ color: '#341948', width: 20, height: 20, }} /></Box>
                                                <Box sx={{ mt: .5, fontWeight: 500, color: '#341948', fontSize: 13, pt: .3 }}>Over Due&nbsp;</Box>
                                                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                                                    <Avatar
                                                        color="neutral"
                                                        size="sm"
                                                        variant="outlined"
                                                        sx={{
                                                            bgcolor: 'white', width: 30, height: 30, cursor: 'pointer',
                                                            '&:hover': {
                                                                borderColor: '#970C10'
                                                            },
                                                        }}
                                                        onClick={(e) => {
                                                            ViewEmpOverDueTask(e)
                                                        }}
                                                    >
                                                        <Box sx={{ fontSize: 18, color: '#341948', }}>
                                                            {employeeOverDue.length}
                                                        </Box>
                                                    </Avatar>
                                                </Box>
                                            </Box>
                                            <Box sx={{ flex: 1, height: 15, }}></Box>
                                        </Box>
                                        <ListDivider sx={{ bgcolor: '#6699CC' }} inset="gutter" />
                                        <Box sx={{ flex: 1, mx: 1, }}>
                                            <Box sx={{ flex: 1, height: 15 }}></Box>
                                            <Box sx={{ flex: 1, textAlign: 'center', fontSize: 15, display: 'flex' }}>
                                                <Box sx={{ mt: .3 }}> <RotateRightIcon sx={{ color: '#341948', width: 20, height: 20, }} /></Box>
                                                <Box sx={{ mt: .5, fontWeight: 500, color: '#341948', fontSize: 13, pt: .3 }}>On Progress&nbsp;</Box>
                                                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                                                    <Avatar
                                                        color="neutral"
                                                        size="sm"
                                                        variant="outlined"
                                                        sx={{
                                                            bgcolor: 'white', width: 30, height: 30, cursor: 'pointer',
                                                            '&:hover': {
                                                                borderColor: 'orange'
                                                            },
                                                        }}
                                                        onClick={(e) => {
                                                            ViewEmpOnProgressTask(e)
                                                        }}
                                                    >
                                                        <Box sx={{ fontSize: 18, color: '#341948', }}>
                                                            {employeeOnProgress.length}
                                                        </Box>
                                                    </Avatar>
                                                </Box>
                                            </Box>
                                        </Box>
                                        <ListDivider sx={{ bgcolor: '#6699CC' }} inset="gutter" />
                                        <Box sx={{ flex: 1, mx: 1, }}>
                                            <Box sx={{ flex: 1, height: 15 }}></Box>
                                            <Box sx={{ flex: 1, textAlign: 'center', fontSize: 15, display: 'flex' }}>
                                                <Box sx={{ mt: .3 }}> <LockResetIcon sx={{ color: '#341948', width: 20, height: 20, }} /></Box>
                                                <Box sx={{ mt: .5, fontWeight: 500, color: '#341948', fontSize: 13, pt: .3 }}>On Hold&nbsp;</Box>
                                                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                                                    <Avatar
                                                        color="neutral"
                                                        size="sm"
                                                        variant="outlined"
                                                        sx={{
                                                            bgcolor: 'white', width: 30, height: 30, cursor: 'pointer',
                                                            '&:hover': {
                                                                borderColor: 'brown'
                                                            },
                                                        }}
                                                        onClick={(e) => {
                                                            ViewOnHoldTask(e)
                                                        }}
                                                    >
                                                        <Box sx={{ fontSize: 18, color: '#341948', }}>
                                                            {employeeOnHold.length}
                                                        </Box>
                                                    </Avatar>
                                                </Box>
                                            </Box>
                                        </Box>
                                        <ListDivider sx={{ bgcolor: '#6699CC' }} inset="gutter" />
                                        <Box sx={{ flex: 1, mx: 1, }}>
                                            <Box sx={{ flex: 1, height: 15 }}></Box>
                                            <Box sx={{ flex: 1, textAlign: 'center', fontSize: 15, display: 'flex' }}>
                                                <Box sx={{ mt: .3 }}> <RunningWithErrorsIcon sx={{ color: '#341948', width: 20, height: 20, }} /></Box>
                                                <Box sx={{ mt: .5, fontWeight: 500, color: '#341948', fontSize: 13, pt: .3 }}>Pending&nbsp;</Box>
                                                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                                                    <Avatar
                                                        color="neutral"
                                                        size="sm"
                                                        variant="outlined"
                                                        sx={{
                                                            bgcolor: 'white', width: 30, height: 30, cursor: 'pointer',
                                                            '&:hover': {
                                                                borderColor: 'blue'
                                                            },
                                                        }}
                                                        onClick={(e) => {
                                                            ViewOnPendingTask(e)
                                                        }}
                                                    >
                                                        <Box sx={{ fontSize: 18, color: '#341948', }}>
                                                            {employeeOnPending.length}
                                                        </Box>
                                                    </Avatar>
                                                </Box>
                                            </Box>
                                        </Box>
                                        <ListDivider sx={{ bgcolor: '#6699CC' }} inset="gutter" />
                                        <Box sx={{ flex: 1, mx: 1, }}>
                                            <Box sx={{ flex: 1, height: 15 }}></Box>
                                            <Box sx={{ flex: 1, textAlign: 'center', fontSize: 15, display: 'flex' }}>
                                                <Box sx={{ mt: .3 }}> <DataUsageIcon sx={{ color: '#341948', width: 20, height: 20, }} /></Box>
                                                <Box sx={{ mt: .5, fontWeight: 500, color: '#341948', fontSize: 13, pt: .3 }}>Not Started&nbsp;</Box>
                                                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                                                    <Avatar
                                                        color="neutral"
                                                        size="sm"
                                                        variant="outlined"
                                                        sx={{
                                                            bgcolor: 'white', width: 30, height: 30,
                                                            '&:hover': {
                                                                borderColor: 'black'
                                                            },
                                                        }}
                                                        onClick={(e) => {
                                                            ViewEmpInCompletedTask(e)
                                                        }}
                                                    >
                                                        <Box sx={{ fontSize: 18, color: '#341948', cursor: 'pointer' }}>
                                                            {employeeInComplete.length}
                                                        </Box>
                                                    </Avatar>
                                                </Box>
                                            </Box>
                                        </Box>
                                        <ListDivider sx={{ bgcolor: '#6699CC' }} inset="gutter" />
                                        <Box sx={{ flex: 1, mx: 1, }}>
                                            <Box sx={{ flex: 1, height: 15 }}></Box>
                                            <Box sx={{ flex: 1, textAlign: 'center', fontSize: 15, display: 'flex' }}>
                                                <Box sx={{ mt: .3 }}> <CheckCircleOutlinedIcon sx={{ color: '#341948', width: 20, height: 20, }} /></Box>
                                                <Box sx={{ mt: .5, fontWeight: 500, color: '#341948', fontSize: 13, pt: .3 }}> Completed&nbsp;</Box>
                                                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                                                    <Avatar
                                                        color="neutral"
                                                        size="sm"
                                                        variant="outlined"
                                                        sx={{
                                                            bgcolor: 'white', width: 30, height: 30,
                                                            '&:hover': {
                                                                borderColor: 'green'
                                                            },
                                                        }}
                                                        onClick={(e) => {
                                                            ViewEmpCompletedTask(e)
                                                        }}
                                                    >
                                                        <Box sx={{ fontSize: 18, color: '#341948', cursor: 'pointer' }}>
                                                            {employeeeCompleted.length}
                                                        </Box>
                                                    </Avatar>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </List>
                                    <Box sx={{ flex: 1, height: 2 }}></Box>
                                </CssVarsProvider>
                            </Box >
                        </Box>
                        <Box sx={{
                            flex: 1,
                            mx: .5,
                            borderRadius: 2,
                            border: 1, borderColor: '#6699CC',
                            p: .5
                        }}>
                            <Box sx={{ display: 'flex' }}>
                                <Box sx={{ mt: 1, mx: .5 }}>
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
                                    <Typography sx={{ fontSize: 20, fontWeight: 600, color: 'grey', pt: .7 }}>Task Management</Typography>
                                    <Typography sx={{ fontSize: 11, fontWeight: 600, color: 'grey', pl: .5 }}>My Task & Progress</Typography>
                                </Box>
                            </Box>

                            <Box sx={{ mt: 1 }}>
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
                                                    <Tab disableIndicator sx={{ color: '#710117', fontWeight: 800, width: 115 }}>
                                                        <HistorySharpIcon sx={{ color: '#710117', }} />&nbsp;Over Due</Tab>
                                                    <Tab disableIndicator sx={{ color: '#478C5C', fontWeight: 800, width: 120 }}>
                                                        <TaskAltSharpIcon sx={{ color: '#478C5C' }} />&nbsp;Completed</Tab>
                                                    <Tab disableIndicator sx={{ color: '#67595E', fontWeight: 800, width: 120 }}>
                                                        <SignalCellularAltOutlinedIcon sx={{ color: '#67595E' }} />&nbsp;MyProgress</Tab>
                                                    <Tab disableIndicator sx={{ fontWeight: 800, width: 200, color: '#3374A0' }}>
                                                        <AutoGraphSharpIcon sx={{ color: '#3374A0' }} />&nbsp;Performance Sheet</Tab>

                                                </Box>
                                                <Box sx={{ flex: 4 }}>
                                                </Box>
                                            </Box>
                                        </TabList>
                                        <TabPanel value={0} sx={{ p: 0 }}>
                                            <EmpAllTask tableCount={tableCount} setTableCount={setTableCount}
                                                taskcount={taskcount} settaskcount={settaskcount}
                                                projectcount={projectcount} setprojectcount={setprojectcount} />
                                        </TabPanel>
                                        <TabPanel value={1} sx={{ p: 0 }}>
                                            <EmpOverDueTaskList tableCount={tableCount} setTableCount={setTableCount}
                                                taskcount={taskcount} settaskcount={settaskcount}
                                                projectcount={projectcount} setprojectcount={setprojectcount} />
                                        </TabPanel>
                                        <TabPanel value={2} sx={{ p: 0 }}>
                                            <EmpCompletedTaskList tableCount={tableCount} setTableCount={setTableCount}
                                                taskcount={taskcount} settaskcount={settaskcount}
                                                projectcount={projectcount} setprojectcount={setprojectcount} />
                                        </TabPanel>
                                        <TabPanel value={3} sx={{ p: 0 }}>
                                            <MyProgressView tableCount={tableCount} setTableCount={setTableCount} />
                                        </TabPanel>
                                        <TabPanel value={4} sx={{ p: 0 }}>
                                            <MyPerformance tableCount={tableCount} setTableCount={setTableCount} />
                                        </TabPanel>

                                    </Tabs>
                                </CssVarsProvider>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Paper >
    )
}

export default memo(EmpTaskDash)