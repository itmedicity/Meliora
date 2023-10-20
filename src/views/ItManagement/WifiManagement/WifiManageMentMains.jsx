import React, { memo, useCallback, useState, useEffect, useMemo } from 'react'
import { Box, Typography, Table, CssVarsProvider } from '@mui/joy'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import SearchIcon from '@mui/icons-material/Search';
import { Tooltip, Paper, Button } from '@mui/material';
import CusCheckBox from 'src/views/Components/CusCheckBox';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { axiosellider, axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import CardMaster from 'src/views/Components/CardMaster'
import CachedIcon from '@mui/icons-material/Cached';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import WifiQRCodeModel from './WifiQRCodeModel';


const WifiManageMentMains = () => {
  const [value, setValue] = useState(0)
  const [count, setCount] = useState(0)
  const history = useHistory()
  const [tabledata, setTabledata] = useState([])
  const [selectedRow, setSelectedRow] = useState([])
  const [ipNumber, setipNumber] = useState({
    in_patient_no: '',
    patient: false,
    bystander: false,
    extra: false,
    disbleP: false,
    disbleB: false
  })
  const { in_patient_no, patient, bystander, extra, disbleP, disbleB } = ipNumber
  const updateWifiManagement = useCallback(
    (e) => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setipNumber({ ...ipNumber, [e.target.name]: value })
    },
    [ipNumber],
  )

  const patchdata = useMemo(() => {
    return {
      in_patient_no: in_patient_no,
      patient: patient === true ? 1 : 0,
      bystander: bystander === true ? 1 : 0,
      extra: extra === true ? 1 : 0
    }
  }, [in_patient_no, patient, bystander, extra])

  useEffect(() => {
    const getdataMeliora = async (in_patient_no) => {
      const result = await axioslogin.get(`/wifiManagement/viewbyid/${in_patient_no}`)
      const { success, data } = result.data
      if (success === 2) {
        setSelectedRow(data)
      }
    }
    if (in_patient_no !== '' && count !== 0) {
      getdataMeliora(in_patient_no)
    }
  }, [in_patient_no, count])


  const searchIP = useCallback(() => {
    const getdata = async (in_patient_no) => {
      const result = await axiosellider.get(`/admission/getIpadmissChecks/${in_patient_no}`)
      return result.data
    }
    const insertdata = async (postdata) => {
      const result = await axioslogin.post('/wifiManagement/insert', postdata)
      return result.data
    }

    const getdataMeliora = async (in_patient_no) => {
      const result = await axioslogin.get(`/wifiManagement/viewbyid/${in_patient_no}`)
      return result.data
    }

    let pattern = /^[0-9]{10}$/;
    if (pattern.test(in_patient_no) === true) {
      getdata(in_patient_no).then((val) => {
        const { success } = val
        if (success === 1) {
          const postdata = {
            in_patient_no: in_patient_no,
            patient: 0,
            bystander: 0,
            extra: 0
          }
          getdataMeliora(in_patient_no).then((values) => {
            const { success, data } = values
            if (success === 2) {
              const { ip_slno, in_patient_no, patient, bystander, extra } = data[0]
              const frmdata = {
                ip_slno: ip_slno,
                in_patient_no: in_patient_no,
                patient: patient === 1 ? true : false,
                bystander: bystander === 1 ? true : false,
                extra: extra === 1 ? true : false,
                disbleP: patient === 1 ? true : false,
                disbleB: bystander === 1 ? true : false
              }
              setipNumber(frmdata)
              setSelectedRow(data)
            }
            else {
              insertdata(postdata).then((values) => {
                const { success } = values
                if (success === 1) {
                  getdataMeliora(in_patient_no).then((values) => {
                    const { success, data } = values
                    if (success === 2) {
                      const { ip_slno, in_patient_no, patient, bystander, extra } = data[0]

                      const frmdata = {
                        ip_slno: ip_slno,
                        in_patient_no: in_patient_no,
                        patient: patient === 1 ? true : false,
                        bystander: bystander === 1 ? true : false,
                        extra: extra === 1 ? true : false,
                      }
                      setipNumber(frmdata)
                      setSelectedRow(data)
                    }
                  })
                }
              })
            }
          })
        }
        else {
          warningNotify("pateint Discharged")
        }
      })
    }
    else {
      warningNotify("Please Enter 10 Digit IP Number")
    }

  }, [in_patient_no])



  const submitWifiManagement = useCallback(
    (e) => {
      e.preventDefault()

      const UpdateWifiManagement = async (patchdata) => {
        const result = await axioslogin.patch('/wifiManagement/update', patchdata)
        const { message, success } = result.data
        if (success === 2) {
          setCount(count + 1)
          succesNotify(message)
          const { patient, bystander, in_patient_no } = patchdata
          if (patient === 1 && bystander === 1) {
            const frmdata = {
              in_patient_no: in_patient_no,
              patient: true,
              bystander: true,
              extra: false,
              disbleP: true,
              disbleB: true
            }
            setipNumber(frmdata)
          } else if (patient === 1 && bystander === 0) {
            const frmdata = {
              in_patient_no: in_patient_no,
              patient: true,
              bystander: false,
              extra: false,
              disbleP: true,
              disbleB: false
            }
            setipNumber(frmdata)
          } else if (patient === 0 && bystander === 1) {
            const frmdata = {
              in_patient_no: in_patient_no,
              patient: false,
              bystander: true,
              extra: false,
              disbleP: false,
              disbleB: true
            }
            setipNumber(frmdata)
          }

        } else if (success === 0) {
          infoNotify(message)
        } else {
          infoNotify(message)
        }
      }
      if (value === 0) {
        if (in_patient_no !== '') {
          UpdateWifiManagement(patchdata)
        }
        else {
          infoNotify("Please fill the feilds")
        }
      }
    },
    [value, count, in_patient_no, patchdata],
  )

  const backtoSetting = useCallback(() => {
    history.push('/Home/Settings')
  }, [history])

  useEffect(() => {
    if (selectedRow.length !== 0) {
      const arr = selectedRow?.map((val) => {
        const obj = {
          in_patient_no: val.in_patient_no,
          patient: val.patient === 1 ? "Issued" : "Not Issued",
          bystander: val.bystander === 1 ? "Issued" : "Not Issued",
          extra: val.extra === 1 ? "Issued" : "Not Issued",
          patient_flag: val.patient,
          bystander_flag: val.bystander,
          extra_flag: val.extra,
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
      extra: false,
    }
    setipNumber(frmdata)
    setValue(0)
    setTabledata([])
  }, [setipNumber])

  const [qrCodeDis, setQrCodeDis] = useState('')
  const [QrModelOpen, SetQrModelOpen] = useState(false)
  const [qrModelFlag, setQrModelFlag] = useState(0)

  const QrModelPateint = useCallback((val) => {

    const { in_patient_no } = val

    const checking = {
      it_wifi_ipno: in_patient_no,
      it_wifi_flg: 'P'
    }
    const getdata = async (checking) => {
      const result = await axioslogin.post(`/wifiManagement/checkCodeNdGet`, checking);
      const { success, data } = result.data
      if (success === 2) {
        const { code } = data[0]
        setQrModelFlag(1)
        SetQrModelOpen(true)
        setQrCodeDis(code)
      }
      else {
        const result1 = await axioslogin.patch('/wifiManagement/updateQrCode', checking)
        const { succes } = result1.data
        if (succes === 2) {
          const result = await axioslogin.post(`/wifiManagement/checkCodeNdGet`, checking);
          const { success, data } = result.data
          if (success === 2) {
            const { code } = data[0]
            setQrModelFlag(1)
            SetQrModelOpen(true)
            setQrCodeDis(code)
          }
        }
        else {
          warningNotify("No vacant code")
        }
      }
    }
    getdata(checking)
  }, [setQrModelFlag, SetQrModelOpen])


  const QrModelByStander = useCallback((val) => {
    const { in_patient_no } = val

    const checking = {
      it_wifi_ipno: in_patient_no,
      it_wifi_flg: 'B'
    }
    const getdata = async (checking) => {
      const result = await axioslogin.post(`/wifiManagement/checkCodeNdGet`, checking);
      const { success, data } = result.data
      if (success === 2) {
        const { code } = data[0]
        setQrModelFlag(1)
        SetQrModelOpen(true)
        setQrCodeDis(code)
      }
      else {
        const result1 = await axioslogin.patch('/wifiManagement/updateQrCode', checking)
        const { succes } = result1.data
        if (succes === 2) {
          const result = await axioslogin.post(`/wifiManagement/checkCodeNdGet`, checking);
          const { success, data } = result.data
          if (success === 2) {
            const { code } = data[0]
            setQrModelFlag(1)
            SetQrModelOpen(true)
            setQrCodeDis(code)
          }
        }
        else {
          warningNotify("No vacant code")
        }
      }
    }
    getdata(checking)
  }, [setQrModelFlag, SetQrModelOpen])

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
    <CardMaster
      submit={submitWifiManagement}
      close={backtoSetting}
      refresh={refreshWindow}>

      <Box sx={{ display: 'flex', margin: 'auto', pt: 1, width: 800 }}>
        <Box sx={{ pt: .5, }}>

          <Typography>
            Enter IP Number
          </Typography>
        </Box>
        <Box sx={{ flex: .5, pl: 2, }}>
          <TextFieldCustom
            placeholder="IP Number"
            type="integer"
            size="sm"
            name="in_patient_no"
            value={in_patient_no}
            onchange={updateWifiManagement}
          ></TextFieldCustom>
        </Box>
        <Box sx={{ pl: 1, pt: .5, color: '#9DBED1', cursor: 'pointer', }}>
          <Tooltip title="search" placement="top">
            <SearchIcon onClick={() => searchIP()} />
          </Tooltip>
        </Box>
        <Box sx={{ flex: .5, pl: 1, pt: .5, color: '#9DBED1', cursor: 'pointer', }}>
          <Tooltip title="refresh" placement="top">
            <CachedIcon onClick={() => refreshWindow()} />
          </Tooltip>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', margin: 'auto', pt: 1, width: 500 }}>
        <Box sx={{ pt: 1, }}>
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
        <Box sx={{ pt: 1, pl: 3 }}>
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
        {/* <Box sx={{ pt: 1, pl: 3 }}>
          <CusCheckBox
            label="Extra"
            color="primary"
            size="md"
            name="extra"
            value={extra}
            checked={extra}
            onCheked={updateWifiManagement}
          ></CusCheckBox>
        </Box> */}
        <Box sx={{ pt: 1, pl: 3 }}>
          <Button onClick={submitWifiManagement} variant="contained"
            size="small" color="primary">Submit</Button>
        </Box>
      </Box>
      <Paper variant="outlined" sx={{ maxHeight: 720, maxWidth: '100%', overflow: 'auto', margin: 'auto', mt: 3 }}>
        {qrModelFlag === 1 ? <WifiQRCodeModel open={QrModelOpen} handleClose={handleClose} qrCodeDis={qrCodeDis} /> : null}
        <CssVarsProvider>
          <Table stickyHeader hoverRow>
            <thead>
              <tr >
                <th> IP address</th>
                <th >Patient</th>
                <th >Bystander</th>
                {/* <th >Extra</th> */}
              </tr>
            </thead>
            <tbody>
              {tabledata.map((val, index) => {
                return <tr
                  key={index}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    maxHeight: 50,
                    minHeight: 5
                  }}
                >
                  <td> {val.in_patient_no}</td>
                  {
                    val.patient_flag === 1 ? <td>
                      <QrCode2Icon size={6} onClick={() => QrModelPateint(val)} />
                    </td> :
                      <td> {val.patient}</td>
                  }

                  {
                    val.bystander_flag === 1 ? <td>
                      <QrCode2Icon size={6} onClick={() => QrModelByStander(val)} />
                    </td> :
                      <td> {val.bystander}</td>
                  }
                  {/* {
                    val.extra_flag === 1 ? <td>
                      <QrCode2Icon size={6} onClick={() => QrModelExtra(val)} />
                    </td> :
                      <td> {val.extra}</td>
                  } */}
                </tr>
              })}
            </tbody>
          </Table>
        </CssVarsProvider>
      </Paper>
    </CardMaster>
  )
}

export default memo(WifiManageMentMains)