import React from 'react';
import { Box } from '@mui/joy';
import CircleIcon from '@mui/icons-material/FiberManualRecord'; // Small dot icon

const IncidentCreatorTag = ({ creatorType }) => {
    return (
        <Box
            sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                px: 2,
                py: 0.5,
                borderRadius: '999px',
                color: '#000',
                fontSize: 16,
                fontWeight: 500,
                letterSpacing: 0.4,
                textTransform: 'uppercase',
                userSelect: 'none',
                width: 'fit-content',
            }}
        >
            <CircleIcon sx={{ fontSize: 10, color: '#000' }} />
            {creatorType}
        </Box>
    );
};

export default IncidentCreatorTag;
