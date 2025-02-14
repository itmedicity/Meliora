import { Box, CssVarsProvider, Modal, ModalClose, ModalDialog, Textarea, Typography } from '@mui/joy'
import React, { Fragment, memo, useCallback, useEffect, useMemo, useRef } from 'react'
import CrfReqDetailViewCmp from '../ComonComponent/CrfReqDetailViewCmp'
import ReqItemDisplay from '../ComonComponent/ReqItemDisplay'
import CommonInchargeReqCmp from '../ComonComponent/ApprovalComp/CommonInchargeReqCmp'
import { Paper } from '@mui/material'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import CustomIconButtonCmp from '../ComonComponent/Components/CustomIconButtonCmp'
import KMCItemApprovalComponent from '../ComonComponent/ComponentsKMC/KMCItemApprovalComponent'
import AddMoreItemsKMC from '../ComonComponent/ComponentsKMC/AddMoreItemsKMC'
import ApprovalCompntAll from '../ComonComponent/ApprovalCompntAll'
import ModalButtomCmp from '../ComonComponent/Components/ModalButtomCmp'
import { useQueryClient } from 'react-query'
import { format } from 'date-fns'
import { axioskmc } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import { PUBLIC_NAS_FOLDER_KMC } from 'src/views/Constant/Static'
import { useSelector } from 'react-redux'
import _ from 'underscore'
import { useState } from 'react'
import imageCompression from 'browser-image-compression';
import DataCollectDepSecSelect from '../ComonComponent/DataCollectionComp/DataCollectDepSecSelect'
import DataCollectionViewHigherLevel from '../ComonComponent/DataCollectionComp/DataCollectionViewHigherLevel'
import MDApproveViewHigher from '../ComonComponent/HigherLevelComponents/MDApproveViewHigher'
import GMApproveViewForHigher from '../ComonComponent/HigherLevelComponents/GMApproveViewForHigher'
import SMOApproveViewForHigher from '../ComonComponent/HigherLevelComponents/SMOApproveViewForHigher'
import MOApproveViewForHigher from '../ComonComponent/HigherLevelComponents/MOApproveViewForHigher'
import MSApproveViewForHigher from '../ComonComponent/HigherLevelComponents/MSApproveViewForHigher'
import DMSApproveViewForHigher from '../ComonComponent/HigherLevelComponents/DMSApproveViewForHigher'
import HODApproveViewHigher from '../ComonComponent/HigherLevelComponents/HODApproveViewHigher'

