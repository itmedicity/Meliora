import React, { memo, useCallback, useState, useEffect, useMemo } from 'react'
import { Typography, Table, CssVarsProvider, Tooltip, Input, IconButton, Box } from '@mui/joy'
import SearchIcon from '@mui/icons-material/Search'
import { Paper } from '@mui/material'
import CusCheckBox from 'src/views/Components/CusCheckBox'
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { axiosellider, axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import CachedIcon from '@mui/icons-material/Cached'
import QrCode2Icon from '@mui/icons-material/QrCode2'
import WifiQRCodeModel from './WifiQRCodeModel'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { useSelector } from 'react-redux'
import { addDays, format } from 'date-fns'
import AddBoxSharpIcon from '@mui/icons-material/AddBoxSharp'
import PersonTwoToneIcon from '@mui/icons-material/PersonTwoTone'
import { useNavigate } from 'react-router-dom'

const WifiManageMentMains = () => {
  const [value, setValue] = useState(0)
  const [count, setCount] = useState(0)
  const history = useNavigate()
  const [tabledata, setTabledata] = useState([])
  const [selectedRow, setSelectedRow] = useState([])
  const [allowtted, setAllowted] = useState([])
  const [dashChange, setDashChange] = useState(0)
  const [dateOver, setDateOver] = useState(0)
  const [searchFlag, setSearchFlag] = useState(0)
  const [expiryDate, setExpiryDate] = useState(new Date())
  const [createdDate, setCreatedDate] = useState(new Date())
  const [in_patient_no, setIn_patient_no] = useState('')
  const [qrCodeDis, setQrCodeDis] = useState('')
  const [qrCodeUserName, setQrCodeUserName] = useState('')
  const [QrModelOpen, SetQrModelOpen] = useState(false)
  const [qrModelFlag, setQrModelFlag] = useState(0)
  const [expiredDetails, setExpiredDetails] = useState([])
  const [ipNumber, setipNumber] = useState({
    patient: false,
    bystander: false,
    extra: false,
    disbleP: false,
    disbleB: false
  })
  const { patient, bystander, extra, disbleP, disbleB } = ipNumber
  const updateWifiManagement = useCallback(
    e => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setipNumber({ ...ipNumber, [e.target.name]: value })
    },
    [ipNumber]
  )
  const resetData = useCallback(() => {
    const frmdata = {
      patient: false,
      bystander: false,
      extra: false
    }
    setipNumber(frmdata)
    setValue(0)
    setTabledata([])
    setExpiryDate(new Date())
    setCreatedDate(new Date())
    setDateOver(0)
    setSearchFlag(0)
  }, [])

  const onChangeIPnumber = useCallback(
    e => {
      setIn_patient_no(e.target.value)
      resetData()
    },
    [resetData]
  )
  // Get login user emp_id
  const id = useSelector(state => {
    return state.LoginUserData.empid
  })
  const patchdata = useMemo(() => {
    return {
      in_patient_no: in_patient_no,
      patient: patient === true ? 1 : 0,
      bystander: bystander === true ? 1 : 0,
      extra: extra === true ? 1 : 0,
      edit_user: id
    }
  }, [in_patient_no, patient, bystander, extra, id])

  useEffect(() => {
    const getAlloteedWiFi = async () => {
      const result = await axioslogin.get('/wifiManagement/getAllowttedWiFi')
      const { success, data } = result.data
      if (success === 1) {
        setAllowted(data)
      } else {
        setAllowted([])
      }
    }
    getAlloteedWiFi()
  }, [dashChange])
  useEffect(() => {
    const getExpiredWiFi = async in_patient_no => {
      const result = await axioslogin.get(`/wifiManagement/expiredData/${in_patient_no}`)
      const { success, data } = result.data
      if (success === 1) {
        const newData = data?.filter(
          (value, index, self) => index === self.findIndex(item => item.updated_date === value.updated_date)
        )
        const getData = newData?.map(val => {
          return {
            in_patient_no: val.in_patient_no,
            patient: val.patient,
            bystander: val.bystander,
            updated_date: val.updated_date,
            expired: addDays(new Date(val.updated_date), 4)
          }
        })
        setExpiredDetails(getData)
      } else {
        setExpiredDetails([])
      }
    }

    if (in_patient_no !== '') {
      getExpiredWiFi(in_patient_no)
    }
  }, [in_patient_no, count])
  useEffect(() => {
    const getUpdatedDate = async in_patient_no => {
      const result = await axioslogin.get(`/wifiManagement/getDate/${in_patient_no}`)
      const { success, data } = result.data
      if (success === 1) {
        const { updated_date } = data[0]
        if (updated_date !== null) {
          const checkExpiry = addDays(new Date(updated_date), 4)
          const currentDate = new Date()
          if (checkExpiry >= currentDate) {
            setCreatedDate(updated_date)
            setDateOver(2)
            setExpiryDate(checkExpiry)
          } else {
            setCreatedDate(updated_date)
            setDateOver(1)
            setExpiryDate(checkExpiry)
          }
        } else {
          setCreatedDate(new Date())
          setDateOver(0)
        }
      } else if (success === 2) {
        setCreatedDate(new Date())
        setDateOver(0)
      }
    }
    const getdataMeliora = async in_patient_no => {
      const result = await axioslogin.get(`/wifiManagement/viewbyid/${in_patient_no}`)
      const { success, data } = result.data
      if (success === 2) {
        setSelectedRow(data)
      } else {
      }
    }
    if (in_patient_no !== '' && count !== 0) {
      getdataMeliora(in_patient_no)
      getUpdatedDate(in_patient_no)
    }
  }, [in_patient_no, count, setAllowted])

  const searchIP = useCallback(() => {
    const getdata = async in_patient_no => {
      const result = await axiosellider.get(`/admission/getIpadmissChecks/${in_patient_no}`)
      return result.data
    }
    const insertdata = async postdata => {
      const result = await axioslogin.post('/wifiManagement/insert', postdata)
      return result.data
    }

    const getdataMeliora = async in_patient_no => {
      const result = await axioslogin.get(`/wifiManagement/viewbyid/${in_patient_no}`)
      return result.data
    }

    let pattern = /^[0-9]{10}$/
    if (pattern.test(in_patient_no) === true) {
      getdata(in_patient_no).then(val => {
        const { success } = val
        if (success === 1) {
          const getUpdatedDate = async in_patient_no => {
            const result = await axioslogin.get(`/wifiManagement/getDate/${in_patient_no}`)
            return result.data
          }
          getUpdatedDate(in_patient_no).then(values => {
            const { success, data } = values
            if (success === 1) {
              const { updated_date } = data[0]
              if (updated_date !== null) {
                const checkExpiry = addDays(new Date(updated_date), 4)
                const currentDate = new Date()
                if (checkExpiry >= currentDate) {
                  setCreatedDate(updated_date)
                  setDateOver(2)
                  setExpiryDate(checkExpiry)
                } else {
                  setCreatedDate(updated_date)
                  setDateOver(1)
                  setExpiryDate(checkExpiry)
                }
              } else {
                setCreatedDate(new Date())
                setDateOver(0)
              }
            } else if (success === 2) {
              setCreatedDate(new Date())
              setDateOver(0)
            }
          })
          const postdata = {
            in_patient_no: in_patient_no,
            patient: 0,
            bystander: 0,
            extra: 0,
            create_user: id
          }
          getdataMeliora(in_patient_no).then(values => {
            const { success, data } = values
            if (success === 2) {
              const { ip_slno, in_patient_no, patient, bystander, extra } = data[0]
              const frmdata = {
                ip_slno: ip_slno,
                patient: patient === 1 ? true : false,
                bystander: bystander === 1 ? true : false,
                extra: extra === 1 ? true : false,
                disbleP: patient === 1 ? true : false,
                disbleB: bystander === 1 ? true : false
              }
              setipNumber(frmdata)
              setIn_patient_no(in_patient_no)
              setSelectedRow(data)
              setSearchFlag(1)
            } else {
              setDateOver(0)
              insertdata(postdata).then(values => {
                const { success } = values
                if (success === 1) {
                  getdataMeliora(in_patient_no).then(values => {
                    const { success, data } = values
                    if (success === 2) {
                      const { ip_slno, in_patient_no, patient, bystander, extra } = data[0]

                      const frmdata = {
                        ip_slno: ip_slno,
                        patient: patient === 1 ? true : false,
                        bystander: bystander === 1 ? true : false,
                        extra: extra === 1 ? true : false
                      }
                      setipNumber(frmdata)
                      setIn_patient_no(in_patient_no)
                      setSelectedRow(data)
                      setSearchFlag(1)
                    }
                  })
                }
              })
            }
          })
        } else {
          warningNotify('pateint Discharged')
        }
      })
    } else {
      warningNotify('Please Enter 10 Digit IP Number')
    }
  }, [in_patient_no, id])

  const submitWifiManagement = useCallback(() => {
    const UpdateWifiManagement = async patchdata => {
      const result = await axioslogin.patch('/wifiManagement/update', patchdata)
      const { message, success } = result.data
      if (success === 2) {
        setCount(count + 1)
        succesNotify(message)
        const { patient, bystander, in_patient_no } = patchdata
        if (patient === 1 && bystander === 1) {
          const frmdata = {
            patient: true,
            bystander: true,
            extra: false,
            disbleP: true,
            disbleB: true
          }
          setipNumber(frmdata)
          setIn_patient_no(in_patient_no)
        } else if (patient === 1 && bystander === 0) {
          const frmdata = {
            patient: true,
            bystander: false,
            extra: false,
            disbleP: true,
            disbleB: false
          }
          setipNumber(frmdata)
          setIn_patient_no(in_patient_no)
        } else if (patient === 0 && bystander === 1) {
          const frmdata = {
            patient: false,
            bystander: true,
            extra: false,
            disbleP: false,
            disbleB: true
          }
          setipNumber(frmdata)
          setIn_patient_no(in_patient_no)
        }
      } else if (success === 0) {
        infoNotify(message)
      } else {
        infoNotify(message)
      }
    }
    if (value === 0) {
      if (in_patient_no !== '') {
        if (patient === true || bystander === true) {
          UpdateWifiManagement(patchdata)
        } else {
          infoNotify('Select Any Choice')
        }
      } else {
        infoNotify('Enter IP Number')
      }
    }
  }, [value, count, in_patient_no, patchdata, patient, bystander])

  const backtoSetting = useCallback(() => {
    history('/Home')
  }, [history])

  useEffect(() => {
    if (selectedRow.length !== 0) {
      const arr = selectedRow?.map(val => {
        const obj = {
          in_patient_no: val.in_patient_no,
          patient: val.patient === 1 ? 'Issued' : 'Not Issued',
          bystander: val.bystander === 1 ? 'Issued' : 'Not Issued',
          extra: val.extra === 1 ? 'Issued' : 'Not Issued',
          patient_flag: val.patient,
          bystander_flag: val.bystander,
          extra_flag: val.extra
        }
        return obj
      })
      setTabledata(arr)
    }
  }, [selectedRow, count])
  const refreshWindow = useCallback(() => {
    const frmdata = {
      ip_slno: '',
      in_patient_no: '',
      patient: false,
      bystander: false,
      extra: false
    }
    setipNumber(frmdata)
    setValue(0)
    setTabledata([])
    setExpiryDate(new Date())
    setCreatedDate(new Date())
    setDateOver(0)
    setIn_patient_no('')
    setSearchFlag(0)
  }, [setipNumber])

  const QrModelPateint = useCallback(
    val => {
      const { in_patient_no } = val

      const checking = {
        it_wifi_ipno: in_patient_no,
        it_wifi_flg: 'P'
      }
      const getdata = async checking => {
        const result = await axioslogin.post(`/wifiManagement/checkCodeNdGet`, checking)
        const { success, data } = result.data
        if (success === 2) {
          const { code, username } = data[0]
          setQrModelFlag(1)
          SetQrModelOpen(true)
          setQrCodeDis(code)
          setQrCodeUserName(username)
          setDashChange(dashChange + 1)
          setCount(count + 1)
        } else {
          const result1 = await axioslogin.patch('/wifiManagement/updateQrCode', checking)
          const { succes } = result1.data
          if (succes === 2) {
            const result = await axioslogin.post(`/wifiManagement/checkCodeNdGet`, checking)
            const { success, data } = result.data
            if (success === 2) {
              const { code, username } = data[0]
              setQrModelFlag(1)
              SetQrModelOpen(true)
              setQrCodeDis(code)
              setQrCodeUserName(username)
              setDashChange(dashChange + 1)
              setCount(count + 1)
            }
          } else {
            warningNotify('No vacant code')
          }
        }
      }
      getdata(checking)
    },
    [setQrModelFlag, SetQrModelOpen, setDashChange, dashChange, count]
  )

  const QrModelByStander = useCallback(
    val => {
      const { in_patient_no } = val

      const checking = {
        it_wifi_ipno: in_patient_no,
        it_wifi_flg: 'B'
      }
      const getdata = async checking => {
        const result = await axioslogin.post(`/wifiManagement/checkCodeNdGet`, checking)
        const { success, data } = result.data
        if (success === 2) {
          const { code, username } = data[0]
          setQrModelFlag(1)
          SetQrModelOpen(true)
          setQrCodeDis(code)
          setQrCodeUserName(username)
          setDashChange(dashChange + 1)
          setCount(count + 1)
        } else {
          const result1 = await axioslogin.patch('/wifiManagement/updateQrCode', checking)
          const { succes } = result1.data
          if (succes === 2) {
            const result = await axioslogin.post(`/wifiManagement/checkCodeNdGet`, checking)
            const { success, data } = result.data
            if (success === 2) {
              const { code, username } = data[0]
              setQrModelFlag(1)
              SetQrModelOpen(true)
              setQrCodeDis(code)
              setQrCodeUserName(username)
              setDashChange(dashChange + 1)
              setCount(count + 1)
            }
          } else {
            warningNotify('No vacant code')
          }
        }
      }
      getdata(checking)
    },
    [setQrModelFlag, SetQrModelOpen, setDashChange, dashChange, count]
  )

  const deletewifiCode = useCallback(
    val => {
      const { in_patient_no } = val
      const ipno = {
        it_wifi_ipno: in_patient_no
      }
      const deleteCode = async ipno => {
        const result = await axioslogin.patch('/wifiManagement/delete', ipno)
        const { success, message } = result.data
        if (success === 1) {
          succesNotify(message)
          setCount(count + 1)
          resetData()
          searchIP()
        } else {
          infoNotify(message)
        }
      }
      deleteCode(ipno)
    },
    [count, resetData, searchIP]
  )

  // const QrModelExtra = useCallback((val) => {
  //   const { in_patient_no } = val

  //   const checking = {
  //     it_wifi_ipno: in_patient_no,
  //     it_wifi_flg: 'E'
  //   }
  //   const getdata = async (checking) => {
  //     const result = await axioslogin.post(`/wifiManagement/checkCodeNdGet`, checking);
  //     const { success, data } = result.data
  //     if (success === 2) {
  //       const { code } = data[0]
  //       setQrModelFlag(1)
  //       SetQrModelOpen(true)
  //       setQrCodeDis(code)
  //     }
  //     else {
  //       const result1 = await axioslogin.patch('/wifiManagement/updateQrCode', checking)
  //       const { succes } = result1.data
  //       if (succes === 2) {
  //         const result = await axioslogin.post(`/wifiManagement/checkCodeNdGet`, checking);
  //         const { success, data } = result.data
  //         if (success === 2) {
  //           const { code } = data[0]
  //           setQrModelFlag(1)
  //           SetQrModelOpen(true)
  //           setQrCodeDis(code)
  //         }
  //       }
  //       else {
  //         warningNotify("No vacant code")
  //       }
  //     }
  //   }
  //   getdata(checking)
  // }, [setQrModelFlag, SetQrModelOpen])

  const handleClose = useCallback(() => {
    SetQrModelOpen(false)
  }, [SetQrModelOpen])

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ maxHeight: window.innerHeight - 220 }}>
        <Paper variant="outlined" square sx={{ display: 'flex', flex: 1, height: 40 }}>
          <Box sx={{ flex: 1, pl: 1, pt: 1.2 }}>
            <Typography sx={{ color: '#555830', fontFamily: 'Arial', fontWeight: 550, fontSize: 16 }}>
              Wi-Fi Management
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', fontSize: 20, pr: 0.5, pt: 0.2 }}>
            <HighlightOffIcon
              sx={{ cursor: 'pointer', height: 34, width: 34, color: '#bf360c', opacity: 0.7 }}
              onClick={backtoSetting}
            />
          </Box>
        </Paper>

        <Paper square variant="outlined" sx={{ pt: 0.4, flexWrap: 'wrap' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', flex: 1 }}>
            <Box sx={{ flex: 0.8, display: 'flex', justifyContent: 'flex-end' }}>
              <Typography sx={{ fontSize: 15, fontWeight: 550, color: '#1565c0', m: 1, pt: 0.6 }}>IP Number</Typography>
            </Box>
            <Box sx={{ flex: 1.3, justifyContent: 'flex-start', m: 1 }}>
              <Box sx={{ flex: 1, display: 'flex' }}>
                <Box sx={{ flex: 1 }}>
                  <CssVarsProvider>
                    <Input
                      fullWidth
                      sx={{ height: 35 }}
                      startDecorator={<PersonTwoToneIcon sx={{ height: 30, width: 30, color: '#0063C5' }} />}
                      autoComplete="off"
                      placeholder="Enter IP Number"
                      type="integer"
                      size="sm"
                      name="in_patient_no"
                      value={in_patient_no}
                      onChange={onChangeIPnumber}
                    />
                  </CssVarsProvider>
                </Box>
                <Box sx={{ flex: 0.2, display: 'flex', justifyContent: 'flex-start' }}>
                  <Box sx={{ my: 0.5, ml: 1 }}>
                    <CssVarsProvider>
                      <Tooltip title="search" placement="top">
                        <SearchIcon
                          sx={{ height: 30, width: 30, color: '#0063C5', cursor: 'pointer' }}
                          onClick={() => searchIP()}
                        />
                      </Tooltip>
                    </CssVarsProvider>
                  </Box>
                  <Box sx={{ my: 0.5, pl: 1 }}>
                    <CssVarsProvider>
                      <Tooltip title="refresh" placement="top">
                        <CachedIcon
                          sx={{ height: 30, width: 30, color: '#0063C5', cursor: 'pointer' }}
                          onClick={() => refreshWindow()}
                        />
                      </Tooltip>
                    </CssVarsProvider>
                  </Box>
                </Box>
              </Box>
              {searchFlag === 1 ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', flex: 1, height: 50, m: 1 }}>
                  <Box sx={{ flex: 0.8, display: 'flex', justifyContent: 'flex-end', pt: 1 }}>
                    <CusCheckBox
                      label="Patient"
                      color="primary"
                      size="md"
                      name="patient"
                      value={patient}
                      checked={patient}
                      disabled={disbleP}
                      onCheked={updateWifiManagement}
                    ></CusCheckBox>
                  </Box>
                  <Box sx={{ pl: 2, pt: 1 }}>
                    <CusCheckBox
                      label="Bystander"
                      color="primary"
                      size="md"
                      name="bystander"
                      value={bystander}
                      checked={bystander}
                      disabled={disbleB}
                      onCheked={updateWifiManagement}
                    ></CusCheckBox>
                  </Box>
                  <Box sx={{ pl: 3, flex: 1.5, pt: 0.2 }}>
                    <CssVarsProvider>
                      {disbleP === true && disbleB === true ? (
                        <IconButton
                          disabled
                          sx={{
                            px: 2,
                            fontSize: 12,
                            minHeight: '30px',
                            lineHeight: '1.2',
                            minWidth: '100px',
                            bgcolor: 'lightgrey',
                            '&:hover': {
                              bgcolor: 'lightgrey'
                            },
                            boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
                            borderRadius: 5,
                            height: '25px'
                          }}
                        >
                          Submit
                        </IconButton>
                      ) : (
                        <IconButton
                          sx={{
                            px: 2,
                            fontSize: 12,
                            height: '30px',
                            minHeight: '30px',
                            lineHeight: '1.2',
                            minWidth: '100px',
                            bgcolor: '#0277bd',
                            fontWeight: 650,
                            color: 'white',
                            '&:hover': {
                              bgcolor: '#5CACEE',
                              color: 'white'
                            },
                            boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
                            borderRadius: 5
                          }}
                          onClick={() => submitWifiManagement()}
                        >
                          Submit
                        </IconButton>
                      )}
                    </CssVarsProvider>
                  </Box>
                </Box>
              ) : null}
            </Box>

            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
              <Box sx={{ m: 1, pt: 0.5 }}>
                <Typography sx={{ fontSize: 16, color: '#3f51b5', fontWeight: 550 }}>WiFi Users</Typography>
              </Box>
              <Box sx={{ pr: 4, pt: 0.6 }}>
                <CssVarsProvider>
                  <Tooltip
                    placement="bottom"
                    title="Last 5 Days Wi-Fi Usage Count"
                    sx={{ bgcolor: '#e3f2fd', color: 'black', pr: 3 }}
                  >
                    <Box
                      variant="contained"
                      sx={{
                        cursor: 'pointer',
                        borderRadius: '50%',
                        minWidth: 40,
                        minHeight: 40,
                        border: '1px solid lightgrey',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 0,
                        bgcolor: '#e3f2fd'
                      }}
                    >
                      {allowtted.length}
                    </Box>
                  </Tooltip>
                </CssVarsProvider>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
      <Paper sx={{ maxHeight: 200, maxWidth: '100%', overflow: 'auto', margin: 'auto' }}>
        {qrModelFlag === 1 ? (
          <WifiQRCodeModel
            open={QrModelOpen}
            handleClose={handleClose}
            qrCodeDis={qrCodeDis}
            qrCodeUserName={qrCodeUserName}
          />
        ) : null}
        {searchFlag === 1 ? (
          <CssVarsProvider>
            <Table stickyHeader>
              <thead>
                <tr>
                  <th style={{ textAlign: 'center', width: 150 }}> IP Number</th>
                  <th style={{ textAlign: 'center', width: 100 }}>Patient</th>
                  <th style={{ textAlign: 'center', width: 100 }}>Bystander</th>
                  <th style={{ textAlign: 'center', width: 100 }}>Given Date</th>
                  {dateOver !== 0 ? <th style={{ textAlign: 'center', width: 100 }}>Expiry Date</th> : null}
                  {dateOver === 1 ? <th style={{ textAlign: 'center', width: 120 }}></th> : null}
                </tr>
              </thead>
              <tbody>
                {tabledata.map((val, index) => {
                  return (
                    <tr
                      key={index}
                    // sx={{
                    //   '&:last-child td, &:last-child th': { border: 0 },
                    //   maxHeight: 50,
                    //   minHeight: 5,
                    // }}
                    >
                      <td style={{ textAlign: 'center', width: 150 }}> {val.in_patient_no}</td>
                      {dateOver === 1 ? (
                        <>
                          <td style={{ textAlign: 'center', width: 100, cursor: 'pointer' }}>
                            <QrCode2Icon size={6} sx={{ color: 'lightgray' }} />
                          </td>
                        </>
                      ) : (
                        <>
                          {val.patient_flag === 1 ? (
                            <td style={{ textAlign: 'center', width: 100, cursor: 'pointer' }}>
                              <QrCode2Icon size={6} onClick={() => QrModelPateint(val)} />
                            </td>
                          ) : (
                            <td style={{ textAlign: 'center', width: 100 }}> {val.patient}</td>
                          )}
                        </>
                      )}
                      {dateOver === 1 ? (
                        <>
                          <td style={{ textAlign: 'center', width: 100, cursor: 'pointer' }}>
                            <QrCode2Icon size={6} sx={{ color: 'lightgray' }} />
                          </td>
                        </>
                      ) : (
                        <>
                          {val.bystander_flag === 1 ? (
                            <td style={{ textAlign: 'center', width: 100, cursor: 'pointer' }}>
                              <QrCode2Icon size={6} onClick={() => QrModelByStander(val)} />
                            </td>
                          ) : (
                            <td style={{ textAlign: 'center', width: 100 }}> {val.bystander}</td>
                          )}
                        </>
                      )}
                      <td style={{ textAlign: 'center', width: 100 }}>
                        {' '}
                        {val.patient_flag === 1 ? format(new Date(createdDate), 'dd-MM-yyyy') : 'Not Issued'}
                      </td>
                      {dateOver !== 0 ? (
                        <td style={{ textAlign: 'center', width: 100 }}>
                          {format(new Date(expiryDate), 'dd-MM-yyyy')}
                        </td>
                      ) : null}
                      {dateOver === 1 ? (
                        <td size="sm" style={{ textAlign: 'center', width: 120, display: 'flex' }}>
                          <Typography sx={{ color: 'red' }}>Expired &nbsp;</Typography>
                          <CssVarsProvider>
                            <Tooltip
                              title="Renew"
                              placement="right"
                              sx={{ bgcolor: '#ffebee', color: 'black', width: 60, pl: 1 }}
                            >
                              <AddBoxSharpIcon
                                sx={{
                                  cursor: 'pointer',
                                  color: '#1565c0',
                                  ':hover': {
                                    color: '#0d47a1'
                                  }
                                }}
                                onClick={() => deletewifiCode(val)}
                              />
                            </Tooltip>
                          </CssVarsProvider>
                        </td>
                      ) : null}
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </CssVarsProvider>
        ) : null}
      </Paper>

      {expiredDetails.length !== 0 && searchFlag === 1 ? (
        <Paper sx={{ mt: 3 }}>
          <Paper
            variant="outlined"
            sx={{
              fontSize: 18,
              color: '#0d47a1',
              pl: 3,
              display: 'flex',
              fontWeight: 650,
              height: 40,
              pt: 1,
              bgcolor: '#eeeeee',
              justifyContent: 'center'
            }}
          >
            Wi-Fi Usage Statistics
          </Paper>
          <Box sx={{ maxHeight: 200, maxWidth: '100%', overflow: 'auto', margin: 'auto' }}>
            <CssVarsProvider>
              <Table stickyHeader>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'center', width: 150 }}> IP Number</th>
                    <th style={{ textAlign: 'center', width: 100 }}>Patient</th>
                    <th style={{ textAlign: 'center', width: 100 }}>Bystander</th>
                    <th style={{ textAlign: 'center', width: 100 }}>Given Date</th>
                    <th style={{ textAlign: 'center', width: 100 }}>Expiry Date</th>
                  </tr>
                </thead>
                <tbody>
                  {expiredDetails.map((val, index) => {
                    return (
                      <tr
                        key={index}
                      // sx={{
                      //   '&:last-child td, &:last-child th': { border: 0 },
                      //   maxHeight: 50,
                      //   minHeight: 5,
                      // }}
                      >
                        <td style={{ textAlign: 'center', width: 150 }}> {val.in_patient_no}</td>
                        <td style={{ textAlign: 'center', width: 100, cursor: 'pointer' }}>
                          <QrCode2Icon size={6} sx={{ color: 'lightgray' }} />
                        </td>
                        <td style={{ textAlign: 'center', width: 100, cursor: 'pointer' }}>
                          <QrCode2Icon size={6} sx={{ color: 'lightgray' }} />
                        </td>
                        <td style={{ textAlign: 'center', width: 100 }}>
                          {format(new Date(val.updated_date), 'dd-MM-yyyy')}
                        </td>
                        <td style={{ textAlign: 'center', width: 100 }}>
                          {format(new Date(val.expired), 'dd-MM-yyyy')}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </CssVarsProvider>
          </Box>
        </Paper>
      ) : null}
    </Box>
  )
}

export default memo(WifiManageMentMains)
