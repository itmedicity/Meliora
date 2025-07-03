import {
  Box,
  Button,
  Checkbox,
  CssVarsProvider,
  Modal,
  ModalDialog,
  Textarea,
  Tooltip,
  Typography,
} from '@mui/joy'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import RadarIcon from '@mui/icons-material/Radar'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import Inputcomponent from '../TaskComponents/Inputcomponent'
import CusCheckBox from 'src/views/Components/CusCheckBox'

const EditGoalCreation = ({
  open,
  setEditGoalFlag,
  setEditGoalModalOpen,
  tableCount,
  setTableCount,
  goalData,
  setgoalData,
}) => {
  const {
    tm_goals_slno,
    tm_goal_name,
    tm_goal_duedate,
    tm_goal_fromdate,
    tm_goal_description,
    tm_goal_status,
    tm_goal_cmpledate,
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
      tm_goalCmpledate: '',
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
    tm_goalCmpledate: tm_goal_cmpledate,
  })
  const {
    tm_goalsSlno,
    tm_goalName,
    tm_goalDuedate,
    tm_goalFromdate,
    tm_goalDescription,
    tm_goalStatus,
  } = goalMast

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
      tm_goal_edituser: id,
    }
  }, [
    tm_goalsSlno,
    tm_goalName,
    tm_goalDuedate,
    tm_goalFromdate,
    tm_goalDescription,
    tm_goalStatus,
    newDate,
    id,
  ])

  const UpdateGoals = useCallback(
    e => {
      e.preventDefault()
      if (tm_goalName !== '') {
        const UpdateMastGoal = async patchGoal => {
          const result = await axioslogin.patch('/taskManagement/updateDeptGoal', patchGoal)
          const { message, success } = result.data
          if (success === 2) {
            succesNotify(message)
            setTableCount(tableCount + 1)
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
    [patchGoal, tm_goalName, tableCount, CloseGoal, setTableCount]
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
            borderRadius: 10,
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
                    fontWeight: 900,
                  }}
                >
                  Update Goal
                </Typography>
                <HighlightOffIcon
                  sx={{
                    height: 40,
                    width: 40,
                    cursor: 'pointer',
                    color: '#52688F',
                    p: 1,
                    '&:hover': { color: '#BA0F30' },
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
                  fontSize: '0.75em',
                }}
              >
                <RadarIcon sx={{ height: 70, width: 70 }} />
              </Box>
              <Typography sx={{ fontWeight: 800, color: 'grey', fontSize: 15, pt: 7, pl: 5.8 }}>
                Update Goal
              </Typography>
              <Box sx={{ maxHeight: '65vh', overflow: 'auto' }}>
                <Box sx={{ flex: 1, mx: 3, mt: 4 }}>
                  <Inputcomponent
                    placeholder="New Goal"
                    type="text"
                    name="tm_goalName"
                    value={tm_goalName}
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
                        fontSize: 12,
                      }}
                    >
                      From Date*
                    </Typography>
                    <Inputcomponent
                      placeholder="New Goal"
                      type="datetime-local"
                      name="tm_goalFromdate"
                      value={tm_goalFromdate}
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
                        fontSize: 12,
                      }}
                    >
                      Due Date*
                    </Typography>
                    <Inputcomponent
                      placeholder="New Goal"
                      type="datetime-local"
                      name="tm_goalDuedate"
                      value={tm_goalDuedate}
                      slotProps={{
                        input: {
                          min: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                        },
                      }}
                      onchange={GoalsMastUpdate}
                    />
                  </Box>
                </Box>
                <Box sx={{ mt: 5, mx: 3 }}>
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
                    name="tm_goalDescription"
                    value={tm_goalDescription}
                    onChange={e => GoalsMastUpdate(e)}
                  />
                </Box>
                <Box sx={{ flex: 1, pl: 7, pt: 3, display: 'flex' }}>
                  {filteredProjects.length === 0 ? (
                    <>
                      <CusCheckBox
                        color="success"
                        size="lg"
                        name="tm_goalStatus"
                        value={tm_goalStatus}
                        checked={tm_goalStatus}
                        onCheked={GoalsMastUpdate}
                      />
                    </>
                  ) : (
                    <CssVarsProvider>
                      <Tooltip
                        title="Can't Mark this Goal as Completed, Projects Under this Goal are yet to Complete"
                        placement="bottom-start"
                        color="warning"
                      >
                        <Checkbox disabled size="lg" />
                      </Tooltip>
                    </CssVarsProvider>
                  )}

                  <Typography sx={{ pl: 0.5, fontWeight: 500 }}>Goal Completed</Typography>
                </Box>
                <Box
                  sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', pt: 5, pb: 2, mr: 3 }}
                >
                  <Button variant="plain" sx={{ fontSize: 15 }} onClick={UpdateGoals}>
                    Update
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

export default memo(EditGoalCreation)
