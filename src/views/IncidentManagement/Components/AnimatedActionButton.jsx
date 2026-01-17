import React, { memo } from 'react';
import { Box, Tooltip } from '@mui/joy';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

// ✅ Animated Action Button Component
const AnimatedActionButton = ({
    title = "Register Incident",
    onClick,
    icon: Icon = AddCircleOutlineIcon,
    bgColor = 'var(--royal-purple-300)',
    iconColor = 'white',
    size = 26,
    tooltipPlacement = 'top',
}) => {
    return (
        <Box
            component="button" // important for click
            onClick={onClick}
            sx={{
                all: 'unset', // reset default button styles
                p: 2,
                bgcolor: bgColor,
                borderRadius: '50%',
                boxShadow:
                    '0 2px 4px 0 rgba(185, 177, 177, 0.2), 0 6px 20px 0 rgba(180, 177, 177, 0.19)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                animation: `boundingBounce 1.2s ease-in-out infinite`,
                transition: 'transform 0.2s ease',
                '&:hover': {
                    animation: 'none',
                    transform: 'scale(1.08)',
                    '& .animated-icon': { animation: 'none' },
                },
                '@keyframes boundingBounce': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-6px)' },
                },
            }}
        >
            <Tooltip title={title} placement={tooltipPlacement}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon
                        className="animated-icon"
                        sx={{
                            color: iconColor,
                            fontSize: size,
                            transition: 'transform 0.2s ease',
                        }}
                    />
                </Box>
            </Tooltip>
        </Box>
    );
};

export default memo(AnimatedActionButton);
