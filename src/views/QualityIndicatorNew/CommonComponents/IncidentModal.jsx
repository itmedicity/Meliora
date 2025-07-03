import {
  Box,
  Dialog,
  DialogContent,
  FormControl,
  MenuItem,
  Paper,
  Select,
  Typography,
} from '@mui/material'
import React, { Fragment, memo, useCallback, useEffect, useMemo, useState } from 'react'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { Button, CssVarsProvider, Input, Textarea } from '@mui/joy'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { format, isAfter } from 'date-fns'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { axioslogin } from 'src/views/Axios/Axios'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode'

const IncidentModal = ({
  open,
  setIncModalOpen,
  depName,
  qidept,
  endoSlno,
  incCount,
  setincCount,
  incdExist,
  incRegFlag,
  incidentView,
  errorDetails,
  errorReason,
  redosDetails,
  redosReason,
  identerrorDetails,
  identerrorReason,
  fallsdetails,
  fallsReason,
  sentinelDetails,
  sentinelreason,
  nearMissesDetails,
  nearMissessReason,
  setIncFlag,
  setErrorYes,
  setErrorNo,
  setRedosYes,
  setRedosNo,
  setErrorIdentyYes,
  setErrorIdentyNo,
  setFallsYes,
  setFallsNo,
  setNearYes,
  setNearNo,
  setSentinelYes,
  setSentinelNo,
  setErrorDetails,
  setErrorReason,
  setRedosDetails,
  setRedosReason,
  setIdenterrorDetails,
  setIdenterrorReason,
  setFallsdetails,
  setFallsReason,
  setSentinelDetails,
  setSentinelreason,
  setNearMissesDetails,
  setNearMissessReason,
  patient_arrived_date,
  setErrorType,
  setRedosType,
  setIdentType,
  setFallsType,
  setSentinelType,
  setnearType,
  ipOpCheck,
}) => {
  const {
    incident_error_date,
    incident_redos_date,
    incidence_ident_date,
    incident_falls_date,
    incident_sentinel_date,
    incident_nearmisses_date,
  } = incidentView[0]

  const [inicidentDate, setInicidentDate] = useState(
    format(
      new Date(
        incRegFlag === 1
          ? incident_error_date === null
            ? new Date(patient_arrived_date)
            : incident_error_date
          : incRegFlag === 2
          ? incident_redos_date === null
            ? new Date(patient_arrived_date)
            : incident_redos_date
          : incRegFlag === 3
          ? incidence_ident_date === null
            ? new Date(patient_arrived_date)
            : incidence_ident_date
          : incRegFlag === 4
          ? incident_falls_date === null
            ? new Date(patient_arrived_date)
            : incident_falls_date
          : incRegFlag === 5
          ? incident_sentinel_date === null
            ? new Date(patient_arrived_date)
            : incident_sentinel_date
          : incRegFlag === 6
          ? incident_nearmisses_date === null
            ? new Date(patient_arrived_date)
            : incident_nearmisses_date
          : null
      ),
      'yyyy-MM-dd HH:mm:ss'
    )
  )
  const [incdSlno, setIncdSlno] = useState(0)
  const [incType, setIncType] = useState(0)
  const incidentType = useMemo(() => {
    return [
      { id: 1, label: 'GENERAL' },
      { id: 2, label: 'NEAR MISSESS' },
      { id: 3, label: 'HARMFUL' },
      { id: 4, label: 'SENTINEL' },
    ]
  }, [])

  const id = useSelector(state => {
    return state?.LoginUserData.empid
  })
  useEffect(() => {
    if (incidentView !== 0) {
      const {
        incident_error_slno,
        incident_redos_slno,
        incidence_ident_slno,
        incident_falls_slno,
        incident_sentinel_slno,
        incident_nearmisses_slno,
        error_incident_type,
        redos_incident_type,
        falls_incident_type,
        ident_error_incident_type,
        nearmiss_incident_type,
        sentinel_incident_type,
      } = incidentView[0]
      if (incRegFlag === 1) {
        setIncdSlno(incident_error_slno)
        setIncType(error_incident_type)
      } else if (incRegFlag === 2) {
        setIncdSlno(incident_redos_slno)
        setIncType(redos_incident_type)
      } else if (incRegFlag === 3) {
        setIncdSlno(incidence_ident_slno)
        setIncType(ident_error_incident_type)
      } else if (incRegFlag === 4) {
        setIncdSlno(incident_falls_slno)
        setIncType(falls_incident_type)
      } else if (incRegFlag === 5) {
        setIncdSlno(incident_sentinel_slno)
        setIncType(sentinel_incident_type)
      } else if (incRegFlag === 6) {
        setIncdSlno(incident_nearmisses_slno)
        setIncType(nearmiss_incident_type)
      }
    }
  }, [incidentView, incRegFlag, inicidentDate, incdExist])
  const OnchangeIncidentDate = useCallback(
    value => {
      const check = isAfter(new Date(value), new Date(patient_arrived_date))
      if (check === true) {
        setInicidentDate(value)
      } else {
        warningNotify('Please Check the Incident Report Time')
        setInicidentDate(new Date(inicidentDate))
      }
    },
    [patient_arrived_date, inicidentDate]
  )
  const ResetDetails = useCallback(() => {
    if (incdSlno === 0) {
      if (incRegFlag === 1) {
        setErrorDetails('')
        setErrorReason('')
        setErrorYes(false)
        setErrorNo(true)
      } else if (incRegFlag === 2) {
        setRedosDetails('')
        setRedosReason('')
        setRedosYes(false)
        setRedosNo(true)
      } else if (incRegFlag === 3) {
        setIdenterrorDetails('')
        setIdenterrorReason('')
        setErrorIdentyYes(false)
        setErrorIdentyNo(true)
      } else if (incRegFlag === 4) {
        setFallsdetails('')
        setFallsReason('')
        setFallsYes(false)
        setFallsNo(true)
      } else if (incRegFlag === 5) {
        setSentinelDetails('')
        setSentinelreason('')
        setSentinelYes(false)
        setSentinelNo(true)
      } else {
        setNearMissesDetails('')
        setNearMissessReason('')
        setNearYes(false)
        setNearNo(true)
      }
      setIncFlag(0)
      setIncModalOpen(false)
      // setIncType(0)
    } else {
      setIncFlag(0)
      setIncModalOpen(false)
    }
  }, [
    incdSlno,
    incRegFlag,
    setIncFlag,
    setErrorYes,
    setErrorNo,
    setRedosYes,
    setRedosNo,
    setErrorIdentyYes,
    setErrorIdentyNo,
    setFallsYes,
    setFallsNo,
    setNearYes,
    setNearNo,
    setSentinelYes,
    setSentinelNo,
    setIncModalOpen,
    setErrorDetails,
    setErrorReason,
    setRedosDetails,
    setRedosReason,
    setIdenterrorDetails,
    setIdenterrorReason,
    setFallsdetails,
    setFallsReason,
    setSentinelDetails,
    setSentinelreason,
    setNearMissesDetails,
    setNearMissessReason,
  ])

  const postdata = useMemo(() => {
    return {
      incident_date: format(new Date(inicidentDate), 'yyyy-MM-dd HH:mm:ss'),
      incident_dept: qidept,
      incident_details:
        incRegFlag === 1
          ? errorDetails
          : incRegFlag === 2
          ? redosDetails
          : incRegFlag === 3
          ? identerrorDetails
          : incRegFlag === 4
          ? fallsdetails
          : incRegFlag === 5
          ? sentinelDetails
          : incRegFlag === 6
          ? nearMissesDetails
          : null,
      incident_reason:
        incRegFlag === 1
          ? errorReason
          : incRegFlag === 2
          ? redosReason
          : incRegFlag === 3
          ? identerrorReason
          : incRegFlag === 4
          ? fallsReason
          : incRegFlag === 5
          ? sentinelreason
          : incRegFlag === 6
          ? nearMissessReason
          : null,
      // initially 0, after verifction its 1
      incident_flag: 0,
      create_user: id,
      // flag 1 for qi department 2 for other dept
      qi_incident_flag: 1,
      // clinic 1, nonclinic 2
      clinic_nonclinic: 1,
      qi_slno: endoSlno,
      incRegFlag: incRegFlag,
      initial_incident_type: incType,
      final_incident_type: incType,
      incident_mark_remarks: '',
    }
  }, [
    inicidentDate,
    qidept,
    id,
    incRegFlag,
    endoSlno,
    errorDetails,
    redosDetails,
    identerrorDetails,
    fallsdetails,
    sentinelDetails,
    nearMissesDetails,
    errorReason,
    redosReason,
    identerrorReason,
    fallsReason,
    sentinelreason,
    nearMissessReason,
    incType,
  ])

  const patchdata = useMemo(() => {
    return {
      incident_date: moment(new Date(inicidentDate)).format('YYYY-MM-DD HH:mm:ss'),
      incident_dept: qidept,
      incident_details:
        incRegFlag === 1
          ? errorDetails
          : incRegFlag === 2
          ? redosDetails
          : incRegFlag === 3
          ? identerrorDetails
          : incRegFlag === 4
          ? fallsdetails
          : incRegFlag === 5
          ? sentinelDetails
          : incRegFlag === 6
          ? nearMissesDetails
          : null,
      incident_reason:
        incRegFlag === 1
          ? errorReason
          : incRegFlag === 2
          ? redosReason
          : incRegFlag === 3
          ? identerrorReason
          : incRegFlag === 4
          ? fallsReason
          : incRegFlag === 5
          ? sentinelreason
          : incRegFlag === 6
          ? nearMissessReason
          : null,
      edit_user: id,
      incident_slno: incdSlno,
      qi_slno: endoSlno,
      incRegFlag: incRegFlag,
      initial_incident_type: incType,
    }
  }, [
    inicidentDate,
    qidept,
    id,
    incdSlno,
    incRegFlag,
    endoSlno,
    errorDetails,
    redosDetails,
    identerrorDetails,
    fallsdetails,
    sentinelDetails,
    nearMissesDetails,
    errorReason,
    redosReason,
    identerrorReason,
    fallsReason,
    sentinelreason,
    nearMissessReason,
    incType,
  ])

  const inpatientpostdata = useMemo(() => {
    return {
      incident_date: format(new Date(inicidentDate), 'yyyy-MM-dd HH:mm:ss'),
      incident_dept: qidept,
      incident_details:
        incRegFlag === 1
          ? errorDetails
          : incRegFlag === 2
          ? redosDetails
          : incRegFlag === 3
          ? identerrorDetails
          : incRegFlag === 4
          ? fallsdetails
          : incRegFlag === 5
          ? sentinelDetails
          : incRegFlag === 6
          ? nearMissesDetails
          : null,
      incident_reason:
        incRegFlag === 1
          ? errorReason
          : incRegFlag === 2
          ? redosReason
          : incRegFlag === 3
          ? identerrorReason
          : incRegFlag === 4
          ? fallsReason
          : incRegFlag === 5
          ? sentinelreason
          : incRegFlag === 6
          ? nearMissessReason
          : null,
      // initially 0, after verifction its 1
      incident_flag: 0,
      create_user: id,
      // flag 1 for qi department 2 for other dept
      qi_incident_flag: 1,
      // clinic 1, nonclinic 2
      clinic_nonclinic: 1,
      qi_endo_ip_slno: endoSlno,
      incRegFlag: incRegFlag,
      initial_incident_type: incType,
      final_incident_type: incType,
      incident_mark_remarks: '',
    }
  }, [
    inicidentDate,
    qidept,
    id,
    incRegFlag,
    endoSlno,
    errorDetails,
    redosDetails,
    identerrorDetails,
    fallsdetails,
    sentinelDetails,
    nearMissesDetails,
    errorReason,
    redosReason,
    identerrorReason,
    fallsReason,
    sentinelreason,
    nearMissessReason,
    incType,
  ])

  const inpatientpatchdata = useMemo(() => {
    return {
      incident_date: moment(new Date(inicidentDate)).format('YYYY-MM-DD HH:mm:ss'),
      incident_dept: qidept,
      incident_details:
        incRegFlag === 1
          ? errorDetails
          : incRegFlag === 2
          ? redosDetails
          : incRegFlag === 3
          ? identerrorDetails
          : incRegFlag === 4
          ? fallsdetails
          : incRegFlag === 5
          ? sentinelDetails
          : incRegFlag === 6
          ? nearMissesDetails
          : null,
      incident_reason:
        incRegFlag === 1
          ? errorReason
          : incRegFlag === 2
          ? redosReason
          : incRegFlag === 3
          ? identerrorReason
          : incRegFlag === 4
          ? fallsReason
          : incRegFlag === 5
          ? sentinelreason
          : incRegFlag === 6
          ? nearMissessReason
          : null,
      edit_user: id,
      incident_slno: incdSlno,
      qi_endo_ip_slno: endoSlno,
      incRegFlag: incRegFlag,
      initial_incident_type: incType,
    }
  }, [
    inicidentDate,
    qidept,
    id,
    incdSlno,
    incRegFlag,
    endoSlno,
    errorDetails,
    redosDetails,
    identerrorDetails,
    fallsdetails,
    sentinelDetails,
    nearMissesDetails,
    errorReason,
    redosReason,
    identerrorReason,
    fallsReason,
    sentinelreason,
    nearMissessReason,
    incType,
  ])

  const IncidentTypeUpdate = useCallback(() => {
    if (incRegFlag === 1) {
      setErrorType(incType)
    } else if (incRegFlag === 2) {
      setRedosType(incType)
    } else if (incRegFlag === 3) {
      setIdentType(incType)
    } else if (incRegFlag === 4) {
      setFallsType(incType)
    } else if (incRegFlag === 5) {
      setSentinelType(incType)
    } else if (incRegFlag === 6) {
      setnearType(incType)
    }
  }, [
    incType,
    incRegFlag,
    setErrorType,
    setRedosType,
    setIdentType,
    setFallsType,
    setSentinelType,
    setnearType,
  ])

  const SaveIncidentDetails = useCallback(() => {
    if (
      errorDetails === '' &&
      redosDetails === '' &&
      identerrorDetails === '' &&
      fallsdetails === '' &&
      sentinelDetails === '' &&
      nearMissesDetails === ''
    ) {
      infoNotify('Please Enter Incident Details')
    } else if (
      errorReason === '' &&
      redosReason === '' &&
      identerrorReason === '' &&
      fallsReason === '' &&
      sentinelreason === '' &&
      nearMissessReason === ''
    ) {
      infoNotify('Please Enter Incident Reason')
    } else if (incType === 0) {
      infoNotify('Please Select Incident Type')
    } else {
      const InsertIncidentData = async postdata => {
        const result = await axioslogin.post('/incidentMaster/incidentsave', postdata)
        return result.data
      }
      const UpdateIncidentDetails = async patchdata => {
        const result = await axioslogin.patch('/incidentMaster/incidentUpdate', patchdata)
        return result.data
      }
      const InsertIPIncidentData = async inpatientpostdata => {
        const result = await axioslogin.post('/incidentMaster/ipIncidentSave', inpatientpostdata)
        return result.data
      }
      const UpdateIPIncidentDetails = async inpatientpatchdata => {
        const result = await axioslogin.patch(
          '/incidentMaster/ipincidentUpdate',
          inpatientpatchdata
        )
        return result.data
      }
      if (ipOpCheck === 0) {
        if (incdExist === 0) {
          InsertIncidentData(postdata).then(val => {
            const { success, message } = val
            if (success === 1) {
              IncidentTypeUpdate()
              succesNotify(message)
              setincCount(incCount + 1)
              setIncFlag(0)
              setIncModalOpen(false)
            } else {
              infoNotify(message)
            }
          })
        } else {
          UpdateIncidentDetails(patchdata).then(val => {
            const { success, message } = val
            if (success === 1) {
              IncidentTypeUpdate()
              succesNotify(message)
              setincCount(incCount + 1)
              setIncFlag(0)
              setIncModalOpen(false)
            } else {
              infoNotify(message)
            }
          })
        }
      } else {
        if (incdExist === 0) {
          InsertIPIncidentData(inpatientpostdata).then(val => {
            const { success, message } = val
            if (success === 1) {
              IncidentTypeUpdate()
              succesNotify(message)
              setincCount(incCount + 1)
              setIncFlag(0)
              setIncModalOpen(false)
            } else {
              infoNotify(message)
            }
          })
        } else {
          UpdateIPIncidentDetails(inpatientpatchdata).then(val => {
            const { success, message } = val
            if (success === 1) {
              IncidentTypeUpdate()
              succesNotify(message)
              setincCount(incCount + 1)
              setIncFlag(0)
              setIncModalOpen(false)
            } else {
              infoNotify(message)
            }
          })
        }
      }
    }
  }, [
    postdata,
    incCount,
    setincCount,
    patchdata,
    incdExist,
    setIncFlag,
    setIncModalOpen,
    errorDetails,
    redosDetails,
    identerrorDetails,
    fallsdetails,
    sentinelDetails,
    nearMissesDetails,
    errorReason,
    redosReason,
    identerrorReason,
    fallsReason,
    sentinelreason,
    nearMissessReason,
    ipOpCheck,
    IncidentTypeUpdate,
    inpatientpostdata,
    incType,
    inpatientpatchdata,
  ])
  return (
    <Fragment>
      <Dialog
        open={open}
        keepMounted
        aria-describedby="alert-dialog-slide-descriptiona"
        maxWidth="55vw"
        sx={{ display: 'flex', justifyContent: 'center' }}
      >
        <DialogContent
          id="alert-dialog-slide-descriptiona"
          sx={{
            minWidth: '50vw',
            borderRadius: 'md',
          }}
        >
          <Paper variant="outlined" square sx={{ display: 'flex', height: 45, bgcolor: '#cfd8dc' }}>
            <Box sx={{ display: 'flex', flex: 1, justifyContent: 'center', p: 1.5 }}>
              <Typography sx={{ color: '#546e7a', fontWeight: 'bold', fontSize: 17 }}>
                INCIDENT REGISTRATION
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flex: 0.1,
                justifyContent: 'flex-end',
                fontSize: 20,
                pt: 0.4,
                pr: 0.1,
              }}
            >
              <HighlightOffIcon
                sx={{ cursor: 'pointer', height: 38, width: 38, color: '#546e7a', opacity: 0.8 }}
                onClick={ResetDetails}
              />
            </Box>
          </Paper>
          <Box sx={{ py: 1 }}>
            <Box sx={{ display: 'flex', pt: 1.5, pb: 0.5 }}>
              <Box sx={{ flex: 0.3, pl: 1 }}>
                <Typography sx={{ fontSize: 12 }}>DEPARTMENT</Typography>
              </Box>
              <Box sx={{ pl: 0.2 }}>
                <Typography>: </Typography>
              </Box>
              <Box sx={{ flex: 1.5, pl: 1.8 }}>
                <Box sx={{ fontSize: 14 }}>{depName}</Box>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', pt: 0.2 }}>
              <Box sx={{ flex: 0.3, pl: 1, pt: 1 }}>
                <Typography sx={{ fontSize: 12 }}>DATE & TIME</Typography>
              </Box>
              <Box sx={{ pt: 1, pl: 0.1 }}>
                <Typography>: </Typography>
              </Box>

              <Box sx={{ flex: 1.5, pl: 1.7 }}>
                {ipOpCheck === 0 ? (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      views={['year', 'month', 'day', 'hours', 'minutes']}
                      value={inicidentDate}
                      minDate={new Date(patient_arrived_date)}
                      maxDate={new Date(patient_arrived_date)}
                      inputFormat="DD-MM-YYYY hh:mm A"
                      size="small"
                      onChange={newValue => {
                        OnchangeIncidentDate(newValue)
                      }}
                      renderInput={({ inputRef, inputProps, InputProps }) => (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <CssVarsProvider>
                            <Input
                              ref={inputRef}
                              {...inputProps}
                              fullWidth
                              sx={{ bgcolor: 'white', height: 40, padding: 'none' }}
                              disabled={true}
                            />
                          </CssVarsProvider>
                          {InputProps?.endAdornment}
                        </Box>
                      )}
                    />
                  </LocalizationProvider>
                ) : (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      views={['year', 'month', 'day', 'hours', 'minutes']}
                      value={inicidentDate}
                      minDate={new Date(patient_arrived_date)}
                      maxDate={new Date()}
                      inputFormat="DD-MM-YYYY hh:mm A"
                      size="small"
                      onChange={newValue => {
                        OnchangeIncidentDate(newValue)
                      }}
                      renderInput={({ inputRef, inputProps, InputProps }) => (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <CssVarsProvider>
                            <Input
                              ref={inputRef}
                              {...inputProps}
                              fullWidth
                              sx={{ bgcolor: 'white', height: 40, padding: 'none' }}
                              disabled={true}
                            />
                          </CssVarsProvider>
                          {InputProps?.endAdornment}
                        </Box>
                      )}
                    />
                  </LocalizationProvider>
                )}
              </Box>
            </Box>
            <Box sx={{ display: 'flex', pt: 0.2 }}>
              <Box sx={{ flex: 0.3, pl: 1, pt: 2.5 }}>
                <Typography sx={{ fontSize: 12 }}>DETAILS</Typography>
              </Box>
              <Box sx={{ pl: 0.2, pt: 2.5 }}>
                <Typography>: </Typography>
              </Box>
              <Box sx={{ flex: 1.5, pl: 1.5 }}>
                <CssVarsProvider>
                  <Textarea
                    minRows={3}
                    maxRows={3}
                    placeholder="Incident Details"
                    type="text"
                    size="sm"
                    name={
                      incRegFlag === 1
                        ? 'errorDetails'
                        : incRegFlag === 2
                        ? 'redosDetails'
                        : incRegFlag === 3
                        ? 'identerrorDetails'
                        : incRegFlag === 4
                        ? 'fallsdetails'
                        : incRegFlag === 5
                        ? 'sentinelDetails'
                        : incRegFlag === 6
                        ? 'nearMissesDetails'
                        : null
                    }
                    value={
                      incRegFlag === 1
                        ? errorDetails
                        : incRegFlag === 2
                        ? redosDetails
                        : incRegFlag === 3
                        ? identerrorDetails
                        : incRegFlag === 4
                        ? fallsdetails
                        : incRegFlag === 5
                        ? sentinelDetails
                        : incRegFlag === 6
                        ? nearMissesDetails
                        : null
                    }
                    onChange={e =>
                      incRegFlag === 1
                        ? setErrorDetails(e.target.value)
                        : incRegFlag === 2
                        ? setRedosDetails(e.target.value)
                        : incRegFlag === 3
                        ? setIdenterrorDetails(e.target.value)
                        : incRegFlag === 4
                        ? setFallsdetails(e.target.value)
                        : incRegFlag === 5
                        ? setSentinelDetails(e.target.value)
                        : incRegFlag === 6
                        ? setNearMissesDetails(e.target.value)
                        : null
                    }
                  />
                </CssVarsProvider>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', pt: 0.2 }}>
              <Box sx={{ flex: 0.3, pl: 1, pt: 2.5 }}>
                <Typography sx={{ fontSize: 12 }}>REASON</Typography>
              </Box>
              <Box sx={{ pl: 0.2, pt: 2.5 }}>
                <Typography>: </Typography>
              </Box>
              <Box sx={{ flex: 1.5, pl: 1.5 }}>
                <CssVarsProvider>
                  <Textarea
                    minRows={3}
                    maxRows={3}
                    placeholder="Incident Reason"
                    type="text"
                    size="sm"
                    name={
                      incRegFlag === 1
                        ? 'errorReason'
                        : incRegFlag === 2
                        ? 'redosReason'
                        : incRegFlag === 3
                        ? 'identerrorReason'
                        : incRegFlag === 4
                        ? 'fallsReason'
                        : incRegFlag === 5
                        ? 'sentinelreason'
                        : 'nearMissessReason'
                    }
                    value={
                      incRegFlag === 1
                        ? errorReason
                        : incRegFlag === 2
                        ? redosReason
                        : incRegFlag === 3
                        ? identerrorReason
                        : incRegFlag === 4
                        ? fallsReason
                        : incRegFlag === 5
                        ? sentinelreason
                        : nearMissessReason
                    }
                    onChange={e =>
                      incRegFlag === 1
                        ? setErrorReason(e.target.value)
                        : incRegFlag === 2
                        ? setRedosReason(e.target.value)
                        : incRegFlag === 3
                        ? setIdenterrorReason(e.target.value)
                        : incRegFlag === 4
                        ? setFallsReason(e.target.value)
                        : incRegFlag === 5
                        ? setSentinelreason(e.target.value)
                        : incRegFlag === 6
                        ? setNearMissessReason(e.target.value)
                        : null
                    }
                  />
                </CssVarsProvider>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', pt: 0.8 }}>
              <Box sx={{ flex: 0.3, pl: 1, pt: 1 }}>
                <Typography sx={{ fontSize: 12 }}>INCIDENT TYPE</Typography>
              </Box>
              <Box sx={{ pt: 0.6, pl: 0.1 }}>
                <Typography>: </Typography>
              </Box>
              <Box sx={{ flex: 1.5, display: 'flex', pl: 1.5 }}>
                <FormControl fullWidth style={{ backgroundColor: 'white' }}>
                  <Select
                    size="small"
                    fullWidth
                    style={{
                      height: 35,
                      width: 250,
                      fontSize: 14,
                      backgroundColor: 'white',
                    }}
                    defaultValue={0}
                    value={incType}
                    onChange={e => setIncType(e.target.value)}
                  >
                    <MenuItem disabled value={0}>
                      -Select IncidentType-
                    </MenuItem>
                    {incidentType?.map((val, index) => (
                      <MenuItem key={index} value={val.id}>
                        {val.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </Box>
          <Paper
            variant="outlined"
            square
            sx={{ display: 'flex', justifyContent: 'flex-end', height: 45, bgcolor: '#cfd8dc' }}
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
                  onClick={SaveIncidentDetails}
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
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}

export default memo(IncidentModal)
