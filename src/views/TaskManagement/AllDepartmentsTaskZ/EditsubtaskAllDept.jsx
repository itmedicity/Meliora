import { Avatar, Box, CssVarsProvider, Textarea, Tooltip, Typography } from '@mui/joy'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import TmMultEmpSelectUnderDeptSec from 'src/views/CommonSelectCode/TmMultEmpSelectUnderDeptSec'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useDispatch, useSelector } from 'react-redux';
import { axioslogin } from 'src/views/Axios/Axios';
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode';
import CusCheckBox from 'src/views/Components/CusCheckBox';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import moment from 'moment';
import AutoDeleteTwoToneIcon from '@mui/icons-material/AutoDeleteTwoTone';
import DueDateModal from '../ModalComponent/DueDateModal';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SubTaskProgressTable from '../Mytask/SubTaskProgressTable';
import TmDepartmentSelectSubTask from 'src/views/CommonSelectCode/TmDepartmentSelectSubTask';
import TmDeptSectionSubtask from 'src/views/CommonSelectCode/TmDeptSectionSubtask';
import { getDepartmentSubTask } from 'src/redux/actions/TmDepartment.action';

const EditsubtaskAllDept = ({ subTaskData, setflag, tableRendering, setTableRendering, tableCount, setTableCount, tm_task_due_date }) => {

    const { tm_task_slno, tm_task_status, em_name, tm_project_slno, main_task_slno, create_date, tm_mast_duedate_count, } = subTaskData

    const [employeeSubTask, setEmployeeSubTask] = useState(0)
    const dispatch = useDispatch();
    const [empArry, setEmpArry] = useState([])
    const [tabledataProgress, setTableDataProgress] = useState([])
    const [progressCountSub, setprogressCountSub] = useState(0)
    const [completedSub, setCompletedSub] = useState(tm_task_status === 1 ? true : tm_task_status === 2 ? false : tm_task_status === 3 ? false : tm_task_status === 4 ? false : false)
    const [onProgressSub, setOnProgressSub] = useState(tm_task_status === 2 ? true : tm_task_status === 1 ? false : tm_task_status === 3 ? false : tm_task_status === 4 ? false : false)
    const [onHoldSub, setOnHoldSub] = useState(tm_task_status === 3 ? true : tm_task_status === 1 ? false : tm_task_status === 2 ? false : tm_task_status === 4 ? false : false)
    const [onPendingSub, setOnPendingSub] = useState(tm_task_status === 4 ? true : tm_task_status === 1 ? false : tm_task_status === 2 ? false : tm_task_status === 3 ? false : false)
    const [checkFlagSub, setcheckFlagSub] = useState(tm_task_status)
    const [valueSubProgress, setvalueSubProgress] = useState(0)
    const [changeAssignee, setchangeAssignee] = useState(0)
    const [departmentSubTask, setdepartmentSubTask] = useState(0)
    const [departmentSecSubTask, setdepartmentSecSubTask] = useState(0)
    const [countDue, setcountDue] = useState(0)
    const [checksubtaskdue, setchecksubtaskdue] = useState('')
    const [subTaskMast, setSubTaskMastEdit] = useState({
        tm_task_slno: '',
        subTaskName: '',
        subTaskDueDate: '',
        subTaskDescription: '',
        onholdremarksSub: '',
        completedremarksSub: '',
        pendingremarkSub: '',
    })
    const { subTaskName, subTaskDueDate, subTaskDescription, onholdremarksSub, completedremarksSub, pendingremarkSub } = subTaskMast
    const [dueDateModalFlag, setdueDateModalFlag] = useState(0)
    const [dueDateModal, setdueDateModal] = useState(false)
    const [dueDates, setdueDates] = useState([])
    let newDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    const ChangeCompletedSub = useCallback((e) => {
        if (e.target.checked === true) {
            setCompletedSub(true)
            setOnProgressSub(false)
            setOnHoldSub(false)
            setOnPendingSub(false)
            setcheckFlagSub(1)
        }
        else {
            setCompletedSub(false)
            setOnProgressSub(false)
            setOnHoldSub(false)
            setOnPendingSub(false)
            setcheckFlagSub(0)
        }
    }, [])
    const ChangeOnProgressSub = useCallback((e) => {
        if (e.target.checked === true) {
            setCompletedSub(false)
            setOnProgressSub(true)
            setOnHoldSub(false)
            setOnPendingSub(false)
            setcheckFlagSub(2)
        }
        else {
            setCompletedSub(false)
            setOnProgressSub(false)
            setOnHoldSub(false)
            setOnPendingSub(false)
            setcheckFlagSub(0)
        }
    }, [])
    const ChangeOnHoldSub = useCallback((e) => {
        if (e.target.checked === true) {
            setCompletedSub(false)
            setOnHoldSub(true)
            setOnProgressSub(false)
            setOnPendingSub(false)
            setcheckFlagSub(3)
        }
        else {
            setCompletedSub(false)
            setOnProgressSub(false)
            setOnHoldSub(false)
            setOnPendingSub(false)
            setcheckFlagSub(0)
        }
    }, [])
    const ChangeOnPendingSub = useCallback((e) => {
        if (e.target.checked === true) {
            setCompletedSub(false)
            setOnProgressSub(false)
            setOnHoldSub(false)
            setOnPendingSub(true)
            setcheckFlagSub(4)
        }
        else {
            setCompletedSub(false)
            setOnProgressSub(false)
            setOnHoldSub(false)
            setOnPendingSub(false)
            setcheckFlagSub(0)
        }
    }, [])

    const SubTaskUpdate = useCallback(
        (e) => {
            const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
            setSubTaskMastEdit({ ...subTaskMast, [e.target.name]: value })
        },
        [subTaskMast],
    )
    const id = useSelector((state) => {
        return state.LoginUserData.empid
    })
    const postEmpDetails = employeeSubTask && employeeSubTask.map((val) => {
        return {
            tm_task_slno: tm_task_slno,
            tm_assigne_emp: val,
            tm_detail_status: 1,
            tm_detl_create: id
        }
    })
    const inactive = empArry && empArry.map((val) => {
        return {
            tm_task_slno: tm_task_slno,
            tm_assigne_emp: val.tm_assigne_emp,
        }
    })

    useEffect(() => {
        dispatch(getDepartmentSubTask())
    }, [dispatch])


    useEffect(() => {
        const getDueCount = async () => {
            const result = await axioslogin.get(`/TmAllDeptTask/getDuedateCount/${1}`);
            const { data } = result.data;
            if (data.length !== 0) {
                const { tm_duedate_count } = data[0]
                setcountDue(tm_duedate_count)
            }
            else {
                setcountDue(0)
            }
        }
        getDueCount()
    }, [])

    useEffect(() => {
        const getSubTask = async (tm_task_slno) => {
            const result = await axioslogin.get(`/taskManagement/subtaskviewByidForEdit/${tm_task_slno}`);
            const { success, data } = result.data;
            if (success === 2) {
                const { tm_task_name, tm_task_due_date, tm_task_description, tm_task_dept, tm_task_dept_sec, } = data[0]
                setchecksubtaskdue(tm_task_due_date)
                const formdata = {
                    tm_task_slno: tm_task_slno,
                    subTaskName: tm_task_name,
                    subTaskDueDate: tm_task_due_date,
                    subTaskDescription: tm_task_description,
                }
                setSubTaskMastEdit(formdata)
                setdepartmentSubTask(tm_task_dept)
                setdepartmentSecSubTask(tm_task_dept_sec)
            }
        }
        const getMastEmployee = async (tm_task_slno) => {
            const result = await axioslogin.get(`/taskManagement/viewMasterEmpByid/${tm_task_slno}`);
            const { success, data } = result.data;
            if (data.length !== 0) {
                if (success === 2) {
                    const setEmpData = data && data.map((val) => {
                        return {
                            tm_task_slno: tm_task_slno,
                            tm_assigne_emp: val.tm_assigne_emp,
                        }
                    })
                    setEmpArry(setEmpData)
                }
            }
        }
        getSubTask(tm_task_slno)
        getMastEmployee(tm_task_slno);
    }, [tm_task_slno, dispatch, id])

    const updateSubTask = useMemo(() => {
        return {
            tm_task_slno: tm_task_slno,
            tm_task_name: subTaskName === '' ? null : subTaskName,
            tm_task_due_date: subTaskDueDate === '' ? null : subTaskDueDate,
            tm_task_description: subTaskDescription === '' ? null : subTaskDescription,
            tm_task_dept: departmentSubTask === 0 ? null : departmentSubTask,
            tm_task_dept_sec: departmentSecSubTask === 0 ? null : departmentSecSubTask,
            tm_pending_remark: pendingremarkSub === '' ? null : pendingremarkSub,
            tm_onhold_remarks: onholdremarksSub === '' ? null : onholdremarksSub,
            tm_completed_remarks: completedremarksSub === '' ? null : completedremarksSub,
            tm_complete_date: completedSub === true ? newDate : null,
            tm_project_slno: tm_project_slno,
            main_task_slno: main_task_slno,
            tm_mast_duedate_count: (checksubtaskdue !== subTaskDueDate) ? tm_mast_duedate_count + 1 : tm_mast_duedate_count,
            tm_task_status: checkFlagSub,
            edit_user: id
        }
    }, [tm_task_slno, subTaskName, subTaskDueDate, subTaskDescription, checkFlagSub, completedremarksSub, main_task_slno, completedSub, newDate,
        pendingremarkSub, tm_project_slno, onholdremarksSub, departmentSubTask, departmentSecSubTask, checksubtaskdue, tm_mast_duedate_count, id])

    const reset = useCallback(() => {
        const frmdata = {
            tm_task_slno: '',
            subTaskName: '',
            subTaskDueDate: '',
            subTaskDescription: '',
            onholdremarksSub: '',
            completedremarksSub: '',
            pendingremarkSub: '',
        }
        setSubTaskMastEdit(frmdata)
        setEmployeeSubTask([])
        setOnProgressSub(false)
        setCompletedSub(false)
        setflag(0)
    }, [setSubTaskMastEdit, setEmployeeSubTask, setCompletedSub, setOnProgressSub, setflag]);

    const [taskProgressSub, setTaskProgressSub] = useState({
        progress_slno: '',
        tm_task_slno: tm_task_slno,
        tm_task_status: checkFlagSub,
        tm_progres_date: '',
        progress_emp: id,
        tm_task_progress: ''
    })
    const { progress_slno, tm_progres_date, tm_task_progress } = taskProgressSub

    const ProgresssUpdateSub = useCallback(
        (e) => {
            const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
            setTaskProgressSub({ ...taskProgressSub, [e.target.name]: value })
        },
        [taskProgressSub],
    )
    const postProgressSub = useMemo(() => {
        return {
            tm_task_slno: tm_task_slno,
            tm_task_status: checkFlagSub,
            tm_progres_date: tm_progres_date === '' ? null : tm_progres_date,
            progress_emp: id,
            main_task_slno: main_task_slno,
            tm_task_progress: tm_task_progress === '' ? null : tm_task_progress,
        }
    }, [tm_task_slno, checkFlagSub, tm_progres_date, tm_task_progress, main_task_slno, id])

    const patchProgressSub = useMemo(() => {
        return {
            progress_slno: progress_slno,
            tm_task_slno: tm_task_slno,
            tm_task_status: checkFlagSub,
            tm_progres_date: tm_progres_date === '' ? null : tm_progres_date,
            progress_emp: id,
            tm_task_progress: tm_task_progress,
        }
    }, [progress_slno, tm_task_slno, checkFlagSub, tm_progres_date, tm_task_progress, id])

    const ProgressDataSub = useMemo(() => {
        return {
            tm_task_slno: tm_task_slno
        }
    }, [tm_task_slno])
    useEffect(() => {
        const getProgress = async () => {
            const result = await axioslogin.post('/taskManagement/viewSubProgress', ProgressDataSub);
            const { success, data } = result.data;
            if (data.length !== 0) {
                if (success === 2) {
                    const arry = data?.map((val) => {
                        const obj = {
                            progress_slno: val.progress_slno,
                            tm_task_slno: val.tm_task_slno,
                            tm_task_status: val.tm_task_status,
                            tm_progres_date: val.tm_progres_date,
                            em_name: val.em_name,
                            tm_task_progress: val.tm_task_progress
                        }
                        return obj
                    })
                    setTableDataProgress(arry)
                } else {
                    setTableDataProgress([])
                    warningNotify('error occured')
                }
            }
        }
        getProgress(ProgressDataSub)
    }, [progressCountSub, ProgressDataSub])

    const resetProgressSub = () => {
        const form = {
            progress_slno: '',
            tm_progres_date: '',
            tm_task_progress: '',
        }
        setTaskProgressSub(form)
    }
    const InsertProgressSub = useCallback((e) => {
        e.preventDefault()
        if (tm_progres_date !== '') {
            const InsertMastProgress = async (postProgressSub) => {
                const result = await axioslogin.post('/taskManagement/insertProgress', postProgressSub)
                const { message, success } = result.data
                if (success === 1) {
                    succesNotify(message)
                    setprogressCountSub(progressCountSub + 1)
                    setTableCount(tableCount + 1)
                    resetProgressSub()
                } else if (success === 0) {
                    infoNotify(message)
                } else {
                    infoNotify(message)
                }
            }
            InsertMastProgress(postProgressSub)
        } else {
            infoNotify('Please Select Date For Entering Task Progress')
        }
    }, [postProgressSub, progressCountSub, tm_progres_date, tableCount, setTableCount])
    const rowSelectSubProgress = useCallback((data) => {
        setvalueSubProgress(1)
        const {
            progress_slno,
            tm_task_slno,
            tm_task_status,
            tm_progres_date,
            progress_emp,
            tm_task_progress
        } = data

        const frmdata = {
            progress_slno: progress_slno,
            tm_task_slno: tm_task_slno,
            tm_task_status: tm_task_status,
            tm_progres_date: tm_progres_date === '' ? null : tm_progres_date,
            progress_emp: progress_emp,
            tm_task_progress: tm_task_progress === '' ? null : tm_task_progress
        }
        setTaskProgressSub(frmdata)
    }, [])
    const UpdateProgressSub = useCallback((e) => {
        e.preventDefault()
        if (tm_progres_date !== '') {
            const UpdateProgressMast = async (patchProgress) => {
                const result = await axioslogin.patch('/taskManagement/updateProgress', patchProgress)
                const { message, success } = result.data
                if (success === 2) {
                    succesNotify(message)
                    setprogressCountSub(progressCountSub + 1)

                    resetProgressSub()
                    setvalueSubProgress(0)
                } else if (success === 0) {
                    infoNotify(message)
                } else {
                    infoNotify(message)
                }
            }
            UpdateProgressMast(patchProgressSub)
        } else {
            infoNotify('Please Select Date For Entering Task Progress')
        }
    }, [patchProgressSub, progressCountSub, tm_progres_date,])

    const SubmitTask = useCallback((e) => {
        e.preventDefault()
        const UpdateTask = async (updateSubTask) => {
            const result = await axioslogin.patch('/taskManagement/updateSubTask', updateSubTask)
            return result.data
        }
        const Inactiveemp = async (inactive) => {
            const result = await axioslogin.post(`/taskManagement/employeeInactive`, inactive);
            return result.data
        }
        const UpdateSubTaskDtl = async (postEmpDetails) => {
            const result = await axioslogin.post(`/taskManagement/insertSubtaskDetail`, postEmpDetails);
            return result.data
        }

        if (subTaskName !== '') {
            UpdateTask(updateSubTask).then((value) => {
                const { message, success } = value
                if (success === 2) {
                    if (employeeSubTask !== 0) {
                        Inactiveemp(inactive).then((value) => {
                            const { message, succes } = value
                            if (succes === 1) {
                                UpdateSubTaskDtl(postEmpDetails)
                                const { message, success } = value
                                if (success === 1) {
                                    if ((completedSub === true && completedremarksSub === null) || (onHoldSub === true && onholdremarksSub === null)
                                        || (onPendingSub === true && pendingremarkSub === null)) {
                                        infoNotify('please enter Remarks')
                                    } else {
                                        succesNotify(message)
                                        setTableRendering(tableRendering + 1)
                                        setTableCount(tableCount + 1)
                                        reset()
                                    }
                                }
                                else {
                                    setTableRendering(tableRendering + 1)
                                    setTableCount(tableCount + 1)
                                }
                            }
                            else {
                                if ((completedSub === true && completedremarksSub === null) || (onHoldSub === true && onholdremarksSub === null)
                                    || (onPendingSub === true && pendingremarkSub === null)) {
                                    infoNotify('please enter Remarks')
                                } else {
                                    succesNotify(message)
                                    reset()
                                }
                            }
                        })
                        succesNotify(message)
                        reset()
                    }
                    else {
                        if ((completedSub === true && completedremarksSub === null) || (onHoldSub === true && onholdremarksSub === null)
                            || (onPendingSub === true && pendingremarkSub === null)) {
                            infoNotify('please enter Remarks')
                        } else {
                            succesNotify(message)
                            setTableRendering(tableRendering + 1)
                            setTableCount(tableCount + 1)
                            reset()
                        }
                    }
                }
                else {
                    warningNotify(message)
                }
            })
        }
        else {
            infoNotify('please Fill Mandatory fields While Editing Subtask')
        }
    }, [updateSubTask, inactive, postEmpDetails, subTaskName, tableRendering, setTableRendering, setTableCount, tableCount, completedremarksSub, onHoldSub, onholdremarksSub, onPendingSub,
        pendingremarkSub, reset, completedSub, employeeSubTask])

    const changeEmp = useCallback((e) => {
        setchangeAssignee(1)

    }, [])

    const getAllDueDates = useCallback(() => {
        const getDueDate = async () => {
            const result = await axioslogin.get(`/taskManagement/getAllDueDates/${tm_task_slno}`)
            const { success, data } = result.data;
            if (success === 2) {
                if (data.length > 1) {
                    setdueDates(data)
                    setdueDateModalFlag(1)
                    setdueDateModal(true)
                } else if (data.length === 1) {
                    infoNotify('Duedate is not extended')
                } else if (data.length === 0) {
                    infoNotify('Duedate is not extended')
                }
            }
        }
        getDueDate()
    }, [tm_task_slno])

    return (
        <Box>
            <Box>
                {dueDateModalFlag === 1 ?
                    <DueDateModal dueDateModal={dueDateModal} taskName={subTaskName} dueDates={dueDates} setdueDateModalFlag={setdueDateModalFlag}
                        setdueDateModal={setdueDateModal} tm_task_due_date={subTaskDueDate} create_date={create_date} />
                    : null}
            </Box>
            <Box sx={{ display: 'flex', mx: 2 }}>
                <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', }}>
                        <Box sx={{ flex: 2, mr: 1 }}>
                            <Box sx={{ color: '#000C66', fontFamily: 'Georgia', pl: .5, display: 'flex' }}>
                                Subtask Name<Typography sx={{ color: '#B32800' }}>*</Typography>
                            </Box>
                            <Textarea
                                type="text"
                                size="sm"
                                placeholder="Subtask Name*"
                                variant="outlined"
                                name="subTaskName"
                                value={subTaskName}
                                style={{ minHeight: 57 }}
                                maxRows={3}
                                onChange={(e) => SubTaskUpdate(e)}
                            ></Textarea>
                        </Box>
                        <Box sx={{ flex: 1, mr: 1 }}>
                            <Box sx={{ color: '#000C66', fontFamily: 'Georgia', pl: .5, display: 'flex' }}>
                                Due Date<Typography sx={{ color: '#B32800' }}>*</Typography>
                            </Box>
                            <Tooltip color="warning" title={tm_mast_duedate_count >= countDue ? 'Cant Change Duedate, Change Limit Exceeded' : ''}>
                                <Box sx={{ display: 'flex' }}>
                                    <Box sx={{ flex: 1 }}>
                                        <TextFieldCustom
                                            type="datetime-local"
                                            size="sm"
                                            name="subTaskDueDate"
                                            value={subTaskDueDate}
                                            onchange={SubTaskUpdate}
                                            slotProps={{
                                                input: {
                                                    min: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                                                    max: moment(new Date(tm_task_due_date)).format('YYYY-MM-DD HH:mm:ss'),
                                                },
                                            }}
                                            disabled={tm_mast_duedate_count >= countDue}
                                            style={{ minHeight: 57 }}
                                        ></TextFieldCustom>
                                    </Box>
                                    <Box sx={{ ml: .2, mt: 1, pt: 1 }}>
                                        <Tooltip title={'Changed Duedates'}>
                                            <AutoDeleteTwoToneIcon
                                                sx={{
                                                    color: '#391306',
                                                    cursor: 'pointer',
                                                    '&:hover': { color: 'darkred' }
                                                }}
                                                onClick={getAllDueDates} />
                                        </Tooltip>
                                    </Box>
                                </Box>
                            </Tooltip>
                        </Box>
                        <Box sx={{ flex: 2, mr: .5 }}>
                            <Box sx={{ color: '#000C66', fontFamily: 'Georgia', pl: .5 }}>
                                Description
                            </Box>
                            <Textarea
                                type="text"
                                size="sm"
                                placeholder="type here..."
                                variant="outlined"
                                style={{ minHeight: 57 }}
                                maxRows={3}
                                name="subTaskDescription"
                                value={subTaskDescription}
                                onChange={(e) => SubTaskUpdate(e)}
                            >
                            </Textarea>
                        </Box>
                    </Box>
                    <Box sx={{ flex: 1, display: 'flex' }}>
                        <Box sx={{ flex: 1, mr: 1 }}>
                            <Box sx={{ color: '#000C66', fontFamily: 'Georgia', pl: .5 }}>
                                Department
                            </Box>
                            <TmDepartmentSelectSubTask
                                departmentSub={departmentSubTask}
                                setDepartmentSub={setdepartmentSubTask}
                            />
                        </Box>
                        <Box sx={{ flex: 1, mr: 1 }}>
                            <Box sx={{ color: '#000C66', fontFamily: 'Georgia', pl: .5 }}>
                                Section
                            </Box>
                            <TmDeptSectionSubtask
                                deptsecSub={departmentSecSubTask}
                                setDeptSecSub={setdepartmentSecSubTask}
                            />
                        </Box>
                        <Box sx={{ flex: 1, mr: 1 }}>
                            <Box sx={{ color: '#000C66', fontFamily: 'Georgia', pl: .5, display: 'flex' }}>
                                Assignee<Typography sx={{ color: '#B32800' }}>*</Typography>
                            </Box>
                            {changeAssignee === 0 ?
                                <Box sx={{ display: 'flex', }}>
                                    <Box sx={{ flex: 1, }}>
                                        <Textarea
                                            type="text"
                                            name="em_name"
                                            value={em_name}
                                            disabled
                                            style={{ minHeight: 53 }}
                                        >
                                        </Textarea></Box>
                                    <Box sx={{ pt: 2 }}>
                                        <Tooltip title="Change Assignees">
                                            <ChangeCircleIcon sx={{ cursor: 'pointer' }}
                                                onClick={changeEmp} />
                                        </Tooltip>
                                    </Box>
                                </Box>
                                :
                                <TmMultEmpSelectUnderDeptSec
                                    value={employeeSubTask}
                                    setValue={setEmployeeSubTask}
                                />}
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ pt: 4, px: 1.5 }}>
                    {((onHoldSub !== true) && (completedSub !== true) && (onPendingSub !== true)) ?
                        <Box sx={{ flex: .1, pr: 1, pt: 4.3 }}>
                            <Avatar sx={{ bgcolor: '#E4D4C8' }}>
                                <CheckCircleIcon sx={{ fontSize: 30, cursor: 'pointer', color: '#523A28' }}
                                    onClick={SubmitTask}
                                />
                            </Avatar>
                        </Box> :
                        <Box sx={{ pr: .5 }}></Box>}
                </Box>
            </Box>
            <Box sx={{ display: 'flex', mt: 1 }}>
                <Box sx={{ flex: 1, }}>
                    <Box sx={{ mt: .5, display: 'flex', justifyContent: 'flex-end' }}>
                        <CusCheckBox
                            color="primary"
                            size="lg"
                            name="completedSub"
                            value={completedSub}
                            checked={completedSub}
                            onCheked={ChangeCompletedSub}
                        ></CusCheckBox>
                    </Box>
                    <Box sx={{ mt: 1, display: 'flex', justifyContent: 'flex-end' }}>
                        <CusCheckBox
                            color="primary"
                            size="lg"
                            name="onProgressSub"
                            value={onProgressSub}
                            checked={onProgressSub}
                            onCheked={ChangeOnProgressSub}
                        ></CusCheckBox>
                    </Box>
                    <Box sx={{ mt: 1, display: 'flex', justifyContent: 'flex-end' }}>
                        <CusCheckBox
                            color="primary"
                            size="lg"
                            name="onHoldSub"
                            value={onHoldSub}
                            checked={onHoldSub}
                            onCheked={ChangeOnHoldSub}
                        ></CusCheckBox>
                    </Box>
                    <Box sx={{ mt: 1, display: 'flex', justifyContent: 'flex-end' }}>
                        <CusCheckBox
                            color="primary"
                            size="lg"
                            name="onPendingSub"
                            value={onPendingSub}
                            checked={onPendingSub}
                            onCheked={ChangeOnPendingSub}
                        ></CusCheckBox>
                    </Box>
                </Box>
                <Box sx={{ flex: 5, }}>
                    <Box sx={{ pl: .8, pt: .5, color: '#000C66', fontFamily: 'Georgia', }}>
                        Task Completed
                    </Box>
                    <Box sx={{ pl: .8, pt: 1, color: '#000C66', fontFamily: 'Georgia', }}>
                        Task On Progress
                    </Box>
                    <Box sx={{ pl: .8, pt: 1, color: '#000C66', fontFamily: 'Georgia', }}>
                        Task On Hold
                    </Box>
                    <Box sx={{ pl: .8, pt: 1, color: '#000C66', fontFamily: 'Georgia', }}>
                        Task On Pending
                    </Box>
                </Box>
                <Box sx={{ flex: 10, }}>
                    {onHoldSub === true ?
                        <Box sx={{ border: 1, borderRadius: 5, borderColor: '#D9E4EC' }}>
                            < Typography sx={{ pl: 1, fontSize: 20, }}>
                                On Hold Remarks
                            </Typography>
                            <Box sx={{ m: 1 }}>
                                <Textarea
                                    type="text"
                                    size="sm"
                                    placeholder="type here..."
                                    variant="outlined"
                                    minRows={4}
                                    maxRows={5}
                                    name="onholdremarksSub"
                                    value={onholdremarksSub}
                                    onChange={SubTaskUpdate}
                                >
                                </Textarea>
                            </Box>
                        </Box>
                        : null}
                    {completedSub === true ?
                        <Box sx={{ border: 1, borderRadius: 5, borderColor: '#D9E4EC' }}>
                            < Typography sx={{ pl: 1, fontSize: 20, }}>
                                Completed Remarks
                            </Typography>
                            <Box sx={{ m: 1 }}>
                                <Textarea
                                    type="text"
                                    size="sm"
                                    placeholder="type here..."
                                    variant="outlined"
                                    minRows={4}
                                    maxRows={5}
                                    name="completedremarksSub"
                                    value={completedremarksSub}
                                    onChange={SubTaskUpdate}
                                >
                                </Textarea>
                            </Box>
                        </Box>
                        : null}
                    {onPendingSub === true ?
                        <Box sx={{ border: 1, borderRadius: 5, borderColor: '#D9E4EC' }}>
                            < Typography sx={{ pl: 1, fontSize: 20, }}>
                                Pending Remarks
                            </Typography>
                            <Box sx={{ m: 1 }}>
                                <Textarea
                                    type="text"
                                    size="sm"
                                    placeholder="type here..."
                                    variant="outlined"
                                    minRows={4}
                                    maxRows={5}
                                    name="pendingremarkSub"
                                    value={pendingremarkSub}
                                    onChange={SubTaskUpdate}
                                >
                                </Textarea>
                            </Box>
                        </Box>
                        : null}
                </Box>
                <Box sx={{ flex: 14, py: 7, pl: 1, }}>
                    {((onHoldSub === true) || (completedSub === true) || (onPendingSub === true)) ?
                        <CheckCircleOutlineIcon sx={{ fontSize: 30, cursor: 'pointer', color: '#003B73' }}
                            onClick={SubmitTask}
                        /> : null}
                </Box>
            </Box>
            {onProgressSub === true ?
                <Box sx={{ mr: 2, ml: 1, mt: 2, border: 1, borderColor: '#710019', borderRadius: 4, }}>
                    < Typography sx={{ pl: 1, fontSize: 20, color: '#000C66', fontFamily: 'Georgia', pt: .5 }}>
                        Subtask Progress
                    </Typography>
                    <Box sx={{ display: 'flex', }}>
                        <Box sx={{ flex: 4, pb: 1, }}>
                            < Typography sx={{ pl: 1.5, mt: 1, color: '#000C66', fontFamily: 'Georgia', }}>
                                Progress Date
                            </Typography>
                            <Box sx={{ pl: 1 }}>
                                <TextFieldCustom
                                    slotProps={{
                                        input: {
                                            min: create_date,
                                            max: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                                        },
                                    }}
                                    type="datetime-local"
                                    size="sm"
                                    name="tm_progres_date"
                                    value={tm_progres_date}
                                    onchange={ProgresssUpdateSub}
                                ></TextFieldCustom>
                            </Box>
                        </Box>
                        <Box sx={{ flex: 15, }}>
                            < Typography sx={{ pl: 1.5, mt: 1, color: '#000C66', fontFamily: 'Georgia', }}>
                                Progress description
                            </Typography>
                            <Box sx={{ mx: 1, }}>
                                <Textarea
                                    type="text"
                                    size="sm"
                                    placeholder="type here..."
                                    variant="outlined"
                                    minRows={1}
                                    maxRows={2}
                                    name="tm_task_progress"
                                    value={tm_task_progress}
                                    onChange={(e) => ProgresssUpdateSub(e)}
                                >
                                </Textarea>
                            </Box>
                            <Box sx={{ height: 3 }}></Box>
                        </Box>
                        <Box sx={{ pr: 1, pt: 4 }}>
                            {valueSubProgress === 0 ?
                                <Box>
                                    <CssVarsProvider>
                                        <Tooltip title="add  progress">
                                            <AddCircleOutlineIcon sx={{ fontSize: 30, cursor: 'pointer', color: '#003B73' }}
                                                onClick={InsertProgressSub}
                                            />
                                        </Tooltip>
                                    </CssVarsProvider>
                                </Box> :
                                valueSubProgress === 1 ? <Box>
                                    <CssVarsProvider>
                                        <Tooltip title="edit  progress">
                                            <CheckCircleOutlineIcon sx={{ fontSize: 30, cursor: 'pointer', color: '#003B73' }}
                                                onClick={UpdateProgressSub}
                                            />
                                        </Tooltip>
                                    </CssVarsProvider>
                                </Box>
                                    : null}

                        </Box>
                    </Box>
                    <SubTaskProgressTable
                        tabledataProgress={tabledataProgress}
                        rowSelectSubProgress={rowSelectSubProgress} />
                </Box>
                : null}
        </Box>
    )
}

export default memo(EditsubtaskAllDept)