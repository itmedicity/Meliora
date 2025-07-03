import React, { memo, useCallback, useState } from 'react'
import { Typography } from '@mui/material'
import { CssVarsProvider } from '@mui/joy'
import { Box, Paper } from '@mui/material'
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import CusCheckBox from '../../Components/CusCheckBox'
import ComplaintCheckBox from '../../ComManagement/ComplaintRegister/ComplaintCheckBox'
import { useMemo } from 'react'
import CustomeToolTip from '../../Components/CustomeToolTip'
import CusIconButton from '../../Components/CusIconButton'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify, warningNotify } from '../../Common/CommonCode'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import RemoveRedEyeSharpIcon from '@mui/icons-material/RemoveRedEyeSharp'
import PatSurvillenceView from './PatSurvillenceView'
import CloseIcon from '@mui/icons-material/Close'
const RoomAmenties = React.lazy(() => import('../../WeWork/Patienntsurvillence/BasicRoomAmenties'))
const Patservice = React.lazy(() => import('../../WeWork/Patienntsurvillence/Patientservice'))
const AssignedStaff = React.lazy(() => import('../../CommonSelectCode/AssignedStaffselect'))
const Patientsurvillence = ({
  ipno,
  ptno,
  name,
  age,
  docname,
  doa,
  mf,
  rmno,
  bedcode,
  setclosebtn,
  nurse,
  nsdesc,
}) => {
  const [bedtype, setbedtype] = useState(false)
  const [rmcat, setrmcat] = useState(false)
  const [modepay, setmodpay] = useState(false)
  const [pck, setpck] = useState(false)
  const [bhrc, setbhrc] = useState(false)
  const [duser, setduser] = useState('')
  const [rstym, setrstym] = useState('')
  const [tele, settele] = useState(false)
  const [gzr, setgzr] = useState(false)
  const [key, setkey] = useState(false)
  const [callbell, setcallbell] = useState(false)
  const [dama, setdama] = useState(false)
  const [dv, setdv] = useState('')
  const [st, setst] = useState('')
  const [rt, setrt] = useState('')
  const [asn, setasn] = useState(0)
  const [doc, setdoc] = useState('')
  const [cr, setcr] = useState('')
  const [sfa, setsfa] = useState('')
  const [remr, setremr] = useState('')
  const [reson, setreson] = useState('')
  const [count, setcount] = useState(0)
  const [flag, setflag] = useState(0)
  const [surv, setsurv] = useState({
    we_surv_slno: '',
    surv_log_slno: '',
  })
  const { we_surv_slno } = surv

  const emid = useSelector(state => {
    return state.LoginUserData.empid
  })
  const doduser = useCallback(e => {
    setduser(e.target.value)
  }, [])
  const rstime = useCallback(e => {
    setrstym(e.target.value)
  }, [])
  const getvist = useCallback(e => {
    setdv(e.target.value)
  }, [])
  const getstat = useCallback(e => {
    setst(e.target.value)
  }, [])
  const getrt = useCallback(e => {
    setrt(e.target.value)
  }, [])
  const getdoc = useCallback(e => {
    setdoc(e.target.value)
  }, [])
  const getcredit = useCallback(e => {
    setcr(e.target.value)
  }, [])
  const getsfa = useCallback(e => {
    setsfa(e.target.value)
  }, [])
  const getremark = useCallback(e => {
    setremr(e.target.value)
  }, [])
  const getreason = useCallback(e => {
    setreson(e.target.value)
  }, [])
  const getbhrc = useCallback(e => {
    if (e.target.checked === true) {
      setbhrc(true)
    } else {
      setbhrc(false)
    }
  }, [])
  const getdama = useCallback(e => {
    if (e.target.checked === true) {
      setdama(true)
    } else {
      setdama(false)
    }
  }, [])
  const gettele = useCallback(e => {
    if (e.target.checked === true) {
      settele(true)
    } else {
      settele(false)
    }
  }, [])
  const getgeezer = useCallback(e => {
    if (e.target.checked === true) {
      setgzr(true)
    } else {
      setgzr(false)
    }
  }, [])
  const getkey = useCallback(e => {
    if (e.target.checked === true) {
      setkey(true)
    } else {
      setkey(false)
    }
  }, [])
  const getcallbell = useCallback(e => {
    if (e.target.checked === true) {
      setcallbell(true)
    } else {
      setcallbell(false)
    }
  }, [])

  // array mapping room category
  const roomcategory = [
    { rmslno: 1, rmname: 'Normal' },
    { rmslno: 2, rmname: 'AC ' },
    { rmslno: 3, rmname: 'AC Delux' },
    { rmslno: 4, rmname: 'Suite' },
    { rmslno: 5, rmname: 'VIP Suite' },
  ]
  //array mapping bedtype
  const bed = [
    { bdslno: 1, bdname: 'Basic Bed' },
    { bdslno: 2, bdname: 'Semi Flower' },
    { bdslno: 3, bdname: 'Side Rail' },
    { bdslno: 4, bdname: 'Bariatric Bed' },
    { bdslno: 5, bdname: 'Electric Bed' },
  ]
  //array mapping payment method
  const payment = [
    { payno: 1, payname: 'Cash' },
    { payno: 2, payname: 'Insurance' },
    { payno: 3, payname: 'Other Credit' },
  ]
  // array mapping packges
  const pack = [
    { pcno: 1, pcname: 'yes' },
    { pcno: 2, pcname: 'No' },
    { pcno: 3, pcname: 'clearence from FIO' },
  ]
  // checkbox for remote
  const [remote, setremote] = useState({
    acremot: false,
    tvremot: false,
  })
  const { acremot, tvremot } = remote
  const updateremort = async e => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setremote({ ...remote, [e.target.name]: value })
  }
  const actvremort = useMemo(() => {
    return {
      acremot: remote.acremot === true ? 1 : 0,
      tvremot: remote.tvremot === true ? 2 : 0,
    }
  }, [remote.acremot, remote.tvremot])
  // checkbox for room amentities
  const [ameties, setamenties] = useState({
    sofaa: false,
    chair: false,
    card: false,
    almirah: false,
    cup: false,
    arm: false,
    kit: false,
    bin: false,
    wood: false,
    tab: false,
    mat: false,
  })
  const roomamenties = useMemo(() => {
    return {
      sofaa: ameties.sofaa === true ? 1 : 0,
      chair: ameties.chair === true ? 2 : 0,
      card: ameties.card === true ? 3 : 0,
      almirah: ameties.almirah === true ? 4 : 0,
      cup: ameties.cup === true ? 5 : 0,
      arm: ameties.arm === true ? 6 : 0,
      kit: ameties.kit === true ? 7 : 0,
      bin: ameties.bin === true ? 8 : 0,
      wood: ameties.wood === true ? 9 : 0,
      tab: ameties.tab === true ? 10 : 0,
      mat: ameties.mat === true ? 11 : 0,
    }
  }, [
    ameties.sofaa,
    ameties.chair,
    ameties.card,
    ameties.almirah,
    ameties.cup,
    ameties.arm,
    ameties.kit,
    ameties.bin,
    ameties.wood,
    ameties.tab,
    ameties.mat,
  ])
  const [service, setservice] = useState({
    bedmake: false,
    gen: false,
    initial: false,
    visit: false,
  })
  const patservice = useMemo(() => {
    return {
      bedmake: service.bedmake === true ? 1 : 0,
      gen: service.gen === true ? 2 : 0,
      initial: service.initial === true ? 3 : 0,
      visit: service.visit === true ? 4 : 0,
    }
  }, [service.bedmake, service.gen, service.initial, service.visit])
  const postdetail = useMemo(() => {
    return {
      ip_no: ipno,
      pt_no: ptno,
      admission_date: doa,
    }
  }, [ipno, ptno, doa])
  const resetremot = useMemo(() => {
    return {
      acremot: false,
      tvremot: false,
    }
  }, [])
  const resetamenties = useMemo(() => {
    return {
      sofaa: false,
      chair: false,
      card: false,
      almirah: false,
      cup: false,
      arm: false,
      kit: false,
      bin: false,
      wood: false,
      tab: false,
      mat: false,
    }
  }, [])
  const resetservice = useMemo(() => {
    return {
      bedmake: false,
      gen: false,
      initial: false,
      visit: false,
    }
  }, [])
  const reset = useCallback(() => {
    setbedtype(false)
    setrmcat(false)
    setmodpay(false)
    setpck(false)
    setduser('')
    setrstym('')
    settele(false)
    setgzr(false)
    setdv('')
    setst('')
    setrt('')
    setasn(0)
    setdoc('')
    setcr('')
    setsfa('')
    setremr('')
    setamenties(resetamenties)
    setremote(resetremot)
    setservice(resetservice)
    setdama(false)
    setreson('')
    setbhrc(false)
    setcallbell(false)
    setkey(false)
  }, [resetamenties, resetremot, resetservice])

  const detail = useMemo(() => {
    return {
      ip_no: ipno,
      bd_code: bedcode,
    }
  }, [ipno, bedcode])

  useEffect(() => {
    const getPatientList = async detail => {
      const result = await axioslogin.post(`/WeWork/patdetail`, detail)
      const { success, data } = result.data
      if (success === 1) {
        const {
          surv_log_slno,
          recieved_time,
          room_category,
          bed_type,
          telephone,
          geezer,
          dietition_visit_tme,
          stat_medicine,
          stat_recived_time,
          assigned_nurse,
          document_status,
          payment_mode,
          tv_ac_remot,
          creadit_detail,
          pateint_service,
          remarks_we,
          sfa_mfa,
          discharge_wright,
          patpackage,
          we_surv_slno,
          room_amentites,
          if_dama,
          dama_remarks,
          bhrc_patient,
          pat_surv_callbell,
          pat_surv_key,
        } = data[0]
        const obj1 = JSON.parse(room_amentites)
        const { sofaa, chair, card, almirah, cup, arm, kit, bin, wood, tab, mat } = obj1
        const v = {
          sofaa: sofaa === 1 ? true : false,
          chair: chair === 2 ? true : false,
          card: card === 3 ? true : false,
          almirah: almirah === 4 ? true : false,
          cup: cup === 5 ? true : false,
          arm: arm === 6 ? true : false,
          kit: kit === 7 ? true : false,
          bin: bin === 8 ? true : false,
          wood: wood === 9 ? true : false,
          tab: tab === 10 ? true : false,
          mat: mat === 11 ? true : false,
        }

        const obj2 = JSON.parse(tv_ac_remot)
        const { acremot, tvremot } = obj2
        const t = {
          acremot: acremot === 1 ? true : false,
          tvremot: tvremot === 2 ? true : false,
        }

        const obj3 = JSON.parse(pateint_service)
        const { bedmake, gen, initial, visit } = obj3
        const p = {
          bedmake: bedmake === 1 ? true : false,
          gen: gen === 2 ? true : false,
          initial: initial === 3 ? true : false,
          visit: visit === 4 ? true : false,
        }
        const frmdata = {
          we_surv_slno: we_surv_slno,
          surv_log_slno: surv_log_slno,
        }
        setsurv(frmdata)
        setduser(discharge_wright !== null ? discharge_wright : '')
        setrstym(recieved_time !== null ? recieved_time : '')
        setrmcat(room_category)
        setbedtype(bed_type)
        settele(telephone === 1 ? true : false)
        setgzr(geezer === 1 ? true : false)
        setdv(dietition_visit_tme !== null ? dietition_visit_tme : '')
        setst(stat_medicine !== null ? stat_medicine : '')
        setrt(stat_recived_time !== null ? stat_recived_time : '')
        setasn(assigned_nurse)
        setdoc(document_status)
        setmodpay(payment_mode)
        setcr(creadit_detail)
        setremr(remarks_we)
        setsfa(sfa_mfa)
        setpck(patpackage)
        setamenties(v)
        setremote(t)
        setservice(p)
        setdama(if_dama === 1 ? true : false)
        setreson(dama_remarks)
        setbhrc(bhrc_patient === 1 ? true : false)
        setcallbell(pat_surv_callbell === 1 ? true : false)
        setkey(pat_surv_key === 1 ? true : false)
      } else if (success === 2) {
        infoNotify('Please enter patient details!')
      } else {
        warningNotify('Error occured contact EDP')
      }
    }
    getPatientList(detail)
  }, [detail])
  const submited = useCallback(
    e => {
      e.preventDefault()
      /*** * initial insert function for use call back     */
      const Insertidtable = async postdetail => {
        const result = await axioslogin.post(`/WeWork/insertsurv`, postdetail)
        const { message, success, insertId } = result.data
        if (success === 1) {
          reset()
          return insertId
        } else if (success === 2) {
          infoNotify(message)
          reset()
        } else {
          infoNotify(message)
        }
      }
      const insertdata = async inserid => {
        const postData = {
          we_surv_slno: inserid,
          ip_no: ipno,
          bd_code: bedcode,
          discharge_wright: duser !== '' ? moment(duser).format('YYYY-MM-DD hh:mm:ss') : null,
          shift_from: null,
          shift_to: nurse,
          recieved_time: rstym !== '' ? moment(rstym).format('YYYY-MM-DD hh:mm:ss') : null,
          room_category: rmcat,
          bed_type: bedtype,
          tv_ac_remot: actvremort,
          telephone: tele === true ? 1 : 0,
          geezer: gzr === true ? 1 : 0,
          pat_surv_key: key === true ? 1 : 0,
          pat_surv_callbell: callbell === true ? 1 : 0,
          dietition_visit_tme: dv !== '' ? moment(dv).format('YYYY-MM-DD hh:mm:ss') : null,
          stat_medicine: st !== '' ? moment(st).format('YYYY-MM-DD hh:mm:ss') : null,
          stat_recived_time: rt !== '' ? moment(rt).format('YYYY-MM-DD hh:mm:ss') : null,
          assigned_nurse: asn !== 0 ? asn : null,
          payment_mode: modepay,
          document_status: doc,
          creadit_detail: cr,
          package: pck,
          remarks_we: remr,
          sfa_mfa: sfa,
          room_amentites: roomamenties,
          pateint_service: patservice,
          bhrc_patient: bhrc === true ? 1 : 0,
          if_dama: dama === true ? 1 : 0,
          dama_remarks: reson,
          we_employee: emid,
        }
        const result1 = await axioslogin.post('/WeWork/patientsurv', postData)
        const { succs, messagee } = result1.data
        if (succs === 1) {
          succesNotify(messagee)
        } else if (succs === 0) {
          infoNotify(messagee)
        } else {
          infoNotify(messagee)
        }
      }
      const Updatedata = async patchData => {
        const results = await axioslogin.patch(`/WeWork/patchsurv`, patchData)
        const { message, success } = results.data
        if (success === 2) {
          succesNotify(message)
          setcount(count + 1)
          reset()
        } else if (success === 1) {
          infoNotify(message)
        } else {
          infoNotify(message)
        }
      }
      const postdata = {
        ip_no: ipno,
        pt_no: ptno,
      }
      const getsurvslno = async postdata => {
        const result = await axioslogin.post(`/WeWork/survslno`, postdata)
        const { success, data } = result.data
        if (success === 1) {
          const { surv_slno } = data[0]
          const shiftdetl = {
            shift_to: nurse,
            we_surv_slno: we_surv_slno,
          }
          const getsurvlogslno = async shiftdetl => {
            const result = await axioslogin.post('/WeWork/logslno', shiftdetl)
            const { success, data } = result.data
            if (success === 1 && success !== 2) {
              const { surv_log_slno } = data[0]
              const patchData = {
                discharge_wright: duser !== '' ? moment(duser).format('YYYY-MM-DD hh:mm:ss') : null,
                shift_from: null,
                shift_to: nurse,
                recieved_time: rstym !== '' ? moment(rstym).format('YYYY-MM-DD hh:mm:ss') : null,
                room_category: rmcat,
                bed_type: bedtype,
                telephone: tele === true ? 1 : 0,
                geezer: gzr === true ? 1 : 0,
                pat_surv_key: key === true ? 1 : 0,
                pat_surv_callbell: callbell === true ? 1 : 0,
                dietition_visit_tme: dv !== '' ? moment(dv).format('YYYY-MM-DD hh:mm:ss') : null,
                stat_medicine: st !== '' ? moment(st).format('YYYY-MM-DD hh:mm:ss') : null,
                stat_recived_time: rt !== '' ? moment(rt).format('YYYY-MM-DD hh:mm:ss') : null,
                assigned_nurse: asn,
                payment_mode: modepay,
                document_status: doc,
                creadit_detail: cr,
                package: pck,
                remarks_we: remr,
                sfa_mfa: sfa,
                tv_ac_remot: actvremort,
                room_amentites: roomamenties,
                pateint_service: patservice,
                we_employee: emid,
                surv_log_slno: surv_log_slno,
                bhrc_patient: bhrc === true ? 1 : 0,
                if_dama: dama === true ? 1 : 0,
                dama_remarks: reson,
              }
              Updatedata(patchData)
            }
            // shifting insert function
            else if (success === 2) {
              const postData = {
                we_surv_slno: surv_slno,
                ip_no: ipno,
                bd_code: bedcode,
                discharge_wright: duser !== '' ? moment(duser).format('YYYY-MM-DD hh:mm:ss') : null,
                shift_from: null,
                shift_to: nurse,
                recieved_time: rstym !== '' ? moment(rstym).format('YYYY-MM-DD hh:mm:ss') : null,
                room_category: rmcat,
                bed_type: bedtype,
                tv_ac_remot: actvremort,
                telephone: tele === true ? 1 : 0,
                geezer: gzr === true ? 1 : 0,
                pat_surv_key: key === true ? 1 : 0,
                pat_surv_callbell: callbell === true ? 1 : 0,
                dietition_visit_tme: dv !== '' ? moment(dv).format('YYYY-MM-DD hh:mm:ss') : null,
                stat_medicine: st !== '' ? moment(st).format('YYYY-MM-DD hh:mm:ss') : null,
                stat_recived_time: rt !== '' ? moment(rt).format('YYYY-MM-DD hh:mm:ss') : null,
                assigned_nurse: asn !== 0 ? asn : null,
                payment_mode: modepay,
                document_status: doc,
                creadit_detail: cr,
                package: pck,
                remarks_we: remr,
                sfa_mfa: sfa,
                room_amentites: roomamenties,
                pateint_service: patservice,
                bhrc_patient: bhrc === true ? 1 : 0,
                if_dama: dama === true ? 1 : 0,
                dama_remarks: reson,
                we_employee: emid,
              }
              const result1 = await axioslogin.post('/WeWork/patientsurv', postData)
              const { succs, messagee } = result1.data
              if (succs === 1) {
                succesNotify(messagee)
              } else if (succs === 0) {
                infoNotify(messagee)
              } else {
                infoNotify(messagee)
              }
              reset()
            }
          }
          getsurvlogslno(shiftdetl)
        } else if (success === 2) {
          Insertidtable(postdetail).then(value => {
            insertdata(value)
          })
        }
      }
      getsurvslno(postdata)
    },
    [
      postdetail,
      ipno,
      ptno,
      bedcode,
      bedtype,
      gzr,
      dv,
      st,
      rt,
      asn,
      modepay,
      doc,
      cr,
      pck,
      remr,
      sfa,
      duser,
      rstym,
      tele,
      nurse,
      key,
      callbell,
      emid,
      rmcat,
      we_surv_slno,
      roomamenties,
      patservice,
      actvremort,
      count,
      reset,
      dama,
      reson,
      bhrc,
    ]
  )

  const SurvillenceView = useCallback(() => {
    setclosebtn(2)
    setflag(1)
  }, [setclosebtn])
  const closeIcon = useCallback(() => {
    setclosebtn(0)
    setflag(0)
  }, [setclosebtn])

  return (
    <Box
      sx={{
        px: 1,
        pt: 1,
        flexDirection: { xl: 'row', lg: 'row', md: 'row', sm: 'column', xs: 'column' },
      }}
    >
      {flag === 1 ? (
        <Box>
          <PatSurvillenceView ipno={ipno} />
        </Box>
      ) : (
        <Paper>
          <Box sx={{ display: 'flex', backgroundColor: '#f0f3f5' }}>
            <Box sx={{ flex: 1 }}>
              <CssVarsProvider>
                <Typography sx={{ fontFamily: 'Roboto', fontSize: 20, p: 1.5 }}>
                  Patient Survillence
                </Typography>
              </CssVarsProvider>
            </Box>
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
            <CustomeToolTip title="View" placement="left">
              <Box sx={{ p: 1 }}>
                <CusIconButton
                  size="sm"
                  variant="outlined"
                  color="primary"
                  clickable="true"
                  onClick={SurvillenceView}
                >
                  <RemoveRedEyeSharpIcon fontSize="small" />
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
                  onClick={closeIcon}
                >
                  <CloseIcon fontSize="small" />
                </CusIconButton>
              </Box>
            </CustomeToolTip>
          </Box>
          <Paper sx={{ p: 1 }}>
            <Box
              square
              elevation={3}
              sx={{
                pl: 3,
                display: 'flex',
                width: { xl: '100%', lg: '100%', md: '100%' },
                flexDirection: { xl: 'row', lg: 'row', md: 'row', sm: 'column', xs: 'column' },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xl: 'row', lg: 'row', md: 'row', sm: 'row', xs: 'column' },
                  width: { xl: '50%', lg: '50%', md: '50%', sm: '100%' },
                }}
              >
                <Box
                  sx={{
                    width: { xl: '50%', lg: '50%', md: '50%', sm: '60%' },
                    display: 'flex',
                  }}
                >
                  <Box
                    sx={{ width: { xl: '30%', lg: '30%', md: '38%', sm: '37%' }, display: 'flex' }}
                  >
                    <Typography>#MRD.No:</Typography>
                  </Box>
                  <Box sx={{ width: { xl: '60%', lg: '70%', md: '62%', sm: '60%' } }}>
                    <Typography>{ptno}</Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    width: { xl: '50%', lg: '50%', md: '31%', sm: '60%' },
                    display: 'flex',
                  }}
                >
                  <Box sx={{ width: { xl: '20%', lg: '25%', md: '50%', sm: '30%' } }}>
                    <Typography>#IP.No:</Typography>
                  </Box>
                  <Box sx={{ width: { xl: '60%', lg: '60%', md: '35%', sm: '50%' } }}>
                    <Typography>{ipno}</Typography>
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xl: 'row', lg: 'row', md: 'row', sm: 'row', xs: 'column' },
                  width: { xl: '50%', lg: '50%', md: '50%', sm: '100%' },
                }}
              >
                <Box
                  sx={{
                    width: { xl: '65%', lg: '80%', md: '80%', sm: '60%' },
                    display: 'flex',
                  }}
                >
                  <Box sx={{ width: { xl: '30%', lg: '25%', md: '26%', sm: '37%' } }}>
                    <Typography>Name:</Typography>
                  </Box>
                  <Box
                    sx={{ width: { xl: '60%', lg: '75%', md: '74%', sm: '60%' }, display: 'flex' }}
                  >
                    <Typography>{name}</Typography>
                  </Box>
                </Box>
                <Box
                  sx={{ width: { xl: '35%', lg: '20%', md: '20%', sm: '60%' }, display: 'flex' }}
                >
                  <Box sx={{ width: { xl: '15%', lg: '40%', md: '50%', sm: '30%' } }}>
                    <Typography>Age:</Typography>
                  </Box>
                  <Box sx={{ width: { xl: '60%', lg: '60%', md: '50%', sm: '50%' } }}>
                    <Typography>{age}</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                pl: 3,
                pt: 0.5,
                width: { xl: '100%', lg: '100%', md: '100%', sm: '100%' },
                flexDirection: { xl: 'row', lg: 'row', md: 'row', sm: 'column', xs: 'column' },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  width: { xl: '50%', lg: '50%', md: '50%', sm: '100%' },
                  flexDirection: { xl: 'row', lg: 'row', md: 'row', sm: 'row', xs: 'column' },
                }}
              >
                <Box
                  sx={{ width: { xl: '50%', lg: '50%', md: '50%', sm: '50%' }, display: 'flex' }}
                >
                  <Box sx={{ width: { xl: '30%', lg: '30%', md: '38%', sm: '37%' } }}>
                    <Typography>Sex:</Typography>
                  </Box>
                  <Box sx={{ width: { xl: '60%', lg: '60%', md: '60%', sm: '60%' } }}>
                    <Typography>{mf}</Typography>
                  </Box>
                </Box>
                <Box
                  sx={{ width: { xl: '50%', lg: '49%', md: '50%', sm: '50%' }, display: 'flex' }}
                >
                  <Box sx={{ width: { xl: '21%', lg: '27%', md: '30%', sm: '30%' } }}>
                    <Typography>Room:</Typography>
                  </Box>
                  <Box sx={{ width: { xl: '70%', lg: '70%', md: '60%', sm: '50%' } }}>
                    <Typography>{rmno}</Typography>
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xl: 'row', lg: 'row', md: 'row', sm: 'row', xs: 'column' },
                  width: { xl: '50%', lg: '50%', md: '50%', sm: '100%' },
                }}
              >
                <Box
                  sx={{ width: { xl: '65%', lg: '80%', md: '80%', sm: '65%' }, display: 'flex' }}
                >
                  <Box sx={{ width: { xl: '30%', lg: '25%', md: '25%', sm: '29%' } }}>
                    <Typography>Consultant:</Typography>
                  </Box>
                  <Box sx={{ width: { xl: '60%', lg: '75%', md: '75%', sm: '70%' } }}>
                    <Typography>{docname}</Typography>
                  </Box>
                </Box>
                <Box
                  sx={{ width: { xl: '35%', lg: '20%', md: '20%', sm: '30%' }, display: 'flex' }}
                >
                  <CusCheckBox
                    variant="outlined"
                    color="primary"
                    size="md"
                    name="acremot"
                    label="BHRC"
                    value={bhrc}
                    onCheked={getbhrc}
                    checked={bhrc}
                  />
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                pl: 3,
                pt: 0.5,
                width: { xl: '100%', lg: '100%', md: '100%', sm: '100%' },
                flexDirection: { xl: 'row', lg: 'row', md: 'row', sm: 'row', xs: 'column' },
              }}
            >
              <Box
                sx={{
                  width: { xl: '50%', lg: '50%', md: '50%', sm: '50%' },
                  display: 'flex',
                }}
              >
                <Box sx={{ width: { xl: '15%', lg: '15%', md: '19%', sm: '37%' } }}>
                  <Typography>DOA:</Typography>
                </Box>
                <Box sx={{ width: { xl: '70%', lg: '70%', md: '70%', sm: '60%' } }}>
                  <Typography>{doa}</Typography>
                </Box>
              </Box>
              <Box sx={{ width: { xl: '50%', lg: '50%', md: '50%', sm: '50%' }, display: 'flex' }}>
                <Box sx={{ width: { xl: '19%', lg: '19%', md: '20%', sm: '30%' } }}>
                  <Typography>DOD:</Typography>
                </Box>
                <Box sx={{ width: { xl: '40%', lg: '40%', md: '60%', sm: '65%' } }}>
                  <TextFieldCustom
                    size="sm"
                    type="datetime-local"
                    name="duser"
                    value={duser}
                    onchange={doduser}
                  />
                </Box>
              </Box>
            </Box>
          </Paper>
          <Paper square elevation={3} sx={{ p: 2 }}>
            <Box sx={{ pb: 1 }}>
              <CssVarsProvider>
                <Typography
                  sx={{ fontStyle: 'oblique', fontWeight: 500, color: '#94B7FC' }}
                  startdecorator={<ArrowRightOutlinedIcon />}
                >
                  Patient Encounter Information
                </Typography>
              </CssVarsProvider>
            </Box>
            <Paper>
              <Box
                sx={{
                  display: 'flex',
                  width: { xl: '100%', lg: '100%', md: '100%', sm: '100%' },
                  flexDirection: { xl: 'row', lg: 'row', md: 'row', sm: 'row' },
                  pl: 2,
                }}
              >
                <Box
                  sx={{ display: 'flex', width: { xl: '50%', lg: '50%', md: '50%', sm: '50%' } }}
                >
                  <Box
                    sx={{ display: 'flex', width: { xl: '20%', lg: '28%', md: '30%', sm: '40%' } }}
                  >
                    <CssVarsProvider>
                      <Typography>Nursing station:</Typography>{' '}
                    </CssVarsProvider>
                  </Box>
                  <Box sx={{ width: { xl: '50%', lg: '50%', md: '50%', sm: '50%' } }}>
                    <Typography>{nsdesc}</Typography>
                  </Box>
                </Box>
                <Box
                  sx={{ display: 'flex', width: { xl: '50%', lg: '50%', md: '50%', sm: '50%' } }}
                >
                  <Box
                    sx={{ display: 'flex', width: { xl: '25%', lg: '38%', md: '40%', sm: '50%' } }}
                  >
                    <Typography>Received date & time:</Typography>
                  </Box>
                  <Box
                    sx={{ display: 'flex', width: { xl: '50%', lg: '60%', md: '50%', sm: '50%' } }}
                  >
                    <TextFieldCustom
                      size="sm"
                      type="datetime-local"
                      name="rstym"
                      value={rstym}
                      onchange={rstime}
                    />
                  </Box>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', px: 2 }}>
                <Box sx={{ width: { xl: '10%', lg: '16.5%', md: '16.5%', sm: '16.5%' } }}>
                  <CssVarsProvider>
                    <Typography>Room category:</Typography>
                  </CssVarsProvider>
                </Box>
                <Box
                  variant="outlined"
                  square
                  sx={{
                    display: 'flex',
                    textTransform: 'capitalize',
                    flexDirection: { xl: 'row', lg: 'row', md: 'row', sm: 'row', xs: 'column' },
                    justifyContent: 'space-between',
                    width: { xl: '90%', lg: '100%', md: '100%', sm: '100%' },
                  }}
                >
                  {roomcategory &&
                    roomcategory.map((val, index) => {
                      return (
                        <Box
                          sx={{
                            py: 1,
                            justifyContent: 'space-between',
                            width: { xl: '100%', lg: '100%', md: '100%' },
                          }}
                          key={val.rmslno}
                        >
                          <ComplaintCheckBox
                            label={val.rmname.toLowerCase()}
                            name={val.rmname}
                            value={val.rmslno}
                            onChange={setrmcat}
                            checkedValue={rmcat}
                          />
                        </Box>
                      )
                    })}
                </Box>
              </Box>
            </Paper>
          </Paper>
          <Paper square elevation={3} sx={{ p: 2 }}>
            <Box sx={{ py: 0.5 }}>
              <CssVarsProvider>
                <Typography
                  sx={{ fontStyle: 'oblique', fontWeight: 500, color: '#94B7FC' }}
                  startdecorator={<ArrowRightOutlinedIcon />}
                >
                  Facilities provided
                </Typography>
              </CssVarsProvider>
            </Box>
            <Paper sx={{ px: 2 }}>
              <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                <Box sx={{ width: { xl: '10%', lg: '14%', md: '15%', sm: '16%' } }}>
                  <CssVarsProvider>
                    <Typography>Bed:</Typography>
                  </CssVarsProvider>
                </Box>
                <Box
                  variant="outlined"
                  square
                  sx={{
                    display: 'flex',
                    textTransform: 'capitalize',
                    flexDirection: { xl: 'row', lg: 'row', md: 'row', sm: 'row', xs: 'column' },
                    justifyContent: 'space-between',
                    width: { xl: '90%', lg: '86%', md: '90%', sm: '84%' },
                  }}
                >
                  {bed &&
                    bed.map((val, index) => {
                      return (
                        <Box
                          sx={{
                            justifyContent: 'space-between',
                            width: { xl: '100%', lg: '100%', md: '100%', sm: '100%' },
                          }}
                          key={val.bdslno}
                        >
                          <ComplaintCheckBox
                            label={val.bdname.toLowerCase()}
                            name={val.bdname}
                            value={val.bdslno}
                            onChange={setbedtype}
                            checkedValue={bedtype}
                          />
                        </Box>
                      )
                    })}
                </Box>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                <Box sx={{ width: { xl: '10%', lg: '14%', md: '14%', sm: '16%' } }}>
                  <CssVarsProvider>
                    <Typography>Remote:</Typography>
                  </CssVarsProvider>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: { xl: '90%', lg: '86%', md: '86%', sm: '84%' },
                  }}
                >
                  <Box sx={{ width: { xl: '20%', lg: '20%', md: '20%', sm: '20%' } }}>
                    <CusCheckBox
                      variant="outlined"
                      color="primary"
                      size="md"
                      name="acremot"
                      label="AC"
                      value={acremot}
                      onCheked={updateremort}
                      checked={acremot}
                    />
                  </Box>
                  <Box sx={{ width: { xl: '20%', lg: '20%', md: '20%', sm: '20%' } }}>
                    <CusCheckBox
                      variant="outlined"
                      color="primary"
                      size="md"
                      name="tvremot"
                      label="TV"
                      value={tvremot}
                      onCheked={updateremort}
                      checked={tvremot}
                    />
                  </Box>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                <Box sx={{ width: { xl: '10%', lg: '14%', md: '14%', sm: '16%' } }}></Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: { xl: '90%', lg: '86%', md: '86%', sm: '84%' },
                  }}
                >
                  <Box sx={{ width: { xl: '20%', lg: '20%', md: '20%', sm: '20%' } }}>
                    <CusCheckBox
                      variant="outlined"
                      color="primary"
                      size="md"
                      name="tele"
                      label="TelePhone"
                      value={tele}
                      onCheked={gettele}
                      checked={tele}
                    />
                  </Box>
                  <Box sx={{ width: { xl: '20%', lg: '20%', md: '20%', sm: '20%' } }}>
                    <CusCheckBox
                      variant="outlined"
                      color="primary"
                      size="md"
                      name="gzr"
                      label="Geezer"
                      value={gzr}
                      onCheked={getgeezer}
                      checked={gzr}
                    />
                  </Box>
                  <Box sx={{ width: { xl: '20%', lg: '20%', md: '20%', sm: '20%' } }}>
                    <CusCheckBox
                      variant="outlined"
                      color="primary"
                      size="md"
                      name="key"
                      label="Key"
                      value={key}
                      onCheked={getkey}
                      checked={key}
                    />
                  </Box>
                  <Box sx={{ width: { xl: '20%', lg: '20%', md: '20%', sm: '21%' } }}>
                    <CusCheckBox
                      variant="outlined"
                      color="primary"
                      size="md"
                      name="callbell"
                      label="Callbell"
                      value={callbell}
                      onCheked={getcallbell}
                      checked={callbell}
                    />
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Paper>
          <Paper square elevation={3} sx={{ p: 2 }}>
            <Box>
              <CssVarsProvider>
                <Typography
                  sx={{ fontStyle: 'oblique', fontWeight: 500, color: '#94B7FC' }}
                  startdecorator={<ArrowRightOutlinedIcon />}
                >
                  Basic Room amentities
                </Typography>
              </CssVarsProvider>
            </Box>
            <Paper sx={{ display: 'flex' }}>
              <RoomAmenties ameties={ameties} setamenties={setamenties} />
            </Paper>
          </Paper>
          <Paper square elevation={3} sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
              <CssVarsProvider>
                <Typography
                  sx={{ fontStyle: 'oblique', fontWeight: 500, color: '#94B7FC' }}
                  startdecorator={<ArrowRightOutlinedIcon />}
                >
                  Primary Patient service
                </Typography>
              </CssVarsProvider>
            </Box>
            <Paper sx={{ px: 2, py: 2 }}>
              <Box sx={{ pb: 0.5 }}>
                <Patservice service={service} setservice={setservice} />
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Box
                  sx={{
                    display: 'flex',
                    width: { xl: '50%', lg: '50%', md: '50%', sm: '50%' },
                    justifyContent: 'start',
                  }}
                >
                  <Box
                    sx={{ display: 'flex', width: { xl: '33%', lg: '30%', md: '38%', sm: '40%' } }}
                  >
                    <CssVarsProvider>
                      <Typography>Dietition visit time:</Typography>{' '}
                    </CssVarsProvider>
                  </Box>
                  <Box
                    sx={{ display: 'flex', width: { xl: '40%', lg: '50%', md: '52%', sm: '53%' } }}
                  >
                    <TextFieldCustom
                      size="sm"
                      type="datetime-local"
                      name="dv"
                      value={dv}
                      onchange={getvist}
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: { xl: '50%', lg: '50%', md: '50%', sm: '50%' },
                  }}
                >
                  <Box
                    sx={{ display: 'flex', width: { xl: '30%', lg: '50%', md: '50%', sm: '50%' } }}
                  >
                    <CssVarsProvider>
                      <Typography>STAT Medicine indent time:</Typography>{' '}
                    </CssVarsProvider>
                  </Box>
                  <Box
                    sx={{ display: 'flex', width: { xl: '50%', lg: '50%', md: '50%', sm: '50%' } }}
                  >
                    <TextFieldCustom
                      size="sm"
                      type="datetime-local"
                      name="st"
                      value={st}
                      onchange={getstat}
                    />
                  </Box>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', width: '100%', justifyContent: 'start', pt: 0.5 }}>
                <Box
                  sx={{ display: 'flex', width: { xl: '50%', lg: '50%', md: '50%', sm: '50%' } }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      width: { xl: '29.5%', lg: '25%', md: '33%', sm: '33%' },
                    }}
                  >
                    <CssVarsProvider>
                      <Typography>Received time:</Typography>{' '}
                    </CssVarsProvider>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      width: { xl: '44%', lg: '55%', md: '58%', sm: '60%' },
                      pl: 3,
                    }}
                  >
                    <TextFieldCustom
                      size="sm"
                      type="datetime-local"
                      name="rt"
                      value={rt}
                      onchange={getrt}
                    />
                  </Box>
                </Box>
                <Box
                  sx={{ display: 'flex', width: { xl: '50%', lg: '50%', md: '50%', sm: '50%' } }}
                >
                  <Box
                    sx={{ display: 'flex', width: { xl: '30%', lg: '50%', md: '50%', sm: '50%' } }}
                  >
                    <CssVarsProvider>
                      <Typography>Assigned nursing staff:</Typography>{' '}
                    </CssVarsProvider>
                  </Box>
                  <Box
                    sx={{ display: 'flex', width: { xl: '50%', lg: '50%', md: '50%', sm: '50%' } }}
                  >
                    <AssignedStaff value={asn} setValue={setasn} shiftto={nurse} />
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Paper>
          <Paper square elevation={3} sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
              <CssVarsProvider>
                <Typography
                  sx={{ fontStyle: 'oblique', fontWeight: 500, color: '#94B7FC' }}
                  startdecorator={<ArrowRightOutlinedIcon />}
                >
                  Financial Perspective
                </Typography>
              </CssVarsProvider>
            </Box>
            <Paper sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                <Box sx={{ width: { xl: '20%', lg: '25%', md: '25%', sm: '25%' } }}>
                  <CssVarsProvider>
                    <Typography> Mode of Payment:</Typography>
                  </CssVarsProvider>{' '}
                </Box>
                <Box
                  variant="outlined"
                  square
                  sx={{
                    display: 'flex',
                    textTransform: 'capitalize',
                    flexDirection: { xl: 'row', lg: 'row', md: 'row', sm: 'row', xs: 'column' },
                    justifyContent: 'space-between',
                    width: { xl: '100%', lg: '100%', md: '100%', sm: '100%' },
                  }}
                >
                  {payment &&
                    payment.map((val, index) => {
                      return (
                        <Box
                          sx={{
                            justifyContent: 'space-between',
                            width: { xl: '100%', lg: '100%', md: '100%', sm: '100%' },
                          }}
                          key={val.payno}
                        >
                          <ComplaintCheckBox
                            label={val.payname.toLowerCase()}
                            name={val.payname}
                            value={val.payno}
                            onChange={setmodpay}
                            checkedValue={modepay}
                          />
                        </Box>
                      )
                    })}
                </Box>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', pt: 0.5 }}>
                <Box sx={{ width: { xl: '20%', lg: '25%', md: '25%', sm: '25%' } }}>
                  <CssVarsProvider>
                    <Typography>Package:</Typography>
                  </CssVarsProvider>
                </Box>
                <Box
                  variant="outlined"
                  square
                  sx={{
                    display: 'flex',
                    textTransform: 'capitalize',
                    flexDirection: { xl: 'row', lg: 'row', md: 'row', sm: 'row', xs: 'column' },
                    justifyContent: 'space-between',
                    width: { xl: '100%', lg: '100%', md: '100%', sm: '100%' },
                  }}
                >
                  {pack &&
                    pack.map((val, index) => {
                      return (
                        <Box
                          sx={{
                            justifyContent: 'space-between',
                            width: { xl: '100%', lg: '100%', md: '100%', sm: '100%' },
                          }}
                          key={val.pcno}
                        >
                          <ComplaintCheckBox
                            label={val.pcname.toLowerCase()}
                            name={val.pcname}
                            value={val.pcno}
                            onChange={setpck}
                            checkedValue={pck}
                          />
                        </Box>
                      )
                    })}
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'start',
                  pt: 0.5,
                }}
              >
                <Box sx={{ width: { xl: '16.5%', lg: '20%', md: '20%', sm: '20%' } }}>
                  <CssVarsProvider>
                    <Typography>Document Status(if any):</Typography>
                  </CssVarsProvider>
                </Box>
                <Box
                  sx={{ display: 'flex', width: { xl: '73%', lg: '80%', md: '75%', sm: '78%' } }}
                >
                  <TextFieldCustom size="sm" type="text" name="doc" value={doc} onchange={getdoc} />
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'start',
                  pt: 0.5,
                }}
              >
                <Box sx={{ width: { xl: '16.5%', lg: '20%', md: '20%', sm: '20%' } }}>
                  <CssVarsProvider>
                    <Typography>Details if Credit:</Typography>
                  </CssVarsProvider>
                </Box>
                <Box
                  sx={{ display: 'flex', width: { xl: '73%', lg: '80%', md: '75%', sm: '78%' } }}
                >
                  <TextFieldCustom
                    size="sm"
                    type="text"
                    name="cr"
                    value={cr}
                    onchange={getcredit}
                  />
                </Box>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', pt: 0.5 }}>
                <Box sx={{ width: { xl: '16.5%', lg: '20%', md: '20%', sm: '20%' } }}>
                  <CssVarsProvider>
                    <Typography>SFA/MFA:</Typography>
                  </CssVarsProvider>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: { xl: '73%', lg: '80%', md: '75%', sm: '78%' },
                  }}
                >
                  <TextFieldCustom size="sm" type="text" name="sfa" value={sfa} onchange={getsfa} />
                </Box>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', pt: 0.5 }}>
                <Box sx={{ width: { xl: '16.5%', lg: '20%', md: '20%', sm: '20%' } }}>
                  <CssVarsProvider>
                    <Typography>Remarks:</Typography>
                  </CssVarsProvider>
                </Box>
                <Box sx={{ width: { xl: '73%', lg: '80%', md: '75%', sm: '78%' } }}>
                  <TextFieldCustom
                    size="sm"
                    type="text"
                    name="remr"
                    value={remr}
                    onchange={getremark}
                  />
                </Box>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', pt: 0.5 }}>
                <Box sx={{ width: { xl: '16.5%', lg: '20%', md: '20%', sm: '21%' } }}>
                  <CusCheckBox
                    variant="outlined"
                    color="primary"
                    size="md"
                    name="gzr"
                    label="DAMA"
                    value={dama}
                    onCheked={getdama}
                    checked={dama}
                  />
                </Box>
                <Box sx={{ width: { xl: '73%', lg: '80%', md: '75%', sm: '78%' } }}>
                  <TextFieldCustom
                    size="sm"
                    disabled={dama === true ? false : true}
                    type="text"
                    name="sfa"
                    placeholder="reason"
                    value={reson}
                    onchange={getreason}
                  />
                </Box>
              </Box>
            </Paper>
          </Paper>
        </Paper>
      )}
    </Box>
  )
}
export default memo(Patientsurvillence)
