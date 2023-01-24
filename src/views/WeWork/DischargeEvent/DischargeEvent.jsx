import { Paper } from '@material-ui/core'
import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { memo } from 'react'
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
    const [DiscReportTime, setDiscReportTime] = useState('')
    const [disStatus, setDiscStatus] = useState(false)
    const [entryTime, setEntrytime] = useState('')
    const [ActEntTime, setActEntTime] = useState('')
    const [ActRdytym, setActRdytym] = useState('')
    const [finalTime, setFinaltime] = useState('')
    const [actFinal, setActFinal] = useState('')

    // const [DisTym]

    const [disEvent, setDisevent] = useState({
        dis_slno: '',
    })

    const { dis_slno } = disEvent
    const getDiscStatus = useCallback((e) => {
        if (e.target.checked === true) {
            setDiscStatus(true)
        }
        else {
            setDiscStatus(false)
        }
    }, [])

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
    const getActReport = useCallback((e) => {
        setDiscReportTime(e.target.value)
    }, [])
    const getDiscEntTime = useCallback((e) => {
        setEntrytime(e.target.value)
    }, [])
    const getActEntTime = useCallback((e) => {
        setActEntTime(e.target.value)
    }, [])
    const getActRdyTym = useCallback((e) => {
        setActRdytym(e.target.value)
    }, [])
    const getDischargeTime = useCallback((e) => {
        setFinaltime(e.target.value)
    }, [])
    const getActDiscTime = useCallback((e) => {
        setActFinal(e.target.value)
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
        setDiscReportTime('')
        setEntrytime('')
        setActEntTime('')
        setActRdytym('')
        setFinaltime('')
        setActFinal('')
        setDiscStatus(false)
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
            discharge_type: disType !== '' ? disType : '',
            cros_consult: cross,
            summary_time: sumrytym !== '' ? moment(sumrytym).format('YYYY-MM-DD hh:mm:ss') : null,
            disc_medicine_indent: indeTym !== '' ? moment(indeTym).format('YYYY-MM-DD hh:mm:ss') : null,
            disc_medicine_recive: medtime !== '' ? moment(medtime).format('YYYY-MM-DD hh:mm:ss') : null,
            feed_back_collected: fedback === true ? 1 : 0,
            room_clear_time: clearence !== '' ? moment(clearence).format('YYYY-MM-DD hh:mm:ss') : null,
            disc_key: key === true ? 1 : 0,
            disc_callbell: bell === true ? 1 : 0,
            disc_tv_ac_remot: actvremort,
            disc_report_date: distime !== '' ? moment(distime).format('YYYY-MM-DD hh:mm:ss') : null,
            act_dis_report_date: DiscReportTime !== '' ? moment(DiscReportTime).format('YYYY-MM-DD hh:mm:ss') : null,
            dis_entry_time: entryTime !== '' ? moment(entryTime).format('YYYY-MM-DD hh:mm:ss') : null,
            act_dis_entry_time: ActEntTime !== '' ? moment(ActEntTime).format('YYYY-MM-DD hh:mm:ss') : null,
            dmd_date: billtime !== '' ? moment(billtime).format('YYYY-MM-DD hh:mm:ss') : null,
            act_dmd_date: ActRdytym !== '' ? moment(ActRdytym).format('YYYY-MM-DD hh:mm:ss') : null,
            disc_date: finalTime !== '' ? moment(finalTime).format('YYYY-MM-DD hh:mm:ss') : null,
            act_disc_date: actFinal !== '' ? moment(actFinal).format('YYYY-MM-DD hh:mm:ss') : null,
            act_disc_status: disStatus === true ? 1 : 0
        }

    }, [ipno, disType, distime, cross, sumrytym, indeTym, medtime, DiscReportTime, entryTime, ActEntTime, billtime, ActRdytym, finalTime, actFinal,
        disStatus, fedback, clearence, id, key, bell, actvremort])



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
            disc_tv_ac_remot: actvremort,
            disc_report_date: distime !== '' ? moment(distime).format('YYYY-MM-DD hh:mm:ss') : null,
            act_dis_report_date: DiscReportTime !== '' ? moment(DiscReportTime).format('YYYY-MM-DD hh:mm:ss') : null,
            dis_entry_time: entryTime !== '' ? moment(entryTime).format('YYYY-MM-DD hh:mm:ss') : null,
            act_dis_entry_time: ActEntTime !== '' ? moment(ActEntTime).format('YYYY-MM-DD hh:mm:ss') : null,
            dmd_date: billtime !== '' ? moment(billtime).format('YYYY-MM-DD hh:mm:ss') : null,
            act_dmd_date: ActRdytym !== '' ? moment(ActRdytym).format('YYYY-MM-DD hh:mm:ss') : null,
            disc_date: finalTime !== '' ? moment(finalTime).format('YYYY-MM-DD hh:mm:ss') : null,
            act_disc_date: actFinal !== '' ? moment(actFinal).format('YYYY-MM-DD hh:mm:ss') : null,
            act_disc_status: disStatus === true ? 1 : 0
        }
    }, [disType, distime, cross, sumrytym, indeTym, medtime,
        fedback, clearence, dis_slno, key, bell, actvremort, DiscReportTime, entryTime, ActEntTime, billtime, ActRdytym, finalTime, actFinal,
        disStatus,])

    const rowSelect = useCallback((params) => {
        setvalue(1)
        const data = params.api.getSelectedRows()
        const { dis_slno, surv_slno, discharge_type, cros_consult, summary_time, disc_medicine_indent,
            disc_medicine_recive, feed_back_collected, room_clear_time, disc_key, disc_callbell, disc_tv_ac_remot,
            disc_report_date, act_dis_report_date, dis_entry_time, act_dis_entry_time, dmd_date, act_dmd_date,
            disc_date, act_disc_date, act_disc_status }
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
        setDisType(discharge_type !== null ? discharge_type : '')
        setsumrytym(summary_time !== null ? summary_time : '')
        setindtym(disc_medicine_indent !== null ? disc_medicine_indent : '')
        setmedtime(disc_medicine_recive !== null ? disc_medicine_recive : '')
        setfeedback(feed_back_collected === 1 ? true : false)
        setclearence(room_clear_time !== null ? room_clear_time : '')
        setcross(cros_consult !== null ? cros_consult : '')
        setkey(disc_key === 1 ? true : false)
        setbell(disc_callbell === 1 ? true : false)
        setremote(t)
        setdisctime(disc_report_date !== null ? disc_report_date : '')
        setDiscReportTime(act_dis_report_date !== null ? DiscReportTime : '')
        setEntrytime(dis_entry_time !== null ? dis_entry_time : '')
        setActEntTime(act_dis_entry_time !== null ? act_dis_entry_time : '')
        setbilltime(dmd_date !== null ? dmd_date : '')
        setActRdytym(act_dmd_date !== null ? act_dmd_date : '')
        setFinaltime(disc_date !== null ? disc_date : '')
        setActFinal(act_disc_date !== null ? act_disc_date : '')
        setDiscStatus(act_disc_status === 1 ? true : false)
    }, [DiscReportTime])

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
            <Box sx={{ display: "flex", backgroundColor: "#f0f3f5" }}>
                <Box sx={{ flex: 1 }}>
                    <Typography sx={{ fontFamily: "Roboto", fontSize: 20, p: 1.5 }}>
                        DischargeEvents
                    </Typography>
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
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", width: "100%", pl: 2, pt: 1 }}>
                <Box sx={{ display: "flex", flexDirection: "row", width: { xl: "50%", lg: "50%", md: "50%", sm: "50%" } }}>
                    <Box sx={{ width: { xl: "30%", lg: "40%", md: "40%", sm: "49%" } }}>
                        <CssVarsProvider>
                            <Typography >
                                Discharge Type:</Typography>
                        </CssVarsProvider>
                    </Box>
                    <Box sx={{ width: { xl: "50%", lg: "55%", md: "50%", sm: "49%" }, height: 40, }}>
                        <TextFieldCustom
                            size="sm"
                            type="text"
                            name="disType"
                            value={disType}
                            onchange={getDiscType}
                        />
                    </Box>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "row", width: { xl: "50%", lg: "50%", md: "50%", sm: "50%" } }}>
                    <Box sx={{ width: { xl: "35%", lg: "48%", md: "50%", sm: "49%" } }}>
                        <CssVarsProvider>
                            <Typography >
                                Discharge Medicine Received time:</Typography>
                        </CssVarsProvider>
                    </Box>
                    <Box sx={{ width: { xl: "50%", lg: "50%", md: "49%", sm: "50%" }, height: 40, }}>
                        <TextFieldCustom
                            size="sm"
                            type="datetime-local"
                            name="disType"
                            value={medtime}
                            onchange={getmedtime}
                        />
                    </Box>
                </Box>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", width: "100%", pl: 2, pt: 1 }}>
                <Box sx={{ display: "flex", flexDirection: "row", width: "50%" }}>
                    <Box sx={{ width: { xl: "30%", lg: "40%", md: "40%", sm: "49%" } }}>
                        <CssVarsProvider>
                            <Typography >
                                Summary time:</Typography>
                        </CssVarsProvider>
                    </Box>
                    <Box sx={{ width: { xl: "50%", lg: "55%", md: "50%", sm: "49%" }, height: 40, }}>
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
                    <Box sx={{ width: { xl: "35%", lg: "48%", md: "50%", sm: "49%" } }}>
                        <CssVarsProvider>
                            <Typography >
                                Discharge medicine indent time:</Typography>
                        </CssVarsProvider>
                    </Box>
                    <Box sx={{ width: { xl: "50%", lg: "50%", md: "49%", sm: "50%" }, height: 40, }}>
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
                    <Box sx={{ width: { xl: "30%", lg: "40%", md: "40%", sm: "49%" } }}>
                        <CssVarsProvider>
                            <Typography >
                                Discharge Anounced date:</Typography>
                        </CssVarsProvider>
                    </Box>
                    <Box sx={{ width: { xl: "50%", lg: "55%", md: "50%", sm: "49%" }, height: 40, }}>
                        <TextFieldCustom
                            size="sm"
                            type="datetime-local"
                            name="distime"
                            value={distime}
                            onchange={getdisTime}
                        />
                    </Box>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "row", width: "50%" }}>
                    <Box sx={{ width: { xl: "35%", lg: "48%", md: "50%", sm: "49%" } }}>
                        <CssVarsProvider>
                            <Typography > Actual time:
                            </Typography>
                        </CssVarsProvider>
                    </Box>
                    <Box sx={{ width: { xl: "50%", lg: "50%", md: "49%", sm: "50%" }, height: 40, }}>
                        <TextFieldCustom
                            size="sm"
                            type="datetime-local"
                            name="DiscReportTime"
                            value={DiscReportTime}
                            onchange={getActReport}
                        />
                    </Box>
                </Box>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", width: "100%", pl: 2, pt: 1 }}>
                <Box sx={{ display: "flex", flexDirection: "row", width: "50%" }}>
                    <Box sx={{ width: { xl: "30%", lg: "40%", md: "40%", sm: "49%" } }}>
                        <CssVarsProvider>
                            <Typography >
                                Discharge entry time:</Typography>
                        </CssVarsProvider>
                    </Box>
                    <Box sx={{ width: { xl: "50%", lg: "55%", md: "50%", sm: "49%" }, height: 40, }}>
                        <TextFieldCustom
                            size="sm"
                            type="datetime-local"
                            name="entryTime"
                            value={entryTime}
                            onchange={getDiscEntTime}
                        />
                    </Box>

                </Box>
                <Box sx={{ display: "flex", flexDirection: "row", width: "50%" }}>
                    <Box sx={{ width: { xl: "35%", lg: "48%", md: "50%", sm: "49%" } }}>
                        <CssVarsProvider>
                            <Typography> Actual entry time:
                            </Typography>
                        </CssVarsProvider>
                    </Box>
                    <Box sx={{ width: { xl: "50%", lg: "50%", md: "49%", sm: "50%" }, height: 40, }}>
                        <TextFieldCustom
                            size="sm"
                            type="datetime-local"
                            name="ActEntTime"
                            value={ActEntTime}
                            onchange={getActEntTime}
                        />
                    </Box>
                </Box>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", width: "100%", pl: 2, pt: 1 }}>
                <Box sx={{ display: "flex", flexDirection: "row", width: "50%" }}>
                    <Box sx={{ width: { xl: "30%", lg: "40%", md: "40%", sm: "49%" } }}>
                        <CssVarsProvider>
                            <Typography >
                                Final bill ready time:</Typography>
                        </CssVarsProvider>
                    </Box>
                    <Box sx={{ width: { xl: "50%", lg: "55%", md: "50%", sm: "49%" }, height: 40, }}>
                        <TextFieldCustom
                            size="sm"
                            type="datetime-local"
                            name="billtime"
                            value={billtime}
                            onchange={getbilltime}
                        />
                    </Box>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "row", width: "50%" }}>
                    <Box sx={{ width: { xl: "35%", lg: "48%", md: "50%", sm: "49%" } }}>
                        <CssVarsProvider>
                            <Typography>
                                Actual Ready time:
                            </Typography>
                        </CssVarsProvider>
                    </Box>
                    <Box sx={{ width: { xl: "50%", lg: "50%", md: "49%", sm: "50%" }, height: 40, }}>
                        <TextFieldCustom
                            size="sm"
                            type="datetime-local"
                            name="ActRdytym"
                            value={ActRdytym}
                            onchange={getActRdyTym}
                        />
                    </Box>
                </Box>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", width: "100%", pl: 2, pt: 1 }}>
                <Box sx={{ display: "flex", flexDirection: "row", width: "50%" }}>
                    <Box sx={{ width: { xl: "30%", lg: "40%", md: "40%", sm: "49%" } }}>
                        <CssVarsProvider>
                            <Typography >
                                Discharge time:</Typography>
                        </CssVarsProvider>
                    </Box>
                    <Box sx={{ width: { xl: "50%", lg: "55%", md: "50%", sm: "49%" }, height: 40, }}>
                        <TextFieldCustom
                            size="sm"
                            type="datetime-local"
                            name="finalTime"
                            value={finalTime}
                            onchange={getDischargeTime}
                        />
                    </Box>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "row", width: "50%" }}>
                    <Box sx={{ width: { xl: "35%", lg: "48%", md: "50%", sm: "49%" } }}>
                        <CssVarsProvider>
                            <Typography>
                                Actual Discharge time:
                            </Typography>
                        </CssVarsProvider>
                    </Box>
                    <Box sx={{ width: { xl: "50%", lg: "50%", md: "49%", sm: "50%" }, height: 40, }}>
                        <TextFieldCustom
                            size="sm"
                            type="datetime-local"
                            name="actFinal"
                            value={actFinal}
                            onchange={getActDiscTime}
                        />
                    </Box>
                </Box>
            </Box>
            <Box sx={{ display: "flex", width: "100%", pl: 2, pt: 1 }}>
                <Box sx={{ width: "50%", display: "flex", flexDirection: "row" }}>
                    <Box sx={{ width: { xl: "30%", lg: "40%", md: "40%", sm: "49%" } }}>
                        <CssVarsProvider>
                            <Typography >
                                Cross consulation if any:</Typography>
                        </CssVarsProvider>
                    </Box>
                    <Box sx={{ width: { xl: "50%", lg: "55%", md: "50%", sm: "49%" }, height: 40, }}>
                        <TextFieldCustom
                            size="sm"
                            type="text"
                            name="disType"
                            value={cross}
                            onchange={getconstation}
                        />
                    </Box>
                </Box>
                <Box sx={{ width: "50%", display: "flex", flexDirection: "row" }}>
                    <Box sx={{ width: { xl: "35%", lg: "48%", md: "50%", sm: "49%" } }}>
                        <CssVarsProvider>
                            <Typography >
                                Room clearence time:</Typography>
                        </CssVarsProvider>
                    </Box>
                    <Box sx={{ width: { xl: "50%", lg: "50%", md: "49%", sm: "50%" }, height: 40, }}>
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
            <Box sx={{ width: "100%", display: "flex", flexDirection: "row", pl: 2, pt: 1 }}>
                <Box sx={{ width: "50%", display: "flex", flexDirection: "row" }}>
                    <Box sx={{ width: { xl: "30%", lg: "40%", md: "40%", sm: "49%" }, flexDirection: "row" }}>
                        <CssVarsProvider>
                            <Typography >
                                Feedback collected:</Typography>
                        </CssVarsProvider>
                    </Box>
                    <Box sx={{ width: { xl: "50%", lg: "40%", md: "50%", sm: "49%" } }}>

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

                <Box sx={{ display: "flex", flexDirection: "row", width: "50%", }}>
                    <Box sx={{ width: { xl: "42%", lg: "48%", md: "50%", sm: "49%" } }} >
                        <CssVarsProvider>
                            <Typography>Remote:</Typography>
                        </CssVarsProvider>
                    </Box>
                    <Box sx={{
                        display: "flex", flexDirection: "row",
                        width: { xl: "78%", lg: '50%', md: "49%", sm: "50%" },
                    }}>
                        <Box sx={{ width: { xl: "22%", lg: "35%", md: "35%", sm: "40%" } }}>
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
                        <Box sx={{ width: { xl: "20%", lg: "20%", md: "30%", sm: "40%" } }} >
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
            <Box sx={{ width: { xl: "100%", lg: "100%", md: "100%", sm: "100%" }, display: "flex", flexDirection: "row", pl: 2, pt: 1 }}>
                <Box sx={{ display: "flex", width: { xl: "67.5%", lg: "74%", md: "75%", sm: "75%" } }}>
                    <CusCheckBox
                        variant="outlined"
                        color="primary"
                        size="md"
                        name="disStatus"
                        label="Actual Discharge Status"
                        value={disStatus}
                        onCheked={getDiscStatus}
                        checked={disStatus}
                        disabled={actFinal !== '' ? false : true}>
                    </CusCheckBox>
                </Box>
                <Box sx={{ display: "flex", width: { xl: "20%", lg: "26%", md: "25%", sm: "25%" } }}>
                    <Box sx={{ width: { xl: "36%", lg: "35%", md: "35%", sm: "40%" }, }}>
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
                    <Box sx={{ width: { xl: "36%", lg: "36%", md: "35%", sm: "40%" } }}>
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
            </Box>
            <Box sx={{ p: 1 }}>
                <DiscahrgeEventTable ipno={ipno} count={count} rowSelect={rowSelect} />
            </Box>
        </Paper>
    )
}

export default memo(DischargeEvent)