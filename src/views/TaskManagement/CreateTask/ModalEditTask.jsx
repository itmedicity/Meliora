import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { Box, Button, CssVarsProvider, Modal, ModalDialog, Textarea, Tooltip, Typography, } from '@mui/joy'
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import TmMultEmpSelectUnderDeptSec from 'src/views/CommonSelectCode/TmMultEmpSelectUnderDeptSec';
import TextFieldCustom from 'src/views/Components/TextFieldCustom';
import { DialogActions } from '@mui/material';
import { axioslogin } from 'src/views/Axios/Axios';
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import { getDepartSecemployee } from 'src/redux/actions/EmpNameDeptSect.action';
import CusCheckBox from 'src/views/Components/CusCheckBox';
import { getProjectList } from 'src/redux/actions/TmProjectsList.action';
import TmProjectList from 'src/views/CommonSelectCode/TmProjectList';
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
const ModalEditTask = ({ open, masterData, setEditModalFlag, setEditModalOpen, tableCount, setTableCount, searchFlag, setTabledata, taskcount, settaskcount,
    statuscount, setstatuscount }) => {

    const { tm_task_slno, main_task_slno, tm_project_slno, tm_task_status, dept_name, em_name, create_date, tm_project_name, tm_task_due_date } = masterData

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
    const [projectz, setprojectz] = useState(tm_project_slno === null ? 0 : tm_project_slno)
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
            }
        }
        getProgress(ProgressData)
    }, [progressCount, tableCount, ProgressData])



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
        dispatch(getProjectList())
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
                setprojectz(tm_project_slno)
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
            tm_project_slno: projectz === 0 ? null : projectz,
            tm_complete_date: completed === true ? newDate : null
        }
    }, [tm_task_slno, taskName, checkFlag, dueDate, description, departmentMast, departmentSecMast, pendingRemarks, onHoldRemaks, completedRemarks, projectz,
        completed, newDate])




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
    const searchData = useMemo(() => {
        return {
            tm_task_dept_sec: empsecid,
            tm_project_slno: projectz,
        }
    }, [projectz, empsecid,])

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
        const ProjectSearch = async (searchData) => {
            const result = await axioslogin.post('/taskManagement/searchProjectAndEmployee', searchData)
            const { success, data } = result.data;
            if (success === 2) {
                setTabledata(data)
            }
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

        if (searchFlag === 1) {
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
                                                const { message, succes } = value
                                                if (succes === 1) {
                                                    ProjectSearch(searchData)
                                                    const { message, success } = value
                                                    if (success === 2) {
                                                        succesNotify(message)
                                                        setTableCount(tableCount + 1)
                                                        handleEditClose()
                                                    }
                                                    else {
                                                        succesNotify(message)
                                                        handleEditClose()
                                                    }
                                                }
                                                else {
                                                    succesNotify(message)
                                                    handleEditClose()
                                                    setTableCount(tableCount + 1)
                                                }
                                            }
                                            else {
                                                succesNotify(message)
                                                handleEditClose()
                                            }
                                        })
                                        succesNotify("Task Updated with file attach Successfully")
                                        handleEditClose()
                                    } else {
                                        ProjectSearch(searchData)
                                        const { message, success } = value
                                        if (success === 2) {
                                            setTableCount(tableCount + 1)
                                            succesNotify(message)
                                            handleEditClose()
                                        }
                                        else {
                                            succesNotify(message)
                                            handleEditClose()
                                        }
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
                                        const { message, succes } = value
                                        if (succes === 1) {
                                            ProjectSearch(searchData)
                                            const { message, success } = value
                                            if (success === 2) {
                                                setTableCount(tableCount + 1)
                                                succesNotify(message)
                                                handleEditClose()
                                            }
                                            else {
                                                succesNotify(message)
                                                handleEditClose()
                                            }
                                        } else {
                                            succesNotify(message)
                                            handleEditClose()
                                            setTableCount(tableCount + 1)
                                        }
                                    }
                                    else {
                                        succesNotify(message)
                                        handleEditClose()
                                    }
                                })
                                succesNotify(message)
                                handleEditClose()
                            }
                            else {
                                ProjectSearch(searchData)
                                const { message, success } = value
                                if (success === 2) {
                                    setTableCount(tableCount + 1)
                                    succesNotify(message)
                                    handleEditClose()
                                }
                                else {
                                    succesNotify(message)
                                    handleEditClose()
                                }
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


        } else {

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
                                                    handleEditClose()
                                                }
                                                else {
                                                    handleEditClose()
                                                    setTableCount(tableCount + 1)
                                                    settaskcount(taskcount + 1)
                                                    setstatuscount(statuscount + 1)
                                                }
                                            }
                                            else {
                                                succesNotify(message)
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
                                            succesNotify(message)
                                            setTableCount(tableCount + 1)
                                            handleEditClose()
                                        } else {
                                            handleEditClose()
                                            setTableCount(tableCount + 1)
                                            settaskcount(taskcount + 1)
                                            setstatuscount(statuscount + 1)
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

        }

    }, [updateMasterTask, inactive, postEmpDetails, taskName, selectTaskfile, tm_task_slno, handleEditClose, handleImageUpload, tableCount, setTableCount, dueDate,
        employeeMast, searchData, setTabledata, searchFlag, settaskcount, taskcount, setstatuscount, statuscount])

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

    return (
        <Box>
            <Modal
                open={open}
            >
                < ModalDialog
                    sx={{
                        overflowY: 'scroll',
                        width: '90vw',
                        height: '60vw',
                    }}
                >
                    <Box sx={{ borderRight: 1, borderLeft: 1, borderBottom: 1, borderColor: '#D9E4EC', }}>
                        <Box sx={{
                            width: "100%", backgroundColor: '#D9E4EC', height: 45,
                            borderTop: 1, borderBlockColor: '#6AABD2', pt: 1, mt: .5,
                            display: 'flex',
                        }}>
                            <Box sx={{ flex: 1 }}>
                                <ModeEditIcon sx={{ height: '20px' }} />Task Status
                            </Box>
                            <Box sx={{ width: 35, mb: .3, display: 'flex', justifyContent: 'flex-end', mr: 1, pt: .8, pr: .6, bgcolor: 'white', borderRadius: 15 }}>
                                <Tooltip title="Close">
                                    < CloseIcon sx={{ cursor: 'pointer', size: 'lg', height: 20, color: '#004F76' }}
                                        onClick={handleEditClose}
                                    />
                                </Tooltip>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', width: '100%', }}>
                            <Box sx={{ flex: 2.5, }}>
                                <Box sx={{ pt: 2, pl: 2, fontSize: 18, mt: 1.2, display: 'flex', justifyContent: 'right', mr: 1 }}>
                                    <Typography sx={{ color: '#003B73', fontFamily: 'Georgia' }}>
                                        Task Name <Typography sx={{ color: '#B32800' }}>*</Typography>&nbsp;:&nbsp;
                                    </Typography>
                                </Box>
                                {main_task_slno === null ?
                                    <Box sx={{ pl: 2, fontSize: 15, display: 'flex', justifyContent: 'right', mr: 1, mt: 2, height: 30, pt: 2, fontFamily: 'Georgia' }}>
                                        <Typography sx={{ color: '#003B73' }}>
                                            Project&nbsp;:&nbsp;
                                        </Typography>
                                    </Box> :
                                    <Box sx={{ pl: 2, fontSize: 15, display: 'flex', justifyContent: 'right', mr: 1, mt: 2, height: 30, pt: 2, fontFamily: 'Georgia' }}>
                                        <Typography sx={{ color: '#003B73' }}>
                                            Project&nbsp;:&nbsp;
                                        </Typography>
                                    </Box>}
                                <Box sx={{ pt: 2, pl: 2, fontSize: 18, mt: 1.5, display: 'flex', justifyContent: 'right', mr: 1 }}>
                                    <Typography sx={{ color: '#003B73', fontFamily: 'Georgia' }}>
                                        Department&nbsp;:&nbsp;
                                    </Typography>
                                </Box>
                                <Box sx={{ pt: 1, pl: 2, fontSize: 18, mt: 1, display: 'flex', justifyContent: 'right', mr: 1 }}>
                                    <Typography sx={{ color: '#003B73', fontFamily: 'Georgia' }}>
                                        Section&nbsp;:&nbsp;
                                    </Typography>
                                </Box>
                                {changeAssignee === 0 ?
                                    <Box sx={{ mt: .8, pl: 2, pt: 1, fontSize: 18, display: 'flex', justifyContent: 'right', mr: 1 }}>
                                        <Typography sx={{ color: '#003B73', fontFamily: 'Georgia' }}>
                                            Assignee<Typography sx={{ color: '#B32800' }}>*</Typography>&nbsp;:&nbsp;
                                        </Typography>
                                    </Box> :
                                    <Box sx={{ mt: 1.5, pl: 2, pt: 1, fontSize: 18, display: 'flex', justifyContent: 'right', mr: 1, height: 40 }}>
                                        <Typography sx={{ color: '#003B73', fontFamily: 'Georgia' }}>
                                            Assignee<Typography sx={{ color: '#B32800' }}>*</Typography>&nbsp;:&nbsp;
                                        </Typography>
                                    </Box>}
                                <Box sx={{ pl: 2, fontSize: 18, mt: 1.2, display: 'flex', justifyContent: 'right', mr: 1, pt: 1 }}>
                                    <Typography sx={{ color: '#003B73', fontFamily: 'Georgia' }}>
                                        Created date&nbsp;:&nbsp;
                                    </Typography>
                                </Box>
                                <Box sx={{ pl: 2, fontSize: 18, mt: 1.5, display: 'flex', justifyContent: 'right', mr: 1 }}>
                                    <Typography sx={{ color: '#003B73', fontFamily: 'Georgia' }}>
                                        Due date<Typography sx={{ color: '#B32800' }}>*</Typography>&nbsp;:&nbsp;
                                    </Typography>
                                </Box>
                                <Box sx={{ pl: 2, fontSize: 18, mt: 2, display: 'flex', justifyContent: 'right', mr: 1 }}>
                                    <Typography sx={{ color: '#003B73', fontFamily: 'Georgia' }}>
                                        Description&nbsp;:&nbsp;
                                    </Typography>
                                </Box>
                            </Box>
                            <Box sx={{ flex: 6 }}>
                                <Box sx={{ mt: .5, pt: 1 }}>
                                    <CssVarsProvider>
                                        <Textarea
                                            type="text"
                                            size="sm"
                                            placeholder="Task Name*"
                                            variant="outlined"
                                            name="taskName"
                                            value={taskName}
                                            minRows={2}
                                            maxRows={3}
                                            onChange={(e) => taskDataUpdate(e)}
                                            sx={{ fontSize: 15, color: '#003B73', }}
                                        ></Textarea>
                                    </CssVarsProvider>
                                </Box>
                                {main_task_slno === null ?
                                    <Box sx={{ mt: .5 }}>
                                        <TmProjectList
                                            projectz={projectz}
                                            setprojectz={setprojectz} />

                                    </Box> :
                                    <Box>
                                        {tm_project_name === null ?
                                            <Box sx={{ mt: .5 }}>
                                                <TextFieldCustom
                                                    type="text"
                                                    name="tm_project_name"
                                                    placeholder={'not given'}
                                                    disabled>
                                                </TextFieldCustom>
                                            </Box>
                                            : <Box sx={{ mt: .5 }}>
                                                <TextFieldCustom
                                                    type="text"
                                                    name="tm_project_name"
                                                    value={tm_project_name}
                                                    disabled>
                                                </TextFieldCustom>
                                            </Box>}
                                    </Box>

                                }
                                <Box sx={{ mt: .5 }}>
                                    <TextFieldCustom
                                        type="text"
                                        name="dept_name"
                                        value={dept_name}
                                        disabled>
                                    </TextFieldCustom>
                                </Box>
                                <Box sx={{ mt: .5 }}>
                                    <TextFieldCustom
                                        type="text"
                                        name="secName"
                                        value={secName}
                                        disabled>
                                    </TextFieldCustom>
                                </Box>
                                {changeAssignee === 0 ?
                                    <Box sx={{ display: 'flex', mt: .5, }}>
                                        <Box sx={{ flex: 1, mr: 1 }}><TextFieldCustom
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
                                    </Box> :
                                    <Box sx={{ mt: .5, display: 'flex', }}>
                                        <Box sx={{ flex: 1, border: .5, borderRadius: 6, borderColor: '#E4A58F' }}>
                                            <TmMultEmpSelectUnderDeptSec
                                                value={employeeMast}
                                                setValue={setEmployeeMast}
                                            />
                                        </Box>
                                    </Box>
                                }
                                <Box sx={{ mt: .5 }}>
                                    <TextFieldCustom
                                        type="text"
                                        name="create_date"
                                        value={create_date}
                                        disabled>
                                    </TextFieldCustom>
                                </Box>
                                <Box sx={{ mt: .5 }}>
                                    <TextFieldCustom
                                        type="datetime-local"
                                        size="sm"
                                        name="dueDate"
                                        value={dueDate}
                                        onchange={taskDataUpdate}
                                    ></TextFieldCustom>
                                </Box>
                                <Box sx={{ mt: .5 }}>
                                    <Textarea
                                        type="text"
                                        size="sm"
                                        placeholder="type here..."
                                        variant="outlined"
                                        minRows={2}
                                        maxRows={2}
                                        name="description"
                                        value={description}
                                        onChange={(e) => taskDataUpdate(e)}
                                    >
                                    </Textarea>
                                </Box>
                            </Box>
                            <Box sx={{ flex: 2, }}></Box>
                        </Box>
                        <Box sx={{ display: 'flex', }}>
                            <Box sx={{ flex: 2.2, }}></Box>
                            <Box sx={{
                                fontFamily: 'Georgia',
                                height: 50, mt: .5, border: 1, borderRadius: 1, borderStyle: 'dashed', display: 'flex',
                                borderColor: '#887BB0', flex: 5.5
                            }}>
                                <Box sx={{
                                    color: '#003B73', display: 'flex', flex: 1, m: 1, border: .5, borderColor: '#B7CFDC', pl: 1, pt: .3,
                                    borderRadius: 2,
                                }}>
                                    <Typography>fileUpload&nbsp;</Typography>
                                    <CssVarsProvider>
                                        <label htmlFor="file-input">
                                            <Tooltip title="File Attach" placement="bottom" >
                                                <PermMediaIcon sx={{ color: '#738FA7', height: 25, width: 25, cursor: 'pointer', pr: .5 }} />
                                            </Tooltip>
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
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ flex: 10, overflowX: "scroll", overflow: 'hidden', }}>
                                    <Box sx={{ display: 'flex' }}>
                                        {selectTaskfile && selectTaskfile.map((taskFile, index) => (
                                            <Box sx={{
                                                display: "flex", flexDirection: "row", ml: .5, mt: 1.5,
                                                backgroundColor: '#C3CEDA', borderRadius: 2, px: .5,
                                            }} key={index} >
                                                <Box >{taskFile.name}</Box>
                                                <Box sx={{ ml: .3 }}><CloseIcon sx={{ height: '17px', width: '20px', cursor: 'pointer' }}
                                                    onClick={() => handleRemoveTaskFile(index)} /></Box>
                                            </Box>
                                        ))}
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{ flex: 1.8, }}></Box>
                        </Box>
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
                                        <Tooltip title='unable to add a subtask to a completed task' placement='top-start'>
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
                                                    setTabledata={setTabledata}
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
                                <Box >
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