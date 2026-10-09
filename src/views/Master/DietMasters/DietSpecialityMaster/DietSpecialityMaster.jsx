import { Box, Grid } from '@mui/material'
import React, { memo, useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import CardMaster from 'src/views/Components/CardMaster'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import { useSelector } from 'react-redux'
import DietSpecialityMasterTable from './DietSpecialityMasterTable'
import { useAllDietSpeciality } from 'src/views/Diet/CommonData/UseQuery'

const formReset = {
    speciality_id: '',
    speciality_name: '',
    clinical_description: '',
    applicable_condition: '',
    status: false
}

const DietSpecialityMaster = () => {

    const navigate = useNavigate()

    const {
        data: allDietSpeciality = [],
        refetch: fetchSpeciality
    } = useAllDietSpeciality()

    const [editMode, setEditMode] = useState(false)
    const [speciality, setSpeciality] = useState(formReset)

    const {
        speciality_id,
        speciality_name,
        clinical_description,
        applicable_condition,
        status
    } = speciality

    const id = useSelector(state => state.LoginUserData.empid)

    // Input Change
    const updateSpeciality = useCallback((e) => {

        const { name, value, type, checked } = e.target

        setSpeciality(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))

    }, [])

    // Form Data
    const formData = useMemo(() => ({
        ...(editMode
            ? { speciality_id, updated_by: id }
            : { created_by: id }),
        speciality_name,
        clinical_description,
        applicable_condition,
        is_active: status ? 1 : 0
    }),
        [
            editMode,
            speciality_id,
            speciality_name,
            clinical_description,
            applicable_condition,
            status,
            id
        ])

    // Row Select
    const rowSelect = useCallback((params) => {

        const data = params.api.getSelectedRows()[0]

        setSpeciality({
            speciality_id: data.speciality_id,
            speciality_name: data.speciality_name,
            clinical_description: data.clinical_description,
            applicable_condition: data.applicable_condition,
            status: data.is_active === 1
        })

        setEditMode(true)

    }, [])

    // Submit
    const submitSpeciality = useCallback(async (e) => {

        e.preventDefault()

        if (!speciality_name?.trim()) {
            infoNotify("Please Enter Speciality Name")
            return
        }

        const apiPath = editMode
            ? '/dietspeciality/update'
            : '/dietspeciality/insert'

        try {

            const result = editMode
                ? await axioslogin.patch(apiPath, formData)
                : await axioslogin.post(apiPath, formData)

            const { success, message } = result.data

            if (success === 1 || success === 2) {
                succesNotify(message)
                setEditMode(false)
                setSpeciality(formReset)
                fetchSpeciality()
            } else {
                infoNotify(message)
            }

        } catch (error) {
            infoNotify('Something went wrong!')
        }

    }, [editMode, formData, fetchSpeciality, speciality_name])

    const backtoSetting = useCallback(() => navigate('/Home/Settings'), [navigate])

    const refreshWindow = useCallback(() => {
        setSpeciality(formReset)
        setEditMode(false)
    }, [])

    return (

        <CardMaster
            title="Diet Speciality Master"
            submit={submitSpeciality}
            close={backtoSetting}
            refresh={refreshWindow}
        >

            <Box sx={{ p: 1 }}>

                <Grid container spacing={1}>

                    {/* FORM */}

                    <Grid item xl={4} lg={4}>

                        <Grid container spacing={1}>

                            <Grid item xl={12} lg={12}>
                                <TextFieldCustom
                                    placeholder="Speciality Name"
                                    type="text"
                                    size="sm"
                                    name="speciality_name"
                                    value={speciality_name}
                                    onchange={updateSpeciality}
                                />
                            </Grid>

                            <Grid item xl={12} lg={12}>
                                <TextFieldCustom
                                    placeholder="Clinical Description"
                                    type="text"
                                    size="sm"
                                    name="clinical_description"
                                    value={clinical_description}
                                    onchange={updateSpeciality}
                                />
                            </Grid>

                            <Grid item xl={12} lg={12}>
                                <TextFieldCustom
                                    placeholder="Applicable Condition"
                                    type="text"
                                    size="sm"
                                    name="applicable_condition"
                                    value={applicable_condition}
                                    onchange={updateSpeciality}
                                />
                            </Grid>

                            <Grid item lg={2} xl={2}>
                                <CusCheckBox
                                    label="Status"
                                    color="primary"
                                    size="md"
                                    name="status"
                                    checked={status}
                                    onCheked={updateSpeciality}
                                />
                            </Grid>

                        </Grid>

                    </Grid>


                    {/* TABLE */}

                    <Grid item lg={8} xl={8}>

                        <DietSpecialityMasterTable
                            tabledata={allDietSpeciality}
                            rowSelect={rowSelect}
                        />

                    </Grid>

                </Grid>

            </Box>

        </CardMaster>
    )
}

export default memo(DietSpecialityMaster)