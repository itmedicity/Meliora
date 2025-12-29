import React, { useState, useRef } from "react";
import {
    Box, Chip, Sheet, Tooltip
} from "@mui/joy";
import IncidentTextComponent from "../Components/IncidentTextComponent";
import ApprovalLevelCard from "./ApprovalLevelCard";
import { formatDate } from "../CommonComponent/Incidnethelper";
import { FaRegEye } from 'react-icons/fa';
import { PiEyeClosedDuotone } from "react-icons/pi";

const ApprovalPreview = ({
    items,
    onEdit,
    levels,
    isEdit,
    highlevelapprovals = [],
    loadingapprovals,
    incidentlevels
}) => {

    const [scaledIndex, setScaledIndex] = useState(null);
    const [expandaction, setExpandAction] = useState(true)
    const reviewRefs = useRef([]);

    const getStatusChip = (state) => {
        if (!state) return <Chip size="sm" color="neutral" variant="soft">Pending</Chip>;
        if (state === "A") return <Chip size="sm" color="success" variant="soft">Approved</Chip>;
        if (state === "R") return <Chip size="sm" color="danger" variant="soft">Rejected</Chip>;
        return <Chip size="sm" color="warning" variant="soft">Reviewing</Chip>;
    };

    // 1. highest approved level
    const highestApprovedLevel = Math.max(0, ...highlevelapprovals.map(h => h.level_no));

    // Final level (fixes crash when incidentlevels = [])
    const finalLevelNo =
        incidentlevels.length > 0
            ? Math.max(...incidentlevels.map(l => l.level_no))
            : 0;

    // let approvalLevels = incidentlevels
    //     ?.filter(item => item?.level_status === 1)
    //     ?.sort((a, b) => a.level_no - b.level_no)
    //     ?.filter(lvl => {
    //         const found = highlevelapprovals?.find(hl => hl.level_no === lvl.level_no);
    //         if (found) return true;
    //         if (lvl.level_no < highestApprovedLevel) return false;
    //         return true;
    //     })
    //     ?.map((lvl) => {
    //         const found = highlevelapprovals?.find(hl => hl.level_no === lvl.level_no);

    //         const canEdit =
    //             lvl.level_no === highestApprovedLevel &&
    //             lvl.level_no !== finalLevelNo;

    //         return {
    //             label: lvl.level_name,
    //             name: found?.em_name || "--",
    //             review: found?.level_review || "Current Level Have No Review...!",
    //             date: found?.level_review_date || null,
    //             state: found?.level_review_state || null,
    //             canEdit,
    //             level_slno: found?.level_review_slno
    //         };
    //     });
    // }
    const approvedRejected = incidentlevels
        ?.filter(lvl => lvl?.level_status === 1)
        ?.sort((a, b) => a.level_no - b.level_no)
        ?.map(lvl => {
            const found = highlevelapprovals?.find(
                hl => hl.level_no === lvl.level_no
            );
            if (!found) return null;

            return {
                level_no: lvl.level_no,
                label: lvl.level_name,
                name: found.em_name || "--",
                review: found.level_review || "No remarks have been provided by this Reviewer.",
                date: found.level_review_date || null,
                state: found.level_review_state, // A / R
                level_slno: found.level_review_slno
            };
        })
        ?.filter(Boolean);


    let approvalLevels = approvedRejected.map(lvl => {
        const nextLevelExists = highlevelapprovals?.some(
            hl => hl.level_no === lvl.level_no + 1
        );

        const canEdit =
            lvl.state === "A" &&
            lvl.level_no === highestApprovedLevel &&
            lvl.level_no !== finalLevelNo &&
            !nextLevelExists;

        return { ...lvl, canEdit };
    });

    const rejectIndex = approvalLevels?.findIndex((lvl) => lvl.state === "R");


    // Hiding if any level exist even after rejecting one
    if (rejectIndex !== -1) {
        approvalLevels = approvalLevels
            .slice(0, rejectIndex + 1)
            .map(lvl => ({ ...lvl, canEdit: false }));
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

        <>
            <Box sx={{
                width: '100%',
                bgcolor: 'var(--royal-purple-400)',
                py: 0.5,
                px: 1,
                mt: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <IncidentTextComponent
                    text={"REVIEW DETAIL"}
                    size={14}
                    weight={600}
                    color={"white"}
                />

                <Tooltip title={expandaction ? 'Hide' : 'View'} variant="plain" size='sm'>
                    <span onClick={() => setExpandAction((prev) => !prev)} style={{ cursor: 'pointer' }}>
                        {expandaction ? (
                            <FaRegEye size={18} color="black" />
                        ) : (
                            <PiEyeClosedDuotone size={18} color="black" />
                        )}
                    </span>
                </Tooltip>
            </Box>

            <Sheet
                variant="outlined"
                sx={{
                    p: 1,
                    bgcolor: "background.body",
                    position: "relative",
                    overflow: 'hidden',
                    maxHeight: expandaction ? '1000px' : 0, // big enough to fit content
                    transition: 'max-height 0.4s ease, opacity 0.4s ease',
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
                                    <ApprovalLevelCard
                                        key={index}
                                        index={index}
                                        level={level}
                                        isScaled={isScaled}
                                        sliderHeight={getSliderHeight(index)}
                                        onSlide={handleSlide}
                                        onEdit={onEdit}
                                        items={items}
                                        levels={levels}
                                        reviewRef={reviewRefs.current}
                                        formatDate={formatDate}
                                        getStatusChip={getStatusChip}
                                    />

                                );
                            })
                    )}
                </Box>
            </Sheet>
        </>
    );
};

export default ApprovalPreview;



