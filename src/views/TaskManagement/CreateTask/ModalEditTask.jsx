import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { Box, Button, CssVarsProvider, Modal, ModalDialog, Textarea, Tooltip, Typography, } from '@mui/joy'
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import TmMultEmpSelectUnderDeptSec from 'src/views/CommonSelectCode/TmMultEmpSelectUnderDeptSec';
import TextFieldCustom from 'src/views/Components/TextFieldCustom';
import { DialogActions } from '@mui/material';
import { axioslogin } from 'src/views/Axios/Axios';
import SubtaskTable from './SubtaskTable';
import LanIcon from '@mui/icons-material/Lan';
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode';
import EditSubTask from './EditSubTask';
import AddSubTask from './AddSubTask';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import { getDepartSecemployee } from 'src/redux/actions/EmpNameDeptSect.action';
import CusCheckBox from 'src/views/Components/CusCheckBox';
import { getProjectList } from 'src/redux/actions/TmProjectsList.action';
import TmProjectList from 'src/views/CommonSelectCode/TmProjectList';
import imageCompression from 'browser-image-compression';
const ModalEditTask = ({ open, masterData, setEditModalFlag, setEditModalOpen, tableCount, setTableCount }) => {

    const { tm_task_slno, main_task_slno, tm_project_slno, tm_task_status } = masterData


    const dispatch = useDispatch();
    const [departmentMast, setdepartmentMast] = useState(0)
    const [departmentSecMast, setdepartmentSecMast] = useState(0)
    const [employeeMast, setEmployeeMast] = useState(0)
    const [tableRendering, setTableRendering] = useState(0)
    const [empArry, setEmpArry] = useState([])
    const [arry, setArry] = useState([])
    const [flag, setflag] = useState(0)
    const [subTaskData, setsubTaskData] = useState([])
    const [selectTaskfile, setselectTaskfile] = useState([]);
    const [projectz, setprojectz] = useState(tm_project_slno === null ? 0 : tm_project_slno)

    const [completed, setCompleted] = useState(tm_task_status === 1 ? true : tm_task_status === 2 ? false : false)
    const [onProgress, setOnProgress] = useState(tm_task_status === 2 ? true : tm_task_status === 1 ? false : false)
    const [checkFlag, setcheckFlag] = useState(tm_task_status)


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

    const [taskData, setTaskData] = useState({
        tm_task_slno: '',
        taskName: '',
        dueDate: '',
        description: '',
        // taskStatus: (tm_task_status === 1 ? true : false),

    })
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

    useEffect(() => {
        const getMasterTask = async (tm_task_slno) => {
            const result = await axioslogin.get(`/taskManagement/viewMasterTaskByid/${tm_task_slno}`);
            const { success, data } = result.data;
            if (success === 2) {
                const { tm_task_slno, tm_task_name, tm_task_due_date, tm_task_description, tm_project_slno, tm_task_status } = data[0]
                const formdata = {
                    taskSlno: tm_task_slno,
                    taskName: tm_task_name,
                    dueDate: tm_task_due_date,
                    description: tm_task_description,
                    // taskStatus: (tm_task_status === 1 ? true : false),

                }
                setTaskData(formdata)
                setdepartmentMast(empdept)
                setdepartmentSecMast(empsecid)
                setprojectz(tm_project_slno)
                setCompleted(tm_task_status === 1 ? true : false)
                setOnProgress(tm_task_status === 2 ? true : false)
            }
            else {
                // setdepartmentMast(0)
                // setdepartmentSecMast(0)
                // setTaskData('')
                // setprojectz(0)
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

            }
        }
        getMasterTask(tm_task_slno)
        getMastEmployee(tm_task_slno);
    }, [tm_task_slno, dispatch, empdept, empsecid, tm_project_slno, id])

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
            tm_project_slno: projectz === 0 ? null : projectz,

        }
    }, [tm_task_slno, taskName, checkFlag, dueDate, description, departmentMast, departmentSecMast, projectz,])



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



    // const reset = useCallback(() => {
    //     setdepartmentMast(0)
    //     setdepartmentSecMast(0)
    //     setEmployeeMast(0)
    //     setEmployeeMast(0)
    //     setprojectz(0)
    //     setTaskData('')
    // }, [setdepartmentMast, setdepartmentSecMast, setEmployeeMast, setEmployeeMast, setprojectz, setTaskData])

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
                                                setTableCount(tableCount + 1)
                                                handleEditClose()
                                                // setEditTaslFlag(0)
                                            }
                                            else {
                                                //     warningNotify('failure in updating employee assign')
                                                handleEditClose()
                                                setTableCount(tableCount + 1)
                                                // setEditTaslFlag(0)
                                            }
                                        }
                                        else {
                                            succesNotify(message)
                                            setTableCount(tableCount + 1)
                                            handleEditClose()
                                            // setEditTaslFlag(0)
                                        }
                                    })
                                    succesNotify("Task Updated with file attach Successfully")
                                    setTableCount(tableCount + 1)
                                    handleEditClose()

                                } else {

                                    succesNotify(message)
                                    setTableCount(tableCount + 1)
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
                                        succesNotify(message)
                                        setTableCount(tableCount + 1)
                                        // reset()
                                        handleEditClose()
                                    } else {
                                        setTableCount(tableCount + 1)
                                    }
                                    setTableCount(tableCount + 1)
                                }
                                else {
                                    succesNotify(message)
                                    handleEditClose()
                                    setTableCount(tableCount + 1)
                                    // reset()
                                }
                            })
                            succesNotify(message)
                            handleEditClose()
                            setTableCount(tableCount + 1)
                            // reset()

                        }
                        else {
                            succesNotify(message)
                            setTableCount(tableCount + 1)
                            handleEditClose()
                            // reset()
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
    }, [updateMasterTask, inactive, postEmpDetails, taskName, selectTaskfile, tm_task_slno, handleEditClose, handleImageUpload, tableCount, setTableCount, employeeMast])

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
                        width: '55vw',
                    }}
                >
                    <Box>

                        <Box sx={{ minHeight: 590, border: 1, borderColor: '#D9E4EC', borderRadius: 5 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: 1, pr: .5 }}>
                                <Tooltip title="Close">

                                    < CloseIcon sx={{ cursor: 'pointer', size: 'lg', height: 20, color: '#004F76' }}
                                        onClick={handleEditClose}
                                    />
                                </Tooltip>
                            </Box>
                            <Box sx={{
                                width: "99%", backgroundColor: '#D9E4EC', height: 45,
                                borderTop: 1, borderBlockColor: '#6AABD2', pt: 1, mx: .5, mt: .5
                            }}>
                                <ModeEditIcon sx={{ height: '20px' }} />edit Task
                            </Box>

                            <Box sx={{ display: 'flex', width: '100%', }}>
                                <Box sx={{ flex: 1, }}>
                                    <Box sx={{ pt: 2, pl: 2, fontSize: 18, mt: 1.2, display: 'flex', justifyContent: 'right', mr: 1 }}>
                                        <Typography sx={{ color: '#003B73', fontFamily: 'Georgia' }}>
                                            Task Name
                                        </Typography>
                                    </Box>
                                    {main_task_slno === null ?
                                        <Box sx={{ pl: 2, fontSize: 15, display: 'flex', justifyContent: 'right', mr: 1, mt: .5, height: 30, pt: 1, fontFamily: 'Georgia' }}>
                                            <Typography sx={{ color: '#003B73' }}>
                                                Project
                                            </Typography>
                                        </Box> : null}
                                    <Box sx={{ pt: 1, pl: 2, fontSize: 18, mt: 1.2, display: 'flex', justifyContent: 'right', mr: 1 }}>
                                        <Typography sx={{ color: '#003B73', fontFamily: 'Georgia' }}>
                                            Department
                                        </Typography>
                                    </Box>
                                    <Box sx={{ mt: .5, pl: 2, pt: 1.5, fontSize: 18, display: 'flex', justifyContent: 'right', mr: 1 }}>
                                        <Typography sx={{ color: '#003B73', fontFamily: 'Georgia' }}>
                                            Assignee
                                        </Typography>
                                    </Box>
                                    <Box sx={{ pl: 2, fontSize: 18, mt: 1.5, display: 'flex', justifyContent: 'right', mr: 1 }}>
                                        <Typography sx={{ color: '#003B73', fontFamily: 'Georgia' }}>
                                            Due date
                                        </Typography>
                                    </Box>
                                    <Box sx={{ pl: 2, fontSize: 18, mt: 2, display: 'flex', justifyContent: 'right', mr: 1 }}>
                                        <Typography sx={{ color: '#003B73', fontFamily: 'Georgia' }}>
                                            Description
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box sx={{ flex: 3.5 }}>
                                    <Box sx={{ mt: .5, pt: 1 }}>
                                        <CssVarsProvider>
                                            <Textarea
                                                type="text"
                                                size="sm"
                                                placeholder="Task Name*"
                                                variant="outlined"
                                                name="taskName"
                                                value={taskName}
                                                maxRows={1}
                                                onChange={(e) => taskDataUpdate(e)}
                                                sx={{ fontSize: 22, color: '#003B73', }}
                                            ></Textarea>
                                        </CssVarsProvider>
                                    </Box>
                                    {main_task_slno === null ?
                                        <Box sx={{ mt: .5 }}>
                                            <TmProjectList
                                                projectz={projectz}
                                                setprojectz={setprojectz} />
                                        </Box> : null}
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
                                            value={employeeMast}
                                            setValue={setEmployeeMast}
                                        />
                                    </Box>
                                    <Box sx={{ mt: .5 }}>
                                        <TextFieldCustom
                                            type="date"
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
                                            maxRows={4}
                                            name="description"
                                            value={description}
                                            onChange={(e) => taskDataUpdate(e)}
                                        >
                                        </Textarea>
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

                                </Box>
                                <Box sx={{ flex: 1.5, mt: 2, ml: .5 }}>
                                    <Box sx={{ height: 50, margin: 'auto', }}>
                                        {main_task_slno === null ?
                                            <Button variant="outlined" sx={{ fontSize: 14, width: 180, color: '#003B73' }}
                                                onClick={openAddSubtask} >
                                                <LanIcon sx={{ color: '#777180' }} />
                                                &nbsp;Add Subtask</Button>
                                            : <Box>
                                            </Box>}
                                    </Box>
                                </Box>
                            </Box>
                            <Box>
                                {
                                    flag === 1 ?
                                        <Box>
                                            <AddSubTask
                                                tm_task_slno={tm_task_slno}
                                                setTableRendering={setTableRendering}
                                                tableRendering={tableRendering}
                                                setflag={setflag}
                                                tableCount={tableCount}
                                                setTableCount={setTableCount}
                                            />
                                        </Box>
                                        :
                                        flag === 2 ?
                                            <Box>
                                                <EditSubTask setflag={setflag} subTaskData={subTaskData}
                                                    setsubTaskData={setsubTaskData} setTableRendering={setTableRendering}
                                                    tableRendering={tableRendering}
                                                    tableCount={tableCount}
                                                    setTableCount={setTableCount}
                                                />
                                            </Box>
                                            : null
                                }
                            </Box>
                            <Box >
                                {main_task_slno === null || main_task_slno === 0 ?
                                    <Box>
                                        < SubtaskTable
                                            tableCount={tableCount}
                                            arry={arry}
                                            setArry={setArry}
                                            tm_task_slno={tm_task_slno}
                                            setflag={setflag}
                                            selectForEditsSubTask={selectForEditsSubTask}
                                            tableRendering={tableRendering}
                                            setTableRendering={setTableRendering}
                                        />
                                    </Box>
                                    : <Box></Box>}
                            </Box>
                        </Box>
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
        </Box>
    )
}

export default memo(ModalEditTask)