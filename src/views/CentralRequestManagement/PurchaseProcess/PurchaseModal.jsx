import React, { Fragment, useCallback, useState, memo, useEffect, useMemo } from 'react'
import Slide from '@mui/material/Slide';
import { ToastContainer } from 'react-toastify';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { Box, Paper, IconButton, Tooltip } from '@mui/material'
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { axioslogin } from 'src/views/Axios/Axios'
import { succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import { CssVarsProvider, Typography, Textarea } from '@mui/joy'
import ReqItemDisplay from '../ComonComponent/ReqItemDisplay';
import _ from 'underscore'
import { useSelector } from 'react-redux'
import { format } from 'date-fns';
import CusCheckBox from 'src/views/Components/CusCheckBox';
import ApprovedItemListDis from '../ComonComponent/ApprovedItemListDis';
import { MdOutlineAddCircleOutline } from 'react-icons/md';
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import CustomPaperTitle from 'src/views/Components/CustomPaperTitle'
import CrfReqDetailCmpnt from '../CRFRequestMaster/CrfReqDetailCmpnt';
import PurchaseStoreSlect from './PurchaseStoreSlect';
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static';
import ReqImageDisModal from '../ComonComponent/ReqImageDisModal';
import DataCollectnImageDis from '../ComonComponent/DataCollectnImageDis';
import DataCollectnPendingModal from '../ComonComponent/DataCollectnPendingModal';
import Divider from '@mui/material/Divider';
import { TypoHeadColor } from 'src/color/Color'
import DeptSectionSelectMulti from 'src/views/CommonSelectCode/DeptSectionSelectMulti';
import moment from 'moment'
import CusIconButton from 'src/views/Components/CusIconButton'
import AttachFileIcon from '@mui/icons-material/AttachFile';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});


