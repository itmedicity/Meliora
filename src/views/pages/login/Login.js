import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { axioslogin } from 'src/views/Axios/Axios'
import { errorNotify, infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import { useDispatch } from 'react-redux'
import { ActionTyps } from 'src/redux/constants/action.type'
import { ToastContainer } from 'react-toastify'
import { setLoginProfileData } from 'src/redux/actions/LoginProfile.action'
import DetailWorng from 'src/views/dashboard/DetailWorng'
// import { Box } from '@mui/material'

import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import InputAdornment from '@mui/material/InputAdornment'

import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'

const val = false

const Login = () => {
  const { FETCH_LOGIN } = ActionTyps
  const history = useNavigate()
  const dispatch = useDispatch()
  const [emp_username, setUsername] = useState('')
  const [emp_password, setPassword] = useState('')

  const useLoginDetl = {
    emp_username: emp_username,
    emp_password: emp_password,
  }
  const [flag, setFlag] = useState(0)
  const submitLoginDetl = async (e) => {
    e.preventDefault()
    if (emp_username === '') {
      infoNotify('Username Feild Is Blank')
    } else if (emp_password === '') {
      infoNotify('Password Feild Is Blank')
    } else {
      const result = await axioslogin
        .post('/employee/login', useLoginDetl)
        .then((response) => {
          return response
        })
        .catch((error) => {
          return error
        })
      const data = result.data

      if (data.success === 0) {
        errorNotify('User does not exsit')
      } else {
        succesNotify('Loggined successfully')
        const loggedDetl = {
          user: data.user,
          token: data.token,
          empno: data.emp_no,
          empid: data.emp_id,
          empname: data.emp_name,
          empdeptsec: data.emp_sec,
          empsecid: data.emp_secid,
          empdept: data.emp_dept,
          empdeptname: data.dept_name,
          apptoken: data.app_token,
          logOut: data.logOutTime,
          designation: data.desg_name,
        }
        if (loggedDetl.empname !== null) {
          dispatch({ type: FETCH_LOGIN, payload: loggedDetl })
          const loggedCredential = sessionStorage.setItem('userDetl', JSON.stringify(loggedDetl))
          dispatch(setLoginProfileData(data.emp_id))
          if (loggedCredential !== null) {
            history('/Home')
          }
        } else {
          setFlag(1)
          //history.push("/NotCorect")
        }
      }
    }
  }

  return (
    // <div
    //   className=" min-vh-100 d-flex flex-row align-items-center"
    //   style={{ backgroundColor: '#e0f2f1' }}
    // >
    //   <ToastContainer />

    //   {flag === 1 ? (
    //     <DetailWorng />
    //   ) : (
    //     <CContainer>
    //       <CRow className="justify-content-center">
    //         <CCol md={8} sm={12}>
    //           <CCardGroup>
    //             <CCard
    //               className="p-4"
    //               style={{ borderTopLeftRadius: 15, borderBottomLeftRadius: 15 }}
    //             >
    //               <CCardBody>
    //                 <CForm onSubmit={submitLoginDetl}>
    //                   <h1 style={{ fontFamily: 'cursive', color: '#71c142' }}>Login</h1>
    //                   <p className="text-medium-emphasis" style={{ fontFamily: 'monospace' }}>
    //                     Sign In to your account
    //                   </p>
    //                   <CInputGroup className="mb-3" style={{ borderColor: '#71c142' }}>
    //                     <CInputGroupText
    //                       style={{ backgroundColor: '#707377', borderColor: '#71c142' }}
    //                     >
    //                       <PersonOutlineOutlinedIcon style={{ color: '#71c142' }} />
    //                     </CInputGroupText>
    //                     <CFormInput
    //                       placeholder="Username"
    //                       autoComplete="username"
    //                       name="username"
    //                       onChange={(e) => {
    //                         setUsername(e.target.value)
    //                       }}
    //                       style={{ fontFamily: 'cursive', borderColor: '#71c142' }}
    //                     />
    //                   </CInputGroup>
    //                   <CInputGroup className="mb-4" style={{ borderColor: '#71c142' }}>
    //                     <CInputGroupText
    //                       style={{ backgroundColor: '#707377', borderColor: '#71c142' }}
    //                     >
    //                       <LockOutlinedIcon style={{ color: '#71c142', borderColor: '#71c142' }} />
    //                     </CInputGroupText>
    //                     <CFormInput
    //                       type="password"
    //                       placeholder="Password"
    //                       autoComplete="current-password"
    //                       name="password"
    //                       onChange={(e) => {
    //                         setPassword(e.target.value)
    //                       }}
    //                       style={{ fontFamily: 'cursive', borderColor: '#71c142' }}
    //                     />
    //                   </CInputGroup>
    //                   <CRow>
    //                     <CCol xs={6}>
    //                       <CButton
    //                         className="px-4"
    //                         type="submit"
    //                         style={{
    //                           backgroundColor: '#71c142',
    //                           fontFamily: 'cursive',
    //                           borderColor: '#71c142',
    //                         }}
    //                       >
    //                         Login
    //                       </CButton>
    //                     </CCol>
    //                     <CCol xs={6} className="text-right">
    //                       <CButton
    //                         color="link"
    //                         className="px-0"
    //                         style={{ color: '#71c142', fontFamily: 'cursive' }}
    //                       >
    //                         Forgot password?
    //                       </CButton>
    //                     </CCol>
    //                   </CRow>
    //                 </CForm>
    //               </CCardBody>
    //             </CCard>
    //             <CCard
    //               className="text-white py-5"
    //               style={{
    //                 width: '100%',
    //                 backgroundColor: '#494c4f',
    //                 borderTopRightRadius: 15,
    //                 borderBottomRightRadius: 15,
    //               }}
    //             >
    //               <CCardBody className="text-center">
    //                 <div style={{ fontFamily: 'monospace' }}>
    //                   <h2>Meliora</h2>
    //                   <h6>Hospital Administration Management System </h6>
    //                   <h6>Hi, Welcome Back</h6>
    //                   <p>Enter your credentials to continue</p>
    //                 </div>
    //               </CCardBody>
    //             </CCard>
    //           </CCardGroup>
    //         </CCol>
    //       </CRow>
    //     </CContainer>
    //   )}
    // </div>
    <Box
      sx={{
        height: '100vh',
        width: '100%',
        backgroundColor: 'var(--royal-purple-50)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          minWidth: 'var(--login-container-width)',
          minHeight: 'var(--login-container-height)',
          margin: '0 auto',
          padding: 5,
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: '#f2f2f2',
          borderRadius: 5,
        }}
      >
        <Box
          sx={{
            // gap: 1.5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mb: 5,
          }}
        >
          <Typography
            sx={{ color: 'var(--dark-gray)', fontFamily: 'var(--roboto-font)', fontWeight: 600 }}
          >
            Sign in
          </Typography>
          <Typography
            // variant="body2"
            sx={{
              color: 'var(--light-gray)',
              fontFamily: 'var(--roboto-font)',
              fontWeight: 500,
              fontSize: '0.8rem',
            }}
          >
            Welcome to
            <Link
              sx={{
                ml: 0.5,
                fontFamily: 'var(--roboto-font)',
                color: 'var(--royal-purple-400)',
                fontWeight: 900,
              }}
            >
              Meliora
            </Link>
          </Typography>
          <Typography
            // variant="body2"
            sx={{
              color: 'var(--light-gray)',
              fontFamily: 'var(--roboto-font)',
              fontWeight: 500,
              fontSize: '0.8rem',
            }}
          >
            Hospital Administration Management System
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-end',
            flexDirection: 'column',
          }}
        >
          <TextField
            fullWidth
            size="small"
            name="email"
            label="user name/code"
            autoComplete="off"
            defaultValue=""
            sx={{ mb: 3 }}
            onChange={(e) => {
              setUsername(e.target.value)
            }}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            fullWidth
            name="password"
            label="Passcode"
            size="small"
            defaultValue=""
            autoComplete="off"
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            type={val ? 'text' : 'password'}
            InputLabelProps={{ shrink: true }} // ✅ For shrinking label
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => {}} edge="start">
                    <RemoveRedEyeOutlinedIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ mb: 3 }}
          />

          <Button
            fullWidth
            size="large"
            // color="inherit"
            variant="outlined"
            onClick={submitLoginDetl}
          >
            <Typography>Sign in</Typography>
          </Button>
        </Box>

        <Divider sx={{ my: 3, '&::before, &::after': { borderTopStyle: 'dashed' } }}>
          <Typography
            variant="overline"
            sx={{ color: 'text.secondary', fontWeight: 'fontWeightMedium' }}
          >
            OR
          </Typography>
        </Divider>
        <Box
          sx={{
            gap: 1,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Link variant="body2" color="inherit" sx={{ mb: 1.5 }}>
            Forgot password?
          </Link>
          {/* 
          <IconButton color="inherit">
            <PersonOutlineOutlinedIcon style={{ color: '#71c142' }} />
          </IconButton>
          <IconButton color="inherit">
            <PersonOutlineOutlinedIcon style={{ color: '#71c142' }} />
          </IconButton>
          <IconButton color="inherit">
            <PersonOutlineOutlinedIcon style={{ color: '#71c142' }} />
          </IconButton> */}
        </Box>
      </Box>
    </Box>
  )
}

export default Login
