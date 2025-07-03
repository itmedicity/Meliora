import React, { Fragment, useEffect, useState } from 'react'
// import { CssVarsProvider, Modal, ModalClose, ModalDialog, Box, Typography, Checkbox, Button, Textarea, Chip, Tooltip, Input } from '@mui/joy'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box, Dialog, DialogContent, Paper, TextField, Tooltip, Typography } from '@mui/material'
import { DateTimePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns'

const DialysisModalQIMark = ({ open, handleClose, rowSelect }) => {
  const {
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
  const [enteredTime, setEnteredTime] = useState(new Date())
  const [assesTime, setAssesTime] = useState(new Date())
  const [startTime, setStartTime] = useState(new Date())
  const [endTime, setEndTime] = useState(new Date())
  const [totAsessTime, setTotAsessTime] = useState('')
  const [totProceTime, setTotProceTime] = useState('')
  const [serviceTime, setServiceTime] = useState(0)

  // useEffect(() => {
  //     if (rowSelect.length !== 0) {
  //         const { triage_time, assess_time, return_status } = rowSelect
  //         setReturnYes(return_status === 1 ? true : false)
  //         setReturnNo(return_status === 0 ? true : false)
  //         setTriageTime(triage_time === null ? format(addMinutes(new Date(patient_arrived_date), 5), 'yyyy-MM-dd HH:mm:ss') : triage_time)
  //         setAssessTime(assess_time === null ? format(addMinutes(new Date(patient_arrived_date), 20), 'yyyy-MM-dd HH:mm:ss') : assess_time)
  //     }
  // }, [rowSelect, patient_arrived_date])
  useEffect(() => {
    const hours = differenceInHours(new Date(assesTime), new Date(enteredTime))
    const minutes = differenceInMinutes(new Date(assesTime), new Date(enteredTime)) % 60
    const seconds = differenceInSeconds(new Date(assesTime), new Date(enteredTime)) % 60
    setTotAsessTime(`${hours} hr ${minutes} min ${seconds} sec`)
  }, [assesTime, enteredTime])
  useEffect(() => {
    const hours = differenceInHours(new Date(endTime), new Date(enteredTime))
    const minutes = differenceInMinutes(new Date(endTime), new Date(enteredTime)) % 60
    const seconds = differenceInSeconds(new Date(endTime), new Date(enteredTime)) % 60
    setTotProceTime(`${hours} hr ${minutes} min ${seconds} sec`)

    // tot service time per patient
    const totMinutes = hours * 60 + minutes
    setServiceTime(totMinutes)
  }, [endTime, enteredTime])

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
            overflowX: 'auto',
          }}
        >
          <Paper sx={{ display: 'flex', height: 40 }}>
            <Box sx={{ display: 'flex', flex: 1 }}>
              <Box sx={{ fontSize: 15, pt: 1, pl: 2 }}>{ptno}</Box>
              <Box sx={{ fontSize: 15, pt: 1, pl: 2 }}>
                {ptname
                  .toLowerCase()
                  .split(' ')
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ')}
              </Box>
              <Box sx={{ fontSize: 15, pt: 1, pl: 2 }}>
                {ptage}/{ptsex}
              </Box>
              <Box sx={{ fontSize: 15, pt: 1, pl: 2 }}>
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
              <Box sx={{ fontSize: 15, pt: 1, pl: 2 }}>{ptmobile}</Box>
              <Box sx={{ fontSize: 15, pt: 1, pl: 2 }}>
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
                  sx={{ cursor: 'pointer', height: 34, width: 34, opacity: 0.7 }}
                  onClick={handleClose}
                />
              </Tooltip>
            </Box>
          </Paper>
          <Box sx={{ overflow: 'auto', pb: 1 }}>
            <Box sx={{ pt: 1, pl: 1 }}>
              <Box>
                <Typography sx={{ fontSize: 13, fontWeight: 550, textTransform: 'uppercase' }}>
                  Time Taken for initial assessment in dialysis{' '}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', pt: 1 }}>
                <Box sx={{ flex: 1 }}>
                  <Box sx={{}}>
                    <Typography sx={{ fontSize: 12, pl: 0.5, textTransform: 'uppercase' }}>
                      Received The Patient From HDU
                    </Typography>
                  </Box>
                  <Box sx={{ pt: 0.5, pl: 1.5 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateTimePicker
                        value={enteredTime}
                        views={['year', 'month', 'day', 'hours', 'minutes']}
                        size="small"
                        inputFormat="DD-MM-YYYY hh:mm:ss"
                        minDate={new Date(patient_arrived_date)}
                        maxDate={new Date(patient_arrived_date)}
                        onChange={newValue => {
                          setEnteredTime(newValue)
                        }}
                        renderInput={params => (
                          <TextField
                            {...params}
                            helperText={null}
                            size="small"
                            fullWidth
                            sx={{ bgcolor: 'white', pt: 0.5 }}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </Box>
                </Box>
                <Box sx={{ flex: 1, pl: 0.5 }}>
                  <Box sx={{}}>
                    <Typography sx={{ fontSize: 12, pl: 0.5, textTransform: 'uppercase' }}>
                      Initial assessment time
                    </Typography>
                  </Box>
                  <Box sx={{ pt: 0.5, pl: 1.5 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateTimePicker
                        value={assesTime}
                        views={['year', 'month', 'day', 'hours', 'minutes']}
                        size="small"
                        inputFormat="DD-MM-YYYY hh:mm:ss"
                        minDate={new Date(patient_arrived_date)}
                        maxDate={new Date(patient_arrived_date)}
                        onChange={newValue => {
                          setAssesTime(newValue)
                        }}
                        renderInput={params => (
                          <TextField
                            {...params}
                            helperText={null}
                            size="small"
                            fullWidth
                            sx={{ bgcolor: 'white', pt: 0.5 }}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </Box>
                </Box>
                <Box sx={{ flex: 1, pl: 0.5 }}>
                  <Box sx={{}}>
                    <Typography sx={{ fontSize: 12, pl: 0.5, textTransform: 'uppercase' }}>
                      Procedure Start Time
                    </Typography>
                  </Box>
                  <Box sx={{ pt: 0.5, pl: 1.5 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateTimePicker
                        value={startTime}
                        views={['year', 'month', 'day', 'hours', 'minutes']}
                        size="small"
                        inputFormat="DD-MM-YYYY hh:mm:ss"
                        minDate={new Date(patient_arrived_date)}
                        maxDate={new Date(patient_arrived_date)}
                        onChange={newValue => {
                          setStartTime(newValue)
                        }}
                        renderInput={params => (
                          <TextField
                            {...params}
                            helperText={null}
                            size="small"
                            fullWidth
                            sx={{ bgcolor: 'white', pt: 0.5 }}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', pt: 1 }}>
                <Box sx={{ flex: 1 }}>
                  <Box sx={{}}>
                    <Typography sx={{ fontSize: 12, pl: 0.5, textTransform: 'uppercase' }}>
                      Procedure End Time
                    </Typography>
                  </Box>
                  <Box sx={{ pt: 0.5, pl: 1.5 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateTimePicker
                        value={endTime}
                        views={['year', 'month', 'day', 'hours', 'minutes']}
                        size="small"
                        inputFormat="DD-MM-YYYY hh:mm:ss"
                        minDate={new Date(patient_arrived_date)}
                        maxDate={new Date(patient_arrived_date)}
                        onChange={newValue => {
                          setEndTime(newValue)
                        }}
                        renderInput={params => (
                          <TextField
                            {...params}
                            helperText={null}
                            size="small"
                            fullWidth
                            sx={{ bgcolor: 'white', pt: 0.5 }}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </Box>
                </Box>
                <Box sx={{ flex: 1, pl: 0.5 }}>
                  <Box sx={{}}>
                    <Typography sx={{ fontSize: 12, pl: 0.5, textTransform: 'uppercase' }}>
                      SUM OF TIME TAKEN FOR ASSESSMENT
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'center', pt: 0.5, pl: 1.5 }}>
                    <Box
                      sx={{
                        flex: 1,
                        bgcolor: 'white',
                        height: 41,
                        pt: 1,
                        mr: 0.6,
                        pl: 3,
                        boxShadow: 1,
                      }}
                    >
                      {totAsessTime}
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ flex: 1, pl: 0.5 }}>
                  <Box sx={{}}>
                    <Typography sx={{ fontSize: 12, pl: 0.5, textTransform: 'uppercase' }}>
                      Procedure Start Time
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'center', pt: 0.5, pl: 1.5 }}>
                    <Box
                      sx={{
                        flex: 1,
                        bgcolor: 'white',
                        height: 41,
                        pt: 1,
                        mr: 0.6,
                        pl: 3,
                        boxShadow: 1,
                      }}
                    >
                      {totProceTime}
                    </Box>
                  </Box>
                </Box>
                {/* delete */}
                <Box sx={{ flex: 1, pl: 0.5 }}>
                  <Box sx={{}}>
                    <Typography sx={{ fontSize: 12, pl: 0.5, textTransform: 'uppercase' }}>
                      Procedure Start Time
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'center', pt: 0.5, pl: 1.5 }}>
                    <Box
                      sx={{
                        flex: 1,
                        bgcolor: 'white',
                        height: 41,
                        pt: 1,
                        mr: 0.6,
                        pl: 3,
                        boxShadow: 1,
                      }}
                    >
                      {serviceTime}
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}

export default DialysisModalQIMark

//     < CssVarsProvider >
//     <Modal
//         aria-labelledby="modal-title"
//         aria-describedby="modal-desc"
//         open={open}
//         onClose={handleClose}
//         sx={{ display: 'flex', justifyContent: 'center' }}
//     >
//         <ModalDialog
//             variant="outlined"
//             sx={{
//                 width: '45vw',
//             }}
//         >
//             <ModalClose
//                 variant="outlined"
//                 sx={{
//                     top: 'calc(-1/4 * var(--IconButton-size))',
//                     right: 'calc(-1/4 * var(--IconButton-size))',
//                     boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
//                     borderRadius: '50%',
//                     bgcolor: 'background.body',
//                     color: '#bf360c',
//                     height: 35, width: 35
//                 }}
//             />
//             <Box sx={{ display: 'flex', height: 40 }}>
//                 <Box sx={{ display: 'flex', flex: 1 }}>
//                     <Box sx={{ fontSize: 15, pt: 1,  pl: 2 }}>
//                         {ptno}
//                     </Box>
//                     <Box sx={{ fontSize: 15, pt: 1,  pl: 2 }}>
//                         {ptname.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
//                     </Box>
//                     <Box sx={{ fontSize: 15, pt: 1,  pl: 2 }}>
//                         {ptage}/{ptsex}
//                     </Box>
//                     <Box sx={{ fontSize: 15, pt: 1,  pl: 2 }}>
//                         {ptaddrs1.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
//                         {ptaddrs3 === null ? '' :
//                             ',' + ptaddrs3.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
//                     </Box>
//                     <Box sx={{ fontSize: 15, pt: 1,  pl: 2 }}>
//                         {ptmobile}
//                     </Box>
//                     <Box sx={{ fontSize: 15, pt: 1,  pl: 2 }}>
//                         {"Dr. " + doctor_name.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
//                     </Box>
//                 </Box>
//             </Box>
//             <Box sx={{}}>
//                 <Box sx={{ display: 'flex' }}>
//                     <Box sx={{ flex: 2, pl: 2, pt: 0.5 }}>
//                         <Typography sx={{ fontSize: 12, fontWeight: 550, textTransform: 'uppercase' }}>
//                             Time Taken for initial assessment in dialysis </Typography>
//                     </Box>
//                     <Typography>: </Typography>
//                     <Box sx={{ flex: 1, pl: 0.5 }}>
//                         <Box sx={{ pl: 0.5, py: 0.5 }}>
//                             <Typography sx={{ fontSize: 11, textTransform: 'uppercase' }}>Patient Entered Time in Dialysis Unit</Typography>
//                         </Box>
//                         <Box sx={{ pr: 0.5, pl: 1 }} >

//                             <Box sx={{ flex: 1, px: 0.5, }} >
//                                 <LocalizationProvider dateAdapter={AdapterDateFns}>
//                                     <DatePicker
//                                         views={['day']}
//                                         // minDate={subMonths(new Date(), 1)}
//                                         // maxDate={addMonths(new Date(), 1)}
//                                         value={enteredTime}
//                                         size="small"
//                                         onChange={(newValue) => {
//                                             setEnteredTime(newValue);
//                                         }}
//                                         renderInput={({ inputRef, inputProps, InputProps }) => (
//                                             <Box sx={{ display: 'flex', alignItems: 'center', }}>
//                                                 <CssVarsProvider>
//                                                     <Input ref={inputRef} {...inputProps} style={{ width: '80%' }} disabled={true} />
//                                                 </CssVarsProvider>
//                                                 {InputProps?.endAdornment}
//                                             </Box>
//                                         )}
//                                     />
//                                 </LocalizationProvider>
//                             </Box>

//                             {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
//                                             <DatePicker
//                                                 value={enteredTime}
//                                                 onChange={(e) => { setEnteredTime(e) }}
//                                                 renderInput={(params) => <TextField{...params} />}
//                                             />
//                                         </LocalizationProvider> */}

//                             {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
//                                             <DatePicker
//                                                 value={assesTime}
//                                                 views={['year', 'month', 'day', 'hours', 'minutes']}
//                                                 size="small"
//                                                 inputFormat='DD-MM-YYYY hh:mm:ss'
//                                                 minDate={new Date(patient_arrived_date)}
//                                                 maxDate={new Date(patient_arrived_date)}
//                                                 onChange={(newValue) => {
//                                                     setassesTime(newValue);
//                                                 }}
//                                                 renderInput={(params) => (
//                                                     <TextField {...params} helperText={null} size='small' fullWidth
//                                                         sx={{ bgcolor: 'white', pt: 0.5 }}
//                                                     />
//                                                 )}
//                                             />
//                                         </LocalizationProvider> */}
//                         </Box>
//                     </Box>
//                 </Box>
//                 <Box sx={{ display: 'flex' }}>
//                     <Box sx={{ flex: 2, pl: 2, pt: 0.5 }}>
//                         <Typography sx={{ fontSize: 12, fontWeight: 550, textTransform: 'uppercase' }}>
//                             Time Taken for initial assessment in dialysis </Typography>
//                     </Box>
//                     <Typography>: </Typography>
//                     <Box sx={{ flex: 1, display: 'flex', pl: 1 }}>
//                         <Box sx={{ pt: 0.6 }}>
//                             <CssVarsProvider>
//                                 <Checkbox
//                                     color="primary"
//                                     size="md"
//                                 // checked={returnYes}
//                                 // onChange={ChangeReturnYes}
//                                 />
//                             </CssVarsProvider>
//                         </Box>
//                         <Box sx={{ pl: 1, pt: 0.3 }}>
//                             <Typography sx={{ fontSize: 16 }}>
//                                 Yes
//                             </Typography>
//                         </Box>
//                         <Box sx={{ pt: 0.6, pl: 2 }}>
//                             <CssVarsProvider>
//                                 <Checkbox
//                                     color="primary"
//                                     size="md"
//                                 // checked={returnNo}
//                                 // onChange={ChangeReturnNo}
//                                 />
//                             </CssVarsProvider>
//                         </Box>
//                         <Box sx={{ pl: 1, pt: 0.3 }}>
//                             <Typography sx={{ fontSize: 16 }}>
//                                 No
//                             </Typography>
//                         </Box>
//                     </Box>
//                 </Box>
//             </Box>
//             <Box sx={{ display: 'flex', justifyContent: 'flex-end', pb: 1 }}>
//                 <CssVarsProvider>
//                     <Button variant='plain'
//                         // onClick={UpdateincidetData}
//                         style={{ fontSize: 17, color: 'darkgreen', cursor: 'pointer' }}>Save</Button>
//                     <Button variant='plain'
//                         // onClick={Reset}
//                         style={{ fontSize: 17, color: '#bf360c', cursor: 'pointer' }}>
//                         Cancel</Button>
//                 </CssVarsProvider>
//             </Box>
//         </ModalDialog>

//     </Modal>
//             </CssVarsProvider >
