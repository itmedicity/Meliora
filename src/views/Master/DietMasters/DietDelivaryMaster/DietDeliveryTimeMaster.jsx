import React, { memo, useCallback, useMemo, useState } from 'react'
import { Box } from '@mui/joy'
import { Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import CardMaster from 'src/views/Components/CardMaster'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import SelectDietType from 'src/views/CommonSelectCode/SelectDietType'
import DietDeliveryTimeMasterTable from './DietDeliveryTimeMasterTable'
import { axioslogin } from 'src/views/Axios/Axios'
import { errorNotify, infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import { toDateTime } from 'src/views/Diet/Helpers/HelperFunction'
import { useDietDeliveryTime } from 'src/views/Diet/CommonData/UseQuery'

const DietDeliveryTimeMaster = () => {

    const navigate = useNavigate()
    const empid = useSelector(state => state.LoginUserData.empid)

    const [editMode, setEditMode] = useState(false)

    const [formData, setFormData] = useState({
        slno: 0,
        dietType: '',
        fromTime: '',
        toTime: '',
        status: true
    })

    const { slno, dietType, fromTime, toTime, status } = formData;

    const { data: DietDeliveryTime = [], refetch: FetchDeliveryTimeDetail } = useDietDeliveryTime();

    // FIELD UPDATE HANDLER
    const updateField = useCallback((e) => {
        const { name, type, value, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }, [])

    // RESET FORM
    const reset = useCallback(() => {
        setFormData(prev => ({
            ...prev,          // keep current fromTime and toTime
            slno: 0,
            dietType: '',
            status: true
        }))
        setEditMode(false)
    }, [])


    // NAVIGATION 
    const backtoSetting = useCallback(() => {
        navigate('/Home/Settings')
    }, [navigate])


    // POST PAYLOAD (INSERT)

    const postData = useMemo(() => ({
        diet_type_slno: dietType,
        diet_del_from_time: toDateTime(fromTime),
        diet_del_to_time: toDateTime(toTime),
        diet_del_status: status ? 1 : 0,
        create_user: empid
    }), [dietType, fromTime, toTime, status, empid])


    // PATCH PAYLOAD (UPDATE)

    const patchData = useMemo(() => ({
        diet_del_time_slno: slno,
        diet_type_slno: dietType,
        diet_del_from_time: toDateTime(fromTime),
        diet_del_to_time: toDateTime(toTime),
        diet_del_status: status ? 1 : 0,
        edit_user: empid
    }), [slno, dietType, fromTime, toTime, status, empid])



    // SUBMIT HANDLER
    const handleSubmit = useCallback(async (e) => {
        e.preventDefault()

        if (!dietType)
            return warningNotify('Select Diet Type')

        if (!fromTime || !toTime)
            return warningNotify('Select Time Range')

        if (fromTime >= toTime)
            return warningNotify('Invalid Time Range')

        try {
            const result = editMode
                ? await axioslogin.patch('/kotitem/updatedietdelivery', patchData)
                : await axioslogin.post('/kotitem/insertdietdelivery', postData)

            const { success, message } = result.data

            if (success === 1 || success === 2) {
                succesNotify(message)
                reset()
                FetchDeliveryTimeDetail()
            } else {
                infoNotify(message)
            }
        } catch (error) {
            console.error(error)
            errorNotify('Error while saving data')
        }
    }, [dietType, fromTime, toTime, editMode, postData, patchData, reset, FetchDeliveryTimeDetail])


    // ROW SELECT (EDIT)

    const RowSelect = useCallback((row) => {
        setFormData({
            slno: row.diet_del_time_slno,
            dietType: row.diet_type_slno, // for dropdown select
            fromTime: row.from_time,       // "HH:mm"
            toTime: row.to_time,           // "HH:mm"
            status: row.diet_del_status === 1
        })
        setEditMode(true)
    }, [])




    return (
        <CardMaster
            title="Diet Delivery Time Master"
            submit={handleSubmit}
            close={backtoSetting}
            refresh={reset}
        >
            <Box sx={{ p: 1 }}>
                <Grid container spacing={1}>

                    {/* LEFT FORM */}
                    <Grid item xl={4} lg={4}>
                        <Grid container spacing={1}>
                            <Grid item xl={6}>
                                <TextFieldCustom
                                    type="time"
                                    label="From Time"
                                    name="fromTime"
                                    value={fromTime}
                                    onchange={updateField}
                                />
                            </Grid>

                            <Grid item xl={6}>
                                <TextFieldCustom
                                    type="time"
                                    label="To Time"
                                    name="toTime"
                                    value={toTime}
                                    onchange={updateField}
                                />
                            </Grid>
                            <Grid item xl={12}>
                                <SelectDietType
                                    value={dietType}
                                    setValue={(val) =>
                                        setFormData(prev => ({
                                            ...prev,
                                            dietType: val
                                        }))
                                    }
                                />
                            </Grid>



                            <Grid item xl={12}>
                                <CusCheckBox
                                    label="Status"
                                    name="status"
                                    checked={status}
                                    onCheked={updateField}
                                />
                            </Grid>

                        </Grid>
                    </Grid>

                    {/* RIGHT TABLE */}
                    <Grid item xl={8} lg={8}>
                        <DietDeliveryTimeMasterTable
                            tableData={DietDeliveryTime}   // hook data goes here
                            rowSelect={RowSelect}
                        />
                    </Grid>

                </Grid>
            </Box>
        </CardMaster>
    )
}

export default memo(DietDeliveryTimeMaster)
