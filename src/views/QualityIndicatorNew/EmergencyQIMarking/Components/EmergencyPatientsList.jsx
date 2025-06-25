import React, { Fragment, memo, useCallback, useEffect, useState } from 'react'
import ListIcon from '@mui/icons-material/List'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useSelector } from 'react-redux'
import ChangeCircleOutlinedIcon from '@mui/icons-material/ChangeCircleOutlined'
import { Box, CssVarsProvider, Input, Table, Tooltip, Typography } from '@mui/joy'
import { Paper } from '@mui/material'
import { format } from 'date-fns'
import PersonSearchTwoToneIcon from '@mui/icons-material/PersonSearchTwoTone'
import { axioslogin } from 'src/views/Axios/Axios'
import EmergencyModalQI from './EmergencyModalQI'
import { RefreshEmergency } from './RefreshEmergency'
import { useNavigate } from 'react-router-dom'

const EmergencyPatientsList = ({
  setSearchFlag,
  dailyDate,
  count,
  setCount,
  qidept,
  depCode,
  qitype,
}) => {
  const [patientlist, setpatientlist] = useState([])
  const [qiflag, setQiflag] = useState(0)
  const [modalopen, setModalOpen] = useState(false)
  const [rowSelect, setrowSelect] = useState([])
  const [searchPat, setSearchPat] = useState('')
  const [tabFlag, setTabFlag] = useState(0)
  const history = useNavigate()

  const id = useSelector((state) => {
    return state?.LoginUserData.empid
  })
  const backtoHome = useCallback(() => {
    history('/Home/QIPatientMarking')
    setSearchFlag(0)
  }, [history, setSearchFlag])

  useEffect(() => {
    if (qitype === 2) {
      const viewdata = {
        from: format(new Date(dailyDate), 'yyyy-MM-dd 00:00:00'),
        to: format(new Date(dailyDate), 'yyyy-MM-dd 23:59:59'),
      }
      const getEmergencyData = async (viewdata) => {
        const result = await axioslogin.post('/qiemergency/viewList', viewdata)
        return result.data
      }
      getEmergencyData(viewdata).then((val) => {
        const { success, data } = val
        if (success === 1) {
          setpatientlist(data)
          setTabFlag(1)
        } else {
          setTabFlag(0)
        }
      })
    }
  }, [dailyDate, count, qitype, setpatientlist])

  const IndicatorsView = useCallback((val) => {
    setModalOpen(true)
    setrowSelect(val)
    setQiflag(1)
  }, [])
  const handleClose = useCallback(() => {
    setModalOpen(false)
    setQiflag(0)
  }, [setModalOpen])

  const RefreshData = useCallback(() => {
    const RefreshPatients = async (setCount) => {
      await RefreshEmergency(qidept, count, setCount, depCode, id, dailyDate)
    }
    RefreshPatients(setCount)
    setSearchPat('')
  }, [qidept, depCode, count, id, setCount, dailyDate])
  const ChangePatient = useCallback((e) => {
    setSearchPat(e.target.value)
  }, [])

  useEffect(() => {
    const searchData = {
      from: format(new Date(dailyDate), 'yyyy-MM-dd 00:00:00'),
      to: format(new Date(dailyDate), 'yyyy-MM-dd 23:59:59'),
      ptname: searchPat,
    }
    const getSearchDetails = async (searchData) => {
      const result = await axioslogin.post('/qiemergency/searchbyPatient', searchData)
      return result.data
    }
    getSearchDetails(searchData).then((val) => {
      const { success, data } = val
      if (success === 1) {
        setpatientlist(data)
        setTabFlag(1)
      } else {
        setTabFlag(0)
      }
    })
  }, [dailyDate, searchPat])

  return (
    <Fragment>
      {qiflag === 1 ? (
        <EmergencyModalQI
          open={modalopen}
          setQiflag={setQiflag}
          handleClose={handleClose}
          rowSelect={rowSelect}
          dailyDate={dailyDate}
          RefreshData={RefreshData}
        />
      ) : null}
      <Paper variant="outlined" square>
        <Box sx={{ display: 'flex', flex: 1, height: 40 }}>
          <Box sx={{ pl: 0.7, pt: 0.7 }}>
            <ListIcon sx={{ color: '#37474f', height: 30, width: 25 }} />
          </Box>
          <Box sx={{ flex: 1, fontSize: 17, pt: 1, pl: 0.5 }}>
            <Typography sx={{ color: '#37474f', fontFamily: 'Arial' }}>
              Emergency Patient&apos;s List
            </Typography>
          </Box>
          {tabFlag === 1 ? (
            <>
              <Box sx={{ display: 'flex' }}>
                <Box sx={{ pl: 0.5, pt: 0.2 }}>
                  <CssVarsProvider>
                    <Input
                      startDecorator={
                        <PersonSearchTwoToneIcon sx={{ height: 30, width: 30, color: '#0063C5' }} />
                      }
                      size="sm"
                      placeholder="Search By Patient Name"
                      name="searchPat"
                      value={searchPat}
                      onChange={ChangePatient}
                      sx={{ width: 250, height: 35 }}
                      // endDecorator={<Button>Message</Button>}
                    />
                  </CssVarsProvider>
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  fontSize: 20,
                  pr: 0.3,
                  pt: 0.4,
                  pl: 0.5,
                }}
              >
                <CssVarsProvider>
                  <Tooltip title="Refresh" placement="bottom">
                    <ChangeCircleOutlinedIcon
                      sx={{
                        cursor: 'pointer',
                        height: 35,
                        width: 35,
                        opacity: 0.7,
                        color: 'darkgreen',
                      }}
                      onClick={RefreshData}
                    />
                  </Tooltip>
                </CssVarsProvider>
              </Box>
            </>
          ) : (
            <Box> </Box>
          )}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', fontSize: 20, pr: 0.5, pt: 0.4 }}>
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
        {tabFlag === 1 ? (
          <Box>
            <Box
              variant="outlined"
              sx={{
                overflow: 'auto',
                maxHeight: window.innerHeight - 180,
                '&::-webkit-scrollbar': { height: 6 },
                cursor: 'pointer',
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
                          textAlign: 'center',
                        }}
                      >
                        &nbsp; Sl.No
                      </th>
                      <th
                        size="sm"
                        style={{
                          width: 100,
                          backgroundColor: '#78909c',
                          color: 'white',
                          fontSize: 14,
                        }}
                      >
                        &nbsp;Patient ID
                      </th>
                      <th
                        size="sm"
                        style={{
                          width: 150,
                          backgroundColor: '#78909c',
                          color: 'white',
                          fontSize: 14,
                        }}
                      >
                        &nbsp;Patient Name
                      </th>
                      <th
                        size="sm"
                        style={{
                          width: 120,
                          backgroundColor: '#78909c',
                          color: 'white',
                          fontSize: 14,
                        }}
                      >
                        &nbsp;Age/Gender
                      </th>
                      <th
                        size="sm"
                        style={{
                          width: 100,
                          backgroundColor: '#78909c',
                          color: 'white',
                          fontSize: 14,
                        }}
                      >
                        &nbsp;Contacts{' '}
                      </th>
                      <th
                        size="sm"
                        style={{
                          width: 150,
                          backgroundColor: '#78909c',
                          color: 'white',
                          fontSize: 14,
                        }}
                      >
                        &nbsp;Doctor Name
                      </th>
                      <th
                        size="sm"
                        style={{
                          width: 70,
                          backgroundColor: '#78909c',
                          color: 'white',
                          fontSize: 14,
                          textAlign: 'center',
                        }}
                      >
                        &nbsp;Token{' '}
                      </th>
                      <th
                        size="sm"
                        style={{
                          width: 160,
                          backgroundColor: '#78909c',
                          color: 'white',
                          fontSize: 14,
                        }}
                      >
                        &nbsp;Arrival Time{' '}
                      </th>
                      <th
                        size="sm"
                        style={{
                          width: 100,
                          backgroundColor: '#78909c',
                          color: 'white',
                          fontSize: 14,
                          textAlign: 'center',
                        }}
                      >
                        &nbsp;QI Marking{' '}
                      </th>
                    </tr>
                  </thead>
                  <tbody size="small">
                    {patientlist?.map((val, index) => {
                      return (
                        <tr
                          key={val.qi_slno}
                          size="small"
                          style={{
                            cursor: 'pointer',
                            background: val.qi_save_status === 1 ? '#cfd8dc' : 'transparent',
                          }}
                        >
                          <td size="sm" style={{ fontSize: 12, textAlign: 'center' }}>
                            {index + 1}
                          </td>
                          <td size="sm" style={{ fontSize: 12 }}>
                            &nbsp;{val.ptno}
                          </td>
                          <td size="sm" style={{ fontSize: 12 }}>
                            &nbsp;{val.ptname}
                          </td>
                          <td size="sm" style={{ fontSize: 12 }}>
                            &nbsp;{val.ptage + ' / ' + val.ptsex}
                          </td>
                          <td size="sm" style={{ fontSize: 12 }}>
                            &nbsp;{val.ptmobile}
                          </td>
                          <td size="sm" style={{ fontSize: 12 }}>
                            &nbsp;{'Dr. ' + val.doctor_name}
                          </td>
                          <td size="sm" style={{ fontSize: 12, textAlign: 'center' }}>
                            &nbsp;{val.visit_token}
                          </td>
                          <td size="sm" style={{ fontSize: 12 }}>
                            &nbsp;{format(new Date(val.patient_arrived_date), 'dd-MM-yyyy hh:mm a')}
                          </td>
                          <td size="sm" style={{ textAlign: 'center' }}>
                            <CssVarsProvider>
                              <Tooltip title="QI Marking" placement="left">
                                <CheckCircleOutlineIcon
                                  sx={{
                                    color: '#546e7a',
                                    ':hover': {
                                      color: '#263238',
                                    },
                                  }}
                                  onClick={(e) => IndicatorsView(val)}
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
          </Box>
        ) : (
          <Box
            sx={{
              height: '39vh',
              display: 'flex',
              justifyContent: 'center',
              fontSize: 20,
              opacity: 0.8,
            }}
          >
            No Patients
          </Box>
        )}
      </Paper>
    </Fragment>
  )
}

export default memo(EmergencyPatientsList)
