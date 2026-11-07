import { Box, Grid } from '@mui/material'
import React, { memo, useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import CardMaster from 'src/views/Components/CardMaster'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import { useSelector } from 'react-redux'
import DietTemplateTable from './DietTemplateTable'
import { useAllDietTemplate } from 'src/views/Diet/CommonData/UseQuery'
import SelectPatientDiet from 'src/views/CommonSelectCode/SelectPatientDiet'


const formReset = {
    template_id: '',
    diet_id: '',
    template_name: '',
    version_no: '',
    effective_from: '',
    effective_to: '',
    status: false
}

const DietTemplate = () => {

    const navigate = useNavigate()

    const {
        data: allTemplate = [],
        refetch: fetchTemplate
    } = useAllDietTemplate()

    const [editMode, setEditMode] = useState(false)
    const [templatedata, setTemplateData] = useState({ ...formReset })

    const {
        template_id,
        diet_id,
        template_name,
        version_no,
        effective_from,
        effective_to,
        status
    } = templatedata

    const id = useSelector(state => state.LoginUserData.empid)

    const updateTemplateData = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        setTemplateData({ ...templatedata, [e.target.name]: value })
    }, [templatedata])

    const formData = useMemo(() => ({
        ...(editMode
            ? { template_id, updated_by: id }
            : { created_by: id }),
        diet_id,
        template_name,
        version_no,
        effective_from,
        effective_to,
        is_active: status ? 1 : 0
    }), [
        editMode,
        template_id,
        diet_id,
        template_name,
        version_no,
        effective_from,
        effective_to,
        status,
        id
    ])

    const rowSelect = useCallback((params) => {

        const data = params.api.getSelectedRows()[0]

        setTemplateData({
            template_id: data.template_id,
            diet_id: data.diet_id,
            template_name: data.template_name,
            version_no: data.version_no,
            effective_from: data.effective_from,
            effective_to: data.effective_to,
            status: data.is_active === 1
        })

        setEditMode(true)

    }, [])

    const submitTemplate = useCallback(async (e) => {

        e.preventDefault()

        // Validation
        if (!diet_id) {
            infoNotify("Please select Diet")
            return
        }

        if (template_name.trim() === "") {
            infoNotify("Template Name is required")
            return
        }

        if (!version_no) {
            infoNotify("Version Number is required")
            return
        }

        if (!effective_from) {
            infoNotify("Effective From Date is required")
            return
        }

        const apiPath = editMode
            ? '/diettemplate/update'
            : '/diettemplate/insert'

        try {

            const result = editMode
                ? await axioslogin.patch(apiPath, formData)
                : await axioslogin.post(apiPath, formData)

            const { success, message } = result.data

            if (success === 1 || success === 2) {
                succesNotify(message)
                setEditMode(false)
                setTemplateData({ ...formReset })
                fetchTemplate()
            } else {
                infoNotify(message)
            }

        } catch (error) {
            infoNotify('Something went wrong')
        }

    }, [
        editMode,
        formData,
        fetchTemplate,
        diet_id,
        template_name,
        version_no,
        effective_from
    ])

    const backtoSetting = useCallback(() => navigate('/Home/Settings'), [navigate])

    const refreshWindow = useCallback(() => {
        setTemplateData({ ...formReset })
        setEditMode(false)
    }, [])

    return (
        <CardMaster
            title="Diet Template"
            submit={submitTemplate}
            close={backtoSetting}
            refresh={refreshWindow}
        >

            <Box sx={{ p: 1 }}>
                <Grid container spacing={1}>

                    <Grid item xl={4} lg={4}>
                        <Grid container spacing={1}>

                            <Grid item xl={12} lg={12}>
                                <SelectPatientDiet
                                    value={diet_id}
                                    setValue={(value) =>
                                        setTemplateData({ ...templatedata, diet_id: value })
                                    }
                                />
                            </Grid>

                            <Grid item xl={12} lg={12}>
                                <TextFieldCustom
                                    placeholder="Template Name"
                                    type="text"
                                    size="sm"
                                    name="template_name"
                                    value={template_name}
                                    onchange={updateTemplateData}
                                />
                            </Grid>

                            <Grid item xl={12} lg={12}>
                                <TextFieldCustom
                                    placeholder="Version No"
                                    type="number"
                                    size="sm"
                                    name="version_no"
                                    value={version_no}
                                    onchange={updateTemplateData}
                                />
                            </Grid>

                            <Grid item xl={12} lg={12}>
                                <TextFieldCustom
                                    type="date"
                                    size="sm"
                                    name="effective_from"
                                    value={effective_from}
                                    onchange={updateTemplateData}
                                />
                            </Grid>

                            <Grid item xl={12} lg={12}>
                                <TextFieldCustom
                                    type="date"
                                    size="sm"
                                    name="effective_to"
                                    value={effective_to}
                                    onchange={updateTemplateData}
                                />
                            </Grid>

                            <Grid item xl={2} lg={2}>
                                <CusCheckBox
                                    label="Status"
                                    color="primary"
                                    size="md"
                                    name="status"
                                    value={status}
                                    checked={status}
                                    onCheked={updateTemplateData}
                                />
                            </Grid>

                        </Grid>
                    </Grid>

                    <Grid item xl={8} lg={8}>
                        <DietTemplateTable
                            tabledata={allTemplate}
                            rowSelect={rowSelect}
                        />
                    </Grid>

                </Grid>
            </Box>

        </CardMaster>
    )
}

export default memo(DietTemplate)