import React, { useCallback, useEffect, useState } from 'react'
import { Box } from '@mui/joy'
import DietButton from 'src/views/Diet/DietComponent/DietButton'
import '../../Master/DietMasters/DietStyle/DietStyle.css'
import { useNavigate } from 'react-router-dom'
import DietMasterHeader from 'src/views/Master/DietMasters/DietComponent/DietMasterHeader'
import DietInputLabel from 'src/views/Master/DietMasters/DietComponent/DietInputLabel'
import DietDetailExpand from 'src/views/Master/DietMasters/DietComponent/DietDetailExpand'
import DietWeekTable from 'src/views/Master/DietMasters/DietComponent/DietWeekTable'
import ChooseDietTemplate from 'src/views/CommonSelectCode/ChooseDietTemplate'
import { formatDietPayload, formatTemplateFoodToSchedule, getChangedItems } from '../CommonData/CommonFun'
import { errorNotify, infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import { axioslogin } from 'src/views/Axios/Axios'
import { useSelector } from 'react-redux'
import { useAllDietTemplateFood } from '../CommonData/UseQuery'

const DietTypeGrouping = () => {

    const navigate = useNavigate()
    const id = useSelector(state => state.LoginUserData.empid)

    const [diet, setDiet] = useState(0)
    const [schedule, setSchedule] = useState({})
    const [processing, setProcessing] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [originalSchedule, setOriginalSchedule] = useState({})


    const { data: TemplateFood = [],
        refetch: retchTemplateFood
    } = useAllDietTemplateFood(diet);

    useEffect(() => {
        if (!TemplateFood || TemplateFood.length === 0) return;
        const formatted = formatTemplateFoodToSchedule(TemplateFood);
        setSchedule(prev =>
            JSON.stringify(prev) === JSON.stringify(formatted) ? prev : formatted
        );
        setOriginalSchedule(formatted);
    }, [TemplateFood]);

    // Go Back
    const hanldeGoBack = useCallback(() => {
        navigate('/Home/Settings')
    }, [navigate])


    // Add Diet Template Food
    const HandleAddDietTemplateFood = useCallback(async () => {
        // Prevent duplicate execution
        if (processing || submitting) return;

        // Validate diet selection
        if (!diet) {
            infoNotify("Please select a diet template");
            return;
        }
        // Validate schedule
        if (!schedule || Object.keys(schedule).length === 0) {
            infoNotify("Please add at least one diet food item");
            return;
        }
        try {
            // Step 1: Convert UI data to payload
            setProcessing(true);
            const payload = formatDietPayload(schedule, diet, id);
            setProcessing(false);
            if (!payload?.length) {
                infoNotify("No valid food items found");
                return;
            }
            // Step 2: Split into insert and update
            const insertList = payload.filter(item => !item.template_food_id)
            const updateList = getChangedItems(payload, originalSchedule)

            // Step 3: Start API submission
            setSubmitting(true);
            // Step 4: INSERT (already bulk, single call)
            if (insertList.length > 0) {
                const { data } = await axioslogin.post('/templatefood/insert', insertList);
                if (data.success !== 2) {
                    warningNotify(data.message || "Insert failed");
                    return;
                }
            }
            // Step 5: UPDATE using batching
            // Step 5: UPDATE
            if (updateList.length > 0) {
                const { data } = await axioslogin.post('/templatefood/update', updateList);
                if (data.success !== 2) {
                    // Build user-friendly message
                    let message = data.message || "Update failed";
                    if (data.failedItem) {
                        message += ` (Item ID: ${data.failedItem.template_food_id})`;
                    }
                    // Optional: include DB error (for dev only)
                    if (data.error) {
                        errorNotify("DB Error:", data.error);
                    }
                    warningNotify(message);
                    return;
                }
            }

            // Step 6: Success handling
            succesNotify("Saved successfully");
            setSchedule({});
            setDiet(0);
            retchTemplateFood()

        } catch (error) {
            console.error(error);
            // Handles both batch errors and network errors
            warningNotify(
                error?.message ||
                error?.response?.data?.message ||
                "Error saving diet template"
            );

        } finally {
            // Reset UI states
            setProcessing(false);
            setSubmitting(false);
        }

    }, [diet, schedule, id, processing, submitting, retchTemplateFood, originalSchedule]);

    return (
        <Box sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Box
                sx={{
                    width: '100%',
                    height: '90vh',
                    borderRadius: 5,
                    border: '1px solid #9822c365',

                }}
            >

                <DietMasterHeader onClose={hanldeGoBack} name="DIET TYPE GROUPING" />

                <Box sx={{ p: 1, height: '100%', position: 'relative' }}>

                    <Box sx={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Box sx={{ width: '50%', }}>
                            <Box sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                                <DietInputLabel name={"Select Diet Name"} />
                                <ChooseDietTemplate width={300} value={diet} setValue={setDiet} />
                            </Box>
                        </Box>
                    </Box>

                    <DietDetailExpand name={"Diet Food Detail"} status={true} condition={diet > 0}>
                        <Box sx={{
                            alignItems: 'center',
                            display: 'flex',
                            justifyContent: 'center',
                            pb: 1,
                            flexDirection: 'column'
                        }}>
                            <Box sx={{ width: '100%', mt: 1 }}>
                                <DietWeekTable
                                    weekData={schedule}
                                    onUpdateWeek={setSchedule}
                                />
                            </Box>

                            <Box sx={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'start',
                                p: 1
                            }}>
                                <DietButton
                                    disabled={processing || submitting}
                                    onClick={HandleAddDietTemplateFood}
                                    name={
                                        processing
                                            ? "Processing data... Please wait"
                                            : submitting
                                                ? "Submitting... Please wait"
                                                : "Add"
                                    }
                                />
                            </Box>
                        </Box>
                    </DietDetailExpand>

                </Box>
            </Box>
        </Box>
    )
}

export default DietTypeGrouping