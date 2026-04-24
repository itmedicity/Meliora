import { Box, Divider, Typography } from '@mui/joy'
import React from 'react'

const Section = ({ title, icon, children }) => {
    return (
        <Box sx={{ mb: 3 }}>
            <Typography
                level="title-md"
                startDecorator={icon}
                sx={{ mb: 0.5 }}
            >
                {title}
            </Typography>
            <Divider sx={{ mb: 1.5 }} />
            {children}
        </Box>
    )
}

export default Section