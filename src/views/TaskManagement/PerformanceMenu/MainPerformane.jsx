import { Box, CircularProgress, CssVarsProvider, Input, Typography } from '@mui/joy'
import { Paper } from '@mui/material'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import AutoGraphSharpIcon from '@mui/icons-material/AutoGraphSharp'
import { useSelector } from 'react-redux'
import { differenceInDays, endOfMonth, format, parse, parseISO } from 'date-fns'
import { startOfMonth } from 'date-fns/fp'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { axioslogin } from 'src/views/Axios/Axios'
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static'
import PersonIcon from '@mui/icons-material/Person'
import CountDowncomponent from '../CountDown/CountDowncomponent'

const MainPerformane = () => {
  const empid = useSelector(state => {
    return state.LoginUserData.empid
  })
  const empsecid = useSelector(state => {
    return state.LoginUserData.empsecid
  })

  const [employee, setEmployee] = useState(empid)
  const [employeeData, setemployeeData] = useState([])
  const [searchMonthAndYear, setSearchMonthAndYear] = useState(format(new Date(), 'yyyy-MM'))
  const [imageUrls, setImageUrls] = useState([])
  const [empComplaintsToday, setEmpComplaintsToday] = useState(0)
  const [empOerdueToday, setEmpOerdueToday] = useState(0)
  const [empCompltTodayTask, setEmpCompltTodayTask] = useState(0)
  const [taskPerformance, setTaskPerformance] = useState(0)
  const [emptotCompltedComplaints, setEmptotCompltedComplaints] = useState(0)
  const [pendingToday, setpendingToday] = useState(0)
  const [empRctfytodayComplt, setEmpRctTodayCmplt] = useState(0)
  const [empCompletedTask, setEmpCompletedTask] = useState(0)
  const [complPerfm, setComplPerfm] = useState(0)
  const [employeeDesignation, setEmployeeDesignation] = useState('')
  const [employeeName, setEmployeeName] = useState('')
  const [empTotComplaintsWithoutOnhold, setEmpTotComplaintsWithoutOnhold] = useState(0)
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
  const TotalPerformance =
    EmpTotalWithouthold + empTotComplaintsWithoutOnhold === 0
      ? 0
      : ((AdjustedCompleteion + emptotCompltedComplaints) / (EmpTotalWithouthold + empTotComplaintsWithoutOnhold)) * 100
  const overAllPerformance = Number.isInteger(TotalPerformance)
    ? Number(TotalPerformance.toFixed(0))
    : Number(TotalPerformance.toFixed(2))
  const [OverdueTaskList, setOverdueTaskList] = useState([])
  const [totalPending, setTotalPending] = useState(0)
  const [totalPendingComplnt, setTotalPendingComplnt] = useState(0)
  const [empVerifiedToday, setverifiedToday] = useState(0)
  const [monthName, setMonthName] = useState('')
  const [onHoldEmployeeTask, setOnHoldEmployeeTask] = useState(0)
  const [empOnholdComplaints, setEmpOnholdComplaints] = useState(0)
  const [empTotalTask, setEmpTotalTask] = useState(0)
  const [empTotComplaints, setEmpTotComplaints] = useState(0)

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

  useEffect(() => {
    if (employeeData.length > 0) {
      const intervalId = setInterval(() => {
        setEmployee(prevEmployee => {
          const currentIndex = employeeData.findIndex(emp => emp.em_id === prevEmployee)
          const nextIndex = (currentIndex + 1) % employeeData.length
          return employeeData[nextIndex].em_id
        })
      }, 180000)

      return () => clearInterval(intervalId)
    }
  }, [employeeData])

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

  const isToday = date => {
    const today = new Date()
    const ExDate = new Date(date)
    return (
      ExDate.getDate() === today.getDate() &&
      ExDate.getMonth() === today.getMonth() &&
      ExDate.getFullYear() === today.getFullYear()
    )
  }

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
    const interval = setInterval(() => {
      getMasterTable(employee)
    }, 3600000)
    return () => clearInterval(interval)
  }, [employee])

  useEffect(() => {
    const getOverdueTaskList = async () => {
      const result = await axioslogin.get(`/TmTableView/employeeAllTask/${employee}`)
      const { success, data } = result.data
      if (success === 2) {
        const totalDue = data.length
        const overdueToday = data.filter(item => item.tm_task_status !== 1 && isToday(item.tm_task_due_date))
        setOverdueTaskList(data)
        setTotalPending(totalDue)
        setEmpOerdueToday(overdueToday.length)
      } else {
        setOverdueTaskList(0)
        setTotalPending(0)
        setEmpOerdueToday(0)
      }
    }
    getOverdueTaskList(employee)
    const interval = setInterval(() => {
      getOverdueTaskList(employee)
    }, 3600000)
    return () => clearInterval(interval)
  }, [employee])

  useEffect(() => {
    const getPendingComplaints = async () => {
      const result = await axioslogin.get(`/TmGraph/employeePendingcompl/${employee}`)
      const { success, data } = result.data
      if (success === 2) {
        const totalPending = data.length
        const pendingToday = data.filter(
          item =>
            ((item.cm_rectify_status !== 'R' && item.cm_rectify_status !== 'V') || item.cm_rectify_status === null) &&
            isToday(item.compalint_date)
        )
        setTotalPendingComplnt(totalPending)
        setpendingToday(pendingToday.length)
      } else {
        setTotalPendingComplnt(0)
        setpendingToday(0)
      }
    }
    getPendingComplaints(employee)
    const interval = setInterval(() => {
      getPendingComplaints(employee)
    }, 3600000)
    return () => clearInterval(interval)
  }, [employee])

  useEffect(() => {
    const getEmployeeComplaints = async () => {
      const result = await axioslogin.post('/TmGraph/getAllComplaintsfromtodate', searchEmployeeComplaintData)
      const { success, data } = result.data
      if (success === 2) {
        const totalComplaints = data.length
        const RectifiedComplints = data.filter(item => item.cm_rectify_status === 'R').length
        const OnholdComplaints = data.filter(item => item.cm_rectify_status === 'O').length
        const totallWithoutHold = totalComplaints - OnholdComplaints
        const verifiedComplints = data.filter(item => item.cm_rectify_status === 'V').length
        const emptotCompltedComplaints = RectifiedComplints + verifiedComplints
        const complaintsToday = data.filter(item => isToday(item.compalint_date))
        const rectifiedToday = data.filter(item => item.cm_rectify_status === 'R' && isToday(item.cm_rectify_time))
        const verifiedToday = data.filter(item => item.cm_rectify_status === 'V' && isToday(item.cm_rectify_time))
        const ComplaintPerformnce =
          emptotCompltedComplaints + totallWithoutHold === 0 ? 0 : (emptotCompltedComplaints / totallWithoutHold) * 100
        setEmpComplaintsToday(complaintsToday.length)
        setEmpRctTodayCmplt(rectifiedToday.length)
        setEmptotCompltedComplaints(emptotCompltedComplaints)
        setverifiedToday(verifiedToday.length)
        setComplPerfm(
          Number.isInteger(ComplaintPerformnce) ? ComplaintPerformnce.toFixed(0) : ComplaintPerformnce.toFixed(2)
        )
        setEmpOnholdComplaints(OnholdComplaints)
        setEmpTotComplaintsWithoutOnhold(totallWithoutHold)
        setEmpTotComplaints(totalComplaints)
      } else {
        setEmpRctTodayCmplt(0)
        setEmptotCompltedComplaints(0)
        setEmpComplaintsToday(0)
        setComplPerfm(0)
        setverifiedToday(0)
        setEmpOnholdComplaints(0)
        setEmpTotComplaintsWithoutOnhold(0)
        setEmpTotComplaints(0)
      }
    }
    getEmployeeComplaints(searchEmployeeComplaintData)
    const interval = setInterval(() => {
      getEmployeeComplaints(searchEmployeeComplaintData)
    }, 3600000)
    return () => clearInterval(interval)
  }, [searchEmployeeComplaintData])

  useEffect(() => {
    const getMasterTableAlltask = async () => {
      const result = await axioslogin.post('/TmGraph/getAlltaskfromtodate', searchEmployeeTaskData)
      const { success, data } = result.data
      if (success === 2) {
        const totalTasks = data.length
        const completedTasks = data.filter(item => item.tm_task_status === 1).length
        const onHoldTasks = data.filter(item => item.tm_task_status === 3).length
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
        setEmpCompletedTask(completedTasks)
        setEmpTotalWithouthold(totalWithOutHold)
        setOnHoldEmployeeTask(onHoldTasks)
        setEmpTotalTask(totalTasks)
      } else {
        setEmpCompletedTask(0)
        setEmpTotalWithouthold(0)
        setTaskPerformance(0)
        setAdjustedCompleteion(0)
        setOnHoldEmployeeTask(0)
        setEmpTotalTask(0)
      }
    }
    getMasterTableAlltask(searchEmployeeTaskData)
    const interval = setInterval(() => {
      getMasterTableAlltask(searchEmployeeTaskData)
    }, 3600000)
    return () => clearInterval(interval)
  }, [searchEmployeeTaskData])

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

  const sortedOverdueTaskList =
    OverdueTaskList &&
    [...OverdueTaskList].sort((a, b) => {
      const today = new Date()
      const dueDateA = parseISO(a.tm_task_due_date)
      const dueDateB = parseISO(b.tm_task_due_date)
      const daysUntilDueA = differenceInDays(dueDateA, today)
      const daysUntilDueB = differenceInDays(dueDateB, today)
      if (daysUntilDueA < 0 && daysUntilDueB >= 0) return -1 // a is overdue, b is not
      if (daysUntilDueA >= 0 && daysUntilDueB < 0) return 1 // b is overdue, a is not
      if (daysUntilDueA >= 0 && daysUntilDueA <= 7 && daysUntilDueB > 7) return -1 // a is due within 7 days, b is not
      if (daysUntilDueA > 7 && daysUntilDueB >= 0 && daysUntilDueB <= 7) return 1 // b is due within 7 days, a is not

      return daysUntilDueA - daysUntilDueB // otherwise, sort by due date
    })

  return (
    <Paper sx={{ p: 0.5, borderRadius: 2, height: '90vh', width: '100%' }}>
      <Box sx={{ bgcolor: ' #DFE3ED', height: '100%', p: 0.5, borderRadius: 2 }}>
        <Box
          sx={{
            bgcolor: 'white',
            height: '100%',
            flex: 1,
            pb: 1,
            display: 'flex',
            borderRadius: 2,
            overflow: 'auto'
          }}
        >
          <Box sx={{ flex: 2.5, mt: 2, pl: 2 }}>
            <Box sx={{ flex: 1, display: 'flex', mx: 2 }}>
              <Box sx={{ flex: 1, display: 'flex', mt: 0.5, ml: 1.5 }}>
                <AutoGraphSharpIcon fontSize="large" sx={{ color: '#274472' }} />
                <Typography sx={{ fontSize: 20, pl: 0.5, color: '#274472', fontWeight: 600 }}>
                  Employee Performance Sheet
                </Typography>
              </Box>
            </Box>
            <Box sx={{ flex: 1, display: 'flex', mt: 1 }}>
              <Box sx={{ width: 255, height: 255, ml: 5 }}>
                <CssVarsProvider>
                  <CircularProgress
                    determinate
                    value={overAllPerformance}
                    color={
                      overAllPerformance > 85
                        ? 'success'
                        : overAllPerformance > 70
                          ? 'primary'
                          : overAllPerformance > 60
                            ? 'neutral'
                            : overAllPerformance > 55
                              ? 'neutral'
                              : overAllPerformance > 30
                                ? 'warning'
                                : 'danger'
                    }
                    sx={{
                      '--CircularProgress-size': '255px',
                      p: 2,
                      '--CircularProgress-progressThickness': '12px',
                      '--CircularProgress-trackThickness': '0px'
                    }}
                  >
                    {imageUrls.length !== 0 ? (
                      <img
                        style={{ width: '100%', height: '100%', borderRadius: 155 }}
                        src={imageUrls}
                        alt=""
                        loading="lazy"
                      />
                    ) : (
                      <Box sx={{ border: 1, borderRadius: 155, borderColor: 'lightgrey' }}>
                        <PersonIcon style={{ width: '100%', height: '100%', p: 0.1, color: 'lightgrey' }} />
                      </Box>
                    )}
                  </CircularProgress>
                </CssVarsProvider>
              </Box>
              <Box sx={{ flex: 0.9, pt: 2.5, pl: 2.5 }}>
                <Typography sx={{ color: '#848484', fontWeight: 600, fontSize: 50 }}>{employeeNamee}</Typography>
                <Typography sx={{ color: '#4C4C4C', fontWeight: 200, fontSize: 20 }}>{designation}</Typography>
                <Box sx={{ flex: 1, display: 'flex' }}>
                  <Typography
                    sx={{
                      color:
                        overAllPerformance > 85
                          ? 'darkgreen'
                          : overAllPerformance > 70
                            ? '#12467B'
                            : overAllPerformance > 60
                              ? '#4C5270'
                              : overAllPerformance > 55
                                ? '#4C5270'
                                : overAllPerformance > 30
                                  ? '#492B08'
                                  : 'darkred',
                      fontWeight: 600,
                      fontSize: 35
                    }}
                  >
                    Performance{' '}
                  </Typography>
                  <Typography
                    sx={{
                      color:
                        overAllPerformance > 85
                          ? 'darkgreen'
                          : overAllPerformance > 70
                            ? '#12467B'
                            : overAllPerformance > 60
                              ? '#4C5270'
                              : overAllPerformance > 55
                                ? '#4C5270'
                                : overAllPerformance > 30
                                  ? '#492B08'
                                  : 'darkred',
                      fontWeight: 600,
                      fontSize: 40,
                      pl: 3
                    }}
                  >
                    {overAllPerformance}%
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex' }}>
                  <Box sx={{ width: 7, height: 52, bgcolor: 'lightgrey' }}></Box>
                  <Box>
                    <Typography sx={{ fontSize: 18, fontWeight: 600, color: '#12467B', pl: 0.5, pr: 1 }}>
                      Task
                    </Typography>
                    <Typography sx={{ fontSize: 22, fontWeight: 600, color: '#12467B', pl: 0.5, pr: 1 }}>
                      {taskPerformance}%
                    </Typography>
                  </Box>
                  <Box sx={{ width: 7, height: 52, bgcolor: 'lightgrey', ml: 5 }}></Box>
                  <Box>
                    <Typography sx={{ fontSize: 18, fontWeight: 600, color: '#492B08', pl: 0.5, pr: 1 }}>
                      Complaints
                    </Typography>
                    <Typography sx={{ fontSize: 22, fontWeight: 600, color: '#492B08', pl: 0.5, pr: 1 }}>
                      {complPerfm}%
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box sx={{ flex: 1, mx: 2, mt: 1.5, display: 'flex', minHeight: 85 }}>
              <Box
                sx={{
                  flex: 0.5,
                  bgcolor: 'var(--royal-purple-200)',
                  textAlign: 'right',
                  pr: 2,
                  pt: 2.5,
                  fontSize: 28,
                  color: 'white'
                }}
              >
                {monthName}
              </Box>
              <Box sx={{ flex: 2, display: 'flex' }}>
                <Box
                  sx={{
                    flex: 1,
                    fontSize: 25,
                    color: '#12467B',
                    fontWeight: 600,
                    bgcolor: '#DFE3ED',
                    mx: 0.5
                  }}
                >
                  <Typography sx={{ textAlign: 'center' }}>Task</Typography>
                  <Box sx={{ flex: 1, display: 'flex', pl: 2 }}>
                    <Box sx={{ flex: 1, display: 'flex' }}>
                      <Box
                        sx={{
                          width: 50,
                          height: 43,
                          bgcolor: '#12467B',
                          textAlign: 'center',
                          mb: 0.5,
                          borderRadius: 2,
                          mr: 0.5,
                          color: 'white',
                          pt: 0.3
                        }}
                      >
                        {empTotalTask}
                      </Box>
                      <Typography sx={{ fontSize: 15, pt: 2 }}>Total</Typography>
                    </Box>
                    <Box sx={{ flex: 1, display: 'flex' }}>
                      <Box
                        sx={{
                          width: 50,
                          height: 43,
                          bgcolor: '#006400',
                          textAlign: 'center',
                          mb: 0.5,
                          borderRadius: 2,
                          mr: 0.5,
                          color: 'white',
                          pt: 0.3
                        }}
                      >
                        {empCompletedTask}
                      </Box>
                      <Typography sx={{ fontSize: 15, pt: 2 }}>Completed</Typography>
                    </Box>
                    <Box sx={{ flex: 1, display: 'flex' }}>
                      <Box
                        sx={{
                          width: 50,
                          height: 43,
                          bgcolor: '#717982',
                          textAlign: 'center',
                          mb: 0.5,
                          borderRadius: 2,
                          mr: 0.5,
                          color: 'white',
                          pt: 0.3
                        }}
                      >
                        {onHoldEmployeeTask}
                      </Box>
                      <Typography sx={{ fontSize: 15, pt: 2 }}>On Hold</Typography>
                    </Box>
                  </Box>
                </Box>
                <Box
                  sx={{
                    flex: 1,
                    fontSize: 25,
                    color: '#460D0D',
                    fontWeight: 600,
                    bgcolor: '#DFE3ED',
                    mx: 0.5
                  }}
                >
                  <Typography sx={{ textAlign: 'center' }}>Complaints</Typography>
                  <Box sx={{ flex: 1, display: 'flex', pl: 2 }}>
                    <Box sx={{ flex: 1, display: 'flex' }}>
                      <Box
                        sx={{
                          width: 50,
                          height: 43,
                          bgcolor: '#460D0D',
                          textAlign: 'center',
                          mb: 0.5,
                          borderRadius: 2,
                          mr: 0.5,
                          color: 'white',
                          pt: 0.3
                        }}
                      >
                        {empTotComplaints}
                      </Box>
                      <Typography sx={{ fontSize: 15, pt: 2 }}>Total</Typography>
                    </Box>
                    <Box sx={{ flex: 1, display: 'flex' }}>
                      <Box
                        sx={{
                          width: 50,
                          height: 43,
                          bgcolor: '#006400',
                          textAlign: 'center',
                          mb: 0.5,
                          borderRadius: 2,
                          mr: 0.5,
                          color: 'white',
                          pt: 0.3
                        }}
                      >
                        {emptotCompltedComplaints}
                      </Box>
                      <Typography sx={{ fontSize: 15, pt: 2 }}>Completed</Typography>
                    </Box>

                    <Box sx={{ flex: 1, display: 'flex' }}>
                      <Box
                        sx={{
                          width: 50,
                          height: 43,
                          bgcolor: '#717982',
                          textAlign: 'center',
                          mb: 0.5,
                          borderRadius: 2,
                          mr: 0.5,
                          color: 'white',
                          pt: 0.3
                        }}
                      >
                        {empOnholdComplaints}
                      </Box>
                      <Typography sx={{ fontSize: 15, pt: 2 }}>On Hold</Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box sx={{ flex: 1, px: 2.5, pt: 0.5 }}>
              <Typography sx={{ fontWeight: 600, color: '#12467B', fontSize: 28 }}>Task </Typography>
            </Box>
            <Box sx={{ flex: 1, px: 1, display: 'flex', pt: 0.2 }}>
              <Paper
                sx={{
                  flex: 1,
                  width: 100,
                  mx: 1,
                  border: 1,
                  borderColor: '#DFE3ED',
                  borderRadius: 5,
                  bgcolor: '#F7F9FF'
                }}
              >
                <Typography
                  sx={{
                    flex: 1,
                    fontSize: 55,
                    textAlign: 'center',
                    fontWeight: 600,
                    color: '#460D0D',
                    pt: 1
                  }}
                >
                  {totalPending}
                </Typography>
                <Typography sx={{ flex: 1, fontSize: 25, pb: 0.8, textAlign: 'center', color: 'grey' }}>
                  Pending
                </Typography>
              </Paper>
              <Paper
                sx={{
                  flex: 1,
                  width: 100,
                  mx: 1,
                  border: 1,
                  borderColor: '#DFE3ED',
                  borderRadius: 5,
                  bgcolor: '#F7F9FF'
                }}
              >
                <Typography
                  sx={{
                    flex: 1,
                    fontSize: 55,
                    textAlign: 'center',
                    fontWeight: 600,
                    color: 'darkgreen',
                    pt: 1
                  }}
                >
                  {empCompltTodayTask}
                </Typography>
                <Typography sx={{ flex: 1, fontSize: 25, pb: 0.8, textAlign: 'center', color: 'grey' }}>
                  Completed Today
                </Typography>
              </Paper>
              <Paper
                sx={{
                  flex: 1,
                  width: 100,
                  mx: 1,
                  border: 1,
                  borderColor: '#DFE3ED',
                  borderRadius: 5,
                  bgcolor: '#F7F9FF'
                }}
              >
                <Typography
                  sx={{
                    flex: 1,
                    fontSize: 55,
                    textAlign: 'center',
                    fontWeight: 600,
                    color: '#AC203D',
                    pt: 1
                  }}
                >
                  {empOerdueToday}
                </Typography>
                <Typography sx={{ flex: 1, fontSize: 25, pb: 0.8, textAlign: 'center', color: 'grey' }}>
                  Overdue Today
                </Typography>
              </Paper>
            </Box>
            <Box sx={{ flex: 1, px: 2.5 }}>
              <Typography sx={{ pt: 3, fontWeight: 600, color: '#492B08', fontSize: 22 }}>Complaints </Typography>
            </Box>
            <Box sx={{ flex: 1, display: 'flex', px: 2, pt: 1 }}>
              <Paper
                sx={{
                  flex: 1,
                  width: 100,
                  mx: 1,
                  border: 1,
                  borderColor: '#DFE3ED',
                  borderRadius: 5,
                  bgcolor: '#F7F2EF'
                }}
              >
                <Typography
                  sx={{
                    flex: 1,
                    fontSize: 55,
                    textAlign: 'center',
                    fontWeight: 600,
                    color: '#460D0D',
                    pt: 1
                  }}
                >
                  {totalPendingComplnt}
                </Typography>
                <Typography sx={{ flex: 1, fontSize: 25, pb: 0.8, textAlign: 'center', color: 'grey' }}>
                  Pending
                </Typography>
              </Paper>
              <Paper
                sx={{
                  flex: 1,
                  width: 100,
                  mx: 1,
                  border: 1,
                  borderColor: '#DFE3ED',
                  borderRadius: 5,
                  bgcolor: '#F7F2EF'
                }}
              >
                <Typography
                  sx={{
                    flex: 1,
                    fontSize: 55,
                    textAlign: 'center',
                    fontWeight: 600,
                    color: '#8E4F30',
                    pt: 1
                  }}
                >
                  {empComplaintsToday}
                </Typography>
                <Typography sx={{ flex: 1, fontSize: 25, pb: 0.8, textAlign: 'center', color: 'grey' }}>
                  Assigned Today
                </Typography>
              </Paper>
              <Paper
                sx={{
                  flex: 1,
                  width: 100,
                  mx: 1,
                  border: 1,
                  borderColor: '#DFE3ED',
                  borderRadius: 5,
                  bgcolor: '#F7F2EF'
                }}
              >
                <Typography
                  sx={{
                    flex: 1,
                    fontSize: 55,
                    textAlign: 'center',
                    fontWeight: 600,
                    color: 'darkgreen',
                    pt: 1
                  }}
                >
                  {empRctfytodayComplt + empVerifiedToday}
                </Typography>
                <Typography sx={{ flex: 1, fontSize: 25, pb: 0.8, textAlign: 'center', color: 'grey' }}>
                  Rectified Today
                </Typography>
              </Paper>
              <Paper
                sx={{
                  flex: 1,
                  width: 100,
                  mx: 1,
                  border: 1,
                  borderColor: '#DFE3ED',
                  borderRadius: 5,
                  bgcolor: '#F7F2EF'
                }}
              >
                <Typography
                  sx={{
                    flex: 1,
                    fontSize: 55,
                    textAlign: 'center',
                    fontWeight: 600,
                    color: '#AC203D',
                    pt: 1
                  }}
                >
                  {pendingToday}
                </Typography>
                <Typography sx={{ flex: 1, fontSize: 25, pb: 0.8, textAlign: 'center', color: 'grey' }}>
                  Pending Today
                </Typography>
              </Paper>
            </Box>
            <Box sx={{ flex: 1, display: 'flex', mb: 1, mt: 1, px: 2 }}>
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
          <Box sx={{ flex: 1, mr: 1 }}>
            <Box
              sx={{
                width: 180,
                height: 33,
                margin: 'auto',
                bgcolor: 'var(--royal-purple-300)',
                mr: 0.1,
                borderRadius: 1,
                px: 2.5,
                my: 0,
                mt: 1
              }}
            >
              <CssVarsProvider>
                <Input
                  size="sm"
                  name="searchMonthAndYear"
                  type="month"
                  value={searchMonthAndYear}
                  onChange={e => monthChange(e)}
                  variant="plain"
                  sx={{
                    bgcolor: 'transparent',
                    color: 'white',
                    borderColor: 'neutral.outlinedBorder',
                    '&:hover': {
                      borderColor: 'neutral.outlinedHoverBorder',
                      color: 'white'
                    },
                    '&::before': {
                      border: '1px solid var(--Input-focusedHighlight)',
                      transform: 'scaleX(0)',
                      left: 0,
                      right: 0,
                      bottom: 0,
                      top: 'unset',
                      transition: 'transform .15s cubic-bezier(0.1,0.9,0.2,1)',
                      borderRadius: 0
                    },
                    '&:focus-within::before': {
                      transform: 'scaleX(0)'
                    }
                  }}
                />
              </CssVarsProvider>
            </Box>
            <Typography
              sx={{
                flex: 1,
                textAlign: 'center',
                bgcolor: '#DFE3ED',
                fontWeight: 600,
                mt: 0.5,
                fontSize: 40,
                px: 0.5,
                color: '#394457'
              }}
            >
              Pending Task
            </Typography>
            <Box sx={{ flex: 1, display: 'flex', my: 2 }}>
              <Typography sx={{ flex: 0.5, ml: 2, fontSize: 25, color: 'grey' }}> Task Id</Typography>
              <Typography
                sx={{
                  flex: 2,
                  display: 'flex',
                  justifyContent: 'flex-end',
                  mr: 2,
                  fontSize: 25,
                  color: 'grey'
                }}
              >
                {' '}
                Countdown
              </Typography>
            </Box>
            <Box sx={{ height: '70vh', overflow: 'auto' }}>
              {sortedOverdueTaskList.length !== 0 ? (
                <>
                  <Box sx={{ flex: 1 }}>
                    {sortedOverdueTaskList &&
                      sortedOverdueTaskList.map(val => {
                        return (
                          <Box key={val.tm_task_slno} sx={{ flex: 1, display: 'flex', mb: 2 }}>
                            <Box sx={{ flex: 0.6, fontSize: 30, pl: 4 }}>{val.tm_task_slno}</Box>
                            <Box sx={{ flex: 2, fontWeight: 600, color: 'grey', fontSize: 30 }}>
                              <Box
                                sx={{
                                  bgcolor: '#EAEAEA',
                                  borderRadius: 15,
                                  mb: 0.5,
                                  width: '100%',
                                  pl: 1,
                                  height: '100%'
                                }}
                              >
                                <CountDowncomponent DueDates={val.tm_task_due_date} />
                              </Box>
                            </Box>
                          </Box>
                        )
                      })}
                  </Box>
                </>
              ) : (
                <Box sx={{ flex: 1, mt: 5 }}>
                  <Typography sx={{ textAlign: 'center', fontSize: 50, color: 'lightgrey', fontWeight: 600 }}>
                    {' '}
                    No Dues
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Paper>
  )
}

export default memo(MainPerformane)
