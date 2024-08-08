import React, { useMemo } from 'react'
import { useState, useCallback, useEffect, memo, Fragment } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { axiosellider, axioslogin } from 'src/views/Axios/Axios'
import { Box, Paper } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import MasterDetailCompnt from '../ComonComponent/MasterDetailCompnt'
import CusIconButton from 'src/views/Components/CusIconButton'
import PurchaseApprovalButton from './PurchaseApprovalButton'
import PurchaseModal from './PurchaseModal'
import { ToastContainer } from 'react-toastify'
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static';
import ReqImageDisModal from '../ComonComponent/ReqImageDisModal'
import { useDispatch, useSelector } from 'react-redux'
import { getCRMPurchase } from 'src/redux/actions/CrmPurchaseList.action'
import CustomBackDrop from 'src/views/Components/CustomBackDrop'
import {
    PurchAckMapList, PurchDataCollPendingList, PurchaseAckDoneList, PurchaseQuatanNegotain, QuatationFinal, getData,
    getpurchDataCollPending, getpurchaseAckPending, poClose
} from 'src/redux/ReduxhelperFun/reduxhelperfun'
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Virtuoso } from 'react-virtuoso'
import { getCRMPurchaseAckPending } from 'src/redux/actions/CrmPurchaseACKList.action'
import { getCRMPurchDataCollPending } from 'src/redux/actions/CrmPurchaseDatacollPend.action'
import POPendingDetailTable from './Component/POPendingDetailTable'
import { CssVarsProvider, IconButton } from '@mui/joy'
import { format } from 'date-fns'

