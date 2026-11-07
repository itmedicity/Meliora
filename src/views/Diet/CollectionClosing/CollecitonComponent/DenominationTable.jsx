import React, { memo } from 'react'
import {
    Box,
    Input,
    Typography
} from '@mui/joy'
import { formatCurrency } from '../../CommonData/Common'

const DenominationTable = ({
    denominations,
    DENOMINATIONS,
    handleQuantityChange
}) => {

    return (
        <Box
            sx={{
                border: '1px solid #eee7f1',
                borderRadius: '10px',
                overflow: 'hidden',
                width: '100%'
            }}
        >

            {/* TABLE HEADER */}
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    alignItems: 'center',
                    px: 1.5,
                    py: 1.2,
                    background: '#f6f2f8'
                }}
            >

                {/* AMOUNT */}
                <Box sx={{ flex: 1 }}>
                    <Typography
                        level="body-xs"
                        sx={{
                            fontWeight: 800,
                            color: '#5e456c'
                        }}
                    >
                        Amount
                    </Typography>
                </Box>

                {/* CASH */}
                <Box
                    sx={{
                        flex: 1,
                        textAlign: 'center'
                    }}
                >
                    <Typography
                        level="body-xs"
                        sx={{
                            fontWeight: 800,
                            color: '#5e456c'
                        }}
                    >
                        Cash
                    </Typography>
                </Box>

                {/* CASH AMOUNT */}
                <Box
                    sx={{
                        flex: 1,
                        textAlign: 'right'
                    }}
                >
                    <Typography
                        level="body-xs"
                        sx={{
                            fontWeight: 800,
                            color: '#5e456c'
                        }}
                    >
                        Cash Amount
                    </Typography>
                </Box>

                {/* COIN */}
                <Box
                    sx={{
                        flex: 1,
                        textAlign: 'center'
                    }}
                >
                    <Typography
                        level="body-xs"
                        sx={{
                            fontWeight: 800,
                            color: '#5e456c'
                        }}
                    >
                        Coin
                    </Typography>
                </Box>

                {/* COIN AMOUNT */}
                <Box
                    sx={{
                        flex: 1,
                        textAlign: 'right'
                    }}
                >
                    <Typography
                        level="body-xs"
                        sx={{
                            fontWeight: 800,
                            color: '#5e456c'
                        }}
                    >
                        Coin Amount
                    </Typography>
                </Box>

            </Box>


            {/* DENOMINATION ROWS */}
            {DENOMINATIONS?.map((item) => {

                const cashQuantity =
                    Number(
                        denominations?.[item?.value]?.cash
                    ) || 0

                const coinQuantity =
                    Number(
                        denominations?.[item?.value]?.coin
                    ) || 0

                const cashAmount =
                    item?.cash
                        ? item?.value * cashQuantity
                        : 0

                const coinAmount =
                    item?.coin
                        ? item?.value * coinQuantity
                        : 0

                return (
                    <Box
                        key={item?.value}
                        sx={{
                            display: 'flex',
                            width: '100%',
                            alignItems: 'center',
                            minHeight: 25,
                            px: 1.5,
                            borderTop: '1px solid #f0ebf2',

                            '&:hover': {
                                background: '#fcfafd'
                            }
                        }}
                    >

                        {/* AMOUNT */}
                        <Box sx={{ flex: 1 }}>
                            <Typography
                                level="body-sm"
                                sx={{
                                    fontWeight: 800,
                                    color: '#403344'
                                }}
                            >
                                ₹{item?.value}
                            </Typography>
                        </Box>


                        {/* CASH INPUT */}
                        <Box
                            sx={{
                                flex: 1,
                                display: 'flex',
                                justifyContent: 'center'
                            }}
                        >
                            <Input
                                type="number"
                                disabled={!item?.cash}
                                value={
                                    item?.cash
                                        ? denominations?.[
                                            item?.value
                                        ]?.cash ?? ''
                                        : ''
                                }
                                onChange={(event) =>
                                    handleQuantityChange(
                                        item?.value,
                                        'cash',
                                        event?.target?.value
                                    )
                                }
                                placeholder={
                                    !item?.cash
                                        ? '—'
                                        : '0'
                                }
                                slotProps={{
                                    input: {
                                        min: 0,
                                        step: 1,
                                        inputMode: 'numeric'
                                    }
                                }}
                                sx={{
                                    width: {
                                        xs: 65,
                                        sm: 85
                                    },
                                    minHeight: 24,
                                    '--Input-radius': '2px',

                                    '& input': {
                                        textAlign: 'center',
                                        fontWeight: 700
                                    },

                                    '&.Mui-disabled': {
                                        opacity: 0.5
                                    }
                                }}
                            />
                        </Box>


                        {/* CASH AMOUNT */}
                        <Box
                            sx={{
                                flex: 1,
                                textAlign: 'right'
                            }}
                        >
                            <Typography
                                level="body-sm"
                                sx={{
                                    fontWeight: 700,
                                    color:
                                        cashAmount > 0
                                            ? '#33253d'
                                            : 'neutral.400'
                                }}
                            >
                                {item?.cash
                                    ? formatCurrency(cashAmount)
                                    : '—'}
                            </Typography>
                        </Box>


                        {/* COIN INPUT */}
                        <Box
                            sx={{
                                flex: 1,
                                display: 'flex',
                                justifyContent: 'center'
                            }}
                        >
                            <Input
                                type="number"
                                disabled={!item?.coin}
                                value={
                                    item?.coin
                                        ? denominations?.[
                                            item?.value
                                        ]?.coin ?? ''
                                        : ''
                                }
                                onChange={(event) =>
                                    handleQuantityChange(
                                        item?.value,
                                        'coin',
                                        event?.target?.value
                                    )
                                }
                                placeholder={
                                    !item?.coin
                                        ? '—'
                                        : '0'
                                }
                                slotProps={{
                                    input: {
                                        min: 0,
                                        step: 1,
                                        inputMode: 'numeric'
                                    }
                                }}
                                sx={{
                                    width: {
                                        xs: 65,
                                        sm: 85
                                    },
                                    minHeight: 24,
                                    '--Input-radius': '2px',

                                    '& input': {
                                        textAlign: 'center',
                                        fontWeight: 700
                                    },

                                    '&.Mui-disabled': {
                                        opacity: 0.5
                                    }
                                }}
                            />
                        </Box>


                        {/* COIN AMOUNT */}
                        <Box
                            sx={{
                                flex: 1,
                                textAlign: 'right'
                            }}
                        >
                            <Typography
                                level="body-sm"
                                sx={{
                                    fontWeight: 700,
                                    color:
                                        coinAmount > 0
                                            ? '#33253d'
                                            : 'neutral.400'
                                }}
                            >
                                {item?.coin
                                    ? formatCurrency(coinAmount)
                                    : '—'}
                            </Typography>
                        </Box>

                    </Box>
                )
            })}

        </Box>
    )
}

export default memo(DenominationTable)

