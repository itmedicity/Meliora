import { Box, Grid } from '@mui/material'
import React, { memo, useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import CardMaster from 'src/views/Components/CardMaster'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import { useSelector } from 'react-redux'
import UnitMasterTable from './UnitMasterTable'
import { useAllUnitMaster } from 'src/views/Diet/CommonData/UseQuery'


const formReset = {
    unit_id: '',
    unit_name: '',
    unit_code: '',
    unit_type: '',
    status: false
}

const UnitMaster = () => {

    const navigate = useNavigate()

    const {
        data: allUnits = [],
        refetch: fetchUnits
    } = useAllUnitMaster()

    const [editMode, setEditMode] = useState(false)
    const [unit, setUnit] = useState(formReset)

    const {
        unit_id,
        unit_name,
        unit_code,
        unit_type,
        status
    } = unit

    const id = useSelector(state => state.LoginUserData.empid)

    // Input Change
    const updateUnit = useCallback((e) => {

        const { name, value, type, checked } = e.target

        setUnit(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))

    }, [])

    // Form Data
    const formData = useMemo(() => ({
        ...(editMode
            ? { unit_id, updated_by: id }
            : { created_by: id }),
        unit_name,
        unit_code,
        unit_type,
        is_active: status ? 1 : 0
    }),
        [
            editMode,
            unit_id,
            unit_name,
            unit_code,
            unit_type,
            status,
            id
        ])

    // Row Select
    const rowSelect = useCallback((params) => {
        const data = params.api.getSelectedRows()[0]
        setUnit({
            unit_id: data.unit_id,
            unit_name: data.unit_name,
            unit_code: data.unit_code,
            unit_type: data.unit_type,
            status: data.is_active === 1
        })
        setEditMode(true)
    }, [])

    // Submit
    const submitUnit = useCallback(async (e) => {
        e.preventDefault()

        if (!unit_name?.trim()) return infoNotify("Please Enter Unit Name")
        if (!unit_code?.trim()) return infoNotify("Please Enter Unit Code")
        if (!unit_type?.trim()) return infoNotify("Please Enter Unit Type")

        const apiPath = editMode
            ? '/unitmaster/update'
            : '/unitmaster/insert'

        try {

            const result = editMode
                ? await axioslogin.patch(apiPath, formData)
                : await axioslogin.post(apiPath, formData)

            const { success, message } = result.data

            if (success === 1 || success === 2) {
                succesNotify(message)
                setEditMode(false)
                setUnit(formReset)
                fetchUnits()
            } else {
                infoNotify(message)
            }

        } catch (error) {
            infoNotify('Something went wrong!')
        }

    }, [editMode, formData, fetchUnits, unit_name])

    const backtoSetting = useCallback(() => navigate('/Home/Settings'), [navigate])

    const refreshWindow = useCallback(() => {
        setUnit(formReset)
        setEditMode(false)
    }, [])



    // 

    return (

        <CardMaster
            title="Unit Master"
            submit={submitUnit}
            close={backtoSetting}
            refresh={refreshWindow}>

            <Box sx={{ p: 1 }}>

                <Grid container spacing={1}>
                    <Grid item xl={4} lg={4}>

                        <Grid container spacing={1}>

                            <Grid item xl={12} lg={12}>
                                <TextFieldCustom
                                    placeholder="Unit Name"
                                    type="text"
                                    size="sm"
                                    name="unit_name"
                                    value={unit_name}
                                    onchange={updateUnit}
                                />
                            </Grid>

                            <Grid item xl={12} lg={12}>
                                <TextFieldCustom
                                    placeholder="Unit Code"
                                    type="text"
                                    size="sm"
                                    name="unit_code"
                                    value={unit_code}
                                    onchange={updateUnit}
                                />
                            </Grid>

                            <Grid item xl={12} lg={12}>
                                <TextFieldCustom
                                    placeholder="Unit Type"
                                    type="text"
                                    size="sm"
                                    name="unit_type"
                                    value={unit_type}
                                    onchange={updateUnit}
                                />
                            </Grid>

                            <Grid item lg={2} xl={2}>
                                <CusCheckBox
                                    label="Status"
                                    color="primary"
                                    size="md"
                                    name="status"
                                    checked={status}
                                    onCheked={updateUnit}
                                />
                            </Grid>

                        </Grid>

                    </Grid>

                    {/* TABLE */}

                    <Grid item lg={8} xl={8}>

                        <UnitMasterTable
                            tabledata={allUnits}
                            rowSelect={rowSelect}
                        />

                    </Grid>

                </Grid>

            </Box>

        </CardMaster>
    )
}

export default memo(UnitMaster)