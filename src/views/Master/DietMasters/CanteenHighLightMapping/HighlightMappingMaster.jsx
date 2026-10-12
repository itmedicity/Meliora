import { Box, Grid } from '@mui/material'
import React, { memo, useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { axioslogin } from 'src/views/Axios/Axios'
import { errorNotify, infoNotify, succesNotify } from 'src/views/Common/CommonCode'

import CardMaster from 'src/views/Components/CardMaster'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'

import HighlightMappingTable from './HighlightMappingTable'

import {
    useAllHighlightMappings
} from 'src/views/Diet/CommonData/UseQuery'

import SelectDietItemName from 'src/views/CommonSelectCode/SelectDietItemName'
import SelectHighlightType from 'src/views/CommonSelectCode/SelectHighlightType'

const formReset = {
    mapping_id: '',
    item_id: 0,
    highlight_type_id: 0,
    title: '',
    display_priority: '',
    start_date: '',
    end_date: '',
    status: true
}

const HighlightMappingMaster = () => {

    const navigate = useNavigate()

    const id = useSelector(state => state.LoginUserData.empid)

    const {
        data: allMappings = [],
        refetch: fetchMappings
    } = useAllHighlightMappings()

    const [editMode, setEditMode] = useState(false)

    const [mapping, setMapping] = useState(formReset)

    const {
        mapping_id,
        item_id,
        highlight_type_id,
        title,
        display_priority,
        start_date,
        end_date,
        status
    } = mapping

    // INPUT CHANGE

    const updateMapping = useCallback((e) => {

        const { name, value, type, checked } = e.target

        setMapping((prev) => ({
            ...prev,
            [name]: type === 'checkbox'
                ? checked
                : value
        }))

    }, [])

    // SELECT ITEM

    const setItemValue = useCallback((value) => {

        setMapping(prev => ({
            ...prev,
            item_id: value
        }))

    }, [])

    // SELECT HIGHLIGHT

    const setHighlightValue = useCallback((value) => {

        setMapping(prev => ({
            ...prev,
            highlight_type_id: value
        }))

    }, [])

    // FORM DATA

    const formData = useMemo(() => ({

        ...(editMode
            ? {
                mapping_id,
                updated_by: id
            }
            : {
                created_by: id
            }),

        item_id,
        highlight_type_id,
        title,
        display_priority,
        start_date,
        end_date,
        active_status: status ? 1 : 0

    }), [
        editMode,
        mapping_id,
        item_id,
        highlight_type_id,
        title,
        display_priority,
        start_date,
        end_date,
        status,
        id
    ])

    // ROW SELECT

    const rowSelect = useCallback((params) => {

        const data = params.api.getSelectedRows()[0]

        setMapping({
            mapping_id: data.mapping_id,
            item_id: data.item_id,
            highlight_type_id: data.highlight_type_id,
            title: data.title,
            display_priority: data.display_priority,
            start_date: data.start_date
                ? data.start_date?.slice(0, 16)
                : '',
            end_date: data.end_date
                ? data.end_date?.slice(0, 16)
                : '',
            status: data.active_status === 1
        })

        setEditMode(true)

    }, [])

    // SUBMIT

    // SUBMIT

    const submitMapping = useCallback(async (e) => {

        e.preventDefault()

        if (item_id === 0) {
            return infoNotify("Please Select Item")
        }

        if (highlight_type_id === 0) {
            return infoNotify("Please Select Highlight")
        }

        if (!title?.trim()) {
            return infoNotify("Please Enter Title")
        }

        if (!display_priority) {
            return infoNotify("Please Enter Display Priority")
        }

        // START DATE REQUIRED

        if (!start_date) {
            return infoNotify("Please Select Start Date")
        }

        // END DATE REQUIRED

        if (!end_date) {
            return infoNotify("Please Select End Date")
        }

        // DATE VALIDATION

        const startDateTime = new Date(start_date)
        const endDateTime = new Date(end_date)

        if (startDateTime >= endDateTime) {
            return infoNotify(
                "End Date must be greater than Start Date"
            )
        }
        // PAST DATE VALIDATION
        const currentDate = new Date()
        if (startDateTime < currentDate) {
            return infoNotify(
                "Start Date cannot be in past"
            )
        }
        try {
            const result = editMode
                ? await axioslogin.patch(
                    '/highlightmaping/item-highlight',
                    formData
                )
                : await axioslogin.post(
                    '/highlightmaping/item-highlight',
                    formData
                )
            const { success, message } = result.data

            if (success === 1 || success === 2) {
                succesNotify(message)
                setMapping(formReset)
                setEditMode(false)
                fetchMappings()
            } else {
                infoNotify(message)
            }
        } catch (error) {
            errorNotify("Something Went Wrong")
        }

    }, [
        editMode,
        formData,
        fetchMappings,
        item_id,
        highlight_type_id,
        title,
        display_priority,
        start_date,
        end_date
    ])

    // BACK

    const backtoSetting = useCallback(() => {

        navigate('/Home/Settings')

    }, [navigate])

    // REFRESH

    const refreshWindow = useCallback(() => {

        setMapping(formReset)

        setEditMode(false)

    }, [])

    return (

        <CardMaster
            title="Highlight Mapping Master"
            submit={submitMapping}
            close={backtoSetting}
            refresh={refreshWindow}
        >

            <Box sx={{ p: 1 }}>

                <Grid container spacing={1}>

                    {/* FORM */}

                    <Grid item xl={4} lg={4}>

                        <Grid container spacing={1}>

                            {/* ITEM */}

                            <Grid item xl={12} lg={12}>

                                <SelectDietItemName
                                    value={item_id}
                                    setValue={setItemValue}
                                />

                            </Grid>

                            {/* HIGHLIGHT */}

                            <Grid item xl={12} lg={12}>

                                <SelectHighlightType
                                    value={highlight_type_id}
                                    setValue={setHighlightValue}
                                />

                            </Grid>

                            {/* TITLE */}

                            <Grid item xl={12} lg={12}>

                                <TextFieldCustom
                                    placeholder="Title"
                                    type="text"
                                    size="sm"
                                    name="title"
                                    value={title}
                                    onchange={updateMapping}
                                />

                            </Grid>

                            {/* PRIORITY */}

                            <Grid item xl={12} lg={12}>

                                <TextFieldCustom
                                    placeholder="Display Priority"
                                    type="number"
                                    size="sm"
                                    name="display_priority"
                                    value={display_priority}
                                    onchange={updateMapping}
                                />

                            </Grid>

                            {/* START DATE */}

                            <Grid item xl={12} lg={12}>

                                <TextFieldCustom
                                    placeholder="Start Date"
                                    type="datetime-local"
                                    size="sm"
                                    name="start_date"
                                    value={start_date}
                                    onchange={updateMapping}
                                />

                            </Grid>

                            {/* END DATE */}

                            <Grid item xl={12} lg={12}>

                                <TextFieldCustom
                                    placeholder="End Date"
                                    type="datetime-local"
                                    size="sm"
                                    name="end_date"
                                    value={end_date}
                                    onchange={updateMapping}
                                />

                            </Grid>

                            {/* STATUS */}

                            <Grid item xl={3} lg={3}>

                                <CusCheckBox
                                    label="Status"
                                    color="primary"
                                    size="md"
                                    name="status"
                                    checked={status}
                                    onCheked={updateMapping}
                                />

                            </Grid>

                        </Grid>

                    </Grid>

                    {/* TABLE */}

                    <Grid item xl={8} lg={8}>

                        <HighlightMappingTable
                            tabledata={allMappings}
                            rowSelect={rowSelect}
                        />

                    </Grid>

                </Grid>

            </Box>

        </CardMaster>
    )
}

export default memo(HighlightMappingMaster)