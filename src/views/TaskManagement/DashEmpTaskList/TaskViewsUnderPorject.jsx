import { Box, Card, Chip, FormLabel, Modal, ModalDialog, Tooltip, Typography } from '@mui/joy'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import AlignHorizontalRightRoundedIcon from '@mui/icons-material/AlignHorizontalRightRounded'
import { axioslogin } from 'src/views/Axios/Axios'
import CountDowncomponent from '../CountDown/CountDowncomponent'
import EventNoteRoundedIcon from '@mui/icons-material/EventNoteRounded'
import MainTaskProgress from './MainTaskProgress'
import AssignmentSharpIcon from '@mui/icons-material/AssignmentSharp'
import ListSharpIcon from '@mui/icons-material/ListSharp'
import SubTaskUnderTaskModal from './SubTaskUnderTaskModal'

const TaskViewsUnderPorject = ({
  prjmodalOpen,
  setprjModalOpen,
  depmtSec,
  capEmpName,
  taskUnderPjt,
}) => {
  const { tm_project_name, tm_project_slno, tm_assigne_emp } = taskUnderPjt
  const [SubTaskmodalFlag, setSubTaskmodalFlag] = useState(0)
  const [SubTaskmodalOpen, setSubTaskmodalOpen] = useState(false)
  const [subtaskvalues, setsubtaskvalues] = useState([])
  const [allTaskUnderProject, setAllTaskUnderProject] = useState([])
  const [otherempTask, setOtherempTask] = useState([])
  const searchData = useMemo(() => {
    return {
      tm_project_slno: tm_project_slno,
    }
  }, [tm_project_slno])

  const handleProject = useCallback(() => {
    setprjModalOpen(0)
    setprjModalOpen(false)
  }, [setprjModalOpen])

  useEffect(() => {
    const getEmpTask = async () => {
      const result = await axioslogin.post('/TmTableView/allTaskUnderProject', searchData)
      const { success, data } = result.data
      if (success === 2) {
        const newData = data?.filter(val => val.tm_assigne_emp === tm_assigne_emp)
        setAllTaskUnderProject(newData)
        const othertask = data?.filter(val => val.tm_assigne_emp !== tm_assigne_emp)
        const otherTaskks = othertask.filter(val => {
          return !newData.find(value => value.tm_task_slno === val.tm_task_slno)
        })
        setOtherempTask(otherTaskks)
      } else {
        setAllTaskUnderProject([])
        setOtherempTask([])
      }
    }
    getEmpTask(searchData)
  }, [searchData, tm_assigne_emp])

  const isPastDue = tm_task_due_date => {
    const today = new Date()
    const due = new Date(tm_task_due_date)
    return due < today
  }

  const openSubtaskModal = useCallback(value => {
    setsubtaskvalues(value)
    setSubTaskmodalFlag(1)
    setSubTaskmodalOpen(true)
  }, [])

  return (
    <Box>
      {SubTaskmodalFlag === 1 ? (
        <SubTaskUnderTaskModal
          SubTaskmodalOpen={SubTaskmodalOpen}
          setSubTaskmodalOpen={setSubTaskmodalOpen}
          capEmpName={capEmpName}
          depmtSec={depmtSec}
          setSubTaskmodalFlag={setSubTaskmodalFlag}
          subtaskvalues={subtaskvalues}
          emp_no={tm_assigne_emp}
        />
      ) : null}
      <Modal open={prjmodalOpen}>
        <ModalDialog
          sx={{
            width: '90vw',
            bgcolor: 'white',
            borderRadius: 20,
            height: '90vh',
            overflow: 'auto',
          }}
        >
          <Box>
            <Card sx={{ bgcolor: '#52688F' }}>
              <Box sx={{ flex: 1, display: 'flex' }}>
                <Box
                  sx={{
                    flex: 1,
                    fontSize: 30,
                    fontFamily: 'Georgia',
                    pt: 0.5,
                    color: 'white',
                    pl: 1,
                  }}
                >
                  <AlignHorizontalRightRoundedIcon sx={{ height: 32, width: 32, color: 'white' }} />
                  Project
                  <Typography sx={{ color: 'white', fontFamily: 'Georgia', fontSize: 20, pl: 1 }}>
                    {tm_project_name}
                  </Typography>
                </Box>
                <Box>
                  <HighlightOffIcon
                    onClick={handleProject}
                    sx={{ cursor: 'pointer', color: 'white', '&:hover': { color: '#A0E7E5' } }}
                  />
                </Box>
              </Box>
            </Card>
            <Box sx={{ flex: 1, mt: 2.5, mx: 2, overflow: 'auto', maxHeight: '72vh' }}>
              <Box sx={{ flex: 1, display: 'flex' }}>
                <Box
                  sx={{
                    flex: 1,
                    height: 30,
                    bgcolor: '#4F687F',
                    borderRadius: 20,
                    pl: 1,
                    color: 'white',
                  }}
                >
                  <AssignmentSharpIcon sx={{ color: 'white' }} /> Task assigned to {capEmpName}
                </Box>
                <Box sx={{ flex: 3 }}></Box>
              </Box>
              <Box>
                {allTaskUnderProject.length !== 0 ? (
                  <Box sx={{ mt: 0.8 }}>
                    {allTaskUnderProject &&
                      allTaskUnderProject.map(val => {
                        return (
                          <Box
                            key={val.tm_task_slno}
                            sx={{
                              flex: 1,
                              bgcolor: 'white',
                              maxHeight: 100,
                              display: 'flex',
                              mb: 0.5,
                              borderBottom: 1,
                              borderColor: '#C3E0E5',
                              '&:hover': {
                                boxShadow: '1px 1px 3px',
                                bgcolor: '#E9EAEC',
                              },
                            }}
                            onClick={() => openSubtaskModal(val)}
                          >
                            <Box sx={{ px: 0.6, pt: 1 }}>
                              <ListSharpIcon fontSize="small" sx={{ color: '#435D84' }} />
                            </Box>
                            <Box sx={{ flex: 3, pt: 1.2 }}>
                              {val.tm_task_status === 1 ? (
                                <FormLabel
                                  sx={{
                                    fontSize: 12,
                                    textTransform: 'capitalize',
                                    cursor: 'grab',
                                  }}
                                >
                                  {val.tm_task_name}
                                </FormLabel>
                              ) : (
                                <FormLabel
                                  sx={{
                                    fontSize: 12,
                                    textTransform: 'capitalize',
                                    cursor: 'grab',
                                    color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'black',
                                  }}
                                >
                                  {val.tm_task_name}
                                </FormLabel>
                              )}
                            </Box>
                            <Box sx={{ flex: 1, pt: 0.7, px: 0.5 }}>
                              <Tooltip>
                                {val.tm_task_status !== 1 ? (
                                  <Box
                                    sx={{
                                      bgcolor: '#EAEAEA',
                                      borderRadius: 15,
                                      mb: 0.5,
                                      width: 160,
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
                                      width: 160,
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
                            <Box sx={{ flex: 1, pt: 1.2 }}>
                              <Tooltip title="Task Created Date">
                                {val.tm_task_status === 1 ? (
                                  <FormLabel
                                    sx={{
                                      fontSize: 12,
                                      textTransform: 'capitalize',
                                      cursor: 'grab',
                                    }}
                                  >
                                    <EventNoteRoundedIcon
                                      fontSize="sm"
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
                                      color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'black',
                                    }}
                                  >
                                    <EventNoteRoundedIcon
                                      fontSize="sm"
                                      sx={{ mt: 0.2, mr: 0.2, color: '#435D84' }}
                                    />{' '}
                                    {val.create_date}
                                  </FormLabel>
                                )}
                              </Tooltip>
                            </Box>
                            <Box sx={{ flex: 1, pt: 1.2 }}>
                              <Tooltip title="Task due Date">
                                {val.tm_task_status === 1 ? (
                                  <FormLabel
                                    sx={{
                                      fontSize: 12,
                                      flex: 1,
                                      textTransform: 'capitalize',
                                      cursor: 'grab',
                                    }}
                                  >
                                    <EventNoteRoundedIcon
                                      fontSize="sm"
                                      sx={{ mt: 0.2, mr: 0.2, color: '#435D84' }}
                                    />{' '}
                                    {val.tm_task_due_date}
                                  </FormLabel>
                                ) : (
                                  <FormLabel
                                    sx={{
                                      fontSize: 12,
                                      flex: 1,
                                      textTransform: 'capitalize',
                                      cursor: 'grab',
                                      color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'black',
                                    }}
                                  >
                                    <EventNoteRoundedIcon
                                      fontSize="sm"
                                      sx={{ mt: 0.2, mr: 0.2, color: '#435D84' }}
                                    />{' '}
                                    {val.tm_task_due_date}
                                  </FormLabel>
                                )}
                              </Tooltip>
                            </Box>
                            <Box sx={{ pr: 0.5 }}>
                              <MainTaskProgress val={val} />
                            </Box>
                          </Box>
                        )
                      })}
                  </Box>
                ) : (
                  <Box>
                    <Box
                      sx={{
                        border: 1,
                        borderStyle: 'dashed',
                        borderColor: '#C7C8CB',
                        margin: 'auto',
                        height: 60,
                        mt: 1,
                        textAlign: 'center',
                        fontWeight: 700,
                        fontSize: 30,
                        color: '#C7C8CB',
                      }}
                    >
                      {' '}
                      No Task
                    </Box>
                  </Box>
                )}
              </Box>
              {otherempTask.length !== 0 ? (
                <Box sx={{ flex: 1, display: 'flex', mt: 1.3 }}>
                  <Box
                    sx={{
                      flex: 1,
                      height: 30,
                      bgcolor: '#4F687F',
                      borderRadius: 20,
                      pl: 3,
                      color: 'white',
                    }}
                  >
                    <AssignmentSharpIcon sx={{ color: 'white' }} /> Other Task Under this Project
                  </Box>
                  <Box sx={{ flex: 3 }}></Box>
                </Box>
              ) : null}
              <Box sx={{ mt: 0.5 }}>
                {otherempTask &&
                  otherempTask.map(val => {
                    let assignedEmp_name =
                      val.task_empname !== null
                        ? val.task_empname
                            .toLowerCase()
                            .split(' ')
                            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(' ')
                        : ''
                    return (
                      <Box
                        key={val.tm_task_slno}
                        sx={{
                          flex: 1,
                          bgcolor: 'white',
                          maxHeight: 120,
                          display: 'flex',
                          mb: 0.5,
                          borderBottom: 1,
                          borderColor: '#C3E0E5',
                        }}
                      >
                        <Box sx={{ px: 0.6, pt: 0.5 }}>
                          <ListSharpIcon fontSize="small" sx={{ color: '#435D84' }} />
                        </Box>
                        <Box sx={{ pt: 1, flex: 3 }}>
                          {val.tm_task_status === 1 ? (
                            <FormLabel
                              sx={{
                                fontSize: 12,
                                textTransform: 'capitalize',
                                cursor: 'grab',
                              }}
                            >
                              {val.tm_task_name}
                            </FormLabel>
                          ) : (
                            <FormLabel
                              sx={{
                                fontSize: 12,
                                textTransform: 'capitalize',
                                cursor: 'grab',
                                color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'black',
                              }}
                            >
                              {val.tm_task_name}
                            </FormLabel>
                          )}
                        </Box>
                        <Box sx={{ pt: 1.5, flex: 1 }}>
                          <Tooltip title="Task Assigned to">
                            <FormLabel
                              sx={{
                                fontSize: 12,
                                flex: 0.8,
                                cursor: 'grab',
                                display: 'flex',
                                justifyContent: 'center',
                                color: '#3B0404',
                                textTransform: 'capitalize',
                              }}
                            >
                              {assignedEmp_name}
                            </FormLabel>
                          </Tooltip>
                        </Box>
                        <Box sx={{ flex: 1, px: 0.5, pt: 1 }}>
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
                        <Box sx={{ pt: 1.5, flex: 1.5, px: 0.2 }}>
                          <Tooltip title="Task Created Date">
                            {val.tm_task_status === 1 ? (
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
                                />
                                {val.create_date}
                              </FormLabel>
                            ) : (
                              <FormLabel
                                sx={{
                                  fontSize: 12,
                                  flex: 1,
                                  textTransform: 'capitalize',
                                  cursor: 'grab',
                                  color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'black',
                                  display: 'flex',
                                }}
                              >
                                <EventNoteRoundedIcon
                                  fontSize="small"
                                  sx={{ mt: 0.2, mr: 0.2, color: '#435D84' }}
                                />
                                {val.create_date}
                              </FormLabel>
                            )}
                          </Tooltip>
                        </Box>
                        <Box sx={{ pt: 1.5, flex: 1.5 }}>
                          <Tooltip title="Task Due Date">
                            {val.tm_task_status === 1 ? (
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
                                />
                                {val.tm_task_due_date}
                              </FormLabel>
                            ) : (
                              <FormLabel
                                sx={{
                                  fontSize: 12,
                                  flex: 1,
                                  textTransform: 'capitalize',
                                  cursor: 'grab',
                                  color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'black',
                                }}
                              >
                                <EventNoteRoundedIcon
                                  fontSize="small"
                                  sx={{ mt: 0.2, mr: 0.2, color: '#435D84' }}
                                />
                                {val.tm_task_due_date}
                              </FormLabel>
                            )}
                          </Tooltip>
                        </Box>
                        <Box sx={{ flex: 0.5, pt: 0.8, pr: 1 }}>
                          <Chip sx={{ px: 0.5, borderRadius: 10 }}>
                            <Tooltip title="Task Status">
                              <FormLabel
                                sx={{
                                  fontSize: 12,
                                  cursor: 'grab',
                                  display: 'flex',
                                  justifyContent: 'center',
                                  color:
                                    val.tm_task_status === null
                                      ? '#311E26'
                                      : val.tm_task_status === 0
                                      ? '#311E26'
                                      : val.tm_task_status === 1
                                      ? '#116530'
                                      : val.tm_task_status === 2
                                      ? '#D37506'
                                      : val.tm_task_status === 3
                                      ? '#5E376D'
                                      : val.tm_task_status === 4
                                      ? '#5885AF'
                                      : 'transparent',
                                  minHeight: 5,
                                  fontWeight: 700,
                                }}
                              >
                                {val.tm_task_status === 0
                                  ? 'Not Started'
                                  : val.tm_task_status === 1
                                  ? 'Completed'
                                  : val.tm_task_status === 2
                                  ? 'On Progress'
                                  : val.tm_task_status === 3
                                  ? 'On Hold'
                                  : val.tm_task_status === 4
                                  ? 'Pending'
                                  : 'not given'}
                              </FormLabel>
                            </Tooltip>
                          </Chip>
                        </Box>
                      </Box>
                    )
                  })}
              </Box>
              <Box sx={{ height: 10 }}></Box>
            </Box>
          </Box>
        </ModalDialog>
      </Modal>
    </Box>
  )
}

export default memo(TaskViewsUnderPorject)
