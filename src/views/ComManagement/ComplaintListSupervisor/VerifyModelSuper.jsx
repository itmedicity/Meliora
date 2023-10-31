import React, { Fragment, memo, useCallback, useMemo, useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import { Paper } from '@mui/material';
import CustomTextarea from 'src/views/Components/CustomTextarea';
import { axioslogin } from 'src/views/Axios/Axios';
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode';
import { format } from 'date-fns'
import { CssVarsProvider, Typography } from '@mui/joy'
import CusCheckBox from 'src/views/Components/CusCheckBox';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});


const VerifyModelSuper = ({ open, setOpen, complaint, count, setCount, id }) => {
    //props data for modal
    const { complaint_slno, complaint_desc, compalint_date, sec_name, req_type_name, complaint_type_name,
        compalint_priority, complaint_hicslno, rectify_pending_hold_remarks, compdept_message,
        message_reply_emp, compdept_message_flag, msg_read_emp, msg_send_emp, assigned_date,
        cm_rectify_time
    } = complaint[0]

    // state for remarks
    const [messagee, setMessage] = useState('');
    const [getAssignEmp, setGetAssignEmp] = useState([])
    //state for verified checkbox
    const [verify, setVerify] = useState(false);
    //state for notrectified
    const [notrectify, setNotrectify,] = useState(false);
    const [flag, setFlag] = useState(0)
    const updateVerify = (e) => {
        if (e.target.checked === true) {
            setVerify(true)
            setNotrectify(false)
            setFlag(1)
        } else {
            setFlag(0)
            setVerify(false)
        }
    }
    //function for update not rectify check box
    const updateNotrectify = (e) => {
        if (e.target.checked === true) {
            setNotrectify(true)
            setVerify(false)
            setFlag(2)
        } else {
            setFlag(0)
            setNotrectify(false)
        }
    }

    //updating remark state
    const updateMessage = useCallback((e) => {
        setMessage(e.target.value)
    }, [setMessage])

    //reset to intial
    const reset = useCallback(() => {
        setOpen(false)
        setMessage('')
        setVerify(false)
        setNotrectify(false)
        setFlag(0)
    }, [setOpen, setMessage])

    const VerifyData = useMemo(() => {
        return {
            complaint_slno: complaint_slno,
            verify_spervsr: 1,
            verify_spervsr_remarks: messagee,
            compalint_status: 2,
            verify_spervsr_user: id
        }
    }, [complaint_slno, messagee, id])

    const NotVerifyData = useMemo(() => {
        return {
            complaint_slno: complaint_slno,
            verify_spervsr: 2,
            verify_spervsr_remarks: messagee,
            compalint_status: 1,
            verify_spervsr_user: id
        }
    }, [complaint_slno, messagee, id])


    const Submit = useCallback(() => {
        const Verified = async (VerifyData) => {
            const result = await axioslogin.patch(`/complaintassign/SupervsrVerify`, VerifyData);
            const { message, success } = result.data;
            if (success === 1) {
                succesNotify(message)
                setCount(count + 1)
                reset();
            } else if (success === 0) {
                infoNotify(message)
            } else {
                infoNotify(message)
            }
        }

        const NotVerified = async (NotVerifyData) => {
            const result = await axioslogin.patch(`/complaintassign/SupervsrVerify`, NotVerifyData);
            const { message, success } = result.data;
            if (success === 1) {
                succesNotify(message)
                setCount(count + 1)
                reset();
            } else if (success === 0) {
                infoNotify(message)
            } else {
                infoNotify(message)
            }
        }

        if (flag === 1) {
            Verified(VerifyData)
        } else if (flag === 2) {
            NotVerified(NotVerifyData)
        }
    }, [flag, VerifyData, NotVerifyData, reset, setCount, count])


    const Close = useCallback(() => {
        reset();
    }, [reset])


    useEffect(() => {
        const getEmployeees = async () => {
            const result = await axioslogin.get(`Rectifycomplit/getAssignEmps/${complaint_slno}`)
            const { success, data } = result.data
            if (success === 1) {
                setGetAssignEmp(data)
            }
            else {
                setGetAssignEmp([])
            }
        }
        getEmployeees();
    }, [complaint_slno])


    return (
        <Fragment>
            <ToastContainer />
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                aria-describedby="alert-dialog-slide-descriptiona"
                fullWidth
                maxWidth='md'
            >
                < DialogContent id="alert-dialog-slide-descriptiona"
                    sx={{
                        width: '100%',
                        height: "100%"
                    }}
                >
                    < DialogContentText id="alert-dialog-slide-descriptiona">
                        Supervisor Verification
                    </DialogContentText>

                    <Box sx={{ width: "100%", mt: 0 }}>
                        <Paper variant='outlined' sx={{ p: 0, mt: 1 }} >
                            <Box sx={{
                                width: "100%",
                                display: "flex",
                                flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'column', xl: 'column', },
                            }}>
                                <Box sx={{
                                    width: "100%",
                                    display: "flex",
                                    p: 0.5,
                                    flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                }}>
                                    <Box
                                        sx={{ pr: 8 }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15 }}>Complaint No:  {complaint_slno}</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ pl: 3 }}                                    >
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15 }}>Request Type: {req_type_name}</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ pl: 7 }}                                    >
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15 }}>Request Date: {format(new Date(compalint_date), 'dd-MM-yyyy hh:mm:ss')}</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                </Box>
                                <Box
                                    sx={{
                                        width: "100%",
                                        display: "flex",
                                        p: 0.5,
                                        flexDirection: "row",
                                    }}>
                                    <CssVarsProvider>
                                        <Typography sx={{ fontSize: 15, pr: 8 }}>Department Section:</Typography>
                                        <Typography sx={{ textTransform: "capitalize", fontSize: 15, pl: 1.7 }}> {sec_name.toLowerCase()}</Typography>
                                    </CssVarsProvider>

                                </Box>
                                <Box
                                    sx={{
                                        width: "100%",
                                        display: "flex",
                                        p: 0.5,
                                        flexDirection: "row",
                                    }}>
                                    <CssVarsProvider>
                                        <Typography sx={{ fontSize: 15, pr: 8 }}>Complaint Type:</Typography>
                                        <Typography sx={{ textTransform: "capitalize", fontSize: 15, pl: 5.4 }}> {complaint_type_name.toLowerCase()}</Typography>
                                    </CssVarsProvider>

                                </Box>

                                <Box sx={{
                                    width: "100%",
                                    display: "flex",
                                    p: 0.5,
                                    flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                }}>

                                    <Box
                                        sx={{ width: "25%", }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15 }}>Complaint Description:</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Paper sx={{
                                        width: "75%", minHeight: 10, maxHeight: 70, pl: 0.9, fontSize: 15,
                                        overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                    }} variant='none'>
                                        {complaint_desc}
                                    </Paper>


                                </Box>

                                <Box sx={{
                                    width: "100%",
                                    display: "flex",
                                    p: 0.5,
                                    flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                }}>
                                    <Box
                                        sx={{ pr: 8 }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15 }}>Priority:  {compalint_priority === 1 ? "Yes" : "No"}</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ pl: 9.5 }}                                    >
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15 }}>Infection Control Risk Assessment (ICRA) Recommended: {complaint_hicslno === 1 ? "Yes" : "No"}</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                </Box>


                                {
                                    compdept_message_flag !== 0 ?

                                        <Box
                                            sx={{
                                                width: "100%",
                                                display: "flex",
                                                flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'column', xl: 'column', },
                                            }}>
                                            <Box sx={{
                                                width: "100%",
                                                display: "flex",
                                                p: 0.5,
                                                flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                            }}>

                                                <Box
                                                    sx={{ width: "25%", }}>
                                                    <CssVarsProvider>
                                                        <Typography sx={{ fontSize: 15 }}>Message Send:</Typography>
                                                    </CssVarsProvider>
                                                </Box>
                                                <Paper sx={{
                                                    width: "75%", minHeight: 10, maxHeight: 70, pl: 0.9, fontSize: 15,
                                                    overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                                }} variant='none'>
                                                    {compdept_message}
                                                </Paper>
                                            </Box>
                                            <Box
                                                sx={{
                                                    width: "100%",
                                                    display: "flex",
                                                    p: 0.5,
                                                    flexDirection: "row",
                                                }}>
                                                <CssVarsProvider>
                                                    <Typography sx={{ fontSize: 15, pr: 5.7 }}>Message Send Employee:</Typography>
                                                    <Typography sx={{ textTransform: "capitalize", fontSize: 15 }}> {msg_send_emp.toLowerCase()}</Typography>
                                                </CssVarsProvider>
                                            </Box>
                                            <Box sx={{
                                                width: "100%",
                                                display: "flex",
                                                p: 0.5,
                                                flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                            }}>
                                                <Box
                                                    sx={{ width: "25%", }}>
                                                    <CssVarsProvider>
                                                        <Typography sx={{ fontSize: 15 }}>Replay Message:</Typography>
                                                    </CssVarsProvider>
                                                </Box>
                                                <Paper sx={{
                                                    width: "75%", minHeight: 10, maxHeight: 70, pl: 1, fontSize: 15,
                                                    overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                                }} variant='none'>
                                                    {message_reply_emp}
                                                </Paper>
                                            </Box>
                                            <Box
                                                sx={{
                                                    width: "100%",
                                                    display: "flex",
                                                    p: 0.5,
                                                    flexDirection: "row",
                                                }}>
                                                <CssVarsProvider>
                                                    <Typography sx={{ fontSize: 15, pr: 5.5 }}>Message Read Employee:</Typography>
                                                    <Typography sx={{ textTransform: "capitalize", fontSize: 15 }}> {msg_read_emp !== null ? msg_read_emp.toLowerCase() : "Not Readed Yet"}</Typography>
                                                </CssVarsProvider>
                                            </Box>
                                        </Box> : null
                                }


                                <Box sx={{
                                    width: "100%",
                                    display: "flex",
                                    p: 0.5,
                                    flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                }}>
                                    <Box
                                        sx={{ width: "30%", }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15 }}>Assigned Employees:</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{
                                        pl: 2,
                                        display: 'flex',
                                        width: { xs: '50%', sm: '50%', md: '100%', lg: '100%', xl: '100%', },
                                    }} >

                                        {
                                            getAssignEmp.length !== 0 ?
                                                getAssignEmp && getAssignEmp.map((val) => {
                                                    return <Box key={val.assigned_emp} sx={{
                                                        width: "100%",
                                                        display: "flex",
                                                        flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', },
                                                    }}>
                                                        <CssVarsProvider>
                                                            <Typography sx={{ textTransform: "capitalize", textAlign: "left", pl: 1 }}>{val.em_name.toLowerCase()},</Typography>
                                                        </CssVarsProvider>
                                                    </Box>
                                                })
                                                : <CssVarsProvider>
                                                    <Typography sx={{ textTransform: "capitalize", textAlign: "left" }}>No Assigned Employee</Typography>
                                                </CssVarsProvider>
                                        }
                                    </Box>
                                </Box>


                                <Box sx={{
                                    width: "100%",
                                    display: "flex",
                                    p: 0.5,
                                    flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                }}>
                                    <Box
                                        sx={{ width: "25%", }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15 }}>Assigned Date:</Typography>
                                        </CssVarsProvider>
                                    </Box>

                                    <Box sx={{ pl: 0.7 }}                                    >
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15 }}> {format(new Date(assigned_date), 'dd-MM-yyyy hh:mm:ss')}</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                </Box>

                                <Box sx={{
                                    width: "100%",
                                    display: "flex",
                                    p: 0.5,
                                    flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                }}>

                                    <Box
                                        sx={{ width: "25%", }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15 }}>Rectify Remarks</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Paper sx={{
                                        pl: 0.7,
                                        width: "75%", minHeight: 10, maxHeight: 70, fontSize: 15,
                                        overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                    }} variant='none'>
                                        {rectify_pending_hold_remarks}
                                    </Paper>


                                </Box>
                                <Box sx={{
                                    width: "100%",
                                    display: "flex",
                                    p: 0.5,
                                    flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                }}>
                                    <Box
                                        sx={{ width: "25%", }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15 }}>Rectified Date:</Typography>
                                        </CssVarsProvider>
                                    </Box>

                                    <Box sx={{ pl: 0.7 }}                                    >
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15 }}> {format(new Date(cm_rectify_time), 'dd-MM-yyyy hh:mm:ss')}</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                </Box>


                                <Box sx={{
                                    width: "100%",
                                    display: "flex",
                                    p: 0.5,
                                    flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                }}>


                                    <Box sx={{
                                        pl: 26, width: "60%",
                                        display: "flex",
                                        flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                    }}>
                                        <Box sx={{
                                            display: 'flex',
                                            width: { xs: '100%', sm: '100%', md: '50%', lg: '50%', xl: '50%', },
                                            p: 1
                                        }} >
                                            <CusCheckBox
                                                label="Verified"
                                                color="primary"
                                                size="md"
                                                name="verify"
                                                value={verify}
                                                checked={verify}
                                                onCheked={updateVerify}
                                            />
                                        </Box>
                                        <Box sx={{
                                            display: 'flex',
                                            width: "50%",
                                            p: 1
                                            // width: { xs: '100%', sm: '100%', md: '100%', lg: '100%', xl: '100%', }
                                        }} >
                                            <CusCheckBox
                                                label="Not Verified"
                                                color="primary"
                                                size="md"
                                                name="notrectify"
                                                value={notrectify}
                                                checked={notrectify}
                                                onCheked={updateNotrectify}
                                            />
                                        </Box>
                                    </Box>
                                </Box>

                                <Box sx={{
                                    width: "100%",
                                    display: "flex",
                                    p: 0.5,
                                    flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                }}>
                                    <Box
                                        sx={{ pr: 8 }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15 }}>Remarks</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ pl: 11.6, width: "65%", pt: 0.5 }}                                    >
                                        <CustomTextarea
                                            style={{ width: 390 }}
                                            minRows={4}
                                            placeholder="Remarks"
                                            name='messagee'
                                            value={messagee}
                                            onchange={updateMessage}
                                        />
                                    </Box>
                                </Box>
                            </Box>
                        </Paper>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={Submit} >Save</Button>
                    <Button color="secondary" onClick={Close}>Close</Button>
                </DialogActions>
            </Dialog >
        </Fragment >
    )
}

export default memo(VerifyModelSuper)