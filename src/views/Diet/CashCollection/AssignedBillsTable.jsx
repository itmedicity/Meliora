
import React, { memo } from "react";
import { Virtuoso } from "react-virtuoso";
import {
    Box,
    Paper,
    Chip,
    Tooltip,
} from "@mui/material";
import { CssVarsProvider } from "@mui/joy";

import VisibilityIcon from "@mui/icons-material/Visibility";
import DietButton from "../DietComponent/DietButton";
import DietTextComponent from "../DietComponent/DietTextComponent";

const PURPLE = "#7c51a1";
const VIEW_WIDTH = 60;

const columns = [
    { label: "Sl.No", width: 55 },
    { label: "Bill No", width: 180 },
    { label: "Patient No", width: 125 },
    { label: "Patient Name", width: 190 },
    { label: "Bill Amount", width: 125 },
    { label: "Collected", width: 125 },
    { label: "Balance", width: 125 },
    { label: "Status", width: 125 },
    { label: "Assigned To", width: 180 },
    { label: "Assigned By", width: 180 },
    { label: "Assigned At", width: 155 },
];

const Cell = ({ width, children }) => (
    <Box
        sx={{
            width,
            minWidth: width,
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            px: 0.5,
            overflow: "hidden",
        }}
    >
        {children}
    </Box>
);

const formatAmount = (value) => {
    const amount = Number(value);

    return Number.isFinite(amount)
        ? amount.toLocaleString("en-IN", {
              style: "currency",
              currency: "INR",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
          })
        : "₹0.00";
};

const formatDate = (value) => {
    if (!value) return "-";

    const date = new Date(
        String(value).includes("T")
            ? value
            : String(value).replace(" ", "T")
    );

    if (Number.isNaN(date.getTime())) return "-";

    return date.toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
};

const getBillStatus = (row) => {
    const status = String(row.billing_status || "OPEN").toUpperCase();

    const statuses = {
        PAID: { color: "#16803c", bg: "#e8f7ed" },
        PARTIAL: { color: "#b7791f", bg: "#fff4d6" },
        CANCELLED: { color: "#c62828", bg: "#ffebee" },
    };

    return {
        label: status === "OPEN" ? "PENDING" : status,
        ...(statuses[status] || {
            color: "#596579",
            bg: "#edf0f4",
        }),
    };
};

