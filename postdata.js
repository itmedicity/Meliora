// --------------CRF Registration

// insert crm_request_master,postdata

actual_requirement: "surgical purpose"
category: "INSTRUMENTS"
create_user: 168
//emer_slno:1 or 2 or null
emer_slno: 2
emergency_flag: 1
emergeny_remarks: "gfjhgfhgfhghghgh"
expected_date: "2024-12-31 23:59:59"
location: "payward b side"
needed: "A cranial perforator is a surgical tool used to drill holes in the skull ,or cranium ,to access the brain."
request_deptsec_slno: 4
user_deptsec: 1

// insert crm_request_mast_detail (item details)

approve_aprox_cost: 4000
approve_item_brand: "Custom"
approve_item_desc: "Glass shelf with aluminum frame"
approve_item_specification: "Triangle shape with 5 rows"
approve_item_status: 1
approve_item_unit: 7
approve_item_unit_price: "2000"
aprox_cost: 4000
create_user: 168
item_brand: "Custom"
item_desc: "Glass shelf with aluminum frame"
item_qnty: 2
item_qnty_approved: 2
item_slno: 1
item_specification: "Triangle shape with 5 rows"
item_status: 1
item_status_approved: 1
item_unit: 7
item_unit_price: "2000"
req_slno: 58

// {item_status : 0 /1,approve_item_status:0 /1 item_status_approved:1 apprvd ,2 rejected, 3 onhold }


// crm_request_approval table insert
//     nonclinical and academic =>dms_req=0,md_approve_req=0
dms_req: 1
ed_approve_req: 1
gm_approve_req: 1
hod_req: 1
incharge_approve: null
incharge_req: 1
manag_operation_req: 1
md_approve_req: 1
ms_approve_req: 1
req_slno: 58
senior_manage_req: 1


//------------------ inchargeApproval
// patchdata
// incharge_approve becomes 1->approve, 2->reject 3->on-hold
inch_detial_analysis: "INCHARGE APPROVED"
incharge_approve: 1
incharge_apprv_date: "2024-11-23 18:04:01"
incharge_remarks: "INCHARGE APPROVED"
incharge_user: 168
req_slno: 59

// ....................CRF Close(common)

close_date: "2024-11-25 09:49:49"
// crf_close status initially null
crf_close: 1
crf_close_remark: "crf closed"
crf_close_user: 168
crf_closed_one: "Incharge" / "HOD" / "DMS" / "MS" / "MO" / "SMO" / "GM" / "ED" / "MD"
req_slno: 47



// .............data collection req (common)

crf_req_collect_dept: 1
crf_req_remark: "datacollection"
crf_requst_slno: 47
req_user: 168
reqest_one: 2
// reqest_one=>2=Hod,3=DMS,4=MS,5=MO,6=SMO,7=GM,8=MD,9=ED,10=PURCHASE DPT


// .............    datacollection Reply(common)
crf_data_collect_slno: 15
crf_dept_remarks: "replyyyyyy"
save_user: 168


// ......................HOD approval
// hod_approve  1->approve, 2->reject 3->on-hold
hod_approve: 1
hod_approve_date: "2024-11-25 10:33:24"
hod_detial_analysis: "hod approved"
hod_remarks: "hod approved"
hod_user: 168
req_slno: 47


// ...................DMS Approval
// dms_approve  1->approve, 2->reject 3->on-hold
dms_approve: 1
dms_approve_date: "2024-11-25 11:05:33"
dms_detail_analysis: "dms approved"
dms_remarks: "dms approved"
dms_user: 168
req_slno: 58


// ............................MS Approval
// ms_approve  1->approve, 2->reject 3->on-hold
ms_approve: 1
ms_approve_date: "2024-11-25 14:44:38"
ms_approve_remark: "ms approved"
ms_approve_user: 168
ms_detail_analysis: "ms approved"
req_slno: 58


// .......................CRF Docuumentation
// manag_operation_approv  1->approve, 2->reject 3->on-hold
manag_operation_approv: 1
om_approv_date: "2024-11-25 14:51:24"
manag_operation_remarks: "mo approved"
manag_operation_user: 168
om_detial_analysis: "mo approved"
req_slno: 58


//........................ CRF Verification
// senior_manage_approv  1->approve, 2->reject 3->on-hold
req_slno: 58
senior_manage_approv: 1
senior_manage_remarks: "smo approved"
senior_manage_user: 168
smo_detial_analysis: "smo approved"
som_aprrov_date: "2024-11-25 14:56:11"



// .........................GM aproval
// gm_approve  1->approve, 2->reject 3->on-hold
gm_approv_date: "2024-11-25 15:08:38"
gm_approve: 1
gm_approve_remarks: "Gm Approved"
gm_detial_analysis: "Gm Approved"
gm_user: 168
req_slno: 58


// .......................MD Approval
// gm_approve  1->approve, 2->reject 3->on-hold
md_approve: 1
md_approve_date: "2024-11-25 15:11:23"
md_approve_remarks: "md approved"
md_detial_analysis: "md approved"
md_user: 168
req_slno: 58


