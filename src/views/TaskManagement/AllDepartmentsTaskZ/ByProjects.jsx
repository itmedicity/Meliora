import { Box, Chip } from '@mui/joy';
import React, { memo, useEffect, useState } from 'react';
import { axioslogin } from 'src/views/Axios/Axios';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AllTaskUnderProjectzz from './AllTaskUnderProjectzz';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const ByProjects = () => {
    const [allProject, setAllProject] = useState([]);
    const [openProjects, setOpenProjects] = useState({});

    useEffect(() => {
        const getAllProject = async () => {
            const result = await axioslogin.get(`/TmTableView/getAllProjects`);
            const { success, data } = result.data;
            if (success === 2) {
                setAllProject(data);
                // Initialize all projects to be open
                const initialOpenProjects = {};
                data.forEach(project => {
                    initialOpenProjects[project.tm_project_slno] = true;
                });
                setOpenProjects(initialOpenProjects);
            }
        };
        getAllProject();
    }, []);

    const toggleProjectOpen = (projectId) => {
        setOpenProjects(prevOpenProjects => ({
            ...prevOpenProjects,
            [projectId]: !prevOpenProjects[projectId]
        }));
    };

    return (
        <Box sx={{ mt: 2.5, overflow: 'auto', maxHeight: 630, }}>
            {allProject?.map((val) => {
                const isOpen = openProjects[val.tm_project_slno];
                return (
                    <Box key={val.tm_project_slno} sx={{ flex: 1, mb: 1, mx: 2, borderBottom: 1, borderColor: 'lightgray', pb: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => toggleProjectOpen(val.tm_project_slno)}>
                            {isOpen ? (
                                <ArrowDropDownIcon sx={{ color: '#92443A', bgcolor: '#F7F7F7' }} />
                            ) : (
                                <ArrowRightIcon sx={{ color: '#92443A', bgcolor: '#F7F7F7' }} />
                            )}
                            <Box >
                                <Chip sx={{ fontWeight: 600, color: '#5C5359', textTransform: 'capitalize', bgcolor: '#F0E9DE' }}><u>{val.tm_project_name}</u></Chip>
                            </Box>
                        </Box>
                        {isOpen && (
                            <Box sx={{ mx: 2 }}>
                                <AllTaskUnderProjectzz value={val} />
                            </Box>
                        )}
                    </Box>
                );
            })}
        </Box>
    );
};

export default memo(ByProjects)

