import React, { lazy, memo, Suspense, useEffect, useState } from 'react';
import {
    Badge,
    Drawer,
    Fab,
    Tooltip
} from '@mui/material';

import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CustomeIncidentLoading from '../../Components/CustomeIncidentLoading';
import { useAllUnReadEmployeeNotification } from '../../CommonComponent/useQuery';
import { useSelector } from 'react-redux';
import { useQueryClient } from '@tanstack/react-query';
import { socket } from 'src/ws/socket';
import { chatNotify } from 'src/views/Common/CommonCode';
import { playNotificationSound } from '../../IncidentNotification/notificationSound';


const IncidentDiscussionModal = lazy(() => import('../../IncidentModals/IncidentDiscussionModal'));

const FloatingChatWidget = () => {

    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);
    const { empid } = useSelector(state => {
        return state.LoginUserData
    });

    const { data: UnreadMessage } = useAllUnReadEmployeeNotification(empid);
    const unreadCount = Array.isArray(UnreadMessage)
        ? UnreadMessage.length
        : 0;

    useEffect(() => {
        const handleNotification = (notification) => {
         
            queryClient.invalidateQueries({
                queryKey: ['all-unread-count', empid]
            });
            if (!open) {
                chatNotify(notification.title, notification.message_preview);
                playNotificationSound();
            }
        };

        socket.on('new-notification', handleNotification);

        return () => {
            socket.off('new-notification', handleNotification);
        };
    }, [queryClient, empid, open]);

    return (
        <>
            <Tooltip title="Open Chats" arrow>
                <Fab
                    color="primary"
                    onClick={() => setOpen(true)}
                    sx={{
                        position: 'fixed',
                        bottom: 24,
                        right: 24,
                        zIndex: 900,
                        width: 64,
                        height: 64,
                        boxShadow: 6
                    }}>
                    <Badge
                        color="error"
                        badgeContent={unreadCount}>
                        <ChatRoundedIcon />
                    </Badge>
                </Fab>
            </Tooltip>

            {/* CHAT DRAWER */}

            <Drawer
                anchor="right"
                open={open}
                onClose={() => setOpen(false)}
                PaperProps={{
                    sx: {
                        width: {
                            xs: '100%',
                            sm: '50%',
                            md: '50%'
                        },
                        // overflow: 'hidden'
                    }
                }}>

                {/* HEADER */}

                <div
                    style={{
                        height: 60,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0 16px',
                        borderBottom: '1px solid #e0e0e0',
                        fontWeight: 600,
                        fontSize: 18
                    }}
                >
                    Employee Chats

                    <Fab
                        size="small"
                        color="default"
                        onClick={() => setOpen(false)}
                    >
                        <CloseRoundedIcon />
                    </Fab>
                </div>

                {/* CHAT CONTENT */}

                <div
                    style={{
                        height: 'calc(100% - 60px)',
                        // width: '40%'
                    }}
                >
                    <Suspense
                        fallback={
                            <CustomeIncidentLoading
                                text="Loading Chats..."
                            />
                        }
                    >
                        <IncidentDiscussionModal
                            mode="EXTERNAL"
                        />
                    </Suspense>
                </div>

            </Drawer>
        </>
    );
};

export default memo(FloatingChatWidget);