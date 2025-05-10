import { Box, Checkbox, CssVarsProvider, Modal, ModalClose, ModalDialog, Textarea, Tooltip, Typography } from '@mui/joy'
import React, { Fragment, memo, useCallback, useMemo, useState } from 'react'
import { Paper } from '@mui/material'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import _ from 'underscore'
import { useSelector } from 'react-redux'
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import { axiosellider, axioslogin } from 'src/views/Axios/Axios'
import { useQueryClient } from 'react-query'
import { addDays, format } from 'date-fns'
import DataCollectDepSecSelect from '../ComonComponent/DataCollectionComp/DataCollectDepSecSelect'
import CustomPaperTitle from 'src/views/Components/CustomPaperTitle'
import CrfStoreSelect from 'src/views/CommonSelectCode/CrfStoreSelect'
import CustomInputDateCmp from '../ComonComponent/Components/CustomInputDateCmp'
import PurchaseStoreSlect from './Component/PurchaseStoreSlect'
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import ClearIcon from '@mui/icons-material/Clear';
import ModalButtomCmp from '../ComonComponent/Components/ModalButtomCmp'
import moment from 'moment'
import PoItemDetailsTable from './Component/PoItemDetailsTable'
import PoAcknowComp from '../ComonComponent/PurchaseComp/PoAcknowComp'
import QuotationCallComp from '../ComonComponent/PurchaseComp/QuotationCallComp'
import QuotationNegoComp from '../ComonComponent/PurchaseComp/QuotationNegoComp'
import QuotationFinalComp from '../ComonComponent/PurchaseComp/QuotationFinalComp'
import PurchaseWoImg from './Component/PurchaseWoImg'
import imageCompression from 'browser-image-compression';
import DataCollectDepSecSelectTmc from '../ComonComponent/DataCollectionComp/DataCollectDepSecSelectTmc'
import CommonInchargeReqCmp from '../ComonComponent/ApprovalComp/CommonInchargeReqCmp'
import CommonHodApprvCmp from '../ComonComponent/ApprovalComp/CommonHodApprvCmp'
import CommonDmsApprvCmp from '../ComonComponent/ApprovalComp/CommonDmsApprvCmp'
import CommonMsApprvCmp from '../ComonComponent/ApprovalComp/CommonMsApprvCmp'
import CommonMoApprvlCmp from '../ComonComponent/ApprovalComp/CommonMoApprvlCmp'
import CommonSmoApprvCmp from '../ComonComponent/ApprovalComp/CommonSmoApprvCmp'
import CommonGmapprvCmp from '../ComonComponent/ApprovalComp/CommonGmapprvCmp'
import CommonMangingApprvComp from '../ComonComponent/ApprovalComp/CommonMangingApprvComp'

const PoAddModalView = React.lazy(() => import("./Component/PoAddModalView"))
const CrfReqDetailViewCmp = React.lazy(() => import("../ComonComponent/CrfReqDetailViewCmp"))
const ReqItemDisplay = React.lazy(() => import("../ComonComponent/ReqItemDisplay"))
const ApprovedItemListDis = React.lazy(() => import("../ComonComponent/ApprovedItemListDis"))
const CommonMdApprvCmp = React.lazy(() => import("../ComonComponent/ApprovalComp/CommonMdApprvCmp"))
const CommonEdapprvCmp = React.lazy(() => import("../ComonComponent/ApprovalComp/CommonEdapprvCmp"))
const ViewOreviousDataCollctnDetails = React.lazy(() => import("../ComonComponent/DataCollectionComp/ViewOreviousDataCollctnDetails"))
const CrfReqDetailCmpnt = React.lazy(() => import("../CRFRequestMaster/Components/CrfReqDetailCmpnt"))

