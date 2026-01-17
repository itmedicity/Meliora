import { Box, Typography } from "@mui/joy";
import React, { memo } from "react";

const DietTileNotPlanned = ({
    name,
    roomName,
    mrdNo,
    pt_no,
    status,
    image,
    onClick,
    bordercolor,
}) => {
    return (
        <Box
            onClick={onClick}
            sx={{
                width: "100%",            // Grid controls width
                height: "100%",
                minHeight: "clamp(80px, 10vw, 100px)",

                borderRadius: "clamp(6px, 1vw, 10px)",
                border: bordercolor,
                bgcolor: "#fff",
                overflow: "hidden",

                cursor: "pointer",
                transition: "box-shadow 0.25s ease, transform 0.25s ease",

                "&:hover": {
                    boxShadow: "0px 6px 18px rgba(0,0,0,0.18)",
                    transform: "translateY(-2px)", // SAFE hover
                },
            }}
        >
            {/* TOP */}
            <Box
                sx={{
                    height: "70%",
                    display: "flex",
                    alignItems: "center",
                    borderTopLeftRadius: "inherit",
                    borderTopRightRadius: "inherit",
                }}
            >
                <Box
                    sx={{
                        px: 1,
                        flex: 1,
                        py: 0.5,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        background: "#faf8ff",
                        overflow: "hidden",
                    }}
                >
                    <Typography
                        noWrap
                        sx={{ fontSize: "clamp(11px, 1vw, 14px)", fontWeight: 700 }}
                    >
                        {roomName}
                    </Typography>

                    <Typography
                        noWrap
                        sx={{ fontSize: "clamp(10px, 0.9vw, 13px)" }}
                    >
                        {name}
                    </Typography>
                </Box>

                <Box
                    sx={{
                        width: "clamp(32px, 3vw, 40px)",
                        height: "70%",
                        mr: 0.5,
                    }}
                >
                    <img
                        src={image}
                        alt="status-icon"
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                        }}
                    />
                </Box>
            </Box>

            {/* BOTTOM */}
            {status === "Not Planned" && (
                <Box
                    sx={{
                        height: "30%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        background: "#eebfbf",
                    }}
                >
                    <Box
                        sx={{
                            px: 1.5,
                            py: 0.3,
                            borderRadius: 12,
                            fontSize: "clamp(10px, 0.9vw, 12px)",
                            fontWeight: 700,
                            color: "darkred",
                            bgcolor: "rgba(255,255,255,0.9)",
                        }}
                    >
                        Not Planned
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default memo(DietTileNotPlanned);
