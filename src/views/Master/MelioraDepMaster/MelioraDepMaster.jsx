import React, { memo, useCallback, useMemo, useState } from 'react'
import CardMaster from 'src/views/Components/CardMaster'
import { useNavigate } from 'react-router-dom'
import { Box, Option, Select } from '@mui/joy'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import FormControl from '@mui/material/FormControl'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import { Grid } from '@mui/material'
import MelioraDepMasTable from './MelioraDepMasTable'
import { useSelector } from 'react-redux'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import { useQueryClient } from '@tanstack/react-query'

const MelioraDepMaster = () => {
    const history = useNavigate()
    const [type, setType] = useState(0)
    const [count, setCount] = useState(0)
    const [value, setValue] = useState(0)
    const queryClient = useQueryClient()

    const [department, setDepartment] = useState({
        dept_name: '',
        dept_alias: '',
        dept_status: false,
        dept_id: ''
    })
    const id = useSelector(state => {
        return state.LoginUserData.empid
    })
    //in
    //Destructuring
    const { dept_name, dept_alias, dept_status, dept_id } = department
    const updateDepartment = useCallback(
        e => {
            const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
            setDepartment({ ...department, [e.target.name]: value })
        },
        [department]
    )
    const postdata = useMemo(() => {
        return {
            dept_name: dept_name,
            dept_alias: dept_alias,
            dept_status: dept_status === true ? 1 : 0,
            dept_type: type,
            create_user: id

        }
    }, [dept_status, dept_alias, dept_name, type, id])

    //data for update
    const patchdata = useMemo(() => {
        return {
            dept_name: dept_name,
            dept_alias: dept_alias,
            dept_status: dept_status === true ? 1 : 0,
            edit_user: id,
            dept_type: type,
            dept_id: dept_id
        }
    }, [dept_name, dept_alias, dept_status, type, dept_id, id])

    const rowSelect = useCallback(params => {
        setValue(1)
        const data = params.api.getSelectedRows()
        const { mel_DeptName, mel_DepAlias, status, mel_dept_type, mel_DepId } = data[0]
        const frmdata = {
            dept_name: mel_DeptName,
            dept_alias: mel_DepAlias,
            type: mel_dept_type,
            dept_status: status === 1 ? true : false,
            dept_id: mel_DepId
        }
        setType(mel_dept_type)
        setDepartment(frmdata)
    }, [])

    const submitDepartment = useCallback(() => {
        /*** * insert function for use call back     */
        const InsertFun = async postdata => {
            const result = await axioslogin.post('/melioraDepMaster/deptmaster', postdata)
            const { message, success } = result.data
            if (success === 1) {
                succesNotify(message)
                queryClient.invalidateQueries('getMelioradepartment')
                setCount(count + 1)
            } else if (success === 0) {
                infoNotify(message)
            } else {
                infoNotify(message)
            }
        }
        const updateFun = async patchdata => {
            const result = await axioslogin.patch('/melioraDepMaster/Updatedeptmaster', patchdata)
            const { message, success } = result.data
            if (success === 1) {
                succesNotify(message)
                setCount(count + 1)
                queryClient.invalidateQueries('getMelioradepartment')
                setValue(0)
            } else if (success === 0) {
                infoNotify(message)
            } else {
                infoNotify(message)
            }
        }

        if (value === 0) {
            InsertFun(postdata)
        } else {
            updateFun(patchdata)
        }
    }, [value, postdata, patchdata, queryClient])

    const backtoSetting = useCallback(() => {
        history('/Home/Settings')
    }, [history])
    const refreshWindow = useCallback(() => {

    }, [])
    return (
        <CardMaster title="Meliora Department Master" submit={submitDepartment} close={backtoSetting} refresh={refreshWindow}>
            <Box sx={{ p: 1, }}>
                <Grid container spacing={1}>
                    <Grid item xl={4} lg={4}>
                        <Grid container spacing={1}>
                            <Grid item xl={12} lg={12}>
                                <TextFieldCustom
                                    placeholder="Department Name"
                                    type="text"
                                    size="sm"
                                    name="dept_name"
                                    value={dept_name}
                                    onchange={updateDepartment}
                                />
                            </Grid>
                            <Grid item xl={12} lg={12}>
                                <TextFieldCustom
                                    placeholder="Department Alias"
                                    type="text"
                                    size="sm"
                                    name="dept_alias"
                                    value={dept_alias}
                                    onchange={updateDepartment}
                                />
                            </Grid>

                            <Grid item xl={12} lg={12}>
                                <FormControl fullWidth size="small">
                                    <Select
                                        id="demo-simple-select"
                                        value={type}
                                        onChange={(e, newValue) => setType(newValue)}
                                        size="small"
                                        variant="outlined"
                                        sx={{ height: 30, p: 0, m: 0, lineHeight: 1.2 }}
                                    >
                                        <Option value={0} disabled>
                                            {' '}
                                            Select Type
                                        </Option>
                                        <Option value={1}> Clinical</Option>
                                        <Option value={2}> Non Clinical</Option>
                                        <Option value={3}> Academic</Option>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item lg={2} xl={2}>
                                <CusCheckBox
                                    label="Status"
                                    color="primary"
                                    size="md"
                                    name="dept_status"
                                    value={dept_status}
                                    checked={dept_status}
                                    onCheked={updateDepartment}
                                />
                            </Grid>

                        </Grid>
                    </Grid>
                    <Grid item lg={8} xl={8}>
                        <MelioraDepMasTable count={count} rowSelect={rowSelect} />
                    </Grid>
                </Grid>
            </Box>
        </CardMaster>

    )
}

export default memo(MelioraDepMaster)