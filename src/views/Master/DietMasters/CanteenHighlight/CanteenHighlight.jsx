import { Box, Grid } from '@mui/material'
import React, { memo, useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'

import CardMaster from 'src/views/Components/CardMaster'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'

import HighlightMasterTable from './HighlightMasterTable'
import { useAllHighlightMaster } from 'src/views/Diet/CommonData/UseQuery'

const formReset = {
    highlight_type_id: '',
    highlight_code: '',
    highlight_name: '',
    description: '',
    icon: '',
    color_code: '',
    status: true
}

const CanteenHighlight = () => {

    const navigate = useNavigate()

    const {
        data: allHighlights = [],
        refetch: fetchHighlights
    } = useAllHighlightMaster()

    const [editMode, setEditMode] = useState(false)

    const [highlight, setHighlight] = useState(formReset)

    const {
        highlight_type_id,
        highlight_code,
        highlight_name,
        description,
        icon,
        color_code,
        status
    } = highlight

    const id = useSelector(state => state.LoginUserData.empid)

    // INPUT CHANGE

    const updateHighlight = useCallback((e) => {

        const { name, value, type, checked } = e.target

        setHighlight((prev) => ({
            ...prev,
            [name]: type === 'checkbox'
                ? checked
                : value
        }))

    }, [])

    // FORM DATA

    const formData = useMemo(() => ({

        ...(editMode
            ? {
                highlight_type_id,
                updated_by: id
            }
            : {
                created_by: id
            }),

        highlight_code,
        highlight_name,
        description,
        icon,
        color_code,
        active_status: status ? 1 : 0

    }), [
        editMode,
        highlight_type_id,
        highlight_code,
        highlight_name,
        description,
        icon,
        color_code,
        status,
        id
    ])

    // ROW SELECT

    const rowSelect = useCallback((params) => {

        const data = params.api.getSelectedRows()[0]

        setHighlight({
            highlight_type_id: data.highlight_type_id,
            highlight_code: data.highlight_code,
            highlight_name: data.highlight_name,
            description: data.description,
            icon: data.icon,
            color_code: data.color_code,
            status: data.active_status === 1
        })

        setEditMode(true)

    }, [])

    // SUBMIT

    const submitHighlight = useCallback(async (e) => {

        e.preventDefault()

        if (!highlight_name?.trim()) {
            return infoNotify("Please Enter Highlight Name")
        }

        if (!highlight_code?.trim()) {
            return infoNotify("Please Enter Highlight Code")
        }

        if (!icon?.trim()) {
            return infoNotify("Please Enter Icon")
        }

        if (!color_code?.trim()) {
            return infoNotify("Please Enter Color Code")
        }

        const apiPath = editMode
            ? '/highlight/update-highlight-type'
            : '/highlight/highlight-type'

        try {

            const result = editMode
                ? await axioslogin.patch(apiPath, formData)
                : await axioslogin.post(apiPath, formData)

            const { success, message } = result.data

            if (success === 1 || success === 2) {

                succesNotify(message)

                setHighlight(formReset)

                setEditMode(false)

                fetchHighlights()

            } else {

                infoNotify(message)

            }

        } catch (error) {

            infoNotify("Something Went Wrong")

        }

    }, [
        editMode,
        formData,
        fetchHighlights,
        highlight_name,
        highlight_code,
        icon,
        color_code
    ])

    // BACK

    const backtoSetting = useCallback(() => {

        navigate('/Home/Settings')

    }, [navigate])

    // REFRESH

    const refreshWindow = useCallback(() => {

        setHighlight(formReset)

        setEditMode(false)

    }, [])

    return (

        <CardMaster
            title="Highlight Master"
            submit={submitHighlight}
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
                                    placeholder="Highlight Name"
                                    type="text"
                                    size="sm"
                                    name="highlight_name"
                                    value={highlight_name}
                                    onchange={updateHighlight}
                                />

                            </Grid>

                            <Grid item xl={12} lg={12}>

                                <TextFieldCustom
                                    placeholder="Highlight Code"
                                    type="text"
                                    size="sm"
                                    name="highlight_code"
                                    value={highlight_code}
                                    onchange={updateHighlight}
                                />

                            </Grid>

                            <Grid item xl={12} lg={12}>

                                <TextFieldCustom
                                    placeholder="Description"
                                    type="text"
                                    size="sm"
                                    name="description"
                                    value={description}
                                    onchange={updateHighlight}
                                />

                            </Grid>

                            <Grid item xl={12} lg={12}>

                                <TextFieldCustom
                                    placeholder="Icon Name"
                                    type="text"
                                    size="sm"
                                    name="icon"
                                    value={icon}
                                    onchange={updateHighlight}
                                />

                            </Grid>

                            <Grid item xl={12} lg={12}>

                                <TextFieldCustom
                                    placeholder="Color Code (#FF5733)"
                                    type="text"
                                    size="sm"
                                    name="color_code"
                                    value={color_code}
                                    onchange={updateHighlight}
                                />

                            </Grid>

                            <Grid item xl={3} lg={3}>

                                <CusCheckBox
                                    label="Status"
                                    color="primary"
                                    size="md"
                                    name="status"
                                    checked={status}
                                    onCheked={updateHighlight}
                                />

                            </Grid>

                        </Grid>

                    </Grid>

                    {/* TABLE */}

                    <Grid item xl={8} lg={8}>

                        <HighlightMasterTable
                            tabledata={allHighlights}
                            rowSelect={rowSelect}
                        />

                    </Grid>

                </Grid>

            </Box>

        </CardMaster>
    )
}

export default memo(CanteenHighlight)