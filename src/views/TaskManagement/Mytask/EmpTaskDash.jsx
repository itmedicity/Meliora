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
import LockResetIcon from '@mui/icons-material/LockReset';
import RunningWithErrorsIcon from '@mui/icons-material/RunningWithErrors';
import EmpTaskView from './EmpTaskView';
import { axioslogin } from 'src/views/Axios/Axios';
import { useSelector } from 'react-redux';
import _ from 'underscore';
import { infoNotify } from 'src/views/Common/CommonCode';
import DataUsageIcon from '@mui/icons-material/DataUsage';
import EmpDashboardTabs from './EmpDashboardTabs';
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

    const ViewEmpCompletedTask = useCallback((e) => {
        if (employeeeCompleted.length === 0) {
            infoNotify('No Data')
        } else {
            setemployeeTaskFlag(1)
            setflag(1)
            setempTaskHeading('Completed')
            // setTableDataEmployee(employeeeCompleted)
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
            setempTaskHeading('Incompleted')
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
            // setTableDataEmployee(employeeOnProgress)
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
            // setTableDataEmployee(employeeOverDue)
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
            // setTableDataEmployee(employeeOnHold)
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
            // setTableDataEmployee(employeeOnPending)
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
        flag === 1 ? <EmpTaskView
            setflag={setflag} empTaskHeading={empTaskHeading}
            tableDataEmployee={employeeTaskFlag === 1 ? employeeeCompleted : employeeTaskFlag === 2 ? employeeInComplete : employeeTaskFlag === 3 ? employeeOnProgress :
                employeeTaskFlag === 4 ? employeeOverDue : employeeTaskFlag === 5 ? employeeOnHold : employeeTaskFlag === 6 ? employeeOnPending : []}
            tableCount={tableCount} setTableCount={setTableCount}
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
                            <Box sx={{ flex: 1, height: 5 }}></Box>
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
                                        <Box sx={{ mt: .5, fontWeight: 500, color: '#341948' }}>Over Due&nbsp;</Box>
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
                                <ListDivider sx={{ bgcolor: '#d1c4e9' }} inset="gutter" />
                                <Box sx={{ flex: 1, mx: 1, }}>
                                    <Box sx={{ flex: 1, height: 15 }}></Box>
                                    <Box sx={{ flex: 1, textAlign: 'center', fontSize: 15, display: 'flex' }}>
                                        <Box sx={{ mt: .3 }}> <RotateRightIcon sx={{ color: '#341948', width: 20, height: 20, }} /></Box>
                                        <Box sx={{ mt: .5, fontWeight: 500, color: '#341948' }}>On Progress&nbsp;</Box>
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
                                <ListDivider sx={{ bgcolor: '#d1c4e9' }} inset="gutter" />
                                <Box sx={{ flex: 1, mx: 1, }}>
                                    <Box sx={{ flex: 1, height: 15 }}></Box>
                                    <Box sx={{ flex: 1, textAlign: 'center', fontSize: 15, display: 'flex' }}>
                                        <Box sx={{ mt: .3 }}> <LockResetIcon sx={{ color: '#341948', width: 20, height: 20, }} /></Box>
                                        <Box sx={{ mt: .5, fontWeight: 500, color: '#341948' }}>On Hold&nbsp;</Box>
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
                                <ListDivider sx={{ bgcolor: '#d1c4e9' }} inset="gutter" />
                                <Box sx={{ flex: 1, mx: 1, }}>
                                    <Box sx={{ flex: 1, height: 15 }}></Box>
                                    <Box sx={{ flex: 1, textAlign: 'center', fontSize: 15, display: 'flex' }}>
                                        <Box sx={{ mt: .3 }}> <RunningWithErrorsIcon sx={{ color: '#341948', width: 20, height: 20, }} /></Box>
                                        <Box sx={{ mt: .5, fontWeight: 500, color: '#341948' }}>Pending&nbsp;</Box>
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
                                <ListDivider sx={{ bgcolor: '#d1c4e9' }} inset="gutter" />
                                <Box sx={{ flex: 1, mx: 1, }}>
                                    <Box sx={{ flex: 1, height: 15 }}></Box>
                                    <Box sx={{ flex: 1, textAlign: 'center', fontSize: 15, display: 'flex' }}>
                                        <Box sx={{ mt: .3 }}> <DataUsageIcon sx={{ color: '#341948', width: 20, height: 20, }} /></Box>
                                        <Box sx={{ mt: .5, fontWeight: 500, color: '#341948' }}>InCompleted&nbsp;</Box>
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
                                <ListDivider sx={{ bgcolor: '#d1c4e9' }} inset="gutter" />
                                <Box sx={{ flex: 1, mx: 1, }}>
                                    <Box sx={{ flex: 1, height: 15 }}></Box>
                                    <Box sx={{ flex: 1, textAlign: 'center', fontSize: 15, display: 'flex' }}>
                                        <Box sx={{ mt: .3 }}> <CheckCircleOutlinedIcon sx={{ color: '#341948', width: 20, height: 20, }} /></Box>
                                        <Box sx={{ mt: .5, fontWeight: 500, color: '#341948' }}>Completed&nbsp;</Box>
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
                            <Box sx={{ flex: 1, height: 5 }}></Box>
                        </CssVarsProvider>
                    </Box >
                </Box>
                <Box sx={{ mx: .5, border: 1, borderRadius: 2, borderColor: '#D396FF', p: .5, }}>
                    <EmpDashboardTabs tableCount={tableCount} setTableCount={setTableCount} />
                </Box>
                <Box sx={{ height: 10 }}></Box>
            </Paper >
    )
}

export default memo(EmpTaskDash)