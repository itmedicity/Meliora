import React, { memo, useCallback, useMemo, useState } from 'react'
import { Box, Checkbox } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import { useSelector } from 'react-redux'
import ChooseDietName from 'src/views/CommonSelectCode/ChooseDietName'
import ChooseRoomCategory from 'src/views/CommonSelectCode/ChooseRoomCategory'
import ChoosePartyType from 'src/views/CommonSelectCode/ChoosePartyType'
import { useDietPrice, useDietPriceDeatil } from 'src/views/Diet/CommonData/UseQuery'
import DietTable from '../DietComponent/DietTable'
import DietMasterHeader from '../DietComponent/DietMasterHeader'
import DietInputLabel from '../DietComponent/DietInputLabel'
import DietDetailExpand from '../DietComponent/DietDetailExpand'
import DietButton from 'src/views/Diet/DietComponent/DietButton'
import '../DietStyle/DietStyle.css'
import ChooseDIetType from 'src/views/CommonSelectCode/ChooseDIetType'
import DietMealPriceTable from '../DietComponent/DietMealPriceTable'

// FORM RESET
const formReset = {
    diet_price_id: '',
    dietroom: 0,
    partyType: 0,
    dailyRate: '',
    halfDayRate: '',
    gstRate: '',
    meadId: '',
    dietprice: '',
    detail_id: '',
    priceactive: true
}

const DietRoomTypeGroupingMaster = () => {

    const navigate = useNavigate()
    const empid = useSelector(state => state.LoginUserData.empid)


    const handlePriceEdit = useCallback((row) => {

        setFormDataState(prev => ({
            ...prev,
            detail_id: row.detail_id,
            meadId: row.type_slno,
            dietprice: row.meal_rate,
            priceactive: Boolean(row.is_active),
        }));

        setDetailEditMode(true);

    }, []);

    const [diet, setDiet] = useState(0)
    const [editMode, setEditMode] = useState(false)
    const [detailEditMode, setDetailEditMode] = useState(false);
    const [formDataState, setFormDataState] = useState({ ...formReset })
    const [loading, setLoading] = useState(false);
    const [selectedroomcategory, setSelectedRoomCategory] = useState({})

    const {
        diet_price_id,
        dietroom,
        partyType,
        dailyRate,
        halfDayRate,
        gstRate,
        meadId,
        dietprice,
        priceactive,
        detail_id
    } = formDataState


    console.log({
        meadId
    });

    const { price_id } = selectedroomcategory ?? {}

    // TABLE DATA
    const { data: tableData = [], refetch } = useDietPrice(diet)
    const { data: PriceDetail = [], refetch: FetchDietPriceDetail }
        = useDietPriceDeatil(price_id);


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


    const Pricepayload = useMemo(() => ({
        ...(detailEditMode
            ? { detail_id, updated_by: empid }
            : { created_by: empid }),
        price_id: price_id,
        type_slno: meadId,
        is_active: priceactive ? 1 : 0,
        meal_rate: Number(dietprice || 0)
    }), [detailEditMode, dietprice, priceactive, meadId, price_id, empid])


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


    const handleAddMealPrice = useCallback((row) => {
        setSelectedRoomCategory(row);
        setDetailEditMode(false);
        setFormDataState(prev => ({
            ...prev,
            detail_id: '',
            meadId: 0,
            dietprice: '',
            priceactive: true
        }));
        FetchDietPriceDetail(row.price_id);
    }, [FetchDietPriceDetail]);



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
            setLoading(false)
        }

    }, [editMode, payload, diet, dietroom, partyType, refetch])


    const handleSumbitPriceDetails = useCallback(async () => {

        if (!price_id) return infoNotify("Select Category")
        if (!meadId) return infoNotify("Select Meal")
        if (!dietprice) return infoNotify("Price is missing")
        const apiPath = detailEditMode
            ? '/dietprice/pricedtl/update'
            : '/dietprice/pricedtl/insert'

        try {
            setLoading(true)
            const result = editMode
                ? await axioslogin.patch(apiPath, Pricepayload)
                : await axioslogin.post(apiPath, Pricepayload)

            const { success, message } = result.data

            if (success === 1) {
                succesNotify(message)
                setEditMode(false)
                setFormDataState({ ...formReset })
                FetchDietPriceDetail()
            } else {
                infoNotify(message)
            }
        } catch (err) {
            infoNotify("Something went wrong")
        } finally {
            setLoading(false)
        }

    }, [detailEditMode, Pricepayload, price_id, meadId, dietprice, refetch])


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


    const columnsPrice = [
        { key: 'type_desc', label: 'Meal Type' },
        { key: 'meal_rate', label: 'Rate' }
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
                                    onAdd={handleAddMealPrice}
                                />

                            </Box>
                        </Box>
                    </DietDetailExpand>

                    <DietDetailExpand name={"Meal Wise Price Configuration"} condition={true} >
                        <Box sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center', pb: 1 }}>
                            <Box sx={{ width: '50%', mt: 1 }}>
                                <Box sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <DietInputLabel name={"Selected Diet"} />
                                    <input
                                        readOnly
                                        className="qty-input"
                                        type="text"
                                        value={selectedroomcategory?.diet_name}
                                    />
                                </Box>
                                <Box sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <DietInputLabel name={"Selected Category"} />
                                    <input
                                        readOnly
                                        className="qty-input"
                                        type="text"
                                        value={selectedroomcategory?.diet_rm_name}
                                    />
                                </Box>
                                <Box sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <DietInputLabel name={"Selected Party"} />
                                    <input
                                        readOnly
                                        className="qty-input"
                                        type="text"
                                        value={selectedroomcategory?.party_name}
                                    />
                                </Box>
                                {/* PARTY */}
                                <Box sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <DietInputLabel name={"Select Meal Type"} />
                                    <ChooseDIetType width={300} value={meadId} setValue={(val) =>
                                        setFormDataState(prev => ({ ...prev, meadId: val }))
                                    } />
                                </Box>

                                {/* DAILY RATE */}
                                <Box sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <DietInputLabel name={"Meal Rate"} />
                                    <input
                                        className="qty-input"
                                        type="number"
                                        value={dietprice}
                                        onChange={(e) =>
                                            setFormDataState(prev => ({ ...prev, dietprice: e.target.value }))
                                        }
                                    />
                                </Box>
                                <Box sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <DietInputLabel name={"Active"} />
                                    <Checkbox
                                        label="Active"
                                        checked={priceactive}
                                        onChange={(e) =>
                                            setFormDataState(prev => ({
                                                ...prev,
                                                priceactive: e.target.checked,
                                            }))
                                        }
                                    />

                                </Box>

                                <Box sx={{ my: 2 }}>
                                    <DietButton
                                        disabled={loading}
                                        onClick={handleSumbitPriceDetails}
                                        name={editMode ? 'Update' : 'Add Price'}
                                    />
                                </Box>

                                {/* TABLE */}
                                <DietMealPriceTable
                                    columnsPrice={columnsPrice}
                                    data={PriceDetail}
                                    onEdit={handlePriceEdit}
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

// 