export const getpurchaseAckPending = (state) => state.setCRMPurchaseAckPending.setCRMPurchaseAckPendingList;

export const PurchAckMapList = (CRMPurchaseAckPendingListAry) => {
    return new Promise((resolve, reject) => {
        try {
            const result = CRMPurchaseAckPendingListAry?.filter((val) => val.md_approve === 1 && val.ed_approve === 1).map((val) => {
                return {
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
                    edid: val.edid,
                    mdid: val.mdid,
                    now_who: "Not Statrted Purchase Process",
                    now_who_status: 0,
                    md_image: val.md_image,
                    ed_image: val.ed_image
                };
            });
            resolve({ status: true, data: result });
        } catch (error) {
            reject({ status: false, data: [] });
        }
    });
};


export const getData = (state) => state.setCRMPurchase.setCRMPurchaseList;


export const PurchaseAckDoneList = (getArray) => {
    return new Promise((resolve, reject) => {
        try {
            const result = getArray?.filter((val) => val.ack_status === 1 && val.quatation_calling_status === 0 &&
                val.po_prepartion === 0 && val.po_complete === 0).map((val) => {
                    return {
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

                        edid: val.edid,
                        mdid: val.mdid,

                        crm_purchase_slno: val.crm_purchase_slno,
                        ack_status: val.ack_status,
                        ack_remarks: val.ack_remarks,
                        purchase_ackuser: val.purchase_ackuser !== null ? val.purchase_ackuser.toLowerCase() : '',
                        ack_date: val.ack_date,
                        quatation_calling_status: val.quatation_calling_status,
                        quatation_calling_date: val.quatation_calling_date,
                        quatation_user: val.quatation_user !== null ? val.quatation_user.toLowerCase() : '',
                        quatation_calling_remarks: val.quatation_calling_remarks,

                        quatation_negotiation: val.quatation_negotiation,
                        quatation_negotiation_date: val.quatation_negotiation_date,
                        quatation_neguser: val.quatation_neguser !== null ? val.quatation_neguser.toLowerCase() : '',
                        quatation_negotiation_remarks: val.quatation_negotiation_remarks,

                        quatation_fixing: val.quatation_fixing,
                        quatation_fixing_date: val.quatation_fixing_date,
                        quatation_fixuser: val.quatation_fixuser !== null ? val.quatation_fixuser.toLowerCase() : '',
                        quatation_fixing_remarks: val.quatation_fixing_remarks,

                        po_prepartion: val.po_prepartion,
                        po_complete: val.po_complete,
                        po_approva_level_one: val.po_approva_level_one,
                        po_approva_level_two: val.po_approva_level_two,
                        po_to_supplier: val.po_to_supplier,
                        store_receive: val.store_receive,
                        now_who: val.po_to_supplier === 1 ? "PO Send to Supplier" :
                            val.po_approva_level_two === 1 ? "PO Managing Director Approved" :
                                val.po_approva_level_one === 1 ? "PO Purchase Level Approved" :
                                    val.po_complete === 1 ? "PO Completed" :
                                        val.po_prepartion === 1 ? "PO Prepairing" :
                                            val.quatation_fixing === 1 ? "Quatation Fixing" :
                                                val.quatation_negotiation === 1 ? "Quatation Negotiation" :
                                                    val.quatation_calling_status === 1 ? "Quatation Calling" :
                                                        val.ack_status === 1 ? "Po Acknowledged" :
                                                            "Not Statrted Purchase Process",
                        now_who_status: val.po_to_supplier === 1 ? val.po_to_supplier :
                            val.po_approva_level_two === 1 ? val.po_approva_level_two :
                                val.po_approva_level_one === 1 ? val.po_approva_level_one :
                                    val.po_complete === 1 ? val.po_complete :
                                        val.po_prepartion === 1 ? val.po_prepartion :
                                            val.quatation_fixing === 1 ? val.quatation_fixing :
                                                val.quatation_negotiation === 1 ? val.quatation_negotiation :
                                                    val.quatation_calling_status === 1 ? val.quatation_calling_status :
                                                        val.ack_status === 1 ? val.ack_status :
                                                            0,

                        md_image: val.md_image,
                        ed_image: val.ed_image
                    }
                })

            resolve({ status: true, data: result });
        } catch (error) {
            reject({ status: false, data: [] });

        }
    })
}


