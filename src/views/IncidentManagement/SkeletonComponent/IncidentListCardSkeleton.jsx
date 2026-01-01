import React, { memo } from 'react'
import { Box, Divider, Skeleton } from '@mui/material'

const IncidentListCardSkeleton = () => {
    return (
        <Box
            sx={{
                width: '100%',
                mb: 3,
                p: 1,
                flexDirection: 'column',
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                border: '4px solid #ffb6ddff',
                borderLeftWidth: "4px",   // keep left
                borderRightWidth: "none",  // keep right
                borderTop: "none",        // remove top
                borderBottom: "none",     // remove bottom
                borderRadius: "20px / 15px",
                boxShadow: 2,
                height: 180

            }}
        >
            {/* Top Card */}
            <Box
                sx={{
                    width: '100%',
                    minHeight: 120,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    px: 2,
                    py: 1,
                }}
            >
                {/* Left Section */}
                <Box sx={{ width: '15%', display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    <Skeleton animation="wave" variant="text" width="80%" height={24} />
                    <Skeleton animation="wave" variant="text" width="90%" height={14} />
                    <Skeleton animation="wave" variant="text" width="70%" height={14} />
                    <Skeleton animation="wave" variant="text" width="60%" height={14} />
                    <Skeleton animation="wave" variant="text" width="50%" height={12} />
                </Box>

                <Divider orientation="vertical" flexItem />

                {/* Middle Section */}
                <Box sx={{ width: '25%', display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Skeleton animation="wave" variant="text" width="70%" height={22} />
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {[1, 2, 3].map(i => (
                            <Skeleton animation="wave"
                                key={i}
                                variant="rounded"
                                width={70}
                                height={26}
                            />
                        ))}
                    </Box>
                </Box>

                <Divider orientation="vertical" flexItem />

                {/* Involving Departments */}
                <Box sx={{ width: '25%', display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Skeleton animation="wave" variant="text" width="80%" height={22} />
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {[1, 2].map(i => (
                            <Skeleton animation="wave"
                                key={i}
                                variant="rounded"
                                width={90}
                                height={26}
                            />
                        ))}
                    </Box>
                </Box>

                <Divider orientation="vertical" flexItem />

                {/* Description Section */}
                <Box sx={{ width: '55%', display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    <Skeleton animation="wave" variant="text" width="40%" height={14} />
                    {[1, 2].map(i => (
                        <Skeleton animation="wave" key={i} variant="text" width="100%" height={12} />
                    ))}
                    <Skeleton animation="wave" variant="text" width="40%" height={14} />
                    {[1, 2].map(i => (
                        <Skeleton animation="wave" key={i} variant="text" width="100%" height={12} />
                    ))}
                </Box>
            </Box>

            {/* Bottom Actions */}
            <Box
                sx={{
                    width: '100%',
                    height: 50,
                    px: 1,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Skeleton animation="wave" variant="rounded" width={70} height={25} />
                    <Skeleton animation="wave" variant="rounded" width={70} height={25} />
                </Box>

                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <Skeleton animation="wave" variant="rounded" width={120} height={25} />
                    <Skeleton animation="wave" variant="circular" width={28} height={28} />
                    <Skeleton animation="wave" variant="circular" width={28} height={28} />
                </Box>
            </Box>
        </Box>
    )
}

export default memo(IncidentListCardSkeleton);
