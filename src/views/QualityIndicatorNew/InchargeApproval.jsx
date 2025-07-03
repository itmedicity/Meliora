import React, { memo, useCallback, useEffect } from 'react'
import ManageSearchTwoToneIcon from '@mui/icons-material/ManageSearchTwoTone'
import { Box, CssVarsProvider, Input, Tooltip, Typography } from '@mui/joy'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { useDispatch, useSelector } from 'react-redux'
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useState } from 'react'
import { getQltyDept } from 'src/redux/actions/QualityIndicatorDept.action'
import { Paper } from '@mui/material'
import { eachDayOfInterval, endOfMonth, format, startOfMonth } from 'date-fns'
import { infoNotify } from '../Common/CommonCode'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import DepartmentSelectForQuality from '../CommonSelectCode/DepartmentSelectForQuality'
import EndoInchargeApproval from './EndoscopyQIMarking/EndoInchargeApproval/EndoInchargeApproval'
import { EndoscopyMonthlyReportView } from './EndoscopyQIMarking/MonthlyReport/MonthlyReportView'
import { axioslogin } from '../Axios/Axios'
import { MonthlyReportEmer } from './EmergencyQIMarking/EmergMonthlyReport/MonthlyReportEmer'
import { useNavigate } from 'react-router-dom'

