import { Box, CssVarsProvider } from '@mui/joy';
import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify';
import CustomCloseIconCmp from '../ComonComponent/Components/CustomCloseIconCmp';
import TopDesignComp from '../ComonComponent/TopDesignComp';
import { Virtuoso } from 'react-virtuoso';
import MasterDetailCompnt from '../ComonComponent/MasterDetailCompnt';
import { useHistory } from 'react-router-dom';
import CrmInchargeModal from './CrmInchargeModal';
import InchargeCancel from './InchargeCancel';
import ClosedButtonCompnt from '../ComonComponent/ClosedButtonCompnt';
import { getCRFInchargeHodData, getDefaultCompany, getDptSecIcharge } from 'src/api/CommonApiCRF';
import ApproveButtonComponentIncharge from './InchargeComp/ApproveButtonComponentIncharge';


const InchargeApproval = () => {

    const loginId = useSelector((state) => state?.LoginUserData?.empid)
    const [authorizeDeptSec, setAuthorizDeptSec] = useState([])
    const [deptsecArry, setDeptsecArry] = useState([])
    const [pendingData, setPendingData] = useState([])
    const [donedata, setDoneData] = useState([])
    const [closedData, setClosedData] = useState([])
    const [allData, setAllData] = useState([])
    const [disData, setDisData] = useState([])
    const [radiovalue, setRadioValue] = useState('1')

    const [ApprovalFlag, setApprovalFlag] = useState(0)
    const [ApprovalModal, setApprovalModal] = useState(false)
    const [ApprovalData, setApprovalData] = useState([])

    const [cancelFlag, setCancelFlag] = useState(0)
    const [cancelModal, setCancelModal] = useState(false)
    const [cancelData, setCancelData] = useState([])

    const [reqItems, setReqItems] = useState([])
    const [approveTableData, setApproveTableData] = useState([])
    const [poDetails, setPoDetails] = useState([])
    const [imagearray, setImageArry] = useState([])
    const [selectedCompany, setSelectedCompany] = useState('1');
    const history = useHistory();
    const backtoSetting = useCallback(() => {
        history.push('/Home')
    }, [history])


    const { data: authData, isLoading: isAuthLoading, error: authError } = useQuery({
        queryKey: ['authDepSecListIncharge', loginId],
        queryFn: () => getDptSecIcharge(loginId),
        staleTime: Infinity
    });
    useEffect(() => {
        if (authData) {
            setAuthorizDeptSec(authData);
            const inchdeptsec = authData.map((val) => val.dept_section);
            setDeptsecArry(inchdeptsec);
        }
    }, [authData]);
    const { data: inchargeData, isLoading: isInchargeLoading, error: inchargeError } = useQuery({
        queryKey: ['inchargeHodCrfList', JSON.stringify(deptsecArry)],
        queryFn: () => getCRFInchargeHodData(deptsecArry),
        enabled: deptsecArry.length > 0,
        staleTime: Infinity
    });

    const { data: companyData, isLoading: isCompLoading, error: compError } = useQuery({
        queryKey: 'getdefaultCompany',
        queryFn: () => getDefaultCompany(),
        staleTime: Infinity
    });
    const company = useMemo(() => companyData, [companyData]);
    useEffect(() => {
        if (inchargeData) {
            const datas = inchargeData?.map((val) => {
                const obj = {
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
                    incharge_remarks: val.incharge_remarks !== null ? val.incharge_remarks : "",
                    inch_detial_analysis: val.inch_detial_analysis,
                    // incharge_remark: val.incharge_remarks !== null ? val.incharge_remarks : "Not Updated",
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

                    higher: val.hod_approve !== null || val.manag_operation_approv !== null || val.senior_manage_approv !== null ||
                        val.gm_approve !== null || val.md_approve !== null ||
                        val.ed_approve !== null ? 1 :
                        (val.dms_req === 1 && val.dms_approve !== null) ||
                            (val.ms_approve_req === 1 && val.ms_approve !== null) ? 1 : 0,
                    now_who: val.req_status === 'C' ? "CRF Closed" :
                        val.sub_store_recieve === 1 ? "Received in " + val.sub_store_name :
                            val.store_recieve === 1 ? "All Items Received in CRS" :
                                val.store_recieve === 0 ? "Partial Goods Received in CRS" :
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
                                                                            val.managing_director_approve !== null ? company.managing_director_name :
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
                    //  here now_who_status =5 is used to not show approved from purchase level on status      
                    now_who_status:
                        val.req_status === 'C' ? '' :
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
                    store_receive_date: val.store_receive_date,
                    store_receive: val.store_receive,
                    crs_user: val.crs_user,
                    store_user: val.store_user,
                    substore_ack_date: val.substore_ack_date,
                    dept_name: val.dept_name,
                    dept_type: val.dept_type,
                    dept_type_name: val.dept_type === 1 ? 'Clinical' : val.dept_type === 2 ? 'Non Clinical' : 'Academic',
                    approval_level: val.approval_level,
                    company_name: val?.company_name
                }
                return obj
            })
            const incharge = datas?.filter((val) => {
                return val.incharge_req === 1 && val.crf_close !== 1 && val.crf_close !== 2
            })
            const closedList = datas?.filter((val) => {
                return val.incharge_req === 1 && (val.crf_close === 1 || val.crf_close === 2)
            })
            setClosedData(closedList)

            const pendingList = incharge?.filter((val) => {
                return val.incharge_approve === null && val.hod_approve === null &&
                    val.manag_operation_approv === null && val.senior_manage_approv === null &&
                    val.gm_approve === null && val.ed_approve === null && val.md_approve === null &&
                    (val.dms_req === 1 && val.dms_approve === null ||
                        val.dms_req === 0 && val.dms_approve === null) &&
                    (val.ms_approve_req === 1 && val.ms_approve === null ||
                        val.ms_approve_req === 0 && val.ms_approve === null)

            })
            setPendingData(pendingList)

            const doneList = incharge?.filter((val) => {
                return val.incharge_approve !== null || val.hod_approve !== null
            })
            setDoneData(doneList)

        }
        else {
            setClosedData([])
            setPendingData([])
            setDoneData([])
        }
    }, [inchargeData, company]);

    useEffect(() => {
        if (radiovalue === '1') {
            setDisData(pendingData);
            setAllData(pendingData);
        }
    }, [radiovalue, pendingData]);

    const handleClose = useCallback(() => {
        setApprovalModal(false);
        setApprovalFlag(0);
        setApprovalData([]);
    }, []);

    const handleCloseCrfClose = useCallback(() => {
        setCancelData([]);
        setCancelModal(false);
        setCancelFlag(0);
        setSelectedCompany('1')
    }, []);


    if (isInchargeLoading || isAuthLoading || isCompLoading) return <p>Loading...</p>;
    if (inchargeError || authError || compError) return <p>Error occurred.</p>;

    return (
        <Fragment>
            <ToastContainer />

            {cancelFlag === 1 ? <InchargeCancel open={cancelModal} handleCloseCrfClose={handleCloseCrfClose}
                reqItems={reqItems} cancelData={cancelData} cancelledOne={'Incharge'} setCancelFlag={setCancelFlag}
                imagearray={imagearray} deptsecArry={deptsecArry} /> : null}

            {ApprovalFlag === 1 ? <CrmInchargeModal open={ApprovalModal} ApprovalData={ApprovalData}
                handleClose={handleClose} reqItems={reqItems} setApproveTableData={setApproveTableData} company={company}
                approveTableData={approveTableData} deptsecArry={deptsecArry} imagearray={imagearray} selectedCompany={selectedCompany} /> : null}

            <Box sx={{ height: window.innerHeight - 80, flexWrap: 'wrap', bgcolor: 'white', }}>
                <Box sx={{ display: 'flex', backgroundColor: "#f0f3f5", border: '1px solid #B4F5F0' }}>
                    <Box sx={{ fontWeight: 550, flex: 1, pl: 1, pt: .5, color: '#385E72', }}>  {company?.incharge_status_name} Approval</Box>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', flex: 1, fontSize: 20, m: 0.5 }}>
                        <CssVarsProvider>
                            <CustomCloseIconCmp
                                handleChange={backtoSetting}
                            />
                        </CssVarsProvider>
                    </Box>
                </Box>
                <TopDesignComp pendingData={pendingData} donedata={donedata} closedData={closedData} authorizeDeptSec={authorizeDeptSec}
                    allData={allData} setAllData={setAllData} setDisData={setDisData} radiovalue={radiovalue}
                    setRadioValue={setRadioValue}
                />
                <Box sx={{ height: window.innerHeight - 200, overflow: 'auto', flexWrap: 'wrap' }}>
                    {disData.length !== 0 ?
                        <Virtuoso
                            data={disData}
                            totalCount={disData?.length}
                            itemContent={(index, val) =>
                                <Box key={index} sx={{
                                    width: "100%", mt: 0.8, flexWrap: 'wrap',
                                    border: '1px solid #21B6A8', borderRadius: 2,
                                }}>
                                    <MasterDetailCompnt val={val} />
                                    {radiovalue === '3' ?
                                        <ClosedButtonCompnt val={val} setPoDetails={setPoDetails} setImageArry={setImageArry}
                                            imagearray={imagearray} selectedCompany={selectedCompany}
                                        />
                                        :
                                        <ApproveButtonComponentIncharge val={val} setApprovalFlag={setApprovalFlag}
                                            setApprovalModal={setApprovalModal} setCancelFlag={setCancelFlag}
                                            setCancelModal={setCancelModal} setApprovalData={setApprovalData}
                                            setCancelData={setCancelData} setReqItems={setReqItems} setApproveTableData={setApproveTableData}
                                            setPoDetails={setPoDetails} reqItems={reqItems} approveTableData={approveTableData}
                                            poDetails={poDetails} deptsecArry={deptsecArry} setImageArry={setImageArry}
                                            imagearray={imagearray} company={company}


                                        />
                                    }
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

            </Box >
        </Fragment>
    )
}
export default InchargeApproval