import { IconButton } from '@mui/material'
import React, { Fragment, useCallback, useEffect, memo, useState } from 'react'
import { axioslogin } from '../Axios/Axios'
import { warningNotify, infoNotify } from '../Common/CommonCode'
import CusAgGridMast from '../Components/CusAgGridMast'
import { editicon } from 'src/color/Color'
import { Box, Paper } from '@mui/material'
import DietApprovalModel from './DietApprovalModel'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import CardCloseOnly from '../Components/CardCloseOnly'
import { useNavigate } from 'react-router-dom'
import NursingStationMeliSelect from '../CommonSelectCode/NursingStationMeliSelect'
import CusCheckBox from 'src/views/Components/CusCheckBox'
const DietApprovalList = () => {
  const history = useNavigate()
  //state for setting table data
  const [tabledata, setTabledata] = useState([])
  //for opening diet approval
  const [approval, setApproval] = useState(0)
  //for passing data to modal
  const [approvaldata, setData] = useState('')
  //for modal open
  const [open, setOpen] = useState(false)
  //for table rendering
  const [count, setCount] = useState(0)
  const [nurse, setNurse] = useState(0)
  const [checkDis, setDisCheck] = useState(0)
  const [appro, setApprov] = useState(false)
  const [notappro, setNotApprov] = useState(false)
  const [consulRequ, setConsulRequ] = useState(false)
  const [consul, setCounsult] = useState(0)
  const [counsultData, setCousultData] = useState([])
  const updateApprove = useCallback(e => {
    if (e.target.checked === true) {
      setApprov(true)
      setNotApprov(false)
    } else {
      setApprov(false)
      setNotApprov(false)
    }
  }, [])
  const updateNotApprov = useCallback(e => {
    if (e.target.checked === true) {
      setNotApprov(true)
      setApprov(false)
    } else {
      setApprov(false)
      setNotApprov(false)
    }
  }, [])
  const updateConsult = useCallback(e => {
    if (e.target.checked === true) {
      setConsulRequ(true)
      setCounsult(1)
    } else {
      setConsulRequ(false)
      setCounsult(0)
    }
  }, [])
  //column title setting
  const [column] = useState([
    { headerName: 'Patient  No', field: 'pt_no' },
    { headerName: 'Diet  No', field: 'dietpt_slno' },
    { headerName: 'Name', field: 'ptc_ptname', filter: 'true' },
    { headerName: 'Bed', field: 'bdc_no' },
    { headerName: 'Diet', field: 'diet_name' },
    { headerName: 'Remarks', field: 'plan_remark' },
    { headerName: 'Diet Approval', field: 'plan status', filter: 'true' },
    {
      headerName: 'Diet Approval',
      cellRenderer: params => (
        <IconButton sx={{ color: editicon, paddingY: 0.5 }} onClick={() => dietApproval(params)}>
          <CheckCircleOutlineIcon />
        </IconButton>
      ),
    },
  ])

  const [columns] = useState([
    { headerName: 'Patient  No', field: 'pt_no' },
    { headerName: 'Diet  No', field: 'dietpt_slno' },
    { headerName: 'Name', field: 'ptc_ptname', filter: 'true' },
    { headerName: 'Bed', field: 'bdc_no' },
    { headerName: 'Nursing Station', field: 'nsc_desc' },
    { headerName: 'Diet', field: 'diet_name' },
    { headerName: 'Remarks', field: 'plan_remark' },
    { headerName: 'Diet Approval', field: 'plan status', filter: 'true' },
    {
      headerName: 'Diet Approval',
      cellRenderer: params => (
        <IconButton sx={{ color: editicon, paddingY: 0.5 }} onClick={() => dietApproval(params)}>
          <CheckCircleOutlineIcon />
        </IconButton>
      ),
    },
  ])

  useEffect(() => {
    if (nurse !== 0) {
      setDisCheck(1)
    } else {
      setDisCheck(0)
    }
  }, [nurse])
  const dietApproval = params => {
    const data = params.data
    setData(data)
    setApproval(1)
    setOpen(true)
  }

  useEffect(() => {
    if (consul === 1) {
      const counstrequired = async () => {
        const result = await axioslogin.get('/dietplan/consult/approvsl/pending')
        const { success, data } = result.data
        if (success === 1) {
          setCousultData(data)
        } else if (success === 2) {
          setCousultData([])
          infoNotify('No Ptient under approval pending')
        }
      }
      counstrequired()
    }
  }, [consul, count])

  // geting diet planned patient details
  useEffect(() => {
    const getPatientList = async () => {
      if (nurse !== 0) {
        if (notappro === true) {
          const result = await axioslogin.get(`/dietplan/pendingApproval/${nurse}`)
          const { success, data, message } = result.data
          if (success === 1) {
            setTabledata(data)
          } else if (success === 2) {
            setTabledata([])
            infoNotify(message)
          } else {
            warningNotify('Error occured contact EDP')
          }
        } else if (appro === true) {
          const result = await axioslogin.get(`/dietplan/ApprovedList/${nurse}`)
          const { success, data, message } = result.data
          if (success === 1) {
            setTabledata(data)
          } else if (success === 2) {
            setTabledata([])
            infoNotify(message)
          } else {
            warningNotify('Error occured contact EDP')
          }
        } else {
          const result = await axioslogin.get(`/dietplan/AllList/${nurse}`)
          const { success, data, message } = result.data
          if (success === 1) {
            setTabledata(data)
          } else if (success === 2) {
            setTabledata([])
            infoNotify(message)
          } else {
            warningNotify('Error occured contact EDP')
          }
        }
      } else {
        setTabledata([])
      }
    }
    getPatientList()
  }, [nurse, count, notappro, appro])

  //close button function
  const backtoSetting = useCallback(() => {
    history('/Home/Settings')
  }, [history])
  return (
    <Fragment>
      <CardCloseOnly title="Diet Approval" close={backtoSetting}>
        <Box sx={{ width: '100%', pl: 1, pt: 1, pr: 1, pb: 1 }}>
          <Paper
            square
            elevation={3}
            sx={{
              pl: 1,
              pt: 1,
              pr: 1,
              pb: 1,
            }}
          >
            <Box
              sx={{
                width: '100%',
                pl: 1,
                pt: 0.5,
                pr: 1,
                pb: 0.5,
                display: 'flex',
                justifyContent: 'center',
                flexDirection: { xl: 'row', lg: 'row', md: 'row', sm: 'column', xs: 'column' },
              }}
            >
              <Box sx={{ width: '25%', pr: 1, mt: 1 }}>
                <NursingStationMeliSelect value={nurse} setValue={setNurse} />
              </Box>
              <Box sx={{ width: '25%', pr: 1, mt: 1 }}>
                <CusCheckBox
                  label="Consultation Required"
                  color="primary"
                  size="md"
                  name="consulRequ"
                  value={consulRequ}
                  checked={consulRequ}
                  onCheked={updateConsult}
                />
              </Box>
            </Box>
          </Paper>
        </Box>
        {consul === 1 ? (
          <Box sx={{ width: '100%', pl: 1, pt: 1, pr: 1, pb: 1 }}>
            <Paper
              square
              elevation={3}
              sx={{
                pl: 1,
                pt: 1,
                pr: 1,
                pb: 1,
              }}
            >
              <CusAgGridMast columnDefs={columns} tableData={counsultData} />
              {approval === 1 ? (
                <DietApprovalModel
                  open={open}
                  setOpen={setOpen}
                  data={approvaldata}
                  count={count}
                  setCount={setCount}
                />
              ) : null}
            </Paper>
          </Box>
        ) : checkDis !== 0 ? (
          <Box sx={{ width: '100%', pl: 1, pt: 1, pr: 1, pb: 1 }}>
            <Paper
              square
              elevation={3}
              sx={{
                pl: 1,
                pt: 1,
                pr: 1,
                pb: 1,
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  pl: 1,
                  pt: 0.5,
                  pr: 1,
                  pb: 0.5,
                  flex: 1,
                  display: 'flex',
                  flexDirection: { xl: 'row', lg: 'row', md: 'row', sm: 'column', xs: 'column' },
                  justifyContent: 'center',
                }}
              >
                <Box sx={{ width: '13%', pr: 1, mt: 1 }}>
                  <CusCheckBox
                    label="Approved"
                    color="primary"
                    size="md"
                    name="appro"
                    value={appro}
                    checked={appro}
                    onCheked={updateApprove}
                  />
                </Box>
                <Box sx={{ width: '13%', mt: 1 }}>
                  <CusCheckBox
                    label="Approval Pending"
                    color="primary"
                    size="md"
                    name="notappro"
                    value={notappro}
                    checked={notappro}
                    onCheked={updateNotApprov}
                  />
                </Box>
              </Box>
              <Box sx={{ width: '100%', p: 1 }}>
                <CusAgGridMast columnDefs={column} tableData={tabledata} />
                {approval === 1 ? (
                  <DietApprovalModel
                    open={open}
                    setOpen={setOpen}
                    data={approvaldata}
                    count={count}
                    setCount={setCount}
                  />
                ) : null}
              </Box>
            </Paper>
          </Box>
        ) : null}
      </CardCloseOnly>
    </Fragment>
  )
}
export default memo(DietApprovalList)
