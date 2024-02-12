import { Box, Tooltip, Typography } from '@mui/joy'
import React, { useEffect, useState } from 'react'
import AccordionGroup from '@mui/joy/AccordionGroup';
import Accordion from '@mui/joy/Accordion';
import accordionDetailsClasses from '@mui/joy/AccordionDetails';
import AccordionSummary, { accordionSummaryClasses, } from '@mui/joy/AccordionSummary';
import Avatar from '@mui/joy/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import { getDepartSecemployee } from 'src/redux/actions/EmpNameDeptSect.action';
import { axioslogin } from 'src/views/Axios/Axios';
import LanIcon from '@mui/icons-material/Lan';
import TmProjectCircularProgress from './TmProjectCircularProgress';
import EmployeeUnderProject from './EmployeeUnderProject';

const TmProjectTaskData = () => {
    const dispatch = useDispatch();
    const empsecid = useSelector((state) => { return state.LoginUserData.empsecid })
    const [allProject, setAllProject] = useState([])
    useEffect(() => {
        dispatch(getDepartSecemployee(empsecid))
    }, [dispatch, empsecid])

    useEffect(() => {
        const getAllProjectUnderSection = async () => {
            const result = await axioslogin.get(`/TmTableView/allProjectUnderSection/${empsecid}`);
            const { success, data } = result.data;
            if (success === 2) {
                setAllProject(data)
            }
        }
        getAllProjectUnderSection(empsecid)
    }, [empsecid])

    return (
        <Box sx={{ height: 450, overflow: 'auto' }}>
            <AccordionGroup
                variant="plain"
                transition="0.2s"
                sx={{
                    [`& .${accordionDetailsClasses.content}.${accordionDetailsClasses.expanded}`]:
                    {

                    },
                    [`& .${accordionSummaryClasses.button}`]: {
                        // paddingBlock: '.5rem',
                    },
                }}
            >
                {
                    allProject && allProject.map((val) => {
                        // const { tm_project_slno } = val
                        return <Accordion
                            key={val.tm_project_slno}
                        >
                            <AccordionSummary>
                                <Avatar color='primary'  >

                                    <LanIcon />
                                </Avatar>
                                <Box sx={{ flex: 6, textTransform: 'capitalize' }}>
                                    <Typography sx={{ fontSize: 15 }}>{val.tm_project_name}</Typography>
                                </Box>
                                <Box sx={{ flex: 1 }}>
                                    <Tooltip title="Project Due Date" >
                                        <Typography sx={{ fontSize: 15, cursor: 'grab' }}>{val.tm_project_duedate}</Typography>
                                    </Tooltip>
                                </Box>
                                <Box>
                                    <TmProjectCircularProgress val={val}
                                    />
                                </Box>

                            </AccordionSummary >
                            <EmployeeUnderProject val={val} />
                        </Accordion>
                    })
                }
            </AccordionGroup>
        </Box >
    )
}

export default TmProjectTaskData