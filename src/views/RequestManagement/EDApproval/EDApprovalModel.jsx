import React, { Fragment, useCallback, useState, memo } from 'react'
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
import { useEffect } from 'react';
import ItemApprovalCmp from '../DepartmentApproval/ItemApprovalCmp';
import _ from 'underscore'
import { useSelector } from 'react-redux'
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

const EDApprovalModel = ({ open, setOpen, datas, count, setCount }) => {

    const { req_slno, req_date, actual_requirement, needed, location, expected_date, approve_incharge,
        incharge_remarks, hod_remarks, req_approv_slno, approve_hod, manag_operation_approvs,
        manag_operation_remarks, senior_manage_approvs, senior_manage_remarks, cao_approves, category,
        cao_approve_remarks, incharge_apprv_date, om_approv_date, cao_user,
        hod_approve_date, som_aprrov_date, inch_user, hod_user, om_user, smo_user, cao_approv_date } = datas[0]

    const reqdate = req_date !== null ? format(new Date(req_date), 'dd-MM-yyyy') : null
    const expdate = expected_date !== null ? format(new Date(expected_date), 'dd-MM-yyyy') : null
    const inchadate = incharge_apprv_date !== null ? format(new Date(incharge_apprv_date), 'dd-MM-yyyy hh:mm:ss') : null
    const hoddate = hod_approve_date !== null ? format(new Date(hod_approve_date), 'dd-MM-yyyy hh:mm:ss') : null
    const omdate = om_approv_date !== null ? format(new Date(om_approv_date), 'dd-MM-yyyy hh:mm:ss') : null
    const smodate = som_aprrov_date !== null ? format(new Date(som_aprrov_date), 'dd-MM-yyyy hh:mm:ss') : null
    const caodate = cao_approv_date !== null ? format(new Date(cao_approv_date), 'dd-MM-yyyy hh:mm:ss') : null
    //redux for geting login id
    const id = useSelector((state) => state.LoginUserData.empid, _.isEqual)
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

    const patchdataED = useMemo(() => {
        return {
            ed_approve: approve === true ? 1 : reject === true ? 2 : pending === true ? 3 : null,
            ed_approve_remarks: remark,
            ed_approve_date: format(new Date(), 'yyyy-MM-dd hh:mm:ss'),
            ed_user: id,
            req_approv_slno: req_approv_slno
        }
    }, [approve, reject, pending, remark, id, req_approv_slno])

    const submit = useCallback((e) => {
        e.preventDefault();
        const reset = () => {
            setOpen(false)
            setApprove(false)
            setReject(false)
            setPending(false)
            setRemark('')
        }
        const updateInchApproval = async (patchdataED) => {
            const result = await axioslogin.patch('/requestRegister/approval/ed', patchdataED);
            const { success, message } = result.data;
            if (success === 2) {
                succesNotify(message)
                setCount(count + 1)
                reset()
            }
        }
        updateInchApproval(patchdataED)
    }, [patchdataED, setCount, count, setOpen])
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
                        height: "100%",
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
                                        sx={{ pr: 4.6 }}>
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
                    <Box sx={{ width: "100%", mt: 0 }}>
                        <Paper variant='outlined' sx={{ mt: 1 }} >
                            <Box sx={{
                                width: "100%",
                                display: "flex",
                                flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'column', xl: 'column', },
                            }}>
                                <Box sx={{
                                    width: "100%",
                                    display: "flex",
                                    pl: 0.2, pr: 0.5,
                                    flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                }}>
                                    <Box
                                        sx={{ pr: 9, pl: 0.6 }}>
                                        <Typography sx={{ fontWeight: 900, fontSize: 12 }}>Department Approval</Typography>
                                    </Box>

                                </Box>
                                <Box sx={{
                                    width: "100%",
                                    display: "flex",
                                    pl: 1, pr: 0.5, pt: 0.4,
                                    flexDirection: 'column'
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
                                <Box sx={{
                                    width: "100%",
                                    display: "flex",
                                    pl: 1, pr: 0.5, pb: 1, pt: 0.8,
                                    flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'column', xl: 'column', },
                                }}>
                                    <Box
                                        sx={{
                                            // pl: 1,
                                            display: "flex",
                                            flexDirection: 'row',
                                            justifyContent: "space-between"
                                        }}>
                                        <Typography sx={{ fontSize: 15 }}>HOD: {approve_hod}</Typography>
                                        {
                                            hoddate !== null ? <Box
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: 'row',
                                                    justifyContent: "space-evenly",
                                                    pr: 2
                                                }}>
                                                <Typography sx={{ fontSize: 13, pr: 0.5 }}>{hoddate !== null ? hoddate : "Not Update"}</Typography>
                                                <Typography sx={{ fontSize: 13, textTransform: "capitalize" }}>  /  {hod_user !== null ? hod_user.toLowerCase() : null} </Typography>
                                            </Box> : null
                                        }

                                    </Box>
                                    <Paper sx={{
                                        width: '100%', height: 50, fontSize: 15, pl: 0.5,
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
                                    pl: 1, pr: 0.5, pt: 0.6,
                                    flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'column', xl: 'column', },
                                }}>
                                    <Box
                                        sx={{
                                            // pl: 1,
                                            display: "flex",
                                            flexDirection: 'row',
                                            justifyContent: "space-between"
                                        }}>
                                        <Typography sx={{ fontSize: 15 }}>Operation Manager: {manag_operation_approvs}</Typography>
                                        {
                                            omdate !== null ? <Box
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: 'row',
                                                    justifyContent: "space-evenly",
                                                    pr: 2
                                                }}>
                                                <Typography sx={{ fontSize: 13, pr: 0.5 }}>{omdate !== null ? omdate : "Not Update"}</Typography>
                                                <Typography sx={{ fontSize: 13, textTransform: "capitalize" }}>  /  {om_user !== null ? om_user.toLowerCase() : null} </Typography>
                                            </Box> : null
                                        }

                                    </Box>

                                    <Paper sx={{
                                        width: '100%', height: 50, pl: 0.5, fontSize: 15,
                                        overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                    }} variant='outlined'>
                                        {manag_operation_remarks}
                                    </Paper>
                                </Box>
                                <Box sx={{
                                    width: "100%",
                                    display: "flex",
                                    pl: 1, pr: 0.5, pt: 0.7,
                                    flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'column', xl: 'column', },
                                }}>
                                    <Box
                                        sx={{
                                            // pl: 1,
                                            display: "flex",
                                            flexDirection: 'row',
                                            justifyContent: "space-between"
                                        }}>
                                        <Typography sx={{ fontSize: 15 }}>Senior Manager Operation: {senior_manage_approvs}</Typography>
                                        {
                                            smodate !== null ? <Box
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: 'row',
                                                    justifyContent: "space-evenly",
                                                    pr: 2
                                                }}>
                                                <Typography sx={{ fontSize: 13, pr: 0.5 }}>{smodate !== null ? smodate : "Not Update"}</Typography>
                                                <Typography sx={{ fontSize: 13, textTransform: "capitalize" }}>  /  {smo_user !== null ? smo_user.toLowerCase() : null} </Typography>
                                            </Box> : null
                                        }

                                    </Box>

                                    <Paper sx={{
                                        width: '100%', height: 50, pl: 0.5, fontSize: 15,
                                        overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                    }} variant='outlined'>
                                        {senior_manage_remarks}
                                    </Paper>
                                </Box>

                                <Box sx={{
                                    width: "100%",
                                    display: "flex",
                                    pl: 1, pr: 0.5, pt: 0.7,
                                    flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'column', xl: 'column', },
                                }}>
                                    <Box
                                        sx={{
                                            // pl: 1,
                                            display: "flex",
                                            flexDirection: 'row',
                                            justifyContent: "space-between"
                                        }}>
                                        <Typography sx={{ fontSize: 15 }}>CAO/COO/MS: {cao_approves}</Typography>
                                        {
                                            caodate !== null ? <Box
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: 'row',
                                                    justifyContent: "space-evenly",
                                                    pr: 2
                                                }}>
                                                <Typography sx={{ fontSize: 13, pr: 0.5 }}>{caodate !== null ? caodate : "Not Update"}</Typography>
                                                <Typography sx={{ fontSize: 13, textTransform: "capitalize" }}>  /  {cao_user !== null ? cao_user.toLowerCase() : null} </Typography>
                                            </Box> : null
                                        }

                                    </Box>

                                    <Paper sx={{
                                        width: '100%', height: 50, pl: 0.5, fontSize: 15,
                                        overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                    }} variant='outlined'>
                                        {cao_approve_remarks}
                                    </Paper>
                                </Box>

                                <Box
                                    sx={{
                                        pl: 1, pr: 0.5, pt: 0.3
                                    }}>

                                    <ApprovalCompnt
                                        heading="ED/MD Approval"
                                        approve={approve}
                                        reject={reject}
                                        pending={pending}
                                        remark={remark}
                                        updateRemark={updateRemark}
                                        updateApprove={updateApprove}
                                        updateReject={updateReject}
                                        updatePending={updatePending}
                                    />

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
        </Fragment >
    )
}

export default memo(EDApprovalModel)