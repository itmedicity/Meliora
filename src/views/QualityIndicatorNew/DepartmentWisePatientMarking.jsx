import { Button, CssVarsProvider } from '@mui/joy'
import { Box, Paper, TextField } from '@mui/material'
import React, { Fragment, memo, useCallback, useEffect, useState } from 'react'
import QIDepartmentSelect from '../CommonSelectCode/QIDepartmentSelect'
import { useDispatch, useSelector } from 'react-redux'
import { getQltyDept } from 'src/redux/actions/QualityIndicatorDept.action'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { infoNotify } from '../Common/CommonCode'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { format, subDays } from 'date-fns'
import PatientsListView from './EndoscopyQIMarking/Component/PatientsListView'
import { RefreshEndoscopy } from './EndoscopyQIMarking/Component/RefreshEndoscopy'
import { RefreshEmergency } from './EmergencyQIMarking/Components/RefreshEmergency'
import EmergencyPatientsList from './EmergencyQIMarking/Components/EmergencyPatientsList'
import { RefreshDialysisList } from './DialysisQIMarking/Components/RefreshDialysisList'
import DialysisPatientListTable from './DialysisQIMarking/Components/DialysisPatientListTable'
import { RefreshIpPatients } from './InpatientQIMarking/Components/RefreshIpPatients'
import InpatientTableView from './InpatientQIMarking/Components/InpatientTableView'
import { useNavigate } from 'react-router-dom'

