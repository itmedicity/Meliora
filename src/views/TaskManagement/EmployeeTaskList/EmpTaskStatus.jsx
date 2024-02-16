import { Box, Button, CssVarsProvider, DialogActions, Modal, ModalDialog, Textarea, Tooltip, Typography } from '@mui/joy'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import TextFieldCustom from 'src/views/Components/TextFieldCustom';
import CusCheckBox from 'src/views/Components/CusCheckBox';
import { useSelector } from 'react-redux';
import { axioslogin } from 'src/views/Axios/Axios';
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode';
import EmpProgressTable from './EmpProgressTable';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import AddSubTaskEmp from './AddSubTaskEmp';
import SubtaskTableEmp from './SubtaskTableEmp';
import EditSubtaskEmp from './EditSubtaskEmp';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import imageCompression from 'browser-image-compression';
import moment from 'moment';
const EmpTaskStatus = ({ open, masterData, setEditModalFlag, setEditModalOpen, tableCount, setTableCount }) => {

    const { tm_task_slno, tm_task_name, tm_task_description, tm_task_due_date, main_task_slno, sec_name, tm_task_dept, tm_task_dept_sec, tm_task_status, dept_name,
        tm_project_slno, tm_project_name, create_date, tm_onhold_remarks, tm_pending_remark, tm_completed_remarks, } = masterData


    const id = useSelector((state) => { return state.LoginUserData.empid })

    const [completed, setCompleted] = useState(tm_task_status === 1 ? true : tm_task_status === 2 ? false : tm_task_status === 3 ? false : tm_task_status === 4 ? false : false)
    const [onProgress, setOnProgress] = useState(tm_task_status === 2 ? true : tm_task_status === 1 ? false : tm_task_status === 3 ? false : tm_task_status === 4 ? false : false)
    const [onHold, setOnHold] = useState(tm_task_status === 3 ? true : tm_task_status === 1 ? false : tm_task_status === 2 ? false : tm_task_status === 4 ? false : false)
    const [onPending, setOnPending] = useState(tm_task_status === 4 ? true : tm_task_status === 1 ? false : tm_task_status === 2 ? false : tm_task_status === 3 ? false : false)
    const [checkFlag, setcheckFlag] = useState(tm_task_status)
    const [assignedEmp, setAssignedEmp] = useState([])
    const [tabledata, setTableData] = useState([])
    const [progressCount, setprogressCount] = useState(0)
    const [projectz, setprojectz] = useState(tm_project_slno === null ? 0 : tm_project_slno)
    const [value, setvalue] = useState(0)
    const [flag, setflag] = useState(0)
    const [subTask, setSubTask] = useState([])
    const [arry, setArry] = useState([])
    const [tableRendering, setTableRendering] = useState(0)
    const [subTaskData, setsubTaskData] = useState([])
    const [viewSubTask, setViewSubTask] = useState(0)
    const [selectTaskfile, setselectTaskfile] = useState([]);
    const [updateTask, setupdateTask] = useState({
        pendingRemarks: (tm_pending_remark ? tm_pending_remark : ''),
        onHoldRemaks: (tm_onhold_remarks ? tm_onhold_remarks : ''),
        completedRemarks: (tm_completed_remarks ? tm_completed_remarks : ''),
    })
    const { onHoldRemaks, pendingRemarks, completedRemarks } = updateTask
    const [completeFlag, setCompleteFlag] = useState(0)


    const [taskProgress, setTaskProgress] = useState({
        PrgSlNo: '',
        tm_task_slno: tm_task_slno,
        tm_task_status: checkFlag,
        ProgressDate: '',
        progress_emp: id,
        progressDetails: ''


    })
    const { PrgSlNo, ProgressDate, progressDetails, } = taskProgress
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
            tm_progres_date: ProgressDate === '' ? null : ProgressDate,
            progress_emp: id,
            tm_task_progress: progressDetails,


        }
    }, [tm_task_slno, checkFlag, ProgressDate, progressDetails, id])





    const patchProgress = useMemo(() => {

        return {
            progress_slno: PrgSlNo,
            tm_task_slno: tm_task_slno,
            tm_task_status: checkFlag,
            tm_progres_date: ProgressDate === '' ? null : ProgressDate,
            progress_emp: id,
            tm_task_progress: progressDetails,
        }
    }, [PrgSlNo, tm_task_slno, checkFlag, ProgressDate, progressDetails, id])




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
                            progress_emp: val.progress_emp,
                            tm_task_progress: val.tm_task_progress


                        }
                        return obj
                    })
                    setTableData(arry)
                } else {
                    setTableData([])
                    warningNotify('error occured')
                }
            }
        }
        getProgress(ProgressData)
    }, [progressCount, ProgressData])



    useEffect(() => {
        const getEmpName = async () => {
            const result = await axioslogin.get(`/TmTableView/empname/${tm_task_slno}`);
            const { data } = result.data;

            if (data.length !== 0) {
                const { em_name } = data[0]
                setAssignedEmp(em_name)
            }
        }
        getEmpName(tm_task_slno)
    }, [tm_task_slno])

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




    const handleEditClose = useCallback(() => {
        setEditModalFlag(0)
        setEditModalOpen(false)
    }, [setEditModalOpen, setEditModalFlag,])

    const TaskMasterUpdate = useCallback(
        (e) => {
            const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
            setupdateTask({ ...updateTask, [e.target.name]: value })
        },
        [updateTask],
    )


    const updateMasterTask = useMemo(() => {
        return {
            tm_task_slno: tm_task_slno,
            tm_task_name: tm_task_name,
            tm_task_dept: tm_task_dept,
            tm_task_dept_sec: tm_task_dept_sec,
            tm_task_due_date: tm_task_due_date,
            tm_task_description: tm_task_description,
            tm_task_status: checkFlag,
            tm_pending_remark: pendingRemarks === '' ? null : pendingRemarks,
            tm_onhold_remarks: onHoldRemaks === '' ? null : onHoldRemaks,
            tm_completed_remarks: completedRemarks === '' ? null : completedRemarks,
            tm_project_slno: projectz === 0 ? null : projectz,
            edit_user: id
        }
    }, [tm_task_name, checkFlag, tm_task_dept, tm_task_dept_sec, tm_task_slno, onHoldRemaks, pendingRemarks, tm_task_due_date, completedRemarks, projectz,
        tm_task_description, id])







    const UpdateStatus = useCallback((e) => {
        e.preventDefault()

        const UpdateMastTask = async (updateMasterTask) => {
            const result = await axioslogin.patch('/taskManagement/updateMasterTask', updateMasterTask)
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
        UpdateMastTask(updateMasterTask).then((value) => {
            const { message, success } = value
            if (success === 2) {
                if (selectTaskfile.length !== 0) {
                    InsertFile(selectTaskfile, tm_task_slno).then((value) => {
                        const { success } = value
                        if (success === 1) {
                            if ((completed === true && completedRemarks === null) ||
                                (onHold === true && onHoldRemaks === null) || (onPending === true && pendingRemarks === null)) {
                                infoNotify('please enter Remarks')
                            } else {

                                succesNotify("Task updated Successfully with file Upload")
                                setTableCount(tableCount + 1)
                                handleEditClose()
                            }

                        } else {
                            setTableCount(tableCount + 1)

                        }
                    })

                }
                else {
                    if ((completed === true && completedRemarks === null) || (onHold === true && onHoldRemaks === null) || (onPending === true && pendingRemarks === null)) {
                        infoNotify('please enter Remarks')
                    } else {

                        succesNotify(message)
                        setTableCount(tableCount + 1)
                        handleEditClose()
                    }

                }
            } else {
                warningNotify('error in updation')

            }
        })


    }, [updateMasterTask, handleEditClose, completed, completedRemarks, onHold, onHoldRemaks, onPending, pendingRemarks, tableCount, selectTaskfile,
        tm_task_slno, handleImageUpload, setTableCount])


    const resetProgress = () => {
        const form = {
            PrgSlNo: '',
            ProgressDate: '',
            progressDetails: '',
        }
        setTaskProgress(form)

    }
    const InsertProgress = useCallback((e) => {
        e.preventDefault()
        if (ProgressDate !== '') {
            const InsertMastProgress = async (postProgress) => {
                const result = await axioslogin.post('/taskManagement/insertProgress', postProgress)

                const { message, success } = result.data
                if (success === 1) {
                    succesNotify(message)
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
    }, [postProgress, progressCount, ProgressDate])
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

            PrgSlNo: progress_slno,
            tm_task_slno: tm_task_slno,
            tm_task_status: tm_task_status,
            ProgressDate: tm_progres_date === '' ? null : tm_progres_date,
            progress_emp: progress_emp,
            progressDetails: tm_task_progress === '' ? null : tm_task_progress
        }
        setTaskProgress(frmdata)

    }, [])
    const UpdateProgress = useCallback((e) => {
        e.preventDefault()
        if (ProgressDate !== '') {
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
    }, [patchProgress, progressCount, ProgressDate])

    const openAddSubtask = useCallback((e) => {
        setflag(1)
    }, [setflag])
    const selectForEditsSubTask = useCallback((value) => {
        setflag(2)
        setsubTaskData(value)
    }, [setsubTaskData])

    const handleRemoveTaskFile = (index) => {
        setselectTaskfile((prevTaskFiles) => {
            const updatedFiles = [...prevTaskFiles];
            updatedFiles.splice(index, 1); // Remove the file at the specified index
            return updatedFiles;
        });
    };

    return (
        <Box>
            <CssVarsProvider>
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
                                display: 'flex'
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
                            <Box>
                                {/* <Box sx={{ display: 'flex', width: '100%', mt: 1 }}> */}
                                <Box sx={{ flex: 1, mt: .5 }}>
                                    <Box sx={{ display: 'flex', pt: 1, fontFamily: 'Georgia', color: '#000C66' }}>
                                        <Box sx={{ flex: .9, ml: 3 }}>
                                            Project
                                        </Box>
                                        <Box sx={{ flex: 8, textTransform: 'capitalize', mr: 2 }}>
                                            :&nbsp;{tm_project_name}
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: 'flex', pt: 1, fontFamily: 'Georgia', color: '#000C66' }}>
                                        <Box sx={{ flex: .9, ml: 3 }}>
                                            Task Name
                                        </Box>
                                        <Box sx={{ flex: 8, textTransform: 'capitalize', mr: 2 }}>
                                            :&nbsp;{tm_task_name}
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: 'flex', pt: 1, fontFamily: 'Georgia', color: '#000C66' }}>
                                        <Box sx={{ flex: .9, ml: 3 }}>
                                            Department
                                        </Box>
                                        <Box sx={{ flex: 8, textTransform: 'capitalize', mr: 2 }}>
                                            :&nbsp;{dept_name}
                                        </Box>
                                    </Box>

                                    <Box sx={{ display: 'flex', pt: 1, fontFamily: 'Georgia', color: '#000C66' }}>
                                        <Box sx={{ flex: .9, ml: 3 }}>
                                            Section
                                        </Box>
                                        <Box sx={{ flex: 8, textTransform: 'capitalize', mr: 2 }}>
                                            :&nbsp;{sec_name}
                                        </Box>
                                    </Box>

                                    <Box sx={{ display: 'flex', pt: 1, fontFamily: 'Georgia', color: '#000C66' }}>
                                        <Box sx={{ flex: .9, ml: 3 }}>
                                            Assignees
                                        </Box>
                                        <Box sx={{ flex: 8, color: '#970C10', textTransform: 'capitalize', mr: 2 }}>
                                            :&nbsp;{assignedEmp}
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: 'flex', pt: 1, color: '#000C66' }}>
                                        <Box sx={{ flex: .9, ml: 3, fontFamily: 'Georgia', }}>
                                            Created date
                                        </Box>
                                        <Box sx={{ flex: 8, mr: 2 }}>
                                            :&nbsp;{create_date}
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: 'flex', pt: 1, color: '#000C66' }}>
                                        <Box sx={{ flex: .9, ml: 3, fontFamily: 'Georgia', }}>
                                            Due date
                                        </Box>
                                        <Box sx={{ flex: 8, mr: 2 }}>
                                            :&nbsp;{tm_task_due_date}
                                        </Box>
                                    </Box>


                                    <Box sx={{ display: 'flex', pt: 1, fontFamily: 'Georgia', color: '#000C66' }}>
                                        <Box sx={{ flex: .9, ml: 3 }}>
                                            Description
                                        </Box>
                                        <Box sx={{ flex: 8, textTransform: 'capitalize', mr: 2 }}>
                                            :&nbsp;{tm_task_description}
                                        </Box>
                                    </Box>
                                </Box>
                                {/* <Box sx={{ flex: 1, bgcolor: 'yellow' }}>

                                    </Box> */}
                                {/* </Box> */}


                                <Box sx={{
                                    fontFamily: 'Georgia',
                                    height: 50, mt: .5, border: 1, borderRadius: 1, borderStyle: 'dashed', display: 'flex',
                                    borderColor: '#887BB0', mx: 2.3
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



                                <Box sx={{ m: 2, border: 1, borderColor: '#710019', borderRadius: 3 }}>
                                    <Typography sx={{ pl: 1.5, pt: .5, fontSize: 20, fontFamily: 'Georgia', color: '#000C66' }}>
                                        Task Progress
                                    </Typography>
                                    <EmpProgressTable tabledata={tabledata}
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
                                                        onChange={TaskMasterUpdate}
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
                                                        onChange={TaskMasterUpdate}
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
                                                        onChange={TaskMasterUpdate}
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
                                                                max: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                                                            },
                                                        }}
                                                        type="datetime-local"
                                                        size="sm"
                                                        name="ProgressDate"
                                                        value={ProgressDate}
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
                                                        name="progressDetails"
                                                        value={progressDetails}
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
                                                            onClick={InsertProgress} />
                                                    </Box> :
                                                    value === 1 ? <Box>
                                                        <CheckCircleOutlineIcon sx={{ fontSize: 30, cursor: 'pointer', color: '#003B73' }}
                                                            onClick={UpdateProgress} />
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
                                                            tm_project_slno={tm_project_slno}
                                                            setTableRendering={setTableRendering}
                                                            tableRendering={tableRendering}
                                                            setflag={setflag}
                                                            setprojectz={setprojectz}
                                                            projectz={projectz}


                                                        />
                                                    </Box>
                                                    :
                                                    flag === 2 ?
                                                        <Box>
                                                            <EditSubtaskEmp setflag={setflag} subTaskData={subTaskData}
                                                                setsubTaskData={setsubTaskData}
                                                                setTableRendering={setTableRendering}
                                                                tableRendering={tableRendering}
                                                                setprojectz={setprojectz}
                                                                projectz={projectz}

                                                            />
                                                        </Box>
                                                        : null
                                            }

                                        </Box>

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

                                    </Box> : null}
                                <Box sx={{ height: 10, }}>
                                </Box>

                            </Box>

                        </Box>
                        <DialogActions>
                            <Box sx={{ textAlign: 'right' }}>
                                <Button
                                    variant="plain"
                                    onClick={UpdateStatus}
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
            </CssVarsProvider>

        </Box >

    )
}

export default memo(EmpTaskStatus)