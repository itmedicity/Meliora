import React, { memo, useEffect, useCallback, useState } from 'react'
import { Box, CssVarsProvider, Table } from '@mui/joy'
import CardMasterClose from 'src/views/Components/CardMasterClose'
import Avatar from '@mui/joy/Avatar';
import { Paper, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import { useDispatch, useSelector } from 'react-redux';
import { getReqRegistListByDept } from 'src/redux/actions/ReqRegisterListByDept.action';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import moment from 'moment';
import EmpTaskStatus from '../EmployeeTaskList/EmpTaskStatus';
const TmDepartmentTaskView = ({ tableCount, setTableCount, setdepartmentTaskFlag, deptTableData, deptTaskHeading }) => {


    const [editModalOpen, setEditModalOpen] = useState(false)
    const [editModalFlag, setEditModalFlag] = useState(0)
    const [masterData, setMasterData] = useState([])


    const history = useHistory()
    const dispatch = useDispatch();
    //redux for geting login emp secid
    const empsecid = useSelector((state) => {
        return state.LoginUserData.empsecid
    })


    const rowSelectModal = useCallback((value) => {
        setEditModalFlag(1)
        setEditModalOpen(true)
        // setimageViewModalOpen(false)
        // setimage(0)
        setMasterData(value)
    }, [])

    useEffect(() => {
        dispatch(getReqRegistListByDept(empsecid))
    }, [dispatch, empsecid,])
    const backtoDash = useCallback(() => {
        history.push('/Home/TaskManagementDashboard')
        setdepartmentTaskFlag(0)
    }, [history, setdepartmentTaskFlag])
    return (
        <Box>
            <CardMasterClose
                close={backtoDash}
                title={'DEPARTMENT TASK'}>
                <Box sx={{
                    width: '100%',
                    height: '90%',
                    borderRadius: 2,
                    margin: 'auto',
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
                                        <DeviceHubIcon />
                                    </Avatar>
                                </CssVarsProvider>
                            </Box>
                            <Typography sx={{ fontWeight: 550, pt: .5, pl: .5 }}>{deptTaskHeading}</Typography>
                        </Box>
                    </Box>
                    <Paper variant="outlined" sx={{ maxWidth: '100%', overflow: 'auto', m: .5, maxHeight: '80%' }}>
                        {editModalFlag === 1 ?
                            <EmpTaskStatus open={editModalOpen} setEditModalOpen={setEditModalOpen} masterData={masterData}
                                setEditModalFlag={setEditModalFlag}
                                tableCount={tableCount} setTableCount={setTableCount}
                            />
                            : null}
                        <CssVarsProvider>
                            <Table padding={"none"} stickyHeader>
                                <thead>
                                    <tr >
                                        <th style={{ width: 60 }}>#</th>
                                        <th style={{ width: 80 }}>Action</th>
                                        <th style={{ width: 250 }}>Task name</th>
                                        <th style={{ width: 100 }}>Assignee</th>
                                        <th style={{ width: 100 }}>Created Date</th>
                                        <th style={{ width: 100 }}>Due date</th>
                                        <th style={{ width: 250 }}>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {deptTableData?.map((val, index) => {
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
                                                <td style={{ textTransform: 'capitalize' }}> {val.tm_task_name || 'not given'}</td>
                                                <td style={{ textTransform: 'capitalize' }}> {val.em_name || 'not given'}</td>
                                                <td style={{ textTransform: 'capitalize' }}> {moment(val.create_date).format('DD-MM-YYYY') || 'not given'}</td>
                                                <td style={{ textTransform: 'capitalize' }}> {moment(val.tm_task_due_date).format('DD-MM-YYYY') || 'not given'}</td>
                                                <td style={{ textTransform: 'capitalize' }}> {val.tm_task_description || 'not given'}</td>
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

export default memo(TmDepartmentTaskView)