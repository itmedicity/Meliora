import React, { memo } from 'react';
import { Box, Skeleton } from '@mui/joy';
import { HiOutlineCollection } from "react-icons/hi";
import { IoCalendarOutline } from 'react-icons/io5';
import IncidentTextComponent from '../Components/IncidentTextComponent';

const DepartmentDataCollectionSkeleton = ({ count = 3 }) => {
    return (
        <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2, background: "#f7f2f255" }}>

            {/* Header */}
            <Box
                sx={{
                    width: '100%',
                    bgcolor: 'var(--royal-purple-400)',
                    py: 0.5,
                    px: 2,
                }}
            >
                <IncidentTextComponent
                    text="DEPARTMENT DETAILS"
                    size={14}
                    weight={600}
                    color="White"
                />
            </Box>

            {/* Skeleton items */}
            {Array.from({ length: count }).map((_, index) => (
                <Box
                    key={index}
                    sx={{
                        p: 1.5,
                        borderRadius: "7px",
                        background: "#fafafa",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                        display: "flex",
                        flexDirection: "column",
                        gap: 0.5
                    }}
                >
                    {/* Header skeleton */}
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <HiOutlineCollection style={{ color: 'var(--royal-purple-400)', fontSize: 18 }} />
                            <Skeleton variant="text" width={120} height={24} />
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <IoCalendarOutline style={{ color: '#666', fontSize: 14 }} />
                            <Skeleton variant="text" width={80} height={18} />
                            <Skeleton variant="rectangular" width={90} height={24} sx={{ borderRadius: '12px' }} />
                        </Box>
                    </Box>
                </Box>
            ))}
        </Box>
    );
};

export default memo(DepartmentDataCollectionSkeleton);
