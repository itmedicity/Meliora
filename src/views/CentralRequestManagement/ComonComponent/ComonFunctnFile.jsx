import { axioslogin } from "src/views/Axios/Axios"
import { infoNotify } from "src/views/Common/CommonCode"

export const CloseListApi = async (setDisArray, setOpen) => {

    const result = await axioslogin.get('/CrmNewApprovals/getClosedReqList')
    const { success, data } = result.data
    if (success === 1) {
        const datas = data.map((val) => {
            const obj = {
                req_status: val.req_status,
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
                manag_operation_remarks: val.manag_operation_remarks,
                om_detial_analysis: val.om_detial_analysis,
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
                now_who:
                    val.sub_store_recieve === 1 ? "Sub Store Receive" :
                        val.store_receive === 1 ? "CRS Store Receive" :
                            val.po_to_supplier === 1 ? "PO Send to Supplier" :
                                val.po_approva_level_two === 1 ? "PO Managing Director Approved" :
                                    val.po_approva_level_one === 1 ? "PO Purchase Level Approved" :
                                        val.po_complete === 1 ? "PO Completed" :
                                            val.po_prepartion === 1 ? "PO Prepairing" :
                                                val.quatation_fixing === 1 ? "Quatation Fixed" :
                                                    val.quatation_negotiation === 1 ? "Quatation Negotiation" :
                                                        val.quatation_calling_status === 1 ? "Quatation Calling" :
                                                            val.ack_status === 1 ? "Puchase Acknowledged" :
                                                                val.ed_approve !== null ? "ED" :
                                                                    val.md_approve !== null ? "MD" :
                                                                        val.gm_approve !== null ? "GM" :
                                                                            val.senior_manage_approv !== null ? "SMO" :
                                                                                val.manag_operation_approv !== null ? "MO" :
                                                                                    val.ms_approve !== null ? "MS" :
                                                                                        val.dms_approve !== null ? "DMS" :
                                                                                            val.hod_approve !== null ? "HOD" :
                                                                                                val.incharge_approve !== null ? "INCHARGE" :
                                                                                                    "Not Statrted",
                now_who_status: val.sub_store_recieve === 1 ? 4 :
                    val.store_receive === 1 ? 4 :
                        val.po_to_supplier === 1 ? val.po_to_supplier :
                            val.po_approva_level_two === 1 ? val.po_approva_level_two :
                                val.po_approva_level_one === 1 ? val.po_approva_level_one :
                                    val.po_complete === 1 ? val.po_complete :
                                        val.po_prepartion === 1 ? val.po_prepartion :
                                            val.quatation_fixing === 1 ? val.quatation_fixing :
                                                val.quatation_negotiation === 1 ? val.quatation_negotiation :
                                                    val.quatation_calling_status === 1 ? val.quatation_calling_status :
                                                        val.ack_status === 1 ? val.ack_status :
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
                ack_status: val.ack_status,
                ack_remarks: val.ack_remarks,
                quatation_calling_status: val.quatation_calling_status,
                quatation_calling_date: val.quatation_calling_date,
                quatation_negotiation: val.quatation_negotiation,
                quatation_negotiation_date: val.quatation_negotiation_date,
                quatation_fixing: val.quatation_fixing,
                quatation_fixing_date: val.quatation_fixing_date,
                po_prepartion: val.po_prepartion,
                po_complete: val.po_complete,
                po_complete_date: val.po_complete_date,
                po_approva_level_one: val.po_approva_level_one,
                po_approva_level_two: val.po_approva_level_two,
                po_to_supplier: val.po_to_supplier,
                store_receive: val.store_receive,
                dept_name: val.dept_name,
                dept_type: val.dept_type
            }
            return obj
        })
        setDisArray(datas)
        setOpen(false)
    }
    else {
        setDisArray([])
        setOpen(false)
    }
}


export const AllListAfterInchAppApi = async (setDisArray, setOpen) => {
    const result = await axioslogin.get('/CrmNewApprovals/getAllReqListNotAck')
    const { success, data } = result.data
    if (success === 1) {
        const datas = data.map((val) => {
            const obj = {
                req_status: val.req_status,
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
                manag_operation_remarks: val.manag_operation_remarks,
                om_detial_analysis: val.om_detial_analysis,
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
                higher: val.senior_manage_approv !== null ? 1 :
                    val.gm_approve !== null ? 1 : val.md_approve !== null ? 1 : val.ed_approve !== null ? 1 : 0,
                now_who:
                    val.sub_store_recieve === 1 ? "Sub Store Receive" :
                        val.store_receive === 1 ? "CRS Store Receive" :
                            val.po_to_supplier === 1 ? "PO Send to Supplier" :
                                val.po_approva_level_two === 1 ? "PO Managing Director Approved" :
                                    val.po_approva_level_one === 1 ? "PO Purchase Level Approved" :
                                        val.po_complete === 1 ? "PO Completed" :
                                            val.po_prepartion === 1 ? "PO Prepairing" :
                                                val.quatation_fixing === 1 ? "Quatation Fixed" :
                                                    val.quatation_negotiation === 1 ? "Quatation Negotiation" :
                                                        val.quatation_calling_status === 1 ? "Quatation Calling" :
                                                            val.ack_status === 1 ? "Puchase Acknowledged" :
                                                                val.ed_approve !== null ? "ED" :
                                                                    val.md_approve !== null ? "MD" :
                                                                        val.gm_approve !== null ? "GM" :
                                                                            val.senior_manage_approv !== null ? "SMO" :
                                                                                val.manag_operation_approv !== null ? "MO" :
                                                                                    val.ms_approve !== null ? "MS" :
                                                                                        val.dms_approve !== null ? "DMS" :
                                                                                            val.hod_approve !== null ? "HOD" :
                                                                                                val.incharge_approve !== null ? "INCHARGE" :
                                                                                                    "Not Statrted",
                now_who_status: val.sub_store_recieve === 1 ? 4 :
                    val.store_receive === 1 ? 4 :
                        val.po_to_supplier === 1 ? val.po_to_supplier :
                            val.po_approva_level_two === 1 ? val.po_approva_level_two :
                                val.po_approva_level_one === 1 ? val.po_approva_level_one :
                                    val.po_complete === 1 ? val.po_complete :
                                        val.po_prepartion === 1 ? val.po_prepartion :
                                            val.quatation_fixing === 1 ? val.quatation_fixing :
                                                val.quatation_negotiation === 1 ? val.quatation_negotiation :
                                                    val.quatation_calling_status === 1 ? val.quatation_calling_status :
                                                        val.ack_status === 1 ? val.ack_status :
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
                ack_status: val.ack_status,
                ack_remarks: val.ack_remarks,
                quatation_calling_status: val.quatation_calling_status,
                quatation_calling_date: val.quatation_calling_date,
                quatation_negotiation: val.quatation_negotiation,
                quatation_negotiation_date: val.quatation_negotiation_date,
                quatation_fixing: val.quatation_fixing,
                quatation_fixing_date: val.quatation_fixing_date,
                po_prepartion: val.po_prepartion,
                po_complete: val.po_complete,
                po_complete_date: val.po_complete_date,
                po_approva_level_one: val.po_approva_level_one,
                po_approva_level_two: val.po_approva_level_two,
                po_to_supplier: val.po_to_supplier,
                store_receive: val.store_receive,
                dept_name: val.dept_name,
                dept_type: val.dept_type
            }
            return obj
        })

        setDisArray(datas)
        setOpen(false)
    } else {
        setDisArray([])
        setOpen(false)
    }
}

