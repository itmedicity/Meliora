import React, { Fragment, useCallback, useState, memo, useEffect, useMemo } from 'react'
import Slide from '@mui/material/Slide';
import { ToastContainer } from 'react-toastify';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { Box, Paper } from '@mui/material'
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { axioslogin } from 'src/views/Axios/Axios'
import { succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import { CssVarsProvider, Typography } from '@mui/joy'
import { TypoHeadColor } from 'src/color/Color'
import ReqItemDisplay from '../ComonComponent/ReqItemDisplay';
// import ItemsApprovalCompnt from './ItemsApprovalCompnt';
import ApprovalCompntAll from '../ComonComponent/ApprovalCompntAll';
import _ from 'underscore'
import { useSelector } from 'react-redux'
import { format } from 'date-fns';
import Divider from '@mui/material/Divider';
import ItemsApprovalCompnt from '../CrfInchargeApproval/ItemsApprovalCompnt';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});


const CrfSMOApprovalModal = ({ open, ApprovalData, setApprovalModal, setApprovalFlag, count, setCount, setApprovalData }) => {
    const { req_slno, req_date, actual_requirement, needed, expdate, incharge_approve, incharge_req,
        inch_detial_analysis, incharge, incharge_remark, incharge_user, incharge_apprv_date, hod_req,
        hod_approve, hod, hod_detial_analysis, hod_approve_date, hod_remarks, hod_user,
        dms_approve, dms, dms_remarks, dms_detail_analysis, dms_approve_date, dms_user,
        ms, ms_approve, ms_approve_remark, ms_detail_analysis, ms_approve_date, ms_approve_user,
        manag_operation_approv, om, manag_operation_remarks, om_detial_analysis, om_approv_date,
        manag_operation_user, senior_manage_approv, senior_manage_remarks, smo_detial_analysis,

    } = ApprovalData
    const inchargeApprovdate = incharge_apprv_date !== null ? format(new Date(incharge_apprv_date), 'dd-MM-yyyy hh:mm:ss') : "Not Updated"
    const hodApprovdate = hod_approve_date !== null ? format(new Date(hod_approve_date), 'dd-MM-yyyy hh:mm:ss') : "Not Updated"
    const dmsApprovdate = dms_approve_date !== null ? format(new Date(dms_approve_date), 'dd-MM-yyyy hh:mm:ss') : "Not Updated"
    const msApprovdate = ms_approve_date !== null ? format(new Date(ms_approve_date), 'dd-MM-yyyy hh:mm:ss') : "Not Updated"
    const omApprovdate = om_approv_date !== null ? format(new Date(om_approv_date), 'dd-MM-yyyy hh:mm:ss') : "Not Updated"


    const [reqTableDis, setReqTableDis] = useState(0)

    const [detailData, setDetailData] = useState([])
    const id = useSelector((state) => state.LoginUserData.empid, _.isEqual)

    const [ApproveTableDis, setApproveTableDis] = useState(0)
    const [ApproveTableData, setApproveTableData] = useState([])

    const [remark, setRemark] = useState('')
    const updateRemark = useCallback((e) => {
        setRemark(e.target.value)
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
            setRemark('')
        }
    }, [])
    const updateReject = useCallback((e) => {
        if (e.target.checked === true) {
            setReject(true)
            setApprove(false)
            setPending(false)
            setRemark('')
        }
        else {
            setApprove(false)
            setReject(false)
            setPending(false)
            setRemark('')
        }
    }, [])

    const updatePending = useCallback((e) => {
        if (e.target.checked === true) {
            setPending(true)
            setApprove(false)
            setReject(false)
            setRemark('')
        }
        else {
            setPending(false)
            setApprove(false)
            setReject(false)
            setRemark('')
        }
    }, [])

    useEffect(() => {
        setApprove(senior_manage_approv === 1 ? true : false)
        setReject(senior_manage_approv === 2 ? true : false)
        setPending(senior_manage_approv === 3 ? true : false)
        setRemark(senior_manage_remarks)
        setDetailAnalis(smo_detial_analysis)
    }, [senior_manage_approv, senior_manage_remarks, smo_detial_analysis])

    const SMOPatchData = useMemo(() => {
        return {
            senior_manage_approv: approve === true ? 1 : reject === true ? 2 : pending === true ? 3 : null,
            senior_manage_user: id,
            req_slno: req_slno,
            som_aprrov_date: format(new Date(), 'yyyy-MM-dd hh:mm:ss'),
            senior_manage_remarks: remark,
            smo_detial_analysis: detailAnalis

        }
    }, [approve, reject, pending, id, remark, detailAnalis, req_slno])

    const reset = useCallback(() => {
        setPending(false)
        setApprove(false)
        setReject(false)
        setRemark('')
        setApprovalModal(false)
        setApprovalFlag(0)
        setApprovalData([])
        setCount(0)
        setReqTableDis(0)
        setDetailData([])
        setApproveTableDis(0)
        setApproveTableData([])
        setDetailAnalis('')
    }, [setApprovalFlag, setCount, setApprovalModal, setApprovalData])


    useEffect(() => {
        const getItemDetails = async (req_slno) => {
            const result = await axioslogin.get(`/newCRFRegister/getDetailItemList/${req_slno}`)
            const { success, data } = result.data
            if (success === 1) {
                setReqTableDis(1)
                setDetailData(data);
            } else {
                setReqTableDis(0)
            }
        }

        const getApproItemDetails = async (req_slno) => {
            const result = await axioslogin.get(`/CRFRegisterApproval/getItemListApproval/${req_slno}`)
            const { success, data } = result.data
            if (success === 1) {
                const datas = data.map((val, index) => {
                    const obj = {
                        slno: index + 1,
                        req_detl_slno: val.req_detl_slno,
                        req_slno: val.req_slno,
                        item_slno: val.item_slno,
                        item_desc: val.item_desc,
                        item_brand: val.item_brand,
                        item_unit: val.item_unit,
                        item_qnty: val.item_qnty,
                        item_specification: val.item_specification,
                        item_unit_price: val.item_unit_price,
                        aprox_cost: val.aprox_cost,
                        item_status: val.item_status,
                        approve_item_desc: val.approve_item_desc,
                        approve_item_brand: val.approve_item_brand,
                        approve_item_unit: val.approve_item_unit,
                        item_qnty_approved: val.item_qnty_approved,
                        approve_item_unit_price: val.approve_item_unit_price,
                        approve_aprox_cost: val.approve_aprox_cost,
                        item_status_approved: val.item_status_approved,
                        approve_item_status: val.approve_item_status,
                        approve_item_delete_who: val.approve_item_delete_who,
                        uom_name: val.uom_name,
                        approve_item_specification: val.approve_item_specification,
                        old_item_slno: val.old_item_slno
                    }
                    return obj
                })
                setApproveTableDis(1)
                setApproveTableData(datas);
            } else {
                setApproveTableDis(0)
                setApproveTableData([])
            }
        }
        getItemDetails(req_slno)
        getApproItemDetails(req_slno)

    }, [req_slno])


    const submit = useCallback(() => {
        const updateInchargeApproval = async (SMOPatchData) => {
            const result = await axioslogin.patch('/CRFRegisterApproval/Smo', SMOPatchData);
            const { success, message } = result.data;
            if (success === 2) {
                succesNotify(message)
                setCount(count + 1)
                reset()
            }
            else {
                warningNotify(message)
            }
        }

        if (approve !== false || reject !== false || pending !== false) {
            if (approve === true && detailAnalis !== '' && remark !== '') {
                updateInchargeApproval(SMOPatchData)
            }
            else if ((reject === true && remark !== '') || (pending === true && remark !== '')) {
                updateInchargeApproval(SMOPatchData)
            }
            else {
                warningNotify("Justification must be Entered")
            }
        } else {
            warningNotify("Please Select any status")
        }

    }, [approve, reject, pending, remark, detailAnalis, SMOPatchData, setCount, count, reset])

    const ModalClose = useCallback(() => {
        setPending(false)
        setApprove(false)
        setReject(false)
        setRemark('')
        setApprovalModal(false)
        setApprovalFlag(0)
        setApprovalData([])
        setCount(0)
        setReqTableDis(0)
        setDetailData([])
        setApproveTableDis(0)
        setApproveTableData([])
        setDetailAnalis('')
    }, [setApprovalFlag, setCount, setApprovalModal, setApprovalData])
    return (
        <Fragment>
            <ToastContainer />
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                fullWidth
                maxWidth='lg'

                aria-describedby="alert-dialog-slide-descriptiona"
            >
                < DialogContent id="alert-dialog-slide-descriptiona"
                    sx={{
                        width: "100%",
                        height: 540
                    }}
                >
                    < DialogContentText id="alert-dialog-slide-descriptiona">
                        CRF Documentation Approval
                    </DialogContentText>

                    <Box sx={{ width: "100%", mt: 0, display: "flex", flexDirection: "column" }}>
                        <Paper variant='outlined' sx={{ p: 0, mt: 1 }} >
                            <Box sx={{
                                width: "100%", display: "flex",
                                flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'column', xl: 'column', },
                            }}>
                                <Box sx={{
                                    width: "100%", display: "flex", p: 0.5,
                                    flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                }}>
                                    <Box sx={{ pr: 1.5 }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15 }}>Request No: CRF/TMC/{req_slno}</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ pl: 4 }}                                    >
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15 }}>Req.Date: {req_date}</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                </Box>
                                {
                                    actual_requirement !== null ? <Box sx={{
                                        width: "100%", display: "flex", p: 0.5,
                                        flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                    }}>
                                        <Box
                                            sx={{ width: "25%", }}>
                                            <CssVarsProvider>
                                                <Typography sx={{ fontSize: 15 }}>Actual Requirement:</Typography>
                                            </CssVarsProvider>
                                        </Box>
                                        <Paper sx={{
                                            width: "75%", minHeight: 10, maxHeight: 70, pl: 0.5, fontSize: 15, textTransform: "capitalize",
                                            overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                        }} variant='none'>
                                            {actual_requirement}
                                        </Paper>
                                    </Box> : null
                                }
                                {
                                    needed !== null ? <Box sx={{
                                        width: "100%", display: "flex", p: 0.5,
                                        flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                    }}>
                                        <Box
                                            sx={{ width: "25%", }}>
                                            <CssVarsProvider>
                                                <Typography sx={{ fontSize: 15 }}>Justification for need:</Typography>
                                            </CssVarsProvider>
                                        </Box>
                                        <Paper sx={{
                                            width: '75%', minHeight: 10, maxHeight: 70, pl: 0.5, fontSize: 15, textTransform: "capitalize",
                                            overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                        }} variant='none'>
                                            {needed}
                                        </Paper>
                                    </Box> : null
                                }
                                <Box sx={{
                                    width: "100%", display: "flex", p: 0.5, pb: 0,
                                    flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                }}>
                                    <Box
                                        sx={{ pr: 9 }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15 }}>Expected Date: {expdate}</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                </Box>

                                {/* {
                    reqTableDis === 0 ?
                        <Box sx={{
                            width: "100%", display: "flex", p: 0.5, pb: 0,
                            flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                        }}>
                            <Box sx={{ pr: 9 }}>
                                <CssVarsProvider>
                                    <Typography sx={{ fontSize: 15 }}>Requested Items: Nill</Typography>
                                </CssVarsProvider>
                            </Box>
                        </Box>
                        : null
                } */}
                            </Box>
                        </Paper>
                        {reqTableDis === 1 ?
                            <Paper variant='outlined' sx={{ p: 0, mt: 1 }} >
                                <Box sx={{
                                    width: "100%", display: "flex", p: 0.5, pb: 0, flexDirection: 'column',
                                }}>
                                    <CssVarsProvider>
                                        <Typography sx={{ fontSize: 15 }}>Requested Items</Typography>
                                    </CssVarsProvider>
                                </Box>
                                <ReqItemDisplay detailData={detailData}
                                />
                            </Paper> : <Box sx={{
                                width: "100%", display: "flex", p: 0.5, pb: 0,
                                flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                            }}>
                                <Box sx={{ pr: 9 }}>
                                    <CssVarsProvider>
                                        <Typography sx={{ fontSize: 15 }}>Requested Items: Nill</Typography>
                                    </CssVarsProvider>
                                </Box>
                            </Box>
                        }
                        <Box sx={{ width: "100%", mt: 0, }}>
                            <Paper variant='outlined' sx={{ mt: 1 }} >
                                <Box sx={{
                                    p: 1, width: "100%", display: "flex", flexDirection: 'column',
                                }}>

                                    <Box sx={{
                                        width: "100%", display: "flex", flexDirection: 'column',
                                    }}>
                                        <Box
                                            sx={{ pr: 9 }}>
                                            <CssVarsProvider>
                                                <Typography sx={{ fontWeight: 900, fontSize: 14, color: TypoHeadColor }} >Department Approval</Typography>
                                            </CssVarsProvider>
                                        </Box>

                                        {incharge_req === 1 ?
                                            <Box sx={{ width: "100%" }}>
                                                <Box sx={{
                                                    pl: 1,
                                                    width: "100%",
                                                    display: "flex",
                                                    flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'column', xl: 'column', },
                                                }}>

                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            flexDirection: 'row',
                                                            justifyContent: "space-between",
                                                        }}>
                                                        <CssVarsProvider>
                                                            <Typography sx={{ fontSize: 16, fontWeight: 600 }} >Incharge :
                                                                {
                                                                    incharge_approve === 1 ?
                                                                        <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5 }} color="success" variant="outlined"> {incharge}
                                                                        </Typography> : incharge_approve === 2 ?
                                                                            <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5 }} color="danger" variant="outlined"> {incharge}
                                                                            </Typography> : incharge_approve === 3 ?
                                                                                <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5 }} color="primary" variant="outlined"> {incharge}
                                                                                </Typography> :
                                                                                <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5 }}
                                                                                    color="success" variant="outlined"> Not Done
                                                                                </Typography>
                                                                }
                                                            </Typography>
                                                        </CssVarsProvider>
                                                        {
                                                            incharge_apprv_date !== null ? <Box
                                                                sx={{
                                                                    display: "flex",
                                                                    flexDirection: 'row',
                                                                    justifyContent: "space-evenly",
                                                                    pr: 2
                                                                }}>
                                                                <CssVarsProvider>
                                                                    <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5 }}>
                                                                        {inchargeApprovdate}</Typography>
                                                                    <Typography ml={2} sx={{ fontSize: 15 }} >/ </Typography>
                                                                    <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, textTransform: "capitalize" }}>
                                                                        {incharge_user} </Typography>
                                                                </CssVarsProvider>   </Box> : null
                                                        }
                                                    </Box>
                                                    {
                                                        incharge_approve === 1 ? <Box sx={{ width: "100%" }}>
                                                            <CssVarsProvider>
                                                                <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification/ Requirement Description: </Typography>
                                                                <Typography ml={10} sx={{ fontSize: 15 }} >{incharge_remark} </Typography>
                                                            </CssVarsProvider>
                                                            <CssVarsProvider>
                                                                <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detailed Analysis of Requirement: </Typography>
                                                                <Typography ml={10} sx={{ fontSize: 15 }} >{inch_detial_analysis} </Typography>
                                                            </CssVarsProvider> </Box> :
                                                            incharge_approve === 2 ? <Box sx={{ width: "100%" }}>
                                                                <CssVarsProvider>
                                                                    <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification for Reject: </Typography>
                                                                    <Typography ml={10} sx={{ fontSize: 15 }} >{incharge_remark} </Typography>
                                                                </CssVarsProvider>
                                                            </Box> :
                                                                incharge_approve === 3 ? <Box sx={{ width: "100%" }}>
                                                                    <CssVarsProvider>
                                                                        <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification for On-Hold: </Typography>
                                                                        <Typography ml={10} sx={{ fontSize: 15 }} >{incharge_remark} </Typography>
                                                                    </CssVarsProvider>
                                                                </Box> : null
                                                    }

                                                </Box>
                                            </Box> :
                                            <Box>
                                                <CssVarsProvider>
                                                    <Typography ml={10} sx={{ fontSize: 15, fontWeight: 500 }} >Incharge Approval Not Required </Typography>
                                                </CssVarsProvider>
                                            </Box>
                                        }

                                        <Divider
                                            // variant="middle"
                                            sx={{ my: 0.8 }} />

                                        {hod_req === 1 ?
                                            <Box sx={{ width: "100%" }}>
                                                <Box sx={{
                                                    pl: 1,
                                                    width: "100%",
                                                    display: "flex",
                                                    flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'column', xl: 'column', },
                                                }}>

                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            flexDirection: 'row',
                                                            justifyContent: "space-between",
                                                        }}>
                                                        <CssVarsProvider>
                                                            <Typography sx={{ fontSize: 16, fontWeight: 600 }} >HOD :
                                                                {
                                                                    hod_approve === 1 ?
                                                                        <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5 }} color="success" variant="outlined"> {hod}
                                                                        </Typography> : hod_approve === 2 ?
                                                                            <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5 }} color="danger" variant="outlined"> {hod}
                                                                            </Typography> : hod_approve === 3 ?
                                                                                <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5 }} color="primary" variant="outlined"> {hod}
                                                                                </Typography> :
                                                                                <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5 }}
                                                                                    color="success" variant="outlined"> Not Done
                                                                                </Typography>
                                                                }
                                                            </Typography>
                                                        </CssVarsProvider>
                                                        {
                                                            hod_approve_date !== null ? <Box
                                                                sx={{
                                                                    display: "flex",
                                                                    flexDirection: 'row',
                                                                    justifyContent: "space-evenly",
                                                                    pr: 2
                                                                }}>
                                                                <CssVarsProvider>
                                                                    <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5 }}>
                                                                        {hodApprovdate}</Typography>
                                                                    <Typography ml={2} sx={{ fontSize: 15 }} >/ </Typography>
                                                                    <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, textTransform: "capitalize" }}>
                                                                        {hod_user} </Typography>
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
                                                                    <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification for Reject: </Typography>
                                                                    <Typography ml={10} sx={{ fontSize: 15 }} >{hod_remarks} </Typography>
                                                                </CssVarsProvider>
                                                            </Box> :
                                                                hod_approve === 3 ? <Box sx={{ width: "100%" }}>
                                                                    <CssVarsProvider>
                                                                        <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification for On-Hold: </Typography>
                                                                        <Typography ml={10} sx={{ fontSize: 15 }} >{hod_remarks} </Typography>
                                                                    </CssVarsProvider>
                                                                </Box> : null
                                                    }

                                                </Box>
                                            </Box> :
                                            <Box>
                                                <CssVarsProvider>
                                                    <Typography ml={10} sx={{ fontSize: 15, fontWeight: 500 }} >HOD Approval Not Required </Typography>
                                                </CssVarsProvider>
                                            </Box>
                                        }




                                    </Box>
                                </Box>
                            </Paper>
                            <Box sx={{ width: "100%", mt: 0 }}>
                                <Paper variant='outlined' sx={{ mt: 1 }} >
                                    <Box sx={{
                                        width: "100%",
                                        display: "flex",
                                        flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'column', xl: 'column', },
                                    }}>

                                        <Box
                                            sx={{
                                                pl: 1, pr: 1,
                                                display: "flex",
                                                flexDirection: 'row',
                                                justifyContent: "space-between"
                                            }}>

                                            <CssVarsProvider>
                                                <Typography sx={{ fontSize: 16, fontWeight: 600 }} >DMS :

                                                    {
                                                        dms_approve === 1 ?
                                                            <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="success" variant="outlined"> {dms}
                                                            </Typography> : dms_approve === 2 ?
                                                                <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="danger" variant="outlined"> {dms}
                                                                </Typography> : dms_approve === 3 ?
                                                                    <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="primary" variant="outlined"> {dms}
                                                                    </Typography> : null
                                                    }
                                                </Typography>
                                            </CssVarsProvider>
                                            {
                                                dms_approve_date !== null ? <Box
                                                    sx={{
                                                        display: "flex",
                                                        flexDirection: 'row',
                                                        justifyContent: "space-evenly",
                                                        pr: 2
                                                    }}>
                                                    <CssVarsProvider>
                                                        <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5 }}>
                                                            {dmsApprovdate}</Typography>
                                                        <Typography ml={2} sx={{ fontSize: 15 }} >/ </Typography>
                                                        <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, textTransform: "capitalize" }}>
                                                            {dms_user} </Typography>
                                                    </CssVarsProvider>   </Box> : null
                                            }

                                        </Box>
                                        {
                                            dms_approve === 1 ? <Box sx={{ width: "100%", pl: 1 }}>
                                                <CssVarsProvider>
                                                    <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification/ Requirement Description: </Typography>
                                                    <Typography ml={10} sx={{ fontSize: 15 }} >{dms_remarks} </Typography>
                                                </CssVarsProvider>
                                                <CssVarsProvider>
                                                    <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detailed Analysis of Requirement: </Typography>
                                                    <Typography ml={10} sx={{ fontSize: 15 }} >{dms_detail_analysis} </Typography>
                                                </CssVarsProvider> </Box> :
                                                dms_approve === 2 ? <Box sx={{ width: "100%" }}>
                                                    <CssVarsProvider>
                                                        <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification for Reject: </Typography>
                                                        <Typography ml={10} sx={{ fontSize: 15 }} >{dms_remarks} </Typography>
                                                    </CssVarsProvider>
                                                </Box> :
                                                    dms_approve === 3 ? <Box sx={{ width: "100%" }}>
                                                        <CssVarsProvider>
                                                            <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification for On-Hold: </Typography>
                                                            <Typography ml={10} sx={{ fontSize: 15 }} >{dms_remarks} </Typography>
                                                        </CssVarsProvider>
                                                    </Box> : <Box>
                                                        <CssVarsProvider>
                                                            <Typography ml={10} sx={{ fontSize: 15, fontWeight: 500 }} >Approval Not Done </Typography>
                                                        </CssVarsProvider>
                                                    </Box>
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
                                            sx={{
                                                pl: 1, pr: 1,
                                                display: "flex",
                                                flexDirection: 'row',
                                                justifyContent: "space-between"
                                            }}>

                                            <CssVarsProvider>
                                                <Typography sx={{ fontSize: 16, fontWeight: 600 }} >MS :

                                                    {
                                                        ms_approve === 1 ?
                                                            <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="success" variant="outlined"> {ms}
                                                            </Typography> : ms_approve === 2 ?
                                                                <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="danger" variant="outlined"> {ms}
                                                                </Typography> : ms_approve === 3 ?
                                                                    <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="primary" variant="outlined"> {ms}
                                                                    </Typography> : null
                                                    }
                                                </Typography>
                                            </CssVarsProvider>
                                            {
                                                ms_approve_date !== null ? <Box
                                                    sx={{
                                                        display: "flex",
                                                        flexDirection: 'row',
                                                        justifyContent: "space-evenly",
                                                        pr: 2
                                                    }}>
                                                    <CssVarsProvider>
                                                        <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5 }}>
                                                            {msApprovdate}</Typography>
                                                        <Typography ml={2} sx={{ fontSize: 15 }} >/ </Typography>
                                                        <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, textTransform: "capitalize" }}>
                                                            {ms_approve_user} </Typography>
                                                    </CssVarsProvider>   </Box> : null
                                            }

                                        </Box>
                                        {
                                            ms_approve === 1 ? <Box sx={{ width: "100%", pl: 1 }}>
                                                <CssVarsProvider>
                                                    <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification/ Requirement Description: </Typography>
                                                    <Typography ml={10} sx={{ fontSize: 15 }} >{ms_approve_remark} </Typography>
                                                </CssVarsProvider>
                                                <CssVarsProvider>
                                                    <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detailed Analysis of Requirement: </Typography>
                                                    <Typography ml={10} sx={{ fontSize: 15 }} >{ms_detail_analysis} </Typography>
                                                </CssVarsProvider> </Box> :
                                                ms_approve === 2 ? <Box sx={{ width: "100%" }}>
                                                    <CssVarsProvider>
                                                        <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification for Reject: </Typography>
                                                        <Typography ml={10} sx={{ fontSize: 15 }} >{ms_approve_remark} </Typography>
                                                    </CssVarsProvider>
                                                </Box> :
                                                    ms_approve === 3 ? <Box sx={{ width: "100%" }}>
                                                        <CssVarsProvider>
                                                            <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification for On-Hold: </Typography>
                                                            <Typography ml={10} sx={{ fontSize: 15 }} >{ms_approve_remark} </Typography>
                                                        </CssVarsProvider>
                                                    </Box> : <Box>
                                                        <CssVarsProvider>
                                                            <Typography ml={10} sx={{ fontSize: 15, fontWeight: 500 }} >Approval Not Done </Typography>
                                                        </CssVarsProvider>
                                                    </Box>
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
                                            sx={{
                                                pl: 1, pr: 1,
                                                display: "flex",
                                                flexDirection: 'row',
                                                justifyContent: "space-between"
                                            }}>

                                            <CssVarsProvider>
                                                <Typography sx={{ fontSize: 16, fontWeight: 600 }} >Crf Documentation :

                                                    {
                                                        manag_operation_approv === 1 ?
                                                            <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="success" variant="outlined"> {om}
                                                            </Typography> : manag_operation_approv === 2 ?
                                                                <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="danger" variant="outlined"> {om}
                                                                </Typography> : manag_operation_approv === 3 ?
                                                                    <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="primary" variant="outlined"> {om}
                                                                    </Typography> : null
                                                    }
                                                </Typography>
                                            </CssVarsProvider>
                                            {
                                                om_approv_date !== null ? <Box
                                                    sx={{
                                                        display: "flex",
                                                        flexDirection: 'row',
                                                        justifyContent: "space-evenly",
                                                        pr: 2
                                                    }}>
                                                    <CssVarsProvider>
                                                        <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5 }}>
                                                            {omApprovdate}</Typography>
                                                        <Typography ml={2} sx={{ fontSize: 15 }} >/ </Typography>
                                                        <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, textTransform: "capitalize" }}>
                                                            {manag_operation_user} </Typography>
                                                    </CssVarsProvider>   </Box> : null
                                            }

                                        </Box>
                                        {
                                            manag_operation_approv === 1 ? <Box sx={{ width: "100%", pl: 1 }}>
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
                                                        <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification for Reject: </Typography>
                                                        <Typography ml={10} sx={{ fontSize: 15 }} >{manag_operation_remarks} </Typography>
                                                    </CssVarsProvider>
                                                </Box> :
                                                    manag_operation_approv === 3 ? <Box sx={{ width: "100%" }}>
                                                        <CssVarsProvider>
                                                            <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification for On-Hold: </Typography>
                                                            <Typography ml={10} sx={{ fontSize: 15 }} >{manag_operation_remarks} </Typography>
                                                        </CssVarsProvider>
                                                    </Box> : <Box>
                                                        <CssVarsProvider>
                                                            <Typography ml={10} sx={{ fontSize: 15, fontWeight: 500 }} >Approval Not Done </Typography>
                                                        </CssVarsProvider>
                                                    </Box>
                                        }

                                    </Box>
                                </Paper>
                            </Box>

                            {ApproveTableDis === 1 ?
                                <Paper variant='outlined' sx={{ p: 0, mt: 1 }} >
                                    <Box sx={{
                                        width: "100%", display: "flex", p: 0.5, pb: 0, flexDirection: 'column',
                                    }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15 }}>Items For Approval</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <ItemsApprovalCompnt req_slno={req_slno}
                                        setApproveTableDis={setApproveTableDis}
                                        ApproveTableDis={ApproveTableDis}
                                        ApproveTableData={ApproveTableData}
                                        setApproveTableData={setApproveTableData}
                                    />
                                    <ApprovalCompntAll
                                        heading="CRF Verification Approval"
                                        approve={approve}
                                        reject={reject}
                                        pending={pending}
                                        remark={remark}
                                        detailAnalis={detailAnalis}
                                        updatedetailAnalis={updatedetailAnalis}
                                        updateRemark={updateRemark}
                                        updateApprove={updateApprove}
                                        updateReject={updateReject}
                                        updatePending={updatePending}
                                    />
                                </Paper> :

                                <Box sx={{
                                    width: "100%", display: "flex", p: 0.5, pb: 0, flexDirection: 'column',
                                }}>

                                    {reqTableDis === 1 && ApproveTableDis === 0 ?
                                        <Box sx={{ pr: 9 }}>
                                            <CssVarsProvider>
                                                <Typography sx={{ fontSize: 15 }}>No Item For Approval</Typography>
                                            </CssVarsProvider>
                                        </Box> : null
                                    }
                                    <ApprovalCompntAll
                                        heading="CRF Verification Approval"
                                        approve={approve}
                                        reject={reject}
                                        pending={pending}
                                        remark={remark}
                                        detailAnalis={detailAnalis}
                                        updatedetailAnalis={updatedetailAnalis}
                                        updateRemark={updateRemark}
                                        updateApprove={updateApprove}
                                        updateReject={updateReject}
                                        updatePending={updatePending}
                                    />
                                </Box>
                            }
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={submit} >Save</Button>
                    <Button onClick={ModalClose} color="secondary" >Cancel</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

export default memo(CrfSMOApprovalModal)