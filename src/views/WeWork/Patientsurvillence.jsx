import React, { useCallback, useState } from 'react'
import { Typography } from '@mui/material';
import { CssVarsProvider } from '@mui/joy';
import { Box, Paper } from '@mui/material'
import NursingStationMeliSelect from '../CommonSelectCode/NursingStationMeliSelect';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import CusCheckBox from '../Components/CusCheckBox';
import ComplaintCheckBox from '../ComManagement/ComplaintRegister/ComplaintCheckBox';
import BasicRoomAmenties from './BasicRoomAmenties';
import Patientservice from './Patientservice';


const Patientsurvillence = ({ ipno, ptno, name, age, docname, doa, mf, rmno }) => {
    // const [aa, setaa] = useState(0)


    const [bedtype, setbedtype] = useState(false)
    const [rmcat, setrmcat] = useState(false)
    const [modepay, setmodpay] = useState(false)
    const [pck, setpck] = useState(false)
    const [duser, setduser] = useState('')
    const [rstym, setrstym] = useState('')
    const [acrmt, setacrmt] = useState(false)
    const [tvrmt, settvrmt] = useState(false)
    const [tele, settele] = useState(false)
    const [gzr, setgzr] = useState(false)
    const [dv, setdv] = useState('')
    const [st, setst] = useState('')
    const [rt, setrt] = useState('')
    const [asn, setasn] = useState('')
    const [doc, setdoc] = useState('')
    const [cr, setcr] = useState('')
    const [sfa, setsfa] = useState('')
    const [remr, setremr] = useState('')
    const [shiffrom, setshiffrom] = useState(0)
    const [shiftto, setshiftto] = useState(0)

    const doduser = useCallback((e) => {
        setduser(e.target.value)
    }, [])
    const rstime = useCallback((e) => {
        setrstym(e.target.value)
    }, [])
    const getvist = useCallback((e) => {
        setdv(e.target.value)
    }, [])
    const getstat = useCallback((e) => {
        setst(e.target.value)
    }, [])
    const getrt = useCallback((e) => {
        setrt(e.target.value)
    }, [])
    const getasn = useCallback((e) => {
        setasn(e.target.value)
    }, [])
    const getdoc = useCallback((e) => {
        setdoc(e.target.value)
    }, [])
    const getcredit = useCallback((e) => {
        setcr(e.target.value)
    }, [])
    const getsfa = useCallback((e) => {
        setsfa(e.target.value)
    }, [])
    const getremark = useCallback((e) => {
        setremr(e.target.value)
    }, [])

    const getACRemote = useCallback((e) => {
        if (e.target.checked === true) {
            setacrmt(true)
        }
        else {
            setacrmt(false)
        }
    }, [])

    const getTvrmt = useCallback((e) => {
        if (e.target.checked === true) {
            settvrmt(true)
        }
        else {
            settvrmt(false)
        }
    }, [])

    const gettele = useCallback((e) => {
        if (e.target.checked === true) {
            settele(true)
        }
        else {
            settele(false)
        }
    }, [])

    const getgeezer = useCallback((e) => {
        if (e.target.checked === true) {
            setgzr(true)
        }
        else {
            setgzr(false)
        }
    }, [])

    const roomcategory = [{ rmslno: 1, rmname: "Normal " },
    { rmslno: 2, rmname: "AC" },
    { rmslno: 3, rmname: "AC Delux" },
    { rmslno: 4, rmname: "Suite" },
    { rmslno: 5, rmname: "VIP Suite" }

    ]

    const bed = [{ bdslno: 1, bdname: "Basic Bed" },
    { bdslno: 2, bdname: "Semi Flower" },
    { bdslno: 3, bdname: "Side Rail" },
    { bdslno: 4, bdname: "Bariatric Bed" },
    { bdslno: 5, bdname: "Electric Bed" },
    ]
    const payment = [
        { payno: 1, payname: "Cash" },
        { payno: 2, payname: "Insurance" },
        { payno: 3, payname: "Other Credit" },
    ]
    const pack = [{ pcno: 1, pcname: "yes" },
    { pcno: 2, pcname: "No" },
    { pcno: 3, pcname: "clearence from FIO" }
    ]
    return (
        < Box sx={{
            px: 1, pt: 1,
            flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" },

        }}
        >
            <Paper>
                <Paper sx={{ p: 2 }} >
                    <Paper>
                        <Box square elevation={3} sx={{
                            mt: 1,
                            pl: 3,
                            display: "flex",
                            width: { xl: "100%", lg: "100%", md: "100%" },
                            flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" },
                        }}
                        >
                            <Box sx={{
                                display: "flex",
                                flexDirection: { xl: "row", lg: "row", md: "row", sm: 'row', xs: "column" },
                                width: { xl: "50%", lg: "50%", md: "50%" }
                            }}>
                                <Box sx={{
                                    width: { xl: "50%", lg: "50%", md: "50%", sm: "60%" },
                                    display: 'flex',
                                }}>
                                    <Box sx={{ width: { xl: "30%", lg: "30%", md: "38%", sm: "30%" }, display: "flex", }}>
                                        <Typography>#MRD.No</Typography>
                                    </Box>
                                    <Box sx={{ width: { xl: "60%", lg: "70%", md: "50%", sm: "50%" }, height: 30 }}>
                                        <Typography>{ptno}</Typography>
                                    </Box>
                                </Box>
                                <Box sx={{
                                    width: { xl: "50%", lg: "50%", md: "31%", sm: "60%" },
                                    display: 'flex',
                                }}>
                                    <Box sx={{ width: { xl: "20%", lg: "25%", md: "50%", sm: "30%" } }}>
                                        <Typography>#IP.No</Typography>
                                    </Box>
                                    <Box sx={{ width: { xl: "60%", lg: "60%", md: "35%", sm: "50%" }, height: 30 }}>
                                        <Typography>{ipno}</Typography>
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{
                                display: "flex",
                                flexDirection: { xl: "row", lg: "row", md: "row", sm: 'row', xs: "column" },
                                width: { xl: "50%", lg: "50%", md: "50%" }
                            }}>
                                <Box sx={{
                                    width: { xl: "50%", lg: "50%", md: "60%", sm: "60%" },
                                    display: 'flex'
                                }}>
                                    <Box sx={{ width: { xl: "25%", lg: "20%", md: "30%", sm: "30%" } }}>
                                        <Typography>Name</Typography>
                                    </Box>
                                    <Box sx={{ width: { xl: "60%", lg: "60%", md: "70%", sm: "50%" }, height: 30, display: "flex" }}>
                                        <Typography>{name}</Typography>

                                    </Box>
                                </Box>
                                <Box sx={{ width: { xl: "50%", lg: "50%", md: "50%", sm: "60%" }, display: 'flex', }} >
                                    <Box sx={{ width: { xl: "15%", lg: "20%", md: "30%", sm: "30%" } }}>
                                        <Typography>Age</Typography>
                                    </Box>
                                    <Box sx={{ width: { xl: "60%", lg: "60%", md: "50%", sm: "50%" }, height: 30 }}>
                                        <Typography>{age}</Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{
                            display: "flex",
                            flexDirection: 'row',
                            justifyContent: "space-between",
                            px: 3,
                            pt: 1,

                            width: { xl: "100%", lg: "100%", md: "100%", sm: "100%" },
                        }}>
                            <Box sx={{
                                display: "flex",
                                width: { xl: "50%", lg: "50%", md: "51%", sm: "50%" },
                                flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" }

                            }}>
                                <Box sx={{ width: { xl: "50%", lg: "50%", md: "51%", sm: "50%" }, display: 'flex', }}>
                                    <Box sx={{ width: { xl: "30%", lg: "30%", md: "40%", sm: "62%" } }}>
                                        <Typography>Sex</Typography>
                                    </Box>
                                    <Box sx={{ width: { xl: "50%", lg: "60%", md: "60%", sm: "30%" }, height: 30, }}>
                                        <Typography>
                                            {mf}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box sx={{ width: { xl: "50%", lg: "50%", md: "49%", sm: "50%" }, display: 'flex', }} >
                                    <Box sx={{ width: { xl: "21%", lg: "27%", md: "34%", sm: "60%" } }}>
                                        <Typography>Room</Typography>
                                    </Box>
                                    <Box sx={{ width: { xl: "70%", lg: "70%", md: "60%", sm: "40%" }, height: 30 }}>
                                        <Typography>{rmno}</Typography>
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{
                                dispaly: "flex",
                                width: { xl: "50%", lg: "50%", md: "48%", sm: "49%" }
                            }}>
                                <Box sx={{ width: { xl: "90%", lg: "49%", md: "40%", sm: "100%" }, display: 'flex', }}>
                                    <Box sx={{ width: { xl: "15%", lg: "40%", md: "50%", sm: "30%" } }}>
                                        <Typography>Cousultant</Typography>
                                    </Box>
                                    <Box sx={{ width: { xl: "60%", lg: "60%", md: "50%", sm: "60%" }, height: 30, }}>
                                        <Typography>{docname}</Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{
                            display: "flex",
                            flexDirection: 'row',
                            justifyContent: "space-evenly",
                            pt: 1,
                            width: { xl: "50%", lg: "60%", md: "100%", sm: "100%" },
                        }}>
                            <Box sx={{
                                width: { xl: "45%", lg: "39%", md: "45%", sm: "45%" },
                                display: 'flex',
                            }}>
                                <Box sx={{ width: { xl: "30%", lg: "30%", md: "18%", sm: "34%" } }}>
                                    <Typography>DOA</Typography>
                                </Box>
                                <Box sx={{ width: { xl: "50%", lg: "70%", md: "70%", sm: "80%" }, height: 30 }}>
                                    <Typography>{doa}</Typography>
                                </Box>
                            </Box>
                            <Box sx={{ width: { xl: "45%", lg: "53%", md: "47%", sm: "45%" }, display: 'flex', }}>
                                <Box sx={{ width: { xl: "20%", lg: "15%", md: "24%", sm: "20%" } }}>
                                    <Typography>DOD</Typography>
                                </Box>
                                <Box sx={{ width: { xl: "50%", lg: "60%", md: "60%", sm: "50%" }, height: 40, pb: 2 }}>
                                    <TextFieldCustom
                                        size="sm"
                                        type="datetime-local"
                                        placeholder="date of discharge"
                                        name="duser"
                                        value={duser}
                                        onchange={doduser}
                                    />
                                </Box>
                            </Box>
                        </Box>
                    </Paper>
                </Paper>
                <Paper square elevation={3} sx={{ p: 2 }}>
                    <Paper>
                        <Box sx={{ py: 0.5 }}>
                            <CssVarsProvider>
                                <Typography sx={{ fontStyle: "oblique", fontWeight: 500, color: '#94B7FC' }} startdecorator={<ArrowRightOutlinedIcon />} >
                                    Patient Encounter Information
                                </Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{
                            px: 1, mt: 0.3,
                            display: "flex"
                        }}>
                            <Box sx={{
                                display: 'flex', width: { xl: "100%", lg: "100%", md: "100%", sm: "100%" },
                                flexDirection: { xl: "row", lg: "row", md: "column", sm: 'column', xs: "column" }
                            }}><Box sx={{
                                display: "flex",
                                width: { xl: "60%", lg: "60%", md: "100%", sm: "100%" },
                                justifyContent: "space-between"
                            }}>
                                    <Box sx={{ display: 'flex', width: { xl: "50%", lg: "50%", md: "50%", sm: "45%" } }}>
                                        <Box sx={{ display: 'flex', width: { xl: "20%", lg: "30%", md: "25%", sm: "40%" } }}>
                                            <CssVarsProvider><Typography>Shift from </Typography> </CssVarsProvider></Box>
                                        <Box sx={{ width: { xl: "60%", lg: "60%", md: "60%", sm: "60%" } }}>
                                            <NursingStationMeliSelect value={shiffrom} setValue={setshiffrom} />
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: 'flex', width: { xl: "50%", lg: "50%", md: "50%", sm: "50%" } }}>
                                        <Box sx={{ display: 'flex', width: { xl: "20%", lg: "30%", md: "25%", sm: "40%" } }}>
                                            <CssVarsProvider><Typography>Shift to </Typography> </CssVarsProvider></Box>

                                        <Box sx={{ width: { xl: "60%", lg: "60%", md: "60%", sm: "50%" } }}>
                                            <NursingStationMeliSelect value={shiftto} setValue={setshiftto} />
                                        </Box>
                                    </Box>
                                </Box>
                                <Box sx={{
                                    display: "flex",
                                    width: { xl: "40%", lg: "40%", md: "40%", sm: "100%", },
                                    pt: 1
                                }}>
                                    <Box sx={{ display: 'flex', width: { xl: "100%", lg: "100%", md: "100%", sm: "100%" }, }}>
                                        <Box sx={{ display: 'flex', width: { xl: "35%", lg: "50%", md: "50%", sm: "25%" } }}>
                                            <Typography>Received date & time </Typography></Box>
                                        <Box sx={{ display: 'flex', width: { xl: "60%", lg: "50%", md: "50%", sm: "30%" } }}>
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
                            </Box>
                        </Box>
                        <Box sx={{ p: 2 }} >
                            <Box sx={{ display: "flex", flexDirection: "row", width: "100%" }}>
                                <Box sx={{ width: "16.5%", pt: 0.5 }}  >
                                    <CssVarsProvider>
                                        <Typography> Room category</Typography>
                                    </CssVarsProvider>
                                </Box>
                                {/* <WeworkRoomCategory /> */}
                                <Box variant="outlined" square sx={{
                                    px: 2, pr: 2,
                                    display: "flex",
                                    textTransform: 'capitalize',
                                    flexDirection: { xl: "row", lg: "row", md: "row", sm: 'row', xs: "column" },
                                    justifyContent: "space-between",
                                    width: { xl: "100%", lg: "100%", md: "100%", sm: "100%" }
                                }}  >
                                    {
                                        roomcategory && roomcategory.map((val, index) => {
                                            return <Box sx={{
                                                pt: 1, pb: 1,
                                                justifyContent: 'space-between',
                                                // width: "100%",
                                                width: { xl: "100%", lg: "100%", md: "100%" }
                                            }}
                                                key={val.rmslno}
                                            >
                                                <ComplaintCheckBox
                                                    label={val.rmname.toLowerCase()}
                                                    name={val.rmname}
                                                    value={val.rmname}
                                                    onChange={setrmcat}
                                                    checkedValue={rmcat}
                                                />
                                            </Box>
                                        })
                                    }
                                </Box>
                            </Box>
                        </Box>
                    </Paper>
                </Paper>
                <Paper square elevation={3} sx={{ p: 2 }}>
                    <Box sx={{ py: 0.5 }}>
                        <CssVarsProvider>
                            <Typography sx={{ fontStyle: "oblique", fontWeight: 500, color: '#94B7FC' }} startdecorator={<ArrowRightOutlinedIcon />} >
                                Facilities provided
                            </Typography>
                        </CssVarsProvider>
                    </Box>
                    <Paper sx={{ p: 2 }} >
                        <Box sx={{ display: "flex", flexDirection: "row", width: "100%" }}>
                            <Box sx={{ width: "14%" }}  >
                                <CssVarsProvider>
                                    <Typography> Bed</Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box variant="outlined" square sx={{
                                px: 2, pr: 2,
                                display: "flex",
                                textTransform: 'capitalize',
                                flexDirection: { xl: "row", lg: "row", md: "row", sm: 'row', xs: "column" },
                                justifyContent: "space-between",
                                width: { xl: "90%", lg: "90%", md: "90%", sm: "100%" },
                            }}  >
                                {
                                    bed && bed.map((val, index) => {
                                        return <Box sx={{
                                            pt: 1, pb: 1, pl: 1,
                                            justifyContent: 'space-between',
                                            // width: "100%",
                                            width: { xl: "100%", lg: "100%", md: "100%" }
                                        }}
                                            key={val.bdslno}
                                        >
                                            <ComplaintCheckBox
                                                label={val.bdname.toLowerCase()}
                                                name={val.bdname}
                                                value={val.bdname}
                                                onChange={setbedtype}
                                                checkedValue={bedtype}
                                            />
                                        </Box>
                                    })
                                }
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "row", width: "100%" }}>
                            <Box sx={{ width: "16.5%" }}  >
                                <CssVarsProvider>
                                    <Typography>Remote</Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ display: "flex", flexDirection: "row", width: "80%" }}>
                                <Box sx={{ width: "20%" }}>
                                    <CusCheckBox
                                        variant="outlined"
                                        color="success"
                                        size="md"
                                        name="acrmt"
                                        label="AC"
                                        value={acrmt}
                                        onCheked={getACRemote}
                                        checked={acrmt}
                                    />
                                </Box>
                                <Box sx={{ width: "20%" }}>
                                    <CusCheckBox
                                        variant="outlined"
                                        color="success"
                                        size="md"
                                        name="TV"
                                        label="TV"
                                        value={tvrmt}
                                        onCheked={getTvrmt}
                                        checked={tvrmt}
                                    />
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', width: "100%", pt: 1 }}>
                            <Box sx={{ display: 'flex', width: "40%" }}>
                                <Box sx={{ display: 'flex', width: "41%" }}>
                                    <CssVarsProvider>    <Typography>Telephone </Typography> </CssVarsProvider></Box>
                                <Box sx={{ display: 'flex', width: "50%" }}>
                                    <CusCheckBox
                                        variant="outlined"
                                        color="success"
                                        size="md"
                                        name="tele"
                                        label="yes"
                                        value={tele}
                                        onCheked={gettele}
                                        checked={tele}
                                    />
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', width: "40%", pt: 1 }}>
                            <Box sx={{ display: 'flex', width: "41%", }}>
                                <CssVarsProvider><Typography>Geezer </Typography> </CssVarsProvider></Box>
                            <Box sx={{ display: 'flex', width: "50%" }}>
                                <CusCheckBox
                                    variant="outlined"
                                    color="success"
                                    size="md"
                                    name="gzr"
                                    label="yes"
                                    value={gzr}
                                    onCheked={getgeezer}
                                    checked={gzr}
                                />
                            </Box>
                        </Box>
                    </Paper>
                </Paper>
                <Paper square elevation={3} sx={{ p: 2 }}>
                    <Box sx={{ py: 0.5 }}>
                        <CssVarsProvider>
                            <Typography sx={{ fontStyle: "oblique", fontWeight: 500, color: '#94B7FC' }} startdecorator={<ArrowRightOutlinedIcon />} >
                                Basic Room amentities
                            </Typography>
                        </CssVarsProvider>
                    </Box>
                    <Paper sx={{ display: "flex", pl: 1, pt: 1 }}>
                        <BasicRoomAmenties />
                    </Paper>
                </Paper>
                <Paper square elevation={3} sx={{ p: 2 }}>
                    <Box sx={{ display: "flex", flexDirection: "row", width: "100%" }}>
                        <Box sx={{ py: 0.5 }}>
                            <CssVarsProvider>
                                <Typography sx={{ fontStyle: "oblique", fontWeight: 500, color: '#94B7FC' }} startdecorator={<ArrowRightOutlinedIcon />} >
                                    Primary Patient service
                                </Typography>
                            </CssVarsProvider>
                        </Box>
                    </Box>
                    <Paper sx={{ p: 2 }}>
                        <Box sx={{ pb: 1 }}>
                            <Patientservice />
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "row" }}>
                            <Box sx={{ display: 'flex', width: "50%", justifyContent: "start" }}>
                                <Box sx={{ display: 'flex', width: "30%", }}>
                                    <CssVarsProvider>    <Typography>Dietition visit time </Typography> </CssVarsProvider></Box>
                                <Box sx={{ display: 'flex', width: "40%", pl: 3 }}>
                                    <TextFieldCustom
                                        size="sm"
                                        type="time"
                                        name="dv"
                                        value={dv}
                                        onchange={getvist}
                                    />
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", flexDirection: "row", width: "50%" }}>
                                <Box sx={{ display: 'flex', width: "30%", }}>
                                    <CssVarsProvider>    <Typography>STAT Medicine indent time</Typography> </CssVarsProvider></Box>
                                <Box sx={{ display: 'flex', width: "40%", pl: 3 }}>
                                    <TextFieldCustom
                                        size="sm"
                                        type="time"
                                        name="st"
                                        value={st}
                                        onchange={getstat}
                                    />
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', width: "100%", justifyContent: "start", pt: 1 }}>
                            <Box sx={{ display: "flex", width: "50%" }}>
                                <Box sx={{ display: 'flex', width: "30%", }}>
                                    <CssVarsProvider><Typography>Received time</Typography> </CssVarsProvider></Box>
                                <Box sx={{ display: 'flex', width: "40%", pl: 3 }}>
                                    <TextFieldCustom
                                        size="sm"
                                        type="time"
                                        name="rt"
                                        value={rt}
                                        onchange={getrt}
                                    />
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", width: "50%", }}>
                                <Box sx={{ display: 'flex', width: "30%", }}>
                                    <CssVarsProvider>    <Typography>Assigned nursing staff</Typography> </CssVarsProvider></Box>
                                <Box sx={{ display: 'flex', width: "40%", pl: 3 }}>
                                    <TextFieldCustom
                                        size="sm"
                                        type="text"
                                        name="asn"
                                        value={asn}
                                        onchange={getasn}
                                    />
                                </Box>
                            </Box>
                        </Box>
                    </Paper>
                </Paper>
                <Paper square elevation={3} sx={{ p: 2 }}>
                    <Box sx={{ display: "flex", flexDirection: "row", width: "100%" }}>
                        <Box sx={{ py: 0.5 }}>
                            <CssVarsProvider>
                                <Typography sx={{ fontStyle: "oblique", fontWeight: 500, color: '#94B7FC' }} startdecorator={<ArrowRightOutlinedIcon />} >
                                    Financial Perspective
                                </Typography>
                            </CssVarsProvider>
                        </Box>
                    </Box>
                    <Paper sx={{ p: 2 }}>
                        <Box sx={{ display: "flex", flexDirection: "row", width: "100%" }}>
                            <Box sx={{ width: "16.5%" }}  >
                                <CssVarsProvider>
                                    <Typography> Mode of Payment:</Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box variant="outlined" square sx={{
                                px: 4.5, pr: 2,
                                display: "flex",
                                textTransform: 'capitalize',
                                flexDirection: { xl: "row", lg: "row", md: "row", sm: 'row', xs: "column" },
                                justifyContent: "space-between",
                                width: { xl: "100%", lg: "100%", md: "100%", sm: "100%" }
                            }}  >
                                {
                                    payment && payment.map((val, index) => {
                                        return <Box sx={{
                                            pt: 1, pb: 1,
                                            justifyContent: 'space-between',
                                            // width: "100%",
                                            width: { xl: "100%", lg: "100%", md: "100%", sm: "100%" }
                                        }}
                                            key={val.payno}
                                        >
                                            <ComplaintCheckBox
                                                label={val.payname.toLowerCase()}
                                                name={val.payname}
                                                value={val.payname}
                                                onChange={setmodpay}
                                                checkedValue={modepay}
                                            />
                                        </Box>
                                    })
                                }
                            </Box>
                        </Box>
                        <Box sx={{
                            display: "flex", flexDirection: "row", width: "100%", justifyContent: "start", pt: 1
                        }}>
                            <Box sx={{ width: "16.5%" }
                            } >
                                <CssVarsProvider>
                                    <Typography>Document Status(if any)</Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ display: 'flex', width: "70%" }}>
                                <TextFieldCustom
                                    size="sm"
                                    type="text"
                                    name="doc"
                                    value={doc}
                                    onchange={getdoc}
                                />
                            </Box>
                        </Box>
                        <Box sx={{
                            display: "flex", flexDirection: "row", width: "100%", justifyContent: "start", pt: 1
                        }}>
                            <Box sx={{ width: "16.5%" }
                            } >
                                <CssVarsProvider>
                                    <Typography>Details if Credit</Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ display: 'flex', width: "40%", }}>
                                <TextFieldCustom
                                    size="sm"
                                    type="text"
                                    name="cr"
                                    value={cr}
                                    onchange={getcredit}
                                />
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "row", width: "100%", pt: 1 }}>
                            <Box sx={{ width: "16.5%" }}  >
                                <CssVarsProvider>
                                    <Typography> Package</Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box variant="outlined" square sx={{
                                px: 4.5, pr: 2,
                                display: "flex",
                                textTransform: 'capitalize',
                                flexDirection: { xl: "row", lg: "row", md: "row", sm: 'row', xs: "column" },
                                justifyContent: "space-between",
                                width: { xl: "100%", lg: "100%", md: "100%", sm: "100%" }
                            }}  >
                                {
                                    pack && pack.map((val, index) => {
                                        return <Box sx={{
                                            pt: 1, pb: 1,
                                            justifyContent: 'space-between',
                                            // width: "100%",
                                            width: { xl: "100%", lg: "100%", md: "100%", sm: "100%" }
                                        }}
                                            key={val.pcno}
                                        >
                                            <ComplaintCheckBox
                                                label={val.pcname.toLowerCase()}
                                                name={val.pcname}
                                                value={val.pcname}
                                                onChange={setpck}
                                                checkedValue={pck}
                                            />
                                        </Box>
                                    })
                                }
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "row", width: "100%", pt: 1 }}>
                            <Box sx={{ width: "16.5%" }}  >
                                <CssVarsProvider>
                                    <Typography>SFA/MFA</Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ display: "flex", flexDirection: "row", width: "80%" }}>
                                <Box sx={{ width: "30%" }}>
                                    <TextFieldCustom
                                        size="sm"
                                        type="text"
                                        name="sfa"
                                        value={sfa}
                                        onchange={getsfa}
                                    />
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "row", width: "100%", pt: 1 }}>
                            <Box sx={{ width: "16.5%" }}  >
                                <CssVarsProvider>
                                    <Typography>Remarks</Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ display: "flex", flexDirection: "row", width: "80%" }}>
                                <Box sx={{ width: "80%" }}>
                                    <TextFieldCustom
                                        size="sm"
                                        type="text"
                                        name="remr"
                                        value={remr}
                                        onchange={getremark}
                                    />
                                </Box>
                            </Box>
                        </Box>
                    </Paper>
                </Paper>
            </Paper>
        </Box >
    )
}

export default Patientsurvillence