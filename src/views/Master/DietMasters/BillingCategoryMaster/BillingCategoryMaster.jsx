import { Box, Grid } from '@mui/material'
import React, { memo, useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
// import { useSelector } from 'react-redux'

import CardMaster from 'src/views/Components/CardMaster'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import BillingCategoryTable from './BillingCategoryTable'
import { useAllBillingCategory } from 'src/views/Diet/CommonData/UseQuery'

//  Reset Form
const formReset = {
    category_id: '',
    category_name: '',
    description: '',
    status: true
}

const BillingCategoryMaster = () => {

    const navigate = useNavigate()
    // const { empid } = useSelector(state => state.LoginUserData)

    const {
        data: categoryList = [],
        refetch: fetchCategory
    } = useAllBillingCategory()

    const [editMode, setEditMode] = useState(false)
    const [category, setCategory] = useState({ ...formReset })

    const { category_id, category_name, description, status } = category

    //  Input Change
    const updateCategory = useCallback((e) => {
        let value = e.target.type === 'checkbox' ? e.target.checked : e.target.value

        if (e.target.name === 'category_name') value = value.toUpperCase()

        setCategory({ ...category, [e.target.name]: value })
    }, [category])

    //  Payload
    const formData = useMemo(() => ({
        ...(editMode ? { category_id } : {}),
        category_name,
        description,
        is_active: status ? 1 : 0
    }), [editMode, category_id, category_name, description, status])

    //  Row Select
    const rowSelect = useCallback((params) => {
        const data = params.api.getSelectedRows()[0]

        setCategory({
            category_id: data.category_id,
            category_name: data.category_name,
            description: data.description,
            status: data.is_active === 1
        })

        setEditMode(true)
    }, [])

    //  Submit
    const submitCategory = useCallback(async (e) => {
        e.preventDefault()
        const apiPath = editMode ? '/billingcategory/update' : '/billingcategory/insert'

        try {
            const result = editMode
                ? await axioslogin.patch(apiPath, formData)
                : await axioslogin.post(apiPath, formData)

            const { success, message } = result.data

            if (success === 1 || success === 2) {
                succesNotify(message)
                setCategory({ ...formReset })
                setEditMode(false)
                fetchCategory()
            } else {
                infoNotify(message)
            }

        } catch (err) {
            infoNotify('Something went wrong!')
        }

    }, [editMode, formData, fetchCategory])

    const backToSettings = useCallback(() => navigate('/Home/Settings'), [navigate])

    const refreshWindow = useCallback(() => {
        setCategory({ ...formReset })
        setEditMode(false)
    }, [])

    return (
        <CardMaster
            title="Billing Category Master"
            submit={submitCategory}
            close={backToSettings}
            refresh={refreshWindow}
        >
            <Box sx={{ p: 1 }}>
                <Grid container spacing={1}>

                    {/* FORM */}
                    <Grid item xl={4} lg={4}>
                        <Grid container spacing={1}>

                            <Grid item xs={12}>
                                <TextFieldCustom
                                    placeholder="Category Name"
                                    name="category_name"
                                    value={category_name}
                                    onchange={updateCategory}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextFieldCustom
                                    placeholder="Description"
                                    name="description"
                                    value={description}
                                    onchange={updateCategory}
                                />
                            </Grid>

                            <Grid item xs={3}>
                                <CusCheckBox
                                    label="Status"
                                    name="status"
                                    checked={status}
                                    onCheked={updateCategory}
                                />
                            </Grid>

                        </Grid>
                    </Grid>

                    {/* TABLE */}
                    <Grid item xl={8} lg={8}>
                        <BillingCategoryTable
                            tabledata={categoryList}
                            rowSelect={rowSelect}
                        />
                    </Grid>

                </Grid>
            </Box>
        </CardMaster>
    )
}

export default memo(BillingCategoryMaster)