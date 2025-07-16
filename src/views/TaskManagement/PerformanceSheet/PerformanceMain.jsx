import { Box, CircularProgress, CssVarsProvider, Typography } from '@mui/joy'
import { Paper } from '@mui/material'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import AutoGraphSharpIcon from '@mui/icons-material/AutoGraphSharp'
import { useDispatch, useSelector } from 'react-redux'
import { endOfMonth, endOfYear, format, isSameMonth, parse, parseISO, startOfYear } from 'date-fns'
import { startOfMonth } from 'date-fns/fp'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { axioslogin } from 'src/views/Axios/Axios'
import PerformProjectProgres from '../PerformanceMenu/PerformProjectProgres'
import PerfomTaskProgress from '../PerformanceMenu/PerfomTaskProgress'
import TMemployeeSelect from 'src/views/CommonSelectCode/TMemployeeSelect'
import { getDepartSecemployee } from 'src/redux/actions/EmpNameDeptSect.action'
import PersonIcon from '@mui/icons-material/Person'
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static'
import AccountTreeIcon from '@mui/icons-material/AccountTree'
import DeviceHubSharpIcon from '@mui/icons-material/DeviceHubSharp'
import Inputcomponent from '../TaskComponents/Inputcomponent'

const PerformanceMain = () => {
  const dispatch = useDispatch()
  const empid = useSelector(state => {
    return state.LoginUserData.empid
  })
  const empsecid = useSelector(state => {
    return state.LoginUserData.empsecid
  })
  const secName = useSelector(state => {
    return state.LoginUserData.empdeptsec
  })
  const deeptName = useSelector(state => {
    return state.LoginUserData.empdeptname
  })
  const empdept = useSelector(state => {
    return state.LoginUserData.empdept
  })

  useEffect(() => {
    dispatch(getDepartSecemployee(empsecid))
  }, [dispatch, empsecid])
  let capdeeptName = deeptName
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
  let capsecName = secName
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
  const [imageUrls, setImageUrls] = useState([])
  const [employee, setEmployee] = useState(empid)
  const [employeeData, setemployeeData] = useState([])
  const [empProject, setEmpProject] = useState([])
  const [searchMonthAndYear, setSearchMonthAndYear] = useState(format(new Date(), 'yyyy-MM'))
  const [totalTaskCount, setTotalTaskCount] = useState(0)
  const [completedTaskCount, setCompletedTaskCount] = useState(0)
  const [totalComplaintCount, setTotalComplaintCount] = useState(0)
  const [ReOpenedComplaints, setReOpenedComplaints] = useState(0)
  const [deptPendingComplaints, setdeptPendingComplaints] = useState(0)
  const [deptTodays, setdeptTodays] = useState(0)
  const [deptRectiCompl, setDeptRectiCompl] = useState(0)
  const [deptVerified, setDeptVerified] = useState(0)
  const [deptOverdueTask, setDeptOverdueTask] = useState(0)
  const [deptCompletedToday, setDeptCompletedToday] = useState(0)
  const [emplmainTasks, setEmplmainTasks] = useState([])
  const [empComplaintsToday, setEmpComplaintsToday] = useState(0)
  const [empOerdueToday, setEmpOerdueToday] = useState(0)
  const [empCompltTodayTask, setEmpCompltTodayTask] = useState(0)
  const [taskPerformance, setTaskPerformance] = useState(0)
  const [empTotalComplaints, setEmpTotalComplaints] = useState(0)
  const [empRctiCompl, setEmpRctiCompl] = useState(0)
  const [emplPendingComplints, setEmplPendingComplints] = useState(0)
  const [empReopendCompln, setEmpReopendCompln] = useState(0)
  const [empVeriComplt, setEmpVeriComplt] = useState(0)
  const [empRctfytodayComplt, setEmpRctTodayCmplt] = useState(0)
  const [empCompletedTask, setEmpCompletedTask] = useState(0)
  const [complPerfm, setComplPerfm] = useState(0)
  const [employeeDesignation, setEmployeeDesignation] = useState('')
  const [employeeName, setEmployeeName] = useState('')
  const [empTotalComplWithouthold, setEmpTotalComplWithouthold] = useState(0)
  let employeeNamee = employeeName
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
  let designation = employeeDesignation
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
  const [EmpTotalWithouthold, setEmpTotalWithouthold] = useState(0)
  const [AdjustedCompleteion, setAdjustedCompleteion] = useState(0)
  const [emptotCompltedComplaints, setEmptotCompltedComplaints] = useState(0)
  const TotalPerformance =
    EmpTotalWithouthold + empTotalComplWithouthold === 0
      ? 0
      : ((AdjustedCompleteion + emptotCompltedComplaints) / (EmpTotalWithouthold + empTotalComplWithouthold)) * 100
  const MonthlyPerformance = Number.isInteger(TotalPerformance)
    ? Number(TotalPerformance.toFixed(0))
    : Number(TotalPerformance.toFixed(2))
  const [totalonHold, setTotalonHold] = useState(0)
  const [totalemployeeOverDue, setTotalemployeeOverDue] = useState(0)
  const [emplPendingComplintsMonth, setEmplPendingComplintsMonth] = useState(0)
  const [empltOnHoldComplints, setEmpltOnHoldComplints] = useState(0)
  const [deptOnHoldTask, setDeptOnHoldTask] = useState(0)
  const [deptTotOverdue, setDeptTotOverdue] = useState(0)
  const [deptTotOnHoldComplnt, setDeptTotOnHoldComplnt] = useState(0)
  const [deptTotPendComplt, setDeptTotPendComplt] = useState(0)
  const [monthName, setMonthName] = useState('')
  const [deptVerifiedToday, setDeptVerifiedToday] = useState(0)
  const [empVerifiedToday, setEmpverifiedToday] = useState(0)
  const [empPendingToday, setEmpPendingToday] = useState(0)
  const [deptRectfToday, setdeptRectfToday] = useState(0)
  const [pendingTodaydept, setpendingTodaydept] = useState(0)
  const [empTotalTask, setEmpTotalTask] = useState(0)

  useEffect(() => {
    const parsedDate = parse(searchMonthAndYear, 'yyyy-MM', new Date())
    const month = format(parsedDate, 'MMMM')
    setMonthName(month)
  }, [searchMonthAndYear])

  const monthChange = useCallback(e => {
    const value = e.target.value
    setSearchMonthAndYear(value)
  }, [])

  const getallemployee = useMemo(() => {
    return {
      sec_id: empsecid
    }
  }, [empsecid])

  const getemplDetails = useMemo(() => {
    return {
      em_id: employee
    }
  }, [employee])

  useEffect(() => {
    const getallemployeeDetails = async () => {
      const result = await axioslogin.post('/TmGraph/getAllEmployees', getallemployee)
      const { success, data } = result.data
      if (success === 2) {
        setemployeeData(data)
      }
    }
    getallemployeeDetails(getallemployee)
  }, [getallemployee])

  useEffect(() => {
    const getemp = async () => {
      const result = await axioslogin.post('/TmGraph/getEmployeeDetails', getemplDetails)
      const { success, data } = result.data
      if (success === 2) {
        const { em_name, desg_name } = data[0]
        setEmployeeDesignation(desg_name)
        setEmployeeName(em_name)
      }
    }
    getemp(getemplDetails)
  }, [getemplDetails])

  const handlePrev = () => {
    setEmployee(prevEmployee => {
      const currentIndex = employeeData.findIndex(emp => emp.em_id === prevEmployee)
      const prevIndex = (currentIndex - 1 + employeeData.length) % employeeData.length
      return employeeData[prevIndex].em_id
    })
  }

  const handleNext = () => {
    setEmployee(prevEmployee => {
      const currentIndex = employeeData.findIndex(emp => emp.em_id === prevEmployee)
      const nextIndex = (currentIndex + 1) % employeeData.length
      return employeeData[nextIndex].em_id
    })
  }

  const searchTaskData = useMemo(() => {
    return {
      from: format(startOfMonth(new Date(searchMonthAndYear)), 'yyyy-MM-dd 00:00:00'),
      to: format(endOfMonth(new Date(searchMonthAndYear)), 'yyyy-MM-dd 23:59:59'),
      tm_task_dept_sec: empsecid
    }
  }, [searchMonthAndYear, empsecid])

  const searchComplaintData = useMemo(() => {
    return {
      from: format(startOfMonth(new Date(searchMonthAndYear)), 'yyyy-MM-dd 00:00:00'),
      to: format(endOfMonth(new Date(searchMonthAndYear)), 'yyyy-MM-dd 23:59:59'),
      complaint_deptslno: empdept
    }
  }, [searchMonthAndYear, empdept])

  const searchEmpProject = useMemo(() => {
    return {
      from: format(startOfYear(new Date(searchMonthAndYear)), 'yyyy-MM-dd 00:00:00'),
      to: format(endOfYear(new Date(searchMonthAndYear)), 'yyyy-MM-dd 23:59:59'),
      tm_assigne_emp: empid
    }
  }, [searchMonthAndYear, empid])

  const isPastDue = tm_task_due_date => {
    const today = new Date()
    const due = new Date(tm_task_due_date)
    return due < today
  }

  useEffect(() => {
    const getAllTask = async () => {
      const result = await axioslogin.post('/TmGraph/getDepttaskfromtodate', searchTaskData)
      const { success, data } = result.data
      if (success === 2) {
        const totalTasks = data.length
        const completedTasks = data.filter(item => item.tm_task_status === 1).length
        const overdueToday = data.filter(item => item.tm_task_status !== 1 && isToday(item.tm_task_due_date)).length
        setTotalTaskCount(totalTasks)
        setCompletedTaskCount(completedTasks)
        setDeptOverdueTask(overdueToday)
      } else {
        setTotalTaskCount(0)
        setCompletedTaskCount(0)
        setDeptOverdueTask(0)
      }
    }
    getAllTask(searchTaskData)
  }, [searchTaskData])

  //for dept

  useEffect(() => {
    const getAllComplaints = async () => {
      const result = await axioslogin.post('/TmGraph/getDeptComplaintsfromtodate', searchComplaintData)
      const { success, data } = result.data
      if (success === 2) {
        const totalComplaints = data.length
        const RectifiedComplints = data.filter(item => item.cm_rectify_status === 'R').length
        const VerifiedComplints = data.filter(item => item.cm_rectify_status === 'V').length
        const ReOpenedComplaints = data.filter(item => item.reopen_cm_slno !== null).length
        const PendingComplaints = data.filter(
          item =>
            (item.cm_rectify_status !== 'R' && item.cm_rectify_status !== 'O' && item.cm_rectify_status !== 'V') ||
            item.cm_rectify_status === null
        )
        const pendingTodaydept = data.filter(
          item =>
            ((item.cm_rectify_status !== 'R' && item.cm_rectify_status !== 'V') || item.cm_rectify_status === null) &&
            isToday(item.compalint_date)
        )
        const todaysComplaints = data.filter(item => isToday(item.compalint_date))
        const rectifiedToday = data.filter(item => item.cm_rectify_status === 'R' && isToday(item.cm_rectify_time))
        const verifiedToday = data.filter(item => item.cm_rectify_status === 'V' && isToday(item.cm_verfy_time))

        setTotalComplaintCount(totalComplaints)
        setReOpenedComplaints(ReOpenedComplaints)
        setdeptPendingComplaints(PendingComplaints.length)
        setdeptTodays(todaysComplaints.length)
        setDeptRectiCompl(RectifiedComplints)
        setDeptVerified(VerifiedComplints)
        setDeptVerifiedToday(verifiedToday.length)
        setdeptRectfToday(rectifiedToday.length)
        setpendingTodaydept(pendingTodaydept.length)
      } else {
        setTotalComplaintCount(0)
        setReOpenedComplaints(0)
        setdeptPendingComplaints(0)
        setdeptTodays(0)
        setDeptRectiCompl(0)
        setDeptVerified(0)
        setDeptVerifiedToday(0)
        setdeptRectfToday(0)
        setpendingTodaydept(0)
      }
    }
    getAllComplaints(searchComplaintData)
  }, [searchComplaintData])

  useEffect(() => {
    const getAllProjectTask = async () => {
      const result = await axioslogin.post('/TmGraph/getProjectsfromtodate', searchEmpProject)
      const { success, data } = result.data
      if (success === 2) {
        setEmpProject(data)
      } else {
        setEmpProject([])
      }
    }
    getAllProjectTask(searchEmpProject)
  }, [searchEmpProject])

  const searchEmployeeTaskData = useMemo(() => {
    return {
      from: format(startOfMonth(new Date(searchMonthAndYear)), 'yyyy-MM-dd 00:00:00'),
      to: format(endOfMonth(new Date(searchMonthAndYear)), 'yyyy-MM-dd 23:59:59'),
      tm_assigne_emp: employee
    }
  }, [searchMonthAndYear, employee])

  const searchEmployeeComplaintData = useMemo(() => {
    return {
      from: format(startOfMonth(new Date(searchMonthAndYear)), 'yyyy-MM-dd 00:00:00'),
      to: format(endOfMonth(new Date(searchMonthAndYear)), 'yyyy-MM-dd 23:59:59'),
      assigned_emp: employee
    }
  }, [searchMonthAndYear, employee])

  useEffect(() => {
    const getDeptMasterTable = async () => {
      const result = await axioslogin.get(`/TmTableView/departmentCompleted/${empsecid}`)
      const { success, data } = result.data
      if (data.length !== 0) {
        if (success === 2) {
          const deptcompletedToday = data.filter(
            item => item.tm_task_status === 1 && isToday(item.tm_complete_date)
          ).length
          setDeptCompletedToday(deptcompletedToday)
        } else {
          setDeptCompletedToday(0)
        }
      } else {
        setDeptCompletedToday(0)
      }
    }
    getDeptMasterTable(empsecid)
  }, [empsecid])

  useEffect(() => {
    const getEmpOnHold = async () => {
      const result = await axioslogin.get(`/TmTableView/employeeOnHold/${employee}`)
      const { success, data } = result.data
      if (success === 2) {
        const totalonHold = data.length
        setTotalonHold(totalonHold)
      } else {
        setTotalonHold(0)
      }
    }
    getEmpOnHold(employee)
  }, [employee])

  useEffect(() => {
    const getemployeeOverDue = async () => {
      const result = await axioslogin.get(`/TmTableView/employeeOverDue/${employee}`)
      const { success, data } = result.data
      if (success === 2) {
        const employeeOverDue = data.length
        const overdueToday = data.filter(item => item.tm_task_status !== 1 && isToday(item.tm_task_due_date))
        setTotalemployeeOverDue(employeeOverDue)
        setEmpOerdueToday(overdueToday.length)
      } else {
        setTotalemployeeOverDue(0)
        setEmpOerdueToday(0)
      }
    }
    getemployeeOverDue(employee)
  }, [employee])

  useEffect(() => {
    const getPendingComplaints = async () => {
      const result = await axioslogin.get(`/TmGraph/employeePendingcompl/${employee}`)
      const { success, data } = result.data
      if (success === 2) {
        const totalPending = data.length
        setEmplPendingComplints(totalPending)
      } else {
        setEmplPendingComplints(0)
      }
    }
    getPendingComplaints(employee)
  }, [employee])

  useEffect(() => {
    const getOnHoldComplaints = async () => {
      const result = await axioslogin.get(`/TmGraph/employeeOnholdcompl/${employee}`)
      const { success, data } = result.data
      if (success === 2) {
        const OnHoldComplints = data.length
        setEmpltOnHoldComplints(OnHoldComplints)
      } else {
        setEmpltOnHoldComplints(0)
      }
    }
    getOnHoldComplaints(employee)
  }, [employee])

  useEffect(() => {
    const getdeptOnHoldTask = async () => {
      const result = await axioslogin.get(`TmTableView/departmentOnHold/${empsecid}`)
      const { success, data } = result.data
      if (success === 2) {
        const OnHoldTask = data.length
        setDeptOnHoldTask(OnHoldTask)
      } else {
        setDeptOnHoldTask(0)
      }
    }
    getdeptOnHoldTask(empsecid)
  }, [empsecid])

  useEffect(() => {
    const getdeptTotOverdueTask = async () => {
      const result = await axioslogin.get(`/TmTableView/departmentOverDue/${empsecid}`)
      const { success, data } = result.data
      if (success === 2) {
        const deeptTotOverdue = data.length
        setDeptTotOverdue(deeptTotOverdue)
      } else {
        setDeptTotOverdue(0)
      }
    }
    getdeptTotOverdueTask(empsecid)
  }, [empsecid])

  useEffect(() => {
    const getdeptOnHoldComplnt = async () => {
      const result = await axioslogin.get(`/TmGraph/deptOnholdcompl/${empdept}`)
      const { success, data } = result.data
      if (success === 2) {
        const OnHoldTaskCmplt = data.length
        setDeptTotOnHoldComplnt(OnHoldTaskCmplt)
      } else {
        setDeptTotOnHoldComplnt(0)
      }
    }
    getdeptOnHoldComplnt(empdept)
  }, [empdept])

  useEffect(() => {
    const getdeptTotPendingCompltn = async () => {
      const result = await axioslogin.get(`/TmGraph/deptPendingcompl/${empdept}`)
      const { success, data } = result.data
      if (success === 2) {
        const deeptTotPendCompl = data.length
        setDeptTotPendComplt(deeptTotPendCompl)
      } else {
        setDeptTotPendComplt(0)
      }
    }
    getdeptTotPendingCompltn(empdept)
  }, [empdept])

  useEffect(() => {
    const getMasterTable = async () => {
      const result = await axioslogin.get(`/TmTableView/employeeCompleted/${employee}`)
      const { success, data } = result.data
      if (data.length !== 0) {
        if (success === 2) {
          const completedToday = data.filter(item => item.tm_task_status === 1 && isToday(item.tm_complete_date)).length
          setEmpCompltTodayTask(completedToday)
        } else {
          setEmpCompltTodayTask(0)
        }
      } else {
        setEmpCompltTodayTask(0)
      }
    }
    getMasterTable(employee)
  }, [employee])

  useEffect(() => {
    const getEmployeeTask = async () => {
      const result = await axioslogin.post('/TmGraph/getAlltaskfromtodate', searchEmployeeTaskData)
      const { success, data } = result.data
      if (success === 2) {
        const mainTaskData = data.filter(item => item.main_task_slno === null)
        const totalTasks = data.length
        const completedTasks = data.filter(
          item =>
            item.tm_task_status === 1 && isSameMonth(parseISO(item.tm_complete_date), new Date(searchMonthAndYear))
        ).length
        const onHoldTasks = data.filter(item => isPastDue(item.tm_task_due_date) && item.tm_task_status === 3).length
        const totalWithOutHold = totalTasks - onHoldTasks
        const completedTasksWoutchangingDuedate = data.filter(
          item => item.tm_task_status === 1 && item.tm_mast_duedate_count === null
        ).length
        const penaltyCounts = {}
        data.forEach(item => {
          if (item.tm_task_status === 1 && item.tm_mast_duedate_count !== null) {
            const count = item.tm_mast_duedate_count
            if (!penaltyCounts[count]) {
              penaltyCounts[count] = 0
            }
            penaltyCounts[count]++
          }
        })
        let adjustedCompletion = completedTasksWoutchangingDuedate
        Object.keys(penaltyCounts).forEach(count => {
          const countInt = parseInt(count)
          const penalty = data.find(item => item.tm_mast_duedate_count === countInt)?.reschedule_pecent || 0
          adjustedCompletion += penaltyCounts[count] * ((100 - penalty) / 100)
        })
        const PerformanceProgress =
          adjustedCompletion + totalWithOutHold === 0 ? 0 : (adjustedCompletion / totalWithOutHold) * 100
        setAdjustedCompleteion(adjustedCompletion)
        setTaskPerformance(
          Number.isInteger(PerformanceProgress) ? PerformanceProgress.toFixed(0) : PerformanceProgress.toFixed(2)
        )
        setEmplmainTasks(mainTaskData)
        setEmpCompletedTask(completedTasks)
        setEmpTotalWithouthold(totalWithOutHold)
        setEmpTotalTask(totalTasks)
      } else {
        setEmplmainTasks([])
        setEmpCompletedTask(0)
        setTaskPerformance(0)
        setEmpTotalWithouthold(0)
        setAdjustedCompleteion(0)
        setEmpTotalTask(0)
      }
    }
    getEmployeeTask(searchEmployeeTaskData)
  }, [searchEmployeeTaskData, searchMonthAndYear])

  const isToday = date => {
    const today = new Date()
    const ExDate = new Date(date)
    return (
      ExDate.getDate() === today.getDate() &&
      ExDate.getMonth() === today.getMonth() &&
      ExDate.getFullYear() === today.getFullYear()
    )
  }

  useEffect(() => {
    const getEmployeeComplaints = async () => {
      const result = await axioslogin.post('/TmGraph/getAllComplaintsfromtodate', searchEmployeeComplaintData)
      const { success, data } = result.data
      if (success === 2) {
        const totalComplaints = data.length
        const RectifiedComplints = data.filter(item => item.cm_rectify_status === 'R').length
        const VerifiedComplints = data.filter(item => item.cm_rectify_status === 'V').length
        const emptotCompltedComplaints = RectifiedComplints + VerifiedComplints
        const OnholdComplaints = data.filter(item => item.cm_rectify_status === 'O').length
        const ReOpenedComplaints = data.filter(item => item.reopen_cm_slno !== null)
        const Pending = data.filter(
          item =>
            (item.cm_rectify_status !== 'R' && item.cm_rectify_status !== 'O' && item.cm_rectify_status !== 'V') ||
            item.cm_rectify_status === null
        )

        const pendingToday = data.filter(
          item =>
            ((item.cm_rectify_status !== 'R' && item.cm_rectify_status !== 'V') || item.cm_rectify_status === null) &&
            isToday(item.compalint_date)
        )
        const complaintsToday = data.filter(item => isToday(item.compalint_date))
        const rectifiedToday = data.filter(item => item.cm_rectify_status === 'R' && isToday(item.cm_rectify_time))
        const verifiedToday = data.filter(item => item.cm_rectify_status === 'V' && isToday(item.cm_rectify_time))
        const totallWithoutHold = totalComplaints - OnholdComplaints
        const ComplaintPerformnce =
          emptotCompltedComplaints + totallWithoutHold === 0 ? 0 : (emptotCompltedComplaints / totallWithoutHold) * 100
        setEmpTotalComplaints(totalComplaints)
        setEmpRctiCompl(RectifiedComplints)
        setEmplPendingComplintsMonth(Pending.length)
        setEmpReopendCompln(ReOpenedComplaints.length)
        setEmpComplaintsToday(complaintsToday.length)
        setEmpRctTodayCmplt(rectifiedToday.length)
        setEmpVeriComplt(VerifiedComplints)
        setEmpverifiedToday(verifiedToday.length)
        setComplPerfm(
          Number.isInteger(ComplaintPerformnce) ? ComplaintPerformnce.toFixed(0) : ComplaintPerformnce.toFixed(2)
        )
        setEmpPendingToday(pendingToday.length)
        setEmptotCompltedComplaints(emptotCompltedComplaints)
        setEmpTotalComplWithouthold(totallWithoutHold)
      } else {
        setEmpTotalComplaints(0)
        setEmpRctiCompl(0)
        setEmplPendingComplintsMonth(0)
        setEmpReopendCompln(0)
        setEmpRctTodayCmplt(0)
        setEmpVeriComplt(0)
        setComplPerfm(0)
        setEmpverifiedToday(0)
        setEmpPendingToday(0)
        setEmptotCompltedComplaints(0)
        setEmpTotalComplWithouthold(0)
      }
    }
    getEmployeeComplaints(searchEmployeeComplaintData)
  }, [searchEmployeeComplaintData])

  useEffect(() => {
    const getEmployeeImage = async employee => {
      const result = await axioslogin.get(`/TmGraph/EmployeeImage/getEmployeeImage/${employee}`)
      const { success } = result.data
      if (success === 1) {
        const data = result.data
        const fileNames = data.data
        const fileUrls = fileNames.map(fileName => {
          return `${PUBLIC_NAS_FOLDER}/TaskEmployeeImage/${employee}/${fileName}`
        })
        setImageUrls(fileUrls)
      } else {
        setImageUrls([])
      }
    }
    getEmployeeImage(employee)
  }, [employee])

  return (
    <Paper sx={{ p: 0.5, width: '100%' }}>
      <Box sx={{ bgcolor: ' #DFE3ED', p: 0.5 }}>
        <Box sx={{ bgcolor: 'white', height: '100%', flex: 1, pb: 1 }}>
          <Box sx={{ flex: 1, display: 'flex', py: 1 }}>
            <Box sx={{ flex: 1, display: 'flex', pl: 2, pt: 1 }}>
              <AutoGraphSharpIcon fontSize="medium" sx={{ color: 'grey' }} />
              <Typography sx={{ fontSize: 15, pl: 0.5 }}>Employee Performance Sheet</Typography>
            </Box>
            <Box
              sx={{
                width: 220,
                margin: 'auto',
                bgcolor: '#E9EEF7',
                borderRadius: 0,
                mr: 1,
                px: 1,
                py: 0.5,
                display: 'flex',
                borderBottom: 1,
                borderColor: '#CDD7E1'
              }}
            >
              <PersonIcon sx={{ color: '#492B08', p: 0.1 }} />
              &nbsp;
              <TMemployeeSelect employee={employee} setEmployee={setEmployee} />
            </Box>
            <Box sx={{ width: 200, margin: 'auto', bgcolor: '#E9EEF7', borderRadius: 0, mr: 5 }}>
              <Inputcomponent
                name="searchMonthAndYear"
                type="month"
                value={searchMonthAndYear}
                onchange={monthChange}
              />
            </Box>
          </Box>
          <Box sx={{ flex: 1, display: 'flex', height: '100%' }}>
            <Box sx={{ flex: 2.3, ml: 1, border: 1, borderColor: '#DFE3ED' }}>
              <Box sx={{ flex: 1, height: '100%' }}>
                <Box sx={{ flex: 1, display: 'flex', height: '96%' }}>
                  <Box sx={{ flex: 1.2 }}>
                    <Box sx={{ flex: 1, display: 'flex' }}>
                      <Box sx={{ width: 250, height: 250, ml: 3, mt: 3 }}>
                        <CssVarsProvider>
                          <CircularProgress
                            determinate
                            value={MonthlyPerformance}
                            color={
                              MonthlyPerformance > 85
                                ? 'success'
                                : MonthlyPerformance > 70
                                  ? 'primary'
                                  : MonthlyPerformance > 60
                                    ? 'neutral'
                                    : MonthlyPerformance > 50
                                      ? 'neutral'
                                      : MonthlyPerformance > 30
                                        ? 'warning'
                                        : 'danger'
                            }
                            sx={{
                              '--CircularProgress-size': '250px',
                              p: 2,
                              '--CircularProgress-progressThickness': '12px',
                              '--CircularProgress-trackThickness': '0px'
                            }}
                          >
                            {imageUrls.length !== 0 ? (
                              <img
                                style={{ width: '100%', height: '100%', borderRadius: 150 }}
                                src={imageUrls}
                                // alt='User profile picture'
                                alt=""
                                loading="lazy"
                              />
                            ) : (
                              <Box sx={{ border: 1, borderRadius: 150, borderColor: 'lightgrey' }}>
                                <PersonIcon
                                  style={{
                                    width: '100%',
                                    height: '100%',
                                    p: 0.1,
                                    color: 'lightgrey'
                                  }}
                                />
                              </Box>
                            )}
                          </CircularProgress>
                        </CssVarsProvider>
                      </Box>
                      <Box sx={{ flex: 1, pt: 5, pl: 2 }}>
                        <Typography sx={{ color: '#848484', fontWeight: 600, fontSize: 30 }}>
                          {employeeNamee}
                        </Typography>
                        <Typography sx={{ color: '#4C4C4C', fontWeight: 200, fontSize: 18 }}>{designation}</Typography>
                        <Typography sx={{ color: '#4C5270', fontWeight: 800, fontSize: 18 }}>
                          Monthly Performance
                        </Typography>
                        <Typography
                          sx={{
                            color:
                              MonthlyPerformance < 30 ? 'darkRed' : MonthlyPerformance < 70 ? '#32383E' : '#104210',
                            fontWeight: 800,
                            fontSize: 28,
                            pl: 8,
                            py: 1
                          }}
                        >
                          {MonthlyPerformance}%
                        </Typography>

                        <Box sx={{ display: 'flex', mt: 0.5 }}>
                          <Box sx={{ width: 7, height: 48, bgcolor: 'lightgrey' }}></Box>
                          <Box>
                            <Typography
                              sx={{
                                fontSize: 14,
                                fontWeight: 600,
                                color: '#12467B',
                                pl: 0.5,
                                pr: 1
                              }}
                            >
                              Task
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: 18,
                                fontWeight: 600,
                                color: taskPerformance < 30 ? 'darkRed' : taskPerformance < 70 ? '#32383E' : '#104210',
                                pl: 0.5,
                                pr: 1
                              }}
                            >
                              {taskPerformance}%
                            </Typography>
                          </Box>
                          <Box sx={{ width: 7, height: 48, bgcolor: 'lightgrey', ml: 5 }}></Box>
                          <Box>
                            <Typography
                              sx={{
                                fontSize: 14,
                                fontWeight: 600,
                                color: '#492B08',
                                pl: 0.5,
                                pr: 1
                              }}
                            >
                              Complaints
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: 18,
                                fontWeight: 600,
                                color: complPerfm < 30 ? 'darkRed' : complPerfm < 70 ? '#32383E' : '#104210',
                                pl: 0.5,
                                pr: 1
                              }}
                            >
                              {complPerfm}%
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Box>

                    <Box sx={{ flex: 1, mt: 1, mr: 1 }}>
                      <Typography sx={{ fontWeight: 600, py: 1, pl: 1 }}>Projects</Typography>
                      {empProject.length !== 0 ? (
                        <Box sx={{ minHeight: 50, maxHeight: 200, overflow: 'auto' }}>
                          {empProject &&
                            empProject.map(val => {
                              return (
                                <Box key={val.tm_project_slno} sx={{ display: 'flex' }}>
                                  <Box>
                                    <AccountTreeIcon sx={{ color: '#492B08', p: 0.5 }} />
                                  </Box>
                                  <Box sx={{ flex: 1 }}>{val.tm_project_name}</Box>
                                  <Box sx={{ mx: 1, my: 0.2 }}>
                                    <PerformProjectProgres val={val} />
                                  </Box>
                                </Box>
                              )
                            })}
                        </Box>
                      ) : (
                        <Box>
                          <Typography sx={{ fontWeight: 600, color: 'lightgrey', pl: 5, pt: 3 }}>
                            No Project Assigned{' '}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                    <Box sx={{ flex: 1, mr: 1 }}>
                      <Typography sx={{ fontWeight: 600, py: 1, pl: 1 }}>Task</Typography>
                      {emplmainTasks.length !== 0 ? (
                        <Box sx={{ minHeight: 100, maxHeight: 250, overflow: 'auto' }}>
                          {emplmainTasks &&
                            emplmainTasks.map(val => {
                              return (
                                <Box key={val.tm_task_slno} sx={{ display: 'flex' }}>
                                  <Box>
                                    <DeviceHubSharpIcon sx={{ color: '#12467B', p: 0.5 }} />
                                  </Box>
                                  <Box sx={{ flex: 1 }}>{val.tm_task_name}</Box>
                                  <Box sx={{ mx: 1, my: 0.2 }}>
                                    <PerfomTaskProgress val={val} />
                                  </Box>
                                </Box>
                              )
                            })}
                        </Box>
                      ) : (
                        <Box>
                          <Typography sx={{ fontWeight: 600, color: 'lightgrey', pl: 5, pt: 3 }}>
                            No Task Due Under Month{' '}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Box>
                  <Box sx={{ flex: 0.9, m: 1 }}>
                    <Box sx={{ flex: 1, pt: 1 }}>
                      <Box sx={{ flex: 1 }}>
                        <Typography sx={{ pl: 1.5, fontWeight: 600, color: '#12467B', fontSize: 18 }}>Task</Typography>
                        <Box sx={{ flex: 1, bgcolor: '#E9EEF7', mt: 0.5, mx: 1, py: 0.5 }}>
                          <Typography sx={{ pl: 1, pt: 0.5, fontWeight: 600 }}>
                            <u>Today&apos;s</u>
                          </Typography>
                          <Box sx={{ flex: 1, display: 'flex' }}>
                            <Typography sx={{ pl: 1.5, pt: 1, fontSize: 15, flex: 1 }}>Overdue </Typography>
                            <Box
                              sx={{
                                width: 50,
                                height: 25,
                                border: 1,
                                mx: 2,
                                mt: 0.5,
                                textAlign: 'center',
                                borderRadius: 2,
                                borderColor: '#12467B',
                                color: '#12467B'
                              }}
                            >
                              {empOerdueToday}
                            </Box>
                          </Box>
                          <Box sx={{ flex: 1, display: 'flex' }}>
                            <Typography sx={{ pl: 1.5, pt: 1, fontSize: 15, flex: 1 }}>Completed </Typography>
                            <Box
                              sx={{
                                width: 50,
                                height: 25,
                                border: 1,
                                mx: 2,
                                mt: 0.5,
                                textAlign: 'center',
                                borderRadius: 2,
                                borderColor: '#12467B',
                                color: '#12467B'
                              }}
                            >
                              {empCompltTodayTask}
                            </Box>
                          </Box>
                        </Box>

                        <Box sx={{ flex: 1, bgcolor: '#E9EEF7', mt: 0.5, mx: 1, py: 0.5 }}>
                          <Typography sx={{ pl: 1, pt: 0.5, fontWeight: 600 }}>
                            <u>{monthName}</u>
                          </Typography>
                          <Box sx={{ flex: 1, display: 'flex' }}>
                            <Typography sx={{ pl: 1.5, pt: 1, fontSize: 15, flex: 1 }}>Total </Typography>
                            <Box
                              sx={{
                                width: 50,
                                height: 25,
                                border: 1,
                                mx: 2,
                                mt: 0.5,
                                textAlign: 'center',
                                borderRadius: 2,
                                borderColor: '#12467B',
                                color: '#12467B'
                              }}
                            >
                              {empTotalTask}
                            </Box>
                          </Box>
                          <Box sx={{ flex: 1, display: 'flex' }}>
                            <Typography sx={{ pl: 1.5, pt: 1, fontSize: 15, flex: 1 }}>Completed </Typography>
                            <Box
                              sx={{
                                width: 50,
                                height: 25,
                                border: 1,
                                mx: 2,
                                mt: 0.5,
                                textAlign: 'center',
                                borderRadius: 2,
                                borderColor: '#12467B',
                                color: '#12467B'
                              }}
                            >
                              {empCompletedTask}
                            </Box>
                          </Box>
                        </Box>

                        <Box sx={{ flex: 1, bgcolor: '#E9EEF7', mt: 0.5, mx: 1, py: 0.5 }}>
                          <Typography sx={{ pl: 1, pt: 0.5, fontWeight: 600 }}>
                            <u>Pending</u>
                          </Typography>
                          <Box sx={{ flex: 1, display: 'flex' }}>
                            <Typography sx={{ pl: 1.5, pt: 1, fontSize: 15, flex: 1 }}>On Hold </Typography>
                            <Box
                              sx={{
                                width: 50,
                                height: 25,
                                border: 1,
                                mx: 2,
                                mt: 0.5,
                                textAlign: 'center',
                                borderRadius: 2,
                                borderColor: '#12467B',
                                color: '#12467B'
                              }}
                            >
                              {totalonHold}
                            </Box>
                          </Box>
                          <Box sx={{ flex: 1, display: 'flex' }}>
                            <Typography sx={{ pl: 1.5, pt: 1, fontSize: 15, flex: 1 }}>Overdue </Typography>
                            <Box
                              sx={{
                                width: 50,
                                height: 25,
                                border: 1,
                                mx: 2,
                                mt: 0.5,
                                textAlign: 'center',
                                borderRadius: 2,
                                borderColor: '#12467B',
                                color: '#12467B'
                              }}
                            >
                              {totalemployeeOverDue}
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography sx={{ pl: 1.5, pt: 1.5, fontWeight: 600, color: '#492B08', fontSize: 18 }}>
                          Complaints
                        </Typography>
                        <Box sx={{ flex: 1, bgcolor: '#E9EEF7', mt: 0.5, mx: 1, py: 0.5 }}>
                          <Typography sx={{ pl: 1, pt: 0.5, fontWeight: 600 }}>
                            <u>Today&apos;s</u>
                          </Typography>
                          <Box sx={{ flex: 1, display: 'flex' }}>
                            <Typography sx={{ pl: 1.5, pt: 1, fontSize: 15, flex: 1 }}>Assigned </Typography>
                            <Box
                              sx={{
                                width: 50,
                                height: 25,
                                border: 1,
                                mx: 2,
                                mt: 0.5,
                                textAlign: 'center',
                                borderRadius: 2,
                                borderColor: '#492B08',
                                color: '#492B08'
                              }}
                            >
                              {empComplaintsToday}
                            </Box>
                          </Box>
                          <Box sx={{ flex: 1, display: 'flex' }}>
                            <Typography sx={{ pl: 1.5, pt: 1, fontSize: 15, flex: 1 }}>Rectified </Typography>
                            <Box
                              sx={{
                                width: 50,
                                height: 25,
                                border: 1,
                                mx: 2,
                                mt: 0.5,
                                textAlign: 'center',
                                borderRadius: 2,
                                borderColor: '#492B08',
                                color: '#492B08'
                              }}
                            >
                              {empRctfytodayComplt + empVerifiedToday}
                            </Box>
                          </Box>
                          <Box sx={{ flex: 1, display: 'flex' }}>
                            <Typography sx={{ pl: 1.5, pt: 1, fontSize: 15, flex: 1 }}>Pending </Typography>
                            <Box
                              sx={{
                                width: 50,
                                height: 25,
                                border: 1,
                                mx: 2,
                                mt: 0.5,
                                textAlign: 'center',
                                borderRadius: 2,
                                borderColor: '#492B08',
                                color: '#492B08'
                              }}
                            >
                              {empPendingToday}
                            </Box>
                          </Box>
                        </Box>

                        <Box sx={{ flex: 1, bgcolor: '#E9EEF7', mt: 0.5, mx: 1, py: 0.5 }}>
                          <Typography sx={{ pl: 1, pt: 0.5, fontWeight: 600 }}>
                            <u>{monthName}</u>
                          </Typography>
                          <Box sx={{ flex: 1, display: 'flex' }}>
                            <Typography sx={{ pl: 1.5, pt: 1, fontSize: 15, flex: 1 }}>Assigned </Typography>
                            <Box
                              sx={{
                                width: 50,
                                height: 25,
                                border: 1,
                                mx: 2,
                                mt: 0.5,
                                textAlign: 'center',
                                borderRadius: 2,
                                borderColor: '#492B08',
                                color: '#492B08'
                              }}
                            >
                              {empTotalComplaints}
                            </Box>
                          </Box>
                          <Box sx={{ flex: 1, display: 'flex' }}>
                            <Typography sx={{ pl: 1.5, pt: 1, fontSize: 15, flex: 1 }}>Rectified </Typography>
                            <Box
                              sx={{
                                width: 50,
                                height: 25,
                                border: 1,
                                mx: 2,
                                mt: 0.5,
                                textAlign: 'center',
                                borderRadius: 2,
                                borderColor: '#492B08',
                                color: '#492B08'
                              }}
                            >
                              {empRctiCompl + empVeriComplt}
                            </Box>
                          </Box>
                          <Box sx={{ flex: 1, display: 'flex' }}>
                            <Typography sx={{ pl: 1.5, pt: 1, fontSize: 15, flex: 1 }}>Verified </Typography>
                            <Box
                              sx={{
                                width: 50,
                                height: 25,
                                border: 1,
                                mx: 2,
                                mt: 0.5,
                                textAlign: 'center',
                                borderRadius: 2,
                                borderColor: '#492B08',
                                color: '#492B08'
                              }}
                            >
                              {empVeriComplt}
                            </Box>
                          </Box>
                          <Box sx={{ flex: 1, display: 'flex' }}>
                            <Typography sx={{ pl: 1.5, pt: 1, fontSize: 15, flex: 1 }}>Re Opened </Typography>
                            <Box
                              sx={{
                                width: 50,
                                height: 25,
                                border: 1,
                                mx: 2,
                                mt: 0.5,
                                textAlign: 'center',
                                borderRadius: 2,
                                borderColor: '#492B08',
                                color: '#492B08'
                              }}
                            >
                              {empReopendCompln}
                            </Box>
                          </Box>
                          <Box sx={{ flex: 1, display: 'flex' }}>
                            <Typography sx={{ pl: 1.5, pt: 1, fontSize: 15, flex: 1 }}>Pending</Typography>
                            <Box
                              sx={{
                                width: 50,
                                height: 25,
                                border: 1,
                                mx: 2,
                                mt: 0.5,
                                textAlign: 'center',
                                borderRadius: 2,
                                borderColor: '#492B08',
                                color: '#492B08'
                              }}
                            >
                              {emplPendingComplintsMonth}
                            </Box>
                          </Box>
                        </Box>

                        <Box sx={{ flex: 1, bgcolor: '#E9EEF7', mt: 0.5, mx: 1, py: 0.5 }}>
                          <Typography sx={{ pl: 1, pt: 0.5, fontWeight: 600 }}>
                            <u>Pending</u>
                          </Typography>
                          <Box sx={{ flex: 1, display: 'flex' }}>
                            <Typography sx={{ pl: 1.5, pt: 1, fontSize: 15, flex: 1 }}>On Hold </Typography>
                            <Box
                              sx={{
                                width: 50,
                                height: 25,
                                border: 1,
                                mx: 2,
                                mt: 0.5,
                                textAlign: 'center',
                                borderRadius: 2,
                                borderColor: '#492B08',
                                color: '#492B08'
                              }}
                            >
                              {empltOnHoldComplints}
                            </Box>
                          </Box>
                          <Box sx={{ flex: 1, display: 'flex' }}>
                            <Typography sx={{ pl: 1.5, pt: 1, fontSize: 15, flex: 1 }}>Pending </Typography>
                            <Box
                              sx={{
                                width: 50,
                                height: 25,
                                border: 1,
                                mx: 2,
                                mt: 0.5,
                                textAlign: 'center',
                                borderRadius: 2,
                                borderColor: '#492B08',
                                color: '#492B08'
                              }}
                            >
                              {emplPendingComplints}
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ flex: 1, display: 'flex', mb: 1 }}>
                  <Box sx={{ flex: 1, display: 'flex', pl: 0.5 }}>
                    <ArrowBackIosIcon
                      sx={{
                        color: 'grey',
                        p: 0.2,
                        cursor: 'pointer',
                        '&:hover': { color: 'blue' }
                      }}
                      onClick={handlePrev}
                    />
                    <Typography sx={{ fontSize: 12, pt: 0.5, pl: 0, color: 'grey' }}>Prev</Typography>
                  </Box>
                  <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                    <Typography sx={{ fontSize: 12, pt: 0.5, color: 'grey' }}>Next</Typography>
                    <ArrowForwardIosIcon
                      sx={{
                        color: 'grey',
                        p: 0.2,
                        cursor: 'pointer',
                        '&:hover': { color: 'blue' }
                      }}
                      onClick={handleNext}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box sx={{ flex: 0.8, mx: 1, border: 1, borderColor: '#DFE3ED', pb: 1 }}>
              <Typography
                sx={{
                  flex: 1,
                  display: 'flex',
                  justifyContent: 'center',
                  fontWeight: 600,
                  fontSize: 18,
                  pt: 1,
                  color: '#32383E'
                }}
              >
                {capsecName}{' '}
              </Typography>
              <Typography
                sx={{
                  flex: 1,
                  display: 'flex',
                  justifyContent: 'center',
                  fontWeight: 600,
                  fontSize: 12,
                  color: '#32383E'
                }}
              >
                ({capdeeptName})
              </Typography>
              <Typography sx={{ pl: 1.5, pt: 1.5, fontWeight: 600, color: '#12467B', fontSize: 18 }}>Task</Typography>
              <Box sx={{ flex: 1, bgcolor: '#E9EEF7', mt: 0.5, mx: 1, py: 0.5 }}>
                <Typography sx={{ pl: 1, pt: 0.5, fontWeight: 600 }}>
                  <u>Today&apos;s</u>
                </Typography>
                <Box sx={{ flex: 1, display: 'flex' }}>
                  <Typography sx={{ pl: 1.5, pt: 1, fontSize: 15, flex: 1 }}>Overdue </Typography>
                  <Box
                    sx={{
                      width: 50,
                      height: 25,
                      border: 1,
                      mx: 2,
                      mt: 0.5,
                      textAlign: 'center',
                      borderRadius: 2,
                      borderColor: '#12467B',
                      color: '#12467B'
                    }}
                  >
                    {deptOverdueTask}
                  </Box>
                </Box>
                <Box sx={{ flex: 1, display: 'flex' }}>
                  <Typography sx={{ pl: 1.5, pt: 1, fontSize: 15, flex: 1 }}>Completed </Typography>
                  <Box
                    sx={{
                      width: 50,
                      height: 25,
                      border: 1,
                      mx: 2,
                      mt: 0.5,
                      textAlign: 'center',
                      borderRadius: 2,
                      borderColor: '#12467B',
                      color: '#12467B'
                    }}
                  >
                    {deptCompletedToday}
                  </Box>
                </Box>
              </Box>

              <Box sx={{ flex: 1, bgcolor: '#E9EEF7', mt: 0.5, mx: 1, py: 0.5 }}>
                <Typography sx={{ pl: 1, pt: 0.5, fontWeight: 600 }}>
                  <u>{monthName}</u>
                </Typography>
                <Box sx={{ flex: 1, display: 'flex' }}>
                  <Typography sx={{ pl: 1.5, pt: 1, fontSize: 15, flex: 1 }}>Total </Typography>
                  <Box
                    sx={{
                      width: 50,
                      height: 25,
                      border: 1,
                      mx: 2,
                      mt: 0.5,
                      textAlign: 'center',
                      borderRadius: 2,
                      borderColor: '#12467B',
                      color: '#12467B'
                    }}
                  >
                    {totalTaskCount}
                  </Box>
                </Box>
                <Box sx={{ flex: 1, display: 'flex' }}>
                  <Typography sx={{ pl: 1.5, pt: 1, fontSize: 15, flex: 1 }}>Completed </Typography>
                  <Box
                    sx={{
                      width: 50,
                      height: 25,
                      border: 1,
                      mx: 2,
                      mt: 0.5,
                      textAlign: 'center',
                      borderRadius: 2,
                      borderColor: '#12467B',
                      color: '#12467B'
                    }}
                  >
                    {completedTaskCount}
                  </Box>
                </Box>
              </Box>
              <Box sx={{ flex: 1, bgcolor: '#E9EEF7', mt: 0.5, mx: 1, py: 0.5 }}>
                <Typography sx={{ pl: 1, pt: 0.5, fontWeight: 600 }}>
                  <u>Pending</u>
                </Typography>
                <Box sx={{ flex: 1, display: 'flex' }}>
                  <Typography sx={{ pl: 1.5, pt: 1, fontSize: 15, flex: 1 }}>On Hold </Typography>
                  <Box
                    sx={{
                      width: 50,
                      height: 25,
                      border: 1,
                      mx: 2,
                      mt: 0.5,
                      textAlign: 'center',
                      borderRadius: 2,
                      borderColor: '#12467B',
                      color: '#12467B'
                    }}
                  >
                    {deptOnHoldTask}
                  </Box>
                </Box>
                <Box sx={{ flex: 1, display: 'flex' }}>
                  <Typography sx={{ pl: 1.5, pt: 1, fontSize: 15, flex: 1 }}>Overdue </Typography>
                  <Box
                    sx={{
                      width: 50,
                      height: 25,
                      border: 1,
                      mx: 2,
                      mt: 0.5,
                      textAlign: 'center',
                      borderRadius: 2,
                      borderColor: '#12467B',
                      color: '#12467B'
                    }}
                  >
                    {deptTotOverdue}
                  </Box>
                </Box>
              </Box>

              <Typography sx={{ pl: 1.5, pt: 1.5, fontWeight: 600, color: '#492B08', fontSize: 18 }}>
                Complaints
              </Typography>

              <Box sx={{ flex: 1, bgcolor: '#E9EEF7', mt: 0.5, mx: 1, py: 0.5 }}>
                <Typography sx={{ pl: 1, pt: 0.5, fontWeight: 600 }}>
                  <u>Today&apos;s</u>
                </Typography>
                <Box sx={{ flex: 1, display: 'flex' }}>
                  <Typography sx={{ pl: 1.5, pt: 1, fontSize: 15, flex: 1 }}>Complaints</Typography>
                  <Box
                    sx={{
                      width: 50,
                      height: 25,
                      border: 1,
                      mx: 2,
                      mt: 0.5,
                      textAlign: 'center',
                      borderRadius: 2,
                      borderColor: '#492B08',
                      color: '#492B08'
                    }}
                  >
                    {deptTodays}
                  </Box>
                </Box>
                <Box sx={{ flex: 1, display: 'flex' }}>
                  <Typography sx={{ pl: 1.5, pt: 1, fontSize: 15, flex: 1 }}>Rectified</Typography>
                  <Box
                    sx={{
                      width: 50,
                      height: 25,
                      border: 1,
                      mx: 2,
                      mt: 0.5,
                      textAlign: 'center',
                      borderRadius: 2,
                      borderColor: '#492B08',
                      color: '#492B08'
                    }}
                  >
                    {deptRectfToday + deptVerifiedToday}
                  </Box>
                </Box>
                <Box sx={{ flex: 1, display: 'flex' }}>
                  <Typography sx={{ pl: 1.5, pt: 1, fontSize: 15, flex: 1 }}>Pending</Typography>
                  <Box
                    sx={{
                      width: 50,
                      height: 25,
                      border: 1,
                      mx: 2,
                      mt: 0.5,
                      textAlign: 'center',
                      borderRadius: 2,
                      borderColor: '#492B08',
                      color: '#492B08'
                    }}
                  >
                    {pendingTodaydept}
                  </Box>
                </Box>
              </Box>

              <Box sx={{ flex: 1, bgcolor: '#E9EEF7', mt: 0.5, mx: 1, py: 0.5 }}>
                <Typography sx={{ pl: 1, pt: 0.5, fontWeight: 600 }}>
                  <u>{monthName}</u>
                </Typography>
                <Box sx={{ flex: 1, display: 'flex' }}>
                  <Typography sx={{ pl: 1.5, pt: 1, fontSize: 15, flex: 1 }}>Total Complaints </Typography>
                  <Box
                    sx={{
                      width: 50,
                      height: 25,
                      border: 1,
                      mx: 2,
                      mt: 0.5,
                      textAlign: 'center',
                      borderRadius: 2,
                      borderColor: '#492B08',
                      color: '#492B08'
                    }}
                  >
                    {totalComplaintCount}
                  </Box>
                </Box>
                <Box sx={{ flex: 1, display: 'flex' }}>
                  <Typography sx={{ pl: 1.5, pt: 1, fontSize: 15, flex: 1 }}>Rectified </Typography>
                  <Box
                    sx={{
                      width: 50,
                      height: 25,
                      border: 1,
                      mx: 2,
                      mt: 0.5,
                      textAlign: 'center',
                      borderRadius: 2,
                      borderColor: '#492B08',
                      color: '#492B08'
                    }}
                  >
                    {deptRectiCompl + deptVerified}
                  </Box>
                </Box>
                <Box sx={{ flex: 1, display: 'flex' }}>
                  <Typography sx={{ pl: 1.5, pt: 1, fontSize: 15, flex: 1 }}>Verified </Typography>
                  <Box
                    sx={{
                      width: 50,
                      height: 25,
                      border: 1,
                      mx: 2,
                      mt: 0.5,
                      textAlign: 'center',
                      borderRadius: 2,
                      borderColor: '#492B08',
                      color: '#492B08'
                    }}
                  >
                    {deptVerified}
                  </Box>
                </Box>
                <Box sx={{ flex: 1, display: 'flex' }}>
                  <Typography sx={{ pl: 1.5, pt: 1, fontSize: 15, flex: 1 }}>Re Opened </Typography>
                  <Box
                    sx={{
                      width: 50,
                      height: 25,
                      border: 1,
                      mx: 2,
                      mt: 0.5,
                      textAlign: 'center',
                      borderRadius: 2,
                      borderColor: '#492B08',
                      color: '#492B08'
                    }}
                  >
                    {ReOpenedComplaints}
                  </Box>
                </Box>
                <Box sx={{ flex: 1, display: 'flex' }}>
                  <Typography sx={{ pl: 1.5, pt: 1, fontSize: 15, flex: 1 }}>Pending</Typography>
                  <Box
                    sx={{
                      width: 50,
                      height: 25,
                      border: 1,
                      mx: 2,
                      mt: 0.5,
                      textAlign: 'center',
                      borderRadius: 2,
                      borderColor: '#492B08',
                      color: '#492B08'
                    }}
                  >
                    {deptPendingComplaints}
                  </Box>
                </Box>
              </Box>

              <Box sx={{ flex: 1, bgcolor: '#E9EEF7', mt: 0.5, mx: 1, py: 0.5 }}>
                <Typography sx={{ pl: 1, pt: 0.5, fontWeight: 600 }}>
                  <u>Pending</u>
                </Typography>
                <Box sx={{ flex: 1, display: 'flex' }}>
                  <Typography sx={{ pl: 1.5, pt: 1, fontSize: 15, flex: 1 }}>On Hold </Typography>
                  <Box
                    sx={{
                      width: 50,
                      height: 25,
                      border: 1,
                      mx: 2,
                      mt: 0.5,
                      textAlign: 'center',
                      borderRadius: 2,
                      borderColor: '#492B08',
                      color: '#492B08'
                    }}
                  >
                    {deptTotOnHoldComplnt}
                  </Box>
                </Box>
                <Box sx={{ flex: 1, display: 'flex' }}>
                  <Typography sx={{ pl: 1.5, pt: 1, fontSize: 15, flex: 1 }}>Total Pending </Typography>
                  <Box
                    sx={{
                      width: 50,
                      height: 25,
                      border: 1,
                      mx: 2,
                      mt: 0.5,
                      textAlign: 'center',
                      borderRadius: 2,
                      borderColor: '#492B08',
                      color: '#492B08'
                    }}
                  >
                    {deptTotPendComplt}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Paper>
  )
}

export default memo(PerformanceMain)
