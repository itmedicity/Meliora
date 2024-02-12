import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { Box, CssVarsProvider, Textarea, Typography, Button } from '@mui/joy'
import { useDispatch, useSelector } from 'react-redux'
import { getDepartmentSubTask } from 'src/redux/actions/TmDepartment.action'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import TmDepartmentSelectSubTask from 'src/views/CommonSelectCode/TmDepartmentSelectSubTask'
import TmDeptSectionSubtask from 'src/views/CommonSelectCode/TmDeptSectionSubtask'
import TmMultEmpSelectUnderDeptSec from 'src/views/CommonSelectCode/TmMultEmpSelectUnderDeptSec'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'

const AddSubTaskUnderAllDept = ({ tm_task_slno, tm_project_slno, setflag, tableRendering, setTableRendering }) => {

    const [departmentSubTask, setdepartmentSubTask] = useState(0)
    const [departmentSecSubTask, setdepartmentSecSubTask] = useState(0)
    const [employeeSubTask, setEmployeeSubTask] = useState([])
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
        tm_task_status: 0,
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
            tm_task_status: tm_task_status,
            tm_project_slno: tm_project_slno,
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
        tm_project_slno,
        id,
    ])

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
        if (tm_subtask_name !== '') {
            InsertMastSubTask(insertMastSubTask).then((value) => {
                const { message, success, insertId } = value
                if (success === 1) {
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
                                succesNotify("SubTask Created Successfully")
                                setTableRendering(tableRendering + 1)
                                setflag(0)
                            }
                            else {
                                warningNotify(message)
                            }
                        })
                    }
                    // No employee assined
                    else {
                        succesNotify("SubTask Created Successfully")
                        setTableRendering(tableRendering + 1)
                        setflag(0)
                    }
                }
                else {
                    warningNotify(message)
                }
            })
        } else {
            infoNotify('please enter task name')
        }
    }, [insertMastSubTask, id,
        setflag,
        setTableRendering, tableRendering,
        tm_subtask_name, employeeSubTask,
    ])

    return (
        <Box sx={{
            display: 'flex',
            // mr: 2, ml: 2, my: 2,
            mr: 1,
            // borderRadius: 3,
            // boxShadow: '.5px 1px 4px #887BB0',
            // padding: '1em',
            bgcolor: '#fafafa'

        }}>
            <Box sx={{ flex: 1, }}>
                {/* <Box sx={{ pt: 2, pl: 2, fontSize: 18, mt: 1.2, display: 'flex', justifyContent: 'right', mr: 1 }}>
                    <Typography sx={{ color: '#003B73', fontFamily: 'Georgia' }}>
                        Task Name&nbsp;:&nbsp;
                    </Typography>
                </Box>
                <Box sx={{ pt: 1, pl: 2, fontSize: 18, mt: 2.5, display: 'flex', justifyContent: 'right', mr: 1 }}>
                    <Typography sx={{ color: '#003B73', fontFamily: 'Georgia' }}>
                        Department&nbsp;:&nbsp;
                    </Typography>
                </Box>
                <Box sx={{ pt: 1.2, pl: 2, fontSize: 18, display: 'flex', justifyContent: 'right', mr: 1 }}>
                    <Typography sx={{ color: '#003B73', fontFamily: 'Georgia' }}>
                        Section&nbsp;:&nbsp;
                    </Typography>
                </Box>
                <Box sx={{ mt: .5, pl: 2, pt: 1.5, fontSize: 18, display: 'flex', justifyContent: 'right', mr: 1 }}>
                    <Typography sx={{ color: '#003B73', fontFamily: 'Georgia' }}>
                        Assignee&nbsp;:&nbsp;
                    </Typography>
                </Box>
                <Box sx={{ pl: 2, fontSize: 18, mt: 3, display: 'flex', justifyContent: 'right', mr: 1 }}>
                    <Typography sx={{ color: '#003B73', fontFamily: 'Georgia' }}>
                        Due date&nbsp;:&nbsp;
                    </Typography>
                </Box>
                <Box sx={{ pl: 2, fontSize: 18, mt: 1, display: 'flex', justifyContent: 'right', mr: 1 }}>
                    <Typography sx={{ color: '#003B73', fontFamily: 'Georgia' }}>
                        Description&nbsp;:&nbsp;
                    </Typography>
                </Box> */}
            </Box>
            <Box sx={{
                flex: 8, p: 2,
                // border: 1,
                borderRadius: 1,
                // borderStyle: 'dashed',
                // boxShadow: '1px 1px 4px #887BB0',
                borderColor: '#887BB0',

            }}>
                <Box sx={{}}>
                    <Typography sx={{ color: '#003B73', fontFamily: 'Georgia' }}>
                        Subtask Name&nbsp;:&nbsp;
                    </Typography>
                    <CssVarsProvider>
                        <Textarea
                            type="text"
                            size="sm"
                            placeholder="Subtask Name"
                            variant="outlined"
                            name="tm_subtask_name"
                            value={tm_subtask_name}
                            minRows={2}
                            maxRows={2}
                            onChange={(e) => SubTaskUpdate(e)}
                        ></Textarea>
                    </CssVarsProvider>
                </Box>

                <Box sx={{ display: 'flex', mt: .5 }}>
                    <Box sx={{ mt: .5, flex: 1, mr: .5 }}>
                        <Typography sx={{ color: '#003B73', fontFamily: 'Georgia' }}>
                            Department&nbsp;:&nbsp;
                        </Typography>
                        <TmDepartmentSelectSubTask
                            departmentSub={departmentSubTask}
                            setDepartmentSub={setdepartmentSubTask}
                        />
                    </Box>
                    <Box sx={{ mt: .5, flex: 1, }}>
                        <Typography sx={{ color: '#003B73', fontFamily: 'Georgia' }}>
                            Section&nbsp;:&nbsp;
                        </Typography>
                        <TmDeptSectionSubtask
                            deptsecSub={departmentSecSubTask}
                            setDeptSecSub={setdepartmentSecSubTask}
                        />
                    </Box>
                </Box>
                {/* <Box sx={{ mt: .5 }}>
                    <TmDepartmentSelectSubTask
                        departmentSub={departmentSubTask}
                        setDepartmentSub={setdepartmentSubTask}
                    />
                </Box>
                <Box sx={{ mt: .5 }}>
                    <TmDeptSectionSubtask
                        deptsecSub={departmentSecSubTask}
                        setDeptSecSub={setdepartmentSecSubTask}
                    />
                </Box> */}
                <Box sx={{ mt: 1, }}>
                    <Typography sx={{ color: '#003B73', fontFamily: 'Georgia' }}>
                        Assignee&nbsp;:&nbsp;
                    </Typography>
                    <TmMultEmpSelectUnderDeptSec
                        value={employeeSubTask}
                        setValue={setEmployeeSubTask}
                    />
                </Box>
                <Box sx={{ mt: 1 }}>
                    <Typography sx={{ color: '#003B73', fontFamily: 'Georgia' }}>
                        Due date&nbsp;:&nbsp;
                    </Typography>
                    <TextFieldCustom
                        type="datetime-local"
                        size="sm"
                        style={{ minHeight: 51 }}
                        name="tm_subtask_duedate"
                        value={tm_subtask_duedate}
                        onchange={SubTaskUpdate}
                    ></TextFieldCustom>
                </Box>
                <Box sx={{ mt: 1 }}>
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
                        name="tm_subtask_description"
                        value={tm_subtask_description}
                        onChange={(e) => SubTaskUpdate(e)}
                    >
                    </Textarea>
                </Box>
                <Box sx={{ my: 1, display: 'flex' }} >
                    <Box sx={{ flex: 1 }}></Box>
                    <Box sx={{ flex: 1 }}>
                        <Button sx={{ width: 200 }}
                            variant="soft"
                            onClick={addSubTaskData}
                        >
                            +add subtask
                        </Button>
                    </Box>
                    <Box sx={{ flex: 1 }}></Box>
                </Box>
            </Box>
            <Box sx={{ flex: 1, }}></Box>
        </Box>
    )
}

export default memo(AddSubTaskUnderAllDept)