import React, { memo } from 'react';
import { Box, Avatar } from '@mui/joy';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects'; // as the step icon (you can change)
import IncidentTextComponent from './IncidentTextComponent';

const StepCompletedCard = ({ subtext, text, step }) => {
    return (
        <Box
            sx={{
                width: '100%',
                minHeight: 100,
                // maxHeight:120,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                px: 3,
                bgcolor: 'var(--royal-purple-50)',
                borderRadius: 5,
                mb: 1,
                animation: 'fadeIn 0.5s ease-in'
            }}
        >
            {/* First Box - Violet Aura Icon */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar
                    variant="soft"
                    sx={{
                        bgcolor: '#ede7f6', // light violet
                        // boxShadow: '0 0 8px 4px rgba(103, 58, 183, 0.4)', // violet aura
                        boxShadow: '0 0 8px 4px rgba(215, 199, 243, 0.4)', // violet aura
                        width: { sm: 38, md: 48 },
                        height: { sm: 38, md: 48 },
                    }}
                >
                    <EmojiObjectsIcon sx={{ color: '#673ab7' }} />
                </Avatar>
            </Box>

            {/* Middle Placeholder (empty or steps) */}
            <Box sx={{ flex: 1, mx: 2, }}>
                <IncidentTextComponent text={`STEP ${step}`} color={'#403d3dff'} size={8} weight={400} />
                <IncidentTextComponent text={text} color={'#403d3dff'} size={{ lg: 14, xl: 16 }} weight={600} />
                <IncidentTextComponent text={subtext} color={'#403d3dff'} size={12} weight={400} />
            </Box>

            {/* Last Box - Green Tick */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar
                    variant="soft"
                    sx={{
                        bgcolor: '#e8f5e9',
                        width: { sm: 38, md: 48 },
                        height: { sm: 38, md: 48 },
                    }}
                >
                    <CheckCircleIcon sx={{ color: 'green' }} />
                </Avatar>
            </Box>
        </Box>
    );
};

export default memo(StepCompletedCard);
