import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { Box, Button, CssVarsProvider, Textarea, Typography, } from '@mui/joy'
import { Paper, Tooltip } from '@mui/material'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import ProjectMasterTable from './ProjectMasterTable'
import { getDepartment } from 'src/redux/actions/Department.action'
import TmDepartmentSelect from 'src/views/CommonSelectCode/TmDepartmentSelect'
import TmDeptSectionSelect from 'src/views/CommonSelectCode/TmDeptSectionSelect'
import { useDispatch, useSelector } from 'react-redux'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import TmGoalsList from 'src/views/CommonSelectCode/TmGoalsList'
import { getGoalsList } from 'src/redux/actions/TmGoalsList.action'
import moment from 'moment'
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';

const ProjectMaster = () => {
    const history = useHistory()
    const dispatch = useDispatch();
    const [department, setDepartment] = useState(0)
    const [deptsec, setDeptSec] = useState(0)
    const [tableCount, settableCount] = useState(0)
    const [value, setvalue] = useState(0)
    const [goalz, setgoalz] = useState(0)
    let newDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    useEffect(() => {
        dispatch(getDepartment())
    }, [dispatch,])
    const id = useSelector((state) => {
        return state.LoginUserData.empid
    })
    useEffect(() => {
        dispatch(getGoalsList())
    }, [dispatch,])

    const [projectMast, setprojectMast] = useState({
        tm_project_slno: '',
        tm_project_name: '',
        tm_project_duedate: '',
        tm_project_description: '',
        tm_project_status: false,
        tm_project_cmpltedate: ''


    })
    const { tm_project_slno, tm_project_name, tm_project_duedate, tm_project_description, tm_project_status, tm_project_cmpltedate } = projectMast
    const ProjectMastUpdate = useCallback(
        (e) => {
            const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
            setprojectMast({ ...projectMast, [e.target.name]: value })
        },
        [projectMast],
    )
    const postProject = useMemo(() => {
        return {
            tm_project_name: tm_project_name,
            tm_project_dept: department === 0 ? null : department,
            tm_project_deptsec: deptsec === 0 ? null : deptsec,
            tm_project_duedate: tm_project_duedate === '' ? null : tm_project_duedate,
            tm_project_description: tm_project_description === '' ? null : tm_project_description,
            tm_project_status: tm_project_status === true ? 1 : 0,
            tm_project_cmpltedate: tm_project_cmpltedate === '' ? null : tm_project_cmpltedate,
            tm_goal_slno: goalz === 0 ? null : goalz,
            tm_project_create_user: id,

        }
    }, [tm_project_name, department, deptsec, tm_project_duedate, tm_project_description, tm_project_status, tm_project_cmpltedate, goalz, id])





    const patchProject = useMemo(() => {

        return {
            tm_project_slno: tm_project_slno,
            tm_project_name: tm_project_name,
            tm_project_dept: department === 0 ? null : department,
            tm_project_deptsec: deptsec === 0 ? null : deptsec,
            tm_project_duedate: tm_project_duedate === '' ? null : tm_project_duedate,
            tm_project_description: tm_project_description === '' ? null : tm_project_description,
            tm_project_status: tm_project_status === true ? 1 : 0,
            tm_project_cmpltedate: tm_project_status === true ? newDate : null,
            tm_goal_slno: goalz === 0 ? null : goalz,
            tm_project_edit_user: id,
        }
    }, [tm_project_slno, tm_project_name, department, deptsec, tm_project_duedate, tm_project_description, tm_project_status, goalz, newDate, id])

    const reset = useCallback(() => {
        const form = {
            tm_project_slno: '',
            tm_project_name: '',
            tm_project_duedate: '',
            tm_project_description: '',
            tm_project_status: false,
            tm_project_cmpltedate: ''
        }
        setprojectMast(form)
        setDepartment(0)
        setDeptSec(0)
        setgoalz(0)
    }, [])



    const rowSelect = useCallback((data) => {
        setvalue(1)

        const {
            tm_project_slno,
            tm_project_name,
            tm_project_dept,
            tm_project_deptsec,
            tm_project_duedate,
            tm_project_description,
            tm_project_status,
            tm_project_cmpltedate,
            tm_goal_slno
        } = data

        const frmdata = {
            tm_project_slno: tm_project_slno,
            tm_project_name: tm_project_name,
            tm_project_duedate: tm_project_duedate === null ? '' : tm_project_duedate,
            tm_project_description: tm_project_description === null ? '' : tm_project_description,
            tm_project_status: tm_project_status === 1 ? true : false,
            tm_project_cmpltedate: tm_project_cmpltedate === '' ? null : tm_project_cmpltedate,
            tm_project_edit_user: id,
        }
        setprojectMast(frmdata)
        setDepartment(tm_project_dept)
        setDeptSec(tm_project_deptsec)
        setgoalz(tm_goal_slno)


    }, [id,])
    const InsertProject = useCallback((e) => {
        e.preventDefault()
        if (tm_project_name !== '') {
            const InsertMastProject = async (postProject) => {
                const result = await axioslogin.post('/taskManagement/insertProject', postProject)

                const { message, success } = result.data
                if (success === 1) {
                    succesNotify(message)
                    settableCount(tableCount + 1)
                    reset()
                } else if (success === 0) {
                    infoNotify(message)
                } else {
                    infoNotify(message)
                }
            }
            InsertMastProject(postProject)
        } else {
            infoNotify('Please Enter Project Name')
        }
    }, [postProject, tableCount, reset, tm_project_name])

    const UpdateProject = useCallback((e) => {
        e.preventDefault()
        if (tm_project_name !== '') {
            const UpdateGoalMast = async (patchProject) => {
                const result = await axioslogin.patch('/taskManagement/updateProject', patchProject)
                const { message, success } = result.data

                if (success === 2) {
                    succesNotify(message)
                    settableCount(tableCount + 1)
                    reset()
                    setvalue(0)
                } else if (success === 0) {
                    infoNotify(message)
                } else {
                    infoNotify(message)
                }
            }
            UpdateGoalMast(patchProject)
        } else {
            infoNotify('Please Enter Project Name')
        }
    }, [patchProject, tableCount, tm_project_name, reset])







    const BackToDash = useCallback(() => {
        history.push('/Home/TaskManagementDashboard')
    }, [history])

    return (
        <Paper sx={{ width: '100%', height: '100%', boxShadow: '0px 1px 3px' }}>
            <Box sx={{ height: 35, display: 'flex', bgcolor: '#52688F' }}>
                <Box sx={{ fontWeight: 600, flex: 1, pl: 1, pt: .8, color: 'white', }}>Create Project </Box>
                <Box sx={{ mt: .5, mr: .5 }} >

                    <Tooltip title="Close" placement="bottom" >
                        <HighlightOffOutlinedIcon sx={{ color: 'white', height: 25, width: 25, cursor: 'pointer' }}
                            onClick={BackToDash}
                        />
                    </Tooltip>

                </Box>
            </Box>
            <Box sx={{ display: 'flex' }}>
                <Box sx={{ flex: 1.7 }}>
                    <Box sx={{ mt: 2, pl: 2, fontSize: 15, display: 'flex', justifyContent: 'right', mr: 1, height: 40, pt: 1.5, fontFamily: 'Georgia', }}>
                        <Typography sx={{ color: '#003B73' }}>
                            Project*&nbsp;:
                        </Typography>
                    </Box>
                    <Box sx={{ pl: 2, fontSize: 15, display: 'flex', justifyContent: 'right', mr: 1, height: 40, pt: 1, mt: 1.5, fontFamily: 'Georgia', }}>
                        <Typography sx={{ color: '#003B73' }}>
                            Goal&nbsp;:
                        </Typography>
                    </Box>
                    <Box sx={{ pl: 2, fontSize: 15, display: 'flex', justifyContent: 'right', mr: 1, height: 30, fontFamily: 'Georgia', }}>
                        <Typography sx={{ color: '#003B73' }}>
                            Department&nbsp;:
                        </Typography>
                    </Box>
                    <Box sx={{ pl: 2, fontSize: 15, display: 'flex', justifyContent: 'right', mr: 1, height: 30, fontFamily: 'Georgia', }}>
                        <Typography sx={{ color: '#003B73' }}>
                            Section&nbsp;:
                        </Typography>
                    </Box>

                    <Box sx={{ pl: 2, fontSize: 15, display: 'flex', justifyContent: 'right', mr: 1, height: 30, fontFamily: 'Georgia', }}>
                        <Typography sx={{ color: '#003B73' }}>
                            Due date&nbsp;:
                        </Typography>
                    </Box>
                    <Box sx={{ pl: 2, fontSize: 15, display: 'flex', justifyContent: 'right', mr: 1, mt: .5, height: 35, pt: .5, fontFamily: 'Georgia', }}>
                        <Typography sx={{ color: '#003B73' }}>
                            Description&nbsp;:
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{ flex: 2 }}>
                    <Box sx={{ mt: .5, pt: 1 }}>
                        <CssVarsProvider>
                            <Textarea
                                type="text"
                                size="sm"
                                placeholder="Project"
                                variant="outlined"
                                name="tm_project_name"
                                value={tm_project_name}
                                minRows={2}
                                maxRows={2}
                                onChange={(e) => ProjectMastUpdate(e)}
                                sx={{ fontSize: 15, color: '#05445E' }}
                            ></Textarea>
                        </CssVarsProvider>
                    </Box>
                    <Box sx={{ mt: .2 }}>
                        <TmGoalsList
                            goalz={goalz}
                            setgoalz={setgoalz} />
                    </Box>
                    <Box sx={{ mt: .2 }}>
                        <TmDepartmentSelect
                            department={department}
                            setDepartment={setDepartment} />
                    </Box>
                    <Box sx={{ mt: .2 }}>
                        <TmDeptSectionSelect
                            deptsec={deptsec}
                            setDeptSec={setDeptSec} />
                    </Box>
                    <Box sx={{ pt: .3 }}>
                        <TextFieldCustom
                            type="datetime-local"
                            size="sm"
                            name="tm_project_duedate"
                            value={tm_project_duedate}
                            onchange={ProjectMastUpdate}
                        ></TextFieldCustom>
                    </Box>
                    <Box sx={{ mt: .3 }}>
                        <CssVarsProvider>
                            <Textarea
                                type="text"
                                size="sm"
                                placeholder="type here..."
                                variant="outlined"
                                minRows={3}
                                maxRows={4}
                                name="tm_project_description"
                                value={tm_project_description}
                                onChange={(e) => ProjectMastUpdate(e)}
                            >
                            </Textarea>
                        </CssVarsProvider>
                    </Box>
                    {value === 1 ?
                        <Box sx={{ flex: 1, display: 'flex', mt: .5 }}>
                            <Box sx={{ pt: .5 }}>
                                <CusCheckBox

                                    color="primary"
                                    size="md"
                                    name="tm_project_status"
                                    value={tm_project_status}
                                    checked={tm_project_status}
                                    onCheked={ProjectMastUpdate}
                                ></CusCheckBox>
                            </Box>
                            <Box sx={{ pl: 1, color: '#000C66', fontFamily: 'Georgia' }}>Project Completed</Box>
                        </Box>
                        : null}
                    <Box sx={{ pt: 1, margin: 'auto', width: '30%' }}>
                        <CssVarsProvider>
                            {value === 0 ?
                                <Button variant="outlined"
                                    onClick={InsertProject}
                                    sx={{ fontSize: 16, width: 150 }} >Create Project</Button> :
                                value === 1 ? <Button variant="outlined"
                                    onClick={UpdateProject}
                                    sx={{ fontSize: 16, width: 150 }} >Update Project</Button> : null}
                        </CssVarsProvider>
                    </Box>

                </Box>
                <Box sx={{ flex: 1.5 }}>

                </Box>
            </Box>
            <Box>
                <ProjectMasterTable settableCount={settableCount} tableCount={tableCount} rowSelect={rowSelect} />
            </Box>
        </Paper>
    )
}

export default memo(ProjectMaster)