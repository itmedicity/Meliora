import { Box, Button, CssVarsProvider, Modal, ModalDialog, Textarea, Typography } from '@mui/joy'
import React, { memo, useCallback, useMemo, useState } from 'react'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import RadarIcon from '@mui/icons-material/Radar'
import { useDispatch, useSelector } from 'react-redux'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import Inputcomponent from '../TaskComponents/Inputcomponent'
import { getGoalsList } from 'src/redux/actions/TmGoalsList.action'
import moment from 'moment'
import { taskColor } from 'src/color/Color'

const GoalCreation = ({ open, setAddGoalFlag, setaddGoalModalOpen, }) => {
  const dispatch = useDispatch()
  const CloseGoal = useCallback(() => {
    setAddGoalFlag(0)
    setaddGoalModalOpen(false)
  }, [setAddGoalFlag, setaddGoalModalOpen])

  const id = useSelector(state => {
    return state.LoginUserData.empid
  })

  const [goalMast, setgoalMast] = useState({
    tm_goal_name: '',
    tm_goal_duedate: '',
    tm_goal_fromdate: '',
    tm_goal_description: '',
    tm_goal_status: false,
    tm_goal_cmpledate: ''
  })
  const { tm_goal_name, tm_goal_duedate, tm_goal_fromdate, tm_goal_description, tm_goal_status, tm_goal_cmpledate } =
    goalMast

  const GoalsMastUpdate = useCallback(
    e => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setgoalMast({ ...goalMast, [e.target.name]: value })
    },
    [goalMast]
  )

  const postGoal = useMemo(() => {
    return {
      tm_goal_name: tm_goal_name,
      tm_goal_fromdate: tm_goal_fromdate === '' ? null : tm_goal_fromdate,
      tm_goal_duedate: tm_goal_duedate === '' ? null : tm_goal_duedate,
      tm_goal_description: tm_goal_description === '' ? null : tm_goal_description,
      tm_goal_cmpledate: tm_goal_cmpledate === '' ? null : tm_goal_cmpledate,
      tm_goal_status: tm_goal_status === true ? 1 : 0,
      tm_goal_createuser: id
    }
  }, [tm_goal_name, tm_goal_duedate, tm_goal_fromdate, tm_goal_description, tm_goal_status, tm_goal_cmpledate, id])

  const reset = useCallback(() => {
    const form = {
      tm_goal_name: '',
      tm_goal_duedate: '',
      tm_goal_fromdate: '',
      tm_goal_description: '',
      tm_goal_status: false,
      tm_goal_cmpledate: ''
    }
    setgoalMast(form)
  }, [])

  const InsertGoals = useCallback(
    e => {
      e.preventDefault()
      if (tm_goal_name !== '') {
        const InsertMastGoal = async postGoal => {
          const result = await axioslogin.post('/taskManagement/insertDeptGoal', postGoal)
          const { message, success } = result.data
          if (success === 1) {
            succesNotify(message)
            dispatch(getGoalsList())
            reset()
            CloseGoal()
          } else if (success === 0) {
            infoNotify(message)
          } else {
            infoNotify(message)
          }
        }
        InsertMastGoal(postGoal)
      } else {
        infoNotify('Please fill Manadatory Feilds')
      }
    },
    [postGoal, tm_goal_name, CloseGoal, dispatch, reset]
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
                  Create a New Goal
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
                overflowX: 'hidden', // ✅ prevents horizontal scroll
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
                  name="tm_goal_name"
                  value={tm_goal_name}
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
                    type="datetime-local"
                    name="tm_goal_fromdate"
                    value={tm_goal_fromdate}
                    onchange={GoalsMastUpdate}
                    sx={{ width: '100%' }} // ✅ fill container width
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
                    type="datetime-local"
                    name="tm_goal_duedate"
                    value={tm_goal_duedate}
                    slotProps={{
                      input: {
                        min: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                      },
                    }}
                    onchange={GoalsMastUpdate}
                    sx={{ width: '100%' }} // ✅ fill container width
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
                  name="tm_goal_description"
                  value={tm_goal_description}
                  onChange={e => GoalsMastUpdate(e)}
                />
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button variant="plain" color="neutral" onClick={InsertGoals}>
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

export default memo(GoalCreation)
