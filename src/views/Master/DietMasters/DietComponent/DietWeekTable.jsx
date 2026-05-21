import React, { memo, useState } from "react";
import { Box } from "@mui/joy";
import { DAYS } from "src/views/Diet/CommonData/Common";
import DietDayRow from "./DietDayRow";


const DietWeekTable = ({ weekData = {}, onUpdateWeek }) => {

    const [addDay, setAddDay] = useState(null)
    const [viewDay, setViewDay] = useState({})
    const [selectedTime, setSelectedTime] = useState({})

    return (
        <Box sx={{ border: "1px solid rgba(0,0,0,0.12)", borderRadius: 6 }}>
            <table width="100%" style={{ borderCollapse: 'collapse', }}>
                <thead>
                    <tr style={tr}>
                        <th style={{
                            padding: 8,
                            fontSize: 12,
                            fontWeight: 700,
                            background: '#f5f5f5',
                            textAlign: 'left',
                            width: '80%'
                        }}>Day</th>
                        <th style={th}>View</th>
                        <th style={th}>Add</th>
                    </tr>
                </thead>

                {DAYS?.map((day) => (
                    <DietDayRow
                        key={day.id}
                        day={day}
                        weekData={weekData}
                        onUpdateWeek={onUpdateWeek}
                        addDay={addDay}
                        setAddDay={setAddDay}
                        viewDay={viewDay}
                        setViewDay={setViewDay}
                        selectedTime={selectedTime}
                        setSelectedTime={setSelectedTime}
                    />
                ))}
            </table>
        </Box>
    )
}



const th = { padding: 8, fontSize: 12, fontWeight: 700, background: '#f5f5f5', textAlign: 'left' }
const tr = { borderBottom: '1px solid rgba(0,0,0,0.15)', borderTop: '1px solid rgba(0,0,0,0.15)' }

export default memo(DietWeekTable)