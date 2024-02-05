import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { Box, Button, CssVarsProvider, Textarea, Typography, Tooltip } from '@mui/joy'
import { Paper } from '@mui/material'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import CusIconButton from 'src/views/Components/CusIconButton'
import CloseIcon from '@mui/icons-material/Close';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import ProjectMastDeptTable from './ProjectMastDeptTable'
import { useDispatch, useSelector } from 'react-redux'
import { getDepartSecemployee } from 'src/redux/actions/EmpNameDeptSect.action'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import { getGoalsList } from 'src/redux/actions/TmGoalsList.action'
import TmGoalsList from 'src/views/CommonSelectCode/TmGoalsList'

const ProjectMasterDept = () => {
    const history = useHistory()
    const dispatch = useDispatch();
    const [value, setvalue] = useState(0)
    const [goalz, setgoalz] = useState(0)


    const [tableCount, settableCount] = useState(0)

    const id = useSelector((state) => {
        return state.LoginUserData.empid
    })
    const secName = useSelector((state) => {

        return state.LoginUserData.empdeptsec
    })
    const empdept = useSelector((state) => {
        return state.LoginUserData.empdept
    })
    const empsecid = useSelector((state) => {
        return state.LoginUserData.empsecid
    })
    useEffect(() => {
        dispatch(getGoalsList())
    }, [dispatch,])

    useEffect(() => {
        dispatch(getDepartSecemployee(empsecid))
    }, [dispatch, empsecid])
    const BackToDash = useCallback(() => {
        history.push('/Home/TaskManagementDashboard')
    }, [history])

    const [projectMast, setprojectMast] = useState({
        tm_project_slno: '',
        tm_project_name: '',
        tm_project_duedate: '',
        tm_project_description: '',
        tm_project_status: false,

    })
    const { tm_project_slno, tm_project_name, tm_project_duedate, tm_project_description, tm_project_status } = projectMast
    const ProjectMastUpdate = useCallback(
        (e) => {
            const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
            setprojectMast({ ...projectMast, [e.target.name]: value })
        },
        [projectMast],
    )

    const reset = () => {
        const form = {
            tm_project_slno: '',
            tm_project_name: '',
            tm_project_duedate: '',
            tm_project_description: ''
        }
        setprojectMast(form)
        setgoalz(0)

    }
    // const ChangeDueDate = useCallback((e) => {
    //     settm_project_duedate(e.target.value)
    // }, [])
    const rowSelect = useCallback((data) => {
        setvalue(1)
        const {
            tm_project_slno,
            tm_project_name,
            tm_project_duedate,
            tm_project_description,
            tm_project_status,
            tm_goal_slno
        } = data

        const frmdata = {
            tm_project_slno: tm_project_slno,
            tm_project_name: tm_project_name,
            tm_project_dept: empdept === 0 ? null : empdept,
            tm_project_deptsec: empsecid === 0 ? null : empsecid,
            tm_project_duedate: tm_project_duedate === '' ? null : tm_project_duedate,
            tm_project_description: tm_project_description === '' ? null : tm_project_description,
            tm_project_status: tm_project_status === 1 ? true : false,
            tm_project_edit_user: id,

        }
        setprojectMast(frmdata)
        setgoalz(tm_goal_slno)
    }, [empdept, empsecid, id])

    const postProject = useMemo(() => {
        return {
            tm_project_name: tm_project_name,
            tm_project_dept: empdept === 0 ? null : empdept,
            tm_project_deptsec: empsecid === 0 ? null : empsecid,
            tm_project_duedate: tm_project_duedate === '' ? null : tm_project_duedate,
            tm_project_description: tm_project_description === '' ? null : tm_project_description,
            tm_project_status: tm_project_status === true ? 1 : 0,
            tm_goal_slno: goalz === 0 ? null : goalz,
            tm_project_create_user: id,

        }
    }, [tm_project_name, empdept, empsecid, tm_project_duedate, tm_project_description, tm_project_status, goalz, id])
    const patchProject = useMemo(() => {

        return {
            tm_project_slno: tm_project_slno,
            tm_project_name: tm_project_name,
            tm_project_dept: empdept === 0 ? null : empdept,
            tm_project_deptsec: empsecid === 0 ? null : empsecid,
            tm_project_duedate: tm_project_duedate === '' ? null : tm_project_duedate,
            tm_project_description: tm_project_description === '' ? null : tm_project_description,
            tm_project_status: tm_project_status === true ? 1 : 0,
            tm_goal_slno: goalz === 0 ? null : goalz,
            tm_project_create_user: id,
        }
    }, [tm_project_slno, tm_project_name, empdept, empsecid, tm_project_duedate, tm_project_description, tm_project_status, goalz, id])
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
    }, [postProject, tm_project_name, tableCount])
    const UpdateProject = useCallback((e) => {
        e.preventDefault()
        if (tm_project_name !== '') {
            const UpdateMastProject = async (patchProject) => {
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
            UpdateMastProject(patchProject)
        } else {
            infoNotify('Please Enter Project Name')
        }
    }, [patchProject, tableCount, tm_project_name])

    return (

        <Paper sx={{ width: '100%', bgcolor: '#F2F1F0', height: '100%' }}>
            <Box sx={{ height: 35, backgroundColor: '#D9E4EC', display: 'flex' }}>
                <Box sx={{ fontWeight: 600, flex: 1, pl: 1, pt: .5, color: '#385E72', }}>Create Project</Box>
                <Box><CusIconButton size="sm" variant="outlined" color="primary" >
                    <Tooltip title="Close" placement="bottom" >
                        <CloseIcon fontSize='small'
                            onClick={BackToDash}
                        />
                    </Tooltip>
                </CusIconButton></Box>
            </Box>
            <Box sx={{ display: 'flex' }}>
                <Box sx={{ flex: 1.5 }}>
                    <Box sx={{ mt: 2, pl: 2, fontSize: 15, display: 'flex', justifyContent: 'right', mr: 1, height: 40, pt: 1.5, fontFamily: 'Georgia', }}>
                        <Typography sx={{ color: '#003B73' }}>
                            Project*&nbsp;:
                        </Typography>
                    </Box>
                    <Box sx={{ pl: 2, fontSize: 15, display: 'flex', justifyContent: 'right', mr: 1, height: 30, pt: .8, mt: 1.5, fontFamily: 'Georgia', }}>
                        <Typography sx={{ color: '#003B73' }}>
                            Goal&nbsp;:
                        </Typography>
                    </Box>
                    <Box sx={{ pl: 2, fontSize: 15, display: 'flex', justifyContent: 'right', mr: 1, mt: .8, height: 30, pt: .5, fontFamily: 'Georgia', }}>
                        <Typography sx={{ color: '#003B73' }}>
                            Department Section&nbsp;:
                        </Typography>
                    </Box>
                    {/* <Box sx={{ pl: 2, fontSize: 15, display: 'flex', justifyContent: 'right', mr: 1, mt: .5, height: 30, pt: .5, fontFamily: 'Georgia', }}>
                        <Typography sx={{ color: '#003B73' }}>
                            Section`
                        </Typography>
                    </Box> */}

                    <Box sx={{ pl: 2, fontSize: 15, display: 'flex', justifyContent: 'right', mr: 1, mt: .8, height: 30, pt: .8, fontFamily: 'Georgia', }}>
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
                                sx={{ fontSize: 15, color: '#05445E', }}
                            ></Textarea>
                        </CssVarsProvider>
                    </Box>
                    <Box sx={{ mt: .2 }}>
                        <TmGoalsList
                            goalz={goalz}
                            setgoalz={setgoalz} />
                    </Box>
                    <Box sx={{ mt: .2 }}>
                        <TextFieldCustom
                            type="text"
                            name="secName"
                            value={secName}
                            disabled>
                        </TextFieldCustom>
                    </Box>
                    {/* <Box sx={{ mt: .2 }}>
                        <TextFieldCustom
                            type="text"
                            size="sm"
                            placeholder="sec"
                            variant="outlined">

                        </TextFieldCustom>
                    </Box> */}
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
                <Box sx={{ flex: 2 }}>

                </Box>
            </Box>
            <Box>
                <ProjectMastDeptTable tableCount={tableCount} settableCount={settableCount} rowSelect={rowSelect} />
            </Box>
        </Paper>
    )
}


export default memo(ProjectMasterDept)