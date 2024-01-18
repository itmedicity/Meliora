import { Box, CssVarsProvider, Table, Typography, Tooltip } from '@mui/joy'
import { Divider } from '@mui/material'
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
    return (
        <Box sx={{ mt: 1 }}>
            <Divider textAlign="left" sx={{ fontWeight: 600, mx: 2, fontSize: 18, color: '#5F093D', fontFamily: 'Georgia' }}>Projects</Divider>
            <Box sx={{ width: '100%', backgroundColor: '#F2F1F0', borderTopLeftRadius: 5, borderTopRightRadius: 5, display: 'flex', }}>
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
                    <Box sx={{ pt: 4, px: 1, flex: 1, }}>

                        <CssVarsProvider>
                            <Tooltip title="search" placement="top">
                                <ContentPasteSearchIcon sx={{ color: '#274472', cursor: 'pointer' }}
                                    onClick={DeptSearch}
                                />
                            </Tooltip>
                        </CssVarsProvider>

                        <CssVarsProvider  >
                            <Tooltip title="Refresh" placement="top">
                                <RefreshIcon sx={{ color: '#274472', cursor: 'pointer' }}
                                    onClick={Refreshh}
                                />
                            </Tooltip>
                        </CssVarsProvider>
                    </Box>

                </Box>
                <Box sx={{ flex: 1, }}>
                </Box>
            </Box>
            {tabledata.length !== 0 ?
                <Box sx={{ m: 1 }}>
                    <CssVarsProvider>
                        <Table padding={"none"} stickyHeader sx={{ backgroundColor: 'white' }}
                            hoverRow>
                            <thead>
                                <tr>
                                    <th style={{ width: 55, fontFamily: 'Georgia', }}>SlNo</th>
                                    <th style={{ width: 80, fontFamily: 'Georgia', }}>Action</th>
                                    <th style={{ width: 100, fontFamily: 'Georgia', }}>Status</th>
                                    <th style={{ width: 200, fontFamily: 'Georgia', }}>Projects </th>
                                    <th style={{ width: 200, fontFamily: 'Georgia', }}>Department</th>
                                    <th style={{ width: 200, fontFamily: 'Georgia', }}>Section</th>
                                    <th style={{ width: 100, fontFamily: 'Georgia', }}>Due date</th>
                                    <th style={{ width: 500, fontFamily: 'Georgia', }}>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tabledata?.map((val, index) => {
                                    return (
                                        <tr key={index}
                                            style={{
                                                // height: 8, background: val.main_task_slno !== null ? '#EBEFEE' : val.main_task_slno === 0 ? '#EBEFEE' : 'transparent', minHeight: 5
                                            }}
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
                                                    color: val.tm_project_status === null ? '#5F093D' : val.tm_project_status === 0 ? '#5F093D'
                                                        : val.tm_project_status === 1 ? 'green' : 'transparent', minHeight: 5
                                                }}>{val.ProjectStatus}</td>
                                            <td> {val.tm_project_name || 'not given'}</td>
                                            <td> {val.dept_name || 'not given'}</td>
                                            <td> {val.sec_name || 'not given'}</td>
                                            {/* <td> {val.tm_project_duedate || 'not given'}</td> */}
                                            <td> {moment(val.tm_project_duedate).format('DD-MM-YYYY') || 'not given'}</td>
                                            <td> {val.tm_project_description || 'not given'}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </CssVarsProvider>
                </Box>
                : <Box sx={{ textAlign: 'center', m: 5, fontWeight: 700, fontSize: 30, color: '#C7C8CB', }}>  No Pjojects set under section</Box>}
        </Box>
    )
}

export default memo(ProjectMasterTable)