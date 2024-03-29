import React, { Fragment, useCallback, useState, memo, useMemo } from 'react'
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
import { useEffect } from 'react';
import { CssVarsProvider, Typography } from '@mui/joy'
import { TypoHeadColor } from 'src/color/Color'
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static';
import ApprovalCompnt from '../../DepartmentApprovals/ApprovalCompnt';
import ReqImageDisplayModal from '../../RequestRegister/ReqImageDisplayModal';
import { useSelector } from 'react-redux'
import ItemApprovalCmp from '../../DepartmentApprovals/ItemApprovalCmp';
import _ from 'underscore'
import Divider from '@mui/material/Divider';
import CrfDataCollectNotOkModal from '../../DMSCrfApproval/CrfDataCollectNotOkModal';
import DataCollectedImageDispy from '../../OMApproval/DataCollectedImageDispy';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});


const CrfMSDashModal = ({ open, setOpen, datas, count, setCount }) => {

    const { req_slno, req_date, actual_requirement, needed, location, dept_name, req_userdeptsec,
        expected_date, req_user, userdeptsec, image_status, incharge_approve, incharge_req,
        incharge, incharge_remark, inch_detial_analysis, incharge_apprv_date, incharge_user, hod_req,
        hod_approve, hod, hod_remarks, hod_detial_analysis, hod_approve_date, category,
        hod_user, dms, dms_approve, dms_remarks, dms_detail_analysis, dms_approve_date, dms_user,
        ms_approve, ms_approve_remark, ms_detail_analysis } = datas[0]
    const reqdate = format(new Date(req_date), 'dd-MM-yyyy')
    const expdate = format(new Date(expected_date), 'dd-MM-yyyy')
    const inchargeApprovdate = incharge_apprv_date !== null ? format(new Date(incharge_apprv_date), 'dd-MM-yyyy') : "Not Updated"
    const hodApprovdate = hod_approve_date !== null ? format(new Date(hod_approve_date), 'dd-MM-yyyy') : "Not Updated"
    const dmsApprovdate = dms_approve_date !== null ? format(new Date(dms_approve_date), 'dd-MM-yyyy') : "Not Updated"

    const id = useSelector((state) => state.LoginUserData.empid, _.isEqual)

    const [dataPost, setdataPost] = useState([])
    const [tableDis, setTableDis] = useState(0)
    const [enable, setEnable] = useState(0)
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

    //state for Remarks
    const [remark, setRemark] = useState('')
    const updateRemark = useCallback((e) => {
        setRemark(e.target.value)
    }, [])

    const [detailAnalis, setDetailAnalis] = useState('')
    const updatedetailAnalis = useCallback((e) => {
        setDetailAnalis(e.target.value)
    }, [])

    const [datacollectdata, setDataCollectData] = useState([])
    const [colectDetlCheck, setCollectDetailCheck] = useState(0)

    const [datacolflag, setDataColFlag] = useState(0)
    const [datacolData, setDataColData] = useState([])

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

        const checkDataCollectComplete = async (req_slno) => {
            const result = await axioslogin.get(`/requestRegister/DataCollectComplete/${req_slno}`)
            const { success, data } = result.data
            if (success === 1) {
                const xx = data && data.filter((val) => val.crf_dept_status === 0)
                const yy = data && data.filter((val) => val.crf_dept_status === 1)
                if (xx.length !== 0) {
                    setEnable(1)
                }
                else {
                    setEnable(0)
                }
                if (yy.length !== 0) {
                    setDataColFlag(1)
                    setDataColData(yy)
                }
                else {
                    setDataColFlag(0)
                    setDataColData([])
                }
            }
            else {
                setEnable(0)
            }
        }

        const getDataCollectCompleteDetails = async (req_slno) => {
            const result = await axioslogin.get(`/requestRegister/getItemListDataCollect/${req_slno}`)
            const { success, data } = result.data
            if (success === 1) {
                setDataCollectData(data)
                setCollectDetailCheck(1)
            }
            else {
                setDataCollectData([])
            }
        }

        checkDataCollectComplete(req_slno)
        InsertFun(req_slno)
        getImage(req_slno)
        getDataCollectCompleteDetails(req_slno)
    }, [req_slno])

    useEffect(() => {
        if (ms_approve !== null) {
            setRemark(ms_approve_remark)
            setApprove(ms_approve === 1 ? true : false)
            setReject(ms_approve === 2 ? true : false)
            setPending(ms_approve === 3 ? true : false)
            setDetailAnalis(ms_approve === 1 ? ms_detail_analysis : '')
        }
        else {
            setRemark('')
            setPending(false)
            setApprove(false)
            setReject(false)
            setDetailAnalis('')
        }
    }, [ms_approve_remark, ms_approve, ms_detail_analysis])

    // reset 
    const ModalClose = useCallback(() => {
        setdataPost([])
        setTableDis(0)
        setEnable(0)
        setApprove(false)
        setReject(false)
        setPending(false)
        setRemark('')
        setDetailAnalis('')
        setImageShowFlag(0)
        setImageShow(false)
        setImageArry([])
        setOpen(false)
    }, [setOpen])

    const patchdataMS = useMemo(() => {
        return {
            ms_approve: approve === true ? 1 : reject === true ? 2 : pending === true ? 3 : null,
            ms_approve_remark: reject === true || pending === true || approve === true ? remark : null,
            ms_detail_analysis: approve === true ? detailAnalis : null,
            ms_approve_date: format(new Date(), 'yyyy-MM-dd hh:mm:ss'),
            ms_approve_user: id,
            req_slno: req_slno
        }
    }, [approve, reject, pending, remark, req_slno, detailAnalis, id])


    const patchdataHodNotMS = useMemo(() => {
        return {
            hod_approve: 1,
            hod_remarks: "Approval Done By MS",
            hod_approve_date: format(new Date(), 'yyyy-MM-dd hh:mm:ss'),
            hod_user: id,
            ms_approve: approve === true ? 1 : reject === true ? 2 : pending === true ? 3 : null,
            ms_approve_remark: reject === true || pending === true || approve === true ? remark : null,
            ms_detail_analysis: approve === true ? detailAnalis : null,
            ms_approve_date: format(new Date(), 'yyyy-MM-dd hh:mm:ss'),
            ms_approve_user: id,
            req_slno: req_slno
        }
    }, [approve, reject, pending, remark, req_slno, detailAnalis, id])


    const submit = useCallback((e) => {
        e.preventDefault();
        const updateMSApproval = async (patchdataMS) => {
            const result = await axioslogin.patch('/requestRegister/approval/ms', patchdataMS);
            const { success, message } = result.data;
            if (success === 2) {
                succesNotify(message)
                setCount(count + 1)
                ModalClose()
            } else {
                warningNotify(message)
            }
        }
        const updateMSOverRideApproval = async (patchdataHodNotMS) => {
            const result = await axioslogin.patch('/crfDashBoard/approval/ms', patchdataHodNotMS);
            const { success, message } = result.data;
            if (success === 2) {
                succesNotify(message)
                setCount(count + 1)
                ModalClose()
            } else {
                warningNotify(message)
            }
        }

        if (approve !== false || reject !== false || pending !== false) {
            if (approve === true) {
                if (detailAnalis !== '' && remark !== '') {
                    if (hod_approve === null) {
                        updateMSOverRideApproval(patchdataHodNotMS)
                    }
                    else {
                        updateMSApproval(patchdataMS)
                    }

                } else {
                    warningNotify("Detail Analysis && Remarks must be Entered")
                }
            } else {
                updateMSApproval(patchdataMS)
            }

        } else {
            warningNotify("Please Select any status")
        }



    }, [patchdataMS, count, setCount, ModalClose, approve, reject, pending,
        remark, detailAnalis, hod_approve, patchdataHodNotMS])


    const [imageshowFlag, setImageShowFlag] = useState(0)
    const [imageshow, setImageShow] = useState(false)
    const [imagearray, setImageArry] = useState([])


    const [collImageShowFlag, setCollImageShowFlag] = useState(0)
    const [collImageShow, setCollImageShow] = useState(false)
    const [dataCollSlno, setDataCollSlNo] = useState('')

    const ViewImage = useCallback(() => {
        setImageShowFlag(1)
        setImageShow(true)
    }, [])

    const ViewImageDataColection = useCallback((val) => {
        setDataCollSlNo(val);
        setCollImageShowFlag(1)
        setCollImageShow(true)
    }, [])

    const handleClose = useCallback(() => {
        setImageShowFlag(0)
        setImageShow(false)
    }, [])

    const handleCloseCollect = useCallback(() => {
        setCollImageShowFlag(0)
        setCollImageShow(false)

    }, [])

    return (
        <Fragment>
            <ToastContainer />
            {
                enable === 1 ? <CrfDataCollectNotOkModal open={open} setOpen={setOpen} setEnable={setEnable}
                    req_slno={req_slno} />
                    :
                    <Box>
                        {collImageShowFlag === 1 ? <DataCollectedImageDispy open={collImageShow} handleCloseCollect={handleCloseCollect}
                            dataCollSlno={dataCollSlno} req_slno={req_slno}
                        /> : null}
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
                                                    {dept_name !== null ? dept_name.toLowerCase() : "Not Updated"}
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
                                                            After Data Collection</Typography>
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
                                {datacolflag === 1 ?
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
                                                            <Typography sx={{ pl: 1, fontWeight: 900, fontSize: 14, color: TypoHeadColor }} >Data Collection Details</Typography>
                                                        </CssVarsProvider>
                                                    </Box>
                                                </Box>
                                                {datacolData && datacolData.map((val, index) => {
                                                    return <Box key={index}>
                                                        <Box sx={{
                                                            width: "100%",
                                                            display: "flex",
                                                            flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'column', xl: 'column', },
                                                        }}>
                                                            <Box sx={{
                                                                width: "100%", display: "flex", p: 0.5,
                                                                flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                                            }}>
                                                                <Box
                                                                    sx={{ width: "25%", }}>
                                                                    <CssVarsProvider>
                                                                        <Typography sx={{ pl: 1, fontSize: 15 }}>Requested Remarks</Typography>
                                                                    </CssVarsProvider>
                                                                </Box>
                                                                <Paper sx={{
                                                                    width: '75%', minHeight: 10, maxHeight: 70, pl: 0.5, fontSize: 15, textTransform: "capitalize",
                                                                    overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                                                }} variant='none'>
                                                                    {val.crf_req_remark}
                                                                </Paper>
                                                            </Box>
                                                            <Box sx={{
                                                                width: "100%", display: "flex", p: 0.5,
                                                                flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                                            }}>
                                                                <Box
                                                                    sx={{ width: "25%", }}>
                                                                    <CssVarsProvider>
                                                                        <Typography sx={{ pl: 1, fontSize: 15 }}>Requested To</Typography>
                                                                    </CssVarsProvider>
                                                                </Box>
                                                                <Paper sx={{
                                                                    width: '75%', minHeight: 10, maxHeight: 70, pl: 0.5, fontSize: 15, textTransform: "capitalize",
                                                                    overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                                                }} variant='none'>
                                                                    {val.data_entered}
                                                                </Paper>
                                                            </Box>
                                                            <Box sx={{
                                                                width: "100%", display: "flex", p: 0.5,
                                                                flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                                            }}>
                                                                <Box
                                                                    sx={{ width: "25%", }}>
                                                                    <CssVarsProvider>
                                                                        <Typography sx={{ pl: 1, fontSize: 15 }}>Requested Details</Typography>
                                                                    </CssVarsProvider>
                                                                </Box>
                                                                <Paper sx={{
                                                                    width: '25%', minHeight: 10, maxHeight: 70, pl: 0.5, fontSize: 15, textTransform: "capitalize",
                                                                    overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                                                }} variant='none'>
                                                                    {val.req_user}
                                                                </Paper>
                                                                <Paper sx={{
                                                                    width: '20%', minHeight: 10, maxHeight: 70, pl: 0.5, fontSize: 15, textTransform: "capitalize",
                                                                    overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                                                }} variant='none'>
                                                                    {val.create_date}
                                                                </Paper>
                                                            </Box>

                                                            <Box sx={{
                                                                width: "100%", display: "flex", p: 0.5,
                                                                flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                                            }}>
                                                                <Box
                                                                    sx={{ width: "25%", }}>
                                                                    <CssVarsProvider>
                                                                        <Typography sx={{ pl: 1, fontSize: 15 }}>Data Collection Reply</Typography>
                                                                    </CssVarsProvider>
                                                                </Box>
                                                                <Paper sx={{
                                                                    width: '75%', minHeight: 10, maxHeight: 70, pl: 0.5, fontSize: 15, textTransform: "capitalize",
                                                                    overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                                                }} variant='none'>
                                                                    {val.crf_dept_remarks}
                                                                </Paper>
                                                            </Box>
                                                            <Box sx={{
                                                                width: "100%", display: "flex", p: 0.5,
                                                                flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },

                                                            }}>
                                                                <Box
                                                                    sx={{ width: "25%", }}>
                                                                    <CssVarsProvider>
                                                                        <Typography sx={{ pl: 1, fontSize: 15 }}>Reply Details</Typography>
                                                                    </CssVarsProvider>
                                                                </Box>
                                                                <Paper sx={{
                                                                    width: '25%', minHeight: 10, maxHeight: 70, pl: 0.5, fontSize: 15, textTransform: "capitalize",
                                                                    overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                                                }} variant='none'>
                                                                    {val.datagive_user}
                                                                </Paper>
                                                                <Paper sx={{
                                                                    width: '20%', minHeight: 10, maxHeight: 70, pl: 0.5, fontSize: 15, textTransform: "capitalize",
                                                                    overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                                                }} variant='none'>
                                                                    {val.update_date}
                                                                </Paper>
                                                            </Box>
                                                            {val.data_coll_image_status === 1 ? <Box sx={{ display: 'flex', width: "20%", height: 30, pl: 3 }}>
                                                                <Button
                                                                    onClick={() => ViewImageDataColection(val.crf_data_collect_slno)}
                                                                    variant="contained"
                                                                    color="primary">View Image</Button>

                                                            </Box> : null}
                                                        </Box>
                                                        <Divider
                                                            sx={{ my: 0.8 }} />
                                                    </Box>
                                                })}
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
                                                        </Box>

                                                        : <Box>
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
                                                    pl: 1, pr: 1
                                                }}>
                                                <ApprovalCompnt
                                                    heading="MS Approval"
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
                                        </Box>
                                    </Paper>
                                </Box>
                            </DialogContent>
                            <DialogActions>
                                <Button color="secondary" onClick={submit} >Save</Button>
                                <Button onClick={ModalClose} color="secondary" >Cancel</Button>
                            </DialogActions>
                        </Dialog >

                    </Box >
            }
        </Fragment >
    )
}

export default memo(CrfMSDashModal)