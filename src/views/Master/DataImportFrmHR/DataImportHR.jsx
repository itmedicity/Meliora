import { Box, Paper } from '@mui/material'
import React, { useCallback, memo, useState, Fragment } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import { useHistory } from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close';
import CusIconButton from 'src/views/Components/CusIconButton'
import { ToastContainer } from 'react-toastify'
import CustomBackDrop from 'src/views/Components/CustomBackDrop'
import { CssVarsProvider, Typography } from '@mui/joy';

const DataImportHR = () => {
    /*** Initializing */
    const history = useHistory();
    const [open, setOpen] = useState(false)

    const getEmployeeMaster = useCallback(() => {
        setOpen(true)
        const getEmpMaster = async () => {
            const result = await axioslogin.get('/hrmdataGet/employeemaster');
            const { success, message } = result.data
            if (success === 1) {
                succesNotify(message)
                setOpen(false)
            } else {
                setOpen(false)
                warningNotify(message)
            }
        }
        getEmpMaster()
    }, [])

    const getEmployeeLogin = useCallback(() => {
        setOpen(true)
        const getEmpLogin = async () => {
            const result = await axioslogin.get('/hrmdataGet/employee/userPass');
            const { success, message } = result.data
            if (success === 1) {
                succesNotify(message)
                setOpen(false)
            } else {
                setOpen(false)
                warningNotify(message)
            }
        }
        getEmpLogin()
    }, [])

    const getDepartment = useCallback(() => {
        setOpen(true)
        const getDepartment = async () => {
            const result = await axioslogin.get('/hrmdataGet/dept');
            const { success, message } = result.data
            if (success === 1) {
                succesNotify(message)
                setOpen(false)
            } else {
                setOpen(false)
                warningNotify(message)
            }
        }
        getDepartment()
    }, [])

    const getDepartmentSection = useCallback(() => {
        setOpen(true)
        const getDepartmentSection = async () => {
            const result = await axioslogin.get('/hrmdataGet/deptsection');
            const { success, message } = result.data
            if (success === 1) {
                succesNotify(message)
                setOpen(false)
            } else {
                setOpen(false)
                warningNotify(message)
            }
        }
        getDepartmentSection()
    }, [])

    const getDesignation = useCallback(() => {
        setOpen(true)
        const getDesignation = async () => {
            const result = await axioslogin.get('/hrmdataGet/designation');
            const { success, message } = result.data
            if (success === 1) {
                succesNotify(message)
                setOpen(false)
            } else {
                setOpen(false)
                warningNotify(message)
            }
        }
        getDesignation()
    }, [])

    const getEmpMasterUpdation = useCallback(() => {
        setOpen(true)
        const getEmpMasterUpdation = async () => {
            const result = await axioslogin.get('/hrmdataGet/empMasterUpdate');
            const { success, message } = result.data
            if (success === 1) {
                succesNotify(message)
                setOpen(false)
            } else {
                setOpen(false)
                warningNotify(message)
            }
        }
        getEmpMasterUpdation()
    }, [])

    const getEmpLoginUpdation = useCallback(() => {
        setOpen(true)
        const getEmpLoginUpdation = async () => {
            const result = await axioslogin.get('/hrmdataGet/emploginUpdate');
            const { success, message } = result.data
            if (success === 1) {
                succesNotify(message)
                setOpen(false)
            } else {
                setOpen(false)
                warningNotify(message)
            }
        }
        getEmpLoginUpdation()
    }, [])


    //close button function
    const backtoSetting = useCallback(() => {
        history.push(`/Home/settings`)
    }, [history])

    return (
        <Fragment>
            <ToastContainer />
            <CustomBackDrop open={open} text="Please Wait" />
            <Box sx={{ height: 35, backgroundColor: "#f0f3f5", display: 'flex' }}>
                <Box sx={{ fontWeight: 550, flex: 1, pl: 1, pt: .5, color: '#385E72', }}>Data Transfer From HR</Box>
                <Box>
                    <CusIconButton size="sm" variant="outlined" color="primary" onClick={backtoSetting} >
                        <CloseIcon fontSize='small' />
                    </CusIconButton>
                </Box>
            </Box>
            <Box sx={{
                width: "100%",
                pl: 1, pt: 10, pr: 1, pb: 0.5, flex: 1,
                display: "flex",
                flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" },
                justifyContent: 'center', borderRadius: 1.5
            }}>
                <Paper sx={{ width: "80%" }}>
                    <Box sx={{
                        width: "100%",
                        pl: 1, pt: 1, pr: 1, pb: 0.5, flex: 1,
                        display: "flex",
                        flexDirection: "row",
                    }}>
                        <Box sx={{ width: "30%", mt: 1, mb: 1, ml: 2, backgroundColor: '#4793AF', borderRadius: 2.5 }}
                            onClick={() => getEmployeeMaster()}>
                            <CssVarsProvider>
                                <Typography sx={{
                                    fontSize: 15, pl: 1, pr: 2, color: 'white', textAlign: "center",
                                    cursor: "pointer"
                                }}>Employee Master Insert</Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ width: "30%", mt: 1, mb: 1, ml: 2, backgroundColor: '#4793AF', borderRadius: 2.5 }}
                            onClick={() => getEmployeeLogin()}>
                            <CssVarsProvider>
                                <Typography sx={{
                                    fontSize: 15, pl: 1, pr: 2, color: 'white', textAlign: "center",
                                    cursor: "pointer"
                                }}>Employee login Insert</Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ width: "30%", mt: 1, mb: 1, ml: 2, backgroundColor: '#4793AF', borderRadius: 2.5 }}
                            onClick={() => getDepartment()}>
                            <CssVarsProvider>
                                <Typography sx={{
                                    fontSize: 15, pl: 1, pr: 2, color: 'white', textAlign: "center",
                                    cursor: "pointer"
                                }}>Department Insert </Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ width: "30%", mt: 1, mb: 1, ml: 2, backgroundColor: '#4793AF', borderRadius: 2.5 }}
                            onClick={() => getDepartmentSection()}>
                            <CssVarsProvider>
                                <Typography sx={{
                                    fontSize: 15, pl: 1, pr: 2, color: 'white', textAlign: "center",
                                    cursor: "pointer"
                                }}>Department Section Insert</Typography>
                            </CssVarsProvider>
                        </Box>
                    </Box>
                    <Box sx={{
                        width: "100%",
                        pl: 1, pt: 1, pr: 1, pb: 0.5, flex: 1,
                        display: "flex",
                        flexDirection: "row",
                    }}>
                        < Box sx={{
                            width: "15%", mt: 1, mb: 1, ml: 2,
                        }}
                        >
                        </Box>
                        <Box sx={{ width: "30%", mt: 1, mb: 1, ml: 2, backgroundColor: '#4793AF', borderRadius: 2.5 }}
                            onClick={() => getEmpMasterUpdation()}>
                            <CssVarsProvider>
                                <Typography sx={{
                                    fontSize: 15, pl: 1, pr: 2, color: 'white', textAlign: "center",
                                    cursor: "pointer"
                                }}>Employee Master Update </Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ width: "30%", mt: 1, mb: 1, ml: 2, backgroundColor: '#4793AF', borderRadius: 2.5 }}
                            onClick={() => getEmpLoginUpdation()}>
                            <CssVarsProvider>
                                <Typography sx={{
                                    fontSize: 15, pl: 1, pr: 2, color: 'white', textAlign: "center",
                                    cursor: "pointer"
                                }}>Employee Login Update </Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ width: "30%", mt: 1, mb: 1, ml: 2, backgroundColor: '#4793AF', borderRadius: 2.5 }}
                            onClick={() => getDesignation()}>
                            <CssVarsProvider>
                                <Typography sx={{
                                    fontSize: 15, pl: 1, pr: 2, color: 'white', textAlign: "center",
                                    cursor: "pointer"
                                }}>Designation Insert </Typography>
                            </CssVarsProvider>
                        </Box>
                        < Box sx={{
                            width: "15%", mt: 1, mb: 1, ml: 2,
                        }}
                        >
                        </Box>
                    </Box>
                </Paper>
            </Box >
        </Fragment >
    )
}

export default memo(DataImportHR)