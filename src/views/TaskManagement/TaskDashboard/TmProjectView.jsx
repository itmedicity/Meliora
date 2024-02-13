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

const TmProjectView = ({ setprojectFlag, projectHead, ProjTable }) => {

    const [editModalOpen, setEditModalOpen] = useState(false)
    const [editModalFlag, setEditModalFlag] = useState(0)
    const [masterData, setMasterData] = useState([])

    const history = useHistory()
    const backtoDash = useCallback(() => {
        history.push('/Home/TaskManagementDashboard')
        setprojectFlag(0)
    }, [history, setprojectFlag])



    const rowSelectModal = useCallback((value) => {
        setEditModalFlag(1)
        setEditModalOpen(true)
        setMasterData(value)
    }, [])



    return (
        <Box >
            <CardMasterClose
                close={backtoDash}
                title={'PROJECT'}>
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
                                        <EjectRoundedIcon />
                                    </Avatar>
                                </CssVarsProvider>
                            </Box>
                            <Typography sx={{ fontWeight: 550, pt: .5, pl: .5 }}>{projectHead}</Typography>
                        </Box>
                    </Box>
                    <Paper variant="outlined" sx={{ maxWidth: '100%', overflow: 'auto', m: .5, maxHeight: '80%' }}>
                        {editModalFlag === 1 ?
                            <ProjectStatusModal open={editModalOpen} setEditModalOpen={setEditModalOpen} masterData={masterData}

                                setEditModalFlag={setEditModalFlag}
                            />
                            : null}
                        <CssVarsProvider>
                            <Table padding={"none"} stickyHeader
                                hoverRow>
                                <thead>
                                    <tr >

                                        <th style={{ width: 30 }}>SlNo</th>
                                        <th style={{ width: 30 }}>Action</th>
                                        <th style={{ width: 200 }}>Projects</th>
                                        {/* <th style={{ width: 150 }}>Department</th>
                                        <th style={{ width: 150 }}>Section</th> */}
                                        <th style={{ width: 100 }}>Due date</th>
                                        <th style={{ width: 250 }}>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ProjTable?.map((val, index) => {
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
                                                    <CheckCircleOutlineIcon
                                                        sx={{ cursor: 'pointer' }} size={6} onClick={() => rowSelectModal(val)}
                                                    />
                                                </td>
                                                <td> {val.tm_project_name || 'not given'}</td>
                                                {/* <td> {val.dept_name || 'not given'}</td>
                                                <td> {val.sec_name || 'not given'}</td> */}
                                                <td> {moment(val.tm_project_duedate).format('DD-MM-YYYY') || 'not given'}</td>
                                                <td> {val.tm_project_description || 'not given'}</td>
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