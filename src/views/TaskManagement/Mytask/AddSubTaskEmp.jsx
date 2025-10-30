import { Box, Button, Textarea, Tooltip, Typography } from '@mui/joy'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDepartSecemployee } from 'src/redux/actions/EmpNameDeptSect.action'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import TmMultEmpSelectUnderDeptSec from 'src/views/CommonSelectCode/TmMultEmpSelectUnderDeptSec'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import moment from 'moment'
import { useQueryClient } from '@tanstack/react-query'
import { taskColor } from 'src/color/Color'

const AddSubTaskEmp = ({ tm_task_slno, projectz, setflag, tm_project_slno, tm_task_due_date, }) => {

  const [employeeSubTask, setEmployeeSubTask] = useState([])
  const dispatch = useDispatch();
  const queryClient = useQueryClient()

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
    tm_complete_date: ''
  })

  const { tm_subtask_name, tm_subtask_duedate, tm_subtask_description, tm_sub_completed_remarks, tm_sub_pending_remark, tm_sub_onhold_remarks, tm_task_status,
    tm_complete_date } = subTaskMast

  const Refresh = useCallback(() => {
    const resetdata = {
      tm_sub_task_slno: '',
      tm_subtask_name: '',
      tm_subtask_dept: '',
      tm_subtask_dept_sec: '',
      tm_subtask_duedate: '',
      tm_sub_completed_remarks: '',
      tm_subtask_description: '',
      tm_sub_pending_remark: '',
      tm_sub_onhold_remarks: '',
      projectz: 0,
      tm_task_status: 0,
      main_task_slno: '',
      tm_complete_date: ''
    };
    setEmployeeSubTask([])
    setSubTaskMast(resetdata);
  }, []);

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
      tm_complete_date: tm_complete_date === '' ? null : tm_complete_date,
      create_user: id,
    }
  }, [tm_task_slno, tm_subtask_name, empdept, empsecid, tm_subtask_duedate, tm_subtask_description, tm_task_status, tm_sub_completed_remarks, tm_sub_pending_remark,
    tm_project_slno, tm_sub_onhold_remarks, tm_complete_date, id,])

  const closeSubTask = useCallback(() => {
    setflag(0)
    Refresh()
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

    if ((tm_subtask_name !== '') && (employeeSubTask !== 0) && (tm_subtask_duedate !== '')) {
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
                queryClient.invalidateQueries({
                  queryKey: ['getAllSubTaskUnderTask'],
                  exact: false,
                });
                queryClient.invalidateQueries({
                  queryKey: ['getIncompletedAllTaskUnderDepartment'],
                  exact: false,
                });
                queryClient.invalidateQueries({
                  queryKey: ['getEmpAllTasksList'],
                  exact: false,
                });



                closeSubTask()
              }
              else {
                warningNotify(message)
              }
            })
          } else {
            succesNotify("Subtask Created Successfully")
            queryClient.invalidateQueries({
              queryKey: ['getAllSubTaskUnderTask'],
              exact: false,
            });
            queryClient.invalidateQueries({
              queryKey: ['getEmpAllTasksList'],
              exact: false,
            });
            queryClient.invalidateQueries({
              queryKey: ['getIncompletedAllTaskUnderDepartment'],
              exact: false,
            });

            closeSubTask()
          }
        }
        else {
          warningNotify(message)
        }
      })
    } else {
      infoNotify('please fill mandatory fields  while adding subtask')
    }
  }, [closeSubTask, id, insertMastSubTask, tm_subtask_name, queryClient, employeeSubTask, tm_subtask_duedate])


  return (
    <Box sx={{ m: 1 }}>

      <Box sx={{ flex: 1, mr: 1 }}>
        <Box sx={{ color: '#000C66', fontFamily: 'Georgia', pl: .5, display: 'flex' }}>
          Subtask Name<Typography sx={{ color: '#B32800' }}>*</Typography>
        </Box>
        <Textarea
          type="text"
          size="sm"
          placeholder="Subtask Name"
          variant="outlined"
          name="tm_subtask_name"
          value={tm_subtask_name}
          minRows={2}
          maxRows={5}
          onChange={(e) => SubTaskUpdate(e)}
        ></Textarea>
      </Box>

      <Box sx={{ flex: 1, display: 'flex', pt: 1 }}>
        <Box sx={{ width: 220, mr: 1 }}>
          <Box sx={{ color: '#000C66', fontFamily: 'Georgia', pl: .5, display: 'flex' }}>
            Due Date<Typography sx={{ color: '#B32800' }}>*</Typography>
          </Box>
          <Tooltip sx={{ width: 200 }} color='neutral' title={tm_task_due_date && moment(new Date()).isAfter(moment(new Date(tm_task_due_date))) ?
            'Cannot add a due date. The main task due date has already passed. Please update the main task due date.' : ''}>
            <Box sx={{ flex: 1 }}>
              <TextFieldCustom
                type="datetime-local"
                size="sm"
                name="tm_subtask_duedate"
                value={tm_subtask_duedate}
                onchange={SubTaskUpdate}
                slotProps={{
                  input: {
                    min: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                    max: moment(new Date(tm_task_due_date)).format('YYYY-MM-DD HH:mm:ss'),
                  },
                }}
                style={{ minHeight: 55 }}
                disabled={tm_task_due_date && moment(new Date()).isAfter(moment(new Date(tm_task_due_date)))}
              ></TextFieldCustom>
            </Box>
          </Tooltip>
        </Box>
        <Box sx={{ mr: 1, flex: 1, }}>
          <Box sx={{ color: '#000C66', fontFamily: 'Georgia', pl: .5, display: 'flex' }}>
            Assignee<Typography sx={{ color: '#B32800' }}>*</Typography>
          </Box>
          <TmMultEmpSelectUnderDeptSec
            value={employeeSubTask}
            setValue={setEmployeeSubTask}
          />
        </Box>
      </Box>

      <Box sx={{ flex: 1, mr: 1, pt: 1 }}>
        <Box sx={{ color: '#000C66', fontFamily: 'Georgia', pl: .5 }}>
          Description
        </Box>
        <Textarea
          type="text"
          size="sm"
          placeholder="type here..."
          variant="outlined"
          minRows={2}
          maxRows={5}
          name="tm_subtask_description"
          value={tm_subtask_description}
          onChange={(e) => SubTaskUpdate(e)}
        >
        </Textarea>
      </Box>


      <Box sx={{ display: 'flex' }}>
        <Button style={{
          backgroundColor: taskColor.darkPurple,
          m: 1,
          '&:hover': {
            opacity: 10,
            backgroundColor: taskColor.purple,
          }
        }} size='sm' sx={{ my: 1 }} onClick={addSubTaskData}>
          Add
        </Button>
        <Button
          size='sm' sx={{
            my: 1, ml: .5,
            backgroundColor: taskColor.darkPurple,
            '&:hover': {
              opacity: 10,
              backgroundColor: taskColor.purple,
            }
          }
          } onClick={Refresh}>
          Refresh
        </Button>

      </Box>



    </Box >
  )
}

export default memo(AddSubTaskEmp)