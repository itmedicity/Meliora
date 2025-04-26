import React, { useCallback, memo, useState, useEffect, Fragment, useMemo } from 'react'
import CustomPaperTitle from 'src/views/Components/CustomPaperTitle'
import { succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import { getUOM } from 'src/redux/actions/AmUOMList.action'
import { useDispatch, useSelector } from 'react-redux'
import { axioskmc, axioslogin } from 'src/views/Axios/Axios'
import _ from 'underscore'
import CustomInputDateCmp from './Components/CustomInputDateCmp'
import { Box, IconButton } from '@mui/joy'
import UomApprvSelect from './Components/UomApprvSelect'
import { useQuery, useQueryClient } from 'react-query'
import { getApprovedCrfItems, getMaxslNoOfCrfItem } from 'src/api/CommonApiCRF'
import { getApprovedCrfItemskmc, getMaxslNoOfCrfItemkmc } from 'src/api/CommonApiCRFKmc'

const AddMoreItemDtails = ({ req_slno, setMoreItem, setApproveTableData, selectedCompany }) => {
    const dispatch = useDispatch();
    const queryClient = useQueryClient()
    const id = useSelector((state) => state.LoginUserData.empid, _.isEqual)
    //Item details initialization
    const [uom, setUOM] = useState(0)
    const [itemDetails, setItemDetails] = useState({
        item_qty: 0,
        maxSlno: 0,
        unitprice: 0,
        approx_cost: 0,
        item_desc: '',
        item_brand: '',
        item_spec: '',
    })
    const { item_qty, maxSlno, unitprice, approx_cost, item_desc, item_brand, item_spec } = itemDetails

    const updateItemState = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setItemDetails({ ...itemDetails, [e.target.name]: value })
    }, [itemDetails])

    useEffect(() => {
        dispatch(getUOM());
    }, [dispatch])

    const onchangeQty = useCallback((e) => {
        setItemDetails(prev => ({
            ...prev,
            item_qty: (e.target.value),
            approx_cost: (unitprice !== '' || unitprice !== 0) ? (unitprice * e.target.value) : 0
        }))
    }, [unitprice])

    const updateUnitPrice = useCallback((e) => {
        if (item_qty !== 0) {
            setItemDetails(prev => ({
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


    useEffect(() => {
        if (selectedCompany === "1") {
            if (itemData && itemData.length !== 0) {
                setApproveTableData(itemData)
            }
        } else if (selectedCompany === "2") {
            if (kmcitemData && kmcitemData.length !== 0) {
                setApproveTableData(kmcitemData)
            }
        }

    }, [itemData, setApproveTableData, kmcitemData, selectedCompany])

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
            if (maxSlnoData && maxSlnoData.length !== 0) {
                const { maxSlno } = maxSlnoData[0];
                setItemDetails(prev => ({
                    ...prev,
                    maxSlno: maxSlno
                }))
            }
        } else if (selectedCompany === "2") {
            if (kmcmaxSlnoData && kmcmaxSlnoData.length !== 0) {
                const { maxSlno } = kmcmaxSlnoData[0];
                setItemDetails(prev => ({
                    ...prev,
                    maxSlno: maxSlno
                }))
            }
        }

    }, [maxSlnoData, selectedCompany, kmcmaxSlnoData])

    const reset = useCallback(() => {
        const frmdata = {
            item_qty: 0,
            maxSlno: 0,
            unitprice: 0,
            approx_cost: 0,
            item_desc: '',
            item_brand: '',
            item_spec: '',
        }
        setItemDetails(frmdata)
        setUOM(0)
        setMoreItem(0)

    }, [setMoreItem])

    const AddItem = useCallback(() => {
        const AddMoreItems = async (newdata) => {
            const result = await axioslogin.post('/CRFRegisterApproval/AddMoreItemsDetails', newdata);
            const { success, message } = result.data
            if (success === 1) {
                succesNotify(message)
                queryClient.invalidateQueries('approvedRejholdItemList')
                queryClient.invalidateQueries('getmaxSlno')
                reset()
            } else {
                warningNotify(message)
            }
        }
        const AddMoreItemskmc = async (newdata) => {
            const result = await axioskmc.post('/CRFRegisterApproval/AddMoreItemsDetails', newdata);
            const { success, message } = result.data
            if (success === 1) {
                succesNotify(message)
                queryClient.invalidateQueries('approvedRejholdItemList')
                queryClient.invalidateQueries('getmaxSlno')
                reset()
            } else {
                warningNotify(message)
            }
        }
        if (item_desc !== '' && item_qty > 0 && unitprice >= 0) {
            const newdata = {
                id: Math.ceil(Math.random() * 1000),
                req_slno: req_slno,
                item_slno: maxSlno + 1,
                item_desc: item_desc,
                item_brand: item_brand,
                item_unit: uom,
                item_qnty: parseInt(item_qty),
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
            if (selectedCompany === "1") {
                AddMoreItems(newdata)
            } else if (selectedCompany === "2") {
                AddMoreItemskmc(newdata)
            }
        }
        else {
            warningNotify("Item Description and Quantity are mandatory and Quantity and unit price are not negative")
        }

    }, [maxSlno, item_desc, item_brand, item_qty, uom, item_spec, unitprice, approx_cost, id, reset, req_slno, queryClient, selectedCompany])

    const cancelEdit = useCallback(() => {
        reset()
    }, [reset])

    if (isItemsLoading || isSlnoLoading || kmcisSlnoLoading || isItemskmcLoading) return <p>Loading...</p>;
    if (itemsError || slnoError || kmcslnoError || kmcitemsError) return <p>Error occurred.</p>;
    return (
        <Fragment>
            <Box sx={{ px: 0.5, pt: 0.5 }}>
                <Box sx={{ display: 'flex', }}>
                    <Box sx={{ flex: 1.5, }}>
                        <CustomPaperTitle heading="Item Description" mandtry={1} />
                        <CustomInputDateCmp
                            className={{ height: 37, ml: 0.5 }}
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
                            className={{ height: 37, ml: 0.5, mt: 0.3 }}
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
                            className={{ height: 37, mx: 0.5, mt: 0.3 }}
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
                            handleChange={onchangeQty}
                        />
                    </Box>
                    <Box sx={{ flex: 0.6, pl: 0.5, mt: 0.1 }}>
                        <CustomPaperTitle heading="Unit" />
                        <Box sx={{ pt: 0.2 }}>
                            <UomApprvSelect
                                uom={uom}
                                setUOM={setUOM}
                            />
                        </Box>

                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <CustomPaperTitle heading="Unit Price" />
                        <Box sx={{ pt: 0.2 }}>
                            <CustomInputDateCmp
                                className={{ height: 37, ml: 0.5 }}
                                autoComplete='off'
                                size={'sm'}
                                type={'number'}
                                name={'unitprice'}
                                value={unitprice}
                                handleChange={updateUnitPrice}
                            />
                        </Box>
                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <CustomPaperTitle heading="Approx.Cost" />
                        <Box sx={{ pt: 0.2 }}>
                            <CustomInputDateCmp
                                className={{ height: 37, ml: 0.5 }}
                                size={'sm'}
                                autoComplete='off'
                                name={'approx_cost'}
                                value={approx_cost}
                                disabled={true}
                            />
                        </Box>
                    </Box>
                    <Box sx={{ flex: 0.7, ml: 1 }}>
                        <IconButton
                            sx={{
                                fontSize: 12, height: '37px', lineHeight: '1.2', mt: 2.9, border: '1px solid #bbdefb',
                                color: '#1565c0', bgcolor: 'white', borderRadius: 5, width: '100%',
                                '&:hover': {
                                    bgcolor: 'white', color: '#43B0F1'
                                },
                            }}
                            onClick={AddItem} >
                            Add
                        </IconButton>
                    </Box>
                    <Box sx={{ flex: 0.5, mr: 1, ml: 0.5 }}>
                        <IconButton
                            sx={{
                                fontSize: 12, height: '35px', lineHeight: '1.2', mt: 2.9, border: '1px solid #bbdefb',
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
        </Fragment>
    )
}

export default memo(AddMoreItemDtails)