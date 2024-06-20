import { AccordionDetails, Box, Stack, Tooltip, } from '@mui/joy'
import React, { memo, useEffect, useState } from 'react'
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import { axioslogin } from 'src/views/Axios/Axios';
import EmpTaskCountUnderProject from './EmpTaskCountUnderProject';

const EmployeeUnderProject = ({ val }) => {
    const [allProjEmp, setAllProjEmp] = useState([])
    const { tm_project_slno } = val
    useEffect(() => {
        const getAllProjTask = async () => {
            const result = await axioslogin.get(`/TmTableView/allEmployeeProject/${tm_project_slno}`);
            const { success, data } = result.data;
            if (success === 2) {
                setAllProjEmp(data)
            }
        }
        getAllProjTask(tm_project_slno)
    }, [tm_project_slno])
    return (
        <Box >
            {
                allProjEmp && allProjEmp.map((val) => {
                    return <AccordionDetails
                        key={val.tm_assigne_emp}
                        sx={{ mx: 3, margin: '-6px' }}  >
                        <Stack>
                            <FormControl orientation="horizontal" sx={{ borderBottom: 1, borderColor: '#B7CFDC', height: 40, pl: 2, bgcolor: '#EAEFF2', overflow: 'auto' }}>
                                <Tooltip title="Assignee" >
                                    <FormLabel sx={{ fontSize: 14, flex: 1.3, textTransform: 'capitalize', cursor: 'grab' }}>
                                        {val.em_name}
                                    </FormLabel>
                                </Tooltip>
                                <FormLabel sx={{ fontSize: 15, flex: 4, cursor: 'grab' }}>
                                    <EmpTaskCountUnderProject val={val} />
                                </FormLabel>
                            </FormControl>
                        </Stack>
                    </AccordionDetails>
                })
            }
        </Box >
    )
}

export default memo(EmployeeUnderProject)