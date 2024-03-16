import { Accordion, AccordionGroup, AccordionSummary, Box, FormLabel, Modal, ModalDialog, Tooltip, Typography, accordionClasses } from '@mui/joy'
import React, { memo, useCallback, useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { axioslogin } from 'src/views/Axios/Axios';
import PersonIcon from '@mui/icons-material/Person';
import EmpTaskUderProject from './EmpTaskUderProject';
import SubTaskUnderTask from './SubTaskUnderTask';
import MainTaskProgress from './MainTaskProgress';
import TmProjectCircularProgress from '../DashProjectTaskList/TmProjectCircularProgress';
import AlignHorizontalRightRoundedIcon from '@mui/icons-material/AlignHorizontalRightRounded';
import EventNoteRoundedIcon from '@mui/icons-material/EventNoteRounded';
import CountDowncomponent from '../CountDown/CountDowncomponent';
const AllTaskListUnderProject = ({ open, employeeData, setModalFlag, setModalOpen, allEmpTask }) => {

    const { empname, emslno, TC, TT } = employeeData
    const employee = allEmpTask.find(emp => emp.emslno === emslno)
    const deptSec = employee ? employee.sec_name : 'null'
    let capEmpName = empname.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    let depmtSec = deptSec.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    const [empProject, setEmpProject] = useState([])
    const [taskList, setTaskList] = useState([])
    const handleClose = useCallback(() => {
        setModalFlag(0)
        setModalOpen(false)
    }, [setModalFlag, setModalOpen])

    useEffect(() => {
        const getAllProjectTask = async () => {
            const result = await axioslogin.get(`/TmTableView/EmpProjectTask/${emslno}`);
            const { success, data } = result.data;
            if (success === 2) {
                setEmpProject(data)
            }
        }
        getAllProjectTask(emslno)
    }, [emslno])

    useEffect(() => {
        const getAllEmployeeTask = async () => {
            const result = await axioslogin.get(`/TmTableView/allEmployeeTaskList/${emslno}`);
            const { success, data } = result.data;
            if (success === 2) {
                setTaskList(data)
            }
        }
        getAllEmployeeTask(emslno)
    }, [emslno])
    const isPastDue = (tm_task_due_date) => {
        const today = new Date();
        const due = new Date(tm_task_due_date);
        return due < today
    }
    return (
        <Box >
            <Modal
                open={open}
            >
                < ModalDialog
                    sx={{
                        overflow: 'auto',
                        width: '85vw',
                        height: '100vw',
                        bgcolor: 'white'
                    }}
                >
                    <Box >
                        <Box sx={{ height: 35, borderBottom: 1, borderColor: '#6AABD2', display: 'flex' }}>
                            <Box sx={{ flex: 1, fontWeight: 600, color: '#003060', }}>
                                <AssignmentIcon sx={{ color: '#004F76', }} />&nbsp;TASK LIST
                            </Box>
                            <Box>
                                <Tooltip title="Close">
                                    < CloseIcon sx={{ cursor: 'pointer', size: 'lg', width: 35, height: 25, color: '#004F76', }}
                                        onClick={handleClose}
                                    />
                                </Tooltip>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex' }}>
                            <Box sx={{
                                fontSize: 30, fontFamily: 'Georgia', pt: 1, color: '#0C2D48', flex: 4, pl: 1
                            }}>
                                <PersonIcon sx={{ height: 32, width: 32 }} />{capEmpName}
                                <Typography sx={{ color: '#0C2D48', fontFamily: 'Georgia', fontSize: 18, pl: 1 }}>{depmtSec}</Typography>
                            </Box>
                            <Box sx={{ flex: 1, fontSize: 20, display: 'flex', justifyContent: 'flex-end', pt: 5, color: '#3D2E2B', }}>
                                Completed task({TC})
                            </Box>
                            <Box sx={{ flex: .5, fontSize: 20, display: 'flex', justifyContent: 'flex-start', pl: 2, pt: 5, color: '#3D2E2B', }}>
                                Total task({TT})
                            </Box>
                        </Box>
                        <Box sx={{ mt: 3, mx: 2, fontFamily: 'Georgia', fontSize: 16, height: 30, bgcolor: '#ADC9C5', pl: 1, pt: .5, mr: 3 }}>
                            Projects
                        </Box>
                        <Box sx={{ pl: 1, mr: 3, mt: .5 }}>
                            {empProject.length !== 0 ?
                                <Box sx={{ minHeight: 50, maxHeight: 450, overflow: 'auto', }}>
                                    {
                                        empProject && empProject.map((val,) => {
                                            return <AccordionGroup key={val.tm_project_slno}
                                                sx={{
                                                    [`& .${accordionClasses.root}`]: {
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
                                                <Accordion key={val.tm_project_slno} sx={{ mx: 2 }}>
                                                    <AccordionSummary sx={{
                                                        height: 55, bgcolor: '#C3CEDA', px: 2,
                                                        borderLeft: 1,
                                                        borderTop: 1, borderTopLeftRadius: 2, borderTopRightRadius: 2,
                                                        borderColor: '#ADC9C5'
                                                    }} >
                                                        <AlignHorizontalRightRoundedIcon sx={{ width: 20, height: 20, color: '#435D84' }} />
                                                        <Tooltip title="Project" >
                                                            <Box sx={{ flex: 4.5, }}>
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
                                                            </Box>
                                                        </Tooltip>
                                                        <Tooltip>
                                                            {val.tm_project_status !== 1 ?
                                                                <Box sx={{ border: .1, borderStyle: 'dashed', borderColor: 'white', p: .5, flex: 1.2, }}>
                                                                    <CountDowncomponent DueDates={val.tm_project_duedate} />
                                                                </Box> :
                                                                <Box sx={{ display: 'flex', border: .1, borderStyle: 'dashed', borderColor: 'white', p: .5, flex: 1, }}>
                                                                    <Box sx={{ flex: .5, }}></Box>
                                                                    <Box sx={{ flex: 1, }}>0&nbsp;Days&nbsp;:00&nbsp;hh&nbsp;:00&nbsp;mm&nbsp;:00&nbsp;ss</Box>
                                                                    <Box sx={{ flex: .5 }}></Box>
                                                                </Box>
                                                            }
                                                        </Tooltip>

                                                        <Tooltip title="Project due Date" >
                                                            {val.tm_project_status === 1 ?
                                                                <FormLabel sx={{
                                                                    fontSize: 14, flex: 1, textTransform: 'capitalize', cursor: 'grab',
                                                                }}>
                                                                    <EventNoteRoundedIcon sx={{ width: 20, height: 20, mt: .2, mr: .2, color: '#435D84' }} />  {val.create_date}
                                                                </FormLabel> :
                                                                <FormLabel sx={{
                                                                    fontSize: 14, flex: 1, textTransform: 'capitalize', cursor: 'grab',
                                                                    color: isPastDue(val.tm_project_duedate) ? '#B32800' : 'black'
                                                                }}>
                                                                    <EventNoteRoundedIcon sx={{ width: 20, height: 20, mt: .2, mr: .2, color: '#435D84' }} />   {val.create_date}
                                                                </FormLabel>}
                                                        </Tooltip>

                                                        <Tooltip title="Project due Date" >
                                                            {val.tm_project_status === 1 ?
                                                                <FormLabel sx={{
                                                                    fontSize: 14, flex: 1, textTransform: 'capitalize', cursor: 'grab',
                                                                }}>
                                                                    <EventNoteRoundedIcon sx={{ width: 20, height: 20, mt: .2, mr: .2, color: '#435D84' }} />  {val.tm_project_duedate}
                                                                </FormLabel> :
                                                                <FormLabel sx={{
                                                                    fontSize: 14, flex: 1, textTransform: 'capitalize', cursor: 'grab',
                                                                    color: isPastDue(val.tm_project_duedate) ? '#B32800' : 'black'
                                                                }}>
                                                                    <EventNoteRoundedIcon sx={{ width: 20, height: 20, mt: .2, mr: .2, color: '#435D84' }} />   {val.tm_project_duedate}
                                                                </FormLabel>}
                                                        </Tooltip>
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
                        <Box sx={{ mt: 1.8, mx: 2, fontFamily: 'Georgia', fontSize: 16, height: 30, bgcolor: '#ADC9C5', borderBottom: 1, borderColor: '#ADC9C5', pl: 1, pt: .5, mr: 3 }}>
                            Other Tasks
                        </Box>
                        <Box sx={{ pl: 2, mr: 3, mt: .1 }}>
                            {taskList.length !== 0 ?
                                <Box sx={{ minHeight: 150, maxHeight: 530, overflow: 'auto', }}>
                                    {
                                        taskList && taskList.map((val, index) => {
                                            let create_empnamee = val.create_empname.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
                                            return <Box key={val.tm_task_slno} sx={{ my: .8, mx: 1, }}>
                                                <Accordion >
                                                    <AccordionSummary sx={{
                                                        height: 55, bgcolor: '#F0F2F3', px: 2,
                                                        borderRight: 1, borderLeft: 1,
                                                        borderColor: '#ADC9C5'
                                                    }}>
                                                        <Tooltip title="#" >
                                                            <Box sx={{ borderRadius: 10, width: 20, height: 20, fontSize: 11, bgcolor: '#B2C4CB', display: 'flex', pt: .2, justifyContent: 'center', fontWeight: 800 }}>
                                                                {index + 1}
                                                            </Box>
                                                        </Tooltip>
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
                                                                fontSize: 13, flex: .8, cursor: 'grab', display: 'flex', justifyContent: 'center',
                                                                color: '#3B0404', textTransform: 'capitalize'
                                                            }}>
                                                                {create_empnamee}</FormLabel>
                                                        </Tooltip>
                                                        <Tooltip>
                                                            {val.tm_task_status !== 1 ?
                                                                <Box sx={{ border: 1, borderRadius: 3, borderColor: '#C3CEDA', p: .5, flex: .9 }}>
                                                                    <CountDowncomponent DueDates={val.tm_task_due_date} />
                                                                </Box> :
                                                                <Box sx={{ display: 'flex', border: 1, borderRadius: 3, borderColor: '#C3CEDA', p: .5, flex: 1, }}>
                                                                    <Box sx={{ flex: .5, }}></Box>
                                                                    <Box sx={{ flex: 1, }}>0&nbsp;Days&nbsp;:&nbsp;00&nbsp;hh&nbsp;:&nbsp;00&nbsp;mm&nbsp;:&nbsp;00&nbsp;ss</Box>
                                                                    <Box sx={{ flex: .5 }}></Box>
                                                                </Box>
                                                            }
                                                        </Tooltip>
                                                        <Tooltip title="Task Created Date">
                                                            {val.tm_task_status === 1 ?
                                                                <FormLabel sx={{
                                                                    fontSize: 13, flex: .8, textTransform: 'capitalize', cursor: 'grab',
                                                                }}>
                                                                    <EventNoteRoundedIcon sx={{ width: 20, height: 20, mt: .2, mr: .2, color: '#435D84' }} />  {val.create_date}
                                                                </FormLabel> :
                                                                <FormLabel sx={{
                                                                    fontSize: 13, flex: .8, textTransform: 'capitalize', cursor: 'grab',
                                                                    color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'black'
                                                                }}>
                                                                    <EventNoteRoundedIcon sx={{ width: 20, height: 20, mt: .2, mr: .2, color: '#435D84' }} />   {val.create_date}
                                                                </FormLabel>}
                                                        </Tooltip>
                                                        <Tooltip title="Task Due Date">
                                                            {val.tm_task_status === 1 ?
                                                                <FormLabel sx={{
                                                                    fontSize: 13, flex: .8, textTransform: 'capitalize', cursor: 'grab',
                                                                }}>
                                                                    <EventNoteRoundedIcon sx={{ width: 20, height: 20, mt: .2, mr: .2, color: '#435D84' }} />  {val.tm_task_due_date}
                                                                </FormLabel> :
                                                                <FormLabel sx={{
                                                                    fontSize: 13, flex: .8, textTransform: 'capitalize', cursor: 'grab',
                                                                    color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'black'
                                                                }}>
                                                                    <EventNoteRoundedIcon sx={{ width: 20, height: 20, mt: .2, mr: .2, color: '#435D84' }} />   {val.tm_task_due_date}
                                                                </FormLabel>}
                                                        </Tooltip>
                                                        <MainTaskProgress val={val} />
                                                    </AccordionSummary>
                                                    <SubTaskUnderTask val={val} emp_no={emslno} />
                                                </Accordion>
                                            </Box>
                                        })
                                    }
                                </Box > :
                                <Box sx={{ textAlign: 'center', pt: 3, height: 80, fontWeight: 700, fontSize: 30, color: '#C7C8CB', }}>
                                    No other Task assigned without Project!
                                </Box>}
                        </Box>
                    </Box>

                </ModalDialog>
            </Modal>
        </Box >
    )
}

export default memo(AllTaskListUnderProject)