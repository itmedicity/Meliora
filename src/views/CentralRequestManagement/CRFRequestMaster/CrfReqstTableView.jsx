import { Box, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import React, { memo, useCallback, useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import NotReceivedTable from './Components/NotReceivedTable'
import ReceivedTable from './Components/ReceivedTable'
import ItemReceivedInStoreTable from './Components/ItemReceivedInStoreTable'


const CrfReqstTableView = ({ count, rowSelect, setCount }) => {
    const empsecid = useSelector((state) => {
        return state.LoginUserData.empsecid
    })
    const [disData, setDisData] = useState([])
    const [receivedData, setReceivedData] = useState([])
    const [radiovalue, setRadioValue] = useState('1')
    const [storeData, setStoreData] = useState([])
    useEffect(() => {
        const getReqDeptsecList = async (empsecid) => {
            const result = await axioslogin.get(`/newCRFRegister/getAllReqBasedDeptreq/${empsecid}`)
            const { success, data } = result.data
            if (success === 1) {
                const datas = data.map((val) => {
                    const obj = {
                        req_slno: val.req_slno,
                        actual_requirement: val.actual_requirement,
                        needed: val.needed,
                        request_dept_slno: val.request_dept_slno,
                        request_deptsec_slno: val.request_deptsec_slno,
                        category: val.category,
                        location: val.location,
                        emergency_flag: val.emergency_flag,
                        emer_slno: val.emer_slno,
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
                            val.incharge_approve === 3 ? "On-Hold" : "Not Updated",
                        incharge_remark: val.incharge_remarks !== null ? val.incharge_remarks : "Not Updated",
                        hod_approve: val.hod_approve,
                        hod: val.hod_approve === 1 ? "Approved" : val.hod_approve === 2 ? "Reject" :
                            val.hod_approve === 3 ? "On-Hold" : "Not Updated",
                        hod_remarks: val.hod_remarks !== null ? val.hod_remarks : "Not Updated",
                        dms_approve: val.dms_approve,
                        dms: val.dms_approve === 1 ? "Approved" : val.dms_approve === 2 ? "Reject" :
                            val.dms_approve === 3 ? "On-Hold" : "Not Updated",
                        dms_remarks: val.dms_remarks !== null ? val.dms_remarks : "Not Updated",
                        ms_approve: val.ms_approve,
                        ms: val.ms_approve === 1 ? "Approved" : val.ms_approve === 2 ? "Reject" :
                            val.ms_approve === 3 ? "On-Hold" : "Not Updated",
                        ms_approve_remark: val.ms_approve_remark !== null ? val.ms_approve_remark : "Not Updated",
                        manag_operation_approv: val.manag_operation_approv,
                        om: val.manag_operation_approv === 1 ? "Approved" : val.manag_operation_approv === 2 ? "Reject" :
                            val.manag_operation_approv === 3 ? "On-Hold" : "Not Updated",
                        manag_operation_remarks: val.manag_operation_remarks !== null ? val.manag_operation_remarks : "Not Updated",
                        senior_manage_approv: val.senior_manage_approv,
                        smo: val.senior_manage_approv === 1 ? "Approved" : val.senior_manage_approv === 2 ? "Reject" :
                            val.senior_manage_approv === 3 ? "On-Hold" : "Not Updated",
                        senior_manage_remarks: val.senior_manage_remarks !== null ? val.senior_manage_remarks : "Not Updated",
                        gm_approve: val.gm_approve,
                        gm: val.gm_approve === 1 ? "Approved" : val.gm_approve === 2 ? "Reject" :
                            val.gm_approve === 3 ? "On-Hold" : "Not Updated",
                        gm_approve_remarks: val.gm_approve_remarks !== null ? val.gm_approve_remarks : "Not Updated",

                        md_approve: val.md_approve,
                        md: val.md_approve === 1 ? "Approved" : val.md_approve === 2 ? "Reject" :
                            val.md_approve === 3 ? "On-Hold" : "Not Updated",
                        md_approve_remarks: val.md_approve_remarks !== null ? val.md_approve_remarks : "Not Updated",

                        ed_approve: val.ed_approve,
                        ed: val.ed_approve === 1 ? "Approved" : val.ed_approve === 2 ? "Reject" :
                            val.ed_approve === 3 ? "On-Hold" : "Not Updated",
                        ed_approve_remarks: val.ed_approve_remarks !== null ? val.ed_approve_remarks : "Not Updated",
                        req_status: val.req_status,
                        incharge_apprv_date: val.incharge_apprv_date,
                        incharge_user: val.incharge_user,
                        hod_approve_date: val.hod_approve_date,
                        hod_user: val.hod_user,
                        dms_approve_date: val.dms_approve_date,
                        dms_user: val.dms_user,
                        ms_approve_date: val.ms_approve_date,
                        ms_approve_user: val.ms_approve_user,
                        om_approv_date: val.om_approv_date,
                        manag_operation_user: val.manag_operation_user,
                        som_aprrov_date: val.som_aprrov_date,
                        senior_manage_user: val.senior_manage_user,
                        gm_approv_date: val.gm_approv_date,
                        gm_user: val.gm_user,
                        ed_approve_date: val.ed_approve_date,
                        ed_user: val.ed_user,
                        md_approve_date: val.md_approve_date,
                        md_user: val.md_user,

                        sub_store_recieve: val.sub_store_recieve,
                        user_acknldge: val.user_acknldge,
                        store_recieve: val.store_recieve,
                        store_recieve_fully: val.store_recieve_fully,
                        po_to_supplier: val.po_to_supplier,
                        substore_slno: val.substore_slno,
                        sub_store_name: val.sub_store_name,
                        substore_remarks: val.substore_remarks === null ? 'nil' : val.substore_remarks,
                        acknowUser: val.acknowUser,
                        user_ack_date: val.user_ack_date,
                        user_acknldge_remarks: val.user_acknldge_remarks === null ? 'nil' : val.user_acknldge_remarks,
                        now_who: val.req_status === 'C' ? "CRF Closed" :
                            val.sub_store_recieve === 1 ? "Store Receive" :
                                val.store_recieve === 0 ? "CRS Store Receive" :
                                    val.store_recieve === 1 ? "Transfer To Store" :
                                        val.po_to_supplier === 1 ? "CRF Acknowledged" :
                                            val.po_complete === 1 ? "PO Completed" :
                                                val.po_prepartion === 1 ? "PO Prepairing" :
                                                    val.quatation_fixing === 1 ? "Quatation Fixed" :
                                                        val.quatation_negotiation === 1 ? "Quatation Negotiation" :
                                                            val.quatation_calling_status === 1 ? "Quatation Calling" :
                                                                val.ack_status === 1 ? "Puchase Acknowledged" :
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
                            val.sub_store_recieve === 1 ? '' :
                                val.store_receive === 1 ? '' :
                                    val.po_to_supplier === 1 ? '' :
                                        val.po_complete === 1 ? '' :
                                            val.po_prepartion === 1 ? '' :
                                                val.quatation_fixing === 1 ? '' :
                                                    val.quatation_negotiation === 1 ? '' :
                                                        val.quatation_calling_status === 1 ? '' :
                                                            val.ack_status === 1 ? '' :
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
                }).sort((a, b) => {
                    if (a.sub_store_recieve !== b.sub_store_recieve) {
                        return b.sub_store_recieve - a.sub_store_recieve;
                    }
                    return b.req_slno - a.req_slno;
                });
                const NotuserAcklist = datas?.filter((val) => val.user_acknldge === null)
                setDisData(NotuserAcklist)
                const userAcklist = datas?.filter((val) => val.user_acknldge === 1)
                setReceivedData(userAcklist)
                const store = datas?.filter((val) => val.sub_store_recieve === 1 && val.user_acknldge === null)
                setStoreData(store)
            } else {
                warningNotify("No CRF registred")
            }
        }
        getReqDeptsecList(empsecid);
    }, [empsecid, count])
    const updateRadioClick = useCallback(async (e) => {
        e.preventDefault()
        setRadioValue(e.target.value)

    }, [])

    return (
        <Box>
            <Box sx={{ display: 'flex' }}>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={radiovalue}
                    onChange={(e) => updateRadioClick(e)}
                >
                    <FormControlLabel value='1' sx={{ pl: 3, }} control={
                        <Radio
                            sx={{
                                color: '#ef6c00',
                                '&.Mui-checked': {
                                    color: '#ef6c00',
                                },
                            }}
                        />} label="Not Received" />
                    <FormControlLabel value='2' sx={{ pl: 3, }} control={
                        <Radio
                            sx={{
                                color: '#0d47a1',
                                '&.Mui-checked': {
                                    color: '#0d47a1',
                                },
                            }}
                        />} label="Received" />
                    <FormControlLabel value='3' sx={{ pl: 3, }} control={
                        <Radio
                            sx={{
                                color: '#33691e',
                                '&.Mui-checked': {
                                    color: '#33691e',
                                },
                            }}
                        />} label="Received In Store" />
                </RadioGroup>
                {
                    (radiovalue === '1' || radiovalue === '3') ?
                        <Box sx={{ display: 'flex', flex: 1, m: 1, justifyContent: 'flex-end', pr: 2 }}>
                            <Box sx={{ bgcolor: '#e0f2f1', height: 20, width: 20, border: '1px solid lightgrey', borderRadius: 20 }}></Box>
                            <Box sx={{ pr: 2, fontSize: 13, pl: 1, pt: 0.2 }}>Received in CRS</Box>
                            <Box sx={{ bgcolor: '#c8e6c9', height: 20, width: 20, border: '1px solid lightgrey', borderRadius: 20 }}></Box>
                            <Box sx={{ pl: 1, fontSize: 13, pt: 0.2 }}>Received in Store</Box>
                        </Box>
                        : null
                }
            </Box>
            <Box>
                {
                    radiovalue === '2' ? <ReceivedTable receivedData={receivedData} />
                        : radiovalue === '1' ? <NotReceivedTable disData={disData} rowSelect={rowSelect} count={count} setCount={setCount} />
                            : <ItemReceivedInStoreTable storeData={storeData} count={count} setCount={setCount} />}
            </Box>
        </Box >
    )
}

export default memo(CrfReqstTableView)