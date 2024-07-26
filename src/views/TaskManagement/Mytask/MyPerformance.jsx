import { Box, CircularProgress, CssVarsProvider, Input, LinearProgress, Typography } from '@mui/joy'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux';
import { endOfMonth, endOfYear, format, parse, startOfYear } from 'date-fns';
import { startOfMonth } from 'date-fns/fp';
import { axioslogin } from 'src/views/Axios/Axios';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ProjectProgress from '../PerformanceSheet/ProjectProgress';
import TaskProgress from '../PerformanceSheet/TaskProgress';

const MyPerformance = () => {

    const empid = useSelector((state) => {
        return state.LoginUserData.empid
    })
    const [searchMonthAndYear, setSearchMonthAndYear] = useState(format(new Date(), 'yyyy-MM'));
    const [empProject, setEmpProject] = useState([])
    const [openProjects, setOpenProjects] = useState({});
    const [openTask, setOpenTask] = useState({});
    const [mainTasks, setmainTasks] = useState([])
    const [totalTaskCount, setTotalTaskCount] = useState(0);
    const [completedTaskCount, setCompletedTaskCount] = useState(0);
    const [taskProogress, settaskProogress] = useState(0)
    const [completedTaskDetailsOpen, setCompletedTaskDetailsOpen] = useState(false);
    const [completedTasksWithoutchangingDuedate, setcompletedTasksWithoutchangingDuedate] = useState(0)
    const [cmptlWithOneTimeDuedate, setcmptlWithOneTimeDuedate] = useState(0)
    const [cmptlWithTwoTimeDuedate, setcmptlWithTwoTimeDuedate] = useState(0)
    const [cmptlWithThreeTimeDuedate, setcmptlWithThreeTimeDuedate] = useState(0)
    const [cmptlWithMoreThreeTimeDuedate, setcmptlWithMoreThreeTimeDuedate] = useState(0)
    const [taskPerformance, setTaskPerformance] = useState(0)
    const [empOerdueToday, setEmpOerdueToday] = useState(0)
    const [empCompltTodayTask, setEmpCompltTodayTask] = useState(0)
    const [totalonHold, setTotalonHold] = useState(0)
    const [completedcomplaints, setCompletedcomplaints] = useState(0)
    const [empComplaintsToday, setEmpComplaintsToday] = useState(0)
    const [empTotalComplaints, setEmpTotalComplaints] = useState(0)
    const [empLinearComptProg, setEmpLinearComptProg] = useState(0)
    const [empOnholdComplaints, setEmpOnholdComplaints] = useState(0)
    const [emplPendingComplints, setEmplPendingComplints] = useState(0)
    const [empReopendCompln, setEmpReopendCompln] = useState(0)
    const [empVeriComplt, setEmpVeriComplt] = useState(0)
    const [empVeriToday, setEmpVeriToday] = useState(0)
    const [empRctfytodayComplt, setEmpRctTodayCmplt] = useState(0)
    const [complPerfm, setComplPerfm] = useState(0)
    const [EmpTotalWithouthold, setEmpTotalWithouthold] = useState(0)
    const [AdjustedCompleteion, setAdjustedCompleteion] = useState(0)
    const TotalPerformance = (EmpTotalWithouthold + empTotalComplaints) === 0 ? 0 : (((AdjustedCompleteion + completedcomplaints) / (EmpTotalWithouthold + empTotalComplaints)) * 100)
    const MonthlyPerformance = Number.isInteger(TotalPerformance) ? Number(TotalPerformance.toFixed(0)) : Number(TotalPerformance.toFixed(2));
    const [totalemployeeOverDue, setTotalemployeeOverDue] = useState(0)
    const [emplPendingComplintsMonth, setEmplPendingComplintsMonth] = useState(0)
    const [monthName, setMonthName] = useState('');


    useEffect(() => {
        const parsedDate = parse(searchMonthAndYear, 'yyyy-MM', new Date());
        const month = format(parsedDate, 'MMMM');
        setMonthName(month);
    }, [searchMonthAndYear]);

    const monthChange = useCallback((e) => {
        const value = e.target.value
        setSearchMonthAndYear(value)
    }, [])


    const searchEmpProject = useMemo(() => {
        return {
            from: format(startOfYear(new Date(searchMonthAndYear)), 'yyyy-MM-dd 00:00:00'),
            to: format(endOfYear(new Date(searchMonthAndYear)), 'yyyy-MM-dd 23:59:59'),
            tm_assigne_emp: empid,
        }
    }, [searchMonthAndYear, empid])

    const searchEmployeeTaskData = useMemo(() => {
        return {
            from: format(startOfMonth(new Date(searchMonthAndYear)), 'yyyy-MM-dd 00:00:00'),
            to: format(endOfMonth(new Date(searchMonthAndYear)), 'yyyy-MM-dd 23:59:59'),
            tm_assigne_emp: empid,
        }
    }, [searchMonthAndYear, empid])

    const searchEmployeeComplaintData = useMemo(() => {
        return {
            from: format(startOfMonth(new Date(searchMonthAndYear)), 'yyyy-MM-dd 00:00:00'),
            to: format(endOfMonth(new Date(searchMonthAndYear)), 'yyyy-MM-dd 23:59:59'),
            assigned_emp: empid,
        }
    }, [searchMonthAndYear, empid])

    const isPastDue = (tm_task_due_date) => {
        const today = new Date();
        const due = new Date(tm_task_due_date);
        return due < today;
    };
    const isToday = (date) => {
        const today = new Date();
        const ExDate = new Date(date);
        return (
            ExDate.getDate() === today.getDate() &&
            ExDate.getMonth() === today.getMonth() &&
            ExDate.getFullYear() === today.getFullYear()
        );
    };

    useEffect(() => {
        const getMasterTable = async () => {
            const result = await axioslogin.get(`/TmTableView/employeeCompleted/${empid}`);
            const { success, data } = result.data;
            if (data.length !== 0) {
                if (success === 2) {
                    const completedToday = data.filter(item => item.tm_task_status === 1 && isToday(item.tm_complete_date)).length;
                    setEmpCompltTodayTask(completedToday);
                } else {
                    setEmpCompltTodayTask(0);
                }
            }
            else {
                setEmpCompltTodayTask(0)
            }
        }
        getMasterTable(empid)
    }, [empid])

    useEffect(() => {
        const getAllTask = async () => {
            const result = await axioslogin.post('/TmGraph/getAlltaskfromtodate', searchEmployeeTaskData);
            const { success, data } = result.data;
            if (success === 2) {
                const mainTaskData = data.filter(item => item.main_task_slno === null);
                const totalTasks = data.length;
                const completedTasks = data.filter(item => item.tm_task_status === 1).length;
                const onHoldTasks = data.filter(item => isPastDue(item.tm_task_due_date) && item.tm_task_status === 3).length;
                const completedTasksWoutchangingDuedate = data.filter(item => (item.tm_task_status === 1) && item.tm_mast_duedate_count === null)
                const cmptlWOneTimeDuedate = data.filter(item => (item.tm_task_status === 1) && item.tm_mast_duedate_count === 1)
                const cmptlWTwoTimeDuedate = data.filter(item => (item.tm_task_status === 1) && item.tm_mast_duedate_count === 2)
                const cmptlWThreeTimeDuedate = data.filter(item => (item.tm_task_status === 1) && item.tm_mast_duedate_count === 3)
                const cmptlWMoreThreeTimeDuedate = data.filter(item => (item.tm_task_status === 1) && item.tm_mast_duedate_count > 3)
                const overdueToday = data.filter(item => item.tm_task_status !== 1 && isToday(item.tm_task_due_date))
                const totalWithOutHold = (totalTasks - onHoldTasks)
                const valueProgress = (completedTasks / totalTasks) * 100
                settaskProogress(valueProgress)
                setmainTasks(mainTaskData);
                setTotalTaskCount(totalTasks);
                setCompletedTaskCount(completedTasks);
                setcompletedTasksWithoutchangingDuedate(completedTasksWoutchangingDuedate.length)
                setcmptlWithOneTimeDuedate(cmptlWOneTimeDuedate.length)
                setcmptlWithTwoTimeDuedate(cmptlWTwoTimeDuedate.length)
                setcmptlWithThreeTimeDuedate(cmptlWThreeTimeDuedate.length)
                setcmptlWithMoreThreeTimeDuedate(cmptlWMoreThreeTimeDuedate.length)
                setEmpOerdueToday(overdueToday.length)
                setEmpTotalWithouthold(totalWithOutHold)
                const penaltyCounts = {};
                data.forEach(item => {
                    if (item.tm_task_status === 1 && item.tm_mast_duedate_count !== null) {
                        const count = item.tm_mast_duedate_count;
                        if (!penaltyCounts[count]) {
                            penaltyCounts[count] = 0;
                        }
                        penaltyCounts[count]++;
                    }
                });
                let adjustedCompletion = completedTasksWoutchangingDuedate;
                Object.keys(penaltyCounts).forEach(count => {
                    const countInt = parseInt(count);
                    const penalty = data.find(item => item.tm_mast_duedate_count === countInt)?.reschedule_pecent || 0;
                    adjustedCompletion += penaltyCounts[count] * ((100 - penalty) / 100);
                });
                const PerformanceProgress = (adjustedCompletion + totalWithOutHold) === 0 ? 0 : (adjustedCompletion / totalWithOutHold) * 100;
                setAdjustedCompleteion(adjustedCompletion)
                setTaskPerformance(Number.isInteger(PerformanceProgress) ? PerformanceProgress.toFixed(0) : PerformanceProgress.toFixed(2));
            }
            else {
                setmainTasks([])
                setTotalTaskCount(0);
                setCompletedTaskCount(0);
                settaskProogress(0)
                setcompletedTasksWithoutchangingDuedate(0)
                setcmptlWithOneTimeDuedate(0)
                setcmptlWithTwoTimeDuedate(0)
                setcmptlWithThreeTimeDuedate(0)
                setcmptlWithMoreThreeTimeDuedate(0)
                setEmpOerdueToday(0)
                setEmpTotalWithouthold(0)
            }
        }
        getAllTask(searchEmployeeTaskData)
    }, [searchEmployeeTaskData])

    useEffect(() => {
        const getAllComplaints = async () => {
            const result = await axioslogin.post('/TmGraph/getAllComplaintsfromtodate', searchEmployeeComplaintData);
            const { success, data } = result.data;
            if (success === 2) {
                const totalComplaints = data.length;
                const RectifiedComplints = data.filter(item => item.cm_rectify_status === 'R').length;
                const VerifiedComplints = data.filter(item => item.cm_rectify_status === 'V').length;
                const Completedcomplaints = RectifiedComplints + VerifiedComplints;
                const OnholdComplaints = data.filter(item => item.cm_rectify_status === 'O').length;
                const ReOpenedComplaints = data.filter(item => item.reopen_cm_slno !== null)
                const Pending = data.filter(item => (
                    (item.cm_rectify_status !== 'R' && item.cm_rectify_status !== 'O' && item.cm_rectify_status !== 'V') || item.cm_rectify_status === null
                ))
                const totallWithoutHold = totalComplaints - OnholdComplaints
                const ComplaintEmpProgress = (Completedcomplaints + totallWithoutHold) === 0 ? 0 : (Completedcomplaints / totallWithoutHold) * 100
                const complaintsToday = data.filter(item => isToday(item.compalint_date))
                const rectifiedToday = data.filter(item => item.cm_rectify_status === 'R' && isToday(item.cm_rectify_time))
                const verifiedToday = data.filter(item => item.cm_rectify_status === 'V' && isToday(item.cm_rectify_time))
                const ComplaintPerformnce = (Completedcomplaints + totallWithoutHold) === 0 ? 0 : (Completedcomplaints / totallWithoutHold) * 100
                setEmpTotalComplaints(totalComplaints)
                setEmpLinearComptProg(ComplaintEmpProgress)
                setEmplPendingComplintsMonth(Pending.length)
                setEmpReopendCompln(ReOpenedComplaints.length)
                setEmpComplaintsToday(complaintsToday.length)
                setEmpRctTodayCmplt(rectifiedToday.length)
                setEmpVeriComplt(VerifiedComplints)
                setEmpVeriToday(verifiedToday.length)
                setCompletedcomplaints(Completedcomplaints)
                setComplPerfm(Number.isInteger(ComplaintPerformnce) ? ComplaintPerformnce.toFixed(0) : ComplaintPerformnce.toFixed(2))
            }
            else {
                setEmpTotalComplaints(0)
                setEmpLinearComptProg(0)
                setEmplPendingComplintsMonth(0)
                setEmpReopendCompln(0)
                setEmpRctTodayCmplt(0)
                setEmpVeriComplt(0)
                setEmpVeriToday(0)
                setComplPerfm(0)
                setCompletedcomplaints(0)
            }
        }
        getAllComplaints(searchEmployeeComplaintData)
    }, [searchEmployeeComplaintData])

    const toggleProjectOpen = (projectId) => {
        setOpenProjects(prevOpenProjects => ({
            ...prevOpenProjects,
            [projectId]: !prevOpenProjects[projectId]
        }));
    };

    const toggleTaskOpen = (taskId) => {
        setOpenTask(prevOpenTasks => ({
            ...prevOpenTasks,
            [taskId]: !prevOpenTasks[taskId]
        }));
    };
    useEffect(() => {
        const getAllProjectTask = async () => {
            const result = await axioslogin.post('/TmGraph/getProjectsfromtodate', searchEmpProject)
            const { success, data } = result.data;
            if (success === 2) {
                setEmpProject(data)
            }
            else {
                setEmpProject([])
            }
        }
        getAllProjectTask(searchEmpProject)
    }, [searchEmpProject])

    const toggleCompletedTaskDetails = () => {
        setCompletedTaskDetailsOpen(!completedTaskDetailsOpen);
    };

    useEffect(() => {
        const getEmpOnHold = async () => {
            const result = await axioslogin.get(`/TmTableView/employeeOnHold/${empid}`);
            const { success, data } = result.data;
            if (success === 2) {
                const totalonHold = data.length;
                setTotalonHold(totalonHold)
            } else {
                setTotalonHold(0)
            }
        }
        getEmpOnHold(empid)
    }, [empid])

    useEffect(() => {
        const getemployeeOverDue = async () => {
            const result = await axioslogin.get(`/TmTableView/employeeOverDue/${empid}`);
            const { success, data } = result.data;
            if (success === 2) {
                const employeeOverDue = data.length;
                setTotalemployeeOverDue(employeeOverDue)
            } else {
                setTotalemployeeOverDue(0)
            }
        }
        getemployeeOverDue(empid)
    }, [empid])

    useEffect(() => {
        const getPendingComplaints = async () => {
            const result = await axioslogin.get(`/TmGraph/employeePendingcompl/${empid}`);
            const { success, data } = result.data;
            if (success === 2) {
                const totalPending = data.length;
                setEmplPendingComplints(totalPending)
            } else {
                setEmplPendingComplints(0)
            }
        }
        getPendingComplaints(empid)
    }, [empid])

    useEffect(() => {
        const getOnHoldComplaints = async () => {
            const result = await axioslogin.get(`/TmGraph/employeeOnholdcompl/${empid}`);
            const { success, data } = result.data;
            if (success === 2) {
                const OnHoldComplints = data.length;
                setEmpOnholdComplaints(OnHoldComplints)
            } else {
                setEmpOnholdComplaints(0)
            }
        }
        getOnHoldComplaints(empid)
    }, [empid])



    return (
        <Box sx={{ flex: 1, }}>
            <Box sx={{ flex: 1, justifyContent: 'flex-end', pt: .6 }}>
                <Box sx={{ width: 180, margin: 'auto', bgcolor: '#4B7BF5', mr: 3, borderRadius: 20, px: 2.5, my: 0, height: 30, pt: 0 }}>
                    <CssVarsProvider>
                        <Input
                            size="sm"
                            name="searchMonthAndYear"
                            type="month"
                            value={searchMonthAndYear}
                            onChange={(e) => monthChange(e)}
                            variant='plain'
                            sx={{
                                bgcolor: 'transparent', color: 'white',
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
                                    borderRadius: 0,
                                },
                                '&:focus-within::before': {
                                    transform: 'scaleX(0)',
                                },
                            }}
                        />
                    </CssVarsProvider>
                </Box>
            </Box>
            <Box sx={{ flex: 1, display: 'flex', }}>
                <Box sx={{ flex: 1 }}>
                    <Box sx={{ flex: 1 }}>
                        <Box sx={{ flex: 1, display: 'flex', bgcolor: 'white', py: 1.5, ml: 1, borderRadius: 12, border: 1, borderStyle: 'dashed', borderColor: '#E9EEF7' }}>
                            <Box sx={{ ml: 3, }}>
                                <CssVarsProvider>
                                    <CircularProgress determinate
                                        value={MonthlyPerformance}
                                        color={MonthlyPerformance > 85 ? "success" : MonthlyPerformance > 70 ? "primary" : MonthlyPerformance > 60 ? "neutral"
                                            : MonthlyPerformance > 50 ? "neutral" : MonthlyPerformance > 30 ? "warning" : "danger"}

                                        sx={{
                                            '--CircularProgress-size': '160px', p: 1.5,
                                            "--CircularProgress-progressThickness": "10px",
                                            "--CircularProgress-trackThickness": "10px"
                                        }}>

                                        <Typography sx={{
                                            fontSize: 30,
                                            color: { MonthlyPerformance } > 85 ? "#0A470A" : { MonthlyPerformance } > 70 ? "#12467B" :
                                                { MonthlyPerformance } > 60 ? "#492B08" : { MonthlyPerformance } > 50 ? "#492B08" :
                                                    { MonthlyPerformance } > 30 ? "#3F4146" : "#44444C"

                                        }}>
                                            {MonthlyPerformance}%
                                        </Typography>
                                    </CircularProgress>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ flex: 1 }}>
                                <Typography sx={{ fontSize: 29, fontWeight: 600, color: 'grey', pl: .8 }}>My Performance</Typography>
                                <Typography sx={{ fontSize: 12, fontWeight: 600, color: 'grey', pl: 6 }}>Task & complaints</Typography>
                                <Box sx={{ display: 'flex', pt: 1, pl: 2 }}>
                                    <Box sx={{ width: 7, height: 43, bgcolor: 'lightgrey', ml: 1 }}></Box>
                                    <Box>
                                        <Typography sx={{ fontSize: 12, fontWeight: 600, color: '#12467B', pl: .5, pr: 1 }}>Task</Typography>
                                        <Typography sx={{ fontSize: 18, fontWeight: 600, color: '#12467B', pl: .5, pr: 1 }}>{taskPerformance}%</Typography>
                                    </Box>
                                    <Box sx={{ width: 7, height: 43, bgcolor: 'lightgrey', ml: 3.5 }}></Box>
                                    <Box>
                                        <Typography sx={{ fontSize: 12, fontWeight: 600, color: '#492B08', pl: .5, pr: 1 }}>Complaints</Typography>
                                        <Typography sx={{ fontSize: 18, fontWeight: 600, color: '#492B08', pl: .5, pr: 1 }}>{complPerfm}%</Typography>
                                    </Box>
                                </Box>
                            </Box>

                        </Box>
                    </Box>
                    <Box sx={{ flex: 1, mx: .5, mt: 1.5, minHeight: 80, }}>
                        <Typography sx={{ fontWeight: 800, pt: 1, pl: 1, }}>Projects</Typography>
                        {empProject.length !== 0 ?
                            <Box sx={{ mt: 1, overflow: 'auto', maxHeight: 120, }}>
                                {empProject?.map((val) => {
                                    const isOpen = openProjects[val.tm_project_slno];
                                    return (
                                        <Box key={val.tm_project_slno} sx={{ flex: 1, mb: 1, mx: .5, borderColor: 'lightgray', pb: 1 }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', }} onClick={() => toggleProjectOpen(val.tm_project_slno)}>
                                                {isOpen ? (
                                                    <ArrowDropDownIcon sx={{ color: '#92443A', bgcolor: '#F7F7F7' }} />
                                                ) : (
                                                    <ArrowRightIcon sx={{ color: '#92443A', bgcolor: '#F7F7F7' }} />
                                                )}
                                                <Box sx={{ ml: .5 }}>
                                                    <u>{val.tm_project_name}</u>
                                                </Box>
                                            </Box>
                                            {isOpen && (
                                                <Box sx={{ mx: 2 }}>
                                                    <ProjectProgress val={val} />
                                                </Box>
                                            )}
                                        </Box>
                                    );
                                })}
                            </Box> :
                            <Box>
                                <Typography sx={{ fontWeight: 600, color: 'lightgrey', pl: 5, pt: 3 }}>No Projects Due in {monthName}</Typography>
                            </Box>}
                    </Box>
                    <Box sx={{ flex: 1, mx: .5, mt: 1, minHeight: 120, }}>
                        <Typography sx={{ fontWeight: 600, pt: .5, pl: 2 }}>Tasks</Typography>
                        {mainTasks.length !== 0 ?
                            <Box sx={{ mt: 1, overflow: 'auto', maxHeight: 150, }}>
                                {mainTasks?.map((val) => {
                                    const isOpen = openTask[val.tm_task_slno];
                                    return (
                                        <Box key={val.tm_task_slno} sx={{ flex: 1, mb: 1, mx: .5, pb: 1 }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', }} onClick={() => toggleTaskOpen(val.tm_task_slno)}>
                                                {isOpen ? (
                                                    <ArrowDropDownIcon sx={{ color: '#92443A', bgcolor: '#F7F7F7' }} />
                                                ) : (
                                                    <ArrowRightIcon sx={{ color: '#92443A', bgcolor: '#F7F7F7' }} />
                                                )}
                                                <Box sx={{ ml: .5 }}>
                                                    <u>{val.tm_task_name}</u>
                                                </Box>
                                            </Box>
                                            {isOpen && (
                                                <Box sx={{ mx: 2 }}>
                                                    <TaskProgress val={val} />
                                                </Box>
                                            )}
                                        </Box>
                                    );
                                })}
                            </Box>
                            :
                            <Box>
                                <Typography sx={{ fontWeight: 600, color: 'lightgrey', pl: 5, pt: 3 }}>No Task Due in {monthName}</Typography>
                            </Box>}
                    </Box>
                </Box>

                <Box sx={{ flex: 1.7, mr: 1, }}>
                    <Box sx={{ flex: 1, }}>
                        <Box sx={{ flex: 1, mx: .5, }}>
                            <Typography sx={{ pl: 1.5, fontWeight: 600, color: '#12467B', fontSize: 15 }}>Task</Typography>
                            <Typography sx={{ pl: 2, pt: .5, fontSize: 15, color: '#12467B' }}>{completedTaskCount}/{totalTaskCount}</Typography>
                            <Box sx={{ px: 1.5 }}>
                                <CssVarsProvider>
                                    <LinearProgress
                                        determinate value={taskProogress} />
                                </CssVarsProvider>
                            </Box>

                            <Box sx={{ flex: 1, display: 'flex' }}>
                                <Box sx={{ flex: 1, bgcolor: '#E9EEF7', mt: 1, ml: 1.5, mr: .5, height: 100 }}>
                                    <Typography sx={{ pl: 1, pt: .5, fontWeight: 600 }}><u>Today&apos;s</u></Typography>
                                    <Box sx={{ flex: 1, display: 'flex', }}>
                                        <Typography sx={{ pl: 1.5, pt: 1, fontSize: 12, flex: 1, }}>Overdue </Typography>
                                        <Box sx={{ width: 40, height: 25, border: 1, mx: 2, mt: .5, textAlign: 'center', borderRadius: 2, borderColor: '#12467B', color: '#12467B', }}>
                                            {empOerdueToday}
                                        </Box>

                                    </Box>
                                    <Box sx={{ flex: 1, display: 'flex' }}>
                                        <Typography sx={{ pl: 1.5, pt: 1, fontSize: 12, flex: 1, }}>Completed </Typography>
                                        <Box sx={{ width: 40, height: 25, border: 1, mx: 2, my: .5, textAlign: 'center', borderRadius: 2, borderColor: '#12467B', color: '#12467B', }}>
                                            {empCompltTodayTask}
                                        </Box>
                                    </Box>
                                </Box>
                                <Box sx={{ flex: 1, bgcolor: '#E9EEF7', mt: 1, mx: .5, }}>
                                    <Typography sx={{ pt: .5, fontWeight: 600, pl: 1.5 }}><u>{monthName}</u></Typography>
                                    <Box sx={{ flex: 1, display: 'flex', }}>
                                        <Typography sx={{ pl: 1.5, pt: 1, fontSize: 12, flex: 1, }}>Total </Typography>
                                        <Box sx={{ width: 40, height: 25, border: 1, mx: 2, mt: .5, textAlign: 'center', borderRadius: 2, borderColor: '#12467B', color: '#12467B', }}>
                                            {totalTaskCount}
                                        </Box>

                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <Box sx={{ display: 'flex' }}>
                                            <Typography sx={{ pl: 1.2, pt: 1, fontSize: 12, flex: 1, }}>
                                                Completed
                                                {completedTaskDetailsOpen ? (
                                                    <ArrowDropUpIcon sx={{ cursor: 'pointer' }} onClick={toggleCompletedTaskDetails} />
                                                ) : (
                                                    <ArrowDropDownIcon sx={{ cursor: 'pointer' }} onClick={toggleCompletedTaskDetails} />
                                                )}
                                            </Typography>
                                            <Box sx={{
                                                width: 40, height: 25, border: 1, mx: 2, mt: .5, textAlign: 'center', borderRadius: 2, borderColor: '#12467B',
                                                color: '#12467B',
                                            }}>
                                                {completedTaskCount}
                                            </Box>
                                        </Box>
                                        {completedTaskDetailsOpen && (
                                            <Box sx={{ flex: 1, pl: 3, pr: 3, pt: 1, mb: 2, bgcolor: '#E9EEF7', }}>
                                                <Box sx={{ flex: 1, display: 'flex', borderBottom: 1, borderColor: '#DFE3ED' }}>
                                                    <Typography sx={{ flex: 1, fontSize: 12, pl: .5, color: '#3A230A' }}>On Schedule date</Typography>
                                                    <Typography sx={{ pr: 1.5, color: '#3A230A' }}><u>{completedTasksWithoutchangingDuedate}</u></Typography>
                                                </Box>
                                                <Box sx={{ flex: 1, display: 'flex', borderBottom: 1, borderColor: '#DFE3ED' }}>
                                                    <Typography sx={{ flex: 1, fontSize: 12, pl: .5, color: '#3A230A' }}> One-time duedate extension </Typography>
                                                    <Typography sx={{ pr: 1.5, color: '#3A230A' }}><u>{cmptlWithOneTimeDuedate}</u></Typography>
                                                </Box>
                                                <Box sx={{ flex: 1, display: 'flex', borderBottom: 1, borderColor: '#DFE3ED' }}>
                                                    <Typography sx={{ flex: 1, fontSize: 12, pl: .5, color: '#3A230A' }}>Two-time duedate extension</Typography>
                                                    <Typography sx={{ pr: 1.5, color: '#3A230A' }}><u>{cmptlWithTwoTimeDuedate}</u></Typography>
                                                </Box>
                                                <Box sx={{ flex: 1, display: 'flex', borderBottom: 1, borderColor: '#DFE3ED' }}>
                                                    <Typography sx={{ flex: 1, fontSize: 12, pl: .5, color: '#3A230A' }}>Three-time duedate extension</Typography>
                                                    <Typography sx={{ pr: 1.5, color: '#3A230A' }}><u>{cmptlWithThreeTimeDuedate}</u></Typography>
                                                </Box>
                                                <Box sx={{ flex: 1, display: 'flex', borderBottom: 1, borderColor: '#DFE3ED' }}>
                                                    <Typography sx={{ flex: 1, fontSize: 12, pl: .5, color: '#3A230A' }}>More than 3 time duedate extension</Typography>
                                                    <Typography sx={{ pr: 1.5, color: '#3A230A' }}><u>{cmptlWithMoreThreeTimeDuedate}</u></Typography>
                                                </Box>
                                            </Box>
                                        )}
                                    </Box>
                                </Box>
                                <Box sx={{ flex: 1, bgcolor: '#E9EEF7', mt: 1, ml: 1.5, mr: .5, height: 100 }}>
                                    <Typography sx={{ pl: 1, pt: .5, fontWeight: 600 }}><u>Pending</u></Typography>
                                    <Box sx={{ flex: 1, display: 'flex', }}>
                                        <Typography sx={{ pl: 1.5, pt: 1, fontSize: 12, flex: 1, }}>On Hold </Typography>
                                        <Box sx={{ width: 40, height: 25, border: 1, mx: 2, mt: .5, textAlign: 'center', borderRadius: 2, borderColor: '#12467B', color: '#12467B', }}>
                                            {totalonHold}
                                        </Box>

                                    </Box>
                                    <Box sx={{ flex: 1, display: 'flex' }}>
                                        <Typography sx={{ pl: 1.5, pt: 1, fontSize: 12, flex: 1, }}>Overdue </Typography>
                                        <Box sx={{ width: 40, height: 25, border: 1, mx: 2, my: .5, textAlign: 'center', borderRadius: 2, borderColor: '#12467B', color: '#12467B', }}>
                                            {totalemployeeOverDue}
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{ flex: 1, m: .5, }}>
                            <Typography sx={{ pl: 1.5, pt: .5, fontWeight: 600, color: '#492B08', fontSize: 18 }}>Complaints</Typography>
                            <Typography sx={{ pl: 2, pt: .3, fontSize: 15, color: '#492B08' }}>{completedcomplaints}/{empTotalComplaints}</Typography>
                            <Box sx={{ px: 1.5 }}>
                                <CssVarsProvider>
                                    <LinearProgress
                                        color="warning"
                                        determinate
                                        value={empLinearComptProg} />
                                </CssVarsProvider>
                            </Box>

                            <Box sx={{ flex: 1, display: 'flex', mx: .5 }}>
                                <Box sx={{ flex: 1, bgcolor: '#E9EEF7', mt: 1, mx: 1.5, }}>
                                    <Typography sx={{ pl: 1, pt: .5, fontWeight: 600 }}><u>Today&apos;s</u></Typography>
                                    <Box sx={{ flex: 1, display: 'flex', }}>
                                        <Typography sx={{ pl: 1.5, pt: 1, fontSize: 12, flex: 1, }}>Assigned </Typography>
                                        <Box sx={{ width: 40, height: 25, border: 1, mx: 2, mt: .5, textAlign: 'center', borderRadius: 2, borderColor: '#492B08', color: '#492B08', }}>
                                            {empComplaintsToday}
                                        </Box>
                                    </Box>
                                    <Box sx={{ flex: 1, display: 'flex' }}>
                                        <Typography sx={{ pl: 1.5, pt: 1, fontSize: 12, flex: 1, }}>Rectified </Typography>
                                        <Box sx={{ width: 40, height: 25, border: 1, mx: 2, mt: .5, textAlign: 'center', borderRadius: 2, borderColor: '#492B08', color: '#492B08', }}>
                                            {empRctfytodayComplt + empVeriToday}
                                        </Box>
                                    </Box>
                                    <Box sx={{ flex: 1, display: 'flex' }}>
                                        <Typography sx={{ pl: 1.5, pt: 1, fontSize: 12, flex: 1, }}>Verified </Typography>
                                        <Box sx={{ width: 40, height: 25, border: 1, mx: 2, mt: .5, textAlign: 'center', borderRadius: 2, borderColor: '#492B08', color: '#492B08', }}>
                                            {empVeriToday}
                                        </Box>
                                    </Box>
                                </Box>
                                <Box sx={{ flex: 1, bgcolor: '#E9EEF7', mt: 1, mx: 1.5, pb: 1 }}>
                                    <Typography sx={{ pl: 1, pt: .5, fontWeight: 600 }}><u>{monthName}</u></Typography>
                                    <Box sx={{ flex: 1, display: 'flex', }}>
                                        <Typography sx={{ pl: 1.5, pt: 1, fontSize: 12, flex: 1, }}>Total </Typography>
                                        <Box sx={{ width: 40, height: 25, border: 1, mx: 2, mt: .5, textAlign: 'center', borderRadius: 2, borderColor: '#492B08', color: '#492B08', }}>
                                            {empTotalComplaints}
                                        </Box>
                                    </Box>
                                    <Box sx={{ flex: 1, display: 'flex' }}>
                                        <Typography sx={{ pl: 1.5, pt: 1, fontSize: 12, flex: 1, }}>Rectified </Typography>
                                        <Box sx={{ width: 40, height: 25, border: 1, mx: 2, mt: .5, textAlign: 'center', borderRadius: 2, borderColor: '#492B08', color: '#492B08', }}>
                                            {completedcomplaints}
                                        </Box>
                                    </Box>
                                    <Box sx={{ flex: 1, display: 'flex' }}>
                                        <Typography sx={{ pl: 1.5, pt: 1, fontSize: 12, flex: 1, }}>Verified </Typography>
                                        <Box sx={{ width: 40, height: 25, border: 1, mx: 2, mt: .5, textAlign: 'center', borderRadius: 2, borderColor: '#492B08', color: '#492B08', }}>
                                            {empVeriComplt}
                                        </Box>
                                    </Box>
                                    <Box sx={{ flex: 1, display: 'flex' }}>
                                        <Typography sx={{ pl: 1.5, pt: 1, fontSize: 12, flex: 1, }}>Re Opend </Typography>
                                        <Box sx={{ width: 40, height: 25, border: 1, mx: 2, mt: .5, textAlign: 'center', borderRadius: 2, borderColor: '#492B08', color: '#492B08', }}>
                                            {empReopendCompln}
                                        </Box>
                                    </Box>
                                    <Box sx={{ flex: 1, display: 'flex' }}>
                                        <Typography sx={{ pl: 1.5, pt: 1, fontSize: 12, flex: 1, }}>Pending</Typography>
                                        <Box sx={{ width: 40, height: 25, border: 1, mx: 2, mt: .5, textAlign: 'center', borderRadius: 2, borderColor: '#492B08', color: '#492B08', }}>
                                            {emplPendingComplintsMonth}
                                        </Box>
                                    </Box>
                                </Box>
                                <Box sx={{ flex: 1, bgcolor: '#E9EEF7', mt: 1, mx: 1.5, }}>
                                    <Typography sx={{ pl: 1, pt: .5, fontWeight: 600 }}><u>Pending</u></Typography>
                                    <Box sx={{ flex: 1, display: 'flex', }}>
                                        <Typography sx={{ pl: 1.5, pt: 1, fontSize: 12, flex: 1, }}>On Hold  </Typography>
                                        <Box sx={{ width: 40, height: 25, border: 1, mx: 2, mt: .5, textAlign: 'center', borderRadius: 2, borderColor: '#492B08', color: '#492B08', }}>
                                            {empOnholdComplaints}
                                        </Box>
                                    </Box>
                                    <Box sx={{ flex: 1, display: 'flex' }}>
                                        <Typography sx={{ pl: 1.5, pt: 1, fontSize: 12, flex: 1, }}>Total Pending </Typography>
                                        <Box sx={{ width: 40, height: 25, border: 1, mx: 2, mt: .5, textAlign: 'center', borderRadius: 2, borderColor: '#492B08', color: '#492B08', }}>
                                            {emplPendingComplints}
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box >
    )
}

export default memo(MyPerformance)



