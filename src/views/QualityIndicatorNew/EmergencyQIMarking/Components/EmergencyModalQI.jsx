import { Box, Dialog, DialogContent, Paper, Tooltip, Typography } from '@mui/material'
import React, { Fragment, memo, useCallback, useEffect, useMemo, useState } from 'react'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { Button, Checkbox, CssVarsProvider, Input, Textarea } from '@mui/joy'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import {
  addMinutes,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  format,
} from 'date-fns'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import { useSelector } from 'react-redux'

const EmergencyModalQI = ({ open, handleClose, rowSelect, RefreshData }) => {
  const {
    qi_slno,
    patient_arrived_date,
    ptno,
    ptname,
    ptsex,
    ptage,
    ptaddrs1,
    ptaddrs3,
    doctor_name,
    ptmobile,
  } = rowSelect
  const [returnYes, setReturnYes] = useState(false)
  const [returnNo, setReturnNo] = useState(true)
  const [triageTime, setTriageTime] = useState(new Date())
  const [assessTime, setAssessTime] = useState(new Date())
  const [timeGap, setTimeGap] = useState('')
  const [serviceTime, setServiceTime] = useState(0)
  const [benchMarkFlag, setBenchMarkFlag] = useState(0)
  const [benchMarkReason, setBenchMarkReason] = useState('')
  const id = useSelector(state => {
    return state?.LoginUserData.empid
  })
  useEffect(() => {
    if (rowSelect.length !== 0) {
      const { triage_time, assess_time, return_status, initial_assessment_reason } = rowSelect
      setReturnYes(return_status === 1 ? true : false)
      setReturnNo(return_status === 0 ? true : false)
      setTriageTime(
        triage_time === null
          ? format(addMinutes(new Date(patient_arrived_date), 5), 'yyyy-MM-dd HH:mm:ss')
          : triage_time
      )
      setAssessTime(
        assess_time === null
          ? format(addMinutes(new Date(patient_arrived_date), 15), 'yyyy-MM-dd HH:mm:ss')
          : assess_time
      )
      setBenchMarkReason(initial_assessment_reason === null ? '' : initial_assessment_reason)
    }
  }, [rowSelect, patient_arrived_date])

  const ChangeReturnYes = useCallback(e => {
    if (e.target.checked === true) {
      setReturnYes(true)
      setReturnNo(false)
    } else {
      setReturnYes(false)
      setReturnNo(true)
    }
  }, [])
  const ChangeReturnNo = useCallback(e => {
    if (e.target.checked === true) {
      setReturnYes(false)
      setReturnNo(true)
    } else {
      setReturnYes(true)
      setReturnNo(false)
    }
  }, [])
  const reset = useCallback(() => {
    setReturnYes(false)
    setReturnNo(true)
    setTriageTime(new Date())
    setAssessTime(new Date())
    setTimeGap('')
    handleClose()
    setServiceTime(0)
  }, [handleClose])
  useEffect(() => {
    const hours = differenceInHours(new Date(assessTime), new Date(triageTime))
    const minutes = differenceInMinutes(new Date(assessTime), new Date(triageTime)) % 60
    const seconds = differenceInSeconds(new Date(assessTime), new Date(triageTime)) % 60
    setTimeGap(`${hours} hr ${minutes} min ${seconds} sec`)
    // tot service time per patient
    const totMinutes = hours * 60 + minutes
    setServiceTime(totMinutes)
    if (totMinutes > 10) {
      setBenchMarkFlag(1)
    } else {
      setBenchMarkFlag(0)
    }
  }, [assessTime, triageTime])

  const patchdata = useMemo(() => {
    return {
      triage_time: format(new Date(triageTime), 'yyyy-MM-dd HH:mm:ss'),
      assess_time: format(new Date(assessTime), 'yyyy-MM-dd HH:mm:ss'),
      return_status: returnYes === true ? 1 : returnNo === false ? 0 : 0,
      edit_user: id,
      sumof_service_time: serviceTime,
      qi_save_status: 1,
      assessment_benchmark_flag: benchMarkFlag,
      initial_assessment_reason: benchMarkFlag === 1 ? benchMarkReason : null,
      qi_slno: qi_slno,
    }
  }, [
    triageTime,
    assessTime,
    returnYes,
    returnNo,
    id,
    qi_slno,
    serviceTime,
    benchMarkFlag,
    benchMarkReason,
  ])
  const SaveDetails = useCallback(() => {
    if (new Date(triageTime) > new Date(assessTime)) {
      infoNotify('Please Check The Triage/Assessment Time')
    } else {
      const UpdateData = async patchdata => {
        const result = await axioslogin.patch('/qiemergency/qiupdate', patchdata)
        return result.data
      }
      if (benchMarkFlag === 1) {
        if (benchMarkReason === '' || benchMarkReason === undefined) {
          infoNotify('Please Enter Reason for Initial Assessment Time Exceedence')
        } else {
          UpdateData(patchdata).then(value => {
            const { message, success } = value
            if (success === 1) {
              succesNotify(message)
              RefreshData()
              reset()
            } else {
            }
          })
        }
      } else {
        UpdateData(patchdata).then(value => {
          const { message, success } = value
          if (success === 1) {
            succesNotify(message)
            RefreshData()
            reset()
          } else {
          }
        })
      }
    }
  }, [patchdata, reset, triageTime, assessTime, benchMarkReason, benchMarkFlag, RefreshData])

  const ResetDetails = useCallback(() => {
    reset()
  }, [reset])
  return (
    <Fragment>
      <Dialog
        open={open}
        keepMounted
        aria-describedby="alert-dialog-slide-descriptiona"
        maxWidth="50vw"
        sx={{ display: 'flex', justifyContent: 'center' }}
      >
        <DialogContent
          id="alert-dialog-slide-descriptiona"
          sx={{
            minWidth: '50vw',
            borderRadius: 'md',
            overflow: 'auto',
          }}
        >
          <Paper sx={{ display: 'flex', height: 40, bgcolor: '#b0bec5' }}>
            <Box sx={{ display: 'flex', flex: 1 }}>
              <Box sx={{ fontSize: 15, pt: 1, color: 'black', pl: 2 }}>{ptno}</Box>
              <Box sx={{ fontSize: 15, pt: 1, color: 'black', pl: 2 }}>
                {ptname
                  .toLowerCase()
                  .split(' ')
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ')}
              </Box>
              <Box sx={{ fontSize: 15, pt: 1, color: 'black', pl: 2 }}>
                {ptage}/{ptsex}
              </Box>
              <Box sx={{ fontSize: 15, pt: 1, color: 'black', pl: 2 }}>
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
              </Box>
              <Box sx={{ fontSize: 15, pt: 1, color: 'black', pl: 2 }}>{ptmobile}</Box>
              <Box sx={{ fontSize: 15, pt: 1, color: 'black', pl: 3 }}>
                {'Dr. ' +
                  doctor_name
                    .toLowerCase()
                    .split(' ')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ')}
              </Box>
            </Box>
            <Box
              sx={{ display: 'flex', justifyContent: 'flex-end', fontSize: 20, pt: 0.5, pr: 0.2 }}
            >
              <Tooltip title="Close" placement="bottom" cursor="pointer">
                <HighlightOffIcon
                  sx={{ cursor: 'pointer', height: 34, width: 34, color: '#37474f', opacity: 0.7 }}
                  onClick={handleClose}
                />
              </Tooltip>
            </Box>
          </Paper>
          <Box sx={{ overflow: 'auto', pb: 1, pt: 1 }}>
            <Box sx={{ display: 'flex', pt: 1 }}>
              <Box sx={{ flex: 2, pl: 2, pt: 0.5 }}>
                <Typography sx={{ fontSize: 12, textTransform: 'uppercase' }}>
                  Revisit to ER Within 72 Hrs With Similar Presenting Complaints{' '}
                </Typography>
              </Box>
              <Typography>: </Typography>
              <Box sx={{ flex: 1, display: 'flex', pl: 1 }}>
                <Box sx={{ pt: 0.2 }}>
                  <CssVarsProvider>
                    <Checkbox
                      color="primary"
                      size="md"
                      checked={returnYes}
                      onChange={ChangeReturnYes}
                    />
                  </CssVarsProvider>
                </Box>
                <Box sx={{ pl: 1, pt: 0.1 }}>
                  <Typography sx={{ fontSize: 16 }}>Yes</Typography>
                </Box>
                <Box sx={{ pt: 0.2, pl: 2 }}>
                  <CssVarsProvider>
                    <Checkbox
                      color="primary"
                      size="md"
                      checked={returnNo}
                      onChange={ChangeReturnNo}
                    />
                  </CssVarsProvider>
                </Box>
                <Box sx={{ pl: 1, pt: 0.1 }}>
                  <Typography sx={{ fontSize: 16 }}>No</Typography>
                </Box>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', pt: 1 }}>
              <Box sx={{ flex: 1, pl: 0.5 }}>
                <Box sx={{}}>
                  <Typography sx={{ fontSize: 12, pl: 0.5 }}>TRIAGE TIME</Typography>
                </Box>
                <Box sx={{ pt: 0.5, pl: 1.5 }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      value={triageTime}
                      views={['year', 'month', 'day', 'hours', 'minutes']}
                      size="small"
                      inputFormat="DD-MM-YYYY hh:mm A"
                      minDate={new Date(patient_arrived_date)}
                      maxDate={new Date(patient_arrived_date)}
                      onChange={newValue => {
                        setTriageTime(newValue)
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
                </Box>
              </Box>
              <Box sx={{ flex: 1, pl: 0.5 }}>
                <Box sx={{}}>
                  <Typography sx={{ fontSize: 12, pl: 0.5 }}>ASSESSMENT TIME</Typography>
                </Box>
                <Box sx={{ pt: 0.5, pl: 1.5 }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      value={assessTime}
                      views={['year', 'month', 'day', 'hours', 'minutes']}
                      size="small"
                      inputFormat="DD-MM-YYYY hh:mm A"
                      minDate={new Date(patient_arrived_date)}
                      maxDate={new Date(patient_arrived_date)}
                      onChange={newValue => {
                        setAssessTime(newValue)
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
                </Box>
              </Box>
              <Box sx={{ flex: 1, pl: 1 }}>
                <Box>
                  <Typography sx={{ fontSize: 12, textTransform: 'uppercase', pl: 0.5 }}>
                    Total Time Gap
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', pt: 0.5, pl: 1.5 }}>
                  {benchMarkFlag === 1 ? (
                    <Box
                      sx={{
                        flex: 1,
                        bgcolor: 'white',
                        color: 'red',
                        height: 39,
                        pt: 1,
                        mr: 0.6,
                        pl: 4,
                        border: '1px solid lightgrey',
                        borderRadius: 1.5,
                      }}
                    >
                      {timeGap}
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        flex: 1,
                        bgcolor: 'white',
                        height: 39,
                        pt: 1,
                        mr: 0.6,
                        pl: 4,
                        border: '1px solid lightgrey',
                        borderRadius: 1.5,
                      }}
                    >
                      {timeGap}
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
            {benchMarkFlag === 1 ? (
              <Box sx={{ pt: 1 }}>
                <Box sx={{ pl: 0.5 }}>
                  <Box sx={{ pl: 0.5, py: 0.5 }}>
                    <Typography sx={{ fontSize: 11, textTransform: 'uppercase' }}>
                      Reason for Assessment Time Exceedence{' '}
                    </Typography>
                  </Box>
                  <Box sx={{ pt: 0.1, px: 0.7 }}>
                    <CssVarsProvider>
                      <Textarea
                        // sx={{ height: 100 }}
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
                <Box sx={{ pt: 0.5 }}>
                  <Typography sx={{ color: 'red', fontSize: 11, pl: 2 }}>
                    *Initial Assessment BenchMark Time is 10 min
                  </Typography>
                </Box>
              </Box>
            ) : null}
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
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}

export default memo(EmergencyModalQI)
