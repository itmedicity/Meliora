import { Box, Grid } from '@mui/material'
import React, { memo, useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import CardMaster from 'src/views/Components/CardMaster'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import { useSelector } from 'react-redux'
import OrderPartyTypeTable from './OrderPartyTypeTable'
import { useAllOrderPartyType } from 'src/views/Diet/CommonData/UseQuery'


const formReset = {
    party_type_id: '',
    party_name: '',
    status: false
}

const OrderPartyType = () => {

    const navigate = useNavigate()

    const {
        data: allPartyType = [],
        refetch: fetchPartyType
    } = useAllOrderPartyType();

    const [editMode, setEditMode] = useState(false)
    const [partyType, setPartyType] = useState(formReset)

    const { party_type_id, party_name, status } = partyType

    const id = useSelector(state => state.LoginUserData.empid)

    // input change
    const updatePartyType = useCallback((e) => {
        const { name, value, type, checked } = e.target
        setPartyType(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value.toUpperCase()
        }))

    }, [])

    // form data
    const formData = useMemo(() => ({
        ...(editMode
            ? { party_type_id, updated_by: id }
            : { created_by: id }),
        party_name,
        is_active: status ? 1 : 0
    }), [editMode, party_type_id, party_name, status, id])


    // row select
    const rowSelect = useCallback((params) => {

        const data = params.api.getSelectedRows()[0]

        setPartyType({
            party_type_id: data.party_type_id,
            party_name: data.party_name,
            status: data.is_active === 1
        })

        setEditMode(true)

    }, [])

    // submit
    const submitPartyType = useCallback(async (e) => {

        e.preventDefault()

        // Validation
        if (party_name === '' || party_name.trim() === '') {
            infoNotify("Party Name is required")
            return
        }

        const apiPath = editMode
            ? '/orderparty/update'
            : '/orderparty/insert'

        try {

            const result = editMode
                ? await axioslogin.patch(apiPath, formData)
                : await axioslogin.post(apiPath, formData)

            const { success, message } = result.data

            if (success === 1 || success === 2) {
                succesNotify(message)
                setEditMode(false)
                setPartyType(formReset)
                fetchPartyType()
            } else {
                infoNotify(message)
            }

        } catch (error) {
            infoNotify('Something went wrong!')
        }

    }, [editMode, formData, fetchPartyType, party_name]);


    const backtoSetting = useCallback(() => navigate('/Home/Settings'), [navigate])

    const refreshWindow = useCallback(() => {
        setPartyType(formReset)
        setEditMode(false)
    }, [])

    return (

        <CardMaster
            title="Order Party Type"
            submit={submitPartyType}
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
                                    placeholder="Party Name"
                                    type="text"
                                    size="sm"
                                    name="party_name"
                                    value={party_name}
                                    onchange={updatePartyType}
                                />
                            </Grid>

                            <Grid item xl={2} lg={2}>
                                <CusCheckBox
                                    label="Status"
                                    color="primary"
                                    size="md"
                                    name="status"
                                    checked={status}
                                    onCheked={updatePartyType}
                                />
                            </Grid>

                        </Grid>

                    </Grid>


                    {/* TABLE */}

                    <Grid item lg={8} xl={8}>

                        <OrderPartyTypeTable
                            tabledata={allPartyType}
                            rowSelect={rowSelect}
                        />

                    </Grid>

                </Grid>

            </Box>

        </CardMaster>
    )
}

export default memo(OrderPartyType)