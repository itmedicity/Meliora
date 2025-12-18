import React, { memo } from "react";
import { Box, Slider, Chip, Typography } from "@mui/joy";
import { PiPersonLight } from "react-icons/pi";
import { IoCalendarOutline } from "react-icons/io5";
import IncidentTextComponent from "../Components/IncidentTextComponent";
// import IncidentTextComponent from "./IncidentTextComponent";

const ApprovalLevelCard = ({
    level,
    index,
    isScaled,
    sliderHeight,
    onSlide,
    onEdit,
    // items,
    levels,
    reviewRef,
    formatDate,
    getStatusChip
}) => {

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "flex-start",
                position: isScaled ? "fixed" : "relative",
                top: isScaled ? "50%" : "auto",
                left: isScaled ? "50%" : "auto",
                transform: isScaled ? "translate(-50%, -50%) scale(1.15)" : "scale(1)",
                boxShadow: isScaled ? "0 15px 30px rgba(0,0,0,0.35)" : "none",
                borderRadius: "sm",
                p: 1,
                bgcolor: isScaled ? "background.surface" : "transparent",
                zIndex: isScaled ? 9999 : 1,
                maxHeight: isScaled ? "80vh" : "auto",
                width: isScaled ? "90%" : "auto",
                overflow: "auto",
                transition: "transform 0.3s ease, box-shadow 0.3s ease, width 0.3s ease, max-height 0.3s ease",
            }}>

            {/* Slider */}
            <Box
                sx={{
                    width: 26,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    mr: 1,
                }}
            >
                <Slider
                    orientation="vertical"
                    min={0}
                    max={100}
                    defaultValue={0}
                    onChange={(e, val) => onSlide(index, val)}
                    sx={{
                        height: sliderHeight,
                        color:
                            level.state === "A"
                                ? "success.500"
                                : level.state === "R"
                                    ? "danger.500"
                                    : "warning.500",
                        "& .MuiSlider-thumb": {
                            width: 14,
                            height: 14,
                            bgcolor:
                                level.state === "A"
                                    ? "success.500"
                                    : level.state === "R"
                                        ? "danger.500"
                                        : "warning.500",
                            border: "2px solid white",
                            transition: "transform 0.2s ease",
                        },
                        "& .MuiSlider-track": { width: 3 },
                        "& .MuiSlider-rail": { width: 3, bgcolor: "neutral.outlinedBorder" },
                    }}
                />
            </Box>

            {/* Content */}
            <Box sx={{ flex: 1 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <PiPersonLight style={{ color: "var(--joy-palette-primary-500)", fontSize: 18 }} />
                        <IncidentTextComponent
                            text={`${level.label}: ${level.name || "--"}`}
                            size={14}
                            weight={600}
                        />
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <IoCalendarOutline style={{ color: "#666", fontSize: 14 }} />
                        <IncidentTextComponent
                            text={formatDate(level.date)}
                            size={12}
                            weight={400}
                            color="#555"
                        />
                        {getStatusChip(level.state)}

                        {level.canEdit && level.label === levels && (
                            <Chip
                                onClick={() => {
                                    onEdit(level);
                                }}
                                color="primary"
                                size="sm"
                                variant="solid"
                                sx={{
                                    ml: 1,
                                    cursor: "pointer",
                                    "&:hover": {
                                        transform: "translateY(-2px)",
                                        boxShadow: "0 6px 12px rgba(0,0,0,0.2)",
                                    },
                                }}
                            >
                                Edit
                            </Chip>
                        )}
                    </Box>
                </Box>

                {level?.review && (
                    <Typography
                        ref={(el) => (reviewRef[index] = el)}
                        sx={{
                            color: '#444',
                            fontSize: isScaled ? 18 : 12,
                            fontWeight: 400,
                            fontFamily: 'var(--roboto-font)',
                            marginLeft: 2.6,
                            marginTop: 0.4,
                        }}
                    >
                        {`"${level.review}"`}
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

export default memo(ApprovalLevelCard);
