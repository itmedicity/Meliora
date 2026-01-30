import React, { memo, useCallback, useState, useMemo, useEffect } from 'react'
import {
    Box,
    Typography,
    Card,
    Select,
    Option,
    Input,
    Button,
} from '@mui/joy'
import { IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { axioslogin } from 'src/views/Axios/Axios'
import { succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import { useSelector } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
import WorkOrderStepperComp from '../WorkOrderStepperComp';
import WorkOrderMaterialDetails from '../AddDetails/WorkOrderMaterialDetails';
import InstallationLabourCharge from '../AddDetails/InstallationLabourCharge';
import RetentialDetails from '../AddDetails/RetentialDetails';
import TermsAndConditions from '../AddDetails/TermsAndConditions';
import PaymentTermsAndCondition from '../AddDetails/PaymentTermsAndCondition';
import InvoiceOrBillingTermsAndCondition from '../AddDetails/InvoiceOrBillingTermsAndCondition';
import WorkOrderPreviewModal from '../AddDetails/WorkOrderModals/WorkOrderPreviewModal';
import { getLastWOnumber } from '../WorkOrderCommonApi';
import WorkOrderDetailsEntry from './WorkOrderDetailsEntry';
import { useNavigate } from 'react-router-dom';

/*  Contract Types */
const TAB_CONFIG = [
    {
        id: 1,
        label: 'ANNUAL MAINTANANCE CONTRACT',
        gradient: 'linear-gradient(135deg,#C5B0CD,#9B7EBD)',
    },
    {
        id: 2,
        label: 'COMPREHENSIVE MAINTANANCE CONTRACT',
        gradient: 'linear-gradient(135deg,#A2AADB,#6A7FDB)',
    },
    {
        id: 3,
        label: 'RATE CONTRACT',
        gradient: 'linear-gradient(135deg,#8174A0,#4A3F73)',
    },
]

const WorkOrderEntry = () => {

    const [tabValue, setTabValue] = useState(0)
    const [openNext, setOpenNext] = useState(0)
    const [fromDate, setFromDate] = useState('')
    const [toDate, setToDate] = useState('')
    const [vendorList, SetVendorList] = useState(null)
    const [wod, setWod] = useState('')
    const [vendor_Desc, setVendor_Desc] = useState('')
    const [Wo_numb, SetWoNumb] = useState('')
    const [departmentsec, setDepartmentSec] = useState(0)
    const [crfNo, SetcrfNo] = useState('')
    const [req_date, SetReq_date] = useState('')

    // console.log("departmentsec:", departmentsec);

    // console.log("crfNo:", crfNo);


    // sec_id
    // : 
    // 568
    // sec_name
    // : 
    // "5 TH FLOOR ICU"

    const { sec_id, sec_name } = departmentsec

    const loginId = useSelector(state => state.LoginUserData.empid)

    /**  MATERIAL STATE (SOURCE OF TRUTH) */
    const [materialItems, setMaterialItems] = useState([])

    /** PREVIEW */
    const [previewOpen, setPreviewOpen] = useState(false)

    //add laboour charge
    const [labourItems, setLabourItems] = useState([])

    //add rentinal data
    const [retentionData, setRetentionData] = useState({})

    //add Terms and condition datas
    const [termsData, setTermsData] = useState({
        validUpto: '',
        terms: []
    })
    // paymentTermsData
    const [paymentTermsData, setPaymentTermsData] = useState({
        validUpto: '',
        terms: ['']   // 👈 important: not empty array
    })

    // invoiceTermsData
    const [invoiceTermsData, setInvoiceTermsData] = useState({
        validUpto: '',
        terms: ['']
    })

    /** DRAFT DATA */
    const [draftData, setDraftData] = useState({
        vendorDetails: {},
        materialDetails: [],
        labourDetails: [],
        retentionDetails: {},
        terms: {},
        paymentTerms: {},
        billingTerms: {},
        loginId: loginId
    })

    const selectedTab = useMemo(() => TAB_CONFIG[tabValue], [tabValue])

    const { data: getWOnumber = {} } = useQuery({
        queryKey: ['lastWOnumber'],
        queryFn: getLastWOnumber,
    });

    const last_wo_slno = getWOnumber?.[0]?.wo_slno ?? 0;

    const history = useNavigate()
    /** CLOSE */
    const close = useCallback(() => {
        history(`/Home`)
    }, [history])

    /** STEPPER */
    const handleNext = () => setOpenNext(prev => prev + 1)
    const handleBack = () => setOpenNext(prev => prev - 1)

    /**  SYNC VENDOR DETAILS */
    useEffect(() => {
        setDraftData(prev => ({
            ...prev,
            vendorDetails: {
                vendor_slno: vendorList?.it_supplier_name,
                vendor_desc: vendor_Desc,
                wod,
                sec_name,
                crfNo,
                req_date,
                fromDate,
                toDate,
                contractType: selectedTab?.id,
                loginId,
                Wo_numb
            },
        }))
    }, [
        vendorList,
        vendor_Desc,
        wod,
        sec_id,
        crfNo,
        req_date,
        fromDate,
        toDate,
        selectedTab,
        loginId,
        Wo_numb
    ])

    /** SYNC MATERIAL DETAILS */
    useEffect(() => {
        setDraftData(prev => ({
            ...prev,
            materialDetails: materialItems,
        }))
    }, [materialItems])

    useEffect(() => {
        setDraftData(prev => ({
            ...prev,
            labourDetails: labourItems,
        }))
    }, [labourItems])


    useEffect(() => {
        setDraftData(prev => ({
            ...prev,
            retentionDetails: retentionData,
        }))
    }, [retentionData])

    useEffect(() => {
        setDraftData(prev => ({
            ...prev,
            terms: termsData
        }))
    }, [termsData])

    useEffect(() => {
        setDraftData(prev => ({
            ...prev,
            paymentTerms: paymentTermsData
        }))
    }, [paymentTermsData])

    useEffect(() => {
        setDraftData(prev => ({
            ...prev,
            billingTerms: invoiceTermsData
        }))
    }, [invoiceTermsData])

    const buildPostPayload = (draftData) => {
        return {
            vendor_details: {
                vendor_slno: vendorList?.it_supplier_slno,
                vendor_desc: draftData.vendorDetails.vendor_desc,
                wod: draftData.vendorDetails.wod,
                req_date: draftData.vendorDetails.req_date,
                from_date: draftData.vendorDetails.fromDate,
                to_date: draftData.vendorDetails.toDate,
                contract_type: draftData.vendorDetails.contractType,
                crf_no: draftData.vendorDetails.crfNo,
                wo_number: last_wo_slno + 1,
                sec_name: sec_id,
                loginId: loginId
            },

            material_details: draftData.materialDetails.map(item => ({
                item_code: item.itemCode,
                item_name: item.itemName,
                description: item.itemDesc,
                brand: item.itemBrand,
                specification: item.specification,
                qty: Number(item.quantity),
                uom: item.uom,
                unit_price: Number(item.unitPrice),
                gross_amount: Number(item.grossAmount),
                gst_amount: Number(item.gstAmount),
                total_amount: Number(item.totalAmount),
                loginId: loginId
            })),


            labour_details: draftData.labourDetails.map(item => ({
                description: item.description,
                specification: item.specification,
                quantity: Number(item.quantity),
                rate_unit: item.rateUnit,
                unit_rate: Number(item.unitRate),
                total_amount: Number(item.totalAmount),
                loginId: loginId
            })),

            retention_details: {
                payment_type: draftData.retentionDetails.paymentType,
                amount: Number(draftData.retentionDetails.amount),
                description: draftData.retentionDetails.description,
                loginId: loginId
            },

            termsConditions: {
                terms: draftData.terms?.terms ?? [],
                validUpto: draftData.terms?.validUpto,
                loginId: draftData.vendorDetails.loginId,
            },

            paymentTerms: {
                terms: draftData.paymentTerms?.terms ?? [],
                validUpto: draftData.paymentTerms?.validUpto,
                loginId: draftData.vendorDetails.loginId,
            },

            billingTerms: {
                terms: draftData.billingTerms?.terms ?? [],
                validUpto: draftData.billingTerms?.validUpto,
                loginId: draftData.vendorDetails.loginId,
            },
        }
    }


    /** SAVE */
    const validateVendorDetails = (draftData) => {
        const vd = draftData?.vendorDetails || {}
        console.log("vd:", vd);

        const requiredFields = [
            { key: 'vendor_desc', label: 'Vendor' },
            { key: 'wod', label: 'WO Date' },
            { key: 'req_date', label: 'Request Date' },
            { key: 'fromDate', label: 'From Date' },
            { key: 'toDate', label: 'To Date' },
            { key: 'contractType', label: 'Contract Type' },
        ]

        // values coming from outside vendorDetails
        if (!vendorList?.it_supplier_slno) return 'Vendor is required'
        if (!crfNo) return 'CRF Number is required'
        if (!last_wo_slno) return 'WO Number is missing'
        if (!sec_id) return 'Department is required'

        for (const field of requiredFields) {
            const value = vd[field.key]
            if (value === null || value === undefined || value === '') {
                return `${field.label} is required`
            }
        }

        return null // ✅ valid
    }


    /** SAVE */
    const handleSave = useCallback(async () => {

        //  VALIDATION FIRST
        const errorMsg = validateVendorDetails(draftData)
        if (errorMsg) {
            warningNotify(errorMsg)
            return
        }

        const postData = buildPostPayload(draftData)

        const result = await axioslogin.post(
            '/workOrder/insertWorkOrderDetails',
            postData
        )

        const { success, message } = result.data

        if (success === 1) {
            succesNotify(message)

            setDraftData({
                vendorDetails: {},
                materialDetails: [],
                labourDetails: [],
                retentionDetails: {},
                terms: {},
                paymentTerms: {},
                billingTerms: {},
            })
            SetWoNumb('')
            setVendor_Desc('')
            setWod('')
            SetVendorList(null)
            setToDate('')
            setFromDate('')
            setOpenNext(0)
            setTabValue(0)

        } else {
            warningNotify(message)
        }

    }, [draftData,
        setDraftData,
        SetWoNumb,
        setVendor_Desc,
        setWod,
        SetVendorList,
        setToDate,
        setFromDate,
        setOpenNext,
        setTabValue
    ])

    // const handleSave = useCallback(async () => {
    //     const postData = buildPostPayload(draftData)
    //     const result = await axioslogin.post('/workOrder/insertWorkOrderDetails', postData)
    //     const { success, message } = result.data;
    //     if (success === 1) {
    //         succesNotify(message)
    //         setDraftData({
    //             vendorDetails: {},
    //             materialDetails: [],
    //             labourDetails: [],
    //             retentionDetails: {},
    //             terms: {},
    //             paymentTerms: {},
    //             billingTerms: {},
    //         })
    //         SetWoNumb('')
    //         setVendor_Desc('')
    //         setWod('')
    //         SetVendorList(null)
    //         setToDate('')
    //         setFromDate('')
    //         setOpenNext(0)
    //         setTabValue(0)

    //     }
    //     else {
    //         warningNotify(message)
    //     }
    // }, [draftData,
    //     setDraftData,
    //     SetWoNumb,
    //     setVendor_Desc,
    //     setWod,
    //     SetVendorList,
    //     setToDate,
    //     setFromDate,
    //     setOpenNext,
    //     setTabValue
    // ])

    return (
        <Box sx={{ width: '100%' }}>
            <Card
                sx={{
                    flex: 1,
                    p: 3,
                    height: "90vh",
                    background:
                        'linear-gradient(180deg, rgba(255,255,255,0.98), rgba(240,242,255,0.92))',
                    boxShadow:
                        '0 30px 80px rgba(79,70,229,0.15), inset 0 0 0 1px rgba(199,210,254,0.8)',
                    position: 'relative',
                }}
            >
                {/* Preview Modal */}

                {previewOpen && (
                    <WorkOrderPreviewModal
                        open={previewOpen}
                        onClose={() => setPreviewOpen(false)}
                        data={draftData}
                    />
                )}

                {/* CLOSE BUTTON */}
                <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
                    <IconButton
                        onClick={close}
                        sx={{
                            bgcolor: '#926FB1',
                            '&:hover': { bgcolor: '#926FB1' },
                        }}
                    >
                        <CloseIcon sx={{ color: 'white' }} />
                    </IconButton>
                </Box>

                {/* STEPPER */}
                <Box
                    sx={{
                        mb: 3,
                        p: 2,
                        borderRadius: '18px',
                        bgcolor: '#eef2ff',
                        boxShadow: 'inset 0 0 0 1px #c7d2fe',
                    }}
                >
                    <WorkOrderStepperComp currentstep={openNext} />
                </Box>

                {/* HEADER */}
                <Box
                    sx={{
                        position: 'sticky',
                        top: 0,
                        zIndex: 10,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        p: 2,
                        mb: 3,
                        borderRadius: '20px',
                        background:
                            'linear-gradient(135deg, rgba(255,255,255,0.97), rgba(238,242,255,0.92))',
                        backdropFilter: 'blur(12px)',
                        boxShadow:
                            '0 10px 30px rgba(79,70,229,0.15), inset 0 0 0 1px rgba(199,210,254,0.8)',
                    }}
                >
                    {/* CONTRACT SELECT */}
                    <Select
                        value={tabValue}
                        onChange={(e, v) => setTabValue(v)}
                        placeholder="Select Contract"
                        sx={{
                            width: 400,
                            bgcolor: '#fff',
                            borderRadius: '14px',
                            fontWeight: 700,
                            border: '1px solid #e0e7ff',
                            boxShadow: 'sm',
                            '&:hover': { boxShadow: 'md' },
                            '&:focus-within': {
                                borderColor: '#6366f1',
                                boxShadow: '0 0 0 3px rgba(99,102,241,0.2)',
                            },
                        }}
                    >
                        {TAB_CONFIG.map((tab, index) => (
                            <Option
                                key={tab.label}
                                value={index}
                                sx={{
                                    fontWeight: 600,
                                    borderRadius: '10px',
                                    my: 0.5,
                                    '&.Mui-selected': {
                                        bgcolor: tab.gradient,
                                        color: '#fff',
                                    },
                                }}
                            >
                                {tab.label}
                            </Option>
                        ))}
                    </Select>

                    {/* TITLE */}
                    <Box
                        sx={{
                            color: "#A88EC2"
                        }}
                    >
                        <Typography
                            level="h4"
                            sx={{
                                fontWeight: 900,
                                color: "#A88EC2",
                                letterSpacing: 0.8,
                                whiteSpace: 'nowrap',
                                textTransform: 'uppercase',
                            }}
                        >
                            {selectedTab.label}
                        </Typography>
                    </Box>

                    {/* DATE RANGE */}
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            p: 1,
                            borderRadius: '14px',
                            bgcolor: '#fff',
                            border: '1px solid #e0e7ff',
                            boxShadow: 'sm',
                        }}
                    >
                        <Input
                            type="date"
                            size="sm"
                            value={fromDate}
                            onChange={(e) => setFromDate(e.target.value)}
                            sx={{ borderRadius: '10px', fontWeight: 600, minWidth: 135 }}
                        />

                        <Box
                            sx={{
                                px: 1.2,
                                py: 0.5,
                                borderRadius: '999px',
                                bgcolor: '#eef2ff',
                                fontWeight: 800,
                                color: '#4f46e5',
                            }}
                        >
                            →
                        </Box>

                        <Input
                            type="date"
                            size="sm"
                            value={toDate}
                            min={fromDate || undefined}
                            onChange={(e) => setToDate(e.target.value)}
                            sx={{ borderRadius: '10px', fontWeight: 600, minWidth: 135 }}
                        />
                    </Box>
                </Box>

                {/* CONTENT */}
                <Box
                    sx={{
                        overflow: "auto",
                        animation: 'fadeSlide 0.35s ease',
                        '@keyframes fadeSlide': {
                            from: { opacity: 0, transform: 'translateY(12px)' },
                            to: { opacity: 1, transform: 'translateY(0)' },
                        },
                    }}
                >
                    {openNext === 0 && (
                        <WorkOrderDetailsEntry
                            vendorList={vendorList}
                            SetVendorList={SetVendorList}
                            wod={wod}
                            setWod={setWod}
                            vendor_Desc={vendor_Desc}
                            setVendor_Desc={setVendor_Desc}
                            Wo_numb={Wo_numb}
                            SetWoNumb={SetWoNumb}
                            last_wo_slno={last_wo_slno}
                            departmentsec={departmentsec}
                            setDepartmentSec={setDepartmentSec}
                            crfNo={crfNo}
                            SetcrfNo={SetcrfNo}
                            req_date={req_date}
                            SetReq_date={SetReq_date}
                        />
                    )}
                    {openNext === 1 && (
                        <WorkOrderMaterialDetails
                            items={materialItems}
                            setItems={setMaterialItems}
                            setDraftData={setDraftData}
                        />
                    )}

                    {openNext === 2 && (
                        <InstallationLabourCharge
                            labourItems={labourItems}
                            setLabourItems={setLabourItems}
                        />
                    )}
                    {openNext === 3 && (
                        <RetentialDetails
                            retentionData={retentionData}
                            setRetentionData={setRetentionData}
                        />
                    )}
                    {openNext === 4 && (
                        <TermsAndConditions
                            termsData={termsData}
                            setTermsData={setTermsData}
                        />
                    )}
                    {openNext === 5 && (
                        <PaymentTermsAndCondition
                            paymentTermsData={paymentTermsData}
                            setPaymentTermsData={setPaymentTermsData}
                        />
                    )}
                    {openNext === 6 && (
                        <InvoiceOrBillingTermsAndCondition
                            invoiceTermsData={invoiceTermsData}
                            setInvoiceTermsData={setInvoiceTermsData}
                        />
                    )}
                </Box>

                {/* footer secton */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mt: 3,
                        position: "-webkit-sticky"
                    }}
                >

                    {/* Back Button */}
                    <Button
                        startDecorator={<ArrowBackIcon />}
                        size="lg"
                        onClick={handleBack}
                        disabled={openNext === 0}
                        sx={{
                            px: 5,
                            borderRadius: "xl",
                            fontWeight: 800,
                            background: "linear-gradient(135deg,#7c3aed,#5b21b6)",
                            boxShadow: "0 12px 28px rgba(124,58,237,0.45)",
                            transition: "all 0.25s ease",
                            "&:hover": {
                                transform: "translateY(-2px)",
                                boxShadow: "0 16px 36px rgba(124,58,237,0.6)",
                            },
                        }}
                    >
                        Back
                    </Button>

                    {/* For Preview Purpose */}
                    <Button
                        variant="outlined"
                        color="neutral"
                        onClick={() => setPreviewOpen(true)}
                    >
                        Preview
                    </Button>

                    {openNext === 6 ?
                        <Button
                            endDecorator={<ArrowForwardIcon />}
                            size="lg"
                            onClick={handleSave}
                            sx={{
                                px: 5,
                                borderRadius: "xl",
                                fontWeight: 800,
                                background: "linear-gradient(135deg,#7c3aed,#5b21b6)",
                                boxShadow: "0 12px 28px rgba(124,58,237,0.45)",
                                transition: "all 0.25s ease",
                                "&:hover": {
                                    transform: "translateY(-2px)",
                                    boxShadow: "0 16px 36px rgba(124,58,237,0.6)",
                                },
                            }}
                        >
                            Save
                        </Button>
                        :
                        < Button
                            endDecorator={<ArrowForwardIcon />}
                            size="lg"
                            onClick={handleNext}
                            disabled={openNext === 6}
                            sx={{
                                px: 5,
                                borderRadius: "xl",
                                fontWeight: 800,
                                background: "linear-gradient(135deg,#7c3aed,#5b21b6)",
                                boxShadow: "0 12px 28px rgba(124,58,237,0.45)",
                                transition: "all 0.25s ease",
                                "&:hover": {
                                    transform: "translateY(-2px)",
                                    boxShadow: "0 16px 36px rgba(124,58,237,0.6)",
                                },
                            }}
                        >
                            Next
                        </Button>
                    }
                </Box>
            </Card >
        </Box >
    )
}

export default memo(WorkOrderEntry)