const ManagingDirectorModal = ({ open, ApprovalData, reqItems, handleClose, setApproveTableData, approveTableData,
    datacolflag, datacolData, imagearray, selectedCompany }) => {
    const { req_slno, incharge_req, incharge_remarks, hod_req, hod_approve, dms_req, dms_approve, ms_approve,
        ms_approve_req, manag_operation_approv, senior_manage_approv, gm_approve, md_approve,
        managing_director_approve, managing_director_remarks, managing_director_analysis, managing_director_image
    } = ApprovalData
    const queryClient = useQueryClient()
    const id = useSelector((state) => state.LoginUserData.empid, _.isEqual)

    const [crfdept, setCrfDept] = useState(0)
    const [editEnable, setEditEnable] = useState(0)
    const [addMoreItems, setMoreItem] = useState(0)
    const [selectFile, setSelectFile] = useState([])
    const [uploadedImages, setUploadedImages] = useState([])

    const [apprvlDetails, setApprvlDetails] = useState({
        approve: managing_director_approve === 1 ? true : false,
        reject: managing_director_approve === 2 ? true : false,
        pending: managing_director_approve === 3 ? true : false,
        internallyArr: managing_director_approve === 4 ? true : false,
        remark: managing_director_remarks !== null ? managing_director_remarks : '',
        detailAnalis: managing_director_analysis !== null ? managing_director_analysis : '',
        datacollFlag: false,
        datacolectremark: ''
    });
    const { remark, detailAnalis, approve, reject, pending, datacollFlag, datacolectremark, internallyArr } = apprvlDetails
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
            internallyArr: type === 'internallyArr'
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
                internallyArr: false,
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

    // managing_director_req, managing_director_approve, managing_director_remarks, managing_director_analysis,
    // managing_director_approve_date, managing_director_user, managing_director_image

    const managPatchData = useMemo(() => {
        return {
            managing_director_approve: approve === true ? 1 : reject === true ? 2 : pending === true ? 3 : internallyArr === true ? 4 : null,
            managing_director_user: id,
            req_slno: req_slno,
            managing_director_approve_date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
            managing_director_remarks: remark,
            managing_director_analysis: detailAnalis,
            items: approveTableData?.map((val) => {
                return {
                    req_detl_slno: val.req_detl_slno,
                    item_status_approved: val.item_status_approved,
                }
            })
        }
    }, [approve, reject, pending, id, remark, detailAnalis, req_slno, approveTableData, internallyArr])
    const submit = useCallback(() => {
        if (editEnable === 1) {
            infoNotify("Ensure all other details are entered/completed before submitting");
        } else {
            // const updateManagApproval = async (managPatchData) => {
            //     const result = await axioslogin.patch('/CRFRegisterApproval/Manag', managPatchData);
            //     return result.data;
            // };
            const updateManagApprovalKMC = async (managPatchData) => {
                const result = await axioskmc.patch('/CRFRegisterApproval/Manag', managPatchData);
                return result.data;
            };

            // const DataCollRequestFnctn = async (postData) => {
            //     try {
            //         const result = await axioslogin.post('/CRFRegisterApproval/dataCollect/Insert', postData);
            //         const { success, message } = result.data;
            //         if (success === 1) {
            //             succesNotify(message);
            //             queryClient.invalidateQueries('getPendingAll');
            //             reset();
            //         } else {
            //             warningNotify(message);
            //         }
            //     } catch (error) {
            //         warningNotify('An error occurred during data collection insertion.');
            //     }
            // };

            const DataCollRequestKMC = async (postData) => {
                try {
                    const result = await axioskmc.post('/CRFRegisterApproval/dataCollect/Insert', postData);
                    const { success, message } = result.data;
                    if (success === 1) {
                        succesNotify(message);
                        queryClient.invalidateQueries('getAllKmcPending');
                        reset();
                    } else {
                        warningNotify(message);
                    }
                } catch (error) {
                    warningNotify('An error occurred during data collection insertion.');
                }
            };

            // const FileInsert = async (req_slno, selectFile) => {
            //     try {
            //         const formData = new FormData();
            //         formData.append('reqslno', req_slno);
            //         for (const file of selectFile) {
            //             if (file.type.startsWith('image')) {
            //                 const compressedFile = await handleImageUpload(file);
            //                 formData.append('files', compressedFile, compressedFile.name);
            //             } else {
            //                 formData.append('files', file, file.name);
            //             }
            //         }
            //         const result = await axioslogin.post('/newCRFRegisterImages/crf/ImageInsertED', formData, {
            //             headers: {
            //                 'Content-Type': 'multipart/form-data',
            //             },
            //         });
            //         return result.data;
            //     } catch (error) {
            //         warningNotify('An error occurred during file upload.');
            //     }
            // };
            const FileInsertKMC = async (req_slno, selectFile) => {
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
                    const result = await axioskmc.post('/newCRFRegisterImages/crf/ImageInsertManage', formData, {
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
                    reqest_one: 11,
                    req_user: id,
                }));
                if (selectedCompany === '1') {
                    // DataCollRequestFnctn(postData);
                } else if (selectedCompany === '2') {
                    DataCollRequestKMC(postData);
                }
                return;
            }
            if (!approve && !reject && !pending && !internallyArr) {
                warningNotify("Select any status");
                return;
            }
            const handleApproval = async (updateFunction, fileInsertFunction, queryKey) => {
                const result = await updateFunction(managPatchData);
                const { success, message } = result;
                if (success !== 1) {
                    warningNotify(message);
                    return;
                }
                const onSuccess = (fileUploadMessage) => {
                    const notifyMessage = approve ? "Approved Successfully" : "Status Updated";
                    succesNotify(`${notifyMessage}${fileUploadMessage ? ` and ${fileUploadMessage}` : ""}`);
                    reset();
                    queryClient.invalidateQueries(queryKey);
                };
                if (selectFile.length > 0) {
                    const fileResponse = await fileInsertFunction(req_slno, selectFile);
                    const { success: fileSuccess, message: fileMessage } = fileResponse || {};
                    if (fileSuccess === 1) {
                        onSuccess("file uploaded");
                    } else {
                        warningNotify(fileMessage);
                    }
                } else {
                    onSuccess();
                }
            };
            if ((approve && detailAnalis && remark) || ((reject || pending || internallyArr) && remark)) {
                if (selectedCompany === '1') {
                    // handleApproval(updateManagApproval, FileInsert, 'getPendingAll');
                } else if (selectedCompany === '2') {
                    handleApproval(updateManagApprovalKMC, FileInsertKMC, 'getAllKmcPending');
                }
            } else {
                warningNotify("Justification is required");
            }
        }
    }, [managPatchData, reset, datacollFlag, datacolectremark, crfdept, id, req_slno, selectFile, queryClient, internallyArr,
        handleImageUpload, approve, reject, pending, editEnable, selectedCompany, detailAnalis, remark]);

    const closeModal = useCallback(() => {
        handleClose()
    }, [handleClose,])

    useEffect(() => {
        isMounted.current = true;
        if (selectedCompany === '1') {
        }
        else if (selectedCompany === '2') {
            const getImage = async (req_slno) => {
                const result = await axioskmc.get(`/newCRFRegisterImages/crfManageImageGet/${req_slno}`)
                const { success, data } = result.data
                if (success === 1) {
                    const fileNames = data;
                    const fileUrls = fileNames.map((fileName) => {
                        return `${PUBLIC_NAS_FOLDER_KMC}/CRF/crf_registration/${req_slno}/ManageUpload/${fileName}`;
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
        }
        return () => {
            isMounted.current = false;
        };
    }, [req_slno, selectedCompany])

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
                            <CrfReqDetailViewCmp ApprovalData={ApprovalData} imagearray={imagearray} selectedCompany={selectedCompany} />
                            <Box sx={{ overflow: 'auto', pt: 0.5, mx: 0.3 }}>
                                {reqItems.length !== 0 ?
                                    <ReqItemDisplay reqItems={reqItems} /> : null
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
                                            <HODApproveViewHigher selectedCompany={selectedCompany} DetailViewData={ApprovalData} />
                                        </Box>
                                        : null}
                                    {dms_req === 1 && dms_approve !== null ?
                                        <Box sx={{ pt: 0.5 }}>
                                            <DMSApproveViewForHigher selectedCompany={selectedCompany} DetailViewData={ApprovalData} />
                                        </Box>
                                        : null}
                                    {ms_approve_req === 1 && ms_approve !== null ?
                                        <Box sx={{ pt: 0.5 }}>
                                            <MSApproveViewForHigher selectedCompany={selectedCompany} DetailViewData={ApprovalData} />
                                        </Box>
                                        : null}
                                    {manag_operation_approv !== null ?
                                        <Box sx={{ pt: 0.5 }}>
                                            <MOApproveViewForHigher selectedCompany={selectedCompany} DetailViewData={ApprovalData} />
                                        </Box>
                                        : null}
                                    {senior_manage_approv !== null ?
                                        <Box sx={{ pt: 0.5 }}>
                                            <SMOApproveViewForHigher selectedCompany={selectedCompany} DetailViewData={ApprovalData} />
                                        </Box>
                                        : null}
                                    {gm_approve !== null ?
                                        <Box sx={{ pt: 0.5 }}>
                                            <GMApproveViewForHigher selectedCompany={selectedCompany} DetailViewData={ApprovalData} />
                                        </Box>
                                        : null}
                                    {md_approve !== null ?
                                        <Box sx={{ pt: 0.5 }}>
                                            <MDApproveViewHigher selectedCompany={selectedCompany} DetailViewData={ApprovalData} />
                                        </Box>
                                        : null}
                                </Box>
                                <Box sx={{ py: 0.5, mx: 0.2 }}>
                                    {datacolflag === 1 ?
                                        <DataCollectionViewHigherLevel datacolData={datacolData} selectedCompany={selectedCompany} />
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
                                        {selectedCompany === '1' ?
                                            <>
                                            </>
                                            : selectedCompany === '2' ?
                                                <>
                                                    {approveTableData && approveTableData.length > 0 ?
                                                        <KMCItemApprovalComponent req_slno={req_slno} setMoreItem={setMoreItem} editEnable={editEnable}
                                                            setEditEnable={setEditEnable} setApproveTableData={setApproveTableData}
                                                            header='Managing Director' apprvLevel={10} />
                                                        : null}
                                                    <Box sx={{ pl: 0.5 }}>
                                                        <CustomIconButtonCmp
                                                            handleChange={AddItems}>
                                                            Add Items
                                                        </CustomIconButtonCmp>
                                                    </Box>
                                                    {addMoreItems === 1 ? <AddMoreItemsKMC req_slno={req_slno}
                                                        setApproveTableData={setApproveTableData} setMoreItem={setMoreItem}
                                                    /> : null}
                                                </>
                                                : null}
                                        <ApprovalCompntAll
                                            heading="Managing Director Approval"
                                            apprvlDetails={apprvlDetails}
                                            updateOnchangeState={updateOnchangeState}
                                            updateApprovalState={updateApprovalState}
                                            imageCheck={managing_director_image}
                                            selectFile={selectFile}
                                            setSelectFile={setSelectFile}
                                            uploadedImages={uploadedImages}
                                        />
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

export default memo(ManagingDirectorModal)