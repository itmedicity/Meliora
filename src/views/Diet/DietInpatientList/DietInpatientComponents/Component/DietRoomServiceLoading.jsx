import React, { memo } from 'react';
import { Box } from '@mui/joy';
import DietTextComponent from 'src/views/Diet/DietComponent/DietTextComponent';

const DietRoomServiceLoading = () => {
    return (
        <Box
            sx={{
                width: '100%',
                height: '90vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background:
                    'linear-gradient(135deg, #f4f7ff 0%, #eef7f2 100%)',
                p: 2
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    maxWidth: 500,
                    bgcolor: '#fff',
                    borderRadius: 5,
                    p: 4,
                    textAlign: 'center',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                    border: '1px solid #e5e7eb'
                }}
            >
                {/* Loader */}
                <Box
                    sx={{
                        width: 70,
                        height: 70,
                        borderRadius: '50%',
                        border: '6px solid #e3f2fd',
                        borderTop: '6px solid #0b6bcb',
                        margin: '0 auto',
                        animation: 'spin 1s linear infinite',

                        '@keyframes spin': {
                            '0%': {
                                transform: 'rotate(0deg)'
                            },
                            '100%': {
                                transform: 'rotate(360deg)'
                            }
                        }
                    }}
                />

                <Box sx={{ mt: 3 }}>
                    <DietTextComponent
                        value={'Loading Diet & Room Service'}
                        size={18}
                        weight={700}
                        color={'#0b6bcb'}
                    />
                </Box>

                <Box sx={{ mt: 1 }}>
                    <DietTextComponent
                        value={
                            'Fetching patient diet plans and nursing station details.'
                        }
                        size={13}
                        weight={500}
                        color={'#555'}
                    />
                </Box>

                <Box
                    sx={{
                        mt: 3,
                        bgcolor: '#f8fafc',
                        borderRadius: 3,
                        p: 2,
                        border: '1px dashed #cbd5e1'
                    }}
                >
                    <DietTextComponent
                        value={
                            'Please wait while the latest dietary information is being prepared.'
                        }
                        size={12}
                        weight={600}
                        color={'#374151'}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default memo(DietRoomServiceLoading);