
import { Box, Divider, FormControl, Radio, RadioGroup } from '@mui/joy'
import { keyframes, Paper } from '@mui/material'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import ReceivedTable from '../Components/ReceivedTable'
import NotReceivedTable from '../Components/NotReceivedTable'
import ItemReceivedInStoreTable from '../Components/ItemReceivedInStoreTable'
import { useSelector } from 'react-redux'
import { useQuery } from 'react-query'
import { getCrfRegDetailByDepSec, getDefaultCompany } from 'src/api/CommonApiCRF'
import GppGoodTwoToneIcon from '@mui/icons-material/GppGoodTwoTone';

const CrfReqstTableView = ({ rowSelect }) => {

    const blinkAnimation = keyframes`0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; }`;

    const [disData, setDisData] = useState([])
    const [receivedData, setReceivedData] = useState([])
    const [radiovalue, setRadioValue] = useState('1')
    const [storeData, setStoreData] = useState([])


    const empsecid = useSelector((state) => {
        return state.LoginUserData.empsecid
    })
    // queryClient.invalidateQueries('getPendingAll')
    const { data: crfDetails, isLoading: isCrfDetailsLoading, error: crfDetailsError } = useQuery({
        queryKey: ['crfDetailsView', empsecid,],
        queryFn: () => getCrfRegDetailByDepSec(empsecid),
        enabled: empsecid !== null,
    });


    const { data: companyData, isLoading: isCompLoading, error: compError } = useQuery({
        queryKey: 'getdefaultCompany',
        queryFn: () => getDefaultCompany(),
        staleTime: Infinity
    });
    const company = useMemo(() => companyData, [companyData]);

    useEffect(() => {
        if (crfDetails && crfDetails.length > 0) {
            // const datas = crfDetails?.map((val) => {
            //     return {

            //     }
            // })
            const datas = crfDetails
                .filter((val, index, self) =>
                    index === self.findIndex((value) => value.req_slno === val.req_slno))
                .map((val) => ({
                    req_status: val.req_status,
                    req_slno: val.req_slno,
                    actual_requirement: val.actual_requirement !== null ? val.actual_requirement : 'Nil',
                    needed: val.needed !== null ? val.needed : 'Nil',
                    request_deptsec_slno: val.request_deptsec_slno,
                    req_deptsec: val.req_deptsec.toLowerCase(),
                    user_deptsection: val.user_deptsection.toLowerCase(),
                    user_deptsec: val.user_deptsec,
                    em_name: val.create_user.toLowerCase(),
                    category: val.category,
                    category_name: val.category_name,
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
                    internally_arranged_status: val.internally_arranged_status,
                    crf_close: val.crf_close,
                    crf_close_remark: val.crf_close_remark,
                    crf_closed_one: val.crf_closed_one,
                    close_date: val.close_date,
                    closed_user: val.closed_user !== null ? val.closed_user.toLowerCase() : '',
                    incharge_approve: val.incharge_approve,
                    incharge_req: val.incharge_req,
                    incharge: val.incharge_approve === 1 ? "Approved" : val.incharge_approve === 2 ? "Rejected" :
                        val.incharge_approve === 3 ? "On-Hold" : "Not Done",
                    incharge_remarks: val.incharge_remarks !== null ? val.incharge_remarks : "Not Updated",
                    inch_detial_analysis: val.inch_detial_analysis,
                    incharge_apprv_date: val.incharge_apprv_date,
                    incharge_user: val.incharge_user !== null ? val.incharge_user.toLowerCase() : '',
                    hod_req: val.hod_req,
                    hod_approve: val.hod_approve,
                    hod: val.hod_approve === 1 ? "Approved" : val.hod_approve === 2 ? "Rejected" :
                        val.hod_approve === 3 ? "On-Hold" : "Not Done",
                    hod_remarks: val.hod_remarks !== null ? val.hod_remarks : "Not Updated",
                    hod_detial_analysis: val.hod_detial_analysis,
                    hod_approve_date: val.hod_approve_date,
                    hod_user: val.hod_user !== null ? val.hod_user.toLowerCase() : '',
                    dms_req: val.dms_req,
                    dms_approve: val.dms_approve,
                    dms: val.dms_approve === 1 ? "Approved" : val.dms_approve === 2 ? "Rejected" :
                        val.dms_approve === 3 ? "On-Hold" : val.dms_approve === 4 ? "Approved" : "Not Done",
                    dms_remarks: val.dms_remarks !== null ? val.dms_remarks : "Not Updated",
                    dms_detail_analysis: val.dms_detail_analysis,
                    dms_approve_date: val.dms_approve_date,
                    dms_user: val.dms_user !== null ? val.dms_user.toLowerCase() : '',
                    ms_approve_req: val.ms_approve_req,
                    ms_approve: val.ms_approve,
                    ms: val.ms_approve === 1 ? "Approved" : val.ms_approve === 2 ? "Rejected" :
                        val.ms_approve === 3 ? "On-Hold" : val.ms_approve === 4 ? "Approved" : "Not Done",
                    ms_approve_remark: val.ms_approve_remark !== null ? val.ms_approve_remark : "Not Updated",
                    ms_detail_analysis: val.ms_detail_analysis,
                    ms_approve_date: val.ms_approve_date,
                    ms_approve_user: val.ms_approve_user !== null ? val.ms_approve_user.toLowerCase() : '',
                    manag_operation_req: val.manag_operation_req,
                    manag_operation_approv: val.manag_operation_approv,
                    om: val.manag_operation_approv === 1 ? "Approved" : val.manag_operation_approv === 2 ? "Rejected" :
                        val.manag_operation_approv === 3 ? "On-Hold" : val.manag_operation_approv === 4 ? "Approved"
                            : "Not Done",
                    manag_operation_remarks: val.manag_operation_remarks !== null ? val.manag_operation_remarks : "Not Updated",
                    om_detial_analysis: val.om_detial_analysis,
                    om_approv_date: val.om_approv_date,
                    manag_operation_user: val.manag_operation_user !== null ? val.manag_operation_user.toLowerCase() : '',
                    senior_manage_req: val.senior_manage_req,
                    senior_manage_approv: val.senior_manage_approv,
                    smo: val.senior_manage_approv === 1 ? "Approved" : val.senior_manage_approv === 2 ? "Rejected" :
                        val.senior_manage_approv === 3 ? "On-Hold" : val.senior_manage_approv === 4 ? "Approved" : "Not Done",
                    senior_manage_remarks: val.senior_manage_remarks !== null ? val.senior_manage_remarks : "Not Updated",
                    smo_detial_analysis: val.smo_detial_analysis,
                    som_aprrov_date: val.som_aprrov_date,
                    senior_manage_user: val.senior_manage_user !== null ? val.senior_manage_user.toLowerCase() : '',
                    gm_approve_req: val.gm_approve_req,
                    gm_approve: val.gm_approve,
                    gm: val.gm_approve === 1 ? "Approved" : val.gm_approve === 2 ? "Rejected" :
                        val.gm_approve === 3 ? "On-Hold" : val.gm_approve === 4 ? "Approved" : "Not Done",
                    gm_approve_remarks: val.gm_approve_remarks !== null ? val.gm_approve_remarks : "Not Updated",
                    gm_detial_analysis: val.gm_detial_analysis,
                    gm_approv_date: val.gm_approv_date,
                    gm_user: val.gm_user !== null ? val.gm_user.toLowerCase() : '',
                    md_approve_req: val.md_approve_req,
                    md_approve: val.md_approve,
                    md: val.md_approve === 1 ? "Approved" : val.md_approve === 2 ? "Rejected" :
                        val.md_approve === 3 ? "On-Hold" : val.md_approve === 4 ? "Approved" : "Not Done",
                    md_approve_remarks: val.md_approve_remarks !== null ? val.md_approve_remarks : "Not Updated",
                    md_detial_analysis: val.md_detial_analysis,
                    md_approve_date: val.md_approve_date,
                    md_user: val.md_user !== null ? val.md_user.toLowerCase() : '',
                    ed_approve_req: val.ed_approve_req,
                    ed_approve: val.ed_approve,
                    ed: val.ed_approve === 1 ? "Approved" : val.ed_approve === 2 ? "Rejected" :
                        val.ed_approve === 3 ? "On-Hold" : val.ed_approve === 4 ? "Approved" : "Not Done",
                    ed_approve_remarks: val.ed_approve_remarks !== null ? val.ed_approve_remarks : "Not Updated",
                    ed_detial_analysis: val.ed_detial_analysis,
                    ed_approve_date: val.ed_approve_date,
                    ed_user: val.ed_user ? val.ed_user.toLowerCase() : '',

                    managing_director_req: val.managing_director_req,
                    managing_director_approve: val.managing_director_approve,
                    managing: val.managing_director_approve === 1 ? "Approved" : val.managing_director_approve === 2 ? "Rejected" :
                        val.managing_director_approve === 3 ? "On-Hold" : val.managing_director_approve === 4 ? "Approved" : "Not Done",
                    managing_director_remarks: val.managing_director_remarks !== null ? val.managing_director_remarks : "",
                    managing_director_analysis: val.managing_director_analysis,
                    managing_director_approve_date: val.managing_director_approve_date,
                    managing_director_user: val.managing_director_username ? val.managing_director_username.toLowerCase() : '',

                    now_who: (val.internally_arranged_status === 1 && val.req_status === 'C') ? 'Internally Arranged' :
                        val.req_status === 'C' ? "CRF Closed" :
                            val.sub_store_recieve === 1 ? "Received in " + val.sub_store_name :
                                // val.sub_store_recieve === 0 ? "Partial Goods Received in " + val.sub_store_name :
                                val.store_recieve === 1 ? "Item Received in CRS" :
                                    // val.store_recieve === 0 && val.store_recieve === 1 ? "Partial Goods Received in CRS" :
                                    val.po_to_supplier === 1 ? "Waiting for Goods" :
                                        val.approval_level === 3 ? "Director's Approved" :
                                            val.approval_level === 2 ? 'Purchase Manager Approved' :
                                                val.approval_level === 1 ? 'Purchase Dpt Approved' :
                                                    val.po_complete === 1 ? "PO Completed" :
                                                        val.po_prepartion === 1 ? "PO Prepairing" :
                                                            val.quatation_fixing === 1 ? "Quotation Fixed" :
                                                                val.quatation_negotiation === 1 ? "Quotation Negotiation" :
                                                                    val.quatation_calling_status === 1 ? "Quotation Calling" :
                                                                        val.ack_status === 1 ? "Puchase Acknowledged" :
                                                                            val.managing_director_approve !== null ? company?.managing_director_name :
                                                                                val.ed_approve !== null ? company?.ed_status_name :
                                                                                    val.md_approve !== null ? company?.md_status_name :
                                                                                        val.gm_approve !== null ? company?.gmo_status_name :
                                                                                            val.senior_manage_approv !== null ? company?.smo_status_name :
                                                                                                val.manag_operation_approv !== null ? company?.mo_status_name :
                                                                                                    val.ms_approve !== null ? company?.ms_status_name :
                                                                                                        val.dms_approve !== null ? company?.dms_status_name :
                                                                                                            val.hod_approve !== null ? company?.hod_status_name :
                                                                                                                val.incharge_approve !== null ? company?.incharge_status_name :
                                                                                                                    "Not Started",
                    now_who_status: val.req_status === 'C' ? '' :
                        val.sub_store_recieve === 1 ? 5 :
                            val.store_receive === 1 ? 5 :
                                val.po_to_supplier === 1 ? 5 :
                                    val.approval_level === 3 ? 5 :
                                        val.approval_level === 2 ? 5 :
                                            val.approval_level === 1 ? 5 :
                                                val.po_complete === 1 ? 5 :
                                                    val.po_prepartion === 1 ? 5 :
                                                        val.quatation_fixing === 1 ? 5 :
                                                            val.quatation_negotiation === 1 ? 5 :
                                                                val.quatation_calling_status === 1 ? 5 :
                                                                    val.ack_status === 1 ? 5 :
                                                                        val.managing_director_approve !== null ? val.managing_director_approve :
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

                    hod_image: val.hod_image,
                    dms_image: val.dms_image,
                    ms_image: val.ms_image,
                    mo_image: val.mo_image,
                    smo_image: val.smo_image,
                    gm_image: val.gm_image,
                    md_image: val.md_image,
                    ed_image: val.ed_image,
                    managing_director_image: val.managing_director_image,
                    approval_level: val.approval_level,
                    ack_status: val.ack_status,
                    ack_remarks: val.ack_remarks,
                    purchase_ackuser: val.purchase_ackuser,
                    ack_date: val.ack_date,
                    sub_store_name: val.sub_store_name,
                    quatation_calling_status: val.quatation_calling_status,
                    quatation_calling_remarks: val.quatation_calling_remarks,
                    quatation_calling_date: val.quatation_calling_date,
                    quatation_user: val.quatation_user,
                    quatation_negotiation: val.quatation_negotiation,
                    quatation_negotiation_remarks: val.quatation_negotiation_remarks,
                    quatation_negotiation_date: val.quatation_negotiation_date,
                    quatation_neguser: val.quatation_neguser,
                    quatation_fixing: val.quatation_fixing,
                    quatation_fixing_remarks: val.quatation_fixing_remarks,
                    quatation_fixing_date: val.quatation_fixing_date,
                    quatation_fixuser: val.quatation_fixuser,
                    po_prepartion: val.po_prepartion,
                    po_complete: val.po_complete,
                    po_complete_date: val.po_complete_date,
                    pocomplete_user: val.pocomplete_user,
                    po_to_supplier: val.po_to_supplier,
                    po_to_supplier_date: val.po_to_supplier_date,
                    store_recieve: val.store_recieve,
                    sub_store_recieve: val.sub_store_recieve,
                    user_acknldge: val.user_acknldge,
                    acknowUser: val.acknowUser,
                    user_ack_date: val.user_ack_date,
                    user_acknldge_remarks: val.user_acknldge_remarks === null ? 'nil' : val.user_acknldge_remarks,
                    store_receive_date: val.store_receive_date,
                    store_receive: val.store_receive,
                    crs_user: val.crs_user,
                    store_user: val.store_user,
                    substore_ack_date: val.substore_ack_date
                })).sort((a, b) => {
                    if (a.sub_store_recieve !== b.sub_store_recieve) {
                        return b.sub_store_recieve - a.sub_store_recieve;
                    }
                    if (a.store_recieve !== b.store_recieve) {
                        return b.store_recieve - a.store_recieve;
                    }
                    return b.req_slno - a.req_slno;
                });

            const NotuserAcklist = datas?.filter((val) => val.user_acknldge === null)
            setDisData(NotuserAcklist)
            const userAcklist = datas?.filter((val) => val.user_acknldge === 1)
            setReceivedData(userAcklist)
            const storeReceive = datas?.filter((val) => val.sub_store_recieve === 1 && val.user_acknldge === null)
            setStoreData(storeReceive)
        }
    }, [crfDetails])

    const updateRadioClick = useCallback(async (e) => {
        setRadioValue(e.target.value)

    }, [])

    if (isCrfDetailsLoading || isCompLoading) return <p>Loading...</p>;
    if (crfDetailsError || compError) return <p>Error occurred.</p>;

    return (
        <Box sx={{ height: window.innerHeight - 150, bgcolor: 'white' }}>
            <Paper sx={{ display: 'flex', flexWrap: 'wrap', p: 1 }}>
                <FormControl>
                    <RadioGroup name="radio-buttons-group" size='lg'
                        value={radiovalue} orientation="horizontal"
                        onChange={(e) => updateRadioClick(e)} sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        <Radio value='1' label='Not Received' color="warning"
                            sx={{
                                color: '#ef6c00', '&.Mui-checked': {
                                    color: '#ef6c00',
                                },
                            }}
                        />
                        <Radio value='2' label="Received In Store" color="success"
                            sx={{
                                color: '#33691e',
                                '&.Mui-checked': {
                                    color: '#33691e',
                                },
                            }} />
                        <Radio value='3' label="Received"
                            sx={{
                                color: '#0d47a1',
                                '&.Mui-checked': {
                                    color: '#0d47a1',
                                },
                            }} />
                    </RadioGroup>
                </FormControl>
                {
                    (radiovalue === '1' || radiovalue === '2') ?
                        <Box sx={{ display: 'flex', flex: 1, m: 1, justifyContent: 'flex-end', pr: 2, flexWrap: 'wrap' }}>
                            <Box>
                                <GppGoodTwoToneIcon
                                    sx={{
                                        animation: `${blinkAnimation} 1s infinite`,
                                        fontSize: 'md',
                                        color: '#1b5e20',
                                        height: 25,
                                        width: 25,
                                        transition: 'transform 0.2s',
                                        '&:hover': {
                                            transform: 'scale(1.1)',
                                        },
                                    }}
                                />
                            </Box>
                            <Box sx={{ pr: 2, fontSize: 13, pl: 1, pt: 0.4 }}>Acknowledgment of Requested CRF</Box>
                            <Box sx={{ bgcolor: '#BFD7ED', height: 20, width: 20, border: '1px solid lightgrey', borderRadius: 20 }}></Box>
                            <Box sx={{ pr: 2, fontSize: 13, pl: 1, pt: 0.2 }}>Received in CRS</Box>
                            <Box sx={{ bgcolor: '#B1D8B7', height: 20, width: 20, border: '1px solid lightgrey', borderRadius: 20 }}></Box>
                            <Box sx={{ pl: 1, fontSize: 13, pt: 0.2 }}>Received in Store</Box>
                        </Box>
                        : null
                }
            </Paper>
            <Divider />
            <Box sx={{}}>

                {radiovalue === '1' ? <NotReceivedTable disData={disData}
                    rowSelect={rowSelect} company={company} />
                    : radiovalue === '2' ? <ItemReceivedInStoreTable storeData={storeData} company={company} />
                        : radiovalue === '3' ? <ReceivedTable receivedData={receivedData} company={company} />
                            : null}
            </Box>
        </Box>
    )
}

export default memo(CrfReqstTableView)