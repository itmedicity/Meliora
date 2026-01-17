import { Box, Typography } from "@mui/joy";
import React from "react";
import { taskColor } from "src/color/Color";

const CurrenttimeFeedTile = ({
    roomName,
    mrdNo,
    pt_no,
    image,
    onClick,
    orderStatus,
    FeedingTime,
    deliveredTime,
    delayedByMinutes,
    FeedingName,
    name,
    dietTypeName,
}) => {
    const orderColors = {
        0: { bg: "#e5e7eb", text: "Pending", color: "#374151" },
        1: { bg: "#dbeafe", text: "Ordered", color: "#1e3a8a" },
        2: { bg: "#fef9c3", text: "Processing", color: "#854d0e" },
        3: { bg: "#ffedd5", text: "Picked", color: "#9a3412" },
        4: { bg: "#d1fae5", text: "Delivered", color: "#065f46" },
    };

    const orderInfo = orderColors[orderStatus] || {
        bg: "#fff",
        text: "",
        color: "#111827",
    };

    return (
        <Box
            onClick={onClick}
            sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                borderRadius: "10px",
                border: `1px solid ${taskColor.darkPurple}`,
                bgcolor: "#fff",
                overflow: "hidden",
                transition: "box-shadow 0.25s ease, transform 0.25s ease",
                "&:hover": {
                    boxShadow: "0px 6px 18px rgba(0,0,0,0.2)",
                    transform: "translateY(-2px)",
                },
            }}
        >

            <Box
                sx={{
                    flex: "0 0 auto",
                    py: 0.5,
                    px: 0.5,
                    textAlign: "center",
                    fontSize: "clamp(10px, 0.9vw, 12px)",
                    fontWeight: 700,
                    color: "white",
                    background: `linear-gradient(135deg, ${taskColor.purple}, ${taskColor.darkPurple})`,
                }}
            >
                {dietTypeName}  {FeedingName}
            </Box>
            <Box
                sx={{
                    flex: 1,
                    px: 1,
                    py: 0.5,
                    background: "#faf8ff",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    overflow: "hidden",
                }}
            >
                <Typography noWrap fontWeight={700}>
                    {roomName}
                </Typography>
                <Typography noWrap fontSize={13}>
                    {name}
                </Typography>
            </Box>
            <Box
                sx={{
                    flex: "0 0 auto",
                    py: 0.4,
                    display: "flex",
                    justifyContent: "center",
                    background: orderInfo.bg,
                }}
            >
                <Box
                    sx={{
                        px: 1.4,
                        py: 0.2,
                        borderRadius: 12,
                        fontSize: 12,
                        fontWeight: 700,
                        color: orderInfo.color,
                        bgcolor: "rgba(255,255,255,0.9)",
                    }}
                >
                    {orderInfo.text}
                </Box>
            </Box>
        </Box>
    );
};

export default CurrenttimeFeedTile;
