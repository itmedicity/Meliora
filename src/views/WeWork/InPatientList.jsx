import React, { Fragment, useCallback, useEffect, useState } from 'react'
import CusAgGridMast from 'src/views/Components/CusAgGridMast';
import NextPlanIcon from '@mui/icons-material/NextPlan';
import { axioslogin } from 'src/views/Axios/Axios';
import { infoNotify, warningNotify } from 'src/views/Common/CommonCode';
import { IconButton } from '@mui/material';
import { editicon } from 'src/color/Color';
import { Box, Paper } from '@mui/material'
import { Tooltip } from '@material-ui/core';
import NaturePeopleSharpIcon from '@mui/icons-material/NaturePeopleSharp';
import CoPresentOutlinedIcon from '@mui/icons-material/CoPresentOutlined';
import DifferenceOutlinedIcon from '@mui/icons-material/DifferenceOutlined';
import { Card, CardContent, ThemeProvider } from '@mui/material';
import CustomCardHeaderOne from '../Components/CustomCardHeaderOne';
import theme from '../Components/MuiTheme';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
const NursingStation = React.lazy(() => import('../CommonSelectCode/NursingStationMeliSelect'))
const DailyactivityLazy = React.lazy(() => import('./DailyActivity/Dailyactivity'))
const PatientIntractionLazy = React.lazy(() => import('./PatirntIntraction/PatientIntraction'))
const PatientsurvillenceLazy = React.lazy(() => import('./Patienntsurvillence/Patientsurvillence'))
const PatSurvillenceViewLazy = React.lazy(() => import('./Patienntsurvillence/PatSurvillenceView'))




const InPatientList = ({ close, refresh, submit }) => {

    const [tabledata, setTabledata] = useState([])
    const [nurse, setNurse] = useState(0);
    const [table, setTable] = useState(0);
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
    const history = useHistory()

    const [column] = useState([

        { headerName: "IP No", field: "ip_no" },
        { headerName: "OP No", field: "pt_no" },
        { headerName: "Name", field: "ptc_ptname" },
        { headerName: "Age", field: "age" },
        { headerName: "Doctor", field: "doc_name" },
        { headerName: "Room", field: "rmc_desc" },
        { headerName: "DOA", field: "DOA" },
        {
            headerName: 'Action', cellRenderer: params => <IconButton
                sx={{ color: editicon, paddingY: 0.5 }}
                onClick={() => gotoform(params)}>
                <NextPlanIcon />
            </IconButton>
        }
    ])
    const [closebtn, setclosebtn] = useState(0)
    const gotoform = useCallback((params) => {
        // setflag(1)
        setclosebtn(1)
        const dataa = params.api.getSelectedRows()
        const { ip_no, pt_no, ptc_ptname, doc_name, DOA, rmc_desc, age, ptc_sex, bd_code } = dataa[0]
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

    }, [])

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
                }
                else {
                    warningNotify("Error occured contact EDP")
                }
            }
        }
        getPatientList();
    }, [nurse])

    //close button function
    const backtoSetting = () => {
        history.push('/Home/WeWork/InpatientList')
    }


    const patient = (e) => {
        setcheckIcon(1)
    }

    const Activity = (e) => {
        setcheckIcon(2)
    }

    const Interaction = (e) => {
        setcheckIcon(3)
    }

    const submited = useCallback((insertdata) => {
        const insert = (insertdata) => {

        }
        if ((checkIcon === 1) || (checkIcon === 0)) {

            insert(insertdata)
        }
    }, [checkIcon])


    return (
        <Fragment>
            {
                closebtn === 0 ? <ThemeProvider theme={theme} >
                    <Card sx={{ borderRadius: 0, boxShadow: 1 }}>
                        <CustomCardHeaderOne
                            title="In Pateint List"
                            onClickClose={backtoSetting}
                            cardStyle={{}}
                        />
                        <CardContent sx={{ p: 0 }} >

                            <Box sx={{ width: "100%", pl: 1, pt: 1, pr: 1, pb: 1 }}>
                                <Paper square elevation={3} sx={{
                                    pl: 1, pt: 1, pr: 1, pb: 1
                                }}>
                                    <Box sx={{
                                        width: "100%",
                                        pl: 1, pt: 0.5, pr: 1, pb: 0.5,
                                        display: "flex",
                                        justifyContent: 'center',
                                        flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" },
                                    }}>
                                        <Box sx={{ width: { xl: "25%", lg: "25%", md: "30%", sm: "40%" }, pr: 1, mt: 1 }}                            >
                                            <Paper >
                                                <NursingStation value={nurse} setValue={setNurse} />
                                            </Paper>
                                        </Box>
                                    </Box>
                                </Paper>
                                <Box sx={{ mt: 1, width: { xl: "100%", lg: "100%", md: "100%", sm: "100%" } }}>
                                    {
                                        table === 1 ? <CusAgGridMast
                                            columnDefs={column}
                                            tableData={tabledata}
                                        /> : null
                                    }
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </ThemeProvider> : closebtn === 1 ?
                    <Box sx={{
                        pt: 1,
                        flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" },

                    }}>


                        <Box sx={{
                            display: "flex",
                            width: "100%",
                            alignContent: "center",
                            justifyContent: "right",
                            cursor: 'pointer'
                        }}>


                            <Box sx={{ dispaly: "flex", width: { xl: '5%', lg: "5%", md: "5%", sm: "5%" } }}>
                                <Tooltip title="Patient Survillance" >
                                    <CoPresentOutlinedIcon onClick={patient} variant="contained" size="small" color="#1a237e"></CoPresentOutlinedIcon>
                                </Tooltip>
                            </Box>
                            <Box sx={{ dispaly: "flex", width: { xl: '5%', lg: "5%", md: "5%", sm: "5%" } }}>
                                <Tooltip title="Dialy Activity" >
                                    <NaturePeopleSharpIcon onClick={Activity} variant="contained" size="small" color="#1a237e"></NaturePeopleSharpIcon>
                                </Tooltip>
                            </Box>
                            <Box sx={{ dispaly: "flex", width: { xl: '5%', lg: "5%", md: "5%", sm: "5%" } }}>
                                <Tooltip title="Interaction" >
                                    <DifferenceOutlinedIcon onClick={Interaction} variant="contained" size="small" color="#1a237e"></DifferenceOutlinedIcon>
                                </Tooltip>
                            </Box>

                        </Box>
                        <Box>
                            {
                                checkIcon === 2 ?
                                    <DailyactivityLazy ipno={ipno} setclosebtn={setclosebtn} />

                                    :
                                    checkIcon === 3 ?
                                        <PatientIntractionLazy ipno={ipno} doa={doa} setclosebtn={setclosebtn} />
                                        :
                                        <PatientsurvillenceLazy
                                            setclosebtn={setclosebtn}
                                            ipno={ipno} ptno={ptno} name={name} doa={doa} docname={docname}
                                            age={age} mf={mf} rmno={rmno} submited={submited} bedcode={bedcode} />

                            }
                        </Box>
                    </Box>
                    : <PatSurvillenceViewLazy ipno={ipno} setclosebtn={setclosebtn} />
            }



        </Fragment >
    )
}
export default InPatientList
