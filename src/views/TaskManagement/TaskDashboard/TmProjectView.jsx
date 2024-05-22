import React, { memo, useCallback, useState } from 'react'
import { Box, CssVarsProvider, Table } from '@mui/joy'
import CardMasterClose from 'src/views/Components/CardMasterClose'
import Avatar from '@mui/joy/Avatar';
import { Paper, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import EjectRoundedIcon from '@mui/icons-material/EjectRounded';
import moment from 'moment';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ProjectStatusModal from './ProjectStatusModal';
import CountDowncomponent from '../CountDown/CountDowncomponent';

const TmProjectView = ({ setprjFlag, projectHead, ProjTable, tableCount, setTableCount }) => {

    const [editModalOpen, setEditModalOpen] = useState(false)
    const [editModalFlag, setEditModalFlag] = useState(0)
    const [masterData, setMasterData] = useState([])
    const history = useHistory()

    const backtoDash = useCallback(() => {
        history.push('/Home/TaskManagementDashboard')
        setprjFlag(0)
    }, [history, setprjFlag])

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
        <Box >
            <CardMasterClose
                close={backtoDash}
                title={'PROJECT'}>
                <Box sx={{
                    width: '100%',
                    height: '100%',
                    border: .1, borderColor: '#D396FF',
                }} >
                    <Box sx={{ width: '99.5%', ml: .5, mt: .5, backgroundColor: '#D9E4EC' }}>
                        <Box sx={{ py: .5, pl: 1.5, display: 'flex' }}>
                            <Box>
                                <CssVarsProvider>
                                    <Avatar
                                        color="neutral"
                                        size="sm"
                                        variant="outlined"
                                        sx={{ bgcolor: '#ffffff' }}
                                    >
                                        <EjectRoundedIcon />
                                    </Avatar>
                                </CssVarsProvider>
                            </Box>
                            <Typography sx={{ fontWeight: 550, pt: .5, pl: .5 }}>{projectHead}</Typography>
                        </Box>
                    </Box>
                    <Paper variant="outlined" sx={{ maxWidth: '100%', overflow: 'auto', m: .5, maxHeight: '93%' }}>
                        {editModalFlag === 1 ?
                            <ProjectStatusModal
                                open={editModalOpen} setEditModalOpen={setEditModalOpen} masterData={masterData}
                                setEditModalFlag={setEditModalFlag} tableCount={tableCount} setTableCount={setTableCount}
                            />
                            : null}
                        <CssVarsProvider>
                            <Table padding={"none"} stickyHeader hoverRow size='sm'>
                                <thead>
                                    <tr>
                                        <th style={{ width: 30 }}>SlNo</th>
                                        <th style={{ width: 50 }}>Action</th>
                                        <th style={{ width: 80 }}>Status</th>
                                        <th style={{ width: 120 }}>CountDown</th>
                                        <th style={{ width: 300 }}>Projects</th>
                                        <th style={{ width: 100 }}>Due date</th>
                                        <th style={{ width: 200 }}>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ProjTable?.map((val, index) => {
                                        return (
                                            <tr key={index}
                                                sx={{
                                                    '&:last-child td, &:last-child th': { border: 0 }, maxHeight: 60,
                                                    minHeight: 5
                                                }}
                                            >
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
                                                        color: val.tm_project_status === 0 ? '#311E26'
                                                            : val.tm_project_status === 1 ? '#94C973'
                                                                : 'transparent', minHeight: 5,
                                                        fontWeight: 700
                                                    }}>{val.tm_project_status === 0 ? 'Incompleted' : val.tm_project_status === 1 ? 'Completed' : 'not given'}</td>
                                                <td>
                                                    {val.tm_project_status !== 1 ?
                                                        <Box sx={{ border: .1, borderStyle: 'dashed', borderColor: '#C3CEDA', p: .5, flex: .9, borderRadius: 20 }}>
                                                            <CountDowncomponent DueDates={val.tm_project_duedate} />
                                                        </Box> :
                                                        <Box sx={{ display: 'flex', border: .1, borderStyle: 'dashed', borderColor: '#C3CEDA', p: .5, flex: 1, borderRadius: 20 }}>
                                                            <Box sx={{ flex: .5, }}></Box>
                                                            <Box sx={{ flex: 1, }}>completed</Box>
                                                            <Box sx={{ flex: .5 }}></Box>
                                                        </Box>
                                                    }
                                                </td>
                                                {val.tm_project_status === 1 ?
                                                    <td style={{ textTransform: 'capitalize' }}> {val.tm_project_name || 'not given'}</td> :
                                                    <td style={{ color: isPastDue(val.tm_project_duedate) ? '#970C10' : 'black' }}>
                                                        {(val.tm_project_name) || 'not given'}</td>}
                                                {val.tm_project_status === 1 ?
                                                    <td> {moment(val.tm_project_duedate).format('DD-MM-YYYY') || 'not given'}</td> :
                                                    <td style={{ color: isPastDue(val.tm_project_duedate) ? '#970C10' : 'black' }}>
                                                        {moment(val.tm_project_duedate).format('DD-MM-YYYY hh:mm') || 'not given'}</td>}
                                                {val.tm_project_status === 1 ?
                                                    <td style={{ textTransform: 'capitalize' }}> {val.tm_project_description || 'not given'}</td> :
                                                    <td style={{ color: isPastDue(val.tm_project_duedate) ? '#970C10' : 'black' }}>
                                                        {(val.tm_project_description) || 'not given'}</td>}
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

export default memo(TmProjectView)