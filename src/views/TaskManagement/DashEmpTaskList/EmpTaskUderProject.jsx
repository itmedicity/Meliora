import { Accordion, AccordionDetails, AccordionSummary, Box, Tooltip, } from '@mui/joy'
import React, { memo, useEffect, useMemo, useState } from 'react'
import FormLabel from '@mui/joy/FormLabel';
import { axioslogin } from 'src/views/Axios/Axios';
import MainTaskProgress from './MainTaskProgress';
import SubTaskUnderTask from './SubTaskUnderTask';
import TaskCountWithoutThisEmp from './TaskCountWithoutThisEmp';
import EventNoteRoundedIcon from '@mui/icons-material/EventNoteRounded';
import CountDowncomponent from '../CountDown/CountDowncomponent';
const EmpTaskUderProject = ({ val }) => {

    const { tm_project_slno, tm_assigne_emp } = val
    const [allTaskUnderProject, setAllTaskUnderProject] = useState([])
    const [otherempTask, setOtherempTask] = useState([])
    const searchData = useMemo(() => {
        return {
            tm_project_slno: tm_project_slno,
        }
    }, [tm_project_slno])

    useEffect(() => {
        const getEmpTask = async () => {
            const result = await axioslogin.post('/TmTableView/allTaskUnderProject', searchData);
            const { success, data } = result.data;
            if (success === 2) {
                const newData = data?.filter((val) => (val.tm_assigne_emp === tm_assigne_emp))
                setAllTaskUnderProject(newData)
                const othertask = data?.filter((val) => (val.tm_assigne_emp !== tm_assigne_emp))
                const otherTaskks = othertask.filter((val) => {
                    return !newData.find((value) => value.tm_task_slno === val.tm_task_slno)
                })
                setOtherempTask(otherTaskks)
            }
        }
        getEmpTask(searchData)
    }, [searchData, tm_assigne_emp])
    const isPastDue = (tm_task_due_date) => {
        const today = new Date();
        const due = new Date(tm_task_due_date);
        return due < today
    }

    return (
        <Box sx={{ maxHeight: 400, overflow: 'auto', mt: .5 }} >
            {
                allTaskUnderProject && allTaskUnderProject.map((val, index) => {
                    let create_empnamee = val.create_empname.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
                    return <AccordionDetails key={val.tm_task_slno} sx={{ width: '100%', margin: '-8px' }}>
                        <Accordion key={val.tm_task_slno} >
                            <AccordionSummary sx={{
                                height: 48, bgcolor: '#F0F2F3', pt: .5,
                                borderTop: 1, borderRight: 1, borderLeft: 1, borderTopRightRadius: 2, borderTopLeftRadius: 2,
                                borderColor: '#ADC9C5'
                            }}>
                                <Box sx={{ borderRadius: 10, width: 20, height: 20, fontSize: 10, bgcolor: '#B2C4CB', display: 'flex', justifyContent: 'center', pt: .3, fontWeight: 800 }}>
                                    {index + 1}
                                </Box>
                                <Tooltip title="Task ">
                                    {val.tm_task_status === 1 ?
                                        <FormLabel sx={{
                                            fontSize: 13, flex: 4, textTransform: 'capitalize', cursor: 'grab',
                                        }}>
                                            {val.tm_task_name}
                                        </FormLabel> :
                                        <FormLabel sx={{
                                            fontSize: 13, flex: 4, textTransform: 'capitalize', cursor: 'grab',
                                            color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'black'
                                        }}>
                                            {val.tm_task_name}
                                        </FormLabel>}
                                </Tooltip>
                                <Tooltip title="Task Created by">
                                    <FormLabel sx={{
                                        fontSize: 13, flex: .8, cursor: 'grab', display: 'flex', justifyContent: 'center',
                                        color: '#3B0404', textTransform: 'capitalize'
                                    }}>
                                        {create_empnamee}</FormLabel>
                                </Tooltip>
                                <Tooltip>
                                    {val.tm_task_status !== 1 ?
                                        <Box sx={{ border: .1, borderStyle: 'dashed', borderColor: '#C3CEDA', p: .5, flex: 1 }}>
                                            <CountDowncomponent DueDates={val.tm_task_due_date} />
                                        </Box> :
                                        <Box sx={{ display: 'flex', border: .1, borderStyle: 'dashed', borderColor: '#C3CEDA', p: .5, flex: 1, justifyContent: 'center' }}>
                                            completed
                                        </Box>
                                    }
                                </Tooltip>
                                <Tooltip title="Task Created Date">
                                    {val.tm_task_status === 1 ?
                                        <FormLabel sx={{
                                            fontSize: 13, flex: 1, textTransform: 'capitalize', cursor: 'grab',
                                        }}>
                                            <EventNoteRoundedIcon sx={{ width: 20, height: 20, mt: .2, mr: .2, color: '#435D84' }} />  {val.create_date}
                                        </FormLabel> :
                                        <FormLabel sx={{
                                            fontSize: 13, flex: 1, textTransform: 'capitalize', cursor: 'grab',
                                            color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'black', display: 'flex'
                                        }}>
                                            <EventNoteRoundedIcon sx={{ width: 20, height: 20, mt: .2, mr: .2, color: '#435D84' }} />   {val.create_date}
                                        </FormLabel>}
                                </Tooltip>
                                <Tooltip title="Task Due Date" >
                                    {val.tm_task_status === 1 ?
                                        <FormLabel sx={{
                                            fontSize: 13, flex: 1, textTransform: 'capitalize', cursor: 'grab',
                                        }}>
                                            <EventNoteRoundedIcon sx={{ width: 20, height: 20, mt: .2, mr: .2, color: '#435D84' }} /> {val.tm_task_due_date}
                                        </FormLabel> :
                                        <FormLabel sx={{
                                            fontSize: 13, flex: 1, textTransform: 'capitalize', cursor: 'grab',
                                            color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'black'
                                        }}>
                                            <EventNoteRoundedIcon sx={{ width: 20, height: 20, mt: .2, mr: .2, color: '#435D84' }} />  {val.tm_task_due_date}
                                        </FormLabel>}
                                </Tooltip>
                                <MainTaskProgress val={val} />
                            </AccordionSummary>
                            <SubTaskUnderTask val={val} emp_no={tm_assigne_emp} />
                        </Accordion>
                    </AccordionDetails>
                })
            }
            <AccordionDetails sx={{ width: '100%', }}>
                <TaskCountWithoutThisEmp otherempTask={otherempTask} />
            </AccordionDetails>
        </Box >
    )
}

export default memo(EmpTaskUderProject)