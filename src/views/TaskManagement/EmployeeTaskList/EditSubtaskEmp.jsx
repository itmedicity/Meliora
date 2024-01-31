import { Box, Textarea, Tooltip, Typography } from '@mui/joy'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import TmMultEmpSelectUnderDeptSec from 'src/views/CommonSelectCode/TmMultEmpSelectUnderDeptSec'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useDispatch, useSelector } from 'react-redux';
import { axioslogin } from 'src/views/Axios/Axios';
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode';
import { getDepartSecemployee } from 'src/redux/actions/EmpNameDeptSect.action';
import CusCheckBox from 'src/views/Components/CusCheckBox';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SubTaskProgressTable from './SubTaskProgressTable';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
const EditSubtaskEmp = ({ subTaskData, setflag, tableRendering, setTableRendering }) => {

    const { tm_task_slno, tm_task_status, tm_pending_remark, tm_onhold_remarks, tm_completed_remarks, em_name, tm_project_slno } = subTaskData



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
    const [subTaskMast, setSubTaskMast] = useState({
        tm_task_slno: '',
        subTaskName: '',
        subTaskDueDate: '',
        subTaskDescription: '',
        onholdremarksSub: tm_onhold_remarks,
        completedremarksSub: tm_completed_remarks,
        pendingremarkSub: tm_pending_remark,

    })
    const { subTaskName, subTaskDueDate, subTaskDescription, onholdremarksSub, completedremarksSub, pendingremarkSub } = subTaskMast

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

    const closeSubTask = useCallback((e) => {
        setflag(0)
    }, [setflag])

    const SubTaskUpdate = useCallback(
        (e) => {
            const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
            setSubTaskMast({ ...subTaskMast, [e.target.name]: value })
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
    const secName = useSelector((state) => {
        return state.LoginUserData.empdeptsec
    })
    const empdept = useSelector((state) => {
        return state.LoginUserData.empdept
    })
    const empsecid = useSelector((state) => {
        return state.LoginUserData.empsecid
    })
    useEffect(() => {
        dispatch(getDepartSecemployee(empsecid))
    }, [dispatch, empsecid])

    useEffect(() => {
        const getSubTask = async (tm_task_slno) => {
            const result = await axioslogin.get(`/taskManagement/subtaskviewByidForEdit/${tm_task_slno}`);
            const { success, data } = result.data;
            if (success === 2) {
                const { tm_task_name, tm_task_due_date, tm_task_description, tm_task_status } = data[0]
                const formdata = {
                    tm_task_slno: tm_task_slno,
                    subTaskName: tm_task_name,
                    subTaskDueDate: tm_task_due_date,
                    subTaskDescription: tm_task_description,
                    onholdremarksSub: tm_onhold_remarks,
                    completedremarksSub: tm_completed_remarks,
                    pendingremarkSub: tm_pending_remark
                }
                setSubTaskMast(formdata)
                setCompletedSub(tm_task_status === 1 ? true : false)
                setOnProgressSub(tm_task_status === 2 ? true : false)
                setOnHoldSub(tm_task_status === 3 ? true : false)
                setOnPendingSub(tm_task_status === 4 ? true : false)
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
                            edit_user: id
                        }
                    })
                    setEmpArry(setEmpData)
                }
            }
        }
        getSubTask(tm_task_slno)
        getMastEmployee(tm_task_slno);
    }, [tm_task_slno, dispatch, tm_completed_remarks, tm_onhold_remarks, tm_pending_remark, id])
    const updateSubTask = useMemo(() => {
        return {
            tm_task_slno: tm_task_slno,
            tm_task_name: subTaskName === '' ? null : subTaskName,
            tm_task_due_date: subTaskDueDate === '' ? null : subTaskDueDate,
            tm_task_description: subTaskDescription === '' ? null : subTaskDescription,
            tm_task_dept: empdept === 0 ? null : empdept,
            tm_task_dept_sec: empsecid === 0 ? null : empsecid,
            tm_pending_remark: pendingremarkSub === '' ? null : pendingremarkSub,
            tm_onhold_remarks: onholdremarksSub === '' ? null : onholdremarksSub,
            tm_completed_remarks: completedremarksSub === '' ? null : completedremarksSub,
            tm_project_slno: tm_project_slno,
            tm_task_status: checkFlagSub,
            edit_user: id

        }
    }, [tm_task_slno, subTaskName, subTaskDueDate, subTaskDescription, empdept, empsecid, checkFlagSub, completedremarksSub, pendingremarkSub, tm_project_slno, onholdremarksSub, id])


    const reset = useCallback(() => {
        const frmdata = {
            tm_sub_task_slno: '',
            subTaskName: '',
            subTaskDueDate: '',
            subTaskDescription: '',
            onholdremarksSub: '',
            completedremarksSub: '',
            pendingremarkSub: ''

        }
        setSubTaskMast(frmdata)
        setEmployeeSubTask(0)
        setOnProgressSub(false)
        setCompletedSub(false)
    }, [setSubTaskMast, setEmployeeSubTask, setCompletedSub, setOnProgressSub]);


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
            tm_task_progress: tm_task_progress === '' ? null : tm_task_progress,


        }
    }, [tm_task_slno, checkFlagSub, tm_progres_date, tm_task_progress, id])


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
    }, [postProgressSub, progressCountSub, tm_progres_date])
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
    }, [patchProgressSub, progressCountSub, tm_progres_date])




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
                                        closeSubTask()
                                        reset()
                                    }
                                }
                                else {
                                    setTableRendering(tableRendering + 1)
                                }
                            }
                            else {
                                if ((completedSub === true && completedremarksSub === null) || (onHoldSub === true && onholdremarksSub === null)
                                    || (onPendingSub === true && pendingremarkSub === null)) {
                                    infoNotify('please enter Remarks')
                                } else {
                                    succesNotify(message)
                                    closeSubTask()
                                    reset()
                                }
                            }
                        })
                        // if ((completedSub === true && completedremarksSub === null) || (onHoldSub === true && onholdremarksSub === null)
                        //     || (onPendingSub === true && pendingremarkSub === null)) {
                        //     infoNotify('please enter Remarks')
                        // } else {
                        succesNotify(message)
                        closeSubTask()
                        reset()
                        // }
                    }
                    else {
                        if ((completedSub === true && completedremarksSub === null) || (onHoldSub === true && onholdremarksSub === null)
                            || (onPendingSub === true && pendingremarkSub === null)) {
                            infoNotify('please enter Remarks')
                        } else {
                            succesNotify(message)
                            setTableRendering(tableRendering + 1)
                            closeSubTask()
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
            infoNotify('please Fill Mandatory Feilds')
        }
    }, [updateSubTask, inactive, postEmpDetails, subTaskName, tableRendering, setTableRendering, completedremarksSub, onHoldSub, onholdremarksSub, onPendingSub,
        pendingremarkSub, reset, closeSubTask, completedSub, employeeSubTask])

    const changeEmp = useCallback((e) => {
        setchangeAssignee(1)

    }, [])



    return (
        <Box>
            <Box sx={{ display: 'flex', }}>
                <Box sx={{ flex: 1, mr: 1 }}>
                    <Box sx={{ color: '#000C66', fontFamily: 'Georgia', pl: .5 }}>
                        Subtask Name
                    </Box>
                    <Textarea
                        type="text"
                        size="sm"
                        placeholder="Subtask Name*"
                        variant="outlined"
                        name="subTaskName"
                        value={subTaskName}
                        maxRows={1}
                        onChange={(e) => SubTaskUpdate(e)}

                    ></Textarea>
                </Box>
                <Box sx={{ flex: 1, mr: 1 }}>
                    <Box sx={{ color: '#000C66', fontFamily: 'Georgia', pl: .5 }}>
                        Department
                    </Box>
                    <TextFieldCustom
                        type="text"
                        name="secName"
                        value={secName}
                        disabled>
                    </TextFieldCustom>
                </Box>

                <Box sx={{ flex: 1, mr: 1 }}>
                    <Box sx={{ color: '#000C66', fontFamily: 'Georgia', pl: .5 }}>
                        Assignee
                    </Box>
                    {/* <TmMultEmpSelectUnderDeptSec
                        value={employeeSubTask}
                        setValue={setEmployeeSubTask}
                    /> */}
                    {changeAssignee === 0 ?
                        <Box sx={{ display: 'flex', }}>
                            <Box sx={{ flex: 1, }}><TextFieldCustom
                                type="text"
                                name="em_name"
                                value={em_name}
                                disabled

                            >
                            </TextFieldCustom></Box>
                            <Box sx={{ pt: .5 }}>
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
                <Box sx={{ flex: 1, mr: 1 }}>
                    <Box sx={{ color: '#000C66', fontFamily: 'Georgia', pl: .5 }}>
                        Due Date
                    </Box>
                    <TextFieldCustom
                        type="datetime-local"
                        size="sm"
                        name="subTaskDueDate"
                        value={subTaskDueDate}
                        onchange={SubTaskUpdate}
                    ></TextFieldCustom>
                </Box>
                <Box sx={{ flex: 1, mr: .5 }}>
                    <Box sx={{ color: '#000C66', fontFamily: 'Georgia', pl: .5 }}>
                        Description
                    </Box>
                    <Textarea
                        type="text"
                        size="sm"
                        placeholder="type here..."
                        variant="outlined"
                        minRows={1}
                        maxRows={3}
                        name="subTaskDescription"
                        value={subTaskDescription}
                        onChange={(e) => SubTaskUpdate(e)}
                    >
                    </Textarea>
                </Box>
                <Box sx={{ flex: .1, pr: 1, pt: 3 }}>
                    <CheckCircleOutlineIcon sx={{ fontSize: 30, cursor: 'pointer', color: '#003B73' }}
                        onClick={SubmitTask}
                    />
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
                <Box sx={{ flex: 14, }}></Box>
            </Box>


            {onProgressSub === true ?
                <Box sx={{ mr: 2, ml: 1, mt: 2, border: 1, borderColor: '#C383B5', borderRadius: 4, }}>
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
                                    // slotProps={{
                                    //     input: {
                                    //         max: moment(new Date()).format('YYYY-MM-DD'),
                                    //     },
                                    // }}
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
                                    <AddCircleOutlineIcon sx={{ fontSize: 30, cursor: 'pointer', color: '#003B73' }}
                                        onClick={InsertProgressSub}
                                    />
                                </Box> :
                                valueSubProgress === 1 ? <Box>
                                    <CheckCircleOutlineIcon sx={{ fontSize: 30, cursor: 'pointer', color: '#003B73' }}
                                        onClick={UpdateProgressSub}
                                    />
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

export default memo(EditSubtaskEmp)