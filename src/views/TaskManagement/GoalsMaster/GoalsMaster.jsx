import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { Box, Button, CssVarsProvider, Textarea, Typography, Tooltip } from '@mui/joy'
import { Paper } from '@mui/material'
import GoalsMastTable from './GoalsMastTable'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import CusIconButton from 'src/views/Components/CusIconButton'
import CloseIcon from '@mui/icons-material/Close';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { useSelector, useDispatch } from 'react-redux'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import TmDepartmentSelect from 'src/views/CommonSelectCode/TmDepartmentSelect'
import TmDeptSectionSelect from 'src/views/CommonSelectCode/TmDeptSectionSelect'
import { getDepartment } from 'src/redux/actions/Department.action'
import CusCheckBox from 'src/views/Components/CusCheckBox'


const GoalsMaster = () => {
    const [department, setDepartment] = useState(0)
    const [deptsec, setDeptSec] = useState(0)
    const [tableCount, setTableCount] = useState(0)
    const history = useHistory()
    const [value, setvalue] = useState(0)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDepartment())
    }, [dispatch,])

    const id = useSelector((state) => {
        return state.LoginUserData.empid
    })

    const [goalMast, setgoalMast] = useState({
        tm_goals_slno: '',
        tm_goal_name: '',
        tm_goal_duedate: '',
        tm_goal_fromdate: '',
        tm_goal_description: '',
        tm_goal_status: false,
    })
    const { tm_goals_slno, tm_goal_name, tm_goal_duedate, tm_goal_fromdate, tm_goal_description, tm_goal_status } = goalMast

    const GoalsMastUpdate = useCallback(
        (e) => {
            const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
            setgoalMast({ ...goalMast, [e.target.name]: value })
        },
        [goalMast],
    )
    const postGoal = useMemo(() => {
        return {
            tm_goal_name: tm_goal_name,
            tm_goal_dept: department === 0 ? null : department,
            tm_goal_deptsec: deptsec === 0 ? null : deptsec,
            tm_goal_fromdate: tm_goal_fromdate === '' ? null : tm_goal_fromdate,
            tm_goal_duedate: tm_goal_duedate === '' ? null : tm_goal_duedate,
            tm_goal_description: tm_goal_description === '' ? null : tm_goal_description,
            tm_goal_status: tm_goal_status === true ? 1 : 0,
            tm_goal_createuser: id,
        }
    }, [tm_goal_name, department, deptsec, tm_goal_duedate, tm_goal_fromdate, tm_goal_description, tm_goal_status, id])

    const patchGoal = useMemo(() => {
        return {
            tm_goals_slno: tm_goals_slno,
            tm_goal_name: tm_goal_name === '' ? null : tm_goal_name,
            tm_goal_dept: department === 0 ? null : department,
            tm_goal_deptsec: deptsec === 0 ? null : deptsec,
            tm_goal_fromdate: tm_goal_fromdate === '' ? null : tm_goal_fromdate,
            tm_goal_duedate: tm_goal_duedate === '' ? null : tm_goal_duedate,
            tm_goal_description: tm_goal_description === '' ? null : tm_goal_description,
            tm_goal_status: tm_goal_status === true ? 1 : 0,
            tm_goal_edituser: id,
        }
    }, [tm_goals_slno, tm_goal_name, department, deptsec, tm_goal_duedate, tm_goal_fromdate, tm_goal_description, tm_goal_status, id])

    const reset = () => {
        const form = {
            tm_goals_slno: '',
            tm_goal_name: '',
            tm_goal_fromdate: '',
            tm_goal_duedate: '',
            tm_goal_description: '',
        }
        setgoalMast(form)
        setDepartment(0)
        setDeptSec(0)
    }

    const rowSelect = useCallback((data) => {
        setvalue(1)
        const {
            tm_goals_slno,
            tm_goal_name,
            tm_goal_dept,
            tm_goal_deptsec,
            tm_goal_fromdate,
            tm_goal_duedate,
            tm_goal_description,
            tm_goal_status
        } = data

        const frmdata = {
            tm_goals_slno: tm_goals_slno,
            tm_goal_name: tm_goal_name,
            tm_goal_fromdate: tm_goal_fromdate === '' ? null : tm_goal_fromdate,
            tm_goal_duedate: tm_goal_duedate === '' ? null : tm_goal_duedate,
            tm_goal_description: tm_goal_description === '' ? null : tm_goal_description,
            tm_goal_status: tm_goal_status === 1 ? true : false,
            tm_goal_edituser: id,
        }
        setgoalMast(frmdata)
        setDepartment(tm_goal_dept)
        setDeptSec(tm_goal_deptsec)
    }, [setgoalMast, setDepartment, setDeptSec, id])

    const InsertGoals = useCallback((e) => {
        e.preventDefault()
        if (tm_goal_name !== '') {
            const InsertMastGoal = async (postGoal) => {
                const result = await axioslogin.post('/taskManagement/insertDeptGoal', postGoal)
                const { message, success } = result.data

                if (success === 1) {
                    succesNotify(message)
                    setTableCount(tableCount + 1)
                    reset()
                } else if (success === 0) {
                    infoNotify(message)
                } else {
                    infoNotify(message)
                }
            }
            InsertMastGoal(postGoal)
        } else {
            infoNotify('Please Enter Goal Name')
        }
    }, [postGoal, tm_goal_name, tableCount])

    const UpdateGoals = useCallback((e) => {
        e.preventDefault()
        if (tm_goal_name !== '') {
            const UpdateMastGoal = async (patchGoal) => {
                const result = await axioslogin.patch('/taskManagement/updateDeptGoal', patchGoal)
                const { message, success } = result.data
                if (success === 2) {
                    succesNotify(message)
                    setTableCount(tableCount + 1)
                    reset()
                    setvalue(0)
                } else if (success === 0) {
                    infoNotify(message)
                } else {
                    infoNotify(message)
                }
            }
            UpdateMastGoal(patchGoal)
        } else {
            infoNotify('Please Enter Goal Name')
        }
    }, [patchGoal, tm_goal_name, tableCount])

    const BackToDash = useCallback(() => {
        history.push('/Home/TaskManagementDashboard')
    }, [history])

    return (
        <Paper sx={{ height: '100%', width: '100%', bgcolor: '#F2F1F0', }}>
            <Box sx={{ height: 35, backgroundColor: '#E2E8EF', borderBottom: .1, borderColor: 'lightgrey', display: 'flex' }}>
                <Box sx={{ fontWeight: 600, flex: 1, pl: 1, pt: .5, color: '#385E72', }}>Create Goal</Box>
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
                            Goal*&nbsp;:
                        </Typography>
                    </Box>
                    <Box sx={{ pl: 2, fontSize: 15, display: 'flex', justifyContent: 'right', mr: 1, mt: 2.5, height: 30, fontFamily: 'Georgia', }}>
                        <Typography sx={{ color: '#003B73' }}>
                            Department&nbsp;:
                        </Typography>
                    </Box>
                    <Box sx={{ pl: 2, fontSize: 15, display: 'flex', justifyContent: 'right', mr: 1, mt: .2, height: 30, fontFamily: 'Georgia', }}>
                        <Typography sx={{ color: '#003B73' }}>
                            Section&nbsp;:
                        </Typography>
                    </Box>
                    <Box sx={{ pl: 2, fontSize: 15, display: 'flex', justifyContent: 'right', mr: 1, mt: .5, height: 30, fontFamily: 'Georgia', }}>
                        <Typography sx={{ color: '#003B73' }}>
                            From date&nbsp;:
                        </Typography>
                    </Box>
                    <Box sx={{ pl: 2, fontSize: 15, display: 'flex', justifyContent: 'right', mr: 1, mt: .5, height: 30, fontFamily: 'Georgia', }}>
                        <Typography sx={{ color: '#003B73' }}>
                            Due date&nbsp;:
                        </Typography>
                    </Box>
                    <Box sx={{ pl: 2, fontSize: 15, display: 'flex', justifyContent: 'right', mr: 1, mt: .5, height: 35, fontFamily: 'Georgia', }}>
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
                                placeholder="Goal"
                                variant="outlined"
                                name="tm_goal_name"
                                value={tm_goal_name}
                                minRows={2}
                                maxRows={2}
                                onChange={(e) => GoalsMastUpdate(e)}
                                sx={{ fontSize: 15, color: '#05445E', }}
                            ></Textarea>
                        </CssVarsProvider>
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
                            name="tm_goal_fromdate"
                            value={tm_goal_fromdate}
                            onchange={GoalsMastUpdate}
                        ></TextFieldCustom>
                    </Box>
                    <Box sx={{ pt: .3 }}>
                        <TextFieldCustom
                            type="datetime-local"
                            size="sm"
                            name="tm_goal_duedate"
                            value={tm_goal_duedate}
                            onchange={GoalsMastUpdate}
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
                                name="tm_goal_description"
                                value={tm_goal_description}
                                onChange={(e) => GoalsMastUpdate(e)}
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
                                    name="tm_goal_status"
                                    value={tm_goal_status}
                                    checked={tm_goal_status}
                                    onCheked={GoalsMastUpdate}
                                ></CusCheckBox>
                            </Box>
                            <Box sx={{ pl: 1, color: '#000C66', fontFamily: 'Georgia' }}>Goal Completed</Box>
                        </Box>
                        : null}
                    <Box sx={{ pt: 1, margin: 'auto', width: '30%' }}>
                        <CssVarsProvider>
                            {value === 0 ?
                                <Button variant="outlined"
                                    onClick={InsertGoals}
                                    sx={{ fontSize: 16, width: 150 }} >Create Goal</Button> :

                                value === 1 ? <Button variant="outlined"
                                    onClick={UpdateGoals}
                                    sx={{ fontSize: 16, width: 150 }} >Update Goal</Button> : null}
                        </CssVarsProvider>
                    </Box>
                </Box>
                <Box sx={{ flex: 2 }}>
                </Box>
            </Box>
            <Box>
                <GoalsMastTable tableCount={tableCount} setTableCount={setTableCount} rowSelect={rowSelect} />
            </Box>
        </Paper>
    )
}

export default memo(GoalsMaster)