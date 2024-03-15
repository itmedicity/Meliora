import React, { memo, useCallback, useState, } from 'react'
import { Box, CssVarsProvider, Table } from '@mui/joy'
import CardMasterClose from 'src/views/Components/CardMasterClose'
import Avatar from '@mui/joy/Avatar';
import { Paper, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import moment from 'moment';
import EmpStatusUpdationinDash from './EmpStatusUpdationinDash';
import CountDowncomponent from '../CountDown/CountDowncomponent';

const EmpTaskView = ({ tableCount, setTableCount, setflag, tableDataEmployee, empTaskHeading }) => {
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [editModalFlag, setEditModalFlag] = useState(0)
    const [masterData, setMasterData] = useState([])
    const history = useHistory()
    const backtoDash = useCallback(() => {
        history.push('/Home/TaskManagementEmployeeTask')
        setflag(0)
    }, [history, setflag])

    const rowSelectModal = useCallback((value) => {
        setEditModalFlag(1)
        setEditModalOpen(true)
        setMasterData(value)
    }, [])
    const isPastDue = (tm_task_due_date) => {
        const today = new Date();
        const due = new Date(tm_task_due_date);
        return due < today
    }
    return (
        <Box>
            <CardMasterClose
                title={'EMPLOYEE TASK'}
                close={backtoDash}>
                <Box sx={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 2,
                    border: .1, borderColor: '#D396FF',
                }} >
                    <Box sx={{ m: .5, backgroundColor: '#D9E4EC' }}>
                        <Box sx={{ py: .5, pl: 1.5, display: 'flex' }}>
                            <Box>
                                <CssVarsProvider>
                                    <Avatar
                                        color="neutral"
                                        size="sm"
                                        variant="outlined"
                                        sx={{ bgcolor: '#ffffff' }}
                                    >
                                        <PermContactCalendarIcon />
                                    </Avatar>
                                </CssVarsProvider>
                            </Box>
                            <Typography sx={{ fontWeight: 550, pt: .5, pl: .5 }}>{empTaskHeading}</Typography>
                        </Box>
                    </Box>
                    <Paper variant="outlined" sx={{ maxWidth: '100%', overflow: 'auto', m: .5, maxHeight: 720 }}>
                        {editModalFlag === 1 ?
                            <EmpStatusUpdationinDash open={editModalOpen} setEditModalOpen={setEditModalOpen} masterData={masterData}
                                setEditModalFlag={setEditModalFlag} tableCount={tableCount} setTableCount={setTableCount} />
                            : null}
                        <CssVarsProvider>
                            <Table padding={"none"} stickyHeader
                                hoverRow>
                                <thead>
                                    <tr >
                                        <th style={{ width: 50 }}>#</th>
                                        <th style={{ width: 60 }} >Action</th>
                                        <th style={{ width: 120 }}>Status</th>
                                        <th style={{ width: 250, }}>countDown</th>
                                        <th style={{ width: 500 }}>Task Name</th>
                                        <th style={{ width: 500 }}>Project</th>
                                        <th style={{ width: 150 }}>Created Date</th>
                                        <th style={{ width: 150 }}> Due Date</th>
                                        <th style={{ width: 500 }}>Task Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tableDataEmployee?.map((val, index) => {
                                        return (
                                            <tr
                                                key={index}
                                                style={{ height: 8, background: val.main_task_slno !== null ? '#ede7f6' : val.main_task_slno === 0 ? '#ede7f6' : 'transparent', minHeight: 5 }}>
                                                <td> {index + 1}</td>
                                                <td>
                                                    <CheckCircleOutlineIcon
                                                        sx={{ cursor: 'pointer' }} size={6} onClick={() => rowSelectModal(val)}
                                                    />
                                                </td>
                                                <td
                                                    style={{
                                                        color: val.tm_task_status === null ? '#311E26'
                                                            : val.tm_task_status === 0 ? '#311E26'
                                                                : val.tm_task_status === 1 ? '#94C973'
                                                                    : val.tm_task_status === 2 ? '#D37506'
                                                                        : val.tm_task_status === 3 ? '#747474'
                                                                            : val.tm_task_status === 4 ? '#5885AF'
                                                                                : 'transparent', minHeight: 5,
                                                        fontWeight: 600,
                                                    }}>{val.tm_task_status === 0 ? 'Incompleted' : val.tm_task_status === 1 ? 'Completed' :
                                                        val.tm_task_status === 2 ? 'On Progress' : val.tm_task_status === 3 ? 'On Hold' :
                                                            val.tm_task_status === 4 ? 'Pending' : 'not given'}</td>
                                                {val.tm_task_status !== 1 ?
                                                    <td ><Box sx={{ border: .1, borderStyle: 'dashed', borderColor: '#C3CEDA', pl: 1, py: .5 }}>
                                                        <CountDowncomponent DueDates={val.tm_task_due_date} />
                                                    </Box></td> :
                                                    <td> <Box sx={{ display: 'flex', border: .1, borderStyle: 'dashed', borderColor: '#C3CEDA', p: .5, flex: 1, }}>
                                                        <Box sx={{ flex: .5, }}></Box>
                                                        <Box sx={{ flex: 1, }}>0&nbsp;Days&nbsp;:&nbsp;00&nbsp;hh&nbsp;:&nbsp;00&nbsp;mm&nbsp;:&nbsp;00&nbsp;ss</Box>
                                                        <Box sx={{ flex: .5 }}></Box>
                                                    </Box></td>}
                                                {val.tm_task_status === 1 ?
                                                    <td style={{ textTransform: 'capitalize' }}> {val.tm_task_name || 'not given'}</td> :
                                                    <td style={{ textTransform: 'capitalize', color: isPastDue(val.tm_task_due_date) ? '#970C10' : 'black' }}> {val.tm_task_name || 'not given'}</td>}
                                                {val.tm_task_status === 1 ?
                                                    <td style={{ textTransform: 'capitalize' }}> {val.tm_project_name || 'not given'}</td> :
                                                    <td style={{ textTransform: 'capitalize', color: isPastDue(val.tm_task_due_date) ? '#970C10' : 'black' }}> {val.tm_project_name || 'not given'}</td>}
                                                {val.tm_task_status === 1 ?
                                                    <td> {moment(val.create_date).format('DD-MM-YYYY hh:mm') || 'not given'}</td> :
                                                    <td style={{ color: isPastDue(val.tm_task_due_date) ? '#970C10' : 'black' }}>{moment(val.create_date).format('DD-MM-YYYY hh:mm') || 'not given'}</td>}
                                                {val.tm_task_status === 1 ?
                                                    <td> {moment(val.tm_task_due_date).format('DD-MM-YYYY') || 'not given'}</td> :
                                                    <td style={{ color: isPastDue(val.tm_task_due_date) ? '#970C10' : 'black' }}>{moment(val.tm_task_due_date).format('DD-MM-YYYY hh:mm') || 'not given'}</td>}
                                                {val.tm_task_status === 1 ?
                                                    <td style={{ textTransform: 'capitalize' }}> {val.tm_task_description || 'not given'}</td> :
                                                    <td style={{ textTransform: 'capitalize', color: isPastDue(val.tm_task_due_date) ? '#970C10' : 'black' }}> {val.tm_task_description || 'not given'}</td>}
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                        </CssVarsProvider>
                    </Paper>
                </Box>
            </CardMasterClose>
        </Box>
    )
}

export default memo(EmpTaskView)