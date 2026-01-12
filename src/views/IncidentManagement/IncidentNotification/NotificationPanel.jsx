import React from "react";
import { Box, Typography, Chip } from "@mui/joy";
import { useNotifications } from "./NotificationContext";
import { FcInspection } from 'react-icons/fc'
import { useNavigate } from "react-router-dom";

const NotificationPanel = () => {
    const { notifications, markAsRead } = useNotifications();
    const navigate = useNavigate();

    // Handle Navigation Form the Notification
    const handleClick = (n) => {
        markAsRead(n.id);
        navigate(n.path, {
            state: {
                fromNotification: true,
                incidentNo: n.incidentNo,
                payload: n.payload
            }
        });
    };


    return (
        <Box
            sx={{
                position: "absolute",
                right: 0,
                top: 48,
                width: 360,
                maxHeight: 420,
                overflowY: "auto",
                borderRadius: "16px",
                zIndex: 1300,
                p: 1.5,
            }}
        >


            {notifications.length === 0 && (
                <Typography level="body-sm" textAlign="center" sx={{ opacity: 0.7 }}>
                    No notifications
                </Typography>
            )}

            {notifications.map((n) => (
                <Box
                    key={n.id}
                    onClick={() => handleClick(n)}
                    sx={{
                        display: "flex",
                        gap: 1.2,
                        alignItems: "flex-start",
                        p: 1.3,
                        mb: 1,
                        borderRadius: 14,
                        cursor: "pointer",

                        /* Light glass effect ONLY on item */
                        background: n.read
                            ? "rgba(255,255,255,0.08)"
                            : "rgba(33,150,243,0.18)",

                        backdropFilter: "blur(6px)",
                        WebkitBackdropFilter: "blur(6px)",

                        border: "1px solid rgba(255,255,255,0.15)",

                        transition: "all 0.25s ease",

                        "&:hover": {
                            background: "rgba(255,255,255,0.22)",
                            transform: "translateY(-2px)",
                            boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
                        },
                    }}
                >

                    {/* Icon */}
                    <Box
                        sx={{
                            minWidth: 36,
                            height: 36,
                            borderRadius: "50%",
                            background: "rgba(255,255,255,0.35)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <FcInspection size={20} />
                    </Box>

                    {/* Content */}
                    <Box sx={{ flex: 1 }}>
                        <Typography level="body-sm" fontWeight="lg">
                            {n?.title}
                        </Typography>

                        <Typography
                            level="body-xs"
                            sx={{ opacity: 0.85, mt: 0.3 }}
                        >
                            {n?.message}
                        </Typography>

                        {/* Footer */}
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                mt: 0.8,
                            }}
                        >
                            <Typography level="body-xs" sx={{ opacity: 0.6 }}>
                                {new Date(n?.createdAt).toLocaleTimeString()}
                            </Typography>

                            {!n.read && (
                                <Chip
                                    size="sm"
                                    color="primary"
                                    variant="soft"
                                >
                                    New
                                </Chip>
                            )}
                        </Box>
                    </Box>
                </Box>
            ))}
        </Box>
    );
};

export default NotificationPanel;
