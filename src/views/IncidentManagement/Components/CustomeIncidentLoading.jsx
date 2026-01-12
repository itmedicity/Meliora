import React, { memo } from 'react';
import { Box, Typography } from '@mui/material';

const CustomeIncidentLoading = ({ text }) => {
    return (
        <Box
            sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                borderRadius: 2,
                backdropFilter: 'blur(5px)',
                backgroundColor: 'rgba(255, 255, 255, 0.4)',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    gap: 1,
                    mb: 2,
                }}
            >
                {[...Array(3)].map((_, i) => (
                    <Box
                        key={i}
                        sx={{
                            width: 15,
                            height: 15,
                            borderRadius: '50%',
                            backgroundColor: 'var(--royal-purple-400)',
                            animation: `bounce 1.2s infinite ease-in-out`,
                            animationDelay: `${i * 0.2}s`,
                        }}
                    />
                ))}
            </Box>

            <Typography
                variant="h6"
                sx={{
                    color: 'var(--royal-purple-400)',
                    fontWeight: 500,
                    animation: 'pulseText 2s infinite',
                }}
            >
                {
                    text
                }

            </Typography>

            <style>
                {`
                    @keyframes bounce {
                        0%, 80%, 100% {
                            transform: scale(0);
                        }
                        40% {
                            transform: scale(1);
                        }
                    }

                    @keyframes pulseText {
                        0% { opacity: 0.5; }
                        50% { opacity: 1; }
                        100% { opacity: 0.5; }
                    }
                `}
            </style>
        </Box>
    );
};

export default memo(CustomeIncidentLoading);
