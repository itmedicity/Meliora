import React from 'react';
import { Box, IconButton } from '@mui/joy';
import IncidentTextComponent from '../IncidentManagement/Components/IncidentTextComponent';
import { IoExit } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

const Inciwrapper = ({
    title = 'Section Title',
    children,
    sx = {},
    showClose = true,
    disablePadding = false,
}) => {
    const navigate = useNavigate();

    const handleClose = () => {
        navigate(-1);
    };

    return (
        <Box
            sx={{
                width: '100%',
                borderRadius: 8,
                border: '1px solid #e0e0e0',
                boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
                backgroundColor: '#fff',
                display: 'flex',
                flexDirection: 'column',
                maxHeight: '100vh',
                overflow: 'auto',
                animation: 'fadeIn 0.3s ease-in-out',
                '&::-webkit-scrollbar': {
                    display: 'none',
                },
                '-ms-overflow-style': 'none',
                'scrollbar-width': 'none',
                ...sx,
                '@keyframes fadeIn': {
                    from: { opacity: 0 },
                    to: { opacity: 1 },
                },
            }}
        >
            {/* Sticky Header */}
            <Box
                sx={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 100,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    px: 2,
                    py: 1,
                    borderBottom: '1px solid #ececec',
                    // bgcolor: 'linear-gradient(to right, #f5f7fa, #e2eafc)',
                    bgcolor: 'white',
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8,
                }}
            >
                <IncidentTextComponent
                    text={title}
                    color={'#2c3e50'}
                    size={18}
                    weight={600}
                />
                {showClose && (
                    <IconButton
                        onClick={handleClose}
                        sx={{
                            transition: 'all 0.2s',
                            '&:hover': {
                                transform: 'scale(1.1)',
                                color: 'var(--royal-purple-400)',
                            },
                        }}
                    >
                        <IoExit style={{ fontSize: 22 }} />
                    </IconButton>
                )}
            </Box>

            {/* Scrollable Content */}
            <Box
                sx={{
                    flex: 1,
                    p: disablePadding ? 0 : 2,
                    backgroundColor: '#fafafa',
                }}
            >
                {children}
            </Box>
        </Box>
    );
};

export default Inciwrapper;
