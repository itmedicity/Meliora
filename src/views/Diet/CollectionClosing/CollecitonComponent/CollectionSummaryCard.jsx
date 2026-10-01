import React, { memo } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Stack,
    Avatar,
} from '@mui/material';

import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded';
import PaymentsRoundedIcon from '@mui/icons-material/PaymentsRounded';
import PendingActionsRoundedIcon from '@mui/icons-material/PendingActionsRounded';
import { formatCurrency } from '../../CommonData/Common';

const CollectionSummaryCard = ({
    totalBills = 0,
    billAmount = 0,
    collectedAmount = 0,
    pendingAmount = 0,
}) => {


    const summaryData = [
        {
            title: 'Total Bills',
            value: totalBills,
            subtitle: 'Today',
            icon: <ReceiptLongRoundedIcon />,
            bg: 'rgba(146, 99, 241, 0.1)',
            color: '#ab1aff',
        },
        {
            title: 'Bill Amount',
            value: formatCurrency(billAmount),
            subtitle: 'Total value',
            icon: <AccountBalanceWalletRoundedIcon />,
            bg: 'rgba(16, 185, 129, 0.10)',
            color: '#ab1aff',
        },
        {
            title: 'Collected',
            value: formatCurrency(collectedAmount),
            subtitle: 'Received',
            icon: <PaymentsRoundedIcon />,
            bg: 'rgba(37, 99, 235, 0.10)',
            color: '#ab1aff',
        },
        {
            title: 'Pending',
            value: formatCurrency(pendingAmount),
            subtitle: 'Outstanding',
            icon: <PendingActionsRoundedIcon />,
            bg: 'rgba(245, 158, 11, 0.10)',
            color: '#ab1aff',
        },
    ];

    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: {
                    xs: 'repeat(2, 1fr)',
                    sm: 'repeat(4, 1fr)',
                },
                gap: 1.5,
                my: 2,
            }}
        >
            {summaryData?.map((item) => (
                <Card
                    key={item.title}
                    elevation={0}
                    sx={{
                        position: 'relative',
                        overflow: 'hidden',
                        borderRadius: 2.5,
                        border: '1px solid #7119be',
                        borderColor: 'divider',
                        transition: 'all 0.2s ease',
                        cursor: 'pointer',

                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            bottom: 0,
                            width: 3,
                            backgroundColor: item.color,
                        },

                        '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 6px 18px rgba(156, 10, 209, 0.07)',
                        },
                    }}
                >
                    <CardContent
                        sx={{
                            px: 1.8,
                            py: 1.5,
                            '&:last-child': {
                                pb: 1.5,
                            },
                        }}
                    >
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            spacing={1}
                        >
                            <Box sx={{ minWidth: 0 }}>
                                <Typography
                                    sx={{
                                        fontSize: '0.72rem',
                                        fontWeight: 600,
                                        color: 'text.secondary',
                                        mb: 0.4,
                                    }}
                                >
                                    {item.title}
                                </Typography>

                                <Typography
                                    sx={{
                                        fontSize: {
                                            xs: '1rem',
                                            sm: '1.15rem',
                                        },
                                        fontWeight: 800,
                                        lineHeight: 1.2,
                                        letterSpacing: '-0.3px',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    {item.value}
                                </Typography>

                                <Typography
                                    sx={{
                                        fontSize: '0.65rem',
                                        color: 'text.secondary',
                                        mt: 0.35,
                                    }}
                                >
                                    {item.subtitle}
                                </Typography>
                            </Box>

                            <Avatar
                                variant="rounded"
                                sx={{
                                    width: 36,
                                    height: 36,
                                    borderRadius: 2,
                                    backgroundColor: item.bg,
                                    color: item.color,
                                    flexShrink: 0,
                                }}
                            >
                                {React.cloneElement(item.icon, {
                                    sx: {
                                        fontSize: 19,
                                    },
                                })}
                            </Avatar>
                        </Stack>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
};

export default memo(CollectionSummaryCard);