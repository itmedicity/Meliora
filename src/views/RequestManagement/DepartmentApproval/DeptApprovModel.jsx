import React, { Fragment, useCallback, useState, memo } from 'react'
import Slide from '@mui/material/Slide';
import { ToastContainer } from 'react-toastify';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { Box, Paper, Typography } from '@mui/material'
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

const DeptApprovModel = ({ open, setOpen, isIncharge, ishod, datas, count, setCount, id }) => {
    const { req_slno, req_date, actual_requirement, needed, location, expected_date, incharge_approve,
        hod_approve, approve_incharge, incharge_remarks, hod_remarks, req_approv_slno, category,
        incharge_apprv_date, inch_user } = datas[0]
    const inchadate = incharge_apprv_date !== null ? format(new Date(incharge_apprv_date), 'dd-MM-yyyy hh:mm:ss') : null
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
    const [pending, setPending] = useState(false)
    const updateApprove = useCallback((e) => {
        if (e.target.checked === true) {
            setApprove(true)
            setReject(false)
            setPending(false)
        }
        else {
            setApprove(false)
            setReject(false)
            setPending(false)
        }
    }, [])
    const updateReject = useCallback((e) => {
        if (e.target.checked === true) {
            setReject(true)
            setApprove(false)
            setPending(false)
        }
        else {
            setApprove(false)
            setReject(false)
            setPending(false)
        }
    }, [])

    const updatePending = useCallback((e) => {
        if (e.target.checked === true) {
            setPending(true)
            setApprove(false)
            setReject(false)
        }
        else {
            setPending(false)
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
            setPending(false)
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
                incharge_approve: approve === true ? 1 : reject === true ? 2 : pending === true ? 3 : null,
                incharge_remarks: remark,
                incharge_apprv_date: format(new Date(), 'yyyy-MM-dd hh:mm:ss'),
                req_approv_slno: req_approv_slno,
                incharge_user: id
            }
            updateInchApproval(patchdatainch)

        } else if (ishod === 1) {
            const patchdatahod = {
                hod_approve: approve === true ? 1 : reject === true ? 2 : pending === true ? 3 : null,
                hod_remarks: remark,
                hod_approve_date: format(new Date(), 'yyyy-MM-dd hh:mm:ss'),
                req_approv_slno: req_approv_slno,
                hod_user: id
            }
            updatehodApproval(patchdatahod)
        }
    }, [approve, reject, pending, remark, isIncharge, ishod, req_approv_slno, count, setCount, setOpen, id])

    // reset 
    const Close = useCallback(() => {
        setOpen(false)
        setApprove(false)
        setReject(false)
        setPending(false)
        setRemark('')
    }, [setOpen])
    return (
        <Fragment>
            <ToastContainer />
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                aria-describedby="alert-dialog-slide-descriptiona"
            >
                < DialogContent id="alert-dialog-slide-descriptiona"
                    sx={{
                        width: 600,
                        height: 540
                    }}
                >
                    < DialogContentText id="alert-dialog-slide-descriptiona">
                        Request Approval
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
                                        sx={{ pr: 4.7 }}>
                                        <Typography sx={{ fontSize: 15 }}>Request No:  {req_slno}</Typography>
                                    </Box>
                                    <Box
                                    >
                                        <Typography sx={{ fontSize: 15 }}>Req.Date: {reqdate}</Typography>
                                    </Box>
                                </Box>
                                {
                                    actual_requirement !== null ? <Box sx={{
                                        width: "100%",
                                        display: "flex",
                                        p: 0.5,
                                        flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                    }}>

                                        <Box
                                            sx={{ width: "25%", }}>
                                            <Typography sx={{ fontSize: 15 }}>Actual Requirement:</Typography>
                                        </Box>
                                        <Paper sx={{
                                            width: "75%", minHeight: 10, maxHeight: 70, pl: 0.5, fontSize: 15,
                                            overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                        }} variant='outlined'>
                                            {actual_requirement}
                                        </Paper>


                                    </Box> : null
                                }
                                {
                                    needed !== null ? <Box sx={{
                                        width: "100%",
                                        display: "flex",
                                        p: 0.5,
                                        flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                    }}>

                                        <Box
                                            sx={{ width: "25%", }}>
                                            <Typography sx={{ fontSize: 15 }}>Justification for need:</Typography>
                                        </Box>
                                        <Paper sx={{
                                            width: '75%', minHeight: 10, maxHeight: 70, pl: 0.5, fontSize: 15,
                                            overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                        }} variant='outlined'>
                                            {needed}
                                        </Paper>
                                    </Box> : null
                                }
                                {location !== null ? <Box sx={{
                                    width: "100%",
                                    display: "flex",
                                    p: 0.5,
                                    flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                }}>

                                    <Box
                                        sx={{ width: "25%", }}>
                                        <Typography sx={{ fontSize: 15 }}>Location:</Typography>
                                    </Box>
                                    <Paper sx={{
                                        width: '75%', minHeight: 10, maxHeight: 70, pl: 0.5, fontSize: 15,
                                        overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                    }} variant='outlined'>
                                        {location}
                                    </Paper>
                                </Box> : null}
                                {category !== null ? <Box sx={{
                                    width: "100%",
                                    display: "flex",
                                    p: 0.5,
                                    flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                }}>

                                    <Box
                                        sx={{ width: "25%", }}>
                                        <Typography sx={{ fontSize: 15 }}>Category:</Typography>
                                    </Box>
                                    <Paper sx={{
                                        width: '75%', minHeight: 10, maxHeight: 70, pl: 0.5, fontSize: 15,
                                        overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                    }} variant='outlined'>
                                        {category}
                                    </Paper>
                                </Box> : null}

                                <Box sx={{
                                    width: "100%",
                                    display: "flex",
                                    p: 0.5, pb: 0,
                                    flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                }}>
                                    <Box
                                        sx={{ pr: 9 }}>
                                        <Typography sx={{ fontSize: 15 }}>Expected Date: {expdate}</Typography>
                                    </Box>
                                </Box>
                                <Box sx={{
                                    width: "100%",
                                    display: "flex",
                                    p: 0.5,
                                    flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                }}>
                                    {tableDis === 1 ? <ItemApprovalCmp
                                        dataPost={dataPost}
                                        setdataPost={setdataPost}

                                    /> : null}

                                </Box>
                            </Box>
                        </Paper>
                    </Box>

                    <Box sx={{ width: "100%", mt: 0, }}>
                        <Paper variant='outlined' sx={{ mt: 1 }} >
                            <Box sx={{
                                width: "100%",
                                display: "flex",
                                flexDirection: 'column',
                            }}>

                                <Box sx={{
                                    width: "100%",
                                    display: "flex",
                                    p: 1,
                                    flexDirection: 'column',
                                }}>
                                    <Box
                                        sx={{ pr: 9 }}>
                                        <Typography sx={{ fontWeight: 900, fontSize: 12 }}>Department Approval</Typography>
                                    </Box>
                                    {
                                        isIncharge === 1 ? <ApprovalCompnt
                                            heading="Incharge Approval"
                                            approve={approve}
                                            reject={reject}
                                            pending={pending}
                                            remark={remark}
                                            updateRemark={updateRemark}
                                            updateApprove={updateApprove}
                                            updateReject={updateReject}
                                            updatePending={updatePending}
                                        />
                                            : ishod === 1 ? <Box sx={{ width: "100%" }}>
                                                <Box sx={{
                                                    width: "100%",
                                                    display: "flex",
                                                    flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'column', xl: 'column', },
                                                }}>

                                                    <Box
                                                        sx={{
                                                            // pl: 1,
                                                            display: "flex",
                                                            flexDirection: 'row',
                                                            justifyContent: "space-between"
                                                        }}>

                                                        <Typography sx={{ fontSize: 15 }}>Incharge: {approve_incharge} </Typography>
                                                        {
                                                            inchadate !== null ? <Box
                                                                sx={{
                                                                    display: "flex",
                                                                    flexDirection: 'row',
                                                                    justifyContent: "space-evenly",
                                                                    pr: 2
                                                                }}>
                                                                <Typography sx={{ fontSize: 13, pr: 0.5 }}>{inchadate !== null ? inchadate : "Not Update"}</Typography>
                                                                <Typography sx={{ fontSize: 13, textTransform: "capitalize" }}>  /  {inch_user !== null ? inch_user.toLowerCase() : null} </Typography>
                                                            </Box> : null
                                                        }

                                                    </Box>

                                                    <Paper sx={{
                                                        width: '100%', height: 50, fontSize: 15, pl: 0.5,
                                                        overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                                    }} variant='outlined'>
                                                        {incharge_remarks}
                                                    </Paper>
                                                </Box>
                                                <ApprovalCompnt
                                                    heading="Hod Approval"
                                                    approve={approve}
                                                    reject={reject}
                                                    pending={pending}
                                                    remark={remark}
                                                    updateRemark={updateRemark}
                                                    updateApprove={updateApprove}
                                                    updateReject={updateReject}
                                                    updatePending={updatePending}
                                                />

                                            </Box> : null
                                    }

                                </Box>
                            </Box>
                        </Paper>
                    </Box>

                </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={submit} >Save</Button>
                    <Button onClick={Close} color="secondary" >Cancel</Button>
                </DialogActions>
            </Dialog >
        </Fragment >
    )
}

export default memo(DeptApprovModel)