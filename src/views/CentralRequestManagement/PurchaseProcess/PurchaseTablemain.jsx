
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import CustomCloseIconCmp from '../ComonComponent/Components/CustomCloseIconCmp'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Box } from '@mui/material';
import { CssVarsProvider, IconButton } from '@mui/joy';
import TopViewDesignPurchase from './Component/TopViewDesignPurchase';
import { useQuery, useQueryClient } from 'react-query';
import { getCrfPoApprovals, getCRFPurchaseAck, getCRFQuotationDetails, getPurchaseDataCollection, getStoreList } from 'src/api/CommonApiCRF';
import { Virtuoso } from 'react-virtuoso';
import ReqMastMainViewCmp from './Component/ReqMastMainViewCmp';
import PurchaseApprovalButtonCmp from './Component/PurchaseApprovalButtonCmp';
import { format } from 'date-fns';
import POPendingDetailTable from './Component/POPendingDetailTable';
import { axiosellider, axioslogin } from 'src/views/Axios/Axios';
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode';
import DataCollectionSave from '../ComonComponent/DataCollectionComp/DataCollectionSave';
import _ from 'underscore';
import { useSelector } from 'react-redux';

const PurchaseTablemain = () => {
    const history = useHistory();
    const queryClient = useQueryClient()
    const empdeptsec = useSelector((state) => state.LoginUserData.empsecid, _.isEqual)
    const [radiovalue, setRadioValue] = useState('1')
    const [allData, setAllData] = useState([])
    const [disData, setDisData] = useState([])
    const [combinedData, setcombinedData] = useState([])
    const [crfProcess, setCrfProcess] = useState([])
    const [quoNego, setQuoNego] = useState([])
    const [quoFinal, setQuoFinal] = useState([])
    const [poProcess, setPoProcess] = useState([])
    const [pendingPOList, setPendingPOList] = useState([])
    const [combinedPO, setCombinedPO] = useState([])

    const capitalizeWords = (str) =>
        str ? str
            .toLowerCase()
            .trim()
            .replace(/\s+/g, ' ')
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
            : '';

    const backtoSetting = useCallback(() => {
        history.push('/Home')
    }, [history])

    const { data: ackDetails, isLoading: isAckLoading, error: ackError } = useQuery({
        queryKey: 'getPurchaseAck',
        queryFn: () => getCRFPurchaseAck(),
        staleTime: Infinity
    });

    const ackData = useMemo(() => ackDetails, [ackDetails]);
    const { data: quoDetails, isLoading: isQuoLoading, error: quoError } = useQuery({
        queryKey: 'getQuotationData',
        queryFn: () => getCRFQuotationDetails(),
        staleTime: Infinity
    });

    const quoData = useMemo(() => quoDetails, [quoDetails]);
    const { data: apprvDetails, isLoading: isApprvLoading, error: apprvError } = useQuery({
        queryKey: 'getAprrovalData',
        queryFn: () => getCrfPoApprovals(),
        staleTime: Infinity
    });
    const apprvData = useMemo(() => apprvDetails, [apprvDetails]);

    const { data: storeDetails, isLoading: isStoreLoading, error: storeError } = useQuery({
        queryKey: 'getStoreName',
        queryFn: () => getStoreList(),
        staleTime: Infinity
    });
    const storeList = useMemo(() => storeDetails, [storeDetails]);
    const { data: dataColleDetails, isLoading: isDcLoading, error: dcError } = useQuery({
        queryKey: 'purchaseDataCollection',
        queryFn: () => getPurchaseDataCollection(),
        staleTime: Infinity
    });
    const dataCollection = useMemo(() => dataColleDetails, [dataColleDetails]);

    useEffect(() => {
        if (quoData && quoData.length > 0) {
            const procCrf = quoData?.filter((val) => val.ack_status === 1 && val.quatation_calling_status === 0 &&
                val.po_prepartion === 0 && val.po_complete === 0)
            setCrfProcess(procCrf)

            const nego = quoData?.filter((val) => val.quatation_calling_status === 1 && val.quatation_negotiation === 0)
            setQuoNego(nego)

            const final = quoData?.filter((val) => val.quatation_calling_status === 1 && val.quatation_negotiation === 1
                && val.quatation_fixing === 0)
            setQuoFinal(final)

            const po = quoData?.filter((val) => val.ack_status === 1 &&
                ((val.quatation_calling_status === 1 && val.quatation_fixing === 1 && val.po_prepartion === 0)
                    || (val.po_prepartion === 1 && val.po_complete === 0)))
            setPoProcess(po)
        }

    }, [quoData]);

    useEffect(() => {
        if (radiovalue === '2') {
            setcombinedData(crfProcess)
        } else if (radiovalue === '3') {
            setcombinedData(quoNego)
        } else if (radiovalue === '4') {
            setcombinedData(quoFinal)
        } else if (radiovalue === '5') {
            setcombinedData(poProcess)
        }
    }, [ackData, crfProcess, quoNego, quoFinal, poProcess, radiovalue, dataCollection])

    useEffect(() => {
        if (radiovalue === '1') {
            if (ackData && ackData.length > 0) {
                const datas = ackData?.map((val) => {
                    const obj = {
                        req_status: val.req_status,
                        req_slno: val.req_slno,
                        actual_requirement: val.actual_requirement !== null ? val.actual_requirement : 'Nil',
                        needed: val.needed !== null ? val.needed : 'Nil',
                        request_deptsec_slno: val.request_deptsec_slno,
                        req_deptsec: val.req_deptsec.toLowerCase(),
                        user_deptsection: val.user_deptsection.toLowerCase(),
                        user_deptsec: val.user_deptsec,
                        em_name: val.create_user.toLowerCase(),
                        category: val.category,
                        location: val.location,
                        emergency_flag: val.emergency_flag,
                        emer_type_name: val.emer_type_name,
                        emer_slno: val.emer_slno,
                        emer_type_escalation: val.emer_type_escalation,
                        emergeny_remarks: val.emergeny_remarks,
                        image_status: val.image_status,
                        req_date: val.create_date,
                        expected_date: val.expected_date,
                        dept_id: val.dept_id,
                        dept_name: val.dept_name,
                        dept_type: val.dept_type,
                        dept_type_name: val.dept_type === 1 ? 'Clinical' : val.dept_type === 2 ? 'Non Clinical' : 'Academic',
                        md_approve_req: val.md_approve_req,
                        md_approve: val.md_approve,
                        md: val.md_approve === 1 ? "Approved" : val.md_approve === 2 ? "Rejected" :
                            val.md_approve === 3 ? "On-Hold" : "Not Done",
                        md_approve_remarks: val.md_approve_remarks !== null ? val.md_approve_remarks : "Not Updated",
                        md_detial_analysis: val.md_detial_analysis,
                        md_approve_date: val.md_approve_date,
                        md_user: val.md_user !== null ? val.md_user.toLowerCase() : '',
                        ed_approve_req: val.ed_approve_req,
                        ed_approve: val.ed_approve,
                        ed: val.ed_approve === 1 ? "Approved" : val.ed_approve === 2 ? "Rejected" :
                            val.ed_approve === 3 ? "On-Hold" : "Not Done",
                        ed_approve_remarks: val.ed_approve_remarks !== null ? val.ed_approve_remarks : "",
                        ed_detial_analysis: val.ed_detial_analysis,
                        ed_approve_date: val.ed_approve_date,
                        ed_user: val.ed_user ? val.ed_user.toLowerCase() : '',
                        md_image: val.md_image,
                        ed_image: val.ed_image,
                        managing_director_req: val.managing_director_req,
                        managing_director_approve: val.managing_director_approve,
                        managing: val.managing_director_approve === 1 ? "Approved" : val.managing_director_approve === 2 ? "Rejected" :
                            val.managing_director_approve === 3 ? "On-Hold" : val.managing_director_approve === 4 ? "Approved" : "Not Done",
                        managing_director_remarks: val.managing_director_remarks !== null ? val.managing_director_remarks : "",
                        managing_director_analysis: val.managing_director_analysis,
                        managing_director_approve_date: val.managing_director_approve_date,
                        managing_director_user: val.managing_director_username ? val.managing_director_username.toLowerCase() : '',
                        now_who: "Not Started Purchase Process",
                        now_who_status: 0,
                        ack_status: val.ack_status,
                    }
                    return obj
                })
                setDisData(datas)
                setAllData(datas)
            } else {
                setDisData([])
                setAllData([])
            }
        } else if (radiovalue === '6') {
            if (apprvData) {
                const poLIst = apprvData
                    .filter((po, index, self) =>
                        index === self.findIndex((val) => val.po_number === po.po_number && val.req_slno === po.req_slno))
                    .map((po, ind) => (
                        {
                            slno: ind + 1,
                            po_detail_slno: po.po_detail_slno,
                            req_slno: po.req_slno,
                            po_no: po.po_number,
                            po_date: format(new Date(po.po_date), 'dd-MM-yyyy hh:mm:ss a'),
                            supplier_name: capitalizeWords(po.supplier_name),
                            storeName: capitalizeWords(po.main_store),
                            po_delivery: capitalizeWords(po.po_delivery),
                            po_types: po.po_type === 'S' ? 'Stock Order' : 'Specific',
                            po_amount: po.po_amount,
                            po_expiry: po.po_expiry ? format(new Date(po.po_expiry), 'dd-MM-yyyy') : 'Not Updated',
                            expected_delvery: po.expected_delivery ? format(new Date(po.expected_delivery), 'dd-MM-yyyy') : 'Not Updated',
                            // approval: po.approval_level === 1 ? 'Level 1 ' :
                            //     po.APPROVAL === 2 ? 'Level 2' :
                            //         po.APPROVAL === 3 ? 'Level 3' : 'Not Approved',
                            approval: po.approval_level === 1 ? 'Purchase Dept Approved' :
                                po.approval_level === 2 ? 'Purchase Manager Approved' :
                                    po.approval_level === 3 ? "Director's Approved" : 'Not Approved',
                            aprv_status: po.approval_level
                        }));
                const poItems = apprvData?.map((val) => {
                    const obj = {
                        po_detail_slno: val.po_detail_slno,
                        po_no: val.po_number,
                        item_code: val.item_code,
                        item_name: val.item_name,
                        item_qty: val.item_qty !== null ? val.item_qty : 0,
                        item_rate: val.item_rate !== null ? (val.item_rate) : 0,
                        item_mrp: val.item_mrp !== null ? (val.item_mrp) : 0,
                        tax: val.tax !== null ? val.tax : 'Nil',
                        tax_amount: val.tax_amount !== null ? (val.tax_amount) : 0,
                        net_amount: val.net_amount !== 0 ? (val.net_amount) : 0
                    }
                    return obj
                })
                const mergedData = poLIst?.map(po => {
                    const details = poItems?.filter(item => item.po_no === po.po_no && item.po_detail_slno === po.po_detail_slno);
                    return {
                        ...po,
                        items: details
                    };
                });
                setCombinedPO(mergedData)
                setPendingPOList(mergedData)
            } else {
                setCombinedPO([])
                setPendingPOList([])
            }
        }
        else if (radiovalue === '7') {
            if (dataCollection) {
                const newData = dataCollection?.map((val) => {
                    const obj = {
                        req_slno: val.req_slno,
                        actual_requirement: val.actual_requirement,
                        needed: val.needed,
                        request_deptsec_slno: val.request_deptsec_slno,
                        req_deptsec: val.req_deptsec.toLowerCase(),
                        user_deptsection: val.user_deptsection.toLowerCase(),
                        em_name: val.create_user.toLowerCase(),
                        category: val.category,
                        location: val.location,
                        emergency_flag: val.emergency_flag,
                        emer_type_name: val.emer_type_name,
                        emer_slno: val.emer_slno,
                        emer_type_escalation: val.emer_type_escalation,
                        emergeny_remarks: val.emergeny_remarks,
                        total_approx_cost: val.total_approx_cost,
                        image_status: val.image_status,
                        req_date: val.req_date,
                        expected_date: val.expected_date,
                        crf_dept_remarks: val.crf_dept_remarks,
                        data_entered: val.data_entered !== null ? val.data_entered.toLowerCase() : '',
                        reqest_one: val.reqest_one,
                        req_user: val.requser !== null ? val.requser.toLowerCase() : '',
                        datagive_user: val.saveuser !== null ? val.saveuser.toLowerCase() : '',
                        dc_req_date: val.dc_req_date,
                        update_date: val.update_date,
                        crf_req_remark: val.crf_req_remark,
                        data_coll_image_status: val.data_coll_image_status,
                        crf_data_collect_slno: val.crf_data_collect_slno,
                        crf_requst_slno: val.crf_requst_slno,
                        requser: val.requser.toLowerCase(),
                        crf_dept_status: val.crf_dept_status,
                        crm_purchase_slno: val.crm_purchase_slno,
                        ack_status: val.ack_status,
                        ack_remarks: val.ack_remarks,
                        purchase_ackuser: val.purchase_ackuser,
                        ack_date: val.ack_date,
                        quatation_calling_status: val.quatation_calling_status,
                        quatation_calling_remarks: val.quatation_calling_remarks,
                        quatation_calling_date: val.quatation_calling_date,
                        quatation_user: val.quatation_user,
                        quatation_negotiation: val.quatation_negotiation,
                        quatation_negotiation_remarks: val.quatation_negotiation_remarks,
                        quatation_negotiation_date: val.quatation_negotiation_date,
                        quatation_neguser: val.quatation_neguser,
                        quatation_fixing: val.quatation_fixing,
                        quatation_fixing_remarks: val.quatation_fixing_remarks,
                        quatation_fixing_date: val.quatation_fixing_date,
                        quatation_fixuser: val.quatation_fixuser,
                        po_prepartion: val.po_prepartion
                    }
                    return obj
                })
                setDisData(newData)
            } else {
                setDisData([])
            }
        }
        else {
            if (combinedData && combinedData.length > 0) {
                const datas = combinedData?.map((val) => {
                    const obj = {
                        req_status: val.req_status,
                        req_slno: val.req_slno,
                        actual_requirement: val.actual_requirement !== null ? val.actual_requirement : 'Nil',
                        needed: val.needed !== null ? val.needed : 'Nil',
                        request_deptsec_slno: val.request_deptsec_slno,
                        req_deptsec: val.req_deptsec.toLowerCase(),
                        user_deptsection: val.user_deptsection.toLowerCase(),
                        user_deptsec: val.user_deptsec,
                        em_name: val.create_user.toLowerCase(),
                        category: val.category,
                        location: val.location,
                        emergency_flag: val.emergency_flag,
                        emer_type_name: val.emer_type_name,
                        emer_slno: val.emer_slno,
                        emer_type_escalation: val.emer_type_escalation,
                        emergeny_remarks: val.emergeny_remarks,
                        image_status: val.image_status,
                        req_date: val.create_date,
                        expected_date: val.expected_date,
                        dept_id: val.dept_id,
                        dept_name: val.dept_name,
                        dept_type: val.dept_type,
                        dept_type_name: val.dept_type === 1 ? 'Clinical' : val.dept_type === 2 ? 'Non Clinical' : 'Academic',
                        md_approve_req: val.md_approve_req,
                        md_approve: val.md_approve,
                        md: val.md_approve === 1 ? "Approved" : val.md_approve === 2 ? "Rejected" :
                            val.md_approve === 3 ? "On-Hold" : "Not Done",
                        md_approve_remarks: val.md_approve_remarks !== null ? val.md_approve_remarks : "Not Updated",
                        md_detial_analysis: val.md_detial_analysis,
                        md_approve_date: val.md_approve_date,
                        md_user: val.md_user !== null ? val.md_user.toLowerCase() : '',
                        ed_approve_req: val.ed_approve_req,
                        ed_approve: val.ed_approve,
                        ed: val.ed_approve === 1 ? "Approved" : val.ed_approve === 2 ? "Rejected" :
                            val.ed_approve === 3 ? "On-Hold" : "Not Done",
                        ed_approve_remarks: val.ed_approve_remarks !== null ? val.ed_approve_remarks : "",
                        ed_detial_analysis: val.ed_detial_analysis,
                        ed_approve_date: val.ed_approve_date,
                        ed_user: val.ed_user ? val.ed_user.toLowerCase() : '',
                        managing_director_req: val.managing_director_req,
                        managing_director_approve: val.managing_director_approve,
                        managing: val.managing_director_approve === 1 ? "Approved" : val.managing_director_approve === 2 ? "Rejected" :
                            val.managing_director_approve === 3 ? "On-Hold" : val.managing_director_approve === 4 ? "Approved" : "Not Done",
                        managing_director_remarks: val.managing_director_remarks !== null ? val.managing_director_remarks : "",
                        managing_director_analysis: val.managing_director_analysis,
                        managing_director_approve_date: val.managing_director_approve_date,
                        managing_director_user: val.managing_director_username ? val.managing_director_username.toLowerCase() : '',
                        managing_director_image: val.managing_director_image,
                        md_image: val.md_image,
                        ed_image: val.ed_image,
                        crm_purchase_slno: val.crm_purchase_slno,
                        ack_status: val.ack_status,
                        ack_remarks: val.ack_remarks,
                        purchase_ackuser: val.purchase_ackuser,
                        ack_date: val.ack_date,
                        quatation_calling_status: val.quatation_calling_status,
                        quatation_calling_remarks: val.quatation_calling_remarks,
                        quatation_calling_date: val.quatation_calling_date,
                        quatation_user: val.quatation_user,
                        quatation_negotiation: val.quatation_negotiation,
                        quatation_negotiation_remarks: val.quatation_negotiation_remarks,
                        quatation_negotiation_date: val.quatation_negotiation_date,
                        quatation_neguser: val.quatation_neguser,
                        quatation_fixing: val.quatation_fixing,
                        quatation_fixing_remarks: val.quatation_fixing_remarks,
                        quatation_fixing_date: val.quatation_fixing_date,
                        quatation_fixuser: val.quatation_fixuser,
                        po_prepartion: val.po_prepartion,
                        po_complete: val.po_complete,
                        po_complete_date: val.po_complete_date,
                        po_to_supplier: val.po_to_supplier,
                        po_to_supplier_date: val.po_to_supplier_date,
                        store_recieve: val.store_recieve,
                        sub_store_recieve: val.sub_store_recieve,
                        now_who: val.approval_level === 3 ? "Director's Approved" :
                            val.approval_level === 2 ? 'Purchase Manager Approved' :
                                val.approval_level === 1 ? 'Purchase Dpt Approved' :
                                    val.po_complete === 1 ? "PO Completed" :
                                        val.po_prepartion === 1 ? "PO Prepairing" :
                                            val.quatation_fixing === 1 ? "Quotation Fixed" :
                                                val.quatation_negotiation === 1 ? "Quotation Negotiation" :
                                                    val.quatation_calling_status === 1 ? "Quotation Calling" :
                                                        val.ack_status === 1 ? "Puchase Acknowledged" :
                                                            "Not Started Purchase Process",

                        now_who_status: val.po_to_supplier === 5 ? val.po_to_supplier :
                            val.po_approva_level_two === 5 ? val.po_approva_level_two :
                                val.po_approva_level_one === 5 ? val.po_approva_level_one :
                                    val.po_complete === 5 ? val.po_complete :
                                        val.po_prepartion === 5 ? val.po_prepartion :
                                            val.quatation_fixing === 5 ? val.quatation_fixing :
                                                val.quatation_negotiation === 5 ? val.quatation_negotiation :
                                                    val.quatation_calling_status === 5 ? val.quatation_calling_status :
                                                        val.ack_status === 5 ? val.ack_status :
                                                            0,

                    }
                    return obj
                })
                setDisData(datas)
                setAllData(datas)
            }
            else {
                setDisData([])
                setAllData([])
            }
        }

    }, [combinedData, radiovalue, apprvData, dataCollection, ackData])

    const RefreshData = useCallback(() => {
        const getPendingPODetails = async () => {
            const result = await axioslogin.get('/newCRFPurchase/getPO');
            return result.data
        }
        const getPOdetails = async (posearch) => {
            const result = await axiosellider.post('/crfpurchase/getpendingpo', posearch);
            return result.data
        }
        const UpdatePOLevels = async (patchdata) => {

            const result = await axioslogin.post('/newCRFPurchase/updateApprovalLevel', patchdata)
            return result.data
        }
        getPendingPODetails().then((val) => {
            const { success, data } = val
            if (success === 1) {
                const posearch = data?.map((val) => {
                    return {
                        pono: val.po_number,
                        stcode: val.crs_store_code
                    }
                })
                getPOdetails(posearch).then((val) => {
                    const { success, data: elliderData } = val
                    if (success === 1) {
                        const patchdata = elliderData?.map((val) => {
                            const newData = storeList?.find((value) => (value.crs_store_code === val.ST_CODE))
                            return {
                                approval_level: (typeof val.APPROVAL === 'number' && val.APPROVAL > 3) ? 3 : val.APPROVAL || null,
                                po_expiry: val.PO_EXPIRY !== null ? format(new Date(val.PO_EXPIRY), 'yyyy-MM-dd') : null,
                                expected_delivery: val.EXPECTED_DATE !== null ? format(new Date(val.EXPECTED_DATE), 'yyyy-MM-dd') : null,
                                po_number: val.PO_NO,
                                supply_store: newData ? newData.main_store_slno : 0
                            }
                        })
                        UpdatePOLevels(patchdata).then((val) => {
                            const { success, message } = val
                            if (success === 1) {
                                queryClient.invalidateQueries('getAprrovalData')
                                // setOpen(false)
                                succesNotify(message)
                            }
                            else {
                                queryClient.invalidateQueries('getAprrovalData')
                                // setOpen(false)
                            }
                        })
                    }
                    else if (success === 2) {
                        queryClient.invalidateQueries('getAprrovalData')
                        // setOpen(false)
                        // succesNotify("Updated")
                    }
                })
            } else {
                queryClient.invalidateQueries('getAprrovalData')
                // setOpen(false)
            }
        })
    }, [storeList, queryClient])

    const viewAllData = useCallback(() => {
        setPendingPOList(combinedPO)
    }, [combinedPO])
    const getNotApproved = useCallback(() => {
        const newData = combinedPO?.filter(val => val.aprv_status === null);
        if (newData.length === 0) {
            infoNotify("Selected Report Not Found")
        } else {
            setPendingPOList(newData)
        }
    }, [combinedPO])
    const purchaseDeptApproved = useCallback(() => {
        const newData = combinedPO?.filter(val => val.aprv_status === 1);
        if (newData.length === 0) {
            infoNotify("Selected Report Not Found")
        } else {
            setPendingPOList(newData)
        }
    }, [combinedPO])
    const purchaseManagerApproved = useCallback(() => {
        const newData = combinedPO?.filter(val => val.aprv_status === 2);
        if (newData.length === 0) {
            infoNotify("Selected Report Not Found")
        } else {
            setPendingPOList(newData)
        }
    }, [combinedPO])
    const directorsApproved = useCallback(() => {
        const newData = combinedPO?.filter(val => val.aprv_status === 3);
        if (newData.length === 0) {
            infoNotify("Selected Report Not Found")
        } else {
            setPendingPOList(newData)
        }
    }, [combinedPO])

    if (isAckLoading || isQuoLoading || isApprvLoading || isStoreLoading || isDcLoading) return <p>Loading...</p>;
    if (ackError || quoError || apprvError || storeError || dcError) return <p>Error occurred.</p>;

    return (
        <Box sx={{ height: window.innerHeight - 80, flexWrap: 'wrap', bgcolor: 'white', }}>
            <Box sx={{ display: 'flex', backgroundColor: "#f0f3f5", border: '1px solid #B4F5F0' }}>
                <Box sx={{ fontWeight: 550, flex: 1, pl: 1, pt: .5, color: '#385E72', }}>CRF Purchase</Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', flex: 1, fontSize: 20, m: 0.5 }}>
                    <CssVarsProvider>
                        <CustomCloseIconCmp
                            handleChange={backtoSetting}
                        />
                    </CssVarsProvider>
                </Box>
            </Box>
            <Box>
                <TopViewDesignPurchase radiovalue={radiovalue} setRadioValue={setRadioValue} ackPending={ackData}
                    crfProcess={crfProcess} quoNego={quoNego} quoFinal={quoFinal} poProcess={poProcess} allData={allData}
                    setDisData={setDisData} apprvCount={pendingPOList} dataCollection={dataCollection} />
            </Box>
            {
                radiovalue === '6' ?
                    <Box sx={{ flexWrap: 'wrap', pt: 0.5, maxHeight: window.innerHeight - 220 }}>
                        {combinedPO?.length !== 0 ?
                            <>
                                <Box
                                    sx={{
                                        bgcolor: '#eeeeee',
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                        flexWrap: 'wrap',
                                        padding: '0 16px',
                                        gap: 0.5, p: 0.7
                                    }}
                                >
                                    <Box sx={{ flex: '1 1 auto', minWidth: '100px', }}>
                                        <CssVarsProvider>
                                            <IconButton
                                                variant="outlined"
                                                sx={{
                                                    backgroundColor: '#ADD8E6',
                                                    width: '100%',
                                                    fontSize: 12,
                                                    '&:hover': {
                                                        bgcolor: '#fafafa',
                                                        color: '#003B73',
                                                        transform: 'scale(0.98)',
                                                    },
                                                    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.16)',
                                                    borderRadius: 5,
                                                    height: '30px',
                                                    lineHeight: '1',
                                                }}
                                                onClick={getNotApproved}
                                            >
                                                Not Approved
                                            </IconButton>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ flex: '1 1 auto', minWidth: '100px' }}>
                                        <CssVarsProvider>
                                            <IconButton
                                                variant="outlined"
                                                sx={{
                                                    backgroundColor: '#5CACEE',
                                                    color: 'white',
                                                    width: '100%',
                                                    fontSize: 12,
                                                    '&:hover': {
                                                        bgcolor: '#fafafa',
                                                        color: '#003B73',
                                                        transform: 'scale(0.98)',
                                                    },
                                                    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.16)',
                                                    borderRadius: 5,
                                                    height: '30px',
                                                    lineHeight: '1',
                                                }}
                                                onClick={purchaseDeptApproved}
                                            >
                                                Purchase Dept Approved
                                            </IconButton>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ flex: '1 1 auto', minWidth: '100px' }}>
                                        <CssVarsProvider>
                                            <IconButton
                                                variant="outlined"
                                                sx={{
                                                    backgroundColor: '#0277bd',
                                                    color: 'white',
                                                    width: '100%',
                                                    fontSize: 12,
                                                    '&:hover': {
                                                        bgcolor: '#fafafa',
                                                        color: '#003B73',
                                                        transform: 'scale(0.98)',
                                                    },
                                                    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.16)',
                                                    borderRadius: 5,
                                                    height: '30px',
                                                    lineHeight: '1',
                                                }}
                                                onClick={purchaseManagerApproved}
                                            >
                                                Purchase Manager Approved
                                            </IconButton>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ flex: '1 1 auto', minWidth: '100px' }}>
                                        <CssVarsProvider>
                                            <IconButton
                                                variant="outlined"
                                                sx={{
                                                    backgroundColor: '#32CD32',
                                                    color: 'white',
                                                    width: '100%',
                                                    fontSize: 12,
                                                    '&:hover': {
                                                        bgcolor: '#fafafa',
                                                        color: '#003B73',
                                                        transform: 'scale(0.98)',
                                                    },
                                                    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.16)',
                                                    borderRadius: 5,
                                                    height: '30px',
                                                    lineHeight: '1',
                                                }}
                                                onClick={directorsApproved}
                                            >
                                                Director&apos;s Approved
                                            </IconButton>
                                        </CssVarsProvider>
                                    </Box>

                                    <Box sx={{ flex: '1 1 auto', minWidth: '100px' }}>
                                        <CssVarsProvider>
                                            <IconButton
                                                variant="outlined"
                                                sx={{
                                                    backgroundColor: '#00695c',
                                                    color: 'white',
                                                    width: '100%',
                                                    fontSize: 12,
                                                    '&:hover': {
                                                        bgcolor: '#fafafa',
                                                        color: '#003B73',
                                                        transform: 'scale(0.98)',
                                                    },
                                                    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.16)',
                                                    borderRadius: 5,
                                                    height: '30px',
                                                    lineHeight: '1',
                                                }}
                                                onClick={viewAllData}
                                            >
                                                View All
                                            </IconButton>
                                        </CssVarsProvider>
                                    </Box>

                                    <Box sx={{ flex: '1 1 auto', minWidth: '100px' }}>
                                        <CssVarsProvider>
                                            <IconButton
                                                variant="outlined"
                                                sx={{
                                                    backgroundColor: 'white',
                                                    width: '100%',
                                                    fontSize: 12,
                                                    '&:hover': {
                                                        bgcolor: '#fafafa',
                                                        color: '#003B73',
                                                        transform: 'scale(0.98)',
                                                    },
                                                    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.16)',
                                                    borderRadius: 5,
                                                    height: '30px',
                                                    lineHeight: '1',
                                                }}
                                                onClick={RefreshData}
                                            >
                                                Get Approval Status From Ellider
                                            </IconButton>
                                        </CssVarsProvider>
                                    </Box>
                                </Box>
                                <Box>
                                    <POPendingDetailTable pendingPOList={pendingPOList} />
                                </Box>
                            </>
                            : <Box sx={{
                                display: 'flex', justifyContent: 'center', fontSize: 25, opacity: 0.5,
                                pt: 10, color: 'grey'
                            }}>
                                No PO Approvals Are Pending
                            </Box>}
                    </Box>
                    :
                    <Box sx={{ height: window.innerHeight - 260, overflow: 'auto', flexWrap: 'wrap', }}>
                        {disData.length !== 0 ?
                            <Virtuoso
                                data={disData}
                                totalCount={disData?.length}
                                itemContent={(index, val) =>
                                    <Box key={index} sx={{
                                        width: "100%", mt: 0.8, flexWrap: 'wrap',
                                        border: '1px solid #21B6A8', borderRadius: 2,
                                    }}>
                                        <ReqMastMainViewCmp val={val} />
                                        {radiovalue === '7' ?
                                            <DataCollectionSave flag={5} val={val} empdeptsec={empdeptsec} />
                                            :
                                            <PurchaseApprovalButtonCmp val={val} />
                                        }
                                        {/* <PurchaseApprovalButtonCmp val={val}
                                            setpuchaseFlag={setpuchaseFlag} setpuchaseModal={setpuchaseModal}
                                            puchaseData={puchaseData} setpuchaseData={setpuchaseData} setImageShowFlag={setImageShowFlag}
                                            setImageShow={setImageShow} setImageSlno={setImageSlno} /> */}
                                    </Box>
                                }
                            >
                            </Virtuoso>
                            :
                            <Box sx={{
                                display: 'flex', justifyContent: 'center', fontSize: 25, opacity: 0.5,
                                pt: 10, color: 'grey'
                            }}>
                                No Report Found
                            </Box>}
                    </Box>
            }
        </Box>
    )
}

export default memo(PurchaseTablemain)