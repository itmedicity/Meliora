import { Paper } from '@material-ui/core'
import { CssVarsProvider } from '@mui/joy'
import { Box, Typography } from '@mui/material'
import React, { memo } from 'react'
import { useCallback } from 'react'
import { useState } from 'react'
import CustomTextarea from '../../Components/CustomTextarea'
import TextFieldCustom from '../../Components/TextFieldCustom'
import CustomeToolTip from '../../Components/CustomeToolTip';
import CusIconButton from '../../Components/CusIconButton';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import { useMemo } from 'react'
import moment from 'moment'
import { axioslogin } from '../../Axios/Axios'
import { infoNotify, succesNotify, warningNotify } from '../../Common/CommonCode'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import PatientIntactionTable from './PatientIntactionTable'


const PatientIntraction = ({ ipno }) => {
    const [parti, setparti] = useState('')
    const [status, setstatus] = useState('')
    const [Remarks, setremarks] = useState('')
    const [dates, setdates] = useState("")
    const [count, setCount] = useState(0);
    const [value, setvalue] = useState()
    const [intraction, setintraction] = useState({
        inter_remark_slno: '',
        submit_employee: ''

    })
    const { inter_remark_slno } = intraction

    const getparticular = useCallback((e) => {
        setparti(e.target.value)
    }, [])
    const getstatus = useCallback((e) => {
        setstatus(e.target.value)
    }, [])
    const getRemark = useCallback((e) => {
        setremarks(e.target.value)
    }, [])
    const getDates = useCallback((e) => {
        setdates(e.target.value)
    }, [])

    const rowSelect = useCallback((params) => {
        setvalue(1)
        const data = params.api.getSelectedRows()
        const { inter_remark_slno, particular, status, remarks, remark_date } = data[0]
        const frmdata = {
            inter_remark_slno: inter_remark_slno

        }
        setintraction(frmdata)
        setparti(particular)
        setstatus(status)
        setdates(remark_date === null ? '' : remark_date)
        setremarks(remarks)

    }, [])

    const emid = useSelector((state) => {
        return state.LoginUserData.empid
    })

    const reset = () => {
        setparti('')
        setstatus('')
        setremarks('')
        setdates('')
    }

    const [id, setid] = useState(0)

    useEffect(() => {
        const getsurvno = async () => {
            const results = await axioslogin.get(`/WeWork/slnobyip/${ipno}`)
            const { success, data, message } = results.data
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
        getsurvno(ipno);
    }, [ipno])

    const postData = useMemo(() => {
        return {
            surv_slno: id,
            remark_date: dates !== '' ? moment(dates).format('YYYY-MM-DD hh:mm:ss') : null,
            particular: parti,
            status: status,
            remarks: Remarks,
            submit_employee: emid
        }
    }, [dates, parti, status, Remarks, emid, id])

    const patchdata = useMemo(() => {
        return {
            remark_date: dates !== '' ? moment(dates).format('YYYY-MM-DD hh:mm:ss') : null,
            particular: parti,
            status: status,
            remarks: Remarks,
            submit_employee: emid,
            inter_remark_slno: inter_remark_slno
        }

    }, [dates, parti, status, Remarks, emid, inter_remark_slno])

    const submited = useCallback((e) => {
        e.preventDefault();
        const InsertData = async (postData) => {
            const result = await axioslogin.post(`/WeWork/intraction`, postData)
            const { message, success } = result.data;
            if (success === 1) {
                succesNotify(message)
                setCount(count + 1)
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
            const results = await axioslogin.patch(`/WeWork/patintraction`, patchdata)
            const { message, success } = results.data;
            if (success === 2) {
                succesNotify(message)
                setCount(count + 1)
                reset();

            }
            else if (success === 1) {
                infoNotify(message)
            }
            else {
                infoNotify(message)
            }
        }
        if (value !== 1) {
            InsertData(postData)
        }

        else {
            Updatedata(patchdata)
        }
    }, [postData, patchdata, value, count])

    return (
        <Paper square elevation={0} sx={{ dispaly: "flex", p: 2, }}>
            <Box sx={{ pb: 1 }}>
                <Typography sx={{ fontStyle: "oblique", fontWeight: 800, color: '#94B7FC', textAlign: "center", fontSize: 20 }}>
                    Patient Intraction
                </Typography>
            </Box>
            <Box sx={{ display: "flex", p: 2, width: "50%" }}>
                <Box sx={{ width: { xl: "20%", lg: "30%", md: "30%", sm: "40%" } }}  >
                    <CssVarsProvider>
                        <Typography >
                            Date</Typography>
                    </CssVarsProvider>
                </Box>
                <Box sx={{ width: { xl: "30%", lg: "30%", md: "60%", sm: "60%" } }}>
                    <TextFieldCustom
                        size="sm"
                        type="datetime-local"
                        name="dates"
                        value={dates}
                        onchange={getDates}
                    />
                </Box>
            </Box>
            <Box sx={{ p: 1 }} >
                <Box sx={{ display: "flex", flexDirection: "row", width: "100%", p: 1 }}>
                    <Box sx={{ width: { xl: "10%", lg: "15%", md: "15%", sm: "20%" } }}>
                        <CssVarsProvider>
                            <Typography >
                                Particular</Typography>
                        </CssVarsProvider>
                    </Box>

                    <Box sx={{ display: "flex", width: { xl: "70%", lg: "90%", md: "90%", sm: "80%" } }}>
                        <CustomTextarea
                            size="sm"
                            type="text"
                            name="time"
                            style={{ height: 50, width: '100%' }}
                            value={parti}
                            onchange={getparticular}

                        />
                    </Box>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "row", width: "100%", p: 1, }}>
                    <Box sx={{ width: { xl: "10%", lg: "15%", md: "15%", sm: "20%" } }}>
                        <CssVarsProvider>
                            <Typography >
                                Status</Typography>
                        </CssVarsProvider>
                    </Box>

                    <Box sx={{ display: "flex", width: { xl: "70%", lg: "90%", md: "90%", sm: "80%" }, }}>
                        <CustomTextarea
                            size="sm"
                            type="text"
                            name="time"
                            style={{ height: 40, width: "100%" }}
                            value={status}
                            onchange={getstatus}
                        />
                    </Box>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "row", width: "100%", p: 1 }}>
                    <Box sx={{ width: { xl: "10%", lg: "15%", md: "15%", sm: "20%" } }}>
                        <CssVarsProvider>
                            <Typography >
                                Remarks</Typography>
                        </CssVarsProvider>
                    </Box>

                    <Box sx={{ display: "flex", width: { xl: "70%", lg: "90%", md: "90%", sm: "80%" } }}>
                        <CustomTextarea
                            size="sm"
                            type="text"
                            name="time"
                            style={{ height: 50, width: 1500 }}
                            value={Remarks}
                            onchange={getRemark}
                        />
                    </Box>
                </Box>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", pl: 1 }}>
                <CustomeToolTip title="Save" placement="left" >
                    <Box sx={{ p: 1 }}>
                        <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={submited}>
                            <LibraryAddIcon fontSize='small' />
                        </CusIconButton>
                    </Box>
                </CustomeToolTip>

            </Box>

            <Box sx={{ px: 2, py: 1 }}>
                <PatientIntactionTable ipno={ipno} count={count} rowSelect={rowSelect} />
            </Box>
        </Paper >
    )
}

export default memo(PatientIntraction)