const AssignedBillsTable = ({ data = [], onView }) => {
    const minWidth =
        columns.reduce((total, column) => total + column.width, 0) +
        VIEW_WIDTH +
        24;

    return (
        <Paper
            elevation={0}
            sx={{
                width: "100%",
                mb: 2,
                border: "1px solid #e4dce9",
                borderRadius: 2,
            }}>
           
            <Box sx={{ overflowX: "auto" }}>
                <Box sx={{ minWidth }}>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            bgcolor: PURPLE,
                            px: 1,
                            py: 0.8,
                        }}
                    >
                        {columns.map((column) => (
                            <Cell key={column.label} width={column.width}>
                                <DietTextComponent
                                    value={column.label}
                                    size={12}
                                    weight={600}
                                    color="#fff"
                                />
                            </Cell>
                        ))}

                        <Cell width={VIEW_WIDTH}>
                            <DietTextComponent
                                value="View"
                                size={12}
                                weight={600}
                                color="#fff"
                            />
                        </Cell>
                    </Box>

                    {!data.length ? (
                        <Box sx={{ p: 3, textAlign: "center" }}>
                            <DietTextComponent
                                value="No bills have been assigned"
                                size={13}
                                color="#777"
                            />
                        </Box>
                    ) : (
                        <Virtuoso
                            style={{ height: 600 }}
                            data={data}
                            computeItemKey={(_, row) =>
                                String(row.billing_id ?? row.bill_no)
                            }
                            itemContent={(index, row) => {
                                const total = Number(row.total_amount) || 0;
                                const paid = Number(row.paid_amount) || 0;
                                const balance =
                                    row.balance_amount != null
                                        ? Number(row.balance_amount)
                                        : Math.max(0, total - paid);

                                const status = getBillStatus(row);

                                return (
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            px: 1,
                                            py: 0.65,
                                            minHeight: 43,
                                            bgcolor: index % 2 === 0 ? "#fff" : "#faf8fc",
                                            borderBottom: "1px solid #eee8f2",
                                            "&:hover": {
                                                bgcolor: "#f3edf8",
                                            },
                                        }}
                                    >
                                        <Cell width={55}>
                                            <DietTextComponent
                                                value={index + 1}
                                                size={12}
                                            />
                                        </Cell>

                                        <Cell width={180}>
                                            <Tooltip title={String(row.bill_no || "-")}>
                                                <Box sx={{ minWidth: 0 }}>
                                                    <DietTextComponent
                                                        value={row.bill_no || "-"}
                                                        size={12}
                                                        color={PURPLE}
                                                    />
                                                </Box>
                                            </Tooltip>
                                        </Cell>

                                        <Cell width={125}>
                                            <DietTextComponent
                                                value={row.patient_id || "-"}
                                                size={12}
                                            />
                                        </Cell>

                                        <Cell width={190}>
                                            <Tooltip title={String(row.patient_name || "-")}>
                                                <Box sx={{ minWidth: 0 }}>
                                                    <DietTextComponent
                                                        value={row.patient_name || "-"}
                                                        size={12}
                                                    />
                                                </Box>
                                            </Tooltip>
                                        </Cell>

                                        <Cell width={125}>
                                            <DietTextComponent
                                                value={formatAmount(total)}
                                                size={12}
                                            />
                                        </Cell>

                                        <Cell width={125}>
                                            <DietTextComponent
                                                value={formatAmount(paid)}
                                                size={12}
                                                color="#16803c"
                                            />
                                        </Cell>

                                        <Cell width={125}>
                                            <DietTextComponent
                                                value={formatAmount(balance)}
                                                size={12}
                                                color={balance > 0 ? "#c62828" : "#16803c"}
                                            />
                                        </Cell>

                                        <Cell width={125}>
                                            <Chip
                                                label={status.label}
                                                size="small"
                                                sx={{
                                                    height: 23,
                                                    fontSize: 10,
                                                    fontWeight: 700,
                                                    borderRadius: "6px",
                                                    bgcolor: status.bg,
                                                    color: status.color,
                                                }}
                                            />
                                        </Cell>

                                        <Cell width={180}>
                                            <Tooltip
                                                title={`${row.assigned_employee_name || "-"}${
                                                    row.assigned_employee_no
                                                        ? ` (${row.assigned_employee_no})`
                                                        : ""
                                                }`}
                                            >
                                                <Box sx={{ minWidth: 0 }}>
                                                    <DietTextComponent
                                                        value={row.assigned_employee_name || "-"}
                                                        size={11}
                                                        weight={600}
                                                        color={PURPLE}
                                                    />
                                                </Box>
                                            </Tooltip>
                                        </Cell>

                                        <Cell width={180}>
                                            <Tooltip
                                                title={`${row.assigned_by_employee_name || "-"}${
                                                    row.assigned_by_employee_no
                                                        ? ` (${row.assigned_by_employee_no})`
                                                        : ""
                                                }`}
                                            >
                                                <Box sx={{ minWidth: 0 }}>
                                                    <DietTextComponent
                                                        value={row.assigned_by_employee_name || "-"}
                                                        size={11}
                                                    />
                                                </Box>
                                            </Tooltip>
                                        </Cell>

                                        <Cell width={155}>
                                            <DietTextComponent
                                                value={formatDate(row.assigned_at)}
                                                size={11}
                                                color="#555"
                                            />
                                        </Cell>

                                        <Cell width={VIEW_WIDTH}>
                                            <CssVarsProvider>
                                                <DietButton
                                                    name=""
                                                    width={40}
                                                    icon={VisibilityIcon}
                                                    onClick={() => onView?.(row)}
                                                />
                                            </CssVarsProvider>
                                        </Cell>
                                    </Box>
                                );
                            }}
                        />
                    )}
                </Box>
            </Box>

        </Paper>
    );
};

export default memo(AssignedBillsTable);
