import React, { memo, useCallback, useState } from 'react'
import { Typography } from '@mui/material';
import { CssVarsProvider } from '@mui/joy';
import { Box, Paper } from '@mui/material'
import NursingStationMeliSelect from '../../CommonSelectCode/NursingStationMeliSelect';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import CusCheckBox from '../../Components/CusCheckBox';
import ComplaintCheckBox from '../../ComManagement/ComplaintRegister/ComplaintCheckBox';
import { useMemo } from 'react';
import CustomeToolTip from '../../Components/CustomeToolTip';
import CusIconButton from '../../Components/CusIconButton';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify, warningNotify } from '../../Common/CommonCode';
import moment from 'moment';
import { useSelector } from 'react-redux';
import AssignedStaffselect from '../../CommonSelectCode/AssignedStaffselect';
import { useEffect } from 'react';
import BasicRoomAmenties from './BasicRoomAmenties';
import Patientservice from './Patientservice';

const Patientsurvillence = ({ ipno, ptno, name, age, docname, doa, mf, rmno, bedcode }) => {
    const [bedtype, setbedtype] = useState(false)
    const [rmcat, setrmcat] = useState(false)
    const [modepay, setmodpay] = useState(false)
    const [pck, setpck] = useState(false)
    const [duser, setduser] = useState('')
    const [rstym, setrstym] = useState('')
    const [tele, settele] = useState(false)
    const [gzr, setgzr] = useState(false)
    const [dv, setdv] = useState('')
    const [st, setst] = useState('')
    const [rt, setrt] = useState('')
    const [asn, setasn] = useState(0)
    const [doc, setdoc] = useState('')
    const [cr, setcr] = useState('')
    const [sfa, setsfa] = useState('')
    const [remr, setremr] = useState('')
    const [shiffrom, setshiffrom] = useState(0)
    const [shiftto, setshiftto] = useState(0)
    const [count, setcount] = useState(0)
    const [surv, setsurv] = useState({
        we_surv_slno: '',
        surv_log_slno: ''
    })
    const { we_surv_slno } = surv

    const emid = useSelector((state) => {
        return state.LoginUserData.empid
    })
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
    // array mapping room category
    const roomcategory = [{ rmslno: 1, rmname: "Normal" },
    { rmslno: 2, rmname: "AC " },
    { rmslno: 3, rmname: "AC Delux" },
    { rmslno: 4, rmname: "Suite" },
    { rmslno: 5, rmname: "VIP Suite" }
    ]
    //array mapping bedtype
    const bed = [
        { bdslno: 1, bdname: "Basic Bed" },
        { bdslno: 2, bdname: "Semi Flower" },
        { bdslno: 3, bdname: "Side Rail" },
        { bdslno: 4, bdname: "Bariatric Bed" },
        { bdslno: 5, bdname: "Electric Bed" },
    ]
    //array mapping payment method
    const payment = [
        { payno: 1, payname: "Cash" },
        { payno: 2, payname: "Insurance" },
        { payno: 3, payname: "Other Credit" },
    ]
    // array mapping packges
    const pack = [
        { pcno: 1, pcname: "yes" },
        { pcno: 2, pcname: "No" },
        { pcno: 3, pcname: "clearence from FIO" }
    ]
    // checkbox for remote
    const [remote, setremote] = useState({
        acremot: false,
        tvremot: false
    })
    const { acremot, tvremot } = remote
    const updateremort = async (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setremote({ ...remote, [e.target.name]: value })
    }
    const actvremort = useMemo(() => {
        return {
            acremot: remote.acremot === true ? 1 : 0,
            tvremot: remote.tvremot === true ? 2 : 0
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
    const [service, setservice] = useState({
        bedmake: false,
        gen: false,
        initial: false,
        visit: false
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
            tvremot: false
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
            mat: false
        }
    }, [])
    const resetservice = useMemo(() => {
        return {
            bedmake: false,
            gen: false,
            initial: false,
            visit: false
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
        setshiffrom(0)
        setshiftto(0)
        setamenties(resetamenties)
        setremote(resetremot)
        setservice(resetservice)
    }, [resetamenties, resetremot, resetservice])

    const detail = useMemo(() => {
        return {
            ip_no: ipno,
            bd_code: bedcode
        }
    }, [ipno, bedcode])
    useEffect(() => {
        const getPatientList = async (detail) => {
            const result = await axioslogin.post(`/WeWork/patdetail`, detail)
            const { success, data } = result.data
            if (success === 1) {
                const { shift_from, shift_to, surv_log_slno,
                    recieved_time, room_category, bed_type, telephone, geezer, dietition_visit_tme,
                    stat_medicine, stat_recived_time, assigned_nurse, document_status, payment_mode, tv_ac_remot,
                    creadit_detail, pateint_service, remarks_we, sfa_mfa, discharge_wright, patpackage, we_surv_slno, room_amentites } = data[0];
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
                    tvremot: tvremot === 2 ? true : false
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
                    surv_log_slno: surv_log_slno
                }
                setsurv(frmdata)
                setduser(discharge_wright !== null ? discharge_wright : '')
                setshiffrom(shift_from)
                setshiftto(shift_to)
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
            }
            else if (success === 2) {
                infoNotify("enter patient details!")
            }
            else {
                warningNotify("Error occured contact")
            }
        }

        getPatientList(detail);
    }, [detail])

    const submited = useCallback((e) => {
        e.preventDefault();
        const insertdata = async (postData) => {
            const result1 = await axioslogin.post('/WeWork/patientsurv', postData)
            const { succs, messagee } = result1.data;
            if (succs === 1) {
                succesNotify(messagee)
            } else if (succs === 0) {
                infoNotify(messagee);
            }
            else {
                infoNotify(messagee)
            }
        }
        const Updatedata = async (patchData) => {
            const results = await axioslogin.patch(`/WeWork/patchsurv`, patchData)
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

        /*** * insert function for use call back     */
        const Insertidtable = async (postdetail) => {
            const result = await axioslogin.post(`/WeWork/insertsurv`, postdetail)
            const { message, success, insertId } = result.data;
            if (success === 1) {
                succesNotify(message)
                reset();
                const postData = {
                    we_surv_slno: insertId,
                    ip_no: ipno,
                    pt_no: ptno,
                    bd_code: bedcode,
                    discharge_wright: duser !== '' ? moment(duser).format('YYYY-MM-DD hh:mm:ss') : null,
                    shift_from: shiffrom,
                    shift_to: shiftto,
                    recieved_time: rstym !== '' ? moment(rstym).format('YYYY-MM-DD hh:mm:ss') : null,
                    room_category: rmcat,
                    bed_type: bedtype,
                    tv_ac_remot: actvremort,
                    telephone: tele === true ? 1 : 0,
                    geezer: gzr === true ? 1 : 0,
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
                    we_employee: emid
                }
                const timeout = setTimeout(() => {
                    insertdata(postData)
                }, 1000)
                return () => clearTimeout(timeout)
            } else if (success === 2) {
                infoNotify(message)
                reset();
            }
            else {
                infoNotify(message)
            }
        }
        const postdata = {
            ip_no: ipno,
            pt_no: ptno
        }

        const getsurvslno = async (postdata) => {
            const result = await axioslogin.post(`/WeWork/survslno`, postdata)
            const { success, data } = result.data;
            if (success === 1) {

                const { surv_slno } = data[0]

                const shiftdetl = {
                    shift_from: shiffrom,
                    shift_to: shiftto,
                    we_surv_slno: we_surv_slno
                }

                const getsurvlogslno = async (shiftdetl) => {
                    const result = await axioslogin.post('/WeWork/logslno', shiftdetl)
                    const { success, data } = result.data
                    if (success === 1) {
                        const { surv_log_slno } = data[0]
                        const patchData = {
                            discharge_wright: duser !== '' ? moment(duser).format('YYYY-MM-DD hh:mm:ss') : null,
                            shift_from: shiffrom,
                            shift_to: shiftto,
                            recieved_time: rstym !== '' ? moment(rstym).format('YYYY-MM-DD hh:mm:ss') : null,
                            room_category: rmcat,
                            bed_type: bedtype,
                            telephone: tele === true ? 1 : 0,
                            geezer: gzr === true ? 1 : 0,
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
                            surv_log_slno: surv_log_slno
                        }
                        Updatedata(patchData)
                    }
                    else if (success === 2) {
                        const postData = {
                            we_surv_slno: surv_slno,
                            ip_no: ipno,
                            pt_no: ptno,
                            bd_code: bedcode,
                            discharge_wright: duser !== '' ? moment(duser).format('YYYY-MM-DD hh:mm:ss') : null,
                            shift_from: shiffrom,
                            shift_to: shiftto,
                            recieved_time: rstym !== '' ? moment(rstym).format('YYYY-MM-DD hh:mm:ss') : null,
                            room_category: rmcat,
                            bed_type: bedtype,
                            tv_ac_remot: actvremort,
                            telephone: tele === true ? 1 : 0,
                            geezer: gzr === true ? 1 : 0,
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
                            we_employee: emid
                        }
                        insertdata(postData)
                        reset()
                    }
                }
                getsurvlogslno(shiftdetl)
            }
            else if (success === 2) {
                Insertidtable(postdetail)
            }
        }
        getsurvslno(postdata)
    }, [postdetail, ipno, ptno, bedcode, bedtype, gzr, dv, st, rt, asn, modepay, doc,
        cr, pck, remr, sfa, duser, shiffrom, shiftto, rstym, tele,
        emid, rmcat, we_surv_slno, roomamenties, patservice, actvremort, count, reset])

    return (
        < Box sx={{
            px: 1, pt: 1,
            flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" },
        }}
        >
            <Paper>
                <Paper sx={{ p: 1, }} >
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
                                    <Box sx={{ width: { xl: "60%", lg: "70%", md: "62%", sm: "50%" }, height: 30 }}>
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
                                    <Box sx={{ width: { xl: "60%", lg: "70%", md: "70%", sm: "50%" }, height: 30, display: "flex" }}>
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
                                width: { xl: "50%", lg: "50%", md: "50%", sm: "49%" }
                            }}>
                                <Box sx={{ width: { xl: "90%", lg: "50%", md: "60%", sm: "100%" }, display: 'flex', }}>
                                    <Box sx={{ width: { xl: "15%", lg: "39%", md: "40%", sm: "30%" } }}>
                                        <Typography>Cousultant</Typography>
                                    </Box>
                                    <Box sx={{ width: { xl: "60%", lg: "61%", md: "60%", sm: "60%" }, height: 30, }}>
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
                    <Box sx={{ pb: 1 }}>
                        <CssVarsProvider>
                            <Typography sx={{ fontStyle: "oblique", fontWeight: 500, color: '#94B7FC' }} startdecorator={<ArrowRightOutlinedIcon />} >
                                Patient Encounter Information
                            </Typography>
                        </CssVarsProvider>
                    </Box>
                    <Paper>
                        <Box sx={{
                            p: 1,
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
                                        <Box sx={{ display: 'flex', width: { xl: "20%", lg: "30%", md: "25%", sm: "30%" } }}>
                                            <CssVarsProvider><Typography>Shift to </Typography> </CssVarsProvider></Box>

                                        <Box sx={{ width: { xl: "60%", lg: "60%", md: "60%", sm: "60%" } }}>
                                            <NursingStationMeliSelect value={shiftto} setValue={setshiftto} />
                                        </Box>
                                    </Box>
                                </Box>
                                <Box sx={{
                                    display: "flex",
                                    width: { xl: "40%", lg: "40%", md: "40%", sm: "100%" },
                                    py: { xl: 0, lg: 0, md: 2, sm: 2 }
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
                                                    value={val.rmslno}
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
                            <Box sx={{ width: { xl: "14%", lg: "15%", md: "15%", sm: "15%" }, pt: 0.5 }}  >
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
                                width: { xl: "90%", lg: "100%", md: "90%", sm: "100%" },
                            }}  >
                                {
                                    bed && bed.map((val, index) => {
                                        return <Box sx={{
                                            pt: 1, pb: 1, pl: 1,
                                            justifyContent: 'space-between',
                                            // width: "100%",
                                            width: { xl: "100%", lg: "100%", md: "100%", sm: "100%" }
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
                                    })
                                }
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "row", width: "100%", }}>
                            <Box sx={{ width: { xl: "15%", lg: "15%", md: "17%", sm: "16%" } }} >
                                <CssVarsProvider>
                                    <Typography>Remote</Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ display: "flex", flexDirection: "row", width: "78%" }}>
                                <Box sx={{ width: { xl: "22%", lg: "22%", md: "21%", sm: "21%" } }}>
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
                                <Box sx={{ width: { xl: "20%", lg: "20%", md: "20%", sm: "20%" } }} >
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
                        <Box sx={{ display: "flex", flexDirection: "row", width: "100%", pt: 1 }}>
                            <Box sx={{ width: { xl: "15%", lg: "15%", md: "17%", sm: "16%" } }} >

                            </Box>
                            <Box sx={{ display: "flex", flexDirection: "row", width: "78%" }}>
                                <Box sx={{ width: { xl: "22%", lg: "22%", md: "21%", sm: "21%" } }}>
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
                                <Box sx={{ width: { xl: "20%", lg: "20%", md: "20%", sm: "21%" } }}>
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
                        <BasicRoomAmenties ameties={ameties} setamenties={setamenties} />
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
                            <Patientservice service={service} setservice={setservice} />
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "row" }}>
                            <Box sx={{ display: 'flex', width: { xl: "50%", lg: "50%", md: "50%", sm: "50%" }, justifyContent: "start" }}>
                                <Box sx={{ display: 'flex', width: { xl: "33%", lg: "30%", md: "38%", sm: "40%" } }}>
                                    <CssVarsProvider>    <Typography>Dietition visit time </Typography> </CssVarsProvider></Box>
                                <Box sx={{ display: 'flex', width: { xl: "40%", lg: "50%", md: "52%", sm: "53%" } }}>
                                    <TextFieldCustom
                                        size="sm"
                                        type="datetime-local"
                                        name="dv"
                                        value={dv}
                                        onchange={getvist}
                                    />
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", flexDirection: "row", width: { xl: "50%", lg: "50%", md: "50%", sm: "50%" } }}>
                                <Box sx={{ display: 'flex', width: { xl: "30%", lg: "30%", md: "30%", sm: "40%" } }}>
                                    <CssVarsProvider>    <Typography>STAT Medicine indent time</Typography> </CssVarsProvider></Box>
                                <Box sx={{ display: 'flex', width: { xl: "40%", lg: "50%", md: "60%", sm: "60%" } }}>
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
                        <Box sx={{ display: 'flex', width: "100%", justifyContent: "start", pt: 1 }}>
                            <Box sx={{ display: "flex", width: { xl: "50%", lg: "50%", md: "50%", sm: "50%" }, }}>
                                <Box sx={{ display: 'flex', width: { xl: "30%", lg: "26%", md: "33%", sm: "33%" }, }}>
                                    <CssVarsProvider><Typography>Received time</Typography> </CssVarsProvider></Box>
                                <Box sx={{ display: 'flex', width: { xl: "43%", lg: "55%", md: "58%", sm: "60%" }, pl: 3 }}>
                                    <TextFieldCustom
                                        size="sm"
                                        type="datetime-local"
                                        name="rt"
                                        value={rt}
                                        onchange={getrt}
                                    />
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", width: { xl: "50%", lg: "50%", md: "50%", sm: "50%" }, }}>
                                <Box sx={{ display: 'flex', width: { xl: "30%", lg: "30%", md: "30%", sm: "40%" } }}>
                                    <CssVarsProvider>    <Typography>Assigned nursing staff</Typography> </CssVarsProvider></Box>
                                <Box sx={{ display: 'flex', width: { xl: "40%", lg: "50%", md: "60%", sm: "60%" }, }}>
                                    <AssignedStaffselect value={asn} setValue={setasn} shiftto={shiftto} />
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
                                    <Typography> Mode of Payment</Typography>
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
                                                value={val.payno}
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
                            <Box sx={{ display: 'flex', width: { xl: "66%", lg: "70%", md: "75%", sm: "78%" } }}>
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
                            <Box sx={{ display: 'flex', width: { xl: "66%", lg: "70%", md: "75%", sm: "78%" } }}>
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
                                                value={val.pcno}
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
                            <Box sx={{ width: { xl: "66%", lg: "70%", md: "75%", sm: "78%" } }}>
                                <TextFieldCustom
                                    size="sm"
                                    type="text"
                                    name="remr"
                                    value={remr}
                                    onchange={getremark}
                                />
                            </Box>
                        </Box>
                    </Paper>
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                        <CustomeToolTip title="Save" placement="left" >
                            <Box sx={{ p: 1 }}>
                                <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={submited} >
                                    <LibraryAddIcon fontSize='small' />
                                </CusIconButton>
                            </Box>
                        </CustomeToolTip>
                    </Box>
                </Paper>
            </Paper>
        </Box >
    )
}
export default memo(Patientsurvillence)