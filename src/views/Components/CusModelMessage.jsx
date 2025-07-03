import React, { Fragment, memo } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import Slide from '@mui/material/Slide'
import { ToastContainer } from 'react-toastify'
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />
})

const CusModelMessage = ({ open, handleClose, message, submitDiettype }) => {
  return (
    <Fragment>
      <ToastContainer />

      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-descriptiona"
      >
        <DialogContent
          sx={{
            minWidth: 400,
            maxWidth: 400,
          }}
        >
          <DialogContentText id="alert-dialog-slide-descriptiona">{message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={submitDiettype} color="secondary">
            Yes
          </Button>
          <Button onClick={handleClose} color="secondary">
            No
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

export default memo(CusModelMessage)
