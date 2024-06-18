import React, { Fragment, useCallback, useState, memo, useEffect } from 'react'
import { Box, IconButton, Button } from '@mui/material'
import { editicon } from 'src/color/Color'
import CustomeToolTip from 'src/views/Components/CustomeToolTip';
import CrfReqDetailCmpnt from '../CRFRequestMaster/CrfReqDetailCmpnt';
import { axioslogin } from 'src/views/Axios/Axios';
import _ from 'underscore'
import { succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import CustomPaperTitle from 'src/views/Components/CustomPaperTitle'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import { useDispatch, useSelector } from 'react-redux'
import { getUOM } from 'src/redux/actions/AmUOMList.action'
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import CustomTextarea from 'src/views/Components/CustomTextarea';
import { format } from 'date-fns';
import UOMSelect from '../ComonComponent/UOMSelect';


const ItemsApprovalCompnt = ({ req_slno, setApproveTableDis, ApproveTableData, setApproveTableData }) => {

    const dispatch = useDispatch();
    const id = useSelector((state) => state.LoginUserData.empid, _.isEqual)
    const [reqDetailslno, setReqDetailSlno] = useState(0)
    const [uom, setUOM] = useState(0)
    const [uomName, setUomName] = useState('')
    const [unitprice, setUnitPrice] = useState(0)
    const [approx_cost, setapprox_cost] = useState(0)
    const [item_desc_actl, set_item_desc_actl] = useState('')
    const [count, setCount] = useState(0)
    const [reqslno, setRqeslno] = useState(0)
    const [lastSlno, setLastSlno] = useState(0)
    //Item details initialization
    const [itemstate, setItemState] = useState({
        item_desc: '',
        item_brand: '',
        item_qty: 0,
        item_spec: '',
        item_slno: 0
    })
    //Destructuring
    const { item_desc, item_brand, item_qty, item_spec, item_slno } = itemstate
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

    const updateUnitPrice = useCallback((e) => {
        if (item_qty !== 0) {
            setUnitPrice(e.target.value)
            setapprox_cost(item_qty * e.target.value)
        }
        else {
            warningNotify("Please Enter quantity before enter unit price")
        }
    }, [item_qty])

    useEffect(() => {
        const getApprovalItems = async (req_slno) => {
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
                        approve_item_brand: val.approve_item_brand !== '' ? val.approve_item_brand : '',
                        approve_item_unit: val.approve_item_unit !== null ||
                            val.approve_item_unit !== undefined ? val.approve_item_unit : 0,
                        item_qnty_approved: val.item_qnty_approved,
                        approve_item_unit_price: val.approve_item_unit_price !== 0 ? val.approve_item_unit_price : 0,
                        approve_aprox_cost: val.approve_aprox_cost !== 0 ? val.approve_aprox_cost : 0,
                        item_status_approved: val.item_status_approved,
                        approve_item_status: val.approve_item_status,
                        approve_item_delete_who: val.approve_item_delete_who,
                        uom_name: val.uom_name,
                        approve_item_specification: val.approve_item_specification !== '' ? val.approve_item_specification : '',
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
        const getMaxItemSlno = async (req_slno) => {
            const result = await axioslogin.get(`/CRFRegisterApproval/MaxItemSlno/${req_slno}`)
            const { success, data } = result.data
            if (success === 1) {
                const { maxslno } = data[0]
                setLastSlno(maxslno)
            } else {
                setLastSlno(0)
            }
        }
        getApprovalItems(req_slno)
        getMaxItemSlno(req_slno)
    }, [req_slno, count, setApproveTableData, setApproveTableDis])

    const [columnReqDetails] = useState([
        {
            headerName: 'Approval', minWidth: 100, cellRenderer: params =>
                <IconButton onClick={() => editSelect(params)}
                    sx={{ color: editicon, pt: 0 }} >
                    <CustomeToolTip title="Edit">
                        <PublishedWithChangesIcon size={15} />
                    </CustomeToolTip>
                </IconButton>
        },
        { headerName: "#", field: "slno", minWidth: 100, },
        { headerName: "Item Slno", field: "item_slno", minWidth: 100, },
        { headerName: "Old slno", field: "old_item_slno", minWidth: 100, },
        { headerName: "Description", field: "approve_item_desc", autoHeight: true, wrapText: true, minWidth: 250, filter: "true" },
        { headerName: "Brand", field: "approve_item_brand", autoHeight: true, wrapText: true, minWidth: 250, filter: "true" },
        { headerName: "Unit", field: "uom_name", minWidth: 150, },
        { headerName: "Quantity", field: "item_qnty_approved", minWidth: 150, },
        { headerName: "Specification", field: "approve_item_specification", minWidth: 250, },
        { headerName: "Unit Price", field: "approve_item_unit_price", minWidth: 150, },
        { headerName: "Approximate Cost", field: "approve_aprox_cost", minWidth: 200, },
    ])

    const [editEnable, setEditEnable] = useState(0)
    const editSelect = useCallback((params) => {
        const data = params.api.getSelectedRows()
        const { req_detl_slno, approve_aprox_cost, item_slno,
            approve_item_desc, approve_item_brand,
            approve_item_unit,
            approve_item_unit_price, req_slno,
            approve_item_specification, item_qnty_approved,
        } = data[0]

        setEditEnable(1)
        const resetarrray = {
            item_desc: approve_item_desc,
            item_brand: approve_item_brand,
            item_qty: item_qnty_approved,
            item_spec: approve_item_specification,
            item_slno: item_slno
        }
        setReqDetailSlno(req_detl_slno)
        setItemState(resetarrray)
        setUnitPrice(approve_item_unit_price)
        setapprox_cost(approve_aprox_cost)
        setUOM(approve_item_unit !== null ? approve_item_unit : 0)
        set_item_desc_actl(approve_item_desc)
        setRqeslno(req_slno)
    }, [])

    const reset = useCallback(() => {
        setEditEnable(0)
        const resetarrray = {
            item_desc: '',
            item_brand: '',
            item_qty: 0,
            item_spec: '',
            item_slno: ''
        }
        setReqDetailSlno(0)
        setItemState(resetarrray)
        setUnitPrice(0)
        setapprox_cost(0)
        setUOM(0)
        set_item_desc_actl('')
        setUomName('')
        setCount(0)
        setRqeslno(0)
        setLastSlno(0)
        setRejHoldRemarkFlag(0)
        setRejHoldRemark('')
    }, [])

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
                item_status_approved: 1,
                edit_user: id,
                req_detl_slno: reqDetailslno
            }

            const updateDetalReqApprov = async (approvedata) => {
                const result = await axioslogin.patch('/CRFRegisterApproval/inchargeApporval/details', approvedata);
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
            updateDetalReqApprov(approvedata)
        } else {
            const approvedataInsert = {
                req_slno: reqslno,
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
                const result = await axioslogin.post('/CRFRegisterApproval/DetailApprvInsert', reqDataPost);
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
            DetailApprvInsert(approvedataInsert)
        }
    }, [reqDetailslno, reqslno, lastSlno, item_desc_actl, item_desc, item_brand, uom, item_qty,
        item_slno, item_spec, approx_cost, unitprice, count, setCount,
        reset, id])

    const Rejectfctn = useCallback(() => {
        setRejHoldRemarkFlag(1)
    }, [])

    const RejectfctnUpdate = useCallback(() => {
        const rejectedata = {
            approve_item_desc: item_desc,
            approve_item_brand: item_brand,
            approve_item_unit: uom,
            item_qnty_approved: item_qty,
            approve_item_specification: item_spec,
            approve_item_unit_price: unitprice,
            approve_aprox_cost: approx_cost,
            approve_item_status: 1,
            item_status_approved: 2,
            reject_remarks: rejHoldRemark,
            reject_user: id,
            reject_date: format(new Date(), 'yyyy-MM-dd hh:mm:ss'),
            req_detl_slno: reqDetailslno
        }
        const updateDetalReqApprov = async (rejectedata) => {
            const result = await axioslogin.patch('/CRFRegisterApproval/DetailItemReject', rejectedata);
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
        updateDetalReqApprov(rejectedata)
    }, [reqDetailslno, item_desc, item_brand, uom, item_qty, item_spec, unitprice,
        reset, count, setCount, approx_cost, rejHoldRemark, id])

    const onHoldfctn = useCallback(() => {
        setRejHoldRemarkFlag(2)
    }, [])

    const onHoldfctnUpdate = useCallback(() => {
        const holddata = {
            approve_item_desc: item_desc,
            approve_item_brand: item_brand,
            approve_item_unit: uom,
            item_qnty_approved: item_qty,
            approve_item_specification: item_spec,
            approve_item_unit_price: unitprice,
            approve_aprox_cost: approx_cost,
            approve_item_status: 1,
            item_status_approved: 3,
            hold_remarks: rejHoldRemark,
            hold_user: id,
            hold_date: format(new Date(), 'yyyy-MM-dd hh:mm:ss'),
            req_detl_slno: reqDetailslno
        }
        const updateDetalReqApprov = async (holddata) => {
            const result = await axioslogin.patch('/CRFRegisterApproval/DetailItemOnHold', holddata);
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
        updateDetalReqApprov(holddata)
    }, [reqDetailslno, item_desc, item_brand, uom, item_qty, item_spec, unitprice,
        reset, count, setCount, approx_cost, rejHoldRemark, id])

    const getRowStyle = params => {
        if (params.data.item_status_approved === 1) {
            return { background: '#5a804a' };
        }
        else if (params.data.item_status_approved === 2) {
            return { background: '#6b3849' };
        }
        else if (params.data.item_status_approved === 3) {
            return { background: '#ba9f34' };
        }
    };

    return (
        <Fragment>


            <Box sx={{
                width: "100%", display: "flex", flexDirection: "column"
            }}>
                <Box sx={{
                    width: "100%", pb: 1,
                }}><CrfReqDetailCmpnt
                        columnDefs={columnReqDetails}
                        tableData={ApproveTableData}
                        getRowStyle={getRowStyle}
                    />
                </Box>

                {editEnable === 1 ?
                    <Box>

                        <Box sx={{
                            width: "100%", display: "flex", flexDirection: "column", pt: 1
                        }}>
                            <Box sx={{
                                width: "100%", p: 1, display: "flex", flexDirection: 'row'
                            }}>
                                <Box sx={{
                                    width: "55%", display: "flex", pr: 1, flexDirection: "column"
                                }}>
                                    <CustomPaperTitle heading="Item Description" mandtry={1} />
                                    <TextFieldCustom
                                        type="text"
                                        size="sm"
                                        name="item_desc"
                                        value={item_desc}
                                        onchange={updateItemState}
                                    />
                                </Box>
                                <Box sx={{
                                    width: "45%", display: "flex", flexDirection: "column", pr: 1
                                }}>
                                    <CustomPaperTitle heading="Item Brand" />
                                    <TextFieldCustom
                                        type="text"
                                        size="sm"
                                        name="item_brand"
                                        value={item_brand}
                                        onchange={updateItemState}
                                    />
                                </Box>

                                <Box sx={{
                                    width: "35%", display: "flex", flexDirection: "column", pr: 1
                                }}>
                                    <CustomPaperTitle heading="Unit" />

                                    <UOMSelect
                                        uom={uom}
                                        setUOM={setUOM}
                                        setName={setUomName}
                                        uomName={uomName}
                                    />
                                    {/* <AssetUOMSelect
                                        uom={uom}
                                        setUOM={setUOM}
                                        setName={setUomName}
                                        uomName={uomName} /> */}
                                </Box>
                                <Box sx={{
                                    width: "65%", display: "flex", flexDirection: "column", pr: 1
                                }}>
                                    <CustomPaperTitle heading="Specification" />
                                    <TextFieldCustom
                                        type="text"
                                        size="sm"
                                        name="item_spec"
                                        value={item_spec}
                                        onchange={updateItemState}
                                    />
                                </Box>


                            </Box>
                        </Box>
                        <Box sx={{
                            width: "100%", display: "flex", flexDirection: "column",
                        }}>
                            <Box sx={{
                                width: "100%", p: 1, display: "flex", flexDirection: 'row'
                            }}>
                                <Box sx={{
                                    width: "15%", display: "flex", flexDirection: "column",
                                    pr: 1
                                }}>
                                    <CustomPaperTitle heading="Quantity" mandtry={1} />
                                    <TextFieldCustom
                                        type="number"
                                        size="sm"
                                        name="item_qty"
                                        value={item_qty}
                                        onchange={updateItemState}
                                    />
                                </Box>
                                <Box sx={{
                                    width: "15%", display: "flex", flexDirection: "column", pr: 1
                                }}>

                                    <CustomPaperTitle heading="Unit Price" />
                                    <TextFieldCustom
                                        type="number"
                                        size="sm"
                                        name="unitprice"
                                        value={unitprice}
                                        onchange={updateUnitPrice}
                                    />

                                </Box>
                                <Box sx={{
                                    width: "15%", display: "flex", flexDirection: "column", pr: 1
                                }}>
                                    <CustomPaperTitle heading="Approx.Cost" />
                                    <TextFieldCustom
                                        type="number"
                                        size="sm"
                                        name="approx_cost"
                                        value={approx_cost}
                                        disabled={true}
                                    />
                                </Box>

                                <Box sx={{
                                    width: "30%", display: "flex", flexDirection: "column", pr: 1, pt: 3
                                }}>
                                    <Button onClick={Approvefctn} variant="contained"
                                        size="small" color="success">Approve</Button>

                                </Box>
                                <Box sx={{
                                    width: "30%", display: "flex", flexDirection: "column",
                                    pr: 1, pt: 3
                                }}>
                                    <Button onClick={Rejectfctn} variant="contained"
                                        size="small" color="error">Reject</Button>
                                </Box>
                                <Box sx={{
                                    width: "30%", display: "flex", flexDirection: "column",
                                    pr: 1, pt: 3
                                }}>
                                    <Button onClick={onHoldfctn}
                                        variant="contained"
                                        size="small" color="warning">On - Hold</Button>
                                </Box>
                            </Box>
                        </Box>
                        {rejHoldRemarkFlag === 1 ?
                            <Box sx={{
                                width: "100%", display: "flex", flexDirection: "row", p: 1
                            }}>
                                <CustomTextarea
                                    required
                                    type="text"
                                    size="sm"
                                    style={{
                                        width: "60%",
                                        height: 50,
                                        boardColor: "#E0E0E0",
                                        mt: 1, ml: 1, mb: 1
                                    }}
                                    placeholder="Reject Remarks"
                                    value={rejHoldRemark}
                                    onchange={updateRemark}
                                />
                                <Box sx={{
                                    width: "10%", display: "flex", flexDirection: "column",
                                    pt: 1, pl: 2
                                }}>
                                    <Button onClick={RejectfctnUpdate} variant="contained"
                                        size="small" color="error">Update</Button>
                                </Box>
                            </Box> :
                            rejHoldRemarkFlag === 2 ?
                                < Box sx={{
                                    width: "100%", display: "flex", flexDirection: "row", p: 1
                                }}>
                                    <CustomTextarea
                                        required
                                        type="text"
                                        size="sm"
                                        style={{
                                            width: "60%",
                                            height: 50,
                                            boardColor: "#E0E0E0",
                                            mt: 1, ml: 1, mb: 1
                                        }}
                                        placeholder="On-Hold Remarks"
                                        value={rejHoldRemark}
                                        onchange={updateRemark}
                                    />
                                    <Box sx={{
                                        width: "10%", display: "flex", flexDirection: "column",
                                        pt: 1, pl: 2
                                    }}>
                                        <Button onClick={onHoldfctnUpdate}
                                            variant="contained"
                                            size="small" color="warning">Update</Button>
                                    </Box>
                                </Box> : null
                        }
                    </Box> : null
                }
            </Box>
        </Fragment >
    )
}

export default memo(ItemsApprovalCompnt)