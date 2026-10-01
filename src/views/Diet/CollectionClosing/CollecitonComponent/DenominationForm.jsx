import React, { memo, useMemo, useState } from 'react'
import {
    Box,
    Button,
    Divider,
    FormControl,
    Stack,
    Textarea,
    Typography
} from '@mui/joy'

import {
    CheckCircleRounded,
    PaymentsRounded,
    RestartAltRounded
} from '@mui/icons-material'
import AccountBalanceWalletRounded from '@mui/icons-material/AccountBalanceWalletRounded';
import { calculateDenominationTotal, DENOMINATIONS, formatCurrency } from '../../CommonData/Common'
import DenominationTable from './DenominationTable'
import { axioslogin } from 'src/views/Axios/Axios'
import { errorNotify, infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import { useQueryClient } from '@tanstack/react-query'
import { usePettyCashDetails } from '../../CommonData/UseQuery';
import DietTextComponent from '../../DietComponent/DietTextComponent';
import { Tooltip } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';

const DenominationForm = ({
    collectionAmount = 0,
    initialDenominations = {},
    initialRemarks = '',
    employeedata,
    onCancel,
}) => {

    // query client to fetch this !

    const qureyClient = useQueryClient();



    const {
        data: PettyCashDetail = [],
        refetch: RefetchPettyCashDetails } =
        usePettyCashDetails(employeedata?.employee_id, "ISSUED");

    const UserPettyCash = PettyCashDetail?.pending_petty_cash;




    const [denominations, setDenominations] = useState(() => {
        const initial = {}
        DENOMINATIONS.forEach(item => {
            initial[item.value] = {
                cash:
                    item.cash
                        ? initialDenominations?.cash?.[item.value] || 0
                        : null,
                coin:
                    item.coin
                        ? initialDenominations?.coins?.[item.value] || 0
                        : null
            }
        })
        return initial
    })

    const [remarks, setRemarks] = useState(initialRemarks)

    const [saving, setSaving] = useState(false)

    const cashTotal = useMemo(() =>
        calculateDenominationTotal(
            denominations,
            DENOMINATIONS,
            'cash',
            'amount'
        ),
        [denominations]
    )

    const coinTotal = useMemo(() =>
        calculateDenominationTotal(
            denominations,
            DENOMINATIONS,
            'coin',
            'amount'
        ),
        [denominations]
    )

    const cashPieces = useMemo(() =>
        calculateDenominationTotal(
            denominations,
            DENOMINATIONS,
            'cash',
            'pieces'
        ),
        [denominations]
    )

    const coinPieces = useMemo(() =>
        calculateDenominationTotal(
            denominations,
            DENOMINATIONS,
            'coin',
            'pieces'
        ),
        [denominations]
    )

    const grandTotal = cashTotal + coinTotal
    const totalPieces = cashPieces + coinPieces



    /* 
       DIFFERENCE
     */

    const difference =
        Number(grandTotal || 0) -
        (Number(collectionAmount || 0) +
            Number(UserPettyCash || 0))

    /* 
       HANDLE QUANTITY
     */

    const handleQuantityChange = (
        denomination,
        type,
        value
    ) => {

        if (value === '') {

            setDenominations(prev => ({
                ...prev,

                [denomination]: {
                    ...prev[denomination],

                    [type]: ''
                }
            }))

            return
        }

        const parsedValue = Number(value)

        if (
            Number.isNaN(parsedValue) ||
            parsedValue < 0
        ) {
            return
        }

        setDenominations(prev => ({
            ...prev,

            [denomination]: {
                ...prev[denomination],

                [type]: Math.floor(parsedValue)
            }
        }))
    }


    /* 
       RESET
     */

    const handleReset = () => {
        const reset = {}
        DENOMINATIONS.forEach(item => {

            reset[item.value] = {

                cash:
                    item.cash
                        ? 0
                        : null,

                coin:
                    item.coin
                        ? 0
                        : null
            }

        })
        setDenominations(reset)
        setRemarks('')
    }


    /*  SAVE */
    const handleSave = async () => {

        const collection = Number(collectionAmount) || 0;

        if (!employeedata?.employee_id) {
            return infoNotify("Employee details not found!");
        }

        if (collection <= 0) {
            return infoNotify("Collection amount must be greater than 0");
        }

        if (grandTotal <= 0)
            return infoNotify("Please enter at least one cash or coin quantity");


        if (!remarks?.trim()) return infoNotify("Please Enter Remarks Before Sumbitting!");

        const cashPayload = {}
        const coinPayload = {}
        DENOMINATIONS?.forEach(item => {

            if (item.cash) {

                cashPayload[item.value] =
                    Number(
                        denominations[item.value]?.cash
                    ) || 0
            }


            if (item.coin) {

                coinPayload[item.value] =
                    Number(
                        denominations[item.value]?.coin
                    ) || 0
            }

        })

        const billingIds =
            typeof employeedata?.billing_ids === 'string'
                ? JSON.parse(employeedata.billing_ids)
                : employeedata?.billing_ids;



        const payload = {
            collection_amount: Number(collectionAmount || 0),
            counted_amount: grandTotal,
            cash_amount: cashTotal,
            coin_amount: coinTotal,
            difference,
            cash_pieces: cashPieces,
            coin_pieces: coinPieces,
            total_pieces: totalPieces,
            denominations: {
                cash: cashPayload,
                coins: coinPayload
            },
            remarks: remarks.trim(),
            created_by: employeedata?.employee_id,
            employee_id: employeedata?.employee_id,
            billing_ids: billingIds
        }
        try {
            setSaving(true)
            const response = await axioslogin.post('/cashclosing/create', payload);
            const { success, message } = response?.data ?? {};
            if (success !== 1) return errorNotify(message);
            succesNotify(message || "Closed SuccessFully");
            await qureyClient.invalidateQueries(['bill-collections-employee']);
            await qureyClient.invalidateQueries(['bill-sumamryt']);
            handleReset();
            onCancel();
        } catch (error) {
            errorNotify("Error in Closing Cash Details!")
        } finally {
            setSaving(false)
        }
    }


    return (
        <Box
            variant="outlined"
            sx={{
                width: '100%',
                borderRadius: '4px',
                p: 2,
            }}>
            {/*  HEADER */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 2
                }}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.2
                    }}>
                    <Box
                        sx={{
                            width: 40,
                            height: 40,
                            borderRadius: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: '#f0eaf5'
                        }}>
                        <PaymentsRounded
                            sx={{
                                color: '#7c51a1',
                                fontSize: 23
                            }}
                        />

                    </Box>


                    <Box>

                        <Typography
                            level="title-md"
                            sx={{
                                fontWeight: 700,
                                color: '#33253d'
                            }}
                        >
                            Cash Denomination
                        </Typography>

                        <Typography
                            level="body-xs"
                            sx={{
                                color: 'neutral.500'
                            }}
                        >
                            Enter cash and coin quantities
                        </Typography>

                    </Box>

                </Box>

                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1
                }}>
                    <Box
                        onClick={RefetchPettyCashDetails}
                        sx={{
                            width: 44,
                            height: 44,
                            borderRadius: '9px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'rgba(124, 81, 161, 0.12)',
                            color: '#7c51a1',
                            cursor: 'pointer'
                        }}
                    >
                        <Tooltip
                            title="Retry Petty Details"
                            placement='top-start'>
                            <ReplayIcon
                                sx={{
                                    fontSize: 20,
                                    fontWeight: 800
                                }}
                            />
                        </Tooltip>
                    </Box>


                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.2,
                            px: 1.5,
                            py: 0.7,
                            borderRadius: '10px',
                            backgroundColor: 'rgba(124, 81, 161, 0.06)',
                            border: '1px solid rgba(124, 81, 161, 0.15)'
                        }}
                    >

                        {/* Icon */}
                        <Box
                            sx={{
                                width: 34,
                                height: 34,
                                borderRadius: '9px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: 'rgba(124, 81, 161, 0.12)',
                                color: '#7c51a1'
                            }}
                        >
                            <AccountBalanceWalletRounded
                                sx={{
                                    fontSize: 20
                                }}
                            />
                        </Box>

                        {/* Amount */}
                        <Box sx={{ textAlign: 'right' }}>
                            <Typography
                                level="body-xs"
                                sx={{
                                    color: 'neutral.500',
                                    fontWeight: 600,
                                    lineHeight: 1.2
                                }}
                            >
                                Petty Cash Given
                            </Typography>

                            <Typography
                                level="title-md"
                                sx={{
                                    fontWeight: 800,
                                    color: '#7c51a1',
                                    lineHeight: 1.3
                                }}
                            >
                                {formatCurrency(UserPettyCash)}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>


            <Divider sx={{ mb: 2 }} />


            {/* 
                TABLE
             */}
            <DenominationTable
                denominations={denominations}
                DENOMINATIONS={DENOMINATIONS}
                handleQuantityChange={handleQuantityChange}
            />


            <Box
                sx={{
                    width: '100%',
                    px: 1.5,
                    py: 1,
                    mt: 2,
                    borderTop: "5px solid #9426c0",
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10
                }}>
                {/* Bill Details */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                    }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <DietTextComponent
                            value="TOTAL BILLED AMOUNT"
                            sx={{ fontSize: 13, color: '#666' }}
                        />
                        <DietTextComponent
                            value={`₹ ${Number(collectionAmount || 0).toLocaleString('en-IN')}`}
                            sx={{ fontSize: 14, fontWeight: 600, color: '#222' }}
                        />
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <DietTextComponent
                            value="PETTY CASH RECEIVED"
                            sx={{ fontSize: 13, color: '#666' }}
                        />
                        <DietTextComponent
                            value={`₹ ${Number(UserPettyCash || 0).toLocaleString('en-IN')}`}
                            sx={{ fontSize: 14, fontWeight: 600, color: '#222' }}
                        />
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <DietTextComponent
                            value="CLOSED AMOUNT"
                            sx={{ fontSize: 13, color: '#666' }}
                        />
                        <DietTextComponent
                            value={`₹ ${Number(grandTotal || 0).toLocaleString('en-IN')}`}
                            sx={{ fontSize: 14, fontWeight: 600, color: '#222' }}
                        />
                    </Box>
                </Box>

                {/* Settlement Divider */}
                <Box
                    sx={{
                        borderTop: '1px dashed #bbb',
                        my: 1.5,
                    }}
                />

                {/* Settlement */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <DietTextComponent
                            value="TOTAL SETTLED AMOUNT"
                            sx={{
                                fontSize: 14,
                                fontWeight: 700,
                                color: '#333',
                            }}
                        />

                        <DietTextComponent
                            value={`₹ ${grandTotal}`}
                            sx={{
                                fontSize: 16,
                                fontWeight: 700,
                                color: '#222',
                            }}
                        />
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <DietTextComponent
                            value="EXCESS / SHORT"
                            sx={{
                                fontSize: 13,
                                color: '#666',
                            }}
                        />

                        <DietTextComponent
                            value={`₹ ${Number(difference || 0).toLocaleString('en-IN')}`}
                            sx={{
                                fontSize: 14,
                                fontWeight: 700,
                                color: Number(difference) < 0
                                    ? '#d32f2f'
                                    : Number(difference) > 0
                                        ? '#2e7d32'
                                        : '#555',
                            }}
                        />
                    </Box>
                </Box>

                <FormControl sx={{ mt: 2 }}>

                    <DietTextComponent
                        value="REMARKS"
                        sx={{ fontSize: 13, color: '#666' }}
                    />

                    <Textarea
                        value={remarks}
                        onChange={(event) => setRemarks(event.target.value)}
                        placeholder="Enter remarks if required..."
                        minRows={3}
                        maxRows={5}
                        sx={{
                            '--Textarea-radius': '2px',
                            width: '100%',
                            borderRadius: 20,
                            borderWidth: 1,
                            mt: 0.5,
                            fontFamily: 'Bahnschrift'
                        }}
                    />

                </FormControl>

            </Box>


            {/* 
                ACTIONS
             */}

            <Stack
                direction="row"
                justifyContent="flex-end"
                spacing={1}
                sx={{ mt: 2 }}
            >

                <Button
                    variant="outlined"
                    color="neutral"

                    startDecorator={
                        <RestartAltRounded />
                    }

                    onClick={handleReset}

                    disabled={saving}

                    sx={{
                        borderRadius: '8px'
                    }}
                >
                    Reset
                </Button>


                {onCancel && (

                    <Button
                        variant="outlined"
                        color="neutral"

                        onClick={onCancel}

                        disabled={saving}

                        sx={{
                            borderRadius: '8px'
                        }}
                    >
                        Cancel
                    </Button>

                )}


                <Button
                    color="primary"

                    startDecorator={
                        <CheckCircleRounded />
                    }

                    loading={saving}

                    disabled={
                        grandTotal <= 0
                    }

                    onClick={handleSave}

                    sx={{
                        borderRadius: '8px',

                        background:
                            '#7c51a1',

                        '&:hover': {
                            background:
                                '#68428b'
                        }
                    }}
                >
                    Save Denomination
                </Button>

            </Stack>

        </Box>
    )
}


export default memo(DenominationForm)

