import { Box, Button, CssVarsProvider, Textarea, Tooltip, Typography, } from '@mui/joy'
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
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
const SubTasksEdit = ({ subTaskData, taskTableCount, settaskTableCount, setflag }) => {

    const { tm_task_slno, tm_task_status, em_name } = subTaskData




    const [departmentSubTask, setdepartmentSubTask] = useState(0)
    const [departmentSecSubTask, setdepartmentSecSubTask] = useState(0)
    const [employeeSubTask, setEmployeeSubTask] = useState(0)
    // const [completed, setCompleted] = useState(tm_task_status === 1 ? true : tm_task_status === 2 ? false : false)
    // const [onProgress, setOnProgress] = useState(tm_task_status === 2 ? true : tm_task_status === 1 ? false : false)
    // const [checkFlag, setcheckFlag] = useState(tm_task_status)
    const dispatch = useDispatch();
    const [changeAssignee, setchangeAssignee] = useState(0)
    const [empArry, setEmpArry] = useState([])

    // const [subtakUpdateFile, setsubtakUpdateFile] = useState([]);

    const [subTaskMast, setSubTaskMast] = useState({
        tm_task_slno: '',
        subTaskName: '',
        subTaskDueDate: '',
        subTaskDescription: '',
        tm_task_status: tm_task_status
        // taskStatus: (tm_task_status === 1 ? true : false)
    })
    const { subTaskName, subTaskDueDate, subTaskDescription, } = subTaskMast

    // const ChangeCompleted = useCallback((e) => {
    //     if (e.target.checked === true) {
    //         setCompleted(true)
    //         setOnProgress(false)
    //         setcheckFlag(1)
    //     }
    //     else {
    //         setCompleted(false)
    //         setOnProgress(false)
    //         setcheckFlag(0)

    //     }
    // }, [])
    // const ChangeOnProgress = useCallback((e) => {

    //     if (e.target.checked === true) {
    //         setCompleted(false)
    //         setOnProgress(true)
    //         setcheckFlag(2)
    //     }
    //     else {
    //         setCompleted(false)
    //         setOnProgress(false)
    //         setcheckFlag(0)

    //     }
    // }, [])

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
                const { tm_task_name, tm_task_due_date, tm_task_description, tm_task_dept, tm_task_dept_sec, } = data[0]
                const formdata = {
                    tm_task_slno: tm_task_slno,
                    subTaskName: tm_task_name,
                    subTaskDueDate: tm_task_due_date,
                    subTaskDescription: tm_task_description,
                    // checkFlag: (tm_task_status === 1 ? true : tm_task_status === 2 ? true : false)
                }
                setSubTaskMast(formdata)
                setdepartmentSubTask(tm_task_dept)
                setdepartmentSecSubTask(tm_task_dept_sec)
                // setCompleted(tm_task_status === 1 ? true : false)
                // setOnProgress(tm_task_status === 2 ? true : false)
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
            tm_task_status: tm_task_status,
            edit_user: id
        }

    }, [tm_task_slno, subTaskName, subTaskDueDate, tm_task_status, subTaskDescription,
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

    // const updateSubtaskFile = useCallback((e) => {
    //     const newFiles = [...subtakUpdateFile]
    //     newFiles.push(e.target.files[0])
    //     setsubtakUpdateFile(newFiles)
    // }, [subtakUpdateFile, setsubtakUpdateFile])
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


        if (subTaskName !== '') {
            UpdateTask(updateSubTask).then((value) => {
                const { message, success } = value
                if (success === 2) {

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


                                } else {
                                    settaskTableCount(taskTableCount + 1)
                                }
                            }
                            else {
                                succesNotify(message)
                                setflag(0)
                                reset()

                            }
                        })
                        succesNotify(message)
                        setflag(0)
                        reset()
                    } else {
                        succesNotify(message)
                        settaskTableCount(taskTableCount + 1)
                        setflag(0)
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
    }, [updateSubTask, inactive, postEmpDetails, subTaskName, reset, settaskTableCount, setflag, taskTableCount, employeeSubTask])


    const changeEmp = useCallback((e) => {
        setchangeAssignee(1)

    }, [])
    return (
        <Box sx={{ bgcolor: '#FEFCFF' }} >
            <Box>
                <CssVarsProvider>
                    <Divider textAlign="left" sx={{ fontWeight: 600, mx: 2, fontSize: 18, color: '#5F093D', mt: 2, fontFamily: 'Georgia' }}>Edit SubTask</Divider>
                </CssVarsProvider>
            </Box>
            <Box sx={{ display: 'flex', bgcolor: '#FEFCFF' }}>
                <Box sx={{ flex: 1, }}>
                    <Box sx={{ py: 1, pl: 2, fontSize: 15, mt: 1.5, display: 'flex', justifyContent: 'right', mr: 1, fontFamily: 'Georgia' }}>
                        <Typography sx={{ color: '#003B73' }}>
                            Task
                        </Typography>
                    </Box>
                    <Box sx={{ mt: 2.5, pl: 2, fontSize: 15, py: .5, display: 'flex', justifyContent: 'right', mr: 1, fontFamily: 'Georgia' }}>
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
                    {/* {changeAssignee === 1 ?
                        <Box sx={{ mt: .5, pl: 2, fontSize: 15, py: .5, display: 'flex', justifyContent: 'right', mr: 1, fontFamily: 'Georgia', height: 40 }}>

                        </Box> : null} */}
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
                                minRows={2}
                                maxRows={2}
                                onChange={(e) => SubTaskUpdate(e)}
                                sx={{ fontSize: 15, color: '#05445E' }}
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

                    {changeAssignee === 0 ?
                        <Box sx={{ display: 'flex', mt: .5, mb: .2 }}>

                            <Box sx={{ flex: 1, mr: 1 }}><TextFieldCustom
                                type="text"
                                name="em_name"
                                value={em_name}
                                disabled

                            >
                            </TextFieldCustom></Box>

                            <Box sx={{ pt: .6 }}>
                                <CssVarsProvider>
                                    <Tooltip title="Change Assignees">
                                        <ChangeCircleIcon sx={{ cursor: 'pointer' }}
                                            onClick={changeEmp} />
                                    </Tooltip>
                                </CssVarsProvider>


                            </Box>
                        </Box>
                        :

                        <Box sx={{ flex: 1, mt: .3, border: .5, borderRadius: 2, borderColor: '#E4A58F' }}>
                            <CssVarsProvider>
                                <TmMultEmpSelectUnderDeptSec
                                    value={employeeSubTask}
                                    setValue={setEmployeeSubTask}
                                />
                            </CssVarsProvider>



                        </Box>}
                    {/* <Box sx={{ flex: 1, pt: .3 }}>

                        <CssVarsProvider>
                            <TmMultEmpSelectUnderDeptSec
                                value={employeeSubTask}
                                setValue={setEmployeeSubTask}
                            // setemployees={setEmpNameSubTask}
                            />
                        </CssVarsProvider>
                    </Box> */}
                    <Box sx={{ pt: .3 }}>
                        <TextFieldCustom
                            type="datetime-local"
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