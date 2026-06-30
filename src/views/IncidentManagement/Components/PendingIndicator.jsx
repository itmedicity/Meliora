// src/views/CommonComponent/PendingIndicator.jsx
import React from 'react';
import { Box } from '@mui/joy';

const PendingIndicator = ({ onFilter }) => {

    const indicators = [
        {
            borderColor: '8px solid #d81616',
            title: 'DDC & DCR',
            description: 'Both Data Collection & Action Pending',
            filterType: 'both'
        },
        {
            borderColor: '8px solid #f39c12',
            title: 'DDC',
            description: 'Data Collection Pending',
            filterType: 'ddc'
        },
        {
            borderColor: '8px solid #0422e5',
            title: 'DAR',
            description: 'Department Action Pending',
            filterType: 'dcr'
        },
        {
            borderColor: '4px solid var(--rose-pink-400)',
            title: 'NORMAL',
            description: 'No Pending Items',
            filterType: 'normal'
        },
        {
            borderColor: 'none',
            title: 'ALL',
            description: 'Show All Incidents',
            filterType: 'all'
        }
    ];

    const handleFilter = (filterType) => {
        onFilter(filterType);
    };

    return (
        <Box
            sx={{
                position: 'fixed',
                top: 66,
                right: 96,
                zIndex: 1000,
         
                borderRadius: 2,
                p: 1.5,
                display: 'flex',
                gap: 2,
                alignItems: 'center'
            }}
        >
            {indicators.map((item, index) => (
                <Box
                    key={index}
                    onClick={() => handleFilter(item.filterType)}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.8,
                        px: 1,
                        py: 0.5,
                        cursor: 'pointer',
                        borderRadius: 1,
                        transition: 'background-color 0.2s',
                        '&:hover': {
                            bgcolor: '#f5f5f5'
                        }
                    }}
                >
                    {/* Color Box */}
                    {item.borderColor !== 'none' && (
                        <Box
                            sx={{
                                width: 16,
                                height: 16,
                                borderRadius: 0.5,
                                border: item.borderColor,
                                backgroundColor: item.borderColor.includes('rose-pink') ? '#ffebee' : 'transparent',
                                boxShadow: 'sm'
                            }}
                        />
                    )}

                    {/* Text */}
                    <Box>
                        <Box sx={{ fontWeight: 600, fontSize: 11, color: '#444', lineHeight: 1.2 }}>
                            {item.title}
                        </Box>
                        {item.description && (
                            <Box sx={{ fontSize: 9, color: '#888', lineHeight: 1.2 }}>
                                {item.description}
                            </Box>
                        )}
                    </Box>
                </Box>
            ))}
        </Box>
    );
};

export default PendingIndicator;