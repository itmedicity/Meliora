import React, { useCallback, useState, memo, useEffect } from 'react'
import {
  Avatar,
  Box,
  Checkbox,
  Chip,
  CssVarsProvider,
  Divider,
  Modal,
  ModalDialog,
  Textarea,
  Typography,
} from '@mui/joy'
import Button from '@mui/joy/Button'
import { axioslogin } from 'src/views/Axios/Axios'
import { useDispatch, useSelector } from 'react-redux'
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import AssignmentIcon from '@mui/icons-material/Assignment'
import Tooltip from '@mui/joy/Tooltip'
import CloseIcon from '@mui/icons-material/Close'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import {
  getNonGoalProjectList,
  getProjectListWithgoal,
} from 'src/redux/actions/TmProjectsList.action'
import { getGoalsList } from 'src/redux/actions/TmGoalsList.action'
import GoalCreation from '../ModalComponent/GoalCreation'
import TmAllProjectList from 'src/views/CommonSelectCode/TmAllProjectList'
import TmAllGoalsList from 'src/views/CommonSelectCode/TmAllGoalsList'
import TmMultlipleDeptmant from 'src/views/CommonSelectCode/TmMultlipleDeptmant'
import TmMultipleDeptSectionList from 'src/views/CommonSelectCode/TmMultipleDeptSectionList'
import { getDepartment } from 'src/redux/actions/Department.action'
import PeopleIcon from '@mui/icons-material/People'
import AssignmentSharpIcon from '@mui/icons-material/AssignmentSharp'
import AccountTreeSharpIcon from '@mui/icons-material/AccountTreeSharp'
import RadarIcon from '@mui/icons-material/Radar'
import GroupsIcon from '@mui/icons-material/Groups'
import Groups3Icon from '@mui/icons-material/Groups3'
import ListIcon from '@mui/icons-material/List'
import ProjectCreation from '../ModalComponent/ProjectCreation'
import TmMultiHodInchargeSelect from 'src/views/CommonSelectCode/TmMultiHodInchargeSelect'
import Inputcomponent from '../TaskComponents/Inputcomponent'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import AttachmentIcon from '@mui/icons-material/Attachment'
import EditIcon from '@mui/icons-material/Edit'
import { format } from 'date-fns'
import ChangeCircleRoundedIcon from '@mui/icons-material/ChangeCircleRounded'
import { getDeptSections } from 'src/redux/actions/TmMultipleDepSectList.action'
import { getMultHodInCharge } from 'src/redux/actions/TmMultipleHODorInChargeList'
import moment from 'moment'
import imageCompression from 'browser-image-compression'

