import { Box, CssVarsProvider, Input, Tooltip } from '@mui/joy'
import React, { Fragment, memo, useEffect } from 'react'
import { useCallback } from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import CustomBackDrop from 'src/views/Components/CustomBackDrop'
import { Badge, Button, FormControlLabel, keyframes, Paper, Radio, RadioGroup, Typography } from '@mui/material'
import { getStoreReceiveAllAction, getStoreReceivePendingAction } from 'src/redux/actions/CrmStoreProcess.action'
import { useDispatch, useSelector } from 'react-redux'
import { Virtuoso } from 'react-virtuoso'
import { format } from 'date-fns'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { axiosellider, axioslogin } from 'src/views/Axios/Axios'
import LocalShippingTwoToneIcon from '@mui/icons-material/LocalShippingTwoTone';
import ReceiptLongTwoToneIcon from '@mui/icons-material/ReceiptLongTwoTone';
import AlignHorizontalLeftTwoToneIcon from '@mui/icons-material/AlignHorizontalLeftTwoTone';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import _ from 'underscore'
import FeaturedPlayListTwoToneIcon from '@mui/icons-material/FeaturedPlayListTwoTone';
import CustomCloseIconCmp from '../ComonComponent/Components/CustomCloseIconCmp'

const FullyReceiveTableView = React.lazy(() => import("./Component/FullyReceiveTableView"))
const GrnDetailsViewModal = React.lazy(() => import("./Component/GrnDetailsViewModal"))
const CountDownReqtoExpect = React.lazy(() => import("./Component/CountDownReqtoExpect"))

