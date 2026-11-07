import React, { memo, useMemo } from "react";
import { Box } from "@mui/joy";

import DietTextComponent from "../DietComponent/DietTextComponent";

import PendingActionsIcon from "@mui/icons-material/PendingActions";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

const getBillingStatus = (bill) =>
    String(bill.billing_status ?? bill.BillStatus ?? bill.status ?? "")
        .trim()
        .toUpperCase();

const getAssignmentStatus = (bill) => {
    const billingStatus = getBillingStatus(bill);
    const assignmentStatus = String(bill.assignment_status ?? "").toUpperCase();

    if (billingStatus === "CANCELLED") return "CANCELLED";

    if (
        bill.assignment_id != null &&
        assignmentStatus !== "CANCELLED"
    ) {
        return "ASSIGNED";
    }

    if (["OPEN", "PARTIAL"].includes(billingStatus)) {
        return "PENDING";
    }

    return "OTHER";
};

const getCollectionStatus = (bill) => {
    switch (getBillingStatus(bill)) {
        case "PAID":
            return "COLLECTED";
        case "PARTIAL":
            return "PARTIAL";
        case "OPEN":
            return "UNPAID";
        case "CANCELLED":
            return "CANCELLED";
        default:
            return "OTHER";
    }
};

const CollectionAssignmentTabs = ({
    FilteredBillDetail = [],
    setActiveStatus,
    activeStatus,
    activeTab,
    setActiveTab,
}) => {
    const tabs = [
        { label: "BILL ASSIGNMENT", value: "1" },
        { label: "COLLECTION STATUS", value: "2" },
    ];

    const statusCounts = useMemo(() => {
        return FilteredBillDetail.reduce(
            (counts, bill) => {
                const assignmentStatus = getAssignmentStatus(bill);
                const collectionStatus = getCollectionStatus(bill);

                counts[assignmentStatus] =
                    (counts[assignmentStatus] || 0) + 1;

                counts[collectionStatus] =
                    (counts[collectionStatus] || 0) + 1;

                return counts;
            },
            {
                PENDING: 0,
                ASSIGNED: 0,
                CANCELLED: 0,
                COLLECTED: 0,
                PARTIAL: 0,
                UNPAID: 0,
            }
        );
    }, [FilteredBillDetail]);

    const assignmentFilters = [
        {
            label: "NOT ASSIGNED",
            value: "PENDING",
            icon: <PendingActionsIcon fontSize="small" />,
        },
        {
            label: "ASSIGNED",
            value: "ASSIGNED",
            icon: <AssignmentIndIcon fontSize="small" />,
        },
        {
            label: "CANCELLED",
            value: "CANCELLED",
            icon: <CancelOutlinedIcon fontSize="small" />,
        },
    ];

    const collectionFilters = [
        {
            label: "COLLECTED",
            value: "COLLECTED",
            icon: <CheckCircleOutlineIcon fontSize="small" />,
        },
        {
            label: "PARTIAL",
            value: "PARTIAL",
            icon: <CurrencyExchangeIcon fontSize="small" />,
        },
        {
            label: "UNPAID",
            value: "UNPAID",
            icon: <AccountBalanceWalletOutlinedIcon fontSize="small" />,
        },
    ];

    const statusFilters =
        activeTab === "1" ? assignmentFilters : collectionFilters;

    return (
        <Box
            sx={{
                width: "100%",
                minHeight: 45,
                boxSizing: "border-box",
                border: "1px solid #e9e5e56c",
                mt: 1,
                p: 1,
                bgcolor: "#f6f6f6d9",
                display: "flex",
                alignItems: "center",
                borderRight: "4px solid #7c51a1",
                borderLeft: "4px solid #7c51a1",
                borderRadius: 3,
                justifyContent: "space-between",
                gap: 1.5,
                flexWrap: "wrap",
            }}
        >
            {/* Main tabs */}
            <Box
                sx={{
                    display: "flex",
                    gap: 1,
                    alignItems: "center",
                    flexWrap: "wrap",
                }}
            >
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.value;

                    return (
                        <Box
                            key={tab.value}
                            onClick={() => {
                                setActiveTab(tab.value);
                                setActiveStatus(null);
                            }}
                            sx={{
                                display: "flex",
                                cursor: "pointer",
                                bgcolor: isActive
                                    ? "#5b3b7a"
                                    : "#e8e0ef",
                                borderRadius: 1.5,
                                minHeight: 34,
                                py: 0.6,
                                alignItems: "center",
                                justifyContent: "center",
                                px: 1.5,
                                borderBottom: isActive
                                    ? "3px solid #332044"
                                    : "3px solid transparent",
                                transition: "all 0.2s ease",
                                whiteSpace: "nowrap",
                            }}
                        >
                            <DietTextComponent
                                size={12}
                                value={tab.label}
                                color={isActive ? "#ffffff" : "#5b3b7a"}
                            />
                        </Box>
                    );
                })}
            </Box>

            {/* Status filters */}
            <Box
                sx={{
                    display: "flex",
                    flex: 1,
                    gap: 1,
                    justifyContent: "flex-end",
                    alignItems: "center",
                    flexWrap: "wrap",
                }}
            >
                {statusFilters.map((item) => {
                    const isActive = activeStatus === item.value;

                    return (
                        <Box
                            key={item.value}
                            onClick={() =>
                                setActiveStatus((previous) =>
                                    previous === item.value
                                        ? null
                                        : item.value
                                )
                            }
                            sx={{
                                height: 32,
                                minWidth: 105,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                cursor: "pointer",
                                borderRadius: 2,
                                bgcolor: isActive ? "#5b3b7a" : "#ffffff",
                                px: 1,
                                boxShadow: isActive
                                    ? "0 3px 9px rgba(91,59,122,0.22)"
                                    : "0 1px 4px rgba(0,0,0,0.08)",
                                border: "1px solid",
                                borderColor: isActive
                                    ? "#5b3b7a"
                                    : "#e6e0eb",
                                transition: "all 0.2s ease",
                                "&:hover": {
                                    borderColor: "#7c51a1",
                                },
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 0.6,
                                }}
                            >
                                {React.cloneElement(item.icon, {
                                    sx: {
                                        color: isActive ? "#ffffff" : "#5b3b7a",
                                    },
                                })}

                                <DietTextComponent
                                    size={11}
                                    value={item.label}
                                    color={isActive ? "#ffffff" : "#333333"}
                                />

                                <DietTextComponent
                                    size={12}
                                    value={String(statusCounts[item.value] || 0)}
                                    color={isActive ? "#ffffff" : "#5b3b7a"}
                                />
                            </Box>
                        </Box>
                    );
                })}
            </Box>
        </Box>
    );
};

export default memo(CollectionAssignmentTabs);