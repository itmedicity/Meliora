import React, { Fragment, memo, useCallback, useEffect, useState } from 'react'
import { Avatar, Box, CssVarsProvider, Input, Tooltip, Typography } from '@mui/joy'
import { Paper } from '@mui/material'
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { infoNotify } from '../Common/CommonCode'
import { endOfMonth, format, startOfMonth } from 'date-fns'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone'
import { useDispatch, useSelector } from 'react-redux'
import { getQltyDept } from 'src/redux/actions/QualityIndicatorDept.action'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import QiDeptInitailassessmentSelect from '../CommonSelectCode/QiDeptInitailassessmentSelect'
import { axioslogin } from '../Axios/Axios'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import OPAssessmentTimeReport from './OPWaitingTime/OPAssessmentTimeReport'
import { useNavigate } from 'react-router-dom'

const InitialAssessmentTimeReport = () => {
  const [qidept, setQidept] = useState(0)
  const [depCode, setDepCode] = useState('')
  const [searchDate, setSearchDate] = useState(format(new Date(), 'yyyy-MM-dd'))
  const [searchFlag, setsearchFlag] = useState(0)
  const [viewData, setviewData] = useState([])
  const [qitype, setQitype] = useState(0)

  const history = useNavigate()
  const dispatch = useDispatch()
  const backtoHome = useCallback(() => {
    history('/Home')
  }, [history])
  const id = useSelector(state => {
    return state?.LoginUserData.empid
  })
  useEffect(() => {
    dispatch(getQltyDept(id))
  }, [dispatch, id])
  const OnchangeDate = useCallback(newValue => {
    setSearchDate(newValue)
    setsearchFlag(0)
  }, [])
  const SearchMonthlyTimeReport = useCallback(async () => {
    if (qitype === 0) {
      infoNotify('Select Department')
      setsearchFlag(0)
    } else if (qitype === 6) {
      const searchOPDatas = {
        from: format(startOfMonth(new Date(searchDate)), 'yyyy-MM-dd 00:00:00'),
        to: format(endOfMonth(new Date(searchDate)), 'yyyy-MM-dd 23:59:59'),
        dpt: qidept,
      }
      const getOpData = async searchOPDatas => {
        const result = await axioslogin.post('/InitialAsessment/view', searchOPDatas)
        return result.data
      }
      getOpData(searchOPDatas).then(val => {
        const { success, data, message } = val
        if (success === 1) {
          setviewData(data)
          setsearchFlag(1)
        } else if (success === 2) {
          infoNotify(message)
          setsearchFlag(0)
        }
      })
    }
  }, [qitype, searchDate, qidept])
  return (
    <Fragment>
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ flex: 0.3 }}></Box>
        <Paper square variant="outlined" sx={{ flex: 1 }}>
          <Box sx={{ display: 'flex', flex: 1, borderColor: 'lightgrey', flexWrap: 'wrap' }}>
            <Box sx={{ flex: 1, fontSize: 16, pl: 1, pt: 1.3 }}>
              <Typography
                sx={{
                  fontFamily: 'Arial',
                  fontSize: 14,
                  textTransform: 'uppercase',
                  fontWeight: 550,
                }}
              >
                Initial Assessment Report
              </Typography>
            </Box>
            <Box
              sx={{ display: 'flex', justifyContent: 'flex-end', fontSize: 20, pr: 0.5, pt: 0.5 }}
            >
              <CssVarsProvider>
                <Tooltip title="Close" placement="bottom">
                  <HighlightOffIcon
                    sx={{
                      cursor: 'pointer',
                      height: 30,
                      width: 30,
                      ':hover': {
                        color: '#e57373',
                      },
                    }}
                    onClick={backtoHome}
                  />
                </Tooltip>
              </CssVarsProvider>
            </Box>
          </Box>
          <Paper square variant="outlined" sx={{ display: 'flex', pt: 0.4, flexWrap: 'wrap' }}>
            <Box sx={{ flex: 1 }}></Box>
            <Box sx={{ display: 'flex', m: 2, flex: 1 }}>
              <CssVarsProvider>
                <Avatar size="md" variant="plain" sx={{ bgcolor: '#ede7f6' }}>
                  <LocationOnIcon sx={{ color: '#4527a0' }} />
                </Avatar>
              </CssVarsProvider>
              <Box sx={{}}>
                <Box sx={{ pl: 2, fontSize: 12, color: '#4527a0' }}>
                  DEPARTMENT <KeyboardArrowDownIcon fontSize="small" />
                </Box>
                <Box sx={{ pl: 0.5 }}>
                  <QiDeptInitailassessmentSelect
                    qidept={qidept}
                    setQidept={setQidept}
                    setQitype={setQitype}
                    setDepCode={setDepCode}
                    setsearchFlag={setsearchFlag}
                  />
                </Box>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', m: 2, flex: 1 }}>
              <CssVarsProvider>
                <Avatar size="md" variant="plain" sx={{ bgcolor: '#ede7f6' }}>
                  <CalendarMonthIcon sx={{ color: '#4527a0' }} />
                </Avatar>
              </CssVarsProvider>
              <Box sx={{}}>
                <Box sx={{ pl: 2, fontSize: 12, color: '#4527a0' }}>
                  DATE <KeyboardArrowDownIcon fontSize="small" />
                </Box>
                <Box sx={{ pl: 0.5 }}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      value={searchDate}
                      views={['year', 'month']}
                      size="sm"
                      inputFormat="MMM-yyyy"
                      maxDate={new Date()}
                      onChange={e => OnchangeDate(e)}
                      renderInput={({ inputRef, inputProps, InputProps }) => (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <CssVarsProvider>
                            <Input
                              ref={inputRef}
                              {...inputProps}
                              fullWidth
                              sx={{
                                bgcolor: 'white',
                                padding: 'none',
                                size: 'sm',
                                borderRadius: 20,
                                fontSize: 14,
                              }}
                              disabled={true}
                            />
                          </CssVarsProvider>
                          {InputProps?.endAdornment}
                        </Box>
                      )}
                    />
                  </LocalizationProvider>
                </Box>
              </Box>
            </Box>
            <Box sx={{ flex: 1, pl: 2, my: 3 }}>
              <CssVarsProvider>
                <Tooltip title="Search" placement="right">
                  <SearchTwoToneIcon
                    sx={{ color: '#311b92', cursor: 'pointer', height: 35, width: 35 }}
                    onClick={SearchMonthlyTimeReport}
                  />
                </Tooltip>
              </CssVarsProvider>
            </Box>
            <Box sx={{ flex: 1 }}></Box>
          </Paper>
          <>
            {searchFlag === 1 ? (
              <OPAssessmentTimeReport
                viewData={viewData}
                searchDate={searchDate}
                qidept={qidept}
                depCode={depCode}
              />
            ) : null}
          </>
        </Paper>
        <Box sx={{ flex: 0.3 }}></Box>
      </Box>
    </Fragment>
  )
}
export default memo(InitialAssessmentTimeReport)
