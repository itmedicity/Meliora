import { Box, FormLabel, Modal, ModalDialog, Tooltip, Typography } from '@mui/joy'
import React, { memo, useCallback, useEffect, useState } from 'react'
import AssignmentIcon from '@mui/icons-material/Assignment'
import { axioslogin } from 'src/views/Axios/Axios'
import PersonIcon from '@mui/icons-material/Person'
import MainTaskProgress from './MainTaskProgress'
import TmProjectCircularProgress from '../DashProjectTaskList/TmProjectCircularProgress'
import AlignHorizontalRightRoundedIcon from '@mui/icons-material/AlignHorizontalRightRounded'
import EventNoteRoundedIcon from '@mui/icons-material/EventNoteRounded'
import CountDowncomponent from '../CountDown/CountDowncomponent'
import AssignmentSharpIcon from '@mui/icons-material/AssignmentSharp'
import TaskViewsUnderPorject from './TaskViewsUnderPorject'
import AccountTreeSharpIcon from '@mui/icons-material/AccountTreeSharp'
import ListSharpIcon from '@mui/icons-material/ListSharp'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import SubTaskUnderTaskModal from './SubTaskUnderTaskModal'

const AllTaskListUnderProject = ({
  open,
  employeeData,
  setModalFlag,
  setModalOpen,
  allEmpTask,
}) => {
  const { empname, emslno, TC, TT } = employeeData
  const employee = allEmpTask.find(emp => emp.emslno === emslno)
  const deptSec = employee ? employee.sec_name : 'null'
  let capEmpName = empname
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
  let depmtSec = deptSec
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
  const [empProject, setEmpProject] = useState([])
  const [taskList, setTaskList] = useState([])
  const [taskUnderPjt, setTaskUnderPjt] = useState([])
  const [SubTaskmodalFlag, setSubTaskmodalFlag] = useState(0)
  const [SubTaskmodalOpen, setSubTaskmodalOpen] = useState(false)
  const [subtaskvalues, setsubtaskvalues] = useState([])
  const [prjmodalFlag, setprjModalFlag] = useState(0)
  const [prjmodalOpen, setprjModalOpen] = useState(false)

  const handleClose = useCallback(() => {
    setModalFlag(0)
    setModalOpen(false)
    setEmpProject([])
  }, [setModalFlag, setModalOpen, setEmpProject])

  useEffect(() => {
    const getAllProjectTask = async () => {
      const result = await axioslogin.get(`/TmTableView/EmpProjectTask/${emslno}`)
      const { success, data } = result.data
      if (success === 2) {
        setEmpProject(data)
      } else {
        setEmpProject([])
      }
    }
    getAllProjectTask(emslno)
  }, [emslno])

  useEffect(() => {
    const getAllEmployeeTask = async () => {
      const result = await axioslogin.get(`/TmTableView/allEmployeeTaskList/${emslno}`)
      const { success, data } = result.data
      if (success === 2) {
        setTaskList(data)
      } else {
        setTaskList([])
      }
    }
    getAllEmployeeTask(emslno)
  }, [emslno])
  const isPastDue = tm_task_due_date => {
    const today = new Date()
    const due = new Date(tm_task_due_date)
    return due < today
  }

  const openProjectModal = useCallback(value => {
    setTaskUnderPjt(value)
    setprjModalFlag(1)
    setprjModalOpen(true)
  }, [])

  const openSubtaskModal = useCallback(value => {
    setsubtaskvalues(value)
    setSubTaskmodalFlag(1)
    setSubTaskmodalOpen(true)
  }, [])

  return (
    <Box>
      {prjmodalFlag === 1 ? (
        <TaskViewsUnderPorject
          prjmodalOpen={prjmodalOpen}
          setprjModalOpen={setprjModalOpen}
          capEmpName={capEmpName}
          depmtSec={depmtSec}
          setprjModalFlag={setprjModalFlag}
          taskUnderPjt={taskUnderPjt}
        />
      ) : null}

      {SubTaskmodalFlag === 1 ? (
        <SubTaskUnderTaskModal
          SubTaskmodalOpen={SubTaskmodalOpen}
          setSubTaskmodalOpen={setSubTaskmodalOpen}
          capEmpName={capEmpName}
          depmtSec={depmtSec}
          setSubTaskmodalFlag={setSubTaskmodalFlag}
          subtaskvalues={subtaskvalues}
          emp_no={emslno}
        />
      ) : null}
      <Modal open={open}>
        <ModalDialog
          sx={{
            width: '90vw',
            maxHeight: '100vh',
            minHeight: '30vh',
            bgcolor: 'white',
          }}
        >
          <Box>
            <Box sx={{ height: 35, borderBottom: 1, borderColor: '#52688F', display: 'flex' }}>
              <Box sx={{ flex: 1, fontWeight: 600, color: '#003060' }}>
                <AssignmentIcon sx={{ color: '#52688F' }} />
                &nbsp;TASK LIST
              </Box>
              <Box>
                <Tooltip title="Close">
                  <HighlightOffIcon
                    onClick={handleClose}
                    sx={{ cursor: 'pointer', color: '#52688F', '&:hover': { color: '#A0E7E5' } }}
                  />
                </Tooltip>
              </Box>
            </Box>
            <Box sx={{ display: 'flex' }}>
              <Box
                sx={{
                  fontSize: 30,
                  fontFamily: 'Georgia',
                  pt: 1,
                  color: '#0C2D48',
                  flex: 4,
                  pl: 1,
                }}
              >
                <PersonIcon sx={{ height: 32, width: 32 }} />
                {capEmpName}
                <Typography sx={{ color: '#0C2D48', fontFamily: 'Georgia', fontSize: 18, pl: 1 }}>
                  {depmtSec}
                </Typography>
              </Box>
              <Box
                sx={{
                  flex: 1,
                  fontSize: 18,
                  display: 'flex',
                  justifyContent: 'flex-end',
                  pt: 5,
                  color: '#3D2E2B',
                }}
              >
                Completed task({TC})
              </Box>
              <Box
                sx={{
                  flex: 1,
                  fontSize: 18,
                  display: 'flex',
                  justifyContent: 'flex-start',
                  pl: 2,
                  pt: 5,
                  color: '#3D2E2B',
                }}
              >
                Total task({TT})
              </Box>
            </Box>
            <Box sx={{ display: 'flex', mt: 4, mx: 2 }}>
              <Box
                sx={{
                  flex: 1,
                  fontFamily: 'Georgia',
                  pl: 2,
                  bgcolor: '#78909c',
                  borderRadius: 20,
                  color: 'white',
                  fontSize: 20,
                }}
              >
                <AccountTreeSharpIcon sx={{ color: 'white' }} /> Projects
              </Box>
              <Box sx={{ flex: 6 }}></Box>
            </Box>
            <Box sx={{ maxHeight: '68vh', overflow: 'auto' }}>
              <Box sx={{ mt: 0.8 }}>
                {empProject &&
                  empProject.map(val => {
                    return (
                      <Box
                        key={val.tm_project_slno}
                        sx={{
                          flex: 1,
                          mx: 3,
                          bgcolor: 'white',
                          maxHeight: 90,
                          display: 'flex',
                          mb: 0.5,
                          borderBottom: 1,
                          borderColor: '#BDC6D9',
                          '&:hover': {
                            boxShadow: '1px 1px 3px',
                            bgcolor: '#E9EAEC',
                          },
                        }}
                        onClick={() => openProjectModal(val)}
                      >
                        <Box sx={{ px: 0.6, pt: 1.2 }}>
                          <AlignHorizontalRightRoundedIcon
                            sx={{ width: 15, height: 15, color: '#435D84' }}
                          />
                        </Box>
                        <Box sx={{ flex: 3, pt: 1.5 }}>
                          {val.tm_project_status === 1 ? (
                            <FormLabel
                              sx={{
                                fontSize: 12,
                                textTransform: 'capitalize',
                                cursor: 'grab',
                              }}
                            >
                              {val.tm_project_name}
                            </FormLabel>
                          ) : (
                            <FormLabel
                              sx={{
                                fontSize: 12,
                                textTransform: 'capitalize',
                                cursor: 'grab',
                                color: isPastDue(val.tm_project_duedate) ? '#B32800' : 'black',
                              }}
                            >
                              {val.tm_project_name}
                            </FormLabel>
                          )}
                        </Box>
                        <Box sx={{ flex: 1, p: 0.5 }}>
                          <Tooltip>
                            {val.tm_project_status !== 1 ? (
                              <Box
                                sx={{
                                  bgcolor: '#EAEAEA',
                                  borderRadius: 15,
                                  mb: 0.5,
                                  width: 150,
                                  pl: 1,
                                  fontSize: 12,
                                }}
                              >
                                <CountDowncomponent DueDates={val.tm_project_duedate} />
                              </Box>
                            ) : (
                              <Box
                                sx={{
                                  bgcolor: '#EAEAEA',
                                  borderRadius: 15,
                                  mb: 0.5,
                                  width: 150,
                                  pl: 5,
                                  color: 'darkgreen',
                                  fontSize: 12,
                                }}
                              >
                                Completed
                              </Box>
                            )}
                          </Tooltip>
                        </Box>
                        <Box sx={{ flex: 1, pt: 1.5 }}>
                          <Tooltip title="Project Created Date">
                            {val.tm_project_status === 1 ? (
                              <FormLabel
                                sx={{
                                  fontSize: 12,
                                  textTransform: 'capitalize',
                                  cursor: 'grab',
                                }}
                              >
                                <EventNoteRoundedIcon
                                  fontSize="small"
                                  sx={{ mt: 0.2, mr: 0.2, color: '#435D84' }}
                                />{' '}
                                {val.create_date}
                              </FormLabel>
                            ) : (
                              <FormLabel
                                sx={{
                                  fontSize: 12,
                                  textTransform: 'capitalize',
                                  cursor: 'grab',
                                  color: isPastDue(val.tm_project_duedate) ? '#B32800' : 'black',
                                }}
                              >
                                <EventNoteRoundedIcon
                                  fontSize="small"
                                  sx={{ mt: 0.2, mr: 0.2, color: '#435D84' }}
                                />{' '}
                                {val.create_date}
                              </FormLabel>
                            )}
                          </Tooltip>
                        </Box>
                        <Box sx={{ flex: 1, pt: 1.5 }}>
                          <Tooltip title="Project due Date">
                            {val.tm_project_status === 1 ? (
                              <FormLabel
                                sx={{
                                  fontSize: 12,
                                  flex: 1,
                                  textTransform: 'capitalize',
                                  cursor: 'grab',
                                }}
                              >
                                <EventNoteRoundedIcon
                                  fontSize="small"
                                  sx={{ mt: 0.2, mr: 0.2, color: '#435D84' }}
                                />{' '}
                                {val.tm_project_duedate}
                              </FormLabel>
                            ) : (
                              <FormLabel
                                sx={{
                                  fontSize: 12,
                                  flex: 1,
                                  textTransform: 'capitalize',
                                  cursor: 'grab',
                                  color: isPastDue(val.tm_project_duedate) ? '#B32800' : 'black',
                                }}
                              >
                                <EventNoteRoundedIcon
                                  fontSize="small"
                                  sx={{ mt: 0.2, mr: 0.2, color: '#435D84' }}
                                />{' '}
                                {val.tm_project_duedate}
                              </FormLabel>
                            )}
                          </Tooltip>
                        </Box>
                        <Box sx={{ pr: 0.4 }}>
                          <TmProjectCircularProgress val={val} />
                        </Box>
                      </Box>
                    )
                  })}
              </Box>
              {taskList.length !== 0 ? (
                <Box sx={{ display: 'flex', mt: 2, mx: 2 }}>
                  <Box
                    sx={{
                      flex: 1.5,
                      fontFamily: 'Georgia',
                      pl: 2,
                      bgcolor: '#78909c',
                      borderRadius: 20,
                      color: 'white',
                      fontSize: 20,
                    }}
                  >
                    <AssignmentSharpIcon sx={{ color: 'white' }} /> Other Task Without Projects
                  </Box>
                  <Box sx={{ flex: 3 }}></Box>
                </Box>
              ) : null}
              <Box sx={{ pl: 1.5, mt: 0.8 }}>
                {taskList &&
                  taskList.map(val => {
                    return (
                      <Box
                        key={val.tm_task_slno}
                        sx={{
                          flex: 1,
                          mx: 1,
                          bgcolor: 'white',
                          maxHeight: 100,
                          display: 'flex',
                          borderBottom: 1,
                          borderColor: '#BDC6D9',
                          cursor: 'grab',
                          '&:hover': {
                            boxShadow: '1px 0px 5px',
                            bgcolor: '#E9EAEC',
                          },
                        }}
                        onClick={() => openSubtaskModal(val)}
                      >
                        <Box sx={{ px: 0.6, pt: 1.2 }}>
                          <ListSharpIcon sx={{ width: 20, height: 20, color: '#435D84' }} />
                        </Box>
                        <Box sx={{ flex: 3.5, pt: 1.5 }}>
                          {val.tm_task_status === 1 ? (
                            <FormLabel
                              sx={{
                                fontSize: 12,
                                flex: 3,
                                textTransform: 'capitalize',
                              }}
                            >
                              {val.tm_task_name}
                            </FormLabel>
                          ) : (
                            <FormLabel
                              sx={{
                                fontSize: 12,
                                flex: 3,
                                textTransform: 'capitalize',
                                color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'black',
                              }}
                            >
                              {val.tm_task_name}
                            </FormLabel>
                          )}
                        </Box>
                        <Box sx={{ flex: 1, py: 0.5 }}>
                          <Tooltip>
                            {val.tm_task_status !== 1 ? (
                              <Box
                                sx={{
                                  bgcolor: '#EAEAEA',
                                  borderRadius: 15,
                                  mb: 0.5,
                                  width: 150,
                                  pl: 1,
                                  fontSize: 12,
                                }}
                              >
                                <CountDowncomponent DueDates={val.tm_task_due_date} />
                              </Box>
                            ) : (
                              <Box
                                sx={{
                                  bgcolor: '#EAEAEA',
                                  borderRadius: 15,
                                  mb: 0.5,
                                  width: 150,
                                  pl: 5,
                                  color: 'darkgreen',
                                  fontSize: 12,
                                }}
                              >
                                Completed
                              </Box>
                            )}
                          </Tooltip>
                        </Box>
                        <Box sx={{ flex: 1, pt: 1.5 }}>
                          <Tooltip title="Task Created Date">
                            {val.tm_task_status === 1 ? (
                              <FormLabel
                                sx={{
                                  fontSize: 12,
                                  flex: 0.8,
                                  textTransform: 'capitalize',
                                }}
                              >
                                <EventNoteRoundedIcon
                                  fontSize="small"
                                  sx={{ mt: 0.2, mr: 0.2, color: '#435D84' }}
                                />{' '}
                                {val.create_date}
                              </FormLabel>
                            ) : (
                              <FormLabel
                                sx={{
                                  fontSize: 12,
                                  flex: 0.8,
                                  textTransform: 'capitalize',
                                  color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'black',
                                }}
                              >
                                <EventNoteRoundedIcon
                                  fontSize="small"
                                  sx={{ mt: 0.2, mr: 0.2, color: '#435D84' }}
                                />{' '}
                                {val.create_date}
                              </FormLabel>
                            )}
                          </Tooltip>
                        </Box>
                        <Box sx={{ flex: 1, pt: 1.5 }}>
                          <Tooltip title="Task Due Date">
                            {val.tm_task_status === 1 ? (
                              <FormLabel
                                sx={{
                                  fontSize: 12,
                                  flex: 0.8,
                                  textTransform: 'capitalize',
                                }}
                              >
                                <EventNoteRoundedIcon
                                  fontSize="small"
                                  sx={{ mt: 0.2, mr: 0.2, color: '#435D84' }}
                                />{' '}
                                {val.tm_task_due_date}
                              </FormLabel>
                            ) : (
                              <FormLabel
                                sx={{
                                  fontSize: 12,
                                  flex: 0.8,
                                  textTransform: 'capitalize',
                                  color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'black',
                                }}
                              >
                                <EventNoteRoundedIcon
                                  fontSize="small"
                                  sx={{ mt: 0.2, mr: 0.2, color: '#435D84' }}
                                />{' '}
                                {val.tm_task_due_date}
                              </FormLabel>
                            )}
                          </Tooltip>
                        </Box>
                        <Box sx={{ pr: 0.4 }}>
                          <MainTaskProgress val={val} />
                        </Box>
                      </Box>
                    )
                  })}
              </Box>
            </Box>
          </Box>
        </ModalDialog>
      </Modal>
    </Box>
  )
}

export default memo(AllTaskListUnderProject)
