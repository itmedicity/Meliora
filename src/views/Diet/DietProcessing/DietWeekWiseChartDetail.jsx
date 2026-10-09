import { Box, Typography } from '@mui/joy'
import React from 'react'

const DietWeekWiseChartDetail = ({ dietData }) => {
    return (
        <Box sx={{ width: '100%' }}>
            {Object.entries(dietData).map(([day, meals]) => (
                <Box key={day} sx={{ mb: 4 }}>
                    {/* DAY HEADER */}
                    <Typography
                        sx={{
                            fontWeight: 800,
                            fontSize: 18,
                            mb: 1.5,
                            textTransform: 'uppercase',
                            color: '#9a0cc2'
                        }}
                    >
                        {day}
                    </Typography>

                    {/* MEALS */}
                    {Object.entries(meals).map(([mealType, foods]) => (
                        <Box key={mealType} sx={{ mb: 2 }}>
                            {/* MEAL HEADER */}
                            <Typography
                                sx={{
                                    fontWeight: 700,
                                    fontSize: 14,
                                    mb: 0.5,
                                    textTransform: 'capitalize',
                                    color: '#1976d2'
                                }}
                            >
                                {mealType?.replace(/([A-Z])/g, ' $1')}
                            </Typography>

                            {/* MEAL TABLE */}
                            <table
                                style={{
                                    width: '100%',
                                    borderCollapse: 'collapse',
                                    fontSize: 13
                                }}>
                                <thead>
                                    <tr style={{ background: '#f6f8fa' }}>
                                        <th style={th}>Food</th>
                                        <th style={th}>Qty</th>
                                        <th style={th}>Measure</th>
                                        <th style={th}>Type</th>
                                        <th style={th}>Calories</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {foods.map((item, idx) => (
                                        <tr key={idx}>
                                            <td style={td}>{item.food}</td>
                                            <td style={td}>{item.qty}</td>
                                            <td style={td}>{item.measure}</td>
                                            <td style={td}>{item.type}</td>
                                            <td style={td}>{item.calories} kcal</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </Box>
                    ))}
                </Box>
            ))}
        </Box>
    )
}

export default DietWeekWiseChartDetail

/* ---------- styles ---------- */

const th = {
    padding: '8px',
    textAlign: 'left',
    borderBottom: '1px solid #ddd',
    fontWeight: 700
}

const td = {
    width:'10%',
    padding: '8px',
    borderBottom: '1px solid #eee'
}
