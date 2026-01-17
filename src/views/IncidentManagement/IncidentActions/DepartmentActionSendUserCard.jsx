import React, { memo, useState } from "react";
import { Box, Tooltip, Chip } from "@mui/joy";
import { PiPersonLight } from "react-icons/pi";
import { IoCalendarOutline, IoLocationOutline } from "react-icons/io5";
import { BsBuildingCheck } from "react-icons/bs";
import { FaRegEye } from "react-icons/fa";
import { PiEyeClosedDuotone } from "react-icons/pi";

import { formatDateTime } from "../CommonComponent/CommonFun";
import IncidentTextComponent from "../Components/IncidentTextComponent";

const DepartmentActionSendUserCard = ({ items,

    employeeName,
    departmentName,
    sectionName,
    designation, createDate }) => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => setExpanded((prev) => !prev);

    return (
        <Box
            sx={{
                p: 1.5,
                display: "flex",
                flexDirection: "column",
                gap: 1,
                border: "4px solid var(--rose-pink-400)",
                borderLeftWidth: "4px",   // keep left
                borderRightWidth: "none",  // keep right
                borderTop: "none",        // remove top
                borderBottom: "none",     // remove bottom
                borderRadius: "20px / 15px", // stronger curve horizontally
                background: "#fafafa",
                boxShadow: "0 1px 2px rgba(0,0,0,0.08)",
                transition: "all 0.3s ease",
                "&:hover": { boxShadow: "0 2px 6px rgba(0,0,0,0.15)" },
            }}
        >
            {/* Header Row — Compact Info */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Tooltip title="Requested user" size="sm" variant="plain">
                        <Box
                            sx={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                transition: 'transform 0.2s ease-in-out',
                                '&:hover': {
                                    transform: 'scale(1.2)',
                                },
                            }}
                        >
                            <PiPersonLight style={{ color: 'var(--rose-pink-400)', fontSize: 20 }} />
                        </Box>
                    </Tooltip>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <IncidentTextComponent
                            text={items?.em_name || employeeName || "--"}
                            size={15}
                            weight={600}
                            color="#333"
                        />
                        <IncidentTextComponent
                            text={items?.desg_name || designation || "--"}
                            size={12}
                            weight={400}
                            color="#555"
                        />
                    </Box>
                </Box>

                {/* Toggle Button */}
                <Tooltip title={expanded ? "Hide Details" : "View Details"} size="sm" variant="plain">
                    <Box
                        onClick={toggleExpand}
                        sx={{
                            cursor: "pointer",
                            color: "var(--rose-pink-400)",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        {expanded ? <FaRegEye size={18} /> : <PiEyeClosedDuotone size={18} />}
                    </Box>
                </Tooltip>
            </Box>

            {/* Expanded Details */}
            {expanded && (
                <Box
                    sx={{
                        mt: 1,
                        p: 1,
                        borderRadius: "10px",
                        background: "#fafafa",
                        display: "flex",
                        flexDirection: "column",
                        gap: 0.5,
                    }}
                >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <BsBuildingCheck style={{ color: "var(--rose-pink-400)", fontSize: 15 }} />
                        <IncidentTextComponent
                            text={items?.dept_name || departmentName || "--"}
                            size={13}
                            weight={400}
                            color="#444"
                        />
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <IoLocationOutline style={{ color: "var(--rose-pink-400)", fontSize: 15 }} />
                        <IncidentTextComponent
                            text={items?.sec_name || sectionName || "--"}
                            size={12}
                            weight={400}
                            color="#444"
                        />
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <IoCalendarOutline style={{ color: "var(--rose-pink-400)", fontSize: 15 }} />
                        <IncidentTextComponent
                            text={
                                formatDateTime(
                                    items?.create_date || createDate,
                                    "dd/MM/yyyy hh:mm:ss a"
                                ) || "--"
                            }
                            size={12}
                            weight={400}
                            color="#444"
                        />
                    </Box>

                    {items?.action_type && (
                        <Chip
                            size="sm"
                            color="warning"
                            variant="soft"
                            sx={{ alignSelf: "flex-start", mt: 0.5 }}
                        >
                            {items?.action_type}
                        </Chip>
                    )}
                </Box>
            )}
        </Box>
    );
};

export default memo(DepartmentActionSendUserCard);