// ....................ED Approval
// gm_approve  1->approve, 2->reject 3->on-hold
ed_approve: 1
ed_approve_date: "2024-11-25 15:13:30"
ed_approve_remarks: "ed approved"
ed_detial_analysis: "ed approved"
ed_user: 168
req_slno: 58


//......................Purchase Acknowledgement
ack_remarks: "Acknowledged"
ack_status: 1
create_user: 168
req_slno: 58


// ......................Quotation Call
// quatation_calling_status = 0 or 1
crm_purchase_slno: 36
quatation_calling_date: "2024-11-25 15:25:03"
quatation_calling_remarks: "quotation call"
quatation_calling_status: 1
quatation_calling_user: 168


// ...................Quotation Negotiation
// quatation_negotiation = 0 or 1
crm_purchase_slno: 36
quatation_negotiation: 1
quatation_negotiation_date: "2024-11-25 15:27:43"
quatation_negotiation_remarks: "Quotation Negotiation"
quatation_negotiation_user: 168



// ...................Quotation Fix
// quatation_fixing = 0 or 1
crm_purchase_slno: 36
quatation_fixing: 1
quatation_fixing_date: "2024-11-25 15:30:43"
quatation_fixing_remarks: "Quotation Fix"
quatation_fixing_user: 168


// ...................PO Processing

// PO Details
approval_level: 3
create_user: 168
expected_delivery: "1970-01-01"
// items: [{…}]
po_amount: 600
po_date: "2024-11-20 12:51:14"
po_delivery: "Immediate"
po_expiry: "2025-05-19"
po_number: "004799"
po_status: 1
po_to_supplier: 0
po_type: "S"
req_slno: 58
sub_store_slno: 3
supplier_code: ".009"
supplier_name: ".universal Traders"
supply_store: 2

//   PO Items
grn_qnty: 0
item_code: ".414"
item_mrp: "75.00"
item_name: "CARROMS COIN"
item_qty: 20
item_rate: "30.00"
net_amount: "600.00"
po_number: "004799"
slno: 1
tax: "NIL"
tax_amount: "0.00"


//.............. PO Complete Patch
crm_purchase_slno: 36
po_complete: 1
po_complete_date: "2024-11-25 16:39:48"
po_complete_user: 168


// .......  .get Aprroval Status From Ellider Button=> patchdata
// approval_level:null->Not Approved, 1->Purchase Dpt Apprvd , 2->Purchase Manager Apprvd, 3->Directors Approved
{
    approval_level: null
    expected_delivery: "2022-01-27"
    po_expiry: "2022-07-18"
    po_number: "004799"
    supply_store: 1
}
{
    approval_level: 1
    expected_delivery: "2024-10-31"
    po_expiry: "2025-03-27"
    po_number: "004760"
    supply_store: 2
}
{
    approval_level: 2
    expected_delivery: "2024-10-05"
    po_expiry: "2025-03-27"
    po_number: "004766"
    supply_store: 2
}


// ............PO To Supplier Patchdata

edit_user: 168
po_number: "004799"
po_to_supplier_date: "2024-11-25 17:10:46"
req_slno: 58


// ...................Delivery Marking...................





// Insert Delivery Details

// update item Status when search by supplier

edit_user: 168
item_code: "N205"
item_slno: 6
item_status: null
marking_po_slno: 4
received_qty: 0



create_user: 168
dc_mark_date: "2024-11-25 17:25:16"
dc_receive_date: "2024-11-25 17:17:47"
delivery_bill_details:
// { bill_slno: 1, delivered_bill_no: 'KO1245', delivered_bill_date: '2024-11-25' },
// {bill_slno: 2, delivered_bill_no: 'KO1475', delivered_bill_date: '2024-11-25'}

mt_courier: 0
mt_direct: 1
package_count: "20"
po_exist_status: "Exist"
received_user: 1231
remarks: "BJH KJKJ KJ LKL KLKLK"
supplier_code: "M117"
supplier_name: ".KENPLY"


// ..Insert PO Details
create_user: 168
crs_store: 2
crs_store_code: "C001"
delivery_mark_slno: 6
expected_delivery: "2024-10-05"
items:
{
    item_code: "N205"
    item_mrp: "800.00"
    item_name: "NC THINNER 5L"
    item_qty: 1
    item_rate: "300.00"
    po_no: "004763"
    received_qty: 0
    slno: 1
    storecode: "C001"
}

po_date: "2024-09-28 14:22:41"
po_delivery: "IMMEDIATE"
po_expiry: "2025-03-27"
po_number: "004763"
po_status: 1
supplier_code: "M117"


// ....insert Item Details
item_code: "N205"
item_mrp: "800.00"
item_name: "NC THINNER 5L"
item_qty: 1
item_rate: "300.00"
po_no: "004763"
received_qty: 0
slno: 1
storecode: "C001"
