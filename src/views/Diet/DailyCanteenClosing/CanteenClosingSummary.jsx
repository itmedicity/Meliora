import React, { memo } from 'react';
import { Box, Typography } from '@mui/material';

import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import CurrencyRupeeRoundedIcon from '@mui/icons-material/CurrencyRupeeRounded';
import PaymentsRoundedIcon from '@mui/icons-material/PaymentsRounded';
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded';
import PhoneAndroidRoundedIcon from '@mui/icons-material/PhoneAndroidRounded';
import FactCheckRoundedIcon from '@mui/icons-material/FactCheckRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import LocalShippingRoundedIcon from '@mui/icons-material/LocalShippingRounded';
import ReplayRoundedIcon from '@mui/icons-material/ReplayRounded';
import BalanceRoundedIcon from '@mui/icons-material/BalanceRounded';
import { formatCurrency } from '../CommonData/Common';


const SummaryCard = ({
    label,
    value,
    amount = false,
    icon: Icon,
    iconBg = '#EEF4FF',
    iconColor = '#2563EB',
}) => (
    <Box
        sx={{
            height: 105,
            px: 2,
            py: 1.5,
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,

            border: '1px solid',
            borderColor: '#E2E8F0',
            borderRadius: 2,

            backgroundColor: '#FFFFFF',

            transition: 'all 0.18s ease',

            '&:hover': {
                borderColor: '#CBD5E1',
                boxShadow: '0 4px 12px rgba(15, 23, 42, 0.07)',
                transform: 'translateY(-1px)',
            },
        }}
    >
        {/* Icon */}
        <Box
            sx={{
                width: 46,
                height: 46,
                minWidth: 46,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: iconBg,
                color: iconColor,
            }}
        >
            <Icon sx={{ fontSize: 23 }} />
        </Box>

        {/* Content */}
        <Box
            sx={{
                minWidth: 0,
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
            }}
        >
            <Typography
                sx={{
                    fontSize: 12,
                    fontWeight: 500,
                    color: '#64748B',
                    lineHeight: 1.2,
                    mb: 0.7,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                }}
            >
                {label}
            </Typography>

            <Typography
                sx={{
                    fontSize: 21,
                    fontWeight: 700,
                    color: '#0F172A',
                    lineHeight: 1.2,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    letterSpacing: '-0.2px',
                }}
            >
                {amount
                    ? formatCurrency(value)
                    : (value ?? 0)}
            </Typography>
        </Box>
    </Box>
);


const CanteenClosingSummary = ({ data = [] }) => {
    const summary = Array.isArray(data)
        ? data[0] || {}
        : data || {};

    return (
        <Box
            sx={{
                width: '100%',
                px: 1.5,
                py: 1,
            }}
        >
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: '1fr',
                        sm: 'repeat(2, 1fr)',
                        md: 'repeat(3, 1fr)',
                        lg: 'repeat(4, 1fr)',
                    },
                    gap: 1.25,
                }}
            >
                <SummaryCard
                    label="Total Bills Today"
                    value={summary.total_bills}
                    icon={ReceiptLongRoundedIcon}
                    iconBg="#EAF2FF"
                    iconColor="#2563EB"
                />

                <SummaryCard
                    label="Total Bill Amount"
                    value={summary.total_billed_amount}
                    amount
                    icon={CurrencyRupeeRoundedIcon}
                    iconBg="#EAFBF4"
                    iconColor="#059669"
                />

                <SummaryCard
                    label="Total Collection"
                    value={summary.total_collected}
                    amount
                    icon={PaymentsRoundedIcon}
                    iconBg="#F3EEFF"
                    iconColor="#7C3AED"
                />

                <SummaryCard
                    label="Cash"
                    value={summary.cash_collected}
                    amount
                    icon={AccountBalanceWalletRoundedIcon}
                    iconBg="#FFF5E6"
                    iconColor="#EA8A00"
                />

                <SummaryCard
                    label="UPI"
                    value={summary.upi_collected}
                    amount
                    icon={PhoneAndroidRoundedIcon}
                    iconBg="#EDF6FF"
                    iconColor="#0284C7"
                />

                <SummaryCard
                    label="Expected Cash"
                    value={summary.expected_cash}
                    amount
                    icon={AccountBalanceWalletRoundedIcon}
                    iconBg="#FFF0F1"
                    iconColor="#E11D48"
                />

                <SummaryCard
                    label="Counted Cash"
                    value={summary.counted_cash}
                    amount
                    icon={FactCheckRoundedIcon}
                    iconBg="#EEF2FF"
                    iconColor="#4F46E5"
                />

                <SummaryCard
                    label="Bystander Bills"
                    value={summary.bystander_bills}
                    icon={GroupsRoundedIcon}
                    iconBg="#ECFDF5"
                    iconColor="#059669"
                />

                <SummaryCard
                    label="Bystander Amount"
                    value={summary.bystander_amount}
                    amount
                    icon={GroupsRoundedIcon}
                    iconBg="#FDF2F8"
                    iconColor="#DB2777"
                />

                <SummaryCard
                    label="Petty Cash Issued"
                    value={summary.delivery_cash_issued_amount}
                    amount
                    icon={LocalShippingRoundedIcon}
                    iconBg="#EEF5FF"
                    iconColor="#2563EB"
                />

                <SummaryCard
                    label="Petty Cash Settled"
                    value={summary.delivery_cash_settled_amount}
                    amount
                    icon={ReplayRoundedIcon}
                    iconBg="#F4F0FF"
                    iconColor="#7C3AED"
                />

                <SummaryCard
                    label="Petty Cash Balance"
                    value={summary.delivery_cash_outstanding}
                    amount
                    icon={BalanceRoundedIcon}
                    iconBg="#ECFDF5"
                    iconColor="#0F766E"
                />
            </Box>
        </Box>
    );
};

export default memo(CanteenClosingSummary);