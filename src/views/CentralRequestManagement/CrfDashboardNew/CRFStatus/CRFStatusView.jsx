import { Box } from '@mui/joy'
import { Grid, Paper } from '@mui/material'
import React, { Fragment, memo, useCallback, useEffect, useState, } from 'react'
import DetailedViewofCRF from './DetailedViewofCRF';
import DashboradGridView from '../Components/DashboradGridView';
import hodimg from '../../../../assets/images/CRF/HOD.png'
import dmsimg from '../../../../assets/images/CRF/DMS.png'
import msimg from '../../../../assets/images/CRF/MS.png'
import moimg from '../../../../assets/images/CRF/OM.png'
import smoimg from '../../../../assets/images/CRF/SMO.png'
import gmimg from '../../../../assets/images/CRF/GM.png'
import edimg from '../../../../assets/images/CRF/ED.png'
import mdimg from '../../../../assets/images/CRF/MD.png'

const CRFStatusView = ({ crfData }) => {

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
    const [flag, setFlag] = useState(0)
    const [heading, setHeading] = useState('')
    const [disData, setDisData] = useState([])
    const [allFlag, setAllFlag] = useState(0)
    const [hodAll, setHodAll] = useState([])
    const [moAll, setMoAll] = useState([])
    const [smoAll, setSmoAll] = useState([])
    const [gmAll, setGmAll] = useState([])
    const [mdAll, setMdAll] = useState([])
    const [edAll, setEdAll] = useState([])
    const [tableData, settableData] = useState([])
    useEffect(() => {
        if (crfData.length !== 0) {
            const datas = crfData?.map((val) => {
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
                    inch_detial_analysis: val.inch_detial_analysis !== null ? val.inch_detial_analysis : "Not Updated",
                    incharge_remarks: val.incharge_remarks !== null ? val.incharge_remarks : "Not Updated",
                    incharge_apprv_date: val.incharge_apprv_date,
                    incharge_user: val.incharge_user !== null ? val.incharge_user.toLowerCase() : 'Not Updated',

                    hod_req: val.hod_req,
                    hod_approve: val.hod_approve,
                    hod: val.hod_approve === 1 ? "Approved" : val.hod_approve === 2 ? "Reject" :
                        val.hod_approve === 3 ? "On-Hold" : "Not Done",
                    hod_remarks: val.hod_remarks !== null ? val.hod_remarks : "Not Updated",
                    hod_detial_analysis: val.hod_detial_analysis !== null ? val.hod_detial_analysis : "Not Updated",
                    hod_approve_date: val.hod_approve_date,
                    hod_user: val.hod_user !== null ? val.hod_user.toLowerCase() : "Not Updated",
                    hod_image: val.hod_image,

                    dms_req: val.dms_req,
                    dms_approve: val.dms_approve,
                    dms: val.dms_approve === 1 ? "Approved" : val.dms_approve === 2 ? "Reject" :
                        val.dms_approve === 3 ? "On-Hold" : "Not Done",
                    dms_remarks: val.dms_remarks !== null ? val.dms_remarks : "Not Updated",
                    dms_detail_analysis: val.dms_detail_analysis !== null ? val.dms_detail_analysis : "Not Updated",
                    dms_approve_date: val.dms_approve_date,
                    dms_user: val.dms_user !== null ? val.dms_user.toLowerCase() : "Not Updated",
                    dms_image: val.dms_image,

                    ms_approve_req: val.ms_approve_req,
                    ms_approve: val.ms_approve,
                    ms: val.ms_approve === 1 ? "Approved" : val.ms_approve === 2 ? "Reject" :
                        val.ms_approve === 3 ? "On-Hold" : "Not Done",
                    ms_approve_remark: val.ms_approve_remark !== null ? val.ms_approve_remark : "Not Updated",
                    ms_approve_date: val.ms_approve_date,
                    ms_approve_user: val.ms_approve_user !== null ? val.ms_approve_user.toLowerCase() : 'Not Updated',
                    ms_detail_analysis: val.ms_detail_analysis !== null ? val.ms_detail_analysis : "Not Updated",
                    ms_image: val.ms_image,

                    manag_operation_req: val.manag_operation_req,
                    manag_operation_approv: val.manag_operation_approv,
                    om: val.manag_operation_approv === 1 ? "Approved" : val.manag_operation_approv === 2 ? "Reject" :
                        val.manag_operation_approv === 3 ? "On-Hold" : "Not Done",
                    manag_operation_remarks: val.manag_operation_remarks !== null ? val.manag_operation_remarks : "Not Updated",
                    om_approv_date: val.om_approv_date,
                    manag_operation_user: val.manag_operation_user !== null ? val.manag_operation_user.toLowerCase() : 'Not Updated',
                    om_detial_analysis: val.om_detial_analysis !== null ? val.om_detial_analysis : "Not Updated",
                    mo_image: val.mo_image,

                    senior_manage_approv: val.senior_manage_approv,
                    smo: val.senior_manage_approv === 1 ? "Approved" : val.senior_manage_approv === 2 ? "Reject" :
                        val.senior_manage_approv === 3 ? "On-Hold" : "Not Done",
                    senior_manage_remarks: val.senior_manage_remarks !== null ? val.senior_manage_remarks : "Not Updated",
                    som_aprrov_date: val.som_aprrov_date,
                    senior_manage_user: val.senior_manage_user !== null ? val.senior_manage_user.toLowerCase() : '',
                    smo_detial_analysis: val.smo_detial_analysis !== null ? val.smo_detial_analysis : "Not Updated",
                    smo_image: val.smo_image,

                    gm_approve: val.gm_approve,
                    gm: val.gm_approve === 1 ? "Approved" : val.gm_approve === 2 ? "Reject" :
                        val.gm_approve === 3 ? "On-Hold" : "Not Done",
                    gm_approve_remarks: val.gm_approve_remarks !== null ? val.gm_approve_remarks : "Not Updated",
                    gm_approv_date: val.gm_approv_date,
                    gm_user: val.gm_user !== null ? val.gm_user.toLowerCase() : 'Not Updated',
                    gm_detial_analysis: val.gm_detial_analysis !== null ? val.gm_detial_analysis : "Not Updated",
                    gm_image: val.gm_image,

                    md_approve: val.md_approve,
                    md: val.md_approve === 1 ? "Approved" : val.md_approve === 2 ? "Reject" :
                        val.md_approve === 3 ? "On-Hold" : "Not Done",
                    md_approve_remarks: val.md_approve_remarks !== null ? val.md_approve_remarks : "Not Updated",
                    md_approve_date: val.md_approve_date,
                    md_user: val.md_user !== null ? val.md_user.toLowerCase() : "Not Updated",
                    md_detial_analysis: val.md_detial_analysis !== null ? val.md_detial_analysis : "Not Updated",
                    md_image: val.md_image,

                    ed_approve: val.ed_approve,
                    ed: val.ed_approve === 1 ? "Approved" : val.ed_approve === 2 ? "Reject" :
                        val.ed_approve === 3 ? "On-Hold" : "Not Done",
                    ed_approve_remarks: val.ed_approve_remarks !== null ? val.ed_approve_remarks : "Not Updated",
                    ed_approve_date: val.ed_approve_date,
                    ed_user: val.ed_user ? val.ed_user.toLowerCase() : "Not Updated",
                    ed_detial_analysis: val.ed_detial_analysis !== null ? val.ed_detial_analysis : "Not Updated",
                    ed_image: val.ed_image,

                    dept_type: val.dept_type,
                    dept_id: val.dept_id,

                    now_who: val.req_status === 'C' ? "CRF Closed" :
                        val.ed_approve !== null ? "ED " :
                            val.md_approve !== null ? "MD" :
                                val.gm_approve !== null ? "GM" :
                                    val.senior_manage_approv !== null ? "SMO" :
                                        val.manag_operation_approv !== null ? "MO" :
                                            val.ms_approve !== null ? "MS" :
                                                val.dms_approve !== null ? "DMS" :
                                                    val.hod_approve !== null ? "HOD" :
                                                        val.incharge_approve !== null ? "Incharge" :
                                                            "Not Statrted",
                    now_who_status: val.req_status === 'C' ? '' :
                        val.ed_approve !== null ? val.ed_approve :
                            val.md_approve !== null ? val.md_approve :
                                val.gm_approve !== null ? val.gm_approve :
                                    val.senior_manage_approv !== null ? val.senior_manage_approv :
                                        val.manag_operation_approv !== null ? val.manag_operation_approv :
                                            val.ms_approve !== null ? val.ms_approve :
                                                val.dms_approve !== null ? val.dms_approve :
                                                    val.hod_approve !== null ? val.hod_approve :
                                                        val.incharge_approve !== null ? val.incharge_approve :
                                                            0,
                }
                return obj
            })

            const hodTotal = datas?.filter((val) => {
                return val.hod_req === 1 && val.hod_approve === null &&
                    val.manag_operation_approv === null &&
                    val.senior_manage_approv === null &&
                    val.gm_approve === null && val.md_approve === null &&
                    val.ed_approve === null
            })
            setHodAll(hodTotal)

            const hodClinical = datas?.filter((val) => {
                return val.hod_req === 1 && val.hod_approve === null &&
                    val.manag_operation_approv === null &&
                    val.senior_manage_approv === null &&
                    val.gm_approve === null && val.md_approve === null &&
                    val.ed_approve === null && val.dms_req === 1
            })
            setHodClinic(hodClinical)

            const hodNonClinical = datas?.filter((val) => {
                return val.hod_req === 1 && val.hod_approve === null &&
                    val.manag_operation_approv === null &&
                    val.senior_manage_approv === null &&
                    val.gm_approve === null && val.md_approve === null &&
                    val.ed_approve === null && val.dms_req === 0
            })
            setHodNonClinic(hodNonClinical)

            const dmsClinical = datas?.filter((val) => {
                return val.dms_req === 1 && val.dms_approve === null &&
                    val.ms_approve === null && val.manag_operation_approv === null &&
                    val.senior_manage_approv === null &&
                    val.gm_approve === null && val.md_approve === null &&
                    val.ed_approve === null && val.incharge_approve === 1
            })
            setdmsClinic(dmsClinical)

            const msClinical = datas?.filter((val) => {
                return val.ms_approve_req === 1 && val.ms_approve === null &&
                    val.manag_operation_approv === null &&
                    val.senior_manage_approv === null &&
                    val.gm_approve === null && val.md_approve === null &&
                    val.ed_approve === null && val.incharge_approve === 1
            })

            setmsClinic(msClinical)

            const moTotal = datas?.filter((val) => {
                return val.manag_operation_approv === null &&
                    val.senior_manage_approv === null &&
                    val.gm_approve === null && val.md_approve === null &&
                    val.ed_approve === null && val.incharge_approve === 1
            })
            setMoAll(moTotal)

            const moClinical = datas?.filter((val) => {
                return val.manag_operation_approv === null &&
                    val.senior_manage_approv === null &&
                    val.gm_approve === null && val.md_approve === null &&
                    val.ed_approve === null && val.dms_req === 1 && val.incharge_approve === 1
            })
            setmoClinic(moClinical)
            const moNonClinical = datas?.filter((val) => {
                return val.manag_operation_approv === null &&
                    val.senior_manage_approv === null &&
                    val.gm_approve === null && val.md_approve === null &&
                    val.ed_approve === null && val.dms_req === 0 && val.incharge_approve === 1
            })
            setmoNonClinic(moNonClinical)

            const smoTotal = datas?.filter((val) => {
                return val.senior_manage_approv === null &&
                    val.gm_approve === null && val.md_approve === null &&
                    val.ed_approve === null && val.incharge_approve === 1
            })
            setSmoAll(smoTotal)
            const smoClinical = datas?.filter((val) => {
                return val.senior_manage_approv === null &&
                    val.gm_approve === null && val.md_approve === null &&
                    val.ed_approve === null && val.dms_req === 1 && val.incharge_approve === 1
            })
            setsmoClinic(smoClinical)
            const smoNonClinical = datas?.filter((val) => {
                return val.senior_manage_approv === null &&
                    val.gm_approve === null && val.md_approve === null &&
                    val.ed_approve === null && val.dms_req === 0 && val.incharge_approve === 1
            })
            setsmoNonClinic(smoNonClinical)


            const gmTotal = datas?.filter((val) => {
                return val.gm_approve === null && val.md_approve === null &&
                    val.ed_approve === null && val.incharge_approve === 1
            })
            setGmAll(gmTotal)
            const gmClinical = datas?.filter((val) => {
                return val.gm_approve === null && val.md_approve === null &&
                    val.ed_approve === null && val.dms_req === 1 && val.incharge_approve === 1
            })
            setgmClinic(gmClinical)
            const gmNonClinical = datas?.filter((val) => {
                return val.gm_approve === null && val.md_approve === null &&
                    val.ed_approve === null && val.dms_req === 0 && val.incharge_approve === 1
            })
            setgmNonClinic(gmNonClinical)

            const mdTotal = datas?.filter((val) => {
                return val.md_approve === null && val.gm_approve === 1
            })
            setMdAll(mdTotal)
            const mdClinical = datas?.filter((val) => {
                return val.md_approve === null && val.dms_req === 1 && val.gm_approve === 1
            })
            setmdClinic(mdClinical)
            const mdNonClinical = datas?.filter((val) => {
                return val.md_approve === null && val.dms_req === 0 && val.gm_approve === 1
            })
            setmdNonClinic(mdNonClinical)

            const edTotal = datas?.filter((val) => {
                return val.ed_approve === null && val.gm_approve === 1
            })
            setEdAll(edTotal)
            const edClinical = datas?.filter((val) => {
                return val.ed_approve === null && val.dms_req === 1 && val.gm_approve === 1
            })
            setedClinic(edClinical)
            const edNonClinical = datas?.filter((val) => {
                return val.ed_approve === null && val.dms_req === 0 && val.gm_approve === 1
            })
            setedNonClinic(edNonClinical)


        }
    }, [crfData])

    const hodViewAll = useCallback(() => {
        setFlag(1)
        setHeading("HOD Pending List")
        setDisData(hodAll)
        settableData(hodAll)
        setAllFlag(1)
    }, [hodAll])

    const HodClinicPendingList = useCallback(() => {
        setFlag(1)
        setHeading("HOD Pending Clinic")
        setDisData(hodClinic)
        settableData(hodClinic)
        setAllFlag(0)
    }, [hodClinic])

    const HodNonClinicPendingList = useCallback(() => {
        setFlag(1)
        setHeading("HOD Pending NonClinic")
        setDisData(hodNonClinic)
        settableData(hodNonClinic)
        setAllFlag(0)
    }, [hodNonClinic])

    const dmsViewAll = useCallback(() => {
        setFlag(1)
        setHeading("DMS Pending List")
        setDisData(dmsClinic)
        settableData(dmsClinic)
        setAllFlag(1)
    }, [dmsClinic])

    const DMSPendingList = useCallback(() => {
        setFlag(1)
        setHeading("DMS Pending Clinic")
        setDisData(dmsClinic)
        settableData(dmsClinic)
        setAllFlag(0)
    }, [dmsClinic])

    const msViewAll = useCallback(() => {
        setFlag(1)
        setHeading("MS Pending List")
        setDisData(msClinic)
        settableData(msClinic)
        setAllFlag(1)
    }, [msClinic])

    const MSPendingList = useCallback(() => {
        setFlag(1)
        setHeading("MS Pending Clinic")
        setDisData(msClinic)
        settableData(msClinic)
        setAllFlag(0)
    }, [msClinic])

    const moViewALl = useCallback(() => {
        setFlag(1)
        setHeading("Documentation List")
        setDisData(moAll)
        settableData(moAll)
        setAllFlag(1)
    }, [moAll])
    const MOClinicPendingList = useCallback(() => {
        setFlag(1)
        setHeading("Documentation Pending Clinic")
        setDisData(moClinic)
        settableData(moClinic)
        setAllFlag(0)
    }, [moClinic])

    const MONonClinicPendingList = useCallback(() => {
        setFlag(1)
        setHeading("Documentation Pending NonClinic")
        setDisData(moNonClinic)
        settableData(moNonClinic)
        setAllFlag(0)
    }, [moNonClinic])

    const smoViewALl = useCallback(() => {
        setFlag(1)
        setHeading("Verification List")
        setDisData(smoAll)
        settableData(smoAll)
        setAllFlag(1)
    }, [smoAll])
    const SMOClinicPendingList = useCallback(() => {
        setFlag(1)
        setHeading("Verification Pending Clinic")
        setDisData(smoClinic)
        settableData(smoClinic)
        setAllFlag(0)
    }, [smoClinic])

    const SMONonClinicPendingList = useCallback(() => {
        setFlag(1)
        setHeading("Verification Pending NonClinic")
        setDisData(smoNonClinic)
        settableData(smoNonClinic)
        setAllFlag(0)
    }, [smoNonClinic])

    const gmViewALl = useCallback(() => {
        setFlag(1)
        setHeading("GM Operation Approval List")
        setDisData(gmAll)
        settableData(gmAll)
        setAllFlag(1)
    }, [gmAll])
    const GMClinicPendingList = useCallback(() => {
        setFlag(1)
        setHeading("GM Operation Pending Clinic")
        setDisData(gmClinic)
        settableData(gmClinic)
        setAllFlag(0)
    }, [gmClinic])

    const GMNonClinicPendingList = useCallback(() => {
        setFlag(1)
        setHeading("GM Pending NonClinic")
        setDisData(gmNonClinic)
        settableData(gmNonClinic)
        setAllFlag(0)
    }, [gmNonClinic])

    const mdViewALl = useCallback(() => {
        setFlag(1)
        setHeading("MD Approval List")
        setDisData(mdAll)
        settableData(mdAll)
        setAllFlag(1)
    }, [mdAll])
    const MDClinicPendingList = useCallback(() => {
        setFlag(1)
        setHeading("MD Pending Clinic")
        setDisData(mdClinic)
        settableData(mdClinic)
        setAllFlag(0)
    }, [mdClinic])

    const MDNonClinicPendingList = useCallback(() => {
        setFlag(1)
        setHeading("MD Pending NonClinic")
        setDisData(mdNonClinic)
        settableData(mdNonClinic)
        setAllFlag(0)
    }, [mdNonClinic])

    const edViewALl = useCallback(() => {
        setFlag(1)
        setHeading("ED  Approval List")
        setDisData(edAll)
        settableData(edAll)
        setAllFlag(1)
    }, [edAll])
    const EDClinicPendingList = useCallback(() => {
        setFlag(1)
        setHeading("ED Pending NonClinic")
        setDisData(edClinic)
        settableData(edClinic)
        setAllFlag(0)
    }, [edClinic])

    const EDNonClinicPendingList = useCallback(() => {
        setFlag(1)
        setHeading("ED Pending NonClinic")
        setDisData(edNonClinic)
        settableData(edNonClinic)
        setAllFlag(0)
    }, [edNonClinic])

    return (
        <Fragment>
            {flag === 1 ?
                <DetailedViewofCRF setFlag={setFlag} disData={disData} allFlag={allFlag}
                    setDisData={setDisData} tableData={tableData} heading={heading} /> :
                (
                    <Box sx={{ flexGrow: 1, height: window.innerHeight - 160, bgcolor: 'white' }}>
                        <Box sx={{ display: 'flex', flex: 1, justifyContent: 'flex-end', pt: 1.3, pr: 5 }}>
                            <Box sx={{ bgcolor: '#b3e5fc', mb: 2, height: 20, width: 20, border: '1px solid lightgrey', borderRadius: '70%' }}></Box>
                            <Box sx={{ pl: 1, fontSize: 13, mb: 2 }}>Clinic</Box>
                            <Box sx={{ ml: 2, mb: 2, bgcolor: '#b2ebf2', height: 20, width: 20, border: '1px solid lightgrey', borderRadius: '50%' }}></Box>
                            <Box sx={{ pl: 1, fontSize: 13, mb: 2 }}>Non-Clinic</Box>
                        </Box>
                        <Paper variant='plain' sx={{ bgcolor: 'white', flexWrap: 'wrap', px: 2 }}>
                            <Grid container spacing={2}>
                                <DashboradGridView
                                    title="HOD"
                                    allCount={hodAll.length}
                                    allDataClick={hodViewAll}
                                    clinicCount={hodClinic.length}
                                    nonClinicCount={hodNonClinic.length}
                                    onClinicClick={HodClinicPendingList}
                                    onNonClinicClick={HodNonClinicPendingList}
                                    imageView={hodimg}
                                    imName="hod"
                                />
                                <DashboradGridView
                                    title="DMS"
                                    allDataClick={dmsViewAll}
                                    allCount={dmsClinic.length}
                                    clinicCount={dmsClinic.length}
                                    nonClinicCount={0}
                                    onClinicClick={DMSPendingList}
                                    onNonClinicClick={null}
                                    imageView={dmsimg}
                                    imName="dms"
                                />
                                <DashboradGridView
                                    title="MS"
                                    allDataClick={msViewAll}
                                    allCount={msClinic.length}
                                    clinicCount={msClinic.length}
                                    nonClinicCount={0}
                                    onClinicClick={MSPendingList}
                                    onNonClinicClick={null}
                                    imageView={msimg}
                                    imName="ms"
                                />
                                <DashboradGridView
                                    title="Documentation"
                                    allDataClick={moViewALl}
                                    allCount={moAll.length}
                                    clinicCount={moClinic.length}
                                    nonClinicCount={moNonClinic.length}
                                    onClinicClick={MOClinicPendingList}
                                    onNonClinicClick={MONonClinicPendingList}
                                    imageView={moimg}
                                    imName="mo"
                                />
                                <DashboradGridView
                                    title="Verification"
                                    allDataClick={smoViewALl}
                                    clinicCount={smoClinic.length}
                                    allCount={smoAll.length}
                                    nonClinicCount={smoNonClinic.length}
                                    onClinicClick={SMOClinicPendingList}
                                    onNonClinicClick={SMONonClinicPendingList}
                                    imageView={smoimg}
                                    imName="smo"
                                />
                                <DashboradGridView
                                    title="GM"
                                    allDataClick={gmViewALl}
                                    allCount={gmAll.length}
                                    clinicCount={gmClinic.length}
                                    nonClinicCount={gmNonClinic.length}
                                    onClinicClick={GMClinicPendingList}
                                    onNonClinicClick={GMNonClinicPendingList}
                                    imageView={gmimg}
                                    imName="gm"
                                />
                                <DashboradGridView
                                    title="MD"
                                    allDataClick={mdViewALl}
                                    allCount={mdAll.length}
                                    clinicCount={mdClinic.length}
                                    nonClinicCount={mdNonClinic.length}
                                    onClinicClick={MDClinicPendingList}
                                    onNonClinicClick={MDNonClinicPendingList}
                                    imageView={mdimg}
                                    imName="md"
                                />
                                <DashboradGridView
                                    title="ED"
                                    allDataClick={edViewALl}
                                    allCount={edAll.length}
                                    clinicCount={edClinic.length}
                                    nonClinicCount={edNonClinic.length}
                                    onClinicClick={EDClinicPendingList}
                                    onNonClinicClick={EDNonClinicPendingList}
                                    imageView={edimg}
                                    imName="ed"
                                />
                            </Grid>
                        </Paper>

                    </Box>
                )}
        </Fragment>
    )
}

export default memo(CRFStatusView)