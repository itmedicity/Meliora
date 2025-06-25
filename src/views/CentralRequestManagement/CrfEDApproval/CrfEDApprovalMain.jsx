import React, { Fragment, memo, useCallback, useEffect, useMemo, useState } from 'react'
import DataCollectnPendingModal from '../ComonComponent/DataCollectionComp/DataCollectnPendingModal'
import { Box, CssVarsProvider } from '@mui/joy'
import CustomCloseIconCmp from '../ComonComponent/Components/CustomCloseIconCmp'
import { Virtuoso } from 'react-virtuoso'
import {
  getApprovalDetails,
  getApprovalKMCH,
  getOnholdRejectIemDetails,
  getOnholdRejectKMCH,
} from '../ComonComponent/CommonApiCallFuctn'
import { getCompanyDetails, getCRFPendingAboveHOD, getDefaultCompany } from 'src/api/CommonApiCRF'
import { format } from 'date-fns'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { warningNotify } from 'src/views/Common/CommonCode'
import CrfEDApprovalModal from './CrfEDApprovalModal'
import { getCRFPendingForAllKMC } from 'src/api/CommonApiCRFKmc'
import { FormControlLabel, Radio, RadioGroup } from '@mui/material'
import ApproveButtomForED from './ApproveButtomForED'
import CloseCRFED from './CloseCRFED'
import TopDesignForHigherlevel from '../ComonComponent/HigherLevelComponents/TopDesignForHigherlevel'
import MasterDetailHigherLevel from '../ComonComponent/HigherLevelComponents/MasterDetailHigherLevel'
import ClosedButtonManage from '../ComonComponent/HigherLevelComponents/ClosedButtonManage'