const CrfStoreProcessMain = () => {
    const moveTopToBottom = keyframes`
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(1.5px);
    }
  `;
    const history = useHistory();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false)
    const [disData, setDisData] = useState([])
    const [fullyReceived, setFullyReceived] = useState([])
    const [fullyInitialData, setFullyInitialData] = useState([])
    const [radiovalue, setRadioValue] = useState('1')
    const [count, setCount] = useState(0)
    const [initialData, setInitialData] = useState([])
    const [grnDetailsView, setgrnDetailsView] = useState([])
    const [poNumber, setPoNumber] = useState()
    const [storeState, setStoreState] = useState({
        notReceiveCount: 0,
        fullyCount: 0,
        searchSup: '',
        searchPo: '',
        searchCrf: '',
        modalopen: false,
        modFlag: 0
    })
    const { notReceiveCount, fullyCount, searchSup, searchPo, searchCrf, modalopen, modFlag } = storeState
    const id = useSelector((state) => state.LoginUserData.empid, _.isEqual)
    const backtoHome = useCallback(() => {
        history.push('/Home/CrfNewDashBoard')
    }, [history])

    useEffect(() => {
        dispatch(getStoreReceivePendingAction())
        dispatch(getStoreReceiveAllAction())
    }, [dispatch, count])

    const storeReceivePending = useSelector((state) => state?.getStoreReceivePendingReducer?.setCRMStorePendingList)
    const stroreReceiveAll = useSelector((state) => state?.getStoreReceiveAllReducer?.setCRMStoreAllList)
    const changeSupplier = useCallback((e) => {
        setStoreState((prev) => ({
            ...prev,
            searchSup: e.target.value,
            searchPo: '',
            searchCrf: '',
        }));
    }, [])
    const changePo = useCallback((e) => {
        setStoreState((prev) => ({
            ...prev,
            searchSup: '',
            searchPo: e.target.value,
            searchCrf: '',
        }));
    }, [])
    const changeCrfNo = useCallback((e) => {
        setStoreState((prev) => ({
            ...prev,
            searchSup: '',
            searchPo: '',
            searchCrf: e.target.value,
        }));
    }, [])
    useEffect(() => {
        if (storeReceivePending.length !== 0) {
            const newArray = storeReceivePending
                .filter((val, index, self) =>
                    index === self.findIndex((value) => value.po_number === val.po_number && value.req_slno === val.req_slno
                        && value.crm_purchase_slno === val.crm_purchase_slno))
            setStoreState((prev) => ({
                ...prev,
                notReceiveCount: newArray.length
            }));
        } else {
            setStoreState((prev) => ({
                ...prev,
                notReceiveCount: 0
            }));
        }
        if (stroreReceiveAll.length !== 0) {
            // const fCount = stroreReceiveAll?.filter((val) => val.fully_receive === 1)
            const fCount = stroreReceiveAll
                .filter((val, index, self) =>
                    index === self.findIndex((value) => value.po_number === val.po_number && value.req_slno === val.req_slno
                        && value.crm_purchase_slno === val.crm_purchase_slno))
            setStoreState((prev) => ({
                ...prev,
                fullyCount: fCount.length
            }));
        }
        else {
            setStoreState((prev) => ({
                ...prev,
                fullyCount: 0
            }));
        }

    }, [storeReceivePending, stroreReceiveAll, count])

    useEffect(() => {
        if (radiovalue === '1') {
            const newArray = storeReceivePending
                .filter((val, index, self) =>
                    index === self.findIndex((value) => value.po_number === val.po_number && value.req_slno === val.req_slno
                        && value.crm_purchase_slno === val.crm_purchase_slno))
                .map((val) => (
                    {
                        crm_purchase_slno: val.crm_purchase_slno,
                        po_detail_slno: val.po_detail_slno,
                        req_slno: val.req_slno,
                        expected_delivery: val.expected_delivery,
                        main_store: val.main_store,
                        sub_store_name: val.sub_store_name,
                        po_complete_date: val.po_complete_date,
                        po_date: val.po_date,
                        po_number: val.po_number,
                        store_code: val.crs_store_code,
                        po_process_user: val.po_process_user,
                        po_to_supplier_date: val.po_to_supplier_date,
                        supplier_code: val.supplier_code,
                        supplier_name: val.supplier_name,
                        store_recieve: val.store_recieve,
                        checked: false
                    }));

            const poItems = storeReceivePending?.map((val) => {
                const obj = {
                    po_detail_slno: val.po_detail_slno,
                    item_code: val.item_code,
                    item_name: val.item_name,
                    item_qty: val.item_qty,
                    item_receive_status: val.item_receive_status,
                    grn_qnty: val.grn_qnty,
                    received_qnty: val.received_qnty,
                    // grn_no: val.grn_no ? JSON?.parse(val.grn_no).join(' , ') : 'Not Updated'
                    grn_no: val.grn_no
                }
                return obj
            })

            const combinedData = newArray?.map(po => {
                const details = poItems?.filter(item => item.po_detail_slno === po.po_detail_slno);
                return {
                    ...po,
                    items: details
                };
            });

            setDisData(combinedData)
            setInitialData(combinedData)
        } else if (radiovalue === '2') {

        }
    }, [radiovalue, storeReceivePending, stroreReceiveAll, count])

    //Radio button OnClick function starts

    const updateRadioClick = useCallback(async (e) => {
        e.preventDefault()
        setOpen(false)
        setRadioValue(e.target.value)
        if (e.target.value === '1') {

        } else if (e.target.value === '2') {
            if (stroreReceiveAll.length !== 0) {
                const newArray = stroreReceiveAll
                    .filter((val, index, self) =>
                        index === self.findIndex((value) => value.po_number === val.po_number && value.req_slno === val.req_slno
                            && value.crm_purchase_slno === val.crm_purchase_slno))
                    .map((val) => (
                        {
                            crm_purchase_slno: val.crm_purchase_slno,
                            po_detail_slno: val.po_detail_slno,
                            req_slno: val.req_slno,
                            po_number: val.po_number,
                            po_date: val.po_date,
                            po_to_supplier_date: val.po_to_supplier_date,
                            supplier_name: val.supplier_name,
                            expected_delivery: val.expected_delivery,
                            main_store: val.main_store,
                            sub_store_name: val.sub_store_name
                        }));

                const poItems = stroreReceiveAll?.map((val) => {
                    const obj = {
                        po_detail_slno: val.po_detail_slno,
                        item_code: val.item_code,
                        item_name: val.item_name,
                        item_qty: val.item_qty,
                        item_receive_status: val.item_receive_status,
                        grn_qnty: val.grn_qnty,
                        received_qnty: val.received_qnty,
                        // grn_no: val.grn_no ? JSON?.parse(val.grn_no).join(' , ') : 'Not Updated'
                        grn_no: val.grn_no
                    }
                    return obj
                })
                const combinedData = newArray?.map(po => {
                    const details = poItems?.filter(item => item.po_detail_slno === po.po_detail_slno);
                    return {
                        ...po,
                        items: details
                    };
                });
                setFullyReceived(combinedData)
                setFullyInitialData(combinedData)
            }
        }
    }, [stroreReceiveAll])

    const SearchData = useCallback(() => {
        if (searchSup !== '' || searchCrf !== '' || searchPo !== '') {
            const searchData = {
                supplier_name: searchSup,
                req_slno: searchCrf,
                po_number: searchPo
            }
            if (radiovalue === '1') {
                const getSearchDetails = async (searchData) => {
                    const result = await axioslogin.post('/newCRFStore/searchData', searchData);
                    return result.data
                }
                getSearchDetails(searchData).then((val) => {
                    const { success, data, message } = val
                    if (success === 1) {
                        const newArray = data
                            .filter((val, index, self) =>
                                index === self.findIndex((value) => value.po_number === val.po_number && value.req_slno === val.req_slno
                                    && value.crm_purchase_slno === val.crm_purchase_slno))
                            .map((val) => (
                                {
                                    crm_purchase_slno: val.crm_purchase_slno,
                                    po_detail_slno: val.po_detail_slno,
                                    req_slno: val.req_slno,
                                    expected_delivery: val.expected_delivery,
                                    main_store: val.main_store,
                                    sub_store_name: val.sub_store_name,
                                    po_complete_date: val.po_complete_date,
                                    po_date: val.po_date,
                                    po_number: val.po_number,
                                    store_code: val.crs_store_code,
                                    po_process_user: val.po_process_user,
                                    po_to_supplier_date: val.po_to_supplier_date,
                                    supplier_code: val.supplier_code,
                                    supplier_name: val.supplier_name,
                                    store_recieve: val.store_recieve,
                                    checked: false
                                }));
                        const poItems = data?.map((val) => {
                            const obj = {
                                po_detail_slno: val.po_detail_slno,
                                item_code: val.item_code,
                                item_name: val.item_name,
                                item_qty: val.item_qty,
                                item_receive_status: val.item_receive_status,
                                grn_qnty: val.grn_qnty,
                                received_qnty: val.received_qnty,
                                // grn_no: val.grn_no ? JSON?.parse(val.grn_no).join(' , ') : 'Not Updated'
                                grn_no: val.grn_no
                            }
                            return obj
                        })
                        const combinedData = newArray?.map(po => {
                            const details = poItems?.filter(item => item.po_detail_slno === po.po_detail_slno);
                            return {
                                ...po,
                                items: details
                            };
                        });
                        setDisData(combinedData)
                    } else {
                        infoNotify(message)
                    }
                })
            } else if (radiovalue === '2') {
                const getSearchDetails = async (searchData) => {
                    const result = await axioslogin.post('/newCRFStore/searchFullReceive', searchData);
                    return result.data
                }
                getSearchDetails(searchData).then((val) => {
                    const { success, data, message } = val
                    if (success === 1) {
                        const newArray = data
                            .filter((val, index, self) =>
                                index === self.findIndex((value) => value.po_number === val.po_number && value.req_slno === val.req_slno
                                    && value.crm_purchase_slno === val.crm_purchase_slno))
                            .map((val) => (
                                {
                                    crm_purchase_slno: val.crm_purchase_slno,
                                    po_detail_slno: val.po_detail_slno,
                                    req_slno: val.req_slno,
                                    po_number: val.po_number,
                                    po_date: val.po_date,
                                    po_to_supplier_date: val.po_to_supplier_date,
                                    supplier_name: val.supplier_name,
                                    expected_delivery: val.expected_delivery,
                                    main_store: val.main_store,
                                    sub_store_name: val.sub_store_name
                                }));

                        const poItems = data?.map((val) => {
                            const obj = {
                                po_detail_slno: val.po_detail_slno,
                                item_code: val.item_code,
                                item_name: val.item_name,
                                item_qty: val.item_qty,
                                item_receive_status: val.item_receive_status,
                                grn_qnty: val.grn_qnty,
                                received_qnty: val.received_qnty,
                                // grn_no: val.grn_no ? JSON?.parse(val.grn_no).join(' , ') : 'Not Updated'
                                grn_no: val.grn_no
                            }
                            return obj
                        })
                        const combinedData = newArray?.map(po => {
                            const details = poItems?.filter(item => item.po_detail_slno === po.po_detail_slno);
                            return {
                                ...po,
                                items: details
                            };
                        });
                        setFullyReceived(combinedData)
                    }
                    else {
                        infoNotify(message)
                    }
                })
            }
        } else {
            infoNotify("Enter Details for Search")
            setDisData(initialData)
            // setAllSelected(false)
            setFullyReceived(fullyInitialData)
        }
    }, [searchSup, searchCrf, searchPo, initialData, radiovalue, fullyInitialData])

    const getGrnDetails = useCallback(() => {
        // setAllSelected(false)
        const getPendingPODetails = async () => {
            const result = await axioslogin.get('/newCRFStore/getGrnPO');
            return result.data
        }
        const getGrnItemDetailsEllider = async (posearch) => {
            const result = await axiosellider.post('/crfpurchase/getGrnDetails', posearch);
            return result.data
        }
        const UpdateGrnItemQnty = async (patchQnty) => {
            const result = await axioslogin.post('/newCRFStore/updateQty', patchQnty)
            return result.data
        }
        const updateStoreReceiveStatus = async (updateStatus) => {
            const result = await axioslogin.post('/newCRFStore/storeReceive', updateStatus);
            return result.data
        }
        const existCheck = async (posearch) => {
            const result = await axioslogin.post('/newCRFStore/existPO', posearch);
            return result.data
        }
        const insertGrnDetails = async (postdata) => {
            const result = await axioslogin.post('/newCRFStore/grnInsert', postdata);
            return result.data
        }
        const updateGrnDetails = async (patchdata) => {
            const result = await axioslogin.post('/newCRFStore/grnUpdate', patchdata);
            return result.data
        }
        getPendingPODetails().then((val) => {
            setOpen(true)
            const { success, data, message } = val
            if (success === 1) {
                const posearch = data?.reduce((acc, val) => {
                    if (!acc.some(item => item.pono === val.po_number && item.stcode === val.crs_store_code)) {
                        acc.push({
                            pono: val.po_number,
                            stcode: val.crs_store_code
                        });
                    }
                    return acc;
                }, []);

                const poNumber = data?.map((val) => {
                    return {
                        req_slno: val.req_slno,
                        crm_purchase_slno: val.crm_purchase_slno,
                        pono: val.po_number,
                        stcode: val.crs_store_code,
                        po_detail_slno: val.po_detail_slno,
                        item_code: val.item_code
                    }
                })
                setOpen(false)
                getGrnItemDetailsEllider(posearch).then((val) => {
                    const { success, elliderdata } = val
                    if (success === 1) {
                        const seen = new Set();
                        const patchQnty = elliderdata?.map(item => {
                            const poItems = poNumber?.filter(po => po.pono === item.PO_NO && po.stcode === item.ST_CODE && po.item_code === item.IT_CODE);
                            return poItems.map(poItem => {
                                const uniqueKey = `${poItem.po_detail_slno}-${item.IT_CODE}-${item.PDN_SUPQTY}`;
                                if (!seen.has(uniqueKey)) {
                                    seen.add(uniqueKey);

                                    let item_receive_status;
                                    if (item.PDN_SUPQTY === 0) {
                                        item_receive_status = null;
                                    } else if (item.PDN_SUPQTY < item.PDN_QTY) {
                                        item_receive_status = 0;
                                    } else if (item.PDN_SUPQTY >= item.PDN_QTY) {
                                        item_receive_status = 1;
                                    }
                                    return {
                                        req_slno: poItem.req_slno,
                                        crm_purchase_slno: poItem.crm_purchase_slno,
                                        grn_qnty: item.PDN_SUPQTY,
                                        received_qnty: item.PDN_SUPQTY,
                                        item_receive_status: item_receive_status,
                                        po_detail_slno: poItem.po_detail_slno,
                                        item_code: item.IT_CODE
                                    };
                                }
                                return null;
                            }).filter(item => item !== null);
                        }).flat();
                        UpdateGrnItemQnty(patchQnty).then((val) => {
                            const { success } = val
                            if (success === 1) {
                                const groupedBySlno = patchQnty.reduce((acc, curr) => {
                                    if (!acc[curr.po_detail_slno]) {
                                        acc[curr.po_detail_slno] = { statuses: [], req_slno: curr.req_slno, crm_purchase_slno: curr.crm_purchase_slno };
                                    }
                                    acc[curr.po_detail_slno].statuses.push(curr.item_receive_status);
                                    return acc;
                                }, {});

                                const updateStatus = Object.entries(groupedBySlno).map(([po_detail_slno, groupData]) => {
                                    const { statuses, req_slno, crm_purchase_slno } = groupData;

                                    let store_recieve, sub_store_recieve;

                                    if (statuses.every(status => status === 1)) {
                                        store_recieve = 1;
                                        sub_store_recieve = 0;
                                    } else if (statuses.every(status => status === null)) {
                                        store_recieve = null;
                                        sub_store_recieve = null;
                                    } else {
                                        store_recieve = 0;
                                        sub_store_recieve = 0;
                                    }
                                    return {
                                        po_detail_slno: Number(po_detail_slno),
                                        store_recieve: store_recieve,
                                        sub_store_recieve: sub_store_recieve,
                                        store_receive_user: id,
                                        store_receive_date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
                                        req_slno: req_slno,
                                        crm_purchase_slno: crm_purchase_slno
                                    };
                                });

                                updateStoreReceiveStatus(updateStatus).then((val) => {
                                    const { success } = val
                                    if (success === 1) {
                                        setCount(count + 1)
                                        const finalData = elliderdata?.map(item => `${item.PO_NO}-${item.ST_CODE}`)
                                            .filter((value, index, self) => self.indexOf(value) === index)
                                            .map(key => {
                                                const [PO_NO, ST_CODE] = key.split('-');
                                                const GR_NO = elliderdata?.filter(item => item.PO_NO === PO_NO && item.ST_CODE === ST_CODE)
                                                    .map(item => {
                                                        return {
                                                            GR_NO: item.GR_NO,
                                                            IT_CODE: item.IT_CODE,
                                                            GRD_DATE: item.GRD_DATE
                                                        }
                                                    },)
                                                    .filter((value, index, self) => self.indexOf(value) === index);
                                                return { PO_NO, ST_CODE, GR_NO };
                                            });
                                        existCheck(posearch).then((val) => {
                                            const { success, existdata } = val
                                            if (success === 1) {
                                                setOpen(false)
                                                // update
                                                const patchdata = finalData
                                                    .filter(grn => existdata?.find(exist =>
                                                        exist.po_number === grn.PO_NO && exist.store_code === grn.ST_CODE
                                                    ))
                                                    .map(grn => {
                                                        const upadteArry = existdata.find(exist =>
                                                            exist.po_number === grn.PO_NO && exist.store_code === grn.ST_CODE
                                                        );
                                                        return {
                                                            grn_slno: upadteArry.grn_slno,
                                                            store_code: grn.ST_CODE,
                                                            po_number: grn.PO_NO,
                                                            grn_no: grn.GR_NO,
                                                            edit_user: id
                                                        };
                                                    });
                                                const postdata = finalData
                                                    .filter(grn => !existdata.find(exist =>
                                                        exist.po_number === grn.PO_NO && exist.store_code === grn.ST_CODE
                                                    ))
                                                    .map(grn => ({
                                                        store_code: grn.ST_CODE,
                                                        po_number: grn.PO_NO,
                                                        grn_no: grn.GR_NO,
                                                        create_user: id
                                                    }));

                                                if (patchdata.length !== 0) {
                                                    updateGrnDetails(patchdata).then((value) => {
                                                        const { success } = value
                                                        if (success === 1) {
                                                            setOpen(false)
                                                            setCount(count + 1)
                                                        }
                                                    })
                                                }
                                                if (postdata.length !== 0) {
                                                    insertGrnDetails(postdata).then((val) => {
                                                        const { success } = val
                                                        if (success === 1) {
                                                            setOpen(false)
                                                            setCount(count + 1)
                                                        }
                                                    })
                                                }
                                                succesNotify("Updated Successfully")
                                            }
                                            else if (success === 2) {
                                                // insert
                                                const postdata = finalData?.map((val) => {
                                                    return {
                                                        store_code: val.ST_CODE,
                                                        po_number: val.PO_NO,
                                                        grn_no: val.GR_NO,
                                                        create_user: id

                                                    }
                                                })
                                                insertGrnDetails(postdata).then((val) => {
                                                    const { success, message } = val
                                                    if (success === 1) {
                                                        setOpen(false)
                                                        setCount(count + 1)
                                                        succesNotify(message)
                                                    }
                                                })
                                            }
                                        })

                                    } else {
                                        succesNotify("Updated Successfully")
                                    }
                                })
                            }
                            else {
                                // update grnqnty else part
                                succesNotify("Updated Successfully")
                            }
                        })
                    }
                    else {
                        // get grn details from ellider success 2
                    }
                })
            }
            else if (success === 2) {
                infoNotify(message)
            }
        })
    }, [id, count])

    // const ReceiveData = useCallback(() => {
    //     const newData = disData?.filter((val) => val.checked === true)
    //     if (newData.length === 0) {

    //         infoNotify("Select Any Details");
    //         return;
    //     }

    //     const poNumber = newData?.map((val) => {
    //         return {
    //             poSlno: val.po_detail_slno
    //         }
    //     })
    //     const getPOItems = async (poNumber) => {
    //         const result = await axioslogin.post('/newCRFStore/getItems', poNumber);
    //         return result.data
    //     }
    //     getPOItems(poNumber).then((val) => {
    //         const { success, data } = val
    //         if (success === 1) {
    //             setPoItems(data);
    //             setReceiveFlag(1)
    //             setReceiveModal(true)
    //         } else {

    //         }
    //     })
    // }, [disData])
    // const handleSelectAll = () => {
    //     const newSelectionState = !allSelected;
    //     setAllSelected(newSelectionState);
    //     setDisData(disData.map(item => ({ ...item, checked: newSelectionState })));
    // };
    // const handleCheckboxChange = useCallback((index) => {
    //     setDisData(prevData =>
    //         prevData.map((item, idx) =>
    //             idx === index ? { ...item, checked: !item.checked } : item
    //         )
    //     );
    // }, []);

    // const handleClose = useCallback(() => {
    //     setReceiveModal(false)
    //     setReceiveFlag(0)
    //     setAllSelected(false)
    //     const newSelectionState = !allSelected;
    //     setAllSelected(newSelectionState);
    //     setDisData(disData.map(item => ({ ...item, checked: newSelectionState })))
    // }, [setReceiveModal, allSelected, disData])

    const handleCloseGrn = useCallback(() => {
        setStoreState((prev) => ({
            ...prev,
            modalopen: false,
            modFlag: 0
        }));
        setgrnDetailsView([])
    }, [])

    const viewGrnDetails = useCallback((pos, items) => {
        if (items.length !== 0) {
            setPoNumber(pos)
            setgrnDetailsView(items)
            setStoreState((prev) => ({
                ...prev,
                modalopen: true,
                modFlag: 1
            }));

        } else {
            setgrnDetailsView([])
            setStoreState((prev) => ({
                ...prev,
                modalopen: false,
                modFlag: 0
            }));
            infoNotify("No Report Found")
        }

    }, [])
    const capitalizeWords = (str) => str ? str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : '';
    return (
        <Fragment>
            <CustomBackDrop open={open} text="Please Wait" />
            {/* {receiveFlag === 1 ? <StoreReceiveItemModal handleClose={handleClose} open={receiveModal} poItems={poItems}
                count={count} setCount={setCount} />
                : null} */}
            {modFlag === 1 ? < GrnDetailsViewModal handleCloseGrn={handleCloseGrn} open={modalopen} grnData={grnDetailsView} poNumber={poNumber} /> : null}
            <Box sx={{ height: window.innerHeight - 100, flexWrap: 'wrap', bgcolor: 'white' }}>
                <Box sx={{ display: 'flex', backgroundColor: "#f0f3f5", border: '1px solid #B4F5F0' }}>
                    <Box sx={{ fontWeight: 550, flex: 1, pl: 1, pt: .5, color: '#385E72', }}>CRS Store</Box>
                    <CssVarsProvider>
                        <CustomCloseIconCmp
                            handleChange={backtoHome}
                        />
                    </CssVarsProvider>
                </Box>
                <Paper sx={{ p: 1, bgcolor: '#E3EFF9' }}>
                    <Box sx={{
                        width: "100%", pt: 0.5, flex: 1, display: 'flex', borderRadius: 5,
                        flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" },
                    }}>
                        <Box sx={{ display: "flex", }}>
                            <RadioGroup
                                sx={{}}
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={radiovalue}
                                onChange={(e) => updateRadioClick(e)}
                            >
                                <Badge
                                    badgeContent={notReceiveCount}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    sx={{
                                        '& .MuiBadge-badge': {
                                            backgroundColor: '#ef6c00',
                                            color: 'white',
                                            transform: 'translate(70%, -10%)',
                                        }
                                    }}
                                ><FormControlLabel value='1' control={
                                    <Radio
                                        sx={{
                                            color: '#ef6c00',
                                            '&.Mui-checked': {
                                                color: '#ef6c00',
                                            },
                                        }} />} label="Not Received" />
                                </Badge>
                                <Badge
                                    badgeContent={fullyCount}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    sx={{
                                        mr: 1,
                                        '& .MuiBadge-badge': {
                                            backgroundColor: '#1b5e20',
                                            color: 'white',
                                            transform: 'translate(70%, -10%)',
                                        }
                                    }}
                                >
                                    <FormControlLabel value='2' sx={{ pl: 3 }} control={
                                        <Radio
                                            sx={{
                                                color: '#1b5e20',
                                                '&.Mui-checked': {
                                                    color: '#1b5e20',
                                                },
                                            }} />}
                                        label="Fully Received" />
                                </Badge>
                            </RadioGroup>
                        </Box>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', padding: '0 16px', gap: 0.1, flex: 1 }}>
                            <Box sx={{ pl: 0.5, pt: 0.6, flex: '1 1 auto', minWidth: '50px', width: '150px' }}>
                                <CssVarsProvider>
                                    <Input
                                        startDecorator={<LocalShippingTwoToneIcon sx={{ height: 22, width: 22, color: '#0063C5' }} />}
                                        size="sm" placeholder="Search By Supplier"
                                        autoComplete='off'
                                        name="searchSup"
                                        value={searchSup}
                                        onChange={changeSupplier}
                                        sx={{ height: 35 }}
                                    />
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ pl: 0.5, pt: 0.6, flex: '1 1 auto', minWidth: '50px', width: '150px' }}>
                                <CssVarsProvider>
                                    <Input
                                        startDecorator={<ReceiptLongTwoToneIcon sx={{ height: 22, width: 22, color: '#0063C5' }} />}
                                        size="sm" placeholder="Search By PO No."
                                        autoComplete='off'
                                        name="searchPo"
                                        value={searchPo}
                                        onChange={changePo}
                                        sx={{ height: 35 }}
                                    />
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ pl: 0.5, pt: 0.6, flex: '1 1 auto', minWidth: '50px', width: '200px' }}>
                                <CssVarsProvider>
                                    <Input
                                        startDecorator={
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <AlignHorizontalLeftTwoToneIcon sx={{ height: 18, width: 18, color: '#0063C5' }} />
                                                <Typography sx={{ ml: 1, fontSize: '13px', color: '#0063C5' }}>CRF/TMC/</Typography>
                                            </Box>
                                        }
                                        size="sm" placeholder="Search By CRF No."
                                        autoComplete='off'
                                        name="searchCrf"
                                        value={searchCrf}
                                        onChange={changeCrfNo}
                                        sx={{ height: 35 }}
                                    />
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ pl: 0.6, pt: 0.6, minWidth: '50px', width: '150px' }}>
                                <Button variant="contained"
                                    startIcon={
                                        <SearchTwoToneIcon
                                            sx={{
                                                height: 22,
                                                width: 22,
                                                color: '#0277bd',
                                                // animation: `${moveTopToBottom} 1s infinite alternate`
                                            }}
                                        />}
                                    sx={{
                                        borderRadius: 1, fontSize: 12, height: 33, width: '150px',
                                        lineHeight: '1.2', color: '#01579b', bgcolor: 'white', textTransform: 'capitalize',
                                        '&:hover': {
                                            bgcolor: '#F0F4F8',
                                        },
                                    }}
                                    onClick={SearchData}
                                >
                                    Search
                                </Button>
                            </Box>
                            <Box sx={{ pt: 0.6, minWidth: '50px', width: '150px', pl: 1.5 }}>
                                <Button variant="contained"
                                    startIcon={
                                        <ArrowDownwardIcon
                                            sx={{
                                                height: 22,
                                                width: 22,
                                                color: '#0277bd',
                                                animation: `${moveTopToBottom} 1s infinite alternate`
                                            }}
                                        />}
                                    sx={{
                                        borderRadius: 1, fontSize: 12, height: 33, width: '150px',
                                        lineHeight: '1.2', color: '#01579b', bgcolor: 'white', textTransform: 'capitalize',
                                        '&:hover': {
                                            bgcolor: '#F0F4F8',
                                        },
                                    }}
                                    onClick={getGrnDetails}
                                >
                                    Get Grn Details
                                </Button>
                            </Box>
                            {/* <Box sx={{ pt: 0.6, flex: '0.5 0.5 auto', width: '50px', width: '150px' }}>
                            <Button variant="contained"
                                startIcon={
                                     <SystemUpdateAltTwoToneIcon
                                        sx={{
                                            height: 22,
                                            width: 22,
                                            color: '#0277bd',
                                            // animation: `${moveTopToBottom} 1s infinite alternate`
                                        }}
                                    />}
                                sx={{
                                    borderRadius: 1, fontSize: 12, height: 33, width: '150px',
                                    lineHeight: '1.2', color: '#01579b', bgcolor: 'white', textTransform: 'capitalize',
                                    '&:hover': {
                                        bgcolor: '#F0F4F8',
                                    },

                                }}
                                onClick={ReceiveData}
                            >
                                Receive
                            </Button>
                        </Box> */}
                        </Box>
                    </Box>
                </Paper>
                {
                    radiovalue === '1' ?
                        <>
                            {disData.length !== 0 ?
                                <>
                                    <Box sx={{ display: 'flex', flex: 1, justifyContent: 'flex-end', pr: 1, pt: 0.7 }}>
                                        <Box sx={{ bgcolor: '#FD7F20', mt: 0.3, height: 15, width: 15, border: '1px solid lightgrey', borderRadius: 20 }}></Box>
                                        <Box sx={{ px: 1, fontSize: 13 }}>Partially Received</Box>
                                    </Box>
                                    <Box variant="outlined" sx={{
                                        overflow: 'auto', pt: 0.4, flexWrap: 'wrap', width: "100%", '&::-webkit-scrollbar': { height: 10 }
                                    }}>
                                        <Paper elevation={3} sx={{ width: "1640" }}>
                                            {/* < Box display="flex" flexDirection="column" sx={{ mx: 0.5, overflow: 'auto' }}> */}
                                            <Box display="flex" justifyContent="space-between" padding={0.5} sx={{ bgcolor: '#41729F', color: 'white' }}>
                                                {/* <Box sx={{ width: 30, textAlign: 'center', display: 'flex' }}>
                                                <Checkbox sx={{ m: 0, p: 0, pl: 1.1 }} //mui@material
                                                    size="small"
                                                    checked={allSelected}
                                                    onChange={handleSelectAll}
                                                />
                                                <Typography sx={{ fontWeight: 550, fontSize: 13, pl: 0.5 }}>All</Typography>
                                            </Box> */}
                                                <Typography sx={{ width: 60, textAlign: 'center', fontWeight: 550, fontSize: 12 }}>Sl.No</Typography>
                                                <Typography sx={{ width: 100, textAlign: 'center', fontWeight: 550, fontSize: 12 }}>CRF No</Typography>
                                                <Typography sx={{ width: 60, textAlign: 'center', fontWeight: 550, fontSize: 12 }}>Order#</Typography>
                                                <Typography sx={{ width: 150, textAlign: 'center', fontWeight: 550, fontSize: 12 }}>PO Date</Typography>
                                                <Typography sx={{ width: 150, textAlign: 'center', fontWeight: 550, fontSize: 12 }}>PO to Supplier</Typography>
                                                <Typography sx={{ width: 150, textAlign: 'center', fontWeight: 550, fontSize: 12 }}>Supplier</Typography>
                                                <Typography sx={{ width: 100, textAlign: 'center', fontWeight: 550, fontSize: 12 }}>Expected Date</Typography>
                                                <Typography sx={{ width: 90, textAlign: 'center', fontWeight: 550, fontSize: 12 }}>CRS Store</Typography>
                                                <Typography sx={{ width: 150, textAlign: 'center', fontWeight: 550, fontSize: 12 }}>Store</Typography>
                                                <Typography sx={{ width: 220, textAlign: 'center' }}></Typography>
                                                <Typography sx={{ width: 50, textAlign: 'center', fontWeight: 550, fontSize: 12, }}>Details</Typography>
                                            </Box>
                                            <Virtuoso
                                                style={{ height: '71vh', width: '100%' }}
                                                data={disData}
                                                itemContent={(index, val) => (
                                                    <React.Fragment key={index}>
                                                        <Box display="flex" justifyContent="space-between" sx={{ borderBottom: '1px solid #b0bec5', color: (val.store_recieve === 0) ? '#E55B13' : 'black' }} >
                                                            {/* <Box sx={{ width: 30 }}>
                                                            <Checkbox
                                                                sx={{ pl: 1.5, m: 0 }}
                                                                size="small"
                                                                checked={val.checked}
                                                                onChange={() => handleCheckboxChange(index)}
                                                            />
                                                        </Box> */}
                                                            <Typography sx={{ width: 60, textAlign: 'center', fontSize: 12, my: 1 }}>{index + 1}</Typography>
                                                            <Typography sx={{ width: 100, textAlign: 'center', fontSize: 12, my: 1 }}>CRF/TMC/{val.req_slno}</Typography>
                                                            <Typography sx={{ width: 60, textAlign: 'center', fontSize: 12, my: 1 }}>{val.po_number}</Typography>
                                                            <Typography sx={{ width: 150, textAlign: 'center', fontSize: 12, my: 1 }}>{format(new Date(val.po_date), 'dd-MM-yyyy hh:mm:ss a')}</Typography>
                                                            <Typography sx={{ width: 150, textAlign: 'center', fontSize: 12, my: 1 }}>{format(new Date(val.po_to_supplier_date), 'dd-MM-yyyy hh:mm:ss a')}</Typography>
                                                            <Typography sx={{ width: 150, textAlign: 'center', fontSize: 11, my: 1 }}>{capitalizeWords(val.supplier_name)}</Typography>
                                                            <Typography sx={{ width: 100, textAlign: 'center', fontSize: 12, my: 1 }}>{val.expected_delivery ? format(new Date(val.expected_delivery), 'dd-MM-yyyy') : 'Nil'}</Typography>
                                                            <Typography sx={{ width: 90, textAlign: 'center', fontSize: 12, my: 1 }}>{val.main_store}</Typography>
                                                            <Typography sx={{ width: 150, textAlign: 'center', fontSize: 12, my: 1 }}>{val.sub_store_name}</Typography>
                                                            <Box sx={{ width: 220, my: 0.5, textAlign: 'center' }}>
                                                                <CountDownReqtoExpect expectDate={val.expected_delivery} />
                                                            </Box>
                                                            <Box sx={{ width: 50, textAlign: 'center', cursor: 'pointer', display: 'flex' }}>
                                                                <CssVarsProvider>
                                                                    <Tooltip title="View Item Details" placement="left">
                                                                        <FeaturedPlayListTwoToneIcon
                                                                            sx={{
                                                                                mt: 0.7,
                                                                                // fontSize: 'md',
                                                                                color: (val.store_recieve === 0) ? '#E55B13' : '#0d47a1',
                                                                                height: 23,
                                                                                width: 23,
                                                                                borderRadius: 2,
                                                                                boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.1)',
                                                                                cursor: 'pointer',
                                                                                transition: 'transform 0.2s',
                                                                                '&:hover': {
                                                                                    transform: 'scale(1.1)',
                                                                                },
                                                                            }}
                                                                            onClick={() => viewGrnDetails(val.po_number, val.items)} />
                                                                    </Tooltip>
                                                                </CssVarsProvider>
                                                            </Box>
                                                        </Box>
                                                    </React.Fragment>
                                                )}
                                            />
                                        </Paper>
                                    </Box >
                                </>
                                :
                                <Box sx={{
                                    display: 'flex', justifyContent: 'center', fontSize: 25, opacity: 0.5,
                                    pt: 10, color: 'grey'
                                }}>
                                    No Report Found
                                </Box>
                            }
                        </>
                        : <>
                            {fullyReceived.length !== 0 ?
                                <FullyReceiveTableView disData={fullyReceived} viewGrnDetails={viewGrnDetails} />
                                :
                                <Box sx={{
                                    display: 'flex', justifyContent: 'center', fontSize: 25, opacity: 0.5,
                                    pt: 10, color: 'grey'
                                }}>
                                    No Report Found
                                </Box>
                            }
                        </>
                }
            </Box>
        </Fragment >
    )
}
export default memo(CrfStoreProcessMain)
