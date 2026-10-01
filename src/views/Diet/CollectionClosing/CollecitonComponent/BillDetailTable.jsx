import React, { memo } from "react";
import { Virtuoso } from "react-virtuoso";
import { Box, Paper, Chip } from "@mui/material";

import DietTextComponent from "../../DietComponent/DietTextComponent";
import { formatCurrency } from "../../CommonData/Common";

const Cell = ({
    flex = 1,
    children,
    justifyContent = "flex-start",
}) => (
    <Box
        sx={{
            flex: `${flex} 1 0`,
            minWidth: 0,
            display: "flex",
            alignItems: "center",
            justifyContent,
            boxSizing: "border-box",
            overflow: "hidden",
        }}  >
        {children}
    </Box>
);



const BillDetailTable = ({ data = [] }) => {



    const getStatusConfig = (status) => {

        switch (status) {
            case "PAID":
                return {
                    label: "Paid",
                    color: "#15803D",
                    background: "#DCFCE7",
                    border: "#86EFAC",
                };

            case "PARTIAL":
                return {
                    label: "Partial",
                    color: "#B45309",
                    background: "#FEF3C7",
                    border: "#FCD34D",
                };

            case "OPEN":
                return {
                    label: "Pending",
                    color: "#B45309",
                    background: "#FFF7ED",
                    border: "#FDBA74",
                };

            case "CANCELLED":
                return {
                    label: "Cancelled",
                    color: "#B91C1C",
                    background: "#FEE2E2",
                    border: "#FCA5A5",
                };

            default:
                return {
                    label: status || "-",
                    color: "#475569",
                    background: "#F1F5F9",
                    border: "#CBD5E1",
                };
        }
    };

    const getDeliveryConfig = (status) => {

        switch (status) {
            case "DELIVERED":
                return {
                    label: "Delivered",
                    color: "#15803D",
                    background: "#DCFCE7",
                    border: "#86EFAC",
                };

            case "PICKEDUP":
                return {
                    label: "Picked Up",
                    color: "#2563EB",
                    background: "#DBEAFE",
                    border: "#93C5FD",
                };

            case "PENDING":
                return {
                    label: "Pending",
                    color: "#B45309",
                    background: "#FEF3C7",
                    border: "#FCD34D",
                };

            case "UNDELIVERED":
                return {
                    label: "Undelivered",
                    color: "#B91C1C",
                    background: "#FEE2E2",
                    border: "#FCA5A5",
                };

            default:
                return {
                    label: status || "-",
                    color: "#475569",
                    background: "#F1F5F9",
                    border: "#CBD5E1",
                };
        }
    };

    return (
        <Paper
            sx={{
                width: "100%",
                overflow: "hidden",
                mt: 1,
            }}
        >

            {/* ================= HEADER ================= */}

            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",

                    bgcolor: "#7c51a1",

                    py: 0.7,
                    px: 1,

                    borderBottom: "1px solid lightgrey",

                    boxSizing: "border-box",
                }}
            >

                <Cell flex={0.45}>
                    <DietTextComponent
                        value="Sl.No"
                        weight={600}
                        color="white"
                    />
                </Cell>

                <Cell flex={1.7}>
                    <DietTextComponent
                        value="Employee"
                        weight={600}
                        color="white"
                    />
                </Cell>

                <Cell flex={1.5}>
                    <DietTextComponent
                        value="Bill No"
                        weight={600}
                        color="white"
                    />
                </Cell>

                <Cell flex={1.4}>
                    <DietTextComponent
                        value="Patient"
                        weight={600}
                        color="white"
                    />
                </Cell>

                <Cell flex={1.4}>
                    <DietTextComponent
                        value="Admission"
                        weight={600}
                        color="white"
                    />
                </Cell>

                <Cell
                    flex={1.2}
                    justifyContent="flex-end"
                >
                    <DietTextComponent
                        value="Amount"
                        weight={600}
                        color="white"
                    />
                </Cell>

                <Cell
                    flex={1.2}
                    justifyContent="flex-end"
                >
                    <DietTextComponent
                        value="Collected"
                        weight={600}
                        color="white"
                    />
                </Cell>

                <Cell
                    flex={1.2}
                    justifyContent="flex-end"
                >
                    <DietTextComponent
                        value="Pending"
                        weight={600}
                        color="white"
                    />
                </Cell>

                <Cell
                    flex={1}
                    justifyContent="center"
                >
                    <DietTextComponent
                        value="Payment"
                        weight={600}
                        color="white"
                    />
                </Cell>

                <Cell
                    flex={1}
                    justifyContent="center"
                >
                    <DietTextComponent
                        value="Status"
                        weight={600}
                        color="white"
                    />
                </Cell>

                <Cell
                    flex={1.1}
                    justifyContent="center"
                >
                    <DietTextComponent
                        value="Delivery"
                        weight={600}
                        color="white"
                    />
                </Cell>

            </Box>


            {/* ================= BODY ================= */}

            <Virtuoso
                style={{
                    height: "62vh",
                    width: "100%",
                }}
                data={data}
                itemContent={(index, row) => {

                    const statusConfig =
                        getStatusConfig(row?.billing_status);

                    const deliveryConfig =
                        getDeliveryConfig(row?.delivery_status);

                    return (
                        <Box
                            key={`${row?.billing_id}-${index}`}
                            sx={{
                                width: "100%",
                                display: "flex",
                                alignItems: "center",

                                px: 1,
                                py: 0.85,

                                boxSizing: "border-box",

                                borderBottom:
                                    "1px solid #eee",

                                "&:hover": {
                                    backgroundColor: "#fafafa",
                                },
                            }}
                        >

                            {/* SL NO */}

                            <Cell flex={0.45}>
                                <DietTextComponent
                                    value={index + 1}
                                    size={12}
                                />
                            </Cell>


                            {/* EMPLOYEE */}

                            <Cell flex={1.7}>
                                <Box sx={{ minWidth: 0 }}>

                                    <DietTextComponent
                                        value={
                                            row?.employee_name ||
                                            "-"
                                        }
                                        size={12}
                                        weight={600}
                                    />
                                </Box>
                            </Cell>


                            {/* BILL NO */}

                            <Cell flex={1.5}>
                                <DietTextComponent
                                    value={
                                        row?.bill_no || "-"
                                    }
                                    size={11}
                                    weight={600}
                                />
                            </Cell>


                            {/* PATIENT */}

                            <Cell flex={1.4}>
                                <DietTextComponent
                                    value={
                                        row?.patient_id || "-"
                                    }
                                    size={11}
                                />
                            </Cell>


                            {/* ADMISSION */}

                            <Cell flex={1.4}>
                                <DietTextComponent
                                    value={
                                        row?.admission_id || "-"
                                    }
                                    size={11}
                                />
                            </Cell>


                            {/* AMOUNT */}

                            <Cell
                                flex={1.2}
                                justifyContent="flex-end"
                            >
                                <DietTextComponent
                                    value={formatCurrency(
                                        row?.total_amount
                                    )}
                                    size={12}
                                    weight={600}
                                />
                            </Cell>


                            {/* COLLECTED */}

                            <Cell
                                flex={1.2}
                                justifyContent="flex-end"
                            >
                                <DietTextComponent
                                    value={formatCurrency(
                                        row?.paid_amount
                                    )}
                                    size={12}
                                    weight={600}
                                    color="success.main"
                                />
                            </Cell>


                            {/* PENDING */}

                            <Cell
                                flex={1.2}
                                justifyContent="flex-end"
                            >
                                <DietTextComponent
                                    value={formatCurrency(
                                        row?.balance_amount
                                    )}
                                    size={12}
                                    weight={600}
                                    color={
                                        Number(
                                            row?.balance_amount
                                        ) > 0
                                            ? "warning.main"
                                            : "success.main"
                                    }
                                />
                            </Cell>


                            {/* PAYMENT TYPE */}

                            <Cell
                                flex={1}
                                justifyContent="center"
                            >
                                <Chip
                                    label={
                                        row?.bill_pay_type ||
                                        "-"
                                    }
                                    size="small"
                                    sx={{
                                        height: 24,
                                        borderRadius: "6px",

                                        fontSize: 10,
                                        fontWeight: 700,

                                        backgroundColor:
                                            "rgba(37, 99, 235, 0.08)",

                                        color: "#2563EB",
                                    }}
                                />
                            </Cell>


                            {/* BILLING STATUS */}

                            <Cell
                                flex={1}
                                justifyContent="center"
                            >
                                <Chip
                                    label={statusConfig.label}
                                    size="small"
                                    sx={{
                                        height: 24,
                                        minWidth: 70,

                                        borderRadius: "6px",

                                        fontSize: 10,
                                        fontWeight: 700,

                                        color:
                                            statusConfig.color,

                                        backgroundColor:
                                            statusConfig.background,

                                        border: `1px solid ${statusConfig.border}`,

                                        "& .MuiChip-label": {
                                            px: 1,
                                        },
                                    }}
                                />
                            </Cell>


                            {/* DELIVERY STATUS */}

                            <Cell
                                flex={1.1}
                                justifyContent="center"
                            >
                                <Chip
                                    label={
                                        deliveryConfig.label
                                    }
                                    size="small"
                                    sx={{
                                        height: 24,
                                        minWidth: 75,

                                        borderRadius: "6px",

                                        fontSize: 10,
                                        fontWeight: 700,

                                        color:
                                            deliveryConfig.color,

                                        backgroundColor:
                                            deliveryConfig.background,

                                        border: `1px solid ${deliveryConfig.border}`,

                                        "& .MuiChip-label": {
                                            px: 1,
                                        },
                                    }}
                                />
                            </Cell>

                        </Box>
                    );
                }}
            />

        </Paper>
    );
};

export default memo(BillDetailTable);