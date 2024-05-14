import React, { memo, useCallback, useState, } from 'react'
import { Box, CssVarsProvider, Table } from '@mui/joy'
import CardMasterClose from 'src/views/Components/CardMasterClose'
import Avatar from '@mui/joy/Avatar';
import { Paper, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import moment from 'moment';
import EmpStatusUpdationinDash from '../Mytask/EmpStatusUpdationinDash';
import CountDowncomponent from '../CountDown/CountDowncomponent';

const TmEmployeeTaskView = ({ tableCount, setTableCount, setflagTask, tableDataEmployee, empTaskHeading }) => {

    const [editModalOpen, setEditModalOpen] = useState(false)
    const [editModalFlag, setEditModalFlag] = useState(0)
    const [masterData, setMasterData] = useState([])

    const history = useHistory()
    const backtoDash = useCallback(() => {
        history.push('/Home/TaskManagementDashboard')
        setflagTask(0)
    }, [history, setflagTask])

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

    const { tm_task_status } = tableDataEmployee[0]

    return (
        <Box>
            <CardMasterClose
                title={'EMPLOYEE TASK'}
                close={backtoDash}>
                <Box sx={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 0,
                    border: .1, borderColor: '#D396FF',

                }} >
                    <Box sx={{ width: '99.5%', ml: .5, mt: .5, backgroundColor: '#D9E4EC' }}>
                        <Box sx={{ pb: .5, pl: 1.5, display: 'flex' }}>
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
                    <Paper variant="outlined" sx={{ maxWidth: '100%', overflow: 'auto', m: .5, maxHeight: '93%', }}>
                        {editModalFlag === 1 ?
                            <EmpStatusUpdationinDash open={editModalOpen} setEditModalOpen={setEditModalOpen} masterData={masterData}
                                setEditModalFlag={setEditModalFlag}
                                tableCount={tableCount} setTableCount={setTableCount}
                            />
                            : null}
                        <CssVarsProvider>
                            <Table padding={"none"} stickyHeader size='sm'
                                hoverRow>
                                <thead>
                                    <tr >
                                        <th style={{ width: 50 }}>#</th>
                                        <th style={{ width: 60 }} >Action</th>
                                        <th style={{ width: 100 }}>Status</th>
                                        {tm_task_status === 1 ?
                                            <th style={{ width: 200, }}>Completion Exceeded</th>
                                            :
                                            <th style={{ width: 200, }}>Count down</th>
                                        }
                                        <th style={{ width: 600 }}>Task Name</th>
                                        <th style={{ width: 500 }}>Project</th>
                                        <th style={{ width: 150 }}>Created Date</th>
                                        <th style={{ width: 150 }}> Due Date</th>
                                        <th style={{ width: 600 }}>Task Description</th>
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
                                                        sx={{
                                                            cursor: 'pointer',
                                                            '&:hover': { color: '#DBA40E' }
                                                        }} size={6} onClick={() => rowSelectModal(val)}
                                                    />
                                                </td>
                                                <td
                                                    style={{
                                                        color: val.tm_task_status === null ? '#311E26'
                                                            : val.tm_task_status === 0 ? '#311E26'
                                                                : val.tm_task_status === 1 ? '#94C973'
                                                                    : val.tm_task_status === 2 ? '#D37506'
                                                                        : val.tm_task_status === 3 ? '#67595E'
                                                                            : val.tm_task_status === 4 ? '#5885AF'
                                                                                : 'transparent', minHeight: 5,
                                                        fontWeight: 700
                                                    }}>{val.tm_task_status === 0 ? 'Incompleted' : val.tm_task_status === 1 ? 'Completed' :
                                                        val.tm_task_status === 2 ? 'On Progress' : val.tm_task_status === 3 ? 'On Hold' :
                                                            val.tm_task_status === 4 ? 'Pending' : 'not given'}</td>
                                                {val.tm_task_status !== 1 ?
                                                    <td ><Box sx={{ border: .1, borderStyle: 'dashed', borderColor: '#C3CEDA', pl: 1, py: .5, borderRadius: 20 }}>
                                                        <CountDowncomponent DueDates={val.tm_task_due_date} />
                                                    </Box></td> :
                                                    <td>
                                                        {val.datediff > 0 ?
                                                            <Box sx={{ backgroundColor: '#EECE88', borderRadius: 20, p: .5, color: '#3B0404', fontWeight: 600, mr: 1 }}>
                                                                {val.days} Days - {val.hours}h: {val.minutes}m: {val.seconds}s
                                                            </Box> :
                                                            <Box style={{ color: '#578E87', fontWeight: 600 }}> Completed On Time</Box>
                                                        }</td>}
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

export default memo(TmEmployeeTaskView)