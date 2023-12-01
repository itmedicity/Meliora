import React, { Fragment, useCallback, useState, memo, useMemo, useEffect } from 'react'
import Slide from '@mui/material/Slide';
import { ToastContainer } from 'react-toastify';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { Box, Paper } from '@mui/material'
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { format } from 'date-fns'
import { axioslogin } from 'src/views/Axios/Axios'
import { succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import ApprovalCompnt from '../DepartmentApprovals/ApprovalCompnt';
import _ from 'underscore'
import { useSelector } from 'react-redux'
import { CssVarsProvider, Typography } from '@mui/joy'
import Divider from '@mui/material/Divider';
import { TypoHeadColor } from 'src/color/Color'
import CRFDataItemOrginal from '../CRFDataCollection/CRFDataItemOrginal';
import CRFDataCollectAfter from '../CRFDataCollection/CRFDataCollectAfter';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});


const MDApproveModal = ({ open, setOpen, datas, count, setCount }) => {

    const { req_slno, req_date, actual_requirement, needed, location, expected_date, approve_incharge,
        incharge_remarks, hod_remarks, req_approv_slno, approve_hod, manag_operation_approvs,
        manag_operation_remarks, senior_manage_approvs, senior_manage_remarks, cao_approves, category,
        cao_approve_remarks, incharge_apprv_date, om_approv_date, cao_user, cao_approve,
        hod_approve_date, som_aprrov_date, inch_user, hod_user, om_user, smo_user, cao_approv_date
        , incharge_approve, manag_operation_approv, ed_approve,
        inch_detial_analysis, hod_detial_analysis, incharge_req, hod_approve, ed_approve_req,
        hod_req, om_detial_analysis, smo_detial_analysis, senior_manage_approv, ceo_detial_analysis } = datas[0]

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

    const [rejectremark, setRejectRemark] = useState('')
    const updateRejectRemark = useCallback((e) => {
        setRejectRemark(e.target.value)
    }, [])
    const [holdremark, setHoldRemark] = useState('')
    const updateHoldRemark = useCallback((e) => {
        setHoldRemark(e.target.value)
    }, [])
    const [detailAnalis, setDetailAnalis] = useState('')
    const updatedetailAnalis = useCallback((e) => {
        setDetailAnalis(e.target.value)
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

    useEffect(() => {
        if (ed_approve !== null) {
            setRemark(cao_approve_remarks)
            setApprove(ed_approve === 1 ? true : false)
            setReject(ed_approve === 2 ? true : false)
            setPending(ed_approve === 3 ? true : false)
            setRejectRemark(ed_approve === 2 ? cao_approve_remarks : null)
            setHoldRemark(ed_approve === 3 ? cao_approve_remarks : null)
            setDetailAnalis(ed_approve === 1 ? ceo_detial_analysis : null)
        }
        else {
            setRemark('')
            setPending(false)
            setApprove(false)
            setReject(false)
            setRejectRemark('')
            setHoldRemark('')
            setDetailAnalis('')
        }
    }, [ed_approve, req_slno, cao_approve_remarks, ed_approve_req, ceo_detial_analysis])
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
            md_approve: approve === true ? 1 : reject === true ? 2 : pending === true ? 3 : null,
            md_approve_remarks: approve === true ? remark : reject === true ? rejectremark : pending === true ? holdremark : null,
            md_detial_analysis: approve === true ? detailAnalis : null,
            md_approve_date: format(new Date(), 'yyyy-MM-dd hh:mm:ss'),
            md_user: id,
            req_approv_slno: req_approv_slno,
            req_slno: req_slno
        }
    }, [approve, reject, pending, remark, rejectremark, holdremark, id, req_slno, detailAnalis, req_approv_slno])

    const submit = useCallback((e) => {
        e.preventDefault();
        const reset = () => {
            setOpen(false)
            setApprove(false)
            setReject(false)
            setPending(false)
            setRemark('')
            setRejectRemark('')
            setHoldRemark('')
            setDetailAnalis('')
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
        if (approve !== false || reject !== false || pending !== false) {
            if (detailAnalis !== '' && (remark !== '' || rejectremark !== '' || holdremark !== '')) {
                updateInchApproval(patchdataED)
            }
            else {
                warningNotify("Detail Analysis must be Entered")
            }
        } else {
            warningNotify("Please Select any status")
        }

    }, [patchdataED, setCount, count, setOpen, remark, detailAnalis, rejectremark, holdremark, reject
        , approve, pending,])
    // reset 
    const Close = useCallback(() => {
        setOpen(false)
        setApprove(false)
        setReject(false)
        setPending(false)
        setRemark('')
        setRejectRemark('')
        setHoldRemark('')
        setDetailAnalis('')
    }, [setOpen])
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
                                        sx={{ pr: 8 }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15 }}>Request No:  {req_slno}</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ pl: 6.7 }}                                    >
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15 }}>Req.Date: {reqdate}</Typography>
                                        </CssVarsProvider>
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
                                            <CssVarsProvider>
                                                <Typography sx={{ fontSize: 15 }}>Actual Requirement:</Typography>
                                            </CssVarsProvider>
                                        </Box>
                                        <Paper sx={{
                                            width: "75%", minHeight: 10, maxHeight: 70, pl: 0.5, fontSize: 15,
                                            overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                        }} variant='none'>
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
                                            <CssVarsProvider>
                                                <Typography sx={{ fontSize: 15 }}>Justification for need:</Typography>
                                            </CssVarsProvider>
                                        </Box>
                                        <Paper sx={{
                                            width: '75%', minHeight: 10, maxHeight: 70, pl: 0.5, fontSize: 15,
                                            overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                        }} variant='none'>
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
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15 }}>Location:</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Paper sx={{
                                        width: '75%', minHeight: 10, maxHeight: 70, pl: 0.5, fontSize: 15,
                                        overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                    }} variant='none'>
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
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15 }}>Category:</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Paper sx={{
                                        width: '75%', minHeight: 10, maxHeight: 70, pl: 0.5, fontSize: 15,
                                        overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                    }} variant='none'>
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
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15 }}>Expected Date: {expdate}</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                </Box>

                                <Box sx={{
                                    width: "100%",
                                    display: "flex",
                                    p: 0.5,
                                    flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                }}>
                                    {tableDis === 1 ?
                                        <Box sx={{
                                            width: "100%",
                                            display: "flex",
                                            p: 0.5, pb: 0,
                                            flexDirection: "column",
                                        }}>
                                            <Box
                                                sx={{ pr: 9 }}>
                                                <CssVarsProvider>
                                                    <Typography sx={{ fontSize: 15 }}>Requested data</Typography>
                                                </CssVarsProvider>
                                            </Box>

                                            <CRFDataItemOrginal
                                                dataPost={dataPost}
                                            />
                                            <Box
                                                sx={{ pr: 9 }}>
                                                <CssVarsProvider>
                                                    <Typography sx={{ fontSize: 15 }}>After Data Collection</Typography>
                                                </CssVarsProvider>
                                            </Box>
                                            <CRFDataCollectAfter
                                                reqslno={req_slno}
                                            />
                                        </Box>

                                        : null}

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
                                        sx={{ pr: 9 }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontWeight: 900, fontSize: 14, color: TypoHeadColor }} >Department Approval</Typography>
                                        </CssVarsProvider>
                                    </Box>

                                </Box>
                                {
                                    hod_req === 1 ? <Box>

                                        {incharge_req === 1 ?
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

                                                    <CssVarsProvider>
                                                        <Typography sx={{ fontSize: 16, fontWeight: 600 }} >Incharge :
                                                            {
                                                                incharge_approve === 1 ?
                                                                    <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="success" variant="outlined"> {approve_incharge}
                                                                    </Typography> : incharge_approve === 2 ?
                                                                        <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="danger" variant="outlined"> {approve_incharge}
                                                                        </Typography> : incharge_approve === 3 ?
                                                                            <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="primary" variant="outlined"> {approve_incharge}
                                                                            </Typography> : null
                                                            }
                                                        </Typography>
                                                    </CssVarsProvider>
                                                    {
                                                        inchadate !== null ? <Box
                                                            sx={{
                                                                display: "flex",
                                                                flexDirection: 'row',
                                                                justifyContent: "space-evenly",
                                                                pr: 2
                                                            }}>
                                                            <CssVarsProvider>
                                                                <Typography ml={2} mb={0.5} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }}>{inchadate !== null ? inchadate : "Not Update"}</Typography>
                                                                <Typography ml={2} sx={{ fontSize: 15 }} >/ </Typography>
                                                                <Typography ml={2} mb={0.5} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, textTransform: "capitalize" }}>    {inch_user !== null ? inch_user.toLowerCase() : null} </Typography>
                                                            </CssVarsProvider>   </Box> : null
                                                    }
                                                </Box>
                                                {
                                                    incharge_approve === 1 ? <Box sx={{ width: "100%" }}>
                                                        <CssVarsProvider>
                                                            <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification/ Requirement Description: </Typography>
                                                            <Typography ml={10} sx={{ fontSize: 15 }} >{incharge_remarks} </Typography>
                                                        </CssVarsProvider>
                                                        <CssVarsProvider>
                                                            <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detailed Analysis of Requirement: </Typography>
                                                            <Typography ml={10} sx={{ fontSize: 15 }} >{inch_detial_analysis} </Typography>
                                                        </CssVarsProvider> </Box> :
                                                        incharge_approve === 2 ? <Box sx={{ width: "100%" }}>
                                                            <CssVarsProvider>
                                                                <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification for Reject: </Typography>
                                                                <Typography ml={10} sx={{ fontSize: 15 }} >{incharge_remarks} </Typography>
                                                            </CssVarsProvider>
                                                        </Box> :
                                                            incharge_approve === 3 ? <Box sx={{ width: "100%" }}>
                                                                <CssVarsProvider>
                                                                    <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification for On-Hold: </Typography>
                                                                    <Typography ml={10} sx={{ fontSize: 15 }} >{incharge_remarks} </Typography>
                                                                </CssVarsProvider>
                                                            </Box> : null
                                                }
                                            </Box> : <Box>
                                                <CssVarsProvider>
                                                    <Typography ml={10} sx={{ fontSize: 15, fontWeight: 500 }} >Requested By Incharge </Typography>
                                                </CssVarsProvider>
                                            </Box>
                                        }

                                        <Divider
                                            // variant="middle"
                                            sx={{ my: 0.8 }} />
                                        <Box sx={{
                                            width: "100%",
                                            display: "flex",
                                            pl: 1, pr: 0.5, pb: 0.5,
                                            flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'column', xl: 'column', },
                                        }}>
                                            <Box
                                                sx={{
                                                    // pl: 1,
                                                    display: "flex",
                                                    flexDirection: 'row',
                                                    justifyContent: "space-between"
                                                }}>
                                                <CssVarsProvider>
                                                    <Typography sx={{ fontSize: 16, fontWeight: 600 }} >Head Of the Department :
                                                        {
                                                            hod_approve === 1 ?
                                                                <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="success" variant="outlined"> {approve_hod}
                                                                </Typography> : hod_approve === 2 ?
                                                                    <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="danger" variant="outlined"> {approve_hod}
                                                                    </Typography> : hod_approve === 3 ?
                                                                        <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="primary" variant="outlined"> {approve_hod}
                                                                        </Typography> : null
                                                        }
                                                    </Typography>
                                                </CssVarsProvider>
                                                {
                                                    hoddate !== null ? <Box
                                                        sx={{
                                                            display: "flex",
                                                            flexDirection: 'row',
                                                            justifyContent: "space-evenly",
                                                            pr: 2
                                                        }}>
                                                        <CssVarsProvider>
                                                            <Typography ml={2} mb={0.5} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }}>{hoddate !== null ? hoddate : "Not Update"}</Typography>
                                                            <Typography ml={2} sx={{ fontSize: 15 }} >/ </Typography>
                                                            <Typography ml={2} mb={0.5} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, textTransform: "capitalize" }}>    {hod_user !== null ? hod_user.toLowerCase() : null} </Typography>
                                                        </CssVarsProvider>   </Box> : null
                                                }

                                            </Box>
                                            {
                                                hod_approve === 1 ? <Box sx={{ width: "100%" }}>
                                                    <CssVarsProvider>
                                                        <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification/ Requirement Description: </Typography>
                                                        <Typography ml={10} sx={{ fontSize: 15 }} >{hod_remarks} </Typography>
                                                    </CssVarsProvider>
                                                    <CssVarsProvider>
                                                        <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detailed Analysis of Requirement: </Typography>
                                                        <Typography ml={10} sx={{ fontSize: 15 }} >{hod_detial_analysis} </Typography>
                                                    </CssVarsProvider> </Box> :
                                                    hod_approve === 2 ? <Box sx={{ width: "100%" }}>
                                                        <CssVarsProvider>
                                                            <Typography sx={{ fontSize: 15 }} >Detail Justification for Reject: </Typography>
                                                            <Typography ml={10} sx={{ fontSize: 15, fontWeight: 600 }} >{hod_remarks} </Typography>
                                                        </CssVarsProvider>
                                                    </Box> :
                                                        hod_approve === 3 ? <Box sx={{ width: "100%" }}>
                                                            <CssVarsProvider>
                                                                <Typography sx={{ fontSize: 15 }} >Detail Justification for On-Hold: </Typography>
                                                                <Typography ml={10} sx={{ fontSize: 15, fontWeight: 600 }} >{hod_remarks} </Typography>
                                                            </CssVarsProvider>
                                                        </Box> : null
                                            }
                                        </Box>
                                    </Box>
                                        : <Box>
                                            <CssVarsProvider>
                                                <Typography ml={10} sx={{ fontSize: 15, fontWeight: 500 }} >Requested By Head Of The Department </Typography>
                                            </CssVarsProvider>
                                        </Box>
                                }
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
                                    pl: 1, pr: 0.5, pt: 0.5,
                                    flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'column', xl: 'column', },
                                }}>
                                    <Box
                                        sx={{
                                            // pl: 1,
                                            display: "flex",
                                            flexDirection: 'row',
                                            justifyContent: "space-between"
                                        }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 16, fontWeight: 600 }} >Operation Managers:
                                                {
                                                    manag_operation_approv === 1 ?
                                                        <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="success" variant="outlined"> {manag_operation_approvs}
                                                        </Typography> : manag_operation_approv === 2 ?
                                                            <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="danger" variant="outlined"> {manag_operation_approvs}
                                                            </Typography> : manag_operation_approv === 3 ?
                                                                <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="primary" variant="outlined"> {manag_operation_approvs}
                                                                </Typography> : null
                                                }
                                            </Typography>
                                        </CssVarsProvider>
                                        {
                                            omdate !== null ? <Box
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: 'row',
                                                    justifyContent: "space-evenly",
                                                    pr: 2
                                                }}>
                                                <CssVarsProvider>
                                                    <Typography ml={2} mb={0.5} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }}>{omdate !== null ? omdate : "Not Update"}</Typography>
                                                    <Typography ml={2} sx={{ fontSize: 15 }} >/ </Typography>
                                                    <Typography ml={2} mb={0.5} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, textTransform: "capitalize" }}>{om_user !== null ? om_user.toLowerCase() : null} </Typography>
                                                </CssVarsProvider>   </Box> : null
                                        }

                                    </Box>
                                    {
                                        manag_operation_approv === 1 ? <Box sx={{ width: "100%" }}>
                                            <CssVarsProvider>
                                                <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification/ Requirement Description: </Typography>
                                                <Typography ml={10} sx={{ fontSize: 15 }} >{manag_operation_remarks} </Typography>
                                            </CssVarsProvider>
                                            <CssVarsProvider>
                                                <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detailed Analysis of Requirement: </Typography>
                                                <Typography ml={10} sx={{ fontSize: 15 }} >{om_detial_analysis} </Typography>
                                            </CssVarsProvider> </Box> :
                                            manag_operation_approv === 2 ? <Box sx={{ width: "100%" }}>
                                                <CssVarsProvider>
                                                    <Typography sx={{ fontSize: 15 }} >Detail Justification for Reject: </Typography>
                                                    <Typography ml={10} sx={{ fontSize: 15, fontWeight: 600 }} >{manag_operation_remarks} </Typography>
                                                </CssVarsProvider>
                                            </Box> :
                                                manag_operation_approv === 3 ? <Box sx={{ width: "100%" }}>
                                                    <CssVarsProvider>
                                                        <Typography sx={{ fontSize: 15 }} >Detail Justification for On-Hold: </Typography>
                                                        <Typography ml={10} sx={{ fontSize: 15, fontWeight: 600 }} >{manag_operation_remarks} </Typography>
                                                    </CssVarsProvider>
                                                </Box> : null
                                    }
                                </Box>
                                <Divider
                                    // variant="middle"
                                    sx={{ my: 0.8 }} />
                                <Box sx={{
                                    width: "100%",
                                    display: "flex",
                                    pl: 1, pr: 0.5, pt: 0.5,
                                    flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'column', xl: 'column', },
                                }}>
                                    <Box
                                        sx={{
                                            // pl: 1,
                                            display: "flex",
                                            flexDirection: 'row',
                                            justifyContent: "space-between"
                                        }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Senior Manager Operations:
                                                {
                                                    senior_manage_approv === 1 ?
                                                        <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="success" variant="outlined"> {senior_manage_approvs}
                                                        </Typography> : senior_manage_approv === 2 ?
                                                            <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="danger" variant="outlined"> {senior_manage_approvs}
                                                            </Typography> : senior_manage_approv === 3 ?
                                                                <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="primary" variant="outlined"> {senior_manage_approvs}
                                                                </Typography> : null
                                                }
                                            </Typography>
                                        </CssVarsProvider>
                                        {
                                            smodate !== null ? <Box
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: 'row',
                                                    justifyContent: "space-evenly",
                                                    pr: 2
                                                }}>
                                                <CssVarsProvider>
                                                    <Typography ml={2} mb={0.5} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }}>{smodate !== null ? smodate : "Not Update"}</Typography>
                                                    <Typography ml={2} sx={{ fontSize: 15 }} >/ </Typography>
                                                    <Typography ml={2} mb={0.5} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, textTransform: "capitalize" }}>{smo_user !== null ? smo_user.toLowerCase() : null} </Typography>
                                                </CssVarsProvider>   </Box> : null
                                        }

                                    </Box>
                                    {
                                        senior_manage_approv === 1 ? <Box sx={{ width: "100%" }}>
                                            <CssVarsProvider>
                                                <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification/ Requirement Description: </Typography>
                                                <Typography ml={10} sx={{ fontSize: 15 }} >{senior_manage_remarks} </Typography>
                                            </CssVarsProvider>
                                            <CssVarsProvider>
                                                <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detailed Analysis of Requirement: </Typography>
                                                <Typography ml={10} sx={{ fontSize: 15 }} >{smo_detial_analysis} </Typography>
                                            </CssVarsProvider> </Box> :
                                            senior_manage_approv === 2 ? <Box sx={{ width: "100%" }}>
                                                <CssVarsProvider>
                                                    <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification for Reject: </Typography>
                                                    <Typography ml={10} sx={{ fontSize: 15 }} >{senior_manage_remarks} </Typography>
                                                </CssVarsProvider>
                                            </Box> :
                                                senior_manage_approv === 3 ? <Box sx={{ width: "100%" }}>
                                                    <CssVarsProvider>
                                                        <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification for On-Hold: </Typography>
                                                        <Typography ml={10} sx={{ fontSize: 15 }} >{senior_manage_remarks} </Typography>
                                                    </CssVarsProvider>
                                                </Box> : null
                                    }
                                </Box>
                                <Divider
                                    // variant="middle"
                                    sx={{ my: 0.8 }} />
                                <Box sx={{
                                    width: "100%",
                                    display: "flex",
                                    pl: 1, pr: 0.5, pt: 0.5,
                                    flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'column', xl: 'column', },
                                }}>
                                    <Box
                                        sx={{
                                            // pl: 1,
                                            display: "flex",
                                            flexDirection: 'row',
                                            justifyContent: "space-between"
                                        }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 16, fontWeight: 600 }} >CAO/COO/MS:
                                                {
                                                    cao_approve === 1 ?
                                                        <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="success" variant="outlined"> {cao_approves}
                                                        </Typography> : cao_approve === 2 ?
                                                            <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="danger" variant="outlined"> {cao_approves}
                                                            </Typography> : cao_approve === 3 ?
                                                                <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="primary" variant="outlined"> {cao_approves}
                                                                </Typography> : null
                                                }
                                            </Typography>
                                        </CssVarsProvider>
                                        {
                                            caodate !== null ? <Box
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: 'row',
                                                    justifyContent: "space-evenly",
                                                    pr: 2
                                                }}>
                                                <CssVarsProvider>
                                                    <Typography ml={2} mb={0.5} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }}>{caodate !== null ? caodate : "Not Update"}</Typography>
                                                    <Typography ml={2} sx={{ fontSize: 15 }} >/ </Typography>
                                                    <Typography ml={2} mb={0.5} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, textTransform: "capitalize" }}>{cao_user !== null ? cao_user.toLowerCase() : null} </Typography>
                                                </CssVarsProvider>   </Box> : null
                                        }

                                    </Box>
                                    {
                                        cao_approve === 1 ? <Box sx={{ width: "100%" }}>
                                            <CssVarsProvider>
                                                <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification/ Requirement Description: </Typography>
                                                <Typography ml={10} sx={{ fontSize: 15 }} >{cao_approve_remarks} </Typography>
                                            </CssVarsProvider>
                                            <CssVarsProvider>
                                                <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detailed Analysis of Requirement: </Typography>
                                                <Typography ml={10} sx={{ fontSize: 15 }} >{ceo_detial_analysis} </Typography>
                                            </CssVarsProvider> </Box> :
                                            cao_approve === 2 ? <Box sx={{ width: "100%" }}>
                                                <CssVarsProvider>
                                                    <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification for Reject: </Typography>
                                                    <Typography ml={10} sx={{ fontSize: 15, fontWeight: 600 }} >{cao_approve_remarks} </Typography>
                                                </CssVarsProvider>
                                            </Box> :
                                                cao_approve === 3 ? <Box sx={{ width: "100%" }}>
                                                    <CssVarsProvider>
                                                        <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification for On-Hold: </Typography>
                                                        <Typography ml={10} sx={{ fontSize: 15, fontWeight: 600 }} >{cao_approve_remarks} </Typography>
                                                    </CssVarsProvider>
                                                </Box> : null
                                    }
                                </Box>
                                <Divider
                                    // variant="middle"
                                    sx={{ my: 0.8 }} />

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
                                        rejectremark={rejectremark}
                                        updateRejectRemark={updateRejectRemark}
                                        holdremark={holdremark}
                                        updateHoldRemark={updateHoldRemark}
                                        detailAnalis={detailAnalis}
                                        updatedetailAnalis={updatedetailAnalis}
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
            </Dialog >
        </Fragment >
    )
}

export default memo(MDApproveModal)