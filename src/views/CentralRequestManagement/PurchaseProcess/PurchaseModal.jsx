import React, { Fragment, useCallback, useState, memo, useEffect, useMemo } from 'react'
import Slide from '@mui/material/Slide';
import { ToastContainer } from 'react-toastify';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { Box, Paper, IconButton, Tooltip } from '@mui/material'
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { axioslogin } from 'src/views/Axios/Axios'
import { succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import { CssVarsProvider, Typography } from '@mui/joy'
import ReqItemDisplay from '../ComonComponent/ReqItemDisplay';
import _ from 'underscore'
import { useSelector } from 'react-redux'
import { format } from 'date-fns';
import CusCheckBox from 'src/views/Components/CusCheckBox';
import CustomTextarea from 'src/views/Components/CustomTextarea';
import ApprovedItemListDis from '../ComonComponent/ApprovedItemListDis';
import { MdOutlineAddCircleOutline } from 'react-icons/md';
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import CustomPaperTitle from 'src/views/Components/CustomPaperTitle'
import CrfReqDetailCmpnt from '../CRFRequestMaster/CrfReqDetailCmpnt';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});


const PurchaseModal = ({ open, puchaseData, setpuchaseFlag, setpuchaseModal, setpuchaseData,
    count, setCount }) => {

    const { req_slno, req_date, actual_requirement, needed, expected_date,
        md_approve, md, md_approve_remarks, md_detial_analysis, md_approve_date, md_user,
        ed_approve, ed, ed_approve_remarks, ed_approve_date, ed_detial_analysis, ed_user,
        crm_purchase_slno, ack_status, ack_remarks, purchase_ackuser, ack_date,
        quatation_calling_status, quatation_calling_date, quatation_user,
        quatation_negotiation, quatation_negotiation_date, quatation_neguser,
        quatation_fixing, quatation_fixing_date, quatation_fixuser,
        po_prepartion, po_complete, po_approva_level_one, po_approva_level_two,
        po_to_supplier

    } = puchaseData

    const expdate = expected_date !== null ? format(new Date(expected_date), 'dd-MM-yyyy') : "Not Updated"
    const mdApprovdate = md_approve_date !== null ? format(new Date(md_approve_date), 'dd-MM-yyyy hh:mm:ss') : "Not Updated"
    const edApprovdate = ed_approve_date !== null ? format(new Date(ed_approve_date), 'dd-MM-yyyy hh:mm:ss') : "Not Updated"

    const [reqTableDis, setReqTableDis] = useState(0)
    const [detailData, setDetailData] = useState([])
    const id = useSelector((state) => state.LoginUserData.empid, _.isEqual)

    const [ApproveTableDis, setApproveTableDis] = useState(0)
    const [ApproveTableData, setApproveTableData] = useState([])
    const [Acknowledgement, setAcknowledmnt] = useState(false)

    const updateAcknowldge = useCallback((e) => {
        if (e.target.checked === true) {
            setAcknowledmnt(true)
        }
        else {
            setAcknowledmnt(false)
        }
    }, [])

    const [Ackremark, setAckRemark] = useState('')
    const updateAckRemark = useCallback((e) => {
        setAckRemark(e.target.value)
    }, [])

    const [QuatationCall, setQuatationCal] = useState(false)
    const updateQuatationCall = useCallback((e) => {
        if (e.target.checked === true) {
            setQuatationCal(true)
        }
        else {
            setQuatationCal(false)
        }
    }, [])

    const [QuatationNego, setQuatationNego] = useState(false)
    const updateQuatationNego = useCallback((e) => {
        if (e.target.checked === true) {
            setQuatationNego(true)
        }
        else {
            setQuatationNego(false)
        }
    }, [])



    const [QuatationFix, setQuatationFix] = useState(false)
    const updateQuatationFix = useCallback((e) => {
        if (e.target.checked === true) {
            setQuatationFix(true)
        }
        else {
            setQuatationFix(false)
        }
    }, [])


    const [poadding, setPoadding] = useState(false)
    const updatePoAdding = useCallback((e) => {
        if (e.target.checked === true) {
            setPoadding(true)
        }
        else {
            setPoadding(false)
        }
    }, [])

    const [poDetlDis, setPoDetlDis] = useState(0)
    const [podetailData, setpodetailData] = useState([])
    const [podetail, setPoDetails] = useState({
        po_number: '',
        po_date: ''
    })

    //Destructuring
    const { po_number, po_date } = podetail
    const updatePoDetails = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setPoDetails({ ...podetail, [e.target.name]: value })
    }, [podetail])

    const [podetailFlag, setPOdetalFalg] = useState(0)
    const [getpoDetaildata, setgetPodetailData] = useState([])


    const [poComplete, setPoComplete] = useState(false)
    const updatePoComplete = useCallback((e) => {
        if (e.target.checked === true) {
            setPoComplete(true)
        }
        else {
            setPoComplete(false)
        }
    }, [])



    const [poLevelOne, setPoLevelOne] = useState(false)
    const updatePoLevelOne = useCallback((e) => {
        if (e.target.checked === true) {
            setPoLevelOne(true)
        }
        else {
            setPoLevelOne(false)
        }
    }, [])


    const [poLevelTwo, setLevelTwo] = useState(false)
    const updateLevelTwo = useCallback((e) => {
        if (e.target.checked === true) {
            setLevelTwo(true)
        }
        else {
            setLevelTwo(false)
        }
    }, [])

    const [poToSupplier, setPoToSupplier] = useState(false)
    const updatePoToSupplier = useCallback((e) => {
        if (e.target.checked === true) {
            setPoToSupplier(true)
        }
        else {
            setPoToSupplier(false)
        }
    }, [])

    useEffect(() => {
        setPoLevelOne(po_approva_level_one === 1 ? true : false)
        setLevelTwo(po_approva_level_two === 1 ? true : false)
        setPoToSupplier(po_to_supplier === 1 ? true : false)
    }, [po_approva_level_one, po_approva_level_two, po_to_supplier])
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
            const result = await axioslogin.get(`/CRFRegisterApproval/getFinalItemListApproval/${req_slno}`)
            const { succes, dataa } = result.data
            if (succes === 1) {
                const datas = dataa.map((val, index) => {
                    const obj = {
                        slno: index + 1,
                        req_detl_slno: val.req_detl_slno,
                        req_slno: val.req_slno,
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


        const getPODetails = async (req_slno) => {
            const result = await axioslogin.get(`/newCRFPurchase/getPOList/${req_slno}`)
            const { success, data } = result.data
            if (success === 1) {
                setgetPodetailData(data)
                setPOdetalFalg(1)
                setPoadding(true)
            }
            else {
                setgetPodetailData([])
            }
        }



        getItemDetails(req_slno)
        getApproItemDetails(req_slno)
        getPODetails(req_slno)
    }, [req_slno])


    const reset = useCallback(() => {
        setpuchaseFlag(0)
        setpuchaseModal(false)
        setpuchaseData([])
        setReqTableDis(0)
        setDetailData([])
        setApproveTableDis(0)
        setApproveTableData([])
        setAcknowledmnt(false)
        setAckRemark('')
    }, [setpuchaseFlag, setpuchaseModal, setpuchaseData])

    const AddItem = useCallback(() => {

        setPoDetlDis(1)
        if (po_number !== '' && po_date !== '') {
            const newdata = {
                id: Math.ceil(Math.random() * 1000),
                req_slno: req_slno,
                po_number: po_number,
                po_date: po_date,
                po_status: 1,

            }
            const datass = [...podetailData, newdata]
            if (datass.length !== 0) {
                setpodetailData(datass)
                const resetarrray = {
                    po_number: '',
                    po_date: ''
                }
                setPoDetails(resetarrray)
            }
            else {

            }
        }
        else {
            warningNotify("Please Enter PO Details")
        }
    }, [po_number, po_date, req_slno, podetailData])

    const postPurchaseCrf = useMemo(() => {
        return {
            req_slno: req_slno,
            ack_status: 1,
            ack_remarks: Ackremark,
            create_user: id
        }

    }, [req_slno, Ackremark, id])


    const QuatationCallPatch = useMemo(() => {
        return {
            quatation_calling_status: QuatationCall === true ? 1 : 0,
            quatation_calling_user: id,
            quatation_calling_date: format(new Date(), 'yyyy-MM-dd hh:mm:ss'),
            crm_purchase_slno: crm_purchase_slno,
        }
    }, [crm_purchase_slno, id, QuatationCall])


    const QuatationNegotnPatch = useMemo(() => {
        return {
            quatation_negotiation: QuatationNego === true ? 1 : 0,
            quatation_negotiation_user: id,
            quatation_negotiation_date: format(new Date(), 'yyyy-MM-dd hh:mm:ss'),
            crm_purchase_slno: crm_purchase_slno,
        }
    }, [crm_purchase_slno, id, QuatationNego])

    const QuatationFixingPatch = useMemo(() => {
        return {
            quatation_fixing: QuatationFix === true ? 1 : 0,
            quatation_fixing_user: id,
            quatation_fixing_date: format(new Date(), 'yyyy-MM-dd hh:mm:ss'),
            crm_purchase_slno: crm_purchase_slno,
        }
    }, [crm_purchase_slno, id, QuatationFix])


    const singlePOInsert = useMemo(() => {
        return {
            req_slno: req_slno,
            po_number: po_number,
            po_date: po_date,
            po_status: 1,
            create_user: id
        }
    }, [po_date, id, po_number, req_slno])


    const postdataDetl = podetailData && podetailData.map((val) => {
        return {
            req_slno: req_slno,
            po_number: val.po_number,
            po_date: val.po_date,
            po_status: 1,
            create_user: id
        }
    })

    const PoCompletePatch = useMemo(() => {
        return {
            po_complete: poComplete === true ? 1 : 0,
            po_complete_user: id,
            po_complete_date: format(new Date(), 'yyyy-MM-dd hh:mm:ss'),
            crm_purchase_slno: crm_purchase_slno,
        }
    }, [crm_purchase_slno, id, poComplete])


    const PoApprovalPatch = useMemo(() => {
        return {
            po_approva_level_one: poLevelOne === true ? 1 : 0,
            po_approva_level_two: poLevelTwo === true ? 1 : 0,
            po_to_supplier: poToSupplier === true ? 1 : 0,
            edit_user: id,
            crm_purchase_slno: crm_purchase_slno,
        }
    }, [crm_purchase_slno, id, poLevelOne, poLevelTwo, poToSupplier])



    const submit = useCallback(() => {

        const purchaseInsert = async (postPurchaseCrf) => {
            const result = await axioslogin.post('/newCRFPurchase/InsertPurchaseAck', postPurchaseCrf);
            const { success, message } = result.data
            if (success === 1) {
                succesNotify(message)
                reset()
                setCount(count + 1)
            }
            else {
                warningNotify(message)
            }
        }


        const updateQuatationCalling = async (QuatationCallPatch) => {
            const result = await axioslogin.patch('/newCRFPurchase/QuatationCalling', QuatationCallPatch);
            const { success, message } = result.data;
            if (success === 1) {
                succesNotify(message)
                setCount(count + 1)
                reset()
            }
            else {
                warningNotify(message)
            }
        }

        const updateQuatationNegotiatn = async (QuatationNegotnPatch) => {
            const result = await axioslogin.patch('/newCRFPurchase/QuatationNegotiation', QuatationNegotnPatch);
            const { success, message } = result.data;
            if (success === 1) {
                succesNotify(message)
                setCount(count + 1)
                reset()
            }
            else {
                warningNotify(message)
            }
        }

        const updateQuatationFixing = async (QuatationFixingPatch) => {
            const result = await axioslogin.patch('/newCRFPurchase/QuatationFixing', QuatationFixingPatch);
            const { success, message } = result.data;
            if (success === 1) {
                succesNotify(message)
                setCount(count + 1)
                reset()
            }
            else {
                warningNotify(message)
            }
        }


        const InsertSinglePO = async (singlePOInsert) => {
            const result = await axioslogin.post('/newCRFPurchase/InsertinglePO', singlePOInsert);
            const { success, message } = result.data;
            if (success === 1) {
                succesNotify(message)
                setCount(count + 1)
                reset()
            }
            else {
                warningNotify(message)
            }
        }


        const InsertMultiplePO = async (postdataDetl) => {
            const result = await axioslogin.post('/newCRFPurchase/InsertMultiplePO', postdataDetl);
            const { success, message } = result.data;
            if (success === 1) {
                succesNotify(message)
                setCount(count + 1)
                reset()
            }
            else {
                warningNotify(message)
            }
        }

        const updatePOComplete = async (PoCompletePatch) => {
            const result = await axioslogin.patch('/newCRFPurchase/PoComplete', PoCompletePatch);
            const { success, message } = result.data;
            if (success === 1) {
                succesNotify(message)
                setCount(count + 1)
                reset()
            }
            else {
                warningNotify(message)
            }
        }


        const updatePoApprovals = async (PoApprovalPatch) => {
            const result = await axioslogin.patch('/newCRFPurchase/PoFinals', PoApprovalPatch);
            const { success, message } = result.data;
            if (success === 1) {
                succesNotify(message)
                setCount(count + 1)
                reset()
            }
            else {
                warningNotify(message)
            }
        }

        if (ack_status !== 1) {
            purchaseInsert(postPurchaseCrf)
        }
        else {
            if (quatation_calling_status !== 1 && QuatationCall === true) {
                updateQuatationCalling(QuatationCallPatch)
            } else if (quatation_negotiation !== 1 && QuatationNego === true) {
                updateQuatationNegotiatn(QuatationNegotnPatch)
            }
            else if (quatation_fixing !== 1 && QuatationFix === true) {
                updateQuatationFixing(QuatationFixingPatch)
            }

            else if (poadding === true && poComplete === false && poLevelOne === false && poLevelTwo === false && poToSupplier === false) {
                if (podetailData.length === 0) {
                    InsertSinglePO(singlePOInsert)
                }
                else {
                    InsertMultiplePO(postdataDetl)
                }

            }
            else if (poComplete === true) {
                updatePOComplete(PoCompletePatch)
            }
            else if (poLevelOne === true | poLevelTwo === true || poToSupplier === true) {
                updatePoApprovals(PoApprovalPatch)
            }
        }

    }, [postPurchaseCrf, ack_status, count, setCount, QuatationCallPatch, QuatationCall,
        QuatationNegotnPatch, QuatationFixingPatch, QuatationNego, QuatationFix,
        singlePOInsert, podetailData, postdataDetl, poComplete, PoCompletePatch, PoApprovalPatch,
        poLevelOne, poLevelTwo, poToSupplier, poadding, quatation_calling_status, quatation_fixing,
        quatation_negotiation, reset])

    //column title setting
    const [column] = useState([
        { headerName: "PO Number", field: "po_number" },
        { headerName: "PO Date", field: "po_date", autoHeight: true, wrapText: true, width: 250, filter: "true" },

    ])

    const ModalClose = useCallback(() => {
        reset()
    }, [reset])



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
                        CRF Purchase Process
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
                        {ApproveTableDis === 1 ?
                            <Paper variant='outlined' sx={{ p: 0, mt: 1 }} >
                                <Box sx={{
                                    width: "100%", display: "flex", p: 0.5, pb: 0, flexDirection: 'column',
                                }}>
                                    <CssVarsProvider>
                                        <Typography sx={{ fontSize: 15 }}>Approved Items</Typography>
                                    </CssVarsProvider>
                                </Box>
                                <ApprovedItemListDis ApproveData={ApproveTableData}
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
                                            <Typography sx={{ fontSize: 16, fontWeight: 600 }} >MD Operation :

                                                {
                                                    md_approve === 1 ?
                                                        <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="success" variant="outlined"> {md}
                                                        </Typography> : md_approve === 2 ?
                                                            <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="danger" variant="outlined"> {md}
                                                            </Typography> : md_approve === 3 ?
                                                                <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="primary" variant="outlined"> {md}
                                                                </Typography> : null
                                                }
                                            </Typography>
                                        </CssVarsProvider>
                                        {
                                            md_approve_date !== null ? <Box
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: 'row',
                                                    justifyContent: "space-evenly",
                                                    pr: 2
                                                }}>
                                                <CssVarsProvider>
                                                    <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5 }}>
                                                        {mdApprovdate}</Typography>
                                                    <Typography ml={2} sx={{ fontSize: 15 }} >/ </Typography>
                                                    <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, textTransform: "capitalize" }}>
                                                        {md_user} </Typography>
                                                </CssVarsProvider>   </Box> : null
                                        }

                                    </Box>
                                    {
                                        md_approve === 1 ? <Box sx={{ width: "100%", pl: 1 }}>
                                            <CssVarsProvider>
                                                <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification/ Requirement Description: </Typography>
                                                <Typography ml={10} sx={{ fontSize: 15 }} >{md_approve_remarks} </Typography>
                                            </CssVarsProvider>
                                            <CssVarsProvider>
                                                <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detailed Analysis of Requirement: </Typography>
                                                <Typography ml={10} sx={{ fontSize: 15 }} >{md_detial_analysis} </Typography>
                                            </CssVarsProvider> </Box> :
                                            md_approve === 2 ? <Box sx={{ width: "100%" }}>
                                                <CssVarsProvider>
                                                    <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification for Reject: </Typography>
                                                    <Typography ml={10} sx={{ fontSize: 15 }} >{md_approve_remarks} </Typography>
                                                </CssVarsProvider>
                                            </Box> :
                                                md_approve === 3 ? <Box sx={{ width: "100%" }}>
                                                    <CssVarsProvider>
                                                        <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification for On-Hold: </Typography>
                                                        <Typography ml={10} sx={{ fontSize: 15 }} >{md_approve_remarks} </Typography>
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
                                            <Typography sx={{ fontSize: 16, fontWeight: 600 }} >ED Operation :

                                                {
                                                    ed_approve === 1 ?
                                                        <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="success" variant="outlined"> {ed}
                                                        </Typography> : ed_approve === 2 ?
                                                            <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="danger" variant="outlined"> {ed}
                                                            </Typography> : ed_approve === 3 ?
                                                                <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="primary" variant="outlined"> {ed}
                                                                </Typography> : null
                                                }
                                            </Typography>
                                        </CssVarsProvider>
                                        {
                                            ed_approve_date !== null ? <Box
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: 'row',
                                                    justifyContent: "space-evenly",
                                                    pr: 2
                                                }}>
                                                <CssVarsProvider>
                                                    <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5 }}>
                                                        {edApprovdate}</Typography>
                                                    <Typography ml={2} sx={{ fontSize: 15 }} >/ </Typography>
                                                    <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, textTransform: "capitalize" }}>
                                                        {ed_user} </Typography>
                                                </CssVarsProvider>   </Box> : null
                                        }
                                    </Box>
                                    {
                                        ed_approve === 1 ? <Box sx={{ width: "100%", pl: 1 }}>
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
                                                    <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification for Reject: </Typography>
                                                    <Typography ml={10} sx={{ fontSize: 15 }} >{ed_approve_remarks} </Typography>
                                                </CssVarsProvider>
                                            </Box> :
                                                ed_approve === 3 ? <Box sx={{ width: "100%" }}>
                                                    <CssVarsProvider>
                                                        <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification for On-Hold: </Typography>
                                                        <Typography ml={10} sx={{ fontSize: 15 }} >{ed_approve_remarks} </Typography>
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

                        {ack_status !== 1 ?
                            <Paper variant='outlined' sx={{ p: 0, mt: 1 }} >
                                <Box sx={{
                                    display: 'flex', flexDirection: 'row', flexWrap: 'wrap',
                                }} >
                                    <Box sx={{ width: "20%", pr: 1, mt: 1, pl: 1 }}>
                                        <CusCheckBox
                                            label="Acknowledgement"
                                            color="primary"
                                            size="md"
                                            name="Acknowledgement"
                                            value={Acknowledgement}
                                            checked={Acknowledgement}
                                            onCheked={updateAcknowldge}
                                        />
                                    </Box>
                                    {Acknowledgement === true ?
                                        <Box sx={{ width: "50%", pr: 1, mt: 1, pl: 1 }}>
                                            <CustomTextarea
                                                required
                                                type="text"
                                                size="md"
                                                style={{
                                                    width: "100%",
                                                    height: 50,
                                                }}
                                                maxRows={1}
                                                value={Ackremark}
                                                onchange={updateAckRemark}
                                            />

                                        </Box> : null
                                    }
                                </Box>
                            </Paper>
                            :
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
                                                <Typography sx={{ fontSize: 16, fontWeight: 600 }} >Purchase :

                                                    {
                                                        ack_status === 1 ?
                                                            <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="success" variant="outlined"> Acknowledged
                                                            </Typography> : null
                                                    }
                                                </Typography>
                                            </CssVarsProvider>
                                            {
                                                ack_date !== null ? <Box
                                                    sx={{
                                                        display: "flex",
                                                        flexDirection: 'row',
                                                        justifyContent: "space-evenly",
                                                        pr: 2
                                                    }}>
                                                    <CssVarsProvider>
                                                        <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5 }}>
                                                            {ack_date}</Typography>
                                                        <Typography ml={2} sx={{ fontSize: 15 }} >/ </Typography>
                                                        <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, textTransform: "capitalize" }}>
                                                            {purchase_ackuser} </Typography>
                                                    </CssVarsProvider>   </Box> : null
                                            }
                                        </Box>
                                        <Box sx={{ width: "100%", pl: 1 }}>
                                            <CssVarsProvider>
                                                <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Purchase Remarks: </Typography>
                                                <Typography ml={10} sx={{ fontSize: 15 }} >{ack_remarks} </Typography>
                                            </CssVarsProvider>
                                        </Box>
                                    </Box>
                                </Paper>
                            </Box>
                        }

                        {
                            quatation_calling_status !== 1 && ack_status === 1 ?
                                <Paper variant='outlined' sx={{ p: 0, mt: 1 }} >
                                    <Box sx={{
                                        display: 'flex', flexDirection: 'row', flexWrap: 'wrap',
                                    }} >
                                        <Box sx={{ width: "20%", pr: 1, mt: 1, pl: 1 }}>
                                            <CusCheckBox
                                                label="Quatation Call"
                                                color="primary"
                                                size="md"
                                                name="QuatationCall"
                                                value={QuatationCall}
                                                checked={QuatationCall}
                                                onCheked={updateQuatationCall}
                                            />
                                        </Box>
                                    </Box>
                                </Paper> :

                                quatation_calling_status === 1 ?

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
                                                        <Typography sx={{ fontSize: 16, fontWeight: 600 }} >Quatation Calling :
                                                            {
                                                                quatation_calling_status === 1 ?
                                                                    <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="success" variant="outlined"> Yes
                                                                    </Typography> : <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="success" variant="outlined"> No
                                                                    </Typography>
                                                            }
                                                        </Typography>
                                                    </CssVarsProvider>
                                                    {quatation_calling_status === 1 ?
                                                        <Box
                                                            sx={{
                                                                display: "flex",
                                                                flexDirection: 'row',
                                                                justifyContent: "space-evenly",
                                                                pr: 2
                                                            }}>
                                                            <CssVarsProvider>
                                                                <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5 }}>
                                                                    {quatation_calling_date}</Typography>
                                                                <Typography ml={2} sx={{ fontSize: 15 }} >/ </Typography>
                                                                <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, textTransform: "capitalize" }}>
                                                                    {quatation_user} </Typography>
                                                            </CssVarsProvider>
                                                        </Box> : null
                                                    }
                                                </Box>
                                                {
                                                    quatation_negotiation !== 1 && quatation_calling_status === 1 ?
                                                        <Paper variant='outlined' sx={{ p: 0, mt: 1 }} >
                                                            <Box sx={{
                                                                display: 'flex', flexDirection: 'row', flexWrap: 'wrap',
                                                            }} >
                                                                <Box sx={{ width: "20%", pr: 1, mt: 1, pl: 1 }}>
                                                                    <CusCheckBox
                                                                        label="Quatation Negotiation"
                                                                        color="primary"
                                                                        size="md"
                                                                        name="QuatationNego"
                                                                        value={QuatationNego}
                                                                        checked={QuatationNego}
                                                                        onCheked={updateQuatationNego}
                                                                    />
                                                                </Box>
                                                            </Box>
                                                        </Paper> :
                                                        quatation_calling_status === 1 ?


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
                                                                                <Typography sx={{ fontSize: 16, fontWeight: 600 }} >Quatation Negotation :
                                                                                    {
                                                                                        quatation_negotiation === 1 ?
                                                                                            <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="success" variant="outlined"> Yes
                                                                                            </Typography> : <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="success" variant="outlined"> No
                                                                                            </Typography>
                                                                                    }
                                                                                </Typography>
                                                                            </CssVarsProvider>
                                                                            {quatation_negotiation === 1 ?
                                                                                <Box
                                                                                    sx={{
                                                                                        display: "flex",
                                                                                        flexDirection: 'row',
                                                                                        justifyContent: "space-evenly",
                                                                                        pr: 2
                                                                                    }}>
                                                                                    <CssVarsProvider>
                                                                                        <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5 }}>
                                                                                            {quatation_negotiation_date}</Typography>
                                                                                        <Typography ml={2} sx={{ fontSize: 15 }} >/ </Typography>
                                                                                        <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, textTransform: "capitalize" }}>
                                                                                            {quatation_neguser} </Typography>
                                                                                    </CssVarsProvider>
                                                                                </Box> : null
                                                                            }
                                                                        </Box>


                                                                        {
                                                                            quatation_fixing !== 1 && quatation_calling_status === 1 ?

                                                                                <Paper variant='outlined' sx={{ p: 0, mt: 1 }} >
                                                                                    <Box sx={{
                                                                                        display: 'flex', flexDirection: 'row', flexWrap: 'wrap',
                                                                                    }} >
                                                                                        <Box sx={{ width: "20%", pr: 1, mt: 1, pl: 1 }}>
                                                                                            <CusCheckBox
                                                                                                label="Quatation Fixing"
                                                                                                color="primary"
                                                                                                size="md"
                                                                                                name="QuatationFix"
                                                                                                value={QuatationFix}
                                                                                                checked={QuatationFix}
                                                                                                onCheked={updateQuatationFix}
                                                                                            />
                                                                                        </Box>
                                                                                    </Box>
                                                                                </Paper> :
                                                                                quatation_calling_status === 1 ?
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
                                                                                                        <Typography sx={{ fontSize: 16, fontWeight: 600 }} >Quatation Fixing :
                                                                                                            {
                                                                                                                quatation_fixing === 1 ?
                                                                                                                    <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="success" variant="outlined"> Yes
                                                                                                                    </Typography> : <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="success" variant="outlined"> No
                                                                                                                    </Typography>
                                                                                                            }
                                                                                                        </Typography>
                                                                                                    </CssVarsProvider>
                                                                                                    {quatation_fixing === 1 ?
                                                                                                        <Box
                                                                                                            sx={{
                                                                                                                display: "flex",
                                                                                                                flexDirection: 'row',
                                                                                                                justifyContent: "space-evenly",
                                                                                                                pr: 2
                                                                                                            }}>
                                                                                                            <CssVarsProvider>
                                                                                                                <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5 }}>
                                                                                                                    {quatation_fixing_date}</Typography>
                                                                                                                <Typography ml={2} sx={{ fontSize: 15 }} >/ </Typography>
                                                                                                                <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, textTransform: "capitalize" }}>
                                                                                                                    {quatation_fixuser} </Typography>
                                                                                                            </CssVarsProvider>
                                                                                                        </Box> : null
                                                                                                    }
                                                                                                </Box>
                                                                                            </Box>
                                                                                        </Paper>
                                                                                    </Box> : null

                                                                        }





                                                                    </Box>
                                                                </Paper>
                                                            </Box>
                                                            : null

                                                }
                                            </Box>
                                        </Paper>
                                    </Box>
                                    : null
                        }
                        {
                            ack_status === 1 && poadding === false ?
                                <Box sx={{ width: "100%", mt: 0 }}>
                                    <Paper variant='outlined' sx={{ mt: 1 }} >
                                        <Box sx={{ width: "20%", pr: 1, mt: 1, pl: 1 }}>
                                            <CusCheckBox
                                                label="PO Add"
                                                color="primary"
                                                size="md"
                                                name="poadding"
                                                value={poadding}
                                                checked={poadding}
                                                onCheked={updatePoAdding}
                                            />
                                        </Box>
                                    </Paper>
                                </Box>
                                :
                                (poadding === true || po_prepartion === 1) && po_complete !== 1 ?

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
                                                    flexDirection: "column"
                                                }}>
                                                    <Typography sx={{ fontSize: 13, fontWeight: 600, pl: 1 }} >PO Details: </Typography>
                                                    <Box sx={{
                                                        width: "100%",
                                                        pl: 1, pb: 1,
                                                        display: "flex",
                                                        flexDirection: 'row'
                                                    }}>
                                                        <Box sx={{
                                                            width: "30%",
                                                            display: "flex",
                                                            pr: 1,
                                                            flexDirection: "column"
                                                        }}>
                                                            <CustomPaperTitle heading="PO No" />
                                                            <TextFieldCustom
                                                                type="text"
                                                                size="sm"
                                                                name="po_number"
                                                                value={po_number}
                                                                onchange={updatePoDetails}
                                                            />
                                                        </Box>

                                                        <Box sx={{
                                                            width: "25%",
                                                            display: "flex",
                                                            flexDirection: "column",
                                                            pr: 1
                                                        }}>
                                                            <CustomPaperTitle heading="PO Date" />
                                                            <TextFieldCustom
                                                                type="date"
                                                                size="sm"
                                                                name="po_date"
                                                                value={po_date}
                                                                onchange={updatePoDetails}
                                                            />
                                                        </Box>
                                                        <Box sx={{
                                                            width: "7%",
                                                            pt: 2
                                                        }}>

                                                            <Tooltip title="Add More" placement="top">
                                                                <IconButton variant="outlined" color="primary" onClick={AddItem}>
                                                                    <MdOutlineAddCircleOutline size={25} />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </Box>
                                                    </Box>

                                                    {poDetlDis === 1 ?
                                                        <Box sx={{ width: "50%", pl: 5, pb: 2 }}>Multiple added PO
                                                            <CrfReqDetailCmpnt
                                                                columnDefs={column}
                                                                tableData={podetailData}
                                                            />
                                                        </Box> : null
                                                    }

                                                    {
                                                        podetailFlag === 1 ?
                                                            <Box sx={{ width: "50%", pl: 5, pb: 2 }}> Already added PO
                                                                <CrfReqDetailCmpnt
                                                                    columnDefs={column}
                                                                    tableData={getpoDetaildata}
                                                                />
                                                            </Box> : null
                                                    }
                                                    <Box sx={{
                                                        display: 'flex', flexDirection: 'row', flexWrap: 'wrap',
                                                    }} >
                                                        <Box sx={{ width: "30%", pr: 1, mt: 1, pl: 1 }}>
                                                            <CusCheckBox
                                                                label="Po Complete  Ready To Approval"
                                                                color="primary"
                                                                size="md"
                                                                name="poComplete"
                                                                value={poComplete}
                                                                checked={poComplete}
                                                                onCheked={updatePoComplete}
                                                            />
                                                        </Box>

                                                    </Box>

                                                </Box>
                                            </Box>
                                        </Paper>
                                    </Box>
                                    :

                                    po_complete === 1 ?
                                        <Box sx={{ width: "100%", mt: 0 }}>
                                            <Paper variant='outlined' sx={{ mt: 1 }} >
                                                {
                                                    podetailFlag === 1 ?
                                                        <Box sx={{ width: "50%", pl: 5, pb: 2 }}> Added PO
                                                            <CrfReqDetailCmpnt
                                                                columnDefs={column}
                                                                tableData={getpoDetaildata}
                                                            />
                                                        </Box> : null
                                                }
                                            </Paper>

                                            <Paper variant='outlined' sx={{ mt: 1 }} >
                                                <Box sx={{ width: "20%", pr: 1, mt: 1, pl: 1 }}>
                                                    <CusCheckBox
                                                        label="PO Approval Level 1"
                                                        color="primary"
                                                        size="md"
                                                        name="poLevelOne"
                                                        value={poLevelOne}
                                                        checked={poLevelOne}
                                                        onCheked={updatePoLevelOne}
                                                    />
                                                </Box>

                                                <Box sx={{ width: "20%", pr: 1, mt: 1, pl: 1 }}>
                                                    <CusCheckBox
                                                        label="PO Approval Level 2"
                                                        color="primary"
                                                        size="md"
                                                        name="poLevelTwo"
                                                        value={poLevelTwo}
                                                        checked={poLevelTwo}
                                                        onCheked={updateLevelTwo}
                                                    />
                                                </Box>

                                                <Box sx={{ width: "20%", pr: 1, mt: 1, pl: 1 }}>
                                                    <CusCheckBox
                                                        label="PO To Supplier"
                                                        color="primary"
                                                        size="md"
                                                        name="poToSupplier"
                                                        value={poToSupplier}
                                                        checked={poToSupplier}
                                                        onCheked={updatePoToSupplier}
                                                    />
                                                </Box>
                                            </Paper>






                                        </Box>
                                        :





                                        null
                        }
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

export default memo(PurchaseModal)