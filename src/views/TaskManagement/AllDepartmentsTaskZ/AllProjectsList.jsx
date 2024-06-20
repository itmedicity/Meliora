import { Box, Chip } from '@mui/joy'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import EditIcon from '@mui/icons-material/Edit'
import CountDowncomponent from '../CountDown/CountDowncomponent'
import ProjectCreation from '../ModalComponent/ProjectCreation'
import EditProject from '../ModalComponent/EditProject'
import { Virtuoso } from 'react-virtuoso'

const AllProjectsList = ({ setTableCount, tableCount }) => {

    const [Projectz, setProjectz] = useState([])
    const [addProjectFlag, setAddProjectFlag] = useState(0)
    const [addProjectModalOpen, setaddProjectlModalOpen] = useState(false)
    const [projectData, setProjectData] = useState([])
    const [editProjectFlag, setEditProjectFlag] = useState(0)
    const [editProjectModalOpen, setEditProjectModalOpen] = useState(false)

    useEffect(() => {
        const getAllProjects = async () => {
            const result = await axioslogin.get('/taskManagement/viewProject');
            const { success, data } = result.data;
            if (data.length !== 0) {
                if (success === 2) {
                    setProjectz(data)
                } else {
                    setProjectz([])
                }
            }
        }
        getAllProjects()
    }, [tableCount])

    const CreateProject = useCallback(() => {
        setAddProjectFlag(1)
        setaddProjectlModalOpen(true)
    }, [])

    const isPastDue = (tm_Project_duedate) => {
        const today = new Date();
        const due = new Date(tm_Project_duedate);
        return due < today
    }

    const rowSelect = useCallback((val) => {
        setProjectData(val)
        setEditProjectFlag(1)
        setEditProjectModalOpen(true)
    }, [])

    return (
        <Box>
            {addProjectFlag === 1 ? <ProjectCreation open={addProjectModalOpen} setTableCount={setTableCount} tableCount={tableCount}
                setAddProjectFlag={setAddProjectFlag} setaddProjectlModalOpen={setaddProjectlModalOpen}
            /> : null}
            {editProjectFlag === 1 ? <EditProject open={editProjectModalOpen} setTableCount={setTableCount} tableCount={tableCount}
                setEditProjectFlag={setEditProjectFlag} setEditProjectModalOpen={setEditProjectModalOpen} projectData={projectData}
                setProjectData={setProjectData}
            /> : null}
            <Box sx={{ flex: 1, ml: 1, my: 1 }}>
                <Chip sx={{ px: 1, ml: 1, cursor: 'pointer', border: 1, borderColor: '#4B7BF5', '&:hover': { bgcolor: '#4B7BF5' } }}
                    onClick={CreateProject} > + Create new Project</Chip>
            </Box>
            <Box sx={{ width: '100%', overflowX: 'auto' }}>
                <Box sx={{ width: 2500 }}>
                    <Box sx={{
                        height: 45, mt: .5, mx: 1.5, display: 'flex', borderBottom: 1, borderTop: 1, borderColor: 'lightgray', pt: 1.5,
                        bgcolor: 'white'
                    }}>
                        <Box sx={{ width: 40, pl: 1.7, fontWeight: 600, color: '#444444', fontSize: 12 }}>#</Box>
                        <Box sx={{ width: 60, fontWeight: 600, color: '#444444', fontSize: 12 }}>Action</Box>
                        <Box sx={{ width: 100, fontWeight: 600, color: '#444444', fontSize: 12, pl: 1 }}>Status</Box>
                        <Box sx={{ width: 150, fontWeight: 600, color: '#444444', fontSize: 12, pl: 1 }}>Count Down</Box>
                        <Box sx={{ width: 500, fontWeight: 600, color: '#444444', fontSize: 12, pl: 1 }}>Projects</Box>
                        <Box sx={{ width: 500, fontWeight: 600, color: '#444444', fontSize: 12, pl: 1 }}>Goal</Box>
                        <Box sx={{ width: 150, fontWeight: 600, color: '#444444', fontSize: 12, pl: 1 }}>Project Created Date</Box>
                        <Box sx={{ width: 150, fontWeight: 600, color: '#444444', fontSize: 12, pl: 1 }}>Due Date</Box>
                        <Box sx={{ width: 150, fontWeight: 600, color: '#444444', fontSize: 12, pl: 1 }}>Completed Date</Box>
                        <Box sx={{ width: 500, fontWeight: 600, color: '#444444', fontSize: 12, pl: .5 }}>Description</Box>
                    </Box>
                    <Virtuoso
                        style={{ height: '60vh' }}
                        totalCount={Projectz?.length}
                        itemContent={(index) => {
                            const val = Projectz[index];
                            return (
                                <Box key={val.tm_project_slno}
                                    sx={{
                                        display: 'flex', mt: .3,
                                        borderBottom: .1, mx: 1.5,
                                        borderColor: 'lightgrey', minHeight: 35,
                                        maxHeight: 80,
                                        pt: .5,
                                    }}
                                >
                                    <Box sx={{ pl: 1.5, width: 40 }}>
                                        {index + 1}
                                    </Box>
                                    <Box sx={{ width: 60, pl: 1 }}>
                                        <EditIcon
                                            sx={{ cursor: 'pointer', '&:hover': { color: '#003060' } }} size={6}
                                            onClick={() => rowSelect(val)}
                                        />
                                    </Box>
                                    <Box sx={{ width: 100 }}>
                                        <Chip sx={{
                                            fontSize: 12,
                                            color: val.tm_project_status === null ? '#311E26'
                                                : val.tm_project_status === 0 ? '#311E26'
                                                    : val.tm_project_status === 1 ? '#94C973'
                                                        : 'transparent', minHeight: 5,
                                            fontWeight: 600
                                        }}>
                                            {val.tm_project_status === null ? 'Incompleted' : val.tm_project_status === 0 ? 'Incompleted' : val.tm_project_status === 1 ? 'Completed' : 'not given'}
                                        </Chip>
                                    </Box>
                                    <Box sx={{ width: 150, fontWeight: 600, color: 'grey', fontSize: 12 }}>
                                        {val.tm_project_status !== 1 ?
                                            <Box sx={{ bgcolor: '#EAEAEA', borderRadius: 15, mb: .5, width: 150, pl: 1 }}>
                                                <CountDowncomponent DueDates={val.tm_project_duedate} />
                                            </Box> :
                                            <Box sx={{ bgcolor: '#EAEAEA', borderRadius: 15, mb: .5, width: 150, pl: 5, color: 'darkgreen' }}>
                                                Completed
                                            </Box>
                                        }
                                    </Box>
                                    <Box sx={{ width: 500 }}>
                                        {val.tm_project_status === 1 ?
                                            <Box sx={{ width: 600, fontWeight: 600, color: 'grey', fontSize: 12, pl: 1, textTransform: 'capitalize' }}>
                                                {val.tm_project_name}
                                            </Box> :
                                            <Box sx={{
                                                width: 500, fontWeight: 600, color: isPastDue(val.tm_project_duedate) ? '#B32600' : 'grey', fontSize: 12, pl: 1,
                                                textTransform: 'capitalize'
                                            }}>
                                                {val.tm_project_name}
                                            </Box>
                                        }
                                    </Box>
                                    <Box sx={{ width: 500 }}>
                                        {val.tm_project_status === 1 ?
                                            <Box sx={{ width: 600, fontWeight: 600, color: 'grey', fontSize: 12, pl: 1, textTransform: 'capitalize' }}>
                                                {val.tm_goal_name || 'not given'}
                                            </Box> :
                                            <Box sx={{
                                                width: 500, fontWeight: 600, color: isPastDue(val.tm_project_duedate) ? '#B32600' : 'grey', fontSize: 12, pl: 1,
                                                textTransform: 'capitalize'
                                            }}>
                                                {val.tm_goal_name || 'not given'}
                                            </Box>
                                        }
                                    </Box>
                                    <Box sx={{ width: 150 }}>
                                        {val.tm_project_status === 1 ?
                                            <Box sx={{ width: 180, fontWeight: 600, color: 'grey', fontSize: 12, pl: 1, textTransform: 'capitalize' }}>
                                                {val.create_date || 'not given'}
                                            </Box> :
                                            <Box sx={{
                                                width: 180, fontWeight: 600, color: isPastDue(val.tm_project_duedate) ? '#B32600' : 'grey', fontSize: 12, pl: 1,
                                                textTransform: 'capitalize'
                                            }}>
                                                {val.create_date || 'not given'}
                                            </Box>
                                        }
                                    </Box>
                                    <Box sx={{ width: 150 }}>
                                        {val.tm_project_status === 1 ?
                                            <Box sx={{ width: 180, fontWeight: 600, color: 'grey', fontSize: 12, pl: 1, textTransform: 'capitalize' }}>
                                                {val.tm_project_duedate || 'not given'}
                                            </Box> :
                                            <Box sx={{
                                                width: 150, fontWeight: 600, color: isPastDue(val.tm_project_duedate) ? '#B32600' : 'grey', fontSize: 12, pl: 1,
                                                textTransform: 'capitalize'
                                            }}>
                                                {val.tm_project_duedate || 'not given'}
                                            </Box>
                                        }
                                    </Box>
                                    <Box sx={{ width: 150 }}>
                                        {val.tm_project_status === 1 ?
                                            <Box sx={{ width: 180, fontWeight: 600, color: 'grey', fontSize: 12, pl: 1, textTransform: 'capitalize' }}>
                                                {val.tm_project_cmpltedate || 'not completed'}
                                            </Box> :
                                            <Box sx={{
                                                width: 180, fontWeight: 600, color: isPastDue(val.tm_project_duedate) ? '#B32600' : 'grey', fontSize: 12, pl: 1,
                                                textTransform: 'capitalize'
                                            }}>
                                                {val.tm_project_cmpltedate || 'not completed'}
                                            </Box>
                                        }
                                    </Box>
                                    <Box sx={{ width: 500 }}>
                                        {val.tm_project_status === 1 ?
                                            <Box sx={{ width: 600, fontWeight: 600, color: 'grey', fontSize: 12, pl: 1, textTransform: 'capitalize' }}>
                                                {val.tm_project_description || 'not given'}
                                            </Box> :
                                            <Box sx={{
                                                width: 500, fontWeight: 600, color: isPastDue(val.tm_project_duedate) ? '#B32600' : 'grey', fontSize: 12, pl: 1,
                                                textTransform: 'capitalize'
                                            }}>
                                                {val.tm_project_description || 'not given'}
                                            </Box>
                                        }
                                    </Box>
                                </Box>
                            );
                        }}
                    />
                </Box>
            </Box>
        </Box>
    )
}
export default memo(AllProjectsList)