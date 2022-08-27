import { Box, Grid } from '@mui/material'
import moment from 'moment'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import SelectDiet from 'src/views/CommonSelectCode/SelectDiet'
import SelectDietType from 'src/views/CommonSelectCode/SelectDietType'
import CardMaster from 'src/views/Components/CardMaster'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import DietdetlTable from './DietdetlTable'

const DietDetailMast = () => {
    const history = useHistory();
    //state for table rendering
    const [count, setCount] = useState(0);
    //state for edit
    const [value, setValue] = useState(0)
    //intializing
    const [diet, setdiet] = useState(0)
    const [diettype, setdiettype] = useState(0)
    const [starttime, setstatrt] = useState('')
    const [endtime, setEnd] = useState('')
    const [dietdetl, setdietdetl] = useState({
        status: false,
        em_id: '',
        diet_dtslno: 0
    })
    //destructuring
    const { status, em_id, diet_dtslno } = dietdetl
    const updateDiettype = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setdietdetl({ ...dietdetl, [e.target.name]: value })
    }, [dietdetl])
    useEffect(() => {
        if (diettype !== 0) {
            const getdate = async (diettype) => {
                const result = await axioslogin.get(`/dietdetl/date/${diettype}`,)
                const { data, success } = result.data;
                if (success == 1) {
                    const { start_time, end_time } = data[0]

                    setstatrt(moment(start_time).format(' HH: mm: ss'))
                    setEnd(moment(end_time).format(' HH: mm: ss'))
                }
            }
            getdate(diettype)
        }
    }, [diettype])

    //insert data
    const postData = useMemo(() => {
        return {
            diet_slno: diet,
            type_slno: diettype,
            status: status === true ? 1 : 0,
            em_id: 1,
            diet_dtslno: diet_dtslno
        }
    }, [diet, diettype, starttime, endtime, status, em_id, diet_dtslno])

    //data set for edit  
    const rowSelect = useCallback((params) => {
        setValue(1)
        const data = params.api.getSelectedRows()
        const { diet_dtslno, diet_slno, type_slno, start_time, end_time, status, em_id } = data[0];
        const frmdata = {
            start_time: moment(start_time).format('YYYY-MM-DD HH:MM:SS'),
            end_time: moment(end_time).format('YYYY-MM-DD HH:MM:SS'),
            status: status === 1 ? true : false,
            em_id: em_id,
            diet_dtslno: diet_dtslno,
        }
        setdietdetl(frmdata)
        setdiet(diet_slno)
        setdiettype(type_slno)
        setstatrt(start_time)
        setEnd(end_time)
    }, [])

    //update data
    const patchdata = useMemo(() => {
        return {
            diet_slno: diet,
            type_slno: diettype,
            status: status === true ? 1 : 0,
            em_id: em_id,
            diet_dtslno: diet_dtslno
        }
    }, [diet, diettype, status, em_id, diet_dtslno])

    /*** usecallback function for form submitting */
    const submitDiettype = useCallback((e) => {
        e.preventDefault();
        const formReset = {
            status: false,
            em_id: ''
        }
        /*** * insert function for use call back     */
        const Insertdietdetl = async (postData) => {
            const result = await axioslogin.post(`/dietdetl/insert`, postData)
            const { message, success } = result.data;
            if (success === 1) {
                succesNotify(message)
                setCount(count + 1)
                setdietdetl(formReset)
                setdiet(0)
                setdiettype(0)
                setstatrt('')
                setEnd('')

            } else if (success === 0) {
                infoNotify(message)
            }
            else {
                infoNotify(message)
            }
        }
        /***  * update function for use call back     */
        const updatedietdetl = async (patchdata) => {
            const result = await axioslogin.patch('/dietdetl/update/dietdetl', patchdata)
            const { message, success } = result.data;
            if (success === 1) {
                setCount(count + 1)
                setdietdetl(formReset)
                setValue(0)
                succesNotify(message)
                setdiet(0)
                setdiettype(0)
                setstatrt('')
                setEnd('')
            } else if (success === 0) {
                infoNotify(message)
            } else {
                infoNotify(message)
            }
        }
        if (value === 0) {
            Insertdietdetl(postData)
        }
        else {
            updatedietdetl(patchdata)
        }
    }, [value, postData, count, patchdata])
    //Close function
    const backToSettings = useCallback(() => {
        history.push(`/Home/Settings`)
    }, [history])
    //Refresh function
    const refreshWindow = useCallback(() => {
        const formReset = {
            diet_slno: '',
            type_slno: '',
            em_id: '',
            status: false
        }
        setdietdetl(formReset)
        setValue(0)
        setdiet(0)
        setdiettype(0)
        setstatrt('')
        setEnd('')
    }, [setdietdetl])

    return (
        <CardMaster
            title="Item Master"
            submit={submitDiettype}
            close={backToSettings}
            refresh={refreshWindow}
        >
            <Box sx={{ p: 1 }}>
                <Grid container spacing={1} >
                    <Grid item xl={4} lg={4}  >
                        <Grid container spacing={1} >
                            <Grid item xl={12} lg={12} >
                                <SelectDiet value={diet} setValue={setdiet} />
                            </Grid>
                            <Grid item xl={12} lg={12} >
                                <SelectDietType value={diettype} setValue={setdiettype} />
                            </Grid>
                            <Grid item xl={6} lg={6} >
                                <TextFieldCustom
                                    placeholder="start Date"
                                    type="timelocal"
                                    size="sm"
                                    name="starttime"
                                    value={starttime}
                                    onchange={updateDiettype}
                                />
                            </Grid>
                            <Grid item xl={6} lg={6} >
                                <TextFieldCustom
                                    placeholder="End time"
                                    type="time-local"
                                    size="sm"
                                    name="endtime"
                                    value={endtime}
                                    onchange={updateDiettype}
                                />
                            </Grid>
                            <Grid item lg={2} xl={2}>
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
                    <Grid item lg={8} xl={8} >
                        <DietdetlTable count={count} rowSelect={rowSelect} />
                    </Grid>
                </Grid>
            </Box>
        </CardMaster>
    )
}

export default DietDetailMast