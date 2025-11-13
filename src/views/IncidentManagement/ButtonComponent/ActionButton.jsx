import React from 'react';
import { Box, Tooltip } from '@mui/joy';
import IncidentTextComponent from '../Components/IncidentTextComponent';

const ActionButton = ({ onClick, text, icon, tooltip }) => {
    return (
        <Box
            onClick={onClick}
            variant="soft"
            color="success"
            sx={{
                width: 80,
                px: 0.8,
                py: 0.5,
                border: '1.5px solid #d8dde2ff',
                bgcolor: 'var(--royal-purple-300)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 12px rgba(0,0,0,0.2)',
                },
                userSelect: 'none'
            }}
        >
            {icon ? (
                <Tooltip title={tooltip || ''}>
                    {icon}
                </Tooltip>
            ) : (
                <IncidentTextComponent
                    text={text || ''}
                    color="#ffffff"
                    size={13}
                    weight={400}
                />
            )}
        </Box>
    );
};

export default ActionButton;
