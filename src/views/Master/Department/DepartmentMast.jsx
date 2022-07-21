import { Box } from '@mui/system'
import React, { useCallback, useMemo, useState } from 'react'
import { useHistory } from 'react-router-dom'
import CardMaster from 'src/views/Components/CardMaster'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import { Grid } from '@mui/material'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import DepartmentMastTable from './DepartmentMastTable'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
const DepartmentMast = () => {
    //for routing
    const history = useHistory();
    //state for table render
    const [count, setCount] = useState(0);
    //state for edit
    const [value, setValue] = useState(0)
    //intilizing
    const [department, setDepartment] = useState({
        dept_name: '',
        dept_alias: "",
        dept_status: false,
        dept_slno: ''
    })
    //Destructuring
    const { dept_name, dept_alias, dept_status, dept_slno } = department
    const updateDepartment = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setDepartment({ ...department, [e.target.name]: value })
    }, [department])
    //data for insert
    const postdata = useMemo(() => {
        return {
            dept_name: dept_name,
            dept_alias: dept_alias,
            dept_status: dept_status === true ? 1 : 0
        }
    }, [dept_name, dept_alias, dept_status])
    //edit data setting on textfields
    const rowSelect = useCallback((params) => {
        setValue(1)
        const data = params.api.getSelectedRows()
        const { dept_name, dept_alias, status, dept_slno } = data[0]
        const frmdata = {
            dept_name: dept_name,
            dept_alias: dept_alias,
            dept_status: status === 'Yes' ? true : false,
            dept_slno: dept_slno
        }
        setDepartment(frmdata)
    }, [])
    //data for update
    const patchdata = useMemo(() => {
        return {
            dept_name: dept_name,
            dept_alias: dept_alias,
            dept_status: dept_status === true ? 1 : 0,
            dept_slno: dept_slno
        }
    }, [dept_name, dept_alias, dept_status, dept_slno])
    /*** usecallback function for form submitting */
    const submitDepartment = useCallback((e) => {
        e.preventDefault();
        const formreset = {
            dept_name: '',
            dept_alias: "",
            dept_status: false,
            dept_slno: ''
        }
        /***    * insert function for use call back     */
        const InsertFun = async (postdata) => {
            const result = await axioslogin.post('/deptmaster', postdata);
            const { message, success } = result.data;
            if (success === 1) {
                succesNotify(message)
                setCount(count + 1);
                setDepartment(formreset);
            } else if (success === 0) {
                infoNotify(message);
            }
            else {
                infoNotify(message)
            }
        }
        /***  * update function for use call back     */
        const updateFun = async (patchdata) => {
            const result = await axioslogin.patch('/deptmaster', patchdata);
            const { message, success } = result.data;
            if (success === 2) {
                succesNotify(message)
                setCount(count + 1);
                setValue(0)
                setDepartment(formreset);
            } else if (success === 0) {
                infoNotify(message);
            }
            else {
                infoNotify(message)
            }
        }
        /*** value=0 insert api call work else update call
        * value initialy '0' when edit button click value changes to '1'
        */
        if (value === 0) {
            InsertFun(postdata)
        } else {
            updateFun(patchdata)
        }
    }, [value, postdata, patchdata, count])
    //close button function
    const backtoSetting = useCallback(() => {
        history.push('/Home/Settings')
    }, [history])
    //referesh func
    const refreshWindow = useCallback(() => {
        const formreset = {
            dept_name: '',
            dept_alias: "",
            dept_status: false,
            dept_slno: ''
        }
        setDepartment(formreset)
        setValue(0);
    }, [setDepartment])
    return (
        <CardMaster
            title="Department Master"
            submit={submitDepartment}
            close={backtoSetting}
            refresh={refreshWindow}
        >
            <Box sx={{ p: 1 }}>
                <Grid container spacing={1} >
                    <Grid item xl={4} lg={4}  >
                        <Grid container spacing={1} >
                            <Grid item xl={12} lg={12} >
                                <TextFieldCustom
                                    placeholder="Department Name"
                                    type="text"
                                    size="sm"
                                    name="dept_name"
                                    value={dept_name}
                                    onchange={updateDepartment}
                                />
                            </Grid>
                            <Grid item xl={12} lg={12} >
                                <TextFieldCustom
                                    placeholder="Department Alias"
                                    type="text"
                                    size="sm"
                                    name="dept_alias"
                                    value={dept_alias}
                                    onchange={updateDepartment}
                                />
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
                    <Grid item lg={8} xl={8} >
                        <DepartmentMastTable count={count} rowSelect={rowSelect} />
                    </Grid>
                </Grid>
            </Box>
        </CardMaster>
    )
}
export default DepartmentMast