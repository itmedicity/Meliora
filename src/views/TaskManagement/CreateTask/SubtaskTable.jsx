import { Box, CssVarsProvider, Table, } from '@mui/joy'
import { Divider, Paper } from '@mui/material'
import React, { memo, useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit'
import { axioslogin } from 'src/views/Axios/Axios';
import moment from 'moment';

const SubtaskTable = ({ tm_task_slno, selectForEditsSubTask, tableCount }) => {
    const [viewSubTask, setViewSubTask] = useState(0)
    const [subTask, setSubTask] = useState([])

    useEffect(() => {
        const getSubTask = async (tm_task_slno) => {
            const result = await axioslogin.get(`/taskManagement/subtaskviewByid/${tm_task_slno}`);
            const { success, data } = result.data;
            if (data.length !== 0) {

                if (success === 2) {

                    const subtaskData = data && data.map((val) => {
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
                            TaskStatus: val.tm_task_status === 1 ? 'Completed' : val.tm_task_status === 0 ? 'Incompleted' : 'Incompleted'
                        }
                    })
                    setSubTask(subtaskData)
                    setViewSubTask(1)

                }

                else {
                    setSubTask([])
                    setViewSubTask(0)
                }
            }
        }
        getSubTask(tm_task_slno)
    }, [tm_task_slno, tableCount])

    return (
        <Box>
            {viewSubTask === 1 ?
                <Box>
                    <Box sx={{ pt: 2 }}>
                        <Divider textAlign="left" sx={{ fontWeight: 600, mx: 2, fontSize: 18, color: '#5F093D', }}>SubTasks</Divider>
                    </Box>
                    <Paper variant="outlined" sx={{ maxWidth: '100%', overflow: 'auto', m: 1, maxHeight: 300 }}>
                        <CssVarsProvider>
                            <Table padding={"none"} stickyHeader hoverRow>
                                <thead>
                                    <tr>
                                        <th style={{ width: 60 }} >Action</th>
                                        <th style={{ width: 50 }}>SlNo</th>
                                        <th style={{ width: 250 }}>status</th>
                                        <th style={{ width: 250 }}>Subtask</th>
                                        <th style={{ width: 250 }}>Department</th>
                                        <th style={{ width: 250 }}>Location</th>
                                        <th style={{ width: 250 }}>Assignee</th>
                                        <th style={{ width: 150 }}>Due date</th>
                                        <th style={{ width: 300 }}>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {subTask?.map((val, index) => {
                                        return (
                                            <tr
                                                key={index}
                                                sx={{
                                                    '&:last-child td, &:last-child th': { border: 0 }, maxHeight: 60,
                                                    minHeight: 5
                                                }}
                                            >
                                                <td>
                                                    <EditIcon sx={{ cursor: 'pointer' }} size={6}
                                                        onClick={() => selectForEditsSubTask(val)}
                                                    />
                                                </td>
                                                <td> {index + 1}</td>
                                                <td
                                                    style={{
                                                        color: val.tm_task_status === null ? '#5F093D' : val.tm_task_status === 0 ? '#5F093D'
                                                            : val.tm_task_status === 1 ? 'green' : 'transparent', minHeight: 5
                                                    }}>{val.TaskStatus}</td>
                                                <td> {val.tm_task_name || 'not given'}</td>
                                                <td> {val.dept_name || 'not given'}</td>
                                                <td> {val.sec_name || 'not given'}</td>
                                                <td> {val.em_name || 'not given'}</td>
                                                <td> {moment(val.tm_task_due_date).format('DD-MM-YYYY') || 'not given'}</td>
                                                <td> {val.tm_task_description || 'not given'}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                        </CssVarsProvider>
                    </Paper>
                </Box>
                : null}
        </Box>
    )
}

export default memo(SubtaskTable)

