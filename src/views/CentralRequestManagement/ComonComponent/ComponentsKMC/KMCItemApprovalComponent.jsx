import { Box, IconButton, Table, Textarea, Typography } from '@mui/joy';
import React, { Fragment, memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useQuery, useQueryClient } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { getApprovedItemsKMC, getApprovedStatusKMC, getMaxItemslNoKMC } from 'src/api/CommonApiCRFKmc';
import { getUOM } from 'src/redux/actions/AmUOMList.action';
import { axioskmc } from 'src/views/Axios/Axios';
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CustomPaperTitle from 'src/views/Components/CustomPaperTitle';
import CustomInputDateCmp from '../Components/CustomInputDateCmp';
import UomApprvSelect from '../Components/UomApprvSelect';
import CustomIconButtonCmp from '../Components/CustomIconButtonCmp';
import _ from 'underscore';
import { format } from 'date-fns';
import CustomToolTipForCRF from '../Components/CustomToolTipForCRF';

const KMCItemApprovalComponent = ({ req_slno, setMoreItem, setApproveTableData, editEnable,
    setEditEnable, header, apprvLevel }) => {
    const queryClient = useQueryClient()
    const dispatch = useDispatch();
    const id = useSelector((state) => state.LoginUserData.empid, _.isEqual)
    const [uom, setUOM] = useState(0)
    const [lastSlno, setLastSlno] = useState(0)
    const [apprvdItems, setApprvdItems] = useState([])
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
    const [checkStatus, setCheckStatus] = useState([])
    const updateRemark = useCallback((e) => {
        setRejHoldRemark(e.target.value)
    }, [])

    useEffect(() => {
        dispatch(getUOM())
    }, [dispatch])

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
        queryKey: ['approvedRejholdItemKMC', req_slno],
        queryFn: () => getApprovedItemsKMC(req_slno),
        staleTime: Infinity
    });

    const itemData = useMemo(() => iteData, [iteData])

    const { data: statData, isLoading: isStatusLoading, error: statusError } = useQuery({
        queryKey: ['itemStatusKMC', req_slno],
        queryFn: () => getApprovedStatusKMC(req_slno),
        staleTime: Infinity
    });
    const statusData = useMemo(() => statData, [statData])


    useEffect(() => {
        if (statusData && statusData.length !== 0) {
            if (apprvLevel === 1) {
                // incharge
                const newData = statusData?.map((val) => {
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
                const newData = statusData?.map((val) => {
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
                const newData = statusData?.map((val) => {
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
                const newData = statusData?.map((val) => {
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
                const newData = statusData?.map((val) => {
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
                const newData = statusData?.map((val) => {
                    return {
                        req_detl_slno: val.req_detl_slno,
                        higher: val.item_gm_approve !== 0 || val.item_md_approve !== 0 || val.item_ed_approve !== 0 ? 1 : 0
                    }
                })
                setCheckStatus(newData)
            }
            else if (apprvLevel === 7) {
                // gm
                const newData = statusData?.map((val) => {
                    return {
                        req_detl_slno: val.req_detl_slno,
                        higher: val.item_md_approve !== 0 || val.item_ed_approve !== 0 ? 1 : 0
                    }
                })
                setCheckStatus(newData)
            }
            else if (apprvLevel === 8 || apprvLevel === 9 || apprvLevel === 10) {
                // md and ed
                const newData = statusData?.map((val) => {
                    return {
                        req_detl_slno: val.req_detl_slno,
                        higher: 0
                    }
                })
                setCheckStatus(newData)
            }
        }
    }, [statusData, apprvLevel])

    useEffect(() => {
        if (itemData && itemData.length !== 0) {
            if (checkStatus && checkStatus.length !== 0) {
                const newData = itemData?.map((val) => {
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
                const newData = itemData?.map((val) => {
                    return {
                        ...val,
                        higher: 1
                    }
                })
                setApproveTableData(newData)
                setApprvdItems(newData)
            }
        }
    }, [itemData, setApproveTableData, checkStatus])
    const { data: maxSlnoData, isLoading: isSlnoLoading, error: slnoError } = useQuery({
        queryKey: ['getmaxSlnoKMC', req_slno],
        queryFn: () => getMaxItemslNoKMC(req_slno),
        staleTime: Infinity
    });
    useEffect(() => {
        if (maxSlnoData && maxSlnoData.length !== 0) {
            const { maxSlno } = maxSlnoData[0];
            setLastSlno(maxSlno);
        } else {
            setLastSlno(0);
        }
    }, [maxSlnoData])

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
            const updateDetalReqApprov = async (approvedata) => {
                const result = await axioskmc.patch('/CRFRegisterApproval/itemsApproval', approvedata);
                const { success, message } = result.data;
                if (success === 1) {
                    succesNotify(message)
                    queryClient.invalidateQueries('approvedRejholdItemKMC')
                    queryClient.invalidateQueries('getmaxSlnoKMC')
                    queryClient.invalidateQueries('itemStatusKMC')
                    reset()
                }
                else {
                    warningNotify(message)
                }
            }
            updateDetalReqApprov(approvedata)
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
            const DetailApprvInsert = async (reqDataPost) => {
                const result = await axioskmc.post('/CRFRegisterApproval/DetailApprvInsert', reqDataPost);
                const { success, message } = result.data;
                if (success === 1) {
                    succesNotify(message)
                    queryClient.invalidateQueries('approvedRejholdItemKMC')
                    queryClient.invalidateQueries('getmaxSlnoKMC')
                    queryClient.invalidateQueries('itemStatusKMC')
                    reset()
                }
                else {
                    warningNotify(message)
                }
            }
            DetailApprvInsert(approvedataInsert)
        }
    }, [reqDetailslno, req_slno, lastSlno, item_desc_actl, item_desc, item_brand, uom, item_qty,
        item_slno, item_spec, approx_cost, unitprice, reset, id, queryClient, apprvLevel])

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
                const result = await axioskmc.patch('/CRFRegisterApproval/DetailItemReject', rejectedata);
                const { success, message } = result.data;
                if (success === 1) {
                    succesNotify(message)
                    queryClient.invalidateQueries('approvedRejholdItemKMC')
                    queryClient.invalidateQueries('getmaxSlnoKMC')
                    queryClient.invalidateQueries('itemStatusKMC')
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
                const result = await axioskmc.patch('/CRFRegisterApproval/DetailItemOnHold', holddata);
                const { success, message } = result.data;
                if (success === 1) {
                    succesNotify(message)
                    queryClient.invalidateQueries('approvedRejholdItemKMC')
                    queryClient.invalidateQueries('getmaxSlnoKMC')
                    queryClient.invalidateQueries('itemStatusKMC')
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


    if (isItemsLoading || isSlnoLoading || isStatusLoading) return <p>Loading...</p>;
    if (itemsError || slnoError || statusError) return <p>Error occurred.</p>;
    return (
        <Fragment>
            <Box sx={{ flexWrap: 'wrap', my: 0.5 }}>
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
                                        <th size='sm' style={{ borderRadius: 0, width: 100, textAlign: 'center', backgroundColor: '#e3f2fd' }}>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {apprvdItems?.map((item, ind) => {
                                        const rowColor = item.po_item_status === 1 ? '#1565c0' : item.item_status_approved === 1 ? '#59981A' :
                                            item.item_status_approved === 2 ? '#D13120' :
                                                item.item_status_approved === 3 ? '#DBA40E' : null;


                                        return (
                                            <CustomToolTipForCRF key={item.req_detl_slno} placement="top" title={item.po_item_status === 1 ? "PO Generated" : (item.item_status_approved === 1
                                                ? "Approved"
                                                : item.item_status_approved === 2
                                                    ? `Rejected by ${item.reject_remarks}`
                                                    : item.item_status_approved === 3
                                                        ? `On-Hold by ${item.hold_remarks}`
                                                        : "")} >
                                                <tr style={{ cursor: 'pointer' }}>
                                                    <td>
                                                        {item.po_item_status === 1 || item.higher === 1 ? (
                                                            <CustomToolTipForCRF title={item.po_item_status === 1 ? "PO generated" : 'Cant Edit'} placement="right" sx={{ bgcolor: 'white', color: '#003060' }}>
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
                                                            <CustomToolTipForCRF title="Edit" placement="right" sx={{ bgcolor: 'white', color: '#003060' }}>
                                                                <EditOutlinedIcon
                                                                    sx={{
                                                                        fontSize: 'lg',
                                                                        color: '#3e2723',
                                                                        height: 25,
                                                                        width: 30,
                                                                        borderRadius: 2,
                                                                        boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.1)',
                                                                        cursor: 'pointer',
                                                                        transition: 'transform 0.2s',
                                                                        '&:hover': {
                                                                            transform: 'scale(1.1)',
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
                                                    <td style={{ textAlign: 'center', color: rowColor }}>{item.po_item_status === 1 ? "PO Generated" : (item.item_status_approved === 1
                                                        ? "Approved" : item.item_status_approved === 2
                                                            ? "Rejected " : item.item_status_approved === 3
                                                                ? "On-Hold " : null)}</td>
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
                                            color: 'white', bgcolor: '#D13120', borderRadius: 5, width: '100%',
                                            '&:hover': {
                                                bgcolor: '#D13120', color: 'white',
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
                            : null
                }

            </Box >
        </Fragment >
    )
}

export default memo(KMCItemApprovalComponent)