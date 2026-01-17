import React, { memo } from 'react';
import { Fab, Slide } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const FloatingBackButton = ({ onClick, show = true }) => (
    <Slide
        direction="down"
        in={show}
        mountOnEnter
        unmountOnExit
        timeout={{ enter: 500, exit: 400 }} // smoother animation
    >
        <Fab
            color="primary"
            size="small"
            onClick={onClick}
            sx={{
                position: 'absolute',
                top: 10,
                right: 10,
                backgroundColor: '#7c3aed',
                boxShadow: '0 6px 18px rgba(0, 0, 0, 0.3)',
                transition: 'transform 0.3s ease, background-color 0.3s ease',
                '&:hover': {
                    backgroundColor: '#5b2dcf',
                    transform: 'scale(1.05)',
                },
            }}
        >
            <ArrowBackIcon />
        </Fab>
    </Slide>
);

export default memo(FloatingBackButton);
