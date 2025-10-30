import { Button, CssVarsProvider, Typography, Box, Grid, Textarea, Tooltip } from '@mui/joy'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined'
import MonthlyReportModal from '../Component/MonthlyReportModal'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import VaccinesIcon from '@mui/icons-material/Vaccines'
import AssessmntBenchmarkModal from '../InitialAssessmentReport/AssessmntBenchmarkModal'
import { format } from 'date-fns'
import { axioslogin } from 'src/views/Axios/Axios'
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined'
import ReportGmailerrorredOutlinedIcon from '@mui/icons-material/ReportGmailerrorredOutlined'
import NearbyErrorIcon from '@mui/icons-material/NearbyError'
import FmdBadOutlinedIcon from '@mui/icons-material/FmdBadOutlined'
import RunningWithErrorsOutlinedIcon from '@mui/icons-material/RunningWithErrorsOutlined'
import SaveIcon from '@mui/icons-material/Save'
import { Paper } from '@mui/material'
import { useSelector } from 'react-redux'

const HodQiapprovalView = ({
  viewData,
  qidept,
  searchDate,
  setsearchFlag,
  ipViewReport,
  testCount,
  equipmentlist,
  endoDays
}) => {
  const [endoSearch, setEndoSearch] = useState(0)
  const [tableData, setTableData] = useState([])
  // view flag  for other qi details view in modal
  const [viewFlag, setViewFlag] = useState(0)
  const [modalopen, setModalOpen] = useState(false)
  // time flag for view assessment modal view
  const [timeFlag, setTimeFlag] = useState(0)
  const [timeModal, setTimeModal] = useState(false)
  // monthly modal view monthFlag is 2 (monthly Report)and monthFlag 1 in (initialassessment report )
  const [monthFlag, setMonthFlag] = useState(0)
  const [remarks, setRemarks] = useState('')
  const [lastApprvdDate, setLastApprvdDate] = useState(format(new Date(), 'dd-MM-yyyy hh:mm:ss'))
  const [count, setcount] = useState(0)
  const [empName, setempName] = useState(0)

  const [monthReport, setMonthReport] = useState({
    totalTest: 0,
    totalPat: 0,
    totalError: 0,
    totalRedos: 0,
    totalTime: 0,
    totalIdentifctn: 0,
    totalFalls: 0,
    totalSentinel: 0,
    totalSentinelAnalysed: 0,
    totalNearMisses: 0,
    errorResult: 0,
    redosResult: 0,
    timeResult: 0,
    idetifctionResult: 0,
    fallsResult: 0,
    sentinelResult: 0,
    nearMissessResult: 0,
    totIncidentReported: 0,
    totEquipTime: 0,
    totEquipAvailable: 0,
    equipResult: 0
  })
  const {
    totalTest,
    totalPat,
    totalError,
    totalRedos,
    totalTime,
    totalIdentifctn,
    totalFalls,
    totalSentinel,
    totalSentinelAnalysed,
    totalNearMisses,
    errorResult,
    redosResult,
    timeResult,
    idetifctionResult,
    fallsResult,
    sentinelResult,
    nearMissessResult,
    totIncidentReported,
    totEquipTime,
    totEquipAvailable,
    equipResult
  } = monthReport

  const [headerNames, setHeaderNames] = useState({
    header1: '',
    header2: ''
  })
  const [inchargeDetails, setInchargeDetails] = useState({
    apprvlSlno: 0,
    inchrgStatus: 0,
    inchrgeName: '',
    inchrgDate: '',
    inchrgRemarks: '',
    hodStatus: 0
  })
  const { apprvlSlno, inchrgStatus, inchrgeName, inchrgDate, inchrgRemarks, hodStatus } = inchargeDetails

  const id = useSelector(state => {
    return state?.LoginUserData.empid
  })

  useEffect(() => {
    if (viewData.length !== 0 || ipViewReport.length !== 0) {
      const testTot = testCount.length
      const ptcount = viewData.length + ipViewReport.length
      const errortot =
        viewData?.filter(val => val.error_status === 1).length +
        ipViewReport?.filter(val => val.error_status === 1).length

      const redostot =
        viewData?.filter(val => val.redo_status === 1).length +
        ipViewReport?.filter(val => val.redo_status === 1).length

      // // waiting time
      // const optime = (viewData?.map(val => val.sumof_service_time).reduce((prev, next) => Number(prev) + Number(next)))
      const optime = viewData
        ?.filter(val => val.qi_save_status === 1)
        .reduce((acc, curr) => acc + curr.sumof_service_time, 0)
      const iptime = ipViewReport
        ?.filter(val => val.qi_save_status === 1)
        .reduce((acc, curr) => acc + curr.sumof_service_time, 0)
      const timetot = optime + iptime

      const identtot =
        viewData?.filter(val => val.incidence_ident_error_status === 1).length +
        ipViewReport?.filter(val => val.incidence_ident_error_status === 1).length

      const fallstot =
        viewData?.filter(val => val.falls_status === 1).length +
        ipViewReport?.filter(val => val.falls_status === 1).length

      const analysedSentineltot =
        viewData?.filter(val => val.sentinel_analysed === 1).length +
        ipViewReport?.filter(val => val.sentinel_analysed === 1).length

      const senttot =
        viewData?.filter(val => val.sentinel_events_status === 1).length +
        ipViewReport?.filter(val => val.sentinel_events_status === 1).length

      const nearmisstot =
        viewData?.filter(val => val.near_misses_status === 1).length +
        ipViewReport?.filter(val => val.near_misses_status === 1).length

      const sumOfInc = errortot + redostot + identtot + fallstot + senttot + nearmisstot
      // equipServiceTime
      const opequipTime = viewData
        ?.filter(val => val.qi_save_status === 1)
        .reduce((acc, curr) => acc + curr.equip_service_time, 0)
      const ipequipTime = ipViewReport
        ?.filter(val => val.qi_save_status === 1)
        .reduce((acc, curr) => acc + curr.equip_service_time, 0)
      const equipTimeTot = ((opequipTime + ipequipTime) / 60).toFixed(2)

      const equipAvailable = equipmentlist.length * (8 * endoDays.length)

      const formdata = {
        totalTest: testTot,
        totalPat: ptcount,
        totalError: errortot,
        totalRedos: redostot,
        totalTime: timetot,
        totalIdentifctn: identtot,
        totalFalls: fallstot,
        totalSentinel: senttot,
        totalSentinelAnalysed: analysedSentineltot,
        totalNearMisses: nearmisstot,
        totIncidentReported: sumOfInc,
        errorResult: testTot > 0 ? ((errortot / testTot) * 1000).toFixed(2) : 0,
        redosResult: testTot > 0 ? ((redostot / testTot) * 1000).toFixed(2) : 0,
        timeResult: ptcount > 0 ? (timetot / ptcount).toFixed(2) : 0,
        idetifctionResult: ptcount > 0 ? ((identtot / ptcount) * 100).toFixed(2) : 0,
        fallsResult: ptcount > 0 ? ((fallstot / ptcount) * 1000).toFixed(2) : 0,
        sentinelResult: senttot > 0 ? ((analysedSentineltot / senttot) * 100).toFixed(2) : 0,
        nearMissessResult: identtot > 0 ? ((nearmisstot / sumOfInc) * 100).toFixed(2) : 0,
        totEquipTime: equipTimeTot,
        totEquipAvailable: equipAvailable,
        equipResult: equipAvailable > 0 ? ((equipTimeTot / equipAvailable) * 100).toFixed(2) : 0
      }
      setMonthReport(formdata)
      setEndoSearch(1)
    }
  }, [viewData, ipViewReport, endoDays, equipmentlist, testCount])

  useEffect(() => {
    if (viewData.length !== 0 || ipViewReport.length !== 0) {
      const postdata = {
        qi_endo_date: searchDate,
        qi_dept_no: qidept
      }
      const ExistApprvView = async postdata => {
        const result = await axioslogin.post('/qiendoscopy/apprvView', postdata)
        return result.data
      }
      ExistApprvView(postdata).then(val => {
        const { success, data } = val
        if (success === 1) {
          const {
            apprv_slno,
            endo_incharge_apprv_status,
            endo_incharge_remarks,
            endo_Incharge_apprv_date,
            inchrge,
            inchargeno,
            endo_hod_remarks,
            endo_hod_apprv_date,
            hod,
            hodno,
            endo_hod_apprv_status
          } = data[0]
          setRemarks(endo_hod_apprv_status === 1 ? endo_hod_remarks : '')
          setLastApprvdDate(endo_hod_apprv_date)
          setempName(hod + '  (' + hodno + ')')
          const fromData = {
            apprvlSlno: apprv_slno,
            inchrgStatus: endo_incharge_apprv_status,
            inchrgRemarks: endo_incharge_remarks === null ? 'Nil' : endo_incharge_remarks,
            inchrgeName: inchrge + '  (' + inchargeno + ')',
            inchrgDate: endo_Incharge_apprv_date,
            hodStatus: endo_hod_apprv_status
          }
          setInchargeDetails(fromData)
        } else if (success === 2) {
        }
      })
    }
  }, [searchDate, qidept, viewData, count, ipViewReport])

  const ViewErrorDetails = useCallback(() => {
    const opData = viewData?.filter(val => val.error_status === 1)
    const ipdata = ipViewReport?.filter(val => val.error_status === 1)
    if (opData.length !== 0) {
      const errorData = opData?.map(val => {
        return {
          incident_date: val.incident_error_date,
          ptno: val.ptno,
          ptname: val.ptname,
          ptsex: val.ptsex,
          ptage: val.ptage,
          doctor_name: val.doctor_name,
          details: val.error_details,
          reason: val.error_reason,
          inctype: val.error_incident_type,
          type: 'OP'
          // corrective: val.error_corrective,
          // preventive: val.error_preventive,
        }
      })
      if (ipdata.length !== 0) {
        const ipErrorData = ipdata?.map(val => {
          return {
            incident_date: val.incident_error_date,
            ptno: val.ptno,
            ptname: val.ptname,
            ptsex: val.ptsex,
            ptage: val.ptage,
            doctor_name: val.doctor_name,
            details: val.error_details,
            reason: val.error_reason,
            inctype: val.error_incident_type,
            type: 'IP'
          }
        })
        const finalData = [...errorData, ...ipErrorData].sort(
          (a, b) => new Date(a.incident_error_date) - new Date(b.incident_error_date)
        )
        setTableData(finalData)
      } else {
        setTableData(errorData)
      }
      const fromdata = {
        header1: 'Details of Error',
        header2: 'Reason of Error'
      }
      setHeaderNames(fromdata)
      setViewFlag(1)
      setModalOpen(true)
    } else {
      if (ipdata.length !== 0) {
        const ipErrorData = ipdata?.map(val => {
          return {
            incident_date: val.incident_error_date,
            ptno: val.ptno,
            ptname: val.ptname,
            ptsex: val.ptsex,
            ptage: val.ptage,
            doctor_name: val.doctor_name,
            details: val.error_details,
            reason: val.error_reason,
            inctype: val.error_incident_type,
            type: 'IP'
          }
        })
        setTableData(ipErrorData)
        const fromdata = {
          header1: 'Details of Error',
          header2: 'Reason of Error'
        }
        setHeaderNames(fromdata)
        setViewFlag(1)
        setModalOpen(true)
      } else {
        infoNotify('No Data Found')
        setViewFlag(0)
        setModalOpen(false)
      }
    }
  }, [viewData, ipViewReport])

  const ViewRedosDetails = useCallback(() => {
    const opData = viewData?.filter(val => val.redo_status === 1)
    const ipdata = ipViewReport?.filter(val => val.redo_status === 1)
    if (opData.length !== 0) {
      const errorData = opData?.map(val => {
        return {
          incident_date: val.incident_redos_date,
          ptno: val.ptno,
          ptname: val.ptname,
          ptsex: val.ptsex,
          ptage: val.ptage,
          doctor_name: val.doctor_name,
          details: val.redos_details,
          reason: val.redos_reason,
          inctype: val.redos_incident_type,
          type: 'OP'
          // corrective: val.redos_corrective,
          //preventive: val.redos_preventive,
        }
      })
      if (ipdata.length !== 0) {
        const ipErrorData = ipdata?.map(val => {
          return {
            incident_date: val.incident_redos_date,
            ptno: val.ptno,
            ptname: val.ptname,
            ptsex: val.ptsex,
            ptage: val.ptage,
            doctor_name: val.doctor_name,
            details: val.redos_details,
            reason: val.redos_reason,
            inctype: val.redos_incident_type,
            type: 'IP'
          }
        })
        const finalData = [...errorData, ...ipErrorData].sort(
          (a, b) => new Date(a.incident_redos_date) - new Date(b.incident_redos_date)
        )
        setTableData(finalData)
      } else {
        setTableData(errorData)
      }
      const fromdata = {
        header1: 'Details',
        header2: 'Reason for Redos'
      }
      setHeaderNames(fromdata)
      setViewFlag(1)
      setModalOpen(true)
    } else {
      if (ipdata.length !== 0) {
        const ipErrorData = ipdata?.map(val => {
          return {
            incident_date: val.incident_redos_date,
            ptno: val.ptno,
            ptname: val.ptname,
            ptsex: val.ptsex,
            ptage: val.ptage,
            doctor_name: val.doctor_name,
            details: val.redos_details,
            reason: val.redos_reason,
            inctype: val.redos_incident_type,
            type: 'IP'
          }
        })
        setTableData(ipErrorData)
        const fromdata = {
          header1: 'Details of Error',
          header2: 'Reason of Error'
        }
        setHeaderNames(fromdata)
        setViewFlag(1)
        setModalOpen(true)
      } else {
        infoNotify('No Data Found')
        setViewFlag(0)
        setModalOpen(false)
      }
    }
  }, [viewData, ipViewReport])

  const ViewWaitingTimeDetails = useCallback(() => {
    const opData = viewData?.filter(val => val.assessment_benchmark_flag === 1)
    const ipdata = ipViewReport?.filter(val => val.assessment_benchmark_flag === 1)
    if (opData.length !== 0) {
      const AssesmentData = opData?.map(val => {
        return {
          ptno: val.ptno,
          ptname: val.ptname,
          ptsex: val.ptsex,
          ptage: val.ptage,
          doctor_name: val.doctor_name,
          endo_arrival_time: val.endo_arrival_time,
          sumof_service_time: val.sumof_service_time,
          initial_assessment_reason: val.initial_assessment_reason,
          type: 'OP'
        }
      })
      if (ipdata.length !== 0) {
        const ipAssesmentData = ipdata?.map(val => {
          return {
            ptno: val.ptno,
            ptname: val.ptname,
            ptsex: val.ptsex,
            ptage: val.ptage,
            doctor_name: val.doctor_name,
            endo_arrival_time: val.endo_arrival_time,
            sumof_service_time: val.sumof_service_time,
            initial_assessment_reason: val.initial_assessment_reason,
            type: 'IP'
          }
        })
        const finalData = [...AssesmentData, ...ipAssesmentData].sort(
          (a, b) => new Date(a.endo_arrival_time) - new Date(b.endo_arrival_time)
        )
        setTableData(finalData)
      } else {
        setTableData(AssesmentData)
      }
      setTimeFlag(1)
      setMonthFlag(2)
      setTimeModal(true)
    } else {
      if (ipdata.length !== 0) {
        const ipAssesmentData = ipdata?.map(val => {
          return {
            ptno: val.ptno,
            ptname: val.ptname,
            ptsex: val.ptsex,
            ptage: val.ptage,
            doctor_name: val.doctor_name,
            endo_arrival_time: val.endo_arrival_time,
            sumof_service_time: val.sumof_service_time,
            initial_assessment_reason: val.initial_assessment_reason,
            type: 'IP'
          }
        })
        setTableData(ipAssesmentData)
        setTimeFlag(1)
        setMonthFlag(2)
        setTimeModal(true)
      } else {
        infoNotify('No Report Found')
        setTimeFlag(0)
        setMonthFlag(0)
        setTimeModal(false)
      }
    }
  }, [viewData, ipViewReport])
  const ViewIdentifictionErrorDetails = useCallback(() => {
    const opData = viewData?.filter(val => val.incidence_ident_error_status === 1)
    const ipdata = ipViewReport?.filter(val => val.incidence_ident_error_status === 1)
    if (opData.length !== 0) {
      const errorData = opData?.map(val => {
        return {
          incident_date: val.incidence_ident_date,
          ptno: val.ptno,
          ptname: val.ptname,
          ptsex: val.ptsex,
          ptage: val.ptage,
          doctor_name: val.doctor_name,
          details: val.incidence_ident_description,
          reason: val.incidence_ident_reason,
          inctype: val.ident_error_incident_type,
          type: 'OP'
          // corrective: val.incidence_ident_action,
        }
      })
      if (ipdata.length !== 0) {
        const ipErrorData = ipdata?.map(val => {
          return {
            incident_date: val.incidence_ident_date,
            ptno: val.ptno,
            ptname: val.ptname,
            ptsex: val.ptsex,
            ptage: val.ptage,
            doctor_name: val.doctor_name,
            details: val.incidence_ident_description,
            reason: val.incidence_ident_reason,
            inctype: val.ident_error_incident_type,
            type: 'IP'
          }
        })
        const finalData = [...errorData, ...ipErrorData].sort(
          (a, b) => new Date(a.incidence_ident_date) - new Date(b.incidence_ident_date)
        )
        setTableData(finalData)
      } else {
        setTableData(errorData)
      }
      const fromdata = {
        header1: 'Identification Error Details',
        header2: 'Reason'
      }
      setHeaderNames(fromdata)
      setViewFlag(1)
      setModalOpen(true)
    } else {
      if (ipdata.length !== 0) {
        const ipErrorData = ipdata?.map(val => {
          return {
            incident_date: val.incidence_ident_date,
            ptno: val.ptno,
            ptname: val.ptname,
            ptsex: val.ptsex,
            ptage: val.ptage,
            doctor_name: val.doctor_name,
            details: val.incidence_ident_description,
            reason: val.incidence_ident_reason,
            inctype: val.ident_error_incident_type,
            type: 'IP'
          }
        })
        setTableData(ipErrorData)
        const fromdata = {
          header1: 'Details of Error',
          header2: 'Reason of Error'
        }
        setHeaderNames(fromdata)
        setViewFlag(1)
        setModalOpen(true)
      } else {
        infoNotify('No Data Found')
        setViewFlag(0)
        setModalOpen(false)
      }
    }
  }, [viewData, ipViewReport])

  const ViewFallsDetails = useCallback(() => {
    const opData = viewData?.filter(val => val.falls_status === 1)
    const ipdata = ipViewReport?.filter(val => val.falls_status === 1)
    if (opData.length !== 0) {
      const errorData = opData?.map(val => {
        return {
          incident_date: val.incident_falls_date,
          ptno: val.ptno,
          ptname: val.ptname,
          ptsex: val.ptsex,
          ptage: val.ptage,
          doctor_name: val.doctor_name,
          details: val.falls_details,
          reason: val.falls_reason,
          inctype: val.falls_incident_type,
          type: 'OP'
        }
      })
      if (ipdata.length !== 0) {
        const ipErrorData = ipdata?.map(val => {
          return {
            incident_date: val.incident_falls_date,
            ptno: val.ptno,
            ptname: val.ptname,
            ptsex: val.ptsex,
            ptage: val.ptage,
            doctor_name: val.doctor_name,
            details: val.falls_details,
            reason: val.falls_reason,
            inctype: val.falls_incident_type,
            type: 'IP'
          }
        })
        const finalData = [...errorData, ...ipErrorData].sort(
          (a, b) => new Date(a.incident_falls_date) - new Date(b.incident_falls_date)
        )
        setTableData(finalData)
      } else {
        setTableData(errorData)
      }
      const fromdata = {
        header1: 'Details of Falls',
        header2: 'Reason for Falls'
      }
      setHeaderNames(fromdata)
      setViewFlag(1)
      setModalOpen(true)
    } else {
      if (ipdata.length !== 0) {
        const ipErrorData = ipdata?.map(val => {
          return {
            incident_date: val.incident_falls_date,
            ptno: val.ptno,
            ptname: val.ptname,
            ptsex: val.ptsex,
            ptage: val.ptage,
            doctor_name: val.doctor_name,
            details: val.falls_details,
            reason: val.falls_reason,
            inctype: val.falls_incident_type,
            type: 'IP'
          }
        })
        setTableData(ipErrorData)
        const fromdata = {
          header1: 'Details of Error',
          header2: 'Reason of Error'
        }
        setHeaderNames(fromdata)
        setViewFlag(1)
        setModalOpen(true)
      } else {
        infoNotify('No Data Found')
        setViewFlag(0)
        setModalOpen(false)
      }
    }
  }, [viewData, ipViewReport])

  const ViewSentinelDetails = useCallback(() => {
    const opData = viewData?.filter(val => val.sentinel_events_status === 1)
    const ipdata = ipViewReport?.filter(val => val.sentinel_events_status === 1)
    if (opData.length !== 0) {
      const errorData = opData?.map(val => {
        return {
          incident_date: val.incident_sentinel_date,
          ptno: val.ptno,
          ptname: val.ptname,
          ptsex: val.ptsex,
          ptage: val.ptage,
          doctor_name: val.doctor_name,
          details: val.sentinel_details,
          reason: val.sentinel_reason,
          inctype: val.sentinel_incident_type,
          type: 'OP'
        }
      })
      if (ipdata.length !== 0) {
        const ipErrorData = ipdata?.map(val => {
          return {
            incident_date: val.incident_sentinel_date,
            ptno: val.ptno,
            ptname: val.ptname,
            ptsex: val.ptsex,
            ptage: val.ptage,
            doctor_name: val.doctor_name,
            details: val.sentinel_details,
            reason: val.sentinel_reason,
            inctype: val.sentinel_incident_type,
            type: 'IP'
          }
        })
        const finalData = [...errorData, ...ipErrorData].sort(
          (a, b) => new Date(a.incident_sentinel_date) - new Date(b.incident_sentinel_date)
        )
        setTableData(finalData)
      } else {
        setTableData(errorData)
      }
      const fromdata = {
        header1: 'Details',
        header2: 'Reason for Sentinel Events Happened'
      }
      setHeaderNames(fromdata)
      setViewFlag(1)
      setModalOpen(true)
    } else {
      if (ipdata.length !== 0) {
        const ipErrorData = ipdata?.map(val => {
          return {
            incident_date: val.incident_sentinel_date,
            ptno: val.ptno,
            ptname: val.ptname,
            ptsex: val.ptsex,
            ptage: val.ptage,
            doctor_name: val.doctor_name,
            details: val.sentinel_details,
            reason: val.sentinel_reason,
            inctype: val.sentinel_incident_type,
            type: 'IP'
          }
        })
        setTableData(ipErrorData)
        const fromdata = {
          header1: 'Details of Error',
          header2: 'Reason of Error'
        }
        setHeaderNames(fromdata)
        setViewFlag(1)
        setModalOpen(true)
      } else {
        infoNotify('No Data Found')
        setViewFlag(0)
        setModalOpen(false)
      }
    }
  }, [viewData, ipViewReport])

  const ViewNearMissessDetails = useCallback(() => {
    const opData = viewData?.filter(val => val.near_misses_status === 1)
    const ipdata = ipViewReport?.filter(val => val.near_misses_status === 1)
    if (opData.length !== 0) {
      const errorData = opData?.map(val => {
        return {
          incident_date: val.incident_nearmisses_date,
          ptno: val.ptno,
          ptname: val.ptname,
          ptsex: val.ptsex,
          ptage: val.ptage,
          doctor_name: val.doctor_name,
          details: val.nearmisses_details,
          reason: val.nearmisses_reason,
          inctype: val.nearmiss_incident_type,
          type: 'OP'
        }
      })
      if (ipdata.length !== 0) {
        const ipErrorData = ipdata?.map(val => {
          return {
            incident_date: val.incident_nearmisses_date,
            ptno: val.ptno,
            ptname: val.ptname,
            ptsex: val.ptsex,
            ptage: val.ptage,
            doctor_name: val.doctor_name,
            details: val.nearmisses_details,
            reason: val.nearmisses_reason,
            inctype: val.nearmiss_incident_type,
            type: 'IP'
          }
        })
        const finalData = [...errorData, ...ipErrorData].sort(
          (a, b) => new Date(a.incident_nearmisses_date) - new Date(b.incident_nearmisses_date)
        )
        setTableData(finalData)
      } else {
        setTableData(errorData)
      }
      const fromdata = {
        header1: 'Details',
        header2: 'Reason for Near Missess'
      }
      setHeaderNames(fromdata)
      setViewFlag(1)
      setModalOpen(true)
    } else {
      if (ipdata.length !== 0) {
        const ipErrorData = ipdata?.map(val => {
          return {
            incident_date: val.incident_nearmisses_date,
            ptno: val.ptno,
            ptname: val.ptname,
            ptsex: val.ptsex,
            ptage: val.ptage,
            doctor_name: val.doctor_name,
            details: val.nearmisses_details,
            reason: val.nearmisses_reason,
            inctype: val.nearmiss_incident_type,
            type: 'IP'
          }
        })
        setTableData(ipErrorData)
        const fromdata = {
          header1: 'Details of Error',
          header2: 'Reason of Error'
        }
        setHeaderNames(fromdata)
        setViewFlag(1)
        setModalOpen(true)
      } else {
        infoNotify('No Data Found')
        setViewFlag(0)
        setModalOpen(false)
      }
    }
  }, [viewData, ipViewReport])

  const reset = useCallback(() => {
    setRemarks('')
    setEndoSearch(0)
    setsearchFlag(0)
  }, [setsearchFlag])

  const postdata = useMemo(() => {
    return {
      qi_dept_no: qidept,
      qi_endo_date: format(new Date(searchDate), 'yyyy-MM-dd'),
      endo_hod_apprv_status: 1,
      endo_hod_remarks: remarks,
      endo_hod_apprv_date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
      endo_hod_id: id
    }
  }, [qidept, searchDate, remarks, id])

  const patchdata = useMemo(() => {
    return {
      endo_hod_apprv_status: 1,
      endo_hod_remarks: remarks,
      endo_hod_apprv_date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
      endo_hod_id: id,
      apprv_slno: apprvlSlno
    }
  }, [remarks, id, apprvlSlno])

  const SaveDetails = useCallback(() => {
    if (remarks === '') {
      infoNotify('Please Add Remarks')
    } else {
      const saveData = async postdata => {
        const result = await axioslogin.post('/qiendoscopy/hodapprv', postdata)
        return result.data
      }
      const updateData = async patchdata => {
        const result = await axioslogin.patch('/qiendoscopy/hodapprvUpdate', patchdata)
        return result.data
      }
      if (apprvlSlno === 0) {
        saveData(postdata).then(val => {
          const { success, message } = val
          if (success === 1) {
            succesNotify(message)
            setcount(count + 1)
          } else {
            infoNotify(message)
            reset()
          }
        })
      } else {
        updateData(patchdata).then(val => {
          const { success, message } = val
          if (success === 1) {
            succesNotify(message)
            setcount(count + 1)
          } else {
            infoNotify(message)
            reset()
          }
        })
      }
    }
  }, [remarks, postdata, reset, count, patchdata, apprvlSlno])
  const handleClose = useCallback(() => {
    setModalOpen(false)
    setTimeModal(false)
    setViewFlag(0)
    setTimeFlag(0)
  }, [])

  return (
    <Box>
      {timeFlag === 1 ? (
        <AssessmntBenchmarkModal
          open={timeModal}
          handleClose={handleClose}
          patList={tableData}
          initdate={format(new Date(searchDate), 'MMM-yyyy')}
          monthFlag={monthFlag}
        />
      ) : null}
      {viewFlag === 1 ? (
        <MonthlyReportModal
          open={modalopen}
          handleClose={handleClose}
          tableData={tableData}
          headerNames={headerNames}
        />
      ) : null}

      <Box
        variant="outlined"
        sx={{
          overflow: 'auto',
          maxHeight: window.innerHeight - 270,
          padding: 'none',
          border: '1px solid lightgrey',
          px: 0.5
        }}
      >
        {endoSearch === 1 ? (
          <Grid container spacing={0.5} sx={{ flexGrow: 1, py: 0.5 }}>
            <Grid xs={5}>
              <Paper sx={{ bgcolor: 'white' }}>
                <Box
                  sx={{
                    fontSize: 12,
                    textTransform: 'uppercase',
                    py: 0.5,
                    fontWeight: 650,
                    pl: 1,
                    color: '#555830',
                    bgcolor: '#E4E5E8'
                  }}
                >
                  Number Of Reporting Errors per 1000 Investigations
                </Box>
                <Box>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', pt: 0.5 }}>
                        <Box sx={{ flex: 1.5, p: 0.2 }}>
                          <Typography sx={{ fontSize: 13, pl: 2 }}>Total Number Of Reporting Errors</Typography>
                        </Box>
                        <Box
                          sx={{
                            flex: 0.1,
                            p: 0.2,
                            fontWeight: 650,
                            display: 'flex',
                            justifyContent: 'flex-end'
                          }}
                        >
                          :
                        </Box>
                        <Box sx={{ flex: 0.3, p: 0.2 }}>
                          <Typography sx={{ fontSize: 13, pt: 0.1 }}>{totalError}</Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex' }}>
                        <Box sx={{ flex: 1.5, p: 0.2 }}>
                          <Typography sx={{ fontSize: 13, pl: 2 }}>Total Number Of Tests Performed</Typography>
                        </Box>
                        <Box
                          sx={{
                            flex: 0.1,
                            p: 0.2,
                            fontWeight: 650,
                            display: 'flex',
                            justifyContent: 'flex-end'
                          }}
                        >
                          :
                        </Box>
                        <Box sx={{ flex: 0.3, p: 0.2 }}>
                          <Typography sx={{ fontSize: 13, pt: 0.1 }}>{totalTest}</Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex' }}>
                        <Box sx={{ flex: 1.5, p: 0.2 }}>
                          <Typography sx={{ fontSize: 13, pl: 2 }}>Result</Typography>
                        </Box>
                        <Box
                          sx={{
                            flex: 0.1,
                            p: 0.2,
                            fontWeight: 650,
                            display: 'flex',
                            justifyContent: 'flex-end'
                          }}
                        >
                          :
                        </Box>
                        <Box sx={{ flex: 0.3, p: 0.2 }}>
                          <CssVarsProvider>
                            {errorResult > 2.3 ? (
                              <Typography size="md" sx={{ color: '#bf360c', fontSize: 14, pt: 0.1 }}>
                                {errorResult}
                              </Typography>
                            ) : (
                              <Typography size="md" sx={{ color: '#32CD30', fontSize: 14, pt: 0.1 }}>
                                {errorResult}
                              </Typography>
                            )}
                          </CssVarsProvider>
                        </Box>
                      </Box>
                    </Box>
                    <Box sx={{ flex: 0.1, pt: 4, pr: 1 }}>
                      <CssVarsProvider>
                        <Button
                          variant="outlined"
                          color="neutral"
                          size="sm"
                          sx={{
                            height: 30,
                            width: 100,
                            display: 'flex',
                            justifyContent: 'flex-start',
                            borderRadius: 7
                          }}
                          startDecorator={
                            <ErrorOutlineOutlinedIcon
                              sx={{ color: '#E55B13', cursor: 'pointer', height: 20, width: 20 }}
                              fontSize="large"
                            />
                          }
                          onClick={ViewErrorDetails}
                        >
                          View
                        </Button>
                      </CssVarsProvider>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', pr: 2 }}>
                    <Typography sx={{ color: 'darkred', fontSize: 10 }}>* BenchMark Value is 2.3</Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
            <Grid xs={7}>
              <Paper sx={{ bgcolor: 'white' }}>
                <Box
                  sx={{
                    fontSize: 12,
                    textTransform: 'uppercase',
                    py: 0.5,
                    fontWeight: 650,
                    pl: 1,
                    color: '#555830',
                    bgcolor: '#E4E5E8'
                  }}
                >
                  Percentage Of Re dos
                </Box>
                <Box>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', pt: 0.5 }}>
                        <Box sx={{ flex: 1.5, p: 0.2 }}>
                          <Typography sx={{ fontSize: 13, pl: 2 }}>Total Number Of Re dos</Typography>
                        </Box>
                        <Box
                          sx={{
                            flex: 0.1,
                            p: 0.2,
                            fontWeight: 650,
                            display: 'flex',
                            justifyContent: 'flex-end'
                          }}
                        >
                          :
                        </Box>
                        <Box sx={{ flex: 0.2, p: 0.2 }}>
                          <Typography sx={{ fontSize: 13, pt: 0.1 }}>{totalRedos}</Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex' }}>
                        <Box sx={{ flex: 1.5, p: 0.2 }}>
                          <Typography sx={{ fontSize: 13, pl: 2 }}>Total Number Of Tests Performed</Typography>
                        </Box>
                        <Box
                          sx={{
                            flex: 0.1,
                            p: 0.2,
                            fontWeight: 650,
                            display: 'flex',
                            justifyContent: 'flex-end'
                          }}
                        >
                          :
                        </Box>
                        <Box sx={{ flex: 0.2, p: 0.2 }}>
                          <Typography sx={{ fontSize: 13, pt: 0.1 }}>{totalTest}</Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex' }}>
                        <Box sx={{ flex: 1.5, p: 0.2 }}>
                          <Typography sx={{ fontSize: 13, pl: 2 }}>Result</Typography>
                        </Box>
                        <Box
                          sx={{
                            flex: 0.1,
                            p: 0.2,
                            fontWeight: 650,
                            display: 'flex',
                            justifyContent: 'flex-end'
                          }}
                        >
                          :
                        </Box>
                        <Box sx={{ flex: 0.2, p: 0.2 }}>
                          <CssVarsProvider>
                            {redosResult > 0 ? (
                              <Typography size="md" sx={{ color: '#bf360c', fontSize: 14, pt: 0.1 }}>
                                {redosResult}
                              </Typography>
                            ) : (
                              <Typography size="md" sx={{ color: '#32CD30', fontSize: 14, pt: 0.1 }}>
                                {redosResult}
                              </Typography>
                            )}
                          </CssVarsProvider>
                        </Box>
                      </Box>
                    </Box>
                    <Box sx={{ flex: 0.1, pt: 4, pr: 1 }}>
                      <CssVarsProvider>
                        <Button
                          variant="outlined"
                          color="neutral"
                          size="sm"
                          sx={{
                            height: 30,
                            width: 100,
                            display: 'flex',
                            justifyContent: 'flex-start',
                            borderRadius: 7
                          }}
                          startDecorator={
                            <VaccinesIcon
                              sx={{ color: '#778A35', cursor: 'pointer', height: 20, width: 20 }}
                              fontSize="large"
                            />
                          }
                          onClick={ViewRedosDetails}
                        >
                          View
                        </Button>
                      </CssVarsProvider>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', pr: 2 }}>
                    <Typography sx={{ color: 'darkred', fontSize: 10 }}>* BenchMark Value is 0</Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
            <Grid xs={7}>
              <Paper sx={{ bgcolor: 'white' }}>
                <Box
                  sx={{
                    fontSize: 12,
                    textTransform: 'uppercase',
                    py: 0.5,
                    fontWeight: 650,
                    pl: 1,
                    color: '#555830',
                    bgcolor: '#E4E5E8'
                  }}
                >
                  Waiting time for services (a) Diagnostics
                </Box>
                <Box>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', pt: 0.5 }}>
                        <Box sx={{ flex: 1.5, p: 0.2 }}>
                          <Typography sx={{ fontSize: 13, pl: 2 }}>Total Sum Of Time</Typography>
                        </Box>
                        <Box
                          sx={{
                            flex: 0.1,
                            p: 0.2,
                            fontWeight: 650,
                            display: 'flex',
                            justifyContent: 'flex-end'
                          }}
                        >
                          :
                        </Box>
                        <Box sx={{ flex: 0.2, p: 0.2 }}>
                          <Typography sx={{ fontSize: 13, pt: 0.1 }}>{totalTime} min </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex' }}>
                        <Box sx={{ flex: 1.5, p: 0.2 }}>
                          <Typography sx={{ fontSize: 13, pl: 2 }}>Total Number Of Patients Reported</Typography>
                        </Box>
                        <Box
                          sx={{
                            flex: 0.1,
                            p: 0.2,
                            fontWeight: 650,
                            display: 'flex',
                            justifyContent: 'flex-end'
                          }}
                        >
                          :
                        </Box>
                        <Box sx={{ flex: 0.2, p: 0.2 }}>
                          <Typography sx={{ fontSize: 13, pt: 0.1 }}>{totalPat}</Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex' }}>
                        <Box sx={{ flex: 1.5, p: 0.2 }}>
                          <Typography sx={{ fontSize: 13, pl: 2 }}>Result</Typography>
                        </Box>
                        <Box
                          sx={{
                            flex: 0.1,
                            p: 0.2,
                            fontWeight: 650,
                            display: 'flex',
                            justifyContent: 'flex-end'
                          }}
                        >
                          :
                        </Box>
                        <Box sx={{ flex: 0.2, p: 0.2 }}>
                          <CssVarsProvider>
                            {timeResult > 10 ? (
                              <Typography size="md" sx={{ color: '#bf360c', fontSize: 14, pt: 0.1 }}>
                                {timeResult}
                              </Typography>
                            ) : (
                              <Typography size="md" sx={{ color: '#32CD30', fontSize: 14, pt: 0.1 }}>
                                {timeResult}
                              </Typography>
                            )}
                          </CssVarsProvider>
                        </Box>
                      </Box>
                    </Box>
                    <Box sx={{ flex: 0.1, pt: 4, pr: 1 }}>
                      <CssVarsProvider>
                        <Tooltip title="Time Exceedence Patients Report" placement="bottom">
                          <Button
                            variant="outlined"
                            color="neutral"
                            size="sm"
                            sx={{
                              height: 30,
                              width: 100,
                              display: 'flex',
                              justifyContent: 'flex-start',
                              borderRadius: 7
                            }}
                            startDecorator={
                              <TimerOutlinedIcon
                                sx={{ color: '#827717', cursor: 'pointer', height: 20, width: 20 }}
                                fontSize="large"
                              />
                            }
                            onClick={ViewWaitingTimeDetails}
                          >
                            View
                          </Button>
                        </Tooltip>
                      </CssVarsProvider>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', pr: 2 }}>
                    <Typography sx={{ color: 'darkred', fontSize: 10 }}>* BenchMark Value is 10 min</Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
            <Grid xs={5}>
              <Paper sx={{ bgcolor: 'white' }}>
                <Box
                  sx={{
                    fontSize: 12,
                    textTransform: 'uppercase',
                    py: 0.5,
                    fontWeight: 650,
                    pl: 1,
                    color: '#555830',
                    bgcolor: '#E4E5E8'
                  }}
                >
                  Incidence Of Patient Identification Errors
                </Box>
                <Box>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', pt: 0.5 }}>
                        <Box sx={{ flex: 1.5, p: 0.2 }}>
                          <Typography sx={{ fontSize: 13, pl: 2 }}>
                            Total Number Of Patient Identification Errors
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            flex: 0.1,
                            p: 0.2,
                            fontWeight: 650,
                            display: 'flex',
                            justifyContent: 'flex-end'
                          }}
                        >
                          :
                        </Box>
                        <Box sx={{ flex: 0.3, p: 0.2 }}>
                          <Typography sx={{ fontSize: 13, pt: 0.1 }}>{totalIdentifctn}</Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex' }}>
                        <Box sx={{ flex: 1.5, p: 0.2 }}>
                          <Typography sx={{ fontSize: 13, pl: 2 }}>Total Number Of Patients</Typography>
                        </Box>
                        <Box
                          sx={{
                            flex: 0.1,
                            p: 0.2,
                            fontWeight: 650,
                            display: 'flex',
                            justifyContent: 'flex-end'
                          }}
                        >
                          :
                        </Box>
                        <Box sx={{ flex: 0.3, p: 0.2 }}>
                          <Typography sx={{ fontSize: 13, pt: 0.1 }}>{totalPat}</Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex' }}>
                        <Box sx={{ flex: 1.5, p: 0.2 }}>
                          <Typography sx={{ fontSize: 13, pl: 2 }}>Result</Typography>
                        </Box>
                        <Box
                          sx={{
                            flex: 0.1,
                            p: 0.2,
                            fontWeight: 650,
                            display: 'flex',
                            justifyContent: 'flex-end'
                          }}
                        >
                          :
                        </Box>
                        <Box sx={{ flex: 0.3, p: 0.2 }}>
                          <CssVarsProvider>
                            {idetifctionResult > 0 ? (
                              <Typography size="md" sx={{ color: '#bf360c', fontSize: 14, pt: 0.1 }}>
                                {idetifctionResult}
                              </Typography>
                            ) : (
                              <Typography size="md" sx={{ color: '#32CD30', fontSize: 14, pt: 0.1 }}>
                                {idetifctionResult}
                              </Typography>
                            )}
                          </CssVarsProvider>
                        </Box>
                      </Box>
                    </Box>
                    <Box sx={{ flex: 0.1, pt: 4, pr: 1 }}>
                      <CssVarsProvider>
                        <Button
                          variant="outlined"
                          color="neutral"
                          size="sm"
                          sx={{
                            height: 30,
                            width: 100,
                            display: 'flex',
                            justifyContent: 'flex-start',
                            borderRadius: 7
                          }}
                          startDecorator={
                            <ReportGmailerrorredOutlinedIcon
                              sx={{ color: '#E55B13', cursor: 'pointer', height: 20, width: 20 }}
                              fontSize="large"
                            />
                          }
                          onClick={ViewIdentifictionErrorDetails}
                        >
                          View
                        </Button>
                      </CssVarsProvider>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', pr: 2 }}>
                    <Typography sx={{ color: 'darkred', fontSize: 10 }}>* BenchMark Value is 0</Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
            <Grid xs={5}>
              <Paper sx={{ bgcolor: 'white' }}>
                <Box
                  sx={{
                    fontSize: 12,
                    textTransform: 'uppercase',
                    py: 0.5,
                    fontWeight: 650,
                    pl: 1,
                    color: '#555830',
                    bgcolor: '#E4E5E8'
                  }}
                >
                  Incidence Of Falls
                </Box>
                <Box>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', pt: 0.5 }}>
                        <Box sx={{ flex: 1.5, p: 0.2 }}>
                          <Typography sx={{ fontSize: 13, pl: 2 }}>Total Number Of Falls</Typography>
                        </Box>
                        <Box
                          sx={{
                            flex: 0.1,
                            p: 0.2,
                            fontWeight: 650,
                            display: 'flex',
                            justifyContent: 'flex-end'
                          }}
                        >
                          :
                        </Box>
                        <Box sx={{ flex: 0.3, p: 0.2 }}>
                          <Typography sx={{ fontSize: 13, pt: 0.1 }}>{totalFalls}</Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex' }}>
                        <Box sx={{ flex: 1.5, p: 0.2 }}>
                          <Typography sx={{ fontSize: 13, pl: 2 }}>Total Number Of Patient Days</Typography>
                        </Box>
                        <Box
                          sx={{
                            flex: 0.1,
                            p: 0.2,
                            fontWeight: 650,
                            display: 'flex',
                            justifyContent: 'flex-end'
                          }}
                        >
                          :
                        </Box>
                        <Box sx={{ flex: 0.3, p: 0.2 }}>
                          <Typography sx={{ fontSize: 13, pt: 0.1 }}>{totalPat}</Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex' }}>
                        <Box sx={{ flex: 1.5, p: 0.2 }}>
                          <Typography sx={{ fontSize: 13, pl: 2 }}>Result</Typography>
                        </Box>
                        <Box
                          sx={{
                            flex: 0.1,
                            p: 0.2,
                            fontWeight: 650,
                            display: 'flex',
                            justifyContent: 'flex-end'
                          }}
                        >
                          :
                        </Box>
                        <Box sx={{ flex: 0.3, p: 0.2 }}>
                          <CssVarsProvider>
                            {fallsResult > 0 ? (
                              <Typography size="md" sx={{ color: '#bf360c', fontSize: 14, pt: 0.1 }}>
                                {fallsResult}
                              </Typography>
                            ) : (
                              <Typography size="md" sx={{ color: '#32CD30', fontSize: 14, pt: 0.1 }}>
                                {fallsResult}
                              </Typography>
                            )}
                          </CssVarsProvider>
                        </Box>
                      </Box>
                    </Box>
                    <Box sx={{ flex: 0.1, pt: 4, pr: 1 }}>
                      <CssVarsProvider>
                        <Button
                          variant="outlined"
                          color="neutral"
                          size="sm"
                          sx={{
                            height: 30,
                            width: 100,
                            display: 'flex',
                            justifyContent: 'flex-start',
                            borderRadius: 7
                          }}
                          startDecorator={
                            <FmdBadOutlinedIcon
                              sx={{ color: '#E55B13', cursor: 'pointer', height: 20, width: 20 }}
                              fontSize="large"
                            />
                          }
                          onClick={ViewFallsDetails}
                        >
                          View
                        </Button>
                      </CssVarsProvider>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', pr: 2 }}>
                    <Typography sx={{ color: 'darkred', fontSize: 10 }}>* BenchMark Value is 0</Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
            <Grid xs={7}>
              <Paper sx={{ bgcolor: 'white' }}>
                <Box
                  sx={{
                    fontSize: 12,
                    textTransform: 'uppercase',
                    py: 0.5,
                    fontWeight: 650,
                    pl: 1,
                    color: '#555830',
                    bgcolor: '#E4E5E8'
                  }}
                >
                  Percentage Of Near Misses
                </Box>
                <Box>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', pt: 0.5 }}>
                        <Box sx={{ flex: 1.5, p: 0.2 }}>
                          <Typography sx={{ fontSize: 13, pl: 2 }}>Total Number Of Near Misses Reported</Typography>
                        </Box>
                        <Box
                          sx={{
                            flex: 0.1,
                            p: 0.2,
                            fontWeight: 650,
                            display: 'flex',
                            justifyContent: 'flex-end'
                          }}
                        >
                          :
                        </Box>
                        <Box sx={{ flex: 0.2, p: 0.2 }}>
                          <Typography sx={{ fontSize: 13, pt: 0.1 }}>{totalNearMisses}</Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex' }}>
                        <Box sx={{ flex: 1.5, p: 0.2 }}>
                          <Typography sx={{ fontSize: 13, pl: 2 }}>Total Number Of Incidents Reported</Typography>
                        </Box>
                        <Box
                          sx={{
                            flex: 0.1,
                            p: 0.2,
                            fontWeight: 650,
                            display: 'flex',
                            justifyContent: 'flex-end'
                          }}
                        >
                          :
                        </Box>
                        <Box sx={{ flex: 0.2, p: 0.2 }}>
                          <Typography sx={{ fontSize: 13, pt: 0.1 }}>{totIncidentReported}</Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex' }}>
                        <Box sx={{ flex: 1.5, p: 0.2 }}>
                          <Typography sx={{ fontSize: 13, pl: 2 }}>Result</Typography>
                        </Box>
                        <Box
                          sx={{
                            flex: 0.1,
                            p: 0.2,
                            fontWeight: 650,
                            display: 'flex',
                            justifyContent: 'flex-end'
                          }}
                        >
                          :
                        </Box>
                        <Box sx={{ flex: 0.2, p: 0.2 }}>
                          <CssVarsProvider>
                            {nearMissessResult > 100 ? (
                              <Typography size="md" sx={{ color: '#bf360c', fontSize: 14, pt: 0.1 }}>
                                {nearMissessResult}
                              </Typography>
                            ) : (
                              <Typography size="md" sx={{ color: '#32CD30', fontSize: 14, pt: 0.1 }}>
                                {nearMissessResult}
                              </Typography>
                            )}
                          </CssVarsProvider>
                        </Box>
                      </Box>
                    </Box>
                    <Box sx={{ flex: 0.1, pt: 4, pr: 1 }}>
                      <CssVarsProvider>
                        <Button
                          variant="outlined"
                          color="neutral"
                          size="sm"
                          sx={{
                            height: 30,
                            width: 100,
                            display: 'flex',
                            justifyContent: 'flex-start',
                            borderRadius: 7
                          }}
                          startDecorator={
                            <NearbyErrorIcon
                              sx={{ color: '#E55B13', cursor: 'pointer', height: 20, width: 20 }}
                              fontSize="large"
                            />
                          }
                          onClick={ViewNearMissessDetails}
                        >
                          View
                        </Button>
                      </CssVarsProvider>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', pr: 2 }}>
                    <Typography sx={{ color: 'darkred', fontSize: 10 }}>* BenchMark Value is 100</Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
            <Grid xs={7}>
              <Paper sx={{ bgcolor: 'white' }}>
                <Box
                  sx={{
                    fontSize: 12,
                    textTransform: 'uppercase',
                    py: 0.5,
                    fontWeight: 650,
                    pl: 1,
                    color: '#555830',
                    bgcolor: '#E4E5E8'
                  }}
                >
                  Number Of Sentinel events Reported, Collected And Analysed within the defined Time Frame
                </Box>
                <Box>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    <Box sx={{ flex: 1.5 }}>
                      <Box sx={{ display: 'flex', pt: 0.5 }}>
                        <Box sx={{ flex: 1.5, p: 0.2 }}>
                          <Typography sx={{ fontSize: 13, pl: 2 }}>
                            Total Number Of Sentinel Events Analyzed within the Defined Time Frame
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            flex: 0.1,
                            p: 0.2,
                            fontWeight: 650,
                            display: 'flex',
                            justifyContent: 'flex-end'
                          }}
                        >
                          :
                        </Box>
                        <Box sx={{ flex: 0.2, p: 0.2 }}>
                          <Typography sx={{ fontSize: 13, pt: 0.1 }}>{totalSentinelAnalysed}</Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex' }}>
                        <Box sx={{ flex: 1.5, p: 0.2 }}>
                          <Typography sx={{ fontSize: 13, pl: 2 }}>
                            Total Number Of Sentinel Event Reported /Collected
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            flex: 0.1,
                            p: 0.2,
                            fontWeight: 650,
                            display: 'flex',
                            justifyContent: 'flex-end'
                          }}
                        >
                          :
                        </Box>
                        <Box sx={{ flex: 0.2, p: 0.2 }}>
                          <Typography sx={{ fontSize: 13, pt: 0.1 }}>{totalSentinel}</Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex' }}>
                        <Box sx={{ flex: 1.5, p: 0.2 }}>
                          <Typography sx={{ fontSize: 13, pl: 2 }}>Result</Typography>
                        </Box>
                        <Box
                          sx={{
                            flex: 0.1,
                            p: 0.2,
                            fontWeight: 650,
                            display: 'flex',
                            justifyContent: 'flex-end'
                          }}
                        >
                          :
                        </Box>
                        <Box sx={{ flex: 0.2, p: 0.2 }}>
                          <CssVarsProvider>
                            {sentinelResult > 0 ? (
                              <Typography size="md" sx={{ color: '#bf360c', fontSize: 14, pt: 0.1 }}>
                                {sentinelResult}
                              </Typography>
                            ) : (
                              <Typography size="md" sx={{ color: '#32CD30', fontSize: 14, pt: 0.1 }}>
                                {sentinelResult}
                              </Typography>
                            )}
                          </CssVarsProvider>
                        </Box>
                      </Box>
                    </Box>
                    <Box sx={{ flex: 0.1, pt: 4, pr: 2 }}>
                      <CssVarsProvider>
                        <Button
                          variant="outlined"
                          color="neutral"
                          size="sm"
                          sx={{
                            height: 30,
                            width: 100,
                            display: 'flex',
                            justifyContent: 'flex-start',
                            borderRadius: 7
                          }}
                          startDecorator={
                            <RunningWithErrorsOutlinedIcon
                              sx={{ color: '#E55B13', cursor: 'pointer', height: 20, width: 20 }}
                              fontSize="large"
                            />
                          }
                          onClick={ViewSentinelDetails}
                        >
                          View
                        </Button>
                      </CssVarsProvider>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', pr: 2 }}>
                    <Typography sx={{ color: 'darkred', fontSize: 10 }}>* BenchMark Value is 0</Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
            <Grid xs={5}>
              <Paper sx={{ bgcolor: 'white' }}>
                <Box
                  sx={{
                    fontSize: 12,
                    textTransform: 'uppercase',
                    py: 0.5,
                    fontWeight: 650,
                    pl: 1,
                    color: '#555830',
                    bgcolor: '#E4E5E8'
                  }}
                >
                  Equipment Utilization
                </Box>
                <Box>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    <Box sx={{ flex: 1.5 }}>
                      <Box sx={{ display: 'flex', pt: 0.5 }}>
                        <Box sx={{ flex: 1.5, p: 0.2 }}>
                          <Typography sx={{ fontSize: 13, pl: 2 }}>Number of Equipment Utilized Days</Typography>
                        </Box>
                        <Box
                          sx={{
                            flex: 0.1,
                            p: 0.2,
                            fontWeight: 650,
                            display: 'flex',
                            justifyContent: 'flex-end'
                          }}
                        >
                          :
                        </Box>
                        <Box sx={{ flex: 0.3, p: 0.2 }}>
                          <Typography sx={{ fontSize: 13, pt: 0.1 }}>{totEquipTime} hr</Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex' }}>
                        <Box sx={{ flex: 1.5, p: 0.2 }}>
                          <Typography sx={{ fontSize: 13, pl: 2 }}>Equipment Days Available</Typography>
                        </Box>
                        <Box
                          sx={{
                            flex: 0.1,
                            p: 0.2,
                            fontWeight: 650,
                            display: 'flex',
                            justifyContent: 'flex-end'
                          }}
                        >
                          :
                        </Box>
                        <Box sx={{ flex: 0.3, p: 0.2 }}>
                          <Typography sx={{ fontSize: 13, pt: 0.1 }}>{totEquipAvailable}</Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex' }}>
                        <Box sx={{ flex: 1.5, p: 0.2 }}>
                          <Typography sx={{ fontSize: 13, pl: 2 }}>Result</Typography>
                        </Box>
                        <Box
                          sx={{
                            flex: 0.1,
                            p: 0.2,
                            fontWeight: 650,
                            display: 'flex',
                            justifyContent: 'flex-end'
                          }}
                        >
                          :
                        </Box>
                        <Box sx={{ flex: 0.3, p: 0.2 }}>
                          <CssVarsProvider>
                            <Typography size="md" sx={{ color: '#32CD30', fontSize: 14, pt: 0.1 }}>
                              {equipResult} %
                            </Typography>
                          </CssVarsProvider>
                        </Box>
                      </Box>
                    </Box>
                    <Box sx={{ flex: 0.1, pt: 4, pr: 2 }}>
                      <CssVarsProvider>
                        <Button
                          disabled
                          color="danger"
                          variant="plain"
                          sx={{
                            height: 30,
                            width: 100,
                            display: 'flex',
                            justifyContent: 'flex-start'
                          }}
                        ></Button>
                      </CssVarsProvider>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', pr: 2 }}>
                    <Typography sx={{ color: 'darkred', fontSize: 10 }}>* BenchMark Value is 0</Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
            {inchrgStatus === 1 ? (
              <Grid xs={12} sx={{}}>
                <Paper sx={{ bgcolor: 'white' }}>
                  <Box sx={{ flex: 1 }}>
                    <Box
                      sx={{
                        fontSize: 16,
                        pl: 1,
                        color: '#555830',
                        fontWeight: 550,
                        bgcolor: '#E4E5E8',
                        py: 0.5
                      }}
                    >
                      Incharge Approved Status
                    </Box>
                    <Box sx={{ pt: 0.5, px: 1 }}>
                      <CssVarsProvider>
                        <Textarea
                          readOnly
                          minRows={3}
                          maxRows={3}
                          type="text"
                          size="sm"
                          name="inchrgRemarks"
                          value={inchrgRemarks}
                        />
                      </CssVarsProvider>
                    </Box>
                    <Box sx={{ display: 'flex', py: 1, flexWrap: 'wrap' }}>
                      <Box sx={{ fontSize: 16, pl: 2, color: '#555830', fontWeight: 550, pr: 1.5 }}>Approved By:</Box>
                      <Box sx={{ pr: 1.5, pt: 0.3 }}>
                        <Typography sx={{ fontSize: 13, color: '#555830' }}>{inchrgeName}</Typography>
                      </Box>
                      <Box sx={{ fontSize: 16, pl: 1, color: '#555830', fontWeight: 550, pr: 1.5 }}>
                        Approved Date :
                      </Box>
                      <Box sx={{ pr: 1.5, pt: 0.2 }}>
                        <Typography sx={{ fontSize: 13, color: '#555830' }}>
                          {format(new Date(inchrgDate), 'dd-MM-yyyy hh:mm:ss a')}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            ) : null}
            <Grid xs={12} sx={{}}>
              <Paper sx={{ bgcolor: 'white' }}>
                <Box sx={{ flex: 1 }}>
                  <Box
                    sx={{
                      fontSize: 16,
                      pl: 1,
                      color: '#555830',
                      fontWeight: 550,
                      bgcolor: '#E4E5E8',
                      py: 0.5
                    }}
                  >
                    Remarks by Quality Indicator Submitting HOD
                  </Box>
                  <Box sx={{ pt: 0.5, px: 1 }}>
                    <CssVarsProvider>
                      {hodStatus === 0 ? (
                        <Textarea
                          minRows={3}
                          maxRows={4}
                          placeholder="type here..."
                          type="text"
                          size="sm"
                          name="remarks"
                          value={remarks}
                          onChange={e => setRemarks(e.target.value)}
                        />
                      ) : (
                        <Textarea
                          readOnly
                          minRows={3}
                          maxRows={4}
                          placeholder="type here..."
                          type="text"
                          size="sm"
                          name="remarks"
                          value={remarks}
                          onChange={e => setRemarks(e.target.value)}
                        />
                      )}
                    </CssVarsProvider>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                  {hodStatus === 1 ? (
                    <>
                      <Box
                        sx={{
                          fontSize: 16,
                          pl: 1,
                          color: '#555830',
                          fontWeight: 550,
                          pr: 1.5,
                          pt: 1.8
                        }}
                      >
                        Approved By:
                      </Box>
                      <Box sx={{ pr: 1.5, pt: 2 }}>
                        <Typography sx={{ fontSize: 13, color: '#555830' }}>{empName}</Typography>
                      </Box>
                      <Box
                        sx={{
                          fontSize: 16,
                          pl: 1,
                          color: '#555830',
                          fontWeight: 550,
                          pr: 1.5,
                          pt: 1.8
                        }}
                      >
                        Approved Date :
                      </Box>
                      <Box sx={{ pr: 1.5, pt: 2 }}>
                        <Typography sx={{ fontSize: 13, color: '#555830' }}>
                          {format(new Date(lastApprvdDate), 'dd-MM-yyyy hh:mm:ss a')}
                        </Typography>
                      </Box>
                    </>
                  ) : null}
                  <Box sx={{ py: 1, pr: 2 }}>
                    <CssVarsProvider>
                      {hodStatus === 0 ? (
                        <Button
                          variant="outlined"
                          color="neutral"
                          size="sm"
                          sx={{
                            height: 30,
                            width: 120,
                            display: 'flex',
                            justifyContent: 'flex-start',
                            borderRadius: 7
                          }}
                          startDecorator={
                            <SaveIcon
                              sx={{ color: '#0E86D4', cursor: 'pointer', height: 20, width: 20 }}
                              fontSize="large"
                            />
                          }
                          onClick={SaveDetails}
                        >
                          Approve
                        </Button>
                      ) : (
                        <Button
                          variant="outlined"
                          color="neutral"
                          size="sm"
                          disabled
                          sx={{
                            height: 30,
                            width: 120,
                            display: 'flex',
                            justifyContent: 'flex-start',
                            borderRadius: 7
                          }}
                          startDecorator={
                            <SaveIcon
                              sx={{ color: '#bbdefb', cursor: 'pointer', height: 20, width: 20 }}
                              fontSize="large"
                            />
                          }
                        >
                          Approved
                        </Button>
                      )}
                    </CssVarsProvider>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        ) : (
          <Box></Box>
        )}
      </Box>
    </Box>
  )
}

export default memo(HodQiapprovalView)
