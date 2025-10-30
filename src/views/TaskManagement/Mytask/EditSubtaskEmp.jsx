import { Box, Button, Textarea, Tooltip, Typography } from '@mui/joy'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import TmMultEmpSelectUnderDeptSec from 'src/views/CommonSelectCode/TmMultEmpSelectUnderDeptSec'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import { useDispatch, useSelector } from 'react-redux';
import { axioslogin } from 'src/views/Axios/Axios';
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode';
import { getDepartSecemployee } from 'src/redux/actions/EmpNameDeptSect.action';
import CusCheckBox from 'src/views/Components/CusCheckBox';
import SubTaskProgressTable from './SubTaskProgressTable';
import moment from 'moment';
import AutoDeleteTwoToneIcon from '@mui/icons-material/AutoDeleteTwoTone';
import DueDateModal from '../ModalComponent/DueDateModal';
import { useQueryClient } from '@tanstack/react-query';
import { taskColor } from 'src/color/Color';
import AddIcon from '@mui/icons-material/Add';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';

const EditSubtaskEmp = ({ subTaskData, setflag, tm_task_due_date }) => {

  const { tm_task_slno, tm_task_status, tm_pending_remark, tm_onhold_remarks, tm_completed_remarks, tm_project_slno, main_task_slno, create_date,
    tm_mast_duedate_count, tm_assigne_emp } = subTaskData

  const queryClient = useQueryClient()
  const [employeeSubTask, setEmployeeSubTask] = useState(tm_assigne_emp || [])
  const dispatch = useDispatch();
  const [empArry, setEmpArry] = useState([])
  const [tabledataProgress, setTableDataProgress] = useState([])
  const [progressCountSub, setprogressCountSub] = useState(0)
  const [completedSub, setCompletedSub] = useState(tm_task_status === 1 ? true : tm_task_status === 2 ? false : tm_task_status === 3 ? false : tm_task_status === 4 ? false : false)
  const [onProgressSub, setOnProgressSub] = useState(tm_task_status === 2 ? true : tm_task_status === 1 ? false : tm_task_status === 3 ? false : tm_task_status === 4 ? false : false)
  const [onHoldSub, setOnHoldSub] = useState(tm_task_status === 3 ? true : tm_task_status === 1 ? false : tm_task_status === 2 ? false : tm_task_status === 4 ? false : false)
  const [onPendingSub, setOnPendingSub] = useState(tm_task_status === 4 ? true : tm_task_status === 1 ? false : tm_task_status === 2 ? false : tm_task_status === 3 ? false : false)
  const [checkFlagSub, setcheckFlagSub] = useState(tm_task_status)
  const [valueSubProgress, setvalueSubProgress] = useState(0)
  const [countDue, setcountDue] = useState(0)
  const [checksubtaskdue, setchecksubtaskdue] = useState('')
  const [subTaskMast, setSubTaskMastEdit] = useState({
    tm_task_slno: '',
    subTaskName: '',
    subTaskDueDate: '',
    subTaskDescription: '',
    onholdremarksSub: '',
    completedremarksSub: '',
    pendingremarkSub: '',
  })
  const { subTaskName, subTaskDueDate, subTaskDescription, onholdremarksSub, completedremarksSub, pendingremarkSub } = subTaskMast
  const [dueDateModalFlag, setdueDateModalFlag] = useState(0)
  const [dueDateModal, setdueDateModal] = useState(false)
  const [dueDates, setdueDates] = useState([])
  let newDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
  const ChangeCompletedSub = useCallback((e) => {
    if (e.target.checked === true) {
      setCompletedSub(true)
      setOnProgressSub(false)
      setOnHoldSub(false)
      setOnPendingSub(false)
      setcheckFlagSub(1)
    }
    else {
      setCompletedSub(false)
      setOnProgressSub(false)
      setOnHoldSub(false)
      setOnPendingSub(false)
      setcheckFlagSub(0)
    }
  }, [])
  const ChangeOnProgressSub = useCallback((e) => {
    if (e.target.checked === true) {
      setCompletedSub(false)
      setOnProgressSub(true)
      setOnHoldSub(false)
      setOnPendingSub(false)
      setcheckFlagSub(2)
    }
    else {
      setCompletedSub(false)
      setOnProgressSub(false)
      setOnHoldSub(false)
      setOnPendingSub(false)
      setcheckFlagSub(0)
    }
  }, [])
  const ChangeOnHoldSub = useCallback((e) => {
    if (e.target.checked === true) {
      setCompletedSub(false)
      setOnHoldSub(true)
      setOnProgressSub(false)
      setOnPendingSub(false)
      setcheckFlagSub(3)
    }
    else {
      setCompletedSub(false)
      setOnProgressSub(false)
      setOnHoldSub(false)
      setOnPendingSub(false)
      setcheckFlagSub(0)
    }
  }, [])

  const ChangeOnPendingSub = useCallback((e) => {
    if (e.target.checked === true) {
      setCompletedSub(false)
      setOnProgressSub(false)
      setOnHoldSub(false)
      setOnPendingSub(true)
      setcheckFlagSub(4)
    }
    else {
      setCompletedSub(false)
      setOnProgressSub(false)
      setOnHoldSub(false)
      setOnPendingSub(false)
      setcheckFlagSub(0)
    }
  }, [])

  const SubTaskUpdate = useCallback(
    (e) => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setSubTaskMastEdit({ ...subTaskMast, [e.target.name]: value })
    },
    [subTaskMast],
  )
  const id = useSelector((state) => {
    return state.LoginUserData.empid
  })

  const postSubtaskEmpDetails = Array.isArray(employeeSubTask)
    ? employeeSubTask.map((val) => ({
      tm_task_slno: tm_task_slno,
      tm_assigne_emp: val,
      tm_detail_status: 1,
      tm_detl_create: id,
    }))
    : [];

  const inactive = Array.isArray(empArry)
    ? empArry.map((val) => ({
      tm_task_slno: tm_task_slno,
      tm_assigne_emp: val.tm_assigne_emp,
    }))
    : [];


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
    const getDueCount = async () => {
      const result = await axioslogin.get(`/TmAllDeptTask/getDuedateCount/${1}`);
      const { data } = result.data;
      if (data.length !== 0) {
        const { tm_duedate_count } = data[0]
        setcountDue(tm_duedate_count)
      }
      else {
        setcountDue(0)
      }
    }
    getDueCount()
  }, [])

  useEffect(() => {
    const getSubTask = async (tm_task_slno) => {
      const result = await axioslogin.get(`/taskManagement/subtaskviewByidForEdit/${tm_task_slno}`);
      const { success, data } = result.data;
      if (success === 2) {
        const { tm_task_name, tm_task_due_date, tm_task_description, tm_task_status } = data[0]
        setchecksubtaskdue(tm_task_due_date)
        const formdata = {
          tm_task_slno: tm_task_slno,
          subTaskName: tm_task_name,
          subTaskDueDate: tm_task_due_date,
          subTaskDescription: (tm_task_description ? tm_task_description : ''),
          onholdremarksSub: (tm_onhold_remarks ? tm_onhold_remarks : ''),
          completedremarksSub: (tm_completed_remarks ? tm_completed_remarks : ''),
          pendingremarkSub: (tm_pending_remark ? tm_pending_remark : ''),
        }
        setSubTaskMastEdit(formdata)
        setCompletedSub(tm_task_status === 1 ? true : false)
        setOnProgressSub(tm_task_status === 2 ? true : false)
        setOnHoldSub(tm_task_status === 3 ? true : false)
        setOnPendingSub(tm_task_status === 4 ? true : false)
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
  }, [tm_task_slno, dispatch, tm_completed_remarks, tm_onhold_remarks, tm_pending_remark, id])


  const updateSubTask = useMemo(() => {
    return {
      tm_task_slno: tm_task_slno,
      tm_task_name: subTaskName === '' ? null : subTaskName,
      tm_task_due_date: subTaskDueDate === '' ? null : subTaskDueDate,
      tm_task_description: subTaskDescription === '' ? null : subTaskDescription,
      tm_task_dept: empdept === 0 ? null : empdept,
      tm_task_dept_sec: empsecid === 0 ? null : empsecid,
      tm_pending_remark: pendingremarkSub === '' ? null : pendingremarkSub,
      tm_onhold_remarks: onholdremarksSub === '' ? null : onholdremarksSub,
      tm_completed_remarks: completedremarksSub === '' ? null : completedremarksSub,
      tm_complete_date: completedSub === true ? newDate : null,
      tm_project_slno: tm_project_slno,
      main_task_slno: main_task_slno,
      tm_task_status: checkFlagSub,
      tm_mast_duedate_count: (checksubtaskdue !== subTaskDueDate) ? tm_mast_duedate_count + 1 : tm_mast_duedate_count,
      edit_user: id
    }
  }, [tm_task_slno, subTaskName, subTaskDueDate, subTaskDescription, empdept, empsecid, checkFlagSub, completedremarksSub, main_task_slno, completedSub, newDate,
    pendingremarkSub, tm_project_slno, onholdremarksSub, checksubtaskdue, tm_mast_duedate_count, id])

  const reset = useCallback(() => {
    const frmdata = {
      tm_task_slno: '',
      subTaskName: '',
      subTaskDueDate: '',
      subTaskDescription: '',
      onholdremarksSub: '',
      completedremarksSub: '',
      pendingremarkSub: '',
    }
    setSubTaskMastEdit(frmdata)
    setEmployeeSubTask([])
    setOnProgressSub(false)
    setCompletedSub(false)
    setflag(0)
  }, [setSubTaskMastEdit, setEmployeeSubTask, setCompletedSub, setOnProgressSub, setflag]);

  const [taskProgressSub, setTaskProgressSub] = useState({
    progress_slno: '',
    tm_task_slno: tm_task_slno,
    tm_task_status: checkFlagSub,
    tm_progres_date: '',
    progress_emp: id,
    tm_task_progress: ''
  })
  const { progress_slno, tm_progres_date, tm_task_progress } = taskProgressSub

  const ProgresssUpdateSub = useCallback(
    (e) => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setTaskProgressSub({ ...taskProgressSub, [e.target.name]: value })
    },
    [taskProgressSub],
  )
  const postProgressSub = useMemo(() => {
    return {
      tm_task_slno: tm_task_slno,
      tm_task_status: checkFlagSub,
      tm_progres_date: tm_progres_date === '' ? null : tm_progres_date,
      progress_emp: id,
      main_task_slno: main_task_slno,
      tm_task_progress: tm_task_progress === '' ? null : tm_task_progress,
    }
  }, [tm_task_slno, checkFlagSub, tm_progres_date, tm_task_progress, main_task_slno, id])

  const patchProgressSub = useMemo(() => {
    return {
      progress_slno: progress_slno,
      tm_task_slno: tm_task_slno,
      tm_task_status: checkFlagSub,
      tm_progres_date: tm_progres_date === '' ? null : tm_progres_date,
      progress_emp: id,
      tm_task_progress: tm_task_progress,
    }
  }, [progress_slno, tm_task_slno, checkFlagSub, tm_progres_date, tm_task_progress, id])

  const ProgressDataSub = useMemo(() => {
    return {
      tm_task_slno: tm_task_slno
    }
  }, [tm_task_slno])

  useEffect(() => {
    const getProgress = async () => {
      const result = await axioslogin.post('/taskManagement/viewSubProgress', ProgressDataSub);
      const { success, data } = result.data;
      if (data.length !== 0) {
        if (success === 2) {
          const arry = data?.map((val) => {
            const obj = {
              progress_slno: val.progress_slno,
              tm_task_slno: val.tm_task_slno,
              tm_task_status: val.tm_task_status,
              tm_progres_date: val.tm_progres_date,
              em_name: val.em_name,
              tm_task_progress: val.tm_task_progress
            }
            return obj
          })
          setTableDataProgress(arry)
        } else {
          setTableDataProgress([])
          warningNotify('error occured')
        }
      }
    }
    getProgress(ProgressDataSub)
  }, [progressCountSub, ProgressDataSub])

  const resetProgressSub = () => {
    const form = {
      progress_slno: '',
      tm_progres_date: '',
      tm_task_progress: '',
    }
    setTaskProgressSub(form)
  }
  const InsertProgressSub = useCallback((e) => {
    e.preventDefault()
    if (tm_progres_date !== '') {
      const InsertMastProgress = async (postProgressSub) => {
        const result = await axioslogin.post('/taskManagement/insertProgress', postProgressSub)
        const { message, success } = result.data
        if (success === 1) {
          succesNotify(message)
          setprogressCountSub(progressCountSub + 1)
          resetProgressSub()
        } else if (success === 0) {
          infoNotify(message)
        } else {
          infoNotify(message)
        }
      }
      InsertMastProgress(postProgressSub)
    } else {
      infoNotify('Please Select Date For Entering Task Progress')
    }
  }, [postProgressSub, progressCountSub, tm_progres_date,])
  const rowSelectSubProgress = useCallback((data) => {
    setvalueSubProgress(1)
    const {
      progress_slno,
      tm_task_slno,
      tm_task_status,
      tm_progres_date,
      progress_emp,
      tm_task_progress
    } = data

    const frmdata = {
      progress_slno: progress_slno,
      tm_task_slno: tm_task_slno,
      tm_task_status: tm_task_status,
      tm_progres_date: tm_progres_date === '' ? null : tm_progres_date,
      progress_emp: progress_emp,
      tm_task_progress: tm_task_progress === '' ? null : tm_task_progress
    }
    setTaskProgressSub(frmdata)
  }, [])
  const UpdateProgressSub = useCallback((e) => {
    e.preventDefault()
    if (tm_progres_date !== '') {
      const UpdateProgressMast = async (patchProgress) => {
        const result = await axioslogin.patch('/taskManagement/updateProgress', patchProgress)
        const { message, success } = result.data
        if (success === 2) {
          succesNotify(message)
          setprogressCountSub(progressCountSub + 1)

          resetProgressSub()
          setvalueSubProgress(0)
        } else if (success === 0) {
          infoNotify(message)
        } else {
          infoNotify(message)
        }
      }
      UpdateProgressMast(patchProgressSub)
    } else {
      infoNotify('Please Select Date For Entering Task Progress')
    }
  }, [patchProgressSub, progressCountSub, tm_progres_date,])



  const SubmitTask = useCallback(async (e) => {
    e.preventDefault();

    if (!subTaskName) {
      infoNotify("Please fill mandatory fields while editing subtask");
      return;
    }

    const remarksMissing =
      (completedSub && !completedremarksSub) ||
      (onHoldSub && !onholdremarksSub) ||
      (onPendingSub && !pendingremarkSub);

    if (remarksMissing) {
      infoNotify("Please enter remarks");
      return;
    }

    try {
      const { message: updateMsg, success: updateSuccess } =
        await axioslogin.patch("/taskManagement/updateSubTask", updateSubTask).then(res => res.data);

      if (updateSuccess !== 2) {
        warningNotify(updateMsg);
        return;
      }

      if (postSubtaskEmpDetails.length > 0 && employeeSubTask.length > 0) {
        const { message: inactiveMsg, success: inactiveSuccess } =
          await axioslogin.post("/taskManagement/employeeInactive", inactive).then(res => res.data);
        if (inactiveSuccess === 1) {
          const { message: detailMsg, success: detailSuccess } =
            await axioslogin.post("/taskManagement/insertSubtaskDetail", postSubtaskEmpDetails).then(res => res.data);
          succesNotify(detailSuccess === 1 ? detailMsg : inactiveMsg);
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
        } else {
          const { message: detailMsg, success: detailSuccess } =
            await axioslogin.post("/taskManagement/insertSubtaskDetail", postSubtaskEmpDetails).then(res => res.data);
          succesNotify(detailSuccess === 1 ? detailMsg : null);
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
        }
      } else {
        const { message: detailMsg, success: detailSuccess } =
          await axioslogin.post("/taskManagement/insertSubtaskDetail", postSubtaskEmpDetails).then(res => res.data);
        succesNotify(detailSuccess === 1 ? detailMsg : null);
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
      }

      queryClient.invalidateQueries("getAllSubtaskUnderTask");
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
      reset();
    } catch (err) {
      warningNotify("Something went wrong");
    }
  }, [
    subTaskName,
    updateSubTask,
    postSubtaskEmpDetails,
    employeeSubTask,
    inactive,
    completedSub,
    onHoldSub,
    onPendingSub,
    completedremarksSub,
    onholdremarksSub,
    pendingremarkSub,
    queryClient,
    reset,
  ]);

  const getAllDueDates = useCallback(() => {
    const getDueDate = async () => {
      const result = await axioslogin.get(`/taskManagement/getAllDueDates/${tm_task_slno}`)
      const { success, data } = result.data;
      if (success === 2) {
        if (data.length > 1) {
          setdueDates(data)
          setdueDateModalFlag(1)
          setdueDateModal(true)
        } else if (data.length === 1) {
          infoNotify('Duedate is not extended')
        } else if (data.length === 0) {
          infoNotify('Duedate is not extended')
        }
      }
    }
    getDueDate()
  }, [tm_task_slno])

  return (
    <Box>
      <Box>
        {dueDateModalFlag === 1 ?
          <DueDateModal dueDateModal={dueDateModal} taskName={subTaskName} dueDates={dueDates} setdueDateModalFlag={setdueDateModalFlag}
            setdueDateModal={setdueDateModal} tm_task_due_date={subTaskDueDate} create_date={create_date} />
          : null}
      </Box>

      <Box sx={{ flex: 1, mr: 1 }}>
        <Box sx={{ color: '#000C66', fontFamily: 'Georgia', pl: .5, display: 'flex' }}>
          Subtask Name<Typography sx={{ color: '#B32800' }}>*</Typography>
        </Box>
        <Textarea
          type="text"
          size="sm"
          placeholder="Subtask Name"
          variant="outlined"
          name="subTaskName"
          value={subTaskName}
          minRows={2}
          maxRows={5}
          onChange={(e) => SubTaskUpdate(e)}
        ></Textarea>
      </Box>

      <Box sx={{ flex: 1, display: 'flex', pt: 1 }}>
        <Box sx={{ width: 220, mr: .5 }}>
          <Box sx={{ color: '#000C66', fontFamily: 'Georgia', pl: .5, display: 'flex' }}>
            Due Date<Typography sx={{ color: '#B32800' }}>*</Typography>
          </Box>
          <Tooltip color="warning" title={tm_mast_duedate_count >= countDue ? 'Cant Change Duedate, Change Limit Exceeded' : ''}>
            <Box sx={{ flex: 1 }}>
              <Tooltip sx={{ width: 300 }} color='neutral' title={tm_task_due_date && moment(new Date()).isAfter(moment(new Date(tm_task_due_date))) ?
                'Cannot add a due date. The main task due date has already passed. Please update the main task due date.' : ''}>
                <Box sx={{ flex: 1 }}>
                  <TextFieldCustom
                    type="datetime-local"
                    size="sm"
                    name="subTaskDueDate"
                    value={subTaskDueDate}
                    onchange={SubTaskUpdate}
                    slotProps={{
                      input: {
                        min: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                        max: moment(new Date(tm_task_due_date)).format('YYYY-MM-DD HH:mm:ss'),
                      },
                    }}
                    style={{ minHeight: 55 }}
                    disabled={tm_mast_duedate_count >= countDue || tm_task_due_date && moment(new Date()).isAfter(moment(new Date(tm_task_due_date)))}
                  ></TextFieldCustom>
                </Box>
              </Tooltip>
            </Box>
          </Tooltip>

        </Box>
        <Box sx={{ mt: 1, pt: 4, pr: 2 }}>
          <Tooltip title={'Changed Duedates'}>
            <AutoDeleteTwoToneIcon sx={{ color: '#391306', cursor: 'pointer', }} onClick={getAllDueDates} />
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
          name="subTaskDescription"
          value={subTaskDescription}
          onChange={(e) => SubTaskUpdate(e)}
        >
        </Textarea>
      </Box>


      <Box sx={{ display: 'flex', mt: 1.5 }}>
        <Box sx={{ pl: 1, pr: .5, display: 'flex', flexDirection: 'column', gap: 1 }}>

          <CusCheckBox
            color="primary"
            size="lg"
            name="completedSub"
            value={completedSub}
            checked={completedSub}
            onCheked={ChangeCompletedSub}
          ></CusCheckBox>


          <CusCheckBox
            color="primary"
            size="lg"
            name="onProgressSub"
            value={onProgressSub}
            checked={onProgressSub}
            onCheked={ChangeOnProgressSub}
          ></CusCheckBox>


          <CusCheckBox
            color="primary"
            size="lg"
            name="onHoldSub"
            value={onHoldSub}
            checked={onHoldSub}
            onCheked={ChangeOnHoldSub}
          ></CusCheckBox>


          <CusCheckBox
            color="primary"
            size="lg"
            name="onPendingSub"
            value={onPendingSub}
            checked={onPendingSub}
            onCheked={ChangeOnPendingSub}
          ></CusCheckBox>
        </Box>

        <Box sx={{ width: 180, pl: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box sx={{ color: '#000C66', fontFamily: 'Georgia', }}>
            Task Completed
          </Box>
          <Box sx={{ color: '#000C66', fontFamily: 'Georgia', }}>
            Task On Progress
          </Box>
          <Box sx={{ color: '#000C66', fontFamily: 'Georgia', }}>
            Task On Hold
          </Box>
          <Box sx={{ color: '#000C66', fontFamily: 'Georgia', }}>
            Task On Pending
          </Box>
        </Box>
        <Box sx={{ flex: 1, mr: 1 }}>
          {onHoldSub === true ?
            <Box sx={{ border: 1, borderRadius: 5, borderColor: '#D9E4EC' }}>
              < Typography sx={{ pl: 1, fontSize: 20, }}>
                On Hold Remarks
              </Typography>
              <Box sx={{ m: 1 }}>
                <Textarea
                  type="text"
                  size="sm"
                  placeholder="type here..."
                  variant="outlined"
                  minRows={3}
                  maxRows={5}
                  name="onholdremarksSub"
                  value={onholdremarksSub}
                  onChange={SubTaskUpdate}
                >
                </Textarea>
              </Box>
            </Box>
            : null}
          {completedSub === true ?
            <Box sx={{ border: 1, borderRadius: 5, borderColor: '#D9E4EC' }}>
              < Typography sx={{ pl: 1, fontSize: 20, }}>
                Completed Remarks
              </Typography>
              <Box sx={{ m: 1 }}>
                <Textarea
                  type="text"
                  size="sm"
                  placeholder="type here..."
                  variant="outlined"
                  minRows={3}
                  maxRows={5}
                  name="completedremarksSub"
                  value={completedremarksSub}
                  onChange={SubTaskUpdate}
                >
                </Textarea>
              </Box>
            </Box>
            : null}
          {onPendingSub === true ?
            <Box sx={{ border: 1, borderRadius: 5, borderColor: '#D9E4EC' }}>
              < Typography sx={{ pl: 1, fontSize: 20, }}>
                Pending Remarks
              </Typography>
              <Box sx={{ m: 1 }}>
                <Textarea
                  type="text"
                  size="sm"
                  placeholder="type here..."
                  variant="outlined"
                  minRows={3}
                  maxRows={5}
                  name="pendingremarkSub"
                  value={pendingremarkSub}
                  onChange={SubTaskUpdate}
                >
                </Textarea>
              </Box>
            </Box>
            : null}
        </Box>
      </Box>

      {onProgressSub === true ? (
        <Box sx={{ mx: .5, mt: 2, border: 1, borderColor: taskColor.darkPurple, borderStyle: 'dashed', borderRadius: 4 }}>
          <Typography sx={{ p: 1, fontSize: 20, color: 'black' }}>Add Subtask Progress</Typography>

          <Box sx={{ p: 1, width: 250 }}>
            <Typography sx={{ color: 'black', fontFamily: 'Georgia', pl: 1 }}>
              Progress Date
            </Typography>
            <Box sx={{}}>
              <TextFieldCustom
                slotProps={{
                  input: {
                    min: create_date,
                    max: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                  },
                }}
                type="datetime-local"
                size="sm"
                name="tm_progres_date"
                value={tm_progres_date}
                onchange={ProgresssUpdateSub}
              ></TextFieldCustom>
            </Box>
          </Box>
          <Box sx={{ px: 1, }}>
            <Typography sx={{ color: 'black', fontFamily: 'Georgia', pl: 1 }}>
              Progress description
            </Typography>
            <Box >
              <Textarea
                type="text"
                size="sm"
                placeholder="type here..."
                variant="outlined"
                minRows={3}
                maxRows={5}
                name="tm_task_progress"
                value={tm_task_progress}
                onChange={(e) => ProgresssUpdateSub(e)}
              ></Textarea>
            </Box>
          </Box>
          <Box sx={{ p: 1 }}>
            {valueSubProgress === 0 ? (
              <Button sx={{ width: 220, color: 'white' }}
                size='sm' variant='solid' color='neutral' onClick={InsertProgressSub} startDecorator={< AddIcon />}>Add Subtask Progress</Button>
            ) : valueSubProgress === 1 ? (
              <Button sx={{ width: 220, color: 'white' }}
                size='sm' variant='solid' color='neutral' onClick={UpdateProgressSub} startDecorator={< CreateOutlinedIcon />}>Update Subtask Progress</Button>
            ) : null}
          </Box>
          <SubTaskProgressTable
            tabledataProgress={tabledataProgress}
            rowSelectSubProgress={rowSelectSubProgress} />
        </Box>
      ) : null}


      <Box sx={{ display: 'flex', p: 1 }}>
        <Button style={{
          backgroundColor: taskColor.darkPurple,
          m: 1,
          '&:hover': {
            opacity: 10,
            backgroundColor: taskColor.purple,
          }
        }} size='sm' sx={{ my: 1 }} onClick={SubmitTask}>
          Update Subtask
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
          }
          onClick={reset}
        >
          Refresh Subtask
        </Button>

      </Box>
    </Box >
  )
}
export default memo(EditSubtaskEmp)