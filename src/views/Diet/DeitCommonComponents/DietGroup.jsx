import { Box } from '@mui/joy';
import React from 'react'

const DietGroup = ({ title, titleColor, bg, children }) => (
    <Box sx={{ mb: 1 }}>
        <Box
            sx={{
                px: 1,
                py: 0.5,
                fontWeight: 700,
                fontSize: 14,
                color: titleColor,
                borderLeft: `4px solid ${titleColor}`,
                bgcolor: bg,
                borderRadius: 1,
                mb: 0.5,
            }}
        >
            {title}
        </Box>

        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: {
                    xs: "repeat(auto-fit, minmax(140px, 1fr))",
                    sm: "repeat(auto-fit, minmax(180px, 1fr))",
                    md: "repeat(auto-fit, minmax(220px, 1fr))",
                    lg: "repeat(auto-fit, minmax(260px, 1fr))",
                },
                gap: 1,
            }}
        >
            {children}
        </Box>
    </Box>
);


export default DietGroup