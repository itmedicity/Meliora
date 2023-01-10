import { Paper } from '@material-ui/core'
import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { memo, useEffect } from 'react'
import { CssVarsProvider } from '@mui/joy'
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
import CusCheckBox from 'src/views/Components/CusCheckBox'

const BedTracking = ({ setclosebtn, ipno, nurse, bedcode, nsdesc }) => {
    const [nurstation, setnurstation] = useState(0)
    const [tranDate, settranDate] = useState('')
    const [counstatus, setcounstatus] = useState('')
    const [sfa, setmfa] = useState('')
    const [room, setroom] = useState('')
    const [Indate, setIndate] = useState('')
    const [remark, setremark] = useState('')
    const [value, setValue] = useState(0)
    const [count, setcount] = useState(0)
    // const [tranFrom, setTranFrom] = useState(0)
    const [tabledata, setTabledata] = useState([])
    const [rmSlno, setrmSlno] = useState(0)
    const [id, setid] = useState(0)
    const [rmstatus, setrmstatus] = useState(false)
    const [cstatus, setcStatus] = useState(false)
    const [sfaStatus, setSfaStatus] = useState(false)
    const [rmNo, setRmno] = useState(false)
    const [tonurse, setTonurse] = useState('')

    // const [bedtransfer, setbedtransfer] = useState({
    //     trasf_slno: ''
    // })
    // const { trasf_slno } = bedtransfer

    const getSfastatus = useCallback((e) => {
        if (e.target.checked === true) {
            setSfaStatus(true)
        }
        else {
            setSfaStatus(false)
        }
    }, [])

    const getrmstatus = useCallback((e) => {
        if (e.target.checked === true) {
            setrmstatus(true)
        }
        else {
            setrmstatus(false)
        }
    }, [])

    const getCstatus = useCallback((e) => {
        if (e.target.checked === true) {
            setcStatus(true)
        }
        else {
            setcStatus(false)
        }
    }, [])

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

    // const getDate = useCallback((e) => {
    //     settranDate(e.target.value)
    // }, [])
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
        // setTranFrom(0)
        setcStatus(false)
        setSfaStatus(false)
        setrmstatus(false)
    }, [resetamenties])

    const postdata = useMemo(() => {
        return {
            bed_trans_surv_slno: id,
            trasfer_to: nurstation !== 0 ? nurstation : null,
            transfer_from: nurse,
            transfer_time: tranDate !== '' ? moment(tranDate).format('YYYY-MM-DD hh:mm:ss') : null,
            counseling_status: cstatus,
            sfa_mfa_status: sfaStatus,
            room_amenties: roomamenties,
            bystander_room_retain: rmstatus,
            transfer_in_time: Indate !== '' ? moment(Indate).format('YYYY-MM-DD hh:mm:ss') : null,
            remarks: remark !== '' ? remark : null,
            ip_no: ipno,
            counciling_remarks: counstatus,
            sfa_mfa_clearence: sfa,
            bystander_room_retain_remark: room,
            bd_code: bedcode
        }
    }, [id, nurstation, tranDate, counstatus, sfa, roomamenties, room, Indate, remark, nurse, ipno, bedcode, sfaStatus, cstatus, rmstatus])

    const rowSelect = useCallback((params) => {
        setValue(1)
        const data = params.api.getSelectedRows()
        const { rm_slno, nsc_desc, rmd_occupdate, ns_code } = data[0]
        setRmno(rm_slno)
        setTonurse(nsc_desc)
        settranDate(rmd_occupdate)
        setnurstation(ns_code)
    }, [])

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
                warningNotify("Error occured contact EDP")
            }
        }
        getsurvno();
    }, [ipno])

    useEffect(() => {
        const getBedTracking = async (ipno) => {
            const result = await axioslogin.get(`/WeWork/getbedTrack/${ipno}`)
            const { success, data } = result.data
            if (success === 1) {
                const { sl_no, ns_code, rmd_occupdate, rm_slno } = data[0]
                setTabledata(data)
                setrmSlno(sl_no)
                setnurstation(ns_code)
                settranDate(rmd_occupdate)
                setRmno(rm_slno)
            } else {
                warningNotify("no shifting under this patient")
            }
        }
        getBedTracking(ipno);
    }, [ipno, count])

    const submit = useCallback((e) => {
        e.preventDefault();
        const insertdata = async (postdata) => {
            const results = await axioslogin.post(`/WeWork/insertbed`, postdata)
            const { message, success } = results.data;
            if (success === 2) {
                succesNotify(message)
                setcount(count + 1)
                reset();
            } else if (success === 1) {
                infoNotify(message)
            } else {
                infoNotify(message)
            }
        }
        insertdata(postdata)

        // const InsertData = async (postdata) => {

        //     const shift = {
        //         transfer_from: nurse,
        //         trasfer_to: nurstation,
        //         bed_trans_surv_slno: id
        //     }

        //     const result = await axioslogin.post('/WeWork/bedtranSlno', shift)
        //     const { success, data } = result.data
        //     if (success === 1) {
        //         const { trasf_slno } = data[0]
        //         const patchdata = {
        //             trasfer_to: nurstation,
        //             transfer_time: tranDate !== '' ? moment(tranDate).format('YYYY-MM-DD hh:mm:ss') : null,
        //             counseling_status: counstatus,
        //             sfa_mfa_clearence: sfa,
        //             room_amenties: roomamenties,
        //             bystander_room_retain: room,
        //             transfer_in_time: Indate !== '' ? moment(Indate).format('YYYY-MM-DD hh:mm:ss') : null,
        //             remarks: remark !== '' ? remark : null,
        //             trasf_slno: trasf_slno,

        //         }
        //         updateData(patchdata)
        //     }
        //     else {
        //         const results = await axioslogin.post(`/WeWork/insertbed`, postdata)
        //         const { message, success } = results.data;
        //         if (success === 2) {
        //             succesNotify(message)
        //             setcount(count + 1)
        //             reset();
        //         }
        //         else if (success === 1) {
        //             infoNotify(message)
        //         }
        //         else {
        //             infoNotify(message)
        //         }
        //     }
        // }

        // if (value === 1) {
        //     updateData(Patchdata)
        // }
        // else {
        //     InsertData(postdata)
        // }

    }, [count, reset, postdata])


    const closwindow = useCallback(() => {
        setclosebtn(0)
    }, [setclosebtn])


    return (
        <Paper square elevation={3} sx={{ dispaly: "flex", justifyContent: "column" }}>
            <Box>
                <Typography sx={{ backgroundColor: "#f0f3f5", fontFamily: "Roboto", fontSize: 20, p: 1.5, pl: 2 }} >
                    Bed Transfer
                </Typography>
            </Box>

            <Box sx={{ p: 1 }}>
                <BedTrackingTable ipno={ipno} rowSelect={rowSelect} count={count} setcount={setcount}
                    tabledata={tabledata} setTabledata={setTabledata} setrmSlno={setrmSlno} rmSlno={rmSlno} rmNo={rmNo} />
            </Box>
            {
                value === 1 ?

                    <Paper>

                        <Box sx={{ display: "flex", flexDirection: "row", width: "100%", pl: 2, pt: 1 }}>
                            <Box sx={{ display: "flex", flexDirection: "row", width: "50%" }} >
                                <Box sx={{ width: { xl: "30%", lg: "40%", md: "40%", sm: "35%" } }}  >
                                    <CssVarsProvider>
                                        <Typography >
                                            Transfer from:</Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ width: { xl: "50%", lg: "50%", md: "55%", sm: "60%" }, height: 40, }}>
                                    <Typography >
                                        {nsdesc}</Typography>
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", flexDirection: "row", width: "50%" }} >
                                <Box sx={{ width: { xl: "30%", lg: "40%", md: "40%", sm: "35%" } }}  >
                                    <CssVarsProvider>
                                        <Typography >
                                            Transfer To:</Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ width: { xl: "50%", lg: "50%", md: "55%", sm: "60%" }, height: 40, }}>
                                    <Typography >
                                        {tonurse}</Typography>
                                </Box>
                            </Box>
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
                                    <Typography >
                                        {tranDate}</Typography>
                                </Box>
                            </Box>
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

                        <Box sx={{ width: "100%", display: "flex", flexDirection: "row", pl: 2 }}>
                            <Box sx={{ display: "flex", width: "50%" }}>
                                <Box sx={{ width: { xl: "30%", lg: "40%", md: "40%", sm: "30%" } }}  >
                                    <CssVarsProvider>
                                        <Typography >
                                            Bystander room retaining status:</Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box>

                                    <CusCheckBox
                                        variant="outlined"
                                        color="primary"
                                        size="md"
                                        name="rmstatus"
                                        label="Yes"
                                        value={rmstatus}
                                        onCheked={getrmstatus}
                                        checked={rmstatus}
                                    />

                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", flexDirection: "row", width: "50%", }} >
                                <Box sx={{ width: { xl: "30%", lg: "40%", md: "40%", sm: "30%" } }}  >
                                    <CssVarsProvider>
                                        <Typography >
                                            Room Retaining remarks:</Typography>
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

                        </Box>

                        <Box sx={{ width: "100%", display: "flex", flexDirection: "row", pl: 2 }}>
                            <Box sx={{ display: "flex", width: "50%" }}>
                                <Box sx={{ width: { xl: "30%", lg: "40%", md: "40%", sm: "30%" } }}  >
                                    <CssVarsProvider>
                                        <Typography >
                                            SFA/MFA status:</Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box>

                                    <CusCheckBox
                                        variant="outlined"
                                        color="primary"
                                        size="md"
                                        name="sfaStatus"
                                        label="Yes"
                                        value={sfaStatus}
                                        onCheked={getSfastatus}
                                        checked={sfaStatus}
                                    />

                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", flexDirection: "row", width: "50%", }} >
                                <Box sx={{ width: { xl: "30%", lg: "40%", md: "40%", sm: "30%" } }}  >
                                    <CssVarsProvider>
                                        <Typography >
                                            SFA/MFA Remarks:</Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ width: { xl: "50%", lg: "50%", md: "55%", sm: "65%" }, height: 40, }}>
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
                        <Box sx={{ width: "100%", display: 'flex', flexDirection: 'row', pl: 2 }}>
                            <Box sx={{ display: "flex", width: "50%" }}>
                                <Box sx={{ display: "flex", width: { xl: "30%", lg: "40%", md: "40%", sm: "30%" } }}>
                                    <CssVarsProvider>
                                        <Typography >
                                            Counselling status:
                                        </Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ display: 'flex', width: { xl: "50%", lg: "50%", md: "55%", sm: "65%" } }}>
                                    <CusCheckBox
                                        variant="outlined"
                                        color="primary"
                                        size="md"
                                        name="cstatus"
                                        label="Yes"
                                        value={cstatus}
                                        onCheked={getCstatus}
                                        checked={cstatus}
                                    />
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", width: "50%" }}>
                                <Box sx={{ display: "flex", width: { xl: "30%", lg: "40%", md: "40%", sm: "30%" } }}>
                                    <CssVarsProvider>
                                        <Typography >
                                            Counselling Remark:
                                        </Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ display: 'flex', width: { xl: "50%", lg: "50%", md: "55%", sm: "65%" } }}>
                                    <TextFieldCustom
                                        size="sm"
                                        type="text"
                                        name="counstatus"
                                        value={counstatus}
                                        onchange={getStatus}
                                    />
                                </Box>
                            </Box>
                        </Box>

                        <Box sx={{ width: "100%", display: "flex", pl: 2 }}>
                            <Box sx={{ display: "flex", width: { xl: "15%", lg: "40%", md: "40%", sm: "30%" } }}>
                                <CssVarsProvider>
                                    <Typography >
                                        Remarks:
                                    </Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ display: 'flex', width: { xl: "50%", lg: "50%", md: "55%", sm: "65%" } }}>
                                <TextFieldCustom
                                    size="sm"
                                    type="text"
                                    name="remark"
                                    value={remark}
                                    onchange={getremark}
                                />
                            </Box>
                        </Box>
                        <Box>
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

                    </Paper> :
                    null
            }
        </Paper>
    )
}

export default memo(BedTracking)