export const PurchaseQuatanNegotain = (getArray) => {
    return new Promise((resolve, reject) => {
        try {
            const result = getArray?.filter((val) => val.quatation_calling_status === 1 && val.quatation_negotiation === 0
            ).map((val) => {
                return {
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

                    edid: val.edid,
                    mdid: val.mdid,

                    crm_purchase_slno: val.crm_purchase_slno,
                    ack_status: val.ack_status,
                    ack_remarks: val.ack_remarks,
                    purchase_ackuser: val.purchase_ackuser !== null ? val.purchase_ackuser.toLowerCase() : '',
                    ack_date: val.ack_date,
                    quatation_calling_status: val.quatation_calling_status,
                    quatation_calling_date: val.quatation_calling_date,
                    quatation_user: val.quatation_user !== null ? val.quatation_user.toLowerCase() : '',
                    quatation_calling_remarks: val.quatation_calling_remarks,

                    quatation_negotiation: val.quatation_negotiation,
                    quatation_negotiation_date: val.quatation_negotiation_date,
                    quatation_neguser: val.quatation_neguser !== null ? val.quatation_neguser.toLowerCase() : '',
                    quatation_negotiation_remarks: val.quatation_negotiation_remarks,

                    quatation_fixing: val.quatation_fixing,
                    quatation_fixing_date: val.quatation_fixing_date,
                    quatation_fixuser: val.quatation_fixuser !== null ? val.quatation_fixuser.toLowerCase() : '',
                    quatation_fixing_remarks: val.quatation_fixing_remarks,

                    po_prepartion: val.po_prepartion,
                    po_complete: val.po_complete,
                    po_approva_level_one: val.po_approva_level_one,
                    po_approva_level_two: val.po_approva_level_two,
                    po_to_supplier: val.po_to_supplier,
                    store_receive: val.store_receive,
                    now_who: val.po_to_supplier === 1 ? "PO Send to Supplier" :
                        val.po_approva_level_two === 1 ? "PO Managing Director Approved" :
                            val.po_approva_level_one === 1 ? "PO Purchase Level Approved" :
                                val.po_complete === 1 ? "PO Completed" :
                                    val.po_prepartion === 1 ? "PO Prepairing" :
                                        val.quatation_fixing === 1 ? "Quatation Fixing" :
                                            val.quatation_negotiation === 1 ? "Quatation Negotiation" :
                                                val.quatation_calling_status === 1 ? "Quatation Calling" :
                                                    val.ack_status === 1 ? "Po Acknowledged" :
                                                        "Not Statrted Purchase Process",
                    now_who_status: val.po_to_supplier === 1 ? val.po_to_supplier :
                        val.po_approva_level_two === 1 ? val.po_approva_level_two :
                            val.po_approva_level_one === 1 ? val.po_approva_level_one :
                                val.po_complete === 1 ? val.po_complete :
                                    val.po_prepartion === 1 ? val.po_prepartion :
                                        val.quatation_fixing === 1 ? val.quatation_fixing :
                                            val.quatation_negotiation === 1 ? val.quatation_negotiation :
                                                val.quatation_calling_status === 1 ? val.quatation_calling_status :
                                                    val.ack_status === 1 ? val.ack_status :
                                                        0,

                    md_image: val.md_image,
                    ed_image: val.ed_image
                }
            })

            resolve({ status: true, data: result });
        } catch (error) {
            reject({ status: false, data: [] });

        }
    })
}


//Quatation finalizing

