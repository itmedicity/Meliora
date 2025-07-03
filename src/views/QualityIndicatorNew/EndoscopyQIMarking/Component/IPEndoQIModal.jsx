import { Dialog, DialogContent, Paper } from '@mui/material'
import React, { Fragment, memo, useCallback, useEffect, useMemo, useState } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker, DateTimePicker } from '@mui/x-date-pickers'
import {
  Box,
  Button,
  CssVarsProvider,
  Textarea,
  Typography,
  Checkbox,
  Tooltip,
  Input,
} from '@mui/joy'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import {
  addMinutes,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  format,
  isAfter,
  isBefore,
} from 'date-fns'
import { useDispatch, useSelector } from 'react-redux'
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import { axioslogin } from 'src/views/Axios/Axios'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import IncidentModal from '../../CommonComponents/IncidentModal'
import { getEquipmentList } from 'src/redux/actions/QIEquipment.action'
import QIEquipmentSelect from 'src/views/CommonSelectCode/QIEquipmentSelect'
import QIProcedureSelect from 'src/views/CommonSelectCode/QIProcedureSelect'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import ProcedureEquipmentTable from './ProcedureEquipmentTable'

const IPEndoQIModal = ({
  open,
  handleClose,
  rowSelect,
  count,
  setCount,
  depName,
  qidept,
  setQiflag,
}) => {
  const {
    qi_endo_ip_slno,
    ip_no,
    ipd_date,
    ptno,
    ptname,
    ptsex,
    ptage,
    ptaddrs1,
    ptaddrs3,
    ptmobile,
    doctor_name,
    error_status,
    redo_status,
    incidence_ident_error_status,
    falls_status,
    near_misses_status,
    sentinel_events_status,
  } = rowSelect

  const [errorYes, setErrorYes] = useState(false)
  const [errorNo, setErrorNo] = useState(false)
  const [redosYes, setRedosYes] = useState(false)
  const [redosNo, setRedosNo] = useState(false)
  const [errorIdentyYes, setErrorIdentyYes] = useState(false)
  const [errorIdentyNo, setErrorIdentyNo] = useState(false)
  const [fallsYes, setFallsYes] = useState(false)
  const [fallsNo, setFallsNo] = useState(false)
  const [nearYes, setNearYes] = useState(false)
  const [nearNo, setNearNo] = useState(false)
  const [sentinelYes, setSentinelYes] = useState(false)
  const [sentinelNo, setSentinelNo] = useState(false)
  const [testReqDate, setTestReqDate] = useState(format(new Date(), 'yyyy-MM-dd'))
  const [entryTime, setEntryTime] = useState(format(new Date(), 'yyyy-MM-dd HH:mm:ss'))
  const [assessmentTime, setAssessmentTime] = useState(format(new Date(), 'yyyy-MM-dd HH:mm:ss'))
  const [startTime, setStartTime] = useState(format(new Date(), 'yyyy-MM-dd HH:mm:ss'))
  const [endTime, setEndTime] = useState(format(new Date(), 'yyyy-MM-dd HH:mm:ss'))
  const [reportTime, setReportTime] = useState(format(new Date(), 'yyyy-MM-dd HH:mm:ss'))
  const [despatchTime, setDespatchTime] = useState(format(new Date(), 'yyyy-MM-dd HH:mm:ss'))
  const [sumOfAssesment, setsumOfAssesment] = useState('')
  const [timeGap, setTimeGap] = useState('')
  const [turnaroundTime, setTurnaroundTime] = useState('')
  const [incmodalopen, setIncModalOpen] = useState(false)
  const [incFlag, setIncFlag] = useState(0) // for inident modal open
  const [incidentView, setincidentView] = useState([])
  const [incdExist, setIncdExist] = useState(0) // for to check inident add/update
  const [serviceTime, setServiceTime] = useState(0)
  const [incRegFlag, setIncRegFlag] = useState(0) // for each incident button click value change
  const [benchMarkFlag, setBenchMarkFlag] = useState(0)
  const [incCount, setincCount] = useState(0)
  const [errorDetails, setErrorDetails] = useState('')
  const [errorReason, setErrorReason] = useState('')
  const [errorCorrect, setErrorCorrect] = useState('')
  const [errorPrvnt, setErrorPrvnt] = useState('')
  const [redosDetails, setRedosDetails] = useState('')
  const [redosReason, setRedosReason] = useState('')
  const [redosCoorect, setRedosCoorect] = useState('')
  const [redosPrvnt, setRedosPrvnt] = useState('')
  const [identerrorDetails, setIdenterrorDetails] = useState('')
  const [identerrorReason, setIdenterrorReason] = useState('')
  const [errorIdentAction, setErrorIdentAction] = useState('')
  const [fallsdetails, setFallsdetails] = useState('')
  const [fallsReason, setFallsReason] = useState('')
  const [sentinelDetails, setSentinelDetails] = useState('')
  const [sentinelreason, setSentinelreason] = useState('')
  const [nearMissesDetails, setNearMissesDetails] = useState('')
  const [nearMissessReason, setNearMissessReason] = useState('')
  const [benchMarkReason, setBenchMarkReason] = useState('')
  const [errorType, setErrorType] = useState(0)
  const [redosType, setRedosType] = useState(0)
  const [fallsType, setFallsType] = useState(0)
  const [identType, setIdentType] = useState(0)
  const [nearType, setnearType] = useState(0)
  const [sentinelType, setSentinelType] = useState(0)
  const [equipStartTime, setEquipStartTime] = useState(format(new Date(), 'yyyy-MM-dd HH:mm:ss'))
  const [equipEndTime, setEquipEndTime] = useState(format(new Date(), 'yyyy-MM-dd HH:mm:ss'))
  const [equipment, setEquipment] = useState(0)
  const [procName, setProcName] = useState(0)
  const [procNamedisplay, setProcNamedisplay] = useState('')
  const [equipName, setequipName] = useState('')
  const [procedureList, setProcedureList] = useState([])
  const [sentinelAnalyse, setSentinelAnalyse] = useState(true)
  const [ipOpCheck, setipOpCheck] = useState(0)
  const [ProcedureArray, setProcedureArray] = useState([])
  const [equipmentExit, setequipmentExit] = useState(0)
  const [equipUsedTime, setEquipUsedTime] = useState('')
  // set value 0 for view delete icon set 1 for not view delete icon in report
  const [equipReport, setEquipReport] = useState(0)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getEquipmentList(qidept))
  }, [dispatch, qidept])

  const id = useSelector(state => {
    return state?.LoginUserData.empid
  })
  useEffect(() => {
    if (rowSelect.length !== 0) {
      const {
        test_req_date,
        endo_arrival_time,
        assessment_time,
        proc_start_time,
        proc_end_time,
        report_gene_time,
        report_desp_time,
        error_status,
        error_details,
        error_reason,
        error_corrective,
        error_preventive,
        redo_status,
        redos_reason,
        redos_corrective,
        redos_preventive,
        incidence_ident_error_status,
        incidence_ident_description,
        incidence_ident_action,
        falls_status,
        near_misses_status,
        sentinel_events_status,
        redos_details,
        incidence_ident_reason,
        falls_details,
        falls_reason,
        sentinel_details,
        sentinel_reason,
        nearmisses_details,
        nearmisses_reason,
        initial_assessment_reason,
        error_incident_type,
        redos_incident_type,
        falls_incident_type,
        ident_error_incident_type,
        nearmiss_incident_type,
        sentinel_incident_type,
        sentinel_analysed,
        equip_start_time,
        equip_end_time,
      } = rowSelect
      setErrorYes(error_status === 1 ? true : false)
      setErrorNo(error_status === 0 ? true : false)
      setRedosYes(redo_status === 1 ? true : false)
      setRedosNo(redo_status === 0 ? true : false)
      setErrorIdentyYes(incidence_ident_error_status === 1 ? true : false)
      setErrorIdentyNo(incidence_ident_error_status === 0 ? true : false)
      setFallsYes(falls_status === 1 ? true : false)
      setFallsNo(falls_status === 0 ? true : false)
      setNearYes(near_misses_status === 1 ? true : false)
      setNearNo(near_misses_status === 0 ? true : false)
      setSentinelYes(sentinel_events_status === 1 ? true : false)
      setSentinelNo(sentinel_events_status === 0 ? true : false)
      setSentinelAnalyse(sentinel_analysed === 1 ? true : false)

      setErrorType(error_incident_type)
      setRedosType(redos_incident_type)
      setIdentType(ident_error_incident_type)
      setFallsType(falls_incident_type)
      setSentinelType(sentinel_incident_type)
      setnearType(nearmiss_incident_type)

      setErrorDetails(error_details === null ? '' : error_details)
      setErrorReason(error_reason === null ? '' : error_reason)
      setErrorCorrect(error_corrective === null ? '' : error_corrective)
      setErrorPrvnt(error_preventive === null ? '' : error_preventive)
      setRedosDetails(redos_details === null ? '' : redos_details)
      setRedosReason(redos_reason === null ? '' : redos_reason)
      setRedosCoorect(redos_corrective === null ? '' : redos_corrective)
      setRedosPrvnt(redos_preventive === null ? '' : redos_preventive)
      setIdenterrorDetails(incidence_ident_description === null ? '' : incidence_ident_description)
      setIdenterrorReason(incidence_ident_reason === null ? '' : incidence_ident_reason)
      setErrorIdentAction(incidence_ident_action === null ? '' : incidence_ident_action)
      setFallsdetails(falls_details === null ? '' : falls_details)
      setFallsReason(falls_reason === null ? '' : falls_reason)
      setSentinelDetails(sentinel_details === null ? '' : sentinel_details)
      setSentinelreason(sentinel_reason === null ? '' : sentinel_reason)
      setNearMissesDetails(nearmisses_details === null ? '' : nearmisses_details)
      setNearMissessReason(nearmisses_reason === null ? '' : nearmisses_reason)
      setBenchMarkReason(initial_assessment_reason === null ? '' : initial_assessment_reason)

      setTestReqDate(
        test_req_date === null ? format(new Date(endo_arrival_time), 'yyyy-MM-dd') : test_req_date
      )
      setEntryTime(
        endo_arrival_time === null
          ? format(new Date(endo_arrival_time), 'yyyy-MM-dd HH:mm:ss')
          : endo_arrival_time
      )
      setAssessmentTime(
        assessment_time === null
          ? format(addMinutes(new Date(endo_arrival_time), 10), 'yyyy-MM-dd HH:mm:ss')
          : assessment_time
      )
      setStartTime(
        proc_start_time === null
          ? format(addMinutes(new Date(endo_arrival_time), 15), 'yyyy-MM-dd HH:mm:ss')
          : proc_start_time
      )
      setEndTime(
        proc_end_time === null
          ? format(addMinutes(new Date(endo_arrival_time), 30), 'yyyy-MM-dd HH:mm:ss')
          : proc_end_time
      )
      setReportTime(
        report_gene_time === null
          ? format(addMinutes(new Date(endo_arrival_time), 50), 'yyyy-MM-dd HH:mm:ss')
          : report_gene_time
      )
      setDespatchTime(
        report_desp_time === null
          ? format(addMinutes(new Date(endo_arrival_time), 60), 'yyyy-MM-dd HH:mm:ss')
          : report_desp_time
      )

      setEquipStartTime(
        equip_start_time === null
          ? format(addMinutes(new Date(endo_arrival_time), 15), 'yyyy-MM-dd HH:mm:ss')
          : equip_start_time
      )
      setEquipEndTime(
        equip_end_time === null
          ? format(addMinutes(new Date(endo_arrival_time), 30), 'yyyy-MM-dd HH:mm:ss')
          : equip_end_time
      )
    }
  }, [rowSelect])

  useEffect(() => {
    const getequipDetails = async qi_endo_ip_slno => {
      const result = await axioslogin.get(`/qiendoscopy/ipequip/${qi_endo_ip_slno}`)
      return result.data
    }
    getequipDetails(qi_endo_ip_slno).then(value => {
      const { success, data } = value
      if (success === 1) {
        const newArray = data?.map(val => {
          const proc = JSON?.parse(val?.procedure_names)
          const newData = proc?.find(item => item.PD_CODE === val.PD_CODE)
          return {
            qi_endo_ip_slno: val.qi_endo_ip_slno,
            equip_no: val.equip_no,
            equip_name: val.equip_name,
            PD_CODE: val.PD_CODE,
            PDC_DESC: newData ? newData.PDC_DESC : 'nil',
          }
        })
        setProcedureArray(newArray)
        setequipmentExit(1)
        setEquipReport(0)
      } else {
        setProcedureArray([])
        setequipmentExit(0)
        setEquipReport(0)
      }
    })
  }, [qi_endo_ip_slno])

  const ChangeErrorYes = useCallback(e => {
    if (e.target.checked === true) {
      setErrorYes(true)
      setErrorNo(false)
      infoNotify('If Yes, Register Error As Incident')
    } else {
      setErrorYes(false)
      setErrorNo(true)
    }
  }, [])
  const ChangeErrorNo = useCallback(e => {
    if (e.target.checked === true) {
      setErrorYes(false)
      setErrorNo(true)
    } else {
      setErrorYes(true)
      setErrorNo(false)
    }
  }, [])
  const ChangeRedosYes = useCallback(e => {
    if (e.target.checked === true) {
      setRedosYes(true)
      setRedosNo(false)
      infoNotify('If Yes, Register Redos As Incident')
    } else {
      setRedosYes(false)
      setRedosNo(true)
    }
  }, [])
  const ChangeRedosNo = useCallback(e => {
    if (e.target.checked === true) {
      setRedosYes(false)
      setRedosNo(true)
    } else {
      setRedosYes(true)
      setRedosNo(false)
    }
  }, [])
  const ChangeIdentfyYes = useCallback(e => {
    if (e.target.checked === true) {
      setErrorIdentyYes(true)
      setErrorIdentyNo(false)
      infoNotify('If Yes, Register  Patient Identification Error As Incident')
    } else {
      setErrorIdentyYes(false)
      setErrorIdentyNo(true)
    }
  }, [])
  const ChangeIdentfyNo = useCallback(e => {
    if (e.target.checked === true) {
      setErrorIdentyYes(false)
      setErrorIdentyNo(true)
    } else {
      setErrorIdentyYes(false)
      setErrorIdentyNo(true)
    }
  }, [])
  const ChangeFallsYes = useCallback(e => {
    if (e.target.checked === true) {
      setFallsYes(true)
      setFallsNo(false)
      infoNotify('If Yes, Register Falls As Incident')
    } else {
      setFallsYes(false)
      setFallsNo(true)
    }
  }, [])
  const ChangeFallsNo = useCallback(e => {
    if (e.target.checked === true) {
      setFallsYes(false)
      setFallsNo(true)
    } else {
      setFallsYes(true)
      setFallsNo(false)
    }
  }, [])
  const ChangeNearYes = useCallback(e => {
    if (e.target.checked === true) {
      setNearYes(true)
      setNearNo(false)
      infoNotify('If Yes, Register Near Misses As Incident')
    } else {
      setNearYes(false)
      setNearNo(true)
    }
  }, [])
  const ChangeNearNo = useCallback(e => {
    if (e.target.checked === true) {
      setNearYes(false)
      setNearNo(true)
    } else {
      setNearYes(true)
      setNearNo(false)
    }
  }, [])
  const ChangeSentinelYes = useCallback(e => {
    if (e.target.checked === true) {
      setSentinelYes(true)
      setSentinelNo(false)
      infoNotify('If Yes, Register Sentinel Events As Incident')
    } else {
      setSentinelYes(false)
      setSentinelNo(true)
    }
  }, [])
  const ChangeSentinelNo = useCallback(e => {
    if (e.target.checked === true) {
      setSentinelYes(false)
      setSentinelNo(true)
    } else {
      setSentinelYes(true)
      setSentinelNo(false)
    }
  }, [])

  const ChangeSentinelAnalysed = useCallback(e => {
    if (e.target.checked === true) {
      setSentinelAnalyse(true)
    } else {
      setSentinelAnalyse(false)
    }
  }, [])

  const OnchangeEntryTime = useCallback(
    value => {
      const check = isAfter(new Date(value), new Date(testReqDate))
      if (check === true) {
        setEntryTime(value)
      } else {
        warningNotify('Check the Entry Time')
        // setEntryTime(new Date())
      }
    },
    [testReqDate]
  )
  const OnchangeAssessTime = useCallback(
    value => {
      const check = isAfter(new Date(value), new Date(entryTime))
      if (check === true) {
        setAssessmentTime(value)
      } else {
        warningNotify('Check the Assessment Time')
        // setAssessmentTime(new Date())
      }
    },
    [entryTime]
  )
  const OnchangeProcStartTime = useCallback(
    value => {
      const check = isAfter(new Date(value), new Date(assessmentTime))
      if (check === true) {
        setStartTime(value)
      } else {
        warningNotify('Check the Procedure Start Time')
        // setStartTime(new Date())
      }
    },
    [assessmentTime]
  )

  const OnchangeProcEndTime = useCallback(
    value => {
      const check = isAfter(new Date(value), new Date(startTime))
      if (check === true) {
        setEndTime(value)
      } else {
        warningNotify('Check the Procedure End Time')
        // setEndTime(new Date())
      }
    },
    [startTime]
  )

  const OnchangeGenerateTime = useCallback(
    value => {
      const check = isAfter(new Date(value), new Date(endTime))
      if (check === true) {
        setReportTime(value)
      } else {
        warningNotify('Check the Report Generate Time')
        // setReportTime(new Date())
      }
    },
    [endTime]
  )

  const OnchangeDespatchTime = useCallback(
    value => {
      const check = isAfter(new Date(value), new Date(reportTime))
      if (check === true) {
        setDespatchTime(value)
      } else {
        warningNotify("Check the Despatch Time it's not before Report Generate Time")
        // setDespatchTime(new Date())
      }
    },
    [reportTime]
  )

  const OnchangeEquipStartTime = useCallback(
    value => {
      const check = isBefore(new Date(value), new Date(equipEndTime))
      if (check === true) {
        setEquipStartTime(value)
      } else {
        warningNotify("Check the Start Time it's Not After End Time")
        // setEquipStartTime(new Date())
      }
    },
    [equipEndTime]
  )

  const OnchangeEquipEndTime = useCallback(
    value => {
      const check = isAfter(new Date(value), new Date(equipStartTime))
      if (check === true) {
        setEquipEndTime(value)
      } else {
        warningNotify("Check the End Time it's Not Before Start Time")
        // setEquipEndTime(new Date())
      }
    },
    [equipStartTime]
  )
  useEffect(() => {
    const hours = differenceInHours(new Date(assessmentTime), new Date(entryTime))
    const minutes = differenceInMinutes(new Date(assessmentTime), new Date(entryTime)) % 60
    const seconds = differenceInSeconds(new Date(assessmentTime), new Date(entryTime)) % 60
    setsumOfAssesment(`${hours} hr ${minutes} min ${seconds} sec`)
    // waiting time
    const totMinutes = hours * 60 + minutes
    setServiceTime(totMinutes)
    if (totMinutes > 10) {
      setBenchMarkFlag(1)
    } else {
      setBenchMarkFlag(0)
    }
  }, [assessmentTime, entryTime])

  useEffect(() => {
    const hours = differenceInHours(new Date(despatchTime), new Date(entryTime))
    const minutes = differenceInMinutes(new Date(despatchTime), new Date(entryTime)) % 60
    const seconds = differenceInSeconds(new Date(despatchTime), new Date(entryTime)) % 60
    setTimeGap(`${hours} hr ${minutes} min ${seconds} sec`)
  }, [despatchTime, entryTime])
  useEffect(() => {
    const hours = differenceInHours(new Date(despatchTime), new Date(endTime))
    const minutes = differenceInMinutes(new Date(despatchTime), new Date(endTime)) % 60
    const seconds = differenceInSeconds(new Date(despatchTime), new Date(endTime)) % 60
    setTurnaroundTime(`${hours} hr ${minutes} min ${seconds} sec`)
  }, [despatchTime, endTime])

  useEffect(() => {
    const hours = differenceInHours(new Date(equipEndTime), new Date(equipStartTime))
    const minutes = differenceInMinutes(new Date(equipEndTime), new Date(equipStartTime)) % 60
    const totMinutes = hours * 60 + minutes
    setEquipUsedTime(totMinutes)
  }, [equipEndTime, equipStartTime])

  const reset = useCallback(() => {
    setErrorDetails('')
    setErrorReason('')
    setErrorCorrect('')
    setErrorPrvnt('')
    setRedosDetails('')
    setRedosReason('')
    setRedosCoorect('')
    setRedosPrvnt('')
    setIdenterrorDetails('')
    setIdenterrorReason('')
    setErrorIdentAction('')
    setFallsdetails('')
    setFallsReason('')
    setSentinelDetails('')
    setSentinelreason('')
    setNearMissesDetails('')
    setNearMissessReason('')
    setBenchMarkReason('')
    setErrorYes(false)
    setErrorNo(true)
    setRedosYes(false)
    setRedosNo(true)
    setErrorIdentyYes(false)
    setErrorIdentyNo(true)
    setFallsYes(false)
    setFallsNo(true)
    setNearYes(false)
    setNearNo(true)
    setSentinelYes(false)
    setSentinelNo(true)
    setTestReqDate(format(new Date(), 'yyyy-MM-dd'))
    setEntryTime(format(new Date(), 'yyyy-MM-dd HH:mm:ss'))
    setAssessmentTime(format(new Date(), 'yyyy-MM-dd HH:mm:ss'))
    setStartTime(format(new Date(), 'yyyy-MM-dd HH:mm:ss'))
    setEndTime(format(new Date(), 'yyyy-MM-dd HH:mm:ss'))
    setsumOfAssesment('')
    setReportTime(format(new Date(), 'yyyy-MM-dd HH:mm:ss'))
    setDespatchTime(format(new Date(), 'yyyy-MM-dd HH:mm:ss'))
    setTimeGap('')
    setTurnaroundTime('')
    setBenchMarkFlag(0)
    setincidentView([])
    setEquipStartTime(format(new Date(), 'yyyy-MM-dd HH:mm:ss'))
    setEquipEndTime(format(new Date(), 'yyyy-MM-dd HH:mm:ss'))
    setEquipment(0)
    setProcName(0)
    setErrorType(0)
    setRedosType(0)
    setIdentType(0)
    setFallsType(0)
    setSentinelType(0)
    setnearType(0)
    setSentinelAnalyse(true)
    setQiflag(0)
    handleClose()
  }, [handleClose, setQiflag])

  const patchdata = useMemo(() => {
    return {
      test_req_date: format(new Date(testReqDate), 'yyyy-MM-dd'),
      endo_arrival_time: format(new Date(entryTime), 'yyyy-MM-dd HH:mm:ss'),
      assessment_time: format(new Date(assessmentTime), 'yyyy-MM-dd HH:mm:ss'),
      proc_start_time: format(new Date(startTime), 'yyyy-MM-dd HH:mm:ss'),
      proc_end_time: format(new Date(endTime), 'yyyy-MM-dd HH:mm:ss'),
      report_gene_time: format(new Date(reportTime), 'yyyy-MM-dd HH:mm:ss'),
      report_desp_time: format(new Date(despatchTime), 'yyyy-MM-dd HH:mm:ss'),
      error_corrective: errorCorrect,
      error_preventive: errorPrvnt,
      redos_corrective: redosCoorect,
      redos_preventive: redosPrvnt,
      incidence_ident_action: errorIdentAction,
      qi_save_status: 1,
      edit_user: id,
      sumof_service_time: serviceTime,
      initial_assessment_reason: benchMarkFlag === 1 ? benchMarkReason : '',
      assessment_benchmark_flag: benchMarkFlag,
      equip_no: 0,
      equip_start_time: format(new Date(equipStartTime), 'yyyy-MM-dd HH:mm:ss'),
      equip_end_time: format(new Date(equipEndTime), 'yyyy-MM-dd HH:mm:ss'),
      procedure_name: 0,
      emp_id: id,
      sentinel_analysed: sentinelAnalyse === true ? 1 : 0,
      equip_service_time: equipUsedTime,
      qi_endo_ip_slno: qi_endo_ip_slno,
    }
  }, [
    testReqDate,
    entryTime,
    assessmentTime,
    startTime,
    endTime,
    reportTime,
    despatchTime,
    errorCorrect,
    errorPrvnt,
    redosCoorect,
    redosPrvnt,
    errorIdentAction,
    id,
    serviceTime,
    benchMarkReason,
    benchMarkFlag,
    qi_endo_ip_slno,
    equipStartTime,
    equipEndTime,
    sentinelAnalyse,
    equipUsedTime,
  ])
  const SaveDetails = useCallback(() => {
    if (errorYes === true && errorDetails === '' && errorReason === '') {
      infoNotify('If Yes, Report Error As Incident')
    } else if (redosYes === true && redosDetails === '' && redosReason === '') {
      infoNotify('If Yes,Report Redos As Incident')
    } else if (errorIdentyYes === true && identerrorDetails === '' && identerrorReason === '') {
      infoNotify('If Yes,Report Patient Identification Error As Incident')
    } else if (fallsYes === true && fallsdetails === '' && fallsReason === '') {
      infoNotify('If Yes,Report Incidence Of Falls As Incident')
    } else if (sentinelYes === true && sentinelDetails === '' && sentinelreason === '') {
      infoNotify('If Yes,Report Sentinel Events As Incident')
    } else if (nearYes === true && nearMissesDetails === '' && nearMissessReason === '') {
      infoNotify('If Yes,Report Near Missess As Incident')
    } else if (ProcedureArray.length === 0) {
      infoNotify('Add Equipment and Procedure Details')
    } else if (benchMarkFlag === 1 && (benchMarkReason === '' || benchMarkReason === undefined)) {
      infoNotify('Enter the Reason for Initial Assessment Time Exceedence')
    } else {
      const UpdateData = async patchdata => {
        const result = await axioslogin.patch('/qiendoscopy/ipendoUpdate', patchdata)
        return result.data
      }
      const InsertEquip = async equipData => {
        const result = await axioslogin.post('/qiendoscopy/saveEquip', equipData)
        return result.data
      }
      const deleteequipDetails = async qi_endo_ip_slno => {
        const result = await axioslogin.delete(`/qiendoscopy/ipdelete/${qi_endo_ip_slno}`)
        return result.data
      }
      UpdateData(patchdata).then(value => {
        const { success } = value
        if (success === 1) {
          const equipData = ProcedureArray?.map(val => {
            return {
              qi_slno: 0,
              qi_endo_ip_slno: qi_endo_ip_slno,
              equip_no: val.equip_no,
              procedure_name: val.PD_CODE,
              endo_date: format(new Date(equipStartTime), 'yyyy-MM-dd'),
            }
          })
          if (equipmentExit === 1) {
            deleteequipDetails(qi_endo_ip_slno).then(value => {
              const { success } = value
              if (success === 1) {
                InsertEquip(equipData).then(value => {
                  const { message, success } = value
                  if (success === 1) {
                    succesNotify(message)
                    setCount(count + 1)
                    reset()
                  }
                })
              }
            })
          } else {
            InsertEquip(equipData).then(value => {
              const { message, success } = value
              if (success === 1) {
                succesNotify(message)
                setCount(count + 1)
                reset()
              }
            })
          }
        }
      })
    }
  }, [
    patchdata,
    count,
    setCount,
    benchMarkFlag,
    benchMarkReason,
    errorYes,
    errorDetails,
    errorReason,
    redosYes,
    redosDetails,
    redosReason,
    errorIdentyYes,
    identerrorDetails,
    identerrorReason,
    fallsYes,
    fallsdetails,
    fallsReason,
    sentinelYes,
    sentinelDetails,
    sentinelreason,
    nearYes,
    nearMissesDetails,
    nearMissessReason,
    reset,
    ProcedureArray,
    qi_endo_ip_slno,
    equipmentExit,
    equipStartTime,
  ])
  const ResetDetails = useCallback(() => {
    reset()
  }, [reset])

  useEffect(() => {
    const incidentData = {
      qi_endo_ip_slno: qi_endo_ip_slno,
    }
    const getIncidentDetails = async incidentData => {
      const result = await axioslogin.post('/qiendoscopy/IPIncident', incidentData)
      const { success, data } = result.data
      if (success === 1) {
        setincidentView(data)
      } else {
        setincidentView([])
      }
    }
    getIncidentDetails(incidentData)
  }, [incCount, qi_endo_ip_slno])

  const ErrorIncidentReg = useCallback(() => {
    const { incident_error_slno } = incidentView[0]
    setIncdExist(incident_error_slno)
    setIncFlag(1)
    setIncRegFlag(1)
    setIncModalOpen(true)
    setipOpCheck(1)
  }, [incidentView])
  const RedosIncidentReg = useCallback(() => {
    const { incident_redos_slno } = incidentView[0]
    setIncdExist(incident_redos_slno)
    setIncFlag(1)
    setIncRegFlag(2)
    setIncModalOpen(true)
    setipOpCheck(1)
  }, [incidentView])
  const IdentErrorIncidentReg = useCallback(() => {
    const { incidence_ident_slno } = incidentView[0]
    setIncdExist(incidence_ident_slno)
    setIncFlag(1)
    setIncRegFlag(3)
    setIncModalOpen(true)
    setipOpCheck(1)
  }, [incidentView])
  const FallsIncidentReg = useCallback(() => {
    const { incident_falls_slno } = incidentView[0]
    setIncdExist(incident_falls_slno)
    setIncFlag(1)
    setIncRegFlag(4)
    setIncModalOpen(true)
    setipOpCheck(1)
  }, [incidentView])
  const SentinelIncidentReg = useCallback(() => {
    const { incident_sentinel_slno } = incidentView[0]
    setIncdExist(incident_sentinel_slno)
    setIncFlag(1)
    setIncRegFlag(5)
    setIncModalOpen(true)
    setipOpCheck(1)
  }, [incidentView])
  const NearMissesIncidentReg = useCallback(() => {
    const { incident_nearmisses_slno } = incidentView[0]
    setIncdExist(incident_nearmisses_slno)
    setIncFlag(1)
    setIncRegFlag(6)
    setIncModalOpen(true)
    setipOpCheck(1)
  }, [incidentView])
  const AddProcedures = useCallback(() => {
    if (equipment === 0) {
      infoNotify('Select Equipment')
    } else if (procName === 0) {
      infoNotify('Select Procedure')
    } else {
      const fromdata = {
        equip_no: equipment,
        equip_name: equipName,
        PD_CODE: procName,
        PDC_DESC: procNamedisplay,
      }
      if (ProcedureArray.length === 0) {
        const newArray = [...ProcedureArray, fromdata]
        setProcedureArray(newArray)
      } else {
        const array = ProcedureArray?.filter(value => value.PD_CODE === procName)
        if (array.length === 0) {
          const newArray = [...ProcedureArray, fromdata]
          setProcedureArray(newArray)
        } else {
          infoNotify('Procedure Already Listed')
        }
      }
    }
  }, [equipment, equipName, procName, procNamedisplay, ProcedureArray])
  return (
    <Box>
      {incFlag === 1 ? (
        <IncidentModal
          open={incmodalopen}
          setIncModalOpen={setIncModalOpen}
          depName={depName}
          qidept={qidept}
          endoSlno={qi_endo_ip_slno}
          incCount={incCount}
          setincCount={setincCount}
          incdExist={incdExist}
          incidentView={incidentView}
          errorDetails={errorDetails}
          errorReason={errorReason}
          redosDetails={redosDetails}
          redosReason={redosReason}
          identerrorDetails={identerrorDetails}
          identerrorReason={identerrorReason}
          fallsdetails={fallsdetails}
          fallsReason={fallsReason}
          sentinelDetails={sentinelDetails}
          sentinelreason={sentinelreason}
          nearMissesDetails={nearMissesDetails}
          nearMissessReason={nearMissessReason}
          incRegFlag={incRegFlag}
          setIncFlag={setIncFlag}
          setErrorNo={setErrorNo}
          setRedosNo={setRedosNo}
          setErrorIdentyNo={setErrorIdentyNo}
          setFallsNo={setFallsNo}
          setNearNo={setNearNo}
          setSentinelNo={setSentinelNo}
          setErrorYes={setErrorYes}
          setRedosYes={setRedosYes}
          setErrorIdentyYes={setErrorIdentyYes}
          setFallsYes={setFallsYes}
          setNearYes={setNearYes}
          setSentinelYes={setSentinelYes}
          setIncdExist={setIncdExist}
          setErrorDetails={setErrorDetails}
          setErrorReason={setErrorReason}
          setRedosDetails={setRedosDetails}
          setRedosReason={setRedosReason}
          setIdenterrorDetails={setIdenterrorDetails}
          setIdenterrorReason={setIdenterrorReason}
          setFallsdetails={setFallsdetails}
          setFallsReason={setFallsReason}
          setSentinelDetails={setSentinelDetails}
          setSentinelreason={setSentinelreason}
          setNearMissesDetails={setNearMissesDetails}
          setNearMissessReason={setNearMissessReason}
          patient_arrived_date={ipd_date}
          setErrorType={setErrorType}
          setRedosType={setRedosType}
          setIdentType={setIdentType}
          setFallsType={setFallsType}
          setSentinelType={setSentinelType}
          setnearType={setnearType}
          ipOpCheck={ipOpCheck}
        />
      ) : null}

      <Dialog
        open={open}
        keepMounted
        aria-labelledby="responsive-dialog-title"
        maxWidth="85vw"
        sx={{ display: 'flex', justifyContent: 'center' }}
      >
        <DialogContent
          id="alert-dialog-slide-descriptiona"
          sx={{ width: '85vw', '&::-webkit-scrollbar': { height: 8 } }}
        >
          <Box sx={{ width: '82vw', overflow: 'auto' }}>
            <Paper sx={{ display: 'flex', height: 40, bgcolor: '#b0bec5' }}>
              <Box sx={{ display: 'flex', flex: 1, pt: 0.5 }}>
                <Box sx={{ pt: 0.5, pl: 2 }}>
                  <Typography sx={{ fontSize: 14 }}>{ip_no}</Typography>
                </Box>
                <Box sx={{ pt: 0.5, pl: 2 }}>
                  <Typography sx={{ fontSize: 14 }}>
                    {format(new Date(ipd_date), 'dd-MM-yyyy hh:mm a')}
                  </Typography>
                </Box>
                <Box sx={{ pt: 0.5, pl: 2 }}>
                  <Typography sx={{ fontSize: 14 }}>{ptno}</Typography>
                </Box>
                <Box sx={{ pt: 0.5, pl: 2 }}>
                  <Typography sx={{ fontSize: 14 }}>
                    {ptname
                      .toLowerCase()
                      .split(' ')
                      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(' ')}
                  </Typography>
                </Box>
                <Box sx={{ pt: 0.5, pl: 2 }}>
                  <Typography sx={{ fontSize: 14 }}>
                    {' '}
                    {ptage}/{ptsex}
                  </Typography>
                </Box>
                <Box sx={{ pt: 0.5, pl: 2 }}>
                  <Typography sx={{ fontSize: 14 }}>
                    {ptaddrs1
                      .toLowerCase()
                      .split(' ')
                      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(' ')}
                    {ptaddrs3 === null
                      ? ''
                      : ',' +
                        ptaddrs3
                          .toLowerCase()
                          .split(' ')
                          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                          .join(' ')}
                  </Typography>
                </Box>
                <Box sx={{ pt: 0.5, pl: 2 }}>
                  <Typography sx={{ fontSize: 14 }}>{ptmobile}</Typography>
                </Box>
                <Box sx={{ pt: 0.5, pl: 2 }}>
                  <Typography sx={{ fontSize: 14 }}>
                    {'Dr. ' +
                      doctor_name
                        .toLowerCase()
                        .split(' ')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ')}
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{ display: 'flex', justifyContent: 'flex-end', fontSize: 20, pt: 0.5, pr: 0.2 }}
              >
                <CssVarsProvider>
                  <Tooltip title="Close" placement="bottom" cursor="pointer">
                    <HighlightOffIcon
                      sx={{ cursor: 'pointer', height: 34, width: 34, color: '#546e7a' }}
                      onClick={handleClose}
                    />
                  </Tooltip>
                </CssVarsProvider>
              </Box>
            </Paper>

            <Box sx={{}}>
              <Box sx={{ display: 'flex', pt: 0.5 }}>
                <Box sx={{ flex: 2, pl: 1, pt: 1.3 }}>
                  <Typography sx={{ fontSize: 12, fontWeight: 550, textTransform: 'uppercase' }}>
                    Any Error Reported{' '}
                  </Typography>
                </Box>
                <Box sx={{ pt: 1 }}>:</Box>
                <Box sx={{ flex: 1, display: 'flex', pl: 1 }}>
                  <Box sx={{ pt: 1.2 }}>
                    <CssVarsProvider>
                      {error_status === 1 ? (
                        <Tooltip title="Registered as Incident, so can't Change" placement="bottom">
                          <Checkbox color="neutral" size="md" checked={errorYes} />
                        </Tooltip>
                      ) : (
                        <Checkbox
                          color="primary"
                          size="md"
                          checked={errorYes}
                          onChange={ChangeErrorYes}
                        />
                      )}
                    </CssVarsProvider>
                  </Box>
                  <Box sx={{ pl: 1, pt: 1 }}>
                    <Typography sx={{ fontSize: 16 }}>Yes</Typography>
                  </Box>
                  <Box sx={{ pt: 1.2, pl: 2 }}>
                    <CssVarsProvider>
                      {error_status === 1 ? (
                        <Tooltip title="Registered as Incident, so can't Change" placement="bottom">
                          <Checkbox color="neutral" size="md" checked={errorNo} />
                        </Tooltip>
                      ) : (
                        <Checkbox
                          color="primary"
                          size="md"
                          checked={errorNo}
                          onChange={ChangeErrorNo}
                        />
                      )}
                    </CssVarsProvider>
                  </Box>
                  <Box sx={{ pl: 1, pt: 1 }}>
                    <Typography sx={{ fontSize: 16 }}>No</Typography>
                  </Box>
                  {errorYes === true ? (
                    <Box sx={{ pl: 2, pt: 0.2 }}>
                      <CssVarsProvider>
                        <Button
                          variant="outlined"
                          color="neutral"
                          size="sm"
                          sx={{
                            height: 20,
                            width: 150,
                            display: 'flex',
                            justifyContent: 'flex-start',
                          }}
                          startDecorator={
                            <AddCircleOutlineIcon
                              sx={{ height: 20, width: 20, color: '#970C10', cursor: 'pointer' }}
                              fontSize="large"
                            />
                          }
                          onClick={ErrorIncidentReg}
                        >
                          Incident Reg.
                        </Button>
                      </CssVarsProvider>
                    </Box>
                  ) : null}
                </Box>
              </Box>
              <Box sx={{ pl: 0.2, bgcolor: '#eceff1' }}>
                {errorYes === true ? (
                  <Box>
                    {errorType !== 0 ? (
                      <>
                        <Box sx={{ display: 'flex', pt: 0.5, pl: 0.5 }}>
                          <Box sx={{ pl: 1 }}>
                            <Typography sx={{ fontSize: 11 }}>INCIDENT TYPE</Typography>
                          </Box>
                          <Box sx={{ pl: 2, fontSize: 11 }}>
                            <Typography>: </Typography>
                          </Box>
                          <Box sx={{ pl: 1.5 }}>
                            <Typography sx={{ fontSize: 11, borderRadius: 1 }}>
                              {errorType === 1
                                ? 'GENERAL'
                                : errorType === 2
                                ? 'NEAR MISSESS'
                                : errorType === 3
                                ? 'HARMFUL'
                                : errorType === 4
                                ? 'SENTINEL'
                                : 'Nil'}
                            </Typography>
                          </Box>
                        </Box>
                        <Box sx={{ display: 'flex', px: 0.5 }}>
                          <Box sx={{ flex: 1 }}>
                            <Box sx={{ pl: 1, pt: 0.5 }}>
                              <Typography sx={{ fontSize: 11, textTransform: 'uppercase' }}>
                                Details Of Error
                              </Typography>
                            </Box>
                            <Box>
                              <CssVarsProvider>
                                <Textarea
                                  readOnly
                                  minRows={3}
                                  maxRows={3}
                                  placeholder="Details Of Error"
                                  required
                                  type="text"
                                  size="sm"
                                  name="errorDetails"
                                  value={errorDetails}
                                  onChange={e => setErrorDetails(e.target.value)}
                                />
                              </CssVarsProvider>
                            </Box>
                          </Box>
                          <Box sx={{ flex: 1, pl: 0.3 }}>
                            <Box sx={{ pl: 1, pt: 0.5 }}>
                              <Typography sx={{ fontSize: 11, textTransform: 'uppercase' }}>
                                Reason Of Error
                              </Typography>
                            </Box>
                            <Box>
                              <CssVarsProvider>
                                <Textarea
                                  readOnly
                                  minRows={3}
                                  maxRows={3}
                                  placeholder="Reason Of Error"
                                  type="text"
                                  size="sm"
                                  name="errorReason"
                                  value={errorReason}
                                  onChange={e => setErrorReason(e.target.value)}
                                />
                              </CssVarsProvider>
                            </Box>
                          </Box>
                          <Box sx={{ flex: 1, pl: 0.3 }}>
                            <Box sx={{ pl: 1, pt: 0.5 }}>
                              <Typography sx={{ fontSize: 11, textTransform: 'uppercase' }}>
                                Corrective Action
                              </Typography>
                            </Box>
                            <Box>
                              <CssVarsProvider>
                                <Textarea
                                  minRows={3}
                                  maxRows={3}
                                  placeholder="Corrective Action"
                                  type="text"
                                  size="sm"
                                  name="errorCorrect"
                                  value={errorCorrect}
                                  onChange={e => setErrorCorrect(e.target.value)}
                                />
                              </CssVarsProvider>
                            </Box>
                          </Box>
                          <Box sx={{ flex: 1, pl: 0.3 }}>
                            <Box sx={{ pl: 1, pt: 0.5 }}>
                              <Typography sx={{ fontSize: 11, textTransform: 'uppercase' }}>
                                Preventive Action
                              </Typography>
                            </Box>
                            <Box>
                              <CssVarsProvider>
                                <Textarea
                                  minRows={3}
                                  maxRows={3}
                                  placeholder="Preventive Action"
                                  type="text"
                                  size="sm"
                                  name="errorPrvnt"
                                  value={errorPrvnt}
                                  onChange={e => setErrorPrvnt(e.target.value)}
                                />
                              </CssVarsProvider>
                            </Box>
                          </Box>
                        </Box>
                      </>
                    ) : null}
                  </Box>
                ) : null}
              </Box>
              <Box sx={{ display: 'flex', pt: 0.5 }}>
                <Box sx={{ flex: 2, pl: 1, pt: 1.3 }}>
                  <Typography sx={{ fontSize: 12, fontWeight: 550, textTransform: 'uppercase' }}>
                    Test Re dos Done{' '}
                  </Typography>
                </Box>
                <Box sx={{ pt: 1 }}>:</Box>
                <Box sx={{ flex: 1, display: 'flex', pl: 1 }}>
                  <Box sx={{ pt: 1.2 }}>
                    <CssVarsProvider>
                      {redo_status === 1 ? (
                        <Tooltip title="Registered as Incident, so can't Change" placement="left">
                          <Checkbox color="neutral" size="md" checked={redosYes} />
                        </Tooltip>
                      ) : (
                        <Checkbox
                          color="primary"
                          size="md"
                          checked={redosYes}
                          onChange={ChangeRedosYes}
                        />
                      )}
                    </CssVarsProvider>
                  </Box>
                  <Box sx={{ pl: 1, pt: 1 }}>
                    <Typography sx={{ fontSize: 16 }}>Yes</Typography>
                  </Box>
                  <Box sx={{ pt: 1.2, pl: 2 }}>
                    <CssVarsProvider>
                      {redo_status === 1 ? (
                        <Tooltip title="Registered as Incident, so can't Change" placement="bottom">
                          <Checkbox color="neutral" size="md" checked={redosNo} />
                        </Tooltip>
                      ) : (
                        <Checkbox
                          color="primary"
                          size="md"
                          checked={redosNo}
                          onChange={ChangeRedosNo}
                        />
                      )}
                    </CssVarsProvider>
                  </Box>
                  <Box sx={{ pl: 1, pt: 1 }}>
                    <Typography sx={{ fontSize: 16 }}>No</Typography>
                  </Box>
                  {redosYes === true ? (
                    <Box sx={{ pl: 2, pt: 0.2 }}>
                      <CssVarsProvider>
                        <Button
                          variant="outlined"
                          color="neutral"
                          size="sm"
                          sx={{
                            height: 20,
                            width: 150,
                            display: 'flex',
                            justifyContent: 'flex-start',
                          }}
                          startDecorator={
                            <AddCircleOutlineIcon
                              sx={{ height: 20, width: 20, color: '#970C10', cursor: 'pointer' }}
                              fontSize="large"
                            />
                          }
                          onClick={RedosIncidentReg}
                        >
                          Incident Reg.
                        </Button>
                      </CssVarsProvider>
                    </Box>
                  ) : null}
                </Box>
              </Box>
              <Box sx={{ pl: 0.2, bgcolor: '#eceff1' }}>
                {redosYes === true ? (
                  <Box>
                    {redosType !== 0 ? (
                      <>
                        <Box sx={{ display: 'flex', pt: 0.5, pl: 0.5 }}>
                          <Box sx={{ pl: 1 }}>
                            <Typography sx={{ fontSize: 11 }}>INCIDENT TYPE</Typography>
                          </Box>
                          <Box sx={{ pl: 2, fontSize: 11 }}>
                            <Typography>: </Typography>
                          </Box>
                          <Box sx={{ pl: 1.5 }}>
                            <Typography sx={{ fontSize: 11, borderRadius: 1 }}>
                              {redosType === 1
                                ? 'GENERAL'
                                : redosType === 2
                                ? 'NEAR MISSESS'
                                : redosType === 3
                                ? 'HARMFUL'
                                : redosType === 4
                                ? 'SENTINEL'
                                : 'Nil'}
                            </Typography>
                          </Box>
                        </Box>
                        <Box sx={{ display: 'flex', px: 0.5 }}>
                          <Box sx={{ flex: 1 }}>
                            <Box sx={{ pl: 1, pt: 0.5 }}>
                              <Typography sx={{ fontSize: 11, textTransform: 'uppercase' }}>
                                Details
                              </Typography>
                            </Box>
                            <Box>
                              <CssVarsProvider>
                                <Textarea
                                  readOnly
                                  minRows={3}
                                  maxRows={3}
                                  placeholder="Details"
                                  type="text"
                                  size="sm"
                                  name="redosDetails"
                                  value={redosDetails}
                                  onChange={e => setRedosDetails(e.target.value)}
                                />
                              </CssVarsProvider>
                            </Box>
                          </Box>
                          <Box sx={{ flex: 1, pl: 0.3 }}>
                            <Box sx={{ pl: 1, pt: 0.5 }}>
                              <Typography sx={{ fontSize: 11, textTransform: 'uppercase' }}>
                                Reason For Re dos
                              </Typography>
                            </Box>
                            <Box>
                              <CssVarsProvider>
                                <Textarea
                                  readOnly
                                  minRows={3}
                                  maxRows={3}
                                  placeholder="Reason For Re dos"
                                  type="text"
                                  size="sm"
                                  name="redosReason"
                                  value={redosReason}
                                  onChange={e => setRedosReason(e.target.value)}
                                />
                              </CssVarsProvider>
                            </Box>
                          </Box>
                          <Box sx={{ flex: 1, pl: 0.3 }}>
                            <Box sx={{ pl: 1, pt: 0.5 }}>
                              <Typography sx={{ fontSize: 11, textTransform: 'uppercase' }}>
                                Corrective Action
                              </Typography>
                            </Box>
                            <Box>
                              <CssVarsProvider>
                                <Textarea
                                  minRows={3}
                                  maxRows={3}
                                  placeholder="Corrective Action"
                                  type="text"
                                  size="sm"
                                  name="redosCoorect"
                                  value={redosCoorect}
                                  onChange={e => setRedosCoorect(e.target.value)}
                                />
                              </CssVarsProvider>
                            </Box>
                          </Box>
                          <Box sx={{ flex: 1, pl: 0.3 }}>
                            <Box sx={{ pl: 1, pt: 0.5 }}>
                              <Typography sx={{ fontSize: 11, textTransform: 'uppercase' }}>
                                Preventive Action
                              </Typography>
                            </Box>
                            <Box>
                              <CssVarsProvider>
                                <Textarea
                                  minRows={3}
                                  maxRows={3}
                                  placeholder="Preventive Action"
                                  type="text"
                                  size="sm"
                                  name="redosPrvnt"
                                  value={redosPrvnt}
                                  onChange={e => setRedosPrvnt(e.target.value)}
                                />
                              </CssVarsProvider>
                            </Box>
                          </Box>
                        </Box>
                      </>
                    ) : null}
                  </Box>
                ) : null}
              </Box>
              <Box sx={{ display: 'flex', pt: 0.5 }}>
                <Box sx={{ flex: 2, pl: 1, pt: 1.3 }}>
                  <Typography sx={{ fontSize: 12, fontWeight: 550, textTransform: 'uppercase' }}>
                    Incidence of Patient Identification Error
                  </Typography>
                </Box>
                <Box sx={{ pt: 1 }}>:</Box>
                <Box sx={{ flex: 1, display: 'flex', pl: 1 }}>
                  <Box sx={{ pt: 1.2 }}>
                    <CssVarsProvider>
                      {incidence_ident_error_status === 1 ? (
                        <Tooltip title="Registered as Incident, so can't Change" placement="left">
                          <Checkbox color="neutral" size="md" checked={errorIdentyYes} />
                        </Tooltip>
                      ) : (
                        <Checkbox
                          color="primary"
                          size="md"
                          checked={errorIdentyYes}
                          onChange={ChangeIdentfyYes}
                        />
                      )}
                    </CssVarsProvider>
                  </Box>
                  <Box sx={{ pl: 1, pt: 1 }}>
                    <Typography sx={{ fontSize: 16 }}>Yes</Typography>
                  </Box>
                  <Box sx={{ pt: 1.2, pl: 2 }}>
                    <CssVarsProvider>
                      {incidence_ident_error_status === 1 ? (
                        <Tooltip title="Registered as Incident, so can't Change" placement="bottom">
                          <Checkbox color="neutral" size="md" checked={errorIdentyNo} />
                        </Tooltip>
                      ) : (
                        <Checkbox
                          color="primary"
                          size="md"
                          checked={errorIdentyNo}
                          onChange={ChangeIdentfyNo}
                        />
                      )}
                    </CssVarsProvider>
                  </Box>
                  <Box sx={{ pl: 1, pt: 1 }}>
                    <Typography sx={{ fontSize: 16 }}>No</Typography>
                  </Box>
                  {errorIdentyYes === true ? (
                    <Box sx={{ pl: 2, pt: 0.2 }}>
                      <CssVarsProvider>
                        <Button
                          variant="outlined"
                          color="neutral"
                          size="sm"
                          sx={{
                            height: 20,
                            width: 150,
                            display: 'flex',
                            justifyContent: 'flex-start',
                          }}
                          startDecorator={
                            <AddCircleOutlineIcon
                              sx={{ height: 20, width: 20, color: '#970C10', cursor: 'pointer' }}
                              fontSize="large"
                            />
                          }
                          onClick={IdentErrorIncidentReg}
                        >
                          Incident Reg.
                        </Button>
                      </CssVarsProvider>
                    </Box>
                  ) : null}
                </Box>
              </Box>
              <Box sx={{ pl: 0.2, bgcolor: '#eceff1' }}>
                {errorIdentyYes === true ? (
                  <Box>
                    {identType !== 0 ? (
                      <>
                        <Box sx={{ display: 'flex', pt: 0.5, pl: 0.5 }}>
                          <Box sx={{ pl: 1 }}>
                            <Typography sx={{ fontSize: 11 }}>INCIDENT TYPE</Typography>
                          </Box>
                          <Box sx={{ pl: 2, fontSize: 11 }}>
                            <Typography>: </Typography>
                          </Box>
                          <Box sx={{ pl: 1.5 }}>
                            <Typography sx={{ fontSize: 11, borderRadius: 1 }}>
                              {identType === 1
                                ? 'GENERAL'
                                : identType === 2
                                ? 'NEAR MISSESS'
                                : identType === 3
                                ? 'HARMFUL'
                                : identType === 4
                                ? 'SENTINEL'
                                : 'Nil'}
                            </Typography>
                          </Box>
                        </Box>
                        <Box sx={{ display: 'flex', px: 0.5 }}>
                          <Box sx={{ flex: 1 }}>
                            <Box sx={{ pl: 1, pt: 0.5 }}>
                              <Typography sx={{ fontSize: 11, textTransform: 'uppercase' }}>
                                Identification Error Details
                              </Typography>
                            </Box>
                            <Box>
                              <CssVarsProvider>
                                <Textarea
                                  readOnly
                                  minRows={3}
                                  maxRows={3}
                                  placeholder="Identification Error Details"
                                  type="text"
                                  size="sm"
                                  name="identerrorDetails"
                                  value={identerrorDetails}
                                  onChange={e => setIdenterrorDetails(e.target.value)}
                                />
                              </CssVarsProvider>
                            </Box>
                          </Box>
                          <Box sx={{ flex: 1, pl: 0.3 }}>
                            <Box sx={{ pl: 1, pt: 0.5 }}>
                              <Typography sx={{ fontSize: 11, textTransform: 'uppercase' }}>
                                Identification Error Reason
                              </Typography>
                            </Box>
                            <Box>
                              <CssVarsProvider>
                                <Textarea
                                  readOnly
                                  minRows={3}
                                  maxRows={3}
                                  placeholder="Identification Error Reason"
                                  type="text"
                                  size="sm"
                                  name="identerrorReason"
                                  value={identerrorReason}
                                  onChange={e => setIdenterrorReason(e.target.value)}
                                />
                              </CssVarsProvider>
                            </Box>
                          </Box>
                          <Box sx={{ flex: 1, pl: 0.3 }}>
                            <Box sx={{ pl: 1, pt: 0.5 }}>
                              <Typography sx={{ fontSize: 11, textTransform: 'uppercase' }}>
                                Action Taken
                              </Typography>
                            </Box>
                            <Box>
                              <CssVarsProvider>
                                <Textarea
                                  minRows={3}
                                  maxRows={3}
                                  placeholder="Action Taken"
                                  type="text"
                                  size="sm"
                                  name="errorIdentAction"
                                  value={errorIdentAction}
                                  onChange={e => setErrorIdentAction(e.target.value)}
                                />
                              </CssVarsProvider>
                            </Box>
                          </Box>
                        </Box>
                      </>
                    ) : null}
                  </Box>
                ) : null}
              </Box>
              <Box sx={{ display: 'flex', pt: 0.5 }}>
                <Box sx={{ flex: 2, pl: 1, pt: 1.3 }}>
                  <Typography sx={{ fontSize: 12, fontWeight: 550, textTransform: 'uppercase' }}>
                    Incidence of Falls
                  </Typography>
                </Box>
                <Box sx={{ pt: 1 }}>:</Box>
                <Box sx={{ flex: 1, display: 'flex', pl: 1 }}>
                  <Box sx={{ pt: 1.2 }}>
                    <CssVarsProvider>
                      {falls_status === 1 ? (
                        <Tooltip title="Registered as Incident, so can't Change" placement="left">
                          <Checkbox color="neutral" size="md" checked={fallsYes} />
                        </Tooltip>
                      ) : (
                        <Checkbox
                          color="primary"
                          size="md"
                          checked={fallsYes}
                          onChange={ChangeFallsYes}
                        />
                      )}
                    </CssVarsProvider>
                  </Box>
                  <Box sx={{ pl: 1, pt: 1 }}>
                    <Typography sx={{ fontSize: 16 }}>Yes</Typography>
                  </Box>
                  <Box sx={{ pt: 1.2, pl: 2 }}>
                    <CssVarsProvider>
                      {falls_status === 1 ? (
                        <Tooltip title="Registered as Incident, so can't Change" placement="bottom">
                          <Checkbox color="neutral" size="md" checked={fallsNo} />
                        </Tooltip>
                      ) : (
                        <Checkbox
                          color="primary"
                          size="md"
                          checked={fallsNo}
                          onChange={ChangeFallsNo}
                        />
                      )}
                    </CssVarsProvider>
                  </Box>
                  <Box sx={{ pl: 1, pt: 1 }}>
                    <Typography sx={{ fontSize: 16 }}>No</Typography>
                  </Box>
                  {fallsYes === true ? (
                    <Box sx={{ pl: 2, pt: 0.2 }}>
                      <CssVarsProvider>
                        <Button
                          variant="outlined"
                          color="neutral"
                          size="sm"
                          sx={{
                            height: 20,
                            width: 150,
                            display: 'flex',
                            justifyContent: 'flex-start',
                          }}
                          startDecorator={
                            <AddCircleOutlineIcon
                              sx={{ height: 20, width: 20, color: '#970C10', cursor: 'pointer' }}
                              fontSize="large"
                            />
                          }
                          onClick={FallsIncidentReg}
                        >
                          Incident Reg.
                        </Button>
                      </CssVarsProvider>
                    </Box>
                  ) : null}
                </Box>
              </Box>
              <Box sx={{ pl: 0.2, bgcolor: '#eceff1' }}>
                {fallsYes === true ? (
                  <Box>
                    {fallsType !== 0 ? (
                      <>
                        <Box sx={{ display: 'flex', pt: 0.5, pl: 0.5 }}>
                          <Box sx={{ pl: 1 }}>
                            <Typography sx={{ fontSize: 11 }}>INCIDENT TYPE</Typography>
                          </Box>
                          <Box sx={{ pl: 2, fontSize: 11 }}>
                            <Typography>: </Typography>
                          </Box>
                          <Box sx={{ pl: 1.5 }}>
                            <Typography sx={{ fontSize: 11, borderRadius: 1 }}>
                              {fallsType === 1
                                ? 'GENERAL'
                                : fallsType === 2
                                ? 'NEAR MISSESS'
                                : fallsType === 3
                                ? 'HARMFUL'
                                : fallsType === 4
                                ? 'SENTINEL'
                                : 'Nil'}
                            </Typography>
                          </Box>
                        </Box>
                        <Box sx={{ display: 'flex', px: 0.5 }}>
                          <Box sx={{ flex: 1 }}>
                            <Box sx={{ pl: 1, pt: 0.5 }}>
                              <Typography sx={{ fontSize: 11, textTransform: 'uppercase' }}>
                                Falls Details
                              </Typography>
                            </Box>
                            <Box>
                              <CssVarsProvider>
                                <Textarea
                                  readOnly
                                  minRows={3}
                                  maxRows={3}
                                  placeholder="Falls Details"
                                  type="text"
                                  size="sm"
                                  name="fallsdetails"
                                  value={fallsdetails}
                                  onChange={e => setFallsdetails(e.target.value)}
                                />
                              </CssVarsProvider>
                            </Box>
                          </Box>
                          <Box sx={{ flex: 1, pl: 0.3 }}>
                            <Box sx={{ pl: 1, pt: 0.5 }}>
                              <Typography sx={{ fontSize: 11, textTransform: 'uppercase' }}>
                                Falls Reason
                              </Typography>
                            </Box>
                            <Box>
                              <CssVarsProvider>
                                <Textarea
                                  readOnly
                                  minRows={3}
                                  maxRows={3}
                                  placeholder="Falls Reason"
                                  type="text"
                                  size="sm"
                                  name="fallsReason"
                                  value={fallsReason}
                                  onChange={e => setFallsReason(e.target.value)}
                                />
                              </CssVarsProvider>
                            </Box>
                          </Box>
                        </Box>
                      </>
                    ) : null}
                  </Box>
                ) : null}
              </Box>
              <Box sx={{ display: 'flex', pt: 0.5 }}>
                <Box sx={{ flex: 2, pl: 1, pt: 1.3 }}>
                  <Typography sx={{ fontSize: 12, fontWeight: 550, textTransform: 'uppercase' }}>
                    Sentinel Events Reported{' '}
                  </Typography>
                </Box>
                <Box sx={{ pt: 1 }}>:</Box>
                <Box sx={{ flex: 1, display: 'flex', pl: 1 }}>
                  <Box sx={{ pt: 1.2 }}>
                    <CssVarsProvider>
                      {sentinel_events_status === 1 ? (
                        <Tooltip title="Registered as Incident, so can't Change" placement="left">
                          <Checkbox color="neutral" size="md" checked={sentinelYes} />
                        </Tooltip>
                      ) : (
                        <Checkbox
                          color="primary"
                          size="md"
                          checked={sentinelYes}
                          onChange={ChangeSentinelYes}
                        />
                      )}
                    </CssVarsProvider>
                  </Box>
                  <Box sx={{ pl: 1, pt: 1 }}>
                    <Typography sx={{ fontSize: 16 }}>Yes</Typography>
                  </Box>
                  <Box sx={{ pt: 1.2, pl: 2 }}>
                    <CssVarsProvider>
                      {sentinel_events_status === 1 ? (
                        <Tooltip title="Registered as Incident, so can't Change" placement="bottom">
                          <Checkbox color="neutral" size="md" checked={sentinelNo} />
                        </Tooltip>
                      ) : (
                        <Checkbox
                          color="primary"
                          size="md"
                          checked={sentinelNo}
                          onChange={ChangeSentinelNo}
                        />
                      )}
                    </CssVarsProvider>
                  </Box>
                  <Box sx={{ pl: 1, pt: 1 }}>
                    <Typography sx={{ fontSize: 16 }}>No</Typography>
                  </Box>
                  {sentinelYes === true ? (
                    <Box sx={{ pl: 2, pt: 0.2 }}>
                      <CssVarsProvider>
                        <Button
                          variant="outlined"
                          color="neutral"
                          size="sm"
                          sx={{
                            height: 20,
                            width: 150,
                            display: 'flex',
                            justifyContent: 'flex-start',
                          }}
                          startDecorator={
                            <AddCircleOutlineIcon
                              sx={{ height: 20, width: 20, color: '#970C10', cursor: 'pointer' }}
                              fontSize="large"
                            />
                          }
                          onClick={SentinelIncidentReg}
                        >
                          Incident Reg.
                        </Button>
                      </CssVarsProvider>
                    </Box>
                  ) : null}
                </Box>
              </Box>
              <Box sx={{ pl: 0.2, bgcolor: '#eceff1' }}>
                {sentinelYes === true ? (
                  <Box>
                    {sentinelType !== 0 ? (
                      <>
                        <Box sx={{ display: 'flex', pt: 0.5, pl: 0.5 }}>
                          <Box sx={{ pl: 1 }}>
                            <Typography sx={{ fontSize: 11 }}>INCIDENT TYPE</Typography>
                          </Box>
                          <Box sx={{ pl: 2, fontSize: 11 }}>
                            <Typography>: </Typography>
                          </Box>
                          <Box sx={{ pl: 1.5 }}>
                            <Typography sx={{ fontSize: 11, borderRadius: 1 }}>
                              {sentinelType === 1
                                ? 'GENERAL'
                                : sentinelType === 2
                                ? 'NEAR MISSESS'
                                : sentinelType === 3
                                ? 'HARMFUL'
                                : sentinelType === 4
                                ? 'SENTINEL'
                                : 'Nil'}
                            </Typography>
                          </Box>
                        </Box>
                        <Box sx={{ display: 'flex', px: 0.5 }}>
                          <Box sx={{ flex: 1 }}>
                            <Box sx={{ pl: 1, pt: 0.5 }}>
                              <Typography sx={{ fontSize: 11, textTransform: 'uppercase' }}>
                                Details
                              </Typography>
                            </Box>
                            <Box>
                              <CssVarsProvider>
                                <Textarea
                                  readOnly
                                  minRows={3}
                                  maxRows={3}
                                  placeholder="Details"
                                  type="text"
                                  size="sm"
                                  name="sentinelDetails"
                                  value={sentinelDetails}
                                  onChange={e => setSentinelDetails(e.target.value)}
                                />
                              </CssVarsProvider>
                            </Box>
                          </Box>
                          <Box sx={{ flex: 1, pl: 0.3 }}>
                            <Box sx={{ pl: 1, pt: 0.5 }}>
                              <Typography sx={{ fontSize: 11, textTransform: 'uppercase' }}>
                                Reason
                              </Typography>
                            </Box>
                            <Box>
                              <CssVarsProvider>
                                <Textarea
                                  readOnly
                                  minRows={3}
                                  maxRows={3}
                                  placeholder="Reason"
                                  type="text"
                                  size="sm"
                                  name="sentinelreason"
                                  value={sentinelreason}
                                  onChange={e => setSentinelreason(e.target.value)}
                                />
                              </CssVarsProvider>
                            </Box>
                          </Box>
                        </Box>
                        <Box sx={{ display: 'flex' }}>
                          <Box sx={{ flex: 2, pl: 1, pt: 1.3 }}>
                            <Typography
                              sx={{ fontSize: 12, fontWeight: 550, textTransform: 'uppercase' }}
                            >
                              Analyzed within the Defined Time Frame{' '}
                            </Typography>
                          </Box>
                          <Box sx={{ pt: 1 }}>:</Box>
                          <Box sx={{ pt: 1.2, flex: 1, pl: 1 }}>
                            <CssVarsProvider>
                              <Checkbox
                                color="primary"
                                size="md"
                                checked={sentinelAnalyse}
                                onChange={ChangeSentinelAnalysed}
                              />
                            </CssVarsProvider>
                          </Box>
                        </Box>
                      </>
                    ) : null}
                  </Box>
                ) : null}
              </Box>
              <Box sx={{ display: 'flex', pt: 0.5 }}>
                <Box sx={{ flex: 2, pl: 1, pt: 1.3 }}>
                  <Typography sx={{ fontSize: 12, fontWeight: 550, textTransform: 'uppercase' }}>
                    Near Misses Reported
                  </Typography>
                </Box>
                <Box sx={{ pt: 1 }}>:</Box>
                <Box sx={{ flex: 1, display: 'flex', pl: 1 }}>
                  <Box sx={{ pt: 1.2 }}>
                    <CssVarsProvider>
                      {near_misses_status === 1 ? (
                        <Tooltip title="Registered as Incident, so can't Change" placement="left">
                          <Checkbox color="neutral" size="md" checked={nearYes} />
                        </Tooltip>
                      ) : (
                        <Checkbox
                          color="primary"
                          size="md"
                          checked={nearYes}
                          onChange={ChangeNearYes}
                        />
                      )}
                    </CssVarsProvider>
                  </Box>
                  <Box sx={{ pl: 1, pt: 1 }}>
                    <Typography sx={{ fontSize: 16 }}>Yes</Typography>
                  </Box>
                  <Box sx={{ pt: 1.2, pl: 2 }}>
                    <CssVarsProvider>
                      {near_misses_status === 1 ? (
                        <Tooltip title="Registered as Incident, so can't Change" placement="bottom">
                          <Checkbox color="neutral" size="md" checked={nearNo} />
                        </Tooltip>
                      ) : (
                        <Checkbox
                          color="primary"
                          size="md"
                          checked={nearNo}
                          onChange={ChangeNearNo}
                        />
                      )}
                    </CssVarsProvider>
                  </Box>
                  <Box sx={{ pl: 1, pt: 1 }}>
                    <Typography sx={{ fontSize: 16 }}>No</Typography>
                  </Box>
                  {nearYes === true ? (
                    <Box sx={{ pl: 2, pt: 0.2 }}>
                      <CssVarsProvider>
                        <Button
                          variant="outlined"
                          color="neutral"
                          size="sm"
                          sx={{
                            height: 20,
                            width: 150,
                            display: 'flex',
                            justifyContent: 'flex-start',
                          }}
                          startDecorator={
                            <AddCircleOutlineIcon
                              sx={{ height: 20, width: 20, color: '#970C10', cursor: 'pointer' }}
                              fontSize="large"
                            />
                          }
                          onClick={NearMissesIncidentReg}
                        >
                          Incident Reg.
                        </Button>
                      </CssVarsProvider>
                    </Box>
                  ) : null}
                </Box>
              </Box>
              <Box sx={{ pl: 0.2, bgcolor: '#eceff1' }}>
                {nearYes === true ? (
                  <Box>
                    {nearType !== 0 ? (
                      <>
                        <Box sx={{ display: 'flex', pt: 0.5, pl: 0.5 }}>
                          <Box sx={{ pl: 1 }}>
                            <Typography sx={{ fontSize: 11 }}>INCIDENT TYPE</Typography>
                          </Box>
                          <Box sx={{ pl: 2, fontSize: 11 }}>
                            <Typography>: </Typography>
                          </Box>
                          <Box sx={{ pl: 1.5 }}>
                            <Typography sx={{ fontSize: 11, borderRadius: 1 }}>
                              {nearType === 1
                                ? 'GENERAL'
                                : nearType === 2
                                ? 'NEAR MISSESS'
                                : nearType === 3
                                ? 'HARMFUL'
                                : nearType === 4
                                ? 'SENTINEL'
                                : 'Nil'}
                            </Typography>
                          </Box>
                        </Box>
                        <Box sx={{ display: 'flex', px: 0.5 }}>
                          <Box sx={{ flex: 1 }}>
                            <Box sx={{ pl: 1, pt: 0.5 }}>
                              <Typography sx={{ fontSize: 11, textTransform: 'uppercase' }}>
                                Details
                              </Typography>
                            </Box>
                            <Box>
                              <CssVarsProvider>
                                <Textarea
                                  readOnly
                                  minRows={3}
                                  maxRows={3}
                                  placeholder="Falls Details"
                                  type="text"
                                  size="sm"
                                  name="nearMissesDetails"
                                  value={nearMissesDetails}
                                  onChange={e => setNearMissesDetails(e.target.value)}
                                />
                              </CssVarsProvider>
                            </Box>
                          </Box>
                          <Box sx={{ flex: 1, pl: 0.3 }}>
                            <Box sx={{ pl: 1, pt: 0.5 }}>
                              <Typography sx={{ fontSize: 11, textTransform: 'uppercase' }}>
                                Falls Reason
                              </Typography>
                            </Box>
                            <Box>
                              <CssVarsProvider>
                                <Textarea
                                  readOnly
                                  minRows={3}
                                  maxRows={3}
                                  placeholder="Falls Reason"
                                  type="text"
                                  size="sm"
                                  name="nearMissessReason"
                                  value={nearMissessReason}
                                  onChange={e => setNearMissessReason(e.target.value)}
                                />
                              </CssVarsProvider>
                            </Box>
                          </Box>
                        </Box>
                      </>
                    ) : null}
                  </Box>
                ) : null}
              </Box>
              <Box sx={{ display: 'flex', pt: 0.5 }}>
                <Box sx={{ flex: 2, pl: 1, pt: 0.6 }}>
                  <Typography sx={{ fontSize: 12, fontWeight: 550, textTransform: 'uppercase' }}>
                    Waiting Time For Services Diagnostics{' '}
                  </Typography>
                </Box>
                <Box sx={{ flex: 1, pl: 1 }}></Box>
              </Box>
              <Box sx={{}}>
                <Box sx={{ display: 'flex', m: 0.5, bgcolor: '#eceff1', flex: 1, pb: 0.5 }}>
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ pl: 0.5, pt: 0.5 }}>
                      <Typography sx={{ fontSize: 11, textTransform: 'uppercase' }}>
                        Test Requested Date
                      </Typography>
                    </Box>
                    <Box sx={{ pl: 1 }}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          views={['year', 'month', 'day']}
                          maxDate={new Date()}
                          value={testReqDate}
                          inputFormat="dd-MM-yyyy"
                          size="small"
                          onChange={newValue => {
                            setTestReqDate(newValue)
                          }}
                          renderInput={({ inputRef, inputProps, InputProps }) => (
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <CssVarsProvider>
                                <Input
                                  ref={inputRef}
                                  {...inputProps}
                                  fullWidth
                                  sx={{ bgcolor: 'white', padding: 'none', size: 'sm' }}
                                  disabled={true}
                                />
                              </CssVarsProvider>
                              {InputProps?.endAdornment}
                            </Box>
                          )}
                        />
                      </LocalizationProvider>
                    </Box>
                  </Box>
                  <Box sx={{ flex: 1, pl: 1 }}>
                    <Box sx={{ pl: 0.5, pt: 0.5 }}>
                      <Typography sx={{ fontSize: 11, textTransform: 'uppercase' }}>
                        Patient Entered Time in Endoscopy Area
                      </Typography>
                    </Box>
                    <Box sx={{ pl: 1 }}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                          views={['year', 'month', 'day', 'hours', 'minutes']}
                          minDate={new Date(ipd_date)}
                          maxDate={new Date()}
                          value={entryTime}
                          inputFormat="DD-MM-YYYY hh:mm A"
                          size="small"
                          onChange={newValue => {
                            OnchangeEntryTime(newValue)
                          }}
                          renderInput={({ inputRef, inputProps, InputProps }) => (
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <CssVarsProvider>
                                <Input
                                  ref={inputRef}
                                  {...inputProps}
                                  fullWidth
                                  sx={{ bgcolor: 'white', size: 'sm', padding: 'none' }}
                                  disabled={true}
                                />
                              </CssVarsProvider>
                              {InputProps?.endAdornment}
                            </Box>
                          )}
                        />
                      </LocalizationProvider>
                    </Box>
                  </Box>
                  <Box sx={{ flex: 1, pl: 1, pr: 0.5 }}>
                    <Box sx={{ pl: 0.5, pt: 0.5 }}>
                      <Typography sx={{ fontSize: 11, textTransform: 'uppercase' }}>
                        Assessment Checklist Done By Nurse
                      </Typography>
                    </Box>
                    <Box sx={{ pr: 0.5, pl: 1 }}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                          views={['year', 'month', 'day', 'hours', 'minutes']}
                          value={assessmentTime}
                          inputFormat="DD-MM-YYYY hh:mm A"
                          size="small"
                          minDate={new Date(ipd_date)}
                          maxDate={new Date()}
                          onChange={newValue => {
                            OnchangeAssessTime(newValue)
                          }}
                          renderInput={({ inputRef, inputProps, InputProps }) => (
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <CssVarsProvider>
                                <Input
                                  ref={inputRef}
                                  {...inputProps}
                                  fullWidth
                                  sx={{ bgcolor: 'white', size: 'sm', padding: 'none' }}
                                  disabled={true}
                                />
                              </CssVarsProvider>
                              {InputProps?.endAdornment}
                            </Box>
                          )}
                        />
                      </LocalizationProvider>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', m: 0.5, bgcolor: '#eceff1', flex: 1, pb: 0.5 }}>
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ pl: 0.5, pt: 0.5 }}>
                      <Typography sx={{ fontSize: 11, textTransform: 'uppercase' }}>
                        Procedure Starting Time
                      </Typography>
                    </Box>
                    <Box sx={{ pl: 1 }}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                          views={['year', 'month', 'day', 'hours', 'minutes']}
                          value={startTime}
                          inputFormat="DD-MM-YYYY hh:mm A"
                          size="small"
                          minDate={new Date(ipd_date)}
                          maxDate={new Date()}
                          onChange={newValue => {
                            OnchangeProcStartTime(newValue)
                          }}
                          renderInput={({ inputRef, inputProps, InputProps }) => (
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <CssVarsProvider>
                                <Input
                                  ref={inputRef}
                                  {...inputProps}
                                  fullWidth
                                  sx={{ bgcolor: 'white', size: 'sm', padding: 'none' }}
                                  disabled={true}
                                />
                              </CssVarsProvider>
                              {InputProps?.endAdornment}
                            </Box>
                          )}
                        />
                      </LocalizationProvider>
                    </Box>
                  </Box>
                  <Box sx={{ flex: 1, pl: 1 }}>
                    <Box sx={{ pl: 0.5, pt: 0.5 }}>
                      <Typography sx={{ fontSize: 11, textTransform: 'uppercase' }}>
                        Procedure Ending Time
                      </Typography>
                    </Box>
                    <Box sx={{ pl: 1 }}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                          views={['year', 'month', 'day', 'hours', 'minutes']}
                          value={endTime}
                          inputFormat="DD-MM-YYYY hh:mm A"
                          size="small"
                          minDate={new Date(ipd_date)}
                          maxDate={new Date()}
                          onChange={newValue => {
                            OnchangeProcEndTime(newValue)
                          }}
                          renderInput={({ inputRef, inputProps, InputProps }) => (
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <CssVarsProvider>
                                <Input
                                  ref={inputRef}
                                  {...inputProps}
                                  fullWidth
                                  sx={{ bgcolor: 'white', size: 'sm', padding: 'none' }}
                                  disabled={true}
                                />
                              </CssVarsProvider>
                              {InputProps?.endAdornment}
                            </Box>
                          )}
                        />
                      </LocalizationProvider>
                    </Box>
                  </Box>
                  <Box sx={{ flex: 1, pl: 1 }}>
                    <Box sx={{ pl: 0.5, pt: 0.5 }}>
                      <Typography sx={{ fontSize: 11, textTransform: 'uppercase' }}>
                        Report Generating Time
                      </Typography>
                    </Box>
                    <Box sx={{ pl: 1 }}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                          views={['year', 'month', 'day', 'hours', 'minutes']}
                          value={reportTime}
                          inputFormat="DD-MM-YYYY hh:mm A"
                          size="small"
                          minDate={new Date(ipd_date)}
                          maxDate={new Date()}
                          onChange={newValue => {
                            OnchangeGenerateTime(newValue)
                          }}
                          renderInput={({ inputRef, inputProps, InputProps }) => (
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <CssVarsProvider>
                                <Input
                                  ref={inputRef}
                                  {...inputProps}
                                  fullWidth
                                  sx={{ bgcolor: 'white', size: 'sm', padding: 'none' }}
                                  disabled={true}
                                />
                              </CssVarsProvider>
                              {InputProps?.endAdornment}
                            </Box>
                          )}
                        />
                      </LocalizationProvider>
                    </Box>
                  </Box>
                  <Box sx={{ flex: 1.2, pl: 1, pr: 0.5 }}>
                    <Box sx={{ pl: 0.5, pt: 0.5 }}>
                      <Typography sx={{ fontSize: 11, textTransform: 'uppercase' }}>
                        Report Despatching Time
                      </Typography>
                    </Box>
                    <Box sx={{ pl: 1, pr: 0.5 }}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                          views={['year', 'month', 'day', 'hours', 'minutes']}
                          value={despatchTime}
                          inputFormat="DD-MM-YYYY hh:mm A"
                          size="small"
                          minDate={new Date(ipd_date)}
                          maxDate={new Date()}
                          onChange={newValue => {
                            OnchangeDespatchTime(newValue)
                          }}
                          renderInput={({ inputRef, inputProps, InputProps }) => (
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <CssVarsProvider>
                                <Input
                                  ref={inputRef}
                                  {...inputProps}
                                  fullWidth
                                  sx={{ bgcolor: 'white', size: 'sm', padding: 'none' }}
                                  disabled={true}
                                />
                              </CssVarsProvider>
                              {InputProps?.endAdornment}
                            </Box>
                          )}
                        />
                      </LocalizationProvider>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', m: 0.5, bgcolor: '#eceff1', pb: 0.5, flex: 1 }}>
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ pl: 0.5, pt: 0.5 }}>
                      <Typography sx={{ fontSize: 11, textTransform: 'uppercase' }}>
                        Sum of Time Taken For Assessment
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', pt: 0.1, pl: 1 }}>
                      {benchMarkFlag === 1 ? (
                        <Box
                          sx={{
                            flex: 1,
                            bgcolor: 'white',
                            color: 'red',
                            height: 38,
                            mr: 0.6,
                            pt: 0.8,
                            border: '1px solid lightgrey',
                            pl: 2,
                            borderRadius: 1.5,
                          }}
                        >
                          {sumOfAssesment}
                        </Box>
                      ) : (
                        <Box
                          sx={{
                            flex: 1,
                            bgcolor: 'white',
                            height: 38,
                            mr: 0.6,
                            pt: 0.8,
                            border: '1px solid lightgrey',
                            pl: 2,
                            borderRadius: 1.5,
                          }}
                        >
                          {sumOfAssesment}
                        </Box>
                      )}
                    </Box>
                  </Box>
                  <>
                    {benchMarkFlag === 1 ? (
                      <Box sx={{ flex: 1.5 }}>
                        <Box sx={{ pl: 0.5, pt: 0.5 }}>
                          <Typography sx={{ fontSize: 11, textTransform: 'uppercase' }}>
                            Reason for Assessment Time Exceedence{' '}
                          </Typography>
                        </Box>
                        <Box sx={{ pt: 0.1, pr: 0.5 }}>
                          <CssVarsProvider>
                            <Textarea
                              sx={{ height: 38 }}
                              minRows={2}
                              maxRows={2}
                              placeholder="type here...."
                              type="text"
                              size="sm"
                              name="benchMarkReason"
                              value={benchMarkReason}
                              onChange={e => setBenchMarkReason(e.target.value)}
                            />
                          </CssVarsProvider>
                        </Box>
                      </Box>
                    ) : null}
                  </>
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ pt: 0.5, pl: 0.3 }}>
                      <Typography sx={{ fontSize: 11, textTransform: 'uppercase' }}>
                        Total Time Gap
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', pt: 0.1 }}>
                      <Box
                        sx={{
                          flex: 1,
                          bgcolor: 'white',
                          height: 38,
                          mr: 0.6,
                          pt: 0.8,
                          border: '1px solid lightgrey',
                          pl: 2,
                          borderRadius: 1.5,
                        }}
                      >
                        {timeGap}
                      </Box>
                    </Box>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ pt: 0.5 }}>
                      <Typography sx={{ fontSize: 11, textTransform: 'uppercase' }}>
                        Turnaround Time
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', pt: 0.1 }}>
                      <Box
                        sx={{
                          flex: 1,
                          bgcolor: 'white',
                          height: 38,
                          mr: 0.6,
                          pt: 0.8,
                          border: '1px solid lightgrey',
                          pl: 2,
                          borderRadius: 1.5,
                        }}
                      >
                        {turnaroundTime}
                      </Box>
                    </Box>
                  </Box>
                </Box>
                {benchMarkFlag === 1 ? (
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ color: 'red', fontSize: 11, pl: 2 }}>
                      *Initial Assessment BenchMark Time is 10 min
                    </Typography>
                  </Box>
                ) : null}
              </Box>
              <Box sx={{ display: 'flex', pb: 0.5 }}>
                <Box sx={{ flex: 2, pl: 1 }}>
                  <Typography sx={{ fontSize: 12, fontWeight: 550, textTransform: 'uppercase' }}>
                    Equipment Utilization{' '}
                  </Typography>
                </Box>
                <Box sx={{ flex: 1, pl: 1 }}></Box>
              </Box>
              <Box sx={{ display: 'flex', mx: 0.5, bgcolor: '#eceff1', flex: 1, pb: 0.5 }}>
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ pl: 0.7, pt: 0.5 }}>
                    <Typography sx={{ fontSize: 11, textTransform: 'uppercase' }}>
                      Equipment
                    </Typography>
                  </Box>
                  <Box sx={{ ml: 1, mr: 0.6, pt: 0.8, bgcolor: 'white' }}>
                    <QIEquipmentSelect
                      equipment={equipment}
                      setEquipment={setEquipment}
                      setProcName={setProcName}
                      setProcedureList={setProcedureList}
                      setequipName={setequipName}
                    />
                  </Box>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ pl: 0.7, pt: 0.5 }}>
                    <Typography sx={{ fontSize: 11, textTransform: 'uppercase' }}>
                      Procedures
                    </Typography>
                  </Box>
                  <Box sx={{ mx: 1, pt: 0.8, bgcolor: 'white' }}>
                    <QIProcedureSelect
                      procName={procName}
                      setProcName={setProcName}
                      procedureList={procedureList}
                      setProcNamedisplay={setProcNamedisplay}
                    />
                  </Box>
                </Box>
                <Box sx={{ flex: 0.2, pt: 3, pl: 1 }}>
                  <CssVarsProvider>
                    <Tooltip title="Add" placement="right">
                      <AddCircleIcon
                        sx={{
                          cursor: 'pointer',
                          color: '#0476D0',
                          ':hover': {
                            color: '#0067B3',
                          },
                          height: 30,
                          width: 30,
                        }}
                        onClick={AddProcedures}
                      />
                    </Tooltip>
                  </CssVarsProvider>
                </Box>
              </Box>
              {ProcedureArray.length > 0 ? (
                <Box sx={{ px: 0.7 }}>
                  <ProcedureEquipmentTable
                    ProcedureArray={ProcedureArray}
                    setProcedureArray={setProcedureArray}
                    equipReport={equipReport}
                  />
                </Box>
              ) : null}
              <Box sx={{ display: 'flex', mx: 0.5, bgcolor: '#eceff1', flex: 1, pb: 1 }}>
                <Box sx={{ flex: 1, pl: 0.5 }}>
                  <Box sx={{ pl: 0.4, pt: 0.5 }}>
                    <Typography sx={{ fontSize: 11, textTransform: 'uppercase' }}>
                      Start Time
                    </Typography>
                  </Box>
                  <Box sx={{ pl: 0.5 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateTimePicker
                        views={['year', 'month', 'day', 'hours', 'minutes']}
                        value={equipStartTime}
                        inputFormat="DD-MM-YYYY hh:mm A"
                        size="small"
                        minDate={new Date(ipd_date)}
                        maxDate={new Date()}
                        onChange={newValue => {
                          OnchangeEquipStartTime(newValue)
                        }}
                        renderInput={({ inputRef, inputProps, InputProps }) => (
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <CssVarsProvider>
                              <Input
                                ref={inputRef}
                                {...inputProps}
                                fullWidth
                                sx={{ bgcolor: 'white', size: 'sm', padding: 'none', height: 38 }}
                                disabled={true}
                              />
                            </CssVarsProvider>
                            {InputProps?.endAdornment}
                          </Box>
                        )}
                      />
                    </LocalizationProvider>
                  </Box>
                </Box>
                <Box sx={{ flex: 1, px: 1 }}>
                  <Box sx={{ pl: 0.5, pt: 0.5 }}>
                    <Typography sx={{ fontSize: 11, textTransform: 'uppercase' }}>
                      End Time
                    </Typography>
                  </Box>
                  <Box sx={{ px: 1 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateTimePicker
                        views={['year', 'month', 'day', 'hours', 'minutes']}
                        value={equipEndTime}
                        inputFormat="DD-MM-YYYY hh:mm A"
                        size="small"
                        minDate={new Date(ipd_date)}
                        maxDate={new Date()}
                        onChange={newValue => {
                          OnchangeEquipEndTime(newValue)
                        }}
                        renderInput={({ inputRef, inputProps, InputProps }) => (
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <CssVarsProvider>
                              <Input
                                ref={inputRef}
                                {...inputProps}
                                fullWidth
                                sx={{ bgcolor: 'white', size: 'sm', padding: 'none', height: 38 }}
                                disabled={true}
                              />
                            </CssVarsProvider>
                            {InputProps?.endAdornment}
                          </Box>
                        )}
                      />
                    </LocalizationProvider>
                  </Box>
                </Box>
                <Box sx={{ flex: 1 }}>
                  {/* <Box sx={{ pl: 0.7, pt: 0.5 }}>
                                        <Typography sx={{ fontSize: 11, textTransform: 'uppercase' }}>Employee</Typography>
                                    </Box>
                                    <Box sx={{ mx: 1, pt: 0.8, bgcolor: 'white' }}>
                                        <QIEmployeeSelect employeeList={employeeList} empName={empName} setempName={setempName}
                                        />
                                    </Box> */}
                </Box>
              </Box>
            </Box>
            <Paper
              variant="outlined"
              square
              sx={{ display: 'flex', justifyContent: 'flex-end', bgcolor: '#b0bec5', height: 45 }}
            >
              <Box sx={{ pt: 0.5, pr: 0.1 }}>
                <CssVarsProvider>
                  <Button
                    variant="plain"
                    sx={{
                      color: 'white',
                      width: 100,
                      height: 30,
                      bgcolor: '#546e7a',
                      borderRadius: 0,
                      border: '1px solid white',
                      ':hover': {
                        bgcolor: '#78909c',
                        boxShadow: 2,
                        color: 'white',
                      },
                    }}
                    onClick={SaveDetails}
                  >
                    UPDATE
                  </Button>
                </CssVarsProvider>
              </Box>
              <Box sx={{ pr: 1, pt: 0.5 }}>
                <CssVarsProvider>
                  <Button
                    variant="plain"
                    sx={{
                      color: 'white',
                      width: 100,
                      height: 30,
                      bgcolor: '#546e7a',
                      borderRadius: 0,
                      border: '1px solid white',
                      ':hover': {
                        bgcolor: '#78909c',
                        boxShadow: 2,
                        color: 'white',
                      },
                    }}
                    onClick={ResetDetails}
                  >
                    RESET
                  </Button>
                </CssVarsProvider>
              </Box>
            </Paper>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  )
}

export default memo(IPEndoQIModal)
