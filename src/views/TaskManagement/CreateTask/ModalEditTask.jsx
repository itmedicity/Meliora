import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { Box, Button, Chip, Modal, ModalDialog, Textarea, Tooltip, Typography, } from '@mui/joy'
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import TextFieldCustom from 'src/views/Components/TextFieldCustom';
import { DialogActions } from '@mui/material';
import { axioslogin } from 'src/views/Axios/Axios';
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode';
import { getDepartSecemployee } from 'src/redux/actions/EmpNameDeptSect.action';
import CusCheckBox from 'src/views/Components/CusCheckBox';
import { getprojectFrTaskCreation } from 'src/redux/actions/TmProjectsList.action';
import imageCompression from 'browser-image-compression';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import EmpProgressTable from '../Mytask/EmpProgressTable';
import AddSubTaskEmp from '../Mytask/AddSubTaskEmp';
import EditSubtaskEmp from '../Mytask/EditSubtaskEmp';
import SubtaskTableEmp from '../Mytask/SubtaskTableEmp';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import moment from 'moment';
import AutoDeleteTwoToneIcon from '@mui/icons-material/AutoDeleteTwoTone';
import DueDateModal from '../ModalComponent/DueDateModal';
import CancelIcon from '@mui/icons-material/Cancel';
import Inputcomponent from '../TaskComponents/Inputcomponent';
import TmMultAssigneesSelect from 'src/views/CommonSelectCode/TmMultAssigneesSelect';
import ProjectCreation from '../ModalComponent/ProjectCreation';
import AttachmentIcon from '@mui/icons-material/Attachment';
import TmProjectListInTaskCreaation from 'src/views/CommonSelectCode/TmProjectListInTaskCreaation';