export const RejectListApi = async (setDisArray, setOpen) => {
    const result = await axioslogin.get('/CrmNewApprovals/getRejectedReqList')
    const { success, data } = result.data
    if (success === 1) {
        const datas = data.map((val) => {
            const obj = {
                req_status: val.req_status,
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
                manag_operation_remarks: val.manag_operation_remarks,
                om_detial_analysis: val.om_detial_analysis,
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
                higher: 0,
                now_who:
                    val.sub_store_recieve === 1 ? "Sub Store Receive" :
                        val.store_receive === 1 ? "CRS Store Receive" :
                            val.po_to_supplier === 1 ? "PO Send to Supplier" :
                                val.po_approva_level_two === 1 ? "PO Managing Director Approved" :
                                    val.po_approva_level_one === 1 ? "PO Purchase Level Approved" :
                                        val.po_complete === 1 ? "PO Completed" :
                                            val.po_prepartion === 1 ? "PO Prepairing" :
                                                val.quatation_fixing === 1 ? "Quatation Fixed" :
                                                    val.quatation_negotiation === 1 ? "Quatation Negotiation" :
                                                        val.quatation_calling_status === 1 ? "Quatation Calling" :
                                                            val.ack_status === 1 ? "Puchase Acknowledged" :
                                                                val.ed_approve !== null ? "ED" :
                                                                    val.md_approve !== null ? "MD" :
                                                                        val.gm_approve !== null ? "GM" :
                                                                            val.senior_manage_approv !== null ? "SMO" :
                                                                                val.manag_operation_approv !== null ? "MO" :
                                                                                    val.ms_approve !== null ? "MS" :
                                                                                        val.dms_approve !== null ? "DMS" :
                                                                                            val.hod_approve !== null ? "HOD" :
                                                                                                val.incharge_approve !== null ? "INCHARGE" :
                                                                                                    "Not Statrted",
                now_who_status: val.sub_store_recieve === 1 ? 4 :
                    val.store_receive === 1 ? 4 :
                        val.po_to_supplier === 1 ? val.po_to_supplier :
                            val.po_approva_level_two === 1 ? val.po_approva_level_two :
                                val.po_approva_level_one === 1 ? val.po_approva_level_one :
                                    val.po_complete === 1 ? val.po_complete :
                                        val.po_prepartion === 1 ? val.po_prepartion :
                                            val.quatation_fixing === 1 ? val.quatation_fixing :
                                                val.quatation_negotiation === 1 ? val.quatation_negotiation :
                                                    val.quatation_calling_status === 1 ? val.quatation_calling_status :
                                                        val.ack_status === 1 ? val.ack_status :
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
                ack_status: val.ack_status,
                ack_remarks: val.ack_remarks,
                quatation_calling_status: val.quatation_calling_status,
                quatation_calling_date: val.quatation_calling_date,
                quatation_negotiation: val.quatation_negotiation,
                quatation_negotiation_date: val.quatation_negotiation_date,
                quatation_fixing: val.quatation_fixing,
                quatation_fixing_date: val.quatation_fixing_date,
                po_prepartion: val.po_prepartion,
                po_complete: val.po_complete,
                po_complete_date: val.po_complete_date,
                po_approva_level_one: val.po_approva_level_one,
                po_approva_level_two: val.po_approva_level_two,
                po_to_supplier: val.po_to_supplier,
                store_receive: val.store_receive,
                dept_name: val.dept_name,
                dept_type: val.dept_type
            }
            return obj
        })

        setDisArray(datas)
        setOpen(false)
    }
    else {
        setDisArray([])
        setOpen(false)
    }
}



export const OnHoldListApi = async (setDisArray, setOpen) => {
    const result = await axioslogin.get('/CrmNewApprovals/getOnHoldReqList')
    const { success, data } = result.data
    if (success === 1) {
        const datas = data.map((val) => {
            const obj = {
                req_status: val.req_status,
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
                manag_operation_remarks: val.manag_operation_remarks,
                om_detial_analysis: val.om_detial_analysis,
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
                higher: 0,
                now_who:
                    val.sub_store_recieve === 1 ? "Sub Store Receive" :
                        val.store_receive === 1 ? "CRS Store Receive" :
                            val.po_to_supplier === 1 ? "PO Send to Supplier" :
                                val.po_approva_level_two === 1 ? "PO Managing Director Approved" :
                                    val.po_approva_level_one === 1 ? "PO Purchase Level Approved" :
                                        val.po_complete === 1 ? "PO Completed" :
                                            val.po_prepartion === 1 ? "PO Prepairing" :
                                                val.quatation_fixing === 1 ? "Quatation Fixed" :
                                                    val.quatation_negotiation === 1 ? "Quatation Negotiation" :
                                                        val.quatation_calling_status === 1 ? "Quatation Calling" :
                                                            val.ack_status === 1 ? "Puchase Acknowledged" :
                                                                val.ed_approve !== null ? "ED" :
                                                                    val.md_approve !== null ? "MD" :
                                                                        val.gm_approve !== null ? "GM" :
                                                                            val.senior_manage_approv !== null ? "SMO" :
                                                                                val.manag_operation_approv !== null ? "MO" :
                                                                                    val.ms_approve !== null ? "MS" :
                                                                                        val.dms_approve !== null ? "DMS" :
                                                                                            val.hod_approve !== null ? "HOD" :
                                                                                                val.incharge_approve !== null ? "INCHARGE" :
                                                                                                    "Not Statrted",
                now_who_status: val.sub_store_recieve === 1 ? 4 :
                    val.store_receive === 1 ? 4 :
                        val.po_to_supplier === 1 ? val.po_to_supplier :
                            val.po_approva_level_two === 1 ? val.po_approva_level_two :
                                val.po_approva_level_one === 1 ? val.po_approva_level_one :
                                    val.po_complete === 1 ? val.po_complete :
                                        val.po_prepartion === 1 ? val.po_prepartion :
                                            val.quatation_fixing === 1 ? val.quatation_fixing :
                                                val.quatation_negotiation === 1 ? val.quatation_negotiation :
                                                    val.quatation_calling_status === 1 ? val.quatation_calling_status :
                                                        val.ack_status === 1 ? val.ack_status :
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
                ack_status: val.ack_status,
                ack_remarks: val.ack_remarks,
                quatation_calling_status: val.quatation_calling_status,
                quatation_calling_date: val.quatation_calling_date,
                quatation_negotiation: val.quatation_negotiation,
                quatation_negotiation_date: val.quatation_negotiation_date,
                quatation_fixing: val.quatation_fixing,
                quatation_fixing_date: val.quatation_fixing_date,
                po_prepartion: val.po_prepartion,
                po_complete: val.po_complete,
                po_complete_date: val.po_complete_date,
                po_approva_level_one: val.po_approva_level_one,
                po_approva_level_two: val.po_approva_level_two,
                po_to_supplier: val.po_to_supplier,
                store_receive: val.store_receive,
                dept_name: val.dept_name,
                dept_type: val.dept_type
            }
            return obj
        })

        setDisArray(datas)
        setOpen(false)
    }
    else {
        setDisArray([])
        setOpen(false)
    }
}

