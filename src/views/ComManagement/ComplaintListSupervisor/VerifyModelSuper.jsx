import React, { Fragment, memo, useCallback, useMemo, useState } from 'react'
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
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});


const VerifyModelSuper = ({ open, setOpen, complaint, count, setCount, id }) => {
    console.log(complaint);
    //props data for modal
    const { complaint_slno, complaint_desc, compalint_date, sec_name, req_type_name, complaint_type_name,
        compalint_priority, complaint_hicslno, rectify_pending_hold_remarks
    } = complaint[0]

    // state for remarks
    const [messagee, setMessage] = useState('');

    //updating remark state
    const updateMessage = useCallback((e) => {
        setMessage(e.target.value)
    }, [setMessage])

    //reset to intial
    const reset = useCallback(() => {
        setOpen(false)
        setMessage('')
    }, [setOpen, setMessage])

    const VerifyData = useMemo(() => {
        return {
            complaint_slno: complaint_slno,
            verify_spervsr: 1,
            verify_spervsr_remarks: messagee,
            verify_spervsr_user: id
        }
    }, [complaint_slno, messagee, id])

    const NotVerifyData = useMemo(() => {
        return {
            complaint_slno: complaint_slno,
            verify_spervsr: 2,
            verify_spervsr_remarks: messagee,
            verify_spervsr_user: id
        }
    }, [complaint_slno, messagee, id])

    //Verified and Update complaint Mast Table
    const Verified = useCallback(() => {
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
        Verified(VerifyData);
    }, [VerifyData, setCount, count, reset])

    //Not verify Api, Update complaint Mast Table
    const NotVerified = useCallback(() => {
        const Verified = async (NotVerifyData) => {
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
        Verified(NotVerifyData);
    }, [NotVerifyData, setCount, reset, count])

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
                        Message Send to User
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
                                        width: "75%", minHeight: 10, maxHeight: 70, pl: 0.9, fontSize: 15,
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
                    <Button color="secondary" onClick={Verified} >Verify</Button>
                    <Button color="secondary" onClick={NotVerified}>Not Verify</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

export default memo(VerifyModelSuper)