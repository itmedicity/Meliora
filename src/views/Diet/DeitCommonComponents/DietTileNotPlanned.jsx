import { Box, Typography } from "@mui/joy";
import React, { memo } from "react";

const DietTileNotPlanned = ({
    item,
    image,
    onClick,
    bordercolor,
}) => {

    return (
        <Box
            onClick={() => onClick(item)}
            sx={{
                width: "100%",
                height: "100%",
                minHeight: "clamp(80px, 10vw, 100px)",

                borderRadius: "clamp(6px, 1vw, 10px)",
                border: bordercolor || "1px solid #ddd",
                bgcolor: "#fff",
                overflow: "hidden",

                cursor: "pointer",
                transition: "box-shadow 0.25s ease, transform 0.25s ease",

                "&:hover": {
                    boxShadow: "0px 6px 18px rgba(0,0,0,0.18)",
                    transform: "translateY(-2px)",
                },
            }}
        >
            {/* TOP */}
            <Box
                sx={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                }}
            >
                {/* LEFT TEXT */}
                <Box
                    sx={{
                        px: 1,
                        flex: 1,
                        py: 0.5,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        // background: "#faf8ff",
                        overflow: "hidden",
                    }}
                >
                    {/* Room */}
                    <Typography
                        noWrap
                        sx={{
                            fontSize: "clamp(11px, 1vw, 14px)",
                            fontWeight: 700
                        }}
                    >
                        {item?.room || item?.fb_rmc_desc}
                    </Typography>

                    {/* Patient Name */}
                    <Typography
                        noWrap
                        sx={{
                            fontSize: "clamp(10px, 0.9vw, 13px)",
                            fontWeight: 500
                        }}
                    >
                        {item?.ptc_ptname}
                    </Typography>

                    {/* Patient ID */}
                    <Typography
                        noWrap
                        sx={{
                            fontSize: "clamp(9px, 0.8vw, 12px)",
                            color: "#666"
                        }}
                    >
                        {item?.pt_no}
                    </Typography>
                </Box>

                {/* RIGHT IMAGE */}
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
        </Box>
    );
};

export default memo(DietTileNotPlanned);