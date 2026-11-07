import React, { memo } from 'react';
import { Box, Button } from '@mui/joy';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';

import DietTextComponent from 'src/views/Diet/DietComponent/DietTextComponent';

const DietRoomServiceError = ({
    title = 'Unable to Load Diet Dashboard',
    message = 'An unexpected error occurred while fetching patient diet or nursing station details.',
    error,
    onRetry
}) => {
    return (
        <Box
            sx={{
                width: '100%',
                height: '90vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background:
                    'linear-gradient(135deg, #fff5f5 0%, #fff 100%)',
                p: 2
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    maxWidth: 550,
                    bgcolor: '#fff',
                    borderRadius: 5,
                    p: 4,
                    textAlign: 'center',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                    border: '1px solid #fee2e2'
                }}
            >
         
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        mb: 2
                    }}
                >
                    <Box
                        sx={{
                            width: 80,
                            height: 80,
                            borderRadius: '50%',
                            bgcolor: '#fff1f2',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <ErrorOutlineRoundedIcon
                            sx={{
                                fontSize: 50,
                                color: '#d32f2f'
                            }}
                        />
                    </Box>
                </Box>

              
                <DietTextComponent
                    value={title}
                    size={20}
                    weight={700}
                    color={'#d32f2f'}
                />

                <Box sx={{ mt: 2 }}>
                    <DietTextComponent
                        value={message}
                        size={13}
                        weight={500}
                        color={'#555'}
                    />
                </Box>

               
                {
                    error &&
                    <Box
                        sx={{
                            mt: 3,
                            p: 2,
                            borderRadius: 3,
                            bgcolor: '#fff8f8',
                            border: '1px dashed #fca5a5'
                        }}
                    >
                        <DietTextComponent
                            value={
                                error?.message ||
                                'Internal Server Error'
                            }
                            size={12}
                            weight={600}
                            color={'#b91c1c'}
                        />
                    </Box>
                }

                {/* Support */}
                <Box sx={{ mt: 3 }}>
                    <DietTextComponent
                        value={'Please contact IT Support : 1666 / 1555'}
                        size={14}
                        weight={700}
                        color={'#0b6bcb'}
                    />
                </Box>

               
                {
                    onRetry &&
                    <Box sx={{ mt: 3 }}>
                        <Button
                            variant="solid"
                            color="danger"
                            onClick={onRetry}
                        >
                            Retry Again
                        </Button>
                    </Box>
                }
            </Box>
        </Box>
    );
};

export default memo(DietRoomServiceError);