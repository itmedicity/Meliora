import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { axioslogin } from 'src/views/Axios/Axios'
import { errorNotify, infoNotify, succesNotify } from 'src/views/Common/CommonCode';
import { useDispatch } from 'react-redux'
import { ActionTyps } from 'src/redux/constants/action.type'
import { ToastContainer } from 'react-toastify';
import { setLoginProfileData } from 'src/redux/actions/LoginProfile.action';
import DetailWorng from 'src/views/dashboard/DetailWorng';

const Login = () => {
  const { FETCH_LOGIN } = ActionTyps;
  const history = useHistory()
  const dispatch = useDispatch()
  const [emp_username, setUsername] = useState("");
  const [emp_password, setPassword] = useState("");

  const useLoginDetl = {
    emp_username: emp_username,
    emp_password: emp_password
  }
  const [flag, setFlag] = useState(0)
  const submitLoginDetl = async (e) => {
    e.preventDefault()
    if (emp_username === "") {
      infoNotify("Username Feild Is Blank")
    } else if (emp_password === "") {
      infoNotify("Password Feild Is Blank")
    } else {
      const result = await axioslogin.post("/employee/login", useLoginDetl)
        .then((response) => {
          return response;
        })
        .catch((error) => {
          return error;
        })
      const data = result.data;

      if (data.success === 0) {

        errorNotify("User does not exsit");
      } else {
        succesNotify("Loggined successfully")
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
          logOut: data.logOutTime
        }
        if (loggedDetl.empname !== null) {
          dispatch({ type: FETCH_LOGIN, payload: loggedDetl })
          const loggedCredential = sessionStorage.setItem('userDetl', JSON.stringify(loggedDetl));
          dispatch(setLoginProfileData(data.emp_id))
          if (loggedCredential !== null) {
            history.push("/Home")
          }
        } else {
          setFlag(1)
          //history.push("/NotCorect")
        }

      }
    }
  }

  return (
    <div className=" min-vh-100 d-flex flex-row align-items-center" style={{ backgroundColor: "#e0f2f1" }}>
      <ToastContainer />

      {flag === 1 ?

        <DetailWorng /> :
        <CContainer >
          <CRow className="justify-content-center">
            <CCol md={8} sm={12} >
              <CCardGroup>
                <CCard className="p-4" style={{ borderTopLeftRadius: 15, borderBottomLeftRadius: 15 }} >
                  <CCardBody >
                    <CForm onSubmit={submitLoginDetl} >
                      <h1 style={{ fontFamily: "cursive", color: "#71c142" }}>Login</h1>
                      <p className="text-medium-emphasis" style={{ fontFamily: "monospace" }}>Sign In to your account</p>
                      <CInputGroup className="mb-3" style={{ borderColor: "#71c142" }}>
                        <CInputGroupText style={{ backgroundColor: "#707377", borderColor: "#71c142" }}>
                          <PersonOutlineOutlinedIcon style={{ color: "#71c142" }} />
                        </CInputGroupText>
                        <CFormInput
                          placeholder="Username"
                          autoComplete="username"
                          name="username"
                          onChange={(e) => { setUsername(e.target.value) }}
                          style={{ fontFamily: "cursive", borderColor: "#71c142" }}
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-4" style={{ borderColor: "#71c142" }} >
                        <CInputGroupText style={{ backgroundColor: "#707377", borderColor: "#71c142" }}>
                          <LockOutlinedIcon style={{ color: "#71c142", borderColor: "#71c142" }} />
                        </CInputGroupText>
                        <CFormInput
                          type="password"
                          placeholder="Password"
                          autoComplete="current-password"
                          name="password"
                          onChange={(e) => { setPassword(e.target.value) }}
                          style={{ fontFamily: "cursive", borderColor: "#71c142" }}
                        />
                      </CInputGroup>
                      <CRow>
                        <CCol xs={6}>
                          <CButton className="px-4" type="submit"
                            style={{ backgroundColor: "#71c142", fontFamily: "cursive", borderColor: "#71c142" }}
                          >
                            Login
                          </CButton>
                        </CCol>
                        <CCol xs={6} className="text-right">
                          <CButton color="link" className="px-0" style={{ color: "#71c142", fontFamily: "cursive" }}>
                            Forgot password?
                          </CButton>
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
                <CCard className="text-white py-5" style={{ width: '100%', backgroundColor: "#494c4f", borderTopRightRadius: 15, borderBottomRightRadius: 15 }}  >
                  <CCardBody className="text-center">
                    <div style={{ fontFamily: "monospace" }} >
                      <h2  >Meliora</h2>
                      <h6>Hospital Administration Management System </h6>
                      <h6>Hi, Welcome Back</h6>
                      <p>
                        Enter your credentials to continue
                      </p>
                    </div>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      }

    </div>
  )
}

export default Login
