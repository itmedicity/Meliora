import { Box, Card, FormLabel, Modal, ModalDialog, Tooltip, Typography } from '@mui/joy'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import AlignHorizontalRightRoundedIcon from '@mui/icons-material/AlignHorizontalRightRounded';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AssignmentSharpIcon from '@mui/icons-material/AssignmentSharp';
import { axioslogin } from 'src/views/Axios/Axios';
import ListSharpIcon from '@mui/icons-material/ListSharp';
import CountDowncomponent from '../CountDown/CountDowncomponent';
import EventNoteRoundedIcon from '@mui/icons-material/EventNoteRounded';
import MainTaskProgress from './MainTaskProgress';

const SubTaskUnderTaskModal = ({ SubTaskmodalOpen, setSubTaskmodalOpen, subtaskvalues, emp_no, capEmpName }) => {

    const { tm_task_slno, tm_task_name, tm_project_name, tm_project_slno } = subtaskvalues
    const [otherempTask, setOtherempTask] = useState([])
    const [empTask, setEmpTask] = useState([])
    const searchData = useMemo(() => {
        return {
            main_task_slno: tm_task_slno,
        }
    }, [tm_task_slno,])

    useEffect(() => {
        const getEmpTask = async () => {
            const result = await axioslogin.post('/TmTableView/subTaskUnderTask', searchData);
            const { success, data } = result.data;
            if (success === 2) {
                const newData = data?.filter((val) => (val.tm_assigne_emp === emp_no))
                setEmpTask(newData)
                const othertask = data?.filter((val) => (val.tm_assigne_emp !== emp_no))
                const othrData = othertask.filter((val) => {
                    return !newData.find((value) => value.tm_task_slno === val.tm_task_slno)
                })
                setOtherempTask(othrData)
            }
            else {
                setEmpTask([])
                setOtherempTask([])
            }
        }
        getEmpTask(searchData)
    }, [searchData, emp_no])

    const isPastDue = (tm_task_due_date) => {
        const today = new Date();
        const due = new Date(tm_task_due_date);
        return due < today
    }

    const handleSubtask = useCallback(() => {
        setSubTaskmodalOpen(0)
        setSubTaskmodalOpen(false)
    }, [setSubTaskmodalOpen])

    return (
        <Box>
            <Modal
                open={SubTaskmodalOpen}>
                < ModalDialog
                    sx={{
                        width: '85vw',
                        bgcolor: 'white',
                        borderRadius: 20
                    }}
                >

                    <Card sx={{ bgcolor: '#52688F' }}>
                        {tm_project_slno !== null ?
                            <Box sx={{ flex: 1 }}>
                                <Box sx={{ display: 'flex', flex: 1 }}>
                                    <Box sx={{ fontSize: 30, fontFamily: 'Georgia', pt: .5, color: 'white', pl: 1, flex: 1 }}>
                                        <AlignHorizontalRightRoundedIcon sx={{ height: 32, width: 32, color: 'white' }} />Project
                                    </Box>
                                    <Box>
                                        <HighlightOffIcon onClick={handleSubtask} sx={{
                                            cursor: 'pointer', color: 'white',
                                            '&:hover': { color: '#A0E7E5' },
                                        }} />
                                    </Box>
                                </Box>
                                <Box sx={{ flex: 1 }}>
                                    <Typography sx={{ color: 'white', fontFamily: 'Georgia', fontSize: 20, pl: 1, flex: 1 }}>{tm_project_name}</Typography>
                                </Box>
                            </Box> : null}
                        {tm_project_slno !== null ?
                            <Box sx={{ flex: 1, fontSize: 24, fontFamily: 'Georgia', color: 'white', pl: 1, }}>
                                <AssignmentSharpIcon sx={{ height: 30, width: 30, color: 'white' }} />Task
                                <Typography sx={{ color: 'white', fontFamily: 'Georgia', fontSize: 16, pl: 1, }}>{tm_task_name}</Typography>
                            </Box> :
                            <Box sx={{ display: 'flex' }}>
                                <Box sx={{ flex: 1, fontSize: 24, fontFamily: 'Georgia', color: 'white', pl: 1, }}>
                                    <AssignmentSharpIcon sx={{ height: 30, width: 30, color: 'white' }} />Task
                                    <Typography sx={{ color: 'white', fontFamily: 'Georgia', fontSize: 16, pl: 1, }}>{tm_task_name}</Typography>
                                </Box>
                                <Box>
                                    <HighlightOffIcon onClick={handleSubtask} sx={{
                                        cursor: 'pointer', color: 'white',
                                        '&:hover': { color: '#A0E7E5' },
                                    }} /></Box>
                            </Box>}
                    </Card>
                    <Box sx={{ height: '60vw', overflow: 'auto', }}>
                        <Box sx={{ mt: 1.8 }} >
                            <Box sx={{ flex: 1, display: 'flex', mb: .8 }}>
                                <Box sx={{ flex: 1, height: 30, bgcolor: '#4F687F', borderRadius: 20, pl: 1, color: 'white', pr: 1 }}>
                                    <AssignmentSharpIcon sx={{ color: 'white' }} /> Subtask assigned to {capEmpName}
                                </Box>
                                <Box sx={{ flex: 3 }}>
                                </Box>
                            </Box>
                            <Box >
                                {empTask.length !== 0 ?
                                    <Box>
                                        {empTask && empTask.map((val,) => {
                                            return <Box key={val.tm_task_slno} sx={{
                                                flex: 1,
                                                maxHeight: 100, display: 'flex', mb: .5, borderBottom: 1, borderColor: '#C3E0E5'
                                            }}                                        >
                                                <Box sx={{ px: .6, pt: .5 }}>
                                                    <ListSharpIcon fontSize='small' sx={{ color: '#435D84' }} />
                                                </Box>
                                                <Box sx={{ flex: 3, pt: 1.2 }}>
                                                    {val.tm_task_status === 1 ?
                                                        <FormLabel sx={{
                                                            fontSize: 12, textTransform: 'capitalize', cursor: 'grab',
                                                        }}>
                                                            {val.tm_task_name}
                                                        </FormLabel> :
                                                        <FormLabel sx={{
                                                            fontSize: 12, textTransform: 'capitalize', cursor: 'grab',
                                                            color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'black'
                                                        }}>
                                                            {val.tm_task_name}
                                                        </FormLabel>}

                                                </Box>
                                                <Box sx={{ flex: 1, pt: 1 }}>
                                                    <Tooltip>
                                                        {val.tm_task_status !== 1 ?
                                                            <Box sx={{ bgcolor: '#EAEAEA', borderRadius: 15, mb: .5, width: 160, pl: 1, fontSize: 12 }}>
                                                                <CountDowncomponent DueDates={val.tm_task_due_date} />
                                                            </Box> :
                                                            <Box sx={{
                                                                bgcolor: '#EAEAEA', borderRadius: 15, mb: .5, width: 160, pl: 5, color: 'darkgreen',
                                                                fontSize: 12
                                                            }}>
                                                                Completed
                                                            </Box>
                                                        }
                                                    </Tooltip>
                                                </Box>
                                                <Box sx={{ flex: 1, pt: 1 }}>
                                                    <Tooltip title="Subtask Created Date" >
                                                        {val.tm_task_status === 1 ?
                                                            <FormLabel sx={{
                                                                fontSize: 12, textTransform: 'capitalize', cursor: 'grab',
                                                            }}>
                                                                <EventNoteRoundedIcon fontSize='small' sx={{ mt: .2, mr: .2, color: '#435D84' }} />  {val.create_date}
                                                            </FormLabel> :
                                                            <FormLabel sx={{
                                                                fontSize: 12, textTransform: 'capitalize', cursor: 'grab',
                                                                color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'black'
                                                            }}>
                                                                <EventNoteRoundedIcon fontSize='small' sx={{ mt: .2, mr: .2, color: '#435D84' }} />   {val.create_date}
                                                            </FormLabel>}
                                                    </Tooltip>
                                                </Box>
                                                <Box sx={{ flex: 1, pt: 1 }}>
                                                    <Tooltip title="Subtask due Date">
                                                        {val.tm_task_status === 1 ?
                                                            <FormLabel sx={{
                                                                fontSize: 12, flex: 1, textTransform: 'capitalize', cursor: 'grab',
                                                            }}>
                                                                <EventNoteRoundedIcon fontSize='small' sx={{ mt: .2, mr: .2, color: '#435D84' }} />  {val.tm_task_due_date}
                                                            </FormLabel> :
                                                            <FormLabel sx={{
                                                                fontSize: 12, flex: 1, textTransform: 'capitalize', cursor: 'grab',
                                                                color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'black'
                                                            }}>
                                                                <EventNoteRoundedIcon fontSize='small' sx={{ mt: .2, mr: .2, color: '#435D84' }} />   {val.tm_task_due_date}
                                                            </FormLabel>}
                                                    </Tooltip>
                                                </Box>
                                                <Box sx={{ pr: .4 }}>
                                                    <MainTaskProgress val={val} />
                                                </Box>
                                            </Box>
                                        })
                                        }
                                    </Box> :
                                    <Box>
                                        <Box sx={{
                                            border: 1, borderStyle: 'dashed', borderColor: '#C7C8CB', margin: 'auto', height: 60, mt: 1,
                                            textAlign: 'center', fontWeight: 700, fontSize: 30, color: '#C7C8CB'
                                        }}> No Subtask</Box>
                                    </Box>}
                            </Box>
                        </Box>
                        <Box>
                            {otherempTask.length !== 0 ?
                                <Box sx={{ flex: 1, display: 'flex', mt: 3 }}>
                                    <Box sx={{ flex: 1, height: 30, bgcolor: '#4F687F', borderRadius: 20, pl: 3, color: 'white' }}>
                                        <AssignmentSharpIcon sx={{ color: 'white' }} /> Other Subask Under this Task
                                    </Box>
                                    <Box sx={{ flex: 3 }}>
                                    </Box>
                                </Box> : null}
                            <Box >
                                {
                                    otherempTask && otherempTask.map((val,) => {
                                        let assignedEmp_name = val.task_empname.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
                                        return <Box key={val.tm_task_slno} sx={{
                                            flex: 1, bgcolor: 'white', maxHeight: 120, display: 'flex', mb: .5, borderBottom: 1, borderColor: '#C3E0E5'
                                        }}
                                        >
                                            <Box sx={{ px: .6, pt: 1 }}>
                                                <ListSharpIcon fontSize='small' sx={{ color: '#435D84' }} />
                                            </Box>
                                            <Box sx={{ flex: 3.5, pt: 1.5 }}>
                                                {val.tm_task_status === 1 ?
                                                    <FormLabel sx={{
                                                        fontSize: 12, textTransform: 'capitalize', cursor: 'grab',
                                                    }}>
                                                        {val.tm_task_name}
                                                    </FormLabel> :
                                                    <FormLabel sx={{
                                                        fontSize: 12, textTransform: 'capitalize', cursor: 'grab',
                                                        color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'black'
                                                    }}>
                                                        {val.tm_task_name}
                                                    </FormLabel>}

                                            </Box>
                                            <Box sx={{ pt: 1.5, flex: 1, }}>
                                                <Tooltip title="Task Assigned to">
                                                    <FormLabel sx={{
                                                        fontSize: 12, flex: .8, cursor: 'grab', display: 'flex', justifyContent: 'center',
                                                        color: '#3B0404', textTransform: 'capitalize'
                                                    }}>
                                                        {assignedEmp_name}</FormLabel>
                                                </Tooltip>
                                            </Box>
                                            <Box sx={{ flex: 1.5, pt: .5, }}>
                                                <Tooltip>
                                                    {val.tm_task_status !== 1 ?
                                                        <Box sx={{ bgcolor: '#EAEAEA', borderRadius: 15, mb: .5, width: 160, pl: 1, fontSize: 12 }}>
                                                            <CountDowncomponent DueDates={val.tm_task_due_date} />
                                                        </Box> :
                                                        <Box sx={{
                                                            bgcolor: '#EAEAEA', borderRadius: 15, mb: .5, width: 160, pl: 5, color: 'darkgreen',
                                                            fontSize: 12
                                                        }}>
                                                            Completed
                                                        </Box>
                                                    }
                                                </Tooltip>
                                            </Box>
                                            <Box sx={{ flex: 1.5, pt: 1 }}>
                                                <Tooltip title="Subtask Created Date" >
                                                    {val.tm_task_status === 1 ?
                                                        <FormLabel sx={{
                                                            fontSize: 12, textTransform: 'capitalize', cursor: 'grab',
                                                        }}>
                                                            <EventNoteRoundedIcon fontSize='small' sx={{ mt: .2, mr: .2, color: '#435D84' }} />  {val.create_date}
                                                        </FormLabel> :
                                                        <FormLabel sx={{
                                                            fontSize: 12, textTransform: 'capitalize', cursor: 'grab',
                                                            color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'black'
                                                        }}>
                                                            <EventNoteRoundedIcon fontSize='small' sx={{ mt: .2, mr: .2, color: '#435D84' }} />   {val.create_date}
                                                        </FormLabel>}
                                                </Tooltip>
                                            </Box>
                                            <Box sx={{ flex: 1.5, pt: 1 }}>
                                                <Tooltip title="Subtask due Date">
                                                    {val.tm_task_status === 1 ?
                                                        <FormLabel sx={{
                                                            fontSize: 12, flex: 1, textTransform: 'capitalize', cursor: 'grab',
                                                        }}>
                                                            <EventNoteRoundedIcon fontSize='small' sx={{ mt: .2, mr: .2, color: '#435D84' }} />  {val.tm_task_due_date}
                                                        </FormLabel> :
                                                        <FormLabel sx={{
                                                            fontSize: 12, flex: 1, textTransform: 'capitalize', cursor: 'grab',
                                                            color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'black'
                                                        }}>
                                                            <EventNoteRoundedIcon fontSize='small' sx={{ mt: .2, mr: .2, color: '#435D84' }} />   {val.tm_task_due_date}
                                                        </FormLabel>}
                                                </Tooltip>
                                            </Box>
                                            <Box sx={{ pr: .4 }}>
                                                <MainTaskProgress val={val} />
                                            </Box>
                                        </Box>
                                    })
                                }
                            </Box>
                        </Box>
                        <Box sx={{ height: 20 }}>
                        </Box>
                    </Box>
                </ModalDialog>
            </Modal>
        </Box>
    )
}

export default memo(SubTaskUnderTaskModal)