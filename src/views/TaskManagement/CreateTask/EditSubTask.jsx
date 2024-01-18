import { Box, Button, CssVarsProvider, Textarea, Typography } from '@mui/joy'
import { Divider } from '@mui/material'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDepartSecemployee } from 'src/redux/actions/EmpNameDeptSect.action'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import TmMultEmpSelectUnderDeptSec from 'src/views/CommonSelectCode/TmMultEmpSelectUnderDeptSec'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
// import imageCompression from 'browser-image-compression';
import CusCheckBox from 'src/views/Components/CusCheckBox';
const EditSubTask = ({ subTaskData, setflag, tableCount, setTableCount }) => {

    const [employeeSubTask, setEmployeeSubTask] = useState(0)
    const dispatch = useDispatch();
    const [empArry, setEmpArry] = useState([])
    // const [selectFile, setSelectFile] = useState([]);
    const { tm_task_slno, tm_task_status } = subTaskData
    const [completed, setCompleted] = useState(tm_task_status === 1 ? true : tm_task_status === 2 ? false : false)
    const [onProgress, setOnProgress] = useState(tm_task_status === 2 ? true : tm_task_status === 1 ? false : false)
    const [checkFlag, setcheckFlag] = useState(tm_task_status)

    const [subTaskMast, setSubTaskMast] = useState({
        tm_task_slno: '',
        subTaskName: '',
        subTaskDueDate: '',
        subTaskDescription: ''

    })
    const { subTaskName, subTaskDueDate, subTaskDescription, } = subTaskMast

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
                    // taskStatus: (tm_task_status === 1 ? true : false)
                }
                setSubTaskMast(formdata)
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
    }, [tm_task_slno, dispatch, id])
    const updateSubTask = useMemo(() => {
        return {
            tm_task_slno: tm_task_slno,
            tm_task_name: subTaskName === '' ? null : subTaskName,
            tm_task_due_date: subTaskDueDate === '' ? null : subTaskDueDate,
            tm_task_description: subTaskDescription === '' ? null : subTaskDescription,
            tm_task_dept: empdept === 0 ? null : empdept,
            tm_task_dept_sec: empsecid === 0 ? null : empsecid,
            tm_task_status: checkFlag,
            edit_user: id

        }
    }, [tm_task_slno, subTaskName, subTaskDueDate, subTaskDescription, empdept, empsecid, checkFlag, id])


    const reset = useCallback(() => {
        const frmdata = {
            tm_sub_task_slno: '',
            subTaskName: '',
            subTaskDueDate: '',
            subTaskDescription: '',
            // taskStatus: false
        }
        setSubTaskMast(frmdata)
        setEmployeeSubTask(0)
    }, [setSubTaskMast, setEmployeeSubTask,]);

    // const handleRemoveFile = (index) => {
    //     setSelectFile((prevFiles) => {
    //         const updatedFiles = [...prevFiles];
    //         updatedFiles.splice(index, 1); // Remove the file at the specified index
    //         return updatedFiles;
    //     });
    // };
    // const handleFileChange = useCallback((e) => {
    //     const newFiles = [...selectFile]
    //     newFiles.push(e.target.files[0])
    //     setSelectFile(newFiles)
    // }, [selectFile, setSelectFile])

    // const handleImageUpload = useCallback(async (imageFile) => {
    //     const options = {
    //         maxSizeMB: 1,
    //         maxWidthOrHeight: 1920,
    //         useWebWorker: true,
    //     }
    //     const compressedFile = await imageCompression(imageFile, options)
    //     return compressedFile
    // }, []);

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
        // const InsertFile = async (selectFile, insertId) => {
        //     try {
        //         const formData = new FormData();
        //         formData.append('id', insertId);
        //         for (const file of selectFile) {
        //             if (file.type.startsWith('image')) {
        //                 const compressedFile = await handleImageUpload(file);
        //                 formData.append('files', compressedFile, compressedFile.name);
        //             } else {
        //                 formData.append('files', file, file.name);
        //             }
        //         }
        //         // Use the Axios instance and endpoint that matches your server setup
        //         const uploadResult = await axioslogin.post('/TmFileUpload/uploadFile/task', formData, {
        //             headers: {
        //                 'Content-Type': 'multipart/form-data',
        //             },
        //         });
        //         return uploadResult.data;
        //     } catch (error) {
        //         warningNotify('An error occurred during file upload.');
        //     }
        // };

        if (subTaskName !== '') {
            UpdateTask(updateSubTask).then((value) => {
                const { message, success } = value
                if (success === 2) {

                    // if (selectFile.length !== 0) {
                    //     InsertFile(selectFile, tm_task_slno).then((value) => {
                    //         const { success, message } = value
                    //         if (success === 1) {

                    //             if (employeeSubTask !== 0) {
                    //                 Inactiveemp(inactive).then((value) => {
                    //                     const { message, succes } = value
                    //                     if (succes === 1) {
                    //                         UpdateSubTaskDtl(postEmpDetails)
                    //                         const { message, success } = value
                    //                         if (success === 1) {
                    //                             succesNotify(message)
                    //                             closeSubTask()
                    //                             setTableCount(tableCount + 1)
                    //                         }
                    //                         else {
                    //                             //     warningNotify('failure in updating employee assign')
                    //                             closeSubTask()
                    //                             setTableCount(tableCount + 1)
                    //                         }
                    //                     }
                    //                     else {
                    //                         infoNotify(message)
                    //                         closeSubTask()
                    //                         reset()
                    //                     }
                    //                 })
                    //                 setTableCount(tableCount + 1)
                    //                 succesNotify("Task Updated with file attach Successfully")
                    //             }
                    //             else {

                    //                 succesNotify(message)
                    //                 setTableCount(tableCount + 1)
                    //             }
                    //         }
                    //         else {
                    //             warningNotify(message)
                    //         }
                    //     })
                    // }

                    //WITHOUT FILE UPLOAD
                    // else {

                    if (employeeSubTask !== 0) {
                        Inactiveemp(inactive).then((value) => {
                            const { message, succes } = value
                            if (succes === 1) {
                                UpdateSubTaskDtl(postEmpDetails)
                                const { message, success } = value
                                if (success === 1) {
                                    succesNotify(message)
                                    setTableCount(tableCount + 1)
                                    closeSubTask()
                                    reset()
                                }
                            }
                            else {
                                succesNotify(message)
                                setTableCount(tableCount + 1)
                                closeSubTask()
                                reset()
                            }
                        })
                        succesNotify(message)
                        setTableCount(tableCount + 1)
                        closeSubTask()
                        reset()
                    }
                    else {

                        succesNotify(message)
                        setTableCount(tableCount + 1)
                        closeSubTask()
                        reset()
                    }
                    // }
                }
                else {
                    warningNotify(message)
                }
            })
        }
        else {
            infoNotify('please Fill Mandatory Feilds')
        }
    }, [updateSubTask, inactive, postEmpDetails, subTaskName, tableCount, setTableCount, reset, closeSubTask, employeeSubTask])

    return (
        <Box>
            <Box>
                <Divider textAlign="left" sx={{ fontWeight: 600, mx: 2, fontSize: 18, color: '#5F093D', mt: 2 }}>Edit SubTask</Divider>
            </Box>
            <Box sx={{ display: 'flex', }}>
                <Box sx={{ flex: 1, }}>
                    <Box sx={{ pt: 1, pl: 2, fontSize: 18, mt: 1.2, display: 'flex', justifyContent: 'right', mr: 1 }}>
                        <Typography sx={{ color: '#003B73' }}>
                            Subtask Name
                        </Typography>
                    </Box>
                    <Box sx={{ pl: 2, fontSize: 18, pt: 2, display: 'flex', justifyContent: 'right', mr: 1 }}>
                        <Typography sx={{ color: '#003B73' }}>
                            Department
                        </Typography>
                    </Box>
                    <Box sx={{ mt: .5, pl: 2, fontSize: 18, pt: 1.2, display: 'flex', justifyContent: 'right', mr: 1 }}>
                        <Typography sx={{ color: '#003B73' }}>
                            Assignee
                        </Typography>
                    </Box>
                    <Box sx={{ mt: .5, pl: 2, fontSize: 18, pt: 1.5, display: 'flex', justifyContent: 'right', mr: 1 }}>
                        <Typography sx={{ color: '#003B73' }}>
                            Due date
                        </Typography>
                    </Box>
                    <Box sx={{ mt: .5, pl: 2, fontSize: 18, pt: 2, display: 'flex', justifyContent: 'right', mr: 1 }}>
                        <Typography sx={{ color: '#003B73' }}>
                            Description
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{ flex: 4 }}>
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
                                sx={{ fontSize: 22, color: '#05445E' }}
                            ></Textarea>
                        </CssVarsProvider>
                    </Box>
                    <Box sx={{ mt: .5 }}>
                        <TextFieldCustom
                            type="text"
                            name="secName"
                            value={secName}
                            disabled>
                        </TextFieldCustom>
                    </Box>
                    <Box sx={{ mt: .5 }}>
                        <TmMultEmpSelectUnderDeptSec
                            value={employeeSubTask}
                            setValue={setEmployeeSubTask}
                        // setemployees={setEmpNameSubTask}
                        />
                    </Box>
                    <Box sx={{ mt: .5 }}>
                        <TextFieldCustom
                            type="date"
                            size="sm"
                            name="subTaskDueDate"
                            value={subTaskDueDate}
                            onchange={SubTaskUpdate}
                        ></TextFieldCustom>
                    </Box>
                    <Box sx={{ mt: .5 }}>
                        <Textarea
                            type="text"
                            size="sm"
                            placeholder="type here..."
                            variant="outlined"
                            minRows={2}
                            maxRows={4}
                            name="subTaskDescription"
                            value={subTaskDescription}
                            onChange={(e) => SubTaskUpdate(e)}
                        >
                        </Textarea>
                    </Box>
                    {/* <Box sx={{
                        height: 50, mt: .5, border: 1, borderRadius: 4, borderStyle: 'dashed', display: 'flex',
                        borderColor: '#C2D2D9',
                    }}>
                        <Box sx={{ display: 'flex', flex: 1, m: 1, border: .5, borderColor: '#B7CFDC', pl: 1, pt: .3, borderRadius: 4 }}>
                            <Typography sx={{ color: '#003B73' }}>fileUpload&nbsp;</Typography>
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
                                    onChange={handleFileChange}
                                    name="file"
                                    multiple // Add this attribute to allow multiple file selections
                                />
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ flex: 4, overflowX: "scroll", overflow: 'hidden', }}>
                            <Box sx={{ display: 'flex' }}>
                                {selectFile && selectFile.map((file, index) => (
                                    <Box sx={{
                                        display: "flex", flexDirection: "row", ml: .5, mt: 1.5,
                                        backgroundColor: '#C3CEDA', borderRadius: 2, px: .5,
                                    }} key={index} >
                                        <Box >{file.name}</Box>
                                        <Box sx={{ ml: .3 }}><CloseIcon sx={{ height: '17px', width: '20px', cursor: 'pointer' }}
                                            onClick={() => handleRemoveFile(index)} /></Box>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    </Box> */}
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
                </Box><Box sx={{ flex: 2 }}></Box>
            </Box>
            <Box sx={{ margin: 'auto', pt: 1, width: '40%', }}>
                <Button variant="outlined" sx={{ fontSize: 14, width: 180 }}
                    onClick={SubmitTask}
                >
                    Update</Button>
            </Box>
        </Box >
    )
}

export default memo(EditSubTask)