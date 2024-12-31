import { axioslogin } from "src/views/Axios/Axios"
import { warningNotify } from "src/views/Common/CommonCode";

export const getApprovalDetails = async (setcombinedData, pData) => {

    try {
        const result = await axioslogin.post('/newCRFRegister/getPendingList', pData);
        const { success, data } = result.data;
        setcombinedData(success === 1 ? data : []);
    } catch (error) {
        warningNotify("An error occurred during approval");
    }
};

export const getOnholdRejectIemDetails = async (setDisData, setAllData, pData) => {

    try {
        const result = await axioslogin.post('/newCRFRegister/getHoldRejectItems', pData);
        const { success, data } = result.data;

        if (success === 1) {
            const newData = data?.map((val) => {
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
                        val.dms_approve === 3 ? "On-Hold" : "Not Done",
                    dms_remarks: val.dms_remarks !== null ? val.dms_remarks : "",
                    dms_detail_analysis: val.dms_detail_analysis,
                    dms_approve_date: val.dms_approve_date,
                    dms_user: val.dms_user !== null ? val.dms_user.toLowerCase() : '',
                    ms_approve_req: val.ms_approve_req,
                    ms_approve: val.ms_approve,
                    ms: val.ms_approve === 1 ? "Approved" : val.ms_approve === 2 ? "Rejected" :
                        val.ms_approve === 3 ? "On-Hold" : "Not Done",
                    ms_approve_remark: val.ms_approve_remark !== null ? val.ms_approve_remark : "Not Updated",
                    ms_detail_analysis: val.ms_detail_analysis,
                    ms_approve_date: val.ms_approve_date,
                    ms_approve_user: val.ms_approve_user !== null ? val.ms_approve_user.toLowerCase() : '',
                    manag_operation_req: val.manag_operation_req,
                    manag_operation_approv: val.manag_operation_approv,
                    om: val.manag_operation_approv === 1 ? "Approved" : val.manag_operation_approv === 2 ? "Rejected" :
                        val.manag_operation_approv === 3 ? "On-Hold" : "Not Done",
                    manag_operation_remarks: val.manag_operation_remarks !== null ? val.manag_operation_remarks : "Not Updated",
                    om_detial_analysis: val.om_detial_analysis,
                    om_approv_date: val.om_approv_date,
                    manag_operation_user: val.manag_operation_user !== null ? val.manag_operation_user.toLowerCase() : '',
                    senior_manage_req: val.senior_manage_req,
                    senior_manage_approv: val.senior_manage_approv,
                    smo: val.senior_manage_approv === 1 ? "Approved" : val.senior_manage_approv === 2 ? "Rejected" :
                        val.senior_manage_approv === 3 ? "On-Hold" : "Not Done",
                    senior_manage_remarks: val.senior_manage_remarks !== null ? val.senior_manage_remarks : "Not Updated",
                    smo_detial_analysis: val.smo_detial_analysis,
                    som_aprrov_date: val.som_aprrov_date,
                    senior_manage_user: val.senior_manage_user !== null ? val.senior_manage_user.toLowerCase() : '',
                    gm_approve_req: val.gm_approve_req,
                    gm_approve: val.gm_approve,
                    gm: val.gm_approve === 1 ? "Approved" : val.gm_approve === 2 ? "Rejected" :
                        val.gm_approve === 3 ? "On-Hold" : "Not Done",
                    gm_approve_remarks: val.gm_approve_remarks !== null ? val.gm_approve_remarks : "Not Updated",
                    gm_detial_analysis: val.gm_detial_analysis,
                    gm_approv_date: val.gm_approv_date,
                    gm_user: val.gm_user !== null ? val.gm_user.toLowerCase() : '',
                    md_approve_req: val.md_approve_req,
                    md_approve: val.md_approve,
                    md: val.md_approve === 1 ? "Approved" : val.md_approve === 2 ? "Rejected" :
                        val.md_approve === 3 ? "On-Hold" : "Not Done",
                    md_approve_remarks: val.md_approve_remarks !== null ? val.md_approve_remarks : "Not Updated",
                    md_detial_analysis: val.md_detial_analysis,
                    md_approve_date: val.md_approve_date,
                    md_user: val.md_user !== null ? val.md_user.toLowerCase() : '',
                    ed_approve_req: val.ed_approve_req,
                    ed_approve: val.ed_approve,
                    ed: val.ed_approve === 1 ? "Approved" : val.ed_approve === 2 ? "Rejected" :
                        val.ed_approve === 3 ? "On-Hold" : "Not Done",
                    ed_approve_remarks: val.ed_approve_remarks !== null ? val.ed_approve_remarks : "Not Updated",
                    ed_detial_analysis: val.ed_detial_analysis,
                    ed_approve_date: val.ed_approve_date,
                    ed_user: val.ed_user ? val.ed_user.toLowerCase() : '',
                    dept_name: val.dept_name,
                    dept_type: val.dept_type,
                    dept_id: val.dept_id,
                    dept_type_name: val.dept_type === 1 ? 'Clinical' : val.dept_type === 2 ? 'Non Clinical' : 'Academic',
                    hod_image: val.hod_image,
                    dms_image: val.dms_image,
                    ms_image: val.ms_image,
                    mo_image: val.mo_image,
                    smo_image: val.smo_image,
                    gm_image: val.gm_image,
                    md_image: val.md_image,
                    ed_image: val.ed_image,

                }
                return obj
            })
            setDisData(newData)
            setAllData(newData)
        }
        // setcombinedData(success === 1 ? data : []);
    } catch (error) {
        warningNotify("An error occurred during approval");
    }
};
export const getAllApprovalPending = async (setDisData, setTableData, data) => {
    const newData = data?.map((val) => {
        const obj = {
            req_slno: val.req_slno,
            actual_requirement: val.actual_requirement !== null ? val.actual_requirement : 'Nil',
            needed: val.needed !== null ? val.needed : 'Nil',
            req_deptsec: val.req_deptsec.toLowerCase(),
            user_deptsection: val.user_deptsection.toLowerCase(),
            em_name: val.create_user.toLowerCase(),
            request_deptsec_slno: val.request_deptsec_slno,
            location: val.location,
            expected_date: val.expected_date,
            category: val.category,
            req_date: val.create_date,
            user_deptsec: val.user_deptsec,

            incharge_req: val.incharge_req,
            incharge_approve: val.incharge_approve,
            incharge: val.incharge_approve === 1 ? "Approved" : val.incharge_approve === 2 ? "Rejected" :
                val.incharge_approve === 3 ? "On-Hold" : "Not Done",
            hod_req: val.hod_req,
            hod_approve: val.hod_approve,
            hod: val.hod_approve === 1 ? "Approved" : val.hod_approve === 2 ? "Rejected" :
                val.hod_approve === 3 ? "On-Hold" : "Not Done",
            dms_req: val.dms_req,
            dms_approve: val.dms_approve,
            dms: val.dms_approve === 1 ? "Approved" : val.dms_approve === 2 ? "Rejected" :
                val.dms_approve === 3 ? "On-Hold" : "Not Done",
            ms_approve_req: val.ms_approve_req,
            ms_approve: val.ms_approve,
            ms: val.ms_approve === 1 ? "Approved" : val.ms_approve === 2 ? "Rejected" :
                val.ms_approve === 3 ? "On-Hold" : "Not Done",
            manag_operation_req: val.manag_operation_req,
            manag_operation_approv: val.manag_operation_approv,
            om: val.manag_operation_approv === 1 ? "Approved" : val.manag_operation_approv === 2 ? "Rejected" :
                val.manag_operation_approv === 3 ? "On-Hold" : "Not Done",
            senior_manage_req: val.senior_manage_req,
            senior_manage_approv: val.senior_manage_approv,
            smo: val.senior_manage_approv === 1 ? "Approved" : val.senior_manage_approv === 2 ? "Rejected" :
                val.senior_manage_approv === 3 ? "On-Hold" : "Not Done",
            gm_approve_req: val.gm_approve_req,
            gm_approve: val.gm_approve,
            gm: val.gm_approve === 1 ? "Approved" : val.gm_approve === 2 ? "Rejected" :
                val.gm_approve === 3 ? "On-Hold" : "Not Done",
            md_approve_req: val.md_approve_req,
            md_approve: val.md_approve,
            md: val.md_approve === 1 ? "Approved" : val.md_approve === 2 ? "Rejected" :
                val.md_approve === 3 ? "On-Hold" : "Not Done",
            ed_approve_req: val.ed_approve_req,
            ed_approve: val.ed_approve,
            ed: val.ed_approve === 1 ? "Approved" : val.ed_approve === 2 ? "Rejected" :
                val.ed_approve === 3 ? "On-Hold" : "Not Done",
            now_who: val.ed_approve !== null ? "ED " :
                val.md_approve !== null ? "MD" :
                    val.gm_approve !== null ? "GM" :
                        val.senior_manage_approv !== null ? "SMO" :
                            val.manag_operation_approv !== null ? "MO" :
                                val.ms_approve !== null ? "MS" :
                                    val.dms_approve !== null ? "DMS" :
                                        val.hod_approve !== null ? "HOD" :
                                            val.incharge_approve !== null ? "Incharge" :
                                                "Not Started",
            now_who_status: val.ed_approve !== null ? val.ed_approve :
                val.md_approve !== null ? val.md_approve :
                    val.gm_approve !== null ? val.gm_approve :
                        val.senior_manage_approv !== null ? val.senior_manage_approv :
                            val.manag_operation_approv !== null ? val.manag_operation_approv :
                                val.ms_approve !== null ? val.ms_approve :
                                    val.dms_approve !== null ? val.dms_approve :
                                        val.hod_approve !== null ? val.hod_approve :
                                            val.incharge_approve !== null ? val.incharge_approve :
                                                0,

            dept_id: val.dept_id,
            dept_name: val.dept_name
        }
        return obj
    })
    setDisData(newData)
    setTableData(newData)

}


