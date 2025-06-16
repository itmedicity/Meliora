import React, { Fragment, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Box, CssVarsProvider, Modal, ModalClose, ModalDialog, Textarea, Typography } from '@mui/joy'
import CrfReqDetailViewCmp from '../ComonComponent/CrfReqDetailViewCmp'
import ReqItemDisplay from '../ComonComponent/ReqItemDisplay'
import CommonInchargeReqCmp from '../ComonComponent/ApprovalComp/CommonInchargeReqCmp'
import { Paper } from '@mui/material'
import CommonHodApprvCmp from '../ComonComponent/ApprovalComp/CommonHodApprvCmp'
import ViewOreviousDataCollctnDetails from '../ComonComponent/DataCollectionComp/ViewOreviousDataCollctnDetails'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import DataCollectDepSecSelect from '../ComonComponent/DataCollectionComp/DataCollectDepSecSelect'
import ItemsApprovalCompnt from '../CrfInchargeApproval/ItemsApprovalCompnt'
import CustomIconButtonCmp from '../ComonComponent/Components/CustomIconButtonCmp'
import AddMoreItemDtails from '../ComonComponent/AddMoreItemDtails'
import ApprovalCompntAll from '../ComonComponent/ApprovalCompntAll'
import { useQueryClient } from 'react-query'
import { useSelector } from 'react-redux'
import _ from 'underscore'
import imageCompression from 'browser-image-compression';
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static';
import { format } from 'date-fns'
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import { axioslogin } from 'src/views/Axios/Axios'
import CommonDmsApprvCmp from '../ComonComponent/ApprovalComp/CommonDmsApprvCmp'
import CommonMsApprvCmp from '../ComonComponent/ApprovalComp/CommonMsApprvCmp'
import CommonMoApprvlCmp from '../ComonComponent/ApprovalComp/CommonMoApprvlCmp'
import ModalButtomCmp from '../ComonComponent/Components/ModalButtomCmp'
import CampaignTwoToneIcon from '@mui/icons-material/CampaignTwoTone';
import DataCollectDepSecSelectTmc from '../ComonComponent/DataCollectionComp/DataCollectDepSecSelectTmc'
import { getComplaintSlno } from 'src/views/Constant/Constant';

