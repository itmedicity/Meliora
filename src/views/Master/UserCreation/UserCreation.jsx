import React, { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { Box, Paper } from '@mui/material'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import Test from 'src/views/CommonSelectCode/Test'
import TextFeildPrimary from 'src/views/Components/TextFeildPrimary'
import CardMasterView from 'src/views/Components/CardMasterView'

const UserCreation = () => {
    //*** Initializing */
    const history = useHistory();

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
                            //  name="complaint_dept_name"
                            // value={complaint_dept_name}
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

                            //  name="complaint_dept_name"
                            // value={complaint_dept_name}
                            // onchange={updateDepartment}
                            />
                        </Box>
                        <Box sx={{ width: "20%", pr: 1 }}>
                            <TextFieldCustom
                                placeholder="Employee No"
                                type="text"
                                size="sm"

                            //  name="complaint_dept_name"
                            // value={complaint_dept_name}
                            // onchange={updateDepartment}
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

                            //  name="complaint_dept_name"
                            // value={complaint_dept_name}
                            // onchange={updateDepartment}
                            />
                        </Box>
                        <Box sx={{ width: "30%", pr: 1 }}>
                            <TextFieldCustom
                                placeholder="Email Id"
                                type="text"
                                size="sm"

                            //  name="complaint_dept_name"
                            // value={complaint_dept_name}
                            // onchange={updateDepartment}
                            />
                        </Box>
                        <Box sx={{ width: "10%", pr: 1 }}>
                            <TextFieldCustom
                                placeholder="DOB"
                                type="date"
                                size="sm"

                            //  name="complaint_dept_name"
                            // value={complaint_dept_name}
                            // onchange={updateDepartment}
                            />
                        </Box>
                        <Box sx={{ width: "10%", pr: 1 }}>
                            <TextFieldCustom
                                placeholder="DOJ"
                                type="date"
                                size="sm"

                            //  name="complaint_dept_name"
                            // value={complaint_dept_name}
                            // onchange={updateDepartment}
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
                            <Test />
                        </Box>
                        <Box sx={{ width: "20%", pr: 1 }}>
                            <Test />
                        </Box>
                        <Box sx={{ width: "20%", pr: 1 }}>
                            <Test />
                        </Box>
                        <Box sx={{ width: "20%", pr: 1 }}>
                            <Test />
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
                        //  name="dept_status"
                        // value={dept_status}
                        //checked={dept_status}
                        // onCheked={updateDepartment}
                        />
                    </Box>
                </Paper>
            </Box >
        </CardMasterView>
    )
}

export default UserCreation