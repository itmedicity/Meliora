import React, { memo } from 'react';
import {
    Box,
    Typography,
    Avatar,
    Stack
} from '@mui/joy';
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';

const ChatNotification = ({ title, message }) => {
    return (
        <Box
            sx={{
                minWidth: 320,
                maxWidth: 380,
                p: 1.5,
                borderRadius: 12,
                bgcolor: '#fff',
                boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
                border: '1px solid #ececec'
            }}
        >
            <Stack
                direction="row"
                spacing={1.5}
            >
                <Avatar
                    size="sm"
                    sx={{
                        color: '#74359c'
                    }}>
                    <ChatRoundedIcon sx={{ color: '#74359c' }} />
                </Avatar>

                <Box sx={{ flex: 1 }}>
                    <Typography
                        level="title-sm"
                        sx={{
                            fontWeight: 700
                        }}
                    >
                        {title}
                    </Typography>

                    <Typography
                        level="body-xs"
                        sx={{
                            mt: 0.5,
                            color: '#555'
                        }}
                    >
                        {message}
                    </Typography>
                </Box>
            </Stack>
        </Box>
    );
};

export default memo(ChatNotification);