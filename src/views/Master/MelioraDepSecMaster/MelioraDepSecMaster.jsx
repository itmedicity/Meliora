import { Box } from '@mui/joy'
import { Grid } from '@mui/material'
import React, { memo, useCallback, useMemo, useState } from 'react'
import CardMaster from 'src/views/Components/CardMaster'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import MeliDeptSectionMastTable from './MeliDeptSectionMastTable'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import { useNavigate } from 'react-router-dom'
import MelioraDepartmentSelect from 'src/views/CommonSelectCode/MelioraDepartmentSelect'
import { useSelector } from 'react-redux'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import { useQueryClient } from '@tanstack/react-query'
import SelectOraOutlet from 'src/views/CommonSelectCode/SelectOraOutlet'

const MelioraDepSecMaster = () => {
    const [secname, updatesecName] = useState('')
    const [secstatus, setsecStatus] = useState(false)
    const history = useNavigate()
    const [value, setValue] = useState(0)
    const [SecID, setSecId] = useState(0)
    const queryClient = useQueryClient()
    const [outlet, setOutlet] = useState(0)

    const [department, setDepartment] = useState(0)
    const id = useSelector(state => {
        return state.LoginUserData.empid

    })
    const updatesecStatus = useCallback(e => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        setsecStatus(value)
    }, [])

    const [deptsubtype, setdeptsubtype] = useState({
        general: true,
        ot: false,
        icu: false,
        er: false
    })
    //destructuring
    const { general, ot, icu, er } = deptsubtype
    const updateSectionStatus = async e => {
        const ob1 = {
            general: false,
            ot: false,
            icu: false,
            er: false
        }
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        setdeptsubtype({ ...ob1, [e.target.name]: value })
    }
    const updatesecNames = useCallback(e => {
        const value = e.target.value
        updatesecName(value)
    }, [])

    const [levelOneStatus, setLevelOne] = useState(false)
    const updateLevelOne = useCallback(e => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        setLevelOne(value)
    }, [])
    const [levelTwoStatus, setLevelTwoStatus] = useState(false)
    const updateLevelTwo = useCallback(e => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        setLevelTwoStatus(value)
    }, [])
    const rowSelect = useCallback(params => {
        setValue(1)
        const data = params.api.getSelectedRows()
        const { mel_DepId, level_one, level_two, ou_code, dept_sub_sect, status, mel_dep_sec_name, mel_sec_id } = data[0]

        updatesecName(mel_dep_sec_name)
        setDepartment(mel_DepId)
        setsecStatus(status === 1 ? true : false)
        setSecId(mel_sec_id)
        setLevelOne(level_one === 1 ? true : false)
        setLevelTwoStatus(level_two === 1 ? true : false)
        setOutlet(ou_code)
        const checkboxdata = {
            general: dept_sub_sect === 1 ? true : false,
            ot: dept_sub_sect === 2 ? true : false,
            icu: dept_sub_sect === 3 ? true : false,
            er: dept_sub_sect === 4 ? true : false
        }
        setdeptsubtype(checkboxdata)


    }, [])


    const postdata = useMemo(() => {
        return {
            deptSec_name: secname,
            deptSec_status: secstatus === true ? 1 : 0,
            create_user: id,
            dept_id: department,
            dept_sub_sect: general === true ? 1 : ot === true ? 2 : icu === true ? 3 : er === true ? 4 : 0,
            level_one: levelOneStatus,
            level_two: levelTwoStatus,
            ou_code: outlet !== 0 ? outlet : null
        }
    }, [secname, secstatus, department, id, general, ot, icu, er, levelOneStatus, levelTwoStatus, outlet])

    //data for update
    const patchdata = useMemo(() => {
        return {
            deptSec_name: secname,
            deptSec_status: secstatus === true ? 1 : 0,
            edit_user: id,
            dept_id: department,
            SecId: SecID,
            dept_sub_sect: general === true ? 1 : ot === true ? 2 : icu === true ? 3 : er === true ? 4 : 0,
            level_one: levelOneStatus,
            level_two: levelTwoStatus,
            ou_code: outlet !== 0 ? outlet : null
        }
    }, [secname, secstatus, id, department, SecID, general, ot, icu, er, levelOneStatus, outlet])
    const reset = useCallback(() => {
        const resetcheckbox = {
            general: true,
            ot: false,
            icu: false,
            er: false
        }
        setDepartment(0)
        setOutlet(0)
        setdeptsubtype(resetcheckbox)
        setsecStatus(false)
        updatesecName('')
        setLevelOne(false)
        setLevelTwoStatus(false)
    }, [setdeptsubtype])


    const submitDepartsection = useCallback(() => {
        /*** * insert function for use call back     */
        const InsertFun = async postdata => {
            const result = await axioslogin.post('/melioraDepMaster/deptSecmaster', postdata)
            const { message, success } = result.data
            if (success === 1) {
                succesNotify(message)
                queryClient.invalidateQueries('getMelioradepartmentSection')
                // setCount(count + 1)
                setsecStatus(false)
                reset()
            } else if (success === 0) {
                infoNotify(message)
            } else {
                infoNotify(message)
            }
        }
        const updateFun = async patchdata => {
            const result = await axioslogin.patch('/melioraDepMaster/UpdatedeptSecmaster', patchdata)
            const { message, success } = result.data
            if (success === 1) {
                succesNotify(message)
                // setCount(count + 1)
                queryClient.invalidateQueries('getMelioradepartment')
                setValue(0)
                setsecStatus(false)
                reset()
            } else if (success === 0) {
                infoNotify(message)
            } else {
                infoNotify(message)
            }
        }
        // console.log(value, "value");

        if (value === 0) {
            InsertFun(postdata)
        } else {
            updateFun(patchdata)
        }
    }, [postdata, patchdata])

    const backtoSetting = useCallback(() => {
        history('/Home/Settings')
    }, [history])
    const refreshWindow = useCallback(() => {

    }, [])

    return (
        <CardMaster
            title="Meliora Department Section Master"
            close={backtoSetting}
            submit={submitDepartsection}
            refresh={refreshWindow}
        >
            <Box sx={{ p: 1 }}>
                <Grid container spacing={1}>
                    <Grid item xl={4} lg={4}>
                        <Grid container spacing={1}>
                            <Grid item xl={12} lg={12}>
                                <TextFieldCustom
                                    placeholder="Department Section Name"
                                    required
                                    type="text"
                                    size="sm"
                                    name="secname"
                                    value={secname}
                                    onchange={updatesecNames}
                                />
                            </Grid>
                            <Grid item lg={12} xl={12}>
                                <MelioraDepartmentSelect value={department} setValue={setDepartment} />
                            </Grid>
                            <Grid item lg={12} xl={12}>
                                <SelectOraOutlet value={outlet} setValue={setOutlet} />
                            </Grid>
                            <Grid item lg={2} xl={2}>
                                <CusCheckBox
                                    label="ICU"
                                    color="primary"
                                    size="md"
                                    name="icu"
                                    value={icu}
                                    checked={icu}
                                    onCheked={updateSectionStatus}
                                />
                            </Grid>

                            <Grid item lg={2} xl={2}>
                                <CusCheckBox
                                    label="ER"
                                    color="primary"
                                    size="md"
                                    name="er"
                                    value={er}
                                    checked={er}
                                    onCheked={updateSectionStatus}
                                />
                            </Grid>
                            <Grid item lg={2} xl={2}>
                                <CusCheckBox
                                    label="OT"
                                    color="primary"
                                    size="md"
                                    name="ot"
                                    value={ot}
                                    checked={ot}
                                    onCheked={updateSectionStatus}
                                />
                            </Grid>
                            <Grid item lg={2} xl={2}>
                                <CusCheckBox
                                    label="General"
                                    color="primary"
                                    size="md"
                                    name="general"
                                    value={general}
                                    checked={general}
                                    onCheked={updateSectionStatus}
                                />
                            </Grid>

                            <Grid item lg={8} xl={8}>
                                <CusCheckBox
                                    label="Level 1"
                                    color="primary"
                                    size="md"
                                    name="levelOneStatus"
                                    value={levelOneStatus}
                                    checked={levelOneStatus}
                                    onCheked={updateLevelOne}
                                />
                            </Grid>
                            <Grid item lg={8} xl={8}>
                                <CusCheckBox
                                    label="Level 2"
                                    color="primary"
                                    size="md"
                                    name="levelTwoStatus"
                                    value={levelTwoStatus}
                                    checked={levelTwoStatus}
                                    onCheked={updateLevelTwo}
                                />
                            </Grid>
                            <Grid item lg={8} xl={8}>
                                <CusCheckBox
                                    label="Status"
                                    color="primary"
                                    size="md"
                                    name="secstatus"
                                    value={secstatus}
                                    checked={secstatus}
                                    onCheked={updatesecStatus}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item lg={8} xl={8}>
                        <MeliDeptSectionMastTable rowSelect={rowSelect} />
                    </Grid>
                </Grid>
            </Box>
        </CardMaster>)
}

export default memo(MelioraDepSecMaster)