export const getMOAppvalPending = async (setDisArray, setOpen) => {
    const result = await axioslogin.get('/CrmNewApprovals/getMOAppvalPending')
    const { success, data } = result.data
    if (success === 1) {
        const datas = data.map((val) => {
            const obj = {
                req_status: val.req_status,
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
                manag_operation_remarks: val.manag_operation_remarks,
                om_detial_analysis: val.om_detial_analysis,
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
                higher: val.senior_manage_approv !== null ? 1 :
                    val.gm_approve !== null ? 1 : val.md_approve !== null ? 1 : val.ed_approve !== null ? 1 : 0,
                now_who:
                    val.sub_store_recieve === 1 ? "Sub Store Receive" :
                        val.store_receive === 1 ? "CRS Store Receive" :
                            val.po_to_supplier === 1 ? "PO Send to Supplier" :
                                val.po_approva_level_two === 1 ? "PO Managing Director Approved" :
                                    val.po_approva_level_one === 1 ? "PO Purchase Level Approved" :
                                        val.po_complete === 1 ? "PO Completed" :
                                            val.po_prepartion === 1 ? "PO Prepairing" :
                                                val.quatation_fixing === 1 ? "Quatation Fixed" :
                                                    val.quatation_negotiation === 1 ? "Quatation Negotiation" :
                                                        val.quatation_calling_status === 1 ? "Quatation Calling" :
                                                            val.ack_status === 1 ? "Puchase Acknowledged" :
                                                                val.ed_approve !== null ? "ED" :
                                                                    val.md_approve !== null ? "MD" :
                                                                        val.gm_approve !== null ? "GM" :
                                                                            val.senior_manage_approv !== null ? "SMO" :
                                                                                val.manag_operation_approv !== null ? "MO" :
                                                                                    val.ms_approve !== null ? "MS" :
                                                                                        val.dms_approve !== null ? "DMS" :
                                                                                            val.hod_approve !== null ? "HOD" :
                                                                                                val.incharge_approve !== null ? "INCHARGE" :
                                                                                                    "Not Statrted",
                now_who_status: val.sub_store_recieve === 1 ? 4 :
                    val.store_receive === 1 ? 4 :
                        val.po_to_supplier === 1 ? val.po_to_supplier :
                            val.po_approva_level_two === 1 ? val.po_approva_level_two :
                                val.po_approva_level_one === 1 ? val.po_approva_level_one :
                                    val.po_complete === 1 ? val.po_complete :
                                        val.po_prepartion === 1 ? val.po_prepartion :
                                            val.quatation_fixing === 1 ? val.quatation_fixing :
                                                val.quatation_negotiation === 1 ? val.quatation_negotiation :
                                                    val.quatation_calling_status === 1 ? val.quatation_calling_status :
                                                        val.ack_status === 1 ? val.ack_status :
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
                ack_status: val.ack_status,
                ack_remarks: val.ack_remarks,
                quatation_calling_status: val.quatation_calling_status,
                quatation_calling_date: val.quatation_calling_date,
                quatation_negotiation: val.quatation_negotiation,
                quatation_negotiation_date: val.quatation_negotiation_date,
                quatation_fixing: val.quatation_fixing,
                quatation_fixing_date: val.quatation_fixing_date,
                po_prepartion: val.po_prepartion,
                po_complete: val.po_complete,
                po_complete_date: val.po_complete_date,
                po_approva_level_one: val.po_approva_level_one,
                po_approva_level_two: val.po_approva_level_two,
                po_to_supplier: val.po_to_supplier,
                store_receive: val.store_receive,
                dept_name: val.dept_name,
                dept_type: val.dept_type
            }
            return obj
        })

        setDisArray(datas)
        setOpen(false)
    }
    else {
        setDisArray([])
        setOpen(false)
    }
}

export const AllListForMOApi = async (setDisArray, setOpen) => {
    const result = await axioslogin.get('/CrmNewApprovals/getAllReqListNotAck')
    const { success, data } = result.data
    if (success === 1) {
        const datas = data.map((val) => {
            const obj = {
                req_status: val.req_status,
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
                manag_operation_remarks: val.manag_operation_remarks,
                om_detial_analysis: val.om_detial_analysis,
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
                higher: val.senior_manage_approv !== null ? 1 :
                    val.gm_approve !== null ? 1 : val.md_approve !== null ? 1 : val.ed_approve !== null ? 1 : 0,
                now_who:
                    val.sub_store_recieve === 1 ? "Sub Store Receive" :
                        val.store_receive === 1 ? "CRS Store Receive" :
                            val.po_to_supplier === 1 ? "PO Send to Supplier" :
                                val.po_approva_level_two === 1 ? "PO Managing Director Approved" :
                                    val.po_approva_level_one === 1 ? "PO Purchase Level Approved" :
                                        val.po_complete === 1 ? "PO Completed" :
                                            val.po_prepartion === 1 ? "PO Prepairing" :
                                                val.quatation_fixing === 1 ? "Quatation Fixed" :
                                                    val.quatation_negotiation === 1 ? "Quatation Negotiation" :
                                                        val.quatation_calling_status === 1 ? "Quatation Calling" :
                                                            val.ack_status === 1 ? "Puchase Acknowledged" :
                                                                val.ed_approve !== null ? "ED" :
                                                                    val.md_approve !== null ? "MD" :
                                                                        val.gm_approve !== null ? "GM" :
                                                                            val.senior_manage_approv !== null ? "SMO" :
                                                                                val.manag_operation_approv !== null ? "MO" :
                                                                                    val.ms_approve !== null ? "MS" :
                                                                                        val.dms_approve !== null ? "DMS" :
                                                                                            val.hod_approve !== null ? "HOD" :
                                                                                                val.incharge_approve !== null ? "INCHARGE" :
                                                                                                    "Not Statrted",
                now_who_status: val.sub_store_recieve === 1 ? 4 :
                    val.store_receive === 1 ? 4 :
                        val.po_to_supplier === 1 ? val.po_to_supplier :
                            val.po_approva_level_two === 1 ? val.po_approva_level_two :
                                val.po_approva_level_one === 1 ? val.po_approva_level_one :
                                    val.po_complete === 1 ? val.po_complete :
                                        val.po_prepartion === 1 ? val.po_prepartion :
                                            val.quatation_fixing === 1 ? val.quatation_fixing :
                                                val.quatation_negotiation === 1 ? val.quatation_negotiation :
                                                    val.quatation_calling_status === 1 ? val.quatation_calling_status :
                                                        val.ack_status === 1 ? val.ack_status :
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
                ack_status: val.ack_status,
                ack_remarks: val.ack_remarks,
                quatation_calling_status: val.quatation_calling_status,
                quatation_calling_date: val.quatation_calling_date,
                quatation_negotiation: val.quatation_negotiation,
                quatation_negotiation_date: val.quatation_negotiation_date,
                quatation_fixing: val.quatation_fixing,
                quatation_fixing_date: val.quatation_fixing_date,
                po_prepartion: val.po_prepartion,
                po_complete: val.po_complete,
                po_complete_date: val.po_complete_date,
                po_approva_level_one: val.po_approva_level_one,
                po_approva_level_two: val.po_approva_level_two,
                po_to_supplier: val.po_to_supplier,
                store_receive: val.store_receive,
                dept_name: val.dept_name,
                dept_type: val.dept_type
            }
            return obj
        })

        setDisArray(datas)
        setOpen(false)
    } else {
        setDisArray([])
        setOpen(false)
    }
}


export const getSMOAppvalPending = async (setDisArray, setOpen) => {
    const result = await axioslogin.get('/CrmNewApprovals/getSMOAppvalPending')
    const { success, data } = result.data
    if (success === 1) {
        const datas = data.map((val) => {
            const obj = {
                req_status: val.req_status,
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
                higher: val.gm_approve !== null ? 1 : val.md_approve !== null ? 1 : val.ed_approve !== null ? 1 : 0,
                now_who: val.sub_store_recieve === 1 ? "Sub Store Receive" :
                    val.store_receive === 1 ? "CRS Store Receive" :
                        val.po_to_supplier === 1 ? "PO Send to Supplier" :
                            val.po_approva_level_two === 1 ? "PO Managing Director Approved" :
                                val.po_approva_level_one === 1 ? "PO Purchase Level Approved" :
                                    val.po_complete === 1 ? "PO Completed" :
                                        val.po_prepartion === 1 ? "PO Prepairing" :
                                            val.quatation_fixing === 1 ? "Quatation Fixed" :
                                                val.quatation_negotiation === 1 ? "Quatation Negotiation" :
                                                    val.quatation_calling_status === 1 ? "Quatation Calling" :
                                                        val.ack_status === 1 ? "Puchase Acknowledged" :
                                                            val.ed_approve !== null ? "ED" :
                                                                val.md_approve !== null ? "MD" :
                                                                    val.gm_approve !== null ? "GM" :
                                                                        val.senior_manage_approv !== null ? "SMO" :
                                                                            val.manag_operation_approv !== null ? "MO" :
                                                                                val.ms_approve !== null ? "MS" :
                                                                                    val.dms_approve !== null ? "DMS" :
                                                                                        val.hod_approve !== null ? "HOD" :
                                                                                            val.incharge_approve !== null ? "INCHARGE" :
                                                                                                "Not Statrted",
                now_who_status: val.sub_store_recieve === 1 ? 4 :
                    val.store_receive === 1 ? 4 :
                        val.po_to_supplier === 1 ? val.po_to_supplier :
                            val.po_approva_level_two === 1 ? val.po_approva_level_two :
                                val.po_approva_level_one === 1 ? val.po_approva_level_one :
                                    val.po_complete === 1 ? val.po_complete :
                                        val.po_prepartion === 1 ? val.po_prepartion :
                                            val.quatation_fixing === 1 ? val.quatation_fixing :
                                                val.quatation_negotiation === 1 ? val.quatation_negotiation :
                                                    val.quatation_calling_status === 1 ? val.quatation_calling_status :
                                                        val.ack_status === 1 ? val.ack_status :
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
                ack_status: val.ack_status,
                ack_remarks: val.ack_remarks,
                quatation_calling_status: val.quatation_calling_status,
                quatation_calling_date: val.quatation_calling_date,
                quatation_negotiation: val.quatation_negotiation,
                quatation_negotiation_date: val.quatation_negotiation_date,
                quatation_fixing: val.quatation_fixing,
                quatation_fixing_date: val.quatation_fixing_date,
                po_prepartion: val.po_prepartion,
                po_complete: val.po_complete,
                po_complete_date: val.po_complete_date,
                po_approva_level_one: val.po_approva_level_one,
                po_approva_level_two: val.po_approva_level_two,
                po_to_supplier: val.po_to_supplier,
                store_receive: val.store_receive,
                dept_name: val.dept_name,
                dept_type: val.dept_type
            }
            return obj
        })

        setDisArray(datas)
        setOpen(false)
    }
    else {
        setDisArray([])
        setOpen(false)
    }
}

