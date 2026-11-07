import React, { memo, useCallback, useMemo } from "react"
import { Box } from "@mui/joy"
import { useAllUnitMaster } from "src/views/Diet/CommonData/UseQuery"
import DietFoodItemRow from "./DietFoodItemRow"
import { axioslogin } from "src/views/Axios/Axios"
import { useSelector } from "react-redux"
import { useQueryClient } from "@tanstack/react-query"
import { errorNotify, succesNotify } from "src/views/Common/CommonCode"

const DietFoodRow = ({
    day,
    time,
    foods,
    DietType,
    dietColor,
    editingIndex,
    setEditingIndex,
    editFood,
    setEditFood,
    weekData,
    onUpdateWeek
}) => {


    const id = useSelector(state => state.LoginUserData.empid);

    const queryClient = useQueryClient();

    const { data: allUnits = [], } = useAllUnitMaster()

    const unitMap = useMemo(() => Object.fromEntries(allUnits.map(u => [u.unit_id, u.unit_code])), [allUnits])

    const handleUpdateStatus = useCallback(async (template_id, status) => {
        try {
            const { data } = await axioslogin.post(`/templatefood/inactive`, {
                template_food_id: template_id,
                is_active: status,
                updated_by: id
            });

            if (data.success !== 2) return errorNotify(data.message || "Error in updating status");

            succesNotify(data.message);
            queryClient.invalidateQueries('templatefood');
        } catch (err) {
            console.error("Toggle failed", err);
            errorNotify("Toggle failed");
        }
    }, [id, queryClient]);

    const handleToggleFood = useCallback((index, food) => {
        const copy = [...foods];
        if (food?.template_food_id) {
            // Toggle active locally immediately (optimistic UI)
            const newStatus = Number(food.is_active) === 1 ? 0 : 1;
            // Sync with API
            handleUpdateStatus(food.template_food_id, newStatus);

        } else {
            // Local item → just remove
            copy.splice(index, 1);

            onUpdateWeek({
                ...weekData,
                [day]: {
                    ...weekData[day],
                    [time]: copy
                }
            });
        }
    }, [foods, weekData, day, time, onUpdateWeek, handleUpdateStatus]);

    const handleEditSave = (isEdit, index, key, food) => {
        // If already in edit mode, save the updated food
        if (isEdit) {
            // Create a copy of the current foods array
            const copy = [...foods]
            // Replace the edited item at the given index
            copy[index] = editFood
            // Update the main week data with the modified foods list
            onUpdateWeek({
                ...weekData,
                [day]: {
                    ...weekData[day],
                    [time]: copy
                }
            })
            // Reset editing state
            setEditingIndex(null)
            setEditFood(null)
        } else {
            // If not in edit mode, enable edit for the selected row
            setEditingIndex(key)
            // Store the selected food data for editing
            setEditFood({ ...food })
        }
    }


    return (
        foods?.length > 0 && (
            <tr key={time} style={{
                width: '100%',
                boxShadow: '0 4px 8px rgba(0,0,0,0.07), 0 6px 20px rgba(0,0,0,0.08)',
            }}>
                <td colSpan={3} style={{ padding: 8 }}>
                    {/* DIET TYPE HEADER */}
                    <Box
                        sx={{
                            borderLeft: `4px solid ${dietColor.border}`,
                            backgroundColor: dietColor.bg,
                            padding: '4px 8px',
                            borderRadius: 4,
                            marginBottom: 1,
                            fontSize: 12,
                            fontWeight: 700
                        }}
                    >
                        {DietType?.type_desc}
                    </Box>


                    <table width="100%" style={{ borderCollapse: 'collapse', marginTop: 6 }}>
                        <thead>
                            <tr>
                                <th style={subTh}>Item No</th>
                                <th style={subTh}>Food</th>
                                <th style={subTh}>Qty/No</th>
                                <th style={subTh}>Measurement</th>
                                <th style={subTh}>Veg/noVeg</th>
                                <th style={subTh}>Caloreis</th>
                                <th style={subTh}>Status</th>
                                <th style={subTh}>Edit</th>
                                <th style={subTh}>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {foods?.map((food, i) => {
                                const key = `${day}-${time}-${i}`
                                const isEdit = editingIndex === key
                                return (
                                    <DietFoodItemRow
                                        key={key}
                                        food={food}
                                        i={i}
                                        day={day}
                                        time={time}
                                        isEdit={isEdit}
                                        editFood={editFood}
                                        setEditFood={setEditFood}
                                        handleEditSave={handleEditSave}
                                        handleDeleteFood={handleToggleFood}
                                        unitMap={unitMap}
                                        dietColor={dietColor}
                                    />
                                )
                            })}
                        </tbody>
                    </table>

                </td>
            </tr>
        )
    )
}


const subTh = { padding: 6, fontSize: 11, background: '#f0f0f0', textAlign: 'left', width: '15%' }

export default memo(DietFoodRow)