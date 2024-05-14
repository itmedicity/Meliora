import { Box, CssVarsProvider, Table, Typography, Tooltip } from '@mui/joy'
import { Divider, Paper } from '@mui/material'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import RefreshIcon from '@mui/icons-material/Refresh';
import TmDepartmentSelect from 'src/views/CommonSelectCode/TmDepartmentSelect';
import TmDeptSectionSelect from 'src/views/CommonSelectCode/TmDeptSectionSelect';
import moment from 'moment';
// import _ from 'underscore';
import { useDispatch } from 'react-redux';
import { getDepartment } from 'src/redux/actions/Department.action';
import { axioslogin } from 'src/views/Axios/Axios';
import { warningNotify } from 'src/views/Common/CommonCode';
import EditIcon from '@mui/icons-material/Edit'
import CusIconButton from 'src/views/Components/CusIconButton';
import CountDowncomponent from '../CountDown/CountDowncomponent';
const ProjectMasterTable = ({ tableCount, settableCount, rowSelect }) => {
    const [tabledata, setTableData] = useState([])
    const [departments, setDepartments] = useState(0)
    const [deptsecs, setDeptSecs] = useState(0)

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getDepartment())
    }, [dispatch])

    const searchData = useMemo(() => {

        return {
            tm_project_dept: departments,
            tm_project_deptsec: deptsecs
        }
    }, [departments, deptsecs])
    const DeptSearch = useCallback(() => {
        const getDeptTable = async () => {
            const result = await axioslogin.post(`/taskManagement/searchProjectDeptAndSec`, searchData)
            const { success, data } = result.data

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
                        tm_goal_name: val.tm_goal_name,
                        create_date: val.create_date,
                        ProjectStatus: val.tm_project_status === 1 ? 'Completed' : val.tm_project_status === 0 ? 'Incompleted' : 'Incompleted',
                    }
                    return obj
                })
                setTableData(arry)
            } else {
                setTableData([])
            }
        }
        getDeptTable(searchData)
    }, [searchData])
    useEffect(() => {
        const getAllProjects = async () => {
            const result = await axioslogin.get('/taskManagement/viewProject');
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
                            tm_goal_name: val.tm_goal_name,
                            create_date: val.create_date,
                            ProjectStatus: val.tm_project_status === 1 ? 'Completed' : val.tm_project_status === 0 ? 'Incompleted' : 'Incompleted',
                        }
                        return obj
                    })
                    setTableData(arry)
                    // settableCount(tableCount + 1)
                } else {
                    setTableData([])
                    warningNotify('error occured')
                }
            }
        }
        if (departments === 0 && deptsecs === 0) {
            getAllProjects()
        }
    }, [departments, deptsecs, tableCount])


    const Refreshh = useCallback(() => {
        setDepartments(0)
        setDeptSecs(0)
    }, [])

    const isPastDue = (tm_task_due_date) => {
        const today = new Date();
        const due = new Date(tm_task_due_date);
        return due < today
    }
    return (
        <Box sx={{ mt: 1 }}>
            <Divider textAlign="left" sx={{ fontWeight: 600, mx: 2, fontSize: 18, color: '#52688F', fontFamily: 'Georgia' }}>Projects</Divider>
            <Box sx={{ width: '100%', backgroundColor: 'white', borderTopLeftRadius: 5, borderTopRightRadius: 5, display: 'flex', }}>
                <Box sx={{ flex: 1.5 }}></Box>
                <Box sx={{ flex: 5, display: 'flex', margin: 'auto', pb: .5, }}>
                    <Box sx={{ flex: 2, py: .4 }}>
                        <Typography sx={{ pl: .5, fontWeight: 600, fontSize: 18, color: '#003B73', fontFamily: 'Georgia' }}>Department</Typography>
                        <TmDepartmentSelect
                            department={departments}
                            setDepartment={setDepartments} />
                    </Box>
                    <Box sx={{ flex: 2, py: .4, pl: .4 }}>
                        <Typography sx={{ pl: .5, fontWeight: 600, color: '#003B73', fontSize: 18, fontFamily: 'Georgia' }}>Section</Typography>
                        <TmDeptSectionSelect
                            deptsec={deptsecs}
                            setDeptSec={setDeptSecs} />
                    </Box>
                    <Box sx={{ pt: 3.5, px: .5, flex: 1, display: 'flex' }}>
                        <Box sx={{ pr: .5 }}>
                            <CusIconButton size="sm" variant="outlined" color="primary"  >
                                <CssVarsProvider>
                                    <Tooltip title="search" placement="top">
                                        <ContentPasteSearchIcon sx={{ color: '#274472', cursor: 'pointer' }}
                                            onClick={DeptSearch}
                                        />
                                    </Tooltip>
                                </CssVarsProvider>
                            </CusIconButton>
                        </Box>
                        <Box sx={{ pr: .5 }}>
                            <CusIconButton size="sm" variant="outlined" color="primary"  >
                                <CssVarsProvider  >
                                    <Tooltip title="Refresh" placement="top">
                                        <RefreshIcon sx={{ color: '#274472', cursor: 'pointer' }}
                                            onClick={Refreshh}
                                        />
                                    </Tooltip>
                                </CssVarsProvider>
                            </CusIconButton>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ flex: 1, }}>
                </Box>
            </Box>
            {tabledata.length !== 0 ?
                <Box sx={{ height: 500, }}>
                    <Paper variant="outlined" sx={{ maxHeight: 500, maxWidth: '100%', overflow: 'auto', mt: .5, }}>
                        <CssVarsProvider>
                            <Table padding={"none"} stickyHeader size='sm'
                                hoverRow>
                                <thead>
                                    <tr>
                                        <th style={{ width: 60, fontFamily: 'Georgia', }}>SlNo</th>
                                        <th style={{ width: 70, fontFamily: 'Georgia', }}>Action</th>
                                        <th style={{ width: 100, fontFamily: 'Georgia', }}>Status</th>
                                        <th style={{ width: 200, fontFamily: 'Georgia', }}>CountDoun</th>
                                        <th style={{ width: 300, fontFamily: 'Georgia', }}>Goal</th>
                                        <th style={{ width: 500, fontFamily: 'Georgia', }}>Projects</th>
                                        <th style={{ width: 220, fontFamily: 'Georgia', }}>Department</th>
                                        <th style={{ width: 220, fontFamily: 'Georgia', }}>Section</th>
                                        <th style={{ width: 150, fontFamily: 'Georgia', }}>Created date</th>
                                        <th style={{ width: 150, fontFamily: 'Georgia', }}>Due date</th>
                                        <th style={{ width: 600, fontFamily: 'Georgia', }}>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tabledata?.map((val, index) => {
                                        return (
                                            <tr key={index} >
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
                                                        <Box sx={{ display: 'flex', border: .1, borderStyle: 'dashed', borderColor: '#C3CEDA', px: .5, flex: 1, borderRadius: 20 }}>
                                                            <Box sx={{ flex: .5, }}></Box>
                                                            <Box sx={{ flex: 1, color: '#3D550C' }}>completed</Box>
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
                : <Box sx={{ height: 500, textAlign: 'center', m: 5, fontWeight: 700, fontSize: 30, color: '#C7C8CB', }}>  No Pjojects set under section</Box>}
        </Box>
    )
}

export default memo(ProjectMasterTable)