import React from 'react';

import {
    Box,
    Sheet,
    Stack,
    Skeleton
} from '@mui/joy';



const MessageSkeleton = ({ isOwn = false }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: isOwn ? 'flex-end' : 'flex-start',
                animation: 'fadeIn 0.3s ease'
            }}
        >
            <Stack spacing={0.4} sx={{ maxWidth: '75%', minWidth: '120px' }}>
                {/* Sender Avatar Skeleton - Only for others */}
                {!isOwn && (
                    <Stack
                        direction="row"
                        spacing={0.8}
                        alignItems="center"
                        sx={{ ml: 0.5 }}
                    >
                        <Skeleton
                            variant="rounded"
                            sx={{
                                width: 36,
                                height: 36,
                                borderRadius: '50%',
                                bgcolor: '#e0e0e0'
                            }}
                        />
                        <Skeleton
                            variant="rounded"
                            sx={{
                                width: 150,
                                height: 14,
                                borderRadius: 4,
                                bgcolor: '#e0e0e0'
                            }}
                        />
                    </Stack>
                )}

                {/* Message Bubble Skeleton */}
                <Sheet
                    sx={{
                        px: 1.5,
                        py: 1,
                        borderRadius: 20,
                        bgcolor: isOwn ? '#1976d2' : '#ffffff',
                        border: isOwn ? 'none' : '1px solid #e8e8e8',
                        boxShadow: isOwn ? 'md' : 'sm',
                        position: 'relative'
                    }}
                >
                    {/* Message Text Lines */}
                    <Box sx={{ px: 0.3 }}>
                        <Skeleton
                            variant="rounded"
                            sx={{
                                width: 250,
                                height: 14,
                                borderRadius: 2,
                                bgcolor: isOwn ? 'rgba(255,255,255,0.3)' : '#e0e0e0'
                            }}
                        />
                        <Skeleton
                            variant="rounded"
                            sx={{
                                width: '85%',
                                height: 14,
                                borderRadius: 2,
                                bgcolor: isOwn ? 'rgba(255,255,255,0.3)' : '#e0e0e0',
                                mt: 0.4
                            }}
                        />
                        <Skeleton
                            variant="rounded"
                            sx={{
                                width: '70%',
                                height: 14,
                                borderRadius: 2,
                                bgcolor: isOwn ? 'rgba(255,255,255,0.3)' : '#e0e0e0',
                                mt: 0.4
                            }}
                        />
                    </Box>

                    {/* Time Skeleton */}
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            gap: 0.6,
                            mt: 0.5,
                            px: 0.3
                        }}
                    >
                        <Skeleton
                            variant="rounded"
                            sx={{
                                width: 40,
                                height: 10,
                                borderRadius: 2,
                                bgcolor: isOwn ? 'rgba(255,255,255,0.3)' : '#e0e0e0'
                            }}
                        />
                    </Box>
                </Sheet>
            </Stack>
        </Box>
    );
};

export default MessageSkeleton;