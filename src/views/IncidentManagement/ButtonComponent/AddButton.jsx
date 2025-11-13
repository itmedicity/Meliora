import React, { memo } from 'react';
import { Box, Typography } from '@mui/joy';
import ArrowForward from '@mui/icons-material/ArrowForward';

const AddButton = ({ onClick, label, disable, icon: Icon }) => {

    return (
        <Box
            onClick={!disable ? onClick : undefined}
            sx={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: 1,
                px: 1.2,
                py: 0.3,
                borderRadius: '8px',
                color: '#fff',
                fontWeight: 500,
                cursor: 'pointer',
                boxShadow: '0 3px 6px rgba(0,0,0,0.15)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 12px rgba(0,0,0,0.2)',
                },
                userSelect: 'none',
                my: 1,
                background: 'var(--royal-purple-300)'
            }}
        >
            <Typography level="body-md" sx={{ color: 'inherit', fontWeight: 500 }}>
                {label}
            </Typography>
            {
                Icon ? <Icon fontSize="small" /> : <ArrowForward fontSize="small" />
            }
        </Box>
    );
};

export default memo(AddButton);
