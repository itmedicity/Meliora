import React, { memo, useCallback, useEffect, useState } from 'react'
import List from '@mui/joy/List';
import ListDivider from '@mui/joy/ListDivider';
import { Box, CssVarsProvider, } from '@mui/joy'
import Avatar from '@mui/joy/Avatar';
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import { Paper } from '@mui/material';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import EmpAllTask from './EmpAllTask';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import LockResetIcon from '@mui/icons-material/LockReset';
import RunningWithErrorsIcon from '@mui/icons-material/RunningWithErrors';
import EmpTaskView from './EmpTaskView';
import CircleIcon from '@mui/icons-material/Circle';
import { axioslogin } from 'src/views/Axios/Axios';
import { useSelector } from 'react-redux';
import _ from 'underscore';
import { infoNotify } from 'src/views/Common/CommonCode';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import DataUsageIcon from '@mui/icons-material/DataUsage';
const EmpTaskDash = () => {

    const [employeeTaskFlag, setemployeeTaskFlag] = useState(0)
    const [empTaskHeading, setempTaskHeading] = useState('')
    const [tableDataEmployee, setTableDataEmployee] = useState([])
    const [tableCount, setTableCount] = useState(0)
    const [employeeOverDue, setemployeeOverDue] = useState([])
    const [employeeeCompleted, setemployeeeCompleted] = useState([])
    const [employeeOnProgress, setemployeeOnProgress] = useState([])
    const [employeeInComplete, setemployeeInComplete] = useState([])
    const [employeeOnHold, setemployeeOnHold] = useState([])
    const [employeeOnPending, setemployeeOnPending] = useState([])

    const id = useSelector((state) => state.LoginUserData.empid, _.isEqual)

    const ViewEmpCompletedTask = useCallback((e) => {
        if (employeeeCompleted.length === 0) {
            infoNotify('No Data')
        } else {
            setemployeeTaskFlag(1)
            setempTaskHeading('Completed')
            setTableDataEmployee(employeeeCompleted)
        }
    }, [
        employeeeCompleted
    ])
    const ViewEmpInCompletedTask = useCallback((e) => {
        if (employeeInComplete.length === 0) {
            infoNotify('No Data')
        } else {

            setemployeeTaskFlag(1)
            setempTaskHeading('Incompleted')
            setTableDataEmployee(employeeInComplete)
        }
    }, [
        employeeInComplete
    ])
    const ViewEmpOnProgressTask = useCallback((e) => {

        if (employeeOnProgress.length === 0) {
            infoNotify('No Data')
        } else {

            setemployeeTaskFlag(1)
            setempTaskHeading('On Progress')
            setTableDataEmployee(employeeOnProgress)
        }
    }, [
        employeeOnProgress
    ])
    const ViewEmpOverDueTask = useCallback((e) => {
        if (employeeOverDue.length === 0) {
            infoNotify('No Data')
        } else {

            setemployeeTaskFlag(1)
            setempTaskHeading('Over Dues')
            setTableDataEmployee(employeeOverDue)
        }
    }, [
        employeeOverDue
    ])
    const ViewOnHoldTask = useCallback((e) => {
        if (employeeOnHold.length === 0) {
            infoNotify('No Data')
        } else {

            setemployeeTaskFlag(1)
            setempTaskHeading('On Hold')
            setTableDataEmployee(employeeOnHold)
        }
    }, [
        employeeOnHold
    ])
    const ViewOnPendingTask = useCallback((e) => {
        if (employeeOnPending.length === 0) {
            infoNotify('No Data')
        } else {

            setemployeeTaskFlag(1)
            setempTaskHeading('On Pending')
            setTableDataEmployee(employeeOnPending)
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
                // settaskTableCount(taskTableCount + 1)
            } else {
                setemployeeOverDue([])
            }
        }
        const getEmpCompletedTable = async () => {
            const result = await axioslogin.get(`TmTableView/employeeCompleted/${id}`)
            const { data, success } = result.data
            if (success === 2) {
                setemployeeeCompleted(data)
                // settaskTableCount(taskTableCount + 1)
            } else {
                setemployeeeCompleted([])
            }
        }
        const getEmpOnProgressTable = async () => {
            const result = await axioslogin.get(`TmTableView/employeeOnProgress/${id}`)
            const { data, success } = result.data
            if (success === 2) {
                setemployeeOnProgress(data)
                // settaskTableCount(taskTableCount + 1)
            } else {
                setemployeeOnProgress([])
            }
        }
        const getEmpInCompleteTable = async () => {
            const result = await axioslogin.get(`TmTableView/employeeInCompleted/${id}`)
            const { data, success } = result.data
            if (success === 2) {
                setemployeeInComplete(data)
                // settaskTableCount(taskTableCount + 1)
            } else {
                setemployeeInComplete([])
            }
        }
        const getEmpOnHoldTable = async () => {
            const result = await axioslogin.get(`TmTableView/employeeOnHold/${id}`)
            const { data, success } = result.data
            if (success === 2) {
                setemployeeOnHold(data)
                // settaskTableCount(taskTableCount + 1)
            } else {
                setemployeeOnHold([])
            }
        }

        const getOnPendingEmpTable = async () => {
            const result = await axioslogin.get(`TmTableView/employeeOnPending/${id}`)
            const { data, success } = result.data
            if (success === 2) {
                setemployeeOnPending(data)
                // settaskTableCount(taskTableCount + 1)
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
        employeeTaskFlag === 1 ? <EmpTaskView
            setemployeeTaskFlag={setemployeeTaskFlag} empTaskHeading={empTaskHeading}
            tableDataEmployee={tableDataEmployee} tableCount={tableCount} setTableCount={setTableCount}
        /> :
            <Paper >
                <Box sx={{ display: 'flex', borderBottom: .1, borderColor: '#C5C5C5' }}>
                    <Box sx={{ m: 1 }}><DashboardOutlinedIcon fontSize='medium' sx={{ color: '#262065' }} /></Box>
                    <Box sx={{ m: 1, color: '#262065' }}>My DashBoard</Box>
                </Box>
                <Box sx={{ display: 'flex', overflow: 'auto', flex: 1, }}>
                    <Box sx={{
                        flex: 1,
                        m: .5,
                        borderRadius: 2,
                        bgcolor: '#f4e8ff',
                        border: 1, borderColor: '#D396FF',
                    }}>
                        <CssVarsProvider>
                            <Box sx={{ flex: 1, height: 10 }}></Box>
                            <List
                                orientation="horizontal"
                                variant="plain"
                                sx={{
                                    // '--ListItemDecorator-size': '48px',
                                    // '--ListItem-paddingY': '1rem',
                                    borderRadius: 'sm',
                                }}
                            >
                                <Box sx={{ mx: 1, flex: 1 }}>
                                    <Box sx={{ flex: 1, height: 20 }}></Box>
                                    <Box sx={{ flex: 1, textAlign: 'center' }}>
                                        <RestartAltOutlinedIcon sx={{ color: '#341948', width: 23, height: 23, }} />Over Due
                                    </Box>
                                    <Box sx={{ flex: 1, height: 20 }}></Box>
                                    <Box sx={{ display: 'flex', height: 80, cursor: 'pointer', }}>
                                        <Box sx={{ flex: 1 }}></Box>
                                        <Box>
                                            <Avatar
                                                color="neutral"
                                                size="sm"
                                                variant="outlined"
                                                sx={{ bgcolor: 'white', width: 50, height: 50, }}
                                                onClick={(e) => {
                                                    ViewEmpOverDueTask(e)
                                                }}
                                            >
                                                <Box sx={{ fontSize: 30, color: '#341948', }}>
                                                    {employeeOverDue.length}
                                                </Box>
                                            </Avatar>
                                        </Box>
                                        <Box sx={{ flex: 1 }}></Box>
                                    </Box>
                                </Box>
                                <ListDivider sx={{ bgcolor: '#d1c4e9' }} inset="gutter" />
                                <Box sx={{ flex: 1, mx: 1, }}>
                                    <Box sx={{ flex: 1, height: 20 }}></Box>
                                    <Box sx={{ flex: 1, textAlign: 'center' }}>
                                        <RotateRightIcon sx={{ color: '#341948', width: 23, height: 23, }} />On Progress
                                    </Box>
                                    <Box sx={{ flex: 1, height: 20 }}></Box>
                                    <Box sx={{ display: 'flex', height: 80, cursor: 'pointer', }}>
                                        <Box sx={{ flex: 1 }}></Box>
                                        <Box>
                                            <Avatar
                                                color="neutral"
                                                size="sm"
                                                variant="outlined"
                                                sx={{ bgcolor: 'white', width: 50, height: 50, }}
                                                onClick={(e) => {
                                                    ViewEmpOnProgressTask(e)
                                                }}
                                            >
                                                <Box sx={{ fontSize: 30, color: '#341948', }}>
                                                    {employeeOnProgress.length}
                                                </Box>
                                            </Avatar>
                                        </Box>
                                        <Box sx={{ flex: 1 }}></Box>
                                    </Box>
                                </Box>
                                <ListDivider sx={{ bgcolor: '#d1c4e9' }} inset="gutter" />
                                <Box sx={{ flex: 1, mx: 1, }}>
                                    <Box sx={{ flex: 1, height: 20 }}></Box>
                                    <Box sx={{ flex: 1, textAlign: 'center' }}>
                                        <LockResetIcon sx={{ color: '#341948', width: 23, height: 23, }} />On Hold
                                    </Box>
                                    <Box sx={{ flex: 1, height: 20 }}></Box>
                                    <Box sx={{ display: 'flex', height: 80, cursor: 'pointer', }}>
                                        <Box sx={{ flex: 1 }}></Box>
                                        <Box>
                                            <Avatar
                                                color="neutral"
                                                size="sm"
                                                variant="outlined"
                                                sx={{ bgcolor: 'white', width: 50, height: 50, }}
                                                onClick={(e) => {
                                                    ViewOnHoldTask(e)
                                                }}
                                            >
                                                <Box sx={{ fontSize: 30, color: '#341948', }}>
                                                    {employeeOnHold.length}
                                                </Box>
                                            </Avatar>
                                        </Box>
                                        <Box sx={{ flex: 1 }}></Box>
                                    </Box>
                                </Box>
                                <ListDivider sx={{ bgcolor: '#d1c4e9' }} inset="gutter" />
                                <Box sx={{ flex: 1, mx: 1, }}>
                                    <Box sx={{ flex: 1, height: 20 }}></Box>
                                    <Box sx={{ flex: 1, textAlign: 'center' }}>
                                        <RunningWithErrorsIcon sx={{ color: '#341948', width: 23, height: 23, }} />Pending
                                    </Box>
                                    <Box sx={{ flex: 1, height: 20 }}></Box>
                                    <Box sx={{ display: 'flex', height: 80, cursor: 'pointer', }}>
                                        <Box sx={{ flex: 1 }}></Box>
                                        <Box>
                                            <Avatar
                                                color="neutral"
                                                size="sm"
                                                variant="outlined"
                                                sx={{ bgcolor: 'white', width: 50, height: 50, }}
                                                onClick={(e) => {
                                                    ViewOnPendingTask(e)

                                                }}
                                            >
                                                <Box sx={{ fontSize: 30, color: '#341948', }}>
                                                    {employeeOnPending.length}
                                                </Box>
                                            </Avatar>
                                        </Box>
                                        <Box sx={{ flex: 1 }}></Box>
                                    </Box>
                                </Box>
                                <ListDivider sx={{ bgcolor: '#d1c4e9' }} inset="gutter" />
                                <Box sx={{ flex: 1, mx: 1, }}>
                                    <Box sx={{ flex: 1, height: 20 }}></Box>
                                    <Box sx={{ flex: 1, textAlign: 'center' }}>
                                        <DataUsageIcon sx={{ color: '#341948', width: 23, height: 23, }} />In Completed
                                    </Box>
                                    <Box sx={{ flex: 1, height: 20 }}></Box>
                                    <Box sx={{ display: 'flex', height: 80, cursor: 'pointer', }}>
                                        <Box sx={{ flex: 1 }}></Box>
                                        <Box>
                                            <Avatar
                                                color="neutral"
                                                size="sm"
                                                variant="outlined"
                                                sx={{ bgcolor: 'white', width: 50, height: 50, }}
                                                onClick={(e) => {
                                                    ViewEmpInCompletedTask(e)
                                                }}
                                            >
                                                <Box sx={{ fontSize: 30, color: '#341948', }}>
                                                    {employeeInComplete.length}
                                                </Box>
                                            </Avatar>
                                        </Box>
                                        <Box sx={{ flex: 1 }}></Box>
                                    </Box>
                                </Box>
                                <ListDivider sx={{ bgcolor: '#d1c4e9' }} inset="gutter" />
                                <Box sx={{ flex: 1, mx: 1, }}>
                                    <Box sx={{ flex: 1, height: 20 }}></Box>
                                    <Box sx={{ flex: 1, textAlign: 'center' }}>
                                        <CheckCircleOutlinedIcon sx={{ color: '#341948', width: 23, height: 23, }} />Completed
                                    </Box>
                                    <Box sx={{ flex: 1, height: 20 }}></Box>
                                    <Box sx={{ display: 'flex', height: 80, cursor: 'pointer', }}>
                                        <Box sx={{ flex: 1 }}></Box>
                                        <Box>
                                            <Avatar
                                                color="neutral"
                                                size="sm"
                                                variant="outlined"
                                                sx={{ bgcolor: 'white', width: 50, height: 50, }}
                                                onClick={(e) => {
                                                    ViewEmpCompletedTask(e)
                                                }}
                                            >
                                                <Box sx={{ fontSize: 30, color: '#341948', }}>
                                                    {employeeeCompleted.length}
                                                </Box>
                                            </Avatar>
                                        </Box>
                                        <Box sx={{ flex: 1 }}></Box>
                                    </Box>
                                </Box>
                            </List>
                            <Box sx={{ flex: 1, height: 10 }}></Box>
                        </CssVarsProvider>
                    </Box >
                </Box>
                <Box sx={{ mx: .5, border: 1, borderRadius: 2, borderColor: '#D396FF', p: .5, }}>
                    <Box sx={{ border: 1, borderRadius: 4, p: .5, borderColor: '#D9E4EC', bgcolor: '#EAEFF4', display: 'flex' }}>
                        <CssVarsProvider>
                            <Avatar
                                color="neutral"
                                size="lg"
                                variant="outlined"
                            >
                                <AccountTreeIcon sx={{ fontSize: 23 }} />
                            </Avatar>
                        </CssVarsProvider>
                        <Box>
                        </Box>
                        <Box sx={{ pt: 1.5, pl: .5, fontWeight: 600, flex: 1, }}>
                            MY TASK
                        </Box>
                        <Box sx={{ display: 'flex', flex: 2, mt: .5, pt: 2, justifyContent: 'flex-end', color: '#274472' }}>
                            {/* <RadioButtonCheckedIcon sx={{ color: '#BA0F30' }} />OverDue&nbsp;&nbsp;&nbsp;&nbsp; */}
                            <RadioButtonCheckedIcon sx={{ color: '#D37506' }} />On Progress&nbsp;&nbsp;&nbsp;&nbsp;
                            <RadioButtonCheckedIcon sx={{ color: '#747474' }} />On Hold&nbsp;&nbsp;&nbsp;&nbsp;
                            <RadioButtonCheckedIcon sx={{ color: '#5885AF' }} />On Pending&nbsp;&nbsp;&nbsp;&nbsp;
                            <RadioButtonCheckedIcon sx={{ color: '#311E26' }} />In Completed&nbsp;&nbsp;&nbsp;&nbsp;
                            <RadioButtonCheckedIcon sx={{ color: '#59981A' }} />Completed&nbsp;&nbsp;
                            <CircleIcon sx={{ color: '#D8CEE6' }} />subtask&nbsp;&nbsp;
                        </Box>
                    </Box>
                    <EmpAllTask tableCount={tableCount} setTableCount={setTableCount} />
                </Box>
                <Box sx={{ height: 10 }}></Box>
            </Paper >
    )
}

export default memo(EmpTaskDash)