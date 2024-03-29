import React, { memo, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Accordion, AccordionGroup, AccordionSummary, Box, FormLabel, Tooltip, accordionClasses } from '@mui/joy'
import _ from 'underscore';
import { axioslogin } from 'src/views/Axios/Axios';
import TmProjectCircularProgress from '../DashProjectTaskList/TmProjectCircularProgress';
import EmpTaskUderProject from '../DashEmpTaskList/EmpTaskUderProject';
import MainTaskProgress from '../DashEmpTaskList/MainTaskProgress';
import SubTaskUnderTask from '../DashEmpTaskList/SubTaskUnderTask';
import CountDowncomponent from '../CountDown/CountDowncomponent';
import EventNoteRoundedIcon from '@mui/icons-material/EventNoteRounded';

const MyProgressView = () => {

    const id = useSelector((state) => state.LoginUserData.empid, _.isEqual)
    const [empProject, setEmpProject] = useState([])
    const [taskList, setTaskList] = useState([])
    useEffect(() => {
        const getAllProjectTask = async () => {
            const result = await axioslogin.get(`/TmTableView/EmpProjectTask/${id}`);
            const { success, data } = result.data;
            if (success === 2) {
                setEmpProject(data)
            }
        }
        getAllProjectTask(id)
    }, [id])

    useEffect(() => {
        const getAllEmployeeTask = async () => {
            const result = await axioslogin.get(`/TmTableView/allEmployeeTaskList/${id}`);
            const { success, data } = result.data;
            if (success === 2) {
                setTaskList(data)
            }
        }
        getAllEmployeeTask(id)
    }, [id])

    const isPastDue = (tm_task_due_date) => {
        const today = new Date();
        const due = new Date(tm_task_due_date);
        return due < today
    }
    return (
        <Box sx={{ maxHeight: 700, overflow: 'auto' }}>
            <Box sx={{ height: 30, fontSize: 18, fontWeight: 500, mt: 1, mx: .5, bgcolor: '#BEAFC2', pl: 1, color: 'white' }}>Projects</Box>
            <Box sx={{ pl: 1, mr: 3, mt: .5, }}>
                {empProject.length !== 0 ?
                    <Box sx={{ minHeight: 50, maxHeight: 450, overflow: 'auto', }}>
                        {
                            empProject && empProject.map((val,) => {
                                return <AccordionGroup key={val.tm_project_slno}
                                    sx={{
                                        [`& .${accordionClasses.root}`]: {
                                            transition: '0.2s ease',
                                            '& button:not([aria-expanded="true"])': {
                                            },
                                            '& button:hover': {
                                                background: 'transparent',
                                            },
                                        },
                                        [`& .${accordionClasses.root}.${accordionClasses.expanded}`]: {
                                            bgcolor: 'white',
                                            borderRadius: 'md',
                                            border: '1px solid',
                                            borderColor: 'background.level2',
                                        },
                                        '& [aria-expanded="true"]': {
                                            boxShadow: (theme) => `inset 0 -1px 0 ${theme.vars.palette.divider}`,
                                        },
                                    }}
                                >
                                    <Accordion key={val.tm_project_slno}>
                                        <AccordionSummary sx={{
                                            height: 55, bgcolor: '#C3CEDA', px: 2,
                                            borderTop: 1, borderTopLeftRadius: 2, borderTopRightRadius: 2,
                                            borderColor: '#ADC9C5'
                                        }} >

                                            <Box sx={{ flex: 5, }}>
                                                <Tooltip title="Project" >
                                                    {val.tm_project_status === 1 ?
                                                        <FormLabel sx={{
                                                            fontSize: 14, flex: .8, textTransform: 'capitalize', cursor: 'grab',
                                                        }}>
                                                            {val.tm_project_name}
                                                        </FormLabel> :
                                                        <FormLabel sx={{
                                                            fontSize: 14, flex: .8, textTransform: 'capitalize', cursor: 'grab',
                                                            color: isPastDue(val.tm_project_duedate) ? '#B32800' : 'black'
                                                        }}>
                                                            {val.tm_project_name}
                                                        </FormLabel>}
                                                </Tooltip>
                                            </Box>
                                            <Box sx={{ flex: 1.3 }}>
                                                <Tooltip>
                                                    {val.tm_project_status !== 1 ?
                                                        <Box sx={{ border: .1, borderStyle: 'dashed', borderColor: 'white', p: .5, flex: 1, }}>
                                                            <CountDowncomponent DueDates={val.tm_project_duedate} />
                                                        </Box> :
                                                        <Box sx={{ display: 'flex', border: .1, borderStyle: 'dashed', borderColor: 'white', p: .5, flex: 1, }}>
                                                            <Box sx={{ flex: .5, }}></Box>
                                                            <Box sx={{ flex: 1, }}>0&nbsp;Days&nbsp;:00&nbsp;hh&nbsp;:00&nbsp;mm&nbsp;:00&nbsp;ss</Box>
                                                            <Box sx={{ flex: .5 }}></Box>
                                                        </Box>
                                                    }
                                                </Tooltip>
                                            </Box>
                                            <Box sx={{ flex: 1.2, display: 'flex', justifyContent: 'flex-end' }}>
                                                <Tooltip title="Project Created Date" >
                                                    {val.tm_project_status === 1 ?
                                                        <FormLabel sx={{
                                                            fontSize: 14, flex: .8, textTransform: 'capitalize', cursor: 'grab',
                                                        }}>
                                                            <EventNoteRoundedIcon sx={{ width: 20, height: 20, mt: .2, mr: .2, color: '#435D84' }} />    {val.create_date}
                                                        </FormLabel> :
                                                        <FormLabel sx={{
                                                            fontSize: 14, flex: .8, textTransform: 'capitalize', cursor: 'grab',
                                                            color: isPastDue(val.tm_project_duedate) ? '#B32800' : 'black'
                                                        }}>
                                                            <EventNoteRoundedIcon sx={{ width: 20, height: 20, mt: .2, mr: .2, color: '#435D84' }} />     {val.create_date}
                                                        </FormLabel>}
                                                </Tooltip>
                                            </Box>
                                            <Box>
                                                <Tooltip title="Project due Date" >
                                                    {val.tm_project_status === 1 ?
                                                        <FormLabel sx={{
                                                            fontSize: 14, flex: .8, textTransform: 'capitalize', cursor: 'grab',
                                                        }}>
                                                            <EventNoteRoundedIcon sx={{ width: 20, height: 20, mt: .2, mr: .2, color: '#435D84' }} />    {val.tm_project_duedate}
                                                        </FormLabel> :
                                                        <FormLabel sx={{
                                                            fontSize: 14, flex: .8, textTransform: 'capitalize', cursor: 'grab',
                                                            color: isPastDue(val.tm_project_duedate) ? '#B32800' : 'black'
                                                        }}>
                                                            <EventNoteRoundedIcon sx={{ width: 20, height: 20, mt: .2, mr: .2, color: '#435D84' }} />     {val.tm_project_duedate}
                                                        </FormLabel>}
                                                </Tooltip>
                                            </Box>
                                            <Box>
                                                <TmProjectCircularProgress val={val} />
                                            </Box>
                                        </AccordionSummary >
                                        <EmpTaskUderProject val={val} />
                                    </Accordion>
                                </AccordionGroup>
                            })
                        }
                    </Box > :
                    <Box sx={{ textAlign: 'center', pt: 3, height: 80, fontWeight: 700, fontSize: 30, color: '#C7C8CB', }}>
                        No Task assigned under Projects
                    </Box>}
            </Box>
            <Box sx={{ height: 30, fontSize: 18, fontWeight: 500, mt: 1, mx: .5, bgcolor: '#BEAFC2', pl: 1, color: 'white' }}> Task without projects</Box>
            <Box sx={{ pl: 2, mr: 3, mt: .1 }}>
                {taskList.length !== 0 ?
                    <Box sx={{ minHeight: 150, maxHeight: 530, overflow: 'auto', }}>
                        {
                            taskList && taskList.map((val, index) => {
                                let create_empnamee = val.create_empname.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
                                return <Box key={val.tm_task_slno} sx={{ my: .8, mx: 1, }}>
                                    <Accordion >
                                        <AccordionSummary sx={{
                                            height: 45, bgcolor: '#F0F2F3', px: 2,
                                            borderRight: 1, borderLeft: 1,
                                            borderColor: '#ADC9C5'
                                        }}>
                                            <Box sx={{ borderRadius: 10, width: 20, height: 20, fontSize: 11, bgcolor: '#B2C4CB', display: 'flex', justifyContent: 'center', mt: .5, mr: .5, pt: .3, fontWeight: 800 }}>
                                                {index + 1}
                                            </Box>

                                            <Tooltip title="Task">
                                                {val.tm_task_status === 1 ?
                                                    <FormLabel sx={{
                                                        fontSize: 13, flex: 3, textTransform: 'capitalize', cursor: 'grab',
                                                    }}>
                                                        {val.tm_task_name}
                                                    </FormLabel> :
                                                    <FormLabel sx={{
                                                        fontSize: 13, flex: 3, textTransform: 'capitalize', cursor: 'grab',
                                                        color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'black'
                                                    }}>
                                                        {val.tm_task_name}
                                                    </FormLabel>}
                                            </Tooltip>
                                            <Tooltip title="Task Created by">
                                                <FormLabel sx={{
                                                    fontSize: 13, flex: .5, cursor: 'grab', display: 'flex', justifyContent: 'center',
                                                    color: '#3B0404', textTransform: 'capitalize'
                                                }}>
                                                    {create_empnamee}</FormLabel>
                                            </Tooltip>
                                            <Tooltip>
                                                {val.tm_task_status !== 1 ?
                                                    <Box sx={{ border: .1, borderStyle: 'dashed', borderColor: '#C3CEDA', p: .5, flex: .9 }}>
                                                        <CountDowncomponent DueDates={val.tm_task_due_date} />
                                                    </Box> :
                                                    <Box sx={{ display: 'flex', border: .1, borderStyle: 'dashed', borderColor: 'white', p: .5, flex: 1, }}>
                                                        <Box sx={{ flex: .5, }}></Box>
                                                        <Box sx={{ flex: 1, }}>0&nbsp;Days&nbsp;:00&nbsp;hh&nbsp;:00&nbsp;mm&nbsp;:00&nbsp;ss</Box>
                                                        <Box sx={{ flex: .5 }}></Box>
                                                    </Box>
                                                }
                                            </Tooltip>
                                            <Tooltip title="Task Created Date">
                                                {val.tm_task_status === 1 ?
                                                    <FormLabel sx={{
                                                        fontSize: 13, flex: .5, textTransform: 'capitalize', cursor: 'grab',
                                                    }}>
                                                        {val.create_date}
                                                    </FormLabel> :
                                                    <FormLabel sx={{
                                                        fontSize: 13, flex: .5, textTransform: 'capitalize', cursor: 'grab',
                                                        color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'black'
                                                    }}>
                                                        {val.create_date}
                                                    </FormLabel>}
                                            </Tooltip>
                                            <Tooltip title="Task Due Date">
                                                {val.tm_task_status === 1 ?
                                                    <FormLabel sx={{
                                                        fontSize: 13, flex: .5, textTransform: 'capitalize', cursor: 'grab',
                                                    }}>
                                                        {val.tm_task_due_date}
                                                    </FormLabel> :
                                                    <FormLabel sx={{
                                                        fontSize: 13, flex: .5, textTransform: 'capitalize', cursor: 'grab',
                                                        color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'black'
                                                    }}>
                                                        {val.tm_task_due_date}
                                                    </FormLabel>}
                                            </Tooltip>
                                            <MainTaskProgress val={val} />
                                        </AccordionSummary>
                                        <SubTaskUnderTask val={val} emp_no={id} />
                                    </Accordion>
                                </Box>
                            })
                        }
                    </Box > :
                    <Box sx={{ textAlign: 'center', pt: 3, height: 500, fontWeight: 700, fontSize: 30, color: '#C7C8CB', }}>
                        No other Task assigned without Project!
                    </Box>}
            </Box>
        </Box>
    )
}

export default memo(MyProgressView)