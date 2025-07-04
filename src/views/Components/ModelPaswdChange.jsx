import React, { Fragment, memo, useCallback, useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import Slide from '@mui/material/Slide'
import { useNavigate } from 'react-router-dom'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
// import { ToastContainer } from 'react-toastify'
import { Box } from '@mui/material'
import { CssVarsProvider, Typography } from '@mui/joy'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import { useSelector } from 'react-redux'
import { axioslogin } from '../Axios/Axios'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import IconButton from '@mui/material/IconButton'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />
})

const ModelPaswdChange = ({ open, handleClose }) => {
  const em_no = useSelector(state => {
    return state.LoginUserData.empno
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfmPassword, setConfmShowPassword] = useState(false)

  const empid = useSelector(state => {
    return state.LoginUserData.empid
  })
  const history = useNavigate()

  const [newPswd, setNewpswd] = useState('')
  const [conNewPswd, setConNewpswd] = useState('')
  const updateNewpswd = useCallback(e => {
    setNewpswd(e.target.value)
  }, [])
  const updateConNewpswd = useCallback(e => {
    setConNewpswd(e.target.value)
  }, [])
  const handleMouseDownPassword = event => {
    event.preventDefault()
  }
  const handleClickShowConfmPassword = useCallback(() => {
    setConfmShowPassword(true)
  }, [])
  const handleClickShowPassword = useCallback(() => {
    setShowPassword(true)
  }, [])

  const reset = () => {
    setNewpswd('')
    setConNewpswd('')
    setConfmShowPassword(false)
    setShowPassword(false)
  }

  const Changepwd = async () => {
    if (newPswd === conNewPswd) {
      const patchdata = {
        emp_no: em_no,
        emp_password: newPswd,
        edit_user: empid,
      }
      const result = await axioslogin.patch('/employee/changepasword', patchdata)
      const { message, success } = result.data
      if (success === 2) {
        succesNotify(message)
        history('/')
        handleClose()
        reset()
        localStorage.clear()
      } else if (success === 0) {
        infoNotify(message)
      } else {
        infoNotify(message)
      }
    } else if (newPswd === '' && conNewPswd === '') {
      infoNotify('Please Enter Password')
    } else {
      infoNotify("The password and confimation fields don't match")
    }
  }

  return (
    <Fragment>
      {/* <ToastContainer /> */}
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
          keepMounted
          aria-describedby="alert-dialog-slide-descriptiona"
        >
          <DialogContent id="alert-dialog-slide-descriptiona">
            <DialogContentText id="alert-dialog-slide-descriptiona">
              Change Password
            </DialogContentText>
          </DialogContent>
          <Box
            sx={{
              width: 500,
              height: 120,
              pl: 2,
              flexDirection: 'column',
            }}
          >
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <Box sx={{ height: 50, width: '40%' }}>
                <CssVarsProvider>
                  <Typography sx={{ fontSize: 15 }}>New Password: </Typography>
                </CssVarsProvider>
              </Box>
              <Box sx={{ height: 50, width: '50%' }}>
                <TextFieldCustom
                  type={showPassword ? 'text' : 'password'}
                  size="sm"
                  name="newPswd"
                  value={newPswd}
                  onchange={updateNewpswd}
                />
              </Box>
              <Box sx={{ height: 50, width: '10%' }}>
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </Box>
            </Box>

            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <Box sx={{ height: 50, width: '40%' }}>
                <CssVarsProvider>
                  <Typography sx={{ fontSize: 15 }}>Confirm New Password: </Typography>
                </CssVarsProvider>
              </Box>
              <Box sx={{ height: 50, width: '50%' }}>
                <TextFieldCustom
                  type={showConfmPassword ? 'text' : 'password'}
                  size="sm"
                  name="conNewPswd"
                  value={conNewPswd}
                  onchange={updateConNewpswd}
                />
              </Box>
              <Box sx={{ height: 50, width: '10%' }}>
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowConfmPassword}
                  edge="end"
                >
                  {showConfmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </Box>
            </Box>
          </Box>
          <DialogActions>
            <Button onClick={Changepwd} color="secondary">
              Save
            </Button>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Fragment>
  )
}

export default memo(ModelPaswdChange)
