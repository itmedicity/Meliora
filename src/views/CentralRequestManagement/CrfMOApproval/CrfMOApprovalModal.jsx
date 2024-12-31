import React, { Fragment, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Box, CssVarsProvider, Modal, ModalClose, ModalDialog, Textarea, Typography } from '@mui/joy'
import CrfReqDetailViewCmp from '../ComonComponent/CrfReqDetailViewCmp'
import ReqItemDisplay from '../ComonComponent/ReqItemDisplay'
import CommonInchargeReqCmp from '../ComonComponent/ApprovalComp/CommonInchargeReqCmp'
import CommonHodApprvCmp from '../ComonComponent/ApprovalComp/CommonHodApprvCmp'
import { Paper } from '@mui/material'
import ViewOreviousDataCollctnDetails from '../ComonComponent/DataCollectionComp/ViewOreviousDataCollctnDetails'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import DataCollectDepSecSelect from '../ComonComponent/DataCollectionComp/DataCollectDepSecSelect'
import ItemsApprovalCompnt from '../CrfInchargeApproval/ItemsApprovalCompnt'
import CustomIconButtonCmp from '../ComonComponent/Components/CustomIconButtonCmp'
import AddMoreItemDtails from '../ComonComponent/AddMoreItemDtails'
import ApprovalCompntAll from '../ComonComponent/ApprovalCompntAll'
import _ from 'underscore'
import { useQueryClient } from 'react-query'
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static';
import imageCompression from 'browser-image-compression';
import CommonDmsApprvCmp from '../ComonComponent/ApprovalComp/CommonDmsApprvCmp'
import CommonMsApprvCmp from '../ComonComponent/ApprovalComp/CommonMsApprvCmp'
import { useSelector } from 'react-redux'
import { format } from 'date-fns'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import ModalButtomCmp from '../ComonComponent/Components/ModalButtomCmp'

