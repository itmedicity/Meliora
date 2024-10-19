import React, { useCallback, memo, useState, useEffect } from 'react'
import { Box, IconButton, } from '@mui/material'
import CustomPaperTitle from 'src/views/Components/CustomPaperTitle'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import { MdOutlineAddCircleOutline } from 'react-icons/md';
import { succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import { getUOM } from 'src/redux/actions/AmUOMList.action'
import { useDispatch, useSelector } from 'react-redux'
import { axioslogin } from 'src/views/Axios/Axios'
import _ from 'underscore'
import UOMSelect from './UOMSelect';

const AddMoreItemDtails = ({ req_slno, setMoreItem }) => {
    const dispatch = useDispatch();
    //Item details initialization
    const [item_qty, setItem_qty] = useState(0)
    const [MaxSlno, setMaxSlno] = useState(0)
    const [uom, setUOM] = useState(0)
    const [uomName, setUomName] = useState('')
    const [unitprice, setUnitPrice] = useState(0)
    const [approx_cost, setapprox_cost] = useState(0)
    const [itemstate, setItemState] = useState({
        item_desc: '',
        item_brand: '',
        item_spec: '',
    })
    //Destructuring
    const { item_desc, item_brand, item_spec } = itemstate
    const updateItemState = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setItemState({ ...itemstate, [e.target.name]: value })
    }, [itemstate])

    //redux for geting login id
    const id = useSelector((state) => state.LoginUserData.empid, _.isEqual)
    const updateUnitPrice = useCallback((e) => {
        if (item_qty !== 0) {
            setUnitPrice(e.target.value)
            setapprox_cost(item_qty * e.target.value)
        }
        else {
            warningNotify("Please Enter quantity before enter unit price")
        }
    }, [item_qty])

    const OnchangeQty = useCallback((e) => {
        setItem_qty(e.target.value)
        if (unitprice !== '' || unitprice !== 0) {
            setapprox_cost(unitprice * e.target.value)
        }
    }, [unitprice])

    useEffect(() => {
        dispatch(getUOM())
        const getMaxItemSlno = async (req_slno) => {
            const result = await axioslogin.get(`/CRFRegisterApproval/getMaxItemSlno/${req_slno}`)
            const { succes, dataa } = result.data
            if (succes === 1) {
                const { max_slno } = dataa[0]
                setMaxSlno(max_slno)
            } else {
                setMaxSlno(0)
            }
        }
        getMaxItemSlno(req_slno)
    }, [dispatch, req_slno])

    const reset = useCallback(() => {
        const frmdata = {
            item_desc: '',
            item_brand: '',
            item_qty: 0,
            item_spec: '',
        }
        setItemState(frmdata)
        setUOM(0)
        setUomName('')
        setUnitPrice(0)
        setMaxSlno(0)
        setMoreItem(0)
    }, [setMoreItem])

    const AddItem = useCallback(() => {
        const AddMoreItems = async (newdata) => {
            const result = await axioslogin.post('/CRFRegisterApproval/AddMoreItemsDetails', newdata);
            const { success, message } = result.data
            if (success === 1) {
                succesNotify(message)
                reset()
            } else {
                warningNotify(message)
            }
        }
        if (item_desc !== '' && item_qty > 0 && unitprice >= 0) {
            const newdata = {
                id: Math.ceil(Math.random() * 1000),
                req_slno: req_slno,
                item_slno: MaxSlno + 1,
                item_desc: item_desc,
                item_brand: item_brand,
                item_unit: uom,
                item_qnty: parseInt(item_qty),
                uomName: uomName,
                item_specification: item_spec,
                item_unit_price: unitprice,
                aprox_cost: parseInt(approx_cost),
                item_status: 1,
                approve_item_desc: item_desc,
                approve_item_brand: item_brand,
                approve_item_unit: uom,
                item_qnty_approved: parseInt(item_qty),
                approve_item_specification: item_spec,
                approve_item_unit_price: unitprice,
                item_status_approved: 1,
                approve_item_status: 1,
                item_add_higher: 1,
                create_user: id,
                approve_aprox_cost: parseInt(approx_cost),
            }
            AddMoreItems(newdata)
        }
        else {
            warningNotify("Item Description and Quantity are mandatory and Quantity and unit price are not negative")
        }

    }, [MaxSlno, item_desc, item_brand, item_qty, uom, uomName, item_spec, unitprice, approx_cost,
        id, reset, req_slno])
    return (
        <Box sx={{
            width: "100%", display: "flex", flexDirection: "column"
        }}>
            <CustomPaperTitle heading="Estimate/Approximate/Requirement Details" />
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
                    width: "45%", display: "flex", flexDirection: "column",
                    pr: 1
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
                    width: "7%", display: "flex", flexDirection: "column",
                    pr: 1
                }}>
                    <CustomPaperTitle heading="Quantity" mandtry={1} />
                    <TextFieldCustom
                        type="number"
                        size="sm"
                        name="item_qty"
                        value={item_qty}
                        onchange={OnchangeQty}
                    />
                </Box>
                <Box sx={{
                    width: "13%", display: "flex", flexDirection: "column",
                    pr: 1
                }}>
                    <Box sx={{ pl: 0.5 }}>
                        <CustomPaperTitle heading="Unit" />
                    </Box>

                    <UOMSelect
                        uom={uom}
                        setUOM={setUOM}
                        setName={setUomName}
                        uomName={uomName}
                    />
                </Box>
                <Box sx={{
                    width: "60%", display: "flex", flexDirection: "column",
                    pr: 1
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
                <Box sx={{
                    width: "13%", display: "flex", flexDirection: "column",
                    pr: 1
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
                    width: "7%", display: "flex", flexDirection: "column",
                    pr: 1
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
                    width: "7%",
                    pt: 2
                }}>
                    <IconButton variant="outlined" color="primary" onClick={AddItem}>
                        <MdOutlineAddCircleOutline size={30} />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    )
}

export default memo(AddMoreItemDtails)