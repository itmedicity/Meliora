import React, { Fragment, useCallback, useState, memo, useEffect, useMemo } from 'react'
import Slide from '@mui/material/Slide';
import { ToastContainer } from 'react-toastify';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { Box, Paper, IconButton, Input } from '@mui/material'
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
import DeptSectionSelectMulti from 'src/views/CommonSelectCode/DeptSectionSelectMulti';
import CusCheckBox from 'src/views/Components/CusCheckBox';
import CustomTextarea from 'src/views/Components/CustomTextarea';
import DataCollectnImageDis from '../ComonComponent/DataCollectnImageDis';
import DataCollectnPendingModal from '../ComonComponent/DataCollectnPendingModal';
import AddMoreItemDtails from '../ComonComponent/AddMoreItemDtails';
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static';
import ReqImageDisModal from '../ComonComponent/ReqImageDisModal';
import CustomeToolTip from 'src/views/Components/CustomeToolTip';
import CustomPaperTitle from 'src/views/Components/CustomPaperTitle';
import UploadFileIcon from '@mui/icons-material/UploadFile'
import imageCompression from 'browser-image-compression';
import CloseIcon from '@mui/icons-material/Close';
import CusIconButton from 'src/views/Components/CusIconButton'
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CustomBackDrop from 'src/views/Components/CustomBackDrop';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