const PurchaseTablemain = () => {

    const dispatch = useDispatch();
    /*** Initializing */
    const history = useHistory();
    const [count, setCount] = useState(0)
    const [open, setOpen] = useState(false)
    const [DisArray, setDisArray] = useState([])
    const [radiovalue, setRadioValue] = useState('1')
    const [puchaseFlag, setpuchaseFlag] = useState(0)
    const [puchaseModal, setpuchaseModal] = useState(false)
    const [puchaseData, setpuchaseData] = useState([])
    const [imageshowFlag, setImageShowFlag] = useState(0)
    const [imageshow, setImageShow] = useState(false)
    const [imageSlno, setImageSlno] = useState(0)
    const [imagearray, setImageArry] = useState([])
    const [storeList, setStoreList] = useState([])
    const [apprvCount, setApprvCount] = useState(0)
    const [pendingPOList, setPendingPOList] = useState([])
    const [combinedPO, setCombinedPO] = useState([])

    useEffect(() => {
        dispatch(getCRMPurchaseAckPending())
        dispatch(getCRMPurchase())
        dispatch(getCRMPurchDataCollPending())
    }, [dispatch, count])
    //data list after ed,md Approval
    const purchaseAckPending = useSelector((state) => getpurchaseAckPending(state))
    const CRMPurchaseAckPendingListAry = useMemo(() => purchaseAckPending, [purchaseAckPending])
    //List of After ack
    const PurchaseArryList = useSelector((state) => getData(state))
    const tabledata = useMemo(() => PurchaseArryList, [PurchaseArryList])
    //Data Collection pending array
    const purchdataCollPendng = useSelector((state) => getpurchDataCollPending(state))
    const datacollPendng = useMemo(() => purchdataCollPendng, [purchdataCollPendng])

    useEffect(() => {
        setOpen(true)
        const getPending = async (CRMPurchaseAckPendingListAry) => {
            const firstFilter = await PurchAckMapList(CRMPurchaseAckPendingListAry)
            const { status, data } = firstFilter
            if (status === true) {
                setDisArray(data)
                setOpen(false)
            } else {
                setDisArray([])
                warningNotify("No CRF for Purchase Acknowledgement")
                setOpen(false)
            }
        }

        const getPurcAckDone = async (tabledata) => {
            const PurchaseAckDoneListArry = await PurchaseAckDoneList(tabledata);
            const { status, data } = PurchaseAckDoneListArry
            if (status === true) {
                if (data.length !== 0) {
                    setDisArray(data)
                    setOpen(false)
                }
                else {
                    setDisArray([])
                    warningNotify("No CRF for Process Pending ")
                    setOpen(false)
                }
            } else {
                setDisArray([])
                warningNotify("Error Occured")
                setOpen(false)
            }
        }

        const getQuatNegotaton = async (tabledata) => {
            const QuatatnNegoPending = await PurchaseQuatanNegotain(tabledata);
            const { status, data } = QuatatnNegoPending
            if (status === true) {
                if (data.length !== 0) {
                    setDisArray(data)
                    setOpen(false)
                }
                else {
                    setDisArray([])
                    warningNotify("No CRF for Quatation Negotation Pending ")
                    setOpen(false)
                }
            } else {
                setDisArray([])
                warningNotify("Error Occured")
                setOpen(false)
            }
        }

        const getQuatatnFinaling = async (tabledata) => {
            const QuatatnFinalingPending = await QuatationFinal(tabledata);
            const { status, data } = QuatatnFinalingPending
            if (status === true) {
                if (data.length !== 0) {
                    setDisArray(data)
                    setOpen(false)
                }
                else {
                    setDisArray([])
                    warningNotify("No CRF for Quatation Finalization Pending ")
                    setOpen(false)
                }
            } else {
                setDisArray([])
                warningNotify("Error Occured")
                setOpen(false)
            }
        }

        const getPoClose = async (tabledata) => {
            const PoCloseList = await poClose(tabledata);
            const { status, data } = PoCloseList
            if (status === true) {
                if (data.length !== 0) {
                    setDisArray(data)
                    setOpen(false)
                } else {
                    setDisArray([])
                    warningNotify("No CRF for PO Close Pending")
                    setOpen(false)
                }
            } else {
                setDisArray([])
                warningNotify("Error Occured")
                setOpen(false)
            }
        }


        // const getPendingPODetails = async () => {
        //     const result = await axioslogin.get('/newCRFPurchase/getPO');
        //     const { success, data, message } = result.data
        //     if (success === 1) {
        //         setPoList(data)
        //     }
        //     else if (success === 2) {
        //         infoNotify(message)
        //         setOpen(false)
        //     }
        // }



        // const getPOtoSupplier = async (tabledata) => {
        //     const dataPoSupply = await potoSupp(tabledata);
        //     const { status, data } = dataPoSupply
        //     if (status === true) {
        //         if (data.length !== 0) {
        //             setDisArray(data)
        //             setOpen(false)
        //         } else {
        //             setDisArray([])
        //             warningNotify("No CRF for Po to Supplier Pending")
        //             setOpen(false)
        //         }
        //     } else {
        //         setDisArray([])
        //         warningNotify("Error Occured")
        //         setOpen(false)
        //     }
        // }


        const getDataCollPening = async (tabledata) => {
            const DataCollPening = await PurchDataCollPendingList(tabledata);
            const { status, data } = DataCollPening
            if (status === true) {
                if (data.length !== 0) {
                    setDisArray(data)
                    setOpen(false)
                } else {
                    setDisArray([])
                    warningNotify("No Data Collections are Pending")
                    setOpen(false)
                }
            } else {
                setDisArray([])
                warningNotify("Error Occured")
                setOpen(false)
            }
        }

        if (radiovalue === '1') {
            getPending(CRMPurchaseAckPendingListAry)
        } else if (radiovalue === '2') {
            getPurcAckDone(tabledata)
        } else if (radiovalue === '3') {
            getQuatNegotaton(tabledata)
        } else if (radiovalue === '4') {
            getQuatatnFinaling(tabledata)
        } else if (radiovalue === '5') {
            getPoClose(tabledata)
        } else if (radiovalue === '6') {
            setOpen(false)
            // } else if (radiovalue === '7') {
            //     getPOtoSupplier(tabledata)
        } else if (radiovalue === '7') {
            getDataCollPening(datacollPendng)
        }
    }, [CRMPurchaseAckPendingListAry, radiovalue, tabledata, datacollPendng])

    //Radio button OnClick function starts
    const updateRadioClick = useCallback(async (e) => {
        e.preventDefault()
        setOpen(false)
        setRadioValue(e.target.value)

        //     // potoSupp(tabledata).then((e) => {
        //     //     setDisArray(e)
        //     //     setOpen(false)
        //     // })
        // }
    }, [])

    useEffect(() => {
        const getImage = async (req_slno) => {
            const result = await axioslogin.get(`/newCRFRegisterImages/crfRegimageGet/${req_slno}`)
            const { success, data } = result.data
            if (success === 1) {
                const fileNames = data;
                const fileUrls = fileNames.map((fileName) => {
                    return `${PUBLIC_NAS_FOLDER}/CRF/crf_registration/${req_slno}/${fileName}`;
                });
                setImageArry(fileUrls);
            }
        }
        if (imageshowFlag === 1) {
            getImage(imageSlno)
        }
    }, [imageshowFlag, imageSlno])

    const handleClose = useCallback(() => {
        setImageShowFlag(0)
        setImageShow(false)
        setImageSlno(0)
        setImageArry([])
    }, [])

    //close button function
    const backtoSetting = useCallback(() => {
        history.push('/Home/CrfNewDashBoard')
    }, [history])

    useEffect(() => {
        const getCRSStore = async () => {
            const result = await axioslogin.get('/newCRFPurchase/crsStores');
            const { success, data } = result.data
            if (success === 2) {
                setStoreList(data);
            }
            else {
                setStoreList([])
            }
        }
        getCRSStore()
    }, [])
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
                setOpen(false)
                const posearch = data?.map((val) => {
                    return {
                        pono: val.po_number,
                        stcode: val.crs_store_code
                    }
                })
                getPOdetails(posearch).then((val) => {
                    const { success, data } = val
                    if (success === 1) {
                        const patchdata = data?.map((val) => {
                            const newData = storeList?.find((value) => (value.crs_store_code === val.ST_CODE))
                            return {
                                approval_level: val.APPROVAL,
                                po_expiry: val.PO_EXPIRY !== null ? format(new Date(val.PO_EXPIRY), 'yyyy-MM-dd') : null,
                                expected_delivery: val.EXPECTED_DATE !== null ? format(new Date(val.EXPECTED_DATE), 'yyyy-MM-dd') : null,
                                po_number: val.PO_NO,
                                supply_store: newData ? newData.main_store_slno : 0
                            }
                        })
                        UpdatePOLevels(patchdata).then((val) => {
                            const { success, message } = val
                            if (success === 1) {
                                setApprvCount(apprvCount + 1)
                                setOpen(false)
                                succesNotify(message)

                            }
                            else {
                                setOpen(false)
                            }
                        })
                    }
                    else if (success === 2) {
                        setOpen(false)
                        // succesNotify("Updated")
                    }
                })

            } else {
                setOpen(false)
            }

        })

    }, [storeList, apprvCount])
    useEffect(() => {
        const capitalizeWords = (str) => str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        const getPendingItems = async () => {
            const result = await axioslogin.get('/newCRFPurchase/POPending');
            const { success, data } = result.data;
            if (success === 1) {
                setOpen(false)
                const poLIst = data
                    .filter((po, index, self) =>
                        index === self.findIndex((val) => val.po_number === po.po_number))
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


                const poItems = data?.map((val) => {
                    const obj = {
                        po_no: val.po_number,
                        item_code: val.item_code,
                        item_name: val.item_name,
                        item_qty: val.item_qty !== null ? val.item_qty : 0,
                        item_rate: val.item_rate !== null ? (val.item_rate).toFixed(2) : 0,
                        item_mrp: val.item_mrp !== null ? (val.item_mrp).toFixed(2) : 0,
                        tax: val.tax !== null ? val.tax : 'Nil',
                        tax_amount: val.tax_amount !== null ? (val.tax_amount).toFixed(2) : 0,
                        net_amount: val.net_amount !== 0 ? (val.net_amount).toFixed(2) : 0
                    }
                    return obj
                })
                const combinedData = poLIst?.map(po => {
                    const details = poItems?.filter(item => item.po_no === po.po_no);
                    return {
                        ...po,
                        items: details
                    };
                });
                setCombinedPO(combinedData)
                setPendingPOList(combinedData)
            }
            else {
                setOpen(false)
            }
        }
        getPendingItems()

    }, [setOpen, apprvCount, count])
    const viewAllData = useCallback(() => {
        setPendingPOList(combinedPO)
    }, [combinedPO])
    const getNotApproved = useCallback(() => {
        const newData = combinedPO?.filter(val => val.aprv_status === null);
        if (newData.length === 0) {
            infoNotify("PO Not Found")
        } else {
            setPendingPOList(newData)
        }
    }, [combinedPO])
    const purchaseDeptApproved = useCallback(() => {
        const newData = combinedPO?.filter(val => val.aprv_status === 1);
        if (newData.length === 0) {
            infoNotify("PO Not Found")
        } else {
            setPendingPOList(newData)
        }
    }, [combinedPO])
    const purchaseManagerApproved = useCallback(() => {
        const newData = combinedPO?.filter(val => val.aprv_status === 2);
        if (newData.length === 0) {
            infoNotify("PO Not Found")
        } else {
            setPendingPOList(newData)
        }
    }, [combinedPO])
    const directorsApproved = useCallback(() => {
        const newData = combinedPO?.filter(val => val.aprv_status === 3);
        if (newData.length === 0) {
            infoNotify("PO Not Found")
        } else {
            setPendingPOList(newData)
        }
    }, [combinedPO])

    return (
        <Fragment>
            <ToastContainer />
            <CustomBackDrop open={open} text="Please Wait" />
            {
                puchaseFlag === 1 ? <PurchaseModal open={puchaseModal}
                    setpuchaseFlag={setpuchaseFlag} setpuchaseModal={setpuchaseModal}
                    puchaseData={puchaseData} setpuchaseData={setpuchaseData}
                    count={count} setCount={setCount} /> : null
            }
            {imageshowFlag === 1 ? <ReqImageDisModal open={imageshow} handleClose={handleClose}
                images={imagearray} /> : null}

            <Box sx={{ height: 35, backgroundColor: "#f0f3f5", display: 'flex' }}>
                <Box sx={{ fontWeight: 550, flex: 1, pl: 1, pt: .5, color: '#385E72', }}>CRF Purchase</Box>
                <Box>
                    <CusIconButton size="sm" variant="outlined" color="primary" onClick={backtoSetting} >
                        <CloseIcon fontSize='small' />
                    </CusIconButton>
                </Box>
            </Box>

            <Paper >
                <Box sx={{
                    width: "100%",
                    pl: 1, pt: 0.5, pr: 1, pb: 0.5, flex: 1,
                    display: "flex",
                    flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" },
                    // justifyContent: 'center',
                }}>
                    <Box sx={{ display: 'flex', flex: 1 }}>
                        <Box sx={{ display: 'flex', flex: 1 }}>
                            <RadioGroup
                                sx={{ bgcolor: '#eceff1', borderRadius: 5, flex: 2 }}
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={radiovalue}
                                onChange={(e) => updateRadioClick(e)}
                            >
                                {/* <Box sx={{ display: 'flex', flex: 1, ml: 1, bgcolor: 'red' }}> */}

                                <FormControlLabel value='1' sx={{ pl: 3 }} control={<Radio
                                    sx={{
                                        color: 'red',
                                        '&.Mui-checked': {
                                            color: 'red',
                                        },
                                    }}
                                />} label="Acknowledgement Pending" />
                                <FormControlLabel value='2' sx={{ pl: 3 }} control={<Radio
                                    sx={{
                                        color: '#ef6c00',
                                        '&.Mui-checked': {
                                            color: '#ef6c00',
                                        },
                                    }} />} label="Processing CRF " />
                                <FormControlLabel value='3' sx={{ pl: 3 }} control={<Radio
                                    sx={{
                                        color: '#6200ea',
                                        '&.Mui-checked': {
                                            color: '#6200ea',
                                        },
                                    }}
                                />} label="Quotation Negotiation " />
                                <FormControlLabel value='4' sx={{ pl: 3 }} control={<Radio
                                    sx={{
                                        color: 'orange',
                                        '&.Mui-checked': {
                                            color: 'orange',
                                        },
                                    }} />} label="Quotation Finalizing" />
                                <FormControlLabel value='5' sx={{ pl: 3 }} control={<Radio
                                    sx={{
                                        color: '#0d47a1',
                                        '&.Mui-checked': {
                                            color: '#0d47a1',
                                        },
                                    }} />} label="PO Processing" />
                                <FormControlLabel value='6' sx={{ pl: 3 }} control={<Radio
                                    sx={{
                                        color: '#1b5e20',
                                        '&.Mui-checked': {
                                            color: '#1b5e20',
                                        },
                                    }} />} label="PO Approvals" />

                                {/* <FormControlLabel value='7' sx={{ bgcolor: '#78909c', color: 'white', borderRadius: 5, px: 2 }} control={<Radio
                                sx={{
                                    color: '#795548',
                                    '&.Mui-checked': {
                                        color: '#795548',
                                    },
                                }} />} label="Data Collection Pending" /> */}
                                {/* <FormControlLabel value='7' control={<Radio />} label="PO to Supplier Pending" /> */}
                                {/* <Box sx={{ px: 1, pl: 2, bgcolor: '#78909c', color: 'white', borderRadius: 5 }}>
                                
                            </Box> */}

                                {/* </Box> */}
                            </RadioGroup>
                            <RadioGroup
                                sx={{ bgcolor: '#78909c', borderRadius: 5, }}
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={radiovalue}
                                onChange={(e) => updateRadioClick(e)}
                            >
                                <FormControlLabel value='7' sx={{ bgcolor: '#78909c', color: 'white', px: 2 }} control={<Radio
                                    sx={{
                                        color: 'white',
                                        '&.Mui-checked': {
                                            color: 'white',
                                        },
                                    }} />} label="Data Collection Pending" />
                            </RadioGroup>
                        </Box>
                    </Box>
                </Box>
            </Paper >

            {
                radiovalue === '6' ?
                    <Box sx={{ flexWrap: 'wrap', pt: 0.5, maxHeight: window.innerHeight - 240 }}>
                        {combinedPO.length !== 0 ?
                            <>
                                <Box sx={{ height: 35, bgcolor: '#eeeeee', display: 'flex', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                                    <Box sx={{ pr: 0.5 }}>
                                        <CssVarsProvider>
                                            <IconButton
                                                variant="outlined"
                                                sx={{
                                                    backgroundColor: '#ADD8E6',
                                                    width: 180, fontSize: 12,
                                                    '&:hover': {
                                                        bgcolor: '#fafafa', color: '#003B73', transform: 'scale(0.98)',
                                                    },
                                                    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.16)',
                                                    borderRadius: 5, height: '30px', minHeight: '30px', lineHeight: '1',
                                                }}
                                                onClick={getNotApproved}
                                            >
                                                Not Approved
                                            </IconButton>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ pr: 0.5 }}>
                                        <CssVarsProvider>
                                            <IconButton
                                                variant="outlined"
                                                sx={{
                                                    backgroundColor: '#5CACEE', color: 'white',
                                                    width: 180, fontSize: 12,
                                                    '&:hover': {
                                                        bgcolor: '#fafafa', color: '#003B73', transform: 'scale(0.98)',
                                                    },
                                                    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.16)',
                                                    borderRadius: 5, height: '30px', minHeight: '30px', lineHeight: '1',
                                                }}
                                                onClick={purchaseDeptApproved}
                                            >
                                                Purchase Dept Approved
                                            </IconButton>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ pr: 0.5 }}>
                                        <CssVarsProvider>
                                            <IconButton
                                                variant="outlined"
                                                sx={{
                                                    backgroundColor: '#0277bd', color: 'white',
                                                    width: 180, fontSize: 12,
                                                    '&:hover': {
                                                        bgcolor: '#fafafa', color: '#003B73', transform: 'scale(0.98)',
                                                    },
                                                    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.16)',
                                                    borderRadius: 5, height: '30px', minHeight: '30px', lineHeight: '1',
                                                }}
                                                onClick={purchaseManagerApproved}
                                            >
                                                Purchase Manager Approved
                                            </IconButton>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ pr: 0.5 }}>
                                        <CssVarsProvider>
                                            <IconButton
                                                variant="outlined"
                                                sx={{
                                                    backgroundColor: '#32CD32', color: 'white',
                                                    width: 180, fontSize: 12,
                                                    '&:hover': {
                                                        bgcolor: '#fafafa', color: '#003B73', transform: 'scale(0.98)',
                                                    },
                                                    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.16)',
                                                    borderRadius: 5, height: '30px', minHeight: '30px', lineHeight: '1',
                                                }}
                                                onClick={directorsApproved}
                                            >
                                                Director&apos;s Approved
                                            </IconButton>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ pr: 0.5 }}>
                                        <CssVarsProvider>
                                            <IconButton
                                                variant="outlined"
                                                sx={{
                                                    backgroundColor: '#00695c', color: 'white',
                                                    width: 180, fontSize: 12,
                                                    '&:hover': {
                                                        bgcolor: '#fafafa', color: '#003B73', transform: 'scale(0.98)',
                                                    },
                                                    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.16)',
                                                    borderRadius: 5, height: '30px', minHeight: '30px', lineHeight: '1',
                                                }}
                                                onClick={viewAllData}
                                            >
                                                View All
                                            </IconButton>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ pr: 3 }}>
                                        <CssVarsProvider>
                                            <IconButton
                                                variant="outlined"
                                                sx={{
                                                    backgroundColor: 'white', width: 220, fontSize: 12,
                                                    '&:hover': {
                                                        bgcolor: '#fafafa', color: '#003B73', transform: 'scale(0.98)',
                                                    },
                                                    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.16)',
                                                    borderRadius: 5, height: '30px', minHeight: '30px', lineHeight: '1',
                                                }}
                                                onClick={RefreshData}
                                            >
                                                Get Update Status From Ellider
                                            </IconButton>

                                        </CssVarsProvider>
                                    </Box>
                                </Box>
                                <Box>
                                    <POPendingDetailTable pendingPOList={pendingPOList} count={count} setCount={setCount} />
                                </Box>
                            </>
                            : <Box sx={{
                                display: 'flex', justifyContent: 'center', fontSize: 25, opacity: 0.8,
                                pt: 10, color: 'lightgrey'
                            }}>
                                No Purchase Orders Are Pending
                            </Box>}
                    </Box>
                    :
                    <Box sx={{ height: window.innerHeight - 150, overflow: 'auto', }}>
                        <Virtuoso
                            // style={{ height: '400px' }}
                            data={DisArray}
                            totalCount={DisArray?.length}
                            itemContent={(index, val) =>
                                <Box key={val.req_slno} sx={{ width: "100%", }}>
                                    <Paper sx={{
                                        width: '100%',
                                        mt: 0.8,
                                        border: "2 solid #272b2f",
                                        borderRadius: 3,
                                        overflow: 'hidden',
                                        boxShadow: 1,
                                        backgroundColor: '#BBBCBC'
                                    }} variant='outlined'>
                                        <MasterDetailCompnt val={val} />
                                        <PurchaseApprovalButton val={val}
                                            setpuchaseFlag={setpuchaseFlag} setpuchaseModal={setpuchaseModal}
                                            setpuchaseData={setpuchaseData} setImageShowFlag={setImageShowFlag}
                                            setImageShow={setImageShow} setImageSlno={setImageSlno} />

                                    </Paper>
                                </Box>
                            } />
                    </Box>
            }
        </Fragment >
    )
}

export default memo(PurchaseTablemain)