const DepartmentWisePatientMarking = () => {
  const dispatch = useDispatch()
  const [qidept, setQidept] = useState(0)
  const [depName, setDepName] = useState('')
  const [depCode, setDepCode] = useState('')
  const [qitype, setQitype] = useState(0)
  const [searchFlag, setSearchFlag] = useState(0)
  const [dailyDate, setDailyDate] = useState(format(new Date(), 'yyyy-MM-dd'))
  const [count, setCount] = useState(0)
  const history = useNavigate()
  const id = useSelector(state => {
    return state?.LoginUserData.empid
  })
  const backtoHome = useCallback(() => {
    history('/Home')
  }, [history])

  useEffect(() => {
    dispatch(getQltyDept(id))
  }, [dispatch, id])

  const SearchDetails = useCallback(
    () => {
      if (qitype === 0) {
        infoNotify('Select Department')
        setSearchFlag(0)
      } else {
        if (qitype === 1) {
          const RefreshPatients = async setCount => {
            await RefreshEndoscopy(qidept, count, setCount, depCode, id, dailyDate)
          }
          RefreshPatients(setCount)
          setSearchFlag(1)
        } else if (qitype === 2) {
          const RefreshPatients = async setCount => {
            await RefreshEmergency(qidept, count, setCount, depCode, id, dailyDate)
          }
          RefreshPatients(setCount)
          setSearchFlag(2)
        } else if (qitype === 3) {
          const RefreshPatients = async setCount => {
            await RefreshDialysisList(qidept, count, setCount, depCode, id, dailyDate)
          }
          RefreshPatients(setCount)
          setSearchFlag(3)
        } else if (qitype === 4) {
        } else if (qitype === 5) {
          const RefreshPatients = async setCount => {
            await RefreshIpPatients(qidept, count, setCount, depCode, id, dailyDate)
          }
          RefreshPatients(setCount)
          setSearchFlag(5)
        }
      }
    },
    [qitype, depCode, dailyDate, id, count, qidept]
  )

  return (
    <Fragment>
      {searchFlag === 1 ? (
        <PatientsListView
          setSearchFlag={setSearchFlag}
          qidept={qidept}
          depName={depName}
          depCode={depCode}
          dailyDate={dailyDate}
          count={count}
          setCount={setCount}
          qitype={qitype}
          setQidept={setQidept}
        />
      ) : searchFlag === 2 ? (
        <EmergencyPatientsList
          setSearchFlag={setSearchFlag}
          qidept={qidept}
          depCode={depCode}
          dailyDate={dailyDate}
          count={count}
          setCount={setCount}
          qitype={qitype}
        />
      ) : searchFlag === 3 ? (
        <DialysisPatientListTable
          setSearchFlag={setSearchFlag}
          qidept={qidept}
          depCode={depCode}
          dailyDate={dailyDate}
          count={count}
          setCount={setCount}
          qitype={qitype}
        />
      ) : searchFlag === 5 ? (
        <InpatientTableView
          setSearchFlag={setSearchFlag}
          qidept={qidept}
          depCode={depCode}
          dailyDate={dailyDate}
          count={count}
          setCount={setCount}
          setQidept={setQidept}
          depName={depName}
        />
      ) : (
        <Box
          sx={{
            height: '91vh',
            width: '100%',
            display: 'flex',
            bgcolor: '#eceff1',
            justifyContent: 'center',
            alignItems: 'center',
            pb: 25
          }}
        >
          {/* <Box sx={{ width: '35%', bgcolor: '#cfd8dc', height: window.innerHeight - 650, mb: 20 }}> */}
          <Box sx={{ height: 200, width: 500, bgcolor: '#cfd8dc', mx: 'auto', boxShadow: 10 }}>
            <Paper variant="outlined" square sx={{ display: 'flex' }}>
              <Box
                sx={{
                  display: 'flex',
                  flex: 1,
                  justifyContent: 'center',
                  pt: 1.5,
                  color: '#455a64',
                  bgcolor: '#cfd8dc',
                  fontWeight: 'bold'
                }}
              >
                {/* GET PATIENT&apos;S DETAILS */}QUALITY INDICATOR
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flex: 0.1,
                  justifyContent: 'flex-end',
                  fontSize: 20,
                  pt: 0.5,
                  pr: 0.5,
                  bgcolor: '#cfd8dc'
                }}
              >
                <HighlightOffIcon sx={{ cursor: 'pointer', size: 'sm', opacity: 0.7 }} onClick={backtoHome} />
              </Box>
            </Paper>
            <Box sx={{ mx: 1, pt: 0.5, flex: 0.8 }}>
              <QIDepartmentSelect
                qidept={qidept}
                setQidept={setQidept}
                setDepName={setDepName}
                setDepCode={setDepCode}
                setQitype={setQitype}
              />
            </Box>
            <Box sx={{ mx: 1, pt: 0.2, flex: 1, bgcolor: 'white' }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  value={dailyDate}
                  views={['year', 'month', 'day']}
                  size="small"
                  inputFormat="dd-MM-yyyy"
                  minDate={subDays(new Date(), 20)}
                  maxDate={new Date()}
                  // slotProps={{ textField: { variant: "plain" } }}
                  onChange={newValue => {
                    setDailyDate(newValue)
                  }}
                  renderInput={params => (
                    <TextField
                      {...params}
                      helperText={null}
                      size="small"
                      fullWidth
                      sx={{ bgcolor: 'white', borderRadius: 0, pt: 0.5 }}
                    />
                  )}
                />
              </LocalizationProvider>
            </Box>
            <Box sx={{ mx: 1, pt: 0.3, flex: 1 }}>
              <CssVarsProvider>
                <Button
                  sx={{
                    width: '100%',
                    height: 46,
                    cursor: 'pointer',
                    color: 'white',
                    fontSize: 17,
                    bgcolor: '#90a4ae',
                    border: '1px solid lightgrey',
                    borderRight: 'none',
                    borderRadius: 0,
                    ':hover': {
                      bgcolor: '#546e7a',
                      boxShadow: 2,
                      color: 'white'
                    }
                  }}
                  onClick={SearchDetails}
                >
                  SEARCH
                </Button>
              </CssVarsProvider>
            </Box>
          </Box>
        </Box>
      )}
    </Fragment>
  )
}
export default memo(DepartmentWisePatientMarking)
