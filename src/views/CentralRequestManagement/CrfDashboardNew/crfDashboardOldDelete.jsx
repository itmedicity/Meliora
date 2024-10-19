import { Box, CssVarsProvider, Typography } from '@mui/joy'
import React, { useEffect, useState, useCallback, memo } from 'react'
import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';
import AlignHorizontalLeftIcon from '@mui/icons-material/AlignHorizontalLeft';
import Card from '@mui/joy/Card';
import { useHistory } from 'react-router-dom'
import CrfDashboardTable from './CrfDashboardTable';
import CustomBackDrop from 'src/views/Components/CustomBackDrop';
import { useDispatch, useSelector } from 'react-redux'
import { getCRMDashboard } from 'src/redux/actions/CrmDashBoardList.action';


const CrfDashboardMain = () => {
    /*** Initializing */
    const history = useHistory();
    const [count, setCount] = useState(0)
    const [hodClinic, setHodClinic] = useState([])
    const [hodNonClinic, setHodNonClinic] = useState([])
    const [dmsClinic, setdmsClinic] = useState([])
    const [msClinic, setmsClinic] = useState([])
    const [moClinic, setmoClinic] = useState([])
    const [moNonClinic, setmoNonClinic] = useState([])
    const [smoClinic, setsmoClinic] = useState([])
    const [smoNonClinic, setsmoNonClinic] = useState([])
    const [gmClinic, setgmClinic] = useState([])
    const [gmNonClinic, setgmNonClinic] = useState([])
    const [mdClinic, setmdClinic] = useState([])
    const [mdNonClinic, setmdNonClinic] = useState([])
    const [edClinic, setedClinic] = useState([])
    const [edNonClinic, setedNonClinic] = useState([])
    const [purchseAck, setpurchseAck] = useState([])
    const [quationCall, setquationCall] = useState([])
    const [quationNegoPendng, setquationNegoPendng] = useState([])
    const [quationFixing, setquationFixing] = useState([])
    const [poPrepaire, setPoPrepaire] = useState([])
    const [poComplete, setPoComplete] = useState([])
    const [pofirstLevel, setFirstLevel] = useState([])
    const [poSecndLevel, setSecondLevel] = useState([])
    const [poSupplier, setPoSupplier] = useState([])
    const [flag, setFlag] = useState(0)
    const [heading, setHeading] = useState('')
    const [disData, setDisData] = useState([])
    const [PurchseFlag, setPurchaseFlag] = useState(0)
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch();
    const HodClinicPendingList = useCallback(() => {
        setFlag(1)
        setPurchaseFlag(0)
        setHeading("HOD Pending Clinic")
        setDisData(hodClinic)
    }, [hodClinic])

    const HodNonClinicPendingList = useCallback(() => {
        setFlag(2)
        setPurchaseFlag(0)
        setHeading("HOD Pending NonClinic")
        setDisData(hodNonClinic)
    }, [hodNonClinic])

    const DMSPendingList = useCallback(() => {
        if (dmsClinic.length !== 0) {
            history.push('/Home/CRFNewDMSApproval')
        } else {
        }
    }, [history, dmsClinic])

    const MSPendingList = useCallback(() => {
        if (msClinic.length !== 0) {
            history.push('/Home/CRFNewMSApproval')
        } else {

        }
    }, [history, msClinic])

    const MOClinicPendingList = useCallback(() => {
        setOpen(true)
        setFlag(3)
        setPurchaseFlag(0)
        setHeading("Documentation Pending Clinic")
        setDisData(moClinic)
    }, [moClinic])

    const MONonClinicPendingList = useCallback(() => {
        setOpen(true)
        setFlag(4)
        setPurchaseFlag(0)
        setHeading("Documentation Pending NonClinic")
        setDisData(moNonClinic)
    }, [moNonClinic])


    const SMOClinicPendingList = useCallback(() => {
        setOpen(true)
        setFlag(5)
        setPurchaseFlag(0)
        setHeading("Verification Pending Clinic")
        setDisData(smoClinic)
    }, [smoClinic])

    const SMONonClinicPendingList = useCallback(() => {
        setOpen(true)
        setFlag(6)
        setPurchaseFlag(0)
        setHeading("Verification Pending NonClinic")
        setDisData(smoNonClinic)
    }, [smoNonClinic])

    const GMClinicPendingList = useCallback(() => {
        setOpen(true)
        setFlag(7)
        setPurchaseFlag(0)
        setHeading("General Manager Operation Pending Clinic")
        setDisData(gmClinic)
    }, [gmClinic])

    const GMNonClinicPendingList = useCallback(() => {
        setOpen(true)
        setFlag(8)
        setPurchaseFlag(0)
        setHeading("General Manager Operation  Pending NonClinic")
        setDisData(gmNonClinic)
    }, [gmNonClinic])


    const MDClinicPendingList = useCallback(() => {
        setOpen(true)
        setFlag(9)
        setPurchaseFlag(0)
        setHeading("Medical Director Pending Clinic")
        setDisData(mdClinic)
    }, [mdClinic])

    const MDNonClinicPendingList = useCallback(() => {
        setOpen(true)
        setFlag(10)
        setPurchaseFlag(0)
        setHeading("Medical Director Pending NonClinic")
        setDisData(mdNonClinic)
    }, [mdNonClinic])

    const EDClinicPendingList = useCallback(() => {
        setOpen(true)
        setFlag(11)
        setPurchaseFlag(0)
        setHeading("Executive Director Pending NonClinic")
        setDisData(edClinic)
    }, [edClinic])

    const EDNonClinicPendingList = useCallback(() => {
        setOpen(true)
        setFlag(12)
        setPurchaseFlag(0)
        setHeading("Executive Director Pending NonClinic")
        setDisData(edNonClinic)
    }, [edNonClinic])

    const AckPendings = useCallback(() => {
        setOpen(true)
        setPurchaseFlag(1)
        setDisData(purchseAck)
        setHeading("Purchase Acknowledgement")
        setFlag(1)
    }, [purchseAck])


    const QuatCallPendings = useCallback(() => {
        setOpen(true)
        setPurchaseFlag(2)
        setDisData(quationCall)
        setHeading("Quatation Calling Pending")
        setFlag(1)
    }, [quationCall])


    const QutNegoPendings = useCallback(() => {
        setOpen(true)
        setPurchaseFlag(3)
        setDisData(quationNegoPendng)
        setHeading("Quatation Negotiation Pending")
        setFlag(1)
    }, [quationNegoPendng])


    const QutFixPendings = useCallback(() => {
        setOpen(true)
        setPurchaseFlag(4)
        setDisData(quationFixing)
        setHeading("Quatation Fixing Pending")
        setFlag(1)
    }, [quationFixing])


    const POPendings = useCallback(() => {
        setOpen(true)
        setPurchaseFlag(5)
        setDisData(poPrepaire)
        setHeading("PO Pending")
        setFlag(1)
    }, [poPrepaire])


    const POCompletePendings = useCallback(() => {
        setOpen(true)
        setPurchaseFlag(6)
        setDisData(poComplete)
        setHeading("PO Close Pending")
        setFlag(1)
    }, [poComplete])

    const PoPurApprovPendings = useCallback(() => {
        setOpen(true)
        setPurchaseFlag(7)
        setDisData(pofirstLevel)
        setHeading("PO First Level Approval Pending")
        setFlag(1)
    }, [pofirstLevel])

    const EDMDAppPendings = useCallback(() => {
        setOpen(true)
        setPurchaseFlag(8)
        setDisData(poSecndLevel)
        setHeading("PO Managing Director Approval Pending")
        setFlag(1)
    }, [poSecndLevel])

    const PoSuplierPendings = useCallback(() => {
        setOpen(true)
        setPurchaseFlag(9)
        setDisData(poSupplier)
        setHeading("PO to Supplier Pending")
        setFlag(1)
    }, [poSupplier])

    useEffect(() => {
        dispatch(getCRMDashboard())
    }, [dispatch, count])

    const tabledata = useSelector((state) => {
        return state.setCRMDashBoard.setCRMDashboardList
    })


    useEffect(() => {

        if (tabledata.length !== 0) {

            const notClose = tabledata.filter((val) => {
                return val.crf_close !== 1
            })
            const datas = notClose.map((val) => {
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
                    req_date: val.create_date,
                    expected_date: val.expected_date,
                    status: val.rm_ndrf === 1 ? "NDRF" : "CRF",
                    crf_close: val.crf_close,
                    crf_close_remark: val.crf_close_remark,
                    crf_closed_one: val.crf_closed_one,
                    close_date: val.close_date,
                    closed_user: val.closed_user !== null ? val.closed_user.toLowerCase() : '',
                    incharge_approve: val.incharge_approve,
                    incharge_req: val.incharge_req,
                    incharge: val.incharge_approve === 1 ? "Approved" : val.incharge_approve === 2 ? "Reject" :
                        val.incharge_approve === 3 ? "On-Hold" : "Not Done",
                    incharge_remarks: val.incharge_remarks,
                    inch_detial_analysis: val.inch_detial_analysis,
                    incharge_remark: val.incharge_remarks !== null ? val.incharge_remarks : '',
                    incharge_apprv_date: val.incharge_apprv_date,
                    incharge_user: val.incharge_user !== null ? val.incharge_user.toLowerCase() : '',

                    hod_req: val.hod_req,
                    hod_approve: val.hod_approve,
                    hod: val.hod_approve === 1 ? "Approved" : val.hod_approve === 2 ? "Reject" :
                        val.hod_approve === 3 ? "On-Hold" : "Not Done",
                    hod_remarks: val.hod_remarks !== null ? val.hod_remarks : "Not Done",
                    hod_detial_analysis: val.hod_detial_analysis,
                    hod_approve_date: val.hod_approve_date,
                    hod_user: val.hod_user !== null ? val.hod_user.toLowerCase() : '',

                    dms_req: val.dms_req,
                    dms_approve: val.dms_approve,
                    dms: val.dms_approve === 1 ? "Approved" : val.dms_approve === 2 ? "Reject" :
                        val.dms_approve === 3 ? "On-Hold" : "Not Done",
                    dms_remarks: val.dms_remarks,
                    dms_detail_analysis: val.dms_detail_analysis,
                    dms_approve_date: val.dms_approve_date,
                    dms_user: val.dms_user !== null ? val.dms_user.toLowerCase() : '',

                    ms_approve_req: val.ms_approve_req,
                    ms_approve: val.ms_approve,
                    ms: val.ms_approve === 1 ? "Approved" : val.ms_approve === 2 ? "Reject" :
                        val.ms_approve === 3 ? "On-Hold" : "Not Done",
                    ms_approve_remark: val.ms_approve_remark,
                    ms_approve_date: val.ms_approve_date,
                    ms_approve_user: val.ms_approve_user !== null ? val.ms_approve_user.toLowerCase() : '',
                    ms_detail_analysis: val.ms_detail_analysis,

                    manag_operation_req: val.manag_operation_req,
                    manag_operation_approv: val.manag_operation_approv,
                    om: val.manag_operation_approv === 1 ? "Approved" : val.manag_operation_approv === 2 ? "Reject" :
                        val.manag_operation_approv === 3 ? "On-Hold" : "Not Done",
                    manag_operation_remarks: val.manag_operation_remarks,
                    om_approv_date: val.om_approv_date,
                    manag_operation_user: val.manag_operation_user !== null ? val.manag_operation_user.toLowerCase() : '',
                    om_detial_analysis: val.om_detial_analysis,

                    senior_manage_approv: val.senior_manage_approv,
                    smo: val.senior_manage_approv === 1 ? "Approved" : val.senior_manage_approv === 2 ? "Reject" :
                        val.senior_manage_approv === 3 ? "On-Hold" : "Not Done",
                    senior_manage_remarks: val.senior_manage_remarks,
                    som_aprrov_date: val.som_aprrov_date,
                    senior_manage_user: val.senior_manage_user !== null ? val.senior_manage_user.toLowerCase() : '',
                    smo_detial_analysis: val.smo_detial_analysis,

                    gm_approve: val.gm_approve,
                    gm: val.gm_approve === 1 ? "Approved" : val.gm_approve === 2 ? "Reject" :
                        val.gm_approve === 3 ? "On-Hold" : "Not Done",
                    gm_approve_remarks: val.gm_approve_remarks,
                    gm_approv_date: val.gm_approv_date,
                    gm_user: val.gm_user !== null ? val.gm_user.toLowerCase() : '',
                    gm_detial_analysis: val.gm_detial_analysis,

                    md_approve: val.md_approve,
                    md: val.md_approve === 1 ? "Approved" : val.md_approve === 2 ? "Reject" :
                        val.md_approve === 3 ? "On-Hold" : "Not Done",
                    md_approve_remarks: val.md_approve_remarks,
                    md_approve_date: val.md_approve_date,
                    md_user: val.md_user !== null ? val.md_user.toLowerCase() : '',
                    md_detial_analysis: val.md_detial_analysis,

                    ed_approve: val.ed_approve,
                    ed: val.ed_approve === 1 ? "Approved" : val.ed_approve === 2 ? "Reject" :
                        val.ed_approve === 3 ? "On-Hold" : "Not Done",
                    ed_approve_remarks: val.ed_approve_remarks,
                    ed_approve_date: val.ed_approve_date,
                    ed_user: val.ed_user ? val.ed_user.toLowerCase() : '',
                    ed_detial_analysis: val.ed_detial_analysis,


                    higher: val.ms_approve !== null ? 1 : 0,
                    ack_status: val.ack_status,
                    quatation_calling_status: val.quatation_calling_status,
                    quatation_negotiation: val.quatation_negotiation,
                    quatation_fixing: val.quatation_fixing,
                    po_prepartion: val.po_prepartion,
                    po_complete: val.po_complete,
                    po_approva_level_one: val.po_approva_level_one,
                    po_approva_level_two: val.po_approva_level_two,
                    po_to_supplier: val.po_to_supplier,
                }
                return obj
            })

            const hodClinical = datas.filter((val) => {
                return val.hod_req === 1 && val.hod_approve === null &&
                    val.manag_operation_approv === null &&
                    val.senior_manage_approv === null &&
                    val.gm_approve === null && val.md_approve === null &&
                    val.ed_approve === null && val.dms_req === 1
            })
            setHodClinic(hodClinical)
            const hodNonClinical = datas.filter((val) => {
                return val.hod_req === 1 && val.hod_approve === null &&
                    val.manag_operation_approv === null &&
                    val.senior_manage_approv === null &&
                    val.gm_approve === null && val.md_approve === null &&
                    val.ed_approve === null && val.dms_req === 0
            })
            setHodNonClinic(hodNonClinical)

            const dmsClinical = datas.filter((val) => {
                return val.dms_req === 1 && val.dms_approve === null &&
                    val.ms_approve === null && val.manag_operation_approv === null &&
                    val.senior_manage_approv === null &&
                    val.gm_approve === null && val.md_approve === null &&
                    val.ed_approve === null
            })
            setdmsClinic(dmsClinical)
            const msClinical = datas.filter((val) => {
                return val.ms_approve_req === 1 && val.ms_approve === null &&
                    val.manag_operation_approv === null &&
                    val.senior_manage_approv === null &&
                    val.gm_approve === null && val.md_approve === null &&
                    val.ed_approve === null
            })

            setmsClinic(msClinical)

            const moClinical = datas.filter((val) => {
                return val.manag_operation_approv === null &&
                    val.senior_manage_approv === null &&
                    val.gm_approve === null && val.md_approve === null &&
                    val.ed_approve === null && val.dms_req === 1
            })
            setmoClinic(moClinical)
            const moNonClinical = datas.filter((val) => {
                return val.manag_operation_approv === null &&
                    val.senior_manage_approv === null &&
                    val.gm_approve === null && val.md_approve === null &&
                    val.ed_approve === null && val.dms_req === 0
            })
            setmoNonClinic(moNonClinical)
            const smoClinical = datas.filter((val) => {
                return val.senior_manage_approv === null &&
                    val.gm_approve === null && val.md_approve === null &&
                    val.ed_approve === null && val.dms_req === 1
            })
            setsmoClinic(smoClinical)
            const smoNonClinical = datas.filter((val) => {
                return val.senior_manage_approv === null &&
                    val.gm_approve === null && val.md_approve === null &&
                    val.ed_approve === null && val.dms_req === 0
            })
            setsmoNonClinic(smoNonClinical)
            const gmClinical = datas.filter((val) => {
                return val.gm_approve === null && val.md_approve === null &&
                    val.ed_approve === null && val.dms_req === 1
            })
            setgmClinic(gmClinical)
            const gmNonClinical = datas.filter((val) => {
                return val.gm_approve === null && val.md_approve === null &&
                    val.ed_approve === null && val.dms_req === 0
            })
            setgmNonClinic(gmNonClinical)

            const mdClinical = datas.filter((val) => {
                return val.md_approve === null && val.dms_req === 1
            })
            setmdClinic(mdClinical)

            const mdNonClinical = datas.filter((val) => {
                return val.md_approve === null && val.dms_req === 0
            })
            setmdNonClinic(mdNonClinical)

            const edClinical = datas.filter((val) => {
                return val.ed_approve === null && val.dms_req === 1
            })
            setedClinic(edClinical)
            const edNonClinical = datas.filter((val) => {
                return val.ed_approve === null && val.dms_req === 0
            })
            setedNonClinic(edNonClinical)

            const ackpendingList = datas.filter((val) => {
                return val.ack_status === null && val.ed_approve === 1 && val.md_approve === 1
            })
            setpurchseAck(ackpendingList)

            const QuatPendingList = datas.filter((val) => {
                return val.quatation_calling_status === 0 && val.ack_status === 1 && val.po_prepartion !== 1
            })

            setquationCall(QuatPendingList)

            const QuatNegotiatnList = datas.filter((val) => {
                return val.quatation_negotiation === 0 && val.quatation_calling_status === 1
            })
            setquationNegoPendng(QuatNegotiatnList)

            const quatFinalizeList = datas.filter((val) => {
                return val.quatation_fixing === 0 && val.quatation_calling_status === 1
            })
            setquationFixing(quatFinalizeList)

            const PoPendingList = datas.filter((val) => {
                return (val.po_prepartion === 0 && val.quatation_fixing === 1) ||
                    (val.po_prepartion === 0 && val.quatation_calling_status === 0)
            })
            setPoPrepaire(PoPendingList)

            const poCompleteList = datas.filter((val) => {
                return val.po_complete === 0 && val.po_prepartion === 1
            })
            setPoComplete(poCompleteList)

            const PoApprovalPurchase = datas.filter((val) => {
                return val.po_approva_level_one === 0 && val.po_complete === 1
            })
            setFirstLevel(PoApprovalPurchase)
            const PoApprovalEDMD = datas.filter((val) => {
                return val.po_approva_level_two === 0 && val.po_approva_level_one === 1
            })
            setSecondLevel(PoApprovalEDMD)
            const PotoSupplierList = datas.filter((val) => {
                return val.po_to_supplier === 0 && val.po_approva_level_two === 1
            })
            setPoSupplier(PotoSupplierList)


        }
    }, [tabledata])


    useEffect(() => {
        if (flag === 1 && PurchseFlag === 0) {
            setDisData(hodClinic)
        } else if (flag === 2 && PurchseFlag === 0) {
            setDisData(hodNonClinic)
        } else if (flag === 3 && PurchseFlag === 0) {
            setDisData(moClinic)
        } else if (flag === 4 && PurchseFlag === 0) {
            setDisData(moNonClinic)
        } else if (flag === 5 && PurchseFlag === 0) {
            setDisData(smoClinic)
        } else if (flag === 6 && PurchseFlag === 0) {
            setDisData(smoNonClinic)
        } else if (flag === 7 && PurchseFlag === 0) {
            setDisData(gmClinic)
        } else if (flag === 8 && PurchseFlag === 0) {
            setDisData(gmNonClinic)
        } else if (flag === 9 && PurchseFlag === 0) {
            setDisData(mdClinic)
        } else if (flag === 10 && PurchseFlag === 0) {
            setDisData(mdNonClinic)
        } else if (flag === 11 && PurchseFlag === 0) {
            setDisData(edClinic)
        } else if (flag === 12 && PurchseFlag === 0) {
            setDisData(edNonClinic)
        } else if (flag === 1 && PurchseFlag === 1) {
            setDisData(purchseAck)
        } else if (flag === 1 && PurchseFlag === 2) {
            setDisData(quationCall)
        } else if (flag === 1 && PurchseFlag === 3) {
            setDisData(quationNegoPendng)
        } else if (flag === 1 && PurchseFlag === 4) {
            setDisData(quationFixing)
        } else if (flag === 1 && PurchseFlag === 5) {
            setDisData(poPrepaire)
        } else if (flag === 1 && PurchseFlag === 6) {
            setDisData(poComplete)
        } else if (flag === 1 && PurchseFlag === 7) {
            setDisData(pofirstLevel)
        } else if (flag === 1 && PurchseFlag === 8) {
            setDisData(poSecndLevel)
        } else if (flag === 1 && PurchseFlag === 9) {
            setDisData(poSupplier)
        }
    }, [PurchseFlag, flag, count, hodClinic, hodNonClinic, moClinic, moNonClinic, smoClinic,
        smoNonClinic, gmClinic, gmNonClinic, mdClinic, mdNonClinic, edClinic, edNonClinic, purchseAck,
        quationCall, quationNegoPendng, quationFixing, poPrepaire, poComplete, pofirstLevel, poSecndLevel,
        poSupplier])

    return (
        <Box>
            <CustomBackDrop open={open} text="Please Wait" />
            {flag !== 0 ?
                <Box>
                    <CrfDashboardTable heading={heading} disData={disData} flag={flag}
                        setFlag={setFlag} setHeading={setHeading} setDisData={setDisData}
                        PurchseFlag={PurchseFlag} count={count} setCount={setCount}
                        setPurchaseFlag={setPurchaseFlag} setOpen={setOpen}
                    />
                </Box> :
                <Box>
                    <CssVarsProvider>
                        {/* CRF Pending Status Start Here */}

                        <Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    border: 5,
                                    borderColor: '#6398fd',
                                    borderRadius: 10,
                                    minHeight: 50,
                                    boxShadow: 2,
                                    backgroundColor: '#6398fd'
                                }}
                            >
                                <ButtonGroup
                                    aria-label="outlined primary button group"
                                    size="sm"
                                    buttonFlex={1}
                                    variant="plain"
                                    orientation="vertical"
                                    sx={{
                                        display: 'flex',
                                        flex: 1,
                                        maxWidth: '100%',
                                        overflow: 'auto',
                                    }}
                                >
                                    <Button sx={{}} startDecorator={<AlignHorizontalLeftIcon sx={{ color: 'red' }} />} >CRF Status</Button>
                                    <Button sx={{ color: 'white' }} >Head Of Department (HOD)</Button>
                                    <Button sx={{ color: 'white' }} >Deputy medical superintendent (DMS) </Button>
                                    <Button sx={{ color: 'white' }} >Medical superintendent (MS)</Button>
                                    <Button sx={{ color: 'white' }} >Materials Management</Button>
                                    <Button sx={{ color: 'white' }} >Senior Manager Operation (SMO)</Button>
                                    <Button sx={{ color: 'white' }} >General Manager Operation (GM)</Button>
                                    <Button sx={{ color: 'white' }} >Medical Director (MD)</Button>
                                    <Button sx={{ color: 'white' }} >Executive Director (ED)</Button>
                                </ButtonGroup>

                                <ButtonGroup
                                    aria-label="outlined primary button group"
                                    size="sm"
                                    buttonFlex={1}
                                    // variant="plain"
                                    orientation="vertical"
                                    sx={{
                                        display: 'flex',
                                        flex: 1,
                                        maxWidth: '100%',
                                        overflow: 'auto',
                                    }}
                                >
                                    <Button sx={{}} variant='solid' color='primary' >Clinical Department CRF</Button>
                                    <Button sx={{}} onClick={() => HodClinicPendingList()}>{hodClinic.length}</Button>
                                    <Button sx={{}} onClick={() => DMSPendingList()} >{dmsClinic.length}</Button>
                                    <Button sx={{}} onClick={() => MSPendingList()}>{msClinic.length}</Button>
                                    <Button sx={{}} onClick={() => MOClinicPendingList()}>{moClinic.length}</Button>
                                    <Button sx={{}} onClick={() => SMOClinicPendingList()}>{smoClinic.length}</Button>
                                    <Button sx={{}} onClick={() => GMClinicPendingList()}>{gmClinic.length}</Button>
                                    <Button sx={{}} onClick={() => MDClinicPendingList()}>{mdClinic.length}</Button>
                                    <Button sx={{}} onClick={() => EDClinicPendingList()}>{edClinic.length}</Button>
                                </ButtonGroup>
                                <ButtonGroup
                                    aria-label="outlined primary button group"
                                    size="sm"
                                    buttonFlex={1}
                                    // variant="plain"
                                    orientation="vertical"
                                    sx={{
                                        display: 'flex',
                                        flex: 1,
                                        maxWidth: '100%',
                                        overflow: 'auto',

                                    }}
                                >
                                    <Button sx={{}} variant='solid' color='primary'  >Non Clinical Department CRF</Button>
                                    <Button sx={{}} onClick={() => HodNonClinicPendingList()}>{hodNonClinic.length}</Button>
                                    <Button sx={{}} disabled >0</Button>
                                    <Button sx={{}} disabled>0</Button>
                                    <Button sx={{}} onClick={() => MONonClinicPendingList()}>{moNonClinic.length}</Button>
                                    <Button sx={{}} onClick={() => SMONonClinicPendingList()} >{smoNonClinic.length}</Button>
                                    <Button sx={{}} onClick={() => GMNonClinicPendingList()}>{gmNonClinic.length}</Button>
                                    <Button sx={{}} onClick={() => MDNonClinicPendingList()}>{mdNonClinic.length}</Button>
                                    <Button sx={{}} onClick={() => EDNonClinicPendingList()}>{edNonClinic.length}</Button>
                                </ButtonGroup>
                            </Box>
                            {/* CRF Pending Status Start Here */}
                            {/* Purchase CRF Status Start Here  */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    mt: 1,
                                    borderColor: '#6398fd',
                                    borderRadius: 10,
                                    minHeight: 50,
                                    boxShadow: 2,
                                    flexWrap: 'wrap',
                                    justifyContent: 'center'
                                }}
                                gap={1}
                            >

                                <Card
                                    variant='solid'
                                    color='primary'
                                    invertedColors
                                    sx={{ width: 260 }}
                                    size='md'
                                    onClick={() => AckPendings()}
                                >
                                    <div>
                                        <Typography level="h2">
                                            {purchseAck.length}{' '}
                                            <Typography fontSize="sm" textColor="text.tertiary">
                                                / PO Acknowledgement
                                            </Typography>
                                        </Typography>
                                    </div>
                                </Card>

                                <Card
                                    variant='solid'
                                    color='primary'
                                    invertedColors
                                    sx={{ width: 260 }}
                                    size='md'
                                    onClick={() => QuatCallPendings()}
                                >
                                    <div>
                                        <Typography level="h2">
                                            {quationCall.length}{' '}
                                            <Typography fontSize="sm" textColor="text.tertiary">
                                                /Quotation Pending
                                            </Typography>
                                        </Typography>
                                    </div>
                                </Card>

                                <Card
                                    variant='solid'
                                    color='primary'
                                    invertedColors
                                    sx={{ width: 260 }}
                                    size='md'
                                    onClick={() => QutNegoPendings()}
                                >
                                    <div>
                                        <Typography level="h2">
                                            {quationNegoPendng.length}{' '}
                                            <Typography fontSize="sm" textColor="text.tertiary">
                                                /Quotation Negotiation
                                            </Typography>
                                        </Typography>
                                    </div>
                                </Card>

                                <Card
                                    variant='solid'
                                    color='primary'
                                    invertedColors
                                    sx={{ width: 260 }}
                                    size='md'
                                    onClick={() => QutFixPendings()}
                                >
                                    <div>
                                        <Typography level="h2">
                                            {quationFixing.length}{' '}
                                            <Typography fontSize="sm" textColor="text.tertiary">
                                                /Quotation Finalization
                                            </Typography>
                                        </Typography>
                                    </div>
                                </Card>
                                <Card
                                    variant='solid'
                                    color='primary'
                                    invertedColors
                                    sx={{ width: 260 }}
                                    size='md'
                                    onClick={() => POPendings()}
                                >
                                    <div>
                                        <Typography level="h2">
                                            {poPrepaire.length}{' '}
                                            <Typography fontSize="sm" textColor="text.tertiary">
                                                /PO Preparation Pending
                                            </Typography>
                                        </Typography>
                                    </div>
                                </Card>  <Card
                                    variant='solid'
                                    color='primary'
                                    invertedColors
                                    sx={{ width: 260 }}
                                    size='md'
                                    onClick={() => POCompletePendings()}
                                >
                                    <div>
                                        <Typography level="h2">
                                            {poComplete.length}{' '}
                                            <Typography fontSize="sm" textColor="text.tertiary">
                                                /PO Completion Pending
                                            </Typography>
                                        </Typography>
                                    </div>
                                </Card>


                                <Card
                                    variant='solid'
                                    color='primary'
                                    invertedColors
                                    sx={{ width: 260 }}
                                    size='md'
                                    onClick={() => PoPurApprovPendings()}
                                >
                                    <div>
                                        <Typography level="h2">
                                            {pofirstLevel.length}{' '}
                                            <Typography fontSize="sm" textColor="text.tertiary">
                                                /PO Purchase Approval
                                            </Typography>
                                        </Typography>
                                    </div>
                                </Card>

                                <Card
                                    variant='solid'
                                    color='primary'
                                    invertedColors
                                    sx={{ width: 260 }}
                                    size='md'
                                    onClick={() => EDMDAppPendings()}
                                >
                                    <div>
                                        <Typography level="h2">
                                            {poSecndLevel.length}{' '}
                                            <Typography fontSize="sm" textColor="text.tertiary">
                                                PO  Managing Director Approval
                                            </Typography>
                                        </Typography>
                                    </div>
                                </Card>

                                <Card
                                    variant='solid'
                                    color='primary'
                                    invertedColors
                                    sx={{ width: 260 }}
                                    size='md'
                                    onClick={() => PoSuplierPendings()}
                                >
                                    <div>
                                        <Typography level="h2">
                                            {poSupplier.length}{' '}
                                            <Typography fontSize="sm" textColor="text.tertiary">
                                                PO To Supplier Pending
                                            </Typography>
                                        </Typography>
                                    </div>
                                </Card>
                            </Box>
                        </Box>
                    </CssVarsProvider>
                </Box>
            }
        </Box>
    )
}

export default memo(CrfDashboardMain)