const CrfEDApprovalMain = () => {
  const history = useNavigate()
  const backtoSetting = useCallback(() => {
    history('/Home')
  }, [history])

  const [radiovalue, setRadioValue] = useState('9')
  const [crfRadioValue, setCrfRadioValue] = useState('1')
  const [allData, setAllData] = useState([])
  const [disData, setDisData] = useState([])
  const [ApprovalFlag, setApprovalFlag] = useState(0)
  const [ApprovalModal, setApprovalModal] = useState(false)
  const [ApprovalData, setApprovalData] = useState([])
  const [disDatalen, setDisDataLen] = useState([])

  const [cancelFlag, setCancelFlag] = useState(0)
  const [cancelModal, setCancelModal] = useState(false)
  const [cancelData, setCancelData] = useState([])

  const [reqItems, setReqItems] = useState([])
  const [approveTableData, setApproveTableData] = useState([])
  const [poDetails, setPoDetails] = useState([])

  // now cant apprv just rqst send
  const [datacollectdata, setDataCollectData] = useState([])
  const [colectDetlCheck, setCollectDetailCheck] = useState(false)
  // already collected datas view
  const [datacolflag, setDataColFlag] = useState(0)
  const [datacolData, setDataColData] = useState([])
  // const [procureData, setProcureData] = useState([])
  const [combinedData, setcombinedData] = useState([])
  const [fromDate, setFromDate] = useState(format(new Date(), 'yyyy-MM-dd'))
  const [toDate, setToDate] = useState(format(new Date(), 'yyyy-MM-dd'))
  const [imagearray, setImageArry] = useState([])
  const [selectedCompany, setSelectedCompany] = useState('1')
  const [pendingCount, setPendingCount] = useState(0)
  const {
    data: compData,
    isLoading: isCompLoading,
    error: compError,
  } = useQuery({
    queryKey: 'getCompany',
    queryFn: () => getCompanyDetails(),
    staleTime: Infinity,
  })
  const companyData = useMemo(() => compData, [compData])

  const postData = useMemo(() => ({ level: 21 }), [])
  const {
    data: edDetails,
    isLoading: isEdLoading,
    error: edError,
  } = useQuery({
    queryKey: ['getPendingAll', JSON.stringify(postData)],
    queryFn: () => getCRFPendingAboveHOD(postData),
    enabled: !!postData.level,
    staleTime: Infinity,
  })
  const edData = useMemo(() => edDetails, [edDetails])

  const kmchData = useMemo(() => ({ level: 24 }), [])

  const {
    data: edKmc,
    isLoading: isedKmcLoading,
    error: kmcError,
  } = useQuery({
    queryKey: ['getAllKmcPending', JSON.stringify(kmchData)],
    queryFn: () => getCRFPendingForAllKMC(kmchData),
    enabled: !!kmchData.level,
    staleTime: Infinity,
  })
  const edDataKmc = useMemo(() => edKmc, [edKmc])

  useEffect(() => {
    if (selectedCompany === '1') {
      if (radiovalue === '9' && edData) {
        setcombinedData(edData)
        setPendingCount(edData)
      } else if (radiovalue === '8') {
        setcombinedData([])
      }
    } else if (selectedCompany === '2') {
      if (radiovalue === '9' && edDataKmc) {
        const pending = edDataKmc?.filter(
          (val) => val.ed_approve === null || val.md_approve === null,
        )
        setPendingCount(pending)
        setcombinedData(edDataKmc)
      } else if (radiovalue === '8') {
        setcombinedData([])
      }
    }
  }, [edData, radiovalue, selectedCompany, edDataKmc])
  const {
    data: companydefData,
    isLoading: isCompLoadingdef,
    error: compErrordef,
  } = useQuery({
    queryKey: 'getdefaultCompany',
    queryFn: () => getDefaultCompany(),
    staleTime: Infinity,
  })
  const company = useMemo(() => companydefData, [companydefData])
  useEffect(() => {
    if (combinedData.length !== 0) {
      const datas = combinedData?.map((val) => {
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
          incharge_remarks: val.incharge_remarks !== null ? val.incharge_remarks : 'Not Updated',
          inch_detial_analysis: val.inch_detial_analysis,
          incharge_apprv_date: val.incharge_apprv_date,
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
          hod_approve_date: val.hod_approve_date,
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
          dms_approve_date: val.dms_approve_date,
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
          ms_approve_remark: val.ms_approve_remark !== null ? val.ms_approve_remark : 'Not Updated',
          ms_detail_analysis: val.ms_detail_analysis,
          ms_approve_date: val.ms_approve_date,
          ms_approve_user: val.ms_approve_user !== null ? val.ms_approve_user.toLowerCase() : '',
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
            val.manag_operation_remarks !== null ? val.manag_operation_remarks : 'Not Updated',
          om_detial_analysis: val.om_detial_analysis,
          om_approv_date: val.om_approv_date,
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
          som_aprrov_date: val.som_aprrov_date,
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
          gm_approv_date: val.gm_approv_date,
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
          md_approve_date: val.md_approve_date,
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
          ed_approve_remarks: val.ed_approve_remarks !== null ? val.ed_approve_remarks : '',
          ed_detial_analysis: val.ed_detial_analysis,
          ed_approve_date: val.ed_approve_date,
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
            val.managing_director_remarks !== null ? val.managing_director_remarks : 'Not Updated',
          managing_director_analysis: val.managing_director_analysis,
          managing_director_approve_date: val.managing_director_approve_date,
          managing_director_user: val.managing_director_username
            ? val.managing_director_username.toLowerCase()
            : '',

          higher:
            val.ed_approve === null ||
            val.ed_approve === 2 ||
            val.ed_approve === 3 ||
            val.ack_status === null ||
            val.ack_status === undefined
              ? 0
              : 1,
          now_who:
            val.req_status === 'C'
              ? 'CRF Closed'
              : val.sub_store_recieve === 1
              ? 'Received in ' + val.sub_store_name
              : val.store_recieve === 1
              ? 'All Items Received in CRS'
              : val.store_recieve === 0
              ? 'Partial Goods Received in CRS'
              : val.po_to_supplier === 1
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
              ? company?.managing_director_name
              : val.ed_approve !== null
              ? company?.ed_status_name
              : val.md_approve !== null
              ? company?.md_status_name
              : val.gm_approve !== null
              ? company?.gmo_status_name
              : val.senior_manage_approv !== null
              ? company?.smo_status_name
              : val.manag_operation_approv !== null
              ? company?.mo_status_name
              : val.ms_approve !== null
              ? company?.ms_status_name
              : val.dms_approve !== null
              ? company?.dms_status_name
              : val.hod_approve !== null
              ? company?.hod_status_name
              : val.incharge_approve !== null
              ? company?.incharge_status_name
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
          crs_user: val.crs_user,
          store_user: val.store_user,
          substore_ack_date: val.substore_ack_date,
          dept_id: val.dept_id,
          dept_name: val.dept_name,
          dept_type: val.dept_type,
          dept_type_name:
            val.dept_type === 1 ? 'Clinical' : val.dept_type === 2 ? 'Non Clinical' : 'Academic',
          po_number: val.po_number,
          approval_level: val.approval_level,
          internally_arranged_status: val?.internally_arranged_status,
          crf_view_remark: val?.crf_view_remark,
          crf_view_status: val?.crf_view_status,
          viewDep: val?.viewDep,
          viewName: val?.viewName,
          company_name: val?.company_name,
        }
        return obj
      })
      if (selectedCompany === '1') {
        if (radiovalue === '2') {
          const newData = datas?.filter(
            (val) =>
              val.now_who_status !== 2 &&
              val.now_who_status !== 3 &&
              (val.ed_approve !== null || val?.internally_arranged_status === 1),
          )
          setDisData(newData)
          setAllData(newData)
        } else if (radiovalue === '9') {
          const newData = datas?.filter((val) => val?.gm_approve === 1 || val?.md_approve === 1)
          setDisData(newData)

          setAllData(newData)
          setDisDataLen(newData)
        } else {
          setDisData(datas)
          setAllData(datas)
        }
      } else {
        if (radiovalue === '1') {
          const pending = datas?.filter(
            (val) =>
              (val.managing_director_approve === null || val.md_approve === null) &&
              val.req_status !== 'C',
          )
          setDisData(pending)
          setAllData(pending)
        } else if (radiovalue === '2') {
          const newData = datas?.filter(
            (val) =>
              val.managing_director_approve === 1 &&
              val.md_approve === 1 &&
              val.ack_status === null &&
              val.req_status !== 'C',
          )
          setDisData(newData)
          setAllData(newData)
        } else if (radiovalue === '9') {
          const newData = datas?.filter((val) => val?.gm_approve === 1 && val?.md_approve === null)
          setDisData(newData)
          setAllData(newData)
          setDisDataLen(newData)
        } else {
          setDisData(datas)
          setAllData(datas)
        }
      }
    } else {
      setDisData([])
      setAllData([])
    }
  }, [combinedData, radiovalue, selectedCompany, company])

  const getPendingData = useCallback(() => {
    const pData = { level: 20 }
    const getData = async () => {
      if (selectedCompany === '1') {
        await getApprovalDetails(setcombinedData, pData)
      } else if (selectedCompany === '2') {
        await getApprovalKMCH(setcombinedData, pData)
      }
    }
    getData()
  }, [selectedCompany])

  const getApprovalData = useCallback(() => {
    const pData = { level: 11 }
    const getData = async () => {
      if (selectedCompany === '1') {
        await getApprovalDetails(setcombinedData, pData)
      } else if (selectedCompany === '2') {
        await getApprovalKMCH(setcombinedData, pData)
      }
    }
    getData()
  }, [selectedCompany])
  const getProcurementData = useCallback(() => {
    const pData = { level: 12 }
    const getData = async () => {
      if (selectedCompany === '1') {
        await getApprovalDetails(setcombinedData, pData)
      } else if (selectedCompany === '2') {
        await getApprovalKMCH(setcombinedData, pData)
      }
    }
    getData()
  }, [selectedCompany])

  const getInventoryData = useCallback(() => {
    const pData = { level: 13 }
    const getData = async () => {
      if (selectedCompany === '1') {
        await getApprovalDetails(setcombinedData, pData)
      } else if (selectedCompany === '2') {
        await getApprovalKMCH(setcombinedData, pData)
      }
    }
    getData()
  }, [selectedCompany])

  const getuserAckData = useCallback(() => {
    const pData = { level: 14 }
    const getData = async () => {
      if (selectedCompany === '1') {
        await getApprovalDetails(setcombinedData, pData)
      } else if (selectedCompany === '2') {
        await getApprovalKMCH(setcombinedData, pData)
      }
    }
    getData()
  }, [selectedCompany])

  const getHoldData = useCallback(() => {
    const pData = { level: 15 }
    const getData = async () => {
      if (selectedCompany === '1') {
        await getApprovalDetails(setcombinedData, pData)
      } else if (selectedCompany === '2') {
        await getApprovalKMCH(setcombinedData, pData)
      }
    }
    getData()
  }, [selectedCompany])
  const getRejectData = useCallback(() => {
    const pData = { level: 16 }
    const getData = async () => {
      if (selectedCompany === '1') {
        await getApprovalDetails(setcombinedData, pData)
      } else if (selectedCompany === '2') {
        await getApprovalKMCH(setcombinedData, pData)
      }
    }
    getData()
  }, [selectedCompany])

  const getHoldItems = useCallback(() => {
    const pData = { level: 3 }
    const getData = async () => {
      if (selectedCompany === '1') {
        await getOnholdRejectIemDetails(setDisData, setAllData, pData)
      } else if (selectedCompany === '2') {
        await getOnholdRejectKMCH(setDisData, setAllData, pData)
      }
    }
    getData()
  }, [selectedCompany])
  const getRejectItem = useCallback(() => {
    const pData = { level: 4 }
    const getData = async () => {
      if (selectedCompany === '1') {
        await getOnholdRejectIemDetails(setDisData, setAllData, pData)
      } else if (selectedCompany === '2') {
        await getOnholdRejectKMCH(setDisData, setAllData, pData)
      }
    }
    getData()
  }, [selectedCompany])

  const fromDateChange = useCallback(
    (e) => {
      setFromDate(e.target.value)
    },
    [setFromDate],
  )
  const toDateChange = useCallback(
    (e) => {
      setToDate(e.target.value)
    },
    [setToDate],
  )

  const closedData = useMemo(
    () => ({
      level: 17,
      from: `${fromDate} 00:00:00`,
      to: `${toDate} 23:59:59`,
    }),
    [fromDate, toDate],
  )

  const getCloseData = useCallback(() => {
    const fetchClosedDetails = async () => {
      try {
        if (selectedCompany === '1') {
          await getApprovalDetails(setcombinedData, closedData)
        } else if (selectedCompany === '2') {
          await getApprovalKMCH(setcombinedData, closedData)
        }
      } catch (error) {
        warningNotify('An error occurred while fetching rejection data')
      }
    }
    fetchClosedDetails()
  }, [closedData, selectedCompany])

  const handleClose = useCallback(() => {
    setApprovalModal(false)
    setApprovalFlag(0)
    setApprovalData([])
    setDataCollectData([])
    setCollectDetailCheck(false)
    setDataColFlag(0)
    setDataColData([])
  }, [])
  const dataCollectClose = useCallback(() => {
    setApprovalFlag(0)
    setCollectDetailCheck(false)
    setDataCollectData([])
  }, [])

  const handleCloseCrfClose = useCallback(() => {
    setCancelData([])
    setCancelModal(false)
    setCancelFlag(0)
  }, [])

  const handleRadioChange = useCallback(async (e) => {
    const selectedCompanyName = e.target.value
    setSelectedCompany(selectedCompanyName)
    if (selectedCompanyName === '1') {
      setRadioValue('9')
    } else if (selectedCompanyName === '2') {
      setRadioValue('9')
    }
  }, [])

  if (isEdLoading || isCompLoading || isedKmcLoading || isCompLoadingdef) return <p>Loading...</p>
  if (edError || compError || kmcError || compErrordef) return <p>Error Occurred.</p>
  return (
    <Fragment>
      {ApprovalFlag === 2 ? (
        <DataCollectnPendingModal
          open={colectDetlCheck}
          handleClose={dataCollectClose}
          datacollectdata={datacollectdata}
        />
      ) : ApprovalFlag === 1 ? (
        <CrfEDApprovalModal
          open={ApprovalModal}
          ApprovalData={ApprovalData}
          handleClose={handleClose}
          reqItems={reqItems}
          setApproveTableData={setApproveTableData}
          approveTableData={approveTableData}
          datacolflag={datacolflag}
          datacolData={datacolData}
          imagearray={imagearray}
          selectedCompany={selectedCompany}
          company={company}
        />
      ) : null}

      {cancelFlag === 1 ? (
        <CloseCRFED
          open={cancelModal}
          handleCloseCrfClose={handleCloseCrfClose}
          reqItems={reqItems}
          cancelData={cancelData}
          setCancelModal={setCancelModal}
          setCancelFlag={setCancelFlag}
          approveTableData={approveTableData}
          imagearray={imagearray}
        />
      ) : null}
      <Box sx={{ height: window.innerHeight - 80, flexWrap: 'wrap', bgcolor: 'white' }}>
        <Box sx={{ backgroundColor: '#f0f3f5', border: '1px solid #B4F5F0' }}>
          <Box sx={{ display: 'flex' }}>
            <Box sx={{ fontWeight: 550, flex: 1, pl: 1, pt: 0.5, color: '#385E72' }}>
              {company?.ed_status_name} Approval
            </Box>
            <Box
              sx={{ display: 'flex', justifyContent: 'flex-end', flex: 1, fontSize: 20, m: 0.5 }}
            >
              <CssVarsProvider>
                <CustomCloseIconCmp handleChange={backtoSetting} />
              </CssVarsProvider>
            </Box>
          </Box>
          <Box
            sx={{
              height: 40,
              display: 'flex',
              alignItems: 'center',
              padding: '8px',
              justifyContent: 'center',
              bgcolor: 'white',
            }}
          >
            <RadioGroup row value={selectedCompany} onChange={handleRadioChange}>
              {companyData?.map((val) => (
                <FormControlLabel
                  key={val.company_slno}
                  value={val.company_slno}
                  control={<Radio />}
                  label={val.company_name}
                />
              ))}
            </RadioGroup>
          </Box>
        </Box>
        <Box>
          <TopDesignForHigherlevel
            pendingData={pendingCount}
            radiovalue={radiovalue}
            setRadioValue={setRadioValue}
            allData={allData}
            setAllData={setAllData}
            setDisData={setDisData}
            getPendingData={getPendingData}
            getApprovalData={getApprovalData}
            getProcurementData={getProcurementData}
            getInventoryData={getInventoryData}
            getuserAckData={getuserAckData}
            getHoldData={getHoldData}
            getRejectData={getRejectData}
            getCloseData={getCloseData}
            fromDate={fromDate}
            toDate={toDate}
            fromDateChange={fromDateChange}
            toDateChange={toDateChange}
            crfRadioValue={crfRadioValue}
            setCrfRadioValue={setCrfRadioValue}
            getHoldItems={getHoldItems}
            getRejectItem={getRejectItem}
            disData={disDatalen}
            selectedCompany={selectedCompany}
          />
        </Box>
        <Box sx={{ height: window.innerHeight - 230, overflow: 'auto', flexWrap: 'wrap' }}>
          {disData.length !== 0 ? (
            <Virtuoso
              data={disData}
              totalCount={disData?.length}
              itemContent={(index, val) => (
                <Box
                  key={index}
                  sx={{
                    width: '100%',
                    flexWrap: 'wrap',
                    mt: 0.6,
                    border: '1px solid #21B6A8',
                    borderRadius: 2,
                  }}
                >
                  <MasterDetailHigherLevel
                    val={val}
                    selectedCompany={selectedCompany}
                    companyData={companyData}
                  />
                  {radiovalue === '8' ? (
                    <ClosedButtonManage
                      val={val}
                      setPoDetails={setPoDetails}
                      setImageArry={setImageArry}
                      imagearray={imagearray}
                      selectedCompany={selectedCompany}
                    />
                  ) : (
                    <ApproveButtomForED
                      val={val}
                      setApprovalFlag={setApprovalFlag}
                      setApprovalModal={setApprovalModal}
                      setCancelFlag={setCancelFlag}
                      setCancelModal={setCancelModal}
                      setApprovalData={setApprovalData}
                      setCancelData={setCancelData}
                      setReqItems={setReqItems}
                      setApproveTableData={setApproveTableData}
                      setPoDetails={setPoDetails}
                      reqItems={reqItems}
                      approveTableData={approveTableData}
                      poDetails={poDetails}
                      setDataCollectData={setDataCollectData}
                      setDataColFlag={setDataColFlag}
                      setDataColData={setDataColData}
                      datacolData={datacolData}
                      setCollectDetailCheck={setCollectDetailCheck}
                      setImageArry={setImageArry}
                      imagearray={imagearray}
                      crfRadioValue={crfRadioValue}
                      radiovalue={radiovalue}
                      selectedCompany={selectedCompany}
                      company={company}
                    />
                  )}
                </Box>
              )}
            ></Virtuoso>
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
      </Box>
    </Fragment>
  )
}
export default memo(CrfEDApprovalMain)
