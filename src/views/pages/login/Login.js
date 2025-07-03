import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { axioslogin } from 'src/views/Axios/Axios'
import { errorNotify, infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import { useDispatch } from 'react-redux'
import { ActionTyps } from 'src/redux/constants/action.type'
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

const val = false

const Login = () => {
  const { FETCH_LOGIN } = ActionTyps
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [emp_username, setUsername] = useState('')
  const [emp_password, setPassword] = useState('')

  const useLoginDetl = {
    emp_username: emp_username,
    emp_password: emp_password,
  }

  const postData = useMemo(() => {
    return {
      userName: emp_username,
      passWord: emp_password,
      method: 1,
    }
  }, [emp_username, emp_password])

  const [flag, setFlag] = useState(0)

  const submitLoginDetl = async e => {
    e.preventDefault()

    try {
      if (emp_username === '') {
        infoNotify('Username Feild Is Blank')
      } else if (emp_password === '') {
        infoNotify('Password Feild Is Blank')
      } else {
        // const result = await axioslogin.post('/user/checkUserCres', postData, {
        //   withCredentials: true,
        // })
        // const { message, success, userInfo } = result?.data;

        const result = await axioslogin.post('/user/checkUserCres', postData, {
          withCredentials: true,
        })
        const { message, success, userInfo } = result?.data || {}

        if (success === 0) {
          errorNotify(message) // database error
        } else if (success === 1) {
          warningNotify(message) // incorrected credientials
        } else if (success === 2) {
          succesNotify(message) // credential verified
          const {
            empdtl_slno,
            login_method_allowed,
            em_id,
            emp_no,
            user,
            token,
            emp_id,
            emp_name,
            emp_sec,
            emp_secid,
            emp_dept,
            dept_name,
            app_token,
            logOutTime,
            desg_name,
          } = JSON.parse(userInfo)
          const authData = {
            authNo: btoa(empdtl_slno), //btoa() encodes a string into Base64 format.
            authType: btoa(login_method_allowed),
            authId: btoa(em_id),
            authEmpNo: btoa(emp_no),
            user: btoa(user),
            empno: btoa(emp_no),
            empid: btoa(emp_id),
          }

          const loggedDetl = {
            user: user,
            token: token,
            empno: emp_no,
            empid: emp_id,
            empname: emp_name,
            empdeptsec: emp_sec,
            empsecid: emp_secid,
            empdept: emp_dept,
            empdeptname: dept_name,
            apptoken: app_token,
            logOut: logOutTime,
            designation: desg_name,
          }
          dispatch({ type: FETCH_LOGIN, payload: loggedDetl })
          localStorage.setItem('app_auth', JSON.stringify(authData))
          setTimeout(() => {
            navigate('/Home', { replace: true })
          }, 1000)
        } else {
          errorNotify(message)
        }
      }
    } catch (error) {
      warningNotify(error)
    }
  }

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100%',
        // backgroundColor: 'var(--royal-purple-50)',
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
          borderRadius: 5,
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: 'var(--royal-purple-200)',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
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
            onChange={e => {
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
            onChange={e => {
              setPassword(e.target.value)
            }}
            type={val ? 'text' : 'password'}
            InputLabelProps={{ shrink: true }} // ✅ For shrinking label
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => { }} edge="start">
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
