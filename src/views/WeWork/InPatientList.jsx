import React, { Fragment, useCallback, useEffect, useState } from 'react'
import NextPlanIcon from '@mui/icons-material/NextPlan'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, warningNotify } from 'src/views/Common/CommonCode'
import { IconButton } from '@mui/material'
import { editicon } from 'src/color/Color'
import { Box, Paper } from '@mui/material'
import { Tooltip } from '@mui/material'
import WheelchairPickupIcon from '@mui/icons-material/WheelchairPickup'
import CoPresentOutlinedIcon from '@mui/icons-material/CoPresentOutlined'
import DifferenceOutlinedIcon from '@mui/icons-material/DifferenceOutlined'
import { Card, CardContent, ThemeProvider } from '@mui/material'
import CustomCardHeaderOne from '../Components/CustomCardHeaderOne'
import theme from '../Components/MuiTheme'
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
// import { useDispatch } from 'react-redux';
import HotelOutlinedIcon from '@mui/icons-material/HotelOutlined'
import BedTracking from './BedTracking/BedTracking'
import FollowTheSignsTwoToneIcon from '@mui/icons-material/FollowTheSignsTwoTone'
import DischargeEvent from './DischargeEvent/DischargeEvent'
import { memo } from 'react'
import ComplistAgGridcmp from '../Components/ComplistAgGridcmp'
import { useNavigate } from 'react-router-dom'

// import ComplaintCheckBox from '../ComManagement/ComplaintRegister/ComplaintCheckBox';
// import { useSelector } from 'react-redux';
// import { CssVarsProvider } from '@mui/joy';
// import { CssVarsProvider } from '@mui/joy';
// import NursingStationMeliSelect from '../CommonSelectCode/NursingStationMeliSelect';

const NursingStation = React.lazy(() => import('../CommonSelectCode/NursingStationMeliSelect'))
const DailyactivityLazy = React.lazy(() => import('./DailyActivity/Dailyactivity'))
const PatientIntractionLazy = React.lazy(() => import('./PatirntIntraction/PatientIntraction'))
const PatientsurvillenceLazy = React.lazy(() => import('./Patienntsurvillence/Patientsurvillence'))
const PatSurvillenceViewLazy = React.lazy(() => import('./Patienntsurvillence/PatSurvillenceView'))

