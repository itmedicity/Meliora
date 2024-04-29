import React, { memo, useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Box, FormLabel, Tooltip, } from '@mui/joy'
import _ from 'underscore';
import { axioslogin } from 'src/views/Axios/Axios';
import TmProjectCircularProgress from '../DashProjectTaskList/TmProjectCircularProgress';
import MainTaskProgress from '../DashEmpTaskList/MainTaskProgress';
import CountDowncomponent from '../CountDown/CountDowncomponent';
import EventNoteRoundedIcon from '@mui/icons-material/EventNoteRounded';
import AccountTreeSharpIcon from '@mui/icons-material/AccountTreeSharp';
import TaskViewsUnderPorject from '../DashEmpTaskList/TaskViewsUnderPorject';
import AlignHorizontalRightRoundedIcon from '@mui/icons-material/AlignHorizontalRightRounded';
import ListSharpIcon from '@mui/icons-material/ListSharp';
import AssignmentSharpIcon from '@mui/icons-material/AssignmentSharp';
import SubTaskUnderTaskModal from '../DashEmpTaskList/SubTaskUnderTaskModal';

const MyProgressView = () => {

    const id = useSelector((state) => state.LoginUserData.empid, _.isEqual)
    const empName = useSelector((state) => state.LoginUserData.empname, _.isEqual)
    let capEmpName = empName.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    const [empProject, setEmpProject] = useState([])
    const [taskList, setTaskList] = useState([])
    const [taskUnderPjt, setTaskUnderPjt] = useState([])
    const [prjmodalFlag, setprjModalFlag] = useState(0)
    const [prjmodalOpen, setprjModalOpen] = useState(false)
    const [SubTaskmodalFlag, setSubTaskmodalFlag] = useState(0)
    const [SubTaskmodalOpen, setSubTaskmodalOpen] = useState(false)
    const [subtaskvalues, setsubtaskvalues] = useState([])

    useEffect(() => {
        const getAllProjectTask = async () => {
            const result = await axioslogin.get(`/TmTableView/EmpProjectTask/${id}`);
            const { success, data } = result.data;
            if (success === 2) {
                setEmpProject(data)
            }
            else {
                setEmpProject([])
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
            else {
                setTaskList([])
            }
        }
        getAllEmployeeTask(id)
    }, [id])

    const isPastDue = (tm_task_due_date) => {
        const today = new Date();
        const due = new Date(tm_task_due_date);
        return due < today
    }

    const openProjectModal = useCallback((value) => {
        setTaskUnderPjt(value)
        setprjModalFlag(1)
        setprjModalOpen(true)
    }, [])

    const openSubtaskModal = useCallback((value) => {
        setsubtaskvalues(value)
        setSubTaskmodalFlag(1)
        setSubTaskmodalOpen(true)
    }, [])

    return (
        <Box sx={{ maxHeight: 700, overflow: 'auto' }}>
            {prjmodalFlag === 1 ?
                <TaskViewsUnderPorject
                    prjmodalOpen={prjmodalOpen} setprjModalOpen={setprjModalOpen}
                    setprjModalFlag={setprjModalFlag} taskUnderPjt={taskUnderPjt} capEmpName={capEmpName} /> : null}
            {SubTaskmodalFlag === 1 ?
                <SubTaskUnderTaskModal
                    SubTaskmodalOpen={SubTaskmodalOpen} setSubTaskmodalOpen={setSubTaskmodalOpen} capEmpName={capEmpName}
                    setSubTaskmodalFlag={setSubTaskmodalFlag} subtaskvalues={subtaskvalues} emp_no={id} /> : null}
            <Box sx={{ height: 30, fontSize: 18, fontWeight: 500, mt: 1, bgcolor: '#78909c', pl: 1, color: 'white', mx: 1 }}>
                <AccountTreeSharpIcon sx={{ color: 'white' }} />  Projects</Box>
            <Box>
                <Box sx={{ mt: .5 }}>
                    {
                        empProject && empProject.map((val,) => {
                            return <Box key={val.tm_project_slno} sx={{
                                flex: 1, mx: 1, bgcolor: 'white', minHeight: 20, maxHeight: 90, display: 'flex',
                                mb: .5, borderBottom: 1, borderColor: '#BDC6D9',
                                '&:hover': {
                                    boxShadow: '1px 1px 3px',
                                    bgcolor: '#E9EAEC'
                                },
                            }}
                                onClick={() => openProjectModal(val)}>

                                <Box sx={{ px: .6, pt: 1.2 }}>
                                    <AlignHorizontalRightRoundedIcon sx={{ width: 20, height: 20, color: '#435D84' }} />
                                </Box>
                                <Box sx={{ flex: 2, pt: 1.5 }}>

                                    {val.tm_project_status === 1 ?
                                        <FormLabel sx={{
                                            fontSize: 14, textTransform: 'capitalize', cursor: 'grab',
                                        }}>
                                            {val.tm_project_name}
                                        </FormLabel> :
                                        <FormLabel sx={{
                                            fontSize: 14, textTransform: 'capitalize', cursor: 'grab',
                                            color: isPastDue(val.tm_project_duedate) ? '#B32800' : 'black'
                                        }}>
                                            {val.tm_project_name}
                                        </FormLabel>}

                                </Box>
                                <Box sx={{ flex: 1, pt: 1.2, px: .5 }}>
                                    <Tooltip>
                                        {val.tm_project_status !== 1 ?
                                            <Box sx={{ border: .1, borderColor: '#78909c', borderStyle: 'dashed', width: 170, pl: .5, borderRadius: 20, }}>
                                                <CountDowncomponent DueDates={val.tm_project_duedate} />
                                            </Box> :
                                            <Box sx={{
                                                display: 'flex', border: 1, borderColor: '#C3CEDA', width: 170, flex: 1, borderRadius: 20, mt: .5,
                                                borderStyle: 'dashed', justifyContent: 'center'
                                            }}>
                                                completed
                                            </Box>
                                        }
                                    </Tooltip>
                                </Box>
                                <Box sx={{ flex: 1, pt: 1.5 }}>
                                    <Tooltip title="Project Created Date" >
                                        {val.tm_project_status === 1 ?
                                            <FormLabel sx={{
                                                fontSize: 14, textTransform: 'capitalize', cursor: 'grab',
                                            }}>
                                                <EventNoteRoundedIcon sx={{ width: 20, height: 20, mt: .2, mr: .2, color: '#435D84' }} />  {val.create_date}
                                            </FormLabel> :
                                            <FormLabel sx={{
                                                fontSize: 14, textTransform: 'capitalize', cursor: 'grab',
                                                color: isPastDue(val.tm_project_duedate) ? '#B32800' : 'black'
                                            }}>
                                                <EventNoteRoundedIcon sx={{ width: 20, height: 20, mt: .2, mr: .2, color: '#435D84' }} />   {val.create_date}
                                            </FormLabel>}
                                    </Tooltip>
                                </Box>
                                <Box sx={{ flex: 1, pt: 1.5 }}>
                                    <Tooltip title="Project due Date">
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
                                </Box>
                                <Box sx={{ pt: .7, pr: .4 }}>
                                    <TmProjectCircularProgress val={val} />
                                </Box>
                            </Box>
                        })
                    }
                </Box>
            </Box>
            <Box sx={{ height: 30, fontSize: 18, fontWeight: 500, mt: 1, mx: .5, bgcolor: '#78909c', pl: 1, color: 'white' }}>
                <AssignmentSharpIcon sx={{ color: 'white' }} /> Task without projects</Box>
            <Box sx={{ mt: .1, flex: 1, }}>
                {taskList.length !== 0 ?
                    <Box sx={{ minHeight: 150, maxHeight: 530, overflow: 'auto', }}>
                        {
                            taskList && taskList.map((val, index) => {
                                // let create_empnamee = val.create_empname.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
                                return <Box key={val.tm_task_slno} sx={{
                                    flex: 1, mx: 1, bgcolor: 'white', maxHeight: 90, display: 'flex', mb: .3,
                                    borderBottom: 1, borderColor: '#BDC6D9',
                                    '&:hover': {
                                        boxShadow: '1px 0px 5px',
                                        bgcolor: '#E9EAEC',
                                        mb: .3
                                    },
                                }}
                                    onClick={() => openSubtaskModal(val)}
                                >
                                    <Box sx={{ px: .6, pt: 1.2 }}>
                                        <ListSharpIcon sx={{ width: 20, height: 20, color: '#435D84' }} />
                                    </Box>
                                    <Box sx={{ flex: 2, pt: 1.5 }}>
                                        {val.tm_task_status === 1 ?
                                            <FormLabel sx={{
                                                fontSize: 13, flex: 3, textTransform: 'capitalize',
                                            }}>
                                                {val.tm_task_name}
                                            </FormLabel> :
                                            <FormLabel sx={{
                                                fontSize: 13, flex: 3, textTransform: 'capitalize',
                                                color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'black'
                                            }}>
                                                {val.tm_task_name}
                                            </FormLabel>}
                                    </Box>
                                    <Box sx={{ flex: 1, pt: 1.5, px: .5 }}>
                                        <Tooltip>
                                            {val.tm_task_status !== 1 ?
                                                <Box sx={{ border: .1, borderColor: '#78909c', borderStyle: 'dashed', width: 170, pl: .5, borderRadius: 20, }}>
                                                    <CountDowncomponent DueDates={val.tm_task_due_date} />
                                                </Box> :
                                                <Box sx={{
                                                    display: 'flex', border: 1, borderColor: '#C3CEDA', width: 170, flex: 1, borderRadius: 20, mt: .5,
                                                    borderStyle: 'dashed', justifyContent: 'center'
                                                }}>
                                                    completed
                                                </Box>
                                            }
                                        </Tooltip>
                                    </Box>
                                    <Box sx={{ flex: 1, pt: 1.5 }}>
                                        <Tooltip title="Task Created Date">
                                            {val.tm_task_status === 1 ?
                                                <FormLabel sx={{
                                                    fontSize: 13, flex: .8, textTransform: 'capitalize',
                                                }}>
                                                    <EventNoteRoundedIcon sx={{ width: 20, height: 20, mt: .2, mr: .2, color: '#435D84' }} />  {val.create_date}
                                                </FormLabel> :
                                                <FormLabel sx={{
                                                    fontSize: 13, flex: .8, textTransform: 'capitalize',
                                                    color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'black'
                                                }}>
                                                    <EventNoteRoundedIcon sx={{ width: 20, height: 20, mt: .2, mr: .2, color: '#435D84' }} />   {val.create_date}
                                                </FormLabel>}
                                        </Tooltip>
                                    </Box>
                                    <Box sx={{ flex: 1, pt: 1.5 }}>
                                        <Tooltip title="Task Due Date">
                                            {val.tm_task_status === 1 ?
                                                <FormLabel sx={{
                                                    fontSize: 13, flex: .8, textTransform: 'capitalize',
                                                }}>
                                                    <EventNoteRoundedIcon sx={{ width: 20, height: 20, mt: .2, mr: .2, color: '#435D84' }} />  {val.tm_task_due_date}
                                                </FormLabel> :
                                                <FormLabel sx={{
                                                    fontSize: 13, flex: .8, textTransform: 'capitalize',
                                                    color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'black'
                                                }}>
                                                    <EventNoteRoundedIcon sx={{ width: 20, height: 20, mt: .2, mr: .2, color: '#435D84' }} />   {val.tm_task_due_date}
                                                </FormLabel>}
                                        </Tooltip>
                                    </Box>
                                    <Box sx={{ pr: .4 }}>
                                        <MainTaskProgress val={val} />
                                    </Box>
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