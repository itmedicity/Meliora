import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { Box, CssVarsProvider, Textarea, Typography, Button, Tooltip } from '@mui/joy'
import { Divider } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { getDepartmentSubTask } from 'src/redux/actions/TmDepartment.action'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import TmDepartmentSelectSubTask from 'src/views/CommonSelectCode/TmDepartmentSelectSubTask'
import TmDeptSectionSubtask from 'src/views/CommonSelectCode/TmDeptSectionSubtask'
import TmMultEmpSelectUnderDeptSec from 'src/views/CommonSelectCode/TmMultEmpSelectUnderDeptSec'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import PermMediaIcon from '@mui/icons-material/PermMedia';
import imageCompression from 'browser-image-compression';
import CloseIcon from '@mui/icons-material/Close';
const AddSubTasks = ({ tm_task_slno, settaskTableCount, taskTableCount, setflag, }) => {


    const [departmentSubTask, setdepartmentSubTask] = useState(0)
    const [departmentSecSubTask, setdepartmentSecSubTask] = useState(0)
    const [employeeSubTask, setEmployeeSubTask] = useState([])
    const [subtaskFile, setSubtaskFile] = useState([]);


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDepartmentSubTask())
    }, [dispatch])
    const id = useSelector((state) => {
        return state.LoginUserData.empid
    })
    const [subTaskMast, setSubTaskMast] = useState({
        tm_sub_task_slno: '',
        tm_subtask_name: '',
        tm_subtask_dept: '',
        tm_subtask_dept_sec: '',
        tm_subtask_duedate: '',
        tm_subtask_description: '',
        tm_task_status: false,
        main_task_slno: ''
    })
    const { tm_subtask_name, tm_subtask_duedate, tm_subtask_description, tm_task_status } = subTaskMast
    const SubTaskUpdate = useCallback(
        (e) => {
            const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
            setSubTaskMast({ ...subTaskMast, [e.target.name]: value })
        },
        [subTaskMast],
    )

    const insertMastSubTask = useMemo(() => {
        return {
            main_task_slno: tm_task_slno,
            tm_task_name: tm_subtask_name === '' ? null : tm_subtask_name,
            tm_task_dept: departmentSubTask === 0 ? null : departmentSubTask,
            tm_task_dept_sec: departmentSecSubTask === 0 ? null : departmentSecSubTask,
            tm_task_due_date: tm_subtask_duedate === '' ? null : tm_subtask_duedate,
            tm_task_description: tm_subtask_description === '' ? null : tm_subtask_description,
            tm_task_status: tm_task_status === true ? 1 : 0,
            create_user: id,
        }
    }, [
        tm_task_slno,
        tm_subtask_name,
        departmentSubTask,
        departmentSecSubTask,
        tm_subtask_duedate,
        tm_subtask_description,
        tm_task_status,
        id,
    ])

    const handleSubTaskFile = useCallback((e) => {
        const newSubFiles = [...subtaskFile]
        newSubFiles.push(e.target.files[0])
        setSubtaskFile(newSubFiles)
    }, [subtaskFile, setSubtaskFile])
    const handleImageUpload = useCallback(async (imageFile) => {
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
        }
        const compressedFile = await imageCompression(imageFile, options)
        return compressedFile
    }, []);

    const addSubTaskData = useCallback((e) => {
        e.preventDefault()
        const InsertMastSubTask = async (insertMastSubTask) => {
            const result = await axioslogin.post('/taskManagement/insertSubTask', insertMastSubTask)
            return result.data

        }
        const InsertSubTaskDetail = async (insertSubTaskDetail) => {
            const result = await axioslogin.post('/taskManagement/insertSubtaskDetail', insertSubTaskDetail)
            return result.data
        }
        const InsertSubfile = async (subtaskFile, insertId) => {

            try {
                const formData = new FormData();
                formData.append('id', insertId);

                for (const file of subtaskFile) {
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
        if (tm_subtask_name !== '') {
            InsertMastSubTask(insertMastSubTask).then((value) => {
                const { message, success, insertId } = value
                if (success === 1) {
                    // setInsertsubId(insertId)
                    //check employee assigned
                    if (employeeSubTask.length !== 0) {
                        const insertSubTaskDetail = employeeSubTask && employeeSubTask.map((val) => {
                            return {
                                tm_task_slno: insertId,
                                tm_assigne_emp: val,
                                tm_detail_status: 1,
                                tm_detl_create: id
                            }
                        })
                        InsertSubTaskDetail(insertSubTaskDetail).then((value) => {
                            const { message, success } = value
                            if (success === 1) {
                                if (subtaskFile.length !== 0) {
                                    InsertSubfile(subtaskFile, insertId).then((value) => {
                                        const { success } = value
                                        if (success === 1) {
                                            succesNotify("Task Created with file attach Successfully")
                                            settaskTableCount(taskTableCount + 1)
                                            setflag(0)


                                        }
                                        else {
                                            warningNotify(message)
                                        }
                                    })
                                }
                                else {
                                    succesNotify("SubTask Created Successfully")
                                    settaskTableCount(taskTableCount + 1)
                                    setflag(0)
                                }
                            }
                            else {
                                warningNotify(message)
                            }
                        })
                    }
                    // No employee assined
                    else {
                        //file attached check


                        if (subtaskFile.length !== 0) {
                            InsertSubfile(subtaskFile, insertId).then((value) => {
                                const { success, message } = value
                                if (success === 1) {
                                    succesNotify("Subtask Created with file attach Successfully")
                                    settaskTableCount(taskTableCount + 1)
                                    setflag(0)

                                }
                                else {
                                    warningNotify(message)
                                }
                            })
                        }
                        //No file
                        else {
                            succesNotify("SubTask Created Successfully")
                            settaskTableCount(taskTableCount + 1)
                            setflag(0)

                        }
                    }

                }
                else {
                    warningNotify(message)
                }
            })
        } else {
            infoNotify('please enter task name')
        }
    }, [insertMastSubTask,
        // setInsertsubId,
        setflag, subtaskFile, taskTableCount, id, settaskTableCount, tm_subtask_name, employeeSubTask, handleImageUpload])
    const handleSubTaskRemove = (index) => {
        setSubtaskFile((prevFiles) => {
            const updatedFiles = [...prevFiles];
            updatedFiles.splice(index, 1); // Remove the file at the specified index
            return updatedFiles;
        });
    };
    return (
        <Box sx={{ bgcolor: '#F2F1F0' }} >
            <Box>
                <CssVarsProvider>
                    <Divider textAlign="left" sx={{ fontWeight: 600, mx: 2, fontSize: 18, color: '#5F093D', mt: 2, fontFamily: 'Georgia' }}> Add Subtask</Divider>
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
                                name="tm_subtask_name"
                                value={tm_subtask_name}
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
                            // setemployees={setemployees}
                            />
                        </CssVarsProvider>
                    </Box>
                    <Box sx={{ pt: .3 }}>
                        <TextFieldCustom
                            type="date"
                            size="sm"
                            name="tm_subtask_duedate"
                            value={tm_subtask_duedate}
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
                                name="tm_subtask_description"
                                value={tm_subtask_description}
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
                                    onChange={handleSubTaskFile}
                                    name="file"
                                    multiple // Add this attribute to allow multiple file selections
                                />
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ flex: 4, overflowX: "scroll", overflow: 'hidden', }}>
                            <Box sx={{ display: 'flex' }}>
                                {subtaskFile && subtaskFile.map((file, index) => (
                                    <Box sx={{
                                        display: "flex", flexDirection: "row", ml: .5, mt: 1.5,
                                        backgroundColor: '#C3CEDA', borderRadius: 2, px: .5,
                                    }} key={index} >
                                        <Box >{file.name}</Box>
                                        <Box sx={{ ml: .3 }}><CloseIcon sx={{ height: '17px', width: '20px', cursor: 'pointer' }}
                                            onClick={() => handleSubTaskRemove(index)} /></Box>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ pt: 1, }}>
                        <Box sx={{ margin: 'auto', width: 150, }}>
                            <CssVarsProvider>
                                <Button variant="outlined" sx={{ fontSize: 16, width: 150, fontWeight: 600 }}
                                    onClick={addSubTaskData}
                                >
                                    Add</Button>
                            </CssVarsProvider>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ flex: 3, }}></Box>
            </Box>
        </Box >
    )
}

export default memo(AddSubTasks)