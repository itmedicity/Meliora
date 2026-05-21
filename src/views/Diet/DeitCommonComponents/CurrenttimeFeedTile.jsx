import { Box } from "@mui/joy";
import React, { memo } from "react";
import { taskColor } from "src/color/Color";
import DietTextComponent from "../DietComponent/DietTextComponent";
// import DietTextComponent from "./DietComponent/DietTextComponent";

const CurrenttimeFeedTile = ({
    patient,
    image,
    onClick,
}) => {

    const {
        ptc_ptname,
        pt_no,
        room,
        fb_rmc_desc,
        dietTypeName,
        selectedFeed
    } = patient || {};

    console.log({
        patient
    });


    const orderColors = {
        0: { bg: "#e5e7eb", text: "Pending", color: "#374151" },
        1: { bg: "#dbeafe", text: "Ordered", color: "#1e3a8a" },
        2: { bg: "#fef9c3", text: "Processing", color: "#854d0e" },
        3: { bg: "#ffedd5", text: "Picked", color: "#9a3412" },
        4: { bg: "#d1fae5", text: "Delivered", color: "#065f46" },
    };

    const orderStatus = selectedFeed?.orderStatusId ?? 0;

    const orderInfo = orderColors[orderStatus] || {
        bg: "#fff",
        text: "-",
        color: "#111827",
    };

    return (
        <Box
            onClick={() => onClick(patient)}
            sx={{
                width: "100%",
                height: "100%",
                minHeight: "clamp(80px, 10vw, 100px)",

                borderRadius: "clamp(6px, 1vw, 10px)",
                border: `1px solid ${taskColor.darkPurple}`,
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
            {/* TOP STRIP */}
            <Box
                sx={{
                    px: 0.8,
                    py: 0.3,
                    fontSize: "clamp(9px, 0.8vw, 12px)",
                    fontWeight: 700,
                    color: "white",
                    background: `linear-gradient(135deg, ${taskColor.purple}, ${taskColor.darkPurple})`,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
            >
                <Box style={{ overflow: "hidden" }}>
                    <DietTextComponent
                        size={11}
                        weight={700}
                        color="white"
                        value={dietTypeName || "Diet"}
                    />
                </Box>

                <Box
                    sx={{
                        px: 0.6,
                        py: 0.1,
                        borderRadius: 10,
                        fontSize: 10,
                        fontWeight: 700,
                        bgcolor: orderInfo.bg,
                        color: orderInfo.color,
                    }}
                >
                    {orderInfo.text}
                </Box>
            </Box>

            {/* BODY */}
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
                        overflow: "hidden",
                    }}
                >
                    {/* Room */}
                    <DietTextComponent
                        size={13}
                        weight={700}
                        value={room || fb_rmc_desc}
                    />

                    {/* Name */}
                    <DietTextComponent
                        size={12}
                        weight={500}
                        value={ptc_ptname}
                    />

                    {/* Patient ID */}
                    <DietTextComponent
                        size={11}
                        color="gray"
                        value={pt_no}
                    />
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

export default memo(CurrenttimeFeedTile);