const PurchaseModal = ({ approveTableData, poDetails, reqItems, open, poModalClose, puchaseData, company,
    datacolflag, datacolData, imagearray, newlyApprvdItems }) => {

    const { req_slno, md_approve, ed_approve, ack_status, quatation_calling_status, quatation_negotiation,
        quatation_fixing, po_prepartion, po_complete, crm_purchase_slno, incharge_approve, incharge_remarks, hod_req, hod_approve,
        dms_req, dms_approve, ms_approve_req, ms_approve, manag_operation_req, manag_operation_approv,
        senior_manage_req, senior_manage_approv, gm_approve_req, gm_approve, managing_director_req, managing_director_approve } = puchaseData
    const { company_slno } = company
    const id = useSelector((state) => state.LoginUserData.empid, _.isEqual)
    const queryClient = useQueryClient()
    const [purchaseState, setPurchaseState] = useState({
        datacollFlag: false,
        datacolectremark: '',
        poadding: false,
        poComplete: false,
        acknowledgemnet: false,
        ackRemark: '',
        quotationCall: false,
        quotationCallRemark: '',
        quotationNego: false,
        quotationNegoRemark: '',
        quotationFix: false,
        quotationFixRemark: '',
        pomodalflag: 0,
        pomodalopen: false,
        poDetlDis: 0,
        po_number: '',
        po_date: '',
        work_orderNo: '',
        order_date: "",
        order_remark: "",
        datacollFlagKMC: false,
    })
    const { datacollFlag, datacolectremark, poadding, poComplete, acknowledgemnet, ackRemark, quotationCall, poDetlDis,
        quotationCallRemark, quotationNego, quotationNegoRemark, quotationFix, quotationFixRemark, pomodalflag, pomodalopen,
        po_number, po_date, work_orderNo, order_date, order_remark, datacollFlagKMC
    } = purchaseState

    const [selectFile, setSelectFile] = useState([])
    const [crfdept, serCrfDept] = useState([])
    const [substoreSlno, setsubStoreSlno] = useState(0)
    const [substoreName, setsubStoreName] = useState('')
    const [storeSlno, setStoreSlno] = useState(0)
    const [WorkOrder, setWorkOrder] = useState(false)
    const [storeCode, setStoreCode] = useState('')
    const [storeName, setStoreName] = useState('')
    const [podetailData, setpodetailData] = useState([])
    const [poAddModalData, setPoAddModalData] = useState([])
    const [modalItems, setModalItems] = useState([])
    const checkNewPo = useCallback((e) => {
        const isChecked = e.target.checked;
        setPurchaseState((prev) => ({
            ...prev,
            poadding: isChecked,
            ...(isChecked
                ? {}
                : {
                    po_number: '',
                    po_date: '',
                    poDetlDis: 0,
                }),
        }));

        if (!isChecked) {
            setpodetailData([]);
            setStoreSlno(0);
            setStoreName('');
            setStoreCode('');
            setsubStoreSlno(0);
            setsubStoreName('');
        }
    }, []);

    const checkPoComplete = useCallback((e) => {
        setPurchaseState((prev) => ({
            ...prev,
            poComplete: e.target.checked,
        }));
    }, []);
    const handleCheckboxChange = useCallback((field) => (e) => {
        setPurchaseState((prev) => ({
            ...prev,
            [field]: e.target.checked,
        }));
    }, []);
    const updateDataCollFlag = useCallback((e) => {
        setPurchaseState((prev) => ({
            ...prev,
            datacollFlag: e.target.checked,
            quotationCall: false,
            quotationNego: false,
            quotationFix: false,
            datacollFlagKMC: false,
        }));
    }, []);
    const updatePoDetails = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setPurchaseState({ ...purchaseState, [e.target.name]: value })
    }, [purchaseState])
    const clearData = useCallback(() => {
        setPurchaseState(prev => ({
            ...prev,
            po_number: '',
            po_date: '',
        }))
        setStoreSlno(0)
        setStoreName('')
        setStoreCode('')
        setsubStoreSlno(0)
        setsubStoreName('')
    }, [])
    const AddItem = useCallback(() => {
        if (po_number !== '' && po_date !== '' && storeSlno !== 0 && substoreSlno !== 0) {
            const capitalizeWords = (str) => str ? str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : '';
            let pattern = /^[0-9]{6}$/;
            if (pattern.test(po_number) === true) {
                const posearch = {
                    ponumber: po_number,
                    from: format(new Date(po_date), 'dd/MM/yyyy 00:00:00'),
                    to: format(new Date(po_date), 'dd/MM/yyyy 23:59:59'),
                    stcode: storeCode
                }
                const getPOdetails = async (posearch) => {
                    const result = await axiosellider.post('/crfpurchase/getpo', posearch);
                    return result.data
                }
                getPOdetails(posearch).then((val) => {
                    const { success, data, message } = val
                    if (success === 2) {
                        const { POD_DATE, SU_CODE, SUC_NAME, POC_DELIVERY, PON_AMOUNT, POD_EDD, POC_TYPE, PO_EXPIRY, APPROVAL } = data[0]
                        const xx = data?.map((val, index) => {
                            const obj = {
                                slno: index + 1,
                                po_number: po_number,
                                item_code: val.IT_CODE,
                                item_name: val.ITC_DESC,
                                item_qty: val.PDN_QTY,
                                item_rate: (val.PDN_RATE).toFixed(2),
                                item_mrp: (val.PDN_ORIGINALMRP).toFixed(2),
                                tax: val.TXC_DESC,
                                tax_amount: (val.PDN_TAXAMT).toFixed(2),
                                net_amount: (val.TOTAL).toFixed(2),
                                grn_qnty: val.PDN_SUPQTY !== null ? val.PDN_SUPQTY : 0
                            }
                            return obj
                        })
                        setModalItems(xx)
                        const podDatas = {
                            crm_purchase_slno: crm_purchase_slno,
                            req_slno: req_slno,
                            po_number: po_number,
                            supplier_code: SU_CODE,
                            po_date: POD_DATE,
                            supplier_name: capitalizeWords(SUC_NAME),
                            po_status: 1,
                            supply_store: storeSlno,
                            storeName: capitalizeWords(storeName),
                            expected_delivery: POD_EDD !== null ? POD_EDD : null,
                            po_delivery: capitalizeWords(POC_DELIVERY),
                            po_amount: (PON_AMOUNT).toFixed(2),
                            approval_level: (typeof APPROVAL === 'number' && APPROVAL > 3) ? 3 : APPROVAL || null,
                            po_type: POC_TYPE,
                            po_expiry: PO_EXPIRY !== null ? PO_EXPIRY : format(addDays(new Date(), 30), 'yyyy-MM-dd'),
                            sub_store_slno: substoreSlno,
                            substoreName: substoreName
                            // items: xx
                        }
                        setPurchaseState(prev => ({
                            ...prev,
                            pomodalflag: 1,
                            pomodalopen: true,
                        }))
                        // setPoModalflag(1)
                        // setPoModalOpen(true)
                        setPoAddModalData(podDatas)
                    } else if (success === 1) {
                        infoNotify(message)
                    }
                })
            }
            else {
                warningNotify("Enter 6 Digit PO Number")
            }
        }
        else {
            warningNotify("Enter PO Details")
        }
    }, [po_number, po_date, req_slno, storeCode, storeSlno, storeName, substoreSlno, substoreName, crm_purchase_slno])
    const resetPOno = useCallback(() => {
        setPurchaseState(prev => ({
            ...prev,
            po_number: '',
            po_date: '',
            poDetlDis: 1
        }))
        setStoreSlno(0)
        setsubStoreSlno(0)
        setStoreName('')
        setStoreCode('')
    }, [])



    const reset = useCallback(() => {
        poModalClose()
    }, [poModalClose])
    const postAck = useMemo(() => {
        return {
            req_slno: req_slno,
            ack_status: 1,
            ack_remarks: ackRemark,
            create_user: id
        }
    }, [req_slno, ackRemark, id])

    const workorder = useMemo(() => {
        return {
            req_slno: req_slno,
            ack_status: 1,
            ack_remarks: order_remark,
            create_user: id,
            work_orderNo: work_orderNo,
            order_date: order_date
        }
    }, [req_slno, order_remark, id, work_orderNo, order_date])

    const QuatationCallPatch = useMemo(() => {
        return {
            quatation_calling_status: quotationCall === true ? 1 : 0,
            quatation_calling_user: id,
            quatation_calling_date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
            quatation_calling_remarks: quotationCallRemark,
            crm_purchase_slno: crm_purchase_slno
        }
    }, [crm_purchase_slno, id, quotationCall, quotationCallRemark])

    const QuatationNegotnPatch = useMemo(() => {
        return {
            quatation_negotiation: quotationNego === true ? 1 : 0,
            quatation_negotiation_user: id,
            quatation_negotiation_date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
            quatation_negotiation_remarks: quotationNegoRemark,
            crm_purchase_slno: crm_purchase_slno,
        }
    }, [crm_purchase_slno, id, quotationNego, quotationNegoRemark])

    const QuatationFixingPatch = useMemo(() => {
        return {
            quatation_fixing: quotationFix === true ? 1 : 0,
            quatation_fixing_user: id,
            quatation_fixing_date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
            quatation_fixing_remarks: quotationFixRemark,
            crm_purchase_slno: crm_purchase_slno,
        }
    }, [crm_purchase_slno, id, quotationFix, quotationFixRemark])

    const PoCompletePatch = useMemo(() => {
        return {
            po_complete: poComplete === true ? 1 : 0,
            po_complete_user: id,
            po_complete_date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
            crm_purchase_slno: crm_purchase_slno,
            items: newlyApprvdItems,
            poList: poDetails?.map((val) => {
                return {
                    po_detail_slno: val.po_detail_slno,
                    req_slno: val.req_slno
                }
            })

        }
    }, [crm_purchase_slno, id, poComplete, newlyApprvdItems, poDetails])

    const handleImageUpload = useCallback(async (imageFile) => {
        const options = {
            maxSizeMB: 25,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
        }
        const compressedFile = await imageCompression(imageFile, options)
        return compressedFile
    }, []);
    const submit = useCallback(async () => {
        const purchaseInsert = async (postAck) => {
            try {
                const result = await axioslogin.post('/newCRFPurchase/InsertPurchaseAck', postAck);
                const { success, message } = result.data;
                if (success === 1) {
                    succesNotify(message);
                    await Promise.all([
                        queryClient.invalidateQueries('getPurchaseAck'),
                        queryClient.invalidateQueries('getQuotationData')
                    ]);
                    reset();
                } else {
                    warningNotify(message);
                }
            } catch (error) {
                warningNotify("An error occurred while processing your request.Try again.", error);
            }
        };

        const updateQuatationCalling = async (QuatationCallPatch) => {
            try {
                const result = await axioslogin.patch('/newCRFPurchase/QuatationCalling', QuatationCallPatch);
                const { success, message } = result.data;
                if (success === 1) {
                    succesNotify(message);
                    queryClient.invalidateQueries('getQuotationData')
                    reset();
                } else {
                    warningNotify(message);
                }
            } catch (error) {
                warningNotify("An error occurred while processing your request.Try again.", error);
            }
        };
        const updateQuatationNegotiatn = async (QuatationNegotnPatch) => {
            try {
                const result = await axioslogin.patch('/newCRFPurchase/QuatationNegotiation', QuatationNegotnPatch);
                const { success, message } = result.data;
                if (success === 1) {
                    succesNotify(message);
                    queryClient.invalidateQueries('getQuotationData')
                    reset();
                } else {
                    warningNotify(message);
                }
            } catch (error) {
                warningNotify("An error occurred while processing your request. Try again.", error);
            }
        };
        const updateQuatationFixing = async (QuatationFixingPatch) => {
            try {
                const result = await axioslogin.patch('/newCRFPurchase/QuatationFixing', QuatationFixingPatch);
                const { success, message } = result.data;
                if (success === 1) {
                    succesNotify(message);
                    queryClient.invalidateQueries('getQuotationData')
                    reset();
                } else {
                    warningNotify(message);
                }
            } catch (error) {
                warningNotify("An error occurred while processing your request. Try again.", error);
            }
        };
        const DataCollRequestFnctn = async (postData) => {
            try {
                const result = await axioslogin.post(`/CRFRegisterApproval/dataCollect/Insert`, postData);
                const { success, message } = result.data;
                if (success === 1) {
                    succesNotify(message)
                    await Promise.all([
                        queryClient.invalidateQueries('getQuotationData'),
                        queryClient.invalidateQueries('purchaseDataCollection'),
                    ]);
                    reset()
                    // const keysToInvalidate = ['getQuotationData', 'purchaseDataCollection'];
                    // await Promise.all(keysToInvalidate.map(key => queryClient.invalidateQueries(key)));                
                } else {
                    warningNotify(message)
                }
            } catch (error) {
                warningNotify("An error occurred while processing your request. Try again.", error);
            }
        }
        const DataCollRequestFnctntmc = async (postData) => {
            try {
                const result = await axioslogin.post(`/CRFRegisterApproval/dataCollect/Insert/tmc`, postData);
                const { success, message } = result.data;
                if (success === 1) {
                    succesNotify(message);
                    await Promise.all([
                        queryClient.invalidateQueries('getQuotationData'),
                        queryClient.invalidateQueries('purchaseDataCollection'),
                    ]); reset();
                } else {
                    warningNotify(message);
                }
            } catch (error) {
                warningNotify('An error occurred during data collection insertion.');
            }
        };

        const postdataDetl = podetailData?.map((val) => {
            return {
                crm_purchase_slno: val.crm_purchase_slno,
                req_slno: val.req_slno,
                po_number: val.po_number,
                po_date: format(new Date(val.po_date), 'yyyy-MM-dd HH:mm:ss'),
                po_status: 1,
                supply_store: val.supply_store,
                expected_delivery: val.expected_delivery !== null ? format(new Date(val.expected_delivery), 'yyyy-MM-dd') : '',
                supplier_code: val.supplier_code,
                supplier_name: val.supplier_name,
                po_delivery: val.po_delivery,
                po_amount: val.po_amount,
                create_user: id,
                items: val.items,
                po_to_supplier: 0,
                approval_level: val.approval_level,
                po_type: val.po_type,
                po_expiry: val.po_expiry !== null ? format(new Date(val.po_expiry), 'yyyy-MM-dd') : null,
                sub_store_slno: val.sub_store_slno
            }
        })
        const InsertPODetails = async (postdataDetl) => {
            try {
                const result = await axioslogin.post('/newCRFPurchase/InsertMultiplePO', postdataDetl);
                const { success, message } = result.data;
                if (success === 1) {
                    succesNotify(message)
                    queryClient.invalidateQueries('getQuotationData')
                    reset()
                }
                else {
                    warningNotify(message)
                }
            } catch (error) {
                warningNotify("An error occurred while processing your request. Try again.", error);
            }
        }

        const updatePOComplete = async (PoCompletePatch) => {
            try {
                const result = await axioslogin.patch('/newCRFPurchase/PoComplete', PoCompletePatch);
                const { success, message } = result.data;
                if (success === 1) {
                    succesNotify(message)
                    await Promise.all([
                        queryClient.invalidateQueries('getQuotationData'),
                        queryClient.invalidateQueries('getAprrovalData'),
                    ]);
                    reset()
                }
                else {
                    warningNotify(message)
                }
            } catch (error) {
                warningNotify("An error occurred while processing your request. Try again.", error);
            }
        }
        const WorkOrderInsert = async (workorder) => {
            try {
                const result = await axioslogin.post('/newCRFPurchase/InsertWorkOrder', workorder);
                const { success, message } = result.data;
                if (success === 1) {
                    queryClient.invalidateQueries('getQuotationData')
                    succesNotify(message);
                    reset();
                } else {
                    warningNotify(message);
                }
            } catch (error) {
                warningNotify("An error occurred while processing your request.Try again.", error);
            }
        };

        const FileInsert = async (selectFile, insertid) => {
            try {
                const formData = new FormData();
                formData.append('id', insertid);
                for (const file of selectFile) {
                    if (file.type.startsWith('image')) {
                        const compressedFile = await handleImageUpload(file);
                        formData.append('files', compressedFile, compressedFile.name);
                    } else {
                        formData.append('files', file, file.name);
                    }
                }
                const result = await axioslogin.post('/newCRFRegisterImages/InsertRegisterImage', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                return result.data
            } catch (error) {
                // console.log(error, "while file uploading");
                // setLoading(false)
                warningNotify('An error occurred during file upload.', error);
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
                            reqest_one: 10,
                            req_user: id
                        }
                    })
                    DataCollRequestFnctn(postData)
                } else {
                    warningNotify("Enter The Remarks")
                }
            } else {
                warningNotify("Select any department")
            }
        }
        else if (acknowledgemnet === true) {
            if (ackRemark === null || ackRemark === undefined || ackRemark === '') {
                warningNotify("Enter Remarks")
            } else {
                purchaseInsert(postAck)
            }
        } else if (ack_status === 1) {
            if (quatation_calling_status !== 1 && quotationCall === true) {
                updateQuatationCalling(QuatationCallPatch)
            } else if (quatation_negotiation !== 1 && quotationNego === true) {
                updateQuatationNegotiatn(QuatationNegotnPatch)
            }
            else if (quatation_fixing !== 1 && quotationFix === true) {
                updateQuatationFixing(QuatationFixingPatch)
            }
            else if (poadding === true) {
                if (podetailData.length !== 0) {
                    InsertPODetails(postdataDetl)
                }
            }
            else if (poComplete === true) {
                updatePOComplete(PoCompletePatch)
            }
            else if (WorkOrder === true) {
                if (selectFile.length > 0) {
                    WorkOrderInsert(workorder)
                    // FileInsert(selectFile, req_slno)
                    const fileInsertResponse = await FileInsert(selectFile, req_slno);
                    if (fileInsertResponse.success !== 1) {
                        warningNotify("Error occurred while uploading files.");

                    }
                } else {
                    warningNotify("Please Attach File");

                }

            } else if (datacollFlagKMC === true) {

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
        }
    }, [queryClient, acknowledgemnet, ack_status, ackRemark, postAck, QuatationCallPatch, quatation_calling_status, selectFile,
        quotationCall, quatation_negotiation, quotationNego, quatation_fixing, quotationFix, poadding, QuatationNegotnPatch, workorder,
        poComplete, QuatationFixingPatch, datacollFlag, crfdept, id, datacolectremark, req_slno, podetailData, PoCompletePatch, WorkOrder, datacollFlagKMC,
        reset])

    const closeModal = useCallback(() => {
        poModalClose()
    }, [poModalClose])

    const poModalhandleClose = useCallback(() => {
        setPurchaseState(prev => ({
            ...prev,
            pomodalflag: 0,
            pomodalopen: true,
        }))
    }, [])
    return (
        <Fragment>
            {pomodalflag === 1 ? <PoAddModalView poAddModalData={poAddModalData} pomodalopen={pomodalopen}
                poModalhandleClose={poModalhandleClose} podetailData={podetailData} setpodetailData={setpodetailData}
                modalItems={modalItems} setModalItems={setModalItems} resetPOno={resetPOno} />
                : null}

            <CssVarsProvider>
                <Modal
                    aria-labelledby="modal-title"
                    aria-describedby="modal-desc"
                    open={open}
                    onClose={closeModal}
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
                        <Box sx={{ minWidth: '80vw', minHeight: '62vh', maxHeight: '85vh', overflowY: 'auto', }}>
                            <CrfReqDetailViewCmp ApprovalData={puchaseData} imagearray={imagearray} />
                            <Box sx={{ overflow: 'auto', pt: 0.1, mx: 0.3 }}>
                                {reqItems.length !== 0 ?
                                    <ReqItemDisplay reqItems={reqItems} /> : null
                                    // : <Box sx={{
                                    //     display: 'flex', justifyContent: 'center', fontSize: 25, opacity: 0.5, color: 'grey'
                                    // }}>
                                    //     No Item Requested
                                    // </Box>
                                }
                                {approveTableData.length !== 0 ?
                                    <Box sx={{ mt: 0.3, }}>
                                        <ApprovedItemListDis approveTableData={approveTableData} />
                                    </Box> : null
                                    // : <Box sx={{
                                    //     display: 'flex', justifyContent: 'center', fontSize: 25, opacity: 0.5,
                                    //     pt: 10, color: 'grey'
                                    // }}>
                                    //     No items Approved
                                    // </Box>
                                }

                                {newlyApprvdItems.length !== 0 ?
                                    <Box sx={{ mt: 0.3, }}>
                                        <PoItemDetailsTable newlyApprvdItems={newlyApprvdItems} />
                                    </Box> : null
                                    // : <Box sx={{
                                    //     display: 'flex', justifyContent: 'center', fontSize: 25, opacity: 0.5,
                                    //     pt: 10, color: 'grey'
                                    // }}>
                                    //     No items Approved
                                    // </Box>
                                }
                                <Box sx={{ px: 0.4 }}>
                                    <Box sx={{ flex: 1, }}>
                                        {incharge_approve === 1 && incharge_remarks !== null ?
                                            <Box sx={{ pt: 0.5, }}>
                                                <CommonInchargeReqCmp DetailViewData={puchaseData} company={company} />
                                            </Box>
                                            : null
                                        }
                                    </Box>
                                    <Box sx={{ flex: 1, }}>
                                        {hod_req === 1 && hod_approve !== null ?
                                            <Box sx={{ pt: 0.5, }}>
                                                <CommonHodApprvCmp DetailViewData={puchaseData} company={company} />
                                            </Box>
                                            : null
                                        }
                                    </Box>
                                    <Box sx={{ flex: 1, }}>
                                        {dms_req === 1 && dms_approve !== null ?
                                            <Box sx={{ pt: 0.5, }}>
                                                <CommonDmsApprvCmp DetailViewData={puchaseData} company={company} />
                                            </Box>
                                            : null
                                        }
                                    </Box>
                                    <Box sx={{ flex: 1, }}>
                                        {ms_approve_req === 1 && ms_approve !== null ?
                                            <Box sx={{ pt: 0.5, }}>
                                                <CommonMsApprvCmp DetailViewData={puchaseData} company={company} />
                                            </Box>
                                            : null
                                        }
                                    </Box>
                                    <Box sx={{ flex: 1, }}>
                                        {manag_operation_req === 1 && manag_operation_approv !== null ?
                                            <Box sx={{ pt: 0.5, }}>
                                                <CommonMoApprvlCmp DetailViewData={puchaseData} company={company} />
                                            </Box>
                                            : null
                                        }
                                    </Box>
                                    <Box sx={{ flex: 1, }}>
                                        {senior_manage_req === 1 && senior_manage_approv !== null ?
                                            <Box sx={{ pt: 0.5, }}>
                                                <CommonSmoApprvCmp DetailViewData={puchaseData} company={company} />
                                            </Box>
                                            : null
                                        }
                                    </Box>

                                    <Box sx={{ flex: 1, }}>
                                        {gm_approve_req === 1 && gm_approve !== null ?
                                            <Box sx={{ pt: 0.5, }}>
                                                <CommonGmapprvCmp DetailViewData={puchaseData} company={company} />
                                            </Box>
                                            : null
                                        }
                                    </Box>

                                    <Box sx={{ flex: 1, }}>
                                        {md_approve !== null ?
                                            <Box sx={{ pt: 0.5, }}>
                                                <CommonMdApprvCmp DetailViewData={puchaseData} company={company} />
                                            </Box>
                                            : null}
                                    </Box>
                                    <Box sx={{}}>
                                        {ed_approve !== null ?
                                            <Box sx={{ pt: 0.5, }}>
                                                <CommonEdapprvCmp DetailViewData={puchaseData} company={company} />
                                            </Box>
                                            : null}
                                    </Box>
                                    <Box sx={{}}>
                                        {(managing_director_req === 1 && managing_director_approve !== null) ?
                                            <Box sx={{ pt: 0.5, }}>
                                                <CommonMangingApprvComp DetailViewData={puchaseData} company={company} />
                                            </Box>
                                            : null
                                        }
                                    </Box>

                                </Box>
                                <Box sx={{ py: 0.5, mx: 0.2 }}>
                                    {datacolflag === 1 ?
                                        <ViewOreviousDataCollctnDetails datacolData={datacolData} company={company} />
                                        : null
                                    }
                                </Box>
                                {
                                    ack_status === 1 ?
                                        <PoAcknowComp poData={puchaseData} />
                                        :
                                        <Paper variant='outlined' sx={{ pb: 1, flexWrap: 'wrap', mx: 0.3, }} >
                                            <Box sx={{ mx: 1, mt: 1 }}>
                                                <CusCheckBox
                                                    className={{ color: '#145DA0', fontSize: 14, fontWeight: 'bold' }}
                                                    variant="outlined"
                                                    color="primary"
                                                    size="md"
                                                    label="Acknowledgement"
                                                    name="acknowledgemnet"
                                                    value={acknowledgemnet}
                                                    checked={purchaseState.acknowledgemnet}
                                                    onCheked={handleCheckboxChange('acknowledgemnet')}
                                                />
                                            </Box>
                                            {acknowledgemnet === true ?
                                                <Box sx={{ display: 'flex', pt: 0.4, borderTop: '1px solid lightgrey' }}>
                                                    <Typography sx={{ fontSize: 14, fontWeight: 600, pl: 3, pt: 2 }}>Remarks</Typography>
                                                    <Typography sx={{ pt: 1.8, pl: 1 }}>  :&nbsp;</Typography>
                                                    <Box sx={{ px: 1, pt: 0.2, flex: 1 }}>
                                                        <Textarea
                                                            required
                                                            type="text"
                                                            size="sm"
                                                            minRows={2}
                                                            maxRows={3}
                                                            style={{ width: "90%", }}
                                                            placeholder="type here ..."
                                                            name='ackRemark'
                                                            value={ackRemark}
                                                            onChange={updatePoDetails}
                                                        />
                                                    </Box>
                                                </Box>
                                                : null}
                                        </Paper>
                                }
                                {ack_status === 1 && po_prepartion !== 1 && po_complete !== 1 ?
                                    <Paper variant='outlined' sx={{ pb: 1, flexWrap: 'wrap', mx: 0.2, mt: 0.3 }} >
                                        <Box sx={{ mx: 1, mt: 1 }}>
                                            <CusCheckBox
                                                className={{ color: '#145DA0', fontSize: 14, fontWeight: 'bold' }}
                                                variant="outlined"
                                                color="primary"
                                                size="md"
                                                name="datacollFlag"
                                                label="Data Collection Required"
                                                value={datacollFlag}
                                                onCheked={updateDataCollFlag}
                                                checked={datacollFlag}
                                                disabled={(quotationCall === true || poadding === true || datacollFlagKMC === true ||
                                                    quotationNego === true || quotationFix === true) ? true : false}
                                            />
                                        </Box>
                                    </Paper>
                                    : null}

                                {
                                    company_slno === 2 && ack_status === 1 && po_prepartion !== 1 && po_complete !== 1 ?
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
                                                    onCheked={handleCheckboxChange('datacollFlagKMC')}

                                                    checked={purchaseState.datacollFlagKMC}
                                                    disabled={(quotationCall === true || poadding === true || datacollFlag === true ||
                                                        quotationNego === true || quotationFix === true) ? true : false}
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
                                            <DataCollectDepSecSelectTmc SetDeptSec={serCrfDept} />
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
                                                onChange={updatePoDetails}
                                            />
                                        </Box>
                                    </Box>
                                </Box> : null}
                                {/* datacollection */}
                                {datacollFlag === true ?
                                    <Box sx={{ border: '1px solid lightgrey', borderTop: 'none', pb: 1, mx: 0.2 }}>
                                        <Box sx={{ display: 'flex', pt: 1, }}>
                                            <Typography sx={{ fontSize: 14, fontWeight: 600, flex: 0.5, pl: 1, pt: 0.5 }}>Departments for Data Collection</Typography>
                                            <Typography sx={{ pt: 0.5 }}>  :&nbsp;</Typography>
                                            <Box sx={{ px: 1, pt: 0.2, flex: 1.5 }}>
                                                <DataCollectDepSecSelect SetDeptSec={serCrfDept} />
                                            </Box>
                                        </Box>
                                        <Box sx={{ display: 'flex', pt: 0.4 }}>
                                            <Typography sx={{ fontSize: 14, fontWeight: 600, flex: 0.5, pl: 1, pt: 1 }}>Remarks</Typography>
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
                                                    onChange={updatePoDetails}
                                                />
                                            </Box>
                                        </Box>
                                    </Box>
                                    : null}
                                {/*     Quotation Calling */}
                                {ack_status === 1 && quatation_calling_status !== 1 && po_prepartion !== 1 && po_complete !== 1 ?
                                    <Paper variant='outlined' sx={{ pb: 1, flexWrap: 'wrap', mx: 0.2, mt: 0.3 }} >
                                        <Box sx={{ mx: 1, mt: 1 }}>
                                            <CusCheckBox
                                                className={{ color: '#145DA0', fontSize: 14, fontWeight: 'bold' }}
                                                variant="outlined"
                                                color="primary"
                                                size="md"
                                                label="Quotation Call"
                                                name="quotationCall"
                                                value={quotationCall}
                                                checked={purchaseState.quotationCall}
                                                onCheked={handleCheckboxChange('quotationCall')}
                                                disabled={(datacollFlag === true || poadding === true || datacollFlagKMC === true) ? true : false}
                                            />
                                        </Box>
                                        {quotationCall === true ?
                                            <Box sx={{ display: 'flex', pt: 0.4, borderTop: '1px solid lightgrey' }}>
                                                <Typography sx={{ fontSize: 14, fontWeight: 600, pl: 3, pt: 2 }}>Remarks</Typography>
                                                <Typography sx={{ pt: 1.8, pl: 1 }}>  :&nbsp;</Typography>
                                                <Box sx={{ px: 1, pt: 0.2, flex: 1 }}>
                                                    <Textarea
                                                        required
                                                        type="text"
                                                        size="sm"
                                                        minRows={2}
                                                        maxRows={3}
                                                        style={{ width: "90%", }}
                                                        placeholder="type here ..."
                                                        name='quotationCallRemark'
                                                        value={quotationCallRemark}
                                                        onChange={updatePoDetails}
                                                    />
                                                </Box>
                                            </Box>
                                            : null}
                                    </Paper>
                                    :
                                    <>
                                        {quatation_calling_status === 1 ?
                                            <QuotationCallComp poData={puchaseData} />
                                            : null}
                                    </>
                                }
                                {quatation_calling_status === 1 && quatation_negotiation !== 1 ?
                                    <Paper variant='outlined' sx={{ pb: 1, flexWrap: 'wrap', mx: 0.2, mt: 0.3 }} >
                                        <Box sx={{ mx: 1, mt: 1 }}>
                                            <CusCheckBox
                                                className={{ color: '#145DA0', fontSize: 14, fontWeight: 'bold' }}
                                                variant="outlined"
                                                color="primary"
                                                size="md"
                                                label="Quotation Negotiation"
                                                name="quotationNego"
                                                value={quotationNego}
                                                checked={purchaseState.quotationNego}
                                                onCheked={handleCheckboxChange('quotationNego')}
                                                disabled={datacollFlag === true || datacollFlagKMC === true ? true : false}
                                            />
                                        </Box>
                                        {quotationNego === true ?
                                            <Box sx={{ display: 'flex', pt: 0.4, borderTop: '1px solid lightgrey' }}>
                                                <Typography sx={{ fontSize: 14, fontWeight: 600, pl: 3, pt: 2 }}>Remarks</Typography>
                                                <Typography sx={{ pt: 1.8, pl: 1 }}>  :&nbsp;</Typography>
                                                <Box sx={{ px: 1, pt: 0.2, flex: 1 }}>
                                                    <Textarea
                                                        required
                                                        type="text"
                                                        size="sm"
                                                        minRows={2}
                                                        maxRows={3}
                                                        style={{ width: "90%", }}
                                                        placeholder="type here ..."
                                                        name='quotationNegoRemark'
                                                        value={quotationNegoRemark}
                                                        onChange={updatePoDetails}
                                                    />
                                                </Box>
                                            </Box>
                                            : null}
                                    </Paper> :
                                    <> {quatation_negotiation === 1 ?
                                        <QuotationNegoComp poData={puchaseData} />
                                        : null}
                                    </>
                                }
                                {quatation_calling_status === 1 && quatation_negotiation === 1 && quatation_fixing !== 1 ?
                                    <Paper variant='outlined' sx={{ pb: 1, flexWrap: 'wrap', mx: 0.2, mt: 0.3 }} >
                                        <Box sx={{ mx: 1, mt: 1 }}>
                                            <CusCheckBox
                                                className={{ color: '#145DA0', fontSize: 14, fontWeight: 'bold' }}
                                                variant="outlined"
                                                color="primary"
                                                size="md"
                                                label="Quotation Fix"
                                                name="quotationFix"
                                                value={quotationFix}
                                                checked={purchaseState.quotationFix}
                                                onCheked={handleCheckboxChange('quotationFix')}
                                                disabled={datacollFlag === true ? true : false}
                                            />
                                        </Box>
                                        {quotationFix === true ?
                                            <Box sx={{ display: 'flex', pt: 0.4, borderTop: '1px solid lightgrey' }}>
                                                <Typography sx={{ fontSize: 14, fontWeight: 600, pl: 3, pt: 2 }}>Remarks</Typography>
                                                <Typography sx={{ pt: 1.8, pl: 1 }}>  :&nbsp;</Typography>
                                                <Box sx={{ px: 1, pt: 0.2, flex: 1 }}>
                                                    <Textarea
                                                        required
                                                        type="text"
                                                        size="sm"
                                                        minRows={2}
                                                        maxRows={3}
                                                        style={{ width: "90%", }}
                                                        placeholder="type here ..."
                                                        name='quotationFixRemark'
                                                        value={quotationFixRemark}
                                                        onChange={updatePoDetails}
                                                    />
                                                </Box>
                                            </Box>
                                            : null}
                                    </Paper>
                                    : <>
                                        {quatation_fixing === 1 ?
                                            <QuotationFinalComp poData={puchaseData} />
                                            : null}
                                    </>
                                }
                                {/* {podetailFlag === 1 ? */}
                                {po_prepartion === 1 ?
                                    <Box sx={{ width: "100%" }}>
                                        <Typography sx={{
                                            fontWeight: 'bold', px: 1, py: 0.5, color: '#145DA0',
                                            fontSize: 14, flex: 0.5,
                                        }}>
                                            Added PO
                                        </Typography>
                                        <Box sx={{ px: 0.5, pb: 0.3, flexWrap: 'wrap' }}>
                                            <CrfReqDetailCmpnt poDetails={poDetails} />
                                        </Box>
                                    </Box>
                                    : null}
                                {ack_status === 1 && po_complete !== 1 && ((quatation_calling_status !== 1 && quatation_fixing !== 1) ||
                                    (quatation_calling_status === 1 && quatation_fixing === 1)) ?
                                    <Paper variant='outlined' sx={{ flexWrap: 'wrap', mx: 0.2, mt: 0.3 }} >
                                        <Box sx={{ p: 0.8, mt: 0.3 }}>
                                            <CusCheckBox
                                                className={{ color: '#145DA0', fontSize: 14, fontWeight: 'bold' }}
                                                variant="outlined"
                                                color="primary"
                                                size="md"
                                                label="Get PO Information From Ellider (HIMS)"
                                                name="poadding"
                                                value={poadding}
                                                checked={poadding}
                                                onCheked={checkNewPo}
                                                disabled={(quotationCall === true || datacollFlag === true || WorkOrder === true || datacollFlagKMC === true
                                                    || poComplete === true) ? true : false}
                                            />
                                        </Box>
                                    </Paper>
                                    : null}

                                {ack_status === 1 && po_complete !== 1 && ((quatation_calling_status !== 1 || (quatation_calling_status === 1 && quatation_fixing === 1)))
                                    ?
                                    <Paper variant='outlined' sx={{ flexWrap: 'wrap', mx: 0.2, mt: 0.3 }} >
                                        <Box sx={{ p: 0.8, mt: 0.3 }}>
                                            {/* <CusCheckBox
                                                className={{ color: '#145DA0', fontSize: 14, fontWeight: 'bold' }}
                                                variant="outlined"
                                                color="primary"
                                                size="md"
                                                label="Work Order Details"
                                                name="WorkOrder"
                                                value={WorkOrder}
                                                checked={WorkOrder}
                                                onCheked={setWorkOrder}
                                                disabled={(quotationCall === true || datacollFlag === true
                                                    || poComplete === true) ? true : false}
                                            /> */}
                                            <Checkbox
                                                sx={{ color: '#145DA0', fontSize: 14, fontWeight: 'bold' }}
                                                variant="outlined"
                                                color="primary"
                                                size="md"
                                                label="Work Order Details"
                                                name="WorkOrder"
                                                // value={WorkOrder}
                                                checked={WorkOrder}
                                                onChange={(e) => setWorkOrder(e.target.checked)}
                                                disabled={quotationCall || datacollFlag || poComplete || poadding || datacollFlagKMC === true}
                                            />
                                        </Box>
                                    </Paper>
                                    : null}
                                {/* work order details */}
                                {WorkOrder === true ?
                                    <Box>
                                        <Box sx={{ flex: 1, display: "flex", pt: 0.5 }}>
                                            <Box sx={{ flex: 1, }}>
                                                <CustomPaperTitle heading="Work Order No" mandtry={1} />
                                                <CustomInputDateCmp
                                                    className={{ ml: 1 }}
                                                    autoComplete='off'
                                                    size={'sm'}
                                                    type={'number'}
                                                    name={'work_orderNo'}
                                                    value={work_orderNo}
                                                    handleChange={updatePoDetails}
                                                />
                                            </Box>
                                            <Box sx={{ flex: 1, }}>
                                                <CustomPaperTitle heading="Work Order Date" mandtry={1} />
                                                <CustomInputDateCmp
                                                    className={{ ml: 0.5 }}
                                                    size={'sm'}
                                                    type='date'
                                                    name={'order_date'}
                                                    value={order_date}
                                                    handleChange={updatePoDetails}
                                                    slotProps={{
                                                        input: { max: moment(new Date()).format('YYYY-MM-DD') }
                                                    }}
                                                />
                                            </Box>
                                            <Box sx={{ flex: 1, }}>
                                                <CustomPaperTitle heading="Remark" mandtry={1} />
                                                <CustomInputDateCmp
                                                    className={{ ml: 1 }}
                                                    autoComplete='off'
                                                    size={'sm'}
                                                    type={'text'}
                                                    name={'order_remark'}
                                                    value={order_remark}
                                                    handleChange={updatePoDetails}
                                                />
                                            </Box>

                                        </Box>
                                        {/* purchase modal image upload */}
                                        <PurchaseWoImg selectFile={selectFile} setSelectFile={setSelectFile} />
                                    </Box>
                                    : null}


                                {poadding === true ?
                                    <Box sx={{ flex: 1, display: "flex", pt: 0.5 }}>
                                        <Box sx={{ flex: 1, }}>
                                            <CustomPaperTitle heading="PO No" mandtry={1} />
                                            <CustomInputDateCmp
                                                className={{ ml: 1 }}
                                                autoComplete='off'
                                                size={'sm'}
                                                type={'number'}
                                                name={'po_number'}
                                                value={po_number}
                                                handleChange={updatePoDetails}
                                            />
                                        </Box>
                                        <Box sx={{ flex: 1, }}>
                                            <CustomPaperTitle heading="PO Date" mandtry={1} />
                                            <CustomInputDateCmp
                                                className={{ ml: 0.5 }}
                                                size={'sm'}
                                                type='date'
                                                name={'po_date'}
                                                value={po_date}
                                                handleChange={updatePoDetails}
                                                slotProps={{
                                                    input: { max: moment(new Date()).format('YYYY-MM-DD') }
                                                }}
                                            />
                                        </Box>
                                        <Box sx={{ flex: 1, }}>
                                            <CustomPaperTitle heading="CRS Store" mandtry={1} />
                                            <Box sx={{ ml: 0.5 }}>
                                                <CrfStoreSelect storeSlno={storeSlno} setStoreSlno={setStoreSlno} setStoreCode={setStoreCode}
                                                    setStoreName={setStoreName} setsubStoreSlno={setsubStoreSlno} />
                                            </Box>
                                        </Box>
                                        <Box sx={{ flex: 1, }}>
                                            <CustomPaperTitle heading=" Store" mandtry={1} />
                                            <Box sx={{ ml: 0.5 }}>
                                                <PurchaseStoreSlect storeSlno={storeSlno} setsubStoreSlno={setsubStoreSlno} substoreSlno={substoreSlno}
                                                    setsubStoreName={setsubStoreName} />
                                            </Box>
                                        </Box>
                                        <Box sx={{ pl: 0.7, pt: 3.2, flex: 0.5, display: 'flex' }}>
                                            <Tooltip title="Add PO Details" placement="bottom"  >
                                                <AddCircleTwoToneIcon
                                                    sx={{
                                                        height: 28, width: 28, color: '#0070E0', cursor: "pointer",
                                                        ":hover": {
                                                            color: '#1e88e5'
                                                        }
                                                    }}
                                                    onClick={AddItem}
                                                />
                                            </Tooltip>
                                            <Box sx={{ pl: 0.7, }}>
                                                <Tooltip title="Clear All" placement="bottom"  >
                                                    <ClearIcon
                                                        sx={{
                                                            height: 28, width: 28, color: '#ef9a9a', cursor: "pointer",
                                                            ":hover": {
                                                                color: '#e57373'
                                                            }
                                                        }}
                                                        onClick={clearData}
                                                    />
                                                </Tooltip>
                                            </Box>
                                        </Box>
                                    </Box>
                                    : null}
                                {poDetlDis === 1 && poadding === true ?
                                    <Box sx={{ width: "100%", pl: 1, pb: 0.3, pr: 0.5, flexWrap: 'wrap' }}>
                                        <CrfReqDetailCmpnt poDetails={podetailData} />
                                    </Box> : null
                                }
                                {(po_prepartion === 1 && poadding === false) ?
                                    <Paper variant='outlined' sx={{ mt: 0.4, flexWrap: 'wrap', }} >
                                        <Box sx={{ display: 'flex', m: 1.5 }}>
                                            <CusCheckBox
                                                className={{ color: '#145DA0', fontSize: 14, fontWeight: 'bold' }}
                                                variant="outlined"
                                                color="primary"
                                                size="md"
                                                label="PO Process Completed"
                                                name="poComplete"
                                                value={poComplete}
                                                checked={poComplete}
                                                onCheked={checkPoComplete}
                                            />
                                        </Box>
                                    </Paper>
                                    : null}
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
            </CssVarsProvider >
        </Fragment >
    )
}

export default memo(PurchaseModal)