export const AllListForSMOApi = async (setDisArray, setOpen) => {
    const result = await axioslogin.get('/CrmNewApprovals/getAllReqListNotAck')
    const { success, data } = result.data
    if (success === 1) {
        const datas = data.map((val) => {
            const obj = {
                req_status: val.req_status,
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
                higher: val.gm_approve !== null ? 1 : val.md_approve !== null ? 1 : val.ed_approve !== null ? 1 : 0,
                now_who: val.sub_store_recieve === 1 ? "Sub Store Receive" :
                    val.store_receive === 1 ? "CRS Store Receive" :
                        val.po_to_supplier === 1 ? "PO Send to Supplier" :
                            val.po_approva_level_two === 1 ? "PO Managing Director Approved" :
                                val.po_approva_level_one === 1 ? "PO Purchase Level Approved" :
                                    val.po_complete === 1 ? "PO Completed" :
                                        val.po_prepartion === 1 ? "PO Prepairing" :
                                            val.quatation_fixing === 1 ? "Quatation Fixed" :
                                                val.quatation_negotiation === 1 ? "Quatation Negotiation" :
                                                    val.quatation_calling_status === 1 ? "Quatation Calling" :
                                                        val.ack_status === 1 ? "Puchase Acknowledged" :
                                                            val.ed_approve !== null ? "ED" :
                                                                val.md_approve !== null ? "MD" :
                                                                    val.gm_approve !== null ? "GM" :
                                                                        val.senior_manage_approv !== null ? "SMO" :
                                                                            val.manag_operation_approv !== null ? "MO" :
                                                                                val.ms_approve !== null ? "MS" :
                                                                                    val.dms_approve !== null ? "DMS" :
                                                                                        val.hod_approve !== null ? "HOD" :
                                                                                            val.incharge_approve !== null ? "INCHARGE" :
                                                                                                "Not Statrted",
                now_who_status: val.sub_store_recieve === 1 ? 4 :
                    val.store_receive === 1 ? 4 :
                        val.po_to_supplier === 1 ? val.po_to_supplier :
                            val.po_approva_level_two === 1 ? val.po_approva_level_two :
                                val.po_approva_level_one === 1 ? val.po_approva_level_one :
                                    val.po_complete === 1 ? val.po_complete :
                                        val.po_prepartion === 1 ? val.po_prepartion :
                                            val.quatation_fixing === 1 ? val.quatation_fixing :
                                                val.quatation_negotiation === 1 ? val.quatation_negotiation :
                                                    val.quatation_calling_status === 1 ? val.quatation_calling_status :
                                                        val.ack_status === 1 ? val.ack_status :
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
                ack_status: val.ack_status,
                ack_remarks: val.ack_remarks,
                quatation_calling_status: val.quatation_calling_status,
                quatation_calling_date: val.quatation_calling_date,
                quatation_negotiation: val.quatation_negotiation,
                quatation_negotiation_date: val.quatation_negotiation_date,
                quatation_fixing: val.quatation_fixing,
                quatation_fixing_date: val.quatation_fixing_date,
                po_prepartion: val.po_prepartion,
                po_complete: val.po_complete,
                po_complete_date: val.po_complete_date,
                po_approva_level_one: val.po_approva_level_one,
                po_approva_level_two: val.po_approva_level_two,
                po_to_supplier: val.po_to_supplier,
                store_receive: val.store_receive,
                dept_name: val.dept_name,
                dept_type: val.dept_type
            }
            return obj
        })

        setDisArray(datas)
        setOpen(false)
    } else {
        setDisArray([])
        setOpen(false)
    }
}


export const getGMAppvalPending = async (setDisArray, setOpen) => {
    const result = await axioslogin.get('/CrmNewApprovals/getGMAppvalPending')
    const { success, data } = result.data
    if (success === 1) {
        const datas = data.map((val) => {
            const obj = {
                req_status: val.req_status,
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
                hod_detial_analysis: val.hod_detial_analysis !== null ? val.hod_detial_analysis : "Not Done",
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
                md_approve_remarks: val.md_approve_remarks !== null ? val.md_approve_remarks : "Not Updated",
                md_approve_date: val.md_approve_date,
                md_user: val.md_user !== null ? val.md_user.toLowerCase() : '',
                ed_approve: val.ed_approve,
                ed: val.ed_approve === 1 ? "Approved" : val.ed_approve === 2 ? "Reject" :
                    val.ed_approve === 3 ? "On-Hold" : "Not Done",
                ed_approve_remarks: val.ed_approve_remarks !== null ? val.ed_approve_remarks : "Not Updated",
                ed_approve_date: val.ed_approve_date,
                ed_user: val.ed_user ? val.ed_user.toLowerCase() : '',
                higher: val.md_approve !== null ? 1 : val.ed_approve !== null ? 1 : 0,
                now_who: val.sub_store_recieve === 1 ? "Sub Store Receive" :
                    val.store_receive === 1 ? "CRS Store Receive" :
                        val.po_to_supplier === 1 ? "PO Send to Supplier" :
                            val.po_approva_level_two === 1 ? "PO Managing Director Approved" :
                                val.po_approva_level_one === 1 ? "PO Purchase Level Approved" :
                                    val.po_complete === 1 ? "PO Completed" :
                                        val.po_prepartion === 1 ? "PO Prepairing" :
                                            val.quatation_fixing === 1 ? "Quatation Fixed" :
                                                val.quatation_negotiation === 1 ? "Quatation Negotiation" :
                                                    val.quatation_calling_status === 1 ? "Quatation Calling" :
                                                        val.ack_status === 1 ? "Puchase Acknowledged" :
                                                            val.ed_approve !== null ? "ED" :
                                                                val.md_approve !== null ? "MD" :
                                                                    val.gm_approve !== null ? "GM" :
                                                                        val.senior_manage_approv !== null ? "SMO" :
                                                                            val.manag_operation_approv !== null ? "MO" :
                                                                                val.ms_approve !== null ? "MS" :
                                                                                    val.dms_approve !== null ? "DMS" :
                                                                                        val.hod_approve !== null ? "HOD" :
                                                                                            val.incharge_approve !== null ? "INCHARGE" :
                                                                                                "Not Statrted",
                now_who_status: val.sub_store_recieve === 1 ? 4 :
                    val.store_receive === 1 ? 4 :
                        val.po_to_supplier === 1 ? val.po_to_supplier :
                            val.po_approva_level_two === 1 ? val.po_approva_level_two :
                                val.po_approva_level_one === 1 ? val.po_approva_level_one :
                                    val.po_complete === 1 ? val.po_complete :
                                        val.po_prepartion === 1 ? val.po_prepartion :
                                            val.quatation_fixing === 1 ? val.quatation_fixing :
                                                val.quatation_negotiation === 1 ? val.quatation_negotiation :
                                                    val.quatation_calling_status === 1 ? val.quatation_calling_status :
                                                        val.ack_status === 1 ? val.ack_status :
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
                ack_status: val.ack_status,
                ack_remarks: val.ack_remarks,
                quatation_calling_status: val.quatation_calling_status,
                quatation_calling_date: val.quatation_calling_date,
                quatation_negotiation: val.quatation_negotiation,
                quatation_negotiation_date: val.quatation_negotiation_date,
                quatation_fixing: val.quatation_fixing,
                quatation_fixing_date: val.quatation_fixing_date,
                po_prepartion: val.po_prepartion,
                po_complete: val.po_complete,
                po_complete_date: val.po_complete_date,
                po_approva_level_one: val.po_approva_level_one,
                po_approva_level_two: val.po_approva_level_two,
                po_to_supplier: val.po_to_supplier,
                store_receive: val.store_receive,
                dept_name: val.dept_name,
                dept_type: val.dept_type
            }
            return obj
        })

        setDisArray(datas)
        setOpen(false)
    }
    else {
        setDisArray([])
        setOpen(false)
    }
}

