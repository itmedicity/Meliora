import React, { memo, useEffect, useState, useCallback } from 'react'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import Box from '@mui/joy/Box';
import ListDivider from '@mui/joy/ListDivider';
import { CssVarsProvider, Dropdown, Menu, MenuItem } from '@mui/joy';
import TodayIcon from '@mui/icons-material/Today';
import Avatar from '@mui/joy/Avatar';
import DateRangeIcon from '@mui/icons-material/DateRange';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import UpdateOutlinedIcon from '@mui/icons-material/UpdateOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
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
import MenuButton from '@mui/joy/MenuButton';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined';
import PersonIcon from '@mui/icons-material/Person';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import AlignHorizontalRightRoundedIcon from '@mui/icons-material/AlignHorizontalRightRounded';
const TmDashboardMain = () => {

    const [overDueHeading, setoverDueHeading] = useState('')
    const [overdueTaskFlag, setoverdueTaskFlag] = useState(0)
    const [overdues, setOverdues] = useState([])
    const [overdueToday, setOverdueToday] = useState([])
    const [overDueNextWeek, setoverDueNextWeek] = useState([])
    const [overdueMonth, setoverdueMonth] = useState([])
    const [empTaskHeading, setempTaskHeading] = useState('')
    const [employeeTaskFlag, setemployeeTaskFlag] = useState(0)
    const [employeeOverDue, setemployeeOverDue] = useState([])
    const [employeeeCompleted, setemployeeeCompleted] = useState([])
    const [employeeOnProgress, setemployeeOnProgress] = useState([])
    const [employeeInComplete, setemployeeInComplete] = useState([])
    const [employeeOnHold, setemployeeOnHold] = useState([])
    const [employeeOnPending, setemployeeOnPending] = useState([])
    const [departmentTaskFlag, setdepartmentTaskFlag] = useState(0)
    const [deptTaskHeading, setdeptTaskHeading] = useState('')
    const [deptCompleted, setdeptCompleted] = useState([])
    const [deptInComplete, setdeptInComplete] = useState([])
    const [deptOnProgress, setdeptOnProgress] = useState([])
    const [deptOnHold, setdeptOnHold] = useState([])
    const [deptOnPending, setdeptOnPending] = useState([])
    const [projectHead, setprojectHead] = useState('')
    const [projectFlag, setprojectFlag] = useState(0)
    const [projCompleted, setprojCompleted] = useState([])
    const [projInCompleted, setprojInCompleted] = useState([])
    const [projOnProgress, setprojOnProgress] = useState([])
    const [projOverDue, setprojOverDue] = useState([])
    const [goalsFlag, setgoalsFlag] = useState(0)
    const [goalsHead, setgoalsHead] = useState('')
    const [goalsCompleted, setgoalsCompleted] = useState([])
    const [goalsInCompleted, setgoalsInCompleted] = useState([])
    const [goalsOverDue, setgoalsOverDue] = useState([])
    const [goalsOnProgress, setgoalsOnProgress] = useState([])
    const [tableCount, setTableCount] = useState(0)
    const [dueFlag, setDueFlag] = useState(0)
    const [flagTask, setflagTask] = useState(0)
    const [deptFlag, setdeptFlag] = useState(0)
    const [prjFlag, setprjFlag] = useState(0)
    const [flagGoal, setflagGoal] = useState(0)

    const id = useSelector((state) => state.LoginUserData.empid, _.isEqual)
    //redux for geting login emp secid
    const empsecid = useSelector((state) => { return state.LoginUserData.empsecid })

    const ViewOverDueTask = useCallback((e) => {
        if (overdues.length === 0) {
            infoNotify('No Dues')
        } else {
            setoverdueTaskFlag(1)
            setDueFlag(1)
            setoverDueHeading("Over Dues")
            setemployeeTaskFlag(0)
            setdepartmentTaskFlag(0)
            setprojectFlag(0)
        }
    }, [overdues])

    const ViewOverDueTodayTask = useCallback((e) => {
        if (overdueToday.length === 0) {
            infoNotify('No Dues Today')
        } else {
            setoverdueTaskFlag(2)
            setDueFlag(1)
            setoverDueHeading("Today's")
            setemployeeTaskFlag(0)
            setdepartmentTaskFlag(0)
            setprojectFlag(0)
            setgoalsFlag(0)
        }
    }, [overdueToday])
    const ViewOverDueWeekTask = useCallback((e) => {
        if (overDueNextWeek.length === 0) {
            infoNotify('No Dues for Next Week')
        } else {
            setoverdueTaskFlag(3)
            setDueFlag(1)
            setoverDueHeading("Next week's")
            setemployeeTaskFlag(0)
            setdepartmentTaskFlag(0)
            setprojectFlag(0)
            setgoalsFlag(0)
        }
    }, [overDueNextWeek])
    const ViewOverDueMonthTask = useCallback((e) => {
        if (overdueMonth.length === 0) {
            infoNotify('No Dues in Next Month')
        } else {
            setoverdueTaskFlag(4)
            setDueFlag(1)
            setoverDueHeading("Upcoming Month's")
            setemployeeTaskFlag(0)
            setdepartmentTaskFlag(0)
            setprojectFlag(0)
            setgoalsFlag(0)
        }
    }, [overdueMonth])

    const ViewEmpCompletedTask = useCallback((e) => {
        if (employeeeCompleted.length === 0) {
            infoNotify('No Data')
        } else {
            setemployeeTaskFlag(1)
            setflagTask(1)
            setempTaskHeading('Completed')
            setdepartmentTaskFlag(0)
            setprojectFlag(0)
            setgoalsFlag(0)
            setoverdueTaskFlag(0)
        }
    }, [employeeeCompleted])
    const ViewEmpInCompletedTask = useCallback((e) => {
        if (employeeInComplete.length === 0) {
            infoNotify('No Data')
        } else {

            setemployeeTaskFlag(2)
            setflagTask(1)
            setempTaskHeading('Incompleted')
            setdepartmentTaskFlag(0)
            setprojectFlag(0)
            setgoalsFlag(0)
            setoverdueTaskFlag(0)
        }
    }, [employeeInComplete])
    const ViewEmpOnProgressTask = useCallback((e) => {
        if (employeeOnProgress.length === 0) {
            infoNotify('No Data')
        } else {

            setemployeeTaskFlag(3)
            setflagTask(1)
            setempTaskHeading('On Progress')
            setdepartmentTaskFlag(0)
            setprojectFlag(0)
            setgoalsFlag(0)
            setoverdueTaskFlag(0)
        }
    }, [employeeOnProgress])
    const ViewOnHoldTask = useCallback((e) => {
        if (employeeOnHold.length === 0) {
            infoNotify('No Data')
        } else {
            setemployeeTaskFlag(4)
            setflagTask(1)
            setempTaskHeading('On Hold')
            setdepartmentTaskFlag(0)
            setoverdueTaskFlag(0)
            setprojectFlag(0)
            setgoalsFlag(0)
        }
    }, [employeeOnHold])

    const ViewEmpPendingTask = useCallback((e) => {
        if (employeeOnPending.length === 0) {
            infoNotify('No Data')
        } else {
            setemployeeTaskFlag(5)
            setflagTask(1)
            setempTaskHeading('Pending')
            setdepartmentTaskFlag(0)
            setoverdueTaskFlag(0)
            setprojectFlag(0)
            setgoalsFlag(0)
        }
    }, [employeeOnPending])

    const ViewEmpOverDueTask = useCallback((e) => {
        if (employeeOverDue.length === 0) {
            infoNotify('No Data')
        } else {
            setemployeeTaskFlag(6)
            setflagTask(1)
            setempTaskHeading('Over Dues')
            setdepartmentTaskFlag(0)
            setprojectFlag(0)
            setgoalsFlag(0)
            setoverdueTaskFlag(0)
        }
    }, [employeeOverDue])

    const ViewDeptOnProgressTask = useCallback((e) => {
        if (deptOnProgress.length === 0) {
            infoNotify('No Data')
        } else {
            setdepartmentTaskFlag(1)
            setdeptFlag(1)
            setdeptTaskHeading('On Progress')
            setoverdueTaskFlag(0)
            setemployeeTaskFlag(0)
            setprojectFlag(0)
            setgoalsFlag(0)
        }
    }, [deptOnProgress])

    const ViewDeptOnHold = useCallback((e) => {
        if (deptOnHold.length === 0) {
            infoNotify('No Data')
        } else {
            setdepartmentTaskFlag(2)
            setdeptFlag(1)
            setdeptTaskHeading('On Hold')
            setoverdueTaskFlag(0)
            setemployeeTaskFlag(0)
            setprojectFlag(0)
            setgoalsFlag(0)
        }
    }, [deptOnHold])
    const ViewDeptPending = useCallback((e) => {
        if (deptOnPending.length === 0) {
            infoNotify('No Data')
        } else {
            setdepartmentTaskFlag(3)
            setdeptFlag(1)
            setdeptTaskHeading('On Progress')
            setoverdueTaskFlag(0)
            setemployeeTaskFlag(0)
            setprojectFlag(0)
            setgoalsFlag(0)
        }
    }, [deptOnPending])
    const ViewDeptCompltTask = useCallback((e) => {
        if (deptCompleted.length === 0) {
            infoNotify('No Data')
        } else {
            setdepartmentTaskFlag(4)
            setdeptFlag(1)
            setdeptTaskHeading('Completed')
            setoverdueTaskFlag(0)
            setemployeeTaskFlag(0)
            setprojectFlag(0)
            setgoalsFlag(0)
        }
    }, [deptCompleted])
    const ViewDeptInCompltTask = useCallback((e) => {
        if (deptInComplete.length === 0) {
            infoNotify('No Data')
        } else {
            setdepartmentTaskFlag(5)
            setdeptFlag(1)
            setdeptTaskHeading('InComplete')
            setoverdueTaskFlag(0)
            setemployeeTaskFlag(0)
            setprojectFlag(0)
            setgoalsFlag(0)
        }
    }, [deptInComplete])


    const ViewProjectComplete = useCallback((e) => {
        if (projCompleted.length === 0) {
            infoNotify('No Data')
        } else {

            setprojectFlag(2)
            setprjFlag(1)
            setprojectHead('Completed')
            setgoalsFlag(0)
            setdepartmentTaskFlag(0)
            setoverdueTaskFlag(0)
            setemployeeTaskFlag(0)

        }
    }, [projCompleted])
    const ViewProjectInComplete = useCallback((e) => {
        if (projInCompleted.length === 0) {
            infoNotify('No Data')
        } else {
            setprojectFlag(3)
            setprjFlag(1)
            setprojectHead('InCompleted')
            setgoalsFlag(0)
            setdepartmentTaskFlag(0)
            setoverdueTaskFlag(0)
            setemployeeTaskFlag(0)

        }
    }, [projInCompleted])
    const ViewProjectOverDue = useCallback((e) => {
        if (projOverDue.length === 0) {
            infoNotify('No Data')
        } else {
            setprojectFlag(4)
            setprjFlag(1)
            setprojectHead('Over Dues')
            setgoalsFlag(0)
            setdepartmentTaskFlag(0)
            setoverdueTaskFlag(0)
            setemployeeTaskFlag(0)
        }
    }, [projOverDue])

    const ViewGoalsComplete = useCallback((e) => {
        if (goalsCompleted.length === 0) {
            infoNotify('No Data')
        } else {
            setdepartmentTaskFlag(0)
            setoverdueTaskFlag(0)
            setemployeeTaskFlag(0)
            setprojectFlag(0)
            setgoalsFlag(2)
            setflagGoal(1)
            setgoalsHead('Completed')
        }
    }, [goalsCompleted])
    const ViewGoalsInComplete = useCallback((e) => {
        if (goalsInCompleted.length === 0) {
            infoNotify('No Data')
        } else {
            setgoalsFlag(3)
            setflagGoal(1)
            setdepartmentTaskFlag(0)
            setoverdueTaskFlag(0)
            setemployeeTaskFlag(0)
            setprojectFlag(0)
            setgoalsHead('InCompleted')
        }
    }, [goalsInCompleted])
    const ViewGoalsOverdue = useCallback((e) => {
        if (goalsOverDue.length === 0) {
            infoNotify('No Data')
        } else {
            setgoalsFlag(4)
            setflagGoal(1)
            setdepartmentTaskFlag(0)
            setoverdueTaskFlag(0)
            setemployeeTaskFlag(0)
            setprojectFlag(0)
            setgoalsHead('Over Dues')
        }
    }, [goalsOverDue])


    useEffect(() => {
        const getOverDueTable = async () => {
            const result = await axioslogin.get(`/TmTableView/departmentOverDue/${empsecid}`)
            const { success, data } = result.data
            if (success === 2) {
                setOverdues(data)
            } else {
                setOverdues([])
            }
        }
        const getTodayTable = async () => {
            const result = await axioslogin.get(`/TmTableView/ViewOverDueToday/${empsecid}`)
            const { success, data } = result.data
            if (success === 2) {
                setOverdueToday(data)
            } else {
                setOverdueToday([])
            }
        }
        const getNextWeekTable = async () => {
            const result = await axioslogin.get(`/TmTableView/ViewOverDueNextWeek/${empsecid}`)

            const { data, success } = result.data
            if (success === 2) {
                setoverDueNextWeek(data)
            } else {
                setoverDueNextWeek([])
            }
        }
        const getNextMonthTable = async () => {
            const result = await axioslogin.get(`/TmTableView/ViewOverDueNextMonth/${empsecid}`)
            const { data, success } = result.data
            if (success === 2) {
                setoverdueMonth(data)
            } else {
                setoverdueMonth([])
            }
        }
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
                                            val.tm_task_status === 0 ? 'Incompleted' : 'Incompleted',
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

        const getEmpOnHoldTable = async () => {
            const result = await axioslogin.get(`TmTableView/employeeOnHold/${id}`)
            const { data, success } = result.data
            if (success === 2) {
                setemployeeOnHold(data)
            } else {
                setemployeeOnHold([])
            }
        }
        const getEmpPendingTable = async () => {
            const result = await axioslogin.get(`TmTableView/employeeOnPending/${id}`)
            const { data, success } = result.data
            if (success === 2) {
                setemployeeOnPending(data)
            } else {
                setemployeeOnPending([])
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

        const getDeptCompleteTable = async () => {
            const result = await axioslogin.get(`TmTableView/departmentCompleted/${empsecid}`)
            const { data, success } = result.data
            if (success === 2) {
                const arry = data?.map((val) => {
                    const obj = {
                        tm_task_slno: val.tm_task_slno,
                        tm_task_name: val.tm_task_name,
                        dept_name: val.dept_name,
                        sec_name: val.sec_name,
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
                                            val.tm_task_status === 0 ? 'Incompleted' : 'Incompleted',
                        datediff: new Date(val.tm_complete_date) - new Date(val.tm_task_due_date),
                        days: Math.floor((new Date(val.tm_complete_date) - new Date(val.tm_task_due_date)) / (1000 * 60 * 60 * 24)),
                        hours: Math.floor((new Date(val.tm_complete_date) - new Date(val.tm_task_due_date)) / (1000 * 60 * 60) % 24),
                        minutes: Math.floor(((new Date(val.tm_complete_date) - new Date(val.tm_task_due_date)) / 1000 / 60) % 60),
                        seconds: Math.floor(((new Date(val.tm_complete_date) - new Date(val.tm_task_due_date)) / 1000) % 60)
                    }
                    return obj
                })
                setdeptCompleted(arry)
            } else {
                setdeptCompleted([])
            }
        }
        const getDeptInCompleteTable = async () => {
            const result = await axioslogin.get(`TmTableView/departmentInCompleted/${empsecid}`)
            const { data, success } = result.data
            if (success === 2) {
                setdeptInComplete(data)
            } else {
                setdeptInComplete([])
            }
        }
        const getDeptOnProgressTable = async () => {
            const result = await axioslogin.get(`TmTableView/departmentOnProgress/${empsecid}`)
            const { data, success } = result.data
            if (success === 2) {
                setdeptOnProgress(data)
            } else {
                setdeptOnProgress([])
            }
        }
        const getDeptOnHoldTable = async () => {
            const result = await axioslogin.get(`TmTableView/departmentOnHold/${empsecid}`)
            const { data, success } = result.data
            if (success === 2) {
                setdeptOnHold(data)
            } else {
                setdeptOnHold([])
            }
        }
        const getDeptPendingTable = async () => {
            const result = await axioslogin.get(`TmTableView/departmentPending/${empsecid}`)
            const { data, success } = result.data
            if (success === 2) {
                setdeptOnPending(data)
            } else {
                setdeptOnPending([])
            }
        }
        const getProjComplete = async () => {
            const result = await axioslogin.get(`TmTableView/projectCompleted/${empsecid}`)
            const { data, success } = result.data
            if (success === 2) {
                setprojCompleted(data)
            } else {
                setprojCompleted([])
            }
        }
        const getProjInComplete = async () => {
            const result = await axioslogin.get(`TmTableView/projectInCompleted/${empsecid}`)
            const { data, success } = result.data
            if (success === 2) {
                setprojInCompleted(data)
            } else {
                setprojInCompleted([])
            }
        }
        const getProjOnProgress = async () => {
            const result = await axioslogin.get(`TmTableView/projectOnProgress/${empsecid}`)
            const { data, success } = result.data
            if (success === 2) {
                setprojOnProgress(data)
            } else {
                setprojOnProgress([])
            }
        }
        const getProjOverDue = async () => {
            const result = await axioslogin.get(`TmTableView/ProjectOverDue/${empsecid}`)
            const { data, success } = result.data
            if (success === 2) {
                setprojOverDue(data)
            } else {
                setprojOverDue([])
            }
        }
        const getGoalsCompleted = async () => {
            const result = await axioslogin.get(`TmTableView/goalsCompleted/${empsecid}`)
            const { data, success } = result.data
            if (success === 2) {
                setgoalsCompleted(data)
            } else {
                setgoalsCompleted([])
            }
        }
        const getGoalsInCompleted = async () => {
            const result = await axioslogin.get(`TmTableView/goalsInCompleted/${empsecid}`)
            const { data, success } = result.data
            if (success === 2) {
                setgoalsInCompleted(data)
            } else {
                setgoalsInCompleted([])
            }
        }
        const getGoalsOnProgress = async () => {
            const result = await axioslogin.get(`TmTableView/goalsOnProgress/${empsecid}`)
            const { data, success } = result.data
            if (success === 2) {
                setgoalsOnProgress(data)
            } else {
                setgoalsOnProgress([])
            }
        }
        const getGoalsOverDue = async () => {
            const result = await axioslogin.get(`TmTableView/goalsOverDue/${empsecid}`)
            const { data, success } = result.data
            if (success === 2) {
                setgoalsOverDue(data)
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
    }, [empsecid, tableCount, id,])




    return (
        dueFlag === 1 ? <TmOverDueTask
            tabledata={overdueTaskFlag === 1 ? overdues : overdueTaskFlag === 2 ? overdueToday :
                overdueTaskFlag === 3 ? overDueNextWeek : overdueTaskFlag === 4 ? overdueMonth : []}
            overDueHeading={overDueHeading} empsecid={empsecid} setDueFlag={setDueFlag} tableCount={tableCount} setTableCount={setTableCount} /> :

            flagTask === 1 ? <TmEmployeeTaskView
                tableDataEmployee={employeeTaskFlag === 1 ? employeeeCompleted : employeeTaskFlag === 2 ? employeeInComplete :
                    employeeTaskFlag === 3 ? employeeOnProgress : employeeTaskFlag === 4 ? employeeOnHold :
                        employeeTaskFlag === 5 ? employeeOnPending : employeeTaskFlag === 6 ? employeeOverDue : []}
                tableCount={tableCount} setTableCount={setTableCount} empTaskHeading={empTaskHeading} setflagTask={setflagTask} id={id} /> :

                deptFlag === 1 ? <TmDepartmentTaskView
                    deptTableData={departmentTaskFlag === 1 ? deptOnProgress : departmentTaskFlag === 2 ? deptOnHold :
                        departmentTaskFlag === 3 ? deptOnPending : departmentTaskFlag === 4 ? deptCompleted :
                            departmentTaskFlag === 5 ? deptInComplete : []}
                    deptTaskHeading={deptTaskHeading} setdeptFlag={setdeptFlag} tableCount={tableCount} setTableCount={setTableCount} /> :

                    prjFlag === 1 ? <TmProjectView
                        ProjTable={projectFlag === 1 ? projOnProgress : projectFlag === 2 ? projCompleted :
                            projectFlag === 3 ? projInCompleted : projectFlag === 4 ? projOverDue : []}
                        projectHead={projectHead} setprjFlag={setprjFlag} tableCount={tableCount} setTableCount={setTableCount} /> :

                        flagGoal === 1 ? <TmGoalsView
                            goalsTable={goalsFlag === 1 ? goalsOnProgress : goalsFlag === 2 ? goalsCompleted :
                                goalsFlag === 3 ? goalsInCompleted : goalsFlag === 4 ? goalsOverDue : []}
                            goalsHead={goalsHead} setflagGoal={setflagGoal} tableCount={tableCount} setTableCount={setTableCount} /> :
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
                                        bgcolor: '#E8F0F7',
                                        border: .1, borderColor: '#6699CC',
                                    }}>
                                        <CssVarsProvider>
                                            <Dropdown>
                                                <MenuButton
                                                    slotProps={{ root: { variant: 'plain', color: 'white' } }}
                                                    sx={{ borderRadius: 40, flexGrow: 1, width: '100%', height: 60, }}
                                                >
                                                    <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                                                        <Box sx={{ display: 'flex', flex: 1, alignItems: 'center', fontSize: 15, color: '#000C66', fontWeight: 500, }}>
                                                            <RestartAltOutlinedIcon />
                                                            <Box sx={{ display: 'flex', pl: 0.2 }} >OverDues</Box>
                                                        </Box>
                                                        <Avatar sx={{ bgcolor: 'white', color: '#000C66', fontWeight: 500 }}>{overdues.length}</Avatar>
                                                    </Box>
                                                </MenuButton>
                                                <Menu
                                                    variant="soft"
                                                    invertedColors
                                                    aria-labelledby="apps-menu-demo"
                                                    sx={{
                                                        '--List-padding': '0.5rem',
                                                        width: 250,
                                                        border: 1,
                                                        bgcolor: 'white',
                                                        borderColor: '#6699CC',
                                                        gridTemplateColumns: 'repeat(3, 100px)',
                                                    }}
                                                >
                                                    <MenuItem orientation="horizontal" sx={{
                                                        height: 2,
                                                        fontWeight: 400,
                                                        color: '#000C66'
                                                    }}
                                                        onClick={(e) => {
                                                            ViewOverDueTask(e)
                                                        }}>
                                                        <Avatar size='xs' sx={{ bgcolor: 'white' }}><UpdateOutlinedIcon /></Avatar>&nbsp;OverDue
                                                        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
                                                            {overdues.length}
                                                        </Box>
                                                    </MenuItem>
                                                    <ListDivider inset='gutter' sx={{ bgcolor: '#EAEAEA' }} />
                                                    <MenuItem orientation="horizontal" sx={{
                                                        height: 2,
                                                        fontWeight: 400,
                                                        color: '#000C66'
                                                    }}
                                                        onClick={(e) => {
                                                            ViewOverDueTodayTask(e)
                                                        }}>
                                                        <Avatar size='xs' sx={{ bgcolor: 'white' }}><TodayIcon /></Avatar>&nbsp;Today&apos;s
                                                        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
                                                            {overdueToday.length}
                                                        </Box>
                                                    </MenuItem>
                                                    <ListDivider inset='gutter' sx={{ bgcolor: '#EAEAEA' }} />
                                                    <MenuItem orientation="horizontal" sx={{
                                                        height: 2,
                                                        fontWeight: 400,
                                                        color: '#000C66'
                                                    }}
                                                        onClick={(e) => {
                                                            ViewOverDueWeekTask(e)
                                                        }}>
                                                        <Avatar size='xs' sx={{ bgcolor: 'white' }}><DateRangeIcon /></Avatar>&nbsp;Next Week&apos;s
                                                        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
                                                            {overDueNextWeek.length}
                                                        </Box>
                                                    </MenuItem>
                                                    <ListDivider inset='gutter' sx={{ bgcolor: '#EAEAEA' }} />
                                                    <MenuItem orientation="horizontal" sx={{
                                                        height: 2,
                                                        fontWeight: 400,
                                                        color: '#000C66'
                                                    }}
                                                        onClick={(e) => {
                                                            ViewOverDueMonthTask(e)
                                                        }}>
                                                        <Avatar size='xs' sx={{ bgcolor: 'white' }}><CalendarMonthIcon /></Avatar> &nbsp;Coming Month&apos;s
                                                        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
                                                            {overdueMonth.length}
                                                        </Box>
                                                    </MenuItem>

                                                </Menu>
                                            </Dropdown>
                                        </CssVarsProvider>
                                    </Box>

                                    <Box sx={{
                                        flex: 1,
                                        m: .5,
                                        borderRadius: 2,
                                        bgcolor: '#E8F0F7',
                                        border: .1, borderColor: '#6699CC',
                                    }}>
                                        <CssVarsProvider>
                                            <Dropdown>
                                                <MenuButton
                                                    slotProps={{ root: { variant: 'plain', color: 'white' } }}
                                                    sx={{ borderRadius: 40, flexGrow: 1, width: '100%', height: 60, }}
                                                >
                                                    <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                                                        <Box sx={{ display: 'flex', flex: 1, alignItems: 'center', fontSize: 15, color: '#000C66', fontWeight: 500, }}>
                                                            <PersonIcon />
                                                            <Box sx={{ display: 'flex', pl: 0.2 }} >My Task</Box>
                                                        </Box>
                                                        <Avatar sx={{ bgcolor: 'white', color: '#000C66', fontWeight: 500 }}>{employeeInComplete.length}</Avatar>
                                                    </Box>
                                                </MenuButton>
                                                <Menu
                                                    variant="soft"
                                                    invertedColors
                                                    aria-labelledby="apps-menu-demo"
                                                    sx={{
                                                        '--List-padding': '0.5rem',
                                                        width: 250,
                                                        border: 1,
                                                        bgcolor: 'white',
                                                        borderColor: '#6699CC',
                                                        gridTemplateColumns: 'repeat(3, 100px)',
                                                    }}
                                                >
                                                    <MenuItem orientation="horizontal" sx={{
                                                        height: 2,
                                                        fontWeight: 400,
                                                        color: '#000C66'
                                                    }}
                                                        onClick={(e) => {
                                                            ViewEmpOverDueTask(e)
                                                        }}>
                                                        <Avatar size='xs' sx={{ bgcolor: 'white' }}><UpdateOutlinedIcon /></Avatar>&nbsp;OverDue
                                                        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
                                                            {employeeOverDue.length}
                                                        </Box>
                                                    </MenuItem>
                                                    <ListDivider inset='gutter' sx={{ bgcolor: '#EAEAEA' }} />
                                                    <MenuItem orientation="horizontal" sx={{
                                                        height: 2,
                                                        fontWeight: 400,
                                                        color: '#000C66'
                                                    }}
                                                        onClick={(e) => {
                                                            ViewEmpOnProgressTask(e)
                                                        }}>
                                                        <Avatar size='xs' sx={{ bgcolor: 'white' }}><RotateRightIcon /></Avatar>&nbsp;On Progress
                                                        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
                                                            {employeeOnProgress.length}
                                                        </Box>
                                                    </MenuItem>
                                                    <ListDivider inset='gutter' sx={{ bgcolor: '#EAEAEA' }} />
                                                    <MenuItem orientation="horizontal" sx={{
                                                        height: 2,
                                                        fontWeight: 400,
                                                        color: '#000C66'
                                                    }}
                                                        onClick={(e) => {
                                                            ViewOnHoldTask(e)
                                                        }}>
                                                        <Avatar size='xs' sx={{ bgcolor: 'white' }}><LockResetIcon /></Avatar>&nbsp;On hold
                                                        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
                                                            {employeeOnHold.length}
                                                        </Box>
                                                    </MenuItem>
                                                    <ListDivider inset='gutter' sx={{ bgcolor: '#EAEAEA' }} />
                                                    <MenuItem orientation="horizontal" sx={{
                                                        height: 2,
                                                        fontWeight: 400,
                                                        color: '#000C66'
                                                    }}
                                                        onClick={(e) => {
                                                            ViewEmpPendingTask(e)
                                                        }}>
                                                        <Avatar size='xs' sx={{ bgcolor: 'white' }}><RunningWithErrorsIcon /></Avatar>&nbsp;Pending
                                                        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
                                                            {employeeOnPending.length}
                                                        </Box>
                                                    </MenuItem>
                                                    <ListDivider inset='gutter' sx={{ bgcolor: '#EAEAEA' }} />
                                                    <MenuItem orientation="horizontal" sx={{
                                                        height: 2,
                                                        fontWeight: 400,
                                                        color: '#000C66'
                                                    }}
                                                        onClick={(e) => {
                                                            ViewEmpInCompletedTask(e)
                                                        }}>
                                                        <Avatar size='xs' sx={{ bgcolor: 'white' }}><RotateRightIcon /></Avatar> &nbsp;InCompleted
                                                        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
                                                            {employeeInComplete.length}
                                                        </Box>
                                                    </MenuItem>
                                                    <ListDivider inset='gutter' sx={{ bgcolor: '#EAEAEA' }} />
                                                    <MenuItem orientation="horizontal" sx={{
                                                        height: 2,
                                                        fontWeight: 400,
                                                        color: '#000C66'
                                                    }}
                                                        onClick={(e) => {
                                                            ViewEmpCompletedTask(e)
                                                        }}>
                                                        <Avatar size='xs' sx={{ bgcolor: 'white' }}><CheckCircleOutlinedIcon /></Avatar> &nbsp;Completed
                                                        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
                                                            {employeeeCompleted.length}
                                                        </Box>
                                                    </MenuItem>

                                                </Menu>
                                            </Dropdown>
                                        </CssVarsProvider>
                                    </Box>

                                    <Box sx={{
                                        flex: 1,
                                        m: .5,
                                        borderRadius: 2,
                                        bgcolor: '#E8F0F7',
                                        border: .1, borderColor: '#6699CC',
                                    }}>
                                        <CssVarsProvider>
                                            <Dropdown>
                                                <MenuButton
                                                    slotProps={{ root: { variant: 'plain', color: 'white' } }}
                                                    sx={{ borderRadius: 40, flexGrow: 1, width: '100%', height: 60, }}
                                                >
                                                    <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                                                        <Box sx={{ display: 'flex', flex: 1, alignItems: 'center', fontSize: 15, color: '#000C66', fontWeight: 500, }}>
                                                            <AssignmentRoundedIcon />
                                                            <Box sx={{ display: 'flex', pl: 0.2 }} >Department Task</Box>
                                                        </Box>
                                                        <Avatar sx={{ bgcolor: 'white', color: '#000C66', fontWeight: 500 }}>{deptInComplete.length}</Avatar>
                                                    </Box>
                                                </MenuButton>
                                                <Menu
                                                    variant="soft"
                                                    invertedColors
                                                    aria-labelledby="apps-menu-demo"
                                                    sx={{
                                                        '--List-padding': '0.5rem',
                                                        width: 250,
                                                        border: 1,
                                                        bgcolor: 'white',
                                                        borderColor: '#6699CC',
                                                        gridTemplateColumns: 'repeat(3, 100px)',
                                                    }}
                                                >

                                                    <MenuItem orientation="horizontal" sx={{
                                                        height: 2,
                                                        fontWeight: 400,
                                                        color: '#000C66'
                                                    }}
                                                        onClick={(e) => {
                                                            ViewDeptOnProgressTask(e)
                                                        }}>
                                                        <Avatar size='xs' sx={{ bgcolor: 'white' }}>  <RotateRightIcon /></Avatar>&nbsp;On Progress
                                                        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
                                                            {deptOnProgress.length}
                                                        </Box>
                                                    </MenuItem>
                                                    <ListDivider inset='gutter' sx={{ bgcolor: '#EAEAEA' }} />
                                                    <MenuItem orientation="horizontal" sx={{
                                                        height: 2,
                                                        fontWeight: 400,
                                                        color: '#000C66'
                                                    }}
                                                        onClick={(e) => {
                                                            ViewDeptOnHold(e)
                                                        }}>
                                                        <Avatar size='xs' sx={{ bgcolor: 'white' }}>  <LockResetIcon /></Avatar>&nbsp;On hold
                                                        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
                                                            {deptOnHold.length}
                                                        </Box>
                                                    </MenuItem>
                                                    <ListDivider inset='gutter' sx={{ bgcolor: '#EAEAEA' }} />
                                                    <MenuItem orientation="horizontal" sx={{
                                                        height: 2,
                                                        fontWeight: 400,
                                                        color: '#000C66'
                                                    }}
                                                        onClick={(e) => {
                                                            ViewDeptPending(e)
                                                        }}>
                                                        <Avatar size='xs' sx={{ bgcolor: 'white' }}><RunningWithErrorsIcon /> </Avatar>&nbsp;Pending
                                                        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
                                                            {deptOnPending.length}
                                                        </Box>
                                                    </MenuItem>
                                                    <ListDivider inset='gutter' sx={{ bgcolor: '#EAEAEA' }} />
                                                    <MenuItem orientation="horizontal" sx={{
                                                        height: 2,
                                                        fontWeight: 400,
                                                        color: '#000C66'
                                                    }}
                                                        onClick={(e) => {
                                                            ViewDeptInCompltTask(e)
                                                        }}>
                                                        <Avatar size='xs' sx={{ bgcolor: 'white' }}>  <RotateRightIcon /></Avatar>&nbsp;InCompleted
                                                        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
                                                            {deptInComplete.length}
                                                        </Box>
                                                    </MenuItem>
                                                    <ListDivider inset='gutter' sx={{ bgcolor: '#EAEAEA' }} />
                                                    <MenuItem orientation="horizontal" sx={{
                                                        height: 2,
                                                        fontWeight: 400,
                                                        color: '#000C66'
                                                    }}
                                                        onClick={(e) => {
                                                            ViewDeptCompltTask(e)
                                                        }}>
                                                        <Avatar size='xs' sx={{ bgcolor: 'white' }}><CheckCircleOutlinedIcon /></Avatar>&nbsp;Completed
                                                        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
                                                            {deptCompleted.length}
                                                        </Box>
                                                    </MenuItem>

                                                </Menu>
                                            </Dropdown>
                                        </CssVarsProvider>
                                    </Box>

                                    <Box sx={{
                                        flex: 1,
                                        m: .5,
                                        borderRadius: 2,
                                        bgcolor: '#E8F0F7',
                                        border: .1, borderColor: '#6699CC',
                                    }}>
                                        <CssVarsProvider>
                                            <Dropdown>
                                                <MenuButton
                                                    slotProps={{ root: { variant: 'plain', color: 'white' } }}
                                                    sx={{ borderRadius: 40, flexGrow: 1, width: '100%', height: 60, }}
                                                >
                                                    <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                                                        <Box sx={{ display: 'flex', flex: 1, alignItems: 'center', fontSize: 15, color: '#000C66', fontWeight: 500, }}>
                                                            <AlignHorizontalRightRoundedIcon />
                                                            <Box sx={{ display: 'flex', pl: 0.2 }} >Projects</Box>
                                                        </Box>
                                                        <Avatar sx={{ bgcolor: 'white', color: '#000C66', fontWeight: 500 }}>{projInCompleted.length}</Avatar>
                                                    </Box>
                                                </MenuButton>
                                                <Menu
                                                    variant="soft"
                                                    invertedColors
                                                    aria-labelledby="apps-menu-demo"
                                                    sx={{
                                                        '--List-padding': '0.5rem',
                                                        width: 250,
                                                        border: 1,
                                                        bgcolor: 'white',
                                                        borderColor: '#6699CC',
                                                        gridTemplateColumns: 'repeat(3,100px)',
                                                    }}
                                                >
                                                    <MenuItem orientation="horizontal" sx={{
                                                        height: 2,
                                                        fontWeight: 400,
                                                        color: '#000C66'
                                                    }}
                                                        onClick={(e) => {
                                                            ViewProjectOverDue(e)
                                                        }}>
                                                        <Avatar size='xs' sx={{ bgcolor: 'white' }}>  <UpdateOutlinedIcon /></Avatar>&nbsp;OverDue
                                                        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
                                                            {projOverDue.length}
                                                        </Box>
                                                    </MenuItem>
                                                    <ListDivider inset='gutter' sx={{ bgcolor: '#EAEAEA' }} />
                                                    <MenuItem orientation="horizontal" sx={{
                                                        height: 2,
                                                        fontWeight: 400,
                                                        color: '#000C66'
                                                    }}
                                                        onClick={(e) => {
                                                            ViewProjectInComplete(e)
                                                        }}>
                                                        <Avatar size='xs' sx={{ bgcolor: 'white' }}>  <RotateRightIcon /></Avatar>&nbsp;InCompleted
                                                        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
                                                            {projInCompleted.length}
                                                        </Box>
                                                    </MenuItem>
                                                    <ListDivider inset='gutter' sx={{ bgcolor: '#EAEAEA' }} />
                                                    <MenuItem orientation="horizontal" sx={{
                                                        height: 2,
                                                        fontWeight: 400,
                                                        color: '#000C66'
                                                    }}
                                                        onClick={(e) => {
                                                            ViewProjectComplete(e)
                                                        }}>
                                                        <Avatar size='xs' sx={{ bgcolor: 'white' }}><CheckCircleOutlinedIcon /></Avatar>&nbsp;Completed
                                                        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
                                                            {projCompleted.length}
                                                        </Box>
                                                    </MenuItem>
                                                </Menu>
                                            </Dropdown>
                                        </CssVarsProvider>
                                    </Box>

                                    <Box sx={{
                                        flex: 1,
                                        m: .5,
                                        borderRadius: 2,
                                        bgcolor: '#E8F0F7',
                                        border: .1, borderColor: '#6699CC',
                                    }}>
                                        <CssVarsProvider>
                                            <Dropdown>
                                                <MenuButton
                                                    slotProps={{ root: { variant: 'plain', color: 'white' } }}
                                                    sx={{ borderRadius: 40, flexGrow: 1, width: '100%', height: 60, }}
                                                >
                                                    <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                                                        <Box sx={{ display: 'flex', flex: 1, alignItems: 'center', fontSize: 15, color: '#000C66', fontWeight: 500, }}>
                                                            <TrackChangesIcon />
                                                            <Box sx={{ display: 'flex', pl: 0.2 }} >Goals</Box>
                                                        </Box>
                                                        <Avatar sx={{ bgcolor: 'white', color: '#000C66', fontWeight: 500 }}>{goalsInCompleted.length}</Avatar>
                                                    </Box>
                                                </MenuButton>
                                                <Menu
                                                    variant="soft"
                                                    invertedColors
                                                    aria-labelledby="apps-menu-demo"
                                                    sx={{
                                                        '--List-padding': '0.5rem',
                                                        width: 250,
                                                        border: 1,
                                                        bgcolor: 'white',
                                                        borderColor: '#6699CC',
                                                        gridTemplateColumns: 'repeat(3, 100px)',
                                                    }}
                                                >
                                                    <MenuItem orientation="horizontal" sx={{
                                                        height: 2,
                                                        fontWeight: 400,
                                                        color: '#000C66'
                                                    }}
                                                        onClick={(e) => {
                                                            ViewGoalsOverdue(e)
                                                        }}>
                                                        <Avatar size='xs' sx={{ bgcolor: 'white' }}>  <UpdateOutlinedIcon /></Avatar>&nbsp;OverDue
                                                        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
                                                            {goalsOverDue.length}
                                                        </Box>
                                                    </MenuItem>
                                                    <ListDivider inset='gutter' sx={{ bgcolor: '#EAEAEA' }} />
                                                    <MenuItem orientation="horizontal" sx={{
                                                        height: 2,
                                                        fontWeight: 400,
                                                        color: '#000C66'
                                                    }}
                                                        onClick={(e) => {
                                                            ViewGoalsInComplete(e)
                                                        }}>
                                                        <Avatar size='xs' sx={{ bgcolor: 'white' }}>  <RotateRightIcon /></Avatar>&nbsp;InCompleted
                                                        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
                                                            {goalsInCompleted.length}
                                                        </Box>
                                                    </MenuItem>
                                                    <ListDivider inset='gutter' sx={{ bgcolor: '#EAEAEA' }} />
                                                    <MenuItem orientation="horizontal" sx={{
                                                        height: 2,
                                                        fontWeight: 400,
                                                        color: '#000C66'
                                                    }}
                                                        onClick={(e) => {
                                                            ViewGoalsComplete(e)
                                                        }}>
                                                        <Avatar size='xs' sx={{ bgcolor: 'white' }}><CheckCircleOutlinedIcon /></Avatar>&nbsp;Completed
                                                        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
                                                            {goalsCompleted.length}
                                                        </Box>
                                                    </MenuItem>

                                                </Menu>
                                            </Dropdown>
                                        </CssVarsProvider>
                                    </Box>
                                </Box>

                                <Box sx={{ border: 1, borderRadius: 2, borderColor: '#6699CC', maxHeight: 750, p: .5, mx: .5 }}>
                                    <DashboardTabs />
                                </Box>
                                <Box sx={{ height: 3 }}></Box>
                            </Box >
    )
}

export default memo(TmDashboardMain)