import React, { memo, useEffect, useState } from 'react'
import { Box, CssVarsProvider, Table } from '@mui/joy'
import { Divider, Paper } from '@mui/material'
// import _ from 'underscore';
import { useSelector } from 'react-redux';
import { axioslogin } from 'src/views/Axios/Axios';
import { warningNotify } from 'src/views/Common/CommonCode';
import EditIcon from '@mui/icons-material/Edit'
import moment from 'moment';
const ProjectMastDeptTable = ({ tableCount, rowSelect }) => {

    const [tabledata, setTabledata] = useState([])
    const empsecid = useSelector((state) => {
        return state.LoginUserData.empsecid
    })

    useEffect(() => {
        const getAllProjects = async () => {
            const result = await axioslogin.get(`/taskManagement/viewDeptProject/${empsecid}`);
            const { success, data } = result.data;
            if (data.length !== 0) {
                if (success === 2) {
                    const arry = data?.map((val) => {
                        const obj = {
                            tm_project_slno: val.tm_project_slno,
                            tm_project_name: val.tm_project_name,
                            dept_name: val.dept_name,
                            sec_name: val.sec_name,
                            tm_project_dept: val.tm_project_dept,
                            tm_project_deptsec: val.tm_project_deptsec,
                            tm_project_duedate: val.tm_project_duedate,
                            tm_project_description: val.tm_project_description,
                            tm_project_status: val.tm_project_status,
                            tm_goal_slno: val.tm_goal_slno,
                            ProjectStatus: val.tm_project_status === 1 ? 'Completed' : val.tm_project_status === 0 ? 'Incompleted' : 'Incompleted',
                        }
                        return obj
                    })
                    setTabledata(arry)
                } else {
                    setTabledata([])
                    warningNotify('error occured')
                }
            } else {
            }
        }
        getAllProjects(empsecid)
    }, [empsecid, tableCount])
    return (
        <Box sx={{ mt: 1, flex: 1, }}>
            {tabledata.length !== 0 ?
                <Box>
                    <Divider textAlign="left" sx={{ fontWeight: 600, mx: 2, fontSize: 18, color: '#5F093D', fontFamily: 'Georgia' }}>Projects</Divider>

                    <Box sx={{ height: 500, }}>
                        <Paper variant="outlined" sx={{ maxHeight: 495, maxWidth: '100%', overflow: 'auto', mt: .5, }}>
                            <CssVarsProvider>
                                <Table padding={"none"} stickyHeader
                                    hoverRow>
                                    <thead>
                                        <tr>
                                            <th style={{ width: 60, fontFamily: 'Georgia', }}>SlNo</th>
                                            <th style={{ width: 70, fontFamily: 'Georgia', }}>Action</th>
                                            <th style={{ width: 100, fontFamily: 'Georgia', }}>Status</th>
                                            <th style={{ width: 200, fontFamily: 'Georgia', }}>Projects</th>
                                            <th style={{ width: 220, fontFamily: 'Georgia', }}>Department</th>
                                            <th style={{ width: 220, fontFamily: 'Georgia', }}>Section</th>
                                            <th style={{ width: 120, fontFamily: 'Georgia', }}>Due date</th>
                                            <th style={{ width: 350, fontFamily: 'Georgia', }}>Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tabledata?.map((val, index) => {
                                            return (
                                                <tr key={index}  >
                                                    <td> {index + 1}</td>
                                                    <td>
                                                        <EditIcon
                                                            sx={{ cursor: 'pointer' }} size={6}
                                                            onClick={() => rowSelect(val)}
                                                        />
                                                    </td>
                                                    <td
                                                        style={{
                                                            color: val.tm_project_status === null ? '#5F093D' : val.tm_project_status === 0 ? '#5F093D'
                                                                : val.tm_project_status === 1 ? 'green' : 'transparent', minHeight: 5
                                                        }}>{val.ProjectStatus}</td>
                                                    <td> {val.tm_project_name || 'not given'}</td>
                                                    <td> {val.dept_name || 'not given'}</td>
                                                    <td> {val.sec_name || 'not given'}</td>
                                                    <td> {moment(val.tm_project_duedate).format('DD-MM-YYYY hh:mm') || 'not given'}</td>
                                                    <td> {val.tm_project_description || 'not given'}</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </Table>
                            </CssVarsProvider>
                        </Paper>
                    </Box>
                </Box> :
                <Box sx={{ height: 500, textAlign: 'center', pr: 18, m: 5, fontWeight: 700, fontSize: 30, color: '#C7C8CB', }}>  No Project Under Section</Box>}
        </Box>
    )
}

export default memo(ProjectMastDeptTable)