const PurchaseModal = ({ open, puchaseData, setpuchaseFlag, setpuchaseModal, setpuchaseData,
    count, setCount }) => {

    const { req_slno, req_date, actual_requirement, needed, expected_date,
        md_approve, md, md_approve_remarks, md_detial_analysis, md_approve_date, md_user,
        ed_approve, ed, ed_approve_remarks, ed_approve_date, ed_detial_analysis, ed_user,
        crm_purchase_slno, ack_status, ack_remarks, purchase_ackuser, ack_date,
        quatation_calling_status, quatation_calling_date, quatation_user,
        quatation_negotiation, quatation_negotiation_date, quatation_neguser,
        quatation_fixing, quatation_fixing_date, quatation_fixuser,
        po_prepartion, po_complete, po_approva_level_one, po_approva_level_two,
        po_to_supplier, image_status, store_receive, md_image, ed_image,
        quatation_calling_remarks, quatation_negotiation_remarks, quatation_fixing_remarks

    } = puchaseData

    const expdate = expected_date !== null ? format(new Date(expected_date), 'dd-MM-yyyy') : "Not Updated"
    const mdApprovdate = md_approve_date !== null ? format(new Date(md_approve_date), 'dd-MM-yyyy hh:mm:ss') : "Not Updated"
    const edApprovdate = ed_approve_date !== null ? format(new Date(ed_approve_date), 'dd-MM-yyyy hh:mm:ss') : "Not Updated"

    const [reqTableDis, setReqTableDis] = useState(0)
    const [detailData, setDetailData] = useState([])
    const id = useSelector((state) => state.LoginUserData.empid, _.isEqual)
    const [crfdept, serCrfDept] = useState([])
    //state for Remarks

    const [formRemarks, setFormRemarks] = useState({
        Acknowledgement: false,
        Ackremark: '',
        datacollFlag: false,
        datacolectremark: '',
        QuatationCall: false,
        QuatationCallremark: '',
        QuatationNego: false,
        QuatationNegoremark: '',
        QuatationFix: false,
        QuatationFixremark: '',
        poadding: false,
        poComplete: false,
        poLevelOne: false,
        poLevelTwo: false,
        poToSupplier: false

    })
    const { Acknowledgement, Ackremark, datacollFlag, datacolectremark, QuatationCall, QuatationCallremark,
        QuatationNego, QuatationNegoremark, QuatationFix, QuatationFixremark, poadding, poComplete,
        poLevelOne, poLevelTwo, poToSupplier } = formRemarks

    const updateFormRemarks = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormRemarks({ ...formRemarks, [e.target.name]: value })
    }, [formRemarks])

    const [ApproveTableDis, setApproveTableDis] = useState(0)
    const [ApproveTableData, setApproveTableData] = useState([])
    const [poDetlDis, setPoDetlDis] = useState(0)
    const [podetailData, setpodetailData] = useState([])
    const [podetail, setPoDetails] = useState({
        po_number: '',
        po_date: '',
        expectpo_date: ''
    })

    //Destructuring
    const { po_number, po_date, expectpo_date } = podetail
    const updatePoDetails = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setPoDetails({ ...podetail, [e.target.name]: value })
    }, [podetail])

    const [podetailFlag, setPOdetalFalg] = useState(0)
    const [getpoDetaildata, setgetPodetailData] = useState([])
    const [substoreSlno, setsubStoreSlno] = useState(0)
    const [substoreName, setsubStoreName] = useState('')
    const [storeName, setStoreName] = useState('')
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
            } else {
                warningNotify("Error Occured to display image")
                setImageShowFlag(0)
                setImageShow(false)
                setImageArry([])
            }
        }
        getImage(req_slno)
    }, [req_slno])

    const ViewMDUploadImage = useCallback(() => {
        const getImage = async (req_slno) => {
            const result = await axioslogin.get(`/newCRFRegisterImages/crfMDImageGet/${req_slno}`)
            const { success, data } = result.data
            if (success === 1) {
                const fileNames = data;
                const fileUrls = fileNames.map((fileName) => {
                    return `${PUBLIC_NAS_FOLDER}/CRF/crf_registration/${req_slno}/MDUpload/${fileName}`;
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

    const ViewEDUploadImage = useCallback(() => {
        const getImage = async (req_slno) => {
            const result = await axioslogin.get(`/newCRFRegisterImages/crfEDImageGet/${req_slno}`)
            const { success, data } = result.data
            if (success === 1) {
                const fileNames = data;
                const fileUrls = fileNames.map((fileName) => {
                    return `${PUBLIC_NAS_FOLDER}/CRF/crf_registration/${req_slno}/EDUpload/${fileName}`;
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


    const handleClose = useCallback(() => {
        setImageShowFlag(0)
        setImageShow(false)
    }, [])

    const [enable, setEnable] = useState(0)
    const [datacollectdata, setDataCollectData] = useState([])
    const [colectDetlCheck, setCollectDetailCheck] = useState(true)

    const [datacolflag, setDataColFlag] = useState(0)
    const [datacolData, setDataColData] = useState([])

    const [collImageShowFlag, setCollImageShowFlag] = useState(0)
    const [collImageShow, setCollImageShow] = useState(false)
    const [dataCollSlno, setDataCollSlNo] = useState([])

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
            const result = await axioslogin.get(`/CRFRegisterApproval/getFinalItemListApproval/${req_slno}`)
            const { succes, dataa } = result.data
            if (succes === 1) {
                const datas = dataa.map((val, index) => {
                    const obj = {
                        slno: index + 1,
                        req_detl_slno: val.req_detl_slno,
                        req_slno: val.req_slno,
                        aprox_cost: val.aprox_cost,
                        item_status: val.item_status,
                        approved_itemunit: val.approved_itemunit !== null ? val.approved_itemunit : "Not Given",
                        approve_item_desc: val.approve_item_desc !== null ? val.approve_item_desc : "Not Given",
                        approve_item_brand: val.approve_item_brand !== '' ? val.approve_item_brand : "Not Given",
                        approve_item_unit: val.approve_item_unit,
                        item_qnty_approved: val.item_qnty_approved !== null ? val.item_qnty_approved : "Not Given",
                        approve_item_unit_price: val.approve_item_unit_price !== null ? val.approve_item_unit_price : "Not Given",
                        approve_aprox_cost: val.approve_aprox_cost !== null ? val.approve_aprox_cost : "Not Given",
                        item_status_approved: val.item_status_approved,
                        approve_item_status: val.approve_item_status,
                        approve_item_delete_who: val.approve_item_delete_who,
                        uom_name: val.uom_name,
                        approve_item_specification: val.approve_item_specification !== '' ? val.approve_item_specification : "Not Given",
                        old_item_slno: val.old_item_slno !== null ? val.old_item_slno : "",
                        item_slno: val.item_slno
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


        const getPODetails = async (req_slno) => {
            const result = await axioslogin.get(`/newCRFPurchase/getPOList/${req_slno}`)
            const { success, data } = result.data
            if (success === 1) {

                const datas = data && data.map((val) => {
                    return {
                        req_slno: val.req_slno,
                        po_number: val.po_number,
                        po_date: val.po_date,
                        po_status: 1,
                        expected_delivery: val.expected_delivery,
                        supply_store: val.supply_store,
                        sub_storename: val.sub_store_name,
                        store_name: val.main_store
                    }
                })

                setgetPodetailData(datas)
                setPOdetalFalg(1)

            }
            else {
                setgetPodetailData([])
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
                            crf_data_collect_slno: val.crf_data_collect_slno
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
        getPODetails(req_slno)

        const fromdaraset = {
            Acknowledgement: false,
            Ackremark: '',
            datacollFlag: false,
            datacolectremark: '',
            QuatationCall: false,
            QuatationCallremark: '',
            QuatationNego: false,
            QuatationNegoremark: '',
            QuatationFix: false,
            QuatationFixremark: '',
            poadding: false,
            poComplete: false,
            poLevelOne: po_approva_level_one === 1 ? true : false,
            poLevelTwo: po_approva_level_two === 1 ? true : false,
            poToSupplier: po_to_supplier === 1 ? true : false
        }
        setFormRemarks(fromdaraset)
    }, [req_slno, po_approva_level_one, po_approva_level_two, po_to_supplier])



    const reset = useCallback(() => {
        setpuchaseFlag(0)
        setpuchaseModal(false)
        setpuchaseData([])
        setReqTableDis(0)
        setDetailData([])
        setApproveTableDis(0)
        setApproveTableData([])

        setEnable(0)
        setDataCollectData([])
        setCollectDetailCheck(false)
        setDataColFlag(0)
        setDataColData([])
        setCollImageShowFlag(0)
        setCollImageShow(false)
        setDataCollSlNo([])
        const frmdatareset = {
            Acknowledgement: false,
            Ackremark: '',
            datacollFlag: false,
            datacolectremark: '',
            QuatationCall: false,
            QuatationCallremark: '',
            QuatationNego: false,
            QuatationNegoremark: '',
            QuatationFix: false,
            QuatationFixremark: '',
            poadding: false,
            poComplete: false,
            poLevelOne: false,
            poLevelTwo: false,
            poToSupplier: false
        }
        setFormRemarks(frmdatareset)
    }, [setpuchaseFlag, setpuchaseModal, setpuchaseData])


    const AddItem = useCallback(() => {


        if (po_number !== '' && po_date !== '' && expectpo_date !== '' && substoreSlno !== 0) {

            const newdata = {
                id: Math.ceil(Math.random() * 1000),
                req_slno: req_slno,
                po_number: po_number,
                po_date: po_date,
                po_status: 1,
                expected_delivery: expectpo_date,
                supply_store: substoreSlno,
                sub_storename: substoreName,
                store_name: storeName
            }
            const datass = [...podetailData, newdata]
            setPoDetlDis(1)
            if (datass.length !== 0) {
                setpodetailData(datass)
                const resetarrray = {
                    po_number: '',
                    po_date: '',
                    expectpo_date: ''
                }
                setPoDetails(resetarrray)
                setsubStoreSlno(0)
                setsubStoreName('')
                setStoreName('')
            }
            else {

            }


        }
        else {
            warningNotify("Please Enter PO Details")
        }
    }, [po_number, po_date, req_slno, podetailData, expectpo_date, substoreSlno, substoreName, storeName])

    const postPurchaseCrf = useMemo(() => {
        return {
            req_slno: req_slno,
            ack_status: 1,
            ack_remarks: Ackremark,
            create_user: id
        }

    }, [req_slno, Ackremark, id])


    const QuatationCallPatch = useMemo(() => {
        return {
            quatation_calling_status: QuatationCall === true ? 1 : 0,
            quatation_calling_user: id,
            quatation_calling_date: format(new Date(), 'yyyy-MM-dd hh:mm:ss'),
            quatation_calling_remarks: QuatationCallremark,
            crm_purchase_slno: crm_purchase_slno
        }
    }, [crm_purchase_slno, id, QuatationCall, QuatationCallremark])


    const QuatationNegotnPatch = useMemo(() => {
        return {
            quatation_negotiation: QuatationNego === true ? 1 : 0,
            quatation_negotiation_user: id,
            quatation_negotiation_date: format(new Date(), 'yyyy-MM-dd hh:mm:ss'),
            quatation_negotiation_remarks: QuatationNegoremark,
            crm_purchase_slno: crm_purchase_slno,
        }
    }, [crm_purchase_slno, id, QuatationNego, QuatationNegoremark])

    const QuatationFixingPatch = useMemo(() => {
        return {
            quatation_fixing: QuatationFix === true ? 1 : 0,
            quatation_fixing_user: id,
            quatation_fixing_date: format(new Date(), 'yyyy-MM-dd hh:mm:ss'),
            quatation_fixing_remarks: QuatationFixremark,
            crm_purchase_slno: crm_purchase_slno,
        }
    }, [crm_purchase_slno, id, QuatationFix, QuatationFixremark])


    const singlePOInsert = useMemo(() => {
        return {
            req_slno: req_slno,
            po_number: po_number,
            po_date: po_date,
            po_status: 1,
            supply_store: substoreSlno,
            expected_delivery: expectpo_date,
            create_user: id
        }
    }, [po_date, id, po_number, req_slno, substoreSlno, expectpo_date])


    const postdataDetl = podetailData && podetailData.map((val) => {
        return {
            req_slno: req_slno,
            po_number: val.po_number,
            po_date: val.po_date,
            po_status: 1,
            supply_store: val.supply_store,
            expected_delivery: val.expected_delivery,
            create_user: id
        }
    })

    const PoCompletePatch = useMemo(() => {
        return {
            po_complete: poComplete === true ? 1 : 0,
            po_complete_user: id,
            po_complete_date: format(new Date(), 'yyyy-MM-dd hh:mm:ss'),
            crm_purchase_slno: crm_purchase_slno,
        }
    }, [crm_purchase_slno, id, poComplete])


    const PoApprovalPatch = useMemo(() => {
        return {
            po_approva_level_one: poLevelOne === true ? 1 : 0,
            po_approva_level_two: poLevelTwo === true ? 1 : 0,
            po_to_supplier: poToSupplier === true ? 1 : 0,
            edit_user: id,
            crm_purchase_slno: crm_purchase_slno,
        }
    }, [crm_purchase_slno, id, poLevelOne, poLevelTwo, poToSupplier])



    const submit = useCallback(() => {

        const purchaseInsert = async (postPurchaseCrf) => {
            const result = await axioslogin.post('/newCRFPurchase/InsertPurchaseAck', postPurchaseCrf);
            const { success, message } = result.data
            if (success === 1) {
                succesNotify(message)
                reset()
                setCount(count + 1)
            }
            else {
                warningNotify(message)
            }
        }


        const updateQuatationCalling = async (QuatationCallPatch) => {
            const result = await axioslogin.patch('/newCRFPurchase/QuatationCalling', QuatationCallPatch);
            const { success, message } = result.data;
            if (success === 1) {
                succesNotify(message)
                setCount(count + 1)
                reset()
            }
            else {
                warningNotify(message)
            }
        }

        const updateQuatationNegotiatn = async (QuatationNegotnPatch) => {
            const result = await axioslogin.patch('/newCRFPurchase/QuatationNegotiation', QuatationNegotnPatch);
            const { success, message } = result.data;
            if (success === 1) {
                succesNotify(message)
                setCount(count + 1)
                reset()
            }
            else {
                warningNotify(message)
            }
        }

        const updateQuatationFixing = async (QuatationFixingPatch) => {
            const result = await axioslogin.patch('/newCRFPurchase/QuatationFixing', QuatationFixingPatch);
            const { success, message } = result.data;
            if (success === 1) {
                succesNotify(message)
                setCount(count + 1)
                reset()
            }
            else {
                warningNotify(message)
            }
        }


        const InsertSinglePO = async (singlePOInsert) => {
            const result = await axioslogin.post('/newCRFPurchase/InsertinglePO', singlePOInsert);
            const { success, message } = result.data;
            if (success === 1) {
                succesNotify(message)
                setCount(count + 1)
                reset()
            }
            else {
                warningNotify(message)
            }
        }


        const InsertMultiplePO = async (postdataDetl) => {
            const result = await axioslogin.post('/newCRFPurchase/InsertMultiplePO', postdataDetl);
            const { success, message } = result.data;
            if (success === 1) {
                succesNotify(message)
                setCount(count + 1)
                reset()
            }
            else {
                warningNotify(message)
            }
        }

        const updatePOComplete = async (PoCompletePatch) => {
            const result = await axioslogin.patch('/newCRFPurchase/PoComplete', PoCompletePatch);
            const { success, message } = result.data;
            if (success === 1) {
                succesNotify(message)
                setCount(count + 1)
                reset()
            }
            else {
                warningNotify(message)
            }
        }


        const updatePoApprovals = async (PoApprovalPatch) => {
            const result = await axioslogin.patch('/newCRFPurchase/PoFinals', PoApprovalPatch);
            const { success, message } = result.data;
            if (success === 1) {
                succesNotify(message)
                setCount(count + 1)
                reset()
            }
            else {
                warningNotify(message)
            }
        }

        const DataCollRequestFnctn = async (postData) => {
            const result = await axioslogin.post(`/CRFRegisterApproval/dataCollect/Insert`, postData);
            const { success, message } = result.data;
            if (success === 1) {
                succesNotify(message)
                setCount(count + 1)
                reset()
            } else {
                warningNotify(message)
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
                            reqest_one: 6,
                            req_user: id
                        }
                    })
                    DataCollRequestFnctn(postData)
                } else {
                    warningNotify("Please Enter The Remarks")
                }
            } else {
                warningNotify("Please Select any department")
            }
        }
        else if (ack_status !== 1) {
            if (Ackremark !== '') {
                purchaseInsert(postPurchaseCrf)
            }
            else {
                warningNotify("Please Enter Remarks")
            }

        }
        else {
            if (quatation_calling_status !== 1 && QuatationCall === true) {
                updateQuatationCalling(QuatationCallPatch)
            } else if (quatation_negotiation !== 1 && QuatationNego === true) {
                updateQuatationNegotiatn(QuatationNegotnPatch)
            }
            else if (quatation_fixing !== 1 && QuatationFix === true) {
                updateQuatationFixing(QuatationFixingPatch)
            }

            else if (poadding === true && poLevelOne === false && poLevelTwo === false && poToSupplier === false) {
                if (podetailData.length === 0) {
                    InsertSinglePO(singlePOInsert)
                }
                else {
                    InsertMultiplePO(postdataDetl)
                }
                if (poComplete === true) {
                    updatePOComplete(PoCompletePatch)
                }
            }
            else if (poComplete === true) {
                updatePOComplete(PoCompletePatch)
            }
            else if (poLevelOne === true || poLevelTwo === true || poToSupplier === true) {
                updatePoApprovals(PoApprovalPatch)
            }
        }

    }, [postPurchaseCrf, ack_status, count, setCount, QuatationCallPatch, QuatationCall,
        QuatationNegotnPatch, QuatationFixingPatch, QuatationNego, QuatationFix,
        singlePOInsert, podetailData, postdataDetl, poComplete, PoCompletePatch, PoApprovalPatch,
        poLevelOne, poLevelTwo, poToSupplier, poadding, quatation_calling_status, quatation_fixing,
        quatation_negotiation, reset, datacollFlag, Ackremark, crfdept, id, datacolectremark,
        req_slno])

    //column title setting
    const [column] = useState([
        { headerName: "PO Number", field: "po_number" },
        { headerName: "PO Date", field: "po_date", autoHeight: true, wrapText: true, width: 250, filter: "true" },
        { headerName: "Store", field: "sub_storename", autoHeight: true, wrapText: true, width: 250, filter: "true" },
        { headerName: "CRS Store", field: "store_name", autoHeight: true, wrapText: true, width: 250, filter: "true" },
        { headerName: "Expected Delivery Date", field: "expected_delivery", autoHeight: true, wrapText: true, width: 250, filter: "true" },
    ])

    const ModalClose = useCallback(() => {
        reset()
    }, [reset])

    const handleCloseCollect = useCallback(() => {
        setCollImageShow(false)
        setCollImageShowFlag(1)
        setDataCollSlNo([])
    }, [])

    return (
        <Fragment>
            <ToastContainer />
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
                                CRF Purchase Process
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
                                    </Paper> : <Paper variant='outlined' sx={{ p: 0, mt: 1 }}> <Box sx={{
                                        width: "100%", display: "flex", p: 0.5, pb: 0,
                                        flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                    }}>
                                        <Box sx={{ pr: 9 }}>
                                            <CssVarsProvider>
                                                <Typography sx={{ fontSize: 15 }}>Requested Items: Nil</Typography>
                                            </CssVarsProvider>
                                        </Box>
                                    </Box>
                                    </Paper>
                                }
                                {ApproveTableDis === 1 ?
                                    <Paper variant='outlined' sx={{ p: 0, mt: 1 }} >
                                        <Box sx={{
                                            width: "100%", display: "flex", p: 0.5, pb: 0, flexDirection: 'column',
                                        }}>
                                            <CssVarsProvider>
                                                <Typography sx={{ fontSize: 15 }}>Approved Items</Typography>
                                            </CssVarsProvider>
                                        </Box>
                                        <ApprovedItemListDis ApproveData={ApproveTableData}
                                        />
                                    </Paper> : null
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
                                                    <Typography sx={{ fontSize: 16, fontWeight: 600 }} >Medical Director  :

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
                                                            pr: 2, pt: 0.5
                                                        }}>
                                                        <CssVarsProvider>
                                                            <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5 }}>
                                                                {mdApprovdate}</Typography>
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
                                            {md_image === 1 ?
                                                <Box sx={{ mx: 0.5, pb: 0.5 }}>
                                                    <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={ViewMDUploadImage}  >
                                                        <AttachFileIcon fontSize='small' />
                                                        <Typography color="primary" sx={{ fontSize: 15, pl: 1, pr: 1, }}>View Image</Typography>
                                                    </CusIconButton>
                                                </Box>
                                                : null}
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
                                                    <Typography sx={{ fontSize: 16, fontWeight: 600 }} >Executive Director:

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
                                                            pr: 2, pt: 0.5
                                                        }}>
                                                        <CssVarsProvider>
                                                            <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5 }}>
                                                                {edApprovdate}</Typography>
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
                                            {ed_image === 1 ?
                                                <Box sx={{ mx: 0.5, pb: 0.5 }}>
                                                    <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={ViewEDUploadImage}  >
                                                        <AttachFileIcon fontSize='small' />
                                                        <Typography color="primary" sx={{ fontSize: 15, pl: 1, pr: 1 }}>View Image</Typography>
                                                    </CusIconButton>
                                                </Box>

                                                : null}
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
                                                            {val.data_coll_image_status === 1 ?

                                                                <Box sx={{ display: 'flex', width: "20%", height: 30, pl: 3 }}>
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
                                {/* Purchase Process Starts */}
                                {
                                    ack_status !== 1 ?
                                        <Paper variant='outlined' sx={{ p: 0, mt: 1 }} >
                                            <Box sx={{
                                                display: 'flex', flexDirection: 'row', flexWrap: 'wrap',
                                            }} >
                                                <Box sx={{ width: "20%", pr: 1, mt: 1, pl: 1 }}>
                                                    <CusCheckBox
                                                        variant="outlined"
                                                        color="primary"
                                                        size="md"
                                                        label="Acknowledgement"
                                                        name="Acknowledgement"
                                                        value={Acknowledgement}
                                                        checked={Acknowledgement}
                                                        onCheked={updateFormRemarks}
                                                    />

                                                </Box>
                                                {Acknowledgement === true ?
                                                    <Box sx={{ width: "70%", pr: 1, mt: 1, pl: 1, mb: 1 }}>
                                                        <CssVarsProvider>
                                                            <Textarea
                                                                type="text"
                                                                size="sm"
                                                                variant="outlined"
                                                                minRows={2}
                                                                maxRows={2}
                                                                style={{
                                                                    borderRadius: 5, borderColor: "#A9A9A9", padding: 5, width: "100%",
                                                                    height: 50,
                                                                }}
                                                                name="Ackremark"
                                                                value={Ackremark}
                                                                onChange={(e) => updateFormRemarks(e)}
                                                            >
                                                            </Textarea>
                                                        </CssVarsProvider>

                                                    </Box> : null
                                                }
                                            </Box>
                                        </Paper> :


                                        <Box sx={{ width: "100%", mt: 0 }}>
                                            <Paper variant='outlined' sx={{ mt: 1 }} >
                                                <Box sx={{
                                                    width: "100%",
                                                    display: "flex",
                                                    flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'column', xl: 'column', },
                                                }}>
                                                    <Box
                                                        sx={{
                                                            pl: 1, pr: 1, pt: 1,
                                                            display: "flex",
                                                            flexDirection: 'row',
                                                            justifyContent: "space-between"
                                                        }}>
                                                        <CssVarsProvider>
                                                            <Typography sx={{ fontSize: 16, fontWeight: 600 }} >Purchase :

                                                                {
                                                                    ack_status === 1 ?
                                                                        <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="success" variant="outlined"> Acknowledged
                                                                        </Typography> : null
                                                                }
                                                            </Typography>
                                                        </CssVarsProvider>
                                                        {
                                                            ack_date !== null ? <Box
                                                                sx={{
                                                                    display: "flex",
                                                                    flexDirection: 'row',
                                                                    justifyContent: "space-evenly",
                                                                    pr: 2, pt: 1
                                                                }}>
                                                                <CssVarsProvider>
                                                                    <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5 }}>
                                                                        {ack_date}</Typography>
                                                                    <Typography ml={2} sx={{ fontSize: 15 }} >/ </Typography>
                                                                    <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, textTransform: "capitalize" }}>
                                                                        {purchase_ackuser} </Typography>
                                                                </CssVarsProvider>   </Box> : null
                                                        }
                                                    </Box>
                                                    <Box sx={{ width: "100%", pl: 1 }}>
                                                        <CssVarsProvider>
                                                            <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Purchase Remarks: </Typography>
                                                            <Typography ml={10} sx={{ fontSize: 15 }} >{ack_remarks} </Typography>
                                                        </CssVarsProvider>
                                                    </Box>
                                                </Box>
                                            </Paper>
                                            {
                                                po_prepartion !== 1 && po_complete !== 1 ?
                                                    <Paper variant='outlined' sx={{ p: 0, mt: 1 }} >
                                                        <Box sx={{
                                                            display: 'flex', flexDirection: 'row', flexWrap: 'wrap',
                                                        }} >
                                                            <Box sx={{
                                                                width: "100%",
                                                                display: "flex", pl: 1, pt: 1, pb: 1,
                                                                flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                                            }}>
                                                                <CusCheckBox
                                                                    variant="outlined"
                                                                    color="primary"
                                                                    size="md"
                                                                    name="datacollFlag"
                                                                    label="Data Collection Required"
                                                                    value={datacollFlag}
                                                                    onCheked={updateFormRemarks}
                                                                    checked={datacollFlag}
                                                                    disabled={poadding === true || QuatationCall === true ? true : false}
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
                                                                        <CssVarsProvider>
                                                                            <Textarea
                                                                                type="text"
                                                                                size="sm"
                                                                                variant="outlined"
                                                                                minRows={2}
                                                                                maxRows={2}
                                                                                style={{
                                                                                    borderRadius: 5, borderColor: "#A9A9A9", padding: 5, width: "100%",
                                                                                    height: 50,
                                                                                }}
                                                                                name="datacolectremark"
                                                                                value={datacolectremark}
                                                                                onChange={(e) => updateFormRemarks(e)}
                                                                            >
                                                                            </Textarea>
                                                                        </CssVarsProvider>
                                                                    </Box>
                                                                </Box>
                                                                : null}
                                                        </Box>
                                                    </Paper> : null
                                            }


                                            {quatation_calling_status !== 1 && po_prepartion !== 1 && po_complete !== 1 ?
                                                <Paper variant='outlined' sx={{ p: 0, mt: 1 }} >
                                                    <Box sx={{
                                                        display: 'flex', flexDirection: 'row', flexWrap: 'wrap',
                                                    }} >
                                                        <Box sx={{ width: "20%", pr: 1, mt: 1, pl: 1 }}>
                                                            <CusCheckBox
                                                                label="Quatation Call"
                                                                color="primary"
                                                                size="md"
                                                                name="QuatationCall"
                                                                value={QuatationCall}
                                                                checked={QuatationCall}
                                                                onCheked={updateFormRemarks}
                                                                disabled={poadding === true || datacollFlag === true ? true : false}
                                                            />
                                                        </Box>

                                                        {QuatationCall === true ?
                                                            <Box sx={{ width: "50%", pr: 1, mt: 1, pl: 1, mb: 1 }}>
                                                                <CssVarsProvider>
                                                                    <Textarea
                                                                        type="text"
                                                                        size="sm"
                                                                        variant="outlined"
                                                                        minRows={2}
                                                                        maxRows={2}
                                                                        style={{
                                                                            borderRadius: 5, borderColor: "#A9A9A9", padding: 5, width: "100%",
                                                                            height: 50,
                                                                        }}
                                                                        name="QuatationCallremark"
                                                                        value={QuatationCallremark}
                                                                        onChange={(e) => updateFormRemarks(e)}
                                                                    >
                                                                    </Textarea>
                                                                </CssVarsProvider>
                                                            </Box> : null
                                                        }
                                                    </Box>
                                                </Paper> :
                                                <Box>
                                                    {quatation_calling_status === 1 ?
                                                        <Paper variant='outlined' sx={{ mt: 1 }} >
                                                            <Box sx={{
                                                                width: "100%",
                                                                display: "flex",
                                                                flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'column', xl: 'column', },
                                                            }}>
                                                                <Box
                                                                    sx={{
                                                                        pl: 1, pr: 1, pt: 1,
                                                                        display: "flex",
                                                                        flexDirection: 'row',
                                                                        justifyContent: "space-between"
                                                                    }}>
                                                                    <CssVarsProvider>
                                                                        <Typography sx={{ fontSize: 16, fontWeight: 600 }} >Quatation Calling :

                                                                            {
                                                                                quatation_calling_status === 1 ?
                                                                                    <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="success" variant="outlined"> Yes
                                                                                    </Typography> : <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="secondary" variant="outlined"> No
                                                                                    </Typography>
                                                                            }
                                                                        </Typography>
                                                                    </CssVarsProvider>
                                                                    {
                                                                        quatation_calling_date !== null ? <Box
                                                                            sx={{
                                                                                display: "flex",
                                                                                flexDirection: 'row',
                                                                                justifyContent: "space-evenly",
                                                                                pr: 2, pt: 1
                                                                            }}>
                                                                            <CssVarsProvider>
                                                                                <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5 }}>
                                                                                    {quatation_calling_date}</Typography>
                                                                                <Typography ml={2} sx={{ fontSize: 15 }} >/ </Typography>
                                                                                <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, textTransform: "capitalize" }}>
                                                                                    {quatation_user} </Typography>
                                                                            </CssVarsProvider>   </Box> : null
                                                                    }
                                                                </Box>
                                                                <Box sx={{ width: "100%", pl: 1 }}>
                                                                    <CssVarsProvider>
                                                                        <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Quatation Calling Remarks: </Typography>
                                                                        <Typography ml={10} sx={{ fontSize: 15 }} >{quatation_calling_remarks} </Typography>
                                                                    </CssVarsProvider>
                                                                </Box>
                                                            </Box>
                                                        </Paper> : null
                                                    }

                                                    {
                                                        quatation_calling_status === 1 && quatation_negotiation !== 1 ?
                                                            <Paper variant='outlined' sx={{ p: 0, mt: 1 }} >
                                                                <Box sx={{
                                                                    display: 'flex', flexDirection: 'row', flexWrap: 'wrap',
                                                                }} >
                                                                    <Box sx={{ width: "20%", pr: 1, mt: 1, pl: 1 }}>
                                                                        <CusCheckBox
                                                                            label="Quatation Negotiation"
                                                                            color="primary"
                                                                            size="md"
                                                                            name="QuatationNego"
                                                                            value={QuatationNego}
                                                                            checked={QuatationNego}
                                                                            onCheked={updateFormRemarks}
                                                                        />
                                                                    </Box>

                                                                    {QuatationNego === true ?
                                                                        <Box sx={{ width: "50%", pr: 1, mt: 1, pl: 1, mb: 1 }}>
                                                                            <CssVarsProvider>
                                                                                <Textarea
                                                                                    type="text"
                                                                                    size="sm"
                                                                                    variant="outlined"
                                                                                    minRows={2}
                                                                                    maxRows={2}
                                                                                    style={{
                                                                                        borderRadius: 5, borderColor: "#A9A9A9", padding: 5, width: "100%",
                                                                                        height: 50,
                                                                                    }}
                                                                                    name="QuatationNegoremark"
                                                                                    value={QuatationNegoremark}
                                                                                    onChange={(e) => updateFormRemarks(e)}
                                                                                >
                                                                                </Textarea>
                                                                            </CssVarsProvider>
                                                                        </Box> : null
                                                                    }
                                                                </Box>
                                                            </Paper> :
                                                            <Box>
                                                                {quatation_negotiation === 1 ?
                                                                    <Paper variant='outlined' sx={{ mt: 1 }} >
                                                                        <Box sx={{
                                                                            width: "100%",
                                                                            display: "flex",
                                                                            flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'column', xl: 'column', },
                                                                        }}>
                                                                            <Box
                                                                                sx={{
                                                                                    pl: 1, pr: 1, pt: 1,
                                                                                    display: "flex",
                                                                                    flexDirection: 'row',
                                                                                    justifyContent: "space-between"
                                                                                }}>
                                                                                <CssVarsProvider>
                                                                                    <Typography sx={{ fontSize: 16, fontWeight: 600 }} >Quatation Negotation :

                                                                                        {
                                                                                            quatation_negotiation === 1 ?
                                                                                                <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="success" variant="outlined"> Yes
                                                                                                </Typography> : <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="secondary" variant="outlined"> No
                                                                                                </Typography>
                                                                                        }
                                                                                    </Typography>
                                                                                </CssVarsProvider>
                                                                                {
                                                                                    quatation_negotiation_date !== null ? <Box
                                                                                        sx={{
                                                                                            display: "flex",
                                                                                            flexDirection: 'row',
                                                                                            justifyContent: "space-evenly",
                                                                                            pr: 2, pt: 1
                                                                                        }}>
                                                                                        <CssVarsProvider>
                                                                                            <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5 }}>
                                                                                                {quatation_negotiation_date}</Typography>
                                                                                            <Typography ml={2} sx={{ fontSize: 15 }} >/ </Typography>
                                                                                            <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, textTransform: "capitalize" }}>
                                                                                                {quatation_neguser} </Typography>
                                                                                        </CssVarsProvider>   </Box> : null
                                                                                }
                                                                            </Box>
                                                                            <Box sx={{ width: "100%", pl: 1 }}>
                                                                                <CssVarsProvider>
                                                                                    <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Quatation Negotation Remarks: </Typography>
                                                                                    <Typography ml={10} sx={{ fontSize: 15 }} >{quatation_negotiation_remarks} </Typography>
                                                                                </CssVarsProvider>
                                                                            </Box>
                                                                        </Box>
                                                                    </Paper>
                                                                    : null
                                                                }


                                                                {quatation_calling_status === 1 && quatation_fixing !== 1 ?
                                                                    <Paper variant='outlined' sx={{ p: 0, mt: 1 }} >
                                                                        <Box sx={{
                                                                            display: 'flex', flexDirection: 'row', flexWrap: 'wrap',
                                                                        }} >
                                                                            <Box sx={{ width: "20%", pr: 1, mt: 1, pl: 1 }}>
                                                                                <CusCheckBox
                                                                                    label="Quatation Finalizing"
                                                                                    color="primary"
                                                                                    size="md"
                                                                                    name="QuatationFix"
                                                                                    value={QuatationFix}
                                                                                    checked={QuatationFix}
                                                                                    onCheked={updateFormRemarks}

                                                                                />
                                                                            </Box>

                                                                            {QuatationFix === true ?
                                                                                <Box sx={{ width: "50%", pr: 1, mt: 1, pl: 1, mb: 1 }}>
                                                                                    <CssVarsProvider>
                                                                                        <Textarea
                                                                                            type="text"
                                                                                            size="sm"
                                                                                            variant="outlined"
                                                                                            minRows={2}
                                                                                            maxRows={2}
                                                                                            style={{
                                                                                                borderRadius: 5, borderColor: "#A9A9A9", padding: 5, width: "100%",
                                                                                                height: 50,
                                                                                            }}
                                                                                            name="QuatationFixremark"
                                                                                            value={QuatationFixremark}
                                                                                            onChange={(e) => updateFormRemarks(e)}
                                                                                        >
                                                                                        </Textarea>
                                                                                    </CssVarsProvider>
                                                                                </Box> : null
                                                                            }
                                                                        </Box>
                                                                    </Paper> :

                                                                    <Box>
                                                                        {quatation_fixing === 1 ?
                                                                            <Paper variant='outlined' sx={{ mt: 1 }} >
                                                                                <Box sx={{
                                                                                    width: "100%",
                                                                                    display: "flex",
                                                                                    flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'column', xl: 'column', },
                                                                                }}>
                                                                                    <Box
                                                                                        sx={{
                                                                                            pl: 1, pr: 1, pt: 1,
                                                                                            display: "flex",
                                                                                            flexDirection: 'row',
                                                                                            justifyContent: "space-between"
                                                                                        }}>
                                                                                        <CssVarsProvider>
                                                                                            <Typography sx={{ fontSize: 16, fontWeight: 600 }} >Quatation Finalizing :

                                                                                                {
                                                                                                    quatation_fixing === 1 ?
                                                                                                        <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="success" variant="outlined"> Yes
                                                                                                        </Typography> : <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="secondary" variant="outlined"> No
                                                                                                        </Typography>
                                                                                                }
                                                                                            </Typography>
                                                                                        </CssVarsProvider>
                                                                                        {
                                                                                            quatation_fixing_date !== null ? <Box
                                                                                                sx={{
                                                                                                    display: "flex",
                                                                                                    flexDirection: 'row',
                                                                                                    justifyContent: "space-evenly",
                                                                                                    pr: 2, pt: 1
                                                                                                }}>
                                                                                                <CssVarsProvider>
                                                                                                    <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5 }}>
                                                                                                        {quatation_fixing_date}</Typography>
                                                                                                    <Typography ml={2} sx={{ fontSize: 15 }} >/ </Typography>
                                                                                                    <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, textTransform: "capitalize" }}>
                                                                                                        {quatation_fixuser} </Typography>
                                                                                                </CssVarsProvider>   </Box> : null
                                                                                        }
                                                                                    </Box>
                                                                                    <Box sx={{ width: "100%", pl: 1 }}>
                                                                                        <CssVarsProvider>
                                                                                            <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Quatation Finalizing Remarks: </Typography>
                                                                                            <Typography ml={10} sx={{ fontSize: 15 }} >{quatation_fixing_remarks} </Typography>
                                                                                        </CssVarsProvider>
                                                                                    </Box>
                                                                                </Box>
                                                                            </Paper> : null
                                                                        }


                                                                    </Box>
                                                                }
                                                            </Box>
                                                    }
                                                </Box>
                                            }

                                            {
                                                po_complete !== 1 && ((quatation_calling_status !== 1 && quatation_fixing !== 1) ||
                                                    (quatation_calling_status === 1 && quatation_fixing === 1)) ?
                                                    <Paper variant='outlined' sx={{ mt: 1 }} >
                                                        <Box sx={{ width: "20%", pr: 1, mt: 1, pl: 1 }}>
                                                            <CusCheckBox
                                                                label="PO Add"
                                                                color="primary"
                                                                size="md"
                                                                name="poadding"
                                                                value={poadding}
                                                                checked={poadding}
                                                                onCheked={updateFormRemarks}
                                                                disabled={QuatationCall === true || datacollFlag === true ? true : false}
                                                            />
                                                        </Box>
                                                        {
                                                            (poadding === true || po_prepartion === 1) && po_complete !== 1 ?
                                                                <Box sx={{ width: "100%", mt: 0 }}>
                                                                    <Box sx={{
                                                                        width: "100%",
                                                                        display: "flex",
                                                                        flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'column', xl: 'column', },
                                                                    }}>
                                                                        <Typography sx={{ fontSize: 13, fontWeight: 600, pl: 1 }} >PO Details: </Typography>
                                                                        {
                                                                            podetailFlag === 1 ?
                                                                                <Box sx={{ width: "100%", p: 1 }}> Added PO
                                                                                    <CrfReqDetailCmpnt
                                                                                        columnDefs={column}
                                                                                        tableData={getpoDetaildata}
                                                                                    />
                                                                                </Box> : null
                                                                        }
                                                                        <Box sx={{
                                                                            width: "100%",
                                                                            pl: 1, pb: 1,
                                                                            display: "flex",
                                                                            flexDirection: 'row'
                                                                        }}>
                                                                            <Box sx={{
                                                                                width: "15%",
                                                                                display: "flex",
                                                                                pr: 1,
                                                                                flexDirection: "column"
                                                                            }}>
                                                                                <CustomPaperTitle heading="PO No" mandtry={1} />
                                                                                <TextFieldCustom
                                                                                    type="number"
                                                                                    size="sm"
                                                                                    name="po_number"
                                                                                    value={po_number}
                                                                                    onchange={updatePoDetails}
                                                                                />
                                                                            </Box>

                                                                            <Box sx={{
                                                                                width: "20%",
                                                                                display: "flex",
                                                                                flexDirection: "column",
                                                                                pr: 1
                                                                            }}>
                                                                                <CustomPaperTitle heading="PO Date" mandtry={1} />
                                                                                <TextFieldCustom
                                                                                    type="date"
                                                                                    size="sm"
                                                                                    name="po_date"
                                                                                    value={po_date}
                                                                                    onchange={updatePoDetails}
                                                                                />
                                                                            </Box>
                                                                            <Box sx={{
                                                                                width: "20%",
                                                                                display: "flex",
                                                                                flexDirection: "column",
                                                                                pr: 1
                                                                            }}>
                                                                                <CustomPaperTitle heading="Select Store" mandtry={1} />
                                                                                <Box sx={{
                                                                                    pt: 1
                                                                                }}>
                                                                                    <PurchaseStoreSlect
                                                                                        substoreSlno={substoreSlno} setsubStoreSlno={setsubStoreSlno}
                                                                                        setsubStoreName={setsubStoreName} setStoreName={setStoreName}

                                                                                    />
                                                                                </Box>
                                                                            </Box>
                                                                            <Box sx={{
                                                                                width: "20%",
                                                                                display: "flex",
                                                                                flexDirection: "column",
                                                                                pr: 1
                                                                            }}>
                                                                                <CustomPaperTitle heading="Main Store" />
                                                                                <TextFieldCustom
                                                                                    type="text"
                                                                                    size="sm"
                                                                                    name="storeName"
                                                                                    value={storeName}
                                                                                    disabled={true}
                                                                                />
                                                                            </Box>
                                                                            <Box sx={{
                                                                                width: "20%",
                                                                                display: "flex",
                                                                                flexDirection: "column",
                                                                                pr: 1
                                                                            }}>
                                                                                <CustomPaperTitle heading="Expected Delivery Date" mandtry={1} />
                                                                                <TextFieldCustom
                                                                                    slotProps={{
                                                                                        input: {
                                                                                            min: moment(new Date(po_date)).format('YYYY-MM-DD')
                                                                                        },
                                                                                    }}
                                                                                    type="date"
                                                                                    size="sm"
                                                                                    name="expectpo_date"
                                                                                    value={expectpo_date}
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
                                                                            <Box sx={{ width: "100%", pl: 1, pb: 1, pr: 1 }}>
                                                                                <CrfReqDetailCmpnt
                                                                                    columnDefs={column}
                                                                                    tableData={podetailData}
                                                                                />
                                                                            </Box> : null
                                                                        }
                                                                        <Box sx={{
                                                                            display: 'flex', flexDirection: 'row', flexWrap: 'wrap',
                                                                        }} >
                                                                            <Box sx={{ width: "30%", pr: 1, mt: 1, pl: 1 }}>
                                                                                <CusCheckBox
                                                                                    label="Po Complete Ready For Approval"
                                                                                    color="primary"
                                                                                    size="md"
                                                                                    name="poComplete"
                                                                                    value={poComplete}
                                                                                    checked={poComplete}
                                                                                    onCheked={updateFormRemarks}
                                                                                />
                                                                            </Box>
                                                                        </Box>
                                                                    </Box>
                                                                </Box>
                                                                : null
                                                        }
                                                    </Paper>
                                                    : null}

                                            {
                                                po_complete === 1 ?
                                                    <Box sx={{ width: "100%", mt: 0 }}>
                                                        {
                                                            podetailFlag === 1 ?
                                                                <Paper variant='outlined' sx={{ mt: 1 }} >
                                                                    <Box sx={{ width: "100%", p: 1 }}> Added PO Details
                                                                        <CrfReqDetailCmpnt
                                                                            columnDefs={column}
                                                                            tableData={getpoDetaildata}
                                                                        />
                                                                    </Box>
                                                                </Paper> : null
                                                        }
                                                        <Paper variant='outlined' sx={{ mt: 1 }} >
                                                            <Box sx={{ width: "40%", pr: 1, mt: 1, pl: 1 }}>
                                                                <CusCheckBox
                                                                    label="PO Approval Purchase Level"
                                                                    color="primary"
                                                                    size="md"
                                                                    disabled={store_receive === 1 ? true : false}
                                                                    name="poLevelOne"
                                                                    value={poLevelOne}
                                                                    checked={poLevelOne}
                                                                    onCheked={updateFormRemarks}
                                                                />
                                                            </Box>

                                                            <Box sx={{ width: "40%", pr: 1, mt: 1, pl: 1 }}>
                                                                <CusCheckBox
                                                                    label="PO Approval Managing Director"
                                                                    color="primary"
                                                                    size="md"
                                                                    disabled={store_receive === 1 ? true : false}
                                                                    name="poLevelTwo"
                                                                    value={poLevelTwo}
                                                                    checked={poLevelTwo}
                                                                    onCheked={updateFormRemarks}
                                                                />
                                                            </Box>

                                                            <Box sx={{ width: "20%", pr: 1, mt: 1, pl: 1 }}>
                                                                <CusCheckBox
                                                                    label="PO To Supplier"
                                                                    color="primary"
                                                                    size="md"
                                                                    disabled={store_receive === 1 ? true : false}
                                                                    name="poToSupplier"
                                                                    value={poToSupplier}
                                                                    checked={poToSupplier}
                                                                    onCheked={updateFormRemarks}
                                                                />
                                                            </Box>
                                                        </Paper>
                                                    </Box> : null
                                            }
                                        </Box>
                                }

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

export default memo(PurchaseModal)