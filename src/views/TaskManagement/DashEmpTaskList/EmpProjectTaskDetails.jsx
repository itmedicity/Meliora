import { AccordionDetails, Box, Stack, Tooltip } from '@mui/joy'
import React, { memo, useEffect, useState } from 'react'
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import { axioslogin } from 'src/views/Axios/Axios';
import EmpTaskUnderProjectCount from './EmpTaskUnderProjectCount';

const EmpProjectTaskDetails = ({ val }) => {

    const { emslno } = val
    const [empProject, setEmpProject] = useState([])
    useEffect(() => {
        const getAllEmployeeTask = async () => {
            const result = await axioslogin.get(`/TmTableView/EmpProjectTask/${emslno}`);
            const { success, data } = result.data;
            if (success === 2) {
                setEmpProject(data)
            }
        }
        getAllEmployeeTask(emslno)
    }, [emslno])

    return (
        <Box>
            {
                empProject && empProject.map((val) => {
                    return <AccordionDetails key={val.tm_project_slno} sx={{ mx: 3 }} >
                        <Stack>
                            <FormControl orientation="horizontal" sx={{
                                height: 65, pl: 2, bgcolor: '#EAEFF2', overflow: 'auto',
                                borderBottom: 1, borderRadius: 5, borderColor: '#B7CFDC',
                            }}>
                                <FormLabel sx={{ fontSize: 15, flex: 3, textTransform: 'capitalize' }}> {val.tm_project_name}</FormLabel>
                                <Tooltip title="Project Due Date">
                                    <FormLabel sx={{ fontSize: 15, flex: 1, cursor: 'grab' }}> {val.tm_project_duedate}</FormLabel>
                                </Tooltip>
                                <EmpTaskUnderProjectCount val={val} emslno={emslno} />
                            </FormControl>

                        </Stack>
                    </AccordionDetails>
                })

            }

        </Box >
    )
}

export default memo(EmpProjectTaskDetails)