const InPatientList = () => {
  const [tabledata, setTabledata] = useState([])
  const [nurse, setNurse] = useState(0)
  const [table, setTable] = useState(0)
  const [name, setname] = useState(0)
  const [age, setage] = useState(0)
  const [ipno, setipno] = useState(0)
  const [ptno, setptno] = useState(0)
  const [doa, setdoa] = useState(0)
  const [docname, setdocname] = useState(0)
  const [rmno, setrmno] = useState(0)
  const [mf, setmf] = useState(0)
  const [checkIcon, setcheckIcon] = useState(0)
  const [bedcode, setbedcode] = useState([])
  const [nsdesc, setnsdesc] = useState('')
  const history = useNavigate()

  const [column] = useState([
    { headerName: 'Slno', field: 'slno' },
    {
      headerName: 'IP No',
      field: 'ip_no',
      filter: true,
      wrapText: true,
      autoHeight: true,
      sortable: true,
      width: 150
    },
    {
      headerName: 'OP No',
      field: 'pt_no',
      wrapText: true,
      autoHeight: true,
      filter: true,
      width: 150
    },
    {
      headerName: 'Name',
      field: 'ptc_ptname',
      filter: true,
      width: 300,
      wrapText: true,
      autoHeight: true
    },
    { headerName: 'Age', field: 'age' },
    {
      headerName: 'Doctor',
      field: 'doc_name',
      width: 350,
      filter: true,
      wrapText: true,
      autoHeight: true
    },
    { headerName: 'Room', field: 'rmc_desc' },
    {
      headerName: 'DOA',
      field: 'DOA',
      width: 350,
      wrapText: true,
      autoHeight: true,
      sortable: true
    },
    {
      headerName: 'Action',
      cellRenderer: params => (
        <IconButton sx={{ color: editicon, paddingY: 0.5 }} onClick={() => gotoform(params)}>
          <NextPlanIcon />
        </IconButton>
      )
    }
  ])
  const [closebtn, setclosebtn] = useState(0)
  const gotoform = useCallback(params => {
    // setflag(1)
    setclosebtn(1)
    const dataa = params.api.getSelectedRows()
    const { ip_no, pt_no, ptc_ptname, doc_name, DOA, rmc_desc, age, ptc_sex, bd_code, nsc_desc } = dataa[0]
    setname(ptc_ptname)
    setipno(ip_no)
    setptno(pt_no)
    setdoa(DOA)
    setdocname(doc_name)
    setrmno(rmc_desc)
    setage(age)
    // setdod(DOD)
    setmf(ptc_sex)
    setbedcode(bd_code)
    setnsdesc(nsc_desc)
  }, [])

  // first
  useEffect(() => {
    const getPatientList = async () => {
      if (nurse !== 0) {
        const result = await axioslogin.get(`/WeWork/getinpatient/${nurse}`)
        const { success, data, message } = result.data
        if (success === 1) {
          setTabledata(data)
          setTable(1)
        } else if (success === 2) {
          setTabledata([])
          infoNotify(message)
        } else {
          warningNotify('Error occured contact EDP')
        }
      }
    }
    getPatientList(nurse)
  }, [nurse])
  //close button function
  const backtoSetting = () => {
    history('/Home/WeWork/InpatientList')
  }

  const patient = () => {
    setcheckIcon(1)
  }

  const Activity = () => {
    setcheckIcon(2)
  }

  const Interaction = () => {
    setcheckIcon(3)
  }

  const bedTracking = () => {
    setcheckIcon(4)
  }

  const discharge = () => {
    setcheckIcon(5)
  }

  const submited = useCallback(
    insertdata => {
      const insert = () => { }
      if (checkIcon === 1 || checkIcon === 0) {
        insert(insertdata)
      }
    },
    [checkIcon]
  )

  return (
    <Fragment>
      <Card>
        {closebtn === 0 ? (
          <ThemeProvider theme={theme}>
            <Card sx={{ borderRadius: 0, boxShadow: 1 }}>
              <CustomCardHeaderOne title="In Pateint List" onClickClose={backtoSetting} cardStyle={{}} />
              <CardContent sx={{ p: 0 }}>
                <Box sx={{ width: '100%', pl: 1, pt: 1, pr: 1, pb: 1 }}>
                  <Paper square elevation={3} sx={{ pl: 1, pt: 1, pr: 1, pb: 1 }}>
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                      <Box sx={{ width: '30%' }}>
                        <NursingStation value={nurse} setValue={setNurse} />
                      </Box>
                    </Box>
                  </Paper>
                  <Box sx={{ mt: 1, width: { xl: '100%', lg: '100%', md: '100%', sm: '100%' } }}>
                    {table === 1 ? <ComplistAgGridcmp columnDefs={column} tableData={tabledata} /> : null}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </ThemeProvider>
        ) : closebtn === 1 ? (
          <Box
            sx={{
              pt: 1,
              flexDirection: { xl: 'row', lg: 'row', md: 'row', sm: 'column', xs: 'column' }
            }}
          >
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                alignContent: 'center',
                justifyContent: 'right',
                cursor: 'pointer'
              }}
            >
              <Box sx={{ dispaly: 'flex', width: { xl: '5%', lg: '5%', md: '10%', sm: '10%' } }}>
                <Tooltip title="Patient Survillance">
                  <CoPresentOutlinedIcon
                    onClick={patient}
                    variant="contained"
                    size="small"
                    color="#1a237e"
                  ></CoPresentOutlinedIcon>
                </Tooltip>
              </Box>
              <Box sx={{ dispaly: 'flex', width: { xl: '5%', lg: '5%', md: '10%', sm: '10%' } }}>
                <Tooltip title="Dialy Activity">
                  <WheelchairPickupIcon
                    onClick={Activity}
                    variant="contained"
                    size="small"
                    color="#1a237e"
                  ></WheelchairPickupIcon>
                </Tooltip>
              </Box>
              <Box sx={{ dispaly: 'flex', width: { xl: '5%', lg: '5%', md: '10%', sm: '10%' } }}>
                <Tooltip title="Bed Transfer">
                  <HotelOutlinedIcon
                    onClick={bedTracking}
                    variant="contained"
                    size="small"
                    color="#1a237e"
                  ></HotelOutlinedIcon>
                </Tooltip>
              </Box>
              <Box sx={{ dispaly: 'flex', width: { xl: '5%', lg: '5%', md: '10%', sm: '10%' } }}>
                <Tooltip title="Interaction">
                  <DifferenceOutlinedIcon
                    onClick={Interaction}
                    variant="contained"
                    size="small"
                    color="#1a237e"
                  ></DifferenceOutlinedIcon>
                </Tooltip>
              </Box>
              <Box sx={{ dispaly: 'flex', width: { xl: '5%', lg: '5%', md: '10%', sm: '10%' } }}>
                <Tooltip title="Discharge Event">
                  <FollowTheSignsTwoToneIcon
                    onClick={discharge}
                    variant="contained"
                    size="small"
                    color="#1a237e"
                  ></FollowTheSignsTwoToneIcon>
                </Tooltip>
              </Box>
            </Box>
            <Box>
              {checkIcon === 2 ? (
                <DailyactivityLazy ipno={ipno} setclosebtn={setclosebtn} />
              ) : checkIcon === 3 ? (
                <PatientIntractionLazy ipno={ipno} doa={doa} setclosebtn={setclosebtn} />
              ) : checkIcon === 4 ? (
                <BedTracking ipno={ipno} setclosebtn={setclosebtn} nsdesc={nsdesc} nurse={nurse} bedcode={bedcode} />
              ) : checkIcon === 5 ? (
                <DischargeEvent ipno={ipno} setclosebtn={setclosebtn} />
              ) : (
                <Card>
                  <PatientsurvillenceLazy
                    setclosebtn={setclosebtn}
                    ipno={ipno}
                    ptno={ptno}
                    name={name}
                    doa={doa}
                    docname={docname}
                    age={age}
                    mf={mf}
                    rmno={rmno}
                    submited={submited}
                    bedcode={bedcode}
                    nurse={nurse}
                    nsdesc={nsdesc}
                  />
                </Card>
              )}
            </Box>
          </Box>
        ) : (
          <PatSurvillenceViewLazy ipno={ipno} setclosebtn={setclosebtn} />
        )}
      </Card>
    </Fragment>
  )
}
export default memo(InPatientList)
