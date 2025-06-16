import React, { Fragment, useCallback, useState, memo, useEffect, useMemo } from 'react'
import { axioskmc, axioslogin } from 'src/views/Axios/Axios';
import _ from 'underscore'
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import CustomPaperTitle from 'src/views/Components/CustomPaperTitle'
import { useDispatch, useSelector } from 'react-redux'
import { getUOM } from 'src/redux/actions/AmUOMList.action'
import { format } from 'date-fns';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Box, IconButton, Table, Textarea, Typography } from '@mui/joy';
import UomApprvSelect from '../ComonComponent/Components/UomApprvSelect';
import CustomInputDateCmp from '../ComonComponent/Components/CustomInputDateCmp';
import CustomIconButtonCmp from '../ComonComponent/Components/CustomIconButtonCmp';
import { useQuery, useQueryClient } from 'react-query';
import { getApprovedCrfItems, getApprovedStatus, getDefaultCompany, getMaxslNoOfCrfItem } from 'src/api/CommonApiCRF';
import CustomToolTipForCRF from '../ComonComponent/Components/CustomToolTipForCRF';
import { getApprovedCrfItemskmc, getApprovedStatuskmc, getMaxslNoOfCrfItemkmc } from 'src/api/CommonApiCRFKmc';
import CusCheckBox from 'src/views/Components/CusCheckBox';
import CrfComplaintdep from 'src/views/CommonSelectCode/CrfComplaintdep';
import { getComplaintSlno } from 'src/views/Constant/Constant';


