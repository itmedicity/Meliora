import { Box, Typography } from '@mui/joy'
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import React from 'react'

const NotProcessed = () => {
    return (
        <Box
            sx={{
                height: 520,
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                // background: 'linear-gradient(135deg, #f6f4ff, #ffffff)',
                borderRadius: 12,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 1.5,
                    padding: 4,
                    borderRadius: 10,
                    backgroundColor: '#fff',
                    // boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
                }}
            >
                <RestaurantMenuIcon
                    sx={{
                        fontSize: 52,
                        color: 'var(--royal-purple-400)',
                        opacity: 0.9,
                    }}
                />

                <Typography
                    sx={{
                        fontSize: 22,
                        fontWeight: 600,
                        color: 'var(--royal-purple-600)',
                        fontFamily: 'Bahnschrift',
                        letterSpacing: 0.5,
                    }}
                >
                    No Diet Plan Selected
                </Typography>

                <Typography
                    sx={{
                        fontSize: 14,
                        color: 'neutral.500',
                        textAlign: 'center',
                        maxWidth: 260,
                    }}
                >
                    Please select a diet plan to view the processed details.
                </Typography>
            </Box>
        </Box>
    )
}

export default NotProcessed
