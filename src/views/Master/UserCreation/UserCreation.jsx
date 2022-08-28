import React, { useCallback, useState, useMemo, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Box, Paper } from '@mui/material'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import CardMasterView from 'src/views/Components/CardMasterView'
import DepartmentSelect from 'src/views/CommonSelectCode/DepartmentSelect'
import BranchSelectHr from 'src/views/CommonSelectCode/BranchSelectHr'
import DesignationSelect from 'src/views/CommonSelectCode/DesignationSelect'
import SalutationSelect from 'src/views/CommonSelectCode/SalutationSelect'
import { getempid } from 'src/views/Constant/Constant'
import DeptSecUnderDept from 'src/views/CommonSelectCode/DeptSecUnderDept'
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import UserCreationTable from './UserCreationTable'
import { format } from 'date-fns'
import { useSelector } from 'react-redux'
const UserCreation = () => {
    //*** Initializing */
    const history = useHistory();
    const [em_id, setemId] = useState(0)
    const [salut, setSalut] = useState(0)
    const [dept, setDept] = useState(0)
    const [deptsec, setDeptsec] = useState(0)
    const [branch, setBranch] = useState(0)
    const [gender, setGender] = useState(0)
    const [designation, setDesignation] = useState(0)
    const [dob, setdob] = useState(new Date())
    const [doj, setdoj] = useState(new Date())
    //state for table render
    const [count, setCount] = useState(0);
    const [value, setValue] = useState(0)
    const [userdata, setUserdata] = useState({
        em_name: '',
        em_no: '',
        em_mobile: '',
        em_email: '',
        em_status: false,
    })

    //Destructuring
    const { em_name, em_no, em_mobile, em_email, em_status } = userdata
    const updateUserCreation = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setUserdata({ ...userdata, [e.target.name]: value })
    }, [userdata])
    useEffect(() => {
        getempid().then((val) => {
            const empid = val
            setemId(empid)
        })
    }, [])

    // Get login user emp_id
    const id = useSelector((state) => {
        return state.LoginUserData.empid
    })

    const getdob = (e) => {
        setdob(e.target.value)
    }
    const getdoj = (e) => {
        setdoj(e.target.value)
    }
    //data set for edit 
    const rowSelect = useCallback((params) => {
        setValue(1);
        setemId(0)
        const data = params.api.getSelectedRows();
        const { em_id, em_no, em_name, em_salutation, em_gender, em_dob, em_doj, em_mobile, em_email, em_branch,
            em_department, em_dept_section, em_designation, em_status } = data[0]
        const frmdata = {
            em_name: em_name,
            em_no: em_no,
            em_mobile: em_mobile,
            em_email: em_email,
            em_status: em_status === 1 ? true : false
        }
        setUserdata(frmdata)
        setemId(em_id)
        setSalut(em_salutation)
        setGender(em_gender)
        setDept(em_department)
        setDeptsec(em_dept_section)
        setBranch(em_branch)
        setDesignation(em_designation)
        setdob(format(new Date(em_dob), "yyyy-MM-dd"))
        setdoj(format(new Date(em_doj), "yyyy-MM-dd"))
    }, [])
    //Insert data
    const postdata = useMemo(() => {
        return {
            em_id: em_id,
            em_no: em_no,
            emp_no: em_no,
            em_salutation: salut,
            em_name: em_name,
            em_gender: gender,
            em_dob: dob,
            em_doj: doj,
            em_mobile: em_mobile,
            em_email: em_email,
            em_branch: branch,
            em_department: dept,
            em_dept_section: deptsec,
            em_designation: designation,
            em_status: em_status === true ? 1 : 0,
            emp_username: em_no,
            emp_password: em_no,
            emp_email: em_email,
            emp_status: em_status === true ? 1 : 0,
            create_user: id
        }
    }, [em_id, em_no, salut, em_name, dob, doj, id, gender, em_mobile, em_email, branch, dept, deptsec, designation, em_status])

    //Update data
    const patchdata = useMemo(() => {
        return {
            em_id: em_id,
            em_no: em_no,
            emp_no: em_no,
            em_salutation: salut,
            em_name: em_name,
            em_gender: gender,
            em_dob: dob,
            em_doj: doj,
            em_mobile: em_mobile,
            em_email: em_email,
            em_branch: branch,
            em_department: dept,
            em_dept_section: deptsec,
            em_designation: designation,
            em_status: em_status === true ? 1 : 0,
            emp_username: em_no,
            emp_password: em_no,
            emp_email: em_email,
            emp_status: em_status === true ? 1 : 0,
            edit_user: id
        }
    }, [em_id, em_no, salut, em_name, dob, doj, id, gender, em_mobile, em_email, branch, dept, deptsec, designation, em_status])

    const submitUserCreation = useCallback((e) => {
        e.preventDefault();
        const formreset = {
            em_name: '',
            em_no: '',
            em_mobile: '',
            em_email: '',
            em_status: false,
        }
        /***    * insert function for use call back   */
        const InsertFun = async (postdata) => {
            const result = await axioslogin.post('/employee/empInsert', postdata);
            const { message, success } = result.data;
            if (success === 1) {
                succesNotify(message)
                setCount(count + 1);
                setUserdata(formreset);
                setemId(0)
                setSalut(0)
                setDept(0)
                setDeptsec(0)
                setBranch(0)
                setDesignation(0)
                setCount(0)
                setdob(new Date())
                setdoj(new Date())
            } else if (success === 0) {
                infoNotify(message);
            }
            else {
                infoNotify(message)
            }
        }
        const UpdateFun = async (patchdata) => {
            const result = await axioslogin.patch('/employee/update', patchdata);
            const { message, success } = result.data;
            if (success === 1) {
                succesNotify(message)
                setCount(count + 1);
                setUserdata(formreset);
                setemId(0)
                setSalut(0)
                setDept(0)
                setDeptsec(0)
                setBranch(0)
                setDesignation(0)
                setCount(0)
                setdob(new Date())
                setdoj(new Date())
            } else if (success === 0) {
                infoNotify(message);
            }
            else {
                infoNotify(message)
            }
        }
        if (value === 0) {
            InsertFun(postdata)
        }
        else {
            UpdateFun(patchdata)
        }
    }, [postdata, patchdata, value, count])

    //referesh func
    const refreshWindow = useCallback(() => {
        const formreset = {
            em_name: '',
            em_no: '',
            em_mobile: '',
            em_email: '',
            em_status: false,
            em_gender: 0
        }
        setUserdata(formreset)
        setemId(0)
        setSalut(0)
        setDept(0)
        setDeptsec(0)
        setBranch(0)
        setDesignation(0)
        setCount(0)
    }, [setUserdata])

    //View Table
    const viewTable = useCallback(() => {
        history.push('/Home/UserCreationTable')
    }, [history])

    //back to home
    const backtoSetting = useCallback(() => {
        history.push('/Home/Settings')
    }, [history])

    return (
        < CardMasterView
            title="User Creation"
            submit={submitUserCreation}
            view={viewTable}
            close={backtoSetting}
            refresh={refreshWindow}
        >
            <Box sx={{ width: "100%", pl: 1, pt: 1, pr: 1, pb: 1 }}>
                <Paper square elevation={3} sx={{
                    pl: 1, pt: 1, pr: 1, pb: 1
                }}>
                    <Box sx={{
                        width: "100%",
                        pl: 1, pt: 0.5, pr: 1, pb: 0.5,
                        // background: "blue",
                        display: "flex",
                        flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" },
                    }}>
                        <Box sx={{ width: "10%", pr: 1 }}>
                            <TextFieldCustom
                                placeholder="Emp_id"
                                type="text"
                                size="sm"
                                disabled={true}
                                name="em_id"
                                value={em_id}
                                onchange={updateUserCreation}
                            />
                        </Box>
                        <Box sx={{ width: "15%", pr: 1 }}>
                            <SalutationSelect value={salut} setValue={setSalut} />
                        </Box>
                        <Box sx={{ width: "30%", pr: 1 }}>
                            <TextFieldCustom
                                placeholder="Name"
                                type="text"
                                size="sm"
                                name="em_name"
                                value={em_name}
                                onchange={updateUserCreation}
                            />
                        </Box>
                        <Box sx={{ width: "10%", pr: 1 }}>
                            <TextFieldCustom
                                placeholder="Employee No"
                                type="text"
                                size="sm"
                                name="em_no"
                                value={em_no}
                                onchange={updateUserCreation}
                            />
                        </Box>
                        <Box sx={{ width: "15%", pr: 1, pt: 1 }}>
                            <FormControl fullWidth size="small"  >
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    name="gender"
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                    size="small"
                                    fullWidth
                                    variant='outlined'
                                    sx={{ height: 24, p: 0, m: 0, lineHeight: 1.200 }}
                                >
                                    <MenuItem value='0' disabled >Select Gender</MenuItem>
                                    <MenuItem value='1' >Male</MenuItem>
                                    <MenuItem value='2' >Female</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <Box sx={{ width: "10%", pr: 1 }}>
                            <TextFieldCustom
                                placeholder="DOB"
                                type="date"
                                size="sm"
                                name="dob"
                                value={dob}
                                onchange={getdob}
                            />
                        </Box>
                        <Box sx={{ width: "10%", pr: 1 }}>
                            <TextFieldCustom
                                placeholder="DOJ"
                                type="date"
                                size="sm"
                                name="doj"
                                value={doj}
                                onchange={getdoj}
                            />
                        </Box>
                    </Box>
                    <Box sx={{
                        width: "100%",
                        pl: 1, pt: 0.5, pr: 0.5, pb: 0.5,
                        display: "flex",
                        flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" },
                    }}>
                        <Box sx={{ width: "25%", pr: 1 }}>
                            <TextFieldCustom
                                placeholder="Mobile No"
                                type="text"
                                size="sm"
                                name="em_mobile"
                                value={em_mobile}
                                onchange={updateUserCreation}
                            />
                        </Box>
                        <Box sx={{ width: "30%", pr: 1 }}>
                            <TextFieldCustom
                                placeholder="Email Id"
                                type="text"
                                size="sm"
                                name="em_email"
                                value={em_email}
                                onchange={updateUserCreation}
                            />
                        </Box>
                        <Box sx={{ width: "20%", pr: 1 }}>
                            <BranchSelectHr value={branch} setValue={setBranch} />
                        </Box>
                        <Box sx={{ width: "20%", pr: 1 }}>
                            <DepartmentSelect value={dept} setValue={setDept} />
                        </Box>
                        <Box sx={{ width: "20%", pr: 1 }}>
                            <DeptSecUnderDept value={deptsec} setValue={setDeptsec} dept={dept} />
                        </Box>
                        <Box sx={{ width: "20%", pr: 1 }}>
                            <DesignationSelect value={designation} setValue={setDesignation} />
                        </Box>
                    </Box>
                    <Box sx={{
                        width: "100%",
                        pl: 1, pt: 0.5, pr: 0.5, pb: 0.5,
                        display: "flex",
                        flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" },
                    }}>
                        <CusCheckBox
                            label="Status"
                            color="primary"
                            size="md"
                            name="em_status"
                            value={em_status}
                            checked={em_status}
                            onCheked={updateUserCreation}
                        />
                    </Box>
                </Paper>
            </Box >
            <Box sx={{ width: "100%", pl: 1, pt: 1, pr: 1, pb: 1 }}>
                <Paper square elevation={3} sx={{
                    pl: 1, pt: 1, pr: 1, pb: 1
                }}>
                    <UserCreationTable count={count} rowSelect={rowSelect} />
                </Paper>
            </Box>
        </CardMasterView>
    )
}

export default UserCreation