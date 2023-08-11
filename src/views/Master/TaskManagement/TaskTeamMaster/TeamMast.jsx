import React from 'react'
import DepartmentSelect from 'src/views/CommonSelectCode/DepartmentSelect'
import CardMaster from 'src/views/Components/CardMaster'
import { Box, Grid } from '@mui/material'
import { useState, memo, useMemo, useCallback } from 'react'
import DeptSecUnderDept from 'src/views/CommonSelectCode/DeptSecUnderDept'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import DeptWiseEmpSelect from 'src/views/CommonSelectCode/DeptWiseEmpSelect'
import TeamMastTable from './TeamMastTable'


const TeamMast = () => {
    const history = useHistory();

    const [teamdept, setTeamdept] = useState(0)
    const [teamMast, setTeamMast] = useState('')
    const [dept, setdept] = useState(0)
    const [deptsec, setDeptsec] = useState(0)
    const [employe, setEmployee] = useState([])
    const [status, setStatus] = useState(false)
    const [count, setCount] = useState(0)
    const [value, setValue] = useState(0)
    const [slno, setSlno] = useState(0)
    // Get login user emp_id
    const id = useSelector((state) => {
        return state.LoginUserData.empid
    })

    const updateTeamMast = (e) => {
        setTeamMast(e.target.value)
    }

    const updateStatus = (e) => {
        if (e.target.checked === true) {
            setStatus(true)
        }
        else {
            setStatus(false)
        }
    }
    const reset = () => {
        setTeamdept(0)
        setTeamMast('')
        setdept(0)
        setDeptsec(0)
        setEmployee([])
        setStatus(false)
        setCount(0)
        setValue(0)
        setSlno(0)
    }

    //data for edit 
    const rowSelect = useCallback((params) => {
        setValue(1)
        const data = params.api.getSelectedRows()
        const { teammast_slno, teammast_dept, team_dept, team_deptsec, teammast_status, team_emp,
            team_name
        } = data[0]

        setTeamdept(teammast_dept)
        setTeamMast(team_name)
        setdept(team_dept)
        setDeptsec(team_deptsec)
        const empNames = JSON.parse(team_emp)
        setEmployee(empNames)
        setStatus(teammast_status === 1 ? true : false)
        setSlno(teammast_slno)
    }, [])


    const patchData = useMemo(() => {
        return {
            teammast_dept: teamdept,
            team_name: teamMast,
            team_dept: dept !== 0 ? dept : null,
            team_deptsec: deptsec !== 0 ? deptsec : null,
            team_emp: employe !== [] ? employe : null,
            teammast_status: status === true ? 1 : 0,
            edit_user: id,
            teammast_slno: slno
        }
    }, [teamdept, teamMast, dept, deptsec, employe, status, id, slno])


    const postData = useMemo(() => {
        return {
            teammast_dept: teamdept,
            team_name: teamMast,
            team_dept: dept !== 0 ? dept : null,
            team_deptsec: deptsec !== 0 ? deptsec : null,
            team_emp: employe !== [] ? employe : null,
            teammast_status: status === true ? 1 : 0,
            create_user: id
        }
    }, [teamdept, teamMast, dept, deptsec, employe, status, id])


    const Submitfunction = useCallback((e) => {

        e.preventDefault();
        const insertfun = async (postData) => {
            const result = await axioslogin.post('/teammaster/insert', postData);
            const { message, success } = result.data;
            if (success === 1) {
                setCount(count + 1)
                succesNotify(message)
                reset()
            } else if (success === 0) {
                infoNotify(message);
            }
            else {
                infoNotify(message)
            }
        }

        const updatefun = async (patchData) => {
            const result = await axioslogin.patch('/teammaster/update', patchData);
            const { message, success } = result.data;
            if (success === 1) {
                setCount(count + 1)
                succesNotify(message)
                reset()
            } else if (success === 0) {
                infoNotify(message);
            }
            else {
                infoNotify(message)
            }
        }
        if (value === 0) {
            insertfun(postData)
        } else {
            updatefun(patchData)
        }
    }, [postData, patchData, count, value])

    //back to home
    const backtoSetting = useCallback(() => {
        history.push('/Home/Settings')
    }, [history])
    //referesh func
    const refreshWindow = useCallback(() => {
        reset();
    }, [])


    return (
        <CardMaster
            title="Team Master"
            submit={Submitfunction}
            refresh={refreshWindow}
            close={backtoSetting}
        >

            <Box sx={{ pl: 2, pt: 2, pb: 1, pr: 1 }}>
                <Grid container spacing={1}  >
                    <Grid item xl={3} lg={3}  >
                        <Grid container spacing={1} sx={{ pb: 1 }}>
                            <Grid item xl={12} lg={12}  >
                                <DepartmentSelect value={teamdept} setValue={setTeamdept} />
                            </Grid>

                            <Grid item xl={12} lg={12}  >
                                <TextFieldCustom
                                    placeholder="Team Name"
                                    type="text"
                                    size="sm"
                                    name="teamMast"
                                    value={teamMast}
                                    onchange={updateTeamMast}
                                />
                            </Grid>
                            <Grid item xl={12} lg={12}  >
                                <DepartmentSelect value={dept} setValue={setdept} />
                            </Grid>
                            <Grid item xl={12} lg={12}  >
                                <DeptSecUnderDept value={deptsec} setValue={setDeptsec} dept={dept} />
                            </Grid>
                            <Grid item xl={12} lg={12}  >
                                <DeptWiseEmpSelect personName={employe} setPersonName={setEmployee} empdeptwise={deptsec} />
                            </Grid>
                            <Grid item lg={2} xl={2} >
                                <CusCheckBox
                                    label="Status"
                                    color="primary"
                                    size="md"
                                    name="status"
                                    variant="outlined"
                                    value={status}
                                    checked={status}
                                    onCheked={updateStatus}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xl={9} lg={9}  >
                        <TeamMastTable count={count} rowSelect={rowSelect} />
                    </Grid>
                </Grid>
            </Box>
        </CardMaster>
    )
}

export default memo(TeamMast)