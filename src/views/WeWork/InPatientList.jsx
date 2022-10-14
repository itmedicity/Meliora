import React, { Fragment, useCallback, useEffect, useState } from 'react'
import CusAgGridMast from 'src/views/Components/CusAgGridMast';
import NextPlanIcon from '@mui/icons-material/NextPlan';
import { axioslogin } from 'src/views/Axios/Axios';
import { infoNotify, warningNotify } from 'src/views/Common/CommonCode';
import { IconButton } from '@mui/material';
import { editicon } from 'src/color/Color';
import { Box, Paper } from '@mui/material'
import CardMaster from '../Components/CardMaster';
import { useHistory } from 'react-router-dom';
import NursingStationMeliSelect from '../CommonSelectCode/NursingStationMeliSelect';
import Patientsurvillence from './Patientsurvillence';
import Button from '@mui/material/Button';


const InPatientList = () => {
    const [aa, setaa] = useState(0)
    const history = useHistory();
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

    // const yy = {
    //     ip_no: ipno,
    //     pt_no: ptno,
    //     ptc_ptname: name,
    //     DOA: doa,
    //     doc_name: docname,
    //     rmc_desc: rmno,
    //     age: age,
    //     DOD: dod,
    //     ptc_sex: mf
    // }
    const gotoform = useCallback((params) => {
        setaa(1)
        const dataa = params.api.getSelectedRows()
        const { ip_no, pt_no, ptc_ptname, doc_name, DOA, rmc_desc, age, ptc_sex } = dataa[0]
        setname(ptc_ptname)
        setipno(ip_no)
        setptno(pt_no)
        setdoa(DOA)
        setdocname(doc_name)
        setrmno(rmc_desc)
        setage(age)
        // setdod(DOD)
        setmf(ptc_sex)

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
    const backtoSetting = useCallback(() => {
        history.push('/Home/Settings')
    }, [history])


    const [cc, setcc] = useState(0)
    const patient = (e) => {

        setcc(1)

    }

    const Activity = (e) => {

        setcc(2)

    }

    const Interaction = (e) => {

        setcc(3)

    }


    return (
        <Fragment>
            <CardMaster
                title="In Patient List"
                close={backtoSetting}
            >
                {
                    aa === 0 ?
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
                                    <Box sx={{ width: "25%", pr: 1, mt: 1 }}                            >
                                        <Paper >
                                            <NursingStationMeliSelect value={nurse} setValue={setNurse} />
                                        </Paper>
                                    </Box>
                                </Box>
                            </Paper>
                            <Box sx={{ mt: 1 }}>
                                {
                                    table === 1 ? <CusAgGridMast
                                        columnDefs={column}
                                        tableData={tabledata}
                                    /> : null
                                }
                            </Box>

                        </Box>
                        :


                        <Box sx={{
                            px: 1, pt: 1,
                            flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" },

                        }}>
                            <Box sx={{
                                display: "flex",
                                width: "100%",
                                alignContent: "center",

                                // justifyContent: "space-evenly"
                                justifyContent: "right"
                            }}>
                                <Box sx={{ dispaly: "flex", width: { xl: '13%', lg: "20%", md: "20%", sm: "25%" } }}>
                                    <Button onClick={patient} variant="contained" size="small" color="primary">Patient Survillance</Button>
                                </Box>
                                <Box sx={{ dispaly: "flex", width: { xl: '10%', lg: "20%", md: "15%", sm: "19%" } }}>
                                    <Button onClick={Activity} variant="contained" size="small" color="primary">Dialy Activity</Button>
                                </Box>
                                <Box sx={{ dispaly: "flex", width: { xl: '13%', lg: "20%", md: "15%", sm: "20%" } }}>
                                    <Button onClick={Interaction} variant="contained" size="small" color="primary">Interaction</Button>
                                </Box>
                                {/* <Patientsurvillence
                                    ipno={ipno} ptno={ptno} name={name} doa={doa} docname={docname}
                                    age={age} mf={mf} rmno={rmno} /> */}
                            </Box>



                            <Box>
                                {
                                    cc === 1 ? <Patientsurvillence
                                        ipno={ipno} ptno={ptno} name={name} doa={doa} docname={docname}
                                        age={age} mf={mf} rmno={rmno} /> : null


                                    // <Dailyactivity />
                                }
                            </Box>
                        </Box>
                }
            </CardMaster >
        </Fragment >
    )
}
export default InPatientList