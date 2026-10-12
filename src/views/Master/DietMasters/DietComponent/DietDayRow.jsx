import React, { memo } from "react";
import { IconButton } from "@mui/joy";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import DietAddFoodForm from "./DietAddFoodForm";
import DietMealSection from "./DietMealSection";

const DietDayRow = ({
    day,
    weekData,
    onUpdateWeek,
    addDay,
    setAddDay,
    viewDay,
    setViewDay,
    selectedTime,
    setSelectedTime
}) => {

    const dayId = day.id

    return (
        <tbody style={{ width: '100%' }}>
            <tr style={tr}>
                <td style={td}>{day.name}</td>
                <td style={td}>
                    <IconButton
                        onClick={() =>
                            setViewDay(p => ({ ...p, [dayId]: !p[dayId] }))
                        }>
                        {viewDay[dayId]
                            ? <VisibilityOffOutlinedIcon sx={{ fontSize: 16 }} />
                            : <VisibilityOutlinedIcon sx={{ fontSize: 16 }} />
                        }
                    </IconButton>
                </td>

                <td style={td}>
                    <IconButton
                        onClick={() =>
                            setAddDay(addDay === dayId ? null : dayId)
                        }
                    >
                        {addDay === dayId ? <CloseIcon sx={{ fontSize: 16 }} /> : <AddIcon sx={{ fontSize: 16 }} />}
                    </IconButton>
                </td>
            </tr>
            {/* ADD FORM */}
            {addDay === dayId &&
                <DietAddFoodForm
                    dayId={dayId}
                    weekData={weekData}
                    onUpdateWeek={onUpdateWeek}
                    selectedTime={selectedTime}
                    setSelectedTime={setSelectedTime}
                />
            }
            {/* MEAL LIST */}
            {(viewDay[dayId] || addDay === dayId) &&
                <DietMealSection
                    dayId={dayId}
                    weekData={weekData}
                    onUpdateWeek={onUpdateWeek}
                />
            }
        </tbody>
    )
}
const td = { padding: 6, fontSize: 12 }
const tr = { borderBottom: '1px solid rgba(0,0,0,0.15)', borderTop: '1px solid rgba(0,0,0,0.15)' }

export default memo(DietDayRow)