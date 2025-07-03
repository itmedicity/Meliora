import React, { memo } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Box, FormLabel, Tooltip } from '@mui/joy'
import EventNoteRoundedIcon from '@mui/icons-material/EventNoteRounded'
import { Paper } from '@mui/material'
import CountDowncomponent from '../CountDown/CountDowncomponent'

const TaskCountWithoutThisEmp = ({ otherempTask }) => {
  const isPastDue = tm_task_due_date => {
    const today = new Date()
    const due = new Date(tm_task_due_date)
    return due < today
  }
  return (
    <Box>
      {otherempTask.length !== 0 ? (
        <Box>
          <Accordion>
            <AccordionSummary
              sx={{
                bgcolor: '#B9B7BD',
                display: 'flex',
                borderTop: 1,
                borderRight: 1,
                borderLeft: 1,
                borderTopRightRadius: 2,
                borderTopLeftRadius: 2,
                borderColor: '#ADC9C5',
                cursor: 'Pointer',
              }}
            >
              <Box sx={{ flex: 1 }}>Other Tasks under this Project</Box>
              <Box>({otherempTask.length})</Box>
            </AccordionSummary>
            <AccordionDetails>
              {otherempTask &&
                otherempTask.map((val, index) => {
                  let create_empnamee = val.create_empname
                    .toLowerCase()
                    .split(' ')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ')
                  let assignedEmp_name = val.task_empname
                    .toLowerCase()
                    .split(' ')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ')
                  return (
                    <Paper
                      key={val.tm_task_slno}
                      sx={{
                        minHeight: 33,
                        maxHeight: 50,
                        bgcolor: '#E4E5E8',
                        borderRadius: 0,
                        display: 'flex',
                        mt: 0.5,
                        color: 'black',
                      }}
                    >
                      <Box
                        sx={{
                          borderRadius: 10,
                          width: 20,
                          height: 20,
                          fontSize: 10,
                          bgcolor: '#67595E',
                          display: 'flex',
                          justifyContent: 'center',
                          pt: 0.3,
                          fontWeight: 800,
                          mt: 1,
                          mx: 0.5,
                          color: 'white',
                        }}
                      >
                        {index + 1}
                      </Box>
                      <Tooltip title="Task ">
                        {val.tm_task_status === 1 ? (
                          <FormLabel
                            sx={{
                              fontSize: 13,
                              flex: 4,
                              textTransform: 'capitalize',
                              cursor: 'grab',
                            }}
                          >
                            {val.tm_task_name}
                          </FormLabel>
                        ) : (
                          <FormLabel
                            sx={{
                              fontSize: 13,
                              flex: 4,
                              textTransform: 'capitalize',
                              cursor: 'grab',
                              color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'black',
                            }}
                          >
                            {val.tm_task_name}
                          </FormLabel>
                        )}
                      </Tooltip>
                      <Tooltip title="Task Created by">
                        <FormLabel
                          sx={{
                            fontSize: 13,
                            flex: 0.8,
                            cursor: 'grab',
                            display: 'flex',
                            justifyContent: 'center',
                            color: '#3B0404',
                            textTransform: 'capitalize',
                          }}
                        >
                          {create_empnamee}
                        </FormLabel>
                      </Tooltip>
                      <Tooltip title="Task Assigned to">
                        <FormLabel
                          sx={{
                            fontSize: 13,
                            flex: 0.8,
                            cursor: 'grab',
                            display: 'flex',
                            justifyContent: 'center',
                            color: '#3B0404',
                            textTransform: 'capitalize',
                          }}
                        >
                          {assignedEmp_name}
                        </FormLabel>
                      </Tooltip>
                      <Tooltip>
                        {val.tm_task_status !== 1 ? (
                          <Box
                            sx={{
                              border: 1,
                              borderRadius: 3,
                              borderColor: '#C3CEDA',
                              p: 0.5,
                              flex: 1,
                              justifyContent: 'center',
                              mr: 0.5,
                            }}
                          >
                            <CountDowncomponent DueDates={val.tm_task_due_date} />
                          </Box>
                        ) : (
                          <Box
                            sx={{
                              display: 'flex',
                              border: 1,
                              borderRadius: 3,
                              borderColor: '#C3CEDA',
                              p: 0.5,
                              flex: 1,
                              justifyContent: 'center',
                              mr: 0.5,
                            }}
                          >
                            completed
                          </Box>
                        )}
                      </Tooltip>
                      <Tooltip title="Task Created Date">
                        {val.tm_task_status === 1 ? (
                          <FormLabel
                            sx={{
                              fontSize: 13,
                              flex: 1,
                              textTransform: 'capitalize',
                              cursor: 'grab',
                            }}
                          >
                            <EventNoteRoundedIcon
                              sx={{ width: 20, height: 20, mt: 0.2, mr: 0.2, color: '#435D84' }}
                            />{' '}
                            {val.create_date}
                          </FormLabel>
                        ) : (
                          <FormLabel
                            sx={{
                              fontSize: 13,
                              flex: 1,
                              textTransform: 'capitalize',
                              cursor: 'grab',
                              color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'black',
                              display: 'flex',
                            }}
                          >
                            <EventNoteRoundedIcon
                              sx={{ width: 20, height: 20, mt: 0.2, mr: 0.2, color: '#435D84' }}
                            />{' '}
                            {val.create_date}
                          </FormLabel>
                        )}
                      </Tooltip>
                      <Tooltip title="Task Due Date">
                        {val.tm_task_status === 1 ? (
                          <FormLabel
                            sx={{
                              fontSize: 13,
                              flex: 1,
                              textTransform: 'capitalize',
                              cursor: 'grab',
                            }}
                          >
                            <EventNoteRoundedIcon
                              sx={{ width: 20, height: 20, mt: 0.2, mr: 0.2, color: '#435D84' }}
                            />{' '}
                            {val.tm_task_due_date}
                          </FormLabel>
                        ) : (
                          <FormLabel
                            sx={{
                              fontSize: 13,
                              flex: 1,
                              textTransform: 'capitalize',
                              cursor: 'grab',
                              color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'black',
                            }}
                          >
                            <EventNoteRoundedIcon
                              sx={{ width: 20, height: 20, mt: 0.2, mr: 0.2, color: '#435D84' }}
                            />{' '}
                            {val.tm_task_due_date}
                          </FormLabel>
                        )}
                      </Tooltip>
                      <Box sx={{ flex: 0.8, pt: 0.5 }}>
                        <Tooltip title="Task Status">
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
                          </FormLabel>
                        </Tooltip>
                      </Box>
                    </Paper>
                  )
                })}
            </AccordionDetails>
          </Accordion>
        </Box>
      ) : (
        <Box></Box>
      )}
    </Box>
  )
}

export default memo(TaskCountWithoutThisEmp)
