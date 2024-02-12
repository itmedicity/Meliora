import React, { memo, useEffect, useState, useCallback } from 'react'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListDivider from '@mui/joy/ListDivider';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import { CssVarsProvider } from '@mui/joy';
import TodayIcon from '@mui/icons-material/Today';
import Avatar from '@mui/joy/Avatar';
import DateRangeIcon from '@mui/icons-material/DateRange';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import UpdateOutlinedIcon from '@mui/icons-material/UpdateOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import EventBusyIcon from '@mui/icons-material/EventBusy';
// import TmDashBoadTaskView from './TmDashBoadTaskView';
import TmOverDueTask from './TmOverDueTask';
import TmEmployeeTaskView from './TmEmployeeTaskView';
import TmDepartmentTaskView from './TmDepartmentTaskView';
import TmProjectView from './TmProjectView';
import TmGoalsView from './TmGoalsView';
import { axioslogin } from 'src/views/Axios/Axios';
import { infoNotify } from 'src/views/Common/CommonCode';
import { useSelector } from 'react-redux';
import LockResetIcon from '@mui/icons-material/LockReset';
import RunningWithErrorsIcon from '@mui/icons-material/RunningWithErrors';
import _ from 'underscore';
import DashboardTabs from '../DashEmpTaskList/DashboardTabs';

