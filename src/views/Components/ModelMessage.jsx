import React, { Fragment, memo } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import Slide from '@mui/material/Slide'
import { useNavigate } from 'react-router-dom'
import { infoNotify } from 'src/views/Common/CommonCode'
// import { ToastContainer } from 'react-toastify'
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />
})

const ModelMessage = ({ open, handleClose }) => {
  const history = useNavigate()
  const logoutmodel = () => {
    localStorage.clear()
    infoNotify('You Are Logged Out Successfully')
    history('/')
  }
  return (
    <Fragment>
      {/* <ToastContainer /> */}
      {/* <div> */}
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
            maxWidth: 400
          }}
        >
          <DialogContentText id="alert-dialog-slide-descriptiona">Are you sure to logout</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={logoutmodel} color="secondary">
            Logout
          </Button>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      {/* </div> */}
    </Fragment>
  )
}

export default memo(ModelMessage)
