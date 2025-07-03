import { CssVarsProvider } from '@mui/joy'
import { Box, Paper, Typography } from '@mui/material'
import { React, memo } from 'react'
import { useCallback } from 'react'
import { useState } from 'react'
import TextFieldCustom from '../../Components/TextFieldCustom'
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined'
import CusCheckBox from '../../Components/CusCheckBox'
import CustomeToolTip from '../../Components/CustomeToolTip'
import CusIconButton from '../../Components/CusIconButton'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import { useMemo } from 'react'
import { axioslogin } from '../../Axios/Axios'
import { infoNotify, succesNotify, warningNotify } from '../../Common/CommonCode'
import moment from 'moment'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import CloseIcon from '@mui/icons-material/Close'
import DailyActivityTable from './DailyActivityTable'

const Dailyactivity = ({ ipno, setclosebtn }) => {
  const [daily, setdaily] = useState('')
  const [times, setTimes] = useState('')
  const [clean, setclean] = useState(false)
  const [sheet, setsheet] = useState(false)
  const [dietion, setdietion] = useState(false)
  const [bill, setbill] = useState(false)
  const [round, setround] = useState(false)
  const [notes, setnotes] = useState('')
  const [board, setboard] = useState(false)
  const [Insurance, setinsurance] = useState(false)
  const [value, setvalue] = useState(0)
  const [count, setCount] = useState(0)
  const [id, setid] = useState(0)
  const [doctime, setdoctime] = useState('')
  const [activity, setactivity] = useState({
    activity_slno: '',
    update_empid: '',
  })
  const { activity_slno } = activity
  const emid = useSelector(state => {
    return state.LoginUserData.empid
  })
  const [diettype, setdiettype] = useState({
    tea: false,
    breakfast: false,
    brunch: false,
    lunch: false,
    lupper: false,
    dinner: false,
  })
  const { tea, breakfast, brunch, lunch, lupper, dinner } = diettype

  const dietdetail = useMemo(() => {
    return {
      tea: tea === true ? 1 : 0,
      breakfast: breakfast === true ? 2 : 0,
      brunch: brunch === true ? 3 : 0,
      lunch: lunch === true ? 4 : 0,
      lupper: lupper === true ? 5 : 0,
      dinner: dinner === true ? 6 : 0,
    }
  }, [tea, breakfast, brunch, lunch, lupper, dinner])

  const updateDiettype = async e => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setdiettype({ ...diettype, [e.target.name]: value })
  }
  // for asset usage
  const [asset, setasset] = useState({
    cardiac: false,
    monitor: false,
    pump: false,
  })
  const { cardiac, monitor, pump } = asset

  const updateAsset = async e => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setasset({ ...asset, [e.target.name]: value })
  }

  const assetusage = useMemo(() => {
    return {
      cardiac: cardiac === true ? 1 : 0,
      monitor: monitor === true ? 2 : 0,
      pump: pump === true ? 3 : 0,
    }
  }, [cardiac, monitor, pump])

  const getdate = useCallback(e => {
    setdaily(e.target.value)
  }, [])
  const getTimes = useCallback(e => {
    setTimes(e.target.value)
  }, [])

  const getdoctime = useCallback(e => {
    setdoctime(e.target.value)
  }, [])

  const getCleaning = useCallback(e => {
    if (e.target.checked === true) {
      setclean(true)
    } else {
      setclean(false)
    }
  }, [])
  const getSheet = useCallback(e => {
    if (e.target.checked === true) {
      setsheet(true)
    } else {
      setsheet(false)
    }
  }, [])
  const getdietion = useCallback(e => {
    if (e.target.checked === true) {
      setdietion(true)
    } else {
      setdietion(false)
    }
  }, [])
  const getbill = useCallback(e => {
    if (e.target.checked === true) {
      setbill(true)
    } else {
      setbill(false)
    }
  }, [])
  const getRound = useCallback(e => {
    if (e.target.checked === true) {
      setround(true)
    } else {
      setround(false)
    }
  }, [])
  const getnotes = useCallback(e => {
    setnotes(e.target.value)
  }, [])

  const getBoard = useCallback(e => {
    if (e.target.checked === true) {
      setboard(true)
    } else {
      setboard(false)
    }
  }, [])
  const getInsurce = useCallback(e => {
    if (e.target.checked === true) {
      setinsurance(true)
    } else {
      setinsurance(false)
    }
  }, [])

  const resetasset = useMemo(() => {
    return {
      cardiac: false,
      monitor: false,
      pump: false,
    }
  }, [])
  const resetdiet = useMemo(() => {
    return {
      tea: false,
      breakfast: false,
      brunch: false,
      lunch: false,
      lupper: false,
      dinner: false,
    }
  }, [])

  const reset = useCallback(() => {
    setdaily('')
    setclean(false)
    setsheet(false)
    setdietion(false)
    setbill(false)
    setround(false)
    setnotes('')
    setboard(false)
    setinsurance(false)
    setasset(resetasset)
    setdiettype(resetdiet)
    setdoctime('')
  }, [resetasset, resetdiet])
  useEffect(() => {
    const getsurvno = async () => {
      const result = await axioslogin.get(`/WeWork/slnobyip/${ipno}`)
      const { success, data, message } = result.data
      setid(data)
      if (success === 1) {
        const { surv_slno } = data[0]
        setid(surv_slno)
      } else if (success === 2) {
        infoNotify(message)
      } else {
        warningNotify('Error occured contact EDP')
      }
    }
    getsurvno()
  }, [ipno])

  const postdata = useMemo(() => {
    return {
      activity_date: daily !== '' ? moment(daily).format('YYYY-MM-DD') : null,
      ip_no: ipno,
      srv_slno: id,
      activity_time: times !== '' ? moment(times).format('YYYY-MM-DD hh:mm:ss') : null,
      diet_status: dietdetail,
      room_clean: clean === true ? 1 : 0,
      sheet_change: sheet === true ? 1 : 0,
      dr_round: round === true ? 1 : 0,
      imortant_note: notes !== '' ? notes : '',
      dietian_round: dietion === true ? 1 : 0,
      bill_audit: bill === true ? 1 : 0,
      asset_usage: assetusage,
      patient_board_update: board === true ? 1 : 0,
      insurance_status: Insurance === true ? 1 : 0,
      create_empid: emid,
      dr_visit_time: doctime !== '' ? moment(doctime).format('YYYY-MM-DD hh:mm:ss') : null,
    }
  }, [
    id,
    ipno,
    dietdetail,
    clean,
    sheet,
    round,
    notes,
    dietion,
    bill,
    assetusage,
    board,
    Insurance,
    emid,
    daily,
    doctime,
    times,
  ])

  const patchdata = useMemo(() => {
    return {
      activity_date: daily !== '' ? moment(daily).format('YYYY-MM-DD') : null,
      activity_time: times !== '' ? moment(times).format('YYYY-MM-DD hh:mm:ss') : null,
      diet_status: dietdetail,
      room_clean: clean === true ? 1 : 0,
      sheet_change: sheet === true ? 1 : 0,
      dr_round: round === true ? 1 : 0,
      imortant_note: notes,
      dietian_round: dietion === true ? 1 : 0,
      bill_audit: bill === true ? 1 : 0,
      asset_usage: assetusage,
      patient_board_update: board === true ? 1 : 0,
      insurance_status: Insurance === true ? 1 : 0,
      update_empid: emid,
      activity_slno: activity_slno,
      dr_visit_time: doctime !== '' ? moment(doctime).format('YYYY-MM-DD hh:mm:ss') : null,
    }
  }, [
    dietdetail,
    clean,
    sheet,
    round,
    notes,
    dietion,
    bill,
    assetusage,
    board,
    Insurance,
    emid,
    daily,
    activity_slno,
    doctime,
    times,
  ])

  const rowSelect = useCallback(
    params => {
      setvalue(1)
      const data = params.api.getSelectedRows()
      const {
        activity_date,
        activity_slno,
        diet_status,
        room_clean,
        sheet_change,
        dr_round,
        activity_time,
        imortant_note,
        dietian_round,
        bill_audit,
        asset_usage,
        patient_board_update,
        insurance_status,
        dr_visit_time,
      } = data[0]

      const obj = JSON.parse(diet_status)
      const { tea, breakfast, brunch, lunch, lupper, dinner } = obj
      const v = {
        tea: tea === 1 ? true : false,
        breakfast: breakfast === 2 ? true : false,
        brunch: brunch === 3 ? true : false,
        lunch: lunch === 4 ? true : false,
        lupper: lupper === 5 ? true : false,
        dinner: dinner === 6 ? true : false,
      }
      const obj2 = JSON.parse(asset_usage)
      const { cardiac, monitor, pump } = obj2
      const y = {
        cardiac: cardiac === 1 ? true : false,
        monitor: monitor === 2 ? true : false,
        pump: pump === 2 ? true : false,
      }

      const frmdata = {
        activity_slno: activity_slno,
        update_empid: emid,
      }

      setactivity(frmdata)
      setdiettype(v)
      setclean(room_clean === 'yes' ? true : false)
      setsheet(sheet_change === 'yes' ? true : false)
      setdietion(dietian_round === 'yes' ? true : false)
      setbill(bill_audit === 'yes' ? true : false)
      setround(dr_round === 'yes' ? true : false)
      setinsurance(insurance_status === 'yes' ? true : false)
      setasset(y)
      setboard(patient_board_update === 'yes' ? true : false)
      setnotes(imortant_note)
      setdaily(activity_date !== null ? activity_date : '')
      setTimes(activity_time !== null ? activity_time : '')
      setdoctime(dr_visit_time !== null ? dr_visit_time : '')
    },
    [emid]
  )

  const submited = useCallback(
    e => {
      e.preventDefault()
      const InsertData = async postdata => {
        const results = await axioslogin.post(`/WeWork/insertdaily`, postdata)
        const { message, success } = results.data
        if (success === 1) {
          succesNotify(message)
          setCount(count + 1)
          reset()
        } else if (success === 2) {
          infoNotify(message)
        } else {
          infoNotify(message)
        }
      }
      const Updatedata = async patchdata => {
        const results = await axioslogin.patch(`/WeWork/updateAct`, patchdata)
        const { message, success } = results.data
        if (success === 2) {
          succesNotify(message)
          setCount(count + 1)
          setvalue(0)
          reset()
        } else if (success === 1) {
          infoNotify(message)
        } else {
          infoNotify(message)
        }
      }
      if (value === 1) {
        Updatedata(patchdata)
      } else {
        InsertData(postdata)
      }
    },
    [postdata, patchdata, value, count, reset]
  )

  const closwindow = useCallback(() => {
    setclosebtn(0)
  }, [setclosebtn])

  return (
    <Paper square elevation={0} sx={{ dispaly: 'flex', justifyContent: 'column' }}>
      <Box sx={{ display: 'flex', backgroundColor: '#f0f3f5' }}>
        <Box sx={{ pb: 1, flex: 1 }}>
          <Typography sx={{ fontFamily: 'Roboto', fontSize: 20, p: 1.5 }}>
            Daily Activity
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', pl: 1 }}>
          <CustomeToolTip title="Save" placement="left">
            <Box sx={{ p: 1 }}>
              <CusIconButton
                size="sm"
                variant="outlined"
                color="primary"
                clickable="true"
                onClick={submited}
              >
                <LibraryAddIcon fontSize="small" />
              </CusIconButton>
            </Box>
          </CustomeToolTip>
          <CustomeToolTip title="close" placement="left">
            <Box sx={{ p: 1 }}>
              <CusIconButton
                size="sm"
                variant="outlined"
                color="primary"
                clickable="true"
                onClick={closwindow}
              >
                <CloseIcon fontSize="small" />
              </CusIconButton>
            </Box>
          </CustomeToolTip>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', p: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', width: '50%' }}>
          <Box sx={{ width: { xl: '10%', lg: '15%', md: '50%', sm: '30%' } }}>
            <CssVarsProvider>
              <Typography>Date:</Typography>
            </CssVarsProvider>
          </Box>
          <Box sx={{ width: { xl: '30%', lg: '50%', md: '50%', sm: '50%' }, height: 40 }}>
            <TextFieldCustom size="sm" type="date" name="daily" value={daily} onchange={getdate} />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', width: '50%' }}>
          <Box sx={{ width: { xl: '10%', lg: '15%', md: '50%', sm: '30%' } }}>
            <CssVarsProvider>
              <Typography>Time:</Typography>
            </CssVarsProvider>
          </Box>
          <Box sx={{ width: { xl: '30%', lg: '50%', md: '50%', sm: '50%' }, height: 40 }}>
            <TextFieldCustom
              size="sm"
              type="datetime-local"
              name="times"
              value={times}
              onchange={getTimes}
            />
          </Box>
        </Box>
      </Box>
      <Paper square elevation={3} sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
          <Box sx={{ width: { xl: '10%', lg: '15%', md: '15%', sm: '20%' }, pb: 1 }}>
            <CssVarsProvider>
              <Typography
                sx={{ fontStyle: 'oblique', fontWeight: 500, color: '#94B7FC' }}
                startdecorator={<ArrowRightOutlinedIcon />}
              >
                Patient Diet
              </Typography>
            </CssVarsProvider>
          </Box>
        </Box>
        <Box sx={{ height: 40, width: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
            }}
          >
            <Box sx={{ width: '25%' }}>
              <CusCheckBox
                variant="outlined"
                color="primary"
                size="md"
                name="tea"
                label="Bed Tea"
                value={tea}
                onCheked={updateDiettype}
                checked={tea}
              />
            </Box>
            <Box sx={{ width: '25%' }}>
              <CusCheckBox
                variant="outlined"
                color="primary"
                size="md"
                name="breakfast"
                label="Breakfast"
                value={breakfast}
                onCheked={updateDiettype}
                checked={breakfast}
              />
            </Box>
            <Box sx={{ width: '25%' }}>
              <CusCheckBox
                variant="outlined"
                color="primary"
                size="md"
                name="brunch"
                label="Brunch"
                value={brunch}
                onCheked={updateDiettype}
                checked={brunch}
              />
            </Box>
            <Box sx={{ width: '25%' }}>
              <CusCheckBox
                variant="outlined"
                color="primary"
                size="md"
                name="lunch"
                label="Lunch"
                value={lunch}
                onCheked={updateDiettype}
                checked={lunch}
              />
            </Box>
            <Box sx={{ width: '25%' }}>
              <CusCheckBox
                variant="outlined"
                color="primary"
                size="md"
                name="lupper"
                label="Lupper"
                value={lupper}
                onCheked={updateDiettype}
                checked={lupper}
              />
            </Box>
            <Box sx={{ width: '25%' }}>
              <CusCheckBox
                variant="outlined"
                color="primary"
                size="md"
                name="dinner"
                label="Dinner"
                value={dinner}
                onCheked={updateDiettype}
                checked={dinner}
              />
            </Box>
          </Box>
        </Box>
      </Paper>
      <Paper square elevation={3} sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
          <Box sx={{ width: { xl: '10%', lg: '15%', md: '15%', sm: '20%' }, pb: 1 }}>
            <CssVarsProvider>
              <Typography
                sx={{ fontStyle: 'oblique', fontWeight: 500, color: '#94B7FC' }}
                startdecorator={<ArrowRightOutlinedIcon />}
              >
                Asset Usage
              </Typography>
            </CssVarsProvider>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
          }}
        >
          <Box sx={{ width: '25%' }}>
            <CusCheckBox
              variant="outlined"
              color="primary"
              size="md"
              name="cardiac"
              label="Cardiac"
              value={cardiac}
              onCheked={updateAsset}
              checked={cardiac}
            />
          </Box>
          <Box sx={{ width: '25%' }}>
            <CusCheckBox
              variant="outlined"
              color="primary"
              size="md"
              name="monitor"
              label="O2 monitor"
              value={monitor}
              onCheked={updateAsset}
              checked={monitor}
            />
          </Box>
          <Box sx={{ width: '25%' }}>
            <CusCheckBox
              variant="outlined"
              color="primary"
              size="md"
              name="pump"
              label="Syringe Pump"
              value={pump}
              onCheked={updateAsset}
              checked={pump}
            />
          </Box>
        </Box>
      </Paper>
      <Paper
        square
        elevation={3}
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          width: { xl: '100%', lg: '100%', md: '100%', sm: '100%' },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            textTransform: 'capitalize',
            flexDirection: { xl: 'column', lg: 'column', md: 'column', sm: 'column', xs: 'column' },
            justifyContent: 'space-between',
            width: { xl: '100%', lg: '100%', md: '100%', sm: '100%' },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
            }}
          >
            <Box sx={{ width: '25%' }}>
              <CusCheckBox
                variant="outlined"
                color="primary"
                size="md"
                name="clean"
                label="Room cleaning"
                value={clean}
                onCheked={getCleaning}
                checked={clean}
              />
            </Box>
            <Box sx={{ width: '25%' }}>
              <CusCheckBox
                variant="outlined"
                color="primary"
                size="md"
                name="sheet"
                label="Bed sheet change"
                value={sheet}
                onCheked={getSheet}
                checked={sheet}
              />
            </Box>
            <Box sx={{ width: '25%' }}>
              <CusCheckBox
                variant="outlined"
                color="primary"
                size="md"
                name="dietion"
                label="Dietion Round"
                value={dietion}
                onCheked={getdietion}
                checked={dietion}
              />
            </Box>
            <Box sx={{ width: '20%' }}>
              <CusCheckBox
                variant="outlined"
                color="primary"
                size="md"
                name="bill"
                label="Bill Audit"
                value={bill}
                onCheked={getbill}
                checked={bill}
              />
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              width: { xl: '100%', lg: '100%', md: '100%', sm: '100%' },
              pt: 1,
            }}
          >
            <Box sx={{ width: { xl: '25%', lg: '25%', md: '25%', sm: '25%' } }}>
              <CusCheckBox
                variant="outlined"
                color="primary"
                size="md"
                name="round"
                label="Doctors's round"
                value={round}
                onCheked={getRound}
                checked={round}
              />
            </Box>
            <Box sx={{ width: { xl: '25%', lg: '25%', md: '25%', sm: '25%' } }}>
              <TextFieldCustom
                size="sm"
                type="datetime-local"
                name="time"
                value={doctime}
                style={{ width: { xl: '50%', lg: '90%', md: '90%', sm: '90%' } }}
                onchange={getdoctime}
                disabled={round === true ? false : true}
              />
            </Box>
            <Box sx={{ width: { xl: '50%', lg: '40%', md: '40%', sm: '45%' } }}>
              <TextFieldCustom
                size="sm"
                type="text"
                name="notes"
                value={notes}
                style={{ width: { xl: '80%', lg: '90%', md: '100%', sm: '100%' }, height: '50%' }}
                placeholder={'important notes'}
                onchange={getnotes}
              />
            </Box>
          </Box>
        </Box>
      </Paper>
      <Paper
        square
        elevation={0}
        sx={{
          pl: 2,
          display: 'flex',
          flexDirection: 'row',
          width: { xl: '100%', lg: '100%', md: '100%', sm: '100%' },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
          }}
        >
          <Box sx={{ width: '25%' }}>
            <CusCheckBox
              variant="outlined"
              color="primary"
              size="md"
              name="board"
              label="Patient Board updates"
              value={board}
              onCheked={getBoard}
              checked={board}
            />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', width: '50%' }}>
            <CusCheckBox
              variant="outlined"
              color="primary"
              size="md"
              name="Insurance"
              label="Insurance status"
              value={Insurance}
              onCheked={getInsurce}
              checked={Insurance}
            />
          </Box>
        </Box>
      </Paper>

      <Box sx={{ px: 2, py: 2 }}>
        <DailyActivityTable ipno={ipno} count={count} rowSelect={rowSelect} />
      </Box>
    </Paper>
  )
}

export default memo(Dailyactivity)