const CrmHodApprovalModal = ({ open, ApprovalData, setApprovalModal, setApprovalFlag, count, setCount,
    setApprovalData }) => {
    const { req_slno, req_date, actual_requirement, needed, expected_date, incharge_approve, incharge_req,
        inch_detial_analysis, incharge, incharge_remark, incharge_user, image_status,
        incharge_apprv_date, hod_approve, hod_remark, hod_detial_analysis, hod_image } = ApprovalData
    const expdate = expected_date !== null ? format(new Date(expected_date), 'dd-MM-yyyy') : "Not Updated"
    const inchargeApprovdate = incharge_apprv_date !== null ? format(new Date(incharge_apprv_date), 'dd-MM-yyyy hh:mm:ss') : "Not Updated"

    const [reqTableDis, setReqTableDis] = useState(0)

    const [detailData, setDetailData] = useState([])
    const id = useSelector((state) => state.LoginUserData.empid, _.isEqual)
    const [crfdept, serCrfDept] = useState([])
    const [datacollFlag, setDataCollFlag] = useState(false)
    const [ApproveTableDis, setApproveTableDis] = useState(0)
    const [ApproveTableData, setApproveTableData] = useState([])
    const [openbackdrop, setOpenBackdrop] = useState(false)
    const [remark, setRemark] = useState('')
    const updateRemark = useCallback((e) => {
        setRemark(e.target.value)
    }, [])
    const [detailAnalis, setDetailAnalis] = useState('')
    const updatedetailAnalis = useCallback((e) => {
        setDetailAnalis(e.target.value)
    }, [])
    //state for Remarks
    const [datacolectremark, setDatacollectRemark] = useState('')
    const updateDatacollectRemark = useCallback((e) => {
        setDatacollectRemark(e.target.value)
    }, [])


    const updateDataCollFlag = useCallback((e) => {
        if (e.target.checked === true) {
            setDataCollFlag(true)
        } else {
            setDataCollFlag(false)
        }

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

    const [selectFile, setSelectFile] = useState([])
    const uploadFile = useCallback(async (e) => {
        const newFiles = [...selectFile]
        newFiles.push(e.target.files[0])
        setSelectFile(newFiles)
    }, [selectFile, setSelectFile])

    const handleImageUpload = useCallback(async (imageFile) => {
        const options = {
            maxSizeMB: 2,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
        }
        const compressedFile = await imageCompression(imageFile, options)
        return compressedFile
    }, []);

    const handleRemoveFile = (index) => {
        setSelectFile((prevFiles) => {
            const updatedFiles = [...prevFiles];
            updatedFiles.splice(index, 1); // Remove the file at the specified index
            return updatedFiles;
        });
    };


    useEffect(() => {
        setApprove(hod_approve === 1 ? true : false)
        setReject(hod_approve === 2 ? true : false)
        setPending(hod_approve === 3 ? true : false)
        setRemark(hod_remark !== null ? hod_remark : '')
        setDetailAnalis(hod_detial_analysis !== null ? hod_detial_analysis : '')
    }, [hod_approve, hod_remark, hod_detial_analysis])

    const HodPatchData = useMemo(() => {
        return {
            hod_approve: approve === true ? 1 : reject === true ? 2 : pending === true ? 3 : null,
            hod_user: id,
            req_slno: req_slno,
            hod_approve_date: format(new Date(), 'yyyy-MM-dd hh:mm:ss'),
            hod_remarks: remark,
            hod_detial_analysis: detailAnalis

        }
    }, [approve, reject, pending, id, remark, detailAnalis, req_slno])

    const [addMoreItems, setMoreItem] = useState(0)

    const AddItems = useCallback(() => {
        setMoreItem(1)
    }, [])

    const [imageshowFlag, setImageShowFlag] = useState(0)
    const [imageshow, setImageShow] = useState(false)
    const [imagearray, setImageArry] = useState([])

    const ViewImage = useCallback(() => {
        const getImage = async (req_slno) => {
            const result = await axioslogin.get(`/newCRFRegisterImages/crfRegimageGet/${req_slno}`)
            const { success, data } = result.data
            if (success === 1) {
                const fileNames = data;
                const fileUrls = fileNames.map((fileName) => {
                    return `${PUBLIC_NAS_FOLDER}/CRF/crf_registration/${req_slno}/${fileName}`;
                });
                setImageArry(fileUrls);
                setImageShowFlag(1)
                setImageShow(true)
            }
            else {
                warningNotify("Error Occured to display image")
                setImageShowFlag(0)
                setImageShow(false)
                setImageArry([])
            }
        }
        getImage(req_slno)

    }, [req_slno])

    const handleClose = useCallback(() => {
        setImageShowFlag(0)
        setImageShow(false)
        setImageArry([])
    }, [])

    const ViewUploadImage = useCallback(() => {
        const getImage = async (req_slno) => {
            const result = await axioslogin.get(`/newCRFRegisterImages/crfHodImageGet/${req_slno}`)
            const { success, data } = result.data
            if (success === 1) {
                const fileNames = data;
                const fileUrls = fileNames.map((fileName) => {
                    return `${PUBLIC_NAS_FOLDER}/CRF/crf_registration/${req_slno}/HodUpload/${fileName}`;
                });
                setImageArry(fileUrls);
                setImageShowFlag(1)
                setImageShow(true)
            } else {
                warningNotify("Error Occured to display image")
                setImageShowFlag(0)
                setImageShow(false)
                setImageArry([])
            }
        }
        getImage(req_slno)
    }, [req_slno])


    const [enable, setEnable] = useState(0)
    const [datacollectdata, setDataCollectData] = useState([])
    const [colectDetlCheck, setCollectDetailCheck] = useState(true)

    const [datacolflag, setDataColFlag] = useState(0)
    const [datacolData, setDataColData] = useState([])

    const [collImageShowFlag, setCollImageShowFlag] = useState(0)
    const [collImageShow, setCollImageShow] = useState(false)
    const [dataCollSlno, setDataCollSlNo] = useState('')

    const ViewImageDataColection = useCallback((val) => {
        setDataCollSlNo(val);
        setCollImageShowFlag(1)
        setCollImageShow(true)
    }, [])

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

        const checkDataCollectComplete = async (req_slno) => {
            const result = await axioslogin.get(`/CRFRegisterApproval/DataCollectComplete/${req_slno}`)
            const { success, data } = result.data
            if (success === 1) {
                const xx = data && data.filter((val) => val.crf_dept_status !== 1)
                const yy = data && data.filter((val) => val.crf_dept_status === 1)
                if (xx.length !== 0) {
                    setEnable(1)
                    setCollectDetailCheck(true)
                    const datas = xx.map((val) => {
                        const obj = {
                            crf_dept_remarks: val.crf_dept_remarks,
                            datagive_user: val.datagive_user,
                            data_entered: val.data_entered !== null ? val.data_entered.toLowerCase() : '',
                            reqest_one: val.reqest_one,
                            req_user: val.req_user !== null ? val.req_user.toLowerCase() : '',
                            create_date: val.create_date,
                            update_date: val.update_date,
                            crf_req_remark: val.crf_req_remark,
                            data_coll_image_status: val.data_coll_image_status,
                            crf_data_collect_slno: val.crf_data_collect_slno
                        }
                        return obj
                    })
                    setDataCollectData(datas)
                }
                else {
                    setEnable(0)
                    setCollectDetailCheck(false)
                    setDataCollectData([])
                }
                if (yy.length !== 0) {
                    setDataColFlag(1)
                    const datas = yy.map((val) => {
                        const obj = {
                            crf_dept_remarks: val.crf_dept_remarks,
                            datagive_user: val.datagive_user,
                            data_entered: val.data_entered !== null ? val.data_entered.toLowerCase() : '',
                            reqest_one: val.reqest_one,
                            req_user: val.req_user !== null ? val.req_user.toLowerCase() : '',
                            create_date: val.create_date,
                            update_date: val.update_date,
                            crf_req_remark: val.crf_req_remark,
                            data_coll_image_status: val.data_coll_image_status,
                            crf_data_collect_slno: val.crf_data_collect_slno,
                        }
                        return obj
                    })
                    setDataColData(datas)
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
        checkDataCollectComplete(req_slno)
        getItemDetails(req_slno)
        getApproItemDetails(req_slno)

    }, [req_slno, addMoreItems])

    const reset = useCallback(() => {
        setReqTableDis(0)
        setDetailData([])
        serCrfDept([])
        setDataCollFlag(false)
        setApproveTableDis(0)
        setApproveTableData([])
        setRemark('')
        setDetailAnalis('')
        setDatacollectRemark('')
        setPending(false)
        setApprove(false)
        setReject(false)
        setMoreItem(0)
        setEnable(0)
        setDataCollectData([])
        setCollectDetailCheck(false)
        setDataColFlag(0)
        setDataColData([])
        setCollImageShowFlag(0)
        setCollImageShow(false)
        setDataCollSlNo([])
        setApprovalModal(false)
        setApprovalFlag(0)
        setApprovalData([])
        setImageShowFlag(0)
        setImageShow(false)
        setImageArry([])
        setSelectFile([])
    }, [setApprovalFlag, setApprovalModal, setApprovalData])

    const submit = useCallback(() => {
        setOpenBackdrop(true)
        const updateHODApproval = async (HodPatchData) => {
            const result = await axioslogin.patch('/CRFRegisterApproval/Hod', HodPatchData);
            return result.data
        }
        const DataCollRequestFnctn = async (postData) => {
            const result = await axioslogin.post(`/CRFRegisterApproval/dataCollect/Insert`, postData);
            const { success, message } = result.data;
            if (success === 1) {
                setOpenBackdrop(false)
                succesNotify(message)
                setCount(count + 1)
                reset()
            } else {
                setOpenBackdrop(false)
                warningNotify(message)
            }
        }

        const FileInsert = async (req_slno, selectFile) => {
            try {
                const formData = new FormData();
                formData.append('reqslno', req_slno);
                for (const file of selectFile) {
                    if (file.type.startsWith('image')) {
                        const compressedFile = await handleImageUpload(file);
                        formData.append('files', compressedFile, compressedFile.name);
                    } else {
                        formData.append('files', file, file.name);
                    }
                }
                // Use the Axios instance and endpoint that matches your server setup
                const result = await axioslogin.post('/newCRFRegisterImages/crf/ImageInsertHOD', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                return result.data
            } catch (error) {
                setOpenBackdrop(false)
                warningNotify('An error occurred during file upload.');

            }
        }

        if (datacollFlag === true) {
            if (crfdept.length !== 0) {
                if (datacolectremark !== '') {
                    const postData = crfdept && crfdept.map((val) => {
                        return {
                            crf_requst_slno: req_slno,
                            crf_req_collect_dept: val,
                            crf_req_remark: datacolectremark,
                            reqest_one: 2,
                            req_user: id
                        }
                    })
                    DataCollRequestFnctn(postData)
                } else {
                    setOpenBackdrop(false)
                    warningNotify("Please Enter The Remarks")
                }
            } else {
                setOpenBackdrop(false)
                warningNotify("Please Select ant data collection department")
            }
        } else {
            if (approve !== false || reject !== false || pending !== false) {
                if (approve === true && detailAnalis !== '' && remark !== '') {
                    updateHODApproval(HodPatchData).then((val) => {
                        const { success, message } = val
                        if (success === 2) {
                            if (selectFile.length !== 0) {
                                FileInsert(req_slno, selectFile).then((val) => {
                                    const { success, message } = val
                                    if (success === 1) {
                                        setOpenBackdrop(false)
                                        succesNotify("Approved Successfully and also file uploaded")
                                        setCount(count + 1)
                                        reset()
                                    }
                                    else {
                                        setOpenBackdrop(false)
                                        warningNotify(message)
                                    }
                                })
                            } else {
                                setOpenBackdrop(false)
                                succesNotify("Approved Successfully")
                                setCount(count + 1)
                                reset()
                            }
                        }
                        else {
                            setOpenBackdrop(false)
                            warningNotify(message)
                        }

                    })
                }
                else if ((reject === true && remark !== '') || (pending === true && remark !== '')) {
                    updateHODApproval(HodPatchData).then((val) => {
                        const { success, message } = val;
                        if (success === 2) {
                            if (selectFile.length !== 0) {
                                FileInsert(req_slno, selectFile).then((val) => {
                                    const { success, message } = val
                                    if (success === 1) {
                                        setOpenBackdrop(false)
                                        succesNotify("Status updated and also file uploaded")
                                        setCount(count + 1)
                                        reset()
                                    }
                                    else {
                                        setOpenBackdrop(false)
                                        warningNotify(message)
                                    }
                                })
                            } else {
                                setOpenBackdrop(false)
                                succesNotify("Status Updated")
                                setCount(count + 1)
                                reset()
                            }
                        }
                        else {
                            setOpenBackdrop(false)
                            warningNotify(message)
                        }
                    })
                }
                else {
                    setOpenBackdrop(false)
                    warningNotify("Justification must be Entered")
                }
            } else {
                setOpenBackdrop(false)
                warningNotify("Please Select any status")
            }
        }
    }, [approve, reject, pending, remark, detailAnalis, HodPatchData, setCount, count, reset, datacollFlag,
        datacolectremark, crfdept, id, req_slno, selectFile, handleImageUpload])

    const ModalClose = useCallback(() => {
        reset()
    }, [reset])


    const handleCloseCollect = useCallback(() => {
        setCollImageShow(false)
        setCollImageShowFlag(1)
        setDataCollSlNo('')
    }, [])

    return (
        <Fragment>
            <ToastContainer />
            <CustomBackDrop open={openbackdrop} text="Please Wait" />
            {imageshowFlag === 1 ? <ReqImageDisModal open={imageshow} handleClose={handleClose}
                images={imagearray} /> : null}


            {collImageShowFlag === 1 ? <DataCollectnImageDis open={collImageShow} handleCloseCollect={handleCloseCollect}
                dataCollSlno={dataCollSlno} req_slno={req_slno}
            /> : null}

            {
                enable === 1 ? <DataCollectnPendingModal open={colectDetlCheck} ModalClose={ModalClose}
                    datacollectdata={datacollectdata} /> :
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
                                HOD Approval
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
                                        {image_status === 1 ? <Box sx={{ mx: 0.5, pb: 0.5 }}>
                                            <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={ViewImage}  >
                                                <AttachFileIcon fontSize='small' />
                                                <Typography color="primary" sx={{ fontSize: 15, pl: 1, pr: 1, }}>View Image</Typography>
                                            </CusIconButton>
                                        </Box> : null}
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
                                            </Box>
                                        </Box>
                                    </Paper>

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
                                                                        sx={{ width: "15%", }}>
                                                                        <CssVarsProvider>
                                                                            <Typography sx={{ pl: 1, fontSize: 15 }}>Requested To:</Typography>
                                                                        </CssVarsProvider>
                                                                    </Box>
                                                                    <Paper sx={{
                                                                        width: '30%', minHeight: 10, maxHeight: 70, pl: 0.5, fontSize: 15, textTransform: "capitalize",
                                                                        overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                                                    }} variant='none'>
                                                                        {val.data_entered}
                                                                    </Paper>
                                                                    <Box
                                                                        sx={{ width: "10%", }}>
                                                                        <CssVarsProvider>
                                                                            <Typography sx={{ pl: 1, fontSize: 15 }}>Requested By:</Typography>
                                                                        </CssVarsProvider>
                                                                    </Box>
                                                                    <Paper sx={{
                                                                        width: '20%', minHeight: 10, maxHeight: 70, pl: 0.5, fontSize: 15, textTransform: "capitalize",
                                                                        overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                                                    }} variant='none'>
                                                                        {val.req_user}
                                                                    </Paper>
                                                                    <Paper sx={{
                                                                        width: '20%', minHeight: 10, maxHeight: 70, pl: 0.5, fontSize: 15, textTransform: "capitalize",
                                                                        overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                                                    }} variant='none'>
                                                                        Date:   {val.create_date}
                                                                    </Paper>
                                                                </Box>
                                                                <Box sx={{
                                                                    width: "100%", display: "flex", p: 0.5,
                                                                    flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                                                }}>

                                                                    <Box
                                                                        sx={{ width: "15%", }}>
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
                                                                        sx={{ width: "15%", }}>
                                                                        <CssVarsProvider>
                                                                            <Typography sx={{ pl: 1, fontSize: 15 }}>Replay Remarks</Typography>
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
                                                                        sx={{ width: "15%", }}>
                                                                        <CssVarsProvider>
                                                                            <Typography sx={{ pl: 1, fontSize: 15 }}>Reply User</Typography>
                                                                        </CssVarsProvider>
                                                                    </Box>
                                                                    <Paper sx={{
                                                                        width: '20%', minHeight: 10, maxHeight: 70, pl: 0.5, fontSize: 15, textTransform: "capitalize",
                                                                        overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                                                    }} variant='none'>
                                                                        {val.datagive_user}
                                                                    </Paper>
                                                                    <Paper sx={{
                                                                        width: '20%', minHeight: 10, maxHeight: 70, pl: 0.5, fontSize: 15, textTransform: "capitalize",
                                                                        overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                                                    }} variant='none'>
                                                                        Date: {val.update_date}
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
                                                                // variant="middle"
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
                                                display: "flex", pl: 1, pt: 1, pb: 1,
                                                flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                            }}>
                                                <CusCheckBox
                                                    variant="outlined"
                                                    color="danger"
                                                    size="md"
                                                    name="estimate"
                                                    label="Data Collection Required"
                                                    value={datacollFlag}
                                                    onCheked={updateDataCollFlag}
                                                    checked={datacollFlag}
                                                />
                                            </Box>

                                            {datacollFlag === true ?
                                                <Box sx={{
                                                    width: "100%", display: "flex", flexDirection: "column"
                                                }}>
                                                    <Box sx={{
                                                        width: "100%", display: "flex",
                                                        flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                                    }}>
                                                        <Box sx={{ width: "27%", pt: 1, pl: 1 }}                                                >
                                                            <CssVarsProvider>
                                                                <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Collected Depatments: </Typography>
                                                            </CssVarsProvider>
                                                        </Box>
                                                        <Box sx={{ width: "70%", pt: 1, pl: 1, pb: 0.5 }}                                                >
                                                            <DeptSectionSelectMulti deptSec={crfdept} SetDeptSec={serCrfDept} />
                                                        </Box>
                                                    </Box>
                                                    <Box sx={{
                                                        width: "97%", display: "flex", pb: 1,
                                                        flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                                    }}>
                                                        <CssVarsProvider>
                                                            <Typography sx={{ fontSize: 15, fontWeight: 600, pl: 1, pr: 3 }} >Remarks </Typography>
                                                        </CssVarsProvider>
                                                        <CustomTextarea
                                                            required
                                                            type="text"
                                                            size="sm"
                                                            style={{
                                                                width: "100%",
                                                                height: 50,
                                                                boardColor: "#E0E0E0"
                                                            }}
                                                            placeholder="Remarks"
                                                            value={datacolectremark}
                                                            onchange={updateDatacollectRemark}
                                                        />
                                                    </Box>
                                                </Box> : null
                                            }
                                        </Paper>
                                    </Box>
                                    {
                                        datacollFlag === false ?
                                            <Box>
                                                {ApproveTableDis === 1 ?
                                                    <Paper variant='outlined' sx={{ p: 0, mt: 1 }} >
                                                        <Box sx={{
                                                            width: "100%", display: "flex", p: 0.5, pb: 0, flexDirection: 'column',
                                                        }}>
                                                            <CssVarsProvider>
                                                                <Typography sx={{ fontSize: 15 }}>Items For Approval</Typography>
                                                            </CssVarsProvider>
                                                        </Box>
                                                        <Box sx={{ p: 1 }}>
                                                            <ItemsApprovalCompnt req_slno={req_slno}
                                                                setApproveTableDis={setApproveTableDis}
                                                                ApproveTableDis={ApproveTableDis}
                                                                ApproveTableData={ApproveTableData}
                                                                setApproveTableData={setApproveTableData}
                                                            />
                                                        </Box>

                                                        <Box sx={{ pl: 2 }}>
                                                            <Button onClick={AddItems} variant="contained"
                                                                color="primary">Add Items</Button>
                                                        </Box>
                                                        {addMoreItems === 1 ? <AddMoreItemDtails req_slno={req_slno}
                                                            setMoreItem={setMoreItem}
                                                        /> : null}
                                                        <Box sx={{ p: 1 }}>
                                                            <ApprovalCompntAll
                                                                heading="Hod Approval"
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

                                                    </Paper> :
                                                    <Paper variant='outlined' sx={{ p: 0, mt: 1 }} >
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
                                                                heading="Hod Approval"
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
                                                    </Paper>

                                                }

                                                <Box sx={{ display: 'flex', width: '400', pt: 1 }}>
                                                    {hod_image === 1 ?
                                                        <Box sx={{ mx: 0.5, pb: 0.5 }}>
                                                            <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={ViewUploadImage}  >
                                                                <AttachFileIcon fontSize='small' />
                                                                <Typography color="primary" sx={{ fontSize: 15, pl: 1, pr: 1, }}>View Image</Typography>
                                                            </CusIconButton>
                                                        </Box>
                                                        : null}
                                                    <Box >
                                                        <label htmlFor="file-input">
                                                            <CustomeToolTip title="upload">
                                                                <IconButton color="primary" aria-label="upload file" component="span">
                                                                    <UploadFileIcon />
                                                                    <CustomPaperTitle heading="Maximum Size 25MB" />
                                                                </IconButton>
                                                            </CustomeToolTip>
                                                        </label>
                                                        <Input
                                                            id="file-input"
                                                            type="file"
                                                            accept=".jpg, .jpeg, .png, .pdf"
                                                            style={{ display: 'none' }}
                                                            onChange={uploadFile}
                                                        />
                                                    </Box>
                                                    {
                                                        selectFile && selectFile.map((val, index) => {
                                                            return <Box sx={{ display: "flex", flexDirection: "row", ml: 2, pt: 1 }}
                                                                key={index} >
                                                                <Box >{val.name}</Box>
                                                                <Box sx={{ ml: .3 }}><CloseIcon sx={{ height: '18px', width: '20px', cursor: 'pointer' }}
                                                                    onClick={() => handleRemoveFile(index)}
                                                                /></Box>

                                                            </Box>
                                                        }
                                                        )}
                                                </Box>
                                            </Box> : null
                                    }
                                </Box>
                            </Box>
                        </DialogContent>
                        <DialogActions>
                            <Button color="secondary" onClick={submit} >Save</Button>
                            <Button onClick={ModalClose} color="secondary" >Cancel</Button>
                        </DialogActions>
                    </Dialog>
            }
        </Fragment>
    )
}

export default memo(CrmHodApprovalModal)