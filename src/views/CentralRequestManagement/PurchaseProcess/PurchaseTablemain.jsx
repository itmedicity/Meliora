import React, { useMemo } from 'react'
import { useState, useCallback, useEffect, memo, Fragment } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { axiosellider, axioslogin } from 'src/views/Axios/Axios'
import { Badge, Box, Paper } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
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
import { Avatar, CssVarsProvider, IconButton, Tooltip } from '@mui/joy'
import { format } from 'date-fns'
import ReqMastMainViewCmp from './Component/ReqMastMainViewCmp'
import PurchaseApprovalButtonCmp from './Component/PurchaseApprovalButtonCmp'

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
    const [ackCount, setackCount] = useState(0)
    const [crfProcCount, setCrfProcCount] = useState(0)
    const [negoCount, setnegoCount] = useState(0)
    const [finalCount, setFinalCount] = useState(0)
    const [poPrcCount, setpoPrcCount] = useState(0)
    const [dataCollectCount, setdataCollectCount] = useState(0)
    const [apprvlCount, setapprvlCount] = useState(0)
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
        if (CRMPurchaseAckPendingListAry.length !== 0) {
            const ack = CRMPurchaseAckPendingListAry?.filter((val) => val.md_approve === 1 && val.ed_approve === 1)
            setackCount(ack.length)
        }
        if (tabledata.length !== 0) {
            const procCrf = tabledata?.filter((val) => val.ack_status === 1 && val.quatation_calling_status === 0 &&
                val.po_prepartion === 0 && val.po_complete === 0)
            setCrfProcCount(procCrf.length)

            const nego = tabledata?.filter((val) => val.quatation_calling_status === 1 && val.quatation_negotiation === 0)
            setnegoCount(nego.length)

            const final = tabledata?.filter((val) => val.quatation_calling_status === 1 && val.quatation_negotiation === 1
                && val.quatation_fixing === 0)
            setFinalCount(final.length)

            const po = tabledata?.filter((val) => val.ack_status === 1 &&
                ((val.quatation_calling_status === 1 && val.quatation_fixing === 1 && val.po_prepartion === 0) ||
                    (val.po_prepartion === 1 && val.po_complete === 0)))
            setpoPrcCount(po.length)
        }
        if (datacollPendng.length !== 0) {
            const datacol = datacollPendng?.filter((val) => val.md_approve === 1 && val.ed_approve === 1)
            setdataCollectCount(datacol.length)
        }

    }, [CRMPurchaseAckPendingListAry, tabledata, datacollPendng, count])

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
                // warningNotify("No CRF for Purchase Acknowledgement")
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
                    // warningNotify("No CRF for Process Pending ")
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
                    // warningNotify("No CRF for Quatation Negotation Pending ")
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
                    // warningNotify("No CRF for Quatation Finalization Pending ")
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
                    // warningNotify("No CRF for PO Close Pending")
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
                    // warningNotify("No Data Collections are Pending")
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
        const capitalizeWords = (str) => str ? str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : '';
        const getPendingItems = async () => {
            const result = await axioslogin.get('/newCRFPurchase/POPending');
            const { success, data } = result.data;
            if (success === 1) {
                setOpen(false)
                const poLIst = data
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


                const poItems = data?.map((val) => {
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
                const combinedData = poLIst?.map(po => {
                    const details = poItems?.filter(item => item.po_no === po.po_no && item.po_detail_slno === po.po_detail_slno);
                    return {
                        ...po,
                        items: details
                    };
                });
                setCombinedPO(combinedData)
                setPendingPOList(combinedData)
                setapprvlCount(combinedData.length)
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

            <Box sx={{ height: 38, backgroundColor: "#f0f3f5", display: 'flex', p: 0.5 }}>
                <Box sx={{ fontWeight: 550, flex: 1, pl: 1, pt: .5, color: '#385E72', }}>CRF Purchase</Box>
                <CssVarsProvider>
                    <Tooltip title="Close" placement="bottom" >
                        <Avatar size="sm" variant="plain" sx={{
                            bgcolor: '##FBEDE0', height: 25, width: 25,
                            border: '1px solid #FBE7C6'
                        }}>
                            <CloseIcon sx={{
                                cursor: 'pointer', size: 'lg', fontSize: 20, color: '#FF4500',
                                '&:hover': { color: 'red' }
                            }} onClick={backtoSetting} />
                        </Avatar>
                    </Tooltip>
                </CssVarsProvider>
            </Box>

            <Paper >
                <Box sx={{
                    width: "100%",
                    px: 1, py: 0.5, flex: 1,
                    display: "flex",
                    flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" },
                    // justifyContent: 'center',
                }}>
                    <Box sx={{ display: 'flex', flex: 1 }}>
                        <RadioGroup
                            sx={{ bgcolor: '#eceff1', borderRadius: 5, flex: 2, pt: 1 }}
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            value={radiovalue}
                            onChange={(e) => updateRadioClick(e)}
                        >

                            <Badge
                                badgeContent={ackCount}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                sx={{
                                    mr: 1,
                                    '& .MuiBadge-badge': {
                                        backgroundColor: '#F83839',
                                        color: 'white',
                                        transform: 'translate(70%, -10%)',
                                    }
                                }}
                            >
                                <FormControlLabel value='1' sx={{ pl: 3, }} control={
                                    <Radio
                                        sx={{
                                            color: 'red',
                                            '&.Mui-checked': {
                                                color: 'red',
                                            },
                                        }}
                                    />} label="Acknowledgement Pending" />
                            </Badge>

                            <Badge
                                badgeContent={crfProcCount}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                sx={{
                                    mr: 1,
                                    '& .MuiBadge-badge': {
                                        backgroundColor: '#ef6c00',
                                        color: 'white',
                                        transform: 'translate(70%, -10%)',
                                    }
                                }}
                            >
                                <FormControlLabel value='2' sx={{ pl: 3 }} control={
                                    <Radio
                                        sx={{
                                            color: '#ef6c00',
                                            '&.Mui-checked': {
                                                color: '#ef6c00',
                                            },
                                        }} />} label="Processing CRF " />
                            </Badge>

                            <Badge
                                badgeContent={negoCount}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                sx={{
                                    mr: 1,
                                    '& .MuiBadge-badge': {
                                        backgroundColor: '#6200ea',
                                        color: 'white',
                                        transform: 'translate(70%, -10%)',
                                    }
                                }}
                            >
                                <FormControlLabel value='3' sx={{ pl: 3 }} control={
                                    <Radio
                                        sx={{
                                            color: '#6200ea',
                                            '&.Mui-checked': {
                                                color: '#6200ea',
                                            },
                                        }}
                                    />} label="Quotation Negotiation " />
                            </Badge>

                            <Badge
                                badgeContent={finalCount}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                sx={{
                                    mr: 1,
                                    '& .MuiBadge-badge': {
                                        backgroundColor: 'orange',
                                        color: 'white',
                                        transform: 'translate(70%, -10%)',
                                    }
                                }}
                            >
                                <FormControlLabel value='4' sx={{ pl: 3 }} control={
                                    <Radio
                                        sx={{
                                            color: 'orange',
                                            '&.Mui-checked': {
                                                color: 'orange',
                                            },
                                        }} />
                                } label="Quotation Finalizing" />
                            </Badge>
                            <Badge
                                badgeContent={poPrcCount}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                sx={{
                                    mr: 1,
                                    '& .MuiBadge-badge': {
                                        backgroundColor: '#0d47a1',
                                        color: 'white',
                                        transform: 'translate(70%, -10%)',
                                    }
                                }}
                            >
                                <FormControlLabel
                                    value='5'
                                    sx={{ pl: 3 }}
                                    control={
                                        <Radio
                                            sx={{
                                                color: '#0d47a1',
                                                '&.Mui-checked': {
                                                    color: '#0d47a1',
                                                },
                                            }}
                                        />
                                    }
                                    label="PO Processing"
                                />
                            </Badge>

                            <Badge
                                badgeContent={apprvlCount}
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
                                <FormControlLabel
                                    value='6'
                                    sx={{ pl: 3 }}
                                    control={
                                        <Radio
                                            sx={{
                                                color: '#1b5e20',
                                                '&.Mui-checked': {
                                                    color: '#1b5e20',
                                                },
                                            }}
                                        />
                                    }
                                    label="PO Approvals"
                                />
                            </Badge>

                        </RadioGroup>
                        <RadioGroup
                            sx={{ bgcolor: '#C9CFD0', borderRadius: 5, pr: 3 }}
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            value={radiovalue}
                            onChange={(e) => updateRadioClick(e)}
                        >
                            <FormControlLabel value='7' sx={{ bgcolor: '#C9CFD0', pl: 2 }} control={<Radio
                                sx={{
                                    color: '#512D10',
                                    '&.Mui-checked': {
                                        color: '#512D10',
                                    },
                                }} />} label="Data Collection Pending" />
                            <Badge
                                overlap="circular"
                                badgeContent={dataCollectCount}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                sx={{
                                    mr: 1, mt: 0.2,
                                    '& .MuiBadge-badge': {
                                        backgroundColor: '#512D10',
                                        color: 'white',
                                        transform: 'translate(70%, -10%)',
                                    }
                                }}
                            />
                        </RadioGroup>
                    </Box>
                </Box>
            </Paper >
            {
                radiovalue === '6' ?
                    <Box sx={{ flexWrap: 'wrap', pt: 0.5, maxHeight: window.innerHeight - 220 }}>
                        {combinedPO.length !== 0 ?
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
                                    <POPendingDetailTable pendingPOList={pendingPOList} count={count} setCount={setCount} />
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
                    <Box sx={{ height: window.innerHeight - 200, overflow: 'auto', flexWrap: 'wrap' }}>
                        {DisArray.length !== 0 ?
                            <Virtuoso
                                data={DisArray}
                                totalCount={DisArray?.length}
                                itemContent={(index, val) =>
                                    <Box key={index} sx={{
                                        width: "100%", mt: 0.8, flexWrap: 'wrap',
                                        border: '1px solid #21B6A8', borderRadius: 2,
                                    }}>
                                        <ReqMastMainViewCmp val={val} />
                                        <PurchaseApprovalButtonCmp val={val}
                                            setpuchaseFlag={setpuchaseFlag} setpuchaseModal={setpuchaseModal}
                                            setpuchaseData={setpuchaseData} setImageShowFlag={setImageShowFlag}
                                            setImageShow={setImageShow} setImageSlno={setImageSlno} />
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
        </Fragment >
    )
}
export default memo(PurchaseTablemain)