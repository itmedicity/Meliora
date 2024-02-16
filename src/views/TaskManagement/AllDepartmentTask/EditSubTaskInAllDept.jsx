import { Box, Button, CssVarsProvider, Textarea, Tooltip, Typography, } from '@mui/joy'
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

const EditSubTaskInAllDept = ({ subTaskData, tableRendering, setTableRendering, setflag }) => {

    const { tm_task_slno, tm_task_status, em_name, create_date } = subTaskData

    const [departmentSubTask, setdepartmentSubTask] = useState(0)
    const [departmentSecSubTask, setdepartmentSecSubTask] = useState(0)
    const [employeeSubTask, setEmployeeSubTask] = useState(0)
    const dispatch = useDispatch();
    const [changeAssignee, setchangeAssignee] = useState(0)
    const [empArry, setEmpArry] = useState([])
    const [subTaskMast, setSubTaskMast] = useState({
        tm_task_slno: '',
        subTaskName: '',
        subTaskDueDate: '',
        subTaskDescription: '',
        tm_task_status: tm_task_status
    })
    const { subTaskName, subTaskDueDate, subTaskDescription, } = subTaskMast

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
                                    setTableRendering(tableRendering + 1)
                                    setflag(0)
                                    reset()
                                } else {
                                    setTableRendering(tableRendering + 1)
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
                        setTableRendering(tableRendering + 1)
                        setflag(0)
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
    }, [updateSubTask, inactive, postEmpDetails, subTaskName, reset, setTableRendering, setflag, tableRendering, employeeSubTask])

    const changeEmp = useCallback((e) => {
        setchangeAssignee(1)
    }, [])

    return (

        <Box sx={{
            display: 'flex', mr: 2, ml: 1, my: 2,
            bgcolor: '#fafafa'
        }}>
            <Box sx={{ flex: 1, }}>
            </Box>
            <Box sx={{ flex: 8 }}>
                <Box sx={{ mt: .5, pt: 1 }}>
                    <Typography sx={{ color: '#003B73', fontFamily: 'Georgia', pl: .5 }}>
                        Subtask Name&nbsp;:&nbsp;
                    </Typography>
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
                <Box sx={{ display: 'flex' }}>
                    <Box sx={{ mt: .5, flex: 1, mr: 1 }}>
                        <Typography sx={{ color: '#003B73', fontFamily: 'Georgia', pl: .5 }}>
                            Department&nbsp;:&nbsp;
                        </Typography>
                        <TmDepartmentSelectSubTask
                            departmentSub={departmentSubTask}
                            setDepartmentSub={setdepartmentSubTask}
                        />
                    </Box>
                    <Box sx={{ mt: .5, flex: 1 }}>
                        <Typography sx={{ color: '#003B73', fontFamily: 'Georgia' }}>
                            Section&nbsp;:&nbsp;
                        </Typography>
                        <TmDeptSectionSubtask
                            deptsecSub={departmentSecSubTask}
                            setDeptSecSub={setdepartmentSecSubTask}
                        />
                    </Box>
                </Box>

                {changeAssignee === 0 ?

                    <Box sx={{ mt: 1 }}>
                        <Typography sx={{ color: '#003B73', fontFamily: 'Georgia', pl: .5 }}>
                            Assignee&nbsp;:&nbsp;
                        </Typography>
                        <Box sx={{ display: 'flex', mb: .2 }}>

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
                    </Box>
                    :
                    <Box sx={{ mt: 1 }}>
                        <Typography sx={{ color: '#003B73', fontFamily: 'Georgia', pl: .5 }}>
                            Assignee&nbsp;:&nbsp;
                        </Typography>
                        <Box sx={{ flex: 1, border: .5, borderRadius: 2, borderColor: '#E4A58F' }}>
                            <CssVarsProvider>
                                <TmMultEmpSelectUnderDeptSec
                                    value={employeeSubTask}
                                    setValue={setEmployeeSubTask}
                                />
                            </CssVarsProvider>
                        </Box>
                    </Box>}

                <Box sx={{ display: 'flex' }}>

                    <Box sx={{ mt: .5, flex: 1, mr: 1 }}>
                        <Typography sx={{ color: '#003B73', fontFamily: 'Georgia', pl: .5 }}>
                            Created date&nbsp;:&nbsp;
                        </Typography>

                        <TextFieldCustom
                            type="text"
                            name="create_date"
                            value={create_date}
                            disabled
                        >
                        </TextFieldCustom>
                    </Box>
                    <Box sx={{ mt: .5, flex: 1 }}>
                        <Typography sx={{ color: '#003B73', fontFamily: 'Georgia', pl: .5 }}>
                            Due date&nbsp;:&nbsp;
                        </Typography>
                        <TextFieldCustom
                            type="datetime-local"
                            size="sm"
                            style={{ Height: 10 }}
                            name="subTaskDueDate"
                            value={subTaskDueDate}
                            onchange={SubTaskUpdate}
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
                        minRows={3}
                        maxRows={4}
                        name="subTaskDescription"
                        value={subTaskDescription}
                        onChange={(e) => SubTaskUpdate(e)}
                    >
                    </Textarea>
                </Box>
                <Box sx={{ my: 1, display: 'flex' }} >
                    <Box sx={{ flex: 1 }}></Box>
                    <Box sx={{ flex: 1 }}>
                        <Button sx={{ width: 200 }}
                            variant="soft"
                            onClick={SubmitTask}
                        >
                            +update subtask
                        </Button>
                    </Box>
                    <Box sx={{ flex: 1 }}></Box>
                </Box>
            </Box>
            <Box sx={{ flex: 1, }}></Box>
        </Box>
    )
}

export default memo(EditSubTaskInAllDept)