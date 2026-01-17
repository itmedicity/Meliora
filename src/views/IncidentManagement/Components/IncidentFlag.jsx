import React, { memo } from 'react'
import { Box, Typography } from '@mui/material'

const IncidentFlag = ({ code, date }) => {
    return (
        <Box
            sx={{
                position: 'absolute',
                top: -14,
                left: -14,
                zIndex: 1301, // above modal
                bgcolor: '#6d28d9', // violet
                color: '#fff',
                px: 2,
                py: 0.8,
                borderTopLeftRadius: 6,
                borderBottomRightRadius: 12,
                boxShadow: '0 6px 18px rgba(0,0,0,0.25)',
                minWidth: 160,
            }}
        >
            <Typography
                sx={{
                    fontSize: 14,
                    fontWeight: 800,
                    lineHeight: 1.2,
                }}
            >
                {code}
            </Typography>

            <Typography
                sx={{
                    fontSize: 11,
                    opacity: 0.85,
                    fontWeight: 500,
                }}
            >
                {date}
            </Typography>

            {/* Flag tail */}
            <Box
                sx={{
                    position: 'absolute',
                    bottom: -8,
                    left: 0,
                    width: 0,
                    height: 0,
                    borderLeft: '12px solid transparent',
                    borderRight: '12px solid transparent',
                    borderTop: '8px solid #6d28d9',
                }}
            />
        </Box>
    )
}

export default memo(IncidentFlag)
