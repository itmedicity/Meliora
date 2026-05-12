import { Box, Typography } from "@mui/joy";
import React from "react";


const DietTile = ({ name, mrdNo, pt_no, image, onClick, bordercolor, roomName, status, category  }) => {
    return (
        <Box
            onClick={onClick}
            sx={{
                width: "100%",
                maxWidth: "clamp(150px, 18vw, 190px)``",
                height: "clamp(70px, 9vw, 85px)",
                borderRadius: "clamp(5px, 1vw, 8px)",
                border: bordercolor,
                bgcolor: "#fff",
                overflow: "hidden",
                transition: "transform 0.25s ease, box-shadow 0.25s ease",

                "&:hover": {
                    transform: "scale(1.08)",
                    zIndex: 2,
                },
            }}
        >
            <Box sx={{ flex: 1, height: "70%", display: "flex", borderTopLeftRadius: 6, borderTopRightRadius: 6 }}>
                <Box
                    sx={{
                        px: 1,
                        flex: 1,
                        py: 0.5,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        background: "#faf8ff",
                    }}
                >
                    <Typography sx={{ fontSize: "clamp(11px, 1.2vw, 14px)", fontWeight: 700 }}>
                        {roomName}
                    </Typography>

                    <Typography sx={{ fontSize: "clamp(10px, 1.1vw, 13px)" }}>
                        {name}
                    </Typography>
                </Box>
                <Box sx={{ height: "85%", width: 40, my: 0.3, mr: 0.3 }}>
                    <img
                        src={image}
                        alt="status-icon"
                        style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 3 }}
                    />
                </Box>
            </Box>
            {status === "Planned" ?
                null :
                <Box
                    sx={{
                        flex: 1,
                        height: "30%",
                        fontSize: 8,
                        fontWeight: 700,
                        background: "lightgrey",
                        color: "black",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderBottomLeftRadius: 6,
                        borderBottomRightRadius: 6,
                    }}
                >
                    <Box
                        sx={{
                            px: 1.2,
                            borderRadius: 12,
                            fontSize: 11,
                            fontWeight: 700,
                            color: "black",
                            bgcolor: "rgba(255,255,255,0.85)",
                            boxShadow: "0px 1px 4px rgba(0,0,0,0.15)",
                        }}
                    >
                        {status}
                    </Box>
                </Box>}
        </Box>
    );
};

export default DietTile;





