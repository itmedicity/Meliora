import React, { useState, useRef, useMemo } from "react";
import { Box, Chip, Sheet, Tooltip } from "@mui/joy";
import IncidentTextComponent from "../Components/IncidentTextComponent";
import ApprovalLevelCard from "../ApprovalComponent/ApprovalLevelCard";
import { formatDate } from "../CommonComponent/Incidnethelper";
import { FaRegEye } from "react-icons/fa";
import { PiEyeClosedDuotone } from "react-icons/pi";

const ComonApprovalPreview = ({
    levels,
    highlevelapprovals = []
}) => {
    const [scaledIndex, setScaledIndex] = useState(null);
    const [expandaction, setExpandAction] = useState(true);
    const reviewRefs = useRef([]);

    /* ---------------- STATUS CHIP ---------------- */
    const getStatusChip = (state) => {
        if (!state)
            return <Chip size="sm" color="neutral" variant="soft">Pending</Chip>;
        if (state === "A")
            return <Chip size="sm" color="success" variant="soft">Approved</Chip>;
        if (state === "R")
            return <Chip size="sm" color="danger" variant="soft">Rejected</Chip>;
        return <Chip size="sm" color="warning" variant="soft">Reviewing</Chip>;
    };

    /* ---------------- NORMALIZE DATA ---------------- */
    const approvalLevels = useMemo(() => {
        return highlevelapprovals
            ?.slice()
            ?.sort((a, b) => a.level_no - b.level_no)
            ?.map((lvl) => ({
                level_no: lvl.level_no,
                label: lvl.level_name,
                name: lvl.em_name || "--",
                review:
                    lvl.level_review ||
                    "No remarks have been provided by this Reviewer.",
                date: lvl.level_review_date || null,
                state: lvl.level_review_state,
                level_slno: lvl.level_review_slno,
                canEdit: false
            }));
    }, [highlevelapprovals]);

    /* ---------------- SLIDE HANDLERS ---------------- */
    const handleSlide = (index, value) => {
        if (value >= 50) setScaledIndex(index);
        else setScaledIndex(null);
    };

    const getSliderHeight = (index) => {
        const reviewEl = reviewRefs.current[index];
        if (reviewEl) {
            return Math.max(40, reviewEl.offsetHeight + 20);
        }
        return 40;
    };

    /* ---------------- RENDER ---------------- */
    return (
        <>
            {/* HEADER */}
            <Box
                sx={{
                    width: "100%",
                    bgcolor: "var(--royal-purple-400)",
                    py: 0.5,
                    px: 1,
                    mt: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <IncidentTextComponent
                    text="REVIEW DETAIL"
                    size={14}
                    weight={600}
                    color="white"
                />

                <Tooltip title={expandaction ? "Hide" : "View"} variant="plain" size="sm">
                    <span
                        onClick={() => setExpandAction((prev) => !prev)}
                        style={{ cursor: "pointer" }}
                    >
                        {expandaction ? (
                            <FaRegEye size={18} color="black" />
                        ) : (
                            <PiEyeClosedDuotone size={18} color="black" />
                        )}
                    </span>
                </Tooltip>
            </Box>

            {/* CONTENT */}
            <Sheet
                variant="outlined"
                sx={{
                    p: 1,
                    bgcolor: "background.body",
                    position: "relative",
                    overflow: "hidden",
                    maxHeight: expandaction ? "1000px" : 0,
                    transition: "max-height 0.4s ease, opacity 0.4s ease",
                }}
            >
                {/* BLUR OVERLAY */}
                {scaledIndex !== null && (
                    <Box
                        onClick={() => setScaledIndex(null)}
                        sx={{
                            position: "absolute",
                            inset: 0,
                            bgcolor: "rgba(0,0,0,0.2)",
                            backdropFilter: "blur(3px)",
                            zIndex: 5,
                        }}
                    />
                )}

                {/* LEVEL LIST */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        position: "relative",
                        pl: 1,
                        gap: 0.5,
                    }}
                >
                    {approvalLevels?.length > 0 ? (
                        approvalLevels?.map((level, index) => {
                            const isScaled = scaledIndex === index;

                            return (
                                <ApprovalLevelCard
                                    key={level.level_slno}
                                    index={index}
                                    level={level}
                                    isScaled={isScaled}
                                    sliderHeight={getSliderHeight(index)}
                                    onSlide={handleSlide}
                                    onEdit={false}
                                    items={null}
                                    levels={levels}
                                    reviewRef={reviewRefs.current}
                                    formatDate={formatDate}
                                    getStatusChip={getStatusChip}
                                />
                            );
                        })
                    ) : (
                        <IncidentTextComponent
                            text="No review data available"
                            size={14}
                            weight={400}
                            color="#777"
                            style={{ padding: "6px" }}
                        />
                    )}
                </Box>
            </Sheet>
        </>
    );
};

export default ComonApprovalPreview;
