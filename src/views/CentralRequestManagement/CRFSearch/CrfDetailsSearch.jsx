import { Box, CssVarsProvider, IconButton, Typography } from '@mui/joy'
import React, { Fragment, memo, useCallback, useMemo, useState } from 'react'
import CustomCloseIconCmp from '../ComonComponent/Components/CustomCloseIconCmp'
import { useNavigate } from 'react-router-dom'
import CustomInputDateCmp from '../ComonComponent/Components/CustomInputDateCmp'
import moment from 'moment'
import { format } from 'date-fns'
import DepartmentsSelectCrf from './SearchComp/DepartmentsSelectCrf'
import DeptSectionCrf from './SearchComp/DeptSectionCrf'
import { infoNotify, warningNotify } from 'src/views/Common/CommonCode'
import { axioskmc, axioslogin } from 'src/views/Axios/Axios'
import { Virtuoso } from 'react-virtuoso'
import SearchApprvlComp from './SearchComp/SearchApprvlComp'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import { useQuery } from '@tanstack/react-query'
import { getCompanyDetails, getDefaultCompany } from 'src/api/CommonApiCRF'
import { FormControlLabel, Radio, RadioGroup } from '@mui/material'
import MasterDetailHigherLevel from '../ComonComponent/HigherLevelComponents/MasterDetailHigherLevel'

