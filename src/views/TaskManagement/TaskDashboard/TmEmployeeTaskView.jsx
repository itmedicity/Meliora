import React, { memo, useCallback, useState, } from 'react'
import { Box, CssVarsProvider, Table } from '@mui/joy'
import CardMasterClose from 'src/views/Components/CardMasterClose'
import Avatar from '@mui/joy/Avatar';
import { Paper, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import moment from 'moment';
import EmpTaskStatus from '../EmployeeTaskList/EmpTaskStatus';


const TmEmployeeTaskView = ({ tableCount, setTableCount, setemployeeTaskFlag, tableDataEmployee, empTaskHeading }) => {

    const [editModalOpen, setEditModalOpen] = useState(false)
    const [editModalFlag, setEditModalFlag] = useState(0)
    const [masterData, setMasterData] = useState([])



    const history = useHistory()
    const backtoDash = useCallback(() => {
        history.push('/Home/TaskManagementDashboard')
        setemployeeTaskFlag(0)
    }, [history, setemployeeTaskFlag])


    const rowSelectModal = useCallback((value) => {
        setEditModalFlag(1)
        setEditModalOpen(true)
        // setimageViewModalOpen(false)
        // setimage(0)
        setMasterData(value)
    }, [])


    return (
        <Box>
            <CardMasterClose
                title={'EMPLOYEE TASK'}
                close={backtoDash}>
                <Box sx={{
                    width: '100%',
                    height: '90%',
                    borderRadius: 2,
                    margin: 'auto',
                    border: .1, borderColor: '#D396FF',
                }} >
                    <Box sx={{ width: '99.5%', ml: .5, mt: .5, borderRadius: 2, backgroundColor: '#D9E4EC' }}>
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
                    <Paper variant="outlined" sx={{ maxWidth: '100%', overflow: 'auto', m: 1, maxHeight: '80%' }}>
                        {editModalFlag === 1 ?
                            // <TaskStatusModal open={editModalOpen} setEditModalOpen={setEditModalOpen} masterData={masterData}
                            //     setEditModalFlag={setEditModalFlag} tableCount={tableCount} setTableCount={setTableCount} />
                            // <ModalEditTask open={editModalOpen} masterData={masterData} setEditModalOpen={setEditModalOpen}
                            //     setEditModalFlag={setEditModalFlag}
                            //     tableCount={tableCount} setTableCount={setTableCount}
                            // />
                            <EmpTaskStatus open={editModalOpen} setEditModalOpen={setEditModalOpen} masterData={masterData}
                                setEditModalFlag={setEditModalFlag}
                                tableCount={tableCount} setTableCount={setTableCount}
                            />
                            : null}
                        <CssVarsProvider>
                            <Table padding={"none"} stickyHeader
                                hoverRow>
                                <thead>
                                    <tr >
                                        <th style={{ width: 40 }}>#</th>
                                        <th style={{ width: 50 }}>Action</th>
                                        <th style={{ width: 200 }}>Task Name</th>
                                        {/* <th style={{ width: 150 }}>Department</th>
                                        <th style={{ width: 150 }}>Section</th> */}
                                        <th style={{ width: 200 }}>Assignee</th>
                                        <th style={{ width: 100 }}>Created Date</th>
                                        <th style={{ width: 100 }}>Due date</th>
                                        <th style={{ width: 250 }}>Description</th>
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
                                                <td> {val.tm_task_name || 'not given'}</td>
                                                {/* <td> {val.dept_name || 'not given'}</td>
                                                <td> {val.sec_name || 'not given'}</td> */}
                                                <td> {val.em_name || 'not given'}</td>
                                                <td> {moment(val.create_date).format('DD-MM-YYYY') || 'not given'}</td>
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
            </CardMasterClose>
        </Box>
    )
}

export default memo(TmEmployeeTaskView)