const CrfMOApprovalModal = ({ open, ApprovalData, reqItems, handleClose, setApproveTableData, approveTableData,
    datacolflag, datacolData, imagearray }) => {

    const { req_slno, incharge_req, incharge_remarks, hod_req, hod_approve, dms_req, dms_approve, ms_approve,
        ms_approve_req, manag_operation_approv, manag_operation_remarks, om_detial_analysis, mo_image
    } = ApprovalData

    const queryClient = useQueryClient()
    const id = useSelector((state) => state.LoginUserData.empid, _.isEqual)

    const [crfdept, setCrfDept] = useState(0)
    const [editEnable, setEditEnable] = useState(0)
    const [addMoreItems, setMoreItem] = useState(0)
    const [selectFile, setSelectFile] = useState([])
    const [uploadedImages, setUploadedImages] = useState([])

    const [apprvlDetails, setApprvlDetails] = useState({
        approve: manag_operation_approv === 1 ? true : false,
        reject: manag_operation_approv === 2 ? true : false,
        pending: manag_operation_approv === 3 ? true : false,
        remark: manag_operation_remarks !== null ? manag_operation_remarks : '',
        detailAnalis: om_detial_analysis !== null ? om_detial_analysis : '',
        datacollFlag: false,
        datacolectremark: ''
    });
    const { remark, detailAnalis, approve, reject, pending, datacollFlag, datacolectremark } = apprvlDetails
    const updateOnchangeState = useCallback((e) => {
        const { name, type, value, checked } = e.target;
        setApprvlDetails((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    }, []);

    const updateApprovalState = useCallback((type) => {
        setApprvlDetails((prev) => ({
            ...prev,
            approve: type === 'approve',
            reject: type === 'reject',
            pending: type === 'pending',
        }));
    }, []);

    const AddItems = useCallback(() => {
        setMoreItem(1)
    }, [])
    const isMounted = useRef(true);
    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        };
    }, [isMounted]);
    const reset = useCallback(() => {
        if (isMounted.current) {
            setApprvlDetails((prev) => ({
                ...prev,
                remark: '',
                detailAnalis: '',
                approve: false,
                reject: false,
                pending: false,
                datacollFlag: false,
                datacolectremark: ''
            }));
            setCrfDept(0)
            setApproveTableData([])
            setSelectFile([])
            setUploadedImages([])
            setEditEnable(0)
            setMoreItem(0)
            handleClose()
        }
    }, [setApproveTableData, handleClose])

    const handleImageUpload = useCallback(async (imageFile) => {
        const options = {
            maxSizeMB: 25,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
        }
        const compressedFile = await imageCompression(imageFile, options)
        return compressedFile
    }, []);

    const MOPatchData = useMemo(() => {
        return {
            manag_operation_approv: approve === true ? 1 : reject === true ? 2 : pending === true ? 3 : null,
            manag_operation_user: id,
            req_slno: req_slno,
            om_approv_date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
            manag_operation_remarks: remark,
            om_detial_analysis: detailAnalis,
            items: approveTableData?.map((val) => {
                return {
                    req_detl_slno: val.req_detl_slno,
                    item_status_approved: val.item_status_approved,
                }
            })
        }
    }, [approve, reject, pending, id, remark, detailAnalis, req_slno, approveTableData])

    const submit = useCallback(() => {
        if (editEnable === 1) {
            infoNotify("Ensure all other details are entered/completed before submitting");
        }
        else {
            const updateMOApproval = async (MOPatchData) => {
                const result = await axioslogin.patch('/CRFRegisterApproval/Mo', MOPatchData);
                return result.data;
            };
            const DataCollRequestFnctn = async (postData) => {
                try {
                    const result = await axioslogin.post(`/CRFRegisterApproval/dataCollect/Insert`, postData);
                    const { success, message } = result.data;
                    if (success === 1) {
                        succesNotify(message);
                        queryClient.invalidateQueries('getPendingAll');
                        reset();
                    } else {
                        warningNotify(message);
                    }
                } catch (error) {
                    warningNotify('An error occurred during data collection insertion.');
                }
            };

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
                    const result = await axioslogin.post('/newCRFRegisterImages/crf/ImageInsertMO', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });
                    return result.data;
                } catch (error) {
                    warningNotify('An error occurred during file upload.');
                }
            };

            if (datacollFlag) {
                if (crfdept.length === 0) {
                    warningNotify("Select any data collection department");
                    return;
                }
                if (datacolectremark === '') {
                    warningNotify("Enter the remarks");
                    return;
                }
                const postData = crfdept?.map((val) => ({
                    crf_requst_slno: req_slno,
                    crf_req_collect_dept: val,
                    crf_req_remark: datacolectremark,
                    reqest_one: 5,
                    req_user: id,
                }));
                DataCollRequestFnctn(postData);
                return;
            }

            if (!approve && !reject && !pending) {
                warningNotify("Select any status");
                return;
            }

            if ((approve && detailAnalis && remark) || ((reject || pending) && remark)) {
                updateMOApproval(MOPatchData).then((val) => {
                    const { success, message } = val;
                    if (success !== 1) {
                        warningNotify(message);
                        return;
                    }
                    const onSuccess = (fileUploadMessage) => {
                        const notifyMessage = approve ? "Approved Successfully" : "Status Updated";
                        succesNotify(`${notifyMessage}${fileUploadMessage ? ` and ${fileUploadMessage}` : ""}`);
                        reset();
                        queryClient.invalidateQueries('getPendingAll');
                    };

                    if (selectFile.length > 0) {
                        FileInsert(req_slno, selectFile).then((fileResponse) => {
                            const { success: fileSuccess, message: fileMessage } = fileResponse || {};
                            if (fileSuccess === 1) {
                                onSuccess("file uploaded");
                            } else {
                                warningNotify(fileMessage);
                            }
                        });
                    } else {
                        onSuccess();
                    }
                });
            } else {
                warningNotify("Justification is required");
            }
        }
    }, [
        approve, reject, pending, remark, detailAnalis, MOPatchData, reset, datacollFlag, editEnable,
        queryClient, datacolectremark, crfdept, id, req_slno, selectFile, handleImageUpload
    ]);

    const closeModal = useCallback(() => {
        reset()
    }, [reset,])

    useEffect(() => {
        isMounted.current = true;
        const getImage = async (req_slno) => {
            const result = await axioslogin.get(`/newCRFRegisterImages/crfMOImageGet/${req_slno}`)
            const { success, data } = result.data
            if (success === 1) {
                const fileNames = data;
                const fileUrls = fileNames.map((fileName) => {
                    return `${PUBLIC_NAS_FOLDER}/CRF/crf_registration/${req_slno}/MOUpload/${fileName}`;
                });
                const savedFiles = fileUrls.map((val) => {
                    const parts = val.split('/');
                    const fileNamePart = parts[parts.length - 1];
                    const obj = {
                        imageName: fileNamePart,
                        url: val
                    }
                    return obj
                })
                setUploadedImages(savedFiles);
            } else {
                setUploadedImages([])
            }
        }
        getImage(req_slno)
        return () => {
            isMounted.current = false;
        };
    }, [req_slno])

    return (
        <Fragment>

            <CssVarsProvider>
                <Modal
                    aria-labelledby="modal-title"
                    aria-describedby="modal-desc"
                    open={open}
                    onClose={handleClose}
                    sx={{ display: 'flex', justifyContent: 'center' }}
                >
                    <ModalDialog
                        variant="outlined"
                    >
                        <ModalClose
                            variant="outlined"
                            sx={{
                                m: 1,
                                top: 'calc(-1/4 * var(--IconButton-size))',
                                right: 'calc(-1/4 * var(--IconButton-size))',
                                boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                                borderRadius: '50%',
                                bgcolor: 'background.body',
                                color: '#bf360c',
                                height: 25, width: 25
                            }}
                        />
                        <Box sx={{ minWidth: '80vw', minHeight: '62vh', maxHeight: '85vh', overflowY: 'auto' }}>
                            <CrfReqDetailViewCmp ApprovalData={ApprovalData} imagearray={imagearray} />
                            <Box sx={{ overflow: 'auto', pt: 0.5, mx: 0.3 }}>
                                {reqItems.length !== 0 ?
                                    <ReqItemDisplay reqItems={reqItems} /> : null
                                    // : <Box sx={{
                                    //     display: 'flex', justifyContent: 'center', fontSize: 25, opacity: 0.5, color: 'grey'
                                    // }}>
                                    //     No Item Requested
                                    // </Box>
                                }
                                <Box sx={{ pt: 0.5, mx: 0.3 }}>
                                    {incharge_req === 1 && incharge_remarks !== 'Not Updated' ?
                                        <CommonInchargeReqCmp DetailViewData={ApprovalData} />
                                        :
                                        <Paper variant="outlined" sx={{ flexWrap: 'wrap' }}>
                                            <Box sx={{ borderBottom: '1px solid lightgrey' }}>
                                                <Typography sx={{ fontWeight: 'bold', p: 1, color: '#145DA0', fontSize: 14 }}>
                                                    Department Approval
                                                </Typography>
                                            </Box>
                                            <Typography sx={{ fontSize: 14, fontWeight: 550, p: 1 }}>Incharge Approval Not Required</Typography>
                                        </Paper>
                                    }
                                    {hod_req === 1 && hod_approve !== null ?
                                        <Box sx={{ pt: 0.5 }}>
                                            <CommonHodApprvCmp DetailViewData={ApprovalData} />
                                        </Box>
                                        : null}
                                    {dms_req === 1 && dms_approve !== null ?
                                        <Box sx={{ pt: 0.5 }}>
                                            <CommonDmsApprvCmp DetailViewData={ApprovalData} />
                                        </Box>
                                        : null}
                                    {ms_approve_req === 1 && ms_approve !== null ?
                                        <Box sx={{ pt: 0.5 }}>
                                            <CommonMsApprvCmp DetailViewData={ApprovalData} />
                                        </Box>
                                        : null}
                                </Box>
                                <Box sx={{ py: 0.5, mx: 0.2 }}>
                                    {datacolflag === 1 ?
                                        <ViewOreviousDataCollctnDetails datacolData={datacolData} />
                                        : null
                                    }
                                </Box>
                                <Paper variant='outlined' sx={{ pb: 1, flexWrap: 'wrap', mx: 0.3 }} >
                                    <Box sx={{ mx: 1, mt: 1 }}>
                                        <CusCheckBox
                                            className={{ color: '#145DA0', fontSize: 14, fontWeight: 'bold' }}
                                            variant="outlined"
                                            color="primary"
                                            size="md"
                                            name="datacollFlag"
                                            label="Data Collection Required"
                                            value={datacollFlag}
                                            onCheked={updateOnchangeState}
                                            checked={datacollFlag}
                                        />
                                    </Box>
                                </Paper>
                                {datacollFlag === true ?
                                    <Box sx={{ border: '1px solid lightgrey', borderTop: 'none', pb: 1, mx: 0.3 }}>
                                        <Box sx={{ display: 'flex', pt: 1, }}>
                                            <Typography sx={{ fontSize: 14, fontWeight: 600, flex: 0.7, pl: 1, pt: 0.5 }}>Departments for Data Collection</Typography>
                                            <Typography sx={{ pt: 0.5 }}>  :&nbsp;</Typography>
                                            <Box sx={{ px: 1, pt: 0.2, flex: 1.5 }}>
                                                <DataCollectDepSecSelect SetDeptSec={setCrfDept} />
                                            </Box>
                                        </Box>
                                        <Box sx={{ display: 'flex', pt: 0.4 }}>
                                            <Typography sx={{ fontSize: 14, fontWeight: 600, flex: 0.7, pl: 1, pt: 1 }}>Remarks</Typography>
                                            <Typography sx={{ pt: 1 }}>  :&nbsp;</Typography>
                                            <Box sx={{ px: 1, pt: 0.2, flex: 1.5 }}>
                                                <Textarea
                                                    required
                                                    type="text"
                                                    size="sm"
                                                    minRows={2}
                                                    maxRows={4}
                                                    style={{ width: "90%", }}
                                                    placeholder="Remarks"
                                                    name='datacolectremark'
                                                    value={datacolectremark}
                                                    onChange={updateOnchangeState}
                                                />
                                            </Box>
                                        </Box>
                                    </Box>
                                    :
                                    <Box sx={{ mt: 0.5, pb: 1, flexWrap: 'wrap', mx: 0.3 }} >
                                        {approveTableData.length !== 0 ?
                                            <>
                                                <ItemsApprovalCompnt req_slno={req_slno} setMoreItem={setMoreItem} editEnable={editEnable}
                                                    setEditEnable={setEditEnable} setApproveTableData={setApproveTableData}
                                                    header='MO' apprvLevel={5} />
                                                <Box sx={{ pl: 0.5 }}>
                                                    <CustomIconButtonCmp
                                                        handleChange={AddItems}>
                                                        Add Items
                                                    </CustomIconButtonCmp>
                                                </Box>
                                                {addMoreItems === 1 ? <AddMoreItemDtails req_slno={req_slno}
                                                    setApproveTableData={setApproveTableData} setMoreItem={setMoreItem}
                                                /> : null}
                                                <ApprovalCompntAll
                                                    heading="CRF Documentation"
                                                    apprvlDetails={apprvlDetails}
                                                    updateOnchangeState={updateOnchangeState}
                                                    updateApprovalState={updateApprovalState}
                                                    imageCheck={mo_image}
                                                    selectFile={selectFile}
                                                    setSelectFile={setSelectFile}
                                                    uploadedImages={uploadedImages}
                                                />
                                            </>
                                            : null
                                            // <Box sx={{
                                            //     display: 'flex', justifyContent: 'center', fontSize: 25, opacity: 0.5,
                                            //     pt: 10, color: 'grey'
                                            // }}>
                                            //     No items Approved
                                            // </Box>
                                        }
                                    </Box>
                                }

                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Box sx={{ py: 0.5, pr: 0.5 }}>
                                <ModalButtomCmp
                                    handleChange={submit}
                                > Save</ModalButtomCmp>
                            </Box>
                            <Box sx={{ py: 0.5, pr: 2 }}>
                                <ModalButtomCmp
                                    handleChange={closeModal}
                                > Cancel</ModalButtomCmp>
                            </Box>
                        </Box>
                    </ModalDialog>
                </Modal>
            </CssVarsProvider>
        </Fragment >
    )
}

export default memo(CrfMOApprovalModal)