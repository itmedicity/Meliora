import React, { memo } from "react";
import { Box, Chip, Tooltip, IconButton } from "@mui/joy";
import { FaMandalorian, FaRegEye } from "react-icons/fa";
import { PiEyeClosedDuotone } from "react-icons/pi";
import { IoCalendarOutline, IoAttachOutline } from "react-icons/io5";
import IncidentTextComponent from "../Components/IncidentTextComponent";
import DepartmentActionSendUserCard from "./DepartmentActionSendUserCard";
import { formatDateTime } from "../CommonComponent/CommonFun";

const DepartmentActionItem = ({
    item,
    index,
    expanded,
    toggleExpand,
    handleActionfileFetching
}) => {
    return (
        <Box
            key={index}
            sx={{
                p: 1.5,
                borderRadius: "7px",
                background: "#fafafa",
                boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                display: "flex",
                flexDirection: "column",
                gap: 0.5
            }}
        >
            {/* Header */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <FaMandalorian style={{ color: 'var(--royal-purple-400)', fontSize: 18 }} />

                    <IncidentTextComponent
                        text={item?.acknowledged_department ?? ""}
                        size={14}
                        weight={600}
                    />

                    {item?.acknowledge_employee && (
                        <IncidentTextComponent
                            text={`(${item?.acknowledge_employee})`}
                            size={14}
                            weight={600}
                        />
                    )}
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Tooltip title="Action Date" placement="top" variant="soft" size="sm">
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <IoCalendarOutline style={{ color: '#666', fontSize: 14 }} />
                            <IncidentTextComponent
                                text={formatDateTime(item?.create_date, "dd/MM/yyyy hh:mm:ss a")}
                                size={12}
                                weight={400}
                                color="#555"
                            />
                        </Box>
                    </Tooltip>

                    <Chip
                        size="sm"
                        color={item?.inc_dep_action_status === 1 ? "success" : "warning"}
                        variant="soft"
                    >
                        {item?.inc_dep_action_status === 1 ? "Acknowledged" : "Pending"}
                    </Chip>

                    <Tooltip
                        title="View Detail"
                        size="sm"
                        variant="plain"
                        onClick={() => toggleExpand(index)}

                    >
                        <span style={{ cursor: "pointer" }}>
                            {expanded.includes(index) ? (
                                <FaRegEye size={18} />
                            ) : (
                                <PiEyeClosedDuotone size={18} />
                            )}
                        </span>
                    </Tooltip>
                </Box>
            </Box>

            {/* Expanded Detail */}
            {expanded.includes(index) && (
                <Box
                    sx={{
                        mt: 1.5,
                        p: 1,
                        borderRadius: "8px",
                        backgroundColor: "#f9f6ff",
                        display: "flex",
                        flexDirection: "column",
                        gap: 1
                    }}
                >
                    <Box sx={{ mb: 2 }}>
                        <DepartmentActionSendUserCard
                            employeeName={item?.requested_employee}
                            departmentName={item?.requested_department}
                            sectionName={item?.requested_emp_sec}
                            designation={item?.desg_name}
                            createDate={item?.create_date}
                        />
                    </Box>

                    <Chip size="sm" variant="soft" color="primary">
                        Requested Remarks
                    </Chip>

                    <IncidentTextComponent
                        text={item?.inc_dep_action_remark || "No remarks provided"}
                        size={13}
                        weight={400}
                        color="#444"
                    />

                    <Chip size="sm" variant="soft" color="warning">
                        Taken Action
                    </Chip>

                    <IncidentTextComponent
                        text={item?.inc_action || "No additional details"}
                        size={13}
                        weight={400}
                        color={"#444"}
                    />

                    {item?.inc_file_status === 1 && (
                        <Box sx={{ mt: 1, display: "flex", alignItems: "center", gap: 1 }}>
                            <IconButton
                                onClick={() =>
                                    handleActionfileFetching(item?.inc_dep_action_detail_slno)
                                }
                                color="primary"
                                sx={{
                                    bgcolor: "#ede7f6",
                                    "&:hover": { bgcolor: "#d1c4e9" }
                                }}
                            >
                                <IoAttachOutline size={20} />
                            </IconButton>

                            <IncidentTextComponent
                                text="Attached files"
                                size={13}
                                weight={500}
                                color="#444"
                            />
                        </Box>
                    )}
                </Box>
            )}
        </Box>
    );
};

export default memo(DepartmentActionItem);
