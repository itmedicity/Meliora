import { Box, Chip, CssVarsProvider, Table, } from '@mui/joy'
import { Paper } from '@mui/material'
import React, { memo, useEffect, useMemo, } from 'react'
import EditIcon from '@mui/icons-material/Edit'
import { axioslogin } from 'src/views/Axios/Axios';
import moment from 'moment';

const SubtaskTableEmp = ({ tm_task_slno, selectForEditsSubTask, setCompleteFlag, setSubTask, subTask, tableCount, }) => {

    const searchData = useMemo(() => {
        return {
            main_task_slno: tm_task_slno
        }
    }, [tm_task_slno, tableCount])


    useEffect(() => {
        const fetchSubtasks = async () => {
            try {
                const res = await axioslogin.post("/taskManagement/subtaskUnderdepSec", searchData);
                const { success, data } = res.data;
                if (success === 2) {
                    setSubTask(data);
                    const filterData = data?.filter(val => val.tm_task_status !== 1);
                    setCompleteFlag(filterData);
                } else {
                    setSubTask([]);
                    setCompleteFlag([]);
                }
            } catch (err) {
                setSubTask([]);
                setCompleteFlag([]);
            }
        };
        fetchSubtasks();
    }, [searchData, tableCount]);



    return (
        <Box>
            {subTask.length !== 0 ?
                <Paper variant="outlined" sx={{ maxWidth: '100%', overflow: 'auto', mx: 1, my: 1 }}>
                    <CssVarsProvider>
                        <Table stickyHeader hoverRow size='sm'>
                            <thead>
                                <tr>
                                    <th style={{ width: 50, textAlign: 'center' }}>#</th>
                                    <th style={{ width: 60 }} >Action</th>
                                    <th style={{ width: 100 }}>status</th>
                                    <th style={{ width: 'auto' }}>Subtask</th>
                                    <th style={{ width: 'auto' }}>Assignee</th>
                                    <th style={{ width: 100 }}>created date</th>
                                    <th style={{ width: 100 }}>Due date</th>
                                    <th style={{ width: 'auto' }}>Description</th>
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
                                            <td style={{ textAlign: 'center' }}> {index + 1}</td>
                                            <td>
                                                <EditIcon sx={{ cursor: 'pointer' }} size={6}
                                                    onClick={() => selectForEditsSubTask(val)}
                                                />
                                            </td>
                                            <td><Chip sx={{
                                                fontSize: 12,
                                                color: val.tm_task_status === null ? 'darkred'
                                                    : val.tm_task_status === 0 ? 'darkred'
                                                        : val.tm_task_status === 1 ? '#94C973'
                                                            : val.tm_task_status === 2 ? '#EFD593'
                                                                : val.tm_task_status === 3 ? '#67595E'
                                                                    : val.tm_task_status === 4 ? '#5885AF'
                                                                        : 'transparent',
                                            }}>{val.tm_task_status === 1 ? 'Completed' :
                                                val.tm_task_status === 2 ? 'On Progress' :
                                                    val.tm_task_status === 3 ? 'On Hold' :
                                                        val.tm_task_status === 4 ? 'Pending' :
                                                            val.tm_task_status === 0 ? 'Not Started' : 'Not Started'}</Chip></td>
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

export default memo(SubtaskTableEmp)