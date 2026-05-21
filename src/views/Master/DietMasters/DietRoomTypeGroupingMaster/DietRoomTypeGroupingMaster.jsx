import React, { memo, useCallback, useMemo, useState } from 'react'
import { Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import { useSelector } from 'react-redux'
import ChooseDietName from 'src/views/CommonSelectCode/ChooseDietName'
import ChooseRoomCategory from 'src/views/CommonSelectCode/ChooseRoomCategory'
import ChoosePartyType from 'src/views/CommonSelectCode/ChoosePartyType'
import { useDietPrice } from 'src/views/Diet/CommonData/UseQuery'
import DietTable from '../DietComponent/DietTable'
import DietMasterHeader from '../DietComponent/DietMasterHeader'
import DietInputLabel from '../DietComponent/DietInputLabel'
import DietDetailExpand from '../DietComponent/DietDetailExpand'
import DietButton from 'src/views/Diet/DietComponent/DietButton'
import '../DietStyle/DietStyle.css'

// FORM RESET
const formReset = {
    diet_price_id: '',
    dietroom: 0,
    partyType: 0,
    dailyRate: '',
    halfDayRate: '',
    gstRate: ''
}

const DietRoomTypeGroupingMaster = () => {

    const navigate = useNavigate()
    const empid = useSelector(state => state.LoginUserData.empid)

    const [diet, setDiet] = useState(0)
    const [editMode, setEditMode] = useState(false)
    const [formDataState, setFormDataState] = useState({ ...formReset })
    const [loading, setLoading] = useState(false);

    const {
        diet_price_id,
        dietroom,
        partyType,
        dailyRate,
        halfDayRate,
        gstRate
    } = formDataState

    // TABLE DATA
    const { data: tableData = [], refetch } = useDietPrice(diet)

    // FINAL PAYLOAD
    const payload = useMemo(() => ({
        ...(editMode
            ? { diet_price_id, updated_by: empid }
            : { created_by: empid }),
        diet_id: diet,
        diet_rm_category_slno: dietroom,
        party_type_id: partyType,
        daily_rate: Number(dailyRate || 0),
        half_day_rate: Number(halfDayRate || 0),
        gst_rate: Number(gstRate || 0)
    }), [editMode, diet_price_id, empid, diet, dietroom, partyType, dailyRate, halfDayRate, gstRate])

    // EDIT CLICK
    const handleEdit = useCallback((row) => {

        setFormDataState({
            diet_price_id: row.price_id,
            dietroom: row.diet_rm_category_slno,
            partyType: row.party_type_id,
            dailyRate: row.daily_rate,
            halfDayRate: row.half_day_rate,
            gstRate: row.gst_rate
        })

        setEditMode(true)

    }, [])

    // SUBMIT (INSERT + UPDATE)
    const submitData = useCallback(async () => {

        if (!diet) return infoNotify("Select Diet")
        if (!dietroom) return infoNotify("Select Room")
        if (!partyType) return infoNotify("Select Party Type")

        const apiPath = editMode
            ? '/dietprice/update'
            : '/dietprice/insert'

        try {
            setLoading(true)
            const result = editMode
                ? await axioslogin.patch(apiPath, payload)
                : await axioslogin.post(apiPath, payload)

            const { success, message } = result.data

            if (success === 1 || success === 2) {
                succesNotify(message)
                setEditMode(false)
                setFormDataState({ ...formReset })
                refetch()
            } else {
                infoNotify(message)
            }
        } catch (err) {
            infoNotify("Something went wrong")
        } finally {
            setLoading(true)
        }

    }, [editMode, payload, diet, dietroom, partyType, refetch])

    const hanldeGoBack = useCallback(() => {
        navigate('/Home/Settings')
    }, [navigate])

    // TABLE COLUMNS
    const columns = [
        { key: 'diet_rm_name', label: 'Room Category' },
        { key: 'party_name', label: 'Party Type' },
        { key: 'daily_rate', label: 'Daily Rate' },
        { key: 'half_day_rate', label: 'Half Day Rate' },
        { key: 'gst_rate', label: 'GST %' }
    ]

    return (
        <Box sx={{
            width: '100%',
            minHeight: 650,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Box sx={{
                width: '100%',
                minHeight: 650,
                borderRadius: 5,
                border: '1px solid #9822c365',
            }}>

                <DietMasterHeader onClose={hanldeGoBack} name="DIET ROOM TYPE GROUPING" />

                <Box sx={{ p: 1 }}>

                    {/* DIET SELECT */}
                    <Box sx={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Box sx={{ width: '50%' }}>
                            <Box sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                                <DietInputLabel name={"Select Diet Name"} />
                                <ChooseDietName width={300} value={diet} setValue={setDiet} />
                            </Box>
                        </Box>
                    </Box>

                    <DietDetailExpand name={"Room Category Price Details"} condition={true} >
                        <Box sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center', pb: 1 }}>
                            <Box sx={{ width: '50%', mt: 1 }}>

                                {/* ROOM */}
                                <Box sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <DietInputLabel name={"Select Room Category"} />
                                    <ChooseRoomCategory
                                        width={300}
                                        value={dietroom}
                                        setValue={(val) =>
                                            setFormDataState(prev => ({ ...prev, dietroom: val }))
                                        }
                                    />
                                </Box>

                                {/* PARTY */}
                                <Box sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <DietInputLabel name={"Select Party Type"} />
                                    <ChoosePartyType
                                        value={partyType}
                                        setValue={(val) =>
                                            setFormDataState(prev => ({ ...prev, partyType: val }))
                                        }
                                        width={300}
                                    />
                                </Box>

                                {/* DAILY RATE */}
                                <Box sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <DietInputLabel name={"Daily Rate"} />
                                    <input
                                        className="qty-input"
                                        type="number"
                                        value={dailyRate}
                                        onChange={(e) =>
                                            setFormDataState(prev => ({ ...prev, dailyRate: e.target.value }))
                                        }
                                    />
                                </Box>

                                {/* HALF DAY */}
                                <Box sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <DietInputLabel name={"Half Day Rate"} />
                                    <input
                                        className="qty-input"
                                        type="number"
                                        value={halfDayRate}
                                        onChange={(e) =>
                                            setFormDataState(prev => ({ ...prev, halfDayRate: e.target.value }))
                                        }
                                    />
                                </Box>

                                {/* GST */}
                                <Box sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <DietInputLabel name={"GST %"} />
                                    <input
                                        className="qty-input"
                                        type="number"
                                        value={gstRate}
                                        onChange={(e) =>
                                            setFormDataState(prev => ({ ...prev, gstRate: e.target.value }))
                                        }
                                    />
                                </Box>

                                <Box sx={{ my: 2 }}>
                                    <DietButton
                                        disabled={loading}
                                        onClick={submitData}
                                        name={editMode ? 'Update' : 'Add'}
                                    />
                                </Box>

                                {/* TABLE */}
                                <DietTable
                                    columns={columns}
                                    data={tableData}
                                    onEdit={handleEdit}
                                />

                            </Box>
                        </Box>
                    </DietDetailExpand>

                </Box>
            </Box>
        </Box>
    )
}

export default memo(DietRoomTypeGroupingMaster)