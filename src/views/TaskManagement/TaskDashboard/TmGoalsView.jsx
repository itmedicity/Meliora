import React, { memo, useCallback, useState } from 'react'
import { Box, Chip, CssVarsProvider, Table } from '@mui/joy'
import { Paper, Typography } from '@mui/material'
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import moment from 'moment'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import CountDowncomponent from '../CountDown/CountDowncomponent'
import EditGoalCreation from '../ModalComponent/EditGoalCreation'
import { useNavigate } from 'react-router-dom'
const TmGoalsView = ({ goalsTable, goalsHead, setflagGoal, tableCount, setTableCount }) => {
  const [editGoalModalOpen, setEditGoalModalOpen] = useState(false)
  const [editGoalFlag, setEditGoalFlag] = useState(0)
  const [masterData, setMasterData] = useState([])

  const history = useNavigate()
  const backtoDash = useCallback(() => {
    history('/Home/TaskManagementDashboard')
    setflagGoal(0)
  }, [history, setflagGoal])

  const rowSelectModal = useCallback(value => {
    setEditGoalFlag(1)
    setEditGoalModalOpen(true)
    setMasterData(value)
  }, [])

  const isPastDue = tm_task_due_date => {
    const today = new Date()
    const due = new Date(tm_task_due_date)
    return due < today
  }

  return (
    <Paper sx={{ height: '90vh' }}>
      <Box sx={{ flex: 1, height: 30, display: 'flex' }}>
        <Typography sx={{ color: 'grey', fontWeight: 500, flex: 1, pt: 0.5, pl: 1 }}>
          {goalsHead}
        </Typography>
        <Box sx={{ pl: 0.5 }}>
          <HighlightOffIcon
            sx={{ color: 'grey', height: 30, width: 30, cursor: 'pointer' }}
            onClick={backtoDash}
          />
        </Box>
      </Box>
      <Box sx={{ bgcolor: '#DFE3ED', p: 0.5 }}>
        <Box sx={{ bgcolor: 'white', p: 1 }}>
          <Paper variant="outlined" sx={{ maxWidth: '100%', overflow: 'auto', maxHeight: '85vh' }}>
            {editGoalFlag === 1 ? (
              <EditGoalCreation
                open={editGoalModalOpen}
                setEditGoalModalOpen={setEditGoalModalOpen}
                goalData={masterData}
                setgoalData={setMasterData}
                setEditGoalFlag={setEditGoalFlag}
                tableCount={tableCount}
                setTableCount={setTableCount}
              />
            ) : null}
            <CssVarsProvider>
              <Table padding={'none'} stickyHeader size="sm" hoverRow>
                <thead>
                  <tr>
                    <th style={{ width: 30 }}>SlNo</th>
                    <th style={{ width: 50 }}>Action</th>
                    <th style={{ width: 80 }}>Status</th>
                    <th style={{ width: 120 }}>CountDown</th>
                    <th style={{ width: 200 }}>Goal</th>
                    <th style={{ width: 100 }}>Due date</th>
                    <th style={{ width: 250 }}>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {goalsTable?.map((val, index) => {
                    return (
                      <tr
                        key={index}
                        // sx={{
                        //   '&:last-child td, &:last-child th': { border: 0 },
                        //   maxHeight: 60,
                        //   minHeight: 5,
                        // }}
                      >
                        <td> {index + 1}</td>
                        <td>
                          <CheckCircleOutlineIcon
                            sx={{
                              cursor: 'pointer',
                              '&:hover': { color: '#DBA40E' },
                            }}
                            size={6}
                            onClick={() => rowSelectModal(val)}
                          />
                        </td>
                        <td>
                          <Chip
                            style={{
                              color:
                                val.tm_goal_status === 0
                                  ? '#311E26'
                                  : val.tm_goal_status === 1
                                  ? '#94C973'
                                  : 'transparent',
                              minHeight: 5,
                              fontWeight: 700,
                            }}
                          >
                            {val.tm_goal_status === 0
                              ? 'Incompleted'
                              : val.tm_goal_status === 1
                              ? 'Completed'
                              : 'not given'}
                          </Chip>
                        </td>

                        <td>
                          {val.tm_goal_status !== 1 ? (
                            <Box
                              sx={{
                                bgcolor: '#EAEAEA',
                                borderRadius: 15,
                                width: 150,
                                pl: 1,
                                mb: 0.5,
                              }}
                            >
                              <CountDowncomponent DueDates={val.tm_goal_duedate} />
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
                              }}
                            >
                              Completed
                            </Box>
                          )}
                        </td>

                        {val.tm_goal_status === 1 ? (
                          <td style={{ textTransform: 'capitalize' }}>
                            {' '}
                            {val.tm_goal_name || 'not given'}
                          </td>
                        ) : (
                          <td
                            style={{ color: isPastDue(val.tm_goal_duedate) ? '#970C10' : 'black' }}
                          >
                            {val.tm_goal_name || 'not given'}
                          </td>
                        )}
                        {val.tm_goal_status === 1 ? (
                          <td>
                            {' '}
                            {moment(val.tm_goal_duedate).format('DD-MM-YYYY') || 'not given'}
                          </td>
                        ) : (
                          <td
                            style={{ color: isPastDue(val.tm_goal_duedate) ? '#970C10' : 'black' }}
                          >
                            {moment(val.tm_goal_duedate).format('DD-MM-YYYY hh:mm') || 'not given'}
                          </td>
                        )}
                        {val.tm_goal_status === 1 ? (
                          <td style={{ textTransform: 'capitalize' }}>
                            {' '}
                            {val.tm_goal_description || 'not given'}
                          </td>
                        ) : (
                          <td
                            style={{ color: isPastDue(val.tm_goal_duedate) ? '#970C10' : 'black' }}
                          >
                            {val.tm_goal_description || 'not given'}
                          </td>
                        )}
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </CssVarsProvider>
          </Paper>
        </Box>
      </Box>
    </Paper>
  )
}

export default memo(TmGoalsView)
