import { Box, Button, Chip, CssVarsProvider, Input, Modal, ModalDialog, Textarea, Tooltip, Typography } from '@mui/joy'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AssignmentSharpIcon from '@mui/icons-material/AssignmentSharp';
import Inputcomponent from '../TaskComponents/Inputcomponent';
import TmAllProjectList from 'src/views/CommonSelectCode/TmAllProjectList';
import TmMultAssigneesSelect from 'src/views/CommonSelectCode/TmMultAssigneesSelect';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import { axioslogin } from 'src/views/Axios/Axios';
import imageCompression from 'browser-image-compression';
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import moment from 'moment';
import TmDepartmentSelect from 'src/views/CommonSelectCode/TmDepartmentSelect';
import TmDeptSectionSelect from 'src/views/CommonSelectCode/TmDeptSectionSelect';
import { getProjectList } from 'src/redux/actions/TmProjectsList.action';
import ProjectCreation from './ProjectCreation';
import { getDepartment } from 'src/redux/actions/Department.action';
import AttachmentIcon from '@mui/icons-material/Attachment';
import { format } from 'date-fns';

const EditRejectedTask = ({ open, masterData, setEditModalFlag, setEditModalOpen, tableCount, setTableCount, setMasterData }) => {

    const { tm_task_slno, main_task_slno, tm_task_name, tm_project_slno, tm_task_status, em_name, tm_task_due_date,
        tm_project_duedate, tm_task_description, tm_pending_remark, tm_onhold_remarks, tm_completed_remarks, tm_task_dept, tm_task_dept_sec, tm_query_remark,
        tm_query_reply, tm_query_remark_date } = masterData

    const dispatch = useDispatch();
    const [projectz, setprojectz] = useState(tm_project_slno === null ? '' : tm_project_slno)
    const [departmentMast, setdepartmentMast] = useState(tm_task_dept)
    const [departmentSecMast, setdepartmentSecMast] = useState(tm_task_dept_sec)
    const [employeeMast, setEmployeeMast] = useState(0)
    const [selectFile, setSelectFile] = useState([]);
    const [dueDateProject, setdueDateProject] = useState('')
    const [addProjectFlag, setAddProjectFlag] = useState(0)
    const [addProjectModalOpen, setaddProjectlModalOpen] = useState(false)
    const [empArry, setEmpArry] = useState([])
    const [changeAssignee, setchangeAssignee] = useState(0)
    const id = useSelector((state) => { return state.LoginUserData.empid })
    let newDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');

    useEffect(() => {
        dispatch(getDepartment())
        dispatch(getProjectList())
    }, [dispatch,])

    const [taskData, setTaskData] = useState({
        taskSlno: tm_task_slno,
        taskName: tm_task_name,
        dueDate: tm_task_due_date,
        description: tm_task_description,
        pendingRemarks: tm_pending_remark,
        onHoldRemaks: tm_onhold_remarks,
        completedRemarks: tm_completed_remarks,
        QueryReply: tm_query_reply,

    })

    const { taskSlno, taskName, dueDate, description, onHoldRemaks, pendingRemarks, completedRemarks, QueryReply } = taskData

    const taskDataUpdate = useCallback(
        (e) => {
            const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
            setTaskData({ ...taskData, [e.target.name]: value })
        },
        [taskData],
    )

    const updateMasterTask = useMemo(() => {
        return {
            tm_task_slno: taskSlno,
            tm_task_name: taskName === '' ? null : taskName,
            tm_task_due_date: dueDate === '' ? null : dueDate,
            tm_task_description: description === '' ? null : description,
            tm_task_dept: departmentMast === 0 ? null : departmentMast,
            tm_task_dept_sec: departmentSecMast === 0 ? null : departmentSecMast,
            tm_task_status: tm_task_status,
            tm_pending_remark: pendingRemarks === '' ? null : pendingRemarks,
            tm_onhold_remarks: onHoldRemaks === '' ? null : onHoldRemaks,
            tm_completed_remarks: completedRemarks === '' ? null : completedRemarks,
            tm_project_slno: projectz === '' ? null : projectz,
            main_task_slno: main_task_slno === null ? null : main_task_slno,
            tm_query_reply: QueryReply === '' ? null : QueryReply,
            tm_query_reply_user: id,
            tm_query_reply_date: QueryReply !== '' ? newDate : null,
            edit_user: id,
        }
    }, [taskName, taskSlno, tm_task_status, dueDate, description, departmentMast, departmentSecMast, pendingRemarks, onHoldRemaks, completedRemarks, projectz,
        main_task_slno, QueryReply, newDate, id])

    const inactive = empArry && empArry.map((val) => {
        return {
            tm_task_slno: tm_task_slno,
            tm_assigne_emp: val.tm_assigne_emp,
        }
    })

    const CreateProject = useCallback(() => {
        setAddProjectFlag(1)
        setaddProjectlModalOpen(true)
    }, [])

    const handleFileChange = useCallback((e) => {
        const newFiles = [...selectFile]
        newFiles.push(e.target.files[0])
        setSelectFile(newFiles)
    }, [selectFile, setSelectFile])

    const handleClose = useCallback(() => {
        setEditModalFlag(0)
        setEditModalOpen(false)
        setMasterData([])
    }, [setEditModalFlag, setEditModalOpen, setMasterData])

    const postEmpDetails = employeeMast && employeeMast.map((val) => {
        return {
            tm_task_slno: tm_task_slno,
            tm_assigne_emp: val,
            tm_detail_status: 0,
            tm_detl_create: id
        }
    })
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
        const InsertFile = async (selectFile, tm_task_slno) => {
            try {
                const formData = new FormData();
                formData.append('id', tm_task_slno);
                for (const taskFile of selectFile) {
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
        }
        if ((taskName !== '') && (dueDate !== '')) {
            UpdateTask(updateMasterTask).then((value) => {
                const { message, success } = value
                if (success === 2) {
                    if (selectFile.length !== 0) {
                        InsertFile(selectFile, tm_task_slno).then((value) => {
                            const { success, message } = value
                            if (success === 1) {
                                if (employeeMast !== 0) {
                                    Inactiveemp(inactive).then((value) => {
                                        const { succes } = value
                                        if (succes === 1) {
                                            UpdateSubTaskDtl(postEmpDetails)
                                            const { success } = value
                                            if (success === 1) {
                                                succesNotify('Task ReAssigned Successfully')
                                                handleClose()
                                            }
                                            else {
                                                handleClose()
                                                setTableCount(tableCount + 1)
                                            }
                                        }
                                        else {
                                            succesNotify('Task ReAssigned Successfully')
                                            handleClose()
                                        }
                                    })
                                    succesNotify("Task ReAssigned with file attach Successfully")
                                    handleClose()
                                } else {
                                    succesNotify('Task ReAssigned Successfully')
                                    setTableCount(tableCount + 1)
                                    handleClose()
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
                                const { succes } = value
                                if (succes === 1) {
                                    UpdateSubTaskDtl(postEmpDetails)
                                    const { success } = value
                                    if (success === 1) {
                                        setTableCount(tableCount + 1)
                                        succesNotify('Task ReAssigned Successfully')
                                        handleClose()
                                    } else {
                                        handleClose()
                                        setTableCount(tableCount + 1)
                                    }
                                }
                                else {
                                    succesNotify('Task ReAssigned Successfully')
                                    handleClose()
                                }
                            })
                            succesNotify('Task ReAssigned Successfully')
                            handleClose()
                        }
                        else {
                            succesNotify('Task ReAssigned Successfully')
                            setTableCount(tableCount + 1)
                            handleClose()
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
    }, [updateMasterTask, inactive, postEmpDetails, taskName, selectFile, tm_task_slno, handleClose, handleImageUpload, tableCount, setTableCount, dueDate,
        employeeMast,])

    const handleRemoveTaskFile = (index) => {
        setSelectFile((prevTaskFiles) => {
            const updatedFiles = [...prevTaskFiles];
            updatedFiles.splice(index, 1); // Remove the file at the specified index
            return updatedFiles;
        });
    };

    useEffect(() => {
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
        // getMasterTask(tm_task_slno)
        getMastEmployee(tm_task_slno);
    }, [tm_task_slno, dispatch, setEmpArry, id])



    const changeEmp = useCallback((e) => {
        setchangeAssignee(1)
    }, [])

    return (
        <Box>
            {addProjectFlag === 1 ? <ProjectCreation open={addProjectModalOpen} setTableCount={setTableCount} tableCount={tableCount}
                setAddProjectFlag={setAddProjectFlag} setaddProjectlModalOpen={setaddProjectlModalOpen}
            /> : null}
            <CssVarsProvider>
                <Modal
                    aria-labelledby="modal-title"
                    aria-describedby="modal-desc"
                    open={open}
                    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pl: 1, borderRadius: 10 }}>
                    <ModalDialog variant="outlined" sx={{ width: '48vw', p: 0, overflow: 'auto' }}>
                        <Box sx={{ flex: 1, }}>
                            <Box sx={{ flex: 1, display: 'flex', bgcolor: 'white', height: 30 }}>
                                <Typography sx={{ color: 'lightgray', fontSize: 12, pl: 1, flex: 1, pt: 1.5, fontWeight: 900, }}>Create A New Task</Typography>
                                <HighlightOffIcon sx={{
                                    height: 40, width: 40, cursor: 'pointer', color: '#52688F', p: 1,
                                    '&:hover': { color: '#BA0F30' }
                                }}
                                    onClick={handleClose}
                                />
                            </Box>
                            <Box sx={{ flex: 1, bgcolor: '#52688F', height: 40, mt: 1 }}>
                            </Box>
                            <Box style={{
                                marginLeft: 50,
                                marginTop: "-0.99em",
                                paddingLeft: 2,
                                zIndex: 2,
                                backgroundColor: "white",
                                borderRadius: 35,
                                position: "absolute", fontSize: "0.75em"
                            }}>
                                <AssignmentSharpIcon sx={{ height: 60, width: 60, p: 1.5, }} />
                            </Box>
                            <Typography sx={{ fontWeight: 800, color: 'grey', fontSize: 15, pt: 5, pl: 5.8 }}>Update Task</Typography>
                            <Box sx={{ overflow: 'auto', mx: 3, }}>
                                <Box sx={{ flex: 1, mx: 3, mt: 2.5, }}>
                                    <Typography sx={{ pl: 1.5, color: '#003B73', fontWeight: 600, fontSize: 12 }}>Task
                                        <span style={{ color: '#74112F', fontSize: 15 }} >*</span></Typography>
                                    <Inputcomponent
                                        placeholder="New Task"
                                        type="text"
                                        name="taskName"
                                        value={taskName}
                                        onchange={taskDataUpdate}
                                    />
                                </Box>
                                <Box sx={{ flex: 1, mx: 3, mt: 2.5, }}>
                                    <Typography sx={{ pl: 1.5, color: '#003B73', fontWeight: 600, fontSize: 12 }}>Project</Typography>
                                    <Box sx={{ display: 'flex' }}>
                                        <TmAllProjectList
                                            projectz={projectz}
                                            setprojectz={setprojectz}
                                            setdueDateProject={setdueDateProject} />
                                        <Box sx={{ ml: .5, pt: 2 }} onClick={CreateProject}>
                                            <Tooltip title="Create New Project">
                                                <Chip sx={{ cursor: 'pointer', bgcolor: '#90CDD0', color: 'black', '&:hover': { bgcolor: '#77A7B0' } }}
                                                > &nbsp;+ create&nbsp;</Chip>
                                            </Tooltip>
                                        </Box>
                                    </Box>

                                </Box>
                                <Box sx={{ flex: 1, mx: 3, mt: 2.5, display: 'flex' }}>
                                    <Box sx={{ flex: 1, mr: .5 }}>
                                        <Typography sx={{ pl: 1.5, color: '#003B73', fontWeight: 600, fontSize: 12 }}>Department</Typography>
                                        <TmDepartmentSelect
                                            department={departmentMast}
                                            setDepartment={setdepartmentMast} />
                                    </Box>
                                    <Box sx={{ flex: 1, ml: .5 }}>
                                        <Typography sx={{ pl: 1.5, color: '#003B73', fontWeight: 600, fontSize: 12 }}>Section </Typography>
                                        <TmDeptSectionSelect
                                            deptsec={departmentSecMast}
                                            setDeptSec={setdepartmentSecMast} />
                                    </Box>
                                </Box>
                                <Box sx={{ flex: 1, mx: 3, mt: 2.5, }}>
                                    <Typography sx={{ pl: 1.5, color: '#003B73', fontWeight: 600, fontSize: 12 }}>Assignees
                                        <span style={{ color: '#74112F', fontSize: 15 }} >*</span></Typography>
                                    {/* <TmMultAssigneesSelect value={employeeMast} setValue={setEmployeeMast} /> */}
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
                                <Box sx={{ flex: 1, mx: 3, mt: 2.5, }}>
                                    <Typography sx={{ pl: 1.5, color: '#003B73', fontWeight: 600, fontSize: 12 }}>Due Date
                                        <span style={{ color: '#74112F', fontSize: 15 }} >*</span></Typography>
                                    {tm_project_slno !== null ?
                                        <Inputcomponent
                                            type="datetime-local"
                                            name="dueDate"
                                            value={dueDate}
                                            slotProps={{
                                                input: {
                                                    min: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                                                    max: moment(new Date(tm_project_duedate)).format('YYYY-MM-DD HH:mm:ss'),
                                                },
                                            }}
                                            onchange={taskDataUpdate}
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
                                        />}
                                </Box>
                                <Box sx={{ mt: 2.5, mx: 3 }}>
                                    <Typography sx={{ pl: 1.5, color: '#003B73', fontWeight: 600, textUnderline: 1, fontSize: 12 }}>Description</Typography>
                                    <Inputcomponent
                                        placeholder="Describtion"
                                        type="text"
                                        name="description"
                                        value={description}
                                        onchange={taskDataUpdate}
                                    />
                                </Box>
                                <Box sx={{
                                    height: 50, mt: 1, border: 1, borderRadius: 4, borderStyle: 'dashed', display: 'flex', borderColor: '#C2D2D9', mx: 2.3,
                                    py: 1
                                }}>

                                    <Box sx={{
                                        color: '#0000FF', cursor: 'pointer', '&:hover': { color: '#000C66' }, textAlign: 'center', width: 155, border: .1,
                                        mx: .5, borderRadius: 5, borderColor: '#E4E5E8',
                                    }}>
                                        <label htmlFor="file-input">
                                            <AttachmentIcon sx={{ color: '#0000FF', cursor: 'pointer', '&:hover': { color: '#000C66' }, }} /><u>Choose File</u>
                                        </label>
                                        <input
                                            id="file-input"
                                            type="file"
                                            accept=".jpg, .jpeg, .png, .pdf"
                                            style={{ display: 'none' }}
                                            onChange={handleFileChange}
                                            name="file"
                                            multiple // Add this attribute to allow multiple file selections
                                        />

                                    </Box>
                                    <Box sx={{ display: 'flex', flex: 1, overflowX: "scroll", overflow: 'hidden', mx: .5 }}>
                                        {selectFile && selectFile.map((file, index) => (
                                            <Box key={index}>
                                                <Chip sx={{ bgcolor: '#B7CFDC', width: '100%', ml: .5 }}>
                                                    {file.name}
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

                                <Box sx={{ flex: 1, mx: 2.3, mt: 2 }}>
                                    <Box sx={{ flex: 1, display: 'flex' }}>
                                        <Typography sx={{ mt: 1, pl: .5, color: '#92443A', flex: 1, }}>Raised Query ?</Typography>
                                        <Typography sx={{ mt: 1, pl: .5, color: '#92443A' }}>Query Raised Date :</Typography>
                                        <Typography sx={{ mt: 1, pl: .5, color: 'black', fontWeight: 400, fontSize: 14, pr: 1 }}>
                                            {format(new Date(tm_query_remark_date), 'MMM dd, yyyy HH:mm:ss')}
                                        </Typography>
                                    </Box>

                                    <Input placeholder="Type in here…" variant="outlined" disabled value={tm_query_remark} />
                                </Box>
                                <Box sx={{ flex: 1, mx: 2.3, mt: 1 }}>
                                    <Typography sx={{ mt: 1, pl: .5, color: '#92443A' }}>Reply to the Query</Typography>
                                    <Textarea
                                        variant="outlined"
                                        color="warning"
                                        minRows={3}
                                        maxRows={10}
                                        placeholder="type here..."
                                        name="QueryReply"
                                        value={QueryReply}
                                        onChange={taskDataUpdate}
                                    />
                                </Box>
                                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', pt: 3, mr: 3, pb: 2 }}>
                                    <Button variant="plain" sx={{ fontSize: 15 }}
                                        onClick={SubmitTask}
                                    >
                                        Update</Button>
                                    <Button variant="plain" sx={{ fontSize: 15 }}
                                        onClick={handleClose}
                                    > Cancel</Button>
                                </Box>
                            </Box>
                        </Box>
                    </ModalDialog>
                </Modal>
            </CssVarsProvider>
        </Box >
    )
}

export default memo(EditRejectedTask)