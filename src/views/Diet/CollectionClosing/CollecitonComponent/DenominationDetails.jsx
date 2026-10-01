import React, { useMemo } from 'react';
import { Box, Typography } from '@mui/joy';
import { formatCurrency } from '../../CommonData/Common';


const DenominationDetails = ({ data = [], closingDetail }) => {

    const {
        cash_amount = 0,
        coin_amount = 0
    } = closingDetail ?? {};

    const denominations = useMemo(() => {
        const map = {};

        data?.forEach((item) => {
            const value = Number(item.denomination_value);
            const type = item.denomination_type;

            if (!map[value]) {
                map[value] = {
                    value,
                    cashQty: 0,
                    cashAmount: 0,
                    coinQty: 0,
                    coinAmount: 0
                };
            }

            if (type === 'CASH') {
                map[value].cashQty += Number(item.quantity || 0);
                map[value].cashAmount += Number(item.amount || 0);
            }

            if (type === 'COIN') {
                map[value].coinQty += Number(item.quantity || 0);
                map[value].coinAmount += Number(item.amount || 0);
            }
        });

        return Object.values(map).sort((a, b) => b.value - a.value);
    }, [data]);




    return (
        <Box
            sx={{
                width: '100%',
                border: '1px solid #e0e0e0',
                borderRadius: '10px',
                overflow: 'hidden',
                backgroundColor: '#fff',
            }}
        >
            {/* TABLE HEADER */}
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: '1.2fr 1fr 1.2fr 1fr 1.2fr',
                    alignItems: 'center',
                    px: 2,
                    py: 1.2,
                    backgroundColor: '#f5f3f7',
                    borderBottom: '1px solid #e0e0e0'
                }}
            >
                <Typography sx={headerStyle}>
                    Denomination
                </Typography>

                <Typography sx={headerStyle}>
                    Cash Qty
                </Typography>

                <Typography sx={headerStyle}>
                    Cash Amount
                </Typography>

                <Typography sx={headerStyle}>
                    Coin Qty
                </Typography>

                <Typography sx={headerStyle}>
                    Coin Amount
                </Typography>
            </Box>

            {/* ROWS */}
            {denominations?.map((item) => (
                <Box
                    key={item.value}
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: '1.2fr 1fr 1.2fr 1fr 1.2fr',
                        alignItems: 'center',
                        px: 2,
                        py: 0.5,
                        borderBottom: '1px solid #eeeeee',
                        '&:last-child': {
                            borderBottom: 'none'
                        }
                    }}
                >
                    {/* DENOMINATION */}
                    <Typography
                        sx={{
                            fontWeight: 700,
                            fontSize: 14
                        }}
                    >
                        {formatCurrency(item.value)}
                    </Typography>

                    {/* CASH QTY */}
                    <Typography
                        sx={{
                            fontSize: 14,
                            color: item.cashQty
                                ? '#333'
                                : '#aaa'
                        }}
                    >
                        {item.cashQty || '-'}
                    </Typography>

                    {/* CASH AMOUNT */}
                    <Typography
                        sx={{
                            fontSize: 14,
                            fontWeight: item.cashAmount ? 600 : 400,
                            color: item.cashAmount
                                ? '#333'
                                : '#aaa'
                        }}
                    >
                        {item.cashAmount
                            ? `${formatCurrency(item.cashAmount)}`
                            : '-'}
                    </Typography>

                    {/* COIN QTY */}
                    <Typography
                        sx={{
                            fontSize: 14,
                            color: item.coinQty
                                ? '#333'
                                : '#aaa'
                        }}
                    >
                        {item.coinQty || '-'}
                    </Typography>

                    {/* COIN AMOUNT */}
                    <Typography
                        sx={{
                            fontSize: 14,
                            fontWeight: item.coinAmount ? 600 : 400,
                            color: item.coinAmount
                                ? '#333'
                                : '#aaa'
                        }}
                    >
                        {item.coinAmount
                            ? `${formatCurrency(item.coinAmount)}`
                            : '-'}
                    </Typography>
                </Box>
            ))}

            {/* TOTAL */}
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: '1.2fr 1fr 1.2fr 1fr 1.2fr',
                    alignItems: 'center',
                    px: 2,
                    py: 1.5,
                    backgroundColor: '#fafafa',
                    borderTop: '2px solid #7c51a1'
                }}
            >
                <Typography
                    sx={{
                        fontWeight: 800,
                        fontSize: 14
                    }}
                >
                    TOTAL
                </Typography>

                <Typography />

                <Typography
                    sx={{
                        fontWeight: 800,
                        fontSize: 14
                    }}
                >
                    {formatCurrency(cash_amount)}
                </Typography>

                <Typography />

                <Typography
                    sx={{
                        fontWeight: 800,
                        fontSize: 14
                    }}
                >
                    {formatCurrency(coin_amount)}
                </Typography>
            </Box>

        </Box>
    );
};

const headerStyle = {
    fontSize: 12,
    fontWeight: 700,
    color: '#666',
    textTransform: 'uppercase'
};

export default DenominationDetails;