const TmDashboardMain = () => {

    const [overDueHeading, setoverDueHeading] = useState('')
    const [overdueTaskFlag, setoverdueTaskFlag] = useState(0)
    const [tableData, setTableData] = useState([])
    const [overdues, setOverdues] = useState([])
    const [overdueToday, setOverdueToday] = useState([])
    const [overDueNextWeek, setoverDueNextWeek] = useState([])
    const [overdueMonth, setoverdueMonth] = useState([])
    const [empTaskHeading, setempTaskHeading] = useState('')
    const [employeeTaskFlag, setemployeeTaskFlag] = useState(0)
    const [tableDataEmployee, setTableDataEmployee] = useState([])
    const [employeeOverDue, setemployeeOverDue] = useState([])
    const [employeeeCompleted, setemployeeeCompleted] = useState([])
    const [employeeOnProgress, setemployeeOnProgress] = useState([])
    const [employeeInComplete, setemployeeInComplete] = useState([])
    const [employeeOnHold, setemployeeOnHold] = useState([])
    const [employeeOnPending, setemployeeOnPending] = useState([])
    const [departmentTaskFlag, setdepartmentTaskFlag] = useState(0)
    const [deptTaskHeading, setdeptTaskHeading] = useState('')
    const [deptTableData, setdeptTableData] = useState([])
    const [deptCompleted, setdeptCompleted] = useState([])
    const [deptInComplete, setdeptInComplete] = useState([])
    const [deptOnProgress, setdeptOnProgress] = useState([])
    const [deptOnHold, setdeptOnHold] = useState([])
    const [deptOnPending, setdeptOnPending] = useState([])
    const [projectHead, setprojectHead] = useState('')
    const [projectFlag, setprojectFlag] = useState(0)
    const [ProjTable, setProjTable] = useState([])
    const [projCompleted, setprojCompleted] = useState([])
    const [projInCompleted, setprojInCompleted] = useState([])
    const [projOnProgress, setprojOnProgress] = useState([])
    const [projOverDue, setprojOverDue] = useState([])
    const [goalsFlag, setgoalsFlag] = useState(0)
    const [goalsHead, setgoalsHead] = useState('')
    const [goalsTable, setgoalsTable] = useState([])
    const [goalsCompleted, setgoalsCompleted] = useState([])
    const [goalsInCompleted, setgoalsInCompleted] = useState([])
    const [goalsOverDue, setgoalsOverDue] = useState([])
    const [goalsOnProgress, setgoalsOnProgress] = useState([])
    const [tableCount, setTableCount] = useState(0)




    const id = useSelector((state) => state.LoginUserData.empid, _.isEqual)
    //redux for geting login emp secid
    const empsecid = useSelector((state) => {
        return state.LoginUserData.empsecid
    })

    const ViewOverDueTask = useCallback((e) => {
        if (overdues.length === 0) {
            infoNotify('No Dues')
        } else {
            setTableCount(tableCount + 1)
            setoverdueTaskFlag(1)
            setoverDueHeading("Over Dues")
            setdepartmentTaskFlag(0)
            setprojectFlag(0)
            setTableData(overdues)
        }
    }, [overdues, tableCount])

    const ViewOverDueTodayTask = useCallback((e) => {
        if (overdueToday.length === 0) {
            infoNotify('No Dues Today')
        } else {
            setoverdueTaskFlag(1)
            setoverDueHeading("Today's")
            setemployeeTaskFlag(0)
            setdepartmentTaskFlag(0)
            setprojectFlag(0)
            setgoalsFlag(0)
            setTableData(overdueToday)
        }
    }, [overdueToday])
    const ViewOverDueWeekTask = useCallback((e) => {
        if (overDueNextWeek.length === 0) {
            infoNotify('No Dues for Next Week')
        } else {
            setoverdueTaskFlag(1)
            setoverDueHeading("Next week's")
            setemployeeTaskFlag(0)
            setdepartmentTaskFlag(0)
            setprojectFlag(0)
            setgoalsFlag(0)
            setTableData(overDueNextWeek)
        }
    }, [overDueNextWeek])
    const ViewOverDueMonthTask = useCallback((e) => {
        if (overdueMonth.length === 0) {
            infoNotify('No Dues in Next Month')
        } else {
            setoverdueTaskFlag(1)
            setoverDueHeading("Upcoming Month's")
            setemployeeTaskFlag(0)
            setdepartmentTaskFlag(0)
            setprojectFlag(0)
            setgoalsFlag(0)
            setTableData(overdueMonth)
        }
    }, [overdueMonth])
    const ViewEmpCompletedTask = useCallback((e) => {
        if (employeeeCompleted.length === 0) {
            infoNotify('No Data')
        } else {
            setoverdueTaskFlag(0)
            setemployeeTaskFlag(1)
            setempTaskHeading('Completed')
            setdepartmentTaskFlag(0)
            setprojectFlag(0)
            setgoalsFlag(0)
            setTableDataEmployee(employeeeCompleted)
        }
    }, [employeeeCompleted])
    const ViewEmpInCompletedTask = useCallback((e) => {
        if (employeeInComplete.length === 0) {
            infoNotify('No Data')
        } else {
            setoverdueTaskFlag(0)
            setemployeeTaskFlag(1)
            setempTaskHeading('Incompleted')
            setdepartmentTaskFlag(0)
            setprojectFlag(0)
            setgoalsFlag(0)
            setTableDataEmployee(employeeInComplete)
        }
    }, [employeeInComplete])
    const ViewEmpOnProgressTask = useCallback((e) => {
        if (employeeOnProgress.length === 0) {
            infoNotify('No Data')
        } else {
            setoverdueTaskFlag(0)
            setemployeeTaskFlag(1)
            setempTaskHeading('On Progress')
            setdepartmentTaskFlag(0)
            setprojectFlag(0)
            setgoalsFlag(0)
            setTableDataEmployee(employeeOnProgress)
        }
    }, [employeeOnProgress])
    const ViewOnHoldTask = useCallback((e) => {
        if (employeeOnHold.length === 0) {
            infoNotify('No Data')
        } else {

            setemployeeTaskFlag(1)
            setempTaskHeading('On Hold')
            setdepartmentTaskFlag(0)
            setoverdueTaskFlag(0)
            setprojectFlag(0)
            setgoalsFlag(0)
            setTableDataEmployee(employeeOnHold)
        }
    }, [employeeOnHold])


    const ViewEmpPendingTask = useCallback((e) => {
        if (employeeOnPending.length === 0) {
            infoNotify('No Data')
        } else {

            setemployeeTaskFlag(1)
            setempTaskHeading('Pending')
            setdepartmentTaskFlag(0)
            setoverdueTaskFlag(0)
            setprojectFlag(0)
            setgoalsFlag(0)
            setTableDataEmployee(employeeOnPending)
        }
    }, [employeeOnPending])

    const ViewEmpOverDueTask = useCallback((e) => {
        if (employeeOverDue.length === 0) {
            infoNotify('No Data')
        } else {
            setoverdueTaskFlag(0)
            setemployeeTaskFlag(1)
            setempTaskHeading('Over Dues')
            setdepartmentTaskFlag(0)
            setprojectFlag(0)
            setgoalsFlag(0)
            setTableDataEmployee(employeeOverDue)
        }
    }, [employeeOverDue])
    const ViewDeptOnProgressTask = useCallback((e) => {
        if (deptOnProgress.length === 0) {
            infoNotify('No Data')
        } else {
            setdepartmentTaskFlag(1)
            setdeptTaskHeading('On Progress')
            setoverdueTaskFlag(0)
            setemployeeTaskFlag(0)
            setprojectFlag(0)
            setgoalsFlag(0)
            setdeptTableData(deptOnProgress)
        }
    }, [deptOnProgress])

    const ViewDeptOnHold = useCallback((e) => {
        if (deptOnHold.length === 0) {
            infoNotify('No Data')
        } else {
            setdepartmentTaskFlag(1)
            setdeptTaskHeading('On Progress')
            setoverdueTaskFlag(0)
            setemployeeTaskFlag(0)
            setprojectFlag(0)
            setgoalsFlag(0)
            setdeptTableData(deptOnHold)
        }
    }, [deptOnHold])
    const ViewDeptPending = useCallback((e) => {
        if (deptOnPending.length === 0) {
            infoNotify('No Data')
        } else {
            setdepartmentTaskFlag(1)
            setdeptTaskHeading('On Progress')
            setoverdueTaskFlag(0)
            setemployeeTaskFlag(0)
            setprojectFlag(0)
            setgoalsFlag(0)
            setdeptTableData(deptOnPending)
        }
    }, [deptOnPending])
    const ViewDeptCompltTask = useCallback((e) => {
        if (deptCompleted.length === 0) {
            infoNotify('No Data')
        } else {
            setdepartmentTaskFlag(1)
            setdeptTaskHeading('Completed')
            setoverdueTaskFlag(0)
            setemployeeTaskFlag(0)
            setprojectFlag(0)
            setgoalsFlag(0)
            setdeptTableData(deptCompleted)
        }
    }, [deptCompleted])
    const ViewDeptInCompltTask = useCallback((e) => {
        if (deptInComplete.length === 0) {
            infoNotify('No Data')
        } else {
            setdepartmentTaskFlag(1)
            setdeptTaskHeading('InComplete')
            setoverdueTaskFlag(0)
            setemployeeTaskFlag(0)
            setprojectFlag(0)
            setgoalsFlag(0)
            setdeptTableData(deptInComplete)
        }
    }, [deptInComplete])

    const ViewProjectOnProgess = useCallback((e) => {
        if (projOnProgress.length === 0) {
            infoNotify('No Data')
        } else {
            setdepartmentTaskFlag(0)
            setoverdueTaskFlag(0)
            setemployeeTaskFlag(0)
            setprojectFlag(1)
            setprojectHead('On Progress')
            setgoalsFlag(0)
            setProjTable(projOnProgress)
        }
    }, [projOnProgress])
    const ViewProjectComplete = useCallback((e) => {
        if (projCompleted.length === 0) {
            infoNotify('No Data')
        } else {
            setdepartmentTaskFlag(0)
            setoverdueTaskFlag(0)
            setemployeeTaskFlag(0)
            setprojectFlag(1)
            setprojectHead('Completed')
            setgoalsFlag(0)
            setProjTable(projCompleted)
        }
    }, [projCompleted])
    const ViewProjectInComplete = useCallback((e) => {
        if (projInCompleted.length === 0) {
            infoNotify('No Data')
        } else {
            setdepartmentTaskFlag(0)
            setoverdueTaskFlag(0)
            setemployeeTaskFlag(0)
            setprojectFlag(1)
            setprojectHead('Completed')
            setgoalsFlag(0)
            setProjTable(projInCompleted)
        }
    }, [projInCompleted])
    const ViewProjectOverDue = useCallback((e) => {
        if (projOverDue.length === 0) {
            infoNotify('No Data')
        } else {
            setdepartmentTaskFlag(0)
            setoverdueTaskFlag(0)
            setemployeeTaskFlag(0)
            setprojectFlag(1)
            setprojectHead('Over Dues')
            setgoalsFlag(0)
            setProjTable(projOverDue)
        }
    }, [projOverDue])
    const ViewGoalsOnProgress = useCallback((e) => {
        if (goalsOnProgress.length === 0) {
            infoNotify('No Data')
        } else {
            setdepartmentTaskFlag(0)
            setoverdueTaskFlag(0)
            setemployeeTaskFlag(0)
            setprojectFlag(0)
            setgoalsFlag(1)
            setgoalsHead('On Progress')
            setgoalsTable(goalsOnProgress)
        }
    }, [goalsOnProgress])
    const ViewGoalsComplete = useCallback((e) => {
        if (goalsCompleted.length === 0) {
            infoNotify('No Data')
        } else {
            setdepartmentTaskFlag(0)
            setoverdueTaskFlag(0)
            setemployeeTaskFlag(0)
            setprojectFlag(0)
            setgoalsFlag(1)
            setgoalsHead('Completed')
            setgoalsTable(goalsCompleted)
        }
    }, [goalsCompleted])
    const ViewGoalsInComplete = useCallback((e) => {
        if (goalsInCompleted.length === 0) {
            infoNotify('No Data')
        } else {
            setdepartmentTaskFlag(0)
            setoverdueTaskFlag(0)
            setemployeeTaskFlag(0)
            setprojectFlag(0)
            setgoalsFlag(1)
            setgoalsHead('Completed')
            setgoalsTable(goalsInCompleted)
        }
    }, [goalsInCompleted])
    const ViewGoalsOverdue = useCallback((e) => {
        if (goalsOverDue.length === 0) {
            infoNotify('No Data')
        } else {
            setdepartmentTaskFlag(0)
            setoverdueTaskFlag(0)
            setemployeeTaskFlag(0)
            setprojectFlag(0)
            setgoalsFlag(1)
            setgoalsHead('Over Dues')
            setgoalsTable(goalsOverDue)
        }
    }, [goalsOverDue])




    useEffect(() => {
        const getOverDueTable = async () => {
            const result = await axioslogin.get(`/TmTableView/departmentOverDue/${empsecid}`)
            const { success, data } = result.data
            if (success === 2) {
                setOverdues(data)
                // setTableCount(tableCount + 1)
            } else {
                setOverdues([])
            }
        }
        const getTodayTable = async () => {
            const result = await axioslogin.get(`/TmTableView/ViewOverDueToday/${empsecid}`)
            const { success, data } = result.data
            if (success === 2) {
                setOverdueToday(data)
                // settaskTableCount(taskTableCount + 1)
            } else {
                setOverdueToday([])
            }
        }
        const getNextWeekTable = async () => {
            const result = await axioslogin.get(`/TmTableView/ViewOverDueNextWeek/${empsecid}`)

            const { data, success } = result.data
            if (success === 2) {
                setoverDueNextWeek(data)
                // settaskTableCount(taskTableCount + 1)
            } else {
                setoverDueNextWeek([])
            }
        }
        const getNextMonthTable = async () => {
            const result = await axioslogin.get(`/TmTableView/ViewOverDueNextMonth/${empsecid}`)
            const { data, success } = result.data
            if (success === 2) {
                setoverdueMonth(data)
                // settaskTableCount(taskTableCount + 1)
            } else {
                setoverdueMonth([])
            }
        }
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
        const getEmpPendingTable = async () => {
            const result = await axioslogin.get(`TmTableView/employeeOnPending/${id}`)
            const { data, success } = result.data
            if (success === 2) {
                setemployeeOnPending(data)
                // settaskTableCount(taskTableCount + 1)
            } else {
                setemployeeOnPending([])
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

        const getDeptCompleteTable = async () => {
            const result = await axioslogin.get(`TmTableView/departmentCompleted/${empsecid}`)
            const { data, success } = result.data
            if (success === 2) {
                setdeptCompleted(data)
                // settaskTableCount(taskTableCount + 1)
            } else {
                setdeptCompleted([])
            }
        }
        const getDeptInCompleteTable = async () => {
            const result = await axioslogin.get(`TmTableView/departmentInCompleted/${empsecid}`)
            const { data, success } = result.data
            if (success === 2) {
                setdeptInComplete(data)
                // settaskTableCount(taskTableCount + 1)
            } else {
                setdeptInComplete([])
            }
        }
        const getDeptOnProgressTable = async () => {
            const result = await axioslogin.get(`TmTableView/departmentOnProgress/${empsecid}`)
            const { data, success } = result.data
            if (success === 2) {
                setdeptOnProgress(data)
                // settaskTableCount(taskTableCount + 1)
            } else {
                setdeptOnProgress([])
            }
        }
        const getDeptOnHoldTable = async () => {
            const result = await axioslogin.get(`TmTableView/departmentOnHold/${empsecid}`)
            const { data, success } = result.data
            if (success === 2) {
                setdeptOnHold(data)
                // settaskTableCount(taskTableCount + 1)
            } else {
                setdeptOnHold([])
            }
        }
        const getDeptPendingTable = async () => {
            const result = await axioslogin.get(`TmTableView/departmentPending/${empsecid}`)
            const { data, success } = result.data
            if (success === 2) {
                setdeptOnPending(data)
                // settaskTableCount(taskTableCount + 1)
            } else {
                setdeptOnPending([])
            }
        }
        const getProjComplete = async () => {
            const result = await axioslogin.get(`TmTableView/projectCompleted/${empsecid}`)
            const { data, success } = result.data
            if (success === 2) {
                setprojCompleted(data)
                // settaskTableCount(taskTableCount + 1)
            } else {
                setprojCompleted([])
            }
        }
        const getProjInComplete = async () => {
            const result = await axioslogin.get(`TmTableView/projectInCompleted/${empsecid}`)
            const { data, success } = result.data
            if (success === 2) {
                setprojInCompleted(data)
                // settaskTableCount(taskTableCount + 1)
            } else {
                setprojInCompleted([])
            }
        }
        const getProjOnProgress = async () => {
            const result = await axioslogin.get(`TmTableView/projectOnProgress/${empsecid}`)
            const { data, success } = result.data
            if (success === 2) {
                setprojOnProgress(data)
                // settaskTableCount(taskTableCount + 1)
            } else {
                setprojOnProgress([])
            }
        }
        const getProjOverDue = async () => {
            const result = await axioslogin.get(`TmTableView/ProjectOverDue/${empsecid}`)
            const { data, success } = result.data
            if (success === 2) {
                setprojOverDue(data)
                // settaskTableCount(taskTableCount + 1)
            } else {
                setprojOverDue([])
            }
        }
        const getGoalsCompleted = async () => {
            const result = await axioslogin.get(`TmTableView/goalsCompleted/${empsecid}`)
            const { data, success } = result.data
            if (success === 2) {
                setgoalsCompleted(data)
                // settaskTableCount(taskTableCount + 1)
            } else {
                setgoalsCompleted([])
            }
        }
        const getGoalsInCompleted = async () => {
            const result = await axioslogin.get(`TmTableView/goalsInCompleted/${empsecid}`)
            const { data, success } = result.data
            if (success === 2) {
                setgoalsInCompleted(data)
                // settaskTableCount(taskTableCount + 1)
            } else {
                setgoalsInCompleted([])
            }
        }
        const getGoalsOnProgress = async () => {
            const result = await axioslogin.get(`TmTableView/goalsOnProgress/${empsecid}`)
            const { data, success } = result.data
            if (success === 2) {
                setgoalsOnProgress(data)
                // settaskTableCount(taskTableCount + 1)
            } else {
                setgoalsOnProgress([])
            }
        }
        const getGoalsOverDue = async () => {
            const result = await axioslogin.get(`TmTableView/goalsOverDue/${empsecid}`)
            const { data, success } = result.data
            if (success === 2) {
                setgoalsOverDue(data)
                // settaskTableCount(taskTableCount + 1)
            } else {
                setgoalsOverDue([])
            }
        }
        getOverDueTable()
        getTodayTable()
        getNextWeekTable()
        getNextMonthTable()
        getOverDueEmpTable()
        getEmpCompletedTable()
        getEmpOnProgressTable()
        getEmpOnHoldTable()
        getEmpPendingTable()
        getEmpInCompleteTable()
        getDeptCompleteTable()
        getDeptInCompleteTable()
        getDeptOnProgressTable()
        getProjComplete()
        getProjInComplete()
        getProjOnProgress()
        getProjOverDue()
        getGoalsCompleted()
        getGoalsInCompleted()
        getGoalsOnProgress()
        getGoalsOverDue()
        getDeptOnHoldTable()
        getDeptPendingTable()
    }, [empsecid, tableCount, id])
    return (
        overdueTaskFlag === 1 ? <TmOverDueTask tabledata={tableData} overDueHeading={overDueHeading} empsecid={empsecid}
            setoverdueTaskFlag={setoverdueTaskFlag} tableCount={tableCount} setTableCount={setTableCount} /> :
            employeeTaskFlag === 1 ? <TmEmployeeTaskView empTaskHeading={empTaskHeading}
                setemployeeTaskFlag={setemployeeTaskFlag} tableDataEmployee={tableDataEmployee} tableCount={tableCount} setTableCount={setTableCount} /> :
                departmentTaskFlag === 1 ? <TmDepartmentTaskView deptTableData={deptTableData} deptTaskHeading={deptTaskHeading}
                    setdepartmentTaskFlag={setdepartmentTaskFlag} tableCount={tableCount} setTableCount={setTableCount} /> :
                    projectFlag === 1 ? <TmProjectView ProjTable={ProjTable} projectHead={projectHead}
                        setprojectFlag={setprojectFlag} /> :
                        goalsFlag === 1 ? <TmGoalsView goalsTable={goalsTable} goalsHead={goalsHead}
                            setgoalsFlag={setgoalsFlag} /> :
                            <Box sx={{
                                height: '100%',
                                borderRadius: 1, boxShadow: 2,
                            }}>
                                <Box sx={{ display: 'flex', borderBottom: .1, borderColor: '#C5C5C5' }}>
                                    <Box sx={{ m: 1 }}><DashboardOutlinedIcon fontSize='medium' sx={{ color: '#262065' }} /></Box>
                                    <Box sx={{ m: 1, color: '#262065' }}>My DashBoard</Box>
                                </Box>
                                <Box sx={{ display: 'flex', margin: 'auto', mt: 1, }}>
                                    <Box sx={{
                                        flex: 1,
                                        m: .5,
                                        borderRadius: 2,
                                        bgcolor: '#f4e8ff'
                                    }}>
                                        <CssVarsProvider>
                                            <List
                                                variant="outlined"
                                                sx={{ borderRadius: 'lg', border: .1, borderColor: '#D396FF', }}
                                            >
                                                <ListItem sx={{ color: '#5E376D', fontSize: 18, height: 55, fontWeight: 650 }}>
                                                    Over Due Task
                                                    <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'flex-end', fontSize: 30, mr: 1.5 }}>
                                                        {overdues.length}
                                                    </Box>

                                                </ListItem>
                                                <Box sx={{ maxHeight: 160, overflow: 'auto', }}>
                                                    <ListDivider inset='gutter' />
                                                    <ListItem sx={{ color: '#5E376D', cursor: 'pointer' }}
                                                        onClick={(e) => {
                                                            ViewOverDueTask(e)
                                                        }}>
                                                        <ListItemDecorator>
                                                            <Avatar
                                                                color="neutral"
                                                                size="sm"
                                                                variant="outlined"
                                                                sx={{ bgcolor: 'white', }}
                                                            >
                                                                <EventBusyIcon sx={{ color: '#341948', width: 23, height: 23, }} />
                                                            </Avatar>
                                                        </ListItemDecorator>
                                                        Overdue
                                                        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: "flex-end", fontSize: 20, fontWeight: 700, pr: 1, }}>
                                                            {overdues.length}
                                                        </Box>
                                                    </ListItem>
                                                    <ListDivider inset='gutter' />
                                                    <ListItem sx={{ color: '#5E376D', cursor: 'pointer' }}
                                                        onClick={(e) => {
                                                            ViewOverDueTodayTask(e)
                                                        }}>
                                                        <ListItemDecorator>
                                                            <Avatar
                                                                color="neutral"
                                                                size="sm"
                                                                variant="outlined"
                                                                sx={{ bgcolor: 'white' }}
                                                            >
                                                                <TodayIcon sx={{ color: '#341948', width: 23, height: 23, }} />
                                                            </Avatar>
                                                        </ListItemDecorator>
                                                        Today
                                                        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: "flex-end", fontSize: 20, fontWeight: 700, pr: 1 }}>
                                                            {overdueToday.length}
                                                        </Box>
                                                    </ListItem>
                                                    <ListDivider inset='gutter' />
                                                    <ListItem sx={{ color: '#5E376D', cursor: 'pointer' }}
                                                        onClick={(e) => {
                                                            ViewOverDueWeekTask(e)
                                                        }}>
                                                        <ListItemDecorator>
                                                            <Avatar
                                                                color="neutral"
                                                                sx={{ bgcolor: 'white', }}
                                                                size="sm"
                                                                variant="outlined"
                                                            >
                                                                <DateRangeIcon sx={{ color: '#341948', width: 23, height: 23, }} />
                                                            </Avatar>
                                                        </ListItemDecorator>
                                                        Next week
                                                        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: "flex-end" }}>
                                                            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: "flex-end", fontSize: 20, fontWeight: 700, pr: 1 }}>
                                                                {overDueNextWeek.length}
                                                            </Box>
                                                        </Box>
                                                    </ListItem>
                                                    <ListDivider inset='gutter' />
                                                    <ListItem sx={{ color: '#5E376D', cursor: 'pointer' }}
                                                        onClick={(e) => {
                                                            ViewOverDueMonthTask(e)
                                                        }}>
                                                        <ListItemDecorator>
                                                            <Avatar
                                                                color="neutral"
                                                                size="sm"
                                                                variant="outlined"
                                                                sx={{ bgcolor: 'white' }}
                                                            >
                                                                <CalendarMonthIcon sx={{ color: '#341948', width: 23, height: 23, }} />
                                                            </Avatar>
                                                        </ListItemDecorator>
                                                        Coming Month
                                                        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: "flex-end", fontSize: 20, fontWeight: 700, pr: 1 }}>
                                                            {overdueMonth.length}
                                                        </Box>
                                                    </ListItem>
                                                </Box>
                                            </List>
                                        </CssVarsProvider>
                                    </Box >
                                    <Box sx={{
                                        flex: 1,
                                        m: .5,
                                        borderRadius: 2,
                                        bgcolor: '#f4e8ff'
                                    }}>
                                        <CssVarsProvider>
                                            <List
                                                variant="outlined"
                                                sx={{ borderRadius: 'lg', border: .1, borderColor: '#D396FF', }}
                                            >
                                                <ListItem sx={{ color: '#5E376D', fontSize: 18, height: 55, fontWeight: 650 }}>
                                                    My Task
                                                    <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'flex-end', fontSize: 30, mr: 1.5 }}>
                                                        {employeeInComplete.length}
                                                    </Box>
                                                </ListItem>
                                                <Box sx={{ maxHeight: 160, overflow: 'auto', }}>
                                                    <ListDivider inset='gutter' />
                                                    <ListItem sx={{ color: '#5E376D', cursor: 'pointer' }}
                                                        onClick={(e) => {
                                                            ViewEmpOverDueTask(e)
                                                        }}>
                                                        <ListItemDecorator>
                                                            <Avatar
                                                                color="neutral"
                                                                size="sm"
                                                                variant="outlined"
                                                                sx={{ bgcolor: 'white' }}
                                                            >
                                                                <UpdateOutlinedIcon sx={{ color: '#341948', width: 23, height: 23, }} />
                                                            </Avatar>
                                                        </ListItemDecorator>
                                                        Overdue
                                                        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: "flex-end", fontSize: 20, fontWeight: 700, pr: 1 }}>
                                                            {employeeOverDue.length}
                                                        </Box>
                                                    </ListItem>
                                                    {/* ////////////////// */}
                                                    <ListDivider inset='gutter' />
                                                    <ListItem sx={{ color: '#5E376D', cursor: 'pointer' }}
                                                        onClick={(e) => {
                                                            ViewEmpOnProgressTask(e)
                                                        }}>
                                                        <ListItemDecorator>
                                                            <Avatar
                                                                color="neutral"
                                                                size="sm"
                                                                variant="outlined"
                                                                sx={{ bgcolor: 'white' }}
                                                            >
                                                                <RotateRightIcon sx={{ color: '#341948', width: 23, height: 23, }} />
                                                            </Avatar>
                                                        </ListItemDecorator>
                                                        On progress
                                                        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: "flex-end", fontSize: 20, fontWeight: 700, pr: 1 }}>
                                                            {employeeOnProgress.length}
                                                        </Box>
                                                    </ListItem>
                                                    {/* /////////////////// */}
                                                    <ListDivider inset='gutter' />
                                                    <ListItem sx={{ color: '#5E376D', cursor: 'pointer' }}
                                                        onClick={(e) => {
                                                            ViewOnHoldTask(e)
                                                        }}>
                                                        <ListItemDecorator>
                                                            <Avatar
                                                                color="neutral"
                                                                size="sm"
                                                                variant="outlined"
                                                                sx={{ bgcolor: 'white' }}
                                                            >

                                                                <LockResetIcon sx={{ color: '#341948', width: 23, height: 23, }} />
                                                            </Avatar>
                                                        </ListItemDecorator>
                                                        On Hold
                                                        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: "flex-end", fontSize: 20, fontWeight: 700, pr: 1 }}>
                                                            {employeeOnHold.length}
                                                        </Box>
                                                    </ListItem>
                                                    {/* //////////////////// */}
                                                    <ListDivider inset='gutter' />
                                                    <ListItem sx={{ color: '#5E376D', cursor: 'pointer' }}
                                                        onClick={(e) => {
                                                            ViewEmpPendingTask(e)
                                                        }}>
                                                        <ListItemDecorator>
                                                            <Avatar
                                                                color="neutral"
                                                                size="sm"
                                                                variant="outlined"
                                                                sx={{ bgcolor: 'white' }}
                                                            >

                                                                <RunningWithErrorsIcon sx={{ color: '#341948', width: 23, height: 23, }} />
                                                            </Avatar>
                                                        </ListItemDecorator>
                                                        Pending
                                                        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: "flex-end", fontSize: 20, fontWeight: 700, pr: 1 }}>
                                                            {employeeOnPending.length}
                                                        </Box>
                                                    </ListItem>
                                                    {/* //////////////////// */}
                                                    <ListDivider inset='gutter' />
                                                    <ListItem sx={{ color: '#5E376D', cursor: 'pointer' }}
                                                        onClick={(e) => {
                                                            ViewEmpCompletedTask(e)
                                                        }}>
                                                        <ListItemDecorator>
                                                            <Avatar
                                                                color="neutral"
                                                                size="sm"
                                                                variant="outlined"
                                                                sx={{ bgcolor: 'white' }}
                                                            >
                                                                <CheckCircleOutlinedIcon sx={{ color: '#341948', width: 23, height: 23, }} />
                                                            </Avatar>
                                                        </ListItemDecorator>
                                                        Completed
                                                        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: "flex-end", fontSize: 20, fontWeight: 700, pr: 1 }}>
                                                            {employeeeCompleted.length}
                                                        </Box>
                                                    </ListItem>
                                                    <ListDivider inset='gutter' />
                                                    <ListItem sx={{ color: '#5E376D', cursor: 'pointer' }}
                                                        onClick={(e) => {
                                                            ViewEmpInCompletedTask(e)
                                                        }}>
                                                        <ListItemDecorator>
                                                            <Avatar
                                                                color="neutral"
                                                                size="sm"
                                                                variant="outlined"
                                                                sx={{ bgcolor: 'white' }}
                                                            >
                                                                <RotateRightIcon sx={{ color: '#341948', width: 23, height: 23, }} />
                                                            </Avatar>
                                                        </ListItemDecorator>
                                                        Incomplete
                                                        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: "flex-end", fontSize: 20, fontWeight: 700, pr: 1 }}>
                                                            {employeeInComplete.length}
                                                        </Box>
                                                    </ListItem>
                                                    {/* //////////////////////// */}

                                                </Box>
                                            </List>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{
                                        flex: 1,
                                        m: .5,
                                        borderRadius: 2,
                                        bgcolor: '#f4e8ff'
                                    }}>
                                        <CssVarsProvider>
                                            <List
                                                variant="outlined"
                                                sx={{ borderRadius: 'lg', border: .1, borderColor: '#D396FF', }}
                                            >
                                                <ListItem sx={{ color: '#5E376D', fontSize: 18, height: 55, fontWeight: 650 }}>
                                                    Department Task
                                                    <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'flex-end', fontSize: 30, mr: 1.5 }}>
                                                        {/* <Box sx={{ border: 1, borderRadius: 20, width: 45 }}> */}
                                                        {deptInComplete.length}
                                                        {/* </Box> */}

                                                    </Box>
                                                </ListItem>
                                                <Box sx={{ maxHeight: 160, overflow: 'auto', }}>
                                                    <ListDivider inset='gutter' />
                                                    <ListItem sx={{ color: '#5E376D', cursor: 'pointer' }}
                                                        onClick={(e) => {
                                                            ViewDeptOnProgressTask(e)
                                                        }}>
                                                        <ListItemDecorator>
                                                            <Avatar
                                                                color="neutral"
                                                                size="sm"
                                                                variant="outlined"
                                                                sx={{ bgcolor: 'white' }}
                                                            >
                                                                <RotateRightIcon sx={{ color: '#341948', width: 23, height: 23, }} />
                                                            </Avatar>
                                                        </ListItemDecorator>
                                                        On progress
                                                        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: "flex-end", fontSize: 20, fontWeight: 700, pr: 1 }}>
                                                            {deptOnProgress.length}
                                                        </Box>
                                                    </ListItem>
                                                    <ListDivider inset='gutter' />
                                                    <ListItem sx={{ color: '#5E376D', cursor: 'pointer' }}
                                                        onClick={(e) => {
                                                            ViewDeptOnHold(e)
                                                        }}>
                                                        <ListItemDecorator>
                                                            <Avatar
                                                                color="neutral"
                                                                size="sm"
                                                                variant="outlined"
                                                                sx={{ bgcolor: 'white' }}
                                                            >
                                                                <LockResetIcon sx={{ color: '#341948', width: 23, height: 23, }} />
                                                            </Avatar>
                                                        </ListItemDecorator>
                                                        On Hold
                                                        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: "flex-end", fontSize: 20, fontWeight: 700, pr: 1 }}>
                                                            {deptOnHold.length}
                                                        </Box>
                                                    </ListItem>
                                                    <ListDivider inset='gutter' />
                                                    <ListItem sx={{ color: '#5E376D', cursor: 'pointer' }}
                                                        onClick={(e) => {
                                                            ViewDeptPending(e)
                                                        }}>
                                                        <ListItemDecorator>
                                                            <Avatar
                                                                color="neutral"
                                                                size="sm"
                                                                variant="outlined"
                                                                sx={{ bgcolor: 'white' }}
                                                            >
                                                                <RunningWithErrorsIcon sx={{ color: '#341948', width: 23, height: 23, }} />
                                                            </Avatar>
                                                        </ListItemDecorator>
                                                        Pending
                                                        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: "flex-end", fontSize: 20, fontWeight: 700, pr: 1 }}>
                                                            {deptOnPending.length}
                                                        </Box>
                                                    </ListItem>
                                                    <ListDivider inset='gutter' />
                                                    <ListItem sx={{ color: '#5E376D', cursor: 'pointer' }}
                                                        onClick={(e) => {
                                                            ViewDeptCompltTask(e)
                                                        }}>
                                                        <ListItemDecorator>
                                                            <Avatar
                                                                color="neutral"
                                                                size="sm"
                                                                variant="outlined"
                                                                sx={{ bgcolor: 'white' }}
                                                            >
                                                                <CheckCircleOutlinedIcon sx={{ color: '#341948', width: 23, height: 23, }} />
                                                            </Avatar>
                                                        </ListItemDecorator>
                                                        Completed
                                                        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: "flex-end", fontSize: 20, fontWeight: 700, pr: 1 }}>
                                                            {deptCompleted.length}
                                                        </Box>
                                                    </ListItem>
                                                    <ListDivider inset='gutter' />

                                                    <ListItem sx={{ color: '#5E376D', cursor: 'pointer' }}
                                                        onClick={(e) => {
                                                            ViewDeptInCompltTask(e)
                                                        }}>
                                                        <ListItemDecorator>
                                                            <Avatar
                                                                color="neutral"
                                                                size="sm"
                                                                variant="outlined"
                                                                sx={{ bgcolor: 'white' }}
                                                            >
                                                                <RotateRightIcon sx={{ color: '#341948', width: 23, height: 23, }} />
                                                            </Avatar>
                                                        </ListItemDecorator>
                                                        Incomplete
                                                        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: "flex-end", fontSize: 20, fontWeight: 700, pr: 1 }}>
                                                            {deptInComplete.length}
                                                        </Box>
                                                    </ListItem>


                                                </Box>
                                            </List>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{
                                        flex: 1,
                                        m: .5,
                                        borderRadius: 2,
                                        bgcolor: '#f4e8ff'
                                    }}>
                                        <CssVarsProvider>
                                            <List
                                                variant="outlined"
                                                sx={{ borderRadius: 'lg', border: .1, borderColor: '#D396FF', }}
                                            >
                                                <ListItem sx={{ color: '#5E376D', fontSize: 18, height: 55, fontWeight: 650 }}>
                                                    Projects
                                                    <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'flex-end', fontSize: 30, mr: 1.5 }}>

                                                        {projInCompleted.length}
                                                    </Box>
                                                </ListItem>
                                                <Box sx={{ maxHeight: 160, overflow: 'auto', }}>
                                                    <ListDivider inset='gutter' />
                                                    <ListItem sx={{ color: '#5E376D', cursor: 'pointer' }}
                                                        onClick={(e) => {
                                                            ViewProjectOnProgess(e)
                                                        }}>
                                                        <ListItemDecorator>
                                                            <Avatar
                                                                color="neutral"
                                                                size="sm"
                                                                variant="outlined"
                                                                sx={{ bgcolor: 'white' }}
                                                            >
                                                                <RotateRightIcon sx={{ color: '#341948', width: 23, height: 23, }} />
                                                            </Avatar>
                                                        </ListItemDecorator>
                                                        On progress
                                                        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: "flex-end", fontSize: 20, fontWeight: 700, pr: 1 }}>
                                                            {projOnProgress.length}
                                                        </Box>
                                                    </ListItem>
                                                    {/* <ListDivider inset='gutter' />
                                                    <ListItem sx={{ color: '#5E376D', cursor: 'pointer' }}
                                                        onClick={(e) => {
                                                            ViewProjectComplete(e)
                                                        }}>
                                                        <ListItemDecorator>
                                                            <Avatar
                                                                color="neutral"
                                                                size="sm"
                                                                variant="outlined"
                                                                sx={{ bgcolor: 'white' }}
                                                            >
                                                                <CheckCircleOutlinedIcon sx={{ color: '#341948', width: 23, height: 23, }} />
                                                            </Avatar>
                                                        </ListItemDecorator>
                                                        InCompleted
                                                        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: "flex-end", fontSize: 20, fontWeight: 700, pr: 1 }}>
                                                            {projInCompleted.length}
                                                        </Box>
                                                    </ListItem> */}
                                                    <ListDivider inset='gutter' />
                                                    <ListItem sx={{ color: '#5E376D', cursor: 'pointer' }}
                                                        onClick={(e) => {
                                                            ViewProjectOverDue(e)
                                                        }}>
                                                        <ListItemDecorator>
                                                            <Avatar
                                                                color="neutral"
                                                                size="sm"
                                                                variant="outlined"
                                                                sx={{ bgcolor: 'white' }}
                                                            >
                                                                <UpdateOutlinedIcon sx={{ color: '#341948', width: 23, height: 23, }} />
                                                            </Avatar>
                                                        </ListItemDecorator>
                                                        Overdue
                                                        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: "flex-end", fontSize: 20, fontWeight: 700, pr: 1 }}>
                                                            {projOverDue.length}
                                                        </Box>
                                                    </ListItem>
                                                    <ListDivider inset='gutter' />
                                                    <ListItem sx={{ color: '#5E376D', cursor: 'pointer' }}
                                                        onClick={(e) => {
                                                            ViewProjectComplete(e)
                                                        }}>
                                                        <ListItemDecorator>
                                                            <Avatar
                                                                color="neutral"
                                                                size="sm"
                                                                variant="outlined"
                                                                sx={{ bgcolor: 'white' }}
                                                            >
                                                                <CheckCircleOutlinedIcon sx={{ color: '#341948', width: 23, height: 23, }} />
                                                            </Avatar>
                                                        </ListItemDecorator>
                                                        Completed
                                                        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: "flex-end", fontSize: 20, fontWeight: 700, pr: 1 }}>
                                                            {projCompleted.length}
                                                        </Box>
                                                    </ListItem>
                                                    <ListDivider inset='gutter' />
                                                    <ListItem sx={{ color: '#5E376D', cursor: 'pointer' }}
                                                        onClick={(e) => {
                                                            ViewProjectInComplete(e)
                                                        }}>
                                                        <ListItemDecorator>
                                                            <Avatar
                                                                color="neutral"
                                                                size="sm"
                                                                variant="outlined"
                                                                sx={{ bgcolor: 'white' }}
                                                            >
                                                                <CheckCircleOutlinedIcon sx={{ color: '#341948', width: 23, height: 23, }} />
                                                            </Avatar>
                                                        </ListItemDecorator>
                                                        InCompleted
                                                        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: "flex-end", fontSize: 20, fontWeight: 700, pr: 1 }}>
                                                            {projInCompleted.length}
                                                        </Box>
                                                    </ListItem>
                                                </Box>
                                            </List>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{
                                        flex: 1,
                                        m: .5,
                                        bgcolor: '#f4e8ff',
                                        borderRadius: 2,
                                    }}>
                                        <CssVarsProvider>
                                            <List
                                                variant="outlined"
                                                sx={{ borderRadius: 'lg', border: .1, borderColor: '#D396FF', }}
                                            >
                                                <ListItem sx={{ color: '#5E376D', fontSize: 18, height: 55, fontWeight: 650 }}>
                                                    Goals
                                                    <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'flex-end', fontSize: 30, mr: 1.5 }}>
                                                        {goalsInCompleted.length}
                                                    </Box>
                                                </ListItem>
                                                <Box sx={{ maxHeight: 160, overflow: 'auto', }}>
                                                    <ListDivider inset='gutter' />
                                                    <ListItem sx={{ color: '#5E376D', cursor: 'pointer' }}
                                                        onClick={(e) => {
                                                            ViewGoalsOnProgress(e)
                                                        }}>
                                                        <ListItemDecorator>
                                                            <Avatar
                                                                color="neutral"
                                                                size="sm"
                                                                variant="outlined"
                                                                sx={{ bgcolor: 'white' }}
                                                            >

                                                                <RotateRightIcon sx={{ color: '#341948', width: 23, height: 23, }} />
                                                            </Avatar>
                                                        </ListItemDecorator>
                                                        On progress
                                                        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: "flex-end", fontSize: 20, fontWeight: 700, pr: 1 }}>
                                                            {goalsOnProgress.length}
                                                        </Box>
                                                    </ListItem>

                                                    <ListDivider inset='gutter' />
                                                    <ListItem sx={{ color: '#5E376D', cursor: 'pointer' }}
                                                        onClick={(e) => {
                                                            ViewGoalsOverdue(e)
                                                        }}>
                                                        <ListItemDecorator>
                                                            <Avatar
                                                                color="neutral"
                                                                size="sm"
                                                                variant="outlined"
                                                                sx={{ bgcolor: 'white' }}
                                                            >
                                                                <UpdateOutlinedIcon sx={{ color: '#341948', width: 23, height: 23, }} />
                                                            </Avatar>
                                                        </ListItemDecorator>
                                                        Overdue
                                                        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: "flex-end", fontSize: 20, fontWeight: 700, pr: 1 }}>
                                                            {goalsOverDue.length}
                                                        </Box>
                                                    </ListItem>
                                                    <ListDivider inset='gutter' />
                                                    <ListItem sx={{ color: '#5E376D', cursor: 'pointer' }}
                                                        onClick={(e) => {
                                                            ViewGoalsComplete(e)
                                                        }}>
                                                        <ListItemDecorator>
                                                            <Avatar
                                                                color="neutral"
                                                                size="sm"
                                                                variant="outlined"
                                                                sx={{ bgcolor: 'white' }}
                                                            >
                                                                <CheckCircleOutlinedIcon sx={{ color: '#341948', width: 23, height: 23, }} />
                                                            </Avatar>
                                                        </ListItemDecorator>
                                                        Completed
                                                        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: "flex-end", fontSize: 20, fontWeight: 700, pr: 1 }}>
                                                            {goalsCompleted.length}
                                                        </Box>
                                                    </ListItem>
                                                    <ListDivider inset='gutter' />
                                                    <ListItem sx={{ color: '#5E376D', cursor: 'pointer' }}
                                                        onClick={(e) => {
                                                            ViewGoalsInComplete(e)
                                                        }}>
                                                        <ListItemDecorator>
                                                            <Avatar
                                                                color="neutral"
                                                                size="sm"
                                                                variant="outlined"
                                                                sx={{ bgcolor: 'white' }}
                                                            >
                                                                <CheckCircleOutlinedIcon sx={{ color: '#341948', width: 23, height: 23, }} />
                                                            </Avatar>
                                                        </ListItemDecorator>
                                                        InCompleted
                                                        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: "flex-end", fontSize: 20, fontWeight: 700, pr: 1 }}>
                                                            {goalsInCompleted.length}
                                                        </Box>
                                                    </ListItem>
                                                </Box>
                                            </List>
                                        </CssVarsProvider>
                                    </Box>
                                </Box>
                                <Box sx={{ border: 1, borderRadius: 4, p: .5, borderColor: '#D396FF', mx: .5, height: 560, }}>
                                    <DashboardTabs />
                                </Box>
                                <Box sx={{ height: 3 }}></Box>
                            </Box >
    )
}

export default memo(TmDashboardMain)