const CreateTaskInAllDept = ({
  open,
  setAddModalFlag,
  setaddModalOpen,
  tableCount,
  setTableCount,
}) => {
  const dispatch = useDispatch()
  const [addGoalFlag, setAddGoalFlag] = useState(0)
  const [addGoalModalOpen, setaddGoalModalOpen] = useState(false)
  const [addProjectFlag, setAddProjectFlag] = useState(0)
  const [addProjectModalOpen, setaddProjectlModalOpen] = useState(false)
  const [goalz, setgoalz] = useState(0)
  const [projectz, setprojectz] = useState(0)
  const [department, setDepartment] = useState([])
  const [deptSection, setDeptSection] = useState([])
  const [assignees, setAssignees] = useState([])
  const [arry, setArry] = useState([])
  const [checkAllEmployee, setcheckAllEmployee] = useState(false)
  const [selectFile, setSelectFile] = useState([])
  const deptIds = department.map(dept => dept.dept_id)
  const secIds = deptSection.map(sec => sec.sec_id)
  const [postArray, setPostArray] = useState([])
  const [value, setvalue] = useState(0)
  const [deptName, setdeptName] = useState([])
  const [changeDept, setchangeDept] = useState(0)
  const [changeDeptSec, setchangeDeptSec] = useState(0)
  const [deptSecName, setdeptSecName] = useState([])
  const [empName, setempName] = useState([])
  const [changeEmp, setchangeEmp] = useState(0)
  const [dueDateGoal, setdueDateGoal] = useState('')
  const [dueDateProject, setdueDateProject] = useState('')
  const [selectEmpflag, setSelectEmpflag] = useState(0)
  const id = useSelector(state => {
    return state.LoginUserData.empid
  })

  const EmployeeCheckbox = useCallback(
    e => {
      if (e.target.checked === true) {
        setcheckAllEmployee(true)
        setSelectEmpflag(1)
        if (deptSection.length !== 0) {
          const secIds = deptSection.map(sec => sec.sec_id)
          const InchrgeHods = async secIds => {
            const result = await axioslogin.post(
              '/TmDropDowns/getMultHodInChargeUnderSection',
              secIds
            )
            const { data, success } = result.data
            if (success === 2) {
              setAssignees(data)
            } else if (success === 0) {
              setAssignees([])
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
    },
    [deptSection]
  )

  const CloseDept = useCallback(() => {
    setvalue(0)
    setAddModalFlag(0)
    setaddModalOpen(false)
  }, [setAddModalFlag, setaddModalOpen])

  useEffect(() => {
    dispatch(getGoalsList())
    dispatch(getDepartment())
    if (goalz !== 0) {
      dispatch(getProjectListWithgoal(goalz))
    } else {
      dispatch(getNonGoalProjectList())
    }
  }, [dispatch, goalz])

  const handleClose = useCallback(() => {
    setAddModalFlag(0)
    setaddModalOpen(false)
  }, [setAddModalFlag, setaddModalOpen])

  const CreateGoal = useCallback(() => {
    setAddGoalFlag(1)
    setaddGoalModalOpen(true)
  }, [])

  const CreateProject = useCallback(() => {
    setgoalz(0)
    setAddProjectFlag(1)
    setaddProjectlModalOpen(true)
  }, [])

  const [taskCreation, setTaskCreation] = useState({
    tm_task_slno: '',
    tm_task_name: '',
    tm_task_due_date: '',
    tm_task_description: '',
    tm_onhold_remarks: '',
    tm_pending_remark: '',
    tm_completed_remarks: '',
    tm_complete_date: '',
    main_task_slno: '',
  })
  const {
    tm_task_slno,
    tm_task_name,
    tm_task_due_date,
    tm_task_description,
    tm_onhold_remarks,
    tm_pending_remark,
    tm_completed_remarks,
    tm_complete_date,
    main_task_slno,
  } = taskCreation

  const TaskMastUpdate = useCallback(
    e => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setTaskCreation({ ...taskCreation, [e.target.name]: value })
    },
    [taskCreation]
  )

  const addTask = useCallback(() => {
    const frmdata = {
      tm_task_name: tm_task_name,
      tm_task_dept: department,
      employee: assignees,
      tm_task_dept_sec: deptSection,
      tm_project_slno: projectz,
      tm_goals_slno: goalz,
      tm_task_due_date: tm_task_due_date,
      tm_task_description: tm_task_description,
      tm_task_status: 0,
      create_id: id,
      tm_onhold_remarks: tm_onhold_remarks === '' ? null : tm_onhold_remarks,
      tm_pending_remark: tm_pending_remark === '' ? null : tm_pending_remark,
      tm_completed_remarks: tm_completed_remarks === '' ? null : tm_completed_remarks,
      tm_complete_date: tm_complete_date === '' ? null : tm_complete_date,
      main_task_slno: main_task_slno === '' ? null : main_task_slno,
      files: selectFile,
    }
    const formata = {
      tm_task_name: tm_task_name,
      tm_task_dept: deptIds,
      employee: assignees,
      tm_task_dept_sec: deptSection,
      tm_project_slno: projectz,
      tm_goals_slno: goalz,
      tm_task_due_date: tm_task_due_date,
      tm_task_description: tm_task_description,
      tm_task_status: 0,
      create_id: id,
      tm_onhold_remarks: tm_onhold_remarks === '' ? null : tm_onhold_remarks,
      tm_pending_remark: tm_pending_remark === '' ? null : tm_pending_remark,
      tm_completed_remarks: tm_completed_remarks === '' ? null : tm_completed_remarks,
      tm_complete_date: tm_complete_date === '' ? null : tm_complete_date,
      main_task_slno: main_task_slno === '' ? null : main_task_slno,
      files: selectFile,
    }

    if (
      tm_task_due_date !== '' &&
      tm_task_name !== '' &&
      tm_task_description !== '' &&
      department !== '' &&
      deptSection !== ''
    ) {
      if (assignees.length !== 0) {
        const newarry = [...arry, frmdata]
        setArry(newarry)
        const newpostarry = [...postArray, formata]
        setPostArray(newpostarry)

        if (value === 0) {
          const resetfrmdata = {
            tm_task_slno: '',
            tm_task_name: '',
            tm_task_due_date: '',
            tm_task_description: '',
          }
          setTaskCreation(resetfrmdata)
          setvalue(0)
          setSelectFile([])
          setSelectEmpflag(0)
          setcheckAllEmployee(false)
          setAssignees([])
        } else {
          const resetfrmdata = {
            tm_task_slno: '',
            tm_task_name: '',
            tm_task_due_date: '',
            tm_task_description: '',
          }
          setTaskCreation(resetfrmdata)
          setchangeDept(0)
          setchangeDeptSec(0)
          setchangeEmp(0)
          setDepartment([])
          setDeptSection([])
          setAssignees([])
          setvalue(0)
          setSelectFile([])
          setSelectEmpflag(0)
          setcheckAllEmployee(false)
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
    tm_task_name,
    deptIds,
    department,
    tm_task_due_date,
    tm_task_description,
    deptSection,
    assignees,
    projectz,
    goalz,
    id,
    tm_complete_date,
    tm_completed_remarks,
    tm_onhold_remarks,
    tm_pending_remark,
    value,
    main_task_slno,
    selectFile,
  ])

  const handleFileChange = useCallback(
    e => {
      const newFiles = [...selectFile]
      newFiles.push(e.target.files[0])
      setSelectFile(newFiles)
    },
    [selectFile, setSelectFile]
  )

  const handleRemoveFile = index => {
    setSelectFile(prevFiles => {
      const updatedFiles = [...prevFiles]
      updatedFiles.splice(index, 1) // Remove the file at the specified index
      return updatedFiles
    })
  }

  const rowSelectFromTempTable = useCallback(
    (val, index) => {
      setvalue(1)
      const {
        tm_task_name,
        tm_task_description,
        tm_task_due_date,
        tm_goals_slno,
        tm_onhold_remarks,
        tm_pending_remark,
        tm_completed_remarks,
        tm_complete_date,
        tm_project_slno,
        tm_task_dept,
        tm_task_dept_sec,
        employee,
        main_task_slno,
      } = val
      const deptNames = tm_task_dept.map(deptN => deptN.dept_name)
      const secNames = tm_task_dept_sec.map(deptSecN => deptSecN.sec_name)
      const empNames = employee.map(empN => empN.em_name)

      const frmdata = {
        tm_task_name: tm_task_name,
        tm_task_description: tm_task_description,
        tm_task_due_date: tm_task_due_date,
        tm_task_slno: tm_task_slno,
        tm_onhold_remarks: tm_onhold_remarks,
        tm_pending_remark: tm_pending_remark,
        tm_completed_remarks: tm_completed_remarks,
        tm_complete_date: tm_complete_date,
        main_task_slno: main_task_slno,
        goalz: tm_goals_slno,
        projectz: tm_project_slno,
      }
      setTaskCreation(frmdata)
      setgoalz(tm_goals_slno)
      setprojectz(tm_project_slno)
      setDepartment(tm_task_dept)
      setDeptSection(tm_task_dept_sec)
      setdeptName(deptNames)
      setdeptSecName(secNames)
      setempName(empNames)
      setAssignees(employee)
      setcheckAllEmployee(false)
      setSelectEmpflag(0)

      // Remove the selected row from the array
      const newArry = [...arry]
      newArry.splice(index, 1)
      setArry(newArry)
    },
    [arry, tm_task_slno]
  )

  const [msgshow, setMsg] = useState(0)

  useEffect(() => {
    if (msgshow === 1) {
      succesNotify('Task created Under Section/s successfully')
    } else if (msgshow === 2) {
      warningNotify('Error while insertion')
    }
  }, [msgshow])

  const handleImageUpload = useCallback(async imageFile => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    }
    const compressedFile = await imageCompression(imageFile, options)
    return compressedFile
  }, [])

  const SubmitTask = useCallback(
    e => {
      const saveArray = postArray?.map(val => {
        const sectiondata = val.tm_task_dept_sec?.map(value => {
          const empdetails = val.employee?.filter(valemp =>
            valemp.dept_section === value.sec_id ? valemp.dept_section : 0
          )
          const obj = {
            tm_task_name: val.tm_task_name,
            tm_task_description: val.tm_task_description,
            tm_task_due_date: val.tm_task_due_date,
            tm_task_status: val.tm_task_status,
            tm_task_dept_sec: value.sec_id,
            tm_task_dept: value.dept_id,
            tm_project_slno: val.tm_project_slno === 0 ? null : val.tm_project_slno,
            tm_onhold_remarks: val.tm_onhold_remarks,
            tm_pending_remark: val.tm_pending_remark,
            tm_completed_remarks: val.tm_completed_remarks,
            tm_complete_date: val.tm_complete_date,
            main_task_slno: val.main_task_slno,
            create_user: id,
            employee: empdetails?.map(empdata => empdata.emp_id),
            files: val.files,
          }
          return obj
        })
        return sectiondata
      })
      const insertArry = saveArray.reduce((accumulator, currentArray) => {
        return accumulator.concat(currentArray)
      }, [])
      const InsertTask = async insertArry => {
        const result = await axioslogin.post('/TmAllDeptTask/insertTask', insertArry)
        return result.data
      }
      const InsertFile = async (selectFile, insertId) => {
        try {
          const formData = new FormData()
          formData.append('id', insertId)
          for (const file of selectFile) {
            if (file.type.startsWith('image')) {
              const compressedFile = await handleImageUpload(file)
              formData.append('files', compressedFile, compressedFile.name)
            } else {
              formData.append('files', file, file.name)
            }
          }
          // Use the Axios instance and endpoint that matches your server setup
          const uploadResult = await axioslogin.post('/TmFileUpload/uploadFile/task', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          return uploadResult.data
        } catch (error) {
          warningNotify('An error occurred during file upload.')
        }
      }
      insertArry?.map(val => {
        InsertTask(val).then(value => {
          const { success, insertId } = value
          if (success === 1) {
            if (val.files.length !== 0) {
              InsertFile(val.files, insertId).then(value => {
                const { success } = value
                if (success === 1) {
                  setMsg(1)
                  setTableCount(tableCount + 1)
                  CloseDept()
                } else {
                  setMsg(2)
                }
              })
            } else {
              setMsg(1)
              setTableCount(tableCount + 1)
              CloseDept()
            }
          } else {
          }
        })
        return 0
      })
    },
    [postArray, id, CloseDept, tableCount, setTableCount, handleImageUpload]
  )

  const changeDepmt = useCallback(e => {
    setchangeDept(1)
    setchangeDeptSec(1)
    setchangeEmp(1)
  }, [])

  const changeDepSec = useCallback(
    e => {
      dispatch(getDeptSections(deptIds))
      setchangeDeptSec(1)
      setchangeEmp(1)
    },
    [deptIds, dispatch]
  )

  const changeAssignee = useCallback(
    e => {
      setchangeEmp(1)
      dispatch(getMultHodInCharge(secIds))
    },
    [secIds, dispatch]
  )

  const isProjectOverdue = moment().isAfter(moment(dueDateProject))
  const tooltipText =
    "Due date cannot be added because the selected project is already overdue.To add tasks to this project, please update the project's due date."

  return (
    <Box>
      {addGoalFlag === 1 ? (
        <GoalCreation
          open={addGoalModalOpen}
          setTableCount={setTableCount}
          tableCount={tableCount}
          setAddGoalFlag={setAddGoalFlag}
          setaddGoalModalOpen={setaddGoalModalOpen}
        />
      ) : null}
      {addProjectFlag === 1 ? (
        <ProjectCreation
          open={addProjectModalOpen}
          setTableCount={setTableCount}
          tableCount={tableCount}
          setAddProjectFlag={setAddProjectFlag}
          setaddProjectlModalOpen={setaddProjectlModalOpen}
          dueDateGoal={dueDateGoal}
        />
      ) : null}
      <CssVarsProvider>
        <Modal
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
          open={open}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            pl: 1,
            borderRadius: 10,
          }}
        >
          <ModalDialog
            variant="outlined"
            sx={{ width: '95vw', height: '100vh', p: 0, overflow: 'auto' }}
          >
            <Box sx={{ flex: 1 }}>
              <Box sx={{ flex: 1, display: 'flex', borderColor: 'lightgray', mt: 1, mx: 2 }}>
                <Box sx={{ flex: 1, fontSize: 13, fontWeight: 600, color: 'grey' }}>
                  Create New{' '}
                </Box>
                <HighlightOffIcon
                  sx={{
                    height: 25,
                    width: 25,
                    cursor: 'pointer',
                    color: '#05445E',
                    '&:hover': { color: '#BA0F30' },
                  }}
                  onClick={handleClose}
                />
              </Box>
              <Box sx={{ flex: 1, height: 30, bgcolor: '#0C4160', mt: 1 }}></Box>
              <Box
                style={{
                  marginLeft: 55,
                  marginTop: '-0.99em',
                  paddingLeft: 2,
                  zIndex: 2,
                  backgroundColor: 'white',
                  borderRadius: 35,
                  position: 'absolute',
                  fontSize: '0.75em',
                }}
              >
                <AssignmentIcon sx={{ height: 50, width: 50, p: 1 }} />
              </Box>
              <Box
                sx={{
                  flex: 1,
                  mt: 4.8,
                  display: 'flex',
                  mx: 3,
                  p: 1,
                }}
              >
                <Box sx={{ flex: 2, display: 'flex' }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ pl: 1, fontWeight: 500, fontSize: 13, color: '#1D5183' }}>
                      <RadarIcon sx={{ p: 0.3, color: '#4C5270' }} />
                      Goal
                    </Typography>
                    <TmAllGoalsList
                      goalz={goalz}
                      setgoalz={setgoalz}
                      setdueDateGoal={setdueDateGoal}
                    />
                  </Box>
                  <Box sx={{ ml: 0.5, mt: 4.5 }} onClick={CreateGoal}>
                    <Tooltip title="Create New Goal">
                      <Chip
                        sx={{
                          cursor: 'pointer',
                          bgcolor: '#90CDD0 ',
                          color: 'black',
                          '&:hover': { bgcolor: '#77A7B0' },
                        }}
                      >
                        &nbsp;+ create&nbsp;
                      </Chip>
                    </Tooltip>
                  </Box>
                </Box>
                <Box sx={{ flex: 2, ml: 2.5, display: 'flex' }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ pl: 1, fontWeight: 500, fontSize: 13, color: '#1D5183' }}>
                      <AccountTreeSharpIcon
                        sx={{
                          p: 0.3,
                          color: '#4C5270',
                        }}
                      />
                      Project
                    </Typography>
                    <TmAllProjectList
                      projectz={projectz}
                      setprojectz={setprojectz}
                      setdueDateProject={setdueDateProject}
                    />
                  </Box>
                  <Box sx={{ ml: 0.5, mt: 4.5 }} onClick={CreateProject}>
                    <Tooltip title="Create New Project">
                      <Chip
                        sx={{
                          cursor: 'pointer',
                          bgcolor: '#90CDD0',
                          color: 'black',
                          '&:hover': { bgcolor: '#77A7B0' },
                        }}
                      >
                        {' '}
                        &nbsp;+ create&nbsp;
                      </Chip>
                    </Tooltip>
                  </Box>
                </Box>
              </Box>
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
                            <TmMultlipleDeptmant
                              department={department}
                              setDepartment={setDepartment}
                            />
                          </Box>
                        </>
                      ) : (
                        <>
                          <Box sx={{ display: 'flex', mt: 0.5 }}>
                            <Box sx={{ flex: 1, mr: 1 }}>
                              <Inputcomponent
                                type="text"
                                name="deptName"
                                value={deptName}
                                disabled
                              ></Inputcomponent>
                            </Box>
                            <Box sx={{ pt: 0.5 }}>
                              <Tooltip title="Change Department">
                                <ChangeCircleRoundedIcon
                                  sx={{ cursor: 'pointer' }}
                                  onClick={changeDepmt}
                                />
                              </Tooltip>
                            </Box>
                          </Box>
                        </>
                      )}
                    </>
                  ) : (
                    <Box sx={{ flex: 1 }}>
                      <TmMultlipleDeptmant department={department} setDepartment={setDepartment} />
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
                              deptSection={deptSection}
                              setDeptSection={setDeptSection}
                            />
                          </Box>
                        </>
                      ) : (
                        <>
                          <Box sx={{ display: 'flex', mt: 0.5 }}>
                            <Box sx={{ flex: 1, mr: 1 }}>
                              <Inputcomponent
                                type="text"
                                name="deptSecName"
                                value={deptSecName}
                                disabled
                              ></Inputcomponent>
                            </Box>
                            <Box sx={{ pt: 0.5 }}>
                              <Tooltip title="Change Department Section">
                                <ChangeCircleRoundedIcon
                                  sx={{ cursor: 'pointer' }}
                                  onClick={changeDepSec}
                                />
                              </Tooltip>
                            </Box>
                          </Box>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <Box sx={{ flex: 1 }}>
                        <TmMultipleDeptSectionList
                          deptSection={deptSection}
                          setDeptSection={setDeptSection}
                        />
                      </Box>
                    </>
                  )}
                </Box>
                <Box sx={{ flex: 1.8, ml: 3, display: 'flex' }}>
                  <Box sx={{ pt: 5 }}>
                    <Checkbox
                      size="md"
                      color="warning"
                      checked={checkAllEmployee}
                      onChange={EmployeeCheckbox}
                    />
                  </Box>
                  <Typography
                    sx={{
                      fontSize: 10,
                      pt: 0.5,
                      pl: 1,
                      width: '80px',
                    }}
                  >
                    Select All HODs/Incharges Under Selected Section
                  </Typography>
                  <Typography
                    sx={{ pt: 3, fontWeight: 600, fontSize: 14, px: 2.5, color: 'black' }}
                  >
                    (or)
                  </Typography>
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
                                  <TmMultiHodInchargeSelect
                                    value={assignees}
                                    setValue={setAssignees}
                                  />
                                </Box>
                              </>
                            ) : (
                              <>
                                <Box sx={{ display: 'flex', mt: 0.8 }}>
                                  <Box sx={{ flex: 1, mr: 1 }}>
                                    <Inputcomponent
                                      type="text"
                                      name="empName"
                                      value={empName}
                                      disabled
                                    ></Inputcomponent>
                                  </Box>
                                  <Box sx={{ pt: 0.5 }}>
                                    <Tooltip title="Change Assignees">
                                      <ChangeCircleRoundedIcon
                                        sx={{ cursor: 'pointer' }}
                                        onClick={changeAssignee}
                                      />
                                    </Tooltip>
                                  </Box>
                                </Box>
                              </>
                            )}
                          </>
                        ) : (
                          <Box sx={{ flex: 1, mt: 0.8 }}>
                            <TmMultiHodInchargeSelect value={assignees} setValue={setAssignees} />
                          </Box>
                        )}
                      </>
                    ) : (
                      <>
                        <Box sx={{ flex: 1, mr: 1 }}>
                          <Inputcomponent
                            type="text"
                            placeholder={'select assignees'}
                            disabled
                          ></Inputcomponent>
                        </Box>
                      </>
                    )}
                  </Box>
                </Box>
              </Box>
              <Box sx={{ flex: 1, display: 'flex', mx: 10, my: 5 }}>
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
                            borderColor: 'neutral.outlinedHoverBorder',
                          },
                          '&::before': {
                            border: '1px solid var(--Textarea-focusedHighlight)',
                            transform: 'scaleX(0)',
                            left: 0,
                            right: 0,
                            bottom: '-2px',
                            top: 'unset',
                            transition: 'transform .15s cubic-bezier(0.1,0.9,0.2,1)',
                            borderRadius: 0,
                          },
                          '&:focus-within::before': {
                            transform: 'scaleX(1)',
                          },
                        }}
                        name="tm_task_name"
                        value={tm_task_name}
                        onChange={e => TaskMastUpdate(e)}
                      />
                    </Box>
                    <Box sx={{ flex: 0.3, mt: 0.2, mx: 1 }}>
                      <Typography sx={{ pl: 1, fontWeight: 500, fontSize: 13, color: '#1D5183' }}>
                        <AssignmentSharpIcon sx={{ p: 0.2, color: '#4C5270' }} />
                        Duedate<span style={{ color: '#74112F', fontSize: 15 }}>*</span>
                      </Typography>
                      {projectz !== 0 ? (
                        <>
                          <Tooltip title={tooltipText} color="warning" sx={{ width: 400 }}>
                            <span>
                              <Inputcomponent
                                type="datetime-local"
                                name="tm_task_due_date"
                                value={tm_task_due_date}
                                slotProps={{
                                  input: {
                                    min: moment(new Date()).format('YYYY-MM-DDTHH:mm'),
                                    max: moment(new Date(dueDateProject)).format(
                                      'YYYY-MM-DDTHH:mm'
                                    ),
                                  },
                                }}
                                onchange={TaskMastUpdate}
                                disabled={isProjectOverdue}
                              />
                            </span>
                          </Tooltip>
                        </>
                      ) : (
                        <>
                          <Inputcomponent
                            type="datetime-local"
                            name="tm_task_due_date"
                            value={tm_task_due_date}
                            slotProps={{
                              input: {
                                min: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                                max: moment(new Date(dueDateProject)).format('YYYY-MM-DD HH:mm:ss'),
                              },
                            }}
                            onchange={TaskMastUpdate}
                          />
                        </>
                      )}
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
                            borderColor: 'neutral.outlinedHoverBorder',
                          },
                          '&::before': {
                            border: '1px solid var(--Textarea-focusedHighlight)',
                            transform: 'scaleX(0)',
                            left: 0,
                            right: 0,
                            bottom: '-2px',
                            top: 'unset',
                            transition: 'transform .15s cubic-bezier(0.1,0.9,0.2,1)',
                            borderRadius: 0,
                          },
                          '&:focus-within::before': {
                            transform: 'scaleX(1)',
                          },
                        }}
                        name="tm_task_description"
                        value={tm_task_description}
                        onChange={e => TaskMastUpdate(e)}
                      />
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      flex: 1,
                      border: 1,
                      mx: 1,
                      mt: 1,
                      borderColor: '#8E8A92',
                      py: 1.5,
                      borderStyle: 'dashed',
                      fontWeight: 500,
                      display: 'flex',
                    }}
                  >
                    <Box
                      sx={{
                        color: '#0000FF',
                        cursor: 'pointer',
                        '&:hover': { color: '#000C66' },
                        textAlign: 'center',
                        width: 165,
                        border: 0.1,
                        mx: 0.5,
                        borderRadius: 5,
                        borderColor: '#E4E5E8',
                      }}
                    >
                      <label htmlFor="file-input">
                        <AttachmentIcon
                          sx={{
                            color: '#0000FF',
                            cursor: 'pointer',
                            '&:hover': { color: '#000C66' },
                          }}
                        />
                        <u>Choose File</u>
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
                    </Box>
                    <Box sx={{ display: 'flex', flex: 1, overflowX: 'auto', mx: 0.5 }}>
                      {selectFile &&
                        selectFile.map((file, index) => (
                          <Box key={index} sx={{}}>
                            <Chip sx={{ bgcolor: '#B7CFDC', width: '100%', ml: 0.5 }}>
                              {file.name}
                              <CloseIcon
                                sx={{
                                  pl: 0.3,
                                  pb: 0.3,
                                  height: 20,
                                  width: 20,
                                  cursor: 'pointer',
                                  color: '#4D0011',
                                  '&:hover': { color: '#BA0F30' },
                                }}
                                onClick={() => handleRemoveFile(index)}
                              />
                            </Chip>
                          </Box>
                        ))}
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ flex: 0.1, pt: 4, px: 1, mx: 0.5, mt: 3, borderRadius: 5 }}>
                  <Tooltip title={'Add More Task'}>
                    <Avatar sx={{ bgcolor: '#E4D4C8' }}>
                      <AddCircleIcon
                        sx={{
                          color: '#523A28',
                          cursor: 'pointer',
                          '&:hover': { color: '#5C4E4E' },
                          height: 30,
                          width: 30,
                        }}
                        onClick={addTask}
                      />
                    </Avatar>
                  </Tooltip>
                </Box>
              </Box>
              <Box sx={{ mt: 4, mx: 3 }}>
                <Divider
                  sx={{
                    '--Divider-childPosition': `5%`,
                    fontWeight: 600,
                    fontSize: 18,
                    color: '#003B73',
                    mb: 1,
                    mt: 2,
                    mx: 1,
                  }}
                >
                  Task List
                </Divider>
              </Box>

              <Box
                sx={{
                  flex: 1,
                  mx: 4,
                  height: 45,
                  mt: 0.5,
                  display: 'flex',
                  borderBottom: 1,
                  borderTop: 1,
                  borderColor: 'lightgray',
                  pt: 1.5,
                  bgcolor: 'white',
                }}
              >
                <Box sx={{ width: 30, pl: 1.7, fontWeight: 600, color: '#444444', fontSize: 12 }}>
                  #
                </Box>
                <Box
                  sx={{
                    width: 100,
                    textAlign: 'center',
                    fontWeight: 600,
                    color: '#444444',
                    fontSize: 12,
                  }}
                >
                  Action
                </Box>
                <Box sx={{ width: 800, fontWeight: 600, color: '#444444', fontSize: 12 }}>
                  Task Name
                </Box>
                <Box sx={{ width: 250, fontWeight: 600, color: '#444444', fontSize: 12, pl: 1 }}>
                  Duedate
                </Box>
                <Box sx={{ width: 400, fontWeight: 600, color: '#444444', fontSize: 12, pl: 1 }}>
                  Department
                </Box>
                <Box sx={{ width: 400, fontWeight: 600, color: '#444444', fontSize: 12, pl: 0.8 }}>
                  Department Section
                </Box>
                <Box sx={{ width: 450, fontWeight: 600, color: '#444444', fontSize: 12 }}>
                  Assignees
                </Box>
                <Box sx={{ width: 800, fontWeight: 600, color: '#444444', fontSize: 12 }}>
                  Description
                </Box>
              </Box>
              <Box>
                {arry?.map((val, index) => {
                  return (
                    <Box
                      key={index}
                      sx={{
                        flex: 1,
                        display: 'flex',
                        mt: 0.3,
                        mx: 4,
                        borderBottom: 2,
                        borderColor: 'lightgrey',
                        minHeight: 30,
                        background: 'white',
                        pt: 0.5,
                      }}
                    >
                      <Box
                        sx={{ width: 30, pl: 1.7, fontWeight: 600, color: 'grey', fontSize: 12 }}
                      >
                        {index + 1}
                      </Box>
                      <Box
                        sx={{
                          width: 100,
                          textAlign: 'center',
                          fontWeight: 600,
                          color: 'grey',
                          fontSize: 12,
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
                          pl: 1,
                        }}
                      >
                        <Chip sx={{ bgcolor: '#EFEDC6', fontSize: 12, mb: 0.2 }}>
                          {val.tm_task_name}
                        </Chip>
                      </Box>
                      <Box
                        sx={{
                          width: 250,
                          fontWeight: 600,
                          color: 'grey',
                          fontSize: 12,
                          textTransform: 'capitalize',
                          pl: 1,
                        }}
                      >
                        <Chip sx={{ bgcolor: '#EFEDC6', fontSize: 12 }}>
                          {format(new Date(val.tm_task_due_date), 'dd-MM-yyyy HH:mm:ss')}
                        </Chip>
                      </Box>
                      <Box
                        sx={{
                          width: 400,
                          fontWeight: 600,
                          color: 'grey',
                          textTransform: 'capitalize',
                          pl: 1,
                        }}
                      >
                        {val.tm_task_dept &&
                          val.tm_task_dept.map(value => {
                            return (
                              <Box key={value.dept_id}>
                                <Chip sx={{ bgcolor: '#EFEDC6', mb: 0.2, fontSize: 12 }}>
                                  {' '}
                                  {value.dept_name}
                                </Chip>
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
                          pl: 1,
                        }}
                      >
                        {' '}
                        {val.tm_task_dept_sec &&
                          val.tm_task_dept_sec.map(value => {
                            return (
                              <Box key={value.sec_id}>
                                <Chip sx={{ bgcolor: '#EFEDC6', fontSize: 12, mb: 0.2 }}>
                                  {value.sec_name}
                                </Chip>
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
                          pl: 1,
                        }}
                      >
                        {val.employee &&
                          val.employee.map(value => {
                            return (
                              <Box key={value.emp_id}>
                                {' '}
                                <Chip sx={{ bgcolor: '#EFEDC6', fontSize: 12, mb: 0.2 }}>
                                  {value.em_name}
                                </Chip>
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
                          pl: 1,
                        }}
                      >
                        <Chip sx={{ bgcolor: '#EFEDC6', fontSize: 12, mb: 0.2 }}>
                          {val.tm_task_description}
                        </Chip>
                      </Box>
                    </Box>
                  )
                })}
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                height: 60,
                borderTop: 1,
                borderColor: 'lightgrey',
                pt: 2,
              }}
            >
              <Box sx={{ mr: 0.5, fontSize: 20, cursor: 'pointer' }}>
                <CssVarsProvider>
                  <Button
                    variant="plain"
                    onClick={SubmitTask}
                    sx={{ fontSize: 16, color: '#004F76' }}
                  >
                    Create
                  </Button>
                </CssVarsProvider>
              </Box>
              <Box sx={{ mr: 2, cursor: 'pointer' }}>
                <CssVarsProvider>
                  <Button
                    variant="plain"
                    onClick={handleClose}
                    sx={{ fontSize: 16, color: '#004F76' }}
                  >
                    {' '}
                    Cancel
                  </Button>
                </CssVarsProvider>
              </Box>
            </Box>
          </ModalDialog>
        </Modal>
      </CssVarsProvider>
    </Box>
  )
}
export default memo(CreateTaskInAllDept)
