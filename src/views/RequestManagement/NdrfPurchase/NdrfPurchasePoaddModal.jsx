import React, { Fragment, useCallback, useState, memo, useEffect, useMemo } from 'react'
import Slide from '@mui/material/Slide';
import { ToastContainer } from 'react-toastify';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { Box, Paper, IconButton, Tooltip } from '@mui/material'
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { format } from 'date-fns'
import { axioslogin } from 'src/views/Axios/Axios'
import { succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import { useSelector } from 'react-redux'
import { CssVarsProvider, Typography } from '@mui/joy'
import Divider from '@mui/material/Divider';
import { TypoHeadColor } from 'src/color/Color'
import _ from 'underscore'
import ItemApprovalCmp from '../DepartmentApprovals/ItemApprovalCmp';
import ReqImageDisplayModal from '../RequestRegister/ReqImageDisplayModal';
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static';
import CustomTextarea from 'src/views/Components/CustomTextarea'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import CustomPaperTitle from 'src/views/Components/CustomPaperTitle'
import { MdOutlineAddCircleOutline } from 'react-icons/md';
import ReqRegistItemCmpt from '../RequestRegister/ReqRegistItemCmpt';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

const NdrfPurchasePoaddModal = ({ open, setOpen, datas, count, setCount }) => {
    const { req_slno, reqcreate, ndrf_mast_slno, ndrfcreate, actual_requirement, needed, location, dept_name, req_userdeptsec,
        expected_date, req_user, userdeptsec, image_status, incharge_approve, incharge_req,
        incharge, incharge_remark, inch_detial_analysis, incharge_apprv_date, incharge_user,
        hod_approve, hod, hod_remarks, hod_detial_analysis, hod_approve_date, category,
        hod_user, dms_req, dms, dms_approve, dms_remarks, dms_detail_analysis, dms_approve_date, dms_user,
        ms_approve_req, ms_approve, ms, ms_approve_remark, ms_detail_analysis, ms_approve_date, ms_user,
        manag_operation_approv, om, manag_operation_remarks, om_detial_analysis, om_approv_date, manag_operation_user,
        senior_manage_approv, smo, senior_manage_remarks, smo_detial_analysis, som_aprrov_date, senior_manage_user,
        cao_approve, cao, cao_approve_remarks, ceo_detial_analysis, cao_approv_date, cao_user,
        md_approve, md, md_approve_remarks, md_detial_analysis, md_approve_date, ed_approve, ed,
        ed_approve_remarks, ed_detial_analysis, md_user, ed_user, ed_approve_date, ed_approve_req,
        md_approve_req, ndrf_om_remarks, ndrf_om_approv, ndrfom_approv_date, ndrf_om_user, ndrfOM,
        ndrf_smo_approv, ndrfSMO, ndrf_smo_remarks, ndrf_som_aprrov_date, ndrf_smo_user, ndrf_cao_approve,
        ndrf_cao_approve_remarks, ndrf_cao_approv_date, ndrfCOO, ndrf_cao_user,
        ndrf_md_approve, ndrf_md_approve_remarks, ndrfMD, ndrf_md_approve_date, ndrf_md_user,
        ndrf_ed_approve, ndrfED, ndrf_ed_approve_remarks, ndrf_ed_approve_date, ndrf_ed_user,
        ndrf_purchase, ndrf_purchase_acknolwdge, purchase_date, purchase_user,
        ndrf_po_close, ndrf_po_close_remarks, ndrf_po_close_user, ndrf_po_close_date
    } = datas[0]


    const reqdate = reqcreate !== null ? format(new Date(reqcreate), 'dd-MM-yyyy') : "Not Updated"
    const expdate = expected_date !== null ? format(new Date(expected_date), 'dd-MM-yyyy') : "Not Updated"
    const inchargeApprovdate = incharge_apprv_date !== null ? format(new Date(incharge_apprv_date), 'dd-MM-yyyy hh:mm:ss') : "Not Updated"
    const hodApprovdate = hod_approve_date !== null ? format(new Date(hod_approve_date), 'dd-MM-yyyy hh:mm:ss') : "Not Updated"
    const dmsApprovdate = dms_approve_date !== null ? format(new Date(dms_approve_date), 'dd-MM-yyyy hh:mm:ss') : "Not Updated"
    const msApprovdate = ms_approve_date !== null ? format(new Date(ms_approve_date), 'dd-MM-yyyy hh:mm:ss') : "Not Updated"
    const omdate = om_approv_date !== null ? format(new Date(om_approv_date), 'dd-MM-yyyy hh:mm:ss') : "Not Updated"
    const smodate = som_aprrov_date !== null ? format(new Date(som_aprrov_date), 'dd-MM-yyyy hh:mm:ss') : "Not Updated"
    const caodate = cao_approv_date !== null ? format(new Date(cao_approv_date), 'dd-MM-yyyy hh:mm:ss') : "Not Updated"
    const mddate = md_approve_date !== null ? format(new Date(md_approve_date), 'dd-MM-yyyy hh:mm:ss') : "Not Updated"
    const eddate = ed_approve_date !== null ? format(new Date(ed_approve_date), 'dd-MM-yyyy hh:mm:ss') : "Not Updated"

    const nrdfCreate = ndrfcreate !== null ? format(new Date(ndrfcreate), 'dd-MM-yyy hh:mm:ss') : "Not Updated"
    const ndrfOmdate = ndrfom_approv_date !== null ? format(new Date(ndrfom_approv_date), 'dd-MM-yyyy hh:mm:ss') : "Not Updated"
    const ndrfSmodate = ndrf_som_aprrov_date !== null ? format(new Date(ndrf_som_aprrov_date), 'dd-MM-yyyy hh:mm:ss') : "Not Updated"
    const ndrfCoodate = ndrf_cao_approv_date !== null ? format(new Date(ndrf_cao_approv_date), 'dd-MM-yyyy hh:mm:ss') : "Not Updated"
    const ndrfEddate = ndrf_ed_approve_date !== null ? format(new Date(ndrf_ed_approve_date), 'dd-MM-yyyy hh:mm:ss') : "Not Updated"
    const ndrfMddate = ndrf_md_approve_date !== null ? format(new Date(ndrf_md_approve_date), 'dd-MM-yyyy hh:mm:ss') : "Not Updated"
    const purchaseAckldege = purchase_date !== null ? format(new Date(purchase_date), 'dd-MM-yyyy hh:mm:ss') : "Not Updated"
    const poclosedate = ndrf_po_close_date !== null ? format(new Date(ndrf_po_close_date), 'dd-MM-yyyy hh:mm:ss') : "Not Updated"

    //redux for geting login id
    const id = useSelector((state) => state.LoginUserData.empid, _.isEqual)
    //state for Remarks
    const [dataPost, setdataPost] = useState([])
    const [tableDis, setTableDis] = useState(0)
    const [approve, setApprove] = useState(false)
    const [datacollectdata, setDataCollectData] = useState([])
    const [colectDetlCheck, setCollectDetailCheck] = useState(0)
    const [imageshowFlag, setImageShowFlag] = useState(0)
    const [imageshow, setImageShow] = useState(false)
    const [imagearray, setImageArry] = useState([])
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

    const ViewImage = useCallback(() => {
        setImageShowFlag(1)
        setImageShow(true)
    }, [])

    const handleClose = useCallback(() => {
        setImageShowFlag(0)
        setImageShow(false)
    }, [])


    const updateApprove = useCallback((e) => {
        if (e.target.checked === true) {
            setApprove(true)
        }
        else {
            setApprove(false)
        }
    }, [])

    //state for Remarks
    const [remark, setRemark] = useState('')
    const updateRemark = useCallback((e) => {
        setRemark(e.target.value)
    }, [])

    const [podetailFlag, setPOdetalFalg] = useState(0)
    const [getpoDetaildata, setgetPodetailData] = useState([])
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
        const getImage = async (req_slno) => {
            const result = await axioslogin.get(`/CrfImageUpload/crfRegimageGet/${req_slno}`)
            const { success, data } = result.data
            if (success === 1) {
                const fileNames = data;
                const fileUrls = fileNames.map((fileName) => {
                    return `${PUBLIC_NAS_FOLDER}/CRF/crf_registration/${req_slno}/${fileName}`;
                });
                setImageArry(fileUrls);
            }
        }


        const getDataCollectCompleteDetails = async (ndrf_mast_slno) => {
            const result = await axioslogin.get(`/ndrf/getItemListDataCollect/${ndrf_mast_slno}`)
            const { success, data } = result.data
            if (success === 1) {
                setDataCollectData(data)
                setCollectDetailCheck(1)
            }
            else {
                setDataCollectData([])
            }
        }

        const gePODetails = async (ndrf_mast_slno) => {
            const result = await axioslogin.get(`/ndrf/getPOList/${ndrf_mast_slno}`)
            const { success, data } = result.data
            if (success === 1) {
                setgetPodetailData(data)
                setPOdetalFalg(1)
            }
            else {
                setgetPodetailData([])
            }
        }

        InsertFun(req_slno)
        getImage(req_slno)
        getDataCollectCompleteDetails(ndrf_mast_slno)
        gePODetails(ndrf_mast_slno)
    }, [req_slno, ndrf_mast_slno])

    // reset 
    const ModalClose = useCallback(() => {
        setOpen(false)
        setdataPost([])
        setTableDis(0)
        setApprove(false)
        setDataCollectData([])
        setCollectDetailCheck(0)
        setRemark('')
        setImageShowFlag(0)
        setImageShow(false)
        setImageArry([])
        setPoDetlDis(0)
        setpodetailData([])
        const reset = {
            po_number: '',
            po_date: ''
        }
        setPoDetails(reset)
        setPOdetalFalg(0)
        setgetPodetailData([])


    }, [setOpen])

    const AddItem = useCallback(() => {

        setPoDetlDis(1)
        if (po_number !== '' && po_date !== '') {
            const newdata = {
                id: Math.ceil(Math.random() * 1000),
                ndrf_mast_slno: ndrf_mast_slno,
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
    }, [po_number, po_date, ndrf_mast_slno, podetailData])

    const pocloseupdate = useMemo(() => {
        return {
            ndrf_po_close: approve === true ? 1 : 0,
            ndrf_po_close_remarks: remark,
            ndrf_po_close_user: id,
            ndrf_po_close_date: format(new Date(), 'yyyy-MM-dd hh:mm:ss'),
            ndrf_mast_slno: ndrf_mast_slno,

        }
    }, [approve, remark, id, ndrf_mast_slno])

    const singlePOInsert = useMemo(() => {
        return {
            ndrf_mast_slno: ndrf_mast_slno,
            po_number: po_number,
            po_date: po_date,
            po_status: 1,
            create_user: id,
            create_date: format(new Date(), 'yyyy-MM-dd hh:mm:ss')
        }
    }, [po_date, id, po_number, ndrf_mast_slno])


    const submit = useCallback((e) => {
        e.preventDefault();
        const InsertSinglePO = async (singlePOInsert) => {
            const result = await axioslogin.post('/ndrf/InsertsinglePO', singlePOInsert);
            return result.data
        }


        const PatchPoClose = async (pocloseupdate) => {
            const result = await axioslogin.patch('/ndrf/purchasePoClose', pocloseupdate);
            return result.data
        }

        const InsertMultiplePO = async () => {
            const postdataDetl = podetailData && podetailData.map((val) => {
                return {
                    ndrf_mast_slno: ndrf_mast_slno,
                    po_number: val.po_number,
                    po_date: val.po_date,
                    po_status: 1,
                    create_user: id,
                    create_date: format(new Date(), 'yyyy-MM-dd hh:mm:ss'),
                }
            })
            const result = await axioslogin.post('/ndrf/InsertMultiplePO', postdataDetl);
            return result.data
        }


        if (approve === true) {
            PatchPoClose(pocloseupdate).then((value) => {
                const { success, message } = value
                if (success === 2) {
                    if (podetailData.length !== 0) {
                        InsertMultiplePO().then((val) => {
                            const { success, message } = val;
                            if (success === 1) {
                                succesNotify(message)
                                setCount(count + 1)
                                ModalClose()
                            }
                            else {
                                warningNotify(message)
                            }
                        })
                    }
                    else if (po_number !== '' && po_date !== '') {
                        InsertSinglePO(singlePOInsert).then((val) => {
                            const { success, message } = val;
                            if (success === 1) {
                                succesNotify(message)
                                setCount(count + 1)
                                ModalClose()
                            }
                            else {
                                warningNotify(message)
                            }
                        })
                    }
                    else {
                        warningNotify("Plase Enter PO No And PO Date")
                    }
                }
                else {
                    warningNotify(message)
                }
            })
        }
        else {
            if (podetailData.length !== 0) {
                InsertMultiplePO().then((val) => {
                    const { success, message } = val;
                    if (success === 1) {
                        succesNotify(message)
                        setCount(count + 1)
                        ModalClose()
                    }
                    else {
                        warningNotify(message)
                    }
                })
            } else if (po_number !== '' && po_date !== '') {
                InsertSinglePO(singlePOInsert).then((val) => {
                    const { success, message } = val;
                    if (success === 1) {
                        succesNotify(message)
                        setCount(count + 1)
                        ModalClose()
                    }
                    else {
                        warningNotify(message)
                    }
                })
            }
            else {
                warningNotify("Plase Enter PO No And PO Date")
            }
        }
    }, [podetailData, approve, ndrf_mast_slno, singlePOInsert, pocloseupdate, ModalClose,
        setCount, count, id, po_number, po_date])

    //column title setting
    const [column] = useState([
        { headerName: "PO Number", field: "po_number" },
        { headerName: "PO Date", field: "po_date", autoHeight: true, wrapText: true, width: 250, filter: "true" },

    ])

    return (
        <Fragment>
            <ToastContainer />
            <Box>
                {imageshowFlag === 1 ? <ReqImageDisplayModal open={imageshow} handleClose={handleClose} images={imagearray} /> : null}

                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    fullWidth
                    maxWidth='md'
                    aria-describedby="alert-dialog-slide-descriptiona"
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
                                        <Box sx={{ pr: 1. }}>
                                            <CssVarsProvider>
                                                <Typography sx={{ fontSize: 15 }}>Request No: CRF/TMC/{req_slno}</Typography>
                                            </CssVarsProvider>
                                        </Box>
                                        <Box sx={{ pl: 4 }}                                    >
                                            <CssVarsProvider>
                                                <Typography sx={{ fontSize: 15 }}>Req.Date: {reqdate}</Typography>
                                            </CssVarsProvider>
                                        </Box>
                                    </Box>
                                    <Box sx={{
                                        width: "100%",
                                        display: "flex",
                                        p: 0.5,
                                        flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                    }}>
                                        <Box sx={{ pr: 1. }}>
                                            <CssVarsProvider>
                                                <Typography sx={{ fontSize: 15 }}>NDRF No: NDRF/TMC/{ndrf_mast_slno}</Typography>
                                            </CssVarsProvider>
                                        </Box>
                                        <Box sx={{ pl: 4 }}                                    >
                                            <CssVarsProvider>
                                                <Typography sx={{ fontSize: 15 }}>NDRF.Date: {nrdfCreate}</Typography>
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
                                    {location !== null ? <Box sx={{
                                        width: "100%", display: "flex", p: 0.5,
                                        flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                    }}>

                                        <Box
                                            sx={{ width: "25%", }}>
                                            <CssVarsProvider>
                                                <Typography sx={{ fontSize: 15 }}>Location:</Typography>
                                            </CssVarsProvider>
                                        </Box>
                                        <Paper sx={{
                                            width: '75%', minHeight: 10, maxHeight: 70, pl: 0.5, fontSize: 15, textTransform: "capitalize",
                                            overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                        }} variant='none'>
                                            {location}
                                        </Paper>
                                    </Box> : null}
                                    {category !== null ? <Box sx={{
                                        width: "100%", display: "flex", p: 0.5,
                                        flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                    }}>
                                        <Box
                                            sx={{ width: "25%", }}>
                                            <CssVarsProvider>
                                                <Typography sx={{ fontSize: 15 }}>Category:</Typography>
                                            </CssVarsProvider>
                                        </Box>
                                        <Paper sx={{
                                            width: '75%', minHeight: 10, maxHeight: 70, pl: 0.5, fontSize: 15, textTransform: "capitalize",
                                            overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                        }} variant='none'>
                                            {category}
                                        </Paper>
                                    </Box> : null}
                                    <Box sx={{
                                        width: "100%", display: "flex", p: 0.5,
                                        flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                    }}>
                                        <Box
                                            sx={{ width: "25%", }}>
                                            <CssVarsProvider>
                                                <Typography sx={{ fontSize: 15 }}>Department:</Typography>
                                            </CssVarsProvider>
                                        </Box>
                                        <Paper sx={{
                                            width: '75%', minHeight: 10, maxHeight: 70, pl: 0.5, fontSize: 15, textTransform: "capitalize",
                                            overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                        }} variant='none'>
                                            {dept_name}
                                        </Paper>
                                    </Box>
                                    <Box sx={{
                                        width: "100%", display: "flex", p: 0.5,
                                        flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                    }}>
                                        <Box
                                            sx={{ width: "25%", }}>
                                            <CssVarsProvider>
                                                <Typography sx={{ fontSize: 15 }}>Department Section:</Typography>
                                            </CssVarsProvider>
                                        </Box>
                                        <Paper sx={{
                                            width: '75%', minHeight: 10, maxHeight: 70, pl: 0.5, fontSize: 15, textTransform: "capitalize",
                                            overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                        }} variant='none'>
                                            {req_userdeptsec !== null ? req_userdeptsec.toLowerCase() : "Not Updated"}
                                        </Paper>
                                    </Box>

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

                                    <Box
                                        sx={{ p: 0.5, }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15, textTransform: "capitalize", }}>
                                                Requested User: {req_user !== null ? req_user.toLowerCase() : "Not Updated"}</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box
                                        sx={{
                                            width: "100%",
                                            display: "flex",
                                            p: 0.5,
                                            flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                        }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15, textTransform: "capitalize", }}>
                                                Requested DeptSec: {userdeptsec !== null ? userdeptsec.toLowerCase() : "Not Updated"}</Typography>
                                        </CssVarsProvider>
                                        {image_status === 1 ? <Box sx={{ display: 'flex', width: "20%", height: 30, pl: 3 }}>
                                            <Button onClick={ViewImage} variant="contained"
                                                color="primary">View Image</Button>

                                        </Box> : null}
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

                                    {

                                        colectDetlCheck === 1 ? <Box>
                                            <CssVarsProvider>
                                                <Typography sx={{ fontSize: 15, textTransform: "capitalize", }}>
                                                    NDRF Generated Items</Typography>
                                            </CssVarsProvider>
                                            <Box sx={{
                                                width: "100%",
                                                display: "flex",
                                                p: 0.5,
                                                flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                            }}>
                                                <ItemApprovalCmp
                                                    dataPost={datacollectdata}
                                                    setdataPost={setdataPost}
                                                />
                                            </Box></Box>
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
                                                                            </Typography> : null
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
                                                <Typography ml={10} sx={{ fontSize: 15, fontWeight: 500 }} >Requested By Head Of The Department  </Typography>
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
                                                            <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="success" variant="outlined"> {hod}
                                                            </Typography> : hod_approve === 2 ?
                                                                <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="danger" variant="outlined"> {hod}
                                                                </Typography> : hod_approve === 3 ?
                                                                    <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="primary" variant="outlined"> {hod}
                                                                    </Typography> : null
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
                                </Box>
                            </Paper>
                        </Box>


                        {
                            dms_req === 1 ?
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
                                </Box> : null
                        }


                        {
                            ms_approve_req === 1 ?
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
                                                                {ms_user} </Typography>
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
                                </Box> : null
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
                                            <Typography sx={{ fontSize: 16, fontWeight: 600 }} >Operation Manager :

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
                                                        {omdate}</Typography>
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
                                            <Typography sx={{ fontSize: 16, fontWeight: 600 }} >Senior Manager Operation :

                                                {
                                                    senior_manage_approv === 1 ?
                                                        <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="success" variant="outlined"> {smo}
                                                        </Typography> : senior_manage_approv === 2 ?
                                                            <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="danger" variant="outlined"> {smo}
                                                            </Typography> : senior_manage_approv === 3 ?
                                                                <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="primary" variant="outlined"> {smo}
                                                                </Typography> : null
                                                }
                                            </Typography>
                                        </CssVarsProvider>
                                        {
                                            som_aprrov_date !== null ? <Box
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: 'row',
                                                    justifyContent: "space-evenly",
                                                    pr: 2
                                                }}>
                                                <CssVarsProvider>
                                                    <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5 }}>
                                                        {smodate}</Typography>
                                                    <Typography ml={2} sx={{ fontSize: 15 }} >/ </Typography>
                                                    <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, textTransform: "capitalize" }}>
                                                        {senior_manage_user} </Typography>
                                                </CssVarsProvider>   </Box> : null
                                        }

                                    </Box>
                                    {
                                        senior_manage_approv === 1 ? <Box sx={{ width: "100%", pl: 1 }}>
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
                                            <Typography sx={{ fontSize: 16, fontWeight: 600 }} >COO/CAO:

                                                {
                                                    cao_approve === 1 ?
                                                        <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="success" variant="outlined"> {cao}
                                                        </Typography> : cao_approve === 2 ?
                                                            <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="danger" variant="outlined"> {cao}
                                                            </Typography> : cao_approve === 3 ?
                                                                <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="primary" variant="outlined"> {cao}
                                                                </Typography> : null
                                                }
                                            </Typography>
                                        </CssVarsProvider>
                                        {
                                            cao_approv_date !== null ? <Box
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: 'row',
                                                    justifyContent: "space-evenly",
                                                    pr: 2
                                                }}>
                                                <CssVarsProvider>
                                                    <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5 }}>
                                                        {caodate}</Typography>
                                                    <Typography ml={2} sx={{ fontSize: 15 }} >/ </Typography>
                                                    <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, textTransform: "capitalize" }}>
                                                        {cao_user} </Typography>
                                                </CssVarsProvider>   </Box> : null
                                        }

                                    </Box>
                                    {
                                        cao_approve === 1 ? <Box sx={{ width: "100%", pl: 1 }}>
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
                                                    <Typography ml={10} sx={{ fontSize: 15 }} >{cao_approve_remarks} </Typography>
                                                </CssVarsProvider>
                                            </Box> :
                                                cao_approve === 3 ? <Box sx={{ width: "100%" }}>
                                                    <CssVarsProvider>
                                                        <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification for On-Hold: </Typography>
                                                        <Typography ml={10} sx={{ fontSize: 15 }} >{cao_approve_remarks} </Typography>
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
                                    {
                                        md_approve_req === 1 ?
                                            <Box>
                                                <Box
                                                    sx={{
                                                        pl: 1, pr: 1,
                                                        display: "flex",
                                                        flexDirection: 'row',
                                                        justifyContent: "space-between"
                                                    }}>

                                                    <CssVarsProvider>
                                                        <Typography sx={{ fontSize: 16, fontWeight: 600 }} >MD:

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
                                                                    {mddate}</Typography>
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
                                            : <CssVarsProvider>
                                                <Typography sx={{ fontSize: 15, fontWeight: 600, pl: 1 }} >MD: Approval Not Needed </Typography>
                                            </CssVarsProvider>
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
                                    {ed_approve_req === 1 ?

                                        <Box>
                                            <Box
                                                sx={{
                                                    pl: 1, pr: 1,
                                                    display: "flex",
                                                    flexDirection: 'row',
                                                    justifyContent: "space-between"
                                                }}>

                                                <CssVarsProvider>
                                                    <Typography sx={{ fontSize: 16, fontWeight: 600 }} >ED:

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
                                                                {eddate}</Typography>
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
                                        : <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15, fontWeight: 600, pl: 1 }} >ED: Approval Not Needed </Typography>
                                        </CssVarsProvider>
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
                                    {ndrf_om_approv !== null ?

                                        <Box>
                                            <Box
                                                sx={{
                                                    pl: 1, pr: 1,
                                                    display: "flex",
                                                    flexDirection: 'row',
                                                    justifyContent: "space-between"
                                                }}>

                                                <CssVarsProvider>
                                                    <Typography sx={{ fontSize: 16, fontWeight: 600 }} >NDRF Operation Manager:

                                                        {
                                                            ndrf_om_approv === 1 ?
                                                                <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="success" variant="outlined"> {ndrfOM}
                                                                </Typography> : ndrf_om_approv === 2 ?
                                                                    <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="danger" variant="outlined"> {ndrfOM}
                                                                    </Typography> : ndrf_om_approv === 3 ?
                                                                        <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="primary" variant="outlined"> {ndrfOM}
                                                                        </Typography> : null
                                                        }
                                                    </Typography>
                                                </CssVarsProvider>
                                                {
                                                    ndrfom_approv_date !== null ? <Box
                                                        sx={{
                                                            display: "flex",
                                                            flexDirection: 'row',
                                                            justifyContent: "space-evenly",
                                                            pr: 2
                                                        }}>
                                                        <CssVarsProvider>
                                                            <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5 }}>
                                                                {ndrfOmdate}</Typography>
                                                            <Typography ml={2} sx={{ fontSize: 15 }} >/ </Typography>
                                                            <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, textTransform: "capitalize" }}>
                                                                {ndrf_om_user} </Typography>
                                                        </CssVarsProvider>   </Box> : null
                                                }

                                            </Box>
                                            {
                                                ndrf_om_approv === 1 ? <Box sx={{ width: "100%", pl: 1 }}>
                                                    <CssVarsProvider>
                                                        <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification/ Requirement Approval: </Typography>
                                                        <Typography ml={10} sx={{ fontSize: 15 }} >{ndrf_om_remarks} </Typography>
                                                    </CssVarsProvider>
                                                </Box> :
                                                    ndrf_om_approv === 2 ? <Box sx={{ width: "100%" }}>
                                                        <CssVarsProvider>
                                                            <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification for Reject: </Typography>
                                                            <Typography ml={10} sx={{ fontSize: 15 }} >{ndrf_om_remarks} </Typography>
                                                        </CssVarsProvider>
                                                    </Box> :
                                                        ndrf_om_approv === 3 ? <Box sx={{ width: "100%" }}>
                                                            <CssVarsProvider>
                                                                <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification for On-Hold: </Typography>
                                                                <Typography ml={10} sx={{ fontSize: 15 }} >{ndrf_om_remarks} </Typography>
                                                            </CssVarsProvider>
                                                        </Box> : <Box>
                                                            <CssVarsProvider>
                                                                <Typography ml={10} sx={{ fontSize: 15, fontWeight: 500 }} >Approval Not Done </Typography>
                                                            </CssVarsProvider>
                                                        </Box>
                                            }

                                        </Box>
                                        : <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15, fontWeight: 600, pl: 1 }} >Operation Manager Approval not done</Typography>
                                        </CssVarsProvider>

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
                                    {ndrf_smo_approv !== null ?

                                        <Box>
                                            <Box
                                                sx={{
                                                    pl: 1, pr: 1,
                                                    display: "flex",
                                                    flexDirection: 'row',
                                                    justifyContent: "space-between"
                                                }}>

                                                <CssVarsProvider>
                                                    <Typography sx={{ fontSize: 16, fontWeight: 600 }} >NDRF Senior Operation Manager:

                                                        {
                                                            ndrf_smo_approv === 1 ?
                                                                <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="success" variant="outlined"> {ndrfSMO}
                                                                </Typography> : ndrf_smo_approv === 2 ?
                                                                    <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="danger" variant="outlined"> {ndrfSMO}
                                                                    </Typography> : ndrf_smo_approv === 3 ?
                                                                        <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="primary" variant="outlined"> {ndrfSMO}
                                                                        </Typography> : null
                                                        }
                                                    </Typography>
                                                </CssVarsProvider>
                                                {
                                                    ndrf_som_aprrov_date !== null ? <Box
                                                        sx={{
                                                            display: "flex",
                                                            flexDirection: 'row',
                                                            justifyContent: "space-evenly",
                                                            pr: 2
                                                        }}>
                                                        <CssVarsProvider>
                                                            <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5 }}>
                                                                {ndrfSmodate}</Typography>
                                                            <Typography ml={2} sx={{ fontSize: 15 }} >/ </Typography>
                                                            <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, textTransform: "capitalize" }}>
                                                                {ndrf_smo_user} </Typography>
                                                        </CssVarsProvider>   </Box> : null
                                                }

                                            </Box>
                                            {
                                                ndrf_smo_approv === 1 ? <Box sx={{ width: "100%", pl: 1 }}>
                                                    <CssVarsProvider>
                                                        <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification/ Requirement Approval: </Typography>
                                                        <Typography ml={10} sx={{ fontSize: 15 }} >{ndrf_smo_remarks} </Typography>
                                                    </CssVarsProvider>
                                                </Box> :
                                                    ndrf_smo_approv === 2 ? <Box sx={{ width: "100%" }}>
                                                        <CssVarsProvider>
                                                            <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification for Reject: </Typography>
                                                            <Typography ml={10} sx={{ fontSize: 15 }} >{ndrf_smo_remarks} </Typography>
                                                        </CssVarsProvider>
                                                    </Box> :
                                                        ndrf_smo_approv === 3 ? <Box sx={{ width: "100%" }}>
                                                            <CssVarsProvider>
                                                                <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification for On-Hold: </Typography>
                                                                <Typography ml={10} sx={{ fontSize: 15 }} >{ndrf_smo_remarks} </Typography>
                                                            </CssVarsProvider>
                                                        </Box> : <Box>
                                                            <CssVarsProvider>
                                                                <Typography ml={10} sx={{ fontSize: 15, fontWeight: 500 }} >Approval Not Done </Typography>
                                                            </CssVarsProvider>
                                                        </Box>
                                            }

                                        </Box>
                                        : <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15, fontWeight: 600, pl: 1 }} >Senior Operation Manager Approval not done</Typography>
                                        </CssVarsProvider>

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
                                    {ndrf_cao_approve !== null ?

                                        <Box>
                                            <Box
                                                sx={{
                                                    pl: 1, pr: 1,
                                                    display: "flex",
                                                    flexDirection: 'row',
                                                    justifyContent: "space-between"
                                                }}>

                                                <CssVarsProvider>
                                                    <Typography sx={{ fontSize: 16, fontWeight: 600 }} >NDRF Senior Operation Manager:

                                                        {
                                                            ndrf_cao_approve === 1 ?
                                                                <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="success" variant="outlined"> {ndrfCOO}
                                                                </Typography> : ndrf_cao_approve === 2 ?
                                                                    <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="danger" variant="outlined"> {ndrfCOO}
                                                                    </Typography> : ndrf_cao_approve === 3 ?
                                                                        <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="primary" variant="outlined"> {ndrfCOO}
                                                                        </Typography> : null
                                                        }
                                                    </Typography>
                                                </CssVarsProvider>
                                                {
                                                    ndrf_som_aprrov_date !== null ? <Box
                                                        sx={{
                                                            display: "flex",
                                                            flexDirection: 'row',
                                                            justifyContent: "space-evenly",
                                                            pr: 2
                                                        }}>
                                                        <CssVarsProvider>
                                                            <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5 }}>
                                                                {ndrfCoodate}</Typography>
                                                            <Typography ml={2} sx={{ fontSize: 15 }} >/ </Typography>
                                                            <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, textTransform: "capitalize" }}>
                                                                {ndrf_cao_user} </Typography>
                                                        </CssVarsProvider>   </Box> : null
                                                }

                                            </Box>
                                            {
                                                ndrf_cao_approve === 1 ? <Box sx={{ width: "100%", pl: 1 }}>
                                                    <CssVarsProvider>
                                                        <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification/ Requirement Approval: </Typography>
                                                        <Typography ml={10} sx={{ fontSize: 15 }} >{ndrf_cao_approve_remarks} </Typography>
                                                    </CssVarsProvider>
                                                </Box> :
                                                    ndrf_cao_approve === 2 ? <Box sx={{ width: "100%" }}>
                                                        <CssVarsProvider>
                                                            <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification for Reject: </Typography>
                                                            <Typography ml={10} sx={{ fontSize: 15 }} >{ndrf_cao_approve_remarks} </Typography>
                                                        </CssVarsProvider>
                                                    </Box> :
                                                        ndrf_cao_approve === 3 ? <Box sx={{ width: "100%" }}>
                                                            <CssVarsProvider>
                                                                <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification for On-Hold: </Typography>
                                                                <Typography ml={10} sx={{ fontSize: 15 }} >{ndrf_cao_approve_remarks} </Typography>
                                                            </CssVarsProvider>
                                                        </Box> : <Box>
                                                            <CssVarsProvider>
                                                                <Typography ml={10} sx={{ fontSize: 15, fontWeight: 500 }} >Approval Not Done </Typography>
                                                            </CssVarsProvider>
                                                        </Box>
                                            }

                                        </Box>
                                        : <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15, fontWeight: 600, pl: 1 }} >COO/CAO Approval not done</Typography>
                                        </CssVarsProvider>

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
                                    {ndrf_md_approve !== null ?

                                        <Box>
                                            <Box
                                                sx={{
                                                    pl: 1, pr: 1,
                                                    display: "flex",
                                                    flexDirection: 'row',
                                                    justifyContent: "space-between"
                                                }}>

                                                <CssVarsProvider>
                                                    <Typography sx={{ fontSize: 16, fontWeight: 600 }} >NDRF Approval MD:

                                                        {
                                                            ndrf_md_approve === 1 ?
                                                                <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="success" variant="outlined"> {ndrfMD}
                                                                </Typography> : ndrf_md_approve === 2 ?
                                                                    <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="danger" variant="outlined"> {ndrfMD}
                                                                    </Typography> : ndrf_md_approve === 3 ?
                                                                        <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="primary" variant="outlined"> {ndrfMD}
                                                                        </Typography> : null
                                                        }
                                                    </Typography>
                                                </CssVarsProvider>
                                                {
                                                    ndrf_md_approve_date !== null ? <Box
                                                        sx={{
                                                            display: "flex",
                                                            flexDirection: 'row',
                                                            justifyContent: "space-evenly",
                                                            pr: 2
                                                        }}>
                                                        <CssVarsProvider>
                                                            <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5 }}>
                                                                {ndrfMddate}</Typography>
                                                            <Typography ml={2} sx={{ fontSize: 15 }} >/ </Typography>
                                                            <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, textTransform: "capitalize" }}>
                                                                {ndrf_md_user} </Typography>
                                                        </CssVarsProvider>   </Box> : null
                                                }

                                            </Box>
                                            {
                                                ndrf_md_approve === 1 ? <Box sx={{ width: "100%", pl: 1 }}>
                                                    <CssVarsProvider>
                                                        <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification/ Requirement Approval: </Typography>
                                                        <Typography ml={10} sx={{ fontSize: 15 }} >{ndrf_md_approve_remarks} </Typography>
                                                    </CssVarsProvider>
                                                </Box> :
                                                    ndrf_md_approve === 2 ? <Box sx={{ width: "100%" }}>
                                                        <CssVarsProvider>
                                                            <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification for Reject: </Typography>
                                                            <Typography ml={10} sx={{ fontSize: 15 }} >{ndrf_md_approve_remarks} </Typography>
                                                        </CssVarsProvider>
                                                    </Box> :
                                                        ndrf_md_approve === 3 ? <Box sx={{ width: "100%" }}>
                                                            <CssVarsProvider>
                                                                <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification for On-Hold: </Typography>
                                                                <Typography ml={10} sx={{ fontSize: 15 }} >{ndrf_md_approve_remarks} </Typography>
                                                            </CssVarsProvider>
                                                        </Box> : <Box>
                                                            <CssVarsProvider>
                                                                <Typography ml={10} sx={{ fontSize: 15, fontWeight: 500 }} >Approval Not Done </Typography>
                                                            </CssVarsProvider>
                                                        </Box>
                                            }

                                        </Box>
                                        : <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15, fontWeight: 600, pl: 1 }} >COO/CAO Approval not done</Typography>
                                        </CssVarsProvider>

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
                                    {ndrf_ed_approve !== null ?

                                        <Box>
                                            <Box
                                                sx={{
                                                    pl: 1, pr: 1,
                                                    display: "flex",
                                                    flexDirection: 'row',
                                                    justifyContent: "space-between"
                                                }}>

                                                <CssVarsProvider>
                                                    <Typography sx={{ fontSize: 16, fontWeight: 600 }} >NDRF Approval ED:

                                                        {
                                                            ndrf_ed_approve === 1 ?
                                                                <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="success" variant="outlined"> {ndrfED}
                                                                </Typography> : ndrf_ed_approve === 2 ?
                                                                    <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="danger" variant="outlined"> {ndrfED}
                                                                    </Typography> : ndrf_ed_approve === 3 ?
                                                                        <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="primary" variant="outlined"> {ndrfED}
                                                                        </Typography> : null
                                                        }
                                                    </Typography>
                                                </CssVarsProvider>
                                                {
                                                    ndrf_ed_approve_date !== null ? <Box
                                                        sx={{
                                                            display: "flex",
                                                            flexDirection: 'row',
                                                            justifyContent: "space-evenly",
                                                            pr: 2
                                                        }}>
                                                        <CssVarsProvider>
                                                            <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5 }}>
                                                                {ndrfEddate}</Typography>
                                                            <Typography ml={2} sx={{ fontSize: 15 }} >/ </Typography>
                                                            <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, textTransform: "capitalize" }}>
                                                                {ndrf_ed_user} </Typography>
                                                        </CssVarsProvider>   </Box> : null
                                                }

                                            </Box>
                                            {
                                                ndrf_ed_approve === 1 ? <Box sx={{ width: "100%", pl: 1 }}>
                                                    <CssVarsProvider>
                                                        <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification/ Requirement Approval: </Typography>
                                                        <Typography ml={10} sx={{ fontSize: 15 }} >{ndrf_ed_approve_remarks} </Typography>
                                                    </CssVarsProvider>
                                                </Box> :
                                                    ndrf_ed_approve === 2 ? <Box sx={{ width: "100%" }}>
                                                        <CssVarsProvider>
                                                            <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification for Reject: </Typography>
                                                            <Typography ml={10} sx={{ fontSize: 15 }} >{ndrf_ed_approve_remarks} </Typography>
                                                        </CssVarsProvider>
                                                    </Box> :
                                                        ndrf_ed_approve === 3 ? <Box sx={{ width: "100%" }}>
                                                            <CssVarsProvider>
                                                                <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification for On-Hold: </Typography>
                                                                <Typography ml={10} sx={{ fontSize: 15 }} >{ndrf_ed_approve_remarks} </Typography>
                                                            </CssVarsProvider>
                                                        </Box> : <Box>
                                                            <CssVarsProvider>
                                                                <Typography ml={10} sx={{ fontSize: 15, fontWeight: 500 }} >Approval Not Done </Typography>
                                                            </CssVarsProvider>
                                                        </Box>
                                            }

                                        </Box>
                                        : <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15, fontWeight: 600, pl: 1 }} >ED Approval not done</Typography>
                                        </CssVarsProvider>

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
                                            <Typography sx={{ fontSize: 16, fontWeight: 600 }} >Purchase :

                                                {
                                                    ndrf_purchase === 1 ?
                                                        <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="success" variant="outlined"> Acknowledged
                                                        </Typography> : null
                                                }
                                            </Typography>
                                        </CssVarsProvider>
                                        {
                                            purchase_date !== null ? <Box
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: 'row',
                                                    justifyContent: "space-evenly",
                                                    pr: 2
                                                }}>
                                                <CssVarsProvider>
                                                    <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5 }}>
                                                        {purchaseAckldege}</Typography>
                                                    <Typography ml={2} sx={{ fontSize: 15 }} >/ </Typography>
                                                    <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, textTransform: "capitalize" }}>
                                                        {purchase_user} </Typography>
                                                </CssVarsProvider>   </Box> : null
                                        }

                                    </Box>
                                    <Box sx={{ width: "100%", pl: 1 }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Purchase Remarks: </Typography>
                                            <Typography ml={10} sx={{ fontSize: 15 }} >{ndrf_purchase_acknolwdge} </Typography>
                                        </CssVarsProvider>
                                    </Box>

                                </Box>
                            </Paper>
                        </Box>


                        {ndrf_po_close === 1 ?

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
                                                <Typography sx={{ fontSize: 15, fontWeight: 600, }} >PO Closed: </Typography>
                                            </CssVarsProvider>
                                            {
                                                purchase_date !== null ? <Box
                                                    sx={{
                                                        display: "flex",
                                                        flexDirection: 'row',
                                                        justifyContent: "space-evenly",
                                                        pr: 2
                                                    }}>
                                                    <CssVarsProvider>
                                                        <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5 }}>
                                                            {poclosedate}</Typography>
                                                        <Typography ml={2} sx={{ fontSize: 15 }} >/ </Typography>
                                                        <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, textTransform: "capitalize" }}>
                                                            {ndrf_po_close_user} </Typography>
                                                    </CssVarsProvider>   </Box> : null
                                            }
                                        </Box>

                                        <Box sx={{ width: "100%", pl: 1 }}>
                                            <CssVarsProvider>
                                                <Typography sx={{ fontSize: 15, fontWeight: 600 }} >PO Close Remarks: </Typography>
                                                <Typography ml={10} sx={{ fontSize: 15 }} >{ndrf_po_close_remarks} </Typography>
                                            </CssVarsProvider>
                                        </Box>
                                    </Box>

                                    {
                                        podetailFlag === 1 ?
                                            <Box sx={{ width: "50%", pl: 5, pb: 2 }}> Addded PO
                                                <ReqRegistItemCmpt
                                                    columnDefs={column}
                                                    tableData={getpoDetaildata}
                                                />
                                            </Box> : null
                                    }





                                </Paper>
                            </Box> :
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
                                                    <ReqRegistItemCmpt
                                                        columnDefs={column}
                                                        tableData={podetailData}
                                                    />
                                                </Box> : null
                                            }

                                            {
                                                podetailFlag === 1 ?
                                                    <Box sx={{ width: "50%", pl: 5, pb: 2 }}> Already added PO
                                                        <ReqRegistItemCmpt
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
                                                        label="NDRF Po Level close"
                                                        color="primary"
                                                        size="md"
                                                        name="approve"
                                                        value={approve}
                                                        checked={approve}
                                                        onCheked={updateApprove}
                                                    />
                                                </Box>
                                                {
                                                    approve === true ? <Box sx={{ width: "50%", pr: 1, mt: 1, pl: 1 }}>
                                                        <CustomTextarea
                                                            required
                                                            type="text"
                                                            size="sm"
                                                            style={{
                                                                width: "90%",
                                                                height: 70,
                                                                boardColor: "#E0E0E0",
                                                                mt: 5
                                                            }}
                                                            value={remark}
                                                            onchange={updateRemark}
                                                        />
                                                    </Box> : null
                                                }



                                            </Box>


                                        </Box>
                                    </Box>
                                </Paper>
                            </Box>


                        }



                    </DialogContent>
                    <DialogActions>
                        <Button color="secondary" onClick={submit} >Save</Button>
                        <Button onClick={ModalClose} color="secondary" >Cancel</Button>
                    </DialogActions>
                </Dialog >
            </Box >
        </Fragment >
    )
}

export default memo(NdrfPurchasePoaddModal)