export const AllListForGMApi = async (setDisArray, setOpen) => {
    const result = await axioslogin.get('/CrmNewApprovals/getAllReqListNotAck')
    const { success, data } = result.data
    if (success === 1) {
        const datas = data.map((val) => {
            const obj = {
                req_status: val.req_status,
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
                hod_detial_analysis: val.hod_detial_analysis !== null ? val.hod_detial_analysis : "Not Done",
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
                md_approve_remarks: val.md_approve_remarks !== null ? val.md_approve_remarks : "Not Updated",
                md_approve_date: val.md_approve_date,
                md_user: val.md_user !== null ? val.md_user.toLowerCase() : '',
                ed_approve: val.ed_approve,
                ed: val.ed_approve === 1 ? "Approved" : val.ed_approve === 2 ? "Reject" :
                    val.ed_approve === 3 ? "On-Hold" : "Not Done",
                ed_approve_remarks: val.ed_approve_remarks !== null ? val.ed_approve_remarks : "Not Updated",
                ed_approve_date: val.ed_approve_date,
                ed_user: val.ed_user ? val.ed_user.toLowerCase() : '',
                higher: val.md_approve !== null ? 1 : val.ed_approve !== null ? 1 : 0,
                now_who: val.sub_store_recieve === 1 ? "Sub Store Receive" :
                    val.store_receive === 1 ? "CRS Store Receive" :
                        val.po_to_supplier === 1 ? "PO Send to Supplier" :
                            val.po_approva_level_two === 1 ? "PO Managing Director Approved" :
                                val.po_approva_level_one === 1 ? "PO Purchase Level Approved" :
                                    val.po_complete === 1 ? "PO Completed" :
                                        val.po_prepartion === 1 ? "PO Prepairing" :
                                            val.quatation_fixing === 1 ? "Quatation Fixed" :
                                                val.quatation_negotiation === 1 ? "Quatation Negotiation" :
                                                    val.quatation_calling_status === 1 ? "Quatation Calling" :
                                                        val.ack_status === 1 ? "Puchase Acknowledged" :
                                                            val.ed_approve !== null ? "ED" :
                                                                val.md_approve !== null ? "MD" :
                                                                    val.gm_approve !== null ? "GM" :
                                                                        val.senior_manage_approv !== null ? "SMO" :
                                                                            val.manag_operation_approv !== null ? "MO" :
                                                                                val.ms_approve !== null ? "MS" :
                                                                                    val.dms_approve !== null ? "DMS" :
                                                                                        val.hod_approve !== null ? "HOD" :
                                                                                            val.incharge_approve !== null ? "INCHARGE" :
                                                                                                "Not Statrted",
                now_who_status: val.sub_store_recieve === 1 ? 4 :
                    val.store_receive === 1 ? 4 :
                        val.po_to_supplier === 1 ? val.po_to_supplier :
                            val.po_approva_level_two === 1 ? val.po_approva_level_two :
                                val.po_approva_level_one === 1 ? val.po_approva_level_one :
                                    val.po_complete === 1 ? val.po_complete :
                                        val.po_prepartion === 1 ? val.po_prepartion :
                                            val.quatation_fixing === 1 ? val.quatation_fixing :
                                                val.quatation_negotiation === 1 ? val.quatation_negotiation :
                                                    val.quatation_calling_status === 1 ? val.quatation_calling_status :
                                                        val.ack_status === 1 ? val.ack_status :
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
                ack_status: val.ack_status,
                ack_remarks: val.ack_remarks,
                quatation_calling_status: val.quatation_calling_status,
                quatation_calling_date: val.quatation_calling_date,
                quatation_negotiation: val.quatation_negotiation,
                quatation_negotiation_date: val.quatation_negotiation_date,
                quatation_fixing: val.quatation_fixing,
                quatation_fixing_date: val.quatation_fixing_date,
                po_prepartion: val.po_prepartion,
                po_complete: val.po_complete,
                po_complete_date: val.po_complete_date,
                po_approva_level_one: val.po_approva_level_one,
                po_approva_level_two: val.po_approva_level_two,
                po_to_supplier: val.po_to_supplier,
                store_receive: val.store_receive,
                dept_name: val.dept_name,
                dept_type: val.dept_type
            }
            return obj
        })

        setDisArray(datas)
        setOpen(false)
    } else {
        setDisArray([])
        setOpen(false)
    }
}


export const getEDAppvalPending = async (setDisArray, setOpen) => {
    const result = await axioslogin.get('/CrmNewApprovals/getEDAppvalPending')
    const { success, data } = result.data
    if (success === 1) {
        const datas = data.map((val) => {
            const obj = {
                req_status: val.req_status,
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
                gm_approve_remarks: val.gm_approve_remarks !== null ? val.gm_approve_remarks : "Not Updated",
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
                higher: 0,
                now_who: val.sub_store_recieve === 1 ? "Sub Store Receive" :
                    val.store_receive === 1 ? "CRS Store Receive" :
                        val.po_to_supplier === 1 ? "PO Send to Supplier" :
                            val.po_approva_level_two === 1 ? "PO Managing Director  Approved" :
                                val.po_approva_level_one === 1 ? "PO Purchase Level Approved" :
                                    val.po_complete === 1 ? "PO Completed" :
                                        val.po_prepartion === 1 ? "PO Prepairing" :
                                            val.quatation_fixing === 1 ? "Quatation Fixed" :
                                                val.quatation_negotiation === 1 ? "Quatation Negotiation" :
                                                    val.quatation_calling_status === 1 ? "Quatation Calling" :
                                                        val.ack_status === 1 ? "Puchase Acknowledged" :
                                                            val.ed_approve !== null ? "ED" :
                                                                val.md_approve !== null ? "MD" :
                                                                    val.gm_approve !== null ? "GM" :
                                                                        val.senior_manage_approv !== null ? "SMO" :
                                                                            val.manag_operation_approv !== null ? "MO" :
                                                                                val.ms_approve !== null ? "MS" :
                                                                                    val.dms_approve !== null ? "DMS" :
                                                                                        val.hod_approve !== null ? "HOD" :
                                                                                            val.incharge_approve !== null ? "INCHARGE" :
                                                                                                "Not Statrted",
                now_who_status: val.sub_store_recieve === 1 ? 4 :
                    val.store_receive === 1 ? 4 :
                        val.po_to_supplier === 1 ? val.po_to_supplier :
                            val.po_approva_level_two === 1 ? val.po_approva_level_two :
                                val.po_approva_level_one === 1 ? val.po_approva_level_one :
                                    val.po_complete === 1 ? val.po_complete :
                                        val.po_prepartion === 1 ? val.po_prepartion :
                                            val.quatation_fixing === 1 ? val.quatation_fixing :
                                                val.quatation_negotiation === 1 ? val.quatation_negotiation :
                                                    val.quatation_calling_status === 1 ? val.quatation_calling_status :
                                                        val.ack_status === 1 ? val.ack_status :
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
                ack_status: val.ack_status,
                ack_remarks: val.ack_remarks,
                quatation_calling_status: val.quatation_calling_status,
                quatation_calling_date: val.quatation_calling_date,
                quatation_negotiation: val.quatation_negotiation,
                quatation_negotiation_date: val.quatation_negotiation_date,
                quatation_fixing: val.quatation_fixing,
                quatation_fixing_date: val.quatation_fixing_date,
                po_prepartion: val.po_prepartion,
                po_complete: val.po_complete,
                po_complete_date: val.po_complete_date,
                po_approva_level_one: val.po_approva_level_one,
                po_approva_level_two: val.po_approva_level_two,
                po_to_supplier: val.po_to_supplier,
                store_receive: val.store_receive,
                dept_name: val.dept_name,
                dept_type: val.dept_type


            }
            return obj
        })

        setDisArray(datas)
        setOpen(false)
    }
    else {
        setDisArray([])
        setOpen(false)
    }
}

