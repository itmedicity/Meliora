import React, { memo } from 'react';
import { Card, Typography } from '@mui/joy';
import { Box } from '@mui/system';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import SchoolIcon from '@mui/icons-material/School';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';

const StaffCard = ({ selected, onSelect }) => {

    const options = [
        {
            label: 'Hospital staff',
            value: 'Hospital Staff',
            icon: <LocalHospitalIcon sx={{ fontSize: 24 }} />,
        },
        {
            label: 'HS',
            value: 'HS',
            icon: <SupervisorAccountIcon sx={{ fontSize: 24 }} />,
        },
        {
            label: 'PG',
            value: 'PG',
            icon: <SchoolIcon sx={{ fontSize: 24 }} />,
        },
        {
            label: 'Professional staff',
            value: 'Professional staff',
            icon: <HomeRepairServiceIcon sx={{ fontSize: 24 }} />,
        },
    ];



    return (
        <Card
            variant="outlined"
            sx={{
                p: 2,
                width: '100%',
                borderRadius: 'lg',
                transition: '0.3s ease',
            }}
        >
            <Typography level="title-md" sx={{ mb: 2, fontWeight: 600 }}>
                {`${selected ? `Selected ${selected}` : 'Select Staff'} Type`}
            </Typography>

            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 1.5,
                    justifyContent: selected ? 'center' : 'space-between',
                    transition: '0.3s ease',
                }}
            >
                {options?.map((option) => {
                    const isSelected = selected === option.value;
                    const isHidden = selected && !isSelected;

                    return (
                        <Box
                            key={option.value}
                            onClick={() => onSelect(option.value)}
                            sx={{
                                flex: isSelected ? '1 1 100%' : '1 1 calc(50% - 8px)',
                                maxWidth: isSelected ? '100%' : 'calc(50% - 8px)',
                                opacity: isHidden ? 0 : 1,
                                maxHeight: isHidden ? 0 : 50,
                                visibility: isHidden ? 'hidden' : 'visible',
                                position: isHidden ? 'absolute' : 'relative', // this removes spacing
                                pointerEvents: isHidden ? 'none' : 'auto',
                                transition: 'opacity 0.4s ease, max-height 0.4s ease, transform 0.4s ease',
                                overflow: 'hidden',
                                px: 2,
                                py: 1.5,
                                borderRadius: 2,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                border: '1px solid #e0e0e0',
                                borderColor: isSelected ? '#7c3aed' : 'neutral.outlinedBorder',
                                background: isSelected
                                    ? 'linear-gradient(135deg, #ede9fe, #e0e7ff)'
                                    : 'white',
                                boxShadow: isSelected ? 'lg' : 'none',
                                transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                                '&:hover': {
                                    boxShadow: 'lg',
                                    borderColor: '#7c3aed',
                                },
                            }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                                <Box sx={{ color: '#6d28d9' }}>{option.icon}</Box>
                                <Typography level="body-md" sx={{ fontWeight: 500 }}>
                                    {option.label}
                                </Typography>
                            </Box>
                            {isSelected && (
                                <CheckCircleIcon
                                    fontSize="medium"
                                    sx={{
                                        color: '#5b21b6',
                                        transition: '0.2s ease',
                                    }}
                                />
                            )}
                        </Box>
                    );
                })}
            </Box>
        </Card>
    );
};

export default memo(StaffCard);
