import React, { useState } from "react";
import {
    Badge, Box,
    // IconButton
} from "@mui/joy";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useNotifications } from "./NotificationContext";
import NotificationPanel from "./NotificationPanel";

const NotificationBell = () => {
    const { notifications } = useNotifications();
    const [open, setOpen] = useState(false);

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <Box position="relative"
            onClick={() => setOpen(prev => !prev)}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 1,
                cursor: "pointer"
            }}>
            <Badge badgeContent={unreadCount} size="sm" color="danger"
            // sx={{ color: 'var(--rose-pink-400)' }}
            >
                <NotificationsIcon sx={{ color: 'white',fontSize:18 }} />
            </Badge>
            {open && <NotificationPanel />}
        </Box>
    );
};

export default NotificationBell;
