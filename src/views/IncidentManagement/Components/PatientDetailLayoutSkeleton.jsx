import React from 'react';
import { Box, Skeleton } from '@mui/joy';

const PatientDetailLayoutSkeleton = () => {
    const skeletonItems = Array.from({ length: 5 });

    return (
        <Box
            sx={{
                width: '100%',
                height: 160,
                p: 1,
                display: 'flex',
                gap: 2,
                bgcolor: 'white',
                my: 2,
                borderRadius: 5,
                border: '1.5px solid #d8dde2ff'

            }}
        >
            {/* Avatar Skeleton */}
            <Skeleton
                variant="circular"
                width={60}
                height={60}
                animation="wave"

            />

            {/* Patient Detail Card Skeleton */}
            <Box sx={{ flex: 1, mt: 1 }}>
                {skeletonItems.map((_, index) => (
                    <Box
                        key={index}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            mb: 1,
                            gap: 2
                        }}
                    >
                        <Skeleton
                            variant="circular"
                            width={20}
                            height={20}
                            animation="wave"

                        />
                        <Skeleton
                            variant="text"
                            width="90%"
                            height={16}
                            animation="wave"

                        />
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default PatientDetailLayoutSkeleton;
