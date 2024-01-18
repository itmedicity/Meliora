import { Box, Button, CssVarsProvider, Textarea, Typography, Tooltip } from '@mui/joy'
import { Divider } from '@mui/material'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDepartmentSubTask } from 'src/redux/actions/TmDepartment.action'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import TmDepartmentSelectSubTask from 'src/views/CommonSelectCode/TmDepartmentSelectSubTask'
import TmDeptSectionSubtask from 'src/views/CommonSelectCode/TmDeptSectionSubtask'
import TmMultEmpSelectUnderDeptSec from 'src/views/CommonSelectCode/TmMultEmpSelectUnderDeptSec'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import imageCompression from 'browser-image-compression';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import CloseIcon from '@mui/icons-material/Close';
import CusCheckBox from 'src/views/Components/CusCheckBox'
const SubTasksEdit = ({ subTaskData, taskTableCount, settaskTableCount, setflag }) => {

    const { tm_task_slno, tm_task_status } = subTaskData

    const [departmentSubTask, setdepartmentSubTask] = useState(0)
    const [departmentSecSubTask, setdepartmentSecSubTask] = useState(0)
    const [employeeSubTask, setEmployeeSubTask] = useState(0)

    const dispatch = useDispatch();
    const [empArry, setEmpArry] = useState([])

    const [subtakUpdateFile, setsubtakUpdateFile] = useState([]);

    const [subTaskMast, setSubTaskMast] = useState({
        tm_task_slno: '',
        subTaskName: '',
        subTaskDueDate: '',
        subTaskDescription: '',
        taskStatus: (tm_task_status === 1 ? true : false)
    })
    const { subTaskName, subTaskDueDate, subTaskDescription, taskStatus } = subTaskMast

    // const closeSubTask = useCallback((e) => {
    //     setflag(0)
    // }, [setflag])

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


    useEffect(() => {
        dispatch(getDepartmentSubTask())
    }, [dispatch])
    useEffect(() => {
        const getSubTask = async (tm_task_slno) => {
            const result = await axioslogin.get(`/taskManagement/subtaskviewByidForEdit/${tm_task_slno}`);
            const { success, data } = result.data;
            if (success === 2) {
                const { tm_task_name, tm_task_due_date, tm_task_description, tm_task_dept, tm_task_dept_sec, tm_task_status } = data[0]
                const formdata = {
                    tm_task_slno: tm_task_slno,
                    subTaskName: tm_task_name,
                    subTaskDueDate: tm_task_due_date,
                    subTaskDescription: tm_task_description,
                    taskStatus: (tm_task_status === 1 ? true : false)
                }
                setSubTaskMast(formdata)
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
                            // edit_user: id
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
            tm_task_status: taskStatus === true ? 1 : 0,
            edit_user: id
        }

    }, [tm_task_slno, subTaskName, subTaskDueDate, taskStatus, subTaskDescription,
        departmentSubTask, departmentSecSubTask, id])


    const reset = useCallback(() => {

        const frmdata = {
            tm_sub_task_slno: '',
            subTaskName: '',
            subTaskDueDate: '',
            subTaskDescription: ''
        }
        setSubTaskMast(frmdata)
        setdepartmentSubTask(0)
        setdepartmentSecSubTask(0)
        setEmployeeSubTask(0)

    }, [setSubTaskMast, setdepartmentSubTask, setdepartmentSecSubTask, setEmployeeSubTask,]);
    const updateSubtaskFile = useCallback((e) => {
        const newFiles = [...subtakUpdateFile]
        newFiles.push(e.target.files[0])
        setsubtakUpdateFile(newFiles)
    }, [subtakUpdateFile, setsubtakUpdateFile])
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
        const InsertFile = async (subtakUpdateFile, tm_task_slno) => {
            try {
                const formData = new FormData();
                formData.append('id', tm_task_slno);
                for (const file of subtakUpdateFile) {
                    if (file.type.startsWith('image')) {
                        const compressedFile = await handleImageUpload(file);
                        formData.append('files', compressedFile, compressedFile.name);
                    } else {
                        formData.append('files', file, file.name);
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

        if (subTaskName !== '') {
            UpdateTask(updateSubTask).then((value) => {
                const { message, success } = value
                if (success === 2) {

                    if (subtakUpdateFile.length !== 0) {
                        InsertFile(subtakUpdateFile, tm_task_slno).then((value) => {
                            const { success, message } = value
                            if (success === 1) {



                                if (employeeSubTask !== 0) {
                                    Inactiveemp(inactive).then((value) => {
                                        const { message, succes } = value
                                        if (succes === 1) {
                                            UpdateSubTaskDtl(postEmpDetails)
                                            const { message, success } = value
                                            if (success === 1) {
                                                succesNotify(message)
                                                settaskTableCount(taskTableCount + 1)
                                                reset()
                                                setflag(0)
                                            }
                                            // else {
                                            //     warningNotify('failure in updating employee assign')
                                            // }
                                        }
                                        else {
                                            succesNotify(message)
                                            settaskTableCount(taskTableCount + 1)
                                            reset()
                                            setflag(0)
                                        }
                                    })
                                    succesNotify("Task Updated with file attach Successfully")
                                    settaskTableCount(taskTableCount + 1)
                                    reset()
                                    setflag(0)

                                } else {

                                    succesNotify(message)
                                    settaskTableCount(taskTableCount + 1)
                                    setflag(0)

                                }




                            }
                            else {
                                warningNotify(message)
                            }
                        })
                    }
                    //WITHOUT FILE UPLOAD
                    else {


                        if (employeeSubTask !== 0) {


                            Inactiveemp(inactive).then((value) => {
                                const { message, succes } = value
                                if (succes === 1) {
                                    UpdateSubTaskDtl(postEmpDetails)
                                    const { message, success } = value
                                    if (success === 1) {
                                        succesNotify(message)
                                        settaskTableCount(taskTableCount + 1)
                                        setflag(0)
                                        reset()

                                    }
                                    // else {
                                    //     warningNotify('failure in updating employee assign')
                                    // }
                                }
                                else {
                                    succesNotify(message)
                                    settaskTableCount(taskTableCount + 1)
                                    setflag(0)
                                    reset()

                                }
                            })
                            succesNotify(message)
                            settaskTableCount(taskTableCount + 1)
                            setflag(0)
                            reset()




                        } else {

                            succesNotify(message)
                            settaskTableCount(taskTableCount + 1)
                            setflag(0)

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
    }, [updateSubTask, inactive, postEmpDetails, subtakUpdateFile, tm_task_slno, subTaskName, reset, settaskTableCount, setflag, handleImageUpload, taskTableCount,
        employeeSubTask])

    const subtaskFileRemove = (index) => {
        setsubtakUpdateFile((prevFiles) => {
            const updatedFiles = [...prevFiles];
            updatedFiles.splice(index, 1); // Remove the file at the specified index
            return updatedFiles;
        });
    };


    return (
        <Box sx={{ bgcolor: '#F2F1F0' }} >
            <Box>
                <CssVarsProvider>
                    <Divider textAlign="left" sx={{ fontWeight: 600, mx: 2, fontSize: 18, color: '#5F093D', mt: 2, fontFamily: 'Georgia' }}>Edit SubTask</Divider>
                </CssVarsProvider>
            </Box>
            <Box sx={{ display: 'flex', bgcolor: '#F2F1F0' }}>
                <Box sx={{ flex: 1, }}>
                    <Box sx={{ py: 1, pl: 2, fontSize: 15, mt: 1.5, display: 'flex', justifyContent: 'right', mr: 1, fontFamily: 'Georgia' }}>
                        <Typography sx={{ color: '#003B73' }}>
                            Task
                        </Typography>
                    </Box>
                    <Box sx={{ mt: .5, pl: 2, fontSize: 15, py: .5, display: 'flex', justifyContent: 'right', mr: 1, fontFamily: 'Georgia' }}>
                        <Typography sx={{ color: '#003B73' }}>
                            Department
                        </Typography>
                    </Box>
                    <Box sx={{ mt: .5, pl: 2, fontSize: 15, py: .5, display: 'flex', justifyContent: 'right', mr: 1, fontFamily: 'Georgia' }}>
                        <Typography sx={{ color: '#003B73' }}>
                            Section
                        </Typography>
                    </Box>
                    <Box sx={{ mt: .5, pl: 2, fontSize: 15, py: .5, display: 'flex', justifyContent: 'right', mr: 1, fontFamily: 'Georgia' }}>
                        <Typography sx={{ color: '#003B73' }}>
                            Assignee
                        </Typography>
                    </Box>
                    <Box sx={{ mt: .5, pl: 2, fontSize: 15, py: .5, display: 'flex', justifyContent: 'right', mr: 1, fontFamily: 'Georgia' }}>
                        <Typography sx={{ color: '#003B73' }}>
                            Due date
                        </Typography>
                    </Box>
                    <Box sx={{ mt: .5, pl: 2, fontSize: 15, py: .5, display: 'flex', justifyContent: 'right', mr: 1, fontFamily: 'Georgia' }}>
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
                                placeholder="Subtask Name*"
                                variant="outlined"
                                name="subTaskName"
                                value={subTaskName}
                                maxRows={1}
                                onChange={(e) => SubTaskUpdate(e)}
                                sx={{ fontSize: 20, color: '#05445E' }}
                            ></Textarea>
                        </CssVarsProvider>
                    </Box>
                    <Box sx={{ flex: 1, pt: .3 }}>
                        <TmDepartmentSelectSubTask
                            departmentSub={departmentSubTask}
                            setDepartmentSub={setdepartmentSubTask}
                        />
                    </Box>
                    <Box sx={{ flex: 1, pt: .3 }}>
                        <TmDeptSectionSubtask
                            deptsecSub={departmentSecSubTask}
                            setDeptSecSub={setdepartmentSecSubTask}
                        />
                    </Box>
                    <Box sx={{ flex: 1, pt: .3 }}>

                        <CssVarsProvider>
                            <TmMultEmpSelectUnderDeptSec
                                value={employeeSubTask}
                                setValue={setEmployeeSubTask}
                            // setemployees={setEmpNameSubTask}
                            />
                        </CssVarsProvider>
                    </Box>
                    <Box sx={{ pt: .3 }}>
                        <TextFieldCustom
                            type="date"
                            size="sm"
                            name="subTaskDueDate"
                            value={subTaskDueDate}
                            onchange={SubTaskUpdate}
                        ></TextFieldCustom>
                    </Box>
                    <Box sx={{ mt: .3 }}>
                        <CssVarsProvider>
                            <Textarea
                                type="text"
                                size="sm"
                                placeholder="type here..."
                                variant="outlined"
                                minRows={3}
                                maxRows={4}
                                name="subTaskDescription"
                                value={subTaskDescription}
                                onChange={(e) => SubTaskUpdate(e)}
                            >
                            </Textarea>
                        </CssVarsProvider>
                    </Box>

                    <Box sx={{
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
                                    onChange={updateSubtaskFile}
                                    name="file"
                                    multiple // Add this attribute to allow multiple file selections
                                />
                            </CssVarsProvider>

                        </Box>

                        <Box sx={{ flex: 4, overflowX: "scroll", overflow: 'hidden', }}>
                            <Box sx={{ display: 'flex' }}>
                                {subtakUpdateFile && subtakUpdateFile.map((file, index) => (
                                    <Box sx={{
                                        display: "flex", flexDirection: "row", ml: .5, mt: 1.5,
                                        backgroundColor: '#C3CEDA', borderRadius: 2, px: .5,
                                    }} key={index} >
                                        <Box >{file.name}</Box>
                                        <Box sx={{ ml: .3 }}><CloseIcon sx={{ height: '17px', width: '20px', cursor: 'pointer' }}
                                            onClick={() => subtaskFileRemove(index)} /></Box>
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
                                name="taskStatus"
                                value={taskStatus}
                                checked={taskStatus}
                                onCheked={SubTaskUpdate}
                            ></CusCheckBox>
                        </Box>
                        <Box sx={{ pl: 1, color: '#000C66', fontFamily: 'Georgia' }}>Task Completed</Box>
                    </Box>
                    <Box sx={{ pt: 1, }}>
                        <Box sx={{ margin: 'auto', width: 150, }}>
                            <CssVarsProvider>
                                <Button variant="outlined" sx={{ fontSize: 16, width: 150, fontWeight: 600 }}
                                    onClick={SubmitTask}
                                >
                                    Update</Button>
                            </CssVarsProvider>

                        </Box>

                    </Box>
                </Box>
                <Box sx={{ flex: 3, }}>

                </Box>

            </Box>

        </Box >
    )
}

export default memo(SubTasksEdit)