import { Box, Chip, FormLabel, Tooltip, Typography } from '@mui/joy'
import React, { memo, useEffect, useState } from 'react'
import AccordionGroup from '@mui/joy/AccordionGroup'
import Accordion from '@mui/joy/Accordion'
import accordionDetailsClasses from '@mui/joy/AccordionDetails'
import AccordionSummary, { accordionSummaryClasses } from '@mui/joy/AccordionSummary'
import Avatar from '@mui/joy/Avatar'
import { useDispatch, useSelector } from 'react-redux'
import { getDepartSecemployee } from 'src/redux/actions/EmpNameDeptSect.action'
import { axioslogin } from 'src/views/Axios/Axios'
import AlignHorizontalRightRoundedIcon from '@mui/icons-material/AlignHorizontalRightRounded'
import TmProjectCircularProgress from './TmProjectCircularProgress'
import EmployeeUnderProject from './EmployeeUnderProject'
import CountDowncomponent from '../CountDown/CountDowncomponent'
import EventIcon from '@mui/icons-material/Event'

const TmProjectTaskData = () => {
  const dispatch = useDispatch()
  const empsecid = useSelector(state => {
    return state.LoginUserData.empsecid
  })
  const [allProject, setAllProject] = useState([])
  useEffect(() => {
    dispatch(getDepartSecemployee(empsecid))
  }, [dispatch, empsecid])

  useEffect(() => {
    const getAllProjectUnderSection = async () => {
      const result = await axioslogin.get(`/taskmanagement/getDeptProjects/${empsecid}`)
      const { success, data } = result.data
      if (success === 2) {
        setAllProject(data)
      }
    }
    getAllProjectUnderSection(empsecid)
  }, [empsecid])

  const isPastDue = tm_task_due_date => {
    const today = new Date()
    const due = new Date(tm_task_due_date)
    return due < today
  }

  return (
    <Box sx={{ height: '66vh', overflow: 'auto' }}>
      <AccordionGroup
        variant="plain"
        transition="0.2s"
        sx={{
          [`& .${accordionDetailsClasses.content}.${accordionDetailsClasses.expanded}`]: {},
          [`& .${accordionSummaryClasses.button}`]: {
            // paddingBlock: '.5rem',
          },
        }}
      >
        {allProject &&
          allProject.map(val => {
            return (
              <Accordion key={val.tm_project_slno}>
                <AccordionSummary>
                  <Avatar size="sm" color="primary">
                    <AlignHorizontalRightRoundedIcon sx={{ color: '#435D84' }} />
                  </Avatar>
                  <Tooltip title="Projects">
                    <Box sx={{ flex: 6, textTransform: 'capitalize' }}>
                      <Typography sx={{ fontSize: 12 }}>{val.tm_project_name}</Typography>
                    </Box>
                  </Tooltip>
                  <Box>
                    {val.tm_project_status !== 1 ? (
                      <Box
                        sx={{
                          border: 0.1,
                          borderColor: '#78909c',
                          borderStyle: 'dashed',
                          width: 155,
                          pl: 0.5,
                          borderRadius: 20,
                          fontSize: 10,
                        }}
                      >
                        <CountDowncomponent DueDates={val.tm_project_duedate} />
                      </Box>
                    ) : (
                      <Chip
                        sx={{
                          display: 'flex',
                          width: 170,
                          flex: 1,
                          borderRadius: 20,
                          mt: 0.5,
                          px: 6,
                          justifyContent: 'center',
                        }}
                      >
                        completed
                      </Chip>
                    )}
                  </Box>
                  <Box sx={{ flex: 1.5 }}>
                    <Tooltip title="Project created Date">
                      <Typography sx={{ cursor: 'grab', fontSize: 12 }}>
                        {' '}
                        <EventIcon fontSize="sm" />
                        {val.create_date}
                      </Typography>
                    </Tooltip>
                  </Box>
                  <Box sx={{ flex: 1.5 }}>
                    <Tooltip title="Project Due Date">
                      {val.tm_project_status === 1 ? (
                        <FormLabel
                          sx={{
                            fontSize: 12,
                            flex: 0.8,
                            textTransform: 'capitalize',
                            cursor: 'grab',
                          }}
                        >
                          <EventIcon fontSize="sm" />
                          {val.tm_project_duedate}
                        </FormLabel>
                      ) : (
                        <FormLabel
                          sx={{
                            fontSize: 12,
                            flex: 0.8,
                            textTransform: 'capitalize',
                            cursor: 'grab',
                            color: isPastDue(val.tm_project_duedate) ? '#B32800' : 'black',
                          }}
                        >
                          <EventIcon fontSize="sm" /> {val.tm_project_duedate}
                        </FormLabel>
                      )}
                    </Tooltip>
                  </Box>
                  <Box>
                    <TmProjectCircularProgress val={val} />
                  </Box>
                </AccordionSummary>
                <EmployeeUnderProject val={val} />
              </Accordion>
            )
          })}
      </AccordionGroup>
    </Box>
  )
}

export default memo(TmProjectTaskData)
