import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { Box, Button, CssVarsProvider, Textarea, Typography, Tooltip } from '@mui/joy'
import { Paper } from '@mui/material'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import CusIconButton from 'src/views/Components/CusIconButton'
import CloseIcon from '@mui/icons-material/Close';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import GoalsMasterTableDept from './GoalsMasterTableDept'
import { useDispatch, useSelector } from 'react-redux'
import { getDepartSecemployee } from 'src/redux/actions/EmpNameDeptSect.action'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import moment from 'moment'

const GoalsMasterDept = () => {
    const history = useHistory()
    const dispatch = useDispatch();
    const [value, setvalue] = useState(0)
    const [tableCount, settableCount] = useState(0)
    let newDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
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
        dispatch(getDepartSecemployee(empsecid))
    }, [dispatch, empsecid])
    const BackToDash = useCallback(() => {
        history.push('/Home/TaskManagementDashboard')
    }, [history])

    const [goalMast, setgoalMast] = useState({
        tm_goals_slno: '',
        tm_goal_name: '',
        tm_goal_fromdate: '',
        tm_goal_duedate: '',
        tm_goal_description: '',
        tm_goal_status: false,
        tm_goal_cmpledate: '',
    })
    const { tm_goals_slno, tm_goal_name, tm_goal_duedate, tm_goal_fromdate, tm_goal_description, tm_goal_status, tm_goal_cmpledate } = goalMast
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
            tm_goal_dept: empdept === 0 ? null : empdept,
            tm_goal_deptsec: empsecid === 0 ? null : empsecid,
            tm_goal_fromdate: tm_goal_fromdate === '' ? null : tm_goal_fromdate,
            tm_goal_duedate: tm_goal_duedate === '' ? null : tm_goal_duedate,
            tm_goal_description: tm_goal_description === '' ? null : tm_goal_description,
            tm_goal_cmpledate: tm_goal_cmpledate === '' ? null : tm_goal_cmpledate,
            tm_goal_status: tm_goal_status === true ? 1 : 0,
            tm_goal_createuser: id,
        }
    }, [tm_goal_name, empdept, empsecid, tm_goal_duedate, tm_goal_fromdate, tm_goal_description, tm_goal_status, tm_goal_cmpledate, id])

    const patchGoal = useMemo(() => {
        return {
            tm_goals_slno: tm_goals_slno,
            tm_goal_name: tm_goal_name === '' ? null : tm_goal_name,
            tm_goal_dept: empdept === 0 ? null : empdept,
            tm_goal_deptsec: empsecid === 0 ? null : empsecid,
            tm_goal_fromdate: tm_goal_fromdate === '' ? null : tm_goal_fromdate,
            tm_goal_duedate: tm_goal_duedate === '' ? null : tm_goal_duedate,
            tm_goal_description: tm_goal_description === '' ? null : tm_goal_description,
            tm_goal_cmpledate: tm_goal_status === true ? newDate : null,
            tm_goal_status: tm_goal_status === true ? 1 : 0,
            tm_goal_edituser: id,
        }
    }, [tm_goals_slno, tm_goal_name, empdept, empsecid, tm_goal_duedate, tm_goal_fromdate, tm_goal_description, tm_goal_status, newDate, id])

    const reset = () => {
        const form = {
            tm_goals_slno: '',
            tm_goal_name: '',
            tm_goal_fromdate: '',
            tm_goal_duedate: '',
            tm_goal_description: '',
            tm_goal_cmpledate: ''
        }
        setgoalMast(form)
    }
    const rowSelect = useCallback((data) => {
        setvalue(1)
        const {
            tm_goals_slno,
            tm_goal_name,
            tm_goal_fromdate,
            tm_goal_duedate,
            tm_goal_description,
            tm_goal_cmpledate,
            tm_goal_status
        } = data

        const frmdata = {
            tm_goals_slno: tm_goals_slno,
            tm_goal_name: tm_goal_name,
            tm_goal_dept: empdept === 0 ? null : empdept,
            tm_goal_deptsec: empsecid === 0 ? null : empsecid,
            tm_goal_fromdate: tm_goal_fromdate === '' ? null : tm_goal_fromdate,
            tm_goal_duedate: tm_goal_duedate === '' ? null : tm_goal_duedate,
            tm_goal_description: tm_goal_description === '' ? null : tm_goal_description,
            tm_goal_status: tm_goal_status === 1 ? true : false,
            tm_goal_cmpledate: tm_goal_cmpledate === '' ? null : tm_goal_cmpledate,
            tm_goal_edituser: id,
        }
        setgoalMast(frmdata)
    }, [empdept, empsecid, id])

    const InsertGoals = useCallback((e) => {
        e.preventDefault()
        if (tm_goal_name !== '') {
            const InsertMastGoal = async (postGoal) => {
                const result = await axioslogin.post('/taskManagement/insertDeptGoal', postGoal)

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
            InsertMastGoal(postGoal)
        } else {
            infoNotify('Please Enter Project Name')
        }
    }, [postGoal, tableCount, tm_goal_name])

    const UpdateGoals = useCallback((e) => {
        e.preventDefault()
        if (tm_goal_name !== '') {
            const UpdateMastGoal = async (patchGoal) => {
                const result = await axioslogin.patch('/taskManagement/updateDeptGoal', patchGoal)
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
            UpdateMastGoal(patchGoal)
        } else {
            infoNotify('Please Enter Project Name')
        }
    }, [patchGoal, tableCount, tm_goal_name])

    return (
        <Paper sx={{ height: '100%', width: '100%', bgcolor: '#F2F1F0', }}>
            <Box sx={{ height: 35, backgroundColor: '#D9E4EC', display: 'flex' }}>
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
                    <Box sx={{ pl: 2, fontSize: 15, display: 'flex', justifyContent: 'right', mr: 1, mt: 2.5, height: 30, pt: .5, fontFamily: 'Georgia', }}>
                        <Typography sx={{ color: '#003B73' }}>
                            Department Section&nbsp;:
                        </Typography>
                    </Box>
                    <Box sx={{ pl: 2, fontSize: 15, display: 'flex', justifyContent: 'right', mr: 1, mt: .5, height: 30, pt: .5, fontFamily: 'Georgia', }}>
                        <Typography sx={{ color: '#003B73' }}>
                            From date&nbsp;:
                        </Typography>
                    </Box>
                    <Box sx={{ pl: 2, fontSize: 15, display: 'flex', justifyContent: 'right', mr: 1, mt: .5, height: 30, pt: .5, fontFamily: 'Georgia', }}>
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
                        <TextFieldCustom
                            type="text"
                            name="secName"
                            value={secName}
                            disabled>
                        </TextFieldCustom>
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
                <GoalsMasterTableDept tableCount={tableCount} settableCount={settableCount} rowSelect={rowSelect} />
            </Box>
        </Paper>
    )
}

export default memo(GoalsMasterDept)