const InchargeApproval = () => {
  const [qidept, setQidept] = useState(0)
  const [searchDate, setSearchDate] = useState(format(new Date(), 'yyyy-MM-dd'))
  const [searchFlag, setsearchFlag] = useState(0)
  const [qitype, setQitype] = useState(0)
  const [viewData, setviewData] = useState([])
  // forIp Patient Report
  const [ipViewReport, setIpViewReport] = useState([])
  const [testCount, setTestCount] = useState(0)
  const [equipmentlist, setEquipmentlist] = useState([])
  const [endoDays, setEndoDays] = useState(0)

  const dispatch = useDispatch()
  const history = useNavigate()

  const backtoHome = useCallback(() => {
    history('/Home')
  }, [history])

  const id = useSelector(state => {
    return state?.LoginUserData.empid
  })
  useEffect(() => {
    dispatch(getQltyDept(id))
  }, [dispatch, id])

  const SearchDetails = useCallback(() => {
    if (qitype === 0) {
      infoNotify('Select Department')
      setsearchFlag(0)
    } else {
      const searchDatas = {
        from: format(new Date(searchDate), 'yyyy-MM-dd 00:00:00'),
        to: format(new Date(searchDate), 'yyyy-MM-dd 23:59:59'),
      }
      if (qitype === 1) {
        var dayList = eachDayOfInterval({
          start: startOfMonth(new Date(searchDate)),
          end: endOfMonth(new Date(searchDate)),
        })
        const days = dayList?.map(val => {
          return {
            day: format(new Date(val), 'dd-MM-yyyy'),
          }
        })
        const ViewReport = async (setviewData, setIpViewReport) => {
          await EndoscopyMonthlyReportView(searchDatas, setviewData, setsearchFlag, setIpViewReport)
        }
        ViewReport(setviewData, setIpViewReport)

        const getTestCount = async searchDatas => {
          const result = await axioslogin.post('/qiendoscopy/testCount', searchDatas)
          return result.data
        }
        getTestCount(searchDatas).then(value => {
          const { success, data } = value
          if (success === 1) {
            setTestCount(data)
            // for number of working days
            const noEndos = days.filter(val => {
              return data.find(value => format(new Date(value.endo_date), 'dd-MM-yyyy') === val.day)
            })
            setEndoDays(noEndos)
          }
        })
        // for taking equpimnent count
        const getEquipment = async qidept => {
          const result = await axioslogin.get(`/equipMast/active/${qidept}`)
          const { success, data } = result.data
          if (success === 1) {
            setEquipmentlist(data)
          }
        }
        getEquipment(qidept)
      } else if (qitype === 2) {
        const ViewReport = async setviewData => {
          await MonthlyReportEmer(searchDatas, setviewData, setsearchFlag)
        }
        ViewReport(setviewData)
      }
    }
  }, [qitype, searchDate, qidept])
  return (
    <Box sx={{ maxHeight: window.innerHeight - 70 }}>
      <Paper variant="outlined" square sx={{ display: 'flex', flex: 1, height: 40 }}>
        {/* <Box sx={{ pl: 0.7, pt: 1 }} >
                    <AssessmentIcon sx={{ bgcolor: '#555830', color: 'white', height: 23, width: 23 }} />
                </Box> */}
        <Box sx={{ flex: 1, fontSize: 16, pl: 1, pt: 1.2 }}>
          <Typography sx={{ color: '#555830', fontFamily: 'Arial', fontWeight: 550 }}>
            Level I Approval
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', fontSize: 20, pr: 0.5, pt: 0.2 }}>
          <HighlightOffIcon
            sx={{ cursor: 'pointer', height: 34, width: 34, color: '#bf360c', opacity: 0.7 }}
            onClick={backtoHome}
          />
        </Box>
      </Paper>
      <Paper variant="outlined" square sx={{ display: 'flex', pr: 1, pb: 0.5, flexWrap: 'wrap' }}>
        <Box sx={{ flex: 0.5 }}></Box>
        <Box sx={{ flex: 1 }}>
          <Box sx={{ pt: 1, pl: 1 }}>
            <Typography sx={{ fontSize: 13, textTransform: 'uppercase' }}>Department</Typography>
          </Box>
          <Box sx={{ pt: 0.5 }}>
            <DepartmentSelectForQuality
              qidept={qidept}
              setQidept={setQidept}
              setQitype={setQitype}
              setsearchFlag={setsearchFlag}
            />
          </Box>
        </Box>
        <Box sx={{ flex: 0.7 }}>
          <Box sx={{ pt: 1, pl: 1.3 }}>
            <Typography sx={{ fontSize: 13, textTransform: 'uppercase' }}>Date</Typography>
          </Box>
          <Box sx={{ pt: 0.5, pl: 0.3 }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                value={searchDate}
                views={['year', 'month', 'day']}
                size="sm"
                inputFormat="dd-MM-yyyy"
                maxDate={new Date()}
                onChange={newValue => {
                  setSearchDate(newValue)
                  setsearchFlag(0)
                }}
                renderInput={({ inputRef, inputProps, InputProps }) => (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CssVarsProvider>
                      <Input
                        ref={inputRef}
                        {...inputProps}
                        fullWidth
                        sx={{ bgcolor: 'white', padding: 'none', size: 'sm' }}
                      />
                    </CssVarsProvider>
                    {InputProps?.endAdornment}
                  </Box>
                )}
              />
            </LocalizationProvider>
          </Box>
        </Box>
        <Box sx={{ flex: 0.5, pt: 3.5, pl: 2 }}>
          <CssVarsProvider>
            <Tooltip title="Search" placement="right">
              <ManageSearchTwoToneIcon
                sx={{ color: '#555830', cursor: 'pointer', height: 40, width: 40 }}
                fontSize="large"
                onClick={SearchDetails}
              />
            </Tooltip>
          </CssVarsProvider>
        </Box>
        <Box sx={{ flex: 0.5 }}></Box>
      </Paper>
      <Box>
        {searchFlag === 1 ? (
          <>
            {qitype === 1 ? (
              <EndoInchargeApproval
                viewData={viewData}
                qitype={qitype}
                searchDate={searchDate}
                qidept={qidept}
                setsearchFlag={setsearchFlag}
                testCount={testCount}
                equipmentlist={equipmentlist}
                endoDays={endoDays}
                ipViewReport={ipViewReport}
              />
            ) : null}
          </>
        ) : null}
      </Box>
    </Box>
  )
}

export default memo(InchargeApproval)
