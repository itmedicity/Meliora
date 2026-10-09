import React, { memo } from 'react';
import { Box } from '@mui/joy';

import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import RestaurantMenuRoundedIcon from '@mui/icons-material/RestaurantMenuRounded';
import RoomServiceRoundedIcon from '@mui/icons-material/RoomServiceRounded';
import LocalHospitalRoundedIcon from '@mui/icons-material/LocalHospitalRounded';

import DietTextComponent from 'src/views/Diet/DietComponent/DietTextComponent';

const NsStationError = () => {
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
                    maxWidth: 650,
                    bgcolor: '#fff',
                    borderRadius: 5,
                    p: 4,
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: '0 10px 35px rgba(0,0,0,0.08)',
                    border: '1px solid #e8eef5'
                }}
            >
              
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: 6,
                        background:
                            'linear-gradient(90deg, #0b6bcb 0%, #2e7d32 100%)'
                    }}
                />

                {/* Icons */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 1,
                        mb: 2
                    }}
                >
                    <Box
                        sx={{
                            bgcolor: '#e3f2fd',
                            p: 1.2,
                            borderRadius: '50%'
                        }}
                    >
                        <RestaurantMenuRoundedIcon
                            sx={{
                                color: '#0b6bcb',
                                fontSize: 28
                            }}
                        />
                    </Box>

                    <Box
                        sx={{
                            bgcolor: '#fff3e0',
                            p: 1.2,
                            borderRadius: '50%'
                        }}
                    >
                        <RoomServiceRoundedIcon
                            sx={{
                                color: '#ef6c00',
                                fontSize: 28
                            }}
                        />
                    </Box>

                    <Box
                        sx={{
                            bgcolor: '#e8f5e9',
                            p: 1.2,
                            borderRadius: '50%'
                        }}
                    >
                        <LocalHospitalRoundedIcon
                            sx={{
                                color: '#2e7d32',
                                fontSize: 28
                            }}
                        />
                    </Box>
                </Box>

                
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        mb: 1
                    }}
                >
                    <WarningAmberRoundedIcon
                        sx={{
                            fontSize: 65,
                            color: '#ff9800'
                        }}
                    />
                </Box>

                
                <Box sx={{ textAlign: 'center' }}>
                    <DietTextComponent
                        value={'Nursing Station Mapping Not Available'}
                        size={20}
                        weight={700}
                        color={'#d32f2f'}
                    />
                </Box>

                <Box
                    sx={{
                        mt: 2,
                        textAlign: 'center',
                        px: 2
                    }}
                >
                    <DietTextComponent
                        value={
                            'Unable to identify your Nursing Station for Diet and Room Service operations.'
                        }
                        size={14}
                        weight={500}
                        color={'#555'}
                    />
                </Box>

             
                <Box
                    sx={{
                        mt: 3,
                        p: 2,
                        borderRadius: 3,
                        bgcolor: '#f8fafc',
                        border: '1px dashed #cbd5e1',
                        textAlign: 'center'
                    }}
                >
                    <DietTextComponent
                        value={
                            'Please contact the EDP ("Information Technology") to configure your NS Station access.'
                        }
                        size={13}
                        weight={600}
                        color={'#374151'}
                    />

                    <Box sx={{ mt: 1 }}>
                        <DietTextComponent
                            value={'Support : 1666 / 1555'}
                            size={16}
                            weight={700}
                            color={'#0b6bcb'}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default memo(NsStationError);