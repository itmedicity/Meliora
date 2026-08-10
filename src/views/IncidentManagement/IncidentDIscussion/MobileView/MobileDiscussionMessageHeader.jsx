import React, { memo } from 'react';

import {
    Box,
    Stack,
} from '@mui/joy';
import Groups2RoundedIcon from '@mui/icons-material/Groups2Rounded';
import CircleRoundedIcon from '@mui/icons-material/CircleRounded';
import { Typography } from '@mui/material';



const MobileDiscussionMessageHeader = ({
    selectedChat,
    incidentNo,
    createdDate,
    isOnline,
    typingUsers,
    onlineInGroup,
    onCloseSidebar
}) => {
    const typingText = Object.values(typingUsers || {})?.[0];
    const onlineCount = onlineInGroup?.length;

    const handleOpenSidebar = () => {
        onCloseSidebar?.();
    };

    return (
        <Box
            sx={{
                px: 1.5,
                py: 1,
                bgcolor: '#ffffff',
                borderBottom: '1px solid',
                borderColor: 'divider',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}
        >
            {/* LEFT SIDE - Chat Info */}
            <Stack
                direction="row"
                spacing={1.2}
                alignItems="center"
                sx={{ flex: 1 }}
            >
                {/* Chat Icon / Avatar */}
                <Box
                    sx={{
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        bgcolor: selectedChat?.is_group_chat === 1 ? '#e3f2fd' : '#f0f2f5',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                    }}
                    onClick={handleOpenSidebar}
                >
                    {selectedChat?.is_group_chat === 1
                        ? <Groups2RoundedIcon sx={{ fontSize: 20, color: '#1976d2' }} />
                        : selectedChat?.title
                            ?.trim()
                            ?.charAt(0)
                            ?.toUpperCase() || '?'
                    }
                </Box>

                {/* Chat Info */}
                <Box sx={{ flex: 1, overflow: 'hidden' }}>
                    <Typography
                        level="body-sm"
                        sx={{
                            color: '#484849',
                            fontWeight: 700,
                            fontSize: 13,
                            lineHeight: 1.2,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                        }}
                    >
                        {selectedChat?.title || 'Chat'}
                    </Typography>

                    {/* Typing Indicator */}
                    {typingText && (
                        <Typography
                            level="body-xs"
                            sx={{
                                color: '#22c55e',
                                fontWeight: 600,
                                fontSize: 10,
                                lineHeight: 1.2
                            }}
                        >
                            typing...
                        </Typography>
                    )}

                    {/* Online Status */}
                    <Stack
                        direction="row"
                        spacing={0.5}
                        alignItems="center"
                        sx={{ mt: 0.2 }}
                    >
                        {(isOnline || selectedChat?.participants) &&
                            !selectedChat?.title &&
                            <CircleRoundedIcon
                                sx={{
                                    fontSize: 8,
                                    color: isOnline ? '#2e7d32' : '#484848'
                                }}
                            />
                        }

                        <Typography
                            level="body-xs"
                            sx={{
                                color: '#6b6b6b',
                                fontSize: 9,
                                fontWeight: 600,
                                lineHeight: 1.2
                            }}
                        >
                            {isOnline
                                ? 'Online'
                                : selectedChat?.title
                                    ? `${onlineCount + 1} online`
                                    : 'Offline'
                            }
                        </Typography>
                    </Stack>
                </Box>
            </Stack>

            {/* RIGHT SIDE - Info & QR */}
            <Stack
                direction="row"
                spacing={0.8}
                alignItems="center"
            >
                {/* Incident Info (small) */}
                {incidentNo && (
                    <Box
                        sx={{
                            display: { xs: 'none', sm: 'block' },
                            textAlign: 'right'
                        }}
                    >

                        <Typography
                            level="body-xs"
                            sx={{
                                color: '#484849',
                                fontSize: 8,
                                fontWeight: 800,
                                lineHeight: 1.1
                            }}
                        >
                            {incidentNo}
                        </Typography>
                        {createdDate && (
                            <Typography
                                level="body-xs"
                                sx={{
                                    color: '#6b6b6b',
                                    fontSize: 7,
                                    fontWeight: 700,
                                    lineHeight: 1.1
                                }}
                            >
                                {createdDate}
                            </Typography>
                        )}
                    </Box>
                )}

            </Stack>
        </Box>
    );
};

export default memo(MobileDiscussionMessageHeader);