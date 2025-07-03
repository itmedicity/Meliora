import { CircularProgress } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { ActionTyps } from 'src/redux/constants/action.type'
import { axioslogin } from '../Axios/Axios'
import { Backdrop } from '@mui/material'
import { Box } from '@mui/system'
import MLogoIcon from 'src/assets/MLogoIcon'

const Protected = props => {
  const dispatch = useDispatch()
  const { FETCH_LOGIN } = ActionTyps

  const [validUser, setValidUser] = useState({})
  const [validLogin, setValidLogin] = useState(false)
  const [loading, setLoading] = useState(true)

  const validteToken = async () => {
    try {
      const authSlno = localStorage.getItem('app_auth')
      const authID = atob(JSON.parse(authSlno)?.empid)
      console.log(authID)

      const checkAccessToken = await axioslogin.get(
        `/validateAuthentication/getEmployeeAuthentication/${authID}`,
        { withCredentials: true }
      )

      const { success, data } = checkAccessToken.data

      // const {em_name,emp_no,em_id,sec_name,em_dept_section,em_department,dept_name,app_token,login,desg_name} = data
      console.log(checkAccessToken.data)

      if (success === 2) {
        setValidUser(data)
        setValidLogin(true)

        const loggedDetl = {
          user: data[0].em_name,
          empno: data[0].emp_no,
          empid: data[0].em_id,
          empname: data[0].em_name,
          empdeptsec: data[0].sec_name,
          empsecid: data[0].em_dept_section,
          empdept: data[0].em_department,
          empdeptname: data[0].dept_name,
          apptoken: data[0].app_token,
          logOut: data[0].login,
          designation: data[0].desg_name,
        }
        dispatch({ type: FETCH_LOGIN, payload: loggedDetl })
      } else {
        setValidUser({})
        setValidLogin(false)
        localStorage.removeItem('app_auth')
      }

      // console.log(response)
    } catch (error) {
      setValidUser({})
      setValidLogin(false)
      localStorage.removeItem('app_auth')
    }
  }

  useEffect(() => {
    const fetch = async () => {
      await validteToken()
    }

    fetch()

    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }, [])

  // validteToken()

  // const theme = createTheme({
  //   palette: {
  //     mode: 'light',
  //   },
  // })
  // const dispatch = useDispatch()
  // let Component = props.cmp
  // let history = useNavigate()
  // const { FETCH_LOGIN } = ActionTyps
  // useEffect(() => {
  //   const loginDetl = localStorage.getItem('app_auth')
  //   const login = JSON.parse(loginDetl)
  //   if (!loginDetl) {
  //     history('/')
  //   } else {
  //     dispatch({ type: FETCH_LOGIN, payload: login })
  //   }
  // }, [history, FETCH_LOGIN, dispatch])

  console.log(validLogin, validUser)
  if (loading)
    return (
      <Backdrop open sx={{ backgroundColor: 'var(--royal-purple-50)', justifyContent: 'center' }}>
        {/* <MLogoIcon width={50} height={50} /> */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            opacity: 0.1, // make it subtle
            zIndex: 1,
          }}
        >
          <MLogoIcon width={600} height={600} />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1,
            justifyContent: 'center',
          }}
        >
          <CircularProgress sx={{ color: 'var(--royal-purple-400)' }} />
          <Box
            sx={{
              color: 'var(--royal-purple-400)',
              fontFamily: 'var(--roboto-font)',
              fontSize: 14,
            }}
          >
            Validate Login ...
          </Box>
        </Box>
      </Backdrop>
    )
  return validLogin ? <Outlet /> : <Navigate to="/" />
}

export default Protected
