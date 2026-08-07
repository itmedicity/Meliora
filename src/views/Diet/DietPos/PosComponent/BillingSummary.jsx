import React, { memo } from "react";
import { Box, Paper } from "@mui/material";

import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import PaidIcon from "@mui/icons-material/Paid";
import PaymentsIcon from "@mui/icons-material/Payments";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";

import DietTextComponent from "../../DietComponent/DietTextComponent";

const SummaryCard = ({
    icon,
    title,
    value,
    color,
}) => (
    <Paper
        elevation={0}
        sx={{
            p: 2,
            borderRadius: 2,
            border: "1px solid",
            borderColor: "divider",
            transition: ".2s",
            cursor: 'pointer',
            "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: 2,
            },
        }}
    >
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 1.5,
            }}
        >
            <Box
                sx={{
                    width: 32,
                    height: 32,
                    borderRadius: 2,
                    bgcolor: `${color}20`,
                    color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {icon}
            </Box>

            <DietTextComponent
                value={value}
                size={16}
                weight={800}
            />
        </Box>

        <DietTextComponent
            value={title}
            size={10}
            weight={600}
        />
    </Paper>
);

const BillingSummary = ({ summary = {} }) => {

    const cards = [
        {
            title: "Bill Items",
            value: summary?.total_bill_items ?? 0,
            color: "#1976d2",
            icon: <Inventory2Icon sx={{
                fontSize: 14
            }} />,
        },
        {
            title: "Gross Amount",
            value: `₹ ${Number(summary?.gross_amount || 0).toFixed(2)}`,
            color: "#6a1b9a",
            icon: <ReceiptLongIcon sx={{
                fontSize: 14
            }} />,
        },
        {
            title: "Discount",
            value: `₹ ${Number(summary?.total_discount || 0).toFixed(2)}`,
            color: "#ef6c00",
            icon: <LocalOfferIcon sx={{
                fontSize: 14
            }} />,
        },
        {
            title: "GST",
            value: `₹ ${Number(summary?.total_gst || 0).toFixed(2)}`,
            color: "#00897b",
            icon: <PaidIcon sx={{
                fontSize: 14
            }} />,
        },
        {
            title: "Net Amount",
            value: `₹ ${Number(summary?.net_amount || 0).toFixed(2)}`,
            color: "#2e7d32",
            icon: <AccountBalanceWalletIcon sx={{
                fontSize: 14
            }} />,
        },
        {
            title: "Pending Amount",
            value: `₹ ${Number(summary?.pending_amount || 0).toFixed(2)}`,
            color: "#d32f2f",
            icon: <HourglassBottomIcon sx={{
                fontSize: 14
            }} />,
        },
        {
            title: "Billed Amount",
            value: `₹ ${Number(summary?.billed_amount || 0).toFixed(2)}`,
            color: "#1565c0",
            icon: <PaymentsIcon sx={{
                fontSize: 14
            }} />,
        },
    ];

    return (
        <Box
            sx={{
                mt: 1,
                p: 2,
                borderRadius: 1,
                border: '0.5px solid #cfcbcb54'
            }}>
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fit,minmax(140px,1fr))",
                    gap: 2,
                }}>
                {cards?.map((card) => (
                    <SummaryCard
                        key={card.title}
                        {...card}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default memo(BillingSummary);