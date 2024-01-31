import { Box, CssVarsProvider, Table } from '@mui/joy'
import { Paper } from '@mui/material'
import React, { memo } from 'react'
import moment from 'moment';
import EditIcon from '@mui/icons-material/Edit'
const EmpProgressTable = ({ tabledata, rowSelect }) => {




    return (
        // <Box>



        <Paper variant="outlined" sx={{ width: '99%', m: 1, overflow: 'auto', maxHeight: 300 }}>
            {tabledata.length !== 0 ?
                <CssVarsProvider>
                    <Table padding={"none"} stickyHeader style={{ color: '#3E004A' }}
                        hoverRow>
                        <thead>
                            <tr >
                                <th style={{ width: 20 }}>#</th>
                                <th style={{ width: 20 }}>Action</th>
                                <th style={{ width: 50 }}>Date</th>
                                <th style={{ width: 50 }}>Assignee</th>
                                <th style={{ width: 100 }}>Progress</th>
                            </tr>
                        </thead>
                        <tbody >
                            {tabledata?.map((val, index) => {
                                return (
                                    <tr key={index}
                                    >
                                        <td> {index + 1}</td>
                                        <td >
                                            <EditIcon
                                                sx={{ cursor: 'pointer', color: '#3E004A' }} size={6}
                                                onClick={() => rowSelect(val)}
                                            />
                                        </td>
                                        <td> {moment(val.tm_progres_date).format('DD-MM-YYYY hh:mm') || 'not given'}</td>
                                        <td> {val.em_name || 'not given'}</td>
                                        <td> {val.tm_task_progress || 'not given'}</td>


                                        {/* <td> {val.tm_project_description || 'not given'}</td> */}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </CssVarsProvider> :
                <Box sx={{ textAlign: 'center', my: 5, fontWeight: 700, fontSize: 30, color: '#C7C8CB' }}>
                    No Progress Under Task
                </Box>}

        </Paper>
        // </Box>
    )
}

export default memo(EmpProgressTable)