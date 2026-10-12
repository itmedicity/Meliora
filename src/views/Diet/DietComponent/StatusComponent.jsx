import React from 'react';
import { Box } from '@mui/joy';
import DietTextComponent from './DietTextComponent';

const StatusComponent = ({
    status,
    value,
    onChange
}) => {

    const isActive = value === status.label;

    const Icon = status.icon;

    return (
        <Box
            role="button"
            onClick={onChange}
            sx={{
                display: 'inline-flex',
                alignItems: 'center',

                px: 1.2,
                py: 0.6,

                borderRadius: 5,

                cursor: 'pointer',
                userSelect: 'none',

                transition: '0.2s ease',

                bgcolor: isActive
                    ? `${status.color}.solidBg`
                    : '#fff',

                border: `1px solid var(--joy-palette-${status.color}-solidBg)`,

                '&:hover': {
                    transform: 'translateY(-1px)',
                    boxShadow: 'sm'
                }
            }}
        >

            <Icon
                fontSize="small"
                sx={{
                    mr: 0.5,

                    color: isActive
                        ? '#fff'
                        : `var(--joy-palette-${status.color}-solidBg)`
                }}
            />

            <DietTextComponent
                size={10}
                value={status.label}
                color={
                    isActive
                        ? '#fff'
                        : `var(--joy-palette-${status.color}-solidBg)`
                }
            />
        </Box>
    );
};

export default StatusComponent;