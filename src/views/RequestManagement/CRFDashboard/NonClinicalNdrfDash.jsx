import { Box, Paper } from '@mui/material'
import React, { useCallback, memo, useState, useEffect } from 'react'
import { taskColor } from 'src/color/Color';
import { Typography } from '@mui/joy'
import DashBoardTable from './DashBoardTable'
import CloseIcon from '@mui/icons-material/Close';
import CusIconButton from 'src/views/Components/CusIconButton';

const NonClinicalNdrfDash = ({ setClinicalCrfFlag, data }) => {


    const [wherePending, setWherePending] = useState(0)
    const [pendingListClinicalData, setPendingClinicalData] = useState([])


    useEffect(() => {

        if (data.length !== 0) {
            const datas = data.map((val) => {
                const obj = {
                    ndrf_mast_slno: val.ndrf_mast_slno,
                    req_slno: val.req_slno,
                    ndrfcreate: val.ndrfcreate,
                    actual_requirement: val.actual_requirement !== null ? val.actual_requirement : "Not Updated",
                    needed: val.needed !== null ? val.needed : "Not Updated",
                    request_dept_slno: val.request_dept_slno,
                    request_deptsec_slno: val.request_deptsec_slno,
                    location: val.location,
                    req_dept: val.reqcreate,
                    crf_ndrf_status: val.crf_ndrf_status,
                    req_deptsec: val.req_deptsec,
                    rm_ndrf: val.rm_ndrf,
                    dept_name: val.req_dept,
                    req_userdeptsec: val.req_userdeptsec,
                    category: val.category,
                    emergency: val.emergency,
                    total_approx_cost: val.total_approx_cost,
                    image_status: val.image_status,
                    remarks: val.remarks,
                    req_date: val.req_date,
                    userdeptsec: val.userdeptsec,
                    expected_date: val.expected_date,
                    req_approv_slno: val.req_approv_slno,
                    req_status: val.req_status,
                    req_user: val.req_user,
                    reqcreate: val.reqcreate,
                    ndrf_om_approv: val.ndrf_om_approv,
                    ndrfOM: val.ndrf_om_approv === 1 ? "Approved" : val.ndrf_om_approv === 2 ? "Reject" :
                        val.ndrf_om_approv === 3 ? "On-Hold" : "Not Updated",
                    ndrf_om_remarks: val.ndrf_om_remarks,
                    ndrfom_approv_date: val.ndrfom_approv_date,
                    ndrf_om_user: val.ndrf_om_user !== null ? val.ndrf_om_user.toLowerCase() : "Not Updated",

                    ndrf_smo_approv: val.ndrf_smo_approv,
                    ndrfSMO: val.ndrf_smo_approv === 1 ? "Approved" : val.ndrf_smo_approv === 2 ? "Reject" :
                        val.ndrf_smo_approv === 3 ? "On-Hold" : "Not Updated",
                    ndrf_smo_remarks: val.ndrf_smo_remarks,
                    ndrf_som_aprrov_date: val.ndrf_som_aprrov_date,
                    ndrf_smo_user: val.ndrf_smo_user !== null ? val.ndrf_smo_user.toLowerCase() : "Not Updated",

                    ndrf_cao_approve: val.ndrf_cao_approve,
                    ndrfCOO: val.ndrf_cao_approve === 1 ? "Approved" : val.ndrf_cao_approve === 2 ? "Reject" :
                        val.ndrf_cao_approve === 3 ? "On-Hold" : "Not Updated",
                    ndrf_cao_approve_remarks: val.ndrf_cao_approve_remarks,
                    ndrf_cao_approv_date: val.ndrf_cao_approv_date,
                    ndrf_cao_user: val.ndrf_cao_user !== null ? val.ndrf_cao_user.toLowerCase() : "Not Updated",

                    ndrf_ed_approve: val.ndrf_ed_approve,
                    ndrfED: val.ndrf_ed_approve === 1 ? "Approved" : val.ndrf_ed_approve === 2 ? "Reject" :
                        val.ndrf_ed_approve === 3 ? "On-Hold" : "Not Updated",
                    ndrf_ed_approve_remarks: val.ndrf_ed_approve_remarks,
                    ndrf_ed_approve_date: val.ndrf_ed_approve_date,
                    ndrf_ed_user: val.ndrf_ed_user !== null ? val.ndrf_ed_user.toLowerCase() : "Not Updated",

                    ndrf_md_approve: val.ndrf_md_approve,
                    ndrfMD: val.ndrf_md_approve === 1 ? "Approved" : val.ndrf_md_approve === 2 ? "Reject" :
                        val.ndrf_md_approve === 3 ? "On-Hold" : "Not Updated",
                    ndrf_md_approve_remarks: val.ndrf_md_approve_remarks,
                    ndrf_md_approve_date: val.ndrf_md_approve_date,
                    ndrf_md_user: val.ndrf_md_user !== null ? val.ndrf_md_user.toLowerCase() : "Not Updated",

                    incharge_approve: val.incharge_approve,
                    incharge_req: val.incharge_req,
                    incharge: val.incharge_approve === 1 ? "Approved" : val.incharge_approve === 2 ? "Reject" :
                        val.incharge_approve === 3 ? "On-Hold" : "Not Updated",
                    incharge_remark: val.incharge_remarks !== null ? val.incharge_remarks : "Not Updated",
                    inch_detial_analysis: val.inch_detial_analysis,
                    incharge_apprv_date: val.incharge_apprv_date,
                    incharge_user: val.incharge_user !== null ? val.incharge_user.toLowerCase() : "Not Updated",

                    hod_req: val.hod_req,
                    hod_approve: val.hod_approve,
                    hod: val.hod_approve === 1 ? "Approved" : val.hod_approve === 2 ? "Reject" :
                        val.hod_approve === 3 ? "On-Hold" : "Not Updated",
                    hod_remarks: val.hod_remarks !== null ? val.hod_remarks : "Not Updated",
                    hod_detial_analysis: val.hod_detial_analysis,
                    hod_approve_date: val.hod_approve_date,
                    hod_user: val.hod_user !== null ? val.hod_user.toLowerCase() : "Not Updated",

                    dms_req: val.dms_req,
                    dms_approve: val.dms_approve,
                    dms: val.dms_approve === 1 ? "Approved" : val.dms_approve === 2 ? "Reject" :
                        val.dms_approve === 3 ? "On-Hold" : "Not Updated",
                    dms_remarks: val.dms_remarks !== null ? val.dms_remarks : "Not Updated",
                    dms_detail_analysis: val.dms_detail_analysis !== null ? val.dms_detail_analysis : "Not Updated",
                    dms_approve_date: val.dms_approve_date,
                    dms_user: val.dms_user !== null ? val.dms_user.toLowerCase() : "Not Updated",


                    ms_approve_req: val.ms_approve_req,
                    ms_approve: val.ms_approve,
                    ms: val.ms_approve === 1 ? "Approved" : val.ms_approve === 2 ? "Reject" :
                        val.ms_approve === 3 ? "On-Hold" : "Not Updated",
                    ms_approve_remark: val.ms_approve_remark !== null ? val.ms_approve_remark : "Not Updated",
                    ms_detail_analysis: val.ms_detail_analysis !== null ? val.ms_detail_analysis : "Not Updated",
                    ms_approve_date: val.ms_approve_date,
                    ms_user: val.ms_user !== null ? val.ms_user.toLowerCase() : "Not Updated",

                    manag_operation_req: val.manag_operation_req,
                    manag_operation_approv: val.manag_operation_approv,
                    om: val.manag_operation_approv === 1 ? "Approved" : val.manag_operation_approv === 2 ? "Reject" :
                        val.manag_operation_approv === 3 ? "On-Hold" : "Not Updated",
                    manag_operation_remarks: val.manag_operation_remarks !== null ? val.manag_operation_remarks : "Not Updated",
                    om_detial_analysis: val.om_detial_analysis !== null ? val.om_detial_analysis : "Not Updated",
                    om_approv_date: val.om_approv_date,
                    manag_operation_user: val.manag_operation_user !== null ? val.manag_operation_user.toLowerCase() : "Not Updated",

                    senior_manage_req: val.senior_manage_req,
                    senior_manage_approv: val.senior_manage_approv,
                    smo: val.senior_manage_approv === 1 ? "Approved" : val.senior_manage_approv === 2 ? "Reject" :
                        val.senior_manage_approv === 3 ? "On-Hold" : "Not Updated",
                    senior_manage_remarks: val.senior_manage_remarks !== null ? val.senior_manage_remarks : "Not Updated",
                    smo_detial_analysis: val.smo_detial_analysis !== null ? val.smo_detial_analysis : "Not Updated",
                    som_aprrov_date: val.som_aprrov_date,
                    senior_manage_user: val.senior_manage_user !== null ? val.senior_manage_user.toLowerCase() : "Not Updated",

                    cao_approve: val.cao_approve,
                    cao: val.cao_approve === 1 ? "Approved" : val.cao_approve === 2 ? "Reject" :
                        val.cao_approve === 3 ? "On-Hold" : "Not Updated",
                    cao_approve_remarks: val.cao_approve_remarks !== null ? val.cao_approve_remarks : "Not Updated",
                    ceo_detial_analysis: val.ceo_detial_analysis !== null ? val.ceo_detial_analysis : "Not Updated",
                    cao_approv_date: val.cao_approv_date,
                    cao_user: val.cao_user !== null ? val.cao_user.toLowerCase() : "Not Updated",

                    md_approve_req: val.md_approve_req,
                    md_approve: val.md_approve,
                    md: val.md_approve === 1 ? "Approved" : val.md_approve === 2 ? "Reject" :
                        val.md_approve === 3 ? "On-Hold" : "Not Updated",
                    md_approve_remarks: val.md_approve_remarks,
                    md_detial_analysis: val.md_detial_analysis,
                    md_approve_date: val.md_approve_date,
                    md_user: val.md_user !== null ? val.md_user.toLowerCase() : "Not Updated",

                    ed_approve_req: val.ed_approve_req,
                    ed_approve: val.ed_approve,
                    ed: val.ed_approve === 1 ? "Approved" : val.ed_approve === 2 ? "Reject" :
                        val.ed_approve === 3 ? "On-Hold" : "Not Updated",
                    ed_approve_remarks: val.ed_approve_remarks !== null ? val.ed_approve_remarks : "Not Updated",
                    ed_detial_analysis: val.ed_detial_analysis,
                    ed_approve_date: val.ed_approve_date,
                    ed_user: val.ed_user !== null ? val.ed_user.toLowerCase() : "Not Updated",

                    crf_close: val.crf_close !== null ? val.crf_close : "Not Updated",
                    crf_close_remark: val.crf_close_remark !== null ? val.crf_close_remark : "Not Updated",
                    crf_closed_one: val.crf_closed_one !== null ? val.crf_closed_one : "Not Updated",
                    close_user: val.close_user !== null ? val.close_user.toLowerCase() : "Not Updated",
                    close_date: val.close_date !== null ? val.close_date : "Not Updated",

                    ndrf_purchase: val.ndrf_purchase,
                    ndrf_purchase_acknolwdge: val.ndrf_purchase_acknolwdge,
                    purchase_date: val.purchase_date,
                    expected_purchase_date: val.expected_purchase_date,
                    purchase_user: val.purchase_user ? val.purchase_user.toLowerCase() : "Not Updated",
                    ndrf_po_close: val.ndrf_po_close,
                    ndrf_po_close_remarks: val.ndrf_po_close_remarks,
                    ndrf_po_close_user: val.ndrf_po_close_user ? val.ndrf_po_close_user.toLowerCase() : "Not Updated",
                    ndrf_po_close_date: val.ndrf_po_close_date,
                    ndrf_po_add: val.ndrf_po_add
                }
                return obj
            })
            setPendingClinicalData(datas)
        }
    }, [data])

    const NdrfPendingClinicalOperations = useCallback(() => {
        setWherePending(1)
    }, [])

    const NdrfPendingClinicalEDMD = useCallback(() => {
        setWherePending(2)
    }, [])

    const NdrfPendingClinicalPurchaseAck = useCallback(() => {
        setWherePending(3)
    }, [])

    const NdrfPendingClinicalPO = useCallback(() => {
        setWherePending(4)
    }, [])

    const operationPending = pendingListClinicalData && pendingListClinicalData.filter((val) => val.incharge_approve === null)

    const EDMDPending = pendingListClinicalData && pendingListClinicalData.filter((val) => val.hod_approve === null)

    const PurchaseAckPending = pendingListClinicalData && pendingListClinicalData.filter((val) => val.manag_operation_approv === null || val.senior_manage_approv === null || val.cao_approve === null)

    const POPending = pendingListClinicalData && pendingListClinicalData.filter((val) => val.ed_approve_req === 1 && (val.ed_approve === null || val.md_approve))


    const close = useCallback(() => {
        setClinicalCrfFlag(0)
    }, [setClinicalCrfFlag])



    return (
        < Box
            sx={{
                display: 'flex',
                minHeight: window.innerHeight - 85,
                borderRadius: 2,
                overflow: 'hidden',
                flexDirection: 'column',
                border: 1,
                borderWidth: 1.5,
                borderColor: taskColor.bgIndigo,
            }
            } >
            <Box
                sx={{
                    display: 'flex',
                    flex: 1,
                    flexDirection: 'row',
                    backgroundColor: '#ffffff',
                    maxHeight: 40,
                    alignItems: 'center',
                    borderBottom: 1,
                    borderColor: '#b5b3ca',
                    pl: 2
                }}
            >

                <Box sx={{ pl: 1, color: '#262065', display: 'flex', pt: 0.3 }} >Clical NDRF Dashboard</Box>

                <Box sx={{ pl: 173 }}>
                    <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={close}>
                        <CloseIcon fontSize='small' />
                    </CusIconButton>
                </Box>


            </Box>

            <Paper variant='none' sx={{
                mt: 1, width: "70%", ml: 30
                // alignItems: "center",
                // justifyItems: "center",
                // backgroundColor: "green"

            }} >

                <Box sx={{
                    display: 'flex',
                    flex: 1,
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    padding: 1,
                    //backgroundColor: '#ffffff',
                    overflow: 'hidden',
                }} >
                    <Paper sx={{
                        width: '1%',

                    }}
                        variant='none'></Paper>
                    <Paper
                        sx={{
                            width: '23%', pl: 0.5,
                            height: 160,
                            backgroundColor: taskColor.bgIndigo,
                            border: 1,
                            padding: 2,
                            borderColor: taskColor.indigoDark,
                            cursor: 'grab',
                            ":hover": {
                                borderColor: '#7D18EA'
                            }
                        }}
                        variant='outlined'
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                height: '30%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                fontWeight: 600,
                                fontSize: 16,
                                fontSmooth: 'auto',
                                color: taskColor.FontindigoDark
                            }}
                        >Operations Pending</Box>
                        <Box
                            sx={{
                                display: 'flex',
                                height: '50%',
                                fontSize: 48,
                                fontWeight: 500,
                                justifyContent: 'center',
                                alignItems: 'center',
                                color: taskColor.FontindigoDark,
                            }}
                        >
                            <Typography
                                sx={{
                                    cursor: 'pointer',
                                    ":hover": {
                                        transition: 300,
                                        textShadow: '#939498 1px 0 5px'
                                    }
                                }}
                                onClick={() => NdrfPendingClinicalOperations()}
                            >{operationPending.length}</Typography>
                        </Box>

                    </Paper>

                    <Paper sx={{
                        width: '1%',

                    }}
                        variant='none'></Paper>
                    <Paper
                        sx={{
                            width: '23%',
                            height: 160, pl: 1,
                            backgroundColor: taskColor.bgIndigo,
                            border: 1,
                            padding: 2,
                            borderColor: taskColor.indigoDark,
                            cursor: 'grab',
                            ":hover": {
                                borderColor: '#7D18EA'
                            }
                        }}
                        variant='outlined'
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                height: '30%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                fontWeight: 600,
                                fontSize: 16,
                                fontSmooth: 'auto',
                                color: taskColor.FontindigoDark
                            }}
                        >ED/MD Pending</Box>
                        <Box
                            sx={{
                                display: 'flex',
                                height: '50%',
                                fontSize: 48,
                                fontWeight: 500,
                                justifyContent: 'center',
                                alignItems: 'center',
                                color: taskColor.FontindigoDark,
                            }}
                        >
                            <Typography
                                sx={{
                                    cursor: 'pointer',
                                    ":hover": {
                                        transition: 300,
                                        textShadow: '#939498 1px 0 5px'
                                    }
                                }}
                                onClick={() => NdrfPendingClinicalEDMD()}
                            >{EDMDPending.length}</Typography>
                        </Box>

                    </Paper>
                    <Paper sx={{
                        width: '1%',

                    }}
                        variant='none'></Paper>
                    <Paper
                        sx={{
                            width: '23%',
                            height: 160,
                            backgroundColor: taskColor.bgIndigo,
                            border: 1,
                            padding: 2,
                            borderColor: taskColor.indigoDark,
                            cursor: 'grab',
                            ":hover": {
                                borderColor: '#7D18EA'
                            }
                        }}
                        variant='outlined'
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                height: '30%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                fontWeight: 600,
                                fontSize: 16,
                                fontSmooth: 'auto',
                                color: taskColor.FontindigoDark
                            }}
                        >Purchase Acknowlegement Pending</Box>
                        <Box
                            sx={{
                                display: 'flex',
                                height: '50%',
                                fontSize: 48,
                                fontWeight: 500,
                                justifyContent: 'center',
                                alignItems: 'center',
                                color: taskColor.FontindigoDark,
                            }}
                        >
                            <Typography
                                sx={{
                                    cursor: 'pointer',
                                    ":hover": {
                                        transition: 300,
                                        textShadow: '#939498 1px 0 5px'
                                    }
                                }}
                                onClick={() => NdrfPendingClinicalPurchaseAck()}
                            >{PurchaseAckPending.length}</Typography>
                        </Box>

                    </Paper>
                    <Paper sx={{
                        width: '1%',

                    }}
                        variant='none'></Paper>
                    <Paper
                        sx={{
                            width: '23%',
                            height: 160,
                            backgroundColor: taskColor.bgIndigo,
                            border: 1,
                            padding: 2,
                            borderColor: taskColor.indigoDark,
                            cursor: 'grab',
                            ":hover": {
                                borderColor: '#7D18EA'
                            }
                        }}
                        variant='outlined'
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                height: '30%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                fontWeight: 600,
                                fontSize: 16,
                                fontSmooth: 'auto',
                                color: taskColor.FontindigoDark
                            }}
                        >PO Pending</Box>
                        <Box
                            sx={{
                                display: 'flex',
                                height: '50%',
                                fontSize: 48,
                                fontWeight: 500,
                                justifyContent: 'center',
                                alignItems: 'center',
                                color: taskColor.FontindigoDark,
                            }}
                        >
                            <Typography
                                sx={{
                                    cursor: 'pointer',
                                    ":hover": {
                                        transition: 300,
                                        textShadow: '#939498 1px 0 5px'
                                    }
                                }}
                                onClick={() => NdrfPendingClinicalPO()}
                            >{POPending.length}</Typography>
                        </Box>

                    </Paper>
                </Box>


            </Paper>

            {wherePending === 1 ?
                <Box>
                    <DashBoardTable wherePending={wherePending} tabledata={operationPending} />
                </Box>
                : wherePending === 2 ?
                    <Box>
                        <DashBoardTable wherePending={wherePending} tabledata={EDMDPending} />
                    </Box> : wherePending === 3 ?
                        <Box>
                            <DashBoardTable wherePending={wherePending} tabledata={PurchaseAckPending} />
                        </Box> : wherePending === 4 ?
                            <Box>
                                <DashBoardTable wherePending={wherePending} tabledata={POPending} />
                            </Box> : null

            }

        </Box >
    )
}

export default memo(NonClinicalNdrfDash)