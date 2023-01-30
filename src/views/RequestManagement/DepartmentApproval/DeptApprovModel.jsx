import React, { Fragment, useCallback, useState, memo } from 'react'
import Slide from '@mui/material/Slide';
import { ToastContainer } from 'react-toastify';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { Box, Grid, Paper, Typography } from '@mui/material'
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import ApprovalCompnt from './ApprovalCompnt';
import { format } from 'date-fns'
import { axioslogin } from 'src/views/Axios/Axios'
import { succesNotify } from 'src/views/Common/CommonCode'
import { useEffect } from 'react';
import ItemApprovalCmp from './ItemApprovalCmp';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

const DeptApprovModel = ({ open, setOpen, isIncharge, ishod, datas, count, setCount }) => {
    const { req_slno, req_date, actual_requirement, needed, location, expected_date, incharge_approve,
        hod_approve, approve_incharge, incharge_remarks, hod_remarks, req_approv_slno } = datas[0]
    useEffect(() => {
        if ((incharge_approve !== null) && (isIncharge === 1)) {
            setRemark(incharge_remarks)
            setApprove(incharge_approve === 1 ? true : false)
            setReject(incharge_approve === 0 ? true : false)
        }
        else if ((hod_approve !== null) && (ishod === 1)) {
            setRemark(hod_remarks)
            setApprove(hod_approve === 1 ? true : false)
            setReject(hod_approve === 0 ? true : false)
        }
    }, [incharge_approve, hod_approve, hod_remarks, incharge_remarks, isIncharge, ishod])

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

    const [dataPost, setdataPost] = useState([])
    const [tableDis, setTableDis] = useState(0)
    useEffect(() => {
        const InsertFun = async (req_slno) => {
            const result = await axioslogin.get(`/requestRegister/getItemList/${req_slno}`)
            const { success, data } = result.data
            if (success === 1) {
                setdataPost(data)
                setTableDis(1)
            }
            else {
                setTableDis(0)
            }
        }
        InsertFun(req_slno)
    }, [req_slno])


    const submit = useCallback((e) => {
        e.preventDefault();
        const reset = () => {
            setOpen(false)
            setApprove(false)
            setReject(false)
            setRemark('')
        }
        const updateInchApproval = async (patchdatainch) => {
            const result = await axioslogin.patch('/requestRegister/approval/incharge', patchdatainch);
            const { success, message } = result.data;
            if (success === 2) {
                succesNotify(message)
                setCount(count + 1)
                reset()
            }
        }
        const updatehodApproval = async (patchdatahod) => {
            const result = await axioslogin.patch('/requestRegister/approval/hod', patchdatahod);
            const { success, message } = result.data;
            if (success === 2) {
                succesNotify(message)
                setCount(count + 1)
                reset()
            }
        }

        if (isIncharge === 1) {
            const patchdatainch = {
                incharge_approve: approve === true ? 1 : 0,
                incharge_remarks: remark,
                incharge_apprv_date: format(new Date(), 'yyyy-MM-dd hh:mm:ss'),
                req_approv_slno: req_approv_slno
            }
            updateInchApproval(patchdatainch)

        } else if (ishod === 1) {
            const patchdatahod = {
                hod_approve: approve === true ? 1 : 0,
                hod_remarks: remark,
                hod_approve_date: format(new Date(), 'yyyy-MM-dd hh:mm:ss'),
                req_approv_slno: req_approv_slno
            }
            updatehodApproval(patchdatahod)
        }
    }, [approve, remark, isIncharge, ishod, req_approv_slno, count, setCount, setOpen])

    // reset 
    const Close = useCallback(() => {
        setOpen(false)
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
                            width: "100%",
                            height: "100%",
                            pb: 2
                        }}
                    >
                        < DialogContentText id="alert-dialog-slide-descriptiona">
                            Requst Approval
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
                                        </Grid>
                                    </Grid>
                                </Box>
                                <Box sx={{ pl: 2, pr: 2 }}>
                                    {tableDis === 1 ? <ItemApprovalCmp
                                        dataPost={dataPost}
                                        setdataPost={setdataPost}

                                    /> : null}

                                </Box>

                                <Box sx={{ pl: 2, pr: 2 }}>



                                    {
                                        isIncharge === 1 ? <ApprovalCompnt
                                            heading="Incharge Approval"
                                            approve={approve}
                                            reject={reject}
                                            remark={remark}
                                            updateRemark={updateRemark}
                                            updateApprove={updateApprove}
                                            updateReject={updateReject}
                                        />
                                            : ishod === 1 ? <Box sx={{ width: "100%" }}>
                                                <Box sx={{ pl: 2, pt: 2, pb: 2 }}>
                                                    <Grid item xl={12} lg={12} md={12} sm={12}>
                                                        <Grid container spacing={2}>
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
                                                        </Grid>
                                                    </Grid>
                                                </Box>
                                                <ApprovalCompnt
                                                    heading="Hod Approval"
                                                    approve={approve}
                                                    reject={reject}
                                                    remark={remark}
                                                    updateRemark={updateRemark}
                                                    updateApprove={updateApprove}
                                                    updateReject={updateReject}
                                                />
                                            </Box> : null
                                    }
                                </Box>
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

export default memo(DeptApprovModel)