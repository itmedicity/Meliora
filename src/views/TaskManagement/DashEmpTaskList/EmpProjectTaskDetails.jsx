import { AccordionDetails, Box, Stack, Tooltip } from '@mui/joy'
import React, { memo, useEffect, useState } from 'react'
import FormControl from '@mui/joy/FormControl'
import FormLabel from '@mui/joy/FormLabel'
import { axioslogin } from 'src/views/Axios/Axios'
import EmpTaskUnderProjectCount from './EmpTaskUnderProjectCount'
import OtherTaskCount from './OtherTaskCount'
import AlignHorizontalRightRoundedIcon from '@mui/icons-material/AlignHorizontalRightRounded'
import EventNoteRoundedIcon from '@mui/icons-material/EventNoteRounded'

const EmpProjectTaskDetails = ({ val }) => {
  const { emslno } = val
  const [empProject, setEmpProject] = useState([])
  useEffect(() => {
    const getAllEmployeeTask = async () => {
      const result = await axioslogin.get(`/TmTableView/EmpProjectTask/${emslno}`)
      const { success, data } = result.data
      if (success === 2) {
        setEmpProject(data)
      }
    }
    getAllEmployeeTask(emslno)
  }, [emslno])

  const isPastDue = tm_task_due_date => {
    const today = new Date()
    const due = new Date(tm_task_due_date)
    return due < today
  }
  return (
    <Box>
      {empProject &&
        empProject.map(val => {
          return (
            <AccordionDetails key={val.tm_project_slno} sx={{ mx: 3, margin: '-8px' }}>
              <Stack>
                <FormControl
                  orientation="horizontal"
                  sx={{
                    height: 50,
                    pl: 2,
                    bgcolor: '#EAEFF2',
                    overflow: 'auto',
                    borderBottom: 1,
                    borderRadius: 5,
                    borderColor: '#B7CFDC',
                  }}
                >
                  {/* <Avatar size='xs' sx={{ size: 'xs', bgcolor: 'white', height: 20, mt: 2 }}> */}
                  <AlignHorizontalRightRoundedIcon
                    sx={{ width: 20, height: 20, mt: 2, color: '#435D84' }}
                  />
                  {/* </Avatar> */}
                  <Tooltip title="Project">
                    <FormLabel
                      sx={{ fontSize: 13, flex: 5, textTransform: 'capitalize', cursor: 'grab' }}
                    >
                      {val.tm_project_name}
                    </FormLabel>
                  </Tooltip>
                  <EventNoteRoundedIcon
                    sx={{ width: 20, height: 20, mt: 2, mr: 0.2, color: '#435D84' }}
                  />
                  <Tooltip title="Project Created Date">
                    <FormLabel sx={{ fontSize: 13, flex: 0.9, cursor: 'grab' }}>
                      {' '}
                      {val.create_date}
                    </FormLabel>
                  </Tooltip>
                  <EventNoteRoundedIcon
                    sx={{ width: 20, height: 20, mt: 2, mr: 0.2, color: '#435D84' }}
                  />
                  <Tooltip title="Project Due Date">
                    {val.tm_project_status === 1 ? (
                      <FormLabel
                        sx={{
                          fontSize: 13,
                          flex: 0.8,
                          textTransform: 'capitalize',
                          cursor: 'grab',
                        }}
                      >
                        {val.tm_project_duedate}
                      </FormLabel>
                    ) : (
                      <FormLabel
                        sx={{
                          fontSize: 13,
                          flex: 0.8,
                          textTransform: 'capitalize',
                          cursor: 'grab',
                          color: isPastDue(val.tm_project_duedate) ? '#B32800' : 'black',
                        }}
                      >
                        {val.tm_project_duedate}
                      </FormLabel>
                    )}
                  </Tooltip>
                  <EmpTaskUnderProjectCount val={val} emslno={emslno} />
                </FormControl>
              </Stack>
            </AccordionDetails>
          )
        })}
      <AccordionDetails>
        <OtherTaskCount val={val} />
      </AccordionDetails>
    </Box>
  )
}
export default memo(EmpProjectTaskDetails)
