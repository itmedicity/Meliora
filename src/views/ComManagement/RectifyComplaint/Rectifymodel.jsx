import React from 'react'
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { ToastContainer } from 'react-toastify';
import { Box, Paper } from '@mui/material'
import { Button, Typography } from "@material-ui/core";
import { Fragment } from 'react';
import { useState } from 'react';
import { useEffect, memo } from 'react';
import { useMemo } from 'react';
import { useCallback } from 'react';
import { errorNotify, infoNotify, succesNotify } from 'src/views/Common/CommonCode';
import { axioslogin } from 'src/views/Axios/Axios';
import CustomTextarea from 'src/views/Components/CustomTextarea';
import { format } from 'date-fns'
import CusCheckBox from 'src/views/Components/CusCheckBox';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});


const Rectifymodel = ({ open, setOpen, detail, count, setCount }) => {

    const [rectify, setrectify] = useState({
        complaint_slno: 0,
        complaint_desc: '',
        req_type_name: '',
        complaint_dept_name: '',
        complaint_type_name: '',
        hic_policy_name: '',
        compalint_date: ''

    })
    const { complaint_slno, complaint_desc,
        sec_name, em_name, date, Time, compalint_status
    } = rectify

    useEffect(() => {
        const rectifyfunction = () => {
            const { complaint_slno, complaint_desc, req_type_name, complaint_dept_name, complaint_type_name, hic_policy_name, compalint_date, sec_name, em_name,
                date, Time, compalint_status
            } = detail[0]
            const frmdata = {
                complaint_slno: complaint_slno,
                complaint_desc: complaint_desc,
                req_type_name: req_type_name,
                complaint_dept_name: complaint_dept_name,
                complaint_type_name: complaint_type_name,
                hic_policy_name: hic_policy_name,
                compalint_date: compalint_date,
                sec_name: sec_name,
                em_name: em_name,
                date: date,
                Time: Time,
                compalint_status: compalint_status



            }
            setrectify(frmdata)
            // setslno(complaint_slno)
        }
        rectifyfunction()
    }, [detail])

    const [pending, setPending] = useState(false);
    const [hold, setHold] = useState(false);
    const [rectified, setRectify] = useState(false);
    const [flag, setFlag] = useState(0);

    const updatePending = useCallback((e) => {
        if (e.target.checked === true) {
            setPending(true)
            setHold(false)
            setRectify(false)
            setFlag(1)
        } else {
            setFlag(0)
            setPending(false)
        }
    }, [])
    const updateHold = useCallback((e) => {
        if (e.target.checked === true) {
            setHold(true)
            setPending(false)
            setRectify(false)
            setFlag(2)
        } else {
            setFlag(0)
            setHold(false)
        }
    }, [])
    const updateRectified = useCallback((e) => {
        if (e.target.checked === true) {
            setRectify(true)
            setHold(false)
            setPending(false)
            setFlag(0)
        } else {
            setFlag(0)
            setRectify(false)
        }
    }, [])
    const [pendholdreason, setPendhold] = useState("")
    const updatePendhold = useCallback((e) => {
        setPendhold(e.target.value)
    }, [])
    const patchData = useMemo(() => {
        return {
            compalint_status: rectified === true ? 2 : compalint_status,
            cm_rectify_status: pending === true ? 'P' : hold === true ? 'O' : rectified === true ? 'R' : null,
            cm_rectify_time: rectified === true ? format(new Date(), 'yyyy-MM-dd HH:mm:ss') : null,
            rectify_pending_hold_remarks: pending === true ? pendholdreason : hold === true ? pendholdreason : null,
            complaint_slno: complaint_slno
        }
    }, [complaint_slno, pending, hold, rectified, compalint_status, pendholdreason])
    const rectifycmplt = useCallback((e) => {
        e.preventDefault();
        const updateFun = async (patchData) => {
            const result = await axioslogin.patch(`/Rectifycomplit/updatecmp`, patchData);
            const { success, message } = result.data;
            if (success === 2) {
                succesNotify(message)
                setCount(count + 1);
                setOpen(false)
            }
            else {
                errorNotify(message)
            }
        }
        if (pending === true || hold === true || rectified === true) {
            updateFun(patchData)
        }
        else {
            infoNotify("Please Choose Any")
        }
    }, [patchData, count, setCount, setOpen, hold, pending, rectified])
    const handleClose = () => {
        setOpen(false);
        setFlag(0);
        setRectify(false);
        setPending(false);
        setHold(false);
        setPendhold('');
    };
    return (
        <Fragment>
            <ToastContainer />
            <Dialog
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
                keepMounted
                aria-describedby="alert-dialog-slide-descriptiona"
            >
                <DialogTitle>
                    {"Complaint Rectification"}
                </DialogTitle>
                <DialogContent sx={{
                    width: "100%",
                    height: "100%"
                }}>
                    <Box sx={{ width: "100%", mt: 0 }}>
                        <Box>
                            <Paper square elevation={3} sx={{ p: 2, mt: 1 }} >
                                {/* 2nd section */}
                                <Box sx={{
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', },
                                    p: 0.5,
                                    mt: 1
                                }}>
                                    <Box sx={{
                                        display: 'flex',
                                        width: { xs: '50%', sm: '50%', md: '100%', lg: '100%', xl: '100%', },
                                    }} >
                                        <Typography>Complaint Department</Typography>
                                    </Box>
                                    <Box sx={{
                                        display: 'flex',
                                        width: { xs: '50%', sm: '50%', md: '100%', lg: '100%', xl: '100%', },
                                    }} >
                                        <Typography>{sec_name}</Typography>
                                    </Box>
                                    <Box>
                                    </Box>
                                </Box>
                                {/* 3rd section */}
                                <Box sx={{
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', },
                                    p: 0.5,
                                    mt: 1
                                }}>
                                    <Box sx={{
                                        display: 'flex',
                                        width: { xs: '50%', sm: '50%', md: '100%', lg: '100%', xl: '100%', },
                                    }} >
                                        <Typography>Assigned Employee</Typography>
                                    </Box>
                                    <Box sx={{
                                        display: 'flex',
                                        width: { xs: '50%', sm: '50%', md: '100%', lg: '100%', xl: '100%', },
                                    }} >
                                        <Typography>{em_name}</Typography>
                                    </Box>
                                    <Box>
                                    </Box>
                                </Box>
                                {/* 4th section */}
                                <Box sx={{
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', },
                                    p: 0.5,
                                    mt: 1
                                }}>
                                    <Box sx={{
                                        display: 'flex',
                                        width: { xs: '50%', sm: '50%', md: '100%', lg: '100%', xl: '100%', },
                                    }} >
                                        <Typography>Date & Time</Typography>
                                    </Box>
                                    <Box sx={{
                                        display: 'flex',
                                        width: { xs: '50%', sm: '50%', md: '100%', lg: '100%', xl: '100%', },
                                    }} >
                                        <Typography>{date} & {Time}</Typography>
                                    </Box>
                                    <Box>
                                    </Box>
                                </Box>
                                <Box sx={{
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', },
                                    // p: 1
                                    p: 0.5,
                                }}>
                                    <Box sx={{
                                        display: 'flex',
                                        width: "100%"
                                    }} >
                                        <Typography sx={{ textAlign: "center" }}>Complaint Description</Typography>
                                    </Box>
                                </Box>
                                <Box sx={{
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', },
                                    // p: 1
                                    p: 0.5,
                                }}>
                                    <Box sx={{
                                        display: 'flex',
                                        width: { xs: '50%', sm: '50%', md: '100%', lg: '100%', xl: '100%', },
                                        mt: 0
                                    }} >
                                        <CustomTextarea
                                            style={{ width: 390 }}
                                            minRows={4}
                                            value={complaint_desc}
                                            disabled
                                        />
                                    </Box>
                                </Box>
                                <Box sx={{
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', },
                                    p: 0.5,
                                    mt: 1, mb: 1
                                }}>
                                    <Box sx={{
                                        display: 'flex',
                                        width: "30%"
                                    }} >
                                        <CusCheckBox
                                            label="Pending"
                                            color="primary"
                                            size="md"
                                            name="pending"
                                            value={pending}
                                            checked={pending}
                                            onCheked={updatePending}
                                        />
                                    </Box>
                                    <Box sx={{
                                        display: 'flex',
                                        width: "30%"
                                    }} >
                                        <CusCheckBox
                                            label="On Hold"
                                            color="primary"
                                            size="md"
                                            name="hold"
                                            value={hold}
                                            checked={hold}
                                            onCheked={updateHold}
                                        />
                                    </Box>
                                    <Box sx={{
                                        display: 'flex',
                                        width: "30%"
                                    }} >
                                        <CusCheckBox
                                            label="Rectify"
                                            color="primary"
                                            size="md"
                                            name="rectified"
                                            value={rectified}
                                            checked={rectified}
                                            onCheked={updateRectified}
                                        />
                                    </Box>
                                </Box>
                                {
                                    flag === 1 ? <Box sx={{ p: 0.5 }}>
                                        <CustomTextarea
                                            style={{ width: 390 }}
                                            minRows={4}
                                            placeholder=" Pending Remarks"
                                            onchange={updatePendhold}
                                            value={pendholdreason}
                                        />
                                    </Box> : null
                                }
                                {
                                    flag === 2 ? <Box sx={{ p: 0.5 }}>
                                        <CustomTextarea
                                            style={{ width: 390 }}
                                            minRows={4}
                                            placeholder=" On Hold Remarks"
                                            onchange={updatePendhold}
                                            value={pendholdreason}
                                        />
                                    </Box> : null
                                }

                            </Paper>
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={rectifycmplt} color="secondary" >Ok</Button>
                    <Button onClick={handleClose} color="secondary" >Close</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

export default memo(Rectifymodel)