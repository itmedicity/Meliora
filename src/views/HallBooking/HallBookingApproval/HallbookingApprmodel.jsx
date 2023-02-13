import { Box, Button, Dialog, DialogActions, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Fragment } from 'react'
import { ToastContainer } from 'react-toastify'
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Slide from '@mui/material/Slide';
import { Paper } from '@material-ui/core';
import { useCallback } from 'react';
import { useEffect } from 'react';
import HallApprovalcmpnt from './HallApprovalcmpnt';
import { axioslogin } from 'src/views/Axios/Axios';
import { succesNotify } from 'src/views/Common/CommonCode';
import TextFieldCustom from 'src/views/Components/TextFieldCustom';
import { useSelector } from 'react-redux';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const HallbookingApprmodel = ({ open, setOpen, isIncharge, ishod, datas, count, setCount }) => {
  const [remark, setRemark] = useState('')
  const updateRemark = useCallback((e) => {
    setRemark(e.target.value)
  }, [])

  const [approve, setApprove] = useState(false)
  const [reject, setReject] = useState(false)
  const updateApprove = useCallback((e) => {
    if (e.target.checked === true) {
      setApprove(true)
      setReject(false)
    }
    else {
      setApprove(false)
      setReject(false)
    }
  }, [])
  const updateReject = useCallback((e) => {
    if (e.target.checked === true) {
      setReject(true)
      setApprove(false)
    }
    else {
      setApprove(false)
      setReject(false)
    }
  }, [])


  const id = useSelector((state) => {
    return state.LoginUserData.empid
  })


  const { h_booking_slno, h_book_attendees, h_book_event, h_book_startdatetime, h_book_enddatetime,
    h_book_slno, h_incharge_remark, hall_name, hod_remark,
    is_hod_approve, is_icharge_approve
  } = datas[0]

  useEffect(() => {
    if ((is_icharge_approve !== null) && (isIncharge === 1)) {
      setRemark(h_incharge_remark)
      setApprove(is_icharge_approve === 1 ? true : false)
      setReject(is_icharge_approve === 0 ? true : false)
    }
    else if ((is_hod_approve !== null) && (ishod === 1)) {
      setRemark(hod_remark)
      setApprove(is_hod_approve === 1 ? true : false)
      setReject(is_hod_approve === 0 ? true : false)
    }
  }, [is_icharge_approve, is_hod_approve, hod_remark, h_incharge_remark, isIncharge, ishod])

  const [inchdate, setInchDate] = useState('')
  const [hodDate, setHodDate] = useState('')

  const updateInchdate = useCallback((e) => {
    setInchDate(e.target.value)
  }, [])
  const updateHodDate = useCallback((e) => {
    setHodDate(e.target.value)
  }, [])

  const submit = useCallback((e) => {
    e.preventDefault();
    const reset = () => {
      setOpen(false)
      setApprove(false)
      setReject(false)
      setRemark('')
    }
    const updateInchApproval = async (patchdatainch) => {
      const result = await axioslogin.patch('/hallBooking/inchargeAppr', patchdatainch);
      const { success, message } = result.data;
      if (success === 2) {
        succesNotify(message)
        setCount(count + 1)
        reset()
      }
    }
    const updatehodApproval = async (patchdatahod) => {
      const result = await axioslogin.patch('/hallBooking/patchHod', patchdatahod);
      const { success, message } = result.data;
      if (success === 2) {
        succesNotify(message)
        setCount(count + 1)
        reset()
      }
    }

    if (isIncharge === 1) {
      const patchdatainch = {
        incharge_approved_date: inchdate !== '' ? inchdate : null,
        h_incharge_remark: remark,
        is_icharge_approve: approve === true ? 1 : 0,
        h_booking_slno: h_booking_slno,
        incharge_user: id

      }
      updateInchApproval(patchdatainch)

    }
    else if (ishod === 1) {
      const patchdatahod = {
        is_hod_approve: approve === true ? 1 : 0,
        hod_remark: remark,
        hod_approved_date: hodDate !== '' ? hodDate : null,
        hod_user: id,
        h_booking_slno: h_booking_slno,
      }
      updatehodApproval(patchdatahod)
    }
  }, [approve, remark, isIncharge, hodDate, ishod, h_booking_slno, count, setCount, inchdate, setOpen, id])

  const Close = useCallback(() => {
    setOpen(false)
    setApprove(false)
    setReject(false)
    setRemark('')
  }, [setOpen])

  return (
    <Fragment>
      <ToastContainer />
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-descriptiona">

        <DialogContent id="alert-dialog-slide-descriptiona"
          sx={{
            width: "100%",
            height: "100%",
            pb: 2
          }}>
          < DialogContentText id="alert-dialog-slide-descriptiona">
            Hallbooking Approval
          </DialogContentText>

          <Box sx={{ width: "100%", height: "100%", display: "flex", p: 1 }}>
            <Paper square elevation={3} sx={{ width: "100%", height: "100%" }}>
              <Box sx={{ p: 2 }}>

                <Grid item xl={12} lg={12} md={12} sm={12}>
                  <Grid container spacing={2}>
                    <Grid item xl={3} lg={3} >
                      <Typography>Hallbooking No:</Typography>
                    </Grid>
                    <Grid item xl={2} lg={2} >
                      <Typography>{h_book_slno}</Typography>
                    </Grid>
                    <Grid item xl={3} lg={3} >
                      <Typography>Hall:</Typography>
                    </Grid>
                    <Grid item xl={3} lg={3} >
                      <Typography>{hall_name}</Typography>
                    </Grid>
                    <Grid item xl={6} lg={6} >
                      <Typography>start time:</Typography>
                    </Grid>
                    <Grid item xl={6} lg={6} >
                      <Typography>{h_book_startdatetime}</Typography>
                    </Grid>
                    <Grid item xl={6} lg={6} >
                      <Typography>End Time:</Typography>
                    </Grid>
                    <Grid item xl={6} lg={6} >
                      <Typography>{h_book_enddatetime}</Typography>
                    </Grid>
                    <Grid item xl={6} lg={6} >
                      <Typography>Event:</Typography>
                    </Grid>
                    <Grid item xl={6} lg={6} >
                      <Typography>{h_book_event}</Typography>
                    </Grid>
                    <Grid item xl={6} lg={6} >
                      <Typography>No.of attendees</Typography>
                    </Grid>
                    <Grid item xl={6} lg={6} >
                      <Typography>{h_book_attendees}</Typography>
                    </Grid>
                    <Grid item xl={6} lg={6} >
                      <Typography>Incharge Appr.Date:</Typography>
                    </Grid>
                    <Grid item xl={6} lg={6} >
                      <TextFieldCustom
                        size="sm"
                        type="datetime-local"
                        name="inchdate"
                        value={inchdate}
                        onchange={updateInchdate}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xl={6} lg={6}>
                    {
                      isIncharge === 1 ?

                        <HallApprovalcmpnt
                          heading="Incharge Approval"
                          approve={approve}
                          reject={reject}
                          remark={remark}
                          updateRemark={updateRemark}
                          updateApprove={updateApprove}
                          updateReject={updateReject}
                        />

                        : ishod === 1 ?
                          <Box sx={{ py: 2 }}>
                            <Grid item xl={3} lg={3} >
                              <Typography>Hod Appr.Date:</Typography>
                            </Grid>
                            <Grid item xl={9} lg={9} >
                              <TextFieldCustom
                                size="sm"
                                type="datetime-local"
                                name="hodDate"
                                value={hodDate}
                                onchange={updateHodDate}
                              />
                            </Grid>
                            <Box sx={{ pt: 1 }}>
                              <HallApprovalcmpnt
                                heading="Hod Approval"
                                approve={approve}
                                reject={reject}
                                remark={remark}
                                updateRemark={updateRemark}
                                updateApprove={updateApprove}
                                updateReject={updateReject}
                              />
                            </Box>
                          </Box>
                          :
                          null
                    }
                  </Grid>
                </Grid>


              </Box>
            </Paper>
          </Box>
        </DialogContent>
        <DialogActions>

          <Button color="secondary" onClick={submit} >Save</Button>
          <Button onClick={Close} color="secondary" >Cancel</Button>
        </DialogActions>

      </Dialog>







    </Fragment>
  )
}

export default HallbookingApprmodel