import { Box, Chip, CssVarsProvider, Grid, IconButton, Typography } from '@mui/joy'
import { format } from 'date-fns'
import React, { Fragment, memo, Suspense, useCallback, useState } from 'react'
// import { use } from 'react-router-dom/cjs/react-router-dom.min';
import { useNavigate } from 'react-router-dom'
import { axioslogin } from 'src/views/Axios/Axios'
import CustomCloseIconCmp from 'src/views/CentralRequestManagement/ComonComponent/Components/CustomCloseIconCmp'
import CustomInputDateCmp from 'src/views/CentralRequestManagement/ComonComponent/Components/CustomInputDateCmp'
import { warningNotify } from 'src/views/Common/CommonCode'
import CustomBackDrop from 'src/views/Components/CustomBackDrop'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css'
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static'
import { Paper } from '@mui/material'
// import { ToastContainer } from 'react-toastify'
import CustomLoadComp from 'src/views/CentralRequestManagement/ComonComponent/Components/CustomLoadComp'
import ReqImageDisModal from 'src/views/CentralRequestManagement/ComonComponent/ImageUploadCmp/ReqImageDisModal'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import ReqItemDisplay from 'src/views/CentralRequestManagement/ComonComponent/ReqItemDisplay'
import ApprovedItemListDis from 'src/views/CentralRequestManagement/ComonComponent/ApprovedItemListDis'
import CrfReqDetailCmpnt from 'src/views/CentralRequestManagement/CRFRequestMaster/Components/CrfReqDetailCmpnt'
import UserReceivedItemDetails from 'src/views/CentralRequestManagement/ComonComponent/ApprovalComp/UserReceivedItemDetails'

