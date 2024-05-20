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
                <Paper sx={{ width: "50%" }}>
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
                                }}>Employee Master </Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ width: "30%", mt: 1, mb: 1, ml: 2, backgroundColor: '#4793AF', borderRadius: 2.5 }}
                            onClick={() => getEmployeeLogin()}>
                            <CssVarsProvider>
                                <Typography sx={{
                                    fontSize: 15, pl: 1, pr: 2, color: 'white', textAlign: "center",
                                    cursor: "pointer"
                                }}>Employee login </Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ width: "30%", mt: 1, mb: 1, ml: 2, backgroundColor: '#4793AF', borderRadius: 2.5 }}
                            onClick={() => getDepartment()}>
                            <CssVarsProvider>
                                <Typography sx={{
                                    fontSize: 15, pl: 1, pr: 2, color: 'white', textAlign: "center",
                                    cursor: "pointer"
                                }}>Department </Typography>
                            </CssVarsProvider>
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </Fragment >
    )
}

export default memo(DataImportHR)