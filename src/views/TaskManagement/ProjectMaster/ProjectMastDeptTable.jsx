import React, { memo, useEffect, useState } from 'react'
import { Box, CssVarsProvider, Table } from '@mui/joy'
import { Divider, Paper } from '@mui/material'
// import _ from 'underscore';
import { useSelector } from 'react-redux';
import { axioslogin } from 'src/views/Axios/Axios';
import { warningNotify } from 'src/views/Common/CommonCode';
import EditIcon from '@mui/icons-material/Edit'
import moment from 'moment';
import CountDowncomponent from '../CountDown/CountDowncomponent';
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
                            dept_name: (val.dept_name).toLowerCase(),
                            sec_name: (val.sec_name).toLowerCase(),
                            tm_project_dept: val.tm_project_dept,
                            tm_project_deptsec: val.tm_project_deptsec,
                            tm_project_duedate: val.tm_project_duedate,
                            tm_project_description: val.tm_project_description,
                            tm_project_status: val.tm_project_status,
                            tm_goal_slno: val.tm_goal_slno,
                            tm_goal_name: val.tm_goal_name,
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

    const isPastDue = (tm_task_due_date) => {
        const today = new Date();
        const due = new Date(tm_task_due_date);
        return due < today
    }
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
                                            <th style={{ width: 200, fontFamily: 'Georgia', }}>CountDoun</th>
                                            <th style={{ width: 300, fontFamily: 'Georgia', }}>Goal</th>
                                            <th style={{ width: 400, fontFamily: 'Georgia', }}>Projects</th>
                                            <th style={{ width: 220, fontFamily: 'Georgia', }}>Department</th>
                                            <th style={{ width: 220, fontFamily: 'Georgia', }}>Section</th>
                                            <th style={{ width: 150, fontFamily: 'Georgia', }}>Created date</th>
                                            <th style={{ width: 150, fontFamily: 'Georgia', }}>Due date</th>
                                            <th style={{ width: 400, fontFamily: 'Georgia', }}>Description</th>
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
                                                    <td>
                                                        {val.tm_project_status !== 1 ?
                                                            <Box sx={{ border: .1, borderStyle: 'dashed', borderColor: '#C3CEDA', px: .5, flex: .9, borderRadius: 20 }}>
                                                                <CountDowncomponent DueDates={val.tm_project_duedate} />
                                                            </Box> :
                                                            <Box sx={{
                                                                display: 'flex', border: .1, borderStyle: 'dashed', borderColor: '#C3CEDA', px: .5, flex: 1,
                                                                borderRadius: 20
                                                            }}>
                                                                <Box sx={{ flex: .5, }}></Box>
                                                                <Box sx={{ flex: 1, }}>completed</Box>
                                                                <Box sx={{ flex: .5 }}></Box>
                                                            </Box>
                                                        }
                                                    </td>
                                                    {val.tm_project_status === 1 ?
                                                        <td style={{ textTransform: 'capitalize' }}> {val.tm_goal_name || 'not given'}</td> :
                                                        <td style={{ textTransform: 'capitalize', color: isPastDue(val.tm_project_duedate) ? '#B32800' : 'black' }}>
                                                            {val.tm_goal_name || 'not given'}</td>}
                                                    {val.tm_project_status === 1 ?
                                                        <td style={{ textTransform: 'capitalize' }}> {val.tm_project_name || 'not given'}</td> :
                                                        <td style={{ textTransform: 'capitalize', color: isPastDue(val.tm_project_duedate) ? '#B32800' : 'black' }}>
                                                            {val.tm_project_name || 'not given'}</td>}
                                                    {val.tm_project_status === 1 ?
                                                        <td style={{ textTransform: 'capitalize' }}> {val.dept_name || 'not given'}</td> :
                                                        <td style={{ textTransform: 'capitalize', color: isPastDue(val.tm_project_duedate) ? '#B32800' : 'black' }}>
                                                            {val.dept_name || 'not given'}</td>}
                                                    {val.tm_project_status === 1 ?
                                                        <td style={{ textTransform: 'capitalize' }}> {val.sec_name || 'not given'}</td> :
                                                        <td style={{ textTransform: 'capitalize', color: isPastDue(val.tm_project_duedate) ? '#B32800' : 'black' }}>
                                                            {val.sec_name || 'not given'}</td>}
                                                    {val.tm_project_status === 1 ?
                                                        <td> {moment(val.create_date).format('DD-MM-YYYY hh:mm:ss') || 'not given'}</td> :
                                                        <td style={{ color: isPastDue(val.tm_project_duedate) ? '#B32800' : 'black' }}>
                                                            {moment(val.create_date).format('DD-MM-YYYY hh:mm:ss') || 'not given'}</td>}
                                                    {val.tm_project_status === 1 ?
                                                        <td> {moment(val.tm_project_duedate).format('DD-MM-YYYY hh:mm:ss') || 'not given'}</td> :
                                                        <td style={{ color: isPastDue(val.tm_project_duedate) ? '#B32800' : 'black' }}>
                                                            {moment(val.tm_project_duedate).format('DD-MM-YYYY hh:mm:ss') || 'not given'}</td>}
                                                    {val.tm_project_status === 1 ?
                                                        <td style={{ textTransform: 'capitalize' }}> {val.tm_project_description || 'not given'}</td> :
                                                        <td style={{ textTransform: 'capitalize', color: isPastDue(val.tm_project_duedate) ? '#B32800' : 'black' }}>
                                                            {val.tm_project_description || 'not given'}</td>}
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