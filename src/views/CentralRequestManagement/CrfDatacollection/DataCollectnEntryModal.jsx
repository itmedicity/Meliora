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
import imageCompression from 'browser-image-compression';
import ReqItemDisplay from '../ComonComponent/ReqItemDisplay';
import UploadFileIcon from '@mui/icons-material/UploadFile'
import CloseIcon from '@mui/icons-material/Close';
import _ from 'underscore'
import { useSelector } from 'react-redux'
import { format } from 'date-fns';
import ItemsApprovalCompnt from '../CrfInchargeApproval/ItemsApprovalCompnt';
import CustomTextarea from 'src/views/Components/CustomTextarea';
import CustomPaperTitle from 'src/views/Components/CustomPaperTitle';
import { TypoHeadColor } from 'src/color/Color';
import CustomeToolTip from 'src/views/Components/CustomeToolTip';
import AddMoreItemDtails from '../ComonComponent/AddMoreItemDtails';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

const DataCollectnEntryModal = ({ open, setDataEnterFlag, setDataEnterModal, dtaEnterData, setDataEnterData,
    setCount, count }) => {

    const { req_slno, req_date, actual_requirement, needed, expected_date,
        crf_req_remark, create_date, requser, crf_data_collect_slno
    } = dtaEnterData

    const expdate = expected_date !== null ? format(new Date(expected_date), 'dd-MM-yyyy') : "Not Updated"

    const [reqTableDis, setReqTableDis] = useState(0)

    const [detailData, setDetailData] = useState([])
    const id = useSelector((state) => state.LoginUserData.empid, _.isEqual)

    const [ApproveTableDis, setApproveTableDis] = useState(0)
    const [ApproveTableData, setApproveTableData] = useState([])

    const [remark, setRemark] = useState('')
    const updateRemark = useCallback((e) => {
        setRemark(e.target.value)
    }, [])


    const [addMoreItems, setMoreItem] = useState(0)

    const AddItems = useCallback(() => {
        setMoreItem(1)
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
        getItemDetails(req_slno)
        getApproItemDetails(req_slno)

    }, [req_slno, addMoreItems])


    const [selectFile, setSelectFile] = useState([])
    const uploadFile = useCallback(async (e) => {
        if (e.target.files[0].type === "application/pdf" ||
            e.target.files[0].type === "image/png" ||
            e.target.files[0].type === "image/jpeg" ||
            e.target.files[0].type === "image/jpg"

        ) {
            if ((e.target.files[0].size) > 26214400) {
                warningNotify("File Size Is to Large")
            } else {
                const newFiles = [...selectFile]
                newFiles.push(e.target.files[0])
                setSelectFile(newFiles)
            }

        } else {
            warningNotify("Only .png, .jpeg, and .pdf File format allowed!")
        }

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


    const patchdata = useMemo(() => {
        return {
            crf_dept_remarks: remark,
            save_user: id,
            crf_data_collect_slno: crf_data_collect_slno
        }
    }, [remark, crf_data_collect_slno, id])


    const reset = useCallback(() => {
        setDataEnterFlag(0)
        setDataEnterModal(false)
        setDataEnterData([])
        setReqTableDis(0)
        setDetailData([])
        setApproveTableDis(0)
        setApproveTableData([])
        setRemark('')

    }, [setDataEnterFlag, setDataEnterModal, setDataEnterData])


    const submit = useCallback((e) => {
        e.preventDefault();

        const DataCollectnGiven = async (patchdata) => {
            const result = await axioslogin.patch('/CRFRegisterApproval/CrfDataCollactnSave', patchdata);
            return result.data
        }

        const FileInsert = async (crf_data_collect_slno, req_slno, selectFile) => {
            try {
                const formData = new FormData();
                formData.append('id', crf_data_collect_slno);
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
                const result = await axioslogin.post('/newCRFRegisterImages/crf/DataCollection', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                return result.data
            } catch (error) {
                warningNotify('An error occurred during file upload.');

            }
        }

        if (remark !== '') {
            DataCollectnGiven(patchdata).then((value) => {
                const { success, message } = value
                if (success === 1) {
                    if (selectFile.length !== 0) {
                        FileInsert(crf_data_collect_slno, req_slno, selectFile).then((val) => {
                            const { success, message } = val
                            if (success === 1) {
                                succesNotify(message)
                                setCount(count + 1)
                                reset()
                            }
                            else {
                                warningNotify(message)
                            }
                        })
                    } else {
                        succesNotify(message)
                        setCount(count + 1)
                        reset()
                    }
                }
                else {
                    warningNotify(message)
                }
            })
        }
        else {
            warningNotify("Please Enter remarks Before Save")
        }

    }, [patchdata, count, setCount, remark, crf_data_collect_slno,
        req_slno, selectFile, handleImageUpload, reset])


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
                        CRF Data Colection Replay
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
                            <Box>
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
                                </Paper>

                            </Box>
                            : <Box sx={{
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
                                                <Typography sx={{ pl: 1, fontWeight: 900, fontSize: 14, color: TypoHeadColor }} >Data Collection Request Details</Typography>
                                            </CssVarsProvider>
                                        </Box>
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
                                            {crf_req_remark}
                                        </Paper>
                                    </Box>
                                    <Box sx={{
                                        width: "100%", display: "flex", p: 0.5,
                                        flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                    }}>
                                        <Box
                                            sx={{ width: "15%", }}>
                                            <CssVarsProvider>
                                                <Typography sx={{ pl: 1, fontSize: 15 }}>Requested Details</Typography>
                                            </CssVarsProvider>
                                        </Box>
                                        <Paper sx={{
                                            width: '20%', minHeight: 10, maxHeight: 70, pl: 0.5, fontSize: 15, textTransform: "capitalize",
                                            overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                        }} variant='none'>
                                            {requser}
                                        </Paper>
                                        <Paper sx={{
                                            width: '20%', minHeight: 10, maxHeight: 70, pl: 0.5, fontSize: 15, textTransform: "capitalize",
                                            overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                        }} variant='none'>
                                            {create_date}
                                        </Paper>
                                    </Box>
                                </Box>
                            </Paper>
                        </Box>
                        {reqTableDis === 1 ?
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
                                <Box sx={{ pl: 2 }}>
                                    <Button onClick={AddItems} variant="contained"
                                        color="primary">Add Items</Button>
                                </Box>
                                {addMoreItems === 1 ? <AddMoreItemDtails req_slno={req_slno}
                                    setMoreItem={setMoreItem}
                                /> : null}


                            </Paper> : null}


                        <Box sx={{ width: "100%", mt: 0 }}>
                            <Paper variant='outlined' sx={{ mt: 1 }} >
                                <Box sx={{
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: "column"
                                }}>
                                    <CustomPaperTitle heading="Remarks" />
                                    <Box sx={{
                                        display: 'flex',
                                        p: 0.5,
                                        width: { xs: '100%', sm: '100%', md: '100%', lg: '100%', xl: '100%', },
                                    }} >
                                        <CustomTextarea
                                            required
                                            type="text"
                                            size="sm"
                                            style={{
                                                width: "100%",
                                                height: 70,
                                            }}
                                            value={remark}
                                            onchange={updateRemark}
                                        />
                                    </Box>
                                </Box>
                            </Paper>
                        </Box>

                        <Box sx={{ display: 'flex', width: '400', pt: 1 }}>
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
                                    return <Box sx={{ display: "flex", flexDirection: "row", ml: 2, pt: 2 }}
                                        key={index} >
                                        <Box >{val.name}</Box>
                                        <Box sx={{ ml: .3 }}><CloseIcon sx={{ height: '18px', width: '20px', cursor: 'pointer' }}
                                            onClick={() => handleRemoveFile(index)}
                                        /></Box>

                                    </Box>
                                }
                                )}
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

export default memo(DataCollectnEntryModal)