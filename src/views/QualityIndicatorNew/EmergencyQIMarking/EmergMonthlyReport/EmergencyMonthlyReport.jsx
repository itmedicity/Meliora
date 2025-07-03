import { Box, Button, Chip, CssVarsProvider, Typography } from '@mui/joy'
import { Paper } from '@mui/material'
import React, { Fragment, memo, useCallback, useEffect, useState } from 'react'
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined'
import { axioslogin } from 'src/views/Axios/Axios'
import { endOfMonth, format, startOfMonth } from 'date-fns'
import { infoNotify } from 'src/views/Common/CommonCode'
import EmerAssessmentModal from '../EmergInitialAssessment/EmerAssessmentModal'

const EmergencyMonthlyReport = ({ viewData, searchDate, dayFlag }) => {
  const [searchFlag, setSearchFlag] = useState()
  const [tableData, setTableData] = useState([])
  // time flag for view assessment modal view
  const [timeFlag, setTimeFlag] = useState(0)
  const [timeModal, setTimeModal] = useState(false)
  // monthly modal view monthFlag is 2 (monthly Report)and monthFlag 1 in (initialassessment report )
  const [monthFlag, setMonthFlag] = useState(0)
  const [returnFlag, setReturnFlag] = useState(0)
  const [monthReport, setMonthReport] = useState({
    totalTime: 0,
    totalPatients: 0,
    totalReturn: 0,
    timeResult: 0,
    returnResult: 0,
  })
  const { totalTime, totalPatients, totalReturn, timeResult, returnResult } = monthReport
  useEffect(() => {
    if (viewData.length !== 0) {
      const patienttot = viewData.length
      const timetot = viewData
        ?.map(val => val.sumof_service_time)
        .reduce((prev, next) => Number(prev) + Number(next))
      const returnTot = viewData?.filter(val => val.return_status === 1)?.length

      const formData = {
        totalPatients: patienttot,
        totalTime: timetot,
        totalReturn: returnTot,
        timeResult: patienttot > 0 ? (timetot / patienttot).toFixed(2) : 0,
        returnResult: patienttot > 0 ? (returnTot / patienttot).toFixed(2) : 0,
      }
      setMonthReport(formData)
      setSearchFlag(1)
    }
  }, [viewData])
  const ViewWaitingTimeDetails = useCallback(() => {
    if (dayFlag === 1) {
      const newData = viewData?.filter(val => val.assessment_benchmark_flag === 1)
      setTableData(newData)
      setTimeFlag(1)
      setMonthFlag(2)
      setTimeModal(true)
    } else {
      const postdata = {
        from: format(startOfMonth(new Date(searchDate)), 'yyyy-MM-dd 00:00:00'),
        to: format(endOfMonth(new Date(searchDate)), 'yyyy-MM-dd 23:59:59 '),
      }
      const getInitialAssessmentList = async postdata => {
        const result = await axioslogin.post('/qiemergency/viewAssess', postdata)
        return result.data
      }
      getInitialAssessmentList(postdata).then(val => {
        const { success, data, message } = val
        if (success === 1) {
          setTableData(data)
          setTimeFlag(1)
          setMonthFlag(2)
          setReturnFlag(0)
          setTimeModal(true)
        } else if (success === 2) {
          infoNotify(message)
          setTimeFlag(0)
          setMonthFlag(0)
          setReturnFlag(0)
          setTimeModal(false)
        }
      })
    }
  }, [dayFlag, searchDate, viewData])

  const ViewPatientsReturnDetails = useCallback(() => {
    const newData = viewData?.filter(val => val.return_status === 1)
    setTableData(newData)
    setReturnFlag(1)
    setTimeFlag(1)
    setMonthFlag(2)
    setTimeModal(true)
  }, [viewData])
  const handleClose = useCallback(() => {
    setTimeModal(false)
    setTimeFlag(0)
  }, [])
  return (
    <Fragment>
      {timeFlag === 1 ? (
        <EmerAssessmentModal
          open={timeModal}
          handleClose={handleClose}
          patList={tableData}
          initdate={format(new Date(searchDate), 'MMM-yyyy')}
          monthFlag={monthFlag}
          returnFlag={returnFlag}
        />
      ) : null}
      <Box
        variant="outlined"
        sx={{ overflow: 'auto', maxHeight: window.innerHeight - 270, padding: 'none' }}
      >
        {searchFlag === 1 ? (
          <Box sx={{}}>
            <Paper variant="outlined" square sx={{ pt: 0.7, flex: 1 }}>
              <Box
                sx={{
                  fontSize: 12,
                  textTransform: 'uppercase',
                  pl: 2,
                  py: 0.5,
                  fontWeight: 650,
                  mx: 1,
                  color: '#555830',
                }}
              >
                Time Taken for initial assessment of patients attending emergency services
              </Box>
              <Box sx={{ border: '1px solid lightgrey', mx: 1, mb: 0.5, display: 'flex' }}>
                <Box sx={{ flex: 2 }}>
                  <Box sx={{ display: 'flex', pt: 0.5 }}>
                    <Box sx={{ flex: 1.5, p: 0.5 }}>
                      <Typography sx={{ fontSize: 15, pl: 0.4 }}>
                        Total Sum of Time Taken For Assessment
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        flex: 0.1,
                        p: 0.5,
                        fontWeight: 650,
                        display: 'flex',
                        justifyContent: 'flex-end',
                      }}
                    >
                      :
                    </Box>
                    <Box sx={{ flex: 0.3, p: 0.5 }}>
                      <Typography sx={{ fontSize: 15, pt: 0.1 }}>{totalTime}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex' }}>
                    <Box sx={{ flex: 1.5, p: 0.5 }}>
                      <Typography sx={{ fontSize: 15, pl: 0.4 }}>
                        Total Number Of Patients in Indoor/Emergency
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        flex: 0.1,
                        p: 0.5,
                        fontWeight: 650,
                        display: 'flex',
                        justifyContent: 'flex-end',
                      }}
                    >
                      :
                    </Box>
                    <Box sx={{ flex: 0.3, p: 0.5 }}>
                      <Typography sx={{ fontSize: 15, pt: 0.1 }}>{totalPatients}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex' }}>
                    <Box sx={{ flex: 1.5, p: 0.5 }}>
                      <Typography sx={{ fontSize: 15, pl: 0.4 }}>Result</Typography>
                    </Box>
                    <Box
                      sx={{
                        flex: 0.1,
                        p: 0.5,
                        fontWeight: 650,
                        display: 'flex',
                        justifyContent: 'flex-end',
                      }}
                    >
                      :
                    </Box>
                    <Box sx={{ flex: 0.3, p: 0.5 }}>
                      <CssVarsProvider>
                        {timeResult > 10 ? (
                          <Chip size="md" variant="outlined" sx={{ color: '#bf360c' }}>
                            {timeResult}
                          </Chip>
                        ) : (
                          <Chip size="md" variant="outlined" sx={{ color: '#32CD30' }}>
                            {timeResult}
                          </Chip>
                        )}
                      </CssVarsProvider>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ flex: 0.4 }}>
                  <Box sx={{ flex: 0.5, pt: 4, pr: 1 }}>
                    <CssVarsProvider>
                      <Button
                        variant="outlined"
                        color="neutral"
                        size="sm"
                        sx={{
                          height: 40,
                          width: 300,
                          display: 'flex',
                          justifyContent: 'flex-start',
                          borderRadius: 10,
                        }}
                        startDecorator={
                          <TimerOutlinedIcon
                            sx={{ color: '#827717', cursor: 'pointer', height: 30, width: 35 }}
                            fontSize="large"
                          />
                        }
                        onClick={ViewWaitingTimeDetails}
                      >
                        View Waiting Time Details
                      </Button>
                    </CssVarsProvider>
                  </Box>
                  <Box sx={{ px: 1, display: 'flex', justifyContent: 'flex-end', pt: 0.5 }}>
                    <Typography sx={{ color: 'darkred', fontSize: 11 }}>
                      * BenchMark Value is 0
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Paper>
            <Paper variant="outlined" square sx={{ pt: 0.7, flex: 1 }}>
              <Box
                sx={{
                  fontSize: 12,
                  textTransform: 'uppercase',
                  pl: 2,
                  py: 0.5,
                  fontWeight: 650,
                  mx: 1,
                  color: '#555830',
                }}
              >
                Return To Emergency Department Within 72 Hrs With Similar Presenting Complaints
              </Box>
              <Box sx={{ border: '1px solid lightgrey', mx: 1, mb: 0.5, display: 'flex' }}>
                <Box sx={{ flex: 2 }}>
                  <Box sx={{ display: 'flex', pt: 0.5 }}>
                    <Box sx={{ flex: 1.5, p: 0.5 }}>
                      <Typography sx={{ fontSize: 15, pl: 0.4 }}>
                        Total Number Of Returns To Emergency Within 72 Hrs With Similar Presenting
                        Complaints
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        flex: 0.1,
                        p: 0.5,
                        fontWeight: 650,
                        display: 'flex',
                        justifyContent: 'flex-end',
                      }}
                    >
                      :
                    </Box>
                    <Box sx={{ flex: 0.3, p: 0.5 }}>
                      <Typography sx={{ fontSize: 15, pt: 0.1 }}>{totalReturn}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex' }}>
                    <Box sx={{ flex: 1.5, p: 0.5 }}>
                      <Typography sx={{ fontSize: 15, pl: 0.4 }}>
                        Total Number Of Patients Who Have Come To The Emergency
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        flex: 0.1,
                        p: 0.5,
                        fontWeight: 650,
                        display: 'flex',
                        justifyContent: 'flex-end',
                      }}
                    >
                      :
                    </Box>
                    <Box sx={{ flex: 0.3, p: 0.5 }}>
                      <Typography sx={{ fontSize: 15, pt: 0.1 }}>{totalPatients}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex' }}>
                    <Box sx={{ flex: 1.5, p: 0.5 }}>
                      <Typography sx={{ fontSize: 15, pl: 0.4 }}>Result</Typography>
                    </Box>
                    <Box
                      sx={{
                        flex: 0.1,
                        p: 0.5,
                        fontWeight: 650,
                        display: 'flex',
                        justifyContent: 'flex-end',
                      }}
                    >
                      :
                    </Box>
                    <Box sx={{ flex: 0.3, p: 0.5 }}>
                      <CssVarsProvider>
                        {returnResult > 0 ? (
                          <Chip size="md" variant="outlined" sx={{ color: '#bf360c' }}>
                            {returnResult}
                          </Chip>
                        ) : (
                          <Chip size="md" variant="outlined" sx={{ color: '#32CD30' }}>
                            {returnResult}
                          </Chip>
                        )}
                      </CssVarsProvider>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ flex: 0.4 }}>
                  <Box sx={{ flex: 0.5, pt: 4, pr: 1 }}>
                    <CssVarsProvider>
                      <Button
                        variant="outlined"
                        color="neutral"
                        size="sm"
                        sx={{
                          height: 40,
                          width: 300,
                          display: 'flex',
                          justifyContent: 'flex-start',
                          borderRadius: 10,
                        }}
                        startDecorator={
                          <TimerOutlinedIcon
                            sx={{ color: '#827717', cursor: 'pointer', height: 30, width: 35 }}
                            fontSize="large"
                          />
                        }
                        onClick={ViewPatientsReturnDetails}
                      >
                        View Details
                      </Button>
                    </CssVarsProvider>
                  </Box>
                  <Box sx={{ px: 1, display: 'flex', justifyContent: 'flex-end', pt: 0.5 }}>
                    <Typography sx={{ color: 'darkred', fontSize: 11 }}>
                      * BenchMark Value is 10 min
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Box>
        ) : (
          <Box></Box>
        )}
      </Box>
    </Fragment>
  )
}

export default memo(EmergencyMonthlyReport)
