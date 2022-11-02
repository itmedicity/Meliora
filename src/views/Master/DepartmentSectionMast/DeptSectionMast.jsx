import React, { useCallback, useMemo, useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import CardMaster from 'src/views/Components/CardMaster'
import { Grid } from '@mui/material'
import { Box } from '@mui/system'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import DeptSectionMastTable from './DeptSectionMastTable'
import DepartmentSelect from 'src/views/CommonSelectCode/DepartmentSelect'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import SelectOraOutlet from 'src/views/CommonSelectCode/SelectOraOutlet'
import { useSelector } from 'react-redux'
const DeptSectionMast = () => {
    const history = useHistory();
    //state for table rendering
    const [count, setCount] = useState(0);
    //state for edit
    const [edit, setEdit] = useState(0);
    //state for select box
    const [department, setDepartment] = useState(0)
    const [outlet, setOutlet] = useState(0)
    //state for name
    const [secname, updatesecName] = useState('');
    //state for status
    const [secstatus, setsecStatus] = useState(false);
    //state for setting id
    const [id, setId] = useState(0);
    //state for intializing checkboxes
    const [deptsubtype, setdeptsubtype] = useState({
        general: true,
        ot: false,
        icu: false,
        er: false,
    })
    //destructuring
    const { general, ot, icu, er } = deptsubtype
    const updateSectionStatus = async (e) => {
        const ob1 = {
            general: false,
            ot: false,
            icu: false,
            er: false,
        }
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setdeptsubtype({ ...ob1, [e.target.name]: value })
    }
    const updatesecNames = useCallback((e) => {
        const value = e.target.value
        updatesecName(value)
    }, [])
    const updatesecStatus = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setsecStatus(value)
    }, [])
    // Get login user emp_id
    const loginid = useSelector((state) => {
        return state.LoginUserData.empid
    })
    //general-1,ot-2,icu-3,er-4
    const postdata = useMemo(() => {
        return {
            sec_name: secname,
            dept_id: department,
            dept_sub_sect: general === true ? 1 : ot === true ? 2 : icu === true ? 3 : er === true ? 4 : 0,
            sec_status: secstatus === true ? 1 : 0,
            create_user: loginid,
            ou_code: outlet !== 0 ? outlet : null
        }
    }, [secname, department, secstatus, general, ot, icu, er, outlet, loginid])
    const patchdata = useMemo(() => {
        return {
            sec_name: secname,
            dept_id: department,
            dept_sub_sect: general === true ? 1 : ot === true ? 2 : icu === true ? 3 : er === true ? 4 : 0,
            sec_status: secstatus === true ? 1 : 0,
            ou_code: outlet !== 0 ? outlet : null,
            edit_user: loginid,
            sec_id: id
        }
    }, [secname, department, general, ot, icu, er, secstatus, id, outlet, loginid])
    //data set for edit 
    const rowSelect = useCallback((params) => {
        setEdit(1);
        const data = params.api.getSelectedRows();
        const { sec_name, dept_id, status, sec_id, dept_sub_sect, ou_code } = data[0]
        const checkboxdata = {
            general: dept_sub_sect === 1 ? true : false,
            ot: dept_sub_sect === 2 ? true : false,
            icu: dept_sub_sect === 3 ? true : false,
            er: dept_sub_sect === 4 ? true : false,
        }
        setDepartment(dept_id)
        updatesecName(sec_name)
        setsecStatus(status === 'Yes' ? true : false)
        setdeptsubtype(checkboxdata)
        setId(sec_id)
        setOutlet(ou_code)
    }, [])
    //reseting 
    const reset = useCallback(() => {
        const resetcheckbox = {
            general: true,
            ot: false,
            icu: false,
            er: false,
        }
        setDepartment(0)
        setOutlet(0)
        setdeptsubtype(resetcheckbox)
        setsecStatus(false)
        updatesecName('')
    }, [setdeptsubtype])
    /*** usecallback function for form submitting */
    const submitDepartsection = useCallback((e) => {
        e.preventDefault();
        /*** * insert function for use call back     */
        const InsertFun = async (postdata) => {
            const result = await axioslogin.post('/deptsecmaster', postdata)
            const { message, success } = result.data;
            if (success === 1) {
                succesNotify(message)
                setCount(count + 1);
                reset();
            } else if (success === 0) {
                infoNotify(message);
            }
            else {
                infoNotify(message)
            }
        }
        /***  * update function for use call back     */
        const updateFun = async (patchdata) => {
            const result = await axioslogin.patch('/deptsecmaster', patchdata);
            const { message, success } = result.data;
            if (success === 2) {
                succesNotify(message)
                setCount(count + 1);
                setEdit(0)
                reset();
            } else if (success === 0) {
                infoNotify(message);
            }
            else {
                infoNotify(message)
            }
        }
        /*** edit=0 insert api call work else update call
            * edit initialy '0' when edit button click value changes to '1'
            */
        if (edit === 0) {
            InsertFun(postdata)
        } else {
            updateFun(patchdata)
        }

    }, [edit, postdata, patchdata, count, reset])
    //close button function
    const backtoSetting = useCallback(() => {
        history.push('/Home/Settings')
    }, [history])
    //refreshWindow
    const refreshWindow = useCallback(() => {
        const resetcheckbox = {
            general: true,
            ot: false,
            icu: false,
            er: false
        }
        setDepartment(0)
        setOutlet(0)
        setEdit(0)
        setdeptsubtype(resetcheckbox)
        updatesecName('')
        setsecStatus(false)
    }, [])
    return (
        <CardMaster
            title="Department Section Master"
            close={backtoSetting}
            submit={submitDepartsection}
            refresh={refreshWindow}
        >
            <Box sx={{ p: 1 }}>
                <Grid container spacing={1} >
                    <Grid item xl={4} lg={4}  >
                        <Grid container spacing={1} >
                            <Grid item xl={12} lg={12} >
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
                            <Grid item xl={12} lg={12}  >
                                <DepartmentSelect value={department} setValue={setDepartment} />
                            </Grid>
                            <Grid item xl={12} lg={12}>
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
                    <Grid item lg={8} xl={8} >
                        <DeptSectionMastTable count={count} rowSelect={rowSelect} />
                    </Grid>
                </Grid>
            </Box>
        </CardMaster>
    )
}
export default DeptSectionMast