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
const Login = () => {
  const history = useHistory()

  const [emp_username, setUsername] = useState("");
  const [emp_password, setPassword] = useState("");

  const useLoginDetl = {
    emp_username: emp_username,
    emp_password: emp_password
  }

  const submitLoginDetl = async (e) => {
    e.preventDefault()
    if (emp_username === "") {
      console.log("Username Feild Is Blank");
      // infoNofity("Username Feild Is Blank")
    } else if (emp_password === "") {
      console.log("Password Feild Is Blank");
      // infoNofity("Password Feild Is Blank")
    } else {
      console.log(useLoginDetl);
      const result = await axioslogin.post("/employee/login", useLoginDetl)
        .then((response) => {
          return response;
        })
        .catch((error) => {
          return error;
        })
      const data = result.data;

      if (data.success === 0) {
        console.log("User does not exsit");
        // errorNofity("User does not exsit");
      } else {

        const loggedDetl = {
          user: data.user,
          token: data.token,
          empno: data.emp_no,
          empid: data.emp_id
        }
      }



      history.push("/Home")
      // console.log("ug");
      console.log(result);
    }


  }


  return (
    <div className=" min-vh-100 d-flex flex-row align-items-center" style={{ backgroundColor: "#e3f2fd" }}>
      {/* <ToastContainer /> */}
      <CContainer >
        <CRow className="justify-content-center">
          <CCol md={8} sm={12} >
            <CCardGroup>
              <CCard className="p-4" style={{ borderTopLeftRadius: 15, borderBottomLeftRadius: 15 }} >
                <CCardBody >
                  <CForm onSubmit={submitLoginDetl} >
                    <h1 style={{ fontFamily: "cursive" }}>Login</h1>
                    <p className="text-medium-emphasis" style={{ fontFamily: "monospace" }}>Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <PersonOutlineOutlinedIcon style={{ color: "#673ab7" }} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Username"
                        autoComplete="username"
                        name="username"
                        onChange={(e) => { setUsername(e.target.value) }}
                        style={{ fontFamily: "cursive" }}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <LockOutlinedIcon style={{ color: "#673ab7" }} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        name="password"
                        onChange={(e) => { setPassword(e.target.value) }}
                        style={{ fontFamily: "cursive" }}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton className="px-4" type="submit" style={{ backgroundColor: "#673ab7", fontFamily: "cursive" }}>
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0" style={{ color: "#673ab7", fontFamily: "cursive" }}>
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white py-5" style={{ width: '100%', backgroundColor: "#673ab7", borderTopRightRadius: 15, borderBottomRightRadius: 15 }}  >
                <CCardBody className="text-center">
                  <div style={{ fontFamily: "monospace" }} >
                    <h2>Meliora</h2>
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
    </div>
  )
}

export default Login