const ModalEditTask = ({ open, masterData, setEditModalFlag, setEditModalOpen, tableCount, setTableCount, searchFlag, taskcount, settaskcount,
    statuscount, setstatuscount, projectcount, setProjectcount }) => {

    const { tm_task_slno, main_task_slno, tm_project_slno, tm_task_status, dept_name, em_name, create_date, tm_project_name, tm_task_due_date, tm_mast_duedate_count,
        tm_project_duedate } = masterData

    const dispatch = useDispatch();
    const [departmentMast, setdepartmentMast] = useState(0)
    const [departmentSecMast, setdepartmentSecMast] = useState(0)
    const [employeeMast, setEmployeeMast] = useState(0)
    const [tableRendering, setTableRendering] = useState(0)
    const [empArry, setEmpArry] = useState([])
    const [arry, setArry] = useState([])
    const [flag, setflag] = useState(0)
    const [subTaskData, setsubTaskData] = useState([])
    const [selectTaskfile, setselectTaskfile] = useState([])
    const [projectz, setprojectz] = useState(tm_project_slno === null ? '' : tm_project_slno)
    const [value, setvalue] = useState(0)
    const [completed, setCompleted] = useState(tm_task_status === 1 ? true : tm_task_status === 2 ? false : tm_task_status === 3 ? false : tm_task_status === 4 ? false : false)
    const [onProgress, setOnProgress] = useState(tm_task_status === 2 ? true : tm_task_status === 1 ? false : tm_task_status === 3 ? false : tm_task_status === 4 ? false : false)
    const [onHold, setOnHold] = useState(tm_task_status === 3 ? true : tm_task_status === 1 ? false : tm_task_status === 2 ? false : tm_task_status === 4 ? false : false)
    const [onPending, setOnPending] = useState(tm_task_status === 4 ? true : tm_task_status === 1 ? false : tm_task_status === 2 ? false : tm_task_status === 3 ? false : false)
    const [checkFlag, setcheckFlag] = useState(tm_task_status)
    const [subTask, setSubTask] = useState([])
    const [viewSubTask, setViewSubTask] = useState(0)
    const [progresstabledata, setProgressTableData] = useState([])
    const [progressCount, setprogressCount] = useState(0)
    const [completeFlag, setCompleteFlag] = useState(0)
    const [changeAssignee, setchangeAssignee] = useState(0)
    const [dueDateModalFlag, setdueDateModalFlag] = useState(0)
    const [dueDateModal, setdueDateModal] = useState(false)
    const [dueDates, setdueDates] = useState([])
    const [addProjectFlag, setAddProjectFlag] = useState(0)
    const [addProjectModalOpen, setaddProjectlModalOpen] = useState(false)
    const [dueDateProject, setdueDateProject] = useState('')
    const [countDue, setcountDue] = useState(0)
    let newDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    const id = useSelector((state) => { return state.LoginUserData.empid })
    const [taskData, setTaskData] = useState({
        tm_task_slno: '',
        taskName: '',
        dueDate: '',
        description: '',
        pendingRemarks: '',
        onHoldRemaks: '',
        completedRemarks: '',
    })



    const { taskName, dueDate, description, onHoldRemaks, pendingRemarks, completedRemarks } = taskData
    const taskDataUpdate = useCallback(
        (e) => {
            const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
            setTaskData({ ...taskData, [e.target.name]: value })
        },
        [taskData],
    )
    const ChangeCompleted = useCallback((e) => {
        if (e.target.checked === true) {
            setCompleted(true)
            setOnProgress(false)
            setOnHold(false)
            setOnPending(false)
            setcheckFlag(1)
        }
        else {
            setCompleted(false)
            setOnProgress(false)
            setOnHold(false)
            setOnPending(false)
            setcheckFlag(0)
        }
    }, [])
    const ChangeOnProgress = useCallback((e) => {
        if (e.target.checked === true) {
            setCompleted(false)
            setOnProgress(true)
            setOnHold(false)
            setOnPending(false)
            setcheckFlag(2)
        }
        else {
            setCompleted(false)
            setOnProgress(false)
            setOnHold(false)
            setOnPending(false)
            setcheckFlag(0)
        }
    }, [])
    const ChangeOnHold = useCallback((e) => {
        if (e.target.checked === true) {
            setCompleted(false)
            setOnHold(true)
            setOnProgress(false)
            setOnPending(false)
            setcheckFlag(3)
        }
        else {
            setCompleted(false)
            setOnProgress(false)
            setOnHold(false)
            setOnPending(false)
            setcheckFlag(0)
        }
    }, [])
    const ChangeOnPending = useCallback((e) => {
        if (e.target.checked === true) {
            setCompleted(false)
            setOnProgress(false)
            setOnHold(false)
            setOnPending(true)
            setcheckFlag(4)
        }
        else {
            setCompleted(false)
            setOnProgress(false)
            setOnHold(false)
            setOnPending(false)
            setcheckFlag(0)
        }
    }, [])
    const [taskProgress, setTaskProgress] = useState({
        progress_slno: '',
        tm_task_slno: tm_task_slno,
        tm_task_status: checkFlag,
        tm_progres_date: '',
        progress_emp: id,
        tm_task_progress: ''
    })
    const { progress_slno, tm_progres_date, tm_task_progress, } = taskProgress
    const ProgresssUpdate = useCallback(
        (e) => {
            const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
            setTaskProgress({ ...taskProgress, [e.target.name]: value })
        },
        [taskProgress],
    )
    const postProgress = useMemo(() => {
        return {
            tm_task_slno: tm_task_slno,
            tm_task_status: checkFlag,
            tm_progres_date: tm_progres_date === '' ? null : tm_progres_date,
            progress_emp: id,
            main_task_slno: main_task_slno,
            tm_task_progress: tm_task_progress === '' ? null : tm_task_progress,
        }
    }, [tm_task_slno, checkFlag, tm_progres_date, tm_task_progress, main_task_slno, id])

    const patchProgress = useMemo(() => {
        return {
            progress_slno: progress_slno,
            tm_task_slno: tm_task_slno,
            tm_task_status: checkFlag,
            tm_progres_date: tm_progres_date === '' ? null : tm_progres_date,
            progress_emp: id,
            tm_task_progress: tm_task_progress,
        }
    }, [progress_slno, tm_task_slno, checkFlag, tm_progres_date, tm_task_progress, id])

    const ProgressData = useMemo(() => {
        return {
            tm_task_slno: tm_task_slno
        }
    }, [tm_task_slno])

    useEffect(() => {
        const getProgress = async () => {
            const result = await axioslogin.post('/taskManagement/viewProgress', ProgressData);
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
                    setProgressTableData(arry)
                }
                else {
                    setProgressTableData([])
                }
            }

        }
        getProgress(ProgressData)
    }, [progressCount, tableCount, ProgressData])

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
        dispatch(getprojectFrTaskCreation())
    }, [dispatch,])

    const handleEditClose = useCallback(() => {
        setEditModalFlag(0)
        setEditModalOpen(false)
    }, [setEditModalOpen, setEditModalFlag])

    const resetProgress = useCallback((e) => {
        const form = {
            progress_slno: '',
            tm_progres_date: '',
            tm_task_progress: '',
        }
        setTaskProgress(form)
    }, [])

    const InsertProgress = useCallback((e) => {
        e.preventDefault()
        if (tm_progres_date !== '') {
            const InsertMastProgress = async (postProgress) => {
                const result = await axioslogin.post('/taskManagement/insertProgress', postProgress)

                const { message, success } = result.data
                if (success === 1) {
                    succesNotify(message)
                    setprogressCount(progressCount + 1)
                    setTableCount(tableCount + 1)
                    setprogressCount(progressCount + 1)
                    resetProgress()
                } else if (success === 0) {
                    infoNotify(message)
                } else {
                    infoNotify(message)
                }
            }
            InsertMastProgress(postProgress)
        } else {
            infoNotify('Please Select Date For Entering Task Progress')
        }
    }, [postProgress, progressCount, tm_progres_date, setTableCount, tableCount, resetProgress])

    const rowSelect = useCallback((data) => {
        setvalue(1)
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
        setTaskProgress(frmdata)
    }, [])

    const UpdateProgress = useCallback((e) => {
        e.preventDefault()
        if (tm_progres_date !== '') {
            const UpdateProgressMast = async (patchProgress) => {
                const result = await axioslogin.patch('/taskManagement/updateProgress', patchProgress)
                const { message, success } = result.data
                if (success === 2) {
                    succesNotify(message)
                    setprogressCount(progressCount + 1)
                    resetProgress()
                    setvalue(0)
                } else if (success === 0) {
                    infoNotify(message)
                } else {
                    infoNotify(message)
                }
            }
            UpdateProgressMast(patchProgress)
        } else {
            infoNotify('Please Select Date For Entering Task Progress')
        }
    }, [patchProgress, progressCount, tm_progres_date, resetProgress])

    useEffect(() => {
        if (tm_project_slno !== null) {
            const getprojectduedate = async (tm_project_slno) => {
                const result = await axioslogin.get(`/TmGraph/projectduedate/${tm_project_slno}`);
                const { success, data } = result.data;
                if (success === 2) {
                    const { tm_project_duedate } = data[0]
                    setdueDateProject(tm_project_duedate)
                }
            }
            getprojectduedate(tm_project_slno)
        }
    }, [tm_project_slno])


    useEffect(() => {
        const getMasterTask = async (tm_task_slno) => {
            const result = await axioslogin.get(`/taskManagement/viewMasterTaskByid/${tm_task_slno}`);
            const { success, data } = result.data;
            if (success === 2) {
                const { tm_task_slno, tm_task_name, tm_task_due_date, tm_task_description, tm_project_slno, tm_task_status,
                    tm_pending_remark, tm_onhold_remarks, tm_completed_remarks } = data[0]
                const formdata = {
                    taskSlno: tm_task_slno,
                    taskName: tm_task_name,
                    dueDate: (tm_task_due_date ? tm_task_due_date : ''),
                    description: (tm_task_description ? tm_task_description : ''),
                    pendingRemarks: (tm_pending_remark ? tm_pending_remark : ''),
                    onHoldRemaks: (tm_onhold_remarks ? tm_onhold_remarks : ''),
                    completedRemarks: (tm_completed_remarks ? tm_completed_remarks : ''),
                }
                setTaskData(formdata)
                setdepartmentMast(empdept)
                setdepartmentSecMast(empsecid)
                setprojectz(tm_project_slno === null ? '' : tm_project_slno)
                setCompleted(tm_task_status === 1 ? true : false)
                setOnProgress(tm_task_status === 2 ? true : false)
            }
            else {
                setTaskData(false)
            }
        }
        const getMastEmployee = async (tm_task_slno) => {
            const result = await axioslogin.get(`/taskManagement/viewMasterEmpByid/${tm_task_slno}`);
            const { success, data } = result.data;
            if (data.length !== 0) {
                if (success === 2) {
                    const setEmpData = data && data.map((val) => {
                        return {
                            tm_create_detl_slno: val.tm_create_detl_slno,
                            tm_assigne_emp: val.tm_assigne_emp,
                            tm_detl_edit: id
                        }
                    })
                    setEmpArry(setEmpData)
                }
                else {
                    setEmpArry([])
                }
            }

        }
        getMasterTask(tm_task_slno)
        getMastEmployee(tm_task_slno);
    }, [tm_task_slno, dispatch, empdept, empsecid, tm_project_slno, setEmpArry, id])

    const openAddSubtask = useCallback((e) => {
        setflag(1)
    }, [setflag])

    const updateMasterTask = useMemo(() => {
        return {
            tm_task_slno: tm_task_slno,
            tm_task_name: taskName === '' ? null : taskName,
            tm_task_due_date: dueDate === '' ? null : dueDate,
            tm_task_description: description === '' ? null : description,
            tm_task_dept: departmentMast === 0 ? null : departmentMast,
            tm_task_dept_sec: departmentSecMast === 0 ? null : departmentSecMast,
            tm_task_status: checkFlag,
            tm_pending_remark: pendingRemarks === '' ? null : pendingRemarks,
            tm_onhold_remarks: onHoldRemaks === '' ? null : onHoldRemaks,
            tm_completed_remarks: completedRemarks === '' ? null : completedRemarks,
            tm_project_slno: projectz === '' ? null : projectz,
            tm_complete_date: completed === true ? newDate : null,
            tm_mast_duedate_count: (tm_task_due_date !== dueDate) ? tm_mast_duedate_count + 1 : tm_mast_duedate_count,
            edit_user: id,
        }
    }, [tm_task_slno, taskName, checkFlag, dueDate, description, departmentMast, departmentSecMast, pendingRemarks, onHoldRemaks, completedRemarks, projectz,
        completed, newDate, tm_mast_duedate_count, tm_task_due_date, id])

    const postEmpDetails = employeeMast && employeeMast.map((val) => {
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

    const selectForEditsSubTask = useCallback((value) => {
        setflag(2)
        setsubTaskData(value)
    }, [setsubTaskData])

    const handleTaskFileChange = useCallback((e) => {
        const newFiles = [...selectTaskfile]
        newFiles.push(e.target.files[0])
        setselectTaskfile(newFiles)
    }, [selectTaskfile, setselectTaskfile])

    const handleImageUpload = useCallback(async (imageFile) => {
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
        }
        const compressedFile = await imageCompression(imageFile, options)
        return compressedFile
    }, []);

    const SubmitTask = useCallback((e) => {
        e.preventDefault()
        const UpdateTask = async (updateMasterTask) => {
            const result = await axioslogin.patch('/taskManagement/updateMasterTask', updateMasterTask)
            return result.data
        }
        const Inactiveemp = async (inactive) => {
            const result = await axioslogin.post('/taskManagement/employeeInactive', inactive);
            return result.data
        }
        const UpdateSubTaskDtl = async (postEmpDetails) => {
            const result = await axioslogin.post('/taskManagement/insertDetail', postEmpDetails);
            return result.data
        }

        const InsertFile = async (selectTaskfile, tm_task_slno) => {
            try {
                const formData = new FormData();
                formData.append('id', tm_task_slno);
                for (const taskFile of selectTaskfile) {
                    if (taskFile.type.startsWith('image')) {
                        const compressedFile = await handleImageUpload(taskFile);
                        formData.append('files', compressedFile, compressedFile.name);
                    } else {
                        formData.append('files', taskFile, taskFile.name);
                    }
                }
                // Use the Axios instance and endpoint that matches your server setup
                const uploadResult = await axioslogin.post('/TmFileUpload/uploadFile/task', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                return uploadResult.data;
            } catch (error) {
                warningNotify('An error occurred during file upload.');
            }
        };

        if ((taskName !== '') && (dueDate !== '')) {
            UpdateTask(updateMasterTask).then((value) => {
                const { message, success } = value
                if (success === 2) {
                    if (selectTaskfile.length !== 0) {
                        InsertFile(selectTaskfile, tm_task_slno).then((value) => {
                            const { success, message } = value
                            if (success === 1) {
                                if (employeeMast !== 0) {
                                    Inactiveemp(inactive).then((value) => {
                                        const { message, succes } = value
                                        if (succes === 1) {
                                            UpdateSubTaskDtl(postEmpDetails)
                                            const { message, success } = value
                                            if (success === 1) {
                                                succesNotify(message)
                                                setTableCount(tableCount + 1)
                                                settaskcount(taskcount + 1)
                                                setstatuscount(statuscount + 1)
                                                setProjectcount(projectcount + 1)
                                                handleEditClose()
                                            }
                                            else {
                                                handleEditClose()
                                                setTableCount(tableCount + 1)
                                                settaskcount(taskcount + 1)
                                                setstatuscount(statuscount + 1)
                                                setProjectcount(projectcount + 1)
                                            }
                                        }
                                        else {
                                            succesNotify(message)
                                            setTableCount(tableCount + 1)
                                            settaskcount(taskcount + 1)
                                            setstatuscount(statuscount + 1)
                                            setProjectcount(projectcount + 1)
                                            handleEditClose()
                                        }
                                    })
                                    succesNotify("Task Updated with file attach Successfully")
                                    handleEditClose()
                                } else {
                                    succesNotify(message)
                                    setTableCount(tableCount + 1)
                                    settaskcount(taskcount + 1)
                                    setstatuscount(statuscount + 1)
                                    setProjectcount(projectcount + 1)
                                    handleEditClose()
                                }
                            }
                            else {
                                warningNotify(message)
                            }
                        })
                    }
                    //WITHOUT FILE UPLOAD
                    else {
                        if (employeeMast !== 0) {
                            Inactiveemp(inactive).then((value) => {
                                const { message, succes } = value
                                if (succes === 1) {
                                    UpdateSubTaskDtl(postEmpDetails)
                                    const { message, success } = value
                                    if (success === 1) {
                                        setTableCount(tableCount + 1)
                                        settaskcount(taskcount + 1)
                                        setstatuscount(statuscount + 1)
                                        setProjectcount(projectcount + 1)
                                        succesNotify(message)
                                        setTableCount(tableCount + 1)
                                        handleEditClose()
                                    } else {
                                        handleEditClose()
                                        setTableCount(tableCount + 1)
                                        settaskcount(taskcount + 1)
                                        setstatuscount(statuscount + 1)
                                        setProjectcount(projectcount + 1)
                                    }
                                }
                                else {
                                    succesNotify(message)
                                    handleEditClose()
                                }
                            })
                            succesNotify(message)
                            handleEditClose()
                            // setTableCount(tableCount + 1)
                        }
                        else {
                            succesNotify(message)
                            setTableCount(tableCount + 1)
                            settaskcount(taskcount + 1)
                            setstatuscount(statuscount + 1)
                            setProjectcount(projectcount + 1)
                            handleEditClose()
                        }
                    }
                }
                else {
                    warningNotify(message)
                }
            })
        } else {
            infoNotify('please Fill Mandatory Feilds')
        }
    }, [updateMasterTask, inactive, postEmpDetails, taskName, selectTaskfile, tm_task_slno, handleEditClose, handleImageUpload, tableCount, setTableCount, dueDate,
        employeeMast, settaskcount, taskcount, setstatuscount, statuscount, setProjectcount, projectcount])

    const handleRemoveTaskFile = (index) => {
        setselectTaskfile((prevTaskFiles) => {
            const updatedFiles = [...prevTaskFiles];
            updatedFiles.splice(index, 1); // Remove the file at the specified index
            return updatedFiles;
        });
    };

    const changeEmp = useCallback((e) => {
        setchangeAssignee(1)
    }, [])

    const CreateProject = useCallback(() => {
        setAddProjectFlag(1)
        setaddProjectlModalOpen(true)
    }, [])
    const isProjectOverdue = moment().isAfter(moment(dueDateProject));

    return (
        <Box>
            <Modal
                open={open}
            >
                < ModalDialog
                    sx={{
                        width: '90vw',
                        height: '60vw',
                        p: 0,
                        overflow: 'auto'
                    }}
                >
                    {addProjectFlag === 1 ? <ProjectCreation open={addProjectModalOpen} setTableCount={setTableCount} tableCount={tableCount}
                        setAddProjectFlag={setAddProjectFlag} setaddProjectlModalOpen={setaddProjectlModalOpen}
                    /> : null}
                    {dueDateModalFlag === 1 ?
                        <DueDateModal dueDateModal={dueDateModal} dueDates={dueDates} setdueDateModalFlag={setdueDateModalFlag}
                            setdueDateModal={setdueDateModal} taskName={taskName} create_date={create_date}
                            tm_task_due_date={tm_task_due_date}
                        />
                        : null}
                    <Box sx={{ flex: 1, display: 'flex', mx: 1, mt: 2, }}>
                        <Box sx={{ flex: 1, color: 'grey' }}>
                            Task Management
                        </Box>
                        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                            <CancelIcon sx={{ color: 'darkred', cursor: 'pointer' }} onClick={handleEditClose} />
                        </Box>
                    </Box>
                    <Box sx={{ flex: 1, bgcolor: '#52688F', height: 60, py: 1, pl: 1 }}>
                        <Typography sx={{ color: 'white' }}>
                            <ModeEditIcon sx={{ height: '20px', color: 'white' }} />Task Status
                        </Typography>
                    </Box>
                    <Box>
                        {dueDateModalFlag === 1 ?
                            <DueDateModal dueDateModal={dueDateModal} taskName={taskName} dueDates={dueDates} setdueDateModalFlag={setdueDateModalFlag}
                                setdueDateModal={setdueDateModal} tm_task_due_date={tm_task_due_date} create_date={create_date} />
                            : null}
                    </Box>
                    <Box sx={{ flex: 1, display: 'flex', mx: 2 }}>
                        <Box sx={{ flex: 2 }}>
                            <Box sx={{ flex: 1, mx: 1, display: 'flex', mt: 2 }}>
                                <Typography sx={{ flex: 1, pt: 2, pr: 1.5, color: '#003B73', fontWeight: 600, fontSize: 12, display: 'flex', justifyContent: 'flex-end', }}>
                                    Project</Typography>
                                <Box sx={{ display: 'flex', flex: 3.5, }}>

                                    {main_task_slno === null ?
                                        <Box sx={{ mt: .5, flex: 1 }}>
                                            <TmProjectListInTaskCreaation projectz={projectz} setprojectz={setprojectz} setdueDateProject={setdueDateProject} />
                                        </Box> :
                                        <Box sx={{ flex: 1 }}>
                                            {tm_project_name === null ?
                                                <Inputcomponent
                                                    type="text"
                                                    name="tm_project_name"
                                                    disabled
                                                />
                                                : <Inputcomponent
                                                    type="text"
                                                    name="tm_project_name"
                                                    value={tm_project_name}
                                                    disabled
                                                />}
                                        </Box>
                                    }
                                    <Box sx={{ ml: .5, pt: 2 }}
                                        onClick={CreateProject}
                                    >
                                        <Tooltip title="Create New Project">
                                            <Chip sx={{ cursor: 'pointer', bgcolor: '#90CDD0', color: 'black', '&:hover': { bgcolor: '#77A7B0' } }}
                                            > &nbsp;+ create&nbsp;</Chip>
                                        </Tooltip>
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{ flex: 1, mx: 1, display: 'flex', mt: 2, }}>
                                <Typography sx={{
                                    flex: 1, color: '#003B73', fontWeight: 600, fontSize: 12,
                                    display: 'flex', justifyContent: 'flex-end', pt: 1.5, pr: 1.5,
                                }}>
                                    Task  <span style={{ color: '#74112F', fontSize: 15 }} >*</span></Typography>
                                <Box sx={{ flex: 3.5 }}>
                                    <Inputcomponent
                                        placeholder="New Task"
                                        type="text"
                                        name="taskName"
                                        value={taskName}
                                        onchange={taskDataUpdate}
                                    />
                                </Box>
                            </Box>
                            <Box sx={{ flex: 1, display: 'flex', mt: 2, mx: 1 }}>
                                <Typography sx={{
                                    flex: 1.7, color: '#003B73', fontWeight: 600, fontSize: 12,
                                    display: 'flex', justifyContent: 'flex-end', pt: 2, pr: 1.5
                                }}>
                                    Department</Typography>
                                <Box sx={{ flex: 2.3, pr: .5 }}>
                                    <Inputcomponent
                                        type="text"
                                        name="dept_name"
                                        value={dept_name}
                                        disabled
                                    />
                                </Box>
                                <Typography sx={{
                                    width: 110, color: '#003B73', fontWeight: 600, fontSize: 12,
                                    pt: 1.8, pl: 2
                                }}>
                                    Section</Typography>
                                <Box sx={{ flex: 2.6, }}>
                                    <Inputcomponent
                                        type="text"
                                        name="secName"
                                        value={secName}
                                        disabled
                                    />
                                </Box>
                            </Box>
                            <Box sx={{ flex: 1, display: 'flex', mt: 2, mx: 1 }}>
                                <Typography sx={{
                                    flex: 1.7, color: '#003B73', fontWeight: 600, fontSize: 12,
                                    display: 'flex', justifyContent: 'flex-end', pt: 1.5, pr: 1.5
                                }}>
                                    Created Date</Typography>


                                <Box sx={{ flex: 2.3, }}>
                                    <Inputcomponent
                                        type="text"
                                        name="create_date"
                                        value={create_date}
                                        disabled
                                    />
                                </Box>
                                <Typography sx={{
                                    width: 110, color: '#003B73', fontWeight: 600, fontSize: 12,
                                    pt: 1.8, pl: 2.5
                                }}>
                                    Duedate <span style={{ color: '#74112F', fontSize: 15 }} >*</span></Typography>
                                <Box sx={{ flex: 2.5, }}>
                                    <Tooltip color="warning"
                                        title={
                                            tm_mast_duedate_count >= countDue ? 'Cant Change Duedate, Change Limit Exceeded' :
                                                isProjectOverdue ? "Due date cannot be change because the selected Project is already overdue.To change tasks due date, please update the Project's due date."
                                                    : ''}
                                        sx={{ width: 280 }}>
                                        <Box sx={{ pt: .4 }}>
                                            {tm_project_slno !== null ?
                                                <Inputcomponent
                                                    type="datetime-local"
                                                    name="dueDate"
                                                    value={dueDate}
                                                    slotProps={{
                                                        input: {
                                                            // if there is subtasks under this task cant reset duedate lesser than the actual duedate
                                                            min: completeFlag.length === 0 ? moment(new Date()).format('YYYY-MM-DD HH:mm:ss') :
                                                                moment(new Date(tm_task_due_date)).format('YYYY-MM-DD HH:mm:ss'),
                                                            max: moment(new Date(tm_project_duedate)).format('YYYY-MM-DD HH:mm:ss'),
                                                        },
                                                    }}
                                                    onchange={taskDataUpdate}
                                                    disabled={tm_mast_duedate_count >= countDue || isProjectOverdue}
                                                /> :
                                                <Inputcomponent
                                                    type="datetime-local"
                                                    name="dueDate"
                                                    value={dueDate}
                                                    slotProps={{
                                                        input: {
                                                            min: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                                                            max: moment(new Date(dueDateProject)).format('YYYY-MM-DD HH:mm:ss'),
                                                        },
                                                    }}
                                                    onchange={taskDataUpdate}
                                                    disabled={tm_mast_duedate_count >= countDue}
                                                />}
                                        </Box>
                                    </Tooltip>
                                </Box>
                                <Box>
                                    <AutoDeleteTwoToneIcon sx={{
                                        color: '#92443A',
                                        '&:hover': { color: 'darkred' }
                                    }}
                                        onClick={getAllDueDates}
                                    />
                                </Box>
                            </Box>
                            <Box sx={{ flex: 1, display: 'flex', mt: 2, }}>
                                <Typography sx={{
                                    flex: 1, color: '#003B73', fontWeight: 600, fontSize: 12,
                                    display: 'flex', justifyContent: 'flex-end', pt: 1.5, pr: 1.5,
                                }}>
                                    Assignees<span style={{ color: '#74112F', fontSize: 15 }} >*</span></Typography>
                                <Box sx={{ flex: 3.5 }}>
                                    {changeAssignee === 0 ?
                                        <Box sx={{ display: 'flex', }}>
                                            <Box sx={{ flex: 1, }}>
                                                <Inputcomponent
                                                    type="text"
                                                    name="em_name"
                                                    value={em_name}
                                                    disabled
                                                />
                                            </Box>
                                            <Box sx={{ pt: .5 }}>
                                                <Tooltip title="Change Assignees">
                                                    <ChangeCircleIcon sx={{ cursor: 'pointer' }}
                                                        onClick={changeEmp} />
                                                </Tooltip>
                                            </Box>
                                        </Box> :
                                        <Box sx={{ display: 'flex', }}>
                                            <Box sx={{ flex: 1, }}>
                                                <TmMultAssigneesSelect value={employeeMast} setValue={setEmployeeMast} />
                                            </Box>
                                        </Box>
                                    }
                                </Box>
                            </Box>
                            <Box sx={{ flex: 1, display: 'flex', mt: 2, }}>
                                <Typography sx={{
                                    flex: 1, color: '#003B73', fontWeight: 600, fontSize: 12,
                                    display: 'flex', justifyContent: 'flex-end', pt: 1.5, pr: 1.5,
                                }}>
                                    Task Description</Typography>
                                <Box sx={{ flex: 3.5 }}>
                                    <Inputcomponent
                                        placeholder="Describtion"
                                        type="text"
                                        name="description"
                                        value={description}
                                        onchange={taskDataUpdate}
                                    />
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{ flex: .5 }}>
                        </Box>
                    </Box>
                    <Box sx={{ flex: 1, display: 'flex' }}>
                        <Box sx={{ flex: 1.1 }}></Box>
                        <Box sx={{ flex: 8.5 }}>
                            <Box sx={{
                                fontFamily: 'Georgia',
                                height: 50, mt: .5, border: 1, borderRadius: 1, borderStyle: 'dashed', display: 'flex',
                                borderColor: '#887BB0', flex: 1, ml: 6, mr: 30, py: 1
                            }}>
                                <Box sx={{
                                    color: '#0000FF', cursor: 'pointer', '&:hover': { color: '#000C66' }, textAlign: 'center', width: 160, border: .1,
                                    mx: .5, borderRadius: 5, borderColor: '#E4E5E8'
                                }}>
                                    <label htmlFor="file-input">
                                        <AttachmentIcon sx={{ color: '#0000FF', cursor: 'pointer', '&:hover': { color: '#000C66' }, }} /><u>Choose File</u>
                                    </label>
                                    <input
                                        id="file-input"
                                        type="file"
                                        accept=".jpg, .jpeg, .png, .pdf"
                                        style={{ display: 'none' }}
                                        onChange={handleTaskFileChange}
                                        name="selectTaskfile"
                                        multiple // Add this attribute to allow multiple file selections
                                    />

                                </Box>
                                <Box sx={{ display: 'flex', flex: 1, overflowX: "scroll", overflow: 'hidden', mx: .5 }}>
                                    {selectTaskfile && selectTaskfile.map((taskFile, index) => (
                                        <Box key={index}>
                                            <Chip sx={{ bgcolor: '#B7CFDC', width: '100%', ml: .5 }}>
                                                {taskFile.name}
                                                <CloseIcon sx={{
                                                    pl: .3, pb: .3, height: 20, width: 20, cursor: 'pointer', color: '#4D0011',
                                                    '&:hover': { color: '#BA0F30' },
                                                }}
                                                    onClick={() => handleRemoveTaskFile(index)} />
                                            </Chip>
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{ flex: .8 }}></Box>
                    </Box>
                    <Box sx={{ borderRight: 1, borderLeft: 1, borderBottom: 1, borderColor: '#D9E4EC', }}>
                        <Box sx={{ m: 2, border: 1, borderColor: '#710019', borderRadius: 3 }}>
                            <Typography sx={{ pl: 1.5, pt: .5, fontSize: 20, fontFamily: 'Georgia', color: '#000C66' }}>
                                Task Progress
                            </Typography>
                            <EmpProgressTable
                                progresstabledata={progresstabledata}
                                rowSelect={rowSelect}
                            />
                        </Box>
                        <Box sx={{ display: 'flex' }}>
                            <Box sx={{ flex: 1, }}>
                                {main_task_slno !== null ?
                                    <Box sx={{ mt: .5, display: 'flex', justifyContent: 'flex-end' }}>
                                        <CusCheckBox
                                            color="primary"
                                            size="lg"
                                            name="completed"
                                            value={completed}
                                            checked={completed}
                                            onCheked={ChangeCompleted}
                                        ></CusCheckBox>
                                    </Box> :
                                    <Box>
                                        {completeFlag.length !== 0 ?
                                            <Box sx={{ mt: .5, display: 'flex', justifyContent: 'flex-end' }}>
                                                <CusCheckBox
                                                    color="primary"
                                                    size="lg"
                                                    name="completed"
                                                    value={completed}
                                                    checked={completed}
                                                    disabled={true}
                                                ></CusCheckBox>
                                            </Box>
                                            : <Box sx={{ mt: .5, display: 'flex', justifyContent: 'flex-end' }}>
                                                <CusCheckBox
                                                    color="primary"
                                                    size="lg"
                                                    name="completed"
                                                    value={completed}
                                                    checked={completed}
                                                    onCheked={ChangeCompleted}
                                                ></CusCheckBox>
                                            </Box>}
                                    </Box>}
                                <Box sx={{ mt: 1, display: 'flex', justifyContent: 'flex-end' }}>
                                    <CusCheckBox
                                        color="primary"
                                        size="lg"
                                        name="onProgress"
                                        value={onProgress}
                                        checked={onProgress}
                                        onCheked={ChangeOnProgress}
                                    ></CusCheckBox>
                                </Box>
                                <Box sx={{ mt: 1, display: 'flex', justifyContent: 'flex-end' }}>
                                    <CusCheckBox
                                        color="primary"
                                        size="lg"
                                        name="onHold"
                                        value={onHold}
                                        checked={onHold}
                                        onCheked={ChangeOnHold}
                                    ></CusCheckBox>
                                </Box>
                                <Box sx={{ mt: 1, display: 'flex', justifyContent: 'flex-end' }}>
                                    <CusCheckBox
                                        color="primary"
                                        size="lg"
                                        name="onPending"
                                        value={onPending}
                                        checked={onPending}
                                        onCheked={ChangeOnPending}
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
                                {onHold === true ?
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
                                                name="onHoldRemaks"
                                                value={onHoldRemaks}
                                                onChange={taskDataUpdate}
                                            >
                                            </Textarea>
                                        </Box>
                                    </Box>
                                    : null}
                                {completed === true ?
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
                                                name="completedRemarks"
                                                value={completedRemarks}
                                                onChange={taskDataUpdate}
                                            >
                                            </Textarea>
                                        </Box>
                                    </Box>
                                    : null}
                                {onPending === true ?
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
                                                name="pendingRemarks"
                                                value={pendingRemarks}
                                                onChange={taskDataUpdate}
                                            >
                                            </Textarea>
                                        </Box>
                                    </Box>
                                    : null}
                            </Box>
                            <Box sx={{ flex: 14, }}>
                            </Box>
                        </Box>
                        {onProgress === true ?
                            <Box sx={{ mx: 2, mt: 2, border: 1, borderColor: '#D9E4EC', borderRadius: 4 }}>
                                < Typography sx={{ pl: 1, fontSize: 20, }}>
                                    Task Progress
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
                                                onchange={ProgresssUpdate}
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
                                                onChange={(e) => ProgresssUpdate(e)}
                                            >
                                            </Textarea>
                                        </Box>
                                        <Box sx={{ height: 3 }}></Box>
                                    </Box>
                                    <Box sx={{ pr: 1, pt: 4 }}>
                                        {value === 0 ?
                                            <Box>
                                                <AddCircleOutlineIcon sx={{ fontSize: 30, cursor: 'pointer', color: '#003B73' }}
                                                    onClick={InsertProgress}
                                                />
                                            </Box> :
                                            value === 1 ? <Box>
                                                <CheckCircleOutlineIcon sx={{
                                                    fontSize: 30, cursor: 'pointer', color: '#003B73',
                                                    '&:hover': { color: '#DBA40E' }
                                                }}
                                                    onClick={UpdateProgress}
                                                />
                                            </Box>
                                                : null}
                                    </Box>
                                </Box>
                            </Box>
                            : null}
                        {main_task_slno === null ?
                            <Box sx={{
                                m: 2,
                                border: 1,
                                borderColor: '#603A70',
                                borderRadius: 3,
                                boxShadow: '1px 1px 4px #887BB0',
                            }}>
                                {completed === true ?
                                    <Box>
                                        <Tooltip
                                            color='warning'
                                            title='unable to add a subtask to a completed task,Please update Main Task Status'
                                            placement='right'>
                                            <Box sx={{
                                                mt: 1, cursor: 'grab', width: 150, height: 40, ml: 1, border: 1, borderColor: '#D9E4EC',
                                                borderRadius: 5, pl: 1, pt: .8,
                                            }}
                                            >
                                                Add Subtask&nbsp;<AddIcon />
                                            </Box>
                                        </Tooltip>
                                    </Box> :
                                    <Box sx={{
                                        mt: 1, cursor: 'pointer', width: 150, height: 40, ml: 1, border: 1, borderColor: '#D9E4EC',
                                        borderRadius: 5, pl: 1, pt: 1, color: '#774A62'
                                    }}
                                        onClick={openAddSubtask}
                                    >
                                        Add Subtask&nbsp;&nbsp;&nbsp;
                                        {flag === 1 ?
                                            <RemoveIcon sx={{ fontSize: 25, color: '#004F76' }} /> :
                                            flag === 0 || flag === 2 ?
                                                <AddIcon sx={{ fontSize: 25, color: '#004F76' }} /> : null}
                                    </Box>}
                                <Box sx={{ mt: 1, pl: 1, }}>
                                    {
                                        flag === 1 ?
                                            <Box>
                                                <AddSubTaskEmp
                                                    tm_task_slno={tm_task_slno}
                                                    tm_task_due_date={tm_task_due_date}
                                                    setTableRendering={setTableRendering}
                                                    tableRendering={tableRendering}
                                                    setflag={setflag}
                                                    tm_project_slno={tm_project_slno}
                                                    tableCount={tableCount}
                                                    setTableCount={setTableCount}
                                                    searchFlag={searchFlag}

                                                />
                                            </Box> :
                                            flag === 2 ?
                                                <Box>
                                                    <EditSubtaskEmp setflag={setflag} subTaskData={subTaskData}
                                                        setsubTaskData={setsubTaskData}
                                                        setTableRendering={setTableRendering}
                                                        tableRendering={tableRendering}
                                                        tableCount={tableCount}
                                                        setTableCount={setTableCount}
                                                        tm_task_due_date={tm_task_due_date}
                                                    />
                                                </Box>
                                                : null
                                    }
                                </Box>
                                <Box>
                                    <Box>
                                        < SubtaskTableEmp
                                            completeFlag={completeFlag}
                                            setCompleteFlag={setCompleteFlag}
                                            tableCount={tableCount}
                                            arry={arry}
                                            setArry={setArry}
                                            tm_task_slno={tm_task_slno}
                                            setflag={setflag}
                                            selectForEditsSubTask={selectForEditsSubTask}
                                            tableRendering={tableRendering}
                                            setTableRendering={setTableRendering}
                                            subTask={subTask}
                                            setSubTask={setSubTask}
                                            viewSubTask={viewSubTask}
                                            setViewSubTask={setViewSubTask}
                                        />
                                    </Box>
                                </Box>
                                <Box sx={{ height: 5, }}></Box>
                            </Box> : null}
                        <Box sx={{ height: 10 }}></Box>
                    </Box>
                    <DialogActions>
                        <Box sx={{ textAlign: 'right' }}>
                            <Button
                                variant="plain"
                                onClick={SubmitTask}
                                sx={{ color: "#004F76", fontSize: 16, }}
                            >Update</Button>
                            <Button
                                variant="plain"
                                sx={{ color: "#004F76", fontSize: 16, }}
                                onClick={handleEditClose}
                            >Cancel</Button>
                        </Box>
                    </DialogActions>
                </ModalDialog>
            </Modal>
        </Box >
    )
}
export default memo(ModalEditTask)