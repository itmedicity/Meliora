import { Paper } from '@material-ui/core'
import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect } from 'react'
import { CssVarsProvider } from '@mui/joy'
import NursingStationMeliSelect from 'src/views/CommonSelectCode/NursingStationMeliSelect'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import { useState } from 'react'
import { useCallback } from 'react'
import BasicRoomAmenties from '../Patienntsurvillence/BasicRoomAmenties'
import { useMemo } from 'react'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import CustomeToolTip from '../../Components/CustomeToolTip';
import CusIconButton from '../../Components/CusIconButton';
import CloseIcon from '@mui/icons-material/Close';
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import moment from 'moment'
import BedTrackingTable from './BedTrackingTable'


const BedTracking = ({ setclosebtn, ipno, nurse }) => {
    const [nurstation, setnurstation] = useState(0)
    const [tranDate, settranDate] = useState('')
    const [counstatus, setcounstatus] = useState('')
    const [sfa, setmfa] = useState('')
    const [id, setid] = useState(0)
    const [room, setroom] = useState('')
    const [Indate, setIndate] = useState('')
    const [remark, setremark] = useState('')
    const [value, setValue] = useState(0)
    const [count, setcount] = useState(0)
    const [tranFrom, setTranFrom] = useState(0)
    const [bedtransfer, setbedtransfer] = useState({
        trasf_slno: ''
    })
    const { trasf_slno } = bedtransfer


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
        mat: false
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
    }, [ameties.sofaa, ameties.chair, ameties.card, ameties.almirah, ameties.cup, ameties.arm, ameties.kit, ameties.bin,
    ameties.wood, ameties.tab, ameties.mat])


    const getDate = useCallback((e) => {
        settranDate(e.target.value)
    }, [])
    const getStatus = useCallback((e) => {
        setcounstatus(e.target.value)
    }, [])
    const getsfa = useCallback((e) => {
        setmfa(e.target.value)
    }, [])
    const getroom = useCallback((e) => {
        setroom(e.target.value)
    }, [])
    const getindate = useCallback((e) => {
        setIndate(e.target.value)
    }, [])
    const getremark = useCallback((e) => {
        setremark(e.target.value)
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
            mat: false
        }
    }, [])


    const reset = useCallback(() => {
        setnurstation(0)
        settranDate('')
        setcounstatus('')
        setmfa('')
        setroom('')
        setIndate('')
        setremark('')
        setamenties(resetamenties)
        setTranFrom(0)

    }, [resetamenties])


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
            }
            else {
                warningNotify("please complete the survillence sheet")
            }
        }
        getsurvno();
    }, [ipno])
    const postdata = useMemo(() => {
        return {
            bed_trans_surv_slno: id,
            trasfer_to: nurstation !== 0 ? nurstation : null,
            transfer_from: tranFrom,
            transfer_time: tranDate !== '' ? moment(tranDate).format('YYYY-MM-DD hh:mm:ss') : null,
            counseling_status: counstatus,
            sfa_mfa_clearence: sfa,
            room_amenties: roomamenties,
            bystander_room_retain: room,
            transfer_in_time: Indate !== '' ? moment(Indate).format('YYYY-MM-DD hh:mm:ss') : null,
            remarks: remark !== '' ? remark : null,
            ip_no: ipno
        }
    }, [id, nurstation, tranDate, counstatus, sfa, roomamenties, room, Indate, remark, tranFrom, ipno])



    const Patchdata = useMemo(() => {
        return {
            trasfer_to: nurstation,
            transfer_time: tranDate !== '' ? moment(tranDate).format('YYYY-MM-DD hh:mm:ss') : null,
            counseling_status: counstatus,
            sfa_mfa_clearence: sfa,
            room_amenties: roomamenties,
            bystander_room_retain: room,
            transfer_in_time: Indate !== '' ? moment(Indate).format('YYYY-MM-DD hh:mm:ss') : null,
            remarks: remark !== '' ? remark : null,
            trasf_slno: trasf_slno
        }
    }, [nurstation, tranDate, counstatus, sfa, roomamenties, room, Indate, remark, trasf_slno])


    const rowSelect = useCallback((params) => {
        setValue(1)
        const data = params.api.getSelectedRows()
        const { trasf_slno, trasfer_to, transfer_from, transfer_time, counseling_status, sfa_mfa_clearence, bystander_room_retain,
            transfer_in_time, remarks, room_amenties } = data[0]
        const formdata = {
            trasf_slno: trasf_slno,

        }

        const obj1 = JSON.parse(room_amenties)
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
        setbedtransfer(formdata)
        setnurstation(trasfer_to)
        settranDate(transfer_time !== 'not updated' ? transfer_time : '')
        setcounstatus(counseling_status !== 'not updated' ? counseling_status : '')
        setmfa(sfa_mfa_clearence !== 'not updated' ? sfa_mfa_clearence : '')
        setroom(bystander_room_retain !== 'not updated' ? bystander_room_retain : '')
        setIndate(transfer_in_time !== 'not updated' ? transfer_in_time : '')
        setremark(remarks !== 'not updated' ? remarks : '')
        setamenties(v)
        setTranFrom(transfer_from)

    }, [])


    const submit = useCallback((e) => {
        e.preventDefault();

        const updateData = async (Patchdata) => {
            const results = await axioslogin.patch(`/WeWork/updatebedTrack`, Patchdata)
            const { message, success } = results.data;
            if (success === 2) {
                succesNotify(message)
                setcount(count + 1)
                setValue(0)
                reset();
            }
            else if (success === 1) {
                infoNotify(message)
            }
            else {
                infoNotify(message)
            }
        }




        const InsertData = async (postdata) => {

            const shift = {
                transfer_from: nurse,
                trasfer_to: nurstation,
                bed_trans_surv_slno: id
            }

            const result = await axioslogin.post('/WeWork/bedtranSlno', shift)
            const { success, data } = result.data
            if (success === 1) {
                const { trasf_slno } = data[0]
                const patchdata = {
                    trasfer_to: nurstation,
                    transfer_time: tranDate !== '' ? moment(tranDate).format('YYYY-MM-DD hh:mm:ss') : null,
                    counseling_status: counstatus,
                    sfa_mfa_clearence: sfa,
                    room_amenties: roomamenties,
                    bystander_room_retain: room,
                    transfer_in_time: Indate !== '' ? moment(Indate).format('YYYY-MM-DD hh:mm:ss') : null,
                    remarks: remark !== '' ? remark : null,
                    trasf_slno: trasf_slno
                }
                updateData(patchdata)
            }
            else {
                const results = await axioslogin.post(`/WeWork/insertbed`, postdata)
                const { message, success } = results.data;
                if (success === 2) {
                    succesNotify(message)
                    setcount(count + 1)
                    reset();
                }
                else if (success === 1) {
                    infoNotify(message)
                }
                else {
                    infoNotify(message)
                }
            }
        }

        if (value === 1) {
            updateData(Patchdata)
        }
        else {
            InsertData(postdata)
        }

    }, [value, count, reset, nurstation, tranDate, counstatus, sfa, roomamenties, Patchdata,
        room, Indate, remark, id, nurse, postdata])


    const closwindow = useCallback(() => {
        setclosebtn(0)
    }, [setclosebtn])


    return (
        <Paper square elevation={3} sx={{ dispaly: "flex", justifyContent: "column" }}>
            <Box>
                <Typography sx={{ fontStyle: "oblique", fontWeight: 800, color: '#1a237e', textAlign: "center", fontSize: 20 }}>
                    Bed Transfer
                </Typography>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "row", width: "100%", pl: 2, pt: 1 }}>

                <Box sx={{ display: "flex", flexDirection: "row", width: "50%" }}>
                    <Box sx={{ width: { xl: "30%", lg: "40%", md: "40%", sm: "30%" } }}  >
                        <CssVarsProvider>
                            <Typography >
                                Transfer from:</Typography>
                        </CssVarsProvider>
                    </Box>



                    <Box sx={{ width: { xl: "50%", lg: "50%", md: "55%", sm: "65%" }, height: 40, }}>
                        <NursingStationMeliSelect value={tranFrom} setValue={setTranFrom} />
                    </Box>
                    {/* <NursingStationMeliSelect value={nurstation} setValue={setnurstation} /> */}

                </Box>
                <Box sx={{ display: "flex", flexDirection: "row", width: "50%" }} >
                    <Box sx={{ width: { xl: "30%", lg: "40%", md: "40%", sm: "30%" } }}  >
                        <CssVarsProvider>
                            <Typography >
                                Transfer To:</Typography>
                        </CssVarsProvider>
                    </Box>
                    <Box sx={{ width: { xl: "50%", lg: "50%", md: "55%", sm: "65%" }, height: 40, }}>
                        <NursingStationMeliSelect value={nurstation} setValue={setnurstation} />
                    </Box>
                </Box>



                {/* <Box sx={{ display: "flex", flexDirection: "row", width: "50%" }} >
                    <Box sx={{ width: { xl: "30%", lg: "40%", md: "40%", sm: "35%" } }}  >
                        <CssVarsProvider>
                            <Typography >
                                Transfer Date and Time</Typography>
                        </CssVarsProvider>
                    </Box>
                    <Box sx={{ width: { xl: "50%", lg: "50%", md: "55%", sm: "60%" }, height: 40, }}>
                        <TextFieldCustom
                            size="sm"
                            type="datetime-local"
                            name="daily"
                            value={tranDate}
                            onchange={getDate}
                        />
                    </Box>
                </Box> */}
            </Box>

            <Box sx={{ display: "flex", flexDirection: "row", width: "100%", pl: 2, pt: 1 }}>
                <Box sx={{ display: "flex", flexDirection: "row", width: "50%" }} >
                    <Box sx={{ width: { xl: "30%", lg: "40%", md: "40%", sm: "35%" } }}  >
                        <CssVarsProvider>
                            <Typography >
                                Transfer Date and Time:</Typography>
                        </CssVarsProvider>
                    </Box>
                    <Box sx={{ width: { xl: "50%", lg: "50%", md: "55%", sm: "60%" }, height: 40, }}>
                        <TextFieldCustom
                            size="sm"
                            type="datetime-local"
                            name="daily"
                            value={tranDate}
                            onchange={getDate}
                        />
                    </Box>
                </Box>


                {/* <Box sx={{ display: "flex", flexDirection: "row", width: "50%" }} >
                    <Box sx={{ width: { xl: "30%", lg: "40%", md: "40%", sm: "30%" } }}  >
                        <CssVarsProvider>
                            <Typography >
                                BystanderRoom retaining</Typography>
                        </CssVarsProvider>
                    </Box>
                    <Box sx={{ width: { xl: "50%", lg: "50%", md: "55%", sm: "65%" }, height: 40, }}>
                        <TextFieldCustom
                            size="sm"
                            type="text"
                            name="room"
                            value={room}
                            onchange={getroom}
                        />
                    </Box>
                </Box> */}
                <Box sx={{ display: "flex", flexDirection: "row", width: "50%" }} >
                    <Box sx={{ width: { xl: "30%", lg: "40%", md: "40%", sm: "35%" } }}  >
                        <CssVarsProvider>
                            <Typography >
                                Transfer IN Date and Time:</Typography>
                        </CssVarsProvider>
                    </Box>
                    <Box sx={{ width: { xl: "50%", lg: "50%", md: "55%", sm: "60%" }, height: 40, }}>
                        <TextFieldCustom
                            size="sm"
                            type="datetime-local"
                            name="daily"
                            value={Indate}
                            onchange={getindate}
                        />
                    </Box>
                </Box>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", width: "50%", pl: 2 }} >
                <Box sx={{ width: { xl: "30%", lg: "40%", md: "40%", sm: "30%" } }}  >
                    <CssVarsProvider>
                        <Typography >
                            BystanderRoom retaining:</Typography>
                    </CssVarsProvider>
                </Box>
                <Box sx={{ width: { xl: "50%", lg: "50%", md: "55%", sm: "65%" }, height: 40, }}>
                    <TextFieldCustom
                        size="sm"
                        type="text"
                        name="room"
                        value={room}
                        onchange={getroom}
                    />
                </Box>
            </Box>

            <Box sx={{ display: "flex", width: "100%", pl: 2 }}>
                <Box sx={{ display: "flex", width: { xl: "15%", lg: "20%", md: "20%", sm: "15%" } }}>
                    <CssVarsProvider>
                        <Typography >
                            Counselling status:
                        </Typography>
                    </CssVarsProvider>
                </Box>
                <Box sx={{ display: 'flex', width: { xl: "50%", lg: "25%", md: "40%", sm: "33%" } }}>

                    <TextFieldCustom
                        size="sm"
                        type="text"
                        name="counstatus"
                        value={counstatus}
                        onchange={getStatus}
                    />

                </Box>
            </Box>

            <Box sx={{ display: "flex", width: "100%", pl: 2, pt: 1 }}>
                <Box sx={{ display: "flex", width: { xl: "15%", lg: "20%", md: "20%", sm: "15%" } }}>
                    <CssVarsProvider>
                        <Typography >
                            SFA/MFA Clearence:
                        </Typography>
                    </CssVarsProvider>
                </Box>
                <Box sx={{ display: 'flex', width: { xl: "50%", lg: "25%", md: "40%", sm: "33%" } }}>

                    <TextFieldCustom
                        size="sm"
                        type="text"
                        name="sfa"
                        value={sfa}
                        onchange={getsfa}
                    />

                </Box>
            </Box>

            <Box >
                <Box sx={{ display: "flex", width: { xl: "15%", lg: "20%", md: "40%", sm: "50%" }, pl: 2 }}>
                    <CssVarsProvider>
                        <Typography >
                            Basic room amenities:
                        </Typography>
                    </CssVarsProvider>
                </Box>
                <Box>
                    <BasicRoomAmenties ameties={ameties} setamenties={setamenties} />
                </Box>

            </Box>

            <Box sx={{ display: "flex", width: "100%", pl: 2, pt: 1 }}>
                <Box sx={{ display: "flex", width: { xl: "15%", lg: "20%", md: "20%", sm: "20%" } }}>
                    <CssVarsProvider>
                        <Typography >
                            Remarks:
                        </Typography>
                    </CssVarsProvider>
                </Box>
                <Box sx={{ display: 'flex', width: { xl: "50%", lg: "60%", md: "40%", sm: "50%" }, pb: 2 }}>

                    <TextFieldCustom
                        size="sm"
                        type="text"
                        name="remark"
                        value={remark}
                        onchange={getremark}
                    />

                </Box>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", pl: 1 }}>
                <CustomeToolTip title="Save" placement="left" >
                    <Box sx={{ p: 1 }}>
                        <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={submit}>
                            <LibraryAddIcon fontSize='small' />
                        </CusIconButton>
                    </Box>
                </CustomeToolTip>
                <CustomeToolTip title="close" placement="left" >
                    <Box sx={{ p: 1 }}>
                        <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={closwindow} >
                            <CloseIcon fontSize='small' />
                        </CusIconButton>
                    </Box>
                </CustomeToolTip>
            </Box>
            <Box sx={{ p: 1 }}>
                <BedTrackingTable ipno={ipno} rowSelect={rowSelect} count={count} />
            </Box>

        </Paper>
    )
}

export default BedTracking