import React, { memo, useMemo, useState } from "react"
import DietFoodRow from "./DietFoodRow"
import { DIET_ALT_COLORS } from "src/views/Diet/CommonData/Common"
import { useDietTimes } from "src/views/Diet/CommonData/UseQuery"

const DietMealSection = ({
    dayId,
    weekData,
    onUpdateWeek,
}) => {

    const [editingIndex, setEditingIndex] = useState(null)
    const [editFood, setEditFood] = useState(null)

    const { data: DietTime = [] } = useDietTimes()
    // Get meals for the day
    const meals = useMemo(() => weekData?.[dayId] || {}, [weekData, dayId])

    // Convert meals object to entries once
    const mealEntries = useMemo(() => Object.entries(meals), [meals])

    // Fast lookup for diet type
    const dietTypeMap = useMemo(() => {
        const map = {}
        DietTime?.forEach(d => {
            map[d.type_slno] = d
        })
        return map
    }, [DietTime])


    return mealEntries.map(([time, foods], index) => {

        const DietType = dietTypeMap?.[time]
        const dietColor = DIET_ALT_COLORS[index % 2]

        return (
            <DietFoodRow
                key={`${dayId}-${time}`}
                day={dayId}
                time={time}
                foods={foods}
                index={index}
                DietType={DietType}
                dietColor={dietColor}
                weekData={weekData}
                onUpdateWeek={onUpdateWeek}
                editingIndex={editingIndex}
                setEditingIndex={setEditingIndex}
                editFood={editFood}
                setEditFood={setEditFood}
            />
        )
    })
}

export default memo(DietMealSection)