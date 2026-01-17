import { Box } from '@mui/joy'
import React, { memo } from 'react'

const NatureofIncidentInfoTag = ({ label }) => {
    return (
        <Box
            sx={{
                px: 1.4,
                py: 0.3,
                background: '#ede5f9',
                border: '1px solid #c6b6e9',
                borderRadius: '20px',
                fontSize: 11,
                fontWeight: 600,
                color: '#5d3a9c'
            }}
        >
            {label}
        </Box>
    )
}

export default memo(NatureofIncidentInfoTag);