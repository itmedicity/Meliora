import React, { memo, useEffect, useState } from 'react'
import { Box, CssVarsProvider, Table, } from '@mui/joy'
import { Divider, Paper } from '@mui/material'
import { useSelector } from 'react-redux'
import { axioslogin } from 'src/views/Axios/Axios';
import { warningNotify } from 'src/views/Common/CommonCode';
import EditIcon from '@mui/icons-material/Edit';
import moment from 'moment';

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

    return (
        <Box sx={{ mt: 1 }}>
            {tabledata.length !== 0 ?
                <Box>
                    <Divider textAlign="left" sx={{ fontWeight: 600, mx: 2, fontSize: 18, color: '#5F093D', fontFamily: 'Georgia' }}>Goals</Divider>
                    <Box sx={{ height: 500, }}>
                        <Paper variant="outlined" sx={{ maxHeight: 495, maxWidth: '100%', overflow: 'auto', m: .5, pb: .5 }}>
                            <CssVarsProvider>
                                <Table padding={"none"} stickyHeader
                                    hoverRow>
                                    <thead>
                                        <tr>
                                            <th style={{ width: 60, fontFamily: 'Georgia', }}>SlNo</th>
                                            <th style={{ width: 70, fontFamily: 'Georgia', }}>Action</th>
                                            <th style={{ width: 100, fontFamily: 'Georgia', }}>Status</th>
                                            <th style={{ width: 200, fontFamily: 'Georgia', }}>Goals</th>
                                            <th style={{ width: 220, fontFamily: 'Georgia', }}>Department</th>
                                            <th style={{ width: 220, fontFamily: 'Georgia', }}>Section</th>
                                            <th style={{ width: 120, fontFamily: 'Georgia', }}>From date</th>
                                            <th style={{ width: 120, fontFamily: 'Georgia', }}>Due date</th>
                                            <th style={{ width: 350, fontFamily: 'Georgia', }}>Description</th>
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
                                                    <td style={{ textTransform: 'capitalize' }}> {val.tm_goal_name || 'not given'}</td>
                                                    <td style={{ textTransform: 'capitalize' }}> {val.dept_name || 'not given'}</td>
                                                    <td style={{ textTransform: 'capitalize' }}> {val.sec_name || 'not given'}</td>
                                                    <td> {moment(val.tm_goal_fromdate).format('DD-MM-YYYY hh:mm') || 'not given'}</td>
                                                    <td> {moment(val.tm_goal_duedate).format('DD-MM-YYYY hh:mm') || 'not given'}</td>
                                                    <td style={{ textTransform: 'capitalize' }}> {val.tm_goal_description || 'not given'}</td>
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