const ItemsApprovalCompnt = ({ req_slno, setMoreItem, setApproveTableData, editEnable, crf_data_collect_status, selectedCompany,
    setEditEnable, header, apprvLevel, depkmc, ApprovalData }) => {
    const { req_deptsec, request_deptsec_slno, actual_requirement, expected_date, needed } = ApprovalData

    const queryClient = useQueryClient()
    const dispatch = useDispatch();
    const id = useSelector((state) => state.LoginUserData.empid, _.isEqual)
    // const dept = useSelector((state) => state.LoginUserData.empdept, _.isEqual)
    // const empsecid = useSelector((state) => state.LoginUserData.empsecid, _.isEqual)
    const emid = Array.isArray(id) ? id : [id];

    const [complaint_slno, setComplaint] = useState(0)
    const [count, setCount] = useState(0)
    const [insertId, setInsertId] = useState(0)

    const [uom, setUOM] = useState(0)
    const [lastSlno, setLastSlno] = useState(0)
    const [apprvdItems, setApprvdItems] = useState([])
    const [combaineditem, setcombaineditem] = useState([])
    const [combainedslno, setcombainedslno] = useState([])
    const [Statusdatamain, setstatusdata] = useState([])
    const [crfdept, setCrfDept] = useState(0)
    const [complaint, setcomplaint] = useState(true)
    const [task, settask] = useState(true)
    const [crfHod, setCrfHod] = useState([])
    // const hod = Array.isArray(crfHod) ? crfHod : [crfHod];


    const { department_slno } = crfdept


    const { data: companyData, isLoading: isCompLoading, error: compError } = useQuery({
        queryKey: 'getdefaultCompany',
        queryFn: () => getDefaultCompany(),
        staleTime: Infinity
    });
    const company = useMemo(() => companyData, [companyData]);

    const [checkStatus, setCheckStatus] = useState([])
    const [itemstate, setItemState] = useState({
        reqDetailslno: 0,
        item_desc: '',
        item_brand: '',
        item_spec: '',
        item_slno: 0,
        unitprice: 0,
        approx_cost: 0,
        item_desc_actl: '',
        item_qty: 0,
        po_item_status: ''
    })
    //Destructuring
    const { reqDetailslno, item_desc, item_brand, item_spec, item_slno, unitprice, approx_cost, item_desc_actl, item_qty } = itemstate
    const updateItemState = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setItemState({ ...itemstate, [e.target.name]: value })
    }, [itemstate])

    const [rejHoldRemarkFlag, setRejHoldRemarkFlag] = useState(0)
    const [rejHoldRemark, setRejHoldRemark] = useState('')
    const updateRemark = useCallback((e) => {
        setRejHoldRemark(e.target.value)
    }, [])

    useEffect(() => {
        dispatch(getUOM())
    }, [dispatch])
    // for getting hod
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
    const OnchangeQty = useCallback((e) => {
        setItemState(prev => ({
            ...prev,
            item_qty: (e.target.value),
            approx_cost: (unitprice !== '' || unitprice !== 0) ? (unitprice * e.target.value) : 0
        }))
    }, [unitprice])

    const updateUnitPrice = useCallback((e) => {
        if (item_qty !== 0) {
            setItemState(prev => ({
                ...prev,
                unitprice: (e.target.value),
                approx_cost: (item_qty !== '') ? (item_qty * e.target.value) : 0
            }))
        }
        else {
            warningNotify("Provide the quantity before specifying the unit price")
        }
    }, [item_qty])

    const { data: iteData, isLoading: isItemsLoading, error: itemsError } = useQuery({
        queryKey: ['approvedRejholdItemList', req_slno],
        queryFn: () => getApprovedCrfItems(req_slno),
        staleTime: Infinity
    });
    const itemData = useMemo(() => iteData, [iteData])

    const { data: kmciteData, isLoading: isItemskmcLoading, error: kmcitemsError } = useQuery({
        queryKey: ['approvedRejholdItemListkmc', req_slno],
        queryFn: () => getApprovedCrfItemskmc(req_slno),
        staleTime: Infinity
    });
    const kmcitemData = useMemo(() => kmciteData, [kmciteData])

    const { data: statData, isLoading: isStatusLoading, error: statusError } = useQuery({
        queryKey: ['itemStatus', req_slno],
        queryFn: () => getApprovedStatus(req_slno),
        staleTime: Infinity
    });
    const statusData = useMemo(() => statData, [statData])

    const { data: kmcstatData, isLoading: kmcisStatusLoading, error: kmcstatusError } = useQuery({
        queryKey: ['itemStatuskmc', req_slno],
        queryFn: () => getApprovedStatuskmc(req_slno),
        staleTime: Infinity
    });
    const statusDatakmc = useMemo(() => kmcstatData, [kmcstatData])

    useEffect(() => {
        if (selectedCompany === "1") {
            setstatusdata(statusData)
        } else if (selectedCompany === "2") {
            setstatusdata(statusDatakmc)
        } else {
            setstatusdata(statusData)
        }
        if (Statusdatamain && Statusdatamain.length !== 0) {
            if (apprvLevel === 1) {
                // incharge
                const newData = Statusdatamain?.map((val) => {
                    return {
                        req_detl_slno: val.req_detl_slno,
                        higher: val.item_hod_approve !== 0 || val.item_dms_approve !== 0 || val.item_ms_approve !== 0 ||
                            val.item_mo_approve !== 0 || val.item_smo_approve !== 0 || val.item_gm_approve !== 0 ||
                            val.item_md_approve !== 0 || val.item_ed_approve !== 0 ? 1 : 0
                        // higher=1 then can't edit else can edit
                    }
                })
                setCheckStatus(newData)
            }
            else if (apprvLevel === 2) {
                // hod
                const newData = Statusdatamain?.map((val) => {
                    return {
                        req_detl_slno: val.req_detl_slno,
                        higher: val.item_dms_approve !== 0 || val.item_ms_approve !== 0 ||
                            val.item_mo_approve !== 0 || val.item_smo_approve !== 0 || val.item_gm_approve !== 0 ||
                            val.item_md_approve !== 0 || val.item_ed_approve !== 0 ? 1 : 0
                    }
                })
                setCheckStatus(newData)

            }
            else if (apprvLevel === 3) {
                // dms
                const newData = Statusdatamain?.map((val) => {
                    return {
                        req_detl_slno: val.req_detl_slno,
                        higher: val.item_ms_approve !== 0 || val.item_mo_approve !== 0 || val.item_smo_approve !== 0 ||
                            val.item_gm_approve !== 0 || val.item_md_approve !== 0 || val.item_ed_approve !== 0 ? 1 : 0
                    }
                })
                setCheckStatus(newData)
            }
            else if (apprvLevel === 4) {
                // ms
                const newData = Statusdatamain?.map((val) => {
                    return {
                        req_detl_slno: val.req_detl_slno,
                        higher: val.item_mo_approve !== 0 || val.item_smo_approve !== 0 || val.item_gm_approve !== 0 ||
                            val.item_md_approve !== 0 || val.item_ed_approve !== 0 ? 1 : 0
                    }
                })
                setCheckStatus(newData)
            }
            else if (apprvLevel === 5) {
                // mo
                const newData = Statusdatamain?.map((val) => {
                    return {
                        req_detl_slno: val.req_detl_slno,
                        higher: val.item_smo_approve !== 0 || val.item_gm_approve !== 0 ||
                            val.item_md_approve !== 0 || val.item_ed_approve !== 0 ? 1 : 0
                    }
                })
                setCheckStatus(newData)
            }
            else if (apprvLevel === 6) {
                // smo
                const newData = Statusdatamain?.map((val) => {
                    return {
                        req_detl_slno: val.req_detl_slno,
                        higher: val.item_gm_approve !== 0 || val.item_md_approve !== 0 || val.item_ed_approve !== 0 ? 1 : 0
                    }
                })
                setCheckStatus(newData)
            }
            else if (apprvLevel === 7) {
                // gm
                const newData = Statusdatamain?.map((val) => {
                    return {
                        req_detl_slno: val.req_detl_slno,
                        higher: val.item_md_approve !== 0 || val.item_ed_approve !== 0 ? 1 : 0
                    }
                })
                setCheckStatus(newData)
            }
            else if (apprvLevel === 8 || apprvLevel === 9 || apprvLevel === 10) {
                // md and ed
                const newData = Statusdatamain?.map((val) => {
                    return {
                        req_detl_slno: val.req_detl_slno,
                        higher: 0
                    }
                })
                setCheckStatus(newData)
            }
        }
    }, [Statusdatamain, apprvLevel])

    useEffect(() => {
        if (selectedCompany === "1") {
            setcombaineditem(itemData)
        } else if (selectedCompany === "2") {
            setcombaineditem(kmcitemData)
        }
        else {
            setcombaineditem(itemData)
        }
        if (combaineditem && combaineditem.length !== 0) {
            if (checkStatus && checkStatus.length !== 0) {
                const newData = combaineditem?.map((val) => {
                    const itstatus = checkStatus?.find(item => item.req_detl_slno === val.req_detl_slno)
                    return {
                        ...val,
                        higher: itstatus ? itstatus.higher : 0
                    }
                })
                setApproveTableData(newData)
                setApprvdItems(newData)
            }
            else {
                const newData = combaineditem?.map((val) => {
                    return {
                        ...val,
                        higher: 1
                    }
                })
                setApproveTableData(newData)
                setApprvdItems(newData)
            }
        }
    }, [combaineditem, setApproveTableData, checkStatus, selectedCompany, itemData, kmcitemData])
    const { data: maxSlnoData, isLoading: isSlnoLoading, error: slnoError } = useQuery({
        queryKey: ['getmaxSlno', req_slno],
        queryFn: () => getMaxslNoOfCrfItem(req_slno),
        staleTime: Infinity
    });
    const { data: kmcmaxSlnoData, isLoading: kmcisSlnoLoading, error: kmcslnoError } = useQuery({
        queryKey: ['getmaxSlnokmc', req_slno],
        queryFn: () => getMaxslNoOfCrfItemkmc(req_slno),
        staleTime: Infinity
    });

    useEffect(() => {
        if (selectedCompany === "1") {
            setcombainedslno(maxSlnoData)

        } else if (selectedCompany === "2") {
            setcombainedslno(kmcmaxSlnoData)

        } else {
            setcombainedslno(maxSlnoData)
        }
        if (combainedslno && combainedslno.length !== 0) {
            const { maxSlno } = combainedslno[0];
            setLastSlno(maxSlno);
        } else {
            setLastSlno(0);
        }
    }, [combainedslno, kmcmaxSlnoData, maxSlnoData])

    const editSelect = useCallback((val) => {
        const { req_detl_slno, approve_aprox_cost, item_slno, approve_item_desc, approve_item_brand,
            approve_item_unit, approve_item_unit_price, approve_item_specification, item_qnty_approved,
            po_item_status
        } = val
        setEditEnable(1)
        setItemState(prev => ({
            ...prev,
            item_slno: item_slno,
            item_desc: approve_item_desc,
            item_brand: approve_item_brand,
            item_spec: approve_item_specification,
            item_qty: item_qnty_approved,
            unitprice: approve_item_unit_price,
            approx_cost: approve_aprox_cost,
            reqDetailslno: req_detl_slno,
            po_item_status: po_item_status,
            item_desc_actl: approve_item_desc
        }));
        setUOM(approve_item_unit !== null ? approve_item_unit : 0)
        setMoreItem(0)
    }, [setMoreItem, setEditEnable])

    const reset = useCallback(() => {
        setEditEnable(0)
        const resetarrray = {
            reqDetailslno: 0,
            item_desc: '',
            item_brand: '',
            item_spec: '',
            item_slno: 0,
            unitprice: 0,
            approx_cost: 0,
            item_desc_actl: '',
            item_qty: 0,
            po_item_status: ''
        }
        setItemState(resetarrray)
        setUOM(0)
        setLastSlno(0)
        setRejHoldRemarkFlag(0)
        setRejHoldRemark('')
        setMoreItem(0)
    }, [setMoreItem, setEditEnable])

    const Approvefctn = useCallback(() => {
        if (item_desc === item_desc_actl) {
            const approvedata = {
                approve_item_desc: item_desc,
                approve_item_brand: item_brand,
                approve_item_unit: uom,
                item_qnty_approved: item_qty,
                approve_item_specification: item_spec,
                approve_item_unit_price: unitprice,
                approve_aprox_cost: approx_cost,
                approve_item_status: 1,
                item_status_approved: 1,// appvd
                edit_user: id,
                req_detl_slno: reqDetailslno,
                req_slno: req_slno,
                apprv_date: format(new Date(), 'yyyy-MM-dd hh:mm:ss'),
                apprvLevel: apprvLevel
            }
            const approvedatakmc = {
                approve_item_desc: item_desc,
                approve_item_brand: item_brand,
                approve_item_unit: uom,
                item_qnty_approved: item_qty,
                approve_item_specification: item_spec,
                approve_item_unit_price: unitprice,
                approve_aprox_cost: approx_cost,
                approve_item_status: 1,
                item_status_approved: 1,// appvd
                edit_user: depkmc?.kmc_hod,
                req_detl_slno: reqDetailslno,
                req_slno: req_slno,
                apprv_date: format(new Date(), 'yyyy-MM-dd hh:mm:ss'),
                apprvLevel: apprvLevel
            }

            const updateDetalReqApprov = async (approvedata) => {

                const result = await axioslogin.patch('/CRFRegisterApproval/itemsApproval', approvedata);
                const { success, message } = result.data;
                if (success === 1) {
                    succesNotify(message)
                    queryClient.invalidateQueries('approvedRejholdItemList')
                    queryClient.invalidateQueries('getmaxSlno')
                    queryClient.invalidateQueries('itemStatus')
                    reset()
                }
                else {
                    warningNotify(message)
                }
            }
            const updatekmcDetalReqApprov = async (approvedatakmc) => {
                const result = await axioskmc.patch('/CRFRegisterApproval/itemsApproval', approvedatakmc);
                const { success, message } = result.data;
                if (success === 1) {
                    succesNotify(message)
                    queryClient.invalidateQueries('approvedRejholdItemListkmc')
                    queryClient.invalidateQueries('getmaxSlnokmc')
                    queryClient.invalidateQueries('itemStatuskmc')
                    reset()
                }
                else {
                    warningNotify(message)
                }
            }
            if (selectedCompany === "1") {
                updateDetalReqApprov(approvedata)

            } else if (selectedCompany === "2") {
                updatekmcDetalReqApprov(approvedatakmc)
            } else {
                updateDetalReqApprov(approvedata)

            }
        } else {
            const approvedataInsert = {
                req_slno: req_slno,
                item_slno: lastSlno + 1,
                item_desc: item_desc,
                item_brand: item_brand,
                item_unit: uom,
                item_qnty: item_qty,
                item_specification: item_spec,
                item_unit_price: unitprice,
                aprox_cost: approx_cost,
                item_status: 0,
                approve_item_desc: item_desc,
                approve_item_brand: item_brand,
                approve_item_unit: uom,
                item_qnty_approved: item_qty,
                approve_item_specification: item_spec,
                approve_item_unit_price: unitprice,
                approve_aprox_cost: approx_cost,
                approve_item_status: 1,
                item_status_approved: 1,
                old_item_slno: item_slno,
                create_user: id,
                req_detl_slno: reqDetailslno
            }

            const approvedataInsertkmc = {
                req_slno: req_slno,
                item_slno: lastSlno + 1,
                item_desc: item_desc,
                item_brand: item_brand,
                item_unit: uom,
                item_qnty: item_qty,
                item_specification: item_spec,
                item_unit_price: unitprice,
                aprox_cost: approx_cost,
                item_status: 0,
                approve_item_desc: item_desc,
                approve_item_brand: item_brand,
                approve_item_unit: uom,
                item_qnty_approved: item_qty,
                approve_item_specification: item_spec,
                approve_item_unit_price: unitprice,
                approve_aprox_cost: approx_cost,
                approve_item_status: 1,
                item_status_approved: 1,
                old_item_slno: item_slno,
                create_user: depkmc?.kmc_hod,
                req_detl_slno: reqDetailslno
            }
            const DetailApprvInsert = async (reqDataPost) => {
                const result = await axioslogin.post('/CRFRegisterApproval/DetailApprvInsert', reqDataPost);
                const { success, message } = result.data;
                if (success === 1) {
                    succesNotify(message)
                    queryClient.invalidateQueries('approvedRejholdItemList')
                    queryClient.invalidateQueries('getmaxSlno')
                    queryClient.invalidateQueries('itemStatus')
                    reset()
                }
                else {
                    warningNotify(message)
                }
            }
            const DetailkmcApprvInsert = async (approvedataInsertkmc) => {
                const result = await axioskmc.post('/CRFRegisterApproval/DetailApprvInsert', approvedataInsertkmc);
                const { success, message } = result.data;
                if (success === 1) {
                    succesNotify(message)
                    queryClient.invalidateQueries('approvedRejholdItemListkmc')
                    queryClient.invalidateQueries('getmaxSlnokmc')
                    queryClient.invalidateQueries('itemStatuskmc')
                    reset()
                }
                else {
                    warningNotify(message)
                }
            }

            if (selectedCompany === "1") {
                DetailApprvInsert(approvedataInsert)
            } else if (selectedCompany === "2") {
                DetailkmcApprvInsert(approvedataInsertkmc)
            } else {
                DetailApprvInsert(approvedataInsert)
            }
        }
    }, [reqDetailslno, req_slno, lastSlno, item_desc_actl, item_desc, item_brand, uom, item_qty,
        item_slno, item_spec, approx_cost, unitprice, reset, id, queryClient, apprvLevel, selectedCompany, depkmc])

    const Rejectfctn = useCallback(() => {
        setRejHoldRemarkFlag(1)
    }, [])

    const RejectfctnUpdate = useCallback(() => {

        if (rejHoldRemark === '') {
            infoNotify("Enter Remarks")
        } else {
            const rejectedata = {
                approve_item_desc: item_desc,
                approve_item_brand: item_brand,
                approve_item_unit: uom,
                item_qnty_approved: item_qty,
                approve_item_specification: item_spec,
                approve_item_unit_price: unitprice,
                approve_aprox_cost: approx_cost,
                approve_item_status: 1,
                item_status_approved: 2, // reject
                reject_remarks: header + " ;  Remarks : " + rejHoldRemark,
                reject_user: id,
                reject_date: format(new Date(), 'yyyy-MM-dd hh:mm:ss'),
                req_detl_slno: reqDetailslno,
                apprvLevel: apprvLevel,
                req_slno: req_slno
            }

            const updateDetalReqApprov = async (rejectedata) => {

                const result = await axioslogin.patch('/CRFRegisterApproval/DetailItemReject', rejectedata);
                const { success, message } = result.data;

                if (success === 1) {

                    succesNotify(message)
                    queryClient.invalidateQueries('approvedRejholdItemList')
                    queryClient.invalidateQueries('getmaxSlno')
                    queryClient.invalidateQueries('itemStatus')
                    reset()
                }
                else {
                    warningNotify(message)
                }
            }
            updateDetalReqApprov(rejectedata)
        }

    }, [reqDetailslno, item_desc, item_brand, uom, item_qty, item_spec, unitprice,
        reset, approx_cost, rejHoldRemark, id, header, queryClient, apprvLevel, req_slno])

    const onHoldfctn = useCallback(() => {
        setRejHoldRemarkFlag(2)
    }, [])
    const cancelEdit = useCallback(() => {
        reset()
    }, [reset])
    const internallyFctn = useCallback(() => {
        setRejHoldRemarkFlag(3)
    }, [])
    const onHoldfctnUpdate = useCallback(() => {
        if (rejHoldRemark === '') {
            infoNotify("Enter Remarks")
        } else {
            const holddata = {
                approve_item_desc: item_desc,
                approve_item_brand: item_brand,
                approve_item_unit: uom,
                item_qnty_approved: item_qty,
                approve_item_specification: item_spec,
                approve_item_unit_price: unitprice,
                approve_aprox_cost: approx_cost,
                approve_item_status: 1,
                item_status_approved: 3,// onhold
                hold_remarks: header + " ;  Remarks : " + rejHoldRemark,
                hold_user: id,
                hold_date: format(new Date(), 'yyyy-MM-dd hh:mm:ss'),
                req_detl_slno: reqDetailslno,
                apprvLevel: apprvLevel,
                req_slno: req_slno
            }
            const updateDetalReqApprov = async (holddata) => {
                const result = await axioslogin.patch('/CRFRegisterApproval/DetailItemOnHold', holddata);
                const { success, message } = result.data;
                if (success === 1) {
                    succesNotify(message)
                    queryClient.invalidateQueries('approvedRejholdItemList')
                    queryClient.invalidateQueries('getmaxSlno')
                    queryClient.invalidateQueries('itemStatus')
                    reset()
                }
                else {
                    warningNotify(message)
                }
            }
            updateDetalReqApprov(holddata)
        }
    }, [reqDetailslno, item_desc, item_brand, uom, item_qty, item_spec, unitprice,
        reset, approx_cost, rejHoldRemark, id, header, queryClient, apprvLevel, req_slno])
    useEffect(() => {
        getComplaintSlno().then((val) => {
            setComplaint(val);
            setCount(0)
        })
    }, [count])

    const internallyArrangedUpdate = useCallback(() => {
        if (rejHoldRemark === '') {
            infoNotify("Enter Remarks")
        } else {
            const internaldata = {
                approve_item_desc: item_desc,
                approve_item_brand: item_brand,
                approve_item_unit: uom,
                item_qnty_approved: item_qty,
                approve_item_specification: item_spec,
                approve_item_unit_price: unitprice,
                approve_aprox_cost: approx_cost,
                approve_item_status: 1,
                item_status_approved: 4,// internally Arranged
                internal_remarks: header + " ;  Remarks : " + rejHoldRemark,
                internal_user: id,
                internal_date: format(new Date(), 'yyyy-MM-dd hh:mm:ss'),
                req_detl_slno: reqDetailslno,
                apprvLevel: apprvLevel,
                req_slno: req_slno,
                crfdept: crfdept?.department_slno,
            }
            //insert data
            const postdata = {

                complaint_slno: complaint_slno,
                // complaint_desc: header + " :  Remarks : " + rejHoldRemark + " :  CRF NO : " + req_slno + ":   Description :" + item_desc + ": Brand :" + item_brand,
                complaint_desc: "The complaint was raised by " + header + " with the remark \"" + rejHoldRemark + "\" under CRF No: " + req_slno + " regarding the item described as " + item_desc + ", which has to be internally arranged.",
                complaint_dept_secslno: request_deptsec_slno,
                complaint_request_slno: 1,
                complaint_deptslno: crfdept?.complaint_dept_slno,
                complaint_typeslno: crfdept?.complaint_dept_slno === 1 ? company?.itemType_dp_Bio : crfdept?.complaint_dept_slno === 2 ? company?.itemType_dp_Main : crfdept?.complaint_dept_slno === 3 ? company?.itemType_dp_IT :
                    crfdept?.complaint_dept_slno === 4 ? company?.itemType_dp_Hou : crfdept?.complaint_dept_slno === 5 ? company?.itemType_dp_Ope : 0,
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
                tm_task_description: "The task is to arrange for \"" + needed + "\"concerning the item described as \"" + item_desc + "\"with the brand \"" + item_brand + "\" By " + header,
                tm_project_slno: null,
                tm_pending_remark: null,
                tm_onhold_remarks: null,
                tm_completed_remarks: null,
                tm_task_status: 0,
                tm_complete_date: null,
                create_user: id,
                main_task_slno: null,
            }


            const updateDetalReqApprov = async (internaldata) => {
                const result = await axioslogin.patch('/CRFRegisterApproval/internallyArranged', internaldata);
                const { success, message: msginternal } = result.data;
                if (success === 1) {
                    succesNotify(msginternal)
                    queryClient.invalidateQueries('approvedRejholdItemList')
                    queryClient.invalidateQueries('getmaxSlno')
                    queryClient.invalidateQueries('itemStatus')
                    reset()
                    const result = await axioslogin.post('/complaintreg', postdata);
                    const { success: comsuccess, message: msgcomp } = result.data;

                    if (comsuccess === 1) {
                        succesNotify(msgcomp)
                        setCount(1)
                        const InsertMastTask = async (insertMastTask) => {
                            const result = await axioslogin.post('/taskManagement/insertTask', insertMastTask)
                            return result.data
                        }
                        const InsertDetailTask = async (insertTaskDetail) => {
                            const result = await axioslogin.post('/taskManagement/insertDetail', insertTaskDetail)
                            return result.data
                        }
                        InsertMastTask(insertMastTask).then((value) => {
                            const { message, success, insertId } = value
                            if (success === 1) {
                                setInsertId(insertId)
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

                }
                else {
                    warningNotify(msginternal)
                }
            }
            updateDetalReqApprov(internaldata)

        }
    }, [reqDetailslno, item_desc, item_brand, uom, item_qty, item_spec, unitprice, crfdept, crfHod,
        reset, approx_cost, rejHoldRemark, id, header, queryClient, apprvLevel, req_slno])


    if (isItemsLoading || isSlnoLoading || isStatusLoading || kmcisSlnoLoading || kmcisStatusLoading || isItemskmcLoading) return <p>Loading...</p>;
    if (itemsError || slnoError || statusError || kmcslnoError || kmcstatusError || kmcitemsError) return <p>Error occurred.</p>;
    return (
        <Fragment>
            <Box sx={{ flexWrap: 'wrap', my: 0.5, }}>
                {apprvdItems.length !== 0 ?
                    <Box sx={{}}>
                        <Box sx={{ display: 'flex', }}>
                            <Typography sx={{ fontWeight: 'bold', ml: 1, my: 0.5, color: '#145DA0', fontSize: 14 }}>
                                Approved Items
                            </Typography>
                        </Box>
                        <Box sx={{ overflow: 'auto', flexWrap: 'wrap', px: 0.5, pb: 0.5 }}>
                            <Table aria-label="table with sticky header" borderAxis="both" padding={"none"} stickyHeader size='sm' >
                                <thead >
                                    <tr >
                                        <th size='sm' style={{ borderRadius: 0, width: 40, backgroundColor: '#e3f2fd' }}></th>
                                        <th size='sm' style={{ width: 50, textAlign: 'center', backgroundColor: '#e3f2fd' }}>Sl.No</th>
                                        <th size='sm' style={{ width: 300, backgroundColor: '#e3f2fd' }}>&nbsp;&nbsp;Description</th>
                                        <th size='sm' style={{ width: 200, backgroundColor: '#e3f2fd' }}>&nbsp;&nbsp;Brand</th>
                                        <th size='sm' style={{ width: 80, textAlign: 'center', backgroundColor: '#e3f2fd' }}>Qty</th>
                                        <th size='sm' style={{ width: 80, textAlign: 'center', backgroundColor: '#e3f2fd' }}>UOM</th>
                                        <th size='sm' style={{ width: 350, textAlign: 'center', backgroundColor: '#e3f2fd' }}>Specification</th>
                                        <th size='sm' style={{ width: 100, textAlign: 'center', backgroundColor: '#e3f2fd' }}>Price</th>
                                        <th size='sm' style={{ width: 100, textAlign: 'center', backgroundColor: '#e3f2fd' }}>Approx.Cost</th>
                                        <th size='sm' style={{ borderRadius: 0, width: 150, textAlign: 'center', backgroundColor: '#e3f2fd' }}>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {apprvdItems?.map((item, ind) => {
                                        const rowColor = item.po_item_status === 1 ? '#1565c0' : item.item_status_approved === 1 ? '#59981A' :
                                            item.item_status_approved === 2 ? '#D13120' :
                                                item.item_status_approved === 3 ? '#DBA40E' :
                                                    item.item_status_approved === 4 ? '#009688' :
                                                        null;

                                        return (
                                            <CustomToolTipForCRF key={item.req_detl_slno} placement="top" title={item.po_item_status === 1 ? "PO Generated" : (item.item_status_approved === 1
                                                ? "Approved"
                                                : item.item_status_approved === 2
                                                    ? `Rejected by ${item.reject_remarks}`
                                                    : item.item_status_approved === 3
                                                        ? `On-Hold by ${item.hold_remarks}`
                                                        : item.item_status_approved === 4
                                                            ? `Internally Arranged By ${item.internal_remarks}`
                                                            : "")} >
                                                <tr style={{ cursor: 'pointer' }}>
                                                    <td>
                                                        {(item.po_item_status === 1 || item.item_status_approved === 4) ? (
                                                            <CustomToolTipForCRF title={item.po_item_status === 1 ? "PO Generated" : 'Cant Edit'} placement="right">
                                                                <EditOutlinedIcon
                                                                    disabled
                                                                    sx={{
                                                                        fontSize: 'lg',
                                                                        color: '#bcaaa4',
                                                                        height: 25,
                                                                        width: 30,
                                                                        borderRadius: 2,
                                                                        cursor: 'pointer',
                                                                    }}
                                                                />
                                                            </CustomToolTipForCRF>
                                                        ) :
                                                            <CustomToolTipForCRF title="Edit" placement="right">
                                                                <EditOutlinedIcon
                                                                    sx={{
                                                                        fontSize: 'lg',
                                                                        color: '#3e2723',
                                                                        height: 25,
                                                                        width: 30,
                                                                        borderRadius: 2,
                                                                        boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.1)',
                                                                        cursor: 'pointer',
                                                                        '&:hover': {
                                                                            color: '#A47551'
                                                                        },
                                                                    }}
                                                                    onClick={() => editSelect(item)}
                                                                />
                                                            </CustomToolTipForCRF>
                                                        }
                                                    </td>
                                                    <td style={{ textAlign: 'center' }}>{ind + 1}</td>
                                                    <td style={{ fontSize: 13 }}>&nbsp;{item.approve_item_desc}</td>
                                                    <td style={{ fontSize: 13 }}>&nbsp;{item.approve_item_brand === '' ? 'Not Given' : item.approve_item_brand}</td>
                                                    <td style={{ textAlign: 'center' }}>{item.item_qnty_approved}</td>
                                                    <td style={{ textAlign: 'center' }}>{item.approve_item_unit === 0 ? 'Not Given' : item.apprv_uom}</td>
                                                    <td style={{ fontSize: 13 }}>&nbsp;{item.approve_item_specification === '' ? 'Not Given' : item.approve_item_specification}</td>
                                                    <td style={{ textAlign: 'center' }}>{item.approve_item_unit_price === 0 ? 'Not Given' : item.approve_item_unit_price}</td>
                                                    <td style={{ textAlign: 'center' }}>{item.approve_aprox_cost === 0 ? 'Not Given' : item.approve_aprox_cost}</td>
                                                    <td style={{ textAlign: 'center', color: rowColor }}>{item.po_item_status === 1 ? "PO Generated" :
                                                        (item.item_status_approved === 1 ? "Approved" :
                                                            item.item_status_approved === 2 ? "Rejected " :
                                                                item.item_status_approved === 3 ? "On-Hold " :
                                                                    item.item_status_approved === 4 ? "Internally Arranged" :
                                                                        null)}</td>
                                                </tr>
                                            </CustomToolTipForCRF>
                                        );
                                    })}
                                </tbody>
                            </Table>
                        </Box>
                    </Box>
                    : <Box sx={{
                        display: 'flex', justifyContent: 'center', fontSize: 25, opacity: 0.5,
                        pt: 10, color: 'grey'
                    }}>
                        No items Approved
                    </Box>
                }
                {
                    editEnable === 1 ?
                        <Box sx={{ px: 0.5 }}>
                            <Typography sx={{ fontWeight: 'bold', m: 1, color: '#145DA0', fontSize: 14 }}>
                                Edit Item Details
                            </Typography>
                            <Box sx={{ display: 'flex', }}>
                                <Box sx={{ flex: 1.5, }}>
                                    <CustomPaperTitle heading="Item Description" mandtry={1} />
                                    <CustomInputDateCmp
                                        className={{ height: 35, ml: 0.5 }}
                                        autoComplete='off'
                                        size={'sm'}
                                        type={'text'}
                                        name={'item_desc'}
                                        value={item_desc}
                                        handleChange={updateItemState}
                                    />
                                </Box>
                                <Box sx={{ flex: 0.7, }}>
                                    <CustomPaperTitle heading="Item Brand" />
                                    <CustomInputDateCmp
                                        className={{ height: 35, ml: 0.5, mt: 0.2 }}
                                        autoComplete='off'
                                        size={'sm'}
                                        type={'text'}
                                        name={'item_brand'}
                                        value={item_brand}
                                        handleChange={updateItemState}
                                    />
                                </Box>
                                <Box sx={{ flex: 1, }}>
                                    <CustomPaperTitle heading="Specification" />
                                    <CustomInputDateCmp
                                        className={{ height: 37, mx: 0.5, mt: 0.4 }}
                                        autoComplete='off'
                                        size={'sm'}
                                        type={'text'}
                                        name={'item_spec'}
                                        value={item_spec}
                                        handleChange={updateItemState}
                                    />
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', pt: 0.5, pb: 1 }}>
                                <Box sx={{ flex: 1 }}>
                                    <CustomPaperTitle heading="Quantity" mandtry={1} />
                                    <CustomInputDateCmp
                                        className={{ height: 37, ml: 0.5 }}
                                        autoComplete='off'
                                        size={'sm'}
                                        type={'number'}
                                        name={'item_qty'}
                                        value={item_qty}
                                        handleChange={OnchangeQty}
                                    />
                                </Box>
                                <Box sx={{ flex: 0.6, pl: 0.5, pt: 0.4 }}>
                                    <CustomPaperTitle heading="Unit" />
                                    <UomApprvSelect
                                        uom={uom}
                                        setUOM={setUOM}
                                    />
                                </Box>
                                <Box sx={{ flex: 1 }}>
                                    <CustomPaperTitle heading="Unit Price" />
                                    <CustomInputDateCmp
                                        className={{ height: 37, ml: 0.5, mt: 0.4 }}
                                        autoComplete='off'
                                        size={'sm'}
                                        type={'number'}
                                        name={'unitprice'}
                                        value={unitprice}
                                        handleChange={updateUnitPrice}
                                    />
                                </Box>
                                <Box sx={{ flex: 1 }}>
                                    <CustomPaperTitle heading="Approx.Cost" />
                                    <CustomInputDateCmp
                                        className={{ height: 37, ml: 0.5, mt: 0.4 }}
                                        autoComplete='off'
                                        size={'sm'}
                                        name={'approx_cost'}
                                        value={approx_cost}
                                        disabled={true}
                                    />
                                </Box>
                                {
                                    crf_data_collect_status === null || crf_data_collect_status === undefined ?
                                        <>
                                            <Box sx={{ flex: 0.5, px: 1 }}>
                                                <IconButton
                                                    sx={{
                                                        fontSize: 12, height: '35px', lineHeight: '1.2', mt: 3,
                                                        color: 'white', bgcolor: '#59981A', borderRadius: 5, width: '100%',
                                                        '&:hover': {
                                                            bgcolor: '#59981A', color: 'white',
                                                        },
                                                    }}
                                                    onClick={Approvefctn} >
                                                    Approve
                                                </IconButton>
                                            </Box>
                                            <Box sx={{ flex: 0.5, mr: 1 }}>
                                                <IconButton
                                                    sx={{
                                                        fontSize: 12, height: '35px', lineHeight: '1.2', mt: 3,
                                                        color: 'white', bgcolor: '#f44336', borderRadius: 5, width: '100%',
                                                        '&:hover': {
                                                            bgcolor: '#f44336', color: 'white',
                                                        },
                                                    }}
                                                    onClick={Rejectfctn} >
                                                    Reject
                                                </IconButton>
                                            </Box>
                                            <Box sx={{ flex: 0.5, mr: 1 }}>
                                                <IconButton
                                                    sx={{
                                                        fontSize: 12, height: '35px', lineHeight: '1.2', mt: 3,
                                                        color: 'white', bgcolor: '#DBA40E', borderRadius: 5, width: '100%',
                                                        '&:hover': {
                                                            bgcolor: '#DBA40E', color: 'white',
                                                        },
                                                    }}
                                                    onClick={onHoldfctn} >
                                                    On-Hold
                                                </IconButton>
                                            </Box>
                                            {apprvLevel > 2 ?
                                                <Box sx={{ flex: 0.55, mr: 1 }}>
                                                    <IconButton
                                                        sx={{
                                                            fontSize: 12, height: '35px', lineHeight: '1.2', mt: 3,
                                                            color: 'white', bgcolor: '#009688', borderRadius: 5, width: '100%',
                                                            '&:hover': {
                                                                bgcolor: '#009688', color: 'white',
                                                            },
                                                        }}
                                                        onClick={internallyFctn} >
                                                        Internally Arranged
                                                    </IconButton>
                                                </Box>
                                                : null}
                                            <Box sx={{ flex: 0.5, mr: 2 }}>
                                                <IconButton
                                                    sx={{
                                                        fontSize: 12, height: '35px', lineHeight: '1.2', mt: 3, border: '1px solid #bbdefb',
                                                        color: '#1565c0', bgcolor: 'white', borderRadius: 5, width: '100%',
                                                        '&:hover': {
                                                            bgcolor: 'white', color: '#43B0F1'
                                                        },
                                                    }}
                                                    onClick={cancelEdit} >
                                                    Cancel
                                                </IconButton>
                                            </Box>
                                        </>
                                        : <Box sx={{ flex: 0.5, px: 1 }}>
                                            <IconButton
                                                sx={{
                                                    fontSize: 12, height: '35px', lineHeight: '1.2', mt: 3,
                                                    color: 'white', bgcolor: '#59981A', borderRadius: 5, width: '100%',
                                                    '&:hover': {
                                                        bgcolor: '#59981A', color: 'white',
                                                    },
                                                }}
                                                onClick={Approvefctn} >
                                                Save
                                            </IconButton>
                                        </Box>
                                }

                            </Box>
                        </Box>
                        : null
                }
                {
                    rejHoldRemarkFlag === 1 ?
                        <Box sx={{ display: 'flex' }}>
                            <Box sx={{ flex: 1, m: 0.5, pl: 0.5 }}>
                                <Textarea
                                    required
                                    placeholder="Reject Remarks"
                                    value={rejHoldRemark}
                                    autoComplete='off'
                                    name='remarks'
                                    minRows={1}
                                    maxRows={3}
                                    onChange={updateRemark}
                                    sx={{ fontSize: 14, borderRadius: 7 }}
                                />
                            </Box>
                            <Box sx={{ flex: 0.2, m: 0.4 }}>
                                <   CustomIconButtonCmp
                                    handleChange={RejectfctnUpdate}
                                >
                                    Update
                                </CustomIconButtonCmp>
                            </Box>
                        </Box>
                        : rejHoldRemarkFlag === 2 ?
                            <Box sx={{ display: 'flex' }}>
                                <Box sx={{ flex: 1, m: 0.5, pl: 0.5 }}>
                                    <Textarea
                                        required
                                        placeholder="On-Hold Remarks"
                                        value={rejHoldRemark}
                                        autoComplete='off'
                                        name='remarks'
                                        minRows={1}
                                        maxRows={3}
                                        onChange={updateRemark}
                                        sx={{ fontSize: 14, borderRadius: 7 }}
                                    />
                                </Box>
                                <Box sx={{ flex: 0.2, m: 0.4 }}>
                                    <   CustomIconButtonCmp
                                        handleChange={onHoldfctnUpdate}
                                    >
                                        Update
                                    </CustomIconButtonCmp>
                                </Box>
                            </Box>
                            : rejHoldRemarkFlag === 3 ?
                                <Box sx={{}}>
                                    <Box sx={{ flex: 1, m: 0.5, pl: 0.5 }}>
                                        <Textarea
                                            required
                                            placeholder="Internally Arranged Remarks"
                                            value={rejHoldRemark}
                                            autoComplete='off'
                                            name='remarks'
                                            minRows={1}
                                            maxRows={3}
                                            onChange={updateRemark}
                                            sx={{ fontSize: 14, borderRadius: 7 }}
                                        />
                                    </Box>
                                    {/* for internally arrange department select */}
                                    <Box sx={{ display: 'flex' }}>
                                        <Box sx={{ px: 1, pt: 0.2, flex: 1, }}>
                                            <CrfComplaintdep value={crfdept} setValue={setCrfDept} />
                                        </Box>
                                        <Box sx={{ mx: 1, mt: 1 }}>
                                            <CusCheckBox
                                                className={{ color: '#145DA0', fontSize: 14, fontWeight: 'bold' }}
                                                variant="outlined"
                                                color="primary"
                                                size="md"
                                                name="complaint"
                                                label="create complaint"
                                                value={complaint}
                                                onCheked={setcomplaint}
                                                checked={complaint}
                                                disabled={complaint === true}

                                            />
                                        </Box>
                                        <Box sx={{ mx: 1, mt: 1 }}>
                                            <CusCheckBox
                                                className={{ color: '#145DA0', fontSize: 14, fontWeight: 'bold' }}
                                                variant="outlined"
                                                color="primary"
                                                size="md"
                                                name="task"
                                                label="create task"
                                                value={task}
                                                onCheked={settask}
                                                checked={task}
                                                disabled={task === true}

                                            />
                                        </Box>
                                        <Box sx={{ flex: 0.2, m: 0.4, }}>
                                            <   CustomIconButtonCmp
                                                handleChange={internallyArrangedUpdate}
                                            >
                                                Update
                                            </CustomIconButtonCmp>
                                        </Box>
                                    </Box>

                                </Box>
                                : null
                }

            </Box >
        </Fragment >
    )
}

export default memo(ItemsApprovalCompnt)