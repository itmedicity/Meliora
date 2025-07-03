import React, { Fragment, useCallback, useState, memo, useMemo } from 'react'
import Slide from '@mui/material/Slide';
// import { ToastContainer } from 'react-toastify';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { Box, Grid, Paper, Typography } from '@mui/material'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
// import TextFieldCustom from '../Components/TextFieldCustom';
import CusCheckBox from '../Components/CusCheckBox'
import SelectDiet from '../CommonSelectCode/SelectDiet'
import { format } from 'date-fns'
import { infoNotify, succesNotify } from '../Common/CommonCode'
import { axioslogin } from '../Axios/Axios'
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />
})
const DietApprovalModel = ({ open, setOpen, data, count, setCount }) => {
  // destructuring props and set in typography
  const { pt_no, ptc_ptname, dietpt_slno, plan_remark, plan_slno, bdc_no, diet_name, diet_slno } =
    data
  //state for check boxes
  const [approve, updateaproves] = useState(false)
  const [dietplan, updateDietplan] = useState(false)
  //state for diet select box display
  const [bc, setBc] = useState(0)
  //state for diet select box
  const [value, setValue] = useState(0)
  //function for checkboxes
  const checkapprove = useCallback(e => {
    if (e.target.checked === true) {
      updateaproves(true)
      setBc(0)
      updateDietplan(false)
    } else {
      updateaproves(false)
      setBc(0)
    }
  }, [])
  //function for checkboxes
  const checkdietplan = useCallback(e => {
    if (e.target.checked === true) {
      updateDietplan(true)
      updateaproves(false)
      setBc(1)
    } else {
      updateDietplan(false)
      setBc(0)
    }
  }, [])
  // reset
  const Close = useCallback(() => {
    setOpen(false)
    updateDietplan(false)
    updateaproves(false)
    setBc(0)
    setValue(0)
  }, [setOpen])
  //data setting
  const postdata = useMemo(() => {
    return {
      diet_slno: approve === true ? diet_slno : value, // on approve click set current diet if any change in diet  set new value
      plan_appr_time: format(new Date(), 'yyy-MM-dd hh:mm:ss'),
      plan_status: 1,
      process: 1,
      plan_slno: plan_slno,
    }
  }, [value, plan_slno, diet_slno, approve])
  //by saving it will update  paln status 1
  const submit = useCallback(
    e => {
      e.preventDefault()
      const InsertFun = async postdata => {
        const result = await axioslogin.patch('/dietplan/approval', postdata)
        const { message, success } = result.data
        if (success === 1) {
          succesNotify(message)
          setCount(count + 1)
          Close()
        } else if (success === 0) {
          infoNotify(message)
        } else {
          infoNotify(message)
        }
      }
      if (approve === true || dietplan === true) {
        InsertFun(postdata)
      } else {
        infoNotify('Please Approve')
      }
    },
    [postdata, count, setCount, Close, approve, dietplan]
  )
  return (
    <Fragment>
      {/* <ToastContainer /> */}
      <div>
        <Dialog
          open={open}
          onClose={Close}
          TransitionComponent={Transition}
          keepMounted
          aria-describedby="alert-dialog-slide-descriptiona"
        >
          <DialogContent
            id="alert-dialog-slide-descriptiona"
            sx={{
              width: 600,
              height: 470,
            }}
          >
            <DialogContentText id="alert-dialog-slide-descriptiona">
              Diet Approval
            </DialogContentText>
            <Box sx={{ width: '100%', height: '100%', display: 'flex', p: 1 }}>
              <Paper square elevation={3} sx={{ width: '100%', height: '100%' }}>
                <Box sx={{ p: 4 }}>
                  <Grid item xl={12} lg={12}>
                    <Grid container spacing={2}>
                      <Grid item xl={6} lg={6}>
                        <Typography>Diet Number:</Typography>
                      </Grid>
                      <Grid item xl={6} lg={6}>
                        <Typography>{dietpt_slno}</Typography>
                      </Grid>
                      <Grid item xl={6} lg={6}>
                        <Typography>Patient No:</Typography>
                      </Grid>
                      <Grid item xl={6} lg={6}>
                        <Typography>{pt_no}</Typography>
                      </Grid>
                      <Grid item xl={6} lg={6}>
                        <Typography>Patient Name:</Typography>
                      </Grid>
                      <Grid item xl={6} lg={6}>
                        <Typography>{ptc_ptname}</Typography>
                      </Grid>
                      <Grid item xl={6} lg={6}>
                        <Typography>Bed</Typography>
                      </Grid>
                      <Grid item xl={6} lg={6}>
                        <Typography>{bdc_no}</Typography>
                      </Grid>
                      <Grid item xl={6} lg={6}>
                        <Typography>Diet</Typography>
                      </Grid>
                      <Grid item xl={6} lg={6}>
                        <Typography>{diet_name}</Typography>
                      </Grid>
                      <Grid item xl={6} lg={6}>
                        <Typography>Remarks</Typography>
                      </Grid>
                      <Grid item xl={6} lg={6}>
                        <Typography>{plan_remark}</Typography>
                      </Grid>
                      <Grid item xl={6} lg={6}>
                        <CusCheckBox
                          label="Approve"
                          color="primary"
                          size="md"
                          name="approve"
                          value={approve}
                          checked={approve}
                          onCheked={checkapprove}
                        />
                      </Grid>
                      <Grid item xl={6} lg={6}>
                        <CusCheckBox
                          label="Change Dietplan"
                          color="primary"
                          size="md"
                          name="dietplan"
                          value={dietplan}
                          checked={dietplan}
                          onCheked={checkdietplan}
                        />
                      </Grid>
                      <Grid item xl={6} lg={6}>
                        {bc === 1 ? <SelectDiet value={value} setValue={setValue} /> : null}
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button color="secondary" onClick={submit}>
              Save
            </Button>
            <Button onClick={Close} color="secondary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Fragment>
  )
}
export default memo(DietApprovalModel)
