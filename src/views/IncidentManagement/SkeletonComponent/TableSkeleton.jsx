import React, { memo } from 'react';
import { Skeleton, Box } from "@mui/material";


const TableSkeleton = ({ rows = 8, cols = 7 }) => {
    return (
        <Box sx={{ width: "100%", p: 1 }}>
            {/* Header skeleton */}
            <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
                <Skeleton
                    variant="rectangular"
                    height={56}
                    sx={{
                        flex: 1,
                        borderRadius: 1,
                        border: '0.5px solid #c79aeeff',
                        opacity: 0.25
                    }}
                />
            </Box>

            {/* Row skeletons */}
            {Array.from({ length: rows }).map((_, rowIndex) => (
                <Box
                    key={rowIndex}
                    sx={{ display: "flex", gap: 1, mb: 0.8 }}
                >
                    {Array.from({ length: cols }).map((_, colIndex) => (
                        <Box
                            key={colIndex}
                            sx={{
                                flex: 1,
                                height: 40,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: 1,
                                border: '0.5px solid #c79aeeff'
                            }}
                        >
                            <Skeleton
                                variant="rectangular"
                                height={16}
                                width="70%"
                                sx={{
                                    borderRadius: 1,
                                    // bgcolor: skeletonColor,
                                    opacity: 0.35
                                }}
                            />
                        </Box>
                    ))}
                </Box>
            ))}
        </Box>
    );
};

export default memo(TableSkeleton);
