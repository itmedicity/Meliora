import React, { useEffect, useMemo, useState } from 'react'
import {
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import IconButton from '@mui/joy/IconButton'
import { CssVarsProvider } from '@mui/joy'
import { useDispatch, useSelector } from 'react-redux'
// import { getEscalationMaster } from 'src/redux/actions/EscalationMaster.action'
import CardCloseOnly from 'src/views/Components/CardCloseOnly'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify } from 'src/views/Common/CommonCode'
import { getescalationlvl4 } from 'src/redux/actions/Level4Escalation.action'
import Level4Table from './Level4Table'
import { getEscalationMapping } from 'src/redux/actions/EscalationMapping.action'
import { getEscalationMappingLvl4Main } from 'src/redux/actions/EscalationMappingLvl4Main.action'
import { getEscalationMappingLvl4It } from 'src/redux/actions/EscalationMappingLvl4It.action'
const Level4escalation = () => {
  const dispatch = useDispatch()
  // Get login user emp_id
  const id = useSelector(state => {
    return state.LoginUserData.empid
  })
  //  redux for getting escalation master
  // useEffect(() => {
  //     dispatch(getEscalationMaster());
  // }, [dispatch])
  // const level4 = useSelector((state) => {
  //     return state.getEscalationMaster.escalationList || 0
  // })
  //state for spreading time esc map data
  const [esc, setEsc] = useState({
    esc_slno: '',
    complaint_deptslno: ''
  })
  //state for table open on clicking counts
  const [ab, setAb] = useState(0)
  // state for redux rendering by clicking count
  const [bc, setBc] = useState(0)
  // functions when user clicked count button
  const getData = async slno => {
    const result = await axioslogin.get(`/timeescalation/byid/${slno}`)
    const { success, data, message } = result.data
    if (success === 1) {
      const { escalaion_slno, complaint_dept } = data[0]
      const frmdata = {
        esc_slno: escalaion_slno,
        complaint_deptslno: complaint_dept
      }
      setEsc(frmdata)
      setBc(1)
      setAb(1)
    } else if (success === 0) {
      infoNotify(message)
      setAb(0)
    }
    setBc(0)
  }
  //destrucring the data from api result
  const { esc_slno, complaint_deptslno } = esc
  //data for getting complaint liste based on button click and this data passed to redux
  const timeescalationData = useMemo(() => {
    return {
      esc_slno: esc_slno,
      complaint_deptslno: complaint_deptslno
    }
  }, [esc_slno, complaint_deptslno])
  //getting data when count button clicked
  const [check, setCheck] = useState(1)
  useEffect(() => {
    if (bc !== 0) {
      dispatch(getescalationlvl4(timeescalationData)).then(() => {
        setCheck(2)
      })
    }
  }, [dispatch, bc, timeescalationData])
  // data based on departments eg:IT, Main
  const complaints = useSelector(state => {
    return state.getescalationlvl4.lvl4scalation
  })
  // for notification windw when there no data in const complaints
  useEffect(() => {
    if (check === 2 && Object.values(complaints).length === 0) {
      infoNotify('No Data found')
    }
  }, [complaints, check])
  // data from time esc mapping
  useEffect(() => {
    dispatch(getEscalationMapping())
  }, [dispatch])
  // redux data from co_time_esc_mapping
  const escmap = useSelector(state => {
    return state.getEscalationMapping.escalationMapping
  })
  //count get data for it
  const [it, setIt] = useState({})
  useEffect(() => {
    if (escmap.length !== 0) {
      const { escalaion_slno, complaint_dept } = escmap[0]
      const from = {
        esc_slno: escalaion_slno,
        complaint_deptslno: complaint_dept
      }
      setIt(from)
    }
  }, [escmap])
  //count get data for maintenance
  const [main, setMain] = useState({})
  useEffect(() => {
    if (escmap.length !== 0) {
      const { escalaion_slno, complaint_dept } = escmap[1]
      const from1 = {
        esc_slno: escalaion_slno,
        complaint_deptslno: complaint_dept
      }
      setMain(from1)
    }
  }, [escmap])
  //for it complaints counts
  const postdata = useMemo(() => {
    return {
      esc_slno: it.esc_slno,
      complaint_deptslno: it.complaint_deptslno
    }
  }, [it])
  //for maintenance complaints counts
  const postdata2 = useMemo(() => {
    return {
      esc_slno: main.esc_slno,
      complaint_deptslno: main.complaint_deptslno
    }
  }, [main])
  //reduce function  for getting counts
  useEffect(() => {
    if (escmap.length !== 0) {
      dispatch(getEscalationMappingLvl4Main(postdata2))
      dispatch(getEscalationMappingLvl4It(postdata))
    }
  }, [escmap, dispatch, id, postdata2, postdata])
  // counts values
  const Counts = useSelector(state => {
    return {
      countmain: state.getEscalationMappingLvl4Main.escalationMappingLvl4Main || 0,
      countit: state.getEscalationMappingLvl4It.escalationMappingLvl4It || 0
    }
  })
  // destrucuring and setting into another states
  const { countmain, countit } = Counts
  const [counmain3, setCountmain] = useState(0)
  const [countIt3, setCountit] = useState(0)
  useEffect(() => {
    if (countmain.length !== 0 && countit.length !== 0) {
      setCountmain(countmain[0].total)
      setCountit(countit[0].total)
    }
  }, [countmain, countit])
  //mapping the count and esclation
  const newarray = [
    { esc_slno: '1', esc_activity: 'RIEOT', count: 0 },
    { esc_slno: '2', esc_activity: 'PACKAGE COUNSELLING', count: 0 },
    { esc_slno: '3', esc_activity: 'BED MAKING', count: 0 },
    { esc_slno: '4', esc_activity: 'ROOM CLEANING', count: 0 },
    { esc_slno: '5', esc_activity: 'DIETARY FIRST SYSTEM INPUT', count: 0 },
    { esc_slno: '6', esc_activity: 'DIETITICIAN CONSULTATION NEW ADMISSION', count: 0 },
    { esc_slno: '7', esc_activity: 'BREAK FAST', count: 0 },
    { esc_slno: '8', esc_activity: 'LUNCH', count: 0 },
    { esc_slno: '9', esc_activity: 'DINNER', count: 0 },
    { esc_slno: '10', esc_activity: 'MAINTENANCE COMPLAINTS', count: counmain3 },
    { esc_slno: '11', esc_activity: 'IT COMPLAINTS', count: countIt3 },
    { esc_slno: '12', esc_activity: 'FACILITY ARRANGEMENTS', count: 0 },
    { esc_slno: '13', esc_activity: 'INSURANCE DOCUMENTS', count: 0 },
    { esc_slno: '14', esc_activity: 'SFA CLEARANCE', count: 0 },
    { esc_slno: '15', esc_activity: 'DISCHARGE CLEANING', count: 0 }
  ]
  return (
    <CardCloseOnly title="Escalation Level 4">
      <Box
        sx={{
          p: 1
        }}
      >
        <Paper square elevation={3} sx={{ p: 2 }}>
          <Box sx={{}}>
            <Box
              sx={{
                display: 'flex'
              }}
            >
              <TableContainer>
                <Table style={{ border: '1px solid', minWidth: 500, borderColor: '#F0F3F5' }}>
                  {/* head section */}
                  <TableHead>
                    <TableRow
                      sx={{
                        border: '1px solid',
                        borderColor: '#F0F3F5',
                        P: 0.5
                      }}
                    >
                      <TableCell
                        sx={{
                          p: 0.7,
                          fontWeight: 'bold',
                          color: 'gray'
                        }}
                      >
                        {/* Time Level */}
                        {/* <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>  Acitivities</Typography> */}
                        <Typography
                          sx={{
                            fontSize: 14,
                            fontWeight: 'bold'
                          }}
                        >
                          {' '}
                          Activities
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  {/* head section ends */}
                  <TableBody>
                    <TableRow>
                      <TableCell
                        sx={{
                          border: '1px solid',
                          borderColor: '#F0F3F5',
                          p: 0.5,
                          overflow: 'hidden'
                        }}
                      ></TableCell>
                      <TableCell
                        rowSpan="70"
                        sx={{
                          width: '100%'
                        }}
                      >
                        <Box
                          sx={{
                            height: 1000,
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column'
                          }}
                        >
                          {ab === 1 && complaints.length !== 0 ? <Level4Table complaints={complaints} /> : null}
                        </Box>
                      </TableCell>
                    </TableRow>
                    {newarray &&
                      newarray.map(val => (
                        <TableRow key={val.esc_slno} sx={{}}>
                          <TableCell
                            padding="none"
                            size="medium"
                            variant="head"
                            sx={{
                              width: '20%',
                              border: '1px solid',
                              borderColor: '#F0F3F5',
                              p: 1
                            }}
                          >
                            <Grid container spacing={2}>
                              <Grid
                                item
                                xl={8}
                                xs={8}
                                sm={8}
                                md={8}
                                lg={8}
                                sx={{
                                  p: 0,
                                  mt: 0.5,
                                  height: 20
                                }}
                              >
                                <Typography
                                  sx={{
                                    fontSize: 15.5,
                                    mt: 1
                                  }}
                                >
                                  {val.esc_activity.charAt(0).toUpperCase() + val.esc_activity.slice(1).toLowerCase()}
                                </Typography>
                              </Grid>
                              <Grid
                                item
                                xl={4}
                                xs={4}
                                sm={4}
                                md={4}
                                lg={4}
                                sx={{
                                  mb: 1
                                }}
                              >
                                <CssVarsProvider>
                                  <IconButton
                                    variant="outlined"
                                    size="sm"
                                    color="primary"
                                    sx={{
                                      mt: 0.8
                                    }}
                                    onClick={e => getData(val.esc_slno)}
                                  >
                                    {val.count}
                                  </IconButton>
                                </CssVarsProvider>
                              </Grid>
                            </Grid>
                          </TableCell>
                        </TableRow>
                      ))}
                    <TableRow></TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
        </Paper>
      </Box>
    </CardCloseOnly>
  )
}
export default Level4escalation
