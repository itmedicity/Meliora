import React from 'react'
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


const Login = () => {
  return (
    <div className=" min-vh-100 d-flex flex-row align-items-center" style={{ backgroundColor: "#e3f2fd" }}>
      {/* <ToastContainer /> */}
      <CContainer >
        <CRow className="justify-content-center">
          <CCol md={8} sm={12} >
            <CCardGroup>
              <CCard className="p-4" style={{ borderTopLeftRadius: 15, borderBottomLeftRadius: 15 }} >
                <CCardBody >
                  <CForm  >
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
                        // onChange={(e) => { setUsername(e.target.value) }}
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
                        // onChange={(e) => { setPassword(e.target.value) }}
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