export const AllListForEDApi = async (setDisArray, setOpen) => {
    const result = await axioslogin.get('/CrmNewApprovals/getAllReqListNotAck')
    const { success, data } = result.data
    if (success === 1) {
        const datas = data.map((val) => {
            const obj = {
                req_status: val.req_status,
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
                gm_approve_remarks: val.gm_approve_remarks !== null ? val.gm_approve_remarks : "Not Updated",
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
                higher: 0,
                now_who: val.sub_store_recieve === 1 ? "Sub Store Receive" :
                    val.store_receive === 1 ? "CRS Store Receive" :
                        val.po_to_supplier === 1 ? "PO Send to Supplier" :
                            val.po_approva_level_two === 1 ? "PO Managing Director  Approved" :
                                val.po_approva_level_one === 1 ? "PO Purchase Level Approved" :
                                    val.po_complete === 1 ? "PO Completed" :
                                        val.po_prepartion === 1 ? "PO Prepairing" :
                                            val.quatation_fixing === 1 ? "Quatation Fixed" :
                                                val.quatation_negotiation === 1 ? "Quatation Negotiation" :
                                                    val.quatation_calling_status === 1 ? "Quatation Calling" :
                                                        val.ack_status === 1 ? "Puchase Acknowledged" :
                                                            val.ed_approve !== null ? "ED" :
                                                                val.md_approve !== null ? "MD" :
                                                                    val.gm_approve !== null ? "GM" :
                                                                        val.senior_manage_approv !== null ? "SMO" :
                                                                            val.manag_operation_approv !== null ? "MO" :
                                                                                val.ms_approve !== null ? "MS" :
                                                                                    val.dms_approve !== null ? "DMS" :
                                                                                        val.hod_approve !== null ? "HOD" :
                                                                                            val.incharge_approve !== null ? "INCHARGE" :
                                                                                                "Not Statrted",
                now_who_status: val.sub_store_recieve === 1 ? 4 :
                    val.store_receive === 1 ? 4 :
                        val.po_to_supplier === 1 ? val.po_to_supplier :
                            val.po_approva_level_two === 1 ? val.po_approva_level_two :
                                val.po_approva_level_one === 1 ? val.po_approva_level_one :
                                    val.po_complete === 1 ? val.po_complete :
                                        val.po_prepartion === 1 ? val.po_prepartion :
                                            val.quatation_fixing === 1 ? val.quatation_fixing :
                                                val.quatation_negotiation === 1 ? val.quatation_negotiation :
                                                    val.quatation_calling_status === 1 ? val.quatation_calling_status :
                                                        val.ack_status === 1 ? val.ack_status :
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
                ack_status: val.ack_status,
                ack_remarks: val.ack_remarks,
                quatation_calling_status: val.quatation_calling_status,
                quatation_calling_date: val.quatation_calling_date,
                quatation_negotiation: val.quatation_negotiation,
                quatation_negotiation_date: val.quatation_negotiation_date,
                quatation_fixing: val.quatation_fixing,
                quatation_fixing_date: val.quatation_fixing_date,
                po_prepartion: val.po_prepartion,
                po_complete: val.po_complete,
                po_complete_date: val.po_complete_date,
                po_approva_level_one: val.po_approva_level_one,
                po_approva_level_two: val.po_approva_level_two,
                po_to_supplier: val.po_to_supplier,
                store_receive: val.store_receive,
                dept_name: val.dept_name,
                dept_type: val.dept_type

            }
            return obj
        })

        setDisArray(datas)
        setOpen(false)
    } else {
        setDisArray([])
        setOpen(false)
    }
}

export const getMDAppvalPending = async (setDisArray, setOpen) => {
    const result = await axioslogin.get('/CrmNewApprovals/getMDAppvalPending')
    const { success, data } = result.data
    if (success === 1) {
        const datas = data.map((val) => {
            const obj = {
                req_status: val.req_status,
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
                gm_approve_remarks: val.gm_approve_remarks !== null ? val.gm_approve_remarks : "Not Updated",
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
                ed_approve_remarks: val.ed_approve_remarks !== null ? val.ed_approve_remarks : "Not Updated",
                ed_approve_date: val.ed_approve_date,
                ed_user: val.ed_user ? val.ed_user.toLowerCase() : '',
                ed_detial_analysis: val.ed_detial_analysis,
                higher: 0,
                now_who: val.sub_store_recieve === 1 ? "Sub Store Receive" :
                    val.store_receive === 1 ? "CRS Store Receive" :
                        val.po_to_supplier === 1 ? "PO Send to Supplier" :
                            val.po_approva_level_two === 1 ? "PO Managing Director Approved" :
                                val.po_approva_level_one === 1 ? "PO Purchase Level Approved" :
                                    val.po_complete === 1 ? "PO Completed" :
                                        val.po_prepartion === 1 ? "PO Prepairing" :
                                            val.quatation_fixing === 1 ? "Quatation Fixed" :
                                                val.quatation_negotiation === 1 ? "Quatation Negotiation" :
                                                    val.quatation_calling_status === 1 ? "Quatation Calling" :
                                                        val.ack_status === 1 ? "Puchase Acknowledged" :
                                                            val.ed_approve !== null ? "ED" :
                                                                val.md_approve !== null ? "MD" :
                                                                    val.gm_approve !== null ? "GM" :
                                                                        val.senior_manage_approv !== null ? "SMO" :
                                                                            val.manag_operation_approv !== null ? "MO" :
                                                                                val.ms_approve !== null ? "MS" :
                                                                                    val.dms_approve !== null ? "DMS" :
                                                                                        val.hod_approve !== null ? "HOD" :
                                                                                            val.incharge_approve !== null ? "INCHARGE" :
                                                                                                "Not Statrted",
                now_who_status: val.sub_store_recieve === 1 ? 4 :
                    val.store_receive === 1 ? 4 :
                        val.po_to_supplier === 1 ? val.po_to_supplier :
                            val.po_approva_level_two === 1 ? val.po_approva_level_two :
                                val.po_approva_level_one === 1 ? val.po_approva_level_one :
                                    val.po_complete === 1 ? val.po_complete :
                                        val.po_prepartion === 1 ? val.po_prepartion :
                                            val.quatation_fixing === 1 ? val.quatation_fixing :
                                                val.quatation_negotiation === 1 ? val.quatation_negotiation :
                                                    val.quatation_calling_status === 1 ? val.quatation_calling_status :
                                                        val.ack_status === 1 ? val.ack_status :
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
                ack_status: val.ack_status,
                ack_remarks: val.ack_remarks,
                quatation_calling_status: val.quatation_calling_status,
                quatation_calling_date: val.quatation_calling_date,
                quatation_negotiation: val.quatation_negotiation,
                quatation_negotiation_date: val.quatation_negotiation_date,
                quatation_fixing: val.quatation_fixing,
                quatation_fixing_date: val.quatation_fixing_date,
                po_prepartion: val.po_prepartion,
                po_complete: val.po_complete,
                po_complete_date: val.po_complete_date,
                po_approva_level_one: val.po_approva_level_one,
                po_approva_level_two: val.po_approva_level_two,
                po_to_supplier: val.po_to_supplier,
                store_receive: val.store_receive,
                dept_name: val.dept_name,
                dept_type: val.dept_type

            }
            return obj
        })

        setDisArray(datas)
        setOpen(false)
    }
    else {
        setDisArray([])
        setOpen(false)
    }
}

