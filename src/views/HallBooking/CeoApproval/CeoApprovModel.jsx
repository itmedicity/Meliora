import React, { Fragment, useCallback, useState, memo } from 'react'
import Slide from '@mui/material/Slide';
// import { ToastContainer } from 'react-toastify';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { Box, Grid, Paper, Typography } from '@mui/material'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import { axioslogin } from 'src/views/Axios/Axios'
import { succesNotify } from 'src/views/Common/CommonCode'
import { useMemo } from 'react'
import HallApprovalcmpnt from '../HallBookingApproval/HallApprovalcmpnt'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import { useSelector } from 'react-redux'
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />
})

const CEOApprovalModel = ({ open, setOpen, datas, count, setCount }) => {
  const [ceodate, setceodate] = useState('')
  const [remark, setRemark] = useState('')
  const updateRemark = useCallback(e => {
    setRemark(e.target.value)
  }, [])

  const updateCeodate = useCallback(e => {
    setceodate(e.target.value)
  }, [])

  const [approve, setApprove] = useState(false)
  const [reject, setReject] = useState(false)
  const updateApprove = useCallback(e => {
    if (e.target.checked === true) {
      setApprove(true)
      setReject(false)
    } else {
      setApprove(false)
      setReject(false)
    }
  }, [])
  const updateReject = useCallback(e => {
    if (e.target.checked === true) {
      setReject(true)
      setApprove(false)
    } else {
      setApprove(false)
      setReject(false)
    }
  }, [])

  const id = useSelector(state => {
    return state.LoginUserData.empid
  })

  const {
    h_approval_slno,
    h_book_attendees,
    h_book_event,
    h_book_startdatetime,
    h_book_enddatetime,
    h_book_slno,
    hall_name,
    is_ceo_approved,
  } = datas[0]

  const patchdataCAO = useMemo(() => {
    return {
      is_ceo_approved: is_ceo_approved !== 'not updated' ? 1 : 0,
      ceo_remark: remark,
      h_approval_slno: h_approval_slno,
      ceo_user: id,
      ceo_approved_date: ceodate !== '' ? ceodate : null,
    }
  }, [is_ceo_approved, remark, h_approval_slno, ceodate, id])

  const submit = useCallback(
    e => {
      e.preventDefault()
      const reset = () => {
        setOpen(false)
        setApprove(false)
        setReject(false)
        setRemark('')
      }
      const updateInchApproval = async patchdataCAO => {
        const result = await axioslogin.patch('/hallBooking/ceopproval', patchdataCAO)
        const { success, message } = result.data
        if (success === 2) {
          succesNotify(message)
          setCount(count + 1)
          reset()
        }
      }
      updateInchApproval(patchdataCAO)
    },
    [patchdataCAO, count, setCount, setOpen]
  )
  const Close = useCallback(() => {
    setOpen(false)
    setApprove(false)
    setReject(false)
    setRemark('')
    setceodate('')
  }, [setOpen])


  return (
    <Fragment>
      {/* <ToastContainer /> */}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-descriptiona"
      >
        <DialogContent
          id="alert-dialog-slide-descriptiona"
          sx={{
            width: '100%',
            height: '100%',
            pb: 2,
          }}
        >
          <DialogContentText id="alert-dialog-slide-descriptiona">
            Hallbooking Approval
          </DialogContentText>

          <Box sx={{ width: '100%', height: '100%', display: 'flex', p: 1 }}>
            <Paper square elevation={3} sx={{ width: '100%', height: '100%' }}>
              <Box sx={{ p: 2 }}>
                <Grid item xl={12} lg={12} md={12} sm={12}>
                  <Grid container spacing={2}>
                    <Grid item xl={3} lg={3}>
                      <Typography>Hallbooking No:</Typography>
                    </Grid>
                    <Grid item xl={2} lg={2}>
                      <Typography>{h_book_slno}</Typography>
                    </Grid>
                    <Grid item xl={3} lg={3}>
                      <Typography>Hall:</Typography>
                    </Grid>
                    <Grid item xl={3} lg={3}>
                      <Typography>{hall_name}</Typography>
                    </Grid>
                    <Grid item xl={6} lg={6}>
                      <Typography>start time:</Typography>
                    </Grid>
                    <Grid item xl={6} lg={6}>
                      <Typography>{h_book_startdatetime}</Typography>
                    </Grid>
                    <Grid item xl={6} lg={6}>
                      <Typography>End Time:</Typography>
                    </Grid>
                    <Grid item xl={6} lg={6}>
                      <Typography>{h_book_enddatetime}</Typography>
                    </Grid>
                    <Grid item xl={6} lg={6}>
                      <Typography>Event:</Typography>
                    </Grid>
                    <Grid item xl={6} lg={6}>
                      <Typography>{h_book_event}</Typography>
                    </Grid>
                    <Grid item xl={6} lg={6}>
                      <Typography>No.of attendees</Typography>
                    </Grid>
                    <Grid item xl={6} lg={6}>
                      <Typography>{h_book_attendees}</Typography>
                    </Grid>

                    <Grid item xl={6} lg={6}>
                      <Typography>CEO Appr.Date:</Typography>
                    </Grid>
                    <Grid item xl={6} lg={6}>
                      <TextFieldCustom
                        size="sm"
                        type="datetime-local"
                        name="ceodate"
                        value={ceodate}
                        onchange={updateCeodate}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xl={6} lg={6}>
                    <Box sx={{ p: 1 }}>
                      <HallApprovalcmpnt
                        heading="CAO Approval"
                        approve={approve}
                        reject={reject}
                        remark={remark}
                        updateRemark={updateRemark}
                        updateApprove={updateApprove}
                        updateReject={updateReject}
                      ></HallApprovalcmpnt>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={submit}>save</Button>
          <Button onClick={Close}>close</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

export default memo(CEOApprovalModel)