const CrfSMOApprovalModal = ({ open, ApprovalData, reqItems, handleClose, setApproveTableData, approveTableData, company,
    datacolflag, datacolData, imagearray }) => {
    const { req_slno, incharge_req, incharge_remarks, hod_req, hod_approve, dms_req, dms_approve, ms_approve, request_deptsec_slno, req_deptsec, needed, expected_date,
        ms_approve_req, manag_operation_approv, senior_manage_approv, senior_manage_remarks, actual_requirement,
        smo_detial_analysis, smo_image, company_slno
    } = ApprovalData

    const queryClient = useQueryClient()
    const id = useSelector((state) => state.LoginUserData.empid, _.isEqual)

    const [crfdept, setCrfDept] = useState(0)
    const [editEnable, setEditEnable] = useState(0)
    const [addMoreItems, setMoreItem] = useState(0)
    const [selectFile, setSelectFile] = useState([])
    const [uploadedImages, setUploadedImages] = useState([])
    const [crfdeptInternal, setCrfDeptinternal] = useState(0)
    const [complaint, setcomplaint] = useState(true)
    const [task, settask] = useState(true)
    const [crfHod, setCrfHod] = useState([])
    const [complaint_slno, setComplaint] = useState(0)
    const [count, setCount] = useState(0)

    const { department_slno } = crfdeptInternal

    useEffect(() => {
        getComplaintSlno().then((val) => {
            setComplaint(val);
            setCount(0)
        })
    }, [count])
    useEffect(() => {
        if (department_slno !== 0 || department_slno !== null) {
            const getHod = async (department_slno) => {
                const result = await axioslogin.get(`/CRFRegisterApproval/crfGetHod/${department_slno}`)
                const { success, data } = result.data
                if (success === 1) {
                    setCrfHod([data[0]?.emp_id])
                } else {
                    setCrfHod(0)
                }
            }
            getHod(department_slno)
        } else {
            setCrfHod(0)
        }
    }, [department_slno])
    const [apprvlDetails, setApprvlDetails] = useState({
        approve: senior_manage_approv === 1 ? true : false,
        reject: senior_manage_approv === 2 ? true : false,
        pending: senior_manage_approv === 3 ? true : false,
        internallyArr: senior_manage_approv === 4 ? true : false,
        remark: senior_manage_remarks !== null ? senior_manage_remarks : '',
        detailAnalis: smo_detial_analysis !== null ? smo_detial_analysis : '',
        datacollFlag: false,
        datacolectremark: '',
        datacollFlagKMC: false

    });
    const { remark, detailAnalis, approve, reject, pending, datacollFlag, datacolectremark, internallyArr, datacollFlagKMC, } = apprvlDetails
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

    const SMOPatchData = useMemo(() => {
        return {
            senior_manage_approv: approve === true ? 1 : reject === true ? 2 : pending === true ? 3 : internallyArr === true ? 4 : null,
            senior_manage_user: id,
            req_slno: req_slno,
            som_aprrov_date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
            senior_manage_remarks: remark,
            smo_detial_analysis: detailAnalis,
            items: approveTableData?.map((val) => {
                return {
                    req_detl_slno: val.req_detl_slno,
                    item_status_approved: val.item_status_approved,
                }
            })
        }
    }, [approve, reject, pending, id, remark, detailAnalis, req_slno, approveTableData, internallyArr])
    const postdata = {

        complaint_slno: complaint_slno,
        // complaint_desc: " testing :  CRF NO : " + req_slno,
        complaint_desc: "The complaint was raised by SMO with the remark \"" + remark + "\" under CRF No: " + req_slno + " regarding the items , which has to be internally arranged.",
        complaint_dept_secslno: request_deptsec_slno,
        complaint_request_slno: 1,
        complaint_deptslno: crfdeptInternal?.complaint_dept_slno,
        complaint_typeslno: crfdeptInternal?.complaint_dept_slno === 1 ? company?.itemType_dp_Bio : crfdeptInternal?.complaint_dept_slno === 2 ? company?.itemType_dp_Main : crfdeptInternal?.complaint_dept_slno === 3 ? company?.itemType_dp_IT :
            crfdeptInternal?.complaint_dept_slno === 4 ? company?.itemType_dp_Hou : crfdeptInternal?.complaint_dept_slno === 5 ? company?.itemType_dp_Ope : 0,
        priority_check: 0,
        complaint_hicslno: 0,
        compalint_status: 0,
        cm_location: request_deptsec_slno,
        create_user: id,
        priority_reason: null,
        locationName: req_deptsec,
        priority: "Normal Ticket",
        rm_room_slno: null,
        cm_asset_status: 0,
        cm_complaint_location: req_deptsec
    }

    const insertMastTask = {
        tm_task_name: actual_requirement + " :  CRF NO : " + req_slno,
        tm_task_dept: department_slno,
        tm_task_dept_sec: department_slno,
        tm_task_due_date: expected_date === '' ? null : expected_date,
        // tm_task_description: needed + ":  Description :" + item_desc + ": Brand :" + item_brand,
        tm_task_description: "The task is to arrange for \"" + needed + "\"concerning the items metioned in CRF No :" + req_slno + " By SMO",
        tm_project_slno: null,
        tm_pending_remark: null,
        tm_onhold_remarks: null,
        tm_completed_remarks: null,
        tm_task_status: 0,
        tm_complete_date: null,
        create_user: id,
        main_task_slno: null,
    }
    const submit = useCallback(() => {
        if (editEnable === 1) {
            infoNotify("Ensure all other details are entered/completed before submitting");
        }
        else {
            const updateSMOApproval = async (SMOPatchData) => {
                const result = await axioslogin.patch('/CRFRegisterApproval/Smo', SMOPatchData);
                return result.data;
            };
            const InsertMastTask = async (insertMastTask) => {
                const result = await axioslogin.post('/taskManagement/insertTask', insertMastTask)
                return result.data
            }
            const InsertDetailTask = async (insertTaskDetail) => {
                const result = await axioslogin.post('/taskManagement/insertDetail', insertTaskDetail)
                return result.data
            }
            const InsertComplaint = async (postdata) => {
                const result = await axioslogin.post('/complaintreg', postdata)
                return result.data
            }
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
            const DataCollRequestFnctntmc = async (postData) => {
                try {
                    const result = await axioslogin.post(`/CRFRegisterApproval/dataCollect/Insert/tmc`, postData);
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
                    const result = await axioslogin.post('/newCRFRegisterImages/crf/ImageInsertSMO', formData, {
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
                    reqest_one: 6,
                    req_user: id,
                }));
                DataCollRequestFnctn(postData);
                return;
            }
            if (datacollFlagKMC) {
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
                    reqest_one: 3,
                    req_user: id,
                    tmc_status: 1
                }));
                DataCollRequestFnctntmc(postData);
                return;
            }
            if (!approve && !reject && !pending && !internallyArr) {
                warningNotify("Select any status");
                return;
            }

            if ((approve && detailAnalis && remark) || ((reject || pending || internallyArr) && remark)) {
                updateSMOApproval(SMOPatchData).then((val) => {
                    const { success, message } = val;
                    if (success !== 1) {
                        warningNotify(message);
                        return;
                    }
                    const onSuccess = (fileUploadMessage) => {
                        InsertComplaint(postdata).then((value) => {
                            const { message, success } = value
                            if (success === 1) {
                                succesNotify("Complaint Registered Successfully")

                                // task and complaint
                                InsertMastTask(insertMastTask).then((value) => {
                                    const { message, success, insertId } = value
                                    if (success === 1) {
                                        // setInsertId(insertId)
                                        //check employee assigned
                                        if (crfHod.length !== 0) {
                                            const insertTaskDetail = crfHod && crfHod?.map((val) => {
                                                return {
                                                    tm_task_slno: insertId,
                                                    tm_assigne_emp: val,
                                                    tm_detail_status: 1,
                                                    tm_detl_create: id
                                                }
                                            })
                                            InsertDetailTask(insertTaskDetail).then((value) => {
                                                const { message, success } = value
                                                if (success === 1) {
                                                    succesNotify("Task Created Successfully")
                                                    // setTableCount(tableCount + 1)
                                                    // handleClose()
                                                }
                                                else {
                                                    warningNotify(message)
                                                }
                                            })
                                        }
                                    }
                                    else {
                                        warningNotify(message)
                                    }
                                })
                            }
                            else {
                                warningNotify(message)
                            }
                        })
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
        approve, reject, pending, remark, detailAnalis, SMOPatchData, reset, datacollFlag, editEnable, internallyArr,
        queryClient, datacolectremark, crfdept, id, req_slno, selectFile, handleImageUpload, datacollFlagKMC
    ]);

    const closeModal = useCallback(() => {
        reset()
    }, [reset])

    useEffect(() => {
        isMounted.current = true;
        const getImage = async (req_slno) => {
            const result = await axioslogin.get(`/newCRFRegisterImages/crfSMOImageGet/${req_slno}`)
            const { success, data } = result.data
            if (success === 1) {
                const fileNames = data;
                const fileUrls = fileNames.map((fileName) => {
                    return `${PUBLIC_NAS_FOLDER}/CRF/crf_registration/${req_slno}/SMOUpload/${fileName}`;
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
                                            <CommonHodApprvCmp DetailViewData={ApprovalData} company={company} />
                                        </Box>
                                        : null}
                                    {dms_req === 1 && dms_approve !== null ?
                                        <Box sx={{ pt: 0.5 }}>
                                            <CommonDmsApprvCmp DetailViewData={ApprovalData} company={company} />
                                        </Box>
                                        : null}
                                    {ms_approve_req === 1 && ms_approve !== null ?
                                        <Box sx={{ pt: 0.5 }}>
                                            <CommonMsApprvCmp DetailViewData={ApprovalData} company={company} />
                                        </Box>
                                        : null}
                                    {manag_operation_approv !== null ?
                                        <Box sx={{ pt: 0.5 }}>
                                            <CommonMoApprvlCmp DetailViewData={ApprovalData} company={company} />
                                        </Box>
                                        : null}
                                </Box>
                                {/* remark from the view department  */}
                                {ApprovalData?.crf_view_status === 1 ?
                                    <Box sx={{ p: .4 }}>
                                        <Box sx={{ border: '1px solid lightgrey', mt: 1, }}>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <Box sx={{

                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    alignItems: 'center'
                                                }}>
                                                    <CampaignTwoToneIcon sx={{
                                                        width: 30, height: 30,
                                                        animation: 'blink 2s infinite', // Apply the blink animation
                                                        '@keyframes blink': {
                                                            '0%': {
                                                                opacity: 1,
                                                            },
                                                            '50%': {
                                                                opacity: 0,
                                                            },
                                                            '100%': {
                                                                opacity: 1,
                                                            },

                                                        },
                                                    }} />
                                                    <Typography sx={{
                                                        fontFamily: 'var(--font-varient)',
                                                        color: 'rgba(var(--font-primary-white))',
                                                        fontWeight: 700,
                                                    }}>

                                                    </Typography>
                                                    <Typography sx={{ fontWeight: 'bold', color: '#FF6868', fontSize: 14, p: 1, textTransform: 'capitalize' }}>
                                                        Comments From {ApprovalData?.viewDep?.toLowerCase()}
                                                    </Typography>
                                                </Box>

                                                <Typography sx={{ fontWeight: 'bold', color: '#145DA0', fontSize: 14, p: 1, textTransform: 'capitalize' }}>
                                                    By:{ApprovalData?.viewName?.toLowerCase()}
                                                </Typography>
                                            </Box>
                                            <Box sx={{ p: 1 }}>
                                                <Box sx={{ border: '1px solid lightgrey', height: 50 }}>
                                                    <Typography sx={{ fontSize: 14, fontWeight: 550, p: 1 }}>
                                                        {ApprovalData?.crf_view_remark}
                                                    </Typography>
                                                </Box>
                                            </Box>


                                        </Box>
                                    </Box>
                                    : null
                                }
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
                                            disabled={datacollFlagKMC === true}

                                        />
                                    </Box>
                                </Paper>

                                {
                                    company_slno === 2 ?
                                        <Paper variant='outlined' sx={{ pb: 1, flexWrap: 'wrap', mx: 0.3 }} >
                                            <Box sx={{ mx: 1, mt: 1 }}>
                                                <CusCheckBox
                                                    className={{ color: '#145DA0', fontSize: 14, fontWeight: 'bold' }}
                                                    variant="outlined"
                                                    color="primary"
                                                    size="md"
                                                    name="datacollFlagKMC"
                                                    label="TMC Data Collection Required"
                                                    value={datacollFlagKMC}
                                                    onCheked={updateOnchangeState}
                                                    checked={datacollFlagKMC}
                                                    disabled={datacollFlag === true}
                                                />
                                            </Box>
                                        </Paper>
                                        : null
                                }
                                {datacollFlagKMC === true ? <Box sx={{ border: '1px solid lightgrey', borderTop: 'none', pb: 1, mx: 0.3 }}>
                                    <Box sx={{ display: 'flex', pt: 1, }}>
                                        <Typography sx={{ fontSize: 14, fontWeight: 600, flex: 0.7, pl: 1, pt: 0.5 }}>Departments for Data Collection</Typography>
                                        <Typography sx={{ pt: 0.5 }}>  :&nbsp;</Typography>
                                        <Box sx={{ px: 1, pt: 0.2, flex: 1.5 }}>
                                            <DataCollectDepSecSelectTmc SetDeptSec={setCrfDept} />
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
                                </Box> : null}
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
                                    : null}
                                {datacollFlag === false && datacollFlagKMC === false ?
                                    <Box sx={{ mt: 0.5, pb: 1, flexWrap: 'wrap', }} >
                                        {approveTableData.length !== 0 ?
                                            <ItemsApprovalCompnt req_slno={req_slno} setMoreItem={setMoreItem} editEnable={editEnable}
                                                setEditEnable={setEditEnable} setApproveTableData={setApproveTableData} ApprovalData={ApprovalData}
                                                header='SMO' apprvLevel={6} />
                                            : null
                                        }
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
                                            heading={`${company?.smo_status_name} Approval`}
                                            apprvlDetails={apprvlDetails}
                                            updateOnchangeState={updateOnchangeState}
                                            updateApprovalState={updateApprovalState}
                                            imageCheck={smo_image}
                                            selectFile={selectFile}
                                            setSelectFile={setSelectFile}
                                            uploadedImages={uploadedImages}
                                            task={task}
                                            settask={settask}
                                            crfdeptInternal={crfdeptInternal}
                                            setCrfDeptinternal={setCrfDeptinternal}
                                            complaint={complaint}
                                            setcomplaint={setcomplaint}
                                        />
                                    </Box> : null
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

export default memo(CrfSMOApprovalModal)