export const QuatationFinal = (getArray) => {
    return new Promise((resolve, reject) => {
        try {
            const result = getArray?.filter((val) => val.quatation_calling_status === 1 && val.quatation_negotiation === 1 && val.quatation_fixing === 0).map((val) => {
                return {
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

                    edid: val.edid,
                    mdid: val.mdid,

                    crm_purchase_slno: val.crm_purchase_slno,
                    ack_status: val.ack_status,
                    ack_remarks: val.ack_remarks,
                    purchase_ackuser: val.purchase_ackuser !== null ? val.purchase_ackuser.toLowerCase() : '',
                    ack_date: val.ack_date,
                    quatation_calling_status: val.quatation_calling_status,
                    quatation_calling_date: val.quatation_calling_date,
                    quatation_user: val.quatation_user !== null ? val.quatation_user.toLowerCase() : '',
                    quatation_calling_remarks: val.quatation_calling_remarks,

                    quatation_negotiation: val.quatation_negotiation,
                    quatation_negotiation_date: val.quatation_negotiation_date,
                    quatation_neguser: val.quatation_neguser !== null ? val.quatation_neguser.toLowerCase() : '',
                    quatation_negotiation_remarks: val.quatation_negotiation_remarks,

                    quatation_fixing: val.quatation_fixing,
                    quatation_fixing_date: val.quatation_fixing_date,
                    quatation_fixuser: val.quatation_fixuser !== null ? val.quatation_fixuser.toLowerCase() : '',
                    quatation_fixing_remarks: val.quatation_fixing_remarks,

                    po_prepartion: val.po_prepartion,
                    po_complete: val.po_complete,
                    po_approva_level_one: val.po_approva_level_one,
                    po_approva_level_two: val.po_approva_level_two,
                    po_to_supplier: val.po_to_supplier,
                    store_receive: val.store_receive,
                    now_who: val.po_to_supplier === 1 ? "PO Send to Supplier" :
                        val.po_approva_level_two === 1 ? "PO Managing Director Approved" :
                            val.po_approva_level_one === 1 ? "PO Purchase Level Approved" :
                                val.po_complete === 1 ? "PO Completed" :
                                    val.po_prepartion === 1 ? "PO Prepairing" :
                                        val.quatation_fixing === 1 ? "Quatation Fixing" :
                                            val.quatation_negotiation === 1 ? "Quatation Negotiation" :
                                                val.quatation_calling_status === 1 ? "Quatation Calling" :
                                                    val.ack_status === 1 ? "Po Acknowledged" :
                                                        "Not Statrted Purchase Process",
                    now_who_status: val.po_to_supplier === 1 ? val.po_to_supplier :
                        val.po_approva_level_two === 1 ? val.po_approva_level_two :
                            val.po_approva_level_one === 1 ? val.po_approva_level_one :
                                val.po_complete === 1 ? val.po_complete :
                                    val.po_prepartion === 1 ? val.po_prepartion :
                                        val.quatation_fixing === 1 ? val.quatation_fixing :
                                            val.quatation_negotiation === 1 ? val.quatation_negotiation :
                                                val.quatation_calling_status === 1 ? val.quatation_calling_status :
                                                    val.ack_status === 1 ? val.ack_status :
                                                        0,

                    md_image: val.md_image,
                    ed_image: val.ed_image

                }

            })
            resolve({ status: true, data: result });
        } catch (error) {
            reject({ status: false, data: [] });
        }
    })
}

