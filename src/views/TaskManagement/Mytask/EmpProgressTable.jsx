import { Box, CssVarsProvider, Table } from '@mui/joy'
import { Paper } from '@mui/material'
import React, { memo } from 'react'
import moment from 'moment';
import EditIcon from '@mui/icons-material/Edit'
const EmpProgressTable = ({ progresstabledata, rowSelect, }) => {

    return (
        <Paper variant="outlined" sx={{ width: '99%', m: 1, overflow: 'auto', maxHeight: 300 }}>
            {progresstabledata.length !== 0 ?
                <Box>
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
                                {progresstabledata?.map((val, index) => {
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
                                            <td style={{ textTransform: 'capitalize' }}> {val.em_name || 'not given'}</td>
                                            <td style={{ textTransform: 'capitalize' }}> {val.tm_task_progress || 'not given'}</td>

                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>

                    </CssVarsProvider>
                </Box> :
                <Box sx={{ textAlign: 'center', my: 5, fontWeight: 700, fontSize: 30, color: '#C7C8CB' }}>

                    No Progress Under Task
                </Box>}

        </Paper>

    )
}

export default memo(EmpProgressTable)