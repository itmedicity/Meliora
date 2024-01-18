import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { Box, Button, CssVarsProvider, Textarea, Tooltip, Typography, } from '@mui/joy'
import { useDispatch, useSelector } from 'react-redux';
import TmMultEmpSelectUnderDeptSec from 'src/views/CommonSelectCode/TmMultEmpSelectUnderDeptSec';
import TextFieldCustom from 'src/views/Components/TextFieldCustom';
import { axioslogin } from 'src/views/Axios/Axios';
import LanIcon from '@mui/icons-material/Lan';
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode';
import TmDeptSectionSelect from 'src/views/CommonSelectCode/TmDeptSectionSelect';
import TmDepartmentSelect from 'src/views/CommonSelectCode/TmDepartmentSelect';
import AddSubTasks from './AddSubTasks';
import OuterSubTaskTable from './OuterSubTaskTable';
import SubTasksEdit from './SubTasksEdit';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import imageCompression from 'browser-image-compression';
import CusCheckBox from 'src/views/Components/CusCheckBox';
import { getProjectList } from 'src/redux/actions/TmProjectsList.action';
import TmProjectList from 'src/views/CommonSelectCode/TmProjectList';
import CloseIcon from '@mui/icons-material/Close';
const UpdateTasks = ({ TaskDataForEdit, setEditTaslFlag, reset, flag, setflag, taskTableCount, settaskTableCount }) => {

    const { tm_task_slno, main_task_slno, tm_task_status, tm_project_slno } = TaskDataForEdit



    const dispatch = useDispatch();
    const [departmentMast, setdepartmentMast] = useState(0)
    const [departmentSecMast, setdepartmentSecMast] = useState(0)
    const [employeeMast, setEmployeeMast] = useState(0)
    const [empArry, setEmpArry] = useState([])
    const [selectTaskfile, setselectTaskfile] = useState([]);
    const [subTaskData, setsubTaskData] = useState([])
    const [projectz, setprojectz] = useState(tm_project_slno === null ? 0 : tm_project_slno)
    const [completed, setCompleted] = useState(tm_task_status === 1 ? true : tm_task_status === 2 ? false : false)
    const [onProgress, setOnProgress] = useState(tm_task_status === 2 ? true : tm_task_status === 1 ? false : false)
    const [checkFlag, setcheckFlag] = useState(tm_task_status)
    const [taskData, setTaskData] = useState({

        taskName: '',
        dueDate: '',
        description: '',
        // taskStatus: (tm_task_status === 1 ? true : tm_task_status === 2 ? true : false)

    })
    useEffect(() => {
        dispatch(getProjectList())
    }, [dispatch,])





    const ChangeCompleted = useCallback((e) => {
        if (e.target.checked === true) {
            setCompleted(true)
            setOnProgress(false)
            setcheckFlag(1)
        }
        else {
            setCompleted(false)
            setOnProgress(false)
            setcheckFlag(0)

        }
    }, [])
    const ChangeOnProgress = useCallback((e) => {

        if (e.target.checked === true) {
            setCompleted(false)
            setOnProgress(true)
            setcheckFlag(2)
        }
        else {
            setCompleted(false)
            setOnProgress(false)
            setcheckFlag(0)

        }
    }, [])



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
    useEffect(() => {
        const getMasterTask = async (tm_task_slno) => {
            const result = await axioslogin.get(`/taskManagement/viewMasterTaskByid/${tm_task_slno}`);
            const { success, data } = result.data;

            if (success === 2) {
                const { tm_task_slno, tm_task_name, tm_task_due_date, tm_task_description, tm_project_slno,
                    tm_task_dept_sec, tm_task_dept, tm_task_status } = data[0]
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
                setCompleted(tm_task_status === 1 ? true : false)
                setOnProgress(tm_task_status === 2 ? true : false)
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
            tm_project_slno: projectz === 0 ? null : projectz,
            tm_task_status: checkFlag,
            edit_user: id
        }
    }, [tm_task_slno, taskName, dueDate, checkFlag, description, departmentMast, departmentSecMast, projectz, id])


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

    const UpdateTaskData = useCallback((e) => {
        e.preventDefault()
        const UpdateTask = async (updateMasterTask) => {
            const result = await axioslogin.patch('/taskManagement/updateMasterTask', updateMasterTask)
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
        if (taskName !== '') {
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
                                                settaskTableCount(taskTableCount + 1)
                                                resetSubtask()
                                                setEditTaslFlag(0)
                                            }
                                            else {
                                                //     warningNotify('failure in updating employee assign')
                                                resetSubtask()
                                                settaskTableCount(taskTableCount + 1)
                                                setEditTaslFlag(0)
                                            }
                                        }
                                        else {
                                            succesNotify(message)
                                            settaskTableCount(taskTableCount + 1)
                                            resetSubtask()
                                            setEditTaslFlag(0)
                                        }
                                    })
                                    succesNotify("Task Updated with file attach Successfully")
                                    settaskTableCount(taskTableCount + 1)
                                    resetSubtask()

                                } else {

                                    succesNotify(message)
                                    settaskTableCount(taskTableCount + 1)
                                    setEditTaslFlag(0)

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
                                        succesNotify(message)
                                        settaskTableCount(taskTableCount + 1)
                                        setEditTaslFlag(0)
                                        resetSubtask()
                                    }
                                    // else {
                                    //     warningNotify('failure in updating employee assign')
                                    // }
                                }
                                else {
                                    succesNotify(message)
                                    settaskTableCount(taskTableCount + 1)
                                    setEditTaslFlag(0)
                                    resetSubtask()
                                }
                            })
                            succesNotify(message)
                            settaskTableCount(taskTableCount + 1)
                            setEditTaslFlag(0)
                            resetSubtask()

                        } else {

                            succesNotify(message)
                            settaskTableCount(taskTableCount + 1)
                            setEditTaslFlag(0)
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
    }, [updateMasterTask, inactive, postEmpDetails, selectTaskfile, setEditTaslFlag, resetSubtask, handleImageUpload, taskName, tm_task_slno,
        settaskTableCount, taskTableCount, employeeMast])
    const selectForEditsSubTask = useCallback((value) => {
        setflag(2)
        setsubTaskData(value)
    }, [setsubTaskData, setflag])

    const handleRemoveTaskFile = (index) => {
        setselectTaskfile((prevTaskFiles) => {
            const updatedFiles = [...prevTaskFiles];
            updatedFiles.splice(index, 1); // Remove the file at the specified index
            return updatedFiles;
        });
    };
    return (
        <Box>
            <Box sx={{ display: 'flex', bgcolor: '#F2F1F0' }}>
                <Box sx={{ flex: 1, }}>
                    <Box sx={{ mt: 1.5, pl: 2, fontSize: 15, display: 'flex', justifyContent: 'right', mr: 1, height: 40, pt: 1.5, fontFamily: 'Georgia' }}>
                        <Typography sx={{ color: '#003B73' }}>
                            Task
                        </Typography>
                    </Box>
                    {main_task_slno === null ?
                        <Box sx={{ pl: 2, fontSize: 15, display: 'flex', justifyContent: 'right', mr: 1, mt: .5, height: 30, pt: .5, fontFamily: 'Georgia' }}>
                            <Typography sx={{ color: '#003B73' }}>
                                Project
                            </Typography>
                        </Box> : null}

                    <Box sx={{ pl: 2, fontSize: 15, display: 'flex', justifyContent: 'right', mr: 1, mt: .5, height: 30, pt: .5, fontFamily: 'Georgia' }}>
                        <Typography sx={{ color: '#003B73' }}>
                            Department
                        </Typography>
                    </Box>
                    <Box sx={{ pl: 2, fontSize: 15, display: 'flex', justifyContent: 'right', mr: 1, mt: .5, height: 30, pt: .5, fontFamily: 'Georgia' }}>
                        <Typography sx={{ color: '#003B73' }}>
                            Section
                        </Typography>
                    </Box>
                    <Box sx={{ pl: 2, fontSize: 15, display: 'flex', justifyContent: 'right', mr: 1, mt: .5, height: 30, pt: .5, fontFamily: 'Georgia' }}>
                        <Typography sx={{ color: '#003B73' }}>
                            Assignee
                        </Typography>
                    </Box>
                    <Box sx={{ pl: 2, fontSize: 15, display: 'flex', justifyContent: 'right', mr: 1, mt: .5, height: 30, pt: .5, fontFamily: 'Georgia' }}>
                        <Typography sx={{ color: '#003B73' }}>
                            Due date
                        </Typography>
                    </Box>
                    <Box sx={{ pl: 2, fontSize: 15, display: 'flex', justifyContent: 'right', mr: 1, mt: .5, height: 35, pt: .5, fontFamily: 'Georgia' }}>
                        <Typography sx={{ color: '#003B73' }}>
                            Description
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{ flex: 2.5, }}>
                    <Box sx={{ mt: .5, pt: 1 }}>
                        <CssVarsProvider>
                            <Textarea
                                type="text"
                                size="sm"
                                placeholder="Task Name*"
                                variant="outlined"
                                name="taskName"
                                value={taskName}
                                maxRows={2}
                                onChange={(e) => taskDataUpdate(e)}
                                sx={{ fontSize: 20, color: '#05445E' }}
                            ></Textarea>
                        </CssVarsProvider>
                    </Box>
                    {main_task_slno === null ?
                        <Box sx={{ mt: .3 }}>
                            <TmProjectList
                                projectz={projectz}
                                setprojectz={setprojectz} />
                        </Box> : null}
                    <Box sx={{ flex: 1, pt: .3 }}>
                        <TmDepartmentSelect
                            department={departmentMast}
                            setDepartment={setdepartmentMast} />
                    </Box>
                    <Box sx={{ flex: 1, pt: .3 }}>
                        <TmDeptSectionSelect
                            deptsec={departmentSecMast}
                            setDeptSec={setdepartmentSecMast} />
                    </Box>
                    <Box sx={{ flex: 1, pt: .3 }}>
                        <CssVarsProvider>
                            <TmMultEmpSelectUnderDeptSec
                                value={employeeMast}
                                setValue={setEmployeeMast}

                            />
                        </CssVarsProvider>
                    </Box>
                    <Box sx={{ pt: .3 }}>
                        <TextFieldCustom
                            type="date"
                            size="sm"
                            name="dueDate"
                            value={dueDate}
                            onchange={taskDataUpdate}
                        ></TextFieldCustom>
                    </Box>
                    <Box sx={{ mt: .3 }}>
                        <CssVarsProvider>
                            <Textarea
                                type="text"
                                size="sm"
                                placeholder="type here..."
                                // variant="outlined"
                                minRows={3}
                                maxRows={4}
                                name="description"
                                value={description}
                                onChange={(e) => taskDataUpdate(e)}
                            >
                            </Textarea>
                        </CssVarsProvider>
                    </Box>

                    <Box sx={{
                        fontFamily: 'Georgia',
                        height: 50, mt: .5, border: 1, borderRadius: 1, borderStyle: 'dashed', display: 'flex',
                        borderColor: '#C2D2D9',
                    }}>
                        <Box sx={{ color: '#003B73', display: 'flex', flex: 1, m: 1, border: .5, borderColor: '#B7CFDC', pl: 1, pt: .3, borderRadius: 2 }}>
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
                        <Box sx={{ flex: 4, overflowX: "scroll", overflow: 'hidden', }}>
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
                    <Box sx={{ flex: 1, display: 'flex', mt: .5 }}>
                        <Box sx={{ pt: .5 }}>
                            <CusCheckBox

                                color="primary"
                                size="md"
                                name="completed"
                                value={completed}
                                checked={completed}
                                onCheked={ChangeCompleted}
                            ></CusCheckBox>
                        </Box>
                        <Box sx={{ pl: 1, color: '#000C66', fontFamily: 'Georgia' }}>Task Completed</Box>

                        <Box sx={{ pt: .5, ml: 5 }}>
                            <CusCheckBox

                                color="primary"
                                size="md"
                                name="onProgress"
                                value={onProgress}
                                checked={onProgress}
                                onCheked={ChangeOnProgress}
                            ></CusCheckBox>
                        </Box>
                        <Box sx={{ pl: 1, color: '#000C66', fontFamily: 'Georgia' }}>Task On Progress</Box>
                    </Box>




                    <Box sx={{ pt: 1, }}>
                        <Box sx={{ display: 'flex', margin: 'auto' }}>
                            <Box sx={{ width: 150, flex: 1.5, display: 'flex', justifyContent: 'right' }}>
                                <CssVarsProvider>
                                    <Button variant="outlined"
                                        onClick={UpdateTaskData}
                                        sx={{ fontSize: 16, width: 150 }} >Update Task</Button>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ ml: 1, flex: 1 }}>
                                {main_task_slno === null ?
                                    <CssVarsProvider>
                                        <Tooltip title="Add Subtask" placement="bottom">
                                            <Button variant="outlined"
                                                onClick={openAddSubtask}

                                                sx={{ fontSize: 16, width: 150 }} >Add Subtask&nbsp;
                                                <LanIcon sx={{ color: '#41729F', width: 15, }} />
                                            </Button>
                                        </Tooltip>
                                    </CssVarsProvider> : null}
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ flex: 3, }}></Box>
            </Box>
            <Box >
                {
                    flag === 1 ?
                        <Box>
                            <AddSubTasks reset={reset} taskTableCount={taskTableCount} settaskTableCount={settaskTableCount} tm_task_slno={tm_task_slno} setflag={setflag} />
                        </Box>
                        :
                        flag === 2 ?
                            <Box>
                                <SubTasksEdit settaskTableCount={settaskTableCount} taskTableCount={taskTableCount}
                                    subTaskData={subTaskData} setflag={setflag}
                                    setsubTaskData={setsubTaskData} />
                            </Box>
                            : null
                }
            </Box>
            <Box >
                {main_task_slno === null || main_task_slno === 0 ?
                    <Box>
                        <OuterSubTaskTable tm_task_slno={tm_task_slno} selectForEditsSubTask={selectForEditsSubTask}
                            taskTableCount={taskTableCount}
                            settaskTableCount={settaskTableCount} />
                    </Box>
                    : <Box></Box>}
            </Box>
        </Box >
    )
}

export default memo(UpdateTasks)