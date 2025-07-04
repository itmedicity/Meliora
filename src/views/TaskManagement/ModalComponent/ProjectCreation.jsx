import { Box, Button, Chip, CssVarsProvider, Modal, ModalDialog, Textarea, Tooltip, Typography } from '@mui/joy'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { useDispatch, useSelector } from 'react-redux'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import AccountTreeSharpIcon from '@mui/icons-material/AccountTreeSharp'
import Inputcomponent from '../TaskComponents/Inputcomponent'
import TmAllGoalsList from 'src/views/CommonSelectCode/TmAllGoalsList'
import { getGoalsList } from 'src/redux/actions/TmGoalsList.action'
import { getNonGoalProjectList, getProjectListWithgoal } from 'src/redux/actions/TmProjectsList.action'
import moment from 'moment'
import GoalCreation from './GoalCreation'

const ProjectCreation = ({ open, setAddProjectFlag, setaddProjectlModalOpen, tableCount, setTableCount }) => {
  const dispatch = useDispatch()
  const [goalz, setgoalz] = useState(0)
  const [dueDateGoal, setdueDateGoal] = useState('')
  const [addGoalFlag, setAddGoalFlag] = useState(0)
  const [addGoalModalOpen, setaddGoalModalOpen] = useState(false)

  useEffect(() => {
    dispatch(getGoalsList())
  }, [dispatch])

  const id = useSelector(state => {
    return state.LoginUserData.empid
  })

  const CloseProject = useCallback(() => {
    setAddProjectFlag(0)
    setaddProjectlModalOpen(false)
  }, [setAddProjectFlag, setaddProjectlModalOpen])

  const [projectMast, setprojectMast] = useState({
    tm_project_slno: '',
    tm_project_name: '',
    tm_project_duedate: '',
    tm_project_description: '',
    tm_project_status: false,
    tm_project_cmpltedate: ''
  })

  const { tm_project_name, tm_project_duedate, tm_project_description, tm_project_status, tm_project_cmpltedate } =
    projectMast
  const ProjectMastUpdate = useCallback(
    e => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setprojectMast({ ...projectMast, [e.target.name]: value })
    },
    [projectMast]
  )

  const postProject = useMemo(() => {
    return {
      tm_project_name: tm_project_name,
      tm_project_duedate: tm_project_duedate === '' ? null : tm_project_duedate,
      tm_project_description: tm_project_description === '' ? null : tm_project_description,
      tm_project_status: tm_project_status === true ? 1 : 0,
      tm_project_cmpltedate: tm_project_cmpltedate === '' ? null : tm_project_cmpltedate,
      tm_goal_slno: goalz === 0 ? null : goalz,
      tm_project_create_user: id
    }
  }, [tm_project_name, tm_project_duedate, tm_project_description, tm_project_status, tm_project_cmpltedate, goalz, id])

  const reset = useCallback(() => {
    const form = {
      tm_project_slno: '',
      tm_project_name: '',
      tm_project_duedate: '',
      tm_project_description: '',
      tm_project_status: false,
      tm_project_cmpltedate: ''
    }
    setprojectMast(form)
    setgoalz(0)
  }, [])

  const CreateGoal = useCallback(() => {
    setAddGoalFlag(1)
    setaddGoalModalOpen(true)
  }, [])

  const InsertProject = useCallback(
    e => {
      e.preventDefault()
      if (tm_project_name !== '' && tm_project_duedate !== '') {
        const InsertMastProject = async postProject => {
          const result = await axioslogin.post('/taskManagement/insertProject', postProject)

          const { message, success } = result.data
          if (success === 1) {
            succesNotify(message)
            setTableCount(tableCount + 1)
            reset()
            CloseProject()
            if (goalz !== 0) {
              dispatch(getProjectListWithgoal(goalz))
            } else {
              dispatch(getNonGoalProjectList())
            }
          } else if (success === 0) {
            infoNotify(message)
          } else {
            infoNotify(message)
          }
        }
        InsertMastProject(postProject)
      } else {
        infoNotify('Please fill Mandatory feilds')
      }
    },
    [postProject, tableCount, tm_project_name, goalz, CloseProject, dispatch, reset, setTableCount, tm_project_duedate]
  )

  const isGoalOverdue = moment().isAfter(moment(dueDateGoal))

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
            borderRadius: 10
          }}
        >
          <ModalDialog variant="outlined" sx={{ width: '43vw', p: 0 }}>
            <Box sx={{ flex: 1 }}>
              <Box sx={{ flex: 1, display: 'flex', bgcolor: 'white', height: 30 }}>
                <Typography
                  sx={{
                    color: 'lightgray',
                    fontSize: 12,
                    pl: 1,
                    flex: 1,
                    pt: 1.5,
                    fontWeight: 900
                  }}
                >
                  Create A New Project
                </Typography>
                <HighlightOffIcon
                  sx={{
                    height: 40,
                    width: 40,
                    cursor: 'pointer',
                    color: '#52688F',
                    p: 1,
                    '&:hover': { color: '#BA0F30' }
                  }}
                  onClick={CloseProject}
                />
              </Box>
              <Box sx={{ flex: 1, bgcolor: '#52688F', height: 100, mt: 1 }}></Box>
              <Box
                style={{
                  marginLeft: 50,
                  marginTop: '-0.99em',
                  paddingLeft: 2,
                  zIndex: 2,
                  backgroundColor: 'white',
                  borderRadius: 35,
                  position: 'absolute',
                  fontSize: '0.75em'
                }}
              >
                <AccountTreeSharpIcon sx={{ height: 60, width: 60, p: 1.5 }} />
              </Box>
              <Typography sx={{ fontWeight: 800, color: 'grey', fontSize: 15, pt: 5, pl: 5.8 }}>
                Create Project
              </Typography>
              <Box sx={{ maxHeight: '60vh', overflow: 'auto' }}>
                <Box sx={{ flex: 1, mx: 3, mt: 4 }}>
                  <Typography
                    sx={{
                      pl: 1.5,
                      color: '#003B73',
                      fontWeight: 600,
                      textUnderline: 1,
                      fontSize: 12
                    }}
                  >
                    Project
                    <span style={{ color: '#74112F', fontSize: 15 }}>*</span>
                  </Typography>
                  <Inputcomponent
                    placeholder="New Project"
                    type="text"
                    name="tm_project_name"
                    value={tm_project_name}
                    onchange={ProjectMastUpdate}
                  />
                </Box>
                <Box sx={{ flex: 1, mx: 3, mt: 2.5 }}>
                  <Typography
                    sx={{
                      pl: 1.5,
                      color: '#003B73',
                      fontWeight: 600,
                      textUnderline: 1,
                      fontSize: 12
                    }}
                  >
                    Goal
                  </Typography>

                  <Box sx={{ flex: 1, display: 'flex' }}>
                    <TmAllGoalsList goalz={goalz} setgoalz={setgoalz} setdueDateGoal={setdueDateGoal} />
                    <Box sx={{ ml: 0.5, mt: 2 }} onClick={CreateGoal}>
                      <Tooltip title="Create New Goal">
                        <Chip
                          sx={{
                            cursor: 'pointer',
                            bgcolor: '#90CDD0 ',
                            color: 'black',
                            '&:hover': { bgcolor: '#77A7B0' }
                          }}
                        >
                          &nbsp;+ create&nbsp;
                        </Chip>
                      </Tooltip>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ flex: 1, mx: 3, mt: 3 }}>
                  <Typography
                    sx={{
                      pl: 1.5,
                      color: '#003B73',
                      fontWeight: 600,
                      textUnderline: 1,
                      fontSize: 12
                    }}
                  >
                    Due Date
                    <span style={{ color: '#74112F', fontSize: 15 }}>*</span>
                  </Typography>
                  <Tooltip
                    title={
                      isGoalOverdue
                        ? "Due date cannot be added, selected Goal is already overdue. To add Project due date, please update the Goal's due date."
                        : ''
                    }
                    placement="bottom"
                    color="warning"
                    sx={{ width: 350 }}
                  >
                    <div>
                      <Inputcomponent
                        type="datetime-local"
                        name="tm_project_duedate"
                        value={tm_project_duedate}
                        slotProps={{
                          input: {
                            min: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                            max: moment(new Date(dueDateGoal)).format('YYYY-MM-DD HH:mm:ss')
                          }
                        }}
                        disabled={isGoalOverdue}
                        onchange={ProjectMastUpdate}
                      />
                    </div>
                  </Tooltip>
                </Box>
                <Box sx={{ mt: 3, mx: 3 }}>
                  <Typography
                    sx={{
                      pl: 1.5,
                      color: '#003B73',
                      fontWeight: 600,
                      textUnderline: 1,
                      fontSize: 12
                    }}
                  >
                    Describtion
                  </Typography>
                  <Textarea
                    minRows={1}
                    maxRows={5}
                    placeholder="Describtion"
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
                    name="tm_project_description"
                    value={tm_project_description}
                    onChange={e => ProjectMastUpdate(e)}
                  />
                </Box>
                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', pt: 3, pb: 2, mr: 3 }}>
                  <Button variant="plain" sx={{ fontSize: 15 }} onClick={InsertProject}>
                    Create
                  </Button>
                  <Button variant="plain" sx={{ fontSize: 15 }} onClick={CloseProject}>
                    {' '}
                    Cancel
                  </Button>
                </Box>
              </Box>
            </Box>
          </ModalDialog>
        </Modal>
      </CssVarsProvider>
    </Box>
  )
}

export default memo(ProjectCreation)
