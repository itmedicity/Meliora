import { Paper } from '@material-ui/core'
import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { CssVarsProvider } from '@mui/joy'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import { useCallback } from 'react'
import { useState } from 'react'
import { useMemo } from 'react'
import { useEffect } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import moment from 'moment/moment'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import CustomeToolTip from '../../Components/CustomeToolTip';
import CusIconButton from '../../Components/CusIconButton';
import CloseIcon from '@mui/icons-material/Close';
import DiscahrgeEventTable from './DiscahrgeEventTable'
import CusCheckBox from 'src/views/Components/CusCheckBox'



const DischargeEvent = ({ ipno, setclosebtn }) => {
    const [disType, setDisType] = useState('')
    const [distime, setdisctime] = useState('')
    const [sumrytym, setsumrytym] = useState('')
    const [indeTym, setindtym] = useState('')
    const [medtime, setmedtime] = useState('')
    const [billtime, setbilltime] = useState('')
    const [fedback, setfeedback] = useState(false)
    const [clearence, setclearence] = useState('')
    const [cross, setcross] = useState('')
    const [id, setid] = useState(0)
    const [count, setcount] = useState(0)
    const [value, setvalue] = useState(0)
    const [bell, setbell] = useState(false)
    const [key, setkey] = useState(false)
    const [disEvent, setDisevent] = useState({
        dis_slno: '',


    })


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

    const { dis_slno } = disEvent
    const getfeedback = useCallback((e) => {
        if (e.target.checked === true) {
            setfeedback(true)
        }
        else {
            setfeedback(false)
        }
    }, [])

    const getkey = useCallback((e) => {
        if (e.target.checked === true) {
            setkey(true)
        }
        else {
            setkey(false)
        }
    }, [])
    const getbell = useCallback((e) => {
        if (e.target.checked === true) {
            setbell(true)
        }
        else {
            setbell(false)
        }
    }, [])

    const getDiscType = useCallback((e) => {
        setDisType(e.target.value)
    }, [])
    const getdisTime = useCallback((e) => {
        setdisctime(e.target.value)
    }, [])

    const getsumryTym = useCallback((e) => {
        setsumrytym(e.target.value)
    }, [])

    const getIndentTym = useCallback((e) => {
        setindtym(e.target.value)
    }, [])
    const getmedtime = useCallback((e) => {
        setmedtime(e.target.value)
    }, [])
    const getbilltime = useCallback((e) => {
        setbilltime(e.target.value)
    }, [])
    const getcleartime = useCallback((e) => {
        setclearence(e.target.value)
    }, [])
    const getconstation = useCallback((e) => {
        setcross(e.target.value)
    }, [])

    const resetremot = useMemo(() => {
        return {
            acremot: false,
            tvremot: false
        }
    }, [])

    const reset = useCallback(() => {
        setDisevent('')
        setDisType('')
        setdisctime('')
        setsumrytym('')
        setindtym('')
        setmedtime('')
        setbilltime('')
        setfeedback(false)
        setclearence('')
        setcross('')
        setbell(false)
        setkey(false)
        setremote(resetremot)
    }, [resetremot])


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
    const postdata = useMemo(() => {
        return {
            surv_slno: id,
            ip_no: ipno,
            discharge_type: disType !== '' ? disType : null,
            dis_annoc_time: distime !== '' ? moment(distime).format('YYYY-MM-DD hh:mm:ss') : null,
            cros_consult: cross,
            summary_time: sumrytym !== '' ? moment(sumrytym).format('YYYY-MM-DD hh:mm:ss') : null,
            disc_medicine_indent: indeTym !== '' ? moment(indeTym).format('YYYY-MM-DD hh:mm:ss') : null,
            disc_medicine_recive: medtime !== '' ? moment(medtime).format('YYYY-MM-DD hh:mm:ss') : null,
            bill_ready_time: billtime !== '' ? moment(billtime).format('YYYY-MM-DD hh:mm:ss') : null,
            feed_back_collected: fedback === true ? 1 : 0,
            room_clear_time: clearence !== '' ? moment(clearence).format('YYYY-MM-DD hh:mm:ss') : null,
            disc_key: key === true ? 1 : 0,
            disc_callbell: bell === true ? 1 : 0,
            disc_tv_ac_remot: actvremort


        }

    }, [ipno, disType, distime, cross, sumrytym, indeTym, medtime,
        billtime, fedback, clearence, id, key, bell, actvremort])



    const patchdata = useMemo(() => {
        return {
            discharge_type: disType !== '' ? disType : null,
            dis_annoc_time: distime !== '' ? moment(distime).format('YYYY-MM-DD hh:mm:ss') : null,
            cros_consult: cross,
            summary_time: sumrytym !== '' ? moment(sumrytym).format('YYYY-MM-DD hh:mm:ss') : null,
            disc_medicine_indent: indeTym !== '' ? moment(indeTym).format('YYYY-MM-DD hh:mm:ss') : null,
            disc_medicine_recive: medtime !== '' ? moment(medtime).format('YYYY-MM-DD hh:mm:ss') : null,
            bill_ready_time: billtime !== '' ? moment(billtime).format('YYYY-MM-DD hh:mm:ss') : null,
            feed_back_collected: fedback === true ? 1 : 0,
            room_clear_time: clearence !== '' ? moment(clearence).format('YYYY-MM-DD hh:mm:ss') : null,
            dis_slno: dis_slno,
            disc_key: key === true ? 1 : 0,
            disc_callbell: bell === true ? 1 : 0,
            disc_tv_ac_remot: actvremort
        }
    }, [disType, distime, cross, sumrytym, indeTym, medtime,
        billtime, fedback, clearence, dis_slno, key, bell, actvremort])


    const rowSelect = useCallback((params) => {
        setvalue(1)
        const data = params.api.getSelectedRows()
        const { dis_slno, surv_slno, discharge_type, dis_annoc_time, cros_consult, summary_time, disc_medicine_indent,
            disc_medicine_recive, bill_ready_time, feed_back_collected, room_clear_time, disc_key, disc_callbell, disc_tv_ac_remot }
            = data[0]
        const formdata = {
            dis_slno: dis_slno,
            surv_slno: surv_slno
        }
        const obj2 = JSON.parse(disc_tv_ac_remot)
        const { acremot, tvremot } = obj2
        const t = {
            acremot: acremot === 1 ? true : false,
            tvremot: tvremot === 2 ? true : false
        }
        setDisevent(formdata)
        setDisType(discharge_type)
        setdisctime(dis_annoc_time !== 'not updated' ? dis_annoc_time : '')
        setsumrytym(summary_time !== 'not updated' ? summary_time : '')
        setindtym(disc_medicine_indent !== 'not updated' ? disc_medicine_indent : '')
        setmedtime(disc_medicine_recive !== 'not updated' ? disc_medicine_recive : '')
        setbilltime(bill_ready_time !== 'not updated' ? bill_ready_time : '')
        setfeedback(feed_back_collected === 'yes' ? true : false)
        setclearence(room_clear_time !== 'not updated' ? room_clear_time : '')
        setcross(cros_consult !== 'not updated' ? cros_consult : '')
        setkey(disc_key === 'yes' ? true : false)
        setbell(disc_callbell === 'yes' ? true : false)
        setremote(t)
    }, [])


    const submit = useCallback((e) => {
        e.preventDefault();
        const InsertData = async (postdata) => {
            const results = await axioslogin.post(`/WeWork/discahrge`, postdata)
            const { message, success } = results.data;
            if (success === 1) {
                succesNotify(message)
                setcount(count + 1)
                reset();
            }
            else if (success === 2) {
                infoNotify(message)
            }
            else {
                infoNotify(message)
            }
        }

        const Updatedata = async (patchdata) => {
            const results = await axioslogin.patch(`/WeWork/update/disc`, patchdata)
            const { message, success } = results.data;
            if (success === 2) {
                succesNotify(message)
                setcount(count + 1)
                setvalue(0)
                reset();
            }
            else if (success === 1) {
                infoNotify(message)
            }
            else {
                infoNotify(message)
            }
        }
        if (value === 1) {
            Updatedata(patchdata)
        }

        else {
            InsertData(postdata)
        }

    }, [postdata, patchdata, count, value, reset])


    const closwindow = useCallback(() => {
        setclosebtn(0)
    }, [setclosebtn])

    return (
        <Paper square elevation={3} sx={{ dispaly: "flex", justifyContent: "column" }}>
            <Box>
                <Typography sx={{ fontStyle: "oblique", fontWeight: 800, color: '#1a237e', textAlign: "center", fontSize: 20 }}>
                    DischargeEvents
                </Typography>
            </Box>



            <Box sx={{ display: "flex", flexDirection: "row", width: "100%", pl: 2, pt: 1 }}>
                <Box sx={{ display: "flex", flexDirection: "row", width: "50%" }}>
                    <Box sx={{ width: { xl: "30%", lg: "30%", md: "40%", sm: "40%" } }}>
                        <CssVarsProvider>
                            <Typography >
                                Discahrge Type:</Typography>
                        </CssVarsProvider>
                    </Box>
                    <Box sx={{ width: { xl: "50%", lg: "50%", md: "50%", sm: "50%" }, height: 40, }}>
                        <TextFieldCustom
                            size="sm"
                            type="text"
                            name="disType"
                            value={disType}
                            onchange={getDiscType}
                        />
                    </Box>

                </Box>
                <Box sx={{ display: "flex", flexDirection: "row", width: "50%" }}>
                    <Box sx={{ width: { xl: "35%", lg: "30%", md: "40%", sm: "40%" } }}>
                        <CssVarsProvider>
                            <Typography >
                                Discharge Anounced date & time</Typography>
                        </CssVarsProvider>
                    </Box>
                    <Box sx={{ width: { xl: "50%", lg: "50%", md: "50%", sm: "50%" }, height: 40, }}>
                        <TextFieldCustom
                            size="sm"
                            type="datetime-local"
                            name="indeTym"
                            value={distime}
                            onchange={getdisTime}
                        />
                    </Box>

                </Box>




            </Box>

            <Box sx={{ display: "flex", flexDirection: "row", width: "100%", pl: 2, pt: 1 }}>
                <Box sx={{ display: "flex", flexDirection: "row", width: "50%" }}>
                    <Box sx={{ width: { xl: "30%", lg: "30%", md: "40%", sm: "40%" } }}>
                        <CssVarsProvider>
                            <Typography >
                                summary time</Typography>
                        </CssVarsProvider>
                    </Box>
                    <Box sx={{ width: { xl: "50%", lg: "50%", md: "50%", sm: "50%" }, height: 40, }}>
                        <TextFieldCustom
                            size="sm"
                            type="datetime-local"
                            name="disType"
                            value={sumrytym}
                            onchange={getsumryTym}
                        />
                    </Box>

                </Box>
                <Box sx={{ display: "flex", flexDirection: "row", width: "50%" }}>
                    <Box sx={{ width: { xl: "35%", lg: "30%", md: "40%", sm: "40%" } }}>
                        <CssVarsProvider>
                            <Typography >
                                Discharge medicine indent time</Typography>
                        </CssVarsProvider>
                    </Box>
                    <Box sx={{ width: { xl: "50%", lg: "50%", md: "50%", sm: "50%" }, height: 40, }}>
                        <TextFieldCustom
                            size="sm"
                            type="datetime-local"
                            name="disType"
                            value={indeTym}
                            onchange={getIndentTym}
                        />
                    </Box>

                </Box>




            </Box>

            <Box sx={{ display: "flex", flexDirection: "row", width: "100%", pl: 2, pt: 1 }}>
                <Box sx={{ display: "flex", flexDirection: "row", width: "50%" }}>
                    <Box sx={{ width: { xl: "30%", lg: "30%", md: "40%", sm: "40%" } }}>
                        <CssVarsProvider>
                            <Typography >
                                Discharge Medicine Received time</Typography>
                        </CssVarsProvider>
                    </Box>
                    <Box sx={{ width: { xl: "50%", lg: "50%", md: "50%", sm: "50%" }, height: 40, }}>
                        <TextFieldCustom
                            size="sm"
                            type="datetime-local"
                            name="disType"
                            value={medtime}
                            onchange={getmedtime}
                        />
                    </Box>

                </Box>
                <Box sx={{ display: "flex", flexDirection: "row", width: "50%" }}>
                    <Box sx={{ width: { xl: "35%", lg: "30%", md: "40%", sm: "40%" } }}>
                        <CssVarsProvider>
                            <Typography >
                                Final bill ready time</Typography>
                        </CssVarsProvider>
                    </Box>
                    <Box sx={{ width: { xl: "50%", lg: "50%", md: "50%", sm: "50%" }, height: 40, }}>
                        <TextFieldCustom
                            size="sm"
                            type="datetime-local"
                            name="disType"
                            value={billtime}
                            onchange={getbilltime}
                        />
                    </Box>
                </Box>




            </Box>


            <Box sx={{ display: "flex", width: "100%", pl: 2, pt: 1 }}>
                <Box sx={{ width: "50%", display: "flex", flexDirection: "row" }}>
                    <Box sx={{ width: { xl: "30%", lg: "30%", md: "40%", sm: "40%" }, flexDirection: "row" }}>
                        <CssVarsProvider>
                            <Typography >
                                Feedback collected:</Typography>
                        </CssVarsProvider>
                    </Box>
                    <Box sx={{ width: "50%" }}>

                        <CusCheckBox
                            variant="outlined"
                            color="primary"
                            size="md"
                            name="fedback"
                            label="yes"
                            value={fedback}
                            onCheked={getfeedback}
                            checked={fedback}
                        />

                    </Box>

                </Box>
                <Box sx={{ width: "50%", display: "flex", flexDirection: "row" }}>
                    <Box sx={{ width: { xl: "35%", lg: "30%", md: "40%", sm: "40%" } }}>
                        <CssVarsProvider>
                            <Typography >
                                Room clearence time:</Typography>
                        </CssVarsProvider>
                    </Box>
                    <Box sx={{ width: { xl: "50%", lg: "50%", md: "50%", sm: "50%" }, height: 40, }}>
                        <TextFieldCustom
                            size="sm"
                            type="datetime-local"
                            name="disType"
                            value={clearence}
                            onchange={getcleartime}
                        />
                    </Box>
                </Box>
            </Box>
            <Box sx={{ width: "100%", display: "flex", flexDirection: "row", pl: 2 }}>
                <Box sx={{ width: "50%", display: "flex", flexDirection: "row" }}>
                    <Box sx={{ width: { xl: "30%", lg: "30%", md: "40%", sm: "40%" } }}>
                        <CssVarsProvider>
                            <Typography >
                                Cross consulation if any:</Typography>
                        </CssVarsProvider>
                    </Box>
                    <Box sx={{ width: { xl: "50%", lg: "50%", md: "50%", sm: "50%" }, height: 40, }}>
                        <TextFieldCustom
                            size="sm"
                            type="text"
                            name="disType"
                            value={cross}
                            onchange={getconstation}
                        />
                    </Box>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "row", width: "50%", }}>
                    <Box sx={{ width: { xl: "42%", lg: "30%", md: "46%", sm: "45%" } }} >
                        <CssVarsProvider>
                            <Typography>Remote:</Typography>
                        </CssVarsProvider>
                    </Box>
                    <Box sx={{
                        display: "flex", flexDirection: "row",
                        width: { xl: "78%", lg: '65%', md: "70%", sm: "65%" },

                    }}>
                        <Box sx={{ width: { xl: "22%", lg: "22%", md: "21%", sm: "25%" } }}>
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
                        <Box sx={{ width: { xl: "20%", lg: "20%", md: "20%", sm: "25%" } }} >
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




            </Box>
            <Box sx={{ width: "50%", display: "flex", flexDirection: "row", pl: 2 }}>


                <Box sx={{ width: "50%", }}>
                    <CusCheckBox
                        variant="outlined"
                        color="primary"
                        size="md"
                        name="key"
                        label="Key"
                        value={key}
                        onCheked={getkey}
                        checked={key}>
                    </CusCheckBox>
                </Box>
                <Box sx={{ width: "50%", }}>
                    <CusCheckBox
                        variant="outlined"
                        color="primary"
                        size="md"
                        name="bell"
                        label="Callbell"
                        value={bell}
                        onCheked={getbell}
                        checked={bell}>
                    </CusCheckBox>
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
                <DiscahrgeEventTable ipno={ipno} count={count} rowSelect={rowSelect} />
            </Box>
        </Paper>
    )
}

export default DischargeEvent