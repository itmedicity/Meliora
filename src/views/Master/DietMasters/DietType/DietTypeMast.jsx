import { Box, Grid } from '@mui/material'
import React, { useMemo, useState } from 'react'
import CardMaster from 'src/views/Components/CardMaster'
import DietTypeMastTable from './DietTypeMastTable'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import { useHistory } from 'react-router-dom'
import { useCallback } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import moment from 'moment'
const DietTypeMast = () => {
    const history = useHistory();
    const [count, setCount] = useState(0);
    const [value, setValue] = useState(0)
    const [diettype, setDiettype] = useState({
        type_slno: '',
        type_desc: '',
        start_time: '',
        end_time: '',
        status: false
    })
    const { type_slno, type_desc, start_time, end_time, status } = diettype
    // const [date, setDate] = useState("2019/10/09")
    // console.log(date)
    const updateDiettype = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setDiettype({ ...diettype, [e.target.name]: value })

    }, [diettype])

    // const dateTime = moment().startOf(start_time).add(date)
    // console.log(dateTime)

    const postData = useMemo(() => {
        return {
            type_desc: type_desc,
            start_time: start_time,
            end_time: end_time,
            status: status === true ? 1 : 0,
            em_id: 1
        }
    }, [type_desc, start_time, end_time, status])
    const rowSelect = useCallback((params) => {
        setValue(1)
        const data = params.api.getSelectedRows()
        console.log(data)
        const { type_slno, type_desc, start_time, end_time, status } = data[0];
        const frmdata = {
            type_desc: type_desc,
            start_time: start_time,
            end_time: end_time,
            status: status === 1 ? true : false,
            type_slno: type_slno
        }

        setDiettype(frmdata)
    }, [])
    // console.log(diettype)

    const patchdata = useMemo(() => {
        return {

            type_desc: type_desc,
            start_time: moment(start_time).format('yyyy-dd-mm hh.mm.ss'),
            end_time: moment(end_time).format('yyyy-dd-mm hh.mm.ss'),
            status: status === true ? 1 : 0,
            type_slno: type_slno


        }
    }, [type_desc, start_time, end_time, status, type_slno])


    const submitDiettype = useCallback((e) => {
        e.preventDefault();
        console.log(postData)
        const formReset = {
            type_desc: '',
            start_time: '',
            end_time: '',
            status: false
        }

        const InsertData = async (postData) => {
            const result = await axioslogin.post(`/diettype`, postData)
            const { message, success } = result.data;
            if (success === 1) {
                succesNotify(message)
                setCount(count + 1)
                setDiettype(formReset)
            } else if (success === 0) {
                infoNotify(message)
            }
            else {
                infoNotify(message)
            }
        }
        const updateData = async (patchdata) => {
            // console.log(patchdata)

            const result = await axioslogin.patch('/diettype/update', patchdata)
            const { message, success } = result.data;
            if (success === 1) {
                succesNotify(message)
                setCount(count + 1)
                setValue(0)
                setDiettype(formReset);
            } else if (success === 0) {
                infoNotify(message)

            } else {
                infoNotify(message)
            }
        }

        if (value === 0) {
            InsertData(postData)
        }
        else {
            updateData(patchdata)
        }


    }, [value, postData, count, patchdata])

    //Close function
    const backToSettings = useCallback(() => {
        history.push(`/Home/Settings`)
    }, [history])

    //Refresh function
    const refreshWindow = useCallback(() => {
        const formReset = {
            type_desc: '',
            start_time: '',
            end_time: '',
            status: false
        }
        setDiettype(formReset)

    }, [setDiettype])


    return (

        <CardMaster title="Diet Type Master"
            submit={submitDiettype}
            refresh={refreshWindow}
            close={backToSettings}>
            <Box sx={{ p: 1 }}>
                <Grid container spacing={1}>
                    <Grid item xl={4} lg={4}>
                        <Grid container spacing={1}>
                            <Grid item xl={12} lg={12}>
                                <TextFieldCustom
                                    placeholder="Diet Type"
                                    type="text"
                                    size="sm"
                                    name="type_desc"
                                    value={type_desc}
                                    onchange={updateDiettype} />
                            </Grid>
                            <Grid item xl={12} lg={12}>
                                <Grid container spacing={1}>
                                    <Grid item xl={6} lg={6}>
                                        <TextFieldCustom
                                            placeholder="Start time"
                                            type="datetime-local"
                                            size="sm"
                                            name="start_time"
                                            value={start_time}
                                            onchange={updateDiettype} />
                                    </Grid>
                                    <Grid item xl={6} lg={6}>
                                        <TextFieldCustom
                                            placeholder="End time"
                                            type="datetime-local"
                                            size="sm"
                                            name="end_time"
                                            value={end_time}
                                            onchange={updateDiettype} />
                                    </Grid>
                                </Grid>
                            </Grid>



                            <Grid item xl={12} lg={12}>
                                <CusCheckBox
                                    label="Status"
                                    color="primary"
                                    size="md"
                                    name="status"
                                    value={status}
                                    checked={status}
                                    onCheked={updateDiettype}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xl={8} lg={8}>
                        <DietTypeMastTable count={count} rowSelect={rowSelect} />
                    </Grid>
                </Grid>
            </Box>
        </CardMaster>
    )
}
export default DietTypeMast