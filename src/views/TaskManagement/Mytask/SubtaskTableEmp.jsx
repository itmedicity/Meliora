import { Box, Chip, CssVarsProvider, Table } from '@mui/joy'
import { Paper } from '@mui/material'
import React, { memo, useEffect, useMemo } from 'react'
import EditIcon from '@mui/icons-material/Edit'
import { axioslogin } from 'src/views/Axios/Axios'
import moment from 'moment'
import { useSelector } from 'react-redux'

const SubtaskTableEmp = ({
  tm_task_slno,
  selectForEditsSubTask,
  setCompleteFlag,
  tableRendering,
  setSubTask,
  subTask,
  setViewSubTask,
}) => {
  const empsecid = useSelector((state) => {
    return state.LoginUserData.empsecid
  })

  const searchData = useMemo(() => {
    return {
      main_task_slno: tm_task_slno,
      tm_task_dept_sec: empsecid,
    }
  }, [tm_task_slno, empsecid])

  useEffect(() => {
    const getSubTask = async () => {
      const result = await axioslogin.post('/taskManagement/subtaskUnderdepSec', searchData)
      const { success, data } = result.data
      if (success === 2) {
        const subtaskData =
          data &&
          data.map((val) => {
            return {
              tm_task_slno: val.tm_task_slno,
              tm_task_name: val.tm_task_name,
              tm_task_dept: val.tm_task_dept,
              dept_name: val.dept_name,
              sec_name: val.sec_name,
              tm_assigne_emp: val.tm_assigne_emp,
              em_name: val.em_name,
              tm_task_dept_sec: val.tm_task_dept_sec,
              tm_task_due_date: val.tm_task_due_date,
              tm_task_description: val.tm_task_description,
              tm_task_status: val.tm_task_status,
              tm_pending_remark: val.tm_pending_remark,
              tm_onhold_remarks: val.tm_onhold_remarks,
              tm_project_slno: val.tm_project_slno,
              tm_completed_remarks: val.tm_completed_remarks,
              create_date: val.create_date,
              main_task_slno: val.main_task_slno,
              tm_complete_date: val.tm_complete_date,
              tm_mast_duedate_count: val.tm_mast_duedate_count,
              TaskStatus:
                val.tm_task_status === 1
                  ? 'Completed'
                  : val.tm_task_status === 2
                    ? 'On Progress'
                    : val.tm_task_status === 3
                      ? 'On Hold'
                      : val.tm_task_status === 4
                        ? 'Pending'
                        : val.tm_task_status === 0
                          ? 'Not Started'
                          : 'Not Started',
            }
          })
        setSubTask(subtaskData)
        setViewSubTask(1)
        const filterData = data && data.filter((val) => val.tm_task_status !== 1)
        setCompleteFlag(filterData)
      } else {
        setCompleteFlag([])
        setSubTask([])
      }
    }
    getSubTask(searchData)
  }, [searchData, tableRendering, setSubTask, setCompleteFlag, setViewSubTask])

  return (
    <Box>
      {subTask.length !== 0 ? (
        <Paper
          variant="outlined"
          sx={{ maxWidth: '100%', overflow: 'auto', mx: 1, maxHeight: 400, my: 1 }}
        >
          <CssVarsProvider>
            <Table stickyHeader hoverRow size="sm">
              <thead>
                <tr>
                  <th style={{ width: 50 }}>#</th>
                  <th style={{ width: 60 }}>Action</th>
                  <th style={{ width: 100 }}>status</th>
                  <th style={{ width: 500 }}>Subtask</th>
                  <th style={{ width: 300 }}>Assignee</th>
                  <th style={{ width: 200 }}>created date</th>
                  <th style={{ width: 200 }}>Due date</th>
                  <th style={{ width: 330 }}>Description</th>
                </tr>
              </thead>
              <tbody>
                {subTask?.map((val, index) => {
                  return (
                    <tr
                      key={index}
                      // sx={{
                      //     '&:last-child td, &:last-child th': { border: 0 }, maxHeight: 60,
                      //     minHeight: 5
                      // }}
                    >
                      <td> {index + 1}</td>
                      <td>
                        <EditIcon
                          sx={{ cursor: 'pointer' }}
                          size={6}
                          onClick={() => selectForEditsSubTask(val)}
                        />
                      </td>
                      <td>
                        <Chip
                          sx={{
                            fontSize: 12,
                            color:
                              val.tm_task_status === null
                                ? 'darkred'
                                : val.tm_task_status === 0
                                  ? 'darkred'
                                  : val.tm_task_status === 1
                                    ? '#94C973'
                                    : val.tm_task_status === 2
                                      ? '#EFD593'
                                      : val.tm_task_status === 3
                                        ? '#67595E'
                                        : val.tm_task_status === 4
                                          ? '#5885AF'
                                          : 'transparent',
                          }}
                        >
                          {val.TaskStatus}
                        </Chip>
                      </td>
                      <td style={{ textTransform: 'capitalize' }}>
                        {' '}
                        {val.tm_task_name || 'not given'}
                      </td>
                      <td style={{ textTransform: 'capitalize' }}> {val.em_name || 'not given'}</td>
                      <td> {moment(val.create_date).format('DD-MM-YYYY hh:mm') || 'not given'}</td>
                      <td>
                        {' '}
                        {moment(val.tm_task_due_date).format('DD-MM-YYYY hh:mm') || 'not given'}
                      </td>
                      <td style={{ textTransform: 'capitalize' }}>
                        {' '}
                        {val.tm_task_description || 'not given'}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </CssVarsProvider>
        </Paper>
      ) : (
        <Box></Box>
      )}
    </Box>
  )
}

export default memo(SubtaskTableEmp)
