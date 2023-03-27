import React, { Fragment, useCallback, useState, memo, useEffect } from 'react'
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
import { succesNotify } from 'src/views/Common/CommonCode'
import { useMemo } from 'react';
import { useSelector } from 'react-redux'
import ItemApprovalCmp from '../DepartmentApproval/ItemApprovalCmp';
import _ from 'underscore'
import { CssVarsProvider, Typography } from '@mui/joy'
import Divider from '@mui/material/Divider';
import { TypoHeadColor } from 'src/color/Color'
import NdrfApprovalCompnt from '../NdrfFrorm/NdrfApprovalCompnt';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

const NdrfModelsmo = ({ open, setOpen, datas, count, setCount }) => {
    const { req_slno, reqdate, actual_requirement, needed, location, expdate, req_deptsec, req_dept,
        approve_incharge, incharge_remarks, hod_remarks, ndrf_date, ndrf_mast_slno, ed_approve_req,
        approve_hod, manag_operation_approvs, manag_operation_remarks, senior_manage_approvs,
        senior_manage_remarks, category, incharge_apprv_date, om_approv_date, caouser, ed_approve_date,
        ed_approve_remarks, eduser, ed_approves, ndrf_om_approv, ndrf_om_remarks, ndrfom_approv_date,
        hod_approve_date, som_aprrov_date, inch_user, hoduser, om_user, smo_user, cao_approves,
        cao_approv_date, cao_approve_remarks, ndrfuser, ndrf_smo_approv, ndrf_smo_remarks,
        cao_approve, incharge_approve, manag_operation_approv, ed_approve, ed_detial_analysis,
        inch_detial_analysis, hod_detial_analysis, incharge_req, hod_approve, ndrf_om,
        hod_req, om_detial_analysis, smo_detial_analysis, senior_manage_approv, ceo_detial_analysis
    } = datas[0]
    const inchadate = incharge_apprv_date !== null ? format(new Date(incharge_apprv_date), 'dd-MM-yyyy hh:mm:ss') : null
    const hoddate = hod_approve_date !== null ? format(new Date(hod_approve_date), 'dd-MM-yyyy hh:mm:ss') : null
    const omdate = om_approv_date !== null ? format(new Date(om_approv_date), 'dd-MM-yyyy hh:mm:ss') : null
    const smodate = som_aprrov_date !== null ? format(new Date(som_aprrov_date), 'dd-MM-yyyy hh:mm:ss') : null
    const caodate = cao_approv_date !== null ? format(new Date(cao_approv_date), 'dd-MM-yyyy hh:mm:ss') : null
    const eddate = ed_approve_date !== null ? format(new Date(ed_approve_date), 'dd-MM-yyyy hh:mm:ss') : null
    const ndrfomdate = ndrfom_approv_date !== null ? format(new Date(ndrfom_approv_date), 'dd-MM-yyyy hh:mm:ss') : null
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

    useEffect(() => {
        if (ndrf_smo_approv !== null) {
            setRemark(ndrf_smo_remarks)
            setApprove(ndrf_smo_approv === 1 ? true : false)
            setReject(ndrf_smo_approv === 2 ? true : false)
            setPending(ndrf_smo_approv === 3 ? true : false)

        }
        else {
            setRemark('')
            setPending(false)
            setApprove(false)
            setReject(false)
        }
    }, [ndrf_smo_approv, ndrf_smo_remarks])

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

    const patchdataSMO = useMemo(() => {
        return {
            ndrf_smo_approv: approve === true ? 1 : reject === true ? 2 : pending === true ? 3 : null,
            ndrf_smo_remarks: remark,
            ndrf_som_aprrov_date: format(new Date(), 'yyyy-MM-dd hh:mm:ss'),
            ndrf_smo_user: id,
            ndrf_mast_slno: ndrf_mast_slno
        }
    }, [approve, reject, pending, remark, ndrf_mast_slno, id])

    const submit = useCallback((e) => {
        e.preventDefault();
        const reset = () => {
            setOpen(false)
            setApprove(false)
            setReject(false)
            setPending(false)
            setRemark('')
        }
        const updateInchApproval = async (patchdataSMO) => {
            const result = await axioslogin.patch('/ndrf/approval/smo', patchdataSMO);
            const { success, message } = result.data;
            if (success === 2) {
                succesNotify(message)
                setCount(count + 1)
                reset()
            }
        }
        updateInchApproval(patchdataSMO)
    }, [patchdataSMO, setCount, count, setOpen])
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
                        New Demad Request Form Approval
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
                                    <Box sx={{ pl: 6.8 }}                                    >
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15 }}>Req.Date: {reqdate}</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                </Box>
                                {
                                    req_dept !== null ?
                                        <Box
                                            sx={{
                                                width: "100%",
                                                display: "flex",
                                                p: 0.5,
                                                flexDirection: "row",
                                            }}>
                                            <CssVarsProvider>
                                                <Typography sx={{ fontSize: 15, pr: 8 }}>Department:</Typography>
                                                <Typography sx={{ textTransform: "capitalize", fontSize: 15, pl: 8 }}> {req_dept.toLowerCase()}</Typography>
                                            </CssVarsProvider>

                                        </Box> : null
                                }
                                {
                                    req_deptsec !== null ?

                                        <Box
                                            sx={{
                                                width: "100%",
                                                display: "flex",
                                                p: 0.5,
                                                flexDirection: "row",
                                            }}>
                                            <CssVarsProvider>
                                                <Typography sx={{ fontSize: 15, pr: 5 }}>Department Section:</Typography>
                                                <Typography sx={{ textTransform: "capitalize", fontSize: 15, pl: 4.5 }}> {req_deptsec.toLowerCase()}</Typography>
                                            </CssVarsProvider>

                                        </Box>


                                        : null
                                }
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
                                    flexDirection: "column",
                                }}>
                                    <Box
                                        sx={{ pr: 9, pb: 1 }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15 }}>Expected Date: {expdate}</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box
                                        sx={{ pr: 9, pb: 1 }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15 }}>NDRF Date: {ndrf_date}</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box
                                        sx={{ pr: 9 }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15 }}>NDRF Generated User: {ndrfuser}</Typography>
                                        </CssVarsProvider>
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
                                        sx={{ pr: 9 }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontWeight: 900, fontSize: 14, pl: 0.8, color: TypoHeadColor }} >Department Approval</Typography>
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
                                                            <Typography ml={2} mb={0.5} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, textTransform: "capitalize" }}>{hoduser !== null ? hoduser.toLowerCase() : null} </Typography>
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
                                        sx={{ pr: 9 }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontWeight: 900, fontSize: 14, color: TypoHeadColor }} >Request Approvals</Typography>
                                        </CssVarsProvider>
                                    </Box>
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
                                            <Typography sx={{ fontSize: 16, fontWeight: 600 }} >Senior Manager Operations:
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
                                                    <Typography ml={2} mb={0.5} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, textTransform: "capitalize" }}>{caouser !== null ? caouser.toLowerCase() : null} </Typography>
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
                                                    <Typography sx={{ fontSize: 15 }} >Detail Justification for Reject: </Typography>
                                                    <Typography ml={10} sx={{ fontSize: 15, fontWeight: 600 }} >{cao_approve_remarks} </Typography>
                                                </CssVarsProvider>
                                            </Box> :
                                                cao_approve === 3 ? <Box sx={{ width: "100%" }}>
                                                    <CssVarsProvider>
                                                        <Typography sx={{ fontSize: 15 }} >Detail Justification for On-Hold: </Typography>
                                                        <Typography ml={10} sx={{ fontSize: 15, fontWeight: 600 }} >{cao_approve_remarks} </Typography>
                                                    </CssVarsProvider>
                                                </Box> : null
                                    }
                                </Box>
                                <Divider
                                    // variant="middle"
                                    sx={{ my: 0.8 }} />
                                {
                                    ed_approve_req === 1 ?
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
                                                    <Typography sx={{ fontSize: 16, fontWeight: 600 }} >ED/MD:
                                                        {
                                                            ed_approve === 1 ?
                                                                <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="success" variant="outlined"> {ed_approves}
                                                                </Typography> : ed_approve === 2 ?
                                                                    <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="danger" variant="outlined"> {ed_approves}
                                                                    </Typography> : ed_approve === 3 ?
                                                                        <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="primary" variant="outlined"> {ed_approves}
                                                                        </Typography> : null
                                                        }
                                                    </Typography>
                                                </CssVarsProvider>
                                                {
                                                    eddate !== null ? <Box
                                                        sx={{
                                                            display: "flex",
                                                            flexDirection: 'row',
                                                            justifyContent: "space-evenly",
                                                            pr: 2
                                                        }}>
                                                        <CssVarsProvider>
                                                            <Typography ml={2} mb={0.5} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }}>{eddate !== null ? eddate : "Not Update"}</Typography>
                                                            <Typography ml={2} sx={{ fontSize: 15 }} >/ </Typography>
                                                            <Typography ml={2} mb={0.5} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, textTransform: "capitalize" }}>{eduser !== null ? eduser.toLowerCase() : null} </Typography>
                                                        </CssVarsProvider>   </Box> : null
                                                }

                                            </Box>
                                            {
                                                ed_approve === 1 ? <Box sx={{ width: "100%" }}>
                                                    <CssVarsProvider>
                                                        <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification/ Requirement Description: </Typography>
                                                        <Typography ml={10} sx={{ fontSize: 15 }} >{ed_approve_remarks} </Typography>
                                                    </CssVarsProvider>
                                                    <CssVarsProvider>
                                                        <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detailed Analysis of Requirement: </Typography>
                                                        <Typography ml={10} sx={{ fontSize: 15 }} >{ed_detial_analysis} </Typography>
                                                    </CssVarsProvider> </Box> :
                                                    ed_approve === 2 ? <Box sx={{ width: "100%" }}>
                                                        <CssVarsProvider>
                                                            <Typography sx={{ fontSize: 15 }} >Detail Justification for Reject: </Typography>
                                                            <Typography ml={10} sx={{ fontSize: 15, fontWeight: 600 }} >{ed_approve_remarks} </Typography>
                                                        </CssVarsProvider>
                                                    </Box> :
                                                        ed_approve === 3 ? <Box sx={{ width: "100%" }}>
                                                            <CssVarsProvider>
                                                                <Typography sx={{ fontSize: 15 }} >Detail Justification for On-Hold: </Typography>
                                                                <Typography ml={10} sx={{ fontSize: 15, fontWeight: 600 }} >{ed_approve_remarks} </Typography>
                                                            </CssVarsProvider>
                                                        </Box> : null
                                            }
                                        </Box>
                                        : null
                                }
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
                                <Box
                                    sx={{ pr: 9 }}>
                                    <CssVarsProvider>
                                        <Typography sx={{ fontWeight: 900, fontSize: 14, pl: 0.8, color: TypoHeadColor }} >NDRF Approval</Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{
                                    width: "100%",
                                    display: "flex",
                                    pl: 0.2, pr: 0.5,
                                    flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
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
                                                        ndrf_om_approv === 1 ?
                                                            <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="success" variant="outlined"> Approved
                                                            </Typography> : ndrf_om_approv === 2 ?
                                                                <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="danger" variant="outlined"> Reject
                                                                </Typography> : ndrf_om_approv === 3 ?
                                                                    <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="primary" variant="outlined">On-Hold
                                                                    </Typography> : null
                                                    }
                                                </Typography>
                                            </CssVarsProvider>
                                            {
                                                ndrfomdate !== null ? <Box
                                                    sx={{
                                                        display: "flex",
                                                        flexDirection: 'row',
                                                        justifyContent: "space-evenly",
                                                        pr: 2
                                                    }}>
                                                    <CssVarsProvider>
                                                        <Typography ml={2} mb={0.5} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }}>{ndrfomdate !== null ? ndrfomdate : "Not Update"}</Typography>
                                                        <Typography ml={2} sx={{ fontSize: 15 }} >/ </Typography>
                                                        <Typography ml={2} mb={0.5} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, textTransform: "capitalize" }}>{ndrf_om !== null ? ndrf_om.toLowerCase() : null} </Typography>
                                                    </CssVarsProvider>   </Box> : null
                                            }

                                        </Box>
                                        {
                                            ndrf_om_approv === 1 ? <Box sx={{ width: "100%" }}>
                                                <CssVarsProvider>
                                                    <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Approval Remark: </Typography>
                                                    <Typography ml={10} sx={{ fontSize: 15 }} >{ndrf_om_remarks} </Typography>
                                                </CssVarsProvider>
                                            </Box> :
                                                ndrf_om_approv === 2 ? <Box sx={{ width: "100%" }}>
                                                    <CssVarsProvider>
                                                        <Typography sx={{ fontSize: 15 }} > Reject Remark: </Typography>
                                                        <Typography ml={10} sx={{ fontSize: 15, fontWeight: 600 }} >{ndrf_om_remarks} </Typography>
                                                    </CssVarsProvider>
                                                </Box> :
                                                    ndrf_om_approv === 3 ? <Box sx={{ width: "100%" }}>
                                                        <CssVarsProvider>
                                                            <Typography sx={{ fontSize: 15 }} > On-Hold Remark: </Typography>
                                                            <Typography ml={10} sx={{ fontSize: 15, fontWeight: 600 }} >{ndrf_om_remarks} </Typography>
                                                        </CssVarsProvider>
                                                    </Box> : null
                                        }
                                    </Box>
                                </Box>
                                <Divider
                                    // variant="middle"
                                    sx={{ my: 0.8 }} />
                                <Box
                                    sx={{
                                        pl: 1, pr: 0.5, pt: 0.3
                                    }}>
                                    <NdrfApprovalCompnt
                                        heading="NDRF Approval Senior Manager Operations"
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

export default memo(NdrfModelsmo)