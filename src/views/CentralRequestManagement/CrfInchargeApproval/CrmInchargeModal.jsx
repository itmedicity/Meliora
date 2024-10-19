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
import ItemsApprovalCompnt from './ItemsApprovalCompnt';
import ApprovalCompntAll from '../ComonComponent/ApprovalCompntAll';
import _ from 'underscore'
import { useSelector } from 'react-redux'
import { format } from 'date-fns';
import ReqImageDisModal from '../ComonComponent/ReqImageDisModal';
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static';
import AddMoreItemDtails from '../ComonComponent/AddMoreItemDtails';
import CusIconButton from 'src/views/Components/CusIconButton'
import AttachFileIcon from '@mui/icons-material/AttachFile';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

const CrmInchargeModal = ({ open, ApprovalData, setApprovalModal, setApprovalFlag, count, setCount, setApprovalData }) => {

    const { req_slno, req_date, actual_requirement, needed, expected_date, incharge_approve,
        incharge_remarks, inch_detial_analysis, image_status } = ApprovalData

    const expdate = expected_date !== null ? format(new Date(expected_date), 'dd-MM-yyyy') : "Not Updated"

    const [reqTableDis, setReqTableDis] = useState(0)

    const [detailData, setDetailData] = useState([])
    const id = useSelector((state) => state.LoginUserData.empid, _.isEqual)
    const [ApproveTableDis, setApproveTableDis] = useState(0)
    const [ApproveTableData, setApproveTableData] = useState([])
    const [addMoreItems, setMoreItem] = useState(0)
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
        setApprove(incharge_approve === 1 ? true : false)
        setReject(incharge_approve === 2 ? true : false)
        setPending(incharge_approve === 3 ? true : false)
        setRemark(incharge_remarks !== null ? incharge_remarks : '')
        setDetailAnalis(inch_detial_analysis !== null ? inch_detial_analysis : '')
    }, [incharge_approve, incharge_remarks, inch_detial_analysis])

    const InchargePatchData = useMemo(() => {
        return {
            incharge_approve: approve === true ? 1 : reject === true ? 2 : pending === true ? 3 : null,
            incharge_user: id,
            req_slno: req_slno,
            incharge_apprv_date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
            incharge_remarks: remark,
            inch_detial_analysis: detailAnalis

        }
    }, [approve, reject, pending, id, remark, detailAnalis, req_slno])



    const AddItems = useCallback(() => {
        setMoreItem(1)
    }, [])

    const reset = useCallback(() => {
        setReqTableDis(0)
        setDetailData([])
        setApproveTableDis(0)
        setApproveTableData([])
        setRemark('')
        setDetailAnalis('')
        setPending(false)
        setApprove(false)
        setReject(false)
        setMoreItem(0)
        setApprovalModal(false)
        setApprovalFlag(0)
        setApprovalData([])
        setCount(0)
        setImageShowFlag(0)
        setImageShow(false)
        setImageArry([])
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

    }, [req_slno, addMoreItems])


    const submit = useCallback(() => {
        const updateInchargeApproval = async (InchargePatchData) => {
            const result = await axioslogin.patch('/CRFRegisterApproval/incharge', InchargePatchData);
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
                updateInchargeApproval(InchargePatchData)
            }
            else if ((reject === true && remark !== '') || (pending === true && remark !== '')) {
                updateInchargeApproval(InchargePatchData)
            }
            else {
                warningNotify("Justification must be Entered")
            }
        } else {
            warningNotify("Please Select any status")
        }

    }, [approve, reject, pending, remark, detailAnalis, InchargePatchData, setCount, count, reset])

    const [imageshowFlag, setImageShowFlag] = useState(0)
    const [imageshow, setImageShow] = useState(false)
    const [imagearray, setImageArry] = useState([])

    const ViewImage = useCallback(() => {
        setImageShowFlag(1)
        setImageShow(true)
    }, [])
    useEffect(() => {
        const getImage = async (req_slno) => {
            const result = await axioslogin.get(`/newCRFRegisterImages/crfRegimageGet/${req_slno}`)
            const { success, data } = result.data
            if (success === 1) {
                const fileNames = data;
                const fileUrls = fileNames.map((fileName) => {
                    return `${PUBLIC_NAS_FOLDER}/CRF/crf_registration/${req_slno}/${fileName}`;
                });
                setImageArry(fileUrls);
            }
        }
        if (imageshowFlag === 1) {
            getImage(req_slno)
        }
    }, [imageshowFlag, req_slno])
    const handleClose = useCallback(() => {
        setImageShowFlag(0)
        setImageShow(false)
        setImageArry([])
    }, [])

    const ModalClose = useCallback(() => {
        reset()
    }, [reset])

    return (
        <Fragment>
            <ToastContainer />
            {imageshowFlag === 1 ? <ReqImageDisModal open={imageshow} handleClose={handleClose}
                images={imagearray} /> : null}
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
                        Incharge Approval
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
                                {image_status === 1 ?
                                    <Box sx={{ mx: 0.5, pb: 0.5 }}>
                                        <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={ViewImage}  >
                                            <AttachFileIcon fontSize='small' />
                                            <Typography color="primary" sx={{ fontSize: 15, pl: 1, pr: 1, }}>View Image</Typography>
                                        </CusIconButton>
                                    </Box>
                                    : null}

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
                                        <Typography sx={{ fontSize: 15 }}>Requested Items: Nil</Typography>
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
                                                    // setReqTableDis={setReqTableDis} setDetailData={setDetailData}
                                                    setApproveTableDis={setApproveTableDis}
                                                    ApproveTableDis={ApproveTableDis}
                                                    ApproveTableData={ApproveTableData}
                                                    setApproveTableData={setApproveTableData}
                                                    setMoreItem={setMoreItem}
                                                />


                                                <Box sx={{ pl: 2 }}>
                                                    <Button onClick={AddItems} variant="contained"
                                                        color="primary">Add Items</Button>
                                                </Box>
                                                {addMoreItems === 1 ? <AddMoreItemDtails req_slno={req_slno}
                                                    setMoreItem={setMoreItem}
                                                /> : null}

                                                <ApprovalCompntAll
                                                    heading="Incharge Approval"
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
                                                    heading="Incharge Approval"
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
                            </Paper>
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

export default memo(CrmInchargeModal) 