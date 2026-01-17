import { Box, Typography } from "@mui/joy";
import React, { memo } from "react";
import { taskColor } from "src/color/Color";

const DietTileWithLabel = ({
    name,
    image,
    onClick,
    bordercolor,
    orderStatus,
    FeedingTime,
    deliveredTime,
    delayedByMinutes,
    activeButton,
    roomName,
}) => {

   


    const orderColors = {
        0: { bg: "#e5e7eb", text: "Pending Order", color: "#374151" },
        1: { bg: "#dbeafe", text: "Ordered", color: "#1e3a8a" },
        2: { bg: "#fef9c3", text: "Processing", color: "#854d0e" },
        3: { bg: "#ffedd5", text: "Order Picked", color: "#9a3412" },
        4: { bg: "#d1fae5", text: "Diet Delivered", color: "#065f46" },
    };

    const orderInfo = orderColors[orderStatus] || {
        bg: "#ffffff",
        text: "",
        color: "#111827",
    };

    return (
        <Box
            onClick={onClick}
            sx={{
                width: "100%",
                height: 80,
                display: "flex",
                flexDirection: "column",
                bgcolor: 'yellow',
                borderRadius: 8,
                border: bordercolor,
                bgcolor: "#ffffff",
                boxShadow: "0px 3px 10px rgba(0,0,0,0.06)",
                flexWrap: "nowrap",
                overflow: "hidden",
                cursor: onClick ? "pointer" : "default",
                transition: "box-shadow 0.2s ease, transform 0.2s ease",

                "&:hover": {
                    boxShadow: "0px 4px 14px rgba(0,0,0,0.15)",
                    transform: "translateY(-1px)",
                },
            }}
        >

            {activeButton === "notMarked" || activeButton === "notUnderDiet" ?
                null :
                <Box
                    sx={{
                        flex: "0 0 auto",
                        px: 0.6,
                        py: 0.3,
                        fontSize: "clamp(9px, 0.9vw, 12px)",
                        fontWeight: 700,
                        textAlign: "center",
                        color: "white",
                        background: taskColor.purple,
                    }}
                >
                    {FeedingTime}
                    {deliveredTime && `Delivered: ${deliveredTime}`}
                </Box>
            }

            {/* BODY */}
            <Box
                sx={{
                    flex: 1,
                    display: "flex",
                    minHeight: 0,
                    background: "#faf8ff",
                }}
            >
                {/* TEXT */}
                <Box
                    sx={{
                        flex: 1,
                        px: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        overflow: "hidden",
                    }}
                >
                    <Typography
                        noWrap
                        sx={{ fontWeight: 700, fontSize: "clamp(10px, 1vw, 14px)" }}
                    >
                        {roomName}
                    </Typography>

                    <Typography
                        noWrap
                        sx={{ fontSize: "clamp(9px, 0.9vw, 13px)" }}
                    >
                        {name}
                    </Typography>
                </Box>
            </Box>

            <Box
                sx={{
                    flex: "0 0 auto",
                    py: 0.3,
                    display: "flex",
                    justifyContent: "center",
                    background: orderInfo.bg,
                }}
            >
                <Box
                    sx={{
                        px: 1,
                        py: 0.2,
                        borderRadius: 12,
                        fontSize: "clamp(9px, 0.9vw, 12px)",
                        fontWeight: 700,
                        color: orderInfo.color,
                        bgcolor: "rgba(255,255,255,0.9)",
                        whiteSpace: "nowrap",
                    }}
                >
                    {activeButton !== "notMarked" ? orderInfo.text : "Not Planned"}
                    {delayedByMinutes > 0 && (
                        <span style={{ color: "#8B0000", marginLeft: 4 }}>
                            – {delayedByMinutes >= 60
                                ? `${Math.floor(delayedByMinutes / 60)}h ${delayedByMinutes % 60}m`
                                : `${delayedByMinutes}m`}
                        </span>
                    )}
                </Box>
            </Box>
        </Box >
    );
};

export default memo(DietTileWithLabel);


