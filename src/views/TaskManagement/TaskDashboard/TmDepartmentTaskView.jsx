import React, { memo, useEffect, useCallback, useState } from 'react'
import { Box, Chip, CssVarsProvider, Table } from '@mui/joy'
import { Paper, Typography } from '@mui/material'
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch, useSelector } from 'react-redux'
import { getReqRegistListByDept } from 'src/redux/actions/ReqRegisterListByDept.action'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import moment from 'moment'
import EmpStatusUpdationinDash from '../Mytask/EmpStatusUpdationinDash'
import CountDowncomponent from '../CountDown/CountDowncomponent'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { useNavigate } from 'react-router-dom'
const TmDepartmentTaskView = ({
  tableCount,
  setTableCount,
  setdeptFlag,
  deptTableData,
  deptTaskHeading,
}) => {
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [editModalFlag, setEditModalFlag] = useState(0)
  const [masterData, setMasterData] = useState([])

  const history = useNavigate()
  const dispatch = useDispatch()
  //redux for geting login emp secid
  const empsecid = useSelector((state) => {
    return state.LoginUserData.empsecid
  })

  const rowSelectModal = useCallback((value) => {
    setEditModalFlag(1)
    setEditModalOpen(true)
    setMasterData(value)
  }, [])

  useEffect(() => {
    dispatch(getReqRegistListByDept(empsecid))
  }, [dispatch, empsecid])
  const backtoDash = useCallback(() => {
    history('/Home/TaskManagementDashboard')
    setdeptFlag(0)
  }, [history, setdeptFlag])
  const isPastDue = (tm_task_due_date) => {
    const today = new Date()
    const due = new Date(tm_task_due_date)
    return due < today
  }
  const { tm_task_status } = deptTableData[0]
  return (
    <Paper sx={{ height: '90vh' }}>
      <Box sx={{ flex: 1, height: 30, display: 'flex' }}>
        <Typography sx={{ color: 'grey', fontWeight: 500, flex: 1, pt: 0.5, pl: 1 }}>
          {deptTaskHeading}
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
            {editModalFlag === 1 ? (
              <EmpStatusUpdationinDash
                open={editModalOpen}
                setEditModalOpen={setEditModalOpen}
                masterData={masterData}
                setEditModalFlag={setEditModalFlag}
                tableCount={tableCount}
                setTableCount={setTableCount}
              />
            ) : null}
            <CssVarsProvider>
              <Table padding={'none'} stickyHeader size="sm">
                <thead>
                  <tr>
                    <th style={{ width: 50 }}>#</th>
                    <th style={{ width: 60 }}>Action</th>
                    <th style={{ width: 120 }}>Status</th>
                    {tm_task_status === 1 ? (
                      <th style={{ width: 200 }}>Completion Exceeded</th>
                    ) : (
                      <th style={{ width: 200 }}>Count down</th>
                    )}
                    <th style={{ width: 600 }}>Task Name</th>
                    <th style={{ width: 500 }}>Project</th>
                    <th style={{ width: 170 }}>Assignee</th>
                    <th style={{ width: 150 }}>Created Date</th>
                    <th style={{ width: 150 }}> Due Date</th>
                    <th style={{ width: 600 }}>Task Description</th>
                  </tr>
                </thead>
                <tbody>
                  {deptTableData?.map((val, index) => {
                    return (
                      <tr
                        key={index}
                        style={{
                          height: 8,
                          background:
                            val.main_task_slno !== null
                              ? '#EAE7FA'
                              : val.main_task_slno === 0
                              ? '#EAE7FA'
                              : 'transparent',
                          minHeight: 5,
                        }}
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
                            sx={{
                              fontSize: 12,
                              color:
                                val.tm_task_status === null
                                  ? '#311E26'
                                  : val.tm_task_status === 0
                                  ? '#311E26'
                                  : val.tm_task_status === 1
                                  ? '#94C973'
                                  : val.tm_task_status === 2
                                  ? '#D37506'
                                  : val.tm_task_status === 3
                                  ? '#67595E'
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
                          </Chip>
                        </td>
                        {val.tm_task_status !== 1 ? (
                          <td>
                            <Box
                              sx={{
                                bgcolor: '#EAEAEA',
                                borderRadius: 15,
                                mb: 0.5,
                                width: 150,
                                pl: 1,
                              }}
                            >
                              <CountDowncomponent DueDates={val.tm_task_due_date} />
                            </Box>
                          </td>
                        ) : (
                          <td>
                            {val.datediff > 0 ? (
                              <Chip
                                sx={{
                                  backgroundColor: '#EECE88',
                                  color: '#3B0404',
                                  fontWeight: 600,
                                  fontSize: 12,
                                }}
                              >
                                {val.days} Days - {val.hours}h: {val.minutes}m: {val.seconds}s
                              </Chip>
                            ) : (
                              <Chip style={{ color: '#578E87', fontSize: 12 }}>
                                Completed On Time
                              </Chip>
                            )}
                          </td>
                        )}
                        {val.tm_task_status === 1 ? (
                          <td style={{ textTransform: 'capitalize' }}>
                            {' '}
                            {val.tm_task_name || 'not given'}
                          </td>
                        ) : (
                          <td
                            style={{
                              textTransform: 'capitalize',
                              color: isPastDue(val.tm_task_due_date) ? '#970C10' : 'black',
                            }}
                          >
                            {' '}
                            {val.tm_task_name || 'not given'}
                          </td>
                        )}
                        {val.tm_task_status === 1 ? (
                          <td style={{ textTransform: 'capitalize' }}>
                            {' '}
                            {val.tm_project_name || 'not given'}
                          </td>
                        ) : (
                          <td
                            style={{
                              textTransform: 'capitalize',
                              color: isPastDue(val.tm_task_due_date) ? '#970C10' : 'black',
                            }}
                          >
                            {' '}
                            {val.tm_project_name || 'not given'}
                          </td>
                        )}
                        {val.tm_task_status === 1 ? (
                          <td style={{ textTransform: 'capitalize' }}>
                            {' '}
                            {val.em_name || 'not given'}
                          </td>
                        ) : (
                          <td
                            style={{
                              textTransform: 'capitalize',
                              color: isPastDue(val.tm_task_due_date) ? '#970C10' : 'black',
                            }}
                          >
                            {val.em_name || 'not given'}
                          </td>
                        )}
                        {val.tm_task_status === 1 ? (
                          <td>
                            {' '}
                            {moment(val.create_date).format('DD-MM-YYYY hh:mm') || 'not given'}
                          </td>
                        ) : (
                          <td
                            style={{ color: isPastDue(val.tm_task_due_date) ? '#970C10' : 'black' }}
                          >
                            {moment(val.create_date).format('DD-MM-YYYY hh:mm') || 'not given'}
                          </td>
                        )}
                        {val.tm_task_status === 1 ? (
                          <td>
                            {' '}
                            {moment(val.tm_task_due_date).format('DD-MM-YYYY') || 'not given'}
                          </td>
                        ) : (
                          <td
                            style={{ color: isPastDue(val.tm_task_due_date) ? '#970C10' : 'black' }}
                          >
                            {moment(val.tm_task_due_date).format('DD-MM-YYYY hh:mm') || 'not given'}
                          </td>
                        )}
                        {val.tm_task_status === 1 ? (
                          <td style={{ textTransform: 'capitalize' }}>
                            {' '}
                            {val.tm_task_description || 'not given'}
                          </td>
                        ) : (
                          <td
                            style={{
                              textTransform: 'capitalize',
                              color: isPastDue(val.tm_task_due_date) ? '#970C10' : 'black',
                            }}
                          >
                            {' '}
                            {val.tm_task_description || 'not given'}
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

export default memo(TmDepartmentTaskView)
