import { Box, Grid } from '@mui/material'
import React, { memo, useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import CardMaster from 'src/views/Components/CardMaster'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import { useSelector } from 'react-redux'
import { useAllItemType } from 'src/views/Diet/CommonData/UseQuery'
import ItemTypeMasterTable from './ItemTypeMasterTable'

const formReset = {
    item_type_id: '',
    item_type_name: '',
    status: false
}

const ItemTypeMaster = () => {

    const navigate = useNavigate()

    const {
        data: allItemType = [],
        refetch: fetchAllItemType
    } = useAllItemType()

    const [editMode, setEditMode] = useState(false)
    const [itemType, setItemType] = useState({ ...formReset })

    const { item_type_id, item_type_name, status } = itemType

    const id = useSelector(state => state.LoginUserData.empid)

    const updateItemType = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        setItemType({ ...itemType, [e.target.name]: value })
    }, [itemType])

    const formData = useMemo(() => ({
        ...(editMode
            ? { item_type_id, updated_by: id }
            : { created_by: id }),
        item_type_name,
        is_active: status ? 1 : 0
    }), [editMode, item_type_id, item_type_name, status, id])

    const rowSelect = useCallback((params) => {
        const data = params.api.getSelectedRows()[0]

        setItemType({
            item_type_id: data.item_type_id,
            item_type_name: data.item_type_name,
            status: data.is_active === 1
        })

        setEditMode(true)
    }, [])

    const submitItemType = useCallback(async (e) => {

        e.preventDefault()

        const apiPath = editMode
            ? '/dietitemtype/update'
            : '/dietitemtype/insert'

        try {

            const result = editMode
                ? await axioslogin.patch(apiPath, formData)
                : await axioslogin.post(apiPath, formData)

            const { success, message } = result.data

            if (success === 1 || success === 2) {

                succesNotify(message)

                setEditMode(false)
                setItemType({ ...formReset })

                fetchAllItemType()

            } else {
                infoNotify(message)
            }

        } catch (error) {
            infoNotify('Something went wrong!')
        }

    }, [editMode, formData, fetchAllItemType])

    const backtoSetting = useCallback(() => navigate('/Home/Settings'), [navigate])

    const refreshWindow = useCallback(() => {
        setItemType({ ...formReset })
        setEditMode(false)
    }, [])

    return (

        <CardMaster
            title="Item Type Master"
            submit={submitItemType}
            close={backtoSetting}
            refresh={refreshWindow}
        >

            <Box sx={{ p: 1 }}>

                <Grid container spacing={1}>

                    <Grid item xl={4} lg={4}>

                        <Grid container spacing={1}>

                            <Grid item xl={12} lg={12}>
                                <TextFieldCustom
                                    placeholder="Item Type Name"
                                    type="text"
                                    size="sm"
                                    name="item_type_name"
                                    value={item_type_name}
                                    onchange={updateItemType}
                                />
                            </Grid>

                            <Grid item lg={3} xl={3}>
                                <CusCheckBox
                                    label="Status"
                                    color="primary"
                                    size="md"
                                    name="status"
                                    value={status}
                                    checked={status}
                                    onCheked={updateItemType}
                                />
                            </Grid>

                        </Grid>

                    </Grid>

                    <Grid item lg={8} xl={8}>
                        <ItemTypeMasterTable
                            tabledata={allItemType}
                            rowSelect={rowSelect}
                        />
                    </Grid>

                </Grid>

            </Box>

        </CardMaster>

    )
}

export default memo(ItemTypeMaster)