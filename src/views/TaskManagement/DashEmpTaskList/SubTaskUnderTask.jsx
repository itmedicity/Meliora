import { AccordionDetails, Box, FormLabel, Tooltip } from '@mui/joy'
import React, { memo, useEffect, useMemo, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import OtherSubTask from './OtherSubTask'
import EventNoteRoundedIcon from '@mui/icons-material/EventNoteRounded'
import CountDowncomponent from '../CountDown/CountDowncomponent'
const SubTaskUnderTask = ({ val, emp_no }) => {
  const { tm_task_slno } = val
  const [otherempTask, setOtherempTask] = useState([])
  const [empTask, setEmpTask] = useState([])
  const searchData = useMemo(() => {
    return {
      main_task_slno: tm_task_slno
    }
  }, [tm_task_slno])

  useEffect(() => {
    const getEmpTask = async () => {
      const result = await axioslogin.post('/TmTableView/subTaskUnderTask', searchData)
      const { success, data } = result.data
      if (success === 2) {
        const newData = data?.filter(val => val.tm_assigne_emp === emp_no)
        setEmpTask(newData)
        const othertask = data?.filter(val => val.tm_assigne_emp !== emp_no)
        const othrData = othertask.filter(val => {
          return !newData.find(value => value.tm_task_slno === val.tm_task_slno)
        })
        setOtherempTask(othrData)
      }
    }
    getEmpTask(searchData)
  }, [searchData, emp_no])
  const isPastDue = tm_task_due_date => {
    const today = new Date()
    const due = new Date(tm_task_due_date)
    return due < today
  }

  return (
    <Box sx={{ maxHeight: 400, overflow: 'auto' }}>
      {empTask &&
        empTask.map((val, index) => {
          let create_empnamee = val.create_empname
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
          return (
            <AccordionDetails
              key={val.tm_task_slno}
              sx={{
                borderLeft: 1,
                borderRight: 1,
                borderColor: '#BD97CB',
                height: 45,
                my: 0.5,
                mx: 1,
                px: 1,
                bgcolor: '#ede7f6',
                overflow: 'auto',
                borderRadius: 5
              }}
            >
              <Box sx={{ display: 'flex', mt: 0.5 }}>
                <Box>
                  <Tooltip title="#">
                    <FormLabel
                      sx={{
                        color: 'white',
                        width: 20,
                        height: 15,
                        fontSize: 10,
                        bgcolor: '#52688F',
                        display: 'flex',
                        justifyContent: 'center',
                        fontWeight: 500,
                        borderRadius: 10,
                        mt: 0.5,
                        mr: 0.5
                      }}
                    >
                      {index + 1}
                    </FormLabel>
                  </Tooltip>
                </Box>
                <Box sx={{ flex: 3.5 }}>
                  <Tooltip title="Subtask ">
                    {val.tm_task_status === 1 ? (
                      <FormLabel
                        sx={{
                          fontSize: 13,
                          textTransform: 'capitalize',
                          cursor: 'grab'
                        }}
                      >
                        {val.tm_task_name}
                      </FormLabel>
                    ) : (
                      <FormLabel
                        sx={{
                          fontSize: 13,
                          textTransform: 'capitalize',
                          cursor: 'grab',
                          color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'black'
                        }}
                      >
                        {val.tm_task_name}
                      </FormLabel>
                    )}
                  </Tooltip>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Tooltip title="Subtask Created by">
                    <FormLabel
                      sx={{
                        fontSize: 13,
                        flex: 0.5,
                        cursor: 'grab',
                        display: 'flex',
                        justifyContent: 'center',
                        color: '#3B0404',
                        textTransform: 'capitalize',
                        mt: 0.5
                      }}
                    >
                      {create_empnamee}
                    </FormLabel>
                  </Tooltip>
                </Box>
                {val.tm_task_status !== 1 ? (
                  <Box
                    sx={{
                      border: 0.1,
                      borderStyle: 'dashed',
                      borderColor: '#C3CEDA',
                      p: 0.5,
                      flex: 1
                    }}
                  >
                    <CountDowncomponent DueDates={val.tm_task_due_date} />
                  </Box>
                ) : (
                  <Box
                    sx={{
                      display: 'flex',
                      border: 0.1,
                      borderStyle: 'dashed',
                      borderColor: '#C3CEDA',
                      p: 0.5,
                      flex: 1,
                      justifyContent: 'center'
                    }}
                  >
                    <Box sx={{ flex: 0.5 }}></Box>
                    <Box sx={{ flex: 1 }}>completed</Box>
                    <Box sx={{ flex: 0.5 }}></Box>
                  </Box>
                )}
                <Box sx={{ flex: 1, ml: 0.5, pt: 0.5 }}>
                  <Tooltip title="Subtask Created Date">
                    {val.tm_task_status === 1 ? (
                      <FormLabel
                        sx={{
                          fontSize: 13,
                          flex: 0.5,
                          textTransform: 'capitalize',
                          cursor: 'grab'
                        }}
                      >
                        <EventNoteRoundedIcon sx={{ width: 20, height: 20, mt: 0.2, mr: 0.2, color: '#435D84' }} />{' '}
                        {val.create_date}
                      </FormLabel>
                    ) : (
                      <FormLabel
                        sx={{
                          fontSize: 13,
                          flex: 0.5,
                          textTransform: 'capitalize',
                          cursor: 'grab',
                          color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'black'
                        }}
                      >
                        <EventNoteRoundedIcon sx={{ width: 20, height: 20, mt: 0.2, mr: 0.2, color: '#435D84' }} />{' '}
                        {val.create_date}
                      </FormLabel>
                    )}
                  </Tooltip>
                </Box>
                <Box sx={{ flex: 1, pt: 0.5 }}>
                  <Tooltip title="Subtask Due Date">
                    {val.tm_task_status === 1 ? (
                      <FormLabel
                        sx={{
                          fontSize: 13,
                          textTransform: 'capitalize',
                          cursor: 'grab'
                        }}
                      >
                        <EventNoteRoundedIcon sx={{ width: 20, height: 20, mt: 0.2, mr: 0.2, color: '#435D84' }} />{' '}
                        {val.tm_task_due_date}
                      </FormLabel>
                    ) : (
                      <FormLabel
                        sx={{
                          fontSize: 13,
                          textTransform: 'capitalize',
                          cursor: 'grab',
                          color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'black'
                        }}
                      >
                        <EventNoteRoundedIcon sx={{ width: 20, height: 20, mt: 0.2, mr: 0.2, color: '#435D84' }} />{' '}
                        {val.tm_task_due_date}
                      </FormLabel>
                    )}
                  </Tooltip>
                </Box>
                <Box sx={{ flex: 0.5, pt: 0.5 }}>
                  <Tooltip title="Subtask Status">
                    <FormLabel
                      sx={{
                        fontSize: 13,
                        cursor: 'grab',
                        display: 'flex',
                        justifyContent: 'center',
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
                            ? '#5E376D'
                            : val.tm_task_status === 4
                            ? '#5885AF'
                            : 'transparent',
                        minHeight: 5,
                        fontWeight: 700
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
                </Box>
              </Box>
              {/* </FormControl> */}
            </AccordionDetails>
          )
        })}
      <AccordionDetails sx={{ width: '100%' }}>
        <OtherSubTask otherempTask={otherempTask} />
      </AccordionDetails>
    </Box>
  )
}

export default memo(SubTaskUnderTask)
