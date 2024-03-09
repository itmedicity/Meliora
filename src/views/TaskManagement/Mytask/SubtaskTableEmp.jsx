import { Box, CssVarsProvider, Table, } from '@mui/joy'
import { Paper } from '@mui/material'
import React, { useEffect, } from 'react'
import EditIcon from '@mui/icons-material/Edit'
import { axioslogin } from 'src/views/Axios/Axios';
import moment from 'moment';

const SubtaskTableEmp = ({ tm_task_slno, selectForEditsSubTask, setCompleteFlag, tableRendering, setSubTask, subTask, setViewSubTask }) => {

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
                            tm_pending_remark: val.tm_pending_remark,
                            tm_onhold_remarks: val.tm_onhold_remarks,
                            tm_project_slno: val.tm_project_slno,
                            tm_completed_remarks: val.tm_completed_remarks,
                            create_date: val.create_date,
                            main_task_slno: val.main_task_slno,
                            TaskStatus: val.tm_task_status === 1 ? 'Completed' :
                                val.tm_task_status === 2 ? 'On Progress' :
                                    val.tm_task_status === 3 ? 'On Hold' :
                                        val.tm_task_status === 4 ? 'Pending' :
                                            val.tm_task_status === 0 ? 'Incompleted' : 'Incompleted',
                        }
                    })
                    setSubTask(subtaskData)
                    setViewSubTask(1)
                    const filterData = data && data.filter((val) => val.tm_task_status !== 1)
                    setCompleteFlag(filterData);
                }
            }
            else {
                setCompleteFlag([])
                setSubTask([])
            }
        }
        getSubTask(tm_task_slno)
    }, [tm_task_slno, tableRendering, setSubTask, setCompleteFlag, setViewSubTask])

    return (
        <Box>
            {subTask.length !== 0 ?
                <Paper variant="outlined" sx={{ maxWidth: '100%', overflow: 'auto', mx: 1, maxHeight: 400, my: 1 }}>
                    <CssVarsProvider>
                        <Table stickyHeader hoverRow>
                            <thead>
                                <tr>
                                    <th style={{ width: 50 }}>#</th>
                                    <th style={{ width: 60 }} >Action</th>
                                    <th style={{ width: 100 }}>status</th>
                                    <th style={{ width: 150 }}>Subtask</th>
                                    <th style={{ width: 150 }}>Assignee</th>
                                    <th style={{ width: 100 }}>created date</th>
                                    <th style={{ width: 100 }}>Due date</th>
                                    <th style={{ width: 330 }}>Description</th>
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
                                            <td> {index + 1}</td>
                                            <td>
                                                <EditIcon sx={{ cursor: 'pointer' }} size={6}
                                                    onClick={() => selectForEditsSubTask(val)}
                                                />
                                            </td>
                                            <td
                                                style={{
                                                    color: val.tm_task_status === null ? '#311E26'
                                                        : val.tm_task_status === 0 ? '#311E26'
                                                            : val.tm_task_status === 1 ? '#94C973'
                                                                : val.tm_task_status === 2 ? '#EFD593'
                                                                    : val.tm_task_status === 3 ? '#A49393'
                                                                        : val.tm_task_status === 4 ? '#5885AF'
                                                                            : 'transparent', minHeight: 5,
                                                    fontWeight: 600,
                                                }}>{val.TaskStatus}</td>
                                            <td style={{ textTransform: 'capitalize' }}> {val.tm_task_name || 'not given'}</td>
                                            <td style={{ textTransform: 'capitalize' }}> {val.em_name || 'not given'}</td>
                                            <td> {moment(val.create_date).format('DD-MM-YYYY hh:mm') || 'not given'}</td>
                                            <td > {moment(val.tm_task_due_date).format('DD-MM-YYYY hh:mm') || 'not given'}</td>
                                            <td style={{ textTransform: 'capitalize' }}> {val.tm_task_description || 'not given'}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </CssVarsProvider>
                </Paper> :
                <Box></Box>}
        </Box>
    )
}

export default SubtaskTableEmp