export const getPurchasePending = async (setDisData, setTableData, data) => {
    const newData = data?.map((val) => {
        const obj = {
            req_slno: val.req_slno,
            actual_requirement: val.actual_requirement !== null ? val.actual_requirement : 'Nil',
            needed: val.needed !== null ? val.needed : 'Nil',
            req_deptsec: val.req_deptsec.toLowerCase(),
            user_deptsection: val.user_deptsection.toLowerCase(),
            em_name: val.create_user.toLowerCase(),
            request_deptsec_slno: val.request_deptsec_slno,
            location: val.location,
            expected_date: val.expected_date,
            category: val.category,
            req_date: val.create_date,
            user_deptsec: val.user_deptsec,
            dept_id: val.dept_id,
            dept_name: val.dept_name,

            quatation_calling_status: val.quatation_calling_status,
            quatation_negotiation: val.quatation_negotiation,
            quatation_negotiation_remarks: val.quatation_negotiation_remarks,
            quatation_fixing: val.quatation_fixing,
            po_prepartion: val.po_prepartion,
            po_complete: val.po_complete,
            po_to_supplier: val.po_to_supplier,
            po_number: val.po_number,
            now_who: val.approval_level === 3 ? "Director's Approved" :
                val.approval_level === 2 ? 'Purchase Manager Approved' :
                    val.approval_level === 1 ? 'Purchase Dpt Approved' :
                        val.po_complete === 1 ? "PO Completed" :
                            val.po_prepartion === 1 ? "PO Prepairing" :
                                val.quatation_fixing === 1 ? "Quotation Fixed" :
                                    val.quatation_negotiation === 1 ? "Quotation Negotiation" :
                                        val.quatation_calling_status === 1 ? "Quotation Calling" :
                                            val.ack_status === 1 ? "Puchase Acknowledged" :
                                                "Not Started Purchase Process",
        }
        return obj
    })
    setDisData(newData)
    setTableData(newData)

}

export const getCRSPending = async (setDisData, setTableData, data) => {
    const newData = data?.map((val) => {
        const obj = {
            req_slno: val.req_slno,
            actual_requirement: val.actual_requirement !== null ? val.actual_requirement : 'Nil',
            needed: val.needed !== null ? val.needed : 'Nil',
            req_deptsec: val.req_deptsec.toLowerCase(),
            user_deptsection: val.user_deptsection.toLowerCase(),
            em_name: val.create_user.toLowerCase(),
            request_deptsec_slno: val.request_deptsec_slno,
            location: val.location,
            expected_date: val.expected_date,
            category: val.category,
            req_date: val.create_date,
            user_deptsec: val.user_deptsec,
            dept_id: val.dept_id,
            dept_name: val.dept_name,

            po_to_supplier: val.po_to_supplier,
            store_recieve: val.store_recieve,
            po_number: val.po_number,
            now_who: val.store_recieve === 1 ? "All Items Received in CRS" :
                val.store_recieve === 0 ? "Partial Goods Received in CRS" :
                    val.po_to_supplier === 1 ? "Waiting for Goods" : ''

        }
        return obj
    })
    setDisData(newData)
    setTableData(newData)

}


