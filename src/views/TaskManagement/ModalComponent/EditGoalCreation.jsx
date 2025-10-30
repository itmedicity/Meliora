import { Box, Button, Checkbox, CssVarsProvider, Modal, ModalDialog, Textarea, Tooltip, Typography } from '@mui/joy'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import RadarIcon from '@mui/icons-material/Radar'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import Inputcomponent from '../TaskComponents/Inputcomponent'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import { taskColor } from 'src/color/Color'

const EditGoalCreation = ({
  open,
  setEditGoalFlag,
  setEditGoalModalOpen,
  goalData,
  setgoalData
}) => {
  const {
    tm_goals_slno,
    tm_goal_name,
    tm_goal_duedate,
    tm_goal_fromdate,
    tm_goal_description,
    tm_goal_status,
    tm_goal_cmpledate
  } = goalData

  const [filteredProjects, setFilteredProjects] = useState([])

  useEffect(() => {
    const getMastProjects = async tm_goals_slno => {
      const result = await axioslogin.get(`/TmAllDeptTask/getprojectundergoal/${tm_goals_slno}`)
      const { success, data } = result.data
      if (data.length !== 0) {
        if (success === 2) {
          const filteredData = data.filter(project => project.tm_project_status !== 1)
          setFilteredProjects(filteredData)
        } else {
          setFilteredProjects([])
        }
      }
    }
    getMastProjects(tm_goals_slno)
  }, [tm_goals_slno])

  const CloseGoal = useCallback(() => {
    const form = {
      tm_goalName: '',
      tm_goalDuedate: '',
      tm_goalFromdate: '',
      tm_goalDescription: '',
      tm_goalStatus: false,
      tm_goalCmpledate: ''
    }
    setgoalMast(form)
    setgoalData([])
    setEditGoalFlag(0)
    setEditGoalModalOpen(false)
  }, [setEditGoalFlag, setEditGoalModalOpen, setgoalData])

  let newDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
  const id = useSelector(state => {
    return state.LoginUserData.empid
  })

  const [goalMast, setgoalMast] = useState({
    tm_goalsSlno: tm_goals_slno,
    tm_goalName: tm_goal_name,
    tm_goalDuedate: tm_goal_duedate,
    tm_goalFromdate: tm_goal_fromdate,
    tm_goalDescription: tm_goal_description,
    tm_goalStatus: tm_goal_status === 1 ? true : false,
    tm_goalCmpledate: tm_goal_cmpledate
  })
  const { tm_goalsSlno, tm_goalName, tm_goalDuedate, tm_goalFromdate, tm_goalDescription, tm_goalStatus } = goalMast

  const GoalsMastUpdate = useCallback(
    e => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setgoalMast({ ...goalMast, [e.target.name]: value })
    },
    [goalMast]
  )

  const patchGoal = useMemo(() => {
    return {
      tm_goals_slno: tm_goalsSlno,
      tm_goal_name: tm_goalName === '' ? null : tm_goalName,
      tm_goal_fromdate: tm_goalFromdate === '' ? null : tm_goalFromdate,
      tm_goal_duedate: tm_goalDuedate === '' ? null : tm_goalDuedate,
      tm_goal_description: tm_goalDescription === '' ? null : tm_goalDescription,
      tm_goal_status: tm_goalStatus === true ? 1 : 0,
      tm_goal_cmpledate: tm_goalStatus === true ? newDate : null,
      tm_goal_edituser: id
    }
  }, [tm_goalsSlno, tm_goalName, tm_goalDuedate, tm_goalFromdate, tm_goalDescription, tm_goalStatus, newDate, id])

  const UpdateGoals = useCallback(
    e => {
      e.preventDefault()
      if (tm_goalName !== '') {
        const UpdateMastGoal = async patchGoal => {
          const result = await axioslogin.patch('/taskManagement/updateDeptGoal', patchGoal)
          const { message, success } = result.data
          if (success === 2) {
            succesNotify(message)
            CloseGoal()
          } else if (success === 0) {
            infoNotify(message)
          } else {
            infoNotify(message)
          }
        }
        UpdateMastGoal(patchGoal)
      } else {
        infoNotify('Please Enter Goal Name')
      }
    },
    [patchGoal, tm_goalName, CloseGoal,]
  )
  return (
    <Box>
      <CssVarsProvider>
        <Modal
          open={open}
          aria-labelledby="create-goal-title"
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
              width: { xs: '90vw', sm: '70vw', md: '40vw' },
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
              <Box sx={{ display: 'flex' }}>
                <RadarIcon sx={{ height: 40, width: 40, color: taskColor.darkPurple }} />
                <Typography
                  level="title-sm"
                  sx={{ fontWeight: 700, color: taskColor.darkPurple, pt: 1.5 }}
                >
                  Update Goal
                </Typography>
              </Box>

              <HighlightOffIcon
                onClick={CloseGoal}
                sx={{
                  cursor: 'pointer',
                  color: taskColor.darkPurple,
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
              {/* Goal Name */}
              <Box sx={{ mb: 3 }}>
                <Typography
                  level="body-sm"
                  sx={{ color: taskColor.darkPurple, fontWeight: 600, pl: 1 }}
                >
                  Goal<span style={{ color: '#74112F' }}> *</span>
                </Typography>
                <Inputcomponent
                  placeholder="New Goal"
                  type="text"
                  name="tm_goalName"
                  value={tm_goalName}
                  onchange={GoalsMastUpdate}
                />
              </Box>

              {/* Date Section */}
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  mb: 3,
                  flexWrap: { xs: 'wrap', sm: 'nowrap' }, // ✅ responsive layout
                }}
              >
                <Box sx={{ flex: 1, minWidth: 0 }}> {/* ✅ prevents overflow */}
                  <Typography
                    level="body-sm"
                    sx={{ color: taskColor.darkPurple, fontWeight: 600, pl: 0.5 }}
                  >
                    From Date<span style={{ color: '#74112F' }}> *</span>
                  </Typography>
                  <Inputcomponent
                    placeholder="New Goal"
                    type="datetime-local"
                    name="tm_goalFromdate"
                    value={tm_goalFromdate}
                    onchange={GoalsMastUpdate}
                  />
                </Box>

                <Box sx={{ flex: 1, minWidth: 0 }}> {/* ✅ prevents overflow */}
                  <Typography
                    level="body-sm"
                    sx={{ color: taskColor.darkPurple, fontWeight: 600, pl: 0.5 }}
                  >
                    Due Date<span style={{ color: '#74112F' }}> *</span>
                  </Typography>
                  <Inputcomponent
                    placeholder="New Goal"
                    type="datetime-local"
                    name="tm_goalDuedate"
                    value={tm_goalDuedate}
                    slotProps={{
                      input: {
                        min: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
                      }
                    }}
                    onchange={GoalsMastUpdate}
                  />
                </Box>
              </Box>

              {/* Description */}
              <Box sx={{ mb: 4 }}>
                <Typography
                  level="body-sm"
                  sx={{ color: taskColor.darkPurple, fontWeight: 600, pl: 0.5 }}
                >
                  Description
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
                  name="tm_goalDescription"
                  value={tm_goalDescription}
                  onChange={e => GoalsMastUpdate(e)}
                />
              </Box>

              <Box sx={{ flexGrow: 1, pt: 1, display: 'flex' }}>
                {filteredProjects.length === 0 ? (
                  <>
                    <CusCheckBox
                      color="success"
                      size="lg"
                      name="tm_goalStatus"
                      value={tm_goalStatus}
                      checked={tm_goalStatus}
                      onCheked={GoalsMastUpdate}
                      sx={{ cursor: 'pointer' }}
                    />
                  </>
                ) : (
                  <CssVarsProvider>
                    <Tooltip
                      title="Can't Mark this Goal as Completed, Projects Under this Goal are yet to Complete"
                      placement="bottom-start"
                      variant='solid'
                      sx={{ width: 250, bgcolor: taskColor.darkPurple, color: 'white' }}
                    >
                      <Checkbox disabled size="lg" sx={{ cursor: 'pointer' }} />
                    </Tooltip>
                  </CssVarsProvider>
                )}

                <Typography sx={{ pl: 0.5, fontWeight: 500 }}>Goal Completed</Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button variant="plain" color="neutral" onClick={UpdateGoals}>
                  Create
                </Button>
                <Button variant="plain" color="neutral" onClick={CloseGoal}>
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

export default memo(EditGoalCreation)