export const poClose = (getArray) => {
    return new Promise((resolve, reject) => {
        try {
            const result = getArray?.filter((val) => val.ack_status === 1 &&
                ((val.quatation_calling_status === 1 && val.quatation_fixing === 1 && val.po_complete === 0) ||
                    (val.po_prepartion === 1 && val.po_complete === 0))
            ).map((val) => {
                return {
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

                    edid: val.edid,
                    mdid: val.mdid,

                    crm_purchase_slno: val.crm_purchase_slno,
                    ack_status: val.ack_status,
                    ack_remarks: val.ack_remarks,
                    purchase_ackuser: val.purchase_ackuser !== null ? val.purchase_ackuser.toLowerCase() : '',
                    ack_date: val.ack_date,
                    quatation_calling_status: val.quatation_calling_status,
                    quatation_calling_date: val.quatation_calling_date,
                    quatation_user: val.quatation_user !== null ? val.quatation_user.toLowerCase() : '',
                    quatation_calling_remarks: val.quatation_calling_remarks,

                    quatation_negotiation: val.quatation_negotiation,
                    quatation_negotiation_date: val.quatation_negotiation_date,
                    quatation_neguser: val.quatation_neguser !== null ? val.quatation_neguser.toLowerCase() : '',
                    quatation_negotiation_remarks: val.quatation_negotiation_remarks,

                    quatation_fixing: val.quatation_fixing,
                    quatation_fixing_date: val.quatation_fixing_date,
                    quatation_fixuser: val.quatation_fixuser !== null ? val.quatation_fixuser.toLowerCase() : '',
                    quatation_fixing_remarks: val.quatation_fixing_remarks,
                    po_prepartion: val.po_prepartion,
                    po_complete: val.po_complete,
                    po_approva_level_one: val.po_approva_level_one,
                    po_approva_level_two: val.po_approva_level_two,
                    po_to_supplier: val.po_to_supplier,
                    store_receive: val.store_receive,
                    now_who: val.po_to_supplier === 1 ? "PO Send to Supplier" :
                        val.po_approva_level_two === 1 ? "PO Managing Director Approved" :
                            val.po_approva_level_one === 1 ? "PO Purchase Level Approved" :
                                val.po_complete === 1 ? "PO Completed" :
                                    val.po_prepartion === 1 ? "PO Prepairing" :
                                        val.quatation_fixing === 1 ? "Quatation Fixing" :
                                            val.quatation_negotiation === 1 ? "Quatation Negotiation" :
                                                val.quatation_calling_status === 1 ? "Quatation Calling" :
                                                    val.ack_status === 1 ? "Po Acknowledged" :
                                                        "Not Statrted Purchase Process",
                    now_who_status: val.po_to_supplier === 1 ? val.po_to_supplier :
                        val.po_approva_level_two === 1 ? val.po_approva_level_two :
                            val.po_approva_level_one === 1 ? val.po_approva_level_one :
                                val.po_complete === 1 ? val.po_complete :
                                    val.po_prepartion === 1 ? val.po_prepartion :
                                        val.quatation_fixing === 1 ? val.quatation_fixing :
                                            val.quatation_negotiation === 1 ? val.quatation_negotiation :
                                                val.quatation_calling_status === 1 ? val.quatation_calling_status :
                                                    val.ack_status === 1 ? val.ack_status :
                                                        0,

                    md_image: val.md_image,
                    ed_image: val.ed_image
                }
            })
            resolve({ status: true, data: result });
        } catch (error) {
            reject({ status: false, data: [] });
        }

    })
}



