
import React, { memo } from "react";
import { Virtuoso } from "react-virtuoso";
import {
    Box,
    Paper,
    Chip,
    Tooltip,
    Checkbox,
} from "@mui/material";
import { CssVarsProvider } from "@mui/joy";

import VisibilityIcon from "@mui/icons-material/Visibility";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import DietButton from "../DietComponent/DietButton";
import DietTextComponent from "../DietComponent/DietTextComponent";

const PURPLE = "#7c51a1";
const CHECKBOX_WIDTH = 45;
const VIEW_WIDTH = 100;
const ASSIGN_WIDTH = 100;

const columns = [
    { label: "Sl.No", width: 55 },
    { label: "Bill No", width: 180 },
    { label: "Patient No", width: 125 },
    { label: "Patient Name", width: 190 },
    { label: "Nursing Station", width: 190 },
    { label: "Bed", width: 190 },
    { label: "Bill Amount", width: 125 },
    { label: "Collected", width: 125 },
    { label: "Balance", width: 125 },
    { label: "Status", width: 125 },
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

const getBillId = (row) => row.billing_id ?? row.bill_no;

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

const UnassignedBillsTable = ({
    data = [],
    selectedIds = [],
    selectableIds = [],
    allSelected = false,
    someSelected = false,
    onSelectAll,
    onSelectRow,
    onView,
    onAssign,
}) => {



    const minWidth =
        CHECKBOX_WIDTH +
        columns.reduce((total, column) => total + column.width, 0) +
        VIEW_WIDTH +
        ASSIGN_WIDTH +
        24;

    return (
        <Paper
            elevation={0}
            sx={{
                width: "100%",
                mb: 2,
                // overflow: "hidden",
                border: "1px solid #e4dce9",
                borderRadius: 2,
            }}
        >

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
                        <Cell width={CHECKBOX_WIDTH}>
                            <Checkbox
                                size="small"
                                checked={allSelected}
                                indeterminate={someSelected}
                                disabled={!selectableIds.length}
                                onChange={onSelectAll}
                                sx={{
                                    p: 0.4,
                                    color: "#fff",
                                    "&.Mui-checked": { color: "#fff" },
                                    "&.MuiCheckbox-indeterminate": {
                                        color: "#fff",
                                    },
                                }}
                            />
                        </Cell>

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

                        <Cell width={ASSIGN_WIDTH}>
                            <DietTextComponent
                                value="Assign"
                                size={12}
                                weight={600}
                                color="#fff"
                            />
                        </Cell>
                    </Box>

                    {!data.length ? (
                        <Box sx={{ p: 3, textAlign: "center" }}>
                            <DietTextComponent
                                value="No unassigned bills available"
                                size={13}
                                color="#777"
                            />
                        </Box>
                    ) : (
                        <Virtuoso
                            style={{ height: 800 }}
                            data={data}
                            computeItemKey={(_, row) => String(getBillId(row))}
                            itemContent={(index, row) => {
                                const billId = getBillId(row);
                                const status = getBillStatus(row);
                                const total = Number(row.total_amount) || 0;
                                const paid = Number(row.paid_amount) || 0;
                                const balance =
                                    row.balance_amount != null
                                        ? Number(row.balance_amount)
                                        : Math.max(0, total - paid);

                                const canAssign =
                                    status.label !== "CANCELLED" &&
                                    balance > 0;

                                const isSelected =
                                    selectedIds.includes(billId);

                                return (
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            px: 1,
                                            py: 0.65,
                                            minHeight: 43,
                                            bgcolor: isSelected
                                                ? "#f0e7f8"
                                                : index % 2 === 0
                                                    ? "#fff"
                                                    : "#faf8fc",
                                            borderBottom: "1px solid #eee8f2",
                                            "&:hover": {
                                                bgcolor: "#f3edf8",
                                            },
                                        }}
                                    >
                                        <Cell width={CHECKBOX_WIDTH}>
                                            <Tooltip
                                                title={
                                                    canAssign
                                                        ? "Select bill"
                                                        : "Bill cannot be assigned"
                                                }
                                            >
                                                <Box>
                                                    <Checkbox
                                                        size="small"
                                                        checked={isSelected}
                                                        disabled={!canAssign}
                                                        onChange={(event) =>
                                                            onSelectRow?.(
                                                                row,
                                                                event.target.checked
                                                            )
                                                        }
                                                        sx={{
                                                            p: 0.4,
                                                            color: PURPLE,
                                                            "&.Mui-checked": {
                                                                color: PURPLE,
                                                            },
                                                        }}
                                                    />
                                                </Box>
                                            </Tooltip>
                                        </Cell>

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
                                        <Cell width={190}>
                                            <Tooltip title={String(row.nursing_station || "-")}>
                                                <Box sx={{ minWidth: 0 }}>
                                                    <DietTextComponent
                                                        value={row.nursing_station || "-"}
                                                        size={12}
                                                    />
                                                </Box>
                                            </Tooltip>
                                        </Cell>
                                        <Cell width={190}>
                                            <Tooltip title={String(row.bed_number || "-")}>
                                                <Box sx={{ minWidth: 0 }}>
                                                    <DietTextComponent
                                                        value={row.bed_number || "-"}
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

                                        <Cell width={ASSIGN_WIDTH}>
                                            <Tooltip
                                                title={
                                                    canAssign
                                                        ? "Assign bill"
                                                        : "Bill cannot be assigned"
                                                }
                                            >
                                                <Box>
                                                    <CssVarsProvider>
                                                        <DietButton
                                                            name=""
                                                            width={40}
                                                            icon={AssignmentIndIcon}
                                                            disabled={!canAssign}
                                                            onClick={() => {
                                                                if (canAssign) onAssign?.(row);
                                                            }}
                                                        />
                                                    </CssVarsProvider>
                                                </Box>
                                            </Tooltip>
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

export default memo(UnassignedBillsTable);
