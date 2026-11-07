import React, { memo } from 'react'
import {
    Box,
    Divider,
    Typography
} from '@mui/joy'

import {
    CheckCircleRounded,
    AccountBalanceWalletRounded
} from '@mui/icons-material'

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import DietButton from '../../DietComponent/DietButton'
import { useEMployeeClosedPettyDetails, useEmployeeDenominationDetails } from '../../CommonData/UseQuery'
import DenominationDetails from './DenominationDetails'
import DietTextComponent from '../../DietComponent/DietTextComponent'


const CashClosingDetails = ({
    data = {},
    onCancel
}) => {

    const { closing_ids, employee_id, closing_details } = data ?? {};

    const { data: DenomintionDetailsofEmployee = [] } = useEmployeeDenominationDetails(closing_ids);

    const { data: PettyCashDetail = [] } = useEMployeeClosedPettyDetails(employee_id, closing_ids);


    // const UserPettyCash = PettyCashDetail?.pending_petty_cash;

    const totalPettyCash = PettyCashDetail?.total_petty_cash;

    const totalSettledPettyCash = PettyCashDetail?.settled_petty_cash;;

    const totalPendingPettyCash = PettyCashDetail?.pending_petty_cash;;

    if (!data || Object.keys(data).length === 0) {
        return null
    };


    const {
        employee_name,
        closing_status = 'CLOSED',
        total_bill_amount
    } = data

    const TotalCountedAmount = Number(closing_details?.counted_amount);

    const TotalAmountNeeded = Number(total_bill_amount) + Number(totalPettyCash);

    const difference = Number(TotalCountedAmount) - TotalAmountNeeded;


    return (
        <Box
            sx={{
                width: '100%',
                mx: 'auto',
                border: '1px solid #e5e0e8',
                borderRadius: '14px',
                backgroundColor: '#fff',
                overflow: 'hidden'
            }}
        >



            <Box
                sx={{
                    px: 2,
                    py: 1.5,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 2
                }}
            >

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.2
                    }}
                >

                    <Box
                        sx={{
                            width: 38,
                            height: 38,
                            borderRadius: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#f0eaf4'
                        }}
                    >
                        <AccountBalanceWalletRounded
                            sx={{
                                color: '#7c51a1',
                                fontSize: 21
                            }}
                        />
                    </Box>

                    <Box>

                        <Typography
                            level="title-md"
                            sx={{
                                fontWeight: 800,
                                color: '#33253d',
                                lineHeight: 1.2
                            }}
                        >
                            Cash Closing
                        </Typography>

                        <Typography
                            level="body-xs"
                            sx={{
                                color: 'neutral.500',
                                mt: 0.2
                            }}
                        >
                            {employee_name || 'Employee'}
                        </Typography>

                    </Box>

                </Box>


                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1
                    }}>

                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.6,
                            px: 1,
                            py: 0.45,
                            borderRadius: '20px',
                            backgroundColor: '#edf8f1',
                            color: '#26834a'
                        }} >
                        <CheckCircleRounded sx={{ fontSize: 15 }} />
                        <Typography
                            level="body-xs"
                            sx={{
                                fontWeight: 800,
                                color: '#26834a'
                            }}>
                            {closing_status}
                        </Typography>
                    </Box>
                    <DietButton
                        icon={ArrowBackIosIcon}
                        name="Close"
                        onClick={onCancel}
                    />
                </Box>
            </Box>

            <Divider />

            <Box sx={{ p: 1 }}>
                <DenominationDetails closingDetail={closing_details} data={DenomintionDetailsofEmployee} />

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
                                value={`₹ ${Number(total_bill_amount || 0)}`}
                                sx={{ fontSize: 14, fontWeight: 600, color: '#222' }}
                            />
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <DietTextComponent
                                value="PETTY CASH GIVEN"
                                sx={{ fontSize: 13, color: '#666' }}
                            />
                            <DietTextComponent
                                value={`₹ ${Number(totalPettyCash || 0)}`}
                                sx={{ fontSize: 14, fontWeight: 600, color: '#222' }}
                            />
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <DietTextComponent
                                value="PETTY CASH SETTLED"
                                sx={{ fontSize: 13, color: '#666' }}
                            />
                            <DietTextComponent
                                value={`₹ ${Number(totalSettledPettyCash || 0)}`}
                                sx={{ fontSize: 14, fontWeight: 600, color: '#222' }}
                            />
                        </Box>


                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <DietTextComponent
                                value="PETTY CASH PENDING"
                                sx={{ fontSize: 13, color: '#666' }}
                            />
                            <DietTextComponent
                                value={`₹ ${Number(totalPendingPettyCash || 0)}`}
                                sx={{ fontSize: 14, fontWeight: 600, color: '#222' }}
                            />
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <DietTextComponent
                                value="NET PAYABLE"
                                sx={{ fontSize: 13, color: '#666' }}
                            />
                            <DietTextComponent
                                value={`₹ ${Number(TotalAmountNeeded || 0)}`}
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
                                value={`₹ ${closing_details?.counted_amount || 0}`}
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
                </Box>
            </Box>
        </Box>
    )
};


export default memo(CashClosingDetails)