export const potoSupp = (getArray) => {
    return new Promise((resolve, reject) => {
        try {
            const result = getArray?.filter((val) => val.po_complete === 1 && val.po_to_supplier === 0).map((val) => {
                return {
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
                    edid: val.edid,
                    mdid: val.mdid,
                    crm_purchase_slno: val.crm_purchase_slno,
                    ack_status: val.ack_status,
                    ack_remarks: val.ack_remarks,
                    purchase_ackuser: val.purchase_ackuser !== null ? val.purchase_ackuser.toLowerCase() : '',
                    ack_date: val.ack_date,
                    quatation_calling_status: val.quatation_calling_status,
                    quatation_calling_date: val.quatation_calling_date,
                    quatation_user: val.quatation_user !== null ? val.quatation_user.toLowerCase() : '',
                    quatation_calling_remarks: val.quatation_calling_remarks,

                    quatation_negotiation: val.quatation_negotiation,
                    quatation_negotiation_date: val.quatation_negotiation_date,
                    quatation_neguser: val.quatation_neguser !== null ? val.quatation_neguser.toLowerCase() : '',
                    quatation_negotiation_remarks: val.quatation_negotiation_remarks,

                    quatation_fixing: val.quatation_fixing,
                    quatation_fixing_date: val.quatation_fixing_date,
                    quatation_fixuser: val.quatation_fixuser !== null ? val.quatation_fixuser.toLowerCase() : '',
                    quatation_fixing_remarks: val.quatation_fixing_remarks,
                    po_prepartion: val.po_prepartion,
                    po_complete: val.po_complete,
                    po_approva_level_one: val.po_approva_level_one,
                    po_approva_level_two: val.po_approva_level_two,
                    po_to_supplier: val.po_to_supplier,
                    store_receive: val.store_receive,
                    now_who: val.po_to_supplier === 1 ? "PO Send to Supplier" :
                        val.po_approva_level_two === 1 ? "PO Managing Director Approved" :
                            val.po_approva_level_one === 1 ? "PO Purchase Level Approved" :
                                val.po_complete === 1 ? "PO Completed" :
                                    val.po_prepartion === 1 ? "PO Prepairing" :
                                        val.quatation_fixing === 1 ? "Quatation Fixing" :
                                            val.quatation_negotiation === 1 ? "Quatation Negotiation" :
                                                val.quatation_calling_status === 1 ? "Quatation Calling" :
                                                    val.ack_status === 1 ? "Po Acknowledged" :
                                                        "Not Statrted Purchase Process",
                    now_who_status: val.po_to_supplier === 1 ? val.po_to_supplier :
                        val.po_approva_level_two === 1 ? val.po_approva_level_two :
                            val.po_approva_level_one === 1 ? val.po_approva_level_one :
                                val.po_complete === 1 ? val.po_complete :
                                    val.po_prepartion === 1 ? val.po_prepartion :
                                        val.quatation_fixing === 1 ? val.quatation_fixing :
                                            val.quatation_negotiation === 1 ? val.quatation_negotiation :
                                                val.quatation_calling_status === 1 ? val.quatation_calling_status :
                                                    val.ack_status === 1 ? val.ack_status :
                                                        0,
                    md_image: val.md_image,
                    ed_image: val.ed_image
                };
            });
            resolve({ status: true, data: result });
        } catch (error) {
            reject({ status: false, data: [] });
        }
    });
};

export const getpurchDataCollPending = (state) => state.setCRMPurchDataCollPending.setCRMPurchDataCollPendingList;

export const PurchDataCollPendingList = (datacollPendng) => {
    return new Promise((resolve, reject) => {
        try {
            const result = datacollPendng?.filter((val) => val.md_approve === 1 && val.ed_approve === 1).map((val) => {
                return {
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
                    edid: val.edid,
                    mdid: val.mdid,
                    now_who: "Not Statrted Purchase Process",
                    now_who_status: 0,
                    md_image: val.md_image,
                    ed_image: val.ed_image,

                    crf_dept_remarks: val.crf_dept_remarks,
                    data_entered: val.data_entered !== null ? val.data_entered.toLowerCase() : '',
                    reqest_one: val.reqest_one,
                    req_user: val.requser !== null ? val.requser.toLowerCase() : '',
                    datagive_user: val.saveuser !== null ? val.saveuser.toLowerCase() : '',
                    create_date: val.create_date,
                    update_date: val.update_date,
                    crf_req_remark: val.crf_req_remark,
                    data_coll_image_status: val.data_coll_image_status,
                    crf_data_collect_slno: val.crf_data_collect_slno,
                    crf_requst_slno: val.crf_requst_slno,
                    requser: val.requser.toLowerCase(),
                    crf_dept_status: val.crf_dept_status
                };
            });
            resolve({ status: true, data: result });
        } catch (error) {
            reject({ status: false, data: [] });
        }
    });
};


// Usage:
// yourFunction(getArray)
//     .then(result => {
//         console.log(result);
//     })
//     .catch(error => {
//         console.error(error);
//     });