const CrfDetailsSearch = () => {
  const history = useNavigate()
  const backtoSetting = useCallback(() => {
    history('/Home')
  }, [history])

  const [crfSearch, setCrfSearch] = useState({
    searchCrf: '',
    reqDate: format(new Date(), 'yyyy-MM-dd'),
    userAckDate: format(new Date(), 'yyyy-MM-dd'),
    reqCheck: false,
    closeCheck: false,
    itemName: '',
    requirement: '',
    need: ''
  })
  const { searchCrf, reqDate, userAckDate, reqCheck, closeCheck, itemName, requirement, need } = crfSearch
  const updateOnchange = useCallback(
    e => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setCrfSearch({ ...crfSearch, [e.target.name]: value })
    },
    [crfSearch]
  )
  const [dptSec, setdptSec] = useState(0)
  const [department, setDepartment] = useState(0)
  const [disData, setDisData] = useState([])
  const [selectedCompany, setSelectedCompany] = useState('1')

  const {
    data: compData,
    isLoading: isCompLoading,
    error: compError
  } = useQuery({
    queryKey: 'getCompany',
    queryFn: () => getCompanyDetails(),
    staleTime: Infinity
  })
  const companyData = useMemo(() => compData, [compData])

  const {
    data: companydefData,
    isLoading: isdefCompLoading,
    error: compdefError
  } = useQuery({
    queryKey: 'getdefaultCompany',
    queryFn: () => getDefaultCompany(),
    staleTime: Infinity
  })
  const company = useMemo(() => companydefData, [companydefData])

  const clearSearch = useCallback(() => {
    const formData = {
      searchCrf: '',
      reqDate: format(new Date(), 'yyyy-MM-dd'),
      userAckDate: format(new Date(), 'yyyy-MM-dd'),
      reqCheck: false,
      closeCheck: false,
      itemName: '',
      requirement: '',
      need: ''
    }
    setCrfSearch(formData)
    setDepartment(0)
    setdptSec(0)
    setDisData([])
  }, [])
  const handleRadioChange = useCallback(
    async e => {
      const selectedCompanyName = e.target.value
      setSelectedCompany(selectedCompanyName)
      clearSearch()
    },
    [clearSearch]
  )
  const searchData = useMemo(() => {
    const obj = {}
    if (searchCrf) obj.req_slno = searchCrf
    if (reqCheck) {
      obj.fromCreate = format(new Date(reqDate), 'yyyy-MM-dd 00:00:00')
      obj.toCreate = format(new Date(reqDate), 'yyyy-MM-dd 23:59:59')
    }
    if (closeCheck) {
      obj.userfrom = format(new Date(userAckDate), 'yyyy-MM-dd 00:00:00')
      obj.userTo = format(new Date(userAckDate), 'yyyy-MM-dd 23:59:59')
    }
    if (department) obj.dept_id = department
    if (dptSec) obj.request_deptsec_slno = dptSec
    if (itemName) obj.item_desc = itemName
    if (requirement) obj.actual_requirement = requirement
    if (need) obj.needed = need
    return obj
  }, [searchCrf, reqDate, userAckDate, department, dptSec, reqCheck, closeCheck, itemName, requirement, need])

  const searchCRFDetails = useCallback(async () => {
    if (
      searchCrf === '' &&
      reqCheck === false &&
      closeCheck === false &&
      department === 0 &&
      dptSec === 0 &&
      itemName === '' &&
      requirement === '' &&
      need === ''
    ) {
      infoNotify('Select any Options to Search')
    } else if (
      (itemName !== '' && itemName.length < 4) ||
      (requirement !== '' && requirement.length < 4) ||
      (need !== '' && need.length < 4)
    ) {
      infoNotify('Search parameters must be at least 4 characters long')
    } else {
      const getCrfDetailbySearch = async searchData => {
        try {
          let result
          if (selectedCompany === '1') {
            result = await axioslogin.post('/newCRFRegister/searchCrf', searchData)
          } else if (selectedCompany === '2') {
            result = await axioskmc.post('/newCRFRegister/searchCrf', searchData)
          } else {
            warningNotify('Please select a valid company.')
            return
          }
          const { data, success, message } = result.data
          if (success === 1) {
            const datas = data?.map(val => {
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
                status: val.rm_ndrf === 1 ? 'NDRF' : 'CRF',
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
                        : 'Not Done',
                manag_operation_remarks:
                  val.manag_operation_remarks !== null ? val.manag_operation_remarks : 'Not Updated',
                om_detial_analysis: val.om_detial_analysis,
                om_approv_date: val.om_approv_date,
                manag_operation_user: val.manag_operation_user !== null ? val.manag_operation_user.toLowerCase() : '',
                senior_manage_req: val.senior_manage_req,
                senior_manage_approv: val.senior_manage_approv,
                smo:
                  val.senior_manage_approv === 1
                    ? 'Approved'
                    : val.senior_manage_approv === 2
                      ? 'Rejected'
                      : val.senior_manage_approv === 3
                        ? 'On-Hold'
                        : 'Not Done',
                senior_manage_remarks: val.senior_manage_remarks !== null ? val.senior_manage_remarks : 'Not Updated',
                smo_detial_analysis: val.smo_detial_analysis,
                som_aprrov_date: val.som_aprrov_date,
                senior_manage_user: val.senior_manage_user !== null ? val.senior_manage_user.toLowerCase() : '',
                gm_approve_req: val.gm_approve_req,
                gm_approve: val.gm_approve,
                gm:
                  val.gm_approve === 1
                    ? 'Approved'
                    : val.gm_approve === 2
                      ? 'Rejected'
                      : val.gm_approve === 3
                        ? 'On-Hold'
                        : 'Not Done',
                gm_approve_remarks: val.gm_approve_remarks !== null ? val.gm_approve_remarks : 'Not Updated',
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
                        : 'Not Done',
                md_approve_remarks: val.md_approve_remarks !== null ? val.md_approve_remarks : 'Not Updated',
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
                        : 'Not Done',
                ed_approve_remarks: val.ed_approve_remarks !== null ? val.ed_approve_remarks : 'Not Updated',
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
                managing_director_remarks: val.managing_director_remarks !== null ? val.managing_director_remarks : '',
                managing_director_analysis: val.managing_director_analysis,
                managing_director_approve_date: val.managing_director_approve_date,
                managing_director_user: val.managing_director_username
                  ? val.managing_director_username.toLowerCase()
                  : '',
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
                                              ? 'Purchase Acknowledged'
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
                //  here now_who_status =5 is used to not show approved from purchase level on status
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
                dept_name: val.dept_name,
                dept_type: val.dept_type,
                dept_type_name: val.dept_type === 1 ? 'Clinical' : val.dept_type === 2 ? 'Non Clinical' : 'Academic',
                po_number: val.po_number,
                approval_level: val.approval_level,
                user_acknldge: val.user_acknldge,
                internally_arranged_status: val.internally_arranged_status,
                user_ack_date: val?.user_ack_date,
                company_name: val?.company_name,
                work_order_status: val?.work_order_status
              }
              return obj
            })
            setDisData(datas)
          } else if (success === 2) {
            setDisData([])
            infoNotify(message)
          } else {
            warningNotify(message)
          }
        } catch (error) {
          warningNotify('An error occurred while processing your request. Please try again.', error)
        }
      }
      getCrfDetailbySearch(searchData)
    }
  }, [
    searchData,
    searchCrf,
    department,
    dptSec,
    reqCheck,
    closeCheck,
    itemName,
    requirement,
    need,
    selectedCompany,
    company
  ])
  // const { company_name } = company
  const { company_name } = company || {};


  if (isCompLoading || isdefCompLoading) return <p>Loading...</p>
  if (compError || compdefError) return <p>Error Occurred.</p>
  return (
    <Fragment>
      <Box sx={{ height: window.innerHeight - 80, flexWrap: 'wrap', bgcolor: 'white', width: '100%' }}>
        <Box sx={{ backgroundColor: '#f0f3f5', border: '1px solid #B4F5F0', borderBottom: 'none' }}>
          <Box sx={{ display: 'flex', backgroundColor: '#f0f3f5' }}>
            <Box sx={{ fontWeight: 550, flex: 1, pl: 1, pt: 0.5, color: '#385E72' }}>CRF Search</Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', flex: 1, fontSize: 20, m: 0.5 }}>
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
              bgcolor: 'white'
            }}
          >
            <RadioGroup row value={selectedCompany} onChange={handleRadioChange}>
              {companyData?.map(val => (
                <FormControlLabel
                  key={val.company_slno}
                  value={val.company_slno}
                  control={<Radio />}
                  label={val?.company_name}
                />
              ))}
            </RadioGroup>
          </Box>
        </Box>
        <Box sx={{ flexWrap: 'wrap', border: '1px solid lightblue', bgcolor: '#E3EFF9' }}>
          {/* firsline */}
          <Box sx={{ display: 'flex', m: 1, flexWrap: 'wrap' }}>
            <Box sx={{ flex: 1, pt: 0.2 }}>
              <Typography sx={{ fontSize: 13, color: '#1D617A', pl: 1 }}>CRF No.</Typography>
              <CssVarsProvider>
                <CustomInputDateCmp
                  StartIcon={
                    <Typography sx={{ fontSize: '13px', color: '#0063C5' }}>
                      {selectedCompany === '2' ? `CRF/KMC/` : `CRF/${company_name}/`}
                    </Typography>
                  }
                  className={{
                    borderRadius: 6,
                    border: '1px solid #bbdefb',
                    height: 35,
                    color: '#1565c0'
                  }}
                  autoComplete={'off'}
                  size={'md'}
                  type="text"
                  name={'searchCrf'}
                  value={searchCrf}
                  handleChange={updateOnchange}
                />
              </CssVarsProvider>
            </Box>
            <Box sx={{ pl: 0.3, flex: 1 }}>
              <Box sx={{ display: 'flex' }}>
                <Typography sx={{ fontSize: 13, color: '#1D617A', px: 1, pt: 0.1 }}>CRF Request Date</Typography>
                <CusCheckBox
                  variant="outlined"
                  size="md"
                  name="reqCheck"
                  value={reqCheck}
                  onCheked={updateOnchange}
                  checked={reqCheck}
                  className={{ color: '#1D617A', pb: 0.1 }}
                />
              </Box>
              <CssVarsProvider>
                {reqCheck === true ? (
                  <CustomInputDateCmp
                    className={{
                      height: 25,
                      borderRadius: 5,
                      border: '1px solid #bbdefb',
                      color: '#0d47a1',
                      fontSize: 14,
                      width: '100%'
                    }}
                    size={'md'}
                    type="date"
                    value={reqDate}
                    name="reqDate"
                    handleChange={updateOnchange}
                    slotProps={{
                      input: { max: moment(new Date()).format('YYYY-MM-DD') }
                    }}
                  />
                ) : (
                  <CustomInputDateCmp
                    disabled
                    className={{
                      height: 25,
                      borderRadius: 5,
                      border: '1px solid #bbdefb',
                      color: '#0d47a1',
                      fontSize: 14,
                      width: '100%'
                    }}
                    size={'md'}
                    type="date"
                    value={reqDate}
                    slotProps={{
                      input: { max: moment(new Date()).format('YYYY-MM-DD') }
                    }}
                  />
                )}
              </CssVarsProvider>
            </Box>
            <Box sx={{ pl: 0.3, flex: 1 }}>
              <Box sx={{ display: 'flex' }}>
                <Typography sx={{ fontSize: 13, color: '#1D617A', px: 1, pt: 0.1 }}>CRF Closed Date</Typography>
                <CusCheckBox
                  variant="outlined"
                  size="md"
                  name="closeCheck"
                  value={closeCheck}
                  onCheked={updateOnchange}
                  checked={closeCheck}
                  className={{ color: '#1D617A', pb: 0.1 }}
                />
              </Box>
              <CssVarsProvider>
                {closeCheck === true ? (
                  <CustomInputDateCmp
                    className={{
                      height: 25,
                      borderRadius: 5,
                      border: '1px solid #bbdefb',
                      color: '#0d47a1',
                      fontSize: 14,
                      width: '100%'
                    }}
                    size={'md'}
                    type="date"
                    value={userAckDate}
                    name="userAckDate"
                    handleChange={updateOnchange}
                    slotProps={{
                      input: { max: moment(new Date()).format('YYYY-MM-DD') }
                    }}
                  />
                ) : (
                  <CustomInputDateCmp
                    disabled
                    className={{
                      height: 25,
                      borderRadius: 5,
                      border: '1px solid #bbdefb',
                      color: '#0d47a1',
                      fontSize: 14,
                      width: '100%'
                    }}
                    size={'md'}
                    type="date"
                    value={userAckDate}
                    slotProps={{
                      input: { max: moment(new Date()).format('YYYY-MM-DD') }
                    }}
                  />
                )}
              </CssVarsProvider>
            </Box>
          </Box>
          {/* second line */}
          <Box sx={{ display: 'flex', m: 1, flexWrap: 'wrap' }}>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontSize: 13, color: '#1D617A', pl: 1 }}>Department</Typography>
              <DepartmentsSelectCrf department={department} setDepartment={setDepartment} setdptSec={setdptSec} />
            </Box>
            <Box sx={{ pl: 0.3, flex: 1 }}>
              <Typography sx={{ fontSize: 13, color: '#1D617A', pl: 1 }}>Department Section</Typography>
              <DeptSectionCrf dptSec={dptSec} setdptSec={setdptSec} />
            </Box>
            <Box sx={{ flex: 1, pl: 0.3 }}>
              <Typography sx={{ fontSize: 13, color: '#1D617A', pl: 1 }}>Item Description</Typography>
              <CssVarsProvider>
                <CustomInputDateCmp
                  className={{
                    borderRadius: 6,
                    border: '1px solid #bbdefb',
                    height: 35,
                    color: '#1565c0'
                  }}
                  autoComplete={'off'}
                  size={'md'}
                  type="text"
                  name={'itemName'}
                  value={itemName}
                  handleChange={updateOnchange}
                />
              </CssVarsProvider>
            </Box>
          </Box>
          {/* third line */}
          <Box sx={{ display: 'flex', m: 1, flexWrap: 'wrap' }}>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontSize: 13, color: '#1D617A', pl: 1 }}>Requirement</Typography>
              <CssVarsProvider>
                <CustomInputDateCmp
                  className={{
                    borderRadius: 6,
                    border: '1px solid #bbdefb',
                    height: 35,
                    color: '#1565c0'
                  }}
                  autoComplete={'off'}
                  size={'md'}
                  type="text"
                  name={'requirement'}
                  value={requirement}
                  handleChange={updateOnchange}
                />
              </CssVarsProvider>
            </Box>
            <Box sx={{ flex: 1, pl: 0.3 }}>
              <Typography sx={{ fontSize: 13, color: '#1D617A', pl: 1 }}>Need</Typography>
              <CssVarsProvider>
                <CustomInputDateCmp
                  className={{
                    borderRadius: 6,
                    border: '1px solid #bbdefb',
                    height: 35,
                    color: '#1565c0'
                  }}
                  autoComplete={'off'}
                  size={'md'}
                  type="text"
                  name={'need'}
                  value={need}
                  handleChange={updateOnchange}
                />
              </CssVarsProvider>
            </Box>
            <Box sx={{ display: 'flex', flex: 1 }}>
              <Box sx={{ pt: 2.3, flex: 1, pl: 0.5 }}>
                <CssVarsProvider>
                  <IconButton
                    sx={{
                      border: '1px solid #bbdefb',
                      width: '100%',
                      fontSize: 13,
                      height: 38,
                      lineHeight: '1.2',
                      color: '#1565c0',
                      bgcolor: 'white',
                      borderRadius: 6,
                      '&:hover': {
                        bgcolor: 'white',
                        color: '#43B0F1'
                      }
                    }}
                    onClick={searchCRFDetails}
                  >
                    Search
                  </IconButton>
                </CssVarsProvider>
              </Box>
              <Box sx={{ pl: 0.5, pt: 2.3, flex: 1 }}>
                <CssVarsProvider>
                  <IconButton
                    sx={{
                      border: '1px solid #bbdefb',
                      width: '100%',
                      fontSize: 13,
                      height: 38,
                      lineHeight: '1.2',
                      color: '#1565c0',
                      bgcolor: 'white',
                      borderRadius: 6,
                      '&:hover': {
                        bgcolor: 'white',
                        color: '#43B0F1'
                      }
                    }}
                    onClick={clearSearch}
                  >
                    Clear Filter
                  </IconButton>
                </CssVarsProvider>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box sx={{ height: window.innerHeight - 280, overflow: 'auto', flexWrap: 'wrap' }}>
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
                    borderRadius: 2
                  }}
                >
                  <MasterDetailHigherLevel val={val} selectedCompany={selectedCompany} />
                  <SearchApprvlComp val={val} selectedCompany={selectedCompany} company={company} />
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
                color: 'grey'
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
export default memo(CrfDetailsSearch)
