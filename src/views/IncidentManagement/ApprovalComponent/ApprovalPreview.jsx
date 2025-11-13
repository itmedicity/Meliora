import React, { memo, useState, useRef } from "react";
import { Box, Chip, Sheet, Slider, Typography } from "@mui/joy";
import { IoCalendarOutline } from "react-icons/io5";
import { PiPersonLight } from "react-icons/pi";
import { format } from "date-fns";
import IncidentTextComponent from "../Components/IncidentTextComponent";
import { incidentLevelApprovalFetch } from "src/views/Master/IncidentManagement/CommonCode/IncidentCommonCode";
import { useQuery } from "@tanstack/react-query";

const ApprovalPreview = ({
    items,
    onEdit,
    levels,
    isEdit,
    highlevelapprovals = [],
    loadingapprovals,
}) => {
    const [scaledIndex, setScaledIndex] = useState(null);
    const reviewRefs = useRef([]);

    const { data: incidentlevels } = useQuery({
        queryKey: ["getalllevels"],
        queryFn: () => incidentLevelApprovalFetch(),
        staleTime: Infinity,
        refetchOnWindowFocus: false,
    });

    const formatDate = (date) =>
        date ? format(new Date(date), "dd/MM/yyyy hh:mm a") : "--";

    const getStatusChip = (state) => {
        if (!state) return <Chip size="sm" color="neutral" variant="soft">Pending</Chip>;
        if (state === "A") return <Chip size="sm" color="success" variant="soft">Approved</Chip>;
        if (state === "R") return <Chip size="sm" color="danger" variant="soft">Rejected</Chip>;
        return <Chip size="sm" color="warning" variant="soft">Reviewing</Chip>;
    };

    let approvalLevels = [
        {
            label: "INCHARGE",
            name: items?.incharge_name,
            review: items?.inc_incharge_review,
            date: items?.inc_incharge_review_date,
            state: items?.inc_incharge_reivew_state,
            canEdit: items?.inc_incharge_reivew_state !== "R" && !items?.inc_hod_ack,
        },
        {
            label: "HOD",
            name: items?.hod_name,
            review: items?.inc_hod_review,
            date: items?.inc_hod_review_date,
            state: items?.inc_hod_reivew_state,
            canEdit: (items?.inc_current_level !== 0 && items?.inc_current_level_review_state === "A"),
        },
        ...(() => {
            if (!Array.isArray(incidentlevels)) return [];
            return incidentlevels
                ?.filter((item) => item?.level_status === 1)
                ?.sort((a, b) => a.level_no - b.level_no)
                ?.map((lvl) => {
                    const found = highlevelapprovals?.find(hl => hl.level_no === lvl.level_no);
                    return {
                        label: lvl.level_name,
                        name: found?.em_name || "--",
                        review: found?.level_review || "",
                        date: found?.level_review_date || null,
                        state: found?.level_review_state || null,
                        // canEdit: items?.inc_current_level >= lvl.level_no,
                        canEdit: false
                    };
                });
        })(),
        {
            label: "QUALITY",
            name: items?.qad_name,
            review: items?.inc_qad_review,
            date: items?.inc_qad_review_date,
            state: items?.inc_qad_review_state,
            canEdit: !(items?.inc_current_level > 0 && items?.inc_qad_review_state === "A"),
        },
    ];

    const rejectIndex = approvalLevels?.findIndex((lvl) => lvl.state === "R");
    if (rejectIndex !== -1) {
        approvalLevels = approvalLevels?.slice(0, rejectIndex + 1);
    }

    const handleSlide = (index, value) => {
        if (value >= 50) setScaledIndex(index);
        else setScaledIndex(null);
    };

    const getSliderHeight = (index) => {
        const reviewEl = reviewRefs.current[index];
        if (reviewEl) {
            const height = reviewEl.offsetHeight;
            return Math.max(40, height + 20);
        }
        return 40;
    };

    return (
        <Sheet
            variant="outlined"
            sx={{
                borderRadius: "md",
                p: 1,
                bgcolor: "background.body",
                position: "relative",
            }}
        >
            {/* Blur overlay when an item is scaled */}
            {scaledIndex !== null && (
                <Box
                    onClick={() => setScaledIndex(null)}
                    sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        bgcolor: "rgba(0,0,0,0.2)",
                        backdropFilter: "blur(3px)",
                        zIndex: 5,
                    }}
                />
            )}

            <Box sx={{
                display: "flex",
                flexDirection: "column",
                position: "relative",
                pl: 1,
                gap: 0.5,
            }}>
                {loadingapprovals ? (
                    <IncidentTextComponent
                        text="Loading high-level approvals..."
                        size={14}
                        color="#777"
                        weight={400}
                        style={{ padding: "4px" }}
                    />
                ) : (
                    approvalLevels
                        ?.filter((level) => !(isEdit && level.label === levels))
                        ?.map((level, index) => {
                            const isScaled = scaledIndex === index;
                            return (
                                <Box
                                    key={index}
                                    sx={{
                                        display: "flex",
                                        alignItems: "flex-start",
                                        position: isScaled ? "fixed" : "relative",   // fix above parent
                                        top: isScaled ? "50%" : "auto",             // center vertically
                                        left: isScaled ? "50%" : "auto",            // center horizontally
                                        transform: isScaled ? "translate(-50%, -50%) scale(1.15)" : "scale(1)", // center + scale
                                        boxShadow: isScaled ? "0 15px 30px rgba(0,0,0,0.35)" : "none",
                                        borderRadius: "sm",
                                        p: 1,
                                        bgcolor: isScaled ? "background.surface" : "transparent",
                                        zIndex: isScaled ? 9999 : 1,                // above everything
                                        maxHeight: isScaled ? "80vh" : "auto",
                                        width: isScaled ? "90%" : "auto",           // scale width for readability
                                        overflow: "auto",
                                        transition: "transform 0.3s ease, box-shadow 0.3s ease, width 0.3s ease, max-height 0.3s ease",
                                    }}
                                >

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
                                            onChange={(e, val) => handleSlide(index, val)}
                                            sx={{
                                                height: getSliderHeight(index),
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
                                                            console.log("clicked");

                                                            onEdit(items)
                                                            setScaledIndex(null)
                                                        }
                                                        }
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
                                                ref={(el) => (reviewRefs.current[index] = el)}
                                                sx={{
                                                    color: '#444',
                                                    fontSize: isScaled ? 18 : 12,
                                                    fontWeight: 400,
                                                    fontFamily: 'var(--roboto-font)',
                                                    borderBottom: '',
                                                    marginLeft: 2.6, // same as 26px 
                                                    marginTop: 0.4,  // same as 4px
                                                }}>
                                                {`"${level.review}"`}
                                            </Typography>

                                        )}
                                    </Box>
                                </Box>
                            );
                        })
                )}
            </Box>
        </Sheet>
    );
};

export default memo(ApprovalPreview);



