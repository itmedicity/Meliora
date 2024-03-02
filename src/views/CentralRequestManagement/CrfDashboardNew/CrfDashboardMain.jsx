import { Box, CssVarsProvider, Typography } from '@mui/joy'
import React, { useEffect, useState, useCallback } from 'react'
import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';
import AlignHorizontalLeftIcon from '@mui/icons-material/AlignHorizontalLeft';
import Card from '@mui/joy/Card';
import { axioslogin } from 'src/views/Axios/Axios';
import { useHistory } from 'react-router-dom'

const CrfDashboardMain = () => {


    /*** Initializing */
    const history = useHistory();

    const [hodClinic, setHodClinic] = useState(0)
    const [hodNonClinic, setHodNonClinic] = useState(0)
    const [dmsClinic, setdmsClinic] = useState(0)
    const [msClinic, setmsClinic] = useState(0)
    const [moClinic, setmoClinic] = useState(0)
    const [moNonClinic, setmoNonClinic] = useState(0)
    const [smoClinic, setsmoClinic] = useState(0)
    const [smoNonClinic, setsmoNonClinic] = useState(0)
    const [gmClinic, setgmClinic] = useState(0)
    const [gmNonClinic, setgmNonClinic] = useState(0)
    const [mdClinic, setmdClinic] = useState(0)
    const [mdNonClinic, setmdNonClinic] = useState(0)
    const [edClinic, setedClinic] = useState(0)
    const [edNonClinic, setedNonClinic] = useState(0)
    const [purchseAck, setpurchseAck] = useState(0)
    const [quationCall, setquationCall] = useState(0)
    const [quationPendng, setquationPendng] = useState(0)
    const [quationFixing, setquationFixing] = useState(0)
    const [poPrepaire, setPoPrepaire] = useState(0)
    const [poComplete, setPoComplete] = useState(0)
    const [pofirstLevel, setFirstLevel] = useState(0)
    const [poSecndLevel, setSecondLevel] = useState(0)
    const [poSupplier, setPoSupplier] = useState(0)



    const DMSPendingList = useCallback(() => {
        history.push('/Home/CRFNewDMSApproval')
    }, [history])

    const MSPendingList = useCallback(() => {
        history.push('/Home/CRFNewMSApproval')
    }, [history])

    const MOPendingList = useCallback(() => {
        history.push('/Home/CRFNewOMApproval')
    }, [history])

    const SMOPendingList = useCallback(() => {
        history.push('/Home/CRFNewSMOApproval')
    }, [history])

    const GMPendingList = useCallback(() => {
        history.push('/Home/CRFNewGMApproval')
    }, [history])

    const MDPendingList = useCallback(() => {
        history.push('/Home/CRFNewMDApproval')
    }, [history])

    const EDPendingList = useCallback(() => {
        history.push('/Home/CRFNewEDApproval')
    }, [history])

    // const PurchasePendings = useCallback(() => {
    //     history.push('/Home/CRFNewPurchase')
    // }, [history])


    useEffect(() => {


        const getReqDeptsecList = async () => {
            const result = await axioslogin.get('/newCRFRegister/getAllList/Dashboard');
            const { success, data } = result.data
            if (success === 1) {
                const datas = data.map((val) => {
                    const obj = {
                        req_slno: val.req_slno,
                        actual_requirement: val.actual_requirement,
                        needed: val.needed,
                        request_dept_slno: val.request_dept_slno,
                        request_deptsec_slno: val.request_deptsec_slno,
                        dept_name: val.dept_name.toLowerCase(),
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
                        hod_detial_analysis: val.hod_detial_analysis !== null ? val.hod_detial_analysis : "Not Done",
                        hod_approve_date: val.hod_approve_date,
                        hod_user: val.hod_user !== null ? val.hod_user.toLowerCase() : '',

                        dms_req: val.dms_req,
                        dms_approve: val.dms_approve,
                        dms: val.dms_approve === 1 ? "Approved" : val.dms_approve === 2 ? "Reject" :
                            val.dms_approve === 3 ? "On-Hold" : "Not Done",
                        dms_remarks: val.dms_remarks !== null ? val.dms_remarks : '',
                        dms_detail_analysis: val.dms_detail_analysis !== null ? val.dms_detail_analysis : '',
                        dms_approve_date: val.dms_approve_date,
                        dms_user: val.dms_user !== null ? val.dms_user.toLowerCase() : '',

                        ms_approve_req: val.ms_approve_req,
                        ms_approve: val.ms_approve,
                        ms: val.ms_approve === 1 ? "Approved" : val.ms_approve === 2 ? "Reject" :
                            val.ms_approve === 3 ? "On-Hold" : "Not Done",
                        ms_approve_remark: val.ms_approve_remark !== null ? val.ms_approve_remark : "Not Updated",
                        ms_approve_date: val.ms_approve_date,
                        ms_approve_user: val.ms_approve_user !== null ? val.ms_approve_user.toLowerCase() : '',
                        manag_operation_req: val.manag_operation_req,

                        manag_operation_approv: val.manag_operation_approv,
                        om: val.manag_operation_approv === 1 ? "Approved" : val.manag_operation_approv === 2 ? "Reject" :
                            val.manag_operation_approv === 3 ? "On-Hold" : "Not Done",
                        manag_operation_remarks: val.manag_operation_remarks !== null ? val.manag_operation_remarks : "Not Updated",
                        om_approv_date: val.om_approv_date,
                        manag_operation_user: val.manag_operation_user !== null ? val.manag_operation_user.toLowerCase() : '',

                        senior_manage_approv: val.senior_manage_approv,
                        smo: val.senior_manage_approv === 1 ? "Approved" : val.senior_manage_approv === 2 ? "Reject" :
                            val.senior_manage_approv === 3 ? "On-Hold" : "Not Done",
                        senior_manage_remarks: val.senior_manage_remarks !== null ? val.senior_manage_remarks : "Not Updated",
                        som_aprrov_date: val.som_aprrov_date,
                        senior_manage_user: val.senior_manage_user !== null ? val.senior_manage_user.toLowerCase() : '',
                        gm_approve: val.gm_approve,
                        gm: val.gm_approve === 1 ? "Approved" : val.gm_approve === 2 ? "Reject" :
                            val.gm_approve === 3 ? "On-Hold" : "Not Done",
                        gm_approve_remarks: val.gm_approve_remarks !== null ? val.gm_approve_remarks : "Not Updated",
                        gm_approv_date: val.gm_approv_date,
                        gm_user: val.gm_user !== null ? val.gm_user.toLowerCase() : '',
                        md_approve: val.md_approve,
                        md: val.md_approve === 1 ? "Approved" : val.md_approve === 2 ? "Reject" :
                            val.md_approve === 3 ? "On-Hold" : "Not Done",
                        md_approve_remarks: val.md_approve_remarks !== null ? val.md_approve_remarks : "Not Updated",
                        md_approve_date: val.md_approve_date,
                        md_user: val.md_user !== null ? val.md_user.toLowerCase() : '',
                        ed_approve: val.ed_approve,
                        ed: val.ed_approve === 1 ? "Approved" : val.ed_approve === 2 ? "Reject" :
                            val.ed_approve === 3 ? "On-Hold" : "Not Done",
                        ed_approve_remarks: val.ed_approve_remarks !== null ? val.ed_approve_remarks : "Not Updated",
                        ed_approve_date: val.ed_approve_date,
                        ed_user: val.ed_user ? val.ed_user.toLowerCase() : '',
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
                    return val.hod_req === 1 && val.hod_approve === null && val.dms_req === 1
                })
                setHodClinic(hodClinical)
                const hodNonClinical = datas.filter((val) => {
                    return val.hod_req === 1 && val.hod_approve === null && val.dms_req === 0
                })
                setHodNonClinic(hodNonClinical)

                const dmsClinical = datas.filter((val) => {
                    return val.dms_req === 1 && val.dms_approve === null
                })
                setdmsClinic(dmsClinical)
                const msClinical = datas.filter((val) => {
                    return val.ms_approve_req === 1 && val.ms_approve === null
                })

                setmsClinic(msClinical)

                const moClinical = datas.filter((val) => {
                    return val.manag_operation_approv === null && val.dms_req === 1
                })
                setmoClinic(moClinical)
                const moNonClinical = datas.filter((val) => {
                    return val.manag_operation_approv === null && val.dms_req === 0
                })
                setmoNonClinic(moNonClinical)
                const smoClinical = datas.filter((val) => {
                    return val.senior_manage_approv === null && val.dms_req === 1
                })
                setsmoClinic(smoClinical)
                const smoNonClinical = datas.filter((val) => {
                    return val.senior_manage_approv === null && val.dms_req === 0
                })
                setsmoNonClinic(smoNonClinical)
                const gmClinical = datas.filter((val) => {
                    return val.gm_approve === null && val.dms_req === 1
                })
                setgmClinic(gmClinical)
                const gmNonClinical = datas.filter((val) => {
                    return val.gm_approve === null && val.dms_req === 0
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
                    return val.quatation_calling_status === null && val.ack_status === 0
                })
                setquationCall(QuatPendingList)

                const QuatNegotiatnList = datas.filter((val) => {
                    return val.quatation_negotiation === null && val.quatation_calling_status === 1
                })
                setquationPendng(QuatNegotiatnList)

                const quatFinalizeList = datas.filter((val) => {
                    return val.quatation_fixing === null && val.quatation_calling_status === 1
                })
                setquationFixing(quatFinalizeList)

                const PoPendingList = datas.filter((val) => {
                    return (val.po_prepartion === null && val.quatation_fixing === 1) ||
                        (val.po_prepartion === null && val.quatation_calling_status === 0)
                })
                setPoPrepaire(PoPendingList)

                const poCompleteList = datas.filter((val) => {
                    return val.po_complete === null && val.po_prepartion === 1
                })
                setPoComplete(poCompleteList)

                const PoApprovalPurchase = datas.filter((val) => {
                    return val.po_approva_level_one === null && val.po_complete === 0
                })
                setFirstLevel(PoApprovalPurchase)
                const PoApprovalEDMD = datas.filter((val) => {
                    return val.po_approva_level_two === null && val.po_approva_level_one === 0
                })
                setSecondLevel(PoApprovalEDMD)
                const PotoSupplierList = datas.filter((val) => {
                    return val.po_to_supplier === null && val.po_approva_level_two === 0
                })
                setPoSupplier(PotoSupplierList)

            }
        }
        getReqDeptsecList();
    }, [])




    const purchaseDeptArray = [
        { name: 'PO acknowledgement', count: purchseAck.length },
        { name: 'Quote Pending', count: quationCall.length },
        { name: 'Negotiation Pending', count: quationPendng.length },
        { name: 'Finalization Pending', count: quationFixing.length },
        { name: 'PO Preperation Pending', count: poPrepaire.length },
        { name: 'PO Completion Pending', count: poComplete.length },
        { name: 'PO Purchase Approval', count: pofirstLevel.length },
        { name: 'PO To Supplier Pending', count: poSecndLevel.length },
        { name: 'CRS DC Pending', count: poSupplier.length },
        { name: 'CRS DC Pending', count: poSupplier.length },
        { name: 'User acknowledgement', count: purchseAck.length },
    ]

    return (
        <CssVarsProvider>
            {/* CRF Pending Status Start Here */}
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
                    <Button sx={{}} >{hodClinic.length}</Button>
                    <Button sx={{}} onClick={() => DMSPendingList()} >{dmsClinic.length}</Button>
                    <Button sx={{}} onClick={() => MSPendingList()}>{msClinic.length}</Button>
                    <Button sx={{}} onClick={() => MOPendingList()}>{moClinic.length}</Button>
                    <Button sx={{}} onClick={() => SMOPendingList()}>{smoClinic.length}</Button>
                    <Button sx={{}} onClick={() => GMPendingList()}>{gmClinic.length}</Button>
                    <Button sx={{}} onClick={() => MDPendingList()}>{mdClinic.length}</Button>
                    <Button sx={{}} onClick={() => EDPendingList()}>{edClinic.length}</Button>
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
                    <Button sx={{}} >{hodNonClinic.length}</Button>
                    <Button sx={{}} disabled >0</Button>
                    <Button sx={{}} disabled>0</Button>
                    <Button sx={{}} onClick={() => MOPendingList()}>{moNonClinic.length}</Button>
                    <Button sx={{}} onClick={() => SMOPendingList()} >{smoNonClinic.length}</Button>
                    <Button sx={{}} onClick={() => GMPendingList()}>{gmNonClinic.length}</Button>
                    <Button sx={{}} onClick={() => MDPendingList()}>{mdNonClinic.length}</Button>
                    <Button sx={{}} onClick={() => EDPendingList()}>{edNonClinic.length}</Button>
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
                {/* <Stack spacing={1} flexDirection={'row'} > */}
                {
                    purchaseDeptArray?.map((val, index) =>
                        <Card
                            variant='solid'
                            color='primary'
                            invertedColors
                            sx={{ width: 260 }}
                            size='md'
                            key={index}
                        >
                            <div>
                                <Typography level="h2">
                                    {val.count}{' '}
                                    <Typography fontSize="sm" textColor="text.tertiary">
                                        / {val.name}
                                    </Typography>
                                </Typography>
                            </div>
                        </Card>
                    )
                }
                {/* </Stack> */}
            </Box>
            {/* Purchase CRF Status End Here  */}
        </CssVarsProvider>
    )
}

export default CrfDashboardMain