import React from 'react'
import { useState, useCallback, useEffect, memo, Fragment } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { axioslogin } from 'src/views/Axios/Axios'
import { Box, Paper } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import MasterDetailCompnt from '../ComonComponent/MasterDetailCompnt'
import { warningNotify } from 'src/views/Common/CommonCode'
import CusIconButton from 'src/views/Components/CusIconButton'
import PurchaseApprovalButton from './PurchaseApprovalButton'
import PurchaseModal from './PurchaseModal'


const PurchaseTablemain = () => {

    /*** Initializing */
    const history = useHistory();
    const [disData, setDisData] = useState([])

    const [count, setCount] = useState(0)
    useEffect(() => {

        const getReqForDownload = async () => {
            const result = await axioslogin.get('/newCRFPurchase/getAllApprovedForPurchase')
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
                        ed_approve_remarks: val.ed_approve_remarks !== null ? val.ed_approve_remarks : "Not Updated",
                        ed_approve_date: val.ed_approve_date,
                        ed_user: val.ed_user ? val.ed_user.toLowerCase() : '',
                        ed_detial_analysis: val.ed_detial_analysis,

                        crm_purchase_slno: val.crm_purchase_slno,
                        ack_status: val.ack_status,
                        ack_remarks: val.ack_remarks,
                        purchase_ackuser: val.purchase_ackuser !== null ? val.purchase_ackuser.toLowerCase() : '',
                        ack_date: val.ack_date,
                        quatation_calling_status: val.quatation_calling_status,
                        quatation_calling_date: val.quatation_calling_date,
                        quatation_user: val.quatation_user !== null ? val.quatation_user.toLowerCase() : '',

                        quatation_negotiation: val.quatation_negotiation,
                        quatation_negotiation_date: val.quatation_negotiation_date,
                        quatation_neguser: val.quatation_neguser !== null ? val.quatation_neguser.toLowerCase() : '',

                        quatation_fixing: val.quatation_fixing,
                        quatation_fixing_date: val.quatation_fixing_date,
                        quatation_fixuser: val.quatation_fixuser !== null ? val.quatation_fixuser.toLowerCase() : '',
                        po_prepartion: val.po_prepartion,
                        po_complete: val.po_complete,

                        po_approva_level_one: val.po_approva_level_one,
                        po_approva_level_two: val.po_approva_level_two,
                        po_to_supplier: val.po_to_supplier

                    }
                    return obj
                })
                setDisData(datas)
            } else {
                warningNotify("Error occured contact EDP")
            }
        }
        getReqForDownload();
    }, [count])

    const [puchaseFlag, setpuchaseFlag] = useState(0)
    const [puchaseModal, setpuchaseModal] = useState(false)
    const [puchaseData, setpuchaseData] = useState([])


    //close button function
    const backtoSetting = useCallback(() => {
        history.push('/Home')
    }, [history])



    return (
        <Fragment>
            {
                puchaseFlag === 1 ? <PurchaseModal open={puchaseModal}
                    setpuchaseFlag={setpuchaseFlag} setpuchaseModal={setpuchaseModal}
                    puchaseData={puchaseData} setpuchaseData={setpuchaseData}
                    count={count} setCount={setCount} /> : null
            }


            <Box sx={{ height: 35, backgroundColor: "#f0f3f5", display: 'flex' }}>
                <Box sx={{ fontWeight: 550, flex: 1, pl: 1, pt: .5, color: '#385E72', }}>CRF Purchase</Box>
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

                            <PurchaseApprovalButton val={val}
                                setpuchaseFlag={setpuchaseFlag} setpuchaseModal={setpuchaseModal}
                                setpuchaseData={setpuchaseData} />

                        </Paper>
                    </Box>
                })}
            </Box>


        </Fragment >
    )
}

export default memo(PurchaseTablemain)