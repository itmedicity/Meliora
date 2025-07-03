import React, { memo, useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Box, FormLabel, Tooltip } from '@mui/joy'
import _ from 'underscore'
import { axioslogin } from 'src/views/Axios/Axios'
import TmProjectCircularProgress from '../DashProjectTaskList/TmProjectCircularProgress'
import MainTaskProgress from '../DashEmpTaskList/MainTaskProgress'
import CountDowncomponent from '../CountDown/CountDowncomponent'
import EventNoteRoundedIcon from '@mui/icons-material/EventNoteRounded'
import AccountTreeSharpIcon from '@mui/icons-material/AccountTreeSharp'
import TaskViewsUnderPorject from '../DashEmpTaskList/TaskViewsUnderPorject'
import AlignHorizontalRightRoundedIcon from '@mui/icons-material/AlignHorizontalRightRounded'
import ListSharpIcon from '@mui/icons-material/ListSharp'
import AssignmentSharpIcon from '@mui/icons-material/AssignmentSharp'
import SubTaskUnderTaskModal from '../DashEmpTaskList/SubTaskUnderTaskModal'

const MyProgressView = () => {
  const id = useSelector(state => state.LoginUserData.empid, _.isEqual)
  const empName = useSelector(state => state.LoginUserData.empname, _.isEqual)
  let capEmpName = empName
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
  const [empProject, setEmpProject] = useState([])
  const [taskList, setTaskList] = useState([])
  const [taskUnderPjt, setTaskUnderPjt] = useState([])
  const [prjmodalFlag, setprjModalFlag] = useState(0)
  const [prjmodalOpen, setprjModalOpen] = useState(false)
  const [SubTaskmodalFlag, setSubTaskmodalFlag] = useState(0)
  const [SubTaskmodalOpen, setSubTaskmodalOpen] = useState(false)
  const [subtaskvalues, setsubtaskvalues] = useState([])

  useEffect(() => {
    const getAllProjectTask = async () => {
      const result = await axioslogin.get(`/TmTableView/EmpProjectTask/${id}`)
      const { success, data } = result.data
      if (success === 2) {
        setEmpProject(data)
      } else {
        setEmpProject([])
      }
    }
    getAllProjectTask(id)
  }, [id])

  useEffect(() => {
    const getAllEmployeeTask = async () => {
      const result = await axioslogin.get(`/TmTableView/allEmployeeTaskList/${id}`)
      const { success, data } = result.data
      if (success === 2) {
        setTaskList(data)
      } else {
        setTaskList([])
      }
    }
    getAllEmployeeTask(id)
  }, [id])

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
    <Box sx={{ maxHeight: '64vh', overflow: 'auto', p: 0.5 }}>
      {prjmodalFlag === 1 ? (
        <TaskViewsUnderPorject
          prjmodalOpen={prjmodalOpen}
          setprjModalOpen={setprjModalOpen}
          setprjModalFlag={setprjModalFlag}
          taskUnderPjt={taskUnderPjt}
          capEmpName={capEmpName}
        />
      ) : null}
      {SubTaskmodalFlag === 1 ? (
        <SubTaskUnderTaskModal
          SubTaskmodalOpen={SubTaskmodalOpen}
          setSubTaskmodalOpen={setSubTaskmodalOpen}
          capEmpName={capEmpName}
          setSubTaskmodalFlag={setSubTaskmodalFlag}
          subtaskvalues={subtaskvalues}
          emp_no={id}
        />
      ) : null}
      <Box sx={{ height: 25, fontSize: 14, fontWeight: 500, mt: 1, color: '#5C5359', width: 170 }}>
        <AccountTreeSharpIcon fontSize="sm" sx={{ color: '#92443A' }} /> <u>Projects </u>{' '}
      </Box>
      <Box>
        {empProject.length !== 0 ? (
          <Box sx={{ mt: 0.5, minHeight: 100 }}>
            <Box sx={{ flex: 1, borderBottom: 1, borderBottomColor: '#BDC6D9', mx: 3 }}></Box>
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
                      borderBottom: 1,
                      borderBottomColor: '#BDC6D9',
                      '&:hover': {
                        boxShadow: '1px 1px 3px',
                        bgcolor: '#E9EAEC',
                      },
                    }}
                    onClick={() => openProjectModal(val)}
                  >
                    <Box sx={{ px: 0.6, pt: 0.5 }}>
                      <AlignHorizontalRightRoundedIcon fontSize="small" sx={{ color: '#435D84' }} />
                    </Box>
                    <Box sx={{ flex: 2.5, pt: 1 }}>
                      {val.tm_project_status === 1 ? (
                        <FormLabel
                          sx={{
                            fontSize: 12,
                            textTransform: 'capitalize',
                            cursor: 'pointer',
                          }}
                        >
                          {val.tm_project_name}
                        </FormLabel>
                      ) : (
                        <FormLabel
                          sx={{
                            fontSize: 12,
                            textTransform: 'capitalize',
                            cursor: 'pointer',
                            color: isPastDue(val.tm_project_duedate) ? '#B32800' : 'black',
                          }}
                        >
                          {val.tm_project_name}
                        </FormLabel>
                      )}
                    </Box>
                    <Box sx={{ flex: 1, pt: 0.5, pl: 2 }}>
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
                    </Box>
                    <Box sx={{ flex: 1, pt: 1, pl: 2 }}>
                      <Tooltip title="Project Created Date">
                        {val.tm_project_status === 1 ? (
                          <FormLabel
                            sx={{
                              fontSize: 12,
                              textTransform: 'capitalize',
                              cursor: 'pointer',
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
                              cursor: 'pointer',
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
                    <Box sx={{ flex: 1, pt: 1, pl: 2 }}>
                      <Tooltip title="Project due Date">
                        {val.tm_project_status === 1 ? (
                          <FormLabel
                            sx={{
                              fontSize: 12,
                              flex: 1,
                              textTransform: 'capitalize',
                              cursor: 'pointer',
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
                              cursor: 'pointer',
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
                    <Box sx={{ pt: 1, pr: 1 }}>
                      <TmProjectCircularProgress val={val} />
                    </Box>
                  </Box>
                )
              })}
          </Box>
        ) : (
          <Box
            sx={{
              textAlign: 'center',
              pt: 3,
              height: 150,
              fontWeight: 700,
              fontSize: 30,
              color: '#C7C8CB',
            }}
          >
            No Task assigned Under a Project!
          </Box>
        )}
      </Box>
      <Box sx={{ height: 25, fontSize: 14, fontWeight: 500, mt: 1, color: '#5C5359', width: 170 }}>
        <AssignmentSharpIcon fontSize="sm" sx={{ color: '#92443A' }} />{' '}
        <u> Task without Projects </u>{' '}
      </Box>
      <Box></Box>
      {taskList.length !== 0 ? (
        <Box sx={{ mt: 0.5, flex: 1 }}>
          <Box sx={{ flex: 1, borderBottom: 1, borderBottomColor: '#BDC6D9', mx: 3 }}></Box>
          <Box sx={{ minHeight: 250 }}>
            {taskList &&
              taskList.map((val, index) => {
                return (
                  <Box
                    key={val.tm_task_slno}
                    sx={{
                      flex: 1,
                      mx: 3,
                      bgcolor: 'white',
                      maxHeight: 90,
                      display: 'flex',
                      borderBottom: 1,
                      borderBottomColor: '#BDC6D9',
                      '&:hover': {
                        boxShadow: '1px 1px 3px',
                        bgcolor: '#E9EAEC',
                      },
                    }}
                    onClick={() => openSubtaskModal(val)}
                  >
                    <Box sx={{ px: 0.6, pt: 0.5 }}>
                      <ListSharpIcon fontSize="small" sx={{ color: '#435D84' }} />
                    </Box>
                    <Box sx={{ flex: 2.5, pt: 1 }}>
                      {val.tm_task_status === 1 ? (
                        <FormLabel
                          sx={{
                            fontSize: 13,
                            flex: 3,
                            textTransform: 'capitalize',
                          }}
                        >
                          {val.tm_task_name}
                        </FormLabel>
                      ) : (
                        <FormLabel
                          sx={{
                            fontSize: 13,
                            flex: 3,
                            textTransform: 'capitalize',
                            color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'black',
                          }}
                        >
                          {val.tm_task_name}
                        </FormLabel>
                      )}
                    </Box>
                    <Box sx={{ flex: 1, px: 0.5, pt: 0.5 }}>
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
                    <Box sx={{ flex: 1, pt: 1 }}>
                      <Tooltip title="Task Created Date">
                        {val.tm_task_status === 1 ? (
                          <FormLabel
                            sx={{
                              fontSize: 13,
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
                              fontSize: 13,
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
                    <Box sx={{ flex: 1, pt: 1 }}>
                      <Tooltip title="Task Due Date">
                        {val.tm_task_status === 1 ? (
                          <FormLabel
                            sx={{
                              fontSize: 13,
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
                              fontSize: 13,
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
                    <Box sx={{ pr: 1 }}>
                      <MainTaskProgress val={val} />
                    </Box>
                  </Box>
                )
              })}
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            textAlign: 'center',
            pt: 3,
            height: 500,
            fontWeight: 700,
            fontSize: 30,
            color: '#C7C8CB',
          }}
        >
          No other Task assigned without Project!
        </Box>
      )}
    </Box>
  )
}

export default memo(MyProgressView)
