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

const GoalCreation = ({ open, setAddGoalFlag, setaddGoalModalOpen, tableCount, setTableCount }) => {
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
            setTableCount(tableCount + 1)
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
    [postGoal, tm_goal_name, tableCount, CloseGoal, dispatch, reset, setTableCount]
  )

  return (
    <Box>
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
                  Create A New Goal
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
                  onClick={CloseGoal}
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
                <RadarIcon sx={{ height: 70, width: 70 }} />
              </Box>
              <Typography sx={{ fontWeight: 800, color: 'grey', fontSize: 15, pt: 7, pl: 5.8 }}>Create Goal</Typography>
              <Box sx={{ maxHeight: '65vh', overflow: 'auto' }}>
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
                    Goal
                    <span style={{ color: '#74112F', fontSize: 15 }}>*</span>
                  </Typography>
                  <Inputcomponent
                    placeholder="New Goal"
                    type="text"
                    name="tm_goal_name"
                    value={tm_goal_name}
                    onchange={GoalsMastUpdate}
                  />
                </Box>
                <Box sx={{ flex: 1, mx: 3, mt: 3.5, display: 'flex' }}>
                  <Box sx={{ flex: 1, mr: 1.5 }}>
                    <Typography
                      sx={{
                        pl: 1.5,
                        color: '#003B73',
                        fontWeight: 600,
                        textUnderline: 1,
                        fontSize: 12
                      }}
                    >
                      From Date
                      <span style={{ color: '#74112F', fontSize: 15 }}>*</span>
                    </Typography>
                    <Inputcomponent
                      placeholder="New Goal"
                      type="datetime-local"
                      name="tm_goal_fromdate"
                      value={tm_goal_fromdate}
                      onchange={GoalsMastUpdate}
                    />
                  </Box>
                  <Box sx={{ flex: 1, ml: 1.5 }}>
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
                    <Inputcomponent
                      placeholder="New Goal"
                      type="datetime-local"
                      name="tm_goal_duedate"
                      value={tm_goal_duedate}
                      slotProps={{
                        input: {
                          min: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
                        }
                      }}
                      onchange={GoalsMastUpdate}
                    />
                  </Box>
                </Box>
                <Box sx={{ mt: 5, mx: 3 }}>
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
                    name="tm_goal_description"
                    value={tm_goal_description}
                    onChange={e => GoalsMastUpdate(e)}
                  />
                </Box>
                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', pt: 5, pb: 2, mr: 3 }}>
                  <Button variant="plain" sx={{ fontSize: 15 }} onClick={InsertGoals}>
                    Create
                  </Button>
                  <Button variant="plain" sx={{ fontSize: 15 }} onClick={CloseGoal}>
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

export default memo(GoalCreation)
