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

const ProjectCreation = ({ open, setAddProjectFlag, setaddProjectlModalOpen, }) => {
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
    [postProject, tm_project_name, goalz, CloseProject, dispatch, reset, tm_project_duedate]
  )

  const isGoalOverdue = moment().isAfter(moment(dueDateGoal))

  return (
    <Box>
      {addGoalFlag === 1 ? (
        <GoalCreation
          open={addGoalModalOpen}
          setAddGoalFlag={setAddGoalFlag}
          setaddGoalModalOpen={setaddGoalModalOpen}
        />
      ) : null}

      <CssVarsProvider>
        <Modal
          open={open}
          aria-labelledby="create-project-title"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            p: 2,
          }}
        >
          <ModalDialog
            variant="outlined"
            sx={{
              width: { xs: '90vw', sm: '70vw', md: '43vw' },
              borderRadius: 'lg',
              p: 0,
              bgcolor: 'background.body',
              overflow: 'hidden',
            }}
          >
            {/* Header */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                px: 2,
                py: 1.5,
                borderBottom: '1px solid',
                borderColor: 'neutral.outlinedBorder',
                bgcolor: 'white',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccountTreeSharpIcon sx={{ height: 36, width: 36, color: '#003B73', }} />
                <Typography
                  level="title-sm"
                  sx={{ fontWeight: 700, color: '#003B73', ml: 1 }}
                >
                  Create a New Project
                </Typography>
              </Box>

              <HighlightOffIcon
                onClick={CloseProject}
                sx={{
                  cursor: 'pointer',
                  color: '#5C469C',
                  '&:hover': { color: '#BA0F30' },
                }}
              />
            </Box>

            {/* Content */}
            <Box
              sx={{
                p: 4,
                overflowY: 'auto',
                overflowX: 'hidden',
                maxHeight: '75vh',
              }}
            >
              {/* Project Name */}
              <Box sx={{ mb: 3 }}>
                <Typography
                  level="body-sm"
                  sx={{ color: '#003B73', fontWeight: 600, pl: 0.5 }}
                >
                  Project<span style={{ color: '#74112F' }}> *</span>
                </Typography>
                <Inputcomponent
                  placeholder="New Project"
                  type="text"
                  name="tm_project_name"
                  value={tm_project_name}
                  onchange={ProjectMastUpdate}
                />
              </Box>

              {/* Goal */}
              <Box sx={{ mb: 3 }}>
                <Typography
                  level="body-sm"
                  sx={{ color: '#003B73', fontWeight: 600, pl: 0.5 }}
                >
                  Goal
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                  <Box sx={{ flex: 1 }}>
                    <TmAllGoalsList
                      goalz={goalz}
                      setgoalz={setgoalz}
                      setdueDateGoal={setdueDateGoal}
                    />
                  </Box>
                  <Box>
                    <Tooltip title="Create New Goal">
                      <Chip
                        onClick={CreateGoal}
                        sx={{
                          cursor: 'pointer',
                          bgcolor: 'var(--royal-purple-200)',
                          color: 'black',
                          '&:hover': { bgcolor: 'var(--royal-purple-100)' },
                        }}
                      >
                        + Create
                      </Chip>
                    </Tooltip>
                  </Box>
                </Box>
              </Box>

              {/* Due Date */}
              <Box sx={{ mb: 3 }}>
                <Typography
                  level="body-sm"
                  sx={{ color: '#003B73', fontWeight: 600, pl: 0.5 }}
                >
                  Due Date<span style={{ color: '#74112F' }}> *</span>
                </Typography>
                <Tooltip
                  title={
                    isGoalOverdue
                      ? "Due date cannot be added, selected Goal is already overdue. To add Project due date, please update the Goal's due date."
                      : ''
                  }
                  placement="bottom"
                >
                  <div>
                    <Inputcomponent
                      type="datetime-local"
                      name="tm_project_duedate"
                      value={tm_project_duedate}
                      slotProps={{
                        input: {
                          min: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                          max: moment(new Date(dueDateGoal)).format('YYYY-MM-DD HH:mm:ss'),
                        },
                      }}
                      disabled={isGoalOverdue}
                      onchange={ProjectMastUpdate}
                      sx={{ width: '100%' }}
                    />
                  </div>
                </Tooltip>
              </Box>

              {/* Description */}
              <Box sx={{ mb: 4 }}>
                <Typography
                  level="body-sm"
                  sx={{ color: '#003B73', fontWeight: 600, pl: 0.5 }}
                >
                  Description
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
                    '&:hover': { borderColor: 'neutral.outlinedHoverBorder' },
                    '&::before': {
                      border: '1px solid var(--Textarea-focusedHighlight)',
                      transform: 'scaleX(0)',
                      transition: 'transform .15s cubic-bezier(0.1,0.9,0.2,1)',
                      borderRadius: 0,
                    },

                  }}
                  name="tm_project_description"
                  value={tm_project_description}
                  onChange={e => ProjectMastUpdate(e)}
                />
              </Box>

              {/* Actions */}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button variant="plain" color="neutral" onClick={InsertProject}>
                  Create
                </Button>
                <Button variant="plain" color="neutral" onClick={CloseProject}>
                  Cancel
                </Button>
              </Box>
            </Box>
          </ModalDialog>
        </Modal>
      </CssVarsProvider>

    </Box>
  )
}

export default memo(ProjectCreation)