export const AllListForMDApi = async (setDisArray, setOpen) => {
    const result = await axioslogin.get('/CrmNewApprovals/getAllReqListNotAck')
    const { success, data } = result.data
    if (success === 1) {
        const datas = data.map((val) => {
            const obj = {
                req_status: val.req_status,
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
                gm_approve_remarks: val.gm_approve_remarks !== null ? val.gm_approve_remarks : "Not Updated",
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
                ed_approve_remarks: val.ed_approve_remarks !== null ? val.ed_approve_remarks : "Not Updated",
                ed_approve_date: val.ed_approve_date,
                ed_user: val.ed_user ? val.ed_user.toLowerCase() : '',
                ed_detial_analysis: val.ed_detial_analysis,
                higher: 0,
                now_who: val.sub_store_recieve === 1 ? "Sub Store Receive" :
                    val.store_receive === 1 ? "CRS Store Receive" :
                        val.po_to_supplier === 1 ? "PO Send to Supplier" :
                            val.po_approva_level_two === 1 ? "PO Managing Director Approved" :
                                val.po_approva_level_one === 1 ? "PO Purchase Level Approved" :
                                    val.po_complete === 1 ? "PO Completed" :
                                        val.po_prepartion === 1 ? "PO Prepairing" :
                                            val.quatation_fixing === 1 ? "Quatation Fixed" :
                                                val.quatation_negotiation === 1 ? "Quatation Negotiation" :
                                                    val.quatation_calling_status === 1 ? "Quatation Calling" :
                                                        val.ack_status === 1 ? "Puchase Acknowledged" :
                                                            val.ed_approve !== null ? "ED" :
                                                                val.md_approve !== null ? "MD" :
                                                                    val.gm_approve !== null ? "GM" :
                                                                        val.senior_manage_approv !== null ? "SMO" :
                                                                            val.manag_operation_approv !== null ? "MO" :
                                                                                val.ms_approve !== null ? "MS" :
                                                                                    val.dms_approve !== null ? "DMS" :
                                                                                        val.hod_approve !== null ? "HOD" :
                                                                                            val.incharge_approve !== null ? "INCHARGE" :
                                                                                                "Not Statrted",
                now_who_status: val.sub_store_recieve === 1 ? 4 :
                    val.store_receive === 1 ? 4 :
                        val.po_to_supplier === 1 ? val.po_to_supplier :
                            val.po_approva_level_two === 1 ? val.po_approva_level_two :
                                val.po_approva_level_one === 1 ? val.po_approva_level_one :
                                    val.po_complete === 1 ? val.po_complete :
                                        val.po_prepartion === 1 ? val.po_prepartion :
                                            val.quatation_fixing === 1 ? val.quatation_fixing :
                                                val.quatation_negotiation === 1 ? val.quatation_negotiation :
                                                    val.quatation_calling_status === 1 ? val.quatation_calling_status :
                                                        val.ack_status === 1 ? val.ack_status :
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
                ack_status: val.ack_status,
                ack_remarks: val.ack_remarks,
                quatation_calling_status: val.quatation_calling_status,
                quatation_calling_date: val.quatation_calling_date,
                quatation_negotiation: val.quatation_negotiation,
                quatation_negotiation_date: val.quatation_negotiation_date,
                quatation_fixing: val.quatation_fixing,
                quatation_fixing_date: val.quatation_fixing_date,
                po_prepartion: val.po_prepartion,
                po_complete: val.po_complete,
                po_complete_date: val.po_complete_date,
                po_approva_level_one: val.po_approva_level_one,
                po_approva_level_two: val.po_approva_level_two,
                po_to_supplier: val.po_to_supplier,
                store_receive: val.store_receive,
                dept_name: val.dept_name,
                dept_type: val.dept_type
            }
            return obj
        })

        setDisArray(datas)
        setOpen(false)
    } else {
        setDisArray([])
        setOpen(false)
    }
}

export const getCrsReceicePending = async (setDisData, setOpen) => {
    const result = await axioslogin.get('/newCRFStore/getCRSStorePending')
    const { success, data } = result.data
    if (success === 1) {
        const datas = data.map((val) => {
            const obj = {
                req_slno: val.req_slno,
                actual_requirement: val.actual_requirement,
                needed: val.needed,
                request_deptsec_slno: val.request_deptsec_slno,
                req_deptsec: val.req_deptsec.toLowerCase(),
                user_deptsection: val.user_deptsection.toLowerCase(),
                em_name: val.create_user.toLowerCase(),
                category: val.category,
                req_date: val.create_date,
                expected_date: val.expected_delivery,
                store_receive: val.store_receive,

            }
            return obj
        })

        setDisData(datas)
        setOpen(false)
    }
    else {
        setDisData([])
        setOpen(false)
    }
}

export const getCrsReceiceAllList = async (setDisData, setOpen) => {
    const result = await axioslogin.get('/newCRFStore/getCrsReceiceAllList')
    const { success, data, message } = result.data
    if (success === 1) {
        const datas = data.map((val) => {
            const obj = {
                req_slno: val.req_slno,
                actual_requirement: val.actual_requirement,
                needed: val.needed,
                request_deptsec_slno: val.request_deptsec_slno,
                req_deptsec: val.req_deptsec.toLowerCase(),
                user_deptsection: val.user_deptsection.toLowerCase(),
                em_name: val.create_user.toLowerCase(),
                category: val.category,
                req_date: val.create_date,
                expected_date: val.expected_delivery,
                store_receive: val.store_receive,

            }
            return obj
        })

        setDisData(datas)
        setOpen(false)
    }
    else {
        infoNotify(message)
        setDisData([])
        setOpen(false)
    }
}

export const getSubStorePendingList = async (substoreSlno, setDisData, setOpen) => {
    const result = await axioslogin.get(`/newCRFStore/getPOListSubStorewisePend/${substoreSlno}`)
    const { success, data } = result.data
    if (success === 1) {
        const datas = data.map((val, index) => {
            const obj = {
                slno: index + 1,
                po_detail_slno: val.po_detail_slno,
                req_slno: val.req_slno,
                po_number: val.po_number,
                po_date: val.po_date,
                expected_delivery: val.expected_delivery,
                supply_store: val.supply_store,
                sub_store_name: val.sub_store_name,
                main_store_slno: val.main_store_slno,
                main_store: val.main_store,
                store_code: val.store_code,
                store_recieve: val.store_recieve,
                store_receive_user: val.store_receive_user,
                store_receive_date: val.store_receive_date,
                sub_store_recieve: val.sub_store_recieve,
                sub_store_recieve_user: val.sub_store_recieve_user,
                sub_store_date: val.sub_store_date,
                req_deptsec: val.req_deptsec,
                user_deptsection: val.user_deptsection,
                actual_requirement: val.actual_requirement,
                needed: val.needed,
                expected_date: val.expected_date,
                req_date: val.req_date

            }
            return obj

        })
        setDisData(datas)
        setOpen(false)
    }
    else {
        setDisData([])
        setOpen(false)
    }
}

