import React, { memo, useCallback, useEffect, useState } from 'react'
import { Box, CssVarsProvider, Textarea, Typography, Button, Tooltip, Checkbox, Avatar, Divider, Chip } from '@mui/joy'
import { useDispatch, useSelector } from 'react-redux'
import { getDepartmentSubTask } from 'src/redux/actions/TmDepartment.action'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import TmMultlipleDeptmant from 'src/views/CommonSelectCode/TmMultlipleDeptmant'
import Inputcomponent from '../TaskComponents/Inputcomponent'
import ChangeCircleRoundedIcon from '@mui/icons-material/ChangeCircleRounded'
import { getDeptSections } from 'src/redux/actions/TmMultipleDepSectList.action'
import { getMultHodInCharge } from 'src/redux/actions/TmMultipleHODorInChargeList'
import GroupsIcon from '@mui/icons-material/Groups'
import Groups3Icon from '@mui/icons-material/Groups3'
import TmMultipleDeptSectionList from 'src/views/CommonSelectCode/TmMultipleDeptSectionList'
import PeopleIcon from '@mui/icons-material/People'
import TmMultiHodInchargeSelect from 'src/views/CommonSelectCode/TmMultiHodInchargeSelect'
import AssignmentSharpIcon from '@mui/icons-material/AssignmentSharp'
import moment from 'moment'
import ListIcon from '@mui/icons-material/List'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { format } from 'date-fns'
import EditIcon from '@mui/icons-material/Edit'

