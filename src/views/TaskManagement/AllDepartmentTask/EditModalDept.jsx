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
import { getProjectList } from 'src/redux/actions/TmProjectsList.action';
import TmProjectList from 'src/views/CommonSelectCode/TmProjectList';
import imageCompression from 'browser-image-compression';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import TmDepartmentSelect from 'src/views/CommonSelectCode/TmDepartmentSelect';
import TmDeptSectionSelect from 'src/views/CommonSelectCode/TmDeptSectionSelect';
import AddSubTaskUnderAllDept from './AddSubTaskUnderAllDept';
import SubTaskTableUnderTask from './SubTaskTableUnderTask';
import EditSubTaskInAllDept from './EditSubTaskInAllDept';

const EditModalDept = ({ open, setEditModalFlag, setEditModalOpen, masterData, setTaskTableCount, taskTableCount, tableData, setTableData }) => {

    const { tm_task_slno, tm_task_dept, tm_task_dept_sec, main_task_slno, tm_project_slno, tm_task_status, em_name, tm_project_name,
        create_date, } = masterData

    const [subTaskData, setsubTaskData] = useState([])
    // const [subTask, setSubTask] = useState([])
    const [projectz, setprojectz] = useState(tm_project_slno === null ? 0 : tm_project_slno)
    const [changeAssignee, setchangeAssignee] = useState(0)
    const [departmentMast, setdepartmentMast] = useState(tm_task_dept)
    const [departmentSecMast, setdepartmentSecMast] = useState(tm_task_dept_sec)
    const [selectTaskfile, setselectTaskfile] = useState([]);
    const [empArry, setEmpArry] = useState([])
    const [employeeMast, setEmployeeMast] = useState([])
    const [completed, setCompleted] = useState(tm_task_status === 1 ? true : tm_task_status === 2 ? false : tm_task_status === 3 ? false : tm_task_status === 4 ? false : false)
    const [flag, setflag] = useState(0)
    const [tableRendering, setTableRendering] = useState(0)
    const dispatch = useDispatch();
    const [taskData, setTaskData] = useState({
        taskName: '',
        dueDate: '',
        description: '',
    })

    useEffect(() => {
        dispatch(getProjectList())
    }, [dispatch,])

    const { taskName, dueDate, description, } = taskData
    const taskDataUpdate = useCallback(
        (e) => {
            const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
            setTaskData({ ...taskData, [e.target.name]: value })
        },
        [taskData],
    )
    const id = useSelector((state) => {
        return state.LoginUserData.empid
    })
    const changeEmp = useCallback((e) => {
        setchangeAssignee(1)
    }, [])
    const handleEditClose = useCallback(() => {
        setEditModalFlag(0)
        setEditModalOpen(false)
        // setSubTask([])
    }, [setEditModalOpen, setEditModalFlag,
        // setSubTask
    ])
    const openAddSubtask = useCallback((e) => {
        setflag(1)
    }, [setflag])

    const selectForEditsSubTask = useCallback((value) => {
        setflag(2)
        setsubTaskData(value)
    }, [setsubTaskData, setflag])

    useEffect(() => {
        const getMasterTask = async (tm_task_slno) => {
            const result = await axioslogin.get(`/taskManagement/viewMasterTaskByid/${tm_task_slno}`);
            const { success, data } = result.data;

            if (success === 2) {
                const { tm_task_slno, tm_task_name, tm_task_due_date, tm_task_description, tm_project_slno,
                    tm_task_dept_sec, tm_task_dept } = data[0]
                const formdata = {
                    taskSlno: tm_task_slno,
                    taskName: tm_task_name,
                    dueDate: tm_task_due_date,
                    description: tm_task_description,
                    edit_user: id
                }
                setTaskData(formdata)
                setdepartmentMast(tm_task_dept)
                setdepartmentSecMast(tm_task_dept_sec)
                setprojectz(tm_project_slno)
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
    }, [tm_task_slno, dispatch, id])

    const updateMasterTask = useMemo(() => {
        return {
            tm_task_slno: tm_task_slno,
            tm_task_name: taskName === '' ? null : taskName,
            tm_task_due_date: dueDate === '' ? null : dueDate,
            tm_task_description: description === '' ? null : description,
            tm_task_dept: departmentMast === 0 ? null : departmentMast,
            tm_task_dept_sec: departmentSecMast === 0 ? null : departmentSecMast,
            tm_project_slno: projectz === 0 ? null : projectz,
            tm_task_status: tm_task_status,
            edit_user: id
        }
    }, [tm_task_slno, taskName, dueDate, tm_task_status, description, departmentMast, departmentSecMast, projectz, id])

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
    const resetSubtask = useCallback(() => {
        const resetMast = {
            tm_task_slno: '',
            taskName: '',
            dueDate: '',
            description: '',
            main_task_slno: '',
        }
        setTaskData(resetMast)
        setdepartmentMast(0)
        setdepartmentSecMast(0)
        setEmployeeMast([])
        setselectTaskfile([])
    }, [setTaskData, setdepartmentMast, setdepartmentSecMast, setEmployeeMast, setselectTaskfile,]);

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
            tm_task_dept: departmentMast,
            tm_task_dept_sec: departmentSecMast
        }
    }, [departmentMast, departmentSecMast])

    const UpdateTaskData = useCallback((e) => {
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
        const getDeptTable = async () => {
            const result = await axioslogin.post('/taskManagement/searchDeptAndSec', searchData)
            const { success, data } = result.data
            if (success === 2) {
                setTableData(data)
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
        if ((taskName !== '') && (departmentMast !== 0) && (departmentSecMast !== 0) && (dueDate !== '')) {
            UpdateTask(updateMasterTask).then((value) => {
                const { message, success } = value
                if (success === 2) {
                    if (selectTaskfile.length !== 0) {
                        InsertFile(selectTaskfile, tm_task_slno).then((value) => {
                            const { success, message } = value
                            if (success === 1) {
                                if (employeeMast.length !== 0) {
                                    Inactiveemp(inactive).then((value) => {
                                        const { message, succes } = value
                                        if (succes === 1) {
                                            UpdateSubTaskDtl(postEmpDetails)
                                            const { success } = value
                                            if (success === 1) {
                                                // succesNotify(message)
                                                // setTaskTableCount(taskTableCount + 1)
                                                // resetSubtask()
                                                // handleEditClose()
                                                getDeptTable(searchData)
                                                const { message, success } = value
                                                if (success === 2) {
                                                    succesNotify(message)
                                                    setTaskTableCount(taskTableCount + 1)
                                                    handleEditClose()
                                                }
                                                else {
                                                    succesNotify(message)
                                                    setTaskTableCount(taskTableCount + 1)
                                                    handleEditClose()
                                                }
                                            }
                                            else {

                                                resetSubtask()
                                                // setTaskTableCount(taskTableCount + 1)
                                                handleEditClose()
                                            }
                                        }
                                        else {
                                            succesNotify(message)
                                            resetSubtask()
                                            handleEditClose()
                                        }
                                    })
                                    succesNotify("Task Updated with file attach Successfully")
                                    resetSubtask()

                                } else {
                                    succesNotify(message)
                                    setTaskTableCount(taskTableCount + 1)
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
                        if (employeeMast.length !== 0) {
                            Inactiveemp(inactive).then((value) => {
                                const { message, succes } = value
                                if (succes === 1) {
                                    UpdateSubTaskDtl(postEmpDetails)
                                    const { success } = value
                                    if (success === 1) {
                                        // succesNotify(message)
                                        // setTaskTableCount(taskTableCount + 1)
                                        // handleEditClose()
                                        getDeptTable(searchData)
                                        const { message, success } = value
                                        if (success === 2) {
                                            succesNotify(message)
                                            setTaskTableCount(taskTableCount + 1)
                                            handleEditClose()
                                        }
                                        else {
                                            succesNotify(message)
                                            setTaskTableCount(taskTableCount + 1)
                                            handleEditClose()
                                        }
                                    } else {
                                        resetSubtask()
                                        // setTaskTableCount(taskTableCount + 1)
                                        handleEditClose()
                                    }
                                }
                                else {
                                    succesNotify(message)
                                    handleEditClose()
                                }
                            })
                            succesNotify(message)
                            handleEditClose()
                        } else {
                            // succesNotify(message)
                            // setTaskTableCount(taskTableCount + 1)
                            // handleEditClose()
                            getDeptTable(searchData)
                            const { message, success } = value
                            if (success === 2) {
                                succesNotify(message)
                                setTaskTableCount(taskTableCount + 1)
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
            infoNotify('please Fill Mandatory Fields')
        }
    }, [updateMasterTask, inactive, postEmpDetails, selectTaskfile, resetSubtask, handleImageUpload, taskName, tm_task_slno, setTaskTableCount, departmentMast,
        departmentSecMast, handleEditClose, taskTableCount, employeeMast, dueDate, searchData, setTableData])
    const handleRemoveTaskFile = (index) => {
        setselectTaskfile((prevTaskFiles) => {
            const updatedFiles = [...prevTaskFiles];
            updatedFiles.splice(index, 1); // Remove the file at the specified index
            return updatedFiles;
        });
    };
    return (
        <Box>
            <Modal
                open={open}
            >
                < ModalDialog
                    sx={{
                        overflowY: 'scroll',
                        width: '60vw',
                        // height: '60vw',
                    }}
                >
                    <Box sx={{
                        borderRight: 1, borderLeft: 1, borderBottom: 1, borderColor: '#D9E4EC', height: '100%',
                        boxShadow: 1,
                    }}>
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
                            <Box sx={{ flex: .5, }}>
                            </Box>
                            <Box sx={{
                                flex: 8,
                                bgcolor: '#fafafa',
                                p: 1
                            }}>
                                <Box sx={{ mt: 2, pt: 1 }}>
                                    <Typography sx={{ color: '#003B73', fontFamily: 'Georgia' }}>
                                        Task Name<Typography sx={{ color: '#B32800' }}>*</Typography>&nbsp;:
                                    </Typography>
                                    <CssVarsProvider>
                                        <Textarea
                                            type="text"
                                            size="sm"
                                            placeholder="Task Name*"
                                            variant="outlined"
                                            name="taskName"
                                            value={taskName}
                                            minRows={2}
                                            maxRows={2}
                                            onChange={(e) => taskDataUpdate(e)}
                                            sx={{ fontSize: 15, color: '#003B73', }}
                                        ></Textarea>
                                    </CssVarsProvider>
                                </Box>
                                {main_task_slno === null ?
                                    <Box sx={{ mt: 1 }}>
                                        <Typography sx={{ color: '#003B73', fontFamily: 'Georgia' }}>
                                            Project&nbsp;:&nbsp;
                                        </Typography>
                                        <TmProjectList
                                            projectz={projectz}
                                            setprojectz={setprojectz} />

                                    </Box> :
                                    <Box sx={{ mt: 1 }}>
                                        <Typography sx={{ color: '#003B73', fontFamily: 'Georgia' }}>
                                            Project&nbsp;:&nbsp;
                                        </Typography>
                                        <TextFieldCustom
                                            type="text"
                                            name="tm_project_name"
                                            value={tm_project_name}
                                            disabled
                                        >
                                        </TextFieldCustom>

                                    </Box>}

                                <Box sx={{ display: 'flex' }}>
                                    <Box sx={{ mt: 1, flex: 1, mr: 1 }}>
                                        <Typography sx={{ color: '#003B73', fontFamily: 'Georgia' }}>
                                            Department<Typography sx={{ color: '#B32800' }}>*</Typography>&nbsp;:
                                        </Typography>
                                        <TmDepartmentSelect
                                            department={departmentMast}
                                            setDepartment={setdepartmentMast} />
                                    </Box>
                                    <Box sx={{ mt: 1, flex: 1 }}>
                                        <Typography sx={{ color: '#003B73', fontFamily: 'Georgia' }}>
                                            Section<Typography sx={{ color: '#B32800' }}>*</Typography>&nbsp;:
                                        </Typography>
                                        <TmDeptSectionSelect
                                            deptsec={departmentSecMast}
                                            setDeptSec={setdepartmentSecMast} />
                                    </Box>
                                </Box>
                                {changeAssignee === 0 ?
                                    <Box sx={{ mt: 1.5 }}>
                                        <Typography sx={{ color: '#003B73', fontFamily: 'Georgia' }}>
                                            Assignee<Typography sx={{ color: '#B32800' }}>*</Typography>&nbsp;:
                                        </Typography>
                                        <Box sx={{ display: 'flex', }}>
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
                                        </Box>
                                    </Box> :
                                    <Box sx={{ mt: 1.5 }}>
                                        <Typography sx={{ color: '#003B73', fontFamily: 'Georgia' }}>
                                            Assignee<Typography sx={{ color: '#B32800' }}>*</Typography>&nbsp;:
                                        </Typography>
                                        <Box sx={{ display: 'flex', }}>
                                            <Box sx={{ flex: 1, border: .5, borderRadius: 6, borderColor: '#E4A58F' }}>
                                                <TmMultEmpSelectUnderDeptSec
                                                    value={employeeMast}
                                                    setValue={setEmployeeMast}
                                                />
                                            </Box>
                                        </Box>
                                    </Box>}
                                <Box sx={{ display: 'flex', mt: 1.5 }}>
                                    <Box sx={{ flex: 1, mr: 1 }}>
                                        <Typography sx={{ color: '#003B73', fontFamily: 'Georgia' }}>
                                            Created date&nbsp;:&nbsp;
                                        </Typography>
                                        <TextFieldCustom
                                            type="text"
                                            name="create_date"
                                            value={create_date}
                                            disabled>
                                        </TextFieldCustom>
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <Typography sx={{ color: '#003B73', fontFamily: 'Georgia' }}>
                                            Due date<Typography sx={{ color: '#B32800' }}>*</Typography>&nbsp;:
                                        </Typography>
                                        <TextFieldCustom
                                            type="datetime-local"
                                            size="sm"
                                            name="dueDate"
                                            value={dueDate}
                                            onchange={taskDataUpdate}
                                        ></TextFieldCustom>
                                    </Box>
                                </Box>
                                <Box sx={{ mt: 1.5 }}>
                                    <Typography sx={{ color: '#003B73', fontFamily: 'Georgia' }}>
                                        Description&nbsp;:&nbsp;
                                    </Typography>
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
                            <Box sx={{ flex: .5, ml: .5, }}></Box>
                        </Box>
                        <Box sx={{ display: 'flex' }}>
                            <Box sx={{ flex: .2, }}></Box>
                            <Box sx={{
                                fontFamily: 'Georgia', flex: 6,
                                height: 50, mt: 1, border: 1, borderRadius: 1, borderStyle: 'dashed', display: 'flex',
                                borderColor: '#887BB0', mx: 5,
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
                            <Box sx={{ flex: .2, }}></Box>
                        </Box>
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
                                                <AddSubTaskUnderAllDept
                                                    tm_project_slno={tm_project_slno}
                                                    taskTableCount={taskTableCount} setTaskTableCount={setTaskTableCount}
                                                    tm_task_slno={tm_task_slno}
                                                    tableRendering={tableRendering}
                                                    setTableRendering={setTableRendering}
                                                    setflag={setflag} />
                                            </Box> :
                                            flag === 2 ?
                                                <Box>

                                                    <EditSubTaskInAllDept
                                                        setflag={setflag} subTaskData={subTaskData}
                                                        setsubTaskData={setsubTaskData}
                                                        tm_task_slno={tm_task_slno}
                                                        tableRendering={tableRendering}
                                                        setTableRendering={setTableRendering}
                                                    />
                                                </Box>
                                                : null
                                    }
                                </Box>
                                <Box >
                                    <Box>
                                        <SubTaskTableUnderTask
                                            tm_task_slno={tm_task_slno}
                                            selectForEditsSubTask={selectForEditsSubTask}
                                            tableRendering={tableRendering}
                                            setCompleted={setCompleted}
                                        />
                                    </Box>
                                </Box>
                                <Box sx={{ height: 5, }}></Box>

                            </Box> : null}
                        <Box sx={{ height: 70 }}></Box>
                    </Box>
                    <DialogActions>
                        <Box sx={{ textAlign: 'right' }}>
                            <Button
                                variant="plain"
                                onClick={UpdateTaskData}
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

export default memo(EditModalDept)