import React, { Fragment, useCallback, useState, memo, useEffect, useMemo } from 'react'
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
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import { useSelector } from 'react-redux'
import { CssVarsProvider, Typography } from '@mui/joy'
import Divider from '@mui/material/Divider';
import { TypoHeadColor } from 'src/color/Color'
import _ from 'underscore'
import ItemApprovalCmp from '../DepartmentApprovals/ItemApprovalCmp';
import ReqImageDisplayModal from '../RequestRegister/ReqImageDisplayModal';
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static';
import CusCheckBox from 'src/views/Components/CusCheckBox';
import CrfDataCollectNotOkModal from '../DMSCrfApproval/CrfDataCollectNotOkModal';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

const NdrfModel = ({ open, setOpen, datas, count, setCount }) => {

    const { req_slno, req_date, actual_requirement, needed, location, dept_name, req_userdeptsec,
        ndactual_requirement, ndneeded, request_dept_slno, request_deptsec_slno, rm_ndrf,
        expected_date, req_user, userdeptsec, image_status, incharge_approve, incharge_req,
        incharge, incharge_remark, inch_detial_analysis, incharge_apprv_date, incharge_user,
        hod_approve, hod, hod_remarks, hod_detial_analysis, hod_approve_date, category,
        hod_user, dms_req, dms, dms_approve, dms_remarks, dms_detail_analysis, dms_approve_date, dms_user,
        ms_approve_req, ms_approve, ms, ms_approve_remark, ms_detail_analysis, ms_approve_date, ms_user,
        manag_operation_approv, om, manag_operation_remarks, om_detial_analysis, om_approv_date, manag_operation_user,
        senior_manage_approv, smo, senior_manage_remarks, smo_detial_analysis, som_aprrov_date, senior_manage_user,
        cao_approve, cao, cao_approve_remarks, ceo_detial_analysis, cao_approv_date, cao_user,
        md_approve, md, md_approve_remarks, md_detial_analysis, md_approve_date, md_user,
        ed_approve, ed, ed_approve_remarks, ed_detial_analysis, ed_approve_date, ed_user
    } = datas[0]

    const reqdate = format(new Date(req_date), 'dd-MM-yyyy')
    const expdate = format(new Date(expected_date), 'dd-MM-yyyy')
    const inchargeApprovdate = incharge_apprv_date !== null ? format(new Date(incharge_apprv_date), 'dd-MM-yyyy') : "Not Updated"
    const hodApprovdate = hod_approve_date !== null ? format(new Date(hod_approve_date), 'dd-MM-yyyy') : "Not Updated"
    const dmsApprovdate = dms_approve_date !== null ? format(new Date(dms_approve_date), 'dd-MM-yyyy') : "Not Updated"
    const msApprovdate = ms_approve_date !== null ? format(new Date(ms_approve_date), 'dd-MM-yyyy') : "Not Updated"
    const omdate = om_approv_date !== null ? format(new Date(om_approv_date), 'dd-MM-yyyy hh:mm:ss') : "Not Updated"
    const smodate = som_aprrov_date !== null ? format(new Date(som_aprrov_date), 'dd-MM-yyyy hh:mm:ss') : "Not Updated"
    const caodate = cao_approv_date !== null ? format(new Date(cao_approv_date), 'dd-MM-yyyy hh:mm:ss') : null
    const mddate = md_approve_date !== null ? format(new Date(md_approve_date), 'dd-MM-yyyy hh:mm:ss') : null
    const eddate = ed_approve_date !== null ? format(new Date(ed_approve_date), 'dd-MM-yyyy hh:mm:ss') : null

    //redux for geting login id
    const id = useSelector((state) => state.LoginUserData.empid, _.isEqual)

    const [dataPost, setdataPost] = useState([])
    const [tableDis, setTableDis] = useState(0)
    const [enable, setEnable] = useState(0)
    const [datacollectdata, setDataCollectData] = useState([])
    const [colectDetlCheck, setCollectDetailCheck] = useState(0)
    const [approve, setApprove] = useState(false)
    const updateApprove = useCallback((e) => {
        if (e.target.checked === true) {
            setApprove(true)
        }
        else {
            setApprove(false)

        }
    }, [])

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

        InsertFun(req_slno)
        getImage(req_slno)
        getDataCollectCompleteDetails(req_slno)
    }, [req_slno, enable])

    const [imageshowFlag, setImageShowFlag] = useState(0)
    const [imageshow, setImageShow] = useState(false)
    const [imagearray, setImageArry] = useState([])

    const ViewImage = useCallback(() => {
        setImageShowFlag(1)
        setImageShow(true)
    }, [])

    const handleClose = useCallback(() => {
        setImageShowFlag(0)
        setImageShow(false)
    }, [])

    // reset
    const ModalClose = useCallback(() => {
        setOpen(false)
        setdataPost([])
        setTableDis(0)
        setDataCollectData([])
        setCollectDetailCheck(0)
        setApprove(false)
        setImageShowFlag(0)
        setImageShow(false)
        setImageArry([])

    }, [setOpen])


    const postdata = useMemo(() => {

        return {
            req_slno: req_slno,
            actual_requirement: ndactual_requirement,
            needed: ndneeded,
            request_dept_slno: request_dept_slno,
            request_deptsec_slno: request_deptsec_slno,
            location: location,
            create_user: id
        }
    }, [req_slno, ndactual_requirement, ndneeded, request_dept_slno, request_deptsec_slno, location, id])

    const submit = useCallback((e) => {
        e.preventDefault();

        const NdrfInsertFun = async (postdata) => {
            const result = await axioslogin.post('/ndrf/NdrfInsert', postdata);
            return result.data
        }
        //** Inset api for Approval */
        const NdrfInsertApproval = async (insetid) => {
            const ApprovalData = {
                ndrf_mast_slno: insetid
            }
            const result = await axioslogin.post('/ndrf/postReqApproval', ApprovalData);
            return result.data
        }

        const NdrfDetaildata = async (insetid, datas) => {
            const postdataDetl = datas && datas.map((val) => {
                return {
                    ndrf_mast_slno: insetid,
                    item_slno: val.item_slno,
                    item_desc: val.item_desc,
                    item_brand: val.item_brand,
                    item_unit: val.item_unit,
                    item_qnty: val.item_qnty,
                    item_specification: val.item_specification,
                    aprox_cost: val.aprox_cost,
                    item_status: 1,
                    create_user: id
                }
            })
            const result = await axioslogin.post('/ndrf/ndrfDetailInsert', postdataDetl);
            const { message, success } = result.data;
            if (success === 1) {
                succesNotify(message)
                setCount(count + 1)
                ModalClose()
            }
            else {
                infoNotify("Datas Not Inserted")
            }
        }

        if (approve === true) {
            NdrfInsertFun(postdata).then((value) => {
                const { message, success, insetid } = value
                if (success === 1) {
                    NdrfInsertApproval(insetid).then((val) => {
                        const { message, success } = val
                        if (success === 1) {
                            if (datacollectdata.length !== 0) {
                                NdrfDetaildata(insetid, datacollectdata)
                            } else if (dataPost.length !== 0) {
                                NdrfDetaildata(insetid, dataPost)
                            } else {
                                succesNotify(message)
                                setCount(count + 1)
                                ModalClose()
                            }
                        }
                        else {
                            warningNotify(message)
                        }
                    })
                }
                else {
                    infoNotify(message)
                    setOpen(false)
                    setApprove(false)
                }

            })
        }

    }, [postdata, approve, count, setCount, setOpen, datacollectdata, dataPost, ModalClose, id])

    return (

        <Fragment>
            <ToastContainer />
            {
                enable === 1 ? <CrfDataCollectNotOkModal open={open} setOpen={setOpen} setEnable={setEnable} />
                    :
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
                                    </Paper>
                                </Box>

                                <Paper variant='outlined' sx={{ mt: 1 }} >
                                    <Box sx={{
                                        width: "100%",
                                        display: "flex",
                                        flexDirection: "row",
                                        pl: 2, pt: 0, fontSize: 15
                                    }}>
                                        {
                                            rm_ndrf === 0 ? <Box sx={{ width: "20%", mt: 1 }}>
                                                <CusCheckBox
                                                    label="NDRF Approve"
                                                    color="primary"
                                                    size="md"
                                                    name="approve"
                                                    value={approve}
                                                    checked={approve}
                                                    onCheked={updateApprove}
                                                />
                                            </Box> :
                                                <CssVarsProvider>
                                                    <Typography sx={{ fontSize: 15, fontWeight: 600 }} >NDRF Already Generated </Typography>

                                                </CssVarsProvider>

                                        }

                                    </Box>
                                </Paper>

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

export default memo(NdrfModel)