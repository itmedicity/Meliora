import React, { useCallback, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Box, Paper } from '@mui/material'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import Test from 'src/views/CommonSelectCode/Test'
import TextFeildPrimary from 'src/views/Components/TextFeildPrimary'
import CardMasterView from 'src/views/Components/CardMasterView'
import DepartmentSelect from 'src/views/CommonSelectCode/DepartmentSelect'
import BranchSelectHr from 'src/views/CommonSelectCode/BranchSelectHr'
import DesignationSelect from 'src/views/CommonSelectCode/DesignationSelect'

const UserCreation = () => {
    //*** Initializing */
    const history = useHistory();
    const [dept, setDept] = useState(0)
    const [branch, setBranch] = useState(0)
    const [designation, setDesignation] = useState(0)
    const [dob, setdob] = useState(new Date())
    const [doj, setdoj] = useState(new Date())
    const [userdata, setUserdata] = useState({
        em_name: '',
        em_no: '',
        em_mobile: '',
        em_email: '',
        em_status: false
    })

    //Destructuring
    const { em_name, em_no, em_mobile, em_email, em_status } = userdata
    const updateUserCreation = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setUserdata({ ...userdata, [e.target.name]: value })
    }, [userdata])
    //View Table
    const viewTable = useCallback(() => {
        history.push('/Home/UserCreationTable')
    }, [history])

    //back to home
    const backtoSetting = useCallback(() => {
        history.push('/Home/Settings')
    }, [history])

    const getdob = (e) => {
        setdob(e.target.value)
    }
    const getdoj = (e) => {
        setdoj(e.target.value)
    }

    return (
        < CardMasterView
            title="User Creation"
            //submit={submitModuleGroup}
            view={viewTable}
            close={backtoSetting}
        // refresh={refereshWindow}
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
                            // onchange={updateDepartment}
                            />
                        </Box>
                        <Box sx={{ width: "20%", pr: 1 }}>
                            <Test />
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
                        <Box sx={{ width: "20%", pr: 1 }}>
                            <TextFieldCustom
                                placeholder="Employee No"
                                type="text"
                                size="sm"
                                name="em_no"
                                value={em_no}
                                onchange={updateUserCreation}
                            />
                        </Box>
                        <Box sx={{ width: "20%", pr: 1 }}>
                            <Test />
                        </Box>
                    </Box>
                    <Box sx={{
                        width: "100%",
                        pl: 1, pt: 0.5, pr: 0.5, pb: 0.5,
                        // background: "blue",
                        display: "flex",
                        flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" },
                    }}>
                        <Box sx={{ width: "10%", pr: 1 }}>
                            <Test />
                        </Box>
                        <Box sx={{ width: "20%", pr: 1 }}>
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
                        <Box sx={{ width: "10%", pr: 1 }}>
                            <Test />
                        </Box>
                        <Box sx={{ width: "10%", pr: 1 }}>
                            <Test />
                        </Box>

                    </Box>
                    <Box sx={{
                        width: "100%",
                        pl: 1, pt: 0.5, pr: 0.5, pb: 0.5,
                        // background: "blue",
                        display: "flex",
                        flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" },
                    }}>
                        <Box sx={{ width: "20%", pr: 1 }}>
                            <BranchSelectHr value={branch} setValue={setBranch} />
                        </Box>
                        <Box sx={{ width: "20%", pr: 1 }}>
                            <DepartmentSelect value={dept} setValue={setDept} />
                        </Box>
                        <Box sx={{ width: "20%", pr: 1 }}>
                            <Test />
                        </Box>
                        <Box sx={{ width: "20%", pr: 1 }}>
                            <DesignationSelect value={designation} setValue={setDesignation} />
                        </Box>
                        <Box sx={{ width: "20%", pr: 1 }}>
                            <Test />
                        </Box>

                    </Box>
                    <Box sx={{
                        width: "100%",
                        pl: 1, pt: 0.5, pr: 0.5, pb: 0.5,
                        // background: "blue",
                        display: "flex",
                        flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" },
                    }}>
                        <Box sx={{ width: "20%", pr: 1 }}>
                            <TextFieldCustom
                                placeholder="User Name"
                                type="text"
                                size="sm"

                            //  name="complaint_dept_name"
                            // value={complaint_dept_name}
                            // onchange={updateDepartment}
                            />
                        </Box>
                        <Box sx={{ width: "20%", pr: 1 }}>
                            <TextFieldCustom
                                placeholder="Password"
                                type="password"
                                size="sm"

                            //  name="complaint_dept_name"
                            // value={complaint_dept_name}
                            // onchange={updateDepartment}
                            />
                        </Box>
                        <Box sx={{ width: "20%", pr: 1 }}>
                            <TextFeildPrimary
                                placeholder="Re-Enter Password"
                                type="password"
                                size="sm"
                            //   endDecorator={<}
                            //  name="complaint_dept_name"
                            // value={complaint_dept_name}
                            // onchange={updateDepartment}
                            />
                        </Box>
                    </Box>
                    <Box sx={{
                        width: "100%",
                        pl: 1, pt: 0.5, pr: 0.5, pb: 0.5,
                        // background: "blue",
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
        </CardMasterView>
    )
}

export default UserCreation