const CrfNoBasedReport = () => {
  const history = useNavigate()
  const backToSetting = useCallback(() => {
    history(`/Home/Reports`)
  }, [history])
  const [req_slno, setReq_slno] = useState('')
  const [open, setOpen] = useState(false)
  const [tableData, setTableData] = useState([])
  const [imagearray, setImageArry] = useState([])
  const [poDetails, setPoDetails] = useState([])
  const [reqItems, setReqItems] = useState([])
  const [approveTableData, setApproveTableData] = useState([])
  const [disFlag, setDisFlag] = useState(0)
  const [imageshowFlag, setImageShowFlag] = useState(0)
  const [imageshow, setImageShow] = useState(false)
  const [previewFile, setPreviewFile] = useState({ url: '', type: '' })

  const searchCRFDetails = useCallback(
    async e => {
      e.preventDefault()
      setOpen(true)

      const getCrfDetails = async req_slno => {
        const result = await axioslogin.get(`/CrfReports/getCRFNoBased/${req_slno}`)
        return result.data
      }

      const getImage = async req_slno => {
        const result = await axioslogin.get(`/newCRFRegisterImages/crfRegimageGet/${req_slno}`)
        const { success, data } = result.data
        if (success === 1) {
          const fileNames = data
          const fileUrls = fileNames.map(fileName => {
            return `${PUBLIC_NAS_FOLDER}/CRF/crf_registration/${req_slno}/${fileName}`
          })
          const savedFiles = fileUrls.map(val => {
            const parts = val.split('/')
            const fileNamePart = parts[parts.length - 1]
            const obj = {
              imageName: fileNamePart,
              url: val,
            }
            return obj
          })
          setImageArry(savedFiles)
        }
      }

      const getItemDetails = async req_slno => {
        try {
          const result = await axioslogin.get(`/newCRFRegister/getDetailItemList/${req_slno}`)
          const { success, data } = result.data
          if (success === 1) {
            setReqItems(data)
          } else {
            setReqItems([])
          }
        } catch (error) {
          warningNotify('Error to fetch Data:', error)
          setReqItems([])
        }
      }
      const getApproItemDetails = async req_slno => {
        try {
          const result = await axioslogin.get(
            `/CRFRegisterApproval/getItemListApproval/${req_slno}`
          )
          const { success, data } = result.data
          if (success === 1) {
            setApproveTableData(data)
          } else {
            setApproveTableData([])
          }
        } catch (error) {
          warningNotify('Error to fetch Data:', error)
          setApproveTableData([])
        }
      }
      const getPODetails = async req_slno => {
        try {
          const result = await axioslogin.get(`/newCRFPurchase/getPoDetails/${req_slno}`)
          const { success, data } = result.data
          if (success === 1) {
            const poLIst = data
              .filter(
                (po, index, self) =>
                  index ===
                  self.findIndex(
                    val =>
                      val.po_number === po.po_number &&
                      val.req_slno === po.req_slno &&
                      val.crm_purchase_slno === po.crm_purchase_slno
                  )
              )
              .map(po => ({
                po_detail_slno: po.po_detail_slno,
                req_slno: po.req_slno,
                po_number: po.po_number,
                po_date: format(new Date(po.po_date), 'dd-MM-yyyy hh:mm:ss a'),
                expected_delivery: po.expected_delivery
                  ? format(new Date(po.expected_delivery), 'dd-MM-yyyy')
                  : 'Not Updated',
                supply_store: po.supply_store,
                main_store_slno: po.main_store_slno,
                storeName: capitalizeWords(po.main_store),
                substoreName: capitalizeWords(po.sub_store_name),
                store_code: po.store_code,
                store_recieve: po.store_recieve,
                supplier_name: capitalizeWords(po.supplier_name),
                po_type: po.po_type === 'S' ? 'Stock Order' : 'Specific',
                po_delivery: po.po_delivery,
                po_amount: po.po_amount,
                po_to_supplier: po.po_to_supplier,
                approval_level: po.approval_level,
                po_expiry: po.po_expiry
                  ? format(new Date(po.po_expiry), 'dd-MM-yyyy')
                  : 'Not Updated',
              }))
            const poItems = data?.map(val => {
              const obj = {
                po_detail_slno: val.po_detail_slno,
                po_number: val.po_number,
                item_code: val.item_code,
                item_name: val.item_name,
                item_qty: val.item_qty !== null ? val.item_qty : 0,
                item_rate: val.item_rate !== null ? val.item_rate : 0,
                item_mrp: val.item_mrp !== null ? val.item_mrp : 0,
                tax: val.tax !== null ? val.tax : 'Nil',
                tax_amount: val.tax_amount !== null ? val.tax_amount : 0,
                net_amount: val.net_amount !== 0 ? val.net_amount : 0,
              }
              return obj
            })
            const combinedData = poLIst?.map(po => {
              const details = poItems?.filter(
                item => item.po_number === po.po_number && item.po_detail_slno === po.po_detail_slno
              )
              return {
                ...po,
                items: details,
              }
            })
            setPoDetails(combinedData)
          } else {
            setPoDetails([])
          }
        } catch (error) {
          warningNotify('Error to fetch Data:', error)
          setPoDetails([])
        }
      }

      if (req_slno !== '') {
        getCrfDetails(req_slno).then(val => {
          const { success, data } = val
          if (success === 1) {
            setOpen(false)

            const crfDetails = data
              .filter(
                (val, index, self) =>
                  index === self.findIndex(value => value.req_slno === val.req_slno)
              )
              .map(val => ({
                req_status: val.req_status,
                req_slno: val.req_slno,
                actual_requirement:
                  val.actual_requirement !== null ? val.actual_requirement : 'Nil',
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
                req_date:
                  val.req_date !== null
                    ? format(new Date(val.req_date), 'dd-MM-yyyy hh:mm a')
                    : 'Not Updated',
                expected_date:
                  val.expected_date !== null
                    ? format(new Date(val.expected_date), 'dd-MM-yyyy')
                    : 'Not Updated',
                internally_arranged_status: val.internally_arranged_status,
                crf_close: val.crf_close,
                crf_close_remark: val.crf_close_remark,
                crf_closed_one: val.crf_closed_one,
                close_date: val.close_date,
                closed_user: val.closed_user !== null ? val.closed_user.toLowerCase() : '',
                incharge_approve: val.incharge_approve,
                incharge_req: val.incharge_req,
                incharge:
                  val.incharge_approve === 1
                    ? 'Approved'
                    : val.incharge_approve === 2
                      ? 'Rejected'
                      : val.incharge_approve === 3
                        ? 'On-Hold'
                        : 'Not Done',
                incharge_remarks:
                  val.incharge_remarks !== null ? val.incharge_remarks : 'Not Updated',
                inch_detial_analysis: val.inch_detial_analysis,
                incharge_apprv_date:
                  val.incharge_apprv_date !== null
                    ? format(new Date(val.incharge_apprv_date), 'dd-MM-yyyy hh:mm a')
                    : 'Not Updated',
                incharge_user: val.incharge_user !== null ? val.incharge_user.toLowerCase() : '',
                hod_req: val.hod_req,
                hod_approve: val.hod_approve,
                hod:
                  val.hod_approve === 1
                    ? 'Approved'
                    : val.hod_approve === 2
                      ? 'Rejected'
                      : val.hod_approve === 3
                        ? 'On-Hold'
                        : 'Not Done',
                hod_remarks: val.hod_remarks !== null ? val.hod_remarks : 'Not Updated',
                hod_detial_analysis: val.hod_detial_analysis,
                hod_approve_date:
                  val.hod_approve_date !== null
                    ? format(new Date(val.hod_approve_date), 'dd-MM-yyyy hh:mm a')
                    : 'Not Updated',
                hod_user: val.hod_user !== null ? val.hod_user.toLowerCase() : '',
                dms_req: val.dms_req,
                dms_approve: val.dms_approve,
                dms:
                  val.dms_approve === 1
                    ? 'Approved'
                    : val.dms_approve === 2
                      ? 'Rejected'
                      : val.dms_approve === 3
                        ? 'On-Hold'
                        : val.dms_approve === 4
                          ? 'Approved'
                          : 'Not Done',
                dms_remarks: val.dms_remarks !== null ? val.dms_remarks : 'Not Updated',
                dms_detail_analysis: val.dms_detail_analysis,
                dms_approve_date:
                  val.dms_approve_date !== null
                    ? format(new Date(val.dms_approve_date), 'dd-MM-yyyy hh:mm a')
                    : 'Not Updated',
                dms_user: val.dms_user !== null ? val.dms_user.toLowerCase() : '',
                ms_approve_req: val.ms_approve_req,
                ms_approve: val.ms_approve,
                ms:
                  val.ms_approve === 1
                    ? 'Approved'
                    : val.ms_approve === 2
                      ? 'Rejected'
                      : val.ms_approve === 3
                        ? 'On-Hold'
                        : val.ms_approve === 4
                          ? 'Approved'
                          : 'Not Done',
                ms_approve_remark:
                  val.ms_approve_remark !== null ? val.ms_approve_remark : 'Not Updated',
                ms_detail_analysis: val.ms_detail_analysis,
                ms_approve_date:
                  val.ms_approve_date !== null
                    ? format(new Date(val.ms_approve_date), 'dd-MM-yyyy hh:mm a')
                    : 'Not Updated',
                ms_approve_user:
                  val.ms_approve_user !== null ? val.ms_approve_user.toLowerCase() : '',
                manag_operation_req: val.manag_operation_req,
                manag_operation_approv: val.manag_operation_approv,
                om:
                  val.manag_operation_approv === 1
                    ? 'Approved'
                    : val.manag_operation_approv === 2
                      ? 'Rejected'
                      : val.manag_operation_approv === 3
                        ? 'On-Hold'
                        : val.manag_operation_approv === 4
                          ? 'Approved'
                          : 'Not Done',
                manag_operation_remarks:
                  val.manag_operation_remarks !== null
                    ? val.manag_operation_remarks
                    : 'Not Updated',
                om_detial_analysis: val.om_detial_analysis,
                om_approv_date:
                  val.om_approv_date !== null
                    ? format(new Date(val.om_approv_date), 'dd-MM-yyyy hh:mm a')
                    : 'Not Updated',
                manag_operation_user:
                  val.manag_operation_user !== null ? val.manag_operation_user.toLowerCase() : '',
                senior_manage_req: val.senior_manage_req,
                senior_manage_approv: val.senior_manage_approv,
                smo:
                  val.senior_manage_approv === 1
                    ? 'Approved'
                    : val.senior_manage_approv === 2
                      ? 'Rejected'
                      : val.senior_manage_approv === 3
                        ? 'On-Hold'
                        : val.senior_manage_approv === 4
                          ? 'Approved'
                          : 'Not Done',
                senior_manage_remarks:
                  val.senior_manage_remarks !== null ? val.senior_manage_remarks : 'Not Updated',
                smo_detial_analysis: val.smo_detial_analysis,
                som_aprrov_date:
                  val.som_aprrov_date !== null
                    ? format(new Date(val.som_aprrov_date), 'dd-MM-yyyy hh:mm a')
                    : 'Not Updated',
                senior_manage_user:
                  val.senior_manage_user !== null ? val.senior_manage_user.toLowerCase() : '',
                gm_approve_req: val.gm_approve_req,
                gm_approve: val.gm_approve,
                gm:
                  val.gm_approve === 1
                    ? 'Approved'
                    : val.gm_approve === 2
                      ? 'Rejected'
                      : val.gm_approve === 3
                        ? 'On-Hold'
                        : val.gm_approve === 4
                          ? 'Approved'
                          : 'Not Done',
                gm_approve_remarks:
                  val.gm_approve_remarks !== null ? val.gm_approve_remarks : 'Not Updated',
                gm_detial_analysis: val.gm_detial_analysis,
                gm_approv_date:
                  val.gm_approv_date !== null
                    ? format(new Date(val.gm_approv_date), 'dd-MM-yyyy hh:mm a')
                    : 'Not Updated',
                gm_user: val.gm_user !== null ? val.gm_user.toLowerCase() : '',
                md_approve_req: val.md_approve_req,
                md_approve: val.md_approve,
                md:
                  val.md_approve === 1
                    ? 'Approved'
                    : val.md_approve === 2
                      ? 'Rejected'
                      : val.md_approve === 3
                        ? 'On-Hold'
                        : val.md_approve === 4
                          ? 'Approved'
                          : 'Not Done',
                md_approve_remarks:
                  val.md_approve_remarks !== null ? val.md_approve_remarks : 'Not Updated',
                md_detial_analysis: val.md_detial_analysis,
                md_approve_date:
                  val.md_approve_date !== null
                    ? format(new Date(val.md_approve_date), 'dd-MM-yyyy hh:mm a')
                    : 'Not Updated',
                md_user: val.md_user !== null ? val.md_user.toLowerCase() : '',
                ed_approve_req: val.ed_approve_req,
                ed_approve: val.ed_approve,
                ed:
                  val.ed_approve === 1
                    ? 'Approved'
                    : val.ed_approve === 2
                      ? 'Rejected'
                      : val.ed_approve === 3
                        ? 'On-Hold'
                        : val.ed_approve === 4
                          ? 'Approved'
                          : 'Not Done',
                ed_approve_remarks:
                  val.ed_approve_remarks !== null ? val.ed_approve_remarks : 'Not Updated',
                ed_detial_analysis: val.ed_detial_analysis,
                ed_approve_date:
                  val.ed_approve_date !== null
                    ? format(new Date(val.ed_approve_date), 'dd-MM-yyyy hh:mm a')
                    : 'Not Updated',
                ed_user: val.ed_user ? val.ed_user.toLowerCase() : '',

                managing_director_req: val.managing_director_req,
                managing_director_approve: val.managing_director_approve,
                managing:
                  val.managing_director_approve === 1
                    ? 'Approved'
                    : val.managing_director_approve === 2
                      ? 'Rejected'
                      : val.managing_director_approve === 3
                        ? 'On-Hold'
                        : val.managing_director_approve === 4
                          ? 'Approved'
                          : 'Not Done',
                managing_director_remarks:
                  val.managing_director_remarks !== null ? val.managing_director_remarks : '',
                managing_director_analysis: val.managing_director_analysis,
                managing_director_approve_date:
                  val.managing_director_approve_date !== null
                    ? format(new Date(val.managing_director_approve_date), 'dd-MM-yyyy hh:mm a')
                    : 'Not Updated',
                managing_director_user: val.managing_director_username
                  ? val.managing_director_username.toLowerCase()
                  : '',

                now_who:
                  val.req_status === 'C'
                    ? 'CRF Closed'
                    : val.sub_store_recieve === 1
                      ? 'Received in ' + val.sub_store_name
                      : // val.sub_store_recieve === 0 ? "Partial Goods Received in " + val.sub_store_name :
                      val.store_recieve === 1
                        ? 'Item Received in CRS'
                        : // val.store_recieve === 0 && val.store_recieve === 1 ? "Partial Goods Received in CRS" :
                        val.po_to_supplier === 1
                          ? 'Waiting for Goods'
                          : val.approval_level === 3
                            ? "Director's Approved"
                            : val.approval_level === 2
                              ? 'Purchase Manager Approved'
                              : val.approval_level === 1
                                ? 'Purchase Dpt Approved'
                                : val.po_complete === 1
                                  ? 'PO Completed'
                                  : val.po_prepartion === 1
                                    ? 'PO Prepairing'
                                    : val.quatation_fixing === 1
                                      ? 'Quotation Fixed'
                                      : val.quatation_negotiation === 1
                                        ? 'Quotation Negotiation'
                                        : val.quatation_calling_status === 1
                                          ? 'Quotation Calling'
                                          : val.ack_status === 1
                                            ? 'Puchase Acknowledged'
                                            : val.managing_director_approve !== null
                                              ? 'Managing Director'
                                              : val.ed_approve !== null
                                                ? 'ED'
                                                : val.md_approve !== null
                                                  ? 'MD'
                                                  : val.gm_approve !== null
                                                    ? 'GM'
                                                    : val.senior_manage_approv !== null
                                                      ? 'SMO'
                                                      : val.manag_operation_approv !== null
                                                        ? 'MO'
                                                        : val.ms_approve !== null
                                                          ? 'MS'
                                                          : val.dms_approve !== null
                                                            ? 'DMS'
                                                            : val.hod_approve !== null
                                                              ? 'HOD'
                                                              : val.incharge_approve !== null
                                                                ? 'Incharge'
                                                                : 'Not Started',
                now_who_status:
                  val.req_status === 'C'
                    ? ''
                    : val.sub_store_recieve === 1
                      ? 5
                      : val.store_receive === 1
                        ? 5
                        : val.po_to_supplier === 1
                          ? 5
                          : val.approval_level === 3
                            ? 5
                            : val.approval_level === 2
                              ? 5
                              : val.approval_level === 1
                                ? 5
                                : val.po_complete === 1
                                  ? 5
                                  : val.po_prepartion === 1
                                    ? 5
                                    : val.quatation_fixing === 1
                                      ? 5
                                      : val.quatation_negotiation === 1
                                        ? 5
                                        : val.quatation_calling_status === 1
                                          ? 5
                                          : val.ack_status === 1
                                            ? 5
                                            : val.managing_director_approve !== null
                                              ? val.managing_director_approve
                                              : val.ed_approve !== null
                                                ? val.ed_approve
                                                : val.md_approve !== null
                                                  ? val.md_approve
                                                  : val.gm_approve !== null
                                                    ? val.gm_approve
                                                    : val.senior_manage_approv !== null
                                                      ? val.senior_manage_approv
                                                      : val.manag_operation_approv !== null
                                                        ? val.manag_operation_approv
                                                        : val.ms_approve !== null
                                                          ? val.ms_approve
                                                          : val.dms_approve !== null
                                                            ? val.dms_approve
                                                            : val.hod_approve !== null
                                                              ? val.hod_approve
                                                              : val.incharge_approve !== null
                                                                ? val.incharge_approve
                                                                : 0,

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
                quatation_calling_date:
                  val.quatation_calling_date !== null
                    ? format(new Date(val.quatation_calling_date), 'dd-MM-yyyy hh:mm a')
                    : 'Not Updated',
                quatation_user: val.quatation_user,
                quatation_negotiation: val.quatation_negotiation,
                quatation_negotiation_remarks: val.quatation_negotiation_remarks,
                quatation_negotiation_date:
                  val.quatation_negotiation_date !== null
                    ? format(new Date(val.quatation_negotiation_date), 'dd-MM-yyyy hh:mm a')
                    : 'Not Updated',
                quatation_neguser: val.quatation_neguser,
                quatation_fixing: val.quatation_fixing,
                quatation_fixing_remarks: val.quatation_fixing_remarks,
                quatation_fixing_date:
                  val.quatation_fixing_date !== null
                    ? format(new Date(val.quatation_fixing_date), 'dd-MM-yyyy hh:mm a')
                    : 'Not Updated',
                quatation_fixuser: val.quatation_fixuser,
                po_prepartion: val.po_prepartion,
                po_complete: val.po_complete,
                po_complete_date:
                  val.po_complete_date !== null
                    ? format(new Date(val.po_complete_date), 'dd-MM-yyyy hh:mm a')
                    : 'Not Updated',
                pocomplete_user: val.pocomplete_user,
                po_to_supplier: val.po_to_supplier,
                po_to_supplier_date:
                  val.po_to_supplier_date !== null
                    ? format(new Date(val.po_to_supplier_date), 'dd-MM-yyyy hh:mm a')
                    : 'Not Updated',
                store_recieve: val.store_recieve,
                sub_store_recieve: val.sub_store_recieve,
                user_acknldge: val.user_acknldge,
                acknowUser: val.acknowUser,
                user_ack_date:
                  val.user_ack_date !== null
                    ? format(new Date(val.user_ack_date), 'dd-MM-yyyy hh:mm a')
                    : 'Not Updated',
                user_acknldge_remarks:
                  val.user_acknldge_remarks === null ? 'nil' : val.user_acknldge_remarks,
                store_receive_date:
                  val.store_receive_date !== null
                    ? format(new Date(val.store_receive_date), 'dd-MM-yyyy hh:mm a')
                    : 'Not Updated',
                store_receive: val.store_receive,
                crs_user: val.crs_user,
                store_user: val.store_user,
                substore_ack_date:
                  val.substore_ack_date !== null
                    ? format(new Date(val.substore_ack_date), 'dd-MM-yyyy hh:mm a')
                    : 'Not Updated',
              }))
              .sort((a, b) => {
                if (a.sub_store_recieve !== b.sub_store_recieve) {
                  return b.sub_store_recieve - a.sub_store_recieve
                }
                if (a.store_recieve !== b.store_recieve) {
                  return b.store_recieve - a.store_recieve
                }
                return b.req_slno - a.req_slno
              })
            setTableData(crfDetails[0])
            getImage(req_slno)
            getItemDetails(req_slno)
            getApproItemDetails(req_slno)
            getPODetails(req_slno)
            setDisFlag(1)
          } else {
            setOpen(false)
            warningNotify('Please enter valid CRF Number')
          }
        })
      } else {
        setOpen(false)
        warningNotify('Please enter CRF Number before search')
      }
    },
    [req_slno]
  )

  const handleClose = useCallback(() => {
    setImageShowFlag(0)
    setImageShow(false)
  }, [])
  const fileLIst = imagearray?.filter(file => {
    return (
      file.imageName.endsWith('.png') ||
      file.imageName.endsWith('.jpg') ||
      file.imageName.endsWith('.jpeg') ||
      file.imageName.endsWith('.pdf') ||
      file.imageName.endsWith('.jfif')
    )
  })
  const ViewImage = useCallback(file => {
    const fileType = file.imageName
      ? file.imageName.endsWith('.pdf')
        ? 'pdf'
        : 'image'
      : file.type.includes('application/pdf')
        ? 'pdf'
        : 'image'

    const fileUrl = file.url || URL.createObjectURL(file)
    setPreviewFile({ url: fileUrl, type: fileType })
    setImageShow(true)
    setImageShowFlag(1)
  }, [])

  const capitalizeWords = str =>
    str
      ? str

        .toLowerCase()
        .trim()
        .replace(/\s+/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
      : ''
  return (
    <Fragment>
      {/* <ToastContainer /> */}
      <Suspense fallback={<CustomLoadComp />}>
        {imageshowFlag === 1 ? (
          <ReqImageDisModal open={imageshow} handleClose={handleClose} previewFile={previewFile} />
        ) : null}
      </Suspense>
      <CustomBackDrop open={open} text="Please Wait" />
      <Box sx={{ height: window.innerHeight - 80, flexWrap: 'wrap', bgcolor: 'white' }}>
        <Box sx={{ border: '1px solid #B4F5F0' }}>
          <Box sx={{ display: 'flex' }}>
            <Box sx={{ fontWeight: 550, flex: 1, pl: 1, pt: 0.5, color: '#385E72' }}>
              All CRF Report
            </Box>
            <Box
              sx={{ display: 'flex', justifyContent: 'flex-end', flex: 1, fontSize: 20, m: 0.5 }}
            >
              <CssVarsProvider>
                <CustomCloseIconCmp handleChange={backToSetting} />
              </CssVarsProvider>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            pb: 1,
            border: '1px solid lightgrey',
          }}
        >
          <Box sx={{ pt: 1, width: { xs: '100%', md: '50vw', lg: '40vw', xl: '40vw' } }}>
            <Box sx={{ px: 1, display: 'flex' }}>
              <Typography sx={{ fontSize: 13, color: '#1D617A', px: 1, pt: 2, fontWeight: 550 }}>
                CRF No.
              </Typography>
              <Box sx={{ flex: 0.5, pt: 1 }}>
                <CssVarsProvider>
                  <CustomInputDateCmp
                    className={{ width: '100%', height: 35, bgcolor: 'white' }}
                    autoComplete={'off'}
                    type="text"
                    size="sm"
                    name="req_slno"
                    value={req_slno}
                    handleChange={e => setReq_slno(e.target.value)}
                  />
                </CssVarsProvider>
              </Box>
              <Box sx={{ flex: 0.2, px: 0.3, pt: 1 }}>
                <CssVarsProvider>
                  <IconButton
                    sx={{
                      border: '1px solid #bbdefb',
                      width: '100%',
                      fontSize: 13,
                      height: 34,
                      lineHeight: '1.2',
                      color: '#1D617A',
                      bgcolor: 'white',
                      borderRadius: 6,
                      '&:hover': {
                        bgcolor: 'white',
                        color: '#1976d2',
                      },
                    }}
                    onClick={searchCRFDetails}
                  >
                    Search
                  </IconButton>
                </CssVarsProvider>
              </Box>
            </Box>
          </Box>
        </Box>
        {disFlag === 1 ? (
          <Box
            sx={{
              height: window.innerHeight - 200,
              flexWrap: 'wrap',
              bgcolor: 'white',
              overflow: 'auto',
            }}
          >
            <Paper variant="outlined" sx={{ flexWrap: 'wrap' }}>
              <Box sx={{ padding: 1, borderRadius: 2 }}>
                <Typography
                  sx={{ fontWeight: 'bold', marginBottom: 0.5, color: '#145DA0', fontSize: 14 }}
                >
                  CRF/TMC/{tableData.req_slno}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', pl: 1 }}>
                <Box sx={{ display: 'flex', pt: 0.4, flex: 1 }}>
                  <Typography sx={{ fontSize: 14, fontWeight: 600, flex: 0.47 }}>
                    Req.Date
                  </Typography>
                  <Typography sx={{ pl: 0.5 }}> :&nbsp;</Typography>
                  <Box sx={{ pl: 0.3, pt: 0.3, flex: 1 }}>
                    <Typography sx={{ fontSize: 13 }}> {tableData.req_date}</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', pt: 0.4, flex: 0.5 }}>
                  <Typography sx={{ fontSize: 14, fontWeight: 600, pt: 0.2 }}>
                    Expected Date
                  </Typography>
                  <Typography sx={{ pl: 1 }}> :&nbsp;</Typography>
                  <Box sx={{ pl: 0.5, pt: 0.4 }}>
                    <Typography sx={{ fontSize: 13 }}>{tableData.expected_date}</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', flex: 2 }}></Box>
              </Box>
              <Box sx={{ display: 'flex', pl: 1 }}>
                <Typography sx={{ fontSize: 14, fontWeight: 600, flex: 0.2, pt: 1 }}>
                  Purpose
                </Typography>
                <Typography sx={{ pt: 0.7 }}> :&nbsp;</Typography>
                <Box sx={{ pt: 0.5, flex: 2, pl: 0.3 }}>
                  <Typography sx={{ fontSize: 13, pt: 0.5, pr: 1 }}>
                    {tableData.actual_requirement === null
                      ? 'nil'
                      : capitalizeWords(tableData.actual_requirement)}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', pl: 1 }}>
                <Typography sx={{ fontSize: 14, fontWeight: 600, flex: 0.2, pt: 1 }}>
                  Justfication
                </Typography>
                <Typography sx={{ pt: 0.7 }}> :&nbsp;</Typography>
                <Box sx={{ pt: 0.5, flex: 2, pl: 0.3 }}>
                  <Typography sx={{ fontSize: 13, pt: 0.5, pr: 1 }}>
                    {tableData.needed === null ? 'nil' : capitalizeWords(tableData.needed)}
                  </Typography>
                </Box>
              </Box>
              {tableData.image_status === 1 && fileLIst.length > 0 ? (
                <Paper
                  variant="outlined"
                  square
                  sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.2, width: '100%', p: 0.5 }}
                >
                  {fileLIst.length > 0 &&
                    fileLIst?.map((file, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          m: 0.3,
                          border: '1px solid #e0e0e0',
                          borderRadius: '4px',
                          p: 0.5,
                        }}
                      >
                        {file.imageName.endsWith('.png') ||
                          file.imageName.endsWith('.jpg') ||
                          file.imageName.endsWith('.jpeg') ? (
                          <img
                            src={file.url}
                            alt={file.imageName}
                            style={{
                              width: '40px',
                              height: '40px',
                              objectFit: 'cover',
                              borderRadius: '4px',
                              marginRight: '8px',
                              cursor: 'pointer',
                            }}
                            onClick={() => ViewImage(file)}
                          />
                        ) : file.imageName.endsWith('.pdf') ? (
                          <PictureAsPdfIcon
                            sx={{
                              width: '40px',
                              height: '40px',
                              color: '#e53935',
                              marginRight: '8px',
                              cursor: 'pointer',
                            }}
                            onClick={() => ViewImage(file)}
                          />
                        ) : (
                          <InsertDriveFileIcon
                            sx={{
                              width: '40px',
                              height: '40px',
                              color: '#9e9e9e',
                              marginRight: '8px',
                              cursor: 'pointer',
                            }}
                            onClick={() => ViewImage(file)}
                          />
                        )}
                        <Box sx={{ fontSize: 14, cursor: 'pointer', flexGrow: 1, pr: 0.5 }}>
                          {file.imageName}
                        </Box>
                      </Box>
                    ))}
                </Paper>
              ) : null}
            </Paper>
            {reqItems && reqItems.length !== 0 ? (
              <CssVarsProvider>
                <ReqItemDisplay reqItems={reqItems} />
              </CssVarsProvider>
            ) : null}
            {approveTableData.length !== 0 &&
              (tableData.incharge_approve === 1 || tableData.hod_approve === 1) ? (
              <CssVarsProvider>
                <Box sx={{ mt: 0.3 }}>
                  <ApprovedItemListDis approveTableData={approveTableData} />
                </Box>
              </CssVarsProvider>
            ) : null}
            {tableData.hod_approve !== null || tableData.incharge_approve !== null ? (
              <>
                <Paper
                  variant="outlined"
                  square
                  sx={{ flexWrap: 'wrap', p: 0.3, mt: 0.7, mx: 0.7, pb: 0.7 }}
                >
                  <Typography
                    sx={{ fontWeight: 'bold', px: 1, py: 0.7, color: '#145DA0', fontSize: 14 }}
                  >
                    Approval Details
                  </Typography>
                  <CssVarsProvider>
                    <Grid container spacing={0.5} sx={{ flexGrow: 1 }}>
                      {tableData.incharge_req === 1 && tableData.incharge_remarks !== null ? (
                        <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                          <Paper variant="outlined" sx={{ overflow: 'auto', flexWrap: 'wrap' }}>
                            <Box
                              sx={{ display: 'flex', pt: 0.5, borderBottom: '1px solid lightgrey' }}
                            >
                              <Typography
                                sx={{
                                  fontWeight: 'bold',
                                  ml: 1,
                                  py: 0.5,
                                  color: '#145DA0',
                                  fontSize: 14,
                                  flex: 0.33,
                                }}
                              >
                                Department Approval
                              </Typography>
                              <Box sx={{ flex: 1, display: 'flex' }}>
                                <Typography
                                  sx={{
                                    fontWeight: 'bold',
                                    mr: 1,
                                    py: 0.5,
                                    color: '#145DA0',
                                    fontSize: 14,
                                  }}
                                >
                                  Incharge
                                </Typography>
                                <Box sx={{ py: 0.4, pl: 1 }}>
                                  <Chip
                                    size="md"
                                    variant="outlined"
                                    sx={{
                                      color:
                                        tableData.incharge_approve === 1
                                          ? '#2e7d32'
                                          : tableData.incharge_approve === 2
                                            ? '#bf360c'
                                            : tableData.incharge_approve === 3
                                              ? '#FF9800'
                                              : '#607D8B',
                                      height: 25,
                                      pb: 0.5,
                                      fontSize: 12,
                                      fontWeight: 550,
                                    }}
                                  >
                                    {tableData.incharge}
                                  </Chip>
                                </Box>
                              </Box>
                            </Box>
                            <Box sx={{ pt: 0.1 }}>
                              {tableData.incharge_approve === 1 &&
                                tableData.incharge_remarks !== null ? (
                                <Box sx={{ pt: 0.5 }}>
                                  <Box sx={{ display: 'flex' }}>
                                    <Typography sx={{ pl: 1, fontSize: 14, flex: 0.4 }}>
                                      Justification/ Requirement Description{' '}
                                    </Typography>
                                    <Typography sx={{ pl: 0.5 }}> :&nbsp;</Typography>
                                    <Typography
                                      sx={{
                                        height: 'auto',
                                        fontSize: 13,
                                        fontWeight: 550,
                                        flex: 1,
                                        pr: 0.5,
                                        pt: 0.3,
                                      }}
                                    >
                                      {tableData.incharge_remarks === null
                                        ? 'Not Updated'
                                        : tableData.incharge_remarks}
                                    </Typography>
                                  </Box>
                                  <Box sx={{ display: 'flex', pt: 1 }}>
                                    <Typography sx={{ pl: 1, fontSize: 14, flex: 0.4 }}>
                                      Detailed Analysis of Requirement
                                    </Typography>
                                    <Typography sx={{ pl: 0.5 }}> :&nbsp;</Typography>
                                    <Typography
                                      sx={{
                                        height: 'auto',
                                        fontSize: 13,
                                        fontWeight: 550,
                                        flex: 1,
                                        pr: 0.5,
                                        pt: 0.3,
                                      }}
                                    >
                                      {tableData.inch_detial_analysis === null
                                        ? 'Not Updated'
                                        : tableData.inch_detial_analysis}
                                    </Typography>
                                  </Box>
                                </Box>
                              ) : tableData.incharge_approve === 2 &&
                                tableData.incharge_remarks !== null ? (
                                <Box sx={{ display: 'flex', pt: 0.5 }}>
                                  <Typography sx={{ pl: 1, fontSize: 14, flex: 0.4 }}>
                                    Justification for Reject{' '}
                                  </Typography>
                                  <Typography sx={{ pl: 0.5 }}> :&nbsp;</Typography>
                                  <Typography
                                    sx={{
                                      height: 'auto',
                                      fontSize: 13,
                                      fontWeight: 550,
                                      flex: 1,
                                      pr: 0.5,
                                      pt: 0.3,
                                    }}
                                  >
                                    {tableData.incharge_remarks === null
                                      ? 'Not Updated'
                                      : tableData.incharge_remarks}
                                  </Typography>
                                </Box>
                              ) : tableData.incharge_approve === 3 &&
                                tableData.incharge_remarks !== null ? (
                                <Box sx={{ display: 'flex', pt: 0.5 }}>
                                  <Typography sx={{ pl: 1, fontSize: 14, flex: 0.4 }}>
                                    Justification for On-Hold
                                  </Typography>
                                  <Typography sx={{ pl: 0.5 }}> :&nbsp;</Typography>
                                  <Typography
                                    sx={{
                                      height: 'auto',
                                      fontSize: 13,
                                      fontWeight: 550,
                                      flex: 1,
                                      pr: 0.5,
                                      pt: 0.3,
                                    }}
                                  >
                                    {tableData.incharge_remarks === null
                                      ? 'Not Updated'
                                      : tableData.incharge_remarks}
                                  </Typography>
                                </Box>
                              ) : null}
                              {tableData.incharge_apprv_date !== null ? (
                                <Box sx={{ display: 'flex', py: 1 }}>
                                  {tableData.incharge_approve === 1 ? (
                                    <Typography sx={{ pl: 1, fontSize: 13, flex: 0.4 }}>
                                      Approved by{' '}
                                    </Typography>
                                  ) : tableData.incharge_approve === 2 ? (
                                    <Typography sx={{ pl: 1, fontSize: 13, flex: 0.4 }}>
                                      Rejected by{' '}
                                    </Typography>
                                  ) : tableData.incharge_approve === 3 ? (
                                    <Typography sx={{ pl: 1, fontSize: 13, flex: 0.4 }}>
                                      On-Hold by{' '}
                                    </Typography>
                                  ) : null}
                                  <Box sx={{ display: 'flex', flex: 1 }}>
                                    <Typography> :&nbsp;</Typography>
                                    <Typography
                                      sx={{
                                        height: 'auto',
                                        fontSize: 13,
                                        fontWeight: 550,
                                        pt: 0.3,
                                        pl: 0.2,
                                      }}
                                    >
                                      {capitalizeWords(tableData.incharge_user)}
                                    </Typography>
                                    <Typography
                                      sx={{
                                        height: 'auto',
                                        fontSize: 13,
                                        fontWeight: 550,
                                        pl: 2,
                                        pt: 0.3,
                                      }}
                                    >
                                      {tableData.incharge_apprv_date}
                                    </Typography>
                                  </Box>
                                </Box>
                              ) : null}
                            </Box>
                          </Paper>
                        </Grid>
                      ) : null}
                    </Grid>
                    {tableData.hod_req === 1 && tableData.hod_approve !== null ? (
                      <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                        <Paper
                          variant="outlined"
                          sx={{
                            overflow: 'auto',
                            flexWrap: 'wrap',
                            wordWrap: 'break-word',
                            whiteSpace: 'normal',
                          }}
                        >
                          <Box
                            sx={{ display: 'flex', pt: 0.5, borderBottom: '1px solid lightgrey' }}
                          >
                            <Typography
                              sx={{
                                fontWeight: 'bold',
                                mx: 1,
                                py: 0.5,
                                color: '#145DA0',
                                fontSize: 14,
                                flex: 0.4,
                              }}
                            >
                              HOD
                            </Typography>
                            <Box sx={{ flex: 1, py: 0.4, ml: 2 }}>
                              <Chip
                                size="md"
                                variant="outlined"
                                sx={{
                                  color:
                                    tableData.hod_approve === 1
                                      ? '#2e7d32'
                                      : tableData.hod_approve === 2
                                        ? '#bf360c'
                                        : tableData.hod_approve === 3
                                          ? '#FF9800'
                                          : '#607D8B',
                                  height: 25,
                                  pb: 0.5,
                                  fontSize: 12,
                                  fontWeight: 550,
                                }}
                              >
                                {tableData.hod}
                              </Chip>
                            </Box>
                          </Box>
                          <Box sx={{ pt: 0.1 }}>
                            {tableData.hod_approve === 1 && tableData.hod_remarks !== null ? (
                              <Box sx={{ pt: 0.5 }}>
                                <Box sx={{ display: 'flex' }}>
                                  <Typography sx={{ pl: 1, fontSize: 14, flex: 0.4 }}>
                                    Justification/ Requirement Description{' '}
                                  </Typography>
                                  <Typography sx={{ pl: 0.5 }}> :&nbsp;</Typography>
                                  <Typography
                                    sx={{
                                      height: 'auto',
                                      fontSize: 13,
                                      fontWeight: 550,
                                      flex: 1,
                                      pr: 0.5,
                                      pt: 0.3,
                                    }}
                                  >
                                    {tableData.hod_remarks === null
                                      ? 'Not Updated'
                                      : tableData.hod_remarks}{' '}
                                  </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', pt: 1 }}>
                                  <Typography sx={{ pl: 1, fontSize: 14, flex: 0.4 }}>
                                    Detailed Analysis of Requirement
                                  </Typography>
                                  <Typography sx={{ pl: 0.5 }}> :&nbsp;</Typography>
                                  <Typography
                                    sx={{
                                      height: 'auto',
                                      fontSize: 13,
                                      fontWeight: 550,
                                      flex: 1,
                                      pr: 0.5,
                                      pt: 0.3,
                                    }}
                                  >
                                    {tableData.hod_detial_analysis === null
                                      ? 'Not Updated'
                                      : tableData.hod_detial_analysis}
                                  </Typography>
                                </Box>
                              </Box>
                            ) : tableData.hod_approve === 2 && tableData.hod_remarks !== null ? (
                              <Box sx={{ display: 'flex', pt: 0.5 }}>
                                <Typography sx={{ pl: 1, fontSize: 14, flex: 0.4 }}>
                                  Justification for Reject{' '}
                                </Typography>
                                <Typography sx={{ pl: 0.5 }}> :&nbsp;</Typography>
                                <Typography
                                  sx={{
                                    height: 'auto',
                                    fontSize: 13,
                                    fontWeight: 550,
                                    flex: 1,
                                    pr: 0.5,
                                    pt: 0.3,
                                  }}
                                >
                                  {tableData.hod_remarks === null
                                    ? 'Not Updated'
                                    : tableData.hod_remarks}
                                </Typography>
                              </Box>
                            ) : tableData.hod_approve === 3 && tableData.hod_remarks !== null ? (
                              <Box sx={{ display: 'flex', pt: 0.5 }}>
                                <Typography sx={{ pl: 1, fontSize: 14, flex: 0.4 }}>
                                  Justification for On-Hold
                                </Typography>
                                <Typography sx={{ pl: 0.5 }}> :&nbsp;</Typography>
                                <Typography
                                  sx={{
                                    height: 'auto',
                                    fontSize: 13,
                                    fontWeight: 550,
                                    flex: 1,
                                    pr: 0.5,
                                    pt: 0.3,
                                  }}
                                >
                                  {tableData.hod_remarks === null
                                    ? 'Not Updated'
                                    : tableData.hod_remarks}
                                </Typography>
                              </Box>
                            ) : null}
                            {tableData.hod_approve_date !== null ? (
                              <Box sx={{ display: 'flex', py: 1 }}>
                                {tableData.hod_approve === 1 ? (
                                  <Typography sx={{ pl: 1, fontSize: 13, flex: 0.4 }}>
                                    Approved by{' '}
                                  </Typography>
                                ) : tableData.hod_approve === 2 ? (
                                  <Typography sx={{ pl: 1, fontSize: 13, flex: 0.4 }}>
                                    Rejected by{' '}
                                  </Typography>
                                ) : tableData.hod_approve === 3 ? (
                                  <Typography sx={{ pl: 1, fontSize: 13, flex: 0.4 }}>
                                    On-Hold by{' '}
                                  </Typography>
                                ) : null}
                                <Box sx={{ display: 'flex', flex: 1 }}>
                                  <Typography sx={{}}> :&nbsp;</Typography>
                                  <Typography
                                    sx={{
                                      height: 'auto',
                                      fontSize: 13,
                                      fontWeight: 550,
                                      pt: 0.3,
                                      pl: 0.2,
                                    }}
                                  >
                                    {capitalizeWords(tableData.hod_user)}
                                  </Typography>
                                  <Typography
                                    sx={{
                                      height: 'auto',
                                      fontSize: 13,
                                      fontWeight: 550,
                                      pl: 2,
                                      pt: 0.3,
                                    }}
                                  >
                                    {tableData.hod_approve_date}
                                  </Typography>
                                </Box>
                              </Box>
                            ) : null}
                          </Box>
                        </Paper>
                      </Grid>
                    ) : null}
                    {tableData.dms_req === 1 && tableData.dms_approve !== null ? (
                      <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                        <Paper variant="outlined" sx={{ overflow: 'auto', flexWrap: 'wrap' }}>
                          <Box
                            sx={{ display: 'flex', pt: 0.5, borderBottom: '1px solid lightgrey' }}
                          >
                            <Typography
                              sx={{
                                fontWeight: 'bold',
                                mx: 1,
                                py: 0.5,
                                color: '#145DA0',
                                fontSize: 14,
                                flex: 0.4,
                              }}
                            >
                              DMS
                            </Typography>
                            <Box sx={{ flex: 1, py: 0.4, ml: 2 }}>
                              <Chip
                                size="md"
                                variant="outlined"
                                sx={{
                                  color:
                                    tableData.dms_approve === 1
                                      ? '#2e7d32'
                                      : tableData.dms_approve === 2
                                        ? '#bf360c'
                                        : tableData.dms_approve === 3
                                          ? '#FF9800'
                                          : tableData.dms_approve === 4
                                            ? '#009688'
                                            : '#607D8B',
                                  height: 25,
                                  pb: 0.5,
                                  fontSize: 12,
                                  fontWeight: 550,
                                }}
                              >
                                {tableData.dms}
                              </Chip>
                            </Box>
                          </Box>
                          <Box sx={{ pt: 0.1 }}>
                            {tableData.dms_approve === 1 && tableData.dms_remarks !== null ? (
                              <Box sx={{ pt: 0.5 }}>
                                <Box sx={{ display: 'flex' }}>
                                  <Typography sx={{ pl: 1, fontSize: 14, flex: 0.4 }}>
                                    Justification/ Requirement Description{' '}
                                  </Typography>
                                  <Typography sx={{ pl: 0.5 }}> :&nbsp;</Typography>
                                  <Typography
                                    sx={{
                                      height: 'auto',
                                      fontSize: 13,
                                      fontWeight: 550,
                                      flex: 1,
                                      pr: 0.5,
                                      pt: 0.3,
                                    }}
                                  >
                                    {tableData.dms_remarks === null
                                      ? 'Not Updated'
                                      : tableData.dms_remarks}
                                  </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', pt: 1 }}>
                                  <Typography sx={{ pl: 1, fontSize: 14, flex: 0.4 }}>
                                    Detailed Analysis of Requirement
                                  </Typography>
                                  <Typography sx={{ pl: 0.5 }}> :&nbsp;</Typography>
                                  <Typography
                                    sx={{
                                      height: 'auto',
                                      fontSize: 13,
                                      fontWeight: 550,
                                      flex: 1,
                                      pr: 0.5,
                                      pt: 0.3,
                                    }}
                                  >
                                    {tableData.dms_detail_analysis === null
                                      ? 'Not Updated'
                                      : tableData.dms_detail_analysis}
                                  </Typography>
                                </Box>
                              </Box>
                            ) : tableData.dms_approve === 2 && tableData.dms_remarks !== null ? (
                              <Box sx={{ display: 'flex', pt: 0.5 }}>
                                <Typography sx={{ pl: 1, fontSize: 14, flex: 0.4 }}>
                                  Justification for Reject{' '}
                                </Typography>
                                <Typography sx={{ pl: 0.5 }}> :&nbsp;</Typography>
                                <Typography
                                  sx={{
                                    height: 'auto',
                                    fontSize: 13,
                                    fontWeight: 550,
                                    flex: 1,
                                    pr: 0.5,
                                    pt: 0.3,
                                  }}
                                >
                                  {tableData.dms_remarks === null
                                    ? 'Not Updated'
                                    : tableData.dms_remarks}{' '}
                                </Typography>
                              </Box>
                            ) : tableData.dms_approve === 3 && tableData.dms_remarks !== null ? (
                              <Box sx={{ display: 'flex', pt: 0.5 }}>
                                <Typography sx={{ pl: 1, fontSize: 14, flex: 0.4 }}>
                                  Justification for On-Hold
                                </Typography>
                                <Typography sx={{ pl: 0.5 }}> :&nbsp;</Typography>
                                <Typography
                                  sx={{
                                    height: 'auto',
                                    fontSize: 13,
                                    fontWeight: 550,
                                    flex: 1,
                                    pr: 0.5,
                                    pt: 0.3,
                                  }}
                                >
                                  {tableData.dms_remarks === null
                                    ? 'Not Updated'
                                    : tableData.dms_remarks}{' '}
                                </Typography>
                              </Box>
                            ) : tableData.dms_approve === 4 && tableData.dms_remarks !== null ? (
                              <Box sx={{ display: 'flex', pt: 0.5 }}>
                                <Typography sx={{ pl: 1, fontSize: 14, flex: 0.4 }}>
                                  Remarks
                                </Typography>
                                <Typography sx={{ pl: 0.5 }}> :&nbsp;</Typography>
                                <Typography
                                  sx={{
                                    height: 'auto',
                                    fontSize: 13,
                                    fontWeight: 550,
                                    flex: 1,
                                    pr: 0.5,
                                    pt: 0.3,
                                  }}
                                >
                                  {tableData.dms_remarks === null
                                    ? 'Not Updated'
                                    : tableData.dms_remarks}{' '}
                                </Typography>
                              </Box>
                            ) : null}
                            {tableData.dms_approve_date !== null ? (
                              <Box sx={{ display: 'flex', py: 1 }}>
                                {tableData.dms_approve === 1 || tableData.dms_approve === 4 ? (
                                  <Typography sx={{ pl: 1, fontSize: 13, flex: 0.4 }}>
                                    Approved by{' '}
                                  </Typography>
                                ) : tableData.dms_approve === 2 ? (
                                  <Typography sx={{ pl: 1, fontSize: 13, flex: 0.4 }}>
                                    Rejected by{' '}
                                  </Typography>
                                ) : tableData.dms_approve === 3 ? (
                                  <Typography sx={{ pl: 1, fontSize: 13, flex: 0.4 }}>
                                    On-Hold by{' '}
                                  </Typography>
                                ) : null}
                                <Box sx={{ display: 'flex', flex: 1 }}>
                                  <Typography sx={{}}> :&nbsp;</Typography>
                                  <Typography
                                    sx={{
                                      height: 'auto',
                                      fontSize: 13,
                                      fontWeight: 550,
                                      pt: 0.3,
                                      pl: 0.2,
                                    }}
                                  >
                                    {capitalizeWords(tableData.dms_user)}
                                  </Typography>
                                  <Typography
                                    sx={{
                                      height: 'auto',
                                      fontSize: 13,
                                      fontWeight: 550,
                                      pl: 2,
                                      pt: 0.3,
                                    }}
                                  >
                                    {tableData.dms_approve_date}
                                  </Typography>
                                </Box>
                              </Box>
                            ) : null}
                          </Box>
                        </Paper>
                      </Grid>
                    ) : null}
                    {tableData.ms_approve_req === 1 && tableData.ms_approve !== null ? (
                      <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                        <Paper variant="outlined" sx={{ overflow: 'auto', flexWrap: 'wrap' }}>
                          <Box
                            sx={{ display: 'flex', pt: 0.5, borderBottom: '1px solid lightgrey' }}
                          >
                            <Typography
                              sx={{
                                fontWeight: 'bold',
                                mx: 1,
                                py: 0.5,
                                color: '#145DA0',
                                fontSize: 14,
                                flex: 0.4,
                              }}
                            >
                              MS
                            </Typography>
                            <Box sx={{ flex: 1, py: 0.4, ml: 2 }}>
                              <Chip
                                size="md"
                                variant="outlined"
                                sx={{
                                  color:
                                    tableData.ms_approve === 1
                                      ? '#2e7d32'
                                      : tableData.ms_approve === 2
                                        ? '#bf360c'
                                        : tableData.ms_approve === 3
                                          ? '#FF9800'
                                          : tableData.ms_approve === 4
                                            ? '#009688'
                                            : '#607D8B',
                                  height: 25,
                                  pb: 0.5,
                                  fontSize: 12,
                                  fontWeight: 550,
                                }}
                              >
                                {tableData.ms}
                              </Chip>
                            </Box>
                          </Box>

                          <Box sx={{ pt: 0.1 }}>
                            {tableData.ms_approve === 1 && tableData.ms_approve_remark !== null ? (
                              <Box sx={{ pt: 0.5 }}>
                                <Box sx={{ display: 'flex' }}>
                                  <Typography sx={{ pl: 1, fontSize: 14, flex: 0.4 }}>
                                    Justification/ Requirement Description{' '}
                                  </Typography>
                                  <Typography sx={{ pl: 0.5 }}> :&nbsp;</Typography>
                                  <Typography
                                    sx={{
                                      height: 'auto',
                                      fontSize: 13,
                                      fontWeight: 550,
                                      flex: 1,
                                      pr: 0.5,
                                      pt: 0.3,
                                    }}
                                  >
                                    {tableData.ms_approve_remark === null
                                      ? 'Not Updated'
                                      : tableData.ms_approve_remark}
                                  </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', pt: 1 }}>
                                  <Typography sx={{ pl: 1, fontSize: 14, flex: 0.4 }}>
                                    Detailed Analysis of Requirement
                                  </Typography>
                                  <Typography sx={{ pl: 0.5 }}> :&nbsp;</Typography>
                                  <Typography
                                    sx={{
                                      height: 'auto',
                                      fontSize: 13,
                                      fontWeight: 550,
                                      flex: 1,
                                      pr: 0.5,
                                      pt: 0.3,
                                    }}
                                  >
                                    {tableData.ms_detail_analysis === null
                                      ? 'Not Updated'
                                      : tableData.ms_detail_analysis}
                                  </Typography>
                                </Box>
                              </Box>
                            ) : tableData.ms_approve === 2 &&
                              tableData.ms_approve_remark !== null ? (
                              <Box sx={{ display: 'flex', pt: 0.5 }}>
                                <Typography sx={{ pl: 1, fontSize: 14, flex: 0.4 }}>
                                  Justification for Reject{' '}
                                </Typography>
                                <Typography sx={{ pl: 0.5 }}> :&nbsp;</Typography>
                                <Typography
                                  sx={{
                                    height: 'auto',
                                    fontSize: 13,
                                    fontWeight: 550,
                                    flex: 1,
                                    pr: 0.5,
                                    pt: 0.3,
                                  }}
                                >
                                  {tableData.ms_approve_remark === null
                                    ? 'Not Updated'
                                    : tableData.ms_approve_remark}
                                </Typography>
                              </Box>
                            ) : tableData.ms_approve === 3 &&
                              tableData.ms_approve_remark !== null ? (
                              <Box sx={{ display: 'flex', pt: 0.5 }}>
                                <Typography sx={{ pl: 1, fontSize: 14, flex: 0.4 }}>
                                  Justification for On-Hold
                                </Typography>
                                <Typography sx={{ pl: 0.5 }}> :&nbsp;</Typography>
                                <Typography
                                  sx={{
                                    height: 'auto',
                                    fontSize: 13,
                                    fontWeight: 550,
                                    flex: 1,
                                    pr: 0.5,
                                    pt: 0.3,
                                  }}
                                >
                                  {tableData.ms_approve_remark === null
                                    ? 'Not Updated'
                                    : tableData.ms_approve_remark}{' '}
                                </Typography>
                              </Box>
                            ) : tableData.ms_approve === 4 &&
                              tableData.ms_approve_remark !== null ? (
                              <Box sx={{ display: 'flex', pt: 0.5 }}>
                                <Typography sx={{ pl: 1, fontSize: 14, flex: 0.4 }}>
                                  Remarks
                                </Typography>
                                <Typography sx={{ pl: 0.5 }}> :&nbsp;</Typography>
                                <Typography
                                  sx={{
                                    height: 'auto',
                                    fontSize: 13,
                                    fontWeight: 550,
                                    flex: 1,
                                    pr: 0.5,
                                    pt: 0.3,
                                  }}
                                >
                                  {tableData.ms_approve_remark === null
                                    ? 'Not Updated'
                                    : tableData.ms_approve_remark}{' '}
                                </Typography>
                              </Box>
                            ) : null}
                            {tableData.ms_approve_date !== null ? (
                              <Box sx={{ display: 'flex', py: 1 }}>
                                {tableData.ms_approve === 1 || tableData.ms_approve === 4 ? (
                                  <Typography sx={{ pl: 1, fontSize: 13, flex: 0.4 }}>
                                    Approved by{' '}
                                  </Typography>
                                ) : tableData.ms_approve === 2 ? (
                                  <Typography sx={{ pl: 1, fontSize: 13, flex: 0.4 }}>
                                    Rejected by{' '}
                                  </Typography>
                                ) : tableData.ms_approve === 3 ? (
                                  <Typography sx={{ pl: 1, fontSize: 13, flex: 0.4 }}>
                                    On-Hold by{' '}
                                  </Typography>
                                ) : null}
                                <Box sx={{ display: 'flex', flex: 1 }}>
                                  <Typography sx={{}}> :&nbsp;</Typography>
                                  <Typography
                                    sx={{
                                      height: 'auto',
                                      fontSize: 13,
                                      fontWeight: 550,
                                      pt: 0.3,
                                      pl: 0.2,
                                    }}
                                  >
                                    {capitalizeWords(tableData.ms_approve_user)}
                                  </Typography>
                                  <Typography
                                    sx={{
                                      height: 'auto',
                                      fontSize: 13,
                                      fontWeight: 550,
                                      pl: 2,
                                      pt: 0.3,
                                    }}
                                  >
                                    {tableData.ms_approve_date}
                                  </Typography>
                                </Box>
                              </Box>
                            ) : null}
                          </Box>
                        </Paper>
                      </Grid>
                    ) : null}
                    {tableData.manag_operation_req === 1 &&
                      tableData.manag_operation_approv !== null ? (
                      <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                        <Paper variant="outlined" sx={{ overflow: 'auto', flexWrap: 'wrap' }}>
                          <Box
                            sx={{ display: 'flex', pt: 0.5, borderBottom: '1px solid lightgrey' }}
                          >
                            <Typography
                              sx={{
                                fontWeight: 'bold',
                                mx: 1,
                                py: 0.5,
                                color: '#145DA0',
                                fontSize: 14,
                                flex: 0.4,
                              }}
                            >
                              CRF Documentaion
                            </Typography>
                            <Box sx={{ flex: 1, py: 0.4, ml: 2 }}>
                              <Chip
                                size="md"
                                variant="outlined"
                                sx={{
                                  color:
                                    tableData.manag_operation_approv === 1
                                      ? '#2e7d32'
                                      : tableData.manag_operation_approv === 2
                                        ? '#bf360c'
                                        : tableData.manag_operation_approv === 3
                                          ? '#FF9800'
                                          : tableData.manag_operation_approv === 4
                                            ? '#009688'
                                            : '#607D8B',
                                  height: 25,
                                  pb: 0.5,
                                  fontSize: 12,
                                  fontWeight: 550,
                                }}
                              >
                                {tableData.om}
                              </Chip>
                            </Box>
                          </Box>
                          <Box sx={{ pt: 0.1 }}>
                            {tableData.manag_operation_approv === 1 &&
                              tableData.manag_operation_remarks !== null ? (
                              <Box sx={{ pt: 0.5 }}>
                                <Box sx={{ display: 'flex' }}>
                                  <Typography sx={{ pl: 1, fontSize: 14, flex: 0.4 }}>
                                    Justification/ Requirement Description{' '}
                                  </Typography>
                                  <Typography sx={{ pl: 0.5 }}> :&nbsp;</Typography>
                                  <Typography
                                    sx={{
                                      height: 'auto',
                                      fontSize: 13,
                                      fontWeight: 550,
                                      flex: 1,
                                      pr: 0.5,
                                      pt: 0.3,
                                    }}
                                  >
                                    {tableData.manag_operation_remarks === null
                                      ? 'Not Updated'
                                      : tableData.manag_operation_remarks}{' '}
                                  </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', pt: 1 }}>
                                  <Typography sx={{ pl: 1, fontSize: 14, flex: 0.4 }}>
                                    Detailed Analysis of Requirement
                                  </Typography>
                                  <Typography sx={{ pl: 0.5 }}> :&nbsp;</Typography>
                                  <Typography
                                    sx={{
                                      height: 'auto',
                                      fontSize: 13,
                                      fontWeight: 550,
                                      flex: 1,
                                      pr: 0.5,
                                      pt: 0.3,
                                    }}
                                  >
                                    {tableData.om_detial_analysis === null
                                      ? 'Not Updated'
                                      : tableData.om_detial_analysis}{' '}
                                    {tableData.om_detial_analysis}
                                  </Typography>
                                </Box>
                              </Box>
                            ) : tableData.manag_operation_approv === 2 &&
                              tableData.manag_operation_remarks !== null ? (
                              <Box sx={{ display: 'flex', pt: 0.5 }}>
                                <Typography sx={{ pl: 1, fontSize: 14, flex: 0.4 }}>
                                  Justification for Reject{' '}
                                </Typography>
                                <Typography sx={{ pl: 0.5 }}> :&nbsp;</Typography>
                                <Typography
                                  sx={{
                                    height: 'auto',
                                    fontSize: 13,
                                    fontWeight: 550,
                                    flex: 1,
                                    pr: 0.5,
                                    pt: 0.3,
                                  }}
                                >
                                  {tableData.manag_operation_remarks === null
                                    ? 'Not Updated'
                                    : tableData.manag_operation_remarks}{' '}
                                </Typography>
                              </Box>
                            ) : tableData.manag_operation_approv === 3 &&
                              tableData.manag_operation_remarks !== null ? (
                              <Box sx={{ display: 'flex', pt: 0.5 }}>
                                <Typography sx={{ pl: 1, fontSize: 14, flex: 0.4 }}>
                                  Justification for On-Hold
                                </Typography>
                                <Typography sx={{ pl: 0.5 }}> :&nbsp;</Typography>
                                <Typography
                                  sx={{
                                    height: 'auto',
                                    fontSize: 13,
                                    fontWeight: 550,
                                    flex: 1,
                                    pr: 0.5,
                                    pt: 0.3,
                                  }}
                                >
                                  {tableData.manag_operation_remarks === null
                                    ? 'Not Updated'
                                    : tableData.manag_operation_remarks}
                                </Typography>
                              </Box>
                            ) : tableData.manag_operation_approv === 4 &&
                              tableData.manag_operation_remarks !== null ? (
                              <Box sx={{ display: 'flex', pt: 0.5 }}>
                                <Typography sx={{ pl: 1, fontSize: 14, flex: 0.4 }}>
                                  Remarks
                                </Typography>
                                <Typography sx={{ pl: 0.5 }}> :&nbsp;</Typography>
                                <Typography
                                  sx={{
                                    height: 'auto',
                                    fontSize: 13,
                                    fontWeight: 550,
                                    flex: 1,
                                    pr: 0.5,
                                    pt: 0.3,
                                  }}
                                >
                                  {tableData.manag_operation_remarks === null
                                    ? 'Not Updated'
                                    : tableData.manag_operation_remarks}
                                </Typography>
                              </Box>
                            ) : null}
                            {tableData.om_approv_date !== null ? (
                              <Box sx={{ display: 'flex', py: 1 }}>
                                {tableData.manag_operation_approv === 1 ||
                                  tableData.manag_operation_approv === 4 ? (
                                  <Typography sx={{ pl: 1, fontSize: 13, flex: 0.4 }}>
                                    Approved by{' '}
                                  </Typography>
                                ) : tableData.manag_operation_approv === 2 ? (
                                  <Typography sx={{ pl: 1, fontSize: 13, flex: 0.4 }}>
                                    Rejected by{' '}
                                  </Typography>
                                ) : tableData.manag_operation_approv === 3 ? (
                                  <Typography sx={{ pl: 1, fontSize: 13, flex: 0.4 }}>
                                    On-Hold by{' '}
                                  </Typography>
                                ) : null}
                                <Box sx={{ display: 'flex', flex: 1 }}>
                                  <Typography> :&nbsp;</Typography>
                                  <Typography
                                    sx={{
                                      height: 'auto',
                                      fontSize: 13,
                                      fontWeight: 550,
                                      pt: 0.3,
                                      pl: 0.2,
                                    }}
                                  >
                                    {capitalizeWords(tableData.manag_operation_user)}
                                  </Typography>
                                  <Typography
                                    sx={{
                                      height: 'auto',
                                      fontSize: 13,
                                      fontWeight: 550,
                                      pl: 2,
                                      pt: 0.3,
                                    }}
                                  >
                                    {tableData.om_approv_date}
                                  </Typography>
                                </Box>
                              </Box>
                            ) : null}
                          </Box>
                        </Paper>
                      </Grid>
                    ) : null}
                    {tableData.senior_manage_req === 1 &&
                      tableData.senior_manage_approv !== null ? (
                      <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                        <Paper variant="outlined" sx={{ overflow: 'auto', flexWrap: 'wrap' }}>
                          <Box
                            sx={{ display: 'flex', pt: 0.5, borderBottom: '1px solid lightgrey' }}
                          >
                            <Typography
                              sx={{
                                fontWeight: 'bold',
                                mx: 1,
                                py: 0.5,
                                color: '#145DA0',
                                fontSize: 14,
                                flex: 0.4,
                              }}
                            >
                              CRF Verification
                            </Typography>
                            <Box sx={{ flex: 1, py: 0.4, ml: 2 }}>
                              <Chip
                                size="md"
                                variant="outlined"
                                sx={{
                                  color:
                                    tableData.senior_manage_approv === 1
                                      ? '#2e7d32'
                                      : tableData.senior_manage_approv === 2
                                        ? '#bf360c'
                                        : tableData.senior_manage_approv === 3
                                          ? '#FF9800'
                                          : tableData.senior_manage_approv === 4
                                            ? '#009688'
                                            : '#607D8B',
                                  height: 25,
                                  pb: 0.5,
                                  fontSize: 12,
                                  fontWeight: 550,
                                }}
                              >
                                {tableData.smo}
                              </Chip>
                            </Box>
                          </Box>
                          <Box sx={{ pt: 0.1 }}>
                            {tableData.senior_manage_approv === 1 &&
                              tableData.senior_manage_remarks !== null ? (
                              <Box sx={{ pt: 0.5 }}>
                                <Box sx={{ display: 'flex' }}>
                                  <Typography sx={{ pl: 1, fontSize: 14, flex: 0.4 }}>
                                    Justification/ Requirement Description{' '}
                                  </Typography>
                                  <Typography sx={{ pl: 0.5 }}> :&nbsp;</Typography>
                                  <Typography
                                    sx={{
                                      height: 'auto',
                                      fontSize: 13,
                                      fontWeight: 550,
                                      flex: 1,
                                      pr: 0.5,
                                      pt: 0.3,
                                    }}
                                  >
                                    {tableData.senior_manage_remarks === null
                                      ? 'Not Updated'
                                      : tableData.senior_manage_remarks}
                                  </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', pt: 1 }}>
                                  <Typography sx={{ pl: 1, fontSize: 14, flex: 0.4 }}>
                                    Detailed Analysis of Requirement
                                  </Typography>
                                  <Typography sx={{ pl: 0.5 }}> :&nbsp;</Typography>
                                  <Typography
                                    sx={{
                                      height: 'auto',
                                      fontSize: 13,
                                      fontWeight: 550,
                                      flex: 1,
                                      pr: 0.5,
                                      pt: 0.3,
                                    }}
                                  >
                                    {tableData.smo_detial_analysis === null
                                      ? 'Not Updated'
                                      : tableData.smo_detial_analysis}
                                  </Typography>
                                </Box>
                              </Box>
                            ) : tableData.senior_manage_approv === 2 &&
                              tableData.senior_manage_remarks !== null ? (
                              <Box sx={{ display: 'flex', pt: 0.5 }}>
                                <Typography sx={{ pl: 1, fontSize: 14, flex: 0.4 }}>
                                  Justification for Reject{' '}
                                </Typography>
                                <Typography sx={{ pl: 0.5 }}> :&nbsp;</Typography>
                                <Typography
                                  sx={{
                                    height: 'auto',
                                    fontSize: 13,
                                    fontWeight: 550,
                                    flex: 1,
                                    pr: 0.5,
                                    pt: 0.3,
                                  }}
                                >
                                  {tableData.senior_manage_remarks === null
                                    ? 'Not Updated'
                                    : tableData.senior_manage_remarks}
                                </Typography>
                              </Box>
                            ) : tableData.senior_manage_approv === 3 &&
                              tableData.senior_manage_remarks !== null ? (
                              <Box sx={{ display: 'flex', pt: 0.5 }}>
                                <Typography sx={{ pl: 1, fontSize: 14, flex: 0.4 }}>
                                  Justification for On-Hold
                                </Typography>
                                <Typography sx={{ pl: 0.5 }}> :&nbsp;</Typography>
                                <Typography
                                  sx={{
                                    height: 'auto',
                                    fontSize: 13,
                                    fontWeight: 550,
                                    flex: 1,
                                    pr: 0.5,
                                    pt: 0.3,
                                  }}
                                >
                                  {tableData.senior_manage_remarks === null
                                    ? 'Not Updated'
                                    : tableData.senior_manage_remarks}
                                </Typography>
                              </Box>
                            ) : tableData.senior_manage_approv === 4 &&
                              tableData.senior_manage_remarks !== null ? (
                              <Box sx={{ display: 'flex', pt: 0.5 }}>
                                <Typography sx={{ pl: 1, fontSize: 14, flex: 0.4 }}>
                                  Remarks
                                </Typography>
                                <Typography sx={{ pl: 0.5 }}> :&nbsp;</Typography>
                                <Typography
                                  sx={{
                                    height: 'auto',
                                    fontSize: 13,
                                    fontWeight: 550,
                                    flex: 1,
                                    pr: 0.5,
                                    pt: 0.3,
                                  }}
                                >
                                  {tableData.senior_manage_remarks === null
                                    ? 'Not Updated'
                                    : tableData.senior_manage_remarks}
                                </Typography>
                              </Box>
                            ) : null}
                            {tableData.som_aprrov_date !== null ? (
                              <Box sx={{ display: 'flex', py: 1 }}>
                                {tableData.senior_manage_approv === 1 ||
                                  tableData.senior_manage_approv === 4 ? (
                                  <Typography sx={{ pl: 1, fontSize: 13, flex: 0.4 }}>
                                    Approved by{' '}
                                  </Typography>
                                ) : tableData.senior_manage_approv === 2 ? (
                                  <Typography sx={{ pl: 1, fontSize: 13, flex: 0.4 }}>
                                    Rejected by{' '}
                                  </Typography>
                                ) : tableData.senior_manage_approv === 3 ? (
                                  <Typography sx={{ pl: 1, fontSize: 13, flex: 0.4 }}>
                                    On-Hold by{' '}
                                  </Typography>
                                ) : null}
                                <Box sx={{ display: 'flex', flex: 1 }}>
                                  <Typography sx={{}}> :&nbsp;</Typography>
                                  <Typography
                                    sx={{
                                      height: 'auto',
                                      fontSize: 13,
                                      fontWeight: 550,
                                      pt: 0.3,
                                      pl: 0.2,
                                    }}
                                  >
                                    {capitalizeWords(tableData.senior_manage_user)}
                                  </Typography>
                                  <Typography
                                    sx={{
                                      height: 'auto',
                                      fontSize: 13,
                                      fontWeight: 550,
                                      pl: 2,
                                      pt: 0.3,
                                    }}
                                  >
                                    {tableData.som_aprrov_date}
                                  </Typography>
                                </Box>
                              </Box>
                            ) : null}
                          </Box>
                        </Paper>
                      </Grid>
                    ) : null}
                    {tableData.gm_approve_req === 1 && tableData.gm_approve !== null ? (
                      <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                        <Paper variant="outlined" sx={{ overflow: 'auto', flexWrap: 'wrap' }}>
                          <Box
                            sx={{ display: 'flex', pt: 0.5, borderBottom: '1px solid lightgrey' }}
                          >
                            <Typography
                              sx={{
                                fontWeight: 'bold',
                                mx: 1,
                                py: 0.5,
                                color: '#145DA0',
                                fontSize: 13,
                                flex: 0.4,
                              }}
                            >
                              GM Operation / Senior Manager Operation
                            </Typography>
                            <Box sx={{ flex: 1, py: 0.4, ml: 2 }}>
                              <Chip
                                size="md"
                                variant="outlined"
                                sx={{
                                  color:
                                    tableData.gm_approve === 1
                                      ? '#2e7d32'
                                      : tableData.gm_approve === 2
                                        ? '#bf360c'
                                        : tableData.gm_approve === 3
                                          ? '#FF9800'
                                          : tableData.gm_approve === 4
                                            ? '#009688'
                                            : '#607D8B',
                                  height: 25,
                                  pb: 0.5,
                                  fontSize: 12,
                                  fontWeight: 550,
                                }}
                              >
                                {tableData.gm}
                              </Chip>
                            </Box>
                          </Box>
                          <Box sx={{ pt: 0.1 }}>
                            {tableData.gm_approve === 1 && tableData.gm_approve_remarks !== null ? (
                              <Box sx={{ pt: 0.5 }}>
                                <Box sx={{ display: 'flex' }}>
                                  <Typography sx={{ pl: 1, fontSize: 14, flex: 0.4 }}>
                                    Justification/ Requirement Description{' '}
                                  </Typography>
                                  <Typography sx={{ pl: 0.5 }}> :&nbsp;</Typography>
                                  <Typography
                                    sx={{
                                      height: 'auto',
                                      fontSize: 13,
                                      fontWeight: 550,
                                      flex: 1,
                                      pr: 0.5,
                                      pt: 0.3,
                                    }}
                                  >
                                    {tableData.gm_approve_remarks === null
                                      ? 'Not Updated'
                                      : tableData.gm_approve_remarks}{' '}
                                  </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', pt: 1 }}>
                                  <Typography sx={{ pl: 1, fontSize: 14, flex: 0.4 }}>
                                    Detailed Analysis of Requirement
                                  </Typography>
                                  <Typography sx={{ pl: 0.5 }}> :&nbsp;</Typography>
                                  <Typography
                                    sx={{
                                      height: 'auto',
                                      fontSize: 13,
                                      fontWeight: 550,
                                      flex: 1,
                                      pr: 0.5,
                                      pt: 0.3,
                                    }}
                                  >
                                    {tableData.gm_detial_analysis === null
                                      ? 'Not Updated'
                                      : tableData.gm_detial_analysis}
                                  </Typography>
                                </Box>
                              </Box>
                            ) : tableData.gm_approve === 2 &&
                              tableData.gm_approve_remarks !== null ? (
                              <Box sx={{ display: 'flex', pt: 0.5 }}>
                                <Typography sx={{ pl: 1, fontSize: 14, flex: 0.4 }}>
                                  Justification for Reject{' '}
                                </Typography>
                                <Typography sx={{ pl: 0.5 }}> :&nbsp;</Typography>
                                <Typography
                                  sx={{
                                    height: 'auto',
                                    fontSize: 13,
                                    fontWeight: 550,
                                    flex: 1,
                                    pr: 0.5,
                                    pt: 0.3,
                                  }}
                                >
                                  {tableData.gm_approve_remarks === null
                                    ? 'Not Updated'
                                    : tableData.gm_approve_remarks}{' '}
                                </Typography>
                              </Box>
                            ) : tableData.gm_approve === 3 &&
                              tableData.gm_approve_remarks !== null ? (
                              <Box sx={{ display: 'flex', pt: 0.5 }}>
                                <Typography sx={{ pl: 1, fontSize: 14, flex: 0.4 }}>
                                  Justification for On-Hold
                                </Typography>
                                <Typography sx={{ pl: 0.5 }}> :&nbsp;</Typography>
                                <Typography
                                  sx={{
                                    height: 'auto',
                                    fontSize: 13,
                                    fontWeight: 550,
                                    flex: 1,
                                    pr: 0.5,
                                    pt: 0.3,
                                  }}
                                >
                                  {tableData.gm_approve_remarks === null
                                    ? 'Not Updated'
                                    : tableData.gm_approve_remarks}{' '}
                                </Typography>
                              </Box>
                            ) : tableData.gm_approve === 4 &&
                              tableData.gm_approve_remarks !== null ? (
                              <Box sx={{ display: 'flex', pt: 0.5 }}>
                                <Typography sx={{ pl: 1, fontSize: 14, flex: 0.4 }}>
                                  Remarks
                                </Typography>
                                <Typography sx={{ pl: 0.5 }}> :&nbsp;</Typography>
                                <Typography
                                  sx={{
                                    height: 'auto',
                                    fontSize: 13,
                                    fontWeight: 550,
                                    flex: 1,
                                    pr: 0.5,
                                    pt: 0.3,
                                  }}
                                >
                                  {tableData.gm_approve_remarks === null
                                    ? 'Not Updated'
                                    : tableData.gm_approve_remarks}{' '}
                                </Typography>
                              </Box>
                            ) : null}
                            {tableData.gm_approv_date !== null ? (
                              <Box sx={{ display: 'flex', py: 1 }}>
                                {tableData.gm_approve === 1 || tableData.gm_approve === 4 ? (
                                  <Typography sx={{ pl: 1, fontSize: 13, flex: 0.4 }}>
                                    Approved by{' '}
                                  </Typography>
                                ) : tableData.gm_approve === 2 ? (
                                  <Typography sx={{ pl: 1, fontSize: 13, flex: 0.4 }}>
                                    Rejected by{' '}
                                  </Typography>
                                ) : tableData.gm_approve === 3 ? (
                                  <Typography sx={{ pl: 1, fontSize: 13, flex: 0.4 }}>
                                    On-Hold by{' '}
                                  </Typography>
                                ) : null}
                                <Box sx={{ display: 'flex', flex: 1 }}>
                                  <Typography sx={{}}> :&nbsp;</Typography>
                                  <Typography
                                    sx={{
                                      height: 'auto',
                                      fontSize: 13,
                                      fontWeight: 550,
                                      pt: 0.3,
                                      pl: 0.2,
                                    }}
                                  >
                                    {capitalizeWords(tableData.gm_user)}
                                  </Typography>
                                  <Typography
                                    sx={{
                                      height: 'auto',
                                      fontSize: 13,
                                      fontWeight: 550,
                                      pl: 2,
                                      pt: 0.3,
                                    }}
                                  >
                                    {tableData.gm_approv_date}
                                  </Typography>
                                </Box>
                              </Box>
                            ) : null}
                          </Box>
                        </Paper>
                      </Grid>
                    ) : null}
                    {tableData.md_approve_req === 1 && tableData.md_approve !== null ? (
                      <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                        <Paper variant="outlined" sx={{ overflow: 'auto', flexWrap: 'wrap' }}>
                          <Box
                            sx={{ display: 'flex', pt: 0.5, borderBottom: '1px solid lightgrey' }}
                          >
                            <Typography
                              sx={{
                                fontWeight: 'bold',
                                mx: 1,
                                py: 0.5,
                                color: '#145DA0',
                                fontSize: 14,
                                flex: 0.4,
                              }}
                            >
                              Medical Director
                            </Typography>
                            <Box sx={{ flex: 1, py: 0.4, ml: 2 }}>
                              <Chip
                                size="md"
                                variant="outlined"
                                sx={{
                                  color:
                                    tableData.md_approve === 1
                                      ? '#2e7d32'
                                      : tableData.md_approve === 2
                                        ? '#bf360c'
                                        : tableData.md_approve === 3
                                          ? '#FF9800'
                                          : tableData.md_approve === 4
                                            ? '#009688'
                                            : '#607D8B',
                                  height: 25,
                                  pb: 0.5,
                                  fontSize: 12,
                                  fontWeight: 550,
                                }}
                              >
                                {tableData.md}
                              </Chip>
                            </Box>
                          </Box>
                          <Box sx={{ pt: 0.1 }}>
                            {tableData.md_approve === 1 && tableData.md_approve_remarks !== null ? (
                              <Box sx={{ pt: 0.5 }}>
                                <Box sx={{ display: 'flex' }}>
                                  <Typography sx={{ pl: 1, fontSize: 14, flex: 0.4 }}>
                                    Justification/ Requirement Description{' '}
                                  </Typography>
                                  <Typography sx={{ pl: 0.5 }}> :&nbsp;</Typography>
                                  <Typography
                                    sx={{
                                      height: 'auto',
                                      fontSize: 13,
                                      fontWeight: 550,
                                      flex: 1,
                                      pr: 0.5,
                                      pt: 0.3,
                                    }}
                                  >
                                    {tableData.md_approve_remarks === null
                                      ? 'Not Updated'
                                      : tableData.md_approve_remarks}{' '}
                                  </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', pt: 1 }}>
                                  <Typography sx={{ pl: 1, fontSize: 14, flex: 0.4 }}>
                                    Detailed Analysis of Requirement
                                  </Typography>
                                  <Typography sx={{ pl: 0.5 }}> :&nbsp;</Typography>
                                  <Typography
                                    sx={{
                                      height: 'auto',
                                      fontSize: 13,
                                      fontWeight: 550,
                                      flex: 1,
                                      pr: 0.5,
                                      pt: 0.3,
                                    }}
                                  >
                                    {tableData.md_detial_analysis === null
                                      ? 'Not Updated'
                                      : tableData.md_detial_analysis}
                                  </Typography>
                                </Box>
                              </Box>
                            ) : tableData.md_approve === 2 &&
                              tableData.md_approve_remarks !== null ? (
                              <Box sx={{ display: 'flex', pt: 0.5 }}>
                                <Typography sx={{ pl: 1, fontSize: 14, flex: 0.4 }}>
                                  Justification for Reject{' '}
                                </Typography>
                                <Typography sx={{ pl: 0.5 }}> :&nbsp;</Typography>
                                <Typography
                                  sx={{
                                    height: 'auto',
                                    fontSize: 13,
                                    fontWeight: 550,
                                    flex: 1,
                                    pr: 0.5,
                                    pt: 0.3,
                                  }}
                                >
                                  {tableData.md_approve_remarks === null
                                    ? 'Not Updated'
                                    : tableData.md_approve_remarks}
                                </Typography>
                              </Box>
                            ) : tableData.md_approve === 3 &&
                              tableData.md_approve_remarks !== null ? (
                              <Box sx={{ display: 'flex', pt: 0.5 }}>
                                <Typography sx={{ pl: 1, fontSize: 14, flex: 0.4 }}>
                                  Justification for On-Hold
                                </Typography>
                                <Typography sx={{ pl: 0.5 }}> :&nbsp;</Typography>
                                <Typography
                                  sx={{
                                    height: 'auto',
                                    fontSize: 13,
                                    fontWeight: 550,
                                    flex: 1,
                                    pr: 0.5,
                                    pt: 0.3,
                                  }}
                                >
                                  {tableData.md_approve_remarks === null
                                    ? 'Not Updated'
                                    : tableData.md_approve_remarks}{' '}
                                </Typography>
                              </Box>
                            ) : tableData.md_approve === 4 &&
                              tableData.md_approve_remarks !== null ? (
                              <Box sx={{ display: 'flex', pt: 0.5 }}>
                                <Typography sx={{ pl: 1, fontSize: 14, flex: 0.4 }}>
                                  Remarks
                                </Typography>
                                <Typography sx={{ pl: 0.5 }}> :&nbsp;</Typography>
                                <Typography
                                  sx={{
                                    height: 'auto',
                                    fontSize: 13,
                                    fontWeight: 550,
                                    flex: 1,
                                    pr: 0.5,
                                    pt: 0.3,
                                  }}
                                >
                                  {tableData.md_approve_remarks === null
                                    ? 'Not Updated'
                                    : tableData.md_approve_remarks}{' '}
                                </Typography>
                              </Box>
                            ) : null}
                            {tableData.md_approve_date !== null ? (
                              <Box sx={{ display: 'flex', py: 1 }}>
                                {tableData.md_approve === 1 || tableData.md_approve === 4 ? (
                                  <Typography sx={{ pl: 1, fontSize: 13, flex: 0.4 }}>
                                    Approved by{' '}
                                  </Typography>
                                ) : tableData.md_approve === 2 ? (
                                  <Typography sx={{ pl: 1, fontSize: 13, flex: 0.4 }}>
                                    Rejected by{' '}
                                  </Typography>
                                ) : tableData.md_approve === 3 ? (
                                  <Typography sx={{ pl: 1, fontSize: 13, flex: 0.4 }}>
                                    On-Hold by{' '}
                                  </Typography>
                                ) : null}
                                <Box sx={{ display: 'flex', flex: 1 }}>
                                  <Typography> :&nbsp;</Typography>
                                  <Typography
                                    sx={{
                                      height: 'auto',
                                      fontSize: 13,
                                      fontWeight: 550,
                                      pt: 0.3,
                                      pl: 0.2,
                                    }}
                                  >
                                    {capitalizeWords(tableData.md_user)}
                                  </Typography>
                                  <Typography
                                    sx={{
                                      height: 'auto',
                                      fontSize: 13,
                                      fontWeight: 550,
                                      pl: 2,
                                      pt: 0.3,
                                    }}
                                  >
                                    {tableData.md_approve_date}
                                  </Typography>
                                </Box>
                              </Box>
                            ) : null}
                          </Box>
                        </Paper>
                      </Grid>
                    ) : null}
                    {tableData.ed_approve_req === 1 && tableData.ed_approve !== null ? (
                      <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                        <Paper variant="outlined" sx={{ overflow: 'auto', flexWrap: 'wrap' }}>
                          <Box
                            sx={{ display: 'flex', pt: 0.5, borderBottom: '1px solid lightgrey' }}
                          >
                            <Typography
                              sx={{
                                fontWeight: 'bold',
                                mx: 1,
                                py: 0.5,
                                color: '#145DA0',
                                fontSize: 14,
                                flex: 0.4,
                              }}
                            >
                              Executive Director
                            </Typography>
                            <Box sx={{ flex: 1, py: 0.4, ml: 2 }}>
                              <Chip
                                size="md"
                                variant="outlined"
                                sx={{
                                  color:
                                    tableData.ed_approve === 1
                                      ? '#2e7d32'
                                      : tableData.ed_approve === 2
                                        ? '#bf360c'
                                        : tableData.ed_approve === 3
                                          ? '#FF9800'
                                          : tableData.ed_approve === 4
                                            ? '#009688'
                                            : '#607D8B',
                                  height: 25,
                                  pb: 0.5,
                                  fontSize: 12,
                                  fontWeight: 550,
                                }}
                              >
                                {tableData.ed}
                              </Chip>
                            </Box>
                          </Box>

                          <Box sx={{ pt: 0.1 }}>
                            {tableData.ed_approve === 1 && tableData.ed_approve_remarks !== null ? (
                              <Box sx={{ pt: 0.5 }}>
                                <Box sx={{ display: 'flex' }}>
                                  <Typography sx={{ pl: 1, fontSize: 14, flex: 0.4 }}>
                                    Justification/ Requirement Description{' '}
                                  </Typography>
                                  <Typography sx={{ pl: 0.5 }}> :&nbsp;</Typography>
                                  <Typography
                                    sx={{
                                      height: 'auto',
                                      fontSize: 13,
                                      fontWeight: 550,
                                      flex: 1,
                                      pr: 0.5,
                                      pt: 0.3,
                                    }}
                                  >
                                    {tableData.ed_approve_remarks === null
                                      ? 'Not Updated'
                                      : tableData.ed_approve_remarks}
                                  </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', pt: 1 }}>
                                  <Typography sx={{ pl: 1, fontSize: 14, flex: 0.4 }}>
                                    Detailed Analysis of Requirement
                                  </Typography>
                                  <Typography sx={{ pl: 0.5 }}> :&nbsp;</Typography>
                                  <Typography
                                    sx={{
                                      height: 'auto',
                                      fontSize: 13,
                                      fontWeight: 550,
                                      flex: 1,
                                      pr: 0.5,
                                      pt: 0.3,
                                    }}
                                  >
                                    {tableData.ed_detial_analysis === null
                                      ? 'Not Updated'
                                      : tableData.ed_detial_analysis}
                                  </Typography>
                                </Box>
                              </Box>
                            ) : tableData.ed_approve === 2 &&
                              tableData.ed_approve_remarks !== null ? (
                              <Box sx={{ display: 'flex', pt: 0.5 }}>
                                <Typography sx={{ pl: 1, fontSize: 14, flex: 0.4 }}>
                                  Justification for Reject{' '}
                                </Typography>
                                <Typography sx={{ pl: 0.5 }}> :&nbsp;</Typography>
                                <Typography
                                  sx={{
                                    height: 'auto',
                                    fontSize: 13,
                                    fontWeight: 550,
                                    flex: 1,
                                    pr: 0.5,
                                    pt: 0.3,
                                  }}
                                >
                                  {tableData.ed_approve_remarks === null
                                    ? 'Not Updated'
                                    : tableData.ed_approve_remarks}
                                </Typography>
                              </Box>
                            ) : tableData.ed_approve === 3 &&
                              tableData.ed_approve_remarks !== null ? (
                              <Box sx={{ display: 'flex', pt: 0.5 }}>
                                <Typography sx={{ pl: 1, fontSize: 14, flex: 0.4 }}>
                                  Justification for On-Hold
                                </Typography>
                                <Typography sx={{ pl: 0.5 }}> :&nbsp;</Typography>
                                <Typography
                                  sx={{
                                    height: 'auto',
                                    fontSize: 13,
                                    fontWeight: 550,
                                    flex: 1,
                                    pr: 0.5,
                                    pt: 0.3,
                                  }}
                                >
                                  : &nbsp;{' '}
                                  {tableData.ed_approve_remarks === null
                                    ? 'Not Updated'
                                    : tableData.ed_approve_remarks}
                                </Typography>
                              </Box>
                            ) : tableData.ed_approve === 4 &&
                              tableData.ed_approve_remarks !== null ? (
                              <Box sx={{ display: 'flex', pt: 0.5 }}>
                                <Typography sx={{ pl: 1, fontSize: 14, flex: 0.4 }}>
                                  Remarks
                                </Typography>
                                <Typography sx={{ pl: 0.5 }}> :&nbsp;</Typography>
                                <Typography
                                  sx={{
                                    height: 'auto',
                                    fontSize: 13,
                                    fontWeight: 550,
                                    flex: 1,
                                    pr: 0.5,
                                    pt: 0.3,
                                  }}
                                >
                                  {tableData.ed_approve_remarks === null
                                    ? 'Not Updated'
                                    : tableData.ed_approve_remarks}{' '}
                                </Typography>
                              </Box>
                            ) : null}
                            {tableData.ed_approve_date !== null ? (
                              <Box sx={{ display: 'flex', py: 1 }}>
                                {tableData.ed_approve === 1 || tableData.ed_approve === 4 ? (
                                  <Typography sx={{ pl: 1, fontSize: 13, flex: 0.4 }}>
                                    Approved by{' '}
                                  </Typography>
                                ) : tableData.ed_approve === 2 ? (
                                  <Typography sx={{ pl: 1, fontSize: 13, flex: 0.4 }}>
                                    Rejected by{' '}
                                  </Typography>
                                ) : tableData.ed_approve === 3 ? (
                                  <Typography sx={{ pl: 1, fontSize: 13, flex: 0.4 }}>
                                    On-Hold by{' '}
                                  </Typography>
                                ) : null}
                                <Box sx={{ display: 'flex', flex: 1 }}>
                                  <Typography> :&nbsp;</Typography>
                                  <Typography
                                    sx={{
                                      height: 'auto',
                                      fontSize: 13,
                                      fontWeight: 550,
                                      pt: 0.3,
                                      pl: 0.2,
                                    }}
                                  >
                                    {capitalizeWords(tableData.ed_user)}
                                  </Typography>
                                  <Typography
                                    sx={{
                                      height: 'auto',
                                      fontSize: 13,
                                      fontWeight: 550,
                                      pl: 2,
                                      pt: 0.3,
                                    }}
                                  >
                                    {tableData.ed_approve_date}
                                  </Typography>
                                </Box>
                              </Box>
                            ) : null}
                          </Box>
                        </Paper>
                      </Grid>
                    ) : null}
                    {tableData.managing_director_req === 1 &&
                      tableData.managing_director_approve !== null ? (
                      <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                        <Paper variant="outlined" sx={{ overflow: 'auto', flexWrap: 'wrap' }}>
                          <Box
                            sx={{ display: 'flex', pt: 0.5, borderBottom: '1px solid lightgrey' }}
                          >
                            <Typography
                              sx={{
                                fontWeight: 'bold',
                                mx: 1,
                                py: 0.5,
                                color: '#145DA0',
                                fontSize: 14,
                                flex: 0.4,
                              }}
                            >
                              Managing Director
                            </Typography>
                            <Box sx={{ flex: 1, py: 0.4, ml: 2 }}>
                              <Chip
                                size="md"
                                variant="outlined"
                                sx={{
                                  color:
                                    tableData.managing_director_approve === 1
                                      ? '#2e7d32'
                                      : tableData.managing_director_approve === 2
                                        ? '#bf360c'
                                        : tableData.managing_director_approve === 3
                                          ? '#FF9800'
                                          : tableData.managing_director_approve === 4
                                            ? '#009688'
                                            : '#607D8B',
                                  height: 25,
                                  pb: 0.5,
                                  fontSize: 12,
                                  fontWeight: 550,
                                }}
                              >
                                {tableData.managing}
                              </Chip>
                            </Box>
                          </Box>
                          <Box sx={{ pt: 0.1 }}>
                            {tableData.managing_director_approve === 1 &&
                              tableData.managing_director_remarks !== null ? (
                              <Box sx={{ pt: 0.5 }}>
                                <Box sx={{ display: 'flex' }}>
                                  <Typography sx={{ pl: 1, fontSize: 14, flex: 0.4 }}>
                                    Justification/ Requirement Description{' '}
                                  </Typography>
                                  <Typography sx={{ pl: 0.5 }}> :&nbsp;</Typography>
                                  <Typography
                                    sx={{
                                      height: 'auto',
                                      fontSize: 13,
                                      fontWeight: 550,
                                      flex: 1,
                                      pr: 0.5,
                                      pt: 0.3,
                                    }}
                                  >
                                    {tableData.managing_director_remarks === null
                                      ? 'Not Updated'
                                      : tableData.managing_director_remarks}
                                  </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', pt: 1 }}>
                                  <Typography sx={{ pl: 1, fontSize: 14, flex: 0.4 }}>
                                    Detailed Analysis of Requirement
                                  </Typography>
                                  <Typography sx={{ pl: 0.5 }}> :&nbsp;</Typography>
                                  <Typography
                                    sx={{
                                      height: 'auto',
                                      fontSize: 13,
                                      fontWeight: 550,
                                      flex: 1,
                                      pr: 0.5,
                                      pt: 0.3,
                                    }}
                                  >
                                    {tableData.managing_director_analysis === null
                                      ? 'Not Updated'
                                      : tableData.managing_director_analysis}
                                  </Typography>
                                </Box>
                              </Box>
                            ) : tableData.managing_director_approve === 2 &&
                              tableData.managing_director_remarks !== null ? (
                              <Box sx={{ display: 'flex', pt: 0.5 }}>
                                <Typography sx={{ pl: 1, fontSize: 14, flex: 0.4 }}>
                                  Justification for Reject{' '}
                                </Typography>
                                <Typography sx={{ pl: 0.5 }}> :&nbsp;</Typography>
                                <Typography
                                  sx={{
                                    height: 'auto',
                                    fontSize: 13,
                                    fontWeight: 550,
                                    flex: 1,
                                    pr: 0.5,
                                    pt: 0.3,
                                  }}
                                >
                                  {tableData.managing_director_remarks === null
                                    ? 'Not Updated'
                                    : tableData.managing_director_remarks}
                                </Typography>
                              </Box>
                            ) : tableData.managing_director_approve === 3 &&
                              tableData.managing_director_remarks !== null ? (
                              <Box sx={{ display: 'flex', pt: 0.5 }}>
                                <Typography sx={{ pl: 1, fontSize: 14, flex: 0.4 }}>
                                  Justification for On-Hold
                                </Typography>
                                <Typography sx={{ pl: 0.5 }}> :&nbsp;</Typography>
                                <Typography
                                  sx={{
                                    height: 'auto',
                                    fontSize: 13,
                                    fontWeight: 550,
                                    flex: 1,
                                    pr: 0.5,
                                    pt: 0.3,
                                  }}
                                >
                                  : &nbsp;{' '}
                                  {tableData.managing_director_remarks === null
                                    ? 'Not Updated'
                                    : tableData.managing_director_remarks}
                                </Typography>
                              </Box>
                            ) : tableData.managing_director_approve === 4 &&
                              tableData.managing_director_remarks !== null ? (
                              <Box sx={{ display: 'flex', pt: 0.5 }}>
                                <Typography sx={{ pl: 1, fontSize: 14, flex: 0.4 }}>
                                  Remarks
                                </Typography>
                                <Typography sx={{ pl: 0.5 }}> :&nbsp;</Typography>
                                <Typography
                                  sx={{
                                    height: 'auto',
                                    fontSize: 13,
                                    fontWeight: 550,
                                    flex: 1,
                                    pr: 0.5,
                                    pt: 0.3,
                                  }}
                                >
                                  {tableData.managing_director_remarks === null
                                    ? 'Not Updated'
                                    : tableData.managing_director_remarks}{' '}
                                </Typography>
                              </Box>
                            ) : null}
                            {tableData.managing_director_approve_date !== null ? (
                              <Box sx={{ display: 'flex', py: 1 }}>
                                {tableData.managing_director_approve === 1 ||
                                  tableData.managing_director_approve === 4 ? (
                                  <Typography sx={{ pl: 1, fontSize: 13, flex: 0.4 }}>
                                    Approved by{' '}
                                  </Typography>
                                ) : tableData.managing_director_approve === 2 ? (
                                  <Typography sx={{ pl: 1, fontSize: 13, flex: 0.4 }}>
                                    Rejected by{' '}
                                  </Typography>
                                ) : tableData.managing_director_approve === 3 ? (
                                  <Typography sx={{ pl: 1, fontSize: 13, flex: 0.4 }}>
                                    On-Hold by{' '}
                                  </Typography>
                                ) : null}
                                <Box sx={{ display: 'flex', flex: 1 }}>
                                  <Typography> :&nbsp;</Typography>
                                  <Typography
                                    sx={{
                                      height: 'auto',
                                      fontSize: 13,
                                      fontWeight: 550,
                                      pt: 0.3,
                                      pl: 0.2,
                                    }}
                                  >
                                    {capitalizeWords(tableData.managing_director_user)}
                                  </Typography>
                                  <Typography
                                    sx={{
                                      height: 'auto',
                                      fontSize: 13,
                                      fontWeight: 550,
                                      pl: 2,
                                      pt: 0.3,
                                    }}
                                  >
                                    {tableData.managing_director_approve_date}
                                  </Typography>
                                </Box>
                              </Box>
                            ) : null}
                          </Box>
                        </Paper>
                      </Grid>
                    ) : null}
                    {tableData.crf_close === 1 || tableData.crf_close === 2 ? (
                      <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                        <Paper
                          variant="outlined"
                          sx={{ overflow: 'auto', flexWrap: 'wrap', height: 135 }}
                        >
                          <Box
                            sx={{ display: 'flex', py: 0.2, borderBottom: '1px solid lightgrey' }}
                          >
                            <Typography
                              sx={{
                                fontWeight: 'bold',
                                mx: 1,
                                py: 0.5,
                                color: '#145DA0',
                                fontSize: 14,
                                flex: 0.4,
                              }}
                            >
                              CRF Closed Details
                            </Typography>
                            <Box sx={{ flex: 1, pl: 2 }}>
                              <Chip
                                size="md"
                                variant="outlined"
                                sx={{
                                  color: tableData.crf_close === 1 ? '#d50000' : '#ff3d00',
                                  height: 25,
                                  fontSize: 12,
                                  fontWeight: 550,
                                  px: 2,
                                }}
                              >
                                Closed
                              </Chip>
                            </Box>
                          </Box>
                          <Box sx={{ pt: 0.5 }}>
                            <Box sx={{ display: 'flex', pt: 0.5 }}>
                              <Typography sx={{ pl: 1, fontSize: 14, flex: 0.4 }}>
                                Remarks{' '}
                              </Typography>
                              <Typography sx={{ pl: 0.5 }}> :&nbsp;</Typography>
                              <Typography
                                sx={{
                                  height: 'auto',
                                  fontSize: 13,
                                  fontWeight: 550,
                                  flex: 1,
                                  pr: 0.5,
                                  pt: 0.3,
                                }}
                              >
                                {tableData.crf_close_remark}
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', pt: 0.5 }}>
                              <Typography sx={{ pl: 1, fontSize: 14, flex: 0.4 }}>
                                Closed By{' '}
                              </Typography>
                              <Typography sx={{ pl: 0.5 }}> :&nbsp;</Typography>
                              <Typography
                                sx={{
                                  height: 'auto',
                                  fontSize: 13,
                                  fontWeight: 550,
                                  flex: 1,
                                  pr: 0.5,
                                  pt: 0.3,
                                }}
                              >
                                {capitalizeWords(tableData.closed_user)}
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', pt: 0.5 }}>
                              <Typography sx={{ pl: 1, fontSize: 14, flex: 0.4 }}>
                                Closed Date{' '}
                              </Typography>
                              <Typography sx={{ pl: 0.5 }}> :&nbsp;</Typography>
                              <Typography
                                sx={{
                                  height: 'auto',
                                  fontSize: 13,
                                  fontWeight: 550,
                                  flex: 1,
                                  pr: 0.5,
                                  pt: 0.3,
                                }}
                              >
                                {tableData.close_date}
                              </Typography>
                            </Box>
                          </Box>
                        </Paper>
                      </Grid>
                    ) : null}
                  </CssVarsProvider>
                </Paper>
                {tableData.ack_status === 1 ? (
                  <Paper
                    variant="outlined"
                    square
                    sx={{ flexWrap: 'wrap', p: 0.3, mt: 0.7, mx: 0.7 }}
                  >
                    <Typography
                      sx={{ fontWeight: 'bold', px: 1, py: 0.7, color: '#145DA0', fontSize: 14 }}
                    >
                      Procurement Details
                    </Typography>
                    <Grid container spacing={0.5} sx={{ flexGrow: 1 }}>
                      {tableData.ack_status === 1 ? (
                        <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                          <Paper variant="outlined" sx={{ overflow: 'auto', flexWrap: 'wrap' }}>
                            <Box
                              sx={{ display: 'flex', pt: 0.5, borderBottom: '1px solid lightgrey' }}
                            >
                              <Typography
                                sx={{
                                  fontWeight: 'bold',
                                  mx: 1,
                                  py: 0.5,
                                  color: '#145DA0',
                                  fontSize: 14,
                                  flex: 0.4,
                                }}
                              >
                                CRF Acknowledgement
                              </Typography>
                              <Box sx={{ flex: 1 }}>
                                <CssVarsProvider>
                                  <Chip
                                    size="md"
                                    variant="outlined"
                                    sx={{
                                      color: '#2e7d32',
                                      height: 25,
                                      pb: 0.5,
                                      fontSize: 12,
                                      fontWeight: 550,
                                    }}
                                  >
                                    Yes
                                  </Chip>
                                </CssVarsProvider>
                              </Box>
                            </Box>
                            <Box sx={{ display: 'flex', mx: 0.3, p: 1 }}>
                              <Typography sx={{ fontSize: 14, flex: 0.4, pt: 0.1 }}>
                                Remarks
                              </Typography>
                              <Box sx={{ flex: 1, display: 'flex' }}>
                                <Typography sx={{}}> :&nbsp;</Typography>
                                <Typography
                                  sx={{ fontSize: 13, flex: 1, fontWeight: 550, pt: 0.2 }}
                                >
                                  {tableData.ack_remarks === null
                                    ? 'Not Updated'
                                    : tableData.ack_remarks}
                                </Typography>
                                <Typography
                                  sx={{
                                    display: 'flex',
                                    flex: 0.3,
                                    justifyContent: 'flex-end',
                                    fontSize: 13,
                                    textTransform: 'capitalize',
                                    fontWeight: 550,
                                    pr: 1,
                                    pt: 0.2,
                                  }}
                                >
                                  {capitalizeWords(tableData.purchase_ackuser)}&nbsp; /
                                </Typography>
                                <Typography
                                  sx={{
                                    pr: 2,
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    fontSize: 13,
                                    fontWeight: 550,
                                    pt: 0.2,
                                  }}
                                >
                                  {tableData.ack_date}
                                </Typography>
                              </Box>
                            </Box>
                          </Paper>
                        </Grid>
                      ) : null}
                      {tableData.quatation_calling_status === 1 ? (
                        <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                          <Paper variant="outlined" sx={{ overflow: 'auto', flexWrap: 'wrap' }}>
                            <Box
                              sx={{ display: 'flex', pt: 0.5, borderBottom: '1px solid lightgrey' }}
                            >
                              <Typography
                                sx={{
                                  fontWeight: 'bold',
                                  mx: 1,
                                  py: 0.5,
                                  color: '#145DA0',
                                  fontSize: 14,
                                  flex: 0.4,
                                }}
                              >
                                Quotation Process Started
                              </Typography>
                              <Box sx={{ flex: 1 }}>
                                <CssVarsProvider>
                                  <Chip
                                    size="md"
                                    variant="outlined"
                                    sx={{
                                      color: '#2e7d32',
                                      height: 25,
                                      pb: 0.5,
                                      fontSize: 12,
                                      fontWeight: 550,
                                    }}
                                  >
                                    Yes
                                  </Chip>
                                </CssVarsProvider>
                              </Box>
                            </Box>
                            <Box sx={{ display: 'flex', mx: 0.3, p: 1 }}>
                              <Typography sx={{ fontSize: 14, flex: 0.4, pt: 0.1 }}>
                                Remarks
                              </Typography>
                              <Box sx={{ flex: 1, display: 'flex' }}>
                                <Typography sx={{}}> :&nbsp;</Typography>
                                <Typography
                                  sx={{ fontSize: 12, flex: 1, fontWeight: 550, pt: 0.2 }}
                                >
                                  {tableData.quatation_calling_remarks === null
                                    ? 'Not Updated'
                                    : tableData.quatation_calling_remarks}
                                </Typography>
                                <Typography
                                  sx={{
                                    display: 'flex',
                                    flex: 0.3,
                                    justifyContent: 'flex-end',
                                    fontSize: 12,
                                    textTransform: 'capitalize',
                                    fontWeight: 550,
                                    pr: 1,
                                    pt: 0.2,
                                  }}
                                >
                                  {capitalizeWords(tableData.quatation_user)}&nbsp; /
                                </Typography>
                                <Typography
                                  sx={{
                                    pr: 2,
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    fontSize: 12,
                                    fontWeight: 550,
                                    pt: 0.2,
                                  }}
                                >
                                  {tableData.quatation_calling_date}
                                </Typography>
                              </Box>
                            </Box>
                          </Paper>
                        </Grid>
                      ) : null}
                      {tableData.quatation_negotiation === 1 ? (
                        <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                          <Paper variant="outlined" sx={{ overflow: 'auto', flexWrap: 'wrap' }}>
                            <Box
                              sx={{ display: 'flex', pt: 0.5, borderBottom: '1px solid lightgrey' }}
                            >
                              <Typography
                                sx={{
                                  fontWeight: 'bold',
                                  mx: 1,
                                  py: 0.5,
                                  color: '#145DA0',
                                  fontSize: 14,
                                  flex: 0.4,
                                }}
                              >
                                Negotiation Started
                              </Typography>
                              <Box sx={{ flex: 1 }}>
                                <CssVarsProvider>
                                  <Chip
                                    size="md"
                                    variant="outlined"
                                    sx={{
                                      color: '#2e7d32',
                                      height: 25,
                                      pb: 0.5,
                                      fontSize: 12,
                                      fontWeight: 550,
                                    }}
                                  >
                                    Yes
                                  </Chip>
                                </CssVarsProvider>
                              </Box>
                            </Box>
                            <Box sx={{ display: 'flex', mx: 0.3, p: 1 }}>
                              <Typography sx={{ fontSize: 14, flex: 0.4, pt: 0.1 }}>
                                Remarks
                              </Typography>
                              <Box sx={{ flex: 1, display: 'flex' }}>
                                <Typography sx={{}}> :&nbsp;</Typography>
                                <Typography
                                  sx={{ fontSize: 12, flex: 1, fontWeight: 550, pt: 0.2 }}
                                >
                                  {tableData.quatation_negotiation_remarks === null
                                    ? 'Not Updated'
                                    : tableData.quatation_negotiation_remarks}
                                </Typography>
                                <Typography
                                  sx={{
                                    display: 'flex',
                                    flex: 0.3,
                                    justifyContent: 'flex-end',
                                    fontSize: 12,
                                    textTransform: 'capitalize',
                                    fontWeight: 550,
                                    pr: 1,
                                    pt: 0.2,
                                  }}
                                >
                                  {capitalizeWords(tableData.quatation_neguser)}&nbsp; /
                                </Typography>
                                <Typography
                                  sx={{
                                    pr: 2,
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    fontSize: 12,
                                    fontWeight: 550,
                                    pt: 0.2,
                                  }}
                                >
                                  {tableData.quatation_negotiation_date}
                                </Typography>
                              </Box>
                            </Box>
                          </Paper>
                        </Grid>
                      ) : null}
                      {tableData.quatation_fixing === 1 ? (
                        <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                          <Paper variant="outlined" sx={{ overflow: 'auto', flexWrap: 'wrap' }}>
                            <Box
                              sx={{ display: 'flex', pt: 0.5, borderBottom: '1px solid lightgrey' }}
                            >
                              <Typography
                                sx={{
                                  fontWeight: 'bold',
                                  mx: 1,
                                  py: 0.5,
                                  color: '#145DA0',
                                  fontSize: 14,
                                  flex: 0.4,
                                }}
                              >
                                Quotation&apos;s Finalizations / Approvals
                              </Typography>
                              <Box sx={{ flex: 1 }}>
                                <CssVarsProvider>
                                  <Chip
                                    size="md"
                                    variant="outlined"
                                    sx={{
                                      color: '#2e7d32',
                                      height: 25,
                                      pb: 0.5,
                                      fontSize: 12,
                                      fontWeight: 550,
                                    }}
                                  >
                                    Yes
                                  </Chip>
                                </CssVarsProvider>
                              </Box>
                            </Box>
                            <Box sx={{ display: 'flex', mx: 0.3, p: 1 }}>
                              <Typography sx={{ fontSize: 14, flex: 0.4, pt: 0.1 }}>
                                Remarks
                              </Typography>
                              <Box sx={{ flex: 1, display: 'flex' }}>
                                <Typography sx={{}}> :&nbsp;</Typography>
                                <Typography
                                  sx={{ fontSize: 12, flex: 1, fontWeight: 550, pt: 0.2 }}
                                >
                                  {tableData.quatation_fixing_remarks === null
                                    ? 'Not Updated'
                                    : tableData.quatation_fixing_remarks}
                                </Typography>
                                <Typography
                                  sx={{
                                    display: 'flex',
                                    flex: 0.3,
                                    justifyContent: 'flex-end',
                                    fontSize: 12,
                                    textTransform: 'capitalize',
                                    fontWeight: 550,
                                    pr: 1,
                                    pt: 0.2,
                                  }}
                                >
                                  {capitalizeWords(tableData.quatation_fixuser)}&nbsp; /
                                </Typography>
                                <Typography
                                  sx={{
                                    pr: 2,
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    fontSize: 12,
                                    fontWeight: 550,
                                    pt: 0.2,
                                  }}
                                >
                                  {tableData.quatation_fixing_date}
                                </Typography>
                              </Box>
                            </Box>
                          </Paper>
                        </Grid>
                      ) : null}
                    </Grid>
                    {poDetails.length !== 0 ? (
                      <>
                        <Typography
                          sx={{
                            fontWeight: 'bold',
                            mx: 1,
                            pt: 0.5,
                            color: '#145DA0',
                            fontSize: 14,
                          }}
                        >
                          PO Details
                        </Typography>
                        <Box sx={{ width: '100%', pb: 0.3, flexWrap: 'wrap' }}>
                          <CrfReqDetailCmpnt poDetails={poDetails} />
                        </Box>
                      </>
                    ) : null}
                    {tableData.po_complete === 1 ? (
                      <Box sx={{ display: 'flex', pt: 0.5 }}>
                        <Typography
                          sx={{
                            fontWeight: 'bold',
                            mx: 1,
                            py: 0.5,
                            color: '#145DA0',
                            fontSize: 14,
                            flex: 0.4,
                          }}
                        >
                          Purchase Order Preparation Completed
                        </Typography>
                        : &nbsp;{' '}
                        <Box sx={{ flex: 1, display: 'flex' }}>
                          <CssVarsProvider>
                            <Chip
                              size="md"
                              variant="outlined"
                              sx={{
                                color: '#2e7d32',
                                height: 25,
                                pb: 0.5,
                                fontSize: 12,
                                fontWeight: 550,
                              }}
                            >
                              Yes
                            </Chip>
                          </CssVarsProvider>
                          <Typography
                            sx={{
                              display: 'flex',
                              justifyContent: 'flex-end',
                              fontSize: 12,
                              textTransform: 'capitalize',
                              fontWeight: 550,
                              pl: 2,
                              pt: 0.4,
                            }}
                          >
                            {capitalizeWords(tableData.pocomplete_user)}&nbsp; /
                          </Typography>
                          <Typography
                            sx={{ height: 30, fontSize: 12, fontWeight: 550, pl: 1, pt: 0.4 }}
                          >
                            {tableData.po_complete_date}
                          </Typography>
                        </Box>
                      </Box>
                    ) : null}
                    {tableData.approval_level !== null ? (
                      <Box sx={{ display: 'flex', pt: 0.5 }}>
                        <Typography
                          sx={{
                            fontWeight: 'bold',
                            mx: 1,
                            py: 0.5,
                            color: '#145DA0',
                            fontSize: 14,
                            flex: 0.4,
                          }}
                        >
                          PO Approvals
                        </Typography>
                        : &nbsp;
                        <Box sx={{ flex: 1, display: 'flex' }}>
                          <Typography
                            sx={{
                              height: 'auto',
                              fontSize: 13,
                              fontWeight: 550,
                              pl: 0.5,
                              pt: 0.4,
                              color: '#1b5e20',
                            }}
                          >
                            {tableData.approval_level === 1
                              ? 'Purchase Dpt Approved'
                              : tableData.approval_level === 2
                                ? 'Purchase Department Approved, Purchase Manager Approved'
                                : tableData.approval_level === 3
                                  ? 'Purchase Department Approved, Purchase Manager Approved, Directors Approved'
                                  : null}{' '}
                          </Typography>
                        </Box>
                      </Box>
                    ) : (
                      <Box sx={{ display: 'flex', pt: 0.5 }}>
                        <Typography
                          sx={{
                            fontWeight: 'bold',
                            mx: 1,
                            py: 0.5,
                            color: '#145DA0',
                            fontSize: 14,
                            flex: 0.4,
                          }}
                        >
                          PO Approvals
                        </Typography>
                        : &nbsp;
                        <Box sx={{ flex: 1, display: 'flex' }}>
                          <Typography
                            sx={{
                              height: 'auto',
                              fontSize: 13,
                              fontWeight: 550,
                              pt: 0.4,
                              color: '#ff8f00',
                            }}
                          >
                            Approval Pending
                          </Typography>
                        </Box>
                      </Box>
                    )}
                    {tableData.po_to_supplier === 1 ? (
                      <Box sx={{ display: 'flex', pt: 0.5 }}>
                        <Typography
                          sx={{
                            fontWeight: 'bold',
                            mx: 1,
                            py: 0.5,
                            color: '#145DA0',
                            fontSize: 14,
                            flex: 0.4,
                          }}
                        >
                          PO-Supplier Acknowledgement
                        </Typography>
                        : &nbsp;{' '}
                        <Box sx={{ flex: 1, display: 'flex' }}>
                          <CssVarsProvider>
                            <Chip
                              size="md"
                              variant="outlined"
                              sx={{
                                color: '#2e7d32',
                                height: 25,
                                pb: 0.5,
                                fontSize: 12,
                                fontWeight: 550,
                              }}
                            >
                              Yes
                            </Chip>
                          </CssVarsProvider>
                          <Typography
                            sx={{ height: 30, fontSize: 12, fontWeight: 550, pl: 2, pt: 0.4 }}
                          >
                            {tableData.po_to_supplier_date}
                          </Typography>
                        </Box>
                      </Box>
                    ) : null}
                    {tableData.store_recieve === 1 || tableData.store_recieve === 0 ? (
                      <Box sx={{ display: 'flex', pt: 0.5 }}>
                        <Typography
                          sx={{
                            fontWeight: 'bold',
                            mx: 1,
                            py: 0.5,
                            color: '#145DA0',
                            fontSize: 14,
                            flex: 0.4,
                          }}
                        >
                          Received in CRS Store
                        </Typography>
                        : &nbsp;{' '}
                        <Box sx={{ flex: 1, display: 'flex' }}>
                          <CssVarsProvider>
                            <Chip
                              size="md"
                              variant="outlined"
                              sx={{
                                color: '#2e7d32',
                                height: 25,
                                pb: 0.5,
                                fontSize: 12,
                                fontWeight: 550,
                              }}
                            >
                              Yes
                            </Chip>
                          </CssVarsProvider>
                          {tableData.store_receive === 1 ? (
                            <>
                              <Typography
                                sx={{
                                  display: 'flex',
                                  justifyContent: 'flex-end',
                                  fontSize: 12,
                                  textTransform: 'capitalize',
                                  fontWeight: 550,
                                  pl: 2,
                                  pt: 0.4,
                                }}
                              >
                                {capitalizeWords(tableData.crs_user)}&nbsp; /
                              </Typography>
                              <Typography
                                sx={{ height: 30, fontSize: 12, fontWeight: 550, pl: 1, pt: 0.4 }}
                              >
                                {tableData.store_receive_date}
                              </Typography>
                            </>
                          ) : tableData.store_receive === 0 &&
                            (tableData.store_recieve === 0 || tableData.store_recieve === 1) ? (
                            <Typography
                              sx={{ height: 30, fontSize: 12, fontWeight: 550, pt: 0.4, pl: 2 }}
                            >
                              Partially Received in CRS Store
                            </Typography>
                          ) : null}
                        </Box>
                      </Box>
                    ) : null}
                    {tableData.sub_store_recieve === 1 ? (
                      <Box sx={{ display: 'flex', pt: 0.5 }}>
                        <Typography
                          sx={{
                            fontWeight: 'bold',
                            mx: 1,
                            py: 0.5,
                            color: '#145DA0',
                            fontSize: 14,
                            flex: 0.4,
                          }}
                        >
                          Received in {tableData.sub_store_name}
                        </Typography>
                        : &nbsp;{' '}
                        <Box sx={{ flex: 1, display: 'flex' }}>
                          <CssVarsProvider>
                            <Chip
                              size="md"
                              variant="outlined"
                              sx={{
                                color: '#2e7d32',
                                height: 25,
                                pb: 0.5,
                                fontSize: 12,
                                fontWeight: 550,
                              }}
                            >
                              Yes
                            </Chip>
                          </CssVarsProvider>
                          <Typography
                            sx={{
                              display: 'flex',
                              justifyContent: 'flex-end',
                              fontSize: 12,
                              textTransform: 'capitalize',
                              fontWeight: 550,
                              pl: 2,
                              pt: 0.4,
                            }}
                          >
                            {capitalizeWords(tableData.store_user)}&nbsp; /
                          </Typography>
                          <Typography
                            sx={{ height: 30, fontSize: 12, fontWeight: 550, pl: 1, pt: 0.4 }}
                          >
                            {tableData.substore_ack_date}
                          </Typography>
                        </Box>
                      </Box>
                    ) : null}
                    {tableData.user_acknldge === 1 ? (
                      <Paper variant="outlined" sx={{ overflow: 'auto', flexWrap: 'wrap' }}>
                        <Box sx={{ display: 'flex', pt: 0.5, borderBottom: '1px solid lightgrey' }}>
                          <Typography
                            sx={{
                              fontWeight: 'bold',
                              mx: 1,
                              py: 0.5,
                              color: '#145DA0',
                              fontSize: 14,
                              flex: 0.4,
                            }}
                          >
                            User Acknowledgement
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', mx: 0.3, p: 1 }}>
                          <Typography sx={{ fontSize: 14, flex: 0.4 }}>Remarks</Typography>
                          <Box sx={{ flex: 1, display: 'flex' }}>
                            <Typography sx={{ fontSize: 13, flex: 1, fontWeight: 550 }}>
                              : &nbsp;
                              {tableData.user_acknldge_remarks === null
                                ? 'Not Updated'
                                : tableData.user_acknldge_remarks}
                            </Typography>
                            <Typography
                              sx={{
                                display: 'flex',
                                flex: 1,
                                justifyContent: 'flex-end',
                                fontSize: 13,
                                textTransform: 'capitalize',
                                fontWeight: 550,
                                pr: 1,
                              }}
                            >
                              {capitalizeWords(tableData.acknowUser)}&nbsp; /
                            </Typography>
                            <Typography
                              sx={{
                                pr: 2,
                                display: 'flex',
                                justifyContent: 'flex-start',
                                fontSize: 13,
                                fontWeight: 550,
                              }}
                            >
                              {tableData.user_ack_date}
                            </Typography>
                          </Box>
                        </Box>
                      </Paper>
                    ) : null}
                    {tableData.user_acknldge === 1 ? (
                      <CssVarsProvider>
                        <UserReceivedItemDetails req_slno={req_slno} />
                      </CssVarsProvider>
                    ) : null}
                    <Box sx={{ height: 15 }}></Box>
                  </Paper>
                ) : null}
              </>
            ) : tableData.hod_approve === null || tableData.incharge_approve == null ? (
              <>
                {tableData.crf_close === 1 || tableData.crf_close === 2 ? (
                  <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                    <Paper
                      variant="outlined"
                      sx={{ overflow: 'auto', flexWrap: 'wrap', height: 135 }}
                    >
                      <Box sx={{ display: 'flex', py: 0.2, borderBottom: '1px solid lightgrey' }}>
                        <Typography
                          sx={{
                            fontWeight: 'bold',
                            mx: 1,
                            py: 0.5,
                            color: '#145DA0',
                            fontSize: 14,
                            flex: 0.4,
                          }}
                        >
                          CRF Closed Details
                        </Typography>
                        <Box sx={{ flex: 1, pl: 2 }}>
                          <Chip
                            size="md"
                            variant="outlined"
                            sx={{
                              color: tableData.crf_close === 1 ? '#d50000' : '#ff3d00',
                              height: 25,
                              fontSize: 12,
                              fontWeight: 550,
                              px: 2,
                            }}
                          >
                            Closed
                          </Chip>
                        </Box>
                      </Box>
                      <Box sx={{ pt: 0.5 }}>
                        <Box sx={{ display: 'flex', pt: 0.5 }}>
                          <Typography sx={{ pl: 1, fontSize: 14, flex: 0.4 }}>Remarks </Typography>
                          <Typography sx={{ pl: 0.5 }}> :&nbsp;</Typography>
                          <Typography
                            sx={{
                              height: 'auto',
                              fontSize: 13,
                              fontWeight: 550,
                              flex: 1,
                              pr: 0.5,
                              pt: 0.3,
                            }}
                          >
                            {tableData.crf_close_remark}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', pt: 0.5 }}>
                          <Typography sx={{ pl: 1, fontSize: 14, flex: 0.4 }}>
                            Closed By{' '}
                          </Typography>
                          <Typography sx={{ pl: 0.5 }}> :&nbsp;</Typography>
                          <Typography
                            sx={{
                              height: 'auto',
                              fontSize: 13,
                              fontWeight: 550,
                              flex: 1,
                              pr: 0.5,
                              pt: 0.3,
                            }}
                          >
                            {capitalizeWords(tableData.closed_user)}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', pt: 0.5 }}>
                          <Typography sx={{ pl: 1, fontSize: 14, flex: 0.4 }}>
                            Closed Date{' '}
                          </Typography>
                          <Typography sx={{ pl: 0.5 }}> :&nbsp;</Typography>
                          <Typography
                            sx={{
                              height: 'auto',
                              fontSize: 13,
                              fontWeight: 550,
                              flex: 1,
                              pr: 0.5,
                              pt: 0.3,
                            }}
                          >
                            {tableData.close_date}
                          </Typography>
                        </Box>
                      </Box>
                    </Paper>
                  </Grid>
                ) : null}
              </>
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  fontSize: 25,
                  opacity: 0.5,
                  pt: 10,
                  color: 'grey',
                }}
              >
                No Report Found
              </Box>
            )}
          </Box>
        ) : null}
      </Box>
    </Fragment>
  )
}

export default memo(CrfNoBasedReport)