export const getPOListSubStorewiseAllList = async (substoreSlno, setDisData, setOpen) => {
    const result = await axioslogin.get(`/newCRFStore/getPOListSubStorewiseAllList/${substoreSlno}`)
    const { success, data } = result.data
    if (success === 1) {
        const datas = data.map((val, index) => {
            const obj = {
                slno: index + 1,
                po_detail_slno: val.po_detail_slno,
                req_slno: val.req_slno,
                po_number: val.po_number,
                po_date: val.po_date,
                expected_delivery: val.expected_delivery,
                supply_store: val.supply_store,
                sub_store_name: val.sub_store_name,
                main_store_slno: val.main_store_slno,
                main_store: val.main_store,
                store_code: val.store_code,
                store_recieve: val.store_recieve,
                store_receive_user: val.store_receive_user,
                store_receive_date: val.store_receive_date,
                sub_store_recieve: val.sub_store_recieve,
                sub_store_recieve_user: val.sub_store_recieve_user,
                sub_store_date: val.sub_store_date,
                req_deptsec: val.req_deptsec,
                user_deptsection: val.user_deptsection,
                actual_requirement: val.actual_requirement,
                needed: val.needed,
                expected_date: val.expected_date,
                req_date: val.req_date

            }
            return obj

        })
        setDisData(datas)
        setOpen(false)
    }
    else {
        setDisData([])
        setOpen(false)
    }
}


export const RejectListApiDateRange = async (postdata, setDisArray, setOpen) => {
    const result = await axioslogin.post('/CrmNewApprovals/getRejectedReqListdateRange', postdata);
    const { success, data } = result.data
    if (success === 1) {
        const datas = data.map((val) => {
            const obj = {
                req_status: val.req_status,
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
                manag_operation_remarks: val.manag_operation_remarks,
                om_detial_analysis: val.om_detial_analysis,
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
                higher: 0,
                now_who:
                    val.sub_store_recieve === 1 ? "Sub Store Receive" :
                        val.store_receive === 1 ? "CRS Store Receive" :
                            val.po_to_supplier === 1 ? "PO Send to Supplier" :
                                val.po_approva_level_two === 1 ? "PO Managing Director Approved" :
                                    val.po_approva_level_one === 1 ? "PO Purchase Level Approved" :
                                        val.po_complete === 1 ? "PO Completed" :
                                            val.po_prepartion === 1 ? "PO Prepairing" :
                                                val.quatation_fixing === 1 ? "Quatation Fixed" :
                                                    val.quatation_negotiation === 1 ? "Quatation Negotiation" :
                                                        val.quatation_calling_status === 1 ? "Quatation Calling" :
                                                            val.ack_status === 1 ? "Puchase Acknowledged" :
                                                                val.ed_approve !== null ? "ED" :
                                                                    val.md_approve !== null ? "MD" :
                                                                        val.gm_approve !== null ? "GM" :
                                                                            val.senior_manage_approv !== null ? "SMO" :
                                                                                val.manag_operation_approv !== null ? "MO" :
                                                                                    val.ms_approve !== null ? "MS" :
                                                                                        val.dms_approve !== null ? "DMS" :
                                                                                            val.hod_approve !== null ? "HOD" :
                                                                                                val.incharge_approve !== null ? "INCHARGE" :
                                                                                                    "Not Statrted",
                now_who_status: val.sub_store_recieve === 1 ? 4 :
                    val.store_receive === 1 ? 4 :
                        val.po_to_supplier === 1 ? val.po_to_supplier :
                            val.po_approva_level_two === 1 ? val.po_approva_level_two :
                                val.po_approva_level_one === 1 ? val.po_approva_level_one :
                                    val.po_complete === 1 ? val.po_complete :
                                        val.po_prepartion === 1 ? val.po_prepartion :
                                            val.quatation_fixing === 1 ? val.quatation_fixing :
                                                val.quatation_negotiation === 1 ? val.quatation_negotiation :
                                                    val.quatation_calling_status === 1 ? val.quatation_calling_status :
                                                        val.ack_status === 1 ? val.ack_status :
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
                ack_status: val.ack_status,
                ack_remarks: val.ack_remarks,
                quatation_calling_status: val.quatation_calling_status,
                quatation_calling_date: val.quatation_calling_date,
                quatation_negotiation: val.quatation_negotiation,
                quatation_negotiation_date: val.quatation_negotiation_date,
                quatation_fixing: val.quatation_fixing,
                quatation_fixing_date: val.quatation_fixing_date,
                po_prepartion: val.po_prepartion,
                po_complete: val.po_complete,
                po_complete_date: val.po_complete_date,
                po_approva_level_one: val.po_approva_level_one,
                po_approva_level_two: val.po_approva_level_two,
                po_to_supplier: val.po_to_supplier,
                store_receive: val.store_receive,
                dept_name: val.dept_name,
                dept_type: val.dept_type
            }
            return obj
        })

        setDisArray(datas)
        setOpen(false)
    }
    else {
        setDisArray([])
        setOpen(false)
    }
}



export const OnHoldListApiDateRange = async (postdata, setDisArray, setOpen) => {
    const result = await axioslogin.post('/CrmNewApprovals/OnHoldListApiDateRange', postdata);
    const { success, data } = result.data
    if (success === 1) {
        const datas = data.map((val) => {
            const obj = {
                req_status: val.req_status,
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
                manag_operation_remarks: val.manag_operation_remarks,
                om_detial_analysis: val.om_detial_analysis,
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
                higher: 0,
                now_who:
                    val.sub_store_recieve === 1 ? "Sub Store Receive" :
                        val.store_receive === 1 ? "CRS Store Receive" :
                            val.po_to_supplier === 1 ? "PO Send to Supplier" :
                                val.po_approva_level_two === 1 ? "PO Managing Director Approved" :
                                    val.po_approva_level_one === 1 ? "PO Purchase Level Approved" :
                                        val.po_complete === 1 ? "PO Completed" :
                                            val.po_prepartion === 1 ? "PO Prepairing" :
                                                val.quatation_fixing === 1 ? "Quatation Fixed" :
                                                    val.quatation_negotiation === 1 ? "Quatation Negotiation" :
                                                        val.quatation_calling_status === 1 ? "Quatation Calling" :
                                                            val.ack_status === 1 ? "Puchase Acknowledged" :
                                                                val.ed_approve !== null ? "ED" :
                                                                    val.md_approve !== null ? "MD" :
                                                                        val.gm_approve !== null ? "GM" :
                                                                            val.senior_manage_approv !== null ? "SMO" :
                                                                                val.manag_operation_approv !== null ? "MO" :
                                                                                    val.ms_approve !== null ? "MS" :
                                                                                        val.dms_approve !== null ? "DMS" :
                                                                                            val.hod_approve !== null ? "HOD" :
                                                                                                val.incharge_approve !== null ? "INCHARGE" :
                                                                                                    "Not Statrted",
                now_who_status: val.sub_store_recieve === 1 ? 4 :
                    val.store_receive === 1 ? 4 :
                        val.po_to_supplier === 1 ? val.po_to_supplier :
                            val.po_approva_level_two === 1 ? val.po_approva_level_two :
                                val.po_approva_level_one === 1 ? val.po_approva_level_one :
                                    val.po_complete === 1 ? val.po_complete :
                                        val.po_prepartion === 1 ? val.po_prepartion :
                                            val.quatation_fixing === 1 ? val.quatation_fixing :
                                                val.quatation_negotiation === 1 ? val.quatation_negotiation :
                                                    val.quatation_calling_status === 1 ? val.quatation_calling_status :
                                                        val.ack_status === 1 ? val.ack_status :
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
                ack_status: val.ack_status,
                ack_remarks: val.ack_remarks,
                quatation_calling_status: val.quatation_calling_status,
                quatation_calling_date: val.quatation_calling_date,
                quatation_negotiation: val.quatation_negotiation,
                quatation_negotiation_date: val.quatation_negotiation_date,
                quatation_fixing: val.quatation_fixing,
                quatation_fixing_date: val.quatation_fixing_date,
                po_prepartion: val.po_prepartion,
                po_complete: val.po_complete,
                po_complete_date: val.po_complete_date,
                po_approva_level_one: val.po_approva_level_one,
                po_approva_level_two: val.po_approva_level_two,
                po_to_supplier: val.po_to_supplier,
                store_receive: val.store_receive,
                dept_name: val.dept_name,
                dept_type: val.dept_type
            }
            return obj
        })

        setDisArray(datas)
        setOpen(false)
    }
    else {
        setDisArray([])
        setOpen(false)
    }
}
