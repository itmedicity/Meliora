import React, { memo, useMemo, useState } from "react";
import { Box, Tooltip, Sheet, Divider } from "@mui/joy";
import IncidentTextComponent from "./IncidentTextComponent";
import { FaRegEye, FaUserCircle } from "react-icons/fa";
import { PiEyeClosedDuotone } from "react-icons/pi";
// import { MdWorkOutline, MdBusiness } from "react-icons/md";

const RcaDetailCard = ({ ActiveActions = [], LevelActionReveiw = [] }) => {
    const [expanded, setExpanded] = useState(true);

    const rcaActions = useMemo(() => {
        return ActiveActions
            .filter(item => item?.inc_action_name === "RCA")
            .map(action => {
                const reviews = LevelActionReveiw?.filter(
                    review =>
                        Number(review?.inc_action_slno) === Number(action?.inc_action_slno)
                );

                return { ...action, reviews };
            });
    }, [ActiveActions, LevelActionReveiw]);

    return (
        <>
            {/* Header */}
            <Box
                sx={{
                    width: "100%",
                    bgcolor: "var(--royal-purple-400)",
                    py: 0.75,
                    px: 1.5,
                    mt: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                }}>
                <IncidentTextComponent
                    text="RCA DETAIL"
                    size={14}
                    weight={600}
                    color="white"
                />

                <Tooltip title={expanded ? "Hide" : "View"} size="sm">
                    <Box
                        onClick={() => setExpanded(prev => !prev)}
                        sx={{ cursor: "pointer", display: "flex" }}
                    >
                        {expanded ? (
                            <FaRegEye size={18} color="black" />
                        ) : (
                            <PiEyeClosedDuotone size={18} color="black" />
                        )}
                    </Box>
                </Tooltip>
            </Box>

            {/* Content */}
            <Sheet
                variant="outlined"
                sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1.5,
                    maxHeight: expanded ? '1000px' : 0, // big enough to fit content
                    transition: 'max-height 0.4s ease, opacity 0.4s ease',
                    overflow: 'hidden'
                }}>
                {rcaActions.length === 0 && (
                    <IncidentTextComponent
                        text="No RCA details available"
                        size={14}
                        weight={500}
                        color="black"
                    />
                )}

                {rcaActions.map((action, index) => (
                    <Box key={index}>
                        {action.reviews.length === 0 ? (
                            <IncidentTextComponent
                                text="_"
                                size={13}
                                weight={400}
                                color="black"
                            />
                        ) : (
                            action.reviews.map((review, idx) => (
                                <Box
                                    key={idx}
                                    sx={{
                                        p: 1.2,
                                        mb: 1,
                                        borderRadius: "sm",
                                        bgcolor: "rgba(var(--bg-card))",
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 0.6
                                    }}
                                >
                                    {/* Employee Header */}

                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 0.8,
                                            cursor: "pointer"
                                        }}
                                    >
                                        <Tooltip
                                            title={
                                                <>
                                                    <div><b>Department:</b> {review?.dept_name || "-"}</div>
                                                    <div><b>Section:</b> {review?.sec_name || "-"}</div>
                                                    <div><b>Designation:</b> {review?.desg_name || "-"}</div>
                                                </>
                                            }
                                            placement="top-start"
                                        >
                                            <span>
                                                <FaUserCircle size={20} />
                                            </span>
                                        </Tooltip>
                                        <IncidentTextComponent
                                            text={review?.em_name || "_"}
                                            size={13}
                                            weight={600}
                                            color="black"
                                        />
                                    </Box>


                                    {/* Department & Designation */}
                                    {/* <Box
                                            sx={{
                                                display: "flex",
                                                gap: 2,
                                                alignItems: "center",
                                                fontSize: 12,
                                                opacity: 0.85
                                            }}
                                        >
                                            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                                <MdBusiness size={14} />
                                                <span>{review?.dept_name || "-"}</span>
                                            </Box>

                                            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                                <MdWorkOutline size={14} />
                                                <span>{review?.desg_name || "-"}</span>
                                            </Box>
                                        </Box> */}

                                    <Divider />

                                    {/* RCA Review Text */}
                                    <IncidentTextComponent
                                        text={review?.inc_action_review || "_"}
                                        size={13}
                                        weight={400}
                                        color="black"
                                    />
                                </Box>
                            ))
                        )}
                    </Box>
                ))}
            </Sheet>

        </>
    );
};

export default memo(RcaDetailCard);
