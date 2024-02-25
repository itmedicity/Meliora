import { Box, Paper } from '@mui/material'
import React, { useCallback, memo, useState, Fragment, useEffect } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { useSelector } from 'react-redux'
import _ from 'underscore'
import { warningNotify } from 'src/views/Common/CommonCode'
import { useHistory } from 'react-router-dom'
import MasterDetailCompnt from '../ComonComponent/MasterDetailCompnt'
import CloseIcon from '@mui/icons-material/Close';
import CusIconButton from 'src/views/Components/CusIconButton'
import ApprovalDetailComp from '../ComonComponent/ApprovalDetailComp'
import ApproveButtonsCompnt from '../ComonComponent/ApproveButtonsCompnt'
import CrfSMOClose from './CrfSMOClose'
import CrfSMOApprovalModal from './CrfSMOApprovalModal'
import HigherAppDoneModal from '../ComonComponent/HigherAppDoneModal'
import { CssVarsProvider, Typography } from '@mui/joy'
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';

const CrfSMOApproval = () => {

    /*** Initializing */
    const history = useHistory();
    //redux for geting login id
    //  const id = useSelector((state) => state.LoginUserData.empid, _.isEqual)
    const deptsec = useSelector((state) => state.LoginUserData.empsecid, _.isEqual)
    const [disData, setDisData] = useState([])
    const [count, setCount] = useState(0)
    useEffect(() => {

        const getReqDeptsecList = async () => {
            const result = await axioslogin.get(`/newCRFRegister/getAllReqBasedDept/${deptsec}`)
            const { success, data } = result.data
            if (success === 1) {
                const incharge = data.filter((val) => {
                    return val.dms_req === 1 && val.crf_close !== 1 && val.incharge_approve === 1
                })
                const datas = incharge.map((val) => {
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
                        inch_detial_analysis: val.inch_detial_analysis !== null ? val.inch_detial_analysis : '',
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
                        senior_manage_remarks: val.senior_manage_remarks,
                        som_aprrov_date: val.som_aprrov_date,
                        senior_manage_user: val.senior_manage_user !== null ? val.senior_manage_user.toLowerCase() : '',
                        smo_detial_analysis: val.smo_detial_analysis,

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
                        higher: val.gm_approve !== null ? 1 : 0

                    }
                    return obj
                })
                setDisData(datas)
            } else {
                warningNotify("Error occured contact EDP")
            }
        }
        getReqDeptsecList(deptsec);
    }, [deptsec, count])

    const [ApprovalFlag, setApprovalFlag] = useState(0)
    const [ApprovalModal, setApprovalModal] = useState(false)
    const [ApprovalData, setApprovalData] = useState([])

    const [cancelFlag, setCancelFlag] = useState(0)
    const [cancelModal, setCancelModal] = useState(false)
    const [cancelData, setCancelData] = useState([])

    const [DetailViewFlag, setDetailViewFlag] = useState(0)
    const [DetailViewModal, setDetailViewModal] = useState(false)
    const [DetailViewData, setDetailViewData] = useState([])


    //close button function
    const backtoSetting = useCallback(() => {
        history.push('/Home')
    }, [history])




    return (
        <Fragment>
            {DetailViewFlag === 1 ? <HigherAppDoneModal
                open={DetailViewModal} setDetailViewModal={setDetailViewModal}
                DetailViewData={DetailViewData} setDetailViewData={setDetailViewData}
                setDetailViewFlag={setDetailViewFlag}
            /> : null}
            {cancelFlag === 1 ? <CrfSMOClose open={cancelModal} setCancelData={setCancelData}
                setCancelFlag={setCancelFlag} setCancelModal={setCancelModal}
                count={count} setCount={setCount} cancelData={cancelData} /> : null}

            {ApprovalFlag === 1 ? <CrfSMOApprovalModal open={ApprovalModal} ApprovalData={ApprovalData}
                setApprovalModal={setApprovalModal} setApprovalFlag={setApprovalFlag}
                count={count} setCount={setCount} setApprovalData={setApprovalData} /> : null}

            <Box sx={{ height: 35, backgroundColor: "#f0f3f5", display: 'flex' }}>
                <Box sx={{ fontWeight: 550, flex: 1, pl: 1, pt: .5, color: '#385E72', }}>CRF Verification Approval</Box>
                <Box>
                    <CusIconButton size="sm" variant="outlined" color="primary" onClick={backtoSetting} >
                        <CloseIcon fontSize='small' />
                    </CusIconButton>
                </Box>
            </Box>
            <Box sx={{ height: window.innerHeight - 150, overflow: 'auto', }}>

                {disData && disData.map((val) => {
                    return <Box key={val.req_slno} sx={{ width: "100%", }}>
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
                            <ApprovalDetailComp val={val} />
                            {
                                val.crf_close === 1 ?

                                    <Box sx={{
                                        width: "100%",
                                        display: "flex",
                                        pl: 1, pt: 1,
                                        flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                    }}>
                                        <CssVarsProvider>
                                            <Box sx={{ pr: 1, width: "20%", display: 'flex' }}>
                                                <Typography level="title-sm" sx={{ color: 'white' }}
                                                    endDecorator={<KeyboardArrowRightOutlinedIcon sx={{ color: 'white' }} />} >Request Closed By</Typography>
                                                <Typography level='body-sm' textColor='#3E3F40' fontWeight={500} sx={{ pt: 0.5 }} >{val.crf_closed_one}</Typography>
                                            </Box>
                                        </CssVarsProvider>
                                    </Box>
                                    : null
                            }
                            <ApproveButtonsCompnt val={val} setApprovalFlag={setApprovalFlag}
                                setApprovalModal={setApprovalModal} setCancelFlag={setCancelFlag}
                                setCancelModal={setCancelModal} setApprovalData={setApprovalData}
                                setCancelData={setCancelData} setDetailViewFlag={setDetailViewFlag}
                                setDetailViewData={setDetailViewData} setDetailViewModal={setDetailViewModal} />
                        </Paper>
                    </Box>
                })}
            </Box>
        </Fragment>
    )
}

export default memo(CrfSMOApproval)