import React, { useState } from "react"
import { Box } from "@mui/joy"
import ChooseDietItemName from "src/views/CommonSelectCode/ChooseDietItemName"
import ChooseDietMeasurementSelect from "src/views/CommonSelectCode/ChooseDietMeasurementSelect"
import ChooseDIetType from "src/views/CommonSelectCode/ChooseDIetType"
import DietButton from "src/views/Diet/DietComponent/DietButton"

const DietAddFoodForm = ({ dayId, weekData, onUpdateWeek, selectedTime, setSelectedTime }) => {

    const [tempFood, setTempFood] = useState({
        item_id: null,
        item_name: "",
        qty: "",
        measure: "",
        itemtype: ""
    })

    // Add selected food item to the current day's selected meal time
    const handleAddFood = () => {
        // Get the selected meal time (Breakfast/Lunch/Dinner etc.) for the current day
        const time = selectedTime[dayId]
        // Validate required fields before adding
        // Prevent adding if meal time, food item, or quantity is missing
        if (!time || !tempFood.item_id || !tempFood.qty) return
        // Update the weekData structure by adding the new food item
        onUpdateWeek({
            ...weekData, // keep existing week data
            [dayId]: {
                ...(weekData[dayId] || {}), // keep existing meals for this day
                // Add the new food item to the selected meal time
                [time]: [
                    ...(weekData[dayId]?.[time] || []), // keep existing foods for this meal time
                    tempFood // append the new food item
                ]
            }
        })
        // Reseting
        setTempFood({
            item_id: null,
            item_name: "",
            qty: "",
            measure: "",
            itemtype: ""
        })
    }

    return (
        <tr style={{ width: '100%', backgroundClip: 'orange' }}>
            <td colSpan={3} style={{ padding: 8 }}>
                <Box sx={{
                    width: '100%',
                    margin: 'auto',
                    display: 'flex',
                    gap: 1,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>

                    <ChooseDIetType
                        value={selectedTime[dayId] || ""}
                        setValue={(v) =>
                            setSelectedTime(p => ({ ...p, [dayId]: v }))
                        }
                    />

                    <ChooseDietItemName
                        value={tempFood.item_id}
                        setValue={v => setTempFood(p => ({ ...p, item_id: v }))}
                        setName={n => setTempFood(p => ({ ...p, item_name: n }))}
                        setItemType={n => setTempFood(p => ({ ...p, itemtype: n }))}
                    />

                    <ChooseDietMeasurementSelect
                        value={tempFood.measure}
                        setValue={(v) => setTempFood(p => ({ ...p, measure: v }))}
                    />

                    <input
                        className="qty-input"
                        type="number"
                        value={tempFood.qty}
                        onChange={(e) =>
                            setTempFood(p => ({ ...p, qty: e.target.value }))
                        }
                    />

                    <DietButton name="Save" onClick={handleAddFood} />

                </Box>
            </td>
        </tr>
    )
}

export default React.memo(DietAddFoodForm)