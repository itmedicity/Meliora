import { Box, CssVarsProvider, Radio, Table, Tooltip, Typography } from '@mui/joy'
import { Paper } from '@mui/material'
import React, { memo, useCallback, useEffect, useState } from 'react'
import ViewListIcon from '@mui/icons-material/ViewList'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useSelector } from 'react-redux'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import SearchIcon from '@mui/icons-material/Search'
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import { axiosellider, axioslogin } from 'src/views/Axios/Axios'
import { format } from 'date-fns'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import IPEndoQIModal from './IPEndoQIModal'
import { useNavigate } from 'react-router-dom'

const EndoscopyIPPatients = ({ ChangeOPList, ChangeIPList, opCheck, ipCheck, setSearchFlag, qidept, depName }) => {
  const [ipNumber, setipNumber] = useState('')
  const [tabledata, setTabledata] = useState([])
  const [count, setCount] = useState(0)
  const [qiflag, setQiflag] = useState(0)
  const [modalopen, setModalOpen] = useState(false)
  const [rowSelect, setrowSelect] = useState([])

  const history = useNavigate()
  const backtoHome = useCallback(() => {
    history('/Home/QIPatientMarking')
    setSearchFlag(0)
  }, [history, setSearchFlag])

  const id = useSelector(state => {
    return state?.LoginUserData.empid
  })
  useEffect(() => {
    const getIpList = async () => {
      const result = await axioslogin.get('/qiendoscopy/viewIPList')
      const { success, data } = result.data
      if (success === 1) {
        setTabledata(data)
      } else {
      }
    }
    getIpList()
  }, [count])

  const SearchIpPatient = useCallback(() => {
    if (ipNumber === '') {
      infoNotify('Enter IP Number')
    } else {
      const getdata = async ipNumber => {
        const result = await axiosellider.get(`/qualityIndicator/getEndoIp/${ipNumber}`)
        return result.data
      }
      const InsertEndoData = async insertarray => {
        const result = await axioslogin.post('/qiendoscopy/saveIp', insertarray)
        return result.data
      }
      let pattern = /^[0-9]{10}$/
      if (pattern.test(ipNumber) === true) {
        getdata(ipNumber).then(val => {
          const { success, data } = val
          if (success === 1) {
            const insertarray = data?.map(val => {
              return {
                ip_no: val.IP_NO,
                ipd_date: format(new Date(val.IPD_DATE), 'yyyy-MM-dd HH:mm:ss'),
                ptno: val.PT_NO,
                ptname: val.PTC_PTNAME,
                ptsex: val.PTC_SEX,
                ptage: val.PTN_YEARAGE + 'Y ' + val.PTN_MONTHAGE + 'M ' + val.PTN_DAYAGE + 'D',
                ptaddrs1: val.PTC_LOADD1,
                ptaddrs2: val.PTC_LOADD2,
                ptaddrs3: val.PTC_LOADD3,
                ptaddrs4: val.PTC_LOADD4,
                ptmobile: val.PTC_MOBILE,
                ip_bed: val.BDC_NO,
                doctor_name: val.DOC_NAME,
                ip_nurstation: val.NSC_DESC,
                qi_dept_no: qidept,
                create_user: id,
                endo_arrival_time: format(new Date(), 'yyyy-MM-dd HH:mm:ss')
              }
            })
            InsertEndoData(insertarray).then(val => {
              const { success, message } = val
              if (success === 1) {
                setCount(count + 1)
                succesNotify(message)
                setipNumber('')
              } else {
                infoNotify(message)
              }
            })
          } else {
            infoNotify('Patient Discharged')
          }
        })
      } else {
        warningNotify('Please Enter 10 Digit IP Number')
      }
    }
  }, [ipNumber, qidept, id, count])
  const IndicatorsView = useCallback(val => {
    setModalOpen(true)
    setrowSelect(val)
    setQiflag(1)
  }, [])
  const handleClose = useCallback(() => {
    setModalOpen(false)
    setQiflag(0)
  }, [setModalOpen])
  return (
    <Box>
      {qiflag === 1 ? (
        <IPEndoQIModal
          open={modalopen}
          setQiflag={setQiflag}
          handleClose={handleClose}
          rowSelect={rowSelect}
          count={count}
          setCount={setCount}
          depName={depName}
          qidept={qidept}
        />
      ) : null}
      <Paper variant="outlined" square>
        <Box sx={{ display: 'flex', flex: 1, height: 40 }}>
          <Box sx={{ pl: 0.7, pt: 0.7 }}>
            <ViewListIcon sx={{ color: '#37474f', height: 30, width: 30, opacity: 0.8 }} />
          </Box>
          <Box sx={{ flex: 1, pt: 1, pl: 1 }}>
            <Typography sx={{ color: '#37474f', fontFamily: 'Arial', fontSize: 18 }}>Patient&apos;s List</Typography>
          </Box>
          <Box sx={{ flex: 0.4, display: 'flex', pt: 0.4 }}>
            <Box sx={{ pr: 1, pt: 0.7 }}>
              <CssVarsProvider>
                <Radio label="OP" color="primary" size="md" checked={opCheck} onChange={ChangeOPList} />
              </CssVarsProvider>
            </Box>
            <Box sx={{ px: 1, pt: 0.7 }}>
              <CssVarsProvider>
                <Radio label="IP" color="primary" size="md" checked={ipCheck} onChange={ChangeIPList} />
              </CssVarsProvider>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              fontSize: 20,
              pr: 0.5,
              pt: 0.4,
              pl: 0.5
            }}
          >
            <CssVarsProvider>
              <Tooltip title="Close" placement="bottom">
                <HighlightOffIcon
                  sx={{ cursor: 'pointer', height: 35, width: 35, opacity: 0.7, color: 'darkred' }}
                  onClick={backtoHome}
                />
              </Tooltip>
            </CssVarsProvider>
          </Box>
        </Box>
      </Paper>
      <Paper variant="outlined" square sx={{ display: 'flex', py: 1 }}>
        <Box sx={{ flex: 0.7 }}></Box>
        <Box sx={{ flex: 1 }}>
          <TextFieldCustom
            placeholder="Enter IP Number"
            width={300}
            type="text"
            size="md"
            name="ipNumber"
            value={ipNumber}
            onchange={e => setipNumber(e.target.value)}
          />
        </Box>
        <Box sx={{ flex: 0.7, pl: 1 }}>
          <CssVarsProvider>
            <Tooltip title="Search" placement="right">
              <SearchIcon sx={{ cursor: 'pointer', height: 35, width: 35 }} onClick={SearchIpPatient} />
            </Tooltip>
          </CssVarsProvider>
        </Box>
      </Paper>
      {tabledata.length !== 0 ? (
        <Box
          variant="outlined"
          sx={{
            overflow: 'auto',
            minHeight: window.innerHeight - 220,
            '&::-webkit-scrollbar': { height: 8 }
          }}
        >
          <CssVarsProvider>
            <Table
              aria-label="table with sticky header"
              borderAxis="both"
              padding={'none'}
              stickyHeader
              size="sm"
              stickyFooter
              hoverRow
            >
              <thead style={{ alignItems: 'center' }}>
                <tr style={{ height: 0.5 }}>
                  <th
                    size="sm"
                    style={{
                      width: 70,
                      backgroundColor: '#78909c',
                      color: 'white',
                      fontSize: 14,
                      textAlign: 'center'
                    }}
                  >
                    &nbsp; Sl.No
                  </th>
                  <th size="sm" style={{ width: 100, backgroundColor: '#78909c', color: 'white', fontSize: 14 }}>
                    &nbsp;IP No.
                  </th>
                  <th size="sm" style={{ width: 150, backgroundColor: '#78909c', color: 'white', fontSize: 14 }}>
                    &nbsp;IP Date
                  </th>
                  <th size="sm" style={{ width: 100, backgroundColor: '#78909c', color: 'white', fontSize: 14 }}>
                    &nbsp;Patient ID
                  </th>
                  <th size="sm" style={{ width: 170, backgroundColor: '#78909c', color: 'white', fontSize: 14 }}>
                    &nbsp;Patient Name
                  </th>
                  <th size="sm" style={{ width: 120, backgroundColor: '#78909c', color: 'white', fontSize: 14 }}>
                    &nbsp;Age/Gender
                  </th>
                  <th size="sm" style={{ width: 100, backgroundColor: '#78909c', color: 'white', fontSize: 14 }}>
                    &nbsp;Contacts{' '}
                  </th>
                  <th size="sm" style={{ width: 190, backgroundColor: '#78909c', color: 'white', fontSize: 14 }}>
                    &nbsp;Doctor Name
                  </th>
                  <th size="sm" style={{ width: 150, backgroundColor: '#78909c', color: 'white', fontSize: 14 }}>
                    &nbsp;Nursing Station{' '}
                  </th>
                  <th size="sm" style={{ width: 100, backgroundColor: '#78909c', color: 'white', fontSize: 14 }}>
                    &nbsp;Bed
                  </th>
                  <th size="sm" style={{ width: 150, backgroundColor: '#78909c', color: 'white', fontSize: 14 }}>
                    &nbsp;Arrival Time
                  </th>
                  <th
                    size="sm"
                    style={{
                      width: 100,
                      backgroundColor: '#78909c',
                      color: 'white',
                      fontSize: 14,
                      textAlign: 'center'
                    }}
                  >
                    &nbsp;QI Marking{' '}
                  </th>
                </tr>
              </thead>
              <tbody size="small">
                {tabledata?.map((val, index) => {
                  return (
                    <tr
                      key={val.qi_endo_ip_slno}
                      size="small"
                      style={{
                        maxHeight: 2,
                        cursor: 'pointer',
                        background: val.qi_save_status === 1 ? '#cfd8dc' : 'transparent'
                      }}
                    >
                      <td size="sm" style={{ fontSize: 12, height: 5, textAlign: 'center' }}>
                        {index + 1}
                      </td>
                      <td size="sm" style={{ fontSize: 12, height: 5 }}>
                        &nbsp;{val.ip_no}
                      </td>
                      <td size="sm" style={{ fontSize: 12, height: 5 }}>
                        &nbsp;{format(new Date(val.ipd_date), 'dd-MM-yyyy hh:mm a')}
                      </td>
                      <td size="sm" style={{ fontSize: 12, height: 5 }}>
                        &nbsp;{val.ptno}
                      </td>
                      <td size="sm" style={{ fontSize: 12, height: 5 }}>
                        &nbsp;{val.ptname}
                      </td>
                      <td size="sm" style={{ fontSize: 12, height: 5 }}>
                        &nbsp;{val.ptage + ' / ' + val.ptsex}
                      </td>
                      <td size="sm" style={{ fontSize: 12, height: 5 }}>
                        &nbsp;{val.ptmobile}
                      </td>
                      <td size="sm" style={{ fontSize: 12, height: 5 }}>
                        &nbsp;{'Dr. ' + val.doctor_name}
                      </td>
                      <td size="sm" style={{ fontSize: 12, height: 5 }}>
                        &nbsp;{val.ip_nurstation}
                      </td>
                      <td size="sm" style={{ fontSize: 12, height: 5 }}>
                        &nbsp;{val.ip_bed}
                      </td>
                      {/* {val.qi_save_status === 1 ? <td size='sm' style={{ fontSize: 12, height: 5 }}>&nbsp;{format(new Date(val.endo_arrival_time), 'dd-MM-yyyy hh:mm a')}</td>
                                            : <td size='sm' style={{ fontSize: 12, height: 5 }}>&nbsp;{"Not Updated"}</td>} */}
                      <td size="sm" style={{ fontSize: 12, height: 5 }}>
                        &nbsp;{format(new Date(val.endo_arrival_time), 'dd-MM-yyyy hh:mm a')}
                      </td>
                      <td size="sm" style={{ textAlign: 'center', height: 5 }}>
                        <CssVarsProvider>
                          <Tooltip title="QI Marking" placement="left">
                            <CheckCircleOutlineIcon
                              sx={{
                                color: '#546e7a',
                                ':hover': {
                                  color: '#263238'
                                }
                              }}
                              onClick={() => IndicatorsView(val)}
                            />
                          </Tooltip>
                        </CssVarsProvider>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </CssVarsProvider>
        </Box>
      ) : null}
    </Box>
  )
}

export default memo(EndoscopyIPPatients)
