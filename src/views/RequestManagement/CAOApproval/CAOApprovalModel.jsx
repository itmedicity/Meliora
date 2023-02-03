import React, { Fragment, useCallback, useState, memo, useEffect } from 'react'
import Slide from '@mui/material/Slide';
import { ToastContainer } from 'react-toastify';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { Box, Paper, Typography } from '@mui/material'
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { format } from 'date-fns'
import { axioslogin } from 'src/views/Axios/Axios'
import { succesNotify } from 'src/views/Common/CommonCode'
import ApprovalCompnt from '../DepartmentApproval/ApprovalCompnt';
import { useMemo } from 'react';
import CusCheckBox from 'src/views/Components/CusCheckBox';
import ItemApprovalCmp from '../DepartmentApproval/ItemApprovalCmp';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

const CEOApprovalModel = ({ open, setOpen, datas, count, setCount }) => {

    const { req_slno, req_date, actual_requirement, needed, location, expected_date, approve_incharge,
        incharge_remarks, hod_remarks, req_approv_slno, approve_hod, manag_operation_approvs,
        manag_operation_remarks, senior_manage_approvs, senior_manage_remarks, cao_approve,
        cao_approve_remarks, ed_approve_req } = datas[0]

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
    const [edapprov, setedapprov] = useState(false)
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


    const updateedapprov = useCallback((e) => {
        if (e.target.checked === true) {
            setedapprov(true)
        }
        else {
            setedapprov(false)
        }

    }, [])

    useEffect(() => {
        if (cao_approve !== null) {
            setRemark(cao_approve_remarks)
            setApprove(cao_approve === 1 ? true : false)
            setReject(cao_approve === 2 ? true : false)
            setPending(cao_approve === 3 ? true : false)
            setedapprov(ed_approve_req === 1 ? true : false)
        }
        else {
            setRemark('')
            setPending(false)
            setApprove(false)
            setReject(false)
            setedapprov(false)
        }
    }, [cao_approve, req_slno, cao_approve_remarks, ed_approve_req])

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


    const patchdataCEO = useMemo(() => {
        return {
            cao_approve: approve === true ? 1 : reject === true ? 2 : pending === true ? 3 : null,
            cao_approve_remarks: remark,
            cao_approv_date: format(new Date(), 'yyyy-MM-dd hh:mm:ss'),
            req_approv_slno: req_approv_slno,
            ed_approve_req: edapprov === true ? 1 : 0
        }
    }, [approve, remark, reject, pending, req_approv_slno, edapprov])

    const submit = useCallback((e) => {
        e.preventDefault();
        const reset = () => {
            setOpen(false)
            setApprove(false)
            setReject(false)
            setPending(false)
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
        setPending(false)
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
                            height: 600,
                            pb: 2
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
                                            sx={{ pr: 4 }}>
                                            <Typography>Request No:  {req_slno}</Typography>
                                        </Box>
                                        <Box
                                        >
                                            <Typography>Req.Date: {reqdate}</Typography>
                                        </Box>
                                    </Box>

                                    <Box sx={{
                                        width: "100%",
                                        display: "flex",
                                        p: 0.5,
                                        flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                    }}>

                                        <Box
                                            sx={{ pr: 3 }}>
                                            <Typography>Actual Requirement:</Typography>
                                        </Box>
                                        <Paper sx={{
                                            width: '100%', height: 50,
                                            overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                        }} variant='outlined'>
                                            {actual_requirement}
                                        </Paper>


                                    </Box>
                                    <Box sx={{
                                        width: "100%",
                                        display: "flex",
                                        p: 0.5,
                                        flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                    }}>

                                        <Box
                                            sx={{ pr: 3 }}>
                                            <Typography>Justification for need:</Typography>
                                        </Box>
                                        <Paper sx={{
                                            width: '100%', height: 50,
                                            overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                        }} variant='outlined'>
                                            {needed}
                                        </Paper>


                                    </Box>
                                    <Box sx={{
                                        width: "100%",
                                        display: "flex",
                                        p: 0.5,
                                        flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                    }}>

                                        <Box
                                            sx={{ pr: 9 }}>
                                            <Typography>Location:</Typography>
                                        </Box>
                                        <Paper sx={{
                                            width: '100%', height: 50,
                                            overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                        }} variant='outlined'>
                                            {location}
                                        </Paper>
                                    </Box>
                                    <Box sx={{
                                        width: "100%",
                                        display: "flex",
                                        p: 0.5,
                                        flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                    }}>
                                        <Box
                                            sx={{ pr: 9 }}>
                                            <Typography>Expected Date: {expdate}</Typography>
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
                                        pl: 1, pr: 0.5,
                                        flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                    }}>
                                        <Box
                                            sx={{ pr: 9 }}>
                                            <Typography>Department Approval</Typography>
                                        </Box>

                                    </Box>
                                    <Box sx={{
                                        width: "100%",
                                        display: "flex",
                                        pl: 1, pr: 0.5,
                                        flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'column', xl: 'column', },
                                    }}>
                                        <Box
                                            sx={{ pr: 9 }}>
                                            <Typography>Incharge: {approve_incharge}</Typography>
                                        </Box>

                                        <Paper sx={{
                                            width: '100%', height: 50,
                                            overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                        }} variant='outlined'>
                                            {incharge_remarks}
                                        </Paper>
                                    </Box>
                                    <Box sx={{
                                        width: "100%",
                                        display: "flex",
                                        pl: 1, pr: 0.5, pb: 1,
                                        flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'column', xl: 'column', },
                                    }}>
                                        <Box
                                            sx={{ pr: 9 }}>
                                            <Typography>HOD: {approve_hod}</Typography>
                                        </Box>

                                        <Paper sx={{
                                            width: '100%', height: 50,
                                            overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                        }} variant='outlined'>
                                            {hod_remarks}
                                        </Paper>
                                    </Box>
                                </Box>
                            </Paper>
                        </Box>

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
                                        pl: 1, pr: 0.5,
                                        flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'column', xl: 'column', },
                                    }}>
                                        <Box
                                            sx={{ pr: 9 }}>
                                            <Typography>Operation Manager: {manag_operation_approvs}</Typography>
                                        </Box>

                                        <Paper sx={{
                                            width: '100%', height: 50,
                                            overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                        }} variant='outlined'>
                                            {manag_operation_remarks}
                                        </Paper>
                                    </Box>
                                    <Box sx={{
                                        width: "100%",
                                        display: "flex",
                                        pl: 1, pr: 0.5,
                                        flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'column', xl: 'column', },
                                    }}>
                                        <Box
                                            sx={{ pr: 9 }}>
                                            <Typography>Senior Manager Operation: {senior_manage_approvs}</Typography>
                                        </Box>

                                        <Paper sx={{
                                            width: '100%', height: 50,
                                            overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                        }} variant='outlined'>
                                            {senior_manage_remarks}
                                        </Paper>
                                    </Box>
                                    <ApprovalCompnt
                                        heading="CAO/COO/MS Approval"
                                        approve={approve}
                                        reject={reject}
                                        pending={pending}
                                        remark={remark}
                                        updateRemark={updateRemark}
                                        updateApprove={updateApprove}
                                        updateReject={updateReject}
                                        updatePending={updatePending}
                                    />
                                    <Box sx={{
                                        width: "100%",
                                        display: "flex",
                                        flexDirection: "row",
                                        pl: 2, pt: 0
                                    }}>
                                        <Box sx={{ width: "100%", mt: 1 }}>
                                            <CusCheckBox
                                                label="ED Approval Needed"
                                                color="primary"
                                                size="md"
                                                name="edapprov"
                                                value={edapprov}
                                                checked={edapprov}
                                                onCheked={updateedapprov}
                                            />
                                        </Box>
                                    </Box>
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

export default memo(CEOApprovalModel)