const AddSubtaskAnyDept = ({
  tm_task_slno,
  tm_project_slno,
  setflag,
  tableRendering,
  setTableRendering,
  tm_task_due_date,
  setTableCount,
  tableCount
}) => {
  const [value, setvalue] = useState(0)
  const [changeDept, setchangeDept] = useState(0)
  const [changeDeptSec, setchangeDeptSec] = useState(0)
  const [subtaskdepartment, setSubtaskDepartment] = useState([])
  const [subtaskdeptSection, setSubtaskDeptSection] = useState([])
  const [subtaskAssignees, setsubtaskAssignees] = useState([])
  const [deptName, setdeptName] = useState([])
  const [changeEmp, setchangeEmp] = useState(0)
  const [deptSecName, setdeptSecName] = useState([])
  const [empName, setempName] = useState([])
  const [checkAllEmployee, setcheckAllEmployee] = useState(false)
  const deptIds = subtaskdepartment.map(dept => dept.dept_id)
  const secIds = subtaskdeptSection.map(sec => sec.sec_id)
  const [arry, setArry] = useState([])
  const [postArray, setPostArray] = useState([])
  const [msgshow, setMsg] = useState(0)
  const [selectEmpflag, setSelectEmpflag] = useState(0)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getDepartmentSubTask())
  }, [dispatch])
  const id = useSelector(state => {
    return state.LoginUserData.empid
  })
  const EmployeeCheckbox = e => {
    if (e.target.checked === true) {
      setcheckAllEmployee(true)
      setSelectEmpflag(1)
      if (subtaskdeptSection.length !== 0) {
        const secIds = subtaskdeptSection.map(sec => sec.sec_id)
        const InchrgeHods = async secIds => {
          const result = await axioslogin.post('/TmDropDowns/getMultHodInChargeUnderSection', secIds)
          const { data, success } = result.data
          if (success === 2) {
            setsubtaskAssignees(data)
          } else if (success === 0) {
            setsubtaskAssignees([])
          }
        }
        InchrgeHods(secIds)
      } else {
        infoNotify('select department section to select Hods and Incharges')
      }
    } else {
      setcheckAllEmployee(false)
      setSelectEmpflag(0)
    }
  }

  const [subTaskMast, setSubTaskMast] = useState({
    tm_sub_task_slno: '',
    tm_subtask_name: '',
    tm_subtask_duedate: '',
    tm_subtask_description: '',
    tm_Subtask_status: 0,
    tm_onhold_remarkSubtask: '',
    tm_pending_remarkSubtask: '',
    tm_completed_remarkSubtask: '',
    main_task_slno: '',
    tm_complete_dateSubtask: ''
  })
  const {
    tm_subtask_name,
    tm_subtask_duedate,
    tm_subtask_description,
    tm_onhold_remarkSubtask,
    tm_complete_dateSubtask,
    tm_pending_remarkSubtask,
    tm_completed_remarkSubtask
  } = subTaskMast

  const SubTaskUpdate = useCallback(
    e => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setSubTaskMast({ ...subTaskMast, [e.target.name]: value })
    },
    [subTaskMast]
  )

  const changeDepmt = useCallback(() => {
    setchangeDept(1)
    setchangeDeptSec(1)
    setchangeEmp(1)
  }, [])

  const changeDepSec = useCallback(
    () => {
      dispatch(getDeptSections(deptIds))
      setchangeDeptSec(1)
      setchangeEmp(1)
    },
    [deptIds, dispatch]
  )

  const changeAssignee = useCallback(
    () => {
      setchangeEmp(1)
      dispatch(getMultHodInCharge(secIds))
    },
    [secIds, dispatch]
  )

  const clearrr = useCallback(() => {
    setSubtaskDepartment([])
    setSubtaskDeptSection([])
    setsubtaskAssignees([])
    setArry([])
    setPostArray([])
    setSubTaskMast({
      tm_sub_task_slno: '',
      tm_subtask_name: '',
      tm_subtask_duedate: '',
      tm_subtask_description: '',
      tm_Subtask_status: 0,
      tm_onhold_remarkSubtask: '',
      tm_pending_remarkSubtask: '',
      tm_completed_remarkSubtask: '',
      main_task_slno: '',
      tm_complete_dateSubtask: ''
    }) // Reset subtask master state if necessary
    setflag(0)
  }, [setflag])

  const addTask = useCallback(() => {
    const frmdata = {
      tm_subtask_name: tm_subtask_name,
      tm_subtask_dept: subtaskdepartment,
      employee: subtaskAssignees,
      tm_subtask_dept_sec: subtaskdeptSection,
      tm_project_slno: tm_project_slno,
      tm_subtask_duedate: tm_subtask_duedate,
      tm_subtask_description: tm_subtask_description,
      tm_subtask_status: 0,
      Subtask_create_id: id,
      main_task_slno: tm_task_slno,
      tm_onhold_remarkSubtask: tm_onhold_remarkSubtask === '' ? null : tm_onhold_remarkSubtask,
      tm_pending_remarkSubtask: tm_pending_remarkSubtask === '' ? null : tm_pending_remarkSubtask,
      tm_completed_remarkSubtask: tm_completed_remarkSubtask === '' ? null : tm_completed_remarkSubtask,
      tm_complete_dateSubtask: tm_complete_dateSubtask === '' ? null : tm_complete_dateSubtask
    }
    const formata = {
      tm_subtask_name: tm_subtask_name,
      tm_subtask_dept: deptIds,
      employee: subtaskAssignees,
      tm_subtask_dept_sec: subtaskdeptSection,
      tm_project_slno: tm_project_slno,
      tm_subtask_duedate: tm_subtask_duedate,
      tm_subtask_description: tm_subtask_description,
      tm_subtask_status: 0,
      Subtask_create_id: id,
      main_task_slno: tm_task_slno,
      tm_onhold_remarkSubtask: tm_onhold_remarkSubtask === '' ? null : tm_onhold_remarkSubtask,
      tm_pending_remarkSubtask: tm_pending_remarkSubtask === '' ? null : tm_pending_remarkSubtask,
      tm_completed_remarkSubtask: tm_completed_remarkSubtask === '' ? null : tm_completed_remarkSubtask,
      tm_complete_dateSubtask: tm_complete_dateSubtask === '' ? null : tm_complete_dateSubtask
    }

    if (
      tm_subtask_duedate !== '' &&
      tm_subtask_name !== '' &&
      tm_subtask_description !== '' &&
      subtaskdepartment !== '' &&
      subtaskdeptSection !== ''
    ) {
      if (subtaskAssignees.length !== 0) {
        const newarry = [...arry, frmdata]
        setArry(newarry)
        const newpostarry = [...postArray, formata]
        setPostArray(newpostarry)
        if (value === 0) {
          const resetfrmdata = {
            tm_sub_task_slno: '',
            tm_subtask_name: '',
            tm_subtask_duedate: '',
            tm_subtask_description: ''
          }
          setSubTaskMast(resetfrmdata)
          setvalue(0)
          setSelectEmpflag(0)
          setcheckAllEmployee(false)
          setsubtaskAssignees([])
        } else {
          const resetfrmdata = {
            tm_sub_task_slno: '',
            tm_subtask_name: '',
            tm_subtask_duedate: '',
            tm_subtask_description: ''
          }
          setSubTaskMast(resetfrmdata)
          setchangeDept(0)
          setchangeDeptSec(0)
          setchangeEmp(0)
          setSubtaskDepartment([])
          setSubtaskDeptSection([])
          setsubtaskAssignees([])
          setvalue(0)
          setSelectEmpflag(0)
          setcheckAllEmployee(false)
          setsubtaskAssignees([])
        }
      } else {
        infoNotify('please Select assignees')
      }
    } else {
      infoNotify('Please fill Mandatory fields')
    }
  }, [
    arry,
    postArray,
    tm_subtask_name,
    deptIds,
    subtaskdepartment,
    tm_subtask_duedate,
    tm_subtask_description,
    subtaskdeptSection,
    subtaskAssignees,
    tm_project_slno,
    id,
    tm_complete_dateSubtask,
    tm_task_slno,
    tm_completed_remarkSubtask,
    tm_onhold_remarkSubtask,
    tm_pending_remarkSubtask,
    value
  ])

  useEffect(() => {
    if (msgshow === 1) {
      succesNotify('Subtask created Under Section/s successfully')
    } else if (msgshow === 2) {
      warningNotify('Error while insertion')
    }
  }, [msgshow])

  const SubmitTask = useCallback(
    () => {
      const InsertTask = async insertArry => {
        const result = await axioslogin.post('/TmAllDeptTask/insertTask', insertArry)
        const { message, success } = result.data
        if (success === 1) {
          setMsg(1)
          setTableRendering(tableRendering + 1)
          setTableCount(tableCount + 1)
          clearrr()
        } else if (success === 0) {
          setMsg(2)
          infoNotify(message)
        } else {
          infoNotify(message)
        }
      }
      const saveArray = postArray?.map(val => {
        const yy = val.tm_subtask_dept_sec?.map(value => {
          const xxx = val.employee?.filter(valemp => (valemp.dept_section === value.sec_id ? valemp.dept_section : 0))
          const obj = {
            tm_task_name: val.tm_subtask_name,
            tm_task_description: val.tm_subtask_description,
            tm_task_due_date: val.tm_subtask_duedate,
            tm_task_status: val.tm_subtask_status,
            tm_task_dept_sec: value.sec_id,
            tm_task_dept: value.dept_id,
            tm_project_slno: val.tm_project_slno === 0 ? null : val.tm_project_slno,
            tm_onhold_remarks: val.tm_onhold_remarkSubtask,
            tm_pending_remark: val.tm_pending_remarkSubtask,
            tm_completed_remarks: val.tm_completed_remarkSubtask,
            tm_complete_date: val.tm_complete_dateSubtask,
            create_user: val.Subtask_create_id,
            main_task_slno: val.main_task_slno,
            employee: xxx?.map(dfv => dfv.emp_id)
          }
          return obj
        })
        return yy
      })
      const insertArry = saveArray.reduce((accumulator, currentArray) => {
        return accumulator.concat(currentArray)
      }, [])

      insertArry?.map(val => {
        InsertTask(val)
        return 0
      })
    },
    [postArray, tableRendering, setTableRendering, tableCount, clearrr, setTableCount]
  )

  const rowSelectFromTempTable = useCallback(
    (val, index) => {
      setvalue(1)
      const {
        tm_subtask_name,
        tm_subtask_description,
        tm_subtask_duedate,
        tm_onhold_remarkSubtask,
        tm_pending_remarkSubtask,
        tm_completed_remarkSubtask,
        tm_complete_dateSubtask,
        tm_project_slno,
        tm_subtask_dept,
        tm_subtask_dept_sec,
        employee,
        Subtask_create_id,
        main_task_slno,
        tm_subtask_status
      } = val
      const deptNames = tm_subtask_dept.map(deptN => deptN.dept_name)
      const secNames = tm_subtask_dept_sec.map(deptSecN => deptSecN.sec_name)
      const empNames = employee.map(empN => empN.em_name)

      const frmdata = {
        tm_subtask_name: tm_subtask_name,
        tm_subtask_description: tm_subtask_description,
        tm_subtask_duedate: tm_subtask_duedate,
        tm_task_slno: tm_task_slno,
        tm_onhold_remarkSubtask: tm_onhold_remarkSubtask,
        tm_pending_remarkSubtask: tm_pending_remarkSubtask,
        tm_completed_remarkSubtask: tm_completed_remarkSubtask,
        tm_complete_dateSubtask: tm_complete_dateSubtask,
        tm_subtask_status: tm_subtask_status,
        tm_project_slno: tm_project_slno,
        Subtask_create_id: Subtask_create_id,
        main_task_slno: main_task_slno
      }
      setSubTaskMast(frmdata)
      setSubtaskDepartment(tm_subtask_dept)
      setSubtaskDeptSection(tm_subtask_dept_sec)
      setdeptName(deptNames)
      setdeptSecName(secNames)
      setempName(empNames)
      setsubtaskAssignees(employee)
      setcheckAllEmployee(false)
      setSelectEmpflag(0)

      // Remove the selected row from the array
      const newArry = [...arry]
      newArry.splice(index, 1)
      setArry(newArry)
    },
    [arry, tm_task_slno]
  )

  return (
    <Box>
      <Box sx={{ display: 'flex', mx: 3, p: 1, mt: 1 }}>
        <Box sx={{ flex: 1.5 }}>
          <Typography sx={{ pl: 1, fontWeight: 500, fontSize: 13, color: '#1D5183' }}>
            <GroupsIcon sx={{ p: 0.2, color: '#4C5270' }} />
            Department<span style={{ color: '#74112F', fontSize: 15 }}>*</span>
          </Typography>
          {value === 1 ? (
            <>
              {changeDept === 1 ? (
                <>
                  <Box sx={{ flex: 1 }}>
                    <TmMultlipleDeptmant department={subtaskdepartment} setDepartment={setSubtaskDepartment} />
                  </Box>
                </>
              ) : (
                <>
                  <Box sx={{ display: 'flex', mt: 0.5 }}>
                    <Box sx={{ flex: 1, mr: 1 }}>
                      <Inputcomponent type="text" name="deptName" value={deptName} disabled></Inputcomponent>
                    </Box>
                    <Box sx={{ pt: 0.5 }}>
                      <Tooltip title="Change Department">
                        <ChangeCircleRoundedIcon sx={{ cursor: 'pointer' }} onClick={changeDepmt} />
                      </Tooltip>
                    </Box>
                  </Box>
                </>
              )}
            </>
          ) : (
            <Box sx={{ flex: 1 }}>
              <TmMultlipleDeptmant department={subtaskdepartment} setDepartment={setSubtaskDepartment} />
            </Box>
          )}
        </Box>
        <Box sx={{ flex: 1.5, ml: 3 }}>
          <Typography sx={{ pl: 1, fontWeight: 500, fontSize: 13, color: '#1D5183' }}>
            <Groups3Icon sx={{ p: 0.2, color: '#4C5270' }} />
            Department Section<span style={{ color: '#74112F', fontSize: 15 }}>*</span>
          </Typography>
          {value === 1 ? (
            <>
              {changeDeptSec === 1 ? (
                <>
                  <Box sx={{ flex: 1 }}>
                    <TmMultipleDeptSectionList
                      deptSection={subtaskdeptSection}
                      setDeptSection={setSubtaskDeptSection}
                    />
                  </Box>
                </>
              ) : (
                <>
                  <Box sx={{ display: 'flex', mt: 0.5 }}>
                    <Box sx={{ flex: 1, mr: 1 }}>
                      <Inputcomponent type="text" name="deptSecName" value={deptSecName} disabled></Inputcomponent>
                    </Box>
                    <Box sx={{ pt: 0.5 }}>
                      <Tooltip title="Change Department Section">
                        <ChangeCircleRoundedIcon sx={{ cursor: 'pointer' }} onClick={changeDepSec} />
                      </Tooltip>
                    </Box>
                  </Box>
                </>
              )}
            </>
          ) : (
            <>
              <Box sx={{ flex: 1 }}>
                <TmMultipleDeptSectionList deptSection={subtaskdeptSection} setDeptSection={setSubtaskDeptSection} />
              </Box>
            </>
          )}
        </Box>
        <Box sx={{ flex: 1.8, ml: 3, display: 'flex' }}>
          <Box sx={{ pt: 5 }}>
            <Checkbox size="md" color="warning" checked={checkAllEmployee} onChange={EmployeeCheckbox} />
          </Box>
          <Typography
            sx={{
              fontSize: 10,
              pt: 0.5,
              pl: 1,
              width: '80px'
            }}
          >
            Select All HODs/Incharges Under Selected Section
          </Typography>
          <Typography sx={{ pt: 3, fontWeight: 600, fontSize: 14, px: 2.5, color: 'black' }}>(or)</Typography>
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ pl: 1, fontWeight: 500, fontSize: 13, color: '#1D5183' }}>
              <PeopleIcon sx={{ color: '#4C5270' }} />
              Assignees
            </Typography>
            {selectEmpflag !== 1 ? (
              <>
                {value === 1 ? (
                  <>
                    {changeEmp === 1 ? (
                      <>
                        <Box sx={{ flex: 1, mt: 0.8 }}>
                          <TmMultiHodInchargeSelect value={subtaskAssignees} setValue={setsubtaskAssignees} />
                        </Box>
                      </>
                    ) : (
                      <>
                        <Box sx={{ display: 'flex', mt: 0.8 }}>
                          <Box sx={{ flex: 1, mr: 1 }}>
                            <Inputcomponent type="text" name="empName" value={empName} disabled></Inputcomponent>
                          </Box>
                          <Box sx={{ pt: 0.5 }}>
                            <Tooltip title="Change Assignees">
                              <ChangeCircleRoundedIcon sx={{ cursor: 'pointer' }} onClick={changeAssignee} />
                            </Tooltip>
                          </Box>
                        </Box>
                      </>
                    )}
                  </>
                ) : (
                  <Box sx={{ flex: 1, mt: 0.8 }}>
                    <TmMultiHodInchargeSelect value={subtaskAssignees} setValue={setsubtaskAssignees} />
                  </Box>
                )}
              </>
            ) : (
              <>
                <Box sx={{ flex: 1, mr: 1 }}>
                  <Inputcomponent type="text" placeholder={'select assignees'} disabled></Inputcomponent>
                </Box>
              </>
            )}
          </Box>
        </Box>
      </Box>
      <Box sx={{ flex: 1, display: 'flex', mx: 7, mt: 3, mb: 5 }}>
        <Box sx={{ flex: 18 }}>
          <Box sx={{ flex: 1, display: 'flex' }}>
            <Box sx={{ flex: 1, mx: 1 }}>
              <Typography sx={{ pl: 1, fontWeight: 500, fontSize: 13, color: '#1D5183' }}>
                <AssignmentSharpIcon sx={{ p: 0.2, color: '#4C5270' }} />
                Task<span style={{ color: '#74112F', fontSize: 15 }}>*</span>
              </Typography>
              <Textarea
                minRows={1}
                maxRows={5}
                placeholder="New Task"
                variant="plain"
                sx={{
                  borderBottom: '2px solid',
                  borderColor: 'neutral.outlinedBorder',
                  borderRadius: 0,
                  '&:hover': {
                    borderColor: 'neutral.outlinedHoverBorder'
                  },
                  '&::before': {
                    border: '1px solid var(--Textarea-focusedHighlight)',
                    transform: 'scaleX(0)',
                    left: 0,
                    right: 0,
                    bottom: '-2px',
                    top: 'unset',
                    transition: 'transform .15s cubic-bezier(0.1,0.9,0.2,1)',
                    borderRadius: 0
                  },
                  '&:focus-within::before': {
                    transform: 'scaleX(1)'
                  }
                }}
                name="tm_subtask_name"
                value={tm_subtask_name}
                onChange={e => SubTaskUpdate(e)}
              />
            </Box>
            <Box sx={{ flex: 0.3, mt: 0.2, mx: 1 }}>
              <Typography sx={{ pl: 1, fontWeight: 500, fontSize: 13, color: '#1D5183' }}>
                <AssignmentSharpIcon sx={{ p: 0.2, color: '#4C5270' }} />
                Duedate<span style={{ color: '#74112F', fontSize: 15 }}>*</span>
              </Typography>
              <Inputcomponent
                type="datetime-local"
                name="tm_subtask_duedate"
                value={tm_subtask_duedate}
                slotProps={{
                  input: {
                    min: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                    max: moment(new Date(tm_task_due_date)).format('YYYY-MM-DD HH:mm:ss')
                  }
                }}
                onchange={SubTaskUpdate}
              />
            </Box>
            <Box sx={{ flex: 1, mx: 1 }}>
              <Typography sx={{ pl: 1, fontWeight: 500, fontSize: 13, color: '#1D5183' }}>
                <ListIcon sx={{ p: 0.2, color: '#4C5270' }} />
                Description<span style={{ color: '#74112F', fontSize: 15 }}>*</span>
              </Typography>
              <Textarea
                minRows={1}
                maxRows={5}
                placeholder="Description"
                variant="plain"
                sx={{
                  borderBottom: '2px solid',
                  borderColor: 'neutral.outlinedBorder',
                  borderRadius: 0,
                  '&:hover': {
                    borderColor: 'neutral.outlinedHoverBorder'
                  },
                  '&::before': {
                    border: '1px solid var(--Textarea-focusedHighlight)',
                    transform: 'scaleX(0)',
                    left: 0,
                    right: 0,
                    bottom: '-2px',
                    top: 'unset',
                    transition: 'transform .15s cubic-bezier(0.1,0.9,0.2,1)',
                    borderRadius: 0
                  },
                  '&:focus-within::before': {
                    transform: 'scaleX(1)'
                  }
                }}
                name="tm_subtask_description"
                value={tm_subtask_description}
                onChange={e => SubTaskUpdate(e)}
              />
            </Box>
          </Box>
        </Box>
        <Box sx={{ flex: 0.1, pt: 3, px: 1, mx: 0.5, mt: 1, borderRadius: 5 }}>
          <Tooltip title={'Add More Task'}>
            <Avatar sx={{ bgcolor: '#E4D4C8' }}>
              <AddCircleIcon
                sx={{
                  color: '#523A28',
                  cursor: 'pointer',
                  '&:hover': { color: '#5C4E4E' },
                  height: 30,
                  width: 30
                }}
                onClick={addTask}
              />
            </Avatar>
          </Tooltip>
        </Box>
      </Box>
      {arry.length !== 0 ? (
        <>
          <Box sx={{ mx: 3, mt: 3, flex: 1 }}>
            <Divider
              sx={{
                '--Divider-childPosition': `5%`,
                fontWeight: 600,
                fontSize: 18,
                color: '#523A28',
                mb: 1,
                mt: 2,
                mx: 3
              }}
            >
              Subtask creation List
            </Divider>
          </Box>
          <Box
            sx={{
              flex: 1,
              height: 45,
              mt: 0.5,
              display: 'flex',
              borderBottom: 1,
              borderTop: 1,
              borderColor: 'lightgray',
              pt: 1.5,
              mx: 6,
              bgcolor: 'white'
            }}
          >
            <Box sx={{ width: 30, pl: 1.7, fontWeight: 600, color: '#444444', fontSize: 12 }}>#</Box>
            <Box
              sx={{
                width: 100,
                textAlign: 'center',
                fontWeight: 600,
                color: '#444444',
                fontSize: 12
              }}
            >
              Action
            </Box>
            <Box sx={{ width: 800, fontWeight: 600, color: '#444444', fontSize: 12, pl: 1 }}>Task Name</Box>
            <Box sx={{ width: 250, fontWeight: 600, color: '#444444', fontSize: 12, pl: 1 }}>Duedate</Box>
            <Box sx={{ width: 400, fontWeight: 600, color: '#444444', fontSize: 12, pl: 1 }}>Department</Box>
            <Box sx={{ width: 400, fontWeight: 600, color: '#444444', fontSize: 12, pl: 0.8 }}>Department Section</Box>
            <Box sx={{ width: 500, fontWeight: 600, color: '#444444', fontSize: 12 }}>Assignees</Box>
            <Box sx={{ width: 800, fontWeight: 600, color: '#444444', fontSize: 12 }}>Description</Box>
          </Box>
          <Box>
            {arry?.map((val, index) => {
              return (
                <Box
                  key={index}
                  sx={{
                    flex: 1,
                    mx: 6,
                    display: 'flex',
                    mt: 0.3,
                    borderBottom: 2,
                    borderColor: 'lightgrey',
                    minHeight: 30,
                    background: 'white',
                    pt: 0.5
                  }}
                >
                  <Box sx={{ width: 30, pl: 1.7, fontWeight: 600, color: 'grey', fontSize: 12 }}>{index + 1}</Box>
                  <Box
                    sx={{
                      width: 100,
                      textAlign: 'center',
                      fontWeight: 600,
                      color: 'grey',
                      fontSize: 12
                    }}
                  >
                    <EditIcon
                      sx={{ cursor: 'pointer', '&:hover': { color: '#003060' } }}
                      size={6}
                      onClick={() => rowSelectFromTempTable(val, index)}
                    />
                  </Box>
                  <Box
                    sx={{
                      width: 800,
                      fontWeight: 600,
                      color: 'grey',
                      textTransform: 'capitalize',
                      pl: 1
                    }}
                  >
                    <Chip sx={{ bgcolor: '#EFEDC6', fontSize: 12, mb: 0.2 }}>{val.tm_subtask_name}</Chip>
                  </Box>
                  <Box
                    sx={{
                      width: 250,
                      fontWeight: 600,
                      color: 'grey',
                      fontSize: 12,
                      textTransform: 'capitalize',
                      pl: 1
                    }}
                  >
                    <Chip sx={{ bgcolor: '#EFEDC6', fontSize: 12 }}>
                      {format(new Date(val.tm_subtask_duedate), 'dd-MM-yyyy HH:mm:ss')}
                    </Chip>
                  </Box>
                  <Box
                    sx={{
                      width: 400,
                      fontWeight: 600,
                      color: 'grey',
                      textTransform: 'capitalize',
                      pl: 1
                    }}
                  >
                    {val.tm_subtask_dept &&
                      val.tm_subtask_dept.map(value => {
                        return (
                          <Box key={value.dept_id}>
                            <Chip sx={{ bgcolor: '#EFEDC6', mb: 0.2, fontSize: 12 }}> {value.dept_name}</Chip>
                          </Box>
                        )
                      })}
                  </Box>
                  <Box
                    sx={{
                      width: 400,
                      fontWeight: 600,
                      color: 'grey',
                      textTransform: 'capitalize',
                      pl: 1
                    }}
                  >
                    {' '}
                    {val.tm_subtask_dept_sec &&
                      val.tm_subtask_dept_sec.map(value => {
                        return (
                          <Box key={value.sec_id}>
                            <Chip sx={{ bgcolor: '#EFEDC6', fontSize: 12, mb: 0.2 }}>{value.sec_name}</Chip>
                          </Box>
                        )
                      })}
                  </Box>
                  <Box
                    sx={{
                      width: 500,
                      fontWeight: 600,
                      color: 'grey',
                      textTransform: 'capitalize',
                      pl: 1
                    }}
                  >
                    {val.employee &&
                      val.employee.map(value => {
                        return (
                          <Box key={value.emp_id}>
                            {' '}
                            <Chip sx={{ bgcolor: '#EFEDC6', fontSize: 12, mb: 0.2 }}>{value.em_name}</Chip>
                          </Box>
                        )
                      })}
                  </Box>
                  <Box
                    sx={{
                      width: 800,
                      fontWeight: 600,
                      color: 'grey',
                      textTransform: 'capitalize',
                      pl: 1
                    }}
                  >
                    <Chip sx={{ bgcolor: '#EFEDC6', fontSize: 12, mb: 0.2 }}>{val.tm_subtask_description}</Chip>
                  </Box>
                </Box>
              )
            })}
          </Box>
          <Box
            sx={{
              mr: 0.5,
              fontSize: 20,
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'center',
              my: 1.5
            }}
          >
            <CssVarsProvider>
              <Button variant="solid" onClick={SubmitTask} sx={{ fontSize: 16, color: 'white', bgcolor: '#6C3F3F' }}>
                {' '}
                + Add Subtask/s{' '}
              </Button>
            </CssVarsProvider>
          </Box>
        </>
      ) : null}
    </Box>
  )
}

export default memo(AddSubtaskAnyDept)
