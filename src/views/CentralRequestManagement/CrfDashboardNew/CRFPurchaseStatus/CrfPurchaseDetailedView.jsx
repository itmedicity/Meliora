import { Box, CssVarsProvider, IconButton, Typography } from '@mui/joy'
import { format } from 'date-fns'
import React, { Fragment, memo, Suspense, useCallback, useState } from 'react'
import { Virtuoso } from 'react-virtuoso'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static'
import { GetItemDetailsOfCRFCmp } from '../../ComonComponent/GetItemDetailsOfCRFCmp'
const CustomLoadComp = React.lazy(() => import("../../ComonComponent/Components/CustomLoadComp"))
const CrfDetailSearchComp = React.lazy(() => import("../Components/CrfDetailSearchComp"))
const PurchaseStatusModalView = React.lazy(() => import("./PurchaseStatusModalView"))

const CrfPurchaseDetailedView = ({ setFlag, disData, setDisData, tableData, poStart }) => {
    const [modalData, setModalData] = useState([])
    const [modalopen, setModalOpen] = useState(false)
    const [modFlag, setModFlag] = useState(0)

    const [datacolData, setDataColData] = useState([])
    const [reqItems, setReqItems] = useState([])
    const [approveTableData, setApproveTableData] = useState([])
    const [poDetails, setPoDetails] = useState([])
    const [imagearray, setImageArry] = useState([])

    const viewDetails = useCallback((req_slno, po_number) => {
        const getImage = async (req_slno) => {
            try {
                const result = await axioslogin.get(`/newCRFRegisterImages/crfRegimageGet/${req_slno}`)
                const { success, data } = result.data
                if (success === 1) {
                    const fileNames = data;
                    const fileUrls = fileNames.map((fileName) => {
                        return `${PUBLIC_NAS_FOLDER}/CRF/crf_registration/${req_slno}/${fileName}`;
                    });

                    const savedFiles = fileUrls.map((val) => {
                        const parts = val.split('/');
                        const fileNamePart = parts[parts.length - 1];
                        const obj = {
                            imageName: fileNamePart,
                            url: val
                        }
                        return obj
                    })
                    setImageArry(savedFiles)
                } else {
                    setImageArry([])
                }
            } catch (error) {
                warningNotify("An error occurred while getting data");
            }
        }
        getImage(req_slno)

        GetItemDetailsOfCRFCmp(req_slno, setReqItems, setApproveTableData, setPoDetails)
        const checkDataCollectComplete = async (req_slno) => {
            try {
                const result = await axioslogin.get(`/CRFRegisterApproval/DataCollectComplete/${req_slno}`)
                const { success, data } = result.data
                if (success === 1) {
                    const yy = data?.filter((val) => val.crf_dept_status === 1)
                    if (yy.length !== 0) {
                        const datas = yy.map((val) => {
                            const obj = {
                                req_slno: val.crf_requst_slno,
                                crf_dept_remarks: val.crf_dept_remarks,
                                datagive_user: val.datagive_user,
                                data_entered: val.data_entered !== null ? val.data_entered.toLowerCase() : '',
                                reqest_one: val.reqest_one,
                                req_user: val.req_user !== null ? val.req_user.toLowerCase() : '',
                                create_date: val.create_date,
                                update_date: val.update_date,
                                crf_req_remark: val.crf_req_remark,
                                data_coll_image_status: val.data_coll_image_status,
                                crf_data_collect_slno: val.crf_data_collect_slno,
                            }
                            return obj
                        })
                        setDataColData(datas)
                    }
                }
                else {
                    setDataColData([])
                }
            } catch (error) {
                warningNotify("An error occurred while getting data");
            }
        }
        checkDataCollectComplete(req_slno)
        const postData = {
            req_slno: req_slno,
            po_number: po_number
        }
        const getDetails = async (postData) => {
            try {
                const result = await axioslogin.post('/CRFDashboard/purchaseApprvlView', postData);
                const { success, data, message } = result.data;
                if (success === 1) {
                    const newData = data?.map((val) => {
                        return {
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
                            dms_remarks: val.dms_remarks !== null ? val.dms_remarks : "Not Updated",
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
                            now_who: val.po_to_supplier === 1 ? "Waiting for Goods" :
                                val.approval_level === 3 ? "Director's Approved" :
                                    val.approval_level === 2 ? 'Purchase Manager Approved' :
                                        val.approval_level === 1 ? 'Purchase Dpt Approved' :
                                            val.po_complete === 1 ? "PO Completed" :
                                                val.po_prepartion === 1 ? "PO Prepairing" :
                                                    val.quatation_fixing === 1 ? "Quotation Fixed" :
                                                        val.quatation_negotiation === 1 ? "Quotation Negotiation" :
                                                            val.quatation_calling_status === 1 ? "Quotation Calling" :
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
                                                                                                        "Not Started",

                            now_who_status: val.po_to_supplier === 1 ? 5 :
                                val.approval_level === 3 ? 5 :
                                    val.approval_level === 2 ? 5 :
                                        val.approval_level === 1 ? 5 :
                                            val.po_complete === 1 ? 5 :
                                                val.po_prepartion === 1 ? 5 :
                                                    val.quatation_fixing === 1 ? 5 :
                                                        val.quatation_negotiation === 1 ? 5 :
                                                            val.quatation_calling_status === 1 ? 5 :
                                                                val.ack_status === 1 ? 5 :
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
                        }
                    })
                    setModalData(newData[0])
                    setModalOpen(true)
                    setModFlag(1)
                } else {
                    warningNotify(message)
                    setModalOpen(false)
                    setModFlag(0)
                }
            } catch (error) {
                warningNotify("An error occurred while getting data");
            }
        };
        getDetails(postData)

    }, [])

    const handleClose = useCallback(() => {
        setModalOpen(false)
        setModFlag(0)
        setModalData([])
    }, [setModalOpen])
    return (
        <Fragment>
            <Suspense fallback={<CustomLoadComp />}>
                {modFlag === 1 ? <PurchaseStatusModalView modalData={modalData} handleClose={handleClose} open={modalopen}
                    datacolData={datacolData} imagearray={imagearray} reqItems={reqItems} approveTableData={approveTableData}
                    poDetails={poDetails} /> : null}
            </Suspense>
            <Box sx={{ height: window.innerHeight - 160, flexWrap: 'wrap', bgcolor: 'white' }}>
                <CrfDetailSearchComp setFlag={setFlag} setDisData={setDisData} tableData={tableData} />
                <Box sx={{ bgcolor: 'white', pt: 0.5, overflow: 'auto' }}>
                    {disData.length !== 0 ?
                        <Box sx={{ width: '100%' }}>
                            <Box display="flex" justifyContent="space-between" sx={{
                                bgcolor: '#e3f2fd', flexWrap: 'nowrap', py: 1, position: 'sticky',
                                top: 0, zIndex: 1, border: '1px solid #AFD8F2', borderLeft: 'none', borderRight: 'none'
                            }}>
                                <Typography sx={{ width: 40, textAlign: 'center', fontWeight: 550, fontSize: 12, }}>Sl.No</Typography>
                                <Typography sx={{ width: 80, textAlign: 'left', fontWeight: 550, fontSize: 12, }}>Req.No</Typography>
                                <Typography sx={{ width: 200, textAlign: 'left', fontWeight: 550, fontSize: 12, }}>Req.Date</Typography>
                                <Typography sx={{ width: 150, textAlign: 'left', fontWeight: 550, fontSize: 12, }}>Dpt Section</Typography>
                                <Typography sx={{ width: 200, textAlign: 'left', fontWeight: 550, fontSize: 12, }}>Location</Typography>
                                <Typography sx={{ width: 100, textAlign: 'left', fontWeight: 550, fontSize: 12, }}>Expected Date</Typography>
                                {poStart > 4 ? <Typography sx={{ width: 80, textAlign: 'left', fontWeight: 550, fontSize: 12, }}>#Order</Typography> : null}
                                <Typography sx={{ width: 250, textAlign: 'center', fontWeight: 550, fontSize: 12, mx: 0.5 }}>Status</Typography>
                            </Box>
                            <Virtuoso
                                style={{ height: window.innerHeight - 282, width: '100%', }}
                                data={disData}
                                itemContent={(index, val) => (
                                    <React.Fragment key={index}>
                                        <Box display="flex" justifyContent="space-between" sx={{ borderBottom: '1px solid lightgrey', flexWrap: 'nowrap' }}>
                                            <Typography sx={{ width: 40, textAlign: 'center', fontSize: 12, my: 1 }}>{index + 1}</Typography>
                                            <Typography sx={{ width: 80, textAlign: 'left', fontSize: 12, my: 1 }}>{"CRF/TMC/" + val.req_slno}</Typography>
                                            <Typography sx={{ width: 200, textAlign: 'left', fontSize: 12, my: 1 }}>{format(new Date(val.req_date), 'dd-MM-yyyy hh:mm:ss a')}</Typography>
                                            <Typography sx={{ width: 150, textAlign: 'left', fontSize: 12, my: 1, textTransform: 'capitalize' }}>{val.req_deptsec}</Typography>
                                            <Typography sx={{ width: 200, textAlign: 'left', fontSize: 12, my: 1 }}>{val.location}</Typography>
                                            <Typography sx={{ width: 100, textAlign: 'left', fontSize: 12, my: 1 }}>{format(new Date(val.expected_date), 'dd-MM-yyyy')}</Typography>
                                            {poStart > 4 ? <Typography sx={{ width: 80, textAlign: 'left', fontSize: 12, my: 1, color: '#1F4591' }}>{val.po_number}</Typography> : null}
                                            <Box sx={{
                                                width: 250, cursor: 'pointer', m: 0.5, display: 'flex',
                                                alignItems: 'center', justifyContent: 'center', pr: 0.5
                                            }} >
                                                < CssVarsProvider >
                                                    <IconButton
                                                        sx={{
                                                            fontSize: 12, minHeight: '30px', lineHeight: '1.2', maxHeight: '40px',
                                                            bgcolor: '#BFD7ED', width: '190px', my: 0.5, py: 0.3,
                                                            '&:hover': {
                                                                bgcolor: '#BFD7ED', fontWeight: 650
                                                            },
                                                            boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)', borderRadius: 5,
                                                        }}
                                                        onClick={() => viewDetails(val.req_slno, val.po_number)}
                                                    >
                                                        {val.now_who}
                                                    </IconButton>
                                                </CssVarsProvider>
                                            </Box>
                                        </Box>
                                    </React.Fragment>
                                )}
                            />
                        </Box>
                        :
                        <Box sx={{
                            display: 'flex', justifyContent: 'center', fontSize: 30, opacity: 0.5,
                            pt: 10, color: 'grey'
                        }}>
                            No Report Found
                        </Box>
                    }
                </Box>
            </Box>
        </Fragment>
    )
}

export default memo(CrfPurchaseDetailedView)