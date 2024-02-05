import { Box, Textarea, } from '@mui/joy'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDepartSecemployee } from 'src/redux/actions/EmpNameDeptSect.action'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import TmMultEmpSelectUnderDeptSec from 'src/views/CommonSelectCode/TmMultEmpSelectUnderDeptSec'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const AddSubTaskEmp = ({ tm_task_slno, projectz, setflag, setTableRendering, tableRendering, tm_project_slno }) => {

    const [employeeSubTask, setEmployeeSubTask] = useState(0)
    const dispatch = useDispatch();
    const [subTaskMast, setSubTaskMast] = useState({
        tm_sub_task_slno: '',
        tm_subtask_name: '',
        tm_subtask_dept: '',
        tm_subtask_dept_sec: '',
        tm_subtask_duedate: '',
        tm_sub_completed_remarks: '',
        tm_subtask_description: '',
        tm_sub_pending_remark: '',
        tm_sub_onhold_remarks: '',
        projectz: projectz,
        tm_task_status: 0,
        main_task_slno: '',

    })
    const { tm_subtask_name, tm_subtask_duedate, tm_subtask_description, tm_sub_completed_remarks, tm_sub_pending_remark, tm_sub_onhold_remarks, tm_task_status } = subTaskMast


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

    const insertMastSubTask = useMemo(() => {
        return {
            main_task_slno: tm_task_slno,
            tm_task_name: tm_subtask_name === '' ? null : tm_subtask_name,
            tm_task_dept: empdept === 0 ? null : empdept,
            tm_task_dept_sec: empsecid === 0 ? null : empsecid,
            tm_task_due_date: tm_subtask_duedate === '' ? null : tm_subtask_duedate,
            tm_task_description: tm_subtask_description === '' ? null : tm_subtask_description,
            tm_pending_remark: tm_sub_pending_remark === '' ? null : tm_sub_pending_remark,
            tm_onhold_remarks: tm_sub_onhold_remarks === '' ? null : tm_sub_onhold_remarks,
            tm_completed_remarks: tm_sub_completed_remarks === '' ? null : tm_sub_completed_remarks,
            tm_project_slno: tm_project_slno,
            tm_task_status: tm_task_status,
            create_user: id,
        }
    }, [tm_task_slno, tm_subtask_name, empdept, empsecid, tm_subtask_duedate, tm_subtask_description, tm_task_status, tm_sub_completed_remarks, tm_sub_pending_remark,
        tm_project_slno, tm_sub_onhold_remarks, id,])



    const closeSubTask = useCallback((e) => {
        setflag(0)
    }, [setflag])
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
                    if (employeeSubTask !== 0) {
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
                                succesNotify("Subtask Created Successfully")
                                setTableRendering(tableRendering + 1)
                                closeSubTask()
                            }
                            else {
                                warningNotify(message)
                            }
                        })
                    } else {
                        succesNotify("Subtask Created Successfully")
                        setTableRendering(tableRendering + 1)
                        closeSubTask()
                    }
                }
                else {
                    warningNotify(message)
                }
            })
        } else {
            infoNotify('please enter subtask name')
        }
    }, [closeSubTask, id, insertMastSubTask, tm_subtask_name, tableRendering, setTableRendering, employeeSubTask])
    return (
        <Box>
            <Box sx={{ display: 'flex', }}>
                <Box sx={{ flex: 1, mr: 1 }}>
                    <Box sx={{ color: '#000C66', fontFamily: 'Georgia', pl: .5 }}>
                        Subtask Name*
                    </Box>
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
                </Box>
                <Box sx={{ flex: 1, mr: 1 }}>
                    <Box sx={{ color: '#000C66', fontFamily: 'Georgia', pl: .5 }}>
                        Department
                    </Box>
                    <Textarea
                        type="text"
                        size="sm"
                        variant="outlined"
                        name="secName"
                        value={secName}
                        disabled
                        minRows={2}
                        maxRows={2}></Textarea>

                </Box>
                <Box sx={{ flex: 1, mr: 1 }}>
                    <Box sx={{ color: '#000C66', fontFamily: 'Georgia', pl: .5 }}>
                        Assignee
                    </Box>
                    <TmMultEmpSelectUnderDeptSec
                        value={employeeSubTask}
                        setValue={setEmployeeSubTask}
                    />
                </Box>
                <Box sx={{ flex: 1, mr: 1 }}>
                    <Box sx={{ color: '#000C66', fontFamily: 'Georgia', pl: .5 }}>
                        Due Date
                    </Box>
                    <TextFieldCustom
                        type="datetime-local"
                        size="sm"
                        style={{ minHeight: 51 }}
                        name="tm_subtask_duedate"
                        value={tm_subtask_duedate}
                        onchange={SubTaskUpdate}
                    ></TextFieldCustom>
                </Box>
                <Box sx={{ flex: 1, mr: .5 }}>
                    <Box sx={{ color: '#000C66', fontFamily: 'Georgia', pl: .5 }}>
                        Description
                    </Box>
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
                <Box sx={{ flex: .1, pr: 1, pt: 4 }}>
                    <AddCircleOutlineIcon sx={{ fontSize: 30, cursor: 'pointer', color: '#003B73' }}
                        onClick={addSubTaskData} />
                </Box>
            </Box>
        </Box>
    )
}

export default memo(AddSubTaskEmp)