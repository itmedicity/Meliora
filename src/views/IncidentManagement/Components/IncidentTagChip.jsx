import { Box } from "@mui/joy";
import React, { memo } from "react";

const IncidentTagChip = ({ tag, key }) => (
    <Box key={key} sx={{
        px: 1.4,
        py: 0.3,
        background: '#ede5f9',
        border: '1px solid #c6b6e9',
        borderRadius: '20px',
        fontSize: 11,
        fontWeight: 600,
        color: '#5d3a9c',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        boxShadow: 'inset 0 0 4px rgba(0, 0, 0, 0.05)',
        transition: 'background 0.3s',
        '&:hover': { background: '#e2d6f3' },
    }}>
        {tag}
    </Box>
);

export default memo(IncidentTagChip);
