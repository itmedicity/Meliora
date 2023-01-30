import React, { Fragment, useCallback, useState, memo } from 'react'
import Slide from '@mui/material/Slide';
import { ToastContainer } from 'react-toastify';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { Box, Grid, Paper, Typography } from '@mui/material'
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { format } from 'date-fns'
import { axioslogin } from 'src/views/Axios/Axios'
import { succesNotify } from 'src/views/Common/CommonCode'
import ApprovalCompnt from '../DepartmentApproval/ApprovalCompnt';
import { useMemo } from 'react';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

const CEOApprovalModel = ({ open, setOpen, datas, count, setCount }) => {

    const { req_slno, req_date, actual_requirement, needed, location, expected_date, approve_incharge,
        incharge_remarks, hod_remarks, req_approv_slno, approve_hod, manag_operation_approvs,
        manag_operation_remarks, senior_manage_approvs, senior_manage_remarks } = datas[0]

    const reqdate = format(new Date(req_date), 'dd-MM-yyyy')
    const expdate = format(new Date(expected_date), 'dd-MM-yyyy')

    //state for Remarks
    const [remark, setRemark] = useState('')
    const updateRemark = useCallback((e) => {
        setRemark(e.target.value)
    }, [])

    const [approve, setApprove] = useState(false)
    const [reject, setReject] = useState(false)
    const updateApprove = useCallback((e) => {
        if (e.target.checked === true) {
            setApprove(true)
            setReject(false)
        }
        else {
            setApprove(false)
            setReject(false)
        }
    }, [])
    const updateReject = useCallback((e) => {
        if (e.target.checked === true) {
            setReject(true)
            setApprove(false)
        }
        else {
            setApprove(false)
            setReject(false)
        }
    }, [])

    const patchdataCEO = useMemo(() => {
        return {
            cao_approve: approve === true ? 1 : 0,
            cao_approve_remarks: remark,
            cao_approv_date: format(new Date(), 'yyyy-MM-dd hh:mm:ss'),
            req_approv_slno: req_approv_slno
        }
    }, [approve, remark, req_approv_slno])

    const submit = useCallback((e) => {
        e.preventDefault();
        const reset = () => {
            setOpen(false)
            setApprove(false)
            setReject(false)
            setRemark('')
        }
        const updateInchApproval = async (patchdataCEO) => {
            const result = await axioslogin.patch('/requestRegister/approval/ceo', patchdataCEO);
            const { success, message } = result.data;
            if (success === 2) {
                succesNotify(message)
                setCount(count + 1)
                reset()
            }
        }
        updateInchApproval(patchdataCEO)
    }, [patchdataCEO, setCount, count, setOpen])
    // reset 
    const Close = useCallback(() => {
        setOpen(false)
        setApprove(false)
        setReject(false)
        setRemark('')
    }, [setOpen])

    return (
        <Fragment>
            <ToastContainer />
            <div>
                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    aria-describedby="alert-dialog-slide-descriptiona"
                >
                    < DialogContent id="alert-dialog-slide-descriptiona"
                        sx={{
                            width: 600,
                            height: "100%",
                            pb: 2
                        }}
                    >
                        < DialogContentText id="alert-dialog-slide-descriptiona">
                            Request Approval
                        </DialogContentText>
                        <Box sx={{ width: "100%", height: "100%", display: "flex", p: 1 }}>
                            <Paper square elevation={3} sx={{ width: "100%", height: "100%" }}>
                                <Box sx={{ p: 2 }}>
                                    <Grid item xl={12} lg={12} md={12} sm={12}>
                                        <Grid container spacing={2}>
                                            <Grid item xl={3} lg={3} >
                                                <Typography>Request No:</Typography>
                                            </Grid>
                                            <Grid item xl={2} lg={2} >
                                                <Typography>{req_slno}</Typography>
                                            </Grid>
                                            <Grid item xl={3} lg={3} >
                                                <Typography>Req.Date:</Typography>
                                            </Grid>
                                            <Grid item xl={3} lg={3} >
                                                <Typography>{reqdate}</Typography>
                                            </Grid>
                                            <Grid item xl={6} lg={6} >
                                                <Typography>Actual Requirement:</Typography>
                                            </Grid>
                                            <Grid item xl={6} lg={6} >
                                                <Typography>{actual_requirement}</Typography>
                                            </Grid>
                                            <Grid item xl={6} lg={6} >
                                                <Typography>Justification for the need:</Typography>
                                            </Grid>
                                            <Grid item xl={6} lg={6} >
                                                <Typography>{needed}</Typography>
                                            </Grid>
                                            <Grid item xl={6} lg={6} >
                                                <Typography>Location:</Typography>
                                            </Grid>
                                            <Grid item xl={6} lg={6} >
                                                <Typography>{location}</Typography>
                                            </Grid>
                                            <Grid item xl={6} lg={6} >
                                                <Typography>Expected Date:</Typography>
                                            </Grid>
                                            <Grid item xl={6} lg={6} >
                                                <Typography>{expdate}</Typography>
                                            </Grid>
                                            <Grid item xl={6} lg={6} >
                                                <Typography>Incharge Status:</Typography>
                                            </Grid>
                                            <Grid item xl={6} lg={6} >
                                                <Typography>{approve_incharge}</Typography>
                                            </Grid>
                                            <Grid item xl={6} lg={6} >
                                                <Typography>Incharge Remark:</Typography>
                                            </Grid>
                                            <Grid item xl={6} lg={6} >
                                                <Typography>{incharge_remarks}</Typography>
                                            </Grid>
                                            <Grid item xl={6} lg={6} >
                                                <Typography>Hod Status:</Typography>
                                            </Grid>
                                            <Grid item xl={6} lg={6} >
                                                <Typography>{approve_hod}</Typography>
                                            </Grid>
                                            <Grid item xl={6} lg={6} >
                                                <Typography>Hod Remark:</Typography>
                                            </Grid>
                                            <Grid item xl={6} lg={6} >
                                                <Typography>{hod_remarks}</Typography>
                                            </Grid>
                                            <Grid item xl={6} lg={6} >
                                                <Typography>OM Status:</Typography>
                                            </Grid>
                                            <Grid item xl={6} lg={6} >
                                                <Typography>{manag_operation_approvs}</Typography>
                                            </Grid>
                                            <Grid item xl={6} lg={6} >
                                                <Typography>OM Remark:</Typography>
                                            </Grid>
                                            <Grid item xl={6} lg={6} >
                                                <Typography>{manag_operation_remarks}</Typography>
                                            </Grid>
                                            <Grid item xl={6} lg={6} >
                                                <Typography>SMO Status:</Typography>
                                            </Grid>
                                            <Grid item xl={6} lg={6} >
                                                <Typography>{senior_manage_approvs}</Typography>
                                            </Grid>
                                            <Grid item xl={6} lg={6} >
                                                <Typography>SMO Remark:</Typography>
                                            </Grid>
                                            <Grid item xl={6} lg={6} >
                                                <Typography>{senior_manage_remarks}</Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Box>
                                <ApprovalCompnt
                                    heading="CAO/COO/MS Approval"
                                    approve={approve}
                                    reject={reject}
                                    remark={remark}
                                    updateRemark={updateRemark}
                                    updateApprove={updateApprove}
                                    updateReject={updateReject}
                                />
                            </Paper>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button color="secondary" onClick={submit} >Save</Button>
                        <Button onClick={Close} color="secondary" >Cancel</Button>
                    </DialogActions>
                </Dialog>
            </div >
        </Fragment >
    )
}

export default memo(CEOApprovalModel)