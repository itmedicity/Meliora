import React, { useState } from "react";
import { Box, Table, Chip, Divider, IconButton } from "@mui/joy";

import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import TemplateDetailsTable from "src/views/NursingStation/Component/TemplateDetailsTable";
import DietTextComponent from "../../DietComponent/DietTextComponent";
import Collapse from "@mui/material/Collapse";

const DietPlanCurrentTable = ({
    isPlanned,
    patient,
    handleEdit,
    hanldeStopDiet,
    editMode,
    groupedData,
}) => {

    const [openHistory, setOpenHistory] = useState(true);

    const DietDetail = patient?.diet_history;

    const getDietStatus = (status) => {
        switch (status) {
            case "ACTIVE":
                return {
                    label: "ACTIVE",
                    color: "#2e7d32",
                    bg: "#e8f5e9",
                };

            case "PLANNED":
                return {
                    label: "PLANNED",
                    color: "#1565c0",
                    bg: "#e3f2fd",
                };

            case "STOPPED":
                return {
                    label: "STOPPED",
                    color: "#d32f2f",
                    bg: "#ffebee",
                };

            default:
                return {
                    label: "NOT PLANNED",
                    color: "#ef6c00",
                    bg: "#fff3e0",
                };
        }
    };

    return (
        <>
            {/* WRAPPER */}
            <Box
                sx={{
                    borderRadius: 10,
                    bgcolor: "#fff",
                    border: "1px solid #ececec",
                    mb: 2,
                    overflow: "hidden"
                }}
            >

                {/* HEADER */}
                {
                    DietDetail && DietDetail?.length > 0 &&
                    <Box
                        onClick={() => setOpenHistory(prev => !prev)}
                        sx={{
                            px: 2,
                            py: 1.5,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            cursor: "pointer",
                            bgcolor: "#fafafa",
                            borderBottom: openHistory ? "1px solid #ececec" : "none"
                        }}
                    >
                        <DietTextComponent
                            value="Diet Plan History"
                            size={17}
                            weight={800}
                        />

                        <IconButton
                            size="sm"
                            variant="plain"
                            sx={{
                                transition: "transform 0.3s ease",
                                transform: openHistory
                                    ? "rotate(0deg)"
                                    : "rotate(180deg)"
                            }}>
                            {openHistory ? (
                                <ExpandLessIcon />
                            ) : (
                                <ExpandMoreIcon />
                            )}
                        </IconButton>
                    </Box>
                }
                {/* TABLE CONTENT */}
                {DietDetail?.length > 0 && (
                    <Collapse
                        in={openHistory}
                        timeout={400}
                        easing={{
                            enter: "cubic-bezier(0.4, 0, 0.2, 1)",
                            exit: "cubic-bezier(0.4, 0, 0.2, 1)"
                        }}
                    >
                        <Box sx={{ p: 2 }}>
                            <Table
                                size="sm"
                                borderAxis="xBetween"
                            >
                                <thead>
                                    <tr>
                                        <th>Diet</th>
                                        <th>Template</th>
                                        <th>Dietitian</th>
                                        <th>Status</th>
                                        <th>Edit</th>
                                        <th>Stop</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {DietDetail?.map((row, i) => {
                                        const statusUI = getDietStatus(row?.diet_status);
                                        const isStopped = row?.diet_status === "STOPPED";

                                        return (
                                            <tr key={i}>
                                                <td>{row?.diet_name || "-"}</td>
                                                <td>{row?.template_name || "-"}</td>
                                                <td>{row?.Dietecian_name || "-"}</td>

                                                <td>
                                                    <Chip
                                                        size="sm"
                                                        variant="soft"
                                                        sx={{
                                                            color: statusUI?.color,
                                                            bgcolor: statusUI?.bg
                                                        }}
                                                    >
                                                        {statusUI?.label}
                                                    </Chip>
                                                </td>

                                                {/* EDIT */}
                                                <td>
                                                    <Box
                                                        onClick={() => {
                                                            if (isStopped) return;
                                                            handleEdit(row);
                                                        }}
                                                        sx={{
                                                            cursor: isStopped
                                                                ? "not-allowed"
                                                                : "pointer",
                                                            opacity: isStopped ? 0.4 : 1,
                                                            pointerEvents: isStopped
                                                                ? "none"
                                                                : "auto"
                                                        }}
                                                    >
                                                        <EditIcon
                                                            sx={{
                                                                fontSize: 18,
                                                                color: isStopped
                                                                    ? "#aaa"
                                                                    : "#1976d2"
                                                            }}
                                                        />
                                                    </Box>
                                                </td>

                                                {/* STOP */}
                                                <td>
                                                    <Box
                                                        onClick={() => {
                                                            if (isStopped) return;
                                                            hanldeStopDiet(row?.plan_id);
                                                        }}
                                                        sx={{
                                                            cursor: isStopped
                                                                ? "not-allowed"
                                                                : "pointer",
                                                            opacity: isStopped ? 0.4 : 1,
                                                            pointerEvents: isStopped
                                                                ? "none"
                                                                : "auto"
                                                        }}
                                                    >
                                                        <CancelIcon
                                                            sx={{
                                                                fontSize: 18,
                                                                color: isStopped
                                                                    ? "#aaa"
                                                                    : "#d32f2f"
                                                            }}
                                                        />
                                                    </Box>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </Table>
                        </Box>
                    </Collapse>
                )}
            </Box>

            {/* TEMPLATE DETAILS */}
            {isPlanned && !editMode && (
                <TemplateDetailsTable groupedData={groupedData} />
            )}
            {
                DietDetail && DietDetail?.length > 0 &&
                <Divider sx={{ my: 2 }} />
            }

        </>
    );
};

export default DietPlanCurrentTable;