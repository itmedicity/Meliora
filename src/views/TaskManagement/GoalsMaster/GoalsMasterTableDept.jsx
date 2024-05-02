import React, { memo, useEffect, useState } from 'react'
import { Box, CssVarsProvider, Table, } from '@mui/joy'
import { Divider, Paper } from '@mui/material'
import { useSelector } from 'react-redux'
import { axioslogin } from 'src/views/Axios/Axios';
import { warningNotify } from 'src/views/Common/CommonCode';
import EditIcon from '@mui/icons-material/Edit';
import moment from 'moment';
import CountDowncomponent from '../CountDown/CountDowncomponent';

const GoalsMasterTableDept = ({ rowSelect, tableCount }) => {
    const [tabledata, setTabledata] = useState([])
    const empsecid = useSelector((state) => {
        return state.LoginUserData.empsecid
    })

    useEffect(() => {
        const getGoalTable = async () => {
            const result = await axioslogin.get(`/taskManagement/viewDeptGoal/${empsecid}`);
            const { success, data } = result.data;
            if (data.length !== 0) {
                if (success === 2) {
                    const arry = data?.map((val) => {
                        const obj = {
                            tm_goals_slno: val.tm_goals_slno,
                            tm_goal_name: val.tm_goal_name,
                            dept_name: (val.dept_name).toLowerCase(),
                            sec_name: (val.sec_name).toLowerCase(),
                            tm_goal_dept: val.tm_goal_dept,
                            tm_goal_deptsec: val.tm_goal_deptsec,
                            create_date: val.create_date,
                            tm_goal_duedate: val.tm_goal_duedate,
                            tm_goal_fromdate: val.tm_goal_fromdate,
                            tm_goal_description: val.tm_goal_description,
                            tm_goal_status: val.tm_goal_status,
                            GoalStatus: val.tm_goal_status === 1 ? 'Completed' : val.tm_goal_status === 0 ? 'Incompleted' : 'Incompleted',
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
        getGoalTable(empsecid)
    }, [empsecid, tableCount])

    const isPastDue = (tm_task_due_date) => {
        const today = new Date();
        const due = new Date(tm_task_due_date);
        return due < today
    }
    return (
        <Box sx={{ mt: 1 }}>
            {tabledata.length !== 0 ?
                <Box>
                    <Divider textAlign="left" sx={{ fontWeight: 600, mx: 1, fontSize: 18, color: '#52688F', fontFamily: 'Georgia' }}>Goals</Divider>
                    <Box sx={{ height: 500, px: 1 }}>
                        <Paper variant="outlined" sx={{ maxHeight: 495, maxWidth: '100%', overflow: 'auto', m: .5, pb: .5 }}>
                            <CssVarsProvider>
                                <Table padding={"none"} stickyHeader
                                    hoverRow>
                                    <thead>
                                        <tr>
                                            <th style={{ width: 60, fontFamily: 'Georgia', }}>SlNo</th>
                                            <th style={{ width: 70, fontFamily: 'Georgia', }}>Action</th>
                                            <th style={{ width: 100, fontFamily: 'Georgia', }}>Status</th>
                                            <th style={{ width: 200, fontFamily: 'Georgia', }}>CountDoun</th>
                                            <th style={{ width: 500, fontFamily: 'Georgia', }}>Goals</th>
                                            <th style={{ width: 220, fontFamily: 'Georgia', }}>Department</th>
                                            <th style={{ width: 220, fontFamily: 'Georgia', }}>Section</th>
                                            <th style={{ width: 150, fontFamily: 'Georgia', }}> Created Date</th>
                                            <th style={{ width: 150, fontFamily: 'Georgia', }}>From date</th>
                                            <th style={{ width: 150, fontFamily: 'Georgia', }}>Due date</th>
                                            <th style={{ width: 600, fontFamily: 'Georgia', }}>Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tabledata?.map((val, index) => {
                                            return (
                                                <tr key={index}
                                                >
                                                    <td> {index + 1}</td>
                                                    <td>
                                                        <EditIcon
                                                            sx={{ cursor: 'pointer' }} size={6}
                                                            onClick={() => rowSelect(val)}
                                                        />
                                                    </td>
                                                    <td
                                                        style={{
                                                            color: val.tm_goal_status === null ? '#5F093D' : val.tm_goal_status === 0 ? '#5F093D'
                                                                : val.tm_goal_status === 1 ? 'green' : 'transparent', minHeight: 5
                                                        }}> {val.GoalStatus || 'not given'}</td>

                                                    <td>
                                                        {val.tm_goal_status !== 1 ?
                                                            <Box sx={{ border: .1, borderStyle: 'dashed', borderColor: '#C3CEDA', px: .5, flex: .9, borderRadius: 20 }}>
                                                                <CountDowncomponent DueDates={val.tm_goal_duedate} />
                                                            </Box> :
                                                            <Box sx={{
                                                                display: 'flex', border: .1, borderStyle: 'dashed', borderColor: '#C3CEDA', p: .5, flex: 1,
                                                                borderRadius: 20, px: .5
                                                            }}>
                                                                <Box sx={{ flex: .5, }}></Box>
                                                                <Box sx={{ flex: 1, }}>completed</Box>
                                                                <Box sx={{ flex: .5 }}></Box>
                                                            </Box>
                                                        }
                                                    </td>
                                                    {val.tm_goal_status === 1 ?
                                                        <td style={{ textTransform: 'capitalize' }}> {val.tm_goal_name || 'not given'}</td> :
                                                        <td style={{ textTransform: 'capitalize', color: isPastDue(val.tm_goal_duedate) ? '#B32800' : 'black' }}>
                                                            {val.tm_goal_name || 'not given'}</td>}
                                                    {val.tm_goal_status === 1 ?
                                                        <td style={{ textTransform: 'capitalize' }}> {val.dept_name || 'not given'}</td> :
                                                        <td style={{ textTransform: 'capitalize', color: isPastDue(val.tm_goal_duedate) ? '#B32800' : 'black' }}>
                                                            {val.dept_name || 'not given'}</td>}
                                                    {val.tm_goal_status === 1 ?
                                                        <td style={{ textTransform: 'capitalize' }}> {val.sec_name || 'not given'}</td> :
                                                        <td style={{ textTransform: 'capitalize', color: isPastDue(val.tm_goal_duedate) ? '#B32800' : 'black' }}>
                                                            {val.sec_name || 'not given'}</td>}
                                                    {val.tm_goal_status === 1 ?
                                                        <td> {moment(val.create_date).format('DD-MM-YYYY') || 'not given'}</td> :
                                                        <td style={{ color: isPastDue(val.tm_goal_duedate) ? '#B32800' : 'black' }}>
                                                            {moment(val.create_date).format('DD-MM-YYYY hh:mm') || 'not given'}</td>}
                                                    {val.tm_goal_status === 1 ?
                                                        <td> {moment(val.tm_goal_fromdate).format('DD-MM-YYYY') || 'not given'}</td> :
                                                        <td style={{ color: isPastDue(val.tm_goal_duedate) ? '#B32800' : 'black' }}>
                                                            {moment(val.tm_goal_fromdate).format('DD-MM-YYYY hh:mm') || 'not given'}</td>}
                                                    {val.tm_goal_status === 1 ?
                                                        <td> {moment(val.tm_goal_duedate).format('DD-MM-YYYY') || 'not given'}</td> :
                                                        <td style={{ color: isPastDue(val.tm_goal_duedate) ? '#B32800' : 'black' }}>
                                                            {moment(val.tm_goal_duedate).format('DD-MM-YYYY hh:mm') || 'not given'}</td>}
                                                    {val.tm_goal_status === 1 ?
                                                        <td style={{ textTransform: 'capitalize' }}> {val.tm_goal_description || 'not given'}</td> :
                                                        <td style={{ textTransform: 'capitalize', color: isPastDue(val.tm_goal_duedate) ? '#B32800' : 'black' }}>
                                                            {val.tm_goal_description || 'not given'}</td>}
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </Table>
                            </CssVarsProvider>
                        </Paper>
                    </Box>
                </Box> :
                <Box sx={{ height: 500, textAlign: 'center', pr: 20, m: 5, fontWeight: 700, fontSize: 30, color: '#C7C8CB', }}>  No Goals set under section</Box>}
        </Box>
    )
}

export default memo(GoalsMasterTableDept)