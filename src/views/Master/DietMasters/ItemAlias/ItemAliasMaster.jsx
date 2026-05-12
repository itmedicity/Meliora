import { Box, Grid } from '@mui/material'
import React, { memo, useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import { useSelector } from 'react-redux'

import SelectDietItemName from 'src/views/CommonSelectCode/SelectDietItemName'
import CardMaster from 'src/views/Components/CardMaster'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import { useAllItemAlias } from 'src/views/Diet/CommonData/UseQuery'
import ItemAliasMasterTable from './ItemAliasMasterTable'

// Form reset
const formReset = {
    alias_id: '',
    item_id: '',
    alias_name: '',
    status: false
}

const ItemAliasMaster = () => {
    const navigate = useNavigate()
    const { empid } = useSelector(state => state.LoginUserData)

    const {
        data: allItemAlias = [],
        refetch: fetchAllItemAlias
    } = useAllItemAlias()



    const [editMode, setEditMode] = useState(false)
    const [alias, setAlias] = useState({ ...formReset })
    const { alias_id, item_id, alias_name, status } = alias

    // Handle form field changes
    const updateAlias = useCallback(
        e => {
            let value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
            if (e.target.name === 'alias_name') value = value.toUpperCase()

            setAlias({ ...alias, [e.target.name]: value })
        },
        [alias]
    )

    // Handle item select change
    const handleItemChange = useCallback(
        newValue => setAlias({ ...alias, item_id: newValue }),
        [alias]
    )

    // Prepare form data for API
    const formData = useMemo(() => ({
        ...(editMode ? { alias_id, updated_by: empid } : { created_by: empid }),
        item_id,
        alias_name,
        is_active: status ? 1 : 0
    }), [editMode, alias_id, item_id, alias_name, status, empid])

    // Row selection for editing
    const rowSelect = useCallback(params => {
        const data = params.api.getSelectedRows()[0]
        setAlias({
            alias_id: data.alias_id,
            item_id: data.item_id,
            alias_name: data.alias_name,
            status: data.is_active === 1
        })
        setEditMode(true)
    }, [])

    // Submit form
    const submitAlias = useCallback(
        async e => {
            e.preventDefault()
            const apiPath = editMode ? '/itemalias/update' : '/itemalias/insert'
            try {
                const result = editMode
                    ? await axioslogin.patch(apiPath, formData)
                    : await axioslogin.post(apiPath, formData)

                const { success, message } = result.data
                if (success === 1 || success === 2) {
                    succesNotify(message)
                    setEditMode(false)
                    setAlias({ ...formReset })
                    fetchAllItemAlias()
                } else infoNotify(message)
            } catch (error) {
                infoNotify('Something went wrong!')
            }
        },
        [editMode, formData, fetchAllItemAlias]
    )

    const backToSettings = useCallback(() => navigate('/Home/Settings'), [navigate])
    const refreshWindow = useCallback(() => {
        setAlias({ ...formReset })
        setEditMode(false)
    }, [])

    return (
        <CardMaster title="Item Alias Master" submit={submitAlias} close={backToSettings} refresh={refreshWindow}>
            <Box sx={{ p: 1 }}>
                <Grid container spacing={1}>
                    <Grid item xl={4} lg={4}>
                        <Grid container spacing={1}>
                            <Grid item xl={12} lg={12}>
                                {/* Replace TextFieldCustom with SelectDietItem */}
                                <SelectDietItemName value={item_id} setValue={handleItemChange} />
                            </Grid>
                            <Grid item xl={12} lg={12}>
                                <TextFieldCustom
                                    placeholder="Alias Name"
                                    type="text"
                                    size="sm"
                                    name="alias_name"
                                    value={alias_name}
                                    onchange={updateAlias}
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
                                    onCheked={updateAlias}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item lg={8} xl={8}>
                        <ItemAliasMasterTable tabledata={allItemAlias} rowSelect={rowSelect} />
                    </Grid>
                </Grid>
            </Box>
        </CardMaster>
    